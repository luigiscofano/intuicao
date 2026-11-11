import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Enumeração independente de trios. Só poda excesso/falta de capacidade.
 * Não compartilha propagador, engine ou gabarito com o gerador.
 */
export function auditPulso(level) {
  const patterns = [];
  for (let a = 0; a < level.cols; a++) for (let b = a + 1; b < level.cols; b++) {
    const c = 2 * b - a;
    if (c < level.cols) patterns.push(Array.from({ length: level.cols }, (_, i) => Number(i === a || i === b || i === c)));
  }
  const domains = Array.from({ length: level.rows }, (_, row) => patterns.filter(p => {
    for (const [index, value] of Object.entries(level.givens)) if (Math.floor(Number(index) / level.cols) === row && p[Number(index) % level.cols] !== value) return false;
    return true;
  }));
  const order = Array.from({ length: level.rows }, (_, row) => row).sort((a, b) => domains[a].length - domains[b].length);
  const selected = Array(level.rows), sums = Array(level.cols).fill(0);
  let nodes = 0, solutions = 0, answer = null;
  function visit(depth) {
    nodes++;
    if (depth === level.rows) {
      if (sums.every((value, col) => value === level.quotas[col])) { solutions++; answer = selected.flat(); }
      return;
    }
    const row = order[depth];
    for (const pattern of domains[row]) {
      for (let col = 0; col < level.cols; col++) sums[col] += pattern[col];
      let possible = true;
      for (let col = 0; col < level.cols; col++) if (sums[col] > level.quotas[col] || sums[col] + level.rows - depth - 1 < level.quotas[col]) { possible = false; break; }
      if (possible) { selected[row] = pattern; visit(depth + 1); }
      for (let col = 0; col < level.cols; col++) sums[col] -= pattern[col];
    }
  }
  visit(0);
  return { solutions, answer, nodes, combinationsBeforeQuotas: domains.reduce((n, d) => n * d.length, 1), exhaustive: true };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { CAMPAIGN } = await import('../../dist/logica/games/pulso/campaign.mjs');
  const results = CAMPAIGN.map(level => {
    const result = auditPulso(level);
    if (result.solutions !== 1 || result.answer.join() !== level.solution.join()) throw Error(`Auditoria falhou: ${level.id}`);
    const { answer, ...certificate } = result;
    return { id: level.id, number: level.number, ...certificate };
  });
  const report = { game: 'pulso', method: 'Enumeração independente de todos os trios compatíveis com pistas fixas e cotas. Nenhuma hipótese é descartada por orçamento.', levels: 80, unique: true, results };
  writeFileSync(new URL('../../tests/logica/pulso-independent.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ levels: report.levels, unique: report.unique, nodes: results.reduce((n, x) => n + x.nodes, 0) }));
}
