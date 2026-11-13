import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { rulesPreviewMarkup, explanatorySvg } from '../dist/rules-preview.mjs';
import { RULE_EXAMPLES } from '../dist/rules-examples.mjs';
import { QUICK_START } from '../dist/rules-quick-start.mjs';
import { GAME_INFO } from '../dist/game-info-content.mjs';
import { CATEGORY_GAMES } from '../dist/category-navigation.mjs';

const escape = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const games = Object.values(CATEGORY_GAMES).flat();
for (const game of games) {
  test(`${game}: resumo e detalhes completos; exemplo sem cartões repetidos`, () => {
    const html = rulesPreviewMarkup(game);
    const summary = html.match(/<div class="rp-quick">([\s\S]*?)<\/div>/)?.[1];
    const details = html.match(/<details class="rp-details">([\s\S]*?)<\/details>/)?.[1];
    assert.ok(summary && details);
    assert.ok(summary.includes(escape(QUICK_START[game].goal)));
    for (const step of QUICK_START[game].steps) assert.ok(summary.includes(escape(step)));
    for (const rule of GAME_INFO[game].rules) assert.ok(details.includes(escape(rule)));
    assert.ok(html.includes(explanatorySvg(game, RULE_EXAMPLES[game].svg)));
    assert.ok(html.includes(escape(QUICK_START[game].example)));
    assert.doesNotMatch(html, /rp-phases|rp-phase-\d/);
    assert.equal((html.match(/<svg/g) || []).length, (RULE_EXAMPLES[game].svg.match(/<svg/g) || []).length);
  });
}

test('expandir substitui texto e não desmonta a animação', () => {
  const css = readFileSync(new URL('../dist/rules-preview.css', import.meta.url), 'utf8');
  assert.match(css, /\.rp-copy:has\(\.rp-details\[open\]\) \.rp-quick\{display:none\}/);
  assert.match(css, /\.rp-illustration\{contain:size;align-self:stretch/);
  assert.match(css, /@media\(max-width:680px\)/);
  const js = readFileSync(new URL('../dist/rules-preview.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(js, /addEventListener\(['"]toggle|innerHTML\s*=|setInterval/);
});
