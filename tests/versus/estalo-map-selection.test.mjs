import test from 'node:test';
import assert from 'node:assert/strict';
import { ESTALO_MAPS } from '../../dist/versus/games/estalo/maps.mjs';
import { estaloMapPreview } from '../../dist/versus/games/estalo/map-selection.mjs';
import { renderMapSelection as renderCommon } from '../../dist/versus/map-selection.mjs';
const renderMapSelection=(maps,selectedId)=>renderCommon({id:'estalo',maps,selectedId,preview:estaloMapPreview});

test('Estalo: seis tamanhos e cartões do tamanho selecionado, sem seletor suspenso', () => {
  for (const selected of ESTALO_MAPS) {
    const html = renderMapSelection(ESTALO_MAPS, selected.id);
    assert.equal((html.match(/data-vs-group=/g) ?? []).length, 6);
    assert.equal((html.match(/data-vs-map=/g) ?? []).length,
      ESTALO_MAPS.filter(map => map.rows === selected.rows && map.columns === selected.columns).length);
    assert.match(html, new RegExp(`data-vs-map="${selected.id}" aria-pressed="true"`));
    assert.match(html, /aria-live="polite"/);
    assert.match(html, /✓ Selecionado/);
    assert.doesNotMatch(html, /<select/);
  }
});
test('Estalo: miniaturas mantêm espaços ausentes e duas cores', () => {
  const html = renderMapSelection(ESTALO_MAPS, 'ilha');
  assert.equal((html.match(/class="estalo-mini-gap"/g) ?? []).length, ESTALO_MAPS.filter(map => map.rows === 6 && map.columns === 6).reduce((sum, map) => sum + map.blocked.length, 0));
  assert.match(html, /--map-cols:6;--map-rows:6/);
  assert.match(html, /estalo-mini-team-0/);
  assert.match(html, /estalo-mini-team-1/);
});


test('Estalo: miniaturas revelam setas para diferenciar contornos iguais', () => {
  const html = renderMapSelection(ESTALO_MAPS, 'classico');
  assert.equal((html.match(/--direction:/g) ?? []).length, ESTALO_MAPS.filter(map => map.rows === 4 && map.columns === 4).reduce((total,map)=>total+map.board.filter(Boolean).length,0));
});
