(() => {
  'use strict';

  // English customer-facing copy is kept in this file.
  // Product prices remain in scripts.js so both languages always use the same price source.

  const storageKey = 'bge-language-v1';
  const supportedLanguages = new Set(['zh', 'en']);
  const queryLanguage = new URLSearchParams(window.location.search).get('lang');
  const storedLanguage = localStorage.getItem(storageKey);
  let language = supportedLanguages.has(queryLanguage)
    ? queryLanguage
    : (supportedLanguages.has(storedLanguage) ? storedLanguage : 'zh');

  if (supportedLanguages.has(queryLanguage)) {
    localStorage.setItem(storageKey, language);
  }

  const messages = {
    zh: {
      'language.switcher': '选择网站语言',
      'nav.open': '打开菜单',
      'nav.close': '关闭菜单',
      'currency.switcher': '选择显示币种',
      'cart.summary': '已选商品 {count} 项',
      'cart.total': '合计：{total}',
      'cart.empty': '购物车空空如也，先添加一个商品吧。',
      'cart.quantity': '数量：{quantity}',
      'cart.price': '价格：{price}',
      'cart.remove': '移除',
      'cart.added': '已加入：{title}',
      'cart.emptyCopy': '购物车为空，无法复制订单。',
      'cart.copied': '购物单已复制',
      'order.copied': '订单内容已复制',
      'order.copyFailed': '复制失败，请手动选择并复制。',
      'order.number': '订单编号',
      'order.time': '下单时间',
      'order.game': '游戏',
      'order.topupInfo': '充值资料',
      'order.products': '商品',
      'order.total': '合计',
      'order.unfilled': '未填写',
      'order.unfilledHelp': '未填写 / 请客服协助确认',
      'order.dialogTitle': '订单内容已复制',
      'order.dialogText': '请把刚刚复制的订单内容发送给客服确认。\n客服确认商品、金额与充值资料后，再进行付款。',
      'order.dialogNote': '付款前请先等待客服确认，避免资料或金额错误。',
      'order.dialogConfirm': '我知道了，联系客服',
      'topup.select': '请选择{label}',
      'topup.required': '请填写：{label}',
      'game.notFound': '未找到游戏',
      'game.notFoundSummary': '请返回首页选择正确的游戏。',
      'game.notFoundBody': '未找到该游戏，请返回首页继续选择。',
      'game.noProducts': '该游戏商品暂未上架，价格整理中。请先联系客服确认。',
      'game.pricingPending': '该游戏价格正在整理中，请联系客服获取最新报价。',
      'home.showLess': '收起游戏 ↑',
      'home.showAll': '查看全部游戏 ›',
      'home.filterAll': '全部游戏',
      'home.filterIntl': '国际服游戏',
      'home.filterCn': '中国服游戏',
      'home.filterCards': '点数 / 点卡',
      'search.prompt': '请输入关键词开始搜索',
      'search.none': '未找到与 “{query}” 匹配的游戏',
      'search.noneBody': '没有搜索到符合条件的游戏。',
      'search.askTitle': '还是找不到你要的游戏？',
      'search.askBody': '把游戏名称发给客服，我们会帮你确认是否可以充值。',
      'search.askButton': 'WhatsApp 询问这个游戏',
      'search.inquiryMessage': '你好，我在 Brilliant Gaming 网站搜索不到“{query}”。请问这个游戏可以充值吗？',
      'search.count': '找到 {count} 个结果，点击卡片即可进入充值页面',
      'product.addAria': '加入购物车：{title} {price}',
      'product.inquiryAria': '询问商品：{title}',
      'product.status.paused': '暂停接单',
      'product.status.soldout': '暂时售罄',
      'product.status.inquiry': '联系客服询价',
      'product.pausedNotice': '此商品目前暂停接单，请选择其他商品。',
      'product.soldoutNotice': '此商品目前暂时售罄，请选择其他商品。',
      'product.inquiryMessage': '你好，我想询问 {game} 的“{item}”。请问目前价格和充值方式是什么？',
      'catalog.updated': '价格更新：{date}',
      'service.online': '客服在线',
      'service.offline': '可以留言',
      'service.timezone': '马来西亚时间 · 每天 10AM - 2AM',
      'contact.orderTitle': '使用 WhatsApp 发送订单',
      'contact.orderIntro': '订单内容已复制。请点击下方 WhatsApp，把订单内容发送给客服确认。客服确认商品、金额与充值资料后，请再进行付款。',
      'contact.orderNoteLabel': '重要提醒：',
      'contact.orderNote': '目前请统一使用 WhatsApp 下单。付款前请先等待客服确认商品、金额与充值资料。',
      'contact.defaultTitle': '联系 Brilliant Gaming 客服',
      'contact.defaultIntro': '通过 WhatsApp 发送游戏、商品与充值资料。客服会先核对金额和付款方式，确认后再付款。',
      'contact.inquiryTitle': 'WhatsApp 商品询价',
      'contact.inquiryIntro': '询问内容已经准备好。点击下方 WhatsApp 即可发送给客服确认价格与充值方式。',
      'contact.inquiryNoteLabel': '询价商品：',
      'contact.inquiryNote': '客服会根据最新渠道与库存回复你，付款前请先等待确认。',
      'contact.hoursLabel': '客服时间：',
      'contact.hours': '每天 10AM - 2AM（马来西亚时间）。非营业时间可先留言，我们上线后会按顺序回复。',
      'contact.whatsappOrder': '自动带入订单内容',
      'contact.whatsappOpen': '推荐联系渠道 · 点击打开 WhatsApp',
      'contact.wechatCopied': '微信 ID 已复制',
      'contact.copied': '已复制',
      'contact.unavailable': 'WhatsApp 暂未开放，请先使用微信或 Instagram',
      'category.intl.title': '热门国际游戏',
      'category.intl.subtitle': 'Brilliant Gaming 精选热门国际服手游充值。',
      'category.cn.title': '热门中国服游戏',
      'category.cn.subtitle': 'Brilliant Gaming 精选热门中国服手游充值。',
      'category.cards.title': '点数与礼品卡',
      'category.cards.subtitle': '游戏点数、充值卡与礼品卡服务。'
    },
    en: {
      'language.switcher': 'Choose website language',
      'nav.open': 'Open menu',
      'nav.close': 'Close menu',
      'currency.switcher': 'Choose display currency',
      'cart.summary': '{count} item(s) selected',
      'cart.total': 'Total: {total}',
      'cart.empty': 'Your cart is empty. Add an item to get started.',
      'cart.quantity': 'Quantity: {quantity}',
      'cart.price': 'Price: {price}',
      'cart.remove': 'Remove',
      'cart.added': 'Added: {title}',
      'cart.emptyCopy': 'Your cart is empty. The order cannot be copied.',
      'cart.copied': 'Cart copied',
      'order.copied': 'Order copied',
      'order.copyFailed': 'Copy failed. Please select and copy the text manually.',
      'order.number': 'Order ID',
      'order.time': 'Order Time',
      'order.game': 'Game',
      'order.topupInfo': 'Top-Up Details',
      'order.products': 'Items',
      'order.total': 'Total',
      'order.unfilled': 'Not provided',
      'order.unfilledHelp': 'Not provided / Please confirm with customer service',
      'order.dialogTitle': 'Order Copied',
      'order.dialogText': 'Send the copied order to customer service for confirmation.\nPlease pay only after the items, amount, and top-up details are confirmed.',
      'order.dialogNote': 'Please wait for customer service confirmation before paying to avoid detail or amount errors.',
      'order.dialogConfirm': 'Got it, contact customer service',
      'topup.select': 'Select {label}',
      'topup.required': 'Please complete: {label}',
      'game.notFound': 'Game Not Found',
      'game.notFoundSummary': 'Please return to the home page and choose a valid game.',
      'game.notFoundBody': 'This game could not be found. Please return home and choose again.',
      'game.noProducts': 'Products for this game are not listed yet. Please contact customer service for the latest price.',
      'game.pricingPending': 'Prices are being prepared. Please contact customer service for the latest quote.',
      'home.showLess': 'Show Fewer Games ↑',
      'home.showAll': 'View All Games ›',
      'home.filterAll': 'All Games',
      'home.filterIntl': 'Global Games',
      'home.filterCn': 'China Games',
      'home.filterCards': 'Credits / Gift Cards',
      'search.prompt': 'Enter a keyword to search',
      'search.none': 'No games matched “{query}”',
      'search.noneBody': 'No matching games were found.',
      'search.askTitle': 'Still cannot find your game?',
      'search.askBody': 'Send the game name to our team and we will check whether a top-up is available.',
      'search.askButton': 'Ask on WhatsApp',
      'search.inquiryMessage': 'Hi, I could not find “{query}” on the Brilliant Gaming website. Is top-up available for this game?',
      'search.count': '{count} result(s) found. Select a card to open its top-up page.',
      'product.addAria': 'Add to cart: {title} {price}',
      'product.inquiryAria': 'Ask about item: {title}',
      'product.status.paused': 'Orders Paused',
      'product.status.soldout': 'Sold Out',
      'product.status.inquiry': 'Ask for Price',
      'product.pausedNotice': 'Orders for this item are currently paused. Please choose another item.',
      'product.soldoutNotice': 'This item is temporarily sold out. Please choose another item.',
      'product.inquiryMessage': 'Hi, I would like to ask about “{item}” for {game}. What is the current price and top-up method?',
      'catalog.updated': 'Prices updated: {date}',
      'service.online': 'Customer Service Online',
      'service.offline': 'Leave a Message',
      'service.timezone': 'Malaysia time · Daily 10AM - 2AM',
      'contact.orderTitle': 'Send Your Order via WhatsApp',
      'contact.orderIntro': 'Your order has been copied. Tap WhatsApp below and send it to customer service. Please pay only after the items, amount, and top-up details are confirmed.',
      'contact.orderNoteLabel': 'Important: ',
      'contact.orderNote': 'Please place orders through WhatsApp and wait for confirmation before making payment.',
      'contact.defaultTitle': 'Contact Brilliant Gaming',
      'contact.defaultIntro': 'Send the game, item, and top-up details through WhatsApp. We will confirm the amount and payment method before you pay.',
      'contact.inquiryTitle': 'Ask About an Item on WhatsApp',
      'contact.inquiryIntro': 'Your inquiry is ready. Tap WhatsApp below to ask our team about the latest price and top-up method.',
      'contact.inquiryNoteLabel': 'Item inquiry: ',
      'contact.inquiryNote': 'Our team will reply based on the latest channel availability and stock. Please wait for confirmation before paying.',
      'contact.hoursLabel': 'Customer service hours: ',
      'contact.hours': 'Daily, 10AM - 2AM (Malaysia time). Leave a message outside these hours and we will reply in order when we are online.',
      'contact.whatsappOrder': 'Order text included automatically',
      'contact.whatsappOpen': 'Recommended contact · Open WhatsApp',
      'contact.wechatCopied': 'WeChat ID copied',
      'contact.copied': 'Copied',
      'contact.unavailable': 'WhatsApp is temporarily unavailable. Please use WeChat or Instagram.',
      'category.intl.title': 'Popular Global Games',
      'category.intl.subtitle': 'Popular global game top-ups selected by Brilliant Gaming.',
      'category.cn.title': 'Popular China Games',
      'category.cn.subtitle': 'Popular China-server game top-ups selected by Brilliant Gaming.',
      'category.cards.title': 'Credits & Gift Cards',
      'category.cards.subtitle': 'Game credits, top-up cards, and gift card services.'
    }
  };

  const staticEnglish = {
    '快速找到游戏，直接查看充值面额': 'Find a game quickly and view top-up options',
    '今天要充值什么游戏？': 'Which game would you like to top up today?',
    '输入中文名或英文名，立即找到对应游戏与价格。': 'Search in Chinese or English to find the right game and prices instantly.',
    '搜索游戏，例如：原神、PUBG Mobile': 'Search games, e.g. Genshin Impact or PUBG Mobile',
    '输入即搜索': 'Search as you type',
    '自动搜索': 'Auto Search',
    '游戏分类': 'Game categories',
    '热门充值': 'Popular Top-Ups',
    '国际游戏': 'Global Games',
    '中国游戏': 'China Games',
    '点卡与礼品卡': 'Credits & Gift Cards',
    '全部游戏': 'All Games',
    '服务信息': 'Service information',
    '每天 10AM–2AM': 'Daily 10AM–2AM',
    '三种显示币种': 'Three display currencies',
    '人工确认订单': 'Orders checked by our team',
    '付款前核对资料': 'Details checked before payment',
    '登入、UID 与点卡': 'Login, UID and gift-card top-ups',
    '官方频道': 'Official channels',
    '选择你想看的内容': 'Choose the content you want to see',
    '每个频道主题不同，查看说明后再选择关注。': 'Each channel has a different focus. Check the description before following.',
    '游戏充值报价、活动更新与服务公告。': 'Game top-up prices, event updates, and service notices.',
    '手作花礼、节日礼物与客制作品。': 'Handmade flowers, seasonal gifts, and custom creations.',
    '3D 打印、动漫周边与创意礼物。': '3D prints, anime merchandise, and creative gifts.',
    '游戏活动情报': 'Game Event Updates',
    '热门活动、福利整理与游戏资讯。': 'Popular events, reward summaries, and game news.',
    'Brilliant Gaming 内容频道': 'Brilliant Gaming content channel',
    'Brilliant Gaming - 专业手游充值服务': 'Brilliant Gaming - Professional Game Top-Up Service',
    'Brilliant Gaming - 游戏充值详情': 'Brilliant Gaming - Game Top-Up Details',
    '玩家好评 - Brilliant Gaming': 'Customer Reviews - Brilliant Gaming',
    '国际游戏 - Brilliant Gaming Enterprise': 'Global Games - Brilliant Gaming Enterprise',
    '中国腾讯游戏 - Brilliant Gaming Enterprise': 'China Tencent Games - Brilliant Gaming Enterprise',
    'Brilliant Gaming 为马来西亚与新加坡玩家提供热门国际服、中国服游戏充值与人工客服支持。': 'Brilliant Gaming provides popular global and China-server game top-ups with personal support for players in Malaysia and Singapore.',
    'Brilliant Gaming 游戏充值商品、价格与充值资料确认页面。': 'Browse Brilliant Gaming top-up items, prices, and required order details.',
    '查看 Brilliant Gaming 客户的真实游戏充值评价与服务体验。': 'Read genuine customer reviews and top-up service experiences with Brilliant Gaming.',
    'Brilliant Gaming 国际服手游充值目录与游戏搜索。': 'Browse and search the Brilliant Gaming global game top-up catalog.',
    'Brilliant Gaming 中国腾讯游戏充值目录与游戏搜索。': 'Browse and search the Brilliant Gaming China Tencent game top-up catalog.',
    '国际游戏页面包含 42 款热门手游充值入口。搜索名字即可快速定位，需要更多游戏可直接联系客服询问。': 'Browse 42 popular global game top-up options. Search by name to find a game quickly, or contact us to ask about other games.',
    '完整 42 个国际游戏请查看下方列表。': 'Browse the complete list of 42 global games below.',
    '首页': 'Home',
    '游戏充值': 'Game Top-Up',
    '充值指南': 'Top-Up Guide',
    '关于我们': 'About Us',
    '常见问题': 'FAQ',
    '玩家好评': 'Reviews',
    '联系客服下单': 'Contact Us to Order',
    '专业手游充值服务': 'Professional Game Top-Up Service',
    '搜索游戏名称 / Game name': 'Search by game name',
    '搜索国际游戏名称': 'Search global games',
    '搜索腾讯游戏名称': 'Search Tencent games',
    'Brilliant Gaming 频道入口': 'Brilliant Gaming channel links',
    '安全可靠': 'Safe & Reliable',
    '快速处理': 'Fast Processing',
    '人工客服': 'Personal Support',
    '多种付款方式': 'Multiple Payment Methods',
    '关注更多内容频道': 'Follow Our Content Channels',
    'Brilliant Gaming｜充值与游戏资讯': 'Brilliant Gaming | Top-Ups & Game News',
    'Rupa Rupa Craft｜手作 · 花礼 · 定制': 'Rupa Rupa Craft | Handmade Flowers, Gifts & Custom Orders',
    'Nova Rupa Studio｜3D 打印小物': 'Nova Rupa Studio | 3D-Printed Collectibles',
    '小红书｜游戏活动情报': 'Xiaohongshu | Game Events & Updates',
    '小': 'X',
    '热门活动 · 福利整理 · 游戏资讯': 'Popular Events · Rewards · Game News',
    '搜索结果': 'Search Results',
    '请输入关键词开始搜索': 'Enter a keyword to search',
    '清除搜索': 'Clear Search',
    '热门充值游戏': 'Popular Top-Up Games',
    '查看全部游戏 ›': 'View All Games ›',
    '需要哪一种协助？': 'What do you need help with?',
    '选择入口，我们直接带你到下一步。': 'Choose an option and we will take you directly to the next step.',
    '我是新客户': 'I’m a New Customer',
    '打开图解，先了解如何选商品、发送订单与付款。': 'Open the visual guide to learn how to choose an item, send an order, and pay.',
    '查看新手图解 →': 'View First-Order Guide →',
    '第一次下单？查看流程与安全说明': 'First order? See the process and safety information.',
    '查看价格': 'View Prices',
    '直接返回游戏目录，选择游戏后查看当前充值面额。': 'Return to the game directory and choose a game to view current top-up options.',
    '前往游戏目录 →': 'Go to Game Directory →',
    '选择游戏，查看当前充值价格': 'Choose a game to view current top-up prices.',
    '联系客服': 'Contact Us',
    '找不到游戏或不确定资料？让客服协助确认。': 'Cannot find a game or unsure about the required details? Let our team confirm them.',
    '打开联系方式 →': 'Open Contact Options →',
    '有目标游戏？直接联系客服快速下单': 'Already know the game? Contact us for a quick order.',
    '下单流程': 'How to Order',
    '四个步骤完成下单；先由客服核对，确认后才付款。': 'Complete your order in four steps. Our team checks it before you pay.',
    '先确认，再付款': 'Confirm First, Then Pay',
    '客服会先核对商品、充值资料、金额和付款方式。': 'Our team checks the item, top-up details, amount, and payment method first.',
    '找到游戏与商品': 'Find Your Game and Item',
    '搜索游戏，确认服务器或版本，再选择需要的充值面额。': 'Search for the game, confirm the server or version, then choose a top-up option.',
    '填写充值资料': 'Enter Top-Up Details',
    '按照页面提示填写 UID、角色名、服务器或登录资料。': 'Enter the UID, character name, server, or login details requested on the page.',
    '发送订单给客服': 'Send the Order to Our Team',
    '检查购物车并复制订单，客服会确认资料、金额与付款方式。': 'Review the cart and copy the order. Our team will confirm the details, amount, and payment method.',
    '付款并完成充值': 'Pay and Complete the Top-Up',
    '收到客服确认后付款；充值完成后，我们会通知你检查到账。': 'Pay after receiving confirmation. We will notify you when the top-up is complete.',
    '从选择商品到复制购物单，每一步都让客户清楚知道下一步该做什么。': 'From choosing an item to sending the order, every step is clear and straightforward.',
    '人工客服核对': 'Verified by Customer Service',
    '下单前确认游戏资料、商品与付款方式，减少填错资料的风险。': 'We confirm your game details, items, and payment method before processing to reduce errors.',
    '选择游戏': 'Choose a Game',
    '从首页进入对应游戏页面，确认服务器与商品分类。': 'Open the game page from the home page and confirm the server and item category.',
    '选择商品': 'Choose an Item',
    '点击价格卡即可加入购物车，可在购物车调整数量。': 'Tap a price card to add it to the cart, then adjust the quantity if needed.',
    '核对商品与金额后，一键复制订单内容发送给客服。': 'Check the items and amount, then copy the order and send it to customer service.',
    '付款确认': 'Payment Confirmation',
    '客服确认资料与付款方式，付款后发送截图核对。': 'Customer service confirms your details and payment method. Send the receipt after payment.',
    '安排充值': 'Top-Up Processing',
    '确认无误后安排处理，完成后通知客户确认到账。': 'We process the top-up after confirmation and notify you when it is complete.',
    '为什么选择我们': 'Why Choose Us',
    '正规渠道、清楚报价、人工核对。': 'Legitimate channels, clear pricing, and personal order checks.',
    '正规充值渠道': 'Legitimate Top-Up Channels',
    '不使用黑卡、盗刷或来路不明的危险渠道。': 'No fraudulent cards, stolen payments, or unsafe unknown sources.',
    '价格清楚': 'Clear Pricing',
    '商品与币种清楚展示，下单前再次确认金额。': 'Items and currencies are clearly displayed, with the amount confirmed before ordering.',
    '人工核对': 'Personal Order Checks',
    '处理前核对游戏、商品、充值资料和付款方式。': 'We check the game, item, top-up details, and payment method before processing.',
    '长期稳定服务': 'Reliable Long-Term Service',
    '自 2019 年起，为马来西亚与新加坡玩家提供服务。': 'Serving players in Malaysia and Singapore since 2019.',
    'Brilliant Gaming 的优势': 'The Brilliant Gaming Advantage',
    '正规流程处理，保障交易体验': 'A proper process for a safer transaction experience.',
    '确认订单后尽快安排充值': 'Top-ups are arranged promptly after confirmation.',
    '价格透明': 'Transparent Pricing',
    '页面价格清楚展示，下单前可确认': 'Prices are clearly displayed and confirmed before ordering.',
    '客服协助核对资料，减少下单错误': 'Our team checks your details to reduce order errors.',
    '支持马来西亚与新加坡常用付款方式': 'Common Malaysian and Singaporean payment methods are supported.',
    '第一次下单，只需四步': 'Your First Order Takes Just Four Steps',
    '第一次充值？四步完成下单': 'First Top-Up? Complete Your Order in Four Steps',
    '跟着图解操作；不确定游戏资料时，可以随时联系客服。': 'Follow the visual guide. Contact us anytime if you are unsure about the game details.',
    '选择游戏、填写资料并发送订单；客服确认后再付款。': 'Choose a game, enter the details, and send the order. Pay only after our team confirms it.',
    '新客户下单图解': 'First-order visual guide',
    '搜索游戏并选择充值面额。': 'Search for a game and choose a top-up option.',
    '填写资料': 'Enter Details',
    '按照页面要求填写 UID 或登录资料。': 'Enter the UID or login details requested on the page.',
    '发送订单': 'Send the Order',
    '复制购物车内容并发给客服核对。': 'Copy the cart details and send them to our team for checking.',
    '客服确认后付款，等待充值完成。': 'Pay after confirmation and wait for the top-up to complete.',
    '重要：': 'Important:',
    '收到客服确认前，请不要先付款。': 'Do not pay before receiving confirmation from our team.',
    '请先等待客服确认商品、金额与付款方式，再进行付款。': 'Wait for our team to confirm the item, amount, and payment method before paying.',
    '查看完整下单流程': 'View the Full Order Process',
    '还是不确定？联系客服': 'Still Unsure? Contact Us',
    '查看完整流程': 'View Full Process',
    '直接联系客服': 'Contact Us',
    '关于 Brilliant Gaming': 'About Brilliant Gaming',
    '自 2019 年起，为马来西亚与新加坡玩家提供稳定的手游充值服务。': 'Providing reliable mobile game top-ups for players in Malaysia and Singapore since 2019.',
    '正规渠道 · 人工核对 · 稳定服务': 'Legitimate Channels · Personal Checks · Reliable Service',
    '我们提供国际服与中国服热门手游充值。每笔订单都会先确认游戏、商品、充值资料与付款方式，再安排处理。': 'We provide popular global and China-server game top-ups. Every order is checked for the game, item, top-up details, and payment method before processing.',
    '坚持使用正规渠道，不使用黑卡、盗刷或来源不明的危险低价方式。': 'We use legitimate channels and do not use fraudulent cards, stolen payments, or unsafe unknown low-price methods.',
    '持续服务马来西亚与新加坡玩家。': 'Continuously serving players in Malaysia and Singapore.',
    '正规渠道': 'Legitimate Channels',
    '拒绝黑卡、盗刷与来源不明的充值方式。': 'No fraudulent cards, stolen payments, or unknown top-up methods.',
    '商品与币种清楚展示，付款前再次确认。': 'Items and currencies are clearly displayed and confirmed again before payment.',
    '处理前核对商品、充值资料与付款方式。': 'Items, top-up details, and payment methods are checked before processing.',
    '自 2019 年 6 月开始，我们专注为新马玩家提供安全、稳定的手游充值服务。': 'Since June 2019, we have provided safe and reliable mobile game top-ups for players in Malaysia and Singapore.',
    '正规充值 · 安全优先 · 长期稳定服务': 'Legitimate Top-Ups · Safety First · Reliable Long-Term Service',
    'Brilliant Gaming 自 2019 年 6 月开始提供手游充值服务，长期服务马来西亚与新加坡玩家，覆盖中国服与国际服热门手游。': 'Brilliant Gaming has provided mobile game top-up services since June 2019, serving players in Malaysia and Singapore across popular China and global game servers.',
    '我们只做正规充值渠道，不做盗刷、不做黑卡，也不使用来路不明的危险渠道。每一笔订单都会由人工客服核对资料后再安排处理。': 'We only use legitimate top-up channels. We do not use stolen payments, fraudulent cards, or unsafe sources. Every order is checked by customer service before processing.',
    '自 2019 年 6 月开始经营手游充值服务，长期为新马玩家提供稳定充值体验。': 'Providing reliable game top-up services to Malaysian and Singaporean players since June 2019.',
    '0 封号记录': '0 Account Bans',
    '坚持正规充值方式，目前未遇过因我们充值导致封号的情况。': 'We use legitimate top-up methods and have not encountered an account ban caused by our service.',
    '正规充值': 'Legitimate Top-Ups',
    '不做盗刷、不做黑卡、不碰来路不明的危险低价渠道。': 'No stolen payments, fraudulent cards, or unsafe low-price channels.',
    '下单前核对游戏资料、付款方式与订单内容，减少填错资料的风险。': 'We check game details, payment methods, and order contents before processing.',
    '下单前可以先了解充值流程、安全说明与付款方式。': 'Learn about the top-up process, safety information, and payment methods before ordering.',
    '下单前，先确认资料、付款方式与处理规则。': 'Review the required details, payment method, and processing rules before ordering.',
    '充值安全吗？': 'Is the top-up safe?',
    '安全。Brilliant Gaming 自 2019 年 6 月开始提供手游充值服务，我们只做正规充值渠道，不做盗刷、不做黑卡、不碰来路不明的低价渠道。目前从未遇过因我们充值导致封号的情况。': 'Yes. Brilliant Gaming has provided game top-ups since June 2019. We only use legitimate channels and do not use stolen payments, fraudulent cards, or unsafe low-price sources. We have not encountered an account ban caused by our service.',
    '我们坚持使用正规充值渠道，不使用黑卡、盗刷或来源不明的低价方式。每笔订单都会在付款前由客服核对。': 'We use legitimate top-up channels and do not use fraudulent cards, stolen payments, or unsafe unknown low-price methods. Every order is checked before payment.',
    '需要提供什么资料？': 'What information do I need to provide?',
    '不同游戏需要的资料不同，一般会需要 UID、角色 ID、服务器、区服或账号相关识别资料。下单前客服会和你确认清楚，避免填错资料。': 'Requirements vary by game and may include a UID, character ID, server, region, or account details. Customer service will confirm everything before processing.',
    '页面会按游戏显示必填资料，通常包括 UID、角色名、服务器或登录资料。不确定时可以先联系客服。': 'The page shows the required details for each game, usually a UID, character name, server, or login details. Contact us first if you are unsure.',
    '一般多久到账？': 'How long does a top-up take?',
    '客服确认付款后会尽快处理。实际时间取决于游戏渠道、库存与排单情况；如有延迟，客服会主动说明。': 'Processing starts as soon as possible after payment is confirmed. Timing depends on the game channel, stock, and queue; we will inform you of delays.',
    '支持马来西亚与新加坡常用付款方式，包括 TNG eWallet、DuitNow QR、银行转账和 PayNow 等，实际以下单时客服确认为准。': 'Common Malaysian and Singaporean payment methods are supported, including TNG eWallet, DuitNow QR, bank transfer, and PayNow. Availability is confirmed when ordering.',
    '价格会受到汇率、渠道成本、活动与库存影响。付款前请以网站显示及客服最终确认金额为准。': 'Prices may change with exchange rates, channel costs, promotions, and stock. Please use the website price and final confirmed amount before paying.',
    '订单尚未处理时，可以联系客服询问是否能够取消；已经开始处理或充值完成的订单一般无法退款。': 'You may ask to cancel an order before processing starts. Orders already in processing or completed are generally non-refundable.',
    '请立即联系客服。订单尚未处理时可以协助修改；已经提交或完成后可能无法更改，因此付款前请再次核对。': 'Contact us immediately. Details can be corrected before processing, but may not be changeable after submission or completion. Check again before paying.',
    '请把游戏名称发送给 WhatsApp 客服，我们会确认是否支持充值及当前价格。': 'Send the game name to our WhatsApp team and we will confirm availability and the current price.',
    '客服时间为每天 10AM - 2AM（马来西亚时间）。非营业时间可以先留言，我们上线后会按顺序回复。': 'Customer service is available daily from 10AM to 2AM (Malaysia time). Leave a message outside these hours and we will reply in order when online.',
    '大多数订单会在确认付款后尽快安排。部分游戏会根据官方渠道、排单情况或活动高峰期有所延迟，如有特殊情况客服会主动说明。': 'Most orders are arranged promptly after payment confirmation. Some games may take longer because of official channels, order volume, or event peaks. We will tell you if there is a delay.',
    '支持哪些付款方式？': 'Which payment methods are supported?',
    '我们主要服务马来西亚与新加坡玩家，支持 TNG eWallet、DuitNow QR、银行转账、GrabPay、ShopeePay、PayNow 等常见付款方式。实际付款方式以下单时客服确认为准。': 'We mainly serve players in Malaysia and Singapore and support TNG eWallet, DuitNow QR, bank transfer, GrabPay, ShopeePay, PayNow, and other common methods. Available methods are confirmed when you order.',
    '为什么价格会变动？': 'Why do prices change?',
    '游戏充值价格会受到官方汇率、渠道成本、活动价格与库存情况影响，所以价格可能调整。下单前请以网站显示或客服最终确认为准。': 'Prices may change because of official exchange rates, channel costs, promotions, or availability. Please follow the website price or the final amount confirmed by customer service.',
    '下单后可以退款吗？': 'Can I get a refund after ordering?',
    '如果订单还没处理，可以联系客服确认是否可以取消。如果订单已经开始处理或已经充值完成，一般无法退款。': 'If processing has not started, contact us to check whether cancellation is possible. Orders that are already processing or completed are generally non-refundable.',
    '填错资料怎么办？': 'What if I entered the wrong details?',
    '请第一时间联系客服。如果订单还没开始处理，我们可以协助修改资料；如果已经提交或充值完成，就可能无法更改，所以付款前一定要确认资料正确。': 'Contact us immediately. We can help correct details before processing starts, but changes may not be possible after submission or completion. Always check your details before payment.',
    '没有看到我要充值的游戏怎么办？': 'What if my game is not listed?',
    '可以直接联系客服询问。网站会优先展示热门游戏，部分游戏可能没有公开放在首页，但仍然可以咨询是否支持充值。': 'Contact us directly. The website highlights popular games, but we may support additional games that are not shown on the home page.',
    '营业时间是几点？': 'What are your business hours?',
    '营业时间为每天 10AM - 2AM。非营业时间也可以留言，客服上线后会尽快回复。': 'Business hours are daily from 10AM to 2AM. You may leave a message outside business hours and we will reply when we are online.',
    'Brilliant Gaming 专注提供热门手游充值服务，覆盖中国服与国际服游戏，为马来西亚与新加坡玩家提供更方便、稳定的充值体验。': 'Brilliant Gaming provides convenient and reliable top-ups for popular China-server and global mobile games to players in Malaysia and Singapore.',
    '联系我们': 'Contact Us',
    '点击联系': 'Contact Now',
    '微信:': 'WeChat:',
    '营业时间:': 'Business Hours:',
    '每天 10AM - 2AM': 'Daily, 10AM - 2AM',
    '服务区域': 'Service Areas',
    '关闭': 'Close',
    '充值资料 · 登入充值': 'Top-Up Details · Login Top-Up',
    '适用于需要登入账号处理的游戏。资料只用于生成订单文字，不会上传或保存到网站数据库。': 'For games that require account login. These details are used only to prepare the order text and are not uploaded to or stored in a website database.',
    '充值资料 · UID充值': 'Top-Up Details · UID Top-Up',
    '适用于通过 UID、服务器或角色资料处理的游戏。': 'For games processed using a UID, server, or character details.',
    '充值资料 · 中国腾讯游戏': 'Top-Up Details · China Tencent Game',
    '适用于王者荣耀、和平精英等中国腾讯游戏。请确认系统、区服与角色名字正确。': 'For China Tencent games such as Honor of Kings and Peacekeeper Elite. Please verify the platform, region, server, and character name.',
    '付款方式': 'Payment Method',
    '登入方式': 'Login Method',
    '邮箱 / Email': 'Email',
    '账号 / Email': 'Account / Email',
    '请输入账号或邮箱': 'Enter the account or email',
    '账号密码': 'Account Password',
    '请输入账号密码': 'Enter the account password',
    '服务器': 'Server',
    '例如：服务器名称 / 区服名称 / Server Name': 'Example: server or region name',
    '请输入 UID': 'Enter the UID',
    '角色名字': 'Character Name',
    '请输入角色名字': 'Enter the character name',
    'UID / 玩家ID': 'UID / Player ID',
    '请输入 UID / 玩家ID': 'Enter the UID / Player ID',
    '服务器 / 区服': 'Server / Region',
    '例如：Asia / Global / 服务器名称': 'Example: Asia / Global / server name',
    '系统': 'Platform',
    '苹果 iOS': 'iOS',
    '安卓 Android': 'Android',
    '登录区': 'Login Region',
    '微信区': 'WeChat Region',
    'QQ区': 'QQ Region',
    '大区': 'Server Region',
    '例如：391区': 'Example: Region 391',
    '其他': 'Other',
    '请选择你常用的联系方式，把购物车订单、付款截图或游戏资料发送给客服确认。': 'Choose your preferred contact method and send the cart order, payment receipt, or game details to customer service for confirmation.',
    '微信 / WeChat': 'WeChat',
    '点击复制微信 ID': 'Copy WeChat ID',
    '点击打开 IG 私信': 'Open Instagram Messages',
    '点击打开 WhatsApp': 'Open WhatsApp',
    '营业时间：': 'Business Hours: ',
    '每天 10AM - 2AM。非营业时间也可以留言，客服上线后会尽快回复。': 'Daily, 10AM - 2AM. You may leave a message outside business hours and we will reply as soon as we are online.',
    '购物车': 'Cart',
    '🛒 购物车': '🛒 Cart',
    '已选商品 0 项': '0 items selected',
    '合计': 'Total',
    '清空购物车': 'Clear Cart',
    '联系客服完成充值': 'Contact Us to Complete Top-Up',
    '确认下单': 'Confirm Order',
    '打开购物车': 'Open Cart',
    '← 返回首页': '← Back to Home',
    '游戏名称': 'Game Name',
    '官方渠道 · 人工处理': 'Official Channels · Personal Processing',
    '去评价': 'Write a Review',
    '玩家真实评价': 'Real Customer Reviews',
    '真实反馈 · 人工审核 · 保护隐私 · 精选公开展示': 'Genuine Feedback · Manually Reviewed · Privacy Protected · Selected for Public Display',
    '留下评价': 'Leave a Review',
    '返回首页好评区': 'Back to Home Reviews',
    '审核说明': 'Review Policy',
    '评价由 Google Form 收集后进行人工审核；公开展示时会对昵称打码处理，并只展示已授权公开的评价内容。': 'Reviews are collected through Google Forms and manually checked. Display names are masked, and only reviews approved for public display are shown.',
    '已审核': 'Verified',
    '原神 · 6480 创世结晶': 'Genshin Impact · 6480 Genesis Crystals',
    '到账很快，客服回复也很清楚，第一次下单也很放心。之后还会继续支持！': 'The top-up arrived quickly and customer service explained everything clearly. I felt confident even on my first order and will order again!',
    '和平精英 · 点券充值': 'Peacekeeper Elite · Token Top-Up',
    '处理速度很快，付款后客服马上确认订单，整体体验很顺。': 'Processing was fast and customer service confirmed the order right after payment. The whole experience was smooth.',
    '价格不错，流程简单，客服也很有耐心解释。卡包顺利到账，很满意。': 'Good price, simple process, and patient explanations from customer service. The card pack arrived successfully and I am very satisfied.',
    'PUBG Mobile · UC 充值': 'PUBG Mobile · UC Top-Up',
    '第一次找 Brilliant Gaming 充值，到账速度比想象中快，资料核对也很仔细。': 'My first top-up with Brilliant Gaming arrived faster than expected, and they checked the details carefully.',
    '王者荣耀 · 点券充值': 'Honor of Kings · Token Top-Up',
    '客服回复快，价格也透明，没有乱加费用。之后充值会继续找你们。': 'Customer service replied quickly, pricing was transparent, and there were no unexpected fees. I will order again.',
    '崩坏：星穹铁道 · 古老梦华': 'Honkai: Star Rail · Oneiric Shards',
    '整体服务很稳定，付款后很快安排，客服态度也很好，推荐。': 'The service was reliable, processing started soon after payment, and customer service was friendly. Recommended.',
    '想分享你的充值体验？': 'Want to Share Your Top-Up Experience?',
    '点击按钮填写评价，我们审核后会以打码昵称的方式公开展示。': 'Submit a review and, after verification, we may display it publicly with your name masked.',
    '返回首页': 'Back to Home',
    '完整国际游戏列表': 'Full Global Games List',
    '国际游戏充值专区': 'Global Game Top-Ups',
    '国际游戏页面包含 30 款热门手游充值入口。搜索名字即可快速定位，需要更多游戏可直接复制购物单发给客服。': 'Browse top-ups for popular global mobile games. Search by name to find a game quickly, then copy your order and send it to customer service.',
    '搜索 + 购物车双功能，帮助用户高效完成订单准备。': 'Search and cart tools make preparing your order quick and easy.',
    '国际游戏': 'Global Games',
    '中国游戏': 'China Games',
    '首页已展示精选 9 个，完整 30 个国际游戏请查看下方列表。': 'The home page shows selected games. Browse the full global game list below.',
    '国际游戏充值、游戏代充与客服下单支持，页面风格专业简洁。': 'Global game top-ups with customer-service-assisted ordering.',
    '官方服务仅供充值咨询与订单复制使用，最终以客服实际报价与渠道为准。': 'This service is for top-up enquiries and order preparation. Final pricing and availability are confirmed by customer service.',
    '完整腾讯游戏列表': 'Full Tencent Games List',
    '中国腾讯游戏充值专区': 'China Tencent Game Top-Ups',
    '中国腾讯游戏页面展示热门王者荣耀、和平精英、金铲铲之战等充值商品，支持搜索定位后复制订单给客服。': 'Browse top-ups for popular China Tencent games such as Honor of Kings, Peacekeeper Elite, and Golden Spatula. Search, prepare your order, and send it to customer service.',
    '更多腾讯热门游戏列表可在下方全部查看，快速选择更高效。': 'Browse the full list of popular Tencent games below.',
    '中国腾讯游戏': 'China Tencent Games',
    '首页已展示精选 9 个，完整腾讯游戏充值列表请查看下方。': 'The home page shows selected games. Browse the full Tencent game list below.',
    '中国腾讯游戏充值专区，黑金风格视觉与便捷购物车体验。': 'China Tencent game top-ups with a convenient cart experience.',
    '复制购物单': 'Copy Order',
    '详情询问': 'Ask for Price'
  };

  const gameCatalog = {
    'genshin': { name: 'Genshin Impact', detail: 'Genshin Impact (Global)' },
    'honkai-star-rail': { name: 'Honkai: Star Rail', detail: 'Honkai: Star Rail (Global)' },
    'zenless-zone-zero': { name: 'Zenless Zone Zero', detail: 'Zenless Zone Zero (Global)' },
    'wuthering-waves': { name: 'Wuthering Waves', detail: 'Wuthering Waves (Global)' },
    'pokemon-tcg-pocket': { name: 'Pokémon TCG Pocket', detail: 'Pokémon TCG Pocket' },
    'honor-of-kings-global': { name: 'Honor of Kings Global', detail: 'Honor of Kings (Global)' },
    'pubg-mobile': { name: 'PUBG Mobile', detail: 'PUBG Mobile' },
    'garena-codm': { name: 'Garena Call of Duty: Mobile', detail: 'Garena Call of Duty: Mobile' },
    'garena-delta-force': { name: 'Garena Delta Force', detail: 'Garena Delta Force' },
    'mobile-legends': { name: 'Mobile Legends: Bang Bang', detail: 'Mobile Legends: Bang Bang' },
    'pokemon-go': { name: 'Pokémon GO', detail: 'Pokémon GO' },
    'last-war-survival': { name: 'Last War: Survival', detail: 'Last War: Survival' },
    'kingshot': { name: 'Kingshot', detail: 'Kingshot' },
    'whiteout-survival': { name: 'Whiteout Survival', detail: 'Whiteout Survival' },
    'neverness-to-everness': { name: 'Neverness to Everness', detail: 'Neverness to Everness' },
    'zhang-jian-chuan-shuo': { name: 'Sword X Staff', detail: 'Sword X Staff' },
    'wen-jian-chang-sheng': { name: 'Wen Jian Chang Sheng', detail: 'Wen Jian Chang Sheng' },
    'tian-long-ba-bu': { name: 'Demi-Gods and Semi-Devils 2', detail: 'Demi-Gods and Semi-Devils 2' },
    'perfect-world-w': { name: 'Perfect World W', detail: 'Perfect World W' },
    'where-winds-meet': { name: 'Where Winds Meet', detail: 'Where Winds Meet (Global)' },
    'crystal-of-atlan': { name: 'Crystal of Atlan', detail: 'Crystal of Atlan (Global)' },
    'sword-of-justice': { name: 'Sword of Justice', detail: 'Sword of Justice' },
    'ro-the-new-world': { name: 'Ragnarok: The New World', detail: 'Ragnarok: The New World' },
    'arknights-endfield': { name: 'Arknights: Endfield', detail: 'Arknights: Endfield' },
    'x-hero-epic-hero': { name: 'X-Hero', detail: 'X-Hero: Epic Heroes' },
    'ragnarok-origin-classic': { name: 'Ragnarok Origin Classic', detail: 'Ragnarok Origin Classic' },
    'dark-war-survival': { name: 'Dark War Survival', detail: 'Dark War Survival' },
    'heartopia': { name: 'Heartopia', detail: 'Heartopia' },
    'douluo-liehun-shijie': { name: 'Douluo Dalu: Soul Hunting World', detail: 'Douluo Dalu: Soul Hunting World' },
    'jianxia-qingyuan': { name: 'Jianxia Qingyuan', detail: 'Jianxia Qingyuan' },
    'legends-of-mushroom': { name: 'Legends of Mushroom', detail: 'Legends of Mushroom' },
    'zombie-wave': { name: 'Zombie Wave', detail: 'Zombie Wave' },
    'ni-shui-han-tw': { name: 'Justice Online (Taiwan)', detail: 'Justice Online (Taiwan)' },
    'lands-of-jails': { name: 'Lands of Jails', detail: 'Lands of Jails' },
    'three-kingdoms-tactics': { name: 'Three Kingdoms Tactics', detail: 'Three Kingdoms Tactics' },
    'one-punch-man-the-strongest': { name: 'One Punch Man: The Strongest', detail: 'One Punch Man: The Strongest' },
    'dragon-nest-m-classic': { name: 'Dragon Nest M: Classic', detail: 'Dragon Nest M: Classic' },
    'rf-online-next': { name: 'RF Online Next', detail: 'RF Online Next' },
    'age-of-empires-mobile': { name: 'Age of Empires Mobile', detail: 'Age of Empires Mobile' },
    'arena-breakout': { name: 'Arena Breakout', detail: 'Arena Breakout' },
    'zhen-de-jiang-shan': { name: 'Three Kingdoms Overlord', detail: 'Three Kingdoms Overlord' },
    'astral-guardians-cyber-fantasy': { name: 'Astral Guardians', detail: 'Astral Guardians: Cyber Fantasy' },
    'honor-of-kings-cn': { name: 'Honor of Kings (China)', detail: 'Honor of Kings (China · iOS & Android)', description: 'China · Tencent · Honor of Kings' },
    'peace-elite': { name: 'Peacekeeper Elite', detail: 'Peacekeeper Elite (China · iOS & Android)', description: 'China · Tencent · Peacekeeper Elite' },
    'huoying-renzhe': { name: 'Naruto Mobile', detail: 'Naruto Mobile (China · iOS & Android)', description: 'China · Tencent · Naruto Mobile' },
    'jin-chan-chan': { name: 'Golden Spatula', detail: 'Golden Spatula (China · iOS & Android)', description: 'China · Tencent · Golden Spatula' },
    'luoke-wangguo': { name: 'Roco Kingdom', detail: 'Roco Kingdom (China · iOS & Android)', description: 'China · Tencent · Roco Kingdom' },
    'delta-force-cn': { name: 'Delta Force (China)', detail: 'Delta Force (China · iOS & Android)', description: 'China · Tencent · Delta Force' },
    'wangzhe-rongyao-shijie': { name: 'Honor of Kings: World', detail: 'Honor of Kings: World (China · iOS & Android)', description: 'China · Tencent · Honor of Kings: World' },
    'wuwei-qiyue': { name: 'VALORANT Mobile', detail: 'VALORANT Mobile (China · iOS & Android)', description: 'China · Tencent · VALORANT Mobile' },
    'yuanmeng-zhixing': { name: 'DreamStar', detail: 'DreamStar (China · iOS & Android)', description: 'China · Tencent · DreamStar' },
    'razer-gold-top-up-pin': { name: 'Razer Gold Top-Up PIN', detail: 'Razer Gold Top-Up PIN' },
    'china-apple-gift-card': { name: 'China Apple Gift Card', detail: 'China Apple Gift Card' }
  };

  const sectionEnglish = {
    '创世结晶': 'Genesis Crystals',
    '其他商品': 'Other Items',
    '古老梦华': 'Oneiric Shards',
    '菲林底片': 'Monochrome',
    '月相': 'Lunite',
    '礼包': 'Packages',
    '点券': 'Tokens',
    '钻石': 'Diamonds',
    '美金礼包': 'USD Packages',
    '昇晶充值': 'Premium Currency Top-Up',
    '特惠补给': 'Special Supply',
    '代金券': 'Vouchers',
    '特惠礼包': 'Special Packages',
    '其他礼包': 'Other Packages',
    '诸神币': 'Divine Coins',
    '长鸣珠': 'Changming Pearls',
    '欧泊': 'Opals',
    '幻晶月令': 'Monthly Crystal Pass',
    '星石': 'Starstones',
    '衍质源石': 'Origeometry',
    '红钻': 'Red Diamonds',
    '玉璧': 'Jade',
    '印记礼包': 'Sigil Packages',
    '周卡 / 月卡': 'Weekly / Monthly Passes',
    '至高币': 'Supreme Coins',
    '元宝': 'Yuanbao',
    '礼包币': 'Package Coins',
    '苹果系统快充': 'iOS Fast Top-Up',
    '安卓系统快充': 'Android Fast Top-Up',
    '双系统慢充': 'iOS / Android Slow Top-Up',
    '特权精英卡': 'Privilege Elite Card',
    '金币': 'Gold',
    '洛克钻': 'Diamonds',
    '三角币': 'Delta Coins',
    '碎晶': 'Crystal Fragments',
    '星钻': 'Star Diamonds',
    '苹果卡充值': 'Apple Gift Card Top-Up',
    '其他服务': 'Other Services'
  };

  const productEnglish = {
    'pokemon-go': {
      '14500 金币': '14500 Gold'
    },
    'tian-long-ba-bu': {
      '重楼链 + 9980 元宝 + 40 万金币': 'Chonglou Necklace + 9,980 Yuanbao + 400,000 Gold',
      '重楼链 + 19980 元宝 + 45 万金币': 'Chonglou Necklace + 19,980 Yuanbao + 450,000 Gold',
      '重楼链 + 29980 元宝 + 50 万金币': 'Chonglou Necklace + 29,980 Yuanbao + 500,000 Gold'
    },
    'arknights-endfield': {
      '4 衍质源石 + 2 赠送': '4 Origeometry + 2 Bonus',
      '21 衍质源石 + 5 赠送': '21 Origeometry + 5 Bonus',
      '34 衍质源石 + 34 赠送': '34 Origeometry + 34 Bonus',
      '57 衍质源石 + 11 赠送': '57 Origeometry + 11 Bonus',
      '92 衍质源石 + 20 赠送': '92 Origeometry + 20 Bonus',
      '194 衍质源石 + 48 赠送': '194 Origeometry + 48 Bonus',
      '月卡': 'Monthly Pass',
      '通行证付费档': 'Protocol Pass (Paid Tier)'
    },
    'delta-force-cn': {
      '小黑卡': 'Mini Black Card',
      '悦享卡': 'Enjoyment Card',
      '黑曜卡【普通】': 'Obsidian Card [Standard]',
      '黑曜卡【豪华】': 'Obsidian Card [Deluxe]'
    },
    'huoying-renzhe': {
      '豪华忍法帖': 'Deluxe Ninja Pass',
      '传说忍法帖': 'Legendary Ninja Pass'
    },
    'peace-elite': {
      '特权精英卡': 'Privilege Elite Card'
    },
    'wuwei-qiyue': {
      '无畏先行卡': 'VALORANT Pioneer Card'
    }
  };

  const textNodeRecords = [];
  const attributeRecords = [];
  let originalDocumentTitle = document.title;

  function hasChinese(value) {
    return /[\u3400-\u9fff]/.test(String(value || ''));
  }

  function format(template, variables = {}) {
    return String(template).replace(/\{(\w+)\}/g, (match, key) => (
      Object.prototype.hasOwnProperty.call(variables, key) ? variables[key] : match
    ));
  }

  function t(key, variables = {}) {
    const table = messages[language] || messages.zh;
    const fallback = messages.zh[key] || key;
    return format(table[key] || fallback, variables);
  }

  function translateCatalogText(value) {
    let result = String(value || '').trim();
    if (!result) return '';

    result = result
      .replace(/(\d+)\s*万金币/g, (match, valueInTenThousands) => `${Number(valueInTenThousands) * 10000} Gold`)
      .replace(/通行证付费档/g, 'Protocol Pass (Paid Tier)')
      .replace(/双系统慢充，到账时间 5 分钟 - 24 小时/g, 'iOS / Android slow top-up, estimated arrival 5 minutes - 24 hours')
      .replace(/双系统慢充，到账时间较慢/g, 'iOS / Android slow top-up, longer processing time')
      .replace(/中国区 Apple ID（已实名）/g, 'China Region Apple ID (Verified)')
      .replace(/黑曜卡【普通】/g, 'Obsidian Card [Standard]')
      .replace(/黑曜卡【豪华】/g, 'Obsidian Card [Deluxe]')
      .replace(/特权精英卡(?:\s*18元)?/g, 'Privilege Elite Card')
      .replace(/豪华忍法帖(?:\s*25元)?/g, 'Deluxe Ninja Pass')
      .replace(/传说忍法帖(?:\s*198元)?/g, 'Legendary Ninja Pass')
      .replace(/无畏先行卡/g, 'VALORANT Pioneer Card')
      .replace(/重楼链/g, 'Chonglou Necklace')
      .replace(/绑定元宝/g, 'Bound Yuanbao')
      .replace(/绑元/g, 'Bound Yuanbao')
      .replace(/诸神币/g, 'Divine Coins')
      .replace(/衍质源石/g, 'Origeometry')
      .replace(/代金券/g, 'Vouchers')
      .replace(/红钻/g, 'Red Diamonds')
      .replace(/星石/g, 'Starstones')
      .replace(/洛克钻/g, 'Diamonds')
      .replace(/三角币/g, 'Delta Coins')
      .replace(/碎晶/g, 'Crystal Fragments')
      .replace(/星钻/g, 'Star Diamonds')
      .replace(/点券/g, 'Tokens')
      .replace(/金币/g, 'Gold')
      .replace(/元宝/g, 'Yuanbao')
      .replace(/月卡/g, 'Monthly Pass')
      .replace(/小黑卡/g, 'Mini Black Card')
      .replace(/悦享卡/g, 'Enjoyment Card')
      .replace(/赠送\s*(\d+)/g, '$1 Bonus')
      .replace(/(\d+)\s*赠送/g, '$1 Bonus')
      .replace(/赠送/g, 'Bonus')
      .replace(/HOT 推荐/g, 'HOT Pick')
      .replace(/额外/g, 'Bonus')
      .replace(/【/g, '[')
      .replace(/】/g, ']')
      .replace(/（/g, '(')
      .replace(/）/g, ')')
      .replace(/，/g, ', ')
      .replace(/\s+/g, ' ')
      .trim();

    return result;
  }

  function getGameEntry(game) {
    return gameCatalog[game?.id] || null;
  }

  function getGameName(game, detail = false) {
    if (!game) return '';
    if (language !== 'en') return detail ? (game.detailName || game.name || '') : (game.name || '');
    const entry = getGameEntry(game);
    if (entry) return detail ? (entry.detail || entry.name) : entry.name;
    const fallback = detail ? (game.detailName || game.name || '') : (game.name || '');
    return hasChinese(fallback) && !hasChinese(game.description) ? game.description : fallback;
  }

  function getGameEnglishName(game, detail = false) {
    if (!game) return '';
    const entry = getGameEntry(game);
    if (entry) return detail ? (entry.detail || entry.name) : entry.name;
    const fallback = detail ? (game.detailName || game.name || '') : (game.name || '');
    return hasChinese(fallback) && !hasChinese(game.description) ? game.description : fallback;
  }

  function getGameDescription(game) {
    if (!game) return '';
    if (language !== 'en') return game.description || '';
    const entry = getGameEntry(game);
    if (entry?.description) return entry.description;
    if (game.description && !hasChinese(game.description)) return game.description;
    return entry?.name || getGameName(game);
  }

  function getGameTag(game) {
    const tag = String(game?.tag || '');
    if (language !== 'en') return tag;
    if (tag.includes('扫码充值')) return 'QR Code Top-Up';
    if (tag.includes('点数/点卡')) return 'Credits / Gift Cards';
    return tag;
  }

  function getProductTitle(gameId, product) {
    if (!product) return '';
    if (language !== 'en') return product.title || '';
    const override = productEnglish[gameId]?.[product.title];
    if (override) return override;
    const source = product.en || product.title || '';
    return hasChinese(source) ? translateCatalogText(source) : source;
  }

  function getProductEnglish(gameId, product) {
    if (!product) return '';
    const override = productEnglish[gameId]?.[product.title];
    if (override) return override;
    const source = product.en || product.title || '';
    return hasChinese(source) ? translateCatalogText(source) : source;
  }

  function getProductNote(product) {
    if (!product?.note) return 'Top-Up';
    const parts = String(product.note).split('/');
    const source = parts.length > 1 ? parts.slice(1).join('/').trim() : parts[0].trim();
    const translated = hasChinese(source) ? translateCatalogText(source) : source;
    return hasChinese(translated) ? 'Top-Up' : translated;
  }

  function getSectionTitle(section) {
    if (!section) return '';
    if (language !== 'en') return section.title || '';
    if (sectionEnglish[section.title]) return sectionEnglish[section.title];
    if (section.title && !hasChinese(section.title)) return section.title;
    if (section.subtitle && !hasChinese(section.subtitle)) return section.subtitle;
    return translateCatalogText(section.title || 'Items');
  }

  function getSectionEnglishTitle(section) {
    if (!section) return '';
    if (sectionEnglish[section.title]) return sectionEnglish[section.title];
    if (section.title && !hasChinese(section.title)) return section.title;
    if (section.subtitle && !hasChinese(section.subtitle)) return section.subtitle;
    const translated = translateCatalogText(section.title || 'Items');
    return hasChinese(translated) ? 'Items' : translated;
  }

  function getSectionSubtitle(section) {
    if (!section) return '';
    if (language !== 'en') return section.subtitle || '';
    const title = getSectionTitle(section);
    const subtitle = section.subtitle && !hasChinese(section.subtitle)
      ? section.subtitle
      : title;
    return subtitle === title ? '' : subtitle;
  }

  function getCategoryTitle(categoryId, category) {
    return language === 'en' ? t(`category.${categoryId}.title`) : (category?.title || '');
  }

  function getCategorySubtitle(categoryId, category) {
    return language === 'en' ? t(`category.${categoryId}.subtitle`) : (category?.subtitle || '');
  }

  function translate(value) {
    if (language !== 'en') return String(value || '');
    const source = String(value || '');
    return staticEnglish[source] || source;
  }

  function captureStaticContent() {
    originalDocumentTitle = document.title;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      const parent = node.parentElement;
      if (parent && !parent.closest('script, style, [data-bge-i18n-ignore]')) {
        textNodeRecords.push({ node, original: node.nodeValue });
      }
      node = walker.nextNode();
    }

    document.querySelectorAll('[placeholder], [aria-label], [title]').forEach((element) => {
      ['placeholder', 'aria-label', 'title'].forEach((attribute) => {
        if (element.hasAttribute(attribute)) {
          attributeRecords.push({ element, attribute, original: element.getAttribute(attribute) });
        }
      });
    });

    document.querySelectorAll('meta[name="description"][content]').forEach((element) => {
      attributeRecords.push({ element, attribute: 'content', original: element.getAttribute('content') });
    });
  }

  function translateStaticValue(original) {
    if (language !== 'en') return original;
    const value = String(original || '');
    const match = value.match(/^(\s*)(.*?)(\s*)$/s);
    const leading = match?.[1] || '';
    const core = match?.[2] || value;
    const trailing = match?.[3] || '';
    return Object.prototype.hasOwnProperty.call(staticEnglish, core)
      ? `${leading}${staticEnglish[core]}${trailing}`
      : value;
  }

  function applyStaticLanguage() {
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    document.title = language === 'en'
      ? (staticEnglish[originalDocumentTitle] || originalDocumentTitle)
      : originalDocumentTitle;

    textNodeRecords.forEach(({ node, original }) => {
      if (node.isConnected) node.nodeValue = translateStaticValue(original);
    });

    attributeRecords.forEach(({ element, attribute, original }) => {
      if (element.isConnected) element.setAttribute(attribute, translateStaticValue(original));
    });
  }

  function updateSwitcherUI() {
    document.querySelectorAll('[data-bge-language]').forEach((button) => {
      const active = button.dataset.bgeLanguage === language;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    document.querySelectorAll('.language-switch').forEach((switcher) => {
      switcher.setAttribute('aria-label', t('language.switcher'));
    });
    updateMobileNavigationUI();
    updateServiceStatus();
  }

  function updateMobileNavigationUI() {
    document.querySelectorAll('.mobile-nav-toggle').forEach((button) => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      const label = t(expanded ? 'nav.close' : 'nav.open');
      button.setAttribute('aria-label', label);
      const labelNode = button.querySelector('.mobile-nav-label');
      if (labelNode) labelNode.textContent = label;
    });
  }

  function closeMobileNavigation() {
    document.querySelectorAll('.site-nav.mobile-nav-enabled.mobile-open').forEach((nav) => {
      nav.classList.remove('mobile-open');
      const button = document.querySelector(`.mobile-nav-toggle[aria-controls="${nav.id}"]`);
      if (button) button.setAttribute('aria-expanded', 'false');
    });
    updateMobileNavigationUI();
  }

  function createMobileNavigation() {
    const nav = document.querySelector('.site-nav');
    if (!nav || document.querySelector('.mobile-nav-toggle')) return;

    if (!nav.id) nav.id = 'siteNavigation';
    nav.classList.add('mobile-nav-enabled');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-nav-toggle';
    button.setAttribute('aria-controls', nav.id);
    button.setAttribute('aria-expanded', 'false');
    button.innerHTML = `
      <span class="mobile-nav-icon" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="mobile-nav-label"></span>
    `;

    const brand = nav.parentElement?.querySelector('.brand');
    if (brand) brand.insertAdjacentElement('afterend', button);
    else nav.insertAdjacentElement('beforebegin', button);

    button.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('mobile-open');
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      updateMobileNavigationUI();
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMobileNavigation();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMobileNavigation();
    });

    updateMobileNavigationUI();
  }

  function getMalaysiaHour() {
    try {
      const hour = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kuala_Lumpur',
        hour: '2-digit',
        hourCycle: 'h23'
      }).formatToParts(new Date()).find((part) => part.type === 'hour')?.value;
      return Number(hour);
    } catch (error) {
      return new Date().getUTCHours() + 8;
    }
  }

  function isServiceOnline() {
    const hour = ((getMalaysiaHour() % 24) + 24) % 24;
    return hour >= 10 || hour < 2;
  }

  function updateServiceStatus() {
    const online = isServiceOnline();
    document.querySelectorAll('[data-service-status]').forEach((badge) => {
      badge.classList.toggle('is-online', online);
      badge.classList.toggle('is-offline', !online);
      badge.setAttribute('title', t('service.timezone'));
      const textNode = badge.querySelector('[data-service-status-text]');
      if (textNode) textNode.textContent = t(online ? 'service.online' : 'service.offline');
      const hoursNode = badge.querySelector('[data-service-status-hours]');
      if (hoursNode) hoursNode.textContent = t('service.timezone');
    });
  }

  function createServiceStatus() {
    if (document.querySelector('[data-service-status]')) return;
    const anchor = document.querySelector('.detail-status, .hero-kicker, .hero-badge, .reviews-kicker');
    if (!anchor) return;

    const badge = document.createElement('span');
    badge.className = 'service-status-badge';
    badge.dataset.serviceStatus = 'true';
    badge.dataset.bgeI18nIgnore = 'true';
    badge.innerHTML = `
      <span class="service-status-dot" aria-hidden="true"></span>
      <strong data-service-status-text></strong>
      <span data-service-status-hours></span>
    `;
    anchor.insertAdjacentElement('afterend', badge);
    updateServiceStatus();
    window.setInterval(updateServiceStatus, 60000);
  }

  function createLanguageSwitcher() {
    if (document.querySelector('.language-switch')) return;

    const switcher = document.createElement('div');
    switcher.className = 'language-switch';
    switcher.dataset.bgeI18nIgnore = 'true';
    switcher.setAttribute('role', 'group');
    switcher.innerHTML = `
      <button type="button" data-bge-language="zh">中文</button>
      <span aria-hidden="true">/</span>
      <button type="button" data-bge-language="en">EN</button>
    `;

    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
      const cta = headerContainer.querySelector('.cta-button');
      headerContainer.insertBefore(switcher, cta || null);
      return;
    }

    const headerActions = document.querySelector('.site-header .header-actions');
    if (headerActions) {
      headerActions.insertBefore(switcher, headerActions.firstChild);
      return;
    }

    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) siteHeader.appendChild(switcher);
  }

  function updateUrl(languageCode) {
    if (!window.history?.replaceState) return;
    try {
      const url = new URL(window.location.href);
      if (languageCode === 'en') url.searchParams.set('lang', 'en');
      else url.searchParams.delete('lang');
      window.history.replaceState({}, '', url);
    } catch (error) {
      // The language still works when a local preview does not expose a valid URL.
    }
  }

  function updateCanonicalUrl() {
    try {
      const url = new URL(window.location.href);
      if (!/^https?:$/.test(url.protocol)) return;
      url.hash = '';
      url.searchParams.delete('lang');
      let canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = url.href;
    } catch (error) {
      // Canonical metadata is skipped only for invalid local preview URLs.
    }
  }

  function setLanguage(nextLanguage, options = {}) {
    if (!supportedLanguages.has(nextLanguage)) return;
    language = nextLanguage;
    localStorage.setItem(storageKey, language);
    if (options.updateUrl !== false) updateUrl(language);
    updateCanonicalUrl();
    applyStaticLanguage();
    updateSwitcherUI();
    window.dispatchEvent(new CustomEvent('bge:languagechange', {
      detail: { language }
    }));
  }

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-bge-language]');
    if (!button) return;
    event.preventDefault();
    setLanguage(button.dataset.bgeLanguage);
  });

  window.BGE_I18N = {
    getLanguage: () => language,
    isEnglish: () => language === 'en',
    setLanguage,
    t,
    hasChinese,
    translateCatalogText,
    getGameName,
    getGameEnglishName,
    getGameDescription,
    getGameTag,
    getProductTitle,
    getProductEnglish,
    getProductNote,
    getSectionTitle,
    getSectionEnglishTitle,
    getSectionSubtitle,
    getCategoryTitle,
    getCategorySubtitle,
    translate
  };

  window.addEventListener('DOMContentLoaded', () => {
    if (document.body.dataset.bgeI18nDisabled === 'true') return;
    captureStaticContent();
    createLanguageSwitcher();
    createMobileNavigation();
    createServiceStatus();
    updateCanonicalUrl();
    applyStaticLanguage();
    updateSwitcherUI();
  });
})();
