// O módulo e a busca de CERCO carregam somente ao abrir seu cartão.
export function createCercoRoute({hideOthers}){
 let ui=null,loading=null,revision=0,visible=false;
 const host=document.getElementById('cerco'),nav=document.querySelector('[data-cerco]');
 const setActive=value=>nav?.setAttribute('aria-pressed',String(value));
 const load=()=>loading??=import('./ui.mjs').then(({initCerco})=>ui=initCerco()).catch(error=>{loading=null;throw error;});
 async function open(){const token=++revision;visible=true;hideOthers();document.querySelectorAll('[data-game],[data-collection],[data-sintonia],[data-repasse],[data-orbita],[data-broto]').forEach(b=>b.setAttribute('aria-pressed','false'));setActive(true);host.hidden=false;
 if(!ui)host.innerHTML='<div class="level-screen"><h2 id="ce-selection-title" tabindex="-1">CERCO ·</h2><p role="status">Preparando o tabuleiro…</p></div>';
 try{const game=await load();if(token!==revision||!visible)return;game.activate();}catch{if(token!==revision||!visible)return;host.innerHTML='<div class="level-screen"><h2 id="ce-selection-title" tabindex="-1">CERCO ·</h2><p role="status">Não foi possível abrir CERCO. O registro salvo permanece guardado.</p><button id="ce-load-retry" class="primary">Tentar novamente</button></div>';host.querySelector('#ce-load-retry').onclick=open;}}
 function hide(){++revision;visible=false;if(ui)ui.hide();else host.hidden=true;setActive(false);}
 function restoreOnLoad(){try{const raw=JSON.parse(localStorage.getItem('intuicao.cerco.v1')||'null');if(raw?.lastView?.active===true){void open();return true;}}catch{}return false;}
 if(nav)nav.onclick=open;return{open,hide,restoreOnLoad,isOpen:()=>visible};
}
