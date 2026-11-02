// Testes e verificações de Corte certo.
import assert from 'node:assert/strict';
import { area } from '../dist/math.mjs';
import { regionGeometry, curvedCut, basicCutState, shapePolygon } from '../dist/curves.mjs';
import { cutLevels } from '../dist/levels.mjs';
const rect = (x, y, w, h) => [
  { x, y },
  { x: x + w, y },
  { x: x + w, y: y + h },
  { x, y: y + h },
];
const near = (a, b, e = 1e-7) => assert.ok(Math.abs(a - b) < e, `${a} != ${b}`);
const box = rect(0, 0, 10, 10),
  cases = [
    ['outside', [rect(20, 20, 5, 5)], 100],
    ['clipped', [rect(5, 5, 10, 10)], 75],
    ['overlap', [rect(0, 0, 5, 10), rect(2, 0, 5, 10)], 30],
    ['duplicate', [rect(2, 2, 3, 3), rect(2, 2, 3, 3)], 91],
    ['nested', [rect(2, 2, 6, 6), rect(3, 3, 2, 2)], 64],
    ['touch', [rect(0, 0, 5, 5), rect(5, 0, 5, 5)], 50],
    [
      'concave',
      [
        [
          { x: 1, y: 1 },
          { x: 7, y: 1 },
          { x: 7, y: 3 },
          { x: 3, y: 3 },
          { x: 3, y: 7 },
          { x: 1, y: 7 },
        ],
      ],
      80,
    ],
  ];
for (const [name, holes, expected] of cases) {
  near(regionGeometry(box, holes).totalArea, expected);
  const reversed = holes.map((h) => h.slice().reverse());
  near(regionGeometry(box.slice().reverse(), reversed).totalArea, expected);
  const transform = (p) => ({
    x: 124 + (p.x * 0.6 - p.y * 0.8) * 3,
    y: -35 + (p.x * 0.8 + p.y * 0.6) * 3,
  });
  near(
    regionGeometry(
      box.map(transform),
      holes.map((h) => h.map(transform)),
    ).totalArea,
    expected * 9,
    1e-6,
  );
  for (let x = -2; x <= 12; x += 0.5) {
    const c = { family: 'Reta', angle: 0, offset: 0, centerX: x, centerY: 0, holes };
    const left = curvedCut(box, c),
      right = curvedCut(box, { ...c, angle: 180 });
    near(left.selectedArea + right.selectedArea, expected, 1e-6);
    assert.ok(left.selectedArea >= -1e-8 && left.selectedArea <= expected + 1e-8);
  }
  console.log('PASS', name);
}
let maxError = 0,
  minRemoved = 1,
  maxRemoved = 0,
  minRemain = 1,
  holesCount = 0,
  edgeCount = 0;
const quotas = [0, 0, 0, 0, 0];
for (const [i, l] of cutLevels.entries()) {
  const poly = shapePolygon(l.shape),
    g = regionGeometry(poly, l.holes ?? []);
  minRemain = Math.min(minRemain, g.totalArea / g.outerArea);
  assert.ok(g.totalArea / g.outerArea > 0.6);
  if (l.holes?.length) {
    holesCount++;
    quotas[Math.floor(i / 20)]++;
    const fraction = g.removedArea / g.outerArea;
    minRemoved = Math.min(minRemoved, fraction);
    maxRemoved = Math.max(maxRemoved, fraction);
    if (l.holes.some((h) => regionGeometry(poly, [h]).removedArea < area(h) - 1)) edgeCount++;
  }
  const a = curvedCut(poly, basicCutState(l, l.basicMin)),
    b = curvedCut(poly, basicCutState(l, l.basicMax));
  near(a.ratio, 0, 1e-6);
  near(b.ratio, 1, 1e-6);
  if (Number.isFinite(l.solutionTravel)) {
    const r = curvedCut(poly, basicCutState(l, l.solutionTravel));
    maxError = Math.max(maxError, Math.abs(r.ratio * 100 - l.target));
    assert.ok(Math.abs(r.ratio * 100 - l.target) < 0.03);
    assert.ok(r.errorPP <= 0.010001);
  }
  assert.equal(l.id, `corte-v2-${i + 1}`);
}
console.log(
  JSON.stringify({
    levels: cutLevels.length,
    holesCount,
    quotas,
    edgeCount,
    minRemoved,
    maxRemoved,
    minRemain,
    maxError,
  }),
);
// Independente do recorte: integra amostras do domínio sólido e curva por células.
const pointIn = (p, poly) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i],
      b = poly[j];
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x)
      inside = !inside;
  }
  return inside;
};
const irregular = [
  { x: 1, y: 1 },
  { x: 8, y: 1 },
  { x: 8, y: 3 },
  { x: 3, y: 3 },
  { x: 3, y: 8 },
  { x: 1, y: 8 },
];
const hs = [irregular, rect(2, 2, 6, 5), rect(8, -1, 4, 5)];
const truth = regionGeometry(box, hs);
let sampled = 0;
for (let x = 0.0125; x < 10; x += 0.025)
  for (let y = 0.0125; y < 10; y += 0.025)
    if (!hs.some((h) => pointIn({ x, y }, h))) sampled += 0.025 ** 2;
near(sampled, truth.totalArea, 0.01);
console.log('PASS independent union raster area', sampled, truth.totalArea);
for (const l of cutLevels) {
  const result = curvedCut(
    shapePolygon(l.shape),
    basicCutState(l, Math.round(l.solutionTravel * 10) / 10),
  );
  assert.ok(Math.abs(result.ratio * 100 - l.target) < 0.031);
}
console.log('PASS all 100 solutions remain valid on 0.1-unit slider grid');
let initialMin = 100,
  initialMax = 0;
for (const l of cutLevels) {
  const percent = 100 * curvedCut(shapePolygon(l.shape), basicCutState(l)).ratio;
  const difference = Math.abs(percent - l.target);
  assert.ok(difference >= 17.9 && difference <= 24.1);
  assert.ok(percent >= 10 && percent <= 90);
  initialMin = Math.min(initialMin, difference);
  initialMax = Math.max(initialMax, difference);
}
console.log('PASS all 100 initial states are non-solutions', initialMin, initialMax);
