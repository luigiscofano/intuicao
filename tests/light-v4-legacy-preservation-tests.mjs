// Logical identity/history preservation against the selected campaign and its
// archived 200 originals. Uses in-memory storage fixtures, never user storage.
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {lightLevels} from '../dist/light-levels.mjs';
import {createLightCampaignProgress, LIGHT_CAMPAIGN_PROGRESS_KEY} from '../dist/light-campaign-progress.mjs';
import {artifactURL, expectedBand, isMain, printReport, readJSON} from './light-v4-artifacts.mjs';

const sha = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const puzzleFields = ['objects','sources','targets','portals','solution','sourceAngle','target','requiredBounces'];
export const puzzleFingerprint = level => sha(Object.fromEntries(puzzleFields.map(key => [key, level[key]])));
// Logical digest of the 200 pre-task definitions at baseline
// 50d2d4338a37b52187cb2aed39449a3842ff2e8e. Presentation/position metadata is not
// puzzle content; original IDs, old numbers and exact puzzle hashes are pinned.
const BASELINE_LEGACY_DIGEST = 'a3b5c9202d602a6450b060c0534aea7c40026c4419049da92a959ddd50ffa8f0';
const oldNumber = level => level.campaignNumber ?? level.number;

export function testLegacyPreservation({
  records = readJSON(artifactURL('evidence-records.json.gz')),
  selection = readJSON(artifactURL('selection.json')),
  legacyMap = readJSON(artifactURL('legacy-map.json')),
  original = readJSON(artifactURL('legacy-200.json')),
  runtimeLevels = lightLevels
} = {}) {
  for (const [name, value, length] of [['evidence',records,500],['selection',selection,500],['runtime',runtimeLevels,500],['legacy-map',legacyMap,200],['legacy archive',original,200]]) {
    assert.ok(Array.isArray(value), name + ' must be an array.');
    assert.equal(value.length, length, name + ' must have ' + length + ' entries.');
  }
  const originalIds = new Set(original.map(level => level.id));
  assert.equal(originalIds.size, 200, 'The original archive must have 200 distinct IDs.');
  assert.equal(sha(original.map(level => ({id:level.id,oldNumber:oldNumber(level),puzzleHash:puzzleFingerprint(level)}))), BASELINE_LEGACY_DIGEST, 'The archive no longer matches the actual pre-task puzzle definitions.');
  const originals = new Map(original.map(level => [level.id, level]));
  const mapById = new Map(legacyMap.map(entry => [entry.id, entry]));
  assert.equal(mapById.size, 200, 'Duplicate ID in legacy-map.');
  for (const id of mapById.keys()) assert.ok(originalIds.has(id), 'Unknown ID in legacy-map: ' + id);
  const positions = new Map(records.map((record, i) => [record.level.id, i + 1]));
  assert.equal(positions.size, 500, 'Selected identities must be unique.');
  let retained = 0, retired = 0, reclassified = 0, reviewedRelatedCombinations = 0;
  for (const [i, entry] of selection.entries()) {
    const record = records[i], level = record.level;
    assert.equal(entry.id, level.id, 'Selection/evidence identity mismatch at ' + (i + 1));
    assert.equal(runtimeLevels[i].id, entry.id, 'Selection/runtime identity mismatch at ' + (i + 1));
    assert.deepEqual(runtimeLevels[i], level, 'Runtime data do not match the reviewed evidence for ' + entry.id);
    assert.equal(entry.band, expectedBand(i), 'Selection band differs from its display range.');
    assert.equal(level.campaignBand, entry.band);
    assert.equal(level.campaignNumber, i + 1);
    assert.equal(level.number, i + 1);
    assert.ok(typeof entry.file === 'string' && entry.file.length > 0, 'Selection must retain its authoring source reference.');
    assert.equal(entry.review?.approved, true, 'An explicit editorial approval is required: ' + entry.id);
    assert.ok(typeof entry.review.reason === 'string' && entry.review.reason.trim().length > 25, 'Editorial approval needs a substantive reason: ' + entry.id);
    assert.deepEqual(record.editorial.review, entry.review, 'The compiled review must match selection.json.');
    if (entry.band !== record.editorial.suggestedBand) {
      assert.ok(typeof entry.review.reclassificationReason === 'string' && entry.review.reclassificationReason.trim().length > 40, 'A changed difficulty needs its own rationale: ' + entry.id);
      reclassified++;
    }
    const related = entry.review.relatedCombination === true;
    assert.equal(record.editorial.combinationIsRelated, related, 'A combination must be explicitly reviewed true, not inferred from tags or a truthy string.');
    if (related) reviewedRelatedCombinations++;
    assert.equal(record.developmentFingerprint, puzzleFingerprint(level), 'Compiled fingerprint mismatch: ' + entry.id);
    if (originals.has(entry.id)) {
      assert.equal(puzzleFingerprint(level), puzzleFingerprint(originals.get(entry.id)), 'An unchanged legacy ID cannot identify changed puzzle content: ' + entry.id);
    } else {
      assert.ok(!entry.id.startsWith('light-v3-'), 'New content cannot appropriate an unused or retired v3 identity: ' + entry.id);
    }
  }
  for (const old of original) {
    const mapped = mapById.get(old.id), selectedNumber = positions.get(old.id) ?? null;
    assert.ok(mapped, 'Missing mapping for ' + old.id);
    assert.equal(mapped.oldNumber, oldNumber(old), 'Incorrect original display number for ' + old.id);
    assert.equal(mapped.newNumber, selectedNumber, 'Incorrect selection mapping for ' + old.id);
    assert.equal(mapped.puzzleHash, puzzleFingerprint(old), 'Incorrect archived content hash for ' + old.id);
    assert.ok(typeof mapped.treatment === 'string' && mapped.treatment.trim().length > 20, 'Missing explicit legacy treatment for ' + old.id);
    if (selectedNumber === null) retired++; else retained++;
  }

  // Completing an old display slot is not completing a new puzzle in that slot.
  // Retired IDs stay in storage; the catalogue may omit them but must not delete
  // their history, transfer their completion, or fabricate a global reset.
  const unrelated = new Map([
    ['intuicao.campaign.original.v1', JSON.stringify({'light:legacy-sentinel':{draft:true},'cut:corte-sentinel':{keep:true}})],
    ['intuicao.answers.v1', JSON.stringify({'light:legacy-sentinel':{failures:4,assisted:true}})],
    ['intuicao.endless.original.v1', JSON.stringify({light:{seed:17,count:9}})],
    ['intuicao.custom.original.v1', JSON.stringify({keep:'custom'})]
  ]);
  const stored = new Map(unrelated), writes = [];
  stored.set(LIGHT_CAMPAIGN_PROGRESS_KEY, JSON.stringify({version:1,completedIds:[...originalIds],lastLevelId:original[0].id,auditSentinel:'preserve-unknown-fields'}));
  const storage = {getItem:key=>stored.get(key)??null,setItem:(key,value)=>{writes.push(key);stored.set(key,value);}};
  const progress = createLightCampaignProgress(storage), before = progress.snapshot();
  assert.equal(writes.length, 0, 'Reading old progress must not rewrite it.');
  for (const id of originalIds) assert.ok(before.completedIds.has(id), 'An old or retired completion was lost: ' + id);
  const newLevels = runtimeLevels.filter(level => !originalIds.has(level.id));
  for (const level of newLevels) assert.equal(before.completedIds.has(level.id), false, 'A new identity inherited completion from a reused number: ' + level.id);
  if (newLevels.length) {
    progress.complete(newLevels[0].id);
    const after = createLightCampaignProgress(storage).snapshot();
    for (const id of originalIds) assert.ok(after.completedIds.has(id), 'Saving new progress erased old history: ' + id);
    assert.ok(after.completedIds.has(newLevels[0].id));
    for (const level of newLevels.slice(1)) assert.equal(after.completedIds.has(level.id), false, 'Completing one new identity completed another.');
    assert.equal(JSON.parse(stored.get(LIGHT_CAMPAIGN_PROGRESS_KEY)).auditSentinel, 'preserve-unknown-fields');
  }
  for (const [key, value] of unrelated) assert.equal(stored.get(key), value, 'Unrelated storage changed: ' + key);
  assert.ok(writes.every(key => key === LIGHT_CAMPAIGN_PROGRESS_KEY));
  return {
    passed:true,total:records.length,legacyDefinitions:original.length,retainedLegacyIds:retained,archivedLegacyIds:retired,
    newIdentities:newLevels.length,reclassified,reviewedRelatedCombinations,baselineLegacyDigest:BASELINE_LEGACY_DIGEST,
    limits:[
      'Selection/identity/content-hash consistency and synthetic ID-keyed storage semantics only; no real user storage is accessed.',
      'Authoring source file references are retained for traceability but are not fetched from another workspace.',
      'Unchanged legacy puzzle content is exact for the compiler fingerprint fields; presentation and campaign numbering may change.',
      'Separate integration/history tests cover the exact app patch and unrelated runtime/visual byte preservation.'
    ]
  };
}
if (isMain(import.meta.url)) {
  try {
    printReport(testLegacyPreservation(), process.argv[2]);
  } catch (error) {
    printReport({passed:false,error:error.message,limits:'Preservation test did not complete; missing final artifacts are not a successful skip.'});
    process.exitCode = 1;
  }
}
