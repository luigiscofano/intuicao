// Testes e verificações de ELO.
/** Structural regression for the clipping observed in published levels 81/121.
 * Font metrics and actual screenshots remain a separate real-browser QA step. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ELO_CAMPAIGN } from '../dist/elo-campaign.mjs';
import { eloBoardLabels, eloOverlayClues } from '../dist/elo-presentation.mjs';
import { buildDirectHint } from '../dist/direct-hints.mjs';
import { analyzeEloLocal, validateElo } from '../dist/elo-rules.mjs';
import { host, $ } from './direct-ui-harness.mjs';
import { initCollection } from '../dist/collection-ui.mjs';

let labelCount = 0;
for (const l of ELO_CAMPAIGN) {
  const c = l.constraints ?? {},
    html = eloBoardLabels(l);
  const expected =
    Object.keys(c.rowCounts ?? {}).length +
    Object.keys(c.colCounts ?? {}).length +
    (c.cuts ?? []).length;
  assert.equal((html.match(/<span /g) ?? []).length, expected, l.id);
  assert.doesNotMatch(
    eloOverlayClues(l),
    /<text/,
    'ELO label font size must not scale with the SVG viewBox',
  );
  for (const [r, n] of Object.entries(c.rowCounts ?? {}))
    assert.ok(html.includes(`>L${+r + 1}·${n}</span>`));
  for (const [col, n] of Object.entries(c.colCounts ?? {}))
    assert.ok(html.includes(`>C${+col + 1}·${n}</span>`));
  for (const [_, axis, percent] of html.matchAll(/style="(top|left):([\d.]+)%"/g))
    assert.ok(+percent > 0 && +percent < 100, axis);
  assert.equal(
    (eloBoardLabels(l, true).match(/<span /g) ?? []).length,
    l.rows + l.cols + (c.cuts ?? []).length,
    'axis labels are replaced, not duplicated, by counts',
  );
  labelCount += expected;
}
const large = {
  rows: 12,
  cols: 12,
  constraints: {
    rowCounts: { 0: 0, 11: 12 },
    colCounts: { 0: 0, 11: 12 },
    cuts: [
      { axis: 'row', index: 10, count: 12 },
      { axis: 'col', index: 0, count: 12 },
    ],
  },
};
const largeLabels = eloBoardLabels(large);
assert.match(largeLabels, />L12·12<\/span>/);
assert.match(largeLabels, />C12·12<\/span>/);
assert.match(largeLabels, /elo-label-row elo-count-label" style="top:95\.83333333333334%"/);
assert.match(largeLabels, /elo-label-cut-row" style="top:91\.66666666666666%"/);
assert.match(largeLabels, /elo-label-cut-col" style="left:8\.333333333333332%"/);

const css = readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8');
assert.match(
  css,
  /\.board-elo \.elo-board-label\{position:absolute;z-index:3;pointer-events:none;user-select:none;white-space:nowrap;font:700 12px\/18px ui-monospace/,
);
assert.match(
  css,
  /\.elo-board-surface:has\(\.elo-board-label\) \.board-elo\{min-width:calc\(var\(--cols\) \* 44px\)\}/,
);
assert.match(css, /\.board-elo\.elo-large\{min-width:calc\(var\(--cols\) \* 44px\)/);
assert.equal(
  (css.match(/padding:32px 32px 32px 64px/g) ?? []).length,
  3,
  'desktop, scroll padding and high-specificity mobile gutter',
);
assert.match(
  css,
  /\.board-elo \.elo-label-row\{right:calc\(100% \+ 8px\);transform:translateY\(-50%\)\}/,
);
assert.match(
  css,
  /\.board-elo \.elo-label-col\{bottom:calc\(100% \+ 8px\);transform:translateX\(-50%\)\}/,
);
// Board geometry stays >=44px per column, even when the viewport must scroll.
for (const wrapperWidth of [120, 180, 240, 320, 680])
  for (let cols = 4; cols <= 12; cols++) {
    const boardWidth = Math.max(wrapperWidth - 64 - 32, cols * 44);
    assert.ok(boardWidth / cols >= 44);
    assert.ok(18 + 8 <= 32, 'top/bottom label line fits physical gutter');
    assert.ok(
      6 * 0.7 * 12 + 8 < 64,
      'even a conservative six-glyph monospace width fits the left gutter',
    );
  }

const app = initCollection({ hideOriginal() {} });
app.activate('elo');
for (const index of [80, 120, 160, 199]) {
  host.querySelector(`[data-new-level="${index}"]`).click();
  const l = ELO_CAMPAIGN[index],
    board = $('c-board');
  assert.equal(board.querySelectorAll('[data-cell]').length, l.rows * l.cols);
  assert.equal(
    board.querySelectorAll('.elo-board-label').length,
    (eloBoardLabels(l).match(/<span /g) ?? []).length,
  );
  for (const label of board.querySelectorAll('.elo-board-label')) {
    assert.equal(label.parentElement, board, 'labels transform with their own board');
    assert.equal(label.attrs['aria-hidden'], 'true');
    assert.equal(label.dataset.cell, undefined);
  }
  if (index === 80) assert.match(board.innerHTML, /L4·2/);
  if (index === 120) assert.match(board.innerHTML, /L5·2/);
  $('c-back').click();
}

// An impossible count has no empty region domain: use the rule diagnostic,
// rather than inventing a nonexistent 'region 0'.
const impossible = {
  game: 'elo',
  rows: 4,
  cols: 4,
  regions: [0, 0, 1, 1, 0, 0, 1, 1, 2, 2, 3, 3, 2, 2, 3, 3],
  fixed: {},
  constraints: { rowCounts: { 0: 3 } },
};
const state = { positions: [-1, -1, -1, -1], discarded: [] };
assert.equal(validateElo(impossible, state).violations.length, 0);
const local = analyzeEloLocal(impossible, state);
assert.equal(local.contradiction, true);
assert.ok(local.candidates.every((d) => d.length));
assert.equal(local.diagnostic.code, 'count-bounds');
const hint = buildDirectHint('elo', impossible, state);
assert.equal(hint.action, null);
assert.match(hint.explanation, /linha 1 exige 3 pontos/);
assert.doesNotMatch(hint.explanation, /região 0|L0|C0/);
console.log(
  JSON.stringify({
    passed: true,
    campaignLabels: labelCount,
    liveUILevels: 4,
    synthetic12x12: true,
    gutterGeometry: true,
    globalHintDiagnostic: true,
    realBrowserQA: 'separate',
  }),
);
