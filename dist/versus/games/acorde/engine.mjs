import { getAcordeMap } from "./maps.mjs";
/**
 * ACORDE: sinos públicos, coleta por eixos e três pares de símbolos distintos.
 * O tabuleiro guarda apenas os sinos restantes. O carrinho aponta uma casa
 * já recolhida; null representa sua posição inicial, à esquerda da linha 2.
 */
export const SYMBOLS = Object.freeze(["folha", "gota", "onda", "sol"]);
export const INITIAL_BOARD = Object.freeze([
  "folha",
  "gota",
  "onda",
  "sol",
  "gota",
  "onda",
  "sol",
  "folha",
  "onda",
  "sol",
  "folha",
  "gota",
  "sol",
  "folha",
  "gota",
  "onda",
]);

function emptyCollection() {
  return { folha: 0, gota: 0, onda: 0, sol: 0 };
}

export function createState(config = {}) {
  const map = getAcordeMap(config);
  return {
    ...(map.id === "classic" ? {} : { mapId: map.id, mapVersion: map.version }),
    board: [...map.board],
    collections: [emptyCollection(), emptyCollection()],
    cursor: null,
    player: 0,
    consecutivePasses: 0,
    moveCount: 0,
    lastMove: null,
    result: null,
  };
}

function isPlayer(value) {
  return value === 0 || value === 1;
}

/** Rejeita saves malformados sem tentar corrigir uma posição silenciosamente. */
export function validateState(state) {
  if (!state || !isPlayer(state.player) || !Array.isArray(state.board)) {
    throw new Error("Estado inválido de ACORDE.");
  }
  if (
    state.board.length !== getAcordeMap(state).board.length ||
    state.board.some(
      (symbol, cell) => symbol !== null && symbol !== getAcordeMap(state).board[cell],
    ) ||
    !Array.isArray(state.collections) ||
    state.collections.length !== 2
  ) {
    throw new Error("Os sinos e suas casas não correspondem ao instrumento.");
  }
  for (const collection of state.collections) {
    if (
      !collection ||
      SYMBOLS.some(
        (symbol) =>
          !Number.isInteger(collection[symbol]) || collection[symbol] < 0,
      )
    ) {
      throw new Error("Coleção de sinos inválida.");
    }
  }
  for (const symbol of SYMBOLS) {
    const remaining = state.board.filter((item) => item === symbol).length;
    if (
      remaining +
        state.collections[0][symbol] +
        state.collections[1][symbol] !==
      getAcordeMap(state).board.filter(item => item === symbol).length
    ) {
      throw new Error("Cada símbolo precisa conservar os sinos do arranjo escolhido.");
    }
  }
  if (
    (state.cursor !== null &&
      (!Number.isInteger(state.cursor) ||
        state.cursor < 0 ||
        state.cursor >= state.board.length ||
        state.board[state.cursor] !== null)) ||
    !Number.isInteger(state.moveCount) ||
    state.moveCount < 0 ||
    !Number.isInteger(state.consecutivePasses) ||
    state.consecutivePasses < 0 ||
    state.consecutivePasses > 2
  ) {
    throw new Error("Carrinho ou contagem de turnos inválidos.");
  }
  if (
    state.cursor === null &&
    (state.player !== 0 ||
      state.board.some((item) => item === null) ||
      state.moveCount !== 0 ||
      state.consecutivePasses !== 0)
  ) {
    throw new Error(
      "O carrinho só fica fora da grade antes da primeira coleta.",
    );
  }
  if (
    state.result !== null &&
    (!state.result ||
      ![0, 1, null].includes(state.result.winner) ||
      typeof state.result.reason !== "string")
  ) {
    throw new Error("Resultado inválido de ACORDE.");
  }
  const collected = state.board.filter((symbol) => symbol === null).length;
  if (state.moveCount < collected + state.consecutivePasses) {
    throw new Error(
      "A contagem de ações não pode ser menor que as coletas e passes.",
    );
  }
  const scores = getScores(state);
  const pairedWinner = scores.findIndex((score) => score >= 3);
  const exhausted = state.board.every((symbol) => symbol === null);
  const twoPasses = state.consecutivePasses === 2;
  if (
    twoPasses &&
    (availableCells(state, 0).length || availableCells(state, 1).length)
  ) {
    throw new Error(
      "Dois passes só são possíveis quando os dois eixos estão vazios.",
    );
  }
  if (
    state.result === null &&
    (pairedWinner !== -1 || exhausted || twoPasses)
  ) {
    throw new Error("Uma posição encerrada precisa registrar o resultado.");
  }
  if (state.result !== null) {
    const expected =
      pairedWinner !== -1
        ? pairedWinner
        : scores[0] === scores[1]
          ? null
          : scores[0] > scores[1]
            ? 0
            : 1;
    if (
      (pairedWinner === -1 && !exhausted && !twoPasses) ||
      scores.every((score) => score >= 3) ||
      state.result.winner !== expected
    ) {
      throw new Error("O resultado não corresponde aos sinos desta partida.");
    }
  }
  return true;
}

