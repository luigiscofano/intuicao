import assert from 'node:assert/strict';
import {initialState, transition, replay, stateKey} from '../dist/sintonia/engine.mjs';
import {certifiedSuffix, analyzePosition, verifyGenerated} from '../dist/sintonia/analysis.mjs';
import {createSintoniaService} from '../dist/sintonia/service.mjs';

let passed = 0;
async function test(name, fn) {await fn(); passed++; console.log('PASS', name);}
const fixture = {id:'reference',version:1,rulesVersion:1,boards:[
  {id:'a',animal:'capivara',rows:2,cols:3,walkable:[0,1,4],start:0,goal:1},
  {id:'b',animal:'tuiuiu',rows:2,cols:3,walkable:[0,1,2,4],start:0,goal:4}
],solution:['right','right','left','down','right']};
const toggle = {id:'toggle',version:1,rulesVersion:1,boards:[
  {id:'a',animal:'capivara',rows:1,cols:3,walkable:[0,1,2],start:0,goal:2,switches:[{id:'switch',cell:1,group:'group'}]},
  {id:'b',animal:'tuiuiu',rows:1,cols:3,walkable:[0,1,2],start:0,goal:2,gates:[{id:'gate',from:0,to:1,condition:{type:'switch',id:'group',value:true}}]}
],solution:['right','right','right']};

await test('certificate suffix is replayed from the exact current state', () => {
  const state = transition(fixture, initialState(fixture), 'right').state;
  const result = certifiedSuffix(fixture, state);
  assert.equal(result.status, 'solved');
  assert.equal(result.optimal, false);
  assert.ok(replay(fixture, result.solution, {state}).won);
  assert.equal(stateKey(state), stateKey(transition(fixture, initialState(fixture), 'right').state));
});
await test('matching animal positions cannot hide a different gate state', () => {
  const state = transition(toggle, initialState(toggle), 'right').state;
  assert.ok(certifiedSuffix(toggle, state));
  state.switches.group = false;
  assert.equal(certifiedSuffix(toggle, state), null);
  assert.equal(analyzePosition(toggle, state, {allowSearch:false}).status, 'inconclusive');
  const result = analyzePosition(toggle, state);
  assert.equal(result.status, 'solved');
  assert.ok(replay(toggle, result.solution, {state}).won);
});
await test('an invalid witness cannot become a hint or generated level', () => {
  const bad = {...fixture, solution:['left']};
  assert.equal(certifiedSuffix(bad, initialState(bad)), null);
  assert.throws(() => verifyGenerated({level:bad,solution:bad.solution}));
  assert.throws(() => verifyGenerated({level:{boards:[]},solution:[]}));
  const good = verifyGenerated({level:fixture,signature:'test'});
  assert.ok(good.validation.replay);
  assert.notEqual(good.level, fixture);
  assert.deepEqual(good.solution, fixture.solution);
});
await test('invalid restored data stays inconclusive instead of impossible', () => {
  const result = analyzePosition(toggle, {...initialState(toggle),keys:['missing']});
  assert.equal(result.status, 'inconclusive');
  assert.equal(result.reason, 'invalid-state');
});
await test('a completed state has a verified empty continuation', () => {
  const state = replay(fixture, fixture.solution).state;
  const result = certifiedSuffix(fixture, state);
  assert.equal(result.status, 'solved');
  assert.deepEqual(result.solution, []);
});

function workerHarness() {
  const workers=[];
  const workerFactory=()=>{const worker={terminated:false,postMessage(message){this.message=message;},terminate(){this.terminated=true;}};workers.push(worker);return worker;};
  return {workers,workerFactory};
}
await test('superseding a task cancels the old worker and ignores late answers', async () => {
  const h=workerHarness(),service=createSintoniaService({workerFactory:h.workerFactory});
  const first=service.hint(fixture,initialState(fixture));
  const rejection=assert.rejects(first,{name:'AbortError'});
  const second=service.hint(fixture,initialState(fixture));
  await rejection;
  assert.equal(h.workers[0].terminated,true);
  h.workers[0].onmessage({data:{id:h.workers[0].message.id,ok:true,result:'obsolete'}});
  const latest=h.workers[1];
  latest.onmessage({data:{id:latest.message.id,ok:true,result:{status:'solved',solution:fixture.solution}}});
  assert.deepEqual((await second).solution,fixture.solution);
  service.destroy();
  assert.equal(latest.terminated,true);
  await assert.rejects(service.generate('next'),/encerrado/);
});
await test('without Worker, a known witness is replayed and no search blocks the page', async () => {
  const service=createSintoniaService({workerFactory:()=>{throw Error('no Worker');}});
  assert.equal((await service.hint(fixture,initialState(fixture))).status,'solved');
  const state=transition(toggle,initialState(toggle),'right').state;state.switches.group=false;
  const result=await service.hint(toggle,state);
  assert.equal(result.status,'inconclusive');assert.equal(result.reason,'worker-unavailable');
  service.destroy();
});
await test('a stalled worker is terminated and falls back to a verified answer', async () => {
  const h=workerHarness(),service=createSintoniaService({workerFactory:h.workerFactory,timeoutMs:50});
  const result=await service.hint(fixture,initialState(fixture));
  assert.equal(h.workers[0].terminated,true);
  assert.equal(result.status,'solved');
  assert.ok(replay(fixture,result.solution).won);
  service.destroy();
});
console.log(`${passed} SINTONIA service tests passed.`);
