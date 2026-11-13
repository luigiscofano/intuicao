import { gamePlayerName, playerAvatar } from "../../player-identities.mjs";
const playerName = (player) => gamePlayerName("acorde", player);
import { SYMBOLS, getActiveAxis, getLegalMoves, getScores } from "./engine.mjs";
import {
  actionAttributes,
  coordinate,
  escapeHTML,
  playerMark,
} from "../../shared/markup.mjs";

const SYMBOL_NAMES = Object.freeze({
  folha: "folha",
  gota: "gota",
  onda: "onda",
  sol: "sol",
});
const SYMBOL_PLURALS = Object.freeze({
  folha: "folhas",
  gota: "gotas",
  onda: "ondas",
  sol: "sóis",
});

function symbolDrawing(symbol) {
  if (symbol === "folha") {
    return '<path d="M25 56 C24 32 47 24 70 29 C66 53 46 65 25 56 Z" fill="currentColor"/><path d="M32 53 L61 35" stroke="var(--acorde-ivory)" stroke-width="4" stroke-linecap="round"/>';
  }
  if (symbol === "gota") {
    return '<path d="M48 25 C42 36 30 44 32 53 C34 66 62 66 64 53 C66 44 54 36 48 25 Z" fill="currentColor"/>';
  }
  if (symbol === "onda") {
    return '<path d="M23 40 Q35 25 48 40 T73 40 M23 55 Q35 40 48 55 T73 55" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>';
  }
  return '<g stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><circle cx="48" cy="44" r="10" fill="currentColor"/><path d="M48 22 V16 M48 66 V72 M26 44 H20 M70 44 H76 M32 28 L28 24 M64 60 L68 64 M32 60 L28 64 M64 28 L68 24"/></g>';
}

function symbolIcon(symbol) {
  return `<svg class="acorde-symbol" viewBox="0 0 96 88" aria-hidden="true">${symbolDrawing(symbol)}</svg>`;
}

function bell(symbol) {
  return `<svg class="acorde-bell" viewBox="0 0 96 100" aria-hidden="true">
    <path class="acorde-bell-loop" d="M40 14 A8 8 0 0 1 56 14"/>
    <path class="acorde-bell-body" d="M18 25 Q48 10 78 25 L86 80 Q48 92 10 80 Z"/>
    <g transform="translate(0 7)">${symbolDrawing(symbol)}</g>
    <circle class="acorde-bell-clapper" cx="48" cy="93" r="5"/>
  </svg>`;
}

function trolley(player, initial = false) {
  return `<svg class="acorde-trolley${initial ? " acorde-trolley--initial" : ""}" viewBox="0 0 80 65" aria-hidden="true">
    <rect x="12" y="12" width="56" height="34" rx="6"/>
    <path d="${player === 0 ? "M28 29 H52" : "M40 20 V38"}"/>
    <circle cx="23" cy="53" r="5"/><circle cx="57" cy="53" r="5"/>
  </svg>`;
}

function axisLabel(state) {
  const axis = getActiveAxis(state);
  return axis.kind === "row"
    ? `linha ${axis.index + 1}`
    : `coluna ${String.fromCharCode(65 + axis.index)}`;
}

function collectionPanel(state, player, previewState) {
  const collection = state.collections[player];
  const pairs = getScores(state)[player];
  const afterPairs = previewState ? getScores(previewState)[player] : pairs;
  const symbols = SYMBOLS.map((symbol) => {
    const count = collection[symbol];
    const projected = previewState?.collections[player][symbol] ?? count;
    return `<div class="acorde-collected${count >= 2 ? " acorde-collected--pair" : ""}">
      <div class="acorde-pair-support" aria-hidden="true">
        <span class="${count > 0 ? "" : "acorde-pair-slot--empty"}">${bell(symbol)}</span>
        <span class="${count > 1 ? "" : "acorde-pair-slot--empty"}">${bell(symbol)}</span>
      </div>
      <span class="acorde-symbol-name">${SYMBOL_NAMES[symbol]}</span>
      <strong aria-label="${count} ${count === 1 ? SYMBOL_NAMES[symbol] : SYMBOL_PLURALS[symbol]} na coleção">
        ${count}${projected !== count ? `<span class="acorde-count-preview"> → ${projected}</span>` : ""}
      </strong>
      <span class="acorde-pair-label">${count >= 2 ? "par completo" : "sem par"}</span>
    </div>`;
  }).join("");
  return `<section class="acorde-collection acorde-collection--${player}" aria-label="Coleção de ${playerName(player)}">
    <h4><span class="player-identity-heading">${playerAvatar("acorde", player)}${playerMark(player)} ${playerName(player)}</span><span>${pairs}/3 pares${afterPairs > pairs ? " · +1 na prévia" : ""}</span></h4>
    <div class="acorde-collected-grid">${symbols}</div>
  </section>`;
}

