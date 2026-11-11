import {
  actionAttributes,
  coordinate,
  escapeHTML,
  playerMark,
  playerName,
} from "../../shared/markup.mjs";
import { getAvailableEdges, getOwner, getScores } from "./engine.mjs";

const EDGES = [
  { id: "north", name: "Topo", direction: "↓", phrase: "a borda de cima" },
  { id: "south", name: "Base", direction: "↑", phrase: "a borda de baixo" },
  { id: "west", name: "Esquerda", direction: "→", phrase: "a borda esquerda" },
  { id: "east", name: "Direita", direction: "←", phrase: "a borda direita" },
];

function sealsMarkup(tile) {
  if (tile.seals[0] + tile.seals[1] === 0)
    return '<span class="dobra-no-seal">sem selo</span>';
  return `<span class="dobra-seals"><span class="dobra-player-0">● <b>${tile.seals[0]}</b></span><span class="dobra-player-1">◆ <b>${tile.seals[1]}</b></span></span>`;
}

function foldedCell(state, cell, edge) {
  let row = Math.floor(cell / state.columns);
  let column = cell % state.columns;
  const columns = state.columns - Number(edge === "west" || edge === "east");
  if (edge === "north") row = Math.max(0, row - 1);
  if (edge === "south") row = Math.min(row, state.rows - 2);
  if (edge === "west") column = Math.max(0, column - 1);
  if (edge === "east") column = Math.min(column, state.columns - 2);
  return row * columns + column;
}

function edgeControls(state, selection, pending, disabled) {
  const chosenCell = pending?.type === "fold" ? pending.cell : selection?.cell;
  const available = getAvailableEdges(state);
  const hasCell =
    Number.isInteger(chosenCell) && Boolean(state.tiles[chosenCell]);
  return `<div class="dobra-edge-controls" aria-label="Bordas do atlas">${EDGES.map(
    (edge) => {
      const allowed = available.includes(edge.id);
      const rows =
        state.rows - Number(edge.id === "north" || edge.id === "south");
      const columns =
        state.columns - Number(edge.id === "west" || edge.id === "east");
      const label = allowed
        ? `Dobrar ${edge.phrase} para dentro: mapa ${rows} por ${columns}`
        : `${edge.name}: a dimensão já chegou ao mínimo`;
      return `<button type="button" class="dobra-edge${pending?.edge === edge.id ? " is-selected" : ""}" ${actionAttributes({ type: "edge", edge: edge.id })} ${disabled || !allowed || !hasCell ? "disabled" : ""} aria-label="${escapeHTML(label)}"><span class="dobra-edge-arrow" aria-hidden="true">${edge.direction}</span><strong>${edge.name}</strong><small>${allowed ? `${rows} × ${columns}` : "mínimo atingido"}</small></button>`;
    },
  ).join("")}</div>`;
}

