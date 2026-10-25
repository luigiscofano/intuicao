import {restoreGameInfoHTML} from './game-info-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {restoreGameSpacingCSS} from './game-spacing-history.mjs';
import {restoreAllScreensFrameCSS} from './all-screens-frame-history.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const m=JSON.parse(read('tests/game-spacing-authorized-change.json'));
const previous=JSON.parse(read('tests/all-screens-frame-authorized-change.json'));
const css=read('dist/platform.css').toString();
assert.equal(sha(css),m.afterCssSHA256);
const restored=restoreGameSpacingCSS(css);
assert.equal(sha(restored),m.priorCssSHA256);
assert.equal(restoreGameSpacingCSS(restored),restored,'Exact prior state is an idempotent no-op');
assert.equal(sha(restoreAllScreensFrameCSS(css)),previous.priorCssSHA256,'Historical restoration chain includes spacing');
assert.equal(restoreAllScreensFrameCSS(restoreAllScreensFrameCSS(css)),restoreAllScreensFrameCSS(css),'Convergent historical routes remain idempotent');
for(const invalid of [css+' ',css.replace('margin-top:24px;gap:18px','margin-top:25px;gap:18px'),restored+' ',css+m.append])assert.throws(()=>restoreGameSpacingCSS(invalid),'Unapproved changes and duplicated blocks fail closed');
for(const [p,hash] of Object.entries(m.preservedDistSHA256))assert.equal(sha(p==='dist/index.html'?restoreGameInfoHTML(read(p).toString()):read(p)),hash,'Unchanged JS/HTML/assets/board styles: '+p);
const active='body:has(.lab:not([hidden]), #collection:not([hidden]) > .collection-lab) #main > .games';
const actions=':is(#main > .lab, #collection > .collection-lab) .level-actions';
const expected=[
 [active,'margin-top:24px;gap:18px'],
 [actions,'gap:16px;padding-top:20px;padding-bottom:16px;background:#fff'],
 [actions+' :is(.actions,.collection-toolbar)','gap:12px;flex-wrap:wrap'],
 ['#main > .lab .level-notes','background:#fff'],
 ['#collection > .collection-lab .collection-surface','background-image:linear-gradient(to top,#fff 20px,transparent 20px)'],
 ['#collection > .collection-lab .collection-replay','background:#fff;margin:0;padding:10px 24px'],
 [active,'margin-top:20px;gap:12px'],
 [actions,'gap:12px;padding-top:18px;padding-bottom:16px']
];
const block=m.append.replace(/\/\*[\s\S]*?\*\//g,'');
const rules=[...block.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([,s,d])=>[s.trim(),d]);
assert.deepEqual(rules,expected,'Only approved selectors/properties and exact desktop/mobile spacing');
assert.equal((block.match(/@media\(max-width:760px\)/g)||[]).length,1);
for(const [,declarations] of rules)assert.doesNotMatch(declarations,/!important|(?:^|;)(?:color|border|font|width|height|position|overflow|transform|touch-action)\s*:/);
assert.doesNotMatch(block,/\.(?:grid-cell|collection-board|collection-feedback|hint|status|experiment|workspace|controls)\b/,'No board, feedback, controls or gameplay selectors');
assert.match(read('dist/style.css').toString(),/\.collection-surface\{padding-bottom:20px;position:relative\}/,'White gradient matches existing bottom padding, leaving board/feedback background unchanged');
console.log('PASS exact spacing append and SHA restoration, fail-closed historical chain, scoped desktop/mobile navigation/action spacing, 20px lower white paint only; all other dist files byte-identical.');
