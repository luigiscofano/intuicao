// O módulo e a busca de TRAMA carregam somente ao abrir seu cartão.
export function createTramaRoute({hideOthers}){
 let ui=null,loading=null,revision=0,visible=false;
 const host=document.getElementById('trama'),nav=document.querySelector('[data-trama]');
 const setActive=value=>nav?.setAttribute('aria-pressed',String(value));
 const load=()=>loading??=import('./ui.mjs').then(({initTrama})=>ui=initTrama()).catch(error=>{loading=null;throw error;});
 async function open(){const token=++revision;visible=true;hideOthers();document.querySelectorAll('[data-game],[data-collection],[data-sintonia],[data-repasse],[data-orbita],[data-broto],[data-cerco]').forEach(b=>b.setAttribute('aria-pressed','false'));setActive(true);host.hidden=false;
 if(!ui)host.innerHTML='<div class="level-screen"><h2 id="tr-selection-title" tabindex="-1">TRAMA ·</h2><p role="status">Preparando o tabuleiro…</p></div>';
 try{const game=await load();if(token!==revision||!visible)return;if(!game.restoreOnLoad())game.activate();}catch{if(token!==revision||!visible)return;host.innerHTML='<div class="level-screen"><h2 id="tr-selection-title" tabindex="-1">TRAMA ·</h2><p role="status">Não foi possível abrir TRAMA. O registro salvo permanece guardado.</p><button id="tr-load-retry" class="primary">Tentar novamente</button></div>';host.querySelector('#tr-load-retry').onclick=open;}}
 function hide(){++revision;visible=false;if(ui)ui.hide();else host.hidden=true;setActive(false);}
 function restoreOnLoad(){try{const raw=JSON.parse(localStorage.getItem('intuicao.trama.v1')||'null');if(raw?.lastView?.active===true&&raw.lastView.screen==='play'){void open();return true;}}catch{}return false;}
 if(nav)nav.onclick=open;return{open,hide,restoreOnLoad,isOpen:()=>visible};
}
