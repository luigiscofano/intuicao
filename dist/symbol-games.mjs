// Regras e busca de soluções de PACTO: contagem de símbolos e pares vizinhos.
/** Pure PACTO engine. Values: -1 empty, 0..3 symbols. No reference solution is consulted.
 * solveSymbols returns {solutions,count,complete,nodes}; complete=false only if optional maxNodes reached.
 * symbolCandidates returns arrays of supported values (GAC, not global-solution guarantees).
 * Hints return {tier,kind,text,cells,premises,eliminations,value?,cell?}; never overwrite clues.
 */
const CACHE = new Map();
const pop = (x) => {
  let n = 0;
  while (x) {
    x &= x - 1;
    n++;
  }
  return n;
};
const vals = (m) => {
  const a = [];
  for (let v = 0; v < 4; v++) if (m & (1 << v)) a.push(v);
  return a;
};
function model(level) {
  const game = level.game,
    n = game === 'pacto' ? 8 : 0,
    k = n / 2;
  if (
    !n ||
    level.rows !== n ||
    level.cols !== n ||
    !Array.isArray(level.clues) ||
    level.clues.length !== n * n
  )
    throw new Error('Formato de fase inválido.');
  if (CACHE.has(game)) return CACHE.get(game);
  const constraints = [],
    adj = Array.from({ length: n * n }, (_, i) => {
      const r = (i / n) | 0,
        c = i % n;
      return [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ]
        .filter(([r, c]) => r >= 0 && r < n && c >= 0 && c < n)
        .map(([r, c]) => r * n + c);
    });
  const tuples = (len, predicate, quota = false) => {
    const out = [],
      a = [],
      counts = Array(k).fill(0);
    function go() {
      if (a.length === len) {
        if (predicate(a)) out.push(...a);
        return;
      }
      for (let v = 0; v < k; v++) {
        if (quota && counts[v] === 2) continue;
        a.push(v);
        counts[v]++;
        go();
        counts[v]--;
        a.pop();
      }
    }
    go();
    return new Uint8Array(out);
  };
  const rowTable = tuples(n, () => true, true),
    local = new Map();
  for (let r = 0; r < n; r++)
    constraints.push({
      cells: Array.from({ length: n }, (_, c) => r * n + c),
      table: rowTable,
      kind: 'quota',
      label: `linha ${r + 1}`,
    });
  for (let c = 0; c < n; c++)
    constraints.push({
      cells: Array.from({ length: n }, (_, r) => r * n + c),
      table: rowTable,
      kind: 'quota',
      label: `coluna ${c + 1}`,
    });
  for (let i = 0; i < n * n; i++) {
    const len = adj[i].length + 1;
    if (!local.has(len))
      local.set(
        len,
        tuples(len, (a) => a.slice(1).filter((v) => v === a[0]).length === 1),
      );
    constraints.push({
      cells: [i, ...adj[i]],
      table: local.get(len),
      kind: 'pair',
      label: `vizinhança L${((i / n) | 0) + 1}C${(i % n) + 1}`,
    });
  }
  const linked = Array.from({ length: n * n }, () => []);
  constraints.forEach((c, j) => c.cells.forEach((i) => linked[i].push(j)));
  const m = { n, k, adj, constraints, linked };
  CACHE.set(game, m);
  return m;
}
function initial(level, values) {
  const m = model(level),
    v = values === undefined ? level.clues : values;
  if (!Array.isArray(v) || v.length !== m.n * m.n)
    return { m, error: 'Quantidade de casas inválida.' };
  const d = [];
  for (let i = 0; i < v.length; i++) {
    if (
      !Number.isInteger(v[i]) ||
      v[i] < -1 ||
      v[i] >= m.k ||
      !Number.isInteger(level.clues[i]) ||
      level.clues[i] < -1 ||
      level.clues[i] >= m.k
    )
      return { m, error: 'Símbolo inválido.', cell: i };
    if (level.clues[i] >= 0 && v[i] !== level.clues[i])
      return { m, error: 'Uma pista fixa foi alterada.', cell: i };
    d.push(v[i] < 0 ? (1 << m.k) - 1 : 1 << v[i]);
  }
  return { m, d };
}
function propagate(m, d, trace = null) {
  const queue = m.constraints.map((_, i) => i),
    queued = new Set(queue);
  let q = 0;
  while (q < queue.length) {
    const ci = queue[q++];
    queued.delete(ci);
    const c = m.constraints[ci],
      len = c.cells.length,
      support = Array(len).fill(0),
      t = c.table;
    let alive = 0;
    outer: for (let off = 0; off < t.length; off += len) {
      for (let j = 0; j < len; j++) if (!(d[c.cells[j]] & (1 << t[off + j]))) continue outer;
      alive++;
      for (let j = 0; j < len; j++) support[j] |= 1 << t[off + j];
    }
    if (!alive) return { ok: false, constraint: ci };
    const before = trace ? c.cells.map((cell) => ({ cell, candidates: vals(d[cell]) })) : null;
    for (let j = 0; j < len; j++) {
      const cell = c.cells[j],
        old = d[cell],
        next = old & support[j];
      if (next !== old) {
        d[cell] = next;
        if (trace)
          trace.push({
            kind: c.kind,
            label: c.label,
            cells: c.cells.slice(),
            cell,
            before: vals(old),
            after: vals(next),
            premises: before,
          });
        for (const x of m.linked[cell])
          if (!queued.has(x)) {
            queue.push(x);
            queued.add(x);
          }
      }
    }
  }
  return { ok: true };
}
export function symbolCandidates(level, values = level.clues) {
  const s = initial(level, values);
  if (s.error) return Array.from({ length: level.clues.length }, () => []);
  if (!propagate(s.m, s.d).ok) return s.d.map(() => []);
  return s.d.map(vals);
}
// A confirmação e as dicas mantêm a análise completa das regras.
export function validateSymbols(level, values = level.clues) {
  return validateSymbolState(level, values, false);
}
// Na edição, só hachuramos erros visíveis agora, sem antecipar deduções.
// Um estado sem hachuras não é uma garantia de que terá solução.
export function validateSymbolEditing(level, values = level.clues) {
  return validateSymbolState(level, values, true);
}
function validateSymbolState(level, values, editing) {
  let s;
  try {
    s = initial(level, values);
  } catch (e) {
    return {
      complete: false,
      valid: false,
      violations: [{ kind: 'format', text: e.message, cells: [] }],
      pending: [],
    };
  }
  const violations = [],
    pending = [];
  if (s.error)
    return {
      complete: false,
      valid: false,
      violations: [{ kind: 'input', text: s.error, cells: s.cell === undefined ? [] : [s.cell] }],
      pending,
    };
  const { m } = s,
    complete = values.every((v) => v >= 0),
    markedGroups = new Set();
  for (const c of m.constraints) {
    const a = c.cells.map((i) => values[i]),
      blanks = a.filter((v) => v < 0).length;
    if (c.kind === 'quota') {
      // A cota só vira aviso visual quando a linha ou coluna está completa.
      if (editing && blanks > 0) continue;
      for (let v = 0; v < m.k; v++) {
        const count = a.filter((x) => x === v).length;
        // A quota is a line-wide rule, so even its empty cells belong to the error.
        if (count > 2 || count + blanks < 2)
          violations.push({
            kind: 'quota',
            text: `${c.label}: são necessários exatamente dois de cada símbolo.`,
            cells: c.cells.slice(),
            symbol: v,
          });
      }
    } else if (c.kind === 'pair' && a[0] >= 0) {
      const same = a.slice(1).filter((v) => v === a[0]).length,
        center = c.cells[0];
      if (same > 1 && !markedGroups.has(center)) {
        // Highlight the actual equal-symbol group, not unrelated neighbors of it.
        // A larger connected group can violate several centers; report it once.
        const cells = [center],
          seen = new Set(cells);
        for (let j = 0; j < cells.length; j++)
          for (const cell of m.adj[cells[j]])
            if (values[cell] === a[0] && !seen.has(cell)) {
              seen.add(cell);
              cells.push(cell);
            }
        for (const cell of cells) markedGroups.add(cell);
        violations.push({
          kind: 'pair',
          text: 'Cada casa precisa de exatamente um vizinho igual.',
          cells: cells.sort((a, b) => a - b),
        });
      } else if (same === 0 && blanks === 0) {
        // With no free neighbor left, the whole neighborhood proves isolation.
        violations.push({
          kind: 'pair',
          text: 'Cada casa precisa de exatamente um vizinho igual.',
          cells: c.cells.slice(),
        });
      } else if (same === 0)
        pending.push({
          kind: 'partner',
          cells: c.cells.slice(),
          text: 'Parceiro ainda por preencher.',
        });
    }
  }
  // GAC may prove a contradiction through interacting rules, without looking
  // at any answer key. Surviving propagation is not a global-solvability claim.
  // On complete boards the direct checks above already cover every rule.
  if (!editing && !complete && !violations.length) {
    const result = propagate(m, s.d);
    if (!result.ok) {
      const c = m.constraints[result.constraint];
      violations.push({
        kind: 'impossible',
        text: `As escolhas deixam ${c.label} sem combinação possível.`,
        cells: c.cells.slice(),
      });
    }
  }
  if (!complete)
    pending.push({
      kind: 'empty',
      cells: values.flatMap((v, i) => (v < 0 ? [i] : [])),
      text: 'Há casas por preencher.',
    });
  return { complete, valid: violations.length === 0, violations, pending };
}
export function solveSymbols(level, values = level.clues, limit = 2, options = {}) {
  const s = initial(level, values),
    solutions = [];
  let nodes = 0,
    exhausted = false;
  if (s.error) return { solutions, count: 0, complete: true, nodes };
  function dfs(d) {
    if (solutions.length >= limit || exhausted) return;
    if (++nodes > (options.maxNodes ?? Infinity)) {
      exhausted = true;
      return;
    }
    if (!propagate(s.m, d).ok) return;
    let best = -1,
      size = 99,
      ties = 0;
    for (let i = 0; i < d.length; i++) {
      const p = pop(d[i]);
      if (p > 1 && p < size) {
        best = i;
        size = p;
        ties = 1;
      } else if (p > 1 && p === size && options.random && options.random() < 1 / ++ties) best = i;
    }
    if (best < 0) {
      solutions.push(d.map((x) => Math.log2(x)));
      return;
    }
    let choices = vals(d[best]);
    if (options.random) choices.sort(() => options.random() - 0.5);
    for (const v of choices) {
      const copy = d.slice();
      copy[best] = 1 << v;
      dfs(copy);
      if (solutions.length >= limit || exhausted) break;
    }
  }
  if (limit > 0) dfs(s.d);
  return { solutions, count: solutions.length, complete: !exhausted, nodes };
}
const names = ['círculo', 'triângulo', 'quadrado', 'losango'];
export function symbolHint(level, values = level.clues, tier = 1) {
  tier = Math.max(1, Math.min(3, tier));
  const check = validateSymbols(level, values);
  if (!check.valid)
    return {
      tier,
      kind: 'conflict',
      text: check.violations[0].text,
      cells: check.violations[0].cells,
      premises: check.violations,
      eliminations: [],
    };
  if (check.complete)
    return {
      tier,
      kind: 'complete',
      text: 'Todas as regras estão satisfeitas.',
      cells: [],
      premises: [],
      eliminations: [],
    };
  const s = initial(level, values),
    trace = [];
  propagate(s.m, s.d, trace);
  const step = trace[0];
  if (!step)
    return {
      tier,
      kind: 'no-human-step',
      text: 'Nenhuma dedução direta disponível. Revise candidatos e cruze as restrições; nenhuma resposta foi revelada.',
      cells: [],
      premises: [],
      eliminations: [],
    };
  const loc = `L${((step.cell / s.m.n) | 0) + 1}C${(step.cell % s.m.n) + 1}`,
    rule =
      step.kind === 'quota'
        ? 'Cada linha e coluna contém exatamente dois de cada símbolo.'
        : step.kind === 'pair'
          ? 'Cada casa precisa de um único vizinho igual; uma dupla fechada exclui iguais ao redor.'
          : 'A casa central e seus vizinhos precisam conter os três símbolos.';
  const removed = step.before.filter((v) => !step.after.includes(v));
  return {
    tier,
    kind: step.kind,
    text:
      tier === 1
        ? `Observe ${step.label}. ${rule}`
        : tier === 2
          ? `${rule} Compare as possibilidades das casas destacadas: nem toda combinação satisfaz essa regra.`
          : `${loc} não pode conter ${removed.map((v) => names[v]).join(' ou ')}: nenhuma combinação das possibilidades listadas satisfaz a regra de ${step.label}.${step.after.length === 1 ? ` Portanto, preencha ${names[step.after[0]]}.` : ''}`,
    cells: tier < 3 ? step.cells : [step.cell],
    premises: tier === 1 ? [] : step.premises,
    eliminations: tier === 3 ? removed.map((value) => ({ cell: step.cell, value })) : [],
    ...(tier === 3 && step.after.length === 1 ? { cell: step.cell, value: step.after[0] } : {}),
  };
}
/** GAC profile is a reproducible proxy, not a human difficulty guarantee. */
export function profileSymbols(level) {
  const s = initial(level),
    trace = [];
  if (s.error) return null;
  const result = propagate(s.m, s.d, trace);
  const depth = Array(s.d.length).fill(0),
    counts = { quota: 0, pair: 0, coverage: 0 };
  let maxChain = 0;
  for (const step of trace) {
    const dep = Math.max(0, ...step.cells.filter((i) => i !== step.cell).map((i) => depth[i]));
    depth[step.cell] = Math.max(depth[step.cell], dep + 1);
    maxChain = Math.max(maxChain, depth[step.cell]);
    counts[step.kind]++;
  }
  const remaining = s.d.filter((x) => pop(x) > 1).length;
  return {
    logical: result.ok && remaining === 0,
    steps: trace.length,
    maxChain,
    counts,
    remaining,
    score: remaining * 100 + maxChain * 4 + trace.length + counts.pair * 2 + counts.coverage * 2,
    techniques: Object.keys(counts).filter((k) => counts[k]),
  };
}
export function canonicalSymbols(level) {
  const n = level.rows,
    keys = [];
  for (let reflect = 0; reflect < 2; reflect++)
    for (let rot = 0; rot < 4; rot++) {
      const a = Array(n * n);
      for (let r = 0; r < n; r++)
        for (let c = 0; c < n; c++) {
          let x = r,
            y = reflect ? n - 1 - c : c;
          for (let t = 0; t < rot; t++) [x, y] = [y, n - 1 - x];
          a[x * n + y] = level.clues[r * n + c];
        }
      const map = new Map();
      keys.push(
        a
          .map((v) => {
            if (v < 0) return '.';
            if (!map.has(v)) map.set(v, map.size);
            return map.get(v);
          })
          .join(''),
      );
    }
  return keys.sort()[0];
}
