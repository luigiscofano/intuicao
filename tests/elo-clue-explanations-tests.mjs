// Testes e verificações de ELO.
/** Pure presentation regression: public clues explain themselves without reading play state or answers. */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as presentation from '../dist/elo-presentation.mjs';
import { ELO_CAMPAIGN } from '../dist/elo-campaign.mjs';

const { eloActiveMechanics, eloLegendMarkup } = presentation;
const colors = ['#123456', '#abcdef', '#ffeedd'];
const baselineSource = execFileSync('git', ['show', '0866506:dist/elo-presentation.mjs'], {
  cwd: fileURLToPath(new URL('..', import.meta.url)),
  encoding: 'utf8',
});
const legacy = await import(
  `data:text/javascript;base64,${Buffer.from(baselineSource).toString('base64')}`
);
assert.deepEqual(
  Object.keys(presentation),
  Object.keys(legacy),
  'no added or removed presentation exports',
);

const fixture = {
  game: 'elo',
  id: 'elo-nine-family-explanations',
  rows: 5,
  cols: 5,
  regions: Array.from({ length: 25 }, (_, i) => (i % 5 < 2 ? 0 : 1) + (i < 10 ? 0 : 2)),
  fixed: { 0: 0 },
  constraints: {
    shapes: { 0: 'turn', 1: 'straight' },
    passages: [2],
    forbiddenEdges: [[6, 7]],
    rowCounts: { 0: 1, 4: 0 },
    colCounts: { 0: 1, 4: 2 },
    distances: { 0: 8, 1: 1 },
    neighbors: [[0, 1]],
    order: [0, 1, 3, 2],
    cuts: [
      { axis: 'row', index: 1, count: 1 },
      { axis: 'col', index: 2, count: 0 },
    ],
    exclusivePassages: [
      { id: 'X', cells: [14, 12] },
      { id: 'Y', cells: [21, 23] },
    ],
  },
};
assert.equal(eloActiveMechanics(fixture).length, 9);

const explanationPattern = /<span id="([^"]+)" class="elo-clue-explanation"([^>]*)>(.*?)<\/span>/gs;
const explanationNodes = (html) =>
  [...html.matchAll(explanationPattern)].map(([, id, attrs, text]) => ({ id, attrs, text }));
const withoutAdditions = (html) =>
  html
    .replace(explanationPattern, '')
    .replace(/<button id="c-elo-explanations-toggle"[^>]*>.*?<\/button>/gs, '');
const visibleText = (html) =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
function verifyLegacy(l) {
  const oldMarkup = legacy.eloLegendMarkup(l, colors),
    oldText = visibleText(oldMarkup);
  for (const show of [true, false]) {
    const markup = eloLegendMarkup(l, colors, show);
    assert.equal(
      visibleText(withoutAdditions(markup)),
      oldText,
      `${l.id ?? 'fixture'} keeps every original code, symbol, and line when ${show ? 'shown' : 'hidden'}`,
    );
    for (const [, title] of oldMarkup.matchAll(/ title="([^"]*)"/g))
      assert.ok(markup.includes(` title="${title}"`), 'regional titles are preserved');
  }
}
function verifyControls(l) {
  const shown = eloLegendMarkup(l, colors),
    hidden = eloLegendMarkup(l, colors, false),
    nodes = explanationNodes(shown),
    collapsed = explanationNodes(hidden);
  if (!eloActiveMechanics(l).length) {
    assert.equal(shown, '');
    assert.equal(hidden, '');
    return 0;
  }
  assert.ok(nodes.length > 0, 'all nonclassical levels have explanations');
  assert.equal((shown.match(/id="c-elo-explanations-toggle"/g) ?? []).length, 1, 'one toggle');
  assert.match(shown, /<section id="c-elo-clue-legend" class="elo-clue-legend"/);
  assert.match(
    shown,
    /<button id="c-elo-explanations-toggle" type="button" aria-expanded="true" aria-controls="[^"]+">Ocultar explicações<\/button>/,
  );
  assert.match(
    hidden,
    /<button id="c-elo-explanations-toggle" type="button" aria-expanded="false" aria-controls="[^"]+">Mostrar explicações<\/button>/,
  );
  const ids = nodes.map((n) => n.id),
    allIds = [...shown.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(allIds).size, allIds.length, 'every HTML ID is unique');
  assert.deepEqual(
    shown.match(/aria-controls="([^"]+)"/)[1].split(' '),
    ids,
    'the toggle controls every explanation in order',
  );
  assert.deepEqual(
    hidden.match(/aria-controls="([^"]+)"/)[1].split(' '),
    ids,
    'hidden and visible states control the same nodes',
  );
  assert.deepEqual(
    collapsed.map((n) => n.id),
    ids,
    'IDs remain stable when toggling',
  );
  assert.deepEqual(
    explanationNodes(eloLegendMarkup(l, colors)).map((n) => n.id),
    ids,
    'IDs remain stable on repeated rendering',
  );
  for (const node of nodes) {
    assert.doesNotMatch(node.attrs, /\bhidden\b/, 'explanations default to visible');
    assert.ok(node.text.trim());
  }
  for (const node of collapsed)
    assert.match(
      node.attrs,
      /(?:^|\s)hidden(?:\s|$)/,
      'collapsed explanations have the native hidden attribute',
    );
  assert.deepEqual(
    collapsed.map((n) => n.text),
    nodes.map((n) => n.text),
    'toggling never changes explanatory content',
  );
  for (const [, item] of shown.matchAll(/<li(?: [^>]*)?>(.*?)<\/li>/gs))
    assert.equal(
      explanationNodes(item).length,
      1,
      'every original clue item has its own adjacent explanation',
    );
  return nodes.length;
}

