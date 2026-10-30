import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildDirectHint} from '../dist/direct-hints.mjs';
import {applyDirectAction} from '../dist/direct-actions.mjs';
import {initialGeometryState,validateGeometry} from '../dist/geometry-games.mjs';
import {validateSymbols} from '../dist/symbol-games.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {GEOMETRY_ANSWERS} from '../dist/geometry-answers.mjs';
let checks=0,actions=0,maxMs=0;
function hint(game,l,s){const before=JSON.stringify(s),start=performance.now(),h=buildDirectHint(game,l,s);maxMs=Math.max(maxMs,performance.now()-start);assert.equal(JSON.stringify(s),before,'Hint must not mutate state');assert.deepEqual(Object.keys(h).sort(),['action','cells','explanation','focusText']);assert.ok(h.explanation);assert.ok(h.focusText);assert.ok(h.cells.every(c=>Number.isInteger(c)&&c>=0&&c<l.rows*l.cols));checks++;return h;}
function initial(game,l){return game==='pacto'?{values:l.clues.slice(),candidates:Array.from({length:64},()=>[])}:game==='prumo'?applyDirectAction(game,l,initialGeometryState(l),{type:'initialize'}):initialGeometryState(l);}
function assertAction(game,l,h,solution){if(!h.action)return;actions++;const {cell,value,type}=h.action;if(game==='elo'){assert.equal(type,'place-point');assert.equal(cell,solution[l.regions[cell]]);}else{assert.equal(type,game==='prumo'?'paint':'set');assert.equal(value,solution[cell]);}assert.match(h.explanation,/L\d+C\d/);}
// Every shipped initial position, with a trap proving answer fields are unread.
for(const [game,levels] of Object.entries({...GEOMETRY_LEVELS,...SYMBOL_LEVELS}))for(const original of levels){const solution=game==='pacto'?original.solution:GEOMETRY_ANSWERS[original.id],l={...original};Object.defineProperty(l,'solution',{get(){throw Error('A hint read a hidden answer');}});const s=initial(game,l),h=hint(game,l,s);assert.ok(!h.explanation.startsWith('Contradição'),`${l.id}: valid initial state`);assertAction(game,l,h,solution);}
// Sequential application and partial states across catalogue difficulty bands.
for(const [game,levels] of Object.entries({...GEOMETRY_LEVELS,...SYMBOL_LEVELS}))for(const index of [0, Math.floor(levels.length/4), Math.floor(levels.length/2), levels.length-1]){const l=levels[index],solution=game==='pacto'?l.solution:GEOMETRY_ANSWERS[l.id];let s=initial(game,l);for(let i=0;i<64;i++){const h=hint(game,l,s);assert.ok(!h.explanation.startsWith('Contradição'),l.id);assertAction(game,l,h,solution);if(!h.action)break;const next=applyDirectAction(game,l,s,h.action);assert.notDeepEqual(next,s,'Explicit hint action must change state');assert.deepEqual(applyDirectAction(game,l,next,h.action),next,'Hint action is idempotent');s=next;}
 // Known valid solution plus a single gap must never be called contradictory.
 const done=game==='pacto'?{values:solution.slice(),candidates:[]}:game==='elo'?{positions:solution.slice(),discarded:[]}:{assignments:solution.slice()};const h=hint(game,l,done);assert.equal(h.action,null);assert.match(h.explanation,/válido|exatamente um vizinho/);const check=game==='pacto'?validateSymbols(l,done.values):validateGeometry(l,done);assert.ok(check.complete&&check.valid);}
// Contradictions win over unrelated available deductions.
const blank={game:'pacto',rows:8,cols:8,clues:Array(64).fill(-1)},values=Array(64).fill(-1);values[0]=values[1]=values[2]=0;let h=hint('pacto',blank,{values,candidates:[]});assert.equal(h.action,null);assert.match(h.explanation,/Contradição/);assert.match(h.explanation,/linha 1/);
// Zero partners with unfilled neighbours is pending, not a contradiction.
values.fill(-1);values[0]=0;h=hint('pacto',blank,{values});assert.ok(!h.explanation.startsWith('Contradição'));
// Manual candidates are not constraints, and must not change hint logic.
const l=SYMBOL_LEVELS.pacto[0],s=initial('pacto',l),base=hint('pacto',l,s);s.candidates=Array.from({length:64},()=>[3]);assert.deepEqual(hint('pacto',l,s),base);
const elo=GEOMETRY_LEVELS.elo[0],es=initial('elo',elo),eh=hint('elo',elo,es);es.discarded=Array.from({length:elo.rows*elo.cols},(_,i)=>i);assert.deepEqual(hint('elo',elo,es),eh);
// No unsupported promise or search for an unconstrained puzzle.
h=hint('pacto',blank,{values:Array(64).fill(-1)});assert.equal(h.action,null);assert.match(h.explanation,/Nenhuma resposta foi revelada/);
assert.equal(hint('desvio',{rows:1,cols:1},{}).action,null);
// ELO branching is a contradiction, unlike a temporarily under-connected point.
const branch={game:'elo',rows:3,cols:3,regions:[0,1,2,0,1,2,3,3,3],fixed:{}};
h=hint('elo',branch,{positions:[3,4,5,7]});assert.equal(h.action,null);assert.match(h.explanation,/Contradição/);assert.match(h.explanation,/conexões/);
// A complete PRUMO piece with nonzero moments is a rule conflict.
const balance={game:'prumo',rows:1,cols:3,supports:[{x2:0,y2:0}]};
h=hint('prumo',balance,{assignments:[0,0,0]});assert.equal(h.action,null);assert.match(h.explanation,/Contradição/);assert.match(h.explanation,/Momentos/);
// Large imported boards return a transparent limit rather than starting search.
const wide={game:'prumo',rows:9,cols:9,supports:[{x2:8,y2:8}]};
h=hint('prumo',wide,{assignments:Array(81).fill(-1)});assert.equal(h.action,null);assert.match(h.explanation,/Nenhuma resposta foi revelada/);
// Imports are restricted to lightweight geometric routines; no exact solver.
const source=readFileSync(new URL('../dist/direct-hints.mjs',import.meta.url),'utf8');assert.doesNotMatch(source,/solveGeometry|solveSymbols|geometryHint\(|symbolHint\(|\.solution\b|ANSWERS/);
console.log(JSON.stringify({passed:true,hintChecks:checks,actionsChecked:actions,maxHintMilliseconds:Math.round(maxMs*100)/100}));
