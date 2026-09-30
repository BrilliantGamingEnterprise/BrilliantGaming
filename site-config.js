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

// 首页活动轮播。单项活动公布结束时间后，可在对应项目的 endsAt
// 填入带马来西亚时区的 ISO 时间，过期项目会自动从轮播中移除。
const promotionSettings = {
  enabled: true,
  id: 'homepage-campaigns-2026-09-instagram',
  showOncePerSession: true,
  delayMs: 700,
  autoAdvanceMs: 5200,
  slides: [
    {
      id: 'instagram-new-account-2026-09',
      image: 'assets/images/promotions/instagram-new-account-v1.png',
      altZh: 'Instagram 大号被封了。原账号粉丝数 9,664。感谢大家一路支持，请大家关注新账号，后续资讯与活动将在新 IG 更新。',
      altEn: 'Our previous Instagram account with 9,664 followers was disabled. Thank you for your support. Follow our new Instagram account for news and promotions.',
      href: 'https://www.instagram.com/zhuoyuedianjing.official/',
      startsAt: '',
      endsAt: ''
    }
  ]
};

  globalThis.BGE_SITE_CONFIG = Object.freeze({
    catalogSettings,
    currencySettings,
    currencyFlagClasses,
    promotionSettings: Object.freeze(promotionSettings)
  });
})();
