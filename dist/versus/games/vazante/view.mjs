import {
  actionAttributes,
  coordinate,
  escapeHTML,
  playerMark,
  playerName,
} from "../../shared/markup.mjs";
import {
  versusFrontIcon,
  VERSUS_FRONT_CROPS,
} from "../../../versus-mascot-art.mjs";
import { getConvoy, getLegalMoves } from "./engine.mjs";

const coord = (cell) => coordinate(cell, 5);
const center = (cell) => ({
  x: (cell % 5) * 100 + 50,
  y: Math.floor(cell / 5) * 100 + 50,
});

function mascotFor(config, player) {
  const requested = config?.mascots?.[player];
  return Object.hasOwn(VERSUS_FRONT_CROPS, requested)
    ? requested
    : player === 0
      ? "capivara"
      : "peixeBoi";
}

function boatMarkup(player, config, options = {}) {
  return `<span class="vazante-boat${options.selected ? " vazante-boat-selected" : ""}${options.towed ? " vazante-boat-towed" : ""}" data-player="${player}" aria-hidden="true">
    <svg class="vazante-hull" viewBox="0 0 100 100" focusable="false">
      <ellipse cx="50" cy="91" rx="39" ry="6" class="vazante-boat-shadow"/>
      <path d="M50 6C75 10 94 28 94 51C94 74 75 90 50 96C25 90 6 74 6 51C6 28 25 10 50 6Z" class="vazante-boat-body"/>
      <ellipse cx="50" cy="48" rx="33" ry="31" class="vazante-cockpit"/>
      <path d="M17 69Q50 89 83 69" class="vazante-bow"/>
      <circle cx="50" cy="7" r="3.2" class="vazante-tie"/><circle cx="93" cy="51" r="3.2" class="vazante-tie"/><circle cx="50" cy="94" r="3.2" class="vazante-tie"/><circle cx="7" cy="51" r="3.2" class="vazante-tie"/>
    </svg>
    <span class="vazante-passenger">${versusFrontIcon(mascotFor(config, player))}</span>
    <span class="vazante-team-mark">${playerMark(player)}</span>
  </span>`;
}

/** Preserva a origem da remada sugerida para que o jogador possa mudar o destino. */
export function selectionForMove(state, move) {
  if (move?.type !== "move") return null;
  const legal = getLegalMoves(state).find(
    (candidate) =>
      candidate.type === "move" &&
      candidate.from === move.from &&
      candidate.to === move.to,
  );
  return legal ? { from: legal.from, to: legal.to } : null;
}

export function interact(state, selection, action) {
  if (state.result) return { selection, move: null };
  if (action?.type === "reset") return { selection: null, move: null };
  const legal = getLegalMoves(state);
  if (action?.type === "pass" && legal.some((move) => move.type === "pass")) {
    return { selection: null, move: { type: "pass" } };
  }
  if (
    action?.type !== "cell" ||
    !Number.isInteger(action.cell) ||
    action.cell < 0 ||
    action.cell > 24
  ) {
    return { selection, move: null };
  }
  const cell = action.cell;
  const from = selection?.from;
  if (Number.isInteger(from) && state.board[from] === state.player) {
    const move = legal.find(
      (candidate) =>
        candidate.type === "move" &&
        candidate.from === from &&
        candidate.to === cell,
    );
    if (move) return { selection: { from, to: cell }, move };
    if (cell === from) return { selection: null, move: null };
  }
  return state.board[cell] === state.player
    ? { selection: { from: cell, to: null }, move: null }
    : { selection, move: null };
}

