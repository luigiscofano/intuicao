import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const base='0ea60be4554c118c96f531f1d26b3f0dfc603ca5';
const allowed=new Set(['dist/collection-ui.mjs','dist/symbol-levels.mjs','dist/README.md','dist/CATALOGO-ATUAL.md']);
const paths=execFileSync('git',['ls-tree','-r','--name-only',base,'dist'],{encoding:'utf8'}).trim().split('\n');let retained=0;
for(const p of paths){if(allowed.has(p))continue;assert.deepEqual(fs.readFileSync(p),execFileSync('git',['show',base+':'+p],{maxBuffer:30e6}),p);retained++;}
console.log(JSON.stringify({passed:true,byteIdenticalExistingDistFiles:retained,base,unchanged:'All CSS, assets, physics, symbol engine, validators, hints, explicit error feedback, manual check, direct controls, all other games including ELO80 and PRUMO80'}));
