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
  assert.equal(PROGRESS_KEYS.length, 13);
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
      assert.equal(error.recovery.records.length, 13);
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

test("backup sintético com Órbita v3 preserva versões e registros no round-trip", () => {
  // Dados construídos no teste: nenhum snapshot de navegador ou sessão pessoal.
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
  const store = storage();
  applyProgressRestore(backup, previewProgressRestore(backup, store), store);
  for (const record of backup.records)
    assert.equal(store.getItem(record.key), record.raw);
  const roundtrip = createProgressBackup(store);
  assert.deepEqual(roundtrip.records, backup.records);
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
