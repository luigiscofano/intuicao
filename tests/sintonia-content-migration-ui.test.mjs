// Deterministic interaction coverage; real browser/layout QA remains separate.
import assert from 'node:assert/strict';
import {host,store,$} from './direct-ui-harness.mjs';
import {CAMPAIGN} from '../dist/sintonia/campaign.mjs';
import {LEGACY_CAMPAIGN} from '../dist/sintonia/campaign-v1.mjs';
import {initSintonia} from '../dist/sintonia/ui.mjs';
import {restoreSintoniaSession,commitSintoniaCommand,serializeSintoniaSession,levelContentRevision,persistableSintoniaLevel} from '../dist/sintonia/service.mjs';
import {stateKey} from '../dist/sintonia/engine.mjs';

host.id='sintonia';globalThis.addEventListener=()=>{};
const oldLevel=LEGACY_CAMPAIGN[50];
// A revision fixture makes this interaction test independent of generation time.
CAMPAIGN[50]={...structuredClone(CAMPAIGN[50]),contentRevision:'sintonia-content-2'};
let original=restoreSintoniaSession(oldLevel,null);
for(const command of oldLevel.solution)original=commitSintoniaCommand(oldLevel,original,command).session;
original.cursor=2;
const oldSave=serializeSintoniaSession(original);delete oldSave.level;delete oldSave.contentRevision;
const completions={'sintonia-0001':{moves:1,assisted:false,firstCompletedAt:'before-redesign'}};
const endless={version:1,baseSeed:123,number:3,solved:2,startDifficulty:0,current:{level:LEGACY_CAMPAIGN[1],seed:456,session:null}};
store.set('intuicao.sintonia.v1',JSON.stringify({version:1,campaign:{lastId:oldLevel.id,sessions:{[oldLevel.id]:oldSave},completed:completions},endless,lastView:{active:true,screen:'play',mode:'campaign'}}));
const app=initSintonia({hideOtherGames(){}}),saved=()=>JSON.parse(store.get('intuicao.sintonia.v1')),session=()=>saved().campaign.sessions[oldLevel.id];
const dialog=()=>$('restart-sintonia'),cancel=()=>$('restart-sintonia-cancel'),ok=()=>$('restart-sintonia-confirm');
assert.equal(app.restoreOnLoad(),true);
assert.match($('s-status').textContent,/Partida preservada no mapa anterior/);
assert.equal(session().cursor,2);assert.deepEqual(session().commands,original.commands);assert.deepEqual(session().level,persistableSintoniaLevel(oldLevel));
$('s-undo').click();assert.equal(session().cursor,1);assert.equal(stateKey(session().state),stateKey(original.states[1]));assert.match($('s-status').textContent,/Partida preservada no mapa anterior/);
$('s-redo').click();assert.equal(session().cursor,2);assert.equal(stateKey(session().state),stateKey(original.states[2]));
const beforeCancel=structuredClone(session());
$('s-reset').click();assert.equal(dialog().open,true);assert.equal($('restart-sintonia-title').textContent,'Começar o mapa atualizado?');
assert.match($('restart-sintonia-description').textContent,/Apenas as jogadas e o histórico de desfazer desta tentativa/);
cancel().click();assert.equal(dialog().open,false);assert.deepEqual(session(),beforeCancel);
$('s-reset').click();dialog().dispatch('cancel');assert.equal(dialog().open,false);assert.deepEqual(session(),beforeCancel);
// Leaving an informed content confirmation cannot leak its copy into ordinary restart.
$('s-back').click();host.querySelector('[data-s-level="0"]').click();
$('s-reset').click();assert.equal($('restart-sintonia-title').textContent,'Reiniciar este nível?');
assert.equal($('restart-sintonia-description').textContent,'Suas jogadas nesta tentativa serão apagadas. O progresso dos outros níveis será mantido.');
assert.equal(ok().textContent,'Reiniciar nível');cancel().click();
assert.deepEqual(session(),beforeCancel);
// The result retry shortcut must not bypass informed confirmation on an old map.
$('s-back').click();host.querySelector('[data-s-level="50"]').click();
$('s-confirm').click();const retry=$('s-motion').querySelector('[data-result-retry]'),beforeRetry=structuredClone(session());
retry.click();assert.equal(dialog().open,true);assert.equal($('restart-sintonia-title').textContent,'Começar o mapa atualizado?');
assert.deepEqual(session(),beforeRetry);cancel().click();assert.equal(retry.disabled,false);assert.deepEqual(session(),beforeRetry);
retry.click();assert.equal(dialog().open,true);ok().click();
assert.equal(dialog().open,false);assert.equal(session().cursor,0);assert.deepEqual(session().commands,[]);assert.equal(session().contentRevision,'sintonia-content-2');assert.deepEqual(session().level,persistableSintoniaLevel(CAMPAIGN[50]));
assert.deepEqual(saved().campaign.completed,completions);assert.deepEqual(saved().endless.current,endless.current);assert.equal(saved().endless.solved,2);
assert.match($('s-status').textContent,/Somente as jogadas desta tentativa/);
$('s-reset').click();assert.equal($('restart-sintonia-title').textContent,'Reiniciar este nível?');cancel().click();
// A stale confirmation cannot reset a newer navigation target.
$('s-reset').click();const stale=ok();$('s-back').click();host.querySelector('[data-s-level="1"]').click();
const afterNavigation=structuredClone(saved().campaign.sessions[CAMPAIGN[1].id]);stale.click();
assert.deepEqual(saved().campaign.sessions[CAMPAIGN[1].id],afterNavigation);assert.equal(levelContentRevision(session().level),'sintonia-content-2');
app.hide();
console.log('PASS old campaign reload, undo/redo, cancel/native cancel, copy reset, retry confirmation, scoped update, stale confirmation');

