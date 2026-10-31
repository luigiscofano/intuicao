// Monochrome pictograms for navigation only. No state, rules or level selectors.
export const GAME_NAV_ICONS={
 vertice:'<path d="M5 5h22v22H5zM16 5v22M5 16h22"/>'+[5,16,27].flatMap(y=>[5,16,27].map(x=>`<circle cx="${x}" cy="${y}" r="2"/>`)).join(''),
 trama:'<path d="M7 7h18v18H7z"/><circle cx="7" cy="7" r="3"/><circle cx="25" cy="7" r="3"/><circle cx="7" cy="25" r="3"/><path d="m25 21 4 4-4 4-4-4z"/>',
 cerco:'<rect x="3" y="3" width="26" height="26" rx="3"/><path d="M3 16h26M16 3v26M6 7h7M6 11h7M22 7v7m-3-3 3 3 3-3"/><circle cx="22" cy="22" r="4"/>',
 broto:'<path d="M16 28V15M16 19C6 20 4 13 4 9c8-1 12 3 12 10ZM16 15C16 7 22 4 28 5c0 7-4 11-12 10ZM7 28h18"/>',
 light:'<path d="M3 23h13V5M10 29l12-12"/><circle cx="16" cy="4" r="2"/><path d="M2 20l3 3-3 3"/>',
 cut:'<rect x="4" y="5" width="24" height="22" rx="2"/><path d="M7 30L25 2M5 22l8 4M5 16l11 6M5 10l14 7"/>',
 elo:'<path d="M6 7h20v18H6z"/><circle cx="6" cy="7" r="3"/><circle cx="26" cy="7" r="3"/><circle cx="26" cy="25" r="3"/><circle cx="6" cy="25" r="3"/>',
 prumo:'<path d="M4 7h8v8h8V7h8v16H4zM16 24l-5 6h10z"/><path d="M12 15H4m16 0h8"/>',
 pacto:'<rect x="3" y="5" width="26" height="22" rx="3"/><path d="M16 5v22"/><circle cx="9.5" cy="16" r="4"/><circle cx="22.5" cy="16" r="4"/>',
 sintonia:'<path d="M4 8h10v20H4zM18 8h10v20H18zM6 17h6m8 0h6M9 14l3 3-3 3m14-6 3 3-3 3M10 3h12"/><circle cx="9" cy="24" r="1.5"/><circle cx="23" cy="24" r="1.5"/>',
 repasse:'<rect x="2" y="9" width="9" height="14" rx="2"/><rect x="21" y="9" width="9" height="14" rx="2"/><path d="M12 16h7m-3-3 3 3-3 3M24 16h3m-1.5-1.5v3M5 16h3"/>',
 orbita:'<circle cx="11" cy="16" r="8"/><circle cx="21" cy="16" r="8"/><path d="M5 5l5-2-1 5M4 6a13 13 0 0 1 6-3"/><circle cx="16" cy="10" r="2"/>',
 desvio:'<rect x="3" y="3" width="26" height="26" rx="3"/><path d="M3 12h26M3 21h26M12 3v26M21 3v26M5 16.5h5m-2-2 2 2-2 2M16.5 23v4m-2-2 2 2 2-2"/>'
};
export function initGameNavIcons(doc=document){
 const cards=doc.querySelectorAll('.games > button[data-game],.games > button[data-collection],.games > button[data-sintonia],.games > button[data-repasse],.games > button[data-orbita],.games > button[data-broto],.games > button[data-cerco],.games > button[data-trama],.games > button[data-vertice]');
 for(const card of cards){
  const key=card.dataset.game||card.dataset.collection||card.dataset.sintonia||card.dataset.repasse||card.dataset.orbita||card.dataset.broto||card.dataset.cerco||card.dataset.trama||card.dataset.vertice;
  if(!GAME_NAV_ICONS[key]||card.querySelector('.game-nav-icon'))continue;
  const mark=doc.createElement('i');mark.className='game-nav-icon';mark.setAttribute('aria-hidden','true');
  mark.innerHTML=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">${GAME_NAV_ICONS[key]}</svg>`;
  card.prepend(mark);card.classList.add('has-game-nav-icon');
 }
}
if(typeof document!=='undefined'){
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>initGameNavIcons(),{once:true});
 else initGameNavIcons();
}
