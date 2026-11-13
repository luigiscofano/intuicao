import { getQuinhaoMap } from "./maps.mjs";

/** Motor determinístico da partilha. Os números dos cestos nunca se alteram. */
export const FRUITS = ["castanha", "pitanga", "jabuticaba"];

export function createState(config = {}) {
  const map = getQuinhaoMap(config);
  return {
    ...(map.id === "classic" ? {} : { mapId: map.id, mapVersion: map.version }),
    player: 0,
    proposer: 0,
    phase: "offer",
    round: 0,
    moveCount: 0,
    result: null,
    baskets: Array.from({ length: 24 }, (_, index) => ({
      id: index + 1,
      fruit: map.fruits[index],
    })),
    inventories: [
      [0, 0, 0],
      [0, 0, 0],
    ],
    offer: [],
  };
}

/** Lacunas não interrompem a vizinhança: a ordem é a dos cestos sobreviventes. */
export function getOfferIds(state, start) {
  const index = state.baskets.findIndex((basket) => basket.id === start);
  if (index < 0 || state.baskets.length < 3) return [];
  return Array.from(
    { length: 3 },
    (_, offset) => state.baskets[(index + offset) % state.baskets.length].id,
  );
}

export function getLegalMoves(state) {
  if (state.result) return [];
  if (state.phase === "choose") {
    return state.offer.map((basket) => ({ type: "choose", basket }));
  }
  if (state.baskets.length === 3) {
    return [{ type: "offer", start: state.baskets[0].id }];
  }
  return state.baskets.map(({ id }) => ({ type: "offer", start: id }));
}

export function scoreInventory(inventory) {
  const [minimum, middle] = [...inventory].sort(
    (first, second) => first - second,
  );
  return minimum * 5 + (middle - minimum) * 2;
}

export function getScores(state) {
  return state.inventories.map(scoreInventory);
}

function offerBaskets(state, move) {
  const offer = getOfferIds(state, move.start);
  if (!Number.isInteger(move.start) || offer.length !== 3) {
    throw new Error("Escolha um cesto que ainda esteja no anel.");
  }
  // Quando sobram três cestos, todas as rotações representam a mesma oferta.
  if (state.baskets.length === 3 && move.start !== state.baskets[0].id) {
    throw new Error("A última oferta contém os três cestos restantes.");
  }
  return {
    ...state,
    phase: "choose",
    player: 1 - state.proposer,
    offer,
    moveCount: state.moveCount + 1,
  };
}

function chooseBasket(state, move) {
  if (!Number.isInteger(move.basket) || !state.offer.includes(move.basket)) {
    throw new Error("Escolha um dos três cestos oferecidos.");
  }
  const inventories = state.inventories.map((inventory) => [...inventory]);
  const offeredIds = new Set(state.offer);
  for (const basket of state.baskets) {
    if (!offeredIds.has(basket.id)) continue;
    const recipient = basket.id === move.basket ? state.player : state.proposer;
    inventories[recipient][basket.fruit] += 1;
  }
  const baskets = state.baskets.filter((basket) => !offeredIds.has(basket.id));
  const nextState = {
    ...state,
    baskets,
    inventories,
    offer: [],
    phase: "offer",
    proposer: state.player,
    player: state.player,
    round: state.round + 1,
    moveCount: state.moveCount + 1,
  };
  // Quem acabou de escolher é o próximo proponente; não alternar cegamente.
  if (baskets.length === 0) {
    const scores = getScores(nextState);
    nextState.result = {
      winner: scores[0] === scores[1] ? null : Number(scores[1] > scores[0]),
      reason:
        scores[0] === scores[1]
          ? "As duas colheitas terminaram com a mesma pontuação."
          : "Venceu a colheita com mais pontos em trios e pares.",
    };
  }
  return nextState;
}

export function applyMove(state, move) {
  if (state.result) throw new Error("A partilha já terminou.");
  if (!move || typeof move !== "object") throw new Error("Jogada inválida.");
  if (state.phase === "offer" && move.type === "offer")
    return offerBaskets(state, move);
  if (state.phase === "choose" && move.type === "choose")
    return chooseBasket(state, move);
  throw new Error("A ação não corresponde à etapa atual da partilha.");
}

export function evaluate(state, player) {
  if (state.result) {
    if (state.result.winner === null) return 0;
    return state.result.winner === player ? 100000 : -100000;
  }
  const scores = getScores(state);
  const diversity = state.inventories.map(
    (inventory) => inventory.filter((count) => count > 0).length,
  );
  return (
    (scores[player] - scores[1 - player]) * 100 +
    (diversity[player] - diversity[1 - player]) * 5
  );
}
