// Exercita os eventos reais em um DOM determinístico.
// A disposição visual no navegador é verificada separadamente.
import assert from "node:assert/strict";
import { host, store, $, Element } from "./direct-ui-harness.mjs";
import { initLogicGames, dailyLevelIndex } from "../dist/logica/ui.mjs";
import { LOGIC_GAME_IDS, loadLogicGame } from "../dist/logica/metadata.mjs";
import { LOGIC_STORAGE_KEY } from "../dist/logica/storage.mjs";
Element.prototype.getAttribute = function (k) {
  return this.attrs[k] ?? null;
};
Element.prototype.hasAttribute = function (k) {
  return k in this.attrs;
};
Element.prototype.removeAttribute = function (k) {
  delete this.attrs[k];
};
Element.prototype.append = function (...nodes) {
  nodes.forEach((n) => this.appendChild(n));
};
host.id = "logic-games";
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
const app = initLogicGames(),
  read = () => JSON.parse(store.get(LOGIC_STORAGE_KEY));
const settle = async () => {
  for (let i = 0; i < 100; i++)
    await new Promise((resolve) => setImmediate(resolve));
};
for (const game of LOGIC_GAME_IDS) {
  const adapter = await loadLogicGame(game),
    first = adapter.CAMPAIGN[0],
    last = adapter.CAMPAIGN.at(-1);
  assert.equal(adapter.CAMPAIGN.length, 80);
  await app.activate(game);
  host.querySelector(`[data-level-id="${first.id}"]`).click();
  const checkLayout = () => {
    const prev = $("lg-prev"),
      next = $("lg-next"),
      board = $("lg-board");
    assert.equal(prev.parentElement, board.parentElement);
    assert.equal(next.parentElement, board.parentElement);
    assert.ok(prev.parentElement.matches(".board-navigation"));
    assert.ok(!board.contains(prev) && !board.contains(next));
    assert.equal(host.querySelectorAll("#lg-prev").length, 1);
    assert.equal(host.querySelectorAll("#lg-next").length, 1);
    assert.equal(prev.attrs["aria-label"], "Nível anterior");
    assert.equal(next.attrs["aria-label"], "Próximo nível");
    assert.equal(prev.attrs["aria-controls"], "lg-board");
    assert.equal(next.attrs.type, "button");
  };
  checkLayout();
  assert.ok("disabled" in $("lg-prev").attrs);
  assert.ok(!("disabled" in $("lg-next").attrs));
  $("lg-prev").click();
  assert.equal(read().lastView.levelId, first.id);
  const target = $("lg-board")
    .querySelectorAll("[data-cell]")
    .find((n) => n.attrs["aria-disabled"] !== "true");
  if (game === "renovo") {
    for (const index of first.solution[0].slice(0, 2))
      $("lg-board").querySelector(`[data-cell="${index}"]`).click();
  } else target?.click();
  const draft = structuredClone(read().games[game].sessions[first.id]);
  const completedBefore = structuredClone(read().games[game].completed);
  $("lg-next").click();
  assert.equal(read().lastView.levelId, adapter.CAMPAIGN[1].id);
  checkLayout();
  $("lg-prev").click();
  assert.equal(read().lastView.levelId, first.id);
  assert.deepEqual(
    read().games[game].sessions[first.id],
    draft,
    "a tentativa anterior é preservada",
  );
  assert.deepEqual(
    read().games[game].completed,
    completedBefore,
    "navegar não concede conclusão de nível",
  );
  $("lg-levels").click();
  host.querySelector(`[data-level-id="${last.id}"]`).click();
  assert.ok("disabled" in $("lg-next").attrs);
  $("lg-next").click();
  assert.equal(read().lastView.levelId, last.id);
  $("lg-prev").click();
  assert.equal(read().lastView.levelId, adapter.CAMPAIGN.at(-2).id);
  $("lg-levels").click();
  host.querySelector("[data-logic-daily]").click();
  const daily = adapter.CAMPAIGN[dailyLevelIndex(game)];
  assert.equal(read().lastView.levelId, daily.id);
  const delta = daily.number === 80 ? -1 : 1;
  $(`lg-${delta < 0 ? "prev" : "next"}`).click();
  assert.equal(
    read().lastView.levelId,
    adapter.CAMPAIGN[daily.number - 1 + delta].id,
  );
  assert.equal(read().lastView.mode, "campaign");
  $("lg-levels").click();
  host.querySelector("[data-logic-endless]").click();
  await settle();
  assert.equal(read().lastView.mode, "endless");
  assert.ok("hidden" in $("lg-prev").attrs);
  assert.ok("hidden" in $("lg-next").attrs);
  const endless = structuredClone(read().games[game].endless);
  $("lg-prev").click();
  $("lg-next").click();
  assert.deepEqual(
    read().games[game].endless,
    endless,
    "setas ocultas não geram nem avançam desafios do Sem Parar",
  );
  assert.deepEqual(
    read().games[game].sessions[first.id],
    draft,
    "Sem Parar preserva a tentativa da campanha",
  );
  app.hide();
  console.log(
    `APROVADO ${game}: setas laterais; limites 1/80, tentativa preservada, diário e Sem Parar separados, sem concluir níveis`,
  );
}
