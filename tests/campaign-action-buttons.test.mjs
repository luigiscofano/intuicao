import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { GAME_PRESENTATION } from '../dist/approved-game-shell.mjs';

const read = path => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const css = read('dist/campaign-action-buttons.css');
const shell = read('dist/approved-game-shell.mjs');
const campaigns = [
  'light', 'cut', 'elo', 'prumo', 'pacto', 'sintonia', 'repasse', 'orbita',
  'divisa', 'pulso', 'foz', 'refugio', 'mirante', 'renovo',
];

test('escopo cobre exatamente 14 campanhas e exclui os 11 Versus', () => {
  const campaignIds = Object.entries(GAME_PRESENTATION)
    .filter(([, presentation]) => presentation.category !== 'Versus')
    .map(([id]) => id);
  assert.deepEqual(campaignIds.sort(), campaigns.slice().sort());
  assert.equal(Object.values(GAME_PRESENTATION).filter(item => item.category === 'Versus').length, 11);
  assert.match(shell, /classList\.toggle\(\s*["']approved-campaign-actions["'],\s*active\s*&&\s*presentation\.category\s*!==\s*["']Versus["']/);
});

test('estilos ficam limitados à campanha e aos controles pretendidos', () => {
  const ids = [...css.matchAll(/#([\w-]+)/g)]
    .map(match => match[1]).filter(id => !/^[a-f\d]+$/i.test(id));
  const actions = ['confirm', 'check', 'undo', 'redo', 'reset', 'restart'];
  for (const id of ids) {
    assert.ok(id === 'main' || actions.some(action =>
      id === action || new RegExp(`^(c|s|r|o|lg)-${action}$`).test(id)), id);
  }
  assert.doesNotMatch(css, /#(?:nv|b|ce)-|\[data-cell\]|\.versus-board/);
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const selectors = noComments.split('}').map(rule => rule.split('{')[0].trim())
    .filter(selector => selector && !selector.startsWith('@media'));
  for (const selector of selectors) {
    assert.ok(selector.startsWith('body.approved-campaign-actions'), selector);
  }
});

test('controles recebem ícone SVG sem modificar rótulos ou estados', () => {
  const ids = [
    'confirm', 'c-confirm', 's-confirm', 'r-confirm', 'o-confirm', 'lg-confirm', 'c-check',
    'undo', 'c-undo', 's-undo', 'r-undo', 'o-undo', 'lg-undo',
    'redo', 'c-redo', 's-redo', 'r-redo', 'o-redo', 'lg-redo',
    'reset', 'c-reset', 's-reset', 'r-reset', 'o-reset', 'lg-restart',
  ];
  for (const id of ids) assert.ok(css.includes(`#${id}`), id);
  assert.equal((css.match(/data:image\/svg\+xml/g) || []).length, 5);
  assert.match(css, /::before[\s\S]*?content: ''/);
  assert.match(css, /pointer-events: none/);
  assert.match(css, /\[hidden\]\s*\{ display: none !important/);
  assert.match(css, /:disabled/);
  assert.match(css, /min-height: 46px/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /forced-colors: active/);
  assert.doesNotMatch(shell, /innerHTML\s*=.*campaign-action|localStorage|sessionStorage|fetch\(/);
});

function luminance(hex) {
  const linear = hex.slice(1).match(/../g).map(channel => parseInt(channel, 16) / 255)
    .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return linear.reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
}

test('textos ativos têm contraste de pelo menos 6,4:1', () => {
  const pairs = [
    ['#fffaf0', '#39654c'], ['#304b39', '#e3eadb'], ['#244b63', '#e7edf0'],
    ['#624a13', '#f4e7bb'], ['#8a4732', '#fffaf0'],
  ];
  for (const [foreground, background] of pairs) {
    const [dark, light] = [luminance(foreground), luminance(background)].sort((a, b) => a - b);
    assert.ok((light + .05) / (dark + .05) >= 6.4, `${foreground}/${background}`);
  }
});

test('conclusão automática continua oculta e Checar permanece distinto de Confirmar', () => {
  for (const [folder, prefix] of [['sintonia', 's'], ['repasse', 'r'], ['orbita', 'o']]) {
    assert.match(read(`dist/${folder}/ui.mjs`), new RegExp(`<button[^>]*id=["']${prefix}-confirm["'][^>]*hidden`));
  }
  assert.match(read('dist/collection-ui.mjs'), /id="c-confirm"/);
  assert.match(read('dist/collection-ui.mjs'), /id="c-check"/);
  assert.match(read('dist/app.mjs'), /\$\("confirm"\)\.textContent/);
});

test('folha de estilo carrega uma vez após as camadas visuais existentes', () => {
  const html = read('dist/index.html');
  assert.equal((html.match(/href="campaign-action-buttons.css"/g) || []).length, 1);
  assert.ok(html.indexOf('campaign-action-buttons.css') > html.indexOf('identity.css'));
});

// O novo escopo não autoriza alterações em motores, saves, campanhas ou artes.
test('integração preserva a base responsiva fora dos arquivos aprovados', async () => {
  const { execFileSync } = await import('node:child_process');
  const root = new URL('../', import.meta.url);
  const approved = [
    // Seleção unificada, diário original e sessão contínua lógica aprovados depois.
    'app.mjs', 'collection-ui.mjs', 'daily-challenge.mjs', 'logica/storage.mjs',
    'logica/endless.mjs', 'selection-presentation.mjs', 'selection-presentation.css',
    // Mosaico do rodapé aprovado depois; limites exatos em identity.test.mjs.
    'identity.css',
    // Como jogar: 25 cartões com loop, escopo protegido em rules-scope.test.mjs.
    'rules-examples.css', 'rules-examples.mjs', 'rules-preview.css', 'rules-preview.mjs',
    'rules-logic-examples.mjs', 'rules-versus-examples.mjs', 'logica/ui.mjs',
    'approved-game-shell.css', 'approved-game-shell.mjs', 'campaign-action-buttons.css',
    'index.html', 'versus/README.md', 'versus/ui.mjs', 'versus/repeat-choice.mjs',
    'versus/games/dobra/view.mjs', 'versus/games/enlace/view.mjs',
    'versus/games/estalo/view.mjs', 'versus/games/mosaico/view.mjs',
    'versus/games/quinhao/view.mjs', 'versus/games/vazante/view.mjs',
  ].map(path => `dist/${path}`);
  const changed = execFileSync('git', [
    'diff', '--name-only', '012870b0cb6fffe002771423a608285cd3f40949', '--', 'dist',
    ...approved.map(path => `:(exclude)${path}`),
  ], { cwd: root, encoding: 'utf8' });
  assert.equal(changed, '');
});
