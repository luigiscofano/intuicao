#!/usr/bin/env python3
"""Autoria determinística e certificado offline de DIVISA (somente stdlib).

O enumerador percorre todas as atribuições ainda possíveis, com podas necessárias
de fronteira e conexão. O roteiro lógico é outro procedimento: elimina candidatos
por essas condições e, quando preciso, demonstra contradições de até duas casas.
Nenhum gabarito é consultado pelo enumerador ou pelo roteiro.
"""
from pathlib import Path
from collections import Counter
from itertools import combinations
import argparse, hashlib, json, random, time

ROOT = Path(__file__).resolve().parents[2]
GAME = ROOT / 'dist/logica/games/divisa'
REPORT = ROOT / 'tests/logica/divisa-certificates.json'
SEED = 20261110031

def write_atomic(path, text):
    temporary=path.with_name(path.name+'.tmp')
    temporary.write_text(text)
    temporary.replace(path)

def graph(rows, cols):
    return [[j for j in (i-cols, i+cols) if 0 <= j < rows*cols]
            + ([i-1] if i % cols else []) + ([i+1] if i % cols < cols-1 else [])
            for i in range(rows*cols)]

def symmetries(values, rows, cols):
    grid = [values[r*cols:(r+1)*cols] for r in range(rows)]
    for _ in range(4):
        for g in (grid, [row[::-1] for row in grid]):
            yield len(g), len(g[0]), [v for row in g for v in row]
        grid = [list(row) for row in zip(*grid[::-1])]

def canonical(solution, rows, cols):
    keys = []
    for r,c,a in symmetries(solution, rows, cols):
        mapping = {}; normalized = []
        for value in a:
            if value not in mapping: mapping[value] = len(mapping)
            normalized.append(mapping[value])
        keys.append(f'{r}x{c}:' + ''.join(map(str,normalized)))
    return min(keys)

def core(level):
    return {key:level[key] for key in ('rows','cols','letters','givens','contacts')}

def stable_id(level):
    raw=json.dumps(core(level),sort_keys=True,separators=(',',':')).encode()
    return 'divisa-' + hashlib.sha256(raw).hexdigest()[:16]

