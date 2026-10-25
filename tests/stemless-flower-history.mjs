import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {restoreIngameFlowerCSS} from './ingame-flower-history.mjs';
const m=JSON.parse(fs.readFileSync(new URL('./stemless-flower-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreStemlessFlowerCSS(css){
 if(sha(css)===m.priorCssSHA256)return css;
 css=restoreIngameFlowerCSS(css);
 assert.equal(sha(css),m.afterCssSHA256,'Exact authorized stem-only mask on the active white flower');
 for(const {before,after} of m.replacements){
  assert.equal(css.split(after).length-1,1,'Exactly one active flower mask replacement');
  css=css.replace(after,before);
 }
 assert.equal(sha(css),m.priorCssSHA256,'All other platform CSS remains byte-identical');
 return css;
}
