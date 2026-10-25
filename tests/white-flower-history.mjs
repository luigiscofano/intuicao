import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {restoreStemlessFlowerCSS} from './stemless-flower-history.mjs';
const m=JSON.parse(fs.readFileSync(new URL('./white-flower-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreWhiteFlowerCSS(css){
 if(sha(css)===m.priorCssSHA256)return css;
 css=restoreStemlessFlowerCSS(css);
 assert.equal(sha(css),m.afterCssSHA256,'Exact authorized active white flower and fine green contour');
 for(const {before,after} of m.replacements){
  assert.equal(css.split(after).length-1,1,'Exactly one active flower replacement');
  css=css.replace(after,before);
 }
 for(const {text,beforeAnchor} of m.removals){
  assert.equal(css.split(text).length-1,0,'Lower duplicate is absent');
  assert.equal(css.split(beforeAnchor).length-1,1,'Unique exact restoration anchor');
  css=css.replace(beforeAnchor,text+beforeAnchor);
 }
 assert.equal(sha(css),m.priorCssSHA256,'All CSS outside the exact two active-card edits remains byte-identical');
 return css;
}
