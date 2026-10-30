/** Current ELO80 suite. Historical200-level acceptance scripts are retained as history. */
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
const tests=['elo80-regression.mjs','elo80-proof-replay.mjs','elo80-progress-tests.mjs','elo80-preservation-tests.mjs','elo80-campaign-ui-tests.mjs','elo-rules-tests.mjs','elo-v3-independent-tests.mjs','restart-collection-tests.mjs','middle-confirm-tests.mjs','manual-check-tests.mjs','json-import-ui-tests.mjs','nonstop-visible-ui.test.mjs','focused-game-controls.test.mjs'];
const results=[];
for(const file of tests){const began=Date.now(),r=spawnSync(process.execPath,['tests/'+file],{encoding:'utf8',maxBuffer:10e6});results.push({test:file,passed:r.status===0,exitCode:r.status,elapsedMs:Date.now()-began,stdout:r.stdout,stderr:r.stderr});console.log(file,r.status===0?'PASS':'FAIL');}
const passed=results.every(r=>r.passed);fs.writeFileSync('tests/elo80-suite-results.json',JSON.stringify({passed,results},null,2)+'\n');if(!passed)process.exitCode=1;
