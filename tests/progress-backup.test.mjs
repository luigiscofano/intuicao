import test from "node:test";
import assert from "node:assert/strict";
import {
  BACKUP_FORMAT,
  PROGRESS_KEYS,
  createProgressBackup,
  parseProgressBackup,
  previewProgressRestore,
  applyProgressRestore,
} from "../dist/progress-backup.mjs";
import {
  RESTORE_REVISION_KEY,
  writeProgress,
} from "../dist/progress-write-guard.mjs";
import { LOGIC_GAME_IDS, loadLogicGame } from "../dist/logica/metadata.mjs";
import { LOGIC_STORAGE_KEY } from "../dist/logica/storage.mjs";

function storage(initial = {}) {
  const values = new Map(Object.entries(initial));
  const writes = [];
  return {
    values,
    writes,
    getItem: (key) => values.get(key) ?? null,
    setItem(key, value) {
      writes.push([key, value]);
      values.set(key, value);
    },
    removeItem(key) {
      writes.push([key, null]);
      values.delete(key);
    },
  };
}
const key = "intuicao.campaign.light.progress.v1";
const envelope = (records) => ({ format: BACKUP_FORMAT, version: 1, records });

test("export preserves raw unicode, archives and extra fields without writes", () => {
  const raw =
    '{ "version": 1, "completedIds": ["luz"], "archive": {"ação":"✓"}, "extra": true }';
  const store = storage({ [key]: raw, unrelated: "private" });
  const backup = createProgressBackup(store);
  assert.deepEqual(backup.records, [{ key, raw }]);
  assert.equal(store.writes.length, 0);
  assert.equal(PROGRESS_KEYS.length, 14);
  assert.deepEqual([...PROGRESS_KEYS].sort(), [
    "intuicao.logica.v1", "intuicao.advanced-hidden", "intuicao.answers.v1",
    "intuicao.broto.v1", "intuicao.campaign.cut.progress.v1", "intuicao.campaign.light.progress.v1",
    "intuicao.campaign.original.v1", "intuicao.cerco.v1", "intuicao.collection.v1",
    "intuicao.custom.original.v1", "intuicao.endless.original.v1", "intuicao.orbita.v1",
    "intuicao.repasse.v1", "intuicao.sintonia.v1",
  ].sort());
});

test("preview is read-only, absent records never remove existing stores", () => {
  const store = storage({
    [key]: '{"version":1}',
    "intuicao.answers.v1": '{"kept":true}',
  });
  const backup = envelope([{ key, raw: '{"version":1,"completedIds":[]}' }]);
  const preview = previewProgressRestore(backup, store);
  assert.equal(store.writes.length, 0);
  applyProgressRestore(backup, preview, store);
  assert.equal(store.getItem("intuicao.answers.v1"), '{"kept":true}');
});

test("rejects incompatible, duplicate, foreign, malformed, polluted and nested input before writes", () => {
  const invalid = [
    {},
    { ...envelope([]), version: 2 },
    envelope([]),
    envelope([{ key: "other", raw: "{}" }]),
    envelope([
      { key, raw: "{}" },
      { key, raw: "{}" },
    ]),
    envelope([{ key, raw: "{broken" }]),
    envelope([{ key, raw: "[]" }]),
    envelope([{ key, raw: '{"version":2}' }]),
    envelope([{ key, raw: '{"__proto__":{}}' }]),
    envelope([{ key: "intuicao.advanced-hidden", raw: "1" }]),
    envelope([{ key, raw: '{"a":'.repeat(82) + "{}" + "}".repeat(82) }]),
  ];
  for (const value of invalid)
    assert.throws(() => parseProgressBackup(JSON.stringify(value)));
});

test("preflight race aborts without writing", () => {
  const store = storage({ [key]: "{}" });
  const backup = envelope([{ key, raw: '{"version":1}' }]);
  const preview = previewProgressRestore(backup, store);
  store.values.set(key, '{"changed":true}');
  assert.throws(() => applyProgressRestore(backup, preview, store), /mudou/);
  assert.equal(store.writes.length, 0);
});

