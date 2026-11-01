import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPAIGN,CONTENT_REVISION} from '../dist/sintonia/campaign.mjs';
import {CAMPAIGN as OLD} from '../dist/sintonia/campaign-v4.mjs';
import {goalButtonSintoniaOverlaps,validateActiveSintoniaLevel} from '../dist/sintonia/active-rules.mjs';
import {normalizeSintoniaData,updatedSintoniaCampaignIndex} from '../dist/sintonia/ui.mjs';
import {initialState} from '../dist/sintonia/engine.mjs';
import {levelContentRevision,resolveSintoniaCampaignAttempt,restoreSintoniaSession} from '../dist/sintonia/service.mjs';
const affected=OLD.filter(l=>goalButtonSintoniaOverlaps(l).length),retained=OLD.filter(l=>!goalButtonSintoniaOverlaps(l).length);
const record=l=>({rulesVersion:1,contentRevision:levelContentRevision(l),level:structuredClone(l),commands:[],cursor:0,state:initialState(l),assisted:false,failures:0,winRecorded:false});
test('nine historical maps reject overlap without mutating definitions',()=>{assert.deepEqual(affected.map(l=>l.number),[16,31,36,45,57,58,60,74,79]);for(const old of affected){const before=JSON.stringify(old),check=validateActiveSintoniaLevel(old);assert.equal(check.valid,false);assert.match(check.errors.join(' '),/destino.*mesma célula/);assert.equal(JSON.stringify(old),before);assert.equal(restoreSintoniaSession(old,record(old)).restoreIssue,'inactive-definition');}});
test('v4 migration archives affected sessions/completions, preserves 71 exact sessions',()=>{
 const raw={version:1,contentRevision:'sintonia-content-4',campaign:{lastId:affected.at(-1).id,sessions:Object.fromEntries(OLD.map(l=>[l.id,record(l)])),completed:Object.fromEntries(OLD.map(l=>[l.id,{moves:8}]))}};
 const before=structuredClone(raw),data=normalizeSintoniaData(raw);assert.deepEqual(raw,before);assert.deepEqual(data.campaign.sessions,raw.campaign.sessions);assert.equal(data.contentRevision,CONTENT_REVISION);assert.equal(Object.keys(data.archivedAttempts).length,9);
 for(const old of retained){const current=CAMPAIGN.find(c=>c.id===old.id);assert.deepEqual(current,old);assert(data.campaign.completed[old.id]);assert.equal(resolveSintoniaCampaignAttempt(current,record(old)).status,'resumed');const noEmbedded=record(old);delete noEmbedded.level;assert.equal(resolveSintoniaCampaignAttempt(current,noEmbedded).status,'resumed');}
 if(CONTENT_REVISION==='sintonia-content-5'){assert.equal(Object.keys(data.campaign.completed).length,71);assert.equal(Object.keys(data.campaign.archivedCompleted).length,9);for(const old of affected){assert(!data.campaign.completed[old.id]);assert.equal(updatedSintoniaCampaignIndex(old.id,record(old)),old.number-1);}}
 const twice=normalizeSintoniaData(data);assert.deepEqual(twice.archivedAttempts,data.archivedAttempts);assert.deepEqual(twice.campaign.completed,data.campaign.completed);
});
test('custom and endless archive overlap only, not legal historical generator versions',()=>{
 for(const invalid of [false,true]){const level=invalid?affected[0]:retained[0],raw={version:1,contentRevision:'sintonia-content-4',custom:{level,session:record(level)},endless:{current:{level,session:record(level)},number:6,solved:5}};const data=normalizeSintoniaData(raw);assert.deepEqual(data.custom,raw.custom);assert.deepEqual(data.endless.current,raw.endless.current);assert.equal(Object.keys(data.archivedAttempts).length,invalid?2:0);}
});
test('imports reject both plate and switch goal collisions, not merely editorial tags',()=>{
 for(const field of ['plates','switches']){const level=structuredClone(retained[0]);level.boards[0][field]=[{cell:level.boards[0].goal}];const before=JSON.stringify(level);const result=validateActiveSintoniaLevel(level);assert.equal(result.valid,false);assert.match(result.errors[0],/Separe o destino dos botões/);assert.equal(JSON.stringify(level),before);}
});
