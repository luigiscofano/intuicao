/** Regras puras de PULSO. null = indecisa; 0 = vazia; 1 = batida. */
export function initialState(level) {
  const cells = Array(level.rows * level.cols).fill(null);
  for (const [index, value] of Object.entries(level.givens || {})) cells[Number(index)] = value;
  return { cells };
}

export function isStateValid(level, state) {
  return Boolean(state && typeof state === 'object' && Array.isArray(state.cells)
    && state.cells.length === level.rows * level.cols
    && Array.from(state.cells).every(value => value === null || value === 0 || value === 1)
    && Object.entries(level.givens || {}).every(([index, value]) => state.cells[Number(index)] === value));
}

export function applyAction(level, state, action) {
  if (!isStateValid(level, state) || action?.type !== 'cell'
    || !Number.isInteger(action.index) || action.index < 0 || action.index >= state.cells.length
    || Object.hasOwn(level.givens || {}, action.index)) return state;
  const current = state.cells[action.index];
  const value = action.tool === 'cycle' ? (current === null ? 1 : current === 1 ? 0 : null)
    : action.tool === 'mark' ? 1 : action.tool === 'empty' ? 0 : action.tool === 'clear' ? null : undefined;
  if (value === undefined || value === current) return state;
  const cells = state.cells.slice();
  cells[action.index] = value;
  return { cells };
}

export function checkState(level, state) {
  if (!isStateValid(level, state)) return { valid: false, complete: false, message: 'Estado inválido ou pista fixa alterada.', errors: [] };
  const { cells } = state;
  const complete = cells.every(value => value !== null);
  const errors = new Set();
  let reason = '';
  for (let row = 0; row < level.rows; row++) {
    const positions = [];
    let pending = false;
    for (let col = 0; col < level.cols; col++) {
      if (cells[row * level.cols + col] === 1) positions.push(col);
      if (cells[row * level.cols + col] === null) pending = true;
    }
    const wrongCount = positions.length > 3 || (!pending && positions.length !== 3);
    const wrongSpacing = positions.length === 3 && positions[1] - positions[0] !== positions[2] - positions[1];
    if (wrongCount || wrongSpacing) {
      for (let col = 0; col < level.cols; col++) errors.add(row * level.cols + col);
      reason ||= wrongSpacing ? 'As três batidas de cada linha precisam de intervalos iguais.' : 'Cada linha precisa de exatamente três batidas.';
    }
  }
  for (let col = 0; col < level.cols; col++) {
    let count = 0, pending = 0;
    for (let row = 0; row < level.rows; row++) {
      count += cells[row * level.cols + col] === 1;
      pending += cells[row * level.cols + col] === null;
    }
    if (count > level.quotas[col] || count + pending < level.quotas[col]) {
      for (let row = 0; row < level.rows; row++) errors.add(row * level.cols + col);
      reason ||= 'Confira a quantidade de batidas nas colunas assinaladas.';
    }
  }
  const valid = complete && errors.size === 0;
  return { valid, complete, errors: [...errors], message: valid ? 'Todas as batidas e cotas estão certas.' : reason || 'Marque cada casa como batida ou vazia antes de checar.' };
}

export function solutionState(level) { return { cells: level.solution.slice() }; }
export function toolsForLevel() {
  return [{ id: 'cycle', label: 'Alternar: batida, vazio, limpar' }, { id: 'mark', label: '● Batida' }, { id: 'empty', label: '× Vazia' }, { id: 'clear', label: 'Limpar' }];
}
