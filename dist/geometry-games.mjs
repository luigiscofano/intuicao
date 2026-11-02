// Regras e resolução dos jogos geométricos, com delegação das regras de ELO.
import { eloEdges, validateElo, solveElo, analyzeEloLocal, ELO_TECHNIQUES } from './elo-rules.mjs';
export { eloEdges } from './elo-rules.mjs';
/** Pure classical ELO/PRUMO engines. Cell indices are row-major and coordinates
 * use cell centres (2*column,2*row). State is {positions:[cell|-1]} or
 * {assignments:[supportIndex|-1]}; arrays are also accepted. Support ids are labels,
 * assignments always index supports. Marks/discards are annotations, not constraints.
 * solveGeometry returns {count,solutions,exhaustive,stats}; limit defaults to 2.
 * No reference solution is consulted. PRUMO uses exhaustive subsets through 20
 * cells and budgeted BigInt meet-in-the-middle enumeration through 100 cells.
 * Budget exhaustion is inconclusive, never a zero-solution or uniqueness proof. */
export const neighbors = (cell, rows, cols) =>
  [
    cell % cols ? cell - 1 : -1,
    cell % cols < cols - 1 ? cell + 1 : -1,
    cell >= cols ? cell - cols : -1,
    cell < cols * (rows - 1) ? cell + cols : -1,
  ].filter((x) => x >= 0);
const arr = (l, s) =>
  Array.isArray(s) ? s : s?.[l.game === 'elo' ? 'positions' : 'assignments'] || [];
const connected = (cells, r, c) => {
  if (!cells.length) return false;
  const set = new Set(cells),
    seen = new Set([cells[0]]),
    q = [cells[0]];
  for (const p of q)
    for (const n of neighbors(p, r, c))
      if (set.has(n) && !seen.has(n)) {
        seen.add(n);
        q.push(n);
      }
  return seen.size === set.size;
};
export function supportCells(l, p) {
  const { x2: x, y2: y } = p;
  if (
    !Number.isInteger(x) ||
    !Number.isInteger(y) ||
    x < 0 ||
    y < 0 ||
    x > 2 * (l.cols - 1) ||
    y > 2 * (l.rows - 1) ||
    (x % 2 && y % 2)
  )
    return [];
  return y % 2
    ? [Math.floor(y / 2) * l.cols + x / 2, Math.ceil(y / 2) * l.cols + x / 2]
    : x % 2
      ? [(y / 2) * l.cols + Math.floor(x / 2), (y / 2) * l.cols + Math.ceil(x / 2)]
      : [(y / 2) * l.cols + x / 2];
}
function issue(code, message, cells = []) {
  return { code, message, cells };
}
export function initialGeometryState(l) {
  if (l.game === 'elo') {
    const positions = Array(Math.max(...l.regions) + 1).fill(-1);
    for (const [r, c] of Object.entries(l.fixed || {})) positions[+r] = c;
    return { positions, discarded: [] };
  }
  return { assignments: Array(l.rows * l.cols).fill(-1) };
}

