/**
 * ÓRBITA — deterministic permutations of physical cells.
 * Coordinates, animation, history, scoring and persistence are not game rules.
 */
export const RULES_VERSION = 'orbita-1';
export const LIMITS = Object.freeze({cells: 80, rings: 5, ringCells: 32, commands: 24, pieceTypes: 32, sequence: 20000});

const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const natural = value => Number.isSafeInteger(value) && value >= 0;
const idOK = value => typeof value === 'string' && value.length > 0 && value.length <= 96 && !/[\u0000-\u001f]/.test(value) && !['__proto__','prototype','constructor'].includes(value);
const modulo = (value, length) => ((value % length) + length) % length;
const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
const cloneMove = move => ({command: move.command, direction: move.direction});
const frozenState = (occupancy, moves) => Object.freeze({occupancy: Object.freeze(occupancy), moves});

export function validateLevel(level) {
  const errors = [];
  if (!record(level)) return {valid: false, errors: ['A fase deve ser um objeto.']};
  if (!(Number.isSafeInteger(level.id) && level.id > 0 || idOK(level.id))) errors.push('Identificador de fase inválido.');
  if (level.version !== 1) errors.push('Versão de fase incompatível.');
  if (level.rulesVersion !== RULES_VERSION) errors.push('Versão de regras incompatível.');

  const cells = new Map(), rings = new Map(), types = new Map(), symbols = new Set();
  if (!Array.isArray(level.cells) || !level.cells.length || level.cells.length > LIMITS.cells) errors.push('A fase precisa de 1 a 80 casas físicas.');
  else for (const cell of level.cells) {
    if (!record(cell) || !idOK(cell.id) || cells.has(cell.id)) {errors.push('Cada casa precisa de um identificador único.'); continue;}
    cells.set(cell.id, cell);
    if (cell.x !== undefined && !Number.isFinite(cell.x) || cell.y !== undefined && !Number.isFinite(cell.y)) errors.push(`Coordenadas inválidas na casa ${cell.id}.`);
  }
  if (!Array.isArray(level.pieceTypes) || !level.pieceTypes.length || level.pieceTypes.length > LIMITS.pieceTypes) errors.push('A fase precisa declarar seus tipos de peças.');
  else for (const type of level.pieceTypes) {
    if (!record(type) || !idOK(type.id) || types.has(type.id)) {errors.push('Os tipos de peças precisam de identificadores únicos.'); continue;}
    types.set(type.id, type);
    if (typeof type.symbol !== 'string' || !type.symbol.trim() || type.symbol.length > 32 || symbols.has(type.symbol)) errors.push('Cada tipo deve ter um símbolo visível e distinto; peças iguais usam o mesmo tipo.');
    symbols.add(type.symbol);
  }

  const membership = new Map([...cells.keys()].map(id => [id, []]));
  if (!Array.isArray(level.rings) || !level.rings.length || level.rings.length > LIMITS.rings) errors.push('A fase precisa ter de 1 a 5 anéis.');
  else for (const ring of level.rings) {
    if (!record(ring) || !idOK(ring.id) || rings.has(ring.id)) {errors.push('Os anéis precisam de identificadores únicos.'); continue;}
    rings.set(ring.id, ring);
    if (!Array.isArray(ring.cells) || ring.cells.length < 3 || ring.cells.length > LIMITS.ringCells || new Set(ring.cells).size !== ring.cells.length) {
      errors.push(`O anel ${ring.id} precisa de 3 a 32 casas distintas e ordenadas.`); continue;
    }
    if (![1,2].includes(ring.step ?? 1)) errors.push(`O passo do anel ${ring.id} deve ser 1 ou 2.`);
    for (const id of ring.cells) {
      if (!cells.has(id)) errors.push(`O anel ${ring.id} referencia uma casa inexistente.`);
      else membership.get(id).push(ring.id);
    }
  }
  const pairCounts = new Map();
  for (const [id, owners] of membership) {
    if (!owners.length) errors.push(`A casa ${id} não pertence a nenhum anel.`);
    if (owners.length > 2) errors.push(`A casa ${id} pertence a mais de dois anéis.`);
    if (owners.length === 2) {
      const key = owners.slice().sort().join('\u0000');
      pairCounts.set(key, (pairCounts.get(key) ?? 0) + 1);
    }
  }
  if ([...pairCounts.values()].some(count => count > 2)) errors.push('Um par de anéis não pode compartilhar mais de duas casas.');

  const counts = new Map(), demands = new Map();
  if (!record(level.initial)) errors.push('Falta a ocupação inicial das casas.');
  else {
    if (Object.keys(level.initial).length !== cells.size) errors.push('Toda casa física deve conter exatamente uma peça.');
    for (const id of cells.keys()) {
      if (!own(level.initial,id) || !types.has(level.initial[id])) errors.push(`A casa ${id} precisa de uma peça de tipo conhecido.`);
      else counts.set(level.initial[id], (counts.get(level.initial[id]) ?? 0) + 1);
    }
    if (Object.keys(level.initial).some(id => !cells.has(id))) errors.push('A ocupação contém casas que não existem.');
  }
  if (!record(level.targets) || !Object.keys(level.targets).length) errors.push('A fase precisa de pelo menos um alvo.');
  else for (const [id, type] of Object.entries(level.targets)) {
    if (!cells.has(id) || !types.has(type)) errors.push('Todo alvo deve referenciar uma casa e um tipo existentes.');
    demands.set(type, (demands.get(type) ?? 0) + 1);
  }
  for (const [type, count] of demands) if (count > (counts.get(type) ?? 0)) errors.push(`Há mais alvos de ${String(type)} do que peças desse tipo.`);

  const commands = new Map();
  if (!Array.isArray(level.commands) || !level.commands.length || level.commands.length > LIMITS.commands) errors.push('A fase precisa declarar de 1 a 24 comandos.');
  else for (const command of level.commands) {
    if (!record(command) || !idOK(command.id) || commands.has(command.id)) {errors.push('Os comandos precisam de identificadores únicos.'); continue;}
    commands.set(command.id, command);
    if (!Array.isArray(command.turns) || !command.turns.length || command.turns.length > LIMITS.rings) {errors.push(`O comando ${command.id} não define seus anéis.`); continue;}
    const affected = new Set(), usedRings = new Set();
    for (const turn of command.turns) {
      if (!record(turn) || !rings.has(turn.ring)) {errors.push(`O comando ${command.id} referencia um anel inexistente.`); continue;}
      const ring = rings.get(turn.ring);
      if (usedRings.has(turn.ring)) errors.push(`O comando ${command.id} repete um anel.`);
      usedRings.add(turn.ring);
      if (!Number.isSafeInteger(turn.delta) || !turn.delta || Math.abs(turn.delta) > LIMITS.ringCells || !Array.isArray(ring.cells) || modulo(turn.delta * (ring.step ?? 1), ring.cells.length) === 0) errors.push(`O comando ${command.id} precisa de um deslocamento inteiro não nulo.`);
      for (const id of Array.isArray(ring.cells) ? ring.cells : []) {
        if (affected.has(id)) errors.push(`A engrenagem ${command.id} movimenta anéis com casas sobrepostas.`);
        affected.add(id);
      }
    }
    if (command.requires !== undefined && !Array.isArray(command.requires)) errors.push(`Sensores inválidos no comando ${command.id}.`);
    else {
      const sensorCells = new Set();
      for (const condition of command.requires ?? []) {
        if (!record(condition) || !cells.has(condition.cell) || !types.has(condition.type)) {errors.push(`O sensor do comando ${command.id} deve usar casa e símbolo existentes.`); continue;}
        if (sensorCells.has(condition.cell)) errors.push(`Um sensor foi repetido no comando ${command.id}.`);
        sensorCells.add(condition.cell);
        if (affected.has(condition.cell)) errors.push(`O sensor do comando ${command.id} deve ficar fora de todas as casas movimentadas.`);
      }
    }
  }
  if (level.solution !== undefined) {
    if (!Array.isArray(level.solution) || level.solution.length > LIMITS.sequence) errors.push('A solução precisa ser uma lista limitada de comandos.');
    else for (const move of level.solution) if (!record(move) || !commands.has(move.command) || ![1,-1].includes(move.direction)) {errors.push('A solução contém um comando ou sentido inválido.'); break;}
  }
  return {valid: errors.length === 0, errors: [...new Set(errors)]};
}

