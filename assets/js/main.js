/* By Andreia Rodrigues® — main.js (v3)
   Menu, transições de página, revelação de conteúdo, parallax, botões flutuantes,
   tratamento de imagens. Nenhuma biblioteca externa.
   Regra: o conteúdo NUNCA depende deste arquivo para ficar visível (ver rede de segurança no <head>). */
(function () {
  var W = window, d = document, b = d.body, B = W.__bar = W.__bar || {};
  if (B.main) return; // evita inicialização duplicada
  var rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var $ = function (s) { return d.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(d.querySelectorAll(s)); };
  var raf = W.requestAnimationFrame ? W.requestAnimationFrame.bind(W) : function (f) { return setTimeout(f, 16); };
  var cv = $('.cv'), hd = $('header'), bg = $('.bg'), fab = $('.fab'), top = $('.top');

  /* ---------- trava de scroll (menu e lightbox) ---------- */
  var locks = 0, ly = 0, root = d.documentElement;
  B.lock = function () {
    if (locks++ === 0) { ly = W.pageYOffset; root.classList.add('lock'); b.classList.add('lock'); }
  };
  B.unlock = function () {
    if (locks === 0) return;
    if (--locks === 0) {
      root.classList.remove('lock'); b.classList.remove('lock');
      if (Math.abs(W.pageYOffset - ly) > 1) W.scrollTo(0, ly); // restaura a posição exata
    }
  };

  /* ---------- menu ---------- */
  function menu(o) {
    if (!hd || !bg || o === hd.classList.contains('open')) return;
    hd.classList.toggle('open', o);
    bg.setAttribute('aria-expanded', String(o));
    bg.setAttribute('aria-label', o ? 'Fechar menu' : 'Abrir menu');
    o ? B.lock() : B.unlock();
  }
  if (bg) bg.addEventListener('click', function () { menu(!hd.classList.contains('open')); });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hd && hd.classList.contains('open')) { menu(false); if (bg) bg.focus(); }
  });
  addEventListener('resize', function () { if (innerWidth > 900) menu(false); });

  /* ---------- transição entre páginas ---------- */
  var going = false;
  function clearGo() { going = false; if (cv) cv.classList.remove('go'); }
  if (cv) {
    // cortina inicial: se a animação CSS não rodar, não pode ficar cobrindo o site
    setTimeout(function () { if (!cv.classList.contains('go')) cv.style.display = 'none'; }, 2500);
    $$('a[data-pg]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button > 0 || rm) return;
        var u = new URL(a.href, location.href);
        if (u.pathname === location.pathname && !u.hash) return;
        e.preventDefault();
        if (going) return;
        going = true; cv.style.display = ''; cv.classList.add('go');
        setTimeout(function () { location.href = a.href; }, 620);
        setTimeout(function () { if (going) clearGo(); }, 4000); // navegação não ocorreu: libera a tela
      });
    });
  }
  addEventListener('pageshow', function () { clearGo(); }); // voltar/avançar (bfcache) nunca deixa a cortina travada
  d.addEventListener('visibilitychange', function () { if (!d.hidden && going) clearGo(); });

  /* ---------- revelação de conteúdo ----------
     Baseada em getBoundingClientRect (não em IntersectionObserver): o IO do Chrome/Android ignora
     elementos totalmente recortados por clip-path e nunca os "vê" — era isso que escondia as fotos. */
  var pend = $$('.rv,.mk');
  function reveal() {
    if (!pend.length) return;
    var vh = innerHeight || root.clientHeight;
    pend = pend.filter(function (e) {
      var r = e.getBoundingClientRect();
      if (r.top < vh * 0.94 - Math.min(r.height * 0.12, vh * 0.15)) { // visível, ou já ficou para trás
        e.classList.add('in');
        if (e.classList.contains('mk')) setTimeout(function () { e.classList.add('done'); }, 1800);
        return false;
      }
      return true;
    });
  }
  var sweep = setInterval(function () { if (!pend.length) clearInterval(sweep); else reveal(); }, 500);

  /* ---------- parallax + botões flutuantes ---------- */
  var P = $$('[data-speed]'), tk = false, hc = $('.h-cta'), ft = $('footer');
  function fabState() {
    var vh = innerHeight, off = false, f = ft ? ft.getBoundingClientRect().top < vh - 60 : false;
    if (fab) {
      if (f) off = true;
      if (hc && innerWidth <= 900) { var r = hc.getBoundingClientRect(); if (r.bottom > 0 && r.top < vh) off = true; }
      fab.classList.toggle('off', off);
    }
    if (top) top.classList.toggle('rt', f);
  }
  function upd() {
    tk = false;
    var vh = innerHeight;
    if (!rm) P.forEach(function (e) {
      var r = e.parentNode.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      e.style.transform = 'translate3d(0,' + ((r.top + r.height / 2 - vh / 2) * -e.dataset.speed).toFixed(1) + 'px,0)';
    });
    if (top) top.classList.toggle('on', W.pageYOffset > 700);
    fabState(); reveal();
  }
  function sched() { if (!tk) { tk = true; raf(upd); } }
  addEventListener('scroll', sched, { passive: true });
  addEventListener('resize', sched);
  addEventListener('orientationchange', function () { sched(); setTimeout(sched, 350); setTimeout(sched, 900); });
  addEventListener('pageshow', sched);
  addEventListener('load', function () { sched(); setTimeout(sched, 400); });
  d.addEventListener('visibilitychange', function () { if (!d.hidden) sched(); });
  if (top) top.addEventListener('click', function () { W.scrollTo({ top: 0, behavior: rm ? 'auto' : 'smooth' }); });
  var y = $('#yr'); if (y) y.textContent = new Date().getFullYear();
  upd();

  /* ---------- imagens: erro, nova tentativa e pré-carregamento ---------- */
  function box(i) { return i.closest('.mk,.h-main,.h-f,.fan a') || i.parentNode; }
  function bust(s) { return s.replace(/[?&]r=\d+$/, '') + (s.indexOf('?') > -1 ? '&' : '?') + 'r=' + Date.now(); }
  function bad(i) {
    if (i.closest('#lb')) return; // o lightbox trata os próprios erros
    var s = i.getAttribute('src'); if (!s) return;
    if (i.getAttribute('data-retry')) { i.classList.add('is-err'); box(i).classList.add('img-err'); return; }
    i.setAttribute('data-retry', '1');
    setTimeout(function () { i.src = bust(s); }, 1200);
  }
  d.addEventListener('error', function (e) { if (e.target && e.target.tagName === 'IMG') bad(e.target); }, true);
  d.addEventListener('load', function (e) {
    var i = e.target; if (i && i.tagName === 'IMG' && i.classList.contains('is-err')) { i.classList.remove('is-err'); box(i).classList.remove('img-err'); }
  }, true);
  $$('img').forEach(function (i) { if (i.complete && i.naturalWidth === 0 && i.getAttribute('src')) bad(i); });
  addEventListener('online', function () {
    $$('img.is-err').forEach(function (i) { i.removeAttribute('data-retry'); i.src = bust(i.getAttribute('src')); });
  });
  // Depois que a página carregou, baixa em segundo plano as imagens "lazy" (2 por vez, mais próximas primeiro),
  // para que estejam prontas quando a pessoa chegar nelas. Respeita economia de dados e conexões lentas.
  function warm() {
    var c = navigator.connection || {};
    if (c.saveData || /2g|3g/.test(c.effectiveType || '')) return;
    var L = $$('img[loading="lazy"]').filter(function (i) { return !i.closest('#lb'); });
    L.sort(function (a, z) { return Math.abs(a.getBoundingClientRect().top) - Math.abs(z.getBoundingClientRect().top); });
    var n = 0;
    (function next() {
      L.slice(n, n + 2).forEach(function (i) { i.loading = 'eager'; });
      n += 2; if (n < L.length) setTimeout(next, 350);
    })();
  }
  var idle = W.requestIdleCallback ? function (f) { W.requestIdleCallback(f, { timeout: 3000 }); } : function (f) { setTimeout(f, 1200); };
  if (d.readyState === 'complete') idle(warm); else addEventListener('load', function () { idle(warm); });

  B.main = 1;
})();
