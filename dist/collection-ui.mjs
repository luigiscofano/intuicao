import { levelCompletionState } from "./level-completion-state.mjs";
import { renderMapSelection, bindMapSelection } from "./versus/map-selection.mjs";
import { campaignLevelName } from "./campaign-level-names.mjs";
import { desvioSelectionText } from './desvio-presentation.mjs';
// Interface compartilhada de ELO, PRUMO, PACTO e DESVIO: seleção, comandos e resultados.
import { recordApprovedAttemptWin } from "./achievements/approved-store.mjs";
import { createCollectionMissionRound, observePuzzleConfirmation, observePactoEdit, resetPactoSequence, approvedCollectionUnlocks } from "./achievements/approved-collection.mjs";
import { recordMissionUnlocks } from "./achievements/mission-store.mjs";
import { legacyVersusMissionUnlocks } from "./achievements/legacy-versus-missions.mjs";
import { rulesPreviewMarkup } from "./rules-preview.mjs";
import { prumoBalanceMarkup } from "./prumo-balance.mjs";
import { eloRegionColors } from "./elo-region-colors.mjs";
import {
  validateCollectionJSON,
  COLLECTION_JSON_EXAMPLES,
  COLLECTION_JSON_HELP,
} from "./collection-json.mjs";
import { getRulesContext } from "./rules-context.mjs";
import {
  generateCollectionEndless,
  normalizeCollectionOptions,
  collectionOptionSpec,
} from "./endless-collection.mjs";
import { bindMiddleConfirm } from "./middle-confirm.mjs";
import { eloPointAllowed } from "./elo-rules.mjs";
import { migratePactoProgress } from "./pacto-progress.mjs";
import { PACTO_STAGES } from "./pacto-presentation.mjs";
import { migratePrumoProgress } from "./prumo-progress.mjs";
import { PRUMO_STAGES } from "./prumo-presentation.mjs";
import { migrateEloProgress } from "./elo-progress.mjs";
import {
  ELO_STAGES,
  eloRegionName,
  eloMechanicNames,
  eloRulesMarkup,
  eloPublicLevel,
  eloRegionDescription,
  eloCellClue,
  eloLegendMarkup,
  eloOverlayClues,
  eloBoardLabels,
} from "./elo-presentation.mjs";
import {
  createManualCheck,
  checkReferenceAvailable,
} from "./geometry-check.mjs";
import { createPactoFeedback, PACTO_ERROR_FADE } from "./pacto-feedback.mjs";
import { createRestartConfirmation } from "./restart-confirmation.mjs";
import {
  applyDirectAction,
  protectedPrumoCells,
  SYMBOL_CYCLE,
} from "./direct-actions.mjs";
import { bindDirectInput, createBoardViewport } from "./direct-input.mjs";
import { buildDirectHint } from "./direct-hints.mjs";
import { buildDesvioContextHint } from "./desvio-hints.mjs";
import { createAnswerProgress } from "./answer-progress.mjs";
import { GEOMETRY_ANSWERS } from "./geometry-answers.mjs";
import { TUTORIAL_STEPS } from "./collection-tutorials.mjs";
import { SYMBOL_LEVELS } from "./symbol-levels.mjs";
import {
  validateSymbols,
  validateSymbolEditing,
  symbolCandidates,
  symbolHint,
  solveSymbols,
} from "./symbol-games.mjs";
import { GEOMETRY_LEVELS } from "./geometry-levels.mjs";
import {
  validateGeometry,
  initialGeometryState,
  geometryHint,
  solveGeometry,
  eloEdges,
} from "./geometry-games.mjs";
import {
  DESVIO_MAPS,
  DESVIO_CHALLENGE_MAP,
  createDesvio,
  legalDesvioMoves,
  applyDesvioMove,
  analyzeDesvio,
  chooseDesvioBotMove,
  replayDesvio,
  explainDesvioMove,
  firstDesvioMistake,
} from "./desvio.mjs";
import { createResultMotion } from "./result-motion.mjs";
import { renderVersusVictory } from "./versus-victory.mjs";
import {
  createHistory,
  commitHistory,
  undoHistory,
  redoHistory,
  dailyIndex,
  loadCollection,
  saveCollection,
  recordEvent,
} from "./collection-state.mjs";
const META = {
  elo: {
    name: "ELO",
    tag: "Uma peça por região. Um único circuito.",
    rules:
      "Coloque uma peça em cada região. A primeira peça em cada direção se conecta automaticamente. Todas precisam ter exatamente duas ligações, formando um único circuito sem cruzamentos. Uma peça pode seguir em linha reta. Fronteiras de regiões não bloqueiam a visão.",
  },
  prumo: {
    name: "PRUMO",
    tag: "Cada forma encontra seu ponto de equilíbrio.",
    rules:
      "Pinte todas as casas, sem sobrepor, em peças conectadas. Cada peça contém um apoio e seu centro de massa deve coincidir exatamente com ele nos dois eixos. Todas as casas têm massa 1. Um apoio entre casas pertence às duas. Formas assimétricas são permitidas.",
  },
  pacto: {
    name: "PACTO",
    tag: "Uma parceria exclusiva em cada casa.",
    rules:
      "Complete 8 × 8 com círculo, triângulo, quadrado e losango. Cada linha e coluna tem exatamente dois de cada. Cada casa toca exatamente uma casa igual pelos lados. Diagonais não contam. Duplas são automáticas; trios não são permitidos.",
  },
  desvio: {
    name: "DESVIO",
    tag: "Sua escolha muda o caminho do outro.",
    rules:
      "Escolha uma casa disponível e confirme. ↔ manda o adversário para a mesma linha; ↕ para a mesma coluna. A casa usada fica marcada e não pode ser escolhida novamente. A primeira escolha é livre. Quem ficar sem jogada legal perde. Não é preciso atravessar as casas: espaços consumidos não bloqueiam o destino.",
  },
};
const ICONS = ["●", "▲", "■", "◆"],
  NAMES = ["círculo", "triângulo", "quadrado", "losango"],
  COLORS = [
    "#a9d69b",
    "#c6b0e4",
    "#f0bf80",
    "#91cbd9",
    "#e3d173",
    "#e7a4a0",
    "#aabfe3",
    "#86cbbb",
    "#d5b18b",
    "#b9a4da",
  ];
