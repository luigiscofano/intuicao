import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  GAME_PRESENTATION,
  initApprovedGameShell,
} from "../dist/approved-game-shell.mjs";
import { GAME_GUIDANCE } from "../dist/contextual-guidance.mjs";
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

// DOM mínimo: movimenta os mesmos nós e mantém propriedades e handlers reais.
class Node {
  constructor(tag = "div", className = "", id = "") {
    Object.assign(this, {
      tag,
      className,
      id,
      children: [],
      attrs: {},
      textContent: "",
      hidden: false,
    });
    this.classList = {
      add: (name) => {
        if (!this.className.split(" ").includes(name))
          this.className += ` ${name}`;
      },
      toggle: (name, enabled) => {
        this.className = this.className
          .split(" ")
          .filter((value) => value !== name)
          .join(" ");
        if (enabled) this.classList.add(name);
      },
      contains: (name) => this.className.split(" ").includes(name),
    };
  }
  get nextSibling() {
    return (
      this.parentElement?.children[
        this.parentElement.children.indexOf(this) + 1
      ] || null
    );
  }
  get childNodes() {
    return this.children;
  }
  append(...nodes) {
    for (const node of nodes) this.insertBefore(node, null);
  }
  insertBefore(node, next) {
    if (next && next.parentElement !== this)
      throw new Error("Âncora fora do contêiner");
    if (node.parentElement)
      node.parentElement.children.splice(
        node.parentElement.children.indexOf(node),
        1,
      );
    node.parentElement = this;
    this.children.splice(
      next ? this.children.indexOf(next) : this.children.length,
      0,
      node,
    );
  }
  setAttribute(name, value) {
    this.attrs[name] = value;
  }
  matches(selector) {
    if (selector === "[hidden]") return this.hidden;
    if (selector.startsWith("#")) return this.id === selector.slice(1);
    if (selector.startsWith("."))
      return this.classList.contains(selector.slice(1));
    return this.tag === selector;
  }
  closest(selector) {
    for (let node = this; node; node = node.parentElement) {
      if (selector.split(",").some((part) => node.matches(part.trim())))
        return node;
    }
    return null;
  }
  querySelectorAll(selector) {
    const descendants = this.children.flatMap((child) => [
      child,
      ...child.querySelectorAll("*"),
    ]);
    if (selector === "*") return descendants;
    return descendants.filter((node) =>
      selector.split(",").some((part) => {
        const steps = part.trim().split(/\s*>\s*/);
        if (!node.matches(steps.at(-1))) return false;
        return (
          steps.length === 1 ||
          (steps[0] === ":scope"
            ? node.parentElement === this
            : node.parentElement?.matches(steps[0]))
        );
      }),
    );
  }
  querySelector(selector) {
    return this.querySelectorAll(selector)[0] || null;
  }
}

function fixture(game = "light") {
  const logicGame = LOGIC_IDS.includes(game);
  const body = new Node("body");
  const header = new Node("header");
  const about = new Node("button", "", "about-open");
  header.append(about);
  const main = new Node("main", "", "main");
  const navigation = new Node("nav", "", "library-navigation");
  const category = new Node("div", "category-heading");
  const section = new Node(
    "section",
    logicGame ? "collection-lab logic-lab" : "lab",
  );
  const workspace = new Node(
    "div",
    logicGame ? "collection-workspace" : "workspace",
  );
  const surface = new Node(
    "div",
    logicGame ? "collection-surface logic-surface" : "experiment",
  );
  const tools = new Node("div", "stage-tools");
  const actions = new Node("div", "level-actions");
  const checks = new Node("div", "board-check-controls");
  const rules = new Node("aside", "rules-sidebar");
  const prefix = GAME_PRESENTATION[game]?.prefix;
  const controls = {};
  for (const name of [
    "confirm",
    "undo",
    "redo",
    ...(logicGame ? ["restart", "answer"] : ["reset"]),
    "stage-label",
    "rules-context-title",
    "rules-context-text",
  ]) {
    const node = new Node("button", "", `${prefix ? `${prefix}-` : ""}${name}`);
    node.textContent = name;
    node.onclick = () => name;
    controls[name] = node;
    (name === "confirm" ||
    (logicGame && ["undo", "redo", "restart", "answer"].includes(name))
      ? checks
      : tools
    ).append(node);
  }
  controls.undo.disabled = true;
  controls.redo.hidden = true;
  if (logicGame) controls.answer.hidden = true;
  const advanced = logicGame
    ? null
    : new Node(
        "button",
        "",
        prefix ? `${prefix}-advanced-toggle` : "toggle-controls",
      );
  if (advanced) tools.append(advanced);
  surface.append(tools, checks, actions);
  workspace.append(surface);
  if (!logicGame) workspace.append(rules);
  section.append(workspace);
  if (logicGame) section.append(rules);
  main.append(navigation, category, section);
  body.append(header, main);
  const doc = {
    body,
    createElement: (tag) => new Node(tag),
    getElementById: (id) => body.querySelector(`#${id}`),
    querySelector: (selector) => body.querySelector(selector),
  };
  let callback;
  const events = {};
  const observer = { disconnected: false };
  const win = {
    location: { href: `https://example.test/?game=${game}` },
    queueMicrotask: (fn) => fn(),
    MutationObserver: class {
      constructor(fn) {
        callback = fn;
      }
      observe() {
        observer.disconnected = false;
      }
      disconnect() {
        observer.disconnected = true;
      }
    },
    addEventListener: (name, fn) => {
      events[name] = fn;
    },
    removeEventListener: (name) => {
      delete events[name];
    },
  };
  return {
    doc,
    win,
    body,
    main,
    header,
    navigation,
    category,
    workspace,
    surface,
    section,
    controls,
    advanced,
    rules,
    events,
    observer,
    update: () => callback(),
  };
}

