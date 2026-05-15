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
        { title: '寰宇频道', en: 'Podcast Channel', price: 'RM 38.00', note: '通行证 / Battle Pass' },
        { title: '寰宇特约', en: 'Premium Podcast', price: 'RM 76.00', note: '通行证升级 / Premium Battle Pass' }
      ]
    }
  ]
},
      {
  id: 'pokemon-tcg-pocket',
  name: '宝可梦卡牌',
  detailName: '宝可梦卡牌',
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
        id: 'pokemon-go',
        name: 'Pokemon Go',
        description: 'Pokémon GO',
        tag: '热门充值',
        image: 'assets/images/games/pokemon-go.jpg',
        products: []
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
  name: 'Call of Duty Mobile',
  detailName: 'Call Of Duty Mobile',
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
  name: 'Garena Delta Force',
  detailName: 'Delta Force',
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
  detailName: '王者荣耀官方代充服务',
  description: 'WANG ZHE RONG YAO',
  tag: '热门充值',
  image: 'assets/images/games/王者荣耀.jpg',
  detailArt: 'assets/images/games/王者荣耀2.jpg',
  productSections: [
    
    {
      title: '苹果系统快充',
      subtitle: 'iOS Fast Top-Up',
      icon: '◆',
      products: [
        { title: '60 点券', en: '60 Tokens', price: 'RM 6.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '450 点券 赠送 25', en: '450 Tokens + 25 Bonus', price: 'RM 32.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '680 点券 赠送 35', en: '680 Tokens + 35 Bonus', price: 'RM 48.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '1180 点券 赠送 60', en: '1180 Tokens + 60 Bonus', price: 'RM 78.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '1980 点券 赠送 120', en: '1980 Tokens + 120 Bonus', price: 'RM 126.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '3480 点券 赠送 210', en: '3480 Tokens + 210 Bonus', price: 'RM 218.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '6480 点券 赠送 388', en: '6480 Tokens + 388 Bonus', price: 'RM 393.00', note: 'HOT 推荐 / iOS Fast Top-Up' },
        { title: '8980 点券 赠送 538', en: '8980 Tokens + 538 Bonus', price: 'RM 541.00', note: '苹果区快充 / iOS Fast Top-Up' },
        { title: '12980 点券 赠送 778', en: '12980 Tokens + 778 Bonus', price: 'RM 777.00', note: '苹果区快充 / iOS Fast Top-Up' }
      ]
    },

    {
      title: '安卓系统快充',
      subtitle: 'Android Fast Top-Up',
      icon: '◆',
      products: [
        { title: '60 点券', en: '60 Tokens', price: 'RM 6.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '180 点券', en: '180 Tokens', price: 'RM 15.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '300 点券', en: '300 Tokens', price: 'RM 24.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '680 点券', en: '680 Tokens', price: 'RM 48.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '1180 点券', en: '1180 Tokens', price: 'RM 78.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '1980 点券', en: '1980 Tokens', price: 'RM 126.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '3480 点券', en: '3480 Tokens', price: 'RM 218.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '6480 点券', en: '6480 Tokens', price: 'RM 393.00', note: 'HOT 推荐 / Android Fast Top-Up' },
        { title: '8980 点券', en: '8980 Tokens', price: 'RM 541.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '12980 点券', en: '12980 Tokens', price: 'RM 777.00', note: '安卓快充 / Android Fast Top-Up' }
      ]
    },
    
    {
      title: '双系统慢充',
      subtitle: 'Android / iOS Slow Top-Up',
      icon: '◆',
      products: [
        { title: '1000 点券', en: '1000 Tokens', price: 'RM 60.00', note: '双系统慢充，到账时间 5 分钟 - 24 小时 / Slow Top-Up' },
        { title: '2000 点券', en: '2000 Tokens', price: 'RM 120.00', note: 'HOT 推荐 / 双系统慢充，到账时间 5 分钟 - 24 小时' }
      ]
    }
  ]
},
      
      {
  id: 'peace-elite',
  name: '和平精英',
  detailName: '和平精英官方代充服务',
  description: 'HE PING JING YING',
  tag: '热门充值',
  image: 'assets/images/games/和平精英.jpg',
  detailArt: 'assets/images/games/和平精英2.jpg',
  productSections: [
    {
      title: '苹果系统快充',
      subtitle: 'iOS Fast Top-Up',
      icon: '◆',
      products: [
        { title: '60 点券', en: '60 Vouchers', price: 'RM 6.00', note: '苹果快充 / iOS Fast Top-Up' },
        { title: '300 点券 赠送 16', en: '300 Vouchers + 16 Bonus', price: 'RM 24.00', note: '苹果快充 / iOS Fast Top-Up' },
        { title: '680 点券 赠送 38', en: '680 Vouchers + 38 Bonus', price: 'RM 48.00', note: '苹果快充 / iOS Fast Top-Up' },
        { title: '1280 点券 赠送 88', en: '1280 Vouchers + 88 Bonus', price: 'RM 84.00', note: '苹果快充 / iOS Fast Top-Up' },
        { title: '1980 点券 赠送 138', en: '1980 Vouchers + 138 Bonus', price: 'RM 126.00', note: 'HOT 推荐 / iOS Fast Top-Up' },
        { title: '3280 点券 赠送 268', en: '3280 Vouchers + 268 Bonus', price: 'RM 207.00', note: '苹果快充 / iOS Fast Top-Up' },
        { title: '6480 点券 赠送 568', en: '6480 Vouchers + 568 Bonus', price: 'RM 393.00', note: 'HOT 推荐 / iOS Fast Top-Up' },
        { title: '8980 点券 赠送 788', en: '8980 Vouchers + 788 Bonus', price: 'RM 541.00', note: '苹果快充 / iOS Fast Top-Up' },
        { title: '12980 点券 赠送 1138', en: '12980 Vouchers + 1138 Bonus', price: 'RM 777.00', note: '苹果快充 / iOS Fast Top-Up' }
      ]
    },
    {
      title: '安卓系统快充',
      subtitle: 'Android Fast Top-Up',
      icon: '◆',
      products: [
        { title: '60 点券', en: '60 Vouchers', price: 'RM 6.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '300 点券 赠送 16', en: '300 Vouchers + 16 Bonus', price: 'RM 24.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '680 点券 赠送 38', en: '680 Vouchers + 38 Bonus', price: 'RM 48.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '1280 点券 赠送 88', en: '1280 Vouchers + 88 Bonus', price: 'RM 84.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '1980 点券 赠送 138', en: '1980 Vouchers + 138 Bonus', price: 'RM 126.00', note: 'HOT 推荐 / Android Fast Top-Up' },
        { title: '3280 点券 赠送 268', en: '3280 Vouchers + 268 Bonus', price: 'RM 207.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '6480 点券 赠送 568', en: '6480 Vouchers + 568 Bonus', price: 'RM 393.00', note: 'HOT 推荐 / Android Fast Top-Up' },
        { title: '8980 点券 赠送 788', en: '8980 Vouchers + 788 Bonus', price: 'RM 541.00', note: '安卓快充 / Android Fast Top-Up' },
        { title: '12980 点券 赠送 1138', en: '12980 Vouchers + 1138 Bonus', price: 'RM 777.00', note: '安卓快充 / Android Fast Top-Up' }
      ]
    },
    {
      title: '双系统慢充',
      subtitle: 'Android / iOS Slow Top-Up',
      icon: '◆',
      products: [
        { title: '1000 点券', en: '1000 Vouchers', price: 'RM 60.00', note: '双系统慢充，到账时间较慢 / Slow Top-Up' },
        { title: '2000 点券', en: '2000 Vouchers', price: 'RM 120.00', note: 'HOT 推荐 / 双系统慢充，到账时间较慢' }
      ]
    },
    {
      title: '特权精英卡',
      subtitle: 'Elite Privilege Card',
      icon: '◆',
      products: [
        { title: '特权精英卡', en: 'Elite Privilege Card', price: 'RM 15.00', note: '特权精英卡 / Elite Privilege Card' }
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
  'pokemon-go',
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

let cart = JSON.parse(localStorage.getItem(storageKey) || '[]');
let stats = JSON.parse(localStorage.getItem(statsKey) || '{}');
const page = document.body.dataset.page;

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
  list.innerHTML = cart
    .map(
      (item, index) => `
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
  const lines = cart.map((item) => `${item.title} x${item.quantity} - ${item.price}`);
  const text = `Brilliant Gaming 购物单：\n${lines.join('\n')}\n\n合计：${formatTotal(total)}\n\n请把以上内容发送给客服下单。`;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      recordCopiedOrderStats(total);
      showCartToast('购物单已复制，今日统计已更新');
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

function renderHomePage() {
  const container = document.getElementById('home-intl-grid');
  if (!container) return;
  const allGames = getAllGames();
  const featuredGames = homeFeaturedIds
    .map((id) => allGames.find((game) => game.id === id))
    .filter(Boolean);
  container.innerHTML = featuredGames.map((game) => makeHomeGameCard(game.categoryId, game)).join('');
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
        ...products.map((product) => `${product.title} ${product.en || ''} ${product.note || ''}`)
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
