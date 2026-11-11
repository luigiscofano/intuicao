/** Auditor independente: atribuições diretas, sem domínios ou roteiro do Python. */
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { CAMPAIGN } from '../../dist/logica/games/divisa/campaign.mjs';
import { checkState } from '../../dist/logica/games/divisa/engine.mjs';

const records = [];
for (const level of CAMPAIGN) {
  const n = level.rows * level.cols, cells = level.givens.slice();
  const adjacent = Array.from({ length: n }, (_, i) => {
    const r = Math.floor(i / level.cols), c = i % level.cols, out = [];
    if (r) out.push(i - level.cols); if (r + 1 < level.rows) out.push(i + level.cols);
    if (c) out.push(i - 1); if (c + 1 < level.cols) out.push(i + 1);
    return out;
  });
  const pairs = Object.keys(level.contacts), counts = Object.fromEntries(pairs.map(pair => [pair, 0]));
  const pairOf = (a, b) => a < b ? a + b : b + a;
  for (let i = 0; i < n; i += 1) for (const j of adjacent[i]) {
    if (j > i && cells[i] !== null && cells[j] !== null && cells[i] !== cells[j]) counts[pairOf(cells[i], cells[j])] += 1;
  }
  const free = cells.flatMap((v, i) => v === null ? [i] : []), answers = [];
  let nodes = 0, leaves = 0;
  function stillConnected() {
    for (const letter of level.letters) {
      const start = cells.indexOf(letter);
      if (start < 0) continue;
      let reached = 1 << start, frontier = reached;
      while (frontier) {
        const bit = frontier & -frontier, i = 31 - Math.clz32(bit); frontier ^= bit;
        for (const j of adjacent[i]) {
          if (!(reached & (1 << j)) && (cells[j] === null || cells[j] === letter)) { reached |= 1 << j; frontier |= 1 << j; }
        }
      }
      for (let i = 0; i < n; i += 1) if (cells[i] === letter && !(reached & (1 << i))) return false;
    }
    return true;
  }
  function search(remaining) {
    nodes += 1;
    if (!remaining.length) {
      leaves += 1;
      if (pairs.every(pair => counts[pair] === level.contacts[pair]) && checkState(level, { cells, lastChanged: null }).valid) answers.push(cells.slice());
      return;
    }
    let best = remaining[0], priority = -1;
    for (const i of remaining) {
      const score = adjacent[i].filter(j => cells[j] !== null).length * 10 + adjacent[i].length;
      if (score > priority) { best = i; priority = score; }
    }
    const next = remaining.filter(i => i !== best);
    for (const letter of level.letters) {
      cells[best] = letter;
      const added = [];
      for (const j of adjacent[best]) if (cells[j] !== null && cells[j] !== letter) { const pair = pairOf(letter, cells[j]); counts[pair] += 1; added.push(pair); }
      if (pairs.every(pair => counts[pair] <= level.contacts[pair]) && stillConnected()) search(next);
      added.forEach(pair => { counts[pair] -= 1; }); cells[best] = null;
      if (answers.length >= 2) return;
    }
  }
  search(free);
  assert.equal(answers.length, 1, level.id); assert.deepEqual(answers[0], level.solution);
  records.push({ id: level.id, solutionCount: 1, searchExhausted: true, nodes, fullAssignmentsChecked: leaves });
  console.log(`DIVISA independente ${level.number}/80: 1 solução, ${nodes} nós`);
}
writeFileSync(new URL('./divisa-independent-results.json', import.meta.url), JSON.stringify({ method: 'Atribuição direta em JavaScript, sem domínios do gerador. Podas somente por excesso de contato e impossibilidade de conectar letras já atribuídas. Busca completa para cada solução única.', levels: 80, records }, null, 2));