const esc = (x) =>
  String(x ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const arrowSVG = (a) =>
  `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="${a === "H" ? "M12 32H52M12 32L23 21M12 32L23 43M52 32L41 21M52 32L41 43" : "M32 12V52M32 12L21 23M32 12L43 23M32 52L21 41M32 52L43 41"}" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const clone = (x) => structuredClone(x),
  $ = (id) => document.getElementById(id),
  coord = (i, l) => `L${Math.floor(i / l.cols) + 1}C${(i % l.cols) + 1}`;

// Seletores e dados salvos só podem escolher as opções publicadas do jogo.
function normalizeDuelMode(value) {
  switch (value) {
    case "competitive":
      return "competitive";
    case "bot":
      return "bot";
    case "training":
      return "training";
    default:
      return "local";
  }
}

function normalizeBotDifficulty(value) {
  switch (value) {
    case "easy":
      return "easy";
    case "medium":
      return "medium";
    default:
      return "perfect";
  }
}

export function initCollection({ hideOriginal }) {
  const host = $("collection"),
    catalogue = { ...SYMBOL_LEVELS, ...GEOMETRY_LEVELS };
  let middleConfirm = null;
  let directCleanup = null,
    viewport = null,
    gestureBase = null,
    gestureNext = null,
    activeCell = 0,
    paletteCell = -1,
    hintPlan = null,
    showCoordinates = false,
    showMoments = false,
    rulesOpen = false,
    hoverCell = -1;
  let data = loadCollection(),
    game = "elo",
    index = 0,
    level = null,
    history = null,
    selected = 0,
    mode = "value",
    message = "",
    hintText = "",
    highlight = [],
    motion = null,
    evaluated = null,
    custom = false,
    daily = false,
    advanced = Boolean(data.advancedOpen),
    paint = false,
    paintUsed = new Set(),
    botTimer = null,
    selectedDuelMap = DESVIO_MAPS[0].id,
    duelMode = "local",
    botDifficulty = "perfect",
    replayAt = null,
    duelPreview = -1,
    sessionKey = "",
    hintTier = 0,
    tutorialStep = 0,
    guideText = "",
    storageWarning = false,
    markBlocked = Boolean(data.markBlockedCells),
    liveViolations = [];
  let endless = null,
    endlessAnswer = null,
    endlessTimer = null,
    endlessRevision = 0;
  let customReference = null,
    jsonRevision = 0,
    jsonAbort = null;
  let eloExplanationsShown = true;
  let missionRound = createCollectionMissionRound();
  let pactoWonKey = null,
    pactoVictoryToken = null;
  const cancelJSONImport = () => {
    jsonRevision++;
    jsonAbort?.abort();
    jsonAbort = null;
  };
  if (migrateEloProgress(data, catalogue.elo)) saveCollection(data);
  if (migratePrumoProgress(data, catalogue.prumo)) saveCollection(data);
  if (migratePactoProgress(data, catalogue.pacto)) saveCollection(data);
  const restartConfirmation = createRestartConfirmation("restart-collection");
  const pactoFeedback = createPactoFeedback(() => {
    if (game === "pacto" && level && !host.hidden) renderBoard();
  });
  const pactoCheck = createManualCheck(() => {
    if (game !== "desvio" && level && !host.hidden) renderBoard();
  });
  const pactoReference = () =>
    endless
      ? endlessAnswer
      : custom
        ? customReference
        : game === "pacto"
          ? level?.solution
          : GEOMETRY_ANSWERS[level?.id];
  const answers = createAnswerProgress();
  const endlessProgress = {
    get: () => ({
      failures: endless?.failures ?? 0,
      assisted: !!endless?.assisted,
    }),
    unlocked: () => Boolean(endless && endless.failures >= 3),
    fail: () => {
      endless.failures = (endless.failures ?? 0) + 1;
    },
    assist: () => {
      endless.assisted = true;
    },
  };
  const progress = () => (endless ? endlessProgress : answers);
  const answerKey = () =>
    endless
      ? `${game}:endless:${endless.seed}`
      : game + ":" + (custom ? "custom:" + level.id : level.id);
  const current = () => history.present;
  const isSymbol = () => game === "pacto";
  const log = (type, extra = {}) =>
    recordEvent(data, type, { game, level: level?.id, ...extra });
  // Persiste os dados da partida no armazenamento do navegador.
  function persist(preserveOtherSessions = false) {
    if (endless) {
      data.endless ??= {};
      data.endless[game] = { ...endless, duelMode, botDifficulty };
    }
    if (history && sessionKey) {
      if (!custom) {
        data.lastSessions ??= {};
        data.lastSessions[game] = level.id;
      }
      if (!endless && !custom && !preserveOtherSessions)
        for (const [key, saved] of Object.entries(data.sessions))
          if (
            key !== sessionKey &&
            !key.startsWith("elo-") &&
            !key.startsWith("prumo-") &&
            !key.startsWith("pacto-") &&
            saved?.history &&
            Object.values(catalogue).some((levels) =>
              levels.some((level) => level.id === key),
            )
          ) {
            saved.history.past = [];
            saved.history.future = [];
          }
      data.sessions[sessionKey] = {
        rulesVersion: 2,
        missionConfirmations: missionRound.confirmations,
        missionAssisted: missionRound.assisted,
        selectedSupport: game === "prumo" ? selected : undefined,
        assistance: progress().get(answerKey()).assisted,
        history: {
          present: clone(gestureBase ?? history.present),
          past: clone(history.past.slice(game === "elo" ? -300 : -50)),
          future: clone(history.future.slice(0, game === "elo" ? 300 : 50)),
        },
        duelMode,
        botDifficulty,
      };
    }
    storageWarning = !saveCollection(data);
  }
  function clearDuelVictory() {
    const result = $("c-versus-result");
    if (result) result.replaceChildren();
  }
  function clearResult() {
    clearDuelVictory();
    pactoCheck.reset();
    cancelEndlessAdvance();
    motion?.clear();
    evaluated = null;
    highlight = [];
    hintText = level?.tutorial ? guideText : "";
    hintTier = 0;
    hintPlan = null;
    paletteCell = -1;
    message = "";
  }
  function hide() {
    clearDuelVictory();
    cancelJSONImport();
    cancelEndlessAdvance();
    pactoFeedback.reset();
    pactoCheck.reset();
    restartConfirmation.dismiss();
    middleConfirm?.destroy();
    middleConfirm = null;
    directCleanup?.();
    directCleanup = null;
    clearTimeout(botTimer);
    motion?.clear();
    host.hidden = true;
    document
      .querySelectorAll("[data-collection]")
      .forEach((b) => b.setAttribute("aria-pressed", "false"));
    persist();
  }
  function activate(g) {
    cancelEndlessAdvance();
    if (!Object.hasOwn(META, g)) return false;
    paint = false;
    paintUsed.clear();
    persist();
    clearTimeout(botTimer);
    motion?.clear();
    game = g;
    hideOriginal();
    host.hidden = false;
    document
      .querySelectorAll("[data-game]")
      .forEach((b) => b.setAttribute("aria-pressed", "false"));
    document
      .querySelectorAll("[data-collection]")
      .forEach((b) =>
        b.setAttribute("aria-pressed", String(b.dataset.collection === g)),
      );
    selection();
  }
  // Apresenta as fases e as opções de início ou retomada.
  function selection() {
    cancelJSONImport();
    customReference = null;
    cancelEndlessAdvance();
    endless = null;
    endlessAnswer = null;
    pactoFeedback.reset();
    pactoCheck.reset();
    restartConfirmation.dismiss();
    middleConfirm?.destroy();
    middleConfirm = null;
    directCleanup?.();
    directCleanup = null;
    viewport = null;
    clearTimeout(botTimer);
    motion?.clear();
    level = null;
    history = null;
    sessionKey = "";
    custom = false;
    daily = false;
    host.innerHTML = `<div class="level-screen"><p class="eyebrow">COLEÇÃO LÓGICA · ${game === "desvio" ? "DUELO SEM NÍVEIS" : `CAMPANHA DE ${catalogue[game].length} NÍVEIS`}</p><h2 id="collection-title" tabindex="-1">${META[game].name} ·</h2><p>${META[game].rules}</p><div class="collection-toolbar selection-actions" role="group" aria-label="Ações do jogo"><button id="c-free" class="primary" ${game === "desvio" ? "hidden" : ""}>Explorar modo livre</button>${game === "desvio" ? '<button id="c-tactical">Desafio tático D-01</button>' : '<button id="c-daily" class="primary">Desafio de hoje</button>'}</div>${rulesPreviewMarkup(game)}${game === "desvio" ? duelSelection() : puzzleSelection()}${jsonImportPanel()}</div>`;
    host
      .querySelectorAll("[data-new-level]")
      .forEach((b) => (b.onclick = () => start(Number(b.dataset.newLevel))));
    if (game === "desvio") {
      bindMapSelection(host, { maps: DESVIO_MAPS, selectedId: selectedDuelMap, onSelect(map) {
        selectedDuelMap = map.id;
        selection();
      } });
      $("c-start-duel").onclick = () => startDuel(DESVIO_MAPS.findIndex(map => map.id === selectedDuelMap));
    }
    if (game !== "desvio") {
      $("c-daily").onclick = () => {
        daily = true;
        start(
          dailyIndex(
            game,
            new Date().toLocaleDateString("sv-SE"),
            catalogue[game].length,
          ),
        );
      };
    } else {
      $("c-tactical").onclick = () => startDuel(-1);
      $("c-duel-mode").onchange = (e) => {
        duelMode = normalizeDuelMode(e.target.value);
      };
      $("c-bot-difficulty").onchange = (e) => {
        botDifficulty = normalizeBotDifficulty(e.target.value);
      };
    }
    $("c-free").onclick = () => startEndless();
    $("c-import").onchange = importFile;
    $("c-import-paste").onclick = () => {
      const input = $("c-import-json");
      return importText(input.value, importRequest(input));
    };
    $("c-import-json").oninput = () => {
      cancelJSONImport();
      $("c-import-status").textContent =
        "JSON alterado. Clique em Verificar e jogar JSON quando terminar.";
    };
    $("c-import-example").onclick = () =>
      download(`${game}-exemplo.json`, COLLECTION_JSON_EXAMPLES[game]);
    // Recriar a seleção (por exemplo, ao mudar o grid) não deve mover a página.
    // A navegação inicial já controla sua rolagem; o seletor restaura o foco no botão.
    $("collection-title")?.focus({ preventScroll: true });
  }

  function cancelEndlessAdvance() {
    clearTimeout(endlessTimer);
    endlessTimer = null;
    endlessRevision++;
  }
  function seedNow() {
    const a = new Uint32Array(1);
    if (globalThis.crypto?.getRandomValues)
      globalThis.crypto.getRandomValues(a);
    else a[0] = (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
    return a[0];
  }
  function startEndless({ next = false, options = null } = {}) {
    persist();
    cancelEndlessAdvance();
    const saved = endless ?? data.endless?.[game];
    const regenerate = next || !!options || !saved;
    const opts = normalizeCollectionOptions(
      game,
      options ?? saved?.options ?? {},
    );
    const seed = regenerate
      ? ((saved?.seed ?? seedNow()) + 0x9e3779b9) >>> 0
      : saved.seed;
    const nextRun = {
      seed,
      options: opts,
      number: regenerate ? (saved?.number ?? 0) + 1 : saved.number,
      solved: saved?.solved ?? 0,
      failures: regenerate ? 0 : (saved?.failures ?? 0),
      assisted: regenerate ? false : !!saved?.assisted,
      ...(!regenerate && saved?.wonSeed === seed ? { wonSeed: seed } : {}),
    };
    let generated;
    try {
      generated = generateCollectionEndless(game, seed, opts);
    } catch (e) {
      message =
        "Não foi possível gerar este desafio. A partida atual foi preservada. " +
        e.message;
      if (level) renderStatus();
      else {
        const p = document.createElement("p");
        p.textContent = message;
        p.setAttribute("role", "alert");
        host.appendChild(p);
      }
      return;
    }
    endless = nextRun;
    endlessAnswer =
      generated.answer?.[
        game === "pacto"
          ? "values"
          : game === "elo"
            ? "positions"
            : "assignments"
      ] ?? null;
    const provided = { ...generated.level, endless: true };
    if (game === "desvio") {
      if (saved && !next && !options) {
        duelMode = normalizeDuelMode(saved.duelMode ?? duelMode);
        botDifficulty = normalizeBotDifficulty(
          saved.botDifficulty ?? botDifficulty,
        );
      }
      startDuel(0, next ? 1 - (history?.present?.starter ?? 1) : 0, {
        fresh: regenerate,
        provided,
      });
    } else start(0, provided, { fresh: regenerate });
    if (!regenerate && saved?.wonSeed === seed) {
      const result =
        game === "desvio"
          ? null
          : isSymbol()
            ? validateSymbols(level, current().values)
            : validateGeometry(level, current());
      if (
        game === "desvio"
          ? current().winner !== null &&
            (duelMode !== "bot" || current().winner === 0)
          : result.complete && result.valid
      )
        scheduleEndlessAdvance();
    }
  }
  function nextEndless() {
    if (!endless) return;
    startEndless({ next: true });
  }
  function scheduleEndlessAdvance() {
    if (!endless || endlessTimer !== null) return;
    const token = ++endlessRevision,
      key = sessionKey,
      seed = endless.seed;
    if (endless.wonSeed !== seed) {
      endless.solved++;
      endless.wonSeed = seed;
    }
    persist();
    endlessTimer = setTimeout(() => {
      endlessTimer = null;
      if (
        token !== endlessRevision ||
        host.hidden ||
        !endless ||
        endless.seed !== seed ||
        sessionKey !== key
      )
        return;
      nextEndless();
    }, 1500);
  }
  function endlessControls() {
    const controls = collectionOptionSpec(game)
      .map((spec) => {
        const val = endless.options[spec.key];
        return spec.type === "checkbox"
          ? `<label><input type="checkbox" data-endless-option="${esc(spec.key)}" ${val ? "checked" : ""}> ${esc(spec.label)}</label>`
          : `<label>${esc(spec.label)} <select data-endless-option="${esc(spec.key)}">${spec.values.map((v) => `<option value="${esc(v)}" ${String(v) === String(val) ? "selected" : ""}>${esc(spec.key === "size" ? (typeof v === "number" ? `${v} × ${v}` : String(v).replace("x", " × ")) : v)}</option>`).join("")}</select>${spec.note ? `<small class="collection-small">${esc(spec.note)}</small>` : ""}</label>`;
      })
      .join("");
    return `<details class="rules-card endless-settings endless-panel" open><summary>Modo Sem Parar · personalizar modo livre</summary><div class="rules-body"><p>Desafios gerados a partir de uma solução verificada. Acertou, começa outro. ${game === "pacto" ? "PACTO mantém 8 × 8: a cota de dois de cada um dos quatro símbolos exige oito casas por linha." : ""}${game === "desvio" ? "No duelo local, cada vitória inicia outro mapa. Contra o bot, uma derrota permite tentar o mesmo mapa novamente." : ""} Configurações e partida ficam neste navegador.</p><div class="collection-toolbar endless-options">${controls}${
      game === "desvio"
        ? `<label>Modo <select id="c-endless-duel-mode">${[
            ["local", "Dois jogadores locais"],
            ["competitive", "Duelo competitivo"],
            ["bot", "Contra o bot"],
            ["training", "Treino com análise"],
          ]
            .map(
              ([v, t]) =>
                `<option value="${v}" ${duelMode === v ? "selected" : ""}>${t}</option>`,
            )
            .join(
              "",
            )}</select></label><label>Bot <select id="c-endless-bot-difficulty">${[
            ["easy", "Explorador"],
            ["medium", "Intermediário"],
            ["perfect", "Exato"],
          ]
            .map(
              ([v, t]) =>
                `<option value="${v}" ${botDifficulty === v ? "selected" : ""}>${t}</option>`,
            )
            .join("")}</select></label>`
        : ""
    }</div><div class="collection-toolbar"><button id="c-endless-apply">Aplicar opções e gerar</button><button id="c-endless-new">Novo desafio</button></div><p class="collection-small">Alterar uma opção não muda a partida até clicar em Aplicar. Novo desafio não conta como vitória. Reiniciar preserva este desafio. ${game === "desvio" ? "" : "Pode haver mais de uma solução válida; todas são aceitas."}</p></div></details>`;
  }
  function bindEndlessControls() {
    if (!endless) return;
    if ($("c-next")) $("c-next").textContent = "Novo desafio →";
    $("c-endless-new").onclick = nextEndless;
    $("c-endless-apply").onclick = () => {
      const options = {};
      for (const node of host.querySelectorAll("[data-endless-option]")) {
        const spec = collectionOptionSpec(game).find(
          (s) => s.key === node.dataset.endlessOption,
        );
        options[spec.key] =
          spec.type === "checkbox" ? node.checked : node.value;
      }
      if (game === "desvio") {
        duelMode = normalizeDuelMode($("c-endless-duel-mode").value);
        botDifficulty = normalizeBotDifficulty(
          $("c-endless-bot-difficulty").value,
        );
      }
      startEndless({ options });
    };
  }

  function puzzleSelection() {
    if (game === "elo") return eloPuzzleSelection();
    if (game === "prumo") return prumoPuzzleSelection();
    if (game === "pacto") return pactoPuzzleSelection();
    return `<p class="collection-small">Dificuldade ordenada pelo perfil técnico de deduções e dependências. A calibragem com jogadores ainda não foi realizada. Progresso salvo somente neste navegador.</p>${[
      0, 1, 2, 3,
    ]
      .map(
        (stage) =>
          `<h3 class="stage-heading">${["01 · Aprender as regras", "02 · Conectar as pistas", "03 · Encadear decisões", "04 · Síntese lógica"][stage]}</h3><div class="level-group">${catalogue[
            game
          ]
            .slice(stage * 50, stage * 50 + 50)
            .map(
              (l, j) =>
                `<button class="level-tile ${data.completed.includes(l.id) ? "done" : ""}" data-completion-state="${levelCompletionState(data.completed.includes(l.id), progress().get(game + ":" + l.id).assisted)}" data-new-level="${stage * 50 + j}" aria-label="Nível ${stage * 50 + j + 1}, ${esc(l.difficulty)}, ${data.completed.includes(l.id) ? "concluído" : "disponível"}"><span>${stage * 50 + j + 1}</span><small>${data.completed.includes(l.id) ? (progress().get(game + ":" + l.id).assisted ? "✓ assistido" : "✓ concluído") : "explorar"}</small></button>`,
            )
            .join("")}</div>`,
      )
      .join("")}`;
  }
  function eloPuzzleSelection() {
    return `<p class="collection-small elo-campaign-note">Dificuldade editorial, ainda sem calibragem com jogadores. Seu histórico anterior é preservado; fases redesenhadas começam sem conclusão herdada.</p>${ELO_STAGES.map(
      ([name, mechanic, first, last], stage) =>
        `<section class="elo-stage" aria-label="Etapa ${stage + 1}"><h3 class="stage-heading">${String(stage + 1).padStart(2, "0")} · ${esc(name)} <small>Níveis ${first}–${last}</small></h3><p class="elo-stage-mechanic">Foco: ${esc(mechanic)}</p><div class="level-group">${catalogue.elo
          .slice(first - 1, last)
          .map((l, j) => {
            const number = first + j,
              done = data.completed.includes(l.id);
            return `<button class="level-tile elo-level-tile ${done ? "done" : ""}" data-completion-state="${levelCompletionState(done, answers.get("elo:" + l.id).assisted)}" data-new-level="${number - 1}" aria-label="Nível ${number}, ${esc(l.difficulty)}, ${esc(eloMechanicNames(l))}, ${done ? "concluído" : "disponível"}"><span>${number}</span><small>${done ? (answers.get("elo:" + l.id).assisted ? "✓ assistido" : "✓ concluído") : "explorar"}</small></button>`;
          })
          .join("")}</div></section>`,
    ).join("")}`;
  }
  function prumoPuzzleSelection() {
    return `<p class="collection-small">Dificuldade editorial, ainda sem calibragem com jogadores. Progresso salvo somente neste navegador; fases redesenhadas não herdam conclusões por posição.</p>${PRUMO_STAGES.map(
      ([name, first, last], stage) =>
        `<section class="prumo-stage" aria-label="Etapa ${stage + 1}"><h3 class="stage-heading">${String(stage + 1).padStart(2, "0")} · ${esc(name)} <small>Níveis ${first}–${last}</small></h3><div class="level-group">${catalogue.prumo
          .slice(first - 1, last)
          .map((l, j) => {
            const number = first + j,
              done = data.completed.includes(l.id);
            return `<button class="level-tile ${done ? "done" : ""}" data-completion-state="${levelCompletionState(done, answers.get("prumo:" + l.id).assisted)}" data-new-level="${number - 1}" aria-label="Nível ${number}, ${esc(name)}, ${done ? "concluído" : "disponível"}"><span>${number}</span><small>${done ? (answers.get("prumo:" + l.id).assisted ? "✓ assistido" : "✓ concluído") : "explorar"}</small></button>`;
          })
          .join("")}</div></section>`,
    ).join("")}`;
  }
  function pactoPuzzleSelection() {
    return `<p class="collection-small">Dificuldade editorial, ainda sem calibragem com jogadores. Progresso salvo somente neste navegador; fases redesenhadas não herdam conclusões por posição.</p>${PACTO_STAGES.map(
      ([name, first, last], stage) =>
        `<section class="pacto-stage" aria-label="Etapa ${stage + 1}"><h3 class="stage-heading">${String(stage + 1).padStart(2, "0")} · ${esc(name)} <small>Níveis ${first}–${last}</small></h3><div class="level-group">${catalogue.pacto
          .slice(first - 1, last)
          .map((l, j) => {
            const number = first + j,
              done = data.completed.includes(l.id);
            return `<button class="level-tile ${done ? "done" : ""}" data-completion-state="${levelCompletionState(done, answers.get("pacto:" + l.id).assisted)}" data-new-level="${number - 1}" aria-label="Nível ${number}, ${esc(name)}, ${done ? "concluído" : "disponível"}"><span>${number}</span><small>${done ? (answers.get("pacto:" + l.id).assisted ? "✓ assistido" : "✓ concluído") : "explorar"}</small></button>`;
          })
          .join("")}</div></section>`,
    ).join("")}`;
  }
  function duelSelection() {
    return `<div class="collection-toolbar"><label>Modo <select id="c-duel-mode"><option value="local" ${duelMode === "local" ? "selected" : ""}>Dois jogadores locais</option><option value="competitive" ${duelMode === "competitive" ? "selected" : ""}>Duelo local competitivo</option><option value="bot" ${duelMode === "bot" ? "selected" : ""}>Contra o bot</option><option value="training" ${duelMode === "training" ? "selected" : ""}>Treino com análise</option></select></label><label>Bot <select id="c-bot-difficulty"><option value="easy" ${botDifficulty === "easy" ? "selected" : ""}>Explorador</option><option value="medium" ${botDifficulty === "medium" ? "selected" : ""}>Intermediário</option><option value="perfect" ${botDifficulty === "perfect" ? "selected" : ""}>Exato · jogo perfeito</option></select></label></div><p class="collection-small">Partidas no mesmo dispositivo. Não há multiplayer online. Os mapas têm vantagem teórica para um dos lados; alternem o início nas revanches.</p>${renderMapSelection({ id: 'desvio', maps: DESVIO_MAPS, selectedId: selectedDuelMap, preview: map => `<span class="vs-map-grid" style="--map-cols:${map.cols};--map-rows:${map.rows}">${map.arrows.map(arrow => `<span>${arrow === 'H' ? '↔' : '↕'}</span>`).join('')}</span>`, note: '↔ envia à mesma linha; ↕ à mesma coluna. Até 16 casas, mantendo a análise exata.' })}<button type="button" id="c-start-duel" class="primary">Iniciar partida</button>`;
  }
  function initial(l) {
    const state = isSymbol()
      ? {
          values: l.clues.slice(),
          candidates: Array.from({ length: l.rows * l.cols }, () => []),
        }
      : { ...initialGeometryState(l), candidates: [], discarded: [] };
    return game === "prumo"
      ? applyDirectAction("prumo", l, state, { type: "initialize" })
      : state;
  }
  // Prepara a fase selecionada e sua apresentação.
  function start(
    i,
    provided = null,
    { fresh = false, reference = undefined } = {},
  ) {
    pactoWonKey = null;
    pactoVictoryToken = null;
    if (game === "elo" && !fresh) eloExplanationsShown = true;
    cancelJSONImport();
    rulesOpen = false;
    cancelEndlessAdvance();
    if (!provided?.endless) {
      endless = null;
      endlessAnswer = null;
    }
    pactoFeedback.reset();
    pactoCheck.reset();
    restartConfirmation.dismiss();
    cancelGesture();
    paint = false;
    paintUsed.clear();
    clearTimeout(botTimer);
    index = i;
    tutorialStep = 0;
    guideText = "";
    custom = !!provided;
    if (custom) daily = false;
    customReference =
      custom && !provided.endless
        ? reference === undefined
          ? customReference
          : clone(reference)
        : null;
    level = clone(provided ?? catalogue[game][i]);
    rulesOpen = entryRulesOpen();
    sessionKey = endless
      ? `endless:${game}`
      : custom
        ? `custom:${game}:${level.id}`
        : level.id;
    selected = game === "prumo" ? -1 : 0;
    mode = "value";
    activeCell = 0;
    paletteCell = -1;
    hoverCell = -1;
    hintPlan = null;
    replayAt = null;
    history = createHistory(initial(level));
    const saved = fresh ? null : data.sessions[sessionKey]?.history;
    const restored = restoreHistory(saved);
    if (restored) history = restored;
    missionRound = createCollectionMissionRound({
      restored: !!restored,
      assisted: restored ? data.sessions[sessionKey]?.missionAssisted : undefined,
      confirmations: restored ? data.sessions[sessionKey]?.missionConfirmations : undefined,
    });
    if (!fresh && data.sessions[sessionKey]?.assistance)
      progress().assist(answerKey());
    if (game === "prumo") {
      history = {
        ...history,
        present: applyDirectAction("prumo", level, history.present, {
          type: "initialize",
        }),
        past: history.past.map((x) =>
          applyDirectAction("prumo", level, x, { type: "initialize" }),
        ),
        future: history.future.map((x) =>
          applyDirectAction("prumo", level, x, { type: "initialize" }),
        ),
      };
      const savedSelection = fresh
        ? undefined
        : data.sessions[sessionKey]?.selectedSupport;
      if (
        Number.isInteger(savedSelection) &&
        savedSelection >= 0 &&
        savedSelection < level.supports.length
      )
        selected = savedSelection;
    }
    clearResult();
    log("level-start");
    render();
    $("c-title")?.focus();
    persist(fresh);
  }
  // Recupera a tentativa e seus pontos de desfazer e refazer.
  function restoreHistory(saved) {
    if (
      !saved?.present ||
      !Array.isArray(saved.past) ||
      !Array.isArray(saved.future)
    )
      return null;
    try {
      const normal = (x) => {
        const z = clone(x),
          n = level.rows * level.cols;
        if (isSymbol()) {
          if (
            !Array.isArray(z.values) ||
            z.values.length !== n ||
            z.values.some(
              (v, i) =>
                !Number.isInteger(v) ||
                v < -1 ||
                v >= 4 ||
                (level.clues[i] >= 0 && v !== level.clues[i]),
            )
          )
            throw Error("snapshot");
          z.candidates = Array.from({ length: n }, (_, i) =>
            Array.isArray(z.candidates?.[i])
              ? [
                  ...new Set(
                    z.candidates[i].filter(
                      (v) => Number.isInteger(v) && v >= 0 && v < 4,
                    ),
                  ),
                ]
              : [],
          );
        } else if (game === "elo") {
          if (
            !Array.isArray(z.positions) ||
            z.positions.length !== Math.max(...level.regions) + 1 ||
            z.positions.some(
              (v, r) =>
                !Number.isInteger(v) ||
                v < -1 ||
                v >= n ||
                (v >= 0 &&
                  (level.regions[v] !== r || !eloPointAllowed(level, v))) ||
                (level.fixed?.[r] !== undefined && v !== level.fixed[r]),
            )
          )
            throw Error("snapshot");
          z.discarded = Array.isArray(z.discarded)
            ? z.discarded.filter((v) => Number.isInteger(v) && v >= 0 && v < n)
            : [];
        } else {
          if (
            !Array.isArray(z.assignments) ||
            z.assignments.length !== n ||
            z.assignments.some(
              (v) =>
                !Number.isInteger(v) || v < -1 || v >= level.supports.length,
            )
          )
            throw Error("snapshot");
        }
        return z;
      };
      return {
        present: normal(saved.present),
        past: saved.past.slice(-300).map(normal),
        future: saved.future.slice(0, 300).map(normal),
      };
    } catch {
      return null;
    }
  }
  function startDuel(i, starter = 0, { fresh = false, provided = null } = {}) {
    cancelJSONImport();
    customReference = null;
    rulesOpen = false;
    cancelEndlessAdvance();
    if (!provided?.endless) {
      endless = null;
      endlessAnswer = null;
    }
    pactoFeedback.reset();
    pactoCheck.reset();
    restartConfirmation.dismiss();
    cancelGesture();
    clearTimeout(botTimer);
    index = i;
    custom = !!provided;
    level = clone(provided ?? (i < 0 ? DESVIO_CHALLENGE_MAP : DESVIO_MAPS[i]));
    daily = false;
    rulesOpen = entryRulesOpen();
    // Índice previsível do progresso local; não autentica nem autoriza acesso.
    sessionKey = endless
      ? `endless:${game}`
      : `${custom ? "custom:" : ""}desvio:${level.id}:${duelMode}`;
    history = createHistory(createDesvio(level, starter));
    if (!fresh) {
      const saved = data.sessions[sessionKey]?.history;
      try {
        if (saved?.present) {
          const p = saved.present;
          const restored = replayDesvio(level, p.history, p.starter);
          history = createHistory(restored);
          if (duelMode !== "competitive") {
            history.past = p.history.map((_, t) =>
              replayDesvio(level, p.history, p.starter, t),
            );
            history.future = (saved.future ?? [])
              .map((f) => replayDesvio(level, f.history, f.starter))
              .filter(
                (f) =>
                  f.starter === p.starter &&
                  f.history.length > p.history.length &&
                  p.history.every((cell, t) => f.history[t] === cell),
              );
          }
        }
      } catch {}
    }
    selected = 0;
    duelPreview = -1;
    replayAt = null;
    clearResult();
    message = current().winner === null ? "" : duelMessage();
    log("duel-start");
    render();
    persist(fresh);
    $("c-title")?.focus();
    scheduleBot();
  }
  function change(fn) {
    clearResult();
    const next = clone(current());
    fn(next);
    history = commitHistory(history, next);
    persist();
    renderBoard();
    renderStatus();
    autoWinPacto();
  }
  // Estado visual e gestos não pertencem ao histórico de soluções.
  function dispatchAction(action, { human = true } = {}) {
    const next = applyDirectAction(game, level, current(), action);
    if (JSON.stringify(next) === JSON.stringify(current())) return;
    if (game === "pacto") observePactoEdit(missionRound, level, current(), next, { human });
    clearResult();
    history = commitHistory(history, next);
    persist();
    renderBoard();
    renderStatus();
    if (autoWinPacto() && human) recordApprovedPuzzleWin(false);
  }
  function selectSupport(value) {
    if (!Number.isInteger(value) || value < 0 || value >= level.supports.length)
      return;
    const focusSupport = document.activeElement?.dataset?.support,
      focusValue = document.activeElement?.dataset?.value;
    selected = value;
    mode = "value";
    paletteCell = -1;
    persist();
    renderBoard();
    renderStatus();
    renderToolbar();
    if (focusSupport !== undefined)
      $("c-board")
        .querySelector(`[data-support="${focusSupport}"]`)
        ?.focus({ preventScroll: true });
    else if (focusValue !== undefined)
      $("c-tools")
        .querySelector(`[data-value="${focusValue}"]`)
        ?.focus({ preventScroll: true });
  }
  function editCell(i, event = {}) {
    activeCell = i;
    if (game === "desvio") {
      if (
        replayAt !== null ||
        current().winner !== null ||
        (duelMode === "bot" && current().player === 1)
      )
        return;
      if (!legalDesvioMoves(level, current()).includes(i)) {
        message = "Esta casa não está disponível no destino atual.";
        renderStatus();
        return;
      }
      if (duelPreview === i || data.desvioOneClick) {
        duelPreview = i;
        confirm();
        return;
      }
      duelPreview = i;
      hoverCell = -1;
      hintText = "";
      hintPlan = null;
      hintTier = 0;
      message = previewText(i);
      renderBoard();
      renderStatus();
      return;
    }
    if (game === "pacto") {
      if (mode === "erase") dispatchAction({ type: "clear", cell: i });
      else if (mode === "pencil") openPalette(i);
      else
        dispatchAction({ type: "cycle", cell: i, reverse: !!event.shiftKey });
    } else if (game === "elo") {
      const region = level.regions[i];
      if (event.shiftKey || mode === "pencil") {
        dispatchAction({ type: "discard", cell: i });
        return;
      }
      if (level.fixed?.[region] !== undefined) {
        message = `A região ${String.fromCharCode(65 + region)} tem ponto fixo em ${coord(level.fixed[region], level)}. Você pode anotar × nas outras casas, mas não mover essa pista.`;
        renderStatus();
        return;
      }
      if (mode !== "erase" && !eloPointAllowed(level, i)) {
        message =
          "Esta casa é uma passagem sem ponto. A pista não bloqueia linhas; você pode anotar × sem alterar a regra.";
        renderStatus();
        return;
      }
      dispatchAction({ type: mode === "erase" ? "clear" : "point", cell: i });
    } else {
      if (event.altKey) {
        if (current().assignments[i] >= 0)
          selectSupport(current().assignments[i]);
        return;
      }
      if (protectedPrumoCells(level).has(i)) {
        message =
          "Esta casa pertence obrigatoriamente ao seu apoio e está protegida.";
        renderStatus();
        return;
      }
      if (mode === "erase") dispatchAction({ type: "erase", cell: i });
      else if (selected < 0) openPalette(i);
      else dispatchAction({ type: "toggle", cell: i, value: selected });
    }
  }
  function previewText(i) {
    const result = applyDesvioMove(level, current(), i, {
      expectedPlayer: current().player,
      expectedTurn: current().turn,
    });
    return `${coord(i, level)} entrega ${level.arrows[i] === "H" ? "a linha " + (Math.floor(i / level.cols) + 1) : "a coluna " + ((i % level.cols) + 1)} ao adversário: ${legalDesvioMoves(level, result).length} opções após consumir a casa. Clique novamente na mesma casa ou confirme.`;
  }
  function cancelPreview() {
    if (game === "desvio") {
      hintText = "";
      hintPlan = null;
      hintTier = 0;
    }
    duelPreview = -1;
    hoverCell = -1;
    paletteCell = -1;
    renderBoard();
    renderStatus();
  }
  function contextCell(i) {
    activeCell = i;
    if (game === "desvio") {
      cancelPreview();
      return;
    }
    dispatchAction({
      type: game === "elo" ? "discard" : game === "prumo" ? "erase" : "clear",
      cell: i,
    });
  }
  function longCell(i) {
    activeCell = i;
    if (game === "elo") {
      dispatchAction({ type: "discard", cell: i });
      return;
    }
    if (game === "prumo" && current().assignments[i] >= 0) {
      selectSupport(current().assignments[i]);
      return;
    }
    if (game === "desvio") {
      if (legalDesvioMoves(level, current()).includes(i)) {
        duelPreview = i;
        hintText = "";
        hintPlan = null;
        hintTier = 0;
        message = previewText(i);
        renderBoard();
        renderStatus();
      }
      return;
    }
    openPalette(i);
  }
  function openPalette(i) {
    paletteCell = i;
    activeCell = i;
    renderPalette();
  }
  function renderPalette() {
    const panel = $("c-local-palette");
    if (!panel) return;
    panel.hidden = paletteCell < 0;
    if (paletteCell < 0) return;
    const i = paletteCell;
    if (game === "pacto")
      panel.innerHTML = `<strong>${coord(i, level)}${level.clues[i] >= 0 ? " · pista fixa" : ""}</strong><div role="group" aria-label="Valores">${SYMBOL_CYCLE.map((v) => `<button data-local-value="${v}" aria-label="Definir ${NAMES[v]}">${ICONS[v]}</button>`).join("")}<button data-local-clear>Limpar</button></div><div role="group" aria-label="Candidatos">${SYMBOL_CYCLE.map((v) => `<button data-local-candidate="${v}" aria-pressed="${current().candidates[i]?.includes(v)}" aria-label="Anotar ${NAMES[v]}">✎ ${ICONS[v]}</button>`).join("")}</div><button data-local-close>Fechar paleta</button>`;
    else if (game === "prumo")
      panel.innerHTML = `<strong>${coord(i, level)} · escolher apoio</strong><div>${level.supports.map((p, v) => `<button data-local-support="${v}" style="--piece:${COLORS[v % COLORS.length]}">${String.fromCharCode(65 + v)}</button>`).join("")}</div><button data-local-close>Fechar paleta</button>`;
    panel.querySelectorAll("[data-local-value]").forEach(
      (b) =>
        (b.onclick = () => {
          dispatchAction({
            type: "set",
            cell: i,
            value: +b.dataset.localValue,
          });
          paletteCell = -1;
          renderPalette();
          $("c-board")
            .querySelector(`[data-cell="${i}"]`)
            ?.focus({ preventScroll: true });
        }),
    );
    panel.querySelectorAll("[data-local-candidate]").forEach(
      (b) =>
        (b.onclick = () => {
          dispatchAction({
            type: "candidate",
            cell: i,
            value: +b.dataset.localCandidate,
          });
          paletteCell = i;
          renderPalette();
          panel
            .querySelector(
              `[data-local-candidate="${b.dataset.localCandidate}"]`,
            )
            ?.focus({ preventScroll: true });
        }),
    );
    panel
      .querySelectorAll("[data-local-support]")
      .forEach(
        (b) => (b.onclick = () => selectSupport(+b.dataset.localSupport)),
      );
    const close = panel.querySelector("[data-local-close]");
    if (close)
      close.onclick = () => {
        paletteCell = -1;
        renderPalette();
        $("c-board").querySelector(`[data-cell="${i}"]`)?.focus();
      };
    const clear = panel.querySelector("[data-local-clear]");
    if (clear)
      clear.onclick = () => {
        dispatchAction({ type: "clear", cell: i });
        paletteCell = -1;
        renderPalette();
      };
    // Paleta adjacente, fora da camada de eventos da grade e sem cobrir a casa.
    const cell = $("c-board").querySelector(`[data-cell="${i}"]`),
      rect = cell?.getBoundingClientRect?.();
    if (rect && globalThis.innerWidth) {
      const width = Math.min(310, globalThis.innerWidth - 20),
        height = panel.getBoundingClientRect?.().height || 210,
        vh = globalThis.innerHeight || 800;
      let x = rect.right + 10,
        y = rect.top,
        adjacent = true;
      if (x + width > globalThis.innerWidth - 10) {
        x = rect.left - width - 10;
        if (x < 10) {
          x = Math.max(
            10,
            Math.min(rect.left, globalThis.innerWidth - width - 10),
          );
          y = rect.bottom + 10;
          if (y + height > vh - 10) y = rect.top - height - 10;
          if (y < 10) adjacent = false;
        }
      }
      if (adjacent) {
        panel.style.position = "fixed";
        panel.style.width = width + "px";
        panel.style.left = x + "px";
        panel.style.top = Math.max(10, Math.min(y, vh - height - 10)) + "px";
      } else {
        panel.style.position = "static";
        panel.style.width = "";
      }
    }
  }
  function keyboardCell(i, e) {
    activeCell = i;
    if (
      /^(INPUT|TEXTAREA|SELECT)$/i.test(
        e.target?.tagName ?? e.target?.tag ?? "",
      ) ||
      e.target?.isContentEditable
    )
      return false;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      historyAction(!!e.shiftKey);
      return true;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return false;
    if (e.key === "Escape") {
      cancelGesture();
      cancelPreview();
      return true;
    }
    if (game === "pacto" && (/^[1-4]$/.test(e.key) || /^[!@#$]$/.test(e.key))) {
      const number = /^[1-4]$/.test(e.key) ? +e.key : "!@#$".indexOf(e.key) + 1;
      dispatchAction({
        type: e.shiftKey ? "candidate" : "set",
        cell: i,
        value: SYMBOL_CYCLE[number - 1],
      });
      return true;
    }
    if (game === "pacto" && ["Delete", "Backspace", "0"].includes(e.key)) {
      dispatchAction({ type: "clear", cell: i });
      return true;
    }
    if (game === "elo" && e.key.toLowerCase() === "x") {
      dispatchAction({ type: "discard", cell: i });
      return true;
    }
    if (game === "prumo" && ["[", "]"].includes(e.key)) {
      selectSupport(
        (selected + (e.key === "]" ? 1 : -1) + level.supports.length) %
          level.supports.length,
      );
      return true;
    }
    if (e.key === " " && game === "pacto") {
      openPalette(i);
      return true;
    }
    if (e.key === "Enter" || e.key === " ") {
      editCell(i, e);
      return true;
    }
    return false;
  }
  // Abre uma transação de gesto para manter as alterações no mesmo histórico.
  function beginGesture(i, e, g) {
    if (game === "desvio" || game === "pacto") return false;
    const s = current();
    if (game === "elo") {
      if (e.button === 2 || g.button === 2 || e.shiftKey || g.shiftKey) {
        if (s.positions.includes(i)) return false;
        gestureBase = clone(s);
        gestureNext = clone(s);
        return { kind: "discard", enabled: !s.discarded.includes(i) };
      }
      const r = level.regions[i];
      if (s.positions[r] !== i || level.fixed?.[r] !== undefined) return false;
      gestureBase = clone(s);
      gestureNext = clone(s);
      return { kind: "point", from: i };
    }
    if (e.altKey || g.altKey) return false;
    if (selected < 0 && g.button !== 2) return false;
    gestureBase = clone(s);
    gestureNext = clone(s);
    const erase =
      g.button === 2 || mode === "erase" || s.assignments[i] === selected;
    return {
      kind: erase ? "erase" : "paint",
      value: g.button === 2 || mode === "erase" ? undefined : selected,
    };
  }
  function gestureCell(i, e, g) {
    if (!gestureBase) return;
    showBrushCursor(i, e);
    const intent = g.intent;
    if (intent.kind === "point") {
      gestureNext = clone(gestureBase);
      const region = level.regions[intent.from];
      if (level.regions[i] === region)
        gestureNext = applyDirectAction(game, level, gestureBase, {
          type: "move-point",
          from: intent.from,
          cell: i,
        });
    } else
      gestureNext = applyDirectAction(game, level, gestureNext, {
        type: intent.kind,
        cell: i,
        value: intent.value,
        enabled: intent.enabled,
      });
    if (JSON.stringify(history.present) !== JSON.stringify(gestureNext))
      pactoCheck.reset();
    history.present = clone(gestureNext);
    renderBoard();
    renderStatus();
  }
  function endGesture(i, e, g) {
    if (!gestureBase) return;
    const before = gestureBase;
    let after = gestureNext;
    if (g.intent.kind === "point")
      after =
        i === null || level.regions[i] !== level.regions[g.intent.from]
          ? before
          : applyDirectAction(game, level, before, {
              type: "move-point",
              from: g.intent.from,
              cell: i,
            });
    history.present = before;
    gestureBase = null;
    gestureNext = null;
    clearResult();
    history = commitHistory(history, after);
    persist();
    renderBoard();
    renderStatus();
  }
  function cancelGesture() {
    if (!gestureBase) return;
    history.present = gestureBase;
    gestureBase = null;
    gestureNext = null;
    renderBoard();
    renderStatus();
  }
  function showBrushCursor(i, event) {
    const badge = $("c-brush-cursor");
    if (!badge) return;
    badge.hidden =
      game !== "prumo" ||
      selected < 0 ||
      i === null ||
      i < 0 ||
      event?.pointerType === "touch";
    if (badge.hidden) return;
    badge.textContent = String.fromCharCode(65 + selected);
    badge.style.background = COLORS[selected % COLORS.length];
    badge.style.left = event.clientX + 16 + "px";
    badge.style.top = event.clientY + 16 + "px";
  }
  // Liga os eventos do tabuleiro às ações de edição e navegação.
  function bindBoardInput() {
    const board = $("c-board");
    if (game === "elo")
      middleConfirm = bindMiddleConfirm(board, {
        enabled: () =>
          !host.hidden && !restartConfirmation.isOpen && gestureBase === null,
        onConfirm: confirm,
      });
    directCleanup = bindDirectInput({
      board,
      getContext: () => ({ rows: level.rows, cols: level.cols }),
      onFocus: (i) => {
        activeCell = i;
        if (game === "elo" && (level.rows >= 10 || level.cols >= 10))
          $("c-board")
            .querySelector(`[data-cell="${i}"]`)
            ?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
        $("c-board")
          .querySelectorAll("[data-cell]")
          .forEach((b) =>
            b.classList.toggle("active-cell", +b.dataset.cell === i),
          );
        renderStatus();
      },
      onClick: editCell,
      onContext: contextCell,
      onLongPress: longCell,
      onSupport: (value) => selectSupport(+value),
      onGestureStart: beginGesture,
      onGestureCell: gestureCell,
      onGestureEnd: endGesture,
      onGestureCancel: cancelGesture,
      onCancel: (reason, event) => {
        cancelGesture();
        if (
          reason !== "outside" ||
          (game === "desvio" &&
            !event?.target?.closest?.("#c-confirm, #c-hint"))
        )
          cancelPreview();
      },
      onHover: (i, event) => {
        if (game === "prumo") {
          showBrushCursor(i, event);
          return;
        }
        if (
          game !== "desvio" ||
          duelPreview >= 0 ||
          current().winner !== null ||
          replayAt !== null ||
          (duelMode === "bot" && current().player === 1)
        )
          return;
        const nextHover = legalDesvioMoves(level, current()).includes(i)
          ? i
          : -1;
        if (nextHover === hoverCell) return;
        hoverCell = nextHover;
        renderBoard();
        if (hoverCell >= 0) message = previewText(hoverCell);
        else message = "Escolha uma casa disponível.";
        renderStatus();
      },
      onKey: keyboardCell,
      onNavigate: (event) => viewport?.handleNavigation(event),
    });
  }
  function notes() {
    return game === "elo"
      ? "Clique coloca, move ou remove um ponto. Shift + clique, clique direito ou X anota um descarte sem bloquear linhas. Arraste um ponto dentro da região; descarte em região fixa é permitido fora da pista."
      : game === "prumo"
        ? "Clique no apoio para selecionar. Clique pinta; clicar na mesma cor apaga. Arraste mantém a intenção inicial. Alt + clique ou toque prolongado escolhe a cor da casa. Apoios estão protegidos."
        : game === "pacto"
          ? "Clique alterna ○ → □ → △ → ◇ → vazio; Shift inverte. Teclas 1–4 definem; Shift + número anota. Espaço ou toque prolongado abre a paleta local."
          : `${duelMode === "competitive" ? "Duelo competitivo: sem desfazer nem análise de melhor jogada; dicas apenas de regras e turno." : duelMode === "bot" ? "Contra bot: desfazer retorna à sua decisão anterior." : duelMode === "training" ? "Treino com análise permitida." : "Amistoso local: desfazer exige acordo dos dois jogadores."} Primeiro clique seleciona; segundo na mesma casa confirma. Escape ou clique direito cancela.`;
  }
  function toolbar() {
    if (game === "desvio") return '<span id="c-turn"></span>';
    if (game === "prumo")
      return (
        `<span id="c-active-support">${selected < 0 ? "Escolha um apoio" : "Apoio ativo: " + String.fromCharCode(65 + selected)}</span>` +
        level.supports
          .map(
            (p, i) =>
              `<button data-value="${i}" aria-pressed="${selected === i}" style="--piece:${COLORS[i % COLORS.length]}">Apoio ${String.fromCharCode(65 + i)}</button>`,
          )
          .join("")
      );
    return game === "elo"
      ? '<button data-tool="value">● Pontos</button><button data-tool="pencil">× Descartes</button>'
      : "<span>Clique: ○ → □ → △ → ◇ → vazio</span>";
  }
  function renderToolbar() {
    const bar = $("c-tools");
    if (!bar) return;
    bar.innerHTML = toolbar();
    bar
      .querySelectorAll("[data-value]")
      .forEach((b) => (b.onclick = () => selectSupport(+b.dataset.value)));
    bar.querySelectorAll("[data-tool]").forEach(
      (b) =>
        (b.onclick = () => {
          mode = b.dataset.tool;
          renderToolbar();
          renderStatus();
        }),
    );
  }
  function setupDirectControls() {
    renderToolbar();
    const bar = $("c-direct-controls");
    bar.className = "direct-controls";
    bar.hidden = game !== "desvio";
    bar.innerHTML = `${game === "desvio" ? `<button id="c-one-click" aria-pressed="${!!data.desvioOneClick}">Jogada em um clique: ${data.desvioOneClick ? "sim" : "não"}</button>` : ""}`;
    viewport = createBoardViewport({ board: $("c-board") });
    if ($("c-moments"))
      $("c-moments").onclick = () => {
        showMoments = !showMoments;
        $("c-moments").setAttribute("aria-pressed", String(showMoments));
        renderStatus();
      };
    if ($("c-one-click"))
      $("c-one-click").onclick = () => {
        if (
          !data.desvioOneClick &&
          !globalThis.confirm?.(
            "Ativar jogada imediata com apenas um clique? Não haverá uma segunda confirmação.",
          )
        )
          return;
        data.desvioOneClick = !data.desvioOneClick;
        persist();
        $("c-one-click").textContent =
          "Jogada em um clique: " + (data.desvioOneClick ? "sim" : "não");
        $("c-one-click").setAttribute(
          "aria-pressed",
          String(data.desvioOneClick),
        );
      };
    $("c-hint-apply").onclick = () => {
      if (hintTier !== 3 || !hintPlan?.action) return;
      const action = hintPlan.action;
      progress().assist(answerKey());
      missionRound.assisted = true;
      dispatchAction(action, { human: false });
      if (!(game === "pacto" && evaluated?.complete && evaluated.valid))
        message =
          game === "pacto"
            ? "Dedução aplicada. A vitória será identificada ao completar corretamente a grade."
            : "Dedução aplicada. A conclusão da fase continua dependendo de Confirmar resposta.";
      renderStatus();
    };
  }
  function updateDirectStatus() {
    if (game === "desvio") {
      const competitive = duelMode === "competitive";
      for (const id of ["c-undo", "c-redo", "c-advanced-toggle"])
        if ($(id)) $(id).hidden = competitive;
      if (competitive) $("c-advanced").hidden = true;
      for (const id of ["c-reset", "c-rematch"])
        if ($(id)) $(id).hidden = competitive && current().winner === null;
    }
    if ($("c-hint-apply"))
      $("c-hint-apply").hidden = !(hintTier === 3 && hintPlan?.action);
    if (game === "prumo") {
      $("c-details").hidden = !showMoments;
      $("c-details").innerHTML = showMoments
        ? selected >= 0
          ? prumoBalanceMarkup(
              level,
              current(),
              selected,
              validateGeometry(level, current()).moments[selected],
            )
          : '<p class="pb-selection-help" role="status">Escolha um apoio para visualizar o equilíbrio da sua peça.</p>'
        : "";
    }
    if (game === "pacto") {
      $("c-details").hidden = true;
      $("c-details").textContent = "";
    }
  }
  // Abre a fase anterior ou seguinte dentro dos limites da campanha.
  function navigateLevel(delta) {
    if (endless) {
      if (delta > 0) nextEndless();
      return;
    }
    const next = index + delta;
    if (game === "desvio" || next < 0 || next >= catalogue[game].length) return;
    persist();
    daily = false;
    start(next);
  }
  const generatedRuleMechanicsSeen = new Map();
  function entryRulesOpen() {
    return true;
  }
  function rulesContext() {
    return getRulesContext(game, level, {
      catalogue: game === "desvio" ? DESVIO_MAPS : catalogue[game],
      index,
      mode: level?.tutorial
        ? "tutorial"
        : endless
          ? "endless"
          : daily
            ? "daily"
            : custom
              ? "custom"
              : "campaign",
    });
  }
  function syncRulesSidebar() {
    const panel = $("c-rules-panel");
    $("c-rules-sidebar").hidden = !panel.open;
    panel
      .querySelector("summary")
      .setAttribute("aria-expanded", String(panel.open));
    host
      .querySelector(".collection-workspace")
      .classList.toggle("rules-open", panel.open);
  }
  // Atualiza a apresentação da partida a partir do estado atual.
  function render() {
    middleConfirm?.destroy();
    middleConfirm = null;
    directCleanup?.();
    directCleanup = null;
    const active = document.activeElement,
      focusSelector = active?.id
        ? `#${active.id}`
        : active?.dataset?.tool
          ? `[data-tool="${active.dataset.tool}"]`
          : active?.dataset?.value !== undefined
            ? `[data-value="${active.dataset.value}"]`
            : null;
    motion?.clear();
    const stageTools = `<div class="stage-tools"><button id="c-undo" type="button" aria-label="Desfazer" title="Desfazer">↶</button><button id="c-redo" type="button" aria-label="Refazer" title="Refazer">↷</button><button id="c-reset" class="action-reset">↺ Reiniciar</button><details id="c-rules-panel" class="rules-card" ${rulesOpen ? "open" : ""}><summary id="c-rules" aria-controls="c-rules-sidebar" aria-expanded="${rulesOpen}"><span>Regras e como jogar</span><span class="rules-show">Mostrar</span><span class="rules-hide">Ocultar</span></summary></details><button id="c-advanced-toggle" aria-expanded="${advanced}">${advanced ? "Ocultar" : "Mostrar"} opções avançadas</button></div>`;
    host.innerHTML = `<div class="collection-lab ${game === "elo" ? "elo-lab" : game === "desvio" ? "desvio-lab" : ""}"><button id="c-back" class="quiet">← ${game === "desvio" ? "Escolher mapa" : "Seleção de níveis"}</button><div class="lab-heading"><div><div class="level-stepper"><p class="eyebrow">${endless ? `Modo Sem Parar · DESAFIO ${endless.number} · ${endless.solved} CONCLUÍDOS` : daily ? "DESAFIO DO DIA" : game === "desvio" ? "DUELO LOCAL" : custom ? (level.tutorial ? "TUTORIAL DO PDF" : "EDITOR · FASE PERSONALIZADA") : "DESAFIOS"}${endless ? "" : ` · ${esc(level.id)}`}</p></div><h2 id="c-title" tabindex="-1">${META[game].name} ·</h2></div>${game === "desvio" ? '<img class="desvio-aiij" src="assets/desvio-aiij.svg" alt="" aria-hidden="true" width="164" height="144">' : ""}<div class="modes collection-mode-switch" role="group" aria-label="Modo de jogo"><button id="c-mode-challenge" type="button" aria-pressed="${!endless}">${game === "desvio" ? "Mapas" : "Desafios"}</button><button id="c-mode-endless" type="button" ${game === "desvio" ? "hidden" : ""} aria-pressed="${!!endless}">Modo Sem Parar</button></div></div>${endless ? endlessControls() : ""}<div class="collection-workspace ${rulesOpen ? "rules-open" : ""} ${advanced ? "" : "closed"}"><div id="c-surface" class="collection-surface experiment">${game === "elo" ? '<div class="elo-tools-row">' : ""}<div id="c-tools" class="collection-toolbar">${toolbar()}</div>${game === "elo" ? stageTools + "</div>" : ""}${game === "elo" ? `${level.rows >= 10 || level.cols >= 10 ? '<p class="elo-viewport-help">O tabuleiro se ajusta à tela. As setas do teclado percorrem as casas; aproximar e deslocar continuam opcionais.</p>' : ""}` : ""}<div id="c-direct-controls"></div><div class="stage-top collection-stage-top"><div class="level-stepper">${!endless && !custom && game !== "desvio" ? `<span id="c-stage-label" data-campaign-level-name="${esc(campaignLevelName(game, level))}">DESAFIO ${String(index + 1).padStart(2, "0")} / ${catalogue[game].length}</span>` : ""}</div>${game === "elo" ? "" : stageTools}</div><div class="board-navigation" role="group" aria-label="Área do jogo e navegação de níveis">${game !== "desvio" && !custom && !endless ? '<button type="button" id="c-level-prev" class="level-arrow" aria-controls="c-board" aria-label="Nível anterior" title="Nível anterior">←</button>' : ""}<div id="c-board-surface" class="collection-board-wrap experiment ${game === "elo" ? `elo-board-surface ${Object.keys(level.constraints?.rowCounts ?? {}).length || Object.keys(level.constraints?.colCounts ?? {}).length || level.constraints?.cuts?.length ? "elo-has-gutter" : ""}` : ""}">${game === "elo" ? `<div class="board-options"><button id="c-mark-blocked" class="quiet" aria-pressed="${markBlocked}" aria-controls="c-board">Marcar células bloqueadas</button></div>` : ""}<div id="c-board" class="collection-board" role="group" aria-label="Tabuleiro ${META[game].name}"></div><div id="c-brush-cursor" class="brush-cursor" aria-hidden="true" hidden></div><div id="c-motion" class="result-motion" aria-hidden="true"></div></div>${game !== "desvio" && !custom && !endless ? '<button type="button" id="c-level-next" class="level-arrow" aria-controls="c-board" aria-label="Próximo nível" title="Próximo nível">→</button>' : ""}</div><div class="board-check-controls pacto-check-controls"><button id="c-confirm" class="primary confirm">${game === "desvio" ? "Confirmar jogada" : "Confirmar resposta"}</button>${game !== "desvio" ? `<button id="c-check" aria-describedby="c-check-help">Checar</button>${game === "prumo" ? `<button id="c-moments" type="button" aria-pressed="${showMoments}"><svg class="moments-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 4v15M8 20h8M4 7h16M5 7l-3 7h6L5 7Zm14 0-3 7h6l-3-7Z"/></svg><span>Momentos exatos</span></button>` : ""}<span id="c-check-help" class="collection-small" hidden></span><p id="c-check-status" class="pacto-check-status" role="status" aria-live="polite" aria-atomic="true" hidden></p>` : ""}</div><div class="level-actions"><div class="collection-toolbar">${game === "desvio" ? '<button id="c-hint" class="action-hint">✦ Dicas</button><button id="c-rematch">Revanche · inverter início</button><button id="c-analysis">Analisar posição / prévia</button><button id="c-review">Revisar decisões</button>' : '<button id="c-answer" hidden aria-describedby="c-answer-help">Ver gabarito</button><button id="c-hint" class="action-hint">✦ Dicas</button><button id="c-next">Próximo nível →</button>'}</div>${level.tutorial ? `<button id="c-guided">Explicar passo do tutorial · ${tutorialStep + 1}/3</button>` : ""}${game !== "desvio" ? '<p id="c-answer-help" class="collection-small" hidden>O gabarito monta uma solução padrão e preserva as pistas fixas. Depois, confirme para conferir. A resolução será identificada como assistida.</p>' : ""}<button id="c-hint-apply" hidden>Aplicar esta dedução</button><p id="c-hint-text" class="hint" role="status"></p></div><div id="c-local-palette" class="local-palette" hidden></div><div class="collection-feedback">${isSymbol() || game === "elo" ? '<p id="c-live-errors" class="live-errors" role="status" aria-live="polite" aria-atomic="true" hidden></p>' : ""}<p id="c-status" role="status" aria-live="polite"></p><div id="c-details"></div></div>${game === "desvio" ? '<div id="c-versus-result"></div><div id="c-replay" class="collection-replay"></div>' : ""}</div><aside id="c-rules-sidebar" class="rules-sidebar" aria-label="Regras e como jogar" ${rulesOpen ? "" : "hidden"}>${rulesPreviewMarkup(game)}<details class="rules-more"><summary>Pistas desta fase e controles</summary><h3 id="c-rules-context-title">${esc(rulesContext().title)}</h3><p id="c-rules-context-text" class="rules-context">${esc(rulesContext().text)}</p><div class="rules-body"><p>${META[game].rules}</p>${game === "elo" ? eloLegendMarkup(level, eloRegionColors(level), eloExplanationsShown) + eloRulesMarkup(level) : ""}<div class="collection-notes">${notes()}${game === "elo" ? `<p><strong>${!custom ? `Etapa ${level.stage ?? Math.min(5, Math.floor(index / 15)) + 1} · ${esc(level.stageName ?? ELO_STAGES[Math.min(5, Math.floor(index / 15))]?.[0] ?? "")}` : "Mecânicas desta fase"}:</strong> ${esc(eloMechanicNames(level))}</p>` : level.lesson ? `<p><strong>Foco deste nível:</strong> ${esc(level.lesson)}</p>` : ""}${level.difficulty ? `<p>Dificuldade ${game === "elo" || game === "prumo" || game === "pacto" ? "editorial" : "técnica"}: ${esc(String(level.difficulty).replace(/\bendlesss?\b/gi, "Modo Sem Parar"))}. Você pode escolher qualquer nível.</p>` : ""}</div><details class="rules-more"><summary>Estratégias e acessibilidade</summary><div>${strategy()}<p>Tab percorre controles. No tabuleiro, as setas movem o foco; Enter ou espaço aplica a ferramenta selecionada. Pistas fixas têm um pequeno ponto e não podem ser apagadas. Erros explícitos em PACTO recebem hachuras vermelhas após 2 segundos, surgindo suavemente enquanto você edita; casas ainda incompletas não são erros. Vitória, derrota e contagem de tentativas só acontecem ao confirmar. Marcações a lápis não são respostas.</p></div></details></div></details></aside><aside id="c-advanced" class="controls" ${advanced ? "" : "hidden"}>${advancedTools()}</aside></div></div>`;
    bindEndlessControls();
    const eloExplanationToggle = $("c-elo-explanations-toggle");
    if (eloExplanationToggle) {
      const syncExplanations = () => {
        eloExplanationToggle.setAttribute(
          "aria-expanded",
          String(eloExplanationsShown),
        );
        eloExplanationToggle.textContent = eloExplanationsShown
          ? "Ocultar explicações"
          : "Mostrar explicações";
        $("c-elo-clue-legend")
          .querySelectorAll(".elo-clue-explanation")
          .forEach((node) => {
            node.hidden = !eloExplanationsShown;
          });
      };
      eloExplanationToggle.onclick = () => {
        if ($("c-elo-explanations-toggle") !== eloExplanationToggle) return;
        eloExplanationsShown = !eloExplanationsShown;
        syncExplanations();
      };
      syncExplanations();
    }
    const rulesPanel = $("c-rules-panel");
    rulesPanel.ontoggle = () => {
      if ($("c-rules-panel") === rulesPanel) {
        rulesOpen = rulesPanel.open;
        syncRulesSidebar();
      }
    };
    syncRulesSidebar();
    motion = createResultMotion(
      $("c-motion"),
      $("c-board-surface"),
      globalThis,
      {
        getVictoryState: () =>
          game === "pacto" ? (pactoVictoryToken ?? current()) : current(),
        onRetry: retryCurrent,
      },
    );
    $("c-back").onclick = () => {
      persist();
      selection();
    };
    $("c-mode-challenge").onclick = () => {
      if (endless || custom) {
        persist();
        selection();
      }
    };
    $("c-mode-endless").onclick = () => {
      if (!endless) startEndless();
    };
    $("c-advanced-toggle").onclick = () => {
      advanced = !advanced;
      data.advancedOpen = advanced;
      saveCollection(data);
      render();
    };
    if ($("c-mark-blocked"))
      $("c-mark-blocked").onclick = () => {
        markBlocked = !markBlocked;
        data.markBlockedCells = markBlocked;
        persist();
        $("c-mark-blocked").setAttribute("aria-pressed", String(markBlocked));
        renderBoard();
        renderStatus();
      };
    $("c-confirm").onclick = confirm;
    if ($("c-check"))
      $("c-check").onclick = () => {
        if (!restartConfirmation.isOpen)
          pactoCheck.check(level, current(), pactoReference());
      };
    if (game === "elo") {
      $("c-confirm").title =
        "Também pode avaliar clicando na rodinha do mouse sobre o tabuleiro.";
      $("c-board").title =
        "Clique na rodinha do mouse para avaliar a resposta.";
    }
    $("c-reset").onclick = (event) => {
      middleConfirm?.cancel();
      if (
        game === "desvio" &&
        duelMode === "competitive" &&
        current().winner === null
      )
        return;
      if (restartConfirmation.isOpen) return;
      cancelGesture();
      clearTimeout(botTimer);
      cancelEndlessAdvance();
      const restartLevel = level,
        restartSession = sessionKey;
      restartConfirmation.open({
        match: game === "desvio",
        trigger: event?.currentTarget ?? $("c-reset"),
        isCurrent: () =>
          level === restartLevel &&
          sessionKey === restartSession &&
          !host.hidden &&
          !(
            game === "desvio" &&
            duelMode === "competitive" &&
            current().winner === null
          ),
        fallbackFocus: () => $("c-title"),
        onCancel: scheduleBot,
        onConfirm: restartCurrent,
      });
    };
    $("c-undo").onclick = () => historyAction(false);
    $("c-redo").onclick = () => historyAction(true);
    if (game === "desvio") {
      $("c-hint").onclick = hint;
      $("c-rematch").onclick = () => {
        if (duelMode === "competitive" && current().winner === null) return;
        log("rematch");
        startDuel(index, 1 - current().starter, {
          fresh: true,
          provided: custom ? level : null,
        });
      };
      $("c-analysis").onclick = analyze;
      $("c-review").onclick = reviewDuel;
    } else {
      $("c-next").onclick = () => navigateLevel(1);
      $("c-next").disabled = !endless && !custom && index === catalogue[game].length - 1;
      if ($("c-level-prev")) {
        $("c-level-prev").disabled = index === 0;
        $("c-level-next").disabled = index === catalogue[game].length - 1;
        $("c-level-prev").onclick = () => navigateLevel(-1);
        $("c-level-next").onclick = () => navigateLevel(1);
      }
      $("c-hint").onclick = hint;
      $("c-answer").onclick = applyAnswer;
    }
    host.querySelectorAll("[data-tool]").forEach(
      (b) =>
        (b.onclick = () => {
          mode = b.dataset.tool;
          render();
        }),
    );
    host.querySelectorAll("[data-value]").forEach(
      (b) =>
        (b.onclick = () => {
          selected = +b.dataset.value;
          if (mode === "erase") mode = "value";
          render();
        }),
    );
    if ($("c-derive")) $("c-derive").onclick = derivePrumo;
    if ($("c-guided")) $("c-guided").onclick = guided;
    $("c-export").onclick = exportLevel;
    $("c-editor-check").onclick = editorCheck;
    $("c-editor-play").onclick = editorPlay;
    $("c-editor-json").value = JSON.stringify(cleanLevel(level), null, 2);
    $("c-editor-json").oninput = () => {
      cancelJSONImport();
      $("c-editor-result").textContent =
        "JSON alterado. Verifique novamente antes de jogar.";
    };
    $("c-stats").onclick = () =>
      download("intuicao-metricas-locais.json", {
        events: data.events,
        notice: "Dados locais de uso, sem envio automático.",
      });
    setupDirectControls();
    renderBoard();
    renderStatus();
    restoreResult();
    if (focusSelector) host.querySelector(focusSelector)?.focus();
  }
  // Desenha o tabuleiro e associa os controles às ações da partida.
  function renderBoard() {
    if (!level || !$("c-board")) return;
    const eloColors = game === "elo" ? eloRegionColors(level) : null;
    const board = $("c-board"),
      focused = document.activeElement?.dataset?.cell,
      s =
        game === "desvio" && replayAt !== null
          ? replayDesvio(level, current().history, current().starter, replayAt)
          : current(),
      n = level.rows * level.cols;
    board.style.setProperty("--cols", level.cols);
    board.style.setProperty("--rows", level.rows);
    board.className = `collection-board board-${game}${game === "elo" && (level.rows >= 10 || level.cols >= 10) ? " elo-large" : ""}`;
    let cells = "";
    const legal = game === "desvio" ? legalDesvioMoves(level, s) : [];
    const pactoErrors = isSymbol()
      ? pactoFeedback.sync(
          validateSymbolEditing(level, s.values).violations,
          s.values,
          {
            immediate: !!evaluated,
          },
        )
      : null;
    const eloCheck = game === "elo" ? validateGeometry(level, s) : null;
    liveViolations = isSymbol()
      ? pactoErrors.violations
      : game === "elo"
        ? eloCheck.violations.filter(
            (v) =>
              v.code === "crossing" ||
              (v.code === "degree" &&
                eloCheck.degree[level.regions[v.cells?.[0]]] > 2) ||
              [
                "shape",
                "passage",
                "forbidden-edge",
                "row-count",
                "col-count",
                "distance",
                "neighbor",
                "order",
                "cut-count",
                "exclusive-passage",
              ].includes(v.code),
          )
        : [];
    const check = game !== "desvio" ? pactoCheck.get() : null;
    const checkFadeByCell = new Map();
    const errorsByCell = new Map();
    for (const v of liveViolations)
      for (const i of v.cells ?? []) {
        if (!errorsByCell.has(i)) errorsByCell.set(i, []);
        errorsByCell.get(i).push(v.text ?? v.message);
      }
    for (const i of check?.cells ?? []) {
      if (!errorsByCell.has(i)) errorsByCell.set(i, []);
      errorsByCell
        .get(i)
        .push(
          check.kind === "mismatch"
            ? "Difere do gabarito de referência"
            : "Não atende às regras",
        );
      checkFadeByCell.set(i, check.elapsed);
      if (pactoErrors) pactoErrors.fadeByCell.set(i, check.elapsed);
    }
    if ($("c-live-errors")) {
      const texts = [
        ...new Set(liveViolations.map((v) => v.text ?? v.message)),
      ];
      $("c-live-errors").hidden = !texts.length;
      $("c-live-errors").textContent = texts.length
        ? "Revise as casas hachuradas: " +
          texts.slice(0, 3).join(" ") +
          (texts.length > 3
            ? ` Mais ${texts.length - 3} conflitos indicados no tabuleiro.`
            : "")
        : "";
    }
    for (let i = 0; i < n; i++) {
      let content = "",
        classes = [],
        fixed = false,
        color = "transparent",
        label = coord(i, level);
      if (isSymbol()) {
        const v = s.values[i];
        fixed = level.clues[i] >= 0;
        content =
          v < 0
            ? `<span class="pencil">${(s.candidates[i] || []).map((x) => ICONS[x]).join(" ")}</span>`
            : `<span class="symbol symbol-${v}">${ICONS[v]}</span>`;
        label += v < 0 ? " vazia" : ` ${NAMES[v]}`;
      } else if (game === "elo") {
        const r = level.regions[i];
        color = eloColors[r];
        fixed = level.fixed?.[r] === i;
        const present = s.positions[r] === i;
        const clue = eloCellClue(level, i),
          regionClue = eloRegionDescription(level, r);
        content = `<span class="region-letter">${eloRegionName(r)}</span>${clue.markup}${present ? '<span class="elo-token">●</span>' : s.discarded.includes(i) ? '<span class="discarded">×</span>' : ""}`;
        if (clue.restricted) classes.push("elo-passage-cell");
        label += `, região ${eloRegionName(r)}${present ? ", peça" : ""}${regionClue ? `, ${regionClue}` : ""}${clue.description ? `, ${clue.description}` : ""}`;
        if (level.fixed?.[r] !== undefined) {
          classes.push("fixed-region");
          if (markBlocked) {
            classes.push("blocked-marked");
            content +=
              '<span class="blocked-marker" aria-hidden="true"></span>';
          }
          label += `, região com peça fixa em ${coord(level.fixed[r], level)}`;
        } else if (!clue.restricted)
          label += ", toque para posicionar ou mover";
      } else if (game === "prumo") {
        const a = s.assignments[i];
        color = a < 0 ? "#fffefa" : COLORS[a % COLORS.length];
        content =
          a < 0
            ? ""
            : `<span class="assignment-letter">${String.fromCharCode(65 + a)}</span>`;
        label += a < 0 ? ", sem peça" : `, peça ${String.fromCharCode(65 + a)}`;
      } else {
        const available = Boolean(s.available & (1 << i));
        content = available
          ? `<span class="duel-arrow">${arrowSVG(level.arrows[i])}</span>`
          : '<span class="desvio-used" aria-hidden="true">—<small>usada</small></span>';
        classes.push(
          available ? "available" : "consumed",
          legal.includes(i) ? "legal" : "unavailable",
        );
        if (duelPreview === i) {
          classes.push("preview");
          content += '<span class="desvio-selection-mark" aria-hidden="true">✓</span>';
          label += ", selecionada";
        }
        const destination = duelPreview >= 0 ? duelPreview : hoverCell;
        if (
          destination >= 0 &&
          i !== destination &&
          ((level.arrows[destination] === "H" &&
            Math.floor(i / level.cols) ===
              Math.floor(destination / level.cols)) ||
            (level.arrows[destination] === "V" &&
              i % level.cols === destination % level.cols))
        )
          classes.push("next-region");
        label += available
          ? `, ${level.arrows[i] === "H" ? "horizontal" : "vertical"}${legal.includes(i) ? ", disponível no destino" : ", fora do destino"}`
          : ", consumida";
      }
      if (game === "prumo" && protectedPrumoCells(level).has(i)) {
        fixed = true;
        classes.push("protected-support");
      }
      if (i === activeCell) classes.push("active-cell");
      if (fixed) {
        classes.push("fixed");
        content += '<span class="fixed-dot" aria-hidden="true">•</span>';
        label += ", pista fixa";
      }
      if (highlight.includes(i)) classes.push("hint-cell");
      if (errorsByCell.has(i)) {
        classes.push("cell-conflict");
        if (pactoErrors && pactoErrors.fadeByCell.get(i) < PACTO_ERROR_FADE)
          classes.push("pacto-conflict-enter");
        if (checkFadeByCell.get(i) < PACTO_ERROR_FADE)
          classes.push("manual-check-enter");
        label +=
          (check?.cells.includes(i) ? ", aviso: " : ", conflito: ") +
          [...new Set(errorsByCell.get(i))].join(" ");
      }
      let borders = "";
      if (game === "elo" || game === "prumo") {
        const a = game === "elo" ? level.regions : s.assignments,
          v = a[i],
          r = (i / level.cols) | 0,
          c = i % level.cols;
        borders = `border-top-width:${r === 0 || a[i - level.cols] !== v ? 3 : 1}px;border-left-width:${c === 0 || a[i - 1] !== v ? 3 : 1}px;border-bottom-width:${r === level.rows - 1 ? 3 : 1}px;border-right-width:${c === level.cols - 1 ? 3 : 1}px;`;
      }
      cells += `<button data-cell="${i}" class="grid-cell ${classes.join(" ")}" style="background:${color};${borders}${checkFadeByCell.has(i) ? `--pacto-fade-offset:-${checkFadeByCell.get(i)}ms;` : ""}${pactoErrors?.fadeByCell.has(i) ? `--pacto-fade-offset:-${pactoErrors.fadeByCell.get(i)}ms;` : ""}" aria-label="${esc(label)}"${game === "desvio" ? ` aria-pressed="${duelPreview === i}"` : ""}${errorsByCell.has(i) ? ` aria-invalid="true" aria-describedby="${game === "prumo" ? "c-check-status" : "c-live-errors c-check-status"}"` : ""} title="${esc(label)}">${content}${showCoordinates ? `<span class="cell-coordinate">${coord(i, level)}</span>` : ""}</button>`;
    }
    board.innerHTML =
      cells +
      overlay(s) +
      (game === "elo" ? eloBoardLabels(level, showCoordinates) : "") +
      (game !== "desvio"
        ? '<div id="c-check-ring" class="pacto-check-ring" aria-hidden="true" hidden></div>'
        : "");
    renderPactoCheck(check);
    if (focused !== undefined)
      board
        .querySelector(`[data-cell="${focused}"]`)
        ?.focus({ preventScroll: true });
    if (!directCleanup) bindBoardInput();
    renderPalette();
  }
  function overlay(s) {
    const w = level.cols * 100,
      h = level.rows * 100;
    let a =
      showCoordinates && game !== "elo"
        ? Array.from(
            { length: level.cols },
            (_, c) =>
              `<text x="${c * 100 + 50}" y="-13" text-anchor="middle" class="axis-label">C${c + 1}</text>`,
          ).join("") +
          Array.from(
            { length: level.rows },
            (_, r) =>
              `<text x="-10" y="${r * 100 + 56}" text-anchor="end" class="axis-label">L${r + 1}</text>`,
          ).join("")
        : "";
    const center = (i) => [
      (i % level.cols) * 100 + 50,
      Math.floor(i / level.cols) * 100 + 50,
    ];
    if (game === "elo")
      for (const [r, t] of eloEdges(level, s.positions)) {
        const p = center(s.positions[r]),
          q = center(s.positions[t]);
        a += `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="elo-edge"/>`;
      }
    if (game === "elo") a += eloOverlayClues(level);
    if (game === "pacto")
      for (let i = 0; i < s.values.length; i++)
        if (s.values[i] >= 0)
          for (const j of [
            i % level.cols < level.cols - 1 ? i + 1 : -1,
            i + level.cols,
          ])
            if (j >= 0 && j < s.values.length && s.values[i] === s.values[j]) {
              const p = center(i),
                q = center(j);
              a += `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="pair-edge"/>`;
            }
    if (game === "prumo")
      level.supports.forEach((p, i) => {
        const x = 50 + p.x2 * 50,
          y = 50 + p.y2 * 50;
        a += `<g data-support="${i}" tabindex="0" role="button" aria-label="Selecionar apoio ${String.fromCharCode(65 + i)}" class="support-marker ${selected === i ? "selected-support" : ""}" transform="translate(${x} ${y})"><circle r="19" fill="#fffefa" stroke="#344c3c" stroke-width="2"/><text text-anchor="middle" y="7" font-size="21" font-weight="700">${String.fromCharCode(65 + i)}</text></g>`;
      });
    return `<svg class="board-overlay" preserveAspectRatio="none" viewBox="0 0 ${w} ${h}" aria-label="Conexões e apoios">${a}</svg>`;
  }
  function renderPactoCheck(check) {
    if (game === "desvio" || !$("c-check")) return;
    const available = checkReferenceAvailable(level, pactoReference());
    $("c-check").disabled = !available;
    $("c-check-help").hidden = available;
    $("c-check-help").textContent = available
      ? ""
      : "Checagem indisponível: este mapa não tem gabarito de referência.";
    const status = $("c-check-status"),
      ring = $("c-check-ring");
    status.hidden = !check;
    status.textContent = check?.text ?? "";
    if (check && status.dataset.checkRevision !== String(check.revision)) {
      for (const node of [status, ring]) {
        node.style.animation = "none";
        void node.offsetWidth;
        node.style.animation = "";
      }
      status.dataset.checkRevision = String(check.revision);
    }
    status.style.setProperty(
      "--pacto-check-offset",
      `-${check?.elapsed ?? 0}ms`,
    );
    ring.hidden = !["correct", "error", "mismatch"].includes(check?.kind);
    ring.className =
      "pacto-check-ring" +
      (["error", "mismatch"].includes(check?.kind)
        ? " manual-check-error"
        : "");
    ring.style.setProperty("--pacto-check-offset", `-${check?.elapsed ?? 0}ms`);
  }
  // Atualiza mensagens, controles habilitados e indicadores da partida.
  function renderStatus() {
    if (!$("c-status")) return;
    if (game === "desvio" && (current().winner === null || replayAt !== null))
      clearDuelVictory();
    if (game !== "desvio") {
      $("c-answer").hidden = !progress().unlocked(answerKey());
      $("c-answer-help").hidden = !progress().unlocked(answerKey());
    }
    $("c-status").classList.toggle(
      "sr-only",
      game === "pacto" ||
        game === "elo" ||
        (game !== "desvio" &&
          !!evaluated &&
          !(evaluated.complete && evaluated.valid)),
    );
    $("c-details").hidden =
      game !== "desvio" &&
      !!evaluated &&
      !(evaluated.complete && evaluated.valid);
    $("c-status").textContent =
      message +
      (game === "elo"
        ? ` ${mode === "pencil" ? "Ferramenta ×: anota descartes, sem colocar peças." : mode === "erase" ? "Ferramenta Apagar: remove peças móveis ou anotações." : "Ferramenta ●: coloca ou move a peça da região."} ${current().positions.filter((p) => p >= 0).length}/${current().positions.length} peças · ${eloEdges(level, current().positions).length} ligações automáticas. ${eloEdges(level, current().positions).length === 0 ? "Alinhe duas peças na mesma linha ou coluna para ver uma ligação." : ""}`
        : "") +
      (storageWarning
        ? " Atenção: o navegador não permitiu salvar o progresso; mantenha esta página aberta."
        : "");
    $("c-hint-text").textContent = hintText;
    if ($("c-hint")) $("c-hint").textContent = "✦ Dicas";
    const canUndo = game !== "desvio" || duelMode !== "competitive";
    $("c-undo").disabled = !canUndo || !history.past.length;
    $("c-redo").disabled = !canUndo || !history.future.length;
    $("c-confirm").disabled =
      game === "desvio" &&
      (duelPreview < 0 ||
        current().winner !== null ||
        replayAt !== null ||
        (duelMode === "bot" && current().player === 1));
    $("c-details").innerHTML = evaluated?.moments
      ? `<p>Momentos após confirmar (unidades duplicadas): ${evaluated.moments.map((m) => `${String.fromCharCode(65 + m.support)}: horizontal ${m.x}, vertical ${m.y}`).join(" · ")}</p>`
      : "";
    updateDirectStatus();
    if (game === "desvio") {
      $("c-turn").textContent =
        replayAt !== null
          ? `Replay · após ${replayAt} jogadas`
          : current().winner !== null
            ? `Jogador ${current().winner + 1} venceu`
            : `Vez do jogador ${current().player + 1} · ${current().restriction ? `${current().restriction.axis === "row" ? "linha" : "coluna"} ${current().restriction.index + 1}` : "escolha livre"}`;
      $("c-details").textContent = replayAt === null
        ? desvioSelectionText(level, current(), duelPreview)
        : "Revisão da partida: volte à partida para fazer uma escolha.";
      $("c-details").classList.add("desvio-selection-text");
      $("c-analysis").disabled = duelMode !== "training";
      $("c-analysis").hidden = duelMode !== "training";
      $("c-review").hidden = duelMode !== "training";
      $("c-review").disabled =
        $("c-analysis").disabled || !current().history.length;
      const historyMoves = current().history;
      $("c-replay").innerHTML =
        `<label>Rever partida <input id="c-replay-range" type="range" min="0" max="${historyMoves.length}" value="${replayAt ?? historyMoves.length}"></label><button id="c-live">Voltar à partida</button><p>${historyMoves.map((i, t) => `${t + 1}. ${coord(i, level)}`).join(" · ") || "Nenhuma jogada confirmada."}</p>`;
      $("c-replay-range").oninput = (e) => {
        replayAt = +e.target.value;
        duelPreview = -1;
        hintText = "";
        highlight = [];
        motion?.clear();
        renderBoard();
        renderStatus();
      };
      $("c-live").onclick = () => {
        replayAt = null;
        hintText = "";
        highlight = [];
        renderBoard();
        renderStatus();
        restoreResult();
      };
    }
  }
  // Both restart controls share the same reset; only the toolbar asks for confirmation.
  function restartCurrent() {
    if (
      !level ||
      !history ||
      host.hidden ||
      (game === "desvio" &&
        duelMode === "competitive" &&
        current().winner === null)
    )
      return;
    middleConfirm?.cancel();
    cancelGesture();
    clearTimeout(botTimer);
    cancelEndlessAdvance();
    const priorRulesOpen = rulesOpen;
    log("restart");
    game === "desvio"
      ? startDuel(index, current().starter, {
          fresh: true,
          provided: custom ? level : null,
        })
      : start(index, custom ? level : null, { fresh: true });
    rulesOpen = priorRulesOpen;
    $("c-rules-panel").open = rulesOpen;
    syncRulesSidebar();
  }
  function retryCurrent() {
    if (restartConfirmation.isOpen || !level || !history) return;
    if (game === "desvio") {
      if (
        replayAt !== null ||
        current().winner === null ||
        (duelMode === "bot" && current().winner === 0)
      )
        return;
    } else if (!evaluated || (evaluated.complete && evaluated.valid)) return;
    restartCurrent();
  }
  function showDuelResult(animate = true) {
    if (current().winner === null || replayAt !== null) return;
    motion?.clear();
    const panel = $("c-versus-result");
    if (!panel) return;
    const winner = current().winner,
      lost = duelMode === "bot" && winner === 1;
    panel.innerHTML = '<div id="c-duel-victory"></div>';
    renderVersusVictory($("c-duel-victory"), {
      game: "desvio",
      winnerName: "Jogador " + (winner + 1),
      owner: winner,
      lost,
      animate,
      mode: duelMode,
      resultKey: current(),
    });
    if (duelMode !== "bot" || lost) {
      panel.insertAdjacentHTML(
        "beforeend",
        '<div class="level-actions"><button type="button" id="c-duel-retry" class="result-retry" aria-label="Reiniciar partida imediatamente" title="Reiniciar partida imediatamente"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg></button></div>',
      );
      $("c-duel-retry").onclick = retryCurrent;
    }
  }
  function restoreResult(animate = false) {
    if (game === "pacto" && autoWinPacto(animate)) return;
    if (game === "desvio") showDuelResult(false);
    else if (evaluated && !(evaluated.complete && evaluated.valid))
      motion.show(game, false);
  }
  // Only a complete, rule-valid PACTO state enters the existing success flow.
  // Value keys deduplicate annotation/rerender changes; a fresh token allows redo
  // from an incomplete state to celebrate again, without replaying on reload.
  function finishPuzzleWin({ animate = true, record = true } = {}) {
    message =
      "Correto! Todas as regras foram satisfeitas." +
      (progress().get(answerKey()).assisted ? " Resolução assistida." : "");
    if (record && level.tutorial) log("tutorial-complete");
    if (!custom && !data.completed.includes(level.id)) {
      data.completed.push(level.id);
      log("level-complete", { assisted: progress().get(answerKey()).assisted });
    }
    motion.show(game, true, { animate });
    scheduleEndlessAdvance();
  }
  function autoWinPacto(animate = true) {
    if (game !== "pacto" || !level || !history) return false;
    const values = current().values;
    if (values.some((value) => value < 0)) {
      pactoWonKey = null;
      return false;
    }
    const checked = validateSymbols(level, values);
    if (!checked.complete || !checked.valid) {
      pactoWonKey = null;
      return false;
    }
    const key = answerKey() + ":" + values.join(","),
      transition = key !== pactoWonKey;
    if (transition) {
      pactoWonKey = key;
      pactoVictoryToken = {};
    }
    pactoCheck.reset();
    hintText = "";
    evaluated = checked;
    finishPuzzleWin({ animate: animate && transition, record: transition });
    persist();
    renderBoard();
    renderStatus();
    return true;
  }
  // Executa a confirmação solicitada usando as regras e a sessão atuais.
  function confirm() {
    if (endlessTimer !== null || restartConfirmation.isOpen) return;
    cancelGesture();
    if (game === "desvio") {
      if ($("c-confirm").disabled) return;
      const cell = duelPreview;
      duelPreview = -1;
      try {
        const before = current();
        const after = applyDesvioMove(level, before, cell, {
          expectedPlayer: before.player,
          expectedTurn: before.turn,
        });
        history = commitHistory(history, after);
        // Mapas importados, exemplos e lances automáticos não comprovam estas missões.
        recordMissionUnlocks(
          legacyVersusMissionUnlocks("desvio", {
            confirmed: true,
            custom: custom && !endless,
            mode: duelMode,
            before,
            after,
            legalAfter: legalDesvioMoves(level, after),
          }),
        );
        log("move", { cell, turn: current().turn });
        duelAfter();
        scheduleBot();
      } catch (e) {
        message = e.message;
        renderStatus();
      }
      return;
    }
    const firstConfirmation = observePuzzleConfirmation(missionRound);
    if (game === "pacto" && autoWinPacto()) {
      recordApprovedPuzzleWin(firstConfirmation);
      persist();
      return;
    }
    pactoCheck.reset();
    hintText = "";
    evaluated = isSymbol()
      ? validateSymbols(level, current().values)
      : validateGeometry(level, current());
    const success = evaluated.complete && evaluated.valid;
    if (success) {
      recordApprovedPuzzleWin(firstConfirmation);
      finishPuzzleWin();
    } else {
      progress().fail(answerKey());
      message =
        (evaluated.violations[0]?.text ??
          evaluated.violations[0]?.message ??
          (!evaluated.complete
            ? "A resposta ainda está incompleta."
            : "Há uma contradição nas escolhas.")) +
        " Ajuste e tente novamente.";
      highlight = evaluated.violations[0]?.cells ?? [];
      motion.show(game, false);
    }
    persist();
    renderBoard();
    renderStatus();
  }
  function recordApprovedPuzzleWin(firstConfirmation) {
    const official = !custom && !endless && catalogue[game]?.some(item => item.id === level.id);
    if (!official || missionRound.assisted) return;
    if (game === "elo" || game === "prumo")
      recordApprovedAttemptWin({ gameId: game, levelId: level.id, firstConfirmation });
    recordMissionUnlocks(approvedCollectionUnlocks(game, {
      confirmed: true, official, success: true, level, state: current(), round: missionRound,
    }));
  }
  // Aplica a resposta de referência após as verificações de disponibilidade.
  function applyAnswer() {
    if (game === "desvio" || !progress().unlocked(answerKey())) return;
    let solution = endless
      ? endlessAnswer
      : custom
        ? customReference
        : isSymbol()
          ? level.solution
          : GEOMETRY_ANSWERS[level.id];
    if (!solution && !custom) {
      const solved = isSymbol()
        ? solveSymbols(level, undefined, 2)
        : solveGeometry(level, undefined, 2);
      if (
        solved.count === 1 &&
        solved.complete !== false &&
        solved.exhaustive !== false
      )
        solution = solved.solutions[0];
    }
    if (!solution) {
      message =
        "Não foi possível certificar um gabarito para esta fase personalizada.";
      renderStatus();
      return;
    }
    const next = initial(level);
    if (isSymbol()) next.values = solution.slice();
    else next[game === "elo" ? "positions" : "assignments"] = solution.slice();
    const checked = isSymbol()
      ? validateSymbols(level, next.values)
      : validateGeometry(level, next);
    if (!checked.complete || !checked.valid) {
      message =
        "O gabarito não passou na verificação. Seu tabuleiro foi preservado.";
      renderStatus();
      return;
    }
    pactoFeedback.reset();
    pactoCheck.reset();
    clearResult();
    history = commitHistory(history, next);
    resetPactoSequence(missionRound);
    missionRound.assisted = true;
    progress().assist(answerKey());
    message =
      "";
    log("answer-applied");
    persist();
    renderBoard();
    renderStatus();
    autoWinPacto();
  }

  function duelMessage() {
    const region = current().restriction;
    const cause = region
      ? ` O jogador ${current().player + 1} recebeu a ${region.axis === "row" ? "linha" : "coluna"} ${region.index + 1}, sem casas disponíveis.`
      : "";
    return duelMode === "bot"
      ? current().winner === 0
        ? "Você venceu! O bot ficou sem casas legais."
        : "O bot venceu. Você ficou sem casas legais."
      : `Jogador ${current().winner + 1} venceu: o outro jogador ficou sem casas legais.${cause}`;
  }
  function duelAfter() {
    hintText = "";
    hintPlan = null;
    hintTier = 0;
    highlight = [];
    motion?.clear();
    persist();
    renderBoard();
    if (current().winner !== null) {
      message = duelMessage();
      showDuelResult();
      log("duel-complete", { turns: current().turn, winner: current().winner });
      if (duelMode !== "bot" || current().winner === 0)
        scheduleEndlessAdvance();
    } else message = "";
    persist();
    renderStatus();
  }
  // Agenda a resposta do bot e descarta resultados que perderam a validade.
  function scheduleBot() {
    clearTimeout(botTimer);
    if (
      game !== "desvio" ||
      duelMode !== "bot" ||
      current().player !== 1 ||
      current().winner !== null
    )
      return;
    message = "O bot está escolhendo um azulejo…";
    renderStatus();
    const expectedTurn = current().turn,
      expectedSession = sessionKey,
      expectedLevel = level;
    botTimer = setTimeout(() => {
      if (
        host.hidden ||
        !history ||
        game !== "desvio" ||
        current().turn !== expectedTurn ||
        current().winner !== null ||
        current().player !== 1 ||
        sessionKey !== expectedSession ||
        level !== expectedLevel
      )
        return;
      const cell = chooseDesvioBotMove(level, current(), botDifficulty);
      history = commitHistory(
        history,
        applyDesvioMove(level, current(), cell, {
          expectedPlayer: 1,
          expectedTurn,
        }),
      );
      duelAfter();
    }, 380);
  }
  function historyAction(redo) {
    cancelGesture();
    if (game === "desvio" && duelMode === "competitive") return;
    if (
      game === "desvio" &&
      duelMode === "local" &&
      !globalThis.confirm?.(
        "Os dois jogadores concordam em " +
          (redo ? "refazer" : "desfazer") +
          " esta jogada?",
      )
    )
      return;
    clearTimeout(botTimer);
    pactoFeedback.reset();
    pactoCheck.reset();
    clearResult();
    resetPactoSequence(missionRound);
    history = redo ? redoHistory(history) : undoHistory(history);
    if (game === "desvio" && duelMode === "bot") {
      if (
        redo &&
        current().player === 1 &&
        current().winner === null &&
        history.future.length
      )
        history = redoHistory(history);
      if (!redo && current().player === 1 && history.past.length)
        history = undoHistory(history);
    }
    duelPreview = -1;
    hoverCell = -1;
    replayAt = null;
    log(redo ? "redo" : "undo");
    persist();
    renderBoard();
    renderStatus();
    restoreResult(true);
    scheduleBot();
  }
  function guided() {
    const steps = TUTORIAL_STEPS[game];
    if (!steps) return;
    const step = steps[Math.min(tutorialStep, steps.length - 1)],
      values = isSymbol()
        ? current().values
        : game === "elo"
          ? current().positions
          : current().assignments;
    const missing = step.requires.filter(
      ([cell, value]) => values[cell] !== value,
    );
    if (missing.length) {
      hintText =
        "Antes de avançar, complete o passo anterior: " +
        steps[Math.max(0, tutorialStep - 1)].text;
      highlight = missing.map(([cell, value]) =>
        game === "elo" ? value : cell,
      );
    } else {
      hintText = step.text;
      highlight = step.cells;
      tutorialStep = Math.min(tutorialStep + 1, steps.length - 1);
      log("tutorial-step", { step: tutorialStep });
    }
    guideText = hintText;
    $("c-guided").textContent =
      `Explicar passo do tutorial · ${tutorialStep + 1}/3`;
    renderBoard();
    renderStatus();
  }
  // Solicita a dica disponível para o estado atual da partida.
  function hint() {
    if (game === "desvio") {
      const state =
        replayAt === null
          ? current()
          : replayDesvio(level, current().history, current().starter, replayAt);
      const key = JSON.stringify([
        state.available,
        state.player,
        state.restriction,
        state.winner,
        duelPreview,
        replayAt,
      ]);
      hintTier = hintPlan?.contextKey === key ? Math.min(3, hintTier + 1) : 1;
      hintPlan = {
        ...buildDesvioContextHint(level, state, {
          mode: duelMode,
          preview: duelPreview,
          replay: replayAt !== null,
        }),
        contextKey: key,
      };
      hintText =
        hintTier === 1
          ? hintPlan.focusText
          : hintTier === 2
            ? hintPlan.explanation
            : hintPlan.nextStep;
      highlight = [];
      log("context-hint", { tier: hintTier });
      persist();
      renderBoard();
      renderStatus();
      return;
    }
    if (!hintPlan) {
      hintPlan = buildDirectHint(game, level, current());
      hintTier = 1;
    } else hintTier = Math.min(3, hintTier + 1);
    highlight = hintPlan.cells ?? [];
    hintText = hintTier === 1 ? hintPlan.focusText : hintPlan.explanation;
    progress().assist(answerKey());
    log("hint", { tier: hintTier });
    persist();
    renderBoard();
    renderStatus();
    $("c-hint-apply").hidden = !(hintTier === 3 && hintPlan.action);
  }
  function analyze() {
    if (duelMode !== "training") return;
    const s =
      replayAt === null
        ? current()
        : replayDesvio(level, current().history, current().starter, replayAt);
    if (
      duelPreview >= 0 &&
      replayAt === null &&
      legalDesvioMoves(level, s).includes(duelPreview)
    ) {
      hintText = explainDesvioMove(level, s, duelPreview).explanation;
      highlight = [duelPreview];
      renderBoard();
      renderStatus();
      return;
    }
    const a = analyzeDesvio(level, s);
    hintText =
      a.explanation ??
      (a.winning
        ? `Posição vencedora com jogo perfeito. Opções: ${a.winningMoves.map((i) => coord(i, level)).join(", ")}.`
        : "Posição perdedora contra respostas perfeitas.");
    highlight = a.winningMoves ?? [];
    renderBoard();
    renderStatus();
  }
  function reviewDuel() {
    if (duelMode !== "training") return;
    const mistake = firstDesvioMistake(
      level,
      current().history,
      current().starter,
    );
    if (mistake) {
      replayAt = mistake.turn;
      duelPreview = -1;
      motion?.clear();
      highlight = [mistake.cell];
      hintText = `Primeira perda de uma vitória forçada: jogada ${mistake.turn + 1}, jogador ${mistake.player + 1}. ${mistake.explanation}`;
    } else
      hintText =
        "Nenhum lance transformou uma posição vencedora em perdedora nesta sequência. Isso não significa que o mapa era neutro.";
    renderBoard();
    renderStatus();
  }
  function strategy() {
    return game === "elo"
      ? "Procure regiões com poucas direções possíveis; mantenha duas ligações por peça e evite circuitos separados. Ligações atravessam fronteiras, mas não podem atravessar outra peça sem parar."
      : game === "prumo"
        ? "Equilíbrio é massa × distância. Uma casa distante compensa várias próximas. Um apoio na borda exige uma peça nessa borda. A conectividade e as casas incidentes limitam as compensações."
        : game === "pacto"
          ? "Conte as cotas. Uma dupla fechada exclui o mesmo símbolo de suas vizinhas externas. Quando só resta um lugar para o parceiro, ele é obrigatório."
          : "Pense no destino que você entrega. Enviar para uma linha ou coluna vazia vence. No treino, analise posições e volte no replay. O bot exato resolve o estado por busca completa com memoização; isso não torna os mapas neutros.";
  }
  function advancedTools() {
    return `<h3>Opções avançadas</h3><p>Editor local.${game === "elo" ? " A importação e verificação de fases personalizadas de ELO fica limitada a 7 × 7; a campanha ampla usa validação própria." : ""} Edite as pistas, regiões, apoios ou setas no JSON. ${game === "desvio" ? "Mapas de DESVIO mantêm até 16 casas e suas regras de turno." : "O verificador busca até duas soluções com orçamento limitado antes de permitir uma fase personalizada. Uma busca inconclusiva não afirma ausência ou unicidade."}</p><label for="c-editor-json">Dados da fase</label><textarea id="c-editor-json" rows="14" spellcheck="false"></textarea>${game === "prumo" ? '<button id="c-derive">Derivar apoios da pintura</button>' : ""}<button id="c-editor-check">Verificar fase</button><button id="c-editor-play">Jogar fase editada</button><p id="c-editor-result" role="status"></p><button id="c-export">Exportar fase JSON</button><button id="c-stats">Exportar métricas locais</button><p>Sem upload automático. Métricas ficam neste navegador; não há contas, ranking ou sincronização.</p>`;
  }
  // Seleciona os campos da definição que podem ser exportados como dados.
  function cleanLevel(l) {
    if (l.game === "elo") return eloPublicLevel(l);
    const x = clone(l);
    delete x.solution;
    delete x.endless;
    x.game ??= game;
    return x;
  }
  function validationError(error) {
    return error instanceof SyntaxError
      ? "JSON inválido. Confira aspas, vírgulas e colchetes."
      : (error?.message ??
          "Não foi possível importar este nível. A partida anterior foi preservada.");
  }
  function checkEditor(play = false) {
    const input = $("c-editor-json"),
      result = $("c-editor-result"),
      text = input.value,
      selectedGame = game;
    cancelJSONImport();
    const token = jsonRevision;
    jsonAbort = new AbortController();
    result.textContent = "Verificando o JSON e as regras…";
    const currentRequest = () =>
      token === jsonRevision &&
      game === selectedGame &&
      $("c-editor-json") === input &&
      input.value === text &&
      !host.hidden;
    const accept = (verified) => {
      if (!currentRequest()) return;
      if (!play) {
        result.textContent = verified.text;
        return;
      }
      if (game === "desvio") startDuel(0, 0, { provided: verified.level });
      else start(0, verified.level, { reference: verified.solution });
    };
    const reject = (error) => {
      if (currentRequest()) result.textContent = validationError(error);
    };
    try {
      const checked = validateCollectionJSON(text, selectedGame, {
        signal: jsonAbort.signal,
      });
      if (checked?.then) checked.then(accept, reject);
      else accept(checked);
    } catch (error) {
      reject(error);
    }
  }
  function editorCheck() {
    return checkEditor(false);
  }
  function editorPlay() {
    return checkEditor(true);
  }
  function derivePrumo() {
    try {
      const assignments = current().assignments;
      if (assignments.some((v) => v < 0))
        throw Error("Pinte todas as casas antes de derivar os apoios.");
      const supports = level.supports.map((p, k) => {
        const cells = assignments.flatMap((v, i) => (v === k ? [i] : []));
        if (!cells.length)
          throw Error("Cada peça precisa ter pelo menos uma casa.");
        const x2 =
            cells.reduce((a, i) => a + 2 * (i % level.cols), 0) / cells.length,
          y2 =
            cells.reduce((a, i) => a + 2 * Math.floor(i / level.cols), 0) /
            cells.length;
        if (
          !Number.isInteger(x2) ||
          !Number.isInteger(y2) ||
          (x2 % 2 && y2 % 2)
        )
          throw Error(
            "O centro de uma peça não está num centro de casa nem no meio de lado. Ajuste a pintura.",
          );
        return { id: k, x2, y2 };
      });
      const l = { ...cleanLevel(level), id: "prumo-personalizado", supports };
      const check = validateGeometry(l, { assignments });
      if (!check.complete)
        throw Error(
          check.violations[0]?.message ?? "As peças precisam ser conectadas.",
        );
      $("c-editor-json").value = JSON.stringify(l, null, 2);
      $("c-editor-result").textContent =
        "Apoios derivados dos centros de massa. Clique em Verificar fase para contar as partições possíveis.";
    } catch (e) {
      $("c-editor-result").textContent = e.message;
    }
  }
  function exportLevel() {
    download(`${level.id}.json`, cleanLevel(level));
  }
  function download(name, value) {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function jsonImportPanel() {
    const example = COLLECTION_JSON_EXAMPLES[game],
      help = [].concat(COLLECTION_JSON_HELP[game] ?? []);
    return `<details class="level-json-import json-import-disclosure" aria-labelledby="c-import-title"><summary id="c-import-title">Adicionar seu próprio nível em JSON</summary><p>Escolha um arquivo do jogo ${META[game].name}. A verificação acontece neste navegador, sem envio automático. Níveis personalizados não alteram as conclusões da campanha.</p><label class="file-button">Importar fase JSON<input id="c-import" type="file" accept="application/json,.json" aria-describedby="c-import-help c-import-status"></label><p id="c-import-help" class="collection-small">Máximo de 200 KB. Use o modelo deste jogo; um arquivo inválido não substitui sua partida anterior.</p><details><summary>Formato e exemplo de ${META[game].name}</summary>${help.map((text) => `<p>${esc(text)}</p>`).join("")}<pre>${esc(JSON.stringify(example, null, 2))}</pre><button id="c-import-example" type="button">Baixar exemplo JSON</button></details><details><summary>Colar JSON</summary><label for="c-import-json">Dados do nível personalizado</label><textarea id="c-import-json" rows="10" spellcheck="false" maxlength="200000"></textarea><button id="c-import-paste" type="button">Verificar e jogar JSON</button></details><p id="c-import-status" role="status" aria-live="polite"></p></details>`;
  }
  function importRequest(input = null) {
    cancelJSONImport();
    const token = jsonRevision,
      selectedGame = game,
      status = $("c-import-status"),
      sourceText = input?.value;
    jsonAbort = new AbortController();
    return {
      game: selectedGame,
      signal: jsonAbort.signal,
      status,
      current: () =>
        token === jsonRevision &&
        game === selectedGame &&
        $("c-import-status") === status &&
        !host.hidden &&
        (!input ||
          ($("c-import-json") === input && input.value === sourceText)),
    };
  }
  // Confere o texto importado antes de incorporá-lo como fase.
  async function importText(text, request = importRequest()) {
    if (!request.current()) return;
    request.status.textContent = "Verificando o JSON e as regras…";
    try {
      const verified = await validateCollectionJSON(text, request.game, {
        signal: request.signal,
      });
      if (!request.current()) return;
      advanced = true;
      if (game === "desvio") startDuel(0, 0, { provided: verified.level });
      else start(0, verified.level, { reference: verified.solution });
    } catch (error) {
      if (request.current())
        request.status.textContent = validationError(error);
    }
  }
  // Lê o arquivo escolhido e encaminha seu conteúdo para validação.
  async function importFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const request = importRequest();
    request.status.textContent = "Lendo o arquivo…";
    try {
      if (file.size > 200000)
        throw Error("Arquivo muito grande. O limite é 200 KB.");
      const text = await file.text();
      if (request.current()) await importText(text, request);
    } catch (error) {
      if (request.current())
        request.status.textContent = validationError(error);
    } finally {
      if (e.target) e.target.value = "";
    }
  }

  document.addEventListener("pointerdown", (e) => {
    if (
      game === "desvio" &&
      level &&
      duelPreview >= 0 &&
      !e.target.closest?.("#c-board") &&
      !e.target.closest?.("#c-confirm, #c-hint")
    )
      cancelPreview();
  });
  globalThis.addEventListener?.("pagehide", persist);
  host.addEventListener("keydown", (e) => {
    if (
      !level ||
      host.hidden ||
      e.target?.isContentEditable ||
      e.target?.closest?.("#c-board") ||
      e.target?.closest?.('input,textarea,select,[contenteditable="true"]')
    )
      return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      e.preventDefault();
      historyAction(!!e.shiftKey);
    }
    if (e.key === "Escape") {
      cancelGesture();
      cancelPreview();
    }
  });
  document
    .querySelectorAll("[data-collection]")
    .forEach((b) => (b.onclick = () => activate(b.dataset.collection)));
  return { hide, activate };
}


