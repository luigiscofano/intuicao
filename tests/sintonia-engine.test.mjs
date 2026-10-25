import test from 'node:test';
import assert from 'node:assert/strict';
import {
  RULES_VERSION, DIRECTIONS, initialState, transition, stateKey, isWon,
  gateIsOpen, canCross, validateLevel, validateState, replay, solveLevel
} from '../dist/sintonia/engine.mjs';

const animals = ['capivara', 'tuiuiu', 'bemtevi', 'mico'];
const board = (index, overrides = {}) => ({id: `board-${index}`, animal: animals[index], rows: 1, cols: 4, walkable: [0, 1, 2, 3], start: 0, goal: 3, ...overrides});
const level = (...boards) => ({id: 'test', version: 1, rulesVersion: RULES_VERSION, boards});
const fixed = () => level(
  board(0, {rows: 2, cols: 3, walkable: [0, 1, 4], goal: 1}),
  board(1, {rows: 2, cols: 3, walkable: [0, 1, 2, 4], goal: 4})
);
const valid = candidate => assert.deepEqual(validateLevel(candidate), {valid: true, errors: []});
const step = (candidate, state, direction) => transition(candidate, state, direction).state;
const verticalHelper = (index, overrides = {}) => board(index, {rows: 2, cols: 1, walkable: [0, 1], goal: 1, ...overrides});

test('reference fixture requires intermediate stops and permits leaving a goal', () => {
  const candidate = fixed(); valid(candidate);
  const start = initialState(candidate);
  const first = transition(candidate, start, 'right');
  assert.deepEqual(first.state.positions, [1, 1]);
  assert.equal(first.won, false);
  const second = transition(candidate, first.state, 'down');
  assert.deepEqual(second.state.positions, [4, 4]);
  assert.equal(second.won, false);
  const proof = replay(candidate, ['right', 'right', 'left', 'down', 'right'], {recordStates: true});
  assert.equal(proof.valid, true); assert.equal(proof.won, true);
  assert.deepEqual(proof.states.map(s => s.positions), [[0, 0], [1, 1], [1, 2], [0, 1], [0, 4], [1, 4]]);
  assert.equal(replay(candidate, ['right', 'down']).won, false);
  // The engine remains mathematical after a win; only the UI decides to stop play.
  assert.equal(isWon(candidate, step(candidate, proof.state, 'left')), false);
});

test('no combination of complete wall sweeps solves the reference fixture, including mid-sweep wins', () => {
  const candidate = fixed(), first = initialState(candidate);
  const queue = [first], seen = new Set([stateKey(first)]);
  for (let head = 0; head < queue.length; head++) {
    for (const direction of DIRECTIONS) {
      let state = queue[head]; const local = new Set();
      while (!local.has(stateKey(state))) {
        local.add(stateKey(state));
        const result = transition(candidate, state, direction);
        assert.equal(result.won, false, `sweep ${direction} unexpectedly won`);
        state = result.state;
        if (!result.changed) break;
      }
      const key = stateKey(state);
      if (!seen.has(key)) { seen.add(key); queue.push(state); }
    }
  }
  assert.ok(seen.size > 1);
});

test('one blocked animal does not prevent the other, and true no-ops preserve the state', () => {
  const candidate = fixed(), start = initialState(candidate);
  const first = step(candidate, start, 'right');
  const result = transition(candidate, first, 'right');
  assert.deepEqual(result.state.positions, [1, 2]);
  assert.equal(result.changed, true);
  const blocked = transition(candidate, result.state, 'right');
  assert.equal(blocked.changed, false); assert.equal(blocked.state, result.state);
  assert.throws(() => transition(candidate, start, 'wait'), RangeError);
});

test('an initially occupied remote plate opens the gate during the command that leaves it', () => {
  const candidate = level(
    board(0, {cols: 3, walkable: [0, 1, 2], start: 1, goal: 2, plates: [{id: 'p', cell: 1}]}),
    board(1, {cols: 2, walkable: [0, 1], goal: 1, gates: [{id: 'g', from: 0, to: 1, condition: {type: 'plate', id: 'p'}}]})
  ); valid(candidate);
  const start = initialState(candidate), gate = candidate.boards[1].gates[0];
  assert.equal(gateIsOpen(candidate, start, gate), true);
  const result = transition(candidate, start, 'right');
  assert.deepEqual(result.state.positions, [2, 1]);
  assert.equal(result.won, true); assert.equal(gateIsOpen(candidate, result.state, gate), false);
  assert.equal(result.events.filter(event => event.type === 'gate').length, 1);
});

