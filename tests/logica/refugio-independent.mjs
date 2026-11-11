/** Enumera literalmente todos os estados binários; não usa podas do gerador. */
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { CAMPAIGN } from '../../dist/logica/games/refugio/campaign.mjs';
import { checkState } from '../../dist/logica/games/refugio/engine.mjs';

const records = [];
function bitCount(x) { let count = 0; while (x) { x &= x - 1; count += 1; } return count; }
for (const level of CAMPAIGN) {
  const n = level.rows * level.cols, full = (1 << n) - 1;
  const adjacent = Array.from({ length: n }, (_, i) => {
    const r = Math.floor(i / level.cols), c = i % level.cols;
    return (r ? 1 << (i - level.cols) : 0) | (r + 1 < level.rows ? 1 << (i + level.cols) : 0) |
      (c ? 1 << (i - 1) : 0) | (c + 1 < level.cols ? 1 << (i + 1) : 0);
  });
  let fixedWalls = 0, markers = 0;
  level.givens.forEach((value, i) => { if (value === 1) fixedWalls |= 1 << i; });
  level.markers.forEach(marker => { markers |= 1 << marker.index; });
  const unknown = level.givens.flatMap((value, i) => value === null ? [i] : []), answers = [];
  function valid(walls) {
    const free = full ^ walls;
    for (let bits = walls; bits; bits &= bits - 1) {
      const i = 31 - Math.clz32(bits & -bits);
      if (bitCount(adjacent[i] & free) < 2) return false;
    }
    let remaining = free; const groups = [];
    while (remaining) {
      let group = 0, frontier = remaining & -remaining;
      while (frontier) {
        const bit = frontier & -frontier, i = 31 - Math.clz32(bit); frontier ^= bit; group |= bit;
        frontier |= adjacent[i] & remaining & ~group;
      }
      if (bitCount(group & markers) !== 1) return false;
      groups.push(group); remaining &= ~group;
    }
    for (let bits = walls; bits; bits &= bits - 1) {
      const i = 31 - Math.clz32(bits & -bits);
      if (groups.filter(group => group & adjacent[i]).length !== 2) return false;
    }
    return true;
  }
  const total = 2 ** unknown.length;
  for (let assignment = 0; assignment < total; assignment += 1) {
    let walls = fixedWalls;
    unknown.forEach((index, bit) => { if ((assignment >> bit) & 1) walls |= 1 << index; });
    if (valid(walls)) answers.push(Array.from({ length: n }, (_, i) => (walls >> i) & 1));
  }
  assert.deepEqual(answers, [level.solution], level.id);
  assert.equal(checkState(level, { cells: answers[0], lastChanged: null }).valid, true);
  records.push({ id: level.id, solutionCount: 1, assignmentsEnumerated: total, searchExhausted: true });
  console.log(`REFÚGIO independente ${level.number}/80: 1 solução entre ${total} estados`);
}
writeFileSync(new URL('./refugio-independent-results.json', import.meta.url), JSON.stringify({ method: 'Enumeração literal de todos os estados binários compatíveis com pistas, usando componentes por bitsets, sem o propagador do gerador.', levels: 80, assignmentsEnumerated: records.reduce((sum, row) => sum + row.assignmentsEnumerated, 0), records }, null, 2));
