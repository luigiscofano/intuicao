import {restoreGreenSparklesFile} from './green-sparkles-history.mjs';
import {restoreHintsRulesFile} from './hints-rules-history.mjs';
import {restoreAllScreensFrameFile} from './all-screens-frame-history.mjs';
import {restoreManualCheckFile} from './manual-check-history.mjs';
import {restoreOriginalLogoHTML} from './original-logo-history.mjs';
/** Reverses only the exact ELO expansion recorded in the authorized manifest.
 * Existing pre-expansion manifests remain untouched and retain their checks. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const manifest=JSON.parse(fs.readFileSync(new URL('./elo-v3-authorized-change.json',import.meta.url)));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreEloV3File(path,bytes){
 bytes=restoreGreenSparklesFile(path,bytes);
 bytes=restoreHintsRulesFile(path,bytes);
 bytes=restoreAllScreensFrameFile(path,bytes);
 bytes=restoreManualCheckFile(path,bytes);
 const name=path.replace(/^dist\//,'');
 if(name==='index.html'){const html=restoreOriginalLogoHTML(bytes.toString());bytes=Buffer.isBuffer(bytes)?Buffer.from(html):html;}
 const change=manifest.files[name];if(!change)return bytes;
 let text=Buffer.isBuffer(bytes)?bytes.toString():bytes;
 assert.equal(sha(text),change.afterSha256,'Exact authorized ELO update: '+name);
 if(change.append!==undefined){assert.ok(text.endsWith(change.append),'Exact ELO appended block: '+name);text=text.slice(0,-change.append.length);}
 else for(const block of [...change.blocks].reverse()){
  assert.ok(block.after.length>0,'Reversible context block');
  assert.equal(text.split(block.after).length-1,1,'Unique exact ELO block: '+name);
  text=text.replace(block.after,block.before);
 }
 assert.equal(sha(text),change.beforeSha256,'Earlier source retained by ELO reversal: '+name);
 return Buffer.isBuffer(bytes)?Buffer.from(text):text;
}
