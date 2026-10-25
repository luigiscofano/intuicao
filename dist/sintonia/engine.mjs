/**
 * SINTONIA rules, version 1.
 *
 * This module has no DOM, storage, animation or random dependencies. Levels are
 * immutable values after their first use; invalidateLevelCache is provided for
 * authoring tools. Commands, solvers, certificates and hints use transition.
 */
export const RULES_VERSION = 1;
export const DIRECTIONS = Object.freeze(['up', 'right', 'down', 'left']);
const VECTORS = Object.freeze({up: [-1, 0], right: [0, 1], down: [1, 0], left: [0, -1]});
const ANIMALS = new Set(['capivara', 'tuiuiu', 'bemtevi', 'mico']);
const compiledLevels = new WeakMap();
const own = (object, key, fallback) => Object.hasOwn(object || {}, key) ? object[key] : fallback;
const edgeKey = (a, b) => a < b ? `${a}:${b}` : `${b}:${a}`;
const cellKey = (board, cell) => `${board}:${cell}`;
const clone = value => typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value));
const now = () => globalThis.performance?.now?.() ?? Date.now();
const compareText = (a, b) => a < b ? -1 : a > b ? 1 : 0;

export function invalidateLevelCache(level) { compiledLevels.delete(level); }

function compile(level) {
  let compiled = compiledLevels.get(level);
  if (compiled) return compiled;
  compiled = {boards: [], plates: new Map(), switches: new Set(), keys: new Set(), selectors: new Set(), channels: new Map(), boxOrigins: new Map(), boxReachable: new Map()};
  for (const [index, board] of (level.boards || []).entries()) {
    const gates = new Map();
    for (const gate of board.gates || []) {
      const key = edgeKey(gate.from, gate.to);
      if (!gates.has(key)) gates.set(key, []);
      gates.get(key).push(gate);
    }
    const portals = new Map();
    for (const portal of board.portals || []) {
      portals.set(portal.a, {id: portal.id, to: portal.b});
      portals.set(portal.b, {id: portal.id, to: portal.a});
    }
    const walkable = new Set(board.walkable || []);
    const neighbors = new Map();
    for (const cell of walkable) {
      const row = Math.floor(cell / board.cols), col = cell % board.cols;
      const cells = {};
      for (const [direction, [dr, dc]] of Object.entries(VECTORS)) {
        const r = row + dr, c = col + dc, next = r * board.cols + c;
        cells[direction] = r >= 0 && r < board.rows && c >= 0 && c < board.cols && walkable.has(next) ? next : -1;
      }
      neighbors.set(cell, cells);
    }
    const switches = new Map(), keys = new Map(), selectors = new Map();
    for (const plate of board.plates || []) compiled.plates.set(plate.id, {board: index, cell: plate.cell});
    for (const item of board.switches || []) { switches.set(item.cell, item); compiled.switches.add(item.group); }
    for (const item of board.keys || []) { keys.set(item.cell, item); compiled.keys.add(item.id); }
    for (const item of board.selectors || []) { selectors.set(item.cell, item); compiled.selectors.add(item.group); }
    for (const box of board.boxes || []) compiled.boxOrigins.set(box.id, {board: index, cell: box.cell});
    compiled.boards.push({walkable, neighbors, gates, portals, switches, keys, selectors,
      ice: new Set(board.ice || []), fragile: new Set(board.fragile || []),
      forbiddenDirections: new Set((board.oneWays || []).map(edge => `${edge.to}:${edge.from}`))});
  }
  for (const channel of level.channels || []) compiled.channels.set(cellKey(channel.fromBoard, channel.entry), channel);
  compiledLevels.set(level, compiled);
  return compiled;
}

export function initialState(level) {
  const compiled = compile(level);
  return {
    positions: level.boards.map(board => board.start),
    boxes: level.boards.flatMap((board, index) => (board.boxes || []).map(box => ({id: box.id, board: index, cell: box.cell}))),
    switches: Object.fromEntries([...compiled.switches].sort().map(group => [group, own(level.initialSwitches, group, false)])),
    keys: [],
    selectors: Object.fromEntries([...compiled.selectors].sort().map(group => [group, own(level.initialSelectors, group, 0)])),
    collapsed: []
  };
}

