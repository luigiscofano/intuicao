/** REPASSE: one deterministic, atomic removal. No rendering or persistence here. */
export const RULES_VERSION = 1;
export const DIRECTIONS = Object.freeze(['up', 'right', 'down', 'left']);
export const SIDES = Object.freeze(['top', 'right', 'bottom', 'left']);
export const LIMITS = Object.freeze({rows: 12, cols: 12, pieces: 32, integer: Number.MAX_SAFE_INTEGER});
const SIDE = {up: 'top', right: 'right', down: 'bottom', left: 'left'};
const SAFE = BigInt(Number.MAX_SAFE_INTEGER);
const positive = n => Number.isSafeInteger(n) && n > 0;
const natural = n => Number.isSafeInteger(n) && n >= 0;
const boxSize = (level, side) => side === 'top' || side === 'bottom' ? level.cols : level.rows;
const copyBoxes = boxes => Object.fromEntries(SIDES.map(side => [side, [...boxes[side]]]));
const now = () => globalThis.performance?.now?.() ?? Date.now();

export function configurationOf(directions) {
  if (!Array.isArray(directions)) return null;
  const dirs = new Set(directions);
  if (dirs.size !== directions.length || Array.from(directions).some(d => !DIRECTIONS.includes(d))) return null;
  if (dirs.size === 1) return 'single';
  if (dirs.size === 4) return 'four';
  if (dirs.size !== 2) return null;
  return dirs.has('up') && dirs.has('down') || dirs.has('left') && dirs.has('right') ? 'original' : 'corner';
}

function arithmeticBound(pieces) {
  let total = 0n, multiplier = 1n;
  for (const piece of pieces) {
    total += BigInt(piece.value);
    multiplier *= BigInt(piece.directions.length);
  }
  return total * multiplier;
}

export function validateLevel(level) {
  const errors = [];
  if (!level || typeof level !== 'object' || Array.isArray(level)) return {valid: false, errors: ['A fase deve ser um objeto.']};
  if (!(positive(level.id) || typeof level.id === 'string' && level.id.length > 0 && level.id.length <= 128)) errors.push('ID de fase inválido.');
  if (level.version !== 1) errors.push('Versão de fase incompatível.');
  if (level.rulesVersion !== RULES_VERSION) errors.push('Versão das regras incompatível.');
  if (!positive(level.rows) || level.rows > LIMITS.rows || !positive(level.cols) || level.cols > LIMITS.cols) errors.push('A grade deve ter entre 1 e 12 linhas e colunas.');
  const pieces = level.pieces;
  if (!Array.isArray(pieces) || !pieces.length || pieces.length > LIMITS.pieces) errors.push('A fase deve ter entre 1 e 32 peças.');
  else {
    const ids = new Set(), cells = new Set();
    let arithmeticValid = true;
    for (let i = 0; i < pieces.length; i++) {
      const p = pieces[i];
      if (!p || typeof p !== 'object' || Array.isArray(p)) { errors.push(`Peça ${i + 1} inválida.`); arithmeticValid = false; continue; }
      if (typeof p.id !== 'string' || !p.id || p.id.length > 64 || ids.has(p.id)) errors.push(`ID inválido ou repetido na peça ${i + 1}.`);
      ids.add(p.id);
      if (!natural(p.row) || p.row >= level.rows || !natural(p.col) || p.col >= level.cols) errors.push(`Posição inválida na peça ${i + 1}.`);
      const cell = `${p.row},${p.col}`;
      if (cells.has(cell)) errors.push(`Duas peças ocupam a casa ${cell}.`);
      cells.add(cell);
      if (!positive(p.value)) { errors.push(`O valor da peça ${i + 1} deve ser inteiro positivo e seguro.`); arithmeticValid = false; }
      if (!configurationOf(p.directions)) { errors.push(`Direções inválidas na peça ${i + 1}. Use uma, duas ou quatro setas cardeais distintas.`); arithmeticValid = false; }
    }
    // This deliberately conservative bound covers even losing orders. No value
    // is rounded or clipped during play; an unsafe definition is rejected.
    if (arithmeticValid && arithmeticBound(pieces) > SAFE) errors.push('A fase pode exceder o limite de inteiros exatos em uma ordem de retirada.');
  }
  if (!level.targets || typeof level.targets !== 'object' || Array.isArray(level.targets)) errors.push('Faltam as quatro séries de metas.');
  else for (const side of SIDES) {
    const values = level.targets[side];
    if (!Array.isArray(values) || values.length !== boxSize(level, side) || Array.from(values).some(v => !natural(v))) errors.push(`Metas inválidas na borda ${side}.`);
  }
  if (level.solution !== undefined && (!Array.isArray(level.solution) || level.solution.length > LIMITS.pieces || Array.from(level.solution).some(id => typeof id !== 'string'))) errors.push('A solução deve ser uma lista de IDs de peças.');
  return {valid: errors.length === 0, errors};
}

