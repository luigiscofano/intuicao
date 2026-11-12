import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const css = read('dist/identity.css');
const html = read('dist/index.html');
const baseline = '070eba5';
const motionBaseline = 'cdc5c756a340c7613c62cded00650ef98d267ec7';
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
const rules = [...clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
  .map(([, selector, declarations]) => [selector.trim(), declarations]);
const rule = (selector) => rules.find(([candidate]) => candidate === selector)?.[1] || '';

test('a camada visual carrega uma vez, após os estilos existentes, sem sessão de demonstração', () => {
  assert.equal((html.match(/href="identity\.css"/g) || []).length, 1);
  // Aprovação de 11/11: duas folhas de movimento e controle local de preferência.
  // Remover somente esses acréscimos mantém a comparação histórica integral.
  const beforeMotion = html
    .replace('    <link rel="stylesheet" href="ui-motion.css" />\n', '')
    .replace('    <link rel="stylesheet" href="victory-tiles.css" />\n', '')
    .replace(/        <div class="motion-preferences" role="group" aria-label="Animações">\n[^]*?        <\/div>\n/, '')
    .replace('    <script type="module" src="motion-preference.mjs"></script>\n', '');
  assert.equal(beforeMotion, git('show', `${motionBaseline}:dist/index.html`));
  assert.equal(beforeMotion.replace('    <link rel="stylesheet" href="identity.css" />\n', ''), git('show', `${baseline}:dist/index.html`));
  assert.equal(css, git('show', `${motionBaseline}:dist/identity.css`));
  assert.ok(html.indexOf('identity.css') > html.indexOf('versus/ui.css'));
  assert.doesNotMatch(html, /identity-preview|preview-session/);
  assert.equal(existsSync(new URL('dist/preview-session.js', root)), false);
});

test('o acabamento se limita às seis superfícies aprovadas, sem tabuleiro ou rosetas', () => {
  for (const [selector] of rules) {
    assert.match(selector, /^(?::root|#library-controls>|#main>\.games>|body #main \.(?:level-screen|level-tile|selection-rules-preview)|body\.approved-game-view #main \.(?:approved-action-panel|approved-real-actions \.action-hint)|#achievements \.(?:achievement-heading|achievement-summary|achievement-card|achievement-tabs)|#fauna-(?:dialog|title)|body>footer)/, selector);
    assert.doesNotMatch(selector, /canvas|svg|board|achievement-icon|achievement-symbol|ai-rosette|footer::before|footer-signature/);
  }
  assert.doesNotMatch(css, /--preview-|url\(|@import|localStorage|sessionStorage|animation:|transition:/);
  for (const [, body] of rules) {
    const properties = body.split(';').filter((part) => part.trim()).map((part) => part.split(':')[0].trim());
    assert.equal(new Set(properties).size, properties.length, 'sem declarações mortas no mesmo bloco');
  }
});

test('marcas, cores de apoio e frisos preservam a identidade aprovada', () => {
  assert.match(rule(':root'), /--identity-blue: #244b63/);
  assert.match(rule(':root'), /--identity-green: #39654c/);
  assert.match(rule(':root'), /--identity-gold: #cca034/);
  for (const category of ['logica', 'versus']) {
    assert.match(rule(`#library-controls>.category-choices>button[data-category='${category}']:not([data-category=''])::before`), /border-radius:/);
  }
  assert.match(rule('body #main .level-screen'), /background: var\(--identity-paper\)/);
  assert.match(rule('body.approved-game-view #main .approved-real-actions .action-hint'), /background: var\(--identity-blue\)/);
  assert.doesNotMatch(rule('body.approved-game-view #main .approved-action-panel'), /padding|width|height|grid/);
  for (const selector of ['#achievements .achievement-heading::after', '#fauna-dialog .fauna-heading::before', 'body>footer::after']) {
    assert.match(rule(selector), /radial-gradient/);
    assert.match(rule(selector), /pointer-events: none/);
  }
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*padding-right: 0;[\s\S]*position: static;/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*left: 20px;/);
});

test('movimento aprovado preserva todos os arquivos fora do escopo, inclusive Versus', () => {
  // A autorização amplia só a apresentação solo, conquistas e microinterações.
  // Motores, saves, artes, campanhas e resultados Versus continuam protegidos.
  const approved = [
    'index.html', 'result-motion.mjs', 'achievements/notifications.mjs',
    'achievements/notifications.css', 'achievements/view.mjs', 'ui-motion.mjs',
    'ui-motion.css', 'motion-preference.mjs', 'victory-tiles.mjs',
    'victory-tiles.css', 'identity.css',
  ].map(path => `dist/${path}`);
  assert.equal(git('diff', '--name-only', motionBaseline, '--', 'dist',
    ...approved.map(path => `:(exclude)${path}`)), '');
  const extras = git('ls-files', '--others', '--exclude-standard', '--', 'dist').trim().split('\n').filter(Boolean);
  assert.deepEqual(extras.filter(path => !approved.includes(path)), []);
  assert.equal(css, git('show', `${motionBaseline}:dist/identity.css`));
  assert.equal(git('diff', '--name-only', motionBaseline, '--', 'dist/versus', 'dist/versus-victory.mjs', 'dist/versus-victory.css'), '');
});
