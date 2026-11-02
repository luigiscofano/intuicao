// Testes e verificações de ELO.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ELO_CAMPAIGN as levels } from '../dist/elo-campaign.mjs';
import { ELO_CAMPAIGN_ANSWERS as answers } from '../dist/elo-campaign-answers.mjs';
import { validateElo } from '../dist/elo-rules.mjs';
import { canonical } from './elo-campaign-build.mjs';
import {
  levelHash,
  reasoningEngineHash,
  reasoningMethodVersion,
} from './elo-campaign-reasoning.mjs';
const certificates = JSON.parse(
  fs.readFileSync(new URL('./elo-campaign-certificates.json', import.meta.url)),
);
assert.equal(levels.length, 200);
assert.equal(new Set(levels.map((l) => l.id)).size, 200);
assert.equal(
  new Set(levels.map(canonical)).size,
  200,
  'No region layout repeats under rotation/reflection/relabeling',
);
const keys = [
  [],
  ['shapes'],
  ['passages'],
  ['forbiddenEdges'],
  ['rowCounts', 'colCounts'],
  ['distances'],
  ['neighbors'],
  ['order'],
  ['cuts'],
  ['exclusivePassages'],
];
for (const [index, l] of levels.entries()) {
  assert.equal(l.campaignNumber, index + 1);
  assert.equal(l.stage, Math.floor(index / 20) + 1);
  assert.equal(l.stagePosition, (index % 20) + 1);
  assert.ok(l.stageName && l.difficulty && l.logicIdea);
  assert.ok(Array.isArray(l.mechanics));
  for (const key of Object.keys(l.constraints ?? {}))
    assert.ok(keys.slice(0, l.stage).flat().includes(key), l.id + ' no future mechanic');
  if (l.stage > 1 && l.stagePosition <= 2)
    assert.ok(
      keys[l.stage - 1].some((key) => Object.keys(l.constraints?.[key] ?? {}).length),
      l.id + ' introduces its new family',
    );
  assert.ok(validateElo(l, { positions: answers[l.id] }).complete, l.id + ' verified solution');
  const start = answers[l.id].map((_, r) => l.fixed?.[r] ?? -1);
  assert.ok(!validateElo(l, { positions: start }).complete, l.id + ' not pre-solved');
  assert.equal(l.uniqueness.status, 'unique');
  assert.equal(l.uniqueness.count, 1);
  assert.equal(l.uniqueness.exhaustive, true);
  const proof = certificates.levels[l.id];
  assert.ok(proof?.solved && !proof.limited && !proof.contradiction, l.id + ' complete proof');
  assert.equal(proof.levelHash, levelHash(l));
  assert.equal(proof.engineHash, reasoningEngineHash);
  assert.equal(proof.methodVersion, reasoningMethodVersion);
  assert.equal(l.reasoningTrace.status, 'complete');
  assert.equal(l.reasoningTrace.levelHash, levelHash(l));
  assert.ok(l.reasoningTrace.summary.length);
  assert.ok(proof.maxSimultaneousHypotheses <= 2);
  assert.equal(proof.humanCalibration, false);
}
const compact = levels.filter((l) => l.rows <= 6 && l.cols <= 6),
  large = levels.filter((l) => l.rows >= 10 && l.cols >= 10),
  lateCompact = compact.filter((l) => l.campaignNumber > 80);
assert.ok(compact.length >= 60);
assert.ok(large.length >= 40);
assert.ok(lateCompact.length >= 30);
assert.ok(lateCompact.some((l) => ['avançado', 'especialista'].includes(l.difficulty)));
assert.ok(
  levels.filter((l) => l.campaignNumber > 80 && l.mechanics.length === 1).length >= 3,
  'hard classical interludes continue',
);
console.log(
  JSON.stringify({
    passed: true,
    total: levels.length,
    stages: 10,
    compact: compact.length,
    large: large.length,
    compactAfter80: lateCompact.length,
    certificates: 200,
    unique: 200,
  }),
);
