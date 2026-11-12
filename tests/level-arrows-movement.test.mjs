// Exercita os eventos reais em um DOM determinístico isolado.
// A disposição visual no navegador é verificada separadamente.
import assert from "node:assert/strict";
import { host, store, $, Element, timers } from "./direct-ui-harness.mjs";
import { CAMPAIGN as sintonia } from "../dist/sintonia/campaign.mjs";
import { CAMPAIGN as repasse } from "../dist/repasse/campaign.mjs";
import { CAMPAIGN as orbita } from "../dist/orbita/campaign.mjs";
import { initSintonia } from "../dist/sintonia/ui.mjs";
import { initRepasse } from "../dist/repasse/ui.mjs";
import { initOrbita } from "../dist/orbita/ui.mjs";
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
globalThis.matchMedia = () => ({ matches: true });
Element.prototype.replaceChildren = function () {
  this.innerHTML = "";
};
Element.prototype.scrollTo = function () {};
Element.prototype.after = function (node) {
  this.parentElement.appendChild(node);
};
Element.prototype.append = function (...nodes) {
  nodes.forEach((n) => this.appendChild(n));
};
Object.defineProperty(Element.prototype, "viewBox", {
  get() {
    return {
      baseVal: {
        width: Number((this.attrs.viewBox ?? "0 0 800 600").split(" ")[2]),
      },
    };
  },
});
const settle = async () => {
  for (let n = 0; n < 100; n++)
    await new Promise((resolve) => setImmediate(resolve));
};
for (const [game, p, campaign, init] of [
  ["sintonia", "s", sintonia, () => initSintonia({ hideOtherGames() {} })],
  ["repasse", "r", repasse, () => initRepasse()],
  ["orbita", "o", orbita, () => initOrbita()],
]) {
  host.innerHTML = "";
  host.id = game;
  timers.clear();
  const app = init();
  (app.open ?? app.activate)();
  const read = () => JSON.parse(store.get(`intuicao.${game}.v1`)),
    first = campaign[0];
  host.querySelector(`[data-${p}-level="0"]`).click();
  const prev = $(`${p}-level-prev`),
    next = $(`${p}-level-next`);
  assert.ok(prev.parentElement.matches(".board-navigation"));
  assert.equal(prev.parentElement, next.parentElement);
  assert.equal(prev.disabled, true);
  assert.equal(next.disabled, false);
  assert.equal(next.attrs.type, "button");
  assert.equal(next.attrs["aria-label"], "Próximo nível");
  assert.ok(next.attrs["aria-controls"]);
  if (game === "sintonia")
    host.querySelector(`[data-s-direction="${first.solution[0]}"]`).click();
  else if (game === "repasse")
    $(
      `r-piece-${first.pieces.findIndex((x) => x.id === first.solution[0])}`,
    ).click();
  else {
    host
      .querySelector(`[data-o-command="${first.solution[0].command}"]`)
      .click();
    $(
      `o-${first.solution[0].direction === 1 ? "clockwise" : "counterclockwise"}`,
    ).click();
  }
  await settle();
  const draft = structuredClone(read().campaign.sessions[first.id]),
    completed = structuredClone(read().campaign.completed);
  $(`${p}-level-next`).click();
  assert.ok(read().campaign.sessions[campaign[1].id]);
  $(`${p}-level-prev`).click();
  assert.deepEqual(read().campaign.sessions[first.id], draft);
  assert.deepEqual(read().campaign.completed, completed);
  $(`${p}-back`).click();
  host.querySelector(`[data-${p}-level="79"]`).click();
  assert.equal($(`${p}-level-next`).disabled, true);
  $(`${p}-level-next`).onclick();
  assert.match(host.innerHTML, /80 \/ 80/);
  $(`${p}-level-prev`).click();
  assert.match(host.innerHTML, /79 \/ 80/);
  $(`${p}-back`).click();
  $(`${p}-daily`).click();
  assert.match(host.innerHTML, /DESAFIO DO DIA/);
  ($(`${p}-level-next`).disabled
    ? $(`${p}-level-prev`)
    : $(`${p}-level-next`)
  ).click();
  assert.doesNotMatch(host.innerHTML, /DESAFIO DO DIA/);
  $(`${p}-back`).click();
  host.querySelector(`[data-${p}-level="0"]`).click();
  $(`${p}-mode-endless`).click();
  await settle();
  assert.equal(read().lastView.mode, "endless");
  assert.equal($(`${p}-level-prev`), undefined);
  assert.equal($(`${p}-level-next`), undefined);
  assert.deepEqual(read().campaign.sessions[first.id], draft);
  assert.deepEqual(read().campaign.completed, completed);
  app.hide();
  console.log(
    `APROVADO ${game}: navegação lateral, limites 1/80, tentativa preservada, sem concluir níveis, diário e Sem Parar separados`,
  );
}
