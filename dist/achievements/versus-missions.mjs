/** Metadados leves: abrir o catálogo não precisa carregar os motores dos duelos. */
export const VERSUS_MISSIONS = Object.freeze(
  [
    {
      id: "enlace-corrente-acesa",
      gameId: "enlace",
      gameName: "ENLACE",
      name: "Corrente acesa",
      description:
        "Acenda pelo menos 3 novos pinos da sua cor com a mesma presilha.",
    },
    {
      id: "enlace-travessia",
      gameId: "enlace",
      gameName: "ENLACE",
      name: "De margem a margem",
      description:
        "Vença conectando sua entrada à margem oposta na jogada que você confirmou.",
    },
    {
      id: "vazante-comboio-misto",
      gameId: "vazante",
      gameName: "VAZANTE",
      name: "Comboio misto",
      description:
        "Reboque pelo menos um barco adversário na esteira de uma remada sua.",
    },
    {
      id: "vazante-tres-barcos",
      gameId: "vazante",
      gameName: "VAZANTE",
      name: "Três na corrente",
      description:
        "Mova pelo menos 3 barcos na mesma remada, avançando o líder uma linha em direção ao seu cais.",
    },
    {
      id: "mosaico-dupla-assinatura",
      gameId: "mosaico",
      gameName: "MOSAICO",
      name: "Dupla assinatura",
      description:
        "Complete pelo menos 2 selos da sua cor ao colocar um único azulejo.",
    },
    {
      id: "mosaico-unanimidade",
      gameId: "mosaico",
      gameName: "MOSAICO",
      name: "Quatro cantos, uma voz",
      description: "Complete um selo com os 4 cantos da sua cor.",
    },
    {
      id: "quinhao-fruto-que-faltava",
      gameId: "quinhao",
      gameName: "QUINHÃO",
      name: "O fruto que faltava",
      description:
        "Escolha um fruto que complete um novo trio de castanha, pitanga e jabuticaba na sua colheita.",
    },
    {
      id: "quinhao-oferta-diversa",
      gameId: "quinhao",
      gameName: "QUINHÃO",
      name: "Três sabores",
      description:
        "Ofereça 3 cestos vizinhos que contenham os 3 tipos de fruta.",
    },
    {
      id: "estalo-cadeia-longa",
      gameId: "estalo",
      gameName: "ESTALO",
      name: "Efeito em cadeia",
      description:
        "Abra pelo menos 5 vagens na mesma cadeia, com mais vagens suas do que adversárias.",
    },
    {
      id: "estalo-cadeia-limpa",
      gameId: "estalo",
      gameName: "ESTALO",
      name: "Sem desvio",
      description:
        "Abra pelo menos 3 vagens suas em uma cadeia sem abrir nenhuma vagem adversária.",
    },
    {
      id: "dobra-distrito-reunido",
      gameId: "dobra",
      gameName: "DOBRA",
      name: "Terras reunidas",
      description:
        "Reúna, com uma dobra, um distrito de área 6 ou maior controlado pelos seus selos.",
    },
    {
      id: "dobra-virada-final",
      gameId: "dobra",
      gameName: "DOBRA",
      name: "A última dobra",
      description:
        "Comece a última jogada atrás em área controlada e vença o atlas depois de dobrar.",
    },
    {
      id: "acorde-par-e-silencio",
      gameId: "acorde",
      gameName: "ACORDE",
      name: "Par e silêncio",
      description:
        "Complete um novo par e deixe o adversário sem sino no próximo eixo, obrigando-o a passar.",
    },
    {
      id: "acorde-tres-vozes",
      gameId: "acorde",
      gameName: "ACORDE",
      name: "Três vozes",
      description:
        "Vença recolhendo o sino que completa pares de 3 símbolos diferentes.",
    },
    {
      id: "lastro-volta-ao-centro",
      gameId: "lastro",
      gameName: "LASTRO",
      name: "Volta ao centro",
      description:
        "Faça um ajuste que transforme um desvio diferente de zero em equilíbrio exato: Δ = 0.",
    },
    {
      id: "lastro-ultimo-ajuste",
      gameId: "lastro",
      gameName: "LASTRO",
      name: "Até a última marca",
      description: "Vença uma rodada ao avançar um contrapeso até a marca 4.",
    },
  ].map((mission) => Object.freeze({ ...mission, icon: mission.id })),
);

function hasCrossing(engine, state, player) {
  const size = engine.BOARD_SIZE;
  return engine
    .getLitNodes(state, player)
    .some((cell) =>
      player === 0
        ? cell % size === size - 1
        : Math.floor(cell / size) === size - 1,
    );
}

