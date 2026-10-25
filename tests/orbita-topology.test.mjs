import test from 'node:test';
import assert from 'node:assert/strict';
import {makeTopology,exampleTopology,FAMILIES} from '../dist/orbita/topology.mjs';

const TAU=2*Math.PI,EPS=.012;
const angle=(p,g)=>(Math.atan2(p.y-g.cy,p.x-g.cx)+TAU)%TAU;

// Drawing audit independent of the topology builder. It checks the complete
// circles, not only successive sampled cells, so a decorative crossing cannot
// accidentally pass as two unrelated physical positions.
export function auditDrawing(level){
  const cells=new Map(level.cells.map(c=>[c.id,c])), memberships=new Map(level.cells.map(c=>[c.id,[]]));
  assert.equal(cells.size,level.cells.length);
  for(const ring of level.rings){
    const g=ring.geometry;
    assert.ok(g&&g.type==='circle'&&g.r>0,`${level.family}/${ring.id}: círculo explícito`);
    let rotation=0;
    for(let i=0;i<ring.cells.length;i++){
      const p=cells.get(ring.cells[i]),q=cells.get(ring.cells[(i+1)%ring.cells.length]);
      assert.ok(p&&q);
      assert.ok(Math.abs(Math.hypot(p.x-g.cx,p.y-g.cy)-g.r)<EPS,`${level.family}/${ring.id}: casa fora do trilho`);
      const delta=(angle(q,g)-angle(p,g)+TAU)%TAU;
      assert.ok(delta>0&&delta<TAU);
      rotation+=delta;memberships.get(p.id).push(ring.id);
      assert.ok(p.x>=20&&p.y>=20&&p.x<=level.layout.width-20&&p.y<=level.layout.height-20,'margem das fichas');
    }
    assert.ok(Math.abs(rotation-TAU)<1e-8,`${level.family}/${ring.id}: ordem precisa completar uma volta horária`);
  }
  for(const owners of memberships.values())assert.ok(owners.length>=1&&owners.length<=2,'uma posição física, no máximo dois anéis');
  for(let i=0;i<level.cells.length;i++)for(let j=i+1;j<level.cells.length;j++){
    const a=level.cells[i],b=level.cells[j];
    assert.ok(Math.hypot(a.x-b.x,a.y-b.y)>70,`${level.family}: fichas próximas demais`);
  }
  for(let i=0;i<level.rings.length;i++)for(let j=i+1;j<level.rings.length;j++){
    const a=level.rings[i],b=level.rings[j],ga=a.geometry,gb=b.geometry;
    const common=a.cells.filter(id=>b.cells.includes(id));
    assert.ok(common.length<=2);
    const d=Math.hypot(ga.cx-gb.cx,ga.cy-gb.cy),sum=ga.r+gb.r,difference=Math.abs(ga.r-gb.r);
    assert.ok(d>EPS||Math.abs(ga.r-gb.r)>EPS,'círculos coincidentes proibidos');
    let expected=0;
    if(d<=sum+EPS&&d>=difference-EPS&&d>EPS)expected=Math.abs(d-sum)<EPS||Math.abs(d-difference)<EPS?1:2;
    assert.equal(common.length,expected,`${level.family}/${a.id}/${b.id}: todo encontro visual deve ser compartilhado`);
    for(const id of common){const p=cells.get(id);assert.ok(Math.abs(Math.hypot(p.x-gb.cx,p.y-gb.cy)-gb.r)<EPS);}
  }
  return true;
}

test('a geometria preserva ordem horária, casas físicas, conexões e margens em todas as famílias',()=>{
  for(const family of Object.keys(FAMILIES))for(let variant=0;variant<36;variant++)auditDrawing(makeTopology(family,variant));
});

test('o exemplo obrigatório é desenhado com sete casas e exatamente uma conexão',()=>{
  const level=exampleTopology();
  auditDrawing(level);
  assert.equal(level.cells.length,7);
  assert.deepEqual(level.rings[0].cells,['J','Abaixo','Aesquerda','Atopo']);
  assert.deepEqual(level.rings[1].cells,['J','Btopo','Bdireita','Bbaixo']);
});
