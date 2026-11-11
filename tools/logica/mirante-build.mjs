import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { solveMirante } from './mirante-solver.mjs';
import { checkState, observerRays } from '../../dist/logica/games/mirante/engine.mjs';

let seed = 0x4d495241;
function random() { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return (seed >>> 0) / 4294967296; }
const integer = n => Math.floor(random() * n);
function shuffle(values) { for (let i = values.length - 1; i > 0; i--) { const j = integer(i + 1); [values[i], values[j]] = [values[j], values[i]]; } return values; }
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

export function structuralSignature(level) {
  const variants = [];
  for (let mirror = 0; mirror < 2; mirror++) for (let rotations = 0; rotations < 4; rotations++) {
    let rows = level.rows, cols = level.cols, cells = level.solution.slice();
    if (mirror) cells = cells.flatMap((_, i) => i % cols ? [] : cells.slice(i, i + cols).reverse());
    for (let k = 0; k < rotations; k++) {
      const next = Array(cells.length);
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) next[c * rows + rows - 1 - r] = cells[r * cols + c];
      cells = next; [rows, cols] = [cols, rows];
    }
    for (let swap = 0; swap < 2; swap++) variants.push(`${rows}x${cols}:${cells.map(v => swap && v ? 3 - v : v).join('')}`);
  }
  return variants.sort()[0];
}

function definitionFromBoard(rows, cols, cells) {
  const observers = { left: Array(rows).fill(null), right: Array(rows).fill(null), top: Array(cols).fill(null), bottom: Array(cols).fill(null) };
  const temporary = { rows, cols, observers: Object.fromEntries(Object.entries(observers).map(([s, a]) => [s, a.map(() => 1)])) };
  for (const ray of observerRays(temporary)) {
    const hit = ray.cells.find(index => cells[index]);
    observers[ray.side][ray.lane] = hit === undefined ? null : cells[hit];
  }
  return { rows, cols, observers, inventory: { circle: cells.filter(v => v === 1).length, triangle: cells.filter(v => v === 2).length }, solution: cells };
}

const fixtures = [
  definitionFromBoard(3, 3, [1, 1, 0, 0, 0, 2, 0, 0, 2]),
  definitionFromBoard(3, 3, [1, 2, 0, 0, 1, 0, 0, 0, 2]),
];

function certify(level) {
  const result = solveMirante(level);
  if (!result.complete || result.count !== 1 || !checkState(level, { cells: result.solutions[0] }).valid) return null;
  if (result.solutions[0].join() !== level.solution.join()) throw Error('Certificado diverge da construção.');
  const relaxed = solveMirante(level, { witnesses: false, maxNodes: 100000 });
  const witnessesEssential = relaxed.count >= 2;
  const metrics = result.metrics;
  const seen = checkState(level, { cells: level.solution }).witnesses.filter(n => n > 0);
  const observerCount = observerRays(level).length;
  const pieces = level.inventory.circle + level.inventory.triangle;
  const score = metrics.branches * 12 + metrics.maxDepth * 8 + metrics.rounds
    + (witnessesEssential ? 25 : 0) + metrics.protectedCorridors * 2 + (level.rows * level.cols - observerCount) + pieces;
  return { ...level, certificate: { unique: true, solutions: 1, exhaustive: true, solver: 'mirante-gac-1', metrics,
    withoutWitnesses: { solutionsAtLeast: relaxed.count, exhaustive: relaxed.complete }, witnessesEssential,
    observers: observerCount, pieces, sharing: { two: seen.filter(n => n === 2).length, three: seen.filter(n => n === 3).length, four: seen.filter(n => n === 4).length }, score,
    structuralSignature: structuralSignature(level) } };
}