function assertLevel(level) {
  const check = validateLevel(level);
  if (!check.valid) throw new TypeError(check.errors.join(' '));
}

function compile(level) {
  assertLevel(level);
  // Snapshot only logical data. Resizing or changing drawing metadata cannot
  // change an already prepared engine, and coordinate arithmetic never occurs.
  const cellIds = level.cells.map(cell => cell.id);
  const rings = new Map(level.rings.map(ring => [ring.id, {id:ring.id, cells:ring.cells.slice(), step:ring.step ?? 1}]));
  const initial = Object.fromEntries(cellIds.map(id => [id, level.initial[id]]));
  const targets = Object.entries(level.targets);
  const types = new Map(level.pieceTypes.map(type => [type.id, {...type}]));
  const counts = new Map();
  for (const value of Object.values(initial)) counts.set(value, (counts.get(value) ?? 0) + 1);
  const commands = new Map(level.commands.map(command => {
    const turns = command.turns.map(turn => ({ring:rings.get(turn.ring), delta:turn.delta}));
    return [command.id, {id:command.id,label:command.label ?? command.id,turns,requires:(command.requires ?? []).map(condition => ({...condition})),affectedCells:turns.flatMap(turn => turn.ring.cells)}];
  }));
  return {cellIds,rings,initial,targets,types,counts,commands};
}

