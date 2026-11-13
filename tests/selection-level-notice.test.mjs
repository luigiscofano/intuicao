import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SELECTION_GAMES } from '../dist/selection-presentation.mjs';
import { CATEGORY_GAMES } from '../dist/category-navigation.mjs';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const presentation = read('dist/selection-presentation.mjs');

test('all 19 active games use the shared selection without the removed level notice', () => {
  const games = Object.values(CATEGORY_GAMES).flat();
  assert.equal(games.length, 19);
  assert.deepEqual(Object.keys(SELECTION_GAMES).filter(id=>games.includes(id)).sort(), games.sort());
  assert.doesNotMatch(presentation, /Escolha uma faixa e jogue no seu ritmo|Seu progresso fica neste navegador/);
  assert.match(presentation, /levels=section\(root,'levels','Níveis'\)/);
  assert.match(read('dist/index.html'), /selection-presentation\.mjs/);
});

test('level heading, catalogue, surprise button and progress are retained', () => {
  assert.match(presentation, /for\(const item of catalogue\)move\(item,levels\)/);
  assert.match(presentation, /if\(extras&&extras.children.length\)move\(extras,levels\)/);
  assert.match(presentation, /presentCampaignProgress\(root,game\)/);
  const logic = read('dist/logica/ui.mjs');
  assert.match(logic, /data-logic-random>Surpreenda-me<\/button>/);
  assert.match(logic, /id="lg-storage-warning"/);
});

test('other selection guidance and original game controls are preserved', () => {
  assert.match(presentation, /Um desafio da campanha escolhido para hoje\./);
  assert.match(presentation, /Continue explorando no seu ritmo\./);
  assert.match(presentation, /Escolha as opções disponíveis para este jogo\./);
  assert.doesNotMatch(presentation, /localStorage|sessionStorage|\.click\(|dispatchEvent|cloneNode/);
});
