import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LOGIC_GAME_IDS, loadLogicGame } from '../../dist/logica/metadata.mjs';
import { restoreEndless, endlessLevel, acceptGeneratedChallenge, markEndlessCompleted, advanceEndless, createEndlessAdvance, validGeneratedLevel } from '../../dist/logica/endless.mjs';
import { generateLogicChallenge, mixSeed, RECENT_LIMIT } from '../../dist/logica/endless-generator.mjs';
import { createLogicGenerator } from '../../dist/logica/endless-service.mjs';
import { createSession, currentState, checkSession, applySolution, moveHistory, restartSession } from '../../dist/logica/session.mjs';
import { createLogicStorage, saveSession, saveEndless, recordCompletion, normalizeLogicData, LOGIC_STORAGE_KEY } from '../../dist/logica/storage.mjs';
import { createProgressBackup, parseProgressBackup } from '../../dist/progress-backup.mjs';
const memoryStorage = () => { const map = new Map(); return { getItem: key => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) }; };
const generate = (game, run = null, difficulty = 0) => generateLogicChallenge({ game, baseSeed: run?.baseSeed ?? 932147, step: run ? run.step + 1 : 0, difficulty: run?.difficulty ?? difficulty, recentSignatures: run?.recentSignatures ?? [] });

test('seis sequências geram mais de 80 fases sem ciclo, isolam campanha e restauram backup', async () => {
  for (const game of LOGIC_GAME_IDS) {
    const adapter = await loadLogicGame(game), storage = memoryStorage(), store = createLogicStorage(storage);
    const first = adapter.CAMPAIGN[0], campaignSession = createSession(adapter, first);
    saveSession(store.data, game, first, campaignSession); recordCompletion(store.data, game, first, campaignSession, { valid: true });
    const campaign = structuredClone(store.data.games[game]);
    let run = acceptGeneratedChallenge(adapter, await generate(game), null, { baseSeed: 932147 });
    const signatures = [], definitions = new Set();
    for (let i = 0; i < 90; i++) {
      const level = endlessLevel(adapter, run);
      assert.equal(run.step, i); assert.equal(level.difficulty, 0);
      assert.equal(adapter.CAMPAIGN.some(item => item.id === level.id), false);
      assert.equal(validGeneratedLevel(adapter, level), true);
      assert.equal(advanceEndless(adapter, run), run, 'fase incompleta não avança');
      assert.ok(!signatures.slice(-RECENT_LIMIT).includes(run.recentSignatures.at(-1)));
      signatures.push(run.recentSignatures.at(-1)); definitions.add(JSON.stringify(level.solution));
      run.session = { ...run.session, states: [adapter.solutionState(level)], cursor: 0 };
      run = markEndlessCompleted(adapter, run); assert.equal(run.solved, i + 1);
      assert.equal(markEndlessCompleted(adapter, run), run, 'mesma vitória não soma duas vezes');
      run = advanceEndless(adapter, run, await generate(game, run));
      saveEndless(store.data, game, run);
    }
    assert.ok(definitions.size > 15, `${game}: variação real de respostas`);
    const { endless, ...remaining } = store.data.games[game]; assert.deepEqual(remaining, campaign);
    assert.equal(store.save(), true); assert.deepEqual(restoreEndless(adapter, createLogicStorage(storage).data.games[game].endless), run);
    const backup = parseProgressBackup(JSON.stringify(createProgressBackup(storage)));
    const restored = normalizeLogicData(JSON.parse(backup.records.find(item => item.key === LOGIC_STORAGE_KEY).raw));
    assert.deepEqual(restored.games[game], store.data.games[game]);
    saveSession(store.data, game, first, campaignSession); assert.deepEqual(store.data.games[game].endless, endless);
  }
});

test('faixas ficam fixas, mudança manual não soma vitória e sementes são determinísticas', async () => {
  for (const game of LOGIC_GAME_IDS) for (let difficulty=0; difficulty<6; difficulty++) {
    const adapter=await loadLogicGame(game), first=await generate(game, null, difficulty);
    assert.deepEqual(await generate(game, null, difficulty), first);
    let run=acceptGeneratedChallenge(adapter,first,null,{baseSeed:932147,difficulty});
    const second=await generate(game,run); run=acceptGeneratedChallenge(adapter,second,run);
    assert.equal(run.difficulty,difficulty); assert.equal(run.level.difficulty,difficulty); assert.equal(run.solved,0); assert.equal(run.step,1);
    assert.notEqual(first.signature,second.signature);
  }
  assert.notEqual(mixSeed(7,0),mixSeed(7,0x100000000));
});

test('sem parar mantém checagem, gabarito assistido, desfazer/refazer e reinício', async () => {
  const adapter = await loadLogicGame('divisa');
  let run = acceptGeneratedChallenge(adapter,await generate('divisa'),null,{baseSeed:932147});
  const level = endlessLevel(adapter, run);
  for (let i = 0; i < 3; i++) run.session = checkSession(adapter, level, run.session).session;
  run.session = applySolution(adapter, level, run.session); assert.equal(run.session.assisted, true);
  const restored = restoreEndless(adapter, JSON.parse(JSON.stringify(run))); assert.deepEqual(restored, run);
  const undone = moveHistory(restored.session, -1); assert.equal(adapter.checkState(level, currentState(undone)).valid, false);
  assert.deepEqual(moveHistory(undone, 1), restored.session);
  const restarted = restartSession(adapter, level, restored.session); assert.equal(restarted.failures, 3); assert.equal(restarted.assisted, true);
  const next = advanceEndless(adapter, run, await generate('divisa', run)); assert.equal(next.session.failures, 0); assert.equal(next.session.assisted, false);
});

