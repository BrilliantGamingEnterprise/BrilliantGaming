(() => {
  'use strict';

  const measurementId = 'G-MG9CK2YDHG';
  const consentKey = 'bge-analytics-consent-v1';
  const analyticsDenied = localStorage.getItem(consentKey) === 'denied';
  const allowedEvents = new Set([
    'page_view',
    'view_item',
    'select_content',
    'view_search_results',
    'add_to_cart',
    'remove_from_cart',
    'view_cart',
    'begin_checkout',
    'generate_lead',
    'contact_open',
    'contact_click',
    'change_language',
    'change_currency'
  ]);
  const allowedParameters = new Set([
    'site_language',
    'page_type',
    'page_title',
    'page_location',
    'page_path',
    'content_type',
    'item_id',
    'item_name',
    'item_category',
    'item_category2',
    'item_list_name',
    'currency',
    'value',
    'price',
    'quantity',
    'items',
    'result_count',
    'has_results',
    'contact_method',
    'contact_context',
    'contact_mode',
    'lead_source'
  ]);
  const allowedItemParameters = new Set([
    'item_id',
    'item_name',
    'item_category',
    'item_category2',
    'price',
    'quantity'
  ]);

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('consent', 'default', {
    analytics_storage: analyticsDenied ? 'denied' : 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  window.gtag('config', measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  if (!analyticsDenied) {
    const loader = document.createElement('script');
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(loader);
  }

  function siteLanguage() {
    return document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'zh';
  }

  function cleanString(value, maximumLength = 100) {
    return String(value || '').trim().slice(0, maximumLength);
  }

  function cleanNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  }

  function cleanItems(items) {
    if (!Array.isArray(items)) return [];
    return items.slice(0, 25).map((item) => {
      const cleaned = {};
      Object.entries(item || {}).forEach(([key, value]) => {
        if (!allowedItemParameters.has(key)) return;
        cleaned[key] = key === 'price' || key === 'quantity'
          ? cleanNumber(value)
          : cleanString(value);
      });
      return cleaned;
    }).filter((item) => item.item_id || item.item_name);
  }

  function cleanParameters(parameters) {
    const cleaned = {};
    Object.entries(parameters || {}).forEach(([key, value]) => {
      if (!allowedParameters.has(key) || value === undefined || value === null) return;
      if (key === 'items') {
        cleaned.items = cleanItems(value);
      } else if (['value', 'price', 'quantity', 'result_count'].includes(key)) {
        cleaned[key] = cleanNumber(value);
      } else if (typeof value === 'boolean') {
        cleaned[key] = value;
      } else {
        cleaned[key] = cleanString(value, key === 'page_location' ? 300 : 100);
      }
    });
    return cleaned;
  }

  function track(eventName, parameters = {}) {
    if (localStorage.getItem(consentKey) === 'denied') return;
    if (!allowedEvents.has(eventName)) return;
    window.gtag('event', eventName, cleanParameters({
      site_language: siteLanguage(),
      page_type: document.body?.dataset.page || 'unknown',
      ...parameters
    }));
  }

  function safePagePath() {
    try {
      const current = new URL(window.location.href);
      const safeQuery = new URLSearchParams();
      ['category', 'game', 'lang'].forEach((key) => {
        const value = current.searchParams.get(key);
        if (value) safeQuery.set(key, value);
      });
      const query = safeQuery.toString();
      return `${current.pathname}${query ? `?${query}` : ''}`;
    } catch (error) {
      return window.location.pathname || '/';
    }
  }

  function trackInitialPage() {
    const pagePath = safePagePath();
    track('page_view', {
      page_title: document.title,
      page_location: `${window.location.origin}${pagePath}`,
      page_path: pagePath
    });

    if (document.body?.dataset.page === 'game' && document.body.dataset.gameId) {
      const query = new URLSearchParams(window.location.search);
      track('view_item', {
        items: [{
          item_id: document.body.dataset.gameId,
          item_name: document.getElementById('detailTitle')?.textContent || document.body.dataset.gameId,
          item_category: query.get('category') || document.body.dataset.gameCategory || ''
        }]
      });
    }
  }

  function contactMethod(node) {
    if (node.classList.contains('whatsapp')) return 'whatsapp';
    if (node.classList.contains('instagram')) return 'instagram';
    if (node.classList.contains('wechat')) return 'wechat';
    return 'other';
  }

  let searchTimer = null;
  document.addEventListener('input', (event) => {
    if (!event.target.matches('#searchInput, .search-box input')) return;
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(() => {
      if (!String(event.target.value || '').trim()) return;
      const resultCount = document.querySelectorAll('#searchResultsGrid .game-card').length;
      track('view_search_results', {
        result_count: resultCount,
        has_results: resultCount > 0
      });
    }, 700);
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    const gameCard = target.closest?.('.game-card[data-game-id]');
    if (gameCard) {
      track('select_content', {
        content_type: 'game',
        item_id: gameCard.dataset.gameId,
        item_category: gameCard.dataset.category || ''
      });
    }

    if (target.closest?.('[data-contact-open]')) {
      track('contact_open', {
        contact_context: document.body?.dataset.page || 'unknown'
      });
    }

    const contactCard = target.closest?.('.contact-method-card');
    if (contactCard) {
      const method = contactMethod(contactCard);
      const modal = contactCard.closest('#contactModal');
      const mode = modal?.dataset.contactMode || 'default';
      track('contact_click', {
        contact_method: method,
        contact_context: document.body?.dataset.page || 'unknown',
        contact_mode: mode
      });
      if (method === 'whatsapp') {
        track('generate_lead', {
          lead_source: mode === 'order' ? 'copied_order' : (mode === 'inquiry' ? 'inquiry' : 'general_contact'),
          contact_method: method
        });
      }
    }
  });

  window.addEventListener('bge:languagechange', (event) => {
    track('change_language', {
      site_language: event.detail?.language === 'en' ? 'en' : 'zh'
    });
  });

  window.BGE_ANALYTICS = Object.freeze({
    measurementId,
    track
  });

  const ready = () => window.setTimeout(trackInitialPage, 0);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  } else {
    ready();
  }
})();
