(function () {
  var doc = document.documentElement;
  doc.classList.remove('no-js');

  // Mobile menu
  var body = document.body;
  var toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    var setOpen = function (open) {
      if (open) body.style.setProperty('--panel-top', document.querySelector('.site-header').getBoundingClientRect().bottom + 'px');
      body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function () { setOpen(!body.classList.contains('menu-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    document.querySelectorAll('.nav-panel a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    window.matchMedia('(min-width: 981px)').addEventListener('change', function (m) { if (m.matches) setOpen(false); });
  }

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Count-up stats
  var nums = document.querySelectorAll('[data-count]');
  var run = function (el) {
    var target = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
    var suffix = el.dataset.suffix || '', start = null, dur = 1400;
    var step = function (t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1), v = target * (1 - Math.pow(1 - p, 3));
      el.textContent = (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-GB')) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { co.observe(el); });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
