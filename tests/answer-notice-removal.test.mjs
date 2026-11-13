import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

for (const [file, marker] of [
  ['app.mjs', 'answerProgress.assist(answerKey())'],
  ['collection-ui.mjs', 'progress().assist(answerKey())'],
  ['logica/ui.mjs', 'session = applySolution(adapter, level, session)'],
]) {
  test(file + ': remove aviso de gabarito sem remover registro de assistência', async () => {
    const source = await readFile(new URL('../dist/' + file, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /Gabarito aplicado\./);
    assert.ok(source.includes(marker), 'A assistência continua registrada');
  });
}
