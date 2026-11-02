// Geração de REPASSE a partir de sementes e certificação da ordem de retirada.
/** REPASSE — seeded authorship, replay evidence and bounded exact analysis.
 * Every transfer uses engine.mjs; no second implementation of the rules.
 */
import {
  RULES_VERSION,
  DIRECTIONS,
  SIDES,
  configurationOf,
  validateLevel,
  initialState,
  replay,
  createSimulator,
} from './engine.mjs';
export const GENERATOR_VERSION = 1;
export const DIFFICULTIES = Object.freeze([
  'Descoberta',
  'Muito fácil',
  'Fácil',
  'Básico consolidado',
  'Intermediário',
  'Avançado',
  'Especialista',
  'Mestre',
]);
export const CHAPTERS = Object.freeze([
  'Primeiros repasses',
  'Quem precisa esperar',
  'Caminhos vazios',
  'Juntar no lugar certo',
  'A hora de sair',
  'Os dois lados',
  'Separar e reunir',
  'Combinações do básico',
  'Um destino por vez',
  'Receptores compartilhados',
  'Proteger e liberar',
  'Duas direções em curva',
  'Preparar o encerramento',
  'Conectar regiões',
  'Quatro destinos',
  'Funções que mudam',
  'Enigmas compactos',
  'Diferenças decisivas',
  'Conciliar condições',
  'Domínio do REPASSE',
]);
export const CONCEPTS = Object.freeze({
  receive: 'Receber antes de sair',
  accumulate: 'Acumular contribuições',
  passage: 'Abrir passagem',
  timing: 'Retirar no momento certo',
  handoff: 'Revezar receptores',
  destinations: 'Preparar todos os destinos',
  protect: 'Proteger metas',
  reunite: 'Bifurcar e reunir',
  unequal: 'Acumuladores diferentes',
  shared: 'Peça compartilhada',
  roles: 'Funções sucessivas',
  linked: 'Momentos conectados',
  asymmetry: 'Ler as assimetrias',
  endgame: 'Planejar pelo final',
});
const H = ['left', 'right'],
  V = ['up', 'down'],
  KINDS = ['original', 'single', 'corner', 'four'];
