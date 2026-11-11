"""Seleciona a campanha certificada; não aumenta dificuldade só por tamanho."""
import sys
import importlib.util,json,hashlib
from pathlib import Path
from collections import Counter
P=Path(__file__).with_name('foz-generate.py');s=importlib.util.spec_from_file_location('fg',P);g=importlib.util.module_from_spec(s);s.loader.exec_module(g)
BASE=g.BASE
# A curadoria é um insumo pequeno versionado; refaz a campanha sem pools de busca.
# --reselect refaz a seleção editorial após executar os geradores documentados.
curation_path=BASE/'tests/logica/foz-curation.json'
if curation_path.exists() and '--reselect' not in sys.argv:
 bands=json.loads(curation_path.read_text())['bands']
 names=['Primeiras correntes', 'Comprimentos vizinhos', 'Encontro de ramos', 'Uma passagem livre', 'Rotas incompatíveis', 'A última confluência']
else:
 fixture_path=BASE/'tests/logica/foz-fixtures.json'
 if fixture_path.exists():fixture_defs=json.loads(fixture_path.read_text())
 else:
  reference=Path('/workspace/scratch/26cf89896353/recovered/concepts/Intuicao_8_Jogos_Logicos/validacao/connections/design.json')
  fixture_defs=[]
  for ex in next(x for x in json.loads(reference.read_text())['games'] if x['id']=='foz')['examples']:
   n=ex['width']*ex['height'];level={k:ex[k] for k in ['width','height','root','clues']};level['channels']=g.all_edges(ex['width'],ex['height']);level['solution']=[-1 if i==ex['root'] else ex['solution'][str(i)] for i in range(n)];fixture_defs.append(level)
  fixture_path.write_text(json.dumps(fixture_defs,ensure_ascii=False,indent=2))
 fixtures=[]
 for level in fixture_defs:
  trace=g.human_trace(level);sol,nodes=g.solve(level);assert len(sol)==1
  fixtures.append({**level,**trace,'source':'exemplo aprovado','solver_nodes':nodes,'fingerprint':g.fingerprint(level)})
 pool=json.loads((BASE/'tools/logica/foz-pool.json').read_text())['pool'];used={x['fingerprint'] for x in fixtures}
 def take(n,predicate,key,reverse=False):
  candidates=sorted([x for x in pool if x['fingerprint'] not in used and predicate(x['metrics'])],key=lambda x:key(x['metrics']),reverse=reverse)
  assert len(candidates)>=n,(n,len(candidates))
  chosen=candidates[:n];used.update(x['fingerprint'] for x in chosen);return chosen
 bands=[None]*6
 bands[5]=take(5,lambda m:m['max_rule']==4 and m['max_contradiction_steps']<=7 and m['hypotheses_eliminated']>=3,lambda m:(m['rule_switches'],m['hypotheses_eliminated']),True)
 bands[4]=take(15,lambda m:m['max_rule']==4 and m['max_contradiction_steps']<=8 and m['hypotheses_eliminated']>=2,lambda m:(m['hypotheses_eliminated'],m['rule_switches']))
 bands[0]=[fixtures[0]]+take(14,lambda m:m['max_rule']==1,lambda m:(m['deduction_events'],m['initial_choices']))
 bands[1]=take(15,lambda m:m['max_rule']<=3 and m['points']<=12,lambda m:(m['max_rule'],m['rule_switches'],m['deduction_events']))
 bands[2]=[fixtures[1]]+take(14,lambda m:m['max_rule']==3 and m['rule_switches']>=3,lambda m:(m['rule_switches'],m['deduction_events']))
 bands[3]=take(10,lambda m:m['max_rule']==3,lambda m:(m['rule_switches'],m['deduction_events']),True)+take(5,lambda m:m['max_rule']==4 and m['hypotheses_eliminated']==1 and m['max_contradiction_steps']<=5,lambda m:(m['max_contradiction_steps'],m['rule_switches']))
 names=['Primeiras correntes','Comprimentos vizinhos','Encontro de ramos','Uma passagem livre','Rotas incompatíveis','A última confluência']
 kept=['width', 'height', 'root', 'channels', 'clues', 'solution', 'fingerprint', 'generation_attempt', 'source']
 curation_path.write_text(json.dumps({'schema':1,'game':'foz','bands':[[{k:v for k,v in item.items() if k in kept} for item in band] for band in bands]},ensure_ascii=False,indent=2))
levels=[];certs=[]
for band,items in enumerate(bands):
 for item in items:
  definition={k:item[k] for k in ['width','height','root','channels','clues']}
  digest=hashlib.sha256(json.dumps(definition,sort_keys=True,separators=(',',':')).encode()).hexdigest()
  solutions,nodes=g.solve(definition);assert len(solutions)==1 and solutions[0]==item['solution']
  human=g.human_trace(definition);assert human and human['solved']
  level={'id':'foz-'+digest[:16],'version':1,'game':'foz','name':names[band],'difficulty':band,'number':len(levels)+1,**definition,'solution':item['solution'],'logic':{'technique':names[band],'provisional':True}}
  levels.append(level);certs.append({'id':level['id'],'number':level['number'],'difficulty':band,'definition_sha256':digest,'solution_count':1,'solver_nodes':nodes,'fingerprint':item['fingerprint'],'generation_attempt':item.get('generation_attempt'),'source':item.get('source','geração determinística'),'metrics':human['metrics'],'trace':human['trace']})
assert len(levels)==80 and len(set(x['fingerprint'] for x in certs))==80
out=BASE/'dist/logica/games/foz/campaign.mjs';out.write_text('// Gerado offline; não executar solver na interface.\nexport const CAMPAIGN = '+json.dumps(levels,ensure_ascii=False,separators=(',',':'))+';\n')
report={'game':'foz','seed':10112026,'samples':420,'level_count':80,'difficulty_counts':[15,15,15,15,15,5],'uniqueness':'Busca completa de orientações com podas seguras; encerra na segunda solução, nunca antes de provar que a primeira é única.','human_model':'Compatibilidade de distâncias, limite mínimo de percurso, proibição de retorno/região sem saída e hipóteses únicas com até dez eliminações (seleção limita as superiores a oito).','difficulty_status':'Progressão editorial por composição de deduções e hipóteses curtas; sem playtest. Tamanho da grade e tempo do solver não são usados como prova de dificuldade.','symmetry_filter':'Definição canônica sob rotação/reflexão, incluindo canais, foz e pistas.','levels':certs}
(BASE/'tests/logica/foz-certificates.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
for i in range(6):
 selected=[x for x in certs if x['difficulty']==i];print(i,len(selected),Counter(x['metrics']['max_rule'] for x in selected),'switches',[min(x['metrics']['rule_switches'] for x in selected),max(x['metrics']['rule_switches'] for x in selected)])
print('FOZ: 80 fases certificadas.')
