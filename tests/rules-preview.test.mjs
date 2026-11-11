import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { rulesPreviewMarkup, initRulesPreviews } from '../dist/rules-preview.mjs';
import { RULE_EXAMPLES } from '../dist/rules-examples.mjs';
import { CATEGORY_GAMES } from '../dist/category-navigation.mjs';
const games=Object.values(CATEGORY_GAMES).flat();
test('todos os 25 jogos ativos têm regras detalhadas, exemplo próprio e controle acessível',()=>{
 assert.equal(games.length,25);
 assert.deepEqual(Object.keys(RULE_EXAMPLES).sort(),[...games].sort());
 for(const game of games){
  const html=rulesPreviewMarkup(game);
  assert.ok(RULE_EXAMPLES[game].steps.length>=3,game);
  assert.ok(RULE_EXAMPLES[game].steps.every(s=>s.length>40),game);
  assert.match(html,/Como jogar/);assert.match(html,/<svg/);assert.match(html,/aria-hidden="true"/);
  assert.match(html,/<figcaption class="rp-description">[^<]{50}/);
  assert.match(html,/class="rp-motion-toggle" aria-pressed="false" aria-label="Pausar exemplo/);
  assert.doesNotMatch(html,/<script|onload=|onclick=|foreignObject|href="https?:|undefined/);
 }
 assert.equal(rulesPreviewMarkup('unknown'),'');
});
test('loop é o novo contrato explícito, preservando redução de movimento e pausa',()=>{
 const css=readFileSync(new URL('../dist/rules-preview.css',import.meta.url),'utf8');
 const examples=readFileSync(new URL('../dist/rules-examples.css',import.meta.url),'utf8');
 assert.match(css,/--rp-cycle:6s/);assert.match(css,/infinite/);
 assert.match(css,/prefers-reduced-motion/);assert.match(css,/data-ui-reduced-motion/);
 assert.match(css,/rp-paused[\s\S]*animation-play-state:paused!important/);
 assert.match(css,/animation:none!important/);
 for(const animation of [...examples.matchAll(/animation:([^;}]+)/g)]) assert.match(animation[1],/infinite/);
 const ui=readFileSync(new URL('../dist/rules-preview.mjs',import.meta.url),'utf8');
 assert.doesNotMatch(ui,/localStorage|sessionStorage|setInterval|setTimeout|requestAnimationFrame/);
});
test('o cartão é integrado antes das fases e da preparação nos jogos novos',()=>{
 const logic=readFileSync(new URL('../dist/logica/ui.mjs',import.meta.url),'utf8');
 const versus=readFileSync(new URL('../dist/versus/ui.mjs',import.meta.url),'utf8');
 assert.match(logic,/rulesPreviewMarkup\(metadata.id\)/);assert.match(logic,/\$\{rulesMarkup\(\)\}\$\{bands\}/);
 assert.match(versus,/rulesPreviewMarkup\(game.id\)/);
 assert.ok(versus.indexOf('${rulesMarkup()}')<versus.indexOf('<div class="nv-preparation">'));
 for(const game of ['sintonia','repasse','orbita']) assert.ok(readFileSync(new URL(`../dist/${game}/ui.mjs`,import.meta.url),'utf8').includes(`rulesPreviewMarkup('${game}')`));
 const index=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
 assert.ok(index.indexOf('id="selection-rules"')<index.indexOf('id="level-grid"'));
});
function mock(){
 const listeners={}, docListeners={};let observer,mutations;
 const makePanel=()=>{const classes=new Set(); const panel={nodeType:1,dataset:{rulesGame:'light'},classList:{toggle(c,force){const next=force??!classes.has(c);if(next)classes.add(c);else classes.delete(c);return next;},remove(c){classes.delete(c);},contains(c){return classes.has(c);}},matches:s=>s==='.rules-preview',querySelectorAll:()=>[]};const attrs={};panel.button={attrs,textContent:'Pausar exemplo',setAttribute(k,v){attrs[k]=v;},closest:s=>s==='.rp-motion-toggle'?panel.button:panel};return panel;};
 const panel=makePanel();const root={nodeType:1,matches:()=>false,querySelectorAll:()=>[panel],contains:()=>true,addEventListener:(n,fn)=>listeners[n]=fn,removeEventListener:n=>delete listeners[n]};
 const win={IntersectionObserver:class{constructor(cb){this.cb=cb;this.watched=new Set();observer=this;}observe(p){this.watched.add(p);}unobserve(p){this.watched.delete(p);}disconnect(){this.watched.clear();}},MutationObserver:class{constructor(cb){this.cb=cb;mutations=this;}observe(){}disconnect(){}}};
 const doc={hidden:false,getElementById:()=>root,defaultView:win,addEventListener:(n,fn)=>docListeners[n]=fn,removeEventListener:n=>delete docListeners[n]};
 return {doc,panel,makePanel,listeners,docListeners,get observer(){return observer;},get mutations(){return mutations;}};
}
test('visibilidade, pausa, retomada, remoção e limpeza são independentes da partida',()=>{
 const m=mock(),cleanup=initRulesPreviews(m.doc);
 assert.equal(initRulesPreviews(m.doc),cleanup);assert.ok(m.observer.watched.has(m.panel));
 m.observer.cb([{target:m.panel,isIntersecting:true}]);assert.ok(m.panel.classList.contains('rp-playing'));
 m.listeners.click({target:m.panel.button});assert.ok(m.panel.classList.contains('rp-paused'));assert.equal(m.panel.button.attrs['aria-pressed'],'true');assert.equal(m.panel.button.textContent,'Retomar exemplo');
 m.observer.cb([{target:m.panel,isIntersecting:false}]);assert.ok(!m.panel.classList.contains('rp-playing'));
 m.observer.cb([{target:m.panel,isIntersecting:true}]);assert.ok(m.panel.classList.contains('rp-paused'));
 m.listeners.click({target:m.panel.button});assert.ok(!m.panel.classList.contains('rp-paused'));
 m.doc.hidden=true;m.docListeners.visibilitychange();assert.ok(!m.panel.classList.contains('rp-playing'));
 m.doc.hidden=false;m.docListeners.visibilitychange();assert.ok(m.panel.classList.contains('rp-playing'));
 const added=m.makePanel();m.mutations.cb([{addedNodes:[added],removedNodes:[m.panel]}]);assert.ok(!m.observer.watched.has(m.panel));assert.ok(m.observer.watched.has(added));
 cleanup();assert.equal(m.observer.watched.size,0);assert.deepEqual(m.listeners,{});assert.deepEqual(m.docListeners,{});
});
