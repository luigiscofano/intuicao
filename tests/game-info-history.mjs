import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m=JSON.parse(fs.readFileSync(new URL('./game-info-authorized-change.json',import.meta.url),'utf8'));
const previous=JSON.parse(fs.readFileSync(new URL('./original-logo-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
export function restoreGameInfoHTML(html){
 // A historical caller may already have reversed this layer, or the logo layer.
 // Accept only those exact documents, not arbitrary markup missing the additions.
 if([m.priorHtmlSHA256,previous.priorHtmlSHA256].includes(sha(html)))return html;
 assert.equal(sha(html),m.afterHtmlSHA256,'Exact authorized game information and navigation HTML');
 for(const insertion of m.insertions){assert.equal(html.split(insertion).length-1,1,'Unique exact game information insertion');html=html.replace(insertion,'');}
 assert.equal(sha(html),m.priorHtmlSHA256,'All preexisting HTML remains byte-identical');
 return html;
}
