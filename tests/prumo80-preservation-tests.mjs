import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const base='cf3cb986d34e47bbca3519e3b3e1421b326d6f10';
const allowed=new Set(['dist/collection-ui.mjs','dist/geometry-levels.mjs','dist/geometry-answers.mjs','dist/geometry-games.mjs','dist/README.md','dist/CATALOGO-ATUAL.md']);
const paths=execFileSync('git',['ls-tree','-r','--name-only',base,'dist'],{encoding:'utf8'}).trim().split('\n');let retained=0;
for(const p of paths){if(allowed.has(p))continue;assert.deepEqual(fs.readFileSync(p),execFileSync('git',['show',base+':'+p],{maxBuffer:30e6}),p);retained++;}
for(const p of ['dist/geometry-levels.mjs','dist/geometry-answers.mjs']){const old=execFileSync('git',['show',base+':'+p],{encoding:'utf8',maxBuffer:30e6});assert.ok(fs.readFileSync(p,'utf8').startsWith(old),p+' historical records byte preserved');}
const before=execFileSync('git',['show',base+':dist/geometry-games.mjs'],{encoding:'utf8'}),after=fs.readFileSync('dist/geometry-games.mjs','utf8');
const part=(s,a,b)=>s.slice(s.indexOf(a),s.indexOf(b));
assert.equal(part(after,'export function validateGeometry','const shapeCache'),part(before,'export function validateGeometry','const shapeCache'),'exact physical validation unchanged');
assert.equal(part(after,'export function supportCells','function issue'),part(before,'export function supportCells','function issue'),'anchor rules unchanged');
assert.equal(part(after,'export function initialGeometryState','function crossing'),part(before,'export function initialGeometryState','function crossing'),'initial state rules unchanged');
console.log(JSON.stringify({passed:true,byteIdenticalExistingDistFiles:retained,base,unchanged:'All CSS, images, ELO80 data/answers/rules, other games, controls, physics, exact win validator, allowed anchor rule'}));
