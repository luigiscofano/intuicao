import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CATEGORY_GAMES } from '../dist/category-navigation.mjs';
import { SELECTION_GAMES } from '../dist/selection-presentation.mjs';

const css = readFileSync(new URL('../dist/selection-presentation.css', import.meta.url), 'utf8');

test('entrada compacta alcança os 19 jogos pela apresentação compartilhada', () => {
  const games = Object.values(CATEGORY_GAMES).flat();
  assert.equal(games.length, 19);
  for (const game of games) assert.ok(Object.hasOwn(SELECTION_GAMES, game), game);
  assert.equal(games.filter(game => SELECTION_GAMES[game] === 'versus').length, 7);
  assert.match(css, /\.unified-selection\{padding:clamp\(14px,2vw,20px\)/);
});

test('títulos compactos mantêm fonte C e tutoriais começam alinhados ao topo', () => {
  assert.match(css, /clamp\(24px,2.5vw,28px\)\/1.2 var\(--font-title\)/);
  assert.match(css, /\.rules-preview\{[^}]*align-items:start/);
  assert.match(css, /@media \(max-width: 680px\)/);
});

test('retorno conserva alvo de toque e não comprime tabuleiros ou ícones de ações', () => {
  const entry = css.slice(css.indexOf('/* Entrada dos jogos:'));
  assert.match(entry, /#category-back \{[^}]*min-height: 44px/);
  assert.doesNotMatch(entry, /\.scene-wrap|\.board|\.action-sidebar|transform:|zoom:|overflow:\s*hidden/);
  assert.doesNotMatch(entry, /display:\s*none/);
});
