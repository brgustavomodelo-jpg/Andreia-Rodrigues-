(function(){var d=document,b=d.body,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var it=d.getElementById('intro'),seen=false;try{seen=sessionStorage.getItem('bar-intro')}catch(e){}
function ready(){b.classList.add('ready')}
if(it&&!rm&&!seen){var nm=it.querySelector('.nm'),n=0;'By Andreia Rodrigues®'.split(' ').forEach(function(w){var s=d.createElement('span');s.className='wd';w.split('').forEach(function(c){var x=d.createElement('i');x.textContent=c;x.style.animationDelay=(.15+n++*.04)+'s';s.appendChild(x)});nm.appendChild(s)});
 setTimeout(function(){it.classList.add('out');setTimeout(ready,300);setTimeout(function(){it.remove()},1200)},2100);try{sessionStorage.setItem('bar-intro','1')}catch(e){}}
else{if(it)it.remove();setTimeout(ready,rm?0:700)}
var K=Array.prototype.slice.call(d.querySelectorAll('.kin'));
K.forEach(function(k){var t=k.textContent.trim().split(/\s+/);k.setAttribute('aria-label',k.textContent.trim());k.innerHTML=t.map(function(w){return'<span class="w" aria-hidden="true">'+w+'</span>'}).join(' ')});
function kin(){K.forEach(function(k){var ws=k.querySelectorAll('.w'),r=k.getBoundingClientRect(),vh=innerHeight,p=rm?1:Math.max(0,Math.min(1,(vh*.88-r.top)/(vh*.5+r.height)));
 ws.forEach(function(w,i){var o=Math.max(0,Math.min(1,p*(ws.length+3)-i));w.style.opacity=(.16+.84*o).toFixed(2)})})}
d.addEventListener('bar:scroll',kin);kin();
})();
