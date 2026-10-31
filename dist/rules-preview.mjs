import {RULE_EXAMPLES} from './rules-examples.mjs';
import {GAME_INFO} from './game-info-content.mjs';
export function rulesPreviewMarkup(game){
 const example=RULE_EXAMPLES[game];if(!example)return '';
 return `<section class="rules-preview" aria-label="Como jogar ${GAME_INFO[game].name}"><div class="rp-copy"><h3>Como jogar</h3><ol>${example.steps.map(step=>`<li>${step}</li>`).join('')}</ol><p class="rp-note">${['broto','cerco'].includes(game)?'Exemplo ilustrativo. Não altera a partida.':'Exemplo simples. Confira também as pistas da fase.'}</p></div><div class="rp-example" aria-hidden="true">${example.svg}</div></section>`;
}

// Start the short example only when it enters view, not while a user is still
// reading the category cards above it. No loops, timers or gameplay callbacks.
if(typeof document!=='undefined'&&typeof MutationObserver!=='undefined'){
 const start=()=>{
  const root=document.getElementById('main');if(!root)return;
  const seen=new WeakSet();
  const observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('rp-playing');observer.unobserve(entry.target);}},{threshold:.2});
  const watch=node=>{if(node.nodeType!==1)return;const panels=[...(node.matches?.('.rules-preview')?[node]:[]),...node.querySelectorAll('.rules-preview')];for(const panel of panels)if(!seen.has(panel)){seen.add(panel);if(observer)observer.observe(panel);else panel.classList.add('rp-playing');}};
  watch(root);
  new MutationObserver(records=>{for(const record of records){for(const node of record.removedNodes){if(node.nodeType!==1)continue;if(node.matches?.('.rules-preview'))observer?.unobserve(node);node.querySelectorAll?.('.rules-preview').forEach(panel=>observer?.unobserve(panel));}for(const node of record.addedNodes)watch(node);}}).observe(root,{childList:true,subtree:true});
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
}
