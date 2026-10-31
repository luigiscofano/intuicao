import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';
test('Repasse frame inset is mode-independent and does not shrink the approved board',()=>{
 const css=fs.readFileSync('dist/repasse/ui.css','utf8');
 assert.match(css,/#repasse \.r-surface \.r-board-scroll\{padding-top:24px\}/);
 assert.match(css,/r-gain\{[^}]*top:-6px/);
 assert.match(css,/var\(--r-inner-cols\)\*76px/);
 const files=execFileSync('git',['diff','--name-only','1fddfc271208f38511df8600a5c4c165ce508b56','--','dist'],{encoding:'utf8'}).trim();
 assert.equal(files,'dist/repasse/ui.css');
});
