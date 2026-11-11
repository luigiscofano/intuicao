/** Regras puras de MIRANTE. null = indecisa; 0 = vazia; 1 = círculo; 2 = triângulo. */
export function initialState(level) { return { cells: Array(level.rows * level.cols).fill(null) }; }

export function isStateValid(level, state) {
  return Boolean(state && typeof state === 'object' && Array.isArray(state.cells)
    && state.cells.length === level.rows * level.cols
    && Array.from(state.cells).every(value => value === null || value === 0 || value === 1 || value === 2));
}

/** Cada observador constitui uma testemunha, inclusive os lados opostos. */
export function observerRays(level) {
  const rays = [];
  for (const side of ['left', 'right', 'top', 'bottom']) {
    const length = side === 'left' || side === 'right' ? level.rows : level.cols;
    for (let lane = 0; lane < length; lane++) {
      const shape = level.observers[side][lane];
      if (shape === null) continue;
      let cells = side === 'left' || side === 'right'
        ? Array.from({ length: level.cols }, (_, col) => lane * level.cols + col)
        : Array.from({ length: level.rows }, (_, row) => row * level.cols + lane);
      if (side === 'right' || side === 'bottom') cells.reverse();
      rays.push({ side, lane, shape, cells });
    }
  }
  return rays;
}

export function applyAction(level, state, action) {
  if (!isStateValid(level, state) || action?.type !== 'cell'
    || !Number.isInteger(action.index) || action.index < 0 || action.index >= state.cells.length) return state;
  const current = state.cells[action.index];
  const value = action.tool === 'cycle' ? (current === null ? 1 : current === 1 ? 2 : current === 2 ? 0 : null)
    : action.tool === 'circle' ? 1 : action.tool === 'triangle' ? 2 : action.tool === 'empty' ? 0 : action.tool === 'clear' ? null : undefined;
  if (value === undefined || value === current) return state;
  const cells = state.cells.slice();
  cells[action.index] = value;
  return { cells };
}

export function checkState(level, state) {
  if (!isStateValid(level, state)) return { valid: false, complete: false, message: 'Estado inválido para este tabuleiro.', errors: [] };
  const { cells } = state;
  const complete = cells.every(value => value !== null);
  const errors = new Set();
  let reason = '';
  for (const [shape, stock] of [[1, level.inventory.circle], [2, level.inventory.triangle]]) {
    const count = cells.filter(value => value === shape).length;
    if (count > stock || (complete && count !== stock)) {
      cells.forEach((value, index) => { if (value === shape) errors.add(index); });
      reason ||= 'Use exatamente a quantidade de cada forma indicada no estoque.';
    }
  }
  const witnesses = Array(cells.length).fill(0);
  for (const ray of observerRays(level)) {
    const hit = ray.cells.find(index => cells[index] !== 0);
    // Uma casa indecisa pode vir a encobrir a peça; não se antecipa uma visão certa.
    if (hit === undefined) {
      ray.cells.forEach(index => errors.add(index));
      reason ||= 'Todo observador precisa encontrar uma peça.';
    } else if (cells[hit] !== null) {
      if (cells[hit] !== ray.shape) {
        errors.add(hit);
        reason ||= 'A primeira peça de uma seta precisa ter a forma da placa.';
      } else witnesses[hit]++;
    }
  }
  if (complete) cells.forEach((value, index) => {
    if (value > 0 && witnesses[index] < 2) {
      errors.add(index);
      reason ||= 'Cada peça precisa de pelo menos duas testemunhas.';
    }
  });
  const valid = complete && errors.size === 0 && !reason;
  return { valid, complete, errors: [...errors], witnesses, message: valid ? 'O estoque, as vistas e as testemunhas estão certos.' : reason || 'Decida todas as casas; confirme os vazios com ×.' };
}

export function solutionState(level) { return { cells: level.solution.slice() }; }
export function toolsForLevel() {
  return [{ id: 'cycle', label: 'Alternar: círculo, triângulo, vazio, limpar' }, { id: 'circle', label: '○ Círculo' }, { id: 'triangle', label: '△ Triângulo' }, { id: 'empty', label: '× Vazia' }, { id: 'clear', label: 'Limpar' }];
}
