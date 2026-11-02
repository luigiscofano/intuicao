// Construção de fases de ÓRBITA com anéis circulares e soluções certificadas.
/** Circle-only authoring v3. Older generators remain available for historical saved definitions. */
import { RULES_VERSION, createEngine, replay } from './engine.mjs';
import { randomFor, invertMoves, shortSolutionSearch, describeReplay } from './generator.mjs';
import { makeCircleTopologyV3 } from './topology-circles-v3.mjs';
import { structuralSignature, structuralMetrics, canonicalEncounterMatrix } from './diversity.mjs';
import { designEvidence } from './design-evidence.mjs';
import { semanticFamilyEvidence } from './authored-patterns.mjs';
export const GENERATOR_VERSION_V3 = 3;
export const EDITORIAL_BANDS = ['Intermediário', 'Avançado', 'Especialista', 'Expert', 'Mestre'];
const SYMBOLS = ['★', '▲', '■', '◆', '✚', '♥'];
const ROLES = [
  'review',
  'combine',
  'variation',
  'compact',
  'combine',
  'deep',
  'variation',
  'combine',
  'review',
  'compact',
  'variation',
  'combine',
  'alternative',
  'combine',
  'deep',
  'variation',
  'compact',
  'combine',
  'review',
  'variation',
  'combine',
  'deep',
  'compact',
  'combine',
  'synthesis',
];
const lessons = {
  encounters:
    'Nesta fase, o jogador precisa perceber que cada encontro permite uma transferência diferente; compare o conteúdo das portas antes de girar.',
  intermediate:
    'Nesta fase, o jogador precisa perceber que um anel intermediário precisa ser preparado antes de receber a peça.',
  restore:
    'Nesta fase, o jogador precisa perceber que uma peça correta pode sair de seu alvo e retornar depois da transferência.',
  step: 'Nesta fase, o jogador precisa perceber que o passo duplo muda a periodicidade; outra órbita permite trocar a classe de posições.',
  gear: 'Nesta fase, o jogador precisa perceber que as duas regiões da engrenagem precisam ser preparadas em conjunto.',
  sensor:
    'Nesta fase, o jogador precisa perceber que o símbolo no sensor libera um comando sem ser movido por ele.',
  localized:
    'Nesta fase, o jogador precisa perceber que uma sequência de ida e volta pode restaurar parte do tabuleiro.',
};
const ranges = [
  [201, 250, 2],
  [251, 375, 3],
  [376, 400, 4],
  [401, 415, 3],
  [416, 450, 4],
  [451, 475, 3],
  [476, 500, 4],
  [501, 520, 3],
  [521, 525, 4],
  [526, 550, 3],
  [551, 575, 4],
  [576, 590, 3],
  [591, 615, 4],
  [616, 650, 5],
  [651, 730, 4],
  [731, 850, 5],
  [851, 900, 2],
  [901, 915, 3],
  [916, 945, 4],
  [946, 1000, 5],
];
export function designForNumberV3(number) {
  if (!Number.isInteger(number) || number < 201 || number > 1000)
    throw new RangeError('Catálogo circular v3: fase 201–1000.');
  const ringCount = ranges.find(([a, b]) => number >= a && number <= b)[2];
  let intersections =
    number <= 250 || (number >= 851 && number <= 900)
      ? 2
      : number <= 400
        ? 3
        : number <= 570
          ? 4
          : number <= 720
            ? 5
            : number <= 850
              ? 6 + (number % 2)
              : number <= 915
                ? 6
                : number <= 970
                  ? 8 + (number % 3)
                  : 11 + (number % 4);
  if (number >= 721 && number <= 735) intersections = 8 + (number % 3);
  const band = number <= 300 ? 0 : number <= 450 ? 1 : number <= 650 ? 2 : number <= 850 ? 3 : 4;
  const chapter = Math.ceil(number / 25),
    role = ROLES[(number - 201) % 25];
  let family = [
    'chain',
    'satellites',
    'circuit',
    'mesh',
    'reserve',
    'triangle',
    'ladder',
    'redundant',
    'bottlenecks',
    'unequal',
  ][(number + chapter) % 10];
  if (ringCount === 2) family = 'lens';
  let mechanic = null;
  if (number >= 301 && (chapter === 13 || number % 11 === 0)) mechanic = 'step';
  if (number >= 351 && (chapter === 15 || number % 13 === 0)) mechanic = 'gear';
  if (number >= 401 && (chapter === 17 || chapter === 18 || number % 17 === 0)) mechanic = 'sensor';
  if (chapter === 12) family = 'triangle';
  if (ringCount >= 3 && intersections >= ringCount && number % 3 !== 0) family = 'circuit';
  if (mechanic === 'gear' && ringCount === 3 && intersections >= 5) mechanic = 'step';
  const mechanics =
    chapter === 33 || number === 1000
      ? ['step', 'gear', 'sensor']
      : number >= 851 && number <= 900
        ? number % 3 === 0
          ? ['step', 'sensor']
          : number % 2 === 0
            ? ['step']
            : ['sensor']
        : mechanic
          ? [mechanic]
          : [];
  if (mechanics.includes('gear'))
    family = ringCount >= 4 && intersections >= ringCount ? 'circuit' : 'chain';
  return {
    number,
    ringCount,
    intersections,
    band,
    difficulty: number <= 300 ? 2 : number <= 650 ? 3 : 4,
    difficultyBand: EDITORIAL_BANDS[band],
    chapter,
    role,
    family,
    mechanic,
    mechanics,
    variant: number - 201,
  };
}
function configure(level, design, goal) {
  level.commands = level.rings.map((r) => ({
    id: r.id,
    label: 'Anel ' + r.id,
    turns: [{ ring: r.id, delta: 1 }],
    requires: [],
  }));
  if (design.mechanics?.includes('step')) {
    const ring = level.rings.find((r) => r.cells.length % 2 === 0) ?? level.rings[0];
    ring.step = 2;
    level.specialRules.push({ kind: 'step', ring: ring.id, text: lessons.step });
  }
  if (design.mechanics?.includes('gear')) {
    let pair;
    for (let i = 0; i < level.rings.length; i++)
      for (let j = i + 1; j < level.rings.length; j++)
        if (!level.rings[i].cells.some((c) => level.rings[j].cells.includes(c)))
          pair = [level.rings[i], level.rings[j]];
    if (pair) {
      const ids = pair.map((r) => r.id);
      level.commands = level.commands.filter((c) => !ids.includes(c.id));
      level.commands.push({
        id: 'G',
        label: 'Anéis ' + ids.join(' + '),
        turns: [
          { ring: ids[0], delta: 1 },
          { ring: ids[1], delta: -1 },
        ],
        requires: [],
      });
      level.specialRules.push({ kind: 'gear', rings: ids, text: lessons.gear });
    }
  }
  if (design.mechanics?.includes('sensor')) {
    const locked = level.commands.find((c) => c.id === 'G') ?? level.commands[0],
      affected = new Set(
        locked.turns.flatMap((t) => level.rings.find((r) => r.id === t.ring).cells),
      );
    const cell = level.cells.find((c) => !affected.has(c.id));
    if (cell) {
      locked.requires = [{ cell: cell.id, type: goal[cell.id] }];
      level.specialRules.push({
        kind: 'sensor',
        command: locked.id,
        cell: cell.id,
        type: goal[cell.id],
        text: lessons.sensor,
      });
    }
  }
}
export function createCandidateV3(seed, design) {
  const rng = randomFor(seed),
    topology = makeCircleTopologyV3({
      ringCount: design.ringCount,
      intersections: design.intersections,
      variant: design.variant,
      family: design.family,
    });
  if (
    Math.max(topology.layout.width, topology.layout.height) >
    (design.role === 'compact' && design.ringCount === 2 ? 1100 : 1800)
  )
    return null;
  const count = 4 + (design.band % 3),
    pieceTypes = [
      { id: 'n', symbol: '·', name: 'Peça neutra' },
      ...SYMBOLS.slice(0, count).map((symbol, i) => ({
        id: String(i + 1),
        symbol,
        name: ['estrela', 'triângulo', 'quadrado', 'losango', 'cruz', 'coração'][i],
      })),
    ];
  // Repeated symbols remain genuinely interchangeable. Targets are fixed throughout.
  const chosen = [...topology.cells];
  for (let i = chosen.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [chosen[i], chosen[j]] = [chosen[j], chosen[i]];
  }
  const targetCount = Math.min(
    chosen.length,
    design.role === 'compact'
      ? 4 + (design.band % 2)
      : 6 + design.band + (design.role === 'deep' ? 2 : 0),
  );
  const goal = Object.fromEntries(topology.cells.map((c) => [c.id, 'n'])),
    targets = {};
  chosen.slice(0, targetCount).forEach((c, i) => {
    targets[c.id] = goal[c.id] = String(1 + (i % count));
  });
  const level = {
    version: 1,
    rulesVersion: RULES_VERSION,
    catalogVersion: 3,
    generatorVersion: 3,
    id: design.number,
    name: 'Órbita · ' + design.number,
    ...topology,
    pieceTypes,
    initial: { ...goal },
    targets,
    commands: [],
    solution: [],
    specialRules: [],
    difficulty: design.difficulty,
    difficultyBand: design.difficultyBand,
    chapter: design.chapter,
    role: design.role,
    seed,
    concepts: [],
    hints: [],
  };
  if (design.mechanics?.includes('step') && !level.rings.some((r) => r.cells.length % 2 === 0))
    return null;
  configure(level, design, goal);
  if (design.mechanics.some((kind) => !level.specialRules.some((rule) => rule.kind === kind)))
    return null;
  const engine = createEngine(level);
  let state = engine.initialState(),
    path = [],
    seen = new Set([engine.key(state)]);
  const targetDepth = design.role === 'compact' ? 8 + design.band : 12 + design.band * 3;
  for (let k = 0; k < targetDepth; k++) {
    let moves = engine.allowedMoves(state).filter((m) => m.command !== path.at(-1)?.command);
    if (!moves.length) moves = engine.allowedMoves(state);
    // Every accepted step changes occupancy and visits a new state; no cancelled loops.
    const offset = Math.floor(rng() * moves.length);
    let accepted = null;
    for (let j = 0; j < moves.length; j++) {
      const move = moves[(j + offset) % moves.length],
        tr = engine.transition(state, move);
      if (tr.positionChanged && !seen.has(engine.key(tr.state))) {
        accepted = { move, tr };
        break;
      }
    }
    if (!accepted) break;
    path.push(accepted.move);
    state = accepted.tr.state;
    seen.add(engine.key(state));
  }
  level.initial = { ...state.occupancy };
  level.solution = invertMoves(path);
  if (path.length < 4 || new Set(path.map((m) => m.command)).size < 2) return null;
  const search = shortSolutionSearch(level, { maxDepth: 3, maxStates: 12000 });
  if (search.found) return null;
  // Exhaust each one-command orbit: a new level cannot be solved by simply
  // turning one ring (or one gear) repeatedly, even beyond the BFS depth.
  const checking = createEngine(level),
    start = checking.initialState();
  for (const command of level.commands) {
    let cursor = start;
    const orbit = new Set([checking.key(cursor)]);
    for (let k = 0; k < 2048; k++) {
      const tr = checking.transition(cursor, { command: command.id, direction: 1 });
      if (!tr.allowed) break;
      if (checking.isWon(tr.state)) return null;
      const key = checking.key(tr.state);
      if (orbit.has(key)) break;
      orbit.add(key);
      cursor = tr.state;
      if (k === 2047) return null;
    }
  }
  const correct = Object.keys(level.targets).filter(
    (id) => level.initial[id] === level.targets[id],
  );
  const forcedFirstDisruptions = Math.min(
    ...checking.allowedMoves(start).map((move) => {
      const next = checking.transition(start, move).state;
      return correct.filter((id) => next.occupancy[id] !== level.targets[id]).length;
    }),
  );
  if (!replay(level, level.solution).solved) return null;
  const trace = describeReplay(level);
  if (trace.transferredPieces === 0) return null;
  if (
    level.specialRules.some((r) => r.kind === 'step') &&
    !path.some((m) =>
      level.commands
        .find((c) => c.id === m.command)
        .turns.some((t) => level.rings.find((r) => r.id === t.ring).step === 2),
    )
  )
    return null;
  if (level.specialRules.some((r) => r.kind === 'gear') && !path.some((m) => m.command === 'G'))
    return null;
  if (
    level.specialRules.some((r) => r.kind === 'sensor') &&
    (trace.sensorChanges === 0 ||
      !path.some((m) => level.commands.find((c) => c.id === m.command).requires.length))
  )
    return null;
  const concept =
    level.specialRules[0]?.kind ??
    (trace.restoredTargets ? 'restore' : trace.intermediateRoutes ? 'intermediate' : 'encounters');
  level.concepts = [
    concept,
    ...(trace.intermediateRoutes ? ['intermediate'] : []),
    ...(trace.restoredTargets ? ['restore'] : []),
  ].filter((x, i, a) => a.indexOf(x) === i);
  level.discovery =
    'Nesta fase, o jogador precisa perceber que repetir apenas um comando não basta: é necessário combinar comandos distintos. ' +
    lessons[concept].replace('Nesta fase, o jogador precisa perceber que', 'Observe como');
  level.hints = [
    lessons[concept].replace('Nesta fase, o jogador precisa perceber que', 'Observe como'),
    'Observe as casas compartilhadas antes de cada giro; as marcas de destino permanecem fixas.',
  ];
  level.authorship = {
    pattern: concept,
    role: design.role,
    solvedArrangement: goal,
    scramble: path,
    requestedFamily: design.family,
    primaryFamily: level.family,
    secondaryFamilies: level.topologyFamilies ?? [],
    difficultyCalibration: 'editorial; not player-tested',
  };
  const metrics = structuralMetrics(level),
    coupledTargets = level.commands.map((command) => ({
      command: command.id,
      count: new Set(
        command.turns
          .flatMap((turn) => level.rings.find((r) => r.id === turn.ring).cells)
          .filter((cell) => level.targets[cell] !== undefined),
      ).size,
    })),
    minimumHouseDistance = Math.min(
      ...level.cells.flatMap((cell, i) =>
        level.cells.slice(i + 1).map((other) => Math.hypot(cell.x - other.x, cell.y - other.y)),
      ),
    ),
    evidence = designEvidence(level, {
      ablation: design.role === 'compact' || design.role === 'deep',
      maxDepth: 3,
      maxStates: 3000,
    });
  level.authorship.evidence = evidence;
  const baseFamily = level.family,
    secondary = [baseFamily];
  const semantic = semanticFamilyEvidence(level);
  evidence.semantic = semantic;
  if (semantic.reserve.witnesses.length) secondary.push('reserve-orbit');
  if (semantic.bottlenecks.multipleBottleneckWitness) secondary.push('multiple-bottlenecks');
  if (
    level.rings.length === 4 &&
    metrics.intersectionMatrix.every((row) => row.filter((n) => n > 0).length === 2)
  ) {
    for (let i = 0; i < 4; i++)
      for (let j = i + 1; j < 4; j++)
        if (!metrics.intersectionMatrix[i][j]) {
          const sides = [level.rings[i].cells.length, level.rings[j].cells.length],
            rungs = level.rings.filter((_, k) => k !== i && k !== j).map((r) => r.cells.length);
          if (Math.min(...sides) >= Math.max(...rungs) + 2) {
            secondary.push('orbital-ladder');
            evidence.ladder = {
              sides: [level.rings[i].id, level.rings[j].id],
              rungs: level.rings.filter((_, k) => k !== i && k !== j).map((r) => r.id),
            };
          }
        }
  }
  if (new Set(level.rings.map((r) => r.cells.length)).size > 1) secondary.push('mixed-lengths');
  const originalCorrect = Object.keys(level.targets).filter(
      (c) => level.initial[c] === level.targets[c],
    ),
    visits = new Map(originalCorrect.map((c) => [c, new Set()]));
  let tokens = Object.fromEntries(level.cells.map((c) => [c.id, c.id])),
    walk = checking.initialState();
  const disrupted = new Set();
  for (const move of level.solution) {
    const tr = checking.transition(walk, move),
      next = { ...tokens };
    for (const movement of tr.movements) {
      const origin = tokens[movement.from];
      visits.get(origin)?.add(movement.ring);
      next[movement.to] = origin;
    }
    for (const c of originalCorrect)
      if (tr.state.occupancy[c] !== level.targets[c]) disrupted.add(c);
    tokens = next;
    walk = tr.state;
  }
  const crossedRestorations = originalCorrect.filter(
    (c) => disrupted.has(c) && visits.get(c).size >= 2 && walk.occupancy[c] === level.targets[c],
  );
  if (crossedRestorations.length) {
    secondary.push('cross-restoration');
    evidence.crossRestoration = {
      initiallyCorrectTargets: crossedRestorations,
      interpretation:
        'target disrupted and restored; its original piece traveled through at least two rings; equivalent pieces may exchange roles',
    };
  }
  if (evidence.permutation.localizedCertificates.length) secondary.push('localized-effect');
  if (metrics.alternativeNetworkCycles > 0) secondary.push('redundant-circuit');
  if (level.specialRules.some((s) => s.kind === 'step')) secondary.push('step-network');
  if (level.specialRules.some((s) => s.kind === 'gear')) secondary.push('separate-gears');
  const sensorRoutes = level.commands.flatMap((command) =>
    (command.requires ?? []).flatMap((sensor) =>
      level.rings
        .filter((r) => r.cells.includes(sensor.cell))
        .flatMap((owner) =>
          command.turns.flatMap((turn) =>
            evidence.routes.pairs.filter(
              (pair) =>
                pair.simpleRingPaths >= 2 &&
                [pair.from, pair.to].includes(owner.id) &&
                [pair.from, pair.to].includes(turn.ring),
            ),
          ),
        ),
    ),
  );
  if (sensorRoutes.length) {
    secondary.push('alternative-sensor');
    evidence.alternativeSensorRoutes = sensorRoutes;
  }
  if (
    design.band === 4 &&
    level.rings.length <= 3 &&
    level.cells.length <= 16 &&
    Object.keys(level.targets).length <= 5 &&
    forcedFirstDisruptions > 0
  )
    secondary.push('master-compact');
  if (design.number === 885 && !secondary.includes('master-compact')) return null;
  level.authorship.secondaryFamilies = secondary.slice(1);
  level.authorship.baseTopologyFamily = baseFamily;
  // The primary alternates among evidenced physical/mechanical families only.
  const primary = secondary[(design.number - 201) % secondary.length];
  level.family = primary;
  level.authorship.primaryFamily = primary;
  level.authorship.secondaryFamilies = secondary.filter((x) => x !== primary);
  level.validation = {
    verified: true,
    method: 'same-engine-replay-and-bounded-trivial-search',
    rulesVersion: RULES_VERSION,
    generatorVersion: 3,
    minimumProven: false,
    minimum: null,
    solutionUpperBound: path.length,
    shortSolutionSearch: {
      visited: search.visited,
      completeDepth: search.completeDepth,
      status: search.status,
    },
    trace,
    topology: structuralSignature(level),
    encounterMatrix: canonicalEncounterMatrix(level),
    complexity: {
      ...metrics,
      observedInitiallyCorrectMoved: trace.correctTargetsMoved,
      observedRestorations: trace.restoredTargets,
      observedJointImprovements: trace.jointImprovements,
      referenceLength: path.length,
      plausibleStructuralRoutes: evidence.routes.totalPortDistinctRoutes,
      referencePermutationSupport: evidence.permutation.supportSize,
      localizedCertificates: evidence.permutation.localizedCertificates.length,
      minimum: null,
      maximumObjectivesCoupledByOneCommand: Math.max(...coupledTargets.map((c) => c.count)),
      coupledTargetsByCommand: coupledTargets,
      necessaryRestorations: null,
      necessityProven: false,
      singleCommandSolutionExcluded: true,
      minimumInitiallyCorrectDisplacedOnFirstMove: forcedFirstDisruptions,
      visualClarity: {
        minimumHouseDistance,
        houseRadius: level.layout.pieceRadius,
        maximumExtent: Math.max(level.layout.width, level.layout.height),
        houseCount: level.cells.length,
        targetCount: Object.keys(level.targets).length,
        requiresContainedScrollAt320: level.layout.width > 320,
        interpretation: 'geometric estimate; not player-calibrated',
      },
    },
  };
  return level;
}
