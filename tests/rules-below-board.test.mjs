import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {execFileSync} from 'node:child_process';
test('rules are one-column normal-flow below play surfaces and above advanced options',()=>{
 const css=fs.readFileSync('dist/compact-play.css','utf8');
 assert.match(css,/\.collection-workspace\)\{grid-template-columns:minmax\(0,1fr\)!important;align-items:start/);
 assert.match(css,/>\.rules-sidebar\{grid-column:1!important;grid-row:2!important/);
 assert.match(css,/>\.controls\{grid-column:1!important;grid-row:3!important/);
 assert.equal(execFileSync('git',['diff','--name-only','04c6e45764cd7430cb3c80cd41c93f9f184a10d4','--','dist'],{encoding:'utf8'}).trim(),'dist/compact-play.css\ndist/elo-region-colors.mjs');
});
test('existing entry defaults and approved Repasse geometry remain intact',()=>{
 assert.match(fs.readFileSync('dist/app.mjs','utf8'),/\$\('original-rules-panel'\)\.open=true;syncOriginalRules\(\)/);
 assert.match(fs.readFileSync('dist/collection-ui.mjs','utf8'),/function entryRulesOpen\(\)\{return true;\}/);
 for(const g of ['sintonia','repasse','orbita'])assert.match(fs.readFileSync(`dist/${g}/ui.mjs`,'utf8'),/rulesOpen=true/);
 assert.match(fs.readFileSync('dist/repasse/ui.css','utf8'),/r-board-scroll\{padding-top:24px\}/);
});
