import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { arrangeVersusPlayers } from '../dist/versus-player-layout.mjs';
import { createState, getLegalMoves, applyMove } from '../dist/versus/games/quinhao/engine.mjs';
import { renderBoard } from '../dist/versus/games/quinhao/view.mjs';

// O adaptador muda somente o pai dos mesmos nós: nenhum dado é clonado.
function fixture() {
  const paragraph = {};
  const sides = { children: [], append: deposit => move(deposit, sides) };
  const center = { children: [], querySelector: () => paragraph,
    insertBefore: deposit => move(deposit, center) };
  function move(deposit, destination) {
    deposit.parentElement.children = deposit.parentElement.children.filter(item => item !== deposit);
    destination.children.push(deposit);
    deposit.parentElement = destination;
  }
  const deposits = [0, 1].map(player => ({ player, parentElement: center }));
  center.children = [...deposits];
  const area = {
    querySelector: selector => selector === '.quinhao-center' ? center : sides,
    querySelectorAll: () => deposits,
  };
  return { surface: { querySelector: () => area }, center, sides, deposits };
}

test('depósitos originais alternam entre laterais e centro, sem duplicatas', () => {
  const { surface, center, sides, deposits } = fixture();
  for (const width of [1440, 1440, 320, 390, 1316, 650]) {
    arrangeVersusPlayers(surface, width);
    assert.equal(center.children.length + sides.children.length, 2);
    assert.deepEqual(width >= 1200 ? sides.children : center.children, deposits);
  }
});

test('jogos sem depósitos continuam intactos', () => {
  assert.doesNotThrow(() => arrangeVersusPlayers({ querySelector: () => null }, 1440));
});

test('prévia e oito rodadas preservam dados e exatamente dois depósitos', () => {
  let state = createState();
  while (!state.result) {
    const before = JSON.stringify(state);
    const move = getLegalMoves(state)[0];
    const next = applyMove(state, move);
    const html = renderBoard(state, { pendingMove: move, previewState: next });
    assert.equal((html.match(/class="quinhao-deposit quinhao-player-/g) || []).length, 2);
    assert.equal(JSON.stringify(state), before);
    state = next;
  }
});

test('faixa móvel não escala tabuleiro nem remove controles', () => {
  const css = readFileSync(new URL('../dist/versus-player-layout.css', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /transform:\s*scale|zoom:|pointer-events:\s*none/);
  assert.match(css, /\.desvio-player-strip/);
  assert.match(css, /\.acorde-collection--0/);
  assert.match(css, /\.acorde-collection--1/);
});

// O novo adaptador de apresentação não pode assumir responsabilidades do motor.
test('adaptador visual não acessa rede, armazenamento nem motor', () => {
  const source = readFileSync(new URL('../dist/versus-player-layout.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /localStorage|sessionStorage|indexedDB|fetch\(|\.setItem\(|\.removeItem\(|engine\.mjs/);
});

test('Desvio preenche a coluna central, sem shrink-to-fit por margem automática', () => {
  const css = readFileSync(new URL('../dist/versus-player-layout.css', import.meta.url), 'utf8');
  assert.match(css, /\.desvio-lab \.board-navigation \{[^}]*width: 100%;[^}]*max-width: none/);
});

test('ações móveis mantêm 44px e usam duas linhas sem diminuir o tabuleiro', () => {
  const css = readFileSync(new URL('../dist/versus-player-layout.css', import.meta.url), 'utf8');
  assert.match(css, /\.sidebar-actions \{[^}]*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /\[data-sidebar-action\] \{[^}]*min-height: 44px/);
});
