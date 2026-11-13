import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  GAME_GUIDANCE,
  guidanceForGame,
  initContextualGuidance,
} from "../dist/contextual-guidance.mjs";
const VERSUS_IDS = [
  "enlace",
  "vazante",
  "mosaico",
  "quinhao",
  "estalo",
  "dobra",
  "acorde",
  "lastro",
];
const LOGIC_IDS = ["divisa", "pulso", "foz", "refugio", "mirante", "renovo"];
const ORIGINAL_IDS = [
  "light",
  "cut",
  "elo",
  "prumo",
  "pacto",
  "sintonia",
  "repasse",
  "orbita",
  "desvio",
  "broto",
  "cerco",
];

function fixture(game = "light") {
  const element = (tag) => ({
    tag,
    dataset: {},
    children: [],
    listeners: {},
    append(...children) {
      this.children.push(...children);
    },
    addEventListener(event, handler) {
      this.listeners[event] = handler;
    },
    focus() {
      this.focused = true;
    },
    remove() {
      surface.current = null;
    },
  });
  const surface = {
    current: null,
    closest() {
      return null;
    },
    querySelector() {
      return this.current;
    },
    prepend(node) {
      this.current = node;
    },
  };
  const main = { querySelectorAll: () => [surface] };
  let callback;
  let disconnected = false;
  const win = {
    location: { href: `https://example.test/?game=${game}` },
    queueMicrotask: (fn) => fn(),
    MutationObserver: class {
      constructor(fn) {
        callback = fn;
      }
      observe() {}
      disconnect() {
        disconnected = true;
      }
    },
  };
  const doc = { getElementById: () => main, createElement: element };
  return {
    surface,
    win,
    doc,
    update: () => callback(),
    disconnected: () => disconnected,
  };
}

test("os 25 jogos têm orientação sem inventar controles", () => {
  assert.equal(Object.keys(GAME_GUIDANCE).length, 25);
  assert.deepEqual(
    Object.keys(GAME_GUIDANCE).sort(),
    [...ORIGINAL_IDS, ...LOGIC_IDS, ...VERSUS_IDS].sort(),
  );
  assert.equal(guidanceForGame("missing"), null);
  assert.match(guidanceForGame("light"), /Confirmar todos/);
  assert.match(guidanceForGame("prumo"), /Momentos exatos/);
});

for (const game of [...LOGIC_IDS, ...VERSUS_IDS]) {
  test(`${game}: orientação da rota direta aparece e conserva o reconhecimento durante rerenders`, () => {
    const f = fixture(game);
    const cleanup = initContextualGuidance(f.doc, f.win);
    const guide = f.surface.current;
    assert.equal(guide.dataset.game, game);
    assert.equal(guide.children[1].textContent, guidanceForGame(game));
    assert.ok(guide.children[1].textContent.length > 30);
    guide.children[2].listeners.click();
    f.surface.current = null;
    f.update();
    assert.equal(f.surface.current.open, false);
    assert.equal(f.surface.current.dataset.game, game);
    assert.equal(
      f.surface.current.children[1].textContent,
      guidanceForGame(game),
    );
    cleanup();
    assert.equal(f.disconnected(), true);
  });
}

test("guidance can close, reopen and survive rerenders without saving any data", () => {
  const f = fixture();
  const cleanup = initContextualGuidance(f.doc, f.win);
  const guide = f.surface.current;
  assert.equal(guide.open, true);
  assert.equal(guide.children[0].textContent, "Comece por aqui");
  guide.children[2].listeners.click();
  assert.equal(guide.open, false);
  assert.equal(guide.children[0].focused, true);
  f.update();
  assert.equal(f.surface.current, guide);
  f.surface.current = null;
  f.update();
  assert.equal(f.surface.current.open, false);
  f.win.location.href = "https://example.test/?game=cerco";
  f.update();
  assert.equal(f.surface.current.dataset.game, "cerco");
  assert.equal(f.surface.current.open, true);
  cleanup();
  assert.equal(f.disconnected(), true);
});

test("library and unavailable DOM do not receive a guide", () => {
  const f = fixture("");
  initContextualGuidance(f.doc, f.win);
  assert.equal(f.surface.current, null);
  assert.doesNotThrow(() =>
    initContextualGuidance({ getElementById: () => null }, {}),
  );
});

test("visual refinement preserves layout when decorative tiles become transparent PNGs", () => {
  const path = new URL("../dist/terra-mata.css", import.meta.url);
  const current = readFileSync(path, "utf8");
  const baseline = readFileSync(
    new URL("./fixtures/terra-mata-github-baseline.css", import.meta.url),
    "utf8",
  );
  const canonical = (css) =>
    css
      // A tipografia C aprovada não faz parte da geometria desta comparação.
      .replace(/var\(--font-ui\)/g, "system-ui,sans-serif")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, "")
      .replace(/;}/g, "}");
  assert.equal(
    canonical(current.replace("background-color:transparent;", "background-color:#e7ddc3;").replace(/background-image:url\("platform-assets\/tiles\/blue-br\.png"\)[^;]+;/, baseline.match(/background-image:radial-gradient[^;]+;/)[0].replaceAll("#bd4e2c", "#244B63"))),
    canonical(
      baseline.replaceAll(
        "radial-gradient(ellipse at 100% 100%,#bd4e2c 70%,transparent 71%)",
        "radial-gradient(ellipse at 100% 100%,#244B63 70%,transparent 71%)",
      ),
    ),
  );
});
