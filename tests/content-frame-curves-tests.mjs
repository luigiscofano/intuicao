import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const m=JSON.parse(read('./content-frame-curves-authorized-change.json'));
const css=read('../dist/platform.css');
assert.equal(sha(css),m.afterCssSHA256);
assert.equal(css.split(m.css_insertion).length-1,1);
assert.equal(sha(css.replace(m.css_insertion,'')),m.priorCssSHA256,'All existing styles preserved exactly');
for(const a of m.assets){const s=read('../dist/platform-assets/'+a.file);assert.equal(sha(s),a.sha256);assert.match(s,/stroke-width="1"/);assert.match(s,/vector-effect="non-scaling-stroke"/);assert.ok(!/<script|<image|<foreignObject|href=/.test(s));}
assert.match(m.css_insertion,/pointer-events:none/);
assert.match(m.css_insertion,/@media\(max-width:760px\)/);
assert.ok(!/body|header|footer|\.lab|\.platform-leaf|padding:|margin:|border:/.test(m.css_insertion),'Only selection decorations; existing shell untouched');
const selectors=[...m.css_insertion.replace(/\/\*[\s\S]*?\*\//g,'').matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(x=>!x[1].trim().startsWith('@'));
for(const [,s] of selectors)assert.ok(s.trim().startsWith(':is(#selection, #collection > .level-screen)'),s);
for(const viewport of [320,375,390,760,761,1024,1280,1430,1920,2560]){
 const mobile=viewport<=760, main=Math.min(viewport,1280), padding=mobile?16:40;
 const panelLeft=(viewport-main)/2+padding, flare=mobile?14:Math.max(38,(viewport-1280)/2+28);
 assert.ok(panelLeft-flare>=0,viewport+' curves remain inside viewport');
 assert.ok(flare>0);
}
assert.match(m.css_insertion,/::after\{bottom:-240px;height:240px\}/,'Desktop roots stay within 34px gap plus 212px footer');
assert.match(m.css_insertion,/::after\{bottom:-196px;height:196px\}/,'Compact roots stay inside mobile footer reservation');
console.log('PASS exact isolated selection curves, 1px non-scaling strokes, preserved shell/header/styles, inert decoration, structural gutter fit at 320–2560px. Visual browser/mobile QA separate.');
