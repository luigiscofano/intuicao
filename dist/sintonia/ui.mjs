import { levelCompletionState } from "../level-completion-state.mjs";
import { campaignLevelName } from "../campaign-level-names.mjs";
import {createMovementAttempt,startMovementAttempt,serializeMovementAttempt,movementHistory,observeMovement,finishMovement,sintoniaBatonPass} from '../achievements/movement-missions.mjs';
import {recordMissionUnlocks} from '../achievements/mission-store.mjs';
import { writeProgress } from '../progress-write-guard.mjs';
// Interface de SINTONIA: tabuleiros, comandos, mecanismos, dicas e progresso.
import { rulesPreviewMarkup } from '../rules-preview.mjs';
import { selectAccessoryPalette } from './accessory-palette.mjs';
import { sceneryIcon } from './scenery.mjs';
import { accessoryIcon, accessoryEdgeIcon, wallOverlay } from './accessory-art.mjs';
import { CAMPAIGN, CHAPTERS, DIFFICULTIES, CONTENT_REVISION } from './campaign.mjs';
import { removedSintoniaMechanics, validateActiveSintoniaLevel } from './active-rules.mjs';
import {
  RULES_VERSION,
  DIRECTIONS,
  initialState,
  transition,
  isWon,
  stateKey,
  replay,
  gateIsOpen,
} from './engine.mjs';
import {
  createSintoniaService,
  restoreSintoniaSession,
  serializeSintoniaSession,
  commitSintoniaCommand,
  resolveSintoniaCampaignAttempt,
  isRetainedSintoniaAttempt,
  levelContentRevision,
  previouslyLearnedSintoniaMechanics,
  resolveArchivedSintoniaAttempt,
  archivedSintoniaLevel,
  sintoniaDefinitionKey,
  persistableSintoniaLevel,
} from './service.mjs';
export {
  restoreSintoniaSession,
  serializeSintoniaSession,
  commitSintoniaCommand,
} from './service.mjs';
import { ANIMAL_SPRITES, ANIMAL_NAMES, resolveAnimalRoster } from './animal-roster.mjs';
import { createRestartConfirmation } from '../restart-confirmation.mjs';
import { createResultMotion } from '../result-motion.mjs';
import { dailyIndex, recordEvent } from '../collection-state.mjs';

// Milestones describe this campaign only. Endless receives learned mechanic names,
// never ordinal thresholds from an archived campaign.
export const SINTONIA_CAMPAIGN_MILESTONES = Object.freeze(
  Object.fromEntries(
    [...new Set(CAMPAIGN.flatMap((level) => level.mechanics ?? []))].map((id) => [
      id,
      CAMPAIGN.findIndex((level) => level.mechanics?.includes(id)) + 1,
    ]),
  ),
);

const STORE = 'intuicao.sintonia.v1';
const DIRECTIONS_UI = {
  up: ['↑', 'cima'],
  right: ['→', 'direita'],
  down: ['↓', 'baixo'],
  left: ['←', 'esquerda'],
};
const MECHANIC_TEXT = {
  walls: [
    'Paredes e recuos',
    'Uma parede mantém um animal parado naquela direção, enquanto os outros continuam.',
  ],
  plate: [
    'Placas de pressão',
    'Um animal sobre uma placa mantém a cancela correspondente aberta. A abertura deste comando é a que existia antes de todos se moverem.',
  ],
  switch: [
    'Interruptores',
    'Entrar e terminar sobre o interruptor alterna sua cancela. Sair não desfaz a mudança; ficar parado não aciona de novo.',
  ],
  key: [
    'Chaves',
    'Terminar sobre uma chave abre sua cancela permanentemente nesta tentativa. Desfazer também restaura a chave.',
  ],
  ice: [
    'Gelo',
    'Ao entrar no gelo, o animal desliza na direção escolhida até a primeira casa comum ou um bloqueio. Tudo conta como um comando.',
  ],
  alternate: [
    'Cancelas alternativas',
    'O mesmo interruptor alterna dois grupos: sol e lua. Quando um abre, o outro fecha.',
  ],
  handoff: [
    'Revezamento',
    'Um animal pode assumir o apoio que outro precisa abandonar. Prepare a troca antes de sair.',
  ],
  and: [
    'Duas condições',
    'Esta cancela só abre quando as duas placas indicadas estão ocupadas ao mesmo tempo.',
  ],
};
const esc = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );
const clone = (value) => structuredClone(value);
const bounded = (value, min, max, fallback = min) =>
  Number.isInteger(value) && value >= min && value <= max ? value : fallback;
const coordinate = (cell, board) =>
  `linha ${Math.floor(cell / board.cols) + 1}, coluna ${(cell % board.cols) + 1}`;
const shortNumber = (value) => String(value).padStart(2, '0');
const lessonText = (level) =>
  String(level.lesson ?? 'Prepare os caminhos em conjunto.')
    .replace(/^Aqui o jogador precisa descobrir que\s+/i, 'Descoberta deste nível: ')
    .replace(/Animal ou caixa sobre uma placa/g, 'Um animal sobre uma placa');

/** Apenas navegação editorial: não transfere histórico nem conclusões. */
export function updatedSintoniaCampaignIndex(id, saved) {
  const current = CAMPAIGN.findIndex((item) => item.id === id);
  if (current >= 0) return current;
  const old =
    (saved ? archivedSintoniaLevel(id, saved) : null) ??
    archivedSintoniaLevel(id, { contentRevision: 'sintonia-content-4' }) ??
    archivedSintoniaLevel(id, { contentRevision: 'sintonia-content-3' });
  const number = Number(old?.number);
  return Number.isInteger(number) && number >= 1 && number <= CAMPAIGN.length ? number - 1 : 0;
}

export function freshSintoniaData() {
  return {
    version: 1,
    rulesVersion: RULES_VERSION,
    contentRevision: CONTENT_REVISION,
    prefs: { advanced: false, rulesOpen: true, coordinates: false, autoAdvance: true },
    campaign: { lastId: null, completed: {}, sessions: {}, archivedCompleted: {} },
    archivedAttempts: {},
    endless: null,
    custom: null,
    learnedMechanics: [],
    events: [],
    lastView: { active: false, screen: 'selection', mode: 'campaign' },
  };
}

export function normalizeSintoniaData(value) {
  const data = freshSintoniaData();
  if (!value || value.version !== 1 || typeof value !== 'object') return data;
  data.archivedAttempts =
    value.archivedAttempts &&
    typeof value.archivedAttempts === 'object' &&
    !Array.isArray(value.archivedAttempts)
      ? clone(value.archivedAttempts)
      : {};
  data.prefs = {
    ...data.prefs,
    ...Object.fromEntries(
      Object.entries(value.prefs ?? {}).filter(
        ([key, val]) => key in data.prefs && typeof val === 'boolean',
      ),
    ),
  };
  if (value.campaign && typeof value.campaign === 'object') {
    data.campaign.lastId = typeof value.campaign.lastId === 'string' ? value.campaign.lastId : null;
    data.campaign.completed =
      value.campaign.completed &&
      typeof value.campaign.completed === 'object' &&
      !Array.isArray(value.campaign.completed)
        ? value.campaign.completed
        : {};
    data.campaign.archivedCompleted =
      value.campaign.archivedCompleted &&
      typeof value.campaign.archivedCompleted === 'object' &&
      !Array.isArray(value.campaign.archivedCompleted)
        ? { ...value.campaign.archivedCompleted }
        : {};
    data.campaign.completed = { ...data.campaign.completed };
    for (const [id, completed] of Object.entries(data.campaign.completed)) {
      const current = CAMPAIGN.find((item) => item.id === id);
      const source =
        value.contentRevision === CONTENT_REVISION
          ? current
          : archivedSintoniaLevel(id, { contentRevision: value.contentRevision });
      const definitionKey =
        completed.definitionKey ?? (source ? sintoniaDefinitionKey(source) : null);
      if (!current || !definitionKey || definitionKey !== sintoniaDefinitionKey(current)) {
        data.campaign.archivedCompleted[`${value.contentRevision ?? 'sintonia-content-1'}:${id}`] =
          {
            id,
            contentRevision: value.contentRevision ?? 'sintonia-content-1',
            definitionKey,
            result: completed,
          };
        delete data.campaign.completed[id];
      } else data.campaign.completed[id] = { ...completed, definitionKey };
    }
    data.campaign.sessions =
      value.campaign.sessions &&
      typeof value.campaign.sessions === 'object' &&
      !Array.isArray(value.campaign.sessions)
        ? value.campaign.sessions
        : {};
  }
  if (value.endless && typeof value.endless === 'object' && value.endless.current?.level)
    data.endless = {
      ...value.endless,
      version: 1,
      baseSeed: bounded(value.endless.baseSeed, 0, 0xffffffff),
      startDifficulty: bounded(value.endless.startDifficulty, 0, 5),
      number: bounded(value.endless.number, 1, Number.MAX_SAFE_INTEGER, 1),
      solved: bounded(value.endless.solved, 0, Number.MAX_SAFE_INTEGER),
      recentSignatures: Array.isArray(value.endless.recentSignatures)
        ? value.endless.recentSignatures.filter((value) => typeof value === 'string').slice(-24)
        : [],
      recentFamilies: Array.isArray(value.endless.recentFamilies)
        ? value.endless.recentFamilies.filter((value) => typeof value === 'string').slice(-24)
        : typeof value.endless.current.level.family === 'string'
          ? [value.endless.current.level.family]
          : [],
    };
  if (value.custom && typeof value.custom === 'object') data.custom = value.custom;
  // Arquivos nunca são reinterpretados como fases reformuladas. O conteúdo fica inerte.
  for (const [id, saved] of Object.entries(data.campaign.sessions)) {
    const old = archivedSintoniaLevel(id, saved),
      current = CAMPAIGN.find((item) => item.id === id);
    if (
      !current ||
      !old ||
      !validateActiveSintoniaLevel(old).valid ||
      sintoniaDefinitionKey(old) !== sintoniaDefinitionKey(current)
    ) {
      const key = `campaign:${saved.contentRevision ?? value.contentRevision ?? 'legacy'}:${id}`;
      data.archivedAttempts[key] ??= {
        kind: 'campaign',
        id,
        source: 'campaign.sessions',
        ...(!saved.level && old ? { level: persistableSintoniaLevel(old) } : {}),
      };
    }
  }
  for (const kind of ['endless', 'custom']) {
    const record = data[kind],
      old = kind === 'endless' ? record?.current?.level : record?.level;
    if (old && !validateActiveSintoniaLevel(old).valid)
      data.archivedAttempts[`${kind}:${levelContentRevision(old)}:${old.id}`] = {
        kind,
        record: clone(record),
      };
  }
  data.learnedMechanics = previouslyLearnedSintoniaMechanics(value, CAMPAIGN).filter(
    (x) => typeof x === 'string' && x in MECHANIC_TEXT,
  );
  data.events = Array.isArray(value.events) ? value.events.slice(-500) : [];
  if (value.lastView && typeof value.lastView === 'object')
    data.lastView = {
      active: value.lastView.active === true,
      screen: value.lastView.screen === 'play' ? 'play' : 'selection',
      mode: ['campaign', 'endless', 'custom', 'archive'].includes(value.lastView.mode)
        ? value.lastView.mode
        : 'campaign',
    };
  return data;
}

