export function createState() {
  return {
    player: 0,
    moveCount: 0,
    result: null,
    rows: 6,
    columns: 6,
    reserves: [4, 4],
    tiles: Array.from({ length: 36 }, () => ({ area: 1, seals: [0, 0] })),
    lastFold: null,
  };
}

export function getAvailableEdges(state) {
  const edges = [];
  if (state.rows > 2) edges.push("north", "south");
  if (state.columns > 2) edges.push("west", "east");
  return edges;
}

export function getLegalMoves(state) {
  if (state.result || state.reserves[state.player] === 0) return [];
  const edges = getAvailableEdges(state);
  return state.tiles.flatMap((_, cell) =>
    edges.map((edge) => ({ type: "fold", cell, edge })),
  );
}

export function getOwner(tile) {
  if (tile.seals[0] === tile.seals[1]) return null;
  return tile.seals[0] > tile.seals[1] ? 0 : 1;
}

export function getScores(state) {
  const scores = [0, 0];
  for (const tile of state.tiles) {
    const owner = getOwner(tile);
    if (owner !== null) scores[owner] += tile.area;
  }
  return scores;
}

function mergeTiles(first, second) {
  return {
    area: first.area + second.area,
    seals: [first.seals[0] + second.seals[0], first.seals[1] + second.seals[1]],
  };
}

/** O resultado já nasce reindexado: as linhas e colunas externas são retiradas. */
function foldGrid(tiles, rows, columns, edge) {
  const grid = Array.from({ length: rows }, (_, row) =>
    tiles.slice(row * columns, (row + 1) * columns),
  );
  if (edge === "north") {
    grid[1] = grid[1].map((tile, column) => mergeTiles(grid[0][column], tile));
    grid.shift();
  } else if (edge === "south") {
    grid[rows - 2] = grid[rows - 2].map((tile, column) =>
      mergeTiles(tile, grid[rows - 1][column]),
    );
    grid.pop();
  } else if (edge === "west") {
    for (const row of grid) {
      row[1] = mergeTiles(row[0], row[1]);
      row.shift();
    }
  } else {
    for (const row of grid) {
      row[columns - 2] = mergeTiles(row[columns - 2], row[columns - 1]);
      row.pop();
    }
  }
  return { rows: grid.length, columns: grid[0].length, tiles: grid.flat() };
}

export function applyMove(state, move) {
  if (state.result) throw new Error("O atlas já foi fechado.");
  if (
    !move ||
    move.type !== "fold" ||
    !Number.isInteger(move.cell) ||
    move.cell < 0 ||
    move.cell >= state.tiles.length ||
    !getAvailableEdges(state).includes(move.edge) ||
    state.reserves[state.player] <= 0
  ) {
    throw new Error(
      "Escolha um painel e uma borda que ainda possa ser dobrada.",
    );
  }
  const tiles = state.tiles.map((tile) => ({
    area: tile.area,
    seals: [...tile.seals],
  }));
  const reserves = [...state.reserves];
  tiles[move.cell].seals[state.player] += 1;
  reserves[state.player] -= 1;
  const folded = foldGrid(tiles, state.rows, state.columns, move.edge);
  const nextState = {
    ...state,
    ...folded,
    reserves,
    player: 1 - state.player,
    moveCount: state.moveCount + 1,
    lastFold: {
      cell: move.cell,
      edge: move.edge,
      rows: state.rows,
      columns: state.columns,
    },
  };
  if (folded.rows === 2 && folded.columns === 2) {
    const scores = getScores(nextState);
    nextState.result = {
      winner: scores[0] === scores[1] ? null : Number(scores[1] > scores[0]),
      reason:
        scores[0] === scores[1]
          ? "Os cartógrafos controlam a mesma área no atlas final."
          : "Venceu quem controla a maior área dos quatro distritos.",
    };
  }
  return nextState;
}

export function evaluate(state, player) {
  if (state.result) {
    if (state.result.winner === null) return 0;
    return state.result.winner === player ? 100000 : -100000;
  }
  const scores = getScores(state);
  let influence = 0;
  for (const tile of state.tiles) {
    const margin = tile.seals[player] - tile.seals[1 - player];
    influence +=
      Math.sign(margin) * Math.sqrt(tile.area) * Math.min(Math.abs(margin), 2);
  }
  return (scores[player] - scores[1 - player]) * 20 + influence * 3;
}
