/** REFÚGIO: null = indecidida, 0 = livre, 1 = barreira. */
export function neighbors(level, index) {
  const row = Math.floor(index / level.cols), col = index % level.cols, out = [];
  if (row > 0) out.push(index - level.cols);
  if (row + 1 < level.rows) out.push(index + level.cols);
  if (col > 0) out.push(index - 1);
  if (col + 1 < level.cols) out.push(index + 1);
  return out;
}

export function initialState(level) { return { cells: level.givens.slice(), lastChanged: null }; }

export function isStateValid(level, state) {
  if (!state || typeof state !== 'object' || Array.isArray(state) || !Array.isArray(state.cells) || state.cells.length !== level.rows * level.cols) return false;
  if (state.lastChanged != null && (!Number.isInteger(state.lastChanged) || state.lastChanged < 0 || state.lastChanged >= state.cells.length)) return false;
  if (!Array.from(state.cells).every((value, i) => (value === null || value === 0 || value === 1) &&
    (level.givens[i] === null || value === level.givens[i]))) return false;
  return level.markers.every(marker => state.cells[marker.index] === 0);
}

export function applyAction(level, state, action) {
  if (!isStateValid(level, state) || !action || action.type !== 'cell') return state;
  const i = action.index;
  if (!Number.isInteger(i) || i < 0 || i >= state.cells.length || level.givens[i] !== null || level.markers.some(marker => marker.index === i)) return state;
  let value;
  if (action.tool === 'cycle') value = state.cells[i] === null ? 0 : state.cells[i] === 0 ? 1 : null;
  else if (action.tool === 'free') value = 0;
  else if (action.tool === 'wall') value = 1;
  else if (action.tool === 'erase') value = null;
  else return state;
  if (value === state.cells[i]) return state;
  const cells = state.cells.slice(); cells[i] = value;
  return { cells, lastChanged: i };
}

/** Componentes livres por lados; números identificam marcos, não áreas. */
export function freeComponents(level, cells) {
  const componentOf = Array(cells.length).fill(-1), components = [];
  for (let i = 0; i < cells.length; i += 1) {
    if (cells[i] !== 0 || componentOf[i] !== -1) continue;
    const id = components.length, indices = [i]; componentOf[i] = id;
    for (let q = 0; q < indices.length; q += 1) {
      for (const j of neighbors(level, indices[q])) {
        if (cells[j] === 0 && componentOf[j] === -1) { componentOf[j] = id; indices.push(j); }
      }
    }
    components.push(indices);
  }
  return { componentOf, components };
}

export function checkState(level, state) {
  if (!isStateValid(level, state)) return { valid: false, complete: false, message: 'Estado inválido: confira o tamanho, as marcas e a preservação das pistas.', errors: [] };
  if (state.cells.some(value => value === null)) return { valid: false, complete: false, message: 'Ainda há casas indecididas. Marque cada uma como livre ou barreira.', errors: [] };
  const { componentOf, components } = freeComponents(level, state.cells);
  const errors = new Set(), problems = [];
  for (let id = 0; id < components.length; id += 1) {
    const count = level.markers.filter(marker => componentOf[marker.index] === id).length;
    if (count === 1) continue;
    problems.push(count === 0 ? 'Há uma região livre sem marco.' : 'Há uma região livre reunindo mais de um marco.');
    components[id].forEach(i => errors.add(i));
  }
  const wallContacts = {};
  state.cells.forEach((value, i) => {
    if (value !== 1) return;
    const touching = new Set(neighbors(level, i).filter(j => state.cells[j] === 0).map(j => componentOf[j]));
    wallContacts[i] = touching.size;
    if (touching.size !== 2) errors.add(i);
  });
  if (Object.values(wallContacts).some(count => count !== 2)) problems.push('Cada barreira precisa tocar exatamente duas regiões livres diferentes; duas casas da mesma região contam uma vez.');
  return { valid: problems.length === 0, complete: true,
    message: problems.length ? [...new Set(problems)].join(' ') : 'Cada refúgio tem um marco, e cada barreira separa exatamente dois refúgios.',
    errors: [...errors].sort((a, b) => a - b), regions: components.length, wallContacts };
}

export function solutionState(level) { return { cells: level.solution.slice(), lastChanged: null }; }
export function toolsForLevel() { return [{ id: 'cycle', label: 'Alternar' }, { id: 'free', label: 'Livre ○' }, { id: 'wall', label: 'Barreira ▨' }, { id: 'erase', label: 'Limpar' }]; }
