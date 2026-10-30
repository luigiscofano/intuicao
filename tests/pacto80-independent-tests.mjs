/** Independent finite-domain proof: no campaign solver, answer key, or node budget. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PACTO_LEVELS} from '../dist/pacto-campaign.mjs';
const SYMBOL_LEVELS={pacto:PACTO_LEVELS};
const levels=SYMBOL_LEVELS.pacto, bits=m=>[0,1,2,3].filter(v=>m&(1<<v)),single=m=>m&&!(m&(m-1));
const neighbors=Array.from({length:64},(_,i)=>[i%8?i-1:-1,i%8<7?i+1:-1,i>7?i-8:-1,i<56?i+8:-1].filter(x=>x>=0));
const lines=[...Array.from({length:8},(_,r)=>Array.from({length:8},(_,c)=>r*8+c)),...Array.from({length:8},(_,c)=>Array.from({length:8},(_,r)=>r*8+c))];
function valid(v){return v.length===64&&v.every(x=>Number.isInteger(x)&&x>=0&&x<4)&&lines.every(l=>[0,1,2,3].every(s=>l.filter(i=>v[i]===s).length===2))&&v.every((s,i)=>neighbors[i].filter(j=>v[j]===s).length===1);}
function propagate(d){let changed=true;while(changed){changed=false;const restrict=(i,m)=>{const x=d[i]&m;if(x!==d[i]){d[i]=x;changed=true;}return !!x;};
 for(const line of lines)for(let mask=1;mask<15;mask++){
  const capacity=bits(mask).length*2,inside=line.filter(i=>(d[i]&~mask)===0),possible=line.filter(i=>d[i]&mask);
  if(inside.length>capacity||possible.length<capacity)return false;
  if(inside.length===capacity)for(const i of line)if(!inside.includes(i)&&!restrict(i,15^mask))return false;
  if(possible.length===capacity)for(const i of possible)if(!restrict(i,mask))return false;
 }
 for(let i=0;i<64;i++){
  // Enumerate all local assignments and retain exactly-one-same support.
  const cells=[i,...neighbors[i]],support=cells.map(()=>0),a=[];
  function local(k){if(k===cells.length){if(a.slice(1).filter(x=>x===a[0]).length===1)for(let j=0;j<a.length;j++)support[j]|=1<<a[j];return;}
   for(const v of bits(d[cells[k]])){a[k]=v;local(k+1);}}
  local(0);for(let j=0;j<cells.length;j++)if(!restrict(cells[j],support[j]))return false;
 }
 }return true;}
function solve(clues){let nodes=0,count=0,first=null;function dfs(d){nodes++;if(!propagate(d))return;let index=-1,n=5;d.forEach((m,i)=>{const k=bits(m).length;if(k>1&&k<n){n=k;index=i;}});if(index<0){const a=d.map(m=>Math.log2(m));assert.ok(valid(a));count++;first??=a;return;}for(const v of bits(d[index])){const next=d.slice();next[index]=1<<v;dfs(next);if(count>1)return;}}dfs(clues.map(v=>v<0?15:1<<v));return {count,nodes,complete:true,first};}
const results=[];assert.equal(levels.length,80);
for(const [i,l] of levels.entries()){
 assert.equal(l.rows,8);assert.equal(l.cols,8);assert.ok(valid(l.solution),l.id+' final rules');assert.ok(l.clues.every((v,j)=>v<0||v===l.solution[j]));
 const proof=solve(l.clues);assert.equal(proof.count,1,l.id+' unique');assert.deepEqual(proof.first,l.solution);
 results.push({number:i+1,id:l.id,solutionCount:proof.count,searchCompleted:proof.complete,nodes:proof.nodes,clues:l.clues.filter(v=>v>=0).length});
 console.log('PASS independent complete search',i+1,l.id,proof.nodes);
}
fs.writeFileSync('tests/pacto80-independent-validation.json',JSON.stringify({method:'Independent finite domains: symbol-subset line capacity + explicitly enumerated orthogonal partner neighborhoods + exhaustive DFS; no budgets and no reference in search',levels:results},null,2)+'\n');
const {solveSymbols,profileSymbols}=await import('../dist/symbol-games.mjs');
const exhausted=solveSymbols(levels[0],levels[0].clues,2,{maxNodes:0});assert.equal(exhausted.complete,false);assert.equal(exhausted.count,0);for(const l of levels)assert.equal(profileSymbols(l).logical,true,l.id+' engine propagation independently checked alongside explanatory trace');console.log('PASS exhausted search reports incomplete; all80 engine propagation solved.');
