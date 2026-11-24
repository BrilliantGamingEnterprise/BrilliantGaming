import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import '../catalog-data.js';

const root = path.join(import.meta.dirname, '..');
const artFolder = path.join(root, 'assets/images/games/tencent-topup');
const manifest = JSON.parse(await fs.readFile(path.join(import.meta.dirname, 'tencent-product-assets.json'), 'utf8'));
const checkOnly = process.argv.includes('--check');
const sharpIndex = process.argv.indexOf('--sharp');
const sharp = checkOnly ? null : createRequire(import.meta.url)(sharpIndex < 0 ? 'sharp' : process.argv[sharpIndex + 1]);
const games = new Map(globalThis.BGE_CATALOG_DATA.categories.cn.games.map((game) => [game.id, game]));
const artFilePattern = /^(\d{24})\/([0-9a-f]{24,64})$/;
const skuPattern = /^(\d+)(?:\s*\+\s*\d+)?\s*(点券|金币|三角币|洛克钻|璇晶)(?:\s|$)/;
const pngStart = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const downloads = new Map();
const styles = ['/* Generated from tools/tencent-product-assets.json. */'];
let matched = 0;
let approximations = 0;

for (const [gameId, gameArt] of Object.entries(manifest)) {
  const game = games.get(gameId);
  if (!game || !/^[a-z0-9-]+$/.test(gameId)) throw new Error(`Unknown CN game: ${gameId}`);
  const saleKeys = new Set(game.productSections.flatMap((section) => section.products).map((product) => {
    const sku = product.title.match(skuPattern);
    return sku ? sku[1] + sku[2] : '';
  }));
  const sources = new Map(Object.entries(gameArt.assets || {}));
  for (const { skus, image } of gameArt.shared || []) {
    for (const sku of skus) {
      if (sources.has(sku)) throw new Error(`Repeated SKU: ${gameId}/${sku}`);
      sources.set(sku, image);
    }
  }
  matched += sources.size;
  for (const [sku, original] of Object.entries(gameArt.previewAliases || {})) {
    if (sources.has(sku) || !sources.has(original) || sku.replace(/^\d+/, '') !== original.replace(/^\d+/, '')) {
      throw new Error(`Invalid preview-only approximation: ${gameId}/${sku}`);
    }
    sources.set(sku, sources.get(original));
    approximations++;
  }
  const selectorsByFile = new Map();
  for (const [sku, stem] of sources) {
    if (!saleKeys.has(sku)) throw new Error(`No corresponding site SKU: ${gameId}/${sku}`);
    const sourcePath = stem.includes('/') ? stem : `${gameArt.directory}/${stem}`;
    const imageId = sourcePath.match(artFilePattern)?.[2];
    if (!imageId) throw new Error(`Invalid asset reference: ${gameId}/${sku}`);
    const filename = `${imageId}.png`;
    const url = `https://pagedoo.pay.qq.com/material/${sourcePath}.png`;
    if (downloads.has(filename) && downloads.get(filename) !== url) throw new Error(`Conflicting sources: ${filename}`);
    downloads.set(filename, url);
    if (!selectorsByFile.has(filename)) selectorsByFile.set(filename, []);
    selectorsByFile.get(filename).push(`.compact-products[data-compact-game="${gameId}"] [data-token-sku="${sku}"]`);
  }
  for (const [filename, selectors] of selectorsByFile) {
    styles.push(`${selectors.join(',\n')} { --token-image: url("assets/images/games/tencent-topup/${filename}"); --token-visibility: visible; }`);
  }
}

function validPng(bytes) {
  return bytes.length >= 24 && bytes.subarray(0, 8).equals(pngStart)
    && bytes.toString('ascii', 12, 16) === 'IHDR'
    && bytes.readUInt32BE(16) > 0 && bytes.readUInt32BE(20) > 0;
}

if (!checkOnly) await fs.mkdir(artFolder, { recursive: true });
const entries = [...downloads];
for (let i = 0; i < entries.length; i += 6) {
  await Promise.all(entries.slice(i, i + 6).map(async ([filename, url]) => {
    const target = path.join(artFolder, filename);
    const current = await fs.readFile(target).catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (current && validPng(current) && current.readUInt32BE(16) <= 112 && current.readUInt32BE(20) <= 112) return;
    if (checkOnly || (current && !validPng(current))) throw new Error(`Missing or invalid local PNG: ${filename}`);
    let bytes = current;
    if (!bytes) {
      const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(10000) });
      if (!response.ok || !response.headers.get('content-type')?.startsWith('image/png')) {
        throw new Error(`Official source returned ${response.status} for ${filename}`);
      }
      bytes = Buffer.from(await response.arrayBuffer());
    }
    if (!validPng(bytes) || bytes.length > 15_000_000) throw new Error(`Invalid official PNG: ${filename}`);
    const thumbnail = await sharp(bytes, { limitInputPixels: 24_000_000 })
      .resize(112, 112, { fit: 'inside', withoutEnlargement: true }).png().toBuffer();
    await fs.writeFile(target, thumbnail, { flag: current ? 'w' : 'wx' });
  }));
}
const css = styles.join('\n') + '\n';
const cssPath = path.join(artFolder, 'icons.css');
if (checkOnly) {
  const current = await fs.readFile(cssPath, 'utf8');
  if (current.replace(/\r\n/g, '\n') !== css) throw new Error('Tencent preview artwork CSS is out of date.');
} else {
  await fs.writeFile(cssPath, css);
}
console.log(`Validated ${matched} matched artwork keys, ${approximations} preview aliases, ${downloads.size} PNGs, ${games.size} CN games checked.`);
