import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
// Árvore do PR65: inclui o traçado RENOVO e suas correções de cancelamento.
const baseline = '39b113ebb37101e02dde1acd4b2d1ecb2c7ee311';
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
// Contrato histórico do PR66; o delta atual é protegido por mirante-scope.
const release = 'd88a30698c9e1a41d98e6cbf1c1807ef3ad15d9d';
const read = path => git('show', `${release}:${path}`);
const prior = path => git('show', `${baseline}:${path}`);
const allowed = [
  'dist/collection-ui.mjs',
  'dist/game-viewport.css',
  'dist/index.html',
  'dist/logica/ui.mjs',
  'dist/orbita/ui.mjs',
  'dist/repasse/ui.mjs',
  'dist/sintonia/ui.mjs',
];

test('setas preservam motores, saves, geradores, regras, Versus e RENOVO', () => {
  const changed = git('diff', '--name-only', baseline, release, '--', 'dist');
  const untracked = git('diff', '--name-only', '--diff-filter=A', baseline, release, '--', 'dist');
  for (const file of `${changed}\n${untracked}`.split('\n').filter(Boolean)) {
    assert.ok(allowed.includes(file), file);
  }
});

test('campanhas de movimento recebem somente atributos acessíveis nas setas', () => {
  for (const [game, prefix, target] of [
    ['orbita', 'o', 'o-board-scroll'],
    ['repasse', 'r', 'r-board'],
    ['sintonia', 's', 's-play-area'],
  ]) {
    const path = `dist/${game}/ui.mjs`;
    let expected = prior(path);
    for (const direction of ['prev', 'next']) {
      expected = expected.replace(
        `<button id="${prefix}-level-${direction}" class="level-arrow"`,
        `<button type="button" id="${prefix}-level-${direction}" class="level-arrow" aria-controls="${target}"`,
      );
    }
    assert.equal(read(path), expected, game);
  }
});

test('HTML original recebe somente tipo de botão e vínculo ao tabuleiro', () => {
  let expected = prior('dist/index.html');
  for (const direction of ['prev', 'next']) {
    expected = expected.replace(
      `                id="level-${direction}"\n`,
      `                id="level-${direction}"\n                type="button"\n                aria-controls="scene"\n`,
    );
  }
  assert.equal(read('dist/index.html'), expected);
});

test('coleção limita o delta às setas e ao isolamento de Sem Parar', () => {
  let expected = prior('dist/collection-ui.mjs')
    .replace('      nextEndless();\n      return;\n    }\n    const next = index + delta;',
      '      if (delta > 0) nextEndless();\n      return;\n    }\n    const next = index + delta;')
    .replace('$("c-next").disabled = !custom && index === catalogue[game].length - 1;',
      '$("c-next").disabled = !endless && !custom && index === catalogue[game].length - 1;');
  for (const direction of ['prev', 'next']) {
    expected = expected.replace(
      `game !== "desvio" && !custom ? '<button id="c-level-${direction}" class="level-arrow"`,
      `game !== "desvio" && !custom && !endless ? '<button type="button" id="c-level-${direction}" class="level-arrow" aria-controls="c-board"`,
    );
  }
  assert.equal(read('dist/collection-ui.mjs'), expected);
});

test('lógica move os mesmos botões sem alterar handlers nem o traçado RENOVO', () => {
  // Compara o arquivo inteiro após retirar somente a mudança de apresentação.
  const withoutArrows = source => source.replace(/<button type="button" id="lg-(prev|next)"[^>]*>[←→]<\/button>/g, '');
  const current = withoutArrows(read('dist/logica/ui.mjs'))
    .replace('<div class="board-navigation logic-board-navigation" role="group" aria-label="Área do jogo e navegação de níveis">', '')
    .replace('</div></div><div id="lg-result-motion"', '</div><div id="lg-result-motion"');
  assert.equal(current, withoutArrows(prior('dist/logica/ui.mjs')));
});

test('CSS mantém intactas as regras de viewport anteriores', () => {
  const previous = prior('dist/game-viewport.css');
  const current = read('dist/game-viewport.css');
  assert.ok(current.startsWith(previous));
  const addition = current.slice(previous.length);
  assert.match(addition, /\.logic-board-navigation/);
  assert.match(addition, /\.approved-campaign-actions/);
  assert.doesNotMatch(addition, /(?:url\(|@import|position\s*:\s*fixed)/);
});
