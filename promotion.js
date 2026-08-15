(() => {
  'use strict';

  const settings = globalThis.BGE_SITE_CONFIG?.promotionSettings;
  if (!settings?.enabled || !settings.image) return;

  const previewMode = new URLSearchParams(window.location.search).get('preview') === 'promotion';
  const storageKey = `bge-promotion-seen:${settings.id || settings.image}`;
  const now = Date.now();
  const startsAt = settings.startsAt ? Date.parse(settings.startsAt) : 0;
  const endsAt = settings.endsAt ? Date.parse(settings.endsAt) : Number.POSITIVE_INFINITY;
  const repeatAfter = Math.max(1, Number(settings.frequencyHours) || 24) * 60 * 60 * 1000;

  if ((Number.isFinite(startsAt) && now < startsAt) || (Number.isFinite(endsAt) && now >= endsAt)) return;

  function getLastSeen() {
    try {
      return Number(localStorage.getItem(storageKey)) || 0;
    } catch (error) {
      return 0;
    }
  }

  function markSeen() {
    if (previewMode) return;
    try {
      localStorage.setItem(storageKey, String(Date.now()));
    } catch (error) {
      // 隐私模式或禁用储存时仍可正常显示活动。
    }
  }

  if (!previewMode && now - getLastSeen() < repeatAfter) return;

  function isEnglish() {
    return document.documentElement.lang.toLowerCase().startsWith('en')
      || new URLSearchParams(window.location.search).get('lang') === 'en';
  }

  function createPopup() {
    const english = isEnglish();
    const altText = english ? (settings.altEn || settings.altZh) : settings.altZh;
    const message = english ? settings.whatsappMessageEn : settings.whatsappMessageZh;
    const whatsappNumber = globalThis.BGE_SITE_CONFIG?.catalogSettings?.whatsappNumber || '';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message || '')}`;
    const overlay = document.createElement('div');
    overlay.className = 'campaign-popup';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="campaign-popup-dialog" role="dialog" aria-modal="true" aria-labelledby="campaignPopupDescription">
        <button class="campaign-popup-close" type="button" aria-label="${english ? 'Close promotion' : '关闭活动'}" data-campaign-close>×</button>
        <a class="campaign-popup-link" href="${whatsappUrl}" target="_blank" rel="noopener" data-campaign-contact>
          <img class="campaign-popup-image" src="${settings.image}" alt="${altText || ''}" width="1672" height="941" />
        </a>
        <p class="campaign-popup-sr-only" id="campaignPopupDescription">${altText || ''}</p>
      </div>
    `;

    const closeButton = overlay.querySelector('[data-campaign-close]');
    const contactLink = overlay.querySelector('[data-campaign-contact]');
    let previousFocus = document.activeElement;

    function closePopup() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('campaign-popup-open');
      document.removeEventListener('keydown', onKeydown);
      window.setTimeout(() => {
        overlay.remove();
        if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
      }, 240);
    }

    function onKeydown(event) {
      if (event.key === 'Escape') closePopup();
      if (event.key !== 'Tab') return;
      const focusable = [closeButton, contactLink];
      const currentIndex = focusable.indexOf(document.activeElement);
      if (event.shiftKey && currentIndex <= 0) {
        event.preventDefault();
        contactLink.focus();
      } else if (!event.shiftKey && currentIndex === focusable.length - 1) {
        event.preventDefault();
        closeButton.focus();
      }
    }

    closeButton.addEventListener('click', closePopup);
    contactLink.addEventListener('click', () => {
      globalThis.BGE_ANALYTICS?.track?.('select_content', {
        content_type: 'promotion',
        item_id: settings.id || 'campaign'
      });
      closePopup();
    });
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closePopup();
    });

    document.body.appendChild(overlay);
    document.body.classList.add('campaign-popup-open');
    markSeen();
    document.addEventListener('keydown', onKeydown);
    window.requestAnimationFrame(() => {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      closeButton.focus({ preventScroll: true });
    });
  }

  const ready = () => window.setTimeout(createPopup, Math.max(0, Number(settings.delayMs) || 0));
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  } else {
    ready();
  }
})();
