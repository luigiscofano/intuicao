// Reverse only the exact reviewed campaign edit when running older preservation tests.
// Unknown bytes are never normalized, and historical hash baselines remain unchanged.
import assert from 'node:assert/strict';
import {restoreLightV5File} from './light-v5-history.mjs';
import fs from 'node:fs';
import crypto from 'node:crypto';
const manifest=JSON.parse(fs.readFileSync(new URL('./light-v4-authorized-change.json',import.meta.url)));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
export function restoreLightCampaignFile(path,bytes){
 bytes=restoreLightV5File(path,bytes);
 const change=manifest.files[path.replace(/^dist\//,'')];if(!change)return bytes;
 let text=Buffer.isBuffer(bytes)?bytes.toString():bytes;
 if(sha(text)!==change.afterSha256)return bytes;
 for(const block of [...change.blocks].reverse()){
  assert.equal(text.split(block.after).length-1,1,'Unique exact campaign authorization block');
  text=text.replace(block.after,block.before);
 }
 assert.equal(sha(text),change.beforeSha256,'Exact campaign reversal must recover the original bytes');
 return Buffer.isBuffer(bytes)?Buffer.from(text):text;
}
