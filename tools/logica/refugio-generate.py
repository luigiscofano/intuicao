#!/usr/bin/env python3
"""Campanha reproduzível de REFÚGIO, sem dependências externas.

Gera separadores irredutíveis, escolhe um marco por componente e remove pistas
apenas quando a enumeração completa ainda certifica uma solução. O roteiro
lógico independente dessa enumeração limita contradições a até duas escolhas.
"""
from pathlib import Path
from collections import Counter
import argparse, hashlib, json, random, time

ROOT=Path(__file__).resolve().parents[2]
GAME=ROOT/'dist/logica/games/refugio'
REPORT=ROOT/'tests/logica/refugio-certificates.json'
SEED=20261110032

def write_atomic(path,text):
    temporary=path.with_name(path.name+'.tmp')
    temporary.write_text(text)
    temporary.replace(path)

def graph(rows,cols):
    return [[j for j in (i-cols,i+cols) if 0<=j<rows*cols]+([i-1] if i%cols else [])+([i+1] if i%cols<cols-1 else []) for i in range(rows*cols)]

def symmetries(values,rows,cols):
    grid=[values[r*cols:(r+1)*cols] for r in range(rows)]
    for _ in range(4):
        for g in (grid,[row[::-1] for row in grid]):yield len(g),len(g[0]),[v for row in g for v in row]
        grid=[list(row) for row in zip(*grid[::-1])]

def canonical(solution,rows,cols):
    return min(f'{r}x{c}:'+''.join(map(str,a)) for r,c,a in symmetries(solution,rows,cols))

def core(level):return {key:level[key] for key in ('rows','cols','markers','givens')}
def stable_id(level):return 'refugio-'+hashlib.sha256(json.dumps(core(level),sort_keys=True,separators=(',',':')).encode()).hexdigest()[:16]

def components(cells,adj,allowed):
    found=[];which=[-1]*len(cells)
    for i,value in enumerate(cells):
        if value not in allowed or which[i]>=0:continue
        ident=len(found);todo=[i];which[i]=ident
        for u in todo:
            for v in adj[u]:
                if cells[v] in allowed and which[v]<0:which[v]=ident;todo.append(v)
        found.append(todo)
    return found,which

