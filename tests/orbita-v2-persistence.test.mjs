import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {CAMPAIGN,CAMPAIGN_VERSION} from '../dist/orbita/campaign.mjs';
import {normalizeOrbitaData,restoreOrbitaSession,serializeOrbitaSession,commitOrbitaCommand,endlessOptions} from '../dist/orbita/ui.mjs';
import {topologyRecency,ENDLESS_VERSION} from '../dist/orbita/endless-v2.mjs';
import {generateEndless} from '../dist/orbita/generator.mjs';
import {selectFallback} from '../dist/orbita/fallback.mjs';
import {replay} from '../dist/orbita/engine.mjs';
const raw=execFileSync('git',['show','3c9e1647dce8d5130f21fa5c171085b63e525ee4:dist/orbita/catalog.mjs'],{encoding:'utf8',maxBuffer:20e6});
const legacy=JSON.parse(raw.slice(raw.indexOf('export const CATALOG=')+21).trim().replace(/;$/,''));

test('catalog migration preserves completion, preferences, legacy first200 and IDs through1000',()=>{
 const completed={1:{firstCompletedAt:'before'},200:{firstCompletedAt:'before'},201:{firstCompletedAt:'before'},500:{firstCompletedAt:'before'},1000:{firstCompletedAt:'new'}};
 const input={version:1,campaign:{lastId:1000,completed,sessions:{}},prefs:{advanced:true,autoAdvance:false},learnedMechanics:['gear'],events:[{kind:'win'}]};
 const migrated=normalizeOrbitaData(input);assert.equal(migrated.catalogVersion,CAMPAIGN_VERSION);assert.deepEqual(migrated.campaign.completed,completed);assert.equal(migrated.campaign.lastId,1000);assert.deepEqual(migrated.prefs,input.prefs);assert.deepEqual(migrated.events,input.events);
 for(const old of legacy.slice(0,200)){const level=CAMPAIGN[old.id-1];assert.deepEqual(level,old);const session=restoreOrbitaSession(old,null);assert.equal(restoreOrbitaSession(level,serializeOrbitaSession(old,session)).restored,true);}
});
test('replaced campaign definition safely restarts only current attempt',()=>{
 const old=legacy[200],saved=serializeOrbitaSession(old,commitOrbitaCommand(old,restoreOrbitaSession(old,null),old.solution[0]).session);
 const data=normalizeOrbitaData({campaign:{lastId:201,completed:{201:{firstCompletedAt:'kept'}},sessions:{201:saved}}});
 const restored=restoreOrbitaSession(CAMPAIGN[200],data.campaign.sessions[201]);assert.equal(restored.restored,false);assert.equal(restored.cursor,0);assert.ok(restored.restoreIssue);assert.equal(data.campaign.completed[201].firstCompletedAt,'kept');
});
test('legacy Endless retains full original definition, seed, version and legal session',()=>{
 const level=structuredClone(legacy[300]);level.id='endless-legacy-1';const session=commitOrbitaCommand(level,restoreOrbitaSession(level,null),level.solution[0]).session;
 const current={level,seed:932,generatorVersion:'orbita-generator-1',session:serializeOrbitaSession(level,session)};
 const migrated=normalizeOrbitaData({endless:{baseSeed:932,current,number:1,startDifficulty:3}});
 assert.deepEqual(migrated.endless.current,current);assert.equal(restoreOrbitaSession(migrated.endless.current.level,migrated.endless.current.session).restored,true);assert.deepEqual(migrated.endless.recentTopologies,[topologyRecency(level)]);
 assert.doesNotThrow(()=>normalizeOrbitaData({endless:{current:{level:{}}}}));
});
test('all Endless bands replay, persist topology history and deterministically avoid consecutive structures',()=>{
 for(let difficulty=0;difficulty<=4;difficulty++){
  const signatures=[],families=[],topologies=[];
  for(let i=0;i<18;i++){
   const options=endlessOptions(difficulty,0,signatures,families,topologies),seed=123987+i*1051+difficulty;
   const choice=generateEndless(seed,options);assert.deepEqual(choice,generateEndless(seed,options));assert.equal(choice.generatorVersion,ENDLESS_VERSION);assert.ok(replay(choice.level,choice.level.solution).solved);
   if(difficulty>=2){assert.ok(choice.topology.intersections>=2);if(i){assert.notEqual(choice.topology.rings,topologies.at(-1).rings);assert.notEqual(choice.topology.intersections,topologies.at(-1).intersections);assert.notEqual(choice.topology.family,topologies.at(-1).family);}}
   assert.ok(Array.isArray(choice.topology.matrix));signatures.push(choice.signature);families.push(choice.topology.family);topologies.push(choice.topology);
  }
  const reserve=selectFallback(123,{difficulty});assert.equal(reserve.source,'fallback');assert.ok(replay(reserve.level,reserve.level.solution).solved);
 }
});
