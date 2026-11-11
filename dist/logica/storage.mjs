import { writeProgress } from '../progress-write-guard.mjs';
import { LOGIC_GAME_IDS } from './metadata.mjs';

export const LOGIC_STORAGE_KEY = 'intuicao.logica.v1';
export const STORAGE_VERSION = 1;
const MAX_BYTES = 6 * 1024 * 1024;
const MAX_SESSIONS = 500;
const FULL_HISTORY_SESSIONS = 8;
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const safeId = value => typeof value === 'string' && /^[a-z0-9][a-z0-9_.:-]{0,149}$/i.test(value) && !['__proto__', 'constructor', 'prototype'].includes(value);
const own = (value, key) => Object.hasOwn(value, key) ? value[key] : undefined;

export function freshLogicData() {
  return { version: STORAGE_VERSION, games: {}, lastView: null };
}

export function normalizeLogicData(value) {
  const data = freshLogicData();
  if (!isObject(value) || value.version !== STORAGE_VERSION) return data;
  if (isObject(value.games)) for (const game of LOGIC_GAME_IDS) {
    const source = own(value.games, game);
    if (!isObject(source)) continue;
    const completed = {};
    if (isObject(source.completed)) for (const [id, record] of Object.entries(source.completed).slice(-500)) {
      if (!safeId(id) || !isObject(record) || !Number.isSafeInteger(record.version) || record.version < 1) continue;
      completed[id] = { version: record.version, assisted: record.assisted === true, completedAt: typeof record.completedAt === 'string' ? record.completedAt.slice(0,40) : '' };
    }
    const sessions = {};
    if (isObject(source.sessions)) for (const [id, session] of Object.entries(source.sessions).slice(-MAX_SESSIONS)) {
      if (safeId(id) && isObject(session)) sessions[id] = session; // A restauração passa pelo motor da fase antes de usar estes dados.
    }
    data.games[game] = { completed, sessions, lastLevelId: safeId(source.lastLevelId) ? source.lastLevelId : null };
    if (isObject(source.endless) && Number.isSafeInteger(source.endless.step) && source.endless.step >= 0) {
      data.games[game].endless = { step: source.endless.step, session: isObject(source.endless.session) ? structuredClone(source.endless.session) : null };
    }
  }
  const view = value.lastView;
  if (isObject(view) && LOGIC_GAME_IDS.includes(view.game)) {
    data.lastView = { game: view.game, levelId: safeId(view.levelId) ? view.levelId : null, screen: view.screen === 'play' ? 'play' : 'selection', active: view.active === true, mode: view.mode === 'endless' ? 'endless' : 'campaign' };
  }
  return data;
}

export function gameProgress(data, game) {
  if (!LOGIC_GAME_IDS.includes(game)) throw new Error('Jogo desconhecido.');
  return data.games[game] ??= { completed: {}, sessions: {}, lastLevelId: null };
}

export function saveSession(data, game, level, session) {
  const progress = gameProgress(data, game);
  delete progress.sessions[level.id];
  progress.sessions[level.id] = structuredClone(session);
  // Preservamos a posição de todas as fases. Só o histórico antigo é compactado:
  // evita que dezenas de grades × 64 snapshots esgotem o armazenamento do navegador.
  const ids = Object.keys(progress.sessions);
  for (const id of ids.slice(0, -FULL_HISTORY_SESSIONS)) {
    const old = progress.sessions[id];
    if (Array.isArray(old.states) && old.states.length > 1 && old.states[old.cursor] !== undefined) {
      progress.sessions[id] = { ...old, states: [structuredClone(old.states[old.cursor])], cursor: 0, historyTrimmed: true };
    }
  }
  progress.lastLevelId = level.id;
}

export function recordCompletion(data, game, level, session, result, date = new Date()) {
  if (!result.valid) return false;
  const completed = gameProgress(data, game).completed;
  const previous = completed[level.id];
  // Uma conclusão independente posterior pode substituir a marca assistida da mesma definição.
  if (previous?.version === level.version && (!previous.assisted || session.assisted)) return false;
  completed[level.id] = { version: level.version, assisted: session.assisted, completedAt: date.toISOString() };
  return true;
}

export function createLogicStorage(storage = globalThis.localStorage) {
  let lastRaw = null;
  let issue = '';
  let data = freshLogicData();
  let incompatible = false;
  try {
    lastRaw = storage?.getItem(LOGIC_STORAGE_KEY) ?? null;
    if (lastRaw && lastRaw.length <= MAX_BYTES) {
      const parsed = JSON.parse(lastRaw);
      incompatible = parsed?.version !== STORAGE_VERSION;
      data = normalizeLogicData(parsed);
    } else if (lastRaw) incompatible = true;
  } catch { incompatible = true; }
  if (incompatible) issue = 'Esta tentativa salva não pôde ser lida. Você pode jogar; os dados anteriores serão preservados.';
  return {
    data,
    get warning() { return issue; },
    save() {
      if (incompatible) return false;
      try {
        if (!storage) throw new Error('O armazenamento está indisponível.');
        if (storage.getItem(LOGIC_STORAGE_KEY) !== lastRaw) throw new Error('O progresso mudou em outra aba. Recarregue a página para continuar salvando.');
        const raw = JSON.stringify(data);
        if (raw.length > MAX_BYTES) throw new Error('O espaço reservado para as tentativas foi atingido.');
        writeProgress(storage, LOGIC_STORAGE_KEY, raw);
        lastRaw = raw;
        issue = '';
        return true;
      } catch (error) {
        issue = `${error.message} A partida continua disponível nesta aba.`;
        return false;
      }
    },
  };
}

// Não altera sessões, última fase ou conclusões da campanha.
export function saveEndless(data, game, run) {
  gameProgress(data, game).endless = structuredClone(run);
}
