import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const base='72e04b43b7168bf2e6e12d6b5de98a3726cf905d';
const allowed=new Set(['dist/sintonia/campaign.mjs','dist/sintonia/ui.mjs','dist/sintonia/service.mjs','dist/sintonia/route.mjs']);
const paths=execFileSync('git',['ls-tree','-r','--name-only',base,'dist'],{encoding:'utf8'}).trim().split('\n');
let exact=0;
for(const path of paths){if(allowed.has(path))continue; const before=execFileSync('git',['show',`${base}:${path}`],{maxBuffer:80e6});assert.ok(fs.readFileSync(path).equals(before),`${path}: unauthorized change`);exact++;}
assert.equal(createHash('sha256').update(fs.readFileSync('dist/sintonia/engine.mjs')).digest('hex'),'db5503ca8fcff67526cab621be89c472c1afb75b2083b9c69d9f98859fe8eece');
const archive=fs.readFileSync('dist/sintonia/campaign-v2.mjs','utf8');
const before=execFileSync('git',['show',`${base}:dist/sintonia/campaign.mjs`],{maxBuffer:40e6,encoding:'utf8'});
assert.equal(archive,before,'frozen full previous definitions');
console.log(`PASS ${exact} existing runtime files byte-identical (all other games, shared controls, SINTONIA engine, art, CSS, generator and reserves); v2 definitions archived exactly.`);
