// Testes e verificações de Corte certo.
import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { inflateSync } from 'node:zlib';
import { performance } from 'node:perf_hooks';
import { cutFaunaData } from '../dist/cut-fauna-data.mjs';
import { cutFaunaArea, getFaunaGeometry, isFaunaShape } from '../dist/cut-fauna-geometry.mjs';
import { cutFaunaLevels } from '../dist/cut-fauna-levels.mjs';
import { basicCutState } from '../dist/curves.mjs';
import { area } from '../dist/math.mjs';
const root = fileURLToPath(new URL('../', import.meta.url)),
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cut-fauna-oracle-'));
// Motor congelado anterior à integração: não exporta auxiliares na produção.
for (const name of ['curves.mjs', 'math.mjs'])
  fs.writeFileSync(
    path.join(tmp, name),
    execFileSync('git', ['show', `ff222574:dist/${name}`], { cwd: root }),
  );
fs.appendFileSync(path.join(tmp, 'curves.mjs'), '\nexport {cutSolid};\n');
const { cutSolid: oracle } = await import(pathToFileURL(path.join(tmp, 'curves.mjs')));
const report = {
  source: cutFaunaData.source,
  sha256: cutFaunaData.sha256,
  baselineCommit: 'ff222574',
  geometry: [],
  solutionCases: 0,
  randomCases: 0,
  maxDeltaPP: 0,
  maxErrorPP: 0,
  maxEvaluationMs: 0,
};
after(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
  if (process.env.CUT_FAUNA_WRITE_CERTS === '1')
    fs.writeFileSync(
      path.join(root, 'docs/cut-fauna-certificates.json'),
      JSON.stringify(report, null, 2) + '\n',
    );
});
// Decoder independente mínimo para o PNG indexado original (PNG filters0–4).
function decodePNG(bytes) {
  let pos = 8,
    w,
    h,
    depth,
    type,
    palette;
  const packed = [];
  while (pos < bytes.length) {
    const n = bytes.readUInt32BE(pos),
      kind = bytes.toString('ascii', pos + 4, pos + 8),
      data = bytes.subarray(pos + 8, pos + 8 + n);
    if (kind === 'IHDR') {
      w = data.readUInt32BE(0);
      h = data.readUInt32BE(4);
      depth = data[8];
      type = data[9];
      assert.equal(data[12], 0);
    }
    if (kind === 'PLTE') palette = data;
    if (kind === 'IDAT') packed.push(data);
    pos += n + 12;
  }
  assert.equal(type, 3);
  assert([1, 2, 4, 8].includes(depth));
  const stride = Math.ceil((w * depth) / 8),
    raw = inflateSync(Buffer.concat(packed)),
    rows = Buffer.alloc(stride * h);
  let p = 0;
  for (let y = 0; y < h; y++) {
    const filter = raw[p++];
    for (let x = 0; x < stride; x++) {
      const a = x ? rows[y * stride + x - 1] : 0,
        b = y ? rows[(y - 1) * stride + x] : 0,
        c = x && y ? rows[(y - 1) * stride + x - 1] : 0;
      let predict = 0;
      if (filter === 1) predict = a;
      else if (filter === 2) predict = b;
      else if (filter === 3) predict = Math.floor((a + b) / 2);
      else if (filter === 4) {
        const v = a + b - c,
          pa = Math.abs(v - a),
          pb = Math.abs(v - b),
          pc = Math.abs(v - c);
        predict = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      } else assert.equal(filter, 0);
      rows[y * stride + x] = (raw[p++] + predict) & 255;
    }
  }
  return {
    w,
    h,
    rgb(x, y) {
      const idx =
        (rows[y * stride + Math.floor((x * depth) / 8)] >> (8 - depth - ((x * depth) % 8))) &
        ((1 << depth) - 1);
      return [...palette.subarray(idx * 3, idx * 3 + 3)];
    },
  };
}
const bytes = fs.readFileSync(path.join(root, 'dist', cutFaunaData.source)),
  png = decodePNG(bytes);
