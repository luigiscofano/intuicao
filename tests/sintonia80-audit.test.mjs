import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {CAMPAIGN,DIFFICULTIES,CHAPTERS} from '../dist/sintonia/campaign.mjs';
import {validateLevel,replay,initialState,transition,isWon} from '../dist/sintonia/engine.mjs';
import {REASONING_FAMILIES,structuralSignature} from '../dist/sintonia/generator.mjs';
import {levelFingerprint} from './sintonia-audit-purpose.mjs';
import {hash,INTRO,ENGINE_HASH} from './sintonia80-audit.mjs';
const report=()=>JSON.parse(readFileSync(new URL('sintonia80-audit.json',import.meta.url),'utf8'));
test('80 campaign levels, exact six tiers, independent animal introductions and mechanics',()=>{
 assert.equal(CAMPAIGN.length,80);assert.equal(CHAPTERS.length,6);assert.deepEqual(DIFFICULTIES,['Básico','Aprendiz','Intermediário','Avançado','Mestre','Modo Sábio']);assert.deepEqual([0,1,2,3,4,5].map(d=>CAMPAIGN.filter(l=>l.difficulty===d).length),[15,15,15,15,15,5]);assert.equal(new Set(CAMPAIGN.map(l=>l.id)).size,80);
 for(const [m,n] of Object.entries(INTRO))assert.equal(CAMPAIGN.find(l=>l.mechanics.includes(m))?.number,n,m);
 assert.equal(CAMPAIGN.find(l=>l.boards.length===3).number,31);assert.equal(CAMPAIGN.find(l=>l.boards.length===4).number,64);assert.equal(CAMPAIGN[70].boards.length,2);
 const known=new Set(['walls']);let largest=2;for(const [i,l]of CAMPAIGN.entries()){assert.equal(l.number,i+1);const unseen=l.mechanics.filter(m=>!known.has(m));assert.ok(unseen.length<=1,`multiple new rules ${l.number}`);if(l.boards.length>largest){assert.equal(unseen.length,0,`animal introduction + rule ${l.number}`);largest=l.boards.length;}l.mechanics.forEach(m=>known.add(m));if(i<15){assert.equal(l.boards.length,2);assert.deepEqual(l.mechanics,['walls']);}}
 for(const d of [3,4,5])assert.ok(CAMPAIGN.some(l=>l.difficulty===d&&l.boards.length===2),`late duo tier ${d}`);
 assert.deepEqual([...new Set(CAMPAIGN.map(l=>l.family))].sort(),[...REASONING_FAMILIES].sort());for(let i=2;i<80;i++)assert.ok(!(CAMPAIGN[i].family===CAMPAIGN[i-1].family&&CAMPAIGN[i].family===CAMPAIGN[i-2].family),`three repeated principal families ending ${i+1}`);
});
test('all current definitions validate and win exactly on final certified command; engine frozen',()=>{
 assert.equal(hash(readFileSync(new URL('../dist/sintonia/engine.mjs',import.meta.url),'utf8')),ENGINE_HASH);
 for(const l of CAMPAIGN){assert.deepEqual(validateLevel(l),{valid:true,errors:[]},l.id);assert.equal(replay(l,l.solution).won,true,l.id);let s=initialState(l);assert.equal(isWon(l,s),false,l.id);for(const [i,d]of l.solution.entries()){const t=transition(l,s,d);assert.ok(t.changed,`${l.id} no-op`);s=t.state;assert.equal(isWon(l,s),i===l.solution.length-1,`${l.id} premature win`);}assert.ok(l.discovery||l.editorial?.discovery);}
 assert.equal(new Set(CAMPAIGN.map(l=>structuralSignature(l))).size,80);
});
test('fresh independent evidence bound to exact 80 maps and certificates',()=>{
 const r=report();assert.equal(r.levels.length,80);assert.equal(r.summary.certified,80);assert.equal(r.engineHash,ENGINE_HASH);assert.equal(r.humanPlaytested,false);assert.equal(r.campaignHash,hash(readFileSync(new URL('../dist/sintonia/campaign.mjs',import.meta.url),'utf8')));
 CAMPAIGN.forEach((l,i)=>{const a=r.levels[i];assert.equal(a.fingerprint,levelFingerprint(l));assert.deepEqual(a.certifiedSequence,l.solution);assert.equal(a.panels.length,l.boards.length);assert.ok(a.origin);assert.ok(a.discovery);assert.equal(a.witness.won,true);for(const box of a.witness.boxes){assert.ok(a.ablations.some(q=>q.id===`remove-box:${box.id}`));assert.ok(a.avoidance.some(q=>q.id===`box-turn:${box.id}`));}for(const q of a.avoidance){assert.equal(q.conclusion,q.result.status==='unsolvable'?'necessary-under-exact-predicate':q.result.status==='solved'?'counterexample-refutes-necessity':'inconclusive');if(q.result.status==='unsolvable')assert.equal(q.result.exhaustive,true);} });
});
test('final synthesis includes release, recipient reorientation and all four final responsibilities',()=>{
 const r=report();assert.ok(r.levels[76].witness.boxes.some(b=>b.plateReleases.some(e=>e.afterGateSupport)),'77 releases support');assert.equal(CAMPAIGN[78].boards.length,3);assert.equal(CAMPAIGN[79].boards.length,4);for(const n of [79,80]){const a=r.levels[n-1];assert.ok(a.witness.boxes.some(b=>b.deliveries.length&&b.postDeliveryPushes.length>1));for(const q of a.avoidance.filter(q=>/^(receiver-turn|mechanic:delivery)/.test(q.id)))assert.equal(q.result.status,'unsolvable',`${n} ${q.id}`);}for(let b=0;b<4;b++)assert.equal(r.levels[79].avoidance.find(q=>q.id===`remote-condition:${b}`)?.result.status,'unsolvable',`80 panel ${b}`);
});
test('objects have scoped necessity and no non-intro trivial repeat/sweep certificate',()=>{
 const r=report();for(const a of r.levels){if(a.number>1){assert.equal(a.antiShortcut.sweeps.status,'complete',`${a.number} unresolved sweep`);assert.equal(a.antiShortcut.sweeps.solves,false,`${a.number} trivial sweep`);assert.deepEqual(a.antiShortcut.singleDirection.winningDirections,[],`${a.number} repeated direction`);assert.deepEqual(a.antiShortcut.shortCycles.winningPatterns,[],`${a.number} short cycles`);}for(const b of a.witness.boxes){assert.equal(a.ablations.find(q=>q.id===`remove-box:${b.id}`)?.result.status,'unsolvable',`${a.number} box unnecessary`);if(a.number!==34)assert.equal(a.avoidance.find(q=>q.id===`box-turn:${b.id}`)?.result.status,'unsolvable',`${a.number} no meaningful reorientation`);}assert.ok(a.objectRoles.perObject);}
});
