import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LOGIC_GAME_IDS, loadLogicGame } from '../../dist/logica/metadata.mjs';
import { restoreEndless, endlessLevel, advanceEndless, createEndlessAdvance } from '../../dist/logica/endless.mjs';
import { createSession, currentState, checkSession, applySolution, moveHistory, restartSession } from '../../dist/logica/session.mjs';
import { createLogicStorage, saveSession, saveEndless, recordCompletion, normalizeLogicData, LOGIC_STORAGE_KEY } from '../../dist/logica/storage.mjs';
import { createProgressBackup, parseProgressBackup } from '../../dist/progress-backup.mjs';
const memoryStorage = () => { const map = new Map(); return { getItem: key => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) }; };

test('seis sequências percorrem 80 fases certificadas, repetem o ciclo e isolam a campanha', async () => {
  for (const game of LOGIC_GAME_IDS) {
    const adapter = await loadLogicGame(game);
    const storage = memoryStorage();
    const store = createLogicStorage(storage);
    const first = adapter.CAMPAIGN[0];
    const campaignSession = createSession(adapter, first);
    saveSession(store.data, game, first, campaignSession);
    recordCompletion(store.data, game, first, campaignSession, { valid: true });
    const campaign = structuredClone(store.data.games[game]);
    let run = restoreEndless(adapter);
    for (let i = 0; i < 81; i++) {
      const level = endlessLevel(adapter, run);
      assert.equal(level, adapter.CAMPAIGN[i % 80]);
      assert.equal(run.step, i);
      assert.equal(advanceEndless(adapter, run), run, 'fase incompleta não avança');
      run.session = { ...run.session, states: [adapter.solutionState(level)], cursor: 0 };
      run = advanceEndless(adapter, run);
      saveEndless(store.data, game, run);
    }
    const { endless, ...remaining } = store.data.games[game];
    assert.deepEqual(remaining, campaign);
    assert.equal(store.save(), true);
    assert.deepEqual(restoreEndless(adapter, createLogicStorage(storage).data.games[game].endless), run);
    const backup = parseProgressBackup(JSON.stringify(createProgressBackup(storage)));
    const restored = normalizeLogicData(JSON.parse(backup.records.find(item => item.key === LOGIC_STORAGE_KEY).raw));
    assert.deepEqual(restored.games[game], store.data.games[game]);
    // Escrita da campanha, por sua vez, não interfere na sequência.
    saveSession(store.data, game, first, campaignSession);
    assert.deepEqual(store.data.games[game].endless, endless);
  }
});

test('sem parar mantém checagem, gabarito assistido, desfazer/refazer e reinício próprios', async () => {
  const adapter = await loadLogicGame('divisa');
  let run = restoreEndless(adapter);
  const level = endlessLevel(adapter, run);
  for (let i = 0; i < 3; i++) run.session = checkSession(adapter, level, run.session).session;
  assert.equal(run.session.failures, 3);
  run.session = applySolution(adapter, level, run.session);
  assert.equal(run.session.assisted, true);
  assert.equal(adapter.checkState(level, currentState(run.session)).valid, true);
  const restored = restoreEndless(adapter, JSON.parse(JSON.stringify(run)));
  assert.deepEqual(restored, run);
  const undone = moveHistory(restored.session, -1);
  assert.equal(adapter.checkState(level, currentState(undone)).valid, false);
  assert.deepEqual(moveHistory(undone, 1), restored.session);
  const restarted = restartSession(adapter, level, restored.session);
  assert.equal(restarted.failures, 3);
  assert.equal(restarted.assisted, true);
  const next = advanceEndless(adapter, run);
  assert.equal(next.session.failures, 0);
  assert.equal(next.session.assisted, false);
});

