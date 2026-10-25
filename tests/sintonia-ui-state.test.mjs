import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,stateKey,transition,validateLevel,isWon} from '../dist/sintonia/engine.mjs';
import {freshSintoniaData,normalizeSintoniaData,restoreSintoniaSession,serializeSintoniaSession,commitSintoniaCommand,endlessOptions} from '../dist/sintonia/ui.mjs';

const fixture={id:'history-fixture',version:1,rulesVersion:1,boards:[
  {id:'a',animal:'capivara',rows:2,cols:3,walkable:[0,1,4],start:0,goal:1},
  {id:'b',animal:'tuiuiu',rows:2,cols:3,walkable:[0,1,2,4],start:0,goal:4}
]};
const solution=['right','right','left','down','right'];

test('sem efeito não cria histórico nem aumenta movimentos',()=>{
  const initial=restoreSintoniaSession(fixture,null);
  const result=commitSintoniaCommand(fixture,initial,'up');
  assert.equal(result.session,initial);assert.equal(result.transition.changed,false);assert.equal(initial.cursor,0);assert.deepEqual(initial.commands,[]);
});

test('retomada preserva estado, comandos e histórico de refazer',()=>{
  let session=restoreSintoniaSession(fixture,null);
  for(const direction of solution)session=commitSintoniaCommand(fixture,session,direction).session;
  assert.equal(isWon(fixture,session.states.at(-1)),true);
  session.cursor=3;session.assisted=true;session.failures=3;session.winRecorded=true;
  const saved=serializeSintoniaSession(session),restored=restoreSintoniaSession(fixture,JSON.parse(JSON.stringify(saved)));
  assert.equal(restored.cursor,3);assert.deepEqual(restored.commands,solution);assert.equal(restored.states.length,6);
  assert.equal(stateKey(restored.states[3]),stateKey(session.states[3]));assert.equal(isWon(fixture,restored.states[5]),true);
  assert.equal(restored.assisted,true);assert.equal(restored.failures,3);assert.equal(restored.winRecorded,true);
});

test('novo comando depois de desfazer descarta somente o futuro',()=>{
  let session=restoreSintoniaSession(fixture,null);
  for(const direction of solution)session=commitSintoniaCommand(fixture,session,direction).session;
  session.cursor=2;
  const branched=commitSintoniaCommand(fixture,session,'down').session;
  assert.equal(branched.cursor,3);assert.deepEqual(branched.commands,['right','right','down']);assert.equal(branched.states.length,4);
  assert.equal(session.commands.length,5,'o histórico anterior não é mutado');
});

test('caixas, chaves, interruptores e pontes voltam juntos após serialização',()=>{
  const level={id:'mechanism-history',version:1,rulesVersion:1,boards:[
    {id:'a',animal:'capivara',rows:2,cols:3,walkable:[0,1,2,3,4,5],start:0,goal:5,boxes:[{id:'box',cell:1}],gates:[{id:'gate',from:4,to:5,condition:{type:'key',id:'key'}}]},
    {id:'b',animal:'tuiuiu',rows:2,cols:3,walkable:[0,1,2,3,4,5],start:0,goal:3,switches:[{id:'toggle',cell:1,group:'sun'}],keys:[{id:'key',cell:2}],fragile:[4]}
  ]};
  assert.equal(validateLevel(level).valid,true);
  let session=restoreSintoniaSession(level,null);
  for(const direction of ['right','down','right','up'])session=commitSintoniaCommand(level,session,direction).session;
  const state=session.states[session.cursor];
  assert.deepEqual(state.boxes,[{id:'box',board:0,cell:2}]);assert.equal(state.switches.sun,true);assert.deepEqual(state.keys,['key']);assert.deepEqual(state.collapsed,['1:4']);
  const restored=restoreSintoniaSession(level,serializeSintoniaSession(session));
  assert.equal(stateKey(restored.states.at(-1)),stateKey(state));
  assert.deepEqual(restored.states[1].keys,[]);assert.deepEqual(restored.states[1].collapsed,[]);assert.equal(restored.states[1].switches.sun,true);
});

