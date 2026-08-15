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

// 首页限时活动。官方尚未公布结束时间时保留 endsAt 为空；
// 公布后填入带马来西亚时区的 ISO 时间，弹窗会自动停止显示。
const promotionSettings = {
  enabled: true,
  id: 'lan-wushuang-rm250-2026',
  image: 'assets/images/promotions/lan-wushuang-rm250.png',
  altZh: '澜无双皮肤代送，活动价 RM 250',
  altEn: 'Lan Wushuang skin gifting promotion, RM 250',
  startsAt: '2026-08-15T00:00:00+08:00',
  endsAt: '',
  frequencyHours: 24,
  delayMs: 700,
  whatsappMessageZh: '你好，我想询问澜无双皮肤代送 RM 250 活动。',
  whatsappMessageEn: 'Hi, I would like to ask about the Lan Wushuang skin gifting promotion at RM 250.'
};

  globalThis.BGE_SITE_CONFIG = Object.freeze({
    catalogSettings,
    currencySettings,
    currencyFlagClasses,
    promotionSettings: Object.freeze(promotionSettings)
  });
})();