const VECTOR = { up: [-1, 0], right: [0, 1], down: [1, 0], left: [0, -1] };
const SIDE = { up: 'top', right: 'right', down: 'bottom', left: 'left' };
const DISCOVERIES = {
  receive: 'um receptor pode esperar uma contribuição antes de fazer o próprio repasse.',
  accumulate: 'as contribuições precisam se reunir na peça certa antes de ela sair.',
  passage: 'retirar uma peça muda quem será o próximo receptor naquela linha.',
  timing:
    'uma peça recebe primeiro, sai e deixa uma contribuição posterior atravessar sua posição.',
  handoff:
    'depois que o receptor mais próximo sai, o próximo repasse pode alcançar outro receptor.',
  destinations: 'as consequências de uma retirada precisam combinar com mais de um destino.',
  protect:
    'uma peça pode interceptar um valor para proteger uma caixa que já não pode receber mais.',
  reunite:
    'uma contribuição pode se dividir e voltar a participar duas vezes de um valor posterior.',
  unequal: 'dois acumuladores precisam encerrar suas contribuições em momentos diferentes.',
  shared: 'contribuições vindas de regiões diferentes podem depender da mesma peça.',
  roles: 'a mesma peça pode receber, interceptar e depois abrir passagem.',
  linked: 'preparar a saída de uma peça altera as condições necessárias para outra.',
  asymmetry: 'metas diferentes em lados opostos ajudam a decidir quem precisa esperar.',
  endgame: 'o valor que falta nas caixas indica quais peças podem realizar o último repasse.',
};
const NAMES = {
  receive: ['Uma ajuda antes de sair', 'A espera necessária', 'Receber para continuar'],
  accumulate: ['Encontro no centro', 'Contribuições reunidas', 'O valor que se prepara'],
  passage: ['A passagem aberta', 'Depois do espaço vazio', 'O receptor seguinte'],
  timing: ['Entre duas contribuições', 'A hora exata de sair', 'Receber e deixar passar'],
  handoff: ['A vez do próximo', 'Troca de receptor', 'O segundo destino'],
  destinations: ['Um clique, dois acordos', 'Destinos preparados', 'Consequências em conjunto'],
  protect: ['Uma caixa protegida', 'Quem segura o repasse', 'O limite já chegou'],
  reunite: [
    'Caminhos que se reencontram',
    'Duas voltas, um encontro',
    'Uma origem em dois caminhos',
  ],
  unequal: ['Cada um até sua hora', 'Dois valores diferentes', 'Acumular sem exagerar'],
  shared: ['O encontro das regiões', 'Uma peça em comum', 'O apoio compartilhado'],
  roles: ['Três funções no caminho', 'A peça muda de papel', 'Esperar, receber, abrir'],
  linked: ['Uma decisão prepara outra', 'A sequência das condições', 'Relações encadeadas'],
  asymmetry: ['A diferença está na meta', 'Lados que pedem diferente', 'Um equilíbrio desigual'],
  endgame: ['Comece pelo encerramento', 'A última contribuição', 'As caixas contam o final'],
};
const clone = (x) => JSON.parse(JSON.stringify(x));
const pick = (rng, items) => items[Math.floor(rng() * items.length)];
const integer = (rng, a, b) => a + Math.floor(rng() * (b - a + 1));
const shuffle = (rng, items) => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};
export function seedNumber(seed) {
  if (Number.isInteger(seed)) return seed >>> 0;
  if (typeof seed === 'string' && /^-?\d+$/.test(seed) && Number.isSafeInteger(Number(seed)))
    return Number(seed) >>> 0;
  let h = 2166136261;
  for (const c of String(seed ?? 0)) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
export function randomFor(seed) {
  let x = seedNumber(seed);
  return () => {
    x += 0x6d2b79f5;
    let z = x;
    z = Math.imul(z ^ (z >>> 15), z | 1);
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}
const zeros = (rows, cols) => ({
  top: Array(cols).fill(0),
  bottom: Array(cols).fill(0),
  left: Array(rows).fill(0),
  right: Array(rows).fill(0),
});
const position = (p) => `linha ${p.row + 1}, coluna ${p.col + 1}`;
const factorial = (n) => {
  let v = 1;
  for (let i = 2; i <= n; i++) v *= i;
  return v;
};
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

function transform(level, rotation, mirror, { topology = false } = {}) {
  const rows = [...new Set(level.pieces.map((p) => p.row))].sort((a, b) => a - b),
    cols = [...new Set(level.pieces.map((p) => p.col))].sort((a, b) => a - b);
  let R = rows.length,
    C = cols.length;
  let pieces = level.pieces.map((p) => ({
    ...p,
    row: rows.indexOf(p.row),
    col: cols.indexOf(p.col),
    directions: [...p.directions],
  }));
  let boxes = {
    top: cols.map((c) => level.targets.top[c]),
    bottom: cols.map((c) => level.targets.bottom[c]),
    left: rows.map((r) => level.targets.left[r]),
    right: rows.map((r) => level.targets.right[r]),
  };
  if (mirror) {
    pieces = pieces.map((p) => ({
      ...p,
      col: C - 1 - p.col,
      directions: p.directions.map((d) => (d === 'left' ? 'right' : d === 'right' ? 'left' : d)),
    }));
    boxes = {
      top: [...boxes.top].reverse(),
      bottom: [...boxes.bottom].reverse(),
      left: boxes.right,
      right: boxes.left,
    };
  }
  for (let k = 0; k < rotation; k++) {
    pieces = pieces.map((p) => ({
      ...p,
      row: p.col,
      col: R - 1 - p.row,
      directions: p.directions.map((d) => DIRECTIONS[(DIRECTIONS.indexOf(d) + 1) % 4]),
    }));
    boxes = {
      top: [...boxes.left].reverse(),
      right: boxes.top,
      bottom: [...boxes.right].reverse(),
      left: boxes.bottom,
    };
    [R, C] = [C, R];
  }
  const divisor = topology
    ? 1
    : [...pieces.map((p) => p.value), ...SIDES.flatMap((s) => boxes[s])].reduce(gcd, 0) || 1;
  const normalized = pieces
    .map((p) => [
      p.row,
      p.col,
      p.directions
        .map((d) => DIRECTIONS.indexOf(d))
        .sort()
        .join(''),
      ...(topology ? [] : [p.value / divisor]),
    ])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return JSON.stringify(
    topology
      ? [R, C, normalized]
      : [R, C, normalized, SIDES.map((s) => boxes[s].map((v) => v / divisor))],
  );
}
/** Eliminates translation, empty coordinate bands, D4 symmetry and uniform scale. */
export function levelSignature(level) {
  return Array.from({ length: 8 }, (_, i) => transform(level, i % 4, i >= 4)).sort()[0];
}
export function topologySignature(level) {
  return Array.from({ length: 8 }, (_, i) =>
    transform(level, i % 4, i >= 4, { topology: true }),
  ).sort()[0];
}

/** Exact counting with memoized complete states and necessary-condition pruning.
 * Counts distinct orders, not just terminal states. An interrupted run never
 * reports a number, uniqueness or a set of mandatory precedences as exact.
 */
export function analyzeAlternatives(level, { maxStates = 60000 } = {}) {
  const sim = createSimulator(level),
    n = level.pieces.length,
    memo = new Map();
  let visited = 0,
    pruned = 0,
    hiddenDeadEnds = 0,
    interrupted = false;
  if (n > 20)
    return {
      complete: false,
      status: 'inconclusive',
      visited: 0,
      pruned: 0,
      reason: 'editorial-piece-budget',
    };
  const empty = () => ({ count: 0, before: Array(n).fill(0), last: 0 });
  function visit(state) {
    const key = sim.stateKey(state);
    if (memo.has(key)) return memo.get(key);
    if (visited >= maxStates) {
      interrupted = true;
      throw new Error('budget');
    }
    visited++;
    const result = sim.evaluate(state);
    if (result.won) {
      const win = { count: 1, before: Array(n).fill(0), last: 0 };
      memo.set(key, win);
      return win;
    }
    if (sim.impossibility(state)) {
      pruned++;
      const none = empty();
      memo.set(key, none);
      return none;
    }
    const out = empty(),
      present = state.values.reduce((m, v, i) => (v ? m | (1 << i) : m), 0);
    for (let i = 0; i < n; i++)
      if (state.values[i]) {
        const tr = sim.transition(state, level.pieces[i].id);
        if (tr.result.overruns.length) {
          pruned++;
          continue;
        }
        const child = visit(tr.state);
        if (!child.count) {
          hiddenDeadEnds++;
          continue;
        }
        out.count += child.count;
        if (!Number.isSafeInteger(out.count)) {
          interrupted = true;
          throw new Error('count-limit');
        }
        for (let j = 0; j < n; j++) out.before[j] |= child.before[j];
        out.before[i] |= present & ~(1 << i);
        out.last |= child.last || 1 << i;
      }
    memo.set(key, out);
    return out;
  }
  let root;
  try {
    root = visit(sim.initialState());
  } catch (error) {
    if (!interrupted) throw error;
    return { complete: false, status: 'inconclusive', visited, pruned, reason: 'state-budget' };
  }
  const initial = sim.initialState(),
    firstMoves = [],
    safeFirstMoves = [],
    firstCounts = {};
  for (let i = 0; i < n; i++) {
    const tr = sim.transition(initial, level.pieces[i].id);
    if (!tr.result.overruns.length) safeFirstMoves.push(level.pieces[i].id);
    const count = memo.get(sim.stateKey(tr.state))?.count ?? (tr.result.won ? 1 : 0);
    if (count) {
      firstMoves.push(level.pieces[i].id);
      firstCounts[level.pieces[i].id] = count;
    }
  }
  const requiredPrecedences = [];
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      if (i !== j && root.before[i] & (1 << j) && !(root.before[j] & (1 << i)))
        requiredPrecedences.push([level.pieces[i].id, level.pieces[j].id]);
  const lastMoves = level.pieces.filter((_, i) => root.last & (1 << i)).map((p) => p.id);
  const totalOrders = factorial(n);
  return {
    complete: true,
    status: root.count ? 'solved' : 'unsolvable',
    solutionCount: root.count,
    totalOrders,
    winningFraction: root.count / totalOrders,
    unique: root.count === 1,
    visited,
    pruned,
    hiddenDeadEnds,
    firstMoves,
    safeFirstMoves,
    firstCounts,
    lastMoves,
    requiredPrecedences,
  };
}

function crossedPieces(level, state, from, transfer) {
  const [dr, dc] = VECTOR[transfer.direction];
  const distance =
    transfer.to.kind === 'piece'
      ? Math.abs(transfer.to.row - from.row) + Math.abs(transfer.to.col - from.col)
      : Infinity;
  return level.pieces.flatMap((p, i) => {
    const aligned = dr ? p.col === from.col : p.row === from.row,
      offset = dr ? (p.row - from.row) * dr : (p.col - from.col) * dc;
    return aligned && offset > 0 && offset < distance && !state.values[i] ? [i] : [];
  });
}

/** Evidence from one certified solution. It is explicitly not a uniqueness proof. */
export function describeReplay(level) {
  const played = replay(level, level.solution);
  if (!played.valid || !played.solved) throw new Error('Uncertified Repasse candidate');
  const n = level.pieces.length,
    received = Array.from({ length: n }, () => []),
    depth = Array(n).fill(1),
    lineage = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
    );
  const evidence = Object.fromEntries(Object.keys(CONCEPTS).map((k) => [k, []]));
  let previous = initialState(level),
    maxValue = Math.max(...previous.values),
    interactions = 0,
    branches = 0;
  const sourceIds = [];
  for (const tr of played.steps) {
    const i = tr.removed.index,
      from = level.pieces[i],
      pieceTransfers = tr.transfers.filter((t) => t.to.kind === 'piece');
    maxValue = Math.max(
      maxValue,
      tr.removed.value,
      ...tr.state.values,
      ...SIDES.flatMap((s) => tr.state.boxes[s]),
    );
    if (pieceTransfers.length >= 2) {
      branches++;
      evidence.destinations.push({
        source: from.id,
        receivers: pieceTransfers.map((t) => t.to.id),
      });
    }
    for (const transfer of tr.transfers) {
      const crossed = crossedPieces(level, previous, from, transfer);
      for (const gone of crossed) {
        const blocker = level.pieces[gone].id;
        evidence.passage.push({ blocker, source: from.id, to: clone(transfer.to) });
        if (received[gone].length) {
          evidence.timing.push({
            before: received[gone][0].source,
            piece: blocker,
            after: from.id,
            to: clone(transfer.to),
          });
          if (transfer.to.kind === 'piece')
            evidence.handoff.push({
              before: received[gone][0].source,
              piece: blocker,
              after: from.id,
              receiver: transfer.to.id,
            });
          if (received[gone].length >= 2)
            evidence.roles.push({
              sources: received[gone].map((x) => x.source),
              piece: blocker,
              after: from.id,
            });
        }
      }
      if (transfer.to.kind === 'piece') {
        interactions++;
        const j = transfer.to.index;
        received[j].push({ source: from.id, direction: transfer.direction, value: transfer.value });
        evidence.receive.push({ source: from.id, receiver: transfer.to.id, value: transfer.value });
        depth[j] = Math.max(depth[j], depth[i] + 1);
        const common = lineage[i].flatMap((v, k) =>
          v && lineage[j][k] ? [level.pieces[k].id] : [],
        );
        if (common.length)
          evidence.reunite.push({ origins: common, source: from.id, receiver: transfer.to.id });
        for (let k = 0; k < n; k++) lineage[j][k] += lineage[i][k];
        const side = SIDE[transfer.direction],
          index =
            transfer.direction === 'up' || transfer.direction === 'down' ? from.col : from.row;
        if (level.targets[side][index] === previous.boxes[side][index])
          evidence.protect.push({
            source: from.id,
            receiver: transfer.to.id,
            side,
            index,
            target: level.targets[side][index],
          });
      }
    }
    sourceIds.push(from.id);
    previous = tr.state;
  }
  for (let i = 0; i < n; i++) {
    if (received[i].length >= 2)
      evidence.accumulate.push({
        piece: level.pieces[i].id,
        sources: received[i].map((x) => x.source),
      });
    if (
      new Set(
        received[i].map((x) =>
          ['left', 'right'].includes(x.direction) ? 'horizontal' : 'vertical',
        ),
      ).size > 1
    )
      evidence.shared.push({
        piece: level.pieces[i].id,
        sources: received[i].map((x) => x.source),
      });
  }
  for (const a of evidence.accumulate)
    for (const b of evidence.accumulate)
      if (a.piece < b.piece && a.sources.join() !== b.sources.join())
        evidence.unequal.push({
          first: a.piece,
          second: b.piece,
          sourcesA: a.sources,
          sourcesB: b.sources,
        });
  const maxDepth = Math.max(...depth);
  if (maxDepth >= 3 && evidence.timing.length)
    evidence.linked.push({ depth: maxDepth, timing: clone(evidence.timing[0]) });
  for (const [a, b] of [
    ['top', 'bottom'],
    ['left', 'right'],
  ])
    for (let i = 0; i < level.targets[a].length; i++)
      if (level.targets[a][i] !== level.targets[b][i])
        evidence.asymmetry.push({
          sides: [a, b],
          index: i,
          targets: [level.targets[a][i], level.targets[b][i]],
        });
  const last = played.steps.at(-1);
  if (last)
    evidence.endgame.push({
      piece: last.removed.id,
      value: last.removed.value,
      boxes: last.transfers.map((t) => clone(t.to)),
    });
  const concepts = Object.keys(CONCEPTS).filter((k) => evidence[k].length);
  return {
    concepts,
    evidence,
    interactions,
    branches,
    maxDepth,
    maxValue,
    maxTarget: Math.max(...SIDES.flatMap((s) => level.targets[s])),
    accumulators: evidence.accumulate.length,
    passages: evidence.passage.length,
    timedPieces: new Set(evidence.timing.map((x) => x.piece)).size,
    reunions: evidence.reunite.length,
    protectedBoxes: new Set(evidence.protect.map((x) => `${x.side}:${x.index}`)).size,
    removedValues: played.steps.map((x) => x.removed.value),
  };
}

function requiredEvidence(concept, trace, alternatives) {
  if (!alternatives?.complete) return false;
  const before = new Set(alternatives.requiredPrecedences.map((p) => p.join('>'))),
    need = (a, b) => before.has(a + '>' + b);
  switch (concept) {
    case 'receive':
      return trace.evidence.receive.some((x) => need(x.source, x.receiver));
    case 'accumulate':
      return trace.evidence.accumulate.some(
        (x) => x.sources.filter((s) => need(s, x.piece)).length >= 2,
      );
    case 'passage':
      return trace.evidence.passage.some((x) => need(x.blocker, x.source));
    case 'timing':
    case 'handoff':
      return trace.evidence[concept].some((x) => need(x.before, x.piece) && need(x.piece, x.after));
    case 'roles':
      return trace.evidence.roles.some(
        (x) => x.sources.filter((s) => need(s, x.piece)).length >= 2 && need(x.piece, x.after),
      );
    case 'destinations':
      return trace.evidence.destinations.some(
        (x) => x.receivers.filter((r) => need(x.source, r)).length >= 2,
      );
    case 'protect':
      return trace.evidence.protect.some((x) => need(x.source, x.receiver));
    case 'shared':
      return trace.evidence.shared.some(
        (x) => x.sources.filter((s) => need(s, x.piece)).length >= 2,
      );
    case 'unequal':
      return trace.evidence.unequal.some((x) => need(x.first, x.second) || need(x.second, x.first));
    case 'linked':
      return trace.evidence.linked.length > 0 && alternatives.requiredPrecedences.length >= 4;
    case 'reunite':
      return trace.evidence.reunite.some(
        (x) => x.origins.some((o) => need(o, x.receiver)) && need(x.source, x.receiver),
      );
    case 'asymmetry':
      return (
        trace.evidence.asymmetry.length > 0 &&
        alternatives.firstMoves.length < alternatives.safeFirstMoves.length + 1 &&
        alternatives.requiredPrecedences.length > 0
      );
    case 'endgame':
      return alternatives.lastMoves.length === 1;
    default:
      return false;
  }
}

function piece(row, col, directions) {
  return { row, col, directions: [...directions] };
}
function skeleton(family, rng) {
  switch (family) {
    case 'accumulate':
      return { pieces: [piece(1, 0, H), piece(1, 1, V), piece(1, 2, H)], order: [0, 2, 1] };
    case 'passage':
      return { pieces: [piece(1, 0, H), piece(1, 1, V), piece(1, 2, H)], order: [1, 0, 2] };
    case 'timing':
      return { pieces: [piece(1, 0, H), piece(1, 1, V), piece(1, 2, H)], order: [0, 1, 2] };
    case 'handoff':
      return {
        pieces: [piece(1, 0, H), piece(1, 1, H), piece(1, 2, V), piece(1, 3, V)],
        order: [1, 2, 0, 3],
      };
    case 'roles':
      return {
        pieces: [piece(1, 0, H), piece(1, 1, H), piece(1, 2, V), piece(1, 3, H)],
        order: [1, 3, 2, 0],
      };
    case 'destinations':
      return { pieces: [piece(1, 1, H), piece(1, 0, V), piece(1, 2, V)], order: [0, 1, 2] };
    case 'shared':
      return { pieces: [piece(1, 1, H), piece(0, 1, V), piece(1, 0, H)], order: [1, 2, 0] };
    case 'reunite':
      return {
        pieces: [
          piece(1, 2, V),
          piece(0, 2, H),
          piece(2, 2, H),
          piece(0, 0, V),
          piece(2, 0, V),
          piece(1, 0, H),
        ],
        order: [0, 1, 3, 2, 4, 5],
      };
    case 'unequal':
      return {
        pieces: [
          piece(0, 0, H),
          piece(0, 1, V),
          piece(0, 2, H),
          piece(1, 0, H),
          piece(1, 1, V),
          piece(1, 2, H),
        ],
        order: [0, 2, 1, 3, 5, 4],
      };
    case 'linked':
      return {
        pieces: [piece(0, 0, H), piece(0, 1, V), piece(1, 1, H), piece(1, 0, V), piece(1, 2, H)],
        order: [0, 1, 2, 3, 4],
      };
    case 'protect':
      return {
        pieces: [piece(0, 1, V), piece(1, 1, H), piece(1, 0, V), piece(0, 0, H)],
        order: [0, 1, 2, 3],
      };
    case 'asymmetry':
      return {
        pieces: [piece(0, 0, H), piece(0, 1, V), piece(1, 0, V), piece(1, 1, H)],
        order: [0, 1, 3, 2],
      };
    case 'endgame':
    case 'receive':
    default:
      return rng() < 0.5
        ? { pieces: [piece(0, 0, H), piece(0, 1, V), piece(1, 1, H)], order: [0, 1, 2] }
        : { pieces: [piece(0, 0, V), piece(1, 0, H)], order: [0, 1] };
  }
}

function arrows(kind, rng) {
  if (kind === 'single') return [pick(rng, DIRECTIONS)];
  if (kind === 'corner') {
    const a = integer(rng, 0, 3);
    return [DIRECTIONS[a], DIRECTIONS[(a + 1) % 4]];
  }
  if (kind === 'four') return [...DIRECTIONS];
  return [...pick(rng, [H, V])];
}

function draftFor(
  seed,
  {
    difficulty = 0,
    family = 'receive',
    pieceCount,
    requiredConfigurations = [],
    introduction,
    maxInitial = 3,
    maxValue = 99,
    randomStructure = false,
  } = {},
) {
  const rng = randomFor(seed),
    base = skeleton(family, rng);
  let desired =
    pieceCount ??
    integer(rng, Math.min(3 + Math.floor(difficulty / 2), 8), Math.min(4 + difficulty, 10));
  if (introduction) desired = integer(rng, 3, 5);
  desired = Math.max(base.pieces.length, Math.min(10, desired));
  if (introduction && base.pieces.length > 5) return null;
  const pieces = base.pieces.map((x) => clone(x));
  let order = [...base.order];
  const minRows = Math.max(...pieces.map((p) => p.row)) + 1,
    minCols = Math.max(...pieces.map((p) => p.col)) + 1;
  const R = Math.max(minRows, Math.min(4, desired <= 4 ? 2 : desired <= 6 ? 3 : 4)),
    C = Math.max(minCols, Math.min(4, desired <= 4 ? 2 : desired <= 6 ? 3 : 4));
  while (pieces.length < desired) {
    let cells = [];
    for (let row = 0; row < R; row++)
      for (let col = 0; col < C; col++)
        if (
          !pieces.some((p) => p.row === row && p.col === col) &&
          pieces.some((p) => p.row === row || p.col === col)
        )
          cells.push([row, col]);
    if (!cells.length) return null;
    const [row, col] = pick(rng, cells),
      i = pieces.length;
    pieces.push(piece(row, col, pick(rng, [H, V])));
    order.splice(integer(rng, 0, order.length), 0, i);
  }
  if (randomStructure) {
    for (let i = 0; i < pieces.length; i++)
      if (rng() < 0.38) pieces[i].directions = arrows('original', rng);
    order = shuffle(rng, order);
  }
  const changeable = shuffle(
    rng,
    pieces.map((_, i) => i),
  );
  const kinds = introduction
    ? [introduction]
    : requiredConfigurations.filter((x) => x !== 'original');
  for (const kind of kinds) {
    if (!changeable.length) break;
    const i = changeable.shift();
    pieces[i].directions = arrows(kind, rng);
  }
  // Symmetry is presentation variation only. The catalogue rejects equivalent
  // compressed topologies; these transformations cannot manufacture diversity.
  const reflectR = rng() < 0.5,
    reflectC = rng() < 0.5;
  for (const p of pieces) {
    if (reflectR) {
      p.row = R - 1 - p.row;
      p.directions = p.directions.map((d) => (d === 'up' ? 'down' : d === 'down' ? 'up' : d));
    }
    if (reflectC) {
      p.col = C - 1 - p.col;
      p.directions = p.directions.map((d) => (d === 'left' ? 'right' : d === 'right' ? 'left' : d));
    }
    p.value = integer(rng, 1, maxInitial);
  }
  const occupiedRows = [...new Set(pieces.map((p) => p.row))].sort((a, b) => a - b),
    occupiedCols = [...new Set(pieces.map((p) => p.col))].sort((a, b) => a - b);
  // Keep one genuine empty band occasionally, but it is ignored by signatures.
  const keepGap = desired >= 5 && rng() < 0.18;
  const rows = keepGap ? R : occupiedRows.length,
    cols = keepGap ? C : occupiedCols.length;
  pieces.forEach((p, i) => {
    p.id = 'p' + (i + 1);
    if (!keepGap) {
      p.row = occupiedRows.indexOf(p.row);
      p.col = occupiedCols.indexOf(p.col);
    }
    p.directions = DIRECTIONS.filter((d) => p.directions.includes(d));
  });
  const unscored = {
    id: 'generated-' + seedNumber(seed),
    version: 1,
    rulesVersion: RULES_VERSION,
    rows,
    cols,
    pieces,
    targets: zeros(rows, cols),
    solution: order.map((i) => pieces[i].id),
  };
  const calculated = replay(unscored, unscored.solution);
  if (!calculated.valid) return null;
  const level = { ...unscored, targets: calculated.state.boxes };
  const max = Math.max(
    ...calculated.steps.flatMap((s) => [
      s.removed.value,
      ...s.state.values,
      ...SIDES.flatMap((x) => s.state.boxes[x]),
    ]),
  );
  if (max > maxValue) return null;
  level.configurations = KINDS.filter((k) =>
    pieces.some((p) => configurationOf(p.directions) === k),
  );
  if (
    introduction &&
    (pieces.filter((p) => configurationOf(p.directions) === introduction).length !== 1 ||
      pieces.some((p) => !['original', introduction].includes(configurationOf(p.directions))))
  )
    return null;
  return level;
}

export function buildCandidate(seed, options = {}) {
  const level = draftFor(seed, options);
  if (!level) return null;
  const trace = describeReplay(level),
    primary = options.family ?? 'receive';
  if (options.requireConcept !== false && !trace.concepts.includes(primary)) return null;
  if (level.pieces.length > 2 && !trace.interactions) return null;
  const alternatives =
    options.analyze === false
      ? { complete: false, status: 'not-requested' }
      : analyzeAlternatives(level, { maxStates: options.maxStates ?? 40000 });
  if (options.requireComplete && (!alternatives.complete || !alternatives.solutionCount))
    return null;
  const necessary = requiredEvidence(primary, trace, alternatives);
  if (options.requireNecessary && level.pieces.length > 2 && !necessary) return null;
  const metadata = {
    difficulty: Math.max(0, Math.min(7, options.difficulty ?? 0)),
    primaryConcept: trace.concepts.includes(primary) ? primary : (trace.concepts[0] ?? 'endgame'),
    secondaryConcepts: trace.concepts.filter((k) => k !== primary),
    family: primary,
  };
  Object.assign(level, metadata, {
    name: pick(randomFor(seedNumber(seed) ^ 0xf01f), NAMES[metadata.primaryConcept]),
    discovery: 'Nesta fase, o jogador precisa perceber que ' + DISCOVERIES[metadata.primaryConcept],
    hints: [
      `Observe as metas ligadas a ${CONCEPTS[metadata.primaryConcept].toLowerCase()}.`,
      'Compare quem recebe agora com quem receberia depois de abrir uma passagem.',
      'As dicas da partida analisam a situação atual antes de indicar uma retirada.',
    ],
    validation: {
      replayed: true,
      generatorVersion: GENERATOR_VERSION,
      seed: seedNumber(seed),
      maxValue: trace.maxValue,
      maxTarget: trace.maxTarget,
      interactions: trace.interactions,
      dependencyDepth: trace.maxDepth,
      timedPieces: trace.timedPieces,
      reunions: trace.reunions,
      conceptsObserved: trace.concepts,
      primaryPrecedenceSupported: necessary,
      alternatives,
      signature: levelSignature(level),
      topology: topologySignature(level),
    },
  });
  return { level, trace, alternatives };
}

export function normalizeGeneratorOptions(options = {}) {
  options = options && typeof options === 'object' && !Array.isArray(options) ? options : {};
  const strings = (value) =>
    Array.isArray(value) ? value.filter((x) => typeof x === 'string') : [];
  const difficulty = Math.max(
    0,
    Math.min(7, Number.isInteger(options.difficulty) ? options.difficulty : 0),
  );
  const allowed = KINDS.filter(
    (k) => k === 'original' || strings(options.allowedConfigurations).includes(k),
  );
  const introduction = options.introduction ?? null;
  if (
    introduction &&
    (!['single', 'corner', 'four'].includes(introduction) || !allowed.includes(introduction))
  )
    throw new TypeError('A introdução precisa pertencer às configurações permitidas.');
  return {
    difficulty,
    allowedConfigurations: allowed,
    recentSignatures: strings(options.recentSignatures).slice(-24),
    recentFamilies: strings(options.recentFamilies).slice(-24),
    introduction,
  };
}

/** A deterministic finite candidate search. No clock influences its choice. */
export function generateRepasse(seed, options = {}) {
  const input = normalizeGeneratorOptions(options),
    numericSeed = seedNumber(seed),
    rng = randomFor(numericSeed ^ 0x7291c0de);
  const families = Object.keys(CONCEPTS).filter(
    (k) => input.difficulty >= 4 || !['reunite', 'unequal', 'roles', 'linked'].includes(k),
  );
  const eligible = input.introduction
    ? ['receive', 'accumulate', 'destinations', 'shared', 'asymmetry', 'endgame']
    : families;
  const counts = Object.fromEntries(
    eligible.map((f) => [f, input.recentFamilies.filter((x) => x === f).length]),
  );
  const familyOrder = shuffle(rng, eligible).sort((a, b) => counts[a] - counts[b]);
  let best = null,
    bestScore = -Infinity;
  const maxAttempts = 96;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const family = familyOrder[attempt % familyOrder.length],
      candidateSeed = seedNumber(numericSeed + Math.imul(attempt + 1, 0x9e3779b9));
    const expanded = input.allowedConfigurations.filter((k) => k !== 'original');
    const requiredConfigurations = input.introduction
      ? [input.introduction]
      : expanded.length && rng() < 0.58
        ? [pick(rng, expanded)]
        : [];
    if (!input.introduction && input.difficulty >= 5 && expanded.length >= 2 && rng() < 0.35)
      requiredConfigurations.push(
        pick(
          rng,
          expanded.filter((x) => !requiredConfigurations.includes(x)),
        ),
      );
    const candidate = buildCandidate(candidateSeed, {
      difficulty: input.difficulty,
      family,
      requiredConfigurations,
      introduction: input.introduction,
      maxValue: input.difficulty < 2 ? 24 : 99,
      maxInitial: input.difficulty < 2 ? 2 : 3,
      analyze: false,
      randomStructure: attempt % 3 === 0,
    });
    if (!candidate) continue;
    const { level, trace } = candidate,
      signature = level.validation.signature;
    const repeat = input.recentSignatures.includes(signature),
      score =
        (repeat ? -1000 : 0) -
        counts[family] * 14 +
        Math.min(12, trace.interactions) +
        Math.min(6, trace.timedPieces * 2) +
        Math.min(5, trace.maxDepth);
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
    if (
      !repeat &&
      counts[family] === 0 &&
      trace.interactions >= Math.max(1, input.difficulty - 1) &&
      attempt >= 12
    )
      break;
  }
  if (!best) throw new Error('Nenhuma candidata legível foi certificada dentro do orçamento.');
  const level = best.level;
  level.id = `endless-${GENERATOR_VERSION}-${numericSeed}`;
  level.category = 'Modo livre';
  level.stage = DIFFICULTIES[input.difficulty];
  level.chapter = 0;
  level.role = input.introduction ? 'introdução' : 'combinação';
  level.validation.authorshipSeed = level.validation.seed;
  level.validation.seed = numericSeed;
  level.generation = {
    seed: numericSeed,
    generatorVersion: GENERATOR_VERSION,
    options: clone(input),
  };
  const checked = validateLevel(level),
    verified = replay(level, level.solution);
  if (!checked.valid || !verified.valid || !verified.solved)
    throw new Error('A certificação final do desafio falhou.');
  return {
    level,
    seed: numericSeed,
    generatorVersion: GENERATOR_VERSION,
    options: clone(input),
    signature: levelSignature(level),
    family: level.primaryConcept,
    source: 'generated',
    diagnostics: {
      replayed: true,
      maxValue: best.trace.maxValue,
      attemptBudget: maxAttempts,
      recentRepeat: input.recentSignatures.includes(levelSignature(level)),
      difficultyEstimated: true,
    },
  };
}
