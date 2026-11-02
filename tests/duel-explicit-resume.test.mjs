// Testes e verificações de componentes compartilhados do Intuição.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const base = '4421985ef503fe85175735f56396430ab228b43e',
  git = (...a) => execFileSync('git', a, { encoding: 'utf8' }).trim();
test('somente apresentação/rotas CERCO e BROTO mudam; motores e outros jogos intactos', () => {
  for (const line of git('ls-tree', '-r', base, '--', 'dist').split('\n')) {
    const [m, p] = line.split('\t');
    if (/^dist\/(cerco|broto)\/(ui\.mjs|ui\.css|route\.mjs)$/.test(p)) continue;
    assert.equal(git('hash-object', p), m.split(' ')[2], p);
  }
});
test('rotas sempre ativam preparação e retomada é escolha explícita', () => {
  for (const game of ['broto', 'cerco']) {
    const ui = readFileSync(`dist/${game}/ui.mjs`, 'utf8'),
      route = readFileSync(`dist/${game}/route.mjs`, 'utf8');
    assert(!route.includes('game.restoreOnLoad()'));
    assert(route.includes('game.activate()'));
    assert(ui.includes('Deseja retomar a partida interrompida?'));
    assert(ui.includes('Retomar partida interrompida'));
    assert(ui.includes(game === 'broto' ? '!state.duelOver' : '!state.over'));
  }
  const ce = readFileSync('dist/cerco/ui.mjs', 'utf8');
  assert(ce.includes('config=structuredClone(playConfig||config)'));
  assert(ce.includes('config:playConfig||config'));
});
