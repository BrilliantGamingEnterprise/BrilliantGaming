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
  id: 'homepage-campaigns-2026-08',
  showOnEveryVisit: true,
  frequencyHours: 24,
  delayMs: 700,
  autoAdvanceMs: 5200,
  slides: [
    {
      id: 'lan-wushuang-rm250-2026',
      image: 'assets/images/promotions/lan-wushuang-rm250.png',
      altZh: '澜无双皮肤代送，活动价 RM 250',
      altEn: 'Lan Wushuang skin gifting promotion, RM 250',
      startsAt: '2026-08-15T00:00:00+08:00',
      endsAt: '',
      whatsappMessageZh: '你好，我想询问澜无双皮肤代送 RM 250 活动。',
      whatsappMessageEn: 'Hi, I would like to ask about the Lan Wushuang skin gifting promotion at RM 250.'
    },
    {
      id: 'hok-dandadan-8360-rm365-2026',
      image: 'assets/images/promotions/hok-dandadan-8360-rm365.png',
      altZh: 'Honor of Kings 胆大党联动，8360 Tokens，RM 365',
      altEn: 'Honor of Kings x DAN DA DAN, 8360 Tokens, RM 365',
      startsAt: '2026-08-16T00:00:00+08:00',
      endsAt: '',
      whatsappMessageZh: '你好，我想询问 Honor of Kings 胆大党联动 8360 Tokens，RM 365 活动。',
      whatsappMessageEn: 'Hi, I would like to ask about the Honor of Kings x DAN DA DAN 8360 Tokens promotion at RM 365.'
    },
    {
      id: 'genshin-6480-rm320-2026',
      image: 'assets/images/promotions/genshin-6480-rm320.png',
      altZh: '原神星空祈愿，6480 结晶，RM 320',
      altEn: 'Genshin Impact 6480 Genesis Crystals, RM 320',
      startsAt: '2026-08-16T00:00:00+08:00',
      endsAt: '',
      whatsappMessageZh: '你好，我想询问原神 6480 结晶，RM 320 活动。',
      whatsappMessageEn: 'Hi, I would like to ask about the Genshin Impact 6480 Genesis Crystals promotion at RM 320.'
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
