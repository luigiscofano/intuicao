import assert from 'node:assert/strict';
import {prepareManualCheck,finishGeometryCheck,createManualCheck,checkReferenceAvailable} from '../dist/geometry-check.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {GEOMETRY_ANSWERS} from '../dist/geometry-answers.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {validateGeometry,solveGeometry,initialGeometryState} from '../dist/geometry-games.mjs';
import {applyDirectAction,protectedPrumoCells} from '../dist/direct-actions.mjs';
import {host,store,$} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {generateCollectionEndless} from '../dist/endless-collection.mjs';
const altLevel={game:'prumo',rows:4,cols:4,supports:[{x2:0,y2:1},{x2:0,y2:5},{x2:4,y2:6},{x2:4,y2:3},{x2:4,y2:0}]};
const ref=[0,3,4,3,0,3,3,3,1,3,3,3,1,3,2,3],alt=[0,4,4,4,0,3,3,3,1,3,3,3,1,2,2,2];
assert.ok(validateGeometry(altLevel,alt).complete);assert.equal(prepareManualCheck(altLevel,{assignments:alt},ref).kind,'correct');
const partial=applyDirectAction('prumo',altLevel,initialGeometryState(altLevel),{type:'initialize'});partial.assignments[1]=alt[1];
assert.equal(prepareManualCheck(altLevel,partial,ref).kind,'pending');assert.equal(finishGeometryCheck(solveGeometry(altLevel,partial,1)).kind,'correct');
for(const game of ['elo','prumo'])for(const l of GEOMETRY_LEVELS[game]){
 const reference=GEOMETRY_ANSWERS[l.id],key=game==='elo'?'positions':'assignments';assert.ok(checkReferenceAvailable(l,reference));assert.equal(prepareManualCheck(l,{[key]:reference},reference).kind,'correct');
 const state=game==='elo'?initialGeometryState(l):applyDirectAction('prumo',l,initialGeometryState(l),{type:'initialize'});assert.equal(prepareManualCheck(l,state,reference).kind,'empty');
 const i=state[key].findIndex(v=>v<0);if(i>=0){state[key][i]=reference[i];assert.equal(prepareManualCheck(l,state,reference).kind,'correct');}
 assert.equal(prepareManualCheck(l,state,null).kind,'unavailable');
}
const pact=SYMBOL_LEVELS.pacto[0],other=pact.solution.map(v=>(v+1)%4);assert.equal(prepareManualCheck({...pact,clues:Array(64).fill(-1)},{values:other},pact.solution).kind,'correct');
assert.equal(finishGeometryCheck({count:0,exhaustive:false}).kind,'inconclusive');assert.equal(finishGeometryCheck({count:0,exhaustive:true}).kind,'error');assert.deepEqual(finishGeometryCheck({count:0,exhaustive:true}).cells,[]);
function fakeClock(){let now=0,id=0;const pending=new Map();return {Date:{now:()=>now},pending,setTimeout(fn,ms){pending.set(++id,{fn,at:now+ms});return id;},clearTimeout(i){pending.delete(i);},tick(ms){const end=now+ms;while(true){const e=[...pending].filter(([,v])=>v.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!e)break;now=e[1].at;pending.delete(e[0]);e[1].fn();}now=end;}};}
const clock=fakeClock(),workers=[];const factory=()=>{const w={postMessage(data){this.data=data;},terminate(){this.terminated=true;}};workers.push(w);return w;};const manual=createManualCheck(()=>{},clock,factory);
manual.check(altLevel,partial,ref);assert.equal(manual.get().kind,'pending');const stale=workers.at(-1);clock.tick(1199);assert.equal(manual.get().kind,'pending');clock.tick(1);assert.equal(stale.terminated,true);assert.equal(manual.get().kind,'inconclusive');stale.onmessage({data:{count:0,exhaustive:true}});assert.equal(manual.get().kind,'inconclusive');clock.tick(9999);assert.ok(manual.get());clock.tick(1);assert.equal(manual.get(),null);
manual.check(altLevel,partial,ref);const old=workers.at(-1);manual.check(altLevel,partial,ref);assert.ok(old.terminated);old.onmessage({data:{count:0,exhaustive:true}});assert.equal(manual.get().kind,'pending');workers.at(-1).onmessage({data:{count:1,exhaustive:false}});assert.equal(manual.get().kind,'correct');clock.tick(10000);assert.equal(manual.get(),null);
manual.check(altLevel,partial,ref);const abandoned=workers.at(-1);manual.reset();assert.ok(abandoned.terminated);abandoned.onmessage({data:{count:1}});assert.equal(manual.get(),null);
const noWorker=createManualCheck(()=>{},clock,()=>{throw Error('Unavailable');});noWorker.check(altLevel,partial,ref);assert.equal(noWorker.get().kind,'inconclusive');
console.log('PASS 400 campaign answers/partials, real PRUMO alternative, PACTO alternative, neutral empty/unavailable, exhaustive-only errors, Worker deadline/repeat/stale/reset/failure');
// UI checks never alter attempts, assistance, history, solved state or automatic advance.
const uiClock=fakeClock();globalThis.setTimeout=uiClock.setTimeout;globalThis.clearTimeout=uiClock.clearTimeout;const originalNow=Date.now;Date.now=uiClock.Date.now;globalThis.Worker=class{constructor(){this.w=factory();}postMessage(data){this.w.data=data;}terminate(){this.w.terminated=true;}};
const app=initCollection({hideOriginal(){}}),data=()=>JSON.parse(store.get('intuicao.collection.v1'));const cell=i=>$('c-board').querySelector(`[data-cell="${i}"]`);
function start(g){app.activate(g);host.querySelector('[data-new-level="0"]').click();$('c-reset').click();$('restart-collection-confirm').click();}
function place(g,l,answer){if(g==='elo'){const r=answer.findIndex((_,r)=>l.fixed?.[r]===undefined);cell(answer[r]).dispatch('keydown',{key:'Enter'});return answer[r];}const c=answer.findIndex((_,c)=>!protectedPrumoCells(l).has(c));host.querySelector(`[data-value="${answer[c]}"]`).click();cell(c).dispatch('keydown',{key:'Enter'});return c;}
const clear=()=>{assert.equal($('c-check-status').hidden,true);assert.equal($('c-check-ring').hidden,true);};
try{for(const g of ['elo','prumo']){
 start(g);const l=GEOMETRY_LEVELS[g][0],answer=GEOMETRY_ANSWERS[l.id];$('c-check').click();assert.match($('c-check-status').textContent,/Preencha/);assert.equal($('c-check-ring').hidden,true);const c=place(g,l,answer);const before=JSON.stringify(data()),attempts=store.get('intuicao.answers.v1');$('c-check').click();assert.match($('c-check-status').textContent,/Tudo certo/);assert.equal($('c-check-ring').parentElement,$('c-board'));assert.equal($('c-check-ring').hidden,false);assert.equal(JSON.stringify(data()),before);assert.equal(store.get('intuicao.answers.v1'),attempts);
 uiClock.tick(9999);$('c-check').click();uiClock.tick(9999);assert.equal($('c-check-status').hidden,false);uiClock.tick(1);clear();
 $('c-check').click();$('c-undo').click();clear();$('c-redo').click();clear();$('c-check').click();$('c-reset').click();$('restart-collection-confirm').click();clear();
 place(g,l,answer);$('c-check').click();$('c-level-next').click();uiClock.tick(10000);clear();
 // The custom importer computes its own reference; it never trusts supplied answers.
 const custom=JSON.parse($('c-editor-json').value);$('c-editor-json').value=JSON.stringify(custom);const manualWorker=globalThis.Worker;delete globalThis.Worker;$('c-editor-play').click();globalThis.Worker=manualWorker;assert.equal($('c-check').disabled,false,'verified custom has a computed reference');$('c-check').click();assert.match($('c-check-status').textContent,/Preencha/);
 app.activate(g);$('c-free').click();const run=data().endless[g],generated=generateCollectionEndless(g,run.seed,run.options);place(g,generated.level,generated.answer[g==='elo'?'positions':'assignments']);$('c-check').click();assert.match($('c-check-status').textContent,/Tudo certo/);assert.equal(data().endless[g].solved,0);assert.equal(data().endless[g].assisted,false);
 for(let i=0;i<3;i++)$('c-confirm').click();$('c-answer').click();$('c-confirm').click();const seed=data().endless[g].seed;$('c-check').click();uiClock.tick(10000);assert.notEqual(data().endless[g].seed,seed);clear();
 }
 start('pacto');const c=pact.clues.findIndex(v=>v<0);cell(c).dispatch('keydown',{key:String([0,2,1,3].indexOf((pact.solution[c]+1)%4)+1)});$('c-check').click();assert.match($('c-check-ring').className,/manual-check-error/);assert.equal($('c-check-ring').hidden,false);
 app.hide();uiClock.tick(10000);assert.ok(host.hidden);
 console.log('PASS ELO/PRUMO UI, reference-free maps, counters/history unchanged, exact-board outline, 10s/repeated/edit/reset/undo/navigation and Endless advance; PACTO red outline');
}finally{Date.now=originalNow;delete globalThis.Worker;}
// Exercise the actual module Worker entry point, not only a mocked response.
const {Worker:NodeWorker}=await import('node:worker_threads');
const actualWorker=new NodeWorker(new URL('./manual-check-worker-fixture.mjs',import.meta.url));
const actualResult=await new Promise((resolve,reject)=>{actualWorker.once('message',resolve);actualWorker.once('error',reject);actualWorker.postMessage({level:altLevel,state:partial});});
await actualWorker.terminate();assert.equal(actualResult.count,1);assert.equal(finishGeometryCheck(actualResult).kind,'correct');
const eloAlt={game:'elo',rows:4,cols:4,regions:[0,0,1,1,0,0,1,1,2,2,3,3,2,2,3,3],fixed:{}};
assert.ok(validateGeometry(eloAlt,[5,6,9,10]).complete);assert.equal(prepareManualCheck(eloAlt,{positions:[5,6,9,10]},[0,3,12,15]).kind,'correct');
assert.equal(prepareManualCheck(eloAlt,{positions:[5,-1,-1,-1]},[0,3,12,15]).kind,'pending');
const wrong=prepareManualCheck(eloAlt,{positions:[0,3,13,14]},[0,3,12,15]);assert.equal(wrong.kind,'error');assert.ok(wrong.cells.every(c=>[0,3,13,14].includes(c)));
console.log('PASS actual solver Worker accepts partial alternative; ELO full alternative and occupied-only error cells');
