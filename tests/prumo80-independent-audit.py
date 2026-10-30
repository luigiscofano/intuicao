"""Independent mathematical certificates and alternative search (SciPy/HiGHS MILP).
Binary x(cell,piece), exact integer moments, mandatory incident cells. A continuous
single-commodity flow from the incident root certifies side connectivity. Excludes
reference assignment to ask whether a distinct full partition exists. Timeout is
inconclusive, never uniqueness. No game solver, shape templates or stored domains.
"""
import json,time,sys,math,hashlib
from pathlib import Path
import numpy as np
from scipy.optimize import milp,Bounds,LinearConstraint
from scipy.sparse import coo_matrix

def neighbors(c,r,w):
 return [v for v in (c-1 if c%w else -1,c+1 if c%w<w-1 else -1,c-w if c>=w else -1,c+w if c<w*(r-1) else -1) if v>=0]
def certify(l,a):
 r,w=l['rows'],l['cols'];n=r*w;k=len(l['supports']);assert len(a)==n and all(type(s)==int and 0<=s<k for s in a)
 pieces=[]
 for s,p in enumerate(l['supports']):
  x,y=p['x2'],p['y2'];assert type(x)==int and type(y)==int and 0<=x<=2*(w-1) and 0<=y<=2*(r-1) and not (x%2 and y%2)
  inc=[(y//2)*w+x//2];
  if x%2:inc+=[inc[0]+1]
  if y%2:inc+=[inc[0]+w]
  cells=[c for c in range(n) if a[c]==s];assert cells and all(a[c]==s for c in inc)
  mx=sum(2*(c%w)-x for c in cells);my=sum(2*(c//w)-y for c in cells);assert mx==my==0
  seen={cells[0]};q=[cells[0]]
  for c in q:
   for v in neighbors(c,r,w):
    if a[v]==s and v not in seen:seen.add(v);q.append(v)
  assert len(seen)==len(cells)
  pieces.append({'support':s,'size':len(cells),'momentX':mx,'momentY':my,'incident':inc,'connected':True})
 return pieces

def alternatives(l,a,seconds):
 r,w=l['rows'],l['cols'];n=r*w;k=len(l['supports']);edges=[(c,d) for c in range(n) for d in neighbors(c,r,w)];e=len(edges);nv=n*k+e*k
 ri=[];ci=[];val=[];lower=[];upper=[]
 def add(terms,lo,hi):
  row=len(lower)
  for col,v in terms:ri.append(row);ci.append(col);val.append(v)
  lower.append(lo);upper.append(hi)
 x=lambda c,s:c*k+s
 f=lambda j,s:n*k+s*e+j
 for c in range(n):add([(x(c,s),1) for s in range(k)],1,1)
 for s,p in enumerate(l['supports']):
  root=(p['y2']//2)*w+p['x2']//2
  inc=[root]+([root+1] if p['x2']%2 else [])+([root+w] if p['y2']%2 else [])
  for c in inc:add([(x(c,s),1)],1,1)
  for axis in [0,1]:add([(x(c,s),2*(c%w if axis==0 else c//w)-p['x2' if axis==0 else 'y2']) for c in range(n)],0,0)
  for j,(c,d) in enumerate(edges):
   add([(f(j,s),1),(x(c,s),-n)],-np.inf,0);add([(f(j,s),1),(x(d,s),-n)],-np.inf,0)
  for c in range(n):
   terms=[(f(j,s),1 if d==c else -1) for j,(b,d) in enumerate(edges) if b==c or d==c]
   if c==root:terms +=[(x(d,s),1) for d in range(n) if d!=root]
   else:terms +=[(x(c,s),-1)]
   add(terms,0,0)
 add([(x(c,a[c]),1) for c in range(n)],-np.inf,n-1)
 matrix=coo_matrix((val,(ri,ci)),shape=(len(lower),nv)).tocsc()
 integ=np.zeros(nv);integ[:n*k]=1;ub=np.full(nv,n,dtype=float);ub[:n*k]=1
 start=time.perf_counter();res=milp(np.zeros(nv),integrality=integ,bounds=Bounds(np.zeros(nv),ub),constraints=LinearConstraint(matrix,lower,upper),options={'time_limit':seconds,'mip_rel_gap':0})
 out={'method':'independent MILP assignment + two integer moments + connectivity flow; excludes reference','status':'unique' if res.status==2 else 'inconclusive','solverStatus':int(res.status),'message':res.message,'seconds':round(time.perf_counter()-start,4),'timeLimitSeconds':seconds,'numerics':'HiGHS floating-point MILP feasibility; mip_rel_gap=0, other tolerances solver defaults. Infeasible is complete-model MILP evidence, not an exported exact-rational proof.'}
 if res.x is not None:
  candidate=[int(np.argmax(res.x[c*k:(c+1)*k])) for c in range(n)]
  try:
   certify(l,candidate);assert candidate!=a;out.update(status='multiple',alternative=candidate)
  except AssertionError:out['candidateRejected']=True
 return out

if __name__=='__main__':
 source=Path(sys.argv[1]);data=json.loads(source.read_text());seconds=float(sys.argv[2]) if len(sys.argv)>2 else 3
 results=[]
 for item in data:
  l=item['level'];a=item['answer'];start=time.perf_counter();pieces=certify(l,a);t=(time.perf_counter()-start)*1000
  result={'id':l['id'],'definitionSha256':hashlib.sha256(json.dumps({'rows':l['rows'],'cols':l['cols'],'supports':l['supports']},sort_keys=True,separators=(',',':')).encode()).hexdigest(),'seed':l.get('seed'),'number':len(results)+1,'rows':l['rows'],'cols':l['cols'],'supports':len(l['supports']),'certificate':{'completePartition':True,'allowedAnchors':True,'unitMass':True,'exactZeroMoments':True,'orthogonalConnectivity':True,'incidentCells':True,'pieces':pieces,'milliseconds':round(t,4)},'uniqueness':alternatives(l,a,seconds)}
  results.append(result);Path('tests/prumo80-independent-validation.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n');print(result['number'],l['id'],result['uniqueness']['status'],flush=True)
