import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const baseline=JSON.parse(fs.readFileSync(new URL('./platform-baseline-sha256.json',import.meta.url)));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
for(const [name,hash] of Object.entries(baseline)){
 let bytes=fs.readFileSync(new URL('../dist/'+name,import.meta.url));
 if(name==='index.html')bytes=Buffer.from(bytes.toString().replace('<link rel="stylesheet" href="platform.css">',''));
 assert.equal(sha(bytes),hash,`Protected original file modified: ${name}`);
}
const css=fs.readFileSync(new URL('../dist/platform.css',import.meta.url),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
assert.ok(!css.includes('--'),'No shared or inherited custom property changes');
assert.ok(!/@(?:import|keyframes)/.test(css),'No external imports or decorative motion');
assert.ok(!/\b(?:filter|zoom|transform)\s*:/.test(css.replace('transform:none;','')),'No game container transforms');
const selectors=[...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(x=>!x[1].trim().startsWith('@'));
for(const [,raw] of selectors){
 const s=raw.trim();
 assert.ok(s.startsWith('body > header')||s.startsWith('body > footer')||s.startsWith('#main > .intro')||s.startsWith('#main > .games')||s.startsWith(':where(body:not(:has(.lab:not([hidden]), #collection:not([hidden]) > .collection-lab)))')||s.startsWith(':is(#selection, #collection > .level-screen)'),`Unexpected unscoped selector: ${s}`);
}
console.log(`PASS ${Object.keys(baseline).length} original files byte-identical (index only adds stylesheet link); ${selectors.length} style blocks have explicit platform roots. Browser computed-style/geometry comparison remains separate.`);
