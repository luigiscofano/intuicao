import {
  actionAttributes,
  coordinate,
  escapeHTML,
  playerMark,
  playerName,
} from "../../shared/markup.mjs";
import {
  EDGES,
  getEdgeIndex,
  getLegalMoves,
  getLitNodes,
  getScores,
} from "./engine.mjs";

const position = (cell) => ({
  x: 90 + (cell % 5) * 130,
  y: 90 + Math.floor(cell / 5) * 130,
});
const coord = (cell) => coordinate(cell, 5);
const mark = (player, x, y, radius = 5) =>
  player === 0
    ? `<circle cx="${x}" cy="${y}" r="${radius}" class="enlace-wire-mark"/>`
    : `<path d="M${x} ${y - radius * 1.2}L${x + radius * 1.2} ${y}L${x} ${y + radius * 1.2}L${x - radius * 1.2} ${y}Z" class="enlace-wire-mark"/>`;

function selectedPlacement(state, selection) {
  if (!selection || !Number.isInteger(selection.center)) return null;
  return getLegalMoves(state).some((move) => move.center === selection.center)
    ? selection
    : null;
}

/** Uma sugestão usa a mesma seleção editável dos três toques manuais. */
export function selectionForMove(state, move) {
  if (move?.type !== "place") return null;
  const legal = getLegalMoves(state).find(
    (candidate) =>
      candidate.center === move.center &&
      candidate.green === move.green &&
      candidate.amber === move.amber,
  );
  return legal
    ? { center: legal.center, green: legal.green, amber: legal.amber }
    : null;
}

export function interact(state, selection, action) {
  if (state.result) return { selection, move: null };
  if (action?.type === "reset") return { selection: null, move: null };
  const legal = getLegalMoves(state);
  const selected = selectedPlacement(state, selection);
  if (action?.type === "swap" && selected && Number.isInteger(selected.amber)) {
    const move = {
      type: "place",
      center: selected.center,
      green: selected.amber,
      amber: selected.green,
    };
    return {
      selection: { center: move.center, green: move.green, amber: move.amber },
      move,
    };
  }
  if (action?.type !== "pin" || !Number.isInteger(action.cell))
    return { selection, move: null };
  const cell = action.cell;
  if (!selected) {
    return legal.some((move) => move.center === cell)
      ? { selection: { center: cell, green: null, amber: null }, move: null }
      : { selection: null, move: null };
  }
  if (cell === selected.center) return { selection: null, move: null };
  if (!Number.isInteger(selected.green)) {
    if (
      legal.some(
        (move) => move.center === selected.center && move.green === cell,
      )
    ) {
      return {
        selection: { center: selected.center, green: cell, amber: null },
        move: null,
      };
    }
  } else {
    const move = legal.find(
      (candidate) =>
        candidate.center === selected.center &&
        candidate.green === selected.green &&
        candidate.amber === cell,
    );
    if (move)
      return {
        selection: {
          center: move.center,
          green: move.green,
          amber: move.amber,
        },
        move,
      };
    if (cell === selected.green)
      return {
        selection: { center: selected.center, green: null, amber: null },
        move: null,
      };
  }
  return legal.some((move) => move.center === cell)
    ? { selection: { center: cell, green: null, amber: null }, move: null }
    : { selection, move: null };
}

function stageText(selection, pendingMove) {
  if (pendingMove)
    return "Confira os dois fios e os pinos que vão acender. Confirme quando estiver pronto.";
  if (!selection) return "Escolha o pino onde os dois fios vão se encontrar.";
  if (!Number.isInteger(selection.green))
    return `Pino ${coord(selection.center)} escolhido. Toque no vizinho que receberá o fio verde.`;
  return `Fio verde até ${coord(selection.green)}. Agora escolha um vizinho perpendicular para o fio âmbar.`;
}

