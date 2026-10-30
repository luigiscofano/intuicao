import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPAIGN} from '../dist/orbita/campaign.mjs';
import {initialState,stateKey,isWon,transition,commandStatus} from '../dist/orbita/engine.mjs';
import {analyzePosition} from '../dist/orbita/analysis.mjs';
import {ORBITA_STORAGE_KEY,freshOrbitaData,normalizeOrbitaData,restoreOrbitaSession,serializeOrbitaSession,commitOrbitaCommand,recordOrbitaCompletion,endlessOptions,movementPoint,ringPath,validateOrbitaPresentation,computeOrbitaBadgeLayout} from '../dist/orbita/ui.mjs';

const example=CAMPAIGN.find(level=>level.id===10);
const play=(level,moves)=>moves.reduce((session,move)=>commitOrbitaCommand(level,session,move).session,restoreOrbitaSession(level,null));

test('quatro comandos do tutorial correspondem a quatro transações reversíveis',()=>{
  const session=play(example,example.solution);
  assert.equal(session.cursor,4);assert.equal(session.commands.length,4);assert.equal(session.states.length,5);
  assert.deepEqual(session.states[0],initialState(example));assert.equal(isWon(example,session.states[4]),true);
  session.cursor=2;assert.equal(session.states[2].moves,2);
  const restored=restoreOrbitaSession(example,JSON.parse(JSON.stringify(serializeOrbitaSession(example,session))));
  assert.equal(restored.restored,true);assert.equal(restored.cursor,2);assert.deepEqual(restored.commands,example.solution);
  assert.equal(isWon(example,restored.states[4]),true);
});

test('ramificar depois de desfazer remove só o futuro de refazer',()=>{
  const session=play(example,example.solution);session.cursor=1;
  const command={command:example.solution[0].command,direction:-example.solution[0].direction};
  const branch=commitOrbitaCommand(example,session,command).session;
  assert.equal(branch.cursor,2);assert.equal(branch.states.length,3);assert.equal(session.states.length,5);
  assert.equal(stateKey(branch.states[2]),stateKey(initialState(example)));
  assert.equal(branch.states[2].moves,2);assert.deepEqual(branch.commands,[example.solution[0],command]);
});

test('snapshots adulterados ou incompatíveis recuperam só a tentativa atual',()=>{
  const valid=serializeOrbitaSession(example,play(example,example.solution.slice(0,2)));
  const states=[{...structuredClone(valid),cursor:99},{...structuredClone(valid),rulesVersion:'outra'},{...structuredClone(valid),definition:'outra fase'},{...structuredClone(valid),levelId:500},{...structuredClone(valid),state:{...valid.state,moves:27}},{...structuredClone(valid),commands:[{command:'ausente',direction:1}]}];
  for(const saved of states){const recovered=restoreOrbitaSession(example,saved);assert.equal(recovered.restored,false);assert.equal(recovered.cursor,0);assert.deepEqual(recovered.states,[initialState(example)]);assert.ok(recovered.restoreIssue);}
  const data=normalizeOrbitaData({campaign:{lastId:10,completed:{10:{firstCompletedAt:'hoje',assisted:false}},sessions:{10:states[0]}}});
  assert.ok(data.legacyCampaignArchive[0].campaign.completed[10]);assert.equal(data.campaign.lastId,null);assert.equal(data.campaign.completed[10],undefined);
});

test('engrenagem e sensor persistem como comandos atômicos',()=>{
  const gear=CAMPAIGN.find(level=>level.commands.some(command=>command.turns.length>1));
  const sensor=CAMPAIGN.find(level=>level.commands.some(command=>command.requires?.length));
  assert.ok(gear);assert.ok(sensor);
  for(const level of [gear,sensor]){
    const session=play(level,level.solution);session.cursor=Math.floor(session.commands.length/2);session.failures=3;session.assisted=true;
    const restored=restoreOrbitaSession(level,serializeOrbitaSession(level,session));
    assert.equal(restored.restored,true);assert.equal(stateKey(restored.states[restored.cursor]),stateKey(session.states[session.cursor]));
    for(const command of level.commands)assert.equal(commandStatus(level,restored.states[restored.cursor],command.id).allowed,commandStatus(level,session.states[session.cursor],command.id).allowed);
    assert.equal(isWon(level,restored.states.at(-1)),true);assert.equal(restored.failures,3);assert.equal(restored.assisted,true);
  }
});

test('giro bloqueado não altera o histórico nem o número de verificações',()=>{
  const level=CAMPAIGN.find(candidate=>candidate.commands.some(command=>!commandStatus(candidate,initialState(candidate),command.id).allowed));
  assert.ok(level);const session=restoreOrbitaSession(level,null),command=level.commands.find(command=>!commandStatus(level,session.states[0],command.id).allowed);
  const result=commitOrbitaCommand(level,session,{command:command.id,direction:1});
  assert.equal(result.session,session);assert.equal(result.transition.allowed,false);assert.equal(session.failures,0);
  const legal=level.commands.find(command=>commandStatus(level,session.states[0],command.id).allowed);
  assert.equal(commitOrbitaCommand(level,session,{command:legal.id,direction:1}).session.failures,0);
});

test('campanha registra vitória uma vez, inclusive após recarregar e refazer',()=>{
  const data=freshOrbitaData(),session=play(example,example.solution);session.assisted=true;
  assert.equal(recordOrbitaCompletion(data,example,session,'campaign','first'),true);
  assert.equal(recordOrbitaCompletion(data,example,session,'campaign','second'),false);
  session.cursor=2;assert.equal(recordOrbitaCompletion(data,example,session,'campaign'),false);
  session.cursor=4;const restored=restoreOrbitaSession(example,serializeOrbitaSession(example,session));assert.equal(recordOrbitaCompletion(data,example,restored,'campaign'),false);
  const independent=play(example,example.solution);assert.equal(recordOrbitaCompletion(data,example,independent,'campaign'),false);
  assert.deepEqual(data.campaign.completed[10],{firstCompletedAt:'first',assisted:false});
});

