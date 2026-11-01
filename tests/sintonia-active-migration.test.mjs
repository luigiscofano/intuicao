import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPAIGN,CONTENT_REVISION} from '../dist/sintonia/campaign.mjs';
import {CAMPAIGN as OLD} from '../dist/sintonia/campaign-v3.mjs';
import {initialState} from '../dist/sintonia/engine.mjs';
import {removedSintoniaMechanics,validateActiveSintoniaLevel} from '../dist/sintonia/active-rules.mjs';
import {normalizeSintoniaData,updatedSintoniaCampaignIndex} from '../dist/sintonia/ui.mjs';
import {restoreSintoniaSession,serializeSintoniaSession,resolveArchivedSintoniaAttempt,resolveSintoniaCampaignAttempt,commitSintoniaCommand,createSintoniaService,sintoniaDefinitionKey} from '../dist/sintonia/service.mjs';
const retained=OLD.filter(l=>!removedSintoniaMechanics(l).length),removed=OLD.filter(l=>removedSintoniaMechanics(l).length);
const saved=l=>({rulesVersion:1,contentRevision:'sintonia-content-3',level:structuredClone(l),commands:[],cursor:0,state:initialState(l),assisted:false,failures:0,winRecorded:false});
test('retired definitions reject active import, replay and hints but remain readable',async()=>{
 assert.equal(removed.length,30);assert.equal(retained.length,50);
 for(const l of removed){assert.equal(validateActiveSintoniaLevel(l).valid,false);assert.equal(resolveArchivedSintoniaAttempt(l.id,saved(l)).status,'blocked');assert.equal(restoreSintoniaSession(l,saved(l)).restoreIssue,'removed-mechanics');assert.throws(()=>commitSintoniaCommand(l,{states:[initialState(l)],cursor:0},'up'),/arquivada/);const service=createSintoniaService();await assert.rejects(service.hint(l,initialState(l)),/retirados/);service.destroy();}
});
test('all removed structural fields reject import even if editorial mechanic tags are absent',()=>{
 for(const field of ['boxes','portals','fragile','oneWays','selectors']){const l=structuredClone(retained[0]);l.mechanics=[];l.boards[0][field]=[{}];assert.equal(validateActiveSintoniaLevel(l).valid,false);}
 for(const extra of [{channels:[{}]},{initialSelectors:{legacy:0}}]){assert.equal(validateActiveSintoniaLevel({...structuredClone(retained[0]),...extra}).valid,false);}
 const l=structuredClone(retained[0]);l.boards[0].gates=[{condition:{type:'selected'}}];assert.equal(validateActiveSintoniaLevel(l).valid,false);
});
test('v3 campaign and independent runs migrate losslessly, without inherited wins',()=>{
 const source={version:1,contentRevision:'sintonia-content-3',campaign:{lastId:removed[0].id,sessions:Object.fromEntries(OLD.map(l=>[l.id,saved(l)])),completed:Object.fromEntries(OLD.map(l=>[l.id,{moves:7,assisted:false}]))},endless:{current:{level:removed[0],session:saved(removed[0])},number:3,solved:2},custom:{level:removed[1],session:saved(removed[1])}};
 const before=structuredClone(source),data=normalizeSintoniaData(source);assert.deepEqual(source,before);assert.equal(data.contentRevision,CONTENT_REVISION);assert.deepEqual(data.campaign.sessions,source.campaign.sessions);assert.deepEqual(data.endless.current,source.endless.current);assert.deepEqual(data.custom,source.custom);assert.equal(Object.keys(data.archivedAttempts).length,32);
 for(const l of retained){const current=CAMPAIGN.find(x=>x.id===l.id);assert(current);assert.equal(sintoniaDefinitionKey(current),sintoniaDefinitionKey(l));assert(data.campaign.completed[l.id]);assert.equal(resolveSintoniaCampaignAttempt(current,saved(l)).status,'resumed');}
 if(CONTENT_REVISION==='sintonia-content-4'){assert.equal(Object.keys(data.campaign.completed).length,50);assert.equal(Object.keys(data.campaign.archivedCompleted).length,30);for(const l of removed)assert(!data.campaign.completed[l.id]);}
 const twice=normalizeSintoniaData(data);assert.deepEqual(twice.campaign.completed,data.campaign.completed);assert.deepEqual(twice.archivedAttempts,data.archivedAttempts);
});
test('definition-free v3 saves resolve original maps and archive references do not duplicate payloads',()=>{
 const records=Object.fromEntries(OLD.map(l=>{const record=saved(l);delete record.level;return [l.id,record];}));
 const source={version:1,contentRevision:'sintonia-content-3',campaign:{sessions:records,completed:{}}};
 const data=normalizeSintoniaData(source),twice=normalizeSintoniaData(data);
 for(const l of retained)assert.equal(resolveSintoniaCampaignAttempt(CAMPAIGN.find(x=>x.id===l.id),records[l.id]).status,'resumed');
 for(const record of Object.values(data.archivedAttempts)){assert.equal(record.source,'campaign.sessions');assert(!record.saved);assert(!record.level?.editorial);assert.deepEqual(data.campaign.sessions[record.id],records[record.id]);}
 assert.deepEqual(twice.archivedAttempts,data.archivedAttempts);
 console.log('Arquivo sem definições embutidas:',Buffer.byteLength(JSON.stringify(data)),'bytes; normalizações repetidas sem duplicação.');
});

test('opening a retired attempt leads to its current ordinal without importing progress',()=>{
 for(const old of removed){assert.equal(updatedSintoniaCampaignIndex(old.id,saved(old)),old.number-1);assert.equal(updatedSintoniaCampaignIndex(old.id,undefined),old.number-1);if(CONTENT_REVISION==='sintonia-content-4')assert.notEqual(CAMPAIGN[old.number-1].id,old.id);}
});
