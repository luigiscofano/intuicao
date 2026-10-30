import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const base='cc16d2583b73d46ffd3bf09658129fe61010bae9';
const allowed=new Set(['dist/app.mjs','dist/levels.mjs','dist/README.md','dist/CATALOGO-ATUAL.md']);
const files=execFileSync('git',['ls-tree','-r','--name-only',base,'dist'],{encoding:'utf8'}).trim().split('\n');
for(const f of files)if(!allowed.has(f))assert.deepEqual(fs.readFileSync(f),execFileSync('git',['show',`${base}:${f}`],{maxBuffer:100e6}),f);
console.log(JSON.stringify({passed:true,unchangedExistingDistFiles:files.length-allowed.size,baseline:base,scope:'All seven prior 80-level campaigns, engines, sprites, visuals, standard buttons and wrappers byte-identical.'}));
