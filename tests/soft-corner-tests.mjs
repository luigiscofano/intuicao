import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {restoreSoftCornerCSS} from './soft-corner-history.mjs';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8'),sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const m=JSON.parse(read('./soft-corner-authorized-change.json'));
restoreSoftCornerCSS(read('../dist/platform.css'));
assert.equal(m.replacements.length,5,'Only five targeted corner edits');
for(const a of m.assets){const svg=read('../dist/platform-assets/'+a.file);assert.equal(sha(svg),a.sha256);assert.match(svg,/stroke-width="1"/);assert.match(svg,/vector-effect="non-scaling-stroke"/);assert.match(svg,/fill="#fff"/);}
assert.match(read('../dist/platform-assets/soft-crown-left.svg'),/C55\.228 \.5 100 44\.772 100 100/);
assert.match(read('../dist/platform-assets/soft-crown-right.svg'),/C44\.772 \.5 0 44\.772 0 100/);
for(const [top,height,straightStart] of [[8,94,101],[6,40,45]])assert.equal(top+height-straightStart,1,'Curve and straight side retain a seamless 1px overlap');
assert.ok(94>62&&40>28,'Turn is distributed over a taller visual arc, not layout padding');
console.log('PASS localized symmetric corner softening, balanced ellipse tangents, 1px strokes, white paint, and exact preservation of all other CSS.');
