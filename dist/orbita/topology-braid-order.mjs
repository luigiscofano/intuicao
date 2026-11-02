// Geometria dos encontros transversais de dois anéis com ordens distintas.
/** Six genuine transverse meetings: A visits012345; B visits012543.
 * Inside arcs pair01,25,43; outside arcs pair12,54,30. Both matchings are
 * noncrossing; their union is a single simple closed orbit, not a mirrored cycle.
 */
import { validateGeometryV2 } from './topology-v2.mjs';
export function createOrderedBraidTopology({ variant = 0 } = {}) {
  const TAU = Math.PI * 2,
    angle = (i) => (i * TAU) / 6,
    polar = (a, r) => ({ x: 500 + r * Math.cos(a), y: 500 + r * Math.sin(a) });
  const cells = Array.from({ length: 6 }, (_, i) => ({
    id: 'j' + i,
    ...polar(angle(i), 200),
    rings: ['A', 'B'],
  }));
  const A = [],
    B = [],
    order = [0, 1, 2, 5, 4, 3],
    radii = [150, 260, 70, 260, 150, 350],
    spans = [1, 1, 3, -1, -1, 3];
  for (let i = 0; i < 48; i++) {
    const p = polar((i * TAU) / 48, 200),
      junction = i % 8 === 0 ? 'j' + i / 8 : null,
      exclusive =
        i % 8 === 4 &&
        ([0, 3].includes((i / 8) | 0) || (Math.imul(variant + 1, 73) >>> (((i / 8) | 0) + 2)) & 1)
          ? 'a' + i
          : null;
    const cell = junction ?? exclusive;
    if (exclusive) cells.push({ id: cell, ...p, rings: ['A'] });
    A.push({ ...p, ...(cell ? { cell } : {}) });
  }
  for (let k = 0; k < 6; k++) {
    const from = order[k],
      span = spans[k],
      parts = Math.abs(span) * 12;
    for (let t = 0; t < parts; t++) {
      const f = t / parts,
        a = angle(from) + ((span * TAU) / 6) * f,
        r = 200 + (radii[k] - 200) * Math.sin(Math.PI * f),
        p = polar(a, r);
      const cell =
        t === 0
          ? 'j' + from
          : t === parts / 2 && ([0, 3].includes(k) || (Math.imul(variant + 1, 191) >> (k + 3)) & 1)
            ? 'b' + k
            : null;
      if (cell?.startsWith('b')) cells.push({ id: cell, ...p, rings: ['B'] });
      B.push({ ...p, ...(cell ? { cell } : {}) });
    }
  }
  const rings = [
    {
      id: 'A',
      path: A,
      cells: A.filter((p) => p.cell).map((p) => p.cell),
      step: 1,
      labelPosition: { x: 500, y: 420 },
    },
    {
      id: 'B',
      path: B,
      cells: B.filter((p) => p.cell).map((p) => p.cell),
      step: 1,
      labelPosition: { x: 500, y: 525 },
    },
  ];
  const points = rings.flatMap((r) => r.path),
    minX = Math.min(...points.map((p) => p.x)),
    minY = Math.min(...points.map((p) => p.y)),
    scale = 1.54;
  const transform = (p) => {
    p.x = (p.x - minX) * scale + 60;
    p.y = (p.y - minY) * scale + 60;
  };
  points.forEach(transform);
  cells.forEach(transform);
  rings.forEach((r) => transform(r.labelPosition));
  return {
    family: 'inverted-order',
    topologyRecipe: 'six-crossing-inverted-order',
    cells,
    rings,
    layout: {
      width: Math.max(...points.map((p) => p.x)) + 60,
      height: Math.max(...points.map((p) => p.y)) + 70,
      padding: 60,
      pieceRadius: 19,
    },
    encounterOrderEvidence: {
      A: [0, 1, 2, 3, 4, 5],
      B: [0, 1, 2, 5, 4, 3],
      equivalentUnderRotationOrReflection: false,
    },
  };
}
