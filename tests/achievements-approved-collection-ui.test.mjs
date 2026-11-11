// Actual production handlers in the deterministic DOM harness; not browser/layout QA.
import assert from 'node:assert/strict';
import {host, store, $} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {GEOMETRY_ANSWERS} from '../dist/geometry-answers.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {SYMBOL_CYCLE} from '../dist/direct-actions.mjs';
import {pactoPairs} from '../dist/achievements/approved-collection.mjs';
const saved = () => JSON.parse(store.get('intuicao.collection.v1'));
const unlocked = () => JSON.parse(store.get('intuicao.missions.v1') || '{"unlocked":{}}').unlocked;
let app = initCollection({hideOriginal(){}});
function start(game,index) { app.activate(game); host.querySelector(`[data-new-level="${index}"]`).click(); }
function reset() { $('c-reset').click(); $('restart-collection-confirm').click(); }
function fillGeometry(game,index) {
  const level = GEOMETRY_LEVELS[game][index], answer = GEOMETRY_ANSWERS[level.id];
  for (let i = 0; i < answer.length; i++) {
    const state = saved().sessions[level.id].history.present;
    if(game === 'elo') {
      if (state.positions[i] !== answer[i]) $('c-board').querySelector(`[data-cell="${answer[i]}"]`).click();
    } else if(state.assignments[i] !== answer[i]) {
      host.querySelector(`[data-value="${answer[i]}"]`).click();
      $('c-board').querySelector(`[data-cell="${i}"]`).click();
    }
  }
}
start('elo',7);
for(let i=0;i<3;i++) $('c-hint').click();
assert.equal($('c-hint-apply').hidden,false);
$('c-hint-apply').click();
assert.equal(saved().sessions[GEOMETRY_LEVELS.elo[7].id].missionAssisted,true);
fillGeometry('elo',7); $('c-confirm').click();
assert(!unlocked()['precision-first-try'],'applying a deduction invalidates the round, unlike reading a hint');
reset();
assert.equal(saved().sessions[GEOMETRY_LEVELS.elo[7].id].missionAssisted,false);
assert.equal(saved().sessions[GEOMETRY_LEVELS.elo[7].id].missionConfirmations,0);
start('elo',0);
$('c-confirm').click();
assert.equal(saved().sessions[GEOMETRY_LEVELS.elo[0].id].missionConfirmations,1);
app.hide(); app = initCollection({hideOriginal(){}});
start('elo',0); fillGeometry('elo',0); $('c-confirm').click();
assert(!unlocked()['precision-first-try'], 'reload after a failure does not become a first try');
reset(); $('c-hint').click(); fillGeometry('elo',0); $('c-confirm').click();
assert(unlocked()['precision-first-try']);
$('c-confirm').click();
assert.equal(JSON.parse(store.get('intuicao.approved-attempts.v1')).firstWins.length,1);
reset(); fillGeometry('elo',0); $('c-confirm').click();
assert.equal(JSON.parse(store.get('intuicao.approved-attempts.v1')).firstWins.length,1,'repeating same phase does not count twice');
for(const index of [1,2]) { start('elo',index); fillGeometry('elo',index); $('c-confirm').click(); }
assert(unlocked()['precision-three-first-tries']);
start('prumo',15);
for(let i=0;i<3;i++) $('c-confirm').click();
$('c-answer').click(); $('c-confirm').click();
assert(!unlocked()['prumo-unlikely-balance'],'gabarito does not earn an action mission');
reset();
$('c-answer').click();
app.hide(); app = initCollection({hideOriginal(){}}); start('prumo',15);
fillGeometry('prumo',15); $('c-confirm').click();
assert(!unlocked()['prumo-unlikely-balance'],'assistance survives reload');
reset(); fillGeometry('prumo',15);
assert(!unlocked()['prumo-unlikely-balance'],'valid board without confirmation is not enough');
$('c-confirm').click(); assert(unlocked()['prumo-unlikely-balance']);
start('pacto',0);
const level = SYMBOL_LEVELS.pacto[0];
const input = cell => $('c-board').querySelector(`[data-cell="${cell}"]`).dispatch('keydown',{key:String(SYMBOL_CYCLE.indexOf(level.solution[cell])+1)});
const values = () => saved().sessions[level.id].history.present.values;
const initial = pactoPairs(level,level.clues);
const missing = [...pactoPairs(level,level.solution)].filter(([key])=>!initial.has(key));
for(const symbol of [0,1,2,3]) {
  const [key] = missing.find(([,value])=>value===symbol);
  for(const cell of key.split(':').slice(0,2).map(Number)) if(values()[cell]<0) input(cell);
}
assert(!unlocked()['pacto-quartet'],'quartet must be followed by a win');
for(let cell=0;cell<64;cell++) if(values()[cell]<0) input(cell);
assert(unlocked()['pacto-quartet'],'human final edit awards automatic victory without extra confirmation');
store.delete('intuicao.missions.v1');
$('c-undo').click(); $('c-redo').click();
assert(!unlocked()['pacto-quartet'],'history replay cannot recreate pair observations');
$('c-confirm').click();
assert(!unlocked()['pacto-quartet'],'confirming replayed win cannot manufacture quartet');
app.hide(); app = initCollection({hideOriginal(){}}); start('pacto',0);
assert(!unlocked()['pacto-quartet'],'restoring solved board never awards quartet');
console.log('PASS approved collection UI: failed/reloaded attempts, fresh rounds, distinct levels, PRUMO confirm, PACTO human auto-win, history and reload isolation.');
