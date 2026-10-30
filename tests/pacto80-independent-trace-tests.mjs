/** Check every human deduction against its stated rule using an independent implementation. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PACTO_LEVELS} from '../dist/pacto-campaign.mjs';
const SYMBOL_LEVELS={pacto:PACTO_LEVELS};
import {reason} from './pacto80-reasoning.mjs';
const near=i=>[i%8?i-1:-1,i%8<7?i+1:-1,i>=8?i-8:-1,i<56?i+8:-1].filter(j=>j>=0),lines=[...Array.from({length:8},(_,r)=>Array.from({length:8},(_,c)=>8*r+c)),...Array.from({length:8},(_,c)=>Array.from({length:8},(_,r)=>8*r+c))],vals=m=>[0,1,2,3].filter(v=>m&(1<<v)),bit=v=>1<<v,mask=vs=>vs.reduce((m,v)=>m|bit(v),0);
function isContradiction(d){return d.some(m=>!m)||lines.some(l=>[0,1,2,3].some(v=>l.filter(i=>d[i]===bit(v)).length>2||l.filter(i=>d[i]&bit(v)).length<2))||d.some((m,i)=>vals(m).every(v=>near(i).every(j=>!(d[j]&bit(v)))||near(i).filter(j=>d[j]===bit(v)).length>1))||lines.some(l=>Array.from({length:14},(_,i)=>i+1).some(m=>l.filter(i=>(d[i]&~m)===0).length>vals(m).length*2||l.filter(i=>d[i]&m).length<vals(m).length*2));}
function checkTrace(d,trace){for(const s of trace){assert.deepEqual(vals(d[s.cell]),s.before,'before matches live domains');assert.ok(s.text.length>25&&!/undefined|NaN/.test(s.text));assert.ok(s.premises.every(i=>Number.isInteger(i)&&i>=0&&i<64));const after=mask(s.after);assert.equal(after&~d[s.cell],0);const removed=vals(d[s.cell]&~after);assert.ok(removed.length);
 if(s.kind==='refutation'){assert.equal(s.assumption.cell,s.cell);assert.deepEqual(removed,[s.assumption.value]);const trial=d.slice();trial[s.cell]=bit(s.assumption.value);checkTrace(trial,s.chain);assert.ok(isContradiction(trial),'refutation ends in independently detected concrete contradiction');assert.ok(s.contradiction?.text.length>15);}
 else for(const v of removed){const b=bit(v),i=s.cell;let valid=false;
  if(s.kind==='quota-saturated')valid=lines.filter(l=>l.includes(i)).some(l=>l.filter(j=>d[j]===b).length===2);
  if(s.kind==='quota-remaining')valid=lines.filter(l=>l.includes(i)).some(l=>[0,1,2,3].some(w=>w!==v&&(d[i]&bit(w))&&l.filter(j=>d[j]&bit(w)).length===2));
  if(s.kind==='isolation')valid=near(i).every(j=>!(d[j]&b));
  if(s.kind==='trio')valid=near(i).filter(j=>d[j]===b).length>1;
  if(s.kind==='closed-pair')valid=near(i).some(j=>d[j]===b&&near(j).some(k=>k!==i&&d[k]===b));
  if(s.kind==='mandatory-partner')valid=near(i).some(j=>vals(d[j]).length===1&&d[j]!==b&&(d[i]&d[j])&&near(j).filter(k=>d[k]&d[j]).length===1);
  if(s.kind==='candidate-group')valid=lines.filter(l=>l.includes(i)).some(l=>Array.from({length:14},(_,j)=>j+1).some(m=>{const need=vals(m).length*2,inside=l.filter(j=>(d[j]&~m)===0),possible=l.filter(j=>d[j]&m);return ((m&b)&&!inside.includes(i)&&inside.length===need)||(!(m&b)&&possible.includes(i)&&possible.length===need);}));
  assert.ok(valid,`${s.kind} removal ${v} at ${i}: ${s.text}`);
 }
 d[s.cell]=after;
}return d;}
const out=[];assert.equal(SYMBOL_LEVELS.pacto.length,80);
for(const [i,l] of SYMBOL_LEVELS.pacto.entries()){const r=reason(l),d=l.clues.map(v=>v<0?15:bit(v));assert.ok(r.solved,l.id+' explainable to completion');checkTrace(d,r.trace);assert.deepEqual(d.map(m=>Math.log2(m)),l.solution);out.push({number:i+1,id:l.id,steps:r.trace.length,maxDepth:r.maxDepth,counts:r.counts,refutations:r.trace.filter(s=>s.kind==='refutation').map(s=>({steps:s.chain.length,contradiction:s.contradiction.kind}))});console.log('PASS replay',i+1,l.id);}
fs.writeFileSync('tests/pacto80-independent-trace-validation.json',JSON.stringify({method:'Every elimination replayed and checked against named quota/partner/subset rule; hypothetical chains recursively replayed and independently checked for concrete contradiction',levels:out},null,2)+'\n');
