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
  id: 'homepage-campaigns-2026-09-sunshangxiang',
  showOncePerSession: true,
  delayMs: 700,
  autoAdvanceMs: 5200,
  slides: [
    {
      id: 'sunshangxiang-cloud-paradise-2026',
      image: 'assets/images/promotions/sunshangxiang-cloud-paradise-v1.png',
      altZh: '孙尚香·云端乐园，珍品无双限定，王者荣耀 × 三丽鸥家族第四弹，美乐蒂与酷洛米双形态。皮肤代送 RM 450，天幕代送 RM 268。',
      altEn: 'Sun Shangxiang Cloud Paradise, Honor of Kings × Sanrio Characters, My Melody and Kuromi dual forms. Skin gifting RM 450; sky screen gifting RM 268.',
      startsAt: '',
      endsAt: '',
      whatsappMessageZh: '你好，我想询问孙尚香·云端乐园活动：皮肤代送 RM 450 / 天幕代送 RM 268。',
      whatsappMessageEn: 'Hi, I would like to ask about Sun Shangxiang Cloud Paradise: skin gifting RM 450 / sky screen gifting RM 268.'
    },
    {
      id: 'lan-wushuang-rm250-2026',
      image: 'assets/images/promotions/lan-wushuang-rm250.png',
      altZh: '澜无双皮肤代送，活动价 RM 250',
      altEn: 'Lan Wushuang skin gifting promotion, RM 250',
      startsAt: '2026-08-15T00:00:00+08:00',
      endsAt: '2026-09-08T00:00:00+08:00',
      whatsappMessageZh: '你好，我想询问澜无双皮肤代送 RM 250 活动。',
      whatsappMessageEn: 'Hi, I would like to ask about the Lan Wushuang skin gifting promotion at RM 250.'
    },
    {
      id: 'genshin-6480-rm300-2026',
      image: 'assets/images/promotions/genshin-6480-rm300-v1.png',
      altZh: '原神星空祈愿，6480 结晶，RM 300',
      altEn: 'Genshin Impact 6480 Genesis Crystals, RM 300',
      startsAt: '2026-08-16T00:00:00+08:00',
      endsAt: '',
      whatsappMessageZh: '你好，我想询问原神 6480 结晶，RM 300 活动。',
      whatsappMessageEn: 'Hi, I would like to ask about the Genshin Impact 6480 Genesis Crystals promotion at RM 300.'
    },
    {
      id: 'honkai-star-rail-6480-rm320-2026',
      image: 'assets/images/promotions/honkai-star-rail-6480-rm320-v1.png',
      altZh: '崩坏：星穹铁道，6480 古老梦华，RM 320',
      altEn: 'Honkai: Star Rail 6480 Oneiric Shards, RM 320',
      startsAt: '2026-09-17T00:00:00+08:00',
      endsAt: '',
      whatsappMessageZh: '你好，我想询问崩坏：星穹铁道 6480 古老梦华，RM 320 活动。',
      whatsappMessageEn: 'Hi, I would like to ask about the Honkai: Star Rail 6480 Oneiric Shards promotion at RM 320.'
    },
    {
      id: 'zenless-zone-zero-6480-rm320-2026',
      image: 'assets/images/promotions/zenless-zone-zero-6480-rm320-v1.png',
      altZh: '绝区零，6480 菲林底片，RM 320',
      altEn: 'Zenless Zone Zero 6480 Monochrome, RM 320',
      startsAt: '2026-09-17T00:00:00+08:00',
      endsAt: '',
      whatsappMessageZh: '你好，我想询问绝区零 6480 菲林底片，RM 320 活动。',
      whatsappMessageEn: 'Hi, I would like to ask about the Zenless Zone Zero 6480 Monochrome promotion at RM 320.'
    },
    {
      id: 'wuthering-waves-6480-rm320-2026',
      image: 'assets/images/promotions/wuthering-waves-6480-rm320-v1.png?v=2',
      altZh: '鸣潮，6480 月相，RM 320',
      altEn: 'Wuthering Waves 6480 Lunite, RM 320',
      startsAt: '2026-09-17T00:00:00+08:00',
      endsAt: '',
      whatsappMessageZh: '你好，我想询问鸣潮 6480 月相，RM 320 活动。',
      whatsappMessageEn: 'Hi, I would like to ask about the Wuthering Waves 6480 Lunite promotion at RM 320.'
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
