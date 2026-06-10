(function () {
  function initLightbox() {
    var modal = document.getElementById('image-lightbox');
    if (!modal) return;

    var img = modal.querySelector('.lightbox-img');
    var caption = modal.querySelector('.lightbox-caption');
    var closeBtn = modal.querySelector('.lightbox-close');

    function open(src, alt) {
      img.src = src;
      img.alt = alt || '';
      caption.textContent = alt || '';
      modal.classList.add('is-active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('lightbox-open');
    }

    function close() {
      modal.classList.remove('is-active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('lightbox-open');
      img.src = '';
    }

    document.querySelectorAll('[data-lightbox]').forEach(function (el) {
      el.addEventListener('click', function () {
        var pngSrc = el.getAttribute('src');
        var webpSrc = el.dataset.webpSrc;
        open(pngSrc || webpSrc, el.alt);
      });
    });

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  function initNavbar() {
    var burger = document.querySelector('.navbar-burger');
    var menu = document.getElementById('navMenu');
    if (!burger || !menu) return;
    burger.addEventListener('click', function () {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
    });
    menu.querySelectorAll('.navbar-item').forEach(function (item) {
      item.addEventListener('click', function () {
        burger.classList.remove('is-active');
        menu.classList.remove('is-active');
      });
    });
  }

  function initSmoothScroll() {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  function initScrollSpy() {
    var navItems = Array.from(document.querySelectorAll('.navbar-item[href^="#"]'));
    var sections = navItems
      .map(function (item) {
        return document.querySelector(item.getAttribute('href'));
      })
      .filter(Boolean);

    if (!sections.length) return;

    function updateActiveNav() {
      var scrollPos = window.scrollY + 120;
      var current = sections[0];
      sections.forEach(function (section) {
        if (section.offsetTop <= scrollPos) current = section;
      });
      navItems.forEach(function (item) {
        var active = item.getAttribute('href') === '#' + current.id;
        item.classList.toggle('is-active', active);
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  function initBibTeXCopy() {
    var btn = document.getElementById('copy-bibtex');
    var code = document.getElementById('bibtex-code');
    if (!btn || !code) return;

    btn.addEventListener('click', async function () {
      var text = code.textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied!';
        btn.classList.add('is-success');
      } catch (_err) {
        btn.textContent = 'Copy failed';
      }
      window.setTimeout(function () {
        btn.textContent = 'Copy BibTeX';
        btn.classList.remove('is-success');
      }, 1800);
    });
  }

  function initAll() {
    initLightbox();
    initNavbar();
    initSmoothScroll();
    initScrollSpy();
    initBibTeXCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
