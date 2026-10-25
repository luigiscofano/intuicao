import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {restoreLightCampaignFile} from './light-v4-history.mjs';
const manifest=JSON.parse(fs.readFileSync(new URL('./light-v4-authorized-change.json',import.meta.url)));
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');
for(const[name,change]of Object.entries(manifest.files)){
 const current=fs.readFileSync(new URL('../dist/'+name,import.meta.url),'utf8');
 const before=execFileSync('git',['show',manifest.baseCommit+':dist/'+name],{encoding:'utf8'});
 assert.equal(sha(before),change.beforeSha256);assert.equal(sha(current),change.afterSha256);
 assert.equal(restoreLightCampaignFile(name,current),before);
 assert.equal(restoreLightCampaignFile('dist/'+name,Buffer.from(current)).toString(),before);
 assert.equal(restoreLightCampaignFile(name,before),before);
 assert.equal(restoreLightCampaignFile(name,current+' '),current+' ','Unknown changes cannot be hidden by a campaign rollback');
 let rebuilt=before;for(const block of change.blocks){assert.equal(rebuilt.split(block.before).length-1,1);rebuilt=rebuilt.replace(block.before,block.after);}assert.equal(rebuilt,current);
}
assert.equal(restoreLightCampaignFile('light-world.mjs','unapproved bytes'),'unapproved bytes');
assert.equal(manifest.baseCommit,'50d2d4338a37b52187cb2aed39449a3842ff2e8e');
console.log('PASS exact campaign authorization, unchanged historical hashes, tamper rejection and no engine normalization');
