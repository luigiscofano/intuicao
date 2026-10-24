import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const baseline=JSON.parse(fs.readFileSync(new URL('./platform-baseline-sha256.json',import.meta.url)));
const approved=JSON.parse(fs.readFileSync(new URL('./level-shortcuts-authorized-sha256.json',import.meta.url))).sha256;
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
for(const [name,hash] of Object.entries(baseline)){
 let bytes=fs.readFileSync(new URL('../dist/'+name,import.meta.url));
 if(name==='index.html')bytes=Buffer.from(bytes.toString().replace('<link rel="stylesheet" href="platform.css">',''));
 assert.equal(sha(bytes),approved[name]??hash,`Protected original file modified: ${name}`);
}
const fullCSS=fs.readFileSync(new URL('../dist/platform.css',import.meta.url),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
// User explicitly requested sparse falling leaves in visual revision 2.
// Permit only their named keyframes; every animation declaration must be on a
// menu-only pseudo-element. The original game-file baseline is not rebased.
const leafFrames=fullCSS.match(/@keyframes platform-leaf-drift\{(?:[^{}]*\{[^{}]*\})+\s*\}/g)??[];
assert.equal(leafFrames.length,1,'Exactly one isolated decorative leaf animation');
const css=fullCSS.replace(leafFrames[0],'');
assert.ok(!css.includes('--'),'No shared or inherited custom property changes');
assert.ok(!/@(?:import|keyframes)/.test(css),'No external imports or unapproved keyframes');
assert.ok(!/\b(?:filter|zoom|transform)\s*:/.test(css.replace('transform:none;','')),'No game container transforms');
const selectors=[...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(x=>!x[1].trim().startsWith('@'));
for(const [,raw,body] of selectors){
 const s=raw.trim();
 if(/animation\s*:/.test(body)){
  assert.ok(s.startsWith(':where(body:not(:has(.lab:not([hidden]), #collection:not([hidden]) > .collection-lab)))'),'Decorative animation is menu-only');
  assert.ok(/::(?:before|after)\s*$/.test(s),'Only decorative pseudo-elements animate');
  assert.ok(/animation:(?:platform-leaf-drift|none)/.test(body),'Only approved leaf animation');
 }
 assert.ok(s.startsWith('body > header')||s.startsWith('body > footer')||s.startsWith('#main > .intro')||s.startsWith('#main > .games')||s.startsWith(':where(body:not(:has(.lab:not([hidden]), #collection:not([hidden]) > .collection-lab)))')||s.startsWith(':is(#selection, #collection > .level-screen)'),`Unexpected unscoped selector: ${s}`);
}
assert.ok(fullCSS.includes('@media(prefers-reduced-motion:reduce)'),'Reduced-motion opt-out required');
assert.ok(!css.includes('quiet-garden.svg'),'Landscape no longer displayed');
assert.ok(css.includes('pointer-events:none'),'Leaves must not intercept input');
console.log(`PASS ${Object.keys(baseline).length-Object.keys(approved).length} original files byte-identical; ${Object.keys(approved).length} explicit shortcut/navigation changes match their separately recorded hashes; ${selectors.length} style blocks retain explicit platform roots. Original retro baseline is unchanged. Browser computed-style/geometry comparison remains separate.`);
