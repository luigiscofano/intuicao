import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DIFFICULTY_PALETTE, difficultyIndex, presentDifficultyPalette } from '../dist/difficulty-palette.mjs';

function luminance(hex) {
  const rgb = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
test('seis cores aprovadas e contraste gráfico mínimo 3:1 no papel', () => {
  assert.deepEqual(DIFFICULTY_PALETTE.map(x => x.color), ['#7B817A','#285D7C','#725580','#805D43','#2C302D','#A7443D']);
  for (const {color} of DIFFICULTY_PALETTE) assert.ok((luminance('#fffefa') + .05) / (luminance(color) + .05) >= 3);
});
test('todas famílias de cabeçalhos usam nomes, sem depender da posição', () => {
  for (const [i, {name}] of DIFFICULTY_PALETTE.entries()) {
    for (const label of [name, `${i+1} · ${name} Níveis 1–15`, `${name} · 1–15`, `${name}0 / 15`]) assert.equal(difficultyIndex(label), i);
  }
  assert.equal(difficultyIndex('Prepare a partida'), -1);
  assert.equal(difficultyIndex('Mestrado'), -1);
});
test('repetição e estados permanecem intactos', () => {
  const headings = DIFFICULTY_PALETTE.map(({name}) => ({textContent:name, dataset:{}, ariaLabel:name}));
  const root = {querySelectorAll: () => headings};
  presentDifficultyPalette(root);presentDifficultyPalette(root);
  headings.forEach((heading, i) => { assert.equal(heading.dataset.difficultyTier,String(i)); assert.equal(heading.textContent,heading.ariaLabel); });
  headings[0].textContent='Outro grupo';presentDifficultyPalette(root);assert.equal(headings[0].dataset.difficultyTier,undefined);
});
test('somente marcadores, mesma geometria PNG e integração comum às campanhas', () => {
  const css=readFileSync('dist/selection-presentation.css','utf8');
  assert.match(css,/mask: url\("platform-assets\/tiles\/blue-br.png"\)/);
  assert.match(readFileSync('dist/selection-presentation.mjs','utf8'),/if\(campaign\)presentDifficultyPalette\(root\)/);
});
