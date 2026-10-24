import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const baseline=JSON.parse(fs.readFileSync(new URL('./platform-baseline-sha256.json',import.meta.url)));
const pactoApproved=JSON.parse(fs.readFileSync(new URL('./pacto-check-authorized-sha256.json',import.meta.url))).sha256;
const endlessApproved=JSON.parse(fs.readFileSync(new URL('./endless-authorized-sha256.json',import.meta.url))).sha256;
const approved=JSON.parse(fs.readFileSync(new URL('./level-shortcuts-authorized-sha256.json',import.meta.url))).sha256;
const copyChanges=JSON.parse(fs.readFileSync(new URL('./home-copy-authorized-changes.json',import.meta.url))).changes;
const leafChange=JSON.parse(fs.readFileSync(new URL('./leaf-layer-authorized-change.json',import.meta.url)));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
for(const [name,hash] of Object.entries(baseline)){
 let bytes=fs.readFileSync(new URL('../dist/'+name,import.meta.url));
 if(name==='index.html'){
  let html=bytes.toString();
  assert.equal(html.split(leafChange.insertion).length-1,1,'Exactly one approved ornamental layer');
  assert.ok(leafChange.insertion.startsWith('<div class="platform-leaf-layer" aria-hidden="true" inert>'));
  assert.equal((leafChange.insertion.match(/<span class="platform-leaf"><\/span>/g)??[]).length,10);
  assert.ok(!leafChange.insertion.includes('tabindex'));
  html=html.replace(leafChange.insertion,'');
  // Only the new isolated Endless stylesheet is removed for the historical index comparison.
  assert.equal(html.split('<link rel="stylesheet" href="endless.css">').length-1,1);
  html=html.replace('<link rel="stylesheet" href="endless.css">','');
  // Reverse only the exact authorized copy edits, preserving historical hashes.
  for(const {before,after} of copyChanges){
   assert.equal(html.split(after).length-1,1,'Authorized replacement must occur exactly once');
   assert.ok(!html.includes(before),'Removed copy must not remain');
   html=html.replace(after,before);
  }
  bytes=Buffer.from(html.replace('<link rel="stylesheet" href="platform.css">',''));
 }
 assert.equal(sha(bytes),pactoApproved[name]??endlessApproved[name]??approved[name]??hash,`Protected original file modified: ${name}`);
}
const fullCSS=fs.readFileSync(new URL('../dist/platform.css',import.meta.url),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
// User explicitly expanded leaves to all six games on 2026-10-24.
// Only the fixed inert ornamental sibling may animate. Historical hashes remain.
const leafFrames=fullCSS.match(/@keyframes platform-leaf-fall\{(?:[^{}]*\{[^{}]*\})+\s*\}/g)??[];
assert.equal(leafFrames.length,1,'Exactly one isolated decorative leaf animation');
const css=fullCSS.replace(leafFrames[0],'');
assert.ok(!css.includes('--'),'No shared or inherited custom property changes');
assert.ok(!/@(?:import|keyframes)/.test(css),'No external imports or unapproved keyframes');
assert.ok(!/\b(?:filter|zoom|transform)\s*:/.test(css.replace('transform:none;','')),'No game container transforms');
const selectors=[...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(x=>!x[1].trim().startsWith('@'));
for(const [,raw,body] of selectors){
 const s=raw.trim();
 if(/animation\s*:/.test(body)){
  assert.equal(s,'body > .platform-leaf-layer > .platform-leaf','Only decorative siblings animate');
  assert.ok(/animation:(?:platform-leaf-fall|none)/.test(body),'Only approved leaf animation');
 }
 assert.ok(s.startsWith('body > .platform-leaf-layer')||s.startsWith('body > header')||s.startsWith('body > footer')||s.startsWith('#main > .intro')||s.startsWith('#main > .games')||s.startsWith(':where(body:not(:has(.lab:not([hidden]), #collection:not([hidden]) > .collection-lab)))')||s.startsWith(':is(#selection, #collection > .level-screen)'),`Unexpected unscoped selector: ${s}`);
}
assert.ok(fullCSS.includes('@media(prefers-reduced-motion:reduce)'),'Reduced-motion opt-out required');
assert.ok(!css.includes('quiet-garden.svg'),'Landscape no longer displayed');
assert.ok(css.includes('pointer-events:none'),'Leaves must not intercept input');
assert.ok(css.includes('position:fixed;inset:0'),'Leaf layer is out of normal flow');
assert.ok(css.includes('overflow:hidden;pointer-events:none;user-select:none;contain:strict'),'Only the ornamental layer clips its overflow');
assert.ok(!css.includes('platform-leaf-drift'),'Old menu leaves removed to avoid duplication');
console.log(`PASS PACTO/Endless exact authorized hashes; ${Object.keys(baseline).length-Object.keys(approved).length} original files byte-identical; ${Object.keys(approved).length} interface exceptions match their active separately recorded hashes (Endless overrides only app/collection); ${selectors.length} style blocks retain explicit platform roots. Exact authorized home-copy edits and the inert leaf-layer insertion are reversed for comparison. Original retro baseline is unchanged. Browser computed-style/geometry comparison remains separate.`);
