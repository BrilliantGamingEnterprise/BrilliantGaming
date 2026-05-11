(() => {
  let selectedCurrency = 'MYR';
  const cart = [];
  let cartOpen = false;

  function getProductList() {
    return window.productList || [];
  }

  function getProductPrice(product, currency) {
    return currency === 'MYR' ? product.rm : product.sgd;
  }

  function getGameTitle() {
    return (document.title || 'Brilliant Gaming').split(' - ')[0].trim();
  }

  function renderProducts() {
    const grid = document.getElementById('price-grid');
    if (!grid) return;

    grid.innerHTML = '';
    getProductList().forEach((product) => {
      const categoryClass = product.category || 'slow';
      const card = document.createElement('div');
      card.className = `price-card ${categoryClass}`;
      card.onclick = () => {
        addToCart(product.name, selectedCurrency);
      };
      card.innerHTML = `
        <div class="card-top">${product.name}</div>
        <img src="${product.img}" alt="${product.name}" class="product-img" />
        <div class="card-price">${selectedCurrency} ${getProductPrice(product, selectedCurrency)}</div>
      `;
      grid.appendChild(card);
    });
  }

  function applyActiveCategory() {
    const activeButton = document.querySelector('.category-tabs button.active');
    const firstButton = document.querySelector('.category-tabs button');
    const button = activeButton || firstButton;

    if (button) {
      button.click();
    }
  }

  function toggleCurrency() {
    selectedCurrency = selectedCurrency === 'MYR' ? 'SGD' : 'MYR';

    const currencyLabel = document.getElementById('currency-label');
    if (currencyLabel) {
      currencyLabel.innerText = selectedCurrency;
    }

    renderProducts();
    applyActiveCategory();
    updateCartDisplay();
  }

  function addToCart(name, currency) {
    const existing = cart.find((item) => item.name === name && item.currency === currency);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, currency, qty: 1 });
    }
    updateCartDisplay();
  }

  function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total-display');
    const toggleBtn = document.getElementById('cart-toggle');
    const cartCount = document.getElementById('cart-count');

    if (!cartItems || !totalDisplay || !toggleBtn) return;

    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    const filteredCart = cart.filter((item) => item.currency === selectedCurrency);
    filteredCart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `${item.name} - ${item.currency} x${item.qty} <button class='qty-btn' onclick='changeQty(${index}, -1)'>–</button><button class='qty-btn' onclick='changeQty(${index}, 1)'>+</button>`;
      cartItems.appendChild(li);

      const product = getProductList().find((p) => p.name === item.name);
      if (product) {
        total += getProductPrice(product, item.currency) * item.qty;
      }
      count += item.qty;
    });

    toggleBtn.innerHTML = cartOpen ? '❌ 关闭购物车' : `🛒 购物车 (${count})`;
    totalDisplay.innerText = `${selectedCurrency} 总价：${selectedCurrency} ${total.toFixed(2)}`;
    if (cartCount) {
      cartCount.innerText = count;
    }
  }

  function changeQty(index, delta) {
    const filteredCart = cart.filter((item) => item.currency === selectedCurrency);
    const item = filteredCart[index];
    if (!item) return;

    const globalIndex = cart.indexOf(item);
    cart[globalIndex].qty += delta;
    if (cart[globalIndex].qty <= 0) {
      cart.splice(globalIndex, 1);
    }
    updateCartDisplay();
  }

  function toggleCart() {
    cartOpen = !cartOpen;

    const cartPanel = document.getElementById('cart-panel');
    if (cartPanel) {
      cartPanel.style.display = cartOpen ? 'block' : 'none';
    }
    updateCartDisplay();
  }

  function copyCart() {
    const filteredCart = cart.filter((item) => item.currency === selectedCurrency);
    if (filteredCart.length === 0) {
      alert('购物车是空的！');
      return;
    }

    let message = `🎮 游戏名称：${getGameTitle()}\n`;
    message += '🧾 订单内容：\n';

    filteredCart.forEach((item) => {
      const cleanName = item.name.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      message += `• ${cleanName} ×${item.qty}\n`;
    });

    let total = 0;
    filteredCart.forEach((item) => {
      const product = getProductList().find((p) => p.name === item.name);
      if (product) {
        total += getProductPrice(product, selectedCurrency) * item.qty;
      }
    });

    message += `\n💰 合计金额：${selectedCurrency} ${total.toFixed(2)}\n`;

    navigator.clipboard.writeText(message)
      .then(() => alert('🎀 订单信息已复制，请发送给客服确认哦！'))
      .catch(() => alert('❌ 复制失败，请手动复制'));
  }

  function initCart() {
    renderProducts();
    applyActiveCategory();
    updateCartDisplay();
  }

  window.renderProducts = renderProducts;
  window.toggleCurrency = toggleCurrency;
  window.addToCart = addToCart;
  window.updateCartDisplay = updateCartDisplay;
  window.changeQty = changeQty;
  window.toggleCart = toggleCart;
  window.copyCart = copyCart;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
  } else {
    initCart();
  }
})();
