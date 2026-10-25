/**
 * Content evidence, never game rules. Observed use is not proof of necessity.
 * All searches call the unchanged engine and preserve its complete state key.
 */
import {RULES_VERSION, DIRECTIONS, initialState, transition, stateKey, isWon, validateLevel, replay, solveLevel, canCross} from './engine.mjs';

export const PURPOSE_AUDIT_VERSION = 1;
const clone = value => JSON.parse(JSON.stringify(value));
const now = () => globalThis.performance?.now?.() ?? Date.now();
const vectors = {up: [-1, 0], right: [0, 1], down: [1, 0], left: [0, -1]};
const samePosition = (a, b) => a.board === b.board && a.cell === b.cell;
const supportKey = (boxId, plateId) => JSON.stringify([boxId, plateId]);
const plateIds = condition => condition.type === 'plate' ? [condition.id] : condition.type === 'all' ? condition.ids : condition.type === 'selected' ? [condition.plate] : [];

function controllerIndex(level) {
  const index = {plate: new Map(), switch: new Map(), key: new Map(), selector: new Map()};
  for (const [board, definition] of level.boards.entries()) {
    for (const [field, type] of [['plates', 'plate'], ['switches', 'switch'], ['keys', 'key'], ['selectors', 'selector']]) {
      for (const item of definition[field] || []) index[type].set(item.group ?? item.id, {type, id: item.group ?? item.id, board, cell: item.cell});
    }
  }
  return index;
}

function controllers(condition, index) {
  const result = plateIds(condition).map(id => index.plate.get(id));
  if (condition.type === 'switch') result.push(index.switch.get(condition.id));
  if (condition.type === 'key') result.push(index.key.get(condition.id));
  if (condition.type === 'selected') result.push(index.selector.get(condition.selector));
  return result.filter(Boolean);
}

function occupants(state, plate) {
  return [
    ...(state.positions[plate.board] === plate.cell ? [{type: 'animal', board: plate.board}] : []),
    ...state.boxes.filter(box => samePosition(box, plate)).map(box => ({type: 'box', id: box.id, board: box.board}))
  ];
}

function gateSupport(event, before, index) {
  return controllers(event.condition, index).map(controller => ({...controller,
    ...(controller.type === 'plate' ? {occupants: occupants(before, controller)} :
      controller.type === 'switch' ? {value: before.switches[controller.id]} :
        controller.type === 'selector' ? {value: before.selectors[controller.id]} : {collected: before.keys.includes(controller.id)})
  }));
}

/** A box stops its animal only if the animal can reach its face but the local
 * push itself is physically impossible in the command's initial snapshot.
 * A closed edge before the box or a canceled delivery is not this predicate.
 */
function physicalBoxStops(level, before, moved, direction) {
  const result = [], [dr, dc] = vectors[direction];
  for (const [board, definition] of level.boards.entries()) {
    const from = before.positions[board];
    if (moved.state.positions[board] !== from || !moved.state.positions.some((cell, i) => i !== board && cell !== before.positions[i])) continue;
    const neighbor = cell => {
      const row = Math.floor(cell / definition.cols) + dr, col = cell % definition.cols + dc;
      return row >= 0 && row < definition.rows && col >= 0 && col < definition.cols ? row * definition.cols + col : -1;
    };
    const front = neighbor(from), box = before.boxes.find(item => item.board === board && item.cell === front);
    if (!box || !canCross(level, before, board, from, front) || !moved.state.boxes.some(after => after.id === box.id && samePosition(after, box))) continue;
    const beyond = neighbor(front), pushPossible = beyond >= 0 && canCross(level, before, board, front, beyond) && !before.boxes.some(item => item.board === board && item.cell === beyond);
    if (!pushPossible) result.push({boxId: box.id, board, cell: box.cell});
  }
  return result;
}

