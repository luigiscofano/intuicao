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
const LOGIC_IDS = [ "pulso", "foz", "refugio", "mirante", "renovo"];
const ORIGINAL_IDS = [
  "light",
  "cut",
  "elo",
  "prumo",
  "pacto",
  "sintonia",
  "repasse",
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
  get tagName() { return this.tag.toUpperCase(); }
  addEventListener(name, fn) { (this.listeners ||= {})[name] = fn; }
  scrollIntoView(options) { this.scrolled = options; }
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

test("as 23 apresentações cobrem o catálogo e têm numeração única", () => {
  assert.equal(Object.keys(GAME_PRESENTATION).length, 23);
  assert.deepEqual(
    Object.keys(GAME_PRESENTATION).sort(),
    [...ORIGINAL_IDS, ...LOGIC_IDS, ...VERSUS_IDS].sort(),
  );
  assert.deepEqual(
    Object.keys(GAME_PRESENTATION).sort(),
    Object.keys(GAME_GUIDANCE).filter(id => !["divisa", "orbita"].includes(id)).sort(),
  );
  assert.equal(
    new Set(Object.values(GAME_PRESENTATION).map((value) => value.number)).size,
    23,
  );
  for (const [index, id] of LOGIC_IDS.entries()) {
    assert.equal(GAME_PRESENTATION[id].number, String(index + 13));
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
    assert.equal(f.main.querySelector(".approved-tiles").classList.contains("approved-tiles--foz"), game === "foz");
    assert.equal(
      f.main.querySelector(".approved-hero-headline").textContent,
      GAME_PRESENTATION[game].headline,
    );
    assert.equal(
      f.controls.confirm.parentElement.className,
      GAME_PRESENTATION[game].category === "Versus" ? "board-check-controls" : "approved-primary-action",
    );
    if (GAME_PRESENTATION[game].category === "Versus") {
      assert.equal(f.controls.confirm.parentElement.parentElement.className, "approved-primary-action");
      assert.equal(f.controls.confirm.parentElement.closest(".action-sidebar") !== null, true);
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
        game === "broto" ? "Reiniciar rodada" : "Reiniciar",
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
        f.controls.restart.parentElement.parentElement.classList.contains("approved-real-actions"),
        true,
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
    assert.equal(f.events["pulso-skin-change"], undefined);
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

test("presentation module only reads visual preference, without progress writes, network or game engines", () => {
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
    "./action-sidebar.mjs",
    "./logica/games/pulso/skin.mjs",
    "./logica/games/refugio/skin.mjs",
    "./versus/metadata.mjs",
    "./logica/metadata.mjs",
    "./contextual-guidance.mjs",
  ]);
});


test('AIIJ FOZ aparece só na rota FOZ e some ao alternar jogos ou histórico', () => {
 const f=fixture('foz'); initApprovedGameShell(f.doc,f.win);
 const tiles=f.main.querySelector('.approved-tiles');
 for(const game of ['pulso','foz','renovo','foz','light']) {
  f.win.location.href=`https://example.test/?game=${game}`;f.events.popstate();
  assert.equal(tiles.classList.contains('approved-tiles--foz'),game==='foz');
  assert.equal(tiles.children.length,8);
 }
});


test('campanhas mantêm Reiniciar em um local estável depois do histórico', () => {
  for (const game of ['light', 'elo', 'sintonia', 'pulso', 'refugio']) {
    const f = fixture(game);
    initApprovedGameShell(f.doc, f.win);
    const restart = f.controls.restart || f.controls.reset;
    assert.equal(restart.parentElement.className, 'approved-restart-action');
    assert.equal(restart.parentElement.parentElement.classList.contains('approved-real-actions'), true);
    assert.equal(restart.attrs['aria-label'], 'Reiniciar');
    assert.equal(f.controls.undo.attrs['aria-label'], 'Desfazer');
    assert.equal(f.controls.redo.attrs['aria-label'], 'Refazer');
    const handler = restart.onclick;
    f.update();
    f.update();
    assert.equal(restart.onclick, handler);
    assert.equal(f.main.querySelectorAll('.approved-restart-action').length, 1);
  }
});

test('a ajuda é recolhida uma vez e respeita a reabertura feita pelo jogador', () => {
  const f = fixture('pulso');
  const guidance = new Node('details', 'contextual-guidance');
  guidance.open = true;
  f.surface.append(guidance);
  initApprovedGameShell(f.doc, f.win);
  assert.equal(guidance.open, false);
  guidance.open = true;
  // Outro organizador pode mover o mesmo nó, sem invalidar a escolha do jogador.
  f.surface.append(guidance);
  f.update();
  assert.equal(guidance.open, true);
  assert.equal(guidance.parentElement.className, 'approved-secondary-actions');
});

test('normalização coloca Reiniciar dos duelos no mesmo slot sem substituir o handler', () => {
  const f = fixture('cerco');
  initApprovedGameShell(f.doc, f.win);
  assert.equal(f.controls.reset.parentElement.className, 'approved-restart-action');
  assert.equal(f.controls.reset.attrs['aria-label'], 'Reiniciar');
  assert.equal(f.controls.reset.onclick(), 'reset');
});

test('lateral A preserva confirmação automática e a ordem essencial', () => {
  for (const game of ['sintonia', 'repasse']) {
    const f = fixture(game);
    f.controls.confirm.hidden = true;
    initApprovedGameShell(f.doc, f.win);
    assert.equal(f.controls.confirm.hidden, true);
    const actions = f.section.querySelector('.approved-real-actions');
    assert.deepEqual(actions.children.map(node => node.className), [
      'approved-primary-action', 'approved-history-actions', 'approved-restart-action',
      'sidebar-help', 'approved-secondary-actions',
    ]);
    f.update();
    assert.equal(f.section.querySelectorAll('.sidebar-signature').length, 1);
    assert.equal(f.section.querySelectorAll('.approved-restart-action').length, 1);
  }
});

test('confirmar e cancelar versus permanecem juntos fora do tabuleiro', () => {
  for (const game of ['cerco', 'broto', 'quinhao']) {
    const f = fixture(game);
    const cancel = new Node('button', '', GAME_PRESENTATION[game].prefix + '-cancel');
    const handler = () => 'cancel';
    cancel.onclick = handler;
    cancel.disabled = true;
    const group = f.controls.confirm.parentElement;
    group.append(cancel);
    const board = new Node('div', '', 'fake-board');
    board.inert = true;
    f.surface.append(board);
    board.append(group);
    initApprovedGameShell(f.doc, f.win);
    assert.equal(f.controls.confirm.parentElement, group);
    assert.equal(cancel.parentElement, group);
    assert.equal(group.closest('.approved-primary-action') !== null, true);
    assert.equal(board.querySelector('#' + cancel.id), null);
    assert.equal(cancel.onclick, handler);
    assert.equal(cancel.disabled, true);
    f.update();
    assert.equal(group.parentElement.className, 'approved-primary-action');
    assert.equal(f.section.querySelectorAll('#' + cancel.id).length, 1);
  }
});

test('Como jogar usa disclosure original sem substituir eventos e estados', () => {
  const f = fixture('cerco');
  const rulesPanel = new Node('details', 'rules-card', 'ce-rules-panel');
  const summary = new Node('summary');
  const onToggle = () => 'native toggle';
  rulesPanel.ontoggle = onToggle;
  rulesPanel.open = true;
  rulesPanel.append(summary);
  f.surface.querySelector('.stage-tools').append(rulesPanel);
  initApprovedGameShell(f.doc, f.win);
  assert.equal(rulesPanel.parentElement.className, 'sidebar-help');
  assert.equal(rulesPanel.open, true);
  assert.equal(rulesPanel.ontoggle, onToggle);
  assert.equal(summary.attrs['aria-label'], 'Como jogar');
  f.update();
  assert.equal(f.section.querySelectorAll('#ce-rules-panel').length, 1);
});

test('ajuda de lógica alterna conteúdo completo sem remover suas regras', () => {
  const f = fixture('pulso');
  f.rules.className = 'logic-rules';
  f.rules.textContent = 'Regras completas';
  initApprovedGameShell(f.doc, f.win);
  const button = f.section.querySelector('.sidebar-help').querySelector('button');
  assert.ok(button);
  assert.equal(f.rules.parentElement, f.section);
  assert.equal(f.rules.hidden, true);
  assert.equal(button.attrs['aria-controls'], f.rules.id);
  button.listeners.click();
  assert.equal(f.rules.hidden, false);
  assert.equal(button.attrs['aria-expanded'], 'true');
  f.update();
  assert.equal(f.rules.hidden, false);
  assert.equal(f.rules.textContent, 'Regras completas');
  assert.equal(f.section.querySelector('.sidebar-help').querySelectorAll('button').length, 1);
  button.listeners.click();
  assert.equal(f.rules.hidden, true);
});

test('ajuda dos duelos mantém aria-expanded sincronizado com o disclosure completo', () => {
  const f = fixture('quinhao');
  f.rules.tag = 'details';
  f.rules.className = 'nv-rules';
  f.rules.open = true;
  initApprovedGameShell(f.doc, f.win);
  const button = f.section.querySelector('.sidebar-help').querySelector('button');
  assert.equal(f.rules.open, false);
  button.listeners.click();
  assert.equal(f.rules.open, true);
  assert.equal(button.attrs['aria-expanded'], 'true');
  f.rules.open = false;
  f.rules.listeners.toggle();
  assert.equal(button.attrs['aria-expanded'], 'false');
  f.update();
  assert.equal(f.rules.open, false);
});

test('CSS da lateral não sobrescreve hidden, foco ou equipes', () => {
  const css = readFileSync(new URL('../dist/action-sidebar.css', import.meta.url), 'utf8');
  assert.match(css, /\.action-sidebar \[hidden\]\s*\{\s*display:none !important/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /forced-colors:active/);
  assert.doesNotMatch(css, /\.nv-team|\.ce-team|\.b-team|\.logic-board/);
  const source = readFileSync(new URL('../dist/action-sidebar.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /cloneNode|\.disabled\s*=|\.click\(|localStorage|\.setItem\(/);
});

test('renderização versus não puxa os controles de volta para região inert', () => {
  const source = readFileSync(new URL('../dist/versus/ui.mjs', import.meta.url), 'utf8');
  assert.match(source, /moveControls && anchor && !moveControls\.closest\("\.approved-action-panel"\)/);
  assert.match(source, /board\.inert = Boolean\(thinking \|\| computerTurn\(\) \|\| state\(\)\.result\)/);
});
