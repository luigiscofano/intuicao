import test from 'node:test';
import assert from 'node:assert/strict';
import {DIRECTIONS, SIDES, configurationOf, validateLevel, validateState, initialState, preview, transition, evaluateState, isWon, stateKey, replay, solve, createSimulator} from '../dist/repasse/engine.mjs';
import {certifiedSuffix, analyzePosition, hintFromSolution, verifyGenerated} from '../dist/repasse/analysis.mjs';

const H = ['left','right'], V = ['up','down'];
const piece = (id,row,col,value,directions) => ({id,row,col,value,directions:[...directions]});
const boxes = (rows,cols) => ({top:Array(cols).fill(0),bottom:Array(cols).fill(0),left:Array(rows).fill(0),right:Array(rows).fill(0)});
const fixture = (id,rows,cols,pieces,targets=boxes(rows,cols),solution=[]) => ({id,version:1,rulesVersion:1,rows,cols,pieces,targets,solution});
const A = fixture('reference-a',2,2,[piece('A',0,0,1,H),piece('B',0,1,2,V),piece('D',1,0,3,V),piece('C',1,1,4,H)],{top:[10,3],bottom:[10,0],left:[1,0],right:[0,7]},['A','B','C','D']);
const makeB = (name,left,right,center,solution) => fixture(name,1,3,[piece('A',0,0,1,H),piece('B',0,1,2,V),piece('C',0,2,3,H)],{top:[0,center,0],bottom:[0,center,0],left:[left],right:[right]},solution);
const B = [makeB('juntar',1,3,6,['A','C','B']),makeB('hora',4,3,3,['A','B','C']),makeB('passagem',5,4,2,['B','A','C'])];
const C = fixture('reference-c',3,3,[piece('D',0,0,1,V),piece('B',0,2,1,H),piece('F',1,0,1,H),piece('A',1,2,1,V),piece('E',2,0,1,V),piece('C',2,2,1,H)],{top:[3,0,0],bottom:[3,0,0],left:[0,7,0],right:[2,7,2]},['A','B','D','C','E','F']);
const permutations = values => !values.length ? [[]] : values.flatMap((value,i)=>permutations(values.filter((_,j)=>i!==j)).map(rest=>[value,...rest]));
const total = state => [...state.values,...SIDES.flatMap(s=>state.boxes[s])].reduce((sum,v)=>sum+v,0);
const freeze = value => {if(value&&typeof value==='object'){for(const v of Object.values(value))freeze(v);Object.freeze(value);}return value;};

// Independent reference implementation: walk one grid cell at a time. It does
// not use production rays, transition, stateKey, victory or pruning functions.
function oracle(level,order,start) {
  const pieces = level.pieces.map((p,i)=>({...structuredClone(p),value:start?start.values[i]:p.value}));
  const targets = start?structuredClone(start.boxes):boxes(level.rows,level.cols);
  const values=[];
  for(const id of order){
    const current=pieces.find(p=>p.id===id);
    assert.ok(current&&current.value>0);
    const value=current.value;values.push(value);current.value=0;
    for(const direction of current.directions){
      const [dr,dc]=({up:[-1,0],right:[0,1],down:[1,0],left:[0,-1]})[direction];
      let row=current.row+dr,col=current.col+dc,receiver=null;
      while(row>=0&&row<level.rows&&col>=0&&col<level.cols){receiver=pieces.find(p=>p.row===row&&p.col===col&&p.value>0);if(receiver)break;row+=dr;col+=dc;}
      if(receiver)receiver.value+=value;
      else {const side=({up:'top',right:'right',down:'bottom',left:'left'})[direction];targets[side][dc?current.row:current.col]+=value;}
    }
  }
  const state={values:pieces.map(p=>p.value),boxes:targets};
  const solved=state.values.every(v=>v===0)&&SIDES.every(s=>targets[s].every((v,i)=>v===level.targets[s][i]));
  return {state,solved,values};
}

