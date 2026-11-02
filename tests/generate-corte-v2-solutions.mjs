// Geração e preparação de dados de componentes compartilhados do Intuição.
import fs from 'node:fs';
import { cutLevels } from '../dist/levels.mjs';
import { curvedCut, shapePolygon, basicCutState } from '../dist/curves.mjs';
const answers = [];
for (const [i, l] of cutLevels.entries()) {
  const poly = shapePolygon(l.shape);
  let lo = l.basicMin,
    hi = l.basicMax;
  for (let j = 0; j < 25; j++) {
    const m = (lo + hi) / 2,
      r = curvedCut(poly, basicCutState(l, m), 2);
    if (r.ratio * 100 < l.target) lo = m;
    else hi = m;
  }
  const travel = (lo + hi) / 2,
    r = curvedCut(poly, basicCutState(l, travel));
  answers.push(travel);
  console.log(i + 1, travel.toFixed(3), r.ratio * 100, r.errorPP);
}
fs.writeFileSync('/tmp/corte-v2-solutions.json', JSON.stringify(answers));
