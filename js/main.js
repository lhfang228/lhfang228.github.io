(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = mobileNav.hidden;
      mobileNav.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var copyBtn = document.getElementById('copy-bibtex');
  var toast = document.getElementById('toast');
  var toastTimer;
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-bibtex') || '';
      if (!text) {
        return;
      }
      navigator.clipboard.writeText(text).then(function () {
        copyBtn.classList.add('copied');
        copyBtn.textContent = 'Copied';
        if (toast) {
          toast.hidden = false;
          clearTimeout(toastTimer);
          toastTimer = setTimeout(function () {
            toast.hidden = true;
          }, 2000);
        }
        setTimeout(function () {
          copyBtn.classList.remove('copied');
          copyBtn.textContent = 'BibTeX';
        }, 1800);
      });
    });
  }

  var navLinks = document.querySelectorAll('[data-nav], [data-nav-mobile]');
  var sections = [];
  var linkMap = {};

  navLinks.forEach(function (link) {
    var id = link.getAttribute('href');
    if (!id || id.charAt(0) !== '#') {
      return;
    }
    if (!linkMap[id]) {
      linkMap[id] = [];
      var section = document.querySelector(id);
      if (section) {
        sections.push({ id: id, section: section });
      }
    }
    linkMap[id].push(link);
  });

  function setActive(id) {
    navLinks.forEach(function (l) {
      l.classList.remove('is-active');
    });
    if (linkMap[id]) {
      linkMap[id].forEach(function (l) {
        l.classList.add('is-active');
      });
    }
  }

  if (sections.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );
    sections.forEach(function (item) {
      observer.observe(item.section);
    });
  }
})();
