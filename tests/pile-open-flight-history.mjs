import assert from 'node:assert/strict';
import {restoreTrunkShadowCSS} from './trunk-shadow-history.mjs';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m=JSON.parse(fs.readFileSync(new URL('./pile-open-flight-authorized-change.json',import.meta.url),'utf8'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
function restore(source,kind){
 assert.equal(sha(source),m[kind+'_after_sha256'],'Exact authorized open-flight '+kind);
 for(const {before,after} of m[kind+'_replacements']){
  assert.equal(source.split(after).length-1,1,'One exact open-flight replacement');
  source=source.replace(after,before);
 }
 assert.equal(sha(source),m[kind+'_before_sha256'],'Historical '+kind+' unchanged outside open-flight scope');
 return source;
}
export const restorePileFlightCSS=css=>restore(restoreTrunkShadowCSS(css),'css');
export const restorePileFlightModule=source=>restore(source,'module');
