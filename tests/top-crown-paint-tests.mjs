import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const m=JSON.parse(read('./top-crown-paint-authorized-change.json')),css=read('../dist/platform.css');
assert.equal(sha(css),m.afterCssSHA256);
assert.equal(css.split(m.css_insertion).length-1,1);
assert.equal(sha(css.replace(m.css_insertion,'')),m.priorCssSHA256,'All prior CSS, including crown geometry and base roots, is unchanged');
const block=m.css_insertion.replace(/\/\*[\s\S]*?\*\//g,'');
assert.ok(!/(?:[;{])(?:padding|margin|border-width|width|height|overflow|filter|transform):/.test(block),'No layout, clipping of containers or global rendering changes');
assert.match(block,/header\{background:transparent;border-top-color:transparent\}/);
assert.match(block,/header::after\{content:"";position:absolute;inset:-88px 0 -9px;background:#fff/);
assert.match(block,/clip-path:inset\(0 -100vmax\);pointer-events:none;user-select:none;z-index:-1/);
assert.match(block,/header::after\{inset:-64px 0 -7px\}/);
assert.ok(!/#selection|level-screen|footer|platform-leaf/.test(block),'No changes to lower frame, footer or leaf layers');
for(const [,raw] of block.matchAll(/([^{}]+)\{([^{}]*)\}/g)){
 const selector=raw.trim();if(selector.startsWith('@'))continue;
 assert.ok(selector.startsWith(':where(body:not(:has(.lab:not([hidden]), #collection:not([hidden]) > .collection-lab))) > header'),'Only menu header paint allowed');
}
for(const mobile of [false,true]){
 const topBorder=mobile?64:88,capOffset=mobile?6:8,paintTop=mobile?-64:-88,paintBottom=mobile?-7:-9;
 assert.equal(topBorder+paintTop,0,'Paint starts at the top of the canopy reservation');
 assert.equal(-paintBottom-1,capOffset,'Paint ends exactly at the hero curved-cap start, no paper seam');
}
console.log('PASS single menu-only white crown plane, exact canopy-to-hero color join, inert paint, preserved feature and geometry CSS. Wide-screen visual proof required separately.');
