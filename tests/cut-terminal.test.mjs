// Testes e verificações de Corte certo.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
const src = fs.readFileSync(new URL('../dist/app.mjs', import.meta.url), 'utf8'),
  old = execFileSync('git', ['show', '7d3de1bc3043691e8b908fb3b573070379668046:dist/app.mjs'], {
    encoding: 'utf8',
  }),
  before = "$('next').onclick=()=>navigateLevel(1);",
  after =
    "$('next').onclick=()=>{if(game==='cut'&&!free&&!customLevel&&level===catalogue.cut.length-1){showSelection();return;}navigateLevel(1);};";
test('somente ação terminal do botão inferior mudou', () =>
  assert.equal(src, old.replace(before, after)));
test('apenas fim da campanha Corte retorna seleção', () => {
  for (const game of ['cut', 'light'])
    for (const free of [false, true])
      for (const customLevel of [null, { id: 'custom' }])
        for (const level of [0, 78, 79]) {
          let selection = 0,
            next = 0;
          const button = {};
          const ctx = {
            $: () => button,
            game,
            free,
            customLevel,
            level,
            catalogue: { cut: Array(80) },
            showSelection: () => selection++,
            navigateLevel: (n) => {
              assert.equal(n, 1);
              next++;
            },
          };
          vm.runInNewContext(after, ctx);
          button.onclick();
          const terminal = game === 'cut' && !free && !customLevel && level === 79;
          assert.equal(selection, terminal ? 1 : 0);
          assert.equal(next, terminal ? 0 : 1);
        }
});
