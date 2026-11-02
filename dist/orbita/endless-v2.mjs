// Seleção e certificação dos desafios livres circulares de ÓRBITA.
import { compactOrbitaAudit } from './presentation-fit.mjs';
import { validateCircleGeometryV3 } from './topology-circles-v3.mjs';
import { CATALOG } from './catalog-legacy1000.mjs';
import { validateLevel, replay, initialState, isWon, RULES_VERSION } from './engine.mjs';

export const ENDLESS_VERSION = 'orbita-generator-3-compact-v1';
export function topologyRecency(level) {
  const matrix = level.rings.map((a) =>
    level.rings.map((b) => (a === b ? 0 : a.cells.filter((id) => b.cells.includes(id)).length)),
  );
  return {
    rings: level.rings.length,
    intersections: level.cells.filter(
      (c) => level.rings.filter((r) => r.cells.includes(c.id)).length === 2,
    ).length,
    family: level.family,
    matrix,
  };
}
/** Current generation uses perfect circles only; old saved definitions are never passed here. */
export function isCircularGeneration(level) {
  if (
    !Array.isArray(level?.rings) ||
    !level.rings.length ||
    !level.rings.every((r) => Array.isArray(r?.cells))
  )
    return false;
  if (
    !level.rings.every((r) => {
      const g = r.geometry;
      return (
        g?.type === 'circle' &&
        [g.cx, g.cy, g.r].every(Number.isFinite) &&
        g.r > 0 &&
        Math.abs((g.rx ?? g.r) - g.r) < 1e-6 &&
        Math.abs((g.ry ?? g.r) - g.r) < 1e-6
      );
    })
  )
    return false;
  if (
    !level.rings.every((r, i) =>
      level.rings.slice(i + 1).every((s) => r.cells.filter((c) => s.cells.includes(c)).length <= 2),
    )
  )
    return false;
  // All new/custom/generated definitions receive the same analytic audit; metadata is not a bypass.
  try {
    return validateCircleGeometryV3(level).valid;
  } catch {
    return false;
  }
}
const compactCache = new WeakMap();
const compact = (l) => {
  if (!compactCache.has(l)) compactCache.set(l, compactOrbitaAudit(l).valid);
  return compactCache.get(l);
};
const normalizedSeed = (value) => {
  if (Number.isSafeInteger(value)) return value >>> 0;
  let h = 2166136261;
  for (const c of String(value ?? 0)) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};
/** Seed selects a fully certified definition, never reinterprets an existing saved seed. */
export function selectCertifiedV2(seed, options = {}, source = 'generated') {
  const normalized = normalizedSeed(seed),
    difficulty = Number.isInteger(options.difficulty)
      ? Math.max(0, Math.min(4, options.difficulty))
      : 0;
  const [lo, hi] = [
    [11, 50],
    [51, 200],
    [201, 300],
    [301, 650],
    [651, 1000],
  ][difficulty];
  const pool = CATALOG.filter((l) => l.id >= lo && l.id <= hi),
    recent = new Set(options.recentSignatures ?? []);
  const previous = (options.recentTopologies ?? []).at(-1),
    previousFamily = (options.recentFamilies ?? []).at(-1);
  const offset = normalized % pool.length;
  // Compact introductory pools can have fewer than30 distinct boards. Prefer
  // the full history; only on exhaustion reuse outside the latest8, never immediately.
  const shortRecent = new Set((options.recentSignatures ?? []).slice(-8));
  for (let pass = 0; pass < 2; pass++)
    for (let i = 0; i < pool.length; i++) {
      const candidate = pool[(offset + i) % pool.length];
      if (!isCircularGeneration(candidate) || !compact(candidate)) continue;
      const topology = topologyRecency(candidate);
      if (difficulty >= 2 && topology.intersections < 2) continue;
      if (
        difficulty >= 2 &&
        previous &&
        (topology.rings === previous.rings ||
          topology.intersections === previous.intersections ||
          topology.family === previous.family)
      )
        continue;
      if (difficulty >= 2 && previousFamily === topology.family) continue;
      const signature =
        candidate.validation?.signature ??
        JSON.stringify([candidate.rings, candidate.targets, candidate.initial]);
      if ((pass === 0 ? recent : shortRecent).has(signature)) continue;
      if (
        !validateLevel(candidate).valid ||
        isWon(candidate, initialState(candidate)) ||
        !replay(candidate, candidate.solution).solved
      )
        continue;
      const level = structuredClone(candidate);
      level.id = 'endless-' + normalized.toString(16) + '-3c';
      level.seed = normalized;
      level.difficulty = difficulty;
      level.generation = {
        seed: normalized,
        version: 3,
        difficulty,
        source: 'certified-reservoir',
        sourceLevel: candidate.id,
        topology,
      };
      return {
        level,
        signature,
        topology,
        validation: level.validation,
        seed: normalized,
        generatorVersion: ENDLESS_VERSION,
        rulesVersion: RULES_VERSION,
        source,
        attempts: pass * pool.length + i + 1,
      };
    }
  const error = new Error(
    'A reserva desta faixa não contém outro desafio diferente dos recentes. Seu desafio atual foi preservado.',
  );
  error.code = 'RESERVOIR_EXHAUSTED';
  throw error;
}