/** Analyze only the supplied witness. No field here implies all solutions agree. */
export function analyzePurpose(level, commands = level?.solution) {
  const checked = replay(level, commands);
  if (!checked.valid) return {valid: false, won: false, error: checked.error, evidenceScope: 'supplied-command-sequence'};
  const index = controllerIndex(level), start = initialState(level);
  const boxMap = new Map(start.boxes.map(box => [box.id, {id: box.id, origin: {...box}, path: [{command: 0, board: box.board, cell: box.cell}], pushes: [], directionChanges: 0, deliveries: [], postDeliveryPushes: [], plateEntries: [], plateReleases: [], supportUses: [], blockedPushes: []}]));
  const boards = level.boards.map((board, i) => ({board: i, id: board.id, animal: board.animal, movedCommands: [], waitingCommands: [], goalEntries: board.start === board.goal ? [0] : [], goalDepartures: [], moveEdges: 0}));
  const plates = [...index.plate.values()].map(plate => ({...plate, occupancyChanges: [{command: 0, occupants: occupants(start, plate)}]}));
  const dependencies = level.boards.flatMap((board, receiverBoard) => (board.gates || []).map(gate => ({gateId: gate.id, receiverBoard, condition: clone(gate.condition), controllers: controllers(gate.condition, index), crossings: []})));
  const dependencyMap = new Map(dependencies.map(dependency => [dependency.gateId, dependency]));
  const events = [], supportHistory = new Map();
  let state = start;
  for (const [offset, direction] of commands.entries()) {
    const command = offset + 1, moved = transition(level, state, direction), next = moved.state;
    const priorSupportedBoxes = new Set([...supportHistory.keys()].map(key => JSON.parse(key)[0]));
    for (const event of moved.events) {
      events.push({command, direction, ...event});
      if (event.type === 'move') boards[event.board].moveEdges++;
      if (event.type === 'push') {
        const box = boxMap.get(event.id), push = {command, direction, board: event.board, from: event.from, to: event.to};
        if (box.pushes.length && box.pushes.at(-1).direction !== direction) box.directionChanges++;
        box.pushes.push(push);
        if (box.deliveries.length) box.postDeliveryPushes.push(push);
      }
      if (event.type === 'delivery') boxMap.get(event.box).deliveries.push({command, channelId: event.id, fromBoard: event.fromBoard, toBoard: event.toBoard, entry: event.entry, exit: event.exit});
      if (event.type === 'gate') {
        const support = gateSupport(event, state, index);
        dependencyMap.get(event.id)?.crossings.push({command, from: event.from, to: event.to, support});
        for (const controller of support) for (const occupant of controller.occupants || []) if (occupant.type === 'box') {
          const use = {command, plateId: controller.id, gateId: event.id, receiverBoard: event.board};
          boxMap.get(occupant.id).supportUses.push(use);
          supportHistory.set(supportKey(occupant.id, controller.id), command);
        }
      }
    }
    for (const [board, definition] of level.boards.entries()) {
      const changed = state.positions[board] !== next.positions[board];
      (changed ? boards[board].movedCommands : boards[board].waitingCommands).push(command);
      if (changed && state.positions[board] === definition.goal) boards[board].goalDepartures.push(command);
      if (changed && next.positions[board] === definition.goal) boards[board].goalEntries.push(command);
    }
    for (const stop of physicalBoxStops(level, state, moved, direction)) boxMap.get(stop.boxId).blockedPushes.push({command, direction, board: stop.board, cell: stop.cell, otherBoardMoved: true, physicalPushImpossible: true, afterPriorGateSupport: priorSupportedBoxes.has(stop.boxId)});
    for (const plate of plates) {
      const before = occupants(state, plate), after = occupants(next, plate);
      if (JSON.stringify(before) !== JSON.stringify(after)) plate.occupancyChanges.push({command, occupants: after});
    }
    for (const before of state.boxes) {
      const after = next.boxes.find(box => box.id === before.id), record = boxMap.get(before.id);
      if (!samePosition(before, after)) record.path.push({command, board: after.board, cell: after.cell});
      for (const plate of index.plate.values()) {
        if (!samePosition(before, plate) && samePosition(after, plate)) record.plateEntries.push({command, plateId: plate.id});
        if (samePosition(before, plate) && !samePosition(after, plate)) record.plateReleases.push({command, plateId: plate.id, afterGateSupport: supportHistory.has(supportKey(before.id, plate.id))});
      }
    }
    state = next;
  }
  const boxes = [...boxMap.values()].map(box => ({...box, final: state.boxes.find(item => item.id === box.id), observedRoles: [
    ...(box.directionChanges ? ['directional-reposition'] : []),
    ...(box.supportUses.length ? ['gate-support'] : []),
    ...(box.plateReleases.some(release => release.afterGateSupport) ? ['release-after-support'] : []),
    ...(box.deliveries.length ? ['transferred-resource'] : []),
    ...(box.postDeliveryPushes.length ? ['recipient-reposition'] : []),
    ...(box.blockedPushes.some(push => push.otherBoardMoved) ? ['local-stop'] : []),
    ...(box.blockedPushes.some(push => push.afterPriorGateSupport) ? ['support-then-stop'] : [])
  ]}));
  return {valid: true, won: checked.won, evidenceScope: 'supplied-command-sequence', commands: commands.length, boxes, boards, plates, dependencies, events,
    caveat: 'Observed roles describe this witness only; necessity requires an exhaustive avoidance search or a valid controlled comparison.'};
}

