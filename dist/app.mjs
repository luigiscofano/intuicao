import { writeProgress } from './progress-write-guard.mjs';
// Integração de Reflexos e Corte certo: seleção, edição, histórico e apresentação.
import { legacyCutSelectionIds } from './cut-campaign.mjs';
import { isFaunaShape, getFaunaGeometry } from './cut-fauna-geometry.mjs';
import { rulesPreviewMarkup } from './rules-preview.mjs';
import { initCategoryNavigation } from './category-navigation.mjs';
import { parseLevelJSON } from './level-json-common.mjs';
import {
  validateOriginalLevel,
  originalLevelState,
  originalLevelAnswer,
  originalLevelIdentity,
  exportOriginalLevel,
  validOriginalSnapshot,
  originalJSONExample,
  originalJSONHelp,
} from './original-json.mjs';
import { getRulesContext } from './rules-context.mjs';
import { generateOriginalEndless, normalizeOriginalOptions } from './endless-original.mjs';
import { bindMiddleConfirm } from './middle-confirm.mjs';
import { createRestartConfirmation } from './restart-confirmation.mjs';
import { initCollection } from './collection-ui.mjs';
import { createSintoniaRoute } from './sintonia/route.mjs';
import { createRepasseRoute } from './repasse/route.mjs';
import { createOrbitaRoute } from './orbita/route.mjs';
import { createBrotoRoute } from './broto/route.mjs';
import { createCercoRoute } from './cerco/route.mjs';
import {
  traceLightWorld,
  traceLightAttempt,
  lightAttemptFrame,
  lightScene,
} from './light-world.mjs';
import { worldRaysSVG, portalSVG, lightEndpointsSVG, beamName } from './light-world-render.mjs';
import { createResultMotion } from './result-motion.mjs';
import { lightRaysSVG } from './light-render.mjs';
import { curvedCut, shapePolygon, shapes, families, basicCutState } from './curves.mjs';
// Implementação de referência gerada com OpenAI/Codex. Comentários explicam decisões, não autoria do aluno.
import { clamp, segment, cutSuccess, mirrorAngle, wallPolygon } from './math.mjs';
import { lightLevels, cutLevels } from './levels.mjs';
import { createAnswerProgress } from './answer-progress.mjs';
import { createLightCampaignProgress } from './light-campaign-progress.mjs';
import { createCutCampaignProgress } from './cut-campaign-progress.mjs';
import { getOriginalAnswer } from './original-answers.mjs';
import { buildOriginalHint } from './original-hints.mjs';
const $ = (id) => document.getElementById(id),
  scene = $('scene'),
  drawing = $('drawing');
const restartConfirmation = createRestartConfirmation('restart-original');
let restartRevision = 0;
let endlessTimer = null,
  endlessRun = null,
  endlessGenerated = null,
  endlessStorageWarning = false,
  endlessLastRaw = null;
const endlessStoreKey = 'intuicao.endless.original.v1';
let endlessSaved = {};
try {
  endlessSaved = JSON.parse(globalThis.localStorage?.getItem(endlessStoreKey) ?? '{}') ?? {};
} catch {}
if (!endlessSaved || typeof endlessSaved !== 'object' || Array.isArray(endlessSaved))
  endlessSaved = {};