function renderCell(state, cell, legalCells, pendingMove, disabled) {
  const symbol = state.board[cell];
  const active = getActiveAxis(state);
  const inAxis =
    active.kind === "row"
      ? Math.floor(cell / 4) === active.index
      : cell % 4 === active.index;
  const selected = pendingMove?.type === "collect" && pendingMove.cell === cell;
  const classes = [
    "acorde-cell",
    inAxis && !state.result ? "acorde-cell--active" : "",
    selected ? "acorde-cell--selected" : "",
    symbol === null ? "acorde-cell--empty" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const name = coordinate(cell, 4);
  if (symbol === null) {
    const atCursor = state.cursor === cell;
    return `<div class="${classes}" aria-label="${name}: ${atCursor ? "carrinho; casa vazia" : "suporte vazio"}">
      ${atCursor ? trolley(state.player) : '<span class="acorde-empty-support" aria-hidden="true"></span>'}
    </div>`;
  }
  const legal = legalCells.has(cell);
  const label = `${name}, sino de ${SYMBOL_NAMES[symbol]}. ${legal ? "Recolher este sino." : "Fora do eixo ativo."}`;
  return `<button type="button" class="${classes}" ${actionAttributes({ type: "cell", cell })}
    aria-label="${escapeHTML(label)}" aria-pressed="${selected}" ${disabled || !legal ? "disabled" : ""}>
    ${bell(symbol)}${selected ? '<span class="acorde-pending-tag">prévia</span>' : ""}
  </button>`;
}

export function renderBoard(state, context = {}) {
  const legalMoves = context.legalMoves ?? getLegalMoves(state);
  const legalCells = new Set(
    legalMoves
      .filter((move) => move.type === "collect")
      .map((move) => move.cell),
  );
  const pendingMove = context.pendingMove ?? null;
  const preview = context.previewState ?? null;
  const disabled = Boolean(context.disabled || state.result);
  const columns =
    '<span class="acorde-axis-corner" aria-hidden="true"></span>' +
    ["A", "B", "C", "D"]
      .map(
        (label) =>
          `<span class="acorde-column-label" aria-hidden="true">${label}</span>`,
      )
      .join("");
  const rows = Array.from({ length: 4 }, (_, row) => {
    const initialTrolley = row === 1 && state.cursor === null;
    const label = `<span class="acorde-row-label" aria-label="Linha ${row + 1}${initialTrolley ? ", posição inicial do carrinho" : ""}">
      ${row + 1}${initialTrolley ? trolley(0, true) : ""}
    </span>`;
    return (
      label +
      Array.from({ length: 4 }, (_, column) =>
        renderCell(state, row * 4 + column, legalCells, pendingMove, disabled),
      ).join("")
    );
  }).join("");
  const pass = legalMoves.some((move) => move.type === "pass");
  return `<div class="acorde-game" data-player="${state.player}">
    <div class="acorde-instrument-heading">
      <span>${playerMark(state.player)} ${state.result ? "Instrumento encerrado" : `${playerName(state.player)} · ${axisLabel(state)}`}</span>
      <span>${state.board.filter((symbol) => symbol !== null).length} sinos restantes</span>
    </div>
    <div class="acorde-board" role="group" aria-label="Instrumento de quatro linhas e quatro colunas. ${escapeHTML(getStatus(state))}">
      ${columns}${rows}
    </div>
    ${
      pass
        ? `<button type="button" class="acorde-pass" ${actionAttributes({ type: "pass" })} ${disabled ? "disabled" : ""}>
      Passar a vez · não há sino na ${axisLabel(state)}
    </button>`
        : ""
    }
    <p class="acorde-board-caption">${
      pendingMove && preview
        ? escapeHTML(describeMove(state, pendingMove, preview))
        : "O carrinho fica na casa recolhida. Jogador 1 (verde) percorre linhas; Jogador 2 (âmbar), colunas."
    }</p>
    <div class="acorde-collections">
      ${collectionPanel(state, 0, preview)}${collectionPanel(state, 1, preview)}
    </div>
  </div>`;
}

export function interact(state, selection, action) {
  if (!action || state.result) return { selection: null, move: null };
  const move =
    action.type === "cell" ? { type: "collect", cell: action.cell } : action;
  const legal = getLegalMoves(state).find(
    (candidate) =>
      candidate.type === move.type &&
      (candidate.type === "pass" || candidate.cell === move.cell),
  );
  return { selection: null, move: legal ?? null };
}

export function describeMove(state, move, nextState) {
  if (move.type === "pass") {
    return nextState.result
      ? `Segundo passe consecutivo. ${nextState.result.reason}`
      : `${playerName(state.player)} passa: não há sino na ${axisLabel(state)}. O carrinho permanece no lugar.`;
  }
  const symbol = state.board[move.cell];
  const scoreBefore = getScores(state)[state.player];
  const scoreAfter = getScores(nextState)[state.player];
  const pair =
    scoreAfter > scoreBefore
      ? ` Completa um par de ${SYMBOL_NAMES[symbol]}: ${scoreAfter}/3 pares.`
      : "";
  const following = nextState.result
    ? ` ${nextState.result.winner === null ? "Empate." : `${playerName(nextState.result.winner)} vence.`}`
    : ` O rival recebe a ${axisLabel(nextState)}.`;
  return `${playerName(state.player)} recolhe ${coordinate(move.cell, 4)}, sino de ${SYMBOL_NAMES[symbol]}.${pair}${following}`;
}

export function getStatus(state) {
  if (state.result) {
    return `${state.result.winner === null ? "Empate" : `${playerName(state.result.winner)} venceu`}. ${state.result.reason}`;
  }
  if (getLegalMoves(state)[0]?.type === "pass") {
    return `Não há sino na ${axisLabel(state)}. ${playerName(state.player)} deve passar a vez.`;
  }
  return `${playerName(state.player)} recolhe um sino da ${axisLabel(state)}. Escolha para ver a prévia.`;
}

export function renderResult(state) {
  if (!state.result) return "";
  const winner = state.result.winner;
  const completed =
    winner === null
      ? SYMBOLS.slice(0, 3)
      : SYMBOLS.filter((symbol) => state.collections[winner][symbol] >= 2);
  return `<div class="acorde-result-scene" aria-hidden="true">${completed
    .map((symbol) => `<span>${symbolIcon(symbol)}${symbolIcon(symbol)}</span>`)
    .join("")}</div>`;
}
