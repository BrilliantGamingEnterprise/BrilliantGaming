const legacyCartStorageKey = 'bge-cart-v1';
const cartsStorageKey = 'bge-carts-v2';
const activeCartContextKey = 'bge-active-cart-context-v2';
const statsKey = 'bge-stats-v1';
const dailyOrdersKey = 'bge-daily-order-stats-v1';
const currencyKey = 'bge-currency-v1';

// 网站商品资料设置。每次正式调整价格或商品后，只需更新 updatedAt。
const { catalogSettings, currencySettings, currencyFlagClasses } = globalThis.BGE_SITE_CONFIG;
const { pricePresets, categories, homeFeaturedIds } = globalThis.BGE_CATALOG_DATA;
const catalogMeta = globalThis.BGE_CATALOG_META || { updatedAtByGame: {} };

const pausedCurrencies = new Set(['SGD']);
const savedCurrency = localStorage.getItem(currencyKey);
let activeCurrency = !pausedCurrencies.has(savedCurrency) && currencySettings.rates[savedCurrency]
  ? savedCurrency
  : currencySettings.defaultCurrency;

let latestOrderText = '';
let latestOrderIdentity = null;
let latestInquiryText = '';
let latestInquiryLabel = '';
let currentOrderIdentity = null;
let activeContactMode = 'default';

const uiTextFallbacks = {
  'currency.switcher': '选择显示币种',
  'cart.summary': '已选商品 {count} 项',
  'cart.total': '合计：{total}',
  'cart.mobileItems': '购物车 {count}件',
  'cart.mobileView': '查看',
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
  'game.platformEyebrow': '充值系统',
  'game.platformTitle': '请先选择游戏系统',
  'game.platformBody': '安卓与苹果的商品不同，选择后只会显示对应价格。',
  'game.platformIos': '苹果 / iOS',
  'game.platformIosHint': '查看苹果系统商品',
  'game.platformAndroid': '安卓 / Android',
  'game.platformAndroidHint': '查看安卓系统商品',
  'game.platformSharedNote': '慢充与不分系统的商品会同时显示。',
  'game.platformEmpty': '请先选择上方系统，避免购买错误的商品。',
  'game.platformSwitchConfirm': '切换系统会清空当前游戏的购物车，确定继续吗？',
  'game.platformSelected': '已选择：{platform}',
  'home.showLess': '收起游戏 ↑',
  'home.showAll': '查看全部游戏 ›',
  'home.directoryFeatured': '热门充值游戏',
  'home.directoryAll': '全部充值游戏（{count}）',
  'home.directoryFiltered': '筛选结果（{count}）',
  'home.filterAll': '全部游戏',
  'home.filterIntl': '国际服游戏',
  'home.filterCn': '中国服游戏',
  'home.filterLive': '直播充值',
  'home.filterWallet': '人民币充值',
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
  'product.inCartAria': '已在购物车：{title}，数量 {quantity}。再次点击可增加数量。',
  'product.inquiryAria': '询问商品：{title}',
  'product.status.paused': '暂停接单',
  'product.status.soldout': '暂时售罄',
  'product.status.inquiry': '联系客服询价',
  'product.pausedNotice': '此商品目前暂停接单，请选择其他商品。',
  'product.soldoutNotice': '此商品目前暂时售罄，请选择其他商品。',
  'product.inquiryMessage': '你好，我想询问 {game} 的“{item}”。请问目前价格和充值方式是什么？',
  'product.customAmountLabel': '输入人民币金额',
  'product.customAmountPlaceholder': '例如：88',
  'product.customAmountPreview': '预计获得：{coins} {coinName}',
  'product.customAmountEmpty': '输入金额后会显示对应平台币',
  'product.customAmountAction': '询价',
  'product.customAmountInvalid': '请输入大于 0 的人民币金额。',
  'product.customInquiryMessage': '你好，我想询问 {game} 自定义充值：¥{amount} = {coins} {coinName}。请问 RM 价格和充值方式是什么？',
  'product.exchangeAmountLabel': '输入需要充值的人民币金额',
  'product.exchangeAmountPlaceholder': '例如：1000',
  'product.exchangeAmountEmpty': '输入金额后会自动显示最终价格',
  'product.exchangeAmountPreview': '需要付款：{price}',
  'product.exchangeFee': ' + RM {fee} 服务费',
  'product.exchangeAction': '加入购物车',
  'product.exchangeInvalid': '请输入大于 0 的人民币金额。',
  'product.exchangeTierTitle': '查看阶梯汇率',
  'product.exchangeTierRange': '¥{min}–¥{max}：{rate}{fee}',
  'product.exchangeTierAbove': '¥{min} 以上：{rate}{fee}',
  'product.exchangeTierFee': ' + RM {fee}',
  'catalog.updated': '价格更新：{date}',
  'contact.orderStatus': '订单内容已复制',
  'contact.orderTitle': '选择发送订单方式',
  'contact.orderIntro': '可直接通过 WhatsApp 发送，或复制订单内容后粘贴到微信。客服确认商品、金额与充值资料后再付款。',
  'contact.orderNoteLabel': '付款提醒：',
  'contact.orderNote': '请先等待客服确认订单；确认无误后再付款。',
  'contact.defaultTitle': '选择联系客服方式',
  'contact.defaultIntro': '你可以通过 WhatsApp 或微信联系 Brilliant Gaming。客服会协助确认商品、付款方式与充值资料。',
  'contact.inquiryTitle': '选择商品询价方式',
  'contact.inquiryIntro': '可直接通过 WhatsApp 发送，或复制询问内容后粘贴到微信。客服会回复最新价格与充值方式。',
  'contact.inquiryNoteLabel': '询价商品：',
  'contact.inquiryNote': '客服会根据最新渠道与库存回复你，付款前请先等待确认。',
  'contact.hoursLabel': '营业时间：',
  'contact.hours': '每天 10AM - 2AM。非营业时间也可以留言，客服上线后会尽快回复。',
  'contact.whatsappOrder': '订单内容已自动带入',
  'contact.whatsappOpen': '点击打开 WhatsApp',
  'contact.whatsappActionOrder': '打开 WhatsApp 并发送订单',
  'contact.whatsappActionOpen': '打开 WhatsApp',
  'contact.wechatName': '微信客服',
  'contact.wechatIdHelp': '复制微信号后添加客服',
  'contact.wechatOrderHelp': '复制后到微信发送给客服',
  'contact.wechatInquiryHelp': '复制后到微信发送询问',
  'contact.wechatActionId': '复制微信号',
  'contact.wechatActionOrder': '复制订单内容',
  'contact.wechatActionInquiry': '复制询问内容',
  'contact.wechatCopied': '微信 ID 已复制',
  'contact.wechatOrderCopied': '订单内容已复制，可前往微信发送',
  'contact.wechatInquiryCopied': '询问内容已复制，可前往微信发送',
  'contact.copied': '已复制',
  'contact.unavailable': 'WhatsApp 暂未开放，请先使用微信或 Instagram'
};

function formatUiText(template, variables = {}) {
  return String(template).replace(/\{(\w+)\}/g, (match, key) => (
    Object.prototype.hasOwnProperty.call(variables, key) ? variables[key] : match
  ));
}

function uiText(key, variables = {}) {
  if (window.BGE_I18N?.t) return window.BGE_I18N.t(key, variables);
  return formatUiText(uiTextFallbacks[key] || key, variables);
}

function isEnglishLanguage() {
  return window.BGE_I18N?.isEnglish?.() || false;
}

function localizedText(value) {
  return window.BGE_I18N?.translate?.(value) || value || '';
}

function localizedGameName(game, detail = false) {
  return window.BGE_I18N?.getGameName?.(game, detail) || (detail ? (game?.detailName || game?.name || '') : (game?.name || ''));
}

function englishGameName(game, detail = false) {
  return window.BGE_I18N?.getGameEnglishName?.(game, detail) || game?.description || game?.name || '';
}

function localizedGameDescription(game) {
  return window.BGE_I18N?.getGameDescription?.(game) || game?.description || '';
}

function localizedGameTag(game) {
  if (window.BGE_I18N?.getGameTag) return window.BGE_I18N.getGameTag(game);
  const tag = String(game?.tag || '');
  const normalized = tag.toLowerCase().replace(/[\s_-]+/g, ' ').trim();
  if (normalized.includes('login top up')) return '登录充值';
  if (normalized.includes('uid top up')) return 'UID 充值';
  if (tag.includes('扫码充值')) return '扫码充值';
  if (tag.includes('直播充值')) return '直播充值';
  return tag;
}

function localizedProductTitle(gameId, product) {
  return window.BGE_I18N?.getProductTitle?.(gameId, product) || product?.title || '';
}

function englishProductTitle(gameId, product) {
  return window.BGE_I18N?.getProductEnglish?.(gameId, product) || product?.en || product?.title || '';
}

function localizedProductNote(product) {
  return window.BGE_I18N?.getProductNote?.(product) || product?.note || '';
}

function localizedSectionTitle(section) {
  return window.BGE_I18N?.getSectionTitle?.(section) || section?.title || '';
}

function englishSectionTitle(section) {
  return window.BGE_I18N?.getSectionEnglishTitle?.(section) || section?.subtitle || section?.title || '';
}

function localizedSectionSubtitle(section) {
  return window.BGE_I18N?.getSectionSubtitle?.(section) ?? section?.subtitle ?? '';
}

function localizedCategoryTitle(categoryId, category) {
  return window.BGE_I18N?.getCategoryTitle?.(categoryId, category) || category?.title || '';
}

function localizedCategorySubtitle(categoryId, category) {
  return window.BGE_I18N?.getCategorySubtitle?.(categoryId, category) || category?.subtitle || '';
}

function resolveProductPrice(product) {
  if (!product) return product;
  if (!product.pricePreset) return product;
  return {
    ...product,
    price: pricePresets[product.pricePreset] || product.price || ''
  };
}

function resolveProductSections(game) {
  if (!game || !Array.isArray(game.productSections)) return [];
  return game.productSections.map((section) => ({
    ...section,
    products: (section.products || []).map(resolveProductPrice)
  }));
}


function getQueryParams() {
  const query = new URLSearchParams(window.location.search);
  return {
    category: query.get('category') || document.body.dataset.gameCategory || '',
    gameId: query.get('game') || document.body.dataset.gameId || '',
    platform: query.get('platform') || ''
  };
}

function gamePageHref(categoryId, gameId) {
  const suffix = isEnglishLanguage() ? '?lang=en' : '';
  return `games/${encodeURIComponent(gameId)}/${suffix}`;
}

function getGameUpdatedAt(categoryId, game) {
  return game?.updatedAt
    || catalogMeta.updatedAtByGame?.[`${categoryId}/${game?.id}`]
    || catalogSettings.updatedAt;
}

function readStoredJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    return fallback;
  }
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

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getAllGames() {
  return Object.entries(categories).flatMap(([categoryId, category]) =>
    (category.games || []).map((game) => ({ ...game, categoryId }))
  );
}

function getGameCartContext(categoryId, gameId) {
  const category = categories[categoryId];
  const game = category?.games?.find((item) => item.id === gameId);
  if (!game) return null;

  return {
    categoryId,
    gameId,
    gameName: game.detailName || game.name
  };
}

function getPageCartContext() {
  if (document.body.dataset.page !== 'game') return null;
  const params = getQueryParams();
  return getGameCartContext(params.category, params.gameId);
}

function getCartScopeKey(context) {
  if (!context) return '';
  return `${context.categoryId}:${context.gameId}`;
}

function getGameFromCartContext(context) {
  if (!context) return null;
  const category = categories[context.categoryId];
  return category?.games?.find((game) => game.id === context.gameId) || null;
}

function legacyCartMatchesGame(legacyCart, game) {
  if (!Array.isArray(legacyCart) || !legacyCart.length || !game) return false;

  const validItems = new Set(
    getGameProducts(game).map((product) =>
      `${getProductCartTitle(product)}\u0000${product.price}`
    )
  );

  return legacyCart.every((item) =>
    validItems.has(`${item.title}\u0000${item.price}`)
  );
}

function getGameProductEntries(game) {
  if (!game) return [];
  const sections = resolveProductSections(game);
  if (sections.length) {
    return sections.flatMap((section, sectionIndex) => {
      const sectionKey = section.id || `${sectionIndex + 1}-${section.title || 'items'}`;
      return (section.products || []).map((product, productIndex) => ({
        product,
        section,
        sectionKey,
        sectionIndex,
        productIndex
      }));
    });
  }
  return (game.products || []).map(resolveProductPrice).map((product, productIndex) => ({
    product,
    section: null,
    sectionKey: '',
    sectionIndex: 0,
    productIndex
  }));
}

function getGameProducts(game) {
  return getGameProductEntries(game).map((entry) => entry.product);
}

function getProductCartTitle(product) {
  return product.en ? `${product.title} / ${product.en}` : product.title;
}

function getProductCartKey(product, sectionKey = '') {
  const resolvedProduct = resolveProductPrice(product);
  const productKey = `${encodeURIComponent(resolvedProduct.title || '')}::${resolvedProduct.price || ''}`;
  return sectionKey ? `section:${encodeURIComponent(sectionKey)}::${productKey}` : productKey;
}

function cleanTieredExchangeCartTitle(item, title) {
  if (!String(item?.key || '').startsWith('exchange:')) return String(title || '');
  return String(title || '')
    .replace(/\s*（汇率[^）]*）/g, '')
    .replace(/\s*\(rate[^)]*\)/gi, '')
    .trim();
}

function getCartItemChineseTitle(item) {
  if (item?.titleZh) return cleanTieredExchangeCartTitle(item, item.titleZh);
  return cleanTieredExchangeCartTitle(item, String(item?.title || '').split(' / ')[0].trim());
}

function isSupersededTencentPack(item, gameId) {
  const title = getCartItemChineseTitle(item);
  if (gameId === 'wangzhe-rongyao-shijie') return /^(60|180|300|680|980|1980|3280|6480) 碎晶$/.test(title);
  if (gameId === 'yuanmeng-zhixing') return /^(325|745|1300|2185|3890|7280) 星钻$/.test(title);
  return false;
}

function getCartItemEnglishTitle(item) {
  if (item?.titleEn) return cleanTieredExchangeCartTitle(item, item.titleEn);

  const currentGame = getGameFromCartContext(cartContext);
  const gameId = currentGame?.id || cartContext?.gameId || '';
  const chineseTitle = getCartItemChineseTitle(item);
  const matchingEntry = getGameProductEntries(currentGame).find(({ product, sectionKey }) => (
    getProductCartKey(product, sectionKey) === item?.key ||
    getProductCartKey(product) === item?.key ||
    (product.title === chineseTitle && product.price === item?.price)
  ));

  if (matchingEntry) return englishProductTitle(gameId, matchingEntry.product);

  const titleParts = String(item?.title || '').split(' / ');
  const englishTitle = titleParts.length > 1 ? titleParts.slice(1).join(' / ').trim() : chineseTitle;
  return cleanTieredExchangeCartTitle(item, englishTitle);
}

function getCartItemChineseSection(item) {
  return item?.sectionZh || '';
}

function getCartItemEnglishSection(item) {
  if (item?.sectionEn) return item.sectionEn;
  if (!item?.sectionKey) return '';

  const currentGame = getGameFromCartContext(cartContext);
  const matchingEntry = getGameProductEntries(currentGame).find(({ sectionKey }) => sectionKey === item.sectionKey);
  return matchingEntry?.section ? englishSectionTitle(matchingEntry.section) : getCartItemChineseSection(item);
}

function getCartItemDisplayTitle(item) {
  const productTitle = isEnglishLanguage() ? getCartItemEnglishTitle(item) : getCartItemChineseTitle(item);
  const sectionTitle = isEnglishLanguage() ? getCartItemEnglishSection(item) : getCartItemChineseSection(item);
  return sectionTitle ? `${sectionTitle} · ${productTitle}` : productTitle;
}

function getCartItemKey(item) {
  return item?.key || `${encodeURIComponent(getCartItemChineseTitle(item))}::${item?.price || ''}`;
}

function getSortedCartEntries() {
  const currentGame = getGameFromCartContext(cartContext);
  const productEntries = getGameProductEntries(currentGame);

  const orderMap = new Map();

  productEntries.forEach(({ product, sectionKey }, index) => {
    orderMap.set(getProductCartKey(product, sectionKey), index);
    orderMap.set(getProductCartKey(product), index);
    orderMap.set(getProductCartTitle(product), index);
    orderMap.set(product.title, index);
  });

  return cart
    .map((item, index) => ({
      item,
      index,
      order: orderMap.has(getCartItemKey(item))
        ? orderMap.get(getCartItemKey(item))
        : (orderMap.has(item.title) ? orderMap.get(item.title) : 999999 + index)
    }))
    .sort((a, b) => a.order - b.order || a.index - b.index);
}
const page = document.body.dataset.page;
let cartsByGame = readStoredJson(cartsStorageKey, {});
if (!cartsByGame || Array.isArray(cartsByGame) || typeof cartsByGame !== 'object') {
  cartsByGame = {};
}

let cartContext = getPageCartContext() || readStoredJson(activeCartContextKey, null);
if (!getGameFromCartContext(cartContext)) cartContext = null;

const cartScopeKey = getCartScopeKey(cartContext);
if (cartContext && !Array.isArray(cartsByGame[cartScopeKey])) {
  const legacyCart = readStoredJson(legacyCartStorageKey, []);
  const currentGame = getGameFromCartContext(cartContext);
  cartsByGame[cartScopeKey] = legacyCartMatchesGame(legacyCart, currentGame)
    ? legacyCart
    : [];
  localStorage.setItem(cartsStorageKey, JSON.stringify(cartsByGame));
}

if (getPageCartContext()) {
  localStorage.setItem(activeCartContextKey, JSON.stringify(cartContext));
  localStorage.removeItem(legacyCartStorageKey);
}

let cart = cartScopeKey && Array.isArray(cartsByGame[cartScopeKey])
  ? cartsByGame[cartScopeKey]
  : [];
let stats = readStoredJson(statsKey, {});
let isShowingAllGames = false;
let activeHomeCategory = 'all';


const paymentMethodOptions = [
  'Touch n Go eWallet',
  'DuitNow QR',
  'Bank Transfer',
  'GrabPay',
  'ShopeePay',
  'PayNow SG',
  '其他'
];

const loginTopupGameIds = new Set([
  'genshin',
  'honkai-star-rail',
  'zenless-zone-zero',
  'wuthering-waves'
]);

