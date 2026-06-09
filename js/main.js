/* danielaximenes.arte — tiny enhancements. The site works fine without this. */

// --- Mobile nav toggle ---
(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // close the menu after tapping a link
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();

// --- Gentle scroll-reveal ---
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !items.length) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();

// --- Footer year ---
function setFooterYear() {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

// --- Language toggle (PT / EN) ---
// English text lives in the HTML; the Portuguese version is in a data-pt
// attribute on the same element. We cache the English as data-en on load,
// then swap innerHTML between the two. Choice is saved in localStorage.
(function () {
  var KEY = 'lang';
  var SUPPORTED = ['pt', 'en'];
  var nodes = document.querySelectorAll('[data-pt]');

  // cache the English markup already in the page
  nodes.forEach(function (el) {
    el.setAttribute('data-en', el.innerHTML);
  });

  function apply(lang) {
    nodes.forEach(function (el) {
      var html = el.getAttribute('data-' + lang);
      if (html != null) el.innerHTML = html;
    });
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-lang-opt]').forEach(function (s) {
      s.classList.toggle('is-active', s.getAttribute('data-lang-opt') === lang);
    });
    setFooterYear(); // year span gets recreated when innerHTML is swapped
  }

  function current() {
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    return SUPPORTED.indexOf(saved) > -1 ? saved : 'pt'; // default: Portuguese
  }

  apply(current());

  var toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('lang') === 'pt' ? 'en' : 'pt';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
  }
})();
