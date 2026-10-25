import {RULES_VERSION} from '../dist/orbita/engine.mjs';

export const move = (command,direction = 1) => ({command,direction});
export function exampleLevel() {
  return {
    id:10,version:1,rulesVersion:RULES_VERSION,name:'Preparar, transferir, restaurar',
    cells:[['J',200,150],['A1',125,225],['A2',50,150],['A3',125,75],['B1',275,75],['B2',350,150],['B3',275,225]].map(([id,x,y]) => ({id,x,y})),
    rings:[{id:'A',cells:['J','A1','A2','A3'],step:1},{id:'B',cells:['J','B1','B2','B3'],step:1}],
    pieceTypes:[{id:'n',symbol:'·',name:'neutra'},...['1','2','3'].map(id => ({id,symbol:id,name:id}))],
    initial:{J:'n',A1:'2',A2:'n',A3:'1',B1:'3',B2:'n',B3:'n'},
    targets:{B1:'1',A1:'2',B3:'3'},
    commands:['A','B'].map(id => ({id,label:'anel '+id,turns:[{ring:id,delta:1}],requires:[]})),
    solution:[move('B'),move('A'),move('B'),move('A',-1)],
    hints:['O receptor pode ser preparado antes.','Uma peça correta pode sair e voltar.']
  };
}

export function distinctLevel() {
  const level = exampleLevel();
  level.id = 'distinct';
  level.pieceTypes = Array.from({length:7},(_,i) => ({id:String(i),symbol:String(i),name:String(i)}));
  level.initial = Object.fromEntries(level.cells.map((cell,i) => [cell.id,String(i)]));
  level.targets = {...level.initial};
  delete level.solution;
  return level;
}

export function gearLevel({sensor = false,step = 1} = {}) {
  const ids = ['J1','A1','A2','A3','B1','J2','B3','C1','C2','C3'];
  const initial = Object.fromEntries(ids.map((id,i) => [id,String(i)]));
  return {
    id:'gear',version:1,rulesVersion:RULES_VERSION,
    cells:ids.map((id,i) => ({id,x:i*50,y:100})),
    rings:[{id:'A',cells:['J1','A1','A2','A3'],step},{id:'B',cells:['J1','B1','J2','B3'],step:1},{id:'C',cells:['J2','C1','C2','C3'],step:1}],
    pieceTypes:ids.map((id,i) => ({id:String(i),symbol:String(i),name:String(i)})),
    initial,targets:{...initial},
    commands:[{id:'AC',label:'engrenagem A e C',turns:[{ring:'A',delta:1},{ring:'C',delta:-1}],requires:sensor ? [{cell:'B1',type:initial.B1}] : []},{id:'B',label:'anel B',turns:[{ring:'B',delta:1}]}]
  };
}

export function stepLevel() {
  return {
    id:'step',version:1,rulesVersion:RULES_VERSION,cells:['a','b','c','d'].map((id,i) => ({id,x:i*50,y:100})),
    rings:[{id:'A',cells:['a','b','c','d'],step:2}],
    pieceTypes:['1','2','n'].map(id => ({id,symbol:id,name:id})),
    initial:{a:'1',b:'n',c:'2',d:'n'},targets:{b:'1'},commands:[{id:'A',turns:[{ring:'A',delta:1}]}]
  };
}
