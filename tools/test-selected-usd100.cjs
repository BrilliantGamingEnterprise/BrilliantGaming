const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function load(source) {
  const context = {}; context.globalThis = context;
  vm.runInNewContext(source, context);
  return JSON.parse(JSON.stringify(context.BGE_CATALOG_DATA));
}
const before = load(execFileSync('git', ['show', 'HEAD:catalog-data.js'], { cwd: root, encoding: 'utf8' }));
const after = load(fs.readFileSync(path.join(root, 'catalog-data.js'), 'utf8'));
const expectedPrice = process.argv[2] || after.pricePresets.selectedGamesUsd100;
assert.match(expectedPrice, /^RM \d+\.00$/);
const targets = {
  'perfect-world-w': ['9999 诸神币 + 648 绑定元宝'],
  'zhang-jian-chuan-shuo': ['9999 + 500 代金券'],
  'wen-jian-chang-sheng': ['9,999 代金券'],
  'x-hero-epic-hero': ['1000 + 40 红钻'],
  aniimo: ['6480 + 648 辉晶'],
  'kai-tian': ['6480 + 648 仙玉', '648 仙云币'],
  'tian-long-ba-bu': ['648 代金券']
};
const games = (catalog) => Object.values(catalog.categories).flatMap((category) => category.games);
const products = (game) => game.productSections?.flatMap((section) => section.products) || game.products || [];
const resolve = (catalog, product) => product.pricePreset ? catalog.pricePresets[product.pricePreset] : product.price;
let linked = 0;
for (const game of games(after)) {
  for (const product of products(game)) {
    const expected = targets[game.id]?.includes(product.title) || false;
    assert.equal(product.pricePreset === 'selectedGamesUsd100', expected, `${game.id}: ${product.title}`);
    if (expected) { assert.equal(resolve(after, product), expectedPrice); linked++; }
  }
}
assert.equal(linked, 8);
const oldPresets = { ...after.pricePresets }; delete oldPresets.selectedGamesUsd100;
const previousPresets = { ...before.pricePresets }; delete previousPresets.selectedGamesUsd100;
assert.deepEqual(oldPresets, previousPresets);
for (const oldGame of games(before)) {
  const newGame = structuredClone(games(after).find((game) => game.id === oldGame.id));
  const baseline = structuredClone(oldGame);
  for (const game of [baseline, newGame]) {
    for (const product of products(game)) {
      if (targets[game.id]?.includes(product.title)) { delete product.price; delete product.pricePreset; }
    }
  }
  assert.deepEqual(newGame, baseline, `${oldGame.id}: non-target data changed`);
}
after.pricePresets.selectedGamesUsd100 = 'RM 399.00';
for (const game of games(after)) for (const product of products(game)) {
  if (product.pricePreset === 'selectedGamesUsd100') assert.equal(resolve(after, product), 'RM 399.00');
}
const kai = games(after).find((game) => game.id === 'kai-tian');
assert.equal(kai.topupFormType, 'login');
assert.equal(kai.productSections.length, 3);
assert.equal(products(kai).length, 19);
for (const product of products(kai)) assert.match(resolve(after, product), /^RM \d+\.00$/);
console.log('PASS: 7 games / 8 linked USD100 products; one-price update propagates; other existing tiers unchanged; Kai Tian has 19 products in 3 sections.');
