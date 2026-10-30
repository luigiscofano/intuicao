import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const base='bad9ec679bbbd0b4939cc329b4d476ea5d1eb1bd';
const allowed=new Set(['dist/repasse/campaign.mjs','dist/repasse/ui.mjs','dist/game-info-content.mjs']);
const paths=execFileSync('git',['ls-tree','-r','--name-only',base,'dist'],{encoding:'utf8'}).trim().split('\n');
let exact=0;
for(const path of paths){if(allowed.has(path))continue;const before=execFileSync('git',['show',`${base}:${path}`],{maxBuffer:80e6});assert.ok(fs.readFileSync(path).equals(before),`${path}: unauthorized change`);exact++;}
const engineHash=createHash('sha256').update(fs.readFileSync('dist/repasse/engine.mjs')).digest('hex');
console.log(JSON.stringify({passed:true,baseline:base,byteIdenticalFiles:exact,engineHash,scope:'All other campaigns, shared controls, CSS, assets, REPASSE engine, generator, fallback, advisor and service unchanged'}));

const info=fs.readFileSync('dist/game-info-content.mjs','utf8');const oldInfo=execFileSync('git',['show',`${base}:dist/game-info-content.mjs`],{encoding:'utf8'});assert.equal(info,oldInfo.replace('A prévia mostra os destinatários atuais. Explore 500 fases','A prévia mostra os destinatários atuais. Explore 80 fases'));
