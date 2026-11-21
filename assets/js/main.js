(function(){var d=document,b=d.body,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var $=function(s){return d.querySelector(s)},$$=function(s){return Array.prototype.slice.call(d.querySelectorAll(s))};
var cv=$('.cv'),hd=$('header'),bg=$('.bg');
bg.addEventListener('click',function(){var o=hd.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Fechar menu':'Abrir menu')});
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&hd.classList.contains('open'))bg.click()});
$$('a[data-pg]').forEach(function(a){a.addEventListener('click',function(e){
 if(e.metaKey||e.ctrlKey||e.shiftKey||rm)return;var u=new URL(a.href,location.href);if(u.pathname===location.pathname&&!u.hash)return;
 e.preventDefault();cv.classList.add('go');setTimeout(function(){location.href=a.href},620)})});
addEventListener('pageshow',function(e){if(e.persisted)cv.classList.remove('go')});
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
 $$('.rv,.mk').forEach(function(e){io.observe(e)})}else{$$('.rv,.mk').forEach(function(e){e.classList.add('in')})}
var P=$$('[data-speed]'),tk=false,top=$('.top');
function upd(){tk=false;var vh=innerHeight;if(!rm)P.forEach(function(e){var r=e.parentNode.getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;e.style.transform='translate3d(0,'+((r.top+r.height/2-vh/2)*-e.dataset.speed).toFixed(1)+'px,0)'});
 if(top)top.classList.toggle('on',scrollY>700);d.dispatchEvent(new Event('bar:scroll'))}
addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd();
if(top)top.addEventListener('click',function(){scrollTo({top:0,behavior:rm?'auto':'smooth'})});
var y=$('#yr');if(y)y.textContent=new Date().getFullYear();
})();
