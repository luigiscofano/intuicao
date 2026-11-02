// Aplicação de ações lógicas sobre células, valores, candidatos e marcas.
/** Ações diretas sobre estado lógico; gestos, histórico e seleção pertencem à interface.
 * Identificadores salvos: círculo=0, triângulo=1, quadrado=2, losango=3.
 * Cada resultado é independente da entrada, inclusive ações ignoradas.
 */
import { supportCells } from './geometry-games.mjs';
import { eloPointAllowed } from './elo-rules.mjs';

export const SYMBOL_CYCLE = Object.freeze([0, 2, 1, 3]);
export function cycleSymbol(value, reverse = false) {
  const cycle = [-1, ...SYMBOL_CYCLE],
    index = cycle.indexOf(value);
  return cycle[((index < 0 ? 0 : index) + (reverse ? -1 : 1) + cycle.length) % cycle.length];
}
/** Mapa das casas obrigatórias para o índice canônico do apoio. */
export function protectedPrumoCells(level) {
  const cells = new Map();
  for (const [index, support] of (level.supports || []).entries()) {
    for (const cell of supportCells(level, support)) cells.set(cell, index);
  }
  return cells;
}
const validCell = (level, cell) =>
  Number.isInteger(cell) && cell >= 0 && cell < level.rows * level.cols;
const validSymbol = (value) => Number.isInteger(value) && value >= 0 && value < 4;
const validSupport = (level, value) =>
  Number.isInteger(value) && value >= 0 && value < level.supports.length;

/**
 * ELO: point; place-point (idempotent); move-point {from}; discard {enabled?}; clear.
 * PRUMO: toggle/paint {value}; erase {value?} (optional color filter); initialize.
 * PACTO: cycle {reverse?}; set/candidate {value}; clear.
 * `value` always means the stored canonical id, never a keyboard key number.
 * Invalid/out-of-grid actions and immutable clues are no-ops.
 */
export function applyDirectAction(game, level, state, action = {}) {
  const next = structuredClone(state),
    { type, cell, value } = action;
  if (game === 'prumo' && type === 'initialize') {
    for (const [i, support] of protectedPrumoCells(level)) next.assignments[i] = support;
    return next;
  }
  if (!validCell(level, cell)) return next;
  if (game === 'elo') {
    const region = level.regions[cell],
      fixed = level.fixed?.[region];
    const hasPoint = next.positions.includes(cell);
    if (type === 'discard') {
      if (hasPoint || fixed === cell) return next;
      const marks = new Set(next.discarded || []);
      const enabled = typeof action.enabled === 'boolean' ? action.enabled : !marks.has(cell);
      if (enabled) marks.add(cell);
      else marks.delete(cell);
      next.discarded = [...marks];
      return next;
    }
    if (type === 'clear') {
      if (fixed === cell) return next;
      if (fixed === undefined && next.positions[region] === cell) next.positions[region] = -1;
      next.discarded = (next.discarded || []).filter((i) => i !== cell);
      return next;
    }
    if (fixed !== undefined) return next;
    if (!eloPointAllowed(level, cell)) return next;
    if (type === 'move-point') {
      if (
        !validCell(level, action.from) ||
        level.regions[action.from] !== region ||
        next.positions[region] !== action.from
      )
        return next;
      next.positions[region] = cell;
    } else if (type === 'place-point') next.positions[region] = cell;
    else if (type === 'point') next.positions[region] = next.positions[region] === cell ? -1 : cell;
    else return next;
    next.discarded = (next.discarded || []).filter((i) => i !== cell);
  } else if (game === 'prumo') {
    if (protectedPrumoCells(level).has(cell)) return next;
    if (type === 'erase') {
      if (value === undefined || next.assignments[cell] === value) next.assignments[cell] = -1;
    } else if ((type === 'paint' || type === 'toggle') && validSupport(level, value)) {
      next.assignments[cell] = type === 'toggle' && next.assignments[cell] === value ? -1 : value;
    }
  } else if (game === 'pacto') {
    if (level.clues?.[cell] >= 0) return next;
    if (type === 'candidate') {
      if ((next.values[cell] ?? -1) !== -1 || !validSymbol(value)) return next;
      next.candidates ??= Array.from({ length: level.rows * level.cols }, () => []);
      const notes = next.candidates[cell] || [];
      next.candidates[cell] = notes.includes(value)
        ? notes.filter((x) => x !== value)
        : [...notes, value].sort((a, b) => a - b);
    } else if (type === 'clear' || type === 'cycle' || (type === 'set' && validSymbol(value))) {
      next.values[cell] =
        type === 'clear'
          ? -1
          : type === 'cycle'
            ? cycleSymbol(next.values[cell], action.reverse)
            : value;
      next.candidates ??= Array.from({ length: level.rows * level.cols }, () => []);
      next.candidates[cell] = [];
    }
  }
  return next;
}
