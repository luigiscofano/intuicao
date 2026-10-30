import assert from 'node:assert/strict';import fs from 'node:fs';
import {root,store,$,timers,Element} from './direct-ui-harness.mjs';
import {cutLevels} from '../dist/levels.mjs';import {cutLevels as legacy} from '../dist/cut-legacy-levels.mjs';
import {basicCutState} from '../dist/curves.mjs';import {CUT_CAMPAIGN_PROGRESS_KEY as KEY} from '../dist/cut-campaign-progress.mjs';
assert.equal(cutLevels.length,80);assert.equal(legacy.length,100);
const legacyById=new Map(legacy.map(l=>[l.id,l]));
const drafts=Object.fromEntries(legacy.map(l=>['cut:'+l.id,{state:basicCutState(l,l.initialTravel+1),cutMode:'basic',cutDrafts:{basic:null,advanced:null}}]));
const answers=Object.fromEntries(legacy.map(l=>['cut:'+l.id,{failures:3,assisted:true}]));
store.set('intuicao.campaign.original.v1',JSON.stringify(drafts));store.set('intuicao.answers.v1',JSON.stringify(answers));store.set(KEY,JSON.stringify({version:1,completedIds:legacy.map(l=>l.id),lastLevelId:legacy[99].id}));
for(const key of ['min','max','type'])Object.defineProperty(Element.prototype,key,{get(){return this.attrs[key]??'';},set(value){this.attrs[key]=String(value);},configurable:true});
root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;globalThis.cancelAnimationFrame=id=>timers.delete(id);globalThis.matchMedia=()=>({matches:true});
await import('../dist/app.mjs');root.querySelector('[data-game="cut"]').click();
let retained=0,recomposed=0;
for(let i=0;i<80;i++){
 const l=cutLevels[i],old=legacyById.get(l.id),tile=$('level-grid').querySelector(`[data-level="${i}"]`);
 assert.equal(tile.attrs.class.includes('done'),!!old,l.id+' completion follows identity');tile.click();
 if(old){retained++;assert.equal(Number($('basicTravel').value),old.initialTravel+1);assert.equal($('answer-key').hidden,false);assert.equal($('answer-key').dataset.assisted,'true');}
 else{recomposed++;assert.equal(Number($('basicTravel').value),l.initialTravel);assert.equal($('answer-key').hidden,true);assert.equal($('answer-key').dataset.assisted,'false');}
 $('back-selection').click();
}
for(const l of legacy){assert.deepEqual(JSON.parse(store.get('intuicao.campaign.original.v1'))['cut:'+l.id],drafts['cut:'+l.id]);assert.deepEqual(JSON.parse(store.get('intuicao.answers.v1'))['cut:'+l.id],answers['cut:'+l.id]);}
assert.deepEqual(JSON.parse(store.get(KEY)).completedIds,legacy.map(l=>l.id));assert.ok(retained>0&&recomposed>0);
console.log(JSON.stringify({passed:true,actualRoster:80,retained,recomposed,legacyRecordsPreserved:100,identitySeparated:true}));