test('arriving at a plate changes passages only for the following command', () => {
  const candidate = level(
    board(0, {cols: 2, walkable: [0, 1], goal: 1, plates: [{id: 'p', cell: 1}]}),
    board(1, {cols: 2, walkable: [0, 1], goal: 1, gates: [{id: 'g', from: 0, to: 1, condition: {type: 'plate', id: 'p'}}]})
  ); valid(candidate);
  const first = step(candidate, initialState(candidate), 'right');
  assert.deepEqual(first.positions, [1, 0]);
  assert.equal(gateIsOpen(candidate, first, candidate.boards[1].gates[0]), true);
  assert.deepEqual(step(candidate, first, 'right').positions, [1, 1]);
});

test('toggle switches act on entry, persist on exit, and do not retrigger while blocked', () => {
  const candidate = level(
    board(0, {cols: 2, walkable: [0, 1], goal: 1, switches: [{id: 's', cell: 1, group: 'sun'}]}),
    verticalHelper(1)
  ); valid(candidate);
  const start = initialState(candidate), first = step(candidate, start, 'right');
  assert.equal(first.switches.sun, true);
  const blocked = transition(candidate, first, 'right');
  assert.equal(blocked.changed, false); assert.equal(blocked.state.switches.sun, true);
  const left = step(candidate, first, 'left');
  assert.equal(left.switches.sun, true);
  assert.equal(step(candidate, left, 'right').switches.sun, false);
  assert.equal(start.switches.sun, false);
});

test('complementary gate configurations use one declared persistent control', () => {
  const candidate = level(
    board(0, {rows: 2, cols: 2, walkable: [0, 1, 3], goal: 3, switches: [{id: 's', cell: 1, group: 'sun'}]}),
    board(1, {cols: 3, walkable: [0, 1, 2], goal: 2, gates: [
      {id: 'sun-gate', from: 0, to: 1, condition: {type: 'switch', id: 'sun', value: true}},
      {id: 'moon-gate', from: 1, to: 2, condition: {type: 'switch', id: 'sun', value: false}}
    ]})
  ); valid(candidate);
  const proof = replay(candidate, ['right', 'right', 'down', 'up', 'down', 'right'], {recordStates: true});
  assert.equal(proof.won, true);
  assert.deepEqual(proof.states.map(s => s.positions), [[0, 0], [1, 0], [1, 1], [3, 1], [1, 1], [3, 1], [3, 2]]);
});

test('selectors update after simultaneous movement and blocked commands do not retoggle them', () => {
  const candidate = level(
    board(0, {cols: 2, walkable: [0, 1], goal: 1, selectors: [{id: 'select', cell: 1, group: 'route'}]}),
    verticalHelper(1, {plates: [{id: 'p', cell: 0}]}),
    board(2, {cols: 3, walkable: [0, 1, 2], goal: 2, gates: [
      {id: 'g0', from: 0, to: 1, condition: {type: 'selected', plate: 'p', selector: 'route', value: 0}},
      {id: 'g1', from: 1, to: 2, condition: {type: 'selected', plate: 'p', selector: 'route', value: 1}}
    ]})
  ); valid(candidate);
  const first = step(candidate, initialState(candidate), 'right');
  assert.deepEqual(first.positions, [1, 0, 1]); assert.equal(first.selectors.route, 1);
  const second = step(candidate, first, 'right');
  assert.deepEqual(second.positions, [1, 0, 2]); assert.equal(second.selectors.route, 1);
});

test('a box moves with free room and becomes a barrier only when its push is blocked', () => {
  const candidate = level(
    board(0, {cols: 3, walkable: [0, 1, 2], goal: 1, boxes: [{id: 'box', cell: 1}], plates: [{id: 'p', cell: 2}]}),
    board(1, {cols: 2, walkable: [0, 1], goal: 1, gates: [{id: 'g', from: 0, to: 1, condition: {type: 'plate', id: 'p'}}]})
  ); valid(candidate);
  const first = transition(candidate, initialState(candidate), 'right');
  assert.deepEqual(first.state.positions, [1, 0]); assert.equal(first.state.boxes[0].cell, 2);
  assert.equal(first.events.filter(event => event.type === 'push').length, 1);
  const second = transition(candidate, first.state, 'right');
  assert.deepEqual(second.state.positions, [1, 1]); assert.equal(second.won, true);
});