test('snapshot adulterado ou histórico com no-op não é parcialmente retomado',()=>{
  const initial=restoreSintoniaSession(fixture,null);
  let saved=serializeSintoniaSession(initial);saved.commands=['right','right','right'];saved.cursor=2;
  const noOp=restoreSintoniaSession(fixture,saved);assert.equal(noOp.cursor,0);assert.equal(noOp.states.length,1);assert.deepEqual(noOp.commands,[]);
  saved=serializeSintoniaSession(commitSintoniaCommand(fixture,initial,'right').session);saved.state.positions=[4,4];
  const altered=restoreSintoniaSession(fixture,saved);assert.equal(altered.cursor,0);assert.equal(stateKey(altered.states[0]),stateKey(initialState(fixture)));
  saved.rulesVersion=99;assert.equal(restoreSintoniaSession(fixture,saved).cursor,0);
});

test('normalização preserva resultados próprios e não inventa contas ou progresso',()=>{
  assert.deepEqual(normalizeSintoniaData(null),freshSintoniaData());
  const value={version:1,prefs:{advanced:true,coordinates:'sim',unknown:true},campaign:{lastId:'s-1',completed:{'s-1':{moves:5}},sessions:{}},learnedMechanics:['walls','walls','unknown'],events:Array.from({length:550},(_,id)=>({id})),lastView:{active:true,screen:'play',mode:'endless'}};
  const data=normalizeSintoniaData(value);assert.equal(data.prefs.advanced,true);assert.equal(data.prefs.coordinates,false);assert.equal(data.prefs.unknown,undefined);
  assert.deepEqual(data.learnedMechanics,['walls']);assert.equal(data.events.length,500);assert.equal(data.campaign.completed['s-1'].moves,5);assert.equal(data.lastView.mode,'endless');
});

test('Endless cresce com interlúdios e mantém teto finito',()=>{
  assert.equal(endlessOptions(0,0).difficulty,0);assert.equal(endlessOptions(0,8).difficulty,1);
  assert.equal(endlessOptions(2,4).difficulty,1);assert.equal(endlessOptions(2,5).difficulty,2);
  assert.equal(endlessOptions(5,1000).difficulty,5);assert.equal(endlessOptions(4,3).animals,2);
  assert.equal(endlessOptions(1,7,['walls','plate'],Array.from({length:100},(_,i)=>String(i))).recentSignatures.length,24);
});

test('famílias recentes persistem com limite e sessões anteriores continuam compatíveis',()=>{
  const current={level:{...fixture,family:'wall-adjust'},session:serializeSintoniaSession(restoreSintoniaSession(fixture,null))};
  const legacy={version:1,endless:{version:1,baseSeed:123,startDifficulty:2,number:7,solved:4,recentSignatures:['first','second'],current}};
  const migrated=normalizeSintoniaData(legacy);
  assert.deepEqual(migrated.endless.recentFamilies,['wall-adjust']);
  assert.deepEqual(migrated.endless.current,current);assert.equal(migrated.endless.number,7);assert.equal(migrated.endless.solved,4);
  const families=Array.from({length:40},(_,i)=>`family-${i}`);
  const recent=normalizeSintoniaData({...legacy,endless:{...legacy.endless,recentFamilies:[null,...families,42]}});
  assert.deepEqual(recent.endless.recentFamilies,families.slice(-24));
  const options=endlessOptions(2,4,['walls'],['first','second'],[null,...families,42]);
  assert.deepEqual(options.recentFamilies,families.slice(-24));assert.deepEqual(options.recentSignatures,['first','second']);
  options.recentFamilies.push('candidate-family');assert.equal(families.length,40,'opções não alteram o histórico original');
  assert.deepEqual(endlessOptions(0,0).recentFamilies,[]);
});
