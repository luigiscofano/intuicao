import { observerRays } from '../../dist/logica/games/mirante/engine.mjs';

const bitCount = value => (value & 1) + ((value >> 1) & 1) + ((value >> 2) & 1);

/** Propagação segura; a busca posterior enumera todas as extensões restantes.
 * Não consulta level.solution. Limite de duas respostas só encerra casos ambíguos.
 */
export function solveMirante(level, { witnesses = true, limit = 2, maxNodes = 100000 } = {}) {
  const rays = observerRays(level), size = level.rows * level.cols;
  const totals = [size - level.inventory.circle - level.inventory.triangle, level.inventory.circle, level.inventory.triangle];
  const metrics = { nodes: 0, branches: 0, maxDepth: 0, rounds: 0, sightRemovals: 0, stockRemovals: 0, witnessRemovals: 0, protectedCorridors: 0 };
  const answers = [];
  let exhausted = true;
  function narrow(domains, index, allowed, kind) {
    const next = domains[index] & allowed;
    if (next === domains[index]) return 0;
    metrics[kind] += bitCount(domains[index]) - bitCount(next);
    domains[index] = next;
    return next ? 1 : -1;
  }
  function propagate(domains) {
    let changed = true;
    while (changed) {
      changed = false;
      metrics.rounds++;
      for (let value = 0; value < 3; value++) {
        const bit = 1 << value;
        let certain = 0, possible = 0;
        domains.forEach(domain => { certain += domain === bit; possible += Boolean(domain & bit); });
        if (certain > totals[value] || possible < totals[value]) return false;
        if (certain === totals[value] || possible === totals[value]) {
          for (let index = 0; index < size; index++) {
            if (!(domains[index] & bit) || domains[index] === bit) continue;
            const result = narrow(domains, index, certain === totals[value] ? 7 ^ bit : bit, 'stockRemovals');
            if (result < 0) return false;
            changed ||= result > 0;
          }
        }
      }
      for (const ray of rays) {
        const candidates = [];
        for (let p = 0; p < ray.cells.length; p++) {
          const domain = domains[ray.cells[p]];
          if (domain & (1 << ray.shape)) candidates.push(p);
          if (!(domain & 1)) break;
        }
        if (!candidates.length) return false;
        const first = candidates[0], last = candidates.at(-1);
        for (let p = 0; p < ray.cells.length; p++) {
          let allowed = 0;
          if (first < p) allowed = 7;
          else {
            if (last > p) allowed |= 1;
            if (candidates.includes(p)) allowed |= 1 << ray.shape;
          }
          const result = narrow(domains, ray.cells[p], allowed, 'sightRemovals');
          if (result < 0) return false;
          changed ||= result > 0;
        }
      }
      if (!witnesses) continue;
      const supports = Array.from({ length: size }, () => [[], [], []]);
      for (const ray of rays) {
        const before = [];
        for (const index of ray.cells) {
          if (domains[index] & (1 << ray.shape)) supports[index][ray.shape].push(before.slice());
          if (!(domains[index] & 1)) break;
          before.push(index);
        }
      }
      for (let index = 0; index < size; index++) for (const shape of [1, 2]) {
        const bit = 1 << shape;
        if (!(domains[index] & bit)) continue;
        const seen = supports[index][shape];
        if (seen.length < 2) {
          const result = narrow(domains, index, 7 ^ bit, 'witnessRemovals');
          if (result < 0) return false;
          changed ||= result > 0;
        } else if (domains[index] === bit && seen.length === 2) {
          for (const before of seen) for (const empty of before) {
            const result = narrow(domains, empty, 1, 'protectedCorridors');
            if (result < 0) return false;
            changed ||= result > 0;
          }
        }
      }
    }
    return true;
  }
  function visit(domains, depth) {
    if (++metrics.nodes > maxNodes) { exhausted = false; return; }
    metrics.maxDepth = Math.max(metrics.maxDepth, depth);
    if (!propagate(domains)) return;
    let chosen = -1, width = 4;
    for (let index = 0; index < size; index++) {
      const count = bitCount(domains[index]);
      if (count > 1 && count < width) { chosen = index; width = count; }
    }
    if (chosen < 0) {
      answers.push(domains.map(bit => bit === 1 ? 0 : bit === 2 ? 1 : 2));
      return;
    }
    metrics.branches++;
    for (const bit of [1, 2, 4]) if (domains[chosen] & bit) {
      const next = domains.slice(); next[chosen] = bit;
      visit(next, depth + 1);
      if (answers.length >= limit || !exhausted) { exhausted = false; return; }
    }
  }
  visit(Array(size).fill(7), 0);
  return { count: answers.length, solutions: answers, complete: exhausted, metrics };
}
