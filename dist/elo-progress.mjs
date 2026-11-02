// Migração do progresso de ELO por identificador, preservando os registros anteriores.
/** ELO80 migration is identity-based, never positional. Original records remain intact. */
export function migrateEloProgress(data, levels, storage = globalThis.localStorage) {
  if (!levels?.length) return false;
  const active = new Set(levels.map((l) => l.id));
  const isCampaign = (id) => /^elo(?:-v\d+)?-\d+$/.test(id);
  const oldId = data.lastSessions?.elo;
  let answers = {};
  try {
    answers = JSON.parse(storage?.getItem('intuicao.answers.v1') || '{}') ?? {};
  } catch {}
  const retired = [
    ...new Set([
      ...Object.keys(data.sessions ?? {}),
      ...(data.completed ?? []),
      ...Object.keys(answers)
        .filter((k) => k.startsWith('elo:'))
        .map((k) => k.slice(4)),
      ...(oldId ? [oldId] : []),
    ]),
  ].filter((id) => isCampaign(id) && !active.has(id));
  let changed = false;
  if (retired.length) {
    data.eloLegacy ??= { lastSessionIds: [] };
    data.eloLegacy.lastSessionIds ??= [];
    data.eloLegacy.campaign80 ??= {
      version: 1,
      records: {},
      policy:
        'Original IDs retained; no conclusions, attempts, assistance or undo transferred by position.',
    };
    const archive = data.eloLegacy.campaign80.records;
    for (const id of retired)
      if (!Object.hasOwn(archive, id)) {
        archive[id] = {
          id,
          completed: (data.completed ?? []).includes(id),
          ...(data.sessions?.[id] ? { session: structuredClone(data.sessions[id]) } : {}),
          ...(answers['elo:' + id] ? { answer: structuredClone(answers['elo:' + id]) } : {}),
        };
        changed = true;
      }
    if (oldId && isCampaign(oldId) && !active.has(oldId)) {
      if (!data.eloLegacy.lastSessionIds.includes(oldId)) data.eloLegacy.lastSessionIds.push(oldId);
      // Retired puzzle has no equivalent current puzzle. Do not map its old ordinal.
      delete data.lastSessions.elo;
      changed = true;
    }
  }
  return changed;
}
