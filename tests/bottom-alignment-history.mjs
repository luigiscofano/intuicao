import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m=JSON.parse(fs.readFileSync(new URL('./bottom-alignment-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreBottomAlignmentCSS(css){
 if(sha(css)===m.priorCssSHA256)return css;
 assert.equal(sha(css),m.afterCssSHA256,'Exact authorized bottom-alignment CSS');
 for(const {before,after} of m.replacements){
  assert.equal(css.split(after).length-1,1,'Exactly one authorized responsive rule');
  css=css.replace(after,before);
 }
 assert.equal(sha(css),m.priorCssSHA256,'Every style outside the two footer offsets remains byte-identical');
 return css;
}