export function endlessOptions(
  startDifficulty,
  solved,
  learnedMechanics = [],
  recentSignatures = [],
  recentFamilies = [],
) {
  const base = bounded(startDifficulty, 0, 5),
    wins = bounded(solved, 0, Number.MAX_SAFE_INTEGER);
  const rising = Math.min(5, base + Math.floor(wins / 8));
  const difficulty = Math.max(0, rising - (wins > 0 && wins % 5 === 4 ? 1 : 0));
  return {
    difficulty,
    ...(wins % 4 === 3 ? { animals: 2 } : {}),
    learnedMechanics: [...new Set(learnedMechanics)],
    recentSignatures: recentSignatures.slice(-24),
    recentFamilies: recentFamilies.filter((value) => typeof value === 'string').slice(-24),
    maxStates: 120000,
    maxMs: 1600,
  };
}

function relationModel(level) {
  const labels = new Map(),
    relations = [];
  const add = (key, label, text, kind, id) => {
    if (!labels.has(key)) {
      labels.set(key, label);
      relations.push({ key, label, text, kind, id });
    }
  };
  const counts = { plate: 0, switch: 0, key: 0, selector: 0, portal: 0, delivery: 0 };
  for (const board of level.boards) {
    for (const item of board.plates ?? [])
      add(`plate:${item.id}`, `P${++counts.plate}`, 'Placa de pressão', 'plate', item.id);
    for (const item of board.switches ?? []) {
      const key = `switch:${item.group}`;
      if (!labels.has(key)) add(key, `I${++counts.switch}`, 'Interruptor', 'switch', item.group);
    }
    for (const item of board.keys ?? [])
      add(`key:${item.id}`, `C${++counts.key}`, 'Chave permanente', 'key', item.id);
    for (const item of board.selectors ?? []) {
      const key = `selector:${item.group}`;
      if (!labels.has(key))
        add(key, `S${++counts.selector}`, 'Seletor de conexão', 'selector', item.group);
    }
    for (const item of board.portals ?? [])
      add(
        `portal:${board.id}:${item.id}`,
        `O${++counts.portal}`,
        'Par de portais',
        'portal',
        item.id,
      );
  }
  for (const item of level.channels ?? [])
    add(`delivery:${item.id}`, `E${++counts.delivery}`, 'Canal de entrega', 'delivery', item.id);
  return { labels, relations };
}

function conditionKeys(condition) {
  if (condition.type === 'plate') return [`plate:${condition.id}`];
  if (condition.type === 'all') return condition.ids.map((id) => `plate:${id}`);
  if (condition.type === 'switch') return [`switch:${condition.id}`];
  if (condition.type === 'key') return [`key:${condition.id}`];
  if (condition.type === 'selected')
    return [`plate:${condition.plate}`, `selector:${condition.selector}`];
  return [];
}

function conditionLabel(condition, model) {
  const label = (key) => model.labels.get(key) ?? '?';
  if (condition.type === 'all') return condition.ids.map((id) => label(`plate:${id}`)).join('+');
  if (condition.type === 'switch')
    return `${label(`switch:${condition.id}`)}${condition.value ? '☀' : '☾'}`;
  if (condition.type === 'selected')
    return `${label(`plate:${condition.plate}`)}·${condition.value ? 'B' : 'A'}`;
  return conditionKeys(condition).map(label).join('·');
}