verifyLegacy(fixture);
verifyControls(fixture);
const html = eloLegendMarkup(fixture, colors);
const get = (key) =>
  explanationNodes(html).find((n) => n.id === `c-elo-clue-${key}-explanation`)?.text;
assert.match(get('region-0'), /região A.*uma ligação horizontal e outra vertical, perpendiculares/);
assert.match(
  get('region-1'),
  /direções opostas, ambas na horizontal ou ambas na vertical/,
  'a straight clue does not require horizontal orientation',
);
assert.match(
  get('region-0'),
  /comprimento das duas ligações.*exatamente 8 intervalos entre centros de casas/,
);
assert.match(get('region-0'), /de C2 a C5 são 3 intervalos/);
assert.match(get('region-1'), /exatamente 1 intervalo entre centros/);
assert.match(get('region-0'), /Não é o tamanho de cada ligação separadamente/);
assert.match(get('passages'), /L1C3.*sem ponto.*centro atravessado pelo interior de uma ligação/);
assert.match(get('passages'), /Passar ao lado não vale/);
assert.match(get('forbidden-edges'), /intervalos entre os centros de L2C2 e L2C3/);
assert.match(get('forbidden-edges'), /não bloqueia as casas nas extremidades/);
assert.match(get('counts'), /Na linha L1, deve haver exatamente 1 ponto\./);
assert.match(get('counts'), /Na linha L5, deve haver exatamente 0 pontos\./);
assert.match(get('counts'), /Na coluna C1, deve haver exatamente 1 ponto\./);
assert.match(get('counts'), /Na coluna C5, deve haver exatamente 2 pontos\./);
assert.match(get('counts'), /pontos fixos também entram/);
assert.match(get('counts'), /Zero significa que não pode haver nenhum ponto/);
assert.match(get('neighbors'), /região A.*diretamente ao ponto da região B/);
assert.match(get('neighbors'), /Não pode haver outro ponto entre os dois na mesma linha ou coluna/);
assert.match(get('neighbors'), /não precisam compartilhar uma fronteira/);
assert.match(get('order'), /A → B → D → C.*ordem relativa/);
assert.match(get('order'), /outras regiões entre esses marcos/);
assert.match(get('order'), /qualquer marco \(rotacionar a sequência\).*sentido inverso/);
assert.match(get('order'), /Não é a ordem de colocar os pontos nem exige ligações diretas/);
assert.match(get('cuts'), /Entre as linhas L2 e L3, exatamente 1 ligação deve cruzar/);
assert.match(get('cuts'), /Entre as colunas C3 e C4, exatamente 0 ligações devem cruzar/);
assert.match(get('cuts'), /Conte ligações, não pontos nem casas/);
assert.match(get('exclusive-0'), /grupo X.*L3C5, L3C3.*sem ponto/);
assert.match(
  get('exclusive-0'),
  /Exatamente uma dessas casas.*centro atravessado pelo interior de uma ligação/,
);
assert.match(get('exclusive-0'), /as demais não podem ter o centro atravessado/);
assert.match(
  get('exclusive-0'),
  /Nem zero nem duas casas.*única ligação que atravesse duas casas do mesmo grupo viola/,
);
assert.match(get('exclusive-1'), /grupo Y.*L5C2, L5C4/);