/** A canonical key contains every logical property, never UI metadata. */
export function stateKey(state) {
  const entries = object => Object.entries(object || {}).sort(([a], [b]) => compareText(a, b));
  return JSON.stringify([
    state.positions,
    (state.boxes || []).map(box => [box.id, box.board, box.cell]).sort((a, b) => compareText(String(a[0]), String(b[0]))),
    entries(state.switches), [...(state.keys || [])].sort(), entries(state.selectors), [...(state.collapsed || [])].sort()
  ]);
}

export function isWon(level, state) {
  return state.positions?.length === level.boards.length && level.boards.every((board, index) => state.positions[index] === board.goal);
}

function occupiedPlates(compiled, state) {
  const occupied = new Set();
  const boxes = new Set((state.boxes || []).map(box => cellKey(box.board, box.cell)));
  for (const [id, plate] of compiled.plates) {
    if (state.positions[plate.board] === plate.cell || boxes.has(cellKey(plate.board, plate.cell))) occupied.add(id);
  }
  return occupied;
}

function conditionOpen(condition, state, plates, keys) {
  if (!condition) return false;
  switch (condition.type) {
    case 'plate': return plates.has(condition.id);
    case 'all': return condition.ids.length > 0 && condition.ids.every(id => plates.has(id));
    case 'switch': return own(state.switches, condition.id, false) === condition.value;
    case 'key': return keys.has(condition.id);
    case 'selected': return plates.has(condition.plate) && own(state.selectors, condition.selector, 0) === condition.value;
    default: return false;
  }
}

export function gateIsOpen(level, state, gate) {
  return conditionOpen(gate.condition, state, occupiedPlates(compile(level), state), new Set(state.keys || []));
}

function snapshot(compiled, state) {
  const plates = occupiedPlates(compiled, state), keys = new Set(state.keys || []);
  return {collapsed: new Set(state.collapsed || []),
    boxes: new Map((state.boxes || []).map(box => [cellKey(box.board, box.cell), box])),
    open: new Set(compiled.boards.flatMap(board => [...board.gates.values()].flat().filter(gate => conditionOpen(gate.condition, state, plates, keys))))};
}

function crosses(compiled, frozen, boardIndex, from, to) {
  const board = compiled.boards[boardIndex];
  if (!board || !board.walkable.has(from) || !board.walkable.has(to) || frozen.collapsed.has(cellKey(boardIndex, from)) || frozen.collapsed.has(cellKey(boardIndex, to))) return false;
  if (!Object.values(board.neighbors.get(from) || {}).includes(to)) return false;
  if (board.forbiddenDirections.has(`${from}:${to}`)) return false;
  return (board.gates.get(edgeKey(from, to)) || []).every(gate => frozen.open.has(gate));
}

export function canCross(level, state, boardIndex, from, to) {
  const compiled = compile(level);
  return crosses(compiled, snapshot(compiled, state), boardIndex, from, to);
}

function crossingEvents(compiled, boardIndex, from, to) {
  const board = compiled.boards[boardIndex], result = [];
  for (const gate of board.gates.get(edgeKey(from, to)) || []) result.push({type: 'gate', board: boardIndex, id: gate.id, from, to, condition: gate.condition});
  if (board.forbiddenDirections.has(`${to}:${from}`)) result.push({type: 'oneway', board: boardIndex, from, to});
  return result;
}

