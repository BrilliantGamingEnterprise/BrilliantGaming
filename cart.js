let selectedCurrency = 'MYR';
const cart = [];
let cartOpen = false;

const productList = [
  { name: '60 月相', rm: 4, sgd: 1.3, img: '鸣潮60.png' },
  { name: '300 月相', rm: 18, sgd: 6, img: '鸣潮300.png' },
  { name: '980 月相', rm: 54, sgd: 18, img: '鸣潮980.png' },
  { name: '1980 月相', rm: 114, sgd: 39, img: '鸣潮1980.png' },
  { name: '3280 月相', rm: 175, sgd: 57, img: '鸣潮3280.png' },
  { name: '6480 月相', rm: 350, sgd: 113, img: '鸣潮6480.png' },
  { name: '60-6480月相', rm: 700, sgd: 225, img: '鸣潮allin.png' },
  { name: '月相观测卡', rm: 18, sgd: 6, img: '鸣潮card.png' },
  { name: '寰宇频道', rm: 36, sgd: 12, img: '鸣潮channel.png' },
  { name: '寰宇特约', rm: 72, sgd: 24, img: '鸣潮vip.png' }
];

function renderProducts() {
  const grid = document.getElementById("price-grid");
  grid.innerHTML = '';
  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = "price-card";
    card.onclick = () => {
      addToCart(product.name, selectedCurrency);
    };
    card.innerHTML = `
      <div class="card-top">${product.name}</div>
      <img src="${product.img}" alt="${product.name}" class="product-img" />
      <div class="card-price">${selectedCurrency} ${selectedCurrency === 'MYR' ? product.rm : product.sgd}</div>
    `;
    grid.appendChild(card);
  });
}

function toggleCurrency() {
  selectedCurrency = selectedCurrency === 'MYR' ? 'SGD' : 'MYR';
  document.getElementById("currency-label").innerText = selectedCurrency;
  renderProducts();
  updateCartDisplay();
}

function addToCart(name, currency) {
  const existing = cart.find(item => item.name === name && item.currency === currency);
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

  cartItems.innerHTML = '';
  let total = 0;
  let count = 0;

  const filteredCart = cart.filter(item => item.currency === selectedCurrency);
  filteredCart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - ${item.currency} x${item.qty} 
      <button class='qty-btn' onclick='changeQty(${index}, -1)'>–</button>
      <button class='qty-btn' onclick='changeQty(${index}, 1)'>+</button>`;
    cartItems.appendChild(li);

    const product = productList.find(p => p.name === item.name);
    if (product) {
      total += (item.currency === 'MYR' ? product.rm : product.sgd) * item.qty;
    }
    count += item.qty;
  });

  toggleBtn.innerHTML = cartOpen ? '❌ 关闭购物车' : `🛒 购物车 (${count})`;
  totalDisplay.innerText = `${selectedCurrency} 总价：${selectedCurrency} ${total.toFixed(2)}`;
  document.getElementById('cart-count').innerText = count;
}

function changeQty(index, delta) {
  const filteredCart = cart.filter(item => item.currency === selectedCurrency);
  const item = filteredCart[index];
  const globalIndex = cart.indexOf(item);
  cart[globalIndex].qty += delta;
  if (cart[globalIndex].qty <= 0) cart.splice(globalIndex, 1);
  updateCartDisplay();
}

function toggleCart() {
  cartOpen = !cartOpen;
  document.getElementById('cart-panel').style.display = cartOpen ? 'block' : 'none';
  updateCartDisplay();
}

function copyCart() {
  const filteredCart = cart.filter(item => item.currency === selectedCurrency);
  if (filteredCart.length === 0) {
    alert("购物车是空的！");
    return;
  }

  let message = '🎮 游戏名称：鸣潮\n';
  message += '🧾 订单内容：\n';

  filteredCart.forEach(item => {
    message += `• ${item.name} ×${item.qty}\n`;
  });

  let total = 0;
  filteredCart.forEach(item => {
    const product = productList.find(p => p.name === item.name);
    if (product) {
      total += selectedCurrency === 'MYR' ? product.rm * item.qty : product.sgd * item.qty;
    }
  });

  message += `\n💰 合计金额：${selectedCurrency} ${total.toFixed(2)}\n`;

  navigator.clipboard.writeText(message)
    .then(() => alert("🎀 订单信息已复制，请发送给客服确认哦！"))
    .catch(() => alert("❌ 复制失败，请手动复制"));
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});
