import {restoreReferenceFlowersCSS} from './reference-flowers-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m=JSON.parse(fs.readFileSync(new URL('./active-flower-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreActiveFlowerCSS(css){
 if(sha(css)===m.priorCssSHA256)return css;
 css=restoreReferenceFlowersCSS(css);
 assert.equal(sha(css),m.afterCssSHA256,'Exact authorized active-flower CSS');
 for(const {before,after} of m.replacements){
  assert.equal(css.split(after).length-1,1,'Exactly one active navigation flower rule');
  css=css.replace(after,before);
 }
 assert.equal(sha(css),m.priorCssSHA256,'Every style outside the active navigation marker is byte-identical');
 return css;
}
