"""Gerador e certificador reproduzível de RENOVO (somente biblioteca padrão).

Cada solução é uma cobertura de trios geométricos. A busca certifica unicidade;
a trilha humana usa parceiro único, reservas e contradições de uma escolha.
"""
from pathlib import Path
from itertools import combinations,product
from collections import Counter
import random,json,hashlib,argparse,time
BASE=Path(__file__).resolve().parents[2]

def coord(i,w):return (i%w,i//w)
def visible(i,p,w,h):
 out=[];x,y=coord(i,w)
 for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
  xx,yy=x+dx,y+dy
  while 0<=xx<w and 0<=yy<h:
   j=yy*w+xx
   if j in p:out.append(j);break
   xx+=dx;yy+=dy
 return out

def intersection(e,f,w):
 a,b=[coord(x,w) for x in e];c,d=[coord(x,w) for x in f]
 if a[1]==b[1] and c[1]==d[1]:return a[1]==c[1] and max(min(a[0],b[0]),min(c[0],d[0]))<=min(max(a[0],b[0]),max(c[0],d[0]))
 if a[0]==b[0] and c[0]==d[0]:return a[0]==c[0] and max(min(a[1],b[1]),min(c[1],d[1]))<=min(max(a[1],b[1]),max(c[1],d[1]))
 if a[1]!=b[1]:return intersection(f,e,w)
 return min(a[0],b[0])<=c[0]<=max(a[0],b[0]) and min(c[1],d[1])<=a[1]<=max(c[1],d[1])

def clash(t,u,w):
 if t[0]==u[0] or t[2]==u[2]:return True
 return any(intersection(e,f,w) for e in ((t[0],t[1]),(t[1],t[2])) for f in ((u[0],u[1]),(u[1],u[2])))

def candidates(p,w,h):
 d={}
 for b,kind in p.items():
  if kind!='B':continue
  v=visible(b,p,w,h)
  d[b]=[(s,b,f) for s in v if p[s]=='S' for f in v if p[f]=='F' and (s//w==b//w)!=(f//w==b//w)]
 return d

def exact_solutions(p,w,h,limit=2):
 domains=candidates(p,w,h);found=[];nodes=0
 def visit(ds,chosen):
  nonlocal nodes
  nodes+=1
  if len(found)>=limit:return
  if any(not v for v in ds.values()):return
  if not ds:found.append(chosen);return
  b=min(ds,key=lambda x:len(ds[x]))
  for t in ds[b]:
   rest={a:[u for u in cc if not clash(t,u,w)] for a,cc in ds.items() if a!=b}
   visit(rest,chosen+[t])
 visit(domains,[])
 return found,nodes

def human_trace(p,w,h,allow_contradiction=True,allow_mandatory=True):
 initial=candidates(p,w,h);trace=[];contradiction_sizes=[]
 def propagate(domains,events,reservations=True):
  ds={b:list(v) for b,v in domains.items()}
  def reduce(b,keep,rule,reason):
   before=ds[b];after=[t for t in before if keep(t)]
   if after==before:return False
   ds[b]=after;events.append({'rule':rule,'bud':b,'removed':[list(t) for t in before if t not in after],'reason':reason})
   return True
  while True:
   if any(not v for v in ds.values()):return None
   changed=False
   for b,cc in list(ds.items()):
    if len(cc)!=1:continue
    t=cc[0]
    for a in ds:
     if a!=b and reduce(a,lambda u:not clash(t,u,w),1,f'trio obrigatório em {b}'):
      changed=True
      if not ds[a]:return None
   if changed:continue
   for endpoint,kind in p.items():
    if kind=='B':continue
    at=0 if kind=='S' else 2
    owners=[b for b,cc in ds.items() if any(t[at]==endpoint for t in cc)]
    if not owners:return None
    if len(owners)==1 and reduce(owners[0],lambda t:t[at]==endpoint,2,f'{kind} {endpoint} tem um único botão possível'):changed=True
   if changed:continue
   # Um segmento presente em todas as alternativas já é obrigatório, mesmo sem trio fechado.
   for b,cc in (list(ds.items()) if allow_mandatory else []):
    common=set((tuple(sorted((cc[0][0],b))),tuple(sorted((b,cc[0][2])))))
    for t in cc[1:]:common &= {tuple(sorted((t[0],b))),tuple(sorted((b,t[2])))}
    for segment in common:
     for a in ds:
      if a!=b and reduce(a,lambda t:not any(intersection(segment,e,w) for e in ((t[0],t[1]),(t[1],t[2]))),3,f'segmento obrigatório {segment} do botão {b}'):
       changed=True
       if not ds[a]:return None
   if changed:continue
   if reservations:
    for k in (2,3):
     for subset in combinations(ds,k):
      for at,kind in ((0,'sementes'),(2,'folhas')):
       pool={t[at] for b in subset for t in ds[b]}
       if len(pool)<k:return None
       if len(pool)==k:
        for b in ds:
         if b not in subset and reduce(b,lambda t:t[at] not in pool,3 if k==2 else 4,f'{k} botões reservam {k} {kind}'):changed=True
      if changed:break
     if changed:break
   if not changed:return ds
 ds=propagate(initial,trace)
 if ds is None:return None
 while any(len(cc)>1 for cc in ds.values()) and allow_contradiction:
  deduction=False
  for b in sorted(ds,key=lambda x:len(ds[x])):
   if len(ds[b])==1:continue
   for t in list(ds[b]):
    branch={a:list(v) for a,v in ds.items()};branch[b]=[t];events=[]
    result=propagate(branch,events)
    # Não aceitar árvores de hipóteses: uma escolha e no máximo oito eliminações.
    if result is None and len(events)<=8:
     ds[b].remove(t);trace.append({'rule':5,'bud':b,'removed':[list(t)],'reason':'hipótese única produz contradição curta','hypothesis_trace':events})
     contradiction_sizes.append(len(events));ds=propagate(ds,trace);deduction=True;break
   if deduction:break
  if not deduction:break
  if ds is None:return None
 solved=all(len(v)==1 for v in ds.values())
 # O diâmetro da rede de competição mede dependência entre botões, não área da grade.
 buds=list(initial);graph={b:set() for b in buds}
 for a,b in combinations(buds,2):
  if any(clash(t,u,w) for t in initial[a] for u in initial[b]):graph[a].add(b);graph[b].add(a)
 components=0;seen=set();diameter=0
 for b in buds:
  if b not in seen:
   components+=1;todo=[b];seen.add(b)
   while todo:
    u=todo.pop()
    for v in graph[u]-seen:seen.add(v);todo.append(v)
  d={b:0};todo=[b]
  while todo:
   u=todo.pop(0)
   for v in graph[u]:
    if v not in d:d[v]=d[u]+1;todo.append(v)
  diameter=max(diameter,max(d.values()))
 metrics={'trios':len(buds),'initial_candidates':sum(map(len,initial.values())),'initial_ambiguous_buds':sum(len(v)>1 for v in initial.values()),'max_rule':max([0]+[e['rule'] for e in trace]),'deduction_events':len(trace),'removed_candidates':sum(len(e['removed']) for e in trace),'rule_switches':sum(a['rule']!=b['rule'] for a,b in zip(trace,trace[1:])),'competition_components':components,'competition_diameter':diameter,'max_contradiction_steps':max([0]+contradiction_sizes),'solved_without_search_tree':solved}
 return {'solved':solved,'solution':[list(cc[0]) for cc in ds.values()] if solved else None,'metrics':metrics,'trace':trace}

def make_layout(rng,w,h,k):
 pieces={};trios=[]
 for _ in range(k):
  success=False
  for attempt in range(110):
   b=rng.randrange(w*h)
   if b in pieces:continue
   x,y=coord(b,w);horizontal=[y*w+xx for xx in range(w) if xx!=x];vertical=[yy*w+x for yy in range(h) if yy!=y]
   s=rng.choice(horizontal);f=rng.choice(vertical)
   if rng.random()<.5:s,f=f,s
   if s in pieces or f in pieces:continue
   trial=(s,b,f)
   if any(clash(trial,t,w) for t in trios):continue
   combined={**pieces,s:'S',b:'B',f:'F'}
   cs=candidates(combined,w,h)
   if any(t not in cs.get(t[1],[]) for t in trios+[trial]):continue
   pieces=combined;trios.append(trial);success=True;break
  if not success:return None
 return pieces,trios

def fingerprint(p,w,h):
 # Ignora deslocamento, rotação, espelho, troca global S/F e mero espaçamento vazio.
 coords=[(*coord(i,w),kind) for i,kind in p.items()];variants=[]
 for swap_axes,sx,sy,swap_ends in product((False,True),(-1,1),(-1,1),(False,True)):
  pts=[((y if swap_axes else x)*sx,(x if swap_axes else y)*sy, {'S':'F','F':'S'}.get(t,t) if swap_ends else t) for x,y,t in coords]
  xs={x:i for i,x in enumerate(sorted({q[0] for q in pts}))};ys={y:i for i,y in enumerate(sorted({q[1] for q in pts}))}
  variants.append(tuple(sorted((xs[x],ys[y],t) for x,y,t in pts)))
 return repr(min(variants))

def generate_pool(samples=3000,seed=11102026):
 rng=random.Random(seed);pool=[];seen=set();stats=Counter();started=time.time()
 for attempt in range(samples):
  k=rng.choice([3,4,4,5,5,6,7,8]);w=rng.choice([5,6,7,8]);h=rng.choice([5,6,7,8])
  if k>5 and min(w,h)<6:continue
  got=make_layout(rng,w,h,k)
  if not got:stats['placement_fail']+=1;continue
  p,constructed=got;fp=fingerprint(p,w,h)
  if fp in seen:stats['duplicate']+=1;continue
  seen.add(fp)
  ds=candidates(p,w,h)
  if sum(map(len,ds.values()))<k+1:stats['trivial']+=1;continue
  sols,nodes=exact_solutions(p,w,h)
  if len(sols)!=1:stats['not_unique']+=1;continue
  human=human_trace(p,w,h)
  if not human or not human['solved']:stats['no_short_trace']+=1;continue
  if human['metrics']['competition_components']>1 and k>=4:stats['disconnected_competition']+=1;continue
  item={'width':w,'height':h,'pieces':p,'solution':sols[0],'fingerprint':fp,'generation_attempt':attempt,'solver_nodes':nodes,**human}
  pool.append(item);stats[f"rank_{human['metrics']['max_rule']}"]+=1
  if len(pool)%50==0:print('pool',len(pool),'attempt',attempt,'stats',dict(stats),'seconds',round(time.time()-started),flush=True)
 return pool,dict(stats)

if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--samples',type=int,default=3000);args=parser.parse_args()
 pool,stats=generate_pool(args.samples)
 path=BASE/'tools/logica/renovo-pool.json';path.write_text(json.dumps({'seed':11102026,'stats':stats,'pool':pool},ensure_ascii=False))
 print('SAVED',len(pool),stats,path,flush=True)