function matchEvent(event, avoid) {
  return (!avoid.eventType || event.type === avoid.eventType) && (!avoid.eventId || event.id === avoid.eventId) && (avoid.board === undefined || (event.board ?? event.fromBoard) === avoid.board) && (!avoid.boxId || event.id === avoid.boxId || event.box === avoid.boxId);
}

function nextMonitor(level, index, before, moved, direction, monitor, avoid) {
  const selected = box => !avoid.boxId || box.id === avoid.boxId;
  if (avoid.type === 'event' && moved.events.some(event => matchEvent(event, avoid))) return null;
  if (avoid.type === 'board-movement' && before.positions[avoid.board] !== moved.state.positions[avoid.board]) return null;
  // Participation means a remote gate actually consumes a condition controlled
  // on this panel. It is not inferred from walking, icon presence or distance.
  if (avoid.type === 'helper-participation' && moved.events.some(event => event.type === 'gate' && event.board !== avoid.board && controllers(event.condition, index).some(controller => controller.board === avoid.board))) return null;
  // Only earlier commands count as prior support. Support first consumed in
  // this same command cannot manufacture an ordered two-role observation.
  if (avoid.type === 'box-supported-stop' && physicalBoxStops(level, before, moved, direction).some(stop => (!avoid.boxId || stop.boxId === avoid.boxId) && monitor.supported.some(key => JSON.parse(key)[0] === stop.boxId))) return null;
  const next = {directions: {...monitor.directions}, supported: [...monitor.supported]};
  if (avoid.type === 'box-direction-change') for (const event of moved.events.filter(event => event.type === 'push' && selected(event))) {
    if (next.directions[event.id] && next.directions[event.id] !== direction) return null;
    next.directions[event.id] = direction;
  }
  if (avoid.type === 'box-support-release' || avoid.type === 'box-supported-stop') {
    const supported = new Set(next.supported);
    for (const event of moved.events.filter(event => event.type === 'gate')) for (const controller of gateSupport(event, before, index)) for (const occupant of controller.occupants || []) {
      if (occupant.type === 'box' && selected(occupant)) supported.add(supportKey(occupant.id, controller.id));
    }
    next.supported = [...supported].sort();
  }
  if (avoid.type === 'box-plate-release' || avoid.type === 'box-support-release') for (const box of before.boxes.filter(selected)) {
    const after = moved.state.boxes.find(item => item.id === box.id);
    for (const plate of index.plate.values()) if (samePosition(box, plate) && !samePosition(after, plate) && (avoid.type === 'box-plate-release' || next.supported.includes(supportKey(box.id, plate.id)))) return null;
  }
  return next;
}

