// Aggregate deterministic verification; browser QA is separate.
import {spawnSync} from 'node:child_process';
import {readdirSync} from 'node:fs';
const tests=readdirSync(new URL('.',import.meta.url)).filter(f=>f.endsWith('-tests.mjs')).sort().map(f=>[f]);
tests.push(['direct-ui-acceptance.mjs'],['endless-original-generators.mjs'],['endless-original-ui.mjs']);
for(const game of ['light','cut'])for(const state of ['', 'solved'])tests.push(['endless-original-resume.mjs',game,...(state?[state]:[])]);
let passed=0;
for(const [file,...args] of tests){
 console.log('\n=== '+[file,...args].join(' '));
 const r=spawnSync(process.execPath,[new URL(file,import.meta.url).pathname,...args],{stdio:'inherit',timeout:120000});
 if(r.status!==0){console.error('FAILED',file,r.error??r.signal??r.status);process.exit(1);}passed++;
}
console.log(`\nPASS ${passed} deterministic suites/runs. Browser/device layout verification is not included.`);
