import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {rulesPreviewMarkup} from '../dist/rules-preview.mjs';
import {RULE_EXAMPLES} from '../dist/rules-examples.mjs';
const games=['light','cut','elo','prumo','pacto','sintonia','repasse','orbita','desvio','broto','cerco'];
assert.deepEqual(Object.keys(RULE_EXAMPLES).sort(),games.sort());
for(const game of games){const html=rulesPreviewMarkup(game);assert.equal(RULE_EXAMPLES[game].steps.length,3);assert.match(html,/Como jogar/);assert.match(html,/<svg/);assert.match(html,/aria-hidden="true"/);assert.doesNotMatch(html,/<script|onload=|onclick=|foreignObject|href="https?:/);}
assert.equal(rulesPreviewMarkup('unknown'),'');
const css=readFileSync(new URL('../dist/rules-preview.css',import.meta.url),'utf8');assert.match(css,/prefers-reduced-motion/);assert.doesNotMatch(css,/infinite/);
const index=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');assert.ok(index.indexOf('id="selection-rules"')<index.indexOf('id="level-grid"'));
for(const game of ['sintonia','repasse','orbita']){const ui=readFileSync(new URL(`../dist/${game}/ui.mjs`,import.meta.url),'utf8');assert.ok(ui.includes(`rulesPreviewMarkup('${game}')`));}
console.log('PASS eleven instructional panels, SVG/text/accessibility, finite reduced motion and selection integration');