function intentForBoard(level, compiled, frozen, state, boardIndex, direction) {
  const board = compiled.boards[boardIndex], start = state.positions[boardIndex];
  const intent = {board: boardIndex, start, end: start, path: [start], events: [], push: null, delivery: null};
  let cell = start, steps = 0, enteredIce = false;
  // Ice travels in a straight finite line. Portals end the command immediately.
  for (let guard = 0; guard <= level.boards[boardIndex].walkable.length; guard++) {
    const next = board.neighbors.get(cell)?.[direction] ?? -1;
    if (next < 0 || !crosses(compiled, frozen, boardIndex, cell, next)) break;
    const box = frozen.boxes.get(cellKey(boardIndex, next));
    if (box) {
      // Valid levels never allow ice to meet a box. Each command pushes one box by one cell.
      if (steps > 0 || intent.push) break;
      const beyond = board.neighbors.get(next)?.[direction] ?? -1;
      if (beyond < 0 || !crosses(compiled, frozen, boardIndex, next, beyond) || frozen.boxes.has(cellKey(boardIndex, beyond))) break;
      intent.push = {id: box.id, from: next, to: beyond};
      intent.events.push(...crossingEvents(compiled, boardIndex, next, beyond));
      const channel = compiled.channels.get(cellKey(boardIndex, beyond));
      if (channel) intent.delivery = {...channel, box: box.id};
      intent.events.push({type: 'push', board: boardIndex, id: box.id, from: next, to: beyond});
    }
    intent.events.push(...crossingEvents(compiled, boardIndex, cell, next));
    intent.events.push({type: 'move', board: boardIndex, from: cell, to: next});
    cell = next; intent.path.push(cell); steps++;
    const portal = board.portals.get(cell);
    if (portal) {
      if (!frozen.collapsed.has(cellKey(boardIndex, portal.to)) && !frozen.boxes.has(cellKey(boardIndex, portal.to))) {
        intent.events.push({type: 'portal', board: boardIndex, id: portal.id, from: cell, to: portal.to});
        cell = portal.to; intent.path.push(cell);
      }
      break;
    }
    if (!board.ice.has(cell) || intent.push) break;
    enteredIce = true;
  }
  intent.end = cell;
  if (enteredIce) intent.events.push({type: 'ice', board: boardIndex, from: start, to: cell, steps});
  return intent;
}

/** Resolve a whole shared command against the same initial gate state. */
export function transition(level, state, direction) {
  if (!Object.hasOwn(VECTORS, direction)) throw new RangeError(`Comando desconhecido: ${String(direction)}`);
  const compiled = compile(level), frozen = snapshot(compiled, state);
  const intents = level.boards.map((_, index) => intentForBoard(level, compiled, frozen, state, index, direction));
  const requests = intents.filter(intent => intent.delivery);
  const requestBoxes = new Set(requests.map(intent => intent.delivery.box));
  const rejected = new Map();
  const initialOccupancy = new Set([
    ...state.positions.map((cell, board) => cellKey(board, cell)),
    ...(state.boxes || []).map(box => cellKey(box.board, box.cell))
  ]);
  const competingOccupancy = new Set(intents.map(intent => cellKey(intent.board, intent.end)));
  for (const box of state.boxes || []) {
    if (requestBoxes.has(box.id)) continue;
    const push = intents[box.board].push;
    competingOccupancy.add(cellKey(box.board, push?.id === box.id ? push.to : box.cell));
  }
  const targetCounts = new Map();
  for (const {delivery} of requests) {
    const key = cellKey(delivery.toBoard, delivery.exit);
    targetCounts.set(key, (targetCounts.get(key) || 0) + 1);
  }
  for (const intent of requests) {
    const delivery = intent.delivery, target = cellKey(delivery.toBoard, delivery.exit);
    if (!compiled.boards[delivery.toBoard]?.walkable.has(delivery.exit) || frozen.collapsed.has(target)) rejected.set(intent.board, 'blocked-terrain');
    else if (initialOccupancy.has(target)) rejected.set(intent.board, 'initially-occupied');
    else if (targetCounts.get(target) > 1) rejected.set(intent.board, 'competing-deliveries');
    else if (competingOccupancy.has(target)) rejected.set(intent.board, 'competing-movement');
  }
  const next = {
    positions: intents.map(intent => rejected.has(intent.board) ? intent.start : intent.end),
    boxes: (state.boxes || []).map(box => {
      const intent = intents[box.board];
      if (intent.push?.id !== box.id || rejected.has(intent.board)) return {...box};
      if (intent.delivery) return {id: box.id, board: intent.delivery.toBoard, cell: intent.delivery.exit};
      return {id: box.id, board: box.board, cell: intent.push.to};
    }),
    switches: {...state.switches}, keys: [...(state.keys || [])], selectors: {...state.selectors}, collapsed: [...(state.collapsed || [])]
  };
  const events = [], collapsed = new Set(next.collapsed), collectedKeys = new Set(next.keys);
  for (const intent of intents) {
    const boardIndex = intent.board, board = compiled.boards[boardIndex];
    if (rejected.has(boardIndex)) {
      events.push({type: 'deliveryBlocked', id: intent.delivery.id, box: intent.delivery.box, reason: rejected.get(boardIndex)});
      continue;
    }
    events.push(...intent.events);
    if (intent.delivery) events.push({...intent.delivery, type: 'delivery'});
    for (const departed of intent.path.slice(0, -1)) {
      const key = cellKey(boardIndex, departed);
      if (board.fragile.has(departed) && !collapsed.has(key)) {
        collapsed.add(key); events.push({type: 'fragile', board: boardIndex, cell: departed});
      }
    }
    // End-position triggers act only on entry, after all positions are settled.
    if (intent.end === intent.start) continue;
    const toggle = board.switches.get(intent.end);
    if (toggle) {
      next.switches[toggle.group] = !own(next.switches, toggle.group, false);
      events.push({type: 'switch', board: boardIndex, id: toggle.id, group: toggle.group, value: next.switches[toggle.group]});
    }
    const selector = board.selectors.get(intent.end);
    if (selector) {
      next.selectors[selector.group] = own(next.selectors, selector.group, 0) === 0 ? 1 : 0;
      events.push({type: 'selector', board: boardIndex, id: selector.id, group: selector.group, value: next.selectors[selector.group]});
    }
    const key = board.keys.get(intent.end);
    if (key && !collectedKeys.has(key.id)) {
      collectedKeys.add(key.id); events.push({type: 'key', board: boardIndex, id: key.id});
    }
  }
  next.keys = [...collectedKeys].sort(); next.collapsed = [...collapsed].sort();
  // A structural comparison avoids serializing two complete states on every
  // search edge, while still checking mechanisms and deliveries as well as animals.
  const changed = next.positions.some((cell, index) => cell !== state.positions[index])
    || next.boxes.some((box, index) => box.board !== state.boxes[index].board || box.cell !== state.boxes[index].cell)
    || next.keys.length !== state.keys.length || next.collapsed.length !== state.collapsed.length
    || Object.entries(next.switches).some(([id, value]) => value !== state.switches[id])
    || Object.entries(next.selectors).some(([id, value]) => value !== state.selectors[id]);
  return {state: changed ? next : state, changed, won: isWon(level, next), events};
}

