import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { QUICK_START } from '../dist/rules-quick-start.mjs';
import { GAME_INFO } from '../dist/game-info-content.mjs';
import { RULE_EXAMPLES } from '../dist/rules-examples.mjs';
import { rulesPreviewMarkup, explanatorySvg } from '../dist/rules-preview.mjs';
const active = ['light','cut','elo','prumo','pacto','sintonia','repasse','pulso','foz','refugio','mirante','renovo','desvio','broto','cerco','mosaico','quinhao','estalo','dobra','acorde'];

test('os 20 jogos têm objetivo, três ações curtas e exemplo legível', () => {
 assert.ok(active.every(game => QUICK_START[game]));
 for (const game of active) {
  const guide = QUICK_START[game];
  assert.ok(guide.goal.length > 20 && guide.goal.length < 120,game);
  assert.equal(guide.steps.length,3,game);
  assert.ok(guide.steps.every(step=>step.length > 20 && step.length < 180),game);
  assert.equal(guide.cue.length,3);
  assert.ok(guide.cue.every(cue=>cue.length < 45));
  assert.ok(guide.example.length > 40);
  const html = rulesPreviewMarkup(game);
  assert.match(html, /Objetivo:/);
  assert.match(html, /<details class="rp-details"><summary>Regras completas e detalhes/);
  assert.match(html, /Veja um exemplo/);
  assert.match(html, /class="rp-tap"/);
  assert.equal((html.match(/class="rp-phase rp-phase-/g)||[]).length,3);
  for (const rule of GAME_INFO[game].rules) {
   // O resumo não elimina as regras completas, inclusive condições especiais.
   const escaped = rule.replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
   assert.ok(html.includes(escaped),`${game}: regra perdida`);
  }
  assert.doesNotMatch(html, /undefined|<button|Pausar/);
 }
});

test('gesto ilustrativo é puro e não altera SVGs originais', () => {
 for (const game of active) {
  const source = RULE_EXAMPLES[game].svg;
  const html = explanatorySvg(game,source);
  assert.equal(RULE_EXAMPLES[game].svg,source);
  assert.equal((html.match(/class="rp-tap"/g)||[]).length,1);
  assert.ok(html.endsWith('</svg>'));
  assert.doesNotMatch(html,/onclick|onload|<script/);
 }
 assert.equal(explanatorySvg('unknown','<svg></svg>'),'<svg></svg>');
});

test('loop mais rápido, sem cintilação rápida nem controle manual; redução mostra resultado', () => {
 const css = readFileSync(new URL('../dist/rules-preview.css', import.meta.url),'utf8');
 const motion = readFileSync(new URL('../dist/rules-examples.css', import.meta.url),'utf8');
 assert.match(css,/--rp-cycle:4\.8s/);
 assert.match(css,/\.rp-description\{font-size:13px/);
 for(const token of ['rp-observe','rp-do','rp-check']) assert.ok(css.includes(`@keyframes ${token}`));
 assert.match(motion,/\.rp-tap\{animation:rp-tap var\(--rp-cycle,4\.8s\) linear infinite/);
 assert.match(motion,/prefers-reduced-motion:reduce[\s\S]*\.rp-tap\{display:none/);
 assert.match(css,/data-ui-reduced-motion="true"[\s\S]*\.rp-phase\{animation:none!important/);
});

test('regras críticas permanecem explícitas no primeiro contato', () => {
 assert.match(QUICK_START.pulso.steps.join(' '),/mesma distância/);
 assert.match(QUICK_START.quinhao.steps.join(' '),/5 pontos.*2/);
 assert.match(QUICK_START.refugio.steps.join(' '),/duas regiões livres diferentes/);
 assert.match(QUICK_START.renovo.steps.join(' '),/90°.*horizontal.*vertical/);
 assert.match(QUICK_START.acorde.goal,/pares de três símbolos/);
 assert.match(QUICK_START.desvio.steps.join(' '),/usadas não bloqueiam/);
});
