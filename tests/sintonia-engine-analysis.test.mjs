import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState, transition, replay, stateKey} from '../dist/sintonia/engine.mjs';
import {certifiedSuffix, analyzePosition, verifyGenerated} from '../dist/sintonia/analysis.mjs';

const make = (overrides = {}) => ({
  id: 'analysis-fixture', version: 1, rulesVersion: 1,
  boards: [
    {id: 'a', animal: 'capivara', rows: 2, cols: 2, walkable: [0, 1, 2, 3], start: 0, goal: 3, ...overrides},
    {id: 'b', animal: 'tuiuiu', rows: 2, cols: 2, walkable: [0, 1, 2, 3], start: 0, goal: 3}
  ], solution: ['right', 'down']
});
const advance = (level, commands) => commands.reduce((state, direction) => transition(level, state, direction).state, initialState(level));

test('a bridge history with identical animal positions must not reuse the initial witness', () => {
  const level = make({fragile: [1]}), start = initialState(level);
  const state = advance(level, ['right', 'down', 'left', 'up']);
  assert.deepEqual(state.positions, start.positions);
  assert.notEqual(stateKey(state), stateKey(start));
  assert.equal(certifiedSuffix(level, state), null);
  const result = analyzePosition(level, state);
  assert.equal(result.status, 'solved'); assert.equal(result.solution[0], 'down');
  assert.equal(replay(level, result.solution, {state}).won, true);
});

test('a collected key is included when matching a state to its stored witness', () => {
  const level = make({keys: [{id: 'key', cell: 1}]}), state = advance(level, ['right', 'left']);
  assert.deepEqual(state.positions, initialState(level).positions);
  assert.deepEqual(state.keys, ['key']);
  assert.equal(certifiedSuffix(level, state), null);
  assert.equal(analyzePosition(level, state, {allowSearch: false}).status, 'inconclusive');
  const result = analyzePosition(level, state);
  assert.equal(result.status, 'solved'); assert.equal(replay(level, result.solution, {state}).won, true);
});

test('certified suffixes are replayed, and a lack of background search is not declared impossible', () => {
  const level = make(), state = advance(level, ['right']);
  const suffix = certifiedSuffix(level, state);
  assert.equal(suffix.status, 'solved'); assert.deepEqual(suffix.solution, ['down']);
  assert.equal(suffix.optimal, false); assert.equal(suffix.source, 'replayed-witness');
  const offPath = advance(level, ['down']);
  const unavailable = analyzePosition(level, offPath, {allowSearch: false});
  assert.equal(unavailable.status, 'inconclusive'); assert.equal(unavailable.reason, 'worker-unavailable');
});

test('a genuine one-way dead end is proved by complete search', () => {
  const level = {id: 'dead-end', version: 1, rulesVersion: 1, solution: ['left'], boards: ['capivara', 'tuiuiu'].map((animal, i) => ({id: `b${i}`, animal, rows: 1, cols: 3, walkable: [0, 1, 2], start: 1, goal: 0, oneWays: [{from: 1, to: 2}]}))};
  const state = advance(level, ['right']);
  assert.equal(certifiedSuffix(level, state), null);
  assert.equal(analyzePosition(level, state).status, 'unsolvable');
  assert.equal(replay(level, level.solution).won, true);
});

test('the generation boundary rejects missing or non-winning certificates', () => {
  const level = make();
  const verified = verifyGenerated({level, solution: level.solution});
  assert.equal(verified.validation.replay, true);
  assert.throws(() => verifyGenerated({level, solution: ['right']}), /confirmada/);
  assert.throws(() => verifyGenerated({level: {...level, solution: undefined}}), /verificável/);
});
