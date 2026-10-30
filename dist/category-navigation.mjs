// Navigation only. Game route handlers retain ownership of state and saving.
export const CATEGORY_GAMES={intuicao:['light','cut'],logica:['elo','prumo','pacto','sintonia','repasse','orbita'],versus:['desvio']};
export function initCategoryNavigation({hideGames}){
 const nav=document.querySelector('#main > .games'), categories=document.getElementById('categories'),back=document.getElementById('category-back'),title=document.getElementById('category-title');
 const cards=[...nav.querySelectorAll('[data-game],[data-collection],[data-sintonia],[data-repasse],[data-orbita]')];
 const id=b=>b.dataset.game||b.dataset.collection||b.dataset.sintonia||b.dataset.repasse||b.dataset.orbita;
 const names={intuicao:'Intuição',logica:'Raciocínio lógico',versus:'Versus'};
 let current=null,restoring=false;
 function locationState(){const p=new URLSearchParams(location.search),game=p.get('game');return {game:cards.some(b=>id(b)===game)?game:null,category:Object.keys(CATEGORY_GAMES).find(k=>CATEGORY_GAMES[k].includes(game))||(CATEGORY_GAMES[p.get('category')]?p.get('category'):null)};}
 function record(category,game=null){const u=new URL(location.href);u.searchParams.delete('game');u.searchParams.delete('category');if(game)u.searchParams.set('game',game);else if(category)u.searchParams.set('category',category);history.pushState(null,'',u);}
 function view(category,{focus=true}={}){
  current=category;categories.hidden=!!category;nav.hidden=!category;back.hidden=!category;title.hidden=!category;
  title.textContent=names[category]||'';
  for(const b of cards)b.hidden=!CATEGORY_GAMES[category]?.includes(id(b));
  nav.querySelectorAll('.game-section-title').forEach(h=>h.hidden=true);
  nav.querySelectorAll('[data-info-game]').forEach(b=>b.hidden=!CATEGORY_GAMES[category]?.includes(b.dataset.infoGame));
  if(focus)(category?title:categories.querySelector('button')).focus({preventScroll:true});
 }
 categories.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;hideGames();record(b.dataset.category);view(b.dataset.category);});
 back.onclick=()=>{hideGames();record(null);view(null);};
 nav.addEventListener('click',e=>{const b=e.target.closest('[data-game],[data-collection],[data-sintonia],[data-repasse],[data-orbita]');if(b&&!restoring)record(current,id(b));});
 function restore(){const route=locationState();hideGames();view(route.category,{focus:false});if(route.game){restoring=true;cards.find(b=>id(b)===route.game).click();restoring=false;}}
 window.addEventListener('popstate',restore);
 restore();
}
