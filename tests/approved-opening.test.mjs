import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  initApprovedOpening,
} from "../dist/approved-opening.mjs";
import { FAUNA_ART } from "../dist/fauna-art.mjs";
import { CATEGORY_GAMES } from "../dist/category-navigation.mjs";
const html = readFileSync(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const css = readFileSync(
  new URL("../dist/approved-opening.css", import.meta.url),
  "utf8",
);
function harness() {
  const node = () => ({
    dataset: {},
    remove() { this.removed = true; },
    attrs: {},
    children: [],
    events: {},
    classList: { toggle() {} },
    setAttribute(k, v) {
      this.attrs[k] = v;
    },
    removeAttribute(k) {
      delete this.attrs[k];
    },
    append(...nodes) {
      this.children.push(...nodes);
      this.textContent = (this.textContent || "") + nodes.map(node => typeof node === "string" ? node : node.textContent || "").join("");
    },
    addEventListener(k, fn) {
      this.events[k] = fn;
    },
  });
  const animals = FAUNA_ART.map((a) =>
    Object.assign(node(), { dataset: { fauna: a.id }, hidden: false }),
  );
  const hint = {
    remove() {
      this.removed = true;
    },
  };
  const gallery = Object.assign(node(), {
    remove() { this.removed = true; },
    querySelectorAll: () => animals,
    querySelector: () => hint,
  });
  const title = node();
  const subtitle = {remove() { this.removed = true; }};
  const intro = Object.assign(node(), { querySelector: (s) => s === 'h1' ? title : s === ':scope > p' ? subtitle : gallery });
  const headings = Object.fromEntries(
    Object.keys(CATEGORY_GAMES).map((id) => [`games-${id}`, node()]),
  );
  const doc = {
    querySelector: (s) => (s === ".hero-fauna" ? gallery : intro.removed ? null : intro),
    getElementById: (id) => (id === "fauna-dialog" ? {} : headings[id]),
    createElement: node,
  };
  return { doc, intro, gallery, animals, hint, headings, title, subtitle };
}
test("a abertura remove a galeria sem recriar botões nem afetar as fichas", () => {
  const h = harness();
  initApprovedOpening(h.doc);
  initApprovedOpening(h.doc);
  assert.equal(h.intro.removed, true);
  assert.equal(h.intro.children.length, 0);
  for (const heading of Object.values(h.headings)) assert.equal(heading.children.length, 1);
  assert.equal(FAUNA_ART.length, 15);
});
test("as três categorias permanecem contadas pelo catálogo vigente", () => {
  const h = harness();
  initApprovedOpening(h.doc);
  assert.deepEqual(
    Object.values(h.headings).map((h) => h.children[0].textContent),
    Object.values(CATEGORY_GAMES).map(games => `${games.length} jogos`),
  );
  assert.equal(Object.values(CATEGORY_GAMES).flat().length, 19);
});
test("controles compartilham a linha e se montam antes da casca dos jogos", () => {
  assert.match(
    html,
    /<div id="library-controls">\s*<nav\s+id="categories"/,
  );
  assert.match(html, /<div class="library-heading-row">\s*<div class="category-heading">/);
  assert.ok(
    html.indexOf('src="approved-opening.mjs"') <
      html.indexOf('src="approved-game-shell.mjs"'),
  );
  assert.match(html, /id="achievements-open"/);
  assert.doesNotMatch(html, /id="library-navigation"/);
});
test('abertura removida sem perder o acesso aos mascotes em Sobre', () => {
  const h = harness();
  initApprovedOpening(h.doc);
  assert.equal(h.intro.removed, true);
  const module = readFileSync(new URL('../dist/approved-opening.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(module, /Conheça os|opening-fauna-toggle|faunaGroup|primeira lição/);
  assert.ok(module.indexOf('initFaunaInfo(doc)') < module.indexOf('intro.remove()'));
  const mascots = readFileSync(new URL('../dist/mascots-dialog.mjs', import.meta.url), 'utf8');
  assert.match(mascots, /Conhecer os mascotes/);
  assert.match(css, /#main > \.intro \{ display: none !important; \}/);
});
