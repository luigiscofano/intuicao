import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {comparePactoReference,createPactoCheck} from '../dist/pacto-check.mjs';
import {validateSymbols} from '../dist/symbol-games.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {SYMBOL_CYCLE} from '../dist/direct-actions.mjs';
import {generateCollectionEndless} from '../dist/endless-collection.mjs';
import {host,$,store} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
function fakeClock(){let now=0,id=0;const pending=new Map();return {Date:{now:()=>now},pending,setTimeout(fn,ms){pending.set(++id,{fn,at:now+ms});return id;},clearTimeout(i){pending.delete(i);},tick(ms){const end=now+ms;while(true){const e=[...pending].filter(([,v])=>v.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!e)break;now=e[1].at;pending.delete(e[0]);e[1].fn();}now=end;}};}
const l=SYMBOL_LEVELS.pacto[0],free=l.clues.findIndex(v=>v<0),values=l.clues.slice();
assert.equal(comparePactoReference(l,values,l.solution).kind,'empty');
assert.equal(comparePactoReference(l,values,null).kind,'unavailable');
values[free]=l.solution[free];assert.equal(comparePactoReference(l,values,l.solution).kind,'correct');
values[free]=(values[free]+1)%4;assert.deepEqual(comparePactoReference(l,values,l.solution).cells,[free]);
const alternative=l.solution.map(v=>(v+1)%4),noClues={...l,clues:Array(64).fill(-1)};
assert.equal(validateSymbols(noClues,alternative).valid,true);assert.equal(comparePactoReference(noClues,alternative,l.solution).kind,'mismatch');
const unitClock=fakeClock();let changes=0;const check=createPactoCheck(()=>changes++,unitClock);
check.check(l,values,l.solution);const stale=[...unitClock.pending.values()][0].fn;unitClock.tick(9999);assert.ok(check.get());check.check(l,values,l.solution);stale();assert.ok(check.get());unitClock.tick(9999);assert.ok(check.get());unitClock.tick(1);assert.equal(check.get(),null);check.check(l,values,l.solution);check.reset();unitClock.tick(10000);assert.equal(check.get(),null);
console.log('PASS manual reference, fixed/empty ignored, alternative valid solution remains a reference mismatch, 10s/repeat/stale/reset');
const clock=fakeClock();globalThis.setTimeout=clock.setTimeout;globalThis.clearTimeout=clock.clearTimeout;const oldNow=Date.now;Date.now=clock.Date.now;
const app=initCollection({hideOriginal(){}});const data=()=>JSON.parse(store.get('intuicao.collection.v1'));
const cell=i=>$('c-board').querySelector(`[data-cell="${i}"]`);const input=(i,v)=>cell(i).dispatch('keydown',{key:String(SYMBOL_CYCLE.indexOf(v)+1)});
function start(){app.activate('pacto');host.querySelector('[data-new-level="0"]').click();$('c-reset').click();$('restart-collection-confirm').click();}
const cleared=()=>{assert.equal($('c-check-status').hidden,true);assert.equal($('c-check-ring').hidden,true);};
try{
 start();$('c-check').click();assert.match($('c-check-status').textContent,/Preencha/);assert.equal($('c-check-ring').hidden,true);
 cell(free).dispatch('keydown',{key:'1',shiftKey:true});cleared();$('c-check').click();assert.match($('c-check-status').textContent,/Preencha/);
 input(free,l.solution[free]);cleared();const before=JSON.stringify(data());$('c-check').click();assert.equal(JSON.stringify(data()),before);assert.match($('c-check-status').textContent,/Tudo certo até aqui/);assert.equal($('c-check-ring').hidden,false);assert.equal($('c-details').textContent,'');
 clock.tick(9999);assert.equal($('c-check-status').hidden,false);$('c-check').click();clock.tick(1);assert.equal($('c-check-status').hidden,false);$('c-advanced-toggle').click();clock.tick(9998);assert.equal($('c-check-status').hidden,false);clock.tick(1);cleared();
 input(free,(l.solution[free]+1)%4);$('c-check').click();assert.ok(cell(free).matches('.cell-conflict'));assert.ok(cell(free).matches('.pacto-conflict-enter'));assert.match($('c-check-status').textContent,/gabarito de referência/);
 $('c-undo').click();cleared();$('c-check').click();$('c-redo').click();cleared();$('c-check').click();$('c-reset').click();$('restart-collection-confirm').click();cleared();
 input(free,l.solution[free]);$('c-check').click();$('c-level-next').click();clock.tick(10000);cleared();
 start();input(free,l.solution[free]);$('c-check').click();app.activate('elo');host.querySelector('[data-new-level="0"]').click();clock.tick(10000);assert.ok($('c-check'));cleared();
 start();const custom=JSON.parse($('c-editor-json').value);$('c-editor-json').value=JSON.stringify(custom);$('c-editor-play').click();assert.equal($('c-check').disabled,false,'validated custom receives a recomputed reference');$('c-check').click();assert.match($('c-check-status').textContent,/Preencha/);
 app.activate('pacto');$('c-free').click();let run=data().endless.pacto;const generated=generateCollectionEndless('pacto',run.seed,run.options);const i=generated.level.clues.findIndex(v=>v<0);input(i,generated.answer.values[i]);$('c-check').click();assert.match($('c-check-status').textContent,/Tudo certo/);assert.equal(data().endless.pacto.solved,0);assert.equal(data().endless.pacto.failures,0);assert.equal(data().sessions['endless:pacto'].assistance,false);
 // Confirm still owns victory, and a check cannot cancel the pending next puzzle.
 for(let n=0;n<3;n++)$('c-confirm').click();$('c-answer').click();$('c-confirm').click();const seed=data().endless.pacto.seed;$('c-check').click();clock.tick(10000);assert.notEqual(data().endless.pacto.seed,seed);cleared();
 console.log('PASS campaign/Endless UI: annotations, counters, correct/mismatch, timing, repeat, rerender, edit/undo/redo/reset/navigation/game switch/certified custom and automatic advance');
}finally{Date.now=oldNow;}
const css=readFileSync(new URL('../dist/style.css',import.meta.url),'utf8');assert.match(css,/prefers-reduced-motion:no-preference\)\{\s*\.pacto-check-controls/);assert.match(css,/\.pacto-check-ring\{[^}]*pointer-events:none/);
console.log('PASS reduced-motion and non-intercepting scoped check overlays');
