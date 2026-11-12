import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const root = new URL('../', import.meta.url);
const baseline = 'd88a30698c9e1a41d98e6cbf1c1807ef3ad15d9d';
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
const read = path => {
  let source = readFileSync(new URL(path, root), 'utf8');
  // Desconta apenas o delta visual aprovado do Refúgio ao comparar a mudança histórica do Mirante.
  if (path === 'dist/logica/ui.mjs') source = source
    .replace("import { readRefugioSkin, writeRefugioSkin } from './games/refugio/skin.mjs';\n", '')
    .replace(", skin: metadata.id === 'refugio' ? readRefugioSkin() : undefined", '')
    .replace(/    const refugioSkinButton[\s\S]*?    }\n(?=    const target)/, '');
  if (path === 'dist/approved-game-shell.mjs') source = source
    .replace("import { readRefugioSkin } from './logica/games/refugio/skin.mjs';\n", '')
    .replace(/^.*refugio-skin-change.*\n/gm, '')
    .replace(/^.*approved-tiles--refugio.*\n/gm, '');
  if (path === 'dist/approved-game-shell.css') source = source.split('\n/* AIIJ aprovada do Refúgio;')[0];
  return source;
};
const prior = path => git('show', `${baseline}:${path}`);
const allowed = [
  'dist/approved-game-shell.css', 'dist/approved-game-shell.mjs',
  'dist/logica/games/mirante/README.md', 'dist/logica/games/mirante/art.mjs',
  'dist/logica/games/mirante/index.mjs', 'dist/logica/games/mirante/view.css',
  'dist/logica/games/mirante/view.mjs', 'dist/logica/ui.mjs',
  'dist/platform-assets/README.md', 'dist/platform-assets/mirante-aiij-a.png',
  'dist/platform-assets/mirante-aiij-a.svg',
  // Refúgio aprovado posteriormente: visual isolado, sem alterações de regras.
  'dist/logica/games/refugio/README.md', 'dist/logica/games/refugio/view.mjs',
  'dist/logica/games/refugio/view.css', 'dist/logica/games/refugio/skin.mjs',
  'dist/platform-assets/refugio-aiij-folhas.svg',
];
test('MIRANTE preserva todos os motores, campanhas, geradores, saves e demais jogos', () => {
  const changed = git('diff', '--name-only', baseline, '--', 'dist');
  const untracked = git('ls-files', '--others', '--exclude-standard', 'dist');
  for (const file of `${changed}\n${untracked}`.split('\n').filter(Boolean)) assert.ok(allowed.includes(file), file);
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
  const reverted = (current.slice(0, start) + current.slice(end))
    .replace('function cellAction(target, tool = selectedTool) {', 'function cellAction(target) {')
    .replace("edit({ type: 'cell', index, tool }, index);", "edit({ type: 'cell', index, tool: selectedTool }, index);");
  assert.equal(reverted.trimEnd(), prior('dist/logica/ui.mjs').trimEnd());
});
test('shell muda somente a AIIJ do MIRANTE e CSS permanece restrito à sua classe', () => {
  assert.equal(read('dist/approved-game-shell.mjs').replace('      tiles.classList.toggle("approved-tiles--mirante", game === "mirante");\n', '').trimEnd(), prior('dist/approved-game-shell.mjs').trimEnd());
  const previous = prior('dist/approved-game-shell.css'), current = read('dist/approved-game-shell.css');
  assert.ok(current.startsWith(previous));
  const addition = current.slice(previous.length);
  assert.deepEqual([...addition.matchAll(/([^{}]+)\{/g)].map(m => m[1].replace(/\/\*[\s\S]*?\*\//g, '').trim()), ['.approved-tiles.approved-tiles--mirante', '.approved-tiles.approved-tiles--mirante > span']);
  assert.match(addition, /mirante-aiij-a\.png/);
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
