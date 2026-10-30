import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {lightLevels} from '../dist/light-levels.mjs';
import {createLightCampaignProgress,LIGHT_CAMPAIGN_PROGRESS_KEY as KEY} from '../dist/light-campaign-progress.mjs';
import {originalLevelState,validOriginalSnapshot} from '../dist/original-json.mjs';
const baseline='bc9240ebd850f3b7d0710b36d8a0ce10319f7cb0';
const text=execFileSync('git',['show',`${baseline}:dist/light-levels.mjs`],{encoding:'utf8',maxBuffer:5e6});
const before=(await import('data:text/javascript;base64,'+Buffer.from(text).toString('base64'))).lightLevels;
const records=new Map(),oldIds=before.map(l=>l.id);
records.set(KEY,JSON.stringify({version:1,completedIds:oldIds,lastLevelId:oldIds[79]}));
const drafts=Object.fromEntries(before.map(l=>['light:'+l.id,{state:originalLevelState({...l,game:'light'})}]));
records.set('intuicao.campaign.original.v1',JSON.stringify(drafts));
const storage={getItem:k=>records.get(k)??null,setItem:(k,v)=>records.set(k,v)};
const p=createLightCampaignProgress(storage),snap=p.snapshot();
let revised=0,retained=0;
for(const [i,l]of lightLevels.entries()){
 const previous=before[i];
 if(previous.id===l.id){retained++;assert.ok(snap.completedIds.has(l.id));assert.ok(validOriginalSnapshot({...l,game:'light'},drafts['light:'+l.id].state));}
 else{revised++;assert.ok(!snap.completedIds.has(l.id));assert.ok(!Object.hasOwn(drafts,'light:'+l.id));assert.ok(snap.completedIds.has(previous.id));}
}
const originalDrafts=records.get('intuicao.campaign.original.v1');
p.complete(lightLevels[79].id);p.visit(lightLevels[79].id);
for(const id of oldIds)assert.ok(p.snapshot().completedIds.has(id),'Never erase archived completion '+id);
assert.equal(records.get('intuicao.campaign.original.v1'),originalDrafts,'Old drafts are not rewritten or reassigned');
console.log(JSON.stringify({passed:true,retained,revised,oldCompletedIdsRetained:oldIds.length,oldDraftsUntouched:true}));
