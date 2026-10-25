const trigger=document.querySelector('#about-open');
const dialog=document.querySelector('#about-dialog');
if(trigger && dialog){
 const title=dialog.querySelector('#about-title');
 const sparks=dialog.querySelector('.about-sparkles');
 const status=dialog.querySelector('.about-status');
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let returnFocus=null, cleanupTimer=null, pointerStartedOutside=false;
 const clearCelebration=()=>{clearTimeout(cleanupTimer);cleanupTimer=null;sparks.replaceChildren();status.textContent='';};
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
  cleanupTimer=setTimeout(clearCelebration,reduced.matches?1100:1650);
 });
 reduced.addEventListener('change',clearCelebration);
}