for(const [label,level,count,removed] of [['A',A,1,[1,3,7,10]],['B juntar',B[0],2,[1,3,6]],['B hora',B[1],1,[1,3,3]],['B passagem',B[2],1,[2,1,4]],['C',C,6,[1,2,3,2,3,7]]]){
  test(`referência ${label}: valores, metas e ${count} ordens vencedoras por oráculo independente`,()=>{
    assert.equal(validateLevel(level).valid,true);
    const witness=replay(level,level.solution);
    assert.equal(witness.valid,true);assert.equal(witness.solved,true);
    assert.deepEqual(witness.steps.map(s=>s.removed.value),removed);
    assert.deepEqual(witness.state,oracle(level,level.solution).state);
    const orders=permutations(level.pieces.map(p=>p.id));
    let wins=0;
    for(const order of orders){const expected=oracle(level,order),actual=replay(level,order);assert.deepEqual(actual.state,expected.state);assert.equal(actual.solved,expected.solved);wins+=expected.solved;}
    assert.equal(wins,count);
    assert.equal(solve(level,undefined,{timeoutMs:Infinity}).status,'solved');
  });
}

test('as seis soluções de reencontro respeitam todas as dependências, permitindo permutações independentes',()=>{
  const winners=permutations(C.pieces.map(p=>p.id)).filter(order=>oracle(C,order).solved);
  for(const order of winners)for(const [a,b] of [['A','B'],['A','C'],['B','D'],['C','E'],['D','F'],['E','F']])assert.ok(order.indexOf(a)<order.indexOf(b));
  assert.equal(winners.length,6);
  for(const order of winners){const state=oracle(C,order.slice(0,3)).state;const result=analyzePosition(C,state,{timeoutMs:Infinity});assert.equal(result.status,'solved');assert.equal(oracle(C,result.solution,state).solved,true);}
});

test('onze configurações permitidas enviam valor integral, sem retirada automática do receptor',()=>{
  const configurations=[...DIRECTIONS.map(d=>[d]),H,V,['up','right'],['right','down'],['down','left'],['left','up'],DIRECTIONS];
  for(const directions of configurations){
    const level=fixture('arrows',3,3,[piece('center',1,1,3,directions),piece('up',0,1,1,H),piece('right',1,2,1,V),piece('down',2,1,1,H),piece('left',1,0,1,V)]);
    const before=initialState(level),next=transition(level,before,'center');
    assert.equal(next.removed.value,3);assert.equal(next.transfers.length,directions.length);
    for(let i=1;i<level.pieces.length;i++)assert.equal(next.state.values[i],directions.includes(level.pieces[i].id)?4:1);
    assert.equal(next.state.values.filter(v=>v>0).length,4);
    assert.equal(total(next.state)-total(before),(directions.length-1)*3);
    assert.deepEqual(next.state,oracle(level,['center']).state);
  }
});

test('primeiro receptor interrompe a emissão, espaços vazios são atravessados e setas só definem a saída',()=>{
  const level=fixture('receivers',1,5,[piece('A',0,0,3,['right']),piece('B',0,2,4,V),piece('C',0,4,5,H)]);
  const before=freeze(initialState(level)),first=transition(freeze(level),before,'A');
  assert.deepEqual(first.state.values,[0,7,5]);assert.deepEqual(first.state.boxes,boxes(1,5));
  assert.deepEqual(first.transfers[0].to,{kind:'piece',id:'B',index:1,row:0,col:2});
  const second=transition(level,first.state,'B');assert.equal(second.state.boxes.top[2],7);assert.equal(second.state.boxes.bottom[2],7);assert.equal(second.state.values[2],5);
  const third=transition(level,second.state,'C');assert.equal(third.state.boxes.left[0],5);assert.equal(third.state.boxes.right[0],5);
});

test('cantos nunca fundem as quatro caixas de uma grade 1×1',()=>{
  const level=fixture('four-corners',1,1,[piece('A',0,0,7,DIRECTIONS)],{top:[7],bottom:[7],left:[7],right:[7]},['A']);
  const result=transition(level,initialState(level),'A');assert.equal(result.transfers.length,4);assert.equal(result.result.won,true);
  for(const side of SIDES)assert.deepEqual(result.state.boxes[side],[7]);
});

