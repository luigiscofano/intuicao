import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
const baseline = '938709655ecbf248469e106fa740586c25b7ac97';
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
// Contrato histórico da entrega RENOVO; o delta atual é protegido por level-arrows-scope.
const release = '39b113ebb37101e02dde1acd4b2d1ecb2c7ee311';
const read = path => git('show', `${release}:${path}`);
const prior = path => git('show', `${baseline}:${path}`);
const allowed = [
  'dist/approved-game-shell.css',
  'dist/approved-game-shell.mjs',
  'dist/logica/games/renovo/README.md',
  'dist/logica/games/renovo/art.mjs',
  'dist/logica/games/renovo/engine.mjs',
  'dist/logica/games/renovo/geometry.mjs',
  'dist/logica/games/renovo/index.mjs',
  'dist/logica/games/renovo/trace-input.mjs',
  'dist/logica/games/renovo/trace-model.mjs',
  'dist/logica/games/renovo/view.css',
  'dist/logica/games/renovo/view.mjs',
  'dist/logica/ui.mjs',
  'dist/platform-assets/renovo-aiij-c1.png',
  'dist/platform-assets/renovo-aiij-c1.svg',
  'dist/rules-logic-examples.mjs',
];

test('RENOVO altera somente o delta aprovado e preserva FOZ, viewport, saves e geradores', () => {
  const changed = git('diff', '--name-only', baseline, release, '--', 'dist').trim().split('\n').filter(Boolean);
  const untracked = git('diff', '--name-only', '--diff-filter=A', baseline, release, '--', 'dist').trim().split('\n').filter(Boolean);
  for (const file of [...changed, ...untracked]) assert.ok(allowed.includes(file), file);
});

test('shell compartilhado só recebe a AIIJ C1 do RENOVO', () => {
  const expected = prior('dist/approved-game-shell.mjs')
    .replace('// AIIJ aprovada do FOZ: só a arte muda; outras rotas mantêm o mosaico.', '// AIIJs aprovadas: só a arte destas rotas muda; as demais mantêm o mosaico.')
    .replace('      tiles.classList.toggle("approved-tiles--foz", game === "foz");\n',
      '      tiles.classList.toggle("approved-tiles--foz", game === "foz");\n      tiles.classList.toggle("approved-tiles--renovo", game === "renovo");\n');
  assert.equal(read('dist/approved-game-shell.mjs'), expected);
  const css = read('dist/approved-game-shell.css');
  const baseCss = prior('dist/approved-game-shell.css');
  assert.ok(css.startsWith(baseCss));
  const addition = css.slice(baseCss.length);
  assert.match(addition, /renovo-aiij-c1\.png/);
  assert.deepEqual([...addition.matchAll(/([^{}]+)\{/g)].map(match => match[1].replace(/\/\*[\s\S]*?\*\//g, '').trim()), [
    '.approved-tiles.approved-tiles--renovo', '.approved-tiles.approved-tiles--renovo > span',
  ]);
});

test('integração lógica adiciona somente controle de traço, cancelamento e Escape', () => {
  // Reverte apenas as adições aprovadas para comparar todo o restante da UI.
  const stripped = read('dist/logica/ui.mjs')
    .replace("import { createRenovoTraceInput } from './games/renovo/trace-input.mjs';\n", '')
    .replace(/  const renovoTrace = createRenovoTraceInput\(host, \{[\s\S]*?\n  \}\);\n/, '')
    .replace(/^    renovoTrace\.cancel\(\);\n/gm, '')
    .replace(/^      renovoTrace\.cancel\(\);\n/gm, '')
    .replace(/^    if \(event\.key === 'Escape' && metadata\.id === 'renovo'\).*\n/gm, '')
    .replace("globalThis.addEventListener('pagehide', () => { renovoTrace.cancel(); advancement.cancel(); save(); });", "globalThis.addEventListener('pagehide', () => { advancement.cancel(); save(); });");
  assert.equal(stripped, prior('dist/logica/ui.mjs'));
  assert.doesNotMatch(read('dist/logica/ui.mjs'), /createLogicGenerator|cancelGeneration/);
});
