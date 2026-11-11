import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession, currentState, restoreSession, applySessionAction, moveHistory, restartSession, applySolution, checkSession, MAX_HISTORY } from '../../dist/logica/session.mjs';
import { createLogicStorage, normalizeLogicData, LOGIC_STORAGE_KEY, gameProgress, saveSession, recordCompletion } from '../../dist/logica/storage.mjs';
import { dailyLevelIndex } from '../../dist/logica/ui.mjs';
import { createProgressBackup, parseProgressBackup } from '../../dist/progress-backup.mjs';
import { nextBoardCell } from '../../dist/logica/keyboard.mjs';

// Um motor mínimo isola os riscos de persistência/histórico das regras de cada puzzle.
const level = { id: 'divisa-fixture-1', version: 1, solution: [1,2,3] };
test('teclado mantém a direção em grades esparsas e pula pistas fora do foco', () => {
  // B1 deve chegar a B3 mesmo sem um alvo editável em B2.
  const pieces = [1, 6, 9, 10, 14];
  assert.equal(nextBoardCell(pieces, 1, 'ArrowDown', 4), 9);
  assert.equal(nextBoardCell(pieces, 9, 'ArrowUp', 4), 1);
  assert.equal(nextBoardCell(pieces, 1, 'ArrowRight', 4), 1);
  assert.equal(nextBoardCell(pieces, 9, 'ArrowRight', 4), 10);
  assert.equal(nextBoardCell(pieces, 6, 'ArrowDown', 4), 10);
  assert.equal(nextBoardCell(pieces, 14, 'Home', 4), 1);
  assert.equal(nextBoardCell(pieces, 1, 'End', 4), 14);
});
const adapter = {
  initialState: () => [1,0,0],
  isStateValid: (_, state) => Array.isArray(state) && state.length === 3 && state[0] === 1 && state.every(value => Number.isInteger(value) && value >= 0 && value <= 3),
  applyAction: (_, state, { index, value }) => index > 0 && index < 3 ? state.map((old, i) => i === index ? value : old) : state,
  solutionState: item => structuredClone(item.solution),
  checkState: (_, state) => ({ valid: JSON.stringify(state) === '[1,2,3]', complete: !state.includes(0), message: 'Conferido.' }),
};
function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: key => data.delete(key) };
}

test('desfazer/refazer restaura a jogada inteira e edição após desfazer abre outro ramo', () => {
  const initial = createSession(adapter, level);
  const first = applySessionAction(adapter, level, initial, { index: 1, value: 2 });
  const second = applySessionAction(adapter, level, first, { index: 2, value: 3 });
  assert.deepEqual(currentState(initial), [1,0,0]);
  assert.deepEqual(currentState(moveHistory(second, -1)), [1,2,0]);
  const other = applySessionAction(adapter, level, moveHistory(second, -1), { index: 2, value: 2 });
  assert.strictEqual(moveHistory(other, 1), other);
  assert.deepEqual(currentState(second), [1,2,3]);
});

test('histórico tem limite de memória e preserva a posição após recarregar', () => {
  let session = createSession(adapter, level);
  for (let i = 0; i < 200; i++) session = applySessionAction(adapter, level, session, { index: 1, value: i % 3 });
  assert.equal(session.states.length, MAX_HISTORY);
  session = moveHistory(session, -3);
  const restored = restoreSession(adapter, level, JSON.parse(JSON.stringify(session)));
  assert.deepEqual(currentState(restored), currentState(session));
  assert.equal(restored.cursor, session.cursor);
});

test('save com pista alterada, cursor inválido ou outra versão não é aplicado', () => {
  const session = createSession(adapter, level);
  for (const saved of [
    { ...session, states: [[2,0,0]] },
    { ...session, cursor: 3 },
    { ...session, levelVersion: 2 },
    { ...session, states: Array(1000).fill([1,0,0]) },
  ]) assert.deepEqual(restoreSession(adapter, level, saved), session);
});

test('tentativas e ajuda são explícitas e reiniciar não remove a marca assistida', () => {
  let session = createSession(adapter, level);
  assert.strictEqual(applySolution(adapter, level, session), session);
  for (let i = 0; i < 3; i++) session = checkSession(adapter, level, session).session;
  assert.equal(session.failures, 3);
  const solved = applySolution(adapter, level, session);
  assert.equal(solved.assisted, true);
  assert.equal(adapter.checkState(level, currentState(solved)).valid, true);
  const restarted = restartSession(adapter, level, solved);
  assert.deepEqual(currentState(restarted), [1,0,0]);
  assert.equal(restarted.assisted, true);
  assert.equal(restarted.failures, 3);
});