test('pushes check both animal and box edges, gates, one-way edges and chains', () => {
  const make = (gateEdge, active = false) => level(
    board(0, {boxes: [{id: 'box', cell: 1}], gates: [{id: 'g', from: gateEdge[0], to: gateEdge[1], condition: {type: 'plate', id: 'p'}}]}),
    verticalHelper(1, {plates: [{id: 'p', cell: active ? 0 : 1}]})
  );
  for (const edge of [[0, 1], [1, 2]]) {
    const closed = make(edge); valid(closed);
    assert.equal(transition(closed, initialState(closed), 'right').changed, false);
    const opened = make(edge, true); valid(opened);
    assert.equal(step(opened, initialState(opened), 'right').boxes[0].cell, 2);
  }
  const directed = level(board(0, {boxes: [{id: 'box', cell: 1}], oneWays: [{from: 2, to: 1}]}), verticalHelper(1)); valid(directed);
  assert.equal(transition(directed, initialState(directed), 'right').changed, false);
  const chain = level(board(0, {boxes: [{id: 'a', cell: 1}, {id: 'b', cell: 2}]}), verticalHelper(1)); valid(chain);
  assert.equal(transition(chain, initialState(chain), 'right').changed, false);
});

test('a directed edge is a passage restriction, never automatic motion', () => {
  const candidate = level(board(0, {oneWays: [{from: 0, to: 1}]}), verticalHelper(1)); valid(candidate);
  const start = initialState(candidate), first = step(candidate, start, 'right');
  assert.equal(first.positions[0], 1);
  assert.equal(canCross(candidate, first, 0, 1, 0), false);
  assert.equal(step(candidate, first, 'left').positions[0], 1);
});

test('ice reaches the first ordinary cell or the last free icy cell before a wall', () => {
  const candidate = level(board(0, {cols: 6, walkable: [0, 1, 2, 3, 4, 5], goal: 4, ice: [1, 2, 3]}), verticalHelper(1)); valid(candidate);
  const result = transition(candidate, initialState(candidate), 'right');
  assert.equal(result.state.positions[0], 4);
  assert.deepEqual(result.events.find(event => event.type === 'ice'), {type: 'ice', board: 0, from: 0, to: 4, steps: 4});
  const wall = level(board(0, {cols: 6, walkable: [0, 1, 2, 4, 5], goal: 2, ice: [1, 2]}), verticalHelper(1)); valid(wall);
  assert.equal(step(wall, initialState(wall), 'right').positions[0], 2);
});

test('portals teleport once and end the command, with no automatic return', () => {
  const candidate = level(board(0, {portals: [{id: 'p', a: 1, b: 3}]}), verticalHelper(1)); valid(candidate);
  const result = transition(candidate, initialState(candidate), 'right');
  assert.equal(result.state.positions[0], 3);
  assert.equal(result.events.filter(event => event.type === 'portal').length, 1);
  const next = step(candidate, result.state, 'left'); assert.equal(next.positions[0], 2);
  assert.equal(step(candidate, next, 'right').positions[0], 1);
});

test('fragile terrain collapses on departure, keys persist, and snapshots restore both', () => {
  const candidate = level(
    board(0, {fragile: [0]}),
    board(1, {keys: [{id: 'k', cell: 1}], gates: [{id: 'g', from: 2, to: 3, condition: {type: 'key', id: 'k'}}]})
  ); valid(candidate);
  const start = initialState(candidate), frozen = structuredClone(start);
  const result = transition(candidate, start, 'right');
  assert.deepEqual(result.state.collapsed, ['0:0']); assert.deepEqual(result.state.keys, ['k']);
  assert.equal(step(candidate, result.state, 'left').positions[0], 1);
  assert.equal(gateIsOpen(candidate, result.state, candidate.boards[1].gates[0]), true);
  assert.deepEqual(start, frozen); assert.deepEqual(initialState(candidate), frozen);
  assert.equal(gateIsOpen(candidate, frozen, candidate.boards[1].gates[0]), false);
});

