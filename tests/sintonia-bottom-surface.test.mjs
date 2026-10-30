import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const baseline='60781ffb4c5fc47a3bb5d5ec5cd8163b61a178cc';
const addition='/* Keep the inherited 20px surface padding continuous with the white actions below. */\n#sintonia .sintonia-lab .collection-surface{background-image:linear-gradient(to top,#fff 20px,transparent 20px)}\n';
test('only the Sintonia bottom 20px paint changes; all existing Sintonia CSS is intact',()=>{
 const css=readFileSync('dist/sintonia/ui.css','utf8');
 assert.ok(css.includes(addition));
 assert.equal(css.replace(addition,''),execFileSync('git',['show',`${baseline}:dist/sintonia/ui.css`],{encoding:'utf8'}));
 assert.match(readFileSync('dist/style.css','utf8'),/\.collection-surface\{padding-bottom:20px;position:relative\}/);
});
test('all campaign definitions, engines and other game runtime files remain identical',()=>{
 const files=execFileSync('git',['ls-tree','-r','--name-only',baseline,'dist'],{encoding:'utf8'}).trim().split('\n');
 let checked=0;
 for(const file of files){
  if(file==='dist/sintonia/ui.css'||file.startsWith('dist/about-'))continue;
  assert.ok(readFileSync(file).equals(execFileSync('git',['show',`${baseline}:${file}`],{maxBuffer:80e6})),file);checked++;
 }
 assert.ok(checked>100);
});
