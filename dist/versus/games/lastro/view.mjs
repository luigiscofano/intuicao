import { TRACKS, getLegalMoves, getLoads } from "./engine.mjs";
import {
  actionAttributes,
  escapeHTML,
  playerMark,
  playerName,
} from "../../shared/markup.mjs";

function signed(value) {
  return value > 0 ? `+${value}` : value < 0 ? `−${Math.abs(value)}` : "0";
}

function weightDrawing(track, ghost = false) {
  return `<svg class="lastro-weight${ghost ? " lastro-weight--ghost" : ""}" viewBox="0 0 70 78" aria-hidden="true">
    <path d="M27 15 V11 A8 8 0 0 1 43 11 V15"/>
    <path d="M16 17 Q35 11 54 17 L58 67 Q35 73 12 67 Z"/>
    <text x="35" y="46" class="lastro-weight-value" text-anchor="middle">${track.value}</text>
    <text x="35" y="61" class="lastro-weight-code" text-anchor="middle">${track.id}</text>
  </svg>`;
}

function currentSelection(selection, pendingMove) {
  if (pendingMove?.type === "advance") return pendingMove.piece;
  return selection?.piece ?? null;
}

function destinationDelta(state, track, to) {
  return (
    getLoads(state).delta +
    track.sign * track.value * (to - state.positions[track.id])
  );
}

