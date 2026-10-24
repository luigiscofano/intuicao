import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
const manifest=JSON.parse(fs.readFileSync(new URL('./pile-seam-authorized-change.json',import.meta.url)));
for(const change of manifest.svg_changes){
 const svg=fs.readFileSync(new URL('../dist/platform-assets/'+change.file,import.meta.url),'utf8');
 assert.equal(sha(svg),change.sha256);let original=svg;
 if(change.insertion){assert.equal(svg.split(change.insertion).length-1,1);original=original.replace(change.insertion,'');}
 assert.equal((change.insertion.match(/data-wrap-copy="true"/g)||[]).length,change.copies);
 for(const replacement of change.replacements){
  assert.equal(original.split(replacement.after).length-1,1);original=original.replace(replacement.after,replacement.before);
  assert.equal(replacement.after.replace(/opacity="[^"]+"/,''),replacement.before.replace(/opacity="[^"]+"/,''),'Only opacity changes: paths, transforms, colour and rest positions identical');
  assert.equal(replacement.factor,[.18,.48,.78][replacement.edge_column],'Edge columns taper gradually, not an abrupt wall');
 }
 assert.equal(sha(original),change.prior_sha256,'All original leaves preserved without changed seeds/timing or positions');
 assert.ok(!/filter=|clipPath|mask=/.test(change.insertion),'No blur or hard-edged mask');
}
const source=fs.readFileSync(new URL('../dist/decor-piles.mjs',import.meta.url),'utf8'),c=manifest.module_change;
assert.equal(sha(source),c.sha256);assert.equal(source.split(c.after).length-1,1);assert.equal(sha(source.replace(c.after,c.before)),c.prior_sha256,'Only static seam copy exclusion changes in physics module');
assert.ok(c.after.includes("!n.hasAttribute('data-wrap-copy')"),'Continuity copies cannot duplicate interactive particles');
console.log('PASS natural pile edges: periodic seams and gradual live-leaf opacity; original paths/positions/physics preserved.');
