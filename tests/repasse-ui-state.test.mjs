import test from 'node:test';
import assert from 'node:assert/strict';
import {initialState,stateKey,isWon} from '../dist/repasse/engine.mjs';
import {REPASSE_STORAGE_KEY,freshRepasseData,normalizeRepasseData,restoreRepasseSession,serializeRepasseSession,commitRepasseCommand,recordRepasseCompletion,endlessOptions} from '../dist/repasse/ui.mjs';

const example={
  id:1,version:1,rulesVersion:1,rows:2,cols:2,
  pieces:[
    {id:'A',row:0,col:0,value:1,directions:['left','right']},
    {id:'B',row:0,col:1,value:2,directions:['up','down']},
    {id:'C',row:1,col:0,value:3,directions:['up','down']},
    {id:'D',row:1,col:1,value:4,directions:['left','right']}
  ],
  targets:{top:[10,3],bottom:[10,0],left:[1,0],right:[0,7]},
  solution:['A','B','D','C']
};
const join={
  id:2,version:1,rulesVersion:1,rows:1,cols:3,
  pieces:[
    {id:'A',row:0,col:0,value:1,directions:['left','right']},
    {id:'B',row:0,col:1,value:2,directions:['up','down']},
    {id:'C',row:0,col:2,value:3,directions:['left','right']}
  ],
  targets:{top:[0,6,0],bottom:[0,6,0],left:[1],right:[3]},
  solution:['A','C','B']
};
const play=(level,ids)=>ids.reduce((session,id)=>commitRepasseCommand(level,session,id).session,restoreRepasseSession(level,null));

test('uma retirada é uma transação única; eventos repetidos e vazio não criam histórico',()=>{
  const original=restoreRepasseSession(example,null);
  const first=commitRepasseCommand(example,original,'A');
  assert.equal(first.session.cursor,1);
  assert.deepEqual(first.session.states[1],{values:[0,3,3,4],boxes:{top:[0,0],right:[0,0],bottom:[0,0],left:[1,0]}});
  assert.deepEqual(original.states[0],initialState(example));
  assert.equal(commitRepasseCommand(example,first.session,'A').session,first.session);
  assert.equal(commitRepasseCommand(example,first.session,'vazio').session,first.session);
  assert.equal(first.session.commands.length,1);
});

test('retomada reproduz os valores e mantém o futuro de refazer após desfazer',()=>{
  const session=play(example,example.solution);
  assert.equal(isWon(example,session.states[4]),true);
  session.cursor=2;session.assisted=true;session.failures=3;session.winRecorded=true;
  const restored=restoreRepasseSession(example,JSON.parse(JSON.stringify(serializeRepasseSession(example,session))));
  assert.equal(restored.restored,true);assert.equal(restored.cursor,2);
  assert.deepEqual(restored.commands,example.solution);assert.equal(restored.states.length,5);
  assert.deepEqual(restored.states[2],{values:[0,0,3,7],boxes:{top:[0,3],right:[0,0],bottom:[0,0],left:[1,0]}});
  assert.equal(isWon(example,restored.states[4]),true);
  assert.equal(restored.assisted,true);assert.equal(restored.failures,3);assert.equal(restored.winRecorded,true);
});

test('desfazer restaura a peça e todos os repasses juntos; nova hipótese descarta só o futuro',()=>{
  const session=play(example,['A','B']);session.cursor=1;
  const branch=commitRepasseCommand(example,session,'C').session;
  assert.deepEqual(branch.commands,['A','C']);assert.equal(branch.states.length,3);
  assert.deepEqual(session.commands,['A','B']);assert.equal(session.states[2].values[3],7);
  branch.cursor=1;
  const restored=restoreRepasseSession(example,serializeRepasseSession(example,branch));
  assert.equal(stateKey(restored.states[restored.cursor]),stateKey(session.states[1]));
  assert.deepEqual(restored.states[0],initialState(example));
});

test('ordem alternativa é retomada pela mesma regra, sem forçar a solução armazenada',()=>{
  const alternative=play(join,['C','A','B']);
  assert.equal(isWon(join,alternative.states[3]),true);
  alternative.cursor=1;
  const restored=restoreRepasseSession(join,serializeRepasseSession(join,alternative));
  assert.equal(restored.restored,true);assert.deepEqual(restored.commands,['C','A','B']);
  assert.deepEqual(restored.states[1].values,[1,5,0]);
  assert.equal(isWon(join,restored.states[3]),true);
});

test('snapshot adulterado, IDs repetidos, versão ou definição incompatível resetam só a tentativa',()=>{
  const source=serializeRepasseSession(example,play(example,['A','B']));
  const invalids=[
    {...structuredClone(source),state:{...structuredClone(source.state),values:[0,0,3,8]}},
    {...structuredClone(source),commands:['A','A'],cursor:2},
    {...structuredClone(source),rulesVersion:99},
    {...structuredClone(source),levelVersion:2},
    {...structuredClone(source),levelId:2},
    {...structuredClone(source),definition:'outro tabuleiro'},
    {...structuredClone(source),cursor:3}
  ];
  for(const saved of invalids){
    const restored=restoreRepasseSession(example,saved);
    assert.equal(restored.cursor,0);assert.equal(restored.restored,false);
    assert.ok(restored.restoreIssue);assert.deepEqual(restored.states,[initialState(example)]);
  }
  const changed={...example,targets:{...example.targets,top:[11,3]}};
  assert.equal(restoreRepasseSession(changed,source).restored,false);
});

