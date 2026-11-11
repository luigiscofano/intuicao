import {createMovementAttempt,startMovementAttempt,serializeMovementAttempt,movementHistory,observeMovement,finishMovement,newlyFinishedMovementBest} from '../achievements/movement-missions.mjs';
import {recordMissionUnlocks} from '../achievements/mission-store.mjs';
import {solve as proveMinimum} from './analysis.mjs';
import { writeProgress } from '../progress-write-guard.mjs';
// Interface de ÓRBITA: sessões, anéis, animação, dicas, importação e progresso.
import { pickOrbitaRing, commandForOrbitaRing } from './ring-selection.mjs';
import { COMPACT_REPLACEMENT_REPORT } from './compact-catalog.mjs';
import {
  projectOrbita,
  presentationBadges,
  presentationRingLabels,
  compactOrbitaAudit,
  orbitaColor,
} from './presentation-fit.mjs';
import { rulesPreviewMarkup } from '../rules-preview.mjs';
import { validateCircleGeometryV3 } from './topology-circles-v3.mjs';
import { validateGeometryV2 } from './topology-v2.mjs';
import { topologyRecency, isCircularGeneration, ENDLESS_VERSION } from './endless-v2.mjs';
import {
  CAMPAIGN,
  CAMPAIGN_VERSION,
  CAMPAIGN_TIERS,
  campaignTier,
  DIFFICULTIES,
} from './campaign.mjs';
import {
  RULES_VERSION,
  initialState,
  validateLevel,
  validateState,
  transition,
  commandStatus,
  evaluateState,
  isWon,
  stateKey,
  replay,
} from './engine.mjs';
import { hintFromSolution } from './analysis.mjs';
import { createOrbitaService } from './service.mjs';
import { orbitaSymbol, orbitaTypeName, orbitaLesson } from './symbols.mjs';
import { createRestartConfirmation } from '../restart-confirmation.mjs';
import { createResultMotion } from '../result-motion.mjs';
import { dailyIndex, recordEvent } from '../collection-state.mjs';

export const ORBITA_STORAGE_KEY = 'intuicao.orbita.v1';
const clone = (value) => structuredClone(value);
const esc = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );
const bounded = (value, min, max, fallback = min) =>
  Number.isSafeInteger(value) && value >= min && value <= max ? value : fallback;
const record = (value) => value && typeof value === 'object' && !Array.isArray(value);
const savedTopologyHistory = (level) => {
  try {
    return [topologyRecency(level)];
  } catch {
    return [];
  }
};
const short = (value) => String(value).padStart(2, '0');
const mod = (value, size) => ((value % size) + size) % size;
const TAU = Math.PI * 2;
const BASE_RULES =
  'Gire os anéis para levar cada peça ao destino que mostra o mesmo símbolo: estrela com estrela, triângulo com triângulo, e assim por diante. Todas as peças do anel escolhido se movem juntas. Nas casas compartilhadas, uma peça pode passar de um anel para outro. Peças que já estão corretas continuam podendo se mover. Complete todos os alvos ao mesmo tempo.';
const MECHANICS = {
  step: [
    'Dois passos em um giro',
    'O anel marcado com passo 2 avança duas casas de uma vez. O sentido contrário desfaz o mesmo percurso.',
  ],
  gear: [
    'Anéis ligados',
    'Este comando gira os anéis indicados ao mesmo tempo. Veja as setas junto de cada letra: um pode avançar enquanto o outro recua.',
  ],
  sensor: [
    'Uma peça libera o giro',
    'A casa marcada com um sensor precisa conter o símbolo indicado para liberar o comando. Prepare essa casa usando outro anel.',
  ],
};
const TUTORIAL = [
  'Escolha o anel e toque na seta curva. Um giro leva cada peça à próxima casa.',
  'As duas setas fazem caminhos opostos. Compare onde a peça chegaria em cada sentido.',
  'O alvo fica fixo. Todas as peças giram juntas, inclusive a peça neutra: ela ocupa uma casa e não é um vazio.',
  'Agora há dois anéis. A casa compartilhada é uma única casa física; o outro anel pode levar sua peça adiante.',
  'O símbolo pequeno é o alvo: ele fica na casa enquanto as peças circulam.',
  'A casa com dois contornos pertence aos dois anéis. Leve a peça até ela.',
  'Quando uma peça chega ao encontro, o outro anel pode levá-la adiante.',
  'Prepare o anel que vai receber a peça antes de fazer a transferência.',
  'Uma peça correta pode precisar sair do lugar por um momento. Você pode trazê-la de volta.',
  'Prepare a chegada, transfira a peça e restaure o acerto que precisou sair do lugar.',
];
const definitionKey = (level) =>
  JSON.stringify([
    level.version,
    level.rulesVersion,
    level.cells.map((cell) => cell.id),
    level.rings.map((ring) => [ring.id, ring.cells, ring.step]),
    level.pieceTypes,
    level.initial,
    level.targets,
    level.commands,
  ]);
const geometryKey = (level) =>
  JSON.stringify([level.cells, level.rings.map((ring) => [ring.id, ring.geometry]), level.layout]);
const mechanics = (level) => [
  ...(level.rings.some((ring) => (ring.step ?? 1) > 1) ? ['step'] : []),
  ...(level.commands.some((command) => command.turns.length > 1) ? ['gear'] : []),
  ...(level.commands.some((command) => command.requires?.length) ? ['sensor'] : []),
];

export function freshOrbitaData() {
  return {
    version: 3,
    catalogVersion: CAMPAIGN_VERSION,
    rulesVersion: RULES_VERSION,
    prefs: { advanced: false, autoAdvance: true },
    campaign: { lastId: null, completed: {}, sessions: {} },
    endless: null,
    legacyCampaignArchive: [],
    campaignMigrationNotice: '',
    legacyEndlessArchive: [],
    custom: null,
    learnedMechanics: [],
    events: [],
    lastView: { active: false, screen: 'selection', mode: 'campaign', daily: false },
  };
}
export function normalizeOrbitaData(value) {
  const data = freshOrbitaData();
  if (!record(value)) return data;
  if (record(value.prefs))
    for (const key of Object.keys(data.prefs))
      if (typeof value.prefs[key] === 'boolean') data.prefs[key] = value.prefs[key];
  if (record(value.campaign)) {
    const validIDs = new Set(CAMPAIGN.map((level) => level.id));
    if (value.catalogVersion === 'orbita-campaign-80-v1')
      for (const item of COMPACT_REPLACEMENT_REPORT) validIDs.add(item.oldId);
    data.campaign.lastId =
      Number.isInteger(value.campaign.lastId) && validIDs.has(value.campaign.lastId)
        ? value.campaign.lastId
        : null;
    for (const key of ['completed', 'sessions'])
      if (record(value.campaign[key]))
        data.campaign[key] = Object.fromEntries(
          Object.entries(value.campaign[key]).filter(
            ([id, item]) => /^[1-9][0-9]*$/.test(id) && validIDs.has(Number(id)) && record(item),
          ),
        );
  }
  data.legacyCampaignArchive = Array.isArray(value.legacyCampaignArchive)
    ? value.legacyCampaignArchive.filter(record)
    : [];
  data.campaignMigrationNotice =
    typeof value.campaignMigrationNotice === 'string' ? value.campaignMigrationNotice : '';
  if (value.catalogVersion === 'orbita-campaign-80-v1' && record(value.campaign)) {
    const changed = new Set(COMPACT_REPLACEMENT_REPORT.map((item) => String(item.oldId))),
      archived = {
        lastId: changed.has(String(value.campaign.lastId)) ? value.campaign.lastId : null,
        completed: {},
        sessions: {},
      };
    for (const key of ['completed', 'sessions'])
      for (const id of changed)
        if (record(data.campaign[key][id])) {
          archived[key][id] = clone(data.campaign[key][id]);
          delete data.campaign[key][id];
        }
    if (changed.has(String(data.campaign.lastId))) data.campaign.lastId = null;
    data.legacyCampaignArchive.push({
      catalogVersion: value.catalogVersion,
      campaign: archived,
      reason: 'compact-eight-layouts',
    });
    data.campaignMigrationNotice =
      'Oito fases ganharam tabuleiros compactos. As tentativas dessas fases foram arquivadas; seu progresso nas outras 72 foi preservado.';
  } else if (value.catalogVersion !== CAMPAIGN_VERSION && record(value.campaign)) {
    // Never assign an old completion/history to a recomposed level on ID alone.
    const previous = clone(value.campaign),
      kept = { lastId: null, completed: {}, sessions: {} };
    for (const candidate of CAMPAIGN) {
      const saved = previous.sessions?.[candidate.id];
      if (
        !record(saved) ||
        saved.definition !== definitionKey(candidate) ||
        saved.levelVersion !== candidate.version ||
        saved.geometryDefinition !== geometryKey(candidate)
      )
        continue;
      if (!restoreOrbitaSession(candidate, saved).restored) continue;
      kept.sessions[candidate.id] = saved;
      if (record(previous.completed?.[candidate.id]))
        kept.completed[candidate.id] = previous.completed[candidate.id];
      if (previous.lastId === candidate.id) kept.lastId = candidate.id;
    }
    data.legacyCampaignArchive.push({
      catalogVersion: value.catalogVersion ?? 'legacy-unknown',
      campaign: previous,
      events: clone(Array.isArray(value.events) ? value.events : []),
      reason: 'editorial-recomposition-80',
    });
    data.campaign = kept;
    data.campaignMigrationNotice =
      'A campanha foi reorganizada em 80 níveis. As tentativas e conclusões anteriores foram arquivadas; somente definições idênticas com histórico verificável foram retomadas.';
  }
  if (record(value.endless)) {
    const run = value.endless;
    data.endless = {
      version: 3,
      baseSeed: bounded(run.baseSeed, 0, 0xffffffff),
      startDifficulty: bounded(run.startDifficulty, 0, 4),
      number: bounded(run.number, 0, Number.MAX_SAFE_INTEGER),
      solved: bounded(run.solved, 0, Number.MAX_SAFE_INTEGER),
      recentSignatures: Array.isArray(run.recentSignatures)
        ? run.recentSignatures.filter((x) => typeof x === 'string').slice(-30)
        : [],
      recentFamilies: Array.isArray(run.recentFamilies)
        ? run.recentFamilies.filter((x) => typeof x === 'string').slice(-30)
        : [],
      recentTopologies: Array.isArray(run.recentTopologies)
        ? run.recentTopologies.filter(record).slice(-30)
        : savedTopologyHistory(run.current?.level),
      current: record(run.current) ? run.current : null,
    };
  }
  data.legacyEndlessArchive = Array.isArray(value.legacyEndlessArchive)
    ? value.legacyEndlessArchive.filter(record)
    : [];
  if (record(value.custom)) data.custom = value.custom;
  data.learnedMechanics = Array.isArray(value.learnedMechanics)
    ? [...new Set(value.learnedMechanics.filter((key) => key in MECHANICS))]
    : [];
  data.events = Array.isArray(value.events) ? value.events.filter(record).slice(-500) : [];
  if (record(value.lastView))
    data.lastView = {
      active: value.lastView.active === true,
      screen: value.lastView.screen === 'play' ? 'play' : 'selection',
      mode: ['campaign', 'endless', 'custom'].includes(value.lastView.mode)
        ? value.lastView.mode
        : 'campaign',
      daily: value.lastView.daily === true,
    };
  return data;
}
export const CIRCULAR_RECOVERY_NOTICE =
  'A tentativa antiga usava percursos não circulares e foi arquivada com sua seed e histórico. Este desafio circular usa uma nova seed; suas conclusões e seu progresso foram preservados.';
