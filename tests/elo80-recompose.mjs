// Geração e preparação de dados de ELO.
import fs from 'node:fs';
import { ELO_CAMPAIGN as ls } from './fixtures/elo200-campaign.mjs';
import { ELO_CAMPAIGN_ANSWERS as answers } from './fixtures/elo200-answers.mjs';
import { constraintPool, productionSolve, combineClues } from './elo-campaign-build.mjs';
import { explainElo } from './elo-campaign-reasoning.mjs';
const specs = [
    [29, 59],
    [32, 82],
    [38, 99],
    [73, 185],
    [75, 189],
    [79, 190],
  ],
  out = {};
const keys = {
  shapes: 'shapes',
  passages: 'passages',
  forbiddenEdges: 'forbiddenEdges',
  rowCounts: 'counts',
  colCounts: 'counts',
  distances: 'distances',
  neighbors: 'neighbors',
  order: 'order',
  cuts: 'cuts',
  exclusivePassages: 'exclusivePassages',
};
const intro = {
  shapes: 10,
  passages: 16,
  forbiddenEdges: 24,
  counts: 31,
  distances: 39,
  neighbors: 46,
  order: 54,
  cuts: 61,
  exclusivePassages: 68,
};
const unpack = (c) =>
  Object.entries(c).flatMap(([key, v]) =>
    key === 'order'
      ? [{ key, value: v }]
      : Array.isArray(v)
        ? v.map((x) => ({ key, value: [x] }))
        : Object.entries(v).map(([k, x]) => ({ key, value: { [k]: x } })),
  );
function check(l, p) {
  const r = productionSolve(l, { maxNodes: 500000 });
  return r.exhaustive && r.count === 1;
}
function redundant(l, p, qs) {
  const bans = new Set([
      ...(l.constraints.passages ?? []),
      ...(l.constraints.exclusivePassages ?? []).flatMap((g) => g.cells),
    ]),
    domains = p.map((_, r) => l.regions.flatMap((v, x) => (v === r && !bans.has(x) ? [x] : [])));
  return qs.findIndex((q, i) => {
    const trial = { ...l, constraints: combineClues(qs.filter((_, j) => j !== i)) },
      r = productionSolve(trial, {
        maxNodes: 500000,
        domains: ['passages', 'exclusivePassages'].includes(q.key) ? domains : undefined,
      });
    return r.exhaustive && r.count === 1;
  });
}
for (const [num, old] of specs) {
  const source = ls[old - 1],
    p = answers[source.id];
  let l = structuredClone(source),
    qs = unpack(l.constraints),
    changes = [];
  for (let step = 0; step < 12; step++) {
    let idx = redundant(l, p, qs);
    if (idx < 0) break;
    const dropped = qs[idx],
      base = qs.filter((_, j) => j !== idx);
    let test = { ...l, constraints: combineClues(base) };
    if (check(test, p)) {
      qs = base;
      l = test;
      changes.push({ drop: dropped });
      continue;
    }
    const candidates = constraintPool(l, p, () => 0.413).filter(
      (q) =>
        intro[q.family] <= num &&
        !['passages', 'exclusivePassages'].includes(q.key) &&
        !(q.key === 'order' && base.some((b) => b.key === 'order')),
    );
    let found = false;
    for (const q of candidates) {
      test = { ...l, constraints: combineClues([...base, q]) };
      if (!check(test, p)) continue;
      if (redundant(test, p, [...base, q]) === base.length) continue;
      qs = [...base, q];
      l = test;
      changes.push({ replace: dropped, with: q });
      found = true;
      break;
    }
    if (!found) throw Error('repair unavailable ' + num);
  }
  if (redundant(l, p, qs) >= 0) throw Error('stillredundant' + num);
  const proof = explainElo(l, { maxEvaluations: 15000 });
  if (!proof.solved || proof.limited) throw Error('proof' + num);
  out[num] = { constraints: l.constraints, changes };
  fs.writeFileSync(
    new URL('./elo80-recompositions.json', import.meta.url),
    JSON.stringify(out, null, 2),
  );
  console.log('REPAIRED', num, JSON.stringify(l.constraints), proof.evaluations);
}
