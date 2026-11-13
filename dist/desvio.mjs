import { DESVIO_ADDITIONAL_MAPS } from "./desvio-map-catalog.mjs";

// Regras de DESVIO: movimentos legais, restrições, histórico e busca de jogadas.
/** DESVIO: immutable local game engine. Cells, players and restriction indices are zero-based.
 * H sends the next player to the same row; V to the same column. Consumed cells
 * never block a path. A player with no legal move loses. No passing or draws.
 * Solver values are relative to the player to move, not an absolute player ID.
 * No network, account, ranking or multiplayer-server behavior is implemented.
 */
const solvers = new Map();
const fullMask = (map) => (1 << (map.rows * map.cols)) - 1;
const label = (map, cell) => `L${Math.floor(cell / map.cols) + 1}C${(cell % map.cols) + 1}`;
function validateMap(map) {
  if (
    !map ||
    !Number.isInteger(map.rows) ||
    !Number.isInteger(map.cols) ||
    map.rows < 1 ||
    map.cols < 1 ||
    map.rows * map.cols > 16 ||
    !Array.isArray(map.arrows) ||
    map.arrows.length !== map.rows * map.cols ||
    map.arrows.some((x) => x !== 'H' && x !== 'V')
  )
    throw new Error('Mapa inválido: use até 16 casas com setas H ou V.');
}
function validatePosition(map, state) {
  validateMap(map);
  if (
    !state ||
    !Number.isInteger(state.available) ||
    state.available < 0 ||
    (state.available & fullMask(map)) !== state.available ||
    ![0, 1].includes(state.player)
  )
    throw new Error('Estado inválido.');
  const r = state.restriction;
  if (
    r !== null &&
    (!r ||
      !['row', 'col'].includes(r.axis) ||
      !Number.isInteger(r.index) ||
      r.index < 0 ||
      r.index >= (r.axis === 'row' ? map.rows : map.cols))
  )
    throw new Error('Destino inválido.');
  if (state.mapId !== undefined && state.mapId !== map.id)
    throw new Error('O estado pertence a outro mapa.');
}
function freezeState(state) {
  return Object.freeze({
    ...state,
    restriction: state.restriction && Object.freeze({ ...state.restriction }),
    history: Object.freeze([...state.history]),
  });
}
function destination(map, cell) {
  return map.arrows[cell] === 'H'
    ? { axis: 'row', index: Math.floor(cell / map.cols) }
    : { axis: 'col', index: cell % map.cols };
}
function rawMoves(map, available, restriction) {
  const moves = [];
  for (let cell = 0; cell < map.arrows.length; cell++)
    if (
      available & (1 << cell) &&
      (!restriction ||
        (restriction.axis === 'row' ? Math.floor(cell / map.cols) : cell % map.cols) ===
          restriction.index)
    )
      moves.push(cell);
  return moves;
}
/** An optional initialAvailable/initialRestriction on a map represents a training position. */
export function createDesvio(map, starter = 0) {
  validateMap(map);
  if (![0, 1].includes(starter)) throw new Error('Jogador inicial inválido.');
  const state = {
    mapId: map.id,
    available: map.initialAvailable ?? fullMask(map),
    player: starter,
    restriction: map.initialRestriction ?? null,
    history: [],
    turn: 0,
    starter,
    winner: null,
  };
  validatePosition(map, state);
  if (!rawMoves(map, state.available, state.restriction).length) state.winner = 1 - starter;
  return freezeState(state);
}
export function legalDesvioMoves(map, state) {
  validatePosition(map, state);
  return state.winner !== null && state.winner !== undefined
    ? []
    : rawMoves(map, state.available, state.restriction);
}
/** Optional expectedPlayer/expectedTurn guards stale UI callbacks. Never mutates inputs. */
export function applyDesvioMove(
  map,
  state,
  cell,
  { expectedPlayer = state.player, expectedTurn = state.turn } = {},
) {
  validatePosition(map, state);
  if (expectedPlayer !== state.player) throw new Error('Não é a vez deste jogador.');
  if (expectedTurn !== state.turn) throw new Error('O turno mudou; escolha novamente.');
  if (!Number.isInteger(cell) || !legalDesvioMoves(map, state).includes(cell))
    throw new Error('Jogada ilegal: escolha uma casa disponível no destino indicado.');
  const available = state.available & ~(1 << cell),
    restriction = destination(map, cell),
    player = 1 - state.player;
  return freezeState({
    ...state,
    available,
    restriction,
    player,
    history: [...state.history, cell],
    turn: state.turn + 1,
    winner: rawMoves(map, available, restriction).length ? null : state.player,
  });
}
function solverFor(map) {
  const signature = `${map.rows}x${map.cols}:${map.arrows.join('')}`;
  if (solvers.has(signature)) return solvers.get(signature);
  // Bound retained maps. Each individual solve is exhaustive and exact.
  if (solvers.size >= 3) solvers.delete(solvers.keys().next().value);
  const memo = new Map();
  // Explora estados possíveis para encontrar soluções dentro dos limites de busca.
  function solve(available, restriction) {
    const rid = restriction
      ? restriction.axis === 'row'
        ? 1 + restriction.index
        : 1 + map.rows + restriction.index
      : 0;
    const key = available * 33 + rid;
    if (memo.has(key)) return memo.get(key);
    const choices = rawMoves(map, available, restriction);
    if (!choices.length) {
      const result = { winning: false, distance: 0, bestMove: null };
      memo.set(key, result);
      return result;
    }
    let best = null;
    for (const cell of choices) {
      const child = solve(available & ~(1 << cell), destination(map, cell));
      const candidate = { winning: !child.winning, distance: child.distance + 1, bestMove: cell };
      if (
        !best ||
        (candidate.winning && !best.winning) ||
        (candidate.winning === best.winning &&
          (candidate.winning
            ? candidate.distance < best.distance
            : candidate.distance > best.distance))
      )
        best = candidate;
    }
    memo.set(key, best);
    return best;
  }
  const engine = { solve, memo };
  solvers.set(signature, engine);
  return engine;
}
export function analyzeDesvio(map, state) {
  validatePosition(map, state);
  const { solve, memo } = solverFor(map);
  const value = solve(state.available, state.restriction);
  const moves = rawMoves(map, state.available, state.restriction).map((cell) => {
    const child = solve(state.available & ~(1 << cell), destination(map, cell));
    return { cell, winning: !child.winning, distance: child.distance + 1 };
  });
  const winningMoves = moves.filter((x) => x.winning).map((x) => x.cell);
  return {
    ...value,
    moves,
    winningMoves,
    perfectWinner: value.winning ? state.player : 1 - state.player,
    statesEvaluated: memo.size,
    explanation: !moves.length
      ? 'Não há casa disponível no destino obrigatório. Quem está na vez perdeu.'
      : value.winning
        ? `${winningMoves.map((c) => label(map, c)).join(', ')} ${winningMoves.length === 1 ? 'garante' : 'garantem'} vitória com respostas corretas: o adversário recebe uma posição perdedora.`
        : 'Todas as escolhas permitem uma resposta vencedora do adversário. Isso não impede que ele erre; continue procurando a melhor resposta.',
  };
}
/** A concrete exact counter-reply, not a claim based on number of available cells. */
export function explainDesvioMove(map, state, cell) {
  const next = applyDesvioMove(map, state, cell);
  const analysis = analyzeDesvio(map, next),
    target = next.restriction;
  const destinationText = `${target.axis === 'row' ? 'linha' : 'coluna'} ${target.index + 1}`;
  const reply = analysis.bestMove;
  return {
    cell,
    winning: !analysis.winning,
    reply,
    destination: target,
    explanation:
      next.winner !== null
        ? `${label(map, cell)} esvazia a ${destinationText}. O adversário não pode jogar: você vence imediatamente.`
        : analysis.winning
          ? `${label(map, cell)} envia o adversário à ${destinationText}. Ele pode jogar ${label(map, reply)} e garantir vitória com respostas corretas.`
          : `${label(map, cell)} envia o adversário à ${destinationText}. Nenhuma resposta dele mantém uma vitória forçada; responda corretamente para vencer.`,
    responses: analysis.moves,
  };
}
/** Seed affects easy/medium choice only, never the game's rules. Perfect is exact. */
export function chooseDesvioBotMove(map, state, difficulty = 'perfect', seed = 1) {
  const legal = legalDesvioMoves(map, state);
  if (!legal.length) return null;
  if (difficulty === 'perfect' || difficulty === 'exact') return analyzeDesvio(map, state).bestMove;
  let candidates = legal;
  if (difficulty === 'medium') {
    const immediate = legal.filter(
      (cell) => applyDesvioMove(map, state, cell).winner === state.player,
    );
    if (immediate.length) candidates = immediate;
    else {
      const safe = legal.filter((cell) => {
        const next = applyDesvioMove(map, state, cell);
        return !legalDesvioMoves(map, next).some(
          (reply) => applyDesvioMove(map, next, reply).winner === next.player,
        );
      });
      if (safe.length) candidates = safe;
    }
  } else if (difficulty !== 'easy') throw new Error('Bot desconhecido: easy, medium ou perfect.');
  let x = ((Number(seed) >>> 0) ^ Math.imul(state.turn + 1, 2654435761) ^ state.available) >>> 0;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  return candidates[(x >>> 0) % candidates.length];
}
/** Replay starts from the map's initial position. at is the number of moves shown. */
export function replayDesvio(map, history, starter = 0, at = history.length) {
  if (!Array.isArray(history) || !Number.isInteger(at) || at < 0 || at > history.length)
    throw new Error('Replay inválido.');
  let state = createDesvio(map, starter);
  for (const cell of history.slice(0, at)) state = applyDesvioMove(map, state, cell);
  return state;
}
export function revancheDesvio(map, state) {
  return createDesvio(map, 1 - state.starter);
}
export function firstDesvioMistake(map, history, starter = 0) {
  let state = createDesvio(map, starter);
  for (let turn = 0; turn < history.length; turn++) {
    const before = analyzeDesvio(map, state),
      cell = history[turn],
      next = applyDesvioMove(map, state, cell);
    if (before.winning && analyzeDesvio(map, next).winning)
      return { turn, player: state.player, cell, ...explainDesvioMove(map, state, cell) };
    state = next;
  }
  return null;
}
function mapOf(id, name, arrows, extra = {}) {
  return Object.freeze({
    id,
    name,
    rows: 4,
    cols: 4,
    arrows: Object.freeze([...arrows]),
    ...extra,
  });
}
export const DESVIO_REFERENCE_MAP = mapOf('D-00', 'Referência do manual', 'HVHVVHHVHVVHVHVH', {
  metrics: Object.freeze({
    perfectWinner: 1,
    winningOpenings: 0,
    initialChoices: 16,
    perfectPlies: 16,
    branchPositions: 13,
    forcedPositions: 3,
    meanChoices: 3,
  }),
  description:
    'Tabuleiro demonstrativo do PDF. Vitória teórica do segundo jogador; não é um mapa neutro.',
});
// Only available arrows matter in D-01. Crossed-out cells use H placeholders.
export const DESVIO_CHALLENGE_MAP = mapOf('D-01', 'A armadilha da linha 3', 'VVVVHHHHVHVHHHHH', {
  initialAvailable: [0, 1, 2, 3, 4, 8, 9, 10, 12].reduce((mask, c) => mask | (1 << c), 0),
  initialRestriction: Object.freeze({ axis: 'row', index: 2 }),
  description: 'Treino do PDF: uma única escolha vence contra qualquer resposta.',
});
export function createDesvioChallenge(starter = 0) {
  return createDesvio(DESVIO_CHALLENGE_MAP, starter);
}
/** Canonical representative under the eight square symmetries; quarter turns swap H/V. */
export function canonicalDesvioMap(map) {
  validateMap(map);
  if (map.rows !== map.cols) return `${map.rows}x${map.cols}:${map.arrows.join('')}`;
  const n = map.rows,
    variants = [];
  for (let reflection = 0; reflection < 2; reflection++)
    for (let rotations = 0; rotations < 4; rotations++) {
      const cells = Array(n * n);
      map.arrows.forEach((arrow, cell) => {
        let r = Math.floor(cell / n),
          c = cell % n;
        if (reflection) c = n - 1 - c;
        for (let k = 0; k < rotations; k++) [r, c] = [c, n - 1 - r];
        cells[r * n + c] = rotations % 2 ? (arrow === 'H' ? 'V' : 'H') : arrow;
      });
      variants.push(cells.join(''));
    }
  return variants.sort()[0];
}
/** Reproducible generator. Selection of the shipped maps is audited in their metrics. */
export function generateDesvioMap(seed) {
  let x = Number(seed) >>> 0;
  if (!x) x = 0x6d2b79f5;
  const arrows = Array.from({ length: 16 }, () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) & 1 ? 'H' : 'V';
  });
  return mapOf(`D-S${Number(seed) >>> 0}`, `Mapa ${Number(seed) >>> 0}`, arrows, {
    seed: Number(seed) >>> 0,
  });
}
/** Curated boards, not a progression or numbered levels. No board is mathematically neutral.
 * Seeds reproduce the arrows exactly; no two shipped boards are D4-equivalent.
 * metrics.perfectWinner is relative to starter=0 (0 first, 1 second).
 * perfectPlies assumes shortest forced win / longest forced loss and index tie-breaks.
 * branchPositions, forcedPositions and meanChoices describe that exact principal
 * variation, NOT every possible play path or empirical competitive balance.
 * Selection: 5..11 horizontal arrows, >=5 branching positions, 8 first-player and
 * 8 second-player wins including D-00. Alternate the starter for a rematch.
 */
