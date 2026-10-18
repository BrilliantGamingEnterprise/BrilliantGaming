const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

(async () => {
  const root = path.resolve(__dirname, '..');
  const source = fs.readFileSync(path.join(root, 'scripts.js'), 'utf8');
  const config = source.slice(source.indexOf('const paymentMethodOptions ='), source.indexOf('function saveCart()'));
  const functions = source.slice(source.indexOf('function getGameTopupFormType('), source.indexOf('function writeTextToClipboard('));
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const page = await browser.newPage();
    await page.setContent('<div id="topupFormContainer"></div>');
    await page.addStyleTag({ content: fs.readFileSync(path.join(root, 'styles.css'), 'utf8') });
    await page.addScriptTag({ content: `
      const localizedText = (v) => v;
      const escapeAttribute = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
      const escapeHtml = escapeAttribute;
      const uiText = (key, data = {}) => data.label || key;
      const showCartToast = () => {};
      ${config}
      ${functions}
      renderTopupInfoForm('cn', { topupFormType: 'tencent' });
    ` });
    const mode = page.locator('[data-topup-field="serverMode"]');
    const server = page.locator('[data-topup-field="server"]');
    assert.equal(await server.isVisible(), false);
    assert.equal(await server.isDisabled(), true);
    await page.selectOption('[data-topup-field="paymentMethod"]', { index: 1 });
    await page.selectOption('[data-topup-field="system"]', { index: 1 });
    await page.selectOption('[data-topup-field="loginArea"]', { index: 1 });
    await page.fill('[data-topup-field="characterName"]', '测试角色');
    assert.equal(await page.evaluate(() => validateTopupRequiredFields()), false);
    await mode.selectOption('没有大区');
    assert.equal(await page.evaluate(() => validateTopupRequiredFields()), true);
    assert.deepEqual(await page.evaluate(() => getTopupInfoLines().filter((v) => v.startsWith('大区:'))), ['大区: 没有大区']);
    await mode.selectOption('手动填写大区');
    assert.equal(await server.isVisible(), true);
    assert.equal(await server.isEnabled(), true);
    assert.equal(await page.evaluate(() => validateTopupRequiredFields()), false);
    await server.fill('391区');
    assert.equal(await page.evaluate(() => validateTopupRequiredFields()), true);
    assert.deepEqual(await page.evaluate(() => getTopupInfoLines().filter((v) => v.startsWith('大区:'))), ['大区: 391区']);
    await mode.selectOption('没有大区');
    assert.equal(await server.inputValue(), '');
    assert.equal(await server.isVisible(), false);
    await mode.selectOption('手动填写大区');
    assert.equal(await page.evaluate(() => validateTopupRequiredFields()), false);
    console.log('PASS: initial, no-region, manual-required, order output, clearing stale values');
    // Other form types retain their normal server input and required status.
    await page.evaluate(() => renderTopupInfoForm('int', { topupFormType: 'uid' }));
    assert.equal(await mode.count(), 0);
    console.log('PASS: unrelated UID form unchanged');
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
