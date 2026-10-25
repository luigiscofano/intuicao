// Portable real-engine replay. Authoring validators remain separate and unchanged.
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {isMain, readJSON, artifactURL, printReport} from './light-v4-artifacts.mjs';
import { traceLightWorld, traceLightAttempt, lightSegmentIntersection } from '../dist/light-world.mjs';
import { segment, wallPolygon } from '../dist/math.mjs';

const sha = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const colors = ['gold', 'blue', 'pink'];
const tolerance = 1e-7;
export function referenceState(level, angles = level.solution) {
  let i = 0;
  return { ...structuredClone(level), objects: level.objects.map(o => ({ ...structuredClone(o), ...(o.type === 'mirror' ? { angle: angles[i++] } : {}) })) };
}
export function traceEvidence(world) {
  return { status: world.status, collisions: world.collisions.map(c => ({ colors: c.colors, point: c.point, overlap: c.overlap })), rays: world.rays.map(r => ({ color: r.color, status: r.status, mirrors: r.reflections.map(x => x.objectIndex), portals: r.teleports.map(x => x.portalId), segments: r.segments.map(s => ({ a: s.a, b: s.b })), bounces: r.bounces })) };
}
function permutations(items) { return items.length ? items.flatMap((x, i) => permutations(items.filter((_, j) => i !== j)).map(rest => [x, ...rest])) : [[]]; }
function pointInWall(p, wall) {
  const a = wall.angle * Math.PI / 180, dx = p.x - wall.x, dy = p.y - wall.y;
  return Math.abs(dx * Math.cos(a) + dy * Math.sin(a)) < wall.length / 2 - tolerance && Math.abs(-dx * Math.sin(a) + dy * Math.cos(a)) < (wall.width ?? 12) / 2 - tolerance;
}
function geometryFailures(level) {
  const failures = [], mirrors = level.objects.map((o, index) => ({ ...o, index })).filter(o => o.type === 'mirror'), walls = level.objects.filter(o => o.type === 'wall');
  for (const m of mirrors) {
    const s = segment(m);
    if (m.x < 66 - tolerance || m.x > 734 + tolerance || m.y < 66 - tolerance || m.y > 394 + tolerance) failures.push(`rotation-envelope:${m.index}`);
    if (Math.abs(m.length - 124.8) > tolerance) failures.push(`mirror-length:${m.index}`);
    for (let i = 0; i < level.sources.length; i++) if (Math.hypot(m.x - level.sources[i].x, m.y - level.sources[i].y) < 148 - tolerance) failures.push(`source-clearance:${m.index}:${i}`);
    for (const other of mirrors.filter(o => o.index > m.index)) { const t = segment(other); if (lightSegmentIntersection(s.a, s.b, t.a, t.b)) failures.push(`mirror-overlap:${m.index}:${other.index}`); }
    for (let i = 0; i < walls.length; i++) { const p = wallPolygon(walls[i]); if (pointInWall(s.a, walls[i]) || pointInWall(s.b, walls[i]) || p.some((v, j) => lightSegmentIntersection(s.a, s.b, v, p[(j + 1) % p.length]))) failures.push(`mirror-wall:${m.index}:${i}`); }
  }
  for (const [type, items] of [['source', level.sources], ['target', level.targets], ['portal', level.portals ?? []]]) for (let i = 0; i < items.length; i++) { const p = items[i]; if (!Number.isFinite(p.x) || !Number.isFinite(p.y) || p.x < 0 || p.x > 800 || p.y < 0 || p.y > 460) failures.push(`outside:${type}:${i}`); }
  return failures;
}
export function validateLevel(level, { perturb = true } = {}) {
  const errors = [], mirrors = level.objects.filter(o => o.type === 'mirror');
  if (!level.id || typeof level.id !== 'string') errors.push('stable-id');
  if (level.solution.length !== mirrors.length) errors.push('solution-arity');
  if (level.solution.some(a => !Number.isFinite(a) || a < -90 || a > 90 || Math.abs(a * 10 - Math.round(a * 10)) > tolerance)) errors.push('solution-angle');
  if (mirrors.some(m => !Number.isFinite(m.angle) || m.angle < -90 || m.angle > 90)) errors.push('initial-angle');
  if (level.objects.some(o => !['mirror', 'wall'].includes(o.type))) errors.push('unsupported-object');
  if (level.sources.length < 1 || level.sources.length > 3 || level.sources.some(s => !colors.includes(s.color))) errors.push('sources');
  if (level.targets.some(t => t.radius !== 22 || !colors.includes(t.color))) errors.push('targets');
  const portals = level.portals ?? [], portalIds = new Set();
  for (const portal of portals) {
    if (portalIds.has(portal.id)) errors.push(`duplicate-portal-id:${portal.id}`); portalIds.add(portal.id);
    const partner = portals.find(p => p !== portal && p.id === portal.pairId) ?? portals.find(p => p !== portal && p.pairId === portal.pairId);
    if (!partner) errors.push(`unpaired-portal:${portal.id}`);
    else if (String(portal.label ?? portal.pairId) !== String(partner.label ?? partner.pairId)) errors.push(`portal-label-mismatch:${portal.id}`);
    if (portal.y + (portal.radius ?? 16) + 19 > 460 || portal.y - (portal.radius ?? 16) - 5 < 0 || portal.x - (portal.radius ?? 16) - 5 < 0 || portal.x + (portal.radius ?? 16) + 5 > 800) errors.push(`portal-render-bounds:${portal.id}`);
  }
  const ref = referenceState(level), world = traceLightWorld(ref), initial = traceLightWorld(level);
  if (world.status !== 'target') errors.push('reference-not-solved');
  if (initial.status === 'target') errors.push('initial-already-solved');
  errors.push(...geometryFailures(level).map(s => 'initial:' + s), ...geometryFailures(ref).map(s => 'reference:' + s));
  const orders = [];
  for (const order of permutations(level.sources.map((_, i) => i))) {
    let previous = null;
    for (let i = 0; i < order.length; i++) { previous = traceLightAttempt(ref, order.slice(0, i + 1), { previous }); if (i < order.length - 1 && previous.status !== 'pending') errors.push(`partial-order:${order}`); }
    if (previous.status !== 'target') errors.push(`source-order:${order}`);
    orders.push({ order, status: previous.status });
  }
  let individualPerturbations = 0, simultaneousCorners = 0; const perturbationFailures = [];
  if (perturb && world.status === 'target') {
    for (let i = 0; i < mirrors.length; i++) for (const delta of [-0.5, 0.5]) { const angles = [...level.solution]; angles[i] += delta; const result = traceLightWorld(referenceState(level, angles)); individualPerturbations++; if (result.status !== 'target') perturbationFailures.push({ type: 'single', mirror: i, delta, status: result.status }); }
    const limit = mirrors.length <= 10 ? 2 ** mirrors.length : 128;
    for (let mask = 0; mask < limit; mask++) { const angles = level.solution.map((a, i) => a + (((mirrors.length <= 10 ? mask : (Math.imul(mask + 1, 2654435761) >>> 0)) >>> (i % 31)) & 1 ? 0.5 : -0.5)); const result = traceLightWorld(referenceState(level, angles)); simultaneousCorners++; if (result.status !== 'target') perturbationFailures.push({ type: 'corner', mask, status: result.status }); }
  }
  if (perturbationFailures.length) errors.push('angular-margin');
  return { id: level.id, passed: errors.length === 0, errors: [...new Set(errors)], reference: traceEvidence(world), initial: traceEvidence(initial), orders, individualPerturbations, simultaneousCorners, cornersExhaustive: mirrors.length <= 10, perturbationFailures, geometryHash: sha({ objects: level.objects, sources: level.sources, targets: level.targets, portals: level.portals ?? [] }), limitations: 'Reference and documented finite alternatives only; no continuous-angle uniqueness or human difficulty calibration claim.' };
}
export function validateRecord(record, options) {
  const validation = validateLevel(record.level, options), cases = [];
  for (const c of record.cases ?? []) {
    const state = referenceState(record.level, c.angles), selected = c.sourceIndices ?? state.sources.map((_, i) => i);
    state.sources = selected.map(i => state.sources[i]);
    const world = traceLightWorld(state), passed = world.status === c.expectedStatus;
    if (!passed) validation.errors.push(`case:${c.id}:${world.status}!=${c.expectedStatus}`);
    const isolated = selected.map((index, k) => ({ index, status: traceLightWorld({ ...state, sources: [state.sources[k]] }).status }));
    cases.push({ id: c.id, passed, selected, isolated, evidence: traceEvidence(world) });
  }
  const concepts = [record.editorial?.primaryConcept, ...(record.editorial?.complementaryConcepts ?? [])];
  let openConflictCertified = false;
  if (concepts.includes(7)) {
    openConflictCertified = cases.some(c => c.selected.length >= 2 && c.evidence.status === 'collision' && c.isolated.every(x => x.status === 'target'));
    if (!openConflictCertified) validation.errors.push('idea7-no-individually-valid-joint-conflict');
  }
  const ids = new Set(cases.map(c => c.id));
  for (const evidence of record.editorial?.conceptEvidence ?? []) for (const id of evidence.caseIds ?? []) if (!ids.has(id)) validation.errors.push(`missing-concept-case:${evidence.concept}:${id}`);
  // Exercise the same cumulative source-click path as the UI, including both-ray stops.
  // The documented conflict is geometric; no temporal winning order is introduced.
  const clickConflictOrders = [];
  const witness = cases.find(c => c.selected.length >= 2 && c.evidence.status === 'collision' && c.isolated.every(x => x.status === 'target'));
  if (witness) {
    const originalCase = record.cases.find(c => c.id === witness.id);
    const state = referenceState(record.level, originalCase.angles);
    for (const order of permutations(state.sources.map((_, i) => i))) {
      let previous = null;
      for (let i = 0; i < order.length; i++) {
        previous = traceLightAttempt(state, order.slice(0, i + 1), { previous });
        if (i < order.length - 1 && previous.status !== 'pending') validation.errors.push(`conflict-partial-order:${order}`);
      }
      const stopped = previous.rays.filter(r => r.status === 'collision').length;
      const firstImpact = previous.collisions.find(c => (c.stoppedRayIndices ?? []).length >= 2);
      const passed = previous.status === 'collision' && stopped >= 2 && !!firstImpact;
      if (!passed) validation.errors.push(`conflict-click-order:${order}`);
      clickConflictOrders.push({ order, status: previous.status, stopped, passed });
    }
  }
  validation.passed = validation.errors.length === 0;
  return { ...validation, openConflictCertified, clickConflictOrders, cases };
}
if (isMain(import.meta.url)) {
  const input = process.argv[2] ?? artifactURL('evidence-records.json.gz');
  try {
    const records = readJSON(input);
    assert.ok(Array.isArray(records), 'Expected an array of evidence records.');
    const results = records.map(record => validateRecord(record));
    const report = { passed: results.every(r => r.passed), count: results.length,
      passedRecords: results.filter(r => r.passed).length,
      failed: results.filter(r => !r.passed).map(r => ({ id: r.id, errors: r.errors })),
      idea7Certificates: results.filter(r => r.openConflictCertified).length,
      limitations: 'Finite reference/counterexample replay and angular margin samples only. No continuous uniqueness, visual usability or player difficulty claim.' };
    printReport(report, process.argv[3]);
    if (!report.passed) process.exitCode = 1;
  } catch (error) {
    printReport({ passed: false, error: error.message, limitations: 'Validation did not complete; missing artifacts are not a successful skip.' });
    process.exitCode = 1;
  }
}