test('prévia é pura e coincide com todos os repasses atômicos da retirada',()=>{
  const before=freeze(initialState(C)),key=stateKey(before),hint=preview(C,before,'A'),result=transition(C,before,'A');
  assert.equal(stateKey(before),key);assert.deepEqual(hint,result.transfers);
  assert.equal(result.state.values[C.pieces.findIndex(p=>p.id==='A')],0);
  assert.notEqual(result.state,before);assert.notEqual(result.state.values,before.values);
  for(const side of SIDES)assert.notEqual(result.state.boxes[side],before.boxes[side]);
  const saved=structuredClone(before),later=transition(C,result.state,'B');
  assert.notEqual(stateKey(later.state),key);assert.deepEqual(preview(C,saved,'A'),hint);assert.equal(stateKey(saved),key);
});

test('um desfazer por snapshot restaura juntos valor emissor, todos os receptores e caixas',()=>{
  const level=fixture('atomic-undo',2,2,[piece('A',0,0,2,DIRECTIONS),piece('B',0,1,3,V),piece('C',1,0,4,H)]);
  const history=[initialState(level)],first=transition(level,history[0],'A');history.push(first.state);
  assert.deepEqual(first.state.values,[0,5,6]);assert.deepEqual(first.state.boxes.top,[2,0]);assert.deepEqual(first.state.boxes.left,[2,0]);
  history.pop();assert.deepEqual(history.at(-1),initialState(level));
  assert.deepEqual(evaluateState(level,history.at(-1)),evaluateState(level,initialState(level)));
});

test('retirada repetida ou ID vazio não muda estado, caixas ou contador implícito',()=>{
  const first=transition(A,initialState(A),'A');
  for(const id of ['A','inexistente','',null,0]){const next=transition(A,first.state,id);assert.equal(next.changed,false);assert.equal(next.state,first.state);assert.equal(next.removed,null);assert.deepEqual(next.transfers,[]);assert.equal(next.result.remaining,3);}
  const duplicate=replay(A,['A','A']);assert.equal(duplicate.valid,false);assert.equal(duplicate.steps.length,1);assert.deepEqual(duplicate.state,first.state);
});

test('vitória exige tabuleiro vazio e todas as metas exatas; metas zero são objetivos reais',()=>{
  const level=fixture('goals',1,1,[piece('A',0,0,1,H)],{top:[0],bottom:[0],left:[1],right:[2]});
  assert.equal(evaluateState(level,initialState(level)).won,false);
  const state=transition(level,initialState(level),'A').state;assert.equal(evaluateState(level,state).status,'exhausted');assert.equal(isWon(level,state),false);
  const zero=fixture('zero',1,1,[piece('A',0,0,1,H)]);assert.equal(evaluateState(zero,initialState(zero)).status,'playing');
  const overflow=transition(zero,initialState(zero),'A');assert.equal(overflow.result.status,'overrun');assert.deepEqual(overflow.result.overruns.map(x=>x.side),['right','left']);
});

test('excesso não impede novas hipóteses nem reiniciar a mesma definição',()=>{
  const state=initialState(B[0]);let next=transition(B[0],state,'C');next=transition(B[0],next.state,'A');next=transition(B[0],next.state,'B');assert.equal(next.result.won,true);
  const wrong=transition(B[0],state,'B');const following=transition(B[0],wrong.state,'A');const ending=transition(B[0],following.state,'C');assert.equal(following.changed,true);assert.equal(ending.changed,true);assert.equal(ending.result.won,false);
  assert.deepEqual(initialState(B[0]),state);
});

test('chave de busca distingue valores e acumulados, mesmo com a mesma ocupação',()=>{
  const level=fixture('keys',1,3,[piece('A',0,0,1,H),piece('B',0,1,2,H),piece('C',0,2,3,H)]);
  const first=replay(level,['A','B']).state,second=replay(level,['B','A']).state;
  assert.deepEqual(first.values.map(Boolean),second.values.map(Boolean));assert.notDeepEqual(first.values,second.values);assert.notEqual(stateKey(first),stateKey(second));
  const different=structuredClone(first);different.boxes.left[0]++;assert.notEqual(stateKey(first),stateKey(different));
});

