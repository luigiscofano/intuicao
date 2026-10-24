import assert from 'node:assert/strict';
import fs from 'node:fs';
import {root,store,$,timers} from './direct-ui-harness.mjs';
import {createAnswerProgress} from '../dist/answer-progress.mjs';
import {cutLevels} from '../dist/levels.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;
globalThis.cancelAnimationFrame=id=>timers.delete(id);globalThis.matchMedia=()=>({matches:false});
await import('../dist/app.mjs');
const answers=createAnswerProgress(),middle=(board,target=board)=>{target.dispatch('pointerdown',{button:1,buttons:4});target.dispatch('mousedown',{button:1,buttons:4});target.dispatch('pointerup',{button:1,buttons:0});board.dispatch('auxclick',{button:1});};
for(const game of ['light','cut']){
 root.querySelector(`[data-game="${game}"]`).click();$('level-grid').querySelector('[data-level="0"]').click();
 assert.equal($('level-prev').parentElement.attrs.class,'board-navigation');assert.equal($('level-next').parentElement,$('level-prev').parentElement);assert.ok(!$('scene').contains($('level-prev')));assert.equal(root.querySelectorAll('#level-prev').length,1);assert.equal($('level-prev').disabled,true);assert.equal($('level-next').disabled,false);
 const initial=$('drawing').innerHTML;
 middle($('scene'),$('drawing').querySelector(game==='cut'?'[data-item="basic-cut"]':'[data-item="0"]'));
 if(game==='cut'){assert.equal(answers.get('cut:'+cutLevels[0].id).failures,1);assert.ok($('confirm').title.includes('rodinha'));}
 else assert.equal($('scene').attrs['aria-busy'],'false');
 $('reset').click();const stale=$('restart-original-confirm');$('level-next').click();assert.equal($('restart-original').open,false);const next=$('drawing').innerHTML;stale.click();assert.equal($('drawing').innerHTML,next);assert.equal(+$('level').value,1);
 $('level-prev').click();assert.equal(+$('level').value,0);
 const last=game==='cut'?99:199;$('level').dispatch('change',{target:{value:last}});assert.equal($('level-next').disabled,true);$('level-next').onclick();assert.equal(+$('level').value,last);assert.equal($('next').disabled,true);
 $('free').click();assert.equal($('level-prev').hidden,true);assert.equal($('level-next').hidden,true);
 console.log('PASS',game,'side navigation, boundaries, free mode, stale reset and middle behavior');
}
root.querySelector('[data-game="light"]').click();$('level-grid').querySelector('[data-level="0"]').click();$('confirm').click();assert.equal($('scene').attrs['aria-busy'],'true');$('level-next').click();assert.equal($('scene').attrs['aria-busy'],'false');assert.equal(timers.size,0);
const saved=()=>JSON.parse(store.get('intuicao.collection.v1'));
for(const game of ['elo','prumo','pacto']){
 root.querySelector(`[data-collection="${game}"]`).click();$('collection').querySelector('[data-new-level="0"]').click();
 assert.equal($('c-level-prev').parentElement.attrs.class,'board-navigation');assert.equal($('c-level-next').parentElement,$('c-level-prev').parentElement);assert.ok(!$('c-board-surface').contains($('c-level-prev')));assert.equal(root.querySelectorAll('#c-level-prev').length,1);assert.equal($('c-level-prev').disabled,true);assert.equal($('c-level-next').disabled,false);
 const key=saved().lastSessions[game],before=structuredClone(saved().sessions[key].history.present);
 if(game==='elo'){
  middle($('c-board'),$('c-board').querySelector('[data-cell="0"]'));assert.equal(answers.get('elo:'+key).failures,1);assert.deepEqual(saved().sessions[key].history.present,before);
  const l=GEOMETRY_LEVELS.elo[0],i=l.regions.findIndex(r=>l.fixed?.[r]===undefined);$('c-board').querySelector(`[data-cell="${i}"]`).dispatch('keydown',{key:'Enter'});
 }else{const n=store.get('intuicao.answers.v1');middle($('c-board'));assert.equal(store.get('intuicao.answers.v1'),n);}
 const draft=structuredClone(saved().sessions[key].history.present);
 $('c-reset').click();const stale=$('restart-collection-confirm');$('c-level-next').click();assert.equal($('restart-collection').open,false);const key2=saved().lastSessions[game];assert.notEqual(key,key2);stale.click();assert.equal(saved().lastSessions[game],key2);
 $('c-level-prev').click();assert.equal(saved().lastSessions[game],key);assert.deepEqual(saved().sessions[key].history.present,draft);
 $('c-back').click();$('collection').querySelector('[data-new-level="199"]').click();assert.equal($('c-level-next').disabled,true);const last=saved().lastSessions[game];$('c-level-next').onclick();assert.equal(saved().lastSessions[game],last);assert.equal($('c-next').disabled,true);
 console.log('PASS',game,'side navigation, first/last, draft restored, stale reset, middle scoped');
}
root.querySelector('[data-collection="desvio"]').click();$('collection').querySelector('[data-map="0"]').click();assert.equal($('c-level-next'),undefined);assert.equal($('c-level-prev'),undefined);
console.log('PASS DESVIO has no level arrows; Reflexos navigation cancels animation');

const styles=fs.readFileSync(new URL('../dist/style.css',import.meta.url),'utf8');
assert.match(styles,/grid-template-columns:44px minmax\(0,1fr\) 44px/);
assert.match(styles,/\.board-navigation> \.level-arrow\{align-self:center;position:static;margin-bottom:var\(--result-reserved-height\)\}/);
assert.match(styles,/max-width:796px/);
assert.match(styles,/gap:2px;padding:0 2px/);
console.log('PASS side navigation owns separate columns; no arrows in clickable board; one arrow per direction; responsive lanes and intrinsic board sizing');

assert.match(styles,/min-height:var\(--result-reserved-height,86px\)/);
