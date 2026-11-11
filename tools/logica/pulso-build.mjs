import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { rowPatterns, solvePulso } from './pulso-solver.mjs';
import { checkState } from '../../dist/logica/games/pulso/engine.mjs';

let seed = 0x50554c53;
function random() { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return (seed >>> 0) / 4294967296; }
const integer = n => Math.floor(random() * n);
function shuffle(values) { for (let i = values.length - 1; i > 0; i--) { const j = integer(i + 1); [values[i], values[j]] = [values[j], values[i]]; } return values; }
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');

// Permutar linhas ou refletir horizontalmente não fabrica uma fase nova.
export function structuralSignature(level) {
  const rows = Array.from({ length: level.rows }, (_, r) => level.solution.slice(r * level.cols, (r + 1) * level.cols));
  return [rows, rows.map(row => row.slice().reverse())].map(board => `${level.rows}x${level.cols}:${board.map(row => row.join('')).sort().join('/')}`).sort()[0];
}

function definition(rows, cols, choices, givens) {
  const patterns = rowPatterns(cols), solution = choices.flatMap(index => patterns[index]);
  return { rows, cols, quotas: Array.from({ length: cols }, (_, c) => solution.reduce((n, value, i) => n + Number(i % cols === c && value === 1), 0)), givens, solution };
}
const fixtures = [
  definition(4, 7, [0, 4, 8, 0], { 2: 1, 7: 0, 20: 1, 27: 0 }),
  definition(4, 7, [4, 0, 8, 7], { 1: 0, 8: 1, 19: 0, 23: 1 }),
];

function certify(level) {
  const logical = [0, 1, 2].map(strength => solvePulso(level, { strength, search: false }));
  const requiredStrength = logical.findIndex(result => result.count === 1 && result.complete);
  if (requiredStrength < 0) return null;
  const result = solvePulso(level);
  if (!result.complete || result.count !== 1 || !checkState(level, { cells: result.solutions[0] }).valid) return null;
  if (level.solution.join() !== result.solutions[0].join()) throw Error('Construção diverge do certificado.');
  const metrics = logical[requiredStrength].metrics;
  return { ...level, certificate: { unique: true, solutions: 1, exhaustive: true, solver: 'pulso-capacities-1', requiredStrength,
    metrics, independentColumnsStall: !logical[0].count, pairColumnsStall: !logical[1].count,
    score: requiredStrength * 1000 + metrics.rounds * 12 + metrics.initialCandidates + metrics.removals[requiredStrength] * 2,
    structuralSignature: structuralSignature(level) } };
}

