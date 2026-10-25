import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {CAMPAIGN, CHAPTERS} from '../dist/sintonia/campaign.mjs';
import {LEGACY_CAMPAIGN} from '../dist/sintonia/campaign-v1.mjs';
import {FALLBACK_LEVELS} from '../dist/sintonia/fallback.mjs';
import {validateLevel, replay} from '../dist/sintonia/engine.mjs';
import {analyzePurpose} from '../dist/sintonia/purpose.mjs';
import {designPattern, levelFingerprint, logicalSignature, findAvoidingReceiverTurn, AUDIT_BUDGETS} from './sintonia-audit-purpose.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPORT = resolve(ROOT, 'tests/sintonia-purpose-audit.json');
const ENGINE_SHA256 = 'db5503ca8fcff67526cab621be89c472c1afb75b2083b9c69d9f98859fe8eece';
const hashFile = path => createHash('sha256').update(readFileSync(path)).digest('hex');
let cachedReport;
function report() {
  assert.ok(existsSync(REPORT), 'Run node tests/sintonia-audit-purpose.mjs after materializing the final 500 + 36 definitions.');
  return cachedReport ??= JSON.parse(readFileSync(REPORT, 'utf8'));
}
const expectedFirst = {walls: 1, plate: 76, switch: 101, key: 126, box: 176, ice: 201, portal: 226, oneway: 251, alternate: 276, fragile: 301, handoff: 326, and: 351, selector: 401, delivery: 426};
const expectedChapters = [[25, 0, 0], [25, 0, 0], [25, 0, 0], [25, 0, 0], [25, 0, 0], [25, 0, 0], [10, 15, 0], [12, 13, 0], [13, 12, 0], [9, 16, 0], [9, 16, 0], [9, 16, 0], [9, 16, 0], [9, 16, 0], [5, 20, 0], [5, 10, 10], [5, 10, 10], [5, 10, 10], [5, 10, 10], [5, 10, 10]];

test('redesign preserves 500/20 structure, exact animal allocations and mechanic introductions', () => {
  assert.equal(CAMPAIGN.length, 500); assert.equal(CHAPTERS.length, 20); assert.equal(FALLBACK_LEVELS.length, 36);
  assert.deepEqual([2, 3, 4].map(animals => CAMPAIGN.filter(level => level.boards.length === animals).length), [260, 190, 50]);
  for (const [index, expected] of expectedChapters.entries()) assert.deepEqual([2, 3, 4].map(animals => CAMPAIGN.slice(index * 25, index * 25 + 25).filter(level => level.boards.length === animals).length), expected, `chapter ${index + 1}`);
  for (const [mechanic, first] of Object.entries(expectedFirst)) assert.equal(CAMPAIGN.find(level => level.mechanics.includes(mechanic))?.number, first, mechanic);
  for (let difficulty = 0; difficulty < 6; difficulty++) assert.equal(FALLBACK_LEVELS.filter(level => level.difficulty === difficulty).length, 6);
});

test('all 536 definitions replay under the byte-identical rules engine', () => {
  assert.equal(hashFile(resolve(ROOT, 'dist/sintonia/engine.mjs')), ENGINE_SHA256);
  for (const level of [...CAMPAIGN, ...FALLBACK_LEVELS]) {
    assert.deepEqual(validateLevel(level), {valid: true, errors: []}, level.id);
    assert.equal(replay(level, level.solution).won, true, level.id);
    assert.equal(level.rulesVersion, 1, level.id);
    assert.equal(level.editorial?.humanPlaytested, false, level.id);
  }
});

test('justified originals remain intact while the four named redesigns are real map changes', () => {
  for (const number of [1, 51, 176]) {
    assert.deepEqual(CAMPAIGN[number - 1].boards, LEGACY_CAMPAIGN[number - 1].boards, `retained ${number}`);
    assert.deepEqual(CAMPAIGN[number - 1].solution, LEGACY_CAMPAIGN[number - 1].solution, `retained certificate ${number}`);
  }
  const patterns = {177: 'park-and-retrieve', 200: 'support-then-release', 426: 'receive-turn-support', 500: 'receive-hold-return'};
  for (const [number, pattern] of Object.entries(patterns)) {
    const level = CAMPAIGN[Number(number) - 1];
    assert.equal(designPattern(level), pattern, number);
    assert.notDeepEqual(level.boards, LEGACY_CAMPAIGN[Number(number) - 1].boards, `${number} is not merely relabeled`);
  }
  const release = analyzePurpose(CAMPAIGN[199]);
  assert.ok(release.boxes.some(box => box.plateReleases.some(event => event.afterGateSupport)), '200 releases a box after actual support');
  for (const number of [426, 500]) assert.ok(analyzePurpose(CAMPAIGN[number - 1]).boxes.some(box => box.deliveries.length && box.postDeliveryPushes.length >= 2), `${number} reuses received resource`);
});

