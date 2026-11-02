// Construção e auditoria dos encontros físicos entre anéis circulares.
/** Circle-only Órbita topology. The rendered rails and this audit use the same
 * analytic circles; every intersection (including an isolated tangency) is one house. */
const TAU = Math.PI * 2,
  EPS = 1e-7;
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const mod = (x) => ((x % TAU) + TAU) % TAU;
function random(seed) {
  let n = seed >>> 0;
  return () => {
    n += 0x6d2b79f5;
    let t = n;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function circleMeetings(a, b) {
  const dx = b.cx - a.cx,
    dy = b.cy - a.cy,
    d = Math.hypot(dx, dy),
    tol = 1e-10 * Math.max(1, a.r, b.r);
  if (d < tol) return Math.abs(a.r - b.r) < tol ? null : [];
  if (d > a.r + b.r + tol || d < Math.abs(a.r - b.r) - tol) return [];
  const along = (a.r * a.r - b.r * b.r + d * d) / (2 * d),
    h2 = a.r * a.r - along * along;
  const x = a.cx + (along * dx) / d,
    y = a.cy + (along * dy) / d;
  if (Math.abs(d - a.r - b.r) <= tol || Math.abs(d - Math.abs(a.r - b.r)) <= tol)
    return [{ x, y, tangent: true }];
  const h = Math.sqrt(Math.max(0, h2));
  return [
    { x: x - (h * dy) / d, y: y + (h * dx) / d, tangent: false },
    { x: x + (h * dy) / d, y: y - (h * dx) / d, tangent: false },
  ];
}
export function circleCrossingAngle(a, b) {
  const d = Math.hypot(a.cx - b.cx, a.cy - b.cy),
    cos = (a.r * a.r + b.r * b.r - d * d) / (2 * a.r * b.r);
  return (Math.acos(Math.min(1, Math.abs(cos))) * 180) / Math.PI;
}
function graph(circles) {
  const matrix = circles.map(() => circles.map(() => 0)),
    points = [];
  for (let i = 0; i < circles.length; i++)
    for (let j = i + 1; j < circles.length; j++) {
      const hits = circleMeetings(circles[i], circles[j]);
      if (hits === null || (hits.length === 2 && circleCrossingAngle(circles[i], circles[j]) < 20))
        return null;
      matrix[i][j] = matrix[j][i] = hits.length;
      for (const p of hits) {
        if (points.some((q) => dist(p, q) < 0.01)) return null;
        points.push({ ...p, owners: [i, j] });
      }
    }
  const reached = new Set([0]);
  for (let pass = 0; pass < circles.length; pass++)
    matrix.forEach((row, i) => {
      if (reached.has(i))
        row.forEach((v, j) => {
          if (v) reached.add(j);
        });
    });
  return { matrix, points, connected: reached.size === circles.length };
}
function circleProposal(n, k, rng, variant, family) {
  const circles = [];
  // Low-density alternatives are real cycles, not merely renamed tangent chains.
  if (n === 3 && k === 3 && (variant % 3 === 0 || family === 'triangle')) {
    const r = [85 + 25 * rng(), 85 + 25 * rng(), 85 + 25 * rng()],
      d = r[0] + r[1],
      u = r[0] + r[2],
      v = r[1] + r[2],
      x = (u * u - v * v + d * d) / (2 * d);
    return [
      { cx: 0, cy: 0, r: r[0] },
      { cx: d, cy: 0, r: r[1] },
      { cx: x, cy: Math.sqrt(u * u - x * x), r: r[2] },
    ];
  }
  if (
    ((n === 4 && k === 4) || (n === 5 && k === 5)) &&
    (variant % 3 === 0 || family === 'circuit')
  ) {
    const r = 90 + 20 * rng(),
      orbit = r / Math.sin(Math.PI / n),
      phase = rng() * TAU;
    return Array.from({ length: n }, (_, i) => ({
      cx: orbit * Math.cos(phase + (TAU * i) / n),
      cy: orbit * Math.sin(phase + (TAU * i) / n),
      r,
    }));
  }
  if (k <= 2 * (n - 1) || rng() < 0.45) {
    const tree =
      family && /satellite|star/.test(family)
        ? 'star'
        : family && /chain/.test(family)
          ? 'chain'
          : ['chain', 'star', 'branch'][variant % 3];
    let tangentLeft = k <= 2 * (n - 1) ? 2 * (n - 1) - k : k % 2;
    const tangentEdges = Array.from({ length: n - 1 }, (_, i) => i < tangentLeft);
    for (let i = tangentEdges.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [tangentEdges[i], tangentEdges[j]] = [tangentEdges[j], tangentEdges[i]];
    }
    circles.push({ cx: 0, cy: 0, r: tree === 'star' ? 125 : 90 + 30 * rng() });
    const phase = rng() * TAU;
    for (let i = 1; i < n; i++) {
      const parent = tree === 'star' ? 0 : tree === 'chain' ? i - 1 : Math.floor(rng() * i),
        a = circles[parent],
        r = tree === 'star' ? 65 + 20 * rng() : 80 + 40 * rng(),
        angle =
          tree === 'star'
            ? phase + ((i - 1) * TAU) / (n - 1) + (rng() - 0.5) * 0.3
            : phase + (rng() - 0.5) * 2.3,
        space = (a.r + r) * (tangentEdges[i - 1] ? 1 : 0.68 + 0.2 * rng());
      circles.push({ cx: a.cx + space * Math.cos(angle), cy: a.cy + space * Math.sin(angle), r });
    }
  } else {
    const odd = k % 2 === 1;
    for (let i = 0; i < n; i++)
      circles.push({ cx: (rng() - 0.5) * 280, cy: (rng() - 0.5) * 280, r: 83 + 38 * rng() });
    if (odd) {
      const a = circles[0],
        b = circles[1],
        theta = rng() * TAU;
      b.cx = a.cx + (a.r + b.r) * Math.cos(theta);
      b.cy = a.cy + (a.r + b.r) * Math.sin(theta);
      for (let i = 2; i < n; i++) {
        circles[i].cx = (a.cx + b.cx) / 2 + (rng() - 0.5) * (140 + (n * (n - 1) - k) * 20);
        circles[i].cy = (a.cy + b.cy) / 2 + (rng() - 0.5) * (140 + (n * (n - 1) - k) * 20);
      }
    }
  }
  return circles;
}
function realizedFamily(matrix) {
  const n = matrix.length,
    degrees = matrix.map((row) => row.filter(Boolean).length),
    edges = degrees.reduce((a, b) => a + b, 0) / 2;
  if (n === 2) return 'lens';
  if (edges === n - 1) return Math.max(...degrees) === n - 1 && n > 3 ? 'satellites' : 'chain';
  if (degrees.every((d) => d === 2)) return n === 3 ? 'triangle' : 'circuit';
  if (n === 5 && edges >= 7) return 'star-five';
  return 'mesh';
}
function materialize(circles, g, rng, variant) {
  const cells = g.points.map((p, i) => ({
      id: 'j' + i,
      x: p.x,
      y: p.y,
      rings: p.owners.map((i) => String.fromCharCode(65 + i)),
    })),
    rings = [];
  for (let i = 0; i < circles.length; i++) {
    const c = circles[i],
      id = String.fromCharCode(65 + i),
      shared = cells.filter((p) => p.rings.includes(id)),
      wanted = circles.length === 2 ? 2 + Math.floor(rng() * 8) : 2 + Math.floor(rng() * 3);
    const selected = [...shared];
    for (let j = 0; j < wanted; j++) {
      let best = null,
        score = -1;
      for (let trial = 0; trial < 64; trial++) {
        const theta = rng() * TAU,
          p = { x: c.cx + c.r * Math.cos(theta), y: c.cy + c.r * Math.sin(theta) };
        if (
          circles.some(
            (other, oi) =>
              oi !== i && Math.abs(Math.hypot(p.x - other.cx, p.y - other.cy) - other.r) < 16,
          )
        )
          continue;
        const spacing = Math.min(...cells.map((q) => dist(p, q)));
        if (spacing < 18) continue;
        const quality = spacing * (0.35 + 1.3 * rng());
        if (quality > score) {
          score = quality;
          best = p;
        }
      }
      if (!best) return null;
      const p = { id: 'x' + cells.length, ...best, rings: [id] };
      cells.push(p);
      selected.push(p);
    }
    selected.sort(
      (a, b) => mod(Math.atan2(a.y - c.cy, a.x - c.cx)) - mod(Math.atan2(b.y - c.cy, b.x - c.cx)),
    );
    rings.push({
      id,
      cells: selected.map((p) => p.id),
      step: 1,
      geometry: { type: 'circle', cx: c.cx, cy: c.cy, r: c.r, rx: c.r, ry: c.r },
      labelPosition: { x: c.cx, y: c.cy },
    });
  }
  let minimum = Infinity,
    clearance = Infinity;
  for (let i = 0; i < cells.length; i++)
    for (let j = i + 1; j < cells.length; j++)
      minimum = Math.min(minimum, dist(cells[i], cells[j]));
  for (const p of cells)
    for (const r of rings)
      if (!p.rings.includes(r.id))
        clearance = Math.min(
          clearance,
          Math.abs(Math.hypot(p.x - r.geometry.cx, p.y - r.geometry.cy) - r.geometry.r),
        );
  const scale = Math.max(76 / minimum, 33 / clearance),
    minX = Math.min(...circles.map((c) => c.cx - c.r)),
    minY = Math.min(...circles.map((c) => c.cy - c.r)),
    maxX = Math.max(...circles.map((c) => c.cx + c.r)),
    maxY = Math.max(...circles.map((c) => c.cy + c.r));
  const width = (maxX - minX) * scale + 120,
    height = (maxY - minY) * scale + 130;
  if (Math.max(width, height) > 1400) return null;
  cells.forEach((p) => {
    p.x = (p.x - minX) * scale + 60;
    p.y = (p.y - minY) * scale + 60;
  });
  rings.forEach((r) => {
    const c = r.geometry;
    c.cx = (c.cx - minX) * scale + 60;
    c.cy = (c.cy - minY) * scale + 60;
    c.r = c.rx = c.ry = c.r * scale;
    r.labelPosition = { x: c.cx, y: c.cy };
  });
  return {
    family: realizedFamily(g.matrix),
    topologyRecipe: 'analytic-circles',
    cells,
    rings,
    layout: { width, height, padding: 60, pieceRadius: 19 },
    circleAudit: { pairMatrix: g.matrix, tangencies: g.points.filter((p) => p.tangent).length },
  };
}
export function makeCircleTopologyV3({
  ringCount = 3,
  intersections = 4,
  variant = 0,
  family,
} = {}) {
  if (
    !Number.isInteger(ringCount) ||
    ringCount < 2 ||
    ringCount > 5 ||
    !Number.isInteger(intersections) ||
    intersections < Math.max(2, ringCount - 1) ||
    intersections > Math.min(14, ringCount * (ringCount - 1)) ||
    (ringCount === 2 && intersections !== 2)
  )
    throw new Error('Impossible connected circle/meeting count');
  const rng = random(Math.imul(variant, 7193) + ringCount * 191 + intersections * 991);
  for (let attempt = 0; attempt < 6000; attempt++) {
    const circles = circleProposal(ringCount, intersections, rng, variant + attempt, family),
      g = graph(circles);
    if (!g || !g.connected || g.points.length !== intersections) continue;
    const t = materialize(circles, g, rng, variant);
    if (!t) continue;
    const check = validateCircleGeometryV3(t);
    if (check.valid) return t;
  }
  throw new Error(
    `No readable analytic circle arrangement for ${ringCount}/${intersections}/${variant}`,
  );
}
export function validateCircleGeometryV3(level) {
  const fail = (error) => ({ valid: false, errors: [error] });
  if (
    !level ||
    !Array.isArray(level.cells) ||
    !Array.isArray(level.rings) ||
    level.cells.length > 80 ||
    level.rings.length < 1 ||
    level.rings.length > 5
  )
    return fail('Invalid circle collection');
  const width = level.layout?.width,
    height = level.layout?.height;
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width < 100 ||
    height < 100 ||
    width > 16384 ||
    height > 16384
  )
    return fail('Invalid circle layout');
  const cells = new Map(),
    owners = new Map(),
    errors = [],
    circles = [];
  for (const p of level.cells) {
    if (
      !p ||
      typeof p.id !== 'string' ||
      cells.has(p.id) ||
      !Number.isFinite(p.x) ||
      !Number.isFinite(p.y) ||
      p.x < 27 ||
      p.y < 27 ||
      p.x > width - 27 ||
      p.y > height - 27
    )
      return fail('Invalid physical circle house');
    cells.set(p.id, p);
    owners.set(p.id, []);
  }
  const ringIDs = new Set();
  for (const r of level.rings) {
    const c = r?.geometry;
    if (
      !r ||
      typeof r.id !== 'string' ||
      ringIDs.has(r.id) ||
      r.path !== undefined ||
      c?.type !== 'circle' ||
      ![c.cx, c.cy, c.r, c.rx ?? c.r, c.ry ?? c.r].every(Number.isFinite) ||
      c.r <= 0 ||
      Math.abs((c.rx ?? c.r) - c.r) > EPS ||
      Math.abs((c.ry ?? c.r) - c.r) > EPS
    )
      return fail('Every new rail must be a perfect analytic circle');
    ringIDs.add(r.id);
    circles.push(c);
    if (c.cx - c.r < 0 || c.cy - c.r < 0 || c.cx + c.r > width || c.cy + c.r > height)
      return fail('Circle outside drawing bounds');
    if (
      !Array.isArray(r.cells) ||
      r.cells.length < 3 ||
      r.cells.length > 32 ||
      new Set(r.cells).size !== r.cells.length
    )
      return fail('Invalid cyclic circle houses');
    const angles = [];
    for (const id of r.cells) {
      const p = cells.get(id);
      if (!p) return fail('Missing circle house');
      owners.get(id).push(r.id);
      if (Math.abs(Math.hypot(p.x - c.cx, p.y - c.cy) - c.r) > 1e-4)
        errors.push('House is not on its analytic circle');
      angles.push(mod(Math.atan2(p.y - c.cy, p.x - c.cx)));
    }
    const total = angles.reduce((s, a, i) => s + mod(angles[(i + 1) % angles.length] - a), 0);
    if (Math.abs(total - TAU) > 1e-5) errors.push('Circle order is not one clockwise revolution');
  }
  if ([...owners.values()].some((a) => !a.length || a.length > 2))
    errors.push('Invalid or triple-owned physical house');
  const matrix = circles.map(() => circles.map(() => 0));
  let meetings = 0,
    tangencies = 0,
    minimumCrossingAngle = Infinity;
  for (let i = 0; i < circles.length; i++)
    for (let j = i + 1; j < circles.length; j++) {
      const hits = circleMeetings(circles[i], circles[j]);
      if (hits === null) {
        errors.push('Coincident circles overlap along a rail');
        continue;
      }
      if (hits.length === 2) {
        const angle = circleCrossingAngle(circles[i], circles[j]);
        minimumCrossingAngle = Math.min(minimumCrossingAngle, angle);
        if (angle < 20 - 1e-7)
          errors.push('Proper circle crossings must have at least a twenty-degree angle');
      }
      matrix[i][j] = matrix[j][i] = hits.length;
      meetings += hits.length;
      tangencies += hits.filter((p) => p.tangent).length;
      const ids = [level.rings[i].id, level.rings[j].id],
        logical = [...cells.values()].filter((p) =>
          ids.every((id) => owners.get(p.id).includes(id)),
        );
      if (logical.length !== hits.length)
        errors.push('Analytic and logical pair intersections disagree');
      for (const p of hits)
        if (logical.filter((q) => dist(p, q) < 0.001).length !== 1)
          errors.push('Unmarked or ambiguous analytic intersection');
      if (!hits.length) {
        const a = circles[i],
          b = circles[j],
          d = Math.hypot(a.cx - b.cx, a.cy - b.cy),
          gap = d > a.r + b.r ? d - a.r - b.r : Math.abs(a.r - b.r) - d;
        if (gap < 8) errors.push('Separate circles are visually too close');
      }
    }
  let minimumCellDistance = Infinity,
    minimumCellRailClearance = Infinity;
  for (let i = 0; i < level.cells.length; i++)
    for (let j = i + 1; j < level.cells.length; j++)
      minimumCellDistance = Math.min(minimumCellDistance, dist(level.cells[i], level.cells[j]));
  for (const p of level.cells)
    for (let i = 0; i < circles.length; i++)
      if (!owners.get(p.id).includes(level.rings[i].id)) {
        const c = circles[i];
        minimumCellRailClearance = Math.min(
          minimumCellRailClearance,
          Math.abs(Math.hypot(p.x - c.cx, p.y - c.cy) - c.r),
        );
      }
  if (minimumCellDistance < 75.99) errors.push('Circle houses are too close');
  if (minimumCellRailClearance < 32.99)
    errors.push('A foreign circular rail passes too close to a house');
  const reached = new Set([0]);
  for (let pass = 0; pass < circles.length; pass++)
    matrix.forEach((row, i) => {
      if (reached.has(i))
        row.forEach((n, j) => {
          if (n) reached.add(j);
        });
    });
  if (reached.size !== circles.length) errors.push('Disconnected circle network');
  return {
    valid: !errors.length,
    errors: [...new Set(errors)],
    intersections: meetings,
    tangencies,
    minimumCrossingAngle,
    pairMatrix: matrix,
    minimumCellDistance,
    minimumCellRailClearance,
  };
}
