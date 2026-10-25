import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {restoreIngameFlowerCSS} from './ingame-flower-history.mjs';
import {restoreStemlessFlowerCSS} from './stemless-flower-history.mjs';
import {restoreWhiteFlowerCSS} from './white-flower-history.mjs';
import {restoreReferenceFlowersCSS} from './reference-flowers-history.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const m=JSON.parse(read('tests/stemless-flower-authorized-change.json'));
const white=JSON.parse(read('tests/white-flower-authorized-change.json'));
const reference=JSON.parse(read('tests/reference-flowers-authorized-change.json'));
const current=read('dist/platform.css').toString(),css=restoreIngameFlowerCSS(current),old=restoreStemlessFlowerCSS(css);
assert.equal(restoreStemlessFlowerCSS(current),old,'New in-game scope restores through the unchanged stemless authorization');
assert.equal(sha(css),m.afterCssSHA256);
assert.equal(sha(old),white.afterCssSHA256,'Previous active-white-flower authorization is not rebased');
assert.equal(m.priorCssSHA256,white.afterCssSHA256);
assert.equal(restoreStemlessFlowerCSS(old),old,'Exact previous layer remains idempotent');
assert.equal(sha(restoreWhiteFlowerCSS(css)),white.priorCssSHA256,'Strict white-flower restore accepts the new authorized layer');
assert.equal(sha(restoreReferenceFlowersCSS(css)),reference.priorCssSHA256,'Full earlier restoration chain remains exact');
assert.equal(m.replacements.length,1);
const {before,after}=m.replacements[0];
const selector=':where(body:not(:has(.lab:not([hidden]), #collection:not([hidden]) > .collection-lab))) #main > .games > button[aria-pressed=true]::after';
assert.equal(before,white.replacements[0].after,'Exactly the existing white flower, including its green contour');
assert.equal(before.split('{')[0],selector);
assert.equal(after.split('{')[0],selector,'Mask is confined to the active selection-card pseudo-element');
assert.equal(old.split(before).length-1,1);
assert.equal(css.split(after).length-1,1);
assert.equal(old.replace(before,after),css,'One exact CSS replacement and nothing else');
assert.equal(after.replace(m.maskDeclaration,''),before,'Position, image, petals, alpha contour and every other declaration are unchanged');
assert.equal(after.split(m.maskDeclaration).length-1,1);
const mask='mask-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1254 1254\'%3E%3Cpath fill=\'white\' d=\'M0 0H1254V880H690L665 810L600 790V880H0Z\'/%3E%3C/svg%3E");mask-size:100% 100%;mask-repeat:no-repeat;';
assert.equal(m.maskDeclaration,mask,'Exact small lower stem exclusion, not a flower asset or filter replacement');
const svg=decodeURIComponent(mask.match(/data:image\/svg\+xml,([^"\n]+)/)[1]);
assert.equal(svg,"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1254 1254'><path fill='white' d='M0 0H1254V880H690L665 810L600 790V880H0Z'/></svg>");
assert.doesNotMatch(svg,/<script|<foreignObject|\bon\w+=|href=|url\(/i,'Mask contains no active or external content');
assert.match(after,/top:-13px;right:10px;width:32px;height:32px/);
assert.match(after,/pointer-events:none;user-select:none/);
assert.equal(css.replace(after,''),old.replace(before,''),'Other flowers, games, layout and decoration preserved byte-for-byte');
for(const asset of m.assets){
 assert.deepEqual(asset,white.assets.find(a=>a.file===asset.file));
 assert.equal(sha(read('dist/'+asset.file)),asset.sha256,'Both original flower assets are untouched');
}
for(const invalid of [
 css+' ',old+' ',css+after,css.replace(mask,'' )+' ',
 css.replace('V880H690L665 810L600 790V880H0Z','V900H690L665 810L600 790V880H0Z'),
 css.replace(mask,mask.replace('mask-size:100% 100%','mask-size:90% 100%')),
 css.replace(after,after.replace('top:-13px','top:-12px')),
 css.replace(after,after.replace('pointer-events:none','pointer-events:auto')),
 css.replace(after,after.replace('drop-shadow(.5px 0 0','drop-shadow(.5px 0 1px')),
 css.replace(after,after.replace('flower-white-original.png','flower-green-original.png'))
]){
 assert.throws(()=>restoreStemlessFlowerCSS(invalid),'Unknown mutations fail closed in the new layer');
 assert.throws(()=>restoreWhiteFlowerCSS(invalid),'Unknown mutations also fail closed through the existing restoration chain');
}
console.log('PASS exact stem-only active-white-flower mask, unchanged assets/contour/geometry/passive behavior, byte-identical remaining platform CSS and fail-closed historical restoration. Static contracts, not browser pixel QA.');
