import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const manifest=JSON.parse(fs.readFileSync(new URL('./json-import-authorized-change.json',import.meta.url)));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreJSONImportFile(path,bytes){
 const name=path.replace(/^dist\//,''),change=manifest.files[name];if(!change)return bytes;
 let text=Buffer.isBuffer(bytes)?bytes.toString():bytes;
 // Pass through older layers unchanged. Their exact historical SHA assertions
 // still reject any unknown edit; the dedicated integrity test pins this layer.
 if(sha(text)!==change.afterSha256)return bytes;
 for(const block of [...change.blocks].reverse()){assert.equal(text.split(block.after).length-1,1,'Unique exact JSON/UI block: '+path);text=text.replace(block.after,block.before);}
 assert.equal(sha(text),change.beforeSha256,'Prior source preserved exactly: '+path);
 return Buffer.isBuffer(bytes)?Buffer.from(text):text;
}
