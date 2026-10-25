import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m=JSON.parse(fs.readFileSync(new URL('./ingame-flower-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreIngameFlowerCSS(css){
 if(sha(css)===m.priorCssSHA256)return css;
 assert.equal(sha(css),m.afterCssSHA256,'Exact authorized active flower inside every game');
 for(const {before,after} of m.replacements){
  assert.equal(css.split(after).length-1,1,'Exactly one authorized active flower selector or anchor replacement');
  css=css.replace(after,before);
 }
 assert.equal(sha(css),m.priorCssSHA256,'All remaining platform CSS is byte-identical to the stemless-flower layer');
 return css;
}
