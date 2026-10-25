import {restoreRulesToolbarFile} from './rules-toolbar-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const manifest=JSON.parse(fs.readFileSync(new URL('./rules-sidebar-authorized-change.json',import.meta.url)));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreRulesSidebarFile(path,bytes){
 bytes=restoreRulesToolbarFile(path,bytes);
 const name=path.replace(/^dist\//,''),change=manifest.files[name];if(!change)return bytes;
 let text=Buffer.isBuffer(bytes)?bytes.toString():bytes;
 // Earlier helpers may already have reversed this layer. Only touch its exact
 // current bytes; every historical layer independently enforces its own SHA.
 if(sha(text)!==change.afterSha256)return bytes;
 for(const block of [...change.blocks].reverse()){assert.equal(text.split(block.after).length-1,1,'Unique exact rules sidebar block: '+path);text=text.replace(block.after,block.before);}
 assert.equal(sha(text),change.beforeSha256,'All previous rules source preserved: '+path);
 return Buffer.isBuffer(bytes)?Buffer.from(text):text;
}
