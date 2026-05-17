const storageKey = 'bge-cart-v1';
const statsKey = 'bge-stats-v1';
const dailyOrdersKey = 'bge-daily-order-stats-v1';

const categories = {
  intl: {
    title: '热门国际游戏',
    subtitle: 'Brilliant Gaming 精选热门国际服手游充值。',
    page: 'index.html',
    games: [
      {
        id: 'genshin',
        name: '原神',
        detailName: '国际服 · 原神',
        description: 'Genshin Impact',
        tag: '热门充值',
        image: 'assets/images/games/genshin.jpg',
        detailArt: 'assets/images/games/genshin2.jpg',
        productSections: [
          {
            title: '创世结晶',
            subtitle: 'Genesis Crystal',
            icon: '💎',
            products: [
              { title: '60 创世结晶', en: '60 Genesis Crystals', price: 'RM 4.00', note: '结晶 / Genesis Crystal' },
              { title: '300 创世结晶', en: '300 Genesis Crystals', price: 'RM 18.00', note: '结晶 / Genesis Crystal' },
              { title: '980 创世结晶', en: '980 Genesis Crystals', price: 'RM 54.00', note: '结晶 / Genesis Crystal' },
              { title: '1980 创世结晶', en: '1980 Genesis Crystals', price: 'RM 105.00', note: '结晶 / Genesis Crystal' },
              { title: '3280 创世结晶', en: '3280 Genesis Crystals', price: 'RM 170.00', note: '结晶 / Genesis Crystal' },
              { title: '6480 创世结晶', en: '6480 Genesis Crystals', price: 'RM 300.00', note: '结晶 / Genesis Crystal' },
              { title: '60 - 6480 一条龙', en: 'Full Bundle 60 - 6480 Genesis Crystals', price: 'RM 630.00', note: '一条龙套餐 / Full Bundle' }
            ]
          },
          {
            title: '其他商品',
            subtitle: 'Welkin Moon & Battle Pass',
            icon: '🌙',
            products: [
              { title: '空月祝福', en: 'Blessing of the Welkin Moon', price: 'RM 18.00', note: '月卡 / Monthly Pass' },
              { title: '珍珠纪行', en: 'Gnostic Hymn', price: 'RM 38.00', note: '纪行 / Battle Pass' },
              { title: '珍珠之歌', en: 'Gnostic Chorus', price: 'RM 76.00', note: '纪行升级 / Battle Pass Upgrade' }
            ]
          }
        ]
      },
      {
  id: 'honkai-star-rail',
  name: '崩坏：星穹铁道',
  detailName: '国际服 · 崩坏：星穹铁道',
  description: 'Honkai: Star Rail',
  tag: '热门充值',
  image: 'assets/images/games/honkai-star-rail.jpg',
  detailArt: 'assets/images/games/honkai-star-rail-hero.jpg',
  productSections: [
    {
      title: '古老梦华',
      subtitle: 'Oneiric Shard',
      icon: '◆',
      products: [
        { title: '60 古老梦华', en: '60 Oneiric Shards', price: 'RM 4.00', note: '古老梦华 / Oneiric Shard' },
        { title: '300 古老梦华', en: '300 Oneiric Shards', price: 'RM 18.00', note: '古老梦华 / Oneiric Shard' },
        { title: '980 古老梦华', en: '980 Oneiric Shards', price: 'RM 54.00', note: '古老梦华 / Oneiric Shard' },
        { title: '1980 古老梦华', en: '1980 Oneiric Shards', price: 'RM 105.00', note: '古老梦华 / Oneiric Shard' },
        { title: '3280 古老梦华', en: '3280 Oneiric Shards', price: 'RM 170.00', note: '古老梦华 / Oneiric Shard' },
        { title: '6480 古老梦华', en: '6480 Oneiric Shards', price: 'RM 300.00', note: '古老梦华 / Oneiric Shard' },
        { title: '60 - 6480 一条龙', en: 'Full Bundle 60 - 6480 Oneiric Shards', price: 'RM 630.00', note: '一条龙套餐 / Full Bundle' }
      ]
    },
    {
      title: '其他商品',
      subtitle: 'Express Supply Pass & Nameless Honor',
      icon: '◆',
      products: [
        { title: '列车补给凭证', en: 'Express Supply Pass', price: 'RM 18.00', note: '月卡 / Monthly Pass' },
        { title: '无名客的荣勋', en: 'Nameless Glory', price: 'RM 38.00', note: '纪行 / Battle Pass' },
        { title: '无名客的勋章', en: 'Nameless Medal', price: 'RM 76.00', note: '纪行升级 / Battle Pass Upgrade' }
      ]
    }
  ]
},
      {
  id: 'zenless-zone-zero',
  name: '绝区零',
  detailName: '国际服 · 绝区零',
  description: 'Zenless Zone Zero',
  tag: '热门充值',
  image: 'assets/images/games/zzz.jpg',
  detailArt: 'assets/images/games/zzz2.jpg',
  productSections: [
    {
      title: '菲林底片',
      subtitle: 'Monochrome',
      icon: '◆',
      products: [
        { title: '60 菲林底片', en: '60 Monochrome', price: 'RM 4.00', note: '菲林底片 / Monochrome' },
        { title: '300 菲林底片', en: '300 Monochrome', price: 'RM 18.00', note: '菲林底片 / Monochrome' },
        { title: '980 菲林底片', en: '980 Monochrome', price: 'RM 54.00', note: '菲林底片 / Monochrome' },
        { title: '1980 菲林底片', en: '1980 Monochrome', price: 'RM 105.00', note: '菲林底片 / Monochrome' },
        { title: '3280 菲林底片', en: '3280 Monochrome', price: 'RM 170.00', note: '菲林底片 / Monochrome' },
        { title: '6480 菲林底片', en: '6480 Monochrome', price: 'RM 300.00', note: '菲林底片 / Monochrome' },
        { title: '60 - 6480 一条龙', en: 'Full Bundle 60 - 6480 Monochrome', price: 'RM 630.00', note: '一条龙套餐 / Full Bundle' }
      ]
    },
    {
      title: '其他商品',
      subtitle: 'Membership & Plans',
      icon: '◆',
      products: [
        { title: '绳网会员', en: 'Inter-Knot Membership', price: 'RM 18.00', note: '会员 / Membership' },
        { title: '成长计划', en: 'Growth Plan', price: 'RM 38.00', note: '计划 / Plan' },
        { title: '典藏计划', en: 'Premium Plan', price: 'RM 76.00', note: '典藏计划 / Premium Plan' }
      ]
    }
  ]
},
      {
  id: 'wuthering-waves',
  name: '鸣潮',
  detailName: '国际服 · 鸣潮',
  description: 'Wuthering Waves',
  tag: '热门充值',
  image: 'assets/images/games/wuwa.jpg',
  detailArt: 'assets/images/games/wuwa2.jpg',
  productSections: [
    {
      title: '月相',
      subtitle: 'Lunite',
      icon: '◆',
      products: [
        { title: '60 月相', en: '60 Lunite', price: 'RM 4.00', note: '月相 / Lunite' },
        { title: '300 月相', en: '300 Lunite', price: 'RM 18.00', note: '月相 / Lunite' },
        { title: '980 月相', en: '980 Lunite', price: 'RM 54.00', note: '月相 / Lunite' },
        { title: '1980 月相', en: '1980 Lunite', price: 'RM 108.00', note: '月相 / Lunite' },
        { title: '3280 月相', en: '3280 Lunite', price: 'RM 180.00', note: '月相 / Lunite' },
        { title: '6480 月相', en: '6480 Lunite', price: 'RM 330.00', note: '月相 / Lunite' },
        { title: '60 - 6480 一条龙', en: 'Full Bundle 60 - 6480 Lunite', price: 'RM 680.00', note: '一条龙套餐 / Full Bundle' }
      ]
    },
    {
      title: '其他商品',
      subtitle: 'Subscription & Podcast',
      icon: '◆',
      products: [
        { title: '月相观测卡', en: 'Lunite Subscription', price: 'RM 19.00', note: '月卡 / Monthly Pass' },
        { title: '寰宇频道', en: 'Insider Channel', price: 'RM 38.00', note: '通行证 / Battle Pass' },
        { title: '寰宇特约', en: 'Connoisseur Channel', price: 'RM 76.00', note: '通行证升级 / Premium Battle Pass' }
      ]
    }
  ]
},
      {
  id: 'pokemon-tcg-pocket',
  name: 'Pokémon TCG Pocket',
  detailName: 'Pokémon TCG Pocket',
  description: 'Pokémon TCG Pocket',
  tag: '热门充值',
  image: 'assets/images/games/TCG.jpg',
  detailArt: 'assets/images/games/TCG2.jpg',
  productSections: [
    {
      title: 'Poké Gold',
      subtitle: 'Poké Gold',
      icon: '◆',
      products: [
        { title: '5 Poké Gold', en: '5 Poké Gold', price: 'RM 4.00', note: 'Poké Gold / Top-Up' },
        { title: '25 + 1 Poké Gold', en: '25 + 1 Poké Gold', price: 'RM 19.00', note: '额外 +1 / Bonus +1' },
        { title: '50 + 7 Poké Gold', en: '50 + 7 Poké Gold', price: 'RM 38.00', note: '额外 +7 / Bonus +7' },
        { title: '100 + 20 Poké Gold', en: '100 + 20 Poké Gold', price: 'RM 76.00', note: '额外 +20 / Bonus +20' },
        { title: '200 + 50 Poké Gold', en: '200 + 50 Poké Gold', price: 'RM 144.00', note: '额外 +50 / Bonus +50' },
        { title: '500 + 190 Poké Gold', en: '500 + 190 Poké Gold', price: 'RM 350.00', note: 'HOT 推荐 / Bonus +190' }
      ]
    },
    {
      title: '礼包',
      subtitle: 'Gift Pack',
      icon: '◆',
      products: [
        { title: '礼包', en: 'Gift Pack', price: 'RM 87.00', note: '礼包 / Gift Pack' }
      ]
    }
  ]
},

      {
  id: 'honor-of-kings-global',
  name: '王者荣耀国际服',
  detailName: '国际服 · 王者荣耀',
  description: 'Honor of Kings Global',
  tag: '热门充值',
  image: 'assets/images/games/hok.jpg',
  detailArt: 'assets/images/games/hok2.jpg',
  productSections: [
    {
      title: '点券',
      subtitle: 'Tokens',
      icon: '◆',
      products: [
        { title: '80 点券', en: '80 Tokens', price: 'RM 4.00', note: '国际服点券 / Global Tokens' },
        { title: '240 点券', en: '240 Tokens', price: 'RM 12.00', note: '国际服点券 / Global Tokens' },
        { title: '400 点券', en: '400 Tokens', price: 'RM 20.00', note: '国际服点券 / Global Tokens' },
        { title: '560 点券', en: '560 Tokens', price: 'RM 28.00', note: '国际服点券 / Global Tokens' },
        { title: '830 点券', en: '830 Tokens', price: 'RM 38.00', note: '国际服点券 / Global Tokens' },
        { title: '1245 点券', en: '1245 Tokens', price: 'RM 57.00', note: '国际服点券 / Global Tokens' },
        { title: '2508 点券', en: '2508 Tokens', price: 'RM 114.00', note: '国际服点券 / Global Tokens' },
        { title: '4180 点券', en: '4180 Tokens', price: 'RM 188.00', note: 'HOT 推荐 / Most Popular' },
        { title: '8360 点券', en: '8360 Tokens', price: 'RM 365.00', note: 'BEST VALUE 推荐 / Best Value' }
      ]
    }
  ]
},
      {
  id: 'pubg-mobile',
  name: 'PUBG Mobile',
  detailName: 'PUBG Mobile',
  description: 'PUBG Mobile UC',
  tag: '热门充值',
  image: 'assets/images/games/PUBG.jpg',
  detailArt: 'assets/images/games/PUBG2.jpg',
  productSections: [
    {
      title: 'UC',
      subtitle: 'UC',
      icon: '◆',
      products: [
        { title: '60 UC', en: '60 UC', price: 'RM 4.30', note: 'UC 充值 / UC Top-Up' },
        { title: '300 + 25 UC', en: '300 + 25 UC', price: 'RM 20.00', note: 'UC 充值 / UC Top-Up' },
        { title: '600 + 60 UC', en: '600 + 60 UC', price: 'RM 39.00', note: 'UC 充值 / UC Top-Up' },
        { title: '1500 + 300 UC', en: '1500 + 300 UC', price: 'RM 97.50', note: 'UC 充值 / UC Top-Up' },
        { title: '3000 + 850 UC', en: '3000 + 850 UC', price: 'RM 190.00', note: 'UC 充值 / UC Top-Up' },
        { title: '6000 + 2100 UC', en: '6000 + 2100 UC', price: 'RM 380.00', note: 'HOT 推荐 / UC Top-Up' },
        { title: '12000 + 4200 UC', en: '12000 + 4200 UC', price: 'RM 760.00', note: 'UC 充值 / UC Top-Up' },
        { title: '18000 + 6300 UC', en: '18000 + 6300 UC', price: 'RM 1140.00', note: 'UC 充值 / UC Top-Up' }
      ]
    },
    {
      title: '其他商品',
      subtitle: 'Other Items',
      icon: '◆',
      products: [
        { title: '普通会员 1 月', en: 'Normal Membership 1 Month', price: 'RM 4.30', note: '会员 / Membership' },
        { title: '普通会员 12 月', en: 'Normal Membership 12 Months', price: 'RM 51.60', note: '会员 / Membership' },
        { title: '高级会员 1 月', en: 'Prime Membership 1 Month', price: 'RM 42.00', note: '高级会员 / Prime Membership' },
        { title: '高级会员 12 月', en: 'Prime Membership 12 Months', price: 'RM 490.00', note: '高级会员 / Prime Membership' },
        { title: '其他礼包', en: 'Other Gift Packs', price: '详情询问', note: '其他礼包 / Please Ask Customer Service' }
      ]
    }
  ]
},
      {
  id: 'garena-codm',
  name: 'Garena 使命召唤',
  detailName: 'Garena 使命召唤',
  description: 'Garena CODM',
  tag: '热门充值',
  image: 'assets/images/games/codm.jpg',
  detailArt: 'assets/images/games/codm2.jpg',
  productSections: [
    {
      title: 'CP',
      subtitle: 'CP',
      icon: '◆',
      products: [
        { title: '114 CP', en: '114 CP', price: 'RM 6.00', note: 'CP 充值 / CP Top-Up' },
        { title: '230 + 23 CP', en: '230 + 23 CP', price: 'RM 10.80', note: 'CP 充值 / CP Top-Up' },
        { title: '460 + 69 CP', en: '460 + 69 CP', price: 'RM 20.50', note: 'CP 充值 / CP Top-Up' },
        { title: '690 + 104 CP', en: '690 + 104 CP', price: 'RM 31.00', note: 'CP 充值 / CP Top-Up' },
        { title: '1150 + 173 CP', en: '1150 + 173 CP', price: 'RM 51.00', note: 'CP 充值 / CP Top-Up' },
        { title: '2300 + 460 CP', en: '2300 + 460 CP', price: 'RM 103.00', note: 'CP 充值 / CP Top-Up' },
        { title: '4600 + 1840 CP', en: '4600 + 1840 CP', price: 'RM 205.00', note: 'HOT 推荐 / CP Top-Up' }
      ]
    }
  ]
},
      {
  id: 'garena-delta-force',
  name: 'Garena 三角洲',
  detailName: 'Garena 三角洲',
  description: 'Garena Delta Force',
  tag: '热门充值',
  image: 'assets/images/games/三角洲1.jpg',
  detailArt: 'assets/images/games/三角洲2.jpg',
  productSections: [
    {
      title: 'Delta Coin',
      subtitle: 'Delta Coin',
      icon: '◆',
      products: [
        { title: '60 Delta Coin', en: '60 Delta Coin', price: 'RM 4.50', note: 'Delta Coin 充值 / Delta Coin Top-Up' },
        { title: '300 + 20 Delta Coin', en: '300 + 20 Delta Coin', price: 'RM 22.00', note: 'Delta Coin 充值 / Delta Coin Top-Up' },
        { title: '420 + 40 Delta Coin', en: '420 + 40 Delta Coin', price: 'RM 30.00', note: 'Delta Coin 充值 / Delta Coin Top-Up' },
        { title: '680 + 70 Delta Coin', en: '680 + 70 Delta Coin', price: 'RM 43.00', note: 'Delta Coin 充值 / Delta Coin Top-Up' },
        { title: '1280 + 200 Delta Coin', en: '1280 + 200 Delta Coin', price: 'RM 86.00', note: 'Delta Coin 充值 / Delta Coin Top-Up' },
        { title: '1680 + 300 Delta Coin', en: '1680 + 300 Delta Coin', price: 'RM 106.00', note: 'Delta Coin 充值 / Delta Coin Top-Up' },
        { title: '3280 + 670 Delta Coin', en: '3280 + 670 Delta Coin', price: 'RM 213.00', note: 'Delta Coin 充值 / Delta Coin Top-Up' },
        { title: '6480 + 1620 Delta Coin', en: '6480 + 1620 Delta Coin', price: 'RM 400.00', note: 'HOT 推荐 / Delta Coin Top-Up' },
        { title: '12960 + 3888 Delta Coin', en: '12960 + 3888 Delta Coin', price: 'RM 810.00', note: 'HOT 推荐 / Delta Coin Top-Up' },
        { title: '19440 + 5832 Delta Coin', en: '19440 + 5832 Delta Coin', price: 'RM 1215.00', note: 'Delta Coin 充值 / Delta Coin Top-Up' }
      ]
    }
  ]
},
      {
  id: 'mobile-legends',
  name: 'Mobile Legends',
  detailName: 'Mobile Legends BangBang',
  description: 'MLBB GLOBAL',
  tag: '热门充值',
  image: 'assets/images/games/mlbb.jpg',
  detailArt: 'assets/images/games/mlbb2.jpg',
  productSections: [
    {
      title: '钻石',
      subtitle: 'Diamonds',
      icon: '◆',
      products: [
        { title: '250 + 25 Diamonds', en: '250 + 25 Diamonds', price: 'RM 20.00', note: '钻石充值 / Diamonds Top-Up' },
        { title: '500 + 65 Diamonds', en: '500 + 65 Diamonds', price: 'RM 40.00', note: '钻石充值 / Diamonds Top-Up' },
        { title: '1000 + 160 Diamonds', en: '1000 + 160 Diamonds', price: 'RM 80.00', note: '钻石充值 / Diamonds Top-Up' },
        { title: '1500 + 270 Diamonds', en: '1500 + 270 Diamonds', price: 'RM 120.00', note: '钻石充值 / Diamonds Top-Up' },
        { title: '2500 + 475 Diamonds', en: '2500 + 475 Diamonds', price: 'RM 190.00', note: '钻石充值 / Diamonds Top-Up' },
        { title: '5000 + 1000 Diamonds', en: '5000 + 1000 Diamonds', price: 'RM 380.00', note: 'BEST VALUE 推荐 / Diamonds Top-Up' }
      ]
    },
    {
      title: '其他商品',
      subtitle: 'Other Items',
      icon: '◆',
      products: [
        { title: 'Weekly Diamond Pass', en: 'Weekly Diamond Pass', price: 'RM 10.00', note: '周卡 / Weekly Pass' },
        { title: 'Weekly Limited Elite Bundle', en: 'Weekly Limited Elite Bundle', price: 'RM 5.00', note: '礼包 / Bundle' },
        { title: 'Monthly Limited Epic Bundle', en: 'Monthly Limited Epic Bundle', price: 'RM 25.00', note: '礼包 / Bundle' },
        { title: 'Twilight Pass', en: 'Twilight Pass', price: 'RM 45.00', note: '通行证 / Pass' }
      ]
    }
  ]
},

{
        id: 'pokemon-go',
        name: 'Pokemon Go',
        description: 'Pokémon GO',
        tag: '国际游戏',
        image: 'assets/images/games/go.jpg',
        detailArt: 'assets/images/games/go2.jpg',
        products: [
                { title: '14500 金币', en: '14500金币', price: 'RM 135.00', note: 'BEST VALUE 推荐 / Diamonds Top-Up' }
        ]
      },

      {
  id: 'last-war-survival',
  name: '最后的战争',
  detailName: '最后的战争',
  description: 'Last War: Survival',
  tag: '国际游戏',
  image: 'assets/images/games/last.jpg',
  detailArt: 'assets/images/games/last2.jpg',
  productSections: [
    {
      title: '美金礼包',
      subtitle: 'USD Packages',
      icon: '◆',
      products: [
        { title: '4.99 美金礼包', en: '4.99 USD Hot Package', price: 'RM 16.50', note: '4.99 USD 进位计算 / Hot Package' },
        { title: '9.99 美金礼包', en: '9.99 USD Package', price: 'RM 33.00', note: '9.99 USD 进位计算 / USD Package' },
        { title: '19.99 美金礼包', en: '19.99 USD Package', price: 'RM 66.00', note: '19.99 USD 进位计算 / USD Package' },
        { title: '24.99 美金礼包', en: '24.99 USD Package', price: 'RM 82.50', note: '24.99 USD 进位计算 / USD Package' },
        { title: '49.99 美金礼包', en: '49.99 USD Package', price: 'RM 165.00', note: '49.99 USD 进位计算 / USD Package' },
        { title: '99.99 美金礼包', en: '99.99 USD Package', price: 'RM 330.00', note: '99.99 USD 进位计算 / USD Package' }
      ]
    }
  ]
},

{
  id: 'kingshot',
  name: '国王战争',
  detailName: '国王战争',
  description: 'KingShot',
  tag: '国际游戏',
  image: 'assets/images/games/king.jpg',
  detailArt: 'assets/images/games/king2.jpg',
  productSections: [
    {
      title: '美金礼包',
      subtitle: 'USD Packages',
      icon: '◆',
      products: [
        { title: '4.99 美金礼包', en: '4.99 USD Hot Package', price: 'RM 18.00', note: '4.99 USD 进位计算 / Hot Package' },
        { title: '9.99 美金礼包', en: '9.99 USD Package', price: 'RM 36.00', note: '9.99 USD 进位计算 / USD Package' },
        { title: '19.99 美金礼包', en: '19.99 USD Package', price: 'RM 72.00', note: '19.99 USD 进位计算 / USD Package' },
        { title: '24.99 美金礼包', en: '24.99 USD Package', price: 'RM 90.00', note: '24.99 USD 进位计算 / USD Package' },
        { title: '49.99 美金礼包', en: '49.99 USD Package', price: 'RM 180.00', note: '49.99 USD 进位计算 / USD Package' },
        { title: '99.99 美金礼包', en: '99.99 USD Package', price: 'RM 360.00', note: '99.99 USD 进位计算 / USD Package' }
      ]
    }
  ]
},

{
  id: 'whiteout-survival',
  name: '寒霜启示录',
  detailName: '寒霜启示录',
  description: 'Whiteout Survival',
  tag: '国际游戏',
  image: 'assets/images/games/white.jpg',
  detailArt: 'assets/images/games/white2.jpg',
  productSections: [
    {
      title: '美金礼包',
      subtitle: 'USD Packages',
      icon: '◆',
      products: [
        { title: '4.99 美金礼包', en: '4.99 USD Hot Package', price: 'RM 18.00', note: '4.99 USD 进位计算 / Hot Package' },
        { title: '9.99 美金礼包', en: '9.99 USD Package', price: 'RM 36.00', note: '9.99 USD 进位计算 / USD Package' },
        { title: '19.99 美金礼包', en: '19.99 USD Package', price: 'RM 72.00', note: '19.99 USD 进位计算 / USD Package' },
        { title: '24.99 美金礼包', en: '24.99 USD Package', price: 'RM 90.00', note: '24.99 USD 进位计算 / USD Package' },
        { title: '49.99 美金礼包', en: '49.99 USD Package', price: 'RM 180.00', note: '49.99 USD 进位计算 / USD Package' },
        { title: '99.99 美金礼包', en: '99.99 USD Package', price: 'RM 360.00', note: '99.99 USD 进位计算 / USD Package' }
      ]
    }
  ]
},

      {
  id: 'neverness-to-everness',
  name: 'NTE 异环',
  detailName: 'NTE 异环',
  description: 'Neverness to Everness',
  tag: '国际游戏',
  image: 'assets/images/games/nte.jpg',
  detailArt: 'assets/images/games/nte2.jpg',
  productSections: [
    {
      title: '昇晶充值',
      subtitle: 'Riftcrystal Top-Up',
      icon: '◆',
      products: [
        { title: '60 昇晶', en: '60 Riftcrystals', price: 'RM 3.80', note: '昇晶充值 / Riftcrystal Top-Up' },
        { title: '300 昇晶', en: '300 Riftcrystals', price: 'RM 19.00', note: '昇晶充值 / Riftcrystal Top-Up' },
        { title: '980 昇晶', en: '980 Riftcrystals', price: 'RM 57.00', note: '昇晶充值 / Riftcrystal Top-Up' },
        { title: '1980 昇晶', en: '1980 Riftcrystals', price: 'RM 114.00', note: '昇晶充值 / Riftcrystal Top-Up' },
        { title: '3280 昇晶', en: '3280 Riftcrystals', price: 'RM 180.00', note: '昇晶充值 / Riftcrystal Top-Up' },
        { title: '6480 昇晶', en: '6480 Riftcrystals', price: 'RM 350.00', note: '昇晶充值 / Riftcrystal Top-Up' },
        { title: '昇晶开采凭证', en: 'Riftcrystal Permit', price: 'RM 19.00', note: 'HOT 推荐 / Riftcrystal Permit' }
      ]
    },
    {
      title: '特惠补给',
      subtitle: 'Packages',
      icon: '◆',
      products: [
        { title: '精锐猎人补给', en: 'Elite Hunter Supply', price: 'RM 38.00', note: '补给礼包 / Supply Package' },
        { title: '荣誉猎人补给', en: 'Honor Hunter Supply', price: 'RM 76.00', note: '补给礼包 / Supply Package' }
      ]
    }
  ]
},

{
  id: 'zhang-jian-chuan-shuo',
  name: '仗剑传说',
  detailName: '仗剑传说',
  description: 'Sword X Staff',
  tag: '国际游戏',
  image: 'assets/images/games/仗剑.jpg',
  detailArt: 'assets/images/games/仗剑2.jpg',
  productSections: [
    {
      title: '代金券',
      subtitle: 'Voucher',
      icon: '◆',
      products: [
        { title: '299 + 15 代金券', en: '299 + 15 Vouchers', price: 'RM 12.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '999 + 40 代金券', en: '999 + 40 Vouchers', price: 'RM 38.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '1499 + 60 代金券', en: '1499 + 60 Vouchers', price: 'RM 57.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '1999 + 100 代金券', en: '1999 + 100 Vouchers', price: 'RM 76.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '2999 + 140 代金券', en: '2999 + 140 Vouchers', price: 'RM 114.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '4999 + 250 代金券', en: '4999 + 250 Vouchers', price: 'RM 190.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '9999 + 500 代金券', en: '9999 + 500 Vouchers', price: 'RM 365.00', note: 'HOT 推荐 / Voucher Top-Up' },
        { title: '29999 + 1500 代金券', en: '29999 + 1500 Vouchers', price: 'RM 1095.00', note: 'HOT 推荐 / Voucher Top-Up' }
      ]
    },
    {
      title: '特惠礼包',
      subtitle: 'Special Packs',
      icon: '◆',
      products: [
        { title: '特惠技能礼包', en: 'Special Skill Pack', price: 'RM 20.00', note: '特惠礼包 / Special Pack' },
        { title: '特惠遗物礼包', en: 'Special Relic Pack', price: 'RM 38.00', note: '特惠礼包 / Special Pack' },
        { title: '特惠幻兽礼包', en: 'Special Phantom Beast Pack', price: 'RM 114.00', note: '特惠礼包 / Special Pack' }
      ]
    }
  ]
},

{
  id: 'wen-jian-chang-sheng',
  name: '问剑长生',
  detailName: '问剑长生',
  description: '问剑长生 · 御剑斗法',
  tag: '国际游戏',
  image: 'assets/images/games/问剑.jpg',
  detailArt: 'assets/images/games/问剑2.jpg',
  productSections: [
    {
      title: '代金券',
      subtitle: 'Voucher',
      icon: '◆',
      products: [
        { title: '499 代金券', en: '499 Vouchers', price: 'RM 19.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '999 代金券', en: '999 Vouchers', price: 'RM 38.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '1,999 代金券', en: '1,999 Vouchers', price: 'RM 76.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '2,998 代金券', en: '2,998 Vouchers', price: 'RM 114.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '4,999 代金券', en: '4,999 Vouchers', price: 'RM 190.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '9,999 代金券', en: '9,999 Vouchers', price: 'RM 365.00', note: 'HOT 推荐 / Voucher Top-Up' },
        { title: '19,999 代金券', en: '19,999 Vouchers', price: 'RM 730.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '29,999 代金券', en: '29,999 Vouchers', price: 'RM 1095.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '49,999 代金券', en: '49,999 Vouchers', price: 'RM 1820.00', note: '代金券充值 / Voucher Top-Up' },
        { title: '99,998 代金券', en: '99,998 Vouchers', price: 'RM 3600.00', note: 'HOT 推荐 / Voucher Top-Up' }
      ]
    }
  ]
},

{
  id: 'where-winds-meet',
  name: '燕云十六声',
  detailName: '国际服 · 燕云十六声',
  description: 'Where Winds Meet',
  tag: '国际游戏',
  image: 'assets/images/games/16.jpg',
  detailArt: 'assets/images/games/162.jpg',
  productSections: [
    {
      title: '长鸣珠',
      subtitle: 'Echo Beads',
      icon: '◆',
      products: [
        { title: '60 长鸣珠', en: '60 Echo Beads', price: 'RM 4.30', note: '长鸣珠 / Changming Pearl' },
        { title: '180 长鸣珠', en: '180 Echo Beads', price: 'RM 12.00', note: '长鸣珠 / Changming Pearl' },
        { title: '300 长鸣珠', en: '300 Echo Beads', price: 'RM 19.00', note: '长鸣珠 / Changming Pearl' },
        { title: '600 长鸣珠', en: '600 Echo Beads', price: 'RM 38.00', note: '长鸣珠 / Changming Pearl' },
        { title: '900 长鸣珠', en: '900 Echo Beads', price: 'RM 57.00', note: '长鸣珠 / Changming Pearl' },
        { title: '1800 长鸣珠', en: '1800 Echo Beads', price: 'RM 114.00', note: '长鸣珠 / Changming Pearl' },
        { title: '3000 长鸣珠', en: '3000 Echo Beads', price: 'RM 190.00', note: '长鸣珠 / Changming Pearl' },
        { title: '6000 长鸣珠', en: '6000 Echo Beads', price: 'RM 340.00', note: 'HOT 推荐 / Changming Pearl' }
      ]
    },
    {
      title: '其他商品',
      subtitle: 'Other Items',
      icon: '◆',
      products: [
        { title: '月度礼金【月卡】', en: 'Monthly Pass', price: 'RM 19.00', note: '月卡 / Monthly Pass' },
        { title: '精英战令', en: 'Elite Battle Pass', price: 'RM 38.00', note: '战令 / Battle Pass' },
        { title: '典藏战令', en: 'Premium Battle Pass', price: 'RM 76.00', note: '典藏战令 / Premium Battle Pass' }
      ]
    }
  ]
},

{
  id: 'crystal-of-atlan',
  name: '晶核',
  detailName: '国际服 · 晶核',
  description: 'Crystal of Atlan',
  tag: '国际游戏',
  image: 'assets/images/games/coa.jpg',
  detailArt: 'assets/images/games/coa2.jpg',
  productSections: [
    {
      title: '欧泊',
      subtitle: 'Opals',
      icon: '◆',
      products: [
        { title: '60 欧泊', en: '60 Opals', price: 'RM 4.00', note: '赠送 9 / Bonus +9' },
        { title: '300 欧泊', en: '300 Opals', price: 'RM 19.00', note: '赠送 60 / Bonus +60' },
        { title: '980 欧泊', en: '980 Opals', price: 'RM 57.00', note: '赠送 229 / Bonus +229' },
        { title: '1980 欧泊', en: '1980 Opals', price: 'RM 114.00', note: '赠送 499 / Bonus +499' },
        { title: '3280 欧泊', en: '3280 Opals', price: 'RM 185.00', note: '赠送 965 / Bonus +965' },
        { title: '6480 欧泊', en: '6480 Opals', price: 'RM 360.00', note: '赠送 2126 / Bonus +2126' }
      ]
    },
    {
      title: '代金券',
      subtitle: 'Vouchers',
      icon: '◆',
      products: [
        { title: '60 代金券', en: '60 Vouchers', price: 'RM 4.00', note: '赠送 5 / Bonus +5' },
        { title: '300 代金券', en: '300 Vouchers', price: 'RM 19.00', note: '赠送 25 / Bonus +25' },
        { title: '980 代金券', en: '980 Vouchers', price: 'RM 57.00', note: '赠送 81 / Bonus +81' },
        { title: '1980 代金券', en: '1980 Vouchers', price: 'RM 114.00', note: '赠送 165 / Bonus +165' },
        { title: '3280 代金券', en: '3280 Vouchers', price: 'RM 190.00', note: '赠送 273 / Bonus +273' },
        { title: '6480 代金券', en: '6480 Vouchers', price: 'RM 380.00', note: '赠送 540 / Bonus +540' }
      ]
    },
    {
      title: '幻晶月令',
      subtitle: 'Phantasium Pass',
      icon: '◆',
      products: [
        { title: '15 天幻晶月令', en: '15-Day Phantasium Pass', price: 'RM 13.00', note: '赠送 8 欧泊 / Bonus +8 Opals' },
        { title: '30 天幻晶月令', en: '30-Day Phantasium Pass', price: 'RM 22.00', note: '赠送 14 欧泊 / Bonus +14 Opals' }
      ]
    }
  ]
},

{
  id: 'sword-of-justice',
  name: 'Sword Of Justice',
  detailName: 'Sword Of Justice',
  description: 'Sword Of Justice',
  tag: '国际游戏',
  image: 'assets/images/games/sword-of-justice.jpg',
  detailArt: 'assets/images/games/sword-of-justice2.jpg',
  productSections: [
    {
      title: '礼包',
      subtitle: 'Package',
      icon: '◆',
      products: [
        { title: '100 美金礼包', en: '100 USD Package', price: 'RM 340.00', note: '100 美金 / 100 USD Package' }
      ]
    }
  ]
},
{
  id: 'ragnarok-origin-classic',
  name: 'Ragnarok Origin Classic',
  detailName: 'Ragnarok Origin Classic',
  description: 'Ragnarok Origin Classic',
  tag: '国际游戏',
  image: 'assets/images/games/ragnarok-origin-classic.jpg',
  detailArt: 'assets/images/games/ragnarok-origin-classic2.jpg',
  productSections: [
    {
      title: '礼包',
      subtitle: 'Package',
      icon: '◆',
      products: [
        { title: '100 美金礼包', en: '100 USD Package', price: 'RM 340.00', note: '100 美金 / 100 USD Package' }
      ]
    }
  ]
},
{
  id: 'dark-war-survival',
  name: 'Dark War Survival',
  detailName: 'Dark War Survival',
  description: 'Dark War Survival',
  tag: '国际游戏',
  image: 'assets/images/games/dark-war-survival.jpg',
  detailArt: 'assets/images/games/dark-war-survival2.jpg',
  productSections: [
    {
      title: '礼包',
      subtitle: 'Package',
      icon: '◆',
      products: [
        { title: '100 美金礼包', en: '100 USD Package', price: 'RM 340.00', note: '100 美金 / 100 USD Package' }
      ]
    }
  ]
},
{
  id: 'heartopia',
  name: '心动小镇',
  detailName: '心动小镇 Heartopia',
  description: 'Heartopia',
  tag: '国际游戏',
  image: 'assets/images/games/heartopia.jpg',
  detailArt: 'assets/images/games/heartopia2.jpg',
  productSections: [
    {
      title: '礼包',
      subtitle: 'Package',
      icon: '◆',
      products: [
        { title: '100 美金礼包', en: '100 USD Package', price: 'RM 340.00', note: '100 美金 / 100 USD Package' }
      ]
    }
  ]
},
{
  id: 'douluo-liehun-shijie',
  name: '斗罗大陆 · 猎魂世界',
  detailName: '斗罗大陆 · 猎魂世界',
  description: 'Douluo Dalu Liehun Shijie',
  tag: '国际游戏',
  image: 'assets/images/games/douluo-liehun-shijie.jpg',
  detailArt: 'assets/images/games/douluo-liehun-shijie2.jpg',
  productSections: [
    {
      title: '海神币',
      subtitle: 'Sea God Coin',
      icon: '◆',
      products: [
        { title: '3290 海神币', en: '3290 Sea God Coins', price: 'RM 340.00', note: '海神币 / Sea God Coin' }
      ]
    }
  ]
},
{
  id: 'jianxia-qingyuan',
  name: '剑侠情缘',
  detailName: '剑侠情缘',
  description: 'Jianxia Qingyuan',
  tag: '国际游戏',
  image: 'assets/images/games/jianxia-qingyuan.jpg',
  detailArt: 'assets/images/games/jianxia-qingyuan2.jpg',
  productSections: [
    {
      title: '礼包',
      subtitle: 'Package',
      icon: '◆',
      products: [
        { title: '100 美金礼包', en: '100 USD Package', price: 'RM 340.00', note: '100 美金 / 100 USD Package' }
      ]
    }
  ]
},
{
  id: 'legends-of-mushroom',
  name: 'Legends of Mushroom',
  detailName: 'Legends of Mushroom',
  description: 'Legends of Mushroom',
  tag: '国际游戏',
  image: 'assets/images/games/legends-of-mushroom.jpg',
  detailArt: 'assets/images/games/legends-of-mushroom2.jpg',
  productSections: [
    {
      title: '礼包',
      subtitle: 'Package',
      icon: '◆',
      products: [
        { title: '100 美金礼包', en: '100 USD Package', price: 'RM 340.00', note: '100 美金 / 100 USD Package' }
      ]
    }
  ]
},
{
  id: 'zombie-wave',
  name: 'Zombie Wave',
  detailName: 'Zombie Wave',
  description: 'Zombie Wave',
  tag: '国际游戏',
  image: 'assets/images/games/zombie-wave.jpg',
  detailArt: 'assets/images/games/zombie-wave2.jpg',
  productSections: [
    {
      title: '礼包',
      subtitle: 'Package',
      icon: '◆',
      products: [
        { title: '100 美金礼包', en: '100 USD Package', price: 'RM 340.00', note: '100 美金 / 100 USD Package' }
      ]
    }
  ]
},
{
  id: 'ni-shui-han-tw',
  name: '逆水寒 台服',
  detailName: '逆水寒 台服',
  description: 'Ni Shui Han Taiwan',
  tag: '国际游戏',
  image: 'assets/images/games/ni-shui-han-tw.jpg',
  detailArt: 'assets/images/games/ni-shui-han-tw2.jpg',
  productSections: [
    {
      title: '礼包',
      subtitle: 'Package',
      icon: '◆',
      products: [
        { title: '100 美金礼包', en: '100 USD Package', price: 'RM 340.00', note: '100 美金 / 100 USD Package' }
      ]
    }
  ]
},
{
  id: 'lands-of-jails',
  name: 'Lands Of Jails',
  detailName: 'Lands Of Jails',
  description: 'Lands Of Jails',
  tag: '国际游戏',
  image: 'assets/images/games/lands-of-jails.jpg',
  detailArt: 'assets/images/games/lands-of-jails2.jpg',
  productSections: [
    {
      title: '礼包',
      subtitle: 'Package',
      icon: '◆',
      products: [
        { title: '100 美金礼包', en: '100 USD Package', price: 'RM 340.00', note: '100 美金 / 100 USD Package' }
      ]
    }
  ]
},

    ]
  },
  cn: {
    title: '中国服游戏',
    subtitle: 'Brilliant Gaming 精选热门中国服手游充值。',
    page: 'index.html',
    games: [
      {
  id: 'honor-of-kings-cn',
  name: '王者荣耀',
  detailName: '双系统 · 王者荣耀',
  description: '中国·腾讯 王者荣耀',
  tag: '热门充值',
  image: 'assets/images/games/王者荣耀.jpg',
  detailArt: 'assets/images/games/王者荣耀2.jpg',
  productSections: [
    
    {
      title: '苹果系统快充',
      subtitle: 'iOS Fast Top-Up',
      icon: '◆',
      products: [
        { title: '60 点券', en: '60 点券', price: 'RM 6.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '450 点券 赠送 25', en: '450 点券 + 25 赠送', price: 'RM 32.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '680 点券 赠送 35', en: '680 点券 + 35 赠送', price: 'RM 48.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '1180 点券 赠送 60', en: '1180 点券 + 60 赠送', price: 'RM 78.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '1980 点券 赠送 120', en: '1980 点券 + 120 赠送', price: 'RM 126.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '3480 点券 赠送 210', en: '3480 点券 + 210 赠送', price: 'RM 218.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '6480 点券 赠送 388', en: '6480 点券 + 388 赠送', price: 'RM 393.00', note: 'HOT 推荐 / iOS Fast Top-Up' },
        { title: '8980 点券 赠送 538', en: '8980 点券 + 538 赠送', price: 'RM 541.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '12980 点券 赠送 778', en: '12980 点券 + 778 赠送', price: 'RM 777.00', note: '苹果区快充 / iOS Fast Top-Up' }
      ]
    },

    {
      title: '安卓系统快充',
      subtitle: 'Android Fast Top-Up',
      icon: '◆',
      products: [
        { title: '60 点券', en: '60 点券', price: 'RM 6.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '180 点券', en: '180 点券', price: 'RM 15.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '300 点券', en: '300 点券', price: 'RM 24.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '680 点券', en: '680 点券', price: 'RM 48.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '1180 点券', en: '1180 点券', price: 'RM 78.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '1980 点券', en: '1980 点券', price: 'RM 126.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '3480 点券', en: '3480 点券', price: 'RM 218.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '6480 点券', en: '6480 点券', price: 'RM 393.00', note: 'HOT 推荐 / Android Fast Top-Up' },
        { title: '8980 点券', en: '8980 点券', price: 'RM 541.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '12980 点券', en: '12980 点券', price: 'RM 777.00', note: '安卓快充 / Android Fast Top-Up' }
      ]
    },
    
    {
      title: '双系统慢充',
      subtitle: 'Android / iOS Slow Top-Up',
      icon: '◆',
      products: [
        { title: '1000 点券', en: '1000 点券', price: 'RM 60.00', note: '双系统慢充，到账时间 5 分钟 - 24 小时 / Slow Top-Up' },
        { title: '2000 点券', en: '2000 点券', price: 'RM 120.00', note: 'HOT 推荐 / 双系统慢充，到账时间 5 分钟 - 24 小时' }
      ]
    }
  ]
},
      
      {
  id: 'peace-elite',
  name: '和平精英',
  detailName: '双系统 · 和平精英',
  description: '中国·腾讯 和平精英',
  tag: '热门充值',
  image: 'assets/images/games/和平精英.jpg',
  detailArt: 'assets/images/games/和平精英2.jpg',
  productSections: [
    {
      title: '苹果系统快充',
      subtitle: 'iOS Fast Top-Up',
      icon: '◆',
      products: [
        { title: '60 点券', en: '60 点券', price: 'RM 6.00', note: '苹果快充 / iOS Fast Top-Up' },
        { title: '300 点券 赠送 16', en: '300 点券 + 16 赠送', price: 'RM 24.00', note: '苹果快充 / iOS Fast Top-Up' },
        { title: '680 点券 赠送 38', en: '680 点券 + 38 赠送', price: 'RM 48.00', note: '苹果快充 / iOS Fast Top-Up' },
        { title: '1280 点券 赠送 88', en: '1280 点券 + 88 赠送', price: 'RM 84.00', note: '苹果快充 / iOS Fast Top-Up' },
        { title: '1980 点券 赠送 138', en: '1980 点券 + 138 赠送', price: 'RM 126.00', note: 'HOT 推荐 / iOS Fast Top-Up' },
        { title: '3280 点券 赠送 268', en: '3280 点券 + 268 赠送', price: 'RM 207.00', note: '苹果快充 / iOS Fast Top-Up' },
        { title: '6480 点券 赠送 568', en: '6480 点券 + 568 赠送', price: 'RM 393.00', note: 'HOT 推荐 / iOS Fast Top-Up' },
        { title: '8980 点券 赠送 788', en: '8980 点券 + 788 赠送', price: 'RM 541.00', note: '苹果快充 / iOS Fast Top-Up' },
        { title: '12980 点券 赠送 1138', en: '12980 点券 + 1138 赠送', price: 'RM 777.00', note: '苹果快充 / iOS Fast Top-Up' }
      ]
    },
    {
      title: '安卓系统快充',
      subtitle: 'Android Fast Top-Up',
      icon: '◆',
      products: [
        { title: '60 点券', en: '60 点券', price: 'RM 6.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '300 点券 赠送 16', en: '300 点券 + 16 赠送', price: 'RM 24.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '680 点券 赠送 38', en: '680 点券 + 38 赠送', price: 'RM 48.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '1280 点券 赠送 88', en: '1280 点券 + 88 赠送', price: 'RM 84.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '1980 点券 赠送 138', en: '1980 点券 + 138 赠送', price: 'RM 126.00', note: 'HOT 推荐 / Android Fast Top-Up' },
        { title: '3280 点券 赠送 268', en: '3280 点券 + 268 赠送', price: 'RM 207.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '6480 点券 赠送 568', en: '6480 点券 + 568 赠送', price: 'RM 393.00', note: 'HOT 推荐 / Android Fast Top-Up' },
        { title: '8980 点券 赠送 788', en: '8980 点券 + 788 赠送', price: 'RM 541.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '12980 点券 赠送 1138', en: '12980 点券 + 1138 赠送', price: 'RM 777.00', note: '安卓快充 / Android Fast Top-Up' }
      ]
    },
    {
      title: '双系统慢充',
      subtitle: 'Android / iOS Slow Top-Up',
      icon: '◆',
      products: [
        { title: '1000 点券', en: '1000 点券', price: 'RM 60.00', note: '双系统慢充，到账时间较慢 / Slow Top-Up' },
        { title: '2000 点券', en: '2000 点券', price: 'RM 120.00', note: 'HOT 推荐 / 双系统慢充，到账时间较慢' }
      ]
    },
    {
      title: '特权精英卡',
      subtitle: 'Elite Privilege Card',
      icon: '◆',
      products: [
        { title: '特权精英卡', en: '特权精英卡 18元', price: 'RM 15.00', note: '特权精英卡 / Elite Privilege Card' }
      ]
    }
  ]
},

{
  id: 'huoying-renzhe',
  name: '火影忍者手游',
  detailName: '双系统 · 火影忍者手游',
  description: '中国·腾讯 火影忍者手游',
  tag: '中国游戏',
  image: 'assets/images/games/火影.jpg',
  detailArt: 'assets/images/games/火影2.jpg',
  productSections: [
    {
      title: '金币',
      subtitle: '金币',
      icon: '◆',
      products: [
        { title: '60 金币', en: '60 金币', price: 'RM 6.00', note: '金币充值 / Jinbi Chongzhi' },
        { title: '180 金币', en: '180 金币', price: 'RM 15.00', note: '金币充值 / Jinbi Chongzhi' },
        { title: '250 金币', en: '250 金币', price: 'RM 20.00', note: '金币充值 / Jinbi Chongzhi' },
        { title: '500 金币', en: '500 金币', price: 'RM 38.00', note: '金币充值 / Jinbi Chongzhi' },
        { title: '980 金币', en: '980 金币', price: 'RM 66.00', note: '金币充值 / Jinbi Chongzhi' },
        { title: '1680 金币', en: '1680 金币', price: 'RM 109.00', note: '金币充值 / Jinbi Chongzhi' },
        { title: '3280 金币', en: '3280 金币', price: 'RM 207.00', note: '金币充值 / Jinbi Chongzhi' },
        { title: '6480 金币', en: '6480 金币', price: 'RM 393.00', note: 'HOT 推荐 / Jinbi Chongzhi' }
      ]
    },
    {
      title: '点券',
      subtitle: '点券',
      icon: '◆',
      products: [
        { title: '60 点券', en: '60 点券', price: 'RM 6.00', note: '点券充值 / Dianquan Chongzhi' },
        { title: '500 点券', en: '500 点券', price: 'RM 38.00', note: '点券充值 / Dianquan Chongzhi' },
        { title: '980 点券', en: '980 点券', price: 'RM 66.00', note: '点券充值 / Dianquan Chongzhi' },
        { title: '1980 点券', en: '1980 点券', price: 'RM 126.00', note: '点券充值 / Dianquan Chongzhi' },
        { title: '6480 点券', en: '6480 点券', price: 'RM 393.00', note: 'HOT 推荐 / Dianquan Chongzhi' }
      ]
    },
    {
      title: '其他商品',
      subtitle: 'Others Items',
      icon: '◆',
      products: [
        { title: '豪华忍法帖', en: '豪华忍法帖 25元', price: 'RM 25.00', note: 'HOT 推荐 / Haohua Renfatie' },
        { title: '传说忍法帖', en: '传说忍法帖 198元', price: 'RM 126.00', note: '推荐 / Chuanshuo Renfatie' }
      ]
    }
  ]
},
{
  id: 'jin-chan-chan',
  name: '金铲铲之战',
  detailName: '双系统 · 金铲铲',
  description: '中国·腾讯 金铲铲之战',
  tag: '中国游戏',
  image: 'assets/images/games/金铲铲.jpg',
  detailArt: 'assets/images/games/金铲铲2.jpg',
  productSections: [
    {
      title: '点券',
      subtitle: '点券',
      icon: '◆',
      products: [
        { title: '3000 + 108 点券', en: '3000 + 108 点券', price: 'RM 24.00', note: '赠送 108 / Dianquan Chongzhi' },
        { title: '6800 + 288 点券', en: '6800 + 288 点券', price: 'RM 48.00', note: '赠送 288 / Dianquan Chongzhi' },
        { title: '12800 + 588 点券', en: '12800 + 588 点券', price: 'RM 84.00', note: '赠送 588 / Dianquan Chongzhi' },
        { title: '19800 + 1088 点券', en: '19800 + 1088 点券', price: 'RM 126.00', note: '赠送 1088 / Dianquan Chongzhi' },
        { title: '32800 + 1788 点券', en: '32800 + 1788 点券', price: 'RM 207.00', note: '赠送 1788 / Dianquan Chongzhi' },
        { title: '64800 + 3588 点券', en: '64800 + 3588 点券', price: 'RM 393.00', note: 'HOT 推荐 / 赠送 3588' },
        { title: '89800 + 4973 点券', en: '89800 + 4973 点券', price: 'RM 541.00', note: '赠送 4973 / Dianquan Chongzhi' },
        { title: '129800 + 7190 点券', en: '129800 + 7190 点券', price: 'RM 777.00', note: 'HOT 推荐 / 赠送 7190' },
        { title: '199800 + 11068 点券', en: '199800 + 11068 点券', price: 'RM 1196.00', note: '赠送 11068 / Dianquan Chongzhi' }
      ]
    }
  ]
},
{
  id: 'luoke-wangguo',
  name: '洛克王国',
  detailName: '双系统 ·洛克王国',
  description: '中国·腾讯 洛克王国',
  tag: '中国游戏',
  image: 'assets/images/games/洛克王国.jpg',
  detailArt: 'assets/images/games/洛克王国2.jpg',
  productSections: [
    {
      title: '洛克钻',
      subtitle: '洛克钻',
      icon: '◆',
      products: [
        { title: '100 洛克钻', en: '100 洛克钻', price: 'RM 10.00', note: '洛克钻充值 / Luokezuan Chongzhi' },
        { title: '300 洛克钻', en: '300 洛克钻', price: 'RM 24.00', note: '洛克钻充值 / Luokezuan Chongzhi' },
        { title: '688 洛克钻', en: '688 洛克钻', price: 'RM 48.00', note: '洛克钻充值 / Luokezuan Chongzhi' },
        { title: '1200 洛克钻', en: '1200 洛克钻', price: 'RM 78.00', note: '洛克钻充值 / Luokezuan Chongzhi' },
        { title: '2060 洛克钻', en: '2060 洛克钻', price: 'RM 126.00', note: '洛克钻充值 / Luokezuan Chongzhi' },
        { title: '3725 洛克钻', en: '3725 洛克钻', price: 'RM 219.00', note: '洛克钻充值 / Luokezuan Chongzhi' },
        { title: '7128 洛克钻', en: '7128 洛克钻', price: 'RM 393.00', note: '推荐 / Luokezuan Chongzhi' },
        { title: '11000 洛克钻', en: '11000 洛克钻', price: 'RM 598.00', note: 'HOT 推荐 / Luokezuan Chongzhi' }
      ]
    }
  ]
},
{
  id: 'delta-force-cn',
  name: '三角洲行动',
  detailName: '双系统 · 三角洲',
  description: '中国·腾讯 三角洲行动',
  tag: '中国游戏',
  image: 'assets/images/games/三角洲.jpg',
  detailArt: 'assets/images/games/三角洲2.jpg',
  productSections: [
    {
      title: '三角币',
      subtitle: '三角币',
      icon: '◆',
      products: [
        { title: '60 三角币', en: '60 三角币', price: 'RM 6.00', note: '三角币充值 / Sanjiaobi Chongzhi' },
        { title: '300 三角币 赠送 20', en: '300 三角币 + 20 Bonus', price: 'RM 24.00', note: '赠送 20 / Sanjiaobi Chongzhi' },
        { title: '680 三角币 赠送 70', en: '680 三角币 + 70 Bonus', price: 'RM 48.00', note: '赠送 70 / Sanjiaobi Chongzhi' },
        { title: '1280 三角币 赠送 200', en: '1280 三角币 + 200 Bonus', price: 'RM 84.00', note: '赠送 200 / Sanjiaobi Chongzhi' },
        { title: '3280 三角币 赠送 670', en: '3280 三角币 + 670 Bonus', price: 'RM 207.00', note: '赠送 670 / Sanjiaobi Chongzhi' },
        { title: '6480 三角币 赠送 1620', en: '6480 三角币 + 1620 Bonus', price: 'RM 393.00', note: 'HOT 推荐 / 赠送 1620' }
      ]
    },
    {
      title: '其他商品',
      subtitle: 'Others Items',
      icon: '◆',
      products: [
        { title: '小黑卡', en: '小黑卡', price: 'RM 68.00', note: '小黑卡 / Xiaohei Ka' },
        { title: '悦享卡', en: '悦享卡', price: 'RM 68.00', note: '悦享卡 / Yuexiang Ka' },
        { title: '黑曜卡【普通】', en: '黑曜卡【普通】', price: 'RM 937.50', note: '黑曜卡普通 / Heiyao Ka Putong' },
        { title: '黑曜卡【豪华】', en: '黑曜卡【豪华】', price: 'RM 1875.00', note: '黑曜卡豪华 / Heiyao Ka Haohua' }
      ]
    }
  ]
},
{
  id: 'wangzhe-rongyao-shijie',
  name: '王者荣耀世界',
  detailName: '双系统 · 王者荣耀世界',
  description: '中国·腾讯 王者荣耀世界',
  tag: '中国游戏',
  image: 'assets/images/games/王者荣耀世界.jpg',
  detailArt: 'assets/images/games/王者荣耀世界2.jpg',
  productSections: [
    {
      title: '碎晶',
      subtitle: '碎晶',
      icon: '◆',
      products: [
        { title: '60 碎晶', en: '60 碎晶', price: 'RM 6.00', note: '碎晶充值 / Suijing Chongzhi' },
        { title: '180 碎晶', en: '180 碎晶', price: 'RM 15.00', note: '碎晶充值 / Suijing Chongzhi' },
        { title: '300 碎晶', en: '300 碎晶', price: 'RM 24.00', note: '碎晶充值 / Suijing Chongzhi' },
        { title: '680 碎晶', en: '680 碎晶', price: 'RM 48.00', note: '碎晶充值 / Suijing Chongzhi' },
        { title: '980 碎晶', en: '980 碎晶', price: 'RM 68.00', note: '碎晶充值 / Suijing Chongzhi' },
        { title: '1980 碎晶', en: '1980 碎晶', price: 'RM 126.00', note: '碎晶充值 / Suijing Chongzhi' },
        { title: '3280 碎晶', en: '3280 碎晶', price: 'RM 207.00', note: '碎晶充值 / Suijing Chongzhi' },
        { title: '6480 碎晶', en: '6480 碎晶', price: 'RM 393.00', note: '碎晶充值 / Suijing Chongzhi' }
      ]
    }
  ]
},
{
  id: 'wuwei-qiyue',
  name: '无畏契约手游',
  detailName: '双系统 · 无畏契约手游',
  description: '中国·腾讯 无畏契约手游',
  tag: '中国游戏',
  image: 'assets/images/games/无畏契约.jpg',
  detailArt: 'assets/images/games/无畏契约2.jpg',
  productSections: [
    {
      title: '点券',
      subtitle: '点券',
      icon: '◆',
      products: [
        { title: '60 点券', en: '60 点券', price: 'RM 6.00', note: '点券充值 / Dianquan Chongzhi' },
        { title: '100 点券', en: '100 点券', price: 'RM 10.00', note: '点券充值 / Dianquan Chongzhi' },
        { title: '300 + 8 点券', en: '300 + 8 点券', price: 'RM 24.00', note: '赠送 8 / Dianquan Chongzhi' },
        { title: '680 + 20 点券', en: '680 + 20 点券', price: 'RM 48.00', note: '赠送 20 / Dianquan Chongzhi' },
        { title: '1280 + 38 点券', en: '1280 + 38 点券', price: 'RM 84.00', note: '赠送 38 / Dianquan Chongzhi' },
        { title: '1980 + 80 点券', en: '1980 + 80 点券', price: 'RM 126.00', note: '赠送 80 / Dianquan Chongzhi' },
        { title: '3280 + 238 点券', en: '3280 + 238 点券', price: 'RM 207.00', note: '赠送 238 / Dianquan Chongzhi' },
        { title: '6480 + 738 点券', en: '6480 + 738 点券', price: 'RM 393.00', note: 'HOT 推荐 / 赠送 738' }
      ]
    },
    {
      title: '其他商品',
      subtitle: 'Others Items',
      icon: '◆',
      products: [
        { title: '无畏先行卡', en: '无畏先行卡', price: 'RM 15.00', note: '无畏先行卡 / Wuwei Xianxing Ka' }
      ]
    }
  ]
},
{
  id: 'yuanmeng-zhixing',
  name: '元梦之星',
  detailName: '双系统 · 元梦之星',
  description: '中国·腾讯 元梦之星',
  tag: '中国游戏',
  image: 'assets/images/games/元梦之星.jpg',
  detailArt: 'assets/images/games/元梦之星2.jpg',
  productSections: [
    {
      title: '星钻',
      subtitle: '星钻',
      icon: '◆',
      products: [
        { title: '60 星钻', en: '60 星钻', price: 'RM 6.00', note: '星钻充值 / Xingzuan Chongzhi' },
        { title: '325 星钻', en: '325 星钻', price: 'RM 24.00', note: '含赠送 / Xingzuan Chongzhi' },
        { title: '745 星钻', en: '745 星钻', price: 'RM 48.00', note: '含赠送 / Xingzuan Chongzhi' },
        { title: '1300 星钻', en: '1300 星钻', price: 'RM 78.00', note: '含赠送 / Xingzuan Chongzhi' },
        { title: '2185 星钻', en: '2185 星钻', price: 'RM 126.00', note: '含赠送 / Xingzuan Chongzhi' },
        { title: '3890 星钻', en: '3890 星钻', price: 'RM 218.00', note: '含赠送 / Xingzuan Chongzhi' },
        { title: '7280 星钻', en: '7280 星钻', price: 'RM 393.00', note: 'HOT 推荐 / Xingzuan Chongzhi' }
      ]
    }
  ]
}






    ]
  }
};


const homeFeaturedIds = [
  'genshin',
  'honkai-star-rail',
  'zenless-zone-zero',
  'wuthering-waves',
  'pokemon-tcg-pocket',
  'honor-of-kings-global',
  'honor-of-kings-cn',
  'peace-elite',
  'pubg-mobile',
  'garena-codm',
  'garena-delta-force',
  'mobile-legends'
];

function getQueryParams() {
  const query = new URLSearchParams(window.location.search);
  return {
    category: query.get('category') || '',
    gameId: query.get('game') || ''
  };
}

function getAvatarText(name) {
  const parts = name.split(/[\s：\-–]/).filter(Boolean);
  if (parts.length >= 2) {
    return parts.slice(0, 2).map((item) => item[0]).join('').toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function escapeAttribute(value) {
  return String(value || '').replace(/"/g, '&quot;');
}

function getAllGames() {
  return Object.entries(categories).flatMap(([categoryId, category]) =>
    (category.games || []).map((game) => ({ ...game, categoryId }))
  );
}

function getGameProducts(game) {
  if (!game) return [];
  if (Array.isArray(game.productSections)) {
    return game.productSections.flatMap((section) => section.products || []);
  }
  return game.products || [];
}
function getCurrentGameForCart() {
  const params = getQueryParams();
  const category = categories[params.category];

  if (!category) return null;

  return category.games.find((game) => game.id === params.gameId) || null;
}

function getProductCartTitle(product) {
  return product.en ? `${product.title} / ${product.en}` : product.title;
}

function getSortedCartEntries() {
  const currentGame = getCurrentGameForCart();
  const products = getGameProducts(currentGame);

  const orderMap = new Map();

  products.forEach((product, index) => {
    orderMap.set(getProductCartTitle(product), index);
    orderMap.set(product.title, index);
  });

  return cart
    .map((item, index) => ({
      item,
      index,
      order: orderMap.has(item.title) ? orderMap.get(item.title) : 999999 + index
    }))
    .sort((a, b) => a.order - b.order || a.index - b.index);
}
let cart = JSON.parse(localStorage.getItem(storageKey) || '[]');
let stats = JSON.parse(localStorage.getItem(statsKey) || '{}');
const page = document.body.dataset.page;
let isShowingAllGames = false;
let activeHomeCategory = 'all';


function saveCart() {
  localStorage.setItem(storageKey, JSON.stringify(cart));
}

function saveStats() {
  localStorage.setItem(statsKey, JSON.stringify(stats));
}

function parsePrice(price) {
  return Number(String(price).replace(/[^\d.-]/g, '')) || 0;
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
}

function formatTotal(total) {
  return `RM ${total.toFixed(2)}`;
}

function getTodayDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getDailyOrderStats() {
  const today = getTodayDateKey();
  const saved = JSON.parse(localStorage.getItem(dailyOrdersKey) || '{}');
  if (saved.date !== today) {
    return { date: today, count: 0, amount: 0 };
  }
  return {
    date: today,
    count: Number(saved.count) || 0,
    amount: Number(saved.amount) || 0
  };
}

function saveDailyOrderStats(data) {
  localStorage.setItem(dailyOrdersKey, JSON.stringify(data));
}

function updateDailyOrderStatsUI() {
  const data = getDailyOrderStats();
  const countNode = document.getElementById('todayOrderCount');
  const amountNode = document.getElementById('todayOrderAmount');
  if (countNode) countNode.textContent = data.count;
  if (amountNode) amountNode.textContent = formatTotal(data.amount);
}

function recordCopiedOrderStats(total) {
  const data = getDailyOrderStats();
  data.count += 1;
  data.amount += Number(total) || 0;
  saveDailyOrderStats(data);
  updateDailyOrderStatsUI();
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = getCartTotal();
  document.querySelectorAll('#cartCount').forEach((node) => (node.textContent = count));
  document.querySelectorAll('#cartSummary').forEach((node) => {
    node.textContent = `已选商品 ${count} 项`;
  });
  document.querySelectorAll('#cartTotal').forEach((node) => {
    node.textContent = `合计：${formatTotal(total)}`;
  });
  renderCartItems();
}

function renderCartItems() {
  const list = document.getElementById('cartList');
  if (!list) return;

  if (!cart.length) {
    list.innerHTML = '<div class="cart-empty">购物车空空如也，先添加一个商品吧。</div>';
    return;
  }

  const sortedCartEntries = getSortedCartEntries();

  list.innerHTML = sortedCartEntries
    .map(
      ({ item, index }) => `
      <div class="cart-item">
        <strong>${item.title}</strong>
        <span>数量：${item.quantity}</span>
        <span>价格：${item.price}</span>
        <div class="quantity-actions">
          <button class="adjust-qty" data-index="${index}" data-action="minus">-</button>
          <button class="adjust-qty" data-index="${index}" data-action="plus">+</button>
          <button class="remove-item" data-index="${index}">移除</button>
        </div>
      </div>`
    )
    .join('');
}

function showCartToast(message) {
  let toast = document.getElementById('cartToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cartToast';
    toast.className = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showCartToast.timer);
  showCartToast.timer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 1200);
}

function addToCart(title, price) {
  const existing = cart.find((item) => item.title === title && item.price === price);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ title, price, quantity: 1 });
  }
  saveCart();
  updateCartUI();
  showCartToast(`已加入：${title}`);
}

function removeCartItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function changeCartQuantity(index, action) {
  const item = cart[index];
  if (!item) return;
  if (action === 'plus') {
    item.quantity += 1;
  } else if (action === 'minus') {
    item.quantity -= 1;
  }
  cart = cart.filter((entry) => entry.quantity > 0);
  saveCart();
  updateCartUI();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

function toggleCartPanel() {
  const panel = document.getElementById('cartPanel');
  if (!panel) return;
  panel.classList.toggle('open');
}

function copyCartToClipboard() {
  if (!cart.length) {
    alert('购物车为空，无法复制订单。');
    return;
  }

  const total = getCartTotal();

  const currentGameName =
    document.getElementById('detailTitle')?.textContent.trim() ||
    document.getElementById('detailGameName')?.textContent.trim() ||
    'Brilliant Gaming';

  const lines = getSortedCartEntries().map(({ item }) => {
    const chineseTitle = String(item.title).split(' / ')[0].trim();
    return `${chineseTitle} x${item.quantity} - ${item.price}`;
  });

  const text = `Brilliant Gaming 购物单：
${currentGameName}
${lines.join('\n')}

合计：${formatTotal(total)}  请把以上内容发送给客服下单。`;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      recordCopiedOrderStats(total);
      showCartToast('购物单已复制，请联系客服完成充值');
    })
    .catch(() => alert('复制失败，请手动选择并复制。'));
}

function makeGameCover(game) {
  if (!game.image) {
    return `<div class="game-avatar"><span>${getAvatarText(game.name)}</span></div>`;
  }
  const fallback = escapeAttribute(getAvatarText(game.name));
  return `
    <div class="game-avatar game-cover">
      <img src="${game.image}" alt="${game.name}" data-fallback="${fallback}" onerror="this.parentElement.classList.remove('game-cover'); this.parentElement.innerHTML='<span>${fallback}</span>';">
    </div>`;
}

function makeHomeGameCard(categoryId, game) {
  return `
    <a class="game-card" href="game.html?category=${categoryId}&game=${game.id}" data-name="${game.name.toLowerCase()}" data-game-id="${game.id}" data-category="${categoryId}">
      ${makeGameCover(game)}
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <div class="tag">${game.tag}</div>
    </a>`;
}

function makeCategoryGameCard(categoryId, game) {
  return makeHomeGameCard(categoryId, game);
}

function makeProductCard(product) {
  const title = product.title || '';
  const en = product.en || '';
  const price = product.price || '';
  const cartTitle = en ? `${title} / ${en}` : title;

  return `
    <article class="product-card" role="button" tabindex="0" data-title="${escapeAttribute(cartTitle)}" data-price="${escapeAttribute(price)}" aria-label="加入购物车：${escapeAttribute(cartTitle)} ${escapeAttribute(price)}">
      <h3>${title}</h3>
      <p>${en}</p>
      <div class="product-price">${price}</div>
    </article>`;
}

function makeProductSections(game) {
  const sections = game.productSections || [];
  if (!sections.length) {
    const products = game.products || [];
    if (!products.length) {
      return '<div class="cart-empty">该游戏商品暂未上架，价格整理中。请先联系客服确认。</div>';
    }
    return `<div class="product-grid">${products.map(makeProductCard).join('')}</div>`;
  }

  return sections
    .map((section) => `
      <div class="product-section">
        <div class="product-section-header">
          <h3>
            <span class="product-section-main"><span class="product-section-icon">${section.icon || '◆'}</span>${section.title}</span>
            <span>${section.subtitle}</span>
          </h3>
        </div>
        <div class="product-grid">
          ${(section.products || []).map(makeProductCard).join('')}
        </div>
      </div>`)
    .join('');
}

function renderHomePage(showAll = false, filterCategory = 'all') {
  const container = document.getElementById('home-intl-grid');
  if (!container) return;

  const allGames = getAllGames();

  const featuredGames = homeFeaturedIds
    .map((id) => allGames.find((game) => game.id === id))
    .filter(Boolean);

  const hiddenGames = allGames.filter((game) => {
    return !homeFeaturedIds.includes(game.id);
  });

  let gamesToShow = showAll ? [...featuredGames, ...hiddenGames] : featuredGames;

  if (showAll && filterCategory !== 'all') {
    gamesToShow = gamesToShow.filter((game) => game.categoryId === filterCategory);
  }

  container.innerHTML = gamesToShow
    .map((game) => makeHomeGameCard(game.categoryId, game))
    .join('');

  const showAllButton = document.getElementById('showAllGamesButton');

  if (showAllButton) {
    showAllButton.textContent = showAll ? '收起游戏 ↑' : '查看全部游戏 ›';
  }

  renderHomeCategoryFilter(showAll, filterCategory);
}
function renderHomeCategoryFilter(showAll, filterCategory) {
  let filterWrap = document.getElementById('homeCategoryFilter');

  if (!filterWrap) {
    const container = document.getElementById('home-intl-grid');
    if (!container) return;

    filterWrap = document.createElement('div');
    filterWrap.id = 'homeCategoryFilter';
    filterWrap.className = 'home-category-filter';

    container.parentElement.insertBefore(filterWrap, container);
  }

  if (!showAll) {
    filterWrap.innerHTML = '';
    filterWrap.classList.add('hidden');
    return;
  }

  filterWrap.classList.remove('hidden');

  filterWrap.innerHTML = `
    <button type="button" class="home-filter-btn ${filterCategory === 'all' ? 'active' : ''}" data-home-filter="all">
      全部游戏
    </button>
    <button type="button" class="home-filter-btn ${filterCategory === 'intl' ? 'active' : ''}" data-home-filter="intl">
      国际服游戏
    </button>
    <button type="button" class="home-filter-btn ${filterCategory === 'cn' ? 'active' : ''}" data-home-filter="cn">
      中国服游戏
    </button>
  `;
}

function renderCategoryPage(pageId) {
  const pageConfig = categories[pageId];
  if (!pageConfig) return;
  const title = document.getElementById('pageTitle');
  const subtitle = document.getElementById('pageSubtitle');
  const container = document.getElementById('gamesGrid');
  if (title) title.textContent = pageConfig.title;
  if (subtitle) subtitle.textContent = pageConfig.subtitle;
  if (container) {
    container.innerHTML = pageConfig.games.map((game) => makeCategoryGameCard(pageId, game)).join('');
  }
}

function renderGamePage(categoryId, gameId) {
  const category = categories[categoryId];
  const game = category?.games.find((item) => item.id === gameId);
  const title = document.getElementById('detailTitle');
  const gameName = document.getElementById('detailGameName');
  const description = document.getElementById('detailGameDescription');
  const summary = document.getElementById('detailSummary');
  const tagline = document.getElementById('detailTagline');
  const backLink = document.getElementById('detailBackLink');
  const products = document.getElementById('gameProducts');

  if (!game) {
    if (title) title.textContent = '未找到游戏';
    if (summary) summary.textContent = '请返回首页选择正确的游戏。';
    if (products) products.innerHTML = '<div class="cart-empty">未找到该游戏，请返回首页继续选择。</div>';
    if (backLink) backLink.href = 'index.html';
    return;
  }

  const productCount = getGameProducts(game).length;
  const gameArt = game.detailArt || game.image || '';
  document.body.dataset.gameId = game.id;
  if (gameArt) {
    document.documentElement.style.setProperty('--game-art', `url("${gameArt}")`);
  } else {
    document.documentElement.style.removeProperty('--game-art');
  }
  if (title) title.textContent = game.detailName || game.name;
  if (gameName) gameName.textContent = game.name;
  if (description) description.textContent = game.description;
  if (summary) summary.textContent = game.description || '';
  if (tagline) {
    tagline.textContent = productCount
      ? ''
      : '该游戏价格正在整理中，请联系客服获取最新报价。';
  }
  if (backLink) backLink.href = category.page || 'index.html';
  if (products) products.innerHTML = makeProductSections(game);
}

function searchGames(query, categoryId = null) {
  const lowerQuery = query.toLowerCase();
  const results = [];
  Object.keys(categories).forEach((key) => {
    if (categoryId && key !== categoryId) return;
    categories[key].games.forEach((game) => {
      const products = getGameProducts(game);
      const searchable = [
        game.name,
        game.description,
        game.tag,
      ].join(' ').toLowerCase();

      if (searchable.includes(lowerQuery)) {
        const score =
          (game.name.toLowerCase() === lowerQuery ? 180 : 0) +
          (game.name.toLowerCase().startsWith(lowerQuery) ? 120 : 0) +
          (game.name.toLowerCase().includes(lowerQuery) ? 80 : 0) +
          (game.description.toLowerCase().includes(lowerQuery) ? 30 : 0) +
          (products.some((product) => `${product.title} ${product.en || ''}`.toLowerCase().includes(lowerQuery)) ? 20 : 0);
        const heat = (stats[`${key}-${game.id}`]?.clicks || 0) + (stats[`${key}-${game.id}`]?.searches || 0);
        results.push({ categoryId: key, game, score, heat });
      }
    });
  });
  return results.sort((a, b) => b.score - a.score || b.heat - a.heat);
}

function makeSearchResultCard(categoryId, game) {
  const categoryLabel = categories[categoryId]?.title || '';
  return `
    <a class="game-card" href="game.html?category=${categoryId}&game=${game.id}" data-name="${game.name.toLowerCase()}" data-game-id="${game.id}" data-category="${categoryId}">
      ${makeGameCover(game)}
      <div class="game-meta">
        <span class="game-category">${categoryLabel}</span>
      </div>
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <div class="tag">${game.tag}</div>
    </a>`;
}

function renderSearchResults(results, query) {
  const grid = document.getElementById('searchResultsGrid');
  const countText = document.getElementById('searchResultsCount');
  if (!grid || !countText) return;
  if (!query) {
    countText.textContent = '请输入关键词开始搜索';
    grid.innerHTML = '';
    return;
  }
  if (!results.length) {
    countText.textContent = `未找到与 “${query}” 匹配的游戏`;
    grid.innerHTML = '<div class="cart-empty">没有搜索到符合条件的游戏。</div>';
    return;
  }
  countText.textContent = `找到 ${results.length} 个结果，点击卡片即可进入充值页面`;
  grid.innerHTML = results.map(({ categoryId, game }) => makeSearchResultCard(categoryId, game)).join('');
}

function toggleSearchMode(active) {
  document.getElementById('searchResultsSection')?.classList.toggle('hidden', !active);
  document.querySelectorAll('.searchable-section').forEach((node) => {
    node.classList.toggle('hidden', active);
  });
}

function handleSearch(query) {
  const trimmed = query.trim();
  const hasQuery = trimmed.length > 0;
  const results = hasQuery ? searchGames(trimmed, page === 'home' ? null : page) : [];
  renderSearchResults(results, trimmed);
  toggleSearchMode(hasQuery);
}

function clearSearch() {
  const input = document.getElementById('searchInput');
  if (input) input.value = '';
  handleSearch('');
}

function initSearch() {
  const input = document.getElementById('searchInput') || document.querySelector('.search-box input');
  if (!input) return;
  input.id = 'searchInput';
  input.addEventListener('input', (event) => {
    handleSearch(event.target.value);
  });
}

function initHeaderLinks() {
  document.querySelectorAll('.site-nav a, .main-nav a').forEach((link) => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`.site-nav a[href$="${page}.html"], .main-nav a[href$="${page}.html"]`);
  if (activeLink) activeLink.classList.add('active');
}


function openContactModal() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('contact-modal-open');
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('contact-modal-open');
}

function copyTextToClipboard(value, successMessage = '已复制') {
  if (!value) return;
  navigator.clipboard
    .writeText(value)
    .then(() => showCartToast(successMessage))
    .catch(() => alert('复制失败，请手动复制。'));
}

function toggleFaqItem(button) {
  const item = button.closest('.faq-item');
  if (!item) return;
  item.classList.toggle('active');
}

function initEvents() {
  document.body.addEventListener('click', (event) => {
    const target = event.target;

    if (target.closest('[data-contact-open]')) {
      event.preventDefault();
      openContactModal();
      return;
    }

    if (target.closest('[data-contact-close]')) {
      event.preventDefault();
      closeContactModal();
      return;
    }

    const contactModal = document.getElementById('contactModal');
    if (contactModal && target === contactModal) {
      closeContactModal();
      return;
    }

    const copyButton = target.closest('[data-copy-value]');
    if (copyButton) {
      event.preventDefault();
      copyTextToClipboard(copyButton.dataset.copyValue, '微信 ID 已复制');
      return;
    }

    if (target.closest('[data-whatsapp-empty]')) {
      event.preventDefault();
      showCartToast('WhatsApp 暂未开放，请先使用微信或 Instagram');
      return;
    }

    const faqButton = target.closest('.faq-question');
    if (faqButton) {
      event.preventDefault();
      toggleFaqItem(faqButton);
      return;
    }

    const productCard = target.closest('.product-card[data-title][data-price]');
    if (productCard) {
      addToCart(productCard.dataset.title, productCard.dataset.price);
      return;
    }
    if (target.matches('.add-cart')) {
      const title = target.dataset.title;
      const price = target.dataset.price;
      addToCart(title, price);
    }
    if (target.matches('#cartToggle') || target.matches('#cartToggleMobile')) {
      event.preventDefault();
      toggleCartPanel();
    }
    if (target.matches('#cartClose')) {
      toggleCartPanel();
    }
    if (target.matches('#clearCartButton')) {
      clearCart();
    }
    if (target.matches('#clearSearch')) {
      clearSearch();
    }
    if (target.closest('#showAllGamesButton')) {
  event.preventDefault();

  isShowingAllGames = !isShowingAllGames;

  if (!isShowingAllGames) {
    activeHomeCategory = 'all';
  }

  renderHomePage(isShowingAllGames, activeHomeCategory);

  return;
}
const homeFilterButton = target.closest('[data-home-filter]');

if (homeFilterButton) {
  event.preventDefault();

  activeHomeCategory = homeFilterButton.dataset.homeFilter;
  renderHomePage(true, activeHomeCategory);

  return;
}

    if (target.matches('.adjust-qty')) {
      changeCartQuantity(Number(target.dataset.index), target.dataset.action);
    }
    if (target.matches('.remove-item')) {
      removeCartItem(Number(target.dataset.index));
    }
    if (target.closest('.game-card[data-game-id]')) {
      const card = target.closest('.game-card[data-game-id]');
      const gameId = card.dataset.gameId;
      const category = card.dataset.category;
      if (gameId && category) {
        const key = `${category}-${gameId}`;
        if (!stats[key]) stats[key] = { clicks: 0, searches: 0 };
        stats[key].clicks += 1;
        saveStats();
      }
    }
  });
  document.body.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const productCard = event.target.closest?.('.product-card[data-title][data-price]');
    if (!productCard) return;
    event.preventDefault();
    addToCart(productCard.dataset.title, productCard.dataset.price);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeContactModal();
  });
  document.getElementById('copyCartButton')?.addEventListener('click', copyCartToClipboard);
}

function start() {
  updateCartUI();
  updateDailyOrderStatsUI();
  initHeaderLinks();
  if (page === 'home') {
    renderHomePage();
    initSearch();
  } else if (page === 'game') {
    const params = getQueryParams();
    renderGamePage(params.category, params.gameId);
  } else if (categories[page]) {
    renderCategoryPage(page);
    initSearch();
  }
  initEvents();
}

window.addEventListener('DOMContentLoaded', start);
