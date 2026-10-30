import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {lightLevels} from '../dist/light-levels.mjs';
const baseline='bc9240ebd850f3b7d0710b36d8a0ce10319f7cb0';
const files=execFileSync('git',['ls-tree','-r','--name-only',baseline,'dist'],{encoding:'utf8'}).trim().split('\n');
for(const f of files)if(f!=='dist/light-levels.mjs')assert.deepEqual(fs.readFileSync(f),execFileSync('git',['show',`${baseline}:${f}`],{maxBuffer:50*1024*1024}),f+' must stay byte-identical');
const beforeText=execFileSync('git',['show',`${baseline}:dist/light-levels.mjs`],{encoding:'utf8',maxBuffer:5*1024*1024});
const before=(await import('data:text/javascript;base64,'+Buffer.from(beforeText).toString('base64'))).lightLevels;
const geometry=l=>JSON.stringify(Object.fromEntries(['sources','targets','objects','portals','solution','target','sourceAngle'].map(k=>[k,l[k]])));
assert.equal(lightLevels.length,80);assert.equal(new Set(lightLevels.map(l=>l.id)).size,80);
let changed=0,retained=0;
for(let i=0;i<80;i++){
 const a=before[i],b=lightLevels[i];
 if(geometry(a)!==geometry(b)){changed++;assert.notEqual(a.id,b.id,'Changed geometry gets new identity at '+(i+1));assert.ok(!before.some(l=>l.id===b.id),'A changed geometry cannot reuse another archived ID');}
 else{retained++;assert.equal(b.id,a.id,'Unchanged geometry retains identity at '+(i+1));}
}
console.log(JSON.stringify({passed:true,baseline,unchangedRuntimeFiles:files.length-1,changedGeometry:changed,retainedGeometry:retained}));