test('gabarito inconsistente é rejeitado antes de alterar a tentativa', () => {
  const broken = { ...adapter, solutionState: () => [1,3,3] };
  const session = { ...createSession(adapter, level), failures: 3 };
  assert.throws(() => applySolution(broken, level, session), /não passou/);
  assert.deepEqual(currentState(session), [1,0,0]);
});

test('saves de jogos diferentes coexistem e conclusões seguem identidade e versão', () => {
  const local = memoryStorage({ unrelated: 'preservado' });
  const store = createLogicStorage(local);
  const session = createSession(adapter, level);
  saveSession(store.data, 'divisa', level, session);
  saveSession(store.data, 'pulso', { ...level, id: 'pulso-fixture' }, session);
  assert.equal(recordCompletion(store.data, 'divisa', level, session, { valid: false }), false);
  assert.equal(recordCompletion(store.data, 'divisa', level, session, { valid: true }), true);
  assert.equal(recordCompletion(store.data, 'divisa', level, session, { valid: true }), false);
  assert.equal(store.save(), true);
  const restored = createLogicStorage(local);
  assert.equal(restored.data.games.divisa.completed[level.id].version, 1);
  assert.ok(restored.data.games.pulso.sessions['pulso-fixture']);
  assert.equal(local.getItem('unrelated'), 'preservado');
});

test('escrita de aba desatualizada não substitui progresso mais recente', () => {
  const local = memoryStorage();
  const tabA = createLogicStorage(local);
  const tabB = createLogicStorage(local);
  gameProgress(tabA.data, 'divisa').lastLevelId = 'fase-A';
  assert.equal(tabA.save(), true);
  const accepted = local.getItem(LOGIC_STORAGE_KEY);
  gameProgress(tabB.data, 'pulso').lastLevelId = 'fase-B';
  assert.equal(tabB.save(), false);
  assert.match(tabB.warning, /outra aba/);
  assert.equal(local.getItem(LOGIC_STORAGE_KEY), accepted);
});

test('as 80 tentativas são preservadas; só o histórico antigo é compactado', () => {
  const store = createLogicStorage(memoryStorage());
  for (let number = 1; number <= 80; number++) {
    const item = { ...level, id: `divisa-${number}` };
    const session = applySessionAction(adapter, item, createSession(adapter, item), { index: 1, value: 2 });
    saveSession(store.data, 'divisa', item, session);
  }
  assert.equal(Object.keys(store.data.games.divisa.sessions).length, 80);
  const earliest = store.data.games.divisa.sessions['divisa-1'];
  assert.deepEqual(currentState(earliest), [1,2,0]);
  assert.equal(earliest.states.length, 1);
  assert.equal(store.data.games.divisa.sessions['divisa-80'].states.length, 2);
});

test('registro corrompido e versão futura são preservados', () => {
  for (const raw of ['{quebrado', '{"version":99,"future":true}']) {
    const local = memoryStorage({ [LOGIC_STORAGE_KEY]: raw });
    const store = createLogicStorage(local);
    assert.equal(store.save(), false);
    assert.equal(local.getItem(LOGIC_STORAGE_KEY), raw);
    assert.ok(store.warning);
  }
});

test('normalização não aceita chaves de protótipo como identidade de fase', () => {
  const malicious = JSON.parse('{"version":1,"games":{"divisa":{"completed":{"__proto__":{"version":1},"valid-id":{"version":1}}}}}');
  const data = normalizeLogicData(malicious);
  assert.deepEqual(Object.keys(data.games.divisa.completed), ['valid-id']);
  assert.equal({}.version, undefined);
});

test('backup inclui os seis jogos em uma chave com versão reconhecida', () => {
  const local = memoryStorage();
  const store = createLogicStorage(local);
  gameProgress(store.data, 'renovo').lastLevelId = 'renovo-id';
  store.save();
  const backup = createProgressBackup(local, new Date('2026-11-10T16:00:00Z'));
  assert.deepEqual(backup.records.map(record => record.key), [LOGIC_STORAGE_KEY]);
  assert.deepEqual(parseProgressBackup(JSON.stringify(backup)), backup);
});

test('diário usa o dia de São Paulo e sempre aponta para o catálogo disponível', () => {
  const before = dailyLevelIndex('pulso', new Date('2026-11-10T02:59:59Z'));
  const previous = dailyLevelIndex('pulso', new Date('2026-11-09T16:00:00Z'));
  const after = dailyLevelIndex('pulso', new Date('2026-11-10T03:00:00Z'));
  assert.equal(before, previous);
  assert.notEqual(before, after);
  for (let day = 1; day <= 28; day++) {
    const index = dailyLevelIndex('renovo', new Date(`2026-11-${String(day).padStart(2,'0')}T18:00:00Z`));
    assert.ok(index >= 0 && index < 80);
  }
});
