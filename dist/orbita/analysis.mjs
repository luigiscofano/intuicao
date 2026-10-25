import {RULES_VERSION,LIMITS,createEngine,validateLevel,validateState,initialState,stateKey,invertMove,replay} from './engine.mjs';

const now = () => globalThis.performance?.now?.() ?? Date.now();
const finiteBound = (value,fallback,min,max) => Number.isFinite(value) ? Math.min(max,Math.max(min,Math.floor(value))) : fallback;
const copyMove = move => ({command:move.command,direction:move.direction});
const inconclusive = (reason,extra = {}) => ({status:'inconclusive',solution:null,optimal:false,source:'search',method:'breadth-first',reason,visited:0,...extra});

/**
 * Uniform-cost breadth-first search. Every edge calls the prepared engine's
 * transition function, so special commands are not reimplemented by a solver.
 */
export function solve(level,state = undefined,options = {}) {
  const checked = validateLevel(level);
  if (!checked.valid) return inconclusive('invalid-level',{errors:checked.errors});
  const engine = createEngine(level);
  state ??= engine.initialState();
  const stateCheck = engine.validateState(state);
  if (!stateCheck.valid) return inconclusive('invalid-state',{errors:stateCheck.errors});
  if (engine.isWon(state)) return {status:'solved',solution:[],optimal:true,source:'already-won',method:'already-won',visited:1,proof:{minimumLength:0,allShorterPathsExhausted:true}};
  const maxStates = finiteBound(options.maxStates,40000,0,250000);
  const timeoutMs = finiteBound(options.timeoutMs,1800,0,15000);
  const maxDepth = finiteBound(options.maxDepth,64,0,128);
  if (!maxStates || !timeoutMs || !maxDepth) return inconclusive(!maxDepth ? 'depth-limit' : !maxStates ? 'state-limit' : 'timeout',{visited:1,lowerBound:1});
  const started = now(), nodes = [{state,parent:-1,move:null,depth:0}], seen = new Map([[engine.key(state),0]]);
  let head = 0, truncatedDepth = false, exhaustedDepth = -1;
  const path = index => {
    const moves = [];
    for(let cursor = index; nodes[cursor].parent >= 0; cursor = nodes[cursor].parent) moves.push(copyMove(nodes[cursor].move));
    return moves.reverse();
  };
  while (head < nodes.length) {
    if (options.signal?.aborted) return inconclusive('cancelled',{visited:seen.size,elapsedMs:now()-started,lowerBound:Math.max(1,exhaustedDepth+1)});
    if (now() - started >= timeoutMs) return inconclusive('timeout',{visited:seen.size,elapsedMs:now()-started,lowerBound:Math.max(1,exhaustedDepth+1)});
    const nodeIndex = head++, node = nodes[nodeIndex];
    if (node.depth > maxDepth - 1) {truncatedDepth = true; continue;}
    if (nodeIndex > 0 && nodes[nodeIndex-1].depth < node.depth) exhaustedDepth = node.depth - 1;
    for (const move of engine.allowedMoves(node.state)) {
      if (node.move?.command === move.command && node.move.direction === -move.direction) continue;
      const next = engine.transition(node.state,move);
      if (!next.changed) continue;
      const key = engine.key(next.state);
      if (seen.has(key)) continue;
      if (seen.size >= maxStates) return inconclusive('state-limit',{visited:seen.size,elapsedMs:now()-started,lowerBound:Math.max(1,exhaustedDepth+1)});
      const child = {state:next.state,parent:nodeIndex,move,depth:node.depth+1};
      const childIndex = nodes.length;
      nodes.push(child);seen.set(key,childIndex);
      if (engine.isWon(next.state)) {
        const solution = path(childIndex);
        return {status:'solved',solution,optimal:true,source:'breadth-first',method:'breadth-first',visited:seen.size,elapsedMs:now()-started,proof:{minimumLength:solution.length,allShorterPathsExhausted:true}};
      }
    }
  }
  if (truncatedDepth) return inconclusive('depth-limit',{visited:seen.size,elapsedMs:now()-started,lowerBound:maxDepth+1});
  // Only a fully exhausted reachable graph is an impossibility proof. A time,
  // depth, memory or worker budget can NEVER produce this status.
  return {status:'unsolvable',solution:null,optimal:false,source:'breadth-first',method:'breadth-first',reason:'reachable-graph-exhausted',visited:seen.size,elapsedMs:now()-started,proof:{reachableGraphExhausted:true}};
}

function walk(engine,start,moves,{stopAtWin = false,keepStates = false} = {}) {
  if (!Array.isArray(moves) || moves.length > LIMITS.sequence) return {valid:false,state:start,states:[]};
  let state = start;
  const states = keepStates ? [state] : [];
  for (const move of moves) {
    const next = engine.transition(state,move);
    if (!next.changed) return {valid:false,state,states};
    state = next.state;
    if (keepStates) states.push(state);
    if (stopAtWin && engine.isWon(state)) return {valid:true,state,states};
  }
  return {valid:true,state,states};
}

