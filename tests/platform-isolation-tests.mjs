import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const baseline=JSON.parse(fs.readFileSync(new URL('./platform-baseline-sha256.json',import.meta.url)));
const pactoApproved=JSON.parse(fs.readFileSync(new URL('./pacto-check-authorized-sha256.json',import.meta.url))).sha256;
const endlessApproved=JSON.parse(fs.readFileSync(new URL('./endless-authorized-sha256.json',import.meta.url))).sha256;
const approved=JSON.parse(fs.readFileSync(new URL('./level-shortcuts-authorized-sha256.json',import.meta.url))).sha256;
const copyChanges=JSON.parse(fs.readFileSync(new URL('./home-copy-authorized-changes.json',import.meta.url))).changes;
const leafChange=JSON.parse(fs.readFileSync(new URL('./leaf-layer-authorized-change.json',import.meta.url)));
const identityChanges=JSON.parse(fs.readFileSync(new URL('./curiosity-brand-authorized-changes.json',import.meta.url)));
const canopyChange=JSON.parse(fs.readFileSync(new URL('./document-canopy-authorized-change.json',import.meta.url)));
const incidenceChange=JSON.parse(fs.readFileSync(new URL('./leaf-incidence-authorized-change.json',import.meta.url)));
const growthChange=JSON.parse(fs.readFileSync(new URL('./growing-piles-authorized-change.json',import.meta.url)));
const speedChange=JSON.parse(fs.readFileSync(new URL('./leaf-speed-authorized-change.json',import.meta.url)));
const physicsChange=JSON.parse(fs.readFileSync(new URL('./pile-physics-authorized-change.json',import.meta.url)));
const gravityChange=JSON.parse(fs.readFileSync(new URL('./pile-gravity-authorized-change.json',import.meta.url)));
const headerFrameChange=JSON.parse(fs.readFileSync(new URL('./header-tree-frame-authorized-change.json',import.meta.url)));
const contentFrameCurves=JSON.parse(fs.readFileSync(new URL('./content-frame-curves-authorized-change.json',import.meta.url)));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
for(const [name,hash] of Object.entries(gravityChange.preserved_dist_sha256)){
 let bytes=fs.readFileSync(new URL('../'+name,import.meta.url));
 if(name==='dist/platform.css'){
  const css=bytes.toString().replace(contentFrameCurves.css_insertion,'');
  assert.equal(css.split(headerFrameChange.css_insertion).length-1,1,'Exact separately authorized header frame');
  assert.equal(sha(css),headerFrameChange.afterCssSHA256);
  bytes=Buffer.from(css.replace(headerFrameChange.css_insertion,''));
  assert.equal(sha(bytes),headerFrameChange.priorCssSHA256);
 }
 assert.equal(sha(bytes),hash,'Gravity revision preserves every other existing dist file: '+name);
}
for(const asset of headerFrameChange.assets)assert.equal(sha(fs.readFileSync(new URL('../dist/platform-assets/'+asset.file,import.meta.url))),asset.sha256,'Exact new header frame asset');
for(const [name,hash] of Object.entries(baseline)){
 let bytes=fs.readFileSync(new URL('../dist/'+name,import.meta.url));
 if(name==='index.html'){
  let html=bytes.toString();
  assert.equal(html.split(physicsChange.html_insertion).length-1,1,'Exactly one approved decoration module');
  html=html.replace(physicsChange.html_insertion,'');
  assert.equal(html.split(speedChange.html_after).length-1,1,'Exact moderate leaf incidence increase');
  html=html.replace(speedChange.html_after,speedChange.html_before);
  assert.equal(html.split(growthChange.html_after).length-1,1,'Exact persistent ornamental pile spans');
  html=html.replace(growthChange.html_after,growthChange.html_before);
  assert.equal(html.split(incidenceChange.html_after).length-1,1,'Exact approved higher incidence');
  html=html.replace(incidenceChange.html_after,incidenceChange.html_before);
  assert.equal(html.split(canopyChange.html_after).length-1,1,'Exact approved mixed decoration');
  assert.equal((canopyChange.html_after.match(/<span class="platform-leaf"><\/span>/g)??[]).length,10,'Ten leaves total across both planes');
  assert.equal((canopyChange.html_after.match(/aria-hidden="true" inert/g)??[]).length,2,'Both planes inert and hidden from accessibility');
  assert.ok(!canopyChange.html_after.includes('tabindex'));
  html=html.replace(canopyChange.html_after,canopyChange.html_before);
  for(const {before,after} of identityChanges.html_changes){
   assert.equal(html.split(after).length-1,1,'Exact approved title/brand replacement');
   html=html.replace(after,before);
  }
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
const fullCanopyChange=JSON.parse(fs.readFileSync(new URL('./fullwidth-canopy-authorized-change.json',import.meta.url)));
const variedChange=JSON.parse(fs.readFileSync(new URL('./varied-foliage-authorized-change.json',import.meta.url)));
const edgeChange=JSON.parse(fs.readFileSync(new URL('./canopy-edge-authorized-change.json',import.meta.url)));
const fineEdgeChange=JSON.parse(fs.readFileSync(new URL('./fine-edge-authorized-change.json',import.meta.url)));
const compactIntroChange=JSON.parse(fs.readFileSync(new URL('./compact-intro-authorized-change.json',import.meta.url)));
let physicsPlatformSource=fs.readFileSync(new URL('../dist/platform.css',import.meta.url),'utf8');
assert.equal(sha(physicsPlatformSource),contentFrameCurves.afterCssSHA256,'Exact content curve CSS');
assert.equal(physicsPlatformSource.split(contentFrameCurves.css_insertion).length-1,1,'One exact content curve insertion');
physicsPlatformSource=physicsPlatformSource.replace(contentFrameCurves.css_insertion,'');
assert.equal(sha(physicsPlatformSource),contentFrameCurves.priorCssSHA256,'All prior CSS unchanged');
physicsPlatformSource=physicsPlatformSource.replace(headerFrameChange.css_insertion,'');
const naturalCanopyChange=JSON.parse(fs.readFileSync(new URL('./natural-canopy-authorized-change.json',import.meta.url)));
assert.equal(physicsPlatformSource.split(naturalCanopyChange.css_after).length-1,1,'One exact authorized natural canopy URL');
physicsPlatformSource=physicsPlatformSource.replace(naturalCanopyChange.css_after,naturalCanopyChange.css_before);
assert.equal(sha(physicsPlatformSource),naturalCanopyChange.priorCssSHA256,'Only authorized canopy URL changed after compact intro');
const naturalCanopySVG=fs.readFileSync(new URL('../dist/platform-assets/'+naturalCanopyChange.after,import.meta.url),'utf8');
assert.equal(sha(naturalCanopySVG),naturalCanopyChange.after_sha256,'Exact natural canopy asset');
assert.equal(naturalCanopySVG.split(naturalCanopyChange.svg_addition).length-1,1,'One exact foliage overlay');
assert.equal(sha(naturalCanopySVG.replace(naturalCanopyChange.svg_addition,'')),naturalCanopyChange.before_sha256,'Previous canopy body byte-identical');
assert.equal(sha(fs.readFileSync(new URL('../dist/platform-assets/'+naturalCanopyChange.before,import.meta.url))),naturalCanopyChange.before_sha256,'Prior canopy asset preserved');
for(const {before,after} of compactIntroChange.replacements){
 assert.equal(physicsPlatformSource.split(after).length-1,1,'Exact authorized compact intro replacement');
 assert.ok(!physicsPlatformSource.includes(before),'Prior intro styling must not remain');
 physicsPlatformSource=physicsPlatformSource.replace(after,before);
}
assert.equal(sha(physicsPlatformSource),compactIntroChange.priorCssSHA256,'Only five authorized compact intro replacements');
assert.equal(physicsPlatformSource.split(physicsChange.css_insertion).length-1,1,'Exact isolated interactive floor CSS');
const fineEdgePlatformSource=physicsPlatformSource.replace(physicsChange.css_insertion,'');
const pileSeamChange=JSON.parse(fs.readFileSync(new URL('./pile-seam-authorized-change.json',import.meta.url)));
let pileModuleSource=fs.readFileSync(new URL('../dist/decor-piles.mjs',import.meta.url),'utf8');
assert.equal(pileModuleSource,gravityChange.module_change.after,'Exact authorized gravity module');
assert.equal(sha(pileModuleSource),gravityChange.module_change.sha256);
pileModuleSource=pileModuleSource.replace(gravityChange.module_change.after,gravityChange.module_change.before);
assert.equal(sha(pileModuleSource),gravityChange.module_change.prior_sha256,'Historical renderer preserved by exact reversal');
assert.equal(sha(pileModuleSource),pileSeamChange.module_change.sha256,'Exact approved seam-aware renderer');
assert.equal(pileModuleSource.split(pileSeamChange.module_change.after).length-1,1,'One exact static-copy exclusion');
const priorPileModule=pileModuleSource.replace(pileSeamChange.module_change.after,pileSeamChange.module_change.before);
assert.equal(sha(priorPileModule),pileSeamChange.module_change.prior_sha256,'Physics unchanged apart from static-copy exclusion');
assert.equal(sha(priorPileModule),physicsChange.module_sha256,'Historical decorative module unchanged');
for(const change of pileSeamChange.svg_changes){
 let svg=fs.readFileSync(new URL('../dist/platform-assets/'+change.file,import.meta.url),'utf8');
 assert.equal(sha(svg),change.sha256,'Exact approved natural pile edge asset');
 if(change.insertion){assert.equal(svg.split(change.insertion).length-1,1);svg=svg.replace(change.insertion,'');}
 for(const {before,after} of change.replacements){assert.equal(svg.split(after).length-1,1);svg=svg.replace(after,before);}
 assert.equal(sha(svg),change.prior_sha256,'Historical pile asset unchanged after exact reversal');
}
const edgePlatformSource=fineEdgePlatformSource.replace(fineEdgeChange.after,fineEdgeChange.before);
assert.equal(sha(edgePlatformSource),fineEdgeChange.prior_css_sha256,'Only finer lower-edge URL changed');
const fineEdgeSVG=fs.readFileSync(new URL('../dist/platform-assets/'+fineEdgeChange.after,import.meta.url),'utf8');
assert.equal(sha(fineEdgeSVG.replace(fineEdgeChange.svg_addition,'')),fineEdgeChange.body_svg_sha256,'Approved canopy body unchanged');
const speedPlatformSource=edgePlatformSource.replace(edgeChange.after,edgeChange.before);
assert.equal(sha(speedPlatformSource),edgeChange.prior_css_sha256,'Only canopy edge URL changed');
const edgeSVG=fs.readFileSync(new URL('../dist/platform-assets/'+edgeChange.after,import.meta.url),'utf8');
assert.equal(sha(edgeSVG.replace(edgeChange.svg_addition,'')),edgeChange.prior_svg_sha256,'Whole canopy body preserved');
assert.equal(speedPlatformSource.split(speedChange.css_after).length-1,1,'Exact requested speed variation');
const growingPlatformSource=speedPlatformSource.replace(speedChange.css_after,speedChange.css_before).replace(speedChange.comment_after,speedChange.comment_before);
assert.equal(sha(growingPlatformSource),speedChange.prior_css_sha256,'Canopy and piles unchanged');
assert.equal(growingPlatformSource.split(growthChange.css_after).length-1,1,'Exact approved finite pile growth');
const actualPlatformSource=growingPlatformSource.replace(growthChange.css_after,growthChange.css_before).replace(growthChange.asset_after,growthChange.asset_before);
assert.equal(sha(actualPlatformSource),growthChange.prior_css_sha256,'All earlier CSS including falling leaves unchanged');
assert.equal(actualPlatformSource.split(variedChange.css_insertion).length-1,1,'Exact approved document-floor decoration');
const currentPlatformSource=actualPlatformSource.replace(variedChange.css_insertion,'').replace(variedChange.asset_after,variedChange.asset_before);
assert.equal(sha(currentPlatformSource),variedChange.prior_css_sha256,'Falling leaves and all previous CSS byte-identical');
assert.equal(currentPlatformSource.split(fullCanopyChange.after).length-1,1,'Exact authorized full-width canopy and header space');
for(const [name,hash] of Object.entries(fullCanopyChange.leaf_asset_sha256)) assert.equal(sha(fs.readFileSync(new URL('../dist/platform-assets/'+name,import.meta.url))),hash,'Falling leaf artwork unchanged');
assert.equal(currentPlatformSource.split(incidenceChange.css_after).length-1,1,'Exact approved incidence rules');
const platformSource=currentPlatformSource.replace(fullCanopyChange.after,fullCanopyChange.before).replace(incidenceChange.css_after,incidenceChange.css_before).replace(incidenceChange.comment_after,incidenceChange.comment_before);
assert.equal(platformSource.split(identityChanges.platform_css_insertion).length-1,1);
assert.equal(platformSource.split(canopyChange.after).length-1,1,'Exact authorized document decoration');
assert.equal(sha(platformSource.replace(canopyChange.after,canopyChange.before).replace(identityChanges.platform_css_insertion,'')),identityChanges.platform_css_before_sha256,'Only approved brand rules added to platform CSS');
const fullCSS=fs.readFileSync(new URL('../dist/platform.css',import.meta.url),'utf8').replace(contentFrameCurves.css_insertion,'').replace(/\/\*[\s\S]*?\*\//g,'');
// User explicitly expanded leaves to all six games on 2026-10-24.
// Only the document-anchored inert ornamental sibling may animate. Historical hashes remain.
const leafFrames=fullCSS.match(/@keyframes platform-leaf-fall\{(?:[^{}]*\{[^{}]*\})+\s*\}/g)??[];
assert.equal(leafFrames.length,1,'Exactly one isolated decorative leaf animation');
const pileFrames=fullCSS.match(/@keyframes platform-pile-arrive\{(?:[^{}]*\{[^{}]*\})+\s*\}/g)??[];
assert.equal(pileFrames.length,1,'One finite opacity-only pile animation');
assert.ok(!pileFrames[0].includes('transform'));
const css=fullCSS.replace(leafFrames[0],'').replace(pileFrames[0],'');
assert.ok(!css.includes('--'),'No shared or inherited custom property changes');
assert.ok(!/@(?:import|keyframes)/.test(css),'No external imports or unapproved keyframes');
assert.ok(!/\b(?:filter|zoom|transform)\s*:/.test(css.replaceAll('transform:none;','')),'No game container transforms');
const selectors=[...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(x=>!x[1].trim().startsWith('@'));
for(const [,raw,body] of selectors){
 const s=raw.trim();
 if(s==='body:has(> .platform-leaf-layer)'){assert.equal(body,'position:relative');continue;}
 if(/animation\s*:/.test(body)){
  assert.ok(['body > .platform-leaf-layer > .platform-leaf','body > .platform-leaf-foreground > .platform-leaf','body > .platform-leaf-layer > .platform-pile'].includes(s),'Only decorative siblings animate');
  assert.ok(/animation:(?:platform-leaf-fall|platform-pile-arrive|none)/.test(body),'Only approved leaf animation');
 }
 assert.ok(s.startsWith('body > .platform-leaf-layer')||s.startsWith('body > .platform-leaf-foreground')||s.startsWith('body > header')||s.startsWith('body > footer')||s.startsWith('#main > .intro')||s.startsWith('#main > .games')||s.startsWith(':where(body:not(:has(.lab:not([hidden]), #collection:not([hidden]) > .collection-lab)))')||s.startsWith(':is(#selection, #collection > .level-screen)'),`Unexpected unscoped selector: ${s}`);
}
assert.ok(fullCSS.includes('@media(prefers-reduced-motion:reduce)'),'Reduced-motion opt-out required');
assert.ok(!css.includes('quiet-garden.svg'),'Landscape no longer displayed');
assert.ok(css.includes('pointer-events:none'),'Leaves must not intercept input');
assert.ok(css.includes('position:absolute;inset:0'),'Document leaf layer is out of normal flow');
assert.ok(css.includes('position:fixed;inset:0'),'Distant plane follows viewport');
assert.ok(fullCSS.includes('100cqh'),'Motion follows each decorative containing block');
assert.ok(css.includes('height:88px')&&css.includes('border-top:88px solid #fafbf7'),'Canopy has equal reserved header space');
assert.ok(css.includes('border-top-width:64px')&&css.includes('height:64px'),'Compact mobile canopy and matching reserved space');
assert.equal((css.match(/display:none;animation:none/g)??[]).length,2,'Both motion planes disabled for reduced motion');
assert.ok(css.includes('overflow:hidden;pointer-events:none;user-select:none;contain:strict'),'Only the ornamental layer clips its overflow');
assert.ok(!css.includes('platform-leaf-drift'),'Old menu leaves removed to avoid duplication');
console.log(`PASS PACTO/Endless exact authorized hashes; ${Object.keys(baseline).length-Object.keys(approved).length} original files byte-identical; ${Object.keys(approved).length} interface exceptions match their active separately recorded hashes (Endless overrides only app/collection); ${selectors.length} style blocks retain explicit platform roots. Exact authorized home-copy edits and the inert leaf-layer insertion are reversed for comparison. Original retro baseline is unchanged. Browser computed-style/geometry comparison remains separate.`);