export function buildPulso() {
  seed = 0x50554c53;
  const pool = [], used = new Set(fixtures.map(structuralSignature));
  let attempts = 0;
  while (attempts < 10000) {
    const counts = [0, 1, 2].map(strength => pool.filter(p => p.certificate.requiredStrength === strength).length);
    if (counts[0] >= 90 && counts[1] >= 45 && counts[2] >= 10) break;
    attempts++;
    const cols = attempts < 1500 ? (attempts % 5 === 0 ? 6 : attempts % 5 < 3 ? 7 : 8) : (attempts % 3 === 0 ? 8 : 9);
    const rows = attempts < 1500 ? (attempts % 4 === 0 ? 3 : attempts % 4 === 1 ? 4 : 5) : 5 + attempts % 2;
    const patterns = rowPatterns(cols);
    const level = definition(rows, cols, Array.from({ length: rows }, () => integer(patterns.length)), {});
    const signature = structuralSignature(level);
    if (used.has(signature)) continue;
    // Zeros são úteis no início, mas não dominam a campanha.
    if (level.quotas.filter(q => q === 0).length > 1) continue;
    level.givens = Object.fromEntries(level.solution.map((value, index) => [index, value]));
    for (const index of shuffle(Array.from({ length: rows * cols }, (_, i) => i))) {
      const old = level.givens[index]; delete level.givens[index];
      // A retirada só fica se ainda houver cadeia completa de capacidades, sem adivinhação.
      const result = solvePulso(level, { strength: 2, search: false });
      if (result.count !== 1 || !result.complete) level.givens[index] = old;
    }
    const certified = certify(level);
    if (certified) { pool.push(certified); used.add(signature); }
    if (attempts % 100 === 0) console.log(`PULSO tentativas=${attempts}, únicas=${pool.length}, por técnica=${[0, 1, 2].map(s => pool.filter(p => p.certificate.requiredStrength === s).length).join('/')}`);
  }
  const ordered = strength => pool.filter(p => p.certificate.requiredStrength === strength).sort((a, b) => a.certificate.score - b.certificate.score);
  const ordinary = ordered(0), pairs = ordered(1), triples = ordered(2);
  if (ordinary.length < 44 || pairs.length < 24 || triples.length < 10) throw Error(`Pool insuficiente: ${ordinary.length}/${pairs.length}/${triples.length}`);
  const easy = Array.from({ length: 44 }, (_, i) => ordinary[Math.floor(i * (ordinary.length - 1) / 43)]);
  const medium = Array.from({ length: 24 }, (_, i) => pairs[Math.floor(i * (pairs.length - 1) / 23)]);
  const difficult = Array.from({ length: 10 }, (_, i) => triples[Math.floor(i * (triples.length - 1) / 9)]);
  const selected = [certify(fixtures[0]), ...easy, certify(fixtures[1]), ...medium, ...difficult];
  const levels = selected.map((level, index) => {
    const number = index + 1, difficulty = Math.min(5, Math.floor(index / 15));
    const labels = ['Pontas e cotas', 'Intervalos em cadeia', 'Colunas que se completam', 'Uma capacidade limita outra', 'Reservas combinadas', 'Síntese de capacidades'];
    const def = { rows: level.rows, cols: level.cols, quotas: level.quotas, givens: level.givens };
    const discovery = level.certificate.requiredStrength === 0
      ? 'Elimine os trios que não cabem nas casas fixas e propague as cotas entre as linhas.'
      : level.certificate.requiredStrength === 1
        ? 'Compare duas colunas: certos trios gastam uma capacidade sempre que ocupam a outra.'
        : 'Uma coluna compete com duas outras; compare a capacidade conjunta antes de escolher o intervalo.';
    return { id: `pulso-${hash(def).slice(0, 14)}`, version: 1, game: 'pulso', name: `${labels[difficulty]} ${number}`, difficulty, number, ...level, discovery,
      editorial: { basis: 'Cadeia completa de limites de capacidade; nenhuma hipótese de tabuleiro necessária no solver pedagógico. Classificação editorial, sem playtest.', technique: ['cotas e intervalos', 'comparação de duas colunas', 'comparação de três colunas'][level.certificate.requiredStrength] } };
  });
  if (levels.length !== 80 || new Set(levels.map(l => l.certificate.structuralSignature)).size !== 80) throw Error('Quantidade ou diversidade inválida.');
  writeFileSync(new URL('../../dist/logica/games/pulso/campaign.mjs', import.meta.url), `// Gerado por tools/logica/pulso-build.mjs. Nenhuma busca roda no navegador.\nexport const CAMPAIGN = ${JSON.stringify(levels, null, 2)};\n`);
  const report = { game: 'pulso', seed: '0x50554c53', attempts, pool: pool.length, levels: 80, unique: 80, uniqueUpToRowPermutationAndHorizontalReflection: 80,
    techniques: [0, 1, 2].map(strength => ({ strength, count: levels.filter(l => l.certificate.requiredStrength === strength).length })),
    tiers: Array.from({ length: 6 }, (_, tier) => ({ tier, count: levels.filter(l => l.difficulty === tier).length, minScore: Math.min(...levels.filter(l => l.difficulty === tier).map(l => l.certificate.score)), maxScore: Math.max(...levels.filter(l => l.difficulty === tier).map(l => l.certificate.score)) })),
    limitations: 'As faixas iniciais variam a extensão das cadeias; Avançado exige comparar duas colunas, e as últimas dez fases exigem três. Não houve calibração com jogadores.' };
  writeFileSync(new URL('../../tests/logica/pulso-generation.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  return levels;
}
if (process.argv[1] === fileURLToPath(import.meta.url)) buildPulso();