test('validação rejeita posições, direções, formatos e números inválidos',()=>{
  const mutations=[l=>l.pieces[0].value=0,l=>l.pieces[0].value=-1,l=>l.pieces[0].value=1.5,l=>l.pieces[0].value=Number.MAX_SAFE_INTEGER+1,l=>l.pieces[0].row=-1,l=>l.pieces[0].col=2,l=>l.pieces[0].directions=['up','up'],l=>l.pieces[0].directions=['up','right','down'],l=>l.pieces[0].directions=['diagonal'],l=>l.pieces[0].directions=Array(2),l=>l.pieces[1].id=l.pieces[0].id,l=>l.pieces[1].col=l.pieces[0].col,l=>l.targets.top=[1],l=>l.targets.top=Array(2),l=>l.targets.left[0]=-1,l=>l.targets.right[0]=1.2,l=>l.rulesVersion=2,l=>l.version=2,l=>l.id=0];
  for(const mutate of mutations){const level=structuredClone(A);mutate(level);assert.equal(validateLevel(level).valid,false);}
  assert.equal(validateLevel(null).valid,false);assert.equal(validateLevel({}).valid,false);
  const state=initialState(A);state.values[1]=1;assert.equal(validateState(A,state).valid,false);
  state.values[1]=2;state.boxes.top[0]=.5;assert.equal(validateState(A,state).valid,false);
  assert.throws(()=>transition(A,state,'A'),TypeError);
});

test('aritmética mantém o inteiro seguro completo e rejeita definições que podem transbordar',()=>{
  const value=Number.MAX_SAFE_INTEGER;
  const single=fixture('safe',1,1,[piece('A',0,0,value,['right'])],{top:[0],bottom:[0],left:[0],right:[value]},['A']);
  assert.equal(validateLevel(single).valid,true);assert.equal(replay(single,['A']).state.boxes.right[0],value);assert.equal(replay(single,['A']).solved,true);
  const unsafe=structuredClone(single);unsafe.pieces[0].directions=H;assert.equal(validateLevel(unsafe).valid,false);
  const two=4503599627370495,paired=fixture('safe-pair',1,1,[piece('A',0,0,two,H)],{top:[0],bottom:[0],left:[two],right:[two]},['A']);
  assert.equal(replay(paired,['A']).solved,true);assert.equal(total(replay(paired,['A']).state),9007199254740990);
});

test('um estado sem excesso ainda pode estar comprovadamente sem solução',()=>{
  const state=transition(B[0],initialState(B[0]),'B').state;
  assert.deepEqual(evaluateState(B[0],state).overruns,[]);
  const result=analyzePosition(B[0],state,{timeoutMs:Infinity});assert.equal(result.status,'unsolvable');assert.equal(result.reason,'no-future-emitter');
  assert.equal(permutations(['A','C']).some(order=>oracle(B[0],order,state).solved),false);
});

test('limites de estados/tempo são inconclusivos, nunca impossibilidade inventada',()=>{
  assert.equal(solve(A,initialState(A),{maxStates:0,timeoutMs:Infinity}).status,'inconclusive');
  assert.equal(solve(A,initialState(A),{maxStates:1000,timeoutMs:0}).status,'inconclusive');
  const invalid=initialState(A);invalid.values[0]=-1;assert.equal(solve(A,invalid).status,'inconclusive');
  const wrong=transition(B[0],initialState(B[0]),'B').state;assert.equal(solve(B[0],wrong,{maxStates:0,timeoutMs:0}).status,'unsolvable');
});

test('dicas partem de ordens alternativas e certificam a continuação desde o estado atual',()=>{
  const alternate=transition(B[0],initialState(B[0]),'C').state;
  assert.equal(certifiedSuffix(B[0],alternate),null);
  assert.equal(analyzePosition(B[0],alternate,{allowSearch:false}).status,'inconclusive');
  const result=analyzePosition(B[0],alternate,{timeoutMs:Infinity});assert.equal(result.status,'solved');assert.deepEqual(result.solution,['A','B']);
  for(let tier=1;tier<=3;tier++){const hint=hintFromSolution(B[0],alternate,result.solution,tier);assert.ok(hint.text.length>20);if(tier<3)assert.equal(hint.pieceId,undefined);else {assert.equal(hint.pieceId,'A');assert.match(hint.text,/linha 1, coluna 1/);assert.ok(preview(B[0],alternate,hint.pieceId).length);}}
  const bad=hintFromSolution(B[0],alternate,['B','A'],3);assert.equal(bad.pieceId,undefined);assert.match(bad.text,/Não há uma continuação confirmada/);
});

