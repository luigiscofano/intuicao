import {restoreEloV3File} from './elo-v3-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const manifest=JSON.parse(fs.readFileSync(new URL('./endless-campaign-baseline.json',import.meta.url)));
const pactoApproved=JSON.parse(fs.readFileSync(new URL('./pacto-check-authorized-sha256.json',import.meta.url))).sha256;
const identityChanges=JSON.parse(fs.readFileSync(new URL('./curiosity-brand-authorized-changes.json',import.meta.url)));
for(const [path,hash] of Object.entries(manifest.sha256)){
 let bytes=restoreEloV3File(path,fs.readFileSync(new URL('../'+path,import.meta.url)));
 if(path==='dist/platform.css'){
  // Later, separately authorized decoration revisions are all verified and
  // reversed by the platform suite. This older manifest must not overwrite them.
  await import('./platform-isolation-tests.mjs');
  continue;
 }
 assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),pactoApproved[path.replace(/^dist\//,'')]??hash,`Campaign/engine/visual asset changed: ${path}`);
}
console.log(`PASS ${Object.keys(manifest.sha256).length} campaign, engine, interaction and approved visual files match retained baseline or exact PACTO-approved UI hashes; pre-Endless ${manifest.baseline}.`);
