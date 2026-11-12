import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  CONTEXTUAL_VICTORY_GAMES,
  contextualVictoryMarkup,
  resultMarkup,
} from '../dist/result-motion.mjs';

const activeCampaigns = [
  'light', 'cut', 'elo', 'prumo', 'pacto', 'sintonia', 'repasse',
  'pulso', 'foz', 'refugio', 'mirante', 'renovo',
];

test('as doze campanhas ativas têm motivos distintos sem reativar jogos retirados', () => {
  assert.deepEqual(CONTEXTUAL_VICTORY_GAMES, activeCampaigns);
  assert.equal(new Set(activeCampaigns.map(game => contextualVictoryMarkup(game))).size, 12);
  for (const game of activeCampaigns) {
    const markup = resultMarkup(game, true);
    assert.match(markup, new RegExp(`campaign-motion-${game}`));
    assert.match(markup, /aria-hidden="true"/);
    assert.match(markup, /viewBox="0 0 120 84"/);
  }
  assert.equal(contextualVictoryMarkup('divisa'), '');
  assert.equal(contextualVictoryMarkup('orbita'), '');
});

test('falha e retomada não iniciam celebração nova', () => {
  for (const game of activeCampaigns) {
    assert.doesNotMatch(resultMarkup(game, false), /campaign-motion/);
    assert.doesNotMatch(resultMarkup(game, true, { animate: false }), /campaign-motion-animate/);
    assert.match(resultMarkup(game, true, { animate: false }), /game-victory-static/);
  }
});

test('duelo mantém vencedor e apresentação independente', () => {
  const markup = resultMarkup('desvio', true, { winner: 2 });
  assert.match(markup, /Jogador 2 venceu/);
  assert.match(markup, /game-victory-desvio/);
  assert.doesNotMatch(markup, /campaign-motion/);
});

test('animações são finitas, sem capturar interação, e respeitam redução de movimento', () => {
  const css = readFileSync(new URL('../dist/victory-tiles.css', import.meta.url), 'utf8');
  const motionCss = css.slice(css.indexOf('/* Cada campanha'));
  assert.match(motionCss, /pointer-events: none/);
  assert.doesNotMatch(motionCss, /infinite/);
  assert.match(motionCss, /prefers-reduced-motion:reduce/);
  assert.match(motionCss, /data-ui-reduced-motion='true'/);
  assert.match(motionCss, /animation: none !important/);
  const source = readFileSync(new URL('../dist/result-motion.mjs', import.meta.url), 'utf8');
  const motifSource = source.slice(source.indexOf('const CAMPAIGN_MOTIFS'), source.indexOf('// A faixa permanece'));
  assert.doesNotMatch(motifSource, /localStorage|sessionStorage|fetch\(|setTimeout|addEventListener|engine\.mjs/);
});