test('Fonte original íntegra e exatamente duas cores', () => {
  assert.equal(createHash('sha256').update(bytes).digest('hex'), cutFaunaData.sha256);
  const colors = new Set();
  for (let y = 0; y < png.h; y++)
    for (let x = 0; x < png.w; x++) colors.add(png.rgb(x, y).join(','));
  assert.deepEqual([...colors].sort(), ['255,255,255', '29,102,88']);
});
function signed(loop) {
  return (
    loop.reduce((s, a, i) => {
      const b = loop[(i + 1) % loop.length];
      return s + a[0] * b[1] - b[0] * a[1];
    }, 0) / 2
  );
}
for (const [i, s] of cutFaunaData.shapes.entries())
  test(`Máscara e certificado ${46 + i}: ${s.animal}`, () => {
    const [cx, cy, w, h] = s.crop,
      mask = new Uint8Array(w * h),
      rectMask = new Uint8Array(w * h),
      loopMask = new Uint8Array(w * h);
    let count = 0;
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        let green = png.rgb(cx + x, cy + y).join(',') === '29,102,88';
        if (s.animal === 'tucano' && x + 0.5 >= 0.78 * w && y + 0.5 >= 0.355 * h) green = false;
        if (s.animal === 'tamandua' && x + 0.5 < 0.109 * w && y + 0.5 < 0.19 * h) green = false;
        mask[y * w + x] = +green;
        count += +green;
      }
    for (const [x, y, rw, rh] of s.rects)
      for (let yy = y; yy < y + rh; yy++)
        for (let xx = x; xx < x + rw; xx++) {
          assert.equal(rectMask[yy * w + xx], 0, 'partes não se sobrepõem');
          rectMask[yy * w + xx] = 1;
        }
    for (const loop of s.loops)
      for (let j = 0; j < loop.length; j++) {
        const [ax, ay] = loop[j],
          [bx, by] = loop[(j + 1) % loop.length];
        if (ax !== bx) continue;
        for (let y = Math.min(ay, by); y < Math.max(ay, by); y++)
          for (let x = 0; x < ax; x++) loopMask[y * w + x] ^= 1;
      }
    assert.equal(count, s.pixelArea);
    assert.deepEqual(rectMask, mask);
    assert.deepEqual(loopMask, mask);
    assert.equal(
      s.loops.reduce((a, l) => a + signed(l), 0),
      count,
    );
    assert.equal(s.loops.filter((l) => signed(l) > 0).length, s.outerLoops);
    assert.equal(s.loops.filter((l) => signed(l) < 0).length, s.holeLoops);
    const g = getFaunaGeometry(s.id),
      l = cutFaunaLevels[i];
    assert.equal(l.number, 46 + i);
    assert(Math.abs(g.pieces.reduce((a, p) => a + area(p), 0) - g.totalArea) < 1e-6);
    let maxErrorPP = 0;
    for (const travel of [
      l.initialTravel,
      Math.round(l.solutionTravel) - 2,
      Math.round(l.solutionTravel),
      Math.round(l.solutionTravel) + 2,
    ]) {
      const state = basicCutState(l, travel),
        before = JSON.stringify(state),
        r = cutFaunaArea(s.id, state);
      assert.equal(JSON.stringify(state), before);
      assert(r.errorPP <= 0.01);
      if (travel === l.initialTravel) assert(Math.abs(100 * r.ratio - l.target) > 3);
      else assert(Math.abs(100 * r.ratio - l.target) <= 3);
      let reference = 0,
        bound = 0;
      for (const p of g.pieces) {
        const q = oracle(p, state),
          a = area(p);
        reference += q.ratio * a;
        bound += q.errorPP * a;
      }
      const delta = Math.abs(100 * (reference / g.totalArea - r.ratio));
      assert(delta <= bound / g.totalArea + r.errorPP + 1e-7);
      report.maxDeltaPP = Math.max(report.maxDeltaPP, delta);
      maxErrorPP = Math.max(maxErrorPP, r.errorPP);
      report.solutionCases++;
    }
    report.geometry.push({
      id: s.id,
      pixelArea: count,
      rectangles: s.rects.length,
      outerLoops: s.outerLoops,
      holeLoops: s.holeLoops,
      sourceRasterMatches: true,
      rectangleRasterMatches: true,
      evenoddRasterMatches: true,
      signedLoopArea: count,
      certificate: l.certificate,
      maxErrorPP,
    });
  });
test('600 estados de controles: valores finitos, conservação e erro certificado', () => {
  let seed = 20261031;
  const random = () => (seed = (1664525 * seed + 1013904223) >>> 0) / 2 ** 32,
    families = ['Reta', 'Parábola', 'Seno', 'Cúbica', 'Cosseno', 'Dupla curva'];
  for (let i = 0; i < 600; i++) {
    const s = cutFaunaData.shapes[i % 15],
      state = {
        family: families[i % 6],
        angle: i < 12 ? i * 90 : random() * 360,
        offset: i % 20 === 0 ? 600 : random() * 1200 - 600,
        amplitude: i % 17 === 0 ? -120 : random() * 240 - 120,
        frequency: i % 2 ? 2 : 0.5,
        centerX: random() * 1600 - 400,
        centerY: random() * 1260 - 400,
      };
    const start = performance.now(),
      r = cutFaunaArea(s.id, state),
      ms = performance.now() - start;
    for (const key of ['ratio', 'errorPP', 'selectedArea', 'totalArea'])
      assert(Number.isFinite(r[key]), key);
    assert(r.ratio >= 0 && r.ratio <= 1);
    assert(r.errorPP >= 0 && r.errorPP <= 0.010001);
    assert(r.selectedArea >= -1e-6 && r.selectedArea <= r.totalArea + 1e-6);
    assert(ms < 1000, 'avaliação não deve bloquear por um segundo');
    report.maxErrorPP = Math.max(report.maxErrorPP, r.errorPP);
    report.maxEvaluationMs = Math.max(report.maxEvaluationMs, ms);
    report.randomCases++;
  }
});
test('Identificador desconhecido rejeitado', () => {
  assert(!isFaunaShape('unknown'));
  assert.throws(() => getFaunaGeometry('unknown'));
  assert.throws(() => cutFaunaArea('unknown', {}));
});