/** Só os painéis da borda dobrada acabaram de ser reunidos; os demais já existiam. */
function mergedDistricts(state, edge) {
  return state.tiles.filter((_, index) => {
    const row = Math.floor(index / state.columns);
    const column = index % state.columns;
    if (edge === "north") return row === 0;
    if (edge === "south") return row === state.rows - 1;
    if (edge === "west") return column === 0;
    return edge === "east" && column === state.columns - 1;
  });
}

const evaluators = Object.freeze({
  enlace({ before, after, actor, engine }) {
    const gains =
      engine.getScores(after)[actor] - engine.getScores(before)[actor];
    return [
      gains >= 3 && "enlace-corrente-acesa",
      after.result?.winner === actor &&
        hasCrossing(engine, after, actor) &&
        "enlace-travessia",
    ];
  },
  vazante({ after, move, actor, engine }) {
    if (move.type !== "move") return [];
    const convoy = after.lastMove.convoy;
    const rowChange =
      Math.floor(move.to / engine.BOARD_SIZE) -
      Math.floor(move.from / engine.BOARD_SIZE);
    return [
      convoy.some((boat) => boat.player !== actor) && "vazante-comboio-misto",
      convoy.length >= 3 &&
        rowChange === (actor === 0 ? 1 : -1) &&
        "vazante-tres-barcos",
    ];
  },
  mosaico({ after, actor }) {
    const ownSeals = after.lastMove.completed.filter(
      (seal) => seal.owner === actor,
    );
    return [
      ownSeals.length >= 2 && "mosaico-dupla-assinatura",
      ownSeals.some((seal) => seal.colors.every((color) => color === actor)) &&
        "mosaico-unanimidade",
    ];
  },
  quinhao({ before, after, move, actor }) {
    if (move.type === "choose") {
      const completedTrio =
        Math.min(...after.inventories[actor]) >
        Math.min(...before.inventories[actor]);
      return [completedTrio && "quinhao-fruto-que-faltava"];
    }
    const fruits = after.offer.map(
      (id) => after.baskets.find((basket) => basket.id === id).fruit,
    );
    return [new Set(fruits).size === 3 && "quinhao-oferta-diversa"];
  },
  estalo({ before, after, actor }) {
    const ownGain = after.scores[actor] - before.scores[actor];
    const rivalGain = after.scores[1 - actor] - before.scores[1 - actor];
    return [
      after.lastChain.length >= 5 &&
        ownGain > rivalGain &&
        "estalo-cadeia-longa",
      ownGain >= 3 && rivalGain === 0 && "estalo-cadeia-limpa",
    ];
  },
  dobra({ before, after, move, actor, engine }) {
    const reunited = mergedDistricts(after, move.edge).some(
      (tile) => tile.area >= 6 && engine.getOwner(tile) === actor,
    );
    const previousScores = engine.getScores(before);
    return [
      reunited && "dobra-distrito-reunido",
      after.result?.winner === actor &&
        previousScores[actor] < previousScores[1 - actor] &&
        "dobra-virada-final",
    ];
  },
  acorde({ before, after, move, actor, engine }) {
    if (move.type !== "collect") return [];
    const pairCount = engine.getScores(after)[actor];
    const newPair = pairCount > engine.getScores(before)[actor];
    const forcedPass =
      !after.result &&
      engine.getLegalMoves(after).every((option) => option.type === "pass");
    return [
      newPair && forcedPass && "acorde-par-e-silencio",
      after.result?.winner === actor && pairCount === 3 && "acorde-tres-vozes",
    ];
  },
  lastro({ after, move, actor }) {
    if (move.type !== "advance") return [];
    return [
      after.lastMove.deltaBefore !== 0 &&
        after.lastMove.deltaAfter === 0 &&
        "lastro-volta-ao-centro",
      move.to === 4 && after.roundWinner === actor && "lastro-ultimo-ajuste",
    ];
  },
});

/**
 * Observa apenas a transição já aceita pelo motor. O controlador não chama esta
 * função em prévias, buscas, retomadas ou viagens pelo histórico. O motor vem
 * do jogo aberto para reaproveitar seus cálculos sem carregar os outros jogos.
 */
export function evaluateVersusMissions(context) {
  if (!context || !Object.hasOwn(evaluators, context.gameId)) return [];
  const { before, after, move, actor, config, engine } = context;
  if (
    !before ||
    !after ||
    !move ||
    !engine ||
    before === after ||
    before.result ||
    ![0, 1].includes(actor) ||
    actor !== before.player ||
    !["local", "competitive", "bot", "training"].includes(config?.mode) ||
    (config.mode === "bot" && actor !== 0)
  )
    return [];
  return evaluators[context.gameId](context).filter(Boolean);
}
