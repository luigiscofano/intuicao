/** Delivery level-design grammar, content revision 2. Rules live only in engine.mjs.
 * Design before goals: a receiver clears the exit, reorients the received box,
 * and keeps a causal support. Optional helpers form a dependency chain rather
 * than independent passenger boards. The three arrangements have distinct
 * receiver access / responsibility relations, not longer delivery corridors.
 */
const ANIMALS=['capivara','tuiuiu','bemtevi','mico'];
const clone=value=>JSON.parse(JSON.stringify(value));
const plate=id=>({type:'plate',id});
export const DELIVERY_PATTERNS=Object.freeze(['receive-turn-support','receive-hold-return','receive-clear-circuit']);

export function deliveryFixture({variant='receive-turn-support',animals=2,prepareSender=false}={}){
  if(!DELIVERY_PATTERNS.includes(variant))throw new RangeError(`Unknown delivery pattern: ${variant}`);
  if(![2,3,4].includes(animals))throw new RangeError('Delivery needs two to four animals.');
  const reciprocal=variant==='receive-hold-return',circuit=variant==='receive-clear-circuit';
  const source={id:'b0',animal:ANIMALS[0],rows:6,cols:6,walkable:[12,13,14,15,16],start:12,goal:16,boxes:[{id:'parcel',cell:13}],gates:[{id:'delivery-gate',from:14,to:15,condition:plate('arrival')},{id:'delivery-final',from:15,to:16,condition:plate(animals>=3?'helper-release':'arrival')}]};
  if(prepareSender){source.walkable=[6,7,8,...source.walkable];source.start=14;}
  if(reciprocal)source.plates=[{id:'sender-release',cell:14}];
  const receiver={id:'b1',animal:ANIMALS[1],rows:6,cols:6,
    walkable:circuit?[7,8,9,10,12,13,14,15,16,18,19,20,21,22,24,25,28]:[7,8,9,10,13,14,15,16,19,20,21,22,25,26,28],
    start:20,goal:28,plates:[{id:'arrival',cell:circuit?7:reciprocal?9:15}],
    gates:[{id:'delivery-home',from:22,to:28,condition:plate(reciprocal?'sender-release':'arrival')}]};
  const boards=[source,receiver];
  if(animals>=3)boards.push({id:'b2',animal:ANIMALS[2],rows:3,cols:3,walkable:[0,1,2,4,7,8],start:0,goal:8,plates:[{id:'helper-release',cell:4}],gates:[{id:'helper-exit',from:4,to:7,condition:plate('arrival')}]});
  if(animals===4){
    boards[2].gates.push({id:'prepare-helper',from:1,to:4,condition:plate('prepare')});
    boards.push({id:'b3',animal:ANIMALS[3],rows:3,cols:3,walkable:[0,1,4,5,8],start:0,goal:8,plates:[{id:'prepare',cell:1}],gates:[{id:'preparer-exit',from:5,to:8,condition:plate('arrival')}]});
  }
  return {id:'delivery-design',version:1,rulesVersion:1,contentRevision:'sintonia-content-2',boards,channels:[{id:'parcel-channel',fromBoard:0,entry:14,toBoard:1,exit:20}],mechanics:['walls','plate','box','delivery'],initialSwitches:{},initialSelectors:{}};
}

function designFor(variant,animals,prepareSender=false){
  const common={
    requiredReceiverPushes:2,
    senderApproach:prepareSender?'start-on-wrong-face; preserve upper bypass before sending':'ready-to-send after receiver preparation',
    structures:{channel:'redistribute one finite box resource',receiverCircuit:'reach a different pushing face, not extend a corridor',receiverGate:variant==='receive-hold-return'?'return while sender still holds its plate':'prevent animal occupancy from replacing persistent box support',helperChain:animals>=3?'give each extra animal a necessary support recipient':'two interdependent animals'},
    causalClaim:'Receiver begins on the channel exit. The exit must be cleared before transmission; the delivered box must be repositioned before supporting the final dependencies.',
    roles:['send resource, then wait for returned support','clear receiving space, reach the useful pushing face, and sustain support',...(animals>=3?['hold the sender’s final passage before leaving through the box-supported passage']:[]),...(animals===4?['prepare the helper’s entrance before using the returned box support']:[])],
    boxRoles:['transferred-resource','reoriented-support'],
    dependencies:[{from:0,to:1,kind:'resource-delivery'},{from:1,to:0,kind:'persistent-box-support'},...(animals>=3?[{from:2,to:0,kind:'temporary-helper-support'},{from:1,to:2,kind:'returned-box-support'}]:[]),...(animals===4?[{from:3,to:2,kind:'prepare-helper'},{from:1,to:3,kind:'returned-box-support'}]:[])],
    errors:['Sending while the receiver still occupies the exit does not transfer the box.','Pushing into a terminal corner can lose access to the next pushing face; undo remains available.'],
    evidenceScope:'Claims describe the construction. Replay and controlled ablation are recorded separately; no human playtest or unique-solution claim.'
  };
  if(variant==='receive-hold-return')return {...common,pattern:variant,discovery:'receber e orientar a caixa ainda não basta: o remetente precisa sustentar o retorno do receptor antes de abandonar a ajuda',boxRoles:['transferred-resource','multi-direction-support','reciprocal-release'],dependencies:[...common.dependencies,{from:0,to:1,kind:'hold-return-before-final-crossing'}]};
  if(variant==='receive-clear-circuit')return {...common,pattern:variant,discovery:'a entrega ocupa o centro do acesso: primeiro deslocar a caixa para o lado e usar o circuito preservado para alcançar a face inferior',boxRoles:['transferred-resource','temporary-side-parking','reoriented-support']};
  return {...common,pattern:variant,discovery:'preparar a saída do canal e depois mudar a face de empurrão transforma o recurso recebido em apoio para os dois caminhos'};
}

/** Generator contract: constraints are deliberately fixed by the authored
 * dependency relation before search; BFS may not choose easier unrelated goals.
 * Independent panel orientations remain the generator's responsibility.
 */
export function buildDeliveryDesign(rng,{animals=2,difficulty=4,introduction=false,variant,prepareSender}={}){
  const selected=variant||(introduction?'receive-turn-support':DELIVERY_PATTERNS[Math.floor(rng()*DELIVERY_PATTERNS.length)]);
  const prepare=prepareSender??(!introduction&&difficulty>=4&&rng()<.45);
  const level=deliveryFixture({variant:selected,animals,prepareSender:prepare});
  return {...clone(level),constraints:new Map(level.boards.map((board,index)=>[index,new Set([board.goal])])),required:new Set(['delivery','delivery-gate','push']),design:designFor(selected,animals,prepare)};
}
