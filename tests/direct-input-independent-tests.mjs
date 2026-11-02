// Testes e verificações de componentes compartilhados do Intuição.
import assert from 'node:assert/strict';
import { bindDirectInput, createBoardViewport } from '../dist/direct-input.mjs';
class Target {
  constructor() {
    this.handlers = new Map();
    this.style = {};
  }
  addEventListener(type, fn) {
    const a = this.handlers.get(type) || [];
    a.push(fn);
    this.handlers.set(type, a);
  }
  removeEventListener(type, fn) {
    this.handlers.set(
      type,
      (this.handlers.get(type) || []).filter((x) => x !== fn),
    );
  }
  emit(type, options = {}) {
    const e = {
      target: this,
      pointerId: 1,
      button: 0,
      pointerType: 'mouse',
      clientX: 25,
      clientY: 25,
      detail: 1,
      preventDefault() {
        this.prevented = true;
      },
      stopPropagation() {},
      ...options,
    };
    for (const fn of this.handlers.get(type) || []) fn(e);
    return e;
  }
}
function setup(extra = {}) {
  const board = new Target(),
    doc = new Target(),
    win = new Target();
  board.ownerDocument = doc;
  doc.defaultView = win;
  let rect = { left: 0, top: 0, width: 400, height: 200, right: 400, bottom: 200 };
  board.getBoundingClientRect = () => rect;
  board.setPointerCapture = () => {};
  const cells = Array.from({ length: 8 }, (_, i) => ({
    dataset: { cell: String(i) },
    closest(selector) {
      return selector === '[data-cell]' ? this : null;
    },
    focus() {},
  }));
  board.contains = (x) => x === board || cells.includes(x);
  board.querySelector = (selector) => cells[Number(selector.match(/\d+/)?.[0])];
  const log = [],
    on =
      (name) =>
      (...args) => {
        log.push([name, ...args]);
      };
  const cleanup = bindDirectInput({
    board,
    getContext: () => ({ rows: 2, cols: 4 }),
    onClick: on('click'),
    onContext: on('context'),
    onLongPress: on('long'),
    onGestureStart: (...args) => {
      log.push(['start', ...args]);
      return 'paint';
    },
    onGestureCell: on('cell'),
    onGestureEnd: on('end'),
    onGestureCancel: on('cancel'),
    onNavigate: on('nav'),
    longPressMs: 10,
    ...extra,
  });
  const emit = (type, options = {}) => board.emit(type, { target: cells[0], ...options });
  return {
    board,
    doc,
    win,
    cells,
    log,
    emit,
    cleanup,
    setRect: (r) => {
      rect = r;
    },
  };
}
const tests = [];
const test = (name, run) => tests.push([name, run]);
test('right drag followed by contextmenu applies one transaction only', () => {
  const h = setup();
  h.emit('pointerdown', { button: 2 });
  h.emit('pointermove', { button: 2, clientX: 225, target: h.cells[2] });
  h.emit('pointerup', { button: 2, clientX: 225, target: h.cells[2] });
  h.emit('contextmenu', { button: 2, target: h.cells[2] });
  h.cleanup();
  assert.equal(h.log.filter((x) => x[0] === 'end').length, 1);
  assert.equal(
    h.log.filter((x) => x[0] === 'context').length,
    0,
    'contextmenu must not perform another edit after right drag',
  );
});
test('second touch rolls back active editing before viewport navigation', () => {
  const h = setup();
  h.emit('pointerdown', { pointerType: 'touch' });
  h.emit('pointermove', { pointerType: 'touch', clientX: 125 });
  h.emit('pointerdown', { pointerType: 'touch', pointerId: 2, clientX: 225 });
  h.emit('pointerup', { pointerType: 'touch', pointerId: 2, clientX: 225 });
  h.emit('pointerup', { pointerType: 'touch', clientX: 125 });
  h.cleanup();
  assert.equal(h.log.filter((x) => x[0] === 'cancel' && x[1] === 'multitouch').length, 1);
  assert.equal(h.log.filter((x) => x[0] === 'end' || x[0] === 'click').length, 0);
  assert.ok(h.log.findIndex((x) => x[0] === 'cancel') < h.log.findIndex((x) => x[0] === 'nav'));
});
test('pointercancel and Escape each roll back but never commit', () => {
  for (const reason of ['pointercancel', 'escape']) {
    const h = setup();
    h.emit('pointerdown');
    h.emit('pointermove', { clientX: 125 });
    if (reason === 'pointercancel') h.emit('pointercancel');
    else h.emit('keydown', { key: 'Escape' });
    h.emit('pointerup', { clientX: 125 });
    h.cleanup();
    assert.equal(h.log.filter((x) => x[0] === 'cancel').length, 1);
    assert.equal(h.log.filter((x) => x[0] === 'end' || x[0] === 'click').length, 0);
  }
});
test('longpress release and browser contextmenu never also click', async () => {
  const h = setup();
  h.emit('pointerdown', { pointerType: 'touch' });
  await new Promise((r) => setTimeout(r, 25));
  h.emit('contextmenu', { pointerType: 'touch' });
  h.emit('pointerup', { pointerType: 'touch' });
  h.emit('click');
  h.cleanup();
  assert.equal(h.log.filter((x) => x[0] === 'long').length, 1);
  assert.equal(
    h.log.filter((x) => x[0] === 'click' || x[0] === 'context' || x[0] === 'end').length,
    0,
  );
});
test('fast drag interpolates all cells and processes revisits once', () => {
  const h = setup();
  h.emit('pointerdown');
  h.emit('pointermove', { clientX: 375 });
  h.emit('pointermove', { clientX: 25 });
  h.emit('pointerup');
  h.cleanup();
  assert.deepEqual(
    h.log.filter((x) => x[0] === 'cell').map((x) => x[1]),
    [0, 1, 2, 3],
  );
});
test('outside drag supplies null drop rather than last valid cell', () => {
  const h = setup();
  h.emit('pointerdown');
  h.emit('pointermove', { clientX: 125 });
  h.emit('pointerup', { clientX: 450 });
  h.cleanup();
  assert.equal(h.log.find((x) => x[0] === 'end')[1], null);
});
test('scaled translated bounding box gives correct drop cell', () => {
  const h = setup();
  h.setRect({ left: 80, top: 40, width: 800, height: 400, right: 880, bottom: 440 });
  h.emit('pointerdown', { clientX: 100, clientY: 60 });
  h.emit('pointermove', { clientX: 790, clientY: 360 });
  h.emit('pointerup', { clientX: 790, clientY: 360 });
  h.cleanup();
  assert.equal(h.log.find((x) => x[0] === 'end')[1], 7);
});
test('mouse click plus synthesized click creates one action', () => {
  const h = setup();
  h.emit('pointerdown');
  h.emit('pointerup');
  h.emit('click');
  h.cleanup();
  assert.equal(h.log.filter((x) => x[0] === 'click').length, 1);
});
test('viewport reset is visual-only and restore returns original transform', () => {
  const h = setup();
  h.board.style.transform = 'rotate(0deg)';
  const viewport = createBoardViewport({ board: h.board });
  viewport.zoom(2, 50, 50);
  assert.deepEqual(viewport.getState(), { scale: 2, x: -50, y: -50 });
  viewport.pan(30, 20);
  viewport.reset();
  assert.deepEqual(viewport.getState(), { scale: 1, x: 0, y: 0 });
  viewport.destroy();
  assert.equal(h.board.style.transform, 'rotate(0deg)');
  h.cleanup();
});
let failures = 0;
for (const [name, run] of tests) {
  try {
    await run();
    console.log('PASS', name);
  } catch (error) {
    failures++;
    console.error('FAIL', name, error.message);
  }
}
console.log(`${tests.length - failures}/${tests.length} independent gesture tests passed.`);
if (failures) process.exitCode = 1;
