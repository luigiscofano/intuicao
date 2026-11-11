/** FOZ: regras e operações puras, sem DOM e sem consulta ao gabarito. */
const ownKeys = (value) => Object.keys(value).sort().join(',');
const integer = Number.isInteger;
const pointCount = (level) => level.width * level.height;

export function neighborsFor(level, index) {
  const neighbors = [];
  for (const [a, b] of level.channels) {
    if (a === index) neighbors.push(b);
    else if (b === index) neighbors.push(a);
  }
  const order = [index - level.width, index + 1, index + level.width, index - 1];
  return neighbors.sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

export function isLevelValid(level) {
  if (!level || !integer(level.width) || !integer(level.height) || level.width < 2 || level.height < 2 || level.width > 12 || level.height > 12) return false;
  const count = pointCount(level);
  if (!integer(level.root) || level.root < 0 || level.root >= count || !Array.isArray(level.channels) || !level.clues || typeof level.clues !== 'object' || Array.isArray(level.clues)) return false;
  const seen = new Set();
  for (const edge of level.channels) {
    if (!Array.isArray(edge) || edge.length !== 2) return false;
    const [a, b] = edge;
    if (!integer(a) || !integer(b) || a < 0 || b < 0 || a >= count || b >= count || a === b) return false;
    if (Math.abs(Math.floor(a / level.width) - Math.floor(b / level.width)) + Math.abs(a % level.width - b % level.width) !== 1) return false;
    const key = [a, b].sort((x, y) => x - y).join(':');
    if (seen.has(key)) return false;
    seen.add(key);
  }
  return Object.entries(level.clues).every(([key, distance]) => {
    const index = Number(key);
    return String(index) === key && integer(index) && index >= 0 && index < count && integer(distance) && (index === level.root ? distance === 0 : distance > 0 && distance < count);
  });
}

export function initialState(level) {
  return { arrows: Array(pointCount(level)).fill(-1) };
}

export function isStateValid(level, state) {
  if (!isLevelValid(level) || !state || typeof state !== 'object' || ownKeys(state) !== 'arrows' || !Array.isArray(state.arrows) || state.arrows.length !== pointCount(level)) return false;
  return Array.from(state.arrows).every((target, source) => integer(target) && (source === level.root ? target === -1 : target === -1 || neighborsFor(level, source).includes(target)));
}

export function applyAction(level, state, action) {
  if (!isStateValid(level, state) || !action || typeof action !== 'object') return state;
  const source = action.type === 'link' ? action.from : action.index;
  if (!integer(source) || source < 0 || source >= pointCount(level) || source === level.root) return state;
  const neighbors = neighborsFor(level, source);
  let target;
  if (action.type === 'link') target = action.to;
  else if (action.type === 'cell') {
    const tool = action.tool || 'cycle';
    if (tool === 'clear') target = -1;
    else if (tool === 'cycle') {
      const choices = [...neighbors, -1];
      target = choices[(choices.indexOf(state.arrows[source]) + 1) % choices.length];
    } else {
      const offsets = { up: -level.width, right: 1, down: level.width, left: -1 };
      if (!Object.hasOwn(offsets, tool)) return state;
      target = source + offsets[tool];
    }
  } else return state;
  if (target !== -1 && !neighbors.includes(target)) return state;
  if (target === state.arrows[source]) return state;
  const arrows = [...state.arrows];
  arrows[source] = target;
  return { arrows };
}

export function checkState(level, state) {
  if (!isStateValid(level, state)) return { valid: false, complete: false, message: 'Estado inválido: confira o formato e os canais permitidos.', errors: [] };
  const count = pointCount(level);
  const missing = state.arrows.filter((target, index) => index !== level.root && target === -1).length;
  const errors = new Set();
  const distances = Array(count).fill(null);
  distances[level.root] = 0;
  let hasCycle = false;
  for (let start = 0; start < count; start += 1) {
    if (start === level.root) continue;
    const visited = new Set();
    let current = start;
    while (current !== level.root && state.arrows[current] !== -1 && !visited.has(current)) {
      visited.add(current);
      current = state.arrows[current];
    }
    if (visited.has(current)) {
      hasCycle = true;
      visited.forEach((index) => errors.add(index));
    } else if (current === level.root) {
      distances[start] = visited.size;
      if (Object.hasOwn(level.clues, start) && level.clues[start] !== visited.size) errors.add(start);
    }
  }
  const complete = missing === 0;
  const valid = complete && errors.size === 0;
  const message = valid ? 'Todas as rotas chegam à foz e respeitam as distâncias.' : hasCycle ? 'Há um ciclo: toda rota precisa alcançar a foz.' : errors.size ? 'Uma rota completa não corresponde à distância de sua pista.' : `Faltam ${missing} setas para completar os canais.`;
  return { valid, complete, message, errors: [...errors].sort((a, b) => a - b), missing, distances };
}

export function solutionState(level) {
  return { arrows: Array.isArray(level.solution) ? [...level.solution] : Array.from({ length: pointCount(level) }, (_, index) => index === level.root ? -1 : level.solution[index]) };
}

export function toolsForLevel() {
  return [{ id: 'cycle', label: 'Alternar seta' }, { id: 'up', label: '↑ Cima' }, { id: 'right', label: '→ Direita' }, { id: 'down', label: '↓ Baixo' }, { id: 'left', label: '← Esquerda' }, { id: 'clear', label: 'Limpar' }];
}
