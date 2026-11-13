import { gamePlayerName, playerAvatar } from "../../player-identities.mjs";
const playerName = (player) => gamePlayerName("quinhao", player);
import {
  actionAttributes,
  escapeHTML,
  playerMark,
} from "../../shared/markup.mjs";
import { getOfferIds, getScores, scoreInventory } from "./engine.mjs";
import { FRUIT_LABELS as FRUITS, renderFruitArt as fruitArt } from "./fruit-art.mjs";

/** Percurso horário de 24 casas: seis colunas por oito linhas.
 * Só a apresentação muda; IDs, ordem e vizinhança continuam no motor.
 */
export function mobileBasketPosition(index, count) {
  const slot = Math.floor(index * 24 / count);
  if (slot < 6) return { column: slot + 1, row: 1 };
  if (slot < 13) return { column: 6, row: slot - 4 };
  if (slot < 18) return { column: 18 - slot, row: 8 };
  return { column: 1, row: 25 - slot };
}

function fruitLegend() {
  return `<div class="quinhao-mobile-legend" aria-label="Frutos da colheita">${FRUITS.map((fruit, index) => `<span>${fruitArt(index)}<span>${escapeHTML(fruit[0].toUpperCase() + fruit.slice(1))}</span></span>`).join("")}</div>`;
}

function deposits(inventories) {
  return inventories
    .map(
      (inventory, player) => `
    <div class="quinhao-deposit quinhao-player-${player}">
      <div class="quinhao-deposit-heading"><strong class="player-identity-heading">${playerAvatar("quinhao", player)}${playerMark(player)} <span class="player-full-name">${playerName(player)}</span><span class="player-short-name" aria-label="${playerName(player)}">J${player + 1}</span></strong><span>${scoreInventory(inventory)} pts</span></div>
      <div class="quinhao-counts">${inventory
        .map(
          (count, fruit) => `
        <span class="quinhao-count" role="group" aria-label="${count} ${escapeHTML(FRUITS[fruit])}">
          <span class="quinhao-count-value" aria-hidden="true">${fruitArt(fruit)}<b>${count}</b></span>
          <span class="quinhao-fruit-label" aria-hidden="true">${escapeHTML(FRUITS[fruit][0].toUpperCase() + FRUITS[fruit].slice(1))}</span>
        </span>
      `,
        )
        .join("")}</div>
    </div>
  `,
    )
    .join("");
}

function offerButtons(state, disabled, selected) {
  if (state.phase !== "choose") return "";
  return `<div class="quinhao-choices" aria-label="Os três cestos oferecidos">${state.offer
    .map((id) => {
      const basket = state.baskets.find((item) => item.id === id);
      return `<button type="button" class="quinhao-choice${selected === id ? " is-selected" : ""}" ${actionAttributes({ type: "basket", basket: id })} ${disabled ? "disabled" : ""} aria-label="Ficar com o cesto ${id}, ${escapeHTML(FRUITS[basket.fruit])}">
      ${fruitArt(basket.fruit, true)}<strong>Cesto ${id}</strong><span>${escapeHTML(FRUITS[basket.fruit])}</span>
    </button>`;
    })
    .join("")}</div>`;
}

