import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CAMPAIGN} from '../dist/sintonia/campaign.mjs';
import {LEGACY_CAMPAIGN,LEGACY_CONTENT_REVISION} from '../dist/sintonia/campaign-v1.mjs';
import {RULES_VERSION,initialState,stateKey,replay,validateLevel,isWon} from '../dist/sintonia/engine.mjs';
import {analyzePosition} from '../dist/sintonia/analysis.mjs';
import {freshSintoniaData,normalizeSintoniaData} from '../dist/sintonia/ui.mjs';
import {restoreSintoniaSession,serializeSintoniaSession,commitSintoniaCommand,resolveSintoniaCampaignAttempt,isRetainedSintoniaAttempt,sintoniaDefinitionKey,levelContentRevision,persistableSintoniaLevel,createSintoniaService} from '../dist/sintonia/service.mjs';

const copy=value=>JSON.parse(JSON.stringify(value));
const revised=level=>({...copy(level),contentRevision:'sintonia-content-2',name:'Mapa revisado'});
function played(level,commands=level.solution){let session=restoreSintoniaSession(level,null);for(const command of commands)session=commitSintoniaCommand(level,session,command).session;return session;}
function legacySave(session){const saved=serializeSintoniaSession(session);delete saved.level;delete saved.contentRevision;return copy(saved);}

test('content revision is independent of unchanged rules and storage schemas',()=>{
  const level=revised(LEGACY_CAMPAIGN[50]),session=restoreSintoniaSession(level,null),saved=serializeSintoniaSession(session);
  assert.equal(RULES_VERSION,1);assert.equal(freshSintoniaData().version,1);assert.equal(freshSintoniaData().rulesVersion,1);
  assert.equal(saved.rulesVersion,1);assert.equal(saved.contentRevision,'sintonia-content-2');
  assert.equal(levelContentRevision(LEGACY_CAMPAIGN[50]),LEGACY_CONTENT_REVISION);
});

test('all 500 original definitions remain valid replay-certified archives',()=>{
  assert.equal(LEGACY_CAMPAIGN.length,500);assert.equal(new Set(LEGACY_CAMPAIGN.map(level=>level.id)).size,500);
  for(const level of LEGACY_CAMPAIGN){assert.equal(validateLevel(level).valid,true,level.id);assert.equal(replay(level,level.solution).won,true,level.id);}
});

test('all legacy campaign attempts resolve to original maps and retain complete undo/redo histories',()=>{
  for(const [index,oldLevel] of LEGACY_CAMPAIGN.entries()){
    const original=played(oldLevel);original.cursor=Math.floor(original.commands.length/2);original.assisted=true;original.failures=3;original.winRecorded=true;
    const saved=legacySave(original),unchanged=copy(saved),attempt=resolveSintoniaCampaignAttempt(revised(CAMPAIGN[index]),saved);
    assert.equal(attempt.status,'resumed',oldLevel.id);assert.equal(attempt.retained,true,oldLevel.id);assert.equal(attempt.level,oldLevel,oldLevel.id);
    const restored=restoreSintoniaSession(attempt.level,attempt.saved);
    assert.deepEqual(restored.commands,original.commands,oldLevel.id);assert.equal(restored.cursor,original.cursor,oldLevel.id);
    assert.deepEqual(restored.states,original.states,oldLevel.id);assert.equal(restored.assisted,true);assert.equal(restored.failures,3);assert.equal(restored.winRecorded,true);
    assert.deepEqual(saved,unchanged,'resolving cannot mutate saved history');
    const reloaded=copy(serializeSintoniaSession(restored)),again=resolveSintoniaCampaignAttempt(revised(CAMPAIGN[index]),reloaded);
    assert.deepEqual(again.level,persistableSintoniaLevel(oldLevel),oldLevel.id);assert.deepEqual(restoreSintoniaSession(again.level,again.saved).states,original.states,oldLevel.id);
  }
});

test('old state is never replayed on a revised map, even when positions happen to match',()=>{
  const oldLevel=LEGACY_CAMPAIGN[50],old=played(oldLevel,oldLevel.solution.slice(0,1)),saved=legacySave(old),current=revised(oldLevel);
  // Goal changes do not alter movement, so state equality alone would accept it.
  current.boards[0].goal=current.boards[0].start;
  assert.equal(validateLevel(current).valid,true);
  assert.equal(stateKey(replay(current,saved.commands).state),stateKey(saved.state));
  const rejected=restoreSintoniaSession(current,saved);
  assert.equal(rejected.restoreIssue,'content-mismatch');assert.equal(rejected.cursor,0);assert.deepEqual(rejected.commands,[]);
  const accepted=resolveSintoniaCampaignAttempt(current,saved);
  assert.equal(accepted.status,'resumed');assert.equal(accepted.level,oldLevel);assert.equal(accepted.retained,true);
});

