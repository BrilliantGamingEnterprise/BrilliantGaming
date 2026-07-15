(() => {
  'use strict';

  const siteUrl = 'https://brilliantgamingtopup.com';

  function language() {
    return document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'zh';
  }

  function setMeta(selector, attributes, content) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement('meta');
      Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
      document.head.appendChild(node);
    }
    node.setAttribute('content', content);
  }

  function setLink(selector, attributes, href) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement('link');
      Object.entries(attributes).forEach(([name, value]) => node.setAttribute(name, value));
      document.head.appendChild(node);
    }
    node.href = href;
  }

  function setJsonLd(id, payload) {
    let node = document.getElementById(id);
    if (!node) {
      node = document.createElement('script');
      node.id = id;
      node.type = 'application/ld+json';
      document.head.appendChild(node);
    }
    node.textContent = JSON.stringify(payload);
  }

  function staticPath() {
    const pathname = window.location.pathname || '/';
    if (pathname === '/' || pathname.endsWith('/index.html')) return '/';
    const filename = pathname.split('/').pop();
    return filename ? `/${filename}` : '/';
  }

  function languageUrl(baseUrl, code) {
    const url = new URL(baseUrl);
    if (code === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    return url.href;
  }

  function applyStaticSeo() {
    if (!document.body || document.body.dataset.page === 'game' || document.body.dataset.page === 'admin') return;

    const baseUrl = `${siteUrl}${staticPath()}`;
    const zhUrl = languageUrl(baseUrl, 'zh');
    const enUrl = languageUrl(baseUrl, 'en');
    const canonicalUrl = language() === 'en' ? enUrl : zhUrl;
    const description = document.head.querySelector('meta[name="description"]')?.content || '';

    setLink('link[rel="canonical"]', { rel: 'canonical' }, canonicalUrl);
    setLink('link[rel="alternate"][hreflang="zh-Hans"]', { rel: 'alternate', hreflang: 'zh-Hans' }, zhUrl);
    setLink('link[rel="alternate"][hreflang="en"]', { rel: 'alternate', hreflang: 'en' }, enUrl);
    setLink('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default' }, zhUrl);
    setMeta('meta[property="og:title"]', { property: 'og:title' }, document.title);
    setMeta('meta[property="og:description"]', { property: 'og:description' }, description);
    setMeta('meta[property="og:type"]', { property: 'og:type' }, 'website');
    setMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);
    setMeta('meta[property="og:locale"]', { property: 'og:locale' }, language() === 'en' ? 'en_MY' : 'zh_MY');
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary');
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, document.title);
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description);

    if (document.body.dataset.page === 'home') {
      setJsonLd('bge-organization-schema', {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Brilliant Gaming',
        url: `${siteUrl}/`,
        logo: `${siteUrl}/assets/images/brilliant-gaming-logo.png`,
        areaServed: ['MY', 'SG']
      });
      setJsonLd('bge-website-schema', {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Brilliant Gaming',
        url: `${siteUrl}/`,
        inLanguage: ['zh-CN', 'en']
      });
    }
  }

  window.addEventListener('bge:languagechange', () => window.setTimeout(applyStaticSeo, 0));
  const ready = () => window.setTimeout(applyStaticSeo, 0);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  } else {
    ready();
  }
})();
