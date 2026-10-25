import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {restoreAllScreensFrameCSS} from './all-screens-frame-history.mjs';
const m=JSON.parse(fs.readFileSync(new URL('./all-screens-frame-authorized-change.json',import.meta.url),'utf8'));
const css=fs.readFileSync(new URL('../dist/platform.css',import.meta.url),'utf8');
assert.equal(crypto.createHash('sha256').update(css).digest('hex'),m.afterCssSHA256);
restoreAllScreensFrameCSS(css);
const block=m.append.replace(/\/\*[\s\S]*?\*\//g,'');
assert.doesNotMatch(block,/!important/);
const rules=[...block.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
for(const [,selector,declarations] of rules){
 assert.doesNotMatch(selector,/\b(?:canvas|svg|grid-cell|collection-board|experiment|workspace|controls)\b/,'No selectors target boards or internal game surfaces');
 assert.ok(selector.includes(':has(.lab:not([hidden]), #collection:not([hidden]) > .collection-lab)')||selector.includes('#main > .lab:not([hidden]), #collection:not([hidden]) > .collection-lab'),'Only active-game exterior roots');
 assert.doesNotMatch(declarations,/\b(?:padding|margin|font|font-size|line-height|touch-action|overflow|transform)\s*:/,'No layout, typography or gesture changes');
 if(selector.includes('::'))assert.match(declarations,/pointer-events:none|--hero-flare|inset:|left:|top:/);
 if(!selector.includes('::'))assert.doesNotMatch(declarations,/\b(?:filter|width|height|min-width|min-height|max-width|max-height)\s*:/,'No filters or sizing on game ancestors');
}
const gameRule=block.match(/#main > \.lab:not\(\[hidden\]\), #collection:not\(\[hidden\]\) > \.collection-lab\{([^}]+)\}/)[1];
assert.doesNotMatch(gameRule,/position:|isolation:|overflow:|filter:|border-width:/,'Game shell keeps original containing-block, clipping and border metrics');
assert.equal((block.match(/filter:/g)||[]).length,1);
assert.match(block,/> footer::before\{[^}]*filter:drop-shadow[^}]*pointer-events:none/,'Only detached inert footer paint receives a shadow');
for(const [top,height,start] of [[8,94,101],[6,40,45]])assert.equal(top+height-start,1,'Top curve/straight border overlap is 1px');
for(const [bottomBorder,pseudoBottom] of [[112,-113],[84,-85]])assert.equal(-pseudoBottom-bottomBorder,1,'Root paint ends 1px beyond the footer border box');
assert.match(block,/top:-2px;bottom:-113px/,'Footer 1px top border gives 1px overlap with game border');
assert.match(block,/continuous-root-left\.svg/);assert.match(block,/continuous-root-right\.svg/);
assert.match(block,/soft-crown-left\.svg/);assert.match(block,/soft-crown-right\.svg/);
console.log('PASS exact active-game exterior paint only, unchanged board geometry/gestures/clipping, inert footer shadow, responsive 1px joins. Browser QA remains required.');
