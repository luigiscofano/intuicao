import { getEstaloMap } from "./maps.mjs";
export { ESTALO_MAPS, DEFAULT_MAP_ID, getEstaloMap } from "./maps.mjs";

/** N, L, S, O. A posse é permanente; somente a origem pode mudar de direção. */
export const DIRECTIONS = [
  { row: -1, column: 0, arrow: "↑" },
  { row: 0, column: 1, arrow: "→" },
  { row: 1, column: 0, arrow: "↓" },
  { row: 0, column: -1, arrow: "←" },
];

/** Saves antigos sem mapa continuam usando o canteiro clássico. */
export function createState(options = {}) {
  if (!options || typeof options !== "object" || Array.isArray(options)) {
    throw new Error("Configuração de Estalo inválida.");
  }
  const map = getEstaloMap(options.mapId);
  return {
    player: 0,
    moveCount: 0,
    result: null,
    scores: [0, 0],
    lastChain: [],
    mapId: map.id,
    rows: map.rows,
    columns: map.columns,
    targets: [...map.targets],
    blocked: [...map.blocked],
    board: map.board.map((pod) => pod ? { ...pod } : null),
  };
}

/** Dimensões e metas têm fallback para estados legados em memória. */
export function getBoardSize(state) {
  return { rows: state.rows ?? 4, columns: state.columns ?? 4 };
}

export function getTargets(state) {
  return [...(state.targets ?? [8, 8])];
}

export function getLegalMoves(state) {
  if (state.result) return [];
  return state.board.flatMap((pod, cell) =>
    pod?.owner === state.player
      ? [0, -1, 1].map((turn) => ({ type: "burst", cell, turn }))
      : [],
  );
}

function validateMove(state, move) {
  if (state.result) throw new Error("A semeadura já terminou.");
  if (!move || move.type !== "burst" || !Number.isInteger(move.cell)) {
    throw new Error("Selecione uma vagem fechada da sua equipe.");
  }
  const pod = state.board[move.cell];
  if (!pod || pod.owner !== state.player || ![0, -1, 1].includes(move.turn)) {
    throw new Error(
      "A origem deve ser sua; mantenha a seta ou gire apenas 90°.",
    );
  }
}

function nextCell(state, cell, direction) {
  const { rows, columns } = getBoardSize(state);
  const row = Math.floor(cell / columns) + DIRECTIONS[direction].row;
  const column = (cell % columns) + DIRECTIONS[direction].column;
  return row < 0 || row >= rows || column < 0 || column >= columns ? -1 : row * columns + column;
}

/** A visita conta como consumo; voltar à mesma casa encerra qualquer circuito. */
export function traceMove(state, move) {
  validateMove(state, move);
  const path = [];
  const visited = new Set();
  let cell = move.cell;
  while (cell >= 0 && state.board[cell] && !visited.has(cell)) {
    const pod = state.board[cell];
    const direction =
      cell === move.cell ? (pod.direction + move.turn + 4) % 4 : pod.direction;
    path.push(cell);
    visited.add(cell);
    cell = nextCell(state, cell, direction);
  }
  return path;
}

export function applyMove(state, move) {
  const path = traceMove(state, move);
  const board = [...state.board];
  const scores = [...state.scores];
  for (const cell of path) {
    scores[board[cell].owner] += 1;
    board[cell] = null;
  }
  let result = null;
  const targets = getTargets(state);
  // A cadeia inteira precisa acabar antes de distinguir vitória de empate.
  if (scores[0] === targets[0] && scores[1] === targets[1]) {
    result = {
      winner: null,
      reason: "A mesma cadeia completou as duas semeaduras.",
    };
  } else if (scores[0] === targets[0] || scores[1] === targets[1]) {
    result = {
      winner: scores[0] === targets[0] ? 0 : 1,
      reason: targets[0] === 8 ? "As oito vagens da equipe foram abertas." : "Todas as vagens da equipe foram abertas.",
    };
  }
  return {
    ...state,
    board,
    scores,
    lastChain: path,
    player: 1 - state.player,
    moveCount: state.moveCount + 1,
    result,
  };
}

export function getScores(state) {
  return [...state.scores];
}

function bestChainBalance(state, player) {
  const perspective = { ...state, player };
  let best = -getTargets(state)[1 - player];
  for (const move of getLegalMoves(perspective)) {
    const balance = traceMove(perspective, move).reduce(
      (sum, cell) => sum + (state.board[cell].owner === player ? 1 : -1),
      0,
    );
    best = Math.max(best, balance);
  }
  return best;
}

export function evaluate(state, player) {
  if (state.result) {
    if (state.result.winner === null) return 0;
    return state.result.winner === player ? 100000 : -100000;
  }
  return (
    (state.scores[player] - state.scores[1 - player]) * 100 +
    (bestChainBalance(state, player) - bestChainBalance(state, 1 - player)) * 8
  );
}
