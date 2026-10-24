import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m=JSON.parse(fs.readFileSync(new URL('./hero-text-inset-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreHeroTextInsetCSS(css){
 css=restorePileFlightCSS(css);
 assert.equal(sha(css),m.afterCssSHA256,'Exact hero text inset CSS');
 for(const {before,after} of m.replacements){assert.equal(css.split(after).length-1,1);css=css.replace(after,before);}
 assert.equal(sha(css),m.priorCssSHA256,'Only responsive left padding changed');
 return css;
}
import {restorePileFlightCSS} from './pile-open-flight-history.mjs';
