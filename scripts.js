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
        detailName: '原神国际服',
        description: 'Genshin Impact',
        tag: '热门充值',
        image: 'assets/images/games/genshin.jpg',
        productSections: [
          {
            title: '结晶充值',
            subtitle: 'Genesis Crystal Top-Up',
            icon: '💎',
            products: [
              { title: '60结晶', en: '60 Genesis Crystals', price: 'RM 4.00', note: '结晶 / Genesis Crystal' },
              { title: '300结晶', en: '300 Genesis Crystals', price: 'RM 18.00', note: '结晶 / Genesis Crystal' },
              { title: '980结晶', en: '980 Genesis Crystals', price: 'RM 54.00', note: '结晶 / Genesis Crystal' },
              { title: '1980结晶', en: '1980 Genesis Crystals', price: 'RM 105.00', note: '结晶 / Genesis Crystal' },
              { title: '3280结晶', en: '3280 Genesis Crystals', price: 'RM 170.00', note: '结晶 / Genesis Crystal' },
              { title: '6480结晶', en: '6480 Genesis Crystals', price: 'RM 300.00', note: '结晶 / Genesis Crystal' },
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
  detailName: '崩坏：星穹铁道国际服',
  description: 'Honkai: Star Rail',
  tag: '热门充值',
  image: 'assets/images/games/honkai-star-rail.jpg',
  detailArt: 'assets/images/games/honkai-star-rail-hero.jpg',
  productSections: [
    {
      title: '古老梦华',
      subtitle: 'Oneiric Shard Top-Up',
      icon: '◆',
      products: [
        { title: '60古老梦华', en: '60 Oneiric Shards', price: 'RM 4.00', note: '古老梦华 / Oneiric Shard' },
        { title: '300古老梦华', en: '300 Oneiric Shards', price: 'RM 18.00', note: '古老梦华 / Oneiric Shard' },
        { title: '980古老梦华', en: '980 Oneiric Shards', price: 'RM 54.00', note: '古老梦华 / Oneiric Shard' },
        { title: '1980古老梦华', en: '1980 Oneiric Shards', price: 'RM 105.00', note: '古老梦华 / Oneiric Shard' },
        { title: '3280古老梦华', en: '3280 Oneiric Shards', price: 'RM 170.00', note: '古老梦华 / Oneiric Shard' },
        { title: '6480古老梦华', en: '6480 Oneiric Shards', price: 'RM 300.00', note: '古老梦华 / Oneiric Shard' },
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
        description: 'Zenless Zone Zero',
        tag: '热门充值',
        image: 'assets/images/games/zzz.jpg',
        products: []
      },
      {
        id: 'wuthering-waves',
        name: '鸣潮',
        description: 'Wuthering Waves',
        tag: '热门充值',
        image: 'assets/images/games/wuthering-waves.jpg',
        products: []
      },
      {
        id: 'pokemon-tcg-pocket',
        name: '宝可梦卡牌',
        description: 'Pokémon TCG Pocket',
        tag: '热门充值',
        image: 'assets/images/games/TCG.jpg',
        products: []
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
        description: 'PUBG Mobile UC',
        tag: '国际服',
        image: 'assets/images/games/PUBG.jpg',
        products: []
      },
      {
        id: 'garena-codm',
        name: 'Garena Call of Duty Mobile',
        description: 'CODM Garena',
        tag: '国际服',
        image: 'assets/images/games/codm.jpg',
        products: []
      },
      {
        id: 'garena-delta-force',
        name: 'Garena Delta Force',
        description: '三角洲行动 Garena',
        tag: '国际服',
        image: 'assets/images/games/delta-force.jpg',
        products: []
      },
      {
        id: 'mobile-legends',
        name: 'Mobile Legends',
        description: 'MLBB Diamonds',
        tag: '国际服',
        image: 'assets/images/games/mlbb.jpg',
        products: []
      }
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
        description: 'Honor of Kings CN',
        tag: '中国服',
        image: 'assets/images/games/王者荣耀.jpg',
        products: []
      },
      {
        id: 'peace-elite',
        name: '和平精英',
        description: 'Peacekeeper Elite',
        tag: '中国服',
        image: 'assets/images/games/和平精英.jpg',
        products: []
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
