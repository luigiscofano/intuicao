import test from 'node:test';
import assert from 'node:assert/strict';
import {CATALOG} from '../dist/orbita/catalog.mjs';
import {structuralSignature,canonicalEncounterMatrix,authoredSignature} from '../dist/orbita/diversity.mjs';
function rename(level){
 const l=structuredClone(level),cm=new Map(l.cells.map((c,i)=>[c.id,'house'+(100-i)])),rm=new Map(l.rings.map((r,i)=>[r.id,'ring'+(9-i)]));
 l.cells.reverse().forEach(c=>{c.id=cm.get(c.id);c.x=-c.x;c.y+=100;});
 l.rings.reverse().forEach((r,i)=>{r.id=rm.get(r.id);r.cells=r.cells.map(c=>cm.get(c));r.cells=[...r.cells.slice(2),...r.cells.slice(0,2)].reverse();});
 l.commands.reverse().forEach(c=>{c.turns=c.turns.map(t=>({...t,ring:rm.get(t.ring),delta:-t.delta}));c.requires=c.requires?.map(s=>({...s,cell:cm.get(s.cell)}));});
 l.targets=Object.fromEntries(Object.entries(l.targets??{}).map(([id,t])=>[cm.get(id),t]));
 return l;
}
test('canonical incidence survives reflection, cyclic origin and arbitrary ring/cell renaming',()=>{
 for(const l of CATALOG.filter((_,i)=>i%47===0)){assert.equal(structuralSignature(l),structuralSignature(rename(l)));assert.equal(canonicalEncounterMatrix(l),canonicalEncounterMatrix(rename(l)));assert.equal(authoredSignature(l),authoredSignature(rename(l)));}
});
test('shuffle, symbol and cosmetic metadata do not manufacture structural diversity',()=>{
 const l=structuredClone(CATALOG[200]),original=structuralSignature(l);l.initial={};l.targets={};l.family='different label';l.concepts=['new words'];l.pieceTypes=[];
 assert.equal(structuralSignature(l),original);
});
test('ring lengths and encounter pairing remain structural data',()=>{
 const l=structuredClone(CATALOG[200]),original=structuralSignature(l),r=l.rings[0];l.cells.push({id:'extra'});r.cells.push('extra');assert.notEqual(structuralSignature(l),original);
});

test('full authored signature distinguishes actual target placement, not symbol names or shuffle',()=>{
 const l=structuredClone(CATALOG[200]),original=authoredSignature(l);l.initial={};assert.equal(authoredSignature(l),original);
 l.targets={};assert.notEqual(authoredSignature(l),original);
});
test('sensor-only symbol equivalence does not depend on tied command order',()=>{
 const l={cells:Array.from({length:7},(_,i)=>({id:String(i)})),rings:[{id:'A',cells:['0','1','2','3']},{id:'B',cells:['0','4','5','6']}],targets:{2:'target'},commands:[{id:'x',turns:[{ring:'A',delta:1}],requires:[{cell:'4',type:'red'}]},{id:'y',turns:[{ring:'A',delta:1}],requires:[{cell:'5',type:'blue'}]},{id:'z',turns:[{ring:'B',delta:1}],requires:[{cell:'1',type:'red'}]}]};
 const signature=authoredSignature(l);l.commands.reverse();assert.equal(authoredSignature(l),signature);
});