function stateErrors(context, state) {
  const errors = [];
  if (!record(state) || !record(state.occupancy)) return ['Estado de ocupação inválido.'];
  if (!natural(state.moves)) errors.push('Contador de movimentos inválido.');
  if (Object.keys(state.occupancy).length !== context.cellIds.length) errors.push('O estado não contém exatamente uma peça por casa.');
  const counts = new Map();
  for (const id of context.cellIds) {
    if (!own(state.occupancy,id) || !context.types.has(state.occupancy[id])) {errors.push('Uma casa está vazia ou contém um tipo desconhecido.'); continue;}
    counts.set(state.occupancy[id], (counts.get(state.occupancy[id]) ?? 0) + 1);
  }
  if (counts.size !== context.counts.size || [...context.counts].some(([type, count]) => counts.get(type) !== count)) errors.push('A quantidade de peças de cada tipo foi alterada.');
  return [...new Set(errors)];
}

function classify(context, state) {
  let matched = 0;
  const mismatches = [];
  for (const [cell, type] of context.targets) {
    if (state.occupancy[cell] === type) matched++;
    else mismatches.push({cell, expected:type, actual:state.occupancy[cell]});
  }
  const total = context.targets.length, won = matched === total;
  return {won,matched,total,status:won ? 'won' : 'playing',mismatches};
}

function status(context, state, commandId, direction = 1) {
  const command = context.commands.get(commandId);
  if (!command || ![1,-1].includes(direction)) return {allowed:false,reason:'Escolha um anel e um sentido de giro.',reasonCode:'unknown-command',affectedCells:[],affectedRings:[],conditions:[],steps:[]};
  const conditions = command.requires.map(condition => ({...condition,actual:state.occupancy[condition.cell],satisfied:state.occupancy[condition.cell] === condition.type}));
  const unmet = conditions.filter(condition => !condition.satisfied);
  const required = [...new Set(unmet.map(condition => context.types.get(condition.type)?.symbol ?? condition.type))].join(' e ');
  return {
    allowed:!unmet.length,
    reason:unmet.length ? `Coloque ${required} ${unmet.length === 1 ? 'no sensor marcado' : 'nos sensores marcados'} para liberar este giro.` : '',
    reasonCode:unmet.length ? 'sensor' : '',
    command:command.id,
    affectedCells:command.affectedCells.slice(),
    affectedRings:command.turns.map(turn => turn.ring.id),
    conditions,
    steps:command.turns.map(turn => ({ring:turn.ring.id,steps:Math.abs(turn.delta * turn.ring.step),direction:Math.sign(direction * turn.delta)}))
  };
}

function movementsFor(context, state, move) {
  const command = context.commands.get(move.command);
  if (!command || ![1,-1].includes(move.direction)) return [];
  const movements = [];
  for (const turn of command.turns) {
    const cells = turn.ring.cells, offset = move.direction * turn.delta * turn.ring.step;
    for (let i = 0; i < cells.length; i++) {
      const toIndex = modulo(i + offset, cells.length);
      movements.push({from:cells[i],to:cells[toIndex],type:state.occupancy[cells[i]],ring:turn.ring.id,steps:Math.abs(offset),direction:Math.sign(offset),fromIndex:i,toIndex});
    }
  }
  return movements;
}