function stateErrors(level, state) {
  const errors = [];
  if (!state || typeof state !== 'object' || Array.isArray(state)) return ['Estado inválido.'];
  if (!Array.isArray(state.values) || state.values.length !== level.pieces.length) errors.push('Quantidade de valores incompatível com as peças.');
  else for (let i = 0; i < state.values.length; i++) {
    const value = state.values[i];
    if (!natural(value) || value > 0 && value < level.pieces[i].value) errors.push(`Valor atual inválido na peça ${i + 1}.`);
  }
  if (!state.boxes || typeof state.boxes !== 'object' || Array.isArray(state.boxes)) errors.push('Acumulados das bordas ausentes.');
  else for (const side of SIDES) {
    const values = state.boxes[side];
    if (!Array.isArray(values) || values.length !== boxSize(level, side) || Array.from(values).some(v => !natural(v))) errors.push(`Acumulados inválidos na borda ${side}.`);
  }
  if (!errors.length) {
    const total = [...state.values, ...SIDES.flatMap(s => state.boxes[s])].reduce((sum, v) => sum + BigInt(v), 0n);
    if (total > arithmeticBound(level.pieces)) errors.push('O estado excede o limite aritmético da definição.');
  }
  return errors;
}

export function validateState(level, state) {
  const checked = validateLevel(level);
  if (!checked.valid) return checked;
  const errors = stateErrors(level, state);
  return {valid: errors.length === 0, errors};
}

function assertLevel(level) {
  const checked = validateLevel(level);
  if (!checked.valid) throw new TypeError(checked.errors.join(' '));
}
function assertState(level, state) {
  const errors = stateErrors(level, state);
  if (errors.length) throw new TypeError(errors.join(' '));
}

export function initialState(level) {
  assertLevel(level);
  return {values: level.pieces.map(p => p.value), boxes: Object.fromEntries(SIDES.map(side => [side, Array(boxSize(level, side)).fill(0)]))};
}

function compile(level) {
  const indexes = new Map(level.pieces.map((p, i) => [p.id, i]));
  const rays = level.pieces.map((piece, index) => Object.fromEntries(DIRECTIONS.map(direction => {
    const horizontal = direction === 'left' || direction === 'right';
    const sign = direction === 'up' || direction === 'left' ? -1 : 1;
    const aligned = level.pieces.flatMap((p, i) => {
      if (i === index || (horizontal ? p.row !== piece.row : p.col !== piece.col)) return [];
      const distance = ((horizontal ? p.col - piece.col : p.row - piece.row) * sign);
      return distance > 0 ? [{index: i, distance}] : [];
    }).sort((a, b) => a.distance - b.distance).map(x => x.index);
    return [direction, aligned];
  })));
  const lines = Object.fromEntries(SIDES.map(side => [side, Array.from({length: boxSize(level, side)}, (_, line) => level.pieces.flatMap((p, i) => {
    if ((side === 'top' || side === 'bottom' ? p.col : p.row) !== line) return [];
    return [{index: i, distance: side === 'top' ? p.row : side === 'bottom' ? level.rows - 1 - p.row : side === 'left' ? p.col : level.cols - 1 - p.col}];
  }).sort((a, b) => a.distance - b.distance).map(x => x.index))]));
  return {level, indexes, rays, lines, targetTotal: SIDES.flatMap(s => level.targets[s]).reduce((sum, v) => sum + BigInt(v), 0n)};
}

function transfersFor(context, state, index) {
  const piece = context.level.pieces[index], value = state.values[index];
  if (!value) return [];
  return DIRECTIONS.filter(d => piece.directions.includes(d)).map(direction => {
    const receiver = context.rays[index][direction].find(i => state.values[i] > 0);
    const to = receiver !== undefined
      ? {kind: 'piece', id: context.level.pieces[receiver].id, index: receiver, row: context.level.pieces[receiver].row, col: context.level.pieces[receiver].col}
      : {kind: 'box', side: SIDE[direction], index: direction === 'up' || direction === 'down' ? piece.col : piece.row};
    return {direction, value, to};
  });
}

