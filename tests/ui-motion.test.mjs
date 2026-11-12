import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { UI_MOTION_DURATION, animateUIMotion, initUIMotion, prefersReducedUIMotion, setReducedMotion, syncAchievementProgressMotion } from '../dist/ui-motion.mjs';

function fixture() {
  const attrs = new Map();
  const observers = [];
  const media = { matches: false, addEventListener(type, fn) { this.listener = fn; }, removeEventListener() { this.listener = null; } };
  const root = { getAttribute: key => attrs.get(key), setAttribute: (key, value) => attrs.set(key, value), removeAttribute: key => attrs.delete(key) };
  const win = { matchMedia: () => media, MutationObserver: class {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {} disconnect() { this.disconnected = true; }
  } };
  const main = { querySelectorAll: () => [], querySelector: () => null };
  const doc = { documentElement: root, defaultView: win, getElementById: id => id === 'main' ? main : null, querySelector: () => cardList };
  function element() {
    return { ownerDocument: doc, hidden: false, calls: [], closest: () => null,
      animate(frames, options) {
        const animation = { cancel() { this.cancelled = true; } };
        this.calls.push({ frames, options, animation });
        return animation;
      } };
  }
  const cardList = element();
  return { doc, win, media, observers, main, element, cardList };
}

test('durações aprovadas, finitas e sem espera', () => {
  assert.deepEqual(UI_MOTION_DURATION, { category: 180, level: 220, notice: 300 });
  const f = fixture();
  for (const kind of Object.keys(UI_MOTION_DURATION)) {
    const node = f.element();
    animateUIMotion(node, kind);
    assert.equal(node.calls[0].options.duration, UI_MOTION_DURATION[kind]);
    assert.equal(node.calls[0].options.iterations, 1);
    assert.equal(node.calls[0].options.delay, undefined);
    if (kind !== 'notice') assert.ok(node.calls[0].frames.every(frame => !frame.transform));
  }
});

test('troca repetida cancela animação anterior, sem enfileirar ações', () => {
  const f = fixture(), node = f.element();
  const first = animateUIMotion(node, 'level');
  animateUIMotion(node, 'level');
  assert.equal(first.cancelled, true);
  assert.equal(node.calls.length, 2);
});

test('preferências manual e do sistema são combinadas, inclusive durante animação', () => {
  const f = fixture(), node = f.element();
  const cleanup = initUIMotion(f.doc, f.win);
  const first = animateUIMotion(node, 'notice');
  setReducedMotion(true, f.doc);
  assert.equal(first.cancelled, true);
  assert.equal(prefersReducedUIMotion(f.doc), true);
  assert.equal(animateUIMotion(node, 'level'), null);
  setReducedMotion(false, f.doc);
  const second = animateUIMotion(node, 'notice');
  f.media.matches = true;
  f.media.listener();
  assert.equal(second.cancelled, true);
  assert.equal(prefersReducedUIMotion(f.doc), true);
  assert.equal(animateUIMotion(node, 'level'), null);
  cleanup();
});

test('tabuleiro, conteúdo oculto, tipo desconhecido e navegador sem WAAPI são seguros', () => {
  const f = fixture();
  const board = f.element(); board.closest = () => board;
  assert.equal(animateUIMotion(board, 'level'), null);
  const hidden = f.element(); hidden.hidden = true;
  assert.equal(animateUIMotion(hidden, 'level'), null);
  const plain = f.element(); delete plain.animate;
  assert.equal(animateUIMotion(plain, 'level'), null);
  assert.equal(animateUIMotion(f.element(), 'unknown'), null);
});

test('inicialização idempotente e limpeza removem observação e animação', () => {
  const f = fixture();
  const cleanup = initUIMotion(f.doc, f.win);
  assert.equal(initUIMotion(f.doc, f.win), cleanup);
  assert.equal(f.observers.length, 2);
  const animation = animateUIMotion(f.element(), 'notice');
  cleanup();
  assert.equal(animation.cancelled, true);
  assert.ok(f.observers.every(observer => observer.disconnected));
  assert.equal(f.doc.documentElement.getAttribute('data-ui-motion'), undefined);
  assert.notEqual(initUIMotion(f.doc, f.win), cleanup);
});

test('assinatura distingue fase, ignora re-render idêntico e mutações do tabuleiro', () => {
  const f = fixture();
  const title = { textContent: 'Fase 1' };
  const heading = Object.assign(f.element(), { id: '', className: 'approved-game-heading', querySelectorAll: () => [title] });
  heading.closest = selector => selector.includes('section') ? { id: 'light' } : null;
  f.main.querySelectorAll = () => [heading];
  const cleanup = initUIMotion(f.doc, f.win);
  const target = { closest: selector => selector.includes('.approved-game-heading') ? heading : null };
  const records = [{ type: 'childList', target, addedNodes: [] }];
  f.observers[0].callback(records);
  assert.equal(heading.calls.length, 0);
  title.textContent = 'Fase 2';
  f.observers[0].callback([{ type: 'childList', target: { closest: () => ({}) } }]);
  assert.equal(heading.calls.length, 0);
  f.observers[0].callback(records);
  assert.equal(heading.calls.length, 1);
  f.observers[0].callback(records);
  assert.equal(heading.calls.length, 1);
  cleanup();
});