export function circularRecoverySeed(seed) {
  return (bounded(seed, 0, 0xffffffff) ^ 0x6f726233) >>> 0;
}
/** Commit only after the replacement is certified; retain the complete original snapshot. */
export function recoverOrbitaEndless(data, result, parameters = {}) {
  const run = data.endless,
    old = run?.current;
  if (!old?.level || (isCircularGeneration(old.level) && compactOrbitaAudit(old.level).valid))
    throw Error('Não há uma tentativa antiga para recuperar.');
  if (
    result?.generatorVersion !== ENDLESS_VERSION ||
    !isCircularGeneration(result?.level) ||
    !compactOrbitaAudit(result.level).valid ||
    result.seed !== circularRecoverySeed(old.seed) ||
    result.level.seed !== result.seed ||
    result.level.generation?.version !== 3 ||
    !validateLevel(result.level).valid ||
    isWon(result.level, initialState(result.level)) ||
    !replay(result.level, result.level.solution).solved
  )
    throw Error('A recuperação circular não passou pela verificação.');
  const compact = isCircularGeneration(old.level);
  const recovery = {
    reason: compact ? 'compact-layout-v1' : 'circle-only-v3',
    originalSeed: old.seed,
    replacementSeed: result.seed,
    originalGeneratorVersion: old.generatorVersion,
    originalLevelId: old.level.id,
    notice: compact
      ? 'Sua tentativa anterior foi arquivada com a seed e o histórico porque o tabuleiro era denso demais para o celular. O novo desafio compacto preserva seu total de conclusões.'
      : CIRCULAR_RECOVERY_NOTICE,
  };
  data.legacyEndlessArchive = [
    ...(data.legacyEndlessArchive ?? []),
    {
      current: clone(old),
      recovery: clone(recovery),
      runHistory: {
        baseSeed: run.baseSeed,
        startDifficulty: run.startDifficulty,
        number: run.number,
        solved: run.solved,
        recentSignatures: clone(run.recentSignatures ?? []),
        recentFamilies: clone(run.recentFamilies ?? []),
        recentTopologies: clone(run.recentTopologies ?? []),
      },
    },
  ];
  run.current = {
    level: clone(result.level),
    seed: result.seed,
    parameters: clone(parameters),
    signature: result.signature,
    generatorVersion: result.generatorVersion,
    rulesVersion: RULES_VERSION,
    session: null,
    completed: false,
    recovery,
  };
  run.recentSignatures = [...(run.recentSignatures ?? []), result.signature].slice(-30);
  run.recentFamilies = [...(run.recentFamilies ?? []), result.level.family].slice(-30);
  run.recentTopologies = [
    ...(run.recentTopologies ?? []),
    result.topology ?? topologyRecency(result.level),
  ].slice(-30);
  return recovery;
}
export function restoreOrbitaSession(level, saved) {
  const empty = (issue) => ({
    commands: [],
    cursor: 0,
    states: [initialState(level)],
    assisted: false,
    failures: 0,
    winRecorded: false,
    restored: false,
    restoreIssue: issue ?? '',
  });
  if (!saved) return empty();
  const incompatible = () =>
    empty(
      'A tentativa salva não corresponde a esta fase. As fases concluídas continuam guardadas.',
    );
  if (
    !record(saved) ||
    (level.catalogVersion >= 3 && saved.catalogVersion !== level.catalogVersion) ||
    saved.rulesVersion !== RULES_VERSION ||
    saved.levelVersion !== level.version ||
    saved.levelId !== level.id ||
    saved.definition !== definitionKey(level) ||
    (saved.geometryDefinition !== undefined && saved.geometryDefinition !== geometryKey(level)) ||
    !Array.isArray(saved.commands) ||
    saved.commands.length > 5000 ||
    !Number.isInteger(saved.cursor) ||
    saved.cursor < 0 ||
    saved.cursor > saved.commands.length
  )
    return incompatible();
  try {
    const session = empty();
    let state = session.states[0];
    for (const command of saved.commands) {
      const next = transition(level, state, command);
      if (!next.allowed) return incompatible();
      state = next.state;
      session.states.push(state);
    }
    if (
      !validateState(level, saved.state).valid ||
      stateKey(session.states[saved.cursor]) !== stateKey(saved.state) ||
      session.states[saved.cursor].moves !== saved.state.moves
    )
      return incompatible();
    return {
      ...session,
      commands: clone(saved.commands),
      cursor: saved.cursor,
      assisted: saved.assisted === true,
      failures: bounded(saved.failures, 0, Number.MAX_SAFE_INTEGER),
      winRecorded: saved.winRecorded === true,
      restored: true,
    };
  } catch {
    return incompatible();
  }
}
export function serializeOrbitaSession(level, session) {
  return {
    catalogVersion: level.catalogVersion ?? null,
    rulesVersion: RULES_VERSION,
    levelVersion: level.version,
    levelId: level.id,
    definition: definitionKey(level),
    geometryDefinition: geometryKey(level),
    commands: clone(session.commands),
    cursor: session.cursor,
    state: clone(session.states[session.cursor]),
    assisted: session.assisted,
    failures: session.failures,
    winRecorded: session.winRecorded,
  };
}
export function commitOrbitaCommand(level, session, command) {
  const next = transition(level, session.states[session.cursor], command);
  if (!next.allowed) return { session, transition: next };
  return {
    session: {
      ...session,
      commands: [...session.commands.slice(0, session.cursor), clone(command)],
      states: [...session.states.slice(0, session.cursor + 1), next.state],
      cursor: session.cursor + 1,
      restoreIssue: '',
    },
    transition: next,
  };
}
export function recordOrbitaCompletion(data, level, session, mode, now = new Date().toISOString()) {
  if (!isWon(level, session.states[session.cursor])) return false;
  let recorded = session.winRecorded;
  if (mode === 'campaign') {
    const previous = data.campaign.completed[level.id];
    recorded = recorded || !!previous;
    data.campaign.completed[level.id] = {
      ...(Number.isSafeInteger(previous?.humanBestMoves) && previous.humanBestMoves > 0
        ? { humanBestMoves: previous.humanBestMoves } : {}),
      firstCompletedAt: previous?.firstCompletedAt ?? now,
      assisted: previous ? previous.assisted === true && session.assisted : session.assisted,
    };
  }
  if (mode === 'endless' && data.endless?.current?.level?.id === level.id) {
    recorded = recorded || data.endless.current.completed === true;
    data.endless.current.completed = true;
  }
  session.winRecorded = true;
  if (recorded) return false;
  if (mode === 'endless' && data.endless)
    data.endless.solved = Math.min(
      Number.MAX_SAFE_INTEGER,
      bounded(data.endless.solved, 0, Number.MAX_SAFE_INTEGER) + 1,
    );
  return true;
}
export function endlessOptions(
  startDifficulty,
  solved,
  recentSignatures = [],
  recentFamilies = [],
  recentTopologies = [],
) {
  const wins = bounded(solved, 0, Number.MAX_SAFE_INTEGER),
    base = bounded(startDifficulty, 0, 4),
    rising = Math.min(4, base + Math.floor(wins / 10));
  return {
    difficulty: Math.max(0, rising - (wins > 0 && wins % 6 === 5 ? 1 : 0)),
    recentSignatures: recentSignatures.filter((x) => typeof x === 'string').slice(-30),
    recentFamilies: recentFamilies.filter((x) => typeof x === 'string').slice(-30),
    recentTopologies: recentTopologies.filter(record).slice(-30),
  };
}

/** Fixed targets and collision-aware sensor labels share one layout for rendering and QA. */
export function computeOrbitaBadgeLayout(level) {
  const errors = [],
    targets = [],
    sensors = [],
    width = level?.layout?.width,
    height = level?.layout?.height,
    radius = level?.layout?.pieceRadius ?? 19;
  if (
    !Array.isArray(level?.cells) ||
    ![width, height, radius].every(Number.isFinite) ||
    width <= 0 ||
    height <= 0 ||
    radius <= 0 ||
    level.cells.some((cell) => !Number.isFinite(cell?.x) || !Number.isFinite(cell?.y))
  )
    return {
      valid: false,
      errors: ['Não foi possível posicionar os marcadores sem um desenho válido.'],
      targets,
      sensors,
    };
  const rectangle = (cell, cx, cy, w, h) => ({
    cell,
    x: cx - w / 2,
    y: cy - h / 2,
    width: w,
    height: h,
    cx,
    cy,
  });
  const inside = (rect) =>
    rect.x >= 2 &&
    rect.y >= 2 &&
    rect.x + rect.width <= width - 2 &&
    rect.y + rect.height <= height - 2;
  const overlap = (a, b, gap = 3) =>
    a.x < b.x + b.width + gap &&
    a.x + a.width + gap > b.x &&
    a.y < b.y + b.height + gap &&
    a.y + a.height + gap > b.y;
  const overlapsHouse = (rect, padding = 10) =>
    level.cells.some((cell) => {
      const x = Math.max(rect.x, Math.min(cell.x, rect.x + rect.width)),
        y = Math.max(rect.y, Math.min(cell.y, rect.y + rect.height));
      return Math.hypot(x - cell.x, y - cell.y) < radius + padding;
    });
  for (const cell of level.cells)
    if (record(level.targets) && Object.prototype.hasOwnProperty.call(level.targets, cell.id)) {
      const badge = rectangle(cell.id, cell.x, cell.y + radius + 13, 36, 20);
      targets.push(badge);
      if (!inside(badge)) errors.push('Um alvo ficaria cortado na borda do tabuleiro.');
    }
  if (
    targets.some(
      (target, i) =>
        overlapsHouse(target, 2) || targets.slice(i + 1).some((other) => overlap(target, other)),
    )
  )
    errors.push('Os alvos precisam de espaço livre, sem cobrir outras fichas ou alvos.');
  const byCell = new Map();
  for (const command of Array.isArray(level.commands) ? level.commands : [])
    for (const condition of Array.isArray(command.requires) ? command.requires : []) {
      if (!byCell.has(condition.cell)) byCell.set(condition.cell, new Set());
      byCell.get(condition.cell).add(condition.type);
    }
  for (const cell of level.cells) {
    if (!byCell.has(cell.id)) continue;
    const types = [...byCell.get(cell.id)],
      label =
        level.cells.indexOf(cell) +
        1 +
        ' · ' +
        types.map((type) => orbitaSymbol(level, type)).join('/'),
      w = Math.max(42, [...label].length * 7 + 10),
      h = 20;
    const vertical = radius + 21,
      horizontal = radius + 10 + w / 2 + 3;
    const offsets = [
      [0, -vertical],
      [horizontal, 0],
      [-horizontal, 0],
      [horizontal, -vertical],
      [-horizontal, -vertical],
      [0, radius + 37],
      [horizontal, vertical],
      [-horizontal, vertical],
    ];
    for (const distance of [70, 92, 118, 148])
      for (const [x, y] of [
        [0, -1],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0.707, -0.707],
        [-0.707, -0.707],
        [0.707, 0.707],
        [-0.707, 0.707],
      ])
        offsets.push([x * distance, y * distance]);
    let chosen = null;
    for (const [dx, dy] of offsets) {
      const candidate = rectangle(cell.id, cell.x + dx, cell.y + dy, w, h);
      if (
        !inside(candidate) ||
        overlapsHouse(candidate) ||
        targets.some((target) => overlap(candidate, target)) ||
        sensors.some((sensor) => overlap(candidate, sensor))
      )
        continue;
      chosen = {
        ...candidate,
        types,
        label,
        anchorX: cell.x,
        anchorY: cell.y,
        offset: { x: dx, y: dy },
      };
      break;
    }
    if (!chosen) {
      errors.push(
        'Um sensor não tem espaço livre para ser mostrado. Afaste as casas ou amplie o tabuleiro.',
      );
      continue;
    }
    const length = Math.hypot(chosen.offset.x, chosen.offset.y),
      ux = chosen.offset.x / length,
      uy = chosen.offset.y / length;
    const edge = Math.min(
      Math.abs(ux) < 1e-9 ? Infinity : w / 2 / Math.abs(ux),
      Math.abs(uy) < 1e-9 ? Infinity : h / 2 / Math.abs(uy),
    );
    chosen.connector = {
      x1: cell.x + ux * (radius + 9),
      y1: cell.y + uy * (radius + 9),
      x2: chosen.cx - ux * edge,
      y2: chosen.cy - uy * edge,
    };
    sensors.push(chosen);
  }
  return { valid: errors.length === 0, errors: [...new Set(errors)], targets, sensors };
}