test('Endless conserva definição e seed e não duplica conclusões na recuperação',()=>{
  const data=freshOrbitaData();data.endless={baseSeed:123,number:4,solved:3,current:{level:example,seed:456,generatorVersion:'orbita-generator-1',completed:false}};
  const session=play(example,example.solution);assert.equal(recordOrbitaCompletion(data,example,session,'endless'),true);
  const normalized=normalizeOrbitaData(JSON.parse(JSON.stringify(data)));
  assert.equal(normalized.endless.current.seed,456);assert.deepEqual(normalized.endless.current.level,example);
  const recovered=play(example,example.solution);assert.equal(recordOrbitaCompletion(normalized,example,recovered,'endless'),false);
  assert.equal(normalized.endless.solved,4);assert.deepEqual(normalized.campaign.completed,{});assert.equal(ORBITA_STORAGE_KEY,'intuicao.orbita.v1');
});

test('aconselhamento depois de giros livres usa o histórico atual',()=>{
  const moves=[...example.solution.slice(0,2),{command:'A',direction:1},{command:'B',direction:-1}];
  const session=play(example,moves);session.cursor=3;
  const restored=restoreOrbitaSession(example,serializeOrbitaSession(example,session));
  const result=analyzePosition(example,restored.states[3],{history:restored.commands.slice(0,3),initialSolution:example.solution,allowSearch:false});
  assert.equal(result.status,'solved');let state=restored.states[3];for(const move of result.solution)state=transition(example,state,move).state;assert.equal(isWon(example,state),true);
});

test('animação percorre o círculo e termina exatamente na casa lógica',()=>{
  const result=transition(example,initialState(example),{command:'A',direction:1});
  const movement=result.movements.find(item=>item.from==='J'),ring=example.rings.find(item=>item.id==='A');
  const middle=movementPoint(example,movement,.5),end=movementPoint(example,movement,1),target=example.cells.find(cell=>cell.id===movement.to);
  assert.ok(Math.abs(Math.hypot(middle.x-ring.geometry.cx,middle.y-ring.geometry.cy)-ring.geometry.r)<.00001);
  assert.deepEqual(end,{x:target.x,y:target.y});assert.ok(ringPath(example,ring).includes(' A '));
  assert.equal(example.targets.Abaixo,'2');
});

test('progressão Endless é limitada, retoma conceitos e conserva janela recente',()=>{
  assert.equal(endlessOptions(0,0).difficulty,0);assert.equal(endlessOptions(0,10).difficulty,1);
  assert.equal(endlessOptions(4,5).difficulty,3);assert.equal(endlessOptions(4,90).difficulty,4);
  const values=Array.from({length:45},(_,i)=>String(i));const options=endlessOptions(4,90,values,values);
  assert.equal(options.recentSignatures.length,30);assert.equal(options.recentFamilies.length,30);
});

test('apresentação de todas as fases mantém casas, trilhos, alvos e sensores dentro da área',()=>{
  assert.equal(CAMPAIGN.length,80);
  for(const level of CAMPAIGN){const checked=validateOrbitaPresentation(level);assert.equal(checked.valid,true,'fase '+level.id+': '+checked.errors.join(' '));}
});

test('importação visual rejeita coordenadas ausentes, raios inválidos e atributos que quebrariam SVG',()=>{
  const edits=[
    level=>delete level.cells[0].x,
    level=>level.cells[0].y=NaN,
    level=>level.cells[0].x='0" onload="algo',
    level=>level.cells[0].x=-50,
    level=>level.cells[0].x=level.layout.width+100,
    level=>level.layout.width=Infinity,
    level=>level.layout.height=0,
    level=>level.layout.pieceRadius='19px',
    level=>level.rings[0].geometry.rx=0,
    level=>level.rings[0].geometry.cy='centro',
    level=>level.rings[0].geometry.ry=Infinity,
    level=>level.rings[0].geometry.cx=level.layout.width+300,
    level=>level.cells[0].x+=20,
    level=>level.rings[0].cells.reverse(),
    level=>level.rings[0].cells[0]='ausente'
  ];
  for(const edit of edits){const level=structuredClone(example);edit(level);const checked=validateOrbitaPresentation(level);assert.equal(checked.valid,false);assert.ok(checked.errors.length);}
  assert.equal(validateOrbitaPresentation(null).valid,false);
});

test('sensores de todas as novas fases recebem espaço próprio sem cobrir alvos',()=>{
  const sensors=CAMPAIGN.filter(l=>l.commands.some(c=>c.requires.length));assert.ok(sensors.length>0);
  for(const level of sensors){
    const number=level.editorialLevel,layout=computeOrbitaBadgeLayout(level);assert.equal(layout.valid,true);assert.ok(layout.sensors.length);
    for(const sensor of layout.sensors){
      assert.ok(sensor.x>=0&&sensor.y>=0&&sensor.x+sensor.width<=level.layout.width&&sensor.y+sensor.height<=level.layout.height);
      for(const target of layout.targets){const overlaps=sensor.x<target.x+target.width&&sensor.x+sensor.width>target.x&&sensor.y<target.y+target.height&&sensor.y+sensor.height>target.y;assert.equal(overlaps,false,'fase '+number+', '+sensor.cell+' e '+target.cell);}
      assert.ok(sensor.connector);
    }
  }
});