test('audit is complete, current and bound to the unchanged engine and exact definitions', () => {
  const evidence = report();
  assert.equal(evidence.rulesVersion, 1); assert.equal(evidence.sourceHashes.engine, ENGINE_SHA256);
  assert.equal(evidence.sourceHashes.purposeModule, hashFile(resolve(ROOT, 'dist/sintonia/purpose.mjs')));
  assert.equal(evidence.sourceHashes.auditScript, hashFile(resolve(ROOT, 'tests/sintonia-audit-purpose.mjs')));
  assert.equal(evidence.humanPlaytested, false); assert.equal(evidence.summary.humanPlaytested, false);
  assert.deepEqual(evidence.budgets, AUDIT_BUDGETS);
  assert.equal(evidence.levels.length, 536); assert.equal(evidence.summary.certified, 536);
  assert.equal(new Set(evidence.levels.map(level => level.id)).size, 536);
  const indexed = new Map(evidence.levels.map(level => [level.id, level]));
  for (const level of [...CAMPAIGN, ...FALLBACK_LEVELS]) {
    const record = indexed.get(level.id);
    assert.ok(record, level.id); assert.equal(record.fingerprint, levelFingerprint(level), `stale evidence: ${level.id}`);
    assert.equal(record.logicalSignature, logicalSignature(level).signature, level.id);
    assert.equal(record.witness.valid, true); assert.equal(record.witness.won, true); assert.equal(record.humanPlaytested, false);
  }
});

test('critical claimed box roles have actual exhaustive necessity evidence', () => {
  for (const number of [177, 200, 426, 500]) {
    const record = report().levels.find(level => level.number === number);
    const removed = record.ablations.filter(query => query.kind === 'remove-box');
    assert.ok(removed.length); assert.ok(removed.every(query => query.result.status === 'unsolvable'), `${number}: box removal`);
    assert.equal(record.budget.maxStates, 100000);
    const expectedPrefixes = number === 177 ? ['box-turn:'] : number === 200 ? ['box-turn:', 'box-release:'] : ['mechanic:delivery', 'receiver-push:', 'receiver-turn:'];
    for (const prefix of expectedPrefixes) {
      const queries = record.avoidance.filter(query => query.id.startsWith(prefix));
      assert.ok(queries.length, `${number}: missing ${prefix}`);
      for (const query of queries) {
        assert.equal(query.result.status, 'unsolvable', `${number}: ${query.id}`);
        assert.equal(query.result.exhaustive, true, `${number}: ${query.id}`);
        assert.equal(query.conclusion, 'necessary-under-exact-predicate');
      }
    }
  }
  const finale = report().levels.find(level => level.number === 500);
  for (let board = 0; board < 4; board++) assert.equal(finale.avoidance.find(query => query.id === `remote-condition:${board}`)?.result.status, 'unsolvable', `finale panel ${board} has a distinct required remote condition`);
  const twoRoles = report().levels.find(level => level.number === 423);
  assert.equal(twoRoles.secondaryPattern, 'support-and-necessary-stop');
  assert.equal(twoRoles.budget.maxStates, 100000);
  const box = twoRoles.witness.boxes.find(box => box.id === 'box0');
  assert.ok(box.supportUses.length);
  assert.ok(box.blockedPushes.some(stop => stop.afterPriorGateSupport && stop.physicalPushImpossible && stop.otherBoardMoved));
  const stop = twoRoles.avoidance.find(query => query.id === 'box-supported-stop:box0');
  assert.equal(stop?.result.status, 'unsolvable', '423 must require the supported box as an actual subsequent local stop');
  assert.equal(stop.result.exhaustive, true);
  assert.equal(stop.conclusion, 'necessary-under-exact-predicate');
});

