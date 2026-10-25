import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {CATALOG} from '../dist/orbita/catalog.mjs';
import {createEngine,replay,validateLevel} from '../dist/orbita/engine.mjs';
import {structuralSignature} from '../dist/orbita/diversity.mjs';
import {orbitaSymbol} from '../dist/orbita/symbols.mjs';
import {validateCircleGeometryV3} from '../dist/orbita/topology-circles-v3.mjs';
const fresh=CATALOG.slice(200),count=xs=>xs.reduce((out,x)=>(out[x]=(out[x]??0)+1,out),{});
const intersections=l=>l.cells.filter(c=>l.rings.filter(r=>r.cells.includes(c.id)).length===2).length;
test('1000 consecutive IDs; first200 semantically unchanged from authorized baseline',()=>{
 assert.deepEqual(CATALOG.map(l=>l.id),Array.from({length:1000},(_,i)=>i+1));
 for(const l of CATALOG)for(const ring of l.rings){assert.equal(ring.geometry.type,'circle');assert.equal(ring.geometry.rx,ring.geometry.ry);}
 assert.equal(createHash('sha256').update(JSON.stringify(CATALOG.slice(0,200))).digest('hex'),'df62b5da5f8ccca4542cccbddc321ffd20a27423eb07be5a2ec59a630264d39f');
});
test('exact ring/intersection quotas and no new single junction',()=>{
 assert.deepEqual(count(fresh.map(l=>l.rings.length)),{2:100,3:240,4:250,5:210});
 assert.deepEqual(count(fresh.map(l=>{const n=intersections(l);return n<=5?n:n<=7?'6–7':n<=10?'8–10':'11–14';})),{'2':100,'3':150,'4':170,'5':150,'6–7':130,'8–10':70,'11–14':30});
 assert.ok(fresh.every(l=>intersections(l)>=2));
 for(const n of [2,3,4,5,8,10,12,14])assert.ok(fresh.some(l=>intersections(l)===n),`Represent ${n}`);
});
test('every campaign solution replays with fixed targets and invertible commands',()=>{
 for(const l of CATALOG){
  assert.equal(validateLevel(l).valid,true,'structure '+l.id);
  const engine=createEngine(l),start=engine.initialState(),targets=JSON.stringify(l.targets);
  assert.equal(engine.isWon(start),false,'unsolved '+l.id);
  assert.equal(replay(l,l.solution).solved,true,'solution '+l.id);
  for(const move of engine.allowedMoves(start)){
   const next=engine.transition(start,move),back=engine.transition(next.state,{command:move.command,direction:-move.direction});
   assert.deepEqual(back.state.occupancy,start.occupancy,'inverse '+l.id);
   assert.equal(engine.validateState(next.state).valid,true,'piece conservation '+l.id);
   assert.equal(JSON.stringify(l.targets),targets,'fixed targets '+l.id);
  }
 }
});
test('new structural duplicates and runs are rejected independently of cosmetics',()=>{
 const signatures=fresh.map(structuralSignature);assert.equal(new Set(signatures).size,800);
 for(let i=3;i<fresh.length;i++)assert.ok(!fresh.slice(i-3,i+1).every(l=>l.family===fresh[i].family),'family run '+fresh[i].id);
 for(const l of fresh){assert.equal(l.validation.minimumProven,false);assert.equal(l.validation.minimum,null);assert.equal(l.validation.complexity.singleCommandSolutionExcluded,true);assert.ok(l.validation.shortSolutionSearch.completeDepth>=3);}
});
test('approved symbols, sparse objectives and evidence do not claim optimum/necessity',()=>{
 for(const l of CATALOG)for(const type of l.pieceTypes)assert.ok(!/^\d+$/.test(orbitaSymbol(l,type.id)),'visible numeric label '+l.id);
 for(const l of fresh){assert.ok(Object.keys(l.targets).length<=12);assert.ok(l.authorship.evidence.permutation.valid);assert.equal(l.authorship.evidence.permutation.solved,true);assert.equal(l.validation.complexity.necessityProven,false);}
});
test('all new rails are perfect circles; more contacts use multiple different rings',()=>{
 for(const l of fresh){const geometry=validateCircleGeometryV3(l);assert.equal(geometry.valid,true,'circle audit '+l.id+': '+geometry.errors.join('; '));assert.equal(l.catalogVersion,3);assert.equal(l.generatorVersion,3);for(const r of l.rings){assert.equal(r.geometry.type,'circle');assert.equal(r.geometry.rx,r.geometry.r);assert.equal(r.geometry.ry,r.geometry.r);assert.equal(r.path,undefined);for(const c of r.cells){const p=l.cells.find(x=>x.id===c);assert.ok(Math.abs(Math.hypot(p.x-r.geometry.cx,p.y-r.geometry.cy)-r.geometry.r)<.02,'house on circle '+l.id);}}
 for(let i=0;i<l.rings.length;i++)for(let j=i+1;j<l.rings.length;j++)assert.ok(l.rings[i].cells.filter(c=>l.rings[j].cells.includes(c)).length<=2,'circle pair bound '+l.id);
 if(intersections(l)>2)assert.ok(l.rings.length>=3);if(l.rings.length===2)assert.equal(intersections(l),2);
 assert.ok(!['braid-three','braid-many','inverted-order','inverted-encounters'].includes(l.family));
 }
 for(const l of CATALOG.slice(800,825))assert.deepEqual(l.specialRules.map(s=>s.kind).sort(),['gear','sensor','step']);
 for(const l of fresh.filter(l=>l.specialRules.some(s=>s.kind==='step')))assert.equal(l.rings.find(r=>r.step===2).cells.length%2,0);
});