const corrupt={...structuredClone(oldSave),contentRevision:'retired-without-definition'},otherAttempt=structuredClone(afterNavigation);
store.set('intuicao.sintonia.v1',JSON.stringify({version:1,campaign:{lastId:oldLevel.id,sessions:{[oldLevel.id]:corrupt,[CAMPAIGN[1].id]:otherAttempt},completed:completions},endless,lastView:{active:true,screen:'play',mode:'campaign'}}));
const recoveredApp=initSintonia({hideOtherGames(){}});
assert.equal(recoveredApp.restoreOnLoad(),true);assert.equal(dialog().open,true);assert.deepEqual(session(),corrupt);
assert.match($('s-selection-status').textContent,/tentativa anterior foi preservada/);
cancel().click();assert.deepEqual(session(),corrupt);
host.querySelector('[data-s-level="50"]').click();assert.equal(dialog().open,true);ok().click();
assert.equal(session().cursor,0);assert.equal(session().contentRevision,'sintonia-content-2');
assert.deepEqual(saved().campaign.sessions[CAMPAIGN[1].id],otherAttempt);assert.deepEqual(saved().campaign.completed,completions);assert.deepEqual(saved().endless.current,endless.current);
recoveredApp.hide();
console.log('PASS unrecoverable attempt remains saved on cancel; explicit reset affects only that attempt');

const oldEndlessLevel={...structuredClone(oldLevel),id:'old-endless-definition',generatorVersion:1};
let oldEndlessSession=restoreSintoniaSession(oldEndlessLevel,null);
for(const direction of oldEndlessLevel.solution)oldEndlessSession=commitSintoniaCommand(oldEndlessLevel,oldEndlessSession,direction).session;
oldEndlessSession.cursor=2;
const oldEndlessSave=serializeSintoniaSession(oldEndlessSession);delete oldEndlessSave.level;delete oldEndlessSave.contentRevision;
const oldEndlessRun={version:1,baseSeed:12,number:6,solved:4,startDifficulty:1,recentSignatures:['old-signature'],recentFamilies:['intermediate-stop'],current:{level:oldEndlessLevel,seed:34,generatorVersion:1,rulesVersion:1,session:oldEndlessSave}};
store.set('intuicao.sintonia.v1',JSON.stringify({version:1,prefs:{autoAdvance:false},campaign:{completed:completions,sessions:{}},endless:oldEndlessRun,lastView:{active:true,screen:'play',mode:'endless'}}));
const endlessApp=initSintonia({hideOtherGames(){}});assert.equal(endlessApp.restoreOnLoad(),true);
assert.deepEqual(saved().endless.current.level,oldEndlessLevel);assert.equal(saved().endless.current.session.cursor,2);assert.equal(saved().endless.solved,4);assert.equal(saved().endless.number,6);
$('s-undo').click();assert.equal(saved().endless.current.session.cursor,1);$('s-redo').click();assert.equal(saved().endless.current.session.cursor,2);
$('s-reset').click();assert.equal($('restart-sintonia-title').textContent,'Reiniciar este nível?');ok().click();
assert.deepEqual(saved().endless.current.level,oldEndlessLevel);assert.equal(saved().endless.current.session.cursor,0);assert.equal(saved().endless.current.seed,34);assert.equal(saved().endless.current.generatorVersion,1);
assert.equal(saved().endless.solved,4);assert.equal(saved().endless.number,6);assert.deepEqual(saved().campaign.completed,completions);
endlessApp.hide();
console.log('PASS old Endless UI reload/undo/redo/restart retains exact map, seed, generator, run counters and campaign completions');
