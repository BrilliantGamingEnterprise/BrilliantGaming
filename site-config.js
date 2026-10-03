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
  id: 'homepage-genshin-welkin-2026-10',
  showOncePerSession: true,
  delayMs: 700,
  autoAdvanceMs: 5200,
  slides: [
    {
      id: 'genshin-6480-welkin-rm320-2026',
      image: 'assets/images/promotions/genshin-6480-welkin-rm320-v2.png',
      altZh: '原神国际服，充值 6480 创世结晶送月卡（空月祝福），RM 320。',
      altEn: 'Genshin Impact Global: top up 6480 Genesis Crystals and receive a Blessing of the Welkin Moon, RM 320.',
      whatsappMessageZh: '你好，我想询问原神国际服充值 6480 送月卡（空月祝福），RM 320 的活动。',
      whatsappMessageEn: 'Hi, I would like the Genshin Impact Global 6480 Genesis Crystals + free Welkin Moon promotion for RM 320.',
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
