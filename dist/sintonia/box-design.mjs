/** Role-first box compositions. Ordinary terrain only; these are content, not rules. */
const animals=['capivara','tuiuiu','bemtevi','mico'];
const pick=(rng,values)=>values[Math.floor(rng()*values.length)];
const copy=value=>JSON.parse(JSON.stringify(value));
const gate=(id,from,to,plate)=>({id,from,to,condition:{type:'plate',id:plate}});
export const BOX_PATTERNS=Object.freeze(['turn-and-support','park-and-retrieve','support-then-release','remote-relay','support-and-necessary-stop']);
const TEXT={
 'support-and-necessary-stop':{name:'Apoio e espera',lesson:'Depois de sustentar a passagem, use a mesma caixa como bloqueio para alinhar o outro animal.',discovery:'Aqui o jogador precisa descobrir que a caixa deve sustentar uma travessia e depois impedir um empurrão para separar os movimentos finais.',hints:['Compare a direção da última subida nos dois tabuleiros.','A caixa pode manter a placa e também segurar quem tenta empurrá-la contra uma parede.','Depois de apoiar a caixa, alcance a face que permite esperar enquanto o outro animal faz sua aproximação final.'],boxRoles:['reorientar','sustentar','bloquear-depois-do-apoio']},
 'turn-and-support':{name:'A face certa',lesson:'Contorne a caixa para mudar a direção do empurrão antes de preparar o apoio.',discovery:'Aqui o jogador precisa descobrir que alcançar a face correta da caixa vem antes de sustentar a passagem.',hints:['Compare a posição da placa com as faces da caixa.','Prepare o contorno: empurrar sempre na mesma direção não alcança esse apoio.','Depois de apoiar, preserve a passagem que permite sair sem retirar a caixa.'],boxRoles:['reorientar','sustentar']},
 'park-and-retrieve':{name:'Guardar para recuperar',lesson:'Afaste a caixa primeiro para alcançar o outro lado e trazê-la de volta ao apoio.',discovery:'Aqui o jogador precisa descobrir que afastar provisoriamente a caixa da placa libera o acesso para devolvê-la pelo lado correto.',hints:['A placa está atrás da posição inicial da caixa.','O primeiro estacionamento precisa permitir contornar; um canto terminal perde a recuperação.','Entre na área de contorno, alcance a face oposta e traga a caixa de volta para sustentar a saída.'],boxRoles:['liberar-acesso','estacionar-provisoriamente','recuperar','sustentar']},
 'support-then-release':{name:'O apoio já cumpriu seu papel',lesson:'Use a caixa para buscar a chave; depois libere a casa de apoio para a chegada.',discovery:'Aqui o jogador precisa descobrir que o apoio da caixa é temporário: depois da chave, a mesma casa precisa ficar livre para o animal.',hints:['O destino ocupa a casa que primeiro precisa sustentar a passagem.','A chave fica além da cancela do apoio: obtenha essa mudança permanente antes de retirar a caixa.','Volte pelo contorno e empurre a caixa para fora da placa; agora a ajuda pode terminar.'],boxRoles:['reorientar','sustentar','liberar-destino']},
 'remote-relay':{name:'Contornar antes de ajudar',lesson:'Prepare a caixa e use a ajuda do outro animal antes de liberá-lo.',discovery:'Aqui o jogador precisa descobrir que a caixa assume uma ajuda enquanto o outro animal ainda preserva a passagem de retorno.',hints:['Há duas ajudas em sentidos diferentes.','Contorne para apoiar a caixa sem tirar o outro animal da sua placa cedo demais.','Atravesse a passagem de retorno antes de liberar quem esperou.'],boxRoles:['reorientar','substituir-ajudante','sustentar']}
};
export function boxDesignText(pattern){return copy(TEXT[pattern]);}