const endlessPanel = document.createElement('section');
endlessPanel.id = 'original-endless';
endlessPanel.className = 'endless-panel';
endlessPanel.hidden = true;
const endlessAnchor = document.querySelector('.lab-heading');
if (endlessAnchor.after) endlessAnchor.after(endlessPanel);
else endlessAnchor.appendChild(endlessPanel);
// Salva o desafio livre atual para permitir sua retomada.
function saveEndless() {
  if (!free || !endlessRun || phase === 'animating') return;
  endlessSaved[game] = {
    ...endlessRun,
    state: structuredClone(historyGesture?.before.state ?? state),
  };
  try {
    const raw = JSON.stringify(endlessSaved);
    if (raw !== endlessLastRaw) {
      if (!globalThis.localStorage) throw Error('storage');
      writeProgress(globalThis.localStorage, endlessStoreKey, raw);
      endlessLastRaw = raw;
    }
    endlessStorageWarning = false;
  } catch {
    endlessStorageWarning = true;
  }
  if ($('original-endless-storage')) $('original-endless-storage').hidden = !endlessStorageWarning;
}
function newSeed() {
  return (Date.now() ^ Math.floor(Math.random() * 4294967296)) >>> 0;
}
// Abre o modo livre com o estado salvo ou um novo desafio.
function enterEndless() {
  finishOriginalGesture(false);
  endDrag();
  saveCampaign();
  saveCustom();
  campaignActive = null;
  customLevel = null;
  customId = '';
  customImportRevision++;
  const saved = endlessSaved[game];
  free = true;
  endlessRun = {
    seed: Number.isInteger(saved?.seed) ? saved.seed : newSeed(),
    options: normalizeOriginalOptions(game, saved?.options),
    count: Number.isInteger(saved?.count) && saved.count >= 0 ? saved.count : 0,
    solved: !!saved?.solved,
    awarded: !!saved?.awarded,
    failures: Number.isSafeInteger(saved?.failures)
      ? Math.max(0, Math.min(1000, saved.failures))
      : 0,
    assisted: saved?.assisted === true,
  };
  if (endlessRun.solved) {
    endlessRun.seed = (endlessRun.seed + 0x9e3779b9) >>> 0;
    endlessRun.solved = false;
    endlessRun.awarded = false;
    endlessRun.failures = 0;
    endlessRun.assisted = false;
  }
  const resume = saved && !saved.solved ? saved.state : null;
  start();
  if (!free) return;
  if (resume && validEndlessSnapshot(resume)) {
    state = structuredClone(resume);
    render();
  }
  saveEndless();
}
function validEndlessSnapshot(s) {
  if (!s || typeof s !== 'object') return false;
  const a = endlessGenerated.initial;
  if (game === 'light') {
    if (!Array.isArray(s.objects) || s.objects.length !== a.objects.length) return false;
    const normalized = structuredClone(s);
    for (let i = 0; i < a.objects.length; i++) {
      if (!s.objects[i] || typeof s.objects[i] !== 'object') return false;
      if (a.objects[i].type === 'mirror') {
        if (!Number.isFinite(s.objects[i].angle) || Math.abs(s.objects[i].angle) > 90) return false;
        normalized.objects[i].angle = a.objects[i].angle;
      }
    }
    return JSON.stringify(normalized) === JSON.stringify(a);
  }
  const normalized = structuredClone(s);
  for (const key of ['centerX', 'centerY', 'angle', 'offset', 'amplitude', 'frequency']) {
    if (!Number.isFinite(s[key])) return false;
    normalized[key] = a[key];
  }
  return (
    JSON.stringify(normalized) === JSON.stringify(a) &&
    s.centerX >= -400 &&
    s.centerX <= 1200 &&
    s.centerY >= -400 &&
    s.centerY <= 860 &&
    s.offset >= -600 &&
    s.offset <= 600 &&
    Math.abs(s.amplitude) <= 120 &&
    s.frequency >= 0.5 &&
    s.frequency <= 2
  );
}
function scheduleEndlessAdvance() {
  clearTimeout(endlessTimer);
  if (!free || !endlessRun?.solved || restartConfirmation.isOpen) return;
  const token = animationToken;
  endlessTimer = setTimeout(() => {
    if (
      token === animationToken &&
      free &&
      !restartConfirmation.isOpen &&
      !document.querySelector('.lab').hidden &&
      endlessRun.solved
    )
      advanceEndless();
  }, 1500);
}
function advanceEndless() {
  if (!free || !endlessRun) return;
  endlessRun.seed = (endlessRun.seed + 0x9e3779b9) >>> 0;
  endlessRun.solved = false;
  endlessRun.awarded = false;
  endlessRun.failures = 0;
  endlessRun.assisted = false;
  start();
}
function renderEndlessPanel() {
  endlessPanel.hidden = !free;
  if (!free) return;
  const o = endlessRun.options;
  const checked = (v) => (v ? 'checked' : '');
  endlessPanel.innerHTML = `<div class="endless-banner"><strong>Modo Sem Parar · ${endlessRun.count} desafios concluídos</strong><span>Acertou? Um novo desafio aparece automaticamente.</span></div><p id="original-endless-storage" role="status" hidden>Não foi possível salvar neste navegador. Você pode continuar jogando, mas esta sessão pode não voltar após recarregar.</p><details><summary>Personalizar o Modo Sem Parar</summary><form id="original-endless-form"><div class="endless-options">${game === 'light' ? `<label>Raios de luz<select id="endless-sources">${[1, 2, 3].map((n) => `<option value="${n}" ${o.sources === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label><label>Espelhos por raio<select id="endless-mirrors">${[1, 2, 3].map((n) => `<option value="${n}" ${o.mirrors === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label><label><input id="endless-walls" type="checkbox" ${checked(o.walls)}> Paredes</label><label><input id="endless-portals" type="checkbox" ${checked(o.portals)}> Portais</label><label><input id="endless-selective" type="checkbox" ${checked(o.selective)} ${o.portals ? '' : 'disabled'}> Portais seletivos por cor (quando houver portais)</label>` : `<label>Forma<select id="endless-shape"><option value="random">Aleatória</option>${shapes.map((n) => `<option ${o.shape === n ? 'selected' : ''}>${n}</option>`).join('')}</select></label><label><input id="endless-curves" type="checkbox" ${checked(o.curves)}> Incluir curvas além de retas</label><label><input id="endless-holes" type="checkbox" ${checked(o.holes)}> Espaços vazios</label>`}</div><p>As opções só mudam o Modo Sem Parar. Aplicar gera um novo desafio; reiniciar mantém o mesmo.</p><div class="endless-actions"><button type="submit" class="primary">Aplicar e gerar desafio</button><button type="button" id="original-endless-new">Gerar outro desafio</button></div></form></details>`;
  $('original-endless-storage').hidden = !endlessStorageWarning;
  $('original-endless-form').onsubmit = (e) => {
    e.preventDefault();
    endlessRun.options = normalizeOriginalOptions(
      game,
      game === 'light'
        ? {
            sources: $('endless-sources').value,
            mirrors: $('endless-mirrors').value,
            walls: $('endless-walls').checked,
            portals: $('endless-portals').checked,
            selective: $('endless-selective').checked,
          }
        : {
            shape: $('endless-shape').value,
            curves: $('endless-curves').checked,
            holes: $('endless-holes').checked,
          },
    );
    advanceEndless();
  };
  if ($('endless-portals'))
    $('endless-portals').onchange = () => {
      $('endless-selective').disabled = !$('endless-portals').checked;
    };
  $('original-endless-new').onclick = advanceEndless;
}

let middleConfirm = null;
const resultMotion = createResultMotion(
  $('result-motion'),
  document.querySelector('.experiment'),
  globalThis,
  { onRetry: restartOriginalNow },
);
const catalogue = { light: lightLevels, cut: cutLevels };
let customLevel = null,
  customId = '',
  customFailures = 0,
  customAssisted = false,
  customStorageWarning = false,
  customImportRevision = 0;
const currentLevel = () => customLevel ?? catalogue[game][level];
const campaignStoreKey = 'intuicao.campaign.original.v1';
let campaignSaved = {},
  campaignActive = null;
try {
  const raw = globalThis.localStorage?.getItem(campaignStoreKey);
  if (raw && raw.length <= 2000000) {
    const saved = JSON.parse(raw);
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) campaignSaved = saved;
  }
} catch {}
// Registra o progresso da campanha sem substituir os demais modos.
function saveCampaign() {
  if (!campaignActive || customLevel || free) return;
  const key = `${campaignActive.game}:${campaignActive.id}`;
  campaignSaved[key] = {
    state: structuredClone(historyGesture?.before.state ?? state),
    cutMode: historyGesture?.before.cutMode ?? cutMode,
    cutDrafts: structuredClone(historyGesture?.before.cutDrafts ?? cutDrafts),
  };
  try {
    writeProgress(globalThis.localStorage, campaignStoreKey, JSON.stringify(campaignSaved));
  } catch {}
}

const customStoreKey = 'intuicao.custom.original.v1';
let customSaved = {};
try {
  const raw = globalThis.localStorage?.getItem(customStoreKey);
  if (raw && raw.length <= 2000000) {
    const saved = JSON.parse(raw);
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) customSaved = saved;
  }
} catch {}
// Guarda as fases próprias e seu estado de edição.
function saveCustom() {
  if (!customLevel || phase === 'animating') return;
  const record = {
    state: structuredClone(historyGesture?.before.state ?? state),
    cutMode: historyGesture?.before.cutMode ?? cutMode,
    cutDrafts: structuredClone(historyGesture?.before.cutDrafts ?? cutDrafts),
    failures: customFailures,
    assisted: customAssisted,
  };
  delete customSaved[customId];
  customSaved[customId] = record;
  const keys = Object.keys(customSaved);
  while (keys.length > 20) delete customSaved[keys.shift()];
  try {
    if (!globalThis.localStorage) throw Error('storage');
    writeProgress(globalThis.localStorage, customStoreKey, JSON.stringify(customSaved));
    customStorageWarning = false;
  } catch {
    customStorageWarning = true;
  }
  if ($('original-custom-storage')) $('original-custom-storage').hidden = !customStorageWarning;
}
const customPanel = document.createElement('details');
customPanel.id = 'original-json-import';
customPanel.className = 'level-json-import json-import-disclosure';
const customAnchor = $('level-grid');
if (customAnchor.after) customAnchor.after(customPanel);
else $('selection').appendChild(customPanel);
const customStorage = document.createElement('p');
customStorage.id = 'original-custom-storage';
customStorage.setAttribute('role', 'status');
customStorage.hidden = true;
customStorage.textContent =
  'Não foi possível salvar esta fase neste navegador. Você pode continuar jogando, mas os ajustes podem não voltar ao reimportar.';
document.querySelector('.lab-heading').appendChild(customStorage);
const customExport = document.createElement('button');
customExport.id = 'original-custom-export';
customExport.type = 'button';
customExport.className = 'quiet';
customExport.hidden = true;
customExport.textContent = 'Exportar fase JSON';
document.querySelector('.level-actions .actions').appendChild(customExport);
// Prepara o arquivo JSON que pode ser salvo pelo jogador.
function downloadOriginalJSON(value, name) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
customExport.onclick = () => {
  if (customLevel)
    downloadOriginalJSON(exportOriginalLevel(customLevel), `${game}-personalizado.json`);
};
function originalImportMessage(message, error = false) {
  const node = $('original-json-status');
  if (node) {
    node.setAttribute('role', error ? 'alert' : 'status');
    node.textContent = message;
  }
}
// Valida os dados importados antes de abrir uma fase própria.
function loadOriginalJSON(raw, expectedGame = game) {
  // All parsing, bounds and mathematical certification happen before changing the game.
  const prepared = validateOriginalLevel(parseLevelJSON(raw, expectedGame), expectedGame),
    identity = originalLevelIdentity(prepared);
  finishOriginalGesture(false);
  endDrag();
  saveCampaign();
  saveEndless();
  saveCustom();
  campaignActive = null;
  free = false;
  customLevel = prepared;
  customId = identity;
  const saved = customSaved[identity];
  customFailures = Number.isSafeInteger(saved?.failures)
    ? Math.max(0, Math.min(1000, saved.failures))
    : 0;
  customAssisted = saved?.assisted === true;
  start(true);
}
async function importOriginalFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const expectedGame = game,
    revision = ++customImportRevision;
  try {
    if (file.size > 200000) throw Error('Arquivo muito grande. O limite é 200.000 bytes.');
    const raw = await file.text();
    if (revision !== customImportRevision || game !== expectedGame) return;
    loadOriginalJSON(raw, expectedGame);
  } catch (error) {
    if (revision === customImportRevision && game === expectedGame)
      originalImportMessage(error.message, true);
  } finally {
    event.target.value = '';
  }
}
function renderOriginalImport() {
  customPanel.open = false;
  customPanel.innerHTML =
    '<summary>Adicionar seu próprio nível em JSON</summary><p>Importe um arquivo ou cole os dados abaixo. Tudo é verificado e salvo somente neste navegador, sem upload. Limite: 200.000 bytes. Os 20 níveis próprios mais recentes guardam seus ajustes: reimporte os mesmos dados para retomá-los. Fases próprias não alteram a campanha.</p><div class="collection-toolbar"><label class="file-button">Importar fase JSON<input id="original-json-file" type="file" accept="application/json,.json"></label><button id="original-json-example" type="button">Usar exemplo</button><button id="original-json-download" type="button">Baixar exemplo JSON</button></div><details><summary>Formato e limites do JSON</summary><p id="original-json-help"></p></details><label for="original-json-text">Dados da fase</label><textarea id="original-json-text" rows="12" spellcheck="false" placeholder="Cole o JSON do seu nível aqui"></textarea><button id="original-json-play" class="primary" type="button">Verificar e jogar fase JSON</button><p id="original-json-status" role="status" aria-live="polite"></p>';
  $('original-json-help').textContent = originalJSONHelp(game);
  $('original-json-file').onchange = importOriginalFile;
  $('original-json-example').onclick = () => {
    $('original-json-text').value = JSON.stringify(originalJSONExample(game), null, 2);
    originalImportMessage(
      'Exemplo carregado. Você pode editar os dados e clicar em Verificar e jogar fase JSON.',
    );
  };
  $('original-json-download').onclick = () =>
    downloadOriginalJSON(originalJSONExample(game), `${game}-exemplo.json`);
  $('original-json-play').onclick = () => {
    customImportRevision++;
    try {
      loadOriginalJSON($('original-json-text').value);
    } catch (error) {
      originalImportMessage(error.message, true);
    }
  };
}

const campaignAnswerProgress = createAnswerProgress();
const endlessAnswerKey = (key) => free && endlessRun && String(key).startsWith('endless-');
const answerProgress = {
  get: (key) =>
    customLevel
      ? { failures: customFailures, assisted: customAssisted }
      : endlessAnswerKey(key)
        ? { failures: endlessRun.failures ?? 0, assisted: !!endlessRun.assisted }
        : campaignAnswerProgress.get(key),
  unlocked: (key) => answerProgress.get(key).failures >= 3,
  fail: (key) => {
    if (customLevel) {
      customFailures = Math.min(1000, customFailures + 1);
      saveCustom();
      return answerProgress.get(key);
    }
    if (!endlessAnswerKey(key)) return campaignAnswerProgress.fail(key);
    endlessRun.failures = Math.min(1000, (endlessRun.failures ?? 0) + 1);
    saveEndless();
    return answerProgress.get(key);
  },
  assist: (key) => {
    if (customLevel) {
      customAssisted = true;
      saveCustom();
      return answerProgress.get(key);
    }
    if (!endlessAnswerKey(key)) return campaignAnswerProgress.assist(key);
    endlessRun.assisted = true;
    saveEndless();
    return answerProgress.get(key);
  },
};
// Fica perto de Confirmar, inclusive quando as opções avançadas estão recolhidas.
const answerButton = document.createElement('button');
answerButton.id = 'answer-key';
answerButton.type = 'button';
answerButton.className = 'quiet answer-key';
answerButton.textContent = 'Ver gabarito';
answerButton.hidden = true;
answerButton.title =
  'Aplica a configuração correta padrão e marca o nível como assistido. Depois, confirme a resposta para testar.';