export function preview(level, state, pieceId) {
  assertLevel(level); assertState(level, state);
  const context = compile(level), index = context.indexes.get(pieceId);
  return index === undefined ? [] : transfersFor(context, state, index);
}

function classify(level, state) {
  const remaining = state.values.reduce((sum, v) => sum + (v > 0), 0), overruns = [];
  let exact = true;
  for (const side of SIDES) for (let index = 0; index < state.boxes[side].length; index++) {
    const value = state.boxes[side][index], target = level.targets[side][index];
    if (value !== target) exact = false;
    if (value > target) overruns.push({side, index, value, target});
  }
  const won = remaining === 0 && exact;
  return {status: won ? 'won' : overruns.length ? 'overrun' : remaining === 0 ? 'exhausted' : 'playing', won, remaining, overruns};
}

export function evaluateState(level, state) {
  assertLevel(level); assertState(level, state);
  return classify(level, state);
}
export function isWon(level, state) { return evaluateState(level, state).won; }
export function stateKey(state) { return `${state.values.join(',')}|${SIDES.map(s => state.boxes[s].join(',')).join('|')}`; }

function step(context, state, index) {
  const level = context.level;
  if (index === undefined || !state.values[index]) return {state, changed: false, transfers: [], removed: null, result: classify(level, state)};
  const piece = level.pieces[index], value = state.values[index];
  // All recipients and values are determined before any destination changes.
  const transfers = transfersFor(context, state, index);
  const next = {values: [...state.values], boxes: copyBoxes(state.boxes)};
  next.values[index] = 0;
  for (const {to} of transfers) {
    const values = to.kind === 'piece' ? next.values : next.boxes[to.side];
    const sum = values[to.index] + value;
    if (!Number.isSafeInteger(sum)) throw new RangeError('O repasse excederia o limite de inteiros exatos.');
    values[to.index] = sum;
  }
  return {state: next, changed: true, transfers, removed: {id: piece.id, index, row: piece.row, col: piece.col, value}, result: classify(level, next)};
}

export function transition(level, state, pieceId) {
  assertLevel(level); assertState(level, state);
  const context = compile(level);
  return step(context, state, context.indexes.get(pieceId));
}

export function replay(level, order, {state} = {}) {
  const checked = validateLevel(level);
  if (!checked.valid) return {valid: false, solved: false, state: state ?? null, steps: [], error: checked.errors.join(' ')};
  let current = state ?? initialState(level);
  const stateChecked = validateState(level, current);
  if (!stateChecked.valid) return {valid: false, solved: false, state: current, steps: [], error: stateChecked.errors.join(' ')};
  if (!Array.isArray(order) || order.length > level.pieces.length) return {valid: false, solved: false, state: current, steps: [], error: 'Sequência de retiradas inválida.'};
  const context = compile(level), steps = [];
  for (const pieceId of order) {
    const transition = step(context, current, context.indexes.get(pieceId));
    if (!transition.changed) return {valid: false, solved: false, state: current, steps, error: `Peça ausente ou repetida: ${String(pieceId)}.`};
    steps.push(transition); current = transition.state;
  }
  return {valid: true, solved: classify(level, current).won, state: current, steps};
}

// Necessary conditions only: each reason below proves the state cannot win.
function impossibility(context, state, result = classify(context.level, state)) {
  if (result.overruns.length) return 'target-overrun';
  if (result.remaining === 0) return result.won ? null : 'empty-with-wrong-targets';
  const {level} = context;
  const remainingTotal = state.values.reduce((s, v) => s + v, 0);
  const boxesTotal = SIDES.flatMap(s => state.boxes[s]).reduce((s, v) => s + v, 0);
  const deficit = context.targetTotal - BigInt(boxesTotal);
  if (deficit < BigInt(remainingTotal)) return 'target-total-too-small';
  let maximum = BigInt(remainingTotal);
  for (let i = 0; i < state.values.length; i++) if (state.values[i]) maximum *= BigInt(level.pieces[i].directions.length);
  if (deficit > maximum) return 'target-total-unreachable';
  for (const direction of DIRECTIONS) {
    const side = SIDE[direction];
    for (let index = 0; index < state.boxes[side].length; index++) {
      const missing = level.targets[side][index] - state.boxes[side][index];
      const line = context.lines[side][index];
      if (missing > 0 && !line.some(i => state.values[i] > 0 && level.pieces[i].directions.includes(direction))) return 'no-future-emitter';
      const nearest = line.find(i => state.values[i] > 0);
      if (nearest !== undefined && level.pieces[nearest].directions.includes(direction) && state.values[nearest] > missing) return 'unavoidable-border-overrun';
    }
  }
  return null;
}