/** Presentation checks are deliberately separate from the coordinate-free engine. */
export function validateOrbitaPresentation(level) {
  const errors = [];
  if (!record(level) || !Array.isArray(level.cells) || !Array.isArray(level.rings))
    return { valid: false, errors: ['A fase precisa definir as casas e o desenho dos anéis.'] };
  if (
    level.rings.some(
      (r) =>
        r?.path !== undefined ||
        r?.geometry?.type !== 'circle' ||
        !Number.isFinite(r.geometry.r) ||
        Math.abs((r.geometry.rx ?? r.geometry.r) - r.geometry.r) > 1e-7 ||
        Math.abs((r.geometry.ry ?? r.geometry.r) - r.geometry.r) > 1e-7,
    )
  )
    return {
      valid: false,
      errors: [
        'Esta versão do ÓRBITA aceita apenas anéis circulares. A definição antiga foi preservada, mas não pode ser exibida como um novo desafio.',
      ],
    };
  const layout = level.layout,
    width = layout?.width,
    height = layout?.height,
    radius = layout?.pieceRadius ?? 19;
  if (
    !record(layout) ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width < 100 ||
    height < 100 ||
    width > 16384 ||
    height > 16384
  )
    errors.push('O desenho precisa ter largura e altura válidas, entre 100 e 16384.');
  if (!Number.isFinite(radius) || radius < 14 || radius > 28)
    errors.push('O tamanho das fichas precisa estar entre 14 e 28.');
  const cells = new Map();
  for (const cell of level.cells) {
    if (!record(cell) || !Number.isFinite(cell.x) || !Number.isFinite(cell.y)) {
      errors.push('Todas as casas precisam ter coordenadas numéricas finitas.');
      continue;
    }
    cells.set(cell.id, cell);
    if (
      cell.x < radius + 8 ||
      cell.y < radius + 8 ||
      cell.x > width - radius - 8 ||
      cell.y > height - radius - 8
    )
      errors.push('Uma casa está fora da área visível do tabuleiro.');
    if (
      record(level.targets) &&
      Object.prototype.hasOwnProperty.call(level.targets, cell.id) &&
      cell.y + radius + 23 > height
    )
      errors.push('Um alvo ficaria cortado na borda do tabuleiro.');
  }
  for (const ring of level.rings) {
    if (!record(ring) || !Array.isArray(ring.cells) || ring.cells.some((id) => !cells.has(id))) {
      errors.push('Um anel referencia casas sem posição válida.');
      continue;
    }
    if (
      ring.labelPosition !== undefined &&
      (!record(ring.labelPosition) ||
        ![ring.labelPosition.x, ring.labelPosition.y].every(Number.isFinite) ||
        ring.labelPosition.x < 13 ||
        ring.labelPosition.y < 13 ||
        ring.labelPosition.x > width - 13 ||
        ring.labelPosition.y > height - 13)
    )
      errors.push('A identificação do anel precisa ter uma posição finita dentro do tabuleiro.');
    const g = ring.geometry;
    if (g === undefined) continue;
    const rx = g?.rx ?? g?.r,
      ry = g?.ry ?? g?.r;
    if (!record(g) || ![g.cx, g.cy, rx, ry].every(Number.isFinite) || rx <= 0 || ry <= 0) {
      errors.push('O centro e os raios de cada anel precisam ser números finitos positivos.');
      continue;
    }
    if (g.cx - rx < 0 || g.cy - ry < 0 || g.cx + rx > width || g.cy + ry > height)
      errors.push('Um trilho fica fora da área visível do tabuleiro.');
    const points = ring.cells.map((id) => cells.get(id));
    if (
      points.some(
        (cell) => Math.abs(((cell.x - g.cx) / rx) ** 2 + ((cell.y - g.cy) / ry) ** 2 - 1) > 0.005,
      )
    )
      errors.push('As casas de um anel precisam estar sobre o seu trilho.');
    const angles = points.map((cell) => Math.atan2((cell.y - g.cy) / ry, (cell.x - g.cx) / rx));
    const turn = angles.reduce(
      (sum, angle, index) => sum + mod(angles[(index + 1) % angles.length] - angle, TAU),
      0,
    );
    if (Math.abs(turn - TAU) > 0.001)
      errors.push('A ordem das casas precisa acompanhar uma volta horária no desenho.');
  }
  if (!errors.length) errors.push(...validateCircleGeometryV3(level).errors);
  else if (level.rings.every((ring) => !ring.geometry) && !errors.length)
    errors.push(...validateGeometryV2(level).errors);
  if (
    Array.isArray(level.pieceTypes) &&
    level.pieceTypes.some((type) => typeof type?.symbol !== 'string' || [...type.symbol].length > 3)
  )
    errors.push('Use símbolos curtos, de até três caracteres, para que caibam nas fichas.');
  if (!errors.length) errors.push(...computeOrbitaBadgeLayout(level).errors);
  return { valid: errors.length === 0, errors: [...new Set(errors)] };
}

// Geometry is presentation only. The engine reads ordered cell IDs, never these paths.
export function ringPath(level, ring) {
  const g = ring.geometry;
  if (
    g &&
    Number.isFinite(g.cx) &&
    Number.isFinite(g.cy) &&
    Number.isFinite(g.rx ?? g.r) &&
    Number.isFinite(g.ry ?? g.r)
  ) {
    const rx = g.rx ?? g.r,
      ry = g.ry ?? g.r;
    return `M ${g.cx + rx} ${g.cy} A ${rx} ${ry} 0 1 1 ${g.cx - rx} ${g.cy} A ${rx} ${ry} 0 1 1 ${g.cx + rx} ${g.cy}`;
  }
  const points = ring.path ?? ring.cells.map((id) => level.cells.find((cell) => cell.id === id));
  return points.map((point, i) => (i ? 'L ' : 'M ') + point.x + ' ' + point.y).join(' ') + ' Z';
}
export function movementPoint(level, movement, progress) {
  const ring = level.rings.find((item) => item.id === movement.ring),
    cells = ring.cells.map((id) => level.cells.find((cell) => cell.id === id)),
    start = ring.cells.indexOf(movement.from),
    steps = Math.abs(movement.steps ?? 1),
    direction = movement.direction < 0 ? -1 : 1;
  if (progress >= 1) {
    const target = level.cells.find((cell) => cell.id === movement.to);
    return { x: target.x, y: target.y };
  }
  const position = Math.max(0, progress) * steps,
    segment = Math.min(steps - 1, Math.floor(position)),
    portion = position - segment;
  const a = cells[mod(start + direction * segment, cells.length)],
    b = cells[mod(start + direction * (segment + 1), cells.length)],
    g = ring.geometry;
  if (ring.path) {
    const path = ring.path,
      from = path.findIndex((p) => p.cell === a.id),
      to = path.findIndex((p) => p.cell === b.id),
      segments = [];
    let cursor = from,
      total = 0;
    if (from < 0 || to < 0)
      return { x: a.x + (b.x - a.x) * portion, y: a.y + (b.y - a.y) * portion };
    do {
      const next = mod(cursor + direction, path.length),
        p = path[cursor],
        q = path[next],
        length = Math.hypot(q.x - p.x, q.y - p.y);
      segments.push({ p, q, length });
      total += length;
      cursor = next;
    } while (cursor !== to && segments.length <= path.length);
    let remaining = portion * total;
    for (const { p, q, length } of segments) {
      if (remaining <= length) {
        const t = length ? remaining / length : 0;
        return { x: p.x + (q.x - p.x) * t, y: p.y + (q.y - p.y) * t };
      }
      remaining -= length;
    }
    return { x: b.x, y: b.y };
  }
  if (g && Number.isFinite(g.cx) && Number.isFinite(g.cy)) {
    const rx = g.rx ?? g.r,
      ry = g.ry ?? g.r,
      angle = Math.atan2((a.y - g.cy) / ry, (a.x - g.cx) / rx),
      end = Math.atan2((b.y - g.cy) / ry, (b.x - g.cx) / rx);
    let distance = mod((end - angle) * direction, TAU);
    if (distance < 1e-8) distance = TAU;
    const theta = angle + direction * distance * portion;
    return { x: g.cx + rx * Math.cos(theta), y: g.cy + ry * Math.sin(theta) };
  }
  return { x: a.x + (b.x - a.x) * portion, y: a.y + (b.y - a.y) * portion };
}

export function ringLabelPosition(level, ring) {
  const g = ring.geometry;
  if (!g) {
    if (ring.labelPosition) return ring.labelPosition;
    const points = ring.cells.map((id) => level.cells.find((cell) => cell.id === id));
    return {
      x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
      y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
    };
  }
  const angles = ring.cells
    .map((id) => {
      const cell = level.cells.find((item) => item.id === id);
      return mod(Math.atan2(cell.y - g.cy, cell.x - g.cx), TAU);
    })
    .sort((a, b) => a - b);
  let best = { gap: -1, angle: 0 };
  for (let i = 0; i < angles.length; i++) {
    const gap = mod(angles[(i + 1) % angles.length] - angles[i], TAU);
    if (gap > best.gap) best = { gap, angle: angles[i] + gap / 2 };
  }
  return {
    x: g.cx + Math.cos(best.angle) * Math.max(15, (g.rx ?? g.r) - 38),
    y: g.cy + Math.sin(best.angle) * Math.max(15, (g.ry ?? g.r) - 38),
  };
}

/** Pure SVG presentation used by the interactive board and visual regression checks. */
export function renderOrbitaBoardMarkup(
  canonical,
  displayState,
  command,
  width = 600,
  heightBudget,
) {
  const projection = projectOrbita(canonical, width, heightBudget),
    level = projection.level,
    radius = 13;
  const symbol = (type) => orbitaSymbol(level, type),
    active = new Set(command.turns.map((t) => t.ring));
  const badges = presentationBadges(level),
    targetMap = new Map(badges.targets.map((b) => [b.cell, b]));
  const paths = level.rings
    .map(
      (r) =>
        '<g class="o-rail-group"><path class="o-rail-base" d="' +
        ringPath(level, r) +
        '"/><path class="o-rail ' +
        (active.has(r.id) ? 'o-active-rail' : '') +
        '" data-o-ring="' +
        esc(r.id) +
        '" d="' +
        ringPath(level, r) +
        '"/><path class="o-rail-hit" data-o-rail-hit="' +
        esc(r.id) +
        '" d="' +
        ringPath(level, r) +
        '"><title>Selecionar anel ' +
        esc(r.id) +
        '</title></path></g>',
    )
    .join('');
  const ringLabels = presentationRingLabels(level, badges);
  const labels = level.rings
    .map((r) => {
      const p = ringLabels.find((label) => label.id === r.id);
      return (
        '<g class="o-ring-tag ' +
        (active.has(r.id) ? 'o-selected-tag' : '') +
        '" transform="translate(' +
        p.x +
        ' ' +
        p.y +
        ')" data-o-select-label="' +
        esc(r.id) +
        '" role="button" tabindex="0" aria-label="Selecionar anel ' +
        esc(r.id) +
        '" aria-pressed="' +
        active.has(r.id) +
        '"><circle class="o-label-hit" r="18"/><circle r="11"/><text text-anchor="middle" dominant-baseline="central">' +
        esc(r.id) +
        '</text></g>'
      );
    })
    .join('');
  const connector = (b) =>
    '<path class="o-badge-connector" d="M' +
    b.connector.x1 +
    ' ' +
    b.connector.y1 +
    'L' +
    b.connector.x2 +
    ' ' +
    b.connector.y2 +
    '"/>';
  const cells = level.cells
    .map((c, i) => {
      const membership = level.rings.filter((r) => r.cells.includes(c.id)),
        target = level.targets[c.id],
        matched = target !== undefined && displayState.occupancy[c.id] === target,
        b = targetMap.get(c.id);
      return (
        '<g class="o-fixed-cell ' +
        (membership.length > 1 ? 'o-junction ' : '') +
        (matched ? 'o-matched' : '') +
        '" data-o-cell="' +
        esc(c.id) +
        '" role="img" aria-label="Casa ' +
        (i + 1) +
        (target !== undefined
          ? ', alvo ' +
            esc(orbitaTypeName(level, target)) +
            (matched ? ', completo' : ', incompleto')
          : ', sem alvo') +
        '"><circle class="o-house" cx="' +
        c.x +
        '" cy="' +
        c.y +
        '" r="14"/>' +
        (membership.length > 1
          ? '<circle class="o-shared-house" cx="' + c.x + '" cy="' + c.y + '" r="14"/>'
          : '') +
        (b
          ? connector(b) +
            '<g class="o-target" data-o-target="' +
            esc(c.id) +
            '" style="--o-piece-color:' +
            orbitaColor(level, target) +
            '" transform="translate(' +
            b.cx +
            ' ' +
            b.cy +
            ')"><rect x="-11" y="-9" width="22" height="18" rx="4"/><text text-anchor="middle" dominant-baseline="central">' +
            esc(symbol(target)) +
            '</text></g>'
          : '') +
        '</g>'
      );
    })
    .join('');
  const sensors = badges.sensors
    .map(
      (b) =>
        connector(b) +
        '<g class="o-sensor ' +
        (b.types.includes(displayState.occupancy[b.cell]) ? 'o-sensor-ready' : '') +
        '" data-o-sensor="' +
        esc(b.cell) +
        '" transform="translate(' +
        b.cx +
        ' ' +
        b.cy +
        ')"><rect x="-12" y="-9" width="24" height="18" rx="4"/><text text-anchor="middle" dominant-baseline="central">' +
        b.label +
        '</text></g>',
    )
    .join('');
  const pieces = level.cells
    .map((c, i) => {
      const type = displayState.occupancy[c.id],
        def = level.pieceTypes.find((p) => p.id === type),
        neutral = def?.neutral === true || ['n', 'neutral', '0'].includes(type);
      return (
        '<g id="o-chip-' +
        i +
        '" class="o-piece ' +
        (neutral ? 'o-neutral' : '') +
        '" data-o-piece="' +
        esc(c.id) +
        '" data-o-type="' +
        esc(type) +
        '" style="--o-piece-color:' +
        orbitaColor(level, type) +
        '" transform="translate(' +
        c.x +
        ' ' +
        c.y +
        ')" role="img" aria-label="Casa ' +
        (i + 1) +
        ', peça ' +
        esc(orbitaTypeName(level, type)) +
        '"><circle r="' +
        radius +
        '"/><text text-anchor="middle" dominant-baseline="central">' +
        esc(symbol(type)) +
        '</text></g>'
      );
    })
    .join('');
  return (
    '<svg id="o-board" class="o-board o-clean-board" data-o-selection="' +
    esc(command.id) +
    '" viewBox="0 0 ' +
    level.layout.width +
    ' ' +
    level.layout.height +
    '" style="--o-board-width:' +
    level.layout.width +
    'px" role="group" tabindex="0" aria-label="Tabuleiro de ÓRBITA, ' +
    level.rings.length +
    ' anéis e ' +
    level.cells.length +
    ' casas" aria-describedby="o-keyboard-help"><g class="o-rails">' +
    paths +
    '</g><g class="o-houses">' +
    cells +
    '</g>' +
    sensors +
    '<g class="o-pieces">' +
    pieces +
    '</g>' +
    labels +
    '</svg>'
  );
}

