/** TRAMA: índices de casas e jogadores começam em zero. */
export const TRAMA_RULES_VERSION = 'trama-1';
export const TRAMA_STORAGE_KEY = 'intuicao.trama.v1';
export const TRAMA_SIZE = 6;
const playerValid = p => p === 0 || p === 1;
const cellValid = c => Number.isInteger(c) && c >= 0 && c < 36;
const freeze = value => {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.values(value).forEach(freeze); Object.freeze(value);
  }
  return value;
};
function validBoard(board) {
  return Array.isArray(board) && board.length === 36 && Array.from(board).every(p => p === null || playerValid(p));
}
/** Reconstrução completa: uma ponte interrompida pode separar componentes. */
export function analyzeBoard(board) {
  if (!validBoard(board)) throw Error('Tabuleiro de TRAMA inválido.');
  const graphs = [0, 1].map(owner => {
    const nodes = board.flatMap((p, i) => p === owner ? [i] : []);
    const edges = [], adjacency = new Map(nodes.map(c => [c, []]));
    for (const from of nodes) {
      const row = Math.floor(from / 6), col = from % 6;
      for (const [dr, dc] of [[0, 1], [1, 0]]) for (const distance of [1, 2]) {
        if (row + dr * distance >= 6 || col + dc * distance >= 6) continue;
        const to = from + (dr * 6 + dc) * distance;
        const midpoint = distance === 2 ? from + dr * 6 + dc : null;
        if (board[to] !== owner || (midpoint !== null && board[midpoint] !== null)) continue;
        edges.push({from, to, owner, midpoint});
        adjacency.get(from).push(to); adjacency.get(to).push(from);
      }
    }
    const visited = new Set(), components = [];
    for (const node of nodes) {
      if (visited.has(node)) continue;
      const component = [node]; visited.add(node);
      for (let i = 0; i < component.length; i++) for (const neighbor of adjacency.get(component[i])) {
        if (!visited.has(neighbor)) { visited.add(neighbor); component.push(neighbor); }
      }
      components.push(component.sort((a, b) => a - b));
    }
    return {owner, nodes, edges, components, maxSize: Math.max(0, ...components.map(c => c.length))};
  });
  return freeze({graphs, components: graphs.map(g => g.components), maxSizes: graphs.map(g => g.maxSize)});
}
export function createTrama(starter = 0) {
  if (!playerValid(starter)) throw Error('Iniciador inválido.');
  const board = Array(36).fill(null);
  return freeze({rulesVersion: TRAMA_RULES_VERSION, board, player: starter, starter, turn: 0,
    over: false, winner: null, history: [], future: [], ...analyzeBoard(board)});
}
export function legalTramaMoves(state, player = state.player) {
  if (state.over || player !== state.player || !playerValid(player)) return [];
  return state.board.flatMap((p, cell) => p === null ? [cell] : []);
}
export function tramaStateKey(state) {
  return `${TRAMA_RULES_VERSION}:${state.starter}:${state.turn}:${state.player}:${state.board.map(p => p === null ? '.' : p).join('')}`;
}
export function applyTramaMove(state, cell, {expectedPlayer = state.player, expectedTurn = state.turn} = {}) {
  if (expectedPlayer !== state.player || expectedTurn !== state.turn) throw Error('O turno mudou; escolha novamente.');
  if (state.over || !cellValid(cell) || state.board[cell] !== null || !playerValid(state.player)) throw Error('Escolha uma casa vazia na sua vez.');
  const owner = state.player, board = [...state.board]; board[cell] = owner;
  const analysis = analyzeBoard(board);
  const winningComponent = analysis.components[owner].find(c => c.length >= 6) || [];
  const winner = winningComponent.length ? owner : board.every(p => p !== null) ? 'draw' : null;
  const next = freeze({rulesVersion: TRAMA_RULES_VERSION, board, player: 1 - owner, starter: state.starter,
    turn: state.turn + 1, over: winner !== null, winner, history: [...state.history, cell], future: [], ...analysis});
  const before = analyzeBoard(state.board).graphs.flatMap(g => g.edges), after = analysis.graphs.flatMap(g => g.edges);
  const key = edge => `${edge.owner}:${edge.from}:${edge.to}`;
  const oldKeys = new Set(before.map(key)), newKeys = new Set(after.map(key));
  return freeze({state: next, events: {placed: {cell, owner}, addedEdges: after.filter(e => !oldKeys.has(key(e))),
    removedEdges: before.filter(e => !newKeys.has(key(e))), winningComponent, over: next.over, winner}});
}
export const previewTramaMove = applyTramaMove;
export function inspectTramaComponent(state, cell) {
  if (!cellValid(cell) || state.board[cell] === null) return [];
  return analyzeBoard(state.board).components[state.board[cell]].find(c => c.includes(cell)) || [];
}
function replay(starter, history) {
  let state = createTrama(starter);
  for (const cell of history) state = applyTramaMove(state, cell).state;
  return state;
}
export function undoTrama(state) {
  if (!state.history.length) return state;
  return freeze({...replay(state.starter, state.history.slice(0, -1)), future: [state.history.at(-1), ...state.future]});
}
export function redoTrama(state) {
  if (!state.future.length) return state;
  return freeze({...applyTramaMove(state, state.future[0]).state, future: state.future.slice(1)});
}
/** Contra o bot, retorna à decisão humana; não permite desfazer só a resposta. */
export function undoTramaToHuman(state, human = 0) {
  if (!playerValid(human)) throw Error('Jogador inválido.');
  if (state.history.length <= (state.starter === human ? 0 : 1)) return state;
  let result = undoTrama(state);
  while (result.history.length && result.player !== human) result = undoTrama(result);
  return result;
}
export function redoTramaToHuman(state, human = 0) {
  if (!playerValid(human)) throw Error('Jogador inválido.');
  let result = redoTrama(state);
  while (result.future.length && !result.over && result.player !== human) result = redoTrama(result);
  return result;
}
export const resetTrama = state => createTrama(state.starter);
export function rematchTrama(state) {
  if (!state.over) throw Error('Conclua a partida antes da revanche.');
  return createTrama(1 - state.starter);
}
function equal(a, b) {
  if (a === b) return true;
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object' || Array.isArray(a) !== Array.isArray(b)) return false;
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every(k => Object.hasOwn(b, k) && equal(a[k], b[k]));
}
/** Nunca confia no grafo salvo: reproduz passado e futuro, sem apagar a origem. */
export function restoreTrama(raw) {
  try {
    const saved = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!saved || saved.rulesVersion !== TRAMA_RULES_VERSION || !playerValid(saved.starter) ||
      !Array.isArray(saved.history) || !Array.isArray(saved.future) || saved.history.length + saved.future.length > 36) return null;
    const canonical = {...replay(saved.starter, saved.history), future: [...saved.future]};
    let future = canonical;
    for (const cell of saved.future) future = applyTramaMove(future, cell).state;
    return equal(saved, canonical) ? freeze(canonical) : null;
  } catch { return null; }
}
export function serializeTrama(state) {
  if (!restoreTrama(state)) throw Error('Estado de TRAMA inválido.');
  return JSON.stringify(state);
}
