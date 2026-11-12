import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CAMPAIGN, initialState, renderBoard } from '../../dist/logica/games/renovo/index.mjs';
import { boardGeometry, cellCenter } from '../../dist/logica/games/renovo/geometry.mjs';
import { pieceSymbol } from '../../dist/logica/games/renovo/art.mjs';
import { LOGIC_RULE_EXAMPLES } from '../../dist/rules-logic-examples.mjs';

test('RENOVO: approved C1 geometry and accessible targets across all campaign dimensions', () => {
  assert.deepEqual(boardGeometry({width:5,height:5}), {size:68,gap:8,step:76,x0:62,y0:54,bw:372,bh:372,width:500,height:532});
  assert.deepEqual(cellCenter({width:5,height:5}, 7), [248,164]);
  for (const level of CAMPAIGN) {
    const svg = renderBoard(level, initialState());
    const g = boardGeometry(level);
    assert.ok(svg.includes(`viewBox="0 0 ${g.width} ${g.height}"`));
    assert.equal((svg.match(/fill="#f4f5ec"/g)||[]).length, level.width*level.height);
    assert.equal((svg.match(/data-cell=/g)||[]).length, Object.keys(level.pieces).length);
    assert.match(svg, /class="renovo-gesture-preview" pointer-events="none" aria-hidden="true"/);
    assert.ok(svg.indexOf('renovo-gesture-preview') < svg.indexOf('data-cell='));
    assert.doesNotMatch(svg, /undefined|NaN/);
  }
});
test('RENOVO: P1 seed, B3 spiral and veined leaf reused by rules', () => {
  assert.match(pieceSymbol('S',0,0), /M-14-10C-24 0-15 18-2 17/);
  assert.match(pieceSymbol('S',0,0), /rotate\(-30\)/);
  assert.match(pieceSymbol('B',0,0), /M-11-1C-7-10 7-12 10-3/);
  assert.match(pieceSymbol('F',0,0), /#244b63/);
  assert.equal((pieceSymbol('F',0,0).match(/l/g)||[]).length > 4, true);
  assert.ok(LOGIC_RULE_EXAMPLES.renovo.svg.includes(pieceSymbol('B',73,43,9)));
  assert.doesNotMatch(LOGIC_RULE_EXAMPLES.renovo.steps.join(' '), /losango|círculo/);
});
test('RENOVO: touch suppression is scoped to pieces; approved hero is isolated', () => {
  const css=readFileSync(new URL('../../dist/logica/games/renovo/view.css',import.meta.url),'utf8');
  assert.match(css, /\.renovo-board \[data-cell\]\s*\{[^}]*touch-action: none;/);
  const shell=readFileSync(new URL('../../dist/approved-game-shell.css',import.meta.url),'utf8');
  assert.match(shell, /\.approved-tiles\.approved-tiles--renovo/);
  assert.match(shell, /platform-assets\/renovo-aiij-c1.png/);
});

test('RENOVO: narrow and short windows keep actions below the board', () => {
 const css=readFileSync(new URL('../../dist/logica/games/renovo/view.css',import.meta.url),'utf8');
 assert.match(css,/@media \(max-width: 600px\) and \(max-height: 500px\)/);
 assert.match(css,/\.viewport-game:has\(\.renovo-board\) \.approved-workspace\s*\{\s*grid-template-columns: minmax\(0, 1fr\) !important;/);
});
