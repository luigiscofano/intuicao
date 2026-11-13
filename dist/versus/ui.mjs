import { renderMapSelection, bindMapSelection } from "./map-selection.mjs";
import { estaloMapPreview } from "./games/estalo/map-selection.mjs";
import { rulesPreviewMarkup } from '../rules-preview.mjs';
import { FAUNA_ART } from "../fauna-art.mjs";
import { FAUNA_INFO } from "../fauna-info-content.mjs";
import { VERSUS_FRONT_CROPS } from "../versus-mascot-art.mjs";
import { VERSUS_GAMES, loadVersusGame } from "./metadata.mjs";
import {
  createSession,
  currentState,
  restoreSession,
  applySessionMove,
  travelHistory,
  serializeSession,
} from "./session.mjs";
import { createVersusStorage } from "./storage.mjs";
import { createSearchService } from "./search-service.mjs";
import { canRepeatChoice, repeatsPendingChoice, repeatChoiceHelp } from "./repeat-choice.mjs";
import { createDuelConfirmation } from "./confirmation.mjs";
import { escapeHTML as esc, playerMark } from "./shared/markup.mjs";
import { PLAYER_ANIMALS, gamePlayerName, playerAvatar } from "./player-identities.mjs";
import { versusIcon } from "./icons.mjs";
import { evaluateVersusMissions } from "../achievements/versus-missions.mjs";
import { recordMissionUnlocks } from "../achievements/mission-store.mjs";
import { renderVersusVictory, stopVersusVictory } from "../versus-victory.mjs";

const MODES = Object.freeze({
  local: "Dois jogadores locais",
  competitive: "Duelo local competitivo",
  bot: "Contra o computador",
  training: "Treino com análise",
});
const DIFFICULTIES = Object.freeze({
  beginner: "Explorador",
  intermediate: "Intermediário",
  strong: "Avançado · busca limitada",
});

function defaultConfig() {
  return {
    mode: "local",
    difficulty: "intermediate",
    mascots: ["capivara", "tucano"],
  };
}

function validConfig(config) {
  return Boolean(
    config &&
    Object.hasOwn(MODES, config.mode) &&
    Object.hasOwn(DIFFICULTIES, config.difficulty) &&
    Array.isArray(config.mascots) &&
    config.mascots.length === 2 &&
    config.mascots.every((id) => Object.hasOwn(VERSUS_FRONT_CROPS, id)),
  );
}

