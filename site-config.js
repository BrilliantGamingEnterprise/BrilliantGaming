/* Brilliant Gaming shared site settings. */
(() => {
const catalogSettings = {
  updatedAt: '2026-07-15',
  timeZone: 'Asia/Kuala_Lumpur',
  whatsappNumber: '60124458242',
  siteUrl: 'https://brilliantgamingtopup.com'
};

const currencySettings = {
  defaultCurrency: 'MYR',
  rates: {
    MYR: 1,
    SGD: 3.0,
    USD: 4.0
  },
  labels: {
    MYR: 'MYR',
    SGD: 'SGD',
    USD: 'USD'
  }
};

const currencyFlagClasses = {
  MYR: 'my',
  SGD: 'sg',
  USD: 'us'
};

  const reviewSettings = {
    // Publish the approved Google Sheet as CSV, then paste its URL here.
    publishedCsvUrl: '',
    formUrl: 'https://forms.gle/25g3fthH2vgJ64A37',
    homepageLimit: 3
  };

  globalThis.BGE_SITE_CONFIG = Object.freeze({
    catalogSettings,
    currencySettings,
    currencyFlagClasses,
    reviewSettings
  });
})();
