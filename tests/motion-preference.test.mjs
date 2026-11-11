import test from 'node:test';
import assert from 'node:assert/strict';
import { initMotionPreference, MOTION_PREFERENCE_KEY } from '../dist/motion-preference.mjs';
import { prefersReducedUIMotion } from '../dist/ui-motion.mjs';

function fixture({ saved = null, system = false, blockedRead = false, blockedWrite = false } = {}) {
  const reads = [], writes = [], attrs = new Map(), events = new Map(), changes = [];
  const checkbox = { dataset: {}, checked: false, disabled: false, addEventListener(type, fn) { changes.push(fn); } };
  const description = { textContent: '' };
  const media = { matches: system, listeners: [], addEventListener(type, fn) { this.listeners.push(fn); } };
  const win = {
    matchMedia: () => media,
    addEventListener(type, fn) { if (!events.has(type)) events.set(type, []); events.get(type).push(fn); },
    get localStorage() {
      if (blockedRead) throw new Error('Storage blocked');
      return { getItem(key) { reads.push(key); return saved; }, setItem(key, value) { if (blockedWrite) throw new Error('Quota'); writes.push([key, value]); } };
    },
  };
  const doc = { defaultView: win, getElementById: id => id === 'motion-reduce' ? checkbox : id === 'motion-description' ? description : null,
    documentElement: { getAttribute: key => attrs.get(key), setAttribute: (key, value) => attrs.set(key, value) } };
  const change = value => { checkbox.checked = value; changes.forEach(fn => fn()); };
  const storageEvent = (key, newValue) => events.get('storage')?.forEach(fn => fn({ key, newValue }));
  return { doc, win, checkbox, description, media, reads, writes, events, changes, attrs, change, storageEvent };
}

test('lê e persiste apenas a preferência visual, nunca saves', () => {
  const f = fixture({ saved: 'reduce' });
  initMotionPreference(f.doc, f.win);
  assert.equal(MOTION_PREFERENCE_KEY, 'intuicao.ui-motion.v1');
  assert.deepEqual(f.reads, [MOTION_PREFERENCE_KEY]);
  assert.deepEqual(f.writes, []);
  assert.equal(f.checkbox.checked, true);
  f.change(false); f.change(true);
  assert.deepEqual(f.writes, [[MOTION_PREFERENCE_KEY, 'system'], [MOTION_PREFERENCE_KEY, 'reduce']]);
  assert.equal(f.attrs.get('data-ui-reduced-motion'), 'true');
});

test('sistema tem prioridade sem sobrescrever a escolha manual', () => {
  const f = fixture({ system: true, saved: 'system' });
  initMotionPreference(f.doc, f.win);
  assert.equal(f.checkbox.checked, true);
  assert.equal(f.checkbox.disabled, true);
  assert.equal(prefersReducedUIMotion(f.doc), true);
  assert.match(f.description.textContent, /aparelho/);
  assert.deepEqual(f.writes, []);
  f.media.matches = false; f.media.listeners.forEach(fn => fn());
  assert.equal(f.checkbox.checked, false);
  assert.equal(f.checkbox.disabled, false);
  f.change(true);
  f.media.matches = true; f.media.listeners.forEach(fn => fn());
  f.media.matches = false; f.media.listeners.forEach(fn => fn());
  assert.equal(f.checkbox.checked, true);
  assert.equal(prefersReducedUIMotion(f.doc), true);
});

test('armazenamento bloqueado mantém preferência durante a visita sem lançar erro', () => {
  for (const options of [{ blockedRead: true }, { blockedWrite: true }]) {
    const f = fixture(options);
    assert.doesNotThrow(() => initMotionPreference(f.doc, f.win));
    assert.doesNotThrow(() => f.change(true));
    assert.equal(f.checkbox.checked, true);
    assert.equal(f.attrs.get('data-ui-reduced-motion'), 'true');
    f.change(false);
    assert.equal(f.attrs.get('data-ui-reduced-motion'), 'false');
  }
});

test('inicialização repetida não duplica handlers nem reconsulta storage', () => {
  const f = fixture();
  initMotionPreference(f.doc, f.win); initMotionPreference(f.doc, f.win);
  assert.equal(f.changes.length, 1);
  assert.equal(f.media.listeners.length, 1);
  assert.equal(f.events.get('storage').length, 1);
  assert.equal(f.reads.length, 1);
  f.change(true);
  assert.equal(f.writes.length, 1);
  assert.doesNotThrow(() => initMotionPreference({ getElementById: () => null }, f.win));
});

test('storageevent só responde à própria chave e não ecoa writes', () => {
  const f = fixture(); initMotionPreference(f.doc, f.win);
  f.storageEvent('intuicao.campaign.light.progress.v1', 'reduce');
  f.storageEvent(null, 'reduce');
  assert.equal(f.checkbox.checked, false);
  f.storageEvent(MOTION_PREFERENCE_KEY, 'reduce');
  assert.equal(f.checkbox.checked, true);
  f.storageEvent(MOTION_PREFERENCE_KEY, null);
  assert.equal(f.checkbox.checked, false);
  assert.deepEqual(f.writes, []);
});