test('categoria anima lista sem alterar foco, rotas ou controles', () => {
  const f = fixture();
  const heading = { id: 'category-title', hidden: false, textContent: 'Todos', closest: () => null };
  f.main.querySelectorAll = () => [heading];
  const cleanup = initUIMotion(f.doc, f.win);
  heading.textContent = 'Versus';
  f.observers[0].callback([{ type: 'characterData', target: { nodeType: 3, parentElement: { closest: selector => selector.includes('#category-title') ? heading : null } } }]);
  assert.equal(f.cardList.calls[0].options.duration, 180);
  cleanup();
});

test('CSS mantém escopo, tempos e redução manual/sistema; módulo não usa estado nem cliques', () => {
  const css = readFileSync(new URL('../dist/ui-motion.css', import.meta.url), 'utf8');
  const js = readFileSync(new URL('../dist/ui-motion.mjs', import.meta.url), 'utf8');
  for (const time of [120, 160, 180, 240, 300]) assert.match(css, new RegExp(`${time}ms`));
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /data-ui-reduced-motion="true"/);
  assert.match(css, /platform-leaf, \.platform-pile/);
  assert.match(css, /--ui-card-lift: -3px/);
  assert.match(css, /outline: 3px/);
  for (const family of ['data-game', 'data-collection', 'data-sintonia', 'data-repasse', 'data-orbita', 'data-broto', 'data-cerco', 'data-logic', 'data-versus']) assert.ok(css.includes(`[${family}]`));
  assert.doesNotMatch(css, /infinite|transition: all|\.logic-board|\.collection-board/);
  assert.doesNotMatch(js, /localStorage|sessionStorage|pushState|preventDefault|stopPropagation|setTimeout|addEventListener\(['"](?:click|keydown)/);
});

function progressFixture() {
  const f = fixture();
  f.doc.createElement = () => Object.assign(f.element(), {
    style: {}, attrs: {}, setAttribute(key, value) { this.attrs[key] = value; },
    append(node) { this.child = node; }, isConnected: true,
  });
  const container = { ownerDocument: f.doc, closest: () => null, querySelectorAll() { return [this.progress]; } };
  function render(value) {
    if (container.progress?.track) container.progress.track.child.isConnected = false;
    const classes = new Set();
    container.progress = { id: 'achievement-first', value, max: 10,
      classList: { contains: key => classes.has(key), add: key => classes.add(key) },
      after(track) { this.track = track; },
    };
    return container.progress;
  }
  return { ...f, container, render };
}

test('barra real preserva value/max e rótulo, sem ganho fictício na primeira abertura', () => {
  const f = progressFixture(), progress = f.render(4);
  syncAchievementProgressMotion(f.container, { animate: true });
  assert.equal(progress.value, 4);
  assert.equal(progress.max, 10);
  assert.equal(progress.id, 'achievement-first');
  assert.equal(progress.track.attrs['aria-hidden'], 'true');
  assert.equal(progress.track.child.style.transform, 'scaleX(0.4)');
  assert.equal(progress.track.child.calls.length, 0);
  assert.equal(progress.classList.contains('ui-progress-native'), true);
});

test('barra interpola 240 ms só entre valores conhecidos e não reinicia ao filtrar', () => {
  const f = progressFixture();
  f.render(4); syncAchievementProgressMotion(f.container, { animate: true });
  let progress = f.render(6); syncAchievementProgressMotion(f.container, { animate: true });
  const call = progress.track.child.calls[0];
  assert.equal(call.options.duration, 240);
  assert.deepEqual(call.frames, [{ transform: 'scaleX(0.4)' }, { transform: 'scaleX(0.6)' }]);
  assert.equal(progress.track.child.style.transform, 'scaleX(0.6)');
  progress = f.render(6); syncAchievementProgressMotion(f.container);
  assert.equal(call.animation.cancelled, true);
  assert.equal(progress.track.child.calls.length, 0);
  progress = f.render(7); syncAchievementProgressMotion(f.container);
  assert.equal(progress.track.child.calls.length, 0);
  progress = f.render(7); syncAchievementProgressMotion(f.container, { animate: true });
  assert.equal(progress.track.child.calls.length, 0);
});

test('barra respeita movimento reduzido, cancelamento e mocks sem DOM', () => {
  syncAchievementProgressMotion({ innerHTML: '' }, { animate: true });
  const f = progressFixture();
  f.render(3); syncAchievementProgressMotion(f.container, { animate: true });
  let progress = f.render(5); syncAchievementProgressMotion(f.container, { animate: true });
  const animation = progress.track.child.calls[0].animation;
  setReducedMotion(true, f.doc);
  assert.equal(animation.cancelled, true);
  progress = f.render(8); syncAchievementProgressMotion(f.container, { animate: true });
  assert.equal(progress.track.child.calls.length, 0);
  assert.equal(progress.track.child.style.transform, 'scaleX(0.8)');
});
