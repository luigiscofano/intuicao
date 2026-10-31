import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';
test('only authorized SINTONIA inset and ORBITA readout presentation changed',()=>{
 assert.equal(execFileSync('git',['diff','--name-only','6506b19de546c62b9ac2efcb1949b4221ce79bdf','--','dist'],{encoding:'utf8'}).trim(),'dist/compact-play.css\ndist/orbita/ui.css');
 const c=fs.readFileSync('dist/compact-play.css','utf8'),o=fs.readFileSync('dist/orbita/ui.css','utf8');
 assert.match(c,/@media\(min-width:1100px\)\{#sintonia \.s-board-surface>\.s-command-row\{position:relative;right:clamp\(8px,/);
 assert.match(o,/#orbita \.o-surface\{background:#f8f9f3;padding-bottom:8px\}/);
 assert.match(o,/#orbita \.o-readout strong\{font-size:36px/);
 assert.match(o,/#orbita #o-status:empty\{display:none\}/);
});
