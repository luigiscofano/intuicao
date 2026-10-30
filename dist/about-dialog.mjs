const trigger=document.querySelector('#about-open');
const dialog=document.querySelector('#about-dialog');
if(trigger && dialog){
 const title=dialog.querySelector('#about-title');
 const sparks=dialog.querySelector('.about-sparkles');
 const status=dialog.querySelector('.about-status');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 // A manual top-layer popover escapes the dialog's clipping without changing it.
 const greenLayer=document.createElement('div');greenLayer.id='about-green-sparkles';
 greenLayer.setAttribute('popover','manual');greenLayer.setAttribute('aria-hidden','true');greenLayer.setAttribute('inert','');dialog.append(greenLayer);
 let faunaAnimations=[];
 const clearGreen=()=>{faunaAnimations.forEach(animation=>animation.cancel());faunaAnimations=[];greenLayer.replaceChildren();if(greenLayer.matches(':popover-open'))greenLayer.hidePopover();};
 const celebrateGreen=()=>{
  const r=dialog.getBoundingClientRect(),vw=document.documentElement.clientWidth,vh=window.innerHeight;
  const clamp=(v,max)=>Math.max(12,Math.min(max-12,v));
  const fragment=document.createDocumentFragment(),greenCount=reduced.matches?10:32;
  for(let i=0;i<greenCount;i++){
   const edge=i%4,t=.12+Math.random()*.76,distance=26+Math.random()*42;
   let x,y,dx=0,dy=0;
   if(edge===0){x=r.left-12;y=r.top+r.height*t;dx=-distance;}
   else if(edge===1){x=r.right+12;y=r.top+r.height*t;dx=distance;}
   else if(edge===2){x=r.left+r.width*t;y=r.top-12;dy=-distance;}
   else{x=r.left+r.width*t;y=r.bottom+12;dy=distance;}
   x=clamp(x,vw);y=clamp(y,vh);
   const spark=document.createElement('span');spark.className='about-green-spark';spark.textContent='✦';
   spark.style.setProperty('--gx',`${x-12}px`);spark.style.setProperty('--gy',`${y-12}px`);
   spark.style.setProperty('--gdx',`${clamp(x+dx,vw)-x}px`);spark.style.setProperty('--gdy',`${clamp(y+dy,vh)-y}px`);
   spark.style.setProperty('--gsize',`${12+Math.random()*7}px`);spark.style.setProperty('--gdelay',`${Math.random()*140}ms`);
   spark.style.setProperty('--gcolor',['#3e7045','#527f43','#688c4e'][i%3]);fragment.append(spark);
  }
  greenLayer.append(fragment);greenLayer.showPopover();
 };
 // The supplied 15-icon sheet is used unchanged. SVG crops only its cells;
 // the color matrix makes its white paper transparent without redrawing icons.
 const faunaFrames=[
  [110,55,200,320],[390,80,290,280],[735,125,255,235],
  [45,390,325,250],[390,375,295,270],[715,370,310,295],
  [45,680,320,280],[400,645,270,315],[700,695,325,270],
  [60,965,290,250],[410,965,255,250],[705,965,320,250],
  [80,1220,240,220],[405,1215,255,230],[720,1205,285,240]
 ];
 const celebrateAnimals=()=>{
  const r=dialog.getBoundingClientRect(),vw=document.documentElement.clientWidth,vh=window.innerHeight;
  const fragment=document.createDocumentFragment(),count=reduced.matches?8:28,flights=[];
  for(let i=0;i<count;i++){
   const [x,y,w,h]=faunaFrames[i%faunaFrames.length];
   const piece=document.createElement('span');piece.className='about-animal-confetti';
   const size=22+Math.random()*24,rotation=-35+Math.random()*70;
   // Each icon leaves its nearest edge: no flight traverses the panel.
   const edge=i%2,inset=size/2+8;
   // Stagger launches over nearly the full edge instead of clustering at its middle.
   const t=.08+.84*((Math.floor(i/2)+Math.random())/Math.ceil(count/2));
   const cx=edge===0?r.left+inset:edge===1?r.right-inset:r.left+r.width*t;
   const cy=edge===2?r.top+inset:edge===3?r.bottom-inset:r.top+r.height*t;
   const originX=cx-size/2,originY=cy-size/2;
   piece.setAttribute('data-exit-edge',String(edge));
   piece.style.setProperty('--ax',`${originX}px`);
   piece.style.setProperty('--ay',`${originY}px`);
   piece.style.setProperty('--asize',`${size}px`);
   piece.style.setProperty('--arot',`${rotation}deg`);
   const isolatedCrop=[8,11,14].includes(i%faunaFrames.length);
   piece.innerHTML=`<svg viewBox="${x} ${y} ${w} ${h}" aria-hidden="true" focusable="false"><defs>${isolatedCrop?`<clipPath id="fauna-crop-${i}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>`:''}<filter id="fauna-paper-${i}" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 3"/></filter></defs><image ${isolatedCrop?`clip-path="url(#fauna-crop-${i})"`:''} href="platform-assets/fauna-green-original.png" width="1079" height="1458" filter="url(#fauna-paper-${i})"/></svg>`;
   fragment.append(piece);
   if(!reduced.matches){
    const slow=i%3!==0,duration=(slow?2100:560)+Math.random()*980;
    const gap=Math.max(0,[r.left,vw-r.right,r.top,vh-r.bottom][edge]);
    // Settle in the outside margin instead of racing offscreen. A narrow mobile
    // margin keeps a visible portion of the PNG until its gentle final fade.
    const distance=inset+gap*(.3+Math.random()*.65);
    const tangent=-Math.min(24+Math.random()*160,Math.max(0,originY-8)),spin=(Math.random()-.5)*80;
    const frames=Array.from({length:61},(_,frame)=>{
     const progress=frame/60;
     const outward=distance*(1-Math.exp(-7*progress))/(1-Math.exp(-7));
     const drift=tangent*(1-Math.exp(-4*progress))/(1-Math.exp(-4))+Math.sin(progress*Math.PI*2)*5;
     const dx=edge===0?-outward:edge===1?outward:drift;
     const dy=edge===2?-outward:edge===3?outward:drift;
     return {offset:progress,opacity:progress<.05?progress/.05:progress>.8?(1-progress)/.2:1,
      transform:`translate(${dx}px,${dy}px) rotate(${rotation+spin*progress}deg)`};
    });
    flights.push({piece,frames,duration,delay:Math.random()*350});
   }
  }
  greenLayer.append(fragment);
  for(const {piece,frames,duration,delay} of flights)faunaAnimations.push(piece.animate(frames,{duration,delay,easing:'linear',fill:'both'}));
 };
 window.addEventListener('resize',clearGreen);
 let returnFocus=null, cleanupTimer=null, pointerStartedOutside=false;
 const clearCelebration=()=>{clearTimeout(cleanupTimer);cleanupTimer=null;sparks.replaceChildren();status.textContent='';clearGreen();};
 trigger.addEventListener('click',()=>{
  if(dialog.open)return;
  returnFocus=document.activeElement;
  clearCelebration();dialog.showModal();title.focus({preventScroll:true});
 });
 dialog.querySelectorAll('[data-about-close]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
 dialog.addEventListener('close',()=>{clearCelebration();pointerStartedOutside=false;if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
 const outside=event=>{const r=dialog.getBoundingClientRect();return event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom;};
 dialog.addEventListener('pointerdown',event=>{pointerStartedOutside=event.target===dialog && outside(event);});
 dialog.addEventListener('click',event=>{if(pointerStartedOutside && event.target===dialog && outside(event))dialog.close();pointerStartedOutside=false;});
 dialog.addEventListener('keydown',event=>{
  event.stopPropagation(); // Modal keystrokes must never reach game shortcuts.
  if(event.key==='Escape'){event.preventDefault();dialog.close();return;}
  if(event.key!=='Tab')return;
  const buttons=[...dialog.querySelectorAll('button:not([disabled])')];
  const first=buttons[0],last=buttons.at(-1);
  if(event.shiftKey && (document.activeElement===first||document.activeElement===title)){event.preventDefault();last.focus();}
  else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
 });
 dialog.querySelector('.about-celebrate').addEventListener('click',()=>{
  clearCelebration();
  const fragment=document.createDocumentFragment();
  const colors=['#b9cfae','#edc5bd','#decda1','#c7c4e1','#b8d6d2'];
  const count=reduced.matches?18:60;
  for(let i=0;i<count;i++){
   const spark=document.createElement('span');spark.className='about-spark';spark.textContent=i%3?'✦':'✧';
   spark.style.setProperty('--sx',`${5+Math.random()*90}%`);
   spark.style.setProperty('--sy',`${18+Math.random()*76}%`);
   spark.style.setProperty('--color',colors[i%colors.length]);
   spark.style.setProperty('--size',`${10+Math.random()*13}px`);
   spark.style.setProperty('--delay',`${Math.random()*220}ms`);
   fragment.append(spark);
  }
  sparks.append(fragment);status.textContent='Viva cada pequena descoberta!';
  celebrateGreen();
  celebrateAnimals();
  cleanupTimer=setTimeout(clearCelebration,reduced.matches?1100:3500);
 });
 reduced.addEventListener('change',clearCelebration);
}
