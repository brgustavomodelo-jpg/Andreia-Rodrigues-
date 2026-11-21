/* By Andreia Rodrigues® — animations.js (v3)
   Abertura (intro) e texto cinético. As animações são um aprimoramento:
   se este arquivo falhar, a rede de segurança do <head> deixa tudo visível. */
(function () {
  var W = window, d = document, b = d.body, B = W.__bar = W.__bar || {};
  if (B.anim) return; // evita inicialização duplicada
  var rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var raf = W.requestAnimationFrame ? W.requestAnimationFrame.bind(W) : function (f) { return setTimeout(f, 16); };
  var it = d.getElementById('intro'), seen = false;
  try { seen = sessionStorage.getItem('bar-intro'); } catch (e) {}
  function ready() { b.classList.add('ready'); }
  function drop() { if (it && it.parentNode) it.parentNode.removeChild(it); }

  if (it && !rm && !seen) {
    var nm = it.querySelector('.nm'), n = 0;
    'By Andreia Rodrigues®'.split(' ').forEach(function (w) {
      var s = d.createElement('span'); s.className = 'wd';
      w.split('').forEach(function (c) {
        var x = d.createElement('i'); x.textContent = c; x.style.animationDelay = (0.15 + n++ * 0.04) + 's'; s.appendChild(x);
      });
      nm.appendChild(s);
    });
    setTimeout(function () { it.classList.add('out'); setTimeout(ready, 300); setTimeout(drop, 1200); }, 2100);
    setTimeout(function () { ready(); drop(); }, 4200); // garantia: a abertura nunca prende a página
    try { sessionStorage.setItem('bar-intro', '1'); } catch (e) {}
  } else {
    drop(); setTimeout(ready, rm ? 0 : 700);
  }

  /* texto cinético (.kin): palavras acendem conforme a rolagem */
  var K = Array.prototype.slice.call(d.querySelectorAll('.kin'));
  K.forEach(function (k) {
    var txt = k.textContent.trim(), t = txt.split(/\s+/);
    k.setAttribute('aria-label', txt); k.textContent = '';
    t.forEach(function (w, i) {
      var s = d.createElement('span'); s.className = 'w'; s.setAttribute('aria-hidden', 'true'); s.textContent = w;
      k.appendChild(s); if (i < t.length - 1) k.appendChild(d.createTextNode(' '));
    });
  });
  function kin() {
    var vh = innerHeight;
    K.forEach(function (k) {
      var ws = k.querySelectorAll('.w'), r = k.getBoundingClientRect(),
        p = rm ? 1 : Math.max(0, Math.min(1, (vh * 0.88 - r.top) / (vh * 0.5 + r.height)));
      Array.prototype.forEach.call(ws, function (w, i) {
        var o = Math.max(0, Math.min(1, p * (ws.length + 3) - i));
        w.style.opacity = (0.16 + 0.84 * o).toFixed(2);
      });
    });
  }
  var tk = false;
  function sched() { if (!tk) { tk = true; raf(function () { tk = false; kin(); }); } }
  if (K.length) {
    addEventListener('scroll', sched, { passive: true });
    addEventListener('resize', sched);
    addEventListener('orientationchange', function () { sched(); setTimeout(sched, 400); });
    addEventListener('pageshow', sched);
    addEventListener('load', sched);
    kin();
  }
  B.anim = 1;
})();