class Solver:
    def __init__(self,level):
        self.level=level;self.n=level['rows']*level['cols'];self.adj=graph(level['rows'],level['cols'])
        self.markers={m['index'] for m in level['markers']};self.initial=[-1 if v is None else v for v in level['givens']]
        for i in self.markers:self.initial[i]=0

    def contradiction(self,cells):
        free,which=components(cells,self.adj,{0});marked=[sum(i in self.markers for i in comp) for comp in free]
        if any(count>1 for count in marked):return 'marcos_reunidos'
        for i,value in enumerate(cells):
            if value!=1:continue
            touching={which[j] for j in self.adj[i] if cells[j]==0};unknown=sum(cells[j]==-1 for j in self.adj[i])
            if len(touching)+unknown<2:
                known_neighbors=sum(cells[j]==0 for j in self.adj[i])
                return 'barreira_redundante' if known_neighbors>=2 else 'barreira_sem_dois_contatos'
            if sum(marked[ident]>0 for ident in touching)>2:return 'barreira_tres_refugios'
        potential,_=components(cells,self.adj,{-1,0})
        for comp in potential:
            if any(cells[i]==0 for i in comp) and not any(i in self.markers for i in comp):return 'bolsao_sem_marco'
        if -1 not in cells:
            if any(count!=1 for count in marked):return 'bolsao_sem_marco'
            for i,value in enumerate(cells):
                if value==1 and len({which[j] for j in self.adj[i] if cells[j]==0})!=2:return 'barreira_tres_refugios'
        return None

    def propagate(self,cells,trail=None):
        cells=cells.copy();rounds=0
        while True:
            reason=self.contradiction(cells)
            if reason:return None,reason,rounds
            changed=False;rounds+=1
            for i,value in enumerate(cells):
                if value!=-1:continue
                for assumed in (0,1):
                    trial=cells.copy();trial[i]=assumed;reason=self.contradiction(trial)
                    if not reason:continue
                    cells[i]=1-assumed;changed=True
                    if trail is not None:trail.append({'index':i,'value':1-assumed,'reason':reason,'depth':0,'round':rounds})
                    break
            if not changed:return cells,None,rounds

    def count(self,limit=2,node_limit=100000):
        nodes=0;solutions=[];aborted=False
        def visit(cells):
            nonlocal nodes,aborted
            nodes+=1
            if nodes>node_limit:aborted=True;return
            cells,_,_=self.propagate(cells)
            if cells is None:return
            undecided=[i for i,v in enumerate(cells) if v==-1]
            if not undecided:solutions.append(cells);return
            i=max(undecided,key=lambda j:sum(cells[k]!=-1 for k in self.adj[j]))
            for value in (0,1):
                branch=cells.copy();branch[i]=value;visit(branch)
                if aborted or len(solutions)>=limit:return
        visit(self.initial)
        return {'count':len(solutions),'nodes':nodes,'exhaustive':not aborted and len(solutions)<limit,'aborted':aborted,'solutions':solutions}

    def refuted(self,cells,depth):
        cells,_,_=self.propagate(cells)
        if cells is None:return True
        undecided=[i for i,v in enumerate(cells) if v==-1]
        if not undecided or depth==0:return False
        i=max(undecided,key=lambda j:sum(cells[k]!=-1 for k in self.adj[j]))
        for value in (0,1):
            trial=cells.copy();trial[i]=value
            if not self.refuted(trial,depth-1):return False
        return True

    def human(self,max_depth=2):
        cells=self.initial.copy();trail=[];passes=0
        while True:
            cells,reason,rounds=self.propagate(cells,trail);passes+=rounds
            if cells is None:return {'solved':False,'reason':reason}
            undecided=[i for i,v in enumerate(cells) if v==-1]
            if not undecided:
                return {'solved':True,'solution':cells,'maxDepth':max((s['depth'] for s in trail),default=0),'propagationPasses':passes,
                        'techniques':dict(Counter(s['reason'] for s in trail)),'decisions':len(trail),'trace':trail}
            found=False
            for depth in range(1,max_depth+1):
                for i in undecided:
                    for assumed in (0,1):
                        trial=cells.copy();trial[i]=assumed
                        if self.refuted(trial,depth-1):
                            cells[i]=1-assumed;trail.append({'index':i,'value':1-assumed,'reason':'contradicao_curta','depth':depth});found=True;break
                    if found:break
                if found:break
            if not found:return {'solved':False,'reason':'exige_busca_mais_longa','trace':trail}

def full_valid_mask(mask,rows,cols,adj_bits):
    n=rows*cols;free=((1<<n)-1)^mask
    if any((adj_bits[i]&free).bit_count()<2 for i in range(n) if mask>>i&1):return None
    remaining=free;comps=[]
    while remaining:
        todo=remaining&-remaining;comp=0
        while todo:
            bit=todo&-todo;todo^=bit;comp|=bit
            todo|=adj_bits[bit.bit_length()-1]&remaining&~comp
        comps.append(comp);remaining&=~comp
    if not 2<=len(comps)<=4:return None
    if not all(sum(bool(adj_bits[i]&comp) for comp in comps)==2 for i in range(n) if mask>>i&1):return None
    return [[i for i in range(n) if comp>>i&1] for comp in comps]

