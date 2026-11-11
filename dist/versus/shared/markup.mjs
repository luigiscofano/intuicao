/** Escapa conteúdo antes de inseri-lo nas pequenas composições HTML dos jogos. */
export function escapeHTML(value) {
  const entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return String(value).replace(/[&<>"']/g, (character) => entities[character]);
}

export function actionAttributes(action) {
  return `data-action="${escapeHTML(JSON.stringify(action))}"`;
}

export function coordinate(cell, columns) {
  const column = String.fromCharCode(65 + (cell % columns));
  return `${column}${Math.floor(cell / columns) + 1}`;
}

export function playerMark(player) {
  return player === 0 ? "●" : "◆";
}

export function playerName(player) {
  return player === 0 ? "Verde" : "Âmbar";
}
