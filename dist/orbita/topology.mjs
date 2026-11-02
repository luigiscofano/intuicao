// Geometria dos trilhos de ÓRBITA; as regras usam identificadores de células.
// The geometry describes the fixed rail only. The engine reads cell IDs, never pixels.
const TAU = Math.PI * 2;
const round = (value) => Math.round(value * 1000) / 1000;
const angle = (x, y) => (Math.atan2(y, x) + TAU) % TAU;
export const FAMILIES = Object.freeze({
  single: 'Um primeiro anel',
  pair: 'Uma conexão',
  lens: 'Dois encontros',
  chain: 'Anéis em corrente',
  satellites: 'Centro e satélites',
  circuit: 'Caminhos em circuito',
  reserve: 'Um lugar de reserva',
  unequal: 'Percursos diferentes',
  compact: 'Conexões reunidas',
  nested: 'Caminhos por dentro',
});

function intersections(a, b) {
  const dx = b.cx - a.cx,
    dy = b.cy - a.cy,
    d = Math.hypot(dx, dy),
    epsilon = 0.00001;
  if (d < epsilon || d > a.r + b.r + epsilon || d < Math.abs(a.r - b.r) - epsilon) return [];
  const along = (a.r * a.r - b.r * b.r + d * d) / (2 * d),
    height = Math.sqrt(Math.max(0, a.r * a.r - along * along));
  const x = a.cx + (along * dx) / d,
    y = a.cy + (along * dy) / d;
  return height < epsilon
    ? [{ x, y }]
    : [
        { x: x - (height * dy) / d, y: y + (height * dx) / d },
        { x: x + (height * dy) / d, y: y - (height * dx) / d },
      ];
}

function recipes(family, variant) {
  const v = ((variant % 9) + 9) % 9,
    a = 96 + (v % 3) * 9,
    b = 86 + Math.floor(v / 3) * 9;
  switch (family) {
    case 'single':
      return [{ cx: 0, cy: 0, r: 110 }];
    case 'pair':
      return [
        { cx: 0, cy: 0, r: a },
        { cx: a + b, cy: 0, r: b },
      ];
    case 'unequal':
      return [
        { cx: 0, cy: 0, r: 120 },
        { cx: 190, cy: 0, r: 70 },
      ];
    case 'lens':
      return [
        { cx: 0, cy: 0, r: 110 },
        { cx: 150 + (v % 3) * 7, cy: 0, r: 110 },
      ];
    case 'chain':
      return [
        { cx: 0, cy: 0, r: a },
        { cx: a + b, cy: 0, r: b },
        { cx: a + 2 * b + a, cy: 0, r: a },
      ];
    case 'satellites':
      return [
        { cx: 0, cy: 0, r: 110 },
        { cx: -190, cy: 0, r: 80 },
        { cx: 190, cy: 0, r: 80 },
        { cx: 0, cy: 190, r: 80 },
      ];
    case 'circuit':
      return v % 2 === 0
        ? [
            { cx: 0, cy: 0, r: 100 },
            { cx: 200, cy: 0, r: 100 },
            { cx: 100, cy: Math.sqrt(3) * 100, r: 100 },
          ]
        : [
            { cx: 0, cy: 0, r: 100 },
            { cx: 200, cy: 0, r: 100 },
            { cx: 200, cy: 200, r: 100 },
            { cx: 0, cy: 200, r: 100 },
          ];
    case 'reserve':
      return [
        { cx: 0, cy: 0, r: 110 },
        { cx: 220, cy: 0, r: 110 },
        { cx: -175, cy: 0, r: 65 },
      ];
    case 'compact':
      return [
        { cx: 0, cy: 0, r: 105 },
        { cx: -180, cy: 0, r: 75 },
        { cx: 180, cy: 0, r: 75 },
        { cx: 0, cy: -180, r: 75 },
        ...(v % 3 === 0 ? [{ cx: 0, cy: 180, r: 75 }] : []),
      ];
    case 'nested':
      return [
        { cx: 0, cy: 0, r: 200 },
        { cx: 45, cy: 0, r: 155 },
        { cx: 0, cy: 0, r: 110 },
        { cx: 35, cy: 0, r: 75 },
        { cx: 5, cy: 0, r: 45 },
      ].slice(0, 2 + (v % 4));
    default:
      throw new Error('Família de anéis desconhecida.');
  }
}