test('full definition also prevents accidental map reuse within the same content revision',()=>{
  const level=revised(LEGACY_CAMPAIGN[50]),session=played(level,level.solution.slice(0,2)),saved=copy(serializeSintoniaSession(session));
  const altered=copy(level);altered.boards[0].goal=altered.boards[0].start;
  assert.notEqual(sintoniaDefinitionKey(altered),sintoniaDefinitionKey(level));
  assert.equal(restoreSintoniaSession(altered,saved).restoreIssue,'content-mismatch');
  const resolved=resolveSintoniaCampaignAttempt(altered,saved);
  assert.equal(resolved.status,'resumed');assert.equal(resolved.retained,true);assert.deepEqual(resolved.level,persistableSintoniaLevel(level));
  const reordered=Object.fromEntries(Object.entries(level).reverse());
  assert.equal(sintoniaDefinitionKey(reordered),sintoniaDefinitionKey(level));
  assert.equal(restoreSintoniaSession(reordered,saved).cursor,session.cursor);
});

test('unplayed levels use current catalog; newly saved attempts are self-contained and do not alias the map',()=>{
  const current=revised(LEGACY_CAMPAIGN[50]),attempt=resolveSintoniaCampaignAttempt(current,null);
  assert.equal(attempt.level,current);assert.equal(attempt.status,'new');assert.equal(attempt.retained,false);
  const session=played(current,current.solution.slice(0,2)),saved=serializeSintoniaSession(session);
  assert.notEqual(saved.level,current);assert.deepEqual(saved.level,persistableSintoniaLevel(current));assert.equal(saved.contentRevision,'sintonia-content-2');
  saved.level.name='snapshot only';assert.notEqual(current.name,saved.level.name);
  const reload=resolveSintoniaCampaignAttempt(current,copy(saved));
  assert.equal(reload.status,'resumed');assert.equal(reload.retained,false);assert.equal(restoreSintoniaSession(reload.level,reload.saved).cursor,2);
});

test('zero-cursor legacy attempts retain undone futures, not just visible moves',()=>{
  const oldLevel=LEGACY_CAMPAIGN[50],session=played(oldLevel);session.cursor=0;
  const attempt=resolveSintoniaCampaignAttempt(revised(oldLevel),legacySave(session));
  const restored=restoreSintoniaSession(attempt.level,attempt.saved);
  assert.equal(restored.cursor,0);assert.equal(restored.commands.length,oldLevel.solution.length);assert.equal(restored.states.length,oldLevel.solution.length+1);
  restored.cursor=restored.commands.length;assert.equal(isWon(attempt.level,restored.states[restored.cursor]),true);
  restored.cursor=2;const branched=commitSintoniaCommand(attempt.level,restored,'down').session;
  assert.deepEqual(branched.commands,['right','right','down']);assert.equal(branched.states.length,4);
});

test('missing, inconsistent or corrupt definitions are blocked without modifying the original attempt',()=>{
  const current=revised(LEGACY_CAMPAIGN[50]),valid=serializeSintoniaSession(played(current,current.solution.slice(0,2)));
  const cases=[{...copy(valid),level:undefined},{...copy(valid),contentRevision:'unknown-revision'}, {...copy(valid),level:{...copy(valid.level),id:'different-level'}}, {...copy(valid),state:{positions:[999,999]}}, {...copy(valid),commands:['nonsense']}, {...copy(valid),cursor:999}];
  for(const saved of cases){const before=copy(saved);assert.equal(resolveSintoniaCampaignAttempt(current,saved).status,'blocked');assert.deepEqual(copy(saved),before);}
});

