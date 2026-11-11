"""Busca estrutural por mutação; não modifica as regras de RENOVO."""
import importlib.util,random,math,json,time
from pathlib import Path
from collections import Counter
P=Path(__file__).with_name('renovo-generate.py');spec=importlib.util.spec_from_file_location('rg',P);g=importlib.util.module_from_spec(spec);spec.loader.exec_module(g)
rng=random.Random(90261110)
# A busca por mutação conserva o modelo preliminar sem segmentos obrigatórios.
# A curadoria recertifica tudo com o modelo completo, sem depender deste escore.
def quality(p,w,h):
 ds=g.candidates(p,w,h);score=0
 for b,cc in ds.items():score+= 10*min(2,len(cc))-24*(not cc)+min(4,len(cc))*.2
 for e,t in p.items():
  if t=='B':continue
  slot=0 if t=='S' else 2
  owners=sum(any(c[slot]==e for c in cc) for cc in ds.values())
  score+=6*min(2,owners)-20*(not owners)
 
 if all(ds.values()):
  human=g.human_trace(p,w,h,allow_contradiction=False,allow_mandatory=False)
  if human is None:score-=250
  elif not human['solved']:score+=200
  else:score+=30*max(0,human['metrics']['max_rule']-1)+2*human['metrics']['rule_switches']
 return score,ds
pool=[];seen=set();stats=Counter();start=time.time()
for run in range(10000):
 w=rng.choice([5,6,7,8,9]);h=rng.choice([5,6,7,8,9]);k=rng.choice([4,5,6,7,8])
 layout=g.make_layout(rng,w,h,k)
 if not layout:continue
 p=layout[0];score,ds=quality(p,w,h)
 for step in range(250):
  q=p.copy()
  if rng.random()<.35:
   a,b=rng.sample(list(q),2);q[a],q[b]=q[b],q[a]
  else:
   a=rng.choice(list(q));b=rng.randrange(w*h)
   if b in q:continue
   q[b]=q.pop(a)
  qs,qd=quality(q,w,h);temp=max(.15,6*(1-step/250))
  if qs>=score or rng.random()<math.exp((qs-score)/temp):p,score,ds=q,qs,qd
  if any(not cc for cc in ds.values()):continue
  # Testar somente candidatos sem um botão trivial, ou em intervalos de exploração.
  if min(map(len,ds.values()))<2 and step%30:continue
  fp=g.fingerprint(p,w,h)
  if fp in seen:continue
  seen.add(fp);stats['examined']+=1
  sols,nodes=g.exact_solutions(p,w,h)
  if len(sols)!=1:stats['unsat' if not sols else 'ambiguous']+=1;continue
  human=g.human_trace(p,w,h,allow_mandatory=False)
  if not human or not human['solved']:stats['needs_long_search']+=1;continue
  rank=human['metrics']['max_rule'];stats[f'rank_{rank}']+=1
  if rank>=2:
   pool.append({'width':w,'height':h,'pieces':p.copy(),'solution':sols[0],'fingerprint':fp,'generation_run':run,'generation_step':step,'solver_nodes':nodes,**human})
   if len(pool)%20==0:print('hardpool',len(pool),'run',run,'stats',dict(stats),'seconds',round(time.time()-start),flush=True)
 if run%100==0:print('run',run,'pool',len(pool),'stats',dict(stats),'seconds',round(time.time()-start),flush=True)
 if sum(v['metrics']['max_rule']>=3 for v in pool)>=90:break
out=g.BASE/'tools/logica/renovo-hard-pool.json';out.write_text(json.dumps({'seed':90261110,'stats':dict(stats),'pool':pool},ensure_ascii=False))
print('SAVED',len(pool),dict(stats),flush=True)