test('migração preserva tentativa do ciclo legado e gera sua sucessora sem apagar campanha', async () => {
  const adapter = await loadLogicGame('divisa');
  assert.equal(restoreEndless(adapter), null);
  for (const step of [-1, NaN, Infinity, '4']) assert.equal(restoreEndless(adapter, { step }), null);
  const oldLevel=adapter.CAMPAIGN[1]; let oldSession=createSession(adapter,oldLevel);
  oldSession={...oldSession,failures:3,assisted:true,states:[adapter.solutionState(oldLevel)],cursor:0};
  const legacy=restoreEndless(adapter,{step:81,session:oldSession}); assert.equal(legacy.level,oldLevel); assert.deepEqual(legacy.session,oldSession);
  const next=advanceEndless(adapter,legacy,await generate('divisa',legacy)); assert.equal(next.version,2); assert.equal(next.step,82); assert.equal(next.solved,82);
  assert.equal(restoreEndless(adapter,{...next,level:{...next.level,rows:99999}}),null);
  const broken={...next,session:{...next.session,levelId:'bad'}}; assert.deepEqual(restoreEndless(adapter,broken).session,createSession(adapter,next.level));
});

test('serviço cancela respostas antigas e respeita timeout, sem fallback de catálogo', async () => {
  const instances=[];
  class FakeWorker { constructor(){instances.push(this);} postMessage(payload){this.payload=payload;} terminate(){this.stopped=true;} }
  const service=createLogicGenerator({WorkerClass:FakeWorker,timeout:50});
  const a=service.generate({game:'divisa'}); const aRejected=assert.rejects(a,{name:'AbortError'});
  const b=service.generate({game:'pulso'}); await aRejected; assert.equal(instances[0].stopped,true);
  instances[0].onmessage({data:{id:instances[0].payload.id,result:'stale'}});
  instances[1].onmessage({data:{id:instances[1].payload.id,result:'current'}}); assert.equal(await b,'current');
  await assert.rejects(service.generate({game:'foz'}),/demorou/); service.cancel();
  const fallback=createLogicGenerator({WorkerClass:null}); const result=await fallback.generate({game:'pulso',baseSeed:77,step:0,difficulty:2});
  assert.equal(result.level.game,'pulso'); assert.equal(result.level.difficulty,2);
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

test('UI oferece geração e dificuldade, preservando cancelamento ao mudar de contexto', () => {
  const ui = readFileSync(new URL('../../dist/logica/ui.mjs', import.meta.url), 'utf8');
  assert.match(ui, /data-presentation-mode="endless" data-logic-endless>Modo sem parar/);
  assert.match(ui, /data-logic-endless-apply/);
  assert.match(ui, /id="lg-endless-difficulty"/);
  assert.match(ui, /createLogicGenerator/);
  assert.match(ui, /id="lg-stage-label"[^>]*>.*Sem parar · desafio/);
  assert.doesNotMatch(ui, /Sem parar · ciclo/);
  assert.doesNotMatch(ui, /80 fases existentes e repete o ciclo/);
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

test('retomada legada preserva preferência e conclusão, sem degradar versões novas inválidas', async () => {
  const adapter = await loadLogicGame('pulso');
  let run = restoreEndless(adapter, { step: 10, session: null });
  run.autoAdvance = false; run.currentCompleted = true; run.solved = 11;
  const data = { version: 1, games: { pulso: { completed: {}, sessions: {}, lastLevelId: null, endless: run } }, lastView: null };
  const normalized = normalizeLogicData(data).games.pulso.endless;
  const resumed = restoreEndless(adapter, normalized);
  assert.equal(resumed.autoAdvance, false); assert.equal(resumed.currentCompleted, true); assert.equal(resumed.solved, 11); assert.equal(resumed.baseSeed, run.baseSeed);
  for (const version of [2, 3]) {
    data.games.pulso.endless = { version, step: 5, level: null, session: null };
    const invalid = normalizeLogicData(data).games.pulso.endless;
    assert.equal(invalid.version, version); assert.equal(restoreEndless(adapter, invalid), null);
  }
});

test('Checar e alternar autoavanço cancelam snapshots de geração antes de alterar a tentativa', () => {
  const ui = readFileSync(new URL('../../dist/logica/ui.mjs', import.meta.url), 'utf8');
  const check = ui.slice(ui.indexOf('  function check() {')).split(/\n  function /)[0];
  assert.ok(check.indexOf('cancelGeneration();') < check.indexOf('checkSession(adapter'));
  const change = ui.match(/host.addEventListener\('change', event => \{([\s\S]*?)\n  \}\);/)[1];
  assert.ok(change.indexOf('cancelGeneration();') < change.indexOf('endless.autoAdvance ='));
  let cancelled = false, saved = false;
  const endless = { autoAdvance: true };
  new Function('event','active','mode','advancement','cancelGeneration','endless','save','outcome','complete','adapter','level','session','currentState', change)(
    { target: { id: 'lg-endless-auto', checked: false } }, true, 'endless', { cancel() {} }, () => { cancelled = true; }, endless, () => { assert.equal(cancelled, true); saved = true; }, 'idle', () => {}, {}, null, null, currentState);
  assert.equal(endless.autoAdvance, false); assert.equal(saved, true);
});
