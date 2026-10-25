// Run after the compiler has written the final 500-level artifacts.
// A missing/incomplete artifact fails rather than silently skipping the suite.
import assert from 'node:assert/strict';
import {lightLevels} from '../dist/light-levels.mjs';
import {validateRecord} from './light-v4-record-validation.mjs';
import {auditCampaign} from './light-v4-campaign-audit.mjs';
import {artifactURL, expectedBand, isMain, printReport, readJSON} from './light-v4-artifacts.mjs';

export function testCompiledEvidence({records = readJSON(artifactURL('evidence-records.json.gz')), runtimeLevels = lightLevels} = {}) {
  assert.ok(Array.isArray(records), 'Evidence must be an array.');
  assert.equal(records.length, 500, 'Exactly 500 compiled evidence records are required.');
  assert.equal(runtimeLevels.length, 500, 'The runtime must contain the same final 500 levels.');
  const ids = new Set();
  for (const [i, record] of records.entries()) {
    const level = record.level;
    assert.ok(level && record.editorial, 'Missing level/editorial at position ' + (i + 1));
    assert.ok(!ids.has(level.id), 'Duplicate stable ID ' + level.id); ids.add(level.id);
    assert.equal(level.campaignNumber, i + 1, 'Evidence position does not match display number.');
    assert.equal(level.campaignBand, expectedBand(i), 'Evidence position does not match its band.');
    assert.equal(level.width ?? 800, 800, 'The board width must remain 800.');
    assert.equal(level.height ?? 460, 460, 'The board height must remain 460.');
    assert.deepEqual(runtimeLevels[i], level, 'Runtime/evidence mismatch for ' + level.id);
    if ([record.editorial.primaryConcept, ...(record.editorial.complementaryConcepts ?? [])].includes(16)) {
      const base = record.editorial.pairedLevelId ?? record.editorial.detailChange?.baseId;
      assert.ok(base && base !== level.id && ids.has(base), 'Concept16 requires its actual earlier comparison base: ' + level.id);
    }
  }
  // Regression guard: neither multiple tags nor a truthy string can satisfy
  // the quota. These are in-memory accounting fixtures, not campaign records.
  const accountingFixtures = [undefined, true, 'true'].map((flag, i) => ({
    level: {...records[0].level, id: 'accounting-fixture-' + i, campaignBand: 'basic'},
    editorial: {suggestedBand:'basic',primaryConcept:7,complementaryConcepts:[5],combinationIsRelated:flag}
  }));
  const accounting = auditCampaign(accountingFixtures, {complete:false});
  assert.equal(accounting.combinations.basic, 1, 'Only literal reviewed true counts as a related combination.');
  assert.equal(accounting.taggedButUncertifiedCombinations.basic, 2);
  const results = records.map(record => validateRecord(record));
  const distribution = auditCampaign(records, {complete: true});
  const failedRecords = results.filter(result => !result.passed).map(result => ({id: result.id, errors: result.errors}));
  const rays = results.flatMap(result => result.reference.rays);
  return {
    passed: failedRecords.length === 0 && distribution.passed,
    total: records.length,
    failedRecords,
    metrics: {
      referenceSolutions: results.filter(result => result.reference.status === 'target').length,
      initiallyUnsolved: results.filter(result => result.initial.status !== 'target').length,
      counterexampleAndAlternativeCases: results.reduce((sum, result) => sum + result.cases.length, 0),
      individualFiringOrders: results.reduce((sum, result) => sum + result.orders.length, 0),
      collisionFiringOrders: results.reduce((sum, result) => sum + result.clickConflictOrders.length, 0),
      halfDegreeIndividualTests: results.reduce((sum, result) => sum + result.individualPerturbations, 0),
      halfDegreeSimultaneousCornerTests: results.reduce((sum, result) => sum + result.simultaneousCorners, 0),
      recordsWithExhaustiveCorners: results.filter(result => result.cornersExhaustive).length,
      idea7Certificates: results.filter(result => result.openConflictCertified).length,
      maximumObservedBouncesPerRay: Math.max(0, ...rays.map(ray => ray.bounces)),
      maximumObservedEventsPerRay: Math.max(0, ...rays.map(ray => ray.mirrors.length + ray.portals.length + 1))
    },
    distribution,
    limitations: [
      'Real-engine reference/counterexample replay, every source-firing order, and finite angular margins; not a continuous-angle uniqueness proof.',
      'Finite author shortcut searches and editorial causal claims are archived evidence, not automatically re-proved by this suite.',
      'Combination quotas require editorial.combinationIsRelated === true in addition to multiple concepts; tags alone are insufficient.',
      'No native-browser input precision, responsive layout, accessibility or human difficulty calibration claim.'
    ]
  };
}
if (isMain(import.meta.url)) {
  try {
    const report = testCompiledEvidence();
    printReport(report, process.argv[2]);
    if (!report.passed) process.exitCode = 1;
  } catch (error) {
    printReport({passed:false,error:error.message,limitations:'The full compiled campaign test did not complete. No successful skip or partial campaign approval.'});
    process.exitCode = 1;
  }
}
