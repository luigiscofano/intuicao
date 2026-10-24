import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const change=JSON.parse(read('./header-tree-frame-authorized-change.json'));
const curves=JSON.parse(read('./content-frame-curves-authorized-change.json'));
const heroCurves=JSON.parse(read('./hero-frame-curves-authorized-change.json'));
const css=read('../dist/platform.css').replace(heroCurves.css_insertion,'').replace(curves.css_insertion,'');
assert.equal(sha(css),change.afterCssSHA256,'Exact frame CSS revision');
assert.equal(css.split(change.css_insertion).length-1,1,'One exact authorized frame insertion');
assert.equal(sha(css.replace(change.css_insertion,'')),change.priorCssSHA256,'All previous CSS byte-identical');
assert.match(change.css_insertion,/body > header::before/);
assert.match(change.css_insertion,/position:absolute/);
assert.match(change.css_insertion,/pointer-events:none/);
assert.match(change.css_insertion,/@media\(max-width:760px\)/);
assert.ok(!/(?:^|[;{])\s*(?:padding|margin|height|width|min-height|border-width|border-top|font|overflow)\s*:/.test(change.css_insertion),'No layout metrics changed');
assert.ok(!/#main|#collection|\.lab|\.platform-leaf/.test(change.css_insertion),'No game/leaf selectors added');
for(const asset of change.assets){
 const svg=read('../dist/platform-assets/'+asset.file);
 assert.equal(sha(svg),asset.sha256,'Exact new frame art');
 assert.match(svg,/viewBox="0 0 1280 128"/);
 assert.match(svg,/preserveAspectRatio="none"/);
 assert.match(svg,/vector-effect="non-scaling-stroke"/);
 assert.ok(!/<script|<image|<foreignObject|href=/.test(svg),'Self-contained inert vector artwork');
}
console.log('PASS exact header-only frame insertion, preserved previous CSS, inert SVG, no game or leaf changes. Static checks only; mobile/live visual QA not run.');
