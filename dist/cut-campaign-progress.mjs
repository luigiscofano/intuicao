// Persistência das conclusões e da última fase de Corte certo, por identidade da fase.
// Apenas conclusões e última fase da campanha Corte certo, sempre pela identidade.
// Rascunhos, gabaritos, outros jogos, fases próprias e Endless têm stores próprios.
export const CUT_CAMPAIGN_PROGRESS_KEY = 'intuicao.campaign.cut.progress.v1';
const validId = (id) => typeof id === 'string' && id.length > 0 && id.length <= 200;

export function createCutCampaignProgress(storage) {
  if (arguments.length === 0) {
    try {
      storage = globalThis.localStorage;
    } catch {}
  }
  const completedIds = new Set();
  let lastLevelId = null,
    lastRaw,
    extra = {},
    writable = false;
  function refresh() {
    try {
      const raw = storage?.getItem(CUT_CAMPAIGN_PROGRESS_KEY) ?? null;
      if (raw === lastRaw) return;
      lastRaw = raw;
      writable = false;
      if (raw === null) {
        extra = {};
        writable = !!storage;
        return;
      }
      if (raw.length > 2000000) return;
      const saved = JSON.parse(raw);
      if (
        !saved ||
        typeof saved !== 'object' ||
        Array.isArray(saved) ||
        saved.version !== 1 ||
        !Array.isArray(saved.completedIds)
      )
        return;
      // Aproveita identidades válidas sem descartar o registro bruto malformado.
      for (const id of saved.completedIds) if (validId(id)) completedIds.add(id);
      if (saved.lastLevelId === null || validId(saved.lastLevelId)) lastLevelId = saved.lastLevelId;
      if (
        !saved.completedIds.every(validId) ||
        (saved.lastLevelId !== null && !validId(saved.lastLevelId))
      )
        return;
      extra = saved;
      writable = true;
    } catch {
      writable = false;
      lastRaw = undefined;
    }
  }
  // Grava o progresso e as preferências da sessão atual.
  function save() {
    if (!writable) return false;
    try {
      const raw = JSON.stringify({
        ...extra,
        version: 1,
        completedIds: [...completedIds],
        lastLevelId,
      });
      if (raw !== lastRaw) {
        storage.setItem(CUT_CAMPAIGN_PROGRESS_KEY, raw);
        lastRaw = raw;
      }
      return true;
    } catch {
      return false;
    }
  }
  refresh();
  return {
    snapshot() {
      refresh();
      return { completedIds: new Set(completedIds), lastLevelId };
    },
    visit(id) {
      if (!validId(id)) return false;
      refresh();
      lastLevelId = id;
      return save();
    },
    complete(id) {
      if (!validId(id)) return false;
      refresh();
      completedIds.add(id);
      return save();
    },
  };
}
