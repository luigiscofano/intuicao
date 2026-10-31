import assert from 'node:assert/strict';
import {host,store,$,flush} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {SYMBOL_CYCLE} from '../dist/direct-actions.mjs';
import {createAnswerProgress} from '../dist/answer-progress.mjs';
import {generateCollectionEndless} from '../dist/endless-collection.mjs';
const read=()=>JSON.parse(store.get('intuicao.collection.v1'));
let app=initCollection({hideOriginal(){}});app.activate('pacto');
const input=(i,v)=>$('c-board').querySelector(`[data-cell="${i}"]`).dispatch('keydown',{key:String(SYMBOL_CYCLE.indexOf(v)+1)});
for(let index=0;index<(process.env.PACTO_SMOKE?1:80);index++){
 const level=SYMBOL_LEVELS.pacto[index],cells=level.clues.flatMap((v,i)=>v<0?[i]:[]);host.querySelector(`[data-new-level="${index}"]`).click();
 for(const cell of cells.slice(0,-1))input(cell,level.solution[cell]);
 assert.notEqual($('c-motion').dataset.outcome,'win');assert.ok(!read().completed.includes(level.id));assert.equal(createAnswerProgress().get('pacto:'+level.id).failures,0);
 const last=cells.at(-1);input(last,(level.solution[last]+1)%4);assert.notEqual($('c-motion').dataset.outcome,'win');assert.equal(createAnswerProgress().get('pacto:'+level.id).failures,0);
 input(last,level.solution[last]);assert.equal($('c-motion').dataset.outcome,'win');assert.match($('c-motion').innerHTML,/victory-celebration/);assert.ok(read().completed.includes(level.id));assert.equal(read().events.filter(e=>e.type==='level-complete'&&e.level===level.id).length,1);
 // Same value is not a transition and must not restart the scene.
 const markup=$('c-motion').innerHTML;input(last,level.solution[last]);assert.equal($('c-motion').innerHTML,markup);
 $('c-undo').click();assert.notEqual($('c-motion').dataset.outcome,'win');$('c-redo').click();assert.equal($('c-motion').dataset.outcome,'win');assert.match($('c-motion').innerHTML,/victory-celebration/);
 $('c-advanced-toggle').click();assert.equal($('c-motion').dataset.outcome,'win');assert.doesNotMatch($('c-motion').innerHTML,/victory-celebration/);assert.match($('c-motion').innerHTML,/game-victory-static/);
 $('c-back').click();
 if(index===0||index===79){app=initCollection({hideOriginal(){}});app.activate('pacto');host.querySelector(`[data-new-level="${index}"]`).click();assert.equal($('c-motion').dataset.outcome,'win');assert.doesNotMatch($('c-motion').innerHTML,/victory-celebration/);assert.equal(read().events.filter(e=>e.type==='level-complete'&&e.level===level.id).length,1);$('c-back').click();}
}
app.activate('pacto');$('c-free').click();const run=read().endless.pacto;const generated=generateCollectionEndless('pacto',run.seed,run.options);const level=JSON.parse($('c-editor-json').value);const solution=generated.solution??generated.answer?.values;
assert.ok(solution,'endless answer exists');for(let i=0;i<64;i++)if(level.clues[i]<0)input(i,solution[i]);assert.equal($('c-motion').dataset.outcome,'win');assert.equal(read().endless.pacto.solved,1);$('c-confirm').click();assert.equal(read().endless.pacto.solved,1);flush();assert.notEqual(read().endless.pacto.seed,run.seed);
// Other collection games remain manually confirmed.
for(const game of ['elo','prumo']){app.activate(game);host.querySelector('[data-new-level="0"]').click();for(let i=0;i<3;i++)$('c-confirm').click();$('c-answer').click();assert.notEqual($('c-motion').dataset.outcome,'win');$('c-confirm').click();assert.equal($('c-motion').dataset.outcome,'win');}
console.log('PASS '+(process.env.PACTO_SMOKE?1:80)+' PACTO last-move auto wins; invalid/partial no failures; same value no restart; undo/redo transitions; static rerender/reload; endless once+advance; ELO/PRUMO manual unchanged');
