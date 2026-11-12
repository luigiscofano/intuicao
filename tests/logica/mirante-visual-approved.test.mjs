import test from 'node:test';
import assert from 'node:assert/strict';
import { CAMPAIGN } from '../../dist/logica/games/mirante/index.mjs';
import { initialState } from '../../dist/logica/games/mirante/engine.mjs';
import { renderBoard, miranteGeometry } from '../../dist/logica/games/mirante/view.mjs';
import { mirantePiece, miranteObserver } from '../../dist/logica/games/mirante/art.mjs';

test('80 fases preservam posições, formas, estoque e alvos acessíveis', () => {
  for (const level of CAMPAIGN) {
    const svg = renderBoard(level, initialState(level));
    assert.equal((svg.match(/role="button"/g) || []).length, level.rows * level.cols);
    assert.equal((svg.match(/class="mirante-observer"/g) || []).length, Object.values(level.observers).flat().filter(v => v !== null).length);
    assert.equal((svg.match(/tabindex="0"/g) || []).length, level.rows * level.cols);
    assert.doesNotMatch(svg, /undefined|NaN|onclick|oncontextmenu/);
    const geometry = miranteGeometry(level);
    assert.ok(geometry.minimumWidth / geometry.width * geometry.size >= 44);
    for (const value of Object.values(level.inventory)) assert.ok(svg.includes(`× ${value}`));
  }
});
test('tabuleiro e peças C1 combinam com observadores C3 e símbolos sem depender de cor', () => {
  const level = CAMPAIGN[0], state = initialState(level);
  state.cells.splice(0, 4, 1, 2, 0, null);
  const svg = renderBoard(level, state, { selectedTool: 'triangle' });
  assert.match(svg, /viewBox="0 0 408 492"/);
  assert.match(svg, /A1: círculo/); assert.match(svg, /B1: triângulo/);
  assert.match(svg, /C1: vazia/); assert.match(svg, /A2: indecisa/);
  assert.match(mirantePiece(1, 100, 100), /#244b63/);
  assert.match(mirantePiece(2, 100, 100), /#39654c/);
  assert.match(miranteObserver(1, 100, 100), /#f2e4ba/);
  assert.match(svg, /Botão direito: × vazio/);
});
