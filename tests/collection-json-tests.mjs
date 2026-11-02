// Testes e verificações de componentes compartilhados do Intuição.
import assert from 'node:assert/strict';
import { Worker as NodeWorker } from 'node:worker_threads';
import {
  assertJSONData,
  parseLevelJSON,
  customIdentity,
  LEVEL_JSON_LIMITS,
} from '../dist/level-json-common.mjs';
import {
  COLLECTION_JSON_EXAMPLES,
  COLLECTION_JSON_HELP,
  normalizeCollectionLevel,
  verifyCollectionLevel,
  validateCollectionJSON,
} from '../dist/collection-json.mjs';
import { GEOMETRY_LEVELS } from '../dist/geometry-levels.mjs';
import { SYMBOL_LEVELS } from '../dist/symbol-levels.mjs';
import { DESVIO_MAPS, createDesvio } from '../dist/desvio.mjs';
import { applyDirectAction } from '../dist/direct-actions.mjs';
import { validateGeometry, solveGeometry, initialGeometryState } from '../dist/geometry-games.mjs';
import { validateSymbols } from '../dist/symbol-games.mjs';
import { prepareManualCheck } from '../dist/geometry-check.mjs';
const clone = structuredClone;
const imported = (game, patch = {}) =>
  validateCollectionJSON(
    JSON.stringify({ ...clone(COLLECTION_JSON_EXAMPLES[game]), ...patch }),
    game,
  );
for (const [game, example] of Object.entries(COLLECTION_JSON_EXAMPLES)) {
  const result = imported(game);
  assert.equal(result.level.game, game);
  assert.match(result.level.id, /^custom-[a-z]+-[a-f0-9]{16}-[a-z0-9]+$/);
  assert.ok(COLLECTION_JSON_HELP[game]);
  assert.deepEqual(
    normalizeCollectionLevel(result.level, game),
    result.level,
    'normalization is idempotent',
  );
  if (game === 'desvio') {
    assert.equal(result.solution, null);
    assert.equal(createDesvio(result.level).winner, null);
  } else {
    const initial =
      game === 'pacto'
        ? result.level.clues
        : game === 'prumo'
          ? applyDirectAction('prumo', result.level, initialGeometryState(result.level), {
              type: 'initialize',
            })
          : initialGeometryState(result.level);
    assert.equal(
      (game === 'pacto'
        ? validateSymbols(result.level, initial)
        : validateGeometry(result.level, initial)
      ).complete,
      false,
      'example must begin unfinished',
    );
    const check =
      game === 'pacto'
        ? validateSymbols(result.level, result.solution)
        : validateGeometry(result.level, result.solution);
    assert.ok(check.complete && check.valid);
  }
  const dirty = imported(game, {
    id: '../../constructor<script>',
    solution: [99],
    endless: true,
    tutorial: true,
    validation: { solutionCount: 1 },
    code: 'globalThis.executed = true',
    name: 'Meu <nome>',
  });
  assert.equal(dirty.level.id, result.level.id);
  assert.equal(dirty.level.name, 'Meu <nome>');
  for (const field of ['solution', 'endless', 'tutorial', 'validation', 'code'])
    assert.ok(!Object.hasOwn(dirty.level, field));
  assert.deepEqual(dirty.solution, result.solution, 'external solution is never trusted');
}
assert.notEqual(
  imported('desvio').level.id,
  imported('desvio', { arrows: ['V', 'V', 'V', 'H'] }).level.id,
);
assert.equal(
  customIdentity('elo', { b: 2, a: 1 }),
  customIdentity('elo', { a: 1, b: 2, id: 'different' }),
);
assert.throws(() => imported('elo', { game: 'prumo' }), /jogo selecionado/);
assert.throws(() => parseLevelJSON('null', 'elo'), /objeto/);
assert.throws(() => parseLevelJSON('[]', 'elo'), /objeto/);
assert.throws(() => parseLevelJSON('{bad', 'elo'), /JSON inválido/);
assert.throws(() => parseLevelJSON('{"game":"elo","unused":1e999}', 'elo'), /finitos/);
for (const key of ['__proto__', 'constructor', 'prototype'])
  assert.throws(
    () => parseLevelJSON(`{"game":"elo","unused":{"${key}":{}}}`, 'elo'),
    /chave não permitida/,
  );