/** Build circles together; every actual intersection becomes one shared physical cell. */
export function makeTopology(family = 'pair', variant = 0, lengths = null) {
  const circles = recipes(family, variant).map((c, i) => ({
    ...c,
    id: String.fromCharCode(65 + i),
  }));
  const points = [],
    memberships = new Map();
  const add = (p, rings) => {
    let found = points.find((x) => Math.hypot(x.x - p.x, x.y - p.y) < 0.001);
    if (!found) {
      found = { id: 'c' + points.length, x: p.x, y: p.y };
      points.push(found);
      memberships.set(found.id, new Set());
    }
    for (const id of rings) memberships.get(found.id).add(id);
    if (memberships.get(found.id).size > 2) throw new Error('Três anéis na mesma casa.');
    return found;
  };
  for (let i = 0; i < circles.length; i++)
    for (let j = i + 1; j < circles.length; j++)
      for (const p of intersections(circles[i], circles[j])) add(p, [circles[i].id, circles[j].id]);
  const rings = circles.map((circle, i) => {
    const shared = points.filter((p) => memberships.get(p.id).has(circle.id));
    const wanted =
      lengths?.[i] ??
      (family === 'single'
        ? 4
        : family === 'lens'
          ? 5 + ((variant + i) % 3)
          : 4 + ((Math.floor(variant / (i + 1)) + i) % 3));
    const count = Math.max(wanted, shared.length * 2, 3);
    let angles = shared.map((p) => angle(p.x - circle.cx, p.y - circle.cy));
    if (!angles.length) angles = [-Math.PI / 2];
    // Bisect the longest angular gap, then redistribute evenly inside each junction arc.
    const anchors = angles.slice().sort((a, b) => a - b),
      divisions = anchors.map(() => 1);
    while (divisions.reduce((sum, n) => sum + n, 0) < count) {
      let best = 0,
        value = -1;
      anchors.forEach((start, k) => {
        const gap = (anchors[(k + 1) % anchors.length] - start + TAU) % TAU || TAU,
          score = gap / divisions[k];
        if (score > value) {
          value = score;
          best = k;
        }
      });
      divisions[best]++;
    }
    angles = [];
    anchors.forEach((start, k) => {
      const gap = (anchors[(k + 1) % anchors.length] - start + TAU) % TAU || TAU;
      for (let part = 0; part < divisions[k]; part++)
        angles.push((start + (gap * part) / divisions[k] + TAU) % TAU);
    });
    const cells = angles
      .sort((a, b) => a - b)
      .map(
        (theta) =>
          add(
            {
              x: circle.cx + Math.cos(theta) * circle.r,
              y: circle.cy + Math.sin(theta) * circle.r,
            },
            [circle.id],
          ).id,
      );
    return {
      id: circle.id,
      cells,
      step: 1,
      geometry: {
        type: 'circle',
        cx: circle.cx,
        cy: circle.cy,
        r: circle.r,
        rx: circle.r,
        ry: circle.r,
      },
    };
  });
  let min = Infinity;
  for (let i = 0; i < points.length; i++)
    for (let j = i + 1; j < points.length; j++)
      min = Math.min(min, Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y));
  const scale = Math.max(1, 76 / min),
    padding = 52;
  const minX = Math.min(...circles.map((c) => c.cx - c.r)),
    minY = Math.min(...circles.map((c) => c.cy - c.r));
  const maxX = Math.max(...circles.map((c) => c.cx + c.r)),
    maxY = Math.max(...circles.map((c) => c.cy + c.r));
  const cells = points.map((p) => ({
    id: p.id,
    x: round((p.x - minX) * scale + padding),
    y: round((p.y - minY) * scale + padding),
    rings: [...memberships.get(p.id)],
  }));
  for (const r of rings) {
    const g = r.geometry;
    g.cx = round((g.cx - minX) * scale + padding);
    g.cy = round((g.cy - minY) * scale + padding);
    g.r = g.rx = g.ry = round(g.r * scale);
  }
  return {
    family,
    cells,
    rings,
    layout: {
      width: round((maxX - minX) * scale + padding * 2),
      height: round((maxY - minY) * scale + padding * 2),
      padding,
      pieceRadius: 19,
    },
  };
}

/** Mandatory seven-house topology, with the names and clockwise orders of the brief. */
export function exampleTopology() {
  return {
    family: 'pair',
    cells: [
      { id: 'J', x: 272, y: 152 },
      { id: 'Abaixo', x: 162, y: 262 },
      { id: 'Aesquerda', x: 52, y: 152 },
      { id: 'Atopo', x: 162, y: 42 },
      { id: 'Btopo', x: 382, y: 42 },
      { id: 'Bdireita', x: 492, y: 152 },
      { id: 'Bbaixo', x: 382, y: 262 },
    ],
    rings: [
      {
        id: 'A',
        cells: ['J', 'Abaixo', 'Aesquerda', 'Atopo'],
        step: 1,
        geometry: { type: 'circle', cx: 162, cy: 152, r: 110, rx: 110, ry: 110 },
      },
      {
        id: 'B',
        cells: ['J', 'Btopo', 'Bdireita', 'Bbaixo'],
        step: 1,
        geometry: { type: 'circle', cx: 382, cy: 152, r: 110, rx: 110, ry: 110 },
      },
    ],
    layout: { width: 544, height: 314, padding: 52, pieceRadius: 19 },
  };
}