export function initSintonia({ hideOtherGames }) {
  let host = document.getElementById('sintonia');
  if (!host) {
    host = document.createElement('section');
    host.id = 'sintonia';
    host.hidden = true;
    host.setAttribute('aria-label', 'SINTONIA');
    document.querySelector('main').appendChild(host);
  }
  const $ = (id) => host.querySelector(`#${id}`);
  let data;
  try {
    data = normalizeSintoniaData(JSON.parse(localStorage.getItem(STORE) || 'null'));
  } catch {
    data = freshSintoniaData();
  }
  let missionAttempt = null;
  let level = null,
    session = null,
    mode = 'campaign',
    index = 0,
    screen = 'selection',
    daily = false;
  // Cosmetic identities stay separate from the certified level and history.
  let animalRoster = [],
    accessoryPalette = 'C';
  const animalKey = (board) => animalRoster[level?.boards.indexOf(board)] ?? board.animal;
  const animalName = (board) => ANIMAL_NAMES[animalKey(board)] ?? 'Animal';
  let rulesOpen = true,
    advanced = data.prefs.advanced,
    motion = null,
    storageWarning = false;
  let message = '',
    hintText = '',
    hintTier = 0,
    hintPlan = null,
    hintBusy = false,
    answerPlan = null,
    inspectKey = '',
    model = null;
  let revision = 0,
    hintRevision = 0,
    generationRevision = 0,
    importRevision = 0,
    autoTimer = null,
    generationBusy = false;
  let recentDirection = '',
    prefetch = [],
    prefetchTask = null;
  const generator = createSintoniaService(),
    advisor = createSintoniaService();
  const restart = createRestartConfirmation('restart-sintonia');
  const current = () => session?.states[session.cursor];
  const isOpen = () => !host.hidden;
  const log = (type, extra = {}) =>
    recordEvent(data, type, { game: 'sintonia', mode, level: level?.id, ...extra });
  const seedNow = () => {
    const a = new Uint32Array(1);
    if (globalThis.crypto?.getRandomValues) crypto.getRandomValues(a);
    else a[0] = (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
    return a[0];
  };
  const makeSeed = (base, number) => (base + Math.imul(number, 0x9e3779b9)) >>> 0;
  const difficultyName = (value) => DIFFICULTIES[bounded(value, 0, 5)] ?? 'Muito fácil';
  const statusCount = () =>
    level.boards.reduce((n, board, i) => n + (current().positions[i] === board.goal ? 1 : 0), 0);
  const safeError = (error) =>
    error?.name === 'AbortError'
      ? ''
      : error instanceof SyntaxError
        ? 'JSON inválido. Confira aspas, vírgulas e colchetes.'
        : (error?.message ?? 'Não foi possível concluir esta ação.');

  // Grava o progresso e as preferências da sessão atual.
  function save() {
    if (level && session) {
      const saved = {
        ...serializeSintoniaSession(session), animalRoster: animalRoster.slice(),
        movementMission: serializeMovementAttempt(missionAttempt, { session, definition: sintoniaDefinitionKey(level) }),
      };
      if (mode === 'campaign' || mode === 'archive') {
        for (const record of Object.values(data.archivedAttempts)) {
          if (
            record.source === 'campaign.sessions' &&
            record.id === level.id &&
            data.campaign.sessions[level.id]
          ) {
            record.saved = clone(data.campaign.sessions[level.id]);
            delete record.source;
            if (record.saved.level) delete record.level;
          }
        }
        data.campaign.lastId = level.id;
        data.campaign.sessions[level.id] = saved;
      } else if (mode === 'endless' && data.endless?.current?.level?.id === level.id)
        data.endless.current.session = saved;
      else if (mode === 'custom') data.custom = { level: clone(level), session: saved };
    }
    data.prefs.advanced = advanced;
    try {
      writeProgress(localStorage, STORE, JSON.stringify(data));
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
  // Invalida resultados pendentes antes de atualizar a tentativa.
  function invalidate() {
    revision++;
    cancelAuto();
    cancelHint();
    importRevision++;
    restart.dismiss();
    motion?.clear();
    hintPlan = null;
    answerPlan = null;
    hintTier = 0;
    hintText = '';
    inspectKey = '';
  }
  // Cancela tarefas de geração que não pertencem mais à sessão atual.
  function cancelGeneration() {
    generationRevision++;
    generator.cancel();
    generationBusy = false;
    prefetch = [];
    prefetchTask = null;
  }

  function hide() {
    save();
    cancelGeneration();
    invalidate();
    host.hidden = true;
    data.lastView.active = false;
    save();
    host.querySelector('.sintonia-lab')?.setAttribute('hidden', '');
    document.querySelector('[data-sintonia]')?.setAttribute('aria-pressed', 'false');
  }

  function showHost() {
    hideOtherGames();
    host.hidden = false;
    data.lastView.active = true;
    document
      .querySelectorAll('[data-game],[data-collection]')
      .forEach((button) => button.setAttribute('aria-pressed', 'false'));
    document.querySelector('[data-sintonia]')?.setAttribute('aria-pressed', 'true');
  }

  function open() {
    showHost();
    selection();
  }

  function restoreOnLoad() {
    if (!data.lastView.active || data.lastView.screen !== 'play') return false;
    const viewMode = data.lastView.mode;
    showHost();
    if (viewMode === 'endless' && data.endless?.current?.level) {
      resumeEndless();
      return true;
    }
    if (viewMode === 'custom' && data.custom?.level) {
      const verified = validateActiveSintoniaLevel(data.custom.level);
      if (verified.valid) {
        start(data.custom.level, { mode: 'custom', saved: data.custom.session });
        return true;
      }
      selection();
      $('s-selection-status').textContent =
        'Sua fase personalizada foi preservada em arquivo inerte. ' +
        verified.errors.join(' ') +
        ' Escolha uma fase atual ou importe outra definição.';
      return true;
    }
    const last = CAMPAIGN.findIndex((item) => item.id === data.campaign.lastId);
    if (last >= 0) {
      startCampaign(last);
      return true;
    }
    const archived = resolveArchivedSintoniaAttempt(
      data.campaign.lastId,
      data.campaign.sessions[data.campaign.lastId],
    );
    selection();
    if (archived.status === 'blocked')
      $('s-selection-status').textContent =
        'Sua tentativa anterior foi preservada em arquivo inerte. Esse mapa não segue mais as regras atuais; escolha uma fase atual abaixo.';
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
    data.lastView = { active: true, screen, mode: 'campaign' };
    const endlessSaved =
      !!data.endless?.current?.level &&
      validateActiveSintoniaLevel(data.endless.current.level).valid;
    const archivedCount = Object.keys(data.archivedAttempts).length;
    host.innerHTML = `<div class="level-screen sintonia-selection"><p class="eyebrow">COLEÇÃO LÓGICA</p><h2 id="s-selection-title" tabindex="-1">SINTONIA ·</h2><p>Um comando, vários caminhos. Leve todos os animais aos seus destinos usando as mesmas setas.</p><div class="collection-toolbar selection-actions" role="group" aria-label="Ações do jogo"><button id="s-endless-entry" class="primary">Explorar modo livre</button><button id="s-daily" class="primary">Desafio de hoje</button></div><p id="s-selection-status" role="status" aria-live="polite">${archivedCount ? 'Tentativas anteriores preservadas em arquivo inerte. As fases reformuladas começam sem herdar conclusões; escolha um desafio atual para jogar.' : ''}</p>${archivedCount ? '<button id="s-current-entry" type="button">Abrir uma fase atual</button>' : ''}${rulesPreviewMarkup('sintonia')}<div id="s-catalog">${CHAPTERS.map(
      (name, chapter) =>
        `<section class="s-chapter" aria-label="${esc(name)}"><h3 class="stage-heading">${shortNumber(chapter + 1)} · ${esc(name)} <small>Níveis ${chapter * 15 + 1}–${Math.min(chapter * 15 + 15, CAMPAIGN.length)}</small></h3><div class="level-group">${CAMPAIGN.slice(
          chapter * 15,
          chapter * 15 + 15,
        )
          .map((item, offset) => {
            const number = chapter * 15 + offset + 1,
              done = data.campaign.completed[item.id],
              current = item.id === data.campaign.lastId;
            return `<button class="level-tile ${done ? 'done' : ''}" data-completion-state="${levelCompletionState(done, done?.assisted)}" data-s-level="${number - 1}" aria-label="Nível ${number}, ${esc(difficultyName(item.difficulty))}, ${item.boards.length} animais, ${done ? 'concluído' : 'disponível'}" ${current ? 'aria-current="true"' : ''}><span>${number}</span><small>${done ? (done.assisted ? '✓ assistido' : '✓ concluído') : current ? 'atual' : 'explorar'}</small></button>`;
          })
          .join('')}</div></section>`,
    ).join('')}</div>${importPanel()}</div>`;
    host
      .querySelectorAll('[data-s-level]')
      .forEach((button) => (button.onclick = () => startCampaign(Number(button.dataset.sLevel))));
    if ($('s-current-entry'))
      $('s-current-entry').onclick = () =>
        startCampaign(
          updatedSintoniaCampaignIndex(
            data.campaign.lastId,
            data.campaign.sessions[data.campaign.lastId],
          ),
        );
    $('s-daily').onclick = () =>
      startCampaign(
        dailyIndex('sintonia', new Date().toLocaleDateString('sv-SE'), CAMPAIGN.length),
        true,
      );
    $('s-endless-entry').onclick = () =>
      endlessSaved ? resumeEndless() : newEndless(bounded(data.endless?.startDifficulty, 0, 5));
    bindImport();
    save();
    $('s-selection-title').focus({ preventScroll: true });
  }

  // Localiza a fase da campanha e inicia sua sessão.
  function startCampaign(next, dailyChallenge = false) {
    if (!CAMPAIGN[next]) return;
    save();
    cancelGeneration();
    index = next;
    daily = dailyChallenge;
    const attempt = resolveSintoniaCampaignAttempt(
      CAMPAIGN[next],
      data.campaign.sessions[CAMPAIGN[next].id],
    );
    if (attempt.status === 'blocked') {
      selection();
      const token = revision;
      $('s-selection-status').textContent =
        'A tentativa anterior foi preservada, mas não foi possível recuperar seu mapa e histórico com segurança. Você pode cancelar ou reiniciar somente este nível na versão atual.';
      restart.open({
        isCurrent: () => revision === token && !host.hidden && screen === 'selection',
        onConfirm: () => {
          index = next;
          daily = dailyChallenge;
          start(CAMPAIGN[next], {
            mode: 'campaign',
            fresh: true,
            notice:
              'Somente esta tentativa foi reiniciada no mapa atual. Suas conclusões foram mantidas.',
          });
        },
        fallbackFocus: () => $('s-selection-title'),
      });
      describeContentRestart();
      return;
    }
    start(attempt.level, { mode: 'campaign', saved: attempt.saved });
  }

  // Prepara a fase selecionada e sua apresentação.
  function start(
    next,
    { mode: nextMode = 'campaign', saved = null, fresh = false, notice = '' } = {},
  ) {
    const activeCheck = validateActiveSintoniaLevel(next);
    if (!activeCheck.valid) {
      selection();
      $('s-selection-status').textContent =
        'Tentativa preservada em arquivo inerte. ' +
        activeCheck.errors.join(' ') +
        ' Escolha uma fase atual para jogar.';
      return;
    }
    invalidate();
    level = next;
    mode = nextMode;
    screen = 'play';
    model = relationModel(level);
    recentDirection = '';
    session = restoreSintoniaSession(level, fresh ? null : saved);
    missionAttempt = startMovementAttempt({
      session, saved, reset: fresh, definition: sintoniaDefinitionKey(level),
      validateBaton: (i) => sintoniaBatonPass(level, session.states[i], transition(level, session.states[i], session.commands[i])),
      official: mode === 'campaign' && CAMPAIGN.some((item) => item.id === level.id && sintoniaDefinitionKey(item) === sintoniaDefinitionKey(level)),
    });
    animalRoster = resolveAnimalRoster(level.boards.length, fresh ? null : saved?.animalRoster);
    accessoryPalette = selectAccessoryPalette(level, animalRoster);
    const unknown = (level.mechanics ?? []).filter(
      (id) => id in MECHANIC_TEXT && !data.learnedMechanics.includes(id),
    );
    rulesOpen = true;
    data.learnedMechanics = [
      ...new Set([
        ...data.learnedMechanics,
        ...(level.mechanics ?? []).filter((id) => id in MECHANIC_TEXT),
      ]),
    ];
    data.lastView = { active: true, screen, mode };
    message =
      notice || (isWon(level, current()) ? 'Todos os animais estão nos seus destinos.' : '');
    log('level-start', { resumed: session.cursor > 0 });
    render(unknown);
    save();
    $('s-play-area').focus({ preventScroll: true });
    if (isWon(level, current())) {
      recordWin();
      motion.show('sintonia', true, { animate: false });
      scheduleAuto();
    }
    if (mode === 'endless') fillPrefetch();
  }

  function resumeEndless() {
    const saved = data.endless?.current;
    if (!saved?.level) {
      newEndless(0);
      return;
    }
    const checked = validateActiveSintoniaLevel(saved.level);
    if (!checked.valid) {
      selection();
      $('s-selection-status').textContent =
        'Esta partida foi criada com uma definição incompatível. O histórico foi preservado; comece uma nova sequência para continuar.';
      return;
    }
    save();
    cancelGeneration();
    daily = false;
    start(saved.level, { mode: 'endless', saved: saved.session });
  }

  function generationStatus(text) {
    const target = $('s-generation-status') ?? $('s-selection-status') ?? $('s-status');
    if (target) target.textContent = text;
    host
      .querySelectorAll('#s-endless-new,#s-endless-apply,#s-endless-entry,#s-next')
      .forEach((button) => {
        if (mode === 'endless' || screen === 'selection') button.disabled = generationBusy;
      });
  }

  // Prepara um novo desafio do modo livre com as opções selecionadas.
  async function newEndless(startDifficulty) {
    save();
    cancelGeneration();
    cancelAuto();
    const token = generationRevision,
      run = {
        version: 1,
        baseSeed: seedNow(),
        startDifficulty,
        number: 0,
        solved: 0,
        recentSignatures: [],
        recentFamilies: [],
        current: null,
      };
    generationBusy = true;
    generationStatus('Preparando um desafio… Você pode continuar explorando a tela.');
    try {
      const options = endlessOptions(startDifficulty, 0, data.learnedMechanics, [], []),
        seed = makeSeed(run.baseSeed, 1);
      const generated = await generator.generate(seed, options);
      if (token !== generationRevision || host.hidden) return;
      verifyGenerated(generated);
      save();
      run.number = 1;
      run.current = {
        level: generated.level,
        seed,
        signature: generated.signature,
        generatorVersion: generated.level.generatorVersion ?? generated.generatorVersion ?? 1,
        rulesVersion: RULES_VERSION,
        session: null,
      };
      run.recentSignatures = [generated.signature];
      run.recentFamilies = [generated.level.family].filter((value) => typeof value === 'string');
      data.endless = run;
      generationBusy = false;
      daily = false;
      start(generated.level, { mode: 'endless', fresh: true });
    } catch (error) {
      if (token !== generationRevision) return;
      generationBusy = false;
      generationStatus(
        `${safeError(error)} A partida anterior foi preservada. Tente gerar novamente.`,
      );
    }
  }

  // Confere o desafio gerado antes de aceitá-lo na sessão.
  function verifyGenerated(result) {
    if (!result?.level) throw Error('Não foi possível preparar um desafio verificado.');
    const check = validateActiveSintoniaLevel(result.level),
      solution = result.solution ?? result.level.solution;
    if (!check.valid || !Array.isArray(solution) || !replay(result.level, solution).won)
      throw Error('O desafio não passou na verificação.');
    result.level.solution = solution;
  }

  const optionsKey = (options) =>
    JSON.stringify({
      difficulty: options.difficulty,
      animals: options.animals ?? null,
      learnedMechanics: [...options.learnedMechanics].sort(),
      recentFamilies: options.recentFamilies,
    });

  // Prepara antecipadamente o próximo desafio sem trocar a fase em andamento.
  async function fillPrefetch() {
    if (mode !== 'endless' || host.hidden || prefetchTask || generationBusy || !data.endless)
      return;
    const run = data.endless,
      token = generationRevision;
    prefetchTask = (async () => {
      for (let offset = 1; offset <= 2; offset++) {
        if (
          token !== generationRevision ||
          mode !== 'endless' ||
          data.endless !== run ||
          host.hidden
        )
          return;
        const number = run.number + offset;
        if (prefetch.some((item) => item.number === number)) continue;
        const expectedWins = run.solved + (isWon(level, current()) ? 0 : 1) + offset - 1;
        const options = endlessOptions(
          run.startDifficulty,
          expectedWins,
          data.learnedMechanics,
          [...run.recentSignatures, ...prefetch.map((x) => x.result.signature)],
          [...run.recentFamilies, ...prefetch.map((x) => x.result.level.family)],
        );
        try {
          const seed = makeSeed(run.baseSeed, number),
            result = await generator.generate(seed, options);
          if (token !== generationRevision) return;
          verifyGenerated(result);
          prefetch.push({ number, seed, key: optionsKey(options), result });
        } catch {
          if (token !== generationRevision) return;
          break;
        }
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
      number = run.number + 1;
    const options = endlessOptions(
      run.startDifficulty,
      run.solved,
      data.learnedMechanics,
      run.recentSignatures,
      run.recentFamilies,
    );
    const cached = prefetch.find(
      (item) => item.number === number && item.key === optionsKey(options),
    );
    if (cached) {
      cancelGeneration();
      acceptNextEndless(cached.result, cached.seed, number);
      return;
    }
    cancelGeneration();
    const token = generationRevision,
      seed = makeSeed(run.baseSeed, number);
    generationBusy = true;
    generationStatus('Preparando o próximo desafio… O tabuleiro atual continua salvo.');
    try {
      const result = await generator.generate(seed, options);
      if (token !== generationRevision || host.hidden || mode !== 'endless') return;
      verifyGenerated(result);
      generationBusy = false;
      acceptNextEndless(result, seed, number);
    } catch (error) {
      if (token !== generationRevision) return;
      generationBusy = false;
      generationStatus(
        `${safeError(error)} Seu desafio foi preservado. Tente Novo desafio novamente.`,
      );
    }
  }

  function acceptNextEndless(result, seed, number) {
    save();
    const run = data.endless;
    run.number = number;
    run.recentSignatures = [...run.recentSignatures, result.signature].slice(-24);
    run.recentFamilies = [...run.recentFamilies, result.level.family]
      .filter((value) => typeof value === 'string')
      .slice(-24);
    run.current = {
      level: result.level,
      seed,
      signature: result.signature,
      generatorVersion: result.level.generatorVersion ?? result.generatorVersion ?? 1,
      rulesVersion: RULES_VERSION,
      session: null,
    };
    start(result.level, { mode: 'endless', fresh: true });
  }

  // Registra a conclusão da fase e atualiza o progresso.
  function recordWin() {
    if (!isWon(level, current())) return;
    if (mode === 'campaign' || mode === 'archive') {
      const currentDefinition = CAMPAIGN.find((item) => item.id === level.id);
      const archived = !currentDefinition || isRetainedSintoniaAttempt(level, currentDefinition);
      const archiveKey = `${levelContentRevision(level)}:${level.id}`;
      const previous = archived
        ? data.campaign.archivedCompleted[archiveKey]?.result
        : data.campaign.completed[level.id];
      const result = {
        firstCompletedAt: previous?.firstCompletedAt ?? new Date().toISOString(),
        moves: previous ? Math.min(previous.moves ?? Infinity, session.cursor) : session.cursor,
        assisted: previous ? previous.assisted && session.assisted : session.assisted,
        definitionKey: sintoniaDefinitionKey(level),
      };
      if (archived)
        data.campaign.archivedCompleted[archiveKey] = {
          id: level.id,
          contentRevision: levelContentRevision(level),
          definitionKey: result.definitionKey,
          result,
        };
      else data.campaign.completed[level.id] = result;
    }
    if (!session.winRecorded) {
      session.winRecorded = true;
      if (mode === 'endless') data.endless.solved++;
      log('win', { moves: session.cursor, assisted: session.assisted });
    }
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
      restart.isOpen
    )
      return;
    const token = revision;
    autoTimer = setTimeout(() => {
      autoTimer = null;
      if (
        token === revision &&
        !host.hidden &&
        !restart.isOpen &&
        mode === 'endless' &&
        isWon(level, current())
      )
        nextEndless();
    }, 1500);
  }

  // Encaminha o movimento e atualiza histórico, progresso e apresentação.
  function move(direction, { assisted = false, silent = false } = {}) {
    if (!level || host.hidden || restart.isOpen || !DIRECTIONS.includes(direction)) return;
    cancelAuto();
    cancelHint();
    hintPlan = null;
    answerPlan = null;
    hintTier = 0;
    hintText = '';
    const before = current();
    const result = commitSintoniaCommand(level, session, direction);
    recentDirection = direction;
    if (!result.transition.changed) {
      message = 'Todos ficaram bloqueados. Este comando não conta como movimento.';
      if (!silent) renderStatus();
      return;
    }
    session = result.session;
    if (assisted) session.assisted = true;
    revision++;
    motion?.clear();
    message = result.transition.won
      ? 'Em sintonia! Todos chegaram aos seus destinos.'
      : `${statusCount()} de ${level.boards.length} animais no destino. Quem chegou continua recebendo os comandos.`;
    observeMovement(missionAttempt, { cursor: session.cursor, human: !assisted && !silent, baton: sintoniaBatonPass(level, before, result.transition) });
    const certificate = CAMPAIGN.find((item) => item.id === level.id)?.certificate;
    const minimum = certificate?.optimal === true && certificate?.replayed === true && certificate?.rulesVersion === RULES_VERSION && certificate?.method === 'breadth-first-witness-and-engine-replay' ? certificate.commands : null;
    recordMissionUnlocks(finishMovement(missionAttempt, { game: 'sintonia', won: result.transition.won, cursor: session.cursor, levelId: level.id, provenMinimum: minimum }));
    log('move', { direction, moves: session.cursor });
    if (result.transition.won) recordWin();
    else save();
    if (!silent) {
      renderBoards();
      renderStatus();
      if (result.transition.won) {
        motion.show('sintonia', true);
        scheduleAuto();
      }
    }
  }

  // Restaura uma posição do histórico para desfazer ou refazer ações.
  function travelHistory(delta) {
    if (!session || restart.isOpen) return;
    const next = session.cursor + delta;
    if (next < 0 || next >= session.states.length) return;
    movementHistory(missionAttempt);
    invalidate();
    session.cursor = next;
    message =
      delta < 0
        ? 'Último movimento desfeito. Todos os mecanismos foram restaurados.'
        : 'Movimento refeito.';
    log(delta < 0 ? 'undo' : 'redo');
    save();
    renderBoards();
    renderStatus();
    if (isWon(level, current())) motion.show('sintonia', true);
  }

  // Reinicia a tentativa depois da confirmação, preservando o progresso acumulado.
  function restartCurrentImmediately() {
    if (!session || host.hidden || screen !== 'play') return;
    if (mode === 'campaign' && isRetainedSintoniaAttempt(level, CAMPAIGN[index])) {
      cancelGeneration();
      start(CAMPAIGN[index], {
        mode: 'campaign',
        fresh: true,
        notice:
          'Mapa atualizado. Somente as jogadas desta tentativa foram reiniciadas; suas conclusões foram mantidas.',
      });
      return;
    }
    const wasWon = isWon(level, current());
    missionAttempt = createMovementAttempt({ official: missionAttempt?.official, fresh: true, clean: wasWon });
    const recorded = session.winRecorded,
      failures = session.failures,
      assisted = session.assisted;
    cancelGeneration();
    invalidate();
    session = restoreSintoniaSession(level, null);
    session.winRecorded = recorded;
    session.failures = failures;
    session.assisted = assisted;
    recentDirection = '';
    message = '';
    log('restart');
    save();
    renderBoards();
    renderStatus();
    $('s-play-area').focus({ preventScroll: true });
    if (mode === 'endless') {
      generationStatus('');
      fillPrefetch();
    }
  }

  // Solicita o reinício da fase e mantém o fluxo de confirmação.
  function restartLevel(trigger) {
    if (!session) return;
    cancelAuto();
    cancelHint();
    const token = revision;
    restart.open({
      trigger,
      isCurrent: () => revision === token && !host.hidden && screen === 'play',
      onConfirm: restartCurrentImmediately,
      onCancel: () => {
        if (trigger?.matches?.('[data-result-retry]')) trigger.disabled = false;
        scheduleAuto();
      },
      fallbackFocus: () => $('s-play-area'),
    });
    if (mode === 'campaign' && isRetainedSintoniaAttempt(level, CAMPAIGN[index]))
      describeContentRestart();
  }

  // Reuse the existing confirmation and layout: a content migration changes
  // only its explanation, never resets progress without the player's consent.
  function describeContentRestart() {
    document.getElementById('restart-sintonia-title').textContent = 'Começar o mapa atualizado?';
    document.getElementById('restart-sintonia-description').textContent =
      'Este nível recebeu uma nova versão. Apenas as jogadas e o histórico de desfazer desta tentativa serão apagados. Suas conclusões, os outros níveis e o Modo Sem Parar serão mantidos.';
    document.getElementById('restart-sintonia-confirm').textContent = 'Começar mapa atualizado';
  }

  // Executa a confirmação solicitada usando as regras e a sessão atuais.
  function confirm() {
    if (restart.isOpen) return;
    if (isWon(level, current())) {
      recordWin();
      message = 'Em sintonia! Todos os animais estão no destino.';
      motion.show('sintonia', true);
      scheduleAuto();
    } else {
      session.failures++;
      message = `Ainda faltam ${level.boards.length - statusCount()} animais. Você pode continuar, desfazer ou pedir uma dica.`;
      log('check', { complete: false });
      save();
      motion.show('sintonia', false);
    }
    renderStatus();
  }

  // Solicita a dica disponível para o estado atual da partida.
  async function hint() {
    if (!session || restart.isOpen || hintBusy) return;
    cancelAuto();
    if (isWon(level, current())) {
      hintText =
        'Todos já estão nos destinos. Você pode repetir o nível ou seguir para outro desafio.';
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
      requestState = clone(current());
    hintBusy = true;
    hintText = 'Observando a configuração atual…';
    renderStatus();
    try {
      const result = await advisor.hint(requestLevel, requestState);
      if (
        token !== hintRevision ||
        host.hidden ||
        level !== requestLevel ||
        stateKey(current()) !== context
      )
        return;
      hintBusy = false;
      session.assisted = true;
      hintTier = 1;
      if (result.status === 'solved' && result.solution?.length) {
        hintPlan = { context, solution: result.solution };
        showHintTier();
      } else if (result.status === 'unsolvable') {
        hintText =
          'Esta configuração não tem continuação até os destinos. Desfaça os últimos movimentos para recuperar um acesso ou reinicie este mesmo desafio.';
        motion.show('sintonia', false);
        renderStatus();
      } else {
        hintText =
          'A busca de dica não terminou dentro do tempo disponível. Isso não significa que a posição seja impossível. Você pode continuar, desfazer ou pedir outra dica.';
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
    const direction = hintPlan.solution[0],
      result = transition(level, current(), direction);
    const moving = level.boards
      .filter((_, i) => result.state.positions[i] !== current().positions[i])
      .map(animalName);
    const waiting = level.boards
      .filter((_, i) => result.state.positions[i] === current().positions[i])
      .map(animalName);
    const atStart = session.cursor === 0;
    if (hintTier === 1)
      hintText =
        atStart && level.hints?.[0]
          ? level.hints[0]
          : `Observe os ${level.boards.length} tabuleiros em conjunto. ${waiting.length ? `${waiting.join(' e ')} pode permanecer no lugar enquanto outra posição muda.` : 'Um deslocamento compartilhado pode preparar a próxima diferença entre os caminhos.'}`;
    else if (hintTier === 2)
      hintText = `O próximo passo de uma solução ${moving.length ? `desloca ${moving.join(' e ')}` : 'muda um mecanismo'}.${waiting.length ? ` ${waiting.join(' e ')} permanece no lugar.` : ''} Compare as paredes e as passagens antes de escolher a direção.`;
    else
      hintText = `Experimente ${DIRECTIONS_UI[direction][1]} ${DIRECTIONS_UI[direction][0]}. Esta dica foi calculada a partir da configuração atual.`;
    session.assisted = true;
    log('hint-layer', { tier: hintTier });
    save();
    renderStatus();
  }

  async function showAnswer() {
    if (!session || session.failures < 3 || hintBusy || restart.isOpen) return;
    cancelAuto();
    cancelHint();
    const token = hintRevision,
      context = stateKey(current()),
      requestLevel = level;
    hintBusy = true;
    hintText = 'Buscando uma sequência a partir desta posição…';
    renderStatus();
    try {
      const result = await advisor.hint(requestLevel, clone(current()));
      if (
        token !== hintRevision ||
        level !== requestLevel ||
        stateKey(current()) !== context ||
        host.hidden
      )
        return;
      hintBusy = false;
      if (result.status === 'solved') {
        answerPlan = { context, solution: result.solution };
        session.assisted = true;
        hintText = `Uma solução a partir daqui: ${result.solution.map((direction) => DIRECTIONS_UI[direction][0]).join(' ')}. Você pode experimentar os comandos ou aplicar a sequência. A resolução será identificada como assistida.`;
      } else if (result.status === 'unsolvable') {
        hintText =
          'Esta posição não chega à vitória. Desfaça para recuperar um caminho ou reinicie o mesmo desafio antes de pedir o gabarito.';
        motion.show('sintonia', false);
      } else
        hintText =
          'A busca não conseguiu concluir uma solução dentro do orçamento. Seu tabuleiro foi preservado; uma busca inconclusiva não prova impossibilidade.';
      save();
      renderStatus();
    } catch (error) {
      if (token !== hintRevision) return;
      hintBusy = false;
      hintText = safeError(error);
      renderStatus();
    }
  }

  // Aplica a resposta de referência após as verificações de disponibilidade.
  function applyAnswer() {
    if (!answerPlan || answerPlan.context !== stateKey(current())) return;
    const solution = answerPlan.solution.slice();
    for (const direction of solution) move(direction, { assisted: true, silent: true });
    renderBoards();
    renderStatus();
    if (isWon(level, current())) {
      motion.show('sintonia', true);
      scheduleAuto();
    }
  }

  // Troca a fase exibida conforme o comando de navegação.
  function navigate(delta) {
    if (mode === 'endless') {
      if (delta > 0) nextEndless();
      return;
    }
    if (mode !== 'campaign') return;
    const next = index + delta;
    if (next >= 0 && next < CAMPAIGN.length) startCampaign(next);
  }

  // Atualiza a apresentação da partida a partir do estado atual.
  function render(unknown = []) {
    const won = isWon(level, current());
    const retryVisible = $('s-motion')?.dataset.outcome === 'loss';
    motion?.clear();
    host.innerHTML = `<div class="collection-lab lab sintonia-lab"><button id="s-back" class="quiet">← Seleção de níveis</button><div class="lab-heading"><div><p id="s-kicker" class="eyebrow">${mode === 'endless' ? `Modo Sem Parar · DESAFIO ${data.endless.number} · ${data.endless.solved} CONCLUÍDOS` : mode === 'custom' ? 'EDITOR · FASE PERSONALIZADA' : mode === 'archive' ? 'ARQUIVO · TENTATIVA PRESERVADA' : 'EXPERIMENTO 06'}</p><h2 id="s-title" tabindex="-1">SINTONIA ·</h2><p class="s-level-name">${esc(mode === 'campaign' ? campaignLevelName('sintonia', level) : (level.name ?? 'Um comando, vários caminhos'))} <span>${esc(difficultyName(level.difficulty))} · ${level.boards.length} animais</span></p></div><div class="modes collection-mode-switch" role="group" aria-label="Modo de jogo"><button id="s-mode-campaign" aria-pressed="${mode !== 'endless'}">Desafios</button><button id="s-mode-endless" aria-pressed="${mode === 'endless'}">Modo Sem Parar</button></div></div>${mode === 'endless' ? endlessControls() : ''}<div class="collection-workspace s-workspace ${rulesOpen ? 'rules-open' : ''} ${advanced ? '' : 'closed'}"><div class="collection-surface experiment s-surface"><div class="stage-top">${mode === 'campaign' ? `<div class="level-stepper"><span id="s-stage-label" data-campaign-level-name="${esc(campaignLevelName('sintonia', level))}">${daily ? 'DESAFIO DO DIA' : 'DESAFIO'} ${shortNumber(index + 1)} / 80</span></div>` : ''}<div class="stage-tools"><button id="s-undo" aria-label="Desfazer" title="Desfazer (Ctrl+Z)">↶</button><button id="s-redo" aria-label="Refazer" title="Refazer (Ctrl+Shift+Z)">↷</button><button id="s-reset" class="action-reset">↺ Reiniciar</button><details id="s-rules-panel" class="rules-card" ${rulesOpen ? 'open' : ''}><summary aria-controls="s-rules-sidebar" aria-expanded="${rulesOpen}"><span>Regras e como jogar</span><span class="rules-show">Mostrar</span><span class="rules-hide">Ocultar</span></summary></details><button id="s-advanced-toggle" aria-expanded="${advanced}" aria-controls="s-advanced">${advanced ? 'Ocultar' : 'Mostrar'} opções avançadas</button></div></div><p class="s-mission">${esc(lessonText(level))}</p>${unknown.length ? `<details class="s-new-rule" open><summary>Uma ideia para experimentar: ${unknown.map((id) => esc(MECHANIC_TEXT[id][0])).join(' · ')}</summary>${unknown.map((id) => `<p>${esc(MECHANIC_TEXT[id][1])}</p>`).join('')}</details>` : ''}<div class="board-navigation s-board-navigation" role="group" aria-label="Área do jogo e navegação de níveis">${mode === 'campaign' ? '<button type="button" id="s-level-prev" class="level-arrow" aria-controls="s-play-area" aria-label="Nível anterior" title="Nível anterior">←</button>' : ''}<div id="s-board-surface" class="s-board-surface"><div id="s-play-area" class="s-play-area" tabindex="0" role="group" aria-label="Comando compartilhado de SINTONIA" aria-describedby="s-keyboard-help"><div id="s-boards" class="s-boards" data-count="${level.boards.length}"></div></div><div class="s-command-row"><div class="s-dpad" role="group" aria-label="Mover todos os animais"><button type="button" data-s-direction="up" aria-label="Mover todos para cima" title="Cima · W">${sceneryIcon('up')}</button><button type="button" data-s-direction="left" aria-label="Mover todos para esquerda" title="Esquerda · A">${sceneryIcon('left')}</button><span aria-hidden="true">todos</span><button type="button" data-s-direction="right" aria-label="Mover todos para direita" title="Direita · D">${sceneryIcon('right')}</button><button type="button" data-s-direction="down" aria-label="Mover todos para baixo" title="Baixo · S">${sceneryIcon('down')}</button></div><div class="s-move-counter" role="group" aria-label="Movimentos feitos"><span class="s-move-label">MOVIMENTOS</span><strong id="s-moves" aria-live="polite" aria-atomic="true">${session.cursor}</strong></div><p id="s-keyboard-help">Um toque, um comando para todos.<br><span>Setas ou WASD com a área do jogo em foco. Ctrl+Z desfaz.</span></p></div><div id="s-motion" class="result-motion" aria-hidden="true"></div></div>${mode === 'campaign' ? '<button type="button" id="s-level-next" class="level-arrow" aria-controls="s-play-area" aria-label="Próximo nível" title="Próximo nível">→</button>' : ''}</div><div class="s-progress-row"><div class="level-actions"><button id="s-confirm" class="primary confirm" hidden>Confirmar resposta</button><div class="actions"><button id="s-answer" hidden>Ver gabarito</button><button id="s-hint" class="action-hint">✦ Dicas</button><button id="s-next" ${mode === 'custom' || mode === 'archive' ? 'hidden' : ''}>${mode === 'endless' ? 'Novo desafio' : 'Próximo nível'} →</button></div><button id="s-hint-apply" hidden>Aplicar este passo</button><button id="s-answer-apply" hidden>Aplicar sequência do gabarito</button><p id="s-hint-text" class="hint" role="status" aria-live="polite"></p></div>${model.relations.length ? '' : '<p class="s-goal-legend"><span aria-hidden="true">◎</span> Cada aro marca o destino daquele animal.</p>'}<div class="readout s-readout"><div><span class="metric-label">NOS DESTINOS</span><strong id="s-arrived">${statusCount()} / ${level.boards.length}</strong></div><p id="s-status" role="status" aria-live="polite" aria-atomic="true"></p></div></div></div><aside id="s-rules-sidebar" class="rules-sidebar" aria-label="Regras e como jogar" ${rulesOpen ? '' : 'hidden'}>${rulesMarkup()}</aside><aside id="s-advanced" class="controls" ${advanced ? '' : 'hidden'}>${advancedMarkup()}</aside></div></div>`;
    motion = createResultMotion($('s-motion'), $('s-board-surface'), globalThis, {
      getVictoryState: current,
      onRetry: () => {
        if (mode === 'campaign' && isRetainedSintoniaAttempt(level, CAMPAIGN[index]))
          restartLevel($('s-motion').querySelector('[data-result-retry]'));
        else restartCurrentImmediately();
      },
    });
    $('s-back').onclick = selection;
    $('s-mode-campaign').onclick = selection;
    $('s-mode-endless').onclick = () => {
      if (mode !== 'endless')
        data.endless?.current ? resumeEndless() : newEndless(bounded(level.difficulty, 0, 5));
    };
    $('s-undo').onclick = () => travelHistory(-1);
    $('s-redo').onclick = () => travelHistory(1);
    $('s-reset').onclick = (event) => restartLevel(event.currentTarget);
    if ($('s-level-prev')) $('s-level-prev').onclick = () => navigate(-1);
    if ($('s-level-next')) $('s-level-next').onclick = () => navigate(1);
    $('s-confirm').onclick = confirm;
    $('s-next').onclick = () => navigate(1);
    $('s-hint').onclick = hint;
    $('s-answer').onclick = showAnswer;
    $('s-hint-apply').onclick = () => {
      if (hintPlan?.context === stateKey(current())) move(hintPlan.solution[0], { assisted: true });
    };
    $('s-answer-apply').onclick = applyAnswer;
    host
      .querySelectorAll('[data-s-direction]')
      .forEach((button) => (button.onclick = () => move(button.dataset.sDirection)));
    const rulesPanel = $('s-rules-panel');
    rulesPanel.ontoggle = () => {
      if ($('s-rules-panel') !== rulesPanel) return;
      rulesOpen = rulesPanel.open;
      data.prefs.rulesOpen = rulesOpen;
      syncPanels();
      save();
    };
    $('s-advanced-toggle').onclick = () => {
      advanced = !advanced;
      syncPanels();
      save();
    };
    bindAdvanced();
    if (mode === 'endless') bindEndless();
    renderBoards();
    renderStatus();
    if (won) motion.show('sintonia', true, { animate: false });
    else if (retryVisible) motion.show('sintonia', false);
  }

  function syncPanels() {
    const workspace = $('s-rules-sidebar').parentElement;
    workspace.classList.toggle('rules-open', rulesOpen);
    workspace.classList.toggle('closed', !advanced);
    $('s-rules-sidebar').hidden = !rulesOpen;
    $('s-advanced').hidden = !advanced;
    $('s-rules-panel').querySelector('summary').setAttribute('aria-expanded', String(rulesOpen));
    $('s-advanced-toggle').setAttribute('aria-expanded', String(advanced));
    $('s-advanced-toggle').textContent = `${advanced ? 'Ocultar' : 'Mostrar'} opções avançadas`;
  }

  function endlessControls() {
    const run = data.endless;
    return `<details class="rules-card endless-settings endless-panel" open><summary>Modo Sem Parar · personalizar modo livre</summary><div class="rules-body"><p>Desafios novos, no seu ritmo. A dificuldade cresce com as conclusões e intercala retomadas mais acessíveis.</p><div class="collection-toolbar endless-options"><label>Dificuldade inicial<select id="s-endless-difficulty">${DIFFICULTIES.map((name, i) => `<option value="${i}" ${i === run.startDifficulty ? 'selected' : ''}>${esc(name)}</option>`).join('')}</select></label><label><input id="s-auto-advance" type="checkbox" ${data.prefs.autoAdvance ? 'checked' : ''}> Avançar automaticamente após concluir</label></div><div class="collection-toolbar"><button id="s-endless-apply">Aplicar opções e gerar</button><button id="s-endless-new">Novo desafio</button></div><p>Novo desafio não conta como vitória. Reiniciar mantém exatamente este desafio.</p><p id="s-generation-status" role="status" aria-live="polite"></p></div></details>`;
  }

  function bindEndless() {
    $('s-endless-new').onclick = nextEndless;
    $('s-endless-apply').onclick = () => newEndless(Number($('s-endless-difficulty').value));
    $('s-auto-advance').onchange = (event) => {
      data.prefs.autoAdvance = event.target.checked;
      save();
      if (event.target.checked) scheduleAuto();
      else cancelAuto();
    };
  }

  // Monta as orientações e exemplos de regras apresentados na partida.
  // O guia comum vem primeiro; pistas e controles específicos continuam disponíveis.
  function rulesMarkup() {
    return rulesPreviewMarkup('sintonia') + '<details class="rules-more"><summary>Pistas desta fase e controles</summary>' + contextualRulesMarkup() + '</details>';
  }

  function contextualRulesMarkup() {
    const mechanics = [...new Set(level.mechanics ?? ['walls'])].filter(
      (id) => id in MECHANIC_TEXT,
    );
    return `<h3>Um comando, vários personagens</h3><p class="rules-context">Cada animal tem seu tabuleiro e seu destino. Todos recebem a mesma seta. Uma parede segura quem não pode passar; os outros continuam.</p><div class="rules-body"><p><strong>O destino não prende o animal.</strong> A vitória acontece quando todos estão nos destinos ao final do mesmo comando. Às vezes é preciso sair para depois voltar.</p><p>Não há cronômetro, vidas ou limite obrigatório de movimentos. Desfazer e reiniciar são livres.</p><div class="collection-notes"><p><strong>Foco deste nível:</strong> ${esc(lessonText(level))}</p><p>${esc(difficultyName(level.difficulty))}. Você pode escolher qualquer nível.</p></div><h4>Elementos desta fase</h4>${mechanics.map((id) => `<p><strong>${esc(MECHANIC_TEXT[id][0])}.</strong> ${esc(MECHANIC_TEXT[id][1])}</p>`).join('')}<p>Os rótulos iguais ligam controles e passagens.</p><details class="rules-more"><summary>Estratégias e acessibilidade</summary><div><p>Procure paredes que segurem um animal na direção necessária para o outro. Pense na preparação do último movimento. Repetir uma seta pode ser útil, mas nem sempre aproximar um animal do destino ajuda o conjunto.</p><p>Tab percorre os controles. Com a área dos tabuleiros em foco, use setas ou WASD. Ctrl+Z desfaz e Ctrl+Shift+Z refaz. Em campos, menus e diálogos, o teclado mantém sua função normal.</p><p>Os controles de toque movem todos uma vez por ativação. Movimento reduzido respeita a preferência do dispositivo. Símbolos e rótulos repetidos complementam as cores.</p></div></details></div>`;
  }

  // Monta os controles de edição e importação disponíveis no modo avançado.
  function advancedMarkup() {
    return `<h3>Opções avançadas</h3><label class="s-checkbox"><input id="s-show-coordinates" type="checkbox" ${data.prefs.coordinates ? 'checked' : ''}> Mostrar coordenadas</label><p>Editor local. Edite o JSON e verifique uma solução antes de jogar. Níveis personalizados não mudam as conclusões da campanha.</p><label for="s-editor-json">Dados da fase</label><textarea id="s-editor-json" rows="14" maxlength="200000" spellcheck="false"></textarea><button id="s-editor-check">Verificar fase</button><button id="s-editor-play">Jogar fase editada</button><p id="s-editor-status" role="status" aria-live="polite"></p><button id="s-export">Exportar fase JSON</button><button id="s-export-stats">Exportar métricas locais</button><p>Sem envio automático. Métricas e progresso ficam neste navegador; não há contas, ranking ou sincronização.</p>`;
  }

  // Seleciona os campos da definição que podem ser exportados como dados.
  function cleanLevel(input) {
    return { ...clone(input), game: 'sintonia' };
  }
  function download(name, value) {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = name.replace(/[^a-zA-Z0-9._-]/g, '-');
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function bindAdvanced() {
    $('s-editor-json').value = JSON.stringify(cleanLevel(level), null, 2);
    $('s-editor-json').oninput = () => {
      importRevision++;
      advisor.cancel();
      $('s-editor-status').textContent = 'JSON alterado. Verifique novamente antes de jogar.';
    };
    $('s-editor-check').onclick = () =>
      verifyCustom($('s-editor-json'), $('s-editor-status'), false);
    $('s-editor-play').onclick = () => verifyCustom($('s-editor-json'), $('s-editor-status'), true);
    $('s-export').onclick = () => download(`${level.id}.json`, cleanLevel(level));
    $('s-export-stats').onclick = () => {
      save();
      download('sintonia-metricas-locais.json', {
        version: 1,
        game: 'sintonia',
        exportedAt: new Date().toISOString(),
        completed: data.campaign.completed,
        campaignArchive: {
          inertAttempts: data.archivedAttempts,
          currentIds: CAMPAIGN.map((item) => item.id),
          completed: data.campaign.archivedCompleted,
          sessions: data.campaign.sessions,
          learnedMechanics: data.learnedMechanics,
        },
        endless: { solved: data.endless?.solved ?? 0, number: data.endless?.number ?? 0 },
        events: data.events,
      });
    };
    $('s-show-coordinates').onchange = (event) => {
      data.prefs.coordinates = event.target.checked;
      save();
      renderBoards();
    };
  }

  function importPanel() {
    return `<details class="level-json-import json-import-disclosure" aria-labelledby="s-import-title"><summary id="s-import-title">Adicionar seu próprio nível em JSON</summary><p>Escolha um arquivo de SINTONIA. A verificação acontece neste navegador. Um arquivo inválido preserva sua partida anterior.</p><label class="file-button">Importar fase JSON<input id="s-import-file" type="file" accept="application/json,.json" aria-describedby="s-import-help s-import-status"></label><p id="s-import-help" class="collection-small">Máximo de 200 KB. Entre dois e quatro tabuleiros de até 8 × 8. Uma solução precisa ser verificada antes de jogar. Use somente paredes, gelo, placas, interruptores, chaves e cancelas (incluindo sol e lua). O destino não pode ficar sobre uma placa ou interruptor.</p><details><summary>Formato e exemplo de SINTONIA</summary><p>O exemplo inclui mapas, destinos, regras e uma sequência de solução. As casas são números começando em zero, em ordem de linha. Mantenha uma casa inicial e um destino por tabuleiro.</p><pre>${esc(JSON.stringify(cleanLevel(CAMPAIGN[0]), null, 2))}</pre><button id="s-import-example">Baixar exemplo JSON</button></details><details><summary>Colar JSON</summary><label for="s-import-json">Dados do nível personalizado</label><textarea id="s-import-json" rows="10" maxlength="200000" spellcheck="false"></textarea><button id="s-import-paste">Verificar e jogar JSON</button></details><p id="s-import-status" role="status" aria-live="polite"></p></details>`;
  }

  function bindImport() {
    $('s-import-example').onclick = () =>
      download('sintonia-exemplo.json', cleanLevel(CAMPAIGN[0]));
    $('s-import-paste').onclick = () =>
      verifyCustom($('s-import-json'), $('s-import-status'), true);
    $('s-import-json').oninput = () => {
      importRevision++;
      advisor.cancel();
      $('s-import-status').textContent =
        'JSON alterado. Clique em Verificar e jogar JSON quando terminar.';
    };
    $('s-import-file').onchange = async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const target = $('s-import-status'),
        token = ++importRevision;
      target.textContent = 'Lendo o arquivo…';
      try {
        if (file.size > 200000) throw Error('Arquivo muito grande. O limite é 200 KB.');
        const text = await file.text();
        if (token !== importRevision || !target.isConnected || host.hidden) return;
        await verifyCustom({ value: text, isConnected: true }, target, true);
      } catch (error) {
        if (target.isConnected) target.textContent = safeError(error);
      } finally {
        event.target.value = '';
      }
    };
  }

  // Verifica se a fase importada pode ser usada pelo jogo.
  async function verifyCustom(input, target, play) {
    cancelHint();
    cancelAuto();
    const token = ++importRevision,
      text = input.value;
    target.textContent = 'Verificando mapa, regras e solução…';
    const currentRequest = () =>
      token === importRevision && !host.hidden && target.isConnected && input.value === text;
    try {
      if (new Blob([text]).size > 200000) throw Error('Arquivo muito grande. O limite é 200 KB.');
      const candidate = JSON.parse(text);
      if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate))
        throw Error('O JSON precisa conter a definição de um nível de SINTONIA.');
      if (candidate.game && candidate.game !== 'sintonia')
        throw Error('Este arquivo pertence a outro jogo. Use um nível de SINTONIA.');
      if (
        !Array.isArray(candidate.boards) ||
        candidate.boards.some(
          (board) =>
            !board ||
            typeof board !== 'object' ||
            !Number.isInteger(board.rows) ||
            !Number.isInteger(board.cols) ||
            board.rows < 1 ||
            board.cols < 1 ||
            board.rows > 8 ||
            board.cols > 8,
        )
      )
        throw Error('Cada tabuleiro precisa informar linhas e colunas inteiras entre 1 e 8.');
      const checked = validateActiveSintoniaLevel(candidate);
      if (!checked.valid) throw Error(checked.errors.slice(0, 4).join(' '));
      let solution = candidate.solution;
      if (!Array.isArray(solution) || !replay(candidate, solution).won) {
        const answer = await advisor.hint(candidate, initialState(candidate));
        if (!currentRequest()) return;
        if (answer.status === 'unsolvable')
          throw Error('Este nível não tem solução conjunta. Confira os mapas e as conexões.');
        if (answer.status !== 'solved')
          throw Error(
            'A busca não terminou dentro do orçamento. Inclua uma sequência de solução válida ou simplifique o mapa.',
          );
        solution = answer.solution;
      }
      if (!currentRequest()) return;
      candidate.solution = solution;
      candidate.name ??= 'Caminhos personalizados';
      candidate.id = `custom-${String(candidate.id ?? 'sintonia')
        .replace(/[^a-zA-Z0-9_-]/g, '')
        .slice(0, 60)}`;
      target.textContent = `Fase válida. Uma solução de ${solution.length} comandos foi reproduzida. Outras soluções também são aceitas.`;
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

  function plateOccupied(id) {
    for (let board = 0; board < level.boards.length; board++)
      for (const plate of level.boards[board].plates ?? [])
        if (plate.id === id)
          return (
            current().positions[board] === plate.cell ||
            current().boxes.some((box) => box.board === board && box.cell === plate.cell)
          );
    return false;
  }

  function spriteMarkup(board) {
    const sprite = ANIMAL_SPRITES[animalKey(board)];
    if (!sprite)
      return `<span class="s-animal-placeholder" aria-hidden="true">${esc(animalName(board).slice(0, 1))}</span>`;
    const columns = sprite.columns ?? 1,
      rows = sprite.rows ?? 1,
      frame = sprite.directions?.[recentDirection] ?? sprite.frame ?? 0;
    const x = columns > 1 ? ((frame % columns) / (columns - 1)) * 100 : 0,
      y = rows > 1 ? (Math.floor(frame / columns) / (rows - 1)) * 100 : 0;
    return `<span class="s-animal-sprite" aria-hidden="true" style="background-image:url('${esc(sprite.url)}');background-size:${columns * 100}% ${rows * 100}%;background-position:${x}% ${y}%"></span>`;
  }

  // Desenha os tabuleiros e seus mecanismos a partir da sessão atual.
  function renderBoards() {
    if (!$('s-boards')) return;
    const state = current(),
      collapsed = new Set(state.collapsed);
    $('s-boards').style.setProperty(
      '--s-max-cols',
      Math.max(...level.boards.map((board) => board.cols)),
    );
    $('s-boards').innerHTML = level.boards
      .map((board, boardIndex) => {
        const walkable = new Set(board.walkable),
          ice = new Set(board.ice ?? []),
          fragile = new Set(board.fragile ?? []),
          arrived = state.positions[boardIndex] === board.goal;
        const cells = [];
        for (let cell = 0; cell < board.rows * board.cols; cell++) {
          const blocked = !walkable.has(cell),
            broken = collapsed.has(`${boardIndex}:${cell}`),
            animal = state.positions[boardIndex] === cell,
            goal = board.goal === cell;
          const box = state.boxes.find((item) => item.board === boardIndex && item.cell === cell),
            plate = board.plates?.find((item) => item.cell === cell),
            sw = board.switches?.find((item) => item.cell === cell),
            key = board.keys?.find((item) => item.cell === cell),
            selector = board.selectors?.find((item) => item.cell === cell),
            portal = board.portals?.find((item) => item.a === cell || item.b === cell);
          const channelIn = level.channels?.find(
              (item) => item.fromBoard === boardIndex && item.entry === cell,
            ),
            channelOut = level.channels?.find(
              (item) => item.toBoard === boardIndex && item.exit === cell,
            );
          const relations = [
            ...(plate ? [`plate:${plate.id}`] : []),
            ...(sw ? [`switch:${sw.group}`] : []),
            ...(key ? [`key:${key.id}`] : []),
            ...(selector ? [`selector:${selector.group}`] : []),
            ...(portal ? [`portal:${board.id}:${portal.id}`] : []),
            ...(channelIn ? [`delivery:${channelIn.id}`] : []),
            ...(channelOut ? [`delivery:${channelOut.id}`] : []),
          ];
          const selected = relations.includes(inspectKey);
          let mark = '';
          if (plate)
            mark = `<span class="s-mechanism s-plate ${plateOccupied(plate.id) ? 'active' : ''}">${accessoryIcon('plate', plateOccupied(plate.id), accessoryPalette)}<b>${esc(model.labels.get(`plate:${plate.id}`))}</b></span>`;
          else if (sw)
            mark = `<span class="s-mechanism s-switch ${state.switches[sw.group] ? 'active' : ''}">${accessoryIcon('switch', state.switches[sw.group], accessoryPalette)}<b>${esc(model.labels.get(`switch:${sw.group}`))} · ${state.switches[sw.group] ? '☀' : '☾'}</b></span>`;
          else if (key && !state.keys.includes(key.id))
            mark = `<span class="s-mechanism s-key">${accessoryIcon('key')}<b>${esc(model.labels.get(`key:${key.id}`))}</b></span>`;
          else if (selector)
            mark = `<span class="s-mechanism s-selector">${accessoryIcon('selector', state.selectors[selector.group])}<b>${esc(model.labels.get(`selector:${selector.group}`))} · ${state.selectors[selector.group] ? 'B' : 'A'}</b></span>`;
          else if (portal)
            mark = `<span class="s-mechanism s-portal">${accessoryIcon('portal')}<b>${esc(model.labels.get(`portal:${board.id}:${portal.id}`))}</b></span>`;
          else if (channelIn)
            mark = `<span class="s-mechanism s-delivery">${accessoryIcon('deliveryIn')}<b>${esc(model.labels.get(`delivery:${channelIn.id}`))}</b></span>`;
          else if (channelOut)
            mark = `<span class="s-mechanism s-delivery">${accessoryIcon('deliveryOut')}<b>${esc(model.labels.get(`delivery:${channelOut.id}`))}</b></span>`;
          const title = [
            coordinate(cell, board),
            blocked
              ? 'parede'
              : broken
                ? 'ponte consumida'
                : ice.has(cell)
                  ? 'gelo'
                  : fragile.has(cell)
                    ? 'ponte frágil'
                    : 'piso',
            goal ? 'destino' : '',
            box ? 'caixa' : '',
            animal ? animalName(board) : '',
            ...relations.map((relation) => model.labels.get(relation)),
          ]
            .filter(Boolean)
            .join(' · ');
          cells.push(
            `<span class="s-tile ${blocked ? 'wall' : 'floor'} ${broken ? 'collapsed' : ''} ${ice.has(cell) ? 'ice' : ''} ${fragile.has(cell) ? 'fragile' : ''} ${goal ? 'goal' : ''} ${arrived && goal ? 'goal-occupied' : ''} ${selected ? 's-highlight' : ''}" role="img" aria-label="${esc(title)}" title="${esc(title)}" ${relations.length ? `data-s-inspect="${esc(relations[0])}"` : ''}><span class="s-terrain" aria-hidden="true">${ice.has(cell) ? `<span class="s-floor-art">${accessoryIcon('ice')}</span>` : ''}${fragile.has(cell) ? `<span class="s-floor-art">${accessoryIcon('bridge', broken)}</span>` : ''}${goal ? `<span class="s-goal-ring">${accessoryIcon('goal', arrived)}</span>` : ''}${mark}${box ? `<span class="s-box">${accessoryIcon('box', !!plate)}</span>` : ''}${data.prefs.coordinates && !blocked ? `<span class="s-coord">${Math.floor(cell / board.cols) + 1},${(cell % board.cols) + 1}</span>` : ''}</span>${animal ? spriteMarkup(board) : ''}</span>`,
          );
        }
        const edges =
          (board.gates ?? [])
            .map((gate) =>
              edgeMarkup(
                board,
                gate,
                gateIsOpen(level, state, gate),
                conditionLabel(gate.condition, model),
                conditionKeys(gate.condition),
              ),
            )
            .join('') +
          (board.oneWays ?? [])
            .map((edge) =>
              edgeMarkup(
                board,
                edge,
                true,
                edge.to - edge.from === 1
                  ? '→'
                  : edge.to - edge.from === -1
                    ? '←'
                    : edge.to > edge.from
                      ? '↓'
                      : '↑',
                [],
                true,
              ),
            )
            .join('');
        const description = `${animalName(board)}: ${coordinate(state.positions[boardIndex], board)}. Destino: ${coordinate(board.goal, board)}. ${arrived ? 'Está no destino.' : 'Ainda fora do destino.'} Tabuleiro de ${board.rows} linhas por ${board.cols} colunas. `;
        const edgeDescriptions = (board.gates ?? [])
          .map(
            (gate) =>
              `Cancela ${conditionLabel(gate.condition, model)} entre ${coordinate(gate.from, board)} e ${coordinate(gate.to, board)}: ${gateIsOpen(level, state, gate) ? 'aberta' : 'fechada'}.`,
          )
          .concat(
            (board.oneWays ?? []).map(
              (edge) =>
                `Sentido único de ${coordinate(edge.from, board)} para ${coordinate(edge.to, board)}.`,
            ),
          );
        return `<section class="s-animal-board ${arrived ? 'arrived' : ''}" style="--cols:${board.cols};--rows:${board.rows}" aria-labelledby="s-animal-${boardIndex}"><div class="s-board-heading"><h3 id="s-animal-${boardIndex}">${esc(animalName(board))}</h3><span>${arrived ? '✓ no destino' : '○ a caminho'}</span></div><div class="s-map" role="group" aria-label="${esc(description)}">${cells.join('')}${wallOverlay(board)}<div class="s-edge-overlay" aria-hidden="true">${edges}</div></div><p class="sr-only">${esc(edgeDescriptions.join(' '))}</p></section>`;
      })
      .join('');
    $('s-boards')
      .querySelectorAll('[data-s-inspect]')
      .forEach(
        (tile) =>
          (tile.onclick = () => {
            inspectKey = inspectKey === tile.dataset.sInspect ? '' : tile.dataset.sInspect;
            renderBoards();
          }),
      );
  }

  function edgeMarkup(board, edge, open, label, relations, oneway = false) {
    const ax = edge.from % board.cols,
      ay = Math.floor(edge.from / board.cols),
      bx = edge.to % board.cols,
      by = Math.floor(edge.to / board.cols);
    const vertical = ay === by,
      left = ((ax + bx + 1) / 2 / board.cols) * 100,
      top = ((ay + by + 1) / 2 / board.rows) * 100;
    const selected = relations.includes(inspectKey);
    return `<span class="s-gate ${vertical ? 'vertical' : 'horizontal'} ${open ? 'open' : 'closed'} ${oneway ? 'oneway' : ''} ${selected ? 's-highlight' : ''}" style="left:${left}%;top:${top}%;--edge-span:${vertical ? 100 / board.rows : 100 / board.cols}%;--edge-cross:${vertical ? 50 / board.cols : 50 / board.rows}%" ${relations.length ? `data-s-inspect="${esc(relations[0])}"` : ''}>${oneway ? `<span>${accessoryEdgeIcon({ oneway: true, direction: { '→': 'right', '←': 'left', '↓': 'down', '↑': 'up' }[label], vertical })}</span>` : `${accessoryEdgeIcon({ open, vertical })}<span>${esc(label)}</span>`}</span>`;
  }

  // Atualiza mensagens, controles habilitados e indicadores da partida.
  function renderStatus() {
    if (!$('s-status')) return;
    const retainedNotice =
      mode === 'archive'
        ? 'Tentativa arquivada no mapa original. Reiniciar mantém este mesmo mapa; as 80 fases atuais ficam na seleção. '
        : mode === 'campaign' && isRetainedSintoniaAttempt(level, CAMPAIGN[index])
          ? 'Partida preservada no mapa anterior. Reiniciar permite começar o mapa atualizado sem perder suas conclusões. '
          : '';
    $('s-status').textContent =
      retainedNotice +
      message +
      (storageWarning
        ? ' O navegador não permitiu salvar o progresso. Mantenha esta página aberta.'
        : '');
    $('s-status').classList.toggle('success', isWon(level, current()));
    $('s-moves').textContent = session.cursor;
    $('s-arrived').textContent = `${statusCount()} / ${level.boards.length}`;
    $('s-undo').disabled = session.cursor === 0;
    $('s-redo').disabled = session.cursor === session.commands.length;
    $('s-hint').disabled = hintBusy;
    $('s-answer').disabled = hintBusy;
    $('s-answer').hidden = session.failures < 3;
    $('s-hint-text').textContent = hintText;
    $('s-hint-apply').hidden = !(hintTier === 3 && hintPlan?.context === stateKey(current()));
    $('s-answer-apply').hidden = !(
      answerPlan?.context === stateKey(current()) && answerPlan.solution.length
    );
    if ($('s-level-prev')) $('s-level-prev').disabled = index === 0;
    if ($('s-level-next')) $('s-level-next').disabled = index === CAMPAIGN.length - 1;
    $('s-next').disabled = mode === 'campaign' ? index === CAMPAIGN.length - 1 : generationBusy;
    if (mode === 'endless')
      $('s-kicker').textContent =
        `Modo Sem Parar · DESAFIO ${data.endless.number} · ${data.endless.solved} CONCLUÍDOS`;
  }

  // Converte as teclas aceitas em ações do jogo.
  function keyboard(event) {
    if (host.hidden || screen !== 'play' || !level || restart.isOpen || event.defaultPrevented)
      return;
    if (
      document.querySelector('dialog[open]') ||
      event.target?.closest?.('input,textarea,select,[contenteditable="true"],summary,a')
    )
      return;
    if (!host.contains(event.target)) return;
    if (
      event.repeat &&
      event.target.closest?.('.s-dpad') &&
      ['Enter', ' ', 'Spacebar'].includes(event.key)
    ) {
      event.preventDefault();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'z') {
      event.preventDefault();
      if (!event.repeat) travelHistory(event.shiftKey ? 1 : -1);
      return;
    }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const inPlay = event.target.closest?.('#s-play-area,.s-dpad');
    if (!inPlay) return;
    const direction =
      {
        ArrowUp: 'up',
        ArrowRight: 'right',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        w: 'up',
        d: 'right',
        s: 'down',
        a: 'left',
      }[event.key] ?? { w: 'up', d: 'right', s: 'down', a: 'left' }[event.key.toLowerCase()];
    if (!direction) return;
    event.preventDefault();
    if (event.repeat) return;
    move(direction);
  }

  host.addEventListener('keydown', keyboard);
  globalThis.addEventListener('pagehide', save);
  return { open, hide, isOpen, restoreOnLoad };
}