class Solver:
    def __init__(self, level):
        self.level=level;self.n=level['rows']*level['cols'];self.letters=level['letters'];self.k=len(self.letters)
        self.adj=graph(level['rows'],level['cols']);self.edges=[(i,j) for i in range(self.n) for j in self.adj[i] if j>i]
        self.pairs=list(combinations(range(self.k),2));self.targets=[level['contacts'][self.letters[a]+self.letters[b]] for a,b in self.pairs]
        self.pair_bit={(a,b):1<<(q+1) for q,(a,b) in enumerate(self.pairs)}
        self.values={mask:[i for i in range(self.k) if mask>>i&1] for mask in range(1,1<<self.k)}
        self.edge_options={}
        for ma in self.values:
            for mb in self.values:
                options=0
                for a in self.values[ma]:
                    for b in self.values[mb]:options |= 1 if a==b else self.pair_bit[tuple(sorted((a,b)))]
                self.edge_options[ma,mb]=options
        self.initial=[(1<<self.letters.index(v)) if v is not None else (1<<self.k)-1 for v in level['givens']]

    def contradiction(self, domains):
        if 0 in domains:return 'sem_candidato'
        lower=[0]*len(self.pairs);upper=[0]*len(self.pairs)
        for a,b in self.edges:
            options=self.edge_options[domains[a],domains[b]]
            for q in range(len(self.pairs)):
                bit=1<<(q+1)
                if options&bit:upper[q]+=1
                if options==bit:lower[q]+=1
        for q,target in enumerate(self.targets):
            if lower[q]>target:return 'quota_excedida'
            if upper[q]<target:return 'quota_inalcancavel'
        for letter in range(self.k):
            bit=1<<letter;fixed=[i for i,d in enumerate(domains) if d==bit]
            possible=[i for i,d in enumerate(domains) if d&bit]
            if not possible:return 'territorio_ausente'
            if not fixed:continue
            seen={fixed[0]};todo=[fixed[0]]
            for i in todo:
                for j in self.adj[i]:
                    if domains[j]&bit and j not in seen:seen.add(j);todo.append(j)
            if any(i not in seen for i in fixed):return 'conexao_impossivel'
        return None

    def propagate(self, domains, trail=None):
        domains=domains.copy();rounds=0
        while True:
            reason=self.contradiction(domains)
            if reason:return None,reason,rounds
            changed=False;rounds+=1
            for i,mask in enumerate(domains):
                if mask.bit_count()==1:continue
                for value in self.values[mask]:
                    trial=domains.copy();trial[i]=1<<value
                    reason=self.contradiction(trial)
                    if not reason:continue
                    domains[i]&=~(1<<value);changed=True
                    if trail is not None:trail.append({'index':i,'remove':self.letters[value],'reason':reason,'depth':0,'round':rounds})
                    if not domains[i]:return None,reason,rounds
            if not changed:return domains,None,rounds

    def count(self, limit=2, node_limit=100000):
        nodes=0;solutions=[];aborted=False
        def visit(domains):
            nonlocal nodes,aborted
            nodes+=1
            if nodes>node_limit:aborted=True;return
            domains,_,_=self.propagate(domains)
            if domains is None:return
            candidates=[i for i,d in enumerate(domains) if d.bit_count()>1]
            if not candidates:
                solutions.append([self.letters[d.bit_length()-1] for d in domains]);return
            i=min(candidates,key=lambda j:(domains[j].bit_count(),-len(self.adj[j])))
            for value in self.values[domains[i]]:
                branch=domains.copy();branch[i]=1<<value;visit(branch)
                if aborted or len(solutions)>=limit:return
        visit(self.initial)
        return {'count':len(solutions),'nodes':nodes,'exhaustive':not aborted and len(solutions)<limit,'aborted':aborted,'solutions':solutions}

    def refuted(self, domains, depth):
        domains,_,_=self.propagate(domains)
        if domains is None:return True
        undecided=[i for i,d in enumerate(domains) if d.bit_count()>1]
        if not undecided or depth==0:return False
        i=min(undecided,key=lambda j:(domains[j].bit_count(),-len(self.adj[j])))
        for value in self.values[domains[i]]:
            branch=domains.copy();branch[i]=1<<value
            if not self.refuted(branch,depth-1):return False
        return True

    def human(self, max_depth=2):
        trail=[];domains=self.initial.copy();passes=0
        while True:
            domains,reason,rounds=self.propagate(domains,trail);passes+=rounds
            if domains is None:return {'solved':False,'reason':reason}
            undecided=[i for i,d in enumerate(domains) if d.bit_count()>1]
            if not undecided:
                return {'solved':True,'maxDepth':max((s['depth'] for s in trail),default=0),'propagationPasses':passes,
                        'techniques':dict(Counter(s['reason'] for s in trail)),'eliminations':len(trail),'trace':trail,
                        'solution':[self.letters[d.bit_length()-1] for d in domains]}
            found=False
            for depth in range(1,max_depth+1):
                for i in undecided:
                    for value in self.values[domains[i]]:
                        trial=domains.copy();trial[i]=1<<value
                        if self.refuted(trial,depth-1):
                            domains[i]&=~(1<<value);trail.append({'index':i,'remove':self.letters[value],'reason':'contradicao_curta','depth':depth})
                            found=True;break
                    if found:break
                if found:break
            if not found:return {'solved':False,'reason':'exige_busca_mais_longa','trace':trail}

def contacts(solution, rows, cols, letters):
    counts={a+b:0 for a,b in combinations(letters,2)};adj=graph(rows,cols)
    for i,a in enumerate(solution):
        for j in adj[i]:
            b=solution[j]
            if j>i and a!=b:counts[''.join(sorted((a,b)))]+=1
    return counts

