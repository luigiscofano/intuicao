/** ENLACE: duas redes independentes compartilham os pinos do mesmo tear. */
export const BOARD_SIZE = 5;
export const NODE_COUNT = BOARD_SIZE * BOARD_SIZE;

const directions = Object.freeze([
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]);

const edges = [];
for (let row = 0; row < BOARD_SIZE; row += 1) {
  for (let column = 0; column < BOARD_SIZE; column += 1) {
    const cell = row * BOARD_SIZE + column;
    if (column + 1 < BOARD_SIZE)
      edges.push(Object.freeze({ a: cell, b: cell + 1 }));
    if (row + 1 < BOARD_SIZE)
      edges.push(Object.freeze({ a: cell, b: cell + BOARD_SIZE }));
  }
}
export const EDGES = Object.freeze(edges);

const edgeKey = (a, b) => `${Math.min(a, b)}:${Math.max(a, b)}`;
const edgeIndices = new Map(
  EDGES.map(({ a, b }, index) => [edgeKey(a, b), index]),
);
const adjacency = Array.from({ length: NODE_COUNT }, () => []);
EDGES.forEach(({ a, b }, index) => {
  adjacency[a].push({ cell: b, edge: index });
  adjacency[b].push({ cell: a, edge: index });
});

export function getEdgeIndex(a, b) {
  return edgeIndices.get(edgeKey(a, b)) ?? -1;
}

function neighbor(cell, [dy, dx]) {
  const row = Math.floor(cell / BOARD_SIZE) + dy;
  const column = (cell % BOARD_SIZE) + dx;
  return row >= 0 && row < BOARD_SIZE && column >= 0 && column < BOARD_SIZE
    ? row * BOARD_SIZE + column
    : null;
}

// O catálogo contém a geometria, não o estado; sua ordem também desempata o bot.
const placements = [];
for (let center = 0; center < NODE_COUNT; center += 1) {
  for (
    let greenDirection = 0;
    greenDirection < directions.length;
    greenDirection += 1
  ) {
    const green = neighbor(center, directions[greenDirection]);
    if (green === null) continue;
    for (const amberDirection of [
      (greenDirection + 1) % 4,
      (greenDirection + 3) % 4,
    ]) {
      const amber = neighbor(center, directions[amberDirection]);
      if (amber === null) continue;
      placements.push(
        Object.freeze({
          center,
          green,
          amber,
          greenEdge: getEdgeIndex(center, green),
          amberEdge: getEdgeIndex(center, amber),
        }),
      );
    }
  }
}

const sourceNodes = [
  Array.from({ length: BOARD_SIZE }, (_, row) => row * BOARD_SIZE),
  Array.from({ length: BOARD_SIZE }, (_, column) => column),
];
const isExit = (cell, player) =>
  player === 0
    ? cell % BOARD_SIZE === BOARD_SIZE - 1
    : Math.floor(cell / BOARD_SIZE) === BOARD_SIZE - 1;

export function createState() {
  return {
    player: 0,
    moveCount: 0,
    result: null,
    edges: Array(EDGES.length).fill(null),
    lastMove: null,
  };
}

export function getLitNodes(state, player) {
  const reached = new Set(sourceNodes[player]);
  const queue = [...reached];
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    for (const next of adjacency[queue[cursor]]) {
      if (state.edges[next.edge] !== player || reached.has(next.cell)) continue;
      reached.add(next.cell);
      queue.push(next.cell);
    }
  }
  return [...reached].sort((a, b) => a - b);
}

function isFree(state, placement) {
  return (
    state.edges[placement.greenEdge] === null &&
    state.edges[placement.amberEdge] === null
  );
}

export function getLegalMoves(state) {
  if (state.result) return [];
  return placements
    .filter((placement) => isFree(state, placement))
    .map(({ center, green, amber }) => ({
      type: "place",
      center,
      green,
      amber,
    }));
}

export function getScores(state) {
  return [getLitNodes(state, 0).length, getLitNodes(state, 1).length];
}

export function applyMove(state, move) {
  if (state.result) throw new Error("Esta partida de ENLACE já terminou.");
  const placement =
    move?.type === "place" &&
    placements.find(
      (candidate) =>
        candidate.center === move.center &&
        candidate.green === move.green &&
        candidate.amber === move.amber,
    );
  if (!placement || !isFree(state, placement)) {
    throw new Error(
      "Escolha dois trechos vazios e perpendiculares no mesmo pino.",
    );
  }

  const nextEdges = [...state.edges];
  nextEdges[placement.greenEdge] = 0;
  nextEdges[placement.amberEdge] = 1;
  const nextState = {
    ...state,
    edges: nextEdges,
    player: 1 - state.player,
    moveCount: state.moveCount + 1,
    lastMove: {
      type: "place",
      center: placement.center,
      green: placement.green,
      amber: placement.amber,
      player: state.player,
    },
  };
  const networks = [getLitNodes(nextState, 0), getLitNodes(nextState, 1)];
  const crosses = networks.map((network, player) =>
    network.some((cell) => isExit(cell, player)),
  );

  // Os dois fios entram juntos. A vitória pertence à rede, não a quem confirmou.
  if (crosses[0] || crosses[1]) {
    nextState.result = {
      winner: crosses[0] && crosses[1] ? null : crosses[0] ? 0 : 1,
      reason:
        crosses[0] && crosses[1]
          ? "As duas redes atravessaram o tear na mesma jogada."
          : "A rede ligou sua entrada à margem oposta.",
    };
  } else if (!placements.some((candidate) => isFree(nextState, candidate))) {
    const [green, amber] = networks.map((network) => network.length);
    nextState.result = {
      winner: green === amber ? null : green > amber ? 0 : 1,
      reason:
        green === amber
          ? "Não há encaixes livres e as duas redes acenderam a mesma quantidade de pinos."
          : "Não há encaixes livres; venceu a rede com mais pinos acesos.",
    };
  }
  return nextState;
}

function missingConnections(state, player) {
  const distances = Array(NODE_COUNT).fill(Infinity);
  const settled = new Set();
  sourceNodes[player].forEach((cell) => {
    distances[cell] = 0;
  });
  for (let step = 0; step < NODE_COUNT; step += 1) {
    let cell = -1;
    for (let candidate = 0; candidate < NODE_COUNT; candidate += 1) {
      if (
        !settled.has(candidate) &&
        (cell < 0 || distances[candidate] < distances[cell])
      ) {
        cell = candidate;
      }
    }
    if (cell < 0 || !Number.isFinite(distances[cell])) break;
    if (isExit(cell, player)) return distances[cell];
    settled.add(cell);
    for (const next of adjacency[cell]) {
      const owner = state.edges[next.edge];
      if (owner !== null && owner !== player) continue;
      distances[next.cell] = Math.min(
        distances[next.cell],
        distances[cell] + (owner === player ? 0 : 1),
      );
    }
  }
  return NODE_COUNT;
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
  return (
    (scores[player] - scores[1 - player]) * 4 +
    (missingConnections(state, 1 - player) -
      missingConnections(state, player)) *
      18
  );
}
