/** Missões dos duelos anteriores: somente transições humanas já confirmadas. */

function mission(gameId, gameName, suffix, name, description) {
  const id = `${gameId}-${suffix}`;
  return Object.freeze({ id, gameId, gameName, name, description, icon: id });
}

export const LEGACY_VERSUS_MISSIONS = Object.freeze([
  mission(
    "broto",
    "BROTO",
    "double-harvest",
    "Colheita em dobro",
    "Colha duas ou mais flores da sua equipe em um único plantio.",
  ),
  mission(
    "broto",
    "BROTO",
    "four-winds",
    "Quatro ventos",
    "Alcance um broto em cada uma das quatro direções com um único plantio.",
  ),
  mission(
    "cerco",
    "CERCO",
    "isolate",
    "Porta fechada",
    "Deixe uma peça adversária sem saída, enquanto outra peça da mesma equipe ainda pode jogar.",
  ),
  mission(
    "cerco",
    "CERCO",
    "last-opening",
    "Última fresta",
    "Vença uma partida quando sua equipe tinha exatamente um movimento legal antes da jogada final.",
  ),
  mission(
    "desvio",
    "DESVIO",
    "narrow-path",
    "Passagem estreita",
    "Deixe exatamente uma escolha ao adversário enquanto ainda restam pelo menos cinco casas livres no mapa.",
  ),
  mission(
    "desvio",
    "DESVIO",
    "early-trap",
    "Sobram casas, falta caminho",
    "Vença esgotando o destino obrigatório, com pelo menos quatro casas ainda livres em outras linhas ou colunas.",
  ),
]);

function isEligibleTransition(context) {
  return (
    context.confirmed === true &&
    context.computer !== true &&
    context.custom !== true &&
    ["local", "competitive", "bot", "training"].includes(context.mode) &&
    context.before &&
    context.after &&
    context.after.turn === context.before.turn + 1
  );
}

function brotoUnlocks({ before, events }) {
  if (!events) return [];
  const ids = [];
  if (events.points?.[before.player] >= 2) ids.push("broto-double-harvest");
  if (events.receivers?.length === 4) ids.push("broto-four-winds");
  return ids;
}

function cercoUnlocks(context) {
  const {
    before,
    after,
    legalBefore,
    opponentMovesBefore,
    opponentMovesAfter,
  } = context;
  const ids = [];
  if (!after.over && opponentMovesAfter?.length > 0) {
    const mobileBefore = new Set(
      (opponentMovesBefore ?? []).map((move) => move.from),
    );
    const mobileAfter = new Set(opponentMovesAfter.map((move) => move.from));
    if ([...mobileBefore].some((cell) => !mobileAfter.has(cell)))
      ids.push("cerco-isolate");
  }
  if (
    after.over &&
    after.winner === before.player &&
    legalBefore?.length === 1
  ) {
    ids.push("cerco-last-opening");
  }
  return ids;
}

function bitCount(mask) {
  let remaining = mask >>> 0;
  let count = 0;
  while (remaining) {
    remaining &= remaining - 1;
    count++;
  }
  return count;
}

function desvioUnlocks({ before, after, legalAfter }) {
  const ids = [];
  const remaining = bitCount(after.available);
  if (after.winner === null && legalAfter?.length === 1 && remaining >= 5) {
    ids.push("desvio-narrow-path");
  }
  if (after.winner === before.player && remaining >= 4)
    ids.push("desvio-early-trap");
  return ids;
}

const evaluators = Object.freeze({
  broto: brotoUnlocks,
  cerco: cercoUnlocks,
  desvio: desvioUnlocks,
});

/**
 * Os jogos fornecem os movimentos legais que seus motores já conhecem.
 * O catálogo não importa motores, não resolve posições e não acessa armazenamento.
 * Treino conta quando a pessoa confirma; prévia, replay e o bot não chamam o registro.
 */
export function legacyVersusMissionUnlocks(gameId, context = {}) {
  if (!Object.hasOwn(evaluators, gameId) || !isEligibleTransition(context))
    return [];
  return evaluators[gameId](context);
}
