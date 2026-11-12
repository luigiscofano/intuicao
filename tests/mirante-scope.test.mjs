import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const root = new URL('../', import.meta.url);
const baseline = 'd88a30698c9e1a41d98e6cbf1c1807ef3ad15d9d';
// Escopo histórico do PR 67: comparar com seu head aprovado, não com
// implementações posteriores de outros jogos. Regressões atuais continuam abaixo.
const approvedMirante = '7b89a7ee2b96fa59de294f5a1ce7f272929d077f';
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
const read = path => readFileSync(new URL(path, root), 'utf8');
const approved = path => git('show', `${approvedMirante}:${path}`);
const prior = path => git('show', `${baseline}:${path}`);
const allowed = [
  'dist/approved-game-shell.css', 'dist/approved-game-shell.mjs',
  'dist/logica/games/mirante/README.md', 'dist/logica/games/mirante/art.mjs',
  'dist/logica/games/mirante/index.mjs', 'dist/logica/games/mirante/view.css',
  'dist/logica/games/mirante/view.mjs', 'dist/logica/ui.mjs',
  'dist/platform-assets/README.md', 'dist/platform-assets/mirante-aiij-a.png',
  'dist/platform-assets/mirante-aiij-a.svg',
];
test('PR 67 preservou todos os motores, campanhas, geradores, saves e demais jogos', () => {
  const changed = git('diff', '--name-only', baseline, approvedMirante, '--', 'dist');
  for (const file of changed.split('\n').filter(Boolean)) assert.ok(allowed.includes(file), file);
});
test('host recebe somente ferramenta explícita e botão direito restrito ao MIRANTE', () => {
  const current = read('dist/logica/ui.mjs');
  const start = current.indexOf('  // Apenas o botão secundário');
  const end = current.indexOf("  host.addEventListener('keydown'", start);
  assert.ok(start >= 0 && end > start);
  assert.match(current.slice(start, end), /metadata\?\.id !== 'mirante'/);
  assert.match(current.slice(start, end), /event\.button !== 2/);
  assert.match(current.slice(start, end), /event\.pointerType !== 'mouse'/);
  assert.match(current.slice(start, end), /cellAction\(target, 'empty'\)/);
  const historical = approved('dist/logica/ui.mjs');
  const historicalStart = historical.indexOf('  // Apenas o botão secundário');
  const historicalEnd = historical.indexOf("  host.addEventListener('keydown'", historicalStart);
  // O handler aprovado permanece idêntico mesmo após novos recursos no host.
  assert.equal(current.slice(start, end), historical.slice(historicalStart, historicalEnd));
  const reverted = (historical.slice(0, historicalStart) + historical.slice(historicalEnd))
    .replace('function cellAction(target, tool = selectedTool) {', 'function cellAction(target) {')
    .replace("edit({ type: 'cell', index, tool }, index);", "edit({ type: 'cell', index, tool: selectedTool }, index);");
  assert.equal(reverted, prior('dist/logica/ui.mjs'));
});
test('shell muda somente a AIIJ do MIRANTE e CSS permanece restrito à sua classe', () => {
  assert.ok(read('dist/approved-game-shell.mjs').includes('tiles.classList.toggle("approved-tiles--mirante", game === "mirante")'));
  assert.equal(approved('dist/approved-game-shell.mjs').replace('      tiles.classList.toggle("approved-tiles--mirante", game === "mirante");\n', ''), prior('dist/approved-game-shell.mjs'));
  const previous = prior('dist/approved-game-shell.css'), current = approved('dist/approved-game-shell.css');
  assert.ok(current.startsWith(previous));
  const addition = current.slice(previous.length);
  assert.deepEqual([...addition.matchAll(/([^{}]+)\{/g)].map(m => m[1].replace(/\/\*[\s\S]*?\*\//g, '').trim()), ['.approved-tiles.approved-tiles--mirante', '.approved-tiles.approved-tiles--mirante > span']);
  assert.match(addition, /mirante-aiij-a\.png/);
  assert.ok(read('dist/approved-game-shell.css').includes(addition.trim()));
});
test('adaptador muda apenas o texto de controles, sem regras nem catálogo', () => {
  const strip = source => source.replace(/  instructions: '[^']*',?/, '  instructions: APROVADO,');
  assert.equal(strip(read('dist/logica/games/mirante/index.mjs')), strip(prior('dist/logica/games/mirante/index.mjs')));
});
test('AIIJ A preserva os bytes aprovados', () => {
  for (const [ext, sha] of [['png', '4fccbebc14edaaac7ccd35186d2eac17e7f604c48400daa70ba3482a54b02ccb'], ['svg', '9ea6372be15be43a5b191c6e0df475456a229c10b2b1c4b5e970a55092d39447']]) {
    assert.equal(createHash('sha256').update(readFileSync(new URL(`dist/platform-assets/mirante-aiij-a.${ext}`, root))).digest('hex'), sha);
  }
});


// A identidade aprovada do MIRANTE continua protegida no código atual.
test('arquivos exclusivos do MIRANTE preservam a versão aprovada', () => {
  for (const file of allowed.filter(path => path.startsWith('dist/logica/games/mirante/'))) {
    assert.equal(read(file), approved(file), file);
  }
});
