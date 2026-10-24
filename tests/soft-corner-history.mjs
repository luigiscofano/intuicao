import {restoreHeroTextInsetCSS} from './hero-text-inset-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m=JSON.parse(fs.readFileSync(new URL('./soft-corner-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreSoftCornerCSS(css){
 css=restoreHeroTextInsetCSS(css);
 assert.equal(sha(css),m.afterCssSHA256,'Exact current softened-corner CSS');
 for(const {before,after} of m.replacements){assert.equal(css.split(after).length-1,1,'One exact soft-corner replacement');css=css.replace(after,before);}
 assert.equal(sha(css),m.priorCssSHA256,'All previous styles preserved outside the corner');
 return css;
}