/** Structural validation is intentionally independent of solvability. */
export function validateLevel(level) {
  const errors = [];
  const error = message => errors.push(message);
  if (!level || typeof level !== 'object' || Array.isArray(level)) return {valid: false, errors: ['A fase deve ser um objeto.']};
  if (level.rulesVersion !== undefined && level.rulesVersion !== RULES_VERSION) error('Versão de regras incompatível.');
  if (level.version !== undefined && level.version !== 1) error('Versão de definição incompatível.');
  if (!Array.isArray(level.boards) || level.boards.length < 2 || level.boards.length > 4) return {valid: false, errors: [...errors, 'Use de dois a quatro tabuleiros.']};
  const idPattern = /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,95}$/;
  const validId = id => typeof id === 'string' && idPattern.test(id) && !['constructor', 'prototype', '__proto__'].includes(id);
  const ids = {board: new Set(), box: new Set(), plate: new Set(), switch: new Set(), key: new Set(), selector: new Set(), portal: new Set(), gate: new Set(), channel: new Set()};
  const switchGroups = new Set(), selectorGroups = new Set(), allGates = [], channelEntries = new Set();
  const boards = [], boxOrigins = [];
  const register = (type, id, context) => {
    if (!validId(id)) error(`${context}: identificador inválido.`);
    else if (ids[type].has(id)) error(`${context}: identificador repetido ${id}.`);
    else ids[type].add(id);
  };
  level.boards.forEach((board, index) => {
    const context = `Tabuleiro ${index + 1}`;
    if (!board || typeof board !== 'object' || Array.isArray(board)) { error(`${context}: definição inválida.`); boards.push(null); return; }
    register('board', board.id, context);
    if (!ANIMALS.has(board.animal)) error(`${context}: animal desconhecido.`);
    if (!Number.isInteger(board.rows) || !Number.isInteger(board.cols) || board.rows < 1 || board.cols < 1 || board.rows > 16 || board.cols > 16 || board.rows * board.cols > 256) error(`${context}: dimensões inválidas.`);
    const inBounds = cell => Number.isInteger(cell) && cell >= 0 && cell < board.rows * board.cols;
    if (!Array.isArray(board.walkable) || !board.walkable.length) error(`${context}: casas livres ausentes.`);
    const walkable = new Set(Array.isArray(board.walkable) ? board.walkable : []);
    if (walkable.size !== board.walkable?.length || [...walkable].some(cell => !inBounds(cell))) error(`${context}: casas livres repetidas ou fora da grade.`);
    const validCell = (cell, name) => { if (!inBounds(cell) || !walkable.has(cell)) error(`${context}: ${name} fora de uma casa transitável.`); };
    validCell(board.start, 'início'); validCell(board.goal, 'destino');
    const special = new Map(), localBoxes = new Set(), portals = new Map();
    const mark = (cell, type) => {
      validCell(cell, type);
      if (special.has(cell)) error(`${context}: ${type} sobreposto a ${special.get(cell)}.`);
      else special.set(cell, type);
    };
    const array = field => {
      if (board[field] !== undefined && !Array.isArray(board[field])) { error(`${context}: ${field} deve ser uma lista.`); return []; }
      return board[field] || [];
    };
    for (const item of array('boxes')) {
      if (!item || typeof item !== 'object') { error(`${context}: caixa inválida.`); continue; }
      register('box', item.id, `${context}, caixa`); validCell(item.cell, 'caixa');
      if (localBoxes.has(item.cell) || item.cell === board.start) error(`${context}: ocupação inicial de caixa inválida.`);
      localBoxes.add(item.cell); boxOrigins.push({board: index, cell: item.cell});
    }
    for (const item of array('plates')) {
      if (!item || typeof item !== 'object') { error(`${context}: placa inválida.`); continue; }
      register('plate', item.id, `${context}, placa`); mark(item.cell, 'placa');
    }
    for (const item of array('switches')) {
      if (!item || typeof item !== 'object') { error(`${context}: interruptor inválido.`); continue; }
      register('switch', item.id, `${context}, interruptor`); mark(item.cell, 'interruptor');
      if (!validId(item.group) || switchGroups.has(item.group)) error(`${context}: cada grupo alternável deve ter exatamente um interruptor.`);
      switchGroups.add(item.group);
      if (board.start === item.cell) error(`${context}: o início não pode ocupar um interruptor.`);
    }
    for (const item of array('keys')) {
      if (!item || typeof item !== 'object') { error(`${context}: chave inválida.`); continue; }
      register('key', item.id, `${context}, chave`); mark(item.cell, 'chave');
      if (board.start === item.cell) error(`${context}: o início não pode ocupar uma chave.`);
    }
    for (const item of array('selectors')) {
      if (!item || typeof item !== 'object') { error(`${context}: seletor inválido.`); continue; }
      register('selector', item.id, `${context}, seletor`); mark(item.cell, 'seletor');
      if (!validId(item.group) || selectorGroups.has(item.group)) error(`${context}: cada conexão deve ter exatamente um seletor.`);
      selectorGroups.add(item.group);
      if (board.start === item.cell) error(`${context}: o início não pode ocupar um seletor.`);
    }
    for (const cell of array('ice')) mark(cell, 'gelo');
    for (const cell of array('fragile')) mark(cell, 'ponte frágil');
    for (const portal of array('portals')) {
      if (!portal || typeof portal !== 'object') { error(`${context}: portal inválido.`); continue; }
      register('portal', portal.id, `${context}, portal`); mark(portal.a, 'portal'); mark(portal.b, 'portal');
      if (portal.a === portal.b) error(`${context}: o portal precisa de duas casas diferentes.`);
      portals.set(portal.a, portal.b); portals.set(portal.b, portal.a);
    }
    const adjacent = (a, b) => inBounds(a) && inBounds(b) && Math.abs(Math.floor(a / board.cols) - Math.floor(b / board.cols)) + Math.abs(a % board.cols - b % board.cols) === 1;
    const gateEdges = new Set(), oneWayEdges = new Set();
    for (const gate of array('gates')) {
      if (!gate || typeof gate !== 'object') { error(`${context}: cancela inválida.`); continue; }
      register('gate', gate.id, `${context}, cancela`); validCell(gate.from, 'extremo de cancela'); validCell(gate.to, 'extremo de cancela');
      const key = edgeKey(gate.from, gate.to);
      if (!adjacent(gate.from, gate.to) || gateEdges.has(key)) error(`${context}: cancelas devem ocupar divisórias únicas entre casas vizinhas.`);
      gateEdges.add(key); allGates.push({gate, context});
    }
    for (const edge of array('oneWays')) {
      if (!edge || typeof edge !== 'object') { error(`${context}: passagem dirigida inválida.`); continue; }
      validCell(edge.from, 'extremo de passagem'); validCell(edge.to, 'extremo de passagem');
      const key = edgeKey(edge.from, edge.to);
      if (!adjacent(edge.from, edge.to) || oneWayEdges.has(key)) error(`${context}: sentido único duplicado ou fora de uma divisória.`);
      oneWayEdges.add(key);
    }
    boards.push({walkable, special, portals, rows: board.rows, cols: board.cols});
  });
  for (const {gate, context} of allGates) {
    const condition = gate.condition;
    if (!condition || typeof condition !== 'object') { error(`${context}: cancela sem condição declarada.`); continue; }
    switch (condition.type) {
      case 'plate': if (!ids.plate.has(condition.id)) error(`${context}: cancela referencia placa inexistente.`); break;
      case 'all': if (!Array.isArray(condition.ids) || condition.ids.length < 2 || new Set(condition.ids).size !== condition.ids.length || condition.ids.some(id => !ids.plate.has(id))) error(`${context}: condição conjunta requer placas existentes e distintas.`); break;
      case 'switch': if (!switchGroups.has(condition.id) || typeof condition.value !== 'boolean') error(`${context}: estado de interruptor inválido.`); break;
      case 'key': if (!ids.key.has(condition.id)) error(`${context}: cancela referencia chave inexistente.`); break;
      case 'selected': if (!ids.plate.has(condition.plate) || !selectorGroups.has(condition.selector) || ![0, 1].includes(condition.value)) error(`${context}: conexão selecionável inválida.`); break;
      default: error(`${context}: condição de cancela não implementada.`);
    }
  }
  for (const [field, groups, allowed] of [['initialSwitches', switchGroups, value => typeof value === 'boolean'], ['initialSelectors', selectorGroups, value => value === 0 || value === 1]]) {
    if (level[field] !== undefined && (!level[field] || typeof level[field] !== 'object' || Array.isArray(level[field]))) { error(`${field}: configuração inválida.`); continue; }
    for (const [id, value] of Object.entries(level[field] || {})) if (!groups.has(id) || !allowed(value)) error(`${field}: grupo ou estado inválido.`);
  }
  const channels = Array.isArray(level.channels) ? level.channels : [];
  if (level.channels !== undefined && !Array.isArray(level.channels)) error('Os canais devem ser uma lista.');
  const channelGraph = level.boards.map(() => new Set()), destinations = new Map();
  for (const channel of channels) {
    if (!channel || typeof channel !== 'object') { error('Canal inválido.'); continue; }
    register('channel', channel.id, 'Canal');
    if (!Number.isInteger(channel.fromBoard) || !Number.isInteger(channel.toBoard) || !boards[channel.fromBoard] || !boards[channel.toBoard] || channel.fromBoard === channel.toBoard) { error('O canal precisa conectar dois tabuleiros distintos.'); continue; }
    const from = boards[channel.fromBoard], to = boards[channel.toBoard], entry = cellKey(channel.fromBoard, channel.entry);
    if (!from.walkable.has(channel.entry) || !to.walkable.has(channel.exit)) error('O canal deve conectar casas transitáveis.');
    if (channelEntries.has(entry)) error('Duas entregas não podem partir da mesma entrada.');
    channelEntries.add(entry);
    // Plates may share delivery endpoints; other triggers would obscure the rule.
    if ([from.special.get(channel.entry), to.special.get(channel.exit)].some(type => type && type !== 'placa')) error('Entradas e saídas de entrega aceitam piso comum ou placa.');
    channelGraph[channel.fromBoard].add(channel.toBoard); destinations.set(entry, {board: channel.toBoard, cell: channel.exit});
  }
  const active = new Set(), visited = new Set();
  function cycle(board) {
    if (active.has(board)) return true;
    if (visited.has(board)) return false;
    active.add(board);
    for (const next of channelGraph[board]) if (cycle(next)) return true;
    active.delete(board); visited.add(board); return false;
  }
  if (channelGraph.some((_, index) => cycle(index))) error('Redes cíclicas de entrega não são suportadas nesta versão.');
  // Conservative reachability treats gates as potentially open. It never adds an
  // invisible box barrier to the game: unsupported terrain is rejected here.
  const reached = new Set(), queue = [...boxOrigins];
  for (let head = 0; head < queue.length; head++) {
    const current = queue[head], key = cellKey(current.board, current.cell), board = boards[current.board];
    if (reached.has(key) || !board?.walkable.has(current.cell)) continue;
    reached.add(key);
    if (['gelo', 'portal', 'ponte frágil'].includes(board.special.get(current.cell))) { error('Uma caixa pode alcançar gelo, portal ou ponte frágil; separe essas mecânicas por percursos inacessíveis às caixas.'); break; }
    const row = Math.floor(current.cell / board.cols), col = current.cell % board.cols;
    for (const [dr, dc] of Object.values(VECTORS)) {
      const r = row + dr, c = col + dc, cell = r * board.cols + c;
      if (r >= 0 && r < board.rows && c >= 0 && c < board.cols && board.walkable.has(cell)) queue.push({board: current.board, cell});
    }
    if (destinations.has(key)) queue.push(destinations.get(key));
  }
  return {valid: errors.length === 0, errors};
}