export function solve(level, state = undefined, options = {}) {
  const checked = validateLevel(level);
  if (!checked.valid) return {status: 'inconclusive', solution: null, visited: 0, reason: 'invalid-level', errors: checked.errors};
  state ??= initialState(level);
  const stateChecked = validateState(level, state);
  if (!stateChecked.valid) return {status: 'inconclusive', solution: null, visited: 0, reason: 'invalid-state', errors: stateChecked.errors};
  const context = compile(level), result = classify(level, state);
  if (result.won) return {status: 'solved', solution: [], visited: 0, source: 'already-won'};
  const proven = impossibility(context, state, result);
  if (proven) return {status: 'unsolvable', solution: null, visited: 0, reason: proven};
  const maxStates = Number.isFinite(options.maxStates) ? Math.max(0, Math.floor(options.maxStates)) : 100000;
  const timeoutMs = options.timeoutMs === Infinity ? Infinity : Number.isFinite(options.timeoutMs) ? Math.max(0, options.timeoutMs) : 2000;
  const deadline = now() + timeoutMs;
  const dead = new Set(), path = [];
  let visited = 0, cacheHits = 0, pruned = 0, cutoff = null;
  const preference = new Map((Array.isArray(level.solution) ? level.solution : []).map((id, i) => [id, i]));
  const search = current => {
    const verdict = classify(level, current);
    if (verdict.won) return [...path];
    const key = stateKey(current);
    if (dead.has(key)) { cacheHits++; return null; }
    if (visited >= maxStates) { cutoff = 'state-limit'; return null; }
    if (now() >= deadline) { cutoff = 'time-limit'; return null; }
    visited++;
    if (impossibility(context, current, verdict)) { dead.add(key); pruned++; return null; }
    const candidates = current.values.flatMap((value, index) => value ? [index] : [])
      .sort((a, b) => (preference.get(level.pieces[a].id) ?? a) - (preference.get(level.pieces[b].id) ?? b));
    for (const index of candidates) {
      path.push(level.pieces[index].id);
      const solution = search(step(context, current, index).state);
      path.pop();
      if (solution !== null) return solution;
      if (cutoff) return null;
    }
    dead.add(key);
    return null;
  };
  const solution = search(state);
  const statistics = {visited, cacheHits, pruned};
  if (solution !== null) return {status: 'solved', solution, ...statistics, source: 'search'};
  if (cutoff) return {status: 'inconclusive', solution: null, ...statistics, reason: cutoff};
  return {status: 'unsolvable', solution: null, ...statistics, reason: 'exhaustive-search'};
}

/** Prepared internal simulator for catalog analysis. Feed only initialState(),
 * a state previously produced by this simulator, or a separately validated
 * state. It snapshots the rules once and calls the exact same step function. */
export function createSimulator(level) {
  assertLevel(level);
  const snapshot = {id: level.id, version: level.version, rulesVersion: level.rulesVersion, rows: level.rows, cols: level.cols,
    pieces: level.pieces.map(p => ({id:p.id,row:p.row,col:p.col,value:p.value,directions:[...p.directions]})), targets:copyBoxes(level.targets)};
  const context = compile(snapshot);
  return {
    initialState: () => ({values:snapshot.pieces.map(p=>p.value),boxes:Object.fromEntries(SIDES.map(s=>[s,Array(boxSize(snapshot,s)).fill(0)]))}),
    transition: (state, pieceId) => step(context, state, context.indexes.get(pieceId)),
    evaluate: state => classify(snapshot, state),
    preview: (state, pieceId) => {const i=context.indexes.get(pieceId);return i===undefined?[]:transfersFor(context,state,i);},
    validateState: state => validateState(snapshot,state),
    impossibility: state => impossibility(context,state),
    stateKey
  };
}
