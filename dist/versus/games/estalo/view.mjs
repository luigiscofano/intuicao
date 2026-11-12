import {
  actionAttributes,
  coordinate,
  escapeHTML,
  playerMark,
  playerName,
} from "../../shared/markup.mjs";
import { DIRECTIONS } from "./engine.mjs";

function podArt(pod) {
  if (!pod) {
    return '<svg class="estalo-pod-art" viewBox="0 0 100 100" aria-hidden="true"><path d="M10 43Q33 12 81 34Q48 43 10 43Z" fill="#E9E1C9" stroke="#B4AE99" stroke-width="3"/><path d="M23 61Q61 88 91 50Q60 61 23 61Z" fill="#EEE7D3" stroke="#B4AE99" stroke-width="3"/><path d="M40 42L60 61" stroke="#CCC5B0" stroke-width="2"/></svg>';
  }
  const color = pod.owner === 0 ? "#39674A" : "#B99B46";
  const pale = pod.owner === 0 ? "#E1EDCE" : "#F5E7B2";
  const marker =
    pod.owner === 0
      ? '<circle cx="83" cy="84" r="7" fill="#39674A"/>'
      : '<path d="M83 76L91 84L83 92L75 84Z" fill="#B99B46"/>';
  return `<svg class="estalo-pod-art" viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(${(pod.direction - 1) * 90} 50 48)"><path d="M9 48C11 12 67 11 94 48C67 85 11 84 9 48Z" fill="${pale}" stroke="${color}" stroke-width="4"/><path d="M22 34Q48 20 74 36" fill="none" stroke="#FFFCF3" stroke-width="5" stroke-linecap="round"/><path d="M29 48H70M59 35L72 48L59 61" fill="none" stroke="#30412F" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>${marker}</svg>`;
}

function aimControls(state, selection, pending, disabled) {
  const cell = pending?.type === "burst" ? pending.cell : selection?.cell;
  const pod = Number.isInteger(cell) ? state.board[cell] : null;
  if (!pod || pod.owner !== state.player) {
    return '<p class="estalo-instruction">Escolha uma vagem da sua equipe para preparar o disparo.</p>';
  }
  const selectedTurn = pending?.turn;
  const options = [
    { turn: -1, label: "Girar 90° à esquerda", short: "↶ 90°" },
    { turn: 0, label: "Manter direção", short: "Manter" },
    { turn: 1, label: "Girar 90° à direita", short: "90° ↷" },
  ];
  return `<div class="estalo-aim"><p>Origem <strong>${coordinate(cell, 4)}</strong>: escolha a direção da abertura.</p><div class="estalo-aim-buttons">${options
    .map(({ turn, label, short }) => {
      const direction = (pod.direction + turn + 4) % 4;
      return `<button type="button" class="estalo-aim-button${selectedTurn === turn ? " is-selected" : ""}" ${actionAttributes({ type: "aim", cell, turn })} ${disabled ? "disabled" : ""} aria-label="${escapeHTML(label)} em ${coordinate(cell, 4)}: ${DIRECTIONS[direction].arrow}"><span class="estalo-direction" aria-hidden="true">${DIRECTIONS[direction].arrow}</span><span>${short}</span></button>`;
    })
    .join("")}</div></div>`;
}