test("as 25 apresentações cobrem o catálogo e têm numeração única", () => {
  assert.equal(Object.keys(GAME_PRESENTATION).length, 25);
  assert.deepEqual(
    Object.keys(GAME_PRESENTATION).sort(),
    [...ORIGINAL_IDS, ...LOGIC_IDS, ...VERSUS_IDS].sort(),
  );
  assert.deepEqual(
    Object.keys(GAME_PRESENTATION).sort(),
    Object.keys(GAME_GUIDANCE).sort(),
  );
  assert.equal(
    new Set(Object.values(GAME_PRESENTATION).map((value) => value.number)).size,
    25,
  );
  for (const [index, id] of LOGIC_IDS.entries()) {
    assert.equal(GAME_PRESENTATION[id].number, String(index + 12));
    assert.equal(GAME_PRESENTATION[id].prefix, "lg");
    assert.equal(GAME_PRESENTATION[id].category, "Raciocínio lógico");
  }
});

for (const game of Object.keys(GAME_PRESENTATION)) {
  test(`${game}: shell reuses controls, preserves handlers, hidden/disabled and rules`, () => {
    const f = fixture(game);
    const originalHandler = f.controls.confirm.onclick;
    const cleanup = initApprovedGameShell(f.doc, f.win);
    assert.equal(f.main.querySelectorAll(".approved-tile").length, 8);
    assert.equal(
      f.main.querySelector(".approved-hero-headline").textContent,
      GAME_PRESENTATION[game].headline,
    );
    assert.equal(
      f.controls.confirm.parentElement.className,
      GAME_PRESENTATION[game].category === "Versus" ? "board-check-controls" : "approved-primary-action",
    );
    if (GAME_PRESENTATION[game].category === "Versus") {
      assert.equal(f.controls.confirm.parentElement.parentElement, f.surface);
      assert.equal(f.surface.classList.contains("approved-versus-surface"), true);
    }
    assert.equal(
      f.controls.undo.parentElement.className,
      "approved-history-actions",
    );
    assert.equal(
      f.body.classList.contains("approved-campaign-actions"),
      GAME_PRESENTATION[game].category !== "Versus",
    );
    assert.equal(f.controls.confirm.textContent, "confirm");
    assert.equal(f.controls.undo.textContent, "undo");
    assert.equal(f.controls.redo.textContent, "redo");
    if (f.controls.reset) {
      assert.equal(
        f.controls.reset.attrs["aria-label"],
        GAME_PRESENTATION[game].category === "Versus" ? undefined : "Reiniciar",
      );
    }
    assert.equal(f.controls.confirm.onclick, originalHandler);
    assert.equal(f.controls.confirm.onclick(), "confirm");
    assert.equal(f.controls.undo.disabled, true);
    assert.equal(f.controls.redo.hidden, true);
    assert.equal(
      f.rules.parentElement,
      LOGIC_IDS.includes(game) ? f.section : f.workspace,
    );
    if (f.advanced)
      assert.equal(
        f.advanced.parentElement.className,
        "approved-secondary-actions",
      );
    else {
      assert.equal(f.main.querySelector("#lg-advanced-toggle"), null);
      assert.equal(f.controls.restart.onclick(), "restart");
      assert.equal(
        f.controls.restart.parentElement.parentElement.className,
        "approved-secondary-actions",
      );
      assert.equal(f.controls.answer.hidden, true);
    }
    assert.equal(f.navigation.parentElement, f.header);
    f.update();
    f.update();
    assert.equal(f.main.querySelectorAll(".approved-action-panel").length, 1);
    assert.equal(f.main.querySelectorAll(".approved-game-heading").length, 1);
    assert.equal(
      f.main.querySelectorAll(`#${f.controls.confirm.id}`).length,
      1,
    );
    cleanup();
    assert.equal(f.observer.disconnected, true);
    assert.equal(f.events.popstate, undefined);
  });
}

test("return to library and achievements restores navigation and hides game hero", () => {
  const f = fixture();
  initApprovedGameShell(f.doc, f.win);
  for (const query of [
    "",
    "?game=light&screen=achievements",
    "?game=missing",
  ]) {
    f.win.location.href = `https://example.test/${query}`;
    f.events.popstate();
    assert.equal(f.navigation.parentElement, f.main);
    assert.equal(f.navigation.nextSibling, f.category);
    assert.equal(f.body.classList.contains("approved-game-view"), false);
    assert.equal(f.body.classList.contains("approved-campaign-actions"), false);
    assert.equal(f.doc.getElementById("approved-game-hero").hidden, true);
  }
});

test("hidden game surfaces are not modified and absent main is harmless", () => {
  const f = fixture();
  f.section.hidden = true;
  initApprovedGameShell(f.doc, f.win);
  assert.equal(f.main.querySelector(".approved-action-panel"), null);
  assert.doesNotThrow(() =>
    initApprovedGameShell({ getElementById: () => null }, {}),
  );
});

test("presentation module has no persistence, network or game-engine dependency", () => {
  const source = readFileSync(
    new URL("../dist/approved-game-shell.mjs", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(
    source,
    /localStorage|sessionStorage|indexedDB|fetch\(|\.setItem\(|\.removeItem\(|engine\.mjs/,
  );
  const imports = [
    ...source.matchAll(/^import .* from ['"]([^'"]+)['"]/gm),
  ].map((match) => match[1]);
  assert.deepEqual(imports, [
    "./versus/metadata.mjs",
    "./logica/metadata.mjs",
    "./contextual-guidance.mjs",
  ]);
});