test('AND gates require every plate, including a plate held by a box', () => {
  const candidate = level(
    board(0, {plates: [{id: 'p0', cell: 0}, {id: 'p1', cell: 3}], boxes: [{id: 'box', cell: 3}]}),
    board(1, {gates: [{id: 'g', from: 0, to: 1, condition: {type: 'all', ids: ['p0', 'p1']}}]})
  ); valid(candidate);
  const start = initialState(candidate), gate = candidate.boards[1].gates[0];
  assert.equal(gateIsOpen(candidate, start, gate), true);
  const first = step(candidate, start, 'right');
  assert.equal(first.positions[1], 1); assert.equal(gateIsOpen(candidate, first, gate), false);
});

function deliveryLevel({recipientStart = 0, exit = 3, recipientBoxes = [], senderSwitch = false} = {}) {
  const candidate = level(
    board(0, {boxes: [{id: 'parcel', cell: 1}], ...(senderSwitch ? {switches: [{id: 's', cell: 1, group: 'toggle'}]} : {})}),
    board(1, {start: recipientStart, boxes: recipientBoxes})
  );
  candidate.channels = [{id: 'channel', fromBoard: 0, entry: 2, toBoard: 1, exit}];
  return candidate;
}

test('a successful delivery transfers one box, leaves the animal in its own board and updates plates', () => {
  const candidate = deliveryLevel();
  candidate.boards[1].plates = [{id: 'p', cell: 3}];
  candidate.boards[0].gates = [{id: 'g', from: 1, to: 2, condition: {type: 'plate', id: 'p'}}];
  // The first push crosses this gate, so use another edge to inspect final pressure.
  candidate.boards[0].gates[0].from = 2; candidate.boards[0].gates[0].to = 3;
  valid(candidate);
  const result = transition(candidate, initialState(candidate), 'right');
  assert.deepEqual(result.state.positions, [1, 1]);
  assert.deepEqual(result.state.boxes, [{id: 'parcel', board: 1, cell: 3}]);
  assert.equal(result.events.filter(event => event.type === 'delivery').length, 1);
  assert.equal(gateIsOpen(candidate, result.state, candidate.boards[0].gates[0]), true);
});

test('initially occupied delivery outputs block even if their occupant moves away', () => {
  const candidate = level(board(0, {start: 3, boxes: [{id: 'parcel', cell: 2}]}), board(1, {start: 3}));
  candidate.channels = [{id: 'channel', fromBoard: 0, entry: 1, toBoard: 1, exit: 3}]; valid(candidate);
  const result = transition(candidate, initialState(candidate), 'left');
  assert.deepEqual(result.state.positions, [3, 2]);
  assert.deepEqual(result.state.boxes, [{id: 'parcel', board: 0, cell: 2}]);
  assert.equal(result.events.find(event => event.type === 'deliveryBlocked').reason, 'initially-occupied');
});

test('competing animal or box movement cancels only the sender transaction', () => {
  for (const setup of [{recipientStart: 2, exit: 3}, {recipientStart: 0, exit: 2, recipientBoxes: [{id: 'local', cell: 1}]}]) {
    const candidate = deliveryLevel({...setup, senderSwitch: true}); valid(candidate);
    const result = transition(candidate, initialState(candidate), 'right');
    assert.equal(result.state.positions[0], 0);
    assert.deepEqual(result.state.boxes.find(box => box.id === 'parcel'), {id: 'parcel', board: 0, cell: 1});
    assert.equal(result.state.switches.toggle, false);
    assert.equal(result.events.some(event => event.type === 'push' && event.id === 'parcel'), false);
    assert.equal(result.events.find(event => event.type === 'deliveryBlocked').reason, 'competing-movement');
    if (setup.recipientBoxes) assert.equal(result.state.boxes.find(box => box.id === 'local').cell, 2);
    else assert.equal(result.state.positions[1], 3);
  }
});

