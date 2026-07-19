import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const scriptsPath = path.join(root, 'scripts.js');
const source = fs.readFileSync(scriptsPath, 'utf8');

function takeBlock(input, startMarker, endMarker) {
  const start = input.indexOf(startMarker);
  const end = input.indexOf(endMarker, start);
  if (start < 0 || end < 0) {
    throw new Error(`Cannot locate block: ${startMarker} -> ${endMarker}`);
  }
  return { start, end, text: input.slice(start, end) };
}

const configBlock = takeBlock(source, 'const catalogSettings = {', "let activeCurrency = localStorage.getItem(currencyKey)");
const presetBlock = takeBlock(source, 'const pricePresets = {', 'function resolveProductPrice(product)');
const catalogBlock = takeBlock(source, 'const categories = {', 'const homeFeaturedIds = [');
const featuredBlock = takeBlock(source, 'const homeFeaturedIds = [', 'function getQueryParams()');

const siteConfig = `/* Brilliant Gaming shared site settings. */\n(() => {\n${configBlock.text.trim()}\n\n  const reviewSettings = {\n    // Publish the approved Google Sheet as CSV, then paste its URL here.\n    publishedCsvUrl: '',\n    formUrl: 'https://forms.gle/25g3fthH2vgJ64A37',\n    homepageLimit: 3\n  };\n\n  globalThis.BGE_SITE_CONFIG = Object.freeze({\n    catalogSettings,\n    currencySettings,\n    currencyFlagClasses,\n    reviewSettings\n  });\n})();\n`;

const catalogData = `/* Brilliant Gaming game, product and shared price data. */\n(() => {\n${presetBlock.text.trim()}\n\n${catalogBlock.text.trim()}\n\n${featuredBlock.text.trim()}\n\n  globalThis.BGE_CATALOG_DATA = {\n    pricePresets,\n    categories,\n    homeFeaturedIds\n  };\n})();\n`;

let next = source;
const removals = [configBlock, presetBlock, catalogBlock, featuredBlock]
  .sort((a, b) => b.start - a.start);
for (const block of removals) {
  next = next.slice(0, block.start) + next.slice(block.end);
}

const insertionPoint = next.indexOf("let activeCurrency = localStorage.getItem(currencyKey)");
if (insertionPoint < 0) throw new Error('Cannot locate runtime insertion point');
const imports = `const { catalogSettings, currencySettings, currencyFlagClasses, reviewSettings } = globalThis.BGE_SITE_CONFIG;\nconst { pricePresets, categories, homeFeaturedIds } = globalThis.BGE_CATALOG_DATA;\nconst catalogMeta = globalThis.BGE_CATALOG_META || { updatedAtByGame: {} };\n\n`;
next = next.slice(0, insertionPoint) + imports + next.slice(insertionPoint);

fs.writeFileSync(path.join(root, 'site-config.js'), siteConfig);
fs.writeFileSync(path.join(root, 'catalog-data.js'), catalogData);
fs.writeFileSync(scriptsPath, next);

const htmlFiles = fs.readdirSync(root).filter((name) => name.endsWith('.html'));
for (const name of htmlFiles) {
  const filePath = path.join(root, name);
  let html = fs.readFileSync(filePath, 'utf8');
  if (html.includes('src="scripts.js') && !html.includes('src="site-config.js')) {
    html = html.replace(
      /(<script src="translations\.js[^>]*><\/script>\s*)?<script src="scripts\.js[^>]*><\/script>/,
      (match, translations = '') => `<script src="site-config.js?v=1"></script>\n  <script src="catalog-data.js?v=1"></script>\n  <script src="catalog-meta.js?v=1"></script>\n  ${translations}<script src="scripts.js?v=15"></script>`
    );
    fs.writeFileSync(filePath, html);
  }
}

console.log('Catalog and site settings separated successfully.');
