/** VAZANTE: uma remada desloca simultaneamente o barco e seu comboio traseiro. */
export const BOARD_SIZE = 5;
export const TURN_LIMIT = 80;
const CELL_COUNT = BOARD_SIZE * BOARD_SIZE;
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function neighbor(cell, dy, dx) {
  const row = Math.floor(cell / BOARD_SIZE) + dy;
  const column = (cell % BOARD_SIZE) + dx;
  return row >= 0 && row < BOARD_SIZE && column >= 0 && column < BOARD_SIZE
    ? row * BOARD_SIZE + column
    : null;
}

export function positionKey(state) {
  // Barcos da mesma equipe são equivalentes: trocar seus nomes não evita repetição.
  const board = state.board
    .map((occupant) => (occupant === null ? "." : occupant))
    .join("");
  return `${board}|${state.player}|${state.delivered.join(",")}`;
}

export function createState() {
  const board = Array(CELL_COUNT).fill(null);
  [0, 2, 4].forEach((cell) => {
    board[cell] = 0;
  });
  [20, 22, 24].forEach((cell) => {
    board[cell] = 1;
  });
  const state = {
    player: 0,
    moveCount: 0,
    result: null,
    board,
    delivered: [0, 0],
    consecutivePasses: 0,
    repetitions: {},
    lastMove: null,
  };
  state.repetitions[positionKey(state)] = 1;
  return state;
}

function boatMoves(state, player = state.player) {
  const moves = [];
  state.board.forEach((occupant, from) => {
    if (occupant !== player) return;
    for (const [dy, dx] of directions) {
      const to = neighbor(from, dy, dx);
      if (to !== null && state.board[to] === null)
        moves.push({ type: "move", from, to });
    }
  });
  return moves;
}

export function getLegalMoves(state) {
  if (state.result) return [];
  const moves = boatMoves(state);
  return moves.length ? moves : [{ type: "pass" }];
}

function validateBoatMove(state, move) {
  if (
    move?.type !== "move" ||
    !Number.isInteger(move.from) ||
    !Number.isInteger(move.to)
  )
    return false;
  if (
    move.from < 0 ||
    move.from >= CELL_COUNT ||
    move.to < 0 ||
    move.to >= CELL_COUNT
  )
    return false;
  const dy =
    Math.floor(move.to / BOARD_SIZE) - Math.floor(move.from / BOARD_SIZE);
  const dx = (move.to % BOARD_SIZE) - (move.from % BOARD_SIZE);
  return (
    Math.abs(dy) + Math.abs(dx) === 1 &&
    state.board[move.from] === state.player &&
    state.board[move.to] === null
  );
}

export function getConvoy(state, move) {
  if (!validateBoatMove(state, move))
    throw new Error("Escolha um barco seu e uma casa vizinha vazia.");
  const dy =
    Math.floor(move.to / BOARD_SIZE) - Math.floor(move.from / BOARD_SIZE);
  const dx = (move.to % BOARD_SIZE) - (move.from % BOARD_SIZE);
  const convoy = [];
  let from = move.from;
  while (from !== null && state.board[from] !== null) {
    convoy.push({
      from,
      to: neighbor(from, dy, dx),
      player: state.board[from],
    });
    from = neighbor(from, -dy, -dx);
  }
  return convoy;
}

const isDestination = (cell, player) =>
  Math.floor(cell / BOARD_SIZE) === (player === 0 ? 4 : 0);

export function getScores(state) {
  return [...state.delivered];
}

export function applyMove(state, move) {
  if (state.result) throw new Error("Esta partida de VAZANTE já terminou.");
  const passing = move?.type === "pass";
  if (passing && boatMoves(state).length)
    throw new Error("O passe só é permitido quando não há remadas legais.");
  if (!passing && !validateBoatMove(state, move)) {
    throw new Error("Escolha um barco seu e uma casa vizinha vazia.");
  }

  const convoy = passing ? [] : getConvoy(state, move);
  const nextBoard = [...state.board];
  const delivered = [...state.delivered];
  const arrivals = [];
  // Primeiro libera todas as origens; só então ocupa os destinos do comboio inteiro.
  convoy.forEach(({ from }) => {
    nextBoard[from] = null;
  });
  convoy.forEach(({ to, player }) => {
    if (isDestination(to, player)) {
      delivered[player] += 1;
      arrivals.push({ cell: to, player });
    } else {
      nextBoard[to] = player;
    }
  });
  const nextState = {
    ...state,
    board: nextBoard,
    delivered,
    player: 1 - state.player,
    moveCount: state.moveCount + 1,
    consecutivePasses: passing ? state.consecutivePasses + 1 : 0,
    repetitions: { ...state.repetitions },
    lastMove: passing
      ? { type: "pass", player: state.player, convoy: [], arrivals: [] }
      : {
          type: "move",
          from: move.from,
          to: move.to,
          player: state.player,
          convoy,
          arrivals,
        },
  };
  const key = positionKey(nextState);
  nextState.repetitions[key] = (nextState.repetitions[key] ?? 0) + 1;

  // A chegada tem prioridade: uma segunda entrega no 80º turno ainda vence.
  if (delivered[0] >= 2 || delivered[1] >= 2) {
    nextState.result = {
      winner:
        delivered[0] >= 2 && delivered[1] >= 2
          ? null
          : delivered[0] >= 2
            ? 0
            : 1,
      reason: "Duas travessias foram concluídas.",
    };
  } else if (nextState.consecutivePasses >= 2) {
    nextState.result = {
      winner: null,
      reason: "As duas equipes ficaram sem remadas legais.",
    };
  } else if (nextState.repetitions[key] >= 3) {
    nextState.result = {
      winner: null,
      reason:
        "A mesma posição, com a mesma equipe da vez, apareceu três vezes.",
    };
  } else if (nextState.moveCount >= TURN_LIMIT) {
    nextState.result = {
      winner: null,
      reason: "O estuário chegou ao limite de 80 turnos sem duas entregas.",
    };
  }
  return nextState;
}

export function evaluate(state, player) {
  if (state.result) {
    return state.result.winner === null
      ? 0
      : state.result.winner === player
        ? 100000
        : -100000;
  }
  const value = (owner) => {
    let progress = state.delivered[owner] * 220;
    state.board.forEach((occupant, cell) => {
      if (occupant !== owner) return;
      const row = Math.floor(cell / BOARD_SIZE);
      progress += (owner === 0 ? row : BOARD_SIZE - 1 - row) * 9;
      const destination = neighbor(cell, owner === 0 ? 1 : -1, 0);
      if (
        destination !== null &&
        state.board[destination] === null &&
        isDestination(destination, owner)
      ) {
        progress += 24;
      }
    });
    return progress + boatMoves(state, owner).length * 2;
  };
  return value(player) - value(1 - player);
}