answerButton.setAttribute(
  'aria-label',
  'Ver gabarito: aplicar a configuração correta padrão, sem confirmar automaticamente.',
);
document.querySelector('.level-actions .actions').appendChild(answerButton);
function answerKey() {
  return customLevel
    ? `custom:${game}:${customId}`
    : free
      ? endlessGenerated.level.id
      : `${game}:${catalogue[game][level].id ?? level}`;
}
function updateAnswerButton() {
  const progress = answerProgress.get(answerKey());
  answerButton.hidden = !answerProgress.unlocked(answerKey());
  answerButton.dataset.assisted = String(progress.assisted);
  answerButton.textContent = progress.assisted ? 'Reaplicar gabarito' : 'Ver gabarito';
  answerButton.setAttribute(
    'aria-label',
    `${answerButton.textContent}: aplicar a configuração correta padrão e marcar como assistido, sem confirmar automaticamente.`,
  );
}
// Aplica o gabarito autorizado e atualiza a tentativa atual.
function applyAnswerKey() {
  if (restartConfirmation.isOpen || !answerProgress.unlocked(answerKey())) return;
  finishOriginalGesture(true);
  const before = historySnapshot();
  resetOriginalHint();
  const answer = customLevel
    ? originalLevelAnswer(customLevel)
    : free
      ? structuredClone(endlessGenerated.answer)
      : getOriginalAnswer(game, level);
  // Troca atômica pela configuração certificada, sem mover fixos ou criar pilhas ilegais.
  invalidate();
  drag = null;
  pendingSlot = null;
  placementMessage = '';
  state = answer;
  if (game === 'cut') {
    cutMode = free ? 'advanced' : 'basic';
    cutDrafts = { basic: null, advanced: null };
  }
  selected = game === 'light' ? state.objects.findIndex((o) => o.type === 'mirror') : 0;
  commitOriginalEdit(before);
  answerProgress.assist(answerKey());
  $('hint-text').textContent =
    'Gabarito aplicado. Este desafio está marcado como assistido. Confira a configuração e clique em Confirmar resposta para testar.';
  render();
}
answerButton.onclick = applyAnswerKey;
// Preferência visual independente do progresso. Falhas de armazenamento não bloqueiam o jogo.
let controlsHidden = false;
try {
  controlsHidden = globalThis.localStorage?.getItem('intuicao.advanced-hidden') === 'true';
} catch {}
function applyControlsVisibility() {
  $('advanced-controls').hidden = controlsHidden;
  document.querySelector('.workspace').classList.toggle('controls-hidden', controlsHidden);
  $('toggle-controls').setAttribute('aria-expanded', String(!controlsHidden));
  $('toggle-controls').textContent = controlsHidden
    ? 'Mostrar opções avançadas'
    : 'Ocultar opções avançadas';
}
function toggleControls() {
  controlsHidden = !controlsHidden;
  applyControlsVisibility();
  try {
    writeProgress(globalThis.localStorage, 'intuicao.advanced-hidden', String(controlsHidden));
  } catch {}
}
let placementMessage = '',
  pendingSlot = null;
let game = 'light',
  free = false,
  level = 0,
  state = {},
  selected = 0,
  drag = null;
let originalHintPlan = null,
  originalHintTier = 0,
  originalHintKey = '';
function resetOriginalHint() {
  originalHintPlan = null;
  originalHintTier = 0;
  originalHintKey = '';
  $('hint-text').textContent = '';
}
function originalHintPosition() {
  return JSON.stringify([
    game,
    customLevel ? customId : free ? endlessGenerated?.level.id : level,
    cutMode,
    state,
    game === 'light' ? [phase, lightFired] : null,
  ]);
}
function showOriginalHint() {
  if (restartConfirmation.isOpen) return;
  const key = originalHintPosition();
  if (!originalHintPlan || key !== originalHintKey) {
    originalHintPlan = buildOriginalHint(
      game,
      free ? endlessGenerated.level : currentLevel(),
      state,
      { free, cutMode, selected, phase, ray: evaluation?.ray },
    );
    originalHintKey = key;
    originalHintTier = 0;
  }
  originalHintTier = Math.min(3, originalHintTier + 1);
  $('hint-text').textContent =
    originalHintPlan[['focusText', 'explanation', 'nextStep'][originalHintTier - 1]];
}
const cutCampaignProgress = createCutCampaignProgress();
const lightCampaignProgress = createLightCampaignProgress();
const lightCampaignBands = [
  ['basic', 'Básico', 1, 15],
  ['apprentice', 'Aprendiz', 16, 30],
  ['intermediate', 'Intermediário', 31, 45],
  ['advanced', 'Avançado', 46, 60],
  ['master', 'Mestre', 61, 75],
  ['sage', 'Modo Sábio', 76, 80],
];
const lightCampaignNumber = (l, i) =>
  Number.isInteger(l.campaignNumber) &&
  l.campaignNumber >= 1 &&
  l.campaignNumber <= catalogue.light.length
    ? l.campaignNumber
    : i + 1;
function lightCampaignSelection() {
  const progress = lightCampaignProgress.snapshot();
  let html = '';
  const entries = catalogue.light.map((l, i) => ({ l, i, number: lightCampaignNumber(l, i) }));
  for (const [band, name, first, last] of lightCampaignBands) {
    const levels = entries.filter(
      ({ l, number }) =>
        (l.campaignBand ??
          lightCampaignBands.find(([, , a, b]) => number >= a && number <= b)?.[0]) === band,
    );
    if (!levels.length) continue;
    html += `<h3 class="stage-heading" data-campaign-band="${band}">${name} · ${first}–${last}</h3>`;
    let groupOpen = false,
      previousStage;
    for (const { l, i, number } of levels) {
      const stage = ''; // The six 80-level tiers are the complete campaign grouping.
      if (!groupOpen || stage !== previousStage) {
        if (groupOpen) html += '</div>';
        if (stage) html += `<h4 class="stage-heading">${stage}</h4>`;
        html += `<div class="level-group" data-campaign-band="${band}">`;
        groupOpen = true;
        previousStage = stage;
      }
      const done = progress.completedIds.has(l.id),
        assisted = answerProgress.get(`light:${l.id ?? i}`).assisted,
        current = progress.lastLevelId === l.id;
      html += `<button class="level-tile ${done ? 'done' : ''}" data-level="${i}" aria-current="${current}" aria-label="Nível ${number}: ${l.name}${done ? ', concluído' : ''}${assisted ? ', assistido por gabarito' : ''}${current ? ', atual' : ''}"><span>${number}</span><small>${done ? (assisted ? '✓ com gabarito' : '✓ concluído') : assisted ? 'com gabarito' : current ? 'atual' : 'explorar'}</small></button>`;
    }
    if (groupOpen) html += '</div>';
  }
  return html;
}
function cutCampaignSelection() {
  const progress = cutCampaignProgress.snapshot();
  let html = '';
  for (const [band, name, first, last] of lightCampaignBands) {
    html += `<h3 class="stage-heading" data-campaign-band="${band}">${name} · ${first}–${last}</h3><div class="level-group" data-campaign-band="${band}">`;
    for (let i = first - 1; i < Math.min(last, catalogue.cut.length); i++) {
      const l = catalogue.cut[i],
        done = progress.completedIds.has(l.id),
        assisted = answerProgress.get(`cut:${l.id}`).assisted,
        current = (legacyCutSelectionIds[progress.lastLevelId] ?? progress.lastLevelId) === l.id;
      html += `<button class="level-tile ${done ? 'done' : ''}" data-level="${i}" aria-current="${current}" aria-label="Nível ${i + 1}: ${l.name}${done ? ', concluído' : ''}${assisted ? ', assistido por gabarito' : ''}${current ? ', atual' : ''}"><span>${i + 1}</span><small>${done ? (assisted ? '✓ com gabarito' : '✓ concluído') : assisted ? 'com gabarito' : current ? 'atual' : 'explorar'}</small></button>`;
    }
    html += '</div>';
  }
  return html;
}
// Abre a seleção de desafios e atualiza os controles de navegação.
function showSelection() {
  finishOriginalGesture(false);
  endDrag();
  saveCampaign();
  saveCustom();
  campaignActive = null;
  customLevel = null;
  customId = '';
  customImportRevision++;
  customStorage.hidden = true;
  customExport.hidden = true;
  resetOriginalHint();
  saveEndless();
  free = false;
  endlessPanel.hidden = true;
  restartConfirmation.dismiss();
  restartRevision++;
  placementMessage = '';
  pendingSlot = null;
  invalidate();
  drag = null;
  document.querySelector('.lab').hidden = true;
  $('selection').hidden = false;
  document
    .querySelectorAll('[data-game]')
    .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.game === game)));
  $('selection-title').textContent = { light: 'Reflexos ·', cut: 'Corte certo ·' }[game];
  const html = game === 'light' ? lightCampaignSelection() : cutCampaignSelection();
  $('selection-rules').innerHTML = rulesPreviewMarkup(game);
  $('level-grid').innerHTML = html;
  $('level-grid')
    .querySelectorAll('[data-level]')
    .forEach(
      (b) =>
        (b.onclick = () => {
          level = Number(b.dataset.level);
          free = false;
          start();
        }),
    );
  renderOriginalImport();
  $('selection-title').focus();
}

let phase = 'editing',
  evaluation = null,
  frame = 0,
  animationToken = 0,
  revealed = [],
  lightDistance = 0,
  lightFired = [];
// Invalida resultados pendentes antes de atualizar a tentativa.
function invalidate() {
  if (free && endlessRun) endlessRun.solved = false;
  clearTimeout(endlessTimer);
  endlessTimer = null;
  middleConfirm?.cancel();
  resultMotion.clear();
  cancelAnimationFrame(frame);
  animationToken++;
  phase = 'editing';
  evaluation = null;
  revealed = [];
  lightDistance = 0;
  lightFired = [];
  scene.setAttribute('aria-busy', 'false');
}
function finishResult() {
  // Exploração parcial não é uma resposta errada nem libera o próximo nível.
  if (game === 'light' && !evaluation.ray.complete) {
    phase = 'partial';
    scene.setAttribute('aria-busy', 'false');
    draw();
    return;
  }
  const success =
    game === 'light'
      ? evaluation.ray.status === 'target'
      : cutSuccess(evaluation.cut.ratio * 100, evaluation.snapshot.target);
  // Só uma confirmação errada concluída conta; desenhar, editar ou cancelar o raio não conta.
  if (!success && !evaluation.counted) {
    answerProgress.fail(answerKey());
    evaluation.counted = true;
  }
  phase = 'result';
  scene.setAttribute('aria-busy', 'false');
  draw();
  resultMotion.show(game, success);
  if (free && success) {
    clearTimeout(endlessTimer);
    endlessRun.solved = true;
    if (!endlessRun.awarded) {
      endlessRun.count++;
      endlessRun.awarded = true;
    }
    saveEndless();
    scheduleEndlessAdvance();
  }
}