def connected(solution, adj, letter):
    cells=[i for i,v in enumerate(solution) if v==letter]
    if not cells:return False
    seen={cells[0]};todo=[cells[0]]
    for i in todo:
        for j in adj[i]:
            if solution[j]==letter and j not in seen:seen.add(j);todo.append(j)
    return len(seen)==len(cells)

def random_partition(rows, cols, letters, rng):
    n=rows*cols;adj=graph(rows,cols);solution=[None]*n
    for i,letter in zip(rng.sample(range(n),len(letters)),letters):solution[i]=letter
    while None in solution:
        edges=[(i,j) for i in range(n) if solution[i] is not None for j in adj[i] if solution[j] is None]
        i,j=rng.choice(edges);solution[j]=solution[i]
    # Trocas que conservam conexidade criam reentrâncias, sem impor retângulos.
    for _ in range(n*3):
        i=rng.randrange(n);old=solution[i];new=solution[rng.choice(adj[i])]
        if old==new:continue
        solution[i]=new
        if not connected(solution,adj,old):solution[i]=old
    return solution

def make_fixture(which):
    letters=list('ABC');rows=cols=3
    if which==0:
        fixed={0:'A',1:'A',2:'B',5:'B',7:'A',8:'C'};solution=list('AABAABAAC');targets={'AB':2,'AC':1,'BC':1}
    else:
        fixed={0:'A',2:'B',3:'A',6:'A',7:'A',8:'C'};solution=list('AABABBAAC');targets={'AB':4,'AC':1,'BC':1}
    return {'rows':rows,'cols':cols,'letters':letters,'givens':[fixed.get(i) for i in range(9)],'contacts':targets,'solution':solution,'fixture':f'divisa_{which}'}

def candidate(rows, cols, k, rng, unknown_goal):
    letters=list('ABCD'[:k]);solution=random_partition(rows,cols,letters,rng)
    level={'rows':rows,'cols':cols,'letters':letters,'givens':solution.copy(),'contacts':contacts(solution,rows,cols,letters),'solution':solution}
    # Uma âncora por letra conserva os nomes dos territórios.
    anchors={rng.choice([i for i,v in enumerate(solution) if v==letter]) for letter in letters}
    order=[i for i in range(rows*cols) if i not in anchors];rng.shuffle(order)
    for i in order:
        if level['givens'].count(None)>=unknown_goal:break
        old=level['givens'][i];level['givens'][i]=None
        audit=Solver(level).count()
        if audit['count']!=1 or not audit['exhaustive']:level['givens'][i]=old
    return level

def accepts(level, human, difficulty):
    if not human.get('solved'):return False
    unknown=level['givens'].count(None);depth=human['maxDepth'];tech=human['techniques'];kinds=len(tech)
    if difficulty==0:return 3<=unknown<=5 and depth==0
    if difficulty==1:return unknown>=5 and depth==0 and kinds>=2
    if difficulty==2:return unknown>=5 and (depth==1 or (kinds>=3 and human['propagationPasses']>=3))
    if difficulty==3:return unknown>=8 and depth>=1
    if difficulty==4:return unknown>=10 and depth>=1 and (tech.get('contradicao_curta',0)>=2 or depth==2)
    return unknown>=9 and depth>=1 and len(level['letters'])==4

