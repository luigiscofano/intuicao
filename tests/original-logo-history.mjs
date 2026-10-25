import {restoreGameInfoHTML} from './game-info-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m=JSON.parse(fs.readFileSync(new URL('./original-logo-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreOriginalLogoHTML(html){
 html=restoreGameInfoHTML(html);
 // Historical pipelines may already have reversed this layer. Accept only the
 // exact old document, never an arbitrary source without the new logo.
 if(sha(html)===m.priorHtmlSHA256)return html;
 assert.equal(sha(html),m.afterHtmlSHA256,'Exact authorized original-logo HTML');
 for(const {before,after} of [...m.replacements].reverse()){
  assert.equal(html.split(after).length-1,1,'Unique exact logo replacement');
  html=html.replace(after,before);
 }
 assert.equal(sha(html),m.priorHtmlSHA256,'Only approved logo markup changed');
 return html;
}
