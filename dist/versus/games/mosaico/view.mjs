import { getMosaicoMap } from "./maps.mjs";
import {
  actionAttributes,
  coordinate,
  escapeHTML,
  playerMark,
  playerName,
} from "../../shared/markup.mjs";
import {
  CORNER_COLORS,
  getLegalMoves,
  getScores,
  getSeals,
} from "./engine.mjs";

const orientationNames = ["cima", "direita", "baixo", "esquerda"];
const orientationArrows = ["↑", "→", "↓", "←"];
const coord = (cell, state) => coordinate(cell, getMosaicoMap(state).cols);
const validOrientation = (value) =>
  Number.isInteger(value) && value >= 0 && value < 4;

function tileArtwork(orientation) {
  const paths = [
    "M5 5H37L5 37Z",
    "M95 5V37L63 5Z",
    "M95 95H63L95 63Z",
    "M5 95V63L37 95Z",
  ];
  const centers = [
    [14, 14],
    [86, 14],
    [86, 86],
    [14, 86],
  ];
  const corners = CORNER_COLORS[orientation]
    .map((player, index) => {
      const [x, y] = centers[index];
      const symbol =
        player === 0
          ? `<circle cx="${x}" cy="${y}" r="3.6"/>`
          : `<path d="M${x} ${y - 4.7}L${x + 4.7} ${y}L${x} ${y + 4.7}L${x - 4.7} ${y}Z"/>`;
      return `<g class="mosaico-corner mosaico-color-${player}"><path d="${paths[index]}"/>${symbol}</g>`;
    })
    .join("");
  return `<svg class="mosaico-tile" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><rect x="3" y="3" width="94" height="94" rx="8" class="mosaico-tile-body"/>${corners}<circle cx="50" cy="50" r="6" class="mosaico-tile-center"/></svg>`;
}

/** A casa sugerida continua selecionada quando a pessoa decide girar o azulejo. */
export function selectionForMove(state, move) {
  if (move?.type !== "place") return null;
  const legal = getLegalMoves(state).find(
    (candidate) =>
      candidate.cell === move.cell &&
      candidate.orientation === move.orientation,
  );
  return legal ? { cell: legal.cell, orientation: legal.orientation } : null;
}

export function interact(state, selection, action) {
  if (state.result) return { selection, move: null };
  if (action?.type === "reset") return { selection: null, move: null };
  const orientation = validOrientation(selection?.orientation)
    ? selection.orientation
    : 0;
  let nextSelection;
  if (action?.type === "orientation" && validOrientation(action.orientation)) {
    nextSelection = {
      cell: selection?.cell ?? null,
      orientation: action.orientation,
    };
  } else if (
    action?.type === "cell" &&
    Number.isInteger(action.cell) &&
    action.cell >= 0 &&
    action.cell < state.tiles.length &&
    state.tiles[action.cell] === null
  ) {
    nextSelection = { cell: action.cell, orientation };
  } else {
    return { selection, move: null };
  }
  const cell = nextSelection.cell;
  const move =
    Number.isInteger(cell) && state.tiles[cell] === null
      ? { type: "place", cell, orientation: nextSelection.orientation }
      : null;
  return { selection: nextSelection, move };
}

function sealLabel(seal, state) {
  const location = `${coord(seal.cells[0], state)}/${coord(seal.cells[1], state)}/${coord(seal.cells[2], state)}/${coord(seal.cells[3], state)}`;
  if (!seal.complete) return `Junção ${location}, incompleta.`;
  return `Junção ${location}: ${seal.owner === -1 ? "dois cantos de cada cor, sem assinatura" : `selo de ${playerName(seal.owner)}`}.`;
}

