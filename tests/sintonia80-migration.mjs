import assert from 'node:assert/strict';
import {host,store,$} from './direct-ui-harness.mjs';
import {CAMPAIGN} from '../dist/sintonia/campaign.mjs';
import {CAMPAIGN as V2} from '../dist/sintonia/campaign-v2.mjs';
import {LEGACY_CAMPAIGN as V1} from '../dist/sintonia/campaign-v1.mjs';
import {initSintonia,normalizeSintoniaData,endlessOptions} from '../dist/sintonia/ui.mjs';
import {restoreSintoniaSession,serializeSintoniaSession,commitSintoniaCommand,resolveSintoniaCampaignAttempt,resolveArchivedSintoniaAttempt,sintoniaDefinitionKey,isRetainedSintoniaAttempt} from '../dist/sintonia/service.mjs';
import {initialState,stateKey,replay} from '../dist/sintonia/engine.mjs';
import {selectCertifiedFallback} from '../dist/sintonia/fallback.mjs';

const play=(level)=>{let session=restoreSintoniaSession(level,null);for(const direction of level.solution)session=commitSintoniaCommand(level,session,direction).session;session.cursor=Math.floor(session.commands.length/2);return session;};
for(const catalog of [V1,V2])for(const level of catalog){
 const history=play(level),saved=serializeSintoniaSession(history);delete saved.level;
 const resolved=resolveArchivedSintoniaAttempt(level.id,saved);
 assert.equal(resolved.status,'resumed',level.id);
 assert.equal(sintoniaDefinitionKey(resolved.level),sintoniaDefinitionKey(level));
 const restored=restoreSintoniaSession(resolved.level,resolved.saved);
 assert.deepEqual(restored.states,history.states);assert.equal(restored.cursor,history.cursor);
 assert.deepEqual(restored.commands,history.commands);
}
for(const level of CAMPAIGN){
 const old=V2.find(item=>item.id===level.id);
 if(!old)continue;
 assert.equal(sintoniaDefinitionKey(level),sintoniaDefinitionKey(old),'reused ID must be same map');
 assert.equal(isRetainedSintoniaAttempt(old,level),false,'editorial revision alone must not prompt changed-map reset');
 const saved=serializeSintoniaSession(play(old));assert.equal(resolveSintoniaCampaignAttempt(level,saved).status,'resumed');
}
const currentIds=new Set(CAMPAIGN.map(level=>level.id));
const retired=V2.find(level=>!currentIds.has(level.id)&&level.solution.length>3);
const old=serializeSintoniaSession(play(retired));old.animalRoster=['arara','quati','anta','onca'].slice(0,retired.boards.length);
const legacyLast={version:1,contentRevision:'sintonia-content-2',campaign:{lastId:retired.id,sessions:{[retired.id]:old},completed:{[V2[425].id]:{moves:11}}},learnedMechanics:[],lastView:{active:true,screen:'play',mode:'campaign'}};
const normalized=normalizeSintoniaData(legacyLast);assert.deepEqual(normalized.campaign.sessions,legacyLast.campaign.sessions);assert.deepEqual(normalized.campaign.completed,legacyLast.campaign.completed);assert.ok(normalized.learnedMechanics.includes('delivery'),'legacy evidence, not old426 threshold');
for(const [catalog,contentRevision] of [[V1,'sintonia-content-1'],[V2,'sintonia-content-2']])for(const level of catalog){
 const learned=normalizeSintoniaData({version:1,contentRevision,campaign:{completed:{[level.id]:{}},sessions:{}}}).learnedMechanics;
 assert.deepEqual(new Set(learned),new Set(level.mechanics),'completion learning follows its original revision');
}
assert.deepEqual(normalizeSintoniaData({version:1,campaign:{completed:{},sessions:{}},learnedMechanics:['walls']}).learnedMechanics,['walls']);
assert.equal(resolveArchivedSintoniaAttempt('missing',{rulesVersion:1,contentRevision:'unknown',commands:[],cursor:0}).status,'blocked');
const corrupt={...old,level:{...structuredClone(retired),id:'wrong-id'}};assert.equal(resolveArchivedSintoniaAttempt(retired.id,corrupt).status,'blocked');
host.id='sintonia';globalThis.addEventListener=()=>{};
const key='intuicao.sintonia.v1';store.set(key,JSON.stringify(legacyLast));
const read=()=>JSON.parse(store.get(key));let app=initSintonia({hideOtherGames(){}});assert.equal(app.restoreOnLoad(),true);
assert.match(host.innerHTML,/ARQUIVO · TENTATIVA PRESERVADA/);assert.match($('s-status').textContent,/Tentativa arquivada no mapa original/);
const session=()=>read().campaign.sessions[retired.id];assert.equal(session().cursor,old.cursor);assert.deepEqual(session().animalRoster,old.animalRoster);
$('s-redo').click();assert.equal(session().cursor,old.cursor+1);$('s-undo').click();assert.equal(stateKey(session().state),stateKey(old.state));
$('s-reset').click();$('restart-sintonia-cancel').click();assert.equal(session().cursor,old.cursor);
$('s-reset').click();$('restart-sintonia-confirm').click();assert.equal(session().cursor,0);assert.equal(stateKey(session().state),stateKey(initialState(retired)));assert.deepEqual(session().animalRoster,old.animalRoster);
assert.equal(sintoniaDefinitionKey(session().level),sintoniaDefinitionKey(retired));
app.hide();const reload=read();reload.lastView={active:true,screen:'play',mode:'archive'};store.set(key,JSON.stringify(reload));app=initSintonia({hideOtherGames(){}});assert.equal(app.restoreOnLoad(),true);assert.equal(read().lastView.mode,'archive');app.hide();
// Endless safety bank is outside the campaign and never requires two unknown mechanics.
for(let difficulty=0;difficulty<6;difficulty++)for(const learned of [[],['walls','plate'],normalized.learnedMechanics]){
 const result=selectCertifiedFallback(`sintonia80-history-${difficulty}`,endlessOptions(difficulty,0,learned));
 assert.ok(result.level.mechanics.filter(mechanic=>!new Set(['walls',...learned]).has(mechanic)).length<=1);
 assert.equal(currentIds.has(result.level.id),false);assert.equal(replay(result.level,result.level.solution).won,true);
}
console.log('PASS SINTONIA80: 1000 v1/v2 archived histories, reused-ID map identity, learning recovery, archived active attempt UI undo/redo/restart/reload, separate fallback learning gates. No replay onto another map.');
// Historical completion is not permission to mark a different map completed.
const changedCurrent=CAMPAIGN.find(level=>{const old=V1.find(item=>item.id===level.id);return old&&sintoniaDefinitionKey(old)!==sintoniaDefinitionKey(level);});
assert.ok(changedCurrent);
const original=V1.find(level=>level.id===changedCurrent.id),before=serializeSintoniaSession(restoreSintoniaSession(original,null));
const legacyCompletion={moves:99,assisted:false,firstCompletedAt:'legacy'};
const raw={version:1,contentRevision:'sintonia-content-1',campaign:{lastId:original.id,completed:{[original.id]:legacyCompletion},sessions:{[original.id]:before}},lastView:{active:true,screen:'play',mode:'campaign'}};
const reconciled=normalizeSintoniaData(raw);
assert.equal(reconciled.campaign.completed[original.id],undefined);
assert.deepEqual(reconciled.campaign.archivedCompleted[`sintonia-content-1:${original.id}`].result,legacyCompletion);
assert.deepEqual(raw.campaign.completed[original.id],legacyCompletion,'normalization never mutates input');
store.set(key,JSON.stringify(raw));app=initSintonia({hideOtherGames(){}});assert.equal(app.restoreOnLoad(),true);
for(const direction of original.solution)host.querySelector(`[data-s-direction="${direction}"]`).click();
assert.equal(read().campaign.completed[original.id],undefined,'winning older retained map cannot complete changed current map');
assert.ok(read().campaign.archivedCompleted[`sintonia-content-1:${original.id}`]);app.hide();
console.log('PASS legacy completion identity: original achievements archived and never credited to a different map, including a later win on the retained old attempt.');

const unknownResult={moves:4,assisted:false};
const unknownRevision={version:1,contentRevision:'unrecognized-content',campaign:{completed:{[CAMPAIGN[0].id]:unknownResult},sessions:{}}};
const unproven=normalizeSintoniaData(unknownRevision);
assert.equal(unproven.campaign.completed[CAMPAIGN[0].id],undefined,'unknown definition cannot earn current completion');
assert.deepEqual(unproven.campaign.archivedCompleted[`unrecognized-content:${CAMPAIGN[0].id}`].result,unknownResult);
assert.equal(unproven.campaign.archivedCompleted[`unrecognized-content:${CAMPAIGN[0].id}`].definitionKey,null);
const knownCurrent=normalizeSintoniaData({...unknownRevision,contentRevision:'sintonia-content-3'});
assert.deepEqual(knownCurrent.campaign.completed[CAMPAIGN[0].id],unknownResult,'known current revision maps identity');
console.log('PASS unproven completion identity is conservatively archived; known current definitions retain progress.');
