import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const css = read('dist/identity.css');
const html = read('dist/index.html');
const baseline = '070eba5';
// Os contratos anteriores são históricos; o escopo atual está em game-viewport-scope.test.mjs.
const beforePng = '3c0609db77b66aa27d4d61753e7db7f438b14ba9';
const motionBaseline = 'cdc5c756a340c7613c62cded00650ef98d267ec7';
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
const rules = [...clean.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
  .map(([, selector, declarations]) => [selector.trim(), declarations]);
// A aprovação posterior de 11/11 altera só o rodapé. As demais superfícies
// continuam byte a byte iguais à identidade original.
const withoutFooter = source => source
  .replace(/\/\* Rodapé:[^]*?(?=\/\* Em telas estreitas,)/, '')
  .replace(/@media \(max-width: 760px\) {\n  body>footer::after {\n    left: 20px;\n  }\n}\n$/, '');
const rule = (selector) => rules.find(([candidate]) => candidate === selector)?.[1] || '';

test('a camada visual carrega uma vez, após os estilos existentes, sem sessão de demonstração', () => {
  assert.equal((html.match(/href="identity\.css"/g) || []).length, 1);
  // Aprovação de 11/11: duas folhas de movimento e controle local de preferência.
  // Remover somente esses acréscimos mantém a comparação histórica integral.
  const beforeMotion = git('show', 'b34690d870b714280f742142413a64d9d7e0387e:dist/index.html')
    .replace('    <link rel="stylesheet" href="selection-presentation.css" />\n', '')
    .replace('    <script type="module" src="selection-presentation.mjs"></script>\n', '')
    .replace('          <button type="button" id="selection-daily">Desafio diário</button>\n', '')
    // Prévia dos botões de campanha aprovada em 11/11.
    .replace('    <link rel="stylesheet" href="campaign-action-buttons.css" />\n', '')
    .replace('    <link rel="stylesheet" href="board-fit.css" />\n', '')
    .replace('    <script type="module" src="board-fit.mjs"></script>\n', '')
    .replace('    <link rel="stylesheet" href="ui-motion.css" />\n', '')
    .replace('    <link rel="stylesheet" href="victory-tiles.css" />\n', '')
    .replace(/        <div class="motion-preferences" role="group" aria-label="Animações">\n[^]*?        <\/div>\n/, '')
    .replace('    <script type="module" src="motion-preference.mjs"></script>\n', '');
  assert.equal(beforeMotion, git('show', `${motionBaseline}:dist/index.html`));
  assert.equal(beforeMotion.replace('    <link rel="stylesheet" href="identity.css" />\n', ''), git('show', `${baseline}:dist/index.html`));
  assert.equal(withoutFooter(git('show', `${beforePng}:dist/identity.css`)), withoutFooter(git('show', `${motionBaseline}:dist/identity.css`)));
  assert.ok(html.indexOf('identity.css') > html.indexOf('versus/ui.css'));
  assert.doesNotMatch(html, /identity-preview|preview-session/);
  assert.equal(existsSync(new URL('dist/preview-session.js', root)), false);
});

test('o acabamento se limita às seis superfícies aprovadas, sem tabuleiro ou rosetas', () => {
  for (const [selector] of rules) {
    assert.match(selector, /^(?::root|#library-controls>|#main>\.games>|body #main \.(?:level-screen|level-tile|selection-rules-preview)|body\.approved-game-view #main \.(?:approved-action-panel|approved-real-actions \.action-hint)|#achievements \.(?:achievement-heading|achievement-summary|achievement-card|achievement-tabs)|#fauna-(?:dialog|title)|body>footer)/, selector);
    assert.doesNotMatch(selector, /canvas|svg|board|achievement-icon|achievement-symbol|ai-rosette|footer::before|footer-signature/);
  }
  assert.doesNotMatch(css, /--preview-|@import|localStorage|sessionStorage|animation:|transition:/);
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
    assert.match(rule(selector), /platform-assets\/tiles\/.*\.png/);
    assert.match(rule(selector), /pointer-events: none/);
  }
  assert.match(css, /@media \(max-width: 620px\)[\s\S]*padding-right: 0;[\s\S]*position: static;/);
  assert.match(rule('body>footer::after'), /inset: -9px auto auto 50%/);
  assert.doesNotMatch(css, /@media \(max-width: 760px\)[\s\S]*left: 20px;/);
});

test('movimento e vitórias Versus aprovados preservam todos os arquivos fora do escopo', () => {
  // Aprovação posterior amplia os emblemas e quatro integrações Versus.
  // Motores, saves, artes de origem e campanhas continuam protegidos.
  const approved = [
    // Contadores de campanha: remoções pontuais protegidas em campaign-progress-scope.test.mjs.
    'orbita/ui.mjs', 'sintonia/ui.mjs',
    // Seleção unificada, diário original e sessão contínua lógica aprovados depois.
    'app.mjs', 'collection-ui.mjs', 'daily-challenge.mjs', 'logica/storage.mjs',
    'logica/endless.mjs', 'selection-presentation.mjs', 'selection-presentation.css',
    'index.html', 'result-motion.mjs', 'achievements/notifications.mjs',
    'achievements/notifications.css', 'achievements/view.mjs', 'ui-motion.mjs',
    'ui-motion.css', 'motion-preference.mjs', 'victory-tiles.mjs',
    'victory-tiles.css', 'identity.css', 'versus-victory.mjs',
    'versus-victory-art.mjs', 'versus-victory.css', 'versus/ui.mjs',
    'broto/ui.mjs', 'cerco/ui.mjs', 'collection-ui.mjs',
    // Correção responsiva solicitada em 11/11: apresentação e texto de ajuda.
    'board-fit.css', 'board-fit.mjs', 'repasse/ui.mjs',
    // Como jogar em 25 jogos: somente texto, exemplos e integração de apresentação.
    'rules-examples.css', 'rules-examples.mjs', 'rules-preview.css', 'rules-preview.mjs',
    'rules-logic-examples.mjs', 'rules-versus-examples.mjs', 'logica/ui.mjs',
    // Botões de campanha e confirmação próxima/repetida em Versus, aprovados depois.
    'campaign-action-buttons.css', 'approved-game-shell.css', 'approved-game-shell.mjs',
    'versus/README.md', 'versus/repeat-choice.mjs',
    'versus/games/dobra/view.mjs', 'versus/games/enlace/view.mjs',
    'versus/games/estalo/view.mjs', 'versus/games/mosaico/view.mjs',
    'versus/games/quinhao/view.mjs', 'versus/games/vazante/view.mjs',
  ].map(path => `dist/${path}`);
  assert.equal(git('diff', '--name-only', motionBaseline, beforePng, '--', 'dist',
    ...approved.map(path => `:(exclude)${path}`)), '');
  const extras = git('diff', '--name-only', '--diff-filter=A', motionBaseline, beforePng, '--', 'dist').trim().split('\n').filter(Boolean);
  assert.deepEqual(extras.filter(path => !approved.includes(path)), []);
  assert.equal(withoutFooter(git('show', `${beforePng}:dist/identity.css`)), withoutFooter(git('show', `${motionBaseline}:dist/identity.css`)));
  // Revisão visual posterior do Quinhão: só apresentação e identificação dos frutos.
  // Motores, sessões e persistência continuam fora desta lista.
  const approvedVersus = [
    ...approved.filter(path => path.startsWith('dist/versus/')),
    'dist/versus/games/quinhao/README.md',
    'dist/versus/games/quinhao/index.mjs',
    'dist/versus/games/quinhao/fruit-art.mjs',
  ];
  assert.equal(git('diff', '--name-only', motionBaseline, '--', 'dist/versus',
    ...approvedVersus.map(path => `:(exclude)${path}`)), '');
});


test('o mosaico aprovado fecha a divisória sem corte, repetição ou captura de eventos', () => {
  const footer = rule('body>footer');
  const ornament = rule('body>footer::after');
  assert.match(footer, /border-top: 1px solid var\(--identity-line\) !important/);
  assert.match(ornament, /width: 100px/);
  assert.match(ornament, /height: 18px/);
  assert.match(ornament, /transform: translateX\(-50%\)/);
  assert.match(ornament, /background-size: 16px 16px/);
  assert.match(ornament, /background-position: 12px 1px,32px 1px,52px 1px,72px 1px/);
  assert.match(ornament, /background-repeat: no-repeat/);
  assert.match(ornament, /background-color: transparent/);
  assert.match(ornament, /opacity: 1/);
  assert.match(ornament, /pointer-events: none/);
  assert.match(ornament, /user-select: none/);
  assert.equal((ornament.match(/\.png/g) || []).length, 4);
  assert.doesNotMatch(ornament, /repeat-x|24px 12px|left: 20px|left: 40px/);
});
