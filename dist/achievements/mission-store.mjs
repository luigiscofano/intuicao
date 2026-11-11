import { writeProgress } from "../progress-write-guard.mjs";
import { ACTION_MISSION_IDS } from "./catalog.mjs";

export const MISSION_STORAGE_ID = "intuicao.missions.v1";
export const MISSION_UNLOCK_EVENT = "intuicao:missions-unlocked";
const MAX_LEDGER_LENGTH = 64 * 1024;

function browserStorage() {
  try {
    return globalThis.localStorage;
  } catch {
    return null;
  }
}

function emptyLedger(warning = null) {
  return { version: 1, unlocked: {}, warning };
}

function isRecord(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function validTimestamp(value) {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

export function readMissionLedger(storage = browserStorage()) {
  if (!storage) {
    return emptyLedger(
      "As missões não puderam acessar o progresso deste navegador.",
    );
  }
  try {
    const raw = storage.getItem(MISSION_STORAGE_ID);
    if (raw === null) return emptyLedger();
    if (typeof raw !== "string" || raw.length > MAX_LEDGER_LENGTH) {
      throw new Error("Registro de missões inválido.");
    }
    const parsed = JSON.parse(raw);
    if (
      !isRecord(parsed) ||
      parsed.version !== 1 ||
      !isRecord(parsed.unlocked)
    ) {
      throw new Error("Formato de missões incompatível.");
    }
    // Aceita somente identificadores conhecidos e a data da primeira conquista.
    const unlocked = Object.fromEntries(
      Object.entries(parsed.unlocked)
        .filter(
          ([id, entry]) =>
            ACTION_MISSION_IDS.has(id) &&
            isRecord(entry) &&
            validTimestamp(entry.unlockedAt),
        )
        .map(([id, entry]) => [id, { unlockedAt: entry.unlockedAt }]),
    );
    return { version: 1, unlocked, warning: null };
  } catch {
    // Um registro ilegível permanece intacto; jogar não o substitui silenciosamente.
    return emptyLedger(
      "O registro de missões não pôde ser lido. Ele foi preservado.",
    );
  }
}

export function recordMissionUnlocks(
  ids,
  storage = browserStorage(),
  date = new Date(),
) {
  if (
    !Array.isArray(ids) ||
    !storage ||
    !(date instanceof Date) ||
    !Number.isFinite(date.getTime())
  ) {
    return [];
  }
  // Relê antes de gravar para preservar conquistas registradas em outra aba.
  const ledger = readMissionLedger(storage);
  if (ledger.warning) return [];
  const discovered = [...new Set(ids)].filter(
    (id) => ACTION_MISSION_IDS.has(id) && !Object.hasOwn(ledger.unlocked, id),
  );
  if (!discovered.length) return [];
  const unlockedAt = date.toISOString();
  for (const id of discovered) ledger.unlocked[id] = { unlockedAt };
  try {
    writeProgress(
      storage,
      MISSION_STORAGE_ID,
      JSON.stringify({
        version: 1,
        unlocked: ledger.unlocked,
      }),
    );
  } catch {
    // Falha no salvamento de uma conquista não interrompe a partida.
    return [];
  }
  if (
    typeof globalThis.dispatchEvent === "function" &&
    typeof CustomEvent === "function"
  ) {
    globalThis.dispatchEvent(
      new CustomEvent(MISSION_UNLOCK_EVENT, {
        detail: { ids: discovered },
      }),
    );
  }
  return discovered;
}