test('campanha e infinito ficam separados, e um registro ruim não apaga conclusões válidas',()=>{
  assert.equal(REPASSE_STORAGE_KEY,'intuicao.repasse.v1');
  const data=normalizeRepasseData({
    version:1,prefs:{advanced:true,coordinates:'sim',autoAdvance:false,unknown:true},
    campaign:{lastId:1,completed:{'1':{firstCompletedAt:'2026-10-25',assisted:false}},sessions:{'1':{commands:'danificado'},'2':serializeRepasseSession(join,play(join,['C']))}},
    endless:{baseSeed:123,startDifficulty:5,number:3,solved:2,current:{level:example,completed:true,session:serializeRepasseSession(example,play(example,example.solution))}},
    learnedConfigurations:['corner','corner','unknown'],
    lastView:{active:true,screen:'play',mode:'endless'}
  });
  assert.deepEqual(data.campaign.completed['1'],{firstCompletedAt:'2026-10-25',assisted:false});
  assert.equal(restoreRepasseSession(example,data.campaign.sessions['1']).cursor,0);
  assert.equal(restoreRepasseSession(join,data.campaign.sessions['2']).cursor,1);
  assert.equal(data.endless.number,3);assert.equal(data.endless.solved,2);assert.equal(data.endless.current.completed,true);
  assert.deepEqual(data.learnedConfigurations,['original','corner']);assert.equal(data.prefs.coordinates,false);
  assert.equal(data.prefs.unknown,undefined);assert.equal(data.lastView.mode,'endless');
  assert.equal(data.campaign.completed['1'].bestMoves,undefined);
});

test('conclusão da campanha é idempotente e mantém a primeira data sem inventar recorde de movimentos',()=>{
  const data=freshRepasseData(),session=play(example,example.solution);
  assert.equal(recordRepasseCompletion(data,example,session,'campaign','first-date'),true);
  assert.equal(recordRepasseCompletion(data,example,session,'campaign','second-date'),false);
  session.cursor=3;assert.equal(recordRepasseCompletion(data,example,session,'campaign'),false);
  session.cursor=4;assert.equal(recordRepasseCompletion(data,example,session,'campaign'),false);
  const reloaded=restoreRepasseSession(example,serializeRepasseSession(example,session));
  assert.equal(recordRepasseCompletion(data,example,reloaded,'campaign'),false);
  assert.deepEqual(data.campaign.completed['1'],{firstCompletedAt:'first-date',assisted:false});
  const anotherAttempt=play(example,example.solution);
  assert.equal(recordRepasseCompletion(data,example,anotherAttempt,'campaign'),false);
  assert.equal(anotherAttempt.winRecorded,true);
});

test('vitória do Endless não é contada de novo ao refazer, recarregar ou recuperar uma tentativa inválida',()=>{
  const data=freshRepasseData();data.endless={solved:4,current:{level:example,completed:false}};
  const session=play(example,example.solution);
  assert.equal(recordRepasseCompletion(data,example,session,'endless'),true);assert.equal(data.endless.solved,5);
  assert.equal(data.endless.current.completed,true);
  const restored=restoreRepasseSession(example,serializeRepasseSession(example,session));
  assert.equal(recordRepasseCompletion(data,example,restored,'endless'),false);
  const recovered=play(example,example.solution);
  assert.equal(recordRepasseCompletion(data,example,recovered,'endless'),false);
  assert.equal(data.endless.solved,5);
  assert.deepEqual(data.campaign.completed,{});
});

test('uma nova resolução sem assistência pode atualizar o marcador sem duplicar a conclusão',()=>{
  const data=freshRepasseData(),assisted=play(join,join.solution);assisted.assisted=true;
  recordRepasseCompletion(data,join,assisted,'campaign','date-a');
  const independent=play(join,['C','A','B']);
  assert.equal(recordRepasseCompletion(data,join,independent,'campaign','date-b'),false);
  assert.deepEqual(data.campaign.completed['2'],{firstCompletedAt:'date-a',assisted:false});
});

test('Endless progride com retomadas e apresenta uma configuração nova por vez',()=>{
  assert.equal(endlessOptions(0,0).difficulty,0);assert.equal(endlessOptions(0,8).difficulty,1);
  assert.equal(endlessOptions(1,4).difficulty,0);
  const first=endlessOptions(7,0);assert.equal(first.introduction,'single');assert.equal(first.difficulty,2);assert.deepEqual(first.allowedConfigurations,['original','single']);
  const second=endlessOptions(7,1,['original','single']);assert.equal(second.introduction,'corner');assert.deepEqual(second.allowedConfigurations,['original','corner']);
  const third=endlessOptions(7,2,['original','single','corner']);assert.equal(third.introduction,'four');assert.deepEqual(third.allowedConfigurations,['original','four']);
  const established=endlessOptions(7,3,['original','single','corner','four']);assert.equal(established.introduction,undefined);assert.equal(established.difficulty,7);assert.equal(established.allowedConfigurations.length,4);
  const recent=Array.from({length:50},(_,i)=>String(i));
  assert.equal(endlessOptions(7,1000,['original','single','corner','four'],recent,recent).recentSignatures.length,24);
  assert.equal(endlessOptions(7,1000,['original','single','corner','four'],recent,recent).recentFamilies.length,24);
});
