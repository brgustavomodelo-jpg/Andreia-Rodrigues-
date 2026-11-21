(function(){var d=document,lb=d.getElementById('lb'),im=lb.querySelector('img'),ct=lb.querySelector('.ct'),B=Array.prototype.slice.call(d.querySelectorAll('.mas button')),i=0,last=null;
function show(){var s=B[i].querySelector('img');im.style.animation='none';void im.offsetWidth;im.style.animation='';im.src=s.currentSrc||s.src;im.alt=s.alt;ct.textContent=(i+1)+' / '+B.length}
function open(k){i=k;last=d.activeElement;show();lb.classList.add('open');d.body.classList.add('lock');lb.querySelector('.x').focus()}
function close(){lb.classList.remove('open');d.body.classList.remove('lock');if(last)last.focus()}
function step(n){i=(i+n+B.length)%B.length;show();var nx=B[(i+n+B.length)%B.length].querySelector('img');(new Image()).src=nx.src}
B.forEach(function(b,k){b.addEventListener('click',function(){open(k)})});
lb.querySelector('.x').onclick=close;lb.querySelector('.pv').onclick=function(){step(-1)};lb.querySelector('.nx').onclick=function(){step(1)};
lb.addEventListener('click',function(e){if(e.target===lb)close()});
d.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;
 if(e.key==='Escape')close();else if(e.key==='ArrowLeft')step(-1);else if(e.key==='ArrowRight')step(1);
 else if(e.key==='Tab'){var q=lb.querySelectorAll('button'),f=q[0],l=q[q.length-1];if(e.shiftKey&&d.activeElement===f){e.preventDefault();l.focus()}else if(!e.shiftKey&&d.activeElement===l){e.preventDefault();f.focus()}}});
var sx=0;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var x=e.changedTouches[0].clientX-sx;if(Math.abs(x)>50)step(x<0?1:-1)});
})();