/** Loop erasure is sound because every rule depends only on current occupancy. */
function eraseLoops(engine,start,moves) {
  let state = start;
  const sequence = [], states = [start], positions = new Map([[engine.key(start),0]]);
  if (engine.isWon(state)) return [];
  for (const move of moves) {
    const next = engine.transition(state,move);
    if (!next.changed) return null;
    const key = engine.key(next.state), previous = positions.get(key);
    if (previous !== undefined) {
      for (let i = previous + 1; i < states.length; i++) positions.delete(engine.key(states[i]));
      states.length = previous + 1;sequence.length = previous;state = states[previous];
    } else {
      sequence.push(copyMove(move));state = next.state;states.push(state);positions.set(key,sequence.length);
    }
    if (engine.isWon(state)) return sequence;
  }
  return engine.isWon(state) ? sequence : null;
}

/**
 * A verified route from the CURRENT board: reverse the actual legal history,
 * then follow the initial certificate. This is a safe route, not a minimum.
 */
export function safeSolution(level,state,options = {}) {
  const checked = validateLevel(level);
  if (!checked.valid) return inconclusive('invalid-level',{source:'safe-history',method:'safe-history',errors:checked.errors});
  const engine = createEngine(level);
  state ??= engine.initialState();
  if (!engine.validateState(state).valid) return inconclusive('invalid-state',{source:'safe-history',method:'safe-history'});
  if (engine.isWon(state)) return {status:'solved',solution:[],optimal:true,source:'already-won',method:'already-won',visited:0,proof:{minimumLength:0,allShorterPathsExhausted:true}};
  const certificate = options.initialSolution ?? level.solution;
  if (!Array.isArray(certificate) || !certificate.length || certificate.length > LIMITS.sequence) return inconclusive('missing-initial-certificate',{source:'safe-history',method:'safe-history'});
  const start = engine.initialState(), certified = walk(engine,start,certificate,{keepStates:true});
  if (!certified.valid || !engine.isWon(certified.state)) return inconclusive('invalid-initial-certificate',{source:'safe-history',method:'safe-history'});
  let candidate = null;
  const currentKey = engine.key(state);
  // Reuse a certificate suffix when the current board is already on that path.
  const onPath = certified.states.findLastIndex(candidateState => engine.key(candidateState) === currentKey);
  if (onPath >= 0) candidate = certificate.slice(onPath).map(copyMove);
  const history = Array.isArray(options.history) ? options.history.slice(0,Number.isSafeInteger(options.cursor) ? Math.max(0,options.cursor) : undefined) : null;
  if (history && history.length + certificate.length <= LIMITS.sequence) {
    const arrived = walk(engine,start,history);
    if (arrived.valid && engine.key(arrived.state) === currentKey) {
      const throughHistory = [...history.slice().reverse().map(invertMove),...certificate.map(copyMove)];
      const shortened = eraseLoops(engine,state,throughHistory);
      if (shortened && (!candidate || shortened.length < candidate.length)) candidate = shortened;
    }
  }
  if (!candidate) return inconclusive('history-does-not-match-current-board',{source:'safe-history',method:'safe-history'});
  const solution = eraseLoops(engine,state,candidate);
  if (!solution) return inconclusive('current-route-not-verified',{source:'safe-history',method:'safe-history'});
  const verified = walk(engine,state,solution);
  if (!verified.valid || !engine.isWon(verified.state)) return inconclusive('current-route-not-verified',{source:'safe-history',method:'safe-history'});
  return {status:'solved',solution,optimal:false,source:'safe-history',method:'safe-history',visited:0,proof:{replay:true,fromCurrentState:true,historyVerified:!!history}};
}

export function analyzePosition(level,state,options = {}) {
  const safe = safeSolution(level,state,options);
  if (safe.status === 'solved' && !safe.solution.length) return safe;
  if (options.allowSearch === false) return safe;
  const searched = solve(level,state,options);
  if (searched.status === 'solved') return searched;
  if (safe.status === 'solved') return {...safe,visited:searched.visited,searchStatus:searched.status,searchReason:searched.reason,elapsedMs:searched.elapsedMs};
  return searched;
}

export function describeMove(level,move) {
  const command = level.commands.find(item => item.id === move?.command);
  if (!command || ![1,-1].includes(move?.direction)) return '';
  const turns = command.turns.map(turn => {
    const ring = level.rings.find(item => item.id === turn.ring), count = Math.abs(turn.delta * (ring.step ?? 1));
    return `${ring.label ?? 'anel '+ring.id} ${count === 1 ? 'uma casa' : count+' casas'} no sentido ${move.direction * turn.delta > 0 ? 'horário' : 'anti-horário'}`;
  });
  return command.turns.length > 1 ? `Acione a engrenagem: ${turns.join(' e ')}.` : `Gire o ${turns[0]}.`;
}

