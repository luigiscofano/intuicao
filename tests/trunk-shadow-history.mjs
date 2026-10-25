import {restoreAllScreensFrameCSS} from './all-screens-frame-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m=JSON.parse(fs.readFileSync(new URL('./trunk-shadow-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreTrunkShadowCSS(css){
 css=restoreAllScreensFrameCSS(css);
 assert.equal(sha(css),m.afterCssSHA256,'Exact silhouette-shadow CSS');
 assert.equal(css.split(m.after).length-1,1);
 css=css.replace(m.after,m.before);
 assert.equal(sha(css),m.priorCssSHA256,'All styles outside selection silhouette shadow preserved');
 return css;
}
