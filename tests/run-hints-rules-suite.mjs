/** Records every result; known historical failures are not silently skipped. */
import {spawnSync} from 'node:child_process';
import {readdirSync,writeFileSync} from 'node:fs';
const files=readdirSync(new URL('.',import.meta.url)).filter(f=>f.endsWith('-tests.mjs')).sort();
const runs=files.map(f=>[f]);runs.push(['elo-ui-presentation.mjs'],['elo-ui-interactions.mjs'],['direct-ui-acceptance.mjs'],['endless-original-generators.mjs'],['endless-original-ui.mjs']);
for(const game of ['light','cut'])for(const state of ['', 'solved'])runs.push(['endless-original-resume.mjs',game,...(state?[state]:[])]);
const results=[];for(const [file,...args]of runs){const start=Date.now();const r=spawnSync(process.execPath,[new URL(file,import.meta.url).pathname,...args],{encoding:'utf8',timeout:120000,maxBuffer:10e6});const result={file,args,passed:r.status===0,status:r.status,signal:r.signal,elapsedMs:Date.now()-start,summary:(r.stdout+r.stderr).trim().split('\n').slice(-20).join('\n')};results.push(result);console.log(result.passed?'PASS':'FAIL',file,...args,result.elapsedMs+'ms');writeFileSync(new URL('./hints-rules-suite-results.json',import.meta.url),JSON.stringify({generatedAt:new Date().toISOString(),passed:results.every(x=>x.passed),runs:results},null,2)+'\n');}
console.log(JSON.stringify({passed:results.filter(x=>x.passed).length,failed:results.filter(x=>!x.passed).map(x=>x.file)}));
process.exitCode=results.every(x=>x.passed)?0:1;