const large = {
  game: 'elo',
  id: 'elo-12x12-AA',
  rows: 12,
  cols: 12,
  regions: Array.from({ length: 144 }, (_, i) => i % 27),
  fixed: {},
  constraints: {
    shapes: { 26: 'straight' },
    distances: { 26: 12 },
    passages: [143],
    forbiddenEdges: [[142, 143]],
    rowCounts: { 11: 0 },
    colCounts: { 11: 1 },
    neighbors: [[26, 0]],
    order: [26, 0, 1],
    cuts: [
      { axis: 'row', index: 10, count: 1 },
      { axis: 'col', index: 10, count: 2 },
    ],
    exclusivePassages: [{ id: 'AA', cells: [132, 143] }],
  },
};
verifyLegacy(large);
verifyControls(large);
const largeHTML = eloLegendMarkup(large, colors);
for (const phrase of [
  'Região AA',
  'L12C12',
  'L12C11–L12C12',
  'AA—A',
  'AA → A → B',
  'L11|L12 = 1',
  'C11|C12 = 2',
  'linha L12',
  'coluna C12',
  'região AA',
])
  assert.ok(largeHTML.includes(phrase), phrase);

const hostile = structuredClone(fixture);
hostile.id = 'elo-group-escaping';
hostile.constraints.exclusivePassages = [
  { id: '<img src=x onerror="boom()">&\'X', cells: [0, 1] },
  { id: '<img src=x onerror="boom()">&\'X', cells: [2, 3] },
];
const hostileHTML = eloLegendMarkup(hostile, colors);
assert.doesNotMatch(
  hostileHTML,
  /<img|<script|id="[^"]*(?:img|boom)/,
  'group labels cannot create markup or affect IDs',
);
assert.match(hostileHTML, /&lt;img src=x onerror=&quot;boom\(\)&quot;&gt;&amp;&#39;X/);
verifyLegacy(hostile);
verifyControls(hostile);

const guarded = structuredClone(fixture);
for (const key of [
  'solution',
  'profile',
  'solver',
  'state',
  'positions',
  'discarded',
  'logicIdea',
  'reasoningTrace',
  'uniqueness',
])
  Object.defineProperty(guarded, key, {
    get() {
      throw new Error(`Private field read: ${key}`);
    },
  });
assert.doesNotThrow(() => eloLegendMarkup(guarded, colors));
assert.doesNotThrow(() => eloLegendMarkup(guarded, colors, false));
assert.equal(
  eloLegendMarkup(guarded, colors),
  html,
  'private fields cannot affect the public explanations',
);
const before = JSON.stringify(fixture);
eloLegendMarkup(fixture, colors);
eloLegendMarkup(fixture, colors, false);
assert.equal(JSON.stringify(fixture), before, 'rendering cannot change the level');

assert.equal(ELO_CAMPAIGN.length, 200);
let totalExplanations = 0;
for (const level of ELO_CAMPAIGN) {
  verifyLegacy(level);
  totalExplanations += verifyControls(level);
  const publicOnly = {
    rows: level.rows,
    cols: level.cols,
    regions: level.regions,
    constraints: level.constraints,
  };
  for (const key of ['solution', 'profile', 'solver', 'state', 'logicIdea', 'reasoningTrace'])
    Object.defineProperty(publicOnly, key, {
      get() {
        throw new Error(`${level.id}: private ${key}`);
      },
    });
  assert.equal(
    eloLegendMarkup(publicOnly, colors),
    eloLegendMarkup(level, colors),
    `${level.id}: explanations depend only on public dimensions, regions, and constraints`,
  );
}
console.log(
  JSON.stringify({
    passed: true,
    campaignLevels: ELO_CAMPAIGN.length,
    totalExplanations,
    families: 9,
    legacyRef: '0866506',
    defaultVisible: true,
    uniqueStableIds: true,
    zeroAndSingular: true,
    large12x12AndAA: true,
    groupEscaping: true,
    privateGettersUntouched: true,
  }),
);