function trailMarkup(convoy, activePlayer, preview) {
  if (!convoy.length) return "";
  const paths = convoy
    .map(({ from, to, player }) => {
      const start = center(from);
      const end = center(to);
      const dx = (end.x - start.x) / 100;
      const dy = (end.y - start.y) / 100;
      const side = player === activePlayer ? -37 : 37;
      const x1 = start.x + dy * side + dx * 18;
      const y1 = start.y - dx * side + dy * 18;
      const x2 = end.x + dy * side - dx * 24;
      const y2 = end.y - dx * side - dy * 24;
      return `<path d="M${x1} ${y1}L${x2} ${y2}" class="vazante-trail vazante-trail-${player}" marker-end="url(#vazante-arrow-${player})"/>`;
    })
    .join("");
  return `<svg class="vazante-trails ${preview ? "vazante-preview-trails" : "vazante-last-trails"}" viewBox="0 0 500 500" aria-hidden="true" focusable="false"><defs><marker id="vazante-arrow-0" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#39674a"/></marker><marker id="vazante-arrow-1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#967a2d"/></marker></defs>${paths}</svg>`;
}

function instruction(state, selection, pendingMove, forcedPass) {
  if (state.result)
    return "A travessia terminou. Os barcos que chegaram descansam no cais.";
  if (forcedPass)
    return "Nenhum dos seus barcos pode remar. Prepare o passe e confirme para continuar.";
  if (pendingMove)
    return "Prévia da remada: confira todos os barcos rebocados antes de confirmar.";
  if (Number.isInteger(selection?.from))
    return `Barco em ${coord(selection.from)} selecionado. Escolha uma casa vizinha destacada.`;
  return "Selecione um barco seu. Uma remada pode levar um comboio inteiro.";
}

export function renderBoard(state, context = {}) {
  const {
    pendingMove = null,
    previewState = null,
    config = {},
    disabled = false,
  } = context;
  const selection = context.selection ?? selectionForMove(state, pendingMove);
  const legalMoves = context.legalMoves ?? getLegalMoves(state);
  const visible = previewState ?? state;
  const forcedPass = legalMoves.length === 1 && legalMoves[0].type === "pass";
  const from =
    Number.isInteger(selection?.from) &&
    state.board[selection.from] === state.player
      ? selection.from
      : null;
  const destinations = new Set(
    legalMoves
      .filter((move) => move.type === "move" && move.from === from)
      .map((move) => move.to),
  );
  const convoy =
    pendingMove?.type === "move"
      ? getConvoy(state, pendingMove)
      : (state.lastMove?.convoy ?? []);
  const towedCells = new Set(
    pendingMove ? convoy.slice(1).map(({ to }) => to) : [],
  );
  const cells = visible.board
    .map((owner, cell) => {
      const selected =
        pendingMove?.type === "move" ? pendingMove.to === cell : from === cell;
      const wasOrigin =
        pendingMove?.type === "move" &&
        convoy.some(({ from: origin }) => origin === cell) &&
        visible.board[cell] === null;
      const label = `${coord(cell)}. ${owner === null ? "Água livre." : `Barco de ${playerName(owner)}.`}${destinations.has(cell) ? " Destino legal." : ""}${towedCells.has(cell) ? " Será rebocado." : ""}`;
      return `<button type="button" class="vazante-cell${selected ? " vazante-selected" : ""}${destinations.has(cell) ? " vazante-destination" : ""}${wasOrigin ? " vazante-vacated" : ""}" ${actionAttributes({ type: "cell", cell })} aria-label="${escapeHTML(label)}" aria-pressed="${selected}" ${disabled || state.result ? "disabled" : ""}>${owner === null ? '<span class="vazante-water-dot" aria-hidden="true">·</span>' : boatMarkup(owner, config, { selected, towed: towedCells.has(cell) })}<span class="vazante-cell-name" aria-hidden="true">${coord(cell)}</span></button>`;
    })
    .join("");
  const ticks =
    '<div class="vazante-bank-ticks" aria-hidden="true">' +
    Array(5).fill("<i></i>").join("") +
    "</div>";
  const deliveryRows = [0, 1]
    .map(
      (player) =>
        `<section class="vazante-delivery-row" data-player="${player}" aria-label="Entregas de ${playerName(player)}"><div><strong>${playerMark(player)} ${playerName(player)}</strong><small>${visible.delivered[player]} de 2 chegadas${pendingMove && visible.delivered[player] > state.delivered[player] ? " · prévia" : ""}</small></div><div class="vazante-delivery-slots">${[0, 1].map((slot) => `<span class="vazante-delivery-slot${slot < visible.delivered[player] ? " vazante-arrived" : ""}${slot >= state.delivered[player] && slot < visible.delivered[player] ? " vazante-arrival-preview" : ""}">${slot < visible.delivered[player] ? boatMarkup(player, config) : '<span aria-hidden="true">⌑</span>'}</span>`).join("")}</div></section>`,
    )
    .join("");
  return `<div class="vazante-layout">
    <p class="vazante-instruction">${escapeHTML(instruction(state, selection, pendingMove, forcedPass))}</p>
    <div class="vazante-river-frame">
      <div class="vazante-bank" data-player="1"><strong>◆ Cais Âmbar</strong><span>Linha 1 · qualquer coluna</span>${ticks}</div>
      <div class="vazante-coordinate-area"><div class="vazante-column-labels" aria-hidden="true">${["A", "B", "C", "D", "E"].map((letter) => `<span>${letter}</span>`).join("")}</div><div class="vazante-row-labels" aria-hidden="true">${[1, 2, 3, 4, 5].map((row) => `<span>${row}</span>`).join("")}</div><div class="vazante-board"><div class="vazante-grid">${cells}</div>${trailMarkup(convoy, pendingMove ? state.player : state.lastMove?.player, Boolean(pendingMove))}</div></div>
      <div class="vazante-bank vazante-bank-south" data-player="0">${ticks}<strong>● Cais Verde</strong><span>Linha 5 · qualquer coluna</span></div>
    </div>
    <div class="vazante-tools">${forcedPass ? `<button type="button" ${actionAttributes({ type: "pass" })} ${disabled ? "disabled" : ""}>Preparar passe obrigatório</button>` : from !== null ? `<button type="button" ${actionAttributes({ type: "reset" })} ${disabled ? "disabled" : ""}>Escolher outro barco</button>` : "<span>A esteira inclui aliados e adversários.</span>"}<span>Turno ${Math.min(state.moveCount + 1, 80)} de 80</span></div>
    <div class="vazante-deliveries">${deliveryRows}</div>
    <p class="vazante-key">Uma casa vazia encerra o comboio. Todos os barcos têm o mesmo movimento.</p>
  </div>`;
}

