import test from 'node:test';
import assert from 'node:assert/strict';
import {Worker as NodeWorker} from 'node:worker_threads';
import {createOrbitaService} from '../dist/orbita/service.mjs';
import {initialState,replay} from '../dist/orbita/engine.mjs';
import {certifyGenerated,certifyAnalysis} from '../dist/orbita/analysis.mjs';
import {exampleLevel,move} from './orbita-engine-fixtures.mjs';

const level = exampleLevel();
const generated = seed => ({level,seed,generatorVersion:'orbita-generator-3',signature:'fixture',source:'generated'});
function workers() {
  const instances = [];
  const factory = type => {
    const worker = {
      type,stopped:false,message:null,
      postMessage(message) {this.message = message;},
      terminate() {this.stopped = true;},
      reply(result,ok = true) {this.onmessage({data:{id:this.message.id,ok,result}});}
    };
    instances.push(worker);return worker;
  };
  return {instances,factory};
}

test('a stale worker response cannot replace the newer generation',async () => {
  const mock = workers(), service = createOrbitaService({workerFactory:mock.factory});
  const first = service.generate(11), cancelled = assert.rejects(first,{name:'AbortError'});
  const second = service.generate(12);
  assert.equal(mock.instances[0].stopped,true);
  mock.instances[0].reply(generated(11));mock.instances[1].reply(generated(12));
  assert.equal((await second).seed,12);
  await cancelled;service.destroy();
});

test('current-position advice and Endless prefetch use independent channels',async () => {
  const mock = workers(), service = createOrbitaService({workerFactory:mock.factory});
  const generation = service.generate(123), analysis = service.analyze(level,initialState(level));
  assert.deepEqual(mock.instances.map(item => item.type),['generate','analyze']);
  mock.instances[1].reply({status:'solved',solution:level.solution,optimal:false,source:'safe-history'});
  assert.deepEqual((await analysis).solution,level.solution);
  assert.equal(mock.instances[0].stopped,false);
  mock.instances[0].reply(generated(123));
  assert.equal((await generation).seed,123);service.destroy();
});

test('cancellation stops both channels and ignores late replies',async () => {
  const mock = workers(), service = createOrbitaService({workerFactory:mock.factory});
  const generation = service.generate(1), analysis = service.analyze(level,initialState(level));
  const cancelled = Promise.all([assert.rejects(generation,{name:'AbortError'}),assert.rejects(analysis,{name:'AbortError'})]);
  service.cancel();assert.ok(mock.instances.every(item => item.stopped));
  mock.instances[0].reply(generated(1));mock.instances[1].reply({status:'solved',solution:level.solution});
  await cancelled;service.destroy();
});

test('an invalid worker certificate is replaced with the certified reservoir',async () => {
  const mock = workers(), service = createOrbitaService({workerFactory:mock.factory});
  const request = service.generate(444,{difficulty:1});
  mock.instances[0].reply({...generated(444),level:{...level,solution:[]}});
  const result = await request;
  assert.equal(result.seed,444);assert.equal(result.source,'fallback');
  assert.equal(replay(result.level,result.level.solution).solved,true);
  assert.equal(certifyGenerated(result).validation.replay,true);service.destroy();
});

test('the requested numeric seed survives fallback and no silent seed substitution is accepted',async () => {
  const mock = workers(), service = createOrbitaService({workerFactory:mock.factory});
  const request = service.generate(123456789,{difficulty:0});
  assert.equal(typeof mock.instances[0].message.seed,'number');
  mock.instances[0].reply(generated(123456790));
  const result = await request;
  assert.equal(result.seed,123456789);assert.equal(result.source,'fallback');service.destroy();
});

test('without Workers the reservoir is deterministic, valid and avoids recent boards',async () => {
  const service = createOrbitaService({workerFactory() {throw new Error('Unavailable');}});
  const first = await service.generate(420,{difficulty:2});
  const same = await service.generate(420,{difficulty:2});
  assert.deepEqual(same,first);
  const different = await service.generate(420,{difficulty:2,recentSignatures:[first.signature]});
  assert.notEqual(different.signature,first.signature);
  assert.equal(replay(different.level,different.level.solution).solved,true);service.destroy();
});

test('worker timeout terminates background computation and returns a certified reserve',async () => {
  const mock = workers(), service = createOrbitaService({workerFactory:mock.factory,timeoutMs:50});
  const result = await service.generate(555,{difficulty:3});
  assert.equal(mock.instances[0].stopped,true);
  assert.equal(result.source,'fallback');assert.equal(replay(result.level,result.level.solution).solved,true);
  mock.instances[0].reply(generated(555));service.destroy();
});

test('advice from an old board is rejected and rebuilt from actual history',async () => {
  const mock = workers(), service = createOrbitaService({workerFactory:mock.factory});
  const history = [move('A',-1),move('B',-1),move('A')], state = replay(level,history).state;
  const request = service.analyze(level,state,{history});
  mock.instances[0].reply({status:'solved',solution:level.solution,optimal:true,source:'made-up'});
  const result = await request;
  assert.equal(result.status,'solved');assert.equal(result.optimal,false);
  assert.equal(replay(level,result.solution,{state}).solved,true);
  assert.equal(certifyAnalysis(level,state,result).proof.fromCurrentState,true);service.destroy();
});

test('unavailable search without a usable certificate remains inconclusive',async () => {
  const service = createOrbitaService({workerFactory() {throw new Error('Unavailable');}});
  const missing = structuredClone(level);delete missing.solution;
  const result = await service.analyze(missing,initialState(missing));
  assert.equal(result.status,'inconclusive');assert.equal(result.solution,null);service.destroy();
});

test('destroyed services refuse further work and invalid seeds are rejected',async () => {
  const service = createOrbitaService({workerFactory:workers().factory});
  await assert.rejects(service.generate('123'),/Seed/);
  service.destroy();
  await assert.rejects(service.generate(1),/encerrado/);
  await assert.rejects(service.analyze(level,initialState(level)),/encerrado/);
});

test('the production worker performs generation and current-board analysis in an isolated thread',async () => {
  const threads = [];
  const service = createOrbitaService({timeoutMs:14000,workerFactory() {
    const thread = new NodeWorker(new URL('./orbita-service-worker.mjs',import.meta.url),{type:'module'});
    threads.push(thread);
    const adapter = {postMessage:message => thread.postMessage(message),terminate:() => void thread.terminate()};
    thread.on('message',data => adapter.onmessage?.({data}));
    thread.on('error',error => adapter.onerror?.(error));
    return adapter;
  }});
  const generated = await service.generate(1729,{difficulty:2,maxAttempts:10});
  assert.equal(generated.seed,1729);
  assert.equal(replay(generated.level,generated.level.solution).solved,true);
  const history = [move('A',-1),move('B',-1)], state = replay(level,history).state;
  const result = await service.analyze(level,state,{history,maxStates:3000,timeoutMs:300});
  assert.equal(result.status,'solved');assert.equal(replay(level,result.solution,{state}).solved,true);
  assert.ok(threads.length >= 2);service.destroy();
});
