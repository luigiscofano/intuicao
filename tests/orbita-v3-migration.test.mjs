import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CAMPAIGN,CAMPAIGN_VERSION} from '../dist/orbita/campaign.mjs';
import {normalizeOrbitaData,restoreOrbitaSession,serializeOrbitaSession,validateOrbitaPresentation,ringPath,recoverOrbitaEndless,circularRecoverySeed,CIRCULAR_RECOVERY_NOTICE,endlessOptions} from '../dist/orbita/ui.mjs';
import {ENDLESS_VERSION,isCircularGeneration} from '../dist/orbita/endless-v2.mjs';
import {generateEndless} from '../dist/orbita/generator.mjs';
import {replay} from '../dist/orbita/engine.mjs';
const fixture=JSON.parse(fs.readFileSync(new URL('./orbita-legacy-v2-session.json',import.meta.url),'utf8'));
test('v2 organic Endless full snapshot remains decodable for the archive, not display',()=>{
 const before=structuredClone(fixture.current),data=normalizeOrbitaData({version:2,catalogVersion:'orbita-campaign-2',campaign:{lastId:1000,completed:{201:{firstCompletedAt:'old'},1000:{firstCompletedAt:'old'}}},endless:{version:2,baseSeed:before.seed,number:7,solved:6,startDifficulty:2,current:before},prefs:{advanced:true,autoAdvance:false}});
 assert.equal(data.version,3);assert.equal(data.catalogVersion,'orbita-campaign-3');assert.deepEqual(data.endless.current,fixture.current);assert.equal(data.endless.current.generatorVersion,'orbita-generator-2');assert.equal(data.endless.solved,6);assert.deepEqual(data.prefs,{advanced:true,autoAdvance:false});assert.ok(data.campaign.completed[1000]);
 const restored=restoreOrbitaSession(before.level,before.session);assert.equal(restored.restored,true);assert.equal(restored.cursor,3);assert.equal(validateOrbitaPresentation(before.level).valid,false);assert.ok(before.level.rings.every(r=>ringPath(before.level,r).length>0));assert.equal(isCircularGeneration(before.level),false);
});
test('catalog-version mismatch resets only the current campaign attempt',()=>{
 const old=structuredClone(fixture.current.level);old.id=fixture.sourceCampaignLevel;
 const session=restoreOrbitaSession(old,null),saved=serializeOrbitaSession(old,session),newDefinition={...structuredClone(old),catalogVersion:3};
 const resumed=restoreOrbitaSession(newDefinition,saved);assert.equal(resumed.restored,false);assert.ok(resumed.restoreIssue);assert.equal(resumed.cursor,0);
 const fresh=serializeOrbitaSession(newDefinition,restoreOrbitaSession(newDefinition,null));assert.equal(fresh.catalogVersion,3);assert.equal(restoreOrbitaSession(newDefinition,fresh).restored,true);
});
test('current campaign and new Endless use only circles, pair maximum two, generator3',()=>{
 assert.equal(CAMPAIGN_VERSION,'orbita-campaign-3');assert.equal(ENDLESS_VERSION,'orbita-generator-3');assert.equal(CAMPAIGN.length,1000);
 for(const level of CAMPAIGN.slice(200))assert.ok(isCircularGeneration(level),'campaign '+level.id);
 for(let difficulty=0;difficulty<=4;difficulty++)for(let i=0;i<8;i++){
  const result=generateEndless(9285+difficulty*200+i,{difficulty});assert.equal(result.generatorVersion,ENDLESS_VERSION);assert.equal(result.level.generation.version,3);assert.ok(isCircularGeneration(result.level));assert.ok(replay(result.level,result.level.solution).solved);
 }
});
test('a stale v2 worker cannot introduce an organic board into a new v3 run',async()=>{
 const {createOrbitaService}=await import('../dist/orbita/service.mjs');
 const worker={terminate(){},postMessage(message){queueMicrotask(()=>worker.onmessage({data:{id:message.id,ok:true,result:{level:fixture.current.level,seed:message.seed,signature:'old-organic',generatorVersion:'orbita-generator-2'}}}));}};
 const service=createOrbitaService({workerFactory:()=>worker});
 try{const result=await service.generate(235,{difficulty:0});assert.equal(result.source,'fallback');assert.equal(result.generatorVersion,ENDLESS_VERSION);assert.ok(isCircularGeneration(result.level));}finally{service.destroy();}
});

test('persisted active organic run recovers to a new circular seed without losing history or conclusions',()=>{
 const persisted=JSON.stringify({version:2,catalogVersion:'orbita-campaign-2',prefs:{autoAdvance:false,advanced:true},campaign:{lastId:201,completed:{201:{firstCompletedAt:'original'}}},endless:{version:2,baseSeed:891,number:7,solved:6,startDifficulty:2,recentSignatures:['historic-signature'],recentFamilies:['old-family'],current:fixture.current},lastView:{active:true,screen:'play',mode:'endless'}});
 const data=normalizeOrbitaData(JSON.parse(persisted)),before=structuredClone(data),oldSeed=data.endless.current.seed,newSeed=circularRecoverySeed(oldSeed),options=endlessOptions(2,6,data.endless.recentSignatures,data.endless.recentFamilies,data.endless.recentTopologies);
 assert.notEqual(newSeed,oldSeed);const result=generateEndless(newSeed,options);
 assert.throws(()=>recoverOrbitaEndless(data,{...result,seed:oldSeed},options));assert.deepEqual(data,before);
 const recovered=recoverOrbitaEndless(data,result,options);assert.equal(recovered.originalSeed,oldSeed);assert.equal(recovered.replacementSeed,newSeed);assert.equal(recovered.notice,CIRCULAR_RECOVERY_NOTICE);
 assert.equal(data.endless.solved,6);assert.equal(data.endless.number,7);assert.equal(data.endless.baseSeed,891);assert.deepEqual(data.campaign,before.campaign);assert.deepEqual(data.prefs,before.prefs);
 assert.deepEqual(data.legacyEndlessArchive[0].current,fixture.current);assert.equal(data.legacyEndlessArchive[0].runHistory.baseSeed,before.endless.baseSeed);assert.deepEqual(data.legacyEndlessArchive[0].runHistory.recentSignatures,before.endless.recentSignatures);assert.equal(data.endless.current.session,null);assert.equal(data.endless.current.completed,false);assert.ok(isCircularGeneration(data.endless.current.level));assert.equal(data.endless.current.generatorVersion,'orbita-generator-3');assert.ok(data.endless.recentSignatures.includes('historic-signature'));
 const roundtrip=normalizeOrbitaData(JSON.parse(JSON.stringify(data)));assert.deepEqual(roundtrip.legacyEndlessArchive,data.legacyEndlessArchive);assert.deepEqual(roundtrip.endless.current,data.endless.current);assert.equal(roundtrip.endless.current.recovery.notice,CIRCULAR_RECOVERY_NOTICE);
 assert.throws(()=>recoverOrbitaEndless(roundtrip,result,options));assert.equal(roundtrip.legacyEndlessArchive.length,1);
});
