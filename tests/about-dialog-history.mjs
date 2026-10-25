import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m=JSON.parse(fs.readFileSync(new URL('./about-dialog-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreAboutDialogHTML(html){
 assert.equal(sha(html),m.afterHtmlSHA256,'Exact authorized About dialog HTML');
 assert.equal(html.split(m.replacement.after).length-1,1);
 html=html.replace(m.replacement.after,m.replacement.before);
 for(const insertion of m.insertions){assert.equal(html.split(insertion).length-1,1);html=html.replace(insertion,'');}
 assert.equal(sha(html),m.priorHtmlSHA256,'Every preexisting game, frame and leaf markup preserved');
 return html;
}
