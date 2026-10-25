import test from 'node:test';
import assert from 'node:assert/strict';
import {createRepasseService} from '../dist/repasse/service.mjs';
import {certifyGenerated, certifyAnalysis} from '../dist/repasse/certification.mjs';
import {initialState, replay} from '../dist/repasse/engine.mjs';

const level = {
  id: 'service-fixture', version: 1, rulesVersion: 1, rows: 1, cols: 1,
  pieces: [{id: 'a', row: 0, col: 0, value: 2, directions: ['left','right']}],
  targets: {top: [0], bottom: [0], left: [2], right: [2]}, solution: ['a']
};
const generated = (seed = 'seed') => ({level, seed, generatorVersion: 1, signature: 'fixture', family: 'receive', source: 'generated'});
function workers() {
  const instances = [];
  const factory = type => {
    const worker = {
      type, stopped: false, message: null,
      postMessage(message) { this.message = message; },
      terminate() { this.stopped = true; },
      reply(result, ok = true) { this.onmessage({data: {id: this.message.id, ok, result}}); }
    };
    instances.push(worker); return worker;
  };
  return {instances, factory};
}

test('a resposta antiga nunca substitui o novo desafio e seu worker é encerrado', async () => {
  const mock = workers(), service = createRepasseService({workerFactory: mock.factory});
  const first = service.generate('old');
  const cancelled = assert.rejects(first, {name: 'AbortError'});
  const second = service.generate('new');
  assert.equal(mock.instances[0].stopped, true);
  mock.instances[0].reply(generated('old'));
  mock.instances[1].reply(generated('new'));
  assert.equal((await second).seed, 'new');
  assert.equal(mock.instances[1].stopped, true);
  await cancelled; service.destroy();
});

test('dica e geração usam canais independentes', async () => {
  const mock = workers(), service = createRepasseService({workerFactory: mock.factory});
  const generation = service.generate('next');
  const analysis = service.analyze(level, initialState(level));
  assert.deepEqual(mock.instances.map(w => w.type), ['generate', 'analyze']);
  assert.ok(mock.instances.every(w => !w.stopped));
  mock.instances[1].reply({status: 'solved', solution: ['a'], visited: 1});
  assert.deepEqual((await analysis).solution, ['a']);
  assert.equal(mock.instances[0].stopped, false);
  mock.instances[0].reply(generated('next'));
  assert.equal((await generation).seed, 'next'); service.destroy();
});

test('a seed numérica chega ao gerador sem virar uma string diferente', async () => {
  const mock = workers(), service = createRepasseService({workerFactory: mock.factory});
  const request = service.generate(123456789, {difficulty: 2});
  assert.equal(mock.instances[0].message.seed, 123456789);
  assert.equal(typeof mock.instances[0].message.seed, 'number');
  mock.instances[0].reply(generated(123456789));
  assert.equal((await request).seed, 123456789);
  service.destroy();
});

test('trocar de modo cancela análise e prefetch, inclusive callbacks tardios', async () => {
  const mock = workers(), service = createRepasseService({workerFactory: mock.factory});
  const generation = service.generate('next'), analysis = service.analyze(level, initialState(level));
  const cancelled = Promise.all([assert.rejects(generation, {name: 'AbortError'}), assert.rejects(analysis, {name: 'AbortError'})]);
  service.cancel();
  assert.ok(mock.instances.every(w => w.stopped));
  mock.instances[0].reply(generated());
  mock.instances[1].reply({status: 'solved', solution: ['a'], visited: 1});
  await cancelled; service.destroy();
});

test('resposta de geração sem prova válida é substituída por reserva certificada', async () => {
  const mock = workers(), service = createRepasseService({workerFactory: mock.factory});
  const request = service.generate('invalid-worker', {difficulty: 0, allowedConfigurations: ['original']});
  mock.instances[0].reply({...generated(), level: {...level, solution: []}});
  const result = await request;
  assert.equal(replay(result.level, result.level.solution).solved, true);
  assert.notEqual(result.level.id, level.id);
  assert.equal(mock.instances[0].stopped, true); service.destroy();
});

test('sem Worker há reserva válida e a introdução continua curta e conhecida', async () => {
  const service = createRepasseService({workerFactory() { throw new Error('Worker indisponível'); }});
  for (const introduction of ['single','corner','four']) {
    const options = {difficulty: 3, allowedConfigurations: ['original', introduction], introduction};
    const result = await service.generate('reserve-'+introduction, options);
    assert.equal(certifyGenerated(result, options), result);
    assert.ok(result.level.pieces.length <= 5);
  }
  service.destroy();
});

test('tempo esgotado encerra o worker e usa reserva sem aceitar resposta posterior', async () => {
  const mock = workers(), service = createRepasseService({workerFactory: mock.factory, timeoutMs: 50});
  const result = await service.generate('slow', {difficulty: 2});
  assert.equal(replay(result.level, result.level.solution).solved, true);
  assert.equal(mock.instances[0].stopped, true);
  mock.instances[0].reply(generated('late'));
  service.destroy();
});

test('dica recebida é reproduzida no estado presente antes de ser aceita', async () => {
  const mock = workers(), service = createRepasseService({workerFactory: mock.factory});
  const request = service.analyze(level, initialState(level));
  mock.instances[0].reply({status: 'solved', solution: [], visited: 1});
  const result = await request;
  assert.equal(result.status, 'solved');
  assert.deepEqual(result.solution, ['a']);
  assert.equal(certifyAnalysis(level, initialState(level), result), result);
  service.destroy();
});

test('análise sem worker e sem certificado não inventa impossibilidade', async () => {
  const service = createRepasseService({workerFactory() { throw new Error('Worker indisponível'); }});
  const withoutCertificate = {...level}; delete withoutCertificate.solution;
  const result = await service.analyze(withoutCertificate, initialState(withoutCertificate));
  assert.equal(result.status, 'inconclusive');
  assert.equal(result.solution, null); service.destroy();
});

test('serviço destruído recusa novos trabalhos', async () => {
  const service = createRepasseService({workerFactory: workers().factory}); service.destroy();
  await assert.rejects(service.generate('x'), /encerrado/);
  await assert.rejects(service.analyze(level, initialState(level)), /encerrado/);
});
