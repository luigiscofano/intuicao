"""FOZ: geração e certificação offline de orientações e trilhas dedutivas."""
from pathlib import Path
from collections import Counter,deque
from itertools import product
import random,json,hashlib,argparse,time
BASE=Path(__file__).resolve().parents[2]

def adjacency(w,h,edges):
 d={i:[] for i in range(w*h)}
 for a,b in edges:d[a].append(b);d[b].append(a)
 return d

def minimum_distance(start,root,domains,blocked=None):
 if start==blocked:return None
 todo=deque([(start,0)]);seen={start}
 while todo:
  u,d=todo.popleft()
  if u==root:return d
  for v in domains.get(u,[]):
   if v!=blocked and v not in seen:seen.add(v);todo.append((v,d+1))
 return None

def propagate(level,domains,events=None):
 n=level['width']*level['height'];root=level['root'];dist={int(k):v for k,v in level['clues'].items()};dist[root]=0
 ds={i:list(v) for i,v in domains.items()}
 def log(rule,u,removed,reason):
  if events is not None:events.append({'rule':rule,'point':u,'removed':removed,'reason':reason})
 while True:
  if any(not v for v in ds.values()):return None
  changed=False
  # O comprimento do ramo já orientado se propaga nos dois sentidos.
  for u,choices in ds.items():
   if len(choices)!=1:continue
   v=choices[0]
   if u in dist and v in dist:
    if dist[u]!=dist[v]+1:return None
   elif u in dist:
    if dist[u]<=0:return None
    dist[v]=dist[u]-1;changed=True
   elif v in dist:
    if dist[v]+1>=n:return None
    dist[u]=dist[v]+1;changed=True
  for u,choices in list(ds.items()):
   for v in choices[:]:
    rule=0;reason=''
    if u in dist and v in dist and dist[u]!=dist[v]+1:
     rule=1;reason=f'distâncias {dist[u]} e {dist[v]} incompatíveis'
    elif u in dist and dist[u]<=0:
     rule=1;reason='somente a foz tem distância zero'
    elif u in dist and v not in dist and dist[u]==1 and v!=root:
     rule=1;reason='um passo só pode alcançar diretamente a foz'
    else:
     # Uma rota não pode regressar ao ponto de partida; a menor distância dá um limite verificável.
     md=minimum_distance(v,root,ds,blocked=u)
     if md is None:
      rule=3;reason='essa saída não alcança a foz sem retornar ao próprio ponto'
     elif u in dist and md+1>dist[u]:
      rule=2;reason=f'a continuação precisa de ao menos {md+1} trechos, mas a pista derivada permite {dist[u]}'
     elif v in dist and dist[v]+1>=n:
      rule=2;reason='o trajeto exigiria repetir um ponto'
    if rule:
     ds[u].remove(v);log(rule,u,[v],reason);changed=True
     if not ds[u]:return None
  if not changed:return ds

def complete_solution(level,ds):
 if any(len(v)!=1 for v in ds.values()):return None
 n=level['width']*level['height'];root=level['root'];arrows=[-1 if i==root else ds[i][0] for i in range(n)];distances=[]
 for i in range(n):
  seen=set();v=i
  while v!=root:
   if v in seen:return None
   seen.add(v);v=arrows[v]
  distances.append(len(seen))
 if any(distances[int(i)]!=d for i,d in level['clues'].items()):return None
 return arrows

def solve(level,limit=2):
 adj=adjacency(level['width'],level['height'],level['channels']);adj.pop(level['root']);found=[];nodes=0
 def visit(domains):
  nonlocal nodes
  nodes+=1
  if len(found)>=limit:return
  ds=propagate(level,domains)
  if ds is None:return
  if all(len(v)==1 for v in ds.values()):
   solution=complete_solution(level,ds)
   if solution is not None:found.append(solution)
   return
  u=min((i for i in ds if len(ds[i])>1),key=lambda i:(len(ds[i]),i not in level['clues']))
  for v in ds[u]:
   branch={i:list(cc) for i,cc in ds.items()};branch[u]=[v];visit(branch)
   if len(found)>=limit:return
 visit(adj)
 return found,nodes

def human_trace(level):
 adj=adjacency(level['width'],level['height'],level['channels']);adj.pop(level['root']);events=[];ds=propagate(level,adj,events);hypotheses=[]
 if ds is None:return None
 while any(len(v)>1 for v in ds.values()):
  changed=False
  for u in sorted(ds,key=lambda i:len(ds[i])):
   if len(ds[u])==1:continue
   for v in ds[u][:]:
    branch={i:list(cc) for i,cc in ds.items()};branch[u]=[v];short=[]
    after=propagate(level,branch,short)
    if after is None and len(short)<=10:
     ds[u].remove(v);events.append({'rule':4,'point':u,'removed':[v],'reason':'hipótese única produz contradição curta','hypothesis_trace':short});hypotheses.append(len(short));ds=propagate(level,ds,events);changed=True;break
   if changed:break
  if not changed:break
  if ds is None:return None
 solution=complete_solution(level,ds)
 metrics={'points':level['width']*level['height'],'channels':len(level['channels']),'clues':len(level['clues']),'initial_choices':sum(map(len,adj.values())),'max_rule':max([0]+[e['rule'] for e in events]),'deduction_events':len(events),'rule_switches':sum(a['rule']!=b['rule'] for a,b in zip(events,events[1:])),'max_contradiction_steps':max([0]+hypotheses),'hypotheses_eliminated':len(hypotheses),'solved_without_search_tree':solution is not None}
 return {'solved':solution is not None,'solution':solution,'trace':events,'metrics':metrics}