export function hintFromSolution(level,state,solution,tier = 0) {
  const check = replay(level,solution,{state});
  if (!check.valid || !check.solved) return {text:'Não foi possível confirmar uma continuação a partir desta posição. Tente novamente.',verified:false,affectedCells:[],affectedRings:[]};
  if (!solution.length) return {text:'Todos os alvos estão completos ao mesmo tempo.',verified:true,affectedCells:[],affectedRings:[]};
  const engine = createEngine(level), move = solution[0], next = engine.transition(state,move);
  const before = engine.evaluateState(state), after = next.result;
  const membership = new Map(level.cells.map(cell => [cell.id,level.rings.filter(ring => ring.cells.includes(cell.id)).length]));
  const losesCorrect = Object.entries(level.targets).some(([cell,type]) => state.occupancy[cell] === type && next.state.occupancy[cell] !== type);
  const crossing = next.movements.some(movement => membership.get(movement.from) === 2 || membership.get(movement.to) === 2);
  const newlyUnlocked = level.commands.some(command => !engine.commandStatus(state,command.id).allowed && engine.commandStatus(next.state,command.id).allowed);
  let text;
  if (tier <= 0) {
    text = losesCorrect ? 'Uma peça no alvo ainda pode precisar circular. Observe o que ela permite organizar quando sai temporariamente.'
      : newlyUnlocked ? 'Observe as casas com sensor. Preparar um símbolo nelas pode liberar o giro de outra região.'
      : crossing ? 'A casa compartilhada pertence aos dois anéis. Seu conteúdo muda mesmo quando apenas um deles gira.'
      : before.total > 1 ? 'Todas as peças do anel circulam juntas. Compare o que acontece com os vários alvos em um único giro.'
      : 'O alvo fica parado. Procure o sentido que leva a peça até ele pelo percurso.';
  } else if (tier === 1) {
    const command = level.commands.find(item => item.id === move.command);
    const label = command.label ?? (command.turns.length > 1 ? 'a engrenagem' : 'o anel '+command.turns[0].ring);
    text = newlyUnlocked ? `Use ${label} para preparar o sensor e abrir a próxima possibilidade.`
      : losesCorrect ? `Comece por ${label}. A continuação verificada recoloca depois as peças que precisam sair do alvo.`
      : crossing ? `Prepare a passagem com ${label}. A peça na conexão pode seguir pelo outro anel em um giro posterior.`
      : after.matched > before.matched ? `Observe ${label}: um giro adequado aproxima as peças dos alvos sem mover os próprios alvos.`
      : `Comece por ${label} e prepare a posição anterior ao encaixe final.`;
  } else text = `${describeMove(level,move)} Há uma continuação verificada a partir desse movimento.`;
  return {text,verified:true,...(tier >= 2 ? {move:copyMove(move)} : {}),affectedCells:next.affectedCells,affectedRings:next.affectedRings};
}

export function certifyAnalysis(level,state,result) {
  if (!validateState(level,state).valid) throw new Error('A posição atual não passou pela validação.');
  if (!result || !['solved','inconclusive','unsolvable'].includes(result.status)) throw new Error('Resposta de análise inválida.');
  if (result.status === 'solved') {
    const check = replay(level,result.solution,{state});
    if (!check.valid || !check.solved) throw new Error('A continuação não resolve a posição atual.');
    const proof = result.proof;
    const optimumCertified = result.solution.length === 0 || result.source === 'breadth-first' && proof?.allShorterPathsExhausted === true && proof.minimumLength === result.solution.length;
    return {...result,solution:result.solution.map(copyMove),optimal:result.optimal === true && optimumCertified,proof:{...proof,replay:true,fromCurrentState:true}};
  }
  if (result.status === 'unsolvable' && !(result.reason === 'reachable-graph-exhausted' && result.proof?.reachableGraphExhausted === true)) return inconclusive('unproven-impossibility');
  return {...result,solution:null,optimal:false};
}

export function certifyGenerated(result,options = {}) {
  if (!result?.level || !validateLevel(result.level).valid || result.level.rulesVersion !== RULES_VERSION) throw new Error('A fase gerada não passou pela validação.');
  if (!Number.isSafeInteger(result.seed) || result.seed < 0 || result.seed > 0xffffffff || typeof result.generatorVersion !== 'string' || !result.generatorVersion) throw new Error('A fase gerada não informa sua seed e versão.');
  if (typeof result.signature !== 'string' || !result.signature || (options.recentSignatures ?? []).includes(result.signature)) throw new Error('A fase gerada repete uma configuração recente.');
  if (createEngine(result.level).isWon(initialState(result.level))) throw new Error('A fase gerada já começa resolvida.');
  const certificate = replay(result.level,result.level.solution);
  if (!certificate.valid || !certificate.solved) throw new Error('A solução da fase gerada não pôde ser confirmada.');
  return {...result,level:{...result.level,solution:result.level.solution.map(copyMove)},validation:{...result.validation,valid:true,replay:true,initialUnsolved:true}};
}