assert.throws(() => parseLevelJSON(' '.repeat(LEVEL_JSON_LIMITS.bytes + 1), 'elo'), /grande/);
assert.throws(
  () => parseLevelJSON('{"game":"elo","x":"' + 'é'.repeat(100001) + '"}', 'elo'),
  /grande/,
);
assert.throws(() => assertJSONData({ x: 'x'.repeat(4097) }), /longo/);
assert.throws(() => assertJSONData(Array(100).fill('x'.repeat(4000))), /200.000 bytes/);
assert.throws(() => assertJSONData(Array(4097).fill(0)), /array/);
assert.throws(
  () => assertJSONData(Array.from({ length: 3 }, () => Array(4000).fill(0))),
  /dados demais/,
);
let deep = 0;
for (let i = 0; i < 18; i++) deep = { deep };
assert.throws(() => assertJSONData(deep), /aninhado/);
const cycle = {};
cycle.self = cycle;
assert.throws(() => assertJSONData(cycle), /circulares/);
let getterCalled = false;
const getter = {};
Object.defineProperty(getter, 'x', {
  enumerable: true,
  get() {
    getterCalled = true;
    return 1;
  },
});
assert.throws(() => assertJSONData(getter), /propriedades/);
assert.equal(getterCalled, false);
assert.throws(() => assertJSONData({ x: () => 1 }), /funções/);
assert.throws(() => assertJSONData(new Date()), /simples/);
assert.throws(() => assertJSONData(Array(2)), /ausentes/);
assert.ok(parseLevelJSON('\uFEFF{"game":"elo"}', 'elo'));
console.log(
  'PASS data-only JSON, byte/depth/node/string/array limits, forbidden keys, no getters or code, canonical content identity',
);
const badElo = [
  { regions: [0, 1, 2, 15] },
  { regions: [0, 1, 1, 0] },
  { regions: [0, 1, null, 3] },
  { fixed: [] },
  { fixed: { '01': 1 } },
  { fixed: { 0: 3 } },
  { constraints: [] },
  { constraints: { unknown: [] } },
  { constraints: { shapes: { 0: 'curve' } } },
  { constraints: { passages: [4] } },
  { constraints: { passages: [0, 0] } },
  { constraints: { forbiddenEdges: [[1, 2]] } },
  { constraints: { rowCounts: { 2: 1 } } },
  { constraints: { distances: { 0: 1 } } },
  { constraints: { neighbors: [[0, 0]] } },
  { constraints: { order: [0, 1] } },
  { constraints: { cuts: [{ axis: 'diagonal', index: 0, count: 2 }] } },
  { constraints: { cuts: [{ axis: 'row', index: 0, count: 1 }] } },
  { constraints: { exclusivePassages: [{ id: 'x', cells: [0, 0] }] } },
];
for (const patch of badElo)
  assert.throws(() => imported('elo', patch), Error, JSON.stringify(patch));
for (const patch of [
  { supports: null },
  { supports: [null] },
  { supports: [{ x2: '1', y2: 0 }] },
  { supports: [{ x2: 3, y2: 0 }] },
  { rows: 2, cols: 2, supports: [{ x2: 1, y2: 1 }] },
  {
    supports: [
      { x2: 0, y2: 0 },
      { x2: 1, y2: 0 },
    ],
  },
])
  assert.throws(() => imported('prumo', patch));
for (const patch of [
  { rows: 7 },
  { clues: [-1] },
  { clues: Array(64).fill(4) },
  { clues: Array(64).fill(1.5) },
])
  assert.throws(() => imported('pacto', patch));
for (const patch of [
  { rows: 5, cols: 4 },
  { arrows: 'HVVH' },
  { arrows: ['H', 'V', 'N', 'H'] },
  { initialAvailable: 16 },
  { initialAvailable: -1 },
  { initialRestriction: { axis: 'row', index: 2 } },
  { initialRestriction: { axis: 'x', index: 0 } },
])
  assert.throws(() => imported('desvio', patch));
const legacy = clone(COLLECTION_JSON_EXAMPLES.desvio);
delete legacy.game;
assert.equal(validateCollectionJSON(JSON.stringify(legacy), 'desvio').level.game, 'desvio');
assert.throws(
  () => validateCollectionJSON(JSON.stringify({ ...legacy, game: 'elo' }), 'desvio'),
  /jogo selecionado/,
);
assert.throws(() => parseLevelJSON(JSON.stringify(legacy), 'elo'), /game/);
for (const game of ['prumo', 'pacto'])
  for (const level of (game === 'prumo' ? GEOMETRY_LEVELS : SYMBOL_LEVELS)[game])
    assert.ok(normalizeCollectionLevel(level, game));
for (const map of DESVIO_MAPS) assert.ok(normalizeCollectionLevel(map, 'desvio'));
for (const level of GEOMETRY_LEVELS.elo.filter((level) => level.rows <= 7 && level.cols <= 7))
  assert.ok(normalizeCollectionLevel(level, 'elo'));
