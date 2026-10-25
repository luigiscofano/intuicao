/** Actual collection handlers in a deterministic DOM. Native file picker/layout
 * and keyboard activation remain a separate published-browser QA step. */
import assert from 'node:assert/strict';
import {host,store,$} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {COLLECTION_JSON_EXAMPLES,normalizeCollectionLevel,verifyCollectionLevel} from '../dist/collection-json.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {DESVIO_MAPS,legalDesvioMoves} from '../dist/desvio.mjs';
import {validateGeometry} from '../dist/geometry-games.mjs';
import {validateSymbols} from '../dist/symbol-games.mjs';
const app=initCollection({hideOriginal(){}}),read=()=>JSON.parse(store.get('intuicao.collection.v1'));
const snapshot=()=>JSON.stringify([...store]);
const cell=i=>$('c-board').querySelector(`[data-cell="${i}"]`);
const phase=()=>JSON.parse($('c-editor-json').value);
function campaign(game){app.activate(game);host.querySelector(`[${game==='desvio'?'data-map':'data-new-level'}="0"]`).click();return game==='desvio'?`desvio:${DESVIO_MAPS[0].id}:local`:game==='pacto'?SYMBOL_LEVELS.pacto[0].id:GEOMETRY_LEVELS[game][0].id;}
function edit(game,key){const l=phase(),s=read().sessions[key].history.present;if(game==='elo')cell(l.regions.findIndex(r=>l.fixed?.[r]===undefined)).dispatch('keydown',{key:'Enter'});else if(game==='prumo'){host.querySelector('[data-value="0"]').click();cell(s.assignments.findIndex(v=>v<0)).dispatch('keydown',{key:'Enter'});}else if(game==='pacto')cell(l.clues.findIndex(v=>v<0)).dispatch('keydown',{key:'1'});else{cell(legalDesvioMoves(l,s)[0]).dispatch('keydown',{key:'Enter'});$('c-confirm').click();}}
async function file(text,size){const input=$('c-import');await input.onchange({target:{files:[{size:size??new TextEncoder().encode(text).byteLength,text:async()=>text}],value:'selected.json'}});}
let imports=0;
for(const game of ['elo','prumo','pacto','desvio']){
 app.activate(game);
 assert.equal($('c-continue'),undefined);assert.equal($('c-tutorial'),undefined);
 const last=host.querySelectorAll(game==='desvio'?'[data-map]':'[data-new-level]').at(-1),panel=host.querySelector('.level-json-import');
 assert.ok(host.nodes.indexOf(panel)>host.nodes.indexOf(last),game+' importer follows every level/map');
 assert.equal(host.querySelectorAll('#c-import').length,1);
 assert.ok(host.innerHTML.includes(`${game.toUpperCase()} ·</h2>`));
 assert.ok($('c-import-example'));assert.ok($('c-import-json'));assert.match(host.innerHTML,/Formato e exemplo/);
 const key=campaign(game);edit(game,key);const original=structuredClone(read().sessions[key].history.present);
 const toolbar=$('c-rules-panel').parentElement,children=toolbar.nodes.filter(n=>n.parentElement===toolbar);
 assert.deepEqual(children.map(n=>n.id),['c-undo','c-redo','c-reset','c-rules-panel','c-advanced-toggle']);assert.ok(toolbar.parentElement.matches('.stage-top'));
 assert.equal(host.querySelectorAll('#c-reset').length,1);assert.equal($('c-direct-reset'),undefined);
 $('c-mode-endless').focus();assert.equal(document.activeElement,$('c-mode-endless'));$('c-mode-endless').click();
 assert.ok($('c-endless-new'));assert.deepEqual(read().sessions[key].history.present,original,game+' direct Endless preserves prior board');
 const run=structuredClone(read().endless[game]);$('c-mode-endless').click();assert.deepEqual(read().endless[game],run,'active Endless button is idempotent');
 $('c-mode-challenge').click();host.querySelector(`[${game==='desvio'?'data-map':'data-new-level'}="0"]`).click();assert.deepEqual(read().sessions[key].history.present,original);
 $('c-mode-endless').click();assert.equal(read().endless[game].seed,run.seed);assert.deepEqual(read().endless[game].options,run.options);$('c-back').click();
 for(const bad of ['{bad',JSON.stringify({game:'wrong'}),JSON.stringify({...COLLECTION_JSON_EXAMPLES[game],bad:1e300})+' trailing']){const before=snapshot();await file(bad);assert.equal(snapshot(),before,'invalid import never writes progress');assert.ok($('c-import-status').textContent);assert.equal($('c-board'),undefined);}
 const beforeBig=snapshot();await file('{}',200001);assert.equal(snapshot(),beforeBig);assert.match($('c-import-status').textContent,/200 KB/);
 const payload={...structuredClone(COLLECTION_JSON_EXAMPLES[game]),id:key,solution:Array(64).fill(0),endless:true,tutorial:true};
 const before=read(),canonical=normalizeCollectionLevel(payload,game);await file(JSON.stringify(payload));imports++;
 assert.equal(phase().id,canonical.id);assert.equal(phase().game,game);assert.equal(phase().endless,undefined);assert.equal(phase().tutorial,undefined);assert.equal(phase().solution,undefined);
 assert.equal($('c-endless-new'),undefined,'import is never Endless');assert.deepEqual(read().completed,before.completed);assert.deepEqual(read().sessions[key],before.sessions[key]);
 const customKey=game==='desvio'?`custom:desvio:${canonical.id}:local`:`custom:${game}:${canonical.id}`;
 assert.ok(read().sessions[customKey]);assert.notEqual(customKey,key);
 if(game!=='desvio'){
  assert.equal($('c-check').disabled,false,'verified custom reference is available');
  for(let n=0;n<3;n++)$('c-confirm').click();assert.equal($('c-answer').hidden,false);$('c-answer').click();
  const s=read().sessions[customKey].history.present,check=game==='pacto'?validateSymbols(canonical,s.values):validateGeometry(canonical,s);
  assert.ok(check.complete&&check.valid);assert.notEqual($('c-motion').dataset.outcome,'win','answer does not auto-confirm');
  $('c-confirm').click();assert.equal($('c-motion').dataset.outcome,'win');assert.deepEqual(read().completed,before.completed,'custom win never marks campaign complete');
 }
 const savedCustom=structuredClone(read().sessions[customKey].history.present);$('c-mode-endless').click();assert.equal(read().endless[game].seed,run.seed);assert.deepEqual(read().endless[game].options,run.options);$('c-back').click();await file(JSON.stringify(payload));assert.deepEqual(read().sessions[customKey].history.present,savedCustom,'reimport same rules resumes only its custom state');
 $('c-reset').click();$('restart-collection-cancel').click();assert.deepEqual(read().sessions[customKey].history.present,savedCustom);$('c-back').click();
}
// Reading an old file must not redirect a newer game selection.
app.activate('elo');let deliver;const oldInput=$('c-import'),pending=oldInput.onchange({target:{files:[{size:100,text:()=>new Promise(resolve=>deliver=resolve)}],value:'pending.json'}});app.activate('pacto');const afterNavigation=snapshot();deliver(JSON.stringify(COLLECTION_JSON_EXAMPLES.elo));await pending;assert.equal(snapshot(),afterNavigation);assert.equal($('c-board'),undefined);assert.match(host.innerHTML,/Formato e exemplo de PACTO/);
// Abort a verification worker on navigation, then deliver its stale result.
const workers=[];globalThis.Worker=class{postMessage(data){this.data=data;workers.push(this);}terminate(){this.terminated=true;}};
app.activate('elo');$('c-import-json').value=JSON.stringify(COLLECTION_JSON_EXAMPLES.elo);const pendingWorker=$('c-import-paste').onclick();assert.equal(workers.length,1);app.activate('prumo');const stale=workers[0];assert.equal(stale.terminated,true);const stable=snapshot();stale.onmessage({data:{ok:true,result:verifyCollectionLevel(stale.data.level)}});await pendingWorker;assert.equal(snapshot(),stable);assert.equal($('c-board'),undefined);delete globalThis.Worker;
// Editor errors are atomic even with a live campaign board.
const key=campaign('pacto'),board=$('c-board').innerHTML,before=snapshot();$('c-editor-json').value='{"game":"pacto","rows":8,"cols":8,"clues":[]}';$('c-editor-play').click();assert.equal($('c-board').innerHTML,board);assert.equal(snapshot(),before);assert.ok($('c-editor-result').textContent);assert.ok(read().sessions[key]);
// Display metadata must not create a new assistance/failure identity.
app.activate('pacto');const renamed={...COLLECTION_JSON_EXAMPLES.pacto,name:'Nome A',clues:COLLECTION_JSON_EXAMPLES.pacto.clues.map(v=>v<0?v:(v+1)%4)};await file(JSON.stringify(renamed));const renamedId=phase().id;for(let i=0;i<3;i++)$('c-confirm').click();assert.equal($('c-answer').hidden,false);$('c-back').click();await file(JSON.stringify({...renamed,name:'Nome B'}));assert.equal(phase().id,renamedId);assert.equal($('c-answer').hidden,false,'renaming does not reset three-error unlock');
// A custom edited from a daily puzzle is still custom, not a daily challenge.
app.activate('prumo');$('c-daily').click();$('c-editor-json').value=JSON.stringify(COLLECTION_JSON_EXAMPLES.prumo);$('c-editor-play').click();assert.match(host.innerHTML,/EDITOR · FASE PERSONALIZADA/);assert.doesNotMatch(host.innerHTML,/DESAFIO DO DIA/);
// Both paste and editor inputs cancel stale verifications and clear busy text.
globalThis.Worker=class{postMessage(data){this.data=data;workers.push(this);}terminate(){this.terminated=true;}};
app.activate('elo');const paste=$('c-import-json');paste.value=JSON.stringify(COLLECTION_JSON_EXAMPLES.elo);const oldPaste=$('c-import-paste').onclick(),pasteWorker=workers.at(-1);paste.value=JSON.stringify({...COLLECTION_JSON_EXAMPLES.elo,fixed:{0:0}});paste.dispatch('input');assert.equal(pasteWorker.terminated,true);pasteWorker.onmessage({data:{ok:true,result:verifyCollectionLevel(pasteWorker.data.level)}});await oldPaste;assert.equal($('c-board'),undefined);assert.match($('c-import-status').textContent,/alterado/);assert.match(paste.value,/fixed/);
delete globalThis.Worker;campaign('elo');globalThis.Worker=class{postMessage(data){this.data=data;workers.push(this);}terminate(){this.terminated=true;}};const editor=$('c-editor-json'),priorBoard=$('c-board').innerHTML;editor.value=JSON.stringify(COLLECTION_JSON_EXAMPLES.elo);$('c-editor-play').click();const editorWorker=workers.at(-1);editor.value=JSON.stringify({...COLLECTION_JSON_EXAMPLES.elo,fixed:{0:0}});editor.dispatch('input');assert.equal(editorWorker.terminated,true);editorWorker.onmessage({data:{ok:true,result:verifyCollectionLevel(editorWorker.data.level)}});await Promise.resolve();assert.equal($('c-board').innerHTML,priorBoard);assert.match($('c-editor-result').textContent,/alterado/);delete globalThis.Worker;
console.log(JSON.stringify({passed:true,collectionGames:4,imports,directEndless:true,campaignAndCustomPreserved:true,computedAnswers:true,atomicErrors:true,staleReadAndWorkerIgnored:true,toolbarOrderAndSingleReset:true}));
