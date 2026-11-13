import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { rulesPreviewMarkup, initRulesPreviews } from '../dist/rules-preview.mjs';
import { RULE_EXAMPLES } from '../dist/rules-examples.mjs';
import { CATEGORY_GAMES } from '../dist/category-navigation.mjs';
const games=Object.values(CATEGORY_GAMES).flat();
test('todos os 19 jogos ativos têm regras simples e detalhes completos, exemplo próprio acessível e nenhum controle de pausa',()=>{
 assert.equal(games.length,19);
 assert.deepEqual(Object.keys(RULE_EXAMPLES).filter(id=>games.includes(id)).sort(),[...games].sort());
 for(const game of games){
  const html=rulesPreviewMarkup(game);
  assert.ok(RULE_EXAMPLES[game].steps.length>=3,game);
  assert.ok(RULE_EXAMPLES[game].steps.every(s=>s.length>40),game);
  assert.match(html,/Como jogar/);assert.match(html,/<svg/);assert.match(html,/aria-hidden="true"/);
  assert.match(html,/<figcaption class="rp-description">[^<]{35}/);
  assert.doesNotMatch(html,/<button|rp-motion-toggle|aria-pressed|Pausar exemplo|Retomar exemplo/);
  assert.doesNotMatch(html,/<script|onload=|onclick=|foreignObject|href="https?:|undefined/);
 }
 assert.equal(rulesPreviewMarkup('unknown'),'');
});
test('loop é o novo contrato explícito, preservando redução de movimento e suspensão fora da tela',()=>{
 const css=readFileSync(new URL('../dist/rules-preview.css',import.meta.url),'utf8');
 const examples=readFileSync(new URL('../dist/rules-examples.css',import.meta.url),'utf8');
 assert.match(css,/--rp-cycle:4\.8s/);assert.match(css,/infinite/);
 assert.match(css,/prefers-reduced-motion/);assert.match(css,/data-ui-reduced-motion/);
 assert.match(css,/rules-preview:not\(\.rp-playing\)[\s\S]*animation-play-state:paused!important/);
 assert.doesNotMatch(css,/rp-paused|rp-motion-toggle/);
 assert.match(css,/animation:none!important/);
 for(const animation of [...examples.matchAll(/animation:([^;}]+)/g)]) assert.match(animation[1],/infinite/);
 const ui=readFileSync(new URL('../dist/rules-preview.mjs',import.meta.url),'utf8');
 assert.doesNotMatch(ui,/localStorage|sessionStorage|setInterval|setTimeout|requestAnimationFrame|rp-paused|rp-motion-toggle|Retomar exemplo|Pausar exemplo/);
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
 const makePanel=()=>{const classes=new Set(); const panel={nodeType:1,dataset:{rulesGame:'light'},classList:{toggle(c,force){const next=force??!classes.has(c);if(next)classes.add(c);else classes.delete(c);return next;},remove(c){classes.delete(c);},contains(c){return classes.has(c);}},matches:s=>s==='.rules-preview',querySelectorAll:()=>[]};return panel;};
 const panel=makePanel();const root={nodeType:1,matches:()=>false,querySelectorAll:()=>[panel],contains:()=>true,addEventListener:(n,fn)=>listeners[n]=fn,removeEventListener:n=>delete listeners[n]};
 const win={IntersectionObserver:class{constructor(cb){this.cb=cb;this.watched=new Set();observer=this;}observe(p){this.watched.add(p);}unobserve(p){this.watched.delete(p);}disconnect(){this.watched.clear();}},MutationObserver:class{constructor(cb){this.cb=cb;mutations=this;}observe(){}disconnect(){}}};
 const doc={hidden:false,getElementById:()=>root,defaultView:win,addEventListener:(n,fn)=>docListeners[n]=fn,removeEventListener:n=>delete docListeners[n]};
 return {doc,panel,makePanel,listeners,docListeners,get observer(){return observer;},get mutations(){return mutations;}};
}
test('visibilidade automática, remoção e limpeza são independentes da partida',()=>{
 const m=mock(),cleanup=initRulesPreviews(m.doc);
 assert.equal(initRulesPreviews(m.doc),cleanup);assert.ok(m.observer.watched.has(m.panel));
 assert.deepEqual(m.listeners,{},'nenhum controle manual ou listener de clique');
 m.observer.cb([{target:m.panel,isIntersecting:true}]);assert.ok(m.panel.classList.contains('rp-playing'));
 m.observer.cb([{target:m.panel,isIntersecting:false}]);assert.ok(!m.panel.classList.contains('rp-playing'));
 m.observer.cb([{target:m.panel,isIntersecting:true}]);assert.ok(m.panel.classList.contains('rp-playing'));
 m.doc.hidden=true;m.docListeners.visibilitychange();assert.ok(!m.panel.classList.contains('rp-playing'));
 m.doc.hidden=false;m.docListeners.visibilitychange();assert.ok(m.panel.classList.contains('rp-playing'));
 const added=m.makePanel();m.mutations.cb([{addedNodes:[added],removedNodes:[m.panel]}]);assert.ok(!m.observer.watched.has(m.panel));assert.ok(m.observer.watched.has(added));
 cleanup();assert.equal(m.observer.watched.size,0);assert.deepEqual(m.listeners,{});assert.deepEqual(m.docListeners,{});
});