export function describeMove(state, move, nextState) {
  if (move.type === "pass")
    return `${playerName(state.player)} está sem remadas legais e passa o turno.${nextState.result ? ` ${nextState.result.reason}` : ""}`;
  const convoy = nextState.lastMove.convoy;
  const followers = convoy.slice(1);
  const pulls = followers.length
    ? ` Reboca ${followers.map(({ from, to, player }) => `${playerName(player)} de ${coord(from)} para ${coord(to)}`).join("; ")}.`
    : " Nenhum barco está imediatamente atrás para ser rebocado.";
  const arrivals = nextState.lastMove.arrivals.length
    ? ` ${nextState.lastMove.arrivals.map(({ player, cell }) => `${playerName(player)} atraca em ${coord(cell)}`).join("; ")}.`
    : "";
  return `${playerName(state.player)} rema de ${coord(move.from)} para ${coord(move.to)}.${pulls}${arrivals}${nextState.result ? ` ${nextState.result.reason}` : ""}`;
}

export function getStatus(state) {
  if (state.result) return state.result.reason;
  if (getLegalMoves(state)[0]?.type === "pass")
    return `${playerName(state.player)} está sem remadas legais e precisa passar.`;
  return `${playerName(state.player)} escolhe um barco e uma casa vizinha vazia.`;
}

export function renderResult(state) {
  if (!state.result) return "";
  const winner = state.result.winner;
  return `<div class="vazante-result"><span class="vazante-result-water" aria-hidden="true">≈ ≈ ≈</span><strong>${winner === null ? "As equipes dividem a travessia." : `${playerMark(winner)} Dois barcos de ${playerName(winner)} chegaram ao cais.`}</strong><span>${state.delivered[0]} chegadas verdes · ${state.delivered[1]} chegadas âmbar</span></div>`;
}
