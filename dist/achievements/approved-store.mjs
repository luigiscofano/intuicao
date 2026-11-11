import { writeProgress } from '../progress-write-guard.mjs';
import { recordMissionUnlocks } from './mission-store.mjs';

export const APPROVED_ATTEMPTS_STORAGE_ID = 'intuicao.approved-attempts.v1';
const games = new Set(['elo', 'prumo', 'cut']);
const storageDefault = () => { try { return globalThis.localStorage; } catch { return null; } };
const validIdentity = value => typeof value === 'string' && value.length <= 160 && /^(elo|prumo|cut):[^\s:]+$/.test(value);
export function readApprovedAttempts(storage = storageDefault()) {
  const empty = warning => ({version: 1, firstWins: [], warning});
  if (!storage) return empty('O progresso das primeiras confirmações não está disponível.');
  try {
    const raw = storage.getItem(APPROVED_ATTEMPTS_STORAGE_ID);
    if (raw === null) return empty(null);
    if (typeof raw !== 'string' || raw.length > 4096) throw Error('size');
    const data = JSON.parse(raw);
    if (data?.version !== 1 || !Array.isArray(data.firstWins) || data.firstWins.length > 3 || !data.firstWins.every(validIdentity)) throw Error('format');
    return {version: 1, firstWins: [...new Set(data.firstWins)], warning: null};
  } catch { return empty('O progresso das primeiras confirmações não pôde ser lido. Ele foi preservado.'); }
}
// Os controladores só chamam após uma vitória humana em fase oficial atual.
// Conserva no máximo as três identidades necessárias. Não guarda jogadas nem soluções.
export function recordApprovedAttemptWin({gameId, levelId, firstConfirmation} = {}, storage = storageDefault()) {
  if (firstConfirmation !== true || !games.has(gameId) || !['string','number'].includes(typeof levelId)) return [];
  const identity = `${gameId}:${levelId}`;
  if (!validIdentity(identity)) return [];
  const data = readApprovedAttempts(storage);
  if (data.warning) return [];
  if (!data.firstWins.includes(identity) && data.firstWins.length < 3) {
    data.firstWins.push(identity);
    try { writeProgress(storage, APPROVED_ATTEMPTS_STORAGE_ID, JSON.stringify({version: 1, firstWins: data.firstWins})); }
    catch { return []; }
  }
  return recordMissionUnlocks(['precision-first-try', ...(data.firstWins.length >= 3 ? ['precision-three-first-tries'] : [])], storage);
}
