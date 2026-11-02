// Testes e verificações de componentes compartilhados do Intuição.
import { restoreSoftCornerCSS } from './soft-corner-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const read = (p) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const m = JSON.parse(read('./hero-frame-curves-authorized-change.json'));
const continuousFrame = JSON.parse(read('./continuous-frame-authorized-change.json'));
const crownPaint = JSON.parse(read('./top-crown-paint-authorized-change.json'));
const css = restoreSoftCornerCSS(read('../dist/platform.css'))
  .replace(crownPaint.css_insertion, '')
  .replace(continuousFrame.css_after, continuousFrame.css_before);
assert.equal(sha(css), m.afterCssSHA256);
assert.equal(css.split(m.css_insertion).length - 1, 1);
assert.equal(
  sha(css.replace(m.css_insertion, '')),
  m.priorCssSHA256,
  'Every previous rule, including roots and header, byte-identical',
);
assert.match(
  m.css_insertion,
  /:is\(#selection, #collection > \.level-screen\)::before\{content:none\}/,
);
assert.match(m.css_insertion, /#main > \.intro::after/);
assert.match(m.css_insertion, /background-color:#fff/);
assert.match(m.css_insertion, /pointer-events:none/);
assert.match(m.css_insertion, /z-index:-1/);
assert.ok(
  !/padding:|margin:|border:|body > header|body > footer|platform-leaf/.test(m.css_insertion),
);
for (const a of m.assets) {
  const svg = read('../dist/platform-assets/' + a.file);
  assert.equal(sha(svg), a.sha256);
  assert.match(svg, /fill="#fff"/);
  assert.match(svg, /stroke-width="1"/);
  assert.match(svg, /vector-effect="non-scaling-stroke"/);
}
for (const w of [320, 390, 760, 761, 1024, 1280, 1430, 1920, 2560]) {
  const mobile = w <= 760,
    main = Math.min(w, 1280),
    padding = mobile ? 16 : 40,
    overhang = mobile ? 8 : 24,
    flare = mobile ? 6 : Math.max(14, (w - 1280) / 2 + 4);
  assert.ok((w - main) / 2 + padding - overhang - flare >= 0, 'Hero curves fit viewport ' + w);
}
console.log(
  'PASS exact hero-only upper curves, white interior, unchanged roots/header/game styles and structural mobile gutters. Live visual QA separate.',
);