test('every relevant object, terrain and condition has the specified bounded comparison', () => {
  for (const record of report().levels) {
    for (const box of record.witness.boxes) {
      assert.ok(record.ablations.some(query => query.id === `remove-box:${box.id}`), record.id);
      assert.ok(record.avoidance.some(query => query.id === `box-turn:${box.id}`), record.id);
      if (box.plateReleases.some(release => release.afterGateSupport)) assert.ok(record.avoidance.some(query => query.id === `box-release:${box.id}`), record.id);
      if (box.blockedPushes.some(stop => stop.afterPriorGateSupport)) assert.ok(record.avoidance.some(query => query.id === `box-supported-stop:${box.id}`), record.id);
      for (const board of [...new Set(box.deliveries.map(delivery => delivery.toBoard))]) for (const prefix of ['receiver-push', 'receiver-turn']) assert.ok(record.avoidance.some(query => query.id === `${prefix}:${box.id}:${board}`), record.id);
    }
    const definition = [...CAMPAIGN, ...FALLBACK_LEVELS].find(level => level.id === record.id);
    for (const board of definition.boards) {
      if (board.ice?.length) assert.ok(record.ablations.some(query => query.id === `ordinary-ice:${board.id}`), record.id);
      if (board.fragile?.length) assert.ok(record.ablations.some(query => query.id === `permanent-bridge:${board.id}`), record.id);
      if (board.oneWays?.length) assert.ok(record.ablations.some(query => query.id === `bidirectional:${board.id}`), record.id);
      for (const gate of board.gates || []) {
        assert.ok(record.ablations.some(query => query.id === `open-gate:${gate.id}`), record.id);
        assert.ok(record.ablations.some(query => query.id === `open-gate-type:${gate.condition.type}`), record.id);
      }
    }
  }
});

test('timeouts, counterexamples and invalid comparisons are never promoted to proofs', () => {
  let inconclusive = 0;
  for (const record of report().levels) {
    for (const query of [...record.ablations, ...record.avoidance]) {
      assert.ok(['solved', 'unsolvable', 'inconclusive', 'not-applicable'].includes(query.result.status));
      if (query.result.status === 'inconclusive') {inconclusive++; assert.ok(query.result.reason); assert.notEqual(query.conclusion, 'necessary-under-exact-predicate');}
      if (query.result.status === 'not-applicable') {assert.equal(query.definitionValid, false); assert.ok(query.errors.length);}
      if (query.result.status === 'solved') assert.ok(Array.isArray(query.result.solution));
    }
    for (const query of record.avoidance) assert.equal(query.conclusion, query.result.status === 'unsolvable' ? 'necessary-under-exact-predicate' : query.result.status === 'solved' ? 'counterexample-refutes-necessity' : 'inconclusive');
  }
  assert.equal(report().summary.inconclusive.length, inconclusive);
});

test('logical classification ignores geometric padding, animal names and panel order', () => {
  const original = CAMPAIGN[50], padded = structuredClone(original);
  for (const board of padded.boards) {
    const cols = board.cols, map = cell => (Math.floor(cell / cols) + 2) * (cols + 4) + cell % cols + 2;
    board.walkable = board.walkable.map(map); board.start = map(board.start); board.goal = map(board.goal); board.rows += 4; board.cols += 4;
  }
  padded.boards.reverse(); [padded.boards[0].animal, padded.boards[1].animal] = [padded.boards[1].animal, padded.boards[0].animal];
  assert.equal(replay(padded, padded.solution).won, true);
  assert.equal(logicalSignature(original).signature, logicalSignature(padded).signature);
});

test('recipient-turn search cannot mistake the sender direction for a recipient turn', () => {
  const level = {id: 'turn-scope', version: 1, rulesVersion: 1, boards: [
    {id: 'a', animal: 'capivara', rows: 1, cols: 4, walkable: [0, 1, 2, 3], start: 0, goal: 3, boxes: [{id: 'parcel', cell: 1}], gates: [{id: 'g', from: 2, to: 3, condition: {type: 'plate', id: 'p'}}]},
    {id: 'b', animal: 'tuiuiu', rows: 3, cols: 3, walkable: [2, 5, 8], start: 8, goal: 5, plates: [{id: 'p', cell: 2}]}
  ], channels: [{id: 'mail', fromBoard: 0, entry: 2, toBoard: 1, exit: 5}], solution: ['right', 'up', 'right', 'right']};
  assert.equal(replay(level, level.solution).won, true);
  const witness = analyzePurpose(level); assert.equal(witness.boxes[0].directionChanges, 1); assert.equal(witness.boxes[0].postDeliveryPushes.length, 1);
  const result = findAvoidingReceiverTurn(level, {boxId: 'parcel', board: 1, maxStates: 1000, maxMs: 5000});
  assert.equal(result.status, 'solved'); assert.equal(replay(level, result.solution).won, true);
  for (const budget of [{maxStates: 1}, {maxMs: 0}, {maxDepth: 0}]) assert.equal(findAvoidingReceiverTurn(level, {boxId: 'parcel', board: 1, ...budget}).status, 'inconclusive');
});
