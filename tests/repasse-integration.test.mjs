import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {GAME_INFO} from '../dist/game-info-content.mjs';
import {resultMarkup} from '../dist/result-motion.mjs';
import {selectionSelector} from '../dist/game-nav-scroll.mjs';

const baseline = '2a528fcf4e846576c9bb9b89864153bfb4e03a86';
const read = name => fs.readFileSync(new URL('../dist/'+name, import.meta.url), 'utf8');
const before = name => execFileSync('git', ['show', `${baseline}:dist/${name}`], {encoding: 'utf8', maxBuffer: 32 * 1024 * 1024});
const loadPrevious = async name => import('data:text/javascript;base64,'+Buffer.from(before(name)).toString('base64'));
const existing = ['light','cut','elo','prumo','pacto','desvio','sintonia'];

test('o oitavo acesso usa a seleção padrão e todos os sete acessos anteriores permanecem', () => {
  const html = read('index.html');
  assert.equal((html.match(/<button data-(?:game|collection|sintonia|repasse)=/g) ?? []).length, 8);
  for (const game of existing) assert.match(html, new RegExp(`data-(?:game|collection|sintonia)="${game}"`));
  assert.match(html, /data-repasse="repasse"/);
  assert.equal(selectionSelector({dataset: {repasse: 'repasse'}}), '#repasse > .level-screen');
  assert.equal(selectionSelector({dataset: {repasse: 'repasse', infoGame: 'repasse'}}), null);
  assert.match(html, /id="repasse" hidden/);
});

test('os textos e resultados existentes permanecem idênticos', async () => {
  const previousInfo = (await loadPrevious('game-info-content.mjs')).GAME_INFO;
  const previousMotion = (await loadPrevious('result-motion.mjs')).resultMarkup;
  for (const game of existing) {
    assert.deepEqual(GAME_INFO[game], previousInfo[game]);
    assert.equal(resultMarkup(game, true), previousMotion(game, true));
    assert.equal(resultMarkup(game, false), previousMotion(game, false));
  }
  assert.match(GAME_INFO.repasse.rules.join(' '), /inteiro/);
  assert.match(resultMarkup('repasse', true), /PARABÉNS/);
});

test('seletores visuais apenas estendem o estilo para o novo jogo', () => {
  const strip = source => source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, '');
  const restored = read('platform.css')
    .replaceAll(', #repasse > .level-screen', '')
    .replaceAll(', #repasse:not([hidden]) > .level-screen', '')
    .replaceAll(', #repasse > .repasse-lab', '')
    .replaceAll(', #repasse:not([hidden]) > .repasse-lab', '')
    .replaceAll(':is(#collection > .collection-lab) .collection-surface', '#collection > .collection-lab .collection-surface');
  assert.equal(strip(restored), strip(before('platform.css')));
});

test('motores, catálogos, persistência e assets anteriores não foram alterados', () => {
  const changed = execFileSync('git', ['diff', '--name-only', baseline, '--', 'dist'], {encoding: 'utf8'}).trim().split('\n').filter(Boolean);
  const allowed = new Set(['app.mjs','index.html','platform.css','game-info-content.mjs','game-info.css','game-info.mjs','game-nav-scroll.mjs','result-motion.mjs']);
  for (const path of changed) assert.ok(path.startsWith('dist/repasse/') || allowed.has(path.slice(5)), `Arquivo anterior alterado: ${path}`);
  for (const path of ['collection-state.mjs','endless-collection.mjs','endless-original.mjs','light-world.mjs','levels.mjs','geometry-games.mjs','symbol-games.mjs','sintonia/engine.mjs','sintonia/campaign.mjs','sintonia/ui.mjs','style.css']) assert.equal(read(path), before(path));
});