console.log(
  'PASS all per-game schemas, legacy DESVIO, 400 PRUMO/PACTO exports, all 16 DESVIO maps and every ELO campaign within import bounds',
);
const unsat = clone(COLLECTION_JSON_EXAMPLES.pacto);
unsat.clues[0] = 0;
assert.throws(() => verifyCollectionLevel(unsat), /Nenhuma solução/);
assert.throws(() => imported('pacto', { clues: Array(64).fill(-1) }), /mais de uma/);
assert.throws(
  () => verifyCollectionLevel(COLLECTION_JSON_EXAMPLES.elo, { maxNodes: 0 }),
  /não concluída/,
);
assert.throws(
  () => verifyCollectionLevel(COLLECTION_JSON_EXAMPLES.prumo, { maxNodes: 0 }),
  /não concluída/,
);
assert.throws(
  () => verifyCollectionLevel(COLLECTION_JSON_EXAMPLES.pacto, { maxNodes: 0 }),
  /não concluída/,
);
const oneBeforeCutoff = {
  game: 'elo',
  rows: 5,
  cols: 5,
  regions: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 2, 3, 3, 0, 2, 2, 3, 3, 3, 2, 2, 3, 3, 3],
  fixed: { 0: 2, 2: 20 },
};
const limited = solveGeometry(oneBeforeCutoff, undefined, 2, { maxNodes: 8 });
assert.equal(limited.count, 1);
assert.equal(limited.exhaustive, false);
assert.throws(() => verifyCollectionLevel(oneBeforeCutoff, { maxNodes: 8 }), /não concluída/);
const result = imported('pacto', { solution: Array(64).fill(0) }),
  wrong = result.level.clues.slice();
wrong[0] = 0;
assert.equal(prepareManualCheck(result.level, { values: wrong }, result.solution).kind, 'mismatch');
const state = result.level.clues.slice();
state[0] = result.solution[0];
assert.equal(prepareManualCheck(result.level, { values: state }, result.solution).kind, 'correct');
console.log(
  'PASS zero/multiple/inconclusive distinction, one-solution cutoff never certified, computed oracle preserves correct check behavior',
);
function fakeWorker() {
  return {
    terminated: false,
    postMessage(data) {
      this.data = data;
    },
    terminate() {
      this.terminated = true;
    },
  };
}
const before = new AbortController();
before.abort();
assert.throws(
  () =>
    validateCollectionJSON(JSON.stringify(COLLECTION_JSON_EXAMPLES.elo), 'elo', {
      signal: before.signal,
    }),
  { name: 'AbortError' },
);
const abort = new AbortController(),
  worker = fakeWorker();
const aborted = validateCollectionJSON(JSON.stringify(COLLECTION_JSON_EXAMPLES.elo), 'elo', {
  signal: abort.signal,
  makeWorker: () => worker,
});
abort.abort();
await assert.rejects(aborted, { name: 'AbortError' });
assert.equal(worker.terminated, true);
worker.onmessage({ data: { ok: true, result: {} } });
const timed = fakeWorker();
await assert.rejects(
  validateCollectionJSON(JSON.stringify(COLLECTION_JSON_EXAMPLES.elo), 'elo', {
    makeWorker: () => timed,
    deadline: 1,
  }),
  /não concluída/,
);
assert.equal(timed.terminated, true);
await assert.rejects(
  validateCollectionJSON(JSON.stringify(COLLECTION_JSON_EXAMPLES.elo), 'elo', {
    makeWorker() {
      throw Error('CSP');
    },
  }),
  /iniciar/,
);
const errorWorker = fakeWorker(),
  errorPromise = validateCollectionJSON(JSON.stringify(COLLECTION_JSON_EXAMPLES.elo), 'elo', {
    makeWorker: () => errorWorker,
  });
errorWorker.onerror();
await assert.rejects(errorPromise, /preservado/);
assert.ok(errorWorker.terminated);
const file = new URL('../dist/collection-json-worker.mjs', import.meta.url).href;
class BrowserWorker {
  constructor() {
    this.worker = new NodeWorker(
      `const {parentPort}=require('node:worker_threads');globalThis.self={postMessage:data=>parentPort.postMessage(data)};import(${JSON.stringify(file)}).then(()=>parentPort.on('message',data=>self.onmessage({data})));`,
      { eval: true },
    );
    this.worker.on('message', (data) => this.onmessage?.({ data }));
    this.worker.on('error', (error) => this.onerror?.(error));
  }
  postMessage(data) {
    this.worker.postMessage(data);
  }
  terminate() {
    this.worker.terminate();
  }
}
for (const [game, example] of Object.entries(COLLECTION_JSON_EXAMPLES)) {
  const solved = await validateCollectionJSON(JSON.stringify(example), game, {
    makeWorker: () => new BrowserWorker(),
  });
  assert.equal(solved.level.game, game);
}
const map = DESVIO_MAPS[0];
assert.throws(() => verifyCollectionLevel({ ...map, game: 'desvio' }), /não concluída/);
const fullDesvio = await validateCollectionJSON(JSON.stringify(map), 'desvio', {
  makeWorker: () => new BrowserWorker(),
});
assert.equal(fullDesvio.level.rows * fullDesvio.level.cols, 16);
console.log(
  'PASS real worker on four games and full DESVIO, hard deadline, cancellation, stale response, startup/error failure; bounded synchronous fallback',
);