test('normalization and reload preserve historical completions, preferences, learned mechanics and untouched attempts',()=>{
  const oldLevel=LEGACY_CAMPAIGN[499],session=played(oldLevel,oldLevel.solution.slice(0,1));
  const value={version:1,rulesVersion:1,prefs:{advanced:true,autoAdvance:false,coordinates:true},campaign:{lastId:oldLevel.id,completed:{'sintonia-0001':{moves:1,assisted:false,firstCompletedAt:'2026-01-01'},'sintonia-0499':{moves:88,assisted:true}},sessions:{[oldLevel.id]:legacySave(session),'sintonia-0001':legacySave(played(LEGACY_CAMPAIGN[0]))}},learnedMechanics:['walls','plate','delivery'],events:[{type:'win'}],lastView:{active:true,screen:'play',mode:'campaign'}};
  const before=copy(value),data=normalizeSintoniaData(copy(value));
  const attempt=resolveSintoniaCampaignAttempt(revised(oldLevel),data.campaign.sessions[oldLevel.id]);
  data.campaign.sessions[oldLevel.id]=serializeSintoniaSession(restoreSintoniaSession(attempt.level,attempt.saved));
  const reload=normalizeSintoniaData(copy(data));
  assert.deepEqual(reload.campaign.completed,before.campaign.completed);assert.deepEqual(reload.campaign.sessions['sintonia-0001'],before.campaign.sessions['sintonia-0001']);
  assert.equal(reload.campaign.lastId,oldLevel.id);assert.equal(reload.prefs.autoAdvance,false);assert.equal(reload.prefs.advanced,true);assert.equal(reload.prefs.coordinates,true);
  assert.deepEqual(reload.learnedMechanics,before.learnedMechanics);assert.deepEqual(reload.events,before.events);assert.deepEqual(reload.lastView,before.lastView);
  assert.equal(restoreSintoniaSession(reload.campaign.sessions[oldLevel.id].level,reload.campaign.sessions[oldLevel.id]).cursor,1);
});

test('legacy Endless full definitions, undo futures, counters and recent history survive content updates',()=>{
  const level={...copy(LEGACY_CAMPAIGN[425]),id:'old-endless-seed',generatorVersion:1},session=played(level);session.cursor=2;
  const current={level,seed:891,signature:'old-signature',rulesVersion:1,generatorVersion:1,session:legacySave(session)};
  const run={version:1,baseSeed:123,startDifficulty:4,number:7,solved:5,recentSignatures:['older','old-signature'],recentFamilies:['support-handoff'],current};
  const normalized=normalizeSintoniaData(copy({version:1,endless:run}));
  assert.deepEqual(normalized.endless,run);
  const restored=restoreSintoniaSession(normalized.endless.current.level,normalized.endless.current.session);
  assert.equal(restored.cursor,2);assert.deepEqual(restored.states,session.states);assert.deepEqual(restored.commands,session.commands);
  normalized.endless.current.session=serializeSintoniaSession(restored);
  const reload=normalizeSintoniaData(copy(normalized));
  assert.deepEqual(reload.endless.current.level,level);assert.equal(reload.endless.solved,5);assert.equal(reload.endless.number,7);assert.deepEqual(reload.endless.recentSignatures,run.recentSignatures);
  assert.equal(isRetainedSintoniaAttempt(reload.endless.current.level,revised(level)),true);
  assert.equal(restoreSintoniaSession(reload.endless.current.level,reload.endless.current.session).cursor,2);
});

test('export/import JSON and workerless hints use the retained definition, not a new map with the same ID',async()=>{
  const service=createSintoniaService({workerFactory:()=>{throw Error('no worker');}});
  try{
    for(const oldLevel of [LEGACY_CAMPAIGN[50],LEGACY_CAMPAIGN[175],LEGACY_CAMPAIGN[300],LEGACY_CAMPAIGN[425],LEGACY_CAMPAIGN[499]]){
      const session=played(oldLevel);session.cursor=Math.min(2,session.commands.length-1);
      const attempt=resolveSintoniaCampaignAttempt(revised(oldLevel),legacySave(session));
      const exported=copy({...attempt.level,game:'sintonia'});
      assert.equal(validateLevel(exported).valid,true);assert.equal(replay(exported,exported.solution).won,true);
      const imported={...exported,id:`custom-${exported.id}`},custom=played(imported,imported.solution.slice(0,session.cursor));
      const restored=restoreSintoniaSession(imported,copy(serializeSintoniaSession(custom)));
      assert.equal(stateKey(restored.states[restored.cursor]),stateKey(session.states[session.cursor]));
      for(const [level,state] of [[attempt.level,session.states[session.cursor]],[imported,restored.states[restored.cursor]]]){
        const hint=await service.hint(level,state);assert.equal(hint.status,'solved',oldLevel.id);assert.equal(replay(level,hint.solution,{state}).won,true,oldLevel.id);
        assert.equal(analyzePosition(level,state,{allowSearch:false}).status,'solved');
      }
      const updated=revised(oldLevel);assert.equal(replay(updated,updated.solution).won,true,'new revision remains a compatible import');
    }
  }finally{service.destroy();}
});

