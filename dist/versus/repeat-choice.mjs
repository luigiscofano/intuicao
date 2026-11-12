/** Repete somente uma escolha completa e idêntica; nunca uma etapa intermediária. */
const CONFIRMABLE_ACTIONS = Object.freeze({
  enlace: ["pin"], vazante: ["cell", "pass"],
  mosaico: ["cell", "orientation"], quinhao: ["basket"],
  estalo: ["aim"], dobra: ["edge"], acorde: ["cell", "pass"],
  lastro: ["destination", "advance", "next-round"],
});

function sameChoice(left, right) {
  if (!left || !right) return false;
  const keys = Object.keys(left);
  return keys.length === Object.keys(right).length &&
    keys.every((key) => left[key] === right[key]);
}

export function canRepeatChoice(gameId, action) {
  return Boolean(CONFIRMABLE_ACTIONS[gameId]?.includes(action?.type));
}

export function repeatsPendingChoice(gameId, previousAction, action, pendingMove, nextMove) {
  return canRepeatChoice(gameId, action) && sameChoice(previousAction, action) &&
    sameChoice(pendingMove, nextMove);
}

/** O atalho indica a última etapa, sem sugerir que uma origem incompleta basta. */
export function repeatChoiceHelp(gameId, action) {
  const names = {
    pin: "no último pino", cell: gameId === "vazante" ? "no destino" : "na mesma casa",
    orientation: "na mesma orientação", basket: "no mesmo cesto",
    aim: "na mesma direção", edge: "na mesma borda",
    destination: "no mesmo destino", advance: "no mesmo destino",
    pass: "no passe", "next-round": "em Preparar segunda rodada",
  };
  return canRepeatChoice(gameId, action)
    ? `Clique ou toque de novo ${names[action.type]} para confirmar.`
    : "Complete a jogada; repita a última escolha para confirmar.";
}
