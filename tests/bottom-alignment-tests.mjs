import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {restoreBottomAlignmentCSS} from './bottom-alignment-history.mjs';
import {restoreGameSpacingCSS} from './game-spacing-history.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const m=JSON.parse(read('tests/bottom-alignment-authorized-change.json'));
const spacing=JSON.parse(read('tests/game-spacing-authorized-change.json'));
const css=read('dist/platform.css');
assert.equal(sha(css),m.afterCssSHA256);
assert.equal(m.priorCssSHA256,spacing.afterCssSHA256);
assert.equal(m.replacements.length,2,'Only desktop and mobile footer paint rules change');
for(const {before,after} of m.replacements){
 assert.equal(after,before.replace(' - .5px);width:',' + .5px);width:').replace(' + 1px);',' - 1px);'));
 assert.match(after,/body:has\(\.lab:not\(\[hidden\]\), #collection:not\(\[hidden\]\) > \.collection-lab\) > footer::before\{/);
 assert.equal(css.split(after).length-1,1);
}
const oldCSS=restoreBottomAlignmentCSS(css);
assert.equal(sha(oldCSS),m.priorCssSHA256);
assert.equal(restoreBottomAlignmentCSS(oldCSS),oldCSS,'Exact prior state is idempotent');
assert.equal(sha(restoreGameSpacingCSS(css)),spacing.priorCssSHA256,'Historical chain removes alignment before spacing');
for(const invalid of [css+' ',oldCSS+' ',css.replace(m.replacements[0].after,m.replacements[0].before),css.replace(' + .5px);width:',' + 1.5px);width:'),css+'\n'+m.replacements[0].after]){
 assert.throws(()=>restoreBottomAlignmentCSS(invalid),'Unapproved edits, partial restoration and duplicate rules fail closed');
}
const baseCSS=read('dist/style.css');
assert.match(baseCSS,/header,main,footer\{max-width:1280px;margin:auto\}/);
assert.match(baseCSS,/main\{padding:0 40px\}/);
assert.match(baseCSS,/@media\(max-width:760px\)\{[^\n]*main\{padding:0 16px\}/);
assert.match(baseCSS,/\.lab\{[^}]*border:1px solid/);
assert.match(css,/--game-root-flare:max\(38px,calc\(\(100vw - 1280px\)\/2 \+ 28px\)\)/);
assert.match(css,/--game-root-flare:14px/);
assert.match(read('dist/platform-assets/continuous-root-left.svg'),/<path d="M100 0[^\n]*stroke-width="1" vector-effect="non-scaling-stroke"/);
assert.match(read('dist/platform-assets/continuous-root-right.svg'),/<path d="M0 0[^\n]*stroke-width="1" vector-effect="non-scaling-stroke"/);
// Evaluate the actual authorized calc constants, independently of SVG rendering.
// The SVG start caps are at the inner edge of each flare: x=100 on the left, x=0 on the right.
const parse=rule=>{
 const [,inset,leftSign,leftOffset,twiceInset,widthSign,widthOffset]=rule.match(/left:calc\((\d+)px - var\(--game-root-flare\) ([+-]) ([.\d]+)px\);width:calc\(100% - (\d+)px \+ 2 \* var\(--game-root-flare\) ([+-]) ([.\d]+)px\)/);
 return {inset:+inset,leftDelta:(leftSign==='+'?1:-1)*leftOffset,twiceInset:+twiceInset,widthDelta:(widthSign==='+'?1:-1)*widthOffset};
};
for(const viewport of [320,375,760,761,1024,1280,1440,1920,2560]){
 const mobile=viewport<=760, width=Math.min(viewport,1280), outer=(viewport-width)/2;
 const flare=mobile?14:Math.max(38,(viewport-1280)/2+28);
 const r=parse(m.replacements[mobile?1:0].after), old=parse(m.replacements[mobile?1:0].before);
 const panelLeft=outer+r.inset,panelRight=outer+width-r.inset;
 const capPositions=q=>{
  const left=outer+q.inset-flare+q.leftDelta;
  const paintWidth=width-q.twiceInset+2*flare+q.widthDelta;
  return [left+flare,left+paintWidth-flare];
 };
 const [left,right]=capPositions(r),[oldLeft,oldRight]=capPositions(old);
 assert.equal(left,panelLeft+.5,`${viewport}px left cap matches 1px border center`);
 assert.equal(right,panelRight-.5,`${viewport}px right cap matches 1px border center`);
 assert.equal(left-oldLeft,1,'Left line moves inward exactly 1px');
 assert.equal(oldRight-right,1,'Right line moves inward exactly 1px');
}
console.log('PASS bottom alignment: two exact CSS substitutions, fail-closed/idempotent historical restoration, 9 mobile/desktop/wide viewport geometries and 1px inward joins. Browser QA remains required.');
