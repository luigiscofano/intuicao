/** Independent regression against the exact pre-expansion source. No baseline is rewritten. */
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {validateGeometry,eloEdges,initialGeometryState} from '../dist/geometry-games.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {GEOMETRY_ANSWERS} from '../dist/geometry-answers.mjs';
const {baseCommit}=JSON.parse(readFileSync(new URL('./elo-v3-baseline-sha256.json',import.meta.url)));
const prior=async f=>import('data:text/javascript;base64,'+execFileSync('git',['show',baseCommit+':dist/'+f],{cwd:new URL('..',import.meta.url),maxBuffer:20e6}).toString('base64'));
const old=await prior('geometry-games.mjs'),oldLevels=(await prior('geometry-levels.mjs')).GEOMETRY_LEVELS,oldAnswers=(await prior('geometry-answers.mjs')).GEOMETRY_ANSWERS;
assert.deepEqual(GEOMETRY_LEVELS.prumo,oldLevels.prumo,'PRUMO campaign data unchanged');
for(const l of oldLevels.prumo)assert.deepEqual(GEOMETRY_ANSWERS[l.id],oldAnswers[l.id],'PRUMO answer unchanged');
let classic=0,partial=0,prumo=0;
for(const l of oldLevels.elo){
 const answer=oldAnswers[l.id];assert.ok(validateGeometry(l,{positions:answer}).complete,l.id);
 assert.deepEqual(eloEdges(l,answer),old.eloEdges(l,answer),'classical visibility unchanged');
 assert.deepEqual(GEOMETRY_ANSWERS[l.id],answer,'legacy answer retained');
 const start=initialGeometryState(l);assert.deepEqual(start,old.initialGeometryState(l));
 for(let mask=0;mask<32;mask++){
  const p=answer.map((c,r)=>l.fixed?.[r]!==undefined||((mask>>>r%5)&1)?c:-1),state={positions:p,discarded:Array.from({length:l.rows*l.cols},(_,i)=>i)};
  const a=validateGeometry(l,state),b=old.validateGeometry(l,state);
  assert.equal(a.complete,b.complete,l.id+' completion unchanged');assert.equal(a.valid,b.valid,l.id+' partial validity unchanged');
  assert.deepEqual(a.edges,b.edges,l.id+' graph unchanged');partial++;
 }
 classic++;
}
for(const l of oldLevels.prumo){
 const solution=oldAnswers[l.id];for(const a of [initialGeometryState(l),{assignments:solution}, {assignments:solution.map((v,i)=>i%3?v:-1)}])assert.deepEqual(validateGeometry(l,a),old.validateGeometry(l,a),'PRUMO engine byte-equivalent behavior');prumo++;
}
console.log(JSON.stringify({passed:true,legacyEloSolutions:classic,legacyEloPartialStates:partial,prumoLevelsUnchanged:prumo}));