/**
 * Find a winning counterexample that avoids a claimed necessary event.
 * `unsolvable` proves no avoiding solution only after exhausting the monitored
 * product graph; limits always produce `inconclusive`, including depth limits.
 */
export function findAvoidingSolution(level, {avoid, maxStates = 12000, maxMs = 1000, maxDepth = Infinity} = {}) {
  const validation = validateLevel(level);
  const types = ['box-direction-change', 'box-plate-release', 'box-support-release', 'box-supported-stop', 'event', 'helper-participation', 'board-movement'];
  const validAvoid = avoid && types.includes(avoid.type) && (!['helper-participation', 'board-movement'].includes(avoid.type) || Number.isInteger(avoid.board) && avoid.board >= 0 && avoid.board < level?.boards?.length) && (!avoid.boxId || level?.boards?.some(board => board.boxes?.some(box => box.id === avoid.boxId))) && (avoid.type !== 'event' || typeof avoid.eventType === 'string');
  const common = {scope: 'all-winning-solutions-avoiding-event', optimalScope: 'avoiding-predicate-only', avoid: clone(avoid ?? {}), budget: {maxStates, maxMs, maxDepth: Number.isFinite(maxDepth) ? maxDepth : null}};
  if (!validation.valid || !validAvoid) return {...common, status: 'inconclusive', reason: !validation.valid ? 'invalid-level' : 'invalid-avoidance', errors: validation.errors, visited: 0, optimal: false};
  if (!(maxStates >= 1) || !(maxMs > 0) || !(maxDepth >= 0)) return {...common, status: 'inconclusive', reason: 'budget', visited: 0, optimal: false};
  const first = initialState(level), index = controllerIndex(level), deadline = now() + maxMs, firstMonitor = {directions: {}, supported: []};
  if (isWon(level, first)) return {...common, status: 'solved', solution: [], visited: 1, optimal: true};
  const monitorKey = monitor => JSON.stringify([Object.entries(monitor.directions).sort(([a], [b]) => a.localeCompare(b)), monitor.supported]);
  const keyFor = (state, monitor) => `${stateKey(state)}|${monitorKey(monitor)}`;
  const nodes = [{state: first, monitor: firstMonitor, parent: -1, direction: null, depth: 0}], seen = new Set([keyFor(first, firstMonitor)]);
  let depthLimited = false;
  const incomplete = reason => ({...common, status: 'inconclusive', reason, visited: seen.size, optimal: false});
  for (let head = 0; head < nodes.length; head++) {
    if ((head & 31) === 0 && now() >= deadline) return incomplete('time-budget');
    const node = nodes[head];
    for (const direction of DIRECTIONS) {
      const moved = transition(level, node.state, direction);
      if (!moved.changed) continue;
      const monitor = nextMonitor(level, index, node.state, moved, direction, node.monitor, avoid);
      if (!monitor) continue;
      const key = keyFor(moved.state, monitor);
      if (seen.has(key)) continue;
      if (node.depth >= maxDepth) { depthLimited = true; continue; }
      if (moved.won) {
        const solution = [direction];
        for (let at = head; nodes[at].parent !== -1; at = nodes[at].parent) solution.push(nodes[at].direction);
        solution.reverse();
        const verification = replay(level, solution);
        if (!verification.valid || !verification.won) return incomplete('replay-failed');
        return {...common, status: 'solved', solution, visited: seen.size + 1, optimal: true, replayed: true};
      }
      if (seen.size >= maxStates) return incomplete('state-budget');
      seen.add(key); nodes.push({state: moved.state, monitor, parent: head, direction, depth: node.depth + 1});
    }
  }
  return depthLimited ? incomplete('depth-budget') : {...common, status: 'unsolvable', visited: seen.size, optimal: false, exhaustive: true};
}

