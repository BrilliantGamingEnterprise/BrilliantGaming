(() => {
  'use strict';

  const settings = globalThis.BGE_SITE_CONFIG?.promotionSettings;
  if (!settings?.enabled) return;

  const previewMode = new URLSearchParams(window.location.search).get('preview') === 'promotion';
  const now = Date.now();
  const configuredSlides = Array.isArray(settings.slides) && settings.slides.length
    ? settings.slides
    : (settings.image ? [settings] : []);
  const slides = configuredSlides.filter((slide) => {
    if (!slide?.image) return false;
    const startsAt = slide.startsAt ? Date.parse(slide.startsAt) : 0;
    const endsAt = slide.endsAt ? Date.parse(slide.endsAt) : Number.POSITIVE_INFINITY;
    return (!Number.isFinite(startsAt) || now >= startsAt)
      && (!Number.isFinite(endsAt) || now < endsAt);
  });

  if (!slides.length) return;

  const storageKey = `bge-promotion-seen:${settings.id || slides.map((slide) => slide.id).join(':')}`;
  const showOnEveryVisit = settings.showOnEveryVisit === true;
  const repeatAfter = Math.max(1, Number(settings.frequencyHours) || 24) * 60 * 60 * 1000;

  function getLastSeen() {
    try {
      return Number(localStorage.getItem(storageKey)) || 0;
    } catch (error) {
      return 0;
    }
  }

  function markSeen() {
    if (previewMode || showOnEveryVisit) return;
    try {
      localStorage.setItem(storageKey, String(Date.now()));
    } catch (error) {
      // 隐私模式或禁用储存时仍可正常显示活动。
    }
  }

  if (!previewMode && !showOnEveryVisit && now - getLastSeen() < repeatAfter) return;

  function isEnglish() {
    return document.documentElement.lang.toLowerCase().startsWith('en')
      || new URLSearchParams(window.location.search).get('lang') === 'en';
  }

  function createPopup() {
    const english = isEnglish();
    const whatsappNumber = globalThis.BGE_SITE_CONFIG?.catalogSettings?.whatsappNumber || '';
    const overlay = document.createElement('div');
    overlay.className = 'campaign-popup';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="campaign-popup-dialog" role="dialog" aria-modal="true" aria-describedby="campaignPopupDescription">
        <button class="campaign-popup-close" type="button" aria-label="${english ? 'Close promotion' : '关闭活动'}" data-campaign-close>×</button>
        <a class="campaign-popup-link" href="#" target="_blank" rel="noopener" data-campaign-contact>
          <img class="campaign-popup-image" src="" alt="" width="1672" height="941" data-campaign-image />
        </a>
        <button class="campaign-popup-arrow campaign-popup-prev" type="button" aria-label="${english ? 'Previous promotion' : '上一个活动'}" data-campaign-prev>‹</button>
        <button class="campaign-popup-arrow campaign-popup-next" type="button" aria-label="${english ? 'Next promotion' : '下一个活动'}" data-campaign-next>›</button>
        <div class="campaign-popup-dots" role="tablist" aria-label="${english ? 'Promotion slides' : '活动图片'}">
          ${slides.map((slide, index) => `
            <button class="campaign-popup-dot" type="button" role="tab" aria-label="${english ? `Promotion ${index + 1}` : `活动 ${index + 1}`}" aria-selected="false" data-campaign-dot="${index}"></button>
          `).join('')}
        </div>
        <p class="campaign-popup-sr-only" id="campaignPopupDescription"></p>
      </div>
    `;

    const dialog = overlay.querySelector('.campaign-popup-dialog');
    const closeButton = overlay.querySelector('[data-campaign-close]');
    const contactLink = overlay.querySelector('[data-campaign-contact]');
    const campaignImage = overlay.querySelector('[data-campaign-image]');
    const previousButton = overlay.querySelector('[data-campaign-prev]');
    const nextButton = overlay.querySelector('[data-campaign-next]');
    const dotButtons = Array.from(overlay.querySelectorAll('[data-campaign-dot]'));
    const description = overlay.querySelector('#campaignPopupDescription');
    const multipleSlides = slides.length > 1;
    const autoAdvanceMs = Math.max(3000, Number(settings.autoAdvanceMs) || 5200);
    let currentIndex = 0;
    let autoAdvanceTimer = 0;
    let pointerStartX = null;
    let previousFocus = document.activeElement;

    function getSlideText(slide) {
      return english ? (slide.altEn || slide.altZh || '') : (slide.altZh || slide.altEn || '');
    }

    function getWhatsappUrl(slide) {
      const message = english
        ? (slide.whatsappMessageEn || slide.whatsappMessageZh || '')
        : (slide.whatsappMessageZh || slide.whatsappMessageEn || '');
      return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    }

    function preloadNextSlide() {
      if (!multipleSlides) return;
      const image = new Image();
      image.src = slides[(currentIndex + 1) % slides.length].image;
    }

    function showSlide(index, { track = true } = {}) {
      currentIndex = (index + slides.length) % slides.length;
      const slide = slides[currentIndex];
      const altText = getSlideText(slide);

      campaignImage.classList.add('is-changing');
      window.setTimeout(() => {
        campaignImage.src = slide.image;
        campaignImage.alt = altText;
        contactLink.href = getWhatsappUrl(slide);
        description.textContent = altText;
        dotButtons.forEach((button, dotIndex) => {
          const active = dotIndex === currentIndex;
          button.classList.toggle('active', active);
          button.setAttribute('aria-selected', String(active));
          button.tabIndex = active ? 0 : -1;
        });
        campaignImage.classList.remove('is-changing');
        preloadNextSlide();
      }, 100);

      if (track) {
        globalThis.BGE_ANALYTICS?.track?.('view_promotion', {
          promotion_id: slide.id || `campaign-${currentIndex + 1}`,
          creative_slot: `homepage-popup-${currentIndex + 1}`
        });
      }
    }

    function stopAutoAdvance() {
      window.clearInterval(autoAdvanceTimer);
      autoAdvanceTimer = 0;
    }

    function startAutoAdvance() {
      stopAutoAdvance();
      if (!multipleSlides || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      autoAdvanceTimer = window.setInterval(() => showSlide(currentIndex + 1), autoAdvanceMs);
    }

    function goToSlide(index) {
      showSlide(index);
      startAutoAdvance();
    }

    function closePopup() {
      stopAutoAdvance();
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('campaign-popup-open');
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.setTimeout(() => {
        overlay.remove();
        if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
      }, 240);
    }

    function onKeydown(event) {
      if (event.key === 'Escape') {
        closePopup();
        return;
      }
      if (event.key === 'ArrowLeft' && multipleSlides) {
        event.preventDefault();
        goToSlide(currentIndex - 1);
        return;
      }
      if (event.key === 'ArrowRight' && multipleSlides) {
        event.preventDefault();
        goToSlide(currentIndex + 1);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = Array.from(dialog.querySelectorAll('button:not([tabindex="-1"]), a[href]'));
      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }

    function onVisibilityChange() {
      if (document.hidden) stopAutoAdvance();
      else startAutoAdvance();
    }

    previousButton.hidden = !multipleSlides;
    nextButton.hidden = !multipleSlides;
    overlay.querySelector('.campaign-popup-dots').hidden = !multipleSlides;
    closeButton.addEventListener('click', closePopup);
    previousButton.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
    dotButtons.forEach((button) => {
      button.addEventListener('click', () => goToSlide(Number(button.dataset.campaignDot)));
    });
    contactLink.addEventListener('click', () => {
      const slide = slides[currentIndex];
      globalThis.BGE_ANALYTICS?.track?.('select_content', {
        content_type: 'promotion',
        item_id: slide.id || `campaign-${currentIndex + 1}`
      });
      closePopup();
    });
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closePopup();
    });
    dialog.addEventListener('mouseenter', stopAutoAdvance);
    dialog.addEventListener('mouseleave', startAutoAdvance);
    dialog.addEventListener('focusin', stopAutoAdvance);
    dialog.addEventListener('focusout', () => window.setTimeout(() => {
      if (!dialog.contains(document.activeElement)) startAutoAdvance();
    }, 0));
    dialog.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse') pointerStartX = event.clientX;
    });
    dialog.addEventListener('pointerup', (event) => {
      if (pointerStartX === null) return;
      const distance = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(distance) < 45) return;
      goToSlide(currentIndex + (distance < 0 ? 1 : -1));
    });

    document.body.appendChild(overlay);
    document.body.classList.add('campaign-popup-open');
    markSeen();
    showSlide(0, { track: false });
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.requestAnimationFrame(() => {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      closeButton.focus({ preventScroll: true });
      startAutoAdvance();
    });
  }

  const ready = () => window.setTimeout(createPopup, Math.max(0, Number(settings.delayMs) || 0));
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  } else {
    ready();
  }
})();