def all_edges(w,h):return [(i,j) for i in range(w*h) for j in (i+1,i+w) if j<w*h and (j==i+w or i//w==j//w)]
def construct(rng,w,h,removal_limit=None):
 edges=all_edges(w,h);adj=adjacency(w,h,edges);n=w*h;root=rng.randrange(n);parents={root:-1}
 # Caminhadas com apagamento de laços produzem árvores com ramos e confluências variados.
 while len(parents)<n:
  start=rng.choice([i for i in range(n) if i not in parents]);walk=[start];positions={start:0}
  while walk[-1] not in parents:
   v=rng.choice(adj[walk[-1]])
   if v in positions:
    walk=walk[:positions[v]+1];positions={x:i for i,x in enumerate(walk)}
   else:positions[v]=len(walk);walk.append(v)
  for a,b in zip(walk,walk[1:]):parents[a]=b
 distances={root:0}
 def distance(i):
  if i not in distances:distances[i]=distance(parents[i])+1
  return distances[i]
 for i in range(n):distance(i)
 tree={tuple(sorted((u,v))) for u,v in parents.items() if v!=-1}
 offered=[e for e in edges if e in tree or abs(distances[e[0]]-distances[e[1]])>1 and rng.random()<.85]
 if len(offered)<n+1:return None
 level={'width':w,'height':h,'root':root,'channels':offered,'clues':{str(i):distances[i] for i in range(n) if i!=root},'solution':[parents[i] for i in range(n)]}
 # Retirar pistas exige recertificar, e não é usado sozinho como medida de dificuldade.
 order=[i for i in range(n) if i!=root];rng.shuffle(order)
 removed=0
 for i in order:
  if removal_limit is not None and removed>=removal_limit:break
  old=level['clues'].pop(str(i));solutions,_=solve(level)
  if len(solutions)!=1:level['clues'][str(i)]=old
  else:removed+=1
 return level

def fingerprint(level):
 w,h=level['width'],level['height'];variants=[]
 for swap,sx,sy in product((False,True),(-1,1),(-1,1)):
  points={i:((i//w if swap else i%w)*sx,(i%w if swap else i//w)*sy) for i in range(w*h)}
  minx=min(x for x,y in points.values());miny=min(y for x,y in points.values());ww=h if swap else w;hh=w if swap else h
  trans={i:(y-miny)*ww+x-minx for i,(x,y) in points.items()}
  variants.append((ww,hh,trans[level['root']],tuple(sorted(tuple(sorted((trans[a],trans[b]))) for a,b in level['channels'])),tuple(sorted((trans[int(i)],d) for i,d in level['clues'].items()))))
 return repr(min(variants))

def generate_pool(samples=200,seed=10112026):
 rng=random.Random(seed);pool=[];seen=set();stats=Counter();start=time.time()
 for attempt in range(samples):
  w,h=rng.choice([(3,3),(3,4),(4,3),(4,4),(4,5),(5,4),(5,5)])
  if attempt<90:w,h=rng.choice([(3,3),(3,4),(4,3)])
  level=construct(rng,w,h,attempt//18 if attempt<90 else None)
  if not level:stats['tree_only']+=1;continue
  fp=fingerprint(level)
  if fp in seen:stats['duplicate']+=1;continue
  seen.add(fp);sols,nodes=solve(level);assert len(sols)==1
  trace=human_trace(level)
  if not trace or not trace['solved']:stats['no_short_trace']+=1;continue
  assert sols[0]==level['solution']
  pool.append({**level,**trace,'fingerprint':fp,'generation_attempt':attempt,'solver_nodes':nodes});stats[f"rank_{trace['metrics']['max_rule']}"]+=1
  if len(pool)%20==0:print('pool',len(pool),'attempt',attempt,'stats',dict(stats),'seconds',round(time.time()-start),flush=True)
 return pool,dict(stats)

if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--samples',type=int,default=300);args=parser.parse_args()
 pool,stats=generate_pool(args.samples);path=BASE/'tools/logica/foz-pool.json';path.write_text(json.dumps({'seed':10112026,'stats':stats,'pool':pool},ensure_ascii=False));print('SAVED',len(pool),stats,flush=True)