const topupFormConfigs = {
  login: {
    badge: 'Login Top Up',
    title: '充值资料 · 登入充值',
    description: '适用于需要登入账号处理的游戏。资料只用于生成订单文字，不会上传或保存到网站数据库。',
    fields: [
      {
        name: 'paymentMethod',
        label: '付款方式',
        type: 'select',
        required: true,
        options: paymentMethodOptions
      },
      {
        name: 'loginMethod',
        label: '登入方式',
        type: 'select',
        required: true,
        options: [
          '邮箱 / Email',
          'Google',
          'Facebook',
          '其他'
        ]
      },
      {
        name: 'accountEmail',
        label: '账号 / Email',
        type: 'text',
        required: true,
        placeholder: '请输入账号或邮箱'
      },
      {
        name: 'password',
        label: '账号密码',
        type: 'text',
        required: true,
        placeholder: '请输入账号密码'
      },
      {
        name: 'server',
        label: '服务器',
        type: 'text',
        required: true,
        placeholder: '例如：服务器名称 / 区服名称 / Server Name'
      },
      {
        name: 'uid',
        label: 'UID',
        type: 'text',
        required: true,
        placeholder: '请输入 UID'
      },
      {
        name: 'characterName',
        label: '角色名字',
        type: 'text',
        required: true,
        placeholder: '请输入角色名字'
      }
    ]
  },
  uid: {
    badge: 'UID Top Up',
    title: '充值资料 · UID充值',
    description: '适用于通过 UID、服务器或角色资料处理的游戏。',
    fields: [
      {
        name: 'paymentMethod',
        label: '付款方式',
        type: 'select',
        required: true,
        options: paymentMethodOptions
      },
      {
        name: 'uid',
        label: 'UID / 玩家ID',
        type: 'text',
        required: true,
        placeholder: '请输入 UID / 玩家ID'
      },
      {
        name: 'server',
        label: '服务器 / 区服',
        type: 'text',
        required: true,
        placeholder: '例如：Asia / Global / 服务器名称'
      },
      {
        name: 'characterName',
        label: '角色名字',
        type: 'text',
        required: true,
        placeholder: '请输入角色名字'
      }
    ]
  },
  live: {
    badge: 'LIVE STREAM',
    title: '充值资料 · 直播平台',
    description: '适用于抖音、虎牙、斗鱼与快手。请填写平台账号或用户 ID，付款前客服会再次核对。',
    fields: [
      {
        name: 'paymentMethod',
        label: '付款方式',
        type: 'select',
        required: true,
        options: paymentMethodOptions
      },
      {
        name: 'platformUserId',
        label: '直播账号 / 用户 ID',
        type: 'text',
        required: true,
        placeholder: '请输入平台账号或用户 ID'
      },
      {
        name: 'platformNickname',
        label: '账号昵称',
        type: 'text',
        required: false,
        placeholder: '请输入账号昵称（选填）'
      },
      {
        name: 'remarks',
        label: '备注',
        type: 'textarea',
        required: false,
        placeholder: '如有特别要求可填写（选填）'
      }
    ]
  },
  wallet: {
    badge: 'RMB TOP UP',
    title: '充值资料 · 人民币充值',
    description: '请填写微信或支付宝的收款账号与收款人名字；如需使用收款二维码，请在订单发送后另发给客服确认。',
    fields: [
      {
        name: 'paymentMethod',
        label: '付款方式',
        type: 'select',
        required: true,
        options: paymentMethodOptions
      },
      {
        name: 'recipientAccount',
        label: '收款账号 / 手机号码',
        type: 'text',
        required: true,
        placeholder: '请输入微信号、支付宝账号或手机号码'
      },
      {
        name: 'recipientName',
        label: '收款人名字',
        type: 'text',
        required: true,
        placeholder: '请输入已实名的收款人名字'
      },
      {
        name: 'remarks',
        label: '备注',
        type: 'textarea',
        required: false,
        placeholder: '如使用收款二维码，请填写“二维码另发客服”（选填）'
      }
    ]
  },
  tencent: {
    badge: 'Tencent CN',
    title: '充值资料 · 中国腾讯游戏',
    description: '适用于王者荣耀、和平精英等中国腾讯游戏。请确认系统、区服与角色名字正确。',
    fields: [
      {
        name: 'paymentMethod',
        label: '付款方式',
        type: 'select',
        required: true,
        options: paymentMethodOptions
      },
      {
        name: 'system',
        label: '系统',
        type: 'select',
        required: true,
        options: [
          '苹果 iOS',
          '安卓 Android'
        ]
      },
      {
        name: 'loginArea',
        label: '登录区',
        type: 'select',
        required: true,
        options: ['微信区']
      },
      {
        name: 'serverMode',
        label: '大区',
        type: 'select',
        required: true,
        options: ['没有大区', '手动填写大区']
      },
      {
        name: 'server',
        label: '大区名称',
        type: 'text',
        required: true,
        showWhen: { field: 'serverMode', value: '手动填写大区' },
        placeholder: '例如：391区'
      },
      {
        name: 'characterName',
        label: '角色名字',
        type: 'text',
        required: true,
        placeholder: '请输入角色名字'
      }
    ]
  }
};



function saveCart() {
  const scopeKey = getCartScopeKey(cartContext);
  if (!scopeKey) return;

  cartsByGame[scopeKey] = cart;
  localStorage.setItem(cartsStorageKey, JSON.stringify(cartsByGame));
  localStorage.setItem(activeCartContextKey, JSON.stringify(cartContext));
}

function saveStats() {
  localStorage.setItem(statsKey, JSON.stringify(stats));
}

function hasNumericPrice(price) {
  return /\d/.test(String(price || ''));
}

function parsePrice(price) {
  return Number(String(price).replace(/[^\d.-]/g, '')) || 0;
}

function getConvertedAmountFromMyr(myrAmount, currency = activeCurrency) {
  const amount = Number(myrAmount) || 0;
  if (currency === 'MYR') return amount;

  const rate = currencySettings.rates[currency];
  if (!rate) return amount;

  return Math.ceil(amount / rate);
}

function getDisplayUnitAmount(price) {
  if (!hasNumericPrice(price)) return 0;
  return getConvertedAmountFromMyr(parsePrice(price), activeCurrency);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + getDisplayUnitAmount(item.price) * item.quantity, 0);
}

function formatCurrencyAmount(amount, currency = activeCurrency) {
  if (currency === 'MYR') return `RM ${Number(amount || 0).toFixed(2)}`;
  return `${currencySettings.labels[currency] || currency} ${Math.ceil(Number(amount || 0))}`;
}

function formatPriceForCurrency(price) {
  if (!hasNumericPrice(price)) return localizedText(price || '');

  const myrAmount = parsePrice(price);
  if (activeCurrency === 'MYR') return formatCurrencyAmount(myrAmount, 'MYR');

  return formatCurrencyAmount(getConvertedAmountFromMyr(myrAmount, activeCurrency), activeCurrency);
}

function formatTotal(total) {
  return formatCurrencyAmount(total, activeCurrency);
}

function trackAnalyticsEvent(eventName, parameters = {}) {
  window.BGE_ANALYTICS?.track?.(eventName, parameters);
}

function makeAnalyticsItem(item, quantity = item?.quantity || 1) {
  const currentGame = getGameFromCartContext(cartContext);
  return {
    item_id: getCartItemKey(item),
    item_name: getCartItemDisplayTitle(item),
    item_category: currentGame?.id || cartContext?.gameId || '',
    item_category2: cartContext?.categoryId || '',
    price: getDisplayUnitAmount(item?.price),
    quantity
  };
}

function getCartAnalyticsPayload(items = cart) {
  const analyticsItems = (items || []).map((item) => makeAnalyticsItem(item));
  return {
    currency: activeCurrency,
    value: analyticsItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    items: analyticsItems
  };
}

function trackCartAnalyticsEvent(eventName, items = cart) {
  if (!items?.length) return;
  trackAnalyticsEvent(eventName, getCartAnalyticsPayload(items));
}

function initCurrencySwitcher() {
  document.querySelectorAll('.header-container').forEach((header) => {
    if (header.querySelector('.currency-switch')) return;

    const switcher = document.createElement('div');
    switcher.className = 'currency-switch';
    switcher.setAttribute('aria-label', uiText('currency.switcher'));
    switcher.innerHTML = `
      <details class="preference-details">
        <summary class="preference-trigger currency-trigger" aria-label="${escapeAttribute(uiText('currency.switcher'))}">
          <span class="currency-flag currency-flag--my" data-current-currency-flag aria-hidden="true"></span>
          <span class="preference-current" data-currency-current>MYR</span>
          <span class="preference-chevron" aria-hidden="true"></span>
        </summary>
        <div class="preference-menu currency-menu" role="listbox" aria-label="${escapeAttribute(uiText('currency.switcher'))}">
          <button type="button" class="preference-option" data-currency="MYR" role="option">
            <span class="currency-flag currency-flag--my" aria-hidden="true"></span>
            <span>MYR</span><span class="preference-check" aria-hidden="true">✓</span>
          </button>
          <button type="button" class="preference-option" data-currency="SGD" role="option">
            <span class="currency-flag currency-flag--sg" aria-hidden="true"></span>
            <span>SGD</span><span class="preference-check" aria-hidden="true">✓</span>
          </button>
          <button type="button" class="preference-option" data-currency="USD" role="option">
            <span class="currency-flag currency-flag--us" aria-hidden="true"></span>
            <span>USD</span><span class="preference-check" aria-hidden="true">✓</span>
          </button>
        </div>
      </details>
    `;

    const ctaButton = header.querySelector('.cta-button');
    if (ctaButton) {
      header.insertBefore(switcher, ctaButton);
    } else {
      header.appendChild(switcher);
    }
  });

  updateCurrencySwitcherUI();
}