function step(context, state, move) {
  if (!record(move) || ![1,-1].includes(move.direction)) return {allowed:false,changed:false,positionChanged:false,state,movements:[],reason:'Escolha um anel e um sentido de giro.',reasonCode:'unknown-command',affectedCells:[],affectedRings:[],conditions:[],steps:[],result:classify(context,state)};
  const availability = status(context, state, move?.command, move?.direction);
  if (!availability.allowed) return {...availability,changed:false,positionChanged:false,state,movements:[],result:classify(context,state)};
  if (state.moves === Number.MAX_SAFE_INTEGER) return {...availability,allowed:false,changed:false,positionChanged:false,reason:'O contador chegou ao limite desta tentativa. Reinicie para continuar.',reasonCode:'move-limit',state,movements:[],result:classify(context,state)};
  const movements = movementsFor(context,state,move);
  const occupancy = {...state.occupancy};
  // Every source is read from ONE previous occupancy. A gear is not a sequence
  // of ring calls, and step 2 has no intermediate observable board.
  for (const movement of movements) occupancy[movement.to] = state.occupancy[movement.from];
  const next = frozenState(occupancy,state.moves + 1);
  return {...availability,changed:true,positionChanged:movements.some(movement => state.occupancy[movement.to] !== movement.type),state:next,movements,result:classify(context,next)};
}

/** Prepare once for generation/search; every path uses the same step kernel. */
export function createEngine(level) {
  const context = compile(level), generated = new WeakSet();
  const check = state => {
    if (generated.has(state)) return;
    const errors = stateErrors(context,state);
    if (errors.length) throw new TypeError(errors.join(' '));
  };
  const initial = () => {
    const state = frozenState({...context.initial},0); generated.add(state); return state;
  };
  return Object.freeze({
    initialState:initial,
    validateState(state) {const errors = stateErrors(context,state);return {valid:!errors.length,errors};},
    transition(state,move) {check(state);const result = step(context,state,move);if(result.changed)generated.add(result.state);return result;},
    preview(state,move) {check(state);return {...status(context,state,move?.command,[1,-1].includes(move?.direction) ? move.direction : 0),movements:movementsFor(context,state,move ?? {})};},
    commandStatus(state,commandId,direction = 1) {check(state);return status(context,state,commandId,direction);},
    evaluateState(state) {check(state);return classify(context,state);},
    isWon(state) {check(state);return context.targets.every(([cell,type]) => state.occupancy[cell] === type);},
    allowedMoves(state) {check(state);return [...context.commands.keys()].filter(id => status(context,state,id).allowed).flatMap(command => [{command,direction:1},{command,direction:-1}]);},
    // No move counter, drawing coordinates, or invisible piece identities.
    key(state) {check(state);return JSON.stringify(context.cellIds.map(id => state.occupancy[id]));}
  });
}

export function validateState(level,state) {
  const check = validateLevel(level);
  if (!check.valid) return check;
  return createEngine(level).validateState(state);
}
export function initialState(level) {return createEngine(level).initialState();}
export function transition(level,state,move) {return createEngine(level).transition(state,move);}
export function preview(level,state,move) {return createEngine(level).preview(state,move);}
export function commandStatus(level,state,commandId,direction = 1) {return createEngine(level).commandStatus(state,commandId,direction);}
export function evaluateState(level,state) {return createEngine(level).evaluateState(state);}
export function isWon(level,state) {return createEngine(level).isWon(state);}
export function allowedMoves(level,state) {return createEngine(level).allowedMoves(state);}
export function invertMove(move) {
  if (!record(move) || !idOK(move.command) || ![1,-1].includes(move.direction)) throw new TypeError('Comando inválido.');
  return {command:move.command,direction:-move.direction};
}
export function stateKey(state) {
  if (!record(state?.occupancy)) return '';
  return JSON.stringify(Object.keys(state.occupancy).sort().map(id => [id,state.occupancy[id]]));
}

export function replay(level,moves,{state} = {}) {
  const checked = validateLevel(level);
  if (!checked.valid) return {valid:false,solved:false,state:state ?? null,steps:[],error:checked.errors.join(' ')};
  const engine = createEngine(level);
  let current = state ?? engine.initialState();
  const stateCheck = engine.validateState(current);
  if (!stateCheck.valid) return {valid:false,solved:false,state:current,steps:[],error:stateCheck.errors.join(' ')};
  if (!Array.isArray(moves) || moves.length > LIMITS.sequence) return {valid:false,solved:false,state:current,steps:[],error:'Sequência inválida ou extensa demais.'};
  const steps = [];
  for (const move of moves) {
    const result = engine.transition(current,move);
    if (!result.changed) return {valid:false,solved:false,state:current,steps,error:result.reason || 'Um comando não está disponível.'};
    steps.push(result);current = result.state;
  }
  return {valid:true,solved:engine.isWon(current),state:current,steps};
}

/** Remove only immediately inverse moves; no unproven permutation shortcuts. */
export function cancelInversePairs(moves) {
  const result = [];
  for (const move of moves) {
    const previous = result[result.length - 1];
    if (previous?.command === move.command && previous.direction === -move.direction) result.pop();
    else result.push(cloneMove(move));
  }
  return result;
}