export function renderBoard(state, context = {}) {
  const pending = context.pendingMove;
  const preview = context.previewState;
  const display = preview ?? state;
  const disabled = Boolean(context.disabled || state.result);
  const offered =
    pending?.type === "offer" ? getOfferIds(state, pending.start) : state.offer;
  // A prévia mostra os depósitos futuros, mas os cestos ficam no lugar até
  // confirmar. Assim o segundo toque não cai sobre outro cesto ou um vazio.
  const points = state.baskets.map((basket, index) => {
    const angle = -Math.PI / 2 + (index / state.baskets.length) * Math.PI * 2;
    return {
      ...basket,
      mobile: mobileBasketPosition(index, state.baskets.length),
      x: 50 + Math.cos(angle) * 43,
      y: 50 + Math.sin(angle) * 43,
    };
  });
  const rope =
    points.length > 1
      ? [...points, points[0]]
          .map(({ x, y }) => `${x * 10},${y * 10}`)
          .join(" ")
      : "";
  const stage = display.result
    ? "Colheita completa"
    : `Oferta ${Math.min(state.round + 1, 8)} de 8`;
  const baskets = points
    .map(({ id, fruit, x, y, mobile }) => {
      const inOffer = offered.includes(id);
      const allowed = state.phase === "offer" || state.offer.includes(id);
      const lastOfferStart =
        state.baskets.length === 3 ? state.baskets[0].id : id;
      const ids =
        state.phase === "offer" ? getOfferIds(state, lastOfferStart) : [];
      const label =
        state.phase === "offer"
          ? `Oferecer cestos ${ids.join(", ")}. Primeiro cesto: ${id}, ${FRUITS[fruit]}.`
          : `Escolher cesto ${id}, ${FRUITS[fruit]}.`;
      return `<button type="button" class="quinhao-basket${inOffer ? " is-offered" : ""}" style="left:${x.toFixed(3)}%;top:${y.toFixed(3)}%;--basket-column:${mobile.column};--basket-row:${mobile.row}" ${actionAttributes({ type: "basket", basket: id })} ${disabled || !allowed ? "disabled" : ""} aria-label="${escapeHTML(label)}">
      <span class="quinhao-basket-number" aria-hidden="true">${id}</span>${fruitArt(fruit, true)}
    </button>`;
    })
    .join("");
  const receipt =
    pending?.type === "choose" && preview
      ? `<p class="quinhao-preview-note">Prévia: ${playerName(state.player)} recebe o cesto ${pending.basket}; ${playerName(state.proposer)} fica com os outros dois. Os depósitos mostram o resultado.</p>`
      : pending?.type === "offer"
        ? `<p class="quinhao-preview-note">Prévia da oferta: ${offered.join(" · ")}. ${playerName(1 - state.proposer)} escolherá primeiro.</p>`
        : "";
  return `<section class="quinhao-area" aria-label="Anel da colheita">
    <div class="quinhao-plot${points.length === 0 ? " is-finished" : ""}">
      <svg class="quinhao-rope" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true"><polyline points="${rope}" fill="none" stroke="#BEC9AD" stroke-width="5"/></svg>
      ${baskets}
      <div class="quinhao-center"><span class="quinhao-stage">${stage}</span>${deposits(display.inventories)}<p>Trio <b>5</b> · Par diferente <b>2</b></p></div>
    </div>
    ${fruitLegend()}
    ${state.phase === "choose" ? `<p class="quinhao-choice-label">${playerMark(state.player)} ${playerName(state.player)}, qual cesto fica com você?</p>` : ""}
    ${offerButtons(state, disabled, pending?.type === "choose" ? pending.basket : null)}
    ${receipt}
    <p class="quinhao-tip">${state.phase === "offer" ? "Toque no primeiro cesto para oferecer ele e os dois seguintes, no sentido horário." : "Seu cesto vai para seu depósito. Os outros dois vão para quem fez a oferta."}</p>
  </section>`;
}

export function interact(state, selection, action) {
  if (state.result || action?.type !== "basket")
    return { selection, move: null };
  if (!state.baskets.some((basket) => basket.id === action.basket))
    return { selection, move: null };
  if (state.phase === "choose") {
    if (!state.offer.includes(action.basket)) return { selection, move: null };
    return {
      selection: { basket: action.basket },
      move: { type: "choose", basket: action.basket },
    };
  }
  const start =
    state.baskets.length === 3 ? state.baskets[0].id : action.basket;
  return { selection: { basket: start }, move: { type: "offer", start } };
}

// O treino recupera o cesto sugerido para permitir outra escolha antes da confirmação.
export function selectionForMove(state, move) {
  if (!move || move.type !== state.phase) return null;
  const basket = move.type === "offer" ? move.start : move.basket;
  const decision = interact(state, null, { type: "basket", basket });
  return decision.move ? decision.selection : null;
}

export function describeMove(state, move, nextState) {
  if (move.type === "offer") {
    return `${playerName(state.proposer)} oferece os cestos ${nextState.offer.join(", ")}. ${playerName(nextState.player)} escolherá um; os outros dois ficam com ${playerName(state.proposer)}.`;
  }
  const basket = state.baskets.find((item) => item.id === move.basket);
  const scores = getScores(nextState);
  return `${playerName(state.player)} fica com a ${FRUITS[basket.fruit]} do cesto ${move.basket}; ${playerName(state.proposer)} recebe os outros dois frutos. Placar: Jogador 1 ${scores[0]}, Jogador 2 ${scores[1]}.`;
}

export function getStatus(state) {
  if (state.result)
    return "A colheita foi repartida. Os trios e pares definem o resultado.";
  return state.phase === "offer"
    ? `${playerName(state.player)}, escolha três cestos vizinhos para a oferta ${state.round + 1} de 8.`
    : `${playerName(state.player)}, escolha um dos três cestos oferecidos.`;
}

export function renderResult(state) {
  return `<div class="quinhao-result-scene"><div>${[0, 1, 2].map((fruit) => fruitArt(fruit, true)).join("")}</div><strong>Uma colheita, oito partilhas</strong><p>Três sabores juntos valem mais. Os dois depósitos estão completos.</p></div>`;
}
