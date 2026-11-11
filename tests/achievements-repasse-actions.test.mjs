import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CAMPAIGN} from '../dist/repasse/campaign.mjs';
import {initialState,transition} from '../dist/repasse/engine.mjs';
import {createRepasseMissionAttempt,observeRepasseMissionCommand,invalidateRepasseMissionAttempt} from '../dist/achievements/repasse-action-missions.mjs';

const chain=CAMPAIGN.find(level=>level.id===14);
const arrival=CAMPAIGN.find(level=>level.id===269);
const CHAIN=['p2','p1','p3'];
const ARRIVAL=['p1','p8','p3','p2','p7','p4','p6','p5'];
function run(level,order,{options={},human=true,invalidateAt=-1}={}){
  const attempt=createRepasseMissionAttempt(level,options);
  let state=initialState(level),unlocked=[];const steps=[];
  for(const [index,pieceId] of order.entries()){
    if(index===invalidateAt)invalidateRepasseMissionAttempt(attempt);
    const next=transition(level,state,pieceId);assert.equal(next.changed,true);
    const ids=observeRepasseMissionCommand(attempt,{before:state,after:next.state,pieceId,human});
    if(index<order.length-1)assert.deepEqual(ids,[],'Never award before victory');
    unlocked.push(...ids);steps.push(next);state=next.state;
  }
  return {unlocked,attempt,steps,state};
}

test('REPASSE chain uses three sequential carriers and requires final exact goals',()=>{
  const result=run(chain,CHAIN);
  assert.deepEqual(result.unlocked,['repasse-chain-inheritance']);
  assert.equal(result.steps.at(-1).result.won,true);
  assert.equal(result.attempt.depth[chain.pieces.findIndex(p=>p.id==='p3')],3);
  // Three ancestral sources in a single withdrawal are not three edge arrivals.
  assert.ok([...result.attempt.arrivals.values()].every(s=>s.size<3));
  assert.deepEqual(run(chain,['p1','p2','p3']).unlocked,[]);
  assert.deepEqual(run(chain,CHAIN.slice(0,2)).unlocked,[]);
});

test('REPASSE arrival requires one box receiving three separate withdrawals and victory',()=>{
  const result=run(arrival,ARRIVAL);
  assert.ok(result.unlocked.includes('repasse-arrival-account'));
  assert.equal(result.steps.at(-1).result.won,true);
  assert.ok([...result.attempt.arrivals.values()].some(s=>s.size>=3));
  assert.deepEqual(run(arrival,ARRIVAL.slice(0,-1)).unlocked,[]);
});

test('REPASSE rejects assisted, custom, resumed and history-derived evidence',()=>{
  for(const options of [{mode:'custom'},{mode:'endless'},{resumed:true}])assert.deepEqual(run(chain,CHAIN,{options}).unlocked,[]);
  assert.deepEqual(run(structuredClone(chain),CHAIN).unlocked,[],'An imported copy is not the official definition');
  assert.deepEqual(run(chain,CHAIN,{human:false}).unlocked,[]);
  assert.deepEqual(run(chain,CHAIN,{invalidateAt:1}).unlocked,[]);
});

test('REPASSE each replay starts a new independent round; no state or duplicate credit leaks',()=>{
  const first=run(chain,CHAIN),second=run(chain,CHAIN);
  assert.deepEqual(second.unlocked,first.unlocked);
  assert.notEqual(first.attempt,second.attempt);
  const last=first.steps.at(-1);
  assert.deepEqual(observeRepasseMissionCommand(first.attempt,{before:first.steps.at(-2).state,after:last.state,pieceId:CHAIN.at(-1),human:true}),[]);
  const attempt=createRepasseMissionAttempt(chain);
  assert.deepEqual(observeRepasseMissionCommand(attempt,{before:first.steps[0].state,after:first.steps[1].state,pieceId:CHAIN[1],human:true}),[]);
  assert.equal(attempt.eligible,false,'Skipped history cannot be imported as human provenance');
});

test('REPASSE integration records only accepted removals, not preview, history or recordWin',()=>{
  const ui=readFileSync(new URL('../dist/repasse/ui.mjs',import.meta.url),'utf8').replace(/\s+/g,'');
  assert.equal((ui.match(/recordMissionUnlocks\(observeRepasseMissionCommand/g)??[]).length,1);
  assert.match(ui,/human:!assisted&&!silent/);
  assert.match(ui,/resumed:session.cursor>0/);
  assert.match(ui,/functiontravelHistory\(delta\)[\s\S]*?invalidateRepasseMissionAttempt\(missionAttempt\)/);
  assert.match(ui,/functionrestartCurrentImmediately\(\)[\s\S]*?missionAttempt=createRepasseMissionAttempt\(level,\{mode\}\)/);
});