export function renderBoard(state, context = {}) {
  const pending = context.pendingMove;
  const preview = context.previewState;
  const display = preview ?? state;
  const disabled = Boolean(context.disabled || state.result);
  const selectedCell = pending?.cell ?? context.selection?.cell;
  const destination =
    pending?.type === "fold"
      ? foldedCell(state, pending.cell, pending.edge)
      : null;
  const cells = display.tiles
    .map((tile, cell) => {
      const owner = getOwner(tile);
      const selected = preview ? destination === cell : selectedCell === cell;
      const position = coordinate(cell, display.columns);
      const label = `${position}, área ${tile.area}, ${tile.seals[0]} selos verdes e ${tile.seals[1]} selos âmbar. ${owner === null ? "Distrito neutro." : `${playerName(owner)} controla o distrito.`}`;
      return `<button type="button" class="dobra-tile dobra-owner-${owner ?? "none"}${selected ? " is-selected" : ""}" style="--dobra-layers:${Math.min(tile.area - 1, 3)}" ${actionAttributes({ type: "cell", cell })} ${disabled || preview ? "disabled" : ""} aria-label="${escapeHTML(label)}"><span class="dobra-area-number">${tile.area}</span>${sealsMarkup(tile)}${selected && !preview ? `<span class="dobra-new-seal dobra-player-${state.player}" aria-hidden="true">${playerMark(state.player)}+</span>` : ""}</button>`;
    })
    .join("");
  const stage = preview
    ? `Prévia: ${display.rows} × ${display.columns}`
    : `Mapa ${state.rows} × ${state.columns}`;
  const steps = state.result
    ? ""
    : `<div class="dobra-steps"><span class="${Number.isInteger(selectedCell) ? "is-done" : "is-current"}">1 · Marque um painel</span><span class="${Number.isInteger(selectedCell) ? "is-current" : ""}">2 · Escolha uma borda</span></div>`;
  const note = preview
    ? `<p class="dobra-preview-note">Prévia: o selo de ${coordinate(pending.cell, state.columns)} ficará em ${coordinate(destination, display.columns)}. As áreas e os selos já aparecem somados. As coordenadas foram atualizadas.</p>`
    : '<p class="dobra-tip">O número é a área. A maioria de selos controla a pilha; empate deixa a região neutra.</p>';
  return `<section class="dobra-area" aria-label="Atlas de papel">
    ${steps}
    ${state.result ? "" : edgeControls(state, context.selection, pending, disabled)}
    <div class="dobra-map-heading"><strong>${stage}</strong><span>Área total: 36</span></div>
    <div class="dobra-map" style="--dobra-columns:${display.columns};--dobra-rows:${display.rows};max-width:${Math.max(320, display.columns * 105)}px"><div class="dobra-column-labels" aria-hidden="true">${Array.from({ length: display.columns }, (_, column) => `<span>${String.fromCharCode(65 + column)}</span>`).join("")}</div><div class="dobra-map-row"><div class="dobra-row-labels" aria-hidden="true">${Array.from({ length: display.rows }, (_, row) => `<span>${row + 1}</span>`).join("")}</div><div class="dobra-grid${preview ? " is-preview" : ""}">${cells}</div></div></div>
    <div class="dobra-reserves" aria-label="Selos restantes">${display.reserves.map((count, player) => `<span class="dobra-player-${player}">${playerMark(player)} ${playerName(player)}: <b>${count}</b> ${count === 1 ? "selo" : "selos"}</span>`).join("")}</div>
    ${note}
  </section>`;
}

export function interact(state, selection, action) {
  if (state.result || !action) return { selection, move: null };
  if (
    action.type === "cell" &&
    Number.isInteger(action.cell) &&
    action.cell >= 0 &&
    action.cell < state.tiles.length
  ) {
    return { selection: { cell: action.cell }, move: null };
  }
  if (
    action.type === "edge" &&
    Number.isInteger(selection?.cell) &&
    state.tiles[selection.cell] &&
    getAvailableEdges(state).includes(action.edge)
  ) {
    return {
      selection: { cell: selection.cell, edge: action.edge },
      move: { type: "fold", cell: selection.cell, edge: action.edge },
    };
  }
  return { selection, move: null };
}

// A seleção usa o painel anterior à dobra, mesmo quando a prévia já reindexou o mapa.
export function selectionForMove(state, move) {
  if (move?.type !== "fold") return null;
  const decision = interact(
    state,
    { cell: move.cell },
    { type: "edge", edge: move.edge },
  );
  return decision.move ? decision.selection : null;
}

export function describeMove(state, move, nextState) {
  const edge = EDGES.find((item) => item.id === move.edge);
  const destination = foldedCell(state, move.cell, move.edge);
  const scores = getScores(nextState);
  return `${playerName(state.player)} coloca um selo em ${coordinate(move.cell, state.columns)} e dobra ${edge.phrase}. O selo passa a ${coordinate(destination, nextState.columns)} no mapa ${nextState.rows} × ${nextState.columns}. Área controlada: Verde ${scores[0]}, Âmbar ${scores[1]}; a soma total continua 36.`;
}

export function getStatus(state) {
  return state.result
    ? "O atlas terminou em quatro distritos. A maioria de selos definiu cada área."
    : `${playerName(state.player)}, coloque um selo em qualquer painel e escolha uma borda para dobrar.`;
}

export function renderResult(state) {
  return `<div class="dobra-result-scene"><strong>Atlas fechado em quatro distritos</strong><div>${state.tiles.map((tile) => `<span class="dobra-result-tile dobra-owner-${getOwner(tile) ?? "none"}"><b>${tile.area}</b>${sealsMarkup(tile)}</span>`).join("")}</div><p>Cada distrito pertence à equipe com mais selos. Empates ficam neutros.</p></div>`;
}
