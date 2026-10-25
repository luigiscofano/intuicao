import test from 'node:test';
import assert from 'node:assert/strict';
import {RULES_VERSION, validateLevel, replay} from '../dist/sintonia/engine.mjs';
import {analyzePurpose, findAvoidingSolution, buildPurposeAblations, auditPurpose} from '../dist/sintonia/purpose.mjs';

const board = (index, overrides = {}) => ({id: `b${index}`, animal: ['capivara', 'tuiuiu'][index], rows: 1, cols: 4, walkable: [0, 1, 2, 3], start: 0, goal: 3, ...overrides});
const level = (...boards) => ({id: 'purpose-test', version: 1, rulesVersion: RULES_VERSION, contentVersion: 2, boards});
const prototype = () => ({...level(
  board(0, {rows: 6, cols: 6, start: 26, goal: 28, walkable: [7, 8, 9, 10, 13, 14, 15, 16, 19, 20, 21, 22, 25, 26, 28], boxes: [{id: 'crate', cell: 20}], plates: [{id: 'hold', cell: 9}], gates: [{id: 'home-gate', from: 22, to: 28, condition: {type: 'plate', id: 'helper-start'}}]}),
  board(1, {rows: 6, cols: 6, start: 16, goal: 13, walkable: [13, 14, 15, 16], plates: [{id: 'helper-start', cell: 16}], gates: [13, 14, 15].map(from => ({id: `gate-${from}`, from, to: from + 1, condition: {type: 'plate', id: 'hold'}}))})
), solution: ['up', 'up', 'left', 'up', 'right', 'down', 'right', 'right', 'down', 'down', 'left', 'left', 'left']});
const release = () => ({...level(
  board(0, {cols: 5, walkable: [0, 1, 2, 3, 4], goal: 3, boxes: [{id: 'crate', cell: 1}], plates: [{id: 'p', cell: 2}]}),
  board(1, {cols: 3, walkable: [0, 1, 2], goal: 2, gates: [{id: 'g', from: 0, to: 1, condition: {type: 'plate', id: 'p'}}]})
), solution: ['right', 'right', 'right']});
const generous = {maxStates: 20000, maxMs: 5000};