/** Validate restored/imported logical states before feeding them to the engine. */
export function validateState(level, state) {
  const errors = [], compiled = compile(level);
  if (!state || typeof state !== 'object' || !Array.isArray(state.positions) || state.positions.length !== level.boards.length) return {valid: false, errors: ['É necessária uma posição por animal.']};
  for (const field of ['boxes', 'keys', 'collapsed']) if (!Array.isArray(state[field])) errors.push(`Estado ${field} inválido.`);
  for (const field of ['switches', 'selectors']) if (!state[field] || typeof state[field] !== 'object' || Array.isArray(state[field])) errors.push(`Estado ${field} inválido.`);
  if (errors.length) return {valid: false, errors};
  const occupied = new Set(), collapsed = new Set(state.collapsed);
  if (collapsed.size !== state.collapsed.length) errors.push('Pontes repetidas no estado.');
  for (const key of collapsed) {
    if (typeof key !== 'string' || !/^\d+:\d+$/.test(key)) { errors.push('Ponte inválida no estado.'); continue; }
    const [board, cell] = key.split(':').map(Number);
    if (!compiled.boards[board]?.fragile.has(cell)) errors.push('O estado contém uma ponte inexistente.');
  }
  state.positions.forEach((cell, board) => {
    const key = cellKey(board, cell);
    if (!compiled.boards[board].walkable.has(cell) || collapsed.has(key)) errors.push('Animal fora de uma casa transitável.');
    const collected = compiled.boards[board].keys.get(cell);
    if (collected && !state.keys.includes(collected.id)) errors.push('Uma chave ocupada pelo animal precisa ter sido recolhida.');
    occupied.add(key);
  });
  const expectedBoxes = new Set(level.boards.flatMap(board => (board.boxes || []).map(box => box.id))), boxes = new Set();
  for (const box of state.boxes) {
    if (!box || !expectedBoxes.has(box.id) || boxes.has(box.id) || !Number.isInteger(box.board) || !compiled.boards[box.board]?.walkable.has(box.cell)) { errors.push('Caixa inválida no estado.'); continue; }
    boxes.add(box.id);
    const key = cellKey(box.board, box.cell);
    if (occupied.has(key) || collapsed.has(key)) errors.push('Ocupação inválida de caixa.');
    if (!potentialBoxCells(compiled, box.id).has(key)) errors.push('Caixa fora dos percursos e canais disponíveis.');
    occupied.add(key);
  }
  if (boxes.size !== expectedBoxes.size) errors.push('O estado perdeu uma caixa.');
  for (const [field, groups, allowed] of [['switches', compiled.switches, value => typeof value === 'boolean'], ['selectors', compiled.selectors, value => value === 0 || value === 1]]) {
    if (Object.keys(state[field]).length !== groups.size) errors.push(`Grupos ${field} incompletos.`);
    for (const [id, value] of Object.entries(state[field])) if (!groups.has(id) || !allowed(value)) errors.push(`Grupo ${field} inválido.`);
  }
  if (new Set(state.keys).size !== state.keys.length || state.keys.some(id => !compiled.keys.has(id))) errors.push('Chaves inválidas no estado.');
  return {valid: errors.length === 0, errors};
}