test('UI provides an informed, attempt-only restart and preserves the existing storage key',()=>{
  const ui=readFileSync(new URL('../dist/sintonia/ui.mjs',import.meta.url),'utf8');
  assert.match(ui,/const STORE = 'intuicao\.sintonia\.v1'/);
  assert.match(ui,/resolveSintoniaCampaignAttempt\(CAMPAIGN\[next\]/);
  assert.match(ui,/Partida preservada no mapa anterior/);
  assert.match(ui,/Começar o mapa atualizado\?/);
  assert.match(ui,/Apenas as jogadas e o histórico de desfazer desta tentativa serão apagados/);
  assert.match(ui,/restart\.open\(\{trigger,isCurrent:[^\n]+onConfirm:restartCurrentImmediately/);
  assert.match(ui,/if\(mode==='campaign'&&isRetainedSintoniaAttempt\(level,CAMPAIGN\[index\]\)\)/);
  assert.match(ui,/start\(saved\.level,\{mode:'endless',saved:saved\.session\}\)/);
});

test('a stale generation worker cannot introduce an old catalog into a new Endless challenge',async()=>{
  const generator=await import('../dist/sintonia/generator.mjs');
  const stale={...copy(LEGACY_CAMPAIGN[1]),generatorVersion:0,contentRevision:'sintonia-retired-content'};
  const worker={terminated:false,terminate(){this.terminated=true;},postMessage(message){queueMicrotask(()=>worker.onmessage({data:{id:message.id,ok:true,result:{level:stale,solution:stale.solution,signature:'stale'}}}));}};
  const service=createSintoniaService({workerFactory:()=>worker});
  try{
    const result=await service.generate('revision-protected-endless',{difficulty:0});
    assert.equal(worker.terminated,true);assert.equal(result.validation.origin,'fallback');
    assert.equal(result.level.generatorVersion,generator.GENERATOR_VERSION);assert.equal(levelContentRevision(result.level),generator.CONTENT_REVISION??LEGACY_CONTENT_REVISION);
    assert.equal(replay(result.level,result.solution).won,true);
  }finally{service.destroy();}
});

test('saves omit offline editorial audits without dropping any playable or hint/certificate field',()=>{
  for(const catalog of [LEGACY_CAMPAIGN,CAMPAIGN])for(const level of catalog){
    const snapshot=persistableSintoniaLevel(level),expected=copy(level);delete expected.editorial;
    assert.deepEqual(snapshot,expected,level.id);assert.equal(sintoniaDefinitionKey(snapshot),sintoniaDefinitionKey(level),level.id);
    assert.equal(replay(snapshot,snapshot.solution).won,true,level.id);assert.deepEqual(snapshot.hints,level.hints);assert.deepEqual(snapshot.certificate,level.certificate);
  }
  const level={...revised(LEGACY_CAMPAIGN[50]),editorial:{purpose:{offlineTrace:'x'.repeat(200000)}}};
  assert.equal(serializeSintoniaSession(restoreSintoniaSession(level,null)).level.editorial,undefined);
  assert.equal(level.editorial.purpose.offlineTrace.length,200000,'the shipped catalog remains intact');
});

test('all 500 completed sessions fit a bounded browser storage budget without bulky audit copies',()=>{
  for(const catalog of [LEGACY_CAMPAIGN,CAMPAIGN]){
    const data=freshSintoniaData();
    for(const level of catalog){data.campaign.sessions[level.id]=serializeSintoniaSession(played(level));data.campaign.completed[level.id]={moves:level.solution.length,assisted:false,firstCompletedAt:'2026-01-01T00:00:00.000Z'};}
    // localStorage often accounts UTF-16 code units. Leave room below the
    // common 5 MiB quota for preferences, events, Endless and other games.
    const utf16Bytes=JSON.stringify(data).length*2;
    assert.ok(utf16Bytes<3*1024*1024,`${levelContentRevision(catalog[0])}: ${utf16Bytes} UTF-16 bytes`);
  }
});