function loadStyles(id) {
  if (document.querySelector(`link[data-versus-style="${id}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.dataset.versusStyle = id;
  link.href = new URL(`./games/${id}/view.css`, import.meta.url).href;
  document.head.append(link);
}

export function initVersusGames() {
  const host = document.getElementById("versus-games");
  const find = (id) => host.querySelector(`#nv-${id}`);
  let browserStorage = null;
  try {
    browserStorage = globalThis.localStorage;
  } catch {
    /* O jogo também funciona sem armazenamento. */
  }
  const storage = createVersusStorage(browserStorage);
  const search = createSearchService();
  const confirmation = createDuelConfirmation();

  let game = null;
  let metadata = null;
  let session = null;
  let playConfig = defaultConfig();
  let draftConfig = defaultConfig();
  let active = false;
  let screen = "selection";
  let selection = null;
  let pendingMove = null;
  let previewAction = null;
  let previewState = null;
  let revision = 0;
  let botTimer = null;
  let thinking = false;
  let botFailed = false;
  let message = "";
  let invalidSave = false;
  let freshResult = null;
  let renderedResult = null;

  const playerName = (player) => gamePlayerName(game?.id, player);
  const state = () => currentState(session);
  const computerTurn = () =>
    playConfig.mode === "bot" &&
    session &&
    state().player === 1 &&
    !state().result;

  function stopWork() {
    freshResult = null;
    stopVersusVictory(find("result"));
    revision += 1;
    clearTimeout(botTimer);
    botTimer = null;
    search.cancel();
    thinking = false;
    botFailed = false;
  }

  function clearPreview() {
    selection = null;
    pendingMove = null;
    previewAction = null;
    previewState = null;
  }

  function save() {
    if (!game || !session || invalidSave) return;
    storage.save(game.id, serializeSession(session, playConfig));
    renderStorageWarning();
  }

  function renderStorageWarning() {
    const warning = find("storage-warning");
    if (!warning) return;
    warning.hidden = !storage.warning;
    warning.textContent = storage.warning;
  }

  function rulesMarkup() {
    return `
      <details class="nv-rules" open>
        <summary>Regras e como jogar</summary>
        ${rulesPreviewMarkup(game.id)}
      </details>`;
  }

  function mascotOptions(player) {
    return FAUNA_ART.filter(({ id }) => Object.hasOwn(VERSUS_FRONT_CROPS, id))
      .map(
        ({ id }) => `
      <option value="${esc(id)}" ${draftConfig.mascots[player] === id ? "selected" : ""}>${esc(FAUNA_INFO[id]?.name ?? id)}</option>`,
      )
      .join("");
  }

  function renderSelection() {
    if (!game || !active) return;
    stopWork();
    confirmation.dismiss();
    clearPreview();
    screen = "selection";
    const initial = game.engine.createState(draftConfig);
    const resume = session && !state().result && !invalidSave;
    host.innerHTML = `
      <section class="level-screen nv-selection">
        <div class="nv-selection-heading">
          ${versusIcon(game.id, "nv-game-icon")}
          <div><p class="eyebrow">VERSUS · DOIS JOGADORES</p><h2 id="nv-selection-title" tabindex="-1">${esc(game.name)}</h2><p>${esc(game.tagline)}</p></div>
        </div>
        ${rulesMarkup()}
        <div class="nv-preparation">
          <div class="nv-setup-options">
            <h3>Prepare a partida</h3>
            <p>${esc(game.objective)}</p>
            <p class="nv-duration">${esc(game.duration)}</p>
            ${game.maps ? renderMapSelection({ id: game.id, maps: game.maps, selectedId: draftConfig.mapId ?? initial.mapId, preview: game.mapPreview ?? estaloMapPreview, note: game.mapNote ?? '', groupLabel: game.mapGroupLabel ?? 'Tamanho do tabuleiro' }) : ""}
            <label>Modo de jogo<select id="nv-mode">${Object.entries(MODES)
              .map(
                ([value, label]) =>
                  `<option value="${value}" ${draftConfig.mode === value ? "selected" : ""}>${label}</option>`,
              )
              .join("")}</select></label>
            <label id="nv-difficulty-label" ${draftConfig.mode === "bot" ? "" : "hidden"}>Nível do computador<select id="nv-difficulty">${Object.entries(
              DIFFICULTIES,
            )
              .map(
                ([value, label]) =>
                  `<option value="${value}" ${draftConfig.difficulty === value ? "selected" : ""}>${label}</option>`,
              )
              .join("")}</select></label>
            ${game.id === "vazante" ? `<div class="nv-mascot-options">${[0, 1].map((player) => `<label>${playerMark(player)} Mascote ${playerName(player)}<select data-mascot-player="${player}">${mascotOptions(player)}</select></label>`).join("")}</div><p class="nv-small">Os mascotes são visuais. Todos os barcos seguem as mesmas regras.</p>` : ""}
            <button type="button" id="nv-start" class="primary" data-shell-action="start">Iniciar partida</button>
            ${resume ? '<div class="nv-resume"><p>Há uma partida em andamento.</p><button type="button" data-shell-action="resume">Retomar partida interrompida</button></div>' : ""}
            ${invalidSave ? '<p class="nv-warning" role="status">A partida salva é incompatível. Ela foi preservada; iniciar outra substituirá somente o registro deste jogo.</p>' : ""}
            <p id="nv-storage-warning" class="nv-warning" role="status" hidden></p>
          </div>
        </div>
      </section>`;
    if (game.maps) bindMapSelection(host, { maps: game.maps, selectedId: draftConfig.mapId ?? initial.mapId, onSelect(map) {
      draftConfig.mapId = map.id;
      renderSelection();
    } });
    renderStorageWarning();
    find("selection-title").focus({ preventScroll: true });
  }

  function showPlay() {
    stopWork();
    confirmation.dismiss();
    clearPreview();
    screen = "play";
    message = "";
    host.innerHTML = `
      <section class="collection-lab nv-lab" aria-label="${esc(game.name)}">
        <div class="lab-heading" hidden><h2 id="nv-title">${esc(game.name)}</h2><p id="nv-stage-label">${esc(MODES[playConfig.mode])}</p></div>
        <div class="collection-workspace nv-workspace">
          <div class="collection-surface nv-surface">
            <div class="stage-tools"><button type="button" data-shell-action="preparation">← Preparar partida</button></div>
            <div id="nv-teams" class="nv-teams"></div>
            <p id="nv-turn" tabindex="-1" class="nv-turn" aria-live="polite" aria-atomic="true"></p>
            <p class="nv-objective">${esc(game.objective)}</p>
            <div id="nv-board" class="nv-board" tabindex="-1" aria-label="Tabuleiro de ${esc(game.name)}"></div>
            <div id="nv-move-controls" class="board-check-controls nv-move-controls" role="group" aria-label="Confirmar ou cancelar a jogada">
              <button type="button" id="nv-confirm" class="primary" data-shell-action="confirm">Confirmar jogada</button>
              <button type="button" id="nv-cancel" data-shell-action="cancel">Cancelar prévia</button>
              <span id="nv-repeat-help" class="nv-repeat-help">Complete a jogada; repita a última escolha para confirmar.</span>
            </div>
            <p id="nv-preview" class="nv-preview" aria-live="polite" hidden></p>
            <p id="nv-feedback" class="nv-feedback" role="status" aria-live="polite" aria-atomic="true"></p>
            <div id="nv-result" class="nv-result-host"></div>
            <div class="board-check-controls nv-controls">
              <button type="button" id="nv-undo" data-shell-action="undo">Desfazer</button>
              <button type="button" id="nv-redo" data-shell-action="redo">Refazer</button>
              <button type="button" id="nv-restart" data-shell-action="restart">Reiniciar</button>
              <button type="button" id="nv-hint" data-shell-action="hint" ${playConfig.mode === "training" ? "" : "hidden"}>Explicar uma possibilidade</button>
              <button type="button" id="nv-retry-bot" data-shell-action="retry-bot" hidden>Tentar jogada do computador</button>
              <button type="button" id="nv-rematch" data-shell-action="rematch" hidden>Jogar novamente</button>
            </div>
            <p id="nv-storage-warning" class="nv-warning" role="status" hidden></p>
            <div hidden><h3 id="nv-rules-context-title">Escolha e confira.</h3><p id="nv-rules-context-text"></p></div>
          </div>
        </div>
        ${rulesMarkup()}
      </section>`;
    renderPosition();
    save();
    find("board").focus({ preventScroll: true });
    scheduleComputer();
  }

  function renderBoard() {
    const board = find("board");
    if (!board || !session) return;
    const focused = board.contains(document.activeElement)
      ? document.activeElement.dataset.action
      : null;
    const moveControls = find("move-controls");
    const focusedControl = moveControls?.contains(document.activeElement)
      ? document.activeElement
      : null;
    // Preservar os mesmos botões e handlers antes de recriar somente o tabuleiro.
    if (moveControls && board.contains(moveControls)) board.after(moveControls);
    board.innerHTML = game.view.renderBoard(state(), {
      selection,
      pendingMove,
      previewState,
      legalMoves: game.engine.getLegalMoves(state()),
      config: playConfig,
      disabled: Boolean(thinking || computerTurn() || state().result),
    });
    // Coleções, recibos e explicações podem ser longos: confirmar fica junto da
    // área jogável, antes desses extras, usando o mesmo nó acessível.
    const moveAnchor = {
      enlace: ".enlace-board", vazante: ".vazante-river-frame",
      mosaico: ".mosaico-board-wrap", quinhao: ".quinhao-choices",
      estalo: ".estalo-aim", dobra: ".dobra-map",
      acorde: ".acorde-pass", lastro: ".lastro-round-break",
    }[game.id];
    const anchor = board.querySelector(moveAnchor) ?? board.querySelector({
      quinhao: ".quinhao-plot", estalo: ".estalo-coordinates",
      acorde: ".acorde-board", lastro: ".lastro-instrument",
    }[game.id] ?? moveAnchor);
    // O shell comum mantém o grupo nativo ao lado do tabuleiro, fora da região inert.
    if (moveControls && anchor && !moveControls.closest(".approved-action-panel"))
      anchor.after(moveControls);
    // Os nós do tabuleiro são recriados na prévia: comparar a ação, não o nó DOM,
    // mantém o segundo clique/toque e o foco de teclado na mesma escolha.
    if (pendingMove && canRepeatChoice(game.id, previewAction)) {
      for (const button of board.querySelectorAll("[data-action]")) {
        if (button.dataset.action !== JSON.stringify(previewAction)) continue;
        button.classList.add("nv-repeat-confirm");
        button.setAttribute("aria-description", "Prévia selecionada. Ative novamente para confirmar a jogada.");
      }
    }
    board.inert = Boolean(thinking || computerTurn() || state().result);
    board.setAttribute("aria-busy", String(thinking));
    board.classList.toggle("nv-preview-active", Boolean(pendingMove));
    if (focusedControl?.isConnected) {
      const focusTarget = board.inert ? find("turn") :
        focusedControl.disabled ? board : focusedControl;
      focusTarget.focus({ preventScroll: true });
    }
    if (focused) {
      const previousTarget = [...board.querySelectorAll("[data-action]")]
        .find((button) => button.dataset.action === focused);
      const focusTarget = board.inert ? find("turn") :
        previousTarget && !previousTarget.disabled ? previousTarget : board;
      focusTarget.focus({ preventScroll: true });
    }
  }

  function renderResult() {
    const resultHost = find("result");
    const result = state().result;
    if (!result) {
      stopVersusVictory(resultHost);
      resultHost.innerHTML = "";
      renderedResult = null;
      freshResult = null;
      return;
    }
    // Redesenhos de placar, avisos ou foco não repetem nem substituem a entrada.
    if (renderedResult === result && resultHost.firstElementChild) return;
    renderedResult = result;
    const animate = freshResult === result;
    freshResult = null;
    const draw = result.winner === null;
    renderVersusVictory(resultHost, {
      game: game.id,
      winnerName: draw ? "" : playerName(result.winner),
      owner: result.winner,
      draw,
      lost: playConfig.mode === "bot" && result.winner === 1,
      mode: playConfig.mode,
      reason: result.reason,
      mascot: draw ? null : playConfig.mascots[result.winner],
      animate,
      resultKey: result,
    });
  }

  function renderPosition() {
    if (!active || screen !== "play" || !session) return;
    const current = state();
    const scores = game.engine.getScores(current);
    find("teams").innerHTML = [0, 1]
      .map(
        (player) => `
      <section class="nv-team ${PLAYER_ANIMALS[game.id] ? "nv-team--animal" : ""} nv-team-${player}${!current.result && current.player === player ? " nv-current" : ""}" aria-label="${playerName(player)}: ${scores[player]} ${metadata.scoreLabel}">
        ${PLAYER_ANIMALS[game.id] ? playerAvatar(game.id, player) : `<span class="nv-team-symbol" aria-hidden="true">${playerMark(player)}</span>`}<div><strong class="nv-team-name">${PLAYER_ANIMALS[game.id] ? playerMark(player) + " " : ""}${playerName(player)}${playConfig.mode === "bot" && player === 1 ? " · computador" : ""}</strong><span>${esc(scores[player])} ${esc(metadata.scoreLabel)}</span></div>
      </section>`,
      )
      .join("");
    const status = game.view.getStatus(current);
    find("turn").textContent = current.result
      ? "Partida encerrada"
      : thinking
        ? `${playerName(current.player)} está analisando…`
        : `${playerMark(current.player)} Vez do ${playerName(current.player)}`;
    find("rules-context-text").textContent = status;
    find("feedback").textContent = message || status;
    find("preview").hidden = !pendingMove;
    find("preview").textContent = pendingMove
      ? `Prévia: ${game.view.describeMove(current, pendingMove, previewState)}`
      : "";
    find("repeat-help").textContent = repeatChoiceHelp(game.id, previewAction);
    find("repeat-help").hidden = Boolean(current.result || computerTurn() || thinking);
    const competitive = playConfig.mode === "competitive";
    find("confirm").disabled =
      !pendingMove ||
      thinking ||
      Boolean(current.result) ||
      Boolean(computerTurn());
    find("cancel").disabled = !selection && !pendingMove;
    find("undo").hidden = competitive;
    find("redo").hidden = competitive;
    find("undo").disabled = session.cursor === 0;
    find("redo").disabled =
      session.cursor >= session.actions.length || thinking;
    find("restart").disabled = competitive && !current.result;
    find("hint").disabled = thinking || Boolean(current.result);
    find("rematch").hidden = !current.result;
    find("retry-bot").hidden = !botFailed || !computerTurn();
    renderBoard();
    renderResult();
    renderStorageWarning();
  }

  function choose(action) {
    if (
      !active ||
      screen !== "play" ||
      thinking ||
      computerTurn() ||
      state().result ||
      confirmation.isOpen
    )
      return;
    try {
      const choice = game.view.interact(state(), selection, action);
      if (repeatsPendingChoice(game.id, previewAction, action, pendingMove, choice.move))
        return commit(pendingMove);
      previewAction = choice.move ? action : null;
      selection = choice.selection ?? null;
      pendingMove = choice.move ?? null;
      previewState = pendingMove
        ? game.engine.applyMove(state(), pendingMove)
        : null;
      message = "";
    } catch (error) {
      previewAction = null;
      pendingMove = null;
      previewState = null;
      message = error.message || "Escolha uma jogada permitida.";
    }
    renderPosition();
  }

  function commit(move, { computer = false } = {}) {
    const before = state();
    const nextSession = applySessionMove(game.engine, session, move);
    message = game.view.describeMove(before, move, currentState(nextSession));
    session = nextSession;
    freshResult = !before.result ? state().result : null;
    clearPreview();
    renderPosition();
    save();
    // Conquistas nascem da confirmação humana, nunca da prévia ou da busca do bot.
    if (!computer) {
      recordMissionUnlocks(
        evaluateVersusMissions({
          gameId: game.id,
          before,
          after: currentState(session),
          move,
          actor: before.player,
          config: playConfig,
          engine: game.engine,
        }),
      );
    }
    scheduleComputer();
  }

  function startNew() {
    session = createSession(game.engine, draftConfig);
    playConfig = structuredClone(draftConfig);
    invalidSave = false;
    showPlay();
  }

  function askBeforeReplacing(onConfirm) {
    if (!session || state().result || session.cursor === 0) {
      onConfirm();
      return;
    }
    stopWork();
    const token = revision;
    confirmation.open({
      title: "Começar outra partida?",
      description:
        "As jogadas deste duelo serão substituídas. As partidas dos outros jogos continuam guardadas.",
      isCurrent: () => active && token === revision,
      onConfirm,
      onCancel: () => {
        renderPosition();
        scheduleComputer();
      },
    });
  }

  function travel(direction) {
    if (!session || playConfig.mode === "competitive") return;
    const perform = () => {
      stopWork();
      session = travelHistory(session, direction, playConfig.mode === "bot");
      clearPreview();
      message = direction < 0 ? "Jogada desfeita." : "Jogada refeita.";
      renderPosition();
      save();
      scheduleComputer();
    };
    if (playConfig.mode === "local") {
      stopWork();
      const token = revision;
      confirmation.open({
        title: direction < 0 ? "Desfazer por acordo?" : "Refazer por acordo?",
        description: "Confirmem juntos esta alteração no histórico da partida.",
        isCurrent: () => active && token === revision,
        onConfirm: perform,
        onCancel: () => renderPosition(),
      });
    } else perform();
  }

  async function requestAnalysis(forComputer) {
    if (
      !active ||
      screen !== "play" ||
      !session ||
      state().result ||
      thinking ||
      confirmation.isOpen ||
      (forComputer && !computerTurn())
    )
      return;
    const token = revision;
    thinking = true;
    botFailed = false;
    clearPreview();
    renderPosition();
    try {
      const answer = await search.analyze(
        game,
        state(),
        forComputer ? playConfig.difficulty : "strong",
      );
      if (!active || screen !== "play" || token !== revision) return;
      thinking = false;
      if (!answer.move)
        throw new Error("Não foi encontrada uma ação para esta posição.");
      if (forComputer) commit(answer.move, { computer: true });
      else {
        selection = game.view.selectionForMove?.(state(), answer.move) ?? null;
        pendingMove = answer.move;
        previewState = game.engine.applyMove(state(), answer.move);
        message = `Uma possibilidade: ${game.view.describeMove(state(), answer.move, previewState)} Confira a prévia; você decide se quer jogar.`;
        renderPosition();
      }
    } catch (error) {
      if (error.name === "AbortError" || token !== revision) return;
      thinking = false;
      message = "A análise foi interrompida. Sua posição continua guardada.";
      botFailed = forComputer;
      renderPosition();
    }
  }

  function scheduleComputer() {
    clearTimeout(botTimer);
    if (!active || screen !== "play" || !computerTurn() || confirmation.isOpen)
      return;
    // O intervalo deixa a consequência da jogada humana legível antes da resposta.
    botTimer = setTimeout(() => requestAnalysis(true), 380);
  }

  function shellAction(action) {
    if (action === "start") return askBeforeReplacing(startNew);
    if (action === "resume" && session) return showPlay();
    if (action === "preparation") {
      save();
      draftConfig = structuredClone(playConfig);
      return renderSelection();
    }
    if (action === "confirm" && active && screen === "play" && pendingMove &&
        !thinking && !computerTurn() && !state().result && !confirmation.isOpen)
      return commit(pendingMove);
    if (action === "cancel") {
      clearPreview();
      message = "";
      return renderPosition();
    }
    if (action === "undo") return travel(-1);
    if (action === "redo") return travel(1);
    if (action === "hint" && playConfig.mode === "training")
      return requestAnalysis(false);
    if (action === "retry-bot") {
      find("retry-bot").hidden = true;
      return requestAnalysis(true);
    }
    if (
      action === "restart" &&
      !(playConfig.mode === "competitive" && !state().result)
    ) {
      draftConfig = structuredClone(playConfig);
      return askBeforeReplacing(startNew);
    }
    if (action === "rematch" && state().result) {
      draftConfig = structuredClone(playConfig);
      if (playConfig.mode !== "bot") draftConfig.mascots.reverse();
      return startNew();
    }
  }

  host.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || button.disabled || !host.contains(button)) return;
    if (button.dataset.shellAction) shellAction(button.dataset.shellAction);
    else if (button.dataset.action) {
      try {
        choose(JSON.parse(button.dataset.action));
      } catch {
        message = "Selecione novamente uma opção do tabuleiro.";
        renderPosition();
      }
    }
  });

  host.addEventListener("change", (event) => {
    if (event.target.id === "nv-mode") {
      draftConfig.mode = event.target.value;
      find("difficulty-label").hidden = draftConfig.mode !== "bot";
    } else if (event.target.id === "nv-difficulty")
      draftConfig.difficulty = event.target.value;
    else if (event.target.matches("[data-mascot-player]")) {
      const player = Number(event.target.dataset.mascotPlayer);
      draftConfig.mascots[player] = event.target.value;
      renderSelection();
    }
  });

  host.addEventListener("keydown", (event) => {
    if (screen !== "play" || confirmation.isOpen) return;
    // Segurar Enter/espaço não pode transformar a primeira seleção em jogada.
    if (event.repeat && ["Enter", " "].includes(event.key)) {
      event.preventDefault();
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      shellAction("cancel");
    }
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "z" &&
      !event.target.matches("input, select, textarea")
    ) {
      event.preventDefault();
      shellAction(event.shiftKey ? "redo" : "undo");
    }
  });

  async function activate(id) {
    stopWork();
    const token = revision;
    active = true;
    const loaded = await loadVersusGame(id);
    if (!active || token !== revision) return;
    game = loaded;
    metadata = VERSUS_GAMES.find((entry) => entry.id === id);
    loadStyles(id);
    session = null;
    invalidSave = false;
    draftConfig = defaultConfig();
    playConfig = defaultConfig();
    const record = storage.read(id);
    if (record) {
      try {
        if (record.version !== 1 || !validConfig(record.config))
          throw new Error("Configuração incompatível.");
        session = restoreSession(game.engine, record);
        playConfig = structuredClone(record.config);
        draftConfig = structuredClone(record.config);
      } catch {
        invalidSave = true;
      }
    }
    renderSelection();
  }

  function hide() {
    if (active) save();
    active = false;
    stopWork();
    confirmation.dismiss();
    host.hidden = true;
  }

  window.addEventListener("pagehide", () => {
    if (active) save();
    stopWork();
  });
  // O navegador pode restaurar a mesma página sem executar novamente os módulos.
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted || !active || screen !== "play") return;
    renderPosition();
    scheduleComputer();
  });
  return { activate, hide };
}
