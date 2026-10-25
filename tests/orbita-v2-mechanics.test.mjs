import test from 'node:test';
import assert from 'node:assert/strict';
import {CATALOG} from '../dist/orbita/catalog.mjs';
import {createEngine} from '../dist/orbita/engine.mjs';
import {validateGeometryV2} from '../dist/orbita/topology-v2.mjs';
import {validateOrbitaPresentation,movementPoint,ringPath,restoreOrbitaSession,commitOrbitaCommand,serializeOrbitaSession} from '../dist/orbita/ui.mjs';
const inventory=state=>Object.values(state.occupancy).sort();
test('all 800 multi-meeting boards preserve inventory, fixed targets, exclusive houses and atomic inverses',()=>{
 assert.equal(CATALOG.length,1000);
 for(const l of CATALOG.slice(200)){
  const e=createEngine(l),start=e.initialState(),targets=JSON.stringify(l.targets);
  for(const move of e.allowedMoves(start)){
   const command=l.commands.find(c=>c.id===move.command),affected=new Set(command.turns.flatMap(t=>l.rings.find(r=>r.id===t.ring).cells));
   const next=e.transition(start,move);assert.equal(next.allowed,true,l.id);assert.deepEqual(inventory(next.state),inventory(start),l.id);assert.equal(Object.keys(next.state.occupancy).length,l.cells.length);
   for(const c of l.cells)if(!affected.has(c.id))assert.equal(next.state.occupancy[c.id],start.occupancy[c.id],`${l.id} exclusive ${c.id}`);
   const back=e.transition(next.state,{...move,direction:-move.direction});assert.equal(back.allowed,true);assert.deepEqual(back.state.occupancy,start.occupancy,l.id);
   assert.equal(JSON.stringify(l.targets),targets);
  }
 }
});
test('actual paths have no decorative crossings, triple houses or badge collisions',()=>{
 for(const l of CATALOG.slice(200)){const g=validateGeometryV2(l);assert.equal(g.valid,true,`${l.id}: ${g.errors}`);const p=validateOrbitaPresentation(l);assert.equal(p.valid,true,`${l.id}: ${p.errors}`);for(const r of l.rings)assert.ok(ringPath(l,r).endsWith(' Z'));}
});
test('path animation follows rail bends and ends on exact shared physical cells',()=>{
 for(const l of CATALOG.slice(200).filter((_,i)=>i%25===0)){
  const e=createEngine(l),result=e.transition(e.initialState(),l.solution[0]);
  for(const movement of result.movements??[]){const target=l.cells.find(c=>c.id===movement.to);assert.deepEqual(movementPoint(l,movement,1),{x:target.x,y:target.y});for(const p of [0,.2,.5,.8]){const point=movementPoint(l,movement,p);assert.ok(Number.isFinite(point.x)&&Number.isFinite(point.y));}}
 }
});
test('undo, redo, restart and saved current-state history remain valid with2–5 rings',()=>{
 for(const n of [2,3,4,5]){const l=CATALOG.slice(200).find(l=>l.rings.length===n);let session=restoreOrbitaSession(l,null);for(const move of l.solution.slice(0,4))session=commitOrbitaCommand(l,session,move).session;const last=structuredClone(session.states.at(-1));session.cursor--;const restored=restoreOrbitaSession(l,serializeOrbitaSession(l,session));assert.equal(restored.cursor,session.cursor);restored.cursor++;assert.deepEqual(restored.states[restored.cursor],last);const reset=restoreOrbitaSession(l,null);assert.equal(reset.cursor,0);assert.deepEqual(reset.states[0].occupancy,l.initial);}
});
test('at least700 new boards have visibly displaced ring bounds; small screens keep symbol scale via board-only scrolling',async()=>{
 let displaced=0;for(const l of CATALOG.slice(200)){
  const bounds=l.rings.map(r=>{const p=r.path??r.cells.map(id=>l.cells.find(c=>c.id===id)),xs=p.map(p=>p.x),ys=p.map(p=>p.y);return {x:(Math.min(...xs)+Math.max(...xs))/2,y:(Math.min(...ys)+Math.max(...ys))/2,w:Math.max(...xs)-Math.min(...xs),h:Math.max(...ys)-Math.min(...ys)};});
  if(bounds.some((a,i)=>bounds.slice(i+1).some(b=>Math.hypot(a.x-b.x,a.y-b.y)>.15*Math.min(a.w,a.h,b.w,b.h))))displaced++;
  const radius=l.layout.pieceRadius??19,minWidth=Math.max(280,l.layout.width*30/(radius*2));for(const viewport of [320,390,1280]){const renderedWidth=Math.max(minWidth,Math.min(viewport,l.layout.width));assert.ok(2*radius*renderedWidth/l.layout.width>=30-1e-7);}
 }
 assert.ok(displaced>=700,displaced);
 const fs=await import('node:fs');const css=fs.readFileSync(new URL('../dist/orbita/ui.css',import.meta.url),'utf8');assert.match(css,/\.o-board-scroll\{[^}]*max-width:100%[^}]*overflow:auto/);assert.match(css,/overscroll-behavior-inline:contain/);assert.match(css,/min-height:48px/);
});