/** Copies are fresh; no source definition or engine cache is modified. */
export function buildPurposeAblations(level, {commands = level?.solution} = {}) {
  const sourceValidation = validateLevel(level);
  if (!sourceValidation.valid) return [{id: 'invalid-source', kind: 'invalid-source', definitionValid: false, errors: sourceValidation.errors, notApplicableReason: 'invalid-source-definition'}];
  const variants = [], final = replay(level, commands), add = (id, kind, hypothesis, edit, comparability = 'Single feature removed; solvability alone does not establish the intended discovery.') => {
    const copy = clone(level); edit(copy);
    const validation = validateLevel(copy);
    variants.push({id, kind, hypothesis, comparability, definitionValid: validation.valid, errors: validation.errors, ...(validation.valid ? {level: copy} : {notApplicableReason: 'invalid-comparison-definition'})});
  };
  for (const [boardIndex, board] of level.boards.entries()) {
    for (const box of board.boxes || []) {
      add(`remove-box:${box.id}`, 'remove-box', 'Can the animals finish without this movable resource?', copy => {copy.boards[boardIndex].boxes = copy.boards[boardIndex].boxes.filter(item => item.id !== box.id);});
      add(`static-box:${box.id}`, 'static-box', 'Can a fixed obstacle replace this movable resource at its initial position?', copy => {
        copy.boards[boardIndex].boxes = copy.boards[boardIndex].boxes.filter(item => item.id !== box.id);
        copy.boards[boardIndex].walkable = copy.boards[boardIndex].walkable.filter(cell => cell !== box.cell);
      }, 'The starting box cell becomes wall, without deleting controls or edges. Invalid overlaps are not tested.');
      const destination = final.valid && final.won && final.state.boxes.find(item => item.id === box.id);
      if (destination && !samePosition({board: boardIndex, cell: box.cell}, destination)) add(`preposition-box:${box.id}`, 'preposition-box', 'Does starting with this box at its witnessed final position remove preparation?', copy => {
        copy.boards[boardIndex].boxes = copy.boards[boardIndex].boxes.filter(item => item.id !== box.id);
        (copy.boards[destination.board].boxes ??= []).push({id: box.id, cell: destination.cell});
      }, 'Final position comes from this witness, not a claim that every solution ends there. Delivery origin changes are explicit.');
    }
    for (const gate of board.gates || []) add(`open-gate:${gate.id}`, 'open-gate', 'Can the level be solved when this controlled edge is permanently open?', copy => {copy.boards[boardIndex].gates = copy.boards[boardIndex].gates.filter(item => item.id !== gate.id);});
    if (board.ice?.length) add(`ordinary-ice:${board.id}`, 'ordinary-ice', 'Does replacing this panel’s ice with ordinary floor preserve a solution?', copy => {copy.boards[boardIndex].ice = [];});
    if (board.fragile?.length) add(`permanent-bridge:${board.id}`, 'permanent-bridge', 'Does allowing revisits remove an irreversible preparation constraint?', copy => {copy.boards[boardIndex].fragile = [];});
    if (board.oneWays?.length) add(`bidirectional:${board.id}`, 'bidirectional', 'Does allowing reverse traversal remove an ordering constraint?', copy => {copy.boards[boardIndex].oneWays = [];});
    for (const portal of board.portals || []) add(`disable-portal:${portal.id}`, 'disable-portal', 'Is teleportation needed for connectivity or coordination in this layout?', copy => {copy.boards[boardIndex].portals = copy.boards[boardIndex].portals.filter(item => item.id !== portal.id);}, 'Disabling a portal may disconnect regions; impossibility proves connectivity need, not superiority to a comparable physical connection.');
  }
  const groups = new Map();
  for (const board of level.boards) for (const gate of board.gates || []) {
    const condition = JSON.stringify(gate.condition), group = groups.get(condition) || [];
    group.push(gate.id); groups.set(condition, group);
  }
  for (const ids of groups.values()) if (ids.length > 1) add(`open-gate-group:${ids.join(',')}`, 'open-gate-group', 'Does removing every edge controlled by this condition remove a dependency?', copy => {for (const board of copy.boards) board.gates = (board.gates || []).filter(gate => !ids.includes(gate.id));}, 'All edges with the identical condition are opened together; individual-edge comparisons are also recorded.');
  return variants;
}