test('two deliveries to the same exit both cancel, independent of board processing order', () => {
  const candidate = level(board(0, {boxes: [{id: 'a', cell: 1}]}), board(1), board(2, {boxes: [{id: 'b', cell: 1}]}));
  candidate.channels = [
    {id: 'ca', fromBoard: 0, entry: 2, toBoard: 1, exit: 3},
    {id: 'cb', fromBoard: 2, entry: 2, toBoard: 1, exit: 3}
  ]; valid(candidate);
  const first = transition(candidate, initialState(candidate), 'right');
  assert.deepEqual(first.state.positions, [0, 1, 0]);
  assert.equal(first.events.filter(event => event.type === 'deliveryBlocked').length, 2);
  const permutation = [2, 1, 0], mapped = structuredClone(candidate);
  mapped.boards = permutation.map(index => candidate.boards[index]);
  mapped.channels = candidate.channels.map(channel => ({...channel, fromBoard: permutation.indexOf(channel.fromBoard), toBoard: permutation.indexOf(channel.toBoard)})); valid(mapped);
  const second = transition(mapped, initialState(mapped), 'right');
  const normalize = (spec, state) => ({
    positions: Object.fromEntries(spec.boards.map((b, index) => [b.id, state.positions[index]])),
    boxes: state.boxes.map(box => ({...box, board: spec.boards[box.board].id})).sort((a, b) => a.id.localeCompare(b.id))
  });
  assert.deepEqual(normalize(mapped, second.state), normalize(candidate, first.state));
});

test('delivery onto another channel entrance never starts an automatic chain', () => {
  const candidate = level(board(0, {boxes: [{id: 'parcel', cell: 1}]}), board(1), board(2));
  candidate.channels = [
    {id: 'ab', fromBoard: 0, entry: 2, toBoard: 1, exit: 2},
    {id: 'bc', fromBoard: 1, entry: 2, toBoard: 2, exit: 3}
  ]; valid(candidate);
  const result = transition(candidate, initialState(candidate), 'right');
  assert.deepEqual(result.state.boxes, [{id: 'parcel', board: 1, cell: 2}]);
  assert.equal(result.events.filter(event => event.type === 'delivery').length, 1);
});

test('full-state identity distinguishes all mechanisms and ignores incidental ordering', () => {
  const candidate = level(board(0), board(1)), state = initialState(candidate), key = stateKey(state);
  for (const change of [
    s => { s.positions[0]++; }, s => { s.boxes = [{id: 'box', board: 0, cell: 2}]; },
    s => { s.switches.s = true; }, s => { s.keys.push('k'); },
    s => { s.selectors.route = 1; }, s => { s.collapsed.push('0:1'); }
  ]) { const other = structuredClone(state); change(other); assert.notEqual(stateKey(other), key); }
  const a = {positions: [1, 2], boxes: [{id: 'b', board: 1, cell: 3}, {id: 'a', board: 0, cell: 0}], switches: {y: true, x: false}, keys: ['z', 'a'], selectors: {b: 1, a: 0}, collapsed: ['1:2', '0:3']};
  const b = {positions: [1, 2], boxes: [...a.boxes].reverse(), switches: {x: false, y: true}, keys: ['a', 'z'], selectors: {a: 0, b: 1}, collapsed: ['0:3', '1:2']};
  assert.equal(stateKey(a), stateKey(b));
});

test('BFS returns a proven shortest solution, distinguishes budgets and proves exhausted graphs', () => {
  const candidate = fixed(), solved = solveLevel(candidate);
  assert.equal(solved.status, 'solved'); assert.equal(solved.optimal, true);
  assert.equal(solved.solution.length, 5); assert.equal(replay(candidate, solved.solution).won, true);
  assert.equal(solveLevel(candidate, {maxStates: 1}).status, 'inconclusive');
  assert.equal(solveLevel(candidate, {maxMs: 0}).status, 'inconclusive');
  assert.equal(solveLevel(candidate, {maxDepth: 4}).status, 'inconclusive');
  const impossible = level(board(0, {cols: 3, walkable: [0, 2], goal: 2}), board(1, {cols: 3, walkable: [0, 2], goal: 2})); valid(impossible);
  const exhausted = solveLevel(impossible);
  assert.equal(exhausted.status, 'unsolvable'); assert.equal(exhausted.visited, 1);
  const progressed = step(candidate, initialState(candidate), 'right');
  const hint = solveLevel(candidate, {state: progressed});
  assert.equal(hint.status, 'solved'); assert.equal(replay(candidate, hint.solution, {state: progressed}).won, true);
});