// Confere a tentativa e encaminha o resultado para a interface.
function confirmAnswer() {
  if (
    restartConfirmation.isOpen ||
    (free && endlessRun?.solved && phase === 'result') ||
    phase === 'animating'
  )
    return;
  finishOriginalGesture(true);
  endDrag();
  resultMotion.clear();
  cancelAnimationFrame(frame);
  const token = ++animationToken;
  const snapshot = structuredClone(state);
  evaluation = { snapshot };
  if (game !== 'light') {
    evaluation.cut = curvedCut(shapePolygon(snapshot.shape), snapshot);
    finishResult();
    return;
  }
  lightFired = lightScene(snapshot).sources.map((_, i) => i);
  evaluation.ray = traceLightAttempt(snapshot, lightFired);
  animateLight(token);
}
function fireLightSource(index) {
  if (
    restartConfirmation.isOpen ||
    (free && endlessRun?.solved && phase === 'result') ||
    game !== 'light' ||
    phase === 'animating' ||
    !Number.isInteger(index) ||
    index < 0 ||
    index >= lightScene(state).sources.length
  )
    return;
  finishOriginalGesture(true);
  endDrag();
  if (phase === 'result') invalidate();
  if (lightFired.includes(index)) return; // Idempotente: não duplica disparos nem tentativas.
  const previous = evaluation?.ray ?? null;
  resultMotion.clear();
  cancelAnimationFrame(frame);
  const token = ++animationToken;
  const snapshot = structuredClone(state);
  lightFired.push(index);
  evaluation = { snapshot, ray: traceLightAttempt(snapshot, lightFired, { previous }) };
  animateLight(token);
}
// Apresenta a propagação dos raios calculada para a tentativa.
function animateLight(token) {
  const total = evaluation.ray.animationDistance;
  phase = 'animating';
  scene.setAttribute('aria-busy', 'true');
  lightDistance = 0;
  draw();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lightDistance = Infinity;
    finishResult();
    return;
  }
  const began = performance.now();
  function tick(now) {
    if (token !== animationToken || phase !== 'animating') return;
    lightDistance = (now - began) * 0.5;
    if (lightDistance >= total) {
      finishResult();
      return;
    }
    draw();
    frame = requestAnimationFrame(tick);
  }
  frame = requestAnimationFrame(tick);
}
const titles = {
  light: ['01', 'Encontre um caminho para a luz.'],
  cut: ['02', 'Um corte. Duas novas perspectivas.'],
};
const fmt = (n, d = 1) =>
  Number(n).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
const points = (p) => p.map((v) => `${v.x},${v.y}`).join(' ');
const line = (a, b, attrs = '') =>
  `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" ${attrs}/>`;
let cutMode = 'basic',
  cutDrafts = { basic: null, advanced: null },
  cutDragOrigin = null;
// Only puzzle edits enter this bounded, session-local history. Attempts, awards,
// completion and assistance live outside snapshots and can never be undone.
const ORIGINAL_HISTORY_LIMIT = 80;
let historyPast = [],
  historyFuture = [],
  historyGesture = null;
function historySnapshot() {
  return {
    state: structuredClone(state),
    cutMode,
    cutDrafts: structuredClone(cutDrafts),
    selected,
  };
}
const sameHistoryState = (a, b) => JSON.stringify(a.state) === JSON.stringify(b.state);
function updateOriginalHistoryButtons() {
  const blocked = restartConfirmation.isOpen || document.querySelector('.lab').hidden;
  $('undo').disabled =
    blocked ||
    (!historyPast.length &&
      (!historyGesture || sameHistoryState(historyGesture.before, historySnapshot())));
  $('redo').disabled = blocked || !!historyGesture || !historyFuture.length;
}
function commitOriginalEdit(before) {
  if (!sameHistoryState(before, historySnapshot())) {
    historyPast.push(before);
    if (historyPast.length > ORIGINAL_HISTORY_LIMIT) historyPast.shift();
    historyFuture = [];
  }
  updateOriginalHistoryButtons();
}
function restoreHistorySnapshot(snapshot) {
  state = structuredClone(snapshot.state);
  cutMode = snapshot.cutMode;
  cutDrafts = structuredClone(snapshot.cutDrafts);
  selected = snapshot.selected;
}
function beginOriginalGesture(kind, owner) {
  if (historyGesture?.kind === kind && historyGesture.owner === owner) return;
  finishOriginalGesture(true);
  historyGesture = { kind, owner, before: historySnapshot() };
  updateOriginalHistoryButtons();
}
function finishOriginalGesture(commit = true) {
  if (!historyGesture) return false;
  const before = historyGesture.before;
  historyGesture = null;
  if (commit) commitOriginalEdit(before);
  else {
    restoreHistorySnapshot(before);
    invalidate();
    updateOriginalHistoryButtons();
  }
  saveEndless();
  saveCustom();
  return true;
}
function clearOriginalHistory() {
  historyPast = [];
  historyFuture = [];
  historyGesture = null;
}
// Restaura um estado anterior ou posterior da tentativa.
function travelOriginalHistory(direction) {
  if (restartConfirmation.isOpen || document.querySelector('.lab').hidden) return;
  finishOriginalGesture(true);
  endDrag();
  const from = direction < 0 ? historyPast : historyFuture,
    to = direction < 0 ? historyFuture : historyPast;
  if (!from.length) {
    updateOriginalHistoryButtons();
    return;
  }
  const snapshot = from.pop();
  to.push(historySnapshot());
  if (to.length > ORIGINAL_HISTORY_LIMIT) to.shift();
  restoreHistorySnapshot(snapshot);
  invalidate();
  resetOriginalHint();
  editor();
  draw();
}

const allowed = (key) =>
  free ||
  (cutMode === 'advanced' &&
    (['x', 'y', 'rotate', 'offset'].includes(key) || Boolean(currentLevel().permissions?.[key])));
const cutDirection = () => {
  const a = (currentLevel().basicDirection * Math.PI) / 180;
  return { x: Math.cos(a), y: Math.sin(a) };
};
function setCutMode(mode) {
  if (game !== 'cut' || free || mode === cutMode) return;
  finishOriginalGesture(true);
  const before = historySnapshot();
  resetOriginalHint();
  cutDrafts[cutMode] = structuredClone(state);
  cutMode = mode;
  state = structuredClone(cutDrafts[mode] ?? state);
  invalidate();
  drag = null;
  commitOriginalEdit(before);
  editor();
  draw();
  $('cut-mode-' + mode)?.focus();
}
function setBasicTravel(value) {
  const l = currentLevel();
  state = basicCutState(l, clamp(value, l.basicMin, l.basicMax));
}
// Os símbolos descrevem ações, não apenas cores. O alvo transparente facilita o toque.
function cutHandle(id, x, y, label, detail, kind, angle = 0) {
  const rotation = kind === 'rotate',
    move = kind === 'move';
  const shell = move
    ? '<rect class="cut-grip-face" x="-17" y="-17" width="34" height="34" rx="10"/>'
    : '<circle class="cut-grip-face" r="17"/>';
  const glyph = rotation
    ? '<path d="M-7 3 A8 8 0 1 1 6 6 M-7 3 L-8-3 M-7 3 L-1 2"/>'
    : move
      ? '<path d="M-9 0 H9 M0-9 V9 M-9 0 L-6-3 M-9 0 L-6 3 M9 0 L6-3 M9 0 L6 3 M0-9 L-3-6 M0-9 L3-6 M0 9 L-3 6 M0 9 L3 6"/>'
      : `<path transform="rotate(${angle})" d="M-9 0 H9 M-9 0 L-5-4 M-9 0 L-5 4 M9 0 L5-4 M9 0 L5 4"/>`;
  const tooltipX = Math.max(-x + 8, Math.min(-54, 800 - x - 116)),
    tooltipY = y < 62 ? 29 : -47;
  return `<g data-item="${id}" class="handle cut-grip cut-grip-${kind}" tabindex="0" role="button" aria-label="${label}. ${detail}" transform="translate(${x} ${y})"><title>${label} · ${detail}</title><circle class="cut-grip-hit" r="24"/>${shell}<g class="cut-grip-icon">${glyph}</g><g class="cut-grip-tip" transform="translate(${tooltipX} ${tooltipY})" aria-hidden="true"><rect width="108" height="23" rx="7"/><text x="54" y="15" text-anchor="middle">${label}</text></g></g>`;
}
function advancedCutHandles(c, p) {
  const clampPoint = (q) => ({ x: clamp(q.x, 24, 776), y: clamp(q.y, 24, 408) });
  let positions = [
    clampPoint({ x: p.x + c.n.y * 80, y: p.y - c.n.x * 80 }),
    clampPoint({ x: state.centerX, y: state.centerY }),
    clampPoint({ x: state.centerX - c.n.y * 80, y: state.centerY + c.n.x * 80 }),
  ];
  const crowded = positions.some((a, i) =>
    positions.some((b, j) => j > i && Math.hypot(a.x - b.x, a.y - b.y) < 48),
  );
  if (crowded)
    positions = [
      { x: 320, y: 40 },
      { x: 400, y: 40 },
      { x: 480, y: 40 },
    ];
  const [slide, move, rotate] = positions;
  return `${crowded ? '<text x="400" y="78" text-anchor="middle" font-size="11" fill="#686270">Alças reposicionadas para não se sobrepor</text>' : ''}${cutHandle('cut', slide.x, slide.y, 'Deslizar curva', 'Arraste na direção das setas ou use as teclas de seta.', 'offset', state.angle)}${cutHandle('move-curve', move.x, move.y, 'Mover curva', 'Arraste para mover livremente ou use as teclas de seta.', 'move')}${cutHandle('rotate-curve', rotate.x, rotate.y, 'Girar curva', 'Arraste ao redor do centro ou use as teclas de seta.', 'rotate')}`;
}
function cutControlGuide() {
  const l = currentLevel();
  const tabs = free
    ? ''
    : `<div class="cut-mode-tabs" role="tablist" aria-label="Modo de controle da curva"><button id="cut-mode-basic" role="tab" aria-selected="${cutMode === 'basic'}" aria-controls="cut-control-panel">Desafio básico</button><button id="cut-mode-advanced" role="tab" aria-selected="${cutMode === 'advanced'}" aria-controls="cut-control-panel">Controles da curva</button></div>`;
  if (!free && cutMode === 'basic')
    return `${tabs}<div id="cut-control-panel" role="tabpanel" aria-labelledby="cut-mode-basic" class="cut-basic-panel"><strong>Uma direção, um movimento</strong><p>A seta indica o único eixo desta fase: ${l.basicDirection}°. Arraste a alça ou ajuste o deslocamento abaixo. A curva não gira neste modo.</p>${field('basicTravel', 'Deslocamento na direção indicada', l.basicMin, l.basicMax, 0.1, state.basicTravel ?? l.initialTravel)}<small>Trocar de aba guarda seu ajuste; voltar ao básico recupera a tentativa anterior.</small></div>`;
  const entries = [
    ['move', '↔', 'Mover curva', 'Arraste o quadrado para mover livremente.'],
    ['rotate', '↻', 'Girar curva', 'Arraste a alça dourada ao redor do centro.'],
    ['offset', '↔', 'Deslizar curva', 'Arraste o círculo na direção das setas.'],
  ];
  return `${tabs}<div id="cut-control-panel" role="tabpanel" ${free ? '' : 'aria-labelledby="cut-mode-advanced"'} class="cut-control-guide"><strong>Controles da curva · exploração avançada</strong>${entries.map(([kind, icon, label, detail]) => `<div class="cut-guide-row"><span class="cut-guide-icon cut-guide-${kind}" aria-hidden="true">${icon}</span><span><b>${label}</b><small>${detail}</small></span></div>`).join('')}<p>Tab seleciona uma alça; as setas ajustam. ${free ? '' : 'Voltar ao básico restaura seu último ajuste nessa aba.'}</p></div>`;
}

