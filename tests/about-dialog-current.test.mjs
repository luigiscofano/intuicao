import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read = name => fs.readFileSync(new URL(`../dist/${name}`, import.meta.url), 'utf8');
const source = read('about-dialog.mjs');
function setup() {
  let active;
  class Element {
    constructor() { this.listeners = {}; this.isConnected = true; this.open = false; }
    addEventListener(type, handler) { (this.listeners[type] ??= []).push(handler); }
    fire(type, details = {}) { const event = { target: this, clientX: 50, clientY: 50, preventDefault() {}, stopPropagation() {}, ...details }; for (const handler of this.listeners[type] ?? []) handler(event); }
    focus() { active = this; }
    showModal() { this.open = true; }
    close() { this.open = false; this.fire('close'); }
    getBoundingClientRect() { return { left: 0, right: 100, top: 0, bottom: 100 }; }
  }
  const trigger = new Element(), dialog = new Element(), title = new Element(), x = new Element(), close = new Element();
  dialog.querySelector = selector => selector === '#about-title' ? title : null;
  dialog.querySelectorAll = () => [x, close];
  const document = { querySelector: selector => selector === '#about-open' ? trigger : dialog, get activeElement() { return active; } };
  vm.runInNewContext(source, { document });
  return { trigger, dialog, title, x, close, active: () => active };
}
test('Sobre mantém conteúdo e fechamento, sem ação de comemoração', () => {
  const html = read('index.html');
  const start = html.indexOf('<dialog id="about-dialog"');
  const markup = html.slice(start, html.indexOf('</dialog>', start) + 9);
  assert.match(markup, /Porque a <strong class="about-curiosity">curiosidade<\/strong> é a primeira lição/);
  assert.match(read('about-dialog.css'), /#about-dialog \.about-motto \.about-curiosity\{font-weight:700;text-decoration:underline/);
  assert.match(markup, /data-about-close>Fechar/);
  assert.doesNotMatch(markup, /Comemorar|about-celebrate|about-sparkles|about-status/);
  assert.doesNotMatch(source + read('about-dialog.css'), /celebrate|confetti|sparkles|localStorage|sessionStorage/);
});
test('abrir, fechar e reabrir devolve foco e não depende do botão removido', () => {
  const ui = setup();
  for (let i = 0; i < 3; i++) {
    ui.trigger.focus(); ui.trigger.fire('click');
    assert.equal(ui.dialog.open, true); assert.equal(ui.active(), ui.title);
    ui.close.fire('click'); assert.equal(ui.dialog.open, false); assert.equal(ui.active(), ui.trigger);
  }
});
test('Escape e botão X fecham sem atingir atalhos do jogo', () => {
  const ui = setup(); ui.trigger.focus(); ui.trigger.fire('click');
  let stopped = false;
  ui.dialog.fire('keydown', { key: 'Escape', stopPropagation() { stopped = true; } });
  assert.equal(stopped, true); assert.equal(ui.dialog.open, false);
  ui.trigger.fire('click'); ui.x.fire('click'); assert.equal(ui.dialog.open, false);
});
test('foco percorre botões restantes e clique fora fecha apenas quando começa fora', () => {
  const ui = setup(); ui.trigger.fire('click');
  ui.dialog.fire('keydown', { key: 'Tab', shiftKey: true }); assert.equal(ui.active(), ui.close);
  ui.dialog.fire('keydown', { key: 'Tab' }); assert.equal(ui.active(), ui.x);
  ui.dialog.fire('click', { clientX: 110 }); assert.equal(ui.dialog.open, true);
  ui.dialog.fire('pointerdown', { clientX: 110 }); ui.dialog.fire('click', { clientX: 110 }); assert.equal(ui.dialog.open, false);
});