function potentialBoxCells(compiled, id) {
  if (compiled.boxReachable.has(id)) return compiled.boxReachable.get(id);
  const origin = compiled.boxOrigins.get(id), reached = new Set(), queue = origin ? [origin] : [];
  for (let head = 0; head < queue.length; head++) {
    const {board, cell} = queue[head], key = cellKey(board, cell);
    if (reached.has(key)) continue;
    reached.add(key);
    for (const neighbor of Object.values(compiled.boards[board].neighbors.get(cell) || {})) if (neighbor >= 0) queue.push({board, cell: neighbor});
    const channel = compiled.channels.get(key);
    if (channel) queue.push({board: channel.toBoard, cell: channel.exit});
  }
  compiled.boxReachable.set(id, reached);
  return reached;
}

export function replay(level, commands, {state, recordStates = false} = {}) {
  const validation = validateLevel(level);
  if (!validation.valid) return {state: state ?? null, won: false, valid: false, error: validation.errors.join(' ')};
  state ??= initialState(level);
  const stateValidation = validateState(level, state);
  if (!stateValidation.valid) return {state, won: false, valid: false, error: stateValidation.errors.join(' ')};
  if (!Array.isArray(commands) || commands.some(command => !DIRECTIONS.includes(command))) return {state, won: false, valid: false, error: 'A solução contém um comando inválido.'};
  let current = clone(state);
  const states = recordStates ? [current] : undefined;
  for (const command of commands) {
    current = transition(level, current, command).state;
    if (states) states.push(current);
  }
  return {state: current, won: isWon(level, current), valid: true, ...(states ? {states} : {})};
}

