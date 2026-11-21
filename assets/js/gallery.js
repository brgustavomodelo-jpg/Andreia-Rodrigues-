/* By Andreia Rodrigues® — gallery.js (v3): lightbox */
(function () {
  var W = window, d = document, B = W.__bar = W.__bar || {};
  if (B.gal) return; // evita inicialização duplicada
  var lb = d.getElementById('lb'); if (!lb) return;
  var im = lb.querySelector('img'), ct = lb.querySelector('.ct'), X = lb.querySelector('.x'),
    P = lb.querySelector('.pv'), N = lb.querySelector('.nx'),
    btns = Array.prototype.slice.call(d.querySelectorAll('.mas button')),
    i = 0, last = null, isOpen = false, tok = 0, total = btns.length;

  function lock() { if (B.lock) B.lock(); else { d.documentElement.classList.add('lock'); d.body.classList.add('lock'); } }
  function unlock() { if (B.unlock) B.unlock(); else { d.documentElement.classList.remove('lock'); d.body.classList.remove('lock'); } }
  function wrap(k) { return (k + total) % total; }
  function srcOf(k) { return btns[wrap(k)].querySelector('img').getAttribute('src'); }

  function show() {
    var s = btns[i].querySelector('img'), src = s.getAttribute('src'), t = ++tok, tries = 0;
    lb.classList.remove('err');
    im.style.animation = 'none'; void im.offsetWidth; im.style.animation = '';
    im.alt = s.alt; ct.textContent = (i + 1) + ' / ' + total;
    im.onload = function () { if (t === tok) lb.classList.remove('err'); };
    im.onerror = function () {
      if (t !== tok) return;
      if (tries++ < 1) im.src = src + '?r=' + Date.now(); else lb.classList.add('err');
    };
    im.src = src;
  }
  function open(k) {
    if (isOpen) return;
    isOpen = true; i = k; last = d.activeElement;
    show(); lb.classList.add('open'); lock();
    X.focus({ preventScroll: true });
  }
  function close() {
    if (!isOpen) return;
    isOpen = false; tok++; im.onload = im.onerror = null;
    lb.classList.remove('open', 'err'); im.removeAttribute('src');
    unlock();
    if (last && last.focus) last.focus({ preventScroll: true });
  }
  function step(n) {
    if (!isOpen) return;
    i = wrap(i + n); show();
    (new Image()).src = srcOf(i + n); (new Image()).src = srcOf(i - n); // pré-carrega vizinhas
  }

  btns.forEach(function (b, k) { b.addEventListener('click', function () { open(k); }); });
  X.addEventListener('click', close);
  P.addEventListener('click', function () { step(-1); });
  N.addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  d.addEventListener('keydown', function (e) {
    if (!isOpen) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Tab') {
      var q = lb.querySelectorAll('button'), f = q[0], l = q[q.length - 1];
      if (e.shiftKey && d.activeElement === f) { e.preventDefault(); l.focus(); }
      else if (!e.shiftKey && d.activeElement === l) { e.preventDefault(); f.focus(); }
    }
  });
  var sx = 0, sy = 0, tr = false;
  lb.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { tr = false; return; }
    tr = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (!tr) return; tr = false;
    var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) step(dx < 0 ? 1 : -1);
  }, { passive: true });
  lb.addEventListener('touchcancel', function () { tr = false; }, { passive: true });
  B.gal = 1;
})();
