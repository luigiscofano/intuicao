// Testes e verificações de ELO.
import assert from 'node:assert/strict';
import { migrateEloProgress } from '../dist/elo-progress.mjs';
const levels = [{ id: 'elo-v3-021' }, { id: 'elo-v4-076' }];
const history = {
  past: [{ positions: [1] }],
  present: { positions: [2] },
  future: [{ positions: [3] }],
};
const data = {
  sessions: {
    'elo-v3-021': { history },
    'elo-v3-076': { history, assistance: true },
    'custom:elo:elo-v3-077': { history },
    'endless:elo': { history },
    'pacto-001': { history },
  },
  completed: ['elo-v3-021', 'elo-v3-076', 'pacto-001'],
  lastSessions: { elo: 'elo-v3-076', pacto: 'pacto-001' },
};
const original = structuredClone(data);
const raw = JSON.stringify({
  'elo:elo-v3-076': { failures: 3, assisted: true },
  'elo:elo-v3-021': { failures: 1, assisted: false },
});
let writes = 0;
const store = { getItem: () => raw, setItem: () => writes++ };
assert.equal(migrateEloProgress(data, levels, store), true);
assert.deepEqual(data.sessions, original.sessions);
assert.deepEqual(data.completed, original.completed);
assert.equal(data.lastSessions.elo, undefined);
assert.equal(data.lastSessions.pacto, 'pacto-001');
assert.deepEqual(
  data.eloLegacy.campaign80.records['elo-v3-076'].session,
  original.sessions['elo-v3-076'],
);
assert.deepEqual(data.eloLegacy.campaign80.records['elo-v3-076'].answer, {
  failures: 3,
  assisted: true,
});
assert.deepEqual(Object.keys(data.eloLegacy.campaign80.records), ['elo-v3-076']);
assert.equal(data.sessions['elo-v4-076'], undefined);
assert.equal(writes, 0);
assert.equal(migrateEloProgress(data, levels, store), false);
const kept = { lastSessions: { elo: 'elo-v3-021' }, sessions: {}, completed: [] };
assert.equal(migrateEloProgress(kept, levels, { getItem: () => null }), false);
assert.equal(kept.lastSessions.elo, 'elo-v3-021');
assert.equal(
  migrateEloProgress({ sessions: {}, completed: [] }, levels, {
    getItem() {
      throw Error('blocked');
    },
  }),
  false,
);
console.log(
  'PASS ELO80 identity-safe archival, unchanged IDs, no ordinal mapping, custom/endless/other-game isolation, idempotence and unavailable storage.',
);
