import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { CAMPAIGN } from '../../dist/logica/games/refugio/campaign.mjs';
import { initialState, applyAction, checkState, solutionState } from '../../dist/logica/games/refugio/engine.mjs';
import { renderBoard } from '../../dist/logica/games/refugio/view.mjs';
import { readRefugioSkin, writeRefugioSkin, REFUGIO_SKIN_KEY } from '../../dist/logica/games/refugio/skin.mjs';

test('normal preserva exatamente o SVG anterior do primeiro desafio', () => {
  const level = CAMPAIGN[0];
  const markup = renderBoard(level, initialState(level), { skin: 'normal' });
  const svg = markup.slice(markup.indexOf('<svg'));
  assert.equal(createHash('sha256').update(svg).digest('hex'), '361041bfcbdc9db9004f764cdfae69be821a6fe0b2c62de0a9f308e9852535b7');
});

test('80 fases: ambas as skins preservam células, pistas, nomes e estados', () => {
  for (const level of CAMPAIGN) {
    const state = initialState(level);
    const snapshot = JSON.stringify({ level, state });
    for (const skin of ['normal', 'identity']) {
      const markup = renderBoard(level, state, { skin });
      assert.equal((markup.match(/data-cell=/g) ?? []).length, level.rows * level.cols);
      assert.equal((markup.match(/class="refugio-leaf-marker"/g) ?? []).length, skin === 'identity' ? level.markers.length : 0);
      assert.equal((markup.match(/class="refugio-tile-signature"/g) ?? []).length, skin === 'identity' ? 2 : 0);
      assert.equal((markup.match(/aria-disabled="true"/g) ?? []).length, level.givens.filter(value => value !== null).length);
      for (const marker of level.markers) assert.ok(markup.includes(`marco ${marker.label}, livre, pista fixa`));
      assert.equal(JSON.stringify({ level, state }), snapshot);
    }
    assert.equal(checkState(level, solutionState(level)).valid, true);
  }
});

test('visual não altera uma partida editada nem o significado da verificação', () => {
  const level = CAMPAIGN[30];
  const index = level.givens.findIndex(value => value === null);
  const state = applyAction(level, initialState(level), { type: 'cell', index, tool: 'wall' });
  const snapshot = JSON.stringify(state);
  const result = checkState(level, state);
  for (const skin of ['normal', 'identity', 'normal']) renderBoard(level, state, { skin });
  assert.equal(JSON.stringify(state), snapshot);
  assert.deepEqual(checkState(level, state), result);
});

test('preferência visual possui chave própria e tolera armazenamento indisponível', () => {
  const writes = [];
  const storage = { getItem: () => null, setItem: (...args) => writes.push(args) };
  assert.equal(writeRefugioSkin('normal', storage), true);
  assert.equal(readRefugioSkin(storage), 'normal');
  assert.deepEqual(writes, [[REFUGIO_SKIN_KEY, 'normal']]);
  assert.equal(writeRefugioSkin('invalid', storage), false);
  const blocked = { getItem: () => 'normal', setItem() { throw Error('bloqueado'); } };
  assert.equal(writeRefugioSkin('identity', blocked), true);
  assert.equal(readRefugioSkin(blocked), 'identity');
});

test('troca de skin apenas redesenha e mantém foco, sem mudar sessão', () => {
  const ui = readFileSync(new URL('../../dist/logica/ui.mjs', import.meta.url), 'utf8');
  const start = ui.indexOf('const refugioSkinButton');
  const end = ui.indexOf('return;', start);
  assert.ok(start >= 0 && end > start);
  const handler = ui.slice(start, end);
  assert.match(handler, /renderBoard\(\)/);
  assert.match(handler, /preventScroll: true/);
  assert.doesNotMatch(handler, /edit\(|start\(|save\(|complete\(/);
});

test('AIIJ preservada continua transparente, sem ocupar o início do jogo', () => {
  const art = readFileSync(new URL('../../dist/platform-assets/refugio-aiij-folhas.svg', import.meta.url), 'utf8');
  assert.ok(art.includes('<svg'));
  assert.ok(!/<rect[^>]*width="900"[^>]*height="630"/.test(art));
  const shell = readFileSync(new URL('../../dist/approved-game-shell.mjs', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../../dist/approved-game-shell.css', import.meta.url), 'utf8');
  assert.match(css, /approved-tiles--refugio[^}]*aspect-ratio: 300 \/ 210/);
  assert.doesNotMatch(shell, /const tiles = element/);
  assert.match(shell, /hero\.append\(band\)/);
});