function updateCurrencySwitcherUI() {
  document.querySelectorAll('[data-currency]').forEach((button) => {
    const active = button.dataset.currency === activeCurrency;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  document.querySelectorAll('.currency-switch').forEach((switcher) => {
    const currentLabel = switcher.querySelector('[data-currency-current]');
    if (currentLabel) currentLabel.textContent = activeCurrency;

    const currentFlag = switcher.querySelector('[data-current-currency-flag]');
    if (currentFlag) {
      currentFlag.className = `currency-flag currency-flag--${currencyFlagClasses[activeCurrency] || 'my'}`;
      currentFlag.dataset.currentCurrencyFlag = '';
    }

    switcher.querySelector('.preference-details')?.removeAttribute('open');
  });
}

function showCurrencyPauseNotice(trigger) {
  const english = isEnglishLanguage();
  const dialog = document.createElement('dialog');
  dialog.className = 'currency-pause-dialog';
  dialog.setAttribute('aria-labelledby', 'currencyPauseTitle');
  dialog.setAttribute('aria-describedby', 'currencyPauseMessage');
  dialog.innerHTML = `
    <h2 id="currencyPauseTitle">${english ? 'SGD payments are temporarily paused' : '新币（SGD）充值暂时关闭'}</h2>
    <p id="currencyPauseMessage">${english ? 'To pay in Singapore dollars, please contact customer service.' : '如需使用新币付款，请联系客服。'}</p>
    <form method="dialog">
      <button type="submit" class="button button-primary" autofocus>${english ? 'Got it' : '知道了'}</button>
    </form>
  `;
  dialog.addEventListener('close', () => {
    dialog.remove();
    trigger?.focus();
  }, { once: true });
  document.body.appendChild(dialog);
  dialog.showModal();
}

function setActiveCurrency(currency, trigger) {
  if (pausedCurrencies.has(currency)) {
    updateCurrencySwitcherUI();
    showCurrencyPauseNotice(trigger);
    return;
  }
  if (!currencySettings.rates[currency]) return;

  const previousCurrency = activeCurrency;
  activeCurrency = currency;
  localStorage.setItem(currencyKey, activeCurrency);

  updateCurrencySwitcherUI();
  refreshCurrencyDisplay();
  if (previousCurrency !== activeCurrency) {
    trackAnalyticsEvent('change_currency', { currency: activeCurrency });
  }
}

function refreshCurrencyDisplay() {
  document.querySelectorAll('[data-price-base]').forEach((node) => {
    node.textContent = formatPriceForCurrency(node.dataset.priceBase);
  });

  updateCartUI();
  updateDailyOrderStatsUI();
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
  if (amountNode) amountNode.textContent = formatCurrencyAmount(getConvertedAmountFromMyr(data.amount, activeCurrency), activeCurrency);
}

function recordCopiedOrderStats(total) {
  const data = getDailyOrderStats();
  data.count += 1;
  data.amount += Number(total) || 0;
  saveDailyOrderStats(data);
  updateDailyOrderStatsUI();
}

function ensureMobileCartDock() {
  let dock = document.getElementById('mobileCartDock');
  if (dock) return dock;
  dock = document.createElement('button');
  dock.id = 'mobileCartDock';
  dock.className = 'mobile-cart-dock';
  dock.type = 'button';
  dock.setAttribute('aria-label', isEnglishLanguage() ? 'Open cart' : '打开购物车');
  dock.innerHTML = `
    <span class="mobile-cart-dock-icon" aria-hidden="true">🛒</span>
    <span class="mobile-cart-dock-copy">
      <strong id="mobileCartDockCount"></strong>
      <small id="mobileCartDockTotal"></small>
    </span>
    <span class="mobile-cart-dock-action" id="mobileCartDockAction"></span>`;
  document.body.appendChild(dock);
  return dock;
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = getCartTotal();
  const mobileDock = ensureMobileCartDock();
  document.querySelectorAll('#cartCount').forEach((node) => (node.textContent = count));
  document.querySelectorAll('#cartSummary').forEach((node) => {
    node.textContent = uiText('cart.summary', { count });
  });
  document.querySelectorAll('#cartTotal').forEach((node) => {
    node.textContent = uiText('cart.total', { total: formatTotal(total) });
  });
  const mobileCount = document.getElementById('mobileCartDockCount');
  const mobileTotal = document.getElementById('mobileCartDockTotal');
  const mobileAction = document.getElementById('mobileCartDockAction');
  if (mobileCount) mobileCount.textContent = uiText('cart.mobileItems', { count });
  if (mobileTotal) mobileTotal.textContent = uiText('cart.total', { total: formatTotal(total) });
  if (mobileAction) mobileAction.textContent = uiText('cart.mobileView');
  mobileDock.hidden = count === 0;
  document.body.classList.toggle('has-mobile-cart', count > 0);
  renderCartItems();
  updateProductCardSelectionState();
}

function updateProductCardSelectionState() {
  document.querySelectorAll('.product-card[data-cart-key][data-price]').forEach((card) => {
    const matchingItem = cart.find((item) => (
      getCartItemKey(item) === card.dataset.cartKey
      && item.price === card.dataset.price
    )) || cart.find((item) => (
      !item.sectionKey
      && getCartItemChineseTitle(item) === card.dataset.titleZh
      && item.price === card.dataset.price
    ));
    const quantity = matchingItem?.quantity || 0;
    const isInCart = quantity > 0;
    const indicator = card.querySelector('[data-product-action-indicator]');

    card.classList.toggle('is-in-cart', isInCart);
    card.dataset.cartQuantity = String(quantity);
    if (indicator) indicator.textContent = isInCart ? '✓' : '＋';
    if (isInCart) {
      card.setAttribute('aria-label', uiText('product.inCartAria', {
        title: card.dataset.title || '',
        quantity
      }));
    } else if (card.dataset.addAria) {
      card.setAttribute('aria-label', card.dataset.addAria);
    }
  });
}

function renderCartItems() {
  const list = document.getElementById('cartList');
  if (!list) return;

  if (!cart.length) {
    list.innerHTML = `<div class="cart-empty">${escapeHtml(uiText('cart.empty'))}</div>`;
    return;
  }

  const sortedCartEntries = getSortedCartEntries();

  list.innerHTML = sortedCartEntries
    .map(
      ({ item, index }) => `
      <div class="cart-item">
        <strong>${escapeHtml(getCartItemDisplayTitle(item))}</strong>
        <span>${escapeHtml(uiText('cart.quantity', { quantity: item.quantity }))}</span>
        <span>${escapeHtml(uiText('cart.price', { price: formatPriceForCurrency(item.price) }))}</span>
        <div class="quantity-actions">
          <button class="adjust-qty" data-index="${index}" data-action="minus" aria-label="${isEnglishLanguage() ? 'Decrease quantity' : '减少数量'}">-</button>
          <button class="adjust-qty" data-index="${index}" data-action="plus" aria-label="${isEnglishLanguage() ? 'Increase quantity' : '增加数量'}">+</button>
          <button class="remove-item" data-index="${index}">${escapeHtml(uiText('cart.remove'))}</button>
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

function addToCart(productOrTitle, fallbackPrice) {
  const payload = typeof productOrTitle === 'object' && productOrTitle !== null
    ? {
        key: productOrTitle.key || `${encodeURIComponent(productOrTitle.titleZh || productOrTitle.title || '')}::${productOrTitle.price || fallbackPrice || ''}`,
        titleZh: productOrTitle.titleZh || productOrTitle.title || '',
        titleEn: productOrTitle.titleEn || productOrTitle.title || '',
        sectionKey: productOrTitle.sectionKey || '',
        sectionZh: productOrTitle.sectionZh || '',
        sectionEn: productOrTitle.sectionEn || '',
        price: productOrTitle.price || fallbackPrice || ''
      }
    : {
        key: `${encodeURIComponent(String(productOrTitle || '').split(' / ')[0].trim())}::${fallbackPrice || ''}`,
        titleZh: String(productOrTitle || '').split(' / ')[0].trim(),
        titleEn: String(productOrTitle || '').split(' / ').slice(1).join(' / ').trim() || String(productOrTitle || '').split(' / ')[0].trim(),
        sectionKey: '',
        sectionZh: '',
        sectionEn: '',
        price: fallbackPrice || ''
      };

  const canonicalTitle = payload.titleEn && payload.titleEn !== payload.titleZh
    ? `${payload.titleZh} / ${payload.titleEn}`
    : payload.titleZh;
  const existing = cart.find((item) => getCartItemKey(item) === payload.key && item.price === payload.price)
    || cart.find((item) => (
      !item.sectionKey
      && getCartItemChineseTitle(item) === payload.titleZh
      && item.price === payload.price
    ));

  if (existing) {
    existing.quantity += 1;
    existing.key = payload.key;
    existing.titleZh = payload.titleZh;
    existing.titleEn = payload.titleEn;
    existing.sectionKey = payload.sectionKey;
    existing.sectionZh = payload.sectionZh;
    existing.sectionEn = payload.sectionEn;
    existing.title = canonicalTitle;
  } else {
    cart.push({
      key: payload.key,
      titleZh: payload.titleZh,
      titleEn: payload.titleEn,
      sectionKey: payload.sectionKey,
      sectionZh: payload.sectionZh,
      sectionEn: payload.sectionEn,
      title: canonicalTitle,
      price: payload.price,
      quantity: 1
    });
  }
  saveCart();
  updateCartUI();
  showCartToast(uiText('cart.added', {
    title: isEnglishLanguage()
      ? (payload.sectionEn ? `${payload.sectionEn} · ${payload.titleEn}` : payload.titleEn)
      : (payload.sectionZh ? `${payload.sectionZh} · ${payload.titleZh}` : payload.titleZh)
  }));
  const addedItem = existing || cart[cart.length - 1];
  trackCartAnalyticsEvent('add_to_cart', [{ ...addedItem, quantity: 1 }]);
}

function removeCartItem(index) {
  const removedItem = cart[index];
  if (!removedItem) return;
  trackCartAnalyticsEvent('remove_from_cart', [{ ...removedItem }]);
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function changeCartQuantity(index, action) {
  const item = cart[index];
  if (!item) return;
  if (action === 'plus') {
    trackCartAnalyticsEvent('add_to_cart', [{ ...item, quantity: 1 }]);
    item.quantity += 1;
  } else if (action === 'minus') {
    trackCartAnalyticsEvent('remove_from_cart', [{ ...item, quantity: 1 }]);
    item.quantity -= 1;
  }
  cart = cart.filter((entry) => entry.quantity > 0);
  saveCart();
  updateCartUI();
}

function clearCart() {
  trackCartAnalyticsEvent('remove_from_cart', cart.map((item) => ({ ...item })));
  cart = [];
  saveCart();
  updateCartUI();
}

function toggleCartPanel() {
  const panel = document.getElementById('cartPanel');
  if (!panel) return;
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) {
    trackCartAnalyticsEvent('view_cart');
  }
}


function getGameTopupFormType(game, categoryId) {
  if (!game) return '';

  if (game.topupFormType) return game.topupFormType;

  const rawTag = String(game.tag || '').trim();
  const normalizedTag = rawTag.toLowerCase().replace(/\s+/g, ' ');

  if (normalizedTag === 'login top up') return 'login';
  if (normalizedTag === 'uid top up') return 'uid';
  if (rawTag.includes('扫码充值')) return 'tencent';
  if (rawTag.includes('点数/点卡')) return '';

  if (categoryId === 'cn') return 'tencent';
  if (categoryId === 'cards') return '';

  return 'uid';
}

function makeTopupField(field) {
  const label = localizedText(field.label);
  const requiredMark = field.required ? '<span class="topup-required">*</span>' : '';
  const commonAttrs = `data-topup-field="${escapeAttribute(field.name)}" data-topup-label="${escapeAttribute(label)}" data-topup-label-zh="${escapeAttribute(field.label)}" data-required="${field.required ? 'true' : 'false'}"${field.showWhen ? ' disabled' : ''}`;
  const conditionalAttrs = field.showWhen
    ? ` data-topup-depends-on="${escapeAttribute(field.showWhen.field)}" data-topup-depends-value="${escapeAttribute(field.showWhen.value)}" hidden`
    : '';
  const placeholder = field.placeholder ? ` placeholder="${escapeAttribute(localizedText(field.placeholder))}"` : '';
  let control = '';

  if (field.type === 'select') {
    const options = (field.options || [])
      .map((option) => `<option value="${escapeAttribute(option)}">${escapeHtml(localizedText(option))}</option>`)
      .join('');

    control = `
      <select ${commonAttrs}>
        <option value="">${escapeHtml(uiText('topup.select', { label }))}</option>
        ${options}
      </select>`;
  } else if (field.type === 'textarea') {
    control = `<textarea ${commonAttrs}${placeholder} rows="3"></textarea>`;
  } else {
    const inputType = field.type || 'text';
    control = `<input type="${escapeAttribute(inputType)}" ${commonAttrs}${placeholder} autocomplete="off">`;
  }

  return `
    <label class="topup-field" data-field-wrap="${escapeAttribute(field.name)}"${conditionalAttrs}>
      <span>${escapeHtml(label)}${requiredMark}</span>
      ${control}
    </label>`;
}

function syncTopupConditionalFields(container) {
  container.querySelectorAll('[data-topup-depends-on]').forEach((wrapper) => {
    const source = Array.from(container.querySelectorAll('[data-topup-field]'))
      .find((field) => field.dataset.topupField === wrapper.dataset.topupDependsOn);
    const active = source?.value === wrapper.dataset.topupDependsValue;
    wrapper.hidden = !active;
    wrapper.querySelectorAll('[data-topup-field]').forEach((field) => {
      field.disabled = !active;
      field.required = active && field.dataset.required === 'true';
      if (!active) field.value = '';
    });
  });
}

function renderTopupInfoForm(categoryId, game) {
  const container = document.getElementById('topupFormContainer');
  if (!container) return;

  const formType = getGameTopupFormType(game, categoryId);
  const config = topupFormConfigs[formType];

  if (!config) {
    container.innerHTML = '';
    container.hidden = true;
    document.body.dataset.topupFormType = '';
    return;
  }

  const fields = game.id === 'shan-jiang-sanguo' && formType === 'login'
    ? [
        ...config.fields.slice(0, 1),
        {
          name: 'system',
          label: '系统',
          type: 'select',
          required: true,
          options: ['苹果 iOS', '安卓 Android']
        },
        ...config.fields.slice(1)
      ]
    : config.fields;

  document.body.dataset.topupFormType = formType;
  container.hidden = false;
  container.innerHTML = `
    <section class="topup-form-panel" data-topup-form-type="${escapeAttribute(formType)}">
      <div class="topup-form-header">
        <div>
          <span class="topup-form-badge">${escapeHtml(config.badge)}</span>
          <h4>${escapeHtml(localizedText(config.title))}</h4>
          <p>${escapeHtml(localizedText(config.description))}</p>
        </div>
      </div>
      <div class="topup-form-grid">
        ${fields.map(makeTopupField).join('')}
      </div>
    </section>`;
  syncTopupConditionalFields(container);
  container.querySelectorAll('select[data-topup-field]').forEach((field) => {
    field.addEventListener('change', () => syncTopupConditionalFields(container));
  });
}

function getTopupInfoFields() {
  const manualServer = document.querySelector('[data-topup-field="serverMode"]')?.value === '手动填写大区';
  return Array.from(document.querySelectorAll('[data-topup-field]'))
    .filter((field) => !field.disabled)
    .filter((field) => !(manualServer && field.dataset.topupField === 'serverMode'))
    .map((field) => {
    const value = String(field.value || '').trim();
    const displayValue = field.tagName === 'SELECT' && value
      ? String(field.selectedOptions?.[0]?.textContent || value).trim()
      : value;

    return {
      name: field.dataset.topupField || '',
      label: manualServer && field.dataset.topupField === 'server' ? localizedText('大区') : field.dataset.topupLabel || '',
      required: field.dataset.required === 'true',
      value,
      displayValue,
      element: field
    };
  });
}

function validateTopupRequiredFields() {
  const missing = getTopupInfoFields().filter((field) => field.required && !field.value);

  if (!missing.length) return true;

  const firstMissing = missing[0];
  firstMissing.element.focus();
  showCartToast(uiText('topup.required', { label: firstMissing.label }));
  return false;
}

function getTopupInfoLines() {
  const fields = getTopupInfoFields();
  if (!fields.length) return [];

  return fields
    .filter((field) => field.name !== 'remark')
    .filter((field) => field.required || field.value)
    .map((field) => `${field.label}: ${field.displayValue || uiText('order.unfilled')}`);
}

function writeTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  } finally {
    document.body.removeChild(textarea);
  }
}

function getMalaysiaDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: catalogSettings.timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23'
  });
  return formatter.formatToParts(date).reduce((parts, part) => {
    if (part.type !== 'literal') parts[part.type] = part.value;
    return parts;
  }, {});
}

function makeOrderFingerprint() {
  const source = JSON.stringify({
    cartContext: getCartScopeKey(cartContext),
    currency: activeCurrency,
    cart: getSortedCartEntries().map(({ item }) => ({
      key: getCartItemKey(item),
      price: item.price,
      quantity: item.quantity
    })),
    topup: getTopupInfoFields().map((field) => [field.name, field.value])
  });

  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function makeOrderRandomCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const values = new Uint8Array(4);
  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(values);
  } else {
    values.forEach((value, index) => {
      values[index] = Math.floor(Math.random() * 256);
    });
  }
  return Array.from(values, (value) => alphabet[value % alphabet.length]).join('');
}

function getOrCreateOrderIdentity() {
  const fingerprint = makeOrderFingerprint();
  if (currentOrderIdentity?.fingerprint === fingerprint) return currentOrderIdentity;

  const createdAt = new Date();
  const parts = getMalaysiaDateParts(createdAt);
  const displayTime = new Intl.DateTimeFormat('en-US', {
  timeZone: catalogSettings.timeZone,
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
}).format(createdAt);
  currentOrderIdentity = {
    fingerprint,
    id: `BG-${parts.year}${parts.month}${parts.day}-${parts.hour}${parts.minute}-${makeOrderRandomCode()}`,
    time: `${parts.year}-${parts.month}-${parts.day} ${displayTime}`
  };
  return currentOrderIdentity;
}


function copyCartToClipboard(options = {}) {
  const { openContactAfterCopy = false, requireTopupInfo = false } = options;

  if (!cart.length) {
    alert(uiText('cart.emptyCopy'));
    return;
  }

  if (requireTopupInfo && !validateTopupRequiredFields()) {
    return;
  }

  const total = getCartTotal();
  const currentGame = getGameFromCartContext(cartContext);
  const orderIdentity = getOrCreateOrderIdentity();

  const currentGameName =
    localizedGameName(currentGame, true) ||
    document.getElementById('detailTitle')?.textContent.trim() ||
    document.getElementById('detailGameName')?.textContent.trim() ||
    cartContext?.gameName ||
    'Brilliant Gaming';

  const productLines = getSortedCartEntries().map(({ item }) => {
  return `${getCartItemDisplayTitle(item)} x${item.quantity}`;
});

  const separator = isEnglishLanguage() ? ': ' : '：';
  const topupFields = getTopupInfoFields()
    .filter((field) => field.name !== 'remark')
    .filter((field) => field.required || field.value);
  const paymentField = topupFields.find((field) => field.name === 'paymentMethod');
  const otherTopupFields = topupFields.filter((field) => field.name !== 'paymentMethod');
  const makeTopupLine = (field) => `${field.label}${separator}${field.displayValue || uiText('order.unfilled')}`;
  const paymentLine = paymentField ? makeTopupLine(paymentField) : '';
  const otherTopupLines = otherTopupFields.map(makeTopupLine);

  const text = `${uiText('order.number')}${separator}${orderIdentity.id}
${uiText('order.time')}${separator}${orderIdentity.time}

${paymentLine ? `${paymentLine}\n\n` : ''}${uiText('order.game')}${separator}${currentGameName}

${uiText('order.topupInfo')}${separator.trim()}
${otherTopupLines.length ? otherTopupLines.join('\n') : uiText('order.unfilledHelp')}

${uiText('order.products')}${separator.trim()}
${productLines.join('\n')}

${uiText('order.total')}${separator}${formatTotal(total)}`;

  latestOrderText = text;
  latestOrderIdentity = orderIdentity;
  const checkoutAnalytics = getCartAnalyticsPayload();

  writeTextToClipboard(text)
    .then(() => {
      trackAnalyticsEvent('begin_checkout', checkoutAnalytics);
      showCartToast(openContactAfterCopy ? uiText('order.copied') : uiText('cart.copied'));
      if (openContactAfterCopy) {
        showOrderCopiedDialog(() => openContactModal('order'));
      }
    })
    .catch(() => alert(uiText('order.copyFailed')));
}

function showOrderCopiedDialog(onConfirm) {
  const existing = document.getElementById('orderCopiedDialog');
  if (existing) existing.remove();

  const dialog = document.createElement('div');
  dialog.id = 'orderCopiedDialog';
  dialog.className = 'order-copied-modal open';

  dialog.innerHTML = `
    <div class="order-copied-dialog" role="dialog" aria-modal="true">
      <div class="order-copied-icon">✓</div>
      <h3>${escapeHtml(uiText('order.dialogTitle'))}</h3>
      ${latestOrderIdentity?.id ? `<div class="order-copied-reference">${escapeHtml(uiText('order.number'))}: <strong>${escapeHtml(latestOrderIdentity.id)}</strong></div>` : ''}
      <p>${escapeHtml(uiText('order.dialogText')).replace(/\n/g, '<br>')}</p>
      <div class="order-copied-note">
        ${escapeHtml(uiText('order.dialogNote'))}
      </div>
      <button type="button" class="button button-primary" id="orderCopiedConfirm">
        ${escapeHtml(uiText('order.dialogConfirm'))}
      </button>
    </div>
  `;

  document.body.appendChild(dialog);

  const confirmBtn = dialog.querySelector('#orderCopiedConfirm');

  confirmBtn.addEventListener('click', () => {
    dialog.remove();
    if (typeof onConfirm === 'function') onConfirm();
  });
}

function copyCartAndOpenContact() {
  copyCartToClipboard({
    openContactAfterCopy: true,
    requireTopupInfo: true
  });
}

// Directory-only art: keep detail-page hero images and original app icons unchanged.
const directoryCoverArtwork = new Map([
  ['tower-of-saviors', 'assets/images/games/tower-of-saviors-directory-cover.webp'],
  ['aniimo', 'assets/images/games/aniimo2.webp'],
  ['shan-jiang-sanguo', 'assets/images/games/shan-jiang-sanguo2.jpg'],
  // https://www.garena.sg/news/XFR3UH
  ['monster-hunter-outlanders', 'assets/images/games/monster-hunter-outlanders-directory-cover.webp'],
  // https://www.identityvgame.com/
  ['identity-v', 'assets/images/games/identity-v-directory-cover.webp'],
  // Southeast Asia launch artwork.
  ['ragnarok-go', 'assets/images/games/ragnarok-go-directory-cover.webp'],
  // Keep the Garena versions separate from the PC international client.
  ['garena-haikyu-fly-high', 'assets/images/games/garena-haikyu-fly-high-hero.webp'],
  ['garena-undawn', 'assets/images/games/garena-undawn-directory-cover.webp'],
  ['garena-aov', 'assets/images/games/garena-aov-directory-cover.webp'],
  ['delta-force-global-pc', 'assets/images/games/delta-force-global-pc2.jpg'],
  ['kai-tian', 'assets/images/games/kai-tian-directory-cover.webp'],
  ['yulgang-w', 'assets/images/games/yulgang-w-directory-cover.webp'],
  ['goddess-of-victory-nikke', 'assets/images/games/nikke-directory-cover.webp'],
  ['neverness-to-everness', 'assets/images/games/nte2.jpg'],
  ['wangzhe-rongyao-shijie', 'assets/images/games/王者荣耀世界2.jpg'],
  ['wuwei-qiyue', 'assets/images/games/无畏契约2.jpg'],
  ['razer-gold-top-up-pin', 'assets/images/games/razer-gold2.jpg'],
  ['roblox', 'assets/images/games/app-icons/roblox.webp']
]);

function makeGameCover(game) {
  const displayName = localizedGameName(game);
  if (!game.image) {
    return `<div class="game-avatar"><span>${escapeHtml(getAvatarText(displayName))}</span></div>`;
  }
  const fallback = escapeHtml(getAvatarText(displayName));
  const coverSrc = escapeAttribute(directoryCoverArtwork.get(game.id) || game.image);
  return `
    <div class="game-avatar game-cover">
      <img class="game-cover-main" src="${coverSrc}" alt="" loading="lazy" decoding="async" onerror="this.hidden = true; this.nextElementSibling.hidden = false;">
      <span class="game-cover-fallback" hidden aria-hidden="true">${fallback}</span>
    </div>`;
}

function makeHomeGameCard(categoryId, game) {
  const name = localizedGameName(game);
  const description = localizedGameDescription(game);
  const tag = localizedGameTag(game);
  return `
    <a class="game-card" href="${escapeAttribute(gamePageHref(categoryId, game.id))}" data-name="${escapeAttribute(`${game.name} ${englishGameName(game)}`.toLowerCase())}" data-game-id="${escapeAttribute(game.id)}" data-category="${escapeAttribute(categoryId)}">
      ${makeGameCover(game)}
      <h3>${escapeHtml(name)}</h3>
      <p>${escapeHtml(description)}</p>
      <div class="tag">${escapeHtml(tag)}</div>
    </a>`;
}

function makeCategoryGameCard(categoryId, game) {
  return makeHomeGameCard(categoryId, game);
}

const validProductStatuses = new Set(['active', 'paused', 'soldout', 'inquiry']);

function getProductStatus(product) {
  const explicitStatus = String(product?.status || '').toLowerCase();
  if (validProductStatuses.has(explicitStatus)) return explicitStatus;
  return hasNumericPrice(product?.price) ? 'active' : 'inquiry';
}

const gamePlatformOptions = Object.freeze({
  ios: Object.freeze({
    id: 'ios',
    badge: 'iOS',
    labelKey: 'game.platformIos',
    hintKey: 'game.platformIosHint',
    systemValue: '苹果 iOS',
    sectionZh: '苹果 iOS',
    sectionEn: 'Apple iOS'
  }),
  android: Object.freeze({
    id: 'android',
    badge: 'Android',
    labelKey: 'game.platformAndroid',
    hintKey: 'game.platformAndroidHint',
    systemValue: '安卓 Android',
    sectionZh: '安卓 Android',
    sectionEn: 'Android'
  })
});

function normalizeGamePlatform(value) {
  const normalized = String(value || '').trim().toLowerCase();
  return Object.prototype.hasOwnProperty.call(gamePlatformOptions, normalized) ? normalized : '';
}

function hasGamePlatformSelector(game) {
  return game?.platformSelector === true || game?.platformSelector?.enabled === true;
}

function getSelectedGamePlatform(game) {
  if (!hasGamePlatformSelector(game)) return '';
  return normalizeGamePlatform(getQueryParams().platform || document.body.dataset.gamePlatform);
}

function getSectionPlatform(section) {
  const explicitPlatform = String(section?.platform || '').trim().toLowerCase();
  if (explicitPlatform === 'shared') return 'shared';
  if (normalizeGamePlatform(explicitPlatform)) return explicitPlatform;

  const title = String(section?.title || '');
  if (title.includes('苹果系统')) return 'ios';
  if (title.includes('安卓系统')) return 'android';
  return 'shared';
}

function getSectionSystemValue(section) {
  const platform = getSectionPlatform(section);
  if (platform === 'ios' || platform === 'android') {
    return gamePlatformOptions[platform].systemValue;
  }
  return '';
}

function makeGamePlatformSelector(selectedPlatform = '') {
  const buttons = Object.values(gamePlatformOptions).map((option) => {
    const isActive = option.id === selectedPlatform;
    return `
      <button class="game-platform-option${isActive ? ' is-active' : ''}" type="button" role="tab" aria-selected="${isActive ? 'true' : 'false'}" data-game-platform="${escapeAttribute(option.id)}">
        <span class="game-platform-badge">${escapeHtml(option.badge)}</span>
        <span class="game-platform-option-copy">
          <strong>${escapeHtml(uiText(option.labelKey))}</strong>
          <small>${escapeHtml(uiText(option.hintKey))}</small>
        </span>
        <span class="game-platform-check" aria-hidden="true">✓</span>
      </button>`;
  }).join('');

  return `
    <section class="game-platform-picker" aria-labelledby="gamePlatformTitle">
      <div class="game-platform-picker-copy">
        <span class="game-platform-eyebrow">${escapeHtml(uiText('game.platformEyebrow'))}</span>
        <h2 id="gamePlatformTitle">${escapeHtml(uiText('game.platformTitle'))}</h2>
        <p>${escapeHtml(uiText('game.platformBody'))}</p>
      </div>
      <div class="game-platform-options" role="tablist" aria-label="${escapeAttribute(uiText('game.platformTitle'))}">
        ${buttons}
      </div>
      <p class="game-platform-shared-note">${escapeHtml(uiText('game.platformSharedNote'))}</p>
    </section>`;
}

function setTopupSystemFromPlatform(platform) {
  const systemField = document.querySelector('[data-topup-field="system"]');
  if (!systemField) return;

  const normalized = normalizeGamePlatform(platform);
  if (!normalized) {
    systemField.disabled = false;
    delete systemField.dataset.platformLocked;
    systemField.removeAttribute('title');
    return;
  }

  const option = gamePlatformOptions[normalized];
  systemField.value = option.systemValue;
  systemField.disabled = true;
  systemField.dataset.platformLocked = 'true';
  systemField.setAttribute('title', uiText('game.platformSelected', {
    platform: uiText(option.labelKey)
  }));
  systemField.dispatchEvent(new Event('change', { bubbles: true }));
}

function selectGamePlatform(platform) {
  const nextPlatform = normalizeGamePlatform(platform);
  const params = getQueryParams();
  const category = categories[params.category];
  const game = category?.games?.find((item) => item.id === params.gameId);
  if (!nextPlatform || !hasGamePlatformSelector(game)) return;

  const currentPlatform = getSelectedGamePlatform(game);
  if (currentPlatform === nextPlatform) return;
  if (cart.length && !window.confirm(uiText('game.platformSwitchConfirm'))) return;
  if (cart.length) clearCart();

  const query = new URLSearchParams(window.location.search);
  query.set('platform', nextPlatform);
  const queryString = query.toString();
  history.replaceState(null, '', `${window.location.pathname}${queryString ? `?${queryString}` : ''}${window.location.hash}`);
  document.body.dataset.gamePlatform = nextPlatform;

  const products = document.getElementById('gameProducts');
  if (products) products.innerHTML = makeProductSections(game, nextPlatform);
  updateProductCardSelectionState();
  setTopupSystemFromPlatform(nextPlatform);
  showCartToast(uiText('game.platformSelected', {
    platform: uiText(gamePlatformOptions[nextPlatform].labelKey)
  }));
}

function applyProductFormDefaults(productCard) {
  const systemValue = productCard?.dataset.systemValue || '';
  if (!systemValue) return;

  const systemField = document.querySelector('[data-topup-field="system"]');
  if (!systemField) return;
  const hasOption = Array.from(systemField.options || []).some((option) => option.value === systemValue);
  if (!hasOption) return;
  systemField.value = systemValue;
  systemField.dispatchEvent(new Event('change', { bubbles: true }));
}

function openInquiryChannel(message, label = '') {
  latestInquiryText = message;
  latestInquiryLabel = label;
  if (document.getElementById('contactModal')) {
    openContactModal('inquiry');
    return;
  }

  const url = `https://wa.me/${catalogSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
}

function openProductInquiry(productCard) {
  const currentGame = getGameFromCartContext(cartContext);
  const gameName = localizedGameName(currentGame, true) || cartContext?.gameName || 'Brilliant Gaming';
  const sectionTitle = productCard?.dataset.sectionTitle || '';
  const productTitle = productCard?.dataset.title || '';
  const item = sectionTitle ? `${sectionTitle} · ${productTitle}` : productTitle;
  openInquiryChannel(uiText('product.inquiryMessage', { game: gameName, item }), item);
}

function formatLiveCoinAmount(value) {
  return new Intl.NumberFormat(isEnglishLanguage() ? 'en-US' : 'zh-CN', {
    maximumFractionDigits: 2
  }).format(value);
}

function updateCustomAmountPreview(container) {
  if (!container) return;
  const input = container.querySelector('[data-custom-amount-input]');
  const preview = container.querySelector('[data-custom-amount-preview]');
  if (!input || !preview) return;

  const amount = Number(input.value);
  const rate = Number(container.dataset.coinRate || 1);
  const coinName = isEnglishLanguage()
    ? (container.dataset.coinNameEn || container.dataset.coinNameZh || '')
    : (container.dataset.coinNameZh || container.dataset.coinNameEn || '');
  preview.textContent = Number.isFinite(amount) && amount > 0
    ? uiText('product.customAmountPreview', {
      coins: formatLiveCoinAmount(amount * rate),
      coinName
    })
    : uiText('product.customAmountEmpty');
}

function openCustomAmountInquiry(container) {
  if (!container) return;
  const input = container.querySelector('[data-custom-amount-input]');
  const amount = Number(input?.value);
  if (!Number.isFinite(amount) || amount <= 0) {
    showCartToast(uiText('product.customAmountInvalid'));
    input?.focus();
    return;
  }

  const rate = Number(container.dataset.coinRate || 1);
  const coinName = isEnglishLanguage()
    ? (container.dataset.coinNameEn || container.dataset.coinNameZh || '')
    : (container.dataset.coinNameZh || container.dataset.coinNameEn || '');
  const currentGame = getGameFromCartContext(cartContext);
  const gameName = localizedGameName(currentGame, true) || cartContext?.gameName || 'Brilliant Gaming';
  const coins = formatLiveCoinAmount(amount * rate);
  const formattedAmount = formatLiveCoinAmount(amount);
  const item = `${isEnglishLanguage() ? 'Custom amount' : '自定义数额'} · ¥${formattedAmount} = ${coins} ${coinName}`;

  openInquiryChannel(uiText('product.customInquiryMessage', {
    game: gameName,
    amount: formattedAmount,
    coins,
    coinName
  }), item);
}

function getExchangeTiers(container) {
  try {
    const tiers = JSON.parse(container?.dataset.exchangeTiers || '[]');
    return Array.isArray(tiers)
      ? tiers.filter((tier) => Number.isFinite(Number(tier?.min)) && Number.isFinite(Number(tier?.rate)))
      : [];
  } catch {
    return [];
  }
}

function getExchangeTier(amount, tiers) {
  return [...tiers]
    .sort((a, b) => Number(b.min) - Number(a.min))
    .find((tier) => amount >= Number(tier.min));
}

function calculateTieredExchange(amount, tiers) {
  const tier = getExchangeTier(amount, tiers);
  if (!tier) return null;
  const rate = Number(tier.rate);
  const surcharge = Number(tier.surcharge || 0);
  if (!Number.isFinite(rate) || rate <= 0) return null;
  return {
    tier,
    rate,
    surcharge,
    myr: Math.ceil((amount / rate) + surcharge)
  };
}

function getTieredExchangeValues(container) {
  const input = container?.querySelector('[data-exchange-amount-input]');
  const amount = Number(input?.value);
  if (!Number.isFinite(amount) || amount <= 0) return { input, amount, result: null };
  return {
    input,
    amount,
    result: calculateTieredExchange(amount, getExchangeTiers(container))
  };
}

function updateTieredExchangePreview(container) {
  if (!container) return;
  const preview = container.querySelector('[data-exchange-amount-preview]');
  if (!preview) return;
  const { result } = getTieredExchangeValues(container);
  if (!result) {
    preview.textContent = uiText('product.exchangeAmountEmpty');
    const coinPreview = container.querySelector('[data-exchange-coin-preview]');
    if (coinPreview) coinPreview.textContent = '';
    return;
  }
  preview.textContent = uiText('product.exchangeAmountPreview', {
    price: formatPriceForCurrency(`RM ${result.myr.toFixed(2)}`)
  });
  const coinPreview = container.querySelector('[data-exchange-coin-preview]');
  if (coinPreview) {
    const { amount } = getTieredExchangeValues(container);
    coinPreview.textContent = uiText('product.customAmountPreview', {
      coins: formatLiveCoinAmount(amount * Number(container.dataset.coinRate || 1)),
      coinName: isEnglishLanguage() ? container.dataset.coinNameEn : container.dataset.coinNameZh
    });
  }
}

function addTieredExchangeToCart(container) {
  if (!container) return;
  const { input, amount, result } = getTieredExchangeValues(container);
  if (!result) {
    showCartToast(uiText('product.exchangeInvalid'));
    input?.focus();
    return;
  }

  const formattedAmount = formatLiveCoinAmount(amount);
  const coins = container.dataset.coinNameZh
    ? formatLiveCoinAmount(amount * Number(container.dataset.coinRate || 1)) : '';
  const titleZh = coins ? `${coins} ${container.dataset.coinNameZh}（¥${formattedAmount}）` : `充值 ¥${formattedAmount}`;
  const titleEn = coins ? `${coins} ${container.dataset.coinNameEn} (CNY ${formattedAmount})` : `Top Up ¥${formattedAmount}`;
  const price = `RM ${result.myr.toFixed(2)}`;

  addToCart({
    key: `exchange:${container.dataset.gameId || ''}:${amount}:${result.rate}:${result.surcharge}`,
    titleZh,
    titleEn,
    sectionKey: container.dataset.sectionKey || '',
    sectionZh: container.dataset.sectionZh || '',
    sectionEn: container.dataset.sectionEn || '',
    price
  });
}

function handleProductCardAction(productCard) {
  const status = productCard?.dataset.productStatus || 'active';
  if (status === 'paused') {
    showCartToast(uiText('product.pausedNotice'));
    return;
  }
  if (status === 'soldout') {
    showCartToast(uiText('product.soldoutNotice'));
    return;
  }
  if (status === 'inquiry') {
    openProductInquiry(productCard);
    return;
  }

  addToCart({
    key: productCard.dataset.cartKey,
    titleZh: productCard.dataset.titleZh,
    titleEn: productCard.dataset.titleEn,
    sectionKey: productCard.dataset.sectionKey,
    sectionZh: productCard.dataset.sectionZh,
    sectionEn: productCard.dataset.sectionEn,
    price: productCard.dataset.price
  });
  applyProductFormDefaults(productCard);
}

const internationalProductGameIds = new Set(categories.intl.games.map(({ id }) => id));
const compactLiveArtwork = new Map([
  ['douyin-live', 'douyin-official-app-icon.jpg'],
  ['huya-live', 'huya-official-app-icon.jpg'],
  ['douyu-live', 'douyu-official-app-icon.jpg'],
  ['kuaishou-live', 'kuaishou-official-app-icon.jpg']
]);
const compactProductGameIds = new Set([
  ...internationalProductGameIds,
  ...categories.cn.games.map(({ id }) => id),
  ...compactLiveArtwork.keys(),
  'china-apple-gift-card'
]);

const compactProductIllustrations = new Map([
  ['peace-elite:特权精英卡', 'elite'],
  ['huoying-renzhe:豪华忍法帖', 'scroll-deluxe'],
  ['huoying-renzhe:传说忍法帖', 'scroll-legendary'],
  ['delta-force-cn:小黑卡', 'delta-black'],
  ['delta-force-cn:悦享卡', 'delta-enjoy'],
  ['delta-force-cn:黑曜卡【普通】', 'obsidian-standard'],
  ['delta-force-cn:黑曜卡【豪华】', 'obsidian-deluxe'],
  ['wuwei-qiyue:无畏先行卡', 'advance-pass']
]);

// Match artwork to the exact catalog item, never to a similar title in another game.
// Sources include HoYoverse, SEAGM, Midasbuy, Codashop, and LTGAMES' official top-up center.
const compactItemArtwork = new Map([
  // Reusable store illustration, without any rotating character or bonus contents.
  ['pokemon-tcg-pocket', new Map([['礼包', 'gift-box-gold']])],
  // ManaBuy Malaysia NIKKE listing: match jewel base amounts and package names, not its offer terms.
  ['goddess-of-victory-nikke', new Map([
    ['60 珠宝（首购另赠 60）', 'gems-60'],
    ['120 珠宝（首购另赠 120）', 'gems-120'],
    ['320 珠宝（首购另赠 320）', 'gems-120'],
    ['720 珠宝（首购另赠 720）', 'gems-720'],
    ['1500 珠宝（首购另赠 1500）', 'gems-720'],
    ['2300 珠宝（首购另赠 2300）', 'gems-2300'],
    ['2370 珠宝（首购另赠 2370）', 'gems-2370'],
    ['4200 珠宝（首购另赠 4200）', 'gems-2370'],
    ['6200 珠宝（首购另赠 6200）', 'gems-6200'],
    ['月卡', 'monthly-pass'],
    ['强化模组礼包', 'enhanced-module-set'],
    ['技术支援礼包 S I', 'technical-support-s-i'],
    ['技术支援礼包 S II', 'technical-support-s-ii'],
    ['技术大师礼包', 'technical-master'],
    ['成长精选礼包', 'grow-selection-set'],
    ['企业后备礼包', 'manufacturer-backup'],
    ['职业研究礼包', 'class-research-set'],
    ['企业研究礼包', 'manufacturer-research-set']
  ])],
  // The clean currency icon from the Endfield Talos Wiki, rather than channel-specific offers.
  ['arknights-endfield', new Map([
    ['4 衍质源石 + 2 赠送', 'origeometry'],
    ['21 衍质源石 + 5 赠送', 'origeometry'],
    ['34 衍质源石 + 34 赠送', 'origeometry'],
    ['57 衍质源石 + 11 赠送', 'origeometry'],
    ['92 衍质源石 + 20 赠送', 'origeometry'],
    ['194 衍质源石 + 48 赠送', 'origeometry'],
    ['月卡', 'monthly-pass'],
    // Protocol Customized artwork appears in-game and in the GRYPHLINE Top-up Center.
    ['通行证付费档', 'protocol-customized']
  ])],
  // https://www.seagm.com/en-us/epic-heroes-x-hero-red-diamond (in-game red diamond symbol).
  ['x-hero-epic-hero', new Map([
    ['20 + 1 红钻', 'red-diamond'],
    ['50 + 2 红钻', 'red-diamond'],
    ['100 + 4 红钻', 'red-diamond'],
    ['150 + 6 红钻', 'red-diamond'],
    ['200 + 8 红钻', 'red-diamond'],
    ['250 + 10 红钻', 'red-diamond'],
    ['500 + 20 红钻', 'red-diamond'],
    ['1000 + 40 红钻', 'red-diamond'],
    ['2000 + 80 红钻', 'red-diamond'],
    ['4000 + 160 红钻', 'red-diamond'],
    ['6000 + 240 红钻', 'red-diamond']
  ])],
  // https://www.topuplive.com/whiteoutsurvival/ (pack art only, without a denomination caption).
  ['whiteout-survival', new Map([
    ['4.99 美金礼包', 'standard-pack'],
    ['9.99 美金礼包', 'standard-pack'],
    ['19.99 美金礼包', 'standard-pack'],
    ['24.99 美金礼包', 'standard-pack'],
    ['49.99 美金礼包', 'standard-pack'],
    ['99.99 美金礼包', 'standard-pack']
  ])],
  // https://www.seagm.com/age-of-empires-mobile-top-up
  ['age-of-empires-mobile', new Map([
    ['400 Empire Coins', '400-empire-coins'],
    ['2100 Empire Coins', '2100-empire-coins'],
    ['4400 Empire Coins', '4400-empire-coins'],
    ['9200 Empire Coins', '9200-empire-coins'],
    ['24000 Empire Coins', '24000-empire-coins'],
    ['50000 Empire Coins', '50000-empire-coins'],
    ['99 Apex Coins', '99-apex-coins'],
    ['499 Apex Coins', '499-apex-coins'],
    ['999 Apex Coins', '999-apex-coins'],
    ['1999 Apex Coins', '1999-apex-coins'],
    ['4999 Apex Coins', '4999-apex-coins'],
    ['9999 Apex Coins', '9999-apex-coins']
  ])],
  // https://www.seagm.com/where-winds-meet-top-up
  ['where-winds-meet', new Map([
    ['60 长鸣珠', '60'],
    ['180 长鸣珠', '180'],
    ['300 长鸣珠', '300'],
    ['600 长鸣珠', '600'],
    ['900 长鸣珠', '900'],
    ['1800 长鸣珠', '1800'],
    ['3000 长鸣珠', '3000'],
    ['6000 长鸣珠', '6000'],
    ['月度礼金【月卡】', 'monthly-pass'],
    ['精英战令', 'elite-battle-pass'],
    ['典藏战令', 'premium-battle-pass']
  ])],
  // https://www.seagm.com/sword-of-justice-mobile-sea-top-up (base jade amounts; listed bonuses are unchanged).
  ['sword-of-justice', new Map([
    ['60 + 3 纹玉', '60'],
    ['300 + 18 纹玉', '300'],
    ['980 + 58 纹玉', '980'],
    ['1980 + 118 纹玉', '1980'],
    ['3280 + 196 纹玉', '3280'],
    ['6480 + 388 纹玉', '6480'],
    ['月卡', 'monthly-pass'],
    ['基础战令', 'basic-battle-pass'],
    ['战令升级', 'battle-pass-upgrade'],
    ['进阶战令', 'advanced-battle-pass'],
    // NetEase GamesClub serves the same art for Exquisite Treasure I and II.
    ['绮珍秘宝·一', 'exquisite-treasure'],
    ['绮珍秘宝·二', 'exquisite-treasure']
  ])],
  // https://www.topuplive.com/neverness-to-everness/
  ['neverness-to-everness', new Map([
    ['60 异晶', '60'],
    ['300 + 30 异晶', '300'],
    ['980 + 110 异晶', '980'],
    ['1980 + 260 异晶', '1980'],
    ['3280 + 600 异晶', '3280'],
    ['6480 + 1600 异晶', '6480'],
    ['异晶开采凭证', 'mining-permit'],
    // https://gamewith.net/nte/74371 (the in-game pass screen shares its central artwork).
    ['精英猎人补给', 'hunter-supplies'],
    ['荣誉猎人补给', 'hunter-supplies']
  ])],
  // https://www.topuplive.com/arena-breakout/
  ['arena-breakout', new Map([
    ['60 + 6 Bonds', '60'],
    ['310 + 25 Bonds', '310'],
    ['630 + 45 Bonds', '630'],
    ['1580 + 110 Bonds', '1580'],
    ['3200 + 200 Bonds', '3200'],
    ['6500 + 320 Bonds', '6500']
  ])],
  // https://www.topuplive.com/crystal-of-atlan/
  ['crystal-of-atlan', new Map([
    // Same-game Opal artwork; the top-up vouchers have their own icons.
    ...[60, 300, 980, 1980, 3280, 6480].map(amount => [`${amount} 欧泊`, 'opal']),
    ['60 代金券', 'voucher-60'],
    ['300 代金券', 'voucher-300'],
    ['980 代金券', 'voucher-980'],
    ['1980 代金券', 'voucher-1980'],
    ['3280 代金券', 'voucher-3280'],
    ['6480 代金券', 'voucher-6480']
  ])],
  // https://www.lapakgaming.com/id-id/dragon-nest-m-classic
  ['dragon-nest-m-classic', new Map([
    ['600 + 26 Gems', '600'],
    ['3000 + 130 Gems', '3000'],
    ['6000 + 366 Gems', '6000'],
    ['12000 + 800 Gems', '12000'],
    ['18000 + 1500 Gems', '18000'],
    ['30000 + 2900 Gems', '30000'],
    ['60000 + 6000 Gems', '60000']
  ])],
  // https://titangamestore.com/game/game-topup-id-pass/yulgang-w
  ['yulgang-w', new Map([
    ['66 热血币', '66'],
    ['169 热血币', '169'],
    ['339 热血币', '339'],
    ['690 热血币', '690'],
    // Same currency artwork for larger packs without a verified separate image.
    ['1380 热血币', '690'],
    ['2070 热血币', '690'],
    ['3450 热血币', '690']
  ])],
  // Garena Malaysia uses the same official CP icon for all top-up amounts.
  ['garena-codm', new Map([
    ['114 CP', 'cp'],
    ['230 + 23 CP', 'cp'],
    ['460 + 69 CP', 'cp'],
    ['690 + 104 CP', 'cp'],
    ['1150 + 173 CP', 'cp'],
    ['2300 + 460 CP', 'cp'],
    ['4600 + 1840 CP', 'cp']
  ])],
  ['garena-haikyu-fly-high', new Map([
    '60', '300', '980', '1,980', '3,280', '6,480'
  ].map(amount => [`${amount} 星钻`, 'currency']))],
  ['garena-undawn', new Map([
    '90', '180', '360', '540', '900', '1,800', '3,600', '7,200', '36,000', '72,000'
  ].map(amount => [`${amount} RC`, 'currency']))],
  ['garena-aov', new Map([
    91, 230, 345, 599, 873
  ].map(amount => [`${amount} 点券`, 'voucher']))],
  // Delta Force PC (Steam) pack art from Titan Game Store. The two largest tiers
  // reuse the 6480 pack image; no separate art was confirmed for those tiers.
  ['delta-force-global-pc', new Map([
    ['300 + 20 三角币', 'coin-stack'],
    ['420 + 40 三角币', 'coin-stack'],
    ['680 + 70 三角币', 'coin-stack'],
    ['1280 + 200 三角币', 'coin-case'],
    ['1680 + 300 三角币', 'filled-case'],
    ['3280 + 670 三角币', 'filled-case'],
    ['6480 + 1620 三角币', 'supply-crates'],
    ['12960 + 3240 三角币', 'supply-crates'],
    ['19440 + 4860 三角币', 'supply-crates']
  ])],
  ['garena-delta-force', new Map([
    ['60 Delta Coin', 'delta-coin'],
    ['300 + 20 Delta Coin', 'delta-coin'],
    ['420 + 40 Delta Coin', 'delta-coin'],
    ['680 + 70 Delta Coin', 'delta-coin'],
    ['1280 + 200 Delta Coin', 'delta-coin'],
    ['1680 + 300 Delta Coin', 'delta-coin'],
    ['3280 + 670 Delta Coin', 'delta-coin'],
    ['6480 + 1620 Delta Coin', 'delta-coin'],
    ['12960 + 3888 Delta Coin', 'delta-coin'],
    ['19440 + 5832 Delta Coin', 'delta-coin']
  ])],
  ['monster-hunter-outlanders', new Map([
    ['60 赤翎币', 'crimson-crest-coin'],
    ['300 赤翎币', 'crimson-crest-coin'],
    ['980 赤翎币', 'crimson-crest-coin'],
    ['1280 赤翎币', 'crimson-crest-coin'],
    ['1980 赤翎币', 'crimson-crest-coin'],
    ['3280 赤翎币', 'crimson-crest-coin'],
    ['6480 赤翎币', 'crimson-crest-coin']
  ])],
  // LTGAMES lists Sword x Staff amounts including bonuses.
  ['zhang-jian-chuan-shuo', new Map([
    ['299 + 15 代金券', '314'],
    ['999 + 40 代金券', '1039'],
    ['1499 + 60 代金券', '1559'],
    ['1999 + 100 代金券', '2099'],
    // Nearby voucher art approved for amounts absent from the top-up center.
    ['2999 + 140 代金券', '2099'],
    ['4999 + 250 代金券', '10499'],
    ['9999 + 500 代金券', '10499'],
    ['29999 + 1500 代金券', '31499'],
    ['特惠技能礼包', 'skill-pack'],
    ['特惠遗物礼包', 'auroral-pack'],
    ['特惠幻兽礼包', 'fantomon-pack']
  ])],
  ['wen-jian-chang-sheng', new Map([
    ['499 代金券', '499'],
    ['999 代金券', '999'],
    ['1,999 代金券', '1999'],
    ['2,998 代金券', '1999'],
    ['4,999 代金券', '4999'],
    ['9,999 代金券', '9999'],
    ['19,999 代金券', '19999'],
    ['29,999 代金券', '29999'],
    ['49,999 代金券', '49999'],
    ['99,998 代金券', '99999']
  ])],
  ['genshin', new Map([
    ['60 创世结晶', '60'],
    ['300 + 30 创世结晶', '300'],
    ['980 + 110 创世结晶', '980'],
    ['1980 + 260 创世结晶', '1980'],
    ['3280 + 600 创世结晶', '3280'],
    ['6480 + 1600 创世结晶', '6480'],
    ['空月祝福', 'welkin'],
    ['珍珠纪行', 'hymn'],
    ['珍珠之歌', 'chorus'],
    ['60 - 6480 一条龙', 'full-bundle']
  ])],
  ['honkai-star-rail', new Map([
    ['60 古老梦华', '60'],
    ['300 + 30 古老梦华', '300'],
    ['980 + 110 古老梦华', '980'],
    ['1980 + 260 古老梦华', '1980'],
    ['3280 + 600 古老梦华', '3280'],
    ['6480 + 1600 古老梦华', '6480'],
    ['60 - 6480 一条龙', 'full-bundle'],
    ['列车补给凭证', 'pass'],
    ['无名客的奖章', 'medal']
  ])],
  ['zenless-zone-zero', new Map([
    ['60 菲林底片', '60'],
    ['300 + 30 菲林底片', '300'],
    ['980 + 110 菲林底片', '980'],
    ['1980 + 260 菲林底片', '1980'],
    ['3280 + 600 菲林底片', '3280'],
    ['6480 + 1600 菲林底片', '6480'],
    ['绳网会员', 'membership'],
    // Artwork cropped from the in-game New Eridu City Fund cards.
    ['成长计划', 'growth-plan'],
    ['典藏计划', 'premium-plan']
  ])],
  ['identity-v', new Map([
    // Match the three package names in SEAGM's Identity V global catalog.
    ['灵感礼包', 'inspirations'],
    ['线索礼包', 'clues'],
    ['珍宝礼包', 'memory-sphere'],
    ['60 + 6 回声', '60'],
    ['185 + 18 回声', '185'],
    ['305 + 30 回声', '305'],
    ['690 + 69 回声', '690'],
    ['2025 + 202 回声', '2025'],
    ['3330 + 333 回声', '3330'],
    ['6590 + 659 回声', '6590']
  ])],
  ['mobile-legends', new Map([
    ['254 + 30 Diamond', '284'],
    ['317 + 38 Diamond', '355'],
    ['383 + 46 Diamond', '429'],
    ['633 + 83 Diamond', '716'],
    ['1252 + 194 Diamond', '1446'],
    ['2501 + 475 Diamond', '2976'],
    ['Weekly Diamond Pass', 'weekly-pass'],
    ['Twilight Pass', 'twilight-pass'],
    // Codashop Malaysia pack art. Reuse the large diamond chest for the two larger tiers.
    ['5002 + 950 Diamond', '8928'],
    ['7503 + 1425 Diamond', '8928'],
    ['Weekly Limited Elite Bundle', 'weekly-limited'],
    ['Monthly Limited Epic Bundle', 'monthly-limited']
  ])],
  ['wuthering-waves', new Map([
    ['60 月相', '60'],
    ['300 + 30 月相', '300'],
    ['980 + 110 月相', '980'],
    ['1980 + 260 月相', '1980'],
    ['3280 + 600 月相', '3280'],
    ['6480 + 1600 月相', '6480'],
    ['月相观测卡', 'subscription'],
    // In-game item icons indexed by Wuthering.gg.
    ['寰宇频道', 'insider-channel'],
    ['寰宇特约', 'connoisseur-channel']
  ])],
  ['pubg-mobile', new Map([
    ['60 UC', '60'],
    ['300 + 25 UC', '300'],
    ['600 + 60 UC', '600'],
    ['1500 + 300 UC', '1500'],
    ['3000 + 850 UC', '3000'],
    ['6000 + 2100 UC', '6000'],
    ['12000 + 4200 UC', '6000'],
    ['18000 + 6300 UC', '6000'],
    // Midasbuy PH uses the same Prime / Prime Plus crowns for monthly and annual memberships.
    ['普通会员 1 月', 'prime-membership'],
    ['普通会员 12 月', 'prime-membership'],
    ['高级会员 1 月', 'prime-plus-membership'],
    ['高级会员 12 月', 'prime-plus-membership']
  ])],
  ['honor-of-kings-global', new Map([
    ['80 点券', '80'],
    ['240 点券', '240'],
    ['400 点券', '400'],
    ['560 点券', '560'],
    // Match the official artwork by base pack; keep our listed totals intact.
    ['830 点券', '800'],
    ['1245 点券', '1200'],
    ['2508 点券', '2400'],
    ['4180 点券', '4000'],
    ['8360 点券', '8000']
  ])],
  ['garena-free-fire', new Map([
    ['25 钻石', 'garena-diamond'],
    ['100 钻石', 'garena-diamond'],
    ['310 钻石', 'garena-diamond'],
    ['520 钻石', 'garena-diamond'],
    ['1,060 钻石', 'garena-diamond'],
    ['2,180 钻石', 'garena-diamond'],
    ['5,600 钻石', 'garena-diamond'],
    ['11,500 钻石', 'garena-diamond'],
    ['周卡', 'weekly-membership'],
    ['月卡', 'monthly-membership'],
    ['小周卡', 'weekly-lite']
  ])]
]);

// View boxes in source artwork; exclude surrounding whitespace, captions and neighboring items.
const pokeGoldReference = { image: 'poke-gold-reference.png', width: 1149, height: 844 };
const compactProductReferenceCrops = new Map([
  ['honkai-star-rail:无名客的荣勋', { image: 'nameless-honor-reference.png', width: 600, height: 250, viewBox: '209 11 190 190' }],
  // The publisher screenshots are used only for their item art, not the reference prices or bonuses.
  ...[
    ['3000 + 108 点券', 'a', '73 94 27 24'],
    ['6800 + 288 点券', 'a', '216 94 43 24'],
    ['12800 + 588 点券', 'a', '69 226 35 24'],
    ['19800 + 1088 点券', 'a', '221 223 34 30'],
    ['32800 + 1788 点券', 'a', '71 354 34 30'],
    ['64800 + 3588 点券', 'a', '222 352 34 33'],
    ['89800 + 4973 点券', 'b', '69 149 35 34'],
    ['129800 + 7190 点券', 'b', '222 149 35 34'],
    ['199800 + 11068 点券', 'b', '69 279 35 34']
  ].map(([title, sheet, viewBox]) => [`jin-chan-chan:${title}`, {
    path: `assets/images/games/tencent-topup/jin-chan-chan-reference-${sheet}.png`, width: 326, height: 450, viewBox
  }]),
  ...[
    ['60 星钻', '728 124 146 140'],
    ['300 星钻 赠送 22', '1035 133 156 133'],
    ['680 星钻 赠送 55', '1341 134 151 132'],
    ['1180 星钻 赠送 105', '415 477 160 134'],
    ['1980 星钻 赠送 180', '726 478 162 133'],
    ['3480 星钻 赠送 328', '1036 476 159 135'],
    ['6480 星钻 赠送 700', '1340 477 155 138']
  ].map(([title, viewBox]) => [`yuanmeng-zhixing:${title}`, {
    path: 'assets/images/games/tencent-topup/yuanmeng-zhixing-tier-reference.png', width: 1920, height: 919, viewBox
  }]),
  ...[
    ['30 + 1 礼券', '167 329 39 34'], ['60 + 2 礼券', '248 329 42 34'],
    ['90 + 4 礼券', '326 329 47 34'], ['150 + 7 礼券', '407 328 46 36'],
    ['300 + 14 礼券', '162 438 48 36'], ['450 + 22 礼券', '243 438 50 37'],
    ['600 + 30 礼券', '324 438 52 37'], ['900 + 45 礼券', '407 438 49 37'],
    ['1500 + 75 礼券', '160 546 54 38'], ['3000 + 150 礼券', '243 546 50 38']
  ].map(([title, viewBox]) => [`ragnarok-go:${title}`, {
    image: 'official-voucher-reference.png', width: 597, height: 703, viewBox
  }]),
  // Pokémon GO Web Store's XL PokéCoin art; the store-only bonus is not part of our listing.
  ['pokemon-go:14500 金币', { image: 'pokecoin-cart.webp', width: 384, height: 384, viewBox: '0 63 384 304' }],
  // Codashop Malaysia uses one VP mark for all six tiers. Give the dark mark a readable backing.
  ...[475, 1000, 2050, 3650, 5350, 11000].map(amount => [
    `valorant:${amount} VP`, { image: 'vp.png', width: 150, height: 150, viewBox: '23 23 104 104', lightBacking: true }
  ]),
  // The supplied store reference uses the same voucher art for all six tiers.
  ...['68 + 7 金券', '98 + 12 金券', '128 + 20 金券', '198 + 32 金券', '328 + 62 金券', '648 + 142 金券']
    .map(title => [`shan-jiang-sanguo:${title}`, { image: 'voucher-reference.png', width: 533, height: 705, viewBox: '80 32 90 90' }]),
  // Official Android top-up guide (towerofsaviors.com): crop only the blue Magic Stone art, not prices or offers.
  ...[
    [1, '80 286 130 126'],
    [6, '269 286 144 126'],
    [15, '461 282 152 130'],
    [30, '69 586 150 147'],
    [60, '266 586 152 150'],
    [90, '461 587 157 151'],
    [150, '62 902 166 151']
  ].map(([amount, viewBox]) => [`tower-of-saviors:${amount} 魔法石`, { image: 'official-magic-stone-shop.jpeg', width: 685, height: 1600, viewBox }]),
  // Aniimo's official storefront artwork has transparent padding for its tall cards.
  ...[
    ['60 + 6 辉晶', '60', '32 40 53 54'],
    ['300 + 30 辉晶', '300', '26 34 65 62'],
    ['980 + 98 辉晶', '980', '24 24 76 70'],
    ['1980 + 198 辉晶', '1980', '17 25 76 73'],
    ['3280 + 328 辉晶', '3280', '23 25 77 74'],
    ['6480 + 648 辉晶', '6480', '24 23 80 76'],
    ['月度之证', 'monthly', '31 31 62 55'],
    ['进阶版同行手册', 'advanced-pass', '34 27 55 57'],
    ['典藏版同行手册', 'collector-pass', '32 28 54 57']
  ].map(([title, file, viewBox]) => [`aniimo:${title}`, { image: `${file}.png`, width: 121, height: 160, viewBox }]),
  // The reference starts at 25; use the plain gold-bar art for the smallest two tiers.
  ['pokemon-tcg-pocket:5 Poké Gold', { ...pokeGoldReference, viewBox: '111 52 187 153' }],
  ['pokemon-tcg-pocket:25 + 1 Poké Gold', { ...pokeGoldReference, viewBox: '111 52 187 153' }],
  ['pokemon-tcg-pocket:50 + 7 Poké Gold', { ...pokeGoldReference, viewBox: '367 51 168 154' }],
  ['pokemon-tcg-pocket:100 + 20 Poké Gold', { ...pokeGoldReference, viewBox: '608 38 180 167' }],
  ['pokemon-tcg-pocket:200 + 50 Poké Gold', { ...pokeGoldReference, viewBox: '843 41 188 164' }],
  ['pokemon-tcg-pocket:500 + 190 Poké Gold', { ...pokeGoldReference, viewBox: '112 463 185 164' }]
]);

// Full-bundle thumbnails combine the game's own currency art. They are not separate store SKUs.
const compactBundleArtwork = new Map([
  ['zenless-zone-zero:60 - 6480 一条龙', ['60', '980', '6480']],
  ['wuthering-waves:60 - 6480 一条龙', ['60', '980', '6480']]
]);

// Keep the listing/issuer with each local fallback asset so variants remain auditable.
const compactOfficialAppArtwork = new Set([
  'age-of-empires-mobile', // https://apps.apple.com/my/app/id6476261995
  'aniimo', // https://apps.apple.com/my/app/id6759098797
  'arena-breakout', // https://apps.apple.com/my/app/id1560765304
  'arknights-endfield', // https://apps.apple.com/my/app/id6752642477
  'astral-guardians-cyber-fantasy', // https://play.google.com/store/apps/details?id=com.eyougame.idxj
  'crystal-of-atlan', // https://apps.apple.com/my/app/id6453111576
  'dark-war-survival', // https://apps.apple.com/my/app/id6670441558
  'ddtank-origin-malaysia', // https://apps.apple.com/my/app/id1602657241
  'delta-force-cn', // https://apps.apple.com/cn/app/id1642894547
  'delta-force-global-pc', // https://steamcommunity.com/app/2507950
  'douluo-liehun-shijie', // https://apps.apple.com/tw/app/id6738236172
  'dragon-nest-m-classic', // https://apps.apple.com/my/app/id6743824718
  'garena-codm', // https://apps.apple.com/my/app/id1465688043
  'garena-delta-force', // https://apps.apple.com/my/app/id6670604287
  'garena-free-fire', // https://apps.apple.com/my/app/id1300146617
  'goddess-of-victory-nikke', // https://apps.apple.com/my/app/id1585915174
  'heartopia', // https://apps.apple.com/my/app/id6746151928
  'honkai-star-rail', // https://apps.apple.com/my/app/id1599719154
  'huoying-renzhe', // https://apps.apple.com/cn/app/id955396648
  'identity-v', // https://apps.apple.com/my/app/id1347780764
  'jianxia-qingyuan', // https://apps.apple.com/tw/app/id1132435921
  'kai-tian', // https://apps.apple.com/tw/app/id6745874605
  'kingshot', // https://apps.apple.com/my/app/id6739554056
  'lands-of-jails', // https://apps.apple.com/my/app/id6738469826
  'last-war-survival', // https://apps.apple.com/my/app/id6448786147
  'legends-of-mushroom', // https://apps.apple.com/my/app/id6473259128
  'mobile-legends', // https://apps.apple.com/my/app/id1160056295
  'monster-hunter-outlanders', // https://apps.apple.com/my/app/id6763262759
  'neverness-to-everness', // https://apps.apple.com/my/app/id6754593077
  'ni-shui-han-tw', // https://apps.apple.com/tw/app/id6474654939
  'one-punch-man-the-strongest', // https://apps.apple.com/my/app/id1491275510
  'peace-elite', // https://apps.apple.com/cn/app/id1321803705
  'perfect-world-w', // https://apps.apple.com/tw/app/id6472643035
  'pokemon-go', // https://apps.apple.com/my/app/id1094591345
  'pokemon-tcg-pocket', // https://apps.apple.com/my/app/id6479970832
  'pubg-mobile', // https://apps.apple.com/my/app/id1330123889
  'ragnarok-go', // https://apps.apple.com/my/app/id6805760478
  'ragnarok-origin-classic', // https://apps.apple.com/my/app/id6754158504
  'rf-online-next', // https://apps.apple.com/tw/app/id6740848451
  'ro-the-new-world', // https://apps.apple.com/my/app/id6754275005
  'roblox', // https://apps.apple.com/my/app/id431946152
  'shan-jiang-sanguo', // https://apps.apple.com/my/app/id6760284438
  'sword-of-justice', // https://apps.apple.com/my/app/id6743792504
  'three-kingdoms-tactics', // https://apps.apple.com/my/app/id1529832759
  'tian-long-ba-bu', // https://apps.apple.com/tw/app/id1610264268
  'tower-of-saviors', // https://apps.apple.com/my/app/id583798880
  'valorant', // https://playvalorant.com/en-us/download/
  'wen-jian-chang-sheng', // https://apps.apple.com/tw/app/id6744726523
  'where-winds-meet', // https://apps.apple.com/my/app/id6472396866
  'whiteout-survival', // https://apps.apple.com/my/app/id6443575749
  'wuthering-waves', // https://apps.apple.com/my/app/id6475033368
  'wuwei-qiyue', // https://apps.apple.com/cn/app/id6535673811
  'x-hero-epic-hero', // https://apps.apple.com/my/app/id1478697636
  'yulgang-w', // https://play.google.com/store/apps/details?id=com.efun.aerxjhw.sea
  'zenless-zone-zero', // https://apps.apple.com/my/app/id1606356401
  'zhang-jian-chuan-shuo', // https://apps.apple.com/tw/app/id6504542886
  'zhen-de-jiang-shan', // https://apps.apple.com/tw/app/id1139683379
  'zombie-wave', // https://apps.apple.com/my/app/id6443760593
]);

// Last-resort placeholder for a future game without a verified App icon.
const compactCurrencyHues = new Map([
  ['honkai-star-rail', 303], ['zenless-zone-zero', 276], ['wuthering-waves', 202],
  ['aniimo', 182], ['monster-hunter-outlanders', 340], ['roblox', 191],
  ['pubg-mobile', 43], ['garena-codm', 42], ['valorant', 351],
  ['delta-force-global-pc', 157], ['garena-delta-force', 157]
]);

function compactProductArtKind(title, sectionTitle) {
  if (/一条龙|full bundle/i.test(title)) return 'bundle';
  if (/礼包|组合包|\bbundle\b|\bpackage\b|\bpack\b/i.test(title)) return 'bundle';
  if (/月卡|周卡|会员|特权|凭证|月度|观测卡|月令|易货卡|membership|subscription|weekly|monthly|privilege/i.test(title)) return 'membership';
  if (/战令|纪行|手册|通行证|荣勋|奖章|成长计划|典藏计划|寰宇|猎人补给|\bpass\b/i.test(title)) return 'pass';
  if (/券|底片|\b(vp|cp|uc|coupon|voucher|monochrome|ticket)\b/i.test(title)) return 'ticket';
  if (/币|金币|海神币|欧泊币|\b(gold|coin|coins|robux|bonds)\b/i.test(title)) return 'coin';
  return /礼包|bundle|package/i.test(sectionTitle) ? 'bundle' : 'gem';
}

function makeCompactProductSketch(gameId, kind, tier) {
  const hue = compactCurrencyHues.get(gameId)
    ?? ([...gameId].reduce((hash, ch) => (hash * 31 + ch.charCodeAt(0)) % 360, 42));
  const light = `hsl(${hue} 88% 75%)`;
  const mid = `hsl(${hue} 70% 52%)`;
  const dark = `hsl(${hue} 73% 28%)`;
  const ink = '#161924';
  const gem = `<path d="M12 2 22 11 12 24 2 11Z" fill="${mid}" stroke="${light}" stroke-width="1.4"/><path d="m12 2 4 9-4 13-4-13Z" fill="${light}"/><path d="M2 11h20L12 24Z" fill="${dark}" opacity=".5"/>`;
  const coin = `<ellipse cx="12" cy="13" rx="9" ry="8" fill="${dark}"/><ellipse cx="12" cy="11" rx="9" ry="8" fill="${mid}" stroke="${light}" stroke-width="1.5"/><path d="m12 7 3 4-3 4-3-4Z" fill="${light}"/>`;
  const ticket = `<path d="M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4Z" fill="${mid}" stroke="${light}" stroke-width="1.4"/><path d="M8 8v8m4-6h5m-5 4h3" stroke="${light}" stroke-width="1.2" stroke-linecap="round"/>`;
  const chest = `<path d="M6 15 9 10h18l3 5v5H6Z" fill="${mid}" stroke="${light}" stroke-width="1.5"/><path d="M7 20h22v9H7Z" fill="${dark}" stroke="${light}" stroke-width="1.5"/><path d="M15 18h6v6h-6z" fill="#ffd488" stroke="${ink}"/>`;
  let art;
  if (kind === 'bundle') {
    art = `<g transform="translate(10 1) scale(.65)">${gem}</g><g transform="translate(19 2) scale(.55)">${gem}</g>${chest}`;
  } else if (kind === 'membership' || kind === 'pass') {
    const mark = kind === 'membership'
      ? '<path d="M13 19h10m-10 4h6M13 15h10" stroke="#ffe0a1" stroke-width="1.5" stroke-linecap="round"/>'
      : '<path d="m18 12 2 4 4 .5-3 3 .8 4.5-3.8-2-3.8 2 .8-4.5-3-3 4-.5Z" fill="#ffe0a1"/>';
    art = `<path d="M9 8h18v21H9Z" fill="${dark}" stroke="${light}" stroke-width="1.5"/><path d="M11 7h14v4H11Z" fill="${mid}"/>${mark}`;
  } else {
    const item = kind === 'coin' ? coin : kind === 'ticket' ? ticket : gem;
    art = tier === 4 ? `<g transform="translate(12 0) scale(.6)">${item}</g>${chest}`
      : tier === 3 ? `<g transform="translate(18 6) scale(.65)">${item}</g><g transform="translate(2 5) scale(.68)">${item}</g><g transform="translate(8 9) scale(.86)">${item}</g>`
      : tier === 2 ? `<g transform="translate(14 5) scale(.76)">${item}</g><g transform="translate(3 8) scale(.86)">${item}</g>`
      : `<g transform="translate(6 6)">${item}</g>`;
  }
  const label = isEnglishLanguage() ? 'Product illustration · not official artwork' : '商品示意图 · 非官方原图';
  return `<span class="compact-product-icon compact-product-sketch" title="${label}" aria-hidden="true"><svg width="32" height="32" viewBox="0 0 36 36" focusable="false">${art}</svg></span>`;
}

function makeCompactProductIcon(gameId, titleZh, illustration, fallback = null) {
  const platformIcon = compactLiveArtwork.get(gameId);
  if (platformIcon) {
    return `<span class="compact-product-icon compact-game-icon" aria-hidden="true"><img src="assets/images/games/${platformIcon}" alt="" width="38" height="38" loading="lazy" decoding="async"></span>`;
  }
  if (gameId === 'china-apple-gift-card') {
    // Apple Account and Apple China's gift card page show distinct artwork.
    const image = titleZh.includes('Apple ID')
      ? '<img src="assets/images/games/apple-card-products/apple-account.webp" alt="" width="38" height="38" loading="lazy" decoding="async">'
      : '<svg width="32" height="32" viewBox="48 56 55 36" focusable="false"><image href="assets/images/games/apple-card-products/app-store-card.webp" width="150" height="111"></image></svg>';
    return `<span class="compact-product-icon compact-game-icon compact-item-art" aria-hidden="true">${image}</span>`;
  }
  const sku = titleZh.match(/^(\d+)(?:\s*\+\s*\d+)?\s*(点券|金币|三角币|洛克钻|星钻|璇晶)(?:\s|$)/);
  const key = sku ? sku[1] + sku[2] : '';
  const bundleArt = compactBundleArtwork.get(`${gameId}:${titleZh}`);
  if (bundleArt) {
    const slots = [[1, 0, 18], [15, 2, 18], [6, 12, 25]];
    const images = bundleArt.map((file, index) => {
      const [x, y, size] = slots[index];
      const image = `assets/images/games/${gameId}-products/${file}.png`;
      return `<image href="${escapeAttribute(image)}" x="${x}" y="${y}" width="${size}" height="${size}"></image>`;
    }).join('');
    const caption = isEnglishLanguage() ? 'Store bundle illustration' : '店内套餐配图';
    return `<span class="compact-product-icon compact-game-icon compact-item-art" title="${escapeAttribute(caption)}" aria-hidden="true"><svg width="34" height="34" viewBox="0 0 36 38" focusable="false">${images}</svg></span>`;
  }
  const illustrated = illustration ? ` data-special-art="${escapeAttribute(illustration)}"` : '';
  const itemArt = compactItemArtwork.get(gameId)?.get(titleZh);
  const reference = compactProductReferenceCrops.get(`${gameId}:${titleZh}`);
  if (reference && !illustration) {
    const image = reference.path ?? `assets/images/games/${gameId}-products/${reference.image}`;
    const [x, y, w, h] = reference.viewBox.split(' ').map(Number);
    const scale = 34 / Math.max(w, h);
    const backing = reference.lightBacking ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#f2ece1"></rect>` : '';
    return `<span class="compact-product-icon compact-game-icon compact-item-art" aria-hidden="true"><svg width="${(w * scale).toFixed(3)}" height="${(h * scale).toFixed(3)}" viewBox="${reference.viewBox}" focusable="false">${backing}<image href="${escapeAttribute(image)}" width="${reference.width}" height="${reference.height}"></image></svg></span>`;
  }
  if (itemArt && !illustration) {
    const image = `assets/images/games/${gameId}-products/${itemArt}.png`;
    // LTGAMES cards contain channel-specific bonuses; show only the item artwork.
    const ltCrop = gameId === 'wen-jian-chang-sheng' ? ['21 29 102 69', 23]
      : gameId === 'zhang-jian-chuan-shuo' ? (itemArt.endsWith('-pack') ? ['18 14 108 76', 24] : ['8 17 128 94', 25]) : null;
    if (ltCrop) {
      return `<span class="compact-product-icon compact-game-icon compact-item-art" aria-hidden="true"><svg width="34" height="${ltCrop[1]}" viewBox="${ltCrop[0]}" focusable="false"><image href="${escapeAttribute(image)}" width="144" height="144"></image></svg></span>`;
    }
    const storeIllustration = (gameId === 'honkai-star-rail' && itemArt === 'full-bundle')
      || (gameId === 'pokemon-tcg-pocket' && itemArt === 'gift-box-gold');
    const caption = storeIllustration ? (isEnglishLanguage() ? 'Store bundle illustration' : '店内套餐配图') : '';
    return `<span class="compact-product-icon compact-game-icon compact-item-art" aria-hidden="true"${caption ? ` title="${escapeAttribute(caption)}"` : ''}><img src="${escapeAttribute(image)}" alt="" width="38" height="38" loading="lazy" decoding="async"></span>`;
  }
  if ((fallback || illustration) && compactOfficialAppArtwork.has(gameId)) {
    const image = `assets/images/games/app-icons/${gameId}.webp`;
    const caption = isEnglishLanguage() ? 'Game app icon' : '游戏官方图标';
    return `<span class="compact-product-icon compact-game-icon" title="${caption}" aria-hidden="true"><img src="${escapeAttribute(image)}" alt="" width="38" height="38" loading="lazy" decoding="async"></span>`;
  }
  if (!illustration && fallback) return makeCompactProductSketch(gameId, fallback.kind, fallback.tier);
  return `<span class="compact-product-icon" data-token-sku="${key}"${illustrated} aria-hidden="true"></span>`;
}

function makeProductCard(product, gameId = '', section = null, sectionKey = '', cardContext = {}) {
  const resolvedProduct = resolveProductPrice(product);
  const titleZh = resolvedProduct.title || '';
  const titleEn = englishProductTitle(gameId, resolvedProduct);
  const title = localizedProductTitle(gameId, resolvedProduct);
  const sectionZh = cardContext.sectionZh ?? section?.title ?? '';
  const sectionEn = cardContext.sectionEn ?? (section ? englishSectionTitle(section) : '');
  const sectionTitle = isEnglishLanguage() ? sectionEn : sectionZh;
  const subtitle = isEnglishLanguage() ? localizedProductNote(resolvedProduct) : titleEn;
  const price = resolvedProduct.price || '';
  const displayPrice = formatPriceForCurrency(price);
  const cartKey = getProductCartKey(resolvedProduct, sectionKey);
  const status = getProductStatus(resolvedProduct);
  const systemValue = cardContext.systemValue || getSectionSystemValue(section);
  const isUnavailable = status === 'paused' || status === 'soldout';
  const actionLabel = status === 'inquiry'
    ? uiText('product.inquiryAria', { title })
    : uiText('product.addAria', { title, price: displayPrice });
  const statusBadge = status === 'active'
    ? ''
    : `<span class="product-status-badge">${escapeHtml(uiText(`product.status.${status}`))}</span>`;
  const actionIndicator = status === 'active'
    ? '<span class="product-card-action" data-product-action-indicator aria-hidden="true">＋</span>'
    : '';
  const compact = cardContext.compact;
  const illustration = compact && compactProductIllustrations.get(`${gameId}:${titleZh}`);
  const tokenParts = compact && ['honor-of-kings-cn', 'peace-elite'].includes(gameId)
    && titleZh.match(/^(\d+) 点券(?: 赠送 (\d+))?$/);
  const starParts = compact && gameId === 'yuanmeng-zhixing'
    && titleZh.match(/^(\d+) 星钻(?: 赠送 (\d+))?$/);
  let cardTitle = title;
  let cardDetail = subtitle;
  if (tokenParts) {
    const [, amount, bonus] = tokenParts;
    cardTitle = `${amount} ${isEnglishLanguage() ? 'Tokens' : '点券'}`;
    cardDetail = bonus ? (isEnglishLanguage() ? `Bonus +${bonus}` : `额外赠送 +${bonus} 点券`) : '';
  } else if (starParts) {
    const [, amount, bonus] = starParts;
    const base = Number(amount).toLocaleString('en-MY');
    cardTitle = `${base} ${isEnglishLanguage() ? 'Star Diamonds' : '星钻'}`;
    cardDetail = bonus ? (isEnglishLanguage() ? `${base} + ${bonus} bonus` : `${base} + 赠送 ${bonus}`) : '';
  } else if (gameId === 'wangzhe-rongyao-shijie' && resolvedProduct.officialJingpoBonus) {
    const bonus = resolvedProduct.officialJingpoBonus;
    cardDetail = isEnglishLanguage()
      ? `Official offer: +${bonus} Jingpo, subject to official checkout`
      : `官方标注：赠 ${bonus} 晶珀（以官方结算为准）`;
  }
  if (compact && gameId === 'honkai-star-rail' && titleZh === '60 - 6480 一条龙') {
    cardDetail = isEnglishLanguage() ? 'Oneiric Shards · All 6 tiers (60–6480)' : '古老梦华 · 60 至 6480 六档组合';
  } else if (compact && /一条龙|full bundle/i.test(titleZh)
      && (compactItemArtwork.get(gameId)?.get(titleZh) === 'full-bundle'
        || (cardContext.sketch && !compactOfficialAppArtwork.has(gameId)))) {
    cardDetail = isEnglishLanguage() ? 'Bundle illustration · not official artwork' : '组合包示意图 · 非官方原图';
  } else if (illustration && !compactOfficialAppArtwork.has(gameId)) {
    cardDetail = isEnglishLanguage() ? 'Illustration · not official artwork' : '商品示意图 · 非官方原图';
  }
  const cardCopy = `<h3>${escapeHtml(cardTitle)}</h3>${!compact || cardDetail ? `<p>${escapeHtml(cardDetail)}</p>` : ''}`;

  if (resolvedProduct.tieredExchangeAmount) {
    const tiers = Array.isArray(resolvedProduct.exchangeTiers) ? resolvedProduct.exchangeTiers : [];
    const exchangeHeading = compact
      ? `<div class="compact-exchange-heading">${makeCompactProductIcon(gameId, titleZh, illustration)}<div class="compact-product-copy">${cardCopy}</div></div>`
      : `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(subtitle)}</p>`;
    return `
      <article class="product-card tiered-exchange-card" data-tiered-exchange-card data-game-id="${escapeAttribute(gameId)}" data-section-key="${escapeAttribute(sectionKey)}" data-section-zh="${escapeAttribute(sectionZh)}" data-section-en="${escapeAttribute(sectionEn)}" data-coin-rate="${escapeAttribute(resolvedProduct.coinRate || 1)}" data-coin-name-zh="${escapeAttribute(resolvedProduct.coinNameZh || '')}" data-coin-name-en="${escapeAttribute(resolvedProduct.coinNameEn || '')}" data-exchange-tiers="${escapeAttribute(JSON.stringify(tiers))}">
        ${exchangeHeading}
        <label class="custom-amount-field">
          <span>${escapeHtml(uiText('product.exchangeAmountLabel'))}</span>
          <span class="custom-amount-input-wrap"><b>¥</b><input type="number" min="1" step="1" inputmode="numeric" data-exchange-amount-input placeholder="${escapeAttribute(uiText('product.exchangeAmountPlaceholder'))}" aria-label="${escapeAttribute(uiText('product.exchangeAmountLabel'))}"></span>
        </label>
        <div class="custom-amount-preview exchange-amount-preview" data-exchange-amount-preview>${escapeHtml(uiText('product.exchangeAmountEmpty'))}</div>
        ${resolvedProduct.coinNameZh ? '<div class="custom-amount-preview" data-exchange-coin-preview></div>' : ''}
        <button type="button" class="button button-primary custom-amount-action" data-exchange-amount-action>${escapeHtml(uiText('product.exchangeAction'))}</button>
      </article>`;
  }

  if (resolvedProduct.customAmount) {
    const coinRate = Number(resolvedProduct.coinRate || 1);
    const coinNameZh = resolvedProduct.coinNameZh || sectionZh || '';
    const coinNameEn = resolvedProduct.coinNameEn || sectionEn || coinNameZh;
    return `
      <article class="product-card product-status-inquiry custom-amount-card" data-custom-amount-card data-coin-rate="${escapeAttribute(coinRate)}" data-coin-name-zh="${escapeAttribute(coinNameZh)}" data-coin-name-en="${escapeAttribute(coinNameEn)}">
        <div class="custom-amount-heading">
          ${statusBadge}
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(subtitle)}</p>
        </div>
        <label class="custom-amount-field">
          <span>${escapeHtml(uiText('product.customAmountLabel'))}</span>
          <span class="custom-amount-input-wrap"><b>¥</b><input type="number" min="0.01" step="0.01" inputmode="decimal" data-custom-amount-input placeholder="${escapeAttribute(uiText('product.customAmountPlaceholder'))}" aria-label="${escapeAttribute(uiText('product.customAmountLabel'))}"></span>
        </label>
        <div class="custom-amount-result">
          <div class="custom-amount-preview" data-custom-amount-preview>${escapeHtml(uiText('product.customAmountEmpty'))}</div>
          <button type="button" class="button button-primary custom-amount-action" data-custom-amount-action>${escapeHtml(uiText('product.customAmountAction'))}</button>
        </div>
      </article>`;
  }

  return `
    <article class="product-card product-status-${escapeAttribute(status)}" role="button" tabindex="${isUnavailable ? '-1' : '0'}" data-product-status="${escapeAttribute(status)}" data-cart-key="${escapeAttribute(cartKey)}" data-title="${escapeAttribute(title)}" data-title-zh="${escapeAttribute(titleZh)}" data-title-en="${escapeAttribute(titleEn)}" data-section-key="${escapeAttribute(sectionKey)}" data-section-title="${escapeAttribute(sectionTitle)}" data-section-zh="${escapeAttribute(sectionZh)}" data-section-en="${escapeAttribute(sectionEn)}" data-system-value="${escapeAttribute(systemValue)}" data-price="${escapeAttribute(price)}" data-add-aria="${escapeAttribute(actionLabel)}" aria-label="${escapeAttribute(actionLabel)}"${isUnavailable ? ' aria-disabled="true"' : ''}>
      ${compact ? `${makeCompactProductIcon(gameId, titleZh, illustration, cardContext.sketch)}<div class="compact-product-copy">${statusBadge}${cardCopy}</div>` : `${statusBadge}${cardCopy}`}
      <div class="product-price" data-price-base="${escapeAttribute(price)}">${escapeHtml(displayPrice)}</div>
      ${actionIndicator}
    </article>`;
}

function makeProductSections(game, platformOverride = '') {
  const compact = compactProductGameIds.has(game.id);
  const international = internationalProductGameIds.has(game.id);
  const allSections = resolveProductSections(game);
  const flatProducts = compact && !allSections.length && (game.products || []).length > 0;
  if (flatProducts) {
    allSections.push({ title: '充值商品', subtitle: 'Top-up products', products: game.products.map(resolveProductPrice) });
  }
  const usesPlatformSelector = hasGamePlatformSelector(game);
  const selectedPlatform = usesPlatformSelector
    ? normalizeGamePlatform(platformOverride || getSelectedGamePlatform(game))
    : '';
  const selectorMarkup = usesPlatformSelector ? makeGamePlatformSelector(selectedPlatform) : '';

  if (usesPlatformSelector && !selectedPlatform) {
    return `${selectorMarkup}<div class="game-platform-empty"><span aria-hidden="true">!</span><p>${escapeHtml(uiText('game.platformEmpty'))}</p></div>`;
  }

  const sections = allSections
    .map((section, originalIndex) => ({ section, originalIndex }))
    .filter(({ section }) => !usesPlatformSelector || ['shared', selectedPlatform].includes(getSectionPlatform(section)));
  if (!sections.length) {
    const products = (game.products || []).map(resolveProductPrice);
    if (!products.length) {
      return `${selectorMarkup}<div class="cart-empty">${escapeHtml(uiText('game.noProducts'))}</div>`;
    }
    return `${selectorMarkup}<div class="product-grid">${products.map((product) => makeProductCard(product, game.id)).join('')}</div>`;
  }

  if (compact && !document.getElementById('compact-products-style')) {
    const stylesheet = document.createElement('link');
    stylesheet.id = 'compact-products-style';
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'compact-products-preview.css?v=13';
    document.head.append(stylesheet);
  }
  const sectionsMarkup = sections
    .map(({ section, originalIndex }, index) => {
      const sectionTitle = flatProducts ? (isEnglishLanguage() ? 'Top-up products' : '充值商品') : localizedSectionTitle(section);
      const sectionSubtitle = flatProducts ? '' : localizedSectionSubtitle(section);
      const sectionProducts = section.products || [];
      const customAmountProducts = sectionProducts.filter((product) => resolveProductPrice(product).customAmount);
      const regularProducts = sectionProducts.filter((product) => !resolveProductPrice(product).customAmount);
      const sectionKey = flatProducts ? '' : section.id || `${originalIndex + 1}-${section.title || 'items'}`;
      const sectionPlatform = getSectionPlatform(section);
      const selectedOption = gamePlatformOptions[selectedPlatform];
      const isSharedSection = usesPlatformSelector && sectionPlatform === 'shared' && selectedOption;
      const cardContext = {
        compact,
        systemValue: selectedOption?.systemValue || getSectionSystemValue(section),
        sectionZh: flatProducts ? '' : isSharedSection ? `${selectedOption.sectionZh} · ${section.title || ''}` : section.title || '',
        sectionEn: flatProducts ? '' : isSharedSection ? `${selectedOption.sectionEn} · ${englishSectionTitle(section)}` : englishSectionTitle(section)
      };
      const itemAmount = ({ title = '' }) => Number(title.match(/^([\d,]+(?:\.\d+)?)(?![\d,]|\s*[-–])/)?.[1].replace(/,/g, '')) || 0;
      const amounts = international ? [...new Set(regularProducts.map(itemAmount).filter(Boolean))].sort((a, b) => a - b) : [];
      const makeSectionCard = (product) => makeProductCard(
        product,
        game.id,
        flatProducts ? null : section,
        sectionKey,
        international ? {
          ...cardContext,
          sketch: {
            kind: compactProductArtKind(product.title || '', section.title || ''),
            tier: 1 + Math.floor(Math.max(0, amounts.indexOf(itemAmount(product))) * 3 / Math.max(1, amounts.length - 1))
          }
        } : cardContext
      );
      return `
      <div class="product-section${customAmountProducts.length ? ' product-section-has-custom-amount' : ''}"${compact ? ` id="compact-items-${index}" data-compact-section="${index}"${index ? ' hidden' : ''}` : ''}>
        <div class="product-section-header">
          <h3>
            <span class="product-section-main"><span class="product-section-icon">${section.icon || '◆'}</span>${escapeHtml(sectionTitle)}</span>
            ${sectionSubtitle ? `<span>${escapeHtml(sectionSubtitle)}</span>` : ''}
          </h3>
        </div>
        <div class="product-grid">
          ${regularProducts.map(makeSectionCard).join('')}
        </div>
        ${customAmountProducts.length
          ? `<div class="custom-amount-zone">${customAmountProducts.map(makeSectionCard).join('')}</div>`
          : ''}
      </div>`;
    })
    .join('');

  if (!compact) return `${selectorMarkup}${sectionsMarkup}`;
  const categoryLabel = isEnglishLanguage() ? 'Product categories' : '商品分类';
  const categoryButtons = sections.map(({ section }, index) => {
    const swift = usesPlatformSelector && getSectionPlatform(section) !== 'shared';
    const slow = usesPlatformSelector && (section.title || '').includes('慢充');
    const label = swift
      ? (isEnglishLanguage() ? 'Fast Top-Up' : '点券快充')
      : localizedSectionTitle(section);
    return `<button type="button" data-compact-section-tab="${index}" aria-controls="compact-items-${index}" aria-pressed="${index === 0}">
        <span class="compact-tab-icon" aria-hidden="true">${slow ? '◷' : swift ? 'ϟ' : '◆'}</span>
        <span>${escapeHtml(label)}</span>
        <span class="compact-tab-count" aria-hidden="true">${section.products?.length || 0}</span>
      </button>`;
  }).join('');
  return `${selectorMarkup}<div class="compact-products${sections.length === 1 ? ' compact-products-single' : ''}${international ? ' compact-products-international' : ''}" data-compact-game="${escapeAttribute(game.id)}">
    ${sections.length > 1 ? `<nav class="compact-products-categories" aria-label="${categoryLabel}">
      <div class="compact-category-heading">${categoryLabel}</div>${categoryButtons}
    </nav>` : ''}
    <div class="compact-products-content">${sectionsMarkup}</div>
  </div>`;
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

  const directoryTitle = document.getElementById('gameDirectoryTitle');
  if (directoryTitle) {
    directoryTitle.textContent = !showAll
      ? uiText('home.directoryFeatured')
      : uiText(filterCategory === 'all' ? 'home.directoryAll' : 'home.directoryFiltered', {
        count: gamesToShow.length
      });
  }

  const showAllButton = document.getElementById('showAllGamesButton');

  if (showAllButton) {
    showAllButton.textContent = showAll ? uiText('home.showLess') : uiText('home.showAll');
  }

  renderHomeCategoryFilter(showAll, filterCategory);
  updateDirectoryCategoryUI(showAll, filterCategory);
}

function updateDirectoryCategoryUI(showAll, filterCategory) {
  const featuredControl = document.querySelector('.directory-categories [data-home-featured]');
  if (featuredControl) featuredControl.classList.toggle('is-active', !showAll);
  document.querySelectorAll('.directory-categories [data-home-filter]').forEach((control) => {
    control.classList.toggle('is-active', showAll && control.dataset.homeFilter === filterCategory);
  });
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
      ${escapeHtml(uiText('home.filterAll'))}
    </button>
    <button type="button" class="home-filter-btn ${filterCategory === 'intl' ? 'active' : ''}" data-home-filter="intl">
      ${escapeHtml(uiText('home.filterIntl'))}
    </button>
    <button type="button" class="home-filter-btn ${filterCategory === 'cn' ? 'active' : ''}" data-home-filter="cn">
      ${escapeHtml(uiText('home.filterCn'))}
    </button>
    <button type="button" class="home-filter-btn ${filterCategory === 'live' ? 'active' : ''}" data-home-filter="live">
      ${escapeHtml(uiText('home.filterLive'))}
    </button>
    <button type="button" class="home-filter-btn ${filterCategory === 'wallet' ? 'active' : ''}" data-home-filter="wallet">
      ${escapeHtml(uiText('home.filterWallet'))}
    </button>
    <button type="button" class="home-filter-btn ${filterCategory === 'cards' ? 'active' : ''}" data-home-filter="cards">
      ${escapeHtml(uiText('home.filterCards'))}
    </button>
  `;
}

function renderCategoryPage(pageId) {
  const pageConfig = categories[pageId];
  if (!pageConfig) return;
  const title = document.getElementById('pageTitle');
  const subtitle = document.getElementById('pageSubtitle');
  const container = document.getElementById('gamesGrid');
  if (title) title.textContent = localizedCategoryTitle(pageId, pageConfig);
  if (subtitle) subtitle.textContent = localizedCategorySubtitle(pageId, pageConfig);
  if (container) {
    container.innerHTML = pageConfig.games.map((game) => makeCategoryGameCard(pageId, game)).join('');
  }
}

function setMetaContent(selector, attributes, content) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
}

function setLinkHref(selector, attributes, href) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('link');
    Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
    document.head.appendChild(node);
  }
  node.href = href;
}

function setStructuredData(id, payload) {
  let node = document.getElementById(id);
  if (!node) {
    node = document.createElement('script');
    node.id = id;
    node.type = 'application/ld+json';
    document.head.appendChild(node);
  }
  node.textContent = JSON.stringify(payload);
}

function updateGameSeo(categoryId, game) {
  if (!game) return;
  const gameName = localizedGameName(game, true);
  const serviceName = isEnglishLanguage()
    ? (/top[\s-]?up$/i.test(gameName) ? gameName : `${gameName} Top-Up`)
    : (gameName.endsWith('充值') ? gameName : `${gameName}充值`);
  const description = isEnglishLanguage()
    ? `Brilliant Gaming provides ${serviceName} with clear prices, human support, and service for Malaysia and Singapore players.`
    : `${serviceName}服务，价格清楚、人工客服确认，为马来西亚与新加坡玩家提供便利的充值体验。`;
  const title = `${serviceName} - Brilliant Gaming`;
  const siteRoot = catalogSettings.siteUrl.replace(/\/$/, '');
  const chineseUrl = `${siteRoot}/games/${encodeURIComponent(game.id)}/`;
  const englishUrl = `${chineseUrl}?lang=en`;
  const canonicalUrl = isEnglishLanguage() ? englishUrl : chineseUrl;
  let imageUrl = '';
  try {
    imageUrl = new URL(game.detailArt || game.image || '', `${siteRoot}/`).href;
  } catch (error) {
    imageUrl = '';
  }

  document.title = title;
  setMetaContent('meta[name="description"]', { name: 'description' }, description);
  setMetaContent('meta[property="og:title"]', { property: 'og:title' }, title);
  setMetaContent('meta[property="og:description"]', { property: 'og:description' }, description);
  setMetaContent('meta[property="og:type"]', { property: 'og:type' }, 'website');
  setMetaContent('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
  setMetaContent('meta[property="og:locale"]', { property: 'og:locale' }, isEnglishLanguage() ? 'en_MY' : 'zh_MY');
  if (imageUrl) setMetaContent('meta[property="og:image"]', { property: 'og:image' }, imageUrl);
  setMetaContent('meta[name="twitter:card"]', { name: 'twitter:card' }, imageUrl ? 'summary_large_image' : 'summary');
  setMetaContent('meta[name="twitter:title"]', { name: 'twitter:title' }, title);
  setMetaContent('meta[name="twitter:description"]', { name: 'twitter:description' }, description);
  if (imageUrl) setMetaContent('meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl);

  setLinkHref('link[rel="canonical"]', { rel: 'canonical' }, canonicalUrl);
  setLinkHref('link[rel="alternate"][hreflang="zh-Hans"]', { rel: 'alternate', hreflang: 'zh-Hans' }, chineseUrl);
  setLinkHref('link[rel="alternate"][hreflang="en"]', { rel: 'alternate', hreflang: 'en' }, englishUrl);
  setLinkHref('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default' }, chineseUrl);
  setStructuredData('bge-game-service-schema', {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    url: canonicalUrl,
    image: imageUrl || undefined,
    serviceType: 'Game top-up service',
    areaServed: ['MY', 'SG'],
    provider: {
      '@type': 'Organization',
      name: 'Brilliant Gaming',
      url: `${siteRoot}/`
    }
  });
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
  const updatedMeta = document.getElementById('catalogUpdatedMeta');

  if (!game) {
    if (title) title.textContent = uiText('game.notFound');
    if (summary) summary.textContent = uiText('game.notFoundSummary');
    if (products) products.innerHTML = `<div class="cart-empty">${escapeHtml(uiText('game.notFoundBody'))}</div>`;
    if (backLink) backLink.href = 'index.html';
    if (updatedMeta) updatedMeta.textContent = '';
    renderTopupInfoForm('', null);
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
  if (title) title.textContent = localizedGameName(game, true);
  if (gameName) gameName.textContent = localizedGameName(game);
  if (description) description.textContent = localizedGameDescription(game);
  if (summary) summary.textContent = localizedGameDescription(game);
  if (tagline) {
    tagline.textContent = productCount
      ? ''
      : uiText('game.pricingPending');
  }
  if (backLink) backLink.href = category.page || 'index.html';
  if (updatedMeta) {
    updatedMeta.textContent = uiText('catalog.updated', {
      date: getGameUpdatedAt(categoryId, game)
    });
  }
  const selectedPlatform = getSelectedGamePlatform(game);
  if (hasGamePlatformSelector(game) && selectedPlatform) {
    document.body.dataset.gamePlatform = selectedPlatform;
  } else {
    delete document.body.dataset.gamePlatform;
  }
  if (products) products.innerHTML = makeProductSections(game, selectedPlatform);
  renderTopupInfoForm(categoryId, game);
  setTopupSystemFromPlatform(selectedPlatform);
  updateProductCardSelectionState();
  updateGameSeo(categoryId, game);
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
        game.detailName,
        game.description,
        game.tag,
        englishGameName(game),
        englishGameName(game, true),
        ...(game.keywords || []),
        ...products.flatMap((product) => [product.title, product.en || '', englishProductTitle(game.id, product)]),
      ].join(' ').toLowerCase();

      if (searchable.includes(lowerQuery)) {
        const score =
          ([game.name, englishGameName(game)].some((name) => String(name).toLowerCase() === lowerQuery) ? 180 : 0) +
          ([game.name, englishGameName(game)].some((name) => String(name).toLowerCase().startsWith(lowerQuery)) ? 120 : 0) +
          ([game.name, englishGameName(game)].some((name) => String(name).toLowerCase().includes(lowerQuery)) ? 80 : 0) +
          (String(game.description || '').toLowerCase().includes(lowerQuery) ? 30 : 0) +
          (products.some((product) => `${product.title} ${product.en || ''} ${englishProductTitle(game.id, product)}`.toLowerCase().includes(lowerQuery)) ? 20 : 0);
        const heat = (stats[`${key}-${game.id}`]?.clicks || 0) + (stats[`${key}-${game.id}`]?.searches || 0);
        results.push({ categoryId: key, game, score, heat });
      }
    });
  });
  return results.sort((a, b) => b.score - a.score || b.heat - a.heat);
}

function makeSearchResultCard(categoryId, game) {
  const categoryLabel = localizedCategoryTitle(categoryId, categories[categoryId]);
  const name = localizedGameName(game);
  const description = localizedGameDescription(game);
  const tag = localizedGameTag(game);
  return `
    <a class="game-card" href="${escapeAttribute(gamePageHref(categoryId, game.id))}" data-name="${escapeAttribute(`${game.name} ${englishGameName(game)}`.toLowerCase())}" data-game-id="${escapeAttribute(game.id)}" data-category="${escapeAttribute(categoryId)}">
      ${makeGameCover(game)}
      <div class="game-meta">
        <span class="game-category">${escapeHtml(categoryLabel)}</span>
      </div>
      <h3>${escapeHtml(name)}</h3>
      <p>${escapeHtml(description)}</p>
      <div class="tag">${escapeHtml(tag)}</div>
    </a>`;
}

function renderSearchResults(results, query) {
  const grid = document.getElementById('searchResultsGrid');
  const countText = document.getElementById('searchResultsCount');
  if (!grid || !countText) return;
  if (!query) {
    countText.textContent = uiText('search.prompt');
    grid.innerHTML = '';
    return;
  }
  if (!results.length) {
    countText.textContent = uiText('search.none', { query });
    grid.innerHTML = `
      <div class="search-empty-state">
        <span class="search-empty-icon" aria-hidden="true">?</span>
        <h3>${escapeHtml(uiText('search.askTitle'))}</h3>
        <p>${escapeHtml(uiText('search.askBody'))}</p>
        <button type="button" class="button button-primary" data-search-inquiry data-query="${escapeAttribute(query)}">
          ${escapeHtml(uiText('search.askButton'))}
        </button>
      </div>`;
    return;
  }
  countText.textContent = uiText('search.count', { count: results.length });
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
  const directoryInput = document.getElementById('directorySearchInput');
  const legacyInput = document.getElementById('searchInput');
  if (directoryInput && legacyInput && directoryInput !== legacyInput) {
    legacyInput.id = 'legacySearchInput';
  }
  const input = directoryInput || legacyInput || document.querySelector('.search-box input');
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


function openContactModal(mode = 'default') {
  const modal = document.getElementById('contactModal');
  if (!modal) return;
  activeContactMode = mode;
  modal.dataset.contactMode = mode;
  const whatsappLink = modal.querySelector('.contact-method-card.whatsapp');
  const whatsappSmall = whatsappLink ? whatsappLink.querySelector('small') : null;
  const whatsappActionLabel = whatsappLink ? whatsappLink.querySelector('.contact-method-action-label') : null;
  const wechatButton = modal.querySelector('[data-wechat-action]');
  const wechatName = wechatButton ? wechatButton.querySelector('.contact-method-name') : null;
  const wechatSmall = wechatButton ? wechatButton.querySelector('small') : null;
  const wechatActionLabel = wechatButton ? wechatButton.querySelector('.contact-method-action-label') : null;
  const orderStatus = modal.querySelector('.contact-order-status');
  const orderStatusText = orderStatus ? orderStatus.querySelector('strong') : null;
  const whatsappBaseUrl = `https://wa.me/${catalogSettings.whatsappNumber}`;

  if (whatsappLink) {
    whatsappLink.href = whatsappBaseUrl;
    if (mode === 'order' && latestOrderText) {
      if (whatsappSmall) whatsappSmall.textContent = uiText('contact.whatsappOrder');
      if (whatsappActionLabel) whatsappActionLabel.textContent = uiText('contact.whatsappActionOrder');
    } else if (mode === 'inquiry' && latestInquiryText) {
      if (whatsappSmall) whatsappSmall.textContent = uiText('contact.whatsappOpen');
      if (whatsappActionLabel) whatsappActionLabel.textContent = uiText('contact.whatsappActionOpen');
    } else {
      if (whatsappSmall) whatsappSmall.textContent = uiText('contact.whatsappOpen');
      if (whatsappActionLabel) whatsappActionLabel.textContent = uiText('contact.whatsappActionOpen');
    }
  }

  if (wechatName) wechatName.textContent = uiText('contact.wechatName');
  if (wechatButton) wechatButton.dataset.contactMode = mode;
  if (mode === 'order' && latestOrderText) {
    if (wechatSmall) wechatSmall.textContent = uiText('contact.wechatOrderHelp');
    if (wechatActionLabel) wechatActionLabel.textContent = uiText('contact.wechatActionOrder');
  } else if (mode === 'inquiry' && latestInquiryText) {
    if (wechatSmall) wechatSmall.textContent = uiText('contact.wechatInquiryHelp');
    if (wechatActionLabel) wechatActionLabel.textContent = uiText('contact.wechatActionInquiry');
  } else {
    if (wechatSmall) wechatSmall.textContent = uiText('contact.wechatIdHelp');
    if (wechatActionLabel) wechatActionLabel.textContent = uiText('contact.wechatActionId');
  }

  if (orderStatus) orderStatus.hidden = mode !== 'order';
  if (orderStatusText) orderStatusText.textContent = uiText('contact.orderStatus');

  const title = modal.querySelector('#contactModalTitle');
  const intro = modal.querySelector('.contact-intro');
  const note = modal.querySelector('.contact-note-premium');

  if (mode === 'order') {
    if (title) title.textContent = uiText('contact.orderTitle');
    if (intro) intro.textContent = uiText('contact.orderIntro');
    if (note) {
      note.innerHTML = `<strong>${escapeHtml(uiText('contact.orderNoteLabel'))}</strong>${escapeHtml(uiText('contact.orderNote'))}`;
    }
  } else if (mode === 'inquiry') {
    if (title) title.textContent = uiText('contact.inquiryTitle');
    if (intro) intro.textContent = uiText('contact.inquiryIntro');
    if (note) {
      const label = latestInquiryLabel ? `${latestInquiryLabel} · ` : '';
      note.innerHTML = `<strong>${escapeHtml(uiText('contact.inquiryNoteLabel'))}</strong>${escapeHtml(label + uiText('contact.inquiryNote'))}`;
    }
  } else {
    if (title) title.textContent = uiText('contact.defaultTitle');
    if (intro) intro.textContent = uiText('contact.defaultIntro');
    if (note) {
      note.innerHTML = `<strong>${escapeHtml(uiText('contact.hoursLabel'))}</strong>${escapeHtml(uiText('contact.hours'))}`;
    }
  }

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

function openCustomerGuideModal() {
  const modal = document.getElementById('customerGuideModal');
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('contact-modal-open');
  modal.querySelector('[data-guide-close]')?.focus();
}

function closeCustomerGuideModal() {
  const modal = document.getElementById('customerGuideModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('contact-modal-open');
}

function scrollToPriceDirectory() {
  const grid = document.getElementById('home-intl-grid');
  const section = grid?.closest('.featured-section');
  if (!section) return;
  section.scrollIntoView({ block: 'start', behavior: 'smooth' });
  section.classList.add('directory-focus-ring');
  window.setTimeout(() => section.classList.remove('directory-focus-ring'), 1400);
}

function copyTextToClipboard(value, successMessage = uiText('contact.copied')) {
  if (!value) return;
  navigator.clipboard
    .writeText(value)
    .then(() => showCartToast(successMessage))
    .catch(() => alert(uiText('order.copyFailed')));
}

function toggleFaqItem(button) {
  const item = button.closest('.faq-item');
  if (!item) return;
  item.classList.toggle('active');
}

function initEvents() {
  document.body.addEventListener('click', (event) => {
    const target = event.target;

    const currencyButton = target.closest('[data-currency]');
    if (currencyButton) {
      event.preventDefault();
      setActiveCurrency(currencyButton.dataset.currency, currencyButton.closest('.currency-switch')?.querySelector('.currency-trigger'));
      return;
    }

    if (target.closest('[data-contact-open]')) {
      event.preventDefault();
      openContactModal();
      return;
    }

    if (target.closest('[data-guide-open]')) {
      event.preventDefault();
      openCustomerGuideModal();
      return;
    }

    if (target.closest('[data-price-guide]')) {
      event.preventDefault();
      scrollToPriceDirectory();
      return;
    }

    if (target.closest('[data-guide-close]')) {
      event.preventDefault();
      closeCustomerGuideModal();
      return;
    }

    if (target.closest('[data-guide-process]')) {
      event.preventDefault();
      closeCustomerGuideModal();
      document.getElementById('orderProcess')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
      return;
    }

    if (target.closest('[data-guide-contact]')) {
      event.preventDefault();
      closeCustomerGuideModal();
      openContactModal();
      return;
    }

    const customerGuideModal = document.getElementById('customerGuideModal');
    if (customerGuideModal && target === customerGuideModal) {
      closeCustomerGuideModal();
      return;
    }

    const whatsappLink = target.closest('.contact-method-card.whatsapp');
    if (whatsappLink) {
      const mode = whatsappLink.closest('#contactModal')?.dataset.contactMode || 'default';
      const message = mode === 'order'
        ? latestOrderText
        : (mode === 'inquiry' ? latestInquiryText : '');
      if (message) {
        event.preventDefault();
        const url = `https://wa.me/${catalogSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener');
      }
      return;
    }

    const searchInquiryButton = target.closest('[data-search-inquiry]');
    if (searchInquiryButton) {
      event.preventDefault();
      const query = searchInquiryButton.dataset.query || '';
      openInquiryChannel(
        uiText('search.inquiryMessage', { query }),
        query
      );
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

    const wechatButton = target.closest('[data-wechat-action]');
    if (wechatButton) {
      event.preventDefault();
      const mode = wechatButton.dataset.contactMode || 'default';
      const copyValue = mode === 'order'
        ? latestOrderText
        : (mode === 'inquiry' ? latestInquiryText : 'Brilliant_Gaming');
      const successMessage = mode === 'order'
        ? uiText('contact.wechatOrderCopied')
        : (mode === 'inquiry' ? uiText('contact.wechatInquiryCopied') : uiText('contact.wechatCopied'));
      copyTextToClipboard(copyValue, successMessage);
      return;
    }

    const copyButton = target.closest('[data-copy-value]');
    if (copyButton) {
      event.preventDefault();
      copyTextToClipboard(copyButton.dataset.copyValue, uiText('contact.wechatCopied'));
      return;
    }

    if (target.closest('[data-whatsapp-empty]')) {
      event.preventDefault();
      showCartToast(uiText('contact.unavailable'));
      return;
    }

    const faqButton = target.closest('.faq-question');
    if (faqButton) {
      event.preventDefault();
      toggleFaqItem(faqButton);
      return;
    }

    const platformButton = target.closest('.game-platform-option[data-game-platform]');
    if (platformButton) {
      event.preventDefault();
      selectGamePlatform(platformButton.dataset.gamePlatform);
      return;
    }

    const compactTab = target.closest('[data-compact-section-tab]');
    if (compactTab) {
      const catalog = compactTab.closest('.compact-products');
      if (!catalog) return;
      catalog.querySelectorAll('[data-compact-section-tab]').forEach((button) =>
        button.setAttribute('aria-pressed', String(button === compactTab)));
      catalog.querySelectorAll('[data-compact-section]').forEach((section) => {
        section.hidden = section.dataset.compactSection !== compactTab.dataset.compactSectionTab;
      });
      return;
    }

    const customAmountAction = target.closest('[data-custom-amount-action]');
    if (customAmountAction) {
      event.preventDefault();
      openCustomAmountInquiry(customAmountAction.closest('[data-custom-amount-card]'));
      return;
    }

    const exchangeAmountAction = target.closest('[data-exchange-amount-action]');
    if (exchangeAmountAction) {
      event.preventDefault();
      addTieredExchangeToCart(exchangeAmountAction.closest('[data-tiered-exchange-card]'));
      return;
    }

    if (target.closest('[data-custom-amount-input], [data-exchange-amount-input]')) return;

    const productCard = target.closest('.product-card[data-title][data-price]');
    if (productCard) {
      handleProductCardAction(productCard);
      return;
    }
    if (target.matches('.add-cart')) {
      const title = target.dataset.title;
      const price = target.dataset.price;
      addToCart(title, price);
    }
    if (target.matches('#cartToggle') || target.matches('#cartToggleMobile') || target.closest('#mobileCartDock')) {
      event.preventDefault();
      toggleCartPanel();
    }
    if (target.matches('#cartClose')) {
      toggleCartPanel();
    }
    if (target.matches('#clearCartButton')) {
      clearCart();
    }
    if (target.matches('#contactOrderButton')) {
      event.preventDefault();
      copyCartAndOpenContact();
      return;
    }
    if (target.matches('#copyCartButton')) {
      event.preventDefault();
      copyCartToClipboard();
      return;
    }
    if (target.matches('#clearSearch')) {
      clearSearch();
    }
    const fullDirectoryLink = target.closest('a[href$="#all-games"]');
    if (fullDirectoryLink && page === 'home') {
      event.preventDefault();
      isShowingAllGames = true;
      activeHomeCategory = 'all';
      renderHomePage(true, activeHomeCategory);
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}#all-games`);
      document.getElementById('all-games')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
      return;
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

const homeFeaturedButton = target.closest('[data-home-featured]');

if (homeFeaturedButton) {
  event.preventDefault();
  isShowingAllGames = false;
  activeHomeCategory = 'all';
  renderHomePage(false, activeHomeCategory);
  document.getElementById('home-intl-grid')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
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
  document.body.addEventListener('input', (event) => {
    const exchangeInput = event.target.closest?.('[data-exchange-amount-input]');
    if (exchangeInput) {
      updateTieredExchangePreview(exchangeInput.closest('[data-tiered-exchange-card]'));
      return;
    }
    const input = event.target.closest?.('[data-custom-amount-input]');
    if (!input) return;
    updateCustomAmountPreview(input.closest('[data-custom-amount-card]'));
  });
  document.body.addEventListener('keydown', (event) => {
    const exchangeInput = event.target.closest?.('[data-exchange-amount-input]');
    if (exchangeInput && event.key === 'Enter') {
      event.preventDefault();
      addTieredExchangeToCart(exchangeInput.closest('[data-tiered-exchange-card]'));
      return;
    }
    const customAmountInput = event.target.closest?.('[data-custom-amount-input]');
    if (customAmountInput && event.key === 'Enter') {
      event.preventDefault();
      openCustomAmountInquiry(customAmountInput.closest('[data-custom-amount-card]'));
      return;
    }
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const productCard = event.target.closest?.('.product-card[data-title][data-price]');
    if (!productCard) return;
    event.preventDefault();
    handleProductCardAction(productCard);
  });
  document.addEventListener('click', (event) => {
    document.querySelectorAll('.preference-details[open]').forEach((details) => {
      if (!details.contains(event.target)) details.removeAttribute('open');
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.preference-details[open]').forEach((details) => {
        details.removeAttribute('open');
        details.querySelector('summary')?.focus();
      });
      closeContactModal();
      closeCustomerGuideModal();
    }
  });
}

function captureTopupFormValues() {
  return getTopupInfoFields().reduce((values, field) => {
    values[field.name] = field.value;
    return values;
  }, {});
}

function restoreTopupFormValues(values) {
  Object.entries(values || {}).forEach(([name, value]) => {
    const field = Array.from(document.querySelectorAll('[data-topup-field]'))
      .find((candidate) => candidate.dataset.topupField === name);
    if (field) field.value = value;
  });
}

function validateCatalogData() {
  const issues = [];
  const seenGameIds = new Map();
  const allowedStatuses = new Set(['active', 'paused', 'soldout', 'inquiry']);
  let gameCount = 0;
  let productCount = 0;

  const addIssue = (severity, code, message, path) => {
    issues.push({ severity, code, message, path });
  };

  Object.entries(categories).forEach(([categoryId, category]) => {
    (category.games || []).forEach((game, gameIndex) => {
      gameCount += 1;
      const gamePath = `${categoryId}.games[${gameIndex}]`;
      const gameId = String(game.id || '').trim();

      ['id', 'name', 'description', 'image', 'detailArt'].forEach((field) => {
        if (!String(game[field] || '').trim()) {
          addIssue('error', 'missing-game-field', `缺少游戏字段：${field}`, `${gamePath}.${field}`);
        }
      });

      if (gameId) {
        if (seenGameIds.has(gameId)) {
          addIssue('error', 'duplicate-game-id', `游戏 ID 重复：${gameId}`, gamePath);
        } else {
          seenGameIds.set(gameId, gamePath);
        }
      }

      const englishName = englishGameName(game, true);
      if (!englishName || window.BGE_I18N?.hasChinese?.(englishName)) {
        addIssue('warning', 'missing-game-english', `游戏缺少完整英文名：${game.name || gameId}`, gamePath);
      }

      if (game.updatedAt && !/^\d{4}-\d{2}-\d{2}$/.test(game.updatedAt)) {
        addIssue('warning', 'invalid-update-date', 'updatedAt 建议使用 YYYY-MM-DD 格式', `${gamePath}.updatedAt`);
      }

      const rawSections = Array.isArray(game.productSections) && game.productSections.length
        ? game.productSections
        : [{ title: '', products: game.products || [] }];

      rawSections.forEach((section, sectionIndex) => {
        const sectionPath = `${gamePath}.productSections[${sectionIndex}]`;
        const seenProducts = new Set();
        if (section.title) {
          const englishSection = englishSectionTitle(section);
          if (!englishSection || window.BGE_I18N?.hasChinese?.(englishSection)) {
            addIssue('warning', 'missing-section-english', `商品分类缺少英文：${section.title}`, sectionPath);
          }
        }

        (section.products || []).forEach((rawProduct, productIndex) => {
          productCount += 1;
          const productPath = `${sectionPath}.products[${productIndex}]`;
          const product = resolveProductPrice(rawProduct);
          const title = String(product?.title || '').trim();
          if (!title) addIssue('error', 'missing-product-title', '商品缺少 title', productPath);
          if (!String(product?.price || '').trim()) addIssue('error', 'missing-product-price', `商品缺少价格：${title || productIndex + 1}`, productPath);

          if (title) {
            const duplicateKey = `${title}\u0000${String(product?.price || '')}`;
            if (seenProducts.has(duplicateKey)) {
              addIssue('warning', 'duplicate-product', `同一分类有重复商品：${title}`, productPath);
            }
            seenProducts.add(duplicateKey);
          }

          if (rawProduct.pricePreset && !Object.prototype.hasOwnProperty.call(pricePresets, rawProduct.pricePreset)) {
            addIssue('error', 'unknown-price-preset', `找不到 pricePreset：${rawProduct.pricePreset}`, productPath);
          }

          const rawStatus = String(rawProduct.status || '').toLowerCase();
          if (rawStatus && !allowedStatuses.has(rawStatus)) {
            addIssue('error', 'invalid-product-status', `不支持的商品状态：${rawProduct.status}`, productPath);
          }

          const englishTitle = englishProductTitle(gameId, product);
          if (!englishTitle || window.BGE_I18N?.hasChinese?.(englishTitle)) {
            addIssue('warning', 'missing-product-english', `商品缺少完整英文：${title || productIndex + 1}`, productPath);
          }
        });
      });
    });
  });

  const errors = issues.filter((issue) => issue.severity === 'error').length;
  const warnings = issues.filter((issue) => issue.severity === 'warning').length;
  return {
    ok: errors === 0,
    summary: { gameCount, productCount, errors, warnings },
    issues
  };
}

window.BGE_CATALOG_VALIDATOR = {
  run: validateCatalogData,
  getCatalog: () => categories,
  getSettings: () => ({ ...catalogSettings }),
  getPricePresets: () => ({ ...pricePresets })
};

function refreshLanguageContent() {
  document.querySelectorAll('.currency-switch').forEach((switcher) => {
    switcher.setAttribute('aria-label', uiText('currency.switcher'));
  });

  if (page === 'home') {
    renderHomePage(isShowingAllGames, activeHomeCategory);
    const query = document.getElementById('searchInput')?.value || '';
    if (query.trim()) handleSearch(query);
  } else if (page === 'game') {
    const values = captureTopupFormValues();
    const params = getQueryParams();
    renderGamePage(params.category, params.gameId);
    restoreTopupFormValues(values);
  } else if (categories[page]) {
    renderCategoryPage(page);
    const query = document.getElementById('searchInput')?.value || '';
    if (query.trim()) handleSearch(query);
  }

  updateCartUI();
  updateDailyOrderStatsUI();
  if (document.getElementById('contactModal')?.classList.contains('open')) {
    openContactModal(activeContactMode);
  }
  if (document.getElementById('orderCopiedDialog')) {
    showOrderCopiedDialog(() => openContactModal('order'));
  }
}

function start() {
  const hasSupersededPack = cart.some((item) => isSupersededTencentPack(item, cartContext?.gameId));
  if (hasSupersededPack) {
    cart = cart.filter((item) => !isSupersededTencentPack(item, cartContext?.gameId));
    saveCart();
  }
  initCurrencySwitcher();
  updateCartUI();
  updateDailyOrderStatsUI();
  initHeaderLinks();
  if (page === 'home') {
    isShowingAllGames = window.location.hash === '#all-games';
    activeHomeCategory = 'all';
    renderHomePage(isShowingAllGames, activeHomeCategory);
    initSearch();
  } else if (page === 'game') {
    const params = getQueryParams();
    renderGamePage(params.category, params.gameId);
  } else if (categories[page]) {
    renderCategoryPage(page);
    initSearch();
  }
  initEvents();
  refreshCurrencyDisplay();
  if (hasSupersededPack) {
    showCartToast(isEnglishLanguage()
      ? 'Some packs changed. Please reselect them in the shop.'
      : '部分商品档位已更新，请重新选择后加入购物车。');
  }
}

window.addEventListener('bge:languagechange', refreshLanguageContent);
window.addEventListener('hashchange', () => {
  if (page !== 'home' || window.location.hash !== '#all-games') return;
  isShowingAllGames = true;
  activeHomeCategory = 'all';
  renderHomePage(true, activeHomeCategory);
});
window.addEventListener('DOMContentLoaded', start);
