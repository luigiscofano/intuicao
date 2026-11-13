import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { animateUIMotion, prefersReducedUIMotion } from '../dist/ui-motion.mjs';

const css = readFileSync(new URL('../dist/ui-motion.css', import.meta.url), 'utf8');

test('apenas as folhas ambientais móveis são retiradas; o chão fica contido', () => {
  assert.match(css, /body > \.platform-leaf-foreground,\s*body > \.platform-leaf-layer > \.platform-leaf\s*\{\s*display: none !important;\s*animation: none !important;/);
  assert.match(css, /body > \.platform-leaf-layer > \.platform-pile-surface\s*\{\s*overflow: hidden;/);
  // Nenhuma regra nova toca arte estática, peças, exemplos ou celebrações.
  const intent = css.slice(0, css.indexOf('/* Camada visual opcional.'));
  assert.doesNotMatch(intent, /(?:\.rules-|\.rpx-|\.victory|\.achievement|\.b-piece|\.approved-tiles|\.game-illustration)\S*\s*\{/);
});

test('preferência manual e preferência do sistema continuam respeitadas', () => {
  assert.equal(prefersReducedUIMotion({ documentElement: { getAttribute: () => 'true' } }, {}), true);
  assert.equal(prefersReducedUIMotion({ documentElement: { getAttribute: () => 'false' } }, { matchMedia: () => ({ matches: true }) }), true);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('notificação funcional continua animada e tabuleiros nunca recebem movimento de layout', () => {
  let called = 0;
  const doc = { documentElement: { getAttribute: () => 'false' } };
  const win = { matchMedia: () => ({ matches: false }) };
  const element = { ownerDocument: doc, hidden: false, closest: () => null,
    animate: (_frames, options) => { called++; assert.equal(options.iterations, 1); return { cancel() {} }; } };
  assert.ok(animateUIMotion(element, 'notice', win));
  assert.equal(called, 1);
  assert.equal(animateUIMotion({ ...element, closest: () => ({}) }, 'level', win), null);
  assert.equal(called, 1);
});
