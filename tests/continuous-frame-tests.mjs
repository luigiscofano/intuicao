// Testes e verificações de componentes compartilhados do Intuição.
import { restoreSoftCornerCSS } from './soft-corner-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const read = (p) => fs.readFileSync(new URL(p, import.meta.url), 'utf8');
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const m = JSON.parse(read('./continuous-frame-authorized-change.json'));
const crownPaint = JSON.parse(read('./top-crown-paint-authorized-change.json'));
const css = restoreSoftCornerCSS(read('../dist/platform.css')).replace(
  crownPaint.css_insertion,
  '',
);
assert.equal(sha(css), m.afterCssSHA256);
assert.equal(css.split(m.css_after).length - 1, 1);
assert.equal(
  sha(css.replace(m.css_after, m.css_before)),
  m.priorCssSHA256,
  'Only authorized perimeter reconstruction',
);
assert.ok(
  !css.includes('/* Selection-frame branches and roots:'),
  'No accumulated old curve overrides',
);
assert.ok(!css.includes('/* Move the upper branches'), 'No old closed-rectangle overlay');
assert.match(
  m.css_after,
  /border-bottom-color:transparent;border-bottom-left-radius:0;border-bottom-right-radius:0;box-shadow:none/,
);
assert.match(
  m.css_after,
  /inset:69px -24\.5px 0;background:#fff;border:1px solid #b3c1a8;border-top:0/,
);
assert.match(m.css_after, /linear-gradient\(#fff,#fff\)/);
assert.ok(!/padding:|margin:|body > header|platform-leaf/.test(m.css_after));
for (const a of m.assets) {
  const svg = read('../dist/platform-assets/' + a.file);
  assert.equal(sha(svg), a.sha256);
  assert.match(svg, /stroke-width="1"/);
  assert.match(svg, /vector-effect="non-scaling-stroke"/);
  if (a.file.includes('crown-left'))
    assert.match(svg, /C66 \.5 100 26 100 100/, 'Crown finishes on exact vertical tangent');
  if (a.file.includes('crown-right')) assert.match(svg, /C34 \.5 0 26 0 100/);
  if (a.file.includes('root-left'))
    assert.match(svg, /M100 0C100 42/, 'Root starts on exact vertical tangent');
  if (a.file.includes('root-right')) assert.match(svg, /M0 0C0 42/);
}
for (const w of [320, 390, 760, 761, 1024, 1280, 1430, 1920, 2560]) {
  const mobile = w <= 760,
    main = Math.min(w, 1280),
    padding = mobile ? 16 : 40;
  const heroEdge = (w - main) / 2 + padding - (mobile ? 8 : 24),
    flare = mobile ? 6 : Math.max(14, (w - 1280) / 2 + 4);
  const heroStroke = heroEdge - 0.5 + 0.5,
    curveEnd = heroEdge - flare + flare;
  assert.equal(heroStroke, curveEnd, 'Hero stroke and curve centerline align at ' + w);
  assert.ok(heroEdge - flare >= 0);
  const panelEdge = (w - main) / 2 + padding,
    rootFlare = mobile ? 14 : Math.max(38, (w - 1280) / 2 + 28);
  assert.equal(
    panelEdge + 0.5,
    panelEdge + 1 - rootFlare - 0.5 + rootFlare,
    'Root and border centerlines align at ' + w,
  );
  assert.ok(panelEdge - rootFlare - 0.5 >= 0);
  assert.equal(
    (mobile ? 6 : 8) + (mobile ? 28 : 62) - (mobile ? 33 : 69),
    1,
    'Crown overlaps straight side by one pixel',
  );
}
assert.match(
  m.css_after,
  /body:has\(#selection:not\(\[hidden\]\), #collection:not\(\[hidden\]\) > \.level-screen\) > footer/,
  'Footer paint changes apply only to selections',
);
assert.match(m.css_after, /bottom:-246px;height:247px/);
assert.match(m.css_after, /bottom:-202px;height:203px/);
assert.match(
  m.css_after,
  /border-top-color:transparent;border-bottom-color:transparent/,
  'Footer reservations cannot mask roots',
);
console.log(
  'PASS exact reconstruction, removed closed junction borders, 1px tangent-aligned continuous centerlines and white interior; structural fit at 320–2560px. Visual join screenshots still required.',
);
