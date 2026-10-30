import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPAIGN} from '../dist/repasse/campaign.mjs';
import {normalizeRepasseData,freshRepasseData,serializeRepasseSession,restoreRepasseSession,commitRepasseCommand,endlessOptions} from '../dist/repasse/ui.mjs';

test('curation retains exact stable identities and archives omitted records without positional remapping',()=>{
 const retained=CAMPAIGN.find(level=>level.id!==level.displayNumber),omitted=Array.from({length:500},(_,i)=>i+1).find(id=>!CAMPAIGN.some(level=>level.id===id));
 assert.ok(retained);assert.ok(omitted);
 const session=commitRepasseCommand(retained,restoreRepasseSession(retained,null),retained.solution[0]).session;
 const raw=freshRepasseData();raw.campaign.lastId=retained.id;
 raw.campaign.completed[retained.id]={firstCompletedAt:'retained',assisted:false};
 raw.campaign.completed[omitted]={firstCompletedAt:'old',assisted:true};
 raw.campaign.sessions[retained.id]=serializeRepasseSession(retained,session);
 raw.campaign.sessions[omitted]={historical:true};
 raw.events=[{level:omitted,type:'win',date:'old'}];raw.learnedConfigurations=['original','single'];
 raw.endless={baseSeed:12,startDifficulty:4,number:9,solved:8,current:{level:retained,completed:false}};
 raw.custom={level:{id:'custom-before'},session:{commands:[]}};
 const data=normalizeRepasseData(raw);
 assert.equal(data.campaign.lastId,retained.id);
 assert.deepEqual(data.campaign.completed[retained.id],raw.campaign.completed[retained.id]);
 assert.equal(restoreRepasseSession(retained,data.campaign.sessions[retained.id]).cursor,1);
 assert.equal(data.campaign.completed[omitted],undefined);
 assert.deepEqual(data.campaign.archive.completed[omitted],raw.campaign.completed[omitted]);
 assert.deepEqual(data.campaign.archive.sessions[omitted],{historical:true});
 assert.deepEqual(data.events,raw.events);assert.deepEqual(data.custom,raw.custom);assert.deepEqual(data.learnedConfigurations,raw.learnedConfigurations);
 assert.equal(data.endless.solved,8);assert.equal(data.endless.current.level.id,retained.id);
 assert.deepEqual(normalizeRepasseData(data),data,'migration is idempotent');
 raw.campaign.lastId=omitted;const historical=normalizeRepasseData(raw);
 assert.equal(historical.campaign.lastId,null);assert.equal(historical.campaign.archive.lastId,omitted);
});

test('Sem Parar configurations remain gradual and independent of displayed campaign positions',()=>{
 assert.equal(endlessOptions(7,0).introduction,'single');
 assert.equal(endlessOptions(7,0,['original','single']).introduction,'corner');
 assert.equal(endlessOptions(7,0,['original','single','corner']).introduction,'four');
 assert.equal(endlessOptions(7,0,['original','single','corner','four']).introduction,undefined);
});

test('legacy configuration milestone discoveries survive absent learned field and archived sessions',()=>{
 const raw={campaign:{completed:{201:{firstCompletedAt:'old'}},sessions:{276:{commands:[]}},archive:{completed:{351:{assisted:false}},sessions:{}}}};
 assert.deepEqual(normalizeRepasseData(raw).learnedConfigurations,['original','single','corner','four']);
});
