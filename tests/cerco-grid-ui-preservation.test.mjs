// Testes e verificações de CERCO.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const base = '95aed6278981f58eb550e3d125314040f58d2b23',
  git = (...a) => execFileSync('git', a, { encoding: 'utf8' }).trim();
test('apenas arquivos CERCO autorizados mudam; outros dez jogos e ativos intactos', () => {
  const allowed = new Set([
    'dist/cerco/maps.mjs',
    'dist/cerco/engine.mjs',
    'dist/cerco/ui.mjs',
    'dist/cerco/ui.css',
    'dist/cerco/bot.mjs',
    'dist/cerco/worker.mjs',
    'dist/game-info-content.mjs',
  ]);
  for (const line of git('ls-tree', '-r', base, '--', 'dist').split('\n')) {
    const [m, p] = line.split('\t');
    if (allowed.has(p)) continue;
    assert.equal(git('hash-object', p), m.split(' ')[2], p);
  }
});
test('controle de tamanho filtra catálogo e mantém confirmação de troca segura', () => {
  const ui = readFileSync('dist/cerco/ui.mjs', 'utf8');
  assert.match(ui, /getCercoMapVariant\(selectedMap,\+b.dataset.ceSize\)/);
  assert.match(ui, /getCercoMapsForSize\(getCercoMap\(selectedMap\).rows\)/);
  assert.match(ui, /aria-labelledby="ce-size-label"/);
  assert.match(ui, /state.history.length&&!preparationApproved/);
  assert.match(ui, /config:playConfig\|\|config/);
  assert.match(ui, /coord\(selected,map.cols\)/);
  assert.match(ui, /getComputedStyle\(board\).columnGap/);
});

test('somente a regra de tamanho CERCO muda nas informações dos jogos', () => {
  const old = execFileSync('git', ['show', base + ':dist/game-info-content.mjs'], {
      encoding: 'utf8',
    }),
    now = readFileSync('dist/game-info-content.mjs', 'utf8');
  assert.equal(
    now,
    old.replace(
      'Cada time controla três peças em uma grade 5 × 5.',
      'Cada time controla três peças. Na preparação, escolha uma grade de 5 × 5 a 8 × 8, com sete mapas por tamanho.',
    ),
  );
});
