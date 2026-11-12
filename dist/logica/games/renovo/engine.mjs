/** RENOVO: cobertura de trios por regras, independente de DOM e gabarito. */
const integer = Number.isInteger;
const keyOf = ([a, b]) => a < b ? `${a}:${b}` : `${b}:${a}`;
const normalizedEdge = (a, b) => a < b ? [a, b] : [b, a];
const ownKeys = (value) => Object.keys(value).sort().join(',');

export function isLevelValid(level) {
  if (!level || !integer(level.width) || !integer(level.height) || level.width < 2 || level.height < 2 || level.width > 12 || level.height > 12 || !level.pieces || typeof level.pieces !== 'object' || Array.isArray(level.pieces)) return false;
  const counts = { S: 0, B: 0, F: 0 };
  for (const [key, kind] of Object.entries(level.pieces)) {
    const index = Number(key);
    if (String(index) !== key || !integer(index) || index < 0 || index >= level.width * level.height || !Object.hasOwn(counts, kind)) return false;
    counts[kind] += 1;
  }
  return counts.S > 0 && counts.S === counts.B && counts.S === counts.F;
}

export function visiblePieces(level, source) {
  const result = [];
  const x = source % level.width;
  const y = Math.floor(source / level.width);
  for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
    let xx = x + dx;
    let yy = y + dy;
    while (xx >= 0 && xx < level.width && yy >= 0 && yy < level.height) {
      const index = yy * level.width + xx;
      if (Object.hasOwn(level.pieces, index)) { result.push(index); break; }
      xx += dx; yy += dy;
    }
  }
  return result;
}

export function isLinkAllowed(level, from, to) {
  if (!integer(from) || !integer(to) || from === to || !Object.hasOwn(level.pieces, from) || !Object.hasOwn(level.pieces, to)) return false;
  const a = level.pieces[from];
  const b = level.pieces[to];
  return ((a === 'B' && b !== 'B') || (b === 'B' && a !== 'B')) && visiblePieces(level, from).includes(to);
}

export function initialState() { return { links: [], selected: null }; }

export function isStateValid(level, state) {
  if (!isLevelValid(level) || !state || typeof state !== 'object' || ownKeys(state) !== 'links,selected' || !Array.isArray(state.links) || state.links.length > Object.keys(level.pieces).length * 4) return false;
  if (state.selected !== null && (!integer(state.selected) || !Object.hasOwn(level.pieces, state.selected))) return false;
  const seen = new Set();
  for (const edge of state.links) {
    if (!Array.isArray(edge) || edge.length !== 2 || !isLinkAllowed(level, edge[0], edge[1])) return false;
    const key = keyOf(edge);
    if (seen.has(key)) return false;
    seen.add(key);
  }
  return true;
}

function toggleLink(state, from, to) {
  const key = keyOf([from, to]);
  const found = state.links.some((edge) => keyOf(edge) === key);
  const links = found ? state.links.filter((edge) => keyOf(edge) !== key).map((edge) => [...edge]) : [...state.links.map((edge) => [...edge]), normalizedEdge(from, to)];
  links.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return { links, selected: null };
}

/** Um gesto representa um trecho ou um trio, nunca uma consulta ao gabarito. */
export function isTraceAllowed(level, path) {
  if (!Array.isArray(path) || ![2, 3].includes(path.length) || new Set(path).size !== path.length) return false;
  if (!path.every(integer) || !path.slice(1).every((index, i) => isLinkAllowed(level, path[i], index))) return false;
  if (path.length === 2) return true;
  const [start, bud, end] = path;
  if (level.pieces[bud] !== 'B' || !['S', 'F'].includes(level.pieces[start]) || !['S', 'F'].includes(level.pieces[end]) || level.pieces[start] === level.pieces[end]) return false;
  return (Math.floor(start / level.width) === Math.floor(bud / level.width)) !== (Math.floor(end / level.width) === Math.floor(bud / level.width));
}

function addTrace(level, state, path) {
  if (!isTraceAllowed(level, path)) return state;
  const seen = new Set(state.links.map(keyOf));
  const added = path.slice(1).map((index, i) => normalizedEdge(path[i], index)).filter(edge => !seen.has(keyOf(edge)));
  if (!added.length && state.selected === null) return state;
  const links = [...state.links.map(edge => [...edge]), ...added];
  links.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return { links, selected: null };
}

