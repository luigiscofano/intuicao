// Exercita as opções pela interface real, incluindo seletores e progresso salvo.
import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { Element, host, store, $, timers } from "./direct-ui-harness.mjs";
import { initCollection } from "../dist/collection-ui.mjs";
import { DESVIO_MAPS } from "../dist/desvio.mjs";
import { collectionOptionSpec } from "../dist/endless-collection.mjs";

const STORAGE_KEY = "intuicao.collection.v1";
let app;

// Completa a operação de limpeza usada pela interface atual no DOM de teste.
Element.prototype.replaceChildren = function (...children) {
  this.innerHTML = "";
  for (const child of children) this.appendChild(child);
};

function readProgress() {
  return JSON.parse(store.get(STORAGE_KEY));
}

function openDesvio(saved = null) {
  app?.hide();
  timers.clear();
  store.clear();
  if (saved) store.set(STORAGE_KEY, JSON.stringify(saved));
  app = initCollection({ hideOriginal() {} });
  app.activate("desvio");
}

function selectOptions(mode, difficulty) {
  $("c-duel-mode").dispatch("change", { target: { value: mode } });
  $("c-bot-difficulty").dispatch("change", {
    target: { value: difficulty },
  });
}

function startMap() {
  host.querySelector('[data-map="0"]').click();
}

function campaignSession(mode) {
  return readProgress().sessions[`desvio:${DESVIO_MAPS[0].id}:${mode}`];
}

function applyEndlessOptions(mode, difficulty) {
  const options = readProgress().endless.desvio.options;
  // O simulador de DOM não escolhe automaticamente o <option selected>.
  for (const spec of collectionOptionSpec("desvio")) {
    host.querySelector(`[data-endless-option="${spec.key}"]`).value = String(
      options[spec.key],
    );
  }
  $("c-endless-duel-mode").value = mode;
  $("c-endless-bot-difficulty").value = difficulty;
  $("c-endless-apply").click();
}

afterEach(() => {
  app?.hide();
  app = null;
  timers.clear();
});

test("DESVIO preserva opções válidas e a chave das partidas existentes", () => {
  openDesvio();
  for (const mode of ["local", "competitive", "bot", "training"]) {
    for (const difficulty of ["easy", "medium", "perfect"]) {
      app.activate("desvio");
      selectOptions(mode, difficulty);
      startMap();
      const saved = campaignSession(mode);
      assert.equal(saved.duelMode, mode);
      assert.equal(saved.botDifficulty, difficulty);
    }
  }

  $("c-board").querySelector('[data-cell="0"]').dispatch("keydown", {
    key: "Enter",
  });
  $("c-confirm").click();
  const played = structuredClone(campaignSession("training").history.present);
  assert.equal(played.turn, 1);
  $("c-back").click();
  selectOptions("training", "perfect");
  startMap();
  assert.deepEqual(campaignSession("training").history.present, played);
});

test("DESVIO rejeita opções desconhecidas nos dois seletores da interface", () => {
  openDesvio();
  for (const invalid of ["unknown", "__proto__", "", 42, null, {}]) {
    app.activate("desvio");
    selectOptions(invalid, invalid);
    startMap();
    const saved = campaignSession("local");
    assert.equal(saved.duelMode, "local");
    assert.equal(saved.botDifficulty, "perfect");
    assert.deepEqual(Object.keys(readProgress().sessions), [
      `desvio:${DESVIO_MAPS[0].id}:local`,
    ]);
  }

  app.activate("desvio");
  $("c-free").click();
  applyEndlessOptions("training", "medium");
  assert.equal(readProgress().endless.desvio.duelMode, "training");
  assert.equal(readProgress().endless.desvio.botDifficulty, "medium");
  applyEndlessOptions("unknown", "__proto__");
  const saved = readProgress();
  assert.equal(saved.endless.desvio.duelMode, "local");
  assert.equal(saved.endless.desvio.botDifficulty, "perfect");
  assert.equal(saved.sessions["endless:desvio"].duelMode, "local");
});

test("DESVIO normaliza opções corrompidas ao retomar o Modo Sem Parar", () => {
  openDesvio();
  $("c-free").click();
  applyEndlessOptions("bot", "easy");
  const original = readProgress();
  const expectedHistory = original.sessions["endless:desvio"].history;
  const expectedSeed = original.endless.desvio.seed;

  openDesvio(original);
  $("c-free").click();
  assert.equal(readProgress().endless.desvio.duelMode, "bot");
  assert.equal(readProgress().endless.desvio.botDifficulty, "easy");

  const corrupted = readProgress();
  corrupted.endless.desvio.duelMode = { mode: "training" };
  corrupted.endless.desvio.botDifficulty = "impossible";
  openDesvio(corrupted);
  $("c-free").click();
  const restored = readProgress();
  assert.equal(restored.endless.desvio.duelMode, "local");
  assert.equal(restored.endless.desvio.botDifficulty, "perfect");
  assert.equal(restored.endless.desvio.seed, expectedSeed);
  assert.deepEqual(
    restored.sessions["endless:desvio"].history,
    expectedHistory,
  );
});
