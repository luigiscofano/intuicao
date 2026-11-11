"""Oculta o segmento obrigatório por reservas reais de parceiros, sem novas regras."""
import importlib.util,random,json,re,time,argparse
from pathlib import Path
from collections import Counter
P=Path(__file__).with_name('renovo-generate.py');sp=importlib.util.spec_from_file_location('g',P);g=importlib.util.module_from_spec(sp);sp.loader.exec_module(g)
parser=argparse.ArgumentParser();parser.add_argument('--target',type=int,default=200);args=parser.parse_args()
rng=random.Random(11042026)
seeds=json.load(open(g.BASE/'tools/logica/renovo-core-pool.json'))['pool']

def conditional_steps(p,w,h,trace):
 cs=g.candidates(p,w,h);result=[]
 for e in trace:
  if not e['reason'].startswith('segmento'):continue
  a,b,bud=map(int,re.findall(r'\d+',e['reason']))
  if not all(a in t and b in t for t in cs[bud]):result.append(e)
 return result

def add_mask(p,w,h,sol,preferred=None):
 # Bordas novas dão lugar a parceiros concorrentes, não contam como nova fase isoladamente.
 if w<11 and h<11 and rng.random()<.65:
  neww=w+2;p={(i//w+1)*neww+i%w+1:t for i,t in p.items()};sol=[tuple((i//w+1)*neww+i%w+1 for i in t) for t in sol];w+=2;h+=2
 choices=list(sol);rng.shuffle(choices)
 if preferred:
  choices.sort(key=lambda t:t[1] not in preferred)
 for old_s,old_b,old_f in choices:
  bx,by=g.coord(old_b,w);sx,sy=g.coord(old_s,w)
  if sx==bx:dirs=[(0,1 if sy<by else -1)]
  else:dirs=[(1 if sx<bx else -1,0)]
  for dx,dy in dirs:
   for distance in (1,2,3):
    xx,yy=bx+dx*distance,by+dy*distance
    if not(0<=xx<w and 0<=yy<h):break
    s=yy*w+xx
    if s in p:break
    for _ in range(70):
     # O novo botão precisa usar essa semente em outro eixo para caber sem sobreposição.
     if rng.random()<.5:b=yy*w+rng.randrange(w)
     else:b=rng.randrange(h)*w+xx
     if b==s or b in p:continue
     bxx,byy=g.coord(b,w)
     f=rng.randrange(h)*w+bxx if byy==yy else byy*w+rng.randrange(w)
     if f in p or len({s,b,f})<3:continue
     t=(s,b,f)
     if any(g.clash(t,u,w) for u in sol):continue
     q={**p,s:'S',b:'B',f:'F'};cs=g.candidates(q,w,h)
     if not all(tuple(u) in cs[u[1]] for u in sol+[t]):continue
     sols,nodes=g.exact_solutions(q,w,h)
     if len(sols)!=1:continue
     human=g.human_trace(q,w,h)
     if not human or not human['solved'] or not conditional_steps(q,w,h,human['trace']):continue
     if human['metrics']['competition_components']!=1:continue
     return {'width':w,'height':h,'pieces':q,'solution':sols[0],'solver_nodes':nodes,**human}
 return None
pool=[];seen=set();stats=Counter();start=time.time()
for attempt in range(8000):
 item=rng.choice(seeds if len(pool)<25 or rng.random()<.6 else pool)
 w,h=item['width'],item['height'];p={int(i):v for i,v in item['pieces'].items()};sol=[tuple(t) for t in item['solution']]
 if len(sol)>10:continue
 got=add_mask(p,w,h,sol)
 if not got:stats['no_mask']+=1;continue
 fp=g.fingerprint(got['pieces'],got['width'],got['height'])
 if fp in seen:continue
 seen.add(fp);got.update(fingerprint=fp,generation_attempt=attempt,mask_depth=item.get('mask_depth',0)+1);pool.append(got);stats['conditional']+=1
 if len(pool)%10==0:print('conditional',len(pool),'attempt',attempt,'seconds',round(time.time()-start),flush=True)
 if len(pool)>=args.target:break
out=g.BASE/'tools/logica/renovo-conditional-pool.json';out.write_text(json.dumps({'seed':11042026,'stats':dict(stats),'pool':pool},ensure_ascii=False));print('SAVED',len(pool),dict(stats),flush=True)
