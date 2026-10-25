import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {restoreInfoRefinementFile} from './info-refinement-history.mjs';
const read=name=>fs.readFileSync(new URL(name,import.meta.url));
const manifest=JSON.parse(read('./info-refinement-authorized-change.json'));
const previous=JSON.parse(read('./game-info-authorized-change.json'));
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
assert.deepEqual(Object.keys(manifest.files).sort(),['game-info-content.mjs','game-info.mjs']);
for(const [name,change] of Object.entries(manifest.files)){
 const bytes=read('../dist/'+name),before=restoreInfoRefinementFile(name,bytes);
 assert.ok(Buffer.isBuffer(before));assert.equal(sha(bytes),change.afterSha256);
 assert.equal(sha(before),change.beforeSha256);assert.equal(sha(before),previous.newFilesSHA256['dist/'+name]);
 assert.deepEqual(restoreInfoRefinementFile('dist/'+name,before),before);
 assert.equal(restoreInfoRefinementFile(name,bytes.toString()),before.toString());
 assert.throws(()=>restoreInfoRefinementFile(name,bytes.toString()+' '));
 assert.throws(()=>restoreInfoRefinementFile(name,before.toString()+' '));
}
const unrelated=Buffer.from('unchanged');assert.equal(restoreInfoRefinementFile('app.mjs',unrelated),unrelated);
console.log('PASS information refinement: exact two-file changes, immutable published baseline, reversible/idempotent restoration, Buffer/string inputs, and fail-closed tampering guards.');