const field = (key, label, min, max, step, value, unit = '', disabled = false) =>
  `<div class="field"><header><label for="${key}">${label}</label><output id="${key}-out" for="${key}">${fmt(value, step < 0.1 ? 2 : 1)}${unit}</output></header><div class="precision"><input id="${key}" data-bind="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label}" ${disabled ? 'disabled' : ''}><input id="${key}-number" data-bind="${key}" type="number" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label} (valor)" ${disabled ? 'disabled' : ''}></div></div>`;
// Reinicia a tentativa atual após a confirmação do jogador.
function restartOriginalNow() {
  if (document.querySelector('.lab').hidden) return;
  finishOriginalGesture(true);
  endDrag();
  middleConfirm?.cancel();
  clearTimeout(endlessTimer);
  endlessTimer = null;
  const open = $('original-rules-panel').open;
  start(false, true);
  $('original-rules-panel').open = open;
  syncOriginalRules();
}
// Prepara a fase selecionada e sua apresentação.
function start(resumeCustom = false, fresh = false) {
  clearOriginalHistory();
  customImportRevision++;
  const resume =
    customLevel && resumeCustom ? structuredClone(customSaved[customId] ?? null) : null;
  resetOriginalHint();
  restartConfirmation.dismiss();
  restartRevision++;
  placementMessage = '';
  pendingSlot = null;
  invalidate();
  drag = null;
  $('selection').hidden = true;
  document.querySelector('.lab').hidden = false;
  selected = 0;
  const l = currentLevel();
  campaignActive = !free && !customLevel ? { game, id: l.id ?? level } : null;
  if (campaignActive) (game === 'light' ? lightCampaignProgress : cutCampaignProgress).visit(l.id);
  if (free) {
    try {
      endlessGenerated = generateOriginalEndless(game, endlessRun.seed, endlessRun.options);
    } catch (error) {
      free = false;
      showSelection();
      $('selection-title').textContent =
        'Não foi possível gerar este desafio. Abra o modo livre e tente outra configuração.';
      return;
    }
    state = structuredClone(endlessGenerated.initial);
    endlessRun.solved = false;
    cutMode = 'advanced';
    cutDrafts = { basic: null, advanced: null };
    if (game === 'light') selected = state.objects.findIndex((o) => o.type === 'mirror');
  }
  if (game === 'light' && !free) {
    state = {
      objects: structuredClone(l.objects),
      target: { ...l.target, radius: 22 },
      sourceAngle: l.sourceAngle ?? 0,
      ...(!free
        ? {
            sources: structuredClone(l.sources),
            targets: structuredClone(l.targets),
            portals: structuredClone(l.portals ?? []),
          }
        : {}),
    };
    selected = state.objects.findIndex((o) => o.type === 'mirror');
  }
  if (game === 'cut' && !free) {
    cutMode = free ? 'advanced' : 'basic';
    cutDrafts = { basic: null, advanced: null };
    state = basicCutState(l);
    if (free) state.holes = [];
  }
  if (!free && !customLevel && !fresh) {
    const saved = campaignSaved[`${game}:${l.id ?? level}`],
      definition = { ...l, game };
    if (
      saved &&
      validOriginalSnapshot(
        definition,
        saved.state,
        saved.cutMode === 'advanced' ? 'advanced' : 'basic',
      )
    ) {
      state = structuredClone(saved.state);
      if (game === 'cut') {
        cutMode = saved.cutMode === 'advanced' ? 'advanced' : 'basic';
        for (const mode of ['basic', 'advanced'])
          if (validOriginalSnapshot(definition, saved.cutDrafts?.[mode], mode))
            cutDrafts[mode] = structuredClone(saved.cutDrafts[mode]);
      }
    }
  }
  if (customLevel) {
    state = originalLevelState(customLevel);
    cutMode = 'basic';
    cutDrafts = { basic: null, advanced: null };
    if (
      resume &&
      validOriginalSnapshot(
        customLevel,
        resume.state,
        resume.cutMode === 'advanced' ? 'advanced' : 'basic',
      )
    ) {
      state = structuredClone(resume.state);
      if (game === 'cut') {
        cutMode = resume.cutMode === 'advanced' ? 'advanced' : 'basic';
        for (const mode of ['basic', 'advanced'])
          if (validOriginalSnapshot(customLevel, resume.cutDrafts?.[mode], mode))
            cutDrafts[mode] = structuredClone(resume.cutDrafts[mode]);
      }
    }
    if (game === 'light') selected = state.objects.findIndex((o) => o.type === 'mirror');
  }
  configureOriginalRules();
  $('hint-text').textContent = answerProgress.get(answerKey()).assisted
    ? 'Este desafio está marcado como assistido por gabarito.'
    : '';
  render();
  $('game-title').setAttribute('tabindex', '-1');
  $('game-title').focus();
}
function syncOriginalRules() {
  const panel = $('original-rules-panel'),
    sidebar = $('original-rules-sidebar');
  sidebar.hidden = !panel.open;
  document.querySelector('.workspace').classList.toggle('rules-open', panel.open);
  panel.querySelector('summary').setAttribute('aria-expanded', String(panel.open));
}
const originalRuleMechanicsSeen = new Map();
function configureOriginalRules() {
  const context = getRulesContext(
    game,
    free ? { ...endlessGenerated.level, ...endlessGenerated.initial } : currentLevel(),
    {
      catalogue: catalogue[game],
      index: level,
      mode: free ? 'endless' : customLevel ? 'custom' : 'campaign',
    },
  );
  $('original-rules-context-title').textContent = context.title;
  $('original-rules-context-text').textContent =
    context.text +
    (game === 'cut' && !free && !customLevel && (currentLevel().discovery ?? currentLevel().lesson)
      ? ' ' + (currentLevel().discovery ?? currentLevel().lesson)
      : '');
  let autoOpen = context.autoOpen;
  if (free) {
    const seen = originalRuleMechanicsSeen.get(game) ?? new Set();
    autoOpen = context.mechanics.some((key) => !seen.has(key));
    context.mechanics.forEach((key) => seen.add(key));
    originalRuleMechanicsSeen.set(game, seen);
  }
  $('original-rules-panel').open = true;
  syncOriginalRules();
}
$('original-rules-panel').ontoggle = syncOriginalRules;
// Atualiza a apresentação da partida a partir do estado atual.
function render() {
  // A leitura do corte acompanha a meta no palco; Reflexos mantém seu lugar original.
  const metricHost = game === 'cut' ? $('cut-board-summary') : $('feedback').parentElement;
  if ($('original-metric').parentElement !== metricHost) {
    if (game === 'cut') metricHost.append($('original-metric'));
    else metricHost.insertBefore($('original-metric'), $('feedback'));
  }

  renderEndlessPanel();
  document.querySelector('.level-picker').hidden = free || !!customLevel;
  customExport.hidden = !customLevel;
  customStorage.hidden = !customLevel || !customStorageWarning;
  document
    .querySelectorAll('[data-game]')
    .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.game === game)));
  $('challenge').setAttribute('aria-pressed', String(!free));
  $('free').setAttribute('aria-pressed', String(free));
  $('game-kicker').textContent = 'EXPERIMENTO ' + titles[game][0];
  $('game-title').textContent = customLevel ? customLevel.name : titles[game][1];
  $('scene-title').textContent = titles[game][1];
  $('scene-desc').textContent =
    game === 'light'
      ? 'Gire os espelhos pelas alças. Clique nas fontes, ou use Tab e Enter ou Espaço, para disparar um raio de cada vez. Confirmar todos dispara o conjunto. Editar limpa os rastros.'
      : 'Use os controles rotulados abaixo ou ao lado. Arraste os elementos ajustáveis; o teclado também funciona nos controles. Clique na rodinha do mouse sobre o tabuleiro para avaliar a resposta.';
  $('level').innerHTML = catalogue[game]
    .map(
      (l, i) =>
        `<option value="${i}">${game === 'light' ? lightCampaignNumber(l, i) : i + 1}. ${l.name}</option>`,
    )
    .join('');
  $('level').value = level;
  $('level').disabled = free || !!customLevel;
  $('level-prev').hidden = free || !!customLevel;
  $('level-next').hidden = free || !!customLevel;
  $('level-prev').disabled = level === 0;
  $('level-next').disabled = level === catalogue[game].length - 1;
  $('confirm').title =
    game === 'cut' ? 'Também pode avaliar clicando na rodinha do mouse sobre o tabuleiro.' : '';
  $('stage-label').textContent = customLevel
    ? 'FASE PERSONALIZADA'
    : free
      ? `Modo Sem Parar · DESAFIO ${endlessRun.count + 1}`
      : `DESAFIO ${String(game === 'light' ? lightCampaignNumber(currentLevel(), level) : level + 1).padStart(2, '0')} / ${String(catalogue[game].length).padStart(2, '0')}`;
  $('mission').textContent =
    game === 'light'
      ? free
        ? 'Ajuste os espelhos para cada cor chegar ao seu alvo, sem cruzar outra cor. As posições são fixas. Acertar gera o próximo desafio.'
        : 'Gire os espelhos. Clique em cada fonte para disparar separadamente, ou em Confirmar todos. Os raios ficam no palco; editar limpa todos. Cada cor deve alcançar seu próprio alvo, sem cruzar outra cor. Os símbolos também identificam cada par. Alvos aceitam 22 unidades de tolerância; espelhos e paredes têm posições fixas.'
      : free
        ? `Deixe ${state.target}% da área preenchida no lado roxo. Tolerância: ±3 pontos percentuais. Acertar gera o próximo desafio.`
        : `Deixe ${state.target}% da área no lado roxo. Tolerância: ±3 pontos percentuais, incluindo o limite.`;
  if (game === 'light' && !free)
    $('mission').textContent += ' ' + (currentLevel().wallPurpose ?? []).join(' ');
  if (game === 'cut' && !free)
    $('mission').textContent +=
      ` No modo básico, mova somente na direção indicada (${currentLevel().basicDirection}°). Os controles livres ficam na aba Controles da curva.`;
  if (game === 'cut')
    $('mission').textContent +=
      ` Corte: ${state.family}. ${state.family === 'Reta' ? '' : `Amplitude ${state.amplitude}${state.family === 'Seno' ? `; frequência ${state.frequency}` : ''}.`}`;
  if (game === 'cut' && state.holes.length)
    $('mission').textContent +=
      ` ${state.holes.length} espaço(s) vazio(s): não pertencem à área. Divida apenas a parte preenchida.`;
  $('hint').hidden = false;
  $('next').hidden = free || !!customLevel;
  $('next').disabled = level === catalogue[game].length - 1;
  const texts = {
    light:
      'A cada trecho, o raio encontra a superfície mais próxima. Paredes são retângulos sólidos com espessura real e absorvem a luz; espelhos refletem segundo d′ = d − 2(d·n)n. O disco da mesma cor aceita o raio: raio geométrico de 22 unidades do palco. A primeira entrada no disco precisa estar antes da próxima superfície; uma parede vence o empate. Cada raio para em 12 reflexões ou 40 eventos, sem loop infinito. Portais mantêm a direção e pulam para o par; o salto não é um segmento físico. Cores diferentes não podem cruzar nem tocar trajetórias. Portais seletivos bloqueiam cores não permitidas. Os ângulos são medidos em coordenadas de tela, com y para baixo. A normal pontilhada é perpendicular ao espelho no ponto de impacto. As setas indicam a direção de propagação. As bordas são paredes. Evite sobrepor objetos: paredes têm prioridade em empates.',
    cut: 'Retas usam recorte exato. Curvas são gráficos sem autointerseção, aproximados por segmentos de passo máximo 1; cada faixa é recortada geometricamente. Um limite de segunda derivada controla o erro de área, muito menor que a margem de jogo. O contorno roxo é calculado pelas interseções reais da linha com as arestas; sua área usa a fórmula do cadarço. A proporção exibida é área roxa útil ÷ área total útil. Buracos são subtraídos de ambas: espaços vazios nunca contam, mesmo quando atravessados pela curva. O ângulo controla a normal da linha: 0° produz um corte vertical. Deslocamento positivo aumenta a região roxa. Não usamos contagem de pixels. Acerto: erro absoluto de até 3 pontos percentuais, incluindo os dois limites; isso não é 3% relativo à meta.',
  };
  $('explanation').textContent = texts[game];
  applyControlsVisibility();
  updateAnswerButton();
  editor();
  draw();
}
// Apresenta as observações e explicações da fase selecionada.
function renderLevelNotes() {
  let notes = '';
  if (game === 'light') {
    if (!free) {
      const l = currentLevel();
      if (!customLevel && l.tutorial)
        notes += `<div class="light-note" role="note"><strong>Nova ideia</strong>${l.tutorial}</div>`;
      if (state.portals?.length)
        notes +=
          '<div class="light-note"><strong>Como usar os portais</strong>Portais com a mesma letra formam um par. A luz entra em um e sai do outro mantendo a direção. Branco aceita todas as cores; os símbolos coloridos indicam as cores permitidas. Uma cor não permitida é bloqueada. O salto entre portais não cruza outros raios.</div>';
      if (state.sources?.length > 1)
        notes +=
          '<div class="light-note"><strong>Disparo individual</strong>Clique na fonte de cada cor, ou use Tab e Enter/Espaço. O anel e o ✓ mostram quais já dispararam. Clicar novamente em uma fonte já usada não repete a tentativa; após o resultado, inicia outra. Só disparar todas as fontes conclui a tentativa. Confirmar todos dispara o conjunto de uma vez. Editar qualquer ajuste ou recomeçar limpa todos os raios.<br><strong>Caminhos separados</strong>Cada raio deve chegar ao alvo da mesma cor e símbolo. Cruzar ou encostar na trajetória de outra cor é colisão, mesmo em disparos separados. Raios parados não voltam a avançar.</div>';
    }
  }
  if (game === 'cut') notes = cutControlGuide();
  $('original-rules-notes').innerHTML = game === 'light' ? notes : '';
  $('level-notes').innerHTML = game === 'cut' ? notes : '';
  $('level-notes').hidden = game !== 'cut' || !notes;
}
function editor() {
  renderLevelNotes();
  let html = '';
  if (game === 'light') {
    html = `<label for="selected">Elemento selecionado</label><select id="selected">${state.objects.map((o, i) => (o.type === 'mirror' ? `<option value="${i}">${o.type === 'mirror' ? 'Espelho' : 'Parede'} ${i + 1}</option>` : '')).join('')}</select>`;
    const o = selected === 'target' ? state.target : state.objects[selected];
    html += field('angle', 'Ângulo do elemento', -90, 90, 0.1, o.angle, '°');
  }
  if (game === 'cut') {
    if (!free && cutMode === 'basic')
      html =
        '<p class="cut-panel-note">O desafio básico tem um único controle, abaixo do nível. Abra a aba Controles da curva para mover, girar e deslizar livremente.</p>';
    else {
      html +=
        field('centerX', 'Mover · horizontal', -400, 1200, 0.1, state.centerX) +
        field('centerY', 'Mover · vertical', -400, 860, 0.1, state.centerY) +
        field('cutAngle', 'Girar curva', 0, 360, 0.1, state.angle, '°') +
        field('offset', 'Deslizar curva', -600, 600, 0.1, state.offset);
      if (allowed('amplitude'))
        html += field('amplitude', 'Amplitude da curva', -120, 120, 1, state.amplitude);
      if (allowed('frequency') && ['Seno', 'Cosseno'].includes(state.family))
        html += field('frequency', 'Frequência da onda', 0.5, 2, 0.5, state.frequency);
    }
  }
  $('editor').innerHTML = html;
  if ($('cut-mode-basic')) $('cut-mode-basic').onclick = () => setCutMode('basic');
  if ($('cut-mode-advanced')) $('cut-mode-advanced').onclick = () => setCutMode('advanced');
  if ($('selected')) {
    $('selected').value = selected;
    $('selected').onchange = (e) => {
      selected = e.target.value === 'target' ? 'target' : Number(e.target.value);
      editor();
      draw();
    };
  }
  [
    ...document.querySelectorAll('#editor [data-bind]'),
    ...document.querySelectorAll('#level-notes [data-bind]'),
  ].forEach((el) => {
    const finish = (commit) => {
      if (historyGesture?.kind === 'field' && historyGesture.owner === el.id) {
        finishOriginalGesture(commit);
        if (!commit) {
          editor();
          draw();
        }
      }
    };
    el.addEventListener('input', () => {
      if (el.value !== '' && el.validity?.valid !== false && Number.isFinite(Number(el.value))) {
        beginOriginalGesture('field', el.id);
        change(el.dataset.bind, Number(el.value));
      }
    });
    el.addEventListener('change', () => finish(true));
    el.addEventListener('blur', () => finish(true));
    el.addEventListener('pointerup', () => finish(true));
    el.addEventListener('pointercancel', () => finish(false));
  });
}
function change(key, v) {
  // Tanto os sliders quanto os campos numéricos passam pelo mesmo caminho de atualização.
  if (!Number.isFinite(v)) return;
  const before = historyGesture ? null : historySnapshot();
  invalidate();
  const slider = $(key);
  v = clamp(v, Number(slider.min), Number(slider.max));
  slider.value = v;
  $(key + '-number').value = v;
  if (game === 'light' && key === 'angle') state.objects[selected].angle = v;
  if (game === 'cut') {
    if (key === 'basicTravel' && cutMode === 'basic') setBasicTravel(v);
    if (key === 'cutAngle' && allowed('rotate')) state.angle = v;
    if (key === 'offset' && allowed('offset')) state.offset = v;
    if (key === 'centerX' && allowed('x')) state.centerX = v;
    if (key === 'centerY' && allowed('y')) state.centerY = v;
    if (key === 'amplitude' && allowed('amplitude')) state.amplitude = v;
    if (key === 'frequency' && allowed('frequency')) state.frequency = v;
  }
  const units = { angle: '°', cutAngle: '°', sourceAngle: '°', target: '%' };
  if ($(key + '-out'))
    $(key + '-out').textContent = fmt(v, key === 'position' ? 2 : 1) + (units[key] ?? '');
  if (before) commitOriginalEdit(before);
  draw();
}
function status(label, value, message, success) {
  updateAnswerButton();
  if (success && answerProgress.get(answerKey()).assisted) message += ' Concluído com gabarito.';
  const partial = game === 'light' && phase === 'partial';
  $('confirm').disabled = phase === 'animating';
  $('confirm').textContent =
    phase === 'animating'
      ? 'Raio em percurso…'
      : game === 'light'
        ? 'Confirmar todos'
        : 'Confirmar resposta';
  // O quadro de regras fica disponível durante a edição e o resultado.
  if (phase !== 'result') {
    success = false;
    if (partial) {
      label = 'Disparo parcial';
      message = `${lightFired.length} de ${lightScene(state).sources.length} fontes disparadas. ${evaluation.ray.outcome === 'collision' ? 'Houve colisão; os raios pararam no impacto. ' : ''}Clique em outra fonte ou em Confirmar todos. Editar limpa os rastros. Ainda não conta como tentativa completa.`;
    } else {
      label = phase === 'animating' ? 'Experimento em andamento' : 'Prepare sua resposta';
      value = '—';
      message =
        phase === 'animating' ? 'Aguarde a luz percorrer o caminho. Editar cancela o disparo.' : '';
    }
  }
  $('metric-label').textContent = label;
  $('metric').textContent = value;
  $('feedback').textContent =
    placementMessage ||
    (phase === 'result' ? (success ? 'Vitória! ' : 'Ainda não. ') + message : message);
  $('feedback').classList.toggle('success', success);
  $('feedback').classList.toggle('sr-only', phase === 'result' && !success && !placementMessage);
  if (success && !free && !customLevel) {
    (game === 'light' ? lightCampaignProgress : cutCampaignProgress).complete(currentLevel().id);
  }
  $('next').disabled = phase !== 'result' || !success;
  $('next').textContent =
    level === catalogue[game].length - 1 ? 'Voltar ao início ↺' : 'Próximo desafio →';
}
function draw() {
  // Só descarta a orientação quando a configuração ou o disparo observado muda.
  // Selecionar uma alça ou abrir controles não consome nem reinicia as dicas.
  if (originalHintPlan && originalHintKey !== originalHintPosition()) resetOriginalHint();
  const focusedSource =
    document.activeElement?.closest?.('[data-light-source]')?.dataset.lightSource;
  let svg =
    '<defs><pattern id="dots" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#d8ded0"/></pattern></defs><rect width="800" height="460" fill="url(#dots)"/>';
  if (game === 'light') {
    const r = evaluation?.ray ?? { rays: [], collisions: [], bounces: 0, status: 'pending' };
    if (phase !== 'editing') {
      const distance = phase === 'animating' ? lightDistance : Infinity;
      svg += worldRaysSVG(lightAttemptFrame(r, distance), distance, true);
    }
    svg += portalSVG(state.portals ?? [], performance.now() / 1000);
    svg += lightEndpointsSVG(state, false, {
      firedSourceIndices: lightFired,
      busy: phase === 'animating',
      complete: phase === 'result',
    });
    state.objects
      .map((o, i) => ({ o, i }))
      .sort((a, b) => (a.o.type === 'wall' ? 0 : 1) - (b.o.type === 'wall' ? 0 : 1))
      .forEach(({ o, i }) => {
        const s = segment(o);
        // A alça fica sobre o vidro, na posição confortável anterior; a superfície usa o comprimento inteiro.
        const grip =
          o.type === 'mirror' ? segment({ ...o, length: Math.min(o.length, 104) }).b : s.b;
        if (o.type === 'wall') {
          svg += `<g aria-label="Parede sólida"><polygon points="${points(wallPolygon(o))}" class="light-wall-body"/><path d="M${s.a.x},${s.a.y} L${s.b.x},${s.b.y}" class="light-wall-inset"/></g>`;
          return;
        }
        svg += `<g data-item="${i}" tabindex="0" role="button" class="handle" aria-label="Espelho ${i + 1}, ${o.angle} graus">${line(s.a, s.b, 'stroke="transparent" stroke-width="30"')}${line(s.a, s.b, 'class="mirror-frame"')}${line(s.a, s.b, 'class="mirror-glass"')}${line(s.a, s.b, 'stroke="#ffffff" stroke-width="1" stroke-dasharray="18 9"')}<circle cx="${o.x}" cy="${o.y}" r="${selected === i ? 6 : 3}" fill="${selected === i ? '#c76b42' : '#fffefa'}"/><text x="${o.x + 10}" y="${o.y - 10}" font-size="11">${i + 1}</text><circle data-rotate="${i}" cx="${grip.x}" cy="${grip.y}" r="14" fill="#fffefa" stroke="#c76b42" stroke-width="1.5"/><text x="${grip.x}" y="${grip.y + 4}" text-anchor="middle" pointer-events="none" font-size="14">↻</text></g>`;
      });
    const message =
      r.status === 'target'
        ? 'Todos os alvos alcançados, sem cruzamentos!'
        : r.status === 'collision'
          ? `Colisão entre ${r.collisions[0].colors.map(beamName).join(' e ')}. Separe as trajetórias; o ponto está marcado.`
          : 'Algum raio não alcançou seu alvo. Reveja espelhos, paredes e cores dos portais.';
    status(
      'Alvos',
      `${r.rays.filter((v) => v.status === 'target').length} / ${lightScene(state).sources.length}`,
      message,
      r.status === 'target',
    );
    if (phase === 'result' && r.status === 'collision') $('feedback').classList.remove('sr-only');
  }
  if (game === 'cut') {
    const poly = shapePolygon(state.shape),
      c = phase === 'result' ? evaluation.cut : curvedCut(poly, state),
      p = { x: state.centerX + c.n.x * state.offset, y: state.centerY + c.n.y * state.offset };
    const holes = state.holes.map((r) => `<polygon points="${points(r)}" fill="black"/>`).join('');
    if (isFaunaShape(state.shape)) {
      const path = getFaunaGeometry(state.shape).path;
      svg += `<defs><mask id="shape-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="460"><rect width="800" height="460" fill="black"/><path d="${path}" fill="white" fill-rule="evenodd"/></mask><clipPath id="outer-clip"><path d="${path}" clip-rule="evenodd"/></clipPath></defs><g mask="url(#shape-mask)"><path data-shape="cut-region" d="${path}" fill="#e5e8df" fill-rule="evenodd"/><polygon points="${points(c.region)}" fill="#a89bc9"/></g><polyline points="${points(c.curve)}" fill="none" stroke="#584976" stroke-width="3" stroke-dasharray="9 6"/>`;
    } else {
      svg += `<defs><mask id="shape-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="460"><rect width="800" height="460" fill="black"/><polygon points="${points(poly)}" fill="white"/>${holes}</mask><clipPath id="outer-clip"><polygon points="${points(poly)}"/></clipPath></defs><g mask="url(#shape-mask)"><polygon data-shape="cut-region" points="${points(poly)}" fill="#e5e8df"/><polygon points="${points(c.region)}" fill="#a89bc9"/></g><polyline points="${points(c.curve)}" fill="none" stroke="#584976" stroke-width="3" stroke-dasharray="9 6"/>`;
    }
    if (!free && cutMode === 'basic') {
      const d = cutDirection(),
        h = { x: clamp(p.x, 48, 752), y: clamp(p.y, 48, 398) };
      svg += `<g class="cut-direction" aria-hidden="true"><line x1="${h.x - d.x * 48}" y1="${h.y - d.y * 48}" x2="${h.x + d.x * 48}" y2="${h.y + d.y * 48}" stroke="#75618d" stroke-width="2" stroke-dasharray="3 5"/><path transform="translate(${h.x} ${h.y}) rotate(${currentLevel().basicDirection})" d="M-48 0 l8-5 m-8 5 l8 5 M48 0 l-8-5 m8 5 l-8 5" fill="none" stroke="#75618d" stroke-width="2"/></g>${cutHandle('basic-cut', h.x, h.y, 'Mover no eixo', `Única direção liberada: ${currentLevel().basicDirection} graus. Arraste ou use as setas.`, 'offset', currentLevel().basicDirection)}`;
    } else svg += advancedCutHandles(c, p);
    $('cut-goal-caption').innerHTML =
      `<span>Lado roxo · meta <strong>${state.target}%</strong></span>${!free && cutMode === 'basic' ? ' <span class="cut-axis-note">Um único eixo</span>' : ''}`;
    const err = c.ratio * 100 - state.target,
      ok = cutSuccess(c.ratio * 100, state.target);
    status(
      'Área roxa',
      fmt(c.ratio * 100) + '%',
      ok
        ? 'Corte encontrado! Dentro de ±3 pontos percentuais (limite incluído).'
        : `Fora da margem de ±3 pp: ${fmt(Math.abs(err), 2)} pontos percentuais ${err > 0 ? 'acima' : 'abaixo'} da meta.`,
      ok,
    );
  }
  saveEndless();
  saveCustom();
  updateOriginalHistoryButtons();
  drawing.innerHTML = svg;
  if (focusedSource !== undefined)
    drawing.querySelector(`[data-light-source="${focusedSource}"]`)?.focus({ preventScroll: true });
}
// O SVG mantém a captura do ponteiro enquanto o desenho interno é atualizado.
function localPoint(e) {
  const p = scene.createSVGPoint();
  p.x = e.clientX;
  p.y = e.clientY;
  return p.matrixTransform(scene.getScreenCTM().inverse());
}
middleConfirm = bindMiddleConfirm(scene, {
  enabled: () =>
    game === 'cut' &&
    !document.querySelector('.lab').hidden &&
    !restartConfirmation.isOpen &&
    drag === null,
  onConfirm: confirmAnswer,
});
scene.addEventListener('pointerdown', (e) => {
  if (
    restartConfirmation.isOpen ||
    e.button !== 0 ||
    (historyGesture?.kind === 'scene' && historyGesture.owner !== e.pointerId)
  )
    return;
  const el = e.target.closest('[data-item]');
  if (!el) return;
  const id = el.dataset.item,
    rotate = e.target.closest('[data-rotate]');
  if (game === 'light') {
    if (id === 'target') return;
    if (state.objects[Number(id)].type === 'wall') return;
    selected = id === 'target' ? 'target' : Number(id);
    editor();
    draw();
    if (!rotate) return;
  }
  if (game === 'cut')
    cutDragOrigin = {
      point: localPoint(e),
      travel: state.basicTravel ?? 0,
      centerX: state.centerX,
      centerY: state.centerY,
      offset: state.offset,
      angle: state.angle,
    };
  if (game === 'cut' && id === 'cut' && !allowed('offset')) return;
  beginOriginalGesture('scene', e.pointerId);
  drag = rotate ? 'rotate' : id;
  scene.setPointerCapture(e.pointerId);
  e.preventDefault();
});
scene.addEventListener('pointermove', (e) => {
  if (drag === null || historyGesture?.kind !== 'scene' || historyGesture.owner !== e.pointerId)
    return;
  const p = localPoint(e);
  if (game === 'light') {
    const o = selected === 'target' ? state.target : state.objects[selected];
    if (drag === 'rotate') {
      if (Math.hypot(p.x - o.x, p.y - o.y) > 10)
        change('angle', Math.round(mirrorAngle(p.x - o.x, p.y - o.y) * 10) / 10);
    }
  }
  if (game === 'cut') {
    if (drag === 'basic-cut' && !free && cutMode === 'basic') {
      const d = cutDirection();
      change(
        'basicTravel',
        cutDragOrigin.travel +
          (p.x - cutDragOrigin.point.x) * d.x +
          (p.y - cutDragOrigin.point.y) * d.y,
      );
    } else if (drag === 'move-curve') {
      if (allowed('x')) change('centerX', cutDragOrigin.centerX + p.x - cutDragOrigin.point.x);
      if (allowed('y')) change('centerY', cutDragOrigin.centerY + p.y - cutDragOrigin.point.y);
    } else if (drag === 'rotate-curve' && allowed('rotate')) {
      const originAngle = Math.atan2(
          cutDragOrigin.point.y - state.centerY,
          cutDragOrigin.point.x - state.centerX,
        ),
        nowAngle = Math.atan2(p.y - state.centerY, p.x - state.centerX);
      const a = (cutDragOrigin.angle + ((nowAngle - originAngle) * 180) / Math.PI + 720) % 360;
      change('cutAngle', Math.round(a * 10) / 10);
    } else if (allowed('offset')) {
      const a = (state.angle * Math.PI) / 180,
        v =
          cutDragOrigin.offset +
          (p.x - cutDragOrigin.point.x) * Math.cos(a) +
          (p.y - cutDragOrigin.point.y) * Math.sin(a);
      change('offset', v);
    }
  }
});
const endDrag = () => {
  drag = null;
  pendingSlot = null;
  cutDragOrigin = null;
};
scene.addEventListener('pointerup', (e) => {
  if (drag === null || historyGesture?.owner !== e.pointerId) return;
  finishOriginalGesture(true);
  endDrag();
  draw();
});
const cancelSceneGesture = (e) => {
  if (
    historyGesture?.kind !== 'scene' ||
    (e.pointerId !== undefined && historyGesture.owner !== e.pointerId)
  )
    return;
  finishOriginalGesture(false);
  endDrag();
  editor();
  draw();
};
scene.addEventListener('pointercancel', cancelSceneGesture);
scene.addEventListener('lostpointercapture', cancelSceneGesture);
scene.addEventListener('click', (e) => {
  const source = e.target.closest('[data-light-source]');
  if (source) {
    e.preventDefault();
    fireLightSource(Number(source.dataset.lightSource));
  }
});
scene.addEventListener('keydown', (e) => {
  const source = e.target.closest('[data-light-source]');
  if (source) {
    if (['Enter', ' ', 'Spacebar'].includes(e.key)) {
      e.preventDefault();
      if (!e.repeat) fireLightSource(Number(source.dataset.lightSource));
    }
    return;
  }
  const el = e.target.closest('[data-item]');
  if (
    restartConfirmation.isOpen ||
    !el ||
    !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)
  )
    return;
  e.preventDefault();
  finishOriginalGesture(true);
  endDrag();
  const before = historySnapshot();
  invalidate();
  const id = el.dataset.item,
    step = e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 1;
  if (game === 'light') {
    if (id === 'target' || state.objects[Number(id)].type === 'wall') return;
    selected = Number(id);
    state.objects[selected].angle = clamp(state.objects[selected].angle + step, -90, 90);
  }
  if (game === 'cut') {
    if (id === 'basic-cut' && !free && cutMode === 'basic')
      setBasicTravel((state.basicTravel ?? 0) + step);
    else if (id === 'rotate-curve' && allowed('rotate'))
      state.angle = (state.angle + step + 360) % 360;
    else if (id === 'move-curve') {
      if (['ArrowLeft', 'ArrowRight'].includes(e.key) && allowed('x'))
        state.centerX = clamp(state.centerX + step, -400, 1200);
      if (['ArrowUp', 'ArrowDown'].includes(e.key) && allowed('y'))
        state.centerY = clamp(state.centerY + (e.key === 'ArrowUp' ? -1 : 1), -400, 860);
    } else if (allowed('offset')) state.offset = clamp(state.offset + step, -600, 600);
  }
  commitOriginalEdit(before);
  editor();
  draw();
  drawing.querySelector(`[data-item="${id}"]`)?.focus();
});
document.querySelectorAll('[data-game]').forEach(
  (b) =>
    (b.onclick = () => {
      if (!catalogue[b.dataset.game]) return;
      cerco.hide();
      broto.hide();
      orbita.hide();
      repasse.hide();
      sintonia.hide();
      saveEndless();
      collection.hide();
      free = false;
      game = b.dataset.game;
      showSelection();
    }),
);
$('free').textContent = 'Modo Sem Parar';
$('free').onclick = enterEndless;
$('challenge').onclick = () => {
  free = false;
  showSelection();
};
$('level').onchange = (e) => {
  saveCampaign();
  level = Number(e.target.value);
  start();
};
$('reset').onclick = () => {
  finishOriginalGesture(true);
  endDrag();
  middleConfirm?.cancel();
  clearTimeout(endlessTimer);
  endlessTimer = null;
  const revision = restartRevision;
  restartConfirmation.open({
    trigger: $('reset'),
    isCurrent: () => revision === restartRevision && !document.querySelector('.lab').hidden,
    onConfirm: restartOriginalNow,
    onCancel: () => {
      updateOriginalHistoryButtons();
      scheduleEndlessAdvance();
    },
  });
  updateOriginalHistoryButtons();
};
$('selection-free').onclick = enterEndless;
$('back-selection').onclick = showSelection;
$('toggle-controls').onclick = toggleControls;
$('undo').onclick = () => travelOriginalHistory(-1);
$('redo').onclick = () => travelOriginalHistory(1);
document.addEventListener('keydown', (e) => {
  if (document.querySelector('.lab').hidden || restartConfirmation.isOpen) return;
  if (e.key === 'Escape' && historyGesture) {
    e.preventDefault();
    finishOriginalGesture(false);
    endDrag();
    editor();
    draw();
    return;
  }
  if (
    !(e.ctrlKey || e.metaKey) ||
    e.altKey ||
    String(e.key).toLowerCase() !== 'z' ||
    e.target.closest?.('textarea,select,[contenteditable="true"]')
  )
    return;
  e.preventDefault();
  travelOriginalHistory(e.shiftKey ? 1 : -1);
});
applyControlsVisibility();
$('confirm').onclick = confirmAnswer;
// Abre a fase anterior ou seguinte dentro dos limites da campanha.
function navigateLevel(delta) {
  const next = level + delta;
  if (free || customLevel || next < 0 || next >= catalogue[game].length) return;
  finishOriginalGesture(false);
  endDrag();
  saveCampaign();
  level = next;
  start();
}
$('level-prev').onclick = () => navigateLevel(-1);
$('level-next').onclick = () => navigateLevel(1);
$('next').onclick = () => {
  if (game === 'cut' && !free && !customLevel && level === catalogue.cut.length - 1) {
    showSelection();
    return;
  }
  navigateLevel(1);
};
$('hint').onclick = showOriginalHint;
showSelection();

