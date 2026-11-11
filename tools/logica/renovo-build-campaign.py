"""Seleciona 80 níveis por relações lógicas, com contrafactuais de cruzamento."""
import sys
import importlib.util,json,hashlib,re
from pathlib import Path
from collections import Counter
P=Path(__file__).with_name('renovo-generate.py');sp=importlib.util.spec_from_file_location('rg',P);g=importlib.util.module_from_spec(sp);sp.loader.exec_module(g);BASE=g.BASE

def compact(item):
 p={int(i):v for i,v in item['pieces'].items()};w=item['width'];xs=sorted({i%w for i in p});ys=sorted({i//w for i in p});nw=len(xs);nh=len(ys)
 trans={i:ys.index(i//w)*nw+xs.index(i%w) for i in p}
 return {'width':nw,'height':nh,'pieces':{trans[i]:v for i,v in p.items()},'solution':[[trans[i] for i in t] for t in item['solution']]}

def relaxed_count(p,w,h,ignore_crossing=False,ignore_angle=False,cap=10000):
 if ignore_angle:
  ds={}
  for b,k in p.items():
   if k!='B':continue
   vi=g.visible(b,p,w,h);ds[b]=[(s,b,f) for s in vi if p[s]=='S' for f in vi if p[f]=='F']
 else:ds=g.candidates(p,w,h)
 count=0
 def visit(rest,chosen):
  nonlocal count
  if count>=cap:return
  if any(not cc for cc in rest.values()):return
  if not rest:count+=1;return
  b=min(rest,key=lambda x:len(rest[x]))
  for t in rest[b]:
   def conflict(u):return t[0]==u[0] or t[2]==u[2] if ignore_crossing else g.clash(t,u,w)
   visit({a:[u for u in cc if not conflict(u)] for a,cc in rest.items() if a!=b},chosen+[t])
 visit(ds,[]);return count

def analyze(definition):
 p={int(i):v for i,v in definition['pieces'].items()};w,h=definition['width'],definition['height'];human=g.human_trace(p,w,h);assert human and human['solved'];cs=g.candidates(p,w,h)
 depth={b:0 for b in cs};conditional=[];mandatory=0;prior=[];distant=0
 for event in human['trace']:
  b=event['bud'];reason=event['reason']
  if reason.startswith('trio obrigatório'):
   support=int(re.findall(r'\d+',reason)[0]);depth[b]=max(depth[b],depth[support]+1)
   distant+=int(abs(b//w-support//w)+abs(b%w-support%w)>=3)
  elif reason.startswith('segmento obrigatório'):
   a,z,support=map(int,re.findall(r'\d+',reason));mandatory+=1
   initial=all(a in t and z in t for t in cs[support])
   if not initial:conditional.append(depth[support])
   depth[b]=max(depth[b],depth[support]+1)
  elif event['rule']==2:
   kind,eid=reason.split()[:2];endpoint=int(eid);at=0 if kind=='S' else 2
   supports=[e['bud'] for e in prior if any(t[at]==endpoint for t in e['removed'])]
   depth[b]=max([depth[b],1]+[depth[q]+1 for q in supports])
  prior.append(event)
 metrics={**human['metrics'],'endpoint_reservations':sum(e['rule']==2 for e in human['trace']),'mandatory_segment_steps':mandatory,'conditional_segment_steps':len(conditional),'conditional_dependency_depth':max([0]+conditional),'max_elimination_dependency_depth':max(depth.values()),'distant_eliminations':distant}
 return human,metrics

# A curadoria é um insumo pequeno versionado; refaz a campanha sem pools de busca.
# --reselect refaz a seleção editorial após executar os geradores documentados.
curation_path=BASE/'tests/logica/renovo-curation.json'
if curation_path.exists() and '--reselect' not in sys.argv:
 bands=json.loads(curation_path.read_text())['bands']
 names=['Três etapas do renovo', 'Uma peça reservada', 'Parceiros em cadeia', 'O trecho inevitável', 'Um vínculo revela outro', 'Reservas entrelaçadas']
else:
 fixture_path=BASE/'tests/logica/renovo-fixtures.json'
 if fixture_path.exists():fixture_defs=json.loads(fixture_path.read_text())
 else:
  reference=Path('/workspace/scratch/26cf89896353/recovered/concepts/Intuicao_8_Jogos_Logicos/validacao/connections/design.json');raw=next(x for x in json.loads(reference.read_text())['games'] if x['id']=='renovo')
  fixture_defs=[{k:x[k] for k in ['width','height','pieces','solution']} for x in raw['examples']];fixture_path.write_text(json.dumps(fixture_defs,ensure_ascii=False,indent=2))
 fixtures=[]
 for definition in fixture_defs:
  definition={**definition,'pieces':{int(i):v for i,v in definition['pieces'].items()}};human,metrics=analyze(definition)
  fixtures.append({**definition,**human,'metrics':metrics,'fingerprint':g.fingerprint(definition['pieces'],definition['width'],definition['height']),'source':'exemplo aprovado'})
 pool=[];seen={x['fingerprint'] for x in fixtures}
 for source in ['renovo-pool.json','renovo-hard-pool.json','renovo-core-pool.json','renovo-conditional-pool.json']:
  for raw in json.loads((BASE/'tools/logica'/source).read_text())['pool']:
   definition=compact(raw);fp=g.fingerprint(definition['pieces'],definition['width'],definition['height'])
   if fp in seen:continue
   seen.add(fp);human,metrics=analyze(definition)
   if metrics['competition_components']!=1:continue
   pool.append({**definition,**human,'metrics':metrics,'fingerprint':fp,'source':source,'generation_attempt':raw.get('generation_attempt'),'generation_run':raw.get('generation_run'),'generation_step':raw.get('generation_step'),'mask_depth':raw.get('mask_depth',0)})
 print('POOL',len(pool),'conditional',Counter(x['metrics']['conditional_dependency_depth'] for x in pool if x['metrics']['conditional_segment_steps']),flush=True)
 used={x['fingerprint'] for x in fixtures}
 def take(n,predicate,key,reverse=False):
  choices=sorted([x for x in pool if x['fingerprint'] not in used and predicate(x['metrics'])],key=lambda x:key(x['metrics']),reverse=reverse)
  assert len(choices)>=n,(n,len(choices))
  selected=choices[:n];used.update(x['fingerprint'] for x in selected);return selected
 bands=[None]*6
 bands[5]=take(5,lambda m:m['conditional_dependency_depth']>=2,lambda m:(m['conditional_dependency_depth'],m['rule_switches'],m['distant_eliminations']),True)
 bands[4]=take(15,lambda m:m['conditional_segment_steps']>=1,lambda m:(m['conditional_dependency_depth'],m['rule_switches']))
 bands[3]=take(15,lambda m:m['max_rule']>=3 and m['mandatory_segment_steps']>=1 and not m['conditional_segment_steps'],lambda m:(m['deduction_events'],m['initial_candidates']))
 bands[0]=[fixtures[0]]+take(14,lambda m:m['max_rule']<=1 and m['trios']<=4,lambda m:(m['initial_candidates'],m['max_elimination_dependency_depth']))
 bands[1]=[fixtures[1]]+take(14,lambda m:m['max_rule']==2,lambda m:(m['endpoint_reservations'],m['rule_switches'],m['max_elimination_dependency_depth']))
 bands[2]=take(15,lambda m:m['max_rule']==2 and m['rule_switches']>=2,lambda m:(m['rule_switches'],m['distant_eliminations'],m['max_elimination_dependency_depth']),True)
 names=['Três etapas do renovo','Uma peça reservada','Parceiros em cadeia','O trecho inevitável','Um vínculo revela outro','Reservas entrelaçadas']
 kept=['width', 'height', 'pieces', 'solution', 'fingerprint', 'source', 'generation_attempt', 'generation_run', 'generation_step', 'mask_depth']
 curation_path.write_text(json.dumps({'schema':1,'game':'renovo','bands':[[{k:v for k,v in item.items() if k in kept} for item in band] for band in bands]},ensure_ascii=False,indent=2))
levels=[];certs=[]
for band,items in enumerate(bands):
 for item in items:
  definition={k:item[k] for k in ['width','height','pieces']};definition['pieces']={str(i):v for i,v in definition['pieces'].items()}
  digest=hashlib.sha256(json.dumps(definition,sort_keys=True,separators=(',',':')).encode()).hexdigest();p={int(i):v for i,v in definition['pieces'].items()};sols,nodes=g.exact_solutions(p,definition['width'],definition['height']);assert len(sols)==1 and sorted(sols[0])==sorted(map(tuple,item['solution']))
  human,metrics=analyze(definition);without_cross=relaxed_count(p,definition['width'],definition['height'],ignore_crossing=True);without_angle=relaxed_count(p,definition['width'],definition['height'],ignore_angle=True)
  if band>=3:assert without_cross>1,(band,without_cross)
  level={'id':'renovo-'+digest[:16],'version':1,'game':'renovo','name':names[band],'difficulty':band,'number':len(levels)+1,**definition,'solution':[list(t) for t in sols[0]],'logic':{'technique':names[band],'provisional':True}}
  levels.append(level);certs.append({'id':level['id'],'number':level['number'],'difficulty':band,'definition_sha256':digest,'solution_count':1,'without_crossing_solutions':without_cross,'without_right_angle_solutions':without_angle,'counterfactual_cap':10000,'solver_nodes':nodes,'fingerprint':item['fingerprint'],'source':item['source'],'generation_attempt':item.get('generation_attempt'),'generation_run':item.get('generation_run'),'generation_step':item.get('generation_step'),'metrics':metrics,'trace':human['trace']})
assert len(levels)==80 and len(set(x['fingerprint'] for x in certs))==80
(BASE/'dist/logica/games/renovo/campaign.mjs').write_text('// Dados certificados offline; nenhum solver é executado no navegador.\nexport const CAMPAIGN = '+json.dumps(levels,ensure_ascii=False,separators=(',',':'))+';\n')
report={'game':'renovo','seeds':[11102026,90261110,11032026,11042026],'level_count':80,'difficulty_counts':[15,15,15,15,15,5],'difficulty_status':'Progressão editorial baseada em reservas de extremos, segmentos obrigatórios e dependências que tornam esses segmentos obrigatórios. Sem playtest; profundidade medida é a da trilha registrada, não prova da menor estratégia humana possível.','uniqueness':'Enumeração de todas as coberturas geométricas até provar uma única solução; a busca pode terminar ao encontrar a segunda e descartar o candidato.','symmetry_filter':'Rejeita rotação, reflexão, translação, troca global de semente/folha e mero espaçamento de linhas/colunas vazias.','selection':'As 35 fases finais se tornam ambíguas sem a proibição de cruzamentos. As 20 últimas exigem no roteiro um segmento ainda não obrigatório na posição inicial; reservas de parceiros revelam esse segmento antes de aplicá-lo a outra região.','levels':certs}
(BASE/'tests/logica/renovo-certificates.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
for band in range(6):
 rows=[x for x in certs if x['difficulty']==band];print(band,len(rows),'rank',Counter(x['metrics']['max_rule'] for x in rows),'conditionaldepth',Counter(x['metrics']['conditional_dependency_depth'] for x in rows),'withoutcross',Counter(x['without_crossing_solutions'] for x in rows))
print('RENOVO: 80 fases certificadas.')
