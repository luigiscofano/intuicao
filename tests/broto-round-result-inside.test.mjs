// Testes e verificações de BROTO.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
test('somente a apresentação BROTO mudou', () => {
  const changed = execFileSync(
    'git',
    ['diff', '--name-only', '4e54da32cede076d67edb25e62f665fa09a1f36e', '--', 'dist'],
    { encoding: 'utf8' },
  )
    .trim()
    .split('\n')
    .filter(Boolean);
  assert.deepEqual(changed.sort(), ['dist/broto/ui.css', 'dist/broto/ui.mjs']);
});
test('intervalo usa bloco próprio; resultado final e retomada continuam separados', () => {
  const s = readFileSync('dist/broto/ui.mjs', 'utf8');
  assert.match(
    s,
    /id="b-round-result" class="b-round-result" hidden><\/div><\/div><div class="board-check-controls b-check">/,
  );
  assert.match(s, /roundResult.innerHTML='';roundResult.hidden=true/);
  assert.match(s, /else\{roundResult.hidden=false;roundResult.innerHTML=`<p>Primeira rodada:/);
  assert.match(s, /if\(state.duelOver\)\{result.innerHTML=/);
  assert.match(s, /id="b-resume"/);
});
