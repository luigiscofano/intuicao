import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ACTIVE_GAME_IDS, ACTIVE_GAME_COUNT, gameDisplayNumber } from '../dist/game-catalog.mjs';
import { GAME_PRESENTATION } from '../dist/approved-game-shell.mjs';
import { CATEGORY_GAMES } from '../dist/category-navigation.mjs';
import { VERSUS_GAMES } from '../dist/versus/metadata.mjs';
import { LOGIC_GAMES } from '../dist/logica/metadata.mjs';

test('catálogo ativo mantém 19 IDs únicos em ordem por categoria', () => {
  assert.equal(ACTIVE_GAME_COUNT, 19);
  assert.equal(new Set(ACTIVE_GAME_IDS).size, 19);
  assert.deepEqual(Object.values(CATEGORY_GAMES).flat(), ACTIVE_GAME_IDS);
  assert.equal(gameDisplayNumber('orbita'), undefined);
});
test('cards e cabeçalhos usam índices consecutivos de 01 a 19', () => {
  const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  const cards = [...html.matchAll(/<button[^>]*data-(?:game|collection|sintonia|repasse|logic|broto|cerco|versus)="([^"]+)"[^>]*>\s*<span>(\d+)<\/span>/g)];
  assert.deepEqual(cards.map(m => m[1]), ACTIVE_GAME_IDS);
  for (const [index, id] of ACTIVE_GAME_IDS.entries()) {
    const number = String(index + 1).padStart(2, '0');
    assert.equal(gameDisplayNumber(id), number);
    assert.equal(cards[index][2], number);
    assert.equal(GAME_PRESENTATION[id].number, number);
  }
  assert.match(html, /Jogos <span>19<\/span>/);
});
test('metadados atuais e carregamentos provisórios não mantêm índices retirados', () => {
  for (const game of [...VERSUS_GAMES, ...LOGIC_GAMES].filter(game => ACTIVE_GAME_IDS.includes(game.id))) {
    assert.equal(game.number, gameDisplayNumber(game.id));
  }
  for (const id of ['sintonia', 'repasse']) {
    const source = readFileSync(new URL(`../dist/${id}/route.mjs`, import.meta.url), 'utf8');
    assert.match(source, new RegExp(`EXPERIMENTO ${gameDisplayNumber(id)}`));
  }
});
