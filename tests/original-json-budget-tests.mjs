import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
const moduleURL=new URL('../dist/original-json.mjs',import.meta.url).href;
// An external deadline catches the original synchronous hang; a timer inside
// validateOriginalLevel could never interrupt curvedCut's sampling loop.
const result=spawnSync(process.execPath,['--input-type=module','-e',`
 import assert from 'node:assert/strict';
 import {originalJSONExample,validateOriginalLevel} from ${JSON.stringify(moduleURL)};
 let cases=0;const began=performance.now();
 for(const family of ['Seno','Parábola','Cúbica','Dupla curva'])for(const epsilon of [1e-8,1e-6,1e-4,.01]){
  const input=originalJSONExample('cut');input.family=family;
  input.holes=[[{x:170+epsilon,y:0},{x:250,y:0},{x:250,y:460},{x:170+epsilon,y:460}]];
  assert.throws(()=>validateOriginalLevel(input,'cut'),/fino demais|complexo demais/);cases++;
 }
 const budget=originalJSONExample('cut');budget.family='Seno';budget.holes=[[{x:170.05,y:0},{x:250,y:0},{x:250,y:460},{x:170.05,y:460}]];assert.throws(()=>validateOriginalLevel(budget,'cut'),/complexo demais/);cases++;
 // Even a harmless initial zero amplitude must be checked against the freely
 // editable amplitude. The geometry will be rendered synchronously after import.
 const editable=originalJSONExample('cut');editable.family='Seno';editable.amplitude=0;
 editable.holes=[[{x:170.00000001,y:0},{x:250,y:0},{x:250,y:460},{x:170.00000001,y:460}]];
 assert.throws(()=>validateOriginalLevel(editable,'cut'),/fino demais|complexo demais/);cases++;
 // Exact straight-line clipping is unaffected: this is an import guard for the
 // adaptive curve renderer, not a change in how holes or their union are defined.
 const straight=originalJSONExample('cut');straight.holes=editable.holes;delete straight.solutionTravel;
 assert.equal(validateOriginalLevel(straight,'cut').family,'Reta');cases++;
 console.log(JSON.stringify({passed:true,cases,milliseconds:performance.now()-began}));
`],{encoding:'utf8',timeout:3000,maxBuffer:100000});
assert.equal(result.error,undefined,`Curve validation exceeded its subprocess deadline: ${result.error?.message}`);
assert.equal(result.signal,null,`Curve validation was terminated: ${result.signal}`);
assert.equal(result.status,0,result.stderr||result.stdout);
console.log(result.stdout.trim());