test("quota failure on second record rolls back earlier replacement and addition", () => {
  const second = "intuicao.answers.v1";
  const store = storage({ [key]: '{"old":true}' });
  const backup = envelope([
    { key, raw: '{"new":true}' },
    { key: second, raw: '{"new":true}' },
  ]);
  const preview = previewProgressRestore(backup, store);
  const original = store.setItem.bind(store);
  let failed = false;
  store.setItem = (name, raw) => {
    if (name === second && !failed) {
      failed = true;
      throw new Error("quota");
    }
    original(name, raw);
  };
  assert.throws(
    () => applyProgressRestore(backup, preview, store),
    (error) => {
      assert.deepEqual(error.rollbackFailures, []);
      assert.equal(error.recovery.records.length, 14);
      return true;
    },
  );
  assert.equal(store.getItem(key), '{"old":true}');
  assert.equal(store.getItem(second), null);
});

test("recovery snapshot reverses additions and replacements exactly", () => {
  const store = storage({ [key]: '{ "original": true }' });
  const original = [...store.values];
  const backup = envelope([
    { key, raw: '{"new":true}' },
    { key: "intuicao.answers.v1", raw: "{}" },
  ]);
  const { recovery } = applyProgressRestore(
    backup,
    previewProgressRestore(backup, store),
    store,
  );
  const decoded = parseProgressBackup(JSON.stringify(recovery));
  const preview = previewProgressRestore(decoded, store);
  assert.equal(
    preview.find((item) => item.key === "intuicao.answers.v1").action,
    "remover",
  );
  applyProgressRestore(decoded, preview, store);
  assert.deepEqual(
    [...store.values].filter(([name]) => name !== RESTORE_REVISION_KEY),
    original,
  );
});

test("old document writers cannot overwrite imported data on pagehide or BFCache", async () => {
  const store = storage({ [key]: '{"old":true}' });
  Object.defineProperty(globalThis, "localStorage", {
    value: store,
    configurable: true,
  });
  const guard = await import(
    "../dist/progress-write-guard.mjs?independent-tab"
  );
  guard.writeProgress(store, key, '{"before":true}');
  store.setItem(RESTORE_REVISION_KEY, "restored-in-other-tab");
  store.setItem(key, '{"restored":true}');
  assert.equal(guard.canWriteProgress(store), false);
  assert.throws(() => guard.writeProgress(store, key, '{"stale":true}'));
  assert.equal(store.getItem(key), '{"restored":true}');
  delete globalThis.localStorage;
});

test("race in a store absent from import invalidates the recovery baseline", () => {
  const store = storage({ [key]: "{}" });
  const backup = envelope([{ key, raw: '{"version":1}' }]);
  const preview = previewProgressRestore(backup, store);
  store.values.set("intuicao.answers.v1", '{"newProgress":true}');
  assert.throws(() => applyProgressRestore(backup, preview, store), /mudou/);
  assert.equal(store.writes.length, 0);
});

test("rollback failures retain a complete downloadable recovery in the error", () => {
  const second = "intuicao.answers.v1";
  const store = storage({ [key]: '{"old":true}' });
  const backup = envelope([
    { key, raw: '{"new":true}' },
    { key: second, raw: "{}" },
  ]);
  const preview = previewProgressRestore(backup, store);
  const original = store.setItem.bind(store);
  store.setItem = (name, raw) => {
    if (name === second || raw === '{"old":true}') throw new Error("disk full");
    original(name, raw);
  };
  assert.throws(
    () => applyProgressRestore(backup, preview, store),
    (error) => {
      assert.deepEqual(error.rollbackFailures, [key]);
      assert.equal(
        error.recovery.records.find((item) => item.key === key).raw,
        '{"old":true}',
      );
      return true;
    },
  );
});

test("backup sintético das 14 chaves preserva Órbita v3 e lógica v1 no round-trip", () => {
  // Cada store conserva sua versão; os dados são construídos pelo teste.
  const records = PROGRESS_KEYS.map((key) => ({
    key,
    raw: key === "intuicao.advanced-hidden"
      ? "false"
      : JSON.stringify({ version: key === "intuicao.orbita.v1" ? 3 : 1 }),
  }));
  const backup = parseProgressBackup(JSON.stringify(envelope(records)));
  const orbita = backup.records.find(
    (record) => record.key === "intuicao.orbita.v1",
  );
  assert.equal(JSON.parse(orbita.raw).version, 3);
  assert.equal(JSON.parse(backup.records.find(record => record.key === LOGIC_STORAGE_KEY).raw).version, 1);
  const store = storage();
  applyProgressRestore(backup, previewProgressRestore(backup, store), store);
  for (const record of backup.records)
    assert.equal(store.getItem(record.key), record.raw);
  const roundtrip = createProgressBackup(store);
  assert.deepEqual(roundtrip.records, backup.records);
});

