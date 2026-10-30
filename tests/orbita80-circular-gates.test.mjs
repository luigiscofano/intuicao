import test from 'node:test';
import assert from 'node:assert/strict';
import {CATALOG} from '../dist/orbita/catalog-legacy1000.mjs';
import {isCircularGeneration,selectCertifiedV2} from '../dist/orbita/endless-v2.mjs';
import {validateOrbitaPresentation} from '../dist/orbita/ui.mjs';
import {validateCircleGeometryV3} from '../dist/orbita/topology-circles-v3.mjs';
import {normalizeLegacyCircleCoordinates} from './orbita80-geometry-repair.mjs';

test('circular guard accepts exact single lessons and optional equal radii',()=>{
 for(const source of CATALOG.slice(0,3)){const l=normalizeLegacyCircleCoordinates(source);delete l.catalogVersion;for(const r of l.rings){delete r.geometry.rx;delete r.geometry.ry;}assert.equal(validateCircleGeometryV3(l).valid,true);assert.equal(isCircularGeneration(l),true);assert.equal(validateOrbitaPresentation(l).valid,true);}
});
test('metadata omission and forged legacy versions never bypass geometry',()=>{
 const source=CATALOG[200];
 const mutations=[
  l=>{l.rings[0].geometry.ry+=1;},
  l=>{l.rings[0].geometry={...l.rings[1].geometry};},
  l=>{l.cells[0].x+=3;},
  l=>{l.rings[0].cells.reverse();},
  l=>{const shared=l.rings[0].cells.find(id=>l.rings[1].cells.includes(id));l.rings[0].cells=l.rings[0].cells.filter(id=>id!==shared);},
 ];
 for(const version of [undefined,1,2,3,4])for(const mutate of mutations){const l=structuredClone(source);if(version===undefined)delete l.catalogVersion;else l.catalogVersion=version;mutate(l);assert.equal(isCircularGeneration(l),false,`circular guard ${version}`);assert.equal(validateOrbitaPresentation(l).valid,false,`presentation guard ${version}`);}
});
test('every internal Endless difficulty retains circular certified reservoir outside campaign80',()=>{
 for(let difficulty=0;difficulty<=4;difficulty++)for(let seed=0;seed<20;seed++){const result=selectCertifiedV2(seed,{difficulty});assert.equal(isCircularGeneration(result.level),true);assert.equal(validateCircleGeometryV3(result.level).valid,true);assert.equal(validateOrbitaPresentation(result.level).valid,true);assert.equal(result.level.generation.source,'certified-reservoir');}
});
test('legacy exact-coordinate repair changes drawing only and rejects corrupt shared topology',()=>{
 const source=CATALOG[10],repaired=normalizeLegacyCircleCoordinates(source);
 assert.equal(validateCircleGeometryV3(repaired).valid,true);
 for(const field of ['initial','targets','commands','solution'])assert.deepEqual(repaired[field],source[field]);
 assert.deepEqual(repaired.rings.map(r=>r.cells),source.rings.map(r=>r.cells));
 assert.throws(()=>normalizeLegacyCircleCoordinates(CATALOG[140]));
});
