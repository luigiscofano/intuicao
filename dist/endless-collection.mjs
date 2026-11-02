// Geração determinística de desafios livres da coleção e validação pelo motor.
/** Seeded, bounded constructive generators. No campaign catalog or stored solution
 * is used. Every generated answer is checked by the actual game rules. A known
 * solution is not a uniqueness claim. PACTO intentionally retains its 8×8 rules. */
import { validateGeometry, neighbors } from './geometry-games.mjs';
import { validateSymbols } from './symbol-games.mjs';
import { createDesvio, legalDesvioMoves } from './desvio.mjs';
const integer = (v, a, b, d) =>
  Number.isInteger(Number(v)) ? Math.max(a, Math.min(b, Number(v))) : d;
const choose = (v, values, d) => (values.includes(v) ? v : d);
function rng(seed) {
  let x = 2166136261;
  for (const c of String(seed)) {
    x ^= c.charCodeAt(0);
    x = Math.imul(x, 16777619);
  }
  return () => {
    x += 0x6d2b79f5;
    let z = x;
    z = Math.imul(z ^ (z >>> 15), z | 1);
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}
const shuffled = (values, random) => {
  const a = values.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const sequence = (n) => Array.from({ length: n }, (_, i) => i);
export function normalizeCollectionOptions(game, options = {}) {
  // Persisted preferences may be malformed; only a plain record is accepted.
  if (
    !options ||
    typeof options !== 'object' ||
    Array.isArray(options) ||
    ![Object.prototype, null].includes(Object.getPrototypeOf(options))
  )
    options = {};
  if (game === 'elo')
    return {
      size: integer(options.size, 4, 10, 6),
      regions: choose(Number(options.regions), [4, 6, 8], 6),
      fixed: options.fixed !== false,
    };
  if (game === 'prumo')
    return { size: integer(options.size, 4, 10, 6), pieces: integer(options.pieces, 2, 10, 5) };
  if (game === 'pacto') return { clues: choose(Number(options.clues), [24, 32, 40], 32) };
  if (game === 'desvio')
    return { size: choose(String(options.size), ['3x3', '3x4', '4x4'], '4x4') };
  throw new Error('Jogo Modo Sem Parar desconhecido.');
}
export function collectionOptionSpec(game) {
  const size = {
    key: 'size',
    label: 'Tamanho da grade',
    type: 'select',
    values: [4, 5, 6, 7, 8, 9, 10],
  };
  if (game === 'elo')
    return [
      size,
      { key: 'regions', label: 'Regiões', type: 'select', values: [4, 6, 8] },
      { key: 'fixed', label: 'Incluir uma peça fixa', type: 'checkbox' },
    ];
  if (game === 'prumo')
    return [
      size,
      {
        key: 'pieces',
        label: 'Peças / apoios',
        type: 'select',
        values: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        note: 'Cada desafio é construído a partir de uma partição equilibrada e validado. Não há garantia de solução única.',
      },
    ];
  if (game === 'pacto')
    return [
      {
        key: 'clues',
        label: 'Pistas iniciais',
        type: 'select',
        values: [24, 32, 40],
        note: 'Grade 8 × 8: quatro símbolos, exatamente dois de cada por linha e coluna. O tamanho preserva as regras do PACTO.',
      },
    ];
  if (game === 'desvio')
    return [
      {
        key: 'size',
        label: 'Tamanho da grade',
        type: 'select',
        values: ['3x3', '3x4', '4x4'],
        note: 'Até 16 casas, limite do motor e da análise exata do bot. Os mapas não prometem equilíbrio entre os jogadores.',
      },
    ];
  return [];
}
function elo(random, o) {
  const n = o.size,
    count = o.regions,
    need = count === 8 ? 4 : count === 6 ? 3 : 2;
  const xs = shuffled(sequence(n), random)
      .slice(0, need)
      .sort((a, b) => a - b),
    ys = shuffled(sequence(n), random)
      .slice(0, need)
      .sort((a, b) => a - b);
  let points =
    count === 4
      ? [
          [xs[0], ys[0]],
          [xs[1], ys[0]],
          [xs[1], ys[1]],
          [xs[0], ys[1]],
        ]
      : count === 6
        ? [
            [xs[0], ys[0]],
            [xs[2], ys[0]],
            [xs[2], ys[1]],
            [xs[1], ys[1]],
            [xs[1], ys[2]],
            [xs[0], ys[2]],
          ]
        : [
            [xs[0], ys[0]],
            [xs[3], ys[0]],
            [xs[3], ys[1]],
            [xs[2], ys[1]],
            [xs[2], ys[2]],
            [xs[1], ys[2]],
            [xs[1], ys[3]],
            [xs[0], ys[3]],
          ];
  const flipX = random() < 0.5,
    flipY = random() < 0.5,
    transpose = random() < 0.5;
  points = points.map(([x, y]) => {
    if (flipX) x = n - 1 - x;
    if (flipY) y = n - 1 - y;
    return transpose ? [y, x] : [x, y];
  });
  const positions = shuffled(
      points.map(([x, y]) => y * n + x),
      random,
    ),
    regions = Array(n * n).fill(-1),
    front = [];
  positions.forEach((cell, r) => {
    regions[cell] = r;
    for (const next of neighbors(cell, n, n)) front.push([next, r]);
  });
  // Random flood growth retains a path from every region cell to its solution
  // point. Assigned cells are never stolen, including the other seed points.
  while (front.length) {
    const j = Math.floor(random() * front.length),
      [cell, r] = front[j];
    front[j] = front.at(-1);
    front.pop();
    if (regions[cell] >= 0) continue;
    regions[cell] = r;
    for (const next of neighbors(cell, n, n)) if (regions[next] < 0) front.push([next, r]);
  }
  const fixed = {};
  if (o.fixed) {
    const r = Math.floor(random() * count);
    fixed[r] = positions[r];
  }
  return {
    level: { game: 'elo', rows: n, cols: n, regions, fixed },
    answer: { positions, discarded: [] },
  };
}
const validRect = (r) => r.w % 2 || r.h % 2;
function rectCuts(r) {
  const cuts = [];
  for (let w = 1; w < r.w; w++) {
    const a = { ...r, w },
      b = { ...r, x: r.x + w, w: r.w - w };
    if (validRect(a) && validRect(b)) cuts.push([a, b]);
  }
  for (let h = 1; h < r.h; h++) {
    const a = { ...r, h },
      b = { ...r, y: r.y + h, h: r.h - h };
    if (validRect(a) && validRect(b)) cuts.push([a, b]);
  }
  return cuts;
}
function prumo(random, o) {
  const n = o.size,
    rects = [{ x: 0, y: 0, w: n, h: n }];
  // Keep at least one piece with three cells. Support incidence reveals at
  // most two cells, so initialization can never pre-complete the puzzle.
  while (rects.length < o.pieces) {
    const choices = rects.flatMap((r, i) =>
      rectCuts(r)
        .filter(
          (cut) =>
            cut.some((p) => p.w * p.h >= 3) || rects.some((p, j) => j !== i && p.w * p.h >= 3),
        )
        .map((cut) => ({ i, cut })),
    );
    if (!choices.length) throw new Error('Não foi possível dividir esta grade.');
    const pick = choices[Math.floor(random() * choices.length)];
    rects.splice(pick.i, 1, ...pick.cut);
  }
  const assignments = Array(n * n).fill(-1),
    supports = [];
  shuffled(rects, random).forEach((r, s) => {
    supports.push({ id: s + 1, x2: 2 * r.x + r.w - 1, y2: 2 * r.y + r.h - 1 });
    for (let y = r.y; y < r.y + r.h; y++)
      for (let x = r.x; x < r.x + r.w; x++) assignments[y * n + x] = s;
  });
  return {
    level: { game: 'prumo', rows: n, cols: n, supports },
    answer: { assignments, candidates: [], discarded: [] },
  };
}
function pacto(random, o) {
  // Build two independently randomized Latin blocks of horizontal dominoes.
  // Column quotas are exact, and neighboring rows disagree in every domino.
  const symbols = shuffled([0, 1, 2, 3], random),
    cols = shuffled([0, 1, 2, 3], random),
    xor = random() < 0.5;
  const rows = shuffled([0, 1, 2, 3], random),
    rows2 = shuffled([0, 1, 2, 3], random);
  if (rows2[0] === rows[3]) [rows2[0], rows2[1]] = [rows2[1], rows2[0]];
  const values0 = [...rows, ...rows2].flatMap((r) =>
    cols.flatMap((c) => {
      const v = symbols[xor ? r ^ c : (r + c) % 4];
      return [v, v];
    }),
  );
  const transpose = random() < 0.5,
    flipX = random() < 0.5,
    flipY = random() < 0.5,
    values = Array(64);
  values0.forEach((v, i) => {
    let x = i % 8,
      y = i >> 3;
    if (flipX) x = 7 - x;
    if (flipY) y = 7 - y;
    if (transpose) [x, y] = [y, x];
    values[y * 8 + x] = v;
  });
  const shown = new Set(shuffled(sequence(64), random).slice(0, o.clues)),
    clues = values.map((v, i) => (shown.has(i) ? v : -1));
  return {
    level: { game: 'pacto', rows: 8, cols: 8, clues },
    answer: { values, candidates: Array.from({ length: 64 }, () => []) },
  };
}
function desvio(random, o) {
  const [rows, cols] = o.size.split('x').map(Number),
    arrows = sequence(rows * cols).map(() => (random() < 0.5 ? 'H' : 'V'));
  return { level: { game: 'desvio', rows, cols, arrows }, answer: null };
}
export function generateCollectionEndless(game, seed, rawOptions = {}) {
  const options = normalizeCollectionOptions(game, rawOptions),
    random = rng(`${game}:${seed}:${JSON.stringify(options)}`),
    result = { elo, prumo, pacto, desvio }[game](random, options);
  Object.assign(result.level, {
    id: `endless-${game}-${String(seed).replace(/[^a-zA-Z0-9_-]/g, '_')}-${Object.values(options).join('-')}`,
    name: 'Desafio Modo Sem Parar',
    difficulty: 'Modo Sem Parar',
    endless: true,
    seed: String(seed),
  });
  if (game === 'desvio') {
    if (!legalDesvioMoves(result.level, createDesvio(result.level)).length)
      throw new Error('Mapa Modo Sem Parar sem jogada inicial.');
  } else {
    const checked =
      game === 'pacto'
        ? validateSymbols(result.level, result.answer.values)
        : validateGeometry(result.level, result.answer);
    if (!checked.valid || !checked.complete)
      throw new Error(`Falha na validação do gerador ${game}.`);
  }
  return { ...result, options };
}
