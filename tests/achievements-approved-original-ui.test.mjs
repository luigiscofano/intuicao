import assert from 'node:assert/strict';
import fs from 'node:fs';
import {root,store,$,timers,Element} from './direct-ui-harness.mjs';
import {readMissionLedger} from '../dist/achievements/mission-store.mjs';
import {readApprovedAttempts} from '../dist/achievements/approved-store.mjs';
import {cutLevels} from '../dist/levels.mjs';
import {getOriginalAnswer} from '../dist/original-answers.mjs';
// Deterministic DOM integration. Geometry, engine and persistence are production code.
Element.prototype.append ??= function(...nodes){for(const n of nodes)this.appendChild(n);};
Element.prototype.insertBefore ??= function(node){return this.appendChild(node);};
globalThis.window ??= {addEventListener(){}};
for(const key of ['min','max','type'])Object.defineProperty(Element.prototype,key,{get(){return this.attrs[key]??'';},set(v){this.attrs[key]=String(v);},configurable:true});
root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;
globalThis.cancelAnimationFrame=id=>timers.delete(id);globalThis.matchMedia=()=>({matches:true});
store.set('intuicao.campaign.original.v1',JSON.stringify({
  [`cut:${cutLevels[3].id}`]:{state:getOriginalAnswer('cut',3),cutMode:'basic',missionRound:{confirmations:1,assisted:false}},
  [`cut:${cutLevels[4].id}`]:{state:getOriginalAnswer('cut',4),cutMode:'basic'},
}));
await import('../dist/app.mjs');
const open=(game,n=0)=>{root.querySelector(`[data-game="${game}"]`).click();$('level-grid').querySelector(`[data-level="${n}"]`).click();};
const reset=()=>{$('reset').click();$('restart-original-confirm').click();};
const input=(key,value)=>{const e=$(key);e.validity={valid:true};e.value=String(value);e.dispatch('input');e.dispatch('change');};
const missions=()=>readMissionLedger().unlocked;
const round=(game,id)=>JSON.parse(store.get('intuicao.campaign.original.v1'))[`${game}:${id}`].missionRound;
open('cut',3);assert.deepEqual(readApprovedAttempts().firstWins,[],'reload does not grant');
$('confirm').click();assert.equal(round('cut',cutLevels[3].id).confirmations,2);assert.deepEqual(readApprovedAttempts().firstWins,[],'reload retains failed confirmation');
open('cut',4);$('confirm').click();assert.deepEqual(readApprovedAttempts().firstWins,[],'legacy saved solution is not proof of a first unassisted confirmation');
open('cut');input('basicTravel',0);
assert.equal(missions()['cut-millimetric-eye'],undefined,'preview cannot grant');
$('undo').click();$('redo').click();assert.equal(missions()['cut-millimetric-eye'],undefined,'history cannot grant');
$('confirm').click();
assert.ok(missions()['cut-millimetric-eye']);assert.ok(missions()['precision-first-try']);
assert.deepEqual(readApprovedAttempts().firstWins,['cut:corte-v2-1']);
assert.equal(round('cut',cutLevels[0].id).confirmations,1);
open('cut');$('confirm').click();assert.equal(round('cut',cutLevels[0].id).confirmations,2,'completed return resumes round, not first visit');
assert.equal(readApprovedAttempts().firstWins.length,1);
open('cut',1);$('confirm').click();input('basicTravel',cutLevels[1].solutionTravel);$('confirm').click();
assert.equal(readApprovedAttempts().firstWins.length,1,'second confirmation cannot count');
reset();assert.equal(round('cut',cutLevels[1].id).confirmations,0);
input('basicTravel',cutLevels[1].solutionTravel);$('confirm').click();assert.equal(readApprovedAttempts().firstWins.length,2,'explicit restart begins a new round');
open('cut',2);for(let i=0;i<3;i++)$('confirm').click();$('answer-key').click();$('confirm').click();
assert.equal(readApprovedAttempts().firstWins.length,2,'answer-applied success excluded');
reset();input('basicTravel',cutLevels[2].solutionTravel);$('confirm').click();
assert.equal(readApprovedAttempts().firstWins.length,3,'independent round after assisted attempt can count');
assert.ok(missions()['precision-three-first-tries']);
open('light',13);for(let i=0;i<4;i++){
 $('scene').dispatch('pointerdown',{target:$('drawing').querySelector(`[data-item="${i}"]`)});input('angle',45);
}
assert.equal(missions()['light-light-jump'],undefined);
$('confirm').click();assert.ok(missions()['light-light-jump'],'official portal and same-ray mirror witness');
console.log('PASS human-only original missions: edits/history, first confirmation, repeat/revisit, restart, gabarito, aggregate and real Reflexos witness');