export const DESVIO_MAPS = Object.freeze([
  DESVIO_REFERENCE_MAP,
  mapOf('D-M01', 'Travessias', 'HVHHHHVVHHVHHVHV', {
    seed: 2654435761,
    metrics: Object.freeze({
      'perfectWinner': 0,
      'winningOpenings': 6,
      'initialChoices': 16,
      'perfectPlies': 15,
      'branchPositions': 10,
      'forcedPositions': 5,
      'meanChoices': 2.93,
    }),
  }),
  mapOf('D-M02', 'Bifurcação', 'HVVVVHHHHVVVVVVH', {
    seed: 1013904226,
    metrics: Object.freeze({
      'perfectWinner': 0,
      'winningOpenings': 6,
      'initialChoices': 16,
      'perfectPlies': 9,
      'branchPositions': 7,
      'forcedPositions': 2,
      'meanChoices': 3.67,
    }),
  }),
  mapOf('D-M03', 'Margens', 'HVVVHHHVHHVHHVHV', {
    seed: 3668339987,
    metrics: Object.freeze({
      'perfectWinner': 0,
      'winningOpenings': 7,
      'initialChoices': 16,
      'perfectPlies': 9,
      'branchPositions': 7,
      'forcedPositions': 2,
      'meanChoices': 3.67,
    }),
  }),
  mapOf('D-M04', 'Contraponto', 'VVHVVHVHHVHHHHVH', {
    seed: 2027808452,
    metrics: Object.freeze({
      'perfectWinner': 0,
      'winningOpenings': 7,
      'initialChoices': 16,
      'perfectPlies': 13,
      'branchPositions': 10,
      'forcedPositions': 3,
      'meanChoices': 3.23,
    }),
  }),
  mapOf('D-M05', 'Entrelace', 'VVVHVVVHVHHHHHHH', {
    seed: 1401181143,
    metrics: Object.freeze({
      'perfectWinner': 0,
      'winningOpenings': 3,
      'initialChoices': 16,
      'perfectPlies': 7,
      'branchPositions': 5,
      'forcedPositions': 2,
      'meanChoices': 4,
    }),
  }),
  mapOf('D-M06', 'Retorno', 'HHVVVVHVHHHVHHHH', {
    seed: 2415085369,
    metrics: Object.freeze({
      'perfectWinner': 0,
      'winningOpenings': 6,
      'initialChoices': 16,
      'perfectPlies': 7,
      'branchPositions': 5,
      'forcedPositions': 2,
      'meanChoices': 4,
    }),
  }),
  mapOf('D-M07', 'Horizonte', 'HVVVVVVHVVVHVHHH', {
    seed: 774553834,
    metrics: Object.freeze({
      'perfectWinner': 0,
      'winningOpenings': 7,
      'initialChoices': 16,
      'perfectPlies': 13,
      'branchPositions': 9,
      'forcedPositions': 4,
      'meanChoices': 3.08,
    }),
  }),
  mapOf('D-M08', 'Encruzilhada', 'HVVVHVVHHHVHVHVV', {
    seed: 3428989595,
    metrics: Object.freeze({
      'perfectWinner': 0,
      'winningOpenings': 5,
      'initialChoices': 16,
      'perfectPlies': 7,
      'branchPositions': 5,
      'forcedPositions': 2,
      'meanChoices': 4,
    }),
  }),
  mapOf('D-M09', 'Circuito', 'VVHHHVHHHHHVVVVH', {
    seed: 147926525,
    metrics: Object.freeze({
      'perfectWinner': 1,
      'winningOpenings': 0,
      'initialChoices': 16,
      'perfectPlies': 14,
      'branchPositions': 11,
      'forcedPositions': 3,
      'meanChoices': 3.14,
    }),
  }),
  mapOf('D-M10', 'Esquinas', 'VVVVVHHVHHHHHVVH', {
    seed: 3189639203,
    metrics: Object.freeze({
      'perfectWinner': 1,
      'winningOpenings': 0,
      'initialChoices': 16,
      'perfectPlies': 14,
      'branchPositions': 11,
      'forcedPositions': 3,
      'meanChoices': 3.07,
    }),
  }),
  mapOf('D-M11', 'Alternância', 'VHVVHHVHHHVVHVHH', {
    seed: 831056492,
    metrics: Object.freeze({
      'perfectWinner': 1,
      'winningOpenings': 0,
      'initialChoices': 16,
      'perfectPlies': 14,
      'branchPositions': 11,
      'forcedPositions': 3,
      'meanChoices': 3.21,
    }),
  }),
  mapOf('D-M12', 'Passagens', 'VHHHHHVHVHHVVHHV', {
    seed: 3394068386,
    metrics: Object.freeze({
      'perfectWinner': 1,
      'winningOpenings': 0,
      'initialChoices': 16,
      'perfectPlies': 12,
      'branchPositions': 9,
      'forcedPositions': 3,
      'meanChoices': 3.33,
    }),
  }),
  mapOf('D-M13', 'Contorno', 'VHVVVVVHVVVHHHVV', {
    seed: 1753536851,
    metrics: Object.freeze({
      'perfectWinner': 1,
      'winningOpenings': 0,
      'initialChoices': 16,
      'perfectPlies': 14,
      'branchPositions': 11,
      'forcedPositions': 3,
      'meanChoices': 3.14,
    }),
  }),
  mapOf('D-M14', 'Convergência', 'HHVVHHVVHHVVHHVV', {
    seed: 260931841,
    metrics: Object.freeze({
      'perfectWinner': 1,
      'winningOpenings': 0,
      'initialChoices': 16,
      'perfectPlies': 6,
      'branchPositions': 5,
      'forcedPositions': 1,
      'meanChoices': 4.5,
    }),
  }),
  mapOf('D-M15', 'Contracorrente', 'VVHHHVVHHHHVVVVH', {
    seed: 2288740293,
    metrics: Object.freeze({
      'perfectWinner': 1,
      'winningOpenings': 0,
      'initialChoices': 16,
      'perfectPlies': 16,
      'branchPositions': 10,
      'forcedPositions': 6,
      'meanChoices': 2.69,
    }),
  }),
  ...DESVIO_ADDITIONAL_MAPS,
]);

/** Formatos compatíveis com o motor e com a análise exata. */
export const DESVIO_GRID_SIZES = Object.freeze([
  { id: "4x4", rows: 4, cols: 4 },
  { id: "3x3", rows: 3, cols: 3 },
  { id: "3x4", rows: 3, cols: 4 },
  { id: "4x3", rows: 4, cols: 3 },
  { id: "2x6", rows: 2, cols: 6 },
  { id: "2x8", rows: 2, cols: 8 },
].map(Object.freeze));
