import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import {restoreReferenceFlowersCSS} from './reference-flowers-history.mjs';
import {restoreActiveFlowerCSS} from './active-flower-history.mjs';
import {restoreRulesToolbarFile} from './rules-toolbar-history.mjs';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const m=JSON.parse(read('tests/reference-flowers-authorized-change.json'));
const prior=JSON.parse(read('tests/active-flower-authorized-change.json'));
const css=read('dist/platform.css').toString(),old=restoreReferenceFlowersCSS(css);
assert.equal(sha(old),prior.afterCssSHA256,'Continues the previous authorization without rebasing it');
assert.equal(restoreReferenceFlowersCSS(old),old);
assert.equal(sha(restoreActiveFlowerCSS(css)),prior.priorCssSHA256);
assert.equal(m.replacements.length,1);
const {before,after}=m.replacements[0];
assert.equal(before,prior.replacements[0].after);
assert.equal(old.replace(before,after)+m.append,css,'Only exact marker replacement and exact section appendix');
assert.match(after,/width:32px;height:32px/);
assert.match(after,/flower-green-original\.png/);
assert.match(after,/pointer-events:none;user-select:none/);
assert.doesNotMatch(m.append,/\b(?:padding|margin|font|line-height|display|overflow|border|grid|flex|animation|z-index)\s*:/,'No flow, game dimensions, typography or animation changes');
assert.doesNotMatch(m.append,/\.collection-board|\.scene-wrap|\.workspace|\.stage-top|\.experiment|\.collection-surface|svg|canvas/,'No board or game coordinate selectors');
for(const rule of m.append.matchAll(/([^{}]+)\{([^{}]*)\}/g)){
 const [_,selector,body]=rule;
 if(body.includes('content:')){assert.match(body,/content:""/);assert.match(body,/position:absolute/);assert.match(body,/pointer-events:none/);assert.match(body,/user-select:none/);}
 assert.ok(selector.includes('#main > .intro h1')||selector.includes('#selection')||selector.includes('.lab-heading')||selector.includes('body > footer::after')||selector.includes('#main > .games > button[aria-pressed=true]'),'Only approved decoration roots: '+selector);
}
assert.match(m.append,/:is\(#main > \.lab,#collection > \.collection-lab\) > \.lab-heading/,'Both original and all collection game families');
assert.match(m.append,/flower-white-original\.png/);
assert.match(m.append,/@media\(max-width:760px\)/);
assert.match(m.append,/left:-1px;width:18px;height:18px/,'Mobile lab ornament ends at17px, before19px text padding');
for(const [file,hash] of Object.entries(m.preservedDistSHA256))assert.equal(sha(restoreRulesToolbarFile(file,read(file))),hash,'Flower change preserves JS, game styles, coordinates and all other existing files: '+file);
function pngAlpha(bytes){
 assert.equal(bytes.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 let w,h,depth,type,interlace;const chunks=[];
 for(let p=8;p<bytes.length;){const n=bytes.readUInt32BE(p),tag=bytes.toString('ascii',p+4,p+8),data=bytes.subarray(p+8,p+8+n);p+=n+12;if(tag==='IHDR'){w=data.readUInt32BE(0);h=data.readUInt32BE(4);depth=data[8];type=data[9];interlace=data[12];}if(tag==='IDAT')chunks.push(data);}
 assert.equal(w,1254);assert.equal(h,1254);assert.equal(depth,8);assert.equal(type,6,'RGBA original');assert.equal(interlace,0);
 const raw=zlib.inflateSync(Buffer.concat(chunks)),stride=w*4;let previous=Buffer.alloc(stride),cursor=0,transparent=0,opaque=0,partial=0;
 const paeth=(a,b,c)=>{const p=a+b-c,pa=Math.abs(p-a),pb=Math.abs(p-b),pc=Math.abs(p-c);return pa<=pb&&pa<=pc?a:pb<=pc?b:c;};
 for(let y=0;y<h;y++){const filter=raw[cursor++],row=Buffer.alloc(stride);assert.ok(filter<=4);for(let x=0;x<stride;x++){const left=x>=4?row[x-4]:0,up=previous[x],ul=x>=4?previous[x-4]:0;row[x]=(raw[cursor++]+([0,left,up,Math.floor((left+up)/2),paeth(left,up,ul)][filter]))&255;}for(let x=3;x<stride;x+=4){const a=row[x];if(a===0)transparent++;else if(a===255)opaque++;else partial++;}previous=row;}
 assert.ok(transparent>0&&opaque>0&&partial>0,'Transparent cutout preserves solid and antialiased/textured alpha');return {w,h,transparent,opaque,partial};
}
for(const asset of m.assets){const bytes=read('dist/'+asset.file);assert.equal(sha(bytes),asset.sha256);assert.equal(asset.sha256,asset.referenceSHA256,'Asset bytes match owner original, not a redraw');console.log(asset.file,JSON.stringify(pngAlpha(bytes)));}
for(const invalid of [css+' ',old+' ',css+m.append,css.replace('width:32px;height:32px','width:33px;height:32px'),css.replace('pointer-events:none','pointer-events:auto')])assert.throws(()=>restoreReferenceFlowersCSS(invalid),'Unexpected mutations fail closed');
console.log('PASS original flowers: exact PNG originals with true alpha, exact CSS scope, passive ornaments, mobile heading text clearance, unchanged game sources and historical chain. Static contracts, not browser pixel QA.');
