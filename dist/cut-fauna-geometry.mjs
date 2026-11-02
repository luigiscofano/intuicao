// Consulta das máscaras da fauna e cálculo da área de cada recorte.
import { cutMasterShapes } from './cut-fauna-master-data.mjs';
// Partição exata da máscara original; somente figuras de fauna usam este caminho.
import { cutFaunaData } from './cut-fauna-data.mjs';
import { area, clipHalfPlane, cut } from './math.mjs';
import { curveValue, secondBound } from './curves.mjs';
const entries = new Map([...cutFaunaData.shapes, ...cutMasterShapes].map((s) => [s.id, s])),
  cache = new Map();
export const isFaunaShape = (id) => entries.has(id);
export function getFaunaGeometry(id) {
  if (cache.has(id)) return cache.get(id);
  const source = entries.get(id);
  if (!source) throw Error('Silhueta de fauna desconhecida');
  const { scale: k, x: tx, y: ty } = source.transform,
    point = ([x, y]) => ({ x: tx + x * k, y: ty + y * k });
  const pieces = source.rects.map(([x, y, w, h]) =>
    [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
    ].map(point),
  );
  const loops = source.loops.map((l) => l.map(point)),
    envelope = [
      [0, 0],
      [source.width, 0],
      [source.width, source.height],
      [0, source.height],
    ].map(point);
  const totalArea = source.pixelArea * k * k,
    path = loops.map((l) => 'M' + l.map((p) => `${p.x},${p.y}`).join('L') + 'Z').join('');
  const result = {
    id,
    source,
    pieces,
    loops,
    envelope,
    totalArea,
    path,
    removedArea: area(envelope) - totalArea,
  };
  cache.set(id, result);
  return result;
}
export function cutFaunaArea(id, config) {
  const geometry = getFaunaGeometry(id),
    {
      family = 'Reta',
      angle = 0,
      offset = 0,
      amplitude = 60,
      frequency = 1,
      centerX = 400,
      centerY = 230,
    } = config;
  const rad = (angle * Math.PI) / 180,
    n = { x: Math.cos(rad), y: Math.sin(rad) },
    t = { x: -n.y, y: n.x };
  let selectedArea = 0,
    errorArea = 0;
  if (family === 'Reta') {
    for (const p of geometry.pieces)
      selectedArea +=
        cut(p, angle, offset + n.x * (centerX - 400) + n.y * (centerY - 230)).ratio * area(p);
  } else {
    const prepared = geometry.pieces.map((poly) => {
      const local = poly.map((p) => ({
          x: t.x * (p.x - centerX) + t.y * (p.y - centerY),
          y: n.x * (p.x - centerX) + n.y * (p.y - centerY),
        })),
        lo = Math.min(...local.map((p) => p.x)),
        hi = Math.max(...local.map((p) => p.x)),
        M = secondBound(family, amplitude, frequency, Math.max(Math.abs(lo), Math.abs(hi)));
      return { local, lo, hi, M };
    });
    const cost = prepared.reduce((s, p) => s + (p.hi - p.lo) * p.M, 0),
      step = cost > 0 ? Math.min(1, Math.sqrt((0.0001 * geometry.totalArea * 8) / cost)) : 1;
    const value = (u) => offset + curveValue(u, family, amplitude, frequency);
    for (const { local, lo, hi, M } of prepared) {
      function visit(a, b, poly) {
        if (poly.length < 3 || b <= a) return;
        const fa = value(a),
          fb = value(b),
          e = (M * (b - a) ** 2) / 8;
        const ymin = Math.min(...poly.map((p) => p.y)),
          ymax = Math.max(...poly.map((p) => p.y));
        if (ymax <= Math.min(fa, fb) - e) {
          selectedArea += area(poly);
          return;
        }
        if (ymin >= Math.max(fa, fb) + e) return;
        if (b - a <= step) {
          const slope = (fb - fa) / (b - a);
          selectedArea += area(clipHalfPlane(poly, { x: -slope, y: 1 }, fa - slope * a));
          errorArea += (b - a) * e;
          return;
        }
        const mid = (a + b) / 2;
        visit(a, mid, clipHalfPlane(poly, { x: 1, y: 0 }, mid));
        visit(mid, b, clipHalfPlane(poly, { x: -1, y: 0 }, -mid));
      }
      visit(lo, hi, local);
    }
  }
  return {
    ratio: Math.max(0, Math.min(1, selectedArea / geometry.totalArea)),
    selectedArea,
    totalArea: geometry.totalArea,
    errorPP: (100 * errorArea) / geometry.totalArea,
    solidPieces: geometry.pieces,
    removedArea: geometry.removedArea,
  };
}
