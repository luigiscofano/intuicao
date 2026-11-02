// Testes e verificações de ELO.
/** Reproducible bounded reasoning certificates. No answer data is used. */
import fs from 'node:fs';
import { createHash } from 'node:crypto';
export const reasoningEngineHash = createHash('sha256')
  .update(fs.readFileSync(new URL('../dist/elo-rules.mjs', import.meta.url)))
  .digest('hex');
export const reasoningMethodVersion =
  'bounded-proof-v2-local-candidate-tests-plus-explicit-hypotheses';
export const levelHash = (l) =>
  createHash('sha256')
    .update(
      JSON.stringify({
        rows: l.rows,
        cols: l.cols,
        regions: l.regions,
        fixed: l.fixed || {},
        constraints: l.constraints || {},
      }),
    )
    .digest('hex');
import { analyzeEloLocal, validateElo } from '../dist/elo-rules.mjs';
const copy = (d) => d.map((a) => a.slice());
export function explainElo(l, { maxDepth = 2, maxEvaluations = 5000 } = {}) {
  let evaluations = 0,
    limited = false;
  const memo = new Map();
  const analyze = (domains) => {
    const key = JSON.stringify(domains || null);
    if (memo.has(key)) return memo.get(key);
    if (++evaluations > maxEvaluations) {
      limited = true;
      return null;
    }
    const result = analyzeEloLocal(l, {}, { domains, maxMs: Infinity, maxOperations: Infinity });
    memo.set(key, result);
    return result;
  };
  function local(domains) {
    const a = analyze(domains);
    if (!a) return null;
    return {
      domains: a.candidates,
      contradiction: a.contradiction,
      solved: a.solved,
      diagnostic: a.diagnostic,
      step: {
        kind: 'local-propagation',
        rounds: a.rounds,
        eliminations: a.eliminations,
        forced: a.forced,
      },
      proof: a.contradiction
        ? {
            kind: 'local-contradiction',
            diagnostic: a.diagnostic,
            eliminations: a.eliminations,
            domains: a.candidates,
          }
        : null,
    };
  }
  function reduce(input, depth, root = false) {
    let result = local(input);
    if (!result)
      return { limited: true, contradiction: false, solved: false, domains: input, steps: [] };
    const steps = result.step.eliminations.length || result.step.forced.length ? [result.step] : [];
    if (result.contradiction || result.solved || depth === 0) return { ...result, steps };
    let changed = true;
    while (changed && !limited && !result.solved && !result.contradiction) {
      changed = false;
      const order = result.domains
        .map((d, r) => ({ r, n: d.length }))
        .filter((x) => x.n > 1)
        .sort((a, b) => a.n - b.n);
      outer: for (const { r } of order)
        for (const cell of [...result.domains[r]]) {
          const hypothesis = copy(result.domains);
          hypothesis[r] = [cell];
          const trial = reduce(hypothesis, depth - 1, false);
          if (trial.contradiction) {
            const rejected = {
              kind: 'hypothesis-refutation',
              region: r,
              cell,
              maxSimultaneousHypotheses: depth,
              explanation: `Suponha a região ${r + 1} em L${Math.floor(cell / l.cols) + 1}C${(cell % l.cols) + 1}. As regras levam à contradição registrada; portanto esta posição pode ser excluída.`,
              proof: trial.proof || {
                kind: 'propagated-refutation',
                steps: trial.steps,
                diagnostic: trial.diagnostic,
              },
            };
            steps.push(rejected);
            const next = copy(result.domains);
            next[r] = next[r].filter((x) => x !== cell);
            result = local(next);
            if (!result)
              return { limited: true, contradiction: false, solved: false, domains: next, steps };
            if (result.step.eliminations.length || result.step.forced.length)
              steps.push(result.step);
            changed = true;
            break outer;
          }
          if (limited) break outer;
        }
    }
    if (result.contradiction)
      result.proof = {
        kind: 'bounded-hypothesis-contradiction',
        steps,
        diagnostic: result.diagnostic,
      };
    return { ...result, steps };
  }
  let result = reduce(undefined, 0, true),
    depthUsed = 0;
  for (
    let depth = 1;
    depth <= maxDepth && !result.solved && !result.contradiction && !limited;
    depth++
  ) {
    const next = reduce(result.domains, depth, true);
    result = { ...next, steps: [...result.steps, ...next.steps] };
    if (next.steps.some((s) => s.kind === 'hypothesis-refutation')) depthUsed = depth;
  }
  const eliminations = result.steps.reduce(
      (n, s) => n + (s.eliminations?.length || 0) + (s.kind === 'hypothesis-refutation' ? 1 : 0),
      0,
    ),
    hypotheses = result.steps.filter((s) => s.kind === 'hypothesis-refutation').length,
    techniques = {};
  for (const step of result.steps)
    for (const e of step.eliminations || [])
      techniques[e.technique] = (techniques[e.technique] || 0) + 1;
  return {
    solved: result.solved,
    contradiction: result.contradiction,
    limited,
    evaluations,
    maxSimultaneousHypotheses: depthUsed,
    rounds: result.steps
      .filter((s) => s.kind === 'local-propagation')
      .reduce((n, s) => n + s.rounds, 0),
    eliminations,
    refutations: hypotheses,
    techniques,
    steps: result.steps,
    remainingDomains: result.domains,
    humanCalibration: false,
    method:
      'Propagação de regras com refutações registradas de até duas hipóteses encadeadas além dos testes diretos de candidatas das regras locais; sem consulta a gabarito ou busca global.',
  };
}
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const path = process.argv[2] || '/tmp/elo-campaign-a.json',
    data = JSON.parse(fs.readFileSync(path));
  const out = path.replace('.json', '-reasoning.json'),
    records = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out)) : {};
  for (const l of data.levels) {
    if (
      records[l.id]?.solved &&
      !records[l.id]?.limited &&
      records[l.id]?.levelHash === levelHash(l) &&
      records[l.id]?.engineHash === reasoningEngineHash &&
      records[l.id]?.methodVersion === reasoningMethodVersion
    )
      continue;
    const t = performance.now(),
      r = explainElo(l, { maxEvaluations: Number(process.env.ELO_PROOF_BUDGET || 5000) });
    records[l.id] = {
      ...r,
      levelHash: levelHash(l),
      engineHash: reasoningEngineHash,
      methodVersion: reasoningMethodVersion,
    };
    fs.writeFileSync(out, JSON.stringify(records));
    console.log(
      l.id,
      r.solved,
      r.limited,
      'depth',
      r.maxSimultaneousHypotheses,
      'eval',
      r.evaluations,
      'refutes',
      r.refutations,
      'ms',
      Math.round(performance.now() - t),
    );
  }
}