export function initOrbita({ hideOthers = () => {} } = {}) {
  let host = document.getElementById('orbita');
  if (!host) {
    host = document.createElement('section');
    host.id = 'orbita';
    host.hidden = true;
    host.setAttribute('aria-label', 'ÓRBITA');
    document.querySelector('main').append(host);
  }
  const $ = (id) => host.querySelector('#' + id);
  let data;
  try {
    data = normalizeOrbitaData(JSON.parse(localStorage.getItem(ORBITA_STORAGE_KEY) || 'null'));
  } catch {
    data = freshOrbitaData();
  }
  let level = null,
    session = null,
    mode = 'campaign',
    index = 0,
    screen = 'selection',
    daily = false,
    selected = null;
  let rulesOpen = true,
    advanced = data.prefs.advanced,
    message = '',
    hintText = '',
    hintTier = 0,
    hintPlan = null,
    answerPlan = null,
    hintBusy = false,
    storageWarning = false,
    motion = null;
  let displayProjection = null,
    displayWidth = 0;
  let revision = 0,
    hintRevision = 0,
    generationRevision = 0,
    importRevision = 0,
    animationRevision = 0;
  let generationBusy = false,
    prefetch = null,
    prefetchTask = null,
    autoTimer = null,
    animationFrame = null,
    animating = false,
    animationResolve = null,
    guided = false,
    scrollObserver = null;
  const generator = createOrbitaService(),
    advisor = createOrbitaService(),
    restart = createRestartConfirmation('restart-orbita');
  const current = () => session?.states[session.cursor],
    isOpen = () => !host.hidden;
  const log = (type, details = {}) =>
    recordEvent(data, type, {
      game: 'orbita',
      mode,
      level: level?.id,
      catalogVersion: CAMPAIGN_VERSION,
      editorialLevel: mode === 'campaign' ? index + 1 : null,
      editorialTier: mode === 'campaign' ? campaignTier(index + 1)?.name : null,
      ...details,
    });
  const difficultyName = (value) => DIFFICULTIES[bounded(value, 0, 4)] ?? 'Muito fácil';
  const lesson = () =>
    orbitaLesson(
      level,
      level.discovery ??
        level.lesson ??
        'Prepare as passagens e complete todos os alvos ao mesmo tempo.',
    ).replace(/^Nesta fase, o jogador precisa perceber que\s*/i, '');
  const safeError = (error) =>
    error?.name === 'AbortError'
      ? ''
      : error instanceof SyntaxError
        ? 'JSON inválido. Confira aspas, vírgulas e colchetes.'
        : (error?.message ?? 'Não foi possível concluir esta ação.');
  const seedNow = () => {
    const values = new Uint32Array(1);
    if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(values);
    else values[0] = (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
    return values[0];
  };
  const makeSeed = (base, number) => (base + Math.imul(number, 0x9e3779b9)) >>> 0;
  const symbol = (type) => orbitaSymbol(level, type);
  const typeName = (type) => orbitaTypeName(level, type);
  const commandName = (id) =>
    level.commands.find((command) => command.id === id)?.label ?? 'Anel ' + id;
  const moveName = (move) => commandName(move.command) + ' ' + (move.direction === 1 ? '↻' : '↺');
  const optionsKey = (options) => JSON.stringify(options);

  // Grava o progresso e as preferências da sessão atual.
  function save() {
    if (level && session) {
      const saved = {
        ...serializeOrbitaSession(level, session),
        movementMission: serializeMovementAttempt(missionAttempt, { session, definition: definitionKey(level) }),
      };
      if (mode === 'campaign') {
        data.campaign.lastId = level.id;
        data.campaign.sessions[level.id] = saved;
      } else if (mode === 'endless' && data.endless?.current?.level?.id === level.id)
        data.endless.current.session = saved;
      else if (mode === 'custom') data.custom = { level: clone(level), session: saved };
    }
    data.prefs.advanced = advanced;
    try {
      writeProgress(localStorage, ORBITA_STORAGE_KEY, JSON.stringify(data));
      storageWarning = false;
    } catch {
      storageWarning = true;
    }
  }
  function cancelAuto() {
    if (autoTimer !== null) clearTimeout(autoTimer);
    autoTimer = null;
  }
  function cancelHint() {
    hintRevision++;
    hintBusy = false;
    advisor.cancel();
  }
  function clearAnimation() {
    animationRevision++;
    if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    animationFrame = null;
    animating = false;
    if (animationResolve) {
      const resolve = animationResolve;
      animationResolve = null;
      resolve(false);
    }
  }
  // Invalida resultados pendentes antes de atualizar a tentativa.
  function invalidate() {
    revision++;
    guided = false;
    scrollObserver?.disconnect();
    scrollObserver = null;
    cancelAuto();
    cancelHint();
    importRevision++;
    clearAnimation();
    restart.dismiss();
    motion?.clear();
    hintPlan = null;
    answerPlan = null;
    hintTier = 0;
    hintText = '';
  }
  // Cancela tarefas de geração que não pertencem mais à sessão atual.
  function cancelGeneration() {
    generationRevision++;
    generator.cancel();
    generationBusy = false;
    prefetch = null;
    prefetchTask = null;
  }
  function preserveInteractionFocus() {
    const origin = document.activeElement;
    if (!origin || !host.contains(origin)) return () => {};
    const originId = origin.id,
      requestLevel = level;
    let moved = false;
    const noticeFocus = (event) => {
      if (
        event.target !== document.body &&
        event.target !== origin &&
        !(originId && event.target?.id === originId)
      )
        moved = true;
    };
    const noticeKey = (event) => {
      if (event.key === 'Tab') moved = true;
    };
    const noticePointer = (event) => {
      if (event.target !== origin && !origin.contains?.(event.target)) moved = true;
    };
    document.addEventListener('focusin', noticeFocus, true);
    document.addEventListener('keydown', noticeKey, true);
    document.addEventListener('pointerdown', noticePointer, true);
    return (restore = true) => {
      document.removeEventListener('focusin', noticeFocus, true);
      document.removeEventListener('keydown', noticeKey, true);
      document.removeEventListener('pointerdown', noticePointer, true);
      if (!restore || moved || host.hidden || screen !== 'play' || level !== requestLevel) return;
      const active = document.activeElement;
      if (
        active &&
        active !== document.body &&
        active !== origin &&
        !(originId && active.id === originId)
      )
        return;
      let target = originId ? $(originId) : origin.isConnected ? origin : null;
      if (!target || target.disabled || target.hidden || target.closest?.('[hidden]'))
        target = $('o-board');
      if (target && active !== target) target.focus({ preventScroll: true });
    };
  }
  function showHost() {
    hideOthers();
    host.hidden = false;
    data.lastView.active = true;
    document
      .querySelectorAll('[data-game],[data-collection],[data-sintonia],[data-repasse]')
      .forEach((button) => button.setAttribute('aria-pressed', 'false'));
    document.querySelector('[data-orbita]')?.setAttribute('aria-pressed', 'true');
  }
  function hide() {
    save();
    cancelGeneration();
    invalidate();
    host.hidden = true;
    data.lastView.active = false;
    document.querySelector('[data-orbita]')?.setAttribute('aria-pressed', 'false');
    save();
  }
  function activate() {
    showHost();
    selection();
  }
  function certified(candidate) {
    try {
      return (
        validateLevel(candidate).valid &&
        validateOrbitaPresentation(candidate).valid &&
        !isWon(candidate, initialState(candidate)) &&
        Array.isArray(candidate.solution) &&
        replay(candidate, candidate.solution).solved
      );
    } catch {
      return false;
    }
  }
  function restoreOnLoad() {
    if (!data.lastView.active) return false;
    const view = { ...data.lastView };
    showHost();
    if (view.screen !== 'play') {
      selection();
      return true;
    }
    if (view.mode === 'endless' && data.endless?.current?.level) {
      resumeEndless();
      return true;
    }
    if (view.mode === 'custom' && data.custom?.level && !isCircularGeneration(data.custom.level)) {
      selection();
      $('o-selection-status').textContent =
        'A fase personalizada antiga usa percursos não circulares. Seus dados foram preservados, mas apenas fases com anéis circulares podem ser abertas.';
      return true;
    }
    if (view.mode === 'custom' && certified(data.custom?.level)) {
      start(data.custom.level, { mode: 'custom', saved: data.custom.session });
      return true;
    }
    const last = CAMPAIGN.findIndex((item) => item.id === data.campaign.lastId);
    if (last >= 0) {
      startCampaign(last, view.daily);
      return true;
    }
    selection();
    return true;
  }
  // Apresenta as fases e as opções de início ou retomada.
  function selection() {
    save();
    cancelGeneration();
    invalidate();
    screen = 'selection';
    level = null;
    session = null;
    data.lastView = { active: true, screen, mode: 'campaign', daily: false };
    host.innerHTML =
      '<div class="level-screen orbita-selection"><p class="eyebrow">COLEÇÃO LÓGICA</p><h2 id="o-selection-title" tabindex="-1">ÓRBITA ·</h2><p>Um giro prepara o próximo. Transfira as peças entre os anéis e encontre um lugar para todos os símbolos.</p><div class="collection-toolbar selection-actions" role="group" aria-label="Ações do jogo"><button id="o-endless-entry" class="primary">Modo Sem Parar</button><button id="o-daily" class="primary">Desafio de hoje</button></div><p id="o-selection-status" role="status" aria-live="polite"></p>' +
      rulesPreviewMarkup('orbita') +
      '<div id="o-catalog">' +
      CAMPAIGN_TIERS.map(
        (tier) =>
          '<section class="o-chapter" aria-label="' +
          esc(tier.name) +
          '"><h3 class="stage-heading">' +
          short(tier.index + 1) +
          ' · ' +
          esc(tier.name) +
          ' <small>Níveis ' +
          tier.start +
          '–' +
          tier.end +
          '</small></h3><div class="level-group">' +
          CAMPAIGN.slice(tier.start - 1, tier.end)
            .map((item, offset) => {
              const number = tier.start + offset,
                done = data.campaign.completed[item.id],
                active = item.id === data.campaign.lastId;
              return (
                '<button class="level-tile ' +
                (done ? 'done' : '') +
                '" data-o-level="' +
                (number - 1) +
                '" aria-label="Nível ' +
                number +
                ', ' +
                esc(item.name) +
                ', ' +
                (done ? 'concluído' : 'disponível') +
                '" ' +
                (active ? 'aria-current="true"' : '') +
                '><span>' +
                number +
                '</span><small>' +
                (done
                  ? done.assisted
                    ? '✓ assistido'
                    : '✓ concluído'
                  : active
                    ? 'atual'
                    : 'explorar') +
                '</small></button>'
              );
            })
            .join('') +
          '</div></section>',
      ).join('') +
      '</div>' +
      importPanel() +
      '</div>';
    host
      .querySelectorAll('[data-o-level]')
      .forEach((button) => (button.onclick = () => startCampaign(Number(button.dataset.oLevel))));
    $('o-daily').onclick = () =>
      startCampaign(
        dailyIndex('orbita', new Date().toLocaleDateString('sv-SE'), CAMPAIGN.length),
        true,
      );
    $('o-endless-entry').onclick = () =>
      data.endless?.current?.level ? resumeEndless() : newEndless(campaignDifficulty());
    $('o-selection-status').textContent = data.campaignMigrationNotice;
    bindImport();
    save();
    $('o-selection-title').focus({ preventScroll: true });
  }
  function campaignDifficulty() {
    const last = CAMPAIGN.find((item) => item.id === data.campaign.lastId);
    const tier = campaignTier(CAMPAIGN.indexOf(last) + 1);
    return tier?.internalDifficulty ?? 0;
  }
  // Localiza a fase da campanha e inicia sua sessão.
  function startCampaign(next, dailyChallenge = false) {
    if (!CAMPAIGN[next]) return;
    save();
    cancelGeneration();
    index = next;
    daily = dailyChallenge;
    start(CAMPAIGN[next], { mode: 'campaign', saved: data.campaign.sessions[CAMPAIGN[next].id] });
  }
  // Prepara a fase selecionada e sua apresentação.
  let missionAttempt = null;
  const missionMinimums = new WeakMap();
  function start(next, { mode: nextMode = 'campaign', saved = null, fresh = false } = {}) {
    if (!isCircularGeneration(next)) {
      selection();
      $('o-selection-status').textContent =
        'Apenas fases com anéis circulares podem ser abertas. Os dados anteriores continuam preservados.';
      return;
    }
    invalidate();
    level = next;
    mode = nextMode;
    screen = 'play';
    rulesOpen = true;
    session = restoreOrbitaSession(level, fresh ? null : saved);
    selected = level.commands[0]?.id;
    missionAttempt = startMovementAttempt({
      session, saved, reset: fresh, definition: definitionKey(level),
      official: mode === 'campaign' && CAMPAIGN.includes(level),
      priorBest: data.campaign.completed[level.id]?.humanBestMoves,
    });
    if (mode === 'endless' && data.endless?.current?.completed === true) session.winRecorded = true;
    const unknown = mechanics(level).filter((key) => !data.learnedMechanics.includes(key));
    data.learnedMechanics = [...new Set([...data.learnedMechanics, ...mechanics(level)])];
    data.lastView = { active: true, screen, mode, daily: mode === 'campaign' && daily };
    message =
      (mode === 'endless' ? data.endless?.current?.recovery?.notice : '') ||
      session.restoreIssue ||
      '';
    render(unknown);
    log('level-start', { resumed: session.restored });
    save();
    $('o-title').focus({ preventScroll: true });
    if (isWon(level, current())) {
      recordWin();
      motion.show('orbita', true, { animate: false });
      scheduleAuto();
    }
    if (mode === 'endless') fillPrefetch();
  }
  function resumeEndless() {
    const run = data.endless;
    if (!run?.current?.level) return newEndless(campaignDifficulty());
    if (!isCircularGeneration(run.current.level) || !compactOrbitaAudit(run.current.level).valid)
      return recoverVisibleEndless();
    if (!certified(run.current.level)) {
      selection();
      $('o-selection-status').textContent =
        'O desafio salvo usa dados incompatíveis. Seu progresso continua guardado; escolha Explorar modo livre para começar outro.';
      run.current = null;
      save();
      return;
    }
    cancelGeneration();
    daily = false;
    start(run.current.level, { mode: 'endless', saved: run.current.session });
  }
  async function recoverVisibleEndless() {
    if (generationBusy) return;
    selection();
    const run = data.endless;
    if (!run?.current?.level) return;
    const seed = circularRecoverySeed(run.current.seed),
      options = endlessOptions(
        run.startDifficulty,
        run.solved,
        run.recentSignatures,
        run.recentFamilies,
        run.recentTopologies,
      ),
      token = generationRevision;
    generationBusy = true;
    generationStatus(
      'Preparando um desafio circular compacto. O histórico antigo e as conclusões serão preservados…',
    );
    try {
      const result = await generator.generate(seed, options);
      if (token !== generationRevision || data.endless !== run || host.hidden) return;
      verifyGenerated(result);
      recoverOrbitaEndless(data, result, options);
      generationBusy = false;
      save();
      daily = false;
      start(result.level, { mode: 'endless', fresh: true });
    } catch (error) {
      if (token !== generationRevision) return;
      generationBusy = false;
      generationStatus(
        'Não foi possível recuperar agora. A tentativa antiga e seu progresso continuam guardados e intactos. Tente abrir o modo livre novamente. ' +
          safeError(error),
      );
    }
  }
  function generationStatus(text) {
    const target = $('o-generation-status') ?? $('o-selection-status');
    if (target) target.textContent = text;
    host
      .querySelectorAll('#o-endless-new,#o-next')
      .forEach((button) => (button.disabled = generationBusy));
  }
  // Confere o desafio gerado antes de aceitá-lo na sessão.
  function verifyGenerated(result) {
    if (!certified(result?.level))
      throw Error('O desafio não passou na verificação. Tente gerar outro.');
  }
  // Prepara um novo desafio do modo livre com as opções selecionadas.
  async function newEndless(startDifficulty = 0) {
    if (generationBusy) return;
    save();
    cancelGeneration();
    cancelAuto();
    const token = generationRevision,
      seed = seedNow(),
      options = endlessOptions(startDifficulty, 0);
    generationBusy = true;
    generationStatus('Preparando um novo desafio de ÓRBITA…');
    try {
      const result = await generator.generate(seed, options);
      if (token !== generationRevision || host.hidden) return;
      verifyGenerated(result);
      generationBusy = false;
      data.endless = {
        version: 3,
        baseSeed: seed,
        startDifficulty: bounded(startDifficulty, 0, 4),
        number: 0,
        solved: 0,
        recentSignatures: [],
        recentFamilies: [],
        recentTopologies: [],
        current: null,
      };
      acceptEndless(result, seed, 1, options);
    } catch (error) {
      if (token !== generationRevision) return;
      generationBusy = false;
      generationStatus(
        (safeError(error) || 'A geração foi cancelada.') +
          ' Sua tentativa anterior continua salva.',
      );
    }
  }
  // Prepara antecipadamente o próximo desafio sem trocar a fase em andamento.
  function fillPrefetch() {
    if (mode !== 'endless' || !data.endless || prefetchTask || generationBusy) return;
    const run = data.endless,
      number = run.number + 1,
      options = endlessOptions(
        run.startDifficulty,
        run.solved,
        run.recentSignatures,
        run.recentFamilies,
        run.recentTopologies,
      ),
      seed = makeSeed(run.baseSeed, number),
      token = generationRevision,
      key = optionsKey(options);
    if (prefetch?.number === number && prefetch.key === key) return;
    prefetchTask = (async () => {
      try {
        const result = await generator.generate(seed, options);
        if (token !== generationRevision || data.endless !== run) return;
        verifyGenerated(result);
        prefetch = { result, seed, number, key };
      } catch {
        /* The visible challenge remains playable when background generation fails. */
      }
    })().finally(() => {
      if (token === generationRevision) prefetchTask = null;
    });
  }
  async function nextEndless() {
    if (mode !== 'endless' || generationBusy || !data.endless) return;
    save();
    cancelAuto();
    const run = data.endless,
      number = run.number + 1,
      options = endlessOptions(
        run.startDifficulty,
        run.solved,
        run.recentSignatures,
        run.recentFamilies,
        run.recentTopologies,
      );
    const cached =
      prefetch?.number === number && prefetch.key === optionsKey(options) ? prefetch : null;
    if (cached) {
      cancelGeneration();
      acceptEndless(cached.result, cached.seed, number, options);
      return;
    }
    cancelGeneration();
    const token = generationRevision,
      seed = makeSeed(run.baseSeed, number);
    generationBusy = true;
    generationStatus('Preparando o próximo desafio… O atual continua salvo.');
    try {
      const result = await generator.generate(seed, options);
      if (token !== generationRevision || data.endless !== run || mode !== 'endless' || host.hidden)
        return;
      verifyGenerated(result);
      generationBusy = false;
      acceptEndless(result, seed, number, options);
    } catch (error) {
      if (token !== generationRevision) return;
      generationBusy = false;
      generationStatus(
        (safeError(error) || 'A geração foi cancelada.') + ' Seu desafio foi preservado.',
      );
    }
  }
  function acceptEndless(result, seed, number, parameters) {
    save();
    const run = data.endless;
    run.number = number;
    run.recentSignatures = [...run.recentSignatures, result.signature]
      .filter((x) => typeof x === 'string')
      .slice(-30);
    run.recentFamilies = [...run.recentFamilies, result.family ?? result.level.family]
      .filter((x) => typeof x === 'string')
      .slice(-30);
    run.recentTopologies = [
      ...(run.recentTopologies ?? []),
      result.topology ?? topologyRecency(result.level),
    ].slice(-30);
    run.current = {
      level: result.level,
      seed,
      parameters: clone(parameters),
      signature: result.signature,
      generatorVersion: result.generatorVersion ?? 1,
      rulesVersion: RULES_VERSION,
      session: null,
      completed: false,
    };
    daily = false;
    start(result.level, { mode: 'endless', fresh: true });
  }
  // Registra a conclusão da fase e atualiza o progresso.
  function recordWin() {
    if (recordOrbitaCompletion(data, level, session, mode))
      log('win', { assisted: session.assisted });
    save();
  }
  // Agenda o avanço automático quando a configuração e a sessão permitem.
  function scheduleAuto() {
    cancelAuto();
    if (
      mode !== 'endless' ||
      !data.prefs.autoAdvance ||
      !isWon(level, current()) ||
      host.hidden ||
      restart.isOpen ||
      animating ||
      guided
    )
      return;
    const token = revision;
    autoTimer = setTimeout(() => {
      autoTimer = null;
      if (
        token === revision &&
        !host.hidden &&
        !restart.isOpen &&
        !guided &&
        mode === 'endless' &&
        isWon(level, current())
      )
        nextEndless();
    }, 1800);
  }
  function tutorialMarkup(unknown) {
    const tutorial = mode === 'campaign' && index < 10 ? TUTORIAL[index] : null;
    if (!tutorial && !unknown.length) return '';
    return (
      '<details class="o-tutorial" open><summary>' +
      esc(unknown.length ? 'Uma nova possibilidade' : 'Experimente') +
      '</summary>' +
      (tutorial ? '<p>' + esc(tutorial) + '</p>' : '') +
      unknown
        .map(
          (key) =>
            '<p><strong>' +
            esc(MECHANICS[key][0]) +
            '.</strong> ' +
            esc(MECHANICS[key][1]) +
            '</p>',
        )
        .join('') +
      '</details>'
    );
  }
  // Atualiza a apresentação da partida a partir do estado atual.
  function render(unknown = []) {
    motion?.clear();
    host.innerHTML =
      '<div class="lab collection-lab orbita-lab"><button id="o-back" class="quiet">← Seleção de níveis</button><div class="lab-heading"><div><p id="o-kicker" class="eyebrow">' +
      (mode === 'endless'
        ? 'Modo Sem Parar · DESAFIO ' +
          data.endless.number +
          ' · ' +
          data.endless.solved +
          ' CONCLUÍDOS'
        : mode === 'custom'
          ? 'EDITOR · FASE PERSONALIZADA'
          : 'EXPERIMENTO 09 · ' + esc(campaignTier(index + 1)?.name ?? '')) +
      '</p><h2 id="o-title" tabindex="-1">ÓRBITA ·</h2><p class="o-level-name">' +
      esc(level.name ?? 'Entre anéis') +
      ' <span>' +
      level.rings.length +
      ' ' +
      (level.rings.length === 1 ? 'anel' : 'anéis') +
      ' · ' +
      Object.keys(level.targets).length +
      ' alvos</span></p></div><div class="modes collection-mode-switch" role="group" aria-label="Modo de jogo"><button id="o-mode-campaign" aria-pressed="' +
      (mode !== 'endless') +
      '">Desafios</button><button id="o-mode-endless" aria-pressed="' +
      (mode === 'endless') +
      '">Modo Sem Parar</button></div></div>' +
      (mode === 'endless' ? endlessControls() : '') +
      '<div class="collection-workspace o-workspace ' +
      (rulesOpen ? 'rules-open ' : '') +
      (advanced ? '' : 'closed') +
      '"><div class="collection-surface experiment o-surface"><div class="stage-top">' +
      (mode === 'campaign'
        ? '<div class="level-stepper"><span id="o-stage-label">' +
          (daily ? 'DESAFIO DO DIA' : 'DESAFIO') +
          ' ' +
          short(index + 1) +
          ' / ' +
          CAMPAIGN.length +
          '</span></div>'
        : '') +
      '<div class="stage-tools"><button id="o-undo" type="button" aria-label="Desfazer" title="Desfazer (Ctrl+Z)">↶</button><button id="o-redo" type="button" aria-label="Refazer" title="Refazer (Ctrl+Shift+Z)">↷</button><button id="o-reset" class="action-reset">↺ Reiniciar</button><details id="o-rules-panel" class="rules-card" ' +
      (rulesOpen ? 'open' : '') +
      '><summary aria-controls="o-rules-sidebar" aria-expanded="' +
      rulesOpen +
      '"><span>Regras e como jogar</span><span class="rules-show">Mostrar</span><span class="rules-hide">Ocultar</span></summary></details><button id="o-advanced-toggle" aria-controls="o-advanced" aria-expanded="' +
      advanced +
      '">' +
      (advanced ? 'Ocultar' : 'Mostrar') +
      ' opções avançadas</button></div></div><p class="o-mission">' +
      esc(lesson()) +
      ' Toque no anel ou na sua letra para selecionar. No teclado: ← anti-horário · → horário.</p>' +
      tutorialMarkup(unknown) +
      '<div class="o-orbit-controls" role="group" aria-label="Controles dos anéis"><div id="o-ring-choices" class="o-ring-choices" role="group" aria-label="Selecionar anel ou engrenagem"></div><div class="o-turn-row"><button id="o-counterclockwise" aria-keyshortcuts="ArrowLeft" class="o-turn" type="button" aria-label="Girar no sentido anti-horário"><span aria-hidden="true">↶</span><span>Anti-horário</span></button><div id="o-command-label" class="o-command-label"></div><button id="o-clockwise" aria-keyshortcuts="ArrowRight" class="o-turn" type="button" aria-label="Girar no sentido horário"><span aria-hidden="true">↷</span><span>Horário</span></button></div><p id="o-command-status" role="status" aria-live="polite"></p></div><div class="board-navigation o-board-navigation" role="group" aria-label="Área do jogo e navegação de níveis">' +
      (mode === 'campaign'
        ? '<button id="o-level-prev" class="level-arrow" aria-label="Nível anterior" title="Nível anterior">←</button>'
        : '') +
      '<div id="o-board-surface" class="o-board-surface"><div id="o-board-scroll" class="o-board-scroll" tabindex="0" role="region" aria-label="Tabuleiro de ÓRBITA"><div id="o-board-holder"></div></div><div id="o-motion" class="result-motion" aria-hidden="true"></div></div>' +
      (mode === 'campaign'
        ? '<button id="o-level-next" class="level-arrow" aria-label="Próximo nível" title="Próximo nível">→</button>'
        : '') +
      '</div><p id="o-scroll-help" class="o-scroll-help" hidden>Deslize o tabuleiro para ver todos os anéis. Os controles de giro ficam acima.</p><p id="o-keyboard-help" class="sr-only">Toque no traçado ou na letra de um anel para selecioná-lo, ou use os botões. Enter ou espaço seleciona a letra em foco. Durante a partida, seta esquerda gira anti-horário e seta direita gira horário, inclusive após selecionar um anel ou usar outro controle do jogo. As teclas de 1 a 9 selecionam o comando correspondente. Ctrl+Z desfaz; Ctrl+Shift+Z refaz.</p><p class="o-board-legend"><span><i class="o-legend-key o-legend-piece" aria-hidden="true">★</i>Peça móvel</span><span><i class="o-legend-key o-legend-target" aria-hidden="true">★</i>Alvo fixo</span><span><i class="o-legend-key o-legend-junction" aria-hidden="true"></i>Encontro de anéis</span></p><div class="readout o-readout"><div><span class="metric-label">GIROS</span><strong id="o-moves"></strong></div><div><span class="metric-label">ALVOS CERTOS</span><strong id="o-matched"></strong></div><p id="o-status" role="status" aria-live="polite" aria-atomic="true"></p></div><div class="level-actions"><button id="o-confirm" class="primary confirm" hidden>Confirmar resposta</button><div class="actions"><button id="o-answer" hidden>Ver gabarito</button><button id="o-hint" class="action-hint">✦ Dicas</button><button id="o-next" ' +
      (mode === 'custom' ? 'hidden' : '') +
      '>' +
      (mode === 'endless' ? 'Novo desafio' : 'Próximo nível') +
      ' →</button></div><button id="o-hint-apply" hidden>Aplicar este giro</button><button id="o-answer-apply" hidden>Aplicar sequência do gabarito</button><button id="o-stop-guide" hidden>Pausar sequência</button><p id="o-hint-text" class="hint" role="status" aria-live="polite"></p></div></div><aside id="o-rules-sidebar" class="rules-sidebar" aria-label="Regras e como jogar" ' +
      (rulesOpen ? '' : 'hidden') +
      '>' +
      rulesMarkup() +
      '</aside><aside id="o-advanced" class="controls" ' +
      (advanced ? '' : 'hidden') +
      '>' +
      advancedMarkup() +
      '</aside></div></div>';
    host.querySelector('.o-board-navigation').after(host.querySelector('.level-actions'));
    motion = createResultMotion($('o-motion'), $('o-board-surface'), globalThis, {
      getVictoryState: current,
      onRetry: restartCurrentImmediately,
    });
    $('o-back').onclick = selection;
    $('o-mode-campaign').onclick = selection;
    $('o-mode-endless').onclick = () => {
      if (mode !== 'endless')
        data.endless?.current?.level
          ? resumeEndless()
          : newEndless(bounded(level.difficulty, 0, 4));
    };
    $('o-undo').onclick = () => travelHistory(-1);
    $('o-redo').onclick = () => travelHistory(1);
    $('o-reset').onclick = (event) => restartLevel(event.currentTarget);
    if ($('o-level-prev')) $('o-level-prev').onclick = () => navigate(-1);
    if ($('o-level-next')) $('o-level-next').onclick = () => navigate(1);
    $('o-counterclockwise').onclick = () => rotate({ command: selected, direction: -1 });
    $('o-clockwise').onclick = () => rotate({ command: selected, direction: 1 });
    $('o-confirm').onclick = confirm;
    $('o-next').onclick = () => navigate(1);
    $('o-hint').onclick = hint;
    $('o-answer').onclick = showAnswer;
    $('o-answer-apply').onclick = applyAnswer;
    $('o-hint-apply').onclick = () => {
      if (hintPlan?.context === stateKey(current()) && solutionValid(hintPlan.solution, current()))
        rotate(hintPlan.solution[0], { assisted: true });
    };
    $('o-stop-guide').onclick = () => {
      guided = false;
      hintText = 'Sequência pausada. Você pode continuar explorando e desfazer os giros aplicados.';
      renderStatus();
    };
    const rulesPanel = $('o-rules-panel');
    rulesPanel.ontoggle = () => {
      if ($('o-rules-panel') !== rulesPanel) return;
      rulesOpen = rulesPanel.open;
      syncPanels();
    };
    $('o-advanced-toggle').onclick = () => {
      advanced = !advanced;
      syncPanels();
      save();
    };
    renderCommandChoices();
    bindAdvanced();
    if (mode === 'endless') bindEndless();
    renderBoard();
    renderStatus();
    syncPanels();
  }
  function syncPanels() {
    const workspace = $('o-rules-sidebar').parentElement;
    workspace.classList.toggle('rules-open', rulesOpen);
    workspace.classList.toggle('closed', !advanced);
    $('o-rules-sidebar').hidden = !rulesOpen;
    $('o-advanced').hidden = !advanced;
    $('o-rules-panel').querySelector('summary').setAttribute('aria-expanded', String(rulesOpen));
    $('o-advanced-toggle').setAttribute('aria-expanded', String(advanced));
    $('o-advanced-toggle').textContent = (advanced ? 'Ocultar' : 'Mostrar') + ' opções avançadas';
  }
  function endlessControls() {
    return (
      '<details class="rules-card endless-settings endless-panel" open><summary>Modo Sem Parar · modo livre</summary><div class="rules-body"><p>Novos caminhos, no seu ritmo. Os desafios avançam com suas conclusões e retomam ideias já conhecidas.</p><div class="collection-toolbar"><label class="o-checkbox"><input id="o-auto-advance" type="checkbox" ' +
      (data.prefs.autoAdvance ? 'checked' : '') +
      '> Avançar automaticamente após concluir</label><button id="o-endless-new">Novo desafio</button></div><p>Reiniciar conserva os mesmos anéis, peças e alvos. Novo desafio troca a fase sem contar como vitória.</p><p id="o-generation-status" role="status" aria-live="polite"></p></div></details>'
    );
  }
  function bindEndless() {
    $('o-endless-new').onclick = nextEndless;
    $('o-auto-advance').onchange = (event) => {
      data.prefs.autoAdvance = event.target.checked;
      save();
      if (data.prefs.autoAdvance) scheduleAuto();
      else cancelAuto();
    };
  }
  // Monta as orientações e exemplos de regras apresentados na partida.
  function rulesMarkup() {
    return (
      '<h3>Um giro prepara o próximo</h3><p class="rules-context">' +
      BASE_RULES +
      '</p><div class="rules-body"><p>Escolha um anel pela letra e use <strong>↷ horário</strong> ou <strong>↶ anti-horário</strong>. Um giro normal avança uma casa; o comando marcado com passo 2 avança duas casas de uma vez.</p><p>O símbolo pequeno pertence ao <strong>alvo fixo</strong>. A ficha maior é a peça que circula. Uma ficha neutra também ocupa uma casa e acompanha os giros.</p><p>O contorno duplo marca uma casa compartilhada. Leve uma peça até esse encontro e gire o outro anel para transferi-la. O restante do anel que ficou parado continua no lugar.</p><p>É permitido retirar uma peça do alvo e recuperá-la depois. Experimente livremente: a conclusão é reconhecida automaticamente quando todos os alvos estão corretos ao fim de um comando.</p><div class="collection-notes"><p><strong>Foco desta fase:</strong> ' +
      esc(lesson()) +
      '</p></div>' +
      mechanics(level)
        .map(
          (key) =>
            '<p><strong>' +
            esc(MECHANICS[key][0]) +
            '.</strong> ' +
            esc(MECHANICS[key][1]) +
            '</p>',
        )
        .join('') +
      '<details class="rules-more"><summary>Estratégias e acessibilidade</summary><div><p>Prepare o anel receptor, use posições temporárias e pense em como recuperar os acertos. Desfazer restaura um comando inteiro, inclusive engrenagens.</p><p>Tab percorre os controles. Com o tabuleiro em foco, ← e → giram o anel selecionado. As teclas de 1 a 9 selecionam os comandos; Ctrl+Z desfaz e Ctrl+Shift+Z refaz. Toque e teclado oferecem as mesmas ações.</p><p>Os símbolos identificam as peças sem depender de cor. A preferência de movimento reduzido do dispositivo é respeitada.</p></div></details></div>'
    );
  }
  function selectedCommand() {
    return level.commands.find((command) => command.id === selected) ?? level.commands[0];
  }
  function ringStep(turn) {
    const ring = level.rings.find((item) => item.id === turn.ring);
    return Math.abs(turn.delta * (ring?.step ?? 1));
  }
  function commandDescription(command) {
    return command.turns
      .map(
        (turn) =>
          turn.ring +
          ' ' +
          (turn.delta > 0 ? '↷' : '↶') +
          ' · ' +
          ringStep(turn) +
          ' ' +
          (ringStep(turn) === 1 ? 'casa' : 'casas'),
      )
      .join(' + ');
  }
  function renderCommandChoices() {
    $('o-ring-choices').innerHTML = level.commands
      .map(
        (command, i) =>
          '<button type="button" data-o-command="' +
          esc(command.id) +
          '" aria-pressed="' +
          (command.id === selected) +
          '" aria-label="Selecionar ' +
          esc(command.label ?? 'anel ' + command.id) +
          ', tecla ' +
          (i + 1) +
          '"><strong>' +
          esc(command.turns.map((turn) => turn.ring).join(' + ')) +
          '</strong><small>' +
          esc(
            command.turns.length > 1
              ? 'ligados'
              : ringStep(command.turns[0]) > 1
                ? 'passo ' + ringStep(command.turns[0])
                : 'anel',
          ) +
          '</small></button>',
      )
      .join('');
    $('o-ring-choices')
      .querySelectorAll('[data-o-command]')
      .forEach((button) => (button.onclick = () => selectCommand(button.dataset.oCommand)));
  }
  function selectCommand(id) {
    if (!level.commands.some((command) => command.id === id) || animating || guided) return;
    selected = id;
    updateControls();
    renderBoard();
  }
  function updateControls() {
    if (!$('o-ring-choices')) return;
    const command = selectedCommand(),
      status = commandStatus(level, current(), command.id),
      busy = animating || guided;
    $('o-ring-choices')
      .querySelectorAll('[data-o-command]')
      .forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.oCommand === selected));
        button.disabled = busy;
      });
    $('o-command-label').textContent = commandDescription(command);
    const conditions = (command.requires ?? []).map((condition) => ({
      condition,
      actual: current().occupancy[condition.cell],
      satisfied: current().occupancy[condition.cell] === condition.type,
    }));
    $('o-command-status').textContent = conditions.length
      ? (status.allowed ? 'Sensor liberado. ' : 'Giro bloqueado. ') +
        conditions
          .map(
            ({ condition, satisfied }) =>
              'Sensor ' +
              (level.cells.findIndex((cell) => cell.id === condition.cell) + 1) +
              ': precisa de ' +
              symbol(condition.type) +
              (satisfied
                ? ' ✓'
                : '; agora está com ' + symbol(current().occupancy[condition.cell])),
          )
          .join(' · ')
      : command.turns.length > 1
        ? 'Os anéis destacados giram juntos; a outra seta inverte todos os movimentos.'
        : '';
    $('o-command-status').classList.toggle('o-blocked', !status.allowed);
    for (const [id, direction] of [
      ['o-clockwise', 1],
      ['o-counterclockwise', -1],
    ]) {
      const button = $(id);
      button.disabled = busy || !status.allowed;
      button.setAttribute('aria-describedby', 'o-command-status');
      button.setAttribute(
        'aria-label',
        (direction === 1 ? 'Girar horário: ' : 'Girar anti-horário: ') +
          command.turns
            .map(
              (turn) =>
                turn.ring +
                ', ' +
                (Math.sign(turn.delta) * direction === 1 ? 'horário' : 'anti-horário') +
                ', ' +
                ringStep(turn) +
                ' ' +
                (ringStep(turn) === 1 ? 'casa' : 'casas'),
            )
            .join('; '),
      );
    }
  }
  function bindRingSelection() {
    const board = $('o-board');
    let press = null;
    const choose = (ringId, focusLabel = false) => {
      if (animating || guided) return;
      const next = commandForOrbitaRing(level, ringId, selected);
      if (!next) return;
      selectCommand(next);
      const target = focusLabel
        ? [...$('o-board').querySelectorAll('[data-o-select-label]')].find(
            (el) => el.dataset.oSelectLabel === ringId,
          )
        : $('o-board');
      target?.focus({ preventScroll: true });
    };
    board.onpointerdown = (event) => {
      press = { x: event.clientX, y: event.clientY };
    };
    board.onpointercancel = () => {
      press = { cancelled: true };
    };
    board.onclick = (event) => {
      if (
        press &&
        (press.cancelled || Math.hypot(event.clientX - press.x, event.clientY - press.y) > 8)
      ) {
        press = null;
        return;
      }
      press = null;
      const label = event.target.closest?.('[data-o-select-label]');
      if (label) {
        choose(label.dataset.oSelectLabel, true);
        return;
      }
      const matrix = board.getScreenCTM();
      if (!matrix) return;
      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
      const scale = Math.hypot(matrix.a, matrix.b) || 1;
      const ringId = pickOrbitaRing(displayProjection.level, point, 18 / scale);
      if (ringId) choose(ringId);
    };
    board.onkeydown = (event) => {
      const label = event.target.closest?.('[data-o-select-label]');
      if (label && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        event.stopPropagation();
        if (!event.repeat) choose(label.dataset.oSelectLabel, true);
      }
    };
  }
  // Desenha o tabuleiro e associa os controles às ações da partida.
  function renderBoard(displayState = current()) {
    const holder = $('o-board-holder');
    if (!holder) return;
    const oldBoard = $('o-board'),
      boardHadFocus = oldBoard?.contains(document.activeElement) === true,
      selectionChanged = oldBoard?.dataset.oSelection !== selected;
    const scroll = $('o-board-scroll'),
      width = scroll.clientWidth || 600;
    const heightBudget = Math.max(280, Math.min(380, (globalThis.innerHeight || 768) * 0.44));
    displayWidth = width;
    displayProjection = projectOrbita(level, width, heightBudget);
    holder.innerHTML = renderOrbitaBoardMarkup(
      level,
      displayState,
      selectedCommand(),
      width,
      heightBudget,
    );
    bindRingSelection();
    scroll.setAttribute('aria-label', 'Tabuleiro completo de ÓRBITA');
    $('o-scroll-help').hidden = true;
    const sensorInfo = presentationBadges(displayProjection.level).sensors.map(
      (b) =>
        b.label +
        ': casa ' +
        (level.cells.findIndex((c) => c.id === b.cell) + 1) +
        ' pede ' +
        b.types.map((type) => orbitaSymbol(level, type)).join(' ou '),
    );
    let sensorLegend = $('o-sensor-legend');
    if (!sensorLegend) {
      sensorLegend = document.createElement('p');
      sensorLegend.id = 'o-sensor-legend';
      sensorLegend.className = 'o-board-legend';
      scroll.parentElement.append(sensorLegend);
    }
    sensorLegend.textContent = sensorInfo.join(' · ');
    sensorLegend.hidden = !sensorInfo.length;
    scrollObserver?.disconnect();
    if (globalThis.ResizeObserver) {
      scrollObserver = new ResizeObserver(() => {
        if (!animating && Math.abs(scroll.clientWidth - displayWidth) > 1) renderBoard();
      });
      scrollObserver.observe(scroll);
    }
    updateControls();
    if (boardHadFocus && !host.hidden) $('o-board')?.focus({ preventScroll: true });
  }
  // Anima o deslocamento visual correspondente à transição já calculada.
  async function animateMove(result, previous) {
    const reduced = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
    if (reduced) {
      renderBoard();
      return true;
    }
    const token = ++animationRevision;
    animating = true;
    renderBoard(previous);
    renderStatus();
    const pieces = result.movements.map((movement) => ({
      movement,
      element: $('o-chip-' + level.cells.findIndex((cell) => cell.id === movement.from)),
    }));
    const duration = Math.min(
        680,
        300 + Math.max(1, ...result.movements.map((movement) => Math.abs(movement.steps))) * 70,
      ),
      started = performance.now();
    return await new Promise((resolve) => {
      animationResolve = resolve;
      const frame = (now) => {
        if (token !== animationRevision || host.hidden) {
          animationResolve = null;
          resolve(false);
          return;
        }
        const fraction = Math.min(1, (now - started) / duration),
          eased = fraction * fraction * (3 - 2 * fraction);
        for (const { movement, element } of pieces) {
          const point = displayProjection.point(movementPoint(level, movement, eased));
          element?.setAttribute('transform', 'translate(' + point.x + ' ' + point.y + ')');
        }
        if (fraction < 1) animationFrame = requestAnimationFrame(frame);
        else {
          animationFrame = null;
          animationResolve = null;
          animating = false;
          renderBoard();
          resolve(true);
        }
      };
      animationFrame = requestAnimationFrame(frame);
    });
  }
  // Aplica o giro selecionado e apresenta o resultado da transição.
  async function rotate(command, { assisted = false, fromGuide = false } = {}) {
    if (!level || host.hidden || restart.isOpen || animating || (guided && !fromGuide))
      return false;
    const previous = current(),
      next = commitOrbitaCommand(level, session, command);
    if (!next.transition.allowed) {
      message = 'Este giro está bloqueado pelo sensor. Prepare a casa marcada antes de continuar.';
      renderStatus();
      return false;
    }
    const restoreFocus = preserveInteractionFocus();
    cancelAuto();
    cancelHint();
    hintPlan = null;
    answerPlan = null;
    hintTier = 0;
    hintText = '';
    revision++;
    motion?.clear();
    selected = command.command;
    session = next.session;
    if (assisted) session.assisted = true;
    observeMovement(missionAttempt, { cursor: session.cursor, human: !assisted && !fromGuide });
    if (isWon(level, current()) && missionAttempt?.official && missionAttempt.eligible) {
      if (!missionMinimums.has(level)) {
        const proof = proveMinimum(level, undefined, { maxStates: 20000, timeoutMs: 50, maxDepth: session.cursor });
        missionMinimums.set(level, proof.status === 'solved' && proof.optimal === true && proof.proof?.allShorterPathsExhausted === true ? proof.proof.minimumLength : null);
      }
      const wasFinished = missionAttempt.finished;
      const ids = finishMovement(missionAttempt, { game: 'orbita', won: true, cursor: session.cursor, provenMinimum: missionMinimums.get(level) });
      recordMissionUnlocks(ids);
      const best = newlyFinishedMovementBest(missionAttempt, { wasFinished, cursor: session.cursor });
      if (best !== null) {
        // Registra a vitória real antes do recorde, inclusive se a animação for interrompida.
        recordWin();
        data.campaign.completed[level.id] = { ...data.campaign.completed[level.id], humanBestMoves: best };
      }
    }
    message = moveName(command) + '. Todas as peças afetadas se moveram juntas.';
    log('rotate', { command: clone(command), moves: session.cursor });
    save();
    const finished = await animateMove(next.transition, previous);
    if (!finished || host.hidden) {
      restoreFocus(false);
      return false;
    }
    if (isWon(level, current())) {
      recordWin();
      motion.show('orbita', true);
      scheduleAuto();
    } else save();
    renderStatus();
    restoreFocus();
    return true;
  }
  // Restaura uma posição do histórico para desfazer ou refazer ações.
  function travelHistory(delta) {
    if (!session || restart.isOpen || animating) return;
    const next = session.cursor + delta;
    if (next < 0 || next >= session.states.length) return;
    const restoreFocus = preserveInteractionFocus();
    movementHistory(missionAttempt);
    invalidate();
    session.cursor = next;
    message =
      delta < 0
        ? 'Giro desfeito. Todas as peças e os sensores foram restaurados.'
        : 'Giro refeito.';
    log(delta < 0 ? 'undo' : 'redo');
    save();
    renderBoard();
    renderStatus();
    if (isWon(level, current())) motion.show('orbita', true);
    restoreFocus();
  }
  // Reinicia a tentativa depois da confirmação, preservando o progresso acumulado.
  function restartCurrentImmediately() {
    if (!session || host.hidden || screen !== 'play') return;
    missionAttempt = createMovementAttempt({
      official: missionAttempt?.official, fresh: true, clean: isWon(level, current()),
      priorBest: data.campaign.completed[level.id]?.humanBestMoves,
    });
    const old = session;
    cancelGeneration();
    invalidate();
    session = restoreOrbitaSession(level, null);
    session.winRecorded = old.winRecorded;
    session.failures = old.failures;
    session.assisted = old.assisted;
    selected = level.commands[0].id;
    message = '';
    log('restart');
    save();
    renderBoard();
    renderStatus();
    if (mode === 'endless') {
      generationStatus('');
      fillPrefetch();
    }
    $('o-board').focus({ preventScroll: true });
  }
  // Solicita o reinício da fase e mantém o fluxo de confirmação.
  function restartLevel(trigger) {
    if (!session || animating) return;
    cancelAuto();
    cancelHint();
    guided = false;
    const token = revision;
    restart.open({
      trigger,
      match: mode === 'endless',
      isCurrent: () => revision === token && !host.hidden && screen === 'play',
      onConfirm: restartCurrentImmediately,
      onCancel: scheduleAuto,
      fallbackFocus: () => $('o-board'),
    });
  }
  // Executa a confirmação solicitada usando as regras e a sessão atuais.
  function confirm() {
    if (!session || restart.isOpen || animating || guided) return;
    if (isWon(level, current())) {
      recordWin();
      message = 'Todos os alvos estão completos ao mesmo tempo.';
      motion.show('orbita', true);
      scheduleAuto();
    } else {
      session.failures++;
      message = 'Ainda faltam alvos. Você pode reorganizar as peças, desfazer ou pedir uma dica.';
      log('check', { complete: false });
      save();
      motion.show('orbita', false);
    }
    renderStatus();
  }
  // Atualiza mensagens, controles habilitados e indicadores da partida.
  function renderStatus() {
    if (!$('o-status')) return;
    const outcome = evaluateState(level, current()),
      busy = animating || guided;
    $('o-status').textContent =
      (animating
        ? 'Girando as peças…'
        : outcome.won
          ? 'Todos os alvos completos ao mesmo tempo. Parabéns!'
          : message) +
      (storageWarning
        ? ' O navegador não permitiu salvar. Mantenha esta página aberta para preservar a tentativa.'
        : '');
    $('o-status').classList.toggle('success', outcome.won && !animating);
    $('o-moves').textContent = String(session.cursor);
    $('o-matched').textContent = outcome.matched + ' / ' + outcome.total;
    $('o-undo').disabled = session.cursor === 0 || animating;
    $('o-redo').disabled = session.cursor === session.commands.length || animating;
    $('o-reset').disabled = animating;
    $('o-confirm').disabled = busy;
    $('o-hint').disabled = hintBusy || busy;
    $('o-answer').disabled = hintBusy || busy;
    $('o-answer').hidden = session.failures < 3;
    $('o-hint-text').textContent = hintText;
    $('o-hint-apply').hidden = !(hintTier === 3 && hintPlan?.context === stateKey(current()));
    $('o-hint-apply').disabled = busy;
    $('o-answer-apply').hidden = !(
      answerPlan?.context === stateKey(current()) && answerPlan.solution.length
    );
    $('o-answer-apply').disabled = busy;
    $('o-stop-guide').hidden = !guided;
    if ($('o-level-prev')) $('o-level-prev').disabled = index === 0;
    if ($('o-level-next')) $('o-level-next').disabled = index === CAMPAIGN.length - 1;
    $('o-next').disabled = mode === 'campaign' ? index === CAMPAIGN.length - 1 : generationBusy;
    if (mode === 'endless')
      $('o-kicker').textContent =
        'Modo Sem Parar · DESAFIO ' +
        data.endless.number +
        ' · ' +
        data.endless.solved +
        (data.endless.solved === 1 ? ' CONCLUÍDO' : ' CONCLUÍDOS');
    $('o-board')?.setAttribute('aria-busy', String(animating));
    updateControls();
  }
  function solutionValid(solution, state) {
    try {
      return Array.isArray(solution) && replay(level, solution, { state }).solved;
    } catch {
      return false;
    }
  }
  function analysisOptions() {
    return {
      history: clone(session.commands.slice(0, session.cursor)),
      initialSolution: level.solution,
    };
  }
  // Solicita a dica disponível para o estado atual da partida.
  async function hint() {
    if (!session || restart.isOpen || hintBusy || animating || guided) return;
    cancelAuto();
    if (isWon(level, current())) {
      hintText = 'Todos os alvos já estão completos. Você pode repetir a fase ou explorar outra.';
      renderStatus();
      return;
    }
    const context = stateKey(current());
    if (hintPlan?.context === context) {
      hintTier = Math.min(3, hintTier + 1);
      showHintTier();
      return;
    }
    cancelHint();
    const token = hintRevision,
      requestLevel = level,
      requestState = clone(current()),
      options = analysisOptions();
    hintBusy = true;
    hintText = 'Observando as passagens e os alvos desta posição…';
    renderStatus();
    try {
      const result = await advisor.analyze(requestLevel, requestState, options);
      if (
        token !== hintRevision ||
        host.hidden ||
        requestLevel !== level ||
        stateKey(current()) !== context
      )
        return;
      hintBusy = false;
      if (
        result.status === 'solved' &&
        result.solution?.length &&
        solutionValid(result.solution, current())
      ) {
        hintPlan = { context, solution: result.solution, optimal: result.optimal === true };
        hintTier = 1;
        showHintTier();
      } else {
        hintText =
          'A análise não terminou dentro do limite. Isso não torna a fase impossível. Você pode continuar explorando ou desfazer um giro.';
        renderStatus();
      }
      log('hint', { status: result.status, tier: hintTier });
      save();
    } catch (error) {
      if (token !== hintRevision) return;
      hintBusy = false;
      hintText = safeError(error) || 'A dica foi cancelada.';
      renderStatus();
    }
  }
  // Apresenta o próximo grau de detalhe da dica.
  function showHintTier() {
    if (!hintPlan || hintPlan.context !== stateKey(current())) return;
    const result = hintFromSolution(level, current(), hintPlan.solution, hintTier - 1);
    hintText = result.text;
    session.assisted = true;
    if (hintTier === 3) {
      selected = hintPlan.solution[0].command;
      renderBoard();
    }
    log('hint-layer', { tier: hintTier });
    save();
    renderStatus();
  }
  async function showAnswer() {
    if (!session || session.failures < 3 || hintBusy || restart.isOpen || animating || guided)
      return;
    cancelAuto();
    cancelHint();
    const token = hintRevision,
      context = stateKey(current()),
      requestLevel = level,
      options = analysisOptions();
    hintBusy = true;
    hintText = 'Procurando uma sequência a partir da posição atual…';
    renderStatus();
    try {
      const result = await advisor.analyze(requestLevel, clone(current()), options);
      if (
        token !== hintRevision ||
        requestLevel !== level ||
        host.hidden ||
        stateKey(current()) !== context
      )
        return;
      hintBusy = false;
      if (result.status === 'solved' && solutionValid(result.solution, current())) {
        answerPlan = { context, solution: result.solution, optimal: result.optimal === true };
        session.assisted = true;
        hintText = result.solution.length
          ? 'Uma solução a partir daqui: ' +
            result.solution.map(moveName).join(' → ') +
            '.' +
            (result.optimal
              ? ''
              : ' Esta sequência foi verificada; pode haver um caminho mais curto.')
          : 'Todos os alvos já estão completos.';
      } else
        hintText =
          'A busca não terminou dentro do limite. Você pode continuar explorando e desfazer normalmente.';
      save();
      renderStatus();
    } catch (error) {
      if (token !== hintRevision) return;
      hintBusy = false;
      hintText = safeError(error) || 'A análise foi cancelada.';
      renderStatus();
    }
  }
  // Aplica a resposta de referência após as verificações de disponibilidade.
  async function applyAnswer() {
    if (
      !answerPlan ||
      animating ||
      guided ||
      answerPlan.context !== stateKey(current()) ||
      !solutionValid(answerPlan.solution, current())
    )
      return;
    const solution = clone(answerPlan.solution),
      requestLevel = level;
    guided = true;
    cancelAuto();
    renderStatus();
    for (let i = 0; i < solution.length; i++) {
      if (!guided || level !== requestLevel || host.hidden) break;
      const applied = await rotate(solution[i], { assisted: true, fromGuide: true });
      if (!applied) break;
      if (guided) {
        hintText =
          'Gabarito: ' +
          (i + 1) +
          ' de ' +
          solution.length +
          ' giros aplicados. Você pode pausar ou desfazer depois.';
        renderStatus();
      }
    }
    if (level === requestLevel && !host.hidden) {
      guided = false;
      renderStatus();
      if (isWon(level, current())) {
        recordWin();
        motion.show('orbita', true);
        scheduleAuto();
      }
    }
  }
  // Troca a fase exibida conforme o comando de navegação.
  function navigate(delta) {
    if (mode === 'endless') {
      if (delta > 0) nextEndless();
      return;
    }
    if (mode === 'campaign' && index + delta >= 0 && index + delta < CAMPAIGN.length)
      startCampaign(index + delta);
  }
  // Converte as teclas aceitas em ações do jogo.
  function keyboard(event) {
    if (
      host.hidden ||
      screen !== 'play' ||
      !level ||
      restart.isOpen ||
      event.defaultPrevented ||
      document.querySelector('dialog[open]') ||
      !host.contains(event.target)
    )
      return;
    if (
      event.target.closest?.(
        'input,textarea,select,[contenteditable]:not([contenteditable="false"]),summary,a',
      )
    )
      return;
    if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      if (!event.repeat) travelHistory(event.shiftKey ? 1 : -1);
      return;
    }
    if (event.key === 'Escape' && guided) {
      event.preventDefault();
      guided = false;
      hintText = 'Sequência pausada.';
      renderStatus();
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.repeat && ['Enter', ' ', 'Spacebar'].includes(event.key)) {
      event.preventDefault();
      return;
    }
    if (/^[1-9]$/.test(event.key)) {
      const next = level.commands[Number(event.key) - 1];
      if (next) {
        event.preventDefault();
        selectCommand(next.id);
      }
      return;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (animating || guided || !commandStatus(level, current(), selectedCommand().id).allowed)
        return;
      event.preventDefault();
      if (!event.repeat)
        rotate({ command: selected, direction: event.key === 'ArrowRight' ? 1 : -1 });
    }
  }
  // Monta os controles de edição e importação disponíveis no modo avançado.
  function advancedMarkup() {
    return (
      '<h3>Opções avançadas</h3><p>Crie uma fase local ou exporte o desafio atual. A verificação confere os anéis, as peças, os alvos e uma solução antes de jogar.</p><label for="o-editor-json">Dados da fase</label><textarea id="o-editor-json" rows="14" maxlength="200000" spellcheck="false"></textarea><button id="o-editor-check">Verificar fase</button><button id="o-editor-play">Jogar fase editada</button><p id="o-editor-status" role="status" aria-live="polite"></p><button id="o-export">Exportar fase JSON</button>' +
      (mode === 'endless'
        ? '<p class="collection-small">Seed: ' +
          data.endless.current.seed +
          ' · Gerador: ' +
          esc(data.endless.current.generatorVersion) +
          '. A definição deste desafio fica salva para retomada.</p>'
        : '')
    );
  }
  // Seleciona os campos da definição que podem ser exportados como dados.
  function cleanLevel(input) {
    return { ...clone(input), game: 'orbita' };
  }
  function download(name, value) {
    const url = URL.createObjectURL(
        new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }),
      ),
      link = document.createElement('a');
    link.href = url;
    link.download = name.replace(/[^a-zA-Z0-9._-]/g, '-');
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function bindAdvanced() {
    $('o-editor-json').value = JSON.stringify(cleanLevel(level), null, 2);
    $('o-editor-json').oninput = () => {
      importRevision++;
      cancelHint();
      $('o-editor-status').textContent = 'JSON alterado. Verifique novamente antes de jogar.';
    };
    $('o-editor-check').onclick = () =>
      verifyCustom($('o-editor-json'), $('o-editor-status'), false);
    $('o-editor-play').onclick = () => verifyCustom($('o-editor-json'), $('o-editor-status'), true);
    $('o-export').onclick = () => download('orbita-' + level.id + '.json', cleanLevel(level));
  }
  function importPanel() {
    return (
      '<details class="level-json-import json-import-disclosure" aria-labelledby="o-import-title"><summary id="o-import-title">Adicionar seu próprio nível em JSON</summary><p>Escolha um arquivo de ÓRBITA. A verificação acontece neste navegador e preserva sua partida se o arquivo não for válido.</p><label class="file-button">Importar fase JSON<input id="o-import-file" type="file" accept="application/json,.json" aria-describedby="o-import-help o-import-status"></label><p id="o-import-help" class="collection-small">Máximo de 200 KB. Inclua anéis, casas, peças, alvos e uma sequência de solução.</p><details><summary>Formato e exemplo de ÓRBITA</summary><p>Uma casa compartilhada usa o mesmo identificador nos dois anéis. O exemplo inclui todos os campos necessários e sua solução.</p><pre>' +
      esc(JSON.stringify(cleanLevel(CAMPAIGN[0]), null, 2)) +
      '</pre><button id="o-import-example">Baixar exemplo JSON</button></details><details><summary>Colar JSON</summary><label for="o-import-json">Dados do nível personalizado</label><textarea id="o-import-json" rows="10" maxlength="200000" spellcheck="false"></textarea><button id="o-import-paste">Verificar e jogar JSON</button></details><p id="o-import-status" role="status" aria-live="polite"></p></details>'
    );
  }
  function bindImport() {
    $('o-import-example').onclick = () => download('orbita-exemplo.json', cleanLevel(CAMPAIGN[0]));
    $('o-import-paste').onclick = () =>
      verifyCustom($('o-import-json'), $('o-import-status'), true);
    $('o-import-json').oninput = () => {
      importRevision++;
      cancelHint();
      $('o-import-status').textContent =
        'JSON alterado. Clique em Verificar e jogar JSON quando terminar.';
    };
    $('o-import-file').onchange = async (event) => {
      const input = event.target,
        file = input.files?.[0];
      if (!file) return;
      const target = $('o-import-status'),
        token = ++importRevision;
      target.textContent = 'Lendo o arquivo…';
      try {
        if (file.size > 200000) throw Error('Arquivo muito grande. O limite é 200 KB.');
        const text = await file.text();
        if (token !== importRevision || !target.isConnected || host.hidden) return;
        await verifyCustom({ value: text }, target, true);
      } catch (error) {
        if (token === importRevision && target.isConnected) target.textContent = safeError(error);
      } finally {
        input.value = '';
      }
    };
  }
  // Verifica se a fase importada pode ser usada pelo jogo.
  async function verifyCustom(input, target, play) {
    if (animating || guided) return;
    cancelHint();
    cancelAuto();
    const token = ++importRevision,
      text = input.value,
      requestRevision = revision;
    target.textContent = 'Verificando anéis, alvos e solução…';
    const currentRequest = () =>
      token === importRevision &&
      requestRevision === revision &&
      !host.hidden &&
      target.isConnected &&
      input.value === text;
    try {
      if (new Blob([text]).size > 200000) throw Error('Arquivo muito grande. O limite é 200 KB.');
      const candidate = JSON.parse(text);
      if (!record(candidate)) throw Error('O JSON precisa conter uma fase de ÓRBITA.');
      if (!isCircularGeneration(candidate))
        throw Error('Use apenas anéis circulares; percursos orgânicos e elipses não são aceitos.');
      if (candidate.game && candidate.game !== 'orbita')
        throw Error('Este arquivo pertence a outro jogo. Use uma fase de ÓRBITA.');
      const checked = validateLevel(candidate);
      if (!checked.valid) throw Error(checked.errors.slice(0, 4).join(' '));
      const presentation = validateOrbitaPresentation(candidate);
      if (!presentation.valid) throw Error(presentation.errors.slice(0, 4).join(' '));
      if (isWon(candidate, initialState(candidate)))
        throw Error('A fase já começa resolvida. Escolha outra configuração inicial.');
      let solution = candidate.solution,
        verified = false;
      try {
        verified = Array.isArray(solution) && replay(candidate, solution).solved;
      } catch {}
      if (!verified) {
        const result = await advisor.analyze(candidate, initialState(candidate));
        if (!currentRequest()) return;
        if (result.status !== 'solved' || !replay(candidate, result.solution).solved)
          throw Error(
            'A busca não terminou com uma solução verificada. Inclua uma sequência válida ou simplifique a fase.',
          );
        solution = result.solution;
      }
      if (!currentRequest()) return;
      candidate.solution = solution;
      candidate.name = String(candidate.name ?? 'Anéis personalizados');
      candidate.id =
        'custom-' +
        String(candidate.id ?? 'orbita')
          .replace(/[^a-zA-Z0-9_-]/g, '')
          .slice(0, 60);
      candidate.difficulty = bounded(candidate.difficulty, 0, 4);
      target.textContent =
        'Fase válida. Uma solução com ' +
        solution.length +
        ' ' +
        (solution.length === 1 ? 'giro' : 'giros') +
        ' foi reproduzida. Outras sequências que completem os alvos também são aceitas.';
      if (play) {
        save();
        cancelGeneration();
        daily = false;
        start(candidate, { mode: 'custom', fresh: true });
      }
    } catch (error) {
      if (currentRequest()) target.textContent = safeError(error);
    }
  }
  const resizeBoard = () => {
    if (!host.hidden && !animating && $('o-board-holder')) renderBoard();
  };
  host.addEventListener('keydown', keyboard);
  globalThis.addEventListener('pagehide', save);
  globalThis.addEventListener('resize', resizeBoard);
  // Encerra tarefas e libera os recursos associados à interface.
  function destroy() {
    save();
    cancelGeneration();
    invalidate();
    generator.destroy();
    advisor.destroy();
    host.removeEventListener('keydown', keyboard);
    globalThis.removeEventListener('pagehide', save);
    globalThis.removeEventListener('resize', resizeBoard);
  }
  return { activate, hide, destroy, isOpen, restoreOnLoad };
}
