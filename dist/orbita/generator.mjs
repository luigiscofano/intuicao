import {RULES_VERSION,createEngine,initialState,transition,replay,validateLevel,evaluateState,isWon,stateKey} from './engine.mjs';
import {makeTopology,exampleTopology,FAMILIES} from './topology.mjs';

export const GENERATOR_VERSION=1;
export const DIFFICULTIES=Object.freeze(['Muito fácil','Básico','Intermediário','Avançado','Mestre']);
export const CHAPTERS=Object.freeze(['Primeiras voltas','Encontros e chegadas','Preparar o receptor','Reparar e continuar','Um lugar provisório','A ordem das entregas','Duas tarefas juntas','Pequenas cadeias','Duas casas em comum','Cuidar dos dois encontros','O anel de passagem','Escolher o caminho','Restaurar uma região','Passos diferentes','Giros em conjunto','Preparar duas regiões','Condições para girar','Dependências e retornos','Poucas peças, muitas relações','Síntese dos caminhos']);
export const CONCEPTS=Object.freeze({arrival:'Preparar a chegada',storage:'Guardar temporariamente',deliveries:'Duas entregas',restore:'Desfazer e recuperar um acerto',intermediate:'Transportar por um intermediário',encounters:'Cuidar de dois encontros',detour:'Escolher um desvio',localized:'Alterar pouco e restaurar o restante',last:'Pensar na última jogada',groups:'Organizar por grupos',equivalent:'Aproveitar peças equivalentes',together:'Resolver duas tarefas juntas',step:'Passos de duas casas',gear:'Engrenagens',sensor:'Preparar um sensor'});
const LESSONS={
 arrival:'Prepare a chegada antes de trazer a peça: o giro do receptor também muda quem fica na conexão.',
 storage:'Uma região pode guardar uma peça enquanto você prepara o lugar ao qual ela deve voltar.',
 deliveries:'Duas peças usam a mesma passagem. Observe qual delas precisa atravessar primeiro.',
 restore:'Uma peça correta pode precisar sair do alvo. Prepare também o caminho de volta.',
 intermediate:'O anel do meio é um caminho de passagem e também tem posições que precisam ser cuidadas.',
 encounters:'Os dois encontros mudam juntos. Observe o que entra em um e o que sai do outro.',
 detour:'Há mais de um caminho entre as regiões. Compare o que cada rota desloca.',
 localized:'Experimente uma pequena sequência de ida e volta: ela pode mudar poucas casas e restaurar as demais.',
 last:'Imagine o último giro: quais peças precisariam estar prontas imediatamente antes dele?',
 groups:'Distribua os símbolos entre as regiões antes de ajustar todas as posições.',
 equivalent:'Peças com o mesmo símbolo podem trocar de papel. Qual exemplar está mais bem posicionado?',
 together:'Um giro pode completar um destino e preparar a próxima transferência.',
 step:'Este anel avança duas casas por giro. Uma passagem pelo outro anel ajuda a alcançar outra posição.',
 gear:'Os anéis ligados giram juntos, em sentidos indicados. Prepare as duas regiões antes de acioná-los.',
 sensor:'A casa marcada precisa receber o símbolo indicado para liberar o comando. O próprio comando não muda essa casa.'
};
const NAMES={arrival:['A chegada preparada','Antes de atravessar','O lugar de receber'],storage:['Um pouso provisório','Guardar para depois','Uma pequena reserva'],deliveries:['A vez de cada peça','Duas passagens','Entregas em ordem'],restore:['Um acerto emprestado','Sair para voltar','Recuperar o lugar'],intermediate:['O caminho do meio','Uma peça de passagem','Entre duas regiões'],encounters:['Dois encontros','As duas entradas','Um entra, outro sai'],detour:['Uma volta útil','O outro caminho','Duas rotas'],localized:['Só o necessário','Uma troca discreta','Voltar quase tudo'],last:['O último giro','Preparar o final','Um passo antes'],groups:['Cada símbolo na região','Organizar primeiro','Reunir e ajustar'],equivalent:['Outro exemplar','Papéis trocados','O símbolo é o mesmo'],together:['Dois preparos','Uma volta, duas tarefas','Chegar e preparar'],step:['De dois em dois','A posição entre os passos','Dois lugares adiante'],gear:['Duas voltas ligadas','Preparar em conjunto','Sentidos parceiros'],sensor:['A condição da passagem','Preparar para liberar','O símbolo que abre']};
const clone=x=>structuredClone(x);
const pick=(rng,list)=>list[Math.floor(rng()*list.length)];
const integer=(rng,lo,hi)=>lo+Math.floor(rng()*(hi-lo+1));
const shuffle=(rng,list)=>{const out=[...list];for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;};
const bounded=(n,lo,hi,fallback=lo)=>Number.isInteger(n)&&n>=lo&&n<=hi?n:fallback;
export function seedNumber(seed){if(Number.isSafeInteger(seed))return seed>>>0;let h=2166136261;for(const c of String(seed??0)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
export function randomFor(seed){let n=seedNumber(seed);return()=>{n+=0x6D2B79F5;let z=n;z=Math.imul(z^(z>>>15),z|1);z^=z+Math.imul(z^(z>>>7),z|61);return((z^(z>>>14))>>>0)/4294967296;};}
export function invertMoves(moves){return moves.slice().reverse().map(move=>({command:move.command,direction:-move.direction}));}
const basicCommands=rings=>rings.map(r=>({id:r.id,label:'Anel '+r.id,turns:[{ring:r.id,delta:1}],requires:[]}));
const types=count=>[{id:'n',symbol:'·',name:'Peça neutra'},...Array.from({length:count},(_,i)=>({id:String(i+1),symbol:String(i+1),name:'Símbolo '+(i+1)}))];
const move=(command,direction=1)=>({command,direction});

export function designForNumber(number){
 const n=bounded(number,1,500,1),band=Math.floor((n-1)/50);
 const difficulty=n<=50?0:n<=200?1:n<=300?2:n<=400?3:4;
 // A rotating ten-stage rhythm; reviews and short discoveries do not stay in fixed slots.
 const rhythm=['review','combine','reframe','combine','challenge','review','combine','short','reframe','combine'];
 const role=rhythm[(n-1+Math.floor((n-1)/10)*3)%10];
 let pool=band===0?['pair','unequal']:band<3?['pair','unequal','reserve']:band===3?['pair','chain','reserve','unequal']:band===4?['lens','lens','pair','chain','unequal']:band===5?['chain','circuit','satellites','pair','reserve']:['pair','lens','chain','satellites','circuit','reserve','unequal','compact','nested'];
 let family=pool[(n*7+Math.floor(n/10))%pool.length];
 if(role==='review')family=['pair','unequal','chain'][(n+band)%3];
 if(role==='short')family='pair';
 if(n>450&&n%17===0)family='nested';
 let special=n>=401&&n%5===1?'sensor':n>=351&&n%5===2?'gear':n>=301&&n%6===1?'step':null;
 if(role==='review'||role==='short')special=null;
 if(special==='gear')family=n%2?'chain':'reserve';
 if(special==='sensor')family=n%3===0?'chain':'pair';
 const concepts=['arrival','storage','deliveries','restore','intermediate','encounters','detour','localized','last','groups','equivalent','together'];
 let concept=special??concepts[(n*5+band)%concepts.length];
 if(family==='lens'&&!special)concept='encounters';
 if(family==='circuit'&&!special)concept=role==='challenge'?'detour':'intermediate';
 if(family==='chain'&&!special)concept=['intermediate','deliveries','storage'][n%3];
 if(family==='reserve'&&!special)concept='storage';
 if(family==='pair'&&difficulty>=3&&!special)concept=role==='short'?'localized':['localized','restore','deliveries'][n%3];
 if(difficulty===0)concept=['arrival','restore','together','deliveries','equivalent'][(n+band)%5];
 if(concept==='encounters'&&family!=='lens')concept='arrival';
 if(concept==='detour'&&family!=='circuit')concept='storage';
 if(concept==='intermediate'&&['pair','unequal'].includes(family))concept='arrival';
 let mechanics=special?[special]:[];
 if(n>=451&&!['review','short'].includes(role)){
  if(n%17===0){mechanics=['gear','sensor'];family='chain';concept=special='sensor';}
  else if(n%19===0){mechanics=['step','gear'];family='chain';concept=special='gear';}
  else if(n%23===0){mechanics=['step','sensor'];family='pair';concept=special='sensor';}
 }
 if(n===500){mechanics=['step','gear','sensor'];family='chain';concept=special='sensor';}
 const introduction=[307,352,411].includes(n);
 if(introduction)family=n===352?'chain':'pair';
 return {number:n,difficulty,band,role,family,special,mechanics,introduction,concept,variant:(n*13+Math.floor(n/25))%36};
}

function shapesFor(rng,design){
 const {difficulty,family,variant}=design;
 const ringCount=makeTopology(family,variant).rings.length;
 if(design.introduction)return makeTopology(family,0,Array(ringCount).fill(4));
 const base=difficulty===0?4:difficulty===1?4:difficulty===2?5:4;
 const lengths=Array.from({length:ringCount},(_,i)=>Math.min(8,base+(difficulty===0?integer(rng,0,1):integer(rng,0,3))));
 if(family==='lens')lengths.fill(6+integer(rng,0,1));
 if(family==='reserve')lengths[lengths.length-1]=3+integer(rng,0,1);
 if(family==='compact')lengths.fill(4+integer(rng,0,1));
 // Nested rails already add visual relationships; extra cells crowd the small inner arcs.
 if(family==='nested')lengths.fill(4);
 return makeTopology(family,variant,lengths);
}

function configureRules(level,design,rng,goal){
 level.commands=basicCommands(level.rings);
 const mechanics=new Set(design.mechanics??(design.special?[design.special]:[]));
 if(mechanics.has('step')){
  const ring=level.rings[integer(rng,0,level.rings.length-1)];ring.step=2;
  level.specialRules.push({kind:'step',ring:ring.id,text:LESSONS.step});
 }
 if(mechanics.has('gear')){
  let pair;
  for(let i=0;i<level.rings.length;i++)for(let j=i+1;j<level.rings.length;j++)if(!level.rings[i].cells.some(id=>level.rings[j].cells.includes(id)))pair=[level.rings[i],level.rings[j]];
  if(!pair)throw new Error('A engrenagem precisa de anéis separados.');
  const ids=new Set(pair.map(r=>r.id));
  level.commands=level.commands.filter(c=>!ids.has(c.id));
  level.commands.push({id:'G',label:'Anéis '+pair[0].id+' + '+pair[1].id,turns:[{ring:pair[0].id,delta:1},{ring:pair[1].id,delta:-1}],requires:[]});
  level.specialRules.push({kind:'gear',rings:[...ids],text:LESSONS.gear});
 }
 if(mechanics.has('sensor')){
  const locked=level.commands.find(c=>c.id==='G')??level.commands[0], affected=new Set(locked.turns.flatMap(t=>level.rings.find(r=>r.id===t.ring).cells));
  const external=level.cells.filter(c=>!affected.has(c.id));
  const sensor=pick(rng,external), symbol=goal[sensor.id]==='n'?'1':goal[sensor.id];goal[sensor.id]=symbol;
  locked.requires=[{cell:sensor.id,type:symbol}];
  level.specialRules.push({kind:'sensor',command:locked.id,cell:sensor.id,type:symbol,text:LESSONS.sensor});
 }
}

function plannedScramble(level,design,rng){
 const ids=level.commands.map(c=>c.id), first=ids[0],second=ids[1]??first,third=ids[2]??first;
 const s=()=>pick(rng,[-1,1]);
 const a=move(first,s()),b=move(second,s()),c=move(third,s());
 const neg=m=>move(m.command,-m.direction);
 let pattern;
 switch(design.concept){
  case 'restore':case 'localized':pattern=[a,b,neg(a),neg(b)];break;
  case 'storage':pattern=[b,a,a,neg(b),neg(a)];break;
  case 'deliveries':pattern=[a,b,neg(a),b,a,neg(b)];break;
  case 'intermediate':pattern=[a,b,c,neg(b),neg(a),c,b];break;
  case 'detour':pattern=[a,b,c,neg(a),neg(b),c];break;
  case 'encounters':pattern=[a,b,neg(a),neg(b),a,b];break;
  case 'groups':pattern=[a,b,a,c,b,neg(a)];break;
  case 'gear':pattern=[move('G',1),move(ids.find(id=>id!=='G'),1),move('G',-1),move(ids.find(id=>id!=='G'),-1),move('G',1)];break;
  case 'sensor':pattern=[a,b,neg(a),b,a,neg(b)];break;
  default:pattern=[b,a,b,neg(a)];
 }
 if(design.concept==='intermediate'){
  // Plan an actual end-to-end transfer through a distinct middle ring.
  let route=null;
  for(const from of level.rings)for(const via of level.rings)for(const to of level.rings){
   if(new Set([from.id,via.id,to.id]).size!==3)continue;
   const entry=from.cells.find(id=>via.cells.includes(id)),exit=via.cells.find(id=>to.cells.includes(id)&&id!==entry);
   const source=from.cells.find(id=>level.initial[id]!=='n'&&level.targets[id]&&level.rings.filter(r=>r.cells.includes(id)).length===1);
   if(entry&&exit&&source){route={from,via,to,entry,exit,source};break;}
  }
  if(route){
   const distance=(ring,start,end)=>{const delta=(ring.cells.indexOf(end)-ring.cells.indexOf(start)+ring.cells.length)%ring.cells.length;return delta<=ring.cells.length/2?delta:delta-ring.cells.length;};
   const turns=(ring,count)=>Array.from({length:Math.abs(count)},()=>move(ring.id,Math.sign(count)));
   pattern=[...turns(route.from,distance(route.from,route.source,route.entry)),...turns(route.via,distance(route.via,route.entry,route.exit)),move(route.to.id,1)];
  }
 }
 const depth=design.difficulty, target=design.introduction?4:design.role==='short'?4:depth===0?integer(rng,2,4):depth===1?integer(rng,4,7):depth===2?integer(rng,6,10):depth===3?integer(rng,7,12):integer(rng,9,15);
 if(design.role==='challenge'&&depth>=2)pattern=[...pattern,...[c,a,neg(c),neg(a)]];
 if(pattern.length>target&&(depth<2||design.introduction))pattern=pattern.slice(0,target);
 while(pattern.length<target)pattern.push(move(pick(rng,ids),s()));
 return pattern;
}

function applyScramble(level,goal,plan,rng,design){
 const engine=createEngine(level);
 let state={occupancy:{...goal},moves:0}, moves=[],states=[state], seen=new Map([[stateKey(state),0]]);
 const actions=level.commands.flatMap(c=>[move(c.id,1),move(c.id,-1)]);
 for(let k=0;k<plan.length;k++){
  let action=plan[k],tr=engine.transition(state,action);
  if(!tr.allowed||!tr.changed){
   const legal=shuffle(rng,actions).map(m=>({m,tr:engine.transition(state,m)})).find(x=>x.tr.allowed&&x.tr.changed&&!(moves.at(-1)?.command===x.m.command&&moves.at(-1)?.direction===-x.m.direction));
   if(!legal)continue;action=legal.m;tr=legal.tr;
  }
  const key=stateKey(tr.state),previous=seen.get(key);
  if(previous!==undefined){moves=moves.slice(0,previous);states=states.slice(0,previous+1);state=states.at(-1);seen=new Map(states.map((x,i)=>[stateKey(x),i]));continue;}
  moves.push(action);state=tr.state;states.push(state);seen.set(key,moves.length);
 }
 return {initial:{...state.occupancy},solution:invertMoves(moves),scramble:moves};
}

function goalConfiguration(topology,design,rng){
 const count=topology.cells.length, difficulty=design.difficulty;
 let targetCount=difficulty===0?integer(rng,1,3):difficulty===1?integer(rng,3,Math.min(6,count)):difficulty===2?integer(rng,5,Math.min(9,count)):integer(rng,Math.max(5,Math.floor(count*.5)),count);
 if(['restore','localized'].includes(design.concept)&&difficulty>=2)targetCount=count;
 if(design.special==='sensor')targetCount=Math.max(3,Math.min(count-1,targetCount));
 if(design.introduction)targetCount=design.special==='sensor'?2:3;
 if(design.concept==='equivalent')targetCount=Math.max(3,targetCount);
 if(design.concept==='together')targetCount=Math.max(2,targetCount);
 const symbolCount=Math.min(difficulty===0?3:difficulty===1?4:6,design.concept==='equivalent'?targetCount-1:targetCount),chosen=shuffle(rng,topology.cells).slice(0,targetCount),goal=Object.fromEntries(topology.cells.map(cell=>[cell.id,'n'])),targets={};
 chosen.forEach((cell,i)=>{const type=String(design.concept==='groups'?1+topology.rings.findIndex(r=>r.cells.includes(cell.id))%symbolCount:i<symbolCount?i+1:integer(rng,1,symbolCount));goal[cell.id]=type;targets[cell.id]=type;});
 return {goal,targets,pieceTypes:types(symbolCount)};
}

/** BFS only establishes a shortest solution when it finishes the relevant layers. */
export function shortSolutionSearch(level,{maxDepth=4,maxStates=14000}={}){
 const engine=createEngine(level),start=engine.initialState();if(engine.isWon(start))return {found:true,optimal:true,solution:[],distance:0,visited:1,completeDepth:0};
 const queue=[{state:start,path:[]}],seen=new Set([engine.key(start)]),actions=level.commands.flatMap(c=>[move(c.id,1),move(c.id,-1)]);let at=0,completeDepth=-1;
 while(at<queue.length){
  const item=queue[at++];
  if(item.path.length>=maxDepth){completeDepth=maxDepth;continue;}
  for(const action of actions){
   if(item.path.at(-1)?.command===action.command&&item.path.at(-1)?.direction===-action.direction)continue;
   const next=engine.transition(item.state,action);if(!next.allowed||!next.changed)continue;
   const key=engine.key(next.state);if(seen.has(key))continue;
   const path=[...item.path,action];
   if(engine.isWon(next.state))return {found:true,optimal:true,solution:path,distance:path.length,visited:seen.size+1,completeDepth:path.length-1};
   if(seen.size>=maxStates)return {found:false,optimal:false,visited:seen.size,completeDepth:Math.max(-1,item.path.length-1),status:'inconclusive'};
   seen.add(key);queue.push({state:next.state,path});
  }
  if(at===queue.length||queue[at].path.length>item.path.length)completeDepth=item.path.length;
 }
 return {found:false,optimal:false,visited:seen.size,completeDepth:maxDepth,status:'no-solution-within-depth'};
}

/** Trace measures describe this certified route; they are not necessity proofs. */
export function describeReplay(level){
 const engine=createEngine(level);
 let state=engine.initialState(),previousMove=null,ringSwitches=0,jointImprovements=0,sensorChanges=0;
 const initiallyCorrect=Object.keys(level.targets).filter(id=>state.occupancy[id]===level.targets[id]),movedCorrect=new Set(),restored=new Set(),visitedRegions=new Map(level.cells.map(c=>[c.id,new Set()]));
 let identities=Object.fromEntries(level.cells.map(c=>[c.id,c.id])),previousMatch=evaluateState(level,state).matched;
 for(const action of level.solution){
  const tr=engine.transition(state,action);if(!tr.allowed)throw new Error('Solução com comando bloqueado.');
  if(previousMove&&previousMove.command!==action.command)ringSwitches++;
  const nextIdentity={...identities};
  for(const m of tr.movements){nextIdentity[m.to]=identities[m.from];visitedRegions.get(identities[m.from]).add(m.ring);}
  for(const id of initiallyCorrect){if(tr.state.occupancy[id]!==level.targets[id])movedCorrect.add(id);else if(movedCorrect.has(id))restored.add(id);}
  const match=engine.evaluateState(tr.state).matched;if(match-previousMatch>=2)jointImprovements++;
  const sensors=level.commands.flatMap(c=>c.requires??[]);for(const s of sensors)if((state.occupancy[s.cell]===s.type)!==(tr.state.occupancy[s.cell]===s.type))sensorChanges++;
  identities=nextIdentity;state=tr.state;previousMove=action;previousMatch=match;
 }
 const routes=[...visitedRegions.entries()].filter(([id])=>level.initial[id]!=='n').map(([,s])=>s.size);
 return {solutionLength:level.solution.length,ringSwitches,transferredPieces:routes.filter(n=>n>=2).length,intermediateRoutes:routes.filter(n=>n>=3).length,initiallyCorrect:initiallyCorrect.length,correctTargetsMoved:movedCorrect.size,restoredTargets:restored.size,jointImprovements,sensorChanges,targetCount:Object.keys(level.targets).length,coverage:Math.round(Object.keys(level.targets).length/level.cells.length*100)/100};
}

function permute(items){if(items.length<2)return [items];return items.flatMap((item,i)=>permute(items.filter((_,j)=>j!==i)).map(rest=>[item,...rest]));}
/** Canonicalizes ring names, circular starting indices, global reflection, position, size and symbol names. */
export function levelSignature(level){
 let best=null;
 for(const order of permute(level.rings))for(let start=0;start<order[0].cells.length;start++)for(const direction of [1,-1]){
  const cells=new Map(),rings=new Map(order.map((r,i)=>[r.id,i])),cycleLists=[];let failed=false;
  const pending=[...order];
  while(pending.length){
   const position=pending.findIndex(r=>cells.size===0||r.cells.some(id=>cells.has(id)));if(position<0){failed=true;break;}
   const ring=pending.splice(position,1)[0];
   let anchor=cells.size===0?start:0;
   if(cells.size)anchor=ring.cells.reduce((best,id,i)=>cells.has(id)&&(!cells.has(ring.cells[best])||cells.get(id)<cells.get(ring.cells[best]))?i:best,0);
   const ids=Array.from({length:ring.cells.length},(_,i)=>ring.cells[(anchor+direction*i+ring.cells.length*2)%ring.cells.length]);
   ids.forEach(id=>{if(!cells.has(id))cells.set(id,cells.size);});
   cycleLists.push([rings.get(ring.id),ring.step??1,ids.map(id=>cells.get(id))]);
  }
  if(failed)continue;
  const neutral=level.pieceTypes.find(type=>type.symbol==='·')?.id;
  const symbols=new Map(neutral===undefined?[]:[[neutral,0]]),symbol=id=>{if(!symbols.has(id))symbols.set(id,symbols.size);return symbols.get(id);};
  const occupancy=[...cells.keys()].map(id=>[symbol(level.initial[id]),level.targets[id]===undefined?-1:symbol(level.targets[id])]);
  const commands=level.commands.map(c=>{
   const turns=c.turns.map(t=>[rings.get(t.ring),t.delta]).sort((a,b)=>a[0]-b[0]);
   const inverse=turns.map(([ring,delta])=>[ring,-delta]);
   // Both directions are offered, so negating every turn of a command changes no action set.
   const normalized=JSON.stringify(turns)<JSON.stringify(inverse)?turns:inverse;
   return [normalized,(c.requires??[]).map(r=>[cells.get(r.cell),symbol(r.type)]).sort((a,b)=>a[0]-b[0])];
  }).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
  const text=JSON.stringify([cycleLists.sort((a,b)=>a[0]-b[0]),occupancy,commands]);if(best===null||text<best)best=text;
 }
 return best;
}
export function topologySignature(level){return JSON.stringify([level.rings.map(r=>[r.cells.length,r.step??1]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]),level.rings.flatMap((r,i)=>level.rings.slice(i+1).map(s=>r.cells.filter(id=>s.cells.includes(id)).length)).sort(),level.commands.map(c=>[c.turns.length,(c.requires??[]).length]).sort()]);}

export function createCandidate(seed,design={}){
 const rng=randomFor(seed),difficulty=bounded(design.difficulty,0,4),spec={number:design.number??null,role:'combine',family:'pair',concept:'arrival',variant:seedNumber(seed)%36,...design,difficulty};
 const topology=shapesFor(rng,spec),configured=goalConfiguration(topology,spec,rng);
 const level={version:1,rulesVersion:RULES_VERSION,generatorVersion:GENERATOR_VERSION,id:spec.number??'orbita-'+seedNumber(seed),name:pick(rng,NAMES[spec.concept]??NAMES.arrival),...topology,pieceTypes:configured.pieceTypes,initial:{...configured.goal},targets:configured.targets,commands:[],concepts:[spec.concept],difficulty,chapter:spec.number?Math.ceil(spec.number/25):null,discovery:LESSONS[spec.concept],hints:[LESSONS[spec.concept]],role:spec.role,specialRules:[],seed:seedNumber(seed)};
 configureRules(level,spec,rng,configured.goal);
 // Sensor symbols are real pieces in the solved arrangement, never hidden flags.
 level.initial={...configured.goal};
 const structural=validateLevel(level);if(!structural.valid)throw new Error('Estrutura inválida: '+structural.errors.join('; '));
 const scrambled=applyScramble(level,configured.goal,plannedScramble(level,spec,rng),rng,spec);
 level.initial=scrambled.initial;level.solution=scrambled.solution;level.authorship={pattern:spec.concept,role:spec.role,solvedArrangement:configured.goal,scramble:scrambled.scramble};
 if(!level.solution.length||isWon(level,initialState(level)))return null;
 const minimum=spec.introduction?2:spec.role==='short'?Math.min(3,difficulty+1):difficulty===0?1:difficulty===1?2:difficulty===2?3:4;
 const search=shortSolutionSearch(level,{maxDepth:Math.max(minimum-1,difficulty===0?3:Math.min(4,difficulty+1)),maxStates:difficulty<=1?9000:11000});
 if(search.found&&search.distance<minimum)return null;
 if(search.found&&search.solution.length<=level.solution.length)level.solution=search.solution;
 if(level.solution.length>2&&new Set(level.solution.map(m=>m.command)).size<2)return null;
 const certified=replay(level,level.solution);if(!certified.valid||!certified.solved)return null;
 const trace=describeReplay(level);
 if(['restore','localized'].includes(spec.concept)&&difficulty>=2&&trace.restoredTargets===0)return null;
 if(spec.concept==='intermediate'&&trace.intermediateRoutes===0)return null;
 if(spec.concept==='deliveries'&&trace.transferredPieces<2)return null;
 if(spec.concept==='together'&&trace.jointImprovements===0)return null;
 const mechanics=new Set(level.specialRules.map(rule=>rule.kind));
 if(mechanics.has('gear')&&!level.solution.some(m=>m.command==='G'))return null;
 if(mechanics.has('step')&&!level.solution.some(m=>level.commands.find(c=>c.id===m.command).turns.some(t=>level.rings.find(r=>r.id===t.ring).step===2)))return null;
 if(mechanics.has('sensor')&&(trace.sensorChanges===0||!level.solution.some(m=>(level.commands.find(c=>c.id===m.command).requires??[]).length)))return null;
 if(spec.introduction&&mechanics.has('sensor')&&createEngine(level).commandStatus(initialState(level),level.specialRules.find(rule=>rule.kind==='sensor').command).allowed)return null;
 level.concepts=[...new Set([...level.concepts,...mechanics])];
 if(trace.restoredTargets&&!level.concepts.includes('restore'))level.concepts.push('restore');
 if(trace.intermediateRoutes&&!level.concepts.includes('intermediate'))level.concepts.push('intermediate');
 if(trace.jointImprovements&&!level.concepts.includes('together'))level.concepts.push('together');
 if(Object.values(level.initial).filter(x=>x!=='n').length>new Set(Object.values(level.initial).filter(x=>x!=='n')).size&&!level.concepts.includes('equivalent'))level.concepts.push('equivalent');
 level.hints.push(trace.restoredTargets?'Alguns alvos já corretos fazem parte do caminho. Planeje como recuperá-los depois da transferência.':level.rings.length>2?'Observe qual anel precisa receber a peça antes que ela possa seguir até seu destino.':'Observe o conteúdo da conexão antes e depois de cada giro.');
 level.validation={verified:true,method:'same-engine-replay',rulesVersion:RULES_VERSION,generatorVersion:GENERATOR_VERSION,solutionUpperBound:level.solution.length,minimumProven:search.found&&search.optimal,minimum:search.found?search.distance:null,shortSolutionSearch:{visited:search.visited,completeDepth:search.completeDepth,status:search.found?'optimal-solution':search.status},trace,topology:topologySignature(level)};
 return level;
}

/** Finite deterministic work, used inside the worker. The service owns reservoir fallback. */
export function generateEndless(seed,options={}){
 const base=seedNumber(seed),difficulty=bounded(options.difficulty,0,4),recent=new Set(options.recentSignatures??[]),recentFamilies=(options.recentFamilies??[]).slice(-2),maxAttempts=bounded(options.maxAttempts,0,48,14);
 const families=difficulty===0?['pair','unequal']:difficulty===1?['pair','reserve','unequal','chain']:['pair','lens','chain','satellites','circuit','reserve','unequal','compact','nested'];
 const rng=randomFor(base),offset=integer(rng,0,499);
 for(let attempt=0;attempt<maxAttempts;attempt++){
  const [from,to]=[[11,50],[51,200],[201,300],[301,400],[401,500]][difficulty],number=from+(offset+attempt)%(to-from+1);
  const baseDesign=designForNumber(number),family=pick(rng,families.filter(f=>!recentFamilies.includes(f)).length?families.filter(f=>!recentFamilies.includes(f)):families);
  let design={...baseDesign,number:null,difficulty,family,variant:integer(rng,0,35)};
  if(design.mechanics.includes('gear'))design.family='chain';else if(design.special==='sensor')design.family='pair';
  if(design.concept==='encounters'&&design.family!=='lens')design.concept='arrival';
  const candidate=createCandidate((base+Math.imul(attempt+1,0x9e3779b9))>>>0,design);if(!candidate)continue;
  const signature=levelSignature(candidate);if(recent.has(signature))continue;
  candidate.id='endless-'+base.toString(16)+'-'+GENERATOR_VERSION;candidate.seed=base;candidate.generation={seed:base,version:GENERATOR_VERSION,attempt:attempt+1,difficulty};
  return {level:candidate,signature,validation:candidate.validation,seed:base,generatorVersion:'orbita-generator-1',source:'generated',attempts:attempt+1};
 }
 const error=new Error('O limite de criação desta rodada foi alcançado.');error.code='GENERATION_BUDGET';throw error;
}

export function tutorialLevels(){
 const common=(id,topology,initial,targets,solution,name,lesson)=>({version:1,rulesVersion:RULES_VERSION,id,name,...clone(topology),pieceTypes:types(Math.max(...Object.values(initial).filter(x=>x!=='n').map(Number))),initial,targets,commands:basicCommands(topology.rings),solution,difficulty:0,chapter:1,role:'introduction',concepts:[id<5?'together':id<8?'arrival':id===9?'restore':'arrival','last'],discovery:lesson,hints:[lesson,'As marcas de destino ficam na mesma casa. As peças continuam livres para circular.'],specialRules:[]});
 const single=makeTopology('single',0,[4]),[right,bottom,left,top]=single.rings[0].cells;
 const empty=t=>Object.fromEntries(t.cells.map(c=>[c.id,'n'])),s=()=>empty(single),p=exampleTopology(),e=()=>empty(p);
 const levels=[
  common(1,single,{...s(),[top]:'1'},{[right]:'1'},[move('A')],'Uma primeira volta','Gire uma casa no sentido horário para levar a peça ao símbolo igual.'),
  common(2,single,{...s(),[bottom]:'1'},{[right]:'1'},[move('A',-1)],'O outro sentido','Os dois sentidos estão disponíveis. Observe qual chega ao alvo em uma casa.'),
  common(3,single,{...s(),[top]:'1',[right]:'2'},{[right]:'1',[bottom]:'2'},[move('A')],'Todas juntas','Todas as peças do anel se movem juntas, inclusive a que está longe do alvo.'),
  common(4,single,{[right]:'1',[bottom]:'2',[left]:'3',[top]:'n'},{[left]:'1',[top]:'2',[right]:'3'},[move('A'),move('A')],'O destino fica','As marcas de destino não giram. Leve cada símbolo até sua marca fixa.'),
  common(5,p,{...e(),Atopo:'1',Btopo:'2'},{J:'1',Btopo:'2'},[move('A')],'Dois anéis','Escolha o anel da peça. As casas exclusivas do outro anel ficam como estão.'),
  common(6,p,{...e(),Aesquerda:'1',Bdireita:'2'},{J:'1',Bbaixo:'2'},[move('B'),move('A'),move('A')],'Até o encontro','A casa do encontro pertence aos dois anéis. Primeiro leve a peça até ela.'),
  common(7,p,{...e(),J:'1',Abaixo:'2'},{Btopo:'1',Abaixo:'2'},[move('B')],'Pelo outro anel','Uma peça no encontro segue pelo anel que você girar agora.'),
  common(8,p,{...e(),Atopo:'1',Btopo:'2'},{Btopo:'1',Bbaixo:'2'},[move('B'),move('A'),move('B')],'Preparar para receber','Prepare o anel receptor antes da chegada. A primeira volta também posiciona outra peça.'),
  common(9,p,{...e(),Atopo:'1',Abaixo:'2'},{Btopo:'1',Abaixo:'2'},[move('A'),move('B'),move('A',-1)],'Um acerto pode sair','A peça 2 pode sair de seu destino enquanto você abre caminho. Depois traga-a de volta.'),
  common(10,p,{...e(),Abaixo:'2',Atopo:'1',Btopo:'3'},{Btopo:'1',Abaixo:'2',Bbaixo:'3'},[move('B'),move('A'),move('B'),move('A',-1)],'Preparar, passar, restaurar','Prepare o anel da direita, transfira a peça 1 e recupere o destino da peça 2.')
 ];
 for(const level of levels){
  const validation=validateLevel(level);if(!validation.valid)throw new Error('Tutorial '+level.id+': '+validation.errors.join('; '));
  const search=shortSolutionSearch(level,{maxDepth:8,maxStates:100000});
  // The four specified moves of example ten are retained even if another shortest path is found.
  if(level.id!==10&&search.found)level.solution=search.solution;
  if(!replay(level,level.solution).solved)throw new Error('Tutorial sem solução '+level.id);
  level.validation={verified:true,method:'same-engine-replay-and-bfs',rulesVersion:RULES_VERSION,minimumProven:search.found,minimum:search.distance??null,solutionUpperBound:level.solution.length,trace:describeReplay(level),topology:topologySignature(level)};
 }
 return levels;
}
