import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const css = read('dist/identity.css');
const html = read('dist/index.html');
const baseline = '070eba5';
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
const rules = [...clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
  .map(([, selector, declarations]) => [selector.trim(), declarations]);
const rule = (selector) => rules.find(([candidate]) => candidate === selector)?.[1] || '';

test('a camada visual carrega uma vez, após os estilos existentes, sem sessão de demonstração', () => {
  assert.equal((html.match(/href="identity\.css"/g) || []).length, 1);
  assert.equal(html.replace('    <link rel="stylesheet" href="identity.css" />\n', ''), git('show', `${baseline}:dist/index.html`));
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

test('retrato da entrega: código, saves, campanhas, artes e rosetas são idênticos ao PR 52', () => {
  // Contrato desta entrega, como os retratos históricos do repositório.
  // Uma alteração funcional futura deve revisar explicitamente este contrato.
  assert.equal(git('diff', '--name-only', baseline, '--', 'dist', ':(exclude)dist/index.html', ':(exclude)dist/identity.css'), '');
  const extras = git('ls-files', '--others', '--exclude-standard', '--', 'dist').trim().split('\n').filter(Boolean);
  assert.deepEqual(extras.filter((path) => path !== 'dist/identity.css'), []);
});