/** Breadth-first search proves minimum command count only when it finds a goal. */
export function solveLevel(level, {state, maxStates = 60000, maxMs = 2000, maxDepth = Infinity} = {}) {
  const validation = validateLevel(level);
  if (validation.valid) state ??= initialState(level);
  const stateValidation = validation.valid ? validateState(level, state) : {valid: false, errors: []};
  if (!validation.valid || !stateValidation.valid) return {status: 'inconclusive', reason: 'invalid-input', errors: [...validation.errors, ...stateValidation.errors], visited: 0, optimal: false};
  if (isWon(level, state)) return {status: 'solved', solution: [], visited: 1, optimal: true};
  if (!(maxStates >= 1) || !(maxMs > 0) || !(maxDepth >= 0)) return {status: 'inconclusive', reason: 'budget', visited: 0, optimal: false};
  const deadline = now() + maxMs;
  const nodes = [{state: clone(state), parent: -1, direction: null, depth: 0}];
  const seen = new Map([[stateKey(state), 0]]);
  let depthLimited = false;
  const incomplete = reason => ({status: 'inconclusive', reason, visited: seen.size, optimal: false});
  for (let head = 0; head < nodes.length; head++) {
    if ((head & 31) === 0 && now() >= deadline) return incomplete('time-budget');
    const node = nodes[head];
    for (const direction of DIRECTIONS) {
      const result = transition(level, node.state, direction);
      if (!result.changed) continue;
      const key = stateKey(result.state);
      if (seen.has(key)) continue;
      if (node.depth >= maxDepth) { depthLimited = true; continue; }
      if (result.won) {
        const solution = [direction];
        let at = head;
        while (nodes[at].parent !== -1) { solution.push(nodes[at].direction); at = nodes[at].parent; }
        solution.reverse();
        return {status: 'solved', solution, visited: seen.size + 1, optimal: true};
      }
      if (seen.size >= maxStates) return incomplete('state-budget');
      seen.set(key, nodes.length);
      nodes.push({state: result.state, parent: head, direction, depth: node.depth + 1});
    }
  }
  return depthLimited ? incomplete('depth-budget') : {status: 'unsolvable', visited: seen.size, optimal: false};
}