export function renderBoard(state, context = {}) {
  const map = getMosaicoMap(state);
  const { pendingMove = null, previewState = null, disabled = false } = context;
  const selection = context.selection ?? selectionForMove(state, pendingMove);
  const orientation = validOrientation(pendingMove?.orientation)
    ? pendingMove.orientation
    : validOrientation(selection?.orientation)
      ? selection.orientation
      : 0;
  const visible = previewState ?? state;
  const beforeSeals = getSeals(state);
  const seals = getSeals(visible);
  const cells = visible.tiles
    .map((tile, cell) => {
      const pending = pendingMove?.cell === cell;
      const empty = state.tiles[cell] === null;
      const label = `${coord(cell, state)}. ${tile === null ? "Casa vazia." : `Verdes voltados para ${orientationNames[tile]}.`}${pending ? " Prévia de colocação." : ""}`;
      return `<button type="button" class="mosaico-cell${tile === null ? " mosaico-empty" : ""}${pending ? " mosaico-pending" : ""}" ${actionAttributes({ type: "cell", cell })} aria-label="${escapeHTML(label)}" aria-pressed="${pending}" ${disabled || state.result || !empty ? "disabled" : ""}>${tile === null ? '<span class="mosaico-empty-center" aria-hidden="true">·</span>' : tileArtwork(tile)}<span class="mosaico-cell-name" aria-hidden="true">${coord(cell, state)}</span></button>`;
    })
    .join("");
  const sealsMarkup = seals
    .map((seal) => {
      const newlyCompleted = seal.complete && !beforeSeals[seal.index].complete;
      const symbol = !seal.complete
        ? "·"
        : seal.owner === -1
          ? "–"
          : playerMark(seal.owner);
      return `<span class="mosaico-seal${seal.complete ? " mosaico-seal-complete" : ""}${newlyCompleted ? " mosaico-new-seal" : ""}" data-owner="${seal.owner ?? "none"}" style="left:${(seal.column + 1) * 100 / map.cols}%;top:${(seal.row + 1) * 100 / map.rows}%" role="img" aria-label="${escapeHTML(sealLabel(seal, state))}">${symbol}</span>`;
    })
    .join("");
  return `<div class="mosaico-layout" style="--mosaico-columns:${map.cols};--mosaico-rows:${map.rows}">
    <div class="mosaico-orientation-controls" role="group" aria-label="Orientação do azulejo: posição dos cantos verdes">
      ${orientationNames.map((name, index) => `<button type="button" class="mosaico-orientation${orientation === index ? " mosaico-orientation-selected" : ""}" ${actionAttributes({ type: "orientation", orientation: index })} aria-pressed="${orientation === index}" aria-label="Verdes para ${name}" ${disabled || state.result ? "disabled" : ""}>${tileArtwork(index)}<span>${orientationArrows[index]} ${name}</span></button>`).join("")}
    </div>
    <div class="mosaico-board-wrap">
      <div class="mosaico-column-labels" aria-hidden="true">${Array.from({ length: map.cols }, (_, col) => String.fromCharCode(65 + col)).map((letter) => `<span>${letter}</span>`).join("")}</div>
      <div class="mosaico-row-labels" aria-hidden="true">${Array.from({ length: map.rows }, (_, row) => row + 1).map((row) => `<span>${row}</span>`).join("")}</div>
      <div class="mosaico-board"><div class="mosaico-grid">${cells}</div><div class="mosaico-seals">${sealsMarkup}</div></div>
    </div>
    <p class="mosaico-instruction">${state.result ? "O painel está concluído." : pendingMove ? `Prévia em ${coord(pendingMove.cell, state)}. Você pode girar o azulejo antes de confirmar.` : "Escolha uma orientação e uma casa vazia do painel."}</p>
    <div class="mosaico-tools"><span>Reserva comum: <strong>${state.tiles.filter(tile => tile === null).length}</strong> ${state.tiles.filter(tile => tile === null).length === 1 ? "azulejo" : "azulejos"}</span>${pendingMove ? `<button type="button" ${actionAttributes({ type: "reset" })} ${disabled ? "disabled" : ""}>Escolher outra colocação</button>` : ""}</div>
    <div class="mosaico-key"><span>● Verde</span><span>◆ Âmbar</span><span>3 a 1 ou 4 a 0: 1 selo</span><span>2 a 2: sem assinatura</span></div>
  </div>`;
}

export function describeMove(state, move, nextState) {
  const before = getScores(state);
  const after = getScores(nextState);
  const gains = [0, 1]
    .filter((player) => after[player] > before[player])
    .map(
      (player) =>
        `${after[player] - before[player]} ${after[player] - before[player] === 1 ? "selo" : "selos"} para ${playerName(player)}`,
    );
  const ties = nextState.lastMove.completed.filter(
    ({ owner }) => owner === -1,
  ).length;
  const effects = gains.length
    ? `Assina ${gains.join(" e ")}.`
    : "Nenhum ponto novo para as oficinas.";
  return `${coord(move.cell, state)}, verdes voltados para ${orientationNames[move.orientation]}. ${effects}${ties ? ` ${ties} ${ties === 1 ? "junção fica" : "junções ficam"} sem assinatura, em 2 a 2.` : ""}${nextState.result ? ` ${nextState.result.reason}` : ""}`;
}

export function getStatus(state) {
  return state.result
    ? state.result.reason
    : `${playerName(state.player)} escolhe a casa e a orientação do próximo azulejo.`;
}

export function renderResult(state) {
  if (!state.result) return "";
  const scores = getScores(state);
  return `<div class="mosaico-result"><div class="mosaico-result-tile">${tileArtwork(0)}</div><strong>${state.result.winner === null ? "As duas oficinas assinam a obra." : `${playerMark(state.result.winner)} ${playerName(state.result.winner)} assina mais partes do painel.`}</strong><span>${scores[0]} selos verdes · ${scores[1]} selos âmbar</span></div>`;
}

/** O painel mostra precisamente as casas já ocupadas e as ainda disponíveis. */
export function mapPreview(map) {
  const preset = new Map(map.initialTiles.map(tile => [tile.cell, tile.orientation]));
  return `<svg viewBox="0 0 ${map.cols * 20} ${map.rows * 20}" aria-hidden="true" focusable="false">${Array.from({ length: map.rows * map.cols }, (_, cell) => {
    const orientation = preset.get(cell);
    return `<g transform="translate(${cell % map.cols * 20} ${Math.floor(cell / map.cols) * 20})"><rect x="1" y="1" width="18" height="18" rx="1" fill="#f7f3e8" stroke="#c6c6b2"/>${orientation === undefined ? '' : CORNER_COLORS[orientation].map((color, corner) => `<path d="${['M2 2H9L2 9Z','M18 2V9L11 2Z','M18 18H11L18 11Z','M2 18V11L9 18Z'][corner]}" fill="${color === 0 ? '#356a4d' : '#c59b37'}"/>`).join('')}</g>`;
  }).join('')}</svg>`;
}
