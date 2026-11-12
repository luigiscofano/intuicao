import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const root = new URL('../', import.meta.url);
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
// Árvore da main dd43e990 após FOZ #63; identidade compartilhada com GitHub.
const baseline = '24ea87b22d22947456e14c67b8b727ed27820f30';
// Contrato histórico até PR64; RENOVO tem escopo atual próprio.
const viewportRelease = '938709655ecbf248469e106fa740586c25b7ac97';
const allowed = ['dist/board-fit.mjs', 'dist/index.html', 'dist/game-viewport.mjs',
  'dist/game-viewport.css', 'dist/selection-presentation.mjs'];
const read = path => readFileSync(new URL(path, root), 'utf8');
const prior = path => git('show', `${baseline}:${path}`);
test('viewport preserva motores, campanhas, saves, geradores, PNGs e FOZ fora dos cinco arquivos autorizados', () => {
  const changed = git('diff', '--name-only', baseline, viewportRelease, '--', 'dist').trim().split('\n').filter(Boolean);
  const added = git('diff', '--name-only', '--diff-filter=A', baseline, viewportRelease, '--', 'dist').trim().split('\n').filter(Boolean);
  for (const file of [...changed, ...added]) assert.ok(allowed.includes(file), file);
});
test('index adiciona somente os dois includes de viewport', () => {
  // As setas posteriores têm contrato separado; conserva-se a entrega do viewport.
  const stripped = git('show', `${viewportRelease}:dist/index.html`)
    .replace('    <link rel="stylesheet" href="game-viewport.css" />\n', '')
    .replace('    <script type="module" src="game-viewport.mjs"></script>\n', '');
  assert.equal(stripped, prior('dist/index.html'));
});
test('board-fit somente delega shells aprovados para o enquadramento completo', () => {
  assert.equal(read('dist/board-fit.mjs').replace('      // O enquadramento novo mede também todos os controles do shell.\n      if (board.closest(\'.approved-game-section\')) continue;\n', ''), prior('dist/board-fit.mjs'));
});
test('seleção somente remove o aviso redundante de níveis', () => {
  assert.equal(read('dist/selection-presentation.mjs'), prior('dist/selection-presentation.mjs')
    .replace("section(root,'levels','Níveis','Escolha uma faixa e jogue no seu ritmo. Seu progresso fica neste navegador.')", "section(root,'levels','Níveis')"));
});