def generate():
    rng=random.Random(SEED);campaign=[];certificates=[];seen=set();start=time.time()
    plans=[([(3,3),(3,4)],3,5), ([(3,4),(4,4)],3,8), ([(3,4),(4,4)],3,11),
           ([(4,4),(4,5)],3,14), ([(4,5),(5,5)],3,18), ([(4,4),(4,5),(5,5)],4,17)]
    names=['Primeiros contatos','Fronteiras em conjunto','Conexões e alternativas','Passagens disputadas','Limites que se combinam','Quatro territórios']
    for difficulty,needed in enumerate([15,15,15,15,15,5]):
        selected=0;attempts=0
        while selected<needed:
            attempts+=1
            if attempts>1500:raise RuntimeError(f'Não houve candidatos suficientes para a faixa {difficulty}: {selected}/{needed}')
            fixture=(difficulty==0 and selected==0) or (difficulty==2 and selected==0)
            if fixture:level=make_fixture(0 if difficulty==0 else 1)
            else:
                dimensions,k,goal=plans[difficulty];rows,cols=rng.choice(dimensions)
                level=candidate(rows,cols,k,rng,min(rows*cols-k,goal+rng.choice([-1,0,1])))
            signature=canonical(level['solution'],level['rows'],level['cols'])
            if signature in seen:continue
            solver=Solver(level);human=solver.human()
            if not fixture and not accepts(level,human,difficulty):continue
            if not human.get('solved'):raise RuntimeError('Fixture sem trilha lógica')
            audit=solver.count()
            if audit['count']!=1 or not audit['exhaustive'] or audit['solutions'][0]!=level['solution']:continue
            number=len(campaign)+1;identifier=stable_id(level)
            level.update({'id':identifier,'version':1,'game':'divisa','name':f'{names[difficulty]} {selected+1:02d}','difficulty':difficulty,'number':number})
            metrics={key:human[key] for key in ('maxDepth','propagationPasses','techniques','eliminations')}
            metrics.update({'undecided':level['givens'].count(None),'cells':level['rows']*level['cols'],'territories':len(level['letters'])})
            level['logic']=metrics
            certificates.append({'id':identifier,'definition':core(level),'solutionCount':1,'searchExhausted':True,'searchNodes':audit['nodes'],
                                 'canonicalSolution':signature,'metrics':metrics,'trace':human['trace']})
            campaign.append(level);seen.add(signature);selected+=1
            print(f'DIVISA {number:02d}/80 faixa={difficulty} grade={level["rows"]}x{level["cols"]} pendentes={metrics["undecided"]} profundidade={human["maxDepth"]} técnicas={human["techniques"]} tentativas={attempts}',flush=True)
    GAME.mkdir(parents=True,exist_ok=True)
    write_atomic(GAME/'campaign.mjs','// Gerado offline por tools/logica/divisa-generate.py. Não há solver na inicialização.\nexport const CAMPAIGN = '+json.dumps(campaign,ensure_ascii=False,separators=(',',':'))+';\n')
    REPORT.parent.mkdir(parents=True,exist_ok=True)
    write_atomic(REPORT,json.dumps({'game':'divisa','seed':SEED,'levels':80,'symmetryPolicy':'Nenhuma partição final repetida, mesmo sob rotação, reflexão ou renomeação de letras.','humanMethod':'Exclusões por limites de fronteira/conexão; contradição limitada a no máximo duas escolhas. Faixas editoriais, sem teste com jogadores.','certificates':certificates},ensure_ascii=False,indent=2))
    fixtures=[make_fixture(0),make_fixture(1)]
    write_atomic(ROOT/'tests/logica/divisa-fixtures.json',json.dumps(fixtures,ensure_ascii=False,indent=2))
    print(f'Concluído em {time.time()-start:.1f}s',flush=True)

def verify():
    report=json.loads(REPORT.read_text());seen=set()
    for cert in report['certificates']:
        solver=Solver(cert['definition']);audit=solver.count()
        assert audit['count']==1 and audit['exhaustive'],cert['id']
        signature=canonical(audit['solutions'][0],cert['definition']['rows'],cert['definition']['cols'])
        assert signature==cert['canonicalSolution'] and signature not in seen
        seen.add(signature)
        human=solver.human();assert human['solved'] and human['solution']==audit['solutions'][0]
    assert len(seen)==80
    print('DIVISA: 80 definições únicas certificadas novamente, com trilha limitada a duas escolhas.')

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--verify',action='store_true');args=parser.parse_args()
    verify() if args.verify else generate()
