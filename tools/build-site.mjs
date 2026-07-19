import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const checkOnly = process.argv.includes('--check');
const initialDate = '2026-07-15';

function loadGlobalScript(fileName, globalName) {
  const context = { console };
  context.globalThis = context;
  context.window = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, fileName), 'utf8'), context, { filename: fileName });
  if (!context[globalName]) throw new Error(`${fileName} did not define ${globalName}`);
  return context[globalName];
}

const siteConfig = loadGlobalScript('site-config.js', 'BGE_SITE_CONFIG');
const catalog = loadGlobalScript('catalog-data.js', 'BGE_CATALOG_DATA');
const translationsSource = fs.readFileSync(path.join(root, 'translations.js'), 'utf8');
const { categories, pricePresets } = catalog;
const siteUrl = siteConfig.catalogSettings.siteUrl.replace(/\/$/, '');
const allowedStatuses = new Set(['active', 'paused', 'soldout', 'inquiry']);
const errors = [];
const warnings = [];
const games = [];

function cleanText(value) {
  return String(value ?? '').trim();
}

function html(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function xml(value) {
  return html(value).replace(/'/g, '&apos;');
}

function resolvePrice(product) {
  return product.pricePreset ? (pricePresets[product.pricePreset] || product.price || '') : (product.price || '');
}

function gameFingerprint(game) {
  const sections = Array.isArray(game.productSections) && game.productSections.length
    ? game.productSections
    : [{ title: '', products: game.products || [] }];
  const pricing = sections.map((section) => ({
    title: section.title || '',
    products: (section.products || []).map((product) => ({
      title: product.title || '',
      price: resolvePrice(product),
      pricePreset: product.pricePreset || '',
      status: product.status || 'active'
    }))
  }));
  return crypto.createHash('sha256').update(JSON.stringify(pricing)).digest('hex');
}

const seenIds = new Map();
for (const [categoryId, category] of Object.entries(categories)) {
  for (const game of category.games || []) {
    const label = `${categoryId}/${game.id || '(missing id)'}`;
    games.push({ categoryId, category, game });
    for (const field of ['id', 'name', 'description', 'image', 'detailArt']) {
      if (!cleanText(game[field])) errors.push(`${label}: missing ${field}`);
    }
    if (seenIds.has(game.id)) errors.push(`${label}: duplicate game id (also ${seenIds.get(game.id)})`);
    seenIds.set(game.id, label);
    for (const imageField of ['image', 'detailArt']) {
      const imagePath = cleanText(game[imageField]);
      if (imagePath && !fs.existsSync(path.join(root, imagePath))) errors.push(`${label}: image not found: ${imagePath}`);
    }
    let productCount = 0;
    const sections = Array.isArray(game.productSections) && game.productSections.length
      ? game.productSections
      : [{ title: '', products: game.products || [] }];
    for (const [sectionIndex, section] of sections.entries()) {
      for (const [productIndex, product] of (section.products || []).entries()) {
        productCount += 1;
        const productLabel = `${label} section ${sectionIndex + 1} product ${productIndex + 1}`;
        if (!cleanText(product.title)) errors.push(`${productLabel}: missing title`);
        if (!cleanText(resolvePrice(product))) errors.push(`${productLabel}: missing price`);
        if (product.pricePreset && !Object.hasOwn(pricePresets, product.pricePreset)) {
          errors.push(`${productLabel}: unknown pricePreset ${product.pricePreset}`);
        }
        const status = cleanText(product.status || 'active').toLowerCase();
        if (!allowedStatuses.has(status)) errors.push(`${productLabel}: invalid status ${status}`);
        if (!cleanText(product.en) && !translationsSource.includes(cleanText(product.title))) {
          warnings.push(`${productLabel}: missing English product name or translation`);
        }
      }
    }
    if (!productCount) warnings.push(`${label}: no products`);
  }
}

if (errors.length) {
  console.error(`Catalog validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

const fingerprintPath = path.join(root, 'catalog-fingerprints.json');
const previous = fs.existsSync(fingerprintPath)
  ? JSON.parse(fs.readFileSync(fingerprintPath, 'utf8'))
  : { games: {} };
const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: siteConfig.catalogSettings.timeZone,
  year: 'numeric', month: '2-digit', day: '2-digit'
}).format(new Date());
const nextFingerprint = { version: 1, games: {} };
const updatedAtByGame = {};
let catalogChanged = false;

for (const { categoryId, game } of games) {
  const key = `${categoryId}/${game.id}`;
  const fingerprint = gameFingerprint(game);
  const before = previous.games?.[key];
  const changed = Boolean(before && before.fingerprint !== fingerprint);
  const date = cleanText(game.updatedAt) || (changed ? today : before?.updatedAt) || initialDate;
  nextFingerprint.games[key] = { fingerprint, updatedAt: date };
  updatedAtByGame[key] = date;
  if (!before || changed || before.updatedAt !== date) catalogChanged = true;
}

const metaSource = `/* Generated by tools/build-site.mjs. Do not edit manually. */\n` +
  `globalThis.BGE_CATALOG_META = Object.freeze(${JSON.stringify({ updatedAtByGame }, null, 2)});\n`;

function productMarkup(game) {
  const sections = Array.isArray(game.productSections) && game.productSections.length
    ? game.productSections
    : [{ title: '', subtitle: '', products: game.products || [] }];
  return sections.map((section) => {
    const cards = (section.products || []).map((product) => {
      const status = cleanText(product.status || 'active').toLowerCase();
      const statusLabel = { paused: '暂停接单', soldout: '暂时售罄', inquiry: '联系客服询价' }[status] || '';
      return `<article class="product-card product-status-${html(status)}">${statusLabel ? `<span class="product-status-badge">${statusLabel}</span>` : ''}<h3>${html(product.title)}</h3><p>${html(product.note || product.en || '')}</p><div class="product-price">${html(resolvePrice(product))}</div></article>`;
    }).join('');
    return `<div class="product-section"><div class="product-section-header"><h3><span class="product-section-main">${html(section.title || '商品')}</span>${section.subtitle ? `<span>${html(section.subtitle)}</span>` : ''}</h3></div><div class="product-grid">${cards}</div></div>`;
  }).join('');
}

function generatedGameHtml(template, categoryId, category, game) {
  const displayName = cleanText(game.detailName || game.name);
  const englishName = cleanText(game.description || game.name);
  const description = `${displayName}充值价格与商品资料。Brilliant Gaming 为马来西亚与新加坡玩家提供人工客服确认的手游充值服务。`;
  const canonical = `${siteUrl}/games/${encodeURIComponent(game.id)}/`;
  const englishUrl = `${canonical}?lang=en`;
  const imageUrl = new URL(game.detailArt || game.image, `${siteUrl}/`).href;
  const updatedAt = updatedAtByGame[`${categoryId}/${game.id}`];
  const schema = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: `${displayName}充值`, description, url: canonical, image: imageUrl,
    serviceType: 'Game top-up service', areaServed: ['MY', 'SG'],
    provider: { '@type': 'Organization', name: 'Brilliant Gaming', url: `${siteUrl}/` }
  };
  let output = template
    .replace('<meta name="viewport" content="width=device-width, initial-scale=1.0" />', '<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <base href="../../">')
    .replace(/<title>[^<]*<\/title>/, `<title>${html(displayName)}充值 - Brilliant Gaming</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${html(description)}" />`)
    .replace('</head>', `  <link rel="canonical" href="${canonical}">\n  <link rel="alternate" hreflang="zh-Hans" href="${canonical}">\n  <link rel="alternate" hreflang="en" href="${englishUrl}">\n  <link rel="alternate" hreflang="x-default" href="${canonical}">\n  <meta property="og:title" content="${html(displayName)}充值 - Brilliant Gaming">\n  <meta property="og:description" content="${html(description)}">\n  <meta property="og:url" content="${canonical}">\n  <meta property="og:image" content="${imageUrl}">\n  <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>\n</head>`)
    .replace('<body class="page-game" data-page="game">', `<body class="page-game" data-page="game" data-game-category="${html(categoryId)}" data-game-id="${html(game.id)}">`)
    .replace('<h1 id="detailTitle">游戏名称</h1>', `<h1 id="detailTitle">${html(displayName)}</h1>`)
    .replace('<p id="detailSummary" class="game-detail-summary">Game Name</p>', `<p id="detailSummary" class="game-detail-summary">${html(englishName)}</p>`)
    .replace('<span id="catalogUpdatedMeta" class="catalog-updated-meta"></span>', `<span id="catalogUpdatedMeta" class="catalog-updated-meta">价格更新：${html(updatedAt)}</span>`)
    .replace('<div id="gameProducts" class="game-products-area"></div>', `<div id="gameProducts" class="game-products-area">${productMarkup(game)}</div>`)
    .replace('id="detailBackLink" class="back-link" href="index.html"', `id="detailBackLink" class="back-link" href="${html(category.page || 'index.html')}"`);
  return output;
}

function sitemapEntry(url, zhUrl, enUrl, lastmod) {
  return `  <url>\n    <loc>${xml(url)}</loc>\n    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${xml(zhUrl)}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${xml(enUrl)}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${xml(zhUrl)}" />\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
}

function makeSitemap() {
  const entries = [];
  const basePages = ['/', '/intl.html', '/cn.html', '/review.html', '/policy.html'];
  for (const pathname of basePages) {
    const zhUrl = `${siteUrl}${pathname}`;
    const enUrl = `${zhUrl}${pathname.includes('?') ? '&' : '?'}lang=en`;
    entries.push(sitemapEntry(zhUrl, zhUrl, enUrl, today));
    entries.push(sitemapEntry(enUrl, zhUrl, enUrl, today));
  }
  for (const { categoryId, game } of games) {
    const zhUrl = `${siteUrl}/games/${encodeURIComponent(game.id)}/`;
    const enUrl = `${zhUrl}?lang=en`;
    const date = updatedAtByGame[`${categoryId}/${game.id}`];
    entries.push(sitemapEntry(zhUrl, zhUrl, enUrl, date));
    entries.push(sitemapEntry(enUrl, zhUrl, enUrl, date));
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
}

const template = fs.readFileSync(path.join(root, 'game.html'), 'utf8');
const sitemap = makeSitemap();

if (checkOnly) {
  if (catalogChanged) errors.push('catalog generated metadata is out of date; run npm run build');
  if (!fs.existsSync(path.join(root, 'catalog-meta.js')) || fs.readFileSync(path.join(root, 'catalog-meta.js'), 'utf8') !== metaSource) errors.push('catalog-meta.js is out of date');
  if (!fs.existsSync(path.join(root, 'sitemap.xml')) || fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8') !== sitemap) errors.push('sitemap.xml is out of date');
  for (const { game } of games) {
    if (!fs.existsSync(path.join(root, 'games', game.id, 'index.html'))) errors.push(`missing generated page: games/${game.id}/index.html`);
  }
  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join('\n'));
    process.exit(1);
  }
} else {
  fs.writeFileSync(fingerprintPath, `${JSON.stringify(nextFingerprint, null, 2)}\n`);
  fs.writeFileSync(path.join(root, 'catalog-meta.js'), metaSource);
  const gamesDir = path.join(root, 'games');
  fs.rmSync(gamesDir, { recursive: true, force: true });
  for (const { categoryId, category, game } of games) {
    const directory = path.join(gamesDir, game.id);
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, 'index.html'), generatedGameHtml(template, categoryId, category, game));
  }
  fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap);
}

console.log(`Validated ${games.length} games. ${warnings.length} warning(s).`);
warnings.slice(0, 20).forEach((warning) => console.warn(`- ${warning}`));
if (!checkOnly) console.log(`Generated ${games.length} independent game pages and sitemap.xml.`);
