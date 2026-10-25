import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const manifest=JSON.parse(fs.readFileSync(new URL('./manual-check-authorized-change.json',import.meta.url)));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreManualCheckFile(path,bytes){
 const change=manifest.files[path.replace(/^dist\//,'')];if(!change)return bytes;
 let text=Buffer.isBuffer(bytes)?bytes.toString():bytes;
 assert.equal(sha(text),change.afterSha256,'Exact authorized manual-check update: '+path);
 if(change.append!==undefined){assert.ok(text.endsWith(change.append));text=text.slice(0,-change.append.length);}
 else for(const block of [...change.blocks].reverse()){assert.equal(text.split(block.after).length-1,1);text=text.replace(block.after,block.before);}
 assert.equal(sha(text),change.beforeSha256,'Pre-check source retained: '+path);
 return Buffer.isBuffer(bytes)?Buffer.from(text):text;
}
