"""Explora núcleos geometricamente entrelaçados e suas extensões conectadas."""
import importlib.util,random,json,time
from pathlib import Path
from collections import Counter
P=Path(__file__).with_name('renovo-generate.py');sp=importlib.util.spec_from_file_location('rg',P);g=importlib.util.module_from_spec(sp);sp.loader.exec_module(g)
rng=random.Random(11032026)
core={1:'B',6:'S',17:'S',18:'B',23:'F',10:'B',20:'F',21:'B',16:'S',14:'S',0:'F',3:'F'}
seeds=[(5,5,core)]
old=json.load(open(g.BASE/'tools/logica/renovo-hard-pool.json'))['pool']
seeds += [(x['width'],x['height'],{int(i):t for i,t in x['pieces'].items()}) for x in old if x['metrics']['max_rule']>=3]

def permute(p,w,h):
 xs=list(range(w));ys=list(range(h));rng.shuffle(xs);rng.shuffle(ys)
 return {ys[i//w]*w+xs[i%w]:t for i,t in p.items()}
def extend(p,w,h,sol):
 # Acrescentar um trio só é aceito depois se a rede de competição permanecer conectada.
 for trial in range(150):
  b=rng.randrange(w*h)
  if b in p:continue
  x,y=g.coord(b,w);s=y*w+rng.randrange(w);f=rng.randrange(h)*w+x
  if rng.random()<.5:s,f=f,s
  if len({s,b,f})<3 or s in p or f in p:continue
  t=(s,b,f)
  if any(g.clash(t,u,w) for u in sol):continue
  q={**p,s:'S',b:'B',f:'F'};cs=g.candidates(q,w,h)
  if all(tuple(u) in cs[u[1]] for u in sol+[t]):return q
 return None
pool=[];seen=set();stats=Counter();start=time.time()
for attempt in range(16000):
 w,h,p=rng.choice(seeds);p=p.copy()
 if rng.random()<.45 and len(p)<24:
  sol,_=g.exact_solutions(p,w,h)
  if sol:
   if rng.random()<.5 and w<9:
    p={(i//w)*(w+1)+i%w:t for i,t in p.items()};sol=[[(i//w)*(w+1)+i%w for i in t] for t in sol[0]];w+=1
   else:sol=sol[0]
   if rng.random()<.5 and h<9:h+=1
   more=extend(p,w,h,sol)
   if more:p=more
 if rng.random()<.8:p=permute(p,w,h)
 else:
  for _ in range(rng.choice([1,1,2])):
   a=rng.choice(list(p));b=rng.randrange(w*h)
   if b not in p:p[b]=p.pop(a)
 fp=g.fingerprint(p,w,h)
 if fp in seen:continue
 seen.add(fp);stats['examined']+=1
 cs=g.candidates(p,w,h)
 if any(not cc for cc in cs.values()):continue
 sols,nodes=g.exact_solutions(p,w,h)
 if len(sols)!=1:stats['ambiguous' if sols else 'impossible']+=1;continue
 human=g.human_trace(p,w,h)
 if not human or not human['solved']:continue
 rank=human['metrics']['max_rule'];stats[f'rank_{rank}']+=1
 if rank<3 or human['metrics']['competition_components']!=1:continue
 item={'width':w,'height':h,'pieces':p,'solution':sols[0],'fingerprint':fp,'generation_attempt':attempt,'solver_nodes':nodes,**human};pool.append(item)
 if len(seeds)<140 and rng.random()<.45:seeds.append((w,h,p.copy()))
 if len(pool)%20==0:print('corepool',len(pool),'attempt',attempt,'stats',dict(stats),'seconds',round(time.time()-start),flush=True)
 if len(pool)>=220:break
out=g.BASE/'tools/logica/renovo-core-pool.json';out.write_text(json.dumps({'seed':11032026,'stats':dict(stats),'pool':pool},ensure_ascii=False));print('SAVED',len(pool),dict(stats),flush=True)