export function buildMirante() {
  seed = 0x4d495241;
  const pool = [], used = new Set(fixtures.map(structuralSignature));
  let attempts = 0;
  while (attempts < 45000 && (pool.filter(p => !p.certificate.witnessesEssential).length < 100 || pool.filter(p => p.certificate.witnessesEssential).length < 100)) {
    attempts++;
    const dimensions = attempts % 5 === 0 ? [3, 3] : attempts % 5 < 3 ? [3, 4] : [4, 4];
    const [rows, cols] = dimensions;
    const size = rows * cols, pieces = Math.max(rows, cols) + integer(Math.min(3, Math.floor(size / 2) - Math.max(rows, cols) + 1));
    const positions = shuffle(Array.from({ length: size }, (_, i) => i));
    const cells = Array(size).fill(0);
    positions.slice(0, pieces).forEach(index => { cells[index] = 1 + integer(2); });
    if (!cells.includes(1) || !cells.includes(2)) continue;
    // Não fabricar variedade com linhas/colunas completamente inúteis.
    if (Array.from({ length: rows }, (_, r) => cells.slice(r * cols, (r + 1) * cols).some(Boolean)).includes(false)) continue;
    if (Array.from({ length: cols }, (_, c) => cells.some((v, i) => v && i % cols === c)).includes(false)) continue;
    const level = definitionFromBoard(rows, cols, cells);
    const signature = structuralSignature(level);
    if (used.has(signature) || !checkState(level, { cells }).valid) continue;
    if (attempts % 3 !== 0) {
      const eyes = shuffle(observerRays(level).map(ray => [ray.side, ray.lane]));
      let removed = 0;
      for (const [side, lane] of eyes) {
        if (removed >= 1 + attempts % 4) break;
        const previous = level.observers[side][lane]; level.observers[side][lane] = null;
        if (checkState(level, { cells }).valid) removed++;
        else level.observers[side][lane] = previous;
      }
    }
    const certified = certify(level);
    if (certified) { pool.push(certified); used.add(signature); }
    if (attempts % 1000 === 0) console.log(`MIRANTE tentativas=${attempts}, únicas=${pool.length}, testemunhas=${pool.filter(p => p.certificate.witnessesEssential).length}`);
  }
  const ordinary = pool.filter(p => !p.certificate.witnessesEssential).sort((a, b) => a.certificate.score - b.certificate.score || a.rows * a.cols - b.rows * b.cols);
  const essential = pool.filter(p => p.certificate.witnessesEssential).sort((a, b) => a.certificate.score - b.certificate.score);
  if (ordinary.length < 43 || essential.length < 35) throw Error(`Pool insuficiente: ${ordinary.length} comuns, ${essential.length} testemunhas.`);
  const early = [certify(fixtures[0]), ...ordinary.slice(0, 14), certify(fixtures[1]), ...ordinary.slice(14, 43)];
  const advanced = Array.from({ length: 35 }, (_, i) => essential[Math.floor(i * (essential.length - 1) / 34)]);
  const levels = [...early, ...advanced].map((level, index) => {
    const number = index + 1, difficulty = Math.min(5, Math.floor(index / 15));
    const kind = difficulty < 2 ? 'Cantos e primeiras vistas' : difficulty === 2 ? 'O estoque cruza as vistas' : difficulty === 3 ? 'A segunda testemunha' : difficulty === 4 ? 'Corredores protegidos' : 'Síntese de vistas';
    const definition = { rows: level.rows, cols: level.cols, inventory: level.inventory, observers: level.observers };
    return { id: `mirante-${hash(definition).slice(0, 14)}`, version: 1, game: 'mirante', name: `${kind} ${number}`, difficulty, number,
      ...level, discovery: difficulty < 2 ? 'Cruze as formas pedidas pelos observadores e use o estoque para eliminar posições.' : difficulty === 2 ? 'As quantidades globais restringem os primeiros objetos de linhas e colunas ao mesmo tempo.' : 'Peças certas precisam conservar uma segunda visão: uma colocação que encobre esse corredor é impossível.',
      editorial: { basis: 'Propagação de estoque, primeira vista e segunda testemunha; faixas editoriais sem playtest.', requiresWitnessRule: level.certificate.witnessesEssential } };
  });
  if (levels.length !== 80 || new Set(levels.map(l => l.certificate.structuralSignature)).size !== 80) throw Error('Quantidade ou diversidade inválida.');
  const campaign = new URL('../../dist/logica/games/mirante/campaign.mjs', import.meta.url);
  writeFileSync(campaign, `// Gerado por tools/logica/mirante-build.mjs. Nenhuma busca roda no navegador.\nexport const CAMPAIGN = ${JSON.stringify(levels, null, 2)};\n`);
  const report = { game: 'mirante', seed: '0x4d495241', attempts, pool: pool.length, levels: 80, unique: 80, uniqueUpToRotationReflectionAndShapeExchange: 80,
    witnessesEssential: levels.filter(l => l.certificate.witnessesEssential).length,
    tiers: Array.from({ length: 6 }, (_, tier) => ({ tier, count: levels.filter(l => l.difficulty === tier).length, minScore: Math.min(...levels.filter(l => l.difficulty === tier).map(l => l.certificate.score)), maxScore: Math.max(...levels.filter(l => l.difficulty === tier).map(l => l.certificate.score)) })),
    limitations: 'Faixas por métricas do solver e uso indispensável de testemunhas. Não equivalem a dificuldade humana calibrada nem a roteiro de deduções humanas de cada fase.' };
  writeFileSync(new URL('../../tests/logica/mirante-generation.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  return levels;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) buildMirante();
