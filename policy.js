(() => {
  'use strict';
  const key = 'bge-analytics-consent-v1';

  function isEnglish() {
    return document.documentElement.lang.toLowerCase().startsWith('en');
  }

  function update() {
    const denied = localStorage.getItem(key) === 'denied';
    document.querySelectorAll('[data-analytics-status]').forEach((node) => {
      node.textContent = isEnglish()
        ? (denied ? 'Website analytics is off' : 'Website analytics is on')
        : (denied ? '网站统计已关闭' : '网站统计已开启');
    });
    document.querySelectorAll('[data-analytics-toggle]').forEach((button) => {
      button.textContent = isEnglish()
        ? (denied ? 'Turn analytics on' : 'Turn analytics off')
        : (denied ? '开启网站统计' : '关闭网站统计');
      button.dataset.nextConsent = denied ? 'granted' : 'denied';
    });
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-analytics-toggle]');
    if (!button) return;
    localStorage.setItem(key, button.dataset.nextConsent);
    globalThis.gtag?.('consent', 'update', { analytics_storage: button.dataset.nextConsent });
    update();
  });
  window.addEventListener('bge:languagechange', update);
  window.addEventListener('DOMContentLoaded', update);
})();