function crossing(l, p, e, f) {
  if (e.some((v) => f.includes(v))) return false;
  let [a, b] = e.map((v) => [p[v] % l.cols, Math.floor(p[v] / l.cols)]),
    [c, d] = f.map((v) => [p[v] % l.cols, Math.floor(p[v] / l.cols)]);
  if (a[1] !== b[1]) {
    [a, b, c, d] = [c, d, a, b];
  }
  return (
    a[1] === b[1] &&
    c[0] === d[0] &&
    Math.min(a[0], b[0]) < c[0] &&
    c[0] < Math.max(a[0], b[0]) &&
    Math.min(c[1], d[1]) < a[1] &&
    a[1] < Math.max(c[1], d[1])
  );
}
export function validateGeometry(l, state) {
  const v = [],
    pending = [],
    n = l.rows * l.cols,
    a = arr(l, state);
  if (l.game === 'elo') return validateElo(l, state);
  const k = l.supports.length,
    as = Array.from({ length: n }, (_, i) => a[i] ?? -1),
    filled = as.every((x) => x !== -1),
    moments = [];
  if (a.length > n) v.push(issue('extra', 'Há atribuições além da grade.'));
  as.forEach((s, c) => {
    if (s !== -1 && (!Number.isInteger(s) || s < 0 || s >= k))
      v.push(issue('assignment', 'Apoio inexistente.', [c]));
  });
  for (let s = 0; s < k; s++) {
    const p = l.supports[s],
      inc = supportCells(l, p),
      cells = as.flatMap((x, i) => (x === s ? [i] : []));
    if (!inc.length) v.push(issue('support', 'Apoio fora de um centro ou meio de lado.'));
    for (const c of inc)
      if (as[c] !== -1 && as[c] !== s)
        v.push(issue('incident', 'As casas incidentes ao apoio pertencem à sua peça.', [c]));
    let x = 0,
      y = 0;
    for (const c of cells) {
      x += 2 * (c % l.cols) - p.x2;
      y += 2 * Math.floor(c / l.cols) - p.y2;
    }
    moments.push({ support: s, x, y, count: cells.length });
    if (!cells.length || (cells.length && !connected(cells, l.rows, l.cols)))
      (filled ? v : pending).push(
        issue('connectivity', 'A peça precisa ficar ortogonalmente conectada.', cells),
      );
    if (x || y)
      (filled ? v : pending).push(
        issue('balance', `Momentos horizontal ${x} e vertical ${y}; ambos precisam zerar.`, cells),
      );
  }
  if (!filled)
    pending.push(
      issue(
        'coverage',
        'Ainda há casas sem peça.',
        as.flatMap((x, i) => (x === -1 ? [i] : [])),
      ),
    );
  return { complete: filled && !v.length, valid: !v.length, violations: v, pending, moments };
}
const shapeCache = new Map();
/** Enumerates every connected balanced subset, not just symmetric shapes. */
export function geometryShapes(rows, cols) {
  const key = rows + 'x' + cols;
  if (shapeCache.has(key)) return shapeCache.get(key);
  const n = rows * cols;
  if (n > 20) throw new RangeError('O solucionador exato de PRUMO admite até 20 casas.');
  const total = 2 ** n,
    counts = new Uint8Array(total),
    sx = new Uint16Array(total),
    sy = new Uint16Array(total),
    adj = Array.from({ length: n }, (_, i) =>
      neighbors(i, rows, cols).reduce((a, j) => a | (1 << j), 0),
    ),
    map = new Map();
  for (let m = 1; m < total; m++) {
    const b = m & -m,
      i = 31 - Math.clz32(b),
      rest = m ^ b,
      k = (counts[m] = counts[rest] + 1);
    sx[m] = sx[rest] + 2 * (i % cols);
    sy[m] = sy[rest] + 2 * Math.floor(i / cols);
    if (sx[m] % k || sy[m] % k) continue;
    const x2 = sx[m] / k,
      y2 = sy[m] / k;
    if (x2 % 2 && y2 % 2) continue;
    const inc = supportCells({ rows, cols }, { x2, y2 }),
      im = inc.reduce((a, i) => a | (1 << i), 0);
    if ((m & im) !== im) continue;
    let seen = b,
      front = b;
    while (front) {
      const bit = front & -front;
      front ^= bit;
      const next = adj[31 - Math.clz32(bit)] & m & ~seen;
      seen |= next;
      front |= next;
    }
    if (seen !== m) continue;
    const key = x2 + ',' + y2;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(m);
  }
  shapeCache.set(key, map);
  return map;
}
export function prumoDomains(l, state) {
  if (l.rows * l.cols > 20) {
    const info = prumoWideDomains(l, state);
    if (info.budgetExhausted)
      throw new RangeError('Busca de formas inconclusiva: orçamento de PRUMO atingido.');
    return info.domains;
  }
  const shapes = geometryShapes(l.rows, l.cols),
    as = arr(l, state),
    inc = l.supports.map((p) => supportCells(l, p).reduce((a, i) => a | (1 << i), 0));
  return l.supports.map((p, s) => {
    let must = inc[s],
      ban = inc.reduce((a, m, j) => (j === s ? a : a | m), 0);
    for (let i = 0; i < as.length; i++)
      if (as[i] === s) must |= 1 << i;
      else if (as[i] >= 0) ban |= 1 << i;
    return (shapes.get(p.x2 + ',' + p.y2) || []).filter((m) => (m & must) === must && !(m & ban));
  });
}
// Acima de vinte casas, as máscaras bit a bit de Number são insuficientes.
// Todos os subconjuntos opcionais continuam sendo considerados: juntamos duas
// metades por seus momentos exatos horizontal E vertical e depois verificamos
// a conectividade. Não há hipótese de simetria, tamanho máximo de peça,
// casa bloqueada nem consulta ao gabarito.
const prumoWideCache = new Map();
function prumoWideDomains(l, state, options = {}) {
  const n = l.rows * l.cols;
  if (n > 100) throw new RangeError('O solucionador de PRUMO admite até 100 casas.');
  const maxSubsets = options.maxSubsets ?? options.maxOperations ?? 1000000,
    maxJoins = options.maxJoins ?? options.maxOperations ?? 1000000,
    deadline = Date.now() + (options.timeBudgetMs ?? options.maxMs ?? 1500);
  const budget = () => {
    throw new RangeError('PRUMO_SEARCH_BUDGET');
  };
  const key = JSON.stringify([l.rows, l.cols, l.supports.map((p) => [p.x2, p.y2]), arr(l, state)]);
  if (prumoWideCache.has(key)) return prumoWideCache.get(key);
  const local = geometryLocalAnalysis(l, state),
    bits = Array.from({ length: n }, (_, i) => 1n << BigInt(i)),
    adj = Array.from({ length: n }, (_, i) => neighbors(i, l.rows, l.cols));
  let enumeratedSubsets = 0,
    joinedSubsets = 0,
    budgetExhausted = false;
  function isConnected(mask) {
    let first = 0;
    while (first < n && !(mask & bits[first])) first++;
    if (first === n) return false;
    let seen = bits[first];
    const queue = [first];
    for (const cell of queue)
      for (const next of adj[cell])
        if (mask & bits[next] && !(seen & bits[next])) {
          seen |= bits[next];
          queue.push(next);
        }
    return seen === mask;
  }
  const incident = l.supports.flatMap((p) => supportCells(l, p)),
    overlap = new Set(incident).size !== incident.length;
  let domains;
  try {
    domains =
      overlap || local.contradiction || !validateGeometry(l, state).valid
        ? l.supports.map(() => [])
        : l.supports.map((p, s) => {
            const allowed = local.candidates.flatMap((d, c) => (d.includes(s) ? [c] : [])),
              required = allowed.filter((c) => local.candidates[c].length === 1),
              optional = allowed.filter((c) => local.candidates[c].length !== 1);
            const must = required.reduce((mask, c) => mask | bits[c], 0n),
              targetX = -required.reduce((sum, c) => sum + 2 * (c % l.cols) - p.x2, 0),
              targetY = -required.reduce((sum, c) => sum + 2 * Math.floor(c / l.cols) - p.y2, 0);
            const middle = Math.floor(optional.length / 2),
              left = optional.slice(0, middle),
              right = optional.slice(middle),
              sums = new Map(),
              shapes = [];
            function enumerate(cells, index, x, y, mask, visit) {
              if (index === cells.length) {
                if (
                  ++enumeratedSubsets > maxSubsets ||
                  (enumeratedSubsets % 1024 === 0 && Date.now() > deadline)
                )
                  budget();
                visit(x, y, mask);
                return;
              }
              enumerate(cells, index + 1, x, y, mask, visit);
              const c = cells[index];
              enumerate(
                cells,
                index + 1,
                x + 2 * (c % l.cols) - p.x2,
                y + 2 * Math.floor(c / l.cols) - p.y2,
                mask | bits[c],
                visit,
              );
            }
            enumerate(left, 0, 0, 0, 0n, (x, y, mask) => {
              const key = x + ',' + y;
              if (!sums.has(key)) sums.set(key, []);
              sums.get(key).push(mask);
            });
            enumerate(right, 0, 0, 0, 0n, (x, y, mask) => {
              for (const other of sums.get(targetX - x + ',' + (targetY - y)) || []) {
                if (
                  ++joinedSubsets > maxJoins ||
                  (joinedSubsets % 1024 === 0 && Date.now() > deadline)
                )
                  budget();
                const shape = must | mask | other;
                if (isConnected(shape)) shapes.push(shape);
              }
            });
            return shapes;
          });
  } catch (error) {
    if (error.message !== 'PRUMO_SEARCH_BUDGET') throw error;
    budgetExhausted = true;
    domains = l.supports.map(() => []);
  }
  const result = {
    domains,
    enumeratedSubsets,
    joinedSubsets,
    budgetExhausted,
    exhaustive: !budgetExhausted,
  };
  if (budgetExhausted) return result;
  if (prumoWideCache.size >= 64) prumoWideCache.delete(prumoWideCache.keys().next().value);
  prumoWideCache.set(key, result);
  return result;
}
function solvePrumoWide(l, state, limit, budgetOptions = {}) {
  const deadline = Date.now() + (budgetOptions.timeBudgetMs ?? budgetOptions.maxMs ?? 1500);
  const solutions = [],
    stats = { nodes: 0, branches: 0, forced: 0, maxDepth: 0, candidates: 0, enumeratedSubsets: 0 };
  if (!validateGeometry(l, state).valid) return { count: 0, solutions, exhaustive: true, stats };
  const complete = validateGeometry(l, state).complete;
  if (complete) return { count: 1, solutions: [arr(l, state).slice()], exhaustive: true, stats };
  const info = prumoWideDomains(l, state, budgetOptions);
  if (info.budgetExhausted)
    return {
      count: 0,
      solutions,
      exhaustive: false,
      budgetExhausted: true,
      reason: 'enumeration-budget',
      stats: { ...stats, enumeratedSubsets: info.enumeratedSubsets },
    };
  const domains = info.domains,
    n = l.rows * l.cols,
    bits = Array.from({ length: n }, (_, i) => 1n << BigInt(i)),
    full = (1n << BigInt(n)) - 1n,
    chosen = Array(l.supports.length).fill(0n);
  let cutoff = false,
    budgetExhausted = false;
  stats.candidates = domains.reduce((sum, d) => sum + d.length, 0);
  stats.enumeratedSubsets = info.enumeratedSubsets;
  function dfs(used, depth) {
    if (
      ++stats.nodes > (budgetOptions.maxNodes ?? budgetOptions.maxOperations ?? 1000000) ||
      Date.now() > deadline
    ) {
      cutoff = true;
      budgetExhausted = true;
      return;
    }
    stats.maxDepth = Math.max(stats.maxDepth, depth);
    if (depth === domains.length) {
      if (used === full) {
        solutions.push(
          Array.from({ length: n }, (_, i) => chosen.findIndex((mask) => Boolean(mask & bits[i]))),
        );
        if (solutions.length >= limit) cutoff = true;
      }
      return;
    }
    let best = -1,
      options;
    for (let s = 0; s < domains.length; s++)
      if (!chosen[s]) {
        const available = domains[s].filter((mask) => !(mask & used));
        if (!available.length) return;
        if (!options || available.length < options.length) {
          options = available;
          best = s;
        }
      }
    if (options.length === 1) stats.forced++;
    else stats.branches++;
    for (const mask of options) {
      chosen[best] = mask;
      dfs(used | mask, depth + 1);
      chosen[best] = 0n;
      if (cutoff) break;
    }
  }
  dfs(0n, 0);
  return {
    count: solutions.length,
    solutions,
    exhaustive: !cutoff,
    budgetExhausted,
    reason: budgetExhausted ? 'coverage-budget' : undefined,
    stats,
  };
}
export function solveGeometry(l, state, limit = 2, options = {}) {
  if (l.game === 'elo') return solveElo(l, state, limit, options);
  limit = Math.max(1, Math.floor(limit));
  if (l.game === 'prumo' && l.rows * l.cols > 20) return solvePrumoWide(l, state, limit, options);
  const solutions = [],
    stats = { nodes: 0, branches: 0, forced: 0, maxDepth: 0, candidates: 0 };
  let cutoff = false;
  {
    if (!validateGeometry(l, state).valid) return { count: 0, solutions, exhaustive: true, stats };
    const domains = prumoDomains(l, state),
      n = l.rows * l.cols,
      full = 2 ** n - 1,
      chosen = Array(l.supports.length).fill(0);
    stats.candidates = domains.reduce((a, d) => a + d.length, 0);
    function dfs(used, depth) {
      stats.nodes++;
      stats.maxDepth = Math.max(stats.maxDepth, depth);
      if (depth === domains.length) {
        if (used === full) {
          solutions.push(
            Array.from({ length: n }, (_, i) => chosen.findIndex((m) => m & (1 << i))),
          );
          if (solutions.length >= limit) cutoff = true;
        }
        return;
      }
      let best = -1,
        options;
      for (let s = 0; s < domains.length; s++)
        if (!chosen[s]) {
          const opts = domains[s].filter((m) => !(m & used));
          if (!opts.length) return;
          if (!options || opts.length < options.length) {
            options = opts;
            best = s;
          }
        }
      if (options.length === 1) stats.forced++;
      else stats.branches++;
      for (const m of options) {
        chosen[best] = m;
        dfs(used | m, depth + 1);
        chosen[best] = 0;
        if (cutoff) break;
      }
    }
    dfs(0, 0);
  }
  return { count: solutions.length, solutions, exhaustive: !cutoff, stats };
}
export function geometryHint(l, state, tier = 1) {
  const check = validateGeometry(l, state);
  if (check.violations.length)
    return {
      type: 'contradiction',
      tier,
      text: check.violations[0].message,
      cells: check.violations[0].cells,
      proof: check.violations[0].code,
    };
  if (check.complete)
    return { type: 'complete', tier, text: 'Todas as regras foram satisfeitas.', cells: [] };
  const a = arr(l, state);
  if (l.game === 'prumo')
    for (let s = 0; s < l.supports.length; s++)
      for (const c of supportCells(l, l.supports[s]))
        if ((a[c] ?? -1) === -1)
          return {
            type: 'forced',
            tier,
            cell: c,
            support: s,
            value: s,
            cells: [c],
            text:
              tier === 1
                ? 'Observe as casas que tocam um apoio.'
                : `A casa L${Math.floor(c / l.cols) + 1}C${(c % l.cols) + 1} precisa pertencer ao apoio ${s + 1}: não é permitido cortar sobre o apoio.`,
            proof: 'support-incidence',
          };
  const deductions = geometryLocalAnalysis(l, state);
  if (deductions.contradiction)
    return {
      type: 'contradiction',
      tier,
      text:
        'As deduções locais deixam uma casa ou região sem alternativa. Revise as escolhas: ' +
        (deductions.eliminations.at(-1)?.explanation || 'não há caminho válido.'),
      cells: [],
      proof: 'local-domain-empty',
      premises: deductions.eliminations,
    };
  if (deductions.forced.length) {
    const f = deductions.forced[0],
      cell = l.game === 'elo' ? f.value : f.index;
    return {
      type: 'forced',
      tier,
      region: l.game === 'elo' ? f.index : undefined,
      cell,
      support: l.game === 'prumo' ? f.value : undefined,
      value: f.value,
      cells: [cell],
      text:
        tier === 1
          ? `Use esta técnica: ${GEOMETRY_TECHNIQUES[f.technique]}.`
          : f.explanation +
            (f.technique === 'single-candidate'
              ? ' ' +
                (Array.isArray(f.premises) ? f.premises.map((p) => p.explanation).join(' ') : '') +
                (l.game === 'elo'
                  ? ` Portanto, posicione a peça em ${coordinate(l, cell)}.`
                  : ` Portanto, atribua ${coordinate(l, cell)} ao apoio ${f.value + 1}.`)
              : ''),
      proof: f.technique,
      premises: f.premises,
    };
  }
  const elimination = deductions.eliminations.find(
    (e) => l.game !== 'elo' || !(state?.discarded || []).includes(e.value),
  );
  if (elimination && tier < 3)
    return {
      type: 'elimination',
      tier,
      region: l.game === 'elo' ? elimination.index : undefined,
      cell: l.game === 'elo' ? elimination.value : elimination.index,
      support: l.game === 'prumo' ? elimination.value : undefined,
      cells: [l.game === 'elo' ? elimination.value : elimination.index],
      text:
        tier === 1
          ? `Observe: ${GEOMETRY_TECHNIQUES[elimination.technique]}.`
          : elimination.explanation,
      proof: elimination.technique,
      premises: elimination.premises,
    };
  if (l.game === 'elo')
    return {
      type: 'strategy',
      tier,
      text: deductions.budgetExhausted
        ? 'A análise local atingiu seu orçamento. Compare as pistas e os alinhamentos restantes; nenhuma hipótese foi apresentada como certeza.'
        : 'Ainda não há uma dedução local demonstrável. Compare os alinhamentos, as pistas e as possibilidades de ligação entre as regiões.',
      cells: [],
    };
  const local = geometryCandidates(l, state);
  if (local.budgetExhausted)
    return {
      type: 'strategy',
      tier,
      text: 'A enumeração de formas atingiu seu orçamento. As possibilidades restantes vêm apenas de limites de momentos e acesso ao apoio; não são uma prova exaustiva.',
      cells: [],
      proof: 'budget-inconclusive',
    };
  for (let i = 0; i < local.candidates.length; i++)
    if ((a[i] ?? -1) < 0 && local.candidates[i].length === 1) {
      const value = local.candidates[i][0];
      return {
        type: 'forced',
        tier,
        region: l.game === 'elo' ? i : undefined,
        cell: l.game === 'elo' ? value : i,
        support: l.game === 'prumo' ? value : undefined,
        value,
        cells: [l.game === 'elo' ? value : i],
        text:
          tier === 1
            ? l.game === 'elo'
              ? 'Uma região tem apenas uma casa sem conflito imediato.'
              : 'Enumeração exata de formas: uma casa só pode ser coberta por um apoio com formato conectado e equilibrado.'
            : l.game === 'elo'
              ? `A região ${i + 1} só tem uma posição sem violar grau, pista ou cruzamento: L${Math.floor(value / l.cols) + 1}C${(value % l.cols) + 1}.`
              : `Enumeração exata de formas: L${Math.floor(i / l.cols) + 1}C${(i % l.cols) + 1} só aparece nas formas conectadas e equilibradas do apoio ${value + 1}; os demais apoios não a podem cobrir.`,
        proof: local.proof,
      };
    }
  const result = solveGeometry(l, state, 2);
  if (!result.count && !result.exhaustive)
    return {
      type: 'strategy',
      tier,
      text: 'A busca atingiu seu orçamento; o resultado é inconclusivo. Compare os momentos e caminhos restantes sem tratar hipóteses como certezas.',
      cells: [],
      proof: 'budget-inconclusive',
    };
  if (!result.count)
    return {
      type: 'contradiction',
      tier,
      text: 'Busca exaustiva: as escolhas atuais não admitem conclusão pelas regras. Revise a última escolha.',
      cells: [],
      proof: 'exhaustive-zero-solutions',
    };
  const sol = result.solutions[0];
  for (let i = 0; i < sol.length; i++)
    if ((a[i] ?? -1) < 0) {
      let forced = result.count === 1 && result.exhaustive;
      if (!forced) {
        if (l.game === 'elo') {
          const alternatives = l.regions.flatMap((r, c) => (r === i && c !== sol[i] ? [c] : []));
          forced = alternatives.every((c) => {
            const p = (a.length ? a : initialGeometryState(l).positions).slice();
            p[i] = c;
            return solveGeometry(l, { positions: p }, 1).count === 0;
          });
        } else
          forced = l.supports.every((_, s) => {
            if (s === sol[i]) return true;
            const p = Array.from({ length: l.rows * l.cols }, (_, c) => a[c] ?? -1);
            p[i] = s;
            const alternative = solveGeometry(l, { assignments: p }, 1);
            return alternative.count === 0 && alternative.exhaustive;
          });
      }
      if (forced)
        return {
          type: 'forced',
          tier,
          region: l.game === 'elo' ? i : undefined,
          cell: l.game === 'elo' ? sol[i] : i,
          support: l.game === 'prumo' ? sol[i] : undefined,
          value: sol[i],
          cells: [l.game === 'elo' ? sol[i] : i],
          text:
            tier === 1
              ? 'Busca exaustiva: uma escolha é obrigatória ao conferir todas as continuações.'
              : l.game === 'elo'
                ? `Busca exaustiva: a região ${i + 1} só pode fechar o circuito em L${Math.floor(sol[i] / l.cols) + 1}C${(sol[i] % l.cols) + 1}. As demais posições não admitem circuito válido.`
                : `Busca exaustiva: L${Math.floor(i / l.cols) + 1}C${(i % l.cols) + 1} pertence ao apoio ${sol[i] + 1}; as alternativas não admitem partição equilibrada.`,
          proof: 'exhaustive-alternative-elimination',
        };
    }
  return {
    type: 'strategy',
    tier,
    text: 'Ainda há mais de uma conclusão. Explore os alinhamentos e as compensações sem tratar uma hipótese como certeza.',
    cells: [],
  };
}
/** Locally admissible choices, never a claim that every listed option extends to
 * a solution. ELO: candidates[region] contains cells. PRUMO: candidates[cell]
 * contains support indices, obtained from all admissible connected shapes. */
