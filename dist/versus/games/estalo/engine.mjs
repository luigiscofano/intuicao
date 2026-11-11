/** N, L, S, O. A posse é permanente; somente a origem pode mudar de direção. */
export const DIRECTIONS = [
  { row: -1, column: 0, arrow: "↑" },
  { row: 0, column: 1, arrow: "→" },
  { row: 1, column: 0, arrow: "↓" },
  { row: 0, column: -1, arrow: "←" },
];

const INITIAL_DIRECTIONS = [1, 2, 3, 2, 0, 1, 2, 3, 1, 0, 3, 2, 0, 1, 0, 3];

export function createState() {
  return {
    player: 0,
    moveCount: 0,
    result: null,
    scores: [0, 0],
    lastChain: [],
    board: INITIAL_DIRECTIONS.map((direction, cell) => ({
      owner: cell % 4 < 2 ? 0 : 1,
      direction,
    })),
  };
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

function nextCell(cell, direction) {
  const row = Math.floor(cell / 4) + DIRECTIONS[direction].row;
  const column = (cell % 4) + DIRECTIONS[direction].column;
  return row < 0 || row > 3 || column < 0 || column > 3 ? -1 : row * 4 + column;
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
    cell = nextCell(cell, direction);
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
  // A cadeia inteira precisa acabar antes de distinguir vitória de empate.
  if (scores[0] === 8 && scores[1] === 8) {
    result = {
      winner: null,
      reason: "A mesma cadeia completou as duas semeaduras.",
    };
  } else if (scores[0] === 8 || scores[1] === 8) {
    result = {
      winner: scores[0] === 8 ? 0 : 1,
      reason: "As oito vagens da equipe foram abertas.",
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
  let best = -8;
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
