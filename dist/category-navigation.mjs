import {renderAchievements} from './achievements.mjs';
// Navigation only. Game route handlers retain ownership of state and saving.
export const CATEGORY_GAMES={intuicao:['light','cut'],logica:['elo','prumo','pacto','sintonia','repasse','orbita'],versus:['desvio','broto','cerco']};
export function initCategoryNavigation({hideGames}){
 const nav=document.querySelector('#main > .games'),categories=document.getElementById('categories'),back=document.getElementById('category-back'),title=document.getElementById('category-title'),achievements=document.getElementById('achievements'),tabs=document.getElementById('library-navigation');
 const selector='[data-game],[data-collection],[data-sintonia],[data-repasse],[data-orbita],[data-broto],[data-cerco]';
 const cards=[...nav.querySelectorAll(selector)];
 const id=b=>b.dataset.game||b.dataset.collection||b.dataset.sintonia||b.dataset.repasse||b.dataset.orbita||b.dataset.broto||b.dataset.cerco;
 const names={intuicao:'Intuição',logica:'Raciocínio lógico',versus:'Versus'};
 let current=null,restoring=false;
 function locationState(){const p=new URLSearchParams(location.search),game=p.get('game');if(p.get('screen')==='achievements')return {screen:'achievements'};if(['trama','vertice'].includes(game)||/\/(?:trama|vertice)\/?$/i.test(location.pathname)||(!game&&/^#(?:game=)?(?:trama|vertice)(?:$|[/?&])/i.test(location.hash)))return {game:null,category:'versus'};return {game:cards.some(b=>id(b)===game)?game:null,category:CATEGORY_GAMES[p.get('category')]?p.get('category'):null};}
 function record(category,game=null,screen=null){const u=new URL(location.href);if(/\/(?:trama|vertice)\/?$/i.test(u.pathname))u.pathname=u.pathname.replace(/(?:trama|vertice)\/?$/i,'');if(/^#(?:game=)?(?:trama|vertice)(?:$|[/?&])/i.test(u.hash))u.hash='';for(const key of ['game','category','screen'])u.searchParams.delete(key);if(game)u.searchParams.set('game',game);if(category)u.searchParams.set('category',category);if(screen)u.searchParams.set('screen',screen);if(u.href!==location.href)history.pushState(null,'',u);}
 function view(category,{focus=true,screen=null}={}){
  current=category;const awards=screen==='achievements';categories.hidden=awards;nav.hidden=awards;back.hidden=awards||!category;title.hidden=awards;achievements.hidden=!awards;
  title.textContent=names[category]||'Todos os jogos';
  for(const b of cards)b.hidden=!!category&&!CATEGORY_GAMES[category]?.includes(id(b));
  nav.querySelectorAll('.game-section-title').forEach(h=>h.hidden=!!category);
  nav.querySelectorAll('[data-info-game]').forEach(b=>b.hidden=!!category&&!CATEGORY_GAMES[category]?.includes(b.dataset.infoGame));
  categories.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.category||null)===category)));
  tabs.querySelectorAll('[data-screen]').forEach(b=>{const selected=(b.dataset.screen==='achievements')===awards;b.setAttribute('aria-current',selected?'page':'false');});
  if(awards)renderAchievements(achievements);
  if(focus)(awards?achievements.querySelector('h2'):title)?.focus({preventScroll:true});
 }
 categories.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;const category=b.dataset.category||null;hideGames();record(category);view(category);});
 back.onclick=()=>{hideGames();record(null);view(null);};
 tabs.addEventListener('click',e=>{const b=e.target.closest('[data-screen]');if(!b)return;hideGames();const screen=b.dataset.screen==='achievements'?'achievements':null;record(null,null,screen);view(null,{screen});});
 nav.addEventListener('click',e=>{const b=e.target.closest(selector);if(b&&!restoring)record(current,id(b));});
 function restore(){const route=locationState();hideGames();view(route.category||null,{focus:false,screen:route.screen});if(route.game){restoring=true;try{cards.find(b=>id(b)===route.game).click();}finally{restoring=false;}}}
 window.addEventListener('popstate',restore);
 window.addEventListener('storage',()=>{if(!achievements.hidden)renderAchievements(achievements);});
 restore();
}