def make_pool(rng):
    pools={}
    for rows,cols,samples in [(3,3,512),(3,4,4096),(4,4,65536),(4,5,450000),(5,5,900000)]:
        n=rows*cols;adj=graph(rows,cols);adj_bits=[sum(1<<j for j in ns) for ns in adj];unique={}
        for attempt in range(samples):
            mask=attempt if n<=16 else sum(1<<i for i in range(n) if rng.random()<.28)
            comps=full_valid_mask(mask,rows,cols,adj_bits)
            if comps is None:continue
            solution=[(mask>>i)&1 for i in range(n)];signature=canonical(solution,rows,cols)
            if signature not in unique:unique[signature]=(solution,comps,signature)
        pools[rows,cols]=list(unique.values())
        print(f'REFÚGIO banco {rows}x{cols}: {len(unique)} separadores distintos',flush=True)
    return pools

def make_fixture(which):
    markers=[{'index':0,'label':1},{'index':15,'label':2}]
    if which==0:
        fixed={0:0,1:1,6:1,9:1,14:1,15:0};solution=[0,1,0,0,0,0,1,0,0,1,0,0,0,0,1,0]
    else:
        fixed={0:0,5:0,10:0,11:1,12:1,15:0};solution=[0,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0]
    return {'rows':4,'cols':4,'markers':markers,'givens':[fixed.get(i) for i in range(16)],'solution':solution,'fixture':f'refugio_{which}'}

def candidate(rows,cols,entry,rng,unknown_goal):
    solution,comps,_=entry;markers=[{'index':rng.choice(comp),'label':label} for label,comp in enumerate(comps,1)]
    level={'rows':rows,'cols':cols,'markers':markers,'givens':solution.copy(),'solution':solution.copy()}
    anchors={marker['index'] for marker in markers};order=[i for i in range(rows*cols) if i not in anchors];rng.shuffle(order)
    for i in order:
        if level['givens'].count(None)>=unknown_goal:break
        old=level['givens'][i];level['givens'][i]=None;audit=Solver(level).count()
        if audit['count']!=1 or not audit['exhaustive']:level['givens'][i]=old
    return level

def accepts(level,human,difficulty):
    if not human.get('solved'):return False
    unknown=level['givens'].count(None);depth=human['maxDepth'];tech=human['techniques'];kinds=len(tech)
    # Depois do tutorial há sempre ao menos uma barreira a descobrir.
    if not any(g is None and s==1 for g,s in zip(level['givens'],level['solution'])):return False
    if difficulty==0:return 3<=unknown<=7 and depth==0 and len(level['markers'])==2
    if difficulty==1:return unknown>=6 and depth==0 and kinds>=2 and (tech.get('barreira_redundante',0)>0 or (tech.get('marcos_reunidos',0)>0 and tech.get('bolsao_sem_marco',0)>0))
    if difficulty==2:return unknown>=8 and (depth>=1 or (kinds>=3 and tech.get('bolsao_sem_marco',0)>0))
    if difficulty==3:return unknown>=8 and len(level['markers'])>=3 and (depth>=1 or tech.get('barreira_tres_refugios',0)>0)
    if difficulty==4:return unknown>=11 and depth>=1
    return unknown>=12 and (depth==2 or (depth==1 and tech.get('contradicao_curta',0)>=2))

