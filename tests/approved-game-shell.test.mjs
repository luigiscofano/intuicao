import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  GAME_PRESENTATION,
  initApprovedGameShell,
} from "../dist/approved-game-shell.mjs";
import { GAME_GUIDANCE } from "../dist/contextual-guidance.mjs";

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
  const body = new Node("body");
  const header = new Node("header");
  const about = new Node("button", "", "about-open");
  header.append(about);
  const main = new Node("main", "", "main");
  const navigation = new Node("nav", "", "library-navigation");
  const category = new Node("div", "category-heading");
  const section = new Node("section", "lab");
  const workspace = new Node("div", "workspace");
  const surface = new Node("div", "experiment");
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
    "reset",
    "stage-label",
    "rules-context-title",
    "rules-context-text",
  ]) {
    const node = new Node("button", "", `${prefix ? `${prefix}-` : ""}${name}`);
    node.textContent = name;
    node.onclick = () => name;
    controls[name] = node;
    (name === "confirm" ? checks : tools).append(node);
  }
  controls.undo.disabled = true;
  controls.redo.hidden = true;
  const advanced = new Node(
    "button",
    "",
    prefix ? `${prefix}-advanced-toggle` : "toggle-controls",
  );
  tools.append(advanced);
  surface.append(tools, checks, actions);
  workspace.append(surface, rules);
  section.append(workspace);
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

test("eleven presentations match the guidance roster and have unique numbers", () => {
  assert.equal(Object.keys(GAME_PRESENTATION).length, 11);
  assert.deepEqual(
    Object.keys(GAME_PRESENTATION).sort(),
    Object.keys(GAME_GUIDANCE).sort(),
  );
  assert.equal(
    new Set(Object.values(GAME_PRESENTATION).map((value) => value.number)).size,
    11,
  );
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
      "approved-primary-action",
    );
    assert.equal(
      f.controls.undo.parentElement.className,
      "approved-history-actions",
    );
    assert.equal(f.controls.confirm.onclick, originalHandler);
    assert.equal(f.controls.confirm.onclick(), "confirm");
    assert.equal(f.controls.undo.disabled, true);
    assert.equal(f.controls.redo.hidden, true);
    assert.equal(f.rules.parentElement, f.workspace);
    assert.equal(
      f.advanced.parentElement.className,
      "approved-secondary-actions",
    );
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
  assert.deepEqual(imports, ["./contextual-guidance.mjs"]);
});
