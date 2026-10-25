import {restoreGameSpacingCSS} from './game-spacing-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m=JSON.parse(fs.readFileSync(new URL('./all-screens-frame-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreAllScreensFrameCSS(css){
 // Multiple historical routes may meet. Only the exact prior hash is a no-op.
 if(sha(css)===m.priorCssSHA256)return css;
 css=restoreGameSpacingCSS(css);
 assert.equal(sha(css),m.afterCssSHA256,'Exact all-screens exterior-frame CSS');
 assert.ok(css.endsWith(m.append),'One exact authorized appended paint block');
 css=css.slice(0,-m.append.length);
 assert.equal(sha(css),m.priorCssSHA256,'All prior platform styles unchanged');
 return css;
}
export function restoreAllScreensFrameFile(path,bytes){
 if(path.replace(/^dist\//,'')!=='platform.css')return bytes;
 const css=restoreAllScreensFrameCSS(bytes.toString());
 return Buffer.isBuffer(bytes)?Buffer.from(css):css;
}
