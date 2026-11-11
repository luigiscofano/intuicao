/**
 * LASTRO usa aritmética inteira: nenhuma simulação física decide a legalidade.
 * Os seis trilhos são compartilhados. Uma rodada terminada mantém o aparelho
 * visível até a ação explícita que prepara a segunda rodada.
 */
export const TRACKS = Object.freeze([
  Object.freeze({ id: "E1", side: "left", value: 1, sign: -1 }),
  Object.freeze({ id: "E2", side: "left", value: 2, sign: -1 }),
  Object.freeze({ id: "E7", side: "left", value: 7, sign: -1 }),
  Object.freeze({ id: "D2", side: "right", value: 2, sign: 1 }),
  Object.freeze({ id: "D3", side: "right", value: 3, sign: 1 }),
  Object.freeze({ id: "D5", side: "right", value: 5, sign: 1 }),
]);
export const SAFE_LIMIT = 4;

function initialPositions() {
  return Object.fromEntries(TRACKS.map((track) => [track.id, 1]));
}

export function createState() {
  return {
    positions: initialPositions(),
    player: 0,
    round: 1,
    roundScores: [0, 0],
    roundWinner: null,
    phase: "playing",
    roundMoveCount: 0,
    moveCount: 0,
    lastMove: null,
    result: null,
  };
}

export function getLoads(state) {
  let left = 0;
  let right = 0;
  for (const track of TRACKS) {
    const load = track.value * state.positions[track.id];
    if (track.side === "left") left += load;
    else right += load;
  }
  return { left, right, delta: right - left };
}

function weightMoves(state) {
  const { delta } = getLoads(state);
  return TRACKS.flatMap((track) => {
    const from = state.positions[track.id];
    return [1, 2].flatMap((steps) => {
      const to = from + steps;
      const nextDelta = delta + track.sign * track.value * steps;
      return to <= 4 && Math.abs(nextDelta) <= SAFE_LIMIT
        ? [{ type: "advance", piece: track.id, to }]
        : [];
    });
  });
}

function isPlayer(value) {
  return value === 0 || value === 1;
}

/** As cargas são derivadas das distâncias; não há uma cópia numérica que possa divergir. */
export function validateState(state) {
  if (
    !state ||
    !isPlayer(state.player) ||
    !state.positions ||
    ![1, 2].includes(state.round) ||
    !["playing", "between-rounds", "finished"].includes(state.phase) ||
    !Array.isArray(state.roundScores) ||
    state.roundScores.length !== 2 ||
    state.roundScores.some(
      (score) => !Number.isInteger(score) || score < 0 || score > 2,
    )
  ) {
    throw new Error("Estado inválido de LASTRO.");
  }
  if (
    TRACKS.some((track) => {
      const position = state.positions[track.id];
      return !Number.isInteger(position) || position < 1 || position > 4;
    })
  ) {
    throw new Error("Cada contrapeso precisa estar em uma das quatro marcas.");
  }
  if (
    Math.abs(getLoads(state).delta) > SAFE_LIMIT ||
    !Number.isInteger(state.moveCount) ||
    state.moveCount < 0 ||
    !Number.isInteger(state.roundMoveCount) ||
    state.roundMoveCount < 0 ||
    state.roundMoveCount > 18
  ) {
    throw new Error("Desvio ou contagem de ajustes inválidos.");
  }
  const outwardSteps = TRACKS.reduce(
    (sum, track) => sum + state.positions[track.id] - 1,
    0,
  );
  if (
    state.roundMoveCount > outwardSteps ||
    state.roundMoveCount * 2 < outwardSteps ||
    state.moveCount < state.roundMoveCount + state.round - 1
  ) {
    throw new Error(
      "As distâncias não correspondem à quantidade de ajustes da rodada.",
    );
  }
  const completedRounds = state.roundScores[0] + state.roundScores[1];
  if (state.phase === "playing") {
    if (
      state.result !== null ||
      state.roundWinner !== null ||
      completedRounds !== state.round - 1 ||
      !weightMoves(state).length
    ) {
      throw new Error(
        "A rodada ativa precisa ter ao menos um ajuste e ainda não ter vencedor.",
      );
    }
  } else {
    if (!isPlayer(state.roundWinner) || weightMoves(state).length) {
      throw new Error(
        "A rodada só termina quando todos os ajustes ficam bloqueados.",
      );
    }
    if (state.phase === "between-rounds") {
      if (
        state.round !== 1 ||
        completedRounds !== 1 ||
        state.result !== null ||
        state.player !== 1
      ) {
        throw new Error(
          "A segunda rodada deve começar com o amarelo, após uma única vitória.",
        );
      }
    } else {
      const winner =
        state.roundScores[0] === state.roundScores[1]
          ? null
          : state.roundScores[0] > state.roundScores[1]
            ? 0
            : 1;
      if (
        state.round !== 2 ||
        completedRounds !== 2 ||
        !state.result ||
        state.result.winner !== winner ||
        typeof state.result.reason !== "string"
      ) {
        throw new Error(
          "O resultado do duelo precisa corresponder às duas rodadas.",
        );
      }
    }
  }
  return true;
}