export function renderBoard(state, context = {}) {
  const preview = context.previewState;
  const pending = context.pendingMove;
  const display = preview ?? state;
  const disabled = Boolean(context.disabled || state.result);
  const selectedCell = pending?.cell ?? context.selection?.cell;
  const chain = preview?.lastChain ?? state.lastChain;
  const points = chain
    .map(
      (cell) => `${(cell % 4) * 100 + 50},${Math.floor(cell / 4) * 100 + 50}`,
    )
    .join(" ");
  const cells = state.board
    .map((original, cell) => {
      const visible = display.board[cell];
      const step = chain.indexOf(cell);
      const available = original?.owner === state.player && !disabled;
      const label = original
        ? `${coordinate(cell, 4)}, vagem ${playerName(original.owner)}, seta ${DIRECTIONS[original.direction].arrow}${available ? ". Selecionar como origem." : "."}`
        : `${coordinate(cell, 4)}, casca aberta. Interrompe o pulso.`;
      return `<button type="button" class="estalo-cell${visible ? "" : " is-open"}${selectedCell === cell ? " is-selected" : ""}${step >= 0 ? " is-recent" : ""}" style="--estalo-step:${Math.max(step, 0)}" ${actionAttributes({ type: "cell", cell })} ${available ? "" : "disabled"} aria-label="${escapeHTML(label)}">
      ${podArt(visible)}${step >= 0 ? `<span class="estalo-chain-order" aria-hidden="true">${step + 1}</span>` : ""}${!visible ? '<span class="estalo-open-label" aria-hidden="true">aberta</span>' : ""}
    </button>`;
    })
    .join("");
  const gains = preview
    ? preview.scores.map((score, player) => score - state.scores[player])
    : null;
  return `<section class="estalo-area" aria-label="Canteiro de vagens">
    <div class="estalo-coordinates"><div class="estalo-column-labels" aria-hidden="true">${["A", "B", "C", "D"].map((letter) => `<span>${letter}</span>`).join("")}</div><div class="estalo-board-row"><div class="estalo-row-labels" aria-hidden="true">${[1, 2, 3, 4].map((row) => `<span>${row}</span>`).join("")}</div><div class="estalo-playfield"><svg class="estalo-pulse-path" viewBox="0 0 400 400" aria-hidden="true"><polyline points="${points}" fill="none" stroke="#73965E" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>${cells}</div></div></div>
    ${aimControls(state, context.selection, pending, disabled)}
    ${preview ? `<p class="estalo-preview-note">Prévia da cadeia: <strong>● Verde +${gains[0]}</strong> <strong>◆ Âmbar +${gains[1]}</strong>. A ordem aparece nas casas.</p>` : '<p class="estalo-tip">A seta conduz o pulso. Uma casca aberta interrompe o caminho.</p>'}
  </section>`;
}

export function interact(state, selection, action) {
  if (state.result || !action || !Number.isInteger(action.cell))
    return { selection, move: null };
  const pod = state.board[action.cell];
  if (!pod || pod.owner !== state.player) return { selection, move: null };
  if (action.type === "cell")
    return { selection: { cell: action.cell, turn: 0 }, move: null };
  if (action.type === "aim" && [-1, 0, 1].includes(action.turn)) {
    return {
      selection: { cell: action.cell, turn: action.turn },
      move: { type: "burst", cell: action.cell, turn: action.turn },
    };
  }
  return { selection, move: null };
}

// Mantém a origem da dica disponível para comparar os três giros possíveis.
export function selectionForMove(state, move) {
  if (move?.type !== "burst") return null;
  const decision = interact(state, null, {
    type: "aim",
    cell: move.cell,
    turn: move.turn,
  });
  return decision.move ? decision.selection : null;
}

export function describeMove(state, move, nextState) {
  const adjustment =
    move.turn === 0
      ? "mantém a seta"
      : `gira 90° à ${move.turn < 0 ? "esquerda" : "direita"}`;
  const gains = nextState.scores.map(
    (score, player) => score - state.scores[player],
  );
  const path = nextState.lastChain
    .map((cell) => coordinate(cell, 4))
    .join(" → ");
  return `${coordinate(move.cell, 4)} ${adjustment}. Caminho: ${path}. Verde abre mais ${gains[0]}; Âmbar abre mais ${gains[1]}. A cadeia para em uma casca ou na borda.`;
}

export function getStatus(state) {
  return state.result
    ? "A semeadura terminou. O resultado considera a cadeia inteira."
    : `${playerName(state.player)}, escolha uma vagem sua e mantenha ou gire sua seta em 90°.`;
}

export function renderResult(state) {
  return `<div class="estalo-result-scene">${state.scores.map((score, player) => `<div class="estalo-seed-row estalo-player-${player}"><strong>${playerMark(player)} ${playerName(player)} · ${score}/8</strong><div>${Array.from({ length: 8 }, (_, index) => `<span class="estalo-seed${index < score ? " is-sown" : ""}" aria-hidden="true">${index < score ? "♧" : "·"}</span>`).join("")}</div></div>`).join("")}<p>As vagens viraram sementes no canteiro.</p></div>`;
}