/** Offline editorial audit. Each query and the complete pass have stated limits. */
export function auditPurpose(level, {maxStates = 12000, maxMs = 750, maxDepth = 180, maxTotalMs = 15000, includeAvoidance = true, avoidance, includeAblations = true} = {}) {
  const witness = analyzePurpose(level), started = now(), budget = {maxStates, maxMs, maxDepth, maxTotalMs};
  const run = callback => {
    const remaining = maxTotalMs - (now() - started);
    if (!(remaining > 0)) return {status: 'inconclusive', reason: 'total-time-budget', visited: 0, optimal: false};
    return callback({...budget, maxMs: Math.min(maxMs, remaining)});
  };
  if (!witness.valid || !witness.won) return {auditVersion: PURPOSE_AUDIT_VERSION, rulesVersion: RULES_VERSION, levelId: level?.id ?? null, budget, witness, status: witness.valid ? 'nonwinning-witness' : 'invalid-level-or-witness', ablations: [], avoidance: []};
  const baseline = run(options => solveLevel(level, options));
  const ablations = includeAblations ? buildPurposeAblations(level).map(({level: variant, ...description}) => {
    const result = variant ? run(options => solveLevel(variant, options)) : {status: 'not-applicable', reason: description.notApplicableReason, visited: 0};
    return {...description, result, ...(result.status === 'solved' && baseline.status === 'solved' && result.optimal && baseline.optimal ? {minimumCommandDelta: result.solution.length - baseline.solution.length} : {})};
  }) : [];
  const avoidQueries = avoidance ?? [
    ...witness.boxes.flatMap(box => [
      ...(box.directionChanges ? [{type: 'box-direction-change', boxId: box.id}] : []),
      ...(box.plateReleases.length ? [{type: 'box-plate-release', boxId: box.id}] : []),
      ...(box.plateReleases.some(release => release.afterGateSupport) ? [{type: 'box-support-release', boxId: box.id}] : []),
      ...(box.blockedPushes.some(stop => stop.afterPriorGateSupport) ? [{type: 'box-supported-stop', boxId: box.id}] : []),
      ...(box.postDeliveryPushes.length ? [{type: 'event', eventType: 'push', board: box.final.board, boxId: box.id}] : [])
    ]),
    ...level.boards.map((_, board) => board).filter(board => witness.dependencies.some(dependency => dependency.receiverBoard !== board && dependency.controllers.some(controller => controller.board === board))).map(board => ({type: 'helper-participation', board}))
  ];
  const avoidanceResults = includeAvoidance ? avoidQueries.map(avoid => ({avoid, result: run(options => findAvoidingSolution(level, {...options, avoid})), interpretation: 'A solved counterexample refutes necessity; only exhaustive unsolvable establishes necessity under this exact predicate.'})) : [];
  return {auditVersion: PURPOSE_AUDIT_VERSION, rulesVersion: RULES_VERSION, contentVersion: level.contentVersion ?? 1, levelId: level.id, seed: level.seed ?? null, budget, witness, baseline, ablations, avoidance: avoidanceResults,
    humanPlaytested: false, caveat: 'Automated evidence cannot certify clarity, enjoyment or human difficulty. Solvability and observed use do not by themselves establish editorial purpose.'};
}