function markCell(
  state,
  track,
  mark,
  selected,
  legalMoves,
  pendingMove,
  disabled,
) {
  const position = state.positions[track.id];
  const atWeight = position === mark;
  const pending =
    pendingMove?.type === "advance" &&
    pendingMove.piece === track.id &&
    pendingMove.to === mark;
  const legal =
    selected === track.id &&
    legalMoves.some(
      (move) =>
        move.type === "advance" && move.piece === track.id && move.to === mark,
    );
  const classes = [
    "lastro-mark",
    atWeight ? "lastro-mark--occupied" : "",
    mark < position ? "lastro-mark--passed" : "",
    legal ? "lastro-mark--legal" : "",
    atWeight && selected === track.id ? "lastro-mark--selected" : "",
    pending ? "lastro-mark--pending" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const body = atWeight
    ? weightDrawing(track)
    : pending
      ? weightDrawing(track, true)
      : `<span class="lastro-mark-tooth" aria-hidden="true">${track.side === "left" ? "‹" : "›"}</span>`;
  const number = `<span class="lastro-distance">${mark}</span>`;
  if (atWeight) {
    return `<button type="button" class="${classes}" ${actionAttributes({ type: "piece", piece: track.id })}
      aria-label="${track.id}, peso ${track.value}, na marca ${mark}. Selecionar peso compartilhado."
      aria-pressed="${selected === track.id}" ${disabled ? "disabled" : ""}>${body}${number}</button>`;
  }
  if (legal) {
    const delta = destinationDelta(state, track, mark);
    return `<button type="button" class="${classes}" ${actionAttributes({ type: "destination", piece: track.id, to: mark })}
      aria-label="Mover ${track.id} à marca ${mark}; desvio final ${signed(delta)}."
      ${disabled ? "disabled" : ""}>${body}${number}<span class="lastro-destination-delta">Δ ${signed(delta)}</span></button>`;
  }
  return `<div class="${classes}" aria-label="${track.id}, marca ${mark}${mark < position ? ", já ultrapassada" : ", sem ajuste selecionado"}">${body}${number}</div>`;
}

function renderTrack(
  state,
  track,
  selected,
  legalMoves,
  pendingMove,
  disabled,
) {
  const positions = track.side === "left" ? [4, 3, 2, 1] : [1, 2, 3, 4];
  const hasMove = legalMoves.some(
    (move) => move.type === "advance" && move.piece === track.id,
  );
  return `<div class="lastro-rail${selected === track.id ? " lastro-rail--selected" : ""}" data-piece="${track.id}">
    <div class="lastro-rail-caption"><strong>${track.id} · valor ${track.value}</strong><span>${hasMove ? "pode avançar" : "sem ajuste"}</span></div>
    <div class="lastro-marks">${positions
      .map((mark) =>
        markCell(
          state,
          track,
          mark,
          selected,
          legalMoves,
          pendingMove,
          disabled,
        ),
      )
      .join("")}</div>
  </div>`;
}

function loadCalculation(state, side) {
  return TRACKS.filter((track) => track.side === side)
    .map((track) => `${track.value}×${state.positions[track.id]}`)
    .join(" + ");
}

function renderMeter(state, previewState) {
  const { left, right, delta } = getLoads(state);
  const next = previewState ? getLoads(previewState) : null;
  const projection = (value, nextValue) =>
    nextValue !== undefined && nextValue !== value
      ? `<span class="lastro-load-preview"> → ${nextValue}</span>`
      : "";
  return `<div class="lastro-meter">
    <div class="lastro-load"><span>Carga esquerda</span><strong>${left}${projection(left, next?.left)}</strong></div>
    <div class="lastro-delta"><span>Desvio Δ</span><strong>${signed(delta)}${next && next.delta !== delta ? `<span class="lastro-load-preview"> → ${signed(next.delta)}</span>` : ""}</strong></div>
    <div class="lastro-load"><span>Carga direita</span><strong>${right}${projection(right, next?.right)}</strong></div>
    <div class="lastro-safe-band" aria-label="Faixa segura: menos quatro a mais quatro; desvio atual ${signed(delta)}.">
      <span>−4</span><span>0</span><span>+4</span>
      <i class="lastro-gauge-pointer" style="left: ${((delta + 4) / 8) * 100}%" aria-hidden="true"></i>
      ${next ? `<i class="lastro-gauge-preview" style="left: ${((next.delta + 4) / 8) * 100}%" aria-hidden="true"></i>` : ""}
    </div>
  </div>`;
}

function selectedHint(state, selected, legalMoves) {
  if (!selected)
    return "Escolha um dos seis pesos compartilhados. Depois, escolha uma marca tracejada.";
  const track = TRACKS.find((item) => item.id === selected);
  if (!track) return "";
  const moves = legalMoves.filter(
    (move) => move.type === "advance" && move.piece === selected,
  );
  if (moves.length) {
    return `${selected} selecionado. Avance para ${moves.map((move) => `marca ${move.to} (Δ ${signed(destinationDelta(state, track, move.to))})`).join(" ou ")}.`;
  }
  if (state.positions[selected] === 4)
    return `${selected} já chegou à marca 4. Escolha outro peso.`;
  return `${selected} não pode avançar agora: o desvio sairia da faixa −4 a +4. Escolha outro peso.`;
}

function roundMessage(state, disabled) {
  if (state.phase !== "between-rounds") return "";
  return `<div class="lastro-round-break" role="status">
    <strong>${playerMark(state.roundWinner)} ${playerName(state.roundWinner)} venceu a rodada 1.</strong>
    <p>Não restou ajuste legal. Placar: ${state.roundScores[0]}–${state.roundScores[1]}. Todos os pesos voltam à marca 1; o amarelo começa a rodada 2.</p>
    <button type="button" class="lastro-next-round" ${actionAttributes({ type: "next-round" })} ${disabled ? "disabled" : ""}>Preparar segunda rodada</button>
  </div>`;
}

export function renderBoard(state, context = {}) {
  const legalMoves = context.legalMoves ?? getLegalMoves(state);
  const pendingMove = context.pendingMove ?? null;
  const preview = context.previewState ?? null;
  const selected = currentSelection(context.selection, pendingMove);
  const disabled = Boolean(context.disabled || state.phase !== "playing");
  const arm = (
    side,
  ) => `<section class="lastro-arm lastro-arm--${side}" aria-label="Pesos do lado ${side === "left" ? "esquerdo" : "direito"}, todos compartilhados">
    <h4>${side === "left" ? "← Para fora · esquerda" : "Direita · para fora →"}</h4>
    ${TRACKS.filter((track) => track.side === side)
      .map((track) =>
        renderTrack(state, track, selected, legalMoves, pendingMove, disabled),
      )
      .join("")}
  </section>`;
  const loads = getLoads(state);
  const description =
    pendingMove && preview
      ? describeMove(state, pendingMove, preview)
      : state.phase === "playing"
        ? selectedHint(state, selected, legalMoves)
        : getStatus(state);
  return `<div class="lastro-game">
    <div class="lastro-round-heading"><strong>Rodada ${state.round} de 2</strong><span>${state.roundMoveCount} ${state.roundMoveCount === 1 ? "ajuste" : "ajustes"} nesta rodada</span></div>
    ${renderMeter(state, preview)}
    <div class="lastro-instrument" role="group" aria-label="Seis contrapesos compartilhados em trilhos de quatro marcas">
      ${arm("left")}
      <div class="lastro-fulcrum" aria-hidden="true"><span></span><svg viewBox="0 0 60 45"><path d="M30 4 L55 39 H5 Z"/><path d="M2 42 H58"/></svg></div>
      ${arm("right")}
    </div>
    <p class="lastro-preview-description">${escapeHTML(description)}</p>
    ${roundMessage(state, Boolean(context.disabled))}
    <details class="lastro-calculation"><summary>Como as cargas formam o desvio</summary>
      <p>Esquerda: ${loadCalculation(state, "left")} = <strong>${loads.left}</strong>.</p>
      <p>Direita: ${loadCalculation(state, "right")} = <strong>${loads.right}</strong>.</p>
      <p>Δ = direita − esquerda = ${loads.right} − ${loads.left} = <strong>${signed(loads.delta)}</strong>. A faixa segura inclui −4 e +4.</p>
    </details>
    <p class="lastro-shared-note">Todos os pesos são compartilhados. Avance 1 ou 2 marcas; nunca recue.</p>
  </div>`;
}

export function interact(state, selection, action) {
  if (!action || state.result) return { selection: null, move: null };
  const legalMoves = getLegalMoves(state);
  if (action.type === "next-round") {
    return {
      selection: null,
      move: legalMoves.find((move) => move.type === "next-round") ?? null,
    };
  }
  if (state.phase !== "playing") return { selection: null, move: null };
  if (action.type === "piece") {
    const track = TRACKS.find((item) => item.id === action.piece);
    return { selection: track ? { piece: track.id } : selection, move: null };
  }
  if (action.type === "destination" || action.type === "advance") {
    const move = legalMoves.find(
      (candidate) =>
        candidate.type === "advance" &&
        candidate.piece === action.piece &&
        candidate.to === action.to,
    );
    return {
      selection: move ? { piece: move.piece } : selection,
      move: move ?? null,
    };
  }
  return { selection, move: null };
}

/** Uma sugestão de treino mantém o peso ativo para permitir escolher outro destino. */
export function selectionForMove(state, move) {
  return interact(state, null, move).selection;
}

export function describeMove(state, move, nextState) {
  if (move.type === "next-round") {
    return "Rodada 2: todos os pesos voltam à marca 1, Δ volta a 0 e o amarelo começa. O placar da primeira rodada é mantido.";
  }
  const track = TRACKS.find((item) => item.id === move.piece);
  const from = state.positions[move.piece];
  const variation = track.value * (move.to - from);
  const before = getLoads(state);
  const after = getLoads(nextState);
  const arithmetic = `${signed(before.delta)} ${track.sign === -1 ? "−" : "+"} ${variation} = ${signed(after.delta)}`;
  const ending =
    nextState.roundWinner !== null
      ? ` Não sobra ajuste legal: ${playerName(state.player)} vence a rodada ${state.round}.`
      : ` A vez passa a ${playerName(nextState.player)}.`;
  return `${move.piece}: marca ${from} → ${move.to}. Δ: ${arithmetic}. Cargas: esquerda ${after.left}, direita ${after.right}.${ending}`;
}

export function getStatus(state) {
  if (state.result)
    return `${state.result.winner === null ? "Empate" : `${playerName(state.result.winner)} venceu o duelo`}. ${state.result.reason}`;
  if (state.phase === "between-rounds") {
    return `${playerName(state.roundWinner)} venceu a primeira rodada. Prepare a segunda; o amarelo começa.`;
  }
  return `${playerName(state.player)} ajusta um dos seis pesos: avance 1 ou 2 marcas e mantenha Δ entre −4 e +4.`;
}

export function renderResult(state) {
  if (!state.result) return "";
  return `<div class="lastro-result-scene" aria-hidden="true"><span>● ${state.roundScores[0]}</span>
    <svg viewBox="0 0 140 90"><path d="M70 20 V72 M22 32 H118 M70 57 L88 80 H52 Z"/><path d="M22 32 L10 58 H34 Z M118 32 L106 58 H130 Z"/></svg>
    <span>${state.roundScores[1]} ◆</span></div>`;
}