/** Standalone supporting board, also usable as a secondary concept. */
export function buildBoxBoard(rng,index,{pattern='turn-and-support'}={}){
 let board,region;
 if(pattern==='park-and-retrieve'){
  board={id:`b${index}`,animal:animals[index],rows:6,cols:5,walkable:[6,7,8,11,12,13,14,16,17,18,22,27],start:22,goal:14,boxes:[{id:'box0',cell:17}],plates:[{id:'weight',cell:22}],gates:[gate('weight-gate',13,14,'weight')]};
  // Removing a side of the working circuit changes which pushing face remains
  // accessible. No cells are appended merely to lengthen a solution.
  const remove=pick(rng,[null,6,8,16,18]);if(remove!==null)board.walkable=board.walkable.filter(cell=>cell!==remove);
  region=new Set([14]);
 }else{
  board={id:`b${index}`,animal:animals[index],rows:5,cols:5,walkable:[6,7,8,9,11,12,13,14,16,17,18,19,23],start:17,goal:23,boxes:[{id:'box0',cell:12}],plates:[{id:'weight',cell:8}],gates:[gate('weight-gate',18,23,'weight')]};
  const remove=pick(rng,[null,6,9,16,19]);if(remove!==null)board.walkable=board.walkable.filter(cell=>cell!==remove);
  region=new Set([23]);
 }
 return {board,region,design:{pattern,...boxDesignText(pattern)}};
}
function helper(rng,index,{condition={type:'plate',id:'weight'},id=`prepare-${index}`}={}){
 // A fork, an L with a refuge, and a small circuit give different waiting and
 // return options, while the controlled leaf remains a genuine dependency.
 if(index===2)return {id:`b${index}`,animal:animals[index],rows:3,cols:3,walkable:pick(rng,[[0,1,2,4,7],[0,1,3,4,7]]),start:0,goal:7,plates:[{id,cell:4}],gates:[{id:`helper-exit-${index}`,from:4,to:7,condition}]};
 if(index===3)return {id:`b${index}`,animal:animals[index],rows:3,cols:3,walkable:pick(rng,[[0,1,4,5,8],[0,1,2,4,5,8]]),start:0,goal:8,plates:[{id,cell:1}],gates:[{id:`helper-exit-${index}`,from:5,to:8,condition}]};
 const shape=pick(rng,[[0,1,2,4],[0,1,2,3,4],[0,1,2,4,5]]);
 return {id:`b${index}`,animal:animals[index],rows:2,cols:3,walkable:shape,start:pick(rng,[0,2]),goal:4,plates:[{id,cell:1}],gates:[{id:`helper-exit-${index}`,from:1,to:4,condition}]};
}
export function buildBoxDesign(rng,{animals:count=2,pattern,includeSupportedStop=false}={}){
 pattern=pattern||pick(rng,includeSupportedStop&&count===2?BOX_PATTERNS:BOX_PATTERNS.filter(p=>p!=='support-and-necessary-stop'));
 const constraints=new Map(),required=new Set(['push','box-support-gate']),mechanics=['walls','plate','box'];let boards=[];
 if(pattern==='support-and-necessary-stop'){
  if(count!==2)throw new Error('supported-stop-duet-only');
  boards=[{id:'b0',animal:animals[0],rows:6,cols:6,start:26,goal:15,walkable:[7,8,9,10,13,14,15,16,19,20,21,22,25,26],boxes:[{id:'box0',cell:20}],plates:[{id:'weight',cell:9}],gates:[[14,15],[15,16],[20,21],[21,22]].map(([a,b],i)=>gate(`side-${i}`,a,b,'return-support'))},{id:'b1',animal:animals[1],rows:4,cols:3,start:7,goal:1,walkable:[1,4,7],plates:[{id:'return-support',cell:7}],gates:[gate('weight-first',7,4,'weight'),gate('weight-second',4,1,'weight')]}];constraints.set(0,new Set([15]));constraints.set(1,new Set([1]));
 }else if(pattern==='remote-relay'){
  const routing={id:'b0',animal:animals[0],rows:6,cols:6,walkable:[7,8,9,10,13,14,15,16,19,20,21,22,25,26,28],start:26,goal:28,boxes:[{id:'box0',cell:20}],plates:[{id:'weight',cell:9}],gates:[gate('home-gate',22,28,'return-support')]};
  const remove=pick(rng,[null,10,19,25]);if(remove!==null)routing.walkable=routing.walkable.filter(c=>c!==remove);
  const crossing={id:'b1',animal:animals[1],rows:4,cols:6,walkable:[13,14,15,16],start:16,goal:13,plates:[{id:'return-support',cell:16}],gates:[13,14,15].map(c=>gate(`weight-cross-${c}`,c,c+1,'weight'))};
  boards=[routing,crossing];constraints.set(0,new Set([28]));constraints.set(1,new Set([13]));
 }else{
  const core=buildBoxBoard(rng,0,{pattern:pattern==='support-then-release'?'turn-and-support':pattern});boards=[core.board];constraints.set(0,core.region);
  if(pattern==='support-then-release'){
   // The key is behind the box-supported gate. The receiving animal's actual
   // goal is behind the key gate; the box must then vacate A's goal/plate.
   core.board.keys=[{id:'release-key',cell:23}];core.board.goal=8;constraints.set(0,new Set([8]));mechanics.push('key');required.add('key');required.add('key-gate');
   const receiver=helper(rng,1,{condition:{type:'key',id:'release-key'}});delete receiver.plates;boards.push(receiver);constraints.set(1,new Set([4]));
  }else{
   const receiver=helper(rng,1);boards.push(receiver);constraints.set(1,new Set([4]));
   // B prepares access to A's turning face; the box then releases B to leave
   // that temporary duty. Parallel boundary gates close the whole cut.
   const cuts=pattern==='park-and-retrieve'?[[11,6],[12,7],[13,8]]:[[11,6],[12,7],[13,8],[14,9]];
   for(const [from,to] of cuts)if(core.board.walkable.includes(from)&&core.board.walkable.includes(to))core.board.gates.push(gate(`prepare-cut-${from}`,from,to,'prepare-1'));
  }
 }
 for(let index=2;index<count;index++){
  const b=helper(rng,index);boards.push(b);constraints.set(index,new Set([b.goal]));
  // Additional animals own separate preparing responsibilities. Their plates
  // guard a distinct complete cut, and their own exit requires the box.
  const core=boards[0],row=index===2?2:3,cols=core.cols;
  for(const from of core.walkable){const to=from+cols;if(Math.floor(from/cols)!==row-1||!core.walkable.includes(to)||core.gates.some(g=>(g.from===from&&g.to===to)||(g.from===to&&g.to===from)))continue;core.gates.push(gate(`prepare-${index}-${from}`,from,to,`prepare-${index}`));}
 }
 return {boards,mechanics,constraints,required,design:{pattern,...boxDesignText(pattern),roles:boards.map((b,i)=>i===0?'Preparar o objeto, manter acesso e concluir a própria chegada.':pattern==='support-then-release'&&i===1?'Esperar a chave obtida com apoio e atravessar a passagem permanente.':i===1&&pattern==='remote-relay'?'Preservar a passagem de retorno, depois usar a ajuda da caixa.':`Preparar o acesso ${i}, depois abandonar a placa graças ao apoio da caixa.`)}};
}