test('validation rejects ambiguous triggers, unknown controls and unsupported box terrain', () => {
  const badLevels = [
    level(board(0, {start: 1, switches: [{id: 's', cell: 1, group: 'g'}]}), board(1)),
    level(board(0, {plates: [{id: 'p', cell: 1}], keys: [{id: 'k', cell: 1}]}), board(1)),
    level(board(0, {gates: [{id: 'g', from: 0, to: 1, condition: {type: 'plate', id: 'missing'}}]}), board(1)),
    level(board(0, {boxes: [{id: 'box', cell: 1}], ice: [2]}), board(1)),
    level(board(0, {boxes: [{id: 'box', cell: 1}], fragile: [3]}), board(1)),
    level(board(0, {boxes: [{id: 'box', cell: 1}], portals: [{id: 'p', a: 2, b: 3}]}), board(1)),
    level(board(0, {switches: [{id: 's0', cell: 1, group: 'g'}]}), board(1, {switches: [{id: 's1', cell: 1, group: 'g'}]}))
  ];
  const cycle = deliveryLevel(); cycle.channels.push({id: 'back', fromBoard: 1, entry: 2, toBoard: 0, exit: 3}); badLevels.push(cycle);
  for (const candidate of badLevels) assert.equal(validateLevel(candidate).valid, false);
  const separated = level(board(0, {boxes: [{id: 'box', cell: 1}]}), board(1, {ice: [1, 2]})); valid(separated);
  const disconnected = level(board(0, {cols: 5, walkable: [0, 1, 3, 4], goal: 0, boxes: [{id: 'box', cell: 1}], ice: [3]}), board(1)); valid(disconnected);
});

test('restored state validation rejects missing boxes, collisions and invented mechanism state', () => {
  const candidate = deliveryLevel(), start = initialState(candidate); valid(candidate);
  assert.equal(validateState(candidate, start).valid, true);
  const lost = structuredClone(start); lost.boxes = [];
  assert.equal(validateState(candidate, lost).valid, false);
  const overlap = structuredClone(start); overlap.boxes[0].cell = overlap.positions[0];
  assert.equal(validateState(candidate, overlap).valid, false);
  const invented = structuredClone(start); invented.collapsed = ['0:2'];
  assert.equal(validateState(candidate, invented).valid, false);
  assert.equal(replay(candidate, ['wait']).valid, false);
  assert.equal(solveLevel(candidate, {state: overlap}).status, 'inconclusive');
  assert.equal(replay(null, []).valid, false);
  assert.equal(solveLevel({boards: null}).status, 'inconclusive');
  const noChannel = level(board(0, {boxes: [{id: 'box', cell: 1}]}), board(1));
  const impossibleTransfer = initialState(noChannel); impossibleTransfer.boxes[0].board = 1;
  assert.equal(validateState(noChannel, impossibleTransfer).valid, false);
  const withKey = level(board(0, {keys: [{id: 'k', cell: 1}]}), board(1));
  const missingKey = initialState(withKey); missingKey.positions[0] = 1;
  assert.equal(validateState(withKey, missingKey).valid, false);
});

test('all reachable transitions are pure and valid for representative mechanism levels', () => {
  const candidates = [fixed(), deliveryLevel(), level(board(0, {fragile: [1]}), board(1, {keys: [{id: 'k', cell: 1}]}))];
  for (const candidate of candidates) {
    valid(candidate); const beforeLevel = JSON.stringify(candidate);
    const queue = [initialState(candidate)], seen = new Set([stateKey(queue[0])]);
    for (let head = 0; head < queue.length && head < 200; head++) {
      const state = queue[head], before = JSON.stringify(state);
      for (const direction of DIRECTIONS) {
        const a = transition(candidate, state, direction), b = transition(candidate, state, direction);
        assert.equal(stateKey(a.state), stateKey(b.state));
        assert.equal(JSON.stringify(state), before);
        assert.equal(validateState(candidate, a.state).valid, true);
        const key = stateKey(a.state); if (!seen.has(key)) { seen.add(key); queue.push(a.state); }
      }
    }
    assert.equal(JSON.stringify(candidate), beforeLevel);
  }
});