export function geometryCandidates(l, state) {
  if (l.game === 'elo') {
    const analysis = analyzeEloLocal(l, state);
    return {
      kind: 'regions',
      candidates: analysis.candidates,
      proof: 'local-rule-propagation',
      budgetExhausted: analysis.budgetExhausted,
    };
  }
  if (l.rows * l.cols > 20) {
    const info = prumoWideDomains(l, state);
    if (info.budgetExhausted) {
      const local = geometryLocalAnalysis(l, state);
      return {
        kind: 'cells',
        candidates: local.candidates,
        proof: 'local-rule-propagation',
        budgetExhausted: true,
      };
    }
  }
  const domains = prumoDomains(l, state);
  return {
    kind: 'cells',
    candidates: Array.from({ length: l.rows * l.cols }, (_, i) =>
      domains.flatMap((masks, s) =>
        masks.some((m) =>
          typeof m === 'bigint' ? Boolean(m & (1n << BigInt(i))) : Boolean(m & (1 << i)),
        )
          ? [s]
          : [],
      ),
    ),
    proof: 'connected-balanced-shapes',
  };
}

export const GEOMETRY_TECHNIQUES = {
  ...ELO_TECHNIQUES,
  'support-incidence': 'Casas incidentes ao apoio',
  'border-support': 'Apoio na borda limita a peça à borda',
  'moment-bounds': 'Limites de compensação dos momentos',
  'connectivity-path': 'Caminho ortogonal até o apoio',
  'two-directions': 'Pelo menos duas direções viáveis',
  'mandatory-alignment': 'Alinhamento obrigatório',
  'third-direction': 'Evitar terceira direção conectada',
  'crossing': 'Evitar cruzamento fora de uma peça',
  'closed-circuit': 'Evitar circuito fechado separado',
  'single-candidate': 'Única candidata após deduções locais',
};
const coordinate = (l, c) => `L${Math.floor(c / l.cols) + 1}C${(c % l.cols) + 1}`;
/** Sound local propagation. No solution enumeration or stored answer is used.
 * Every removal records its rule and concrete premises; singleton consequences
 * are propagated. This measures techniques actually observed, not difficulty. */
