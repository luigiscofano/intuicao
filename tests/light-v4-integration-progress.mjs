import assert from 'node:assert/strict';
import {createLightCampaignProgress,LIGHT_CAMPAIGN_PROGRESS_KEY as KEY} from '../dist/light-campaign-progress.mjs';

const makeStorage=entries=>{
 const records=new Map(entries),writes=[];
 return {records,writes,getItem:key=>records.get(key)??null,setItem(key,value){writes.push([key,value]);records.set(key,value);}};
};
const otherStores=[['intuicao.campaign.original.v1','{"light:light-v3-1":{"state":{"objects":[]}},"cut:corte-v2-1":{"keep":true}}'],['intuicao.answers.v1','{"light:light-v3-1":{"failures":4,"assisted":true}}'],['intuicao.endless.original.v1','{"light":{"seed":41,"count":8}}'],['intuicao.custom.original.v1','{"keep":"custom"}'],['intuicao.collection.v1','{"keep":"other games"}'],['intuicao.advanced-hidden','true']];
const storage=makeStorage(otherStores),progress=createLightCampaignProgress(storage);
assert.equal(progress.snapshot().completedIds.size,0,'A draft or assisted answer is not evidence of completion');
assert.equal(progress.snapshot().lastLevelId,null,'Old in-memory-only lastLevel cannot be invented');
assert.equal(storage.writes.length,0,'Loading legacy saves is read-only');
assert.equal(progress.visit('light-v3-1'),true);assert.equal(progress.complete('light-v3-1'),true);
const writes=storage.writes.length;progress.visit('light-v3-1');progress.complete('light-v3-1');assert.equal(storage.writes.length,writes,'Repeated render/reset writes are idempotent');
const reload=createLightCampaignProgress(storage),snapshot=reload.snapshot();
assert.deepEqual([...snapshot.completedIds],['light-v3-1']);assert.equal(snapshot.lastLevelId,'light-v3-1');
assert.equal(snapshot.completedIds.has('light-v4-new-at-number-1'),false,'A new identity cannot inherit a reused display number');
assert.deepEqual(otherStores.map(([key])=>[key,storage.records.get(key)]),otherStores,'Unrelated stores remain byte-for-byte intact');
assert.ok(storage.writes.every(([key])=>key===KEY));
snapshot.completedIds.clear();assert.equal(reload.snapshot().completedIds.has('light-v3-1'),true,'Snapshots cannot mutate progress');
console.log('PASS stable-ID completion/current level survive reload without inventing old completions or touching existing stores');

storage.records.set(KEY,JSON.stringify({version:1,completedIds:['light-v3-1','light-v3-retired'],lastLevelId:'light-v3-retired',futureMetadata:{keep:true}}));
const tabA=createLightCampaignProgress(storage),tabB=createLightCampaignProgress(storage);
tabA.complete('light-v4-a');tabB.complete('light-v4-b');tabB.visit('light-v4-b');
const combined=JSON.parse(storage.records.get(KEY));
assert.deepEqual(new Set(combined.completedIds),new Set(['light-v3-1','light-v3-retired','light-v4-a','light-v4-b']));
assert.deepEqual(combined.futureMetadata,{keep:true});assert.equal(combined.lastLevelId,'light-v4-b');
assert.deepEqual(tabA.snapshot().completedIds,new Set(combined.completedIds));
storage.records.set(KEY,JSON.stringify({version:1,completedIds:['light-v4-external'],lastLevelId:'light-v4-external',externalMetadata:'keep'}));
assert.equal(tabA.snapshot().lastLevelId,'light-v4-external');assert.equal(tabA.snapshot().completedIds.has('light-v3-retired'),true);
tabA.complete('light-v4-after-external');
assert.deepEqual(new Set(JSON.parse(storage.records.get(KEY)).completedIds),new Set([...combined.completedIds,'light-v4-external','light-v4-after-external']));
assert.equal(JSON.parse(storage.records.get(KEY)).externalMetadata,'keep');
console.log('PASS sequential cross-tab updates merge completions and retain absent IDs and unknown record fields');

for(const raw of ['{broken','null','[]','42',JSON.stringify({version:2,completedIds:['light-v3-1'],lastLevelId:'light-v3-1'}),JSON.stringify({version:1,completedIds:['light-v3-valid',false,3],lastLevelId:'light-v3-valid'}),'x'.repeat(2000001)]){
 const corrupt=makeStorage([[KEY,raw],...otherStores]),session=createLightCampaignProgress(corrupt);
 assert.equal(session.complete('light-v4-session'),false);assert.equal(session.visit('light-v4-session'),false);
 assert.equal(session.snapshot().completedIds.has('light-v4-session'),true);assert.equal(session.snapshot().lastLevelId,'light-v4-session');
 assert.equal(corrupt.records.get(KEY),raw,'Malformed/future-version data must not be overwritten');assert.equal(corrupt.writes.length,0);
}
let denied=true;const flaky=makeStorage([[KEY,JSON.stringify({version:1,completedIds:['light-v3-1'],lastLevelId:'light-v3-1'})]]),read=flaky.getItem;
flaky.getItem=key=>{if(denied)throw Error('storage denied');return read(key);};
const offline=createLightCampaignProgress(flaky);assert.equal(offline.complete('light-v4-offline'),false);assert.equal(offline.snapshot().completedIds.has('light-v4-offline'),true);
denied=false;assert.equal(offline.visit('light-v4-offline'),true);assert.deepEqual(new Set(JSON.parse(flaky.records.get(KEY)).completedIds),new Set(['light-v3-1','light-v4-offline']));
flaky.setItem=()=>{throw Error('quota');};assert.equal(offline.complete('light-v4-no-quota'),false);assert.equal(offline.snapshot().completedIds.has('light-v4-no-quota'),true);
const absent=createLightCampaignProgress(undefined);assert.equal(absent.complete('light-v4-memory'),false);assert.equal(absent.snapshot().completedIds.has('light-v4-memory'),true);
const oldDescriptor=Object.getOwnPropertyDescriptor(globalThis,'localStorage');Object.defineProperty(globalThis,'localStorage',{get(){throw Error('SecurityError');},configurable:true});
assert.doesNotThrow(()=>createLightCampaignProgress());if(oldDescriptor)Object.defineProperty(globalThis,'localStorage',oldDescriptor);else delete globalThis.localStorage;
assert.equal(progress.visit(1),false);assert.equal(progress.complete(null),false);assert.equal(progress.complete(''),false);
console.log('PASS malformed/future records stay untouched; unavailable/denied/quota storage retains session progress and recovers when possible');
