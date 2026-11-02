// Testes e verificações de componentes compartilhados do Intuição.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const base = 'f94201b1321504bf24f4a5c961fe2ed6ec5ef09a',
  allowed = ['dist/broto/ui.css', 'dist/cerco/ui.css'];
test('molduras seguem Repasse e só envolvem superfícies dos dois duelos', () => {
  const rep = fs.readFileSync('dist/repasse/ui.css', 'utf8');
  assert(rep.includes('outline:2px solid #b3c1a8'));
  for (const [game, p] of [
    ['broto', 'b'],
    ['cerco', 'ce'],
  ]) {
    const s = fs.readFileSync(`dist/${game}/ui.css`, 'utf8'),
      old = execFileSync('git', ['show', `${base}:dist/${game}/ui.css`], { encoding: 'utf8' });
    assert(s.startsWith(old));
    assert(
      s
        .slice(old.length)
        .includes(
          `#${game} .${p}-surface{border-radius:18px;outline:2px solid #b3c1a8;outline-offset:-1px;padding:16px 14px;overflow:visible}`,
        ),
    );
    assert(!s.slice(old.length).includes('board-wrap'));
  }
});
test('motores,mapas,arte,seleção e demais páginas ficam iguais', () => {
  const changed = execFileSync('git', ['diff', '--name-only', base, '--', 'dist'], {
    encoding: 'utf8',
  })
    .trim()
    .split('\n')
    .filter((x) => x && !x.includes('/__'));
  assert.deepEqual(changed.sort(), allowed.sort());
});