test("os seis jogos lógicos preservam sessões reais, pistas, histórico e conclusões no backup compartilhado", async () => {
  assert.deepEqual([...LOGIC_GAME_IDS], ["divisa", "pulso", "foz", "refugio", "mirante", "renovo"]);
  const adapters = new Map(), games = {};
  for (const id of LOGIC_GAME_IDS) {
    const adapter = await loadLogicGame(id), level = adapter.CAMPAIGN[0];
    adapters.set(id, adapter);
    games[id] = {
      completed: { [level.id]: { version: level.version, assisted: true, completedAt: "2026-11-10T12:00:00Z" } },
      sessions: { [level.id]: {
        levelId: level.id, levelVersion: level.version,
        states: [adapter.initialState(level), adapter.solutionState(level)], cursor: 0,
        failures: 3, assisted: true,
      } },
      lastLevelId: level.id,
    };
  }
  const raw = JSON.stringify({ version: 1, games, lastView: { game: "refugio", levelId: games.refugio.lastLevelId, screen: "play", active: true }, extra: { "ação": "✓" } }, null, 2);
  const source = storage({ [LOGIC_STORAGE_KEY]: raw });
  const exported = createProgressBackup(source);
  assert.deepEqual(exported.records, [{ key: LOGIC_STORAGE_KEY, raw }]);
  assert.equal(source.writes.length, 0);
  const backup = parseProgressBackup(JSON.stringify(exported));
  const target = storage({ "intuicao.cerco.v1": '{"version":1,"kept":true}', "intuicao.orbita.v1": '{"version":3,"kept":true}' });
  const before = [...target.values], preview = previewProgressRestore(backup, target);
  assert.equal(target.writes.length, 0);
  const { recovery } = applyProgressRestore(backup, preview, target);
  assert.equal(target.getItem(LOGIC_STORAGE_KEY), raw);
  for (const [name, value] of before) assert.equal(target.getItem(name), value);
  const restored = JSON.parse(target.getItem(LOGIC_STORAGE_KEY));
  for (const id of LOGIC_GAME_IDS) {
    const adapter = adapters.get(id), level = adapter.CAMPAIGN[0];
    const session = restored.games[id].sessions[level.id];
    assert.equal(session.cursor, 0); assert.equal(session.failures, 3); assert.equal(session.assisted, true);
    assert.ok(session.states.every(state => adapter.isStateValid(level, state)));
    assert.equal(adapter.checkState(level, session.states[1]).valid, true);
    assert.deepEqual(session.states[0], adapter.initialState(level));
    assert.equal(restored.games[id].completed[level.id].version, level.version);
  }
  assert.equal(recovery.records.length, 14);
  const decoded = parseProgressBackup(JSON.stringify(recovery));
  applyProgressRestore(decoded, previewProgressRestore(decoded, target), target);
  assert.deepEqual([...target.values].filter(([name]) => name !== RESTORE_REVISION_KEY), before);
});

test("o store lógico aceita versão 1 e rejeita versões futuras e chaves separadas inventadas", () => {
  const raw = '{"version":1,"games":{}}';
  const backup = parseProgressBackup(JSON.stringify(envelope([{ key: LOGIC_STORAGE_KEY, raw }])));
  assert.equal(backup.records[0].raw, raw);
  for (const version of [0, 2, 99, "1", null]) {
    assert.throws(() => parseProgressBackup(JSON.stringify(envelope([{ key: LOGIC_STORAGE_KEY, raw: JSON.stringify({ version, games: {} }) }]))));
  }
  for (const id of LOGIC_GAME_IDS) {
    assert.throws(() => parseProgressBackup(JSON.stringify(envelope([{ key: `intuicao.${id}.v1`, raw }]))));
  }
});

test("Orbita historical store versions remain raw and future versions are rejected", () => {
  for (const version of [1, 2, 3]) {
    const raw = JSON.stringify({
      version,
      catalogVersion: "legacy",
      legacyCampaignArchive: [{ opaque: true }],
    });
    const backup = parseProgressBackup(
      JSON.stringify(envelope([{ key: "intuicao.orbita.v1", raw }])),
    );
    assert.equal(backup.records[0].raw, raw);
  }
  assert.throws(() =>
    parseProgressBackup(
      JSON.stringify(
        envelope([{ key: "intuicao.orbita.v1", raw: '{"version":4}' }]),
      ),
    ),
  );
});
