(() => {
  'use strict';

  const settings = globalThis.BGE_SITE_CONFIG?.reviewSettings || {};

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let quoted = false;
    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const next = text[index + 1];
      if (char === '"' && quoted && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === ',' && !quoted) {
        row.push(cell);
        cell = '';
      } else if ((char === '\n' || char === '\r') && !quoted) {
        if (char === '\r' && next === '\n') index += 1;
        row.push(cell);
        if (row.some((value) => value.trim())) rows.push(row);
        row = [];
        cell = '';
      } else {
        cell += char;
      }
    }
    row.push(cell);
    if (row.some((value) => value.trim())) rows.push(row);
    if (rows.length < 2) return [];
    const headers = rows.shift().map((header) => header.trim());
    return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, (values[index] || '').trim()])));
  }

  function field(row, aliases) {
    const normalized = Object.fromEntries(Object.entries(row).map(([key, value]) => [key.replace(/\s+/g, '').toLowerCase(), value]));
    for (const alias of aliases) {
      const value = normalized[alias.replace(/\s+/g, '').toLowerCase()];
      if (value !== undefined) return value;
    }
    return '';
  }

  function isChecked(value) {
    return /^(yes|true|1|y|是|批准|显示|精选|✅|✓)$/i.test(String(value || '').trim());
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function maskName(name) {
    const value = String(name || 'Player').trim();
    if (value.includes('*')) return value;
    if (value.length <= 1) return `${value || 'P'}***`;
    return `${value[0]}***${value[value.length - 1]}`;
  }

  function normalize(row) {
    const approved = field(row, ['批准显示', 'approved', '显示', '审核']);
    if (!isChecked(approved)) return null;
    const ratingRaw = Number(field(row, ['评分', 'rating', '星级'])) || 5;
    return {
      name: maskName(field(row, ['昵称', '姓名', 'name', 'nickname'])),
      product: field(row, ['游戏与商品', '游戏/商品', '游戏', 'product', 'game']) || 'Brilliant Gaming',
      text: field(row, ['评价内容', '评价', 'review', 'comment', 'feedback']),
      date: field(row, ['显示日期', '日期', 'date', 'timestamp']).slice(0, 10),
      rating: Math.min(5, Math.max(1, ratingRaw)),
      featured: isChecked(field(row, ['首页精选', 'featured', '精选'])),
      language: (field(row, ['语言', 'language', 'lang']) || 'zh').toLowerCase()
    };
  }

  function card(review, index) {
    const colorClass = index % 3 === 1 ? ' review-avatar-blue' : (index % 3 === 2 ? ' review-avatar-gold' : '');
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    return `<article class="review-card"><div class="review-card-top"><div class="review-avatar${colorClass}">${escapeHtml(review.name[0] || 'P')}</div><div><div class="review-name">${escapeHtml(review.name)}</div><div class="review-stars" aria-label="${review.rating} / 5">${stars}</div></div><span class="review-badge">${globalThis.BGE_I18N?.isEnglish?.() ? 'Approved' : '已审核'}</span></div><div class="review-product">${escapeHtml(review.product)}</div><p class="review-text">${escapeHtml(review.text)}</p><div class="review-date">${escapeHtml(review.date)}</div></article>`;
  }

  function render(reviews) {
    const english = globalThis.BGE_I18N?.isEnglish?.() || false;
    document.querySelectorAll('[data-review-grid]').forEach((grid) => {
      const scope = grid.dataset.reviewGrid;
      let visible = reviews.filter((review) => review.text && (!review.language || review.language === 'all' || review.language.startsWith(english ? 'en' : 'zh')));
      if (scope === 'home') {
        const featured = visible.filter((review) => review.featured);
        visible = (featured.length ? featured : visible).slice(0, settings.homepageLimit || 3);
      }
      if (visible.length) grid.innerHTML = visible.map(card).join('');
    });
    document.querySelectorAll('[data-review-status]').forEach((node) => {
      node.textContent = english ? 'Approved reviews are updated automatically.' : '已批准的评价会自动更新。';
    });
  }

  async function load() {
    if (!settings.publishedCsvUrl) return;
    try {
      const response = await fetch(settings.publishedCsvUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const reviews = parseCsv(await response.text()).map(normalize).filter(Boolean);
      render(reviews);
    } catch (error) {
      console.warn('Approved reviews could not be loaded; showing local fallback reviews.', error);
    }
  }

  window.addEventListener('bge:languagechange', load);
  window.addEventListener('DOMContentLoaded', load);
})();