test('witness analysis records real turning, support, waits and dependency order', () => {
  const candidate = prototype(), before = JSON.stringify(candidate), analysis = analyzePurpose(candidate);
  assert.equal(analysis.valid, true); assert.equal(analysis.won, true);
  assert.equal(analysis.evidenceScope, 'supplied-command-sequence');
  const box = analysis.boxes[0];
  assert.deepEqual(box.pushes.map(push => push.direction), ['up', 'up', 'right']);
  assert.deepEqual(box.path.map(position => [position.command, position.cell]), [[0, 20], [1, 14], [2, 8], [5, 9]]);
  assert.equal(box.directionChanges, 1);
  assert.deepEqual(box.supportUses.map(use => use.command), [11, 12, 13]);
  assert.deepEqual(box.observedRoles, ['directional-reposition', 'gate-support']);
  assert.deepEqual(analysis.boards[1].waitingCommands, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.equal(analysis.dependencies.find(item => item.gateId === 'home-gate').crossings[0].support[0].occupants[0].type, 'animal');
  assert.equal(analysis.dependencies.find(item => item.gateId === 'gate-15').crossings[0].support[0].occupants[0].type, 'box');
  assert.equal(JSON.stringify(candidate), before, 'audit must not mutate the level');
});

test('release after support includes the same snapshot command that consumes the plate', () => {
  const analysis = analyzePurpose(release());
  assert.equal(analysis.won, true);
  assert.deepEqual(analysis.boxes[0].plateEntries, [{command: 1, plateId: 'p'}]);
  assert.deepEqual(analysis.boxes[0].plateReleases, [{command: 2, plateId: 'p', afterGateSupport: true}]);
  assert.ok(analysis.boxes[0].observedRoles.includes('release-after-support'));
  assert.equal(findAvoidingSolution(release(), {...generous, avoid: {type: 'box-support-release', boxId: 'crate'}}).status, 'unsolvable');
});

test('goal departures and intermediate goal visits are observations, not freezes', () => {
  const candidate = {...level(board(0, {rows: 2, cols: 3, walkable: [0, 1, 4], goal: 1}), board(1, {rows: 2, cols: 3, walkable: [0, 1, 2, 4], goal: 4})), solution: ['right', 'right', 'left', 'down', 'right']};
  const analysis = analyzePurpose(candidate);
  assert.deepEqual(analysis.boards[0].goalEntries, [1, 5]);
  assert.deepEqual(analysis.boards[0].goalDepartures, [3]);
});

test('delivery preparation and recipient repositioning are separate observed events', () => {
  const candidate = {...level(
    board(0, {boxes: [{id: 'parcel', cell: 1}], gates: [{id: 'home', from: 2, to: 3, condition: {type: 'plate', id: 'p'}}]}),
    board(1, {rows: 2, cols: 4, walkable: [0, 1, 2, 3, 4, 5, 6, 7], start: 5, goal: 6, plates: [{id: 'p', cell: 7}]})
  ), channels: [{id: 'mail', fromBoard: 0, entry: 2, toBoard: 1, exit: 5}], solution: ['up', 'right', 'left', 'left', 'down', 'right', 'right', 'right']};
  const analysis = analyzePurpose(candidate), box = analysis.boxes[0];
  assert.equal(analysis.won, true);
  assert.deepEqual(box.deliveries.map(item => item.command), [2]);
  assert.deepEqual(box.postDeliveryPushes.map(item => item.command), [6, 7]);
  assert.deepEqual(box.observedRoles, ['gate-support', 'transferred-resource', 'recipient-reposition', 'local-stop']);
  const blocked = analyzePurpose(candidate, ['right']);
  assert.ok(blocked.events.some(event => event.type === 'deliveryBlocked' && event.reason === 'initially-occupied'));
  assert.equal(blocked.boxes[0].deliveries.length, 0);
  assert.equal(blocked.boxes[0].blockedPushes.length, 0, 'a canceled delivery with a locally possible push is not physical box blocking');
});

test('a closed edge before a box is not credited as a box-created local stop', () => {
  const candidate = {...level(
    board(0, {boxes: [{id: 'crate', cell: 1}], gates: [{id: 'g', from: 0, to: 1, condition: {type: 'plate', id: 'p'}}]}),
    board(1, {plates: [{id: 'p', cell: 3}]})
  ), solution: ['right']};
  const analysis = analyzePurpose(candidate);
  assert.equal(analysis.boxes[0].blockedPushes.length, 0);
  assert.equal(analysis.boxes[0].observedRoles.includes('local-stop'), false);
});

test('support then stop uses prior-command history, not support first consumed in the same command', () => {
  const candidate = {...level(
    board(0, {cols: 2, walkable: [0, 1], goal: 0, boxes: [{id: 'crate:local', cell: 1}], plates: [{id: 'p:held', cell: 1}]}),
    board(1, {cols: 3, walkable: [0, 1, 2], goal: 1, gates: [{id: 'g', from: 0, to: 1, condition: {type: 'plate', id: 'p:held'}}]})
  ), solution: ['right']};
  const first = analyzePurpose(candidate), avoid = {type: 'box-supported-stop', boxId: 'crate:local'};
  assert.equal(first.won, true);
  assert.equal(first.boxes[0].blockedPushes[0].physicalPushImpossible, true);
  assert.equal(first.boxes[0].blockedPushes[0].afterPriorGateSupport, false);
  assert.equal(findAvoidingSolution(candidate, {...generous, avoid}).status, 'solved', 'first use is not falsely treated as prior use');
  const later = structuredClone(candidate); later.boards[1].goal = 2; later.solution.push('right');
  const witness = analyzePurpose(later);
  assert.deepEqual(witness.boxes[0].blockedPushes.map(stop => stop.afterPriorGateSupport), [false, true]);
  assert.ok(witness.boxes[0].observedRoles.includes('support-then-stop'));
  const proof = findAvoidingSolution(later, {...generous, avoid});
  assert.equal(proof.status, 'unsolvable'); assert.equal(proof.exhaustive, true);
  assert.equal(findAvoidingSolution(later, {...generous, avoid, maxStates: 1}).status, 'inconclusive');
});

test('plate occupation without an actual consumed gate condition does not count as prior support', () => {
  const candidate = {...level(
    board(0, {cols: 2, walkable: [0, 1], goal: 0, boxes: [{id: 'crate', cell: 1}], plates: [{id: 'p', cell: 1}]}),
    board(1, {cols: 3, walkable: [0, 1, 2], goal: 2})
  ), solution: ['right', 'right']};
  const witness = analyzePurpose(candidate);
  assert.equal(witness.boxes[0].supportUses.length, 0);
  assert.ok(witness.boxes[0].blockedPushes.every(stop => !stop.afterPriorGateSupport));
  assert.equal(findAvoidingSolution(candidate, {...generous, avoid: {type: 'box-supported-stop', boxId: 'crate'}}).status, 'solved');
});

test('avoidance search proves necessary turn only by exhausting monitored states', () => {
  const result = findAvoidingSolution(prototype(), {...generous, avoid: {type: 'box-direction-change', boxId: 'crate'}});
  assert.equal(result.status, 'unsolvable'); assert.equal(result.exhaustive, true);
  assert.ok(result.visited > 1);
  const counterexample = findAvoidingSolution(release(), {...generous, avoid: {type: 'box-direction-change', boxId: 'crate'}});
  assert.equal(counterexample.status, 'solved'); assert.equal(counterexample.replayed, true);
  assert.equal(replay(release(), counterexample.solution).won, true);
});

test('avoidance predicates target event identity and remote helper consumption', () => {
  const candidate = prototype();
  assert.equal(findAvoidingSolution(candidate, {...generous, avoid: {type: 'event', eventType: 'push', boxId: 'crate'}}).status, 'unsolvable');
  assert.equal(findAvoidingSolution(candidate, {...generous, avoid: {type: 'event', eventType: 'portal'}}).status, 'solved');
  for (const board of [0, 1]) assert.equal(findAvoidingSolution(candidate, {...generous, avoid: {type: 'helper-participation', board}}).status, 'unsolvable');
  assert.equal(findAvoidingSolution(candidate, {...generous, avoid: {type: 'board-movement', board: 0}}).status, 'unsolvable');
});

test('time, state and depth exhaustion never become proofs of impossibility', () => {
  const candidate = prototype(), avoid = {type: 'event', eventType: 'portal'};
  for (const options of [{maxStates: 1}, {maxMs: 0}, {maxDepth: 0}]) {
    const result = findAvoidingSolution(candidate, {...generous, avoid, ...options});
    assert.equal(result.status, 'inconclusive'); assert.equal(result.optimal, false);
  }
  assert.equal(findAvoidingSolution(candidate, {...generous, avoid: {type: 'event'}}).reason, 'invalid-avoidance');
  assert.equal(findAvoidingSolution(candidate, {...generous, avoid: {type: 'helper-participation', board: 9}}).reason, 'invalid-avoidance');
});

test('box removal, static replacement, final placement and gate groups are controlled copies', () => {
  const candidate = prototype(), before = JSON.stringify(candidate), variants = buildPurposeAblations(candidate);
  for (const kind of ['remove-box', 'static-box', 'preposition-box', 'open-gate', 'open-gate-group']) assert.ok(variants.some(variant => variant.kind === kind), kind);
  const noBox = variants.find(variant => variant.id === 'remove-box:crate');
  assert.equal(noBox.definitionValid, true); assert.equal(noBox.level.boards[0].boxes.length, 0);
  const prepositioned = variants.find(variant => variant.id === 'preposition-box:crate');
  assert.equal(prepositioned.level.boards[0].boxes[0].cell, 9);
  const group = variants.find(variant => variant.kind === 'open-gate-group');
  assert.equal(group.level.boards[1].gates.length, 0); assert.equal(group.level.boards[0].gates.length, 1);
  assert.equal(JSON.stringify(candidate), before);
});

test('invalid static-wall comparison is skipped rather than silently changing controls', () => {
  const candidate = release(); candidate.boards[0].plates[0].cell = 1;
  const variants = buildPurposeAblations(candidate), staticBox = variants.find(variant => variant.kind === 'static-box');
  assert.equal(validateLevel(candidate).valid, true);
  assert.equal(staticBox.definitionValid, false); assert.equal(staticBox.level, undefined);
  assert.equal(staticBox.notApplicableReason, 'invalid-comparison-definition');
});

test('terrain ablations change just the named rule-bearing data', () => {
  const candidate = {...level(
    board(0, {ice: [1], oneWays: [{from: 1, to: 2}]}),
    board(1, {fragile: [1], portals: [{id: 'portal', a: 2, b: 3}]})
  ), solution: ['right', 'right']};
  assert.equal(validateLevel(candidate).valid, true);
  const variants = buildPurposeAblations(candidate);
  for (const kind of ['ordinary-ice', 'permanent-bridge', 'bidirectional', 'disable-portal']) assert.ok(variants.some(variant => variant.kind === kind && variant.definitionValid), kind);
  assert.deepEqual(variants.find(variant => variant.kind === 'permanent-bridge').level.boards[1].portals, candidate.boards[1].portals);
});

test('audit reports counterfactual outcomes with reproducible budgets and honest limits', () => {
  const report = auditPurpose(prototype(), {...generous, maxTotalMs: 30000});
  assert.equal(report.rulesVersion, 1); assert.equal(report.contentVersion, 2); assert.equal(report.humanPlaytested, false);
  assert.equal(report.baseline.status, 'solved'); assert.equal(report.baseline.optimal, true); assert.equal(report.baseline.solution.length, 13);
  assert.equal(report.ablations.find(variant => variant.id === 'remove-box:crate').result.status, 'unsolvable');
  assert.equal(report.avoidance.find(query => query.avoid.type === 'box-direction-change').result.status, 'unsolvable');
  const limited = auditPurpose(prototype(), {maxTotalMs: 0});
  assert.equal(limited.baseline.status, 'inconclusive');
  for (const query of [...limited.ablations, ...limited.avoidance]) assert.ok(['inconclusive', 'not-applicable'].includes(query.result.status));
});

test('invalid definitions and commands never produce fabricated witness evidence', () => {
  assert.equal(analyzePurpose(prototype(), ['wait']).valid, false);
  const candidate = prototype(); candidate.rulesVersion = 999;
  assert.equal(analyzePurpose(candidate).valid, false);
  assert.equal(findAvoidingSolution(candidate, {avoid: {type: 'event', eventType: 'push'}}).reason, 'invalid-level');
  assert.equal(auditPurpose(candidate).status, 'invalid-level-or-witness');
  assert.equal(analyzePurpose(null).valid, false);
  assert.equal(findAvoidingSolution(null, {avoid: {type: 'helper-participation', board: 0}}).reason, 'invalid-level');
  assert.equal(buildPurposeAblations(null)[0].notApplicableReason, 'invalid-source-definition');
  assert.equal(auditPurpose(null).status, 'invalid-level-or-witness');
  assert.equal(auditPurpose({...prototype(), solution: []}).status, 'nonwinning-witness');
});
