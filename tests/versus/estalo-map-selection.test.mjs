import test from 'node:test';
import assert from 'node:assert/strict';
import { ESTALO_MAPS } from '../../dist/versus/games/estalo/maps.mjs';
import { renderMapSelection } from '../../dist/versus/games/estalo/map-selection.mjs';

test('Estalo: quatro tamanhos e cartões do tamanho selecionado, sem seletor suspenso', () => {
  for (const selected of ESTALO_MAPS) {
    const html = renderMapSelection(ESTALO_MAPS, selected.id);
    assert.equal((html.match(/data-estalo-size=/g) ?? []).length, 4);
    assert.equal((html.match(/data-estalo-map=/g) ?? []).length,
      ESTALO_MAPS.filter(map => map.rows === selected.rows && map.columns === selected.columns).length);
    assert.match(html, new RegExp(`data-estalo-map="${selected.id}" aria-pressed="true"`));
    assert.match(html, /aria-live="polite"/);
    assert.match(html, /✓ Selecionado/);
    assert.doesNotMatch(html, /<select/);
  }
});
test('Estalo: miniaturas mantêm espaços ausentes e duas cores', () => {
  const html = renderMapSelection(ESTALO_MAPS, 'ilha');
  assert.equal((html.match(/class="estalo-mini-gap"/g) ?? []).length, 8);
  assert.match(html, /--map-cols:6;--map-rows:6/);
  assert.match(html, /estalo-mini-team-0/);
  assert.match(html, /estalo-mini-team-1/);
});
