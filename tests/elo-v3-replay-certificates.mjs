// Auditoria e verificação de ELO.
/** Recompute bounded explanations without passing or importing a reference answer. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {
  explainElo,
  levelHash,
  reasoningEngineHash,
  reasoningMethodVersion,
} from './elo-campaign-reasoning.mjs';
import { validateElo } from '../dist/elo-rules.mjs';
const path = process.argv[2];
const data = path
  ? JSON.parse(fs.readFileSync(path))
  : { levels: (await import('../dist/elo-campaign.mjs')).ELO_CAMPAIGN, pendingRedesign: [] };
const pending = new Set(data.pendingRedesign ?? []),
  records = [];
const resultPath = new URL('./elo-v3-proof-replay-results.json', import.meta.url);
let cache = {};
if (fs.existsSync(resultPath)) {
  const previous = JSON.parse(fs.readFileSync(resultPath));
  if (
    previous.engineHash === reasoningEngineHash &&
    previous.methodVersion === reasoningMethodVersion
  )
    cache = Object.fromEntries(previous.records.filter((r) => r.solved).map((r) => [r.id, r]));
}
const save = () =>
  fs.writeFileSync(
    new URL('./elo-v3-proof-replay-results.json', import.meta.url),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        engineHash: reasoningEngineHash,
        methodVersion: reasoningMethodVersion,
        input: path ?? 'dist/elo-campaign.mjs',
        total: data.levels.length,
        complete: records.length === data.levels.length && records.every((r) => r.solved),
        records,
      },
      null,
      2,
    ) + '\n',
  );
for (const l of data.levels) {
  if (pending.has(l.campaignNumber) || pending.has(l.id)) {
    records.push({ id: l.id, levelHash: levelHash(l), solved: false, status: 'pending-redesign' });
    save();
    continue;
  }
  if (cache[l.id]?.levelHash === levelHash(l)) {
    records.push({ ...cache[l.id], reusedMatchingVerification: true });
    save();
    console.log('PASS', l.id, 'matching verified hash');
    continue;
  }
  const t = performance.now(),
    r = explainElo(l, { maxDepth: 2, maxEvaluations: 10000 });
  const positions = r.remainingDomains.map((d) => (d.length === 1 ? d[0] : -1)),
    valid = r.solved && !r.limited && !r.contradiction && validateElo(l, { positions }).complete;
  records.push({
    id: l.id,
    levelHash: levelHash(l),
    solved: valid,
    limited: r.limited,
    evaluations: r.evaluations,
    depth: r.maxSimultaneousHypotheses,
    refutations: r.refutations,
    elapsedMs: Math.round(performance.now() - t),
  });
  save();
  console.log(valid ? 'PASS' : 'FAIL', l.id, records.at(-1).elapsedMs + 'ms');
}
console.log(
  JSON.stringify({
    total: records.length,
    passed: records.filter((r) => r.solved).length,
    incomplete: records.filter((r) => !r.solved).map((r) => r.id),
  }),
);
process.exitCode = records.every((r) => r.solved) ? 0 : 1;
