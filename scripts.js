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

let activeCurrency = localStorage.getItem(currencyKey) || currencySettings.defaultCurrency;
if (!currencySettings.rates[activeCurrency]) activeCurrency = currencySettings.defaultCurrency;

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
  'home.showLess': '收起游戏 ↑',
  'home.showAll': '查看全部游戏 ›',
  'home.directoryFeatured': '热门充值游戏',
  'home.directoryAll': '全部充值游戏（{count}）',
  'home.directoryFiltered': '筛选结果（{count}）',
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
  return window.BGE_I18N?.getGameTag?.(game) || game?.tag || '';
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
    gameId: query.get('game') || document.body.dataset.gameId || ''
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

function getCartItemChineseTitle(item) {
  if (item?.titleZh) return item.titleZh;
  return String(item?.title || '').split(' / ')[0].trim();
}

function getCartItemEnglishTitle(item) {
  if (item?.titleEn) return item.titleEn;

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
  return titleParts.length > 1 ? titleParts.slice(1).join(' / ').trim() : chineseTitle;
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
        options: [
          '微信区',
          'QQ区'
        ]
      },
      {
        name: 'server',
        label: '大区',
        type: 'text',
        required: true,
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

function setActiveCurrency(currency) {
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
  const commonAttrs = `data-topup-field="${escapeAttribute(field.name)}" data-topup-label="${escapeAttribute(label)}" data-topup-label-zh="${escapeAttribute(field.label)}" data-required="${field.required ? 'true' : 'false'}"`;
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
    <label class="topup-field" data-field-wrap="${escapeAttribute(field.name)}">
      <span>${escapeHtml(label)}${requiredMark}</span>
      ${control}
    </label>`;
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
        ${config.fields.map(makeTopupField).join('')}
      </div>
    </section>`;
}

function getTopupInfoFields() {
  return Array.from(document.querySelectorAll('[data-topup-field]')).map((field) => {
    const value = String(field.value || '').trim();
    const displayValue = field.tagName === 'SELECT' && value
      ? String(field.selectedOptions?.[0]?.textContent || value).trim()
      : value;

    return {
      name: field.dataset.topupField || '',
      label: field.dataset.topupLabel || '',
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

function makeGameCover(game) {
  const displayName = localizedGameName(game);
  if (!game.image) {
    return `<div class="game-avatar"><span>${escapeHtml(getAvatarText(displayName))}</span></div>`;
  }
  const fallback = escapeAttribute(getAvatarText(displayName));
  const coverSrc = escapeAttribute(game.image);
  return `
    <div class="game-avatar game-cover">
      <img class="game-cover-backdrop" src="${coverSrc}" alt="" loading="lazy" decoding="async" aria-hidden="true">
      <img class="game-cover-main" src="${coverSrc}" alt="${escapeAttribute(displayName)}" loading="lazy" decoding="async" data-fallback="${fallback}" onerror="this.parentElement.classList.remove('game-cover'); this.parentElement.innerHTML='<span>${fallback}</span>';">
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

function getSectionSystemValue(section) {
  const title = String(section?.title || '');
  if (title.includes('苹果系统')) return '苹果 iOS';
  if (title.includes('安卓系统')) return '安卓 Android';
  return '';
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

function makeProductCard(product, gameId = '', section = null, sectionKey = '') {
  const resolvedProduct = resolveProductPrice(product);
  const titleZh = resolvedProduct.title || '';
  const titleEn = englishProductTitle(gameId, resolvedProduct);
  const title = localizedProductTitle(gameId, resolvedProduct);
  const sectionZh = section?.title || '';
  const sectionEn = section ? englishSectionTitle(section) : '';
  const sectionTitle = section ? localizedSectionTitle(section) : '';
  const subtitle = isEnglishLanguage() ? localizedProductNote(resolvedProduct) : titleEn;
  const price = resolvedProduct.price || '';
  const displayPrice = formatPriceForCurrency(price);
  const cartKey = getProductCartKey(resolvedProduct, sectionKey);
  const status = getProductStatus(resolvedProduct);
  const systemValue = getSectionSystemValue(section);
  const isUnavailable = status === 'paused' || status === 'soldout';
  const actionLabel = status === 'inquiry'
    ? uiText('product.inquiryAria', { title })
    : uiText('product.addAria', { title, price: displayPrice });
  const statusBadge = status === 'active'
    ? ''
    : `<span class="product-status-badge">${escapeHtml(uiText(`product.status.${status}`))}</span>`;

  return `
    <article class="product-card product-status-${escapeAttribute(status)}" role="button" tabindex="${isUnavailable ? '-1' : '0'}" data-product-status="${escapeAttribute(status)}" data-cart-key="${escapeAttribute(cartKey)}" data-title="${escapeAttribute(title)}" data-title-zh="${escapeAttribute(titleZh)}" data-title-en="${escapeAttribute(titleEn)}" data-section-key="${escapeAttribute(sectionKey)}" data-section-title="${escapeAttribute(sectionTitle)}" data-section-zh="${escapeAttribute(sectionZh)}" data-section-en="${escapeAttribute(sectionEn)}" data-system-value="${escapeAttribute(systemValue)}" data-price="${escapeAttribute(price)}" aria-label="${escapeAttribute(actionLabel)}"${isUnavailable ? ' aria-disabled="true"' : ''}>
      ${statusBadge}
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(subtitle)}</p>
      <div class="product-price" data-price-base="${escapeAttribute(price)}">${escapeHtml(displayPrice)}</div>
    </article>`;
}

function makeProductSections(game) {
  const sections = resolveProductSections(game);
  if (!sections.length) {
    const products = (game.products || []).map(resolveProductPrice);
    if (!products.length) {
      return `<div class="cart-empty">${escapeHtml(uiText('game.noProducts'))}</div>`;
    }
    return `<div class="product-grid">${products.map((product) => makeProductCard(product, game.id)).join('')}</div>`;
  }

  return sections
    .map((section, sectionIndex) => {
      const sectionTitle = localizedSectionTitle(section);
      const sectionSubtitle = localizedSectionSubtitle(section);
      return `
      <div class="product-section">
        <div class="product-section-header">
          <h3>
            <span class="product-section-main"><span class="product-section-icon">${section.icon || '◆'}</span>${escapeHtml(sectionTitle)}</span>
            ${sectionSubtitle ? `<span>${escapeHtml(sectionSubtitle)}</span>` : ''}
          </h3>
        </div>
        <div class="product-grid">
          ${(section.products || []).map((product) => makeProductCard(
            product,
            game.id,
            section,
            section.id || `${sectionIndex + 1}-${section.title || 'items'}`
          )).join('')}
        </div>
      </div>`;
    })
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
  const description = isEnglishLanguage()
    ? `Top up ${gameName} with Brilliant Gaming. Clear prices, human support, and service for Malaysia and Singapore players.`
    : `${gameName}充值服务，价格清楚、人工客服确认，为马来西亚与新加坡玩家提供便利的游戏充值体验。`;
  const title = isEnglishLanguage()
    ? `${gameName} Top-Up - Brilliant Gaming`
    : `${gameName}充值 - Brilliant Gaming`;
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
  if (products) products.innerHTML = makeProductSections(game);
  renderTopupInfoForm(categoryId, game);
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
      setActiveCurrency(currencyButton.dataset.currency);
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
  document.body.addEventListener('keydown', (event) => {
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
}

window.addEventListener('bge:languagechange', refreshLanguageContent);
window.addEventListener('hashchange', () => {
  if (page !== 'home' || window.location.hash !== '#all-games') return;
  isShowingAllGames = true;
  activeHomeCategory = 'all';
  renderHomePage(true, activeHomeCategory);
});
window.addEventListener('DOMContentLoaded', start);
