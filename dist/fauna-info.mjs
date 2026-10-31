import {ANIMAL_SPRITES} from './sintonia/animal-roster.mjs';
import {createInfoDwell} from './game-info.mjs';
import {FAUNA_ART} from './fauna-art.mjs';
import {FAUNA_INFO} from './fauna-info-content.mjs';
import {FAUNA_RANGES} from './fauna-ranges.mjs';
import {faunaRangeMapMarkup} from './fauna-range-map.mjs';
import {faunaCultureMarkup} from './fauna-culture.mjs';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sheets={front:['platform-assets/fauna-green-original.png',1079,1458],side:['platform-assets/fauna-side-original.png',971,1620],sprite:['platform-assets/fauna-sprites-original.png',1983,793]};
export const FAUNA_SINTONIA_IDS=Object.freeze({tuiuiu:'tuiuiu',capivara:'capivara',bemtevi:'bemtevi',mico:'macaco',micoLeao:'mico',tatu:'tatu',onca:'onca',lobo:'lobo',coral:'coral',jacare:'jacare',arara:'arara',peixeBoi:'peixeboi',piranha:'piranha',tucano:'tucano',tamandua:'tamandua'});
export function faunaCropMarkup(art,kind){if(kind==='sprite'){const sprite=ANIMAL_SPRITES[FAUNA_SINTONIA_IDS[art.id]],{columns,rows,frame}=sprite;const x=(frame%columns)/(columns-1)*100,y=Math.floor(frame/columns)/(rows-1)*100;return `<span class="fauna-art-view"><span aria-hidden="true" class="fauna-sintonia-sprite" style="background-image:url('${esc(sprite.url)}');background-size:${columns*100}% ${rows*100}%;background-position:${x}% ${y}%"></span></span>`;}const [x,y,w,h]=art[kind],max=Math.max(w,h),[url,sw,sh]=sheets[kind];return `<span class="fauna-art-view"><span class="fauna-sheet-crop" style="width:${w/max*100}%;height:${h/max*100}%;${art[kind+'Clip']?'clip-path:'+art[kind+'Clip']+';':''}"><img alt="" draggable="false" src="${url}" width="${sw}" height="${sh}" style="width:${sw/w*100}%;height:${sh/h*100}%;left:${-x/w*100}%;top:${-y/h*100}%" class="${kind==='sprite'?'fauna-pixel':''}"></span></span>`;}
export function initFaunaInfo(doc=document){
 const gallery=doc.querySelector('.hero-fauna');if(!gallery||doc.getElementById('fauna-dialog'))return;
 const cells=[...gallery.querySelectorAll('.hero-fauna-cell')];if(cells.length!==FAUNA_ART.length)return;
 gallery.removeAttribute('aria-hidden');gallery.removeAttribute('inert');gallery.setAttribute('aria-label','Conheça os animais do Intuição');
 const dialog=doc.createElement('dialog');dialog.id='fauna-dialog';dialog.setAttribute('aria-labelledby','fauna-title');dialog.setAttribute('aria-modal','true');
 dialog.innerHTML='<div class="fauna-shell"><div class="fauna-heading"><div><h2 id="fauna-title" tabindex="-1"></h2><p id="fauna-subtitle"></p></div><button type="button" data-fauna-close class="fauna-close" aria-label="Fechar informações do animal">×</button></div><div class="fauna-copy" tabindex="0" role="region" aria-label="Sobre o animal"></div><div class="fauna-actions"><button type="button" data-fauna-close>Fechar</button></div></div>';
 const tip=doc.createElement('div');tip.id='fauna-tip';tip.setAttribute('role','tooltip');tip.setAttribute('popover','manual');tip.hidden=true;doc.body.append(dialog,tip);
 let tipAnchor=null,returnFocus=null,restoring=false,pointerOutside=false,priorOverflow='';
 const hideTip=()=>{tipAnchor?.removeAttribute('aria-describedby');tipAnchor=null;if(tip.matches(':popover-open'))tip.hidePopover();tip.hidden=true;};
 const dwell=createInfoDwell(anchor=>{
  if(!anchor.isConnected||doc.querySelector('dialog[open]'))return;
  const info=FAUNA_INFO[anchor.dataset.fauna];const strong=doc.createElement('strong'),p=doc.createElement('p'),small=doc.createElement('small');strong.textContent=info.name;p.textContent=info.tooltip;small.textContent='Clique para conhecer melhor.';tip.replaceChildren(strong,p,small);tip.hidden=false;tip.showPopover();
  const r=anchor.getBoundingClientRect(),t=tip.getBoundingClientRect(),vw=doc.documentElement.clientWidth,vh=window.innerHeight;
  tip.style.left=Math.max(12,Math.min(r.left+r.width/2-t.width/2,vw-t.width-12))+'px';tip.style.top=Math.max(12,Math.min(r.top>=t.height+16?r.top-t.height-8:r.bottom+8,vh-t.height-12))+'px';tipAnchor=anchor;anchor.setAttribute('aria-describedby',tip.id);
 },hideTip);
 const open=button=>{
  dwell.cancel();if(doc.querySelector('dialog[open]'))return;
  const id=button.dataset.fauna,info=FAUNA_INFO[id],art=FAUNA_ART.find(a=>a.id===id);returnFocus=button;
  dialog.querySelector('#fauna-title').textContent=info.name;dialog.querySelector('#fauna-subtitle').textContent=info.scientificName||'';
  const copy=dialog.querySelector('.fauna-copy');copy.innerHTML=`<div class="fauna-art-grid">${[['front','Ícone de frente'],['side','Ícone de lado'],['sprite','Sprite do Sintonia']].map(([kind,label])=>`<figure>${faunaCropMarkup(art,kind)}<figcaption>${label}</figcaption></figure>`).join('')}</div><h3>Sobre o animal</h3><p>${esc(info.description)}</p><h3>Onde vive no Brasil</h3>${faunaRangeMapMarkup({...FAUNA_RANGES[id],id,name:info.name})}${faunaCultureMarkup(id)}<h3>Por que faz parte do Intuição?</h3><p>O projeto celebra a natureza brasileira e sua diversidade de formas, cores e modos de vida.</p><p>${esc(info.inIntuicao)}</p><p class="fauna-editorial">As artes são representações estilizadas da fauna, não guias de identificação de espécies.</p><details class="fauna-sources"><summary>Fontes para conhecer mais</summary><ul>${info.sources.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)}</a></li>`).join('')}</ul></details>`;
  copy.scrollTop=0;priorOverflow=doc.body.style.overflow;doc.body.style.overflow='hidden';dialog.showModal();dialog.querySelector('#fauna-title').focus({preventScroll:true});
 };
 cells.forEach((cell,i)=>{const art=FAUNA_ART[i],info=FAUNA_INFO[art.id];const button=doc.createElement('button');button.type='button';button.className='hero-fauna-cell';button.dataset.fauna=art.id;button.setAttribute('aria-label','Conhecer '+info.name);button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','fauna-dialog');while(cell.firstChild)button.append(cell.firstChild);cell.replaceWith(button);
  button.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')dwell.start(button);});button.addEventListener('pointerleave',()=>dwell.cancel());button.addEventListener('focus',()=>{if(!restoring)dwell.start(button);});button.addEventListener('blur',()=>dwell.cancel());button.addEventListener('click',()=>open(button));
 });
 dialog.querySelectorAll('[data-fauna-close]').forEach(b=>b.onclick=()=>dialog.close());
 dialog.addEventListener('cancel',e=>{e.preventDefault();dialog.close();});
 dialog.addEventListener('close',()=>{dwell.cancel();doc.body.style.overflow=priorOverflow;restoring=true;if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});restoring=false;});
 const outside=e=>{const r=dialog.getBoundingClientRect();return e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom;};
 dialog.addEventListener('pointerdown',e=>{pointerOutside=e.target===dialog&&outside(e);});dialog.addEventListener('click',e=>{if(pointerOutside&&e.target===dialog&&outside(e))dialog.close();pointerOutside=false;});
 dialog.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape'){e.preventDefault();dialog.close();return;}if(e.key==='Tab'){const stops=[...dialog.querySelectorAll('button:not([disabled]),a[href],summary,[tabindex="0"]')].filter(el=>el.getClientRects().length),first=stops[0],last=stops.at(-1),current=doc.activeElement;if(e.shiftKey&&(current===first||current===dialog.querySelector('#fauna-title'))){e.preventDefault();last?.focus();}else if(!e.shiftKey&&current===last){e.preventDefault();first?.focus();}}});
 doc.addEventListener('keydown',e=>{if(e.key==='Escape')dwell.cancel();});doc.addEventListener('scroll',()=>dwell.cancel(),true);window.addEventListener('resize',()=>dwell.cancel());window.addEventListener('pagehide',()=>{dwell.cancel();if(dialog.open)dialog.close();});
}
if(typeof document!=='undefined')initFaunaInfo();
