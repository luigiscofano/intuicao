import test from "node:test";
import assert from "node:assert/strict";
import {
  MISSION_STORAGE_ID,
  readMissionLedger,
  recordMissionUnlocks,
} from "../dist/achievements/mission-store.mjs";
import {
  createProgressBackup,
  parseProgressBackup,
  previewProgressRestore,
  applyProgressRestore,
} from "../dist/progress-backup.mjs";
import {
  ACTION_MISSIONS,
  MISSION_CATALOG,
} from "../dist/achievements/catalog.mjs";

function createStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  const writes = [];
  return {
    values,
    writes,
    getItem: (key) => values.get(key) ?? null,
    setItem(key, value) {
      writes.push(key);
      values.set(key, value);
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

const firstMission = () => ACTION_MISSIONS[0].id;
const secondMission = () => ACTION_MISSIONS[1].id;
const firstDate = new Date("2026-11-11T14:00:00Z");
const laterDate = new Date("2026-11-12T14:00:00Z");

test("o catálogo contém duas missões distintas por cada um dos 25 jogos", () => {
  assert.equal(MISSION_CATALOG.length, 50);
  assert.equal(new Set(MISSION_CATALOG.map(({ id }) => id)).size, 50);
  const counts = new Map();
  for (const mission of MISSION_CATALOG) {
    counts.set(mission.gameId, (counts.get(mission.gameId) ?? 0) + 1);
    assert.equal(typeof mission.description, "string");
    assert(mission.description.length > 30);
    assert.equal(mission.icon, mission.id);
  }
  assert.equal(counts.size, 25);
  assert([...counts.values()].every((count) => count === 2));
});

test("ler um navegador vazio não grava nem inventa conquistas", () => {
  const storage = createStorage();
  assert.deepEqual(readMissionLedger(storage), {
    version: 1,
    unlocked: {},
    warning: null,
  });
  assert.equal(storage.writes.length, 0);
});

test("registra uma vez e conserva a data original depois de repetir a jogada", () => {
  const storage = createStorage();
  const id = firstMission();
  assert.deepEqual(recordMissionUnlocks([id, id], storage, firstDate), [id]);
  assert.deepEqual(recordMissionUnlocks([id], storage, laterDate), []);
  assert.equal(storage.writes.length, 1);
  assert.equal(
    readMissionLedger(storage).unlocked[id].unlockedAt,
    firstDate.toISOString(),
  );
});

test("relê o estado antes de gravar e mantém conquistas feitas em outra aba", () => {
  const storage = createStorage();
  recordMissionUnlocks([firstMission()], storage, firstDate);
  // A outra aba usa o mesmo armazenamento, sem compartilhar um cache do módulo.
  const anotherTab = {
    getItem: storage.getItem,
    setItem: storage.setItem.bind(storage),
  };
  recordMissionUnlocks([secondMission()], anotherTab, laterDate);
  assert.deepEqual(
    Object.keys(readMissionLedger(storage).unlocked).sort(),
    [firstMission(), secondMission()].sort(),
  );
});

test("identificadores desconhecidos e missões retroativas não entram no registro de ações", () => {
  const campaignId = MISSION_CATALOG.find(
    (mission) => !ACTION_MISSIONS.includes(mission),
  ).id;
  const storage = createStorage();
  assert.deepEqual(
    recordMissionUnlocks(
      ["__proto__", "unknown", campaignId, null],
      storage,
      firstDate,
    ),
    [],
  );
  assert.equal(storage.writes.length, 0);
});

test("versão futura, JSON inválido e envelope inválido são preservados sem sobrescrita", () => {
  for (const raw of [
    "{broken",
    JSON.stringify({ version: 2, unlocked: {} }),
    JSON.stringify({ version: 1, unlocked: [] }),
  ]) {
    const storage = createStorage({ [MISSION_STORAGE_ID]: raw });
    assert(readMissionLedger(storage).warning);
    assert.deepEqual(
      recordMissionUnlocks([firstMission()], storage, firstDate),
      [],
    );
    assert.equal(storage.getItem(MISSION_STORAGE_ID), raw);
    assert.equal(storage.writes.length, 0);
  }
});

test("a leitura descarta datas inválidas, IDs estranhos e campos extras", () => {
  const storage = createStorage({
    [MISSION_STORAGE_ID]: JSON.stringify({
      version: 1,
      unlocked: {
        [firstMission()]: {
          unlockedAt: firstDate.toISOString(),
          extra: "ignorado",
        },
        [secondMission()]: { unlockedAt: "amanhã" },
        unknown: { unlockedAt: firstDate.toISOString() },
      },
    }),
  });
  assert.deepEqual(readMissionLedger(storage).unlocked, {
    [firstMission()]: { unlockedAt: firstDate.toISOString() },
  });
  assert.equal(storage.writes.length, 0);
});

test("armazenamento indisponível e falta de espaço não interrompem a partida", () => {
  const unavailable = {
    getItem() {
      throw new Error("bloqueado");
    },
  };
  const full = {
    getItem: () => null,
    setItem() {
      throw new Error("sem espaço");
    },
  };
  assert(readMissionLedger(unavailable).warning);
  assert.deepEqual(
    recordMissionUnlocks([firstMission()], unavailable, firstDate),
    [],
  );
  assert.deepEqual(recordMissionUnlocks([firstMission()], full, firstDate), []);
  assert.deepEqual(recordMissionUnlocks([firstMission()], null, firstDate), []);
});

test("entrada inválida e data inválida não produzem escrita", () => {
  const storage = createStorage();
  assert.deepEqual(recordMissionUnlocks(null, storage, firstDate), []);
  assert.deepEqual(
    recordMissionUnlocks([firstMission()], storage, new Date("invalid")),
    [],
  );
  assert.equal(storage.writes.length, 0);
});

test("backup transporta o registro de missões e mantém sua data original", () => {
  const source = createStorage();
  recordMissionUnlocks([firstMission(), secondMission()], source, firstDate);
  const backup = parseProgressBackup(
    JSON.stringify(createProgressBackup(source, firstDate)),
  );
  const target = createStorage();
  applyProgressRestore(backup, previewProgressRestore(backup, target), target);
  assert.equal(
    target.getItem(MISSION_STORAGE_ID),
    source.getItem(MISSION_STORAGE_ID),
  );
  assert.equal(Object.keys(readMissionLedger(target).unlocked).length, 2);
});

test("um backup anterior sem missões não apaga o registro atual", () => {
  const target = createStorage();
  recordMissionUnlocks([firstMission()], target, firstDate);
  const source = createStorage({
    "intuicao.campaign.light.progress.v1": '{"version":1,"completedIds":[]}',
  });
  const backup = createProgressBackup(source, firstDate);
  applyProgressRestore(backup, previewProgressRestore(backup, target), target);
  assert.equal(
    readMissionLedger(target).unlocked[firstMission()].unlockedAt,
    firstDate.toISOString(),
  );
});
