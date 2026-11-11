import {
  freezeProgressWrites,
  RESTORE_REVISION_KEY,
} from "./progress-write-guard.mjs";

export const BACKUP_FORMAT = "intuicao-progress-backup";
export const MAX_BACKUP_BYTES = 16 * 1024 * 1024;
const MAX_RECORD_BYTES = 8 * 1024 * 1024;
// Versões do envelope de cada store, não das regras nem do catálogo interno.
// Órbita evoluiu até v3; versões anteriores continuam sob a migração do jogo.
const STORAGE_VERSIONS = Object.freeze({
  "intuicao.logica.v1": [1],
  "intuicao.broto.v1": [1],
  "intuicao.campaign.cut.progress.v1": [1],
  "intuicao.campaign.light.progress.v1": [1],
  "intuicao.cerco.v1": [1],
  "intuicao.collection.v1": [1],
  "intuicao.orbita.v1": [1, 2, 3],
  "intuicao.repasse.v1": [1],
  "intuicao.sintonia.v1": [1],
});
export const PROGRESS_KEYS = Object.freeze([
  "intuicao.logica.v1",
  "intuicao.advanced-hidden",
  "intuicao.answers.v1",
  "intuicao.broto.v1",
  "intuicao.campaign.cut.progress.v1",
  "intuicao.campaign.light.progress.v1",
  "intuicao.campaign.original.v1",
  "intuicao.cerco.v1",
  "intuicao.collection.v1",
  "intuicao.custom.original.v1",
  "intuicao.endless.original.v1",
  "intuicao.orbita.v1",
  "intuicao.repasse.v1",
  "intuicao.sintonia.v1",
]);
const bytes = (value) => new TextEncoder().encode(value).byteLength;
const object = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

function validateTree(value, depth = 0) {
  if (depth > 80)
    throw new Error("O arquivo contém dados profundamente aninhados.");
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (["__proto__", "prototype", "constructor"].includes(key)) {
      throw new Error("O arquivo contém uma propriedade não permitida.");
    }
    validateTree(child, depth + 1);
  }
}

function validateRaw(key, raw) {
  if (raw === null) return; // Ausência explícita só aparece em cópias de recuperação.
  if (typeof raw !== "string" || bytes(raw) > MAX_RECORD_BYTES) {
    throw new Error(`Registro inválido ou muito grande: ${key}.`);
  }
  if (key === "intuicao.advanced-hidden") {
    if (!["true", "false"].includes(raw))
      throw new Error("Preferência avançada inválida.");
    return;
  }
  let value;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error(`JSON inválido: ${key}.`);
  }
  if (!object(value)) throw new Error(`O registro deve ser um objeto: ${key}.`);
  validateTree(value);
  // Versões de catálogo internas permanecem intactas; os jogos cuidam do legado.
  const supportedVersions = STORAGE_VERSIONS[key];
  if (
    supportedVersions &&
    "version" in value &&
    !supportedVersions.includes(value.version)
  ) {
    throw new Error(`Versão de armazenamento não suportada: ${key}.`);
  }
}

export function createProgressBackup(
  storage,
  date = new Date(),
  includeAbsent = false,
) {
  const records = PROGRESS_KEYS.flatMap((key) => {
    const raw = storage.getItem(key);
    return raw === null && !includeAbsent ? [] : [{ key, raw }];
  });
  return {
    format: BACKUP_FORMAT,
    version: 1,
    exportedAt: date.toISOString(),
    records,
  };
}

export function parseProgressBackup(text) {
  if (typeof text !== "string" || bytes(text) > MAX_BACKUP_BYTES) {
    throw new Error("O backup excede o limite de 16 MB.");
  }
  let backup;
  try {
    backup = JSON.parse(text);
  } catch {
    throw new Error("O arquivo não é um JSON válido.");
  }
  if (
    !object(backup) ||
    backup.format !== BACKUP_FORMAT ||
    backup.version !== 1 ||
    !Array.isArray(backup.records)
  ) {
    throw new Error(
      "Este arquivo não é um backup de progresso compatível do Intuição.",
    );
  }
  if (!backup.records.length || backup.records.length > PROGRESS_KEYS.length) {
    throw new Error("O backup está vazio ou contém registros demais.");
  }
  validateTree(backup);
  const seen = new Set();
  for (const record of backup.records) {
    if (
      !object(record) ||
      !PROGRESS_KEYS.includes(record.key) ||
      seen.has(record.key)
    ) {
      throw new Error("O backup contém uma chave desconhecida ou repetida.");
    }
    seen.add(record.key);
    validateRaw(record.key, record.raw);
  }
  return backup;
}

export function previewProgressRestore(backup, storage) {
  // Revalidamos também objetos recebidos por chamada direta, não apenas arquivos.
  const valid = parseProgressBackup(JSON.stringify(backup));
  const preview = valid.records.map(({ key, raw }) => {
    const previous = storage.getItem(key);
    return {
      key,
      raw,
      previous,
      action:
        previous === raw
          ? "igual"
          : raw === null
            ? "remover"
            : previous === null
              ? "adicionar"
              : "substituir",
    };
  });
  // Inclui stores não importados: a cópia anterior precisa refletir o mesmo instante.
  preview.baseline = PROGRESS_KEYS.map((key) => [key, storage.getItem(key)]);
  return preview;
}

export function applyProgressRestore(backup, preview, storage) {
  const current = previewProgressRestore(backup, storage);
  if (
    JSON.stringify(current) !== JSON.stringify(preview) ||
    JSON.stringify(current.baseline) !== JSON.stringify(preview.baseline)
  ) {
    throw new Error(
      "O progresso mudou desde a prévia. Abra uma nova prévia antes de restaurar.",
    );
  }
  const recovery = createProgressBackup(storage, new Date(), true);
  // Só alteramos dados quando a cópia anterior também pode ser restaurada.
  parseProgressBackup(JSON.stringify(recovery));
  const changed = current.filter((record) => record.action !== "igual");
  if (!changed.length) return { changed: 0, recovery };
  // A revisão bloqueia qualquer aba carregada antes desta transação.
  storage.setItem(
    RESTORE_REVISION_KEY,
    `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );
  freezeProgressWrites();
  const written = [];
  try {
    for (const record of changed) {
      written.push(record);
      if (record.raw === null) storage.removeItem(record.key);
      else storage.setItem(record.key, record.raw);
    }
  } catch (cause) {
    const rollbackFailures = [];
    for (const record of written.reverse()) {
      try {
        if (record.previous === null) storage.removeItem(record.key);
        else storage.setItem(record.key, record.previous);
      } catch {
        rollbackFailures.push(record.key);
      }
    }
    const error = new Error(
      rollbackFailures.length
        ? "Falha ao restaurar e recuperar alguns registros. Baixe a cópia de segurança e não feche esta página."
        : "Não foi possível restaurar. Os registros anteriores foram recuperados; recarregue antes de continuar.",
    );
    error.recovery = recovery;
    error.rollbackFailures = rollbackFailures;
    error.cause = cause;
    throw error;
  }
  return { changed: changed.length, recovery };
}

