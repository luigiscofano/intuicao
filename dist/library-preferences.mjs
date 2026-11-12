// Favoritos e recentes são preferências de navegação; nunca modificam saves.
export const LIBRARY_PREFERENCES_KEY = 'intuicao.library.v1';
export const RECENT_LIMIT = 12;
export function normalizeLibraryPreferences(value, allowed) {
  const valid = new Set(allowed);
  const ids = list => [...new Set(Array.isArray(list) ? list : [])]
    .filter(id => typeof id === 'string' && valid.has(id));
  return { favorites: ids(value?.favorites), recent: ids(value?.recent).slice(0, RECENT_LIMIT) };
}
export function readLibraryPreferences(storage, allowed) {
  try { return normalizeLibraryPreferences(JSON.parse(storage?.getItem(LIBRARY_PREFERENCES_KEY) || '{}'), allowed); }
  catch { return normalizeLibraryPreferences(null, allowed); }
}
export function saveLibraryPreferences(storage, value, allowed) {
  const normalized = normalizeLibraryPreferences(value, allowed);
  try { storage?.setItem(LIBRARY_PREFERENCES_KEY, JSON.stringify(normalized)); } catch { /* Vale nesta sessão. */ }
  return normalized;
}
export function recordRecentGame(value, game, allowed) {
  return normalizeLibraryPreferences({ ...value, recent: [game, ...value.recent] }, allowed);
}
export function filterLibraryGames(ids, filter, preferences) {
  if (filter === 'favorites') return ids.filter(id => preferences.favorites.includes(id));
  if (filter === 'recent') return preferences.recent.filter(id => ids.includes(id));
  return ids;
}