function hideOriginalForSibling() {
  finishOriginalGesture(false);
  endDrag();
  saveCampaign();
  saveCustom();
  campaignActive = null;
  customLevel = null;
  customId = '';
  customImportRevision++;
  customStorage.hidden = true;
  customExport.hidden = true;
  saveEndless();
  free = false;
  endlessPanel.hidden = true;
  restartConfirmation.dismiss();
  restartRevision++;
  invalidate();
  document.querySelector('.lab').hidden = true;
  $('selection').hidden = true;
}
const collection = initCollection({
  hideOriginal() {
    cerco.hide();
    broto.hide();
    orbita.hide();
    repasse.hide();
    sintonia.hide();
    hideOriginalForSibling();
  },
});
const sintonia = createSintoniaRoute({
  hideOtherGames() {
    cerco.hide();
    broto.hide();
    orbita.hide();
    repasse.hide();
    collection.hide();
    hideOriginalForSibling();
  },
});
const repasse = createRepasseRoute({
  hideOthers() {
    cerco.hide();
    broto.hide();
    orbita.hide();
    sintonia.hide();
    collection.hide();
    hideOriginalForSibling();
  },
});
const orbita = createOrbitaRoute({
  hideOthers() {
    cerco.hide();
    broto.hide();
    repasse.hide();
    sintonia.hide();
    collection.hide();
    hideOriginalForSibling();
  },
});
const broto = createBrotoRoute({
  hideOthers() {
    cerco.hide();
    orbita.hide();
    repasse.hide();
    sintonia.hide();
    collection.hide();
    hideOriginalForSibling();
  },
});
const cerco = createCercoRoute({
  hideOthers() {
    broto.hide();
    orbita.hide();
    repasse.hide();
    sintonia.hide();
    collection.hide();
    hideOriginalForSibling();
  },
});
initCategoryNavigation({
  hideGames() {
    cerco.hide();
    broto.hide();
    orbita.hide();
    repasse.hide();
    sintonia.hide();
    collection.hide();
    hideOriginalForSibling();
  },
});

globalThis.addEventListener?.('pagehide', () => {
  saveCampaign();
  saveCustom();
  saveEndless();
});