def generate():
    rng=random.Random(SEED);start=time.time();pools=make_pool(rng);campaign=[];certificates=[];seen=set()
    plans=[([(3,3),(3,4),(4,4)],{2},6), ([(3,4),(4,4),(4,5)],{2},9), ([(4,4),(4,5)],{2,3},12),
           ([(4,4),(4,5),(5,5)],{3,4},14), ([(4,5),(5,5)],{2,3,4},18), ([(5,5)],{2,3,4},20)]
    names=['Duas margens','Barreiras com função','Caminhos até o marco','Encontros de refúgios','Separações distantes','Uma cadeia de refúgios']
    for difficulty,needed in enumerate([15,15,15,15,15,5]):
        selected=0;attempts=0
        while selected<needed:
            attempts+=1
            if attempts>1800:raise RuntimeError(f'Não houve candidatos suficientes para a faixa {difficulty}: {selected}/{needed}')
            fixture=(difficulty==0 and selected==0) or (difficulty==2 and selected==0)
            if fixture:level=make_fixture(0 if difficulty==0 else 1)
            else:
                dimensions,region_counts,goal=plans[difficulty];rows,cols=rng.choice(dimensions)
                available=[entry for entry in pools[rows,cols] if len(entry[1]) in region_counts and entry[2] not in seen]
                if not available:continue
                entry=rng.choice(available)
                level=candidate(rows,cols,entry,rng,min(rows*cols-len(entry[1]),goal+rng.choice([-1,0,1])))
            signature=canonical(level['solution'],level['rows'],level['cols'])
            if signature in seen:continue
            solver=Solver(level);human=solver.human()
            if not fixture and not accepts(level,human,difficulty):continue
            if not human.get('solved'):raise RuntimeError('Fixture sem trilha lógica')
            audit=solver.count()
            if audit['count']!=1 or not audit['exhaustive'] or audit['solutions'][0]!=level['solution']:continue
            number=len(campaign)+1;identifier=stable_id(level)
            level.update({'id':identifier,'version':1,'game':'refugio','name':f'{names[difficulty]} {selected+1:02d}','difficulty':difficulty,'number':number})
            metrics={key:human[key] for key in ('maxDepth','propagationPasses','techniques','decisions')}
            metrics.update({'undecided':level['givens'].count(None),'cells':level['rows']*level['cols'],'markers':len(level['markers']),
                            'wallsToFind':sum(g is None and s==1 for g,s in zip(level['givens'],level['solution']))})
            level['logic']=metrics;campaign.append(level);seen.add(signature);selected+=1
            certificates.append({'id':identifier,'definition':core(level),'solutionCount':1,'searchExhausted':True,'searchNodes':audit['nodes'],
                                 'canonicalSolution':signature,'metrics':metrics,'trace':human['trace']})
            print(f'REFÚGIO {number:02d}/80 faixa={difficulty} grade={level["rows"]}x{level["cols"]} marcos={len(level["markers"])} pendentes={metrics["undecided"]} profundidade={human["maxDepth"]} técnicas={human["techniques"]} tentativas={attempts}',flush=True)
    GAME.mkdir(parents=True,exist_ok=True)
    write_atomic(GAME/'campaign.mjs','// Gerado offline por tools/logica/refugio-generate.py. Não há solver na inicialização.\nexport const CAMPAIGN = '+json.dumps(campaign,ensure_ascii=False,separators=(',',':'))+';\n')
    REPORT.parent.mkdir(parents=True,exist_ok=True)
    write_atomic(REPORT,json.dumps({'game':'refugio','seed':SEED,'levels':80,'symmetryPolicy':'Nenhum separador final repetido, mesmo sob rotação ou reflexão; nem trocar marcos permite reutilizar a geometria.','humanMethod':'Contato, separação de marcos, redundância e acesso a marcos; contradições limitadas a duas escolhas. Faixas editoriais, sem teste com jogadores.','certificates':certificates},ensure_ascii=False,indent=2))
    write_atomic(ROOT/'tests/logica/refugio-fixtures.json',json.dumps([make_fixture(0),make_fixture(1)],ensure_ascii=False,indent=2))
    print(f'Concluído em {time.time()-start:.1f}s',flush=True)

def verify():
    report=json.loads(REPORT.read_text());seen=set()
    for cert in report['certificates']:
        solver=Solver(cert['definition']);audit=solver.count()
        assert audit['count']==1 and audit['exhaustive'],cert['id']
        signature=canonical(audit['solutions'][0],cert['definition']['rows'],cert['definition']['cols'])
        assert signature==cert['canonicalSolution'] and signature not in seen
        seen.add(signature);human=solver.human();assert human['solved'] and human['solution']==audit['solutions'][0]
    assert len(seen)==80
    print('REFÚGIO: 80 definições únicas certificadas novamente, com trilha limitada a duas escolhas.')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--verify',action='store_true');args=parser.parse_args()
    verify() if args.verify else generate()
