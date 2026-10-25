import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m=JSON.parse(fs.readFileSync(new URL('./reference-flowers-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreReferenceFlowersCSS(css){
 if(sha(css)===m.priorCssSHA256)return css;
 assert.equal(sha(css),m.afterCssSHA256,'Exact authorized original-reference flowers CSS');
 assert.ok(css.endsWith(m.append),'One exact reference-flower appendix');
 css=css.slice(0,-m.append.length);
 for(const {before,after} of m.replacements){
  assert.equal(css.split(after).length-1,1,'Exactly one active original flower replacement');
  css=css.replace(after,before);
 }
 assert.equal(sha(css),m.priorCssSHA256,'All styles outside approved passive flowers remain byte-identical');
 return css;
}
