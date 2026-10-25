import assert from 'node:assert/strict';
import {host,store,$,flush} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {createAnswerProgress} from '../dist/answer-progress.mjs';
const app=initCollection({hideOriginal(){}}),answers=createAnswerProgress();
const saved=()=>JSON.parse(store.get('intuicao.collection.v1'));
const dialog=()=>$('restart-collection'),ok=()=>$('restart-collection-confirm'),cancel=()=>$('restart-collection-cancel');
let key,level;
function start(game,index=0,mode='training'){
 app.activate(game);
 if(game==='desvio'){$('c-duel-mode').dispatch('change',{target:{value:mode}});host.querySelector('[data-map="0"]').click();level=JSON.parse($('c-editor-json').value);key=`desvio:${level.id}:${mode}`;}
 else{host.querySelector(`[data-new-level="${index}"]`).click();level=(game==='pacto'?SYMBOL_LEVELS:GEOMETRY_LEVELS)[game][index];key=level.id;}
}
const session=()=>saved().sessions[key];
function edit(game){
 if(game==='desvio'){const c=$('c-board').querySelector('[data-cell="0"]');c.dispatch('keydown',{key:'Enter'});$('c-confirm').click();}
 else if(game==='pacto'){$('c-board').querySelector(`[data-cell="${level.clues.findIndex(v=>v<0)}"]`).dispatch('keydown',{key:'1'});}
 else if(game==='elo'){$('c-board').querySelector(`[data-cell="${level.regions.findIndex(r=>level.fixed?.[r]===undefined)}"]`).dispatch('keydown',{key:'Enter'});}
 else{host.querySelector('[data-value="0"]').click();$('c-board').querySelector(`[data-cell="${session().history.present.assignments.findIndex(v=>v<0)}"]`).dispatch('keydown',{key:'Enter'});}
}
for(const game of ['elo','prumo','pacto','desvio']){
 start(game);const initial=structuredClone(session().history.present);edit(game);const changed=structuredClone(session());assert.notDeepEqual(changed.history.present,initial,game);
 const button=$('c-direct-reset');button.focus();button.click();assert.equal(dialog().open,true);assert.equal(document.activeElement,cancel());assert.deepEqual(session(),changed);
 assert.equal($('restart-collection-title').textContent,game==='desvio'?'Reiniciar esta partida?':'Reiniciar este nível?');
 button.click();assert.equal(document.body.querySelectorAll('#restart-collection').length,1);
 cancel().dispatch('keydown',{key:'Tab',shiftKey:true});assert.equal(document.activeElement,ok());ok().dispatch('keydown',{key:'Tab'});assert.equal(document.activeElement,cancel());
 cancel().click();assert.equal(dialog().open,false);assert.equal(document.activeElement,button);assert.deepEqual(session(),changed);
 button.click();cancel().dispatch('keydown',{key:'Escape'});assert.equal(dialog().open,false);assert.equal(document.activeElement,button);assert.deepEqual(session(),changed);
 button.click();dialog().dispatch('cancel');assert.equal(dialog().open,false);assert.deepEqual(session(),changed);
 if(game!=='desvio'){answers.fail(game+':'+level.id);answers.fail(game+':'+level.id);answers.fail(game+':'+level.id);answers.assist(game+':'+level.id);$('c-confirm').click();$('c-answer').click();$('c-confirm').click();assert.ok(saved().completed.includes(level.id));}
 const answerRecords=store.get('intuicao.answers.v1'),before=saved(),otherSessions=Object.fromEntries(Object.entries(before.sessions).filter(([k])=>k!==key));
 button.click();const stale=ok();ok().click();stale.click();assert.equal(dialog().open,false);assert.deepEqual(session().history.present,initial);assert.deepEqual(session().history.past,[]);assert.deepEqual(session().history.future,[]);assert.equal(store.get('intuicao.answers.v1'),answerRecords);assert.deepEqual(saved().completed,before.completed);assert.deepEqual(Object.fromEntries(Object.entries(saved().sessions).filter(([k])=>k!==key)),otherSessions);assert.equal(document.activeElement,$('c-title'));assert.equal($('c-motion').dataset.outcome,undefined);assert.equal(saved().events.filter(e=>e.type==='restart').length,before.events.filter(e=>e.type==='restart').length+1);
 $('c-reset').click();$('c-back').click();assert.equal(dialog().open,false);stale.click();assert.equal($('c-board'),undefined);
 start(game);assert.deepEqual(session().history.present,initial);
 $('c-reset').click();app.hide();assert.equal(dialog().open,false);stale.click();
 console.log('PASS',game,'cancel/Escape/native cancel, focus/trap, duplicate, scoped reset, navigation, persisted counters/other sessions');
}
start('desvio',0,'competitive');edit('desvio');const competitive=session();$('c-reset').onclick();assert.equal(dialog().open,false);assert.deepEqual(session(),competitive);
start('desvio',0,'bot');edit('desvio');assert.equal(session().history.present.turn,1);$('c-reset').click();flush();assert.equal(session().history.present.turn,1,'Bot pauses during confirmation');cancel().click();flush();assert.equal(session().history.present.turn,2,'Bot resumes on cancel');
console.log('PASS competitive reset blocked, bot pauses and resumes');
assert.equal(document.body.querySelectorAll('#restart-collection').length,1);
assert.equal(dialog().listeners.get('keydown').length,1);assert.equal(dialog().listeners.get('cancel').length,1);
globalThis.confirm=()=>{throw Error('Restart must not call browser confirm');};$('c-reset').click();ok().click();
console.log('PASS no duplicated dialog/listeners and no browser confirmation');
for(const game of ['elo','prumo','pacto']){
 start(game,4);
 for(let tier=1;tier<=3;tier++){
  $('c-hint').click();assert.equal($('c-hint').textContent,'✦ Dicas');
  assert.equal(saved().events.filter(e=>e.type==='hint').at(-1).tier,tier,'Internal hint progression remains intact');
  $('c-advanced-toggle').click();assert.equal($('c-hint').textContent,'✦ Dicas');
  assert.ok(!$('c-hint').textContent.includes('/3'));
 }
 console.log('PASS',game,'Dicas label stable across tiers 1/2/3 and rerender, internal progression preserved');
}
