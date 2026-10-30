import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const cases=[['--test','tests/sintonia-engine.test.mjs','tests/sintonia-engine-analysis.test.mjs','tests/sintonia-purpose.test.mjs','tests/sintonia-service.test.mjs','tests/sintonia-ui-state.test.mjs'],['tests/sintonia80-preservation.mjs'],['--test','tests/sintonia80-audit.test.mjs'],['tests/sintonia80-ui.mjs'],['tests/sintonia80-migration.mjs'],['tests/sintonia-animal-roster-ui.test.mjs'],['tests/nonstop-visible-ui.test.mjs'],['tests/elo80-progress-tests.mjs'],['tests/prumo80-progress-tests.mjs'],['tests/pacto80-progress-tests.mjs']];
const results=[];
for(const args of cases){const start=Date.now();const r=spawnSync(process.execPath,args,{encoding:'utf8',maxBuffer:30e6});const result={command:['node',...args],passed:r.status===0,exitCode:r.status,durationMs:Date.now()-start,output:r.stdout+r.stderr};results.push(result);console.log(`${result.passed?'PASS':'FAIL'} ${args.join(' ')}`);}
fs.writeFileSync('tests/sintonia80-suite-results.json',JSON.stringify({passed:results.every(x=>x.passed),results},null,2));if(results.some(x=>!x.passed))process.exitCode=1;