export function geometryLocalAnalysis(l, state) {
  if (l.game === 'elo') return analyzeEloLocal(l, state);
  const original = arr(l, state),
    n = l.rows * l.cols,
    eliminations = [],
    forced = [],
    techniqueCounts = {},
    seenForced = new Set();
  let rounds = 0,
    changed = false;
  const count = (code) => {
    techniqueCounts[code] = (techniqueCounts[code] || 0) + 1;
  };
  let domains;
  function recordForced(index, code, explanation, premises = []) {
    if (seenForced.has(index) || (original[index] ?? -1) >= 0) return;
    seenForced.add(index);
    count(code);
    forced.push({ index, value: domains[index][0], technique: code, explanation, premises });
  }
  function remove(index, value, technique, explanation, premises = []) {
    if (!domains[index].includes(value)) return;
    domains[index] = domains[index].filter((x) => x !== value);
    changed = true;
    count(technique);
    eliminations.push({ index, value, technique, explanation, premises });
    if (domains[index].length === 1)
      recordForced(
        index,
        'single-candidate',
        l.game === 'elo'
          ? `A região ${index + 1} ficou com uma única posição, após eliminar as alternativas pelas regras locais.`
          : `A casa ${coordinate(l, index)} ficou com um único apoio, após eliminar as alternativas pelas regras locais.`,
        eliminations.filter((e) => e.index === index),
      );
  }
  {
    const k = l.supports.length,
      inc = l.supports.map((p) => supportCells(l, p));
    domains = Array.from({ length: n }, (_, c) =>
      (original[c] ?? -1) >= 0 ? [original[c]] : Array.from({ length: k }, (_, i) => i),
    );
    for (let s = 0; s < k; s++)
      for (const c of inc[s]) {
        if ((original[c] ?? -1) < 0) {
          domains[c] = [s];
          recordForced(
            c,
            'support-incidence',
            `O apoio ${s + 1} incide em ${coordinate(l, c)}. Não é permitido cortar sobre um apoio; esta casa pertence à sua peça.`,
            { support: s, incidentCells: inc[s] },
          );
        }
      }
    do {
      changed = false;
      rounds++;
      for (let s = 0; s < k; s++)
        for (let c = 0; c < n; c++)
          if (domains[c].includes(s)) {
            const p = l.supports[s],
              x = 2 * (c % l.cols),
              y = 2 * Math.floor(c / l.cols);
            const axis =
              p.x2 === 0 && x !== 0
                ? 'esquerda'
                : p.x2 === 2 * (l.cols - 1) && x !== p.x2
                  ? 'direita'
                  : p.y2 === 0 && y !== 0
                    ? 'superior'
                    : p.y2 === 2 * (l.rows - 1) && y !== p.y2
                      ? 'inferior'
                      : null;
            if (axis) {
              remove(
                c,
                s,
                'border-support',
                `O apoio ${s + 1} está na borda ${axis}. Uma casa fora dessa borda deslocaria o centro de massa para dentro, sem casas do lado oposto para compensar. Portanto ${coordinate(l, c)} não pertence a esse apoio.`,
                { support: s, border: axis, cell: c },
              );
              continue;
            }
            const allowed = domains.flatMap((d, i) => (d.includes(s) ? [i] : [])),
              required = allowed.filter((i) => domains[i].length === 1 || i === c),
              allowedSet = new Set(allowed),
              reachable = new Set(inc[s].length && allowedSet.has(inc[s][0]) ? [inc[s][0]] : []),
              queue = [...reachable];
            for (const a of queue)
              for (const b of neighbors(a, l.rows, l.cols))
                if (allowedSet.has(b) && !reachable.has(b)) {
                  reachable.add(b);
                  queue.push(b);
                }
            if (required.some((i) => !reachable.has(i))) {
              remove(
                c,
                s,
                'connectivity-path',
                `Se ${coordinate(l, c)} pertencesse ao apoio ${s + 1}, uma casa obrigatória ficaria sem caminho ortogonal até o apoio através das casas ainda disponíveis.`,
                { support: s, requiredCells: required, reachableCells: [...reachable] },
              );
              continue;
            }
            for (const axis of ['x', 'y']) {
              const distance = (i) =>
                  axis === 'x' ? 2 * (i % l.cols) - p.x2 : 2 * Math.floor(i / l.cols) - p.y2,
                requiredSet = new Set(required),
                sum = required.reduce((a, i) => a + distance(i), 0),
                optional = allowed.filter((i) => !requiredSet.has(i)),
                minimum = sum + optional.reduce((a, i) => a + Math.min(0, distance(i)), 0),
                maximum = sum + optional.reduce((a, i) => a + Math.max(0, distance(i)), 0);
              if (minimum > 0 || maximum < 0) {
                remove(
                  c,
                  s,
                  'moment-bounds',
                  `Atribuir ${coordinate(l, c)} ao apoio ${s + 1} deixa momento ${axis === 'x' ? 'horizontal' : 'vertical'} obrigatório ${sum}. Mesmo usando toda a compensação disponível, o intervalo possível é [${minimum}, ${maximum}], que não contém zero.`,
                  {
                    support: s,
                    axis,
                    requiredCells: required,
                    requiredMoment: sum,
                    minimum,
                    maximum,
                  },
                );
                break;
              }
            }
          }
    } while (changed && !domains.some((d) => !d.length) && rounds <= n + 1);
  }
  return {
    kind: l.game === 'elo' ? 'regions' : 'cells',
    candidates: domains,
    eliminations,
    forced,
    techniqueCounts,
    rounds,
    contradiction: domains.some((d) => !d.length),
    solved:
      domains.every((d) => d.length === 1) &&
      validateGeometry(
        l,
        domains.map((d) => d[0]),
      ).complete,
  };
}
