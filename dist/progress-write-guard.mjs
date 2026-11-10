// Uma restauração invalida os caches de todas as abas, inclusive no pagehide.
export const RESTORE_REVISION_KEY = "intuicao.restore-revision.v1";
let frozen = false;
let initialRevision = null;
try {
  initialRevision =
    globalThis.localStorage?.getItem(RESTORE_REVISION_KEY) ?? null;
} catch {}

export function freezeProgressWrites() {
  frozen = true;
}

export function canWriteProgress(storage) {
  let browserStorage;
  try {
    browserStorage = globalThis.localStorage;
    if (!browserStorage || storage !== browserStorage) return true;
    return !frozen && storage.getItem(RESTORE_REVISION_KEY) === initialRevision;
  } catch {
    return false;
  }
}

export function writeProgress(storage, key, raw) {
  if (!storage || !canWriteProgress(storage)) {
    throw new Error(
      "O progresso mudou em outra restauração. Recarregue a página antes de jogar.",
    );
  }
  storage.setItem(key, raw);
}
