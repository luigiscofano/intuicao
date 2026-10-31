import {GAME_INFO} from './game-info-content.mjs';

// Independently testable dwell timer; no game state or storage access.
export function createInfoDwell(show, hide, clock=globalThis){
 let timer=null;
 const cancel=()=>{if(timer!==null)clock.clearTimeout(timer);timer=null;hide();};
 return {cancel,start(anchor){cancel();timer=clock.setTimeout(()=>{timer=null;show(anchor);},800);}};
}

export function initGameInfo(doc=document){
 const nav=doc.querySelector('#main > .games');
 if(!nav||doc.querySelector('#game-info-dialog'))return;
 const dialog=doc.createElement('dialog');dialog.id='game-info-dialog';
 dialog.setAttribute('aria-modal','true');dialog.setAttribute('aria-labelledby','game-info-title');
 dialog.innerHTML='<div class="game-info-shell"><div class="game-info-heading"><h2 id="game-info-title" tabindex="-1"></h2><button type="button" class="game-info-x" data-info-close aria-label="Fechar informações do jogo">×</button></div><div class="game-info-copy" tabindex="0" role="region" aria-label="Regras e proposta do jogo"></div><div class="game-info-actions"><button type="button" data-info-close>Fechar</button></div></div>';
 const tip=doc.createElement('div');tip.id='game-info-tip';tip.setAttribute('role','tooltip');tip.setAttribute('popover','manual');tip.hidden=true;
 doc.body.append(dialog,tip);
 const title=dialog.querySelector('h2'),copy=dialog.querySelector('.game-info-copy');
 let returnFocus=null,tipAnchor=null,pointerOutside=false,restoring=false;
 const hideTip=()=>{tipAnchor?.removeAttribute('aria-describedby');tipAnchor=null;if(tip.matches(':popover-open'))tip.hidePopover();tip.hidden=true;};
 const dwell=createInfoDwell(anchor=>{
  if(!anchor.isConnected||dialog.open||doc.querySelector('dialog[open]'))return;
  const info=GAME_INFO[anchor.dataset.infoGame];if(!info)return;
  const strong=doc.createElement('strong');strong.textContent=info.name;
  const p=doc.createElement('p');p.textContent=info.description+' '+info.summary;
  const hint=doc.createElement('small');hint.textContent='Clique para ver regras e proposta.';
  tip.replaceChildren(strong,p,hint);tip.hidden=false;tip.showPopover();
  const r=anchor.getBoundingClientRect(),t=tip.getBoundingClientRect();
  const vw=doc.documentElement.clientWidth,vh=window.innerHeight;
  tip.style.left=`${Math.max(12,Math.min(r.left+r.width/2-t.width/2,vw-t.width-12))}px`;
  tip.style.top=`${Math.max(12,Math.min(r.top>=t.height+20?r.top-t.height-8:r.bottom+8,vh-t.height-12))}px`;
  tipAnchor=anchor;anchor.setAttribute('aria-describedby',tip.id);
 },hideTip);
 const triggerFor=target=>target?.closest?.('button[data-info-game]');
 const makeTrigger=(game)=>{const b=doc.createElement('button');b.type='button';b.className='game-info-trigger';b.dataset.infoGame=game;b.textContent='i';b.setAttribute('aria-label',`Informações sobre ${GAME_INFO[game].name}`);b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls',dialog.id);return b;};
 const cards=[...nav.querySelectorAll('[data-game],[data-collection],[data-sintonia],[data-repasse],[data-orbita],[data-broto]')];
 for(const card of cards){const game=card.dataset.game||card.dataset.collection||card.dataset.sintonia||card.dataset.repasse||card.dataset.orbita||card.dataset.broto;const b=makeTrigger(game);b.classList.add('game-info-nav');nav.append(b);}
 const placeNav=()=>{for(const card of cards){const game=card.dataset.game||card.dataset.collection||card.dataset.sintonia||card.dataset.repasse||card.dataset.orbita||card.dataset.broto;const b=nav.querySelector(`[data-info-game="${game}"]`);b.hidden=card.hidden;b.style.left=`${card.offsetLeft+card.offsetWidth-40}px`;b.style.top=`${card.offsetTop+card.offsetHeight/2-16}px`;}};
 const activeGame=()=>{const c=cards.find(e=>e.getAttribute('aria-pressed')==='true');return c?.dataset.game||c?.dataset.collection||c?.dataset.sintonia||c?.dataset.repasse||c?.dataset.orbita||c?.dataset.broto;};
 const syncTitles=()=>{
  const game=activeGame();if(!GAME_INFO[game])return;
  for(const h of doc.querySelectorAll('#selection-title,#game-title,#collection-title,#c-title,#s-selection-title,#s-title,#r-selection-title,#r-title,#o-selection-title,#o-title,#b-selection-title,#b-title')){
   let b=h.querySelector('.game-info-trigger');if(b?.dataset.infoGame===game)continue;
   b?.remove();h.append(makeTrigger(game));
  }
  placeNav();
 };
 syncTitles();
 // Watch route/title hosts only, never the game grid or per-move status updates.
 const observer=new MutationObserver(()=>{dwell.cancel();syncTitles();});
 observer.observe(nav,{attributes:true,subtree:true,attributeFilter:['aria-pressed']});
 for(const selector of ['#collection','#sintonia','#repasse','#orbita','#broto']){const host=doc.querySelector(selector);if(host)observer.observe(host,{childList:true});}
 for(const h of doc.querySelectorAll('#selection-title,#game-title'))observer.observe(h,{childList:true});
 // Appending one missing icon triggers at most one extra no-op observer pass.
 new ResizeObserver(()=>{dwell.cancel();placeNav();}).observe(nav);
 doc.addEventListener('pointerover',event=>{const b=triggerFor(event.target);if(b&&event.pointerType!=='touch'&&!b.contains(event.relatedTarget))dwell.start(b);});
 doc.addEventListener('pointerout',event=>{const b=triggerFor(event.target);if(b&&!b.contains(event.relatedTarget))dwell.cancel();});
 doc.addEventListener('focusin',event=>{const b=triggerFor(event.target);if(b&&!restoring)dwell.start(b);});
 doc.addEventListener('focusout',event=>{if(triggerFor(event.target))dwell.cancel();});
 doc.addEventListener('scroll',()=>dwell.cancel(),true);
 window.addEventListener('resize',()=>dwell.cancel());
 window.addEventListener('pagehide',()=>dwell.cancel());
 doc.addEventListener('keydown',event=>{if(event.key==='Escape')dwell.cancel();});
 doc.addEventListener('click',()=>dwell.cancel(),true);
 doc.addEventListener('click',event=>{
  const b=triggerFor(event.target);if(!b)return;
  event.preventDefault();event.stopPropagation();
  if(dialog.open||doc.querySelector('dialog[open]'))return;
  const info=GAME_INFO[b.dataset.infoGame];returnFocus=b;title.textContent=info.name;
  const rules=doc.createElement('ul');for(const rule of info.rules){const li=doc.createElement('li');li.textContent=rule;rules.append(li);}
  const section=(heading,text)=>{const s=doc.createElement('section'),h=doc.createElement('h3');h.textContent=heading;s.append(h);if(typeof text==='string'){const p=doc.createElement('p');p.textContent=text;s.append(p);}else s.append(text);return s;};
  const intro=doc.createElement('p');intro.className='game-info-intro';intro.textContent=info.description;
  copy.replaceChildren(intro,section('Como jogar',rules),section('Objetivo pedagógico',info.purpose),section('Por que este jogo?',info.why));copy.scrollTop=0;
  dialog.showModal();title.focus({preventScroll:true});
 });
 dialog.querySelectorAll('[data-info-close]').forEach(b=>b.addEventListener('click',()=>dialog.close()));
 dialog.addEventListener('close',()=>{dwell.cancel();pointerOutside=false;restoring=true;if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});restoring=false;});
 const outside=e=>{const r=dialog.getBoundingClientRect();return e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom;};
 dialog.addEventListener('pointerdown',e=>{pointerOutside=e.target===dialog&&outside(e);});
 dialog.addEventListener('click',e=>{if(pointerOutside&&e.target===dialog&&outside(e))dialog.close();pointerOutside=false;});
 dialog.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape'){e.preventDefault();dialog.close();return;}if(e.key!=='Tab')return;const focusables=[...dialog.querySelectorAll('button,[tabindex="0"]')],first=focusables[0],last=focusables.at(-1);if(e.shiftKey&&(doc.activeElement===first||doc.activeElement===title)){e.preventDefault();last.focus();}else if(!e.shiftKey&&doc.activeElement===last){e.preventDefault();first.focus();}});
}
if(typeof document!=='undefined')initGameInfo();