test('sufixo certificado exige estado completo e testemunha final vencedora',()=>{
  const state=replay(A,['A','B']).state;
  const result=analyzePosition(A,state,{allowSearch:false});assert.equal(result.source,'replayed-witness');assert.deepEqual(result.solution,['C','D']);assert.equal(result.visited,0);
  const changed=structuredClone(state);changed.boxes.left[0]=0;assert.equal(certifiedSuffix(A,changed),null);
  const falseWitness=structuredClone(A);falseWitness.solution=['D','C','B','A'];assert.equal(certifiedSuffix(falseWitness,initialState(falseWitness)),null);
  assert.throws(()=>verifyGenerated({level:falseWitness}));assert.equal(verifyGenerated({level:A}).validation.replay,true);
});

test('simulador preparado usa a mesma regra e mantém um snapshot da definição',()=>{
  const level=structuredClone(A),simulation=createSimulator(level),before=simulation.initialState();level.pieces[0].directions=['down'];level.targets.left[0]=999;
  const expected=transition(A,initialState(A),'A'),actual=simulation.transition(before,'A');assert.deepEqual(actual,expected);assert.deepEqual(simulation.preview(before,'A'),expected.transfers);
  assert.equal(simulation.validateState(actual.state).valid,true);assert.equal(simulation.stateKey(actual.state),stateKey(expected.state));
});

let seed=7139;
const random=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n;};
const variants=[H,V,['up'],['right'],['down'],['left'],['up','right'],['right','down'],['down','left'],['left','up'],DIRECTIONS];
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=random(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};
test('200 tabuleiros e ordens independentes conferem conservação e aritmética de todas as configurações',()=>{
  for(let trial=0;trial<200;trial++){
    const cells=shuffle(Array.from({length:9},(_,i)=>i)),n=2+random(6);
    const level=fixture(`random-${trial}`,3,3,cells.slice(0,n).map((cell,i)=>piece(`p${i}`,Math.floor(cell/3),cell%3,1+random(5),variants[random(variants.length)])));
    let state=initialState(level);const order=shuffle(level.pieces.map(p=>p.id));
    for(const id of order){const before=state,result=transition(level,state,id);state=result.state;const k=level.pieces.find(p=>p.id===id).directions.length;assert.equal(total(state)-total(before),(k-1)*result.removed.value);assert.equal(validateState(level,state).valid,true);}
    assert.deepEqual(state,oracle(level,order).state);
  }
});

test('solver e podas concordam com enumeração independente em posições parciais de 60 fases pequenas',()=>{
  for(let trial=0;trial<60;trial++){
    const cells=shuffle(Array.from({length:6},(_,i)=>i)),n=3+random(3);
    const level=fixture(`search-${trial}`,2,3,cells.slice(0,n).map((cell,i)=>piece(`p${i}`,Math.floor(cell/3),cell%3,1+random(3),variants[random(variants.length)])));
    level.solution=shuffle(level.pieces.map(p=>p.id));level.targets=oracle(level,level.solution).state.boxes;
    const prefix=shuffle(level.pieces.map(p=>p.id)).slice(0,random(n));const state=oracle(level,prefix).state;
    const left=level.pieces.filter((_,i)=>state.values[i]>0).map(p=>p.id);
    const possible=permutations(left).some(order=>oracle(level,order,state).solved),answer=solve(level,state,{maxStates:100000,timeoutMs:Infinity});
    assert.equal(answer.status,possible?'solved':'unsolvable',`trial ${trial}`);
    if(possible)assert.equal(oracle(level,answer.solution,state).solved,true);
  }
});
