import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Auditor independente: percorre todas as distribuições do estoque.
 * Não usa o propagador, engine, certificado nem gabarito para aceitar posições.
 */
export function auditMirante(level) {
  const size = level.rows * level.cols, rays = [];
  for (const side of ['left', 'right', 'top', 'bottom']) {
    for (let lane = 0; lane < level.observers[side].length; lane++) {
      const shape = level.observers[side][lane];
      if (shape === null) continue;
      const cells = [];
      if (side === 'left' || side === 'right') for (let c = 0; c < level.cols; c++) cells.push(lane * level.cols + c);
      else for (let r = 0; r < level.rows; r++) cells.push(r * level.cols + lane);
      if (side === 'right' || side === 'bottom') cells.reverse();
      rays.push({ shape, cells });
    }
  }
  let assignments = 0, solutions = 0, withoutWitnesses = 0;
  let answer = null, orphanAlternative = null;
  const board = Array(size).fill(0);
  function visit(index, circles, triangles) {
    if (circles < 0 || triangles < 0 || circles + triangles > size - index) return;
    if (index === size) {
      assignments++;
      const counts = Array(size).fill(0);
      for (const ray of rays) {
        let found = -1;
        for (const cell of ray.cells) if (board[cell] !== 0) { found = cell; break; }
        if (found < 0 || board[found] !== ray.shape) return;
        counts[found]++;
      }
      withoutWitnesses++;
      if (board.some((value, cell) => value > 0 && counts[cell] < 2)) { orphanAlternative ||= board.slice(); return; }
      solutions++; answer = board.slice(); return;
    }
    board[index] = 0; visit(index + 1, circles, triangles);
    if (circles) { board[index] = 1; visit(index + 1, circles - 1, triangles); }
    if (triangles) { board[index] = 2; visit(index + 1, circles, triangles - 1); }
    board[index] = 0;
  }
  visit(0, level.inventory.circle, level.inventory.triangle);
  return { assignments, solutions, withoutWitnesses, answer, orphanAlternative, exhaustive: true };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { CAMPAIGN } = await import('../../dist/logica/games/mirante/campaign.mjs');
  const rows = CAMPAIGN.map(level => {
    const result = auditMirante(level);
    if (result.solutions !== 1 || result.answer.join() !== level.solution.join()) throw Error(`Auditoria falhou: ${level.id}`);
    if ((result.withoutWitnesses > 1) !== level.certificate.witnessesEssential) throw Error(`Testemunhas divergentes: ${level.id}`);
    return { id: level.id, number: level.number, assignments: result.assignments, solutions: result.solutions, withoutWitnesses: result.withoutWitnesses, exhaustive: true };
  });
  const report = { game: 'mirante', method: 'Enumeração independente de todas as distribuições do estoque, sem consulta ao gabarito para validar.', levels: 80, assignments: rows.reduce((n, x) => n + x.assignments, 0), unique: rows.every(x => x.solutions === 1), witnessesEssential: rows.filter(x => x.withoutWitnesses > 1).length, results: rows };
  writeFileSync(new URL('../../tests/logica/mirante-independent.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ levels: report.levels, assignments: report.assignments, unique: report.unique, witnessesEssential: report.witnessesEssential }));
}
