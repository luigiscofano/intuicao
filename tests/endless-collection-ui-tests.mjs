import assert from 'node:assert/strict';
import {host,store,$,flush,timers} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {generateCollectionEndless,collectionOptionSpec} from '../dist/endless-collection.mjs';
import {createAnswerProgress} from '../dist/answer-progress.mjs';
import {legalDesvioMoves,applyDesvioMove,createDesvio} from '../dist/desvio.mjs';
const app=initCollection({hideOriginal(){}}),answers=createAnswerProgress();
const data=()=>JSON.parse(store.get('intuicao.collection.v1'));
const run=g=>data().endless[g],session=g=>data().sessions[`endless:${g}`];
const puzzleGames=['elo','prumo','pacto'];
function enter(g){app.activate(g);assert.ok(host.innerHTML.indexOf('id="c-free"')<host.innerHTML.indexOf(g==='desvio'?'class="duel-maps"':'class="level-group"'));assert.equal($('c-endless-apply'),undefined);$('c-free').click();assert.ok($('c-endless-apply'));}
function unlock(g){for(let i=0;i<3;i++)$('c-confirm').click();assert.equal($('c-answer').hidden,false);$('c-answer').click();}
function configure(g,overrides){for(const spec of collectionOptionSpec(g)){const node=host.querySelector(`[data-endless-option="${spec.key}"]`);const value=overrides[spec.key]??run(g).options[spec.key];if(spec.type==='checkbox')node.checked=value;else node.value=String(value);}$('c-endless-apply').click();}
for(const g of puzzleGames){
 enter(g);const first=structuredClone(run(g)),initial=structuredClone(session(g).history.present);assert.equal(first.number,1);assert.equal(first.solved,0);
 $('c-back').click();$('c-free').click();assert.deepEqual(run(g),first,'resume seed/options/counter');assert.deepEqual(session(g).history.present,initial);
 unlock(g);const answer=generateCollectionEndless(g,first.seed,first.options).answer;const key=g==='elo'?'positions':g==='prumo'?'assignments':'values';assert.deepEqual(session(g).history.present[key],answer[key]);
 $('c-confirm').click();const stale=[...timers.values()];assert.equal(run(g).solved,1);$('c-confirm').click();assert.equal(run(g).solved,1,'double confirm single victory');flush();assert.notEqual(run(g).seed,first.seed);assert.equal(run(g).number,2);assert.equal(run(g).solved,1);assert.deepEqual(data().completed,[],'Endless never completes campaign');
 const second=structuredClone(run(g));$('c-reset').click();$('restart-collection-confirm').click();assert.deepEqual(run(g),second,'reset seed/counter/options');assert.equal(session(g).assistance,false,'old answer assistance does not leak');
 const beforeConfig=structuredClone(run(g));const spec=collectionOptionSpec(g).find(x=>x.type==='select');const option=spec.values.find(v=>String(v)!==String(beforeConfig.options[spec.key]));host.querySelector(`[data-endless-option="${spec.key}"]`).value=String(option);assert.deepEqual(run(g),beforeConfig,'editing selector is staged');configure(g,{[spec.key]:option});assert.notEqual(run(g).seed,beforeConfig.seed);assert.equal(run(g).solved,1);
 unlock(g);$('c-confirm').click();const captured=[...timers.values()];$('c-back').click();host.querySelector('[data-new-level="0"]').click();const campaign=JSON.parse($('c-editor-json').value).id;for(const cb of captured)cb();assert.equal(JSON.parse($('c-editor-json').value).id,campaign,'obsolete callbacks cannot replace campaign');assert.equal($('c-endless-apply'),undefined);
 console.log('PASS',g,'entry, resume, answer, guarded automatic advance, reset, staged config, isolated campaign');
}
enter('desvio');let state=session('desvio').history.present;let board=JSON.parse($('c-editor-json').value);let moves=0;
while(state.winner===null&&moves++<20){const cell=legalDesvioMoves(board,state)[0];$('c-board').querySelector(`[data-cell="${cell}"]`).dispatch('keydown',{key:'Enter'});$('c-confirm').click();state=session('desvio').history.present;}
assert.notEqual(state.winner,null);const seed=run('desvio').seed;assert.equal(run('desvio').solved,1);flush();assert.notEqual(run('desvio').seed,seed);assert.equal(session('desvio').history.present.turn,0);
console.log('PASS DESVIO victory creates next generated map');
enter('elo');unlock('elo');$('c-confirm').click();const pending=structuredClone(run('elo'));app.hide();const restored=initCollection({hideOriginal(){}});restored.activate('elo');$('c-free').click();assert.equal(run('elo').solved,pending.solved);flush();assert.notEqual(run('elo').seed,pending.seed);assert.equal(run('elo').solved,pending.solved,'reload completed result never counts twice');
console.log('PASS pending victory resume and duplicate-count guard');
// A victory remains counted, but resetting/editing cancels automatic advancement.
enter('prumo');unlock('prumo');$('c-confirm').click();const won=structuredClone(run('prumo'));$('c-reset').click();$('restart-collection-confirm').click();$('c-back').click();$('c-free').click();flush();assert.equal(run('prumo').seed,won.seed,'reset won board must not resume pending advancement');assert.equal(run('prumo').solved,won.solved);
console.log('PASS reset after victory stays on the same puzzle after reopening');
// Pause/reset dialogs cannot accumulate confirmations or auto-advance underneath.
enter('pacto');unlock('pacto');$('c-confirm').click();const modalSeed=run('pacto').seed;$('c-reset').click();flush();assert.equal(run('pacto').seed,modalSeed);$('restart-collection-cancel').click();assert.equal(run('pacto').seed,modalSeed);
// Configure bot within Endless and repeatedly choose a legal move; verify loss
// never starts a new map and callback leases cannot cross a regenerated level.
enter('desvio');$('c-endless-duel-mode').value='bot';$('c-endless-bot-difficulty').value='perfect';configure('desvio',{size:'3x3'});assert.equal(session('desvio').duelMode,'bot');
let foundLoss=false;
for(let trial=0;trial<12&&!foundLoss;trial++){
 const r=run('desvio'),seed=r.seed,solved=r.solved;let s=session('desvio').history.present,turn=0;
 while(s.winner===null&&turn++<12){const b=JSON.parse($('c-editor-json').value);if(s.player===0){const c=legalDesvioMoves(b,s)[0];$('c-board').querySelector(`[data-cell="${c}"]`).dispatch('keydown',{key:'Enter'});$('c-confirm').click();}s=session('desvio').history.present;if(s.winner===null){flush();s=session('desvio').history.present;}}
 if(s.winner===1){foundLoss=true;flush();assert.equal(run('desvio').seed,seed);assert.equal(run('desvio').solved,solved);assert.equal(session('desvio').history.present.winner,1);}else{flush();$('c-endless-new').click();}
}
assert.equal(foundLoss,true,'test exercises a bot victory');
console.log('PASS bot mode controls and loss preserves current map');
assert.ok(Object.keys(data().sessions).filter(k=>k.startsWith('endless:')).length<=4);assert.ok(!Object.keys(JSON.parse(store.get('intuicao.answers.v1')??'{}')).some(k=>k.includes(':endless:')),'Endless answer progress is bounded per current run');
console.log('PASS bounded per-game session and answer-progress storage');
enter('elo');unlock('elo');$('c-confirm').click();const editedWin=structuredClone(run('elo'));const eloLevel=JSON.parse($('c-editor-json').value),eloState=session('elo').history.present;const movable=eloState.positions.find((cell,r)=>eloLevel.fixed?.[r]===undefined);$('c-board').querySelector(`[data-cell="${movable}"]`).dispatch('keydown',{key:'Enter'});$('c-back').click();$('c-free').click();flush();assert.equal(run('elo').seed,editedWin.seed);assert.equal(run('elo').solved,editedWin.solved);
console.log('PASS editing a won puzzle cancels advancement after reopening');
const {analyzeDesvio}=await import('../dist/desvio.mjs');
let winningSeed=1;for(;winningSeed<100;winningSeed++){const b=generateCollectionEndless('desvio',winningSeed,{size:'3x3'}).level;if(analyzeDesvio(b,createDesvio(b,0)).winning)break;}
const prepared=data();prepared.endless.desvio={seed:winningSeed,options:{size:'3x3'},number:1,solved:0,failures:0,assisted:false,duelMode:'bot',botDifficulty:'perfect'};delete prepared.sessions['endless:desvio'];store.set('intuicao.collection.v1',JSON.stringify(prepared));const botApp=initCollection({hideOriginal(){}});botApp.activate('desvio');$('c-free').click();
let botState=session('desvio').history.present;
while(botState.winner===null){const board=JSON.parse($('c-editor-json').value);if(botState.player===0){const cell=analyzeDesvio(board,botState).winningMoves[0];$('c-board').querySelector(`[data-cell="${cell}"]`).dispatch('keydown',{key:'Enter'});$('c-confirm').click();}botState=session('desvio').history.present;if(botState.winner===null){flush();botState=session('desvio').history.present;}}
assert.equal(botState.winner,0);assert.equal(run('desvio').solved,1);flush();assert.notEqual(run('desvio').seed,winningSeed);
console.log('PASS human victory against exact bot advances generated map');
// Start a human turn, capture its scheduled response, then regenerate settings.
if(session('desvio').history.present.player===1)flush();botState=session('desvio').history.present;const b=JSON.parse($('c-editor-json').value),cell=legalDesvioMoves(b,botState)[0];$('c-board').querySelector(`[data-cell="${cell}"]`).dispatch('keydown',{key:'Enter'});$('c-confirm').click();const oldBotCallbacks=[...timers.values()];$('c-endless-duel-mode').value='local';$('c-endless-bot-difficulty').value='perfect';configure('desvio',{size:'3x4'});const newMap=structuredClone(session('desvio').history.present);for(const callback of oldBotCallbacks)callback();assert.deepEqual(session('desvio').history.present,newMap);
console.log('PASS changing config invalidates captured stale bot callbacks');