test('legado v1 e sessão contínua corrompida preservam campanha e recuperam tentativa', async () => {
  const adapter = await loadLogicGame('divisa');
  const legacy = { version: 1, games: { divisa: { completed: {}, sessions: {}, lastLevelId: null } }, lastView: null };
  assert.deepEqual(normalizeLogicData(legacy), legacy);
  for (const step of [-1, NaN, Infinity, '4']) assert.equal(restoreEndless(adapter, { step }).step, 0);
  const run = restoreEndless(adapter, { step: 81, session: { levelId: 'bad', states: [] } });
  assert.equal(run.step, 81);
  assert.deepEqual(run.session, createSession(adapter, adapter.CAMPAIGN[1]));
});

test('avanço tem pausa para resultado, não duplica e cancela callbacks obsoletos', () => {
  const queued = new Map(); let serial = 0; let calls = 0; const delays = [];
  const clock = { setTimeout(fn, delay) { delays.push(delay); queued.set(++serial, fn); return serial; }, clearTimeout(id) { queued.delete(id); } };
  const advancement = createEndlessAdvance(clock);
  assert.equal(advancement.schedule(() => calls++), true);
  assert.equal(advancement.schedule(() => calls++), false);
  assert.deepEqual(delays, [1800]);
  const stale = queued.get(1);
  advancement.cancel(); stale(); assert.equal(calls, 0);
  advancement.schedule(() => calls++); queued.get(2)(); assert.equal(calls, 1);
  assert.equal(advancement.schedule(() => calls++), true);
});

test('UI remove o aviso explicativo, oferece modo e cancela avanço ao mudar de contexto', () => {
  const ui = readFileSync(new URL('../../dist/logica/ui.mjs', import.meta.url), 'utf8');
  assert.match(ui, /data-presentation-mode="endless" data-logic-endless>Modo sem parar/);
  assert.doesNotMatch(ui, /80 fases existentes e repete o ciclo/);
  assert.match(ui, /id="lg-stage-label">.*Sem parar · ciclo/);
  assert.doesNotMatch(ui, /logic-endless-status/);
  assert.match(ui, /onCancel: \(\) => \{\s+if \(mode !== 'endless' \|\| outcome !== 'win'\) return;\s+const result = adapter.checkState\(level, currentState\(session\)\);\s+if \(result.valid\) complete\(result, \{ animate: false \}\);/);
  assert.match(ui, /if \(mode !== 'endless'\) recordCompletion/);
  for (const name of ['showSelection', 'start', 'edit', 'travel', 'restartNow', 'requestRestart', 'showAnswer']) {
    const body = ui.slice(ui.indexOf(`function ${name}(`)).split(/\n  function /)[0];
    assert.match(body, /advancement.cancel\(\)/, name);
  }
  assert.match(ui, /hide\(\) \{\s+advancement.cancel\(\)/);
  assert.match(ui, /async activate\(id\) \{\s+advancement.cancel\(\)/);
});


test('retorno por BFCache rearma apenas a sequência ativa e resolvida, sem animação duplicada', () => {
  const ui = readFileSync(new URL('../../dist/logica/ui.mjs', import.meta.url), 'utf8');
  const listener = ui.match(/globalThis.addEventListener\('pageshow', event => \{([\s\S]*?)\n  \}\);/);
  assert.ok(listener);
  // Executa o callback real com dependências controladas, sem navegador.
  const callback = new Function('event', 'active', 'screen', 'mode', 'restart', 'session', 'adapter', 'level', 'currentState', 'complete', listener[1]);
  let calls = 0;
  let valid = true;
  const args = [{ persisted: true }, true, 'play', 'endless', { isOpen: false }, { states: [[]], cursor: 0 }, { checkState: () => ({ valid }) }, {}, currentState, (result, options) => { assert.equal(result.valid, true); assert.equal(options.animate, false); calls++; }];
  callback(...args);
  assert.equal(calls, 1);
  for (const [index, value] of [[0, { persisted: false }], [1, false], [2, 'selection'], [3, 'campaign'], [4, { isOpen: true }], [5, null]]) {
    const blocked = [...args]; blocked[index] = value; callback(...blocked);
  }
  valid = false; callback(...args);
  assert.equal(calls, 1);
});