export function getLegalMoves(state) {
  validateState(state);
  if (state.result) return [];
  if (state.phase === "between-rounds") return [{ type: "next-round" }];
  return weightMoves(state);
}

export function getScores(state) {
  return [...state.roundScores];
}

function matchesMove(legal, move) {
  return (
    legal.type === move.type &&
    (legal.type === "next-round" ||
      (legal.piece === move.piece && legal.to === move.to))
  );
}

export function applyMove(state, move) {
  if (
    !move ||
    !getLegalMoves(state).some((legal) => matchesMove(legal, move))
  ) {
    throw new Error(
      "Ajuste inválido: avance 1 ou 2 marcas e mantenha Δ entre −4 e +4.",
    );
  }
  if (move.type === "next-round") {
    return {
      ...state,
      positions: initialPositions(),
      player: 1,
      round: 2,
      roundScores: [...state.roundScores],
      roundWinner: null,
      phase: "playing",
      roundMoveCount: 0,
      moveCount: state.moveCount + 1,
      lastMove: { type: "next-round" },
      result: null,
    };
  }

  const next = {
    ...state,
    positions: { ...state.positions, [move.piece]: move.to },
    player: 1 - state.player,
    roundScores: [...state.roundScores],
    roundMoveCount: state.roundMoveCount + 1,
    moveCount: state.moveCount + 1,
    lastMove: {
      type: "advance",
      piece: move.piece,
      from: state.positions[move.piece],
      to: move.to,
      player: state.player,
      deltaBefore: getLoads(state).delta,
    },
  };
  next.lastMove.deltaAfter = getLoads(next).delta;

  // O bloqueio é global: um peso travado não encerra uma rodada com outro ajuste possível.
  if (weightMoves(next).length === 0) {
    next.roundWinner = state.player;
    next.roundScores[state.player] += 1;
    if (state.round === 1) {
      next.phase = "between-rounds";
      next.player = 1;
    } else {
      next.phase = "finished";
      const [green, amber] = next.roundScores;
      next.result = {
        winner: green === amber ? null : green > amber ? 0 : 1,
        reason:
          green === amber
            ? "Uma vitória para cada equipe: duelo empatado em 1–1."
            : "A mesma equipe venceu as duas rodadas.",
      };
    }
  }
  return next;
}

/** Placar e liberdade imediata orientam o bot; a busca pertence ao controlador. */
export function evaluate(state, player) {
  validateState(state);
  if (!isPlayer(player)) throw new Error("Equipe inválida.");
  if (state.result) {
    return state.result.winner === null
      ? 0
      : state.result.winner === player
        ? 10000
        : -10000;
  }
  const roundValue =
    (state.roundScores[player] - state.roundScores[1 - player]) * 1200;
  if (state.phase !== "playing") return roundValue;
  const moves = weightMoves(state);
  const movableWeights = new Set(moves.map((move) => move.piece)).size;
  const freedom = moves.length * 2 + movableWeights * 4;
  return roundValue + (state.player === player ? freedom : -freedom);
}
