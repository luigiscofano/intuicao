// Testes e verificações de ELO.
/** Recompute complete explanation proofs from puzzle rules, never answer data. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import { ELO_CAMPAIGN as levels } from '../dist/elo-campaign.mjs';
import {
  explainElo,
  levelHash,
  reasoningEngineHash,
  reasoningMethodVersion,
} from './elo-campaign-reasoning.mjs';
import { validateElo } from '../dist/elo-rules.mjs';
const path = new URL('./elo80-proof-replay-results.json', import.meta.url),
  records = [];
const save = () =>
  fs.writeFileSync(
    path,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        engineHash: reasoningEngineHash,
        methodVersion: reasoningMethodVersion,
        total: levels.length,
        complete: records.length === 80 && records.every((r) => r.solved),
        referenceAnswerImported: false,
        records,
      },
      null,
      2,
    ) + '\n',
  );
for (const l of levels) {
  const start = performance.now(),
    p = explainElo(l, { maxDepth: 2, maxEvaluations: 20000 }),
    positions = p.remainingDomains.map((d) => (d.length === 1 ? d[0] : -1)),
    solved = p.solved && !p.limited && !p.contradiction && validateElo(l, positions).complete;
  records.push({
    number: l.campaignNumber,
    id: l.id,
    levelHash: levelHash(l),
    solved,
    limited: p.limited,
    contradiction: p.contradiction,
    evaluations: p.evaluations,
    depth: p.maxSimultaneousHypotheses,
    refutations: p.refutations,
    elapsedMs: Math.round(performance.now() - start),
  });
  save();
  console.log(solved ? 'PASS' : 'FAIL', l.campaignNumber, l.id, records.at(-1).elapsedMs + 'ms');
}
assert.equal(records.length, 80);
assert.ok(records.every((r) => r.solved));
console.log(
  JSON.stringify({
    passed: true,
    replayed: 80,
    referenceAnswerImported: false,
    artifact: path.pathname,
  }),
);