export function renderBoard(state, context = {}) {
  const { pendingMove = null, previewState = null, disabled = false } = context;
  const selection =
    selectedPlacement(state, context.selection) ??
    selectionForMove(state, pendingMove);
  const legalMoves = context.legalMoves ?? getLegalMoves(state);
  const visible = previewState ?? state;
  const networks = [
    new Set(getLitNodes(visible, 0)),
    new Set(getLitNodes(visible, 1)),
  ];
  const pendingEdges =
    pendingMove?.type === "place"
      ? [
          getEdgeIndex(pendingMove.center, pendingMove.green),
          getEdgeIndex(pendingMove.center, pendingMove.amber),
        ]
      : [];
  const candidates = new Set(
    legalMoves
      .filter(
        (move) =>
          !selection ||
          (move.center === selection.center &&
            (!Number.isInteger(selection.green) ||
              move.green === selection.green)),
      )
      .map((move) =>
        !selection
          ? move.center
          : !Number.isInteger(selection.green)
            ? move.green
            : move.amber,
      ),
  );
  const labels = Array.from(
    { length: 5 },
    (_, index) =>
      `<text x="${90 + index * 130}" y="28" class="enlace-axis">${String.fromCharCode(65 + index)}</text><text x="20" y="${98 + index * 130}" class="enlace-axis">${index + 1}</text>`,
  ).join("");
  const wires = EDGES.map(({ a, b }, index) => {
    const start = position(a);
    const end = position(b);
    const owner = visible.edges[index];
    const path = `M${start.x} ${start.y}L${end.x} ${end.y}`;
    if (owner === null) return `<path d="${path}" class="enlace-empty-wire"/>`;
    const lit = networks[owner].has(a) && networks[owner].has(b);
    return `<g class="enlace-wire enlace-team-${owner}${pendingEdges.includes(index) ? " enlace-pending-wire" : ""}"><path d="${path}" class="enlace-wire-body"/>${lit ? `<path d="${path}" class="enlace-wire-light"/>` : ""}${mark(owner, (start.x + end.x) / 2, (start.y + end.y) / 2)}</g>`;
  }).join("");
  const partial =
    !pendingMove && selection && Number.isInteger(selection.green)
      ? (() => {
          const start = position(selection.center);
          const end = position(selection.green);
          return `<path d="M${start.x} ${start.y}L${end.x} ${end.y}" class="enlace-partial-wire"/>`;
        })()
      : "";
  const pins = Array.from({ length: 25 }, (_, cell) => {
    const { x, y } = position(cell);
    return `<g><circle cx="${x}" cy="${y}" r="18" class="enlace-peg"/>${networks[0].has(cell) ? `<path d="M${x} ${y - 18}A18 18 0 0 0 ${x} ${y + 18}" class="enlace-lit-0"/>` : ""}${networks[1].has(cell) ? `<path d="M${x} ${y - 18}A18 18 0 0 1 ${x} ${y + 18}" class="enlace-lit-1"/>` : ""}<circle cx="${x}" cy="${y}" r="5.5" class="enlace-peg-center"/></g>`;
  }).join("");
  const buttons = Array.from({ length: 25 }, (_, cell) => {
    const { x, y } = position(cell);
    const selected = selection?.center === cell;
    const used = selection?.green === cell || selection?.amber === cell;
    const label = `${coord(cell)}. ${selected ? "Encontro selecionado." : candidates.has(cell) ? "Escolha disponível." : "Pino do tear."} ${networks[0].has(cell) ? "Aceso para Verde." : ""} ${networks[1].has(cell) ? "Aceso para Âmbar." : ""}`;
    return `<button type="button" class="enlace-pin${selected ? " enlace-selected" : ""}${used ? " enlace-endpoint" : ""}${candidates.has(cell) ? " enlace-candidate" : ""}" style="left:${x / 7}%;top:${y / 7}%" ${actionAttributes({ type: "pin", cell })} aria-label="${escapeHTML(label)}" aria-pressed="${selected}" ${disabled || state.result ? "disabled" : ""}></button>`;
  }).join("");
  const phase = pendingMove
    ? 3
    : !selection
      ? 0
      : !Number.isInteger(selection.green)
        ? 1
        : 2;
  return `<div class="enlace-layout">
    <ol class="enlace-steps" aria-label="Como preparar a presilha">
      ${["Escolha o pino", "Fio verde ●", "Fio âmbar ◆"].map((text, index) => `<li class="${phase === index ? "enlace-step-active" : phase > index ? "enlace-step-done" : ""}"><span>${index + 1}</span>${text}</li>`).join("")}
    </ol>
    <div class="enlace-board${pendingMove ? " enlace-has-preview" : ""}" data-winner="${visible.result?.winner ?? "none"}">
      <svg class="enlace-graph" viewBox="0 0 700 700" aria-hidden="true" focusable="false">
        <rect x="43" y="43" width="614" height="614" rx="24" class="enlace-tear"/>
        <rect x="50" y="76" width="13" height="548" rx="6" class="enlace-source enlace-source-0"/>
        <rect x="637" y="76" width="13" height="548" rx="6" class="enlace-exit enlace-exit-0"/>
        <rect x="76" y="50" width="548" height="13" rx="6" class="enlace-source enlace-source-1"/>
        <rect x="76" y="637" width="548" height="13" rx="6" class="enlace-exit enlace-exit-1"/>
        ${labels}${wires}${partial}${pins}
        <text x="350" y="687" class="enlace-margin-label">Verde: esquerda → direita · Âmbar: cima → baixo</text>
      </svg>${buttons}
    </div>
    <p class="enlace-instruction">${escapeHTML(state.result ? "O tear está concluído." : stageText(selection, pendingMove))}</p>
    <div class="enlace-tools"><span>${20 - state.moveCount} presilhas na reserva comum</span>${selection ? `<button type="button" ${actionAttributes({ type: "reset" })} ${disabled ? "disabled" : ""}>Escolher outro pino</button>` : ""}${pendingMove ? `<button type="button" ${actionAttributes({ type: "swap" })} ${disabled ? "disabled" : ""}>⇄ Trocar as cores</button>` : ""}</div>
    <p class="enlace-key"><span>● Verde</span><span>◆ Âmbar</span><span>Linha clara: rede ligada à entrada</span></p>
  </div>`;
}

export function describeMove(state, move, nextState) {
  const before = getScores(state);
  const after = getScores(nextState);
  const gains = [0, 1]
    .filter((player) => after[player] > before[player])
    .map(
      (player) =>
        `${playerName(player)} acende ${after[player] - before[player]} ${after[player] - before[player] === 1 ? "novo pino" : "novos pinos"}`,
    );
  return `${coord(move.center)}–${coord(move.green)} verde e ${coord(move.center)}–${coord(move.amber)} âmbar. ${gains.length ? `${gains.join("; ")}.` : "Nenhum novo pino se liga às entradas."}${nextState.result ? ` ${nextState.result.reason}` : ""}`;
}

export function getStatus(state) {
  return state.result
    ? state.result.reason
    : `${playerName(state.player)} prepara uma presilha para as duas redes.`;
}

export function renderResult(state) {
  if (!state.result) return "";
  const winner = state.result.winner;
  return `<div class="enlace-result" data-winner="${winner ?? "none"}"><span class="enlace-result-lights" aria-hidden="true">✦ ─ ✦ ─ ✦ ─ ✦ ─ ✦</span><strong>${winner === null ? "Dois ateliês, um empate." : `${playerMark(winner)} A guirlanda de ${playerName(winner)} está acesa.`}</strong></div>`;
}
