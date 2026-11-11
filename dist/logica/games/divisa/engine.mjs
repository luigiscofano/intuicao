/** DIVISA: operações puras. O verificador usa regras, nunca o gabarito. */
export function neighbors(level, index) {
  const { rows, cols } = level;
  const row = Math.floor(index / cols), col = index % cols, out = [];
  if (row > 0) out.push(index - cols);
  if (row + 1 < rows) out.push(index + cols);
  if (col > 0) out.push(index - 1);
  if (col + 1 < cols) out.push(index + 1);
  return out;
}

export function initialState(level) {
  return { cells: level.givens.slice(), lastChanged: null };
}

export function isStateValid(level, state) {
  if (!state || typeof state !== 'object' || Array.isArray(state) || !Array.isArray(state.cells)) return false;
  if (state.cells.length !== level.rows * level.cols) return false;
  if (state.lastChanged != null && (!Number.isInteger(state.lastChanged) || state.lastChanged < 0 || state.lastChanged >= state.cells.length)) return false;
  return Array.from(state.cells).every((value, i) => (value === null || level.letters.includes(value)) &&
    (level.givens[i] === null || value === level.givens[i]));
}

export function applyAction(level, state, action) {
  if (!isStateValid(level, state) || !action || action.type !== 'cell') return state;
  const i = action.index;
  if (!Number.isInteger(i) || i < 0 || i >= state.cells.length || level.givens[i] !== null) return state;
  const current = state.cells[i];
  let value;
  if (action.tool === 'cycle') {
    const options = [null, ...level.letters];
    value = options[(options.indexOf(current) + 1) % options.length];
  } else if (action.tool === 'erase') value = null;
  else if (level.letters.includes(action.tool)) value = action.tool;
  else return state;
  if (value === current) return state;
  const cells = state.cells.slice();
  cells[i] = value;
  return { cells, lastChanged: i };
}

export function contactCounts(level, cells) {
  const counts = Object.fromEntries(Object.keys(level.contacts).map(key => [key, 0]));
  for (let i = 0; i < cells.length; i += 1) {
    for (const j of neighbors(level, i)) {
      if (j <= i || cells[i] === null || cells[j] === null || cells[i] === cells[j]) continue;
      const pair = [cells[i], cells[j]].sort().join('');
      counts[pair] = (counts[pair] || 0) + 1;
    }
  }
  return counts;
}

export function checkState(level, state) {
  if (!isStateValid(level, state)) return { valid: false, complete: false, message: 'Estado inválido: confira o tamanho, as letras e a preservação das pistas.', errors: [] };
  const complete = state.cells.every(value => value !== null);
  if (!complete) return { valid: false, complete: false, message: 'Ainda há casas sem território. Preencha todas antes de conferir.', errors: [] };
  const errors = new Set(), problems = [];
  for (const letter of level.letters) {
    const indices = state.cells.flatMap((value, i) => value === letter ? [i] : []);
    if (!indices.length) { problems.push(`O território ${letter} está ausente.`); continue; }
    const reached = new Set([indices[0]]), queue = [indices[0]];
    for (let q = 0; q < queue.length; q += 1) {
      for (const j of neighbors(level, queue[q])) {
        if (state.cells[j] === letter && !reached.has(j)) { reached.add(j); queue.push(j); }
      }
    }
    if (reached.size !== indices.length) {
      problems.push(`Todas as casas ${letter} precisam estar ligadas por lados.`);
      indices.forEach(i => errors.add(i));
    }
  }
  const counts = contactCounts(level, state.cells);
  for (const [pair, target] of Object.entries(level.contacts)) {
    if (counts[pair] === target) continue;
    problems.push(`${pair[0]}–${pair[1]} tem ${counts[pair]} lados; a pista pede ${target}.`);
    state.cells.forEach((letter, i) => { if (pair.includes(letter)) errors.add(i); });
  }
  return { valid: problems.length === 0, complete: true,
    message: problems.length ? problems.slice(0, 3).join(' ') : 'Todos os territórios estão conectados e todas as fronteiras conferem.',
    errors: [...errors].sort((a, b) => a - b), contacts: counts };
}

export function solutionState(level) {
  return { cells: level.solution.slice(), lastChanged: null };
}

export function toolsForLevel(level) {
  return [{ id: 'cycle', label: 'Alternar' }, ...level.letters.map(letter => ({ id: letter, label: `Território ${letter}` })), { id: 'erase', label: 'Limpar' }];
}
