/** Projeções de descoberta: só usam contagens e datas já comprovadas pelo leitor. */
export function recordedProgress(entry) {
  if (!entry || !Number.isFinite(entry.current) || !Number.isFinite(entry.target)
      || entry.target <= 1 || entry.current <= 0 || entry.current >= entry.target
      || entry.unlocked) return null;
  return entry.current / entry.target;
}

// Metade da meta já comprovada: missões binárias nunca ganham uma porcentagem fictícia.
export function isNearAchievement(entry) {
  const progress = recordedProgress(entry);
  return progress !== null && progress >= 0.5;
}

export function recordedUnlockTime(entry) {
  const timestamp = typeof entry?.unlockedAt === 'string' ? Date.parse(entry.unlockedAt) : NaN;
  return Number.isFinite(timestamp) ? timestamp : null;
}

export function newestUnlocksFirst(entries) {
  return [...entries].sort((a, b) =>
    (recordedUnlockTime(b) ?? -Infinity) - (recordedUnlockTime(a) ?? -Infinity) || 0);
}

/** Até três sugestões, sem afirmar que uma condição binária está perto de ser cumprida. */
export function recommendAchievements(data, { kind = 'missions', gameId = 'all' } = {}, limit = 3) {
  const entries = kind === 'general' ? data.achievements ?? [] : data.missions ?? [];
  const played = new Set((data.games ?? []).filter(game => game.completed > 0).map(game => game.id));
  const candidates = entries.filter(entry => !entry.unlocked && (kind === 'general' || gameId === 'all'
    || entry.gameId === gameId || entry.gameIds?.includes(gameId)));
  const score = entry => {
    const progress = recordedProgress(entry);
    if (progress !== null) return 2 + progress;
    return played.has(entry.gameId) || entry.gameIds?.some(id => played.has(id)) ? 1 : 0;
  };
  return candidates.map((entry, index) => ({ entry, index }))
    .sort((a, b) => score(b.entry) - score(a.entry) || a.index - b.index)
    .slice(0, Math.max(0, limit)).map(item => item.entry);
}
