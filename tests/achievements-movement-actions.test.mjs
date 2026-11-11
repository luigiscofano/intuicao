import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPAIGN as S} from '../dist/sintonia/campaign.mjs';
import {CAMPAIGN as O} from '../dist/orbita/campaign.mjs';
import * as sintonia from '../dist/sintonia/engine.mjs';
import * as orbita from '../dist/orbita/engine.mjs';
import {solve} from '../dist/orbita/analysis.mjs';
import {createMovementAttempt,startMovementAttempt,serializeMovementAttempt,movementHistory,observeMovement,finishMovement,sintoniaBatonPass,newlyFinishedMovementBest} from '../dist/achievements/movement-missions.mjs';
import {freshOrbitaData,normalizeOrbitaData,recordOrbitaCompletion,restoreOrbitaSession,commitOrbitaCommand} from '../dist/orbita/ui.mjs';
function run(game,level,commands,options={}){
  const engine=game==='sintonia'?sintonia:orbita;
  const attempt=createMovementAttempt({official:true,fresh:true,...options});
  let state=engine.initialState(level),cursor=0;
  for(const command of commands){const result=engine.transition(level,state,command);assert.ok(result.changed);observeMovement(attempt,{cursor:++cursor,human:options.human!==false,baton:game==='sintonia'&&sintoniaBatonPass(level,state,result)});state=result.state;}
  const ids=finishMovement(attempt,{game,won:engine.isWon(level,state),cursor,levelId:level.id,provenMinimum:options.minimum??null});
  return {ids,attempt,state,cursor};
}
test('official baton witness: another animal departs linked plate in the crossing command, then wins',()=>{
  const level=S.find(level=>level.id==='sintonia80-0016-v5');
  const commands=['up','left','left','down','left','down','up','right','right'];
  const result=run('sintonia',level,commands);
  assert.ok(result.ids.includes('sintonia-baton-pass'));
  assert.ok(!run('sintonia',level,commands.slice(0,-1)).ids.length);
  assert.ok(!run('sintonia',level,commands,{human:false}).ids.length);
});
test('gate event alone, box crossing, same animal and unrelated plates are not baton passes',()=>{
  const level={boards:[{plates:[{id:'a',cell:0}]},{plates:[{id:'b',cell:0}]}]};
  const before={positions:[0,1]};
  const gate={type:'gate',board:1,from:1,to:2,condition:{type:'plate',id:'a'}};
  const move={type:'move',board:1,from:1,to:2};
  const result={state:{positions:[1,2]},events:[gate,move]};
  assert.equal(sintoniaBatonPass(level,before,result),true);
  assert.equal(sintoniaBatonPass(level,before,{...result,events:[gate]}),false);
  assert.equal(sintoniaBatonPass(level,before,{...result,state:{positions:[0,2]}}),false);
  assert.equal(sintoniaBatonPass(level,before,{...result,events:[{...gate,condition:{type:'plate',id:'b'}},move]}),false);
});
test('wall witness has four commands and independently proven minimum',()=>{
  const level=S.find(level=>level.id==='sintonia-0021');
  const proof=sintonia.solveLevel(level,{maxMs:10000,maxStates:100000});
  assert.equal(proof.optimal,true);assert.equal(proof.solution.length,4);
  assert.equal(level.certificate.commands,4);
  const {ids}=run('sintonia',level,['left','up','right','right'],{minimum:proof.solution.length});
  assert.ok(ids.includes('sintonia-four-command-plan'));
  assert.ok(ids.includes('efficiency-proven-minimum'));
  assert.ok(ids.includes('efficiency-clean-plan'));
});
test('orbita upper bound is not proof; real BFS proves exact minimum',()=>{
  const level=O[0];assert.equal(level.validation.minimumProven,false);
  const proof=solve(level,undefined,{timeoutMs:1000});
  assert.equal(proof.proof.allShorterPathsExhausted,true);
  assert.ok(!run('orbita',level,level.solution).ids.includes('efficiency-proven-minimum'));
  assert.ok(run('orbita',level,proof.solution,{minimum:proof.proof.minimumLength}).ids.includes('efficiency-proven-minimum'));
});
test('personal best requires an actual previous human record improved by two',()=>{
  const level=O[0],move=level.solution[0],inverse={...move,direction:-move.direction};
  // A reversible detour returns to the starting state before the winning command.
  const slower=run('orbita',level,[inverse,move,move]);assert.ok(orbita.isWon(level,slower.state));
  assert.ok(!slower.ids.includes('orbita-personal-best'));
  assert.ok(run('orbita',level,[move],{priorBest:3}).ids.includes('orbita-personal-best'));
  assert.ok(!run('orbita',level,[move],{priorBest:2}).ids.includes('orbita-personal-best'));
  assert.ok(!run('orbita',level,[move],{priorBest:null}).ids.includes('orbita-personal-best'));
});
test('no unlock from restore, custom map, assisted commands, incomplete or duplicate finish',()=>{
  for(const options of [{fresh:false},{official:false},{human:false}])assert.deepEqual(run('sintonia',S[0],S[0].solution,options).ids,[]);
  const result=run('sintonia',S[0],S[0].solution);
  assert.deepEqual(finishMovement(result.attempt,{game:'sintonia',won:true,cursor:1}),[]);
});
test('undo/redo disqualify clean plan and abandoned branch baton evidence is removed',()=>{
  const attempt=createMovementAttempt({official:true,fresh:true});
  observeMovement(attempt,{cursor:1,baton:true});movementHistory(attempt);
  observeMovement(attempt,{cursor:1,baton:false});
  assert.deepEqual(finishMovement(attempt,{game:'sintonia',won:true,cursor:1}),[]);
});
test('replay attempts are independent from legacy winRecorded and preserve new best metadata',()=>{
  const level=O[0],data=freshOrbitaData();data.campaign.completed[level.id]={humanBestMoves:3,firstCompletedAt:'2026-01-01T00:00:00Z'};
  let session=restoreOrbitaSession(level,null);session.winRecorded=true;
  session=commitOrbitaCommand(level,session,level.solution[0]).session;
  assert.equal(recordOrbitaCompletion(data,level,session,'campaign'),false);
  assert.equal(data.campaign.completed[level.id].humanBestMoves,3);
  assert.ok(run('orbita',level,level.solution,{priorBest:3}).ids.includes('orbita-personal-best'));
});
test('wall over budget and nonminimal winning runs do not earn efficiency',()=>{
  const level=S.find(level=>level.id==='sintonia-0021');
  const initial=sintonia.initialState(level);let detour;
  for(const a of sintonia.DIRECTIONS)for(const b of sintonia.DIRECTIONS){const first=sintonia.transition(level,initial,a);if(!first.changed)continue;const second=sintonia.transition(level,first.state,b);if(second.changed&&sintonia.stateKey(second.state)===sintonia.stateKey(initial))detour=[a,b];}
  assert.ok(detour);
  const result=run('sintonia',level,[...detour,...level.solution],{minimum:4});
  assert.ok(sintonia.isWon(level,result.state));
  assert.ok(!result.ids.includes('sintonia-four-command-plan'));
  assert.ok(!result.ids.includes('efficiency-proven-minimum'));
});
test('controller mission calls stay on live command paths, before old win bookkeeping',async()=>{
  const {readFile}=await import('node:fs/promises');
  for(const game of ['sintonia','orbita']){
    const source=await readFile(new URL(`../dist/${game}/ui.mjs`,import.meta.url),'utf8');
    const live=source.slice(source.indexOf(game==='sintonia'?'  function move(':'  async function rotate('),source.indexOf('  function travelHistory('));
    assert.match(live,/observeMovement\(missionAttempt/);assert.match(live,/finishMovement\(missionAttempt/);
    const history=source.slice(source.indexOf('  function travelHistory('),source.indexOf('  function restartCurrentImmediately('));
    assert.doesNotMatch(history,/recordMissionUnlocks|finishMovement/);
    assert.match(history,/movementHistory/);
  }
});

test('controller start policy rejects zero-cursor saves after restart, undo, leave and reload',()=>{
  const empty={cursor:0,commands:[]};
  for(const saved of [{cursor:0,commands:[]},{cursor:0,commands:['up']},{cursor:0,commands:[],winRecorded:true},{}]){
    const attempt=startMovementAttempt({official:true,session:empty,saved});
    observeMovement(attempt,{cursor:1});
    assert.deepEqual(finishMovement(attempt,{game:'sintonia',won:true,cursor:1,provenMinimum:1}),[]);
  }
  assert.equal(startMovementAttempt({official:true,session:empty,saved:null}).eligible,true);
  // Explicit new-definition reset creates a fresh initial session, not a resume.
  assert.equal(startMovementAttempt({official:true,session:empty,saved:{},reset:true}).eligible,true);
  const restarted=createMovementAttempt({official:true,fresh:true,clean:false});
  observeMovement(restarted,{cursor:1});
  assert.ok(!finishMovement(restarted,{game:'orbita',won:true,cursor:1}).includes('efficiency-clean-plan'));
});
test('human personal best survives normalization and serialized reload, without fabricating legacy records',()=>{
  const data=freshOrbitaData(),level=O[0];
  data.campaign.completed[level.id]={firstCompletedAt:'2026-01-01T00:00:00Z',humanBestMoves:3,assisted:false};
  const restored=normalizeOrbitaData(JSON.parse(JSON.stringify(data)));
  assert.equal(restored.campaign.completed[level.id].humanBestMoves,3);
  assert.ok(run('orbita',level,level.solution,{priorBest:restored.campaign.completed[level.id].humanBestMoves}).ids.includes('orbita-personal-best'));
  delete data.campaign.completed[level.id].humanBestMoves;
  assert.equal(normalizeOrbitaData(JSON.parse(JSON.stringify(data))).campaign.completed[level.id].humanBestMoves,undefined);
});
test('both UI starts use saved-presence policy and SINTONIA silent playback cannot be human evidence',async()=>{
  const {readFile}=await import('node:fs/promises');
  for(const game of ['sintonia','orbita']){
    const source=await readFile(new URL(`../dist/${game}/ui.mjs`,import.meta.url),'utf8');
    assert.match(source.replace(/\s+/g,''),/missionAttempt=startMovementAttempt\(\{session,saved,reset:fresh,definition:/);
    if(game==='sintonia')assert.match(source.replace(/\s+/g,''),/human:!assisted&&!silent/);
  }
});
function checkpoint(attempt,session,definition='official-definition'){
  return JSON.parse(JSON.stringify({commands:session.commands,cursor:session.cursor,movementMission:serializeMovementAttempt(attempt,{session,definition})}));
}
test('valid partial baton evidence survives a real-engine roundtrip and only final live move unlocks',()=>{
  const level=S.find(level=>level.id==='sintonia80-0016-v5');
  let attempt=createMovementAttempt({official:true,fresh:true});
  const session={commands:[],cursor:0,states:[sintonia.initialState(level)]};
  for(const command of level.solution.slice(0,-1)){
    const before=session.states.at(-1),result=sintonia.transition(level,before,command);
    session.commands.push(command);session.states.push(result.state);session.cursor++;
    observeMovement(attempt,{cursor:session.cursor,baton:sintoniaBatonPass(level,before,result)});
  }
  const saved=checkpoint(attempt,session);
  const validateBaton=i=>sintoniaBatonPass(level,session.states[i],sintonia.transition(level,session.states[i],session.commands[i]));
  attempt=startMovementAttempt({official:true,session,saved,definition:'official-definition',validateBaton});
  assert.equal(attempt.eligible,true);assert.equal(attempt.finished,false);assert.ok(attempt.frames.some(frame=>frame.baton));
  assert.deepEqual(finishMovement(attempt,{game:'sintonia',won:false,cursor:session.cursor}),[]);
  const result=sintonia.transition(level,session.states.at(-1),level.solution.at(-1));
  observeMovement(attempt,{cursor:++session.cursor,baton:sintoniaBatonPass(level,session.states.at(-1),result)});
  const ids=finishMovement(attempt,{game:'sintonia',won:result.won,cursor:session.cursor});
  assert.ok(ids.includes('sintonia-baton-pass'));assert.ok(ids.includes('efficiency-clean-plan'));
});
test('dirty zero-command reset and clean fresh round both retain their truth across reload',()=>{
  const session={commands:[],cursor:0};
  for(const clean of [true,false]){
    const attempt=createMovementAttempt({official:true,fresh:true,clean});
    const restored=startMovementAttempt({official:true,session,saved:checkpoint(attempt,session),definition:'official-definition'});
    assert.equal(restored.eligible,true);assert.equal(restored.clean,clean);
    observeMovement(restored,{cursor:1});
    assert.equal(finishMovement(restored,{game:'orbita',won:true,cursor:1}).includes('efficiency-clean-plan'),clean);
  }
});
test('version, definition, command, cursor, proof, boolean and record tampering fails closed',()=>{
  const session={commands:[{command:'A',direction:-1}],cursor:1};
  const attempt=createMovementAttempt({official:true,fresh:true,priorBest:4});observeMovement(attempt,{cursor:1});
  const original=checkpoint(attempt,session);
  const corruptions=[
    e=>e.version=2,e=>e.definition='other',e=>e.commands='[]',e=>e.cursor=0,
    e=>e.clean='true',e=>e.finished=1,e=>e.frames=[],e=>e.frames[0]=null,
    e=>e.frames[0].human='true',e=>e.frames[0].baton=true,e=>e.priorBest=5,
  ];
  for(const corrupt of corruptions){const saved=structuredClone(original);corrupt(saved.movementMission);assert.equal(startMovementAttempt({official:true,session,saved,priorBest:4,definition:'official-definition'}).eligible,false);}
  assert.equal(startMovementAttempt({official:true,session:{...session,restoreIssue:'invalid-state'},saved:original,priorBest:4,definition:'official-definition'}).eligible,false);
  const restored=startMovementAttempt({official:true,session,saved:original,priorBest:4,definition:'official-definition'});
  assert.equal(restored.eligible,true);assert.equal(restored.priorBest,4);
});
test('finished saves remain finished and an assisted prefix cannot become human after a reload',()=>{
  const session={commands:['up'],cursor:1};
  const assisted=createMovementAttempt({official:true,fresh:true});observeMovement(assisted,{cursor:1,human:false});
  let restored=startMovementAttempt({official:true,session,saved:checkpoint(assisted,session),definition:'official-definition'});
  assert.equal(restored.eligible,true);observeMovement(restored,{cursor:2});
  assert.deepEqual(finishMovement(restored,{game:'sintonia',won:true,cursor:2}),[]);
  const done=createMovementAttempt({official:true,fresh:true});observeMovement(done,{cursor:1});finishMovement(done,{game:'sintonia',won:true,cursor:1});
  restored=startMovementAttempt({official:true,session,saved:checkpoint(done,session),definition:'official-definition'});
  assert.equal(restored.finished,true);assert.deepEqual(finishMovement(restored,{game:'sintonia',won:true,cursor:1}),[]);
});
test('real SINTONIA and ORBITA session serializers preserve compatible mission checkpoints',async()=>{
  const service=await import('../dist/sintonia/service.mjs');
  const orbitaUI=await import('../dist/orbita/ui.mjs');
  for(const game of ['sintonia','orbita']){
    const level=game==='sintonia'?S.find(level=>level.id==='sintonia-0021'):O[0];
    const restore=game==='sintonia'?service.restoreSintoniaSession:orbitaUI.restoreOrbitaSession;
    const commit=game==='sintonia'?service.commitSintoniaCommand:orbitaUI.commitOrbitaCommand;
    let session=restore(level,null),attempt=createMovementAttempt({official:true,fresh:true});
    const command=game==='sintonia'?level.solution[0]:{...level.solution[0],direction:-level.solution[0].direction};
    const before=session.states[0],next=commit(level,session,command);session=next.session;
    observeMovement(attempt,{cursor:session.cursor,baton:game==='sintonia'&&sintoniaBatonPass(level,before,next.transition)});
    const base=game==='sintonia'?service.serializeSintoniaSession(session):orbitaUI.serializeOrbitaSession(level,session);
    const saved=JSON.parse(JSON.stringify({...base,movementMission:serializeMovementAttempt(attempt,{session,definition:'official-definition'})}));
    session=restore(level,saved);
    assert.equal(session.restoreIssue??'','');
    attempt=startMovementAttempt({official:true,session,saved,definition:'official-definition',validateBaton:i=>game==='sintonia'&&sintoniaBatonPass(level,session.states[i],sintonia.transition(level,session.states[i],session.commands[i]))});
    assert.equal(attempt.eligible,true);assert.equal(attempt.clean,true);assert.equal(attempt.frames.length,1);
  }
});

test('already-finished attempt cannot rewrite personal best after undo and assisted win',()=>{
  const attempt=createMovementAttempt({official:true,fresh:true,priorBest:6});
  for(let cursor=1;cursor<=3;cursor++)observeMovement(attempt,{cursor});
  let wasFinished=attempt.finished;
  finishMovement(attempt,{game:'orbita',won:true,cursor:3});
  let best=newlyFinishedMovementBest(attempt,{wasFinished,cursor:3});
  assert.equal(best,3);
  movementHistory(attempt);observeMovement(attempt,{cursor:1,human:false});
  wasFinished=attempt.finished;
  assert.deepEqual(finishMovement(attempt,{game:'orbita',won:true,cursor:1}),[]);
  const repeated=newlyFinishedMovementBest(attempt,{wasFinished,cursor:1});
  assert.equal(repeated,null);if(repeated!==null)best=repeated;assert.equal(best,3);
});

test('first live ORBITA win is recorded before personal best, and later animation callback is idempotent',async()=>{
  const level=O[0],data=freshOrbitaData();
  let session=restoreOrbitaSession(level,null);
  session=commitOrbitaCommand(level,session,level.solution[0]).session;
  const attempt=createMovementAttempt({official:true,fresh:true});
  observeMovement(attempt,{cursor:session.cursor});const wasFinished=attempt.finished;
  finishMovement(attempt,{game:'orbita',won:true,cursor:session.cursor});
  const best=newlyFinishedMovementBest(attempt,{wasFinished,cursor:session.cursor});
  assert.equal(data.campaign.completed[level.id],undefined);
  let winLogs=0;
  if(recordOrbitaCompletion(data,level,session,'campaign','2026-11-11T12:00:00.000Z'))winLogs++;
  data.campaign.completed[level.id]={...data.campaign.completed[level.id],humanBestMoves:best};
  assert.deepEqual(data.campaign.completed[level.id],{firstCompletedAt:'2026-11-11T12:00:00.000Z',assisted:false,humanBestMoves:1});
  assert.equal(session.winRecorded,true);
  // The state is already fully valid if animation is interrupted or app reloads.
  const restored=normalizeOrbitaData(JSON.parse(JSON.stringify(data)));
  assert.deepEqual(restored.campaign.completed[level.id],data.campaign.completed[level.id]);
  if(recordOrbitaCompletion(data,level,session,'campaign','2026-11-11T12:00:02.000Z'))winLogs++;
  assert.equal(winLogs,1);assert.equal(data.campaign.completed[level.id].humanBestMoves,1);
  const {readFile}=await import('node:fs/promises');
  const source=(await readFile(new URL('../dist/orbita/ui.mjs',import.meta.url),'utf8')).replace(/\s+/g,'');
  const branch=source.slice(source.indexOf('if(best!==null){'),source.indexOf("message=moveName(command)"));
  assert.ok(branch.indexOf('recordWin();')>=0);
  assert.ok(branch.indexOf('recordWin();')<branch.indexOf('humanBestMoves:best'));
});