export function applyAction(level, state, action) {
  if (!isStateValid(level, state) || !action || typeof action !== 'object') return state;
  if (action.type === 'cancel-selection') return state.selected === null ? state : { links: state.links.map((edge) => [...edge]), selected: null };
  if (action.type === 'link') return isLinkAllowed(level, action.from, action.to) ? toggleLink(state, action.from, action.to) : state;
  // Arrastar acrescenta sem alternar: passar novamente por um trecho não o apaga.
  // Cruzamentos e graus excessivos continuam sendo tentativas verificadas por checkState.
  if (action.type === 'trace') return addTrace(level, state, action.path);
  if (action.type !== 'cell' || !integer(action.index) || !Object.hasOwn(level.pieces, action.index)) return state;
  const index = action.index;
  const tool = action.tool || 'select';
  if (tool === 'clear') {
    const links = state.links.filter((edge) => !edge.includes(index)).map((edge) => [...edge]);
    return links.length === state.links.length && state.selected === null ? state : { links, selected: null };
  }
  if (!['select', 'cycle'].includes(tool)) return state;
  if (state.selected === index) return { links: state.links.map((edge) => [...edge]), selected: null };
  if (state.selected !== null && isLinkAllowed(level, state.selected, index)) return toggleLink(state, state.selected, index);
  return { links: state.links.map((edge) => [...edge]), selected: index };
}

// Interseção inclusiva: contato só é permitido no botão compartilhado por dois trechos.
export function segmentsIntersect(level, edgeA, edgeB) {
  const [a, b] = edgeA.map((i) => [i % level.width, Math.floor(i / level.width)]);
  const [d, e] = edgeB.map((i) => [i % level.width, Math.floor(i / level.width)]);
  const horizontalA = a[1] === b[1];
  const horizontalB = d[1] === e[1];
  let intersection = false;
  let overlap = false;
  if (horizontalA === horizontalB) {
    const sameLine = horizontalA ? a[1] === d[1] : a[0] === d[0];
    const axis = horizontalA ? 0 : 1;
    const lo = Math.max(Math.min(a[axis], b[axis]), Math.min(d[axis], e[axis]));
    const hi = Math.min(Math.max(a[axis], b[axis]), Math.max(d[axis], e[axis]));
    intersection = sameLine && lo <= hi;
    overlap = sameLine && lo < hi;
  } else {
    const [h1, h2, v1, v2] = horizontalA ? [a, b, d, e] : [d, e, a, b];
    intersection = v1[0] >= Math.min(h1[0], h2[0]) && v1[0] <= Math.max(h1[0], h2[0]) && h1[1] >= Math.min(v1[1], v2[1]) && h1[1] <= Math.max(v1[1], v2[1]);
  }
  if (!intersection) return false;
  const shared = edgeA.find((index) => edgeB.includes(index));
  return overlap || shared === undefined || level.pieces[shared] !== 'B';
}

export function checkState(level, state) {
  if (!isStateValid(level, state)) return { valid: false, complete: false, message: 'Estado inválido: as ligações precisam alcançar a primeira peça visível.', errors: [] };
  const adjacent = Object.fromEntries(Object.keys(level.pieces).map((key) => [key, []]));
  for (const [a, b] of state.links) { adjacent[a].push(b); adjacent[b].push(a); }
  const errors = new Set();
  let pending = 0;
  for (const [key, kind] of Object.entries(level.pieces)) {
    const index = Number(key);
    const partners = adjacent[key];
    const required = kind === 'B' ? 2 : 1;
    if (partners.length < required) pending += 1;
    if (partners.length > required) errors.add(index);
    if (kind === 'B' && partners.length === 2) {
      const kinds = partners.map((other) => level.pieces[other]);
      const horizontal = partners.map((other) => Math.floor(other / level.width) === Math.floor(index / level.width));
      if (!kinds.includes('S') || !kinds.includes('F') || horizontal[0] === horizontal[1]) { errors.add(index); partners.forEach((other) => errors.add(other)); }
    }
  }
  let crossing = false;
  for (let i = 0; i < state.links.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (segmentsIntersect(level, state.links[i], state.links[j])) {
        crossing = true;
        [...state.links[i], ...state.links[j]].forEach((index) => errors.add(index));
      }
    }
  }
  const complete = pending === 0;
  const valid = complete && errors.size === 0;
  const message = valid ? 'Todas as peças formam trios com uma curva e sem cruzamentos.' : crossing ? 'As ligações não podem se cruzar, se sobrepor ou compartilhar extremos.' : errors.size ? 'Cada botão precisa de uma semente e uma folha em direções perpendiculares; os extremos não podem ser repetidos.' : `Faltam ligações em ${pending} peças. Selecione duas peças para ligar ou retirar o trecho.`;
  return { valid, complete, message, errors: [...errors].sort((a, b) => a - b), pending };
}

export function solutionState(level) {
  const links = level.solution.flatMap(([seed, bud, leaf]) => [normalizedEdge(seed, bud), normalizedEdge(bud, leaf)]);
  links.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return { links, selected: null };
}

export function toolsForLevel() { return [{ id: 'select', label: 'Ligar e traçar' }, { id: 'clear', label: 'Limpar peça' }]; }