/** O eixo pertence à equipe, não à orientação da última coleta. */
export function getActiveAxis(state, player = state.player) {
  if (!isPlayer(player)) throw new Error("Equipe inválida.");
  if (player === 0) {
    return {
      kind: "row",
      index: state.cursor === null ? 1 : Math.floor(state.cursor / getAcordeMap(state).cols),
    };
  }
  return {
    kind: "column",
    index: state.cursor === null ? null : state.cursor % getAcordeMap(state).cols,
  };
}

function availableCells(state, player = state.player) {
  const axis = getActiveAxis(state, player);
  if (axis.index === null) return [];
  return state.board.flatMap((symbol, cell) => {
    const coordinate = axis.kind === "row" ? Math.floor(cell / getAcordeMap(state).cols) : cell % getAcordeMap(state).cols;
    return symbol !== null && coordinate === axis.index ? [cell] : [];
  });
}

export function getLegalMoves(state) {
  validateState(state);
  if (state.result !== null) return [];
  const cells = availableCells(state);
  return cells.length
    ? cells.map((cell) => ({ type: "collect", cell }))
    : [{ type: "pass" }];
}

export function getScores(state) {
  return state.collections.map(
    (collection) => SYMBOLS.filter((symbol) => collection[symbol] >= 2).length,
  );
}

function resultByPairs(state, reason) {
  const [green, amber] = getScores(state);
  return { winner: green === amber ? null : green > amber ? 0 : 1, reason };
}

function matchesMove(legal, move) {
  return (
    legal.type === move.type &&
    (legal.type === "pass" || legal.cell === move.cell)
  );
}

export function applyMove(state, move) {
  if (
    !move ||
    !getLegalMoves(state).some((legal) => matchesMove(legal, move))
  ) {
    throw new Error("Coleta inválida: escolha um sino presente no eixo ativo.");
  }
  const next = {
    ...state,
    board: [...state.board],
    collections: state.collections.map((collection) => ({ ...collection })),
    moveCount: state.moveCount + 1,
    lastMove: { ...move, player: state.player },
  };

  if (move.type === "pass") {
    next.consecutivePasses += 1;
    if (next.consecutivePasses === 2) {
      next.result = resultByPairs(
        next,
        "Dois passes consecutivos; comparação dos pares diferentes.",
      );
    } else {
      next.player = 1 - state.player;
    }
    return next;
  }

  const symbol = state.board[move.cell];
  next.board[move.cell] = null;
  next.collections[state.player][symbol] += 1;
  next.cursor = move.cell;
  next.consecutivePasses = 0;
  next.lastMove.symbol = symbol;

  // A vitória por três pares é verificada antes da troca de turno ou do empate.
  if (getScores(next)[state.player] >= 3) {
    next.result = {
      winner: state.player,
      reason: "Três pares de símbolos diferentes completos.",
    };
  } else if (next.board.every((item) => item === null)) {
    next.result = resultByPairs(
      next,
      "Todos os sinos foram recolhidos; comparação dos pares diferentes.",
    );
  } else {
    next.player = 1 - state.player;
  }
  return next;
}

/** A heurística valoriza pares e a segunda cópia disponível, sem sorte ou busca. */
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
  const scores = getScores(state);
  const value = (team) => {
    const collection = state.collections[team];
    const singles = SYMBOLS.filter(
      (symbol) => collection[symbol] === 1 && state.board.includes(symbol),
    ).length;
    const completions = availableCells(state, team).filter(
      (cell) => collection[state.board[cell]] === 1,
    ).length;
    return scores[team] * 120 + singles * 15 + completions * 8;
  };
  return value(player) - value(1 - player);
}
