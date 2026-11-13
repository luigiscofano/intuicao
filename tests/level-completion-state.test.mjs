import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { levelCompletionState, completionCaption, presentCompletionStates } from '../dist/level-completion-state.mjs';
import { freshLogicData, recordCompletion, gameProgress } from '../dist/logica/storage.mjs';
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('progresso exige conclusão; assistência sozinha não pinta uma fase resolvida', () => {
  assert.equal(levelCompletionState(false, false), 'available');
  assert.equal(levelCompletionState(false, true), 'available');
  assert.equal(levelCompletionState(true, false), 'independent');
  assert.equal(levelCompletionState(true, true), 'assisted');
  assert.equal(levelCompletionState({ assisted: false }, false), 'independent');
});

test('as cores não substituem o rótulo textual', () => {
  assert.equal(completionCaption('independent'), '✓ concluído');
  assert.equal(completionCaption('assisted'), '✓ assistido');
  assert.equal(completionCaption('available'), '');
});

test('rótulos acessíveis recebem estado idempotente e preservam número/dificuldade', () => {
  const attrs = { 'aria-label': 'Fase 18, Aprendiz, concluída' };
  const small = { textContent: '✓ concluído' };
  const tile = { dataset: { completionState: 'assisted' }, querySelector: () => small,
    getAttribute: key => attrs[key], setAttribute: (key,value) => { attrs[key] = value; } };
  const root = { querySelectorAll: () => [tile] };
  presentCompletionStates(root); presentCompletionStates(root);
  assert.equal(small.textContent, '✓ assistido');
  assert.equal(attrs['aria-label'], 'Fase 18, Aprendiz, concluída, resolução assistida');
});

test('as 12 campanhas emitem o estado a partir do respectivo save', () => {
  for (const path of ['app.mjs','collection-ui.mjs','sintonia/ui.mjs','repasse/ui.mjs','logica/ui.mjs']) {
    const source = read(`dist/${path}`);
    assert.match(source, /import \{ levelCompletionState \}/);
    assert.match(source, /data-completion-state=/);
  }
  const logic = read('dist/logica/ui.mjs');
  assert.match(logic, /levelCompletionState\(isCompleted\(item\), progress\(\)\.completed\[item.id\]\?\.assisted\)/);
  for (const game of ['elo','prumo','pacto']) assert.ok(read('dist/collection-ui.mjs').includes(`levelCompletionState(done, answers.get("${game}:" + l.id).assisted)`));
});

test('conclusão autônoma preserva sua prioridade no registro lógico existente', () => {
  const data = freshLogicData(); const level = { id: 'pulso-test', version: 1 };
  assert.equal(recordCompletion(data,'pulso',level,{assisted:true},{valid:true}), true);
  let record = gameProgress(data,'pulso').completed[level.id];
  assert.equal(levelCompletionState(true, record.assisted), 'assisted');
  recordCompletion(data,'pulso',level,{assisted:false},{valid:true});
  record = gameProgress(data,'pulso').completed[level.id];
  assert.equal(levelCompletionState(true, record.assisted), 'independent');
  assert.equal(recordCompletion(data,'pulso',level,{assisted:true},{valid:true}), false);
  assert.equal(levelCompletionState(true, record.assisted), 'independent');
});

test('cores aprovadas têm precedência no hover e rótulos herdam contraste', () => {
  const css=read('dist/selection-presentation.css');
  assert.match(css, /data-completion-state="independent"\]\:hover\s*\{\s*background: #28543B/);
  assert.match(css, /data-completion-state="assisted"\]\:hover\s*\{\s*background: #E8BE4A/);
  assert.match(css, /color: #342d18/);
  assert.match(css, /> small\s*\{\s*color: inherit/);
  assert.doesNotMatch(css, /\.logic-level.completed\)\{background:#e1ead9/);
});

test('camada de estado não escreve progresso e não altera paleta da dificuldade', () => {
  assert.doesNotMatch(read('dist/level-completion-state.mjs'), /localStorage|writeProgress|setItem|completedAt/);
  const css=read('dist/selection-presentation.css');
  for(const color of ['#7B817A','#285D7C','#725580','#805D43','#2C302D','#A7443D']) assert.ok(css.includes(color));
});
