import assert from 'node:assert/strict';
import {generateOriginalEndless,normalizeOriginalOptions} from '../dist/endless-original.mjs';
import {traceLightWorld,traceLightAttempt} from '../dist/light-world.mjs';
import {curvedCut,shapePolygon,shapes,regionGeometry} from '../dist/curves.mjs';
import {cutSuccess} from '../dist/math.mjs';
let light=0,cut=0;
const lightLayouts=new Set(),cutLayouts=new Set();
for(let seed=0;seed<120;seed++)for(let sources=1;sources<=3;sources++)for(let mirrors=1;mirrors<=3;mirrors++)for(const walls of [false,true])for(const portals of [false,true])for(const selective of [false,true]){
 const opts={sources,mirrors,walls,portals,selective},g=generateOriginalEndless('light',seed,opts);
 assert.equal(traceLightWorld(g.answer).status,'target');assert.notEqual(traceLightWorld(g.initial).status,'target');
 assert.equal(g.answer.sources.length,sources);assert.equal(g.answer.objects.filter(o=>o.type==='mirror').length,sources*mirrors);assert.equal(g.answer.objects.filter(o=>o.type==='wall').length,walls?sources:0);assert.equal(g.answer.portals.length,portals?sources*2:0);
 if(selective&&portals)assert.ok(g.answer.portals.every(p=>p.colors.length===1));
 const world=traceLightWorld(g.answer);assert.equal(world.collisions.length,0);assert.ok(world.rays.every(r=>r.bounces===mirrors));if(portals)assert.ok(world.rays.every(r=>r.teleports.length===1));
 for(const order of [Array.from({length:sources},(_,i)=>i),Array.from({length:sources},(_,i)=>sources-1-i)]){let previous;for(let i=0;i<order.length;i++)previous=traceLightAttempt(g.answer,order.slice(0,i+1),{previous});assert.equal(previous.status,'target');}
 if(seed<2)assert.deepEqual(g,generateOriginalEndless('light',seed,opts));
 if(sources===3&&mirrors===3&&walls&&portals&&selective)lightLayouts.add(JSON.stringify(g.answer));light++;
}
for(let seed=0;seed<50;seed++)for(const shape of ['random',...shapes])for(const curves of [false,true])for(const holes of [false,true]){
 const opts={shape,curves,holes},g=generateOriginalEndless('cut',seed,opts),r=curvedCut(shapePolygon(g.answer.shape),g.answer);
 assert.ok(cutSuccess(r.ratio*100,g.answer.target));assert.ok(!cutSuccess(curvedCut(shapePolygon(g.initial.shape),g.initial).ratio*100,g.initial.target));
 assert.ok(g.answer.target>=10&&g.answer.target<=90);assert.equal(g.answer.holes.length,holes?1:0);assert.ok(r.totalArea>0);if(holes)assert.ok(r.removedArea>0);if(!curves)assert.equal(g.answer.family,'Reta');if(shape!=='random')assert.equal(g.answer.shape,shape);
 if(seed===0)assert.deepEqual(g,generateOriginalEndless('cut',seed,opts));if(shape==='random'&&curves&&holes)cutLayouts.add(JSON.stringify(g.answer));cut++;
}
assert.equal(lightLayouts.size,120);assert.equal(cutLayouts.size,50);
assert.deepEqual(normalizeOriginalOptions('light',{sources:999,mirrors:-20}),{sources:3,mirrors:1,walls:true,portals:false,selective:false});
console.log(`PASS ${light} Reflexos + ${cut} Corte seeds/configurations: solutions, individual rays, no collisions, initial challenge, options, repeatability and structural variation.`);

for(const value of [null,[], 'corrupt', 42])for(const game of ['light','cut'])assert.deepEqual(normalizeOriginalOptions(game,value),normalizeOriginalOptions(game,{}));
