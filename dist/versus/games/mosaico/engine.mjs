import { getMosaicoMap } from "./maps.mjs";
/** MOSAICO: os azulejos são comuns; apenas os selos de maioria têm proprietário. */
export const BOARD_SIZE = 5;
export const TILE_COUNT = BOARD_SIZE * BOARD_SIZE;
// Ordem dos cantos: noroeste, nordeste, sudeste, sudoeste.
export const CORNER_COLORS = Object.freeze([
  Object.freeze([0, 0, 1, 1]),
  Object.freeze([1, 0, 0, 1]),
  Object.freeze([1, 1, 0, 0]),
  Object.freeze([0, 1, 1, 0]),
]);

export function createState(config = {}) {
  const map = getMosaicoMap(config);
  const tiles = Array(map.rows * map.cols).fill(null);
  for (const tile of map.initialTiles) tiles[tile.cell] = tile.orientation;
  return {
    ...(map.id === "classic" ? {} : { mapId: map.id, mapVersion: map.version }),
    player: 0,
    moveCount: map.initialTiles.length,
    result: null,
    tiles,
    lastMove: null,
  };
}

export function getSeals(state) {
  const { rows, cols } = getMosaicoMap(state);
  const seals = [];
  for (let row = 0; row < rows - 1; row += 1) {
    for (let column = 0; column < cols - 1; column += 1) {
      const topLeft = row * cols + column;
      const cells = [
        topLeft,
        topLeft + 1,
        topLeft + cols,
        topLeft + cols + 1,
      ];
      const inwardCorners = [2, 3, 1, 0];
      const colors = cells.map((cell, index) =>
        state.tiles[cell] === null
          ? null
          : CORNER_COLORS[state.tiles[cell]][inwardCorners[index]],
      );
      const complete = colors.every((color) => color !== null);
      const greenCount = colors.filter((color) => color === 0).length;
      seals.push({
        index: row * (cols - 1) + column,
        row,
        column,
        cells,
        colors,
        complete,
        owner: complete
          ? greenCount >= 3
            ? 0
            : greenCount <= 1
              ? 1
              : -1
          : null,
      });
    }
  }
  return seals;
}

export function getScores(state) {
  const scores = [0, 0];
  getSeals(state).forEach(({ owner }) => {
    if (owner === 0 || owner === 1) scores[owner] += 1;
  });
  return scores;
}

export function getLegalMoves(state) {
  if (state.result) return [];
  const moves = [];
  state.tiles.forEach((tile, cell) => {
    if (tile !== null) return;
    for (
      let orientation = 0;
      orientation < CORNER_COLORS.length;
      orientation += 1
    ) {
      moves.push({ type: "place", cell, orientation });
    }
  });
  return moves;
}

export function applyMove(state, move) {
  if (state.result) throw new Error("Este painel de MOSAICO já foi concluído.");
  if (
    move?.type !== "place" ||
    !Number.isInteger(move.cell) ||
    move.cell < 0 ||
    move.cell >= state.tiles.length ||
    !Number.isInteger(move.orientation) ||
    move.orientation < 0 ||
    move.orientation > 3 ||
    state.tiles[move.cell] !== null
  ) {
    throw new Error(
      "Escolha uma casa vazia e uma das quatro orientações do azulejo.",
    );
  }

  const tiles = [...state.tiles];
  tiles[move.cell] = move.orientation;
  const nextState = {
    ...state,
    tiles,
    player: 1 - state.player,
    moveCount: state.moveCount + 1,
    lastMove: null,
  };
  const beforeSeals = getSeals(state);
  const completed = getSeals(nextState)
    .filter((seal) => seal.complete && !beforeSeals[seal.index].complete)
    .map(({ index, owner, colors }) => ({ index, owner, colors }));
  nextState.lastMove = {
    type: "place",
    cell: move.cell,
    orientation: move.orientation,
    player: state.player,
    completed,
  };

  // Recalcular as junções impede contagem dupla e trata ganhos simultâneos.
  if (tiles.every((tile) => tile !== null)) {
    const [green, amber] = getScores(nextState);
    nextState.result = {
      winner: green === amber ? null : green > amber ? 0 : 1,
      reason:
        green === amber
          ? "O painel foi concluído com a mesma quantidade de assinaturas para cada oficina."
          : "O painel foi concluído; venceu a oficina com mais selos assinados.",
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
  const scores = getScores(state);
  let value = (scores[player] - scores[1 - player]) * 24;
  for (const seal of getSeals(state)) {
    if (seal.complete) continue;
    const own = seal.colors.filter((color) => color === player).length;
    const other = seal.colors.filter((color) => color === 1 - player).length;
    if (own >= 3) value += 18;
    else if (other >= 3) value -= 18;
    else value += (own - other) * (own + other === 3 ? 4 : 2);
  }
  return value;
}
