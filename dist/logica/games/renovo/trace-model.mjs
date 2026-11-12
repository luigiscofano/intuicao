import { isTraceAllowed, visiblePieces } from './engine.mjs';
import { boardGeometry, cellCenter } from './geometry.mjs';

const finitePoint = point => Array.isArray(point) && point.length === 2 && point.every(Number.isFinite);
const near = (a, b, radius) => Math.abs(a[0] - b[0]) <= radius && Math.abs(a[1] - b[1]) <= radius;
export const traceHitRadius = level => boardGeometry(level).size * .42;

/** Estado efêmero do ponteiro. Não entra no histórico nem no armazenamento. */
export function startTrace(level, index) {
  if (!Number.isInteger(index) || !Object.hasOwn(level.pieces, index)) return null;
  return { path: [index], point: cellCenter(level, index), previewEnd: cellCenter(level, index), blocked: false };
}

export function moveTrace(level, previous, point) {
  if (!previous || !finitePoint(point)) return previous;
  const radius = traceHitRadius(level);
  const path = [...previous.path];
  // Voltar até a peça anterior desfaz apenas a rota provisória deste gesto.
  while (path.length > 1 && near(point, cellCenter(level, path.at(-2)), radius)) path.pop();
  const last = path.at(-1), origin = cellCenter(level, last);
  const base = { path, point: [...point], previewEnd: origin, blocked: false };
  if (near(point, origin, radius)) return base;
  if (path.length >= 3 || path.length === 2 && level.pieces[last] !== 'B') return base;
  const delta = [point[0] - origin[0], point[1] - origin[1]];
  const axis = Math.abs(delta[0]) >= Math.abs(delta[1]) ? 0 : 1;
  const sign = Math.sign(delta[axis]);
  if (!sign) return base;
  const next = visiblePieces(level, last).find(index => {
    const center = cellCenter(level, index);
    return center[1 - axis] === origin[1 - axis] && Math.sign(center[axis] - origin[axis]) === sign;
  });
  const geometry = boardGeometry(level);
  const edge = axis === 0
    ? (sign > 0 ? geometry.x0 + geometry.bw : geometry.x0)
    : (sign > 0 ? geometry.y0 + geometry.bh : geometry.y0);
  const limit = next === undefined ? edge : cellCenter(level, next)[axis];
  const projected = origin[axis] + sign * Math.min(Math.abs(delta[axis]), Math.abs(limit - origin[axis]));
  const previewEnd = [...origin]; previewEnd[axis] = projected;
  const candidate = next === undefined ? null : [...path, next];
  const allowed = candidate !== null && isTraceAllowed(level, candidate);
  const withinLane = Math.abs(delta[1 - axis]) <= radius;
  const reached = next !== undefined && Math.abs(delta[axis]) >= Math.abs(limit - origin[axis]) - radius;
  if (allowed && withinLane && reached) {
    return { path: candidate, point: [...point], previewEnd: cellCenter(level, next), blocked: false };
  }
  return { ...base, previewEnd, blocked: next !== undefined && reached && !allowed };
}

export function finishTrace(level, trace) {
  if (!trace || trace.blocked || !isTraceAllowed(level, trace.path)) return null;
  if (!near(trace.point, cellCenter(level, trace.path.at(-1)), traceHitRadius(level))) return null;
  return { type: 'trace', path: [...trace.path] };
}

export function tracePreviewMarkup(level, trace) {
  if (!trace) return '';
  const points = trace.path.map(index => cellCenter(level, index));
  points.push(trace.previewEnd);
  const start = points[0], end = trace.previewEnd;
  const d = points.map((point, i) => `${i ? 'L' : 'M'}${point[0]} ${point[1]}`).join(' ');
  return `<path class="renovo-trace-line" d="${d}" fill="none" stroke="#244b63" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/><circle cx="${start[0]}" cy="${start[1]}" r="31" fill="none" stroke="#244b63" stroke-width="2" stroke-dasharray="4 5"/><circle cx="${end[0]}" cy="${end[1]}" r="10" fill="#fffaf0" stroke="${trace.blocked ? '#8a4732' : '#244b63'}" stroke-width="2.5"/><circle cx="${end[0]}" cy="${end[1]}" r="3" fill="${trace.blocked ? '#8a4732' : '#244b63'}"/>`;
}
