// Testes e verificações de componentes compartilhados do Intuição.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CAMPAIGN } from '../dist/orbita/campaign.mjs';
import {
  projectOrbita,
  presentationBadges,
  presentationRingLabels,
} from '../dist/orbita/presentation-fit.mjs';
const before = JSON.stringify(CAMPAIGN);
let maxMobile = 0,
  maxDesktop = 0;
for (const width of [265, 335, 680])
  for (const level of CAMPAIGN) {
    const original = projectOrbita(level, width),
      p = projectOrbita(level, width, 280),
      badges = presentationBadges(p.level);
    assert.ok(p.minDistance >= 28, `${level.id} ${width} centers`);
    assert.ok(badges.valid);
    assert.ok(presentationRingLabels(p.level, badges).every((x) => !x.unplaced));
    assert.equal(p.level.layout.pieceRadius, 13);
    assert.equal(p.level.cells.length, level.cells.length);
    assert.ok(p.level.layout.height <= original.level.layout.height + 1);
    for (const cell of p.level.cells)
      assert.ok(
        cell.x >= 14 &&
          cell.y >= 14 &&
          cell.x <= p.level.layout.width - 14 &&
          cell.y <= p.level.layout.height - 14,
      );
    if (width === 265) maxMobile = Math.max(maxMobile, p.level.layout.height);
    if (width === 680) maxDesktop = Math.max(maxDesktop, p.level.layout.height);
  }
assert.equal(JSON.stringify(CAMPAIGN), before);
for (const [game, prefix] of [
  ['repasse', 'r'],
  ['orbita', 'o'],
]) {
  const src = readFileSync(new URL(`../dist/${game}/ui.mjs`, import.meta.url), 'utf8');
  assert.ok(
    src.includes(
      `host.querySelector('.${prefix}-board-navigation').after(host.querySelector('.level-actions'))`,
    ),
  );
  assert.match(src, new RegExp(`id="${prefix}-confirm"[^>]*hidden`));
}
console.log({ levels: 80, widths: 3, maxMobile, maxDesktop, unchangedCanonical: true });

const { CAMPAIGN: repasse } = await import('../dist/repasse/campaign.mjs');
const { initialState, replay } = await import('../dist/repasse/engine.mjs');
let maxGrid = 0;
for (const level of repasse) {
  const result = replay(level, level.solution);
  assert.ok(result.solved);
  for (const state of [initialState(level), ...result.steps.map((x) => x.state)]) {
    const digits = Math.max(
      ...state.values.map((x) => String(x).length),
      ...Object.values(state.boxes)
        .flat()
        .map((x) => String(x).length),
      ...Object.values(level.targets)
        .flat()
        .map((x) => String(x).length),
    );
    const cellMin = Math.max(44, digits * 10 + 12),
      width = level.cols * cellMin + 64 + (level.cols + 1) * 4;
    assert.ok(width <= 265, `${level.id}: ${width}px`);
    maxGrid = Math.max(maxGrid, width);
  }
}
console.log({ repasseLevels: repasse.length, maxGrid, minInteractive: 44, collector: 32 });
