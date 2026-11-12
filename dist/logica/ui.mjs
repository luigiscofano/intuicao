import { readPulsoSkin, writePulsoSkin } from './games/pulso/skin.mjs';
import { readRefugioSkin, writeRefugioSkin } from './games/refugio/skin.mjs';
import { rulesPreviewMarkup } from '../rules-preview.mjs';
import { createRestartConfirmation } from '../restart-confirmation.mjs';
import { createResultMotion } from '../result-motion.mjs';
import { DIFFICULTIES, LOGIC_GAMES, loadLogicGame, escapeHTML as esc } from './metadata.mjs';
import { restoreSession, currentState, applySessionAction, moveHistory, restartSession, applySolution, checkSession } from './session.mjs';
import { createLogicStorage, gameProgress, saveSession, recordCompletion, saveEndless } from './storage.mjs';
import { restoreEndless, endlessLevel, advanceEndless, createEndlessAdvance } from './endless.mjs';
import { nextBoardCell } from './keyboard.mjs';
import { createRenovoTraceInput } from './games/renovo/trace-input.mjs';

/** O desafio diário usa o mesmo catálogo certificado e não cria progresso paralelo. */
export function dailyLevelIndex(game, date = new Date(), count = 80) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
  const day = ['year', 'month', 'day'].map(type => parts.find(part => part.type === type).value).join('-');
  let hash = 2166136261;
  for (const character of `${game}:${day}`) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  return hash % count;
}

export function initLogicGames() {
  const host = document.getElementById('logic-games');
  let storage;
  try { storage = createLogicStorage(globalThis.localStorage); }
  catch { storage = createLogicStorage(null); }
  const restart = createRestartConfirmation('logic-restart');
  const find = id => host.querySelector(`#lg-${id}`);
  let adapter = null;
  let metadata = null;
  let level = null;
  let session = null;
  let selectedTool = '';
  let revision = 0;
  let active = false;
  let screen = 'selection';
  let message = '';
  let outcome = 'idle';
  let motion = null;
  let mode = 'campaign';
  let endless = null;
  const advancement = createEndlessAdvance();
  const renovoTrace = createRenovoTraceInput(host, {
    getContext: () => active && screen === 'play' && metadata?.id === 'renovo' && session && selectedTool === 'select' && !restart.isOpen
      ? { level, state: currentState(session) } : null,
    commit: edit,
    hint: text => { message = text; outcome = 'idle'; renderStatus(); },
  });

  const progress = () => gameProgress(storage.data, metadata.id);
  const isCompleted = item => progress().completed[item.id]?.version === item.version;

  function save() {
    if (!metadata || !adapter) return;
    if (level && session) {
      if (mode === 'endless') saveEndless(storage.data, metadata.id, { ...endless, session });
      else saveSession(storage.data, metadata.id, level, session);
    }
    storage.data.lastView = { game: metadata.id, levelId: level?.id ?? null, screen, active, mode };
    storage.save();
    const warning = find('storage-warning');
    if (warning) { warning.hidden = !storage.warning; warning.textContent = storage.warning; }
  }

  function rulesMarkup() {
    return `<section class="logic-rules" aria-label="Orientações de ${metadata.name}">${rulesPreviewMarkup(metadata.id)}<p class="logic-control-help">${esc(adapter.GAME.instructions)} Use Tab para navegar e Enter ou espaço para marcar. Desfazer: Ctrl/⌘ Z. Refazer: Ctrl/⌘ Shift Z.</p></section>`;
  }

  function showSelection() {
    if (!adapter || !active) return;
    renovoTrace.cancel();
    advancement.cancel();
    save();
    restart.dismiss();
    motion?.clear();
    motion = null;
    screen = 'selection';
    mode = 'campaign';
    endless = null;
    level = null;
    session = null;
    outcome = 'idle';
    const resume = adapter.CAMPAIGN.find(item => item.id === progress().lastLevelId);
    const bands = DIFFICULTIES.map((name, difficulty) => {
      const levels = adapter.CAMPAIGN.filter(item => item.difficulty === difficulty);
      return `<section class="logic-tier" aria-labelledby="lg-tier-${difficulty}"><div class="logic-tier-heading"><h3 id="lg-tier-${difficulty}">${name}</h3><span>${levels.filter(isCompleted).length} / ${levels.length}</span></div><div class="logic-level-grid">${levels.map(item => `<button type="button" class="logic-level${isCompleted(item) ? ' completed' : ''}" data-level-id="${esc(item.id)}" aria-label="Fase ${item.number}, ${esc(item.name)}, ${name}${isCompleted(item) ? ', concluída' : ''}"><strong>${item.number}</strong><span>${esc(item.name)}</span>${isCompleted(item) ? '<i aria-hidden="true">✓</i>' : ''}</button>`).join('')}</div></section>`;
    }).join('');
    host.innerHTML = `<section class="level-screen logic-selection"><div class="logic-selection-heading"><div><p class="eyebrow">CAMPANHA · 80 FASES</p><h2 id="lg-selection-title" tabindex="-1">${metadata.name}</h2><p>${esc(adapter.GAME.description)}</p></div></div><div class="logic-mode-actions">${resume ? `<button type="button" class="primary" data-level-id="${esc(resume.id)}">Retomar fase ${resume.number}</button>` : ''}<button type="button" data-presentation-mode="daily" data-logic-daily>Desafio do dia</button><button type="button" data-presentation-mode="endless" data-logic-endless>Modo sem parar</button><button type="button" data-logic-random>Surpreenda-me</button></div><p id="lg-storage-warning" class="logic-storage-warning" role="status" hidden></p>${rulesMarkup()}${bands}</section>`;
    save();
    find('selection-title')?.focus({ preventScroll: true });
  }

  function start(item, nextRun = null) {
    if (!item || !active) return;
    renovoTrace.cancel();
    advancement.cancel();
    save();
    restart.dismiss();
    motion?.clear();
    mode = nextRun ? 'endless' : 'campaign';
    endless = nextRun;
    level = item;
    session = nextRun ? nextRun.session : restoreSession(adapter, level, progress().sessions[level.id]);
    selectedTool = adapter.toolsForLevel(level)[0]?.id ?? 'cycle';
    screen = 'play';
    message = '';
    outcome = 'idle';
    const position = adapter.CAMPAIGN.indexOf(level);
    host.innerHTML = `<section class="collection-lab logic-lab" aria-label="${metadata.name}"><div class="lab-heading" hidden><div><h2 id="lg-title" class="logic-level-name" tabindex="-1">${esc(level.name)}</h2><p id="lg-stage-label">${mode === 'endless' ? `Sem parar · ciclo ${Math.floor(endless.step / adapter.CAMPAIGN.length) + 1} · ` : ''}Fase ${level.number} de 80 · ${DIFFICULTIES[level.difficulty]}</p></div></div><div class="collection-workspace"><div class="collection-surface logic-surface"><div class="stage-tools"><button type="button" id="lg-levels" data-logic-levels>Níveis</button></div><div id="lg-tools" class="logic-tools" role="group" aria-label="Escolher marcação"></div><div class="board-navigation logic-board-navigation" role="group" aria-label="Área do jogo e navegação de níveis"><button type="button" id="lg-prev" class="level-arrow logic-level-arrow" data-logic-prev aria-label="Nível anterior" title="Nível anterior" aria-controls="lg-board" ${mode === 'endless' ? 'hidden disabled' : position === 0 ? 'disabled' : ''}>←</button><div id="lg-board" class="logic-board" tabindex="-1" aria-label="Tabuleiro de ${metadata.name}"></div><button type="button" id="lg-next" class="level-arrow logic-level-arrow" data-logic-next aria-label="Próximo nível" title="Próximo nível" aria-controls="lg-board" ${mode === 'endless' ? 'hidden disabled' : position === adapter.CAMPAIGN.length - 1 ? 'disabled' : ''}>→</button></div><div id="lg-result-motion" class="result-motion" aria-hidden="true"></div><p id="lg-feedback" class="logic-feedback" role="status" aria-live="polite" aria-atomic="true"></p><p id="lg-storage-warning" class="logic-storage-warning" role="status" hidden></p><div class="board-check-controls"><button type="button" id="lg-confirm" class="primary" data-logic-check>Checar</button><button type="button" id="lg-undo" data-logic-undo>Desfazer</button><button type="button" id="lg-redo" data-logic-redo>Refazer</button><button type="button" id="lg-restart" data-logic-restart>Reiniciar</button><button type="button" id="lg-answer" data-logic-answer hidden>Ver gabarito</button></div><div class="logic-context-source" hidden><h3 id="lg-rules-context-title">Uma descoberta por vez.</h3><p id="lg-rules-context-text">${esc(adapter.GAME.instructions)}</p></div></div></div>${rulesMarkup()}</section>`;
    motion = createResultMotion(find('result-motion'), host.querySelector('.logic-surface'), globalThis, { onRetry: restartNow });
    renderTools();
    renderBoard();
    renderStatus();
    save();
    find('board')?.focus({ preventScroll: true });
    if (mode === 'endless') {
      const result = adapter.checkState(level, currentState(session));
      if (result.valid) complete(result);
    }
  }

  function renderTools() {
    const toolbar = find('tools');
    if (!toolbar) return;
    toolbar.innerHTML = adapter.toolsForLevel(level).map(tool => `<button type="button" data-logic-tool="${esc(tool.id)}" aria-pressed="${tool.id === selectedTool}" class="logic-tool">${esc(tool.label)}</button>`).join('');
  }

  function renderBoard(focusIndex = null) {
    renovoTrace.cancel();
    const skin = metadata.id === 'pulso' ? readPulsoSkin()
      : metadata.id === 'refugio' ? readRefugioSkin() : undefined;
    host.dataset.pulsoSkin = metadata.id === 'pulso' ? skin : '';
    find('board').innerHTML = adapter.renderBoard(level, currentState(session), { selectedTool, skin });
    if (focusIndex !== null) find('board').querySelector(`[data-cell="${focusIndex}"]`)?.focus({ preventScroll: true });
  }

  function renderStatus() {
    if (!session || screen !== 'play') return;
    find('undo').disabled = session.cursor === 0;
    find('redo').disabled = session.cursor === session.states.length - 1;
    find('answer').hidden = session.failures < 3;
    find('answer').textContent = session.assisted ? 'Reaplicar gabarito' : 'Ver gabarito';
    find('feedback').textContent = message;
    find('feedback').dataset.outcome = outcome;
    const warning = find('storage-warning');
    warning.hidden = !storage.warning;
    warning.textContent = storage.warning;
  }

  function complete(result, { animate = true } = {}) {
    const wasWon = outcome === 'win';
    outcome = 'win';
    if (mode !== 'endless') recordCompletion(storage.data, metadata.id, level, session, result);
    message = `Fase concluída${session.assisted ? ' com ajuda' : ''}! ${result.message || 'Todas as regras foram atendidas.'}`;
    save();
    renderStatus();
    if (!wasWon && animate) motion.show(metadata.id, true);
    if (mode === 'endless') {
      message += ' A próxima fase começa em instantes.';
      renderStatus();
      advancement.schedule(() => {
        if (!active || screen !== 'play' || mode !== 'endless' || restart.isOpen) return;
        const current = { ...endless, session };
        const next = advanceEndless(adapter, current);
        if (next !== current) start(endlessLevel(adapter, next), next);
      });
    }
  }

  function edit(action, focusIndex = null) {
    if (!session || restart.isOpen || !active) return;
    const next = applySessionAction(adapter, level, session, action);
    if (next === session) return;
    advancement.cancel();
    session = next;
    message = '';
    outcome = 'idle';
    motion.clear();
    renderBoard(focusIndex);
    // Apenas uma solução completa dispara vitória; editar nunca conta como erro.
    const result = adapter.checkState(level, currentState(session));
    if (result.valid) complete(result);
    else { save(); renderStatus(); }
  }

  function check() {
    if (!session || restart.isOpen) return;
    renovoTrace.cancel();
    const checked = checkSession(adapter, level, session);
    session = checked.session;
    if (checked.result.valid) complete(checked.result);
    else {
      outcome = 'loss';
      message = checked.result.message || 'Confira as regras e as casas que ainda precisam ser decididas.';
      motion.show(metadata.id, false);
      save();
      renderStatus();
    }
  }

  function travel(delta) {
    if (!session || restart.isOpen) return;
    renovoTrace.cancel();
    const next = moveHistory(session, delta);
    if (next === session) return;
    const focusedCell = document.activeElement?.closest('[data-cell]');
    const focusIndex = focusedCell && find('board').contains(focusedCell) ? Number(focusedCell.dataset.cell) : null;
    advancement.cancel();
    session = next;
    outcome = 'idle';
    message = delta < 0 ? 'Última marcação desfeita.' : 'Marcação refeita.';
    motion.clear();
    // Ctrl+Z substitui o SVG; repõe o foco para que o próximo atalho alcance o host.
    renderBoard(focusIndex);
    const result = adapter.checkState(level, currentState(session));
    if (result.valid) complete(result, { animate: false });
    else { save(); renderStatus(); }
  }

  function restartNow() {
    if (!session || !active || screen !== 'play') return;
    advancement.cancel();
    session = restartSession(adapter, level, session);
    message = 'Tentativa reiniciada.';
    outcome = 'idle';
    motion.clear();
    renderBoard();
    save();
    renderStatus();
    find('board').focus({ preventScroll: true });
  }

  function requestRestart(trigger) {
    renovoTrace.cancel();
    advancement.cancel();
    const token = revision;
    restart.open({ trigger, isCurrent: () => token === revision && active && screen === 'play', onConfirm: restartNow, onCancel: () => {
      if (mode !== 'endless' || outcome !== 'win') return;
      const result = adapter.checkState(level, currentState(session));
      if (result.valid) complete(result, { animate: false });
    }, fallbackFocus: () => find('board') });
  }

  function showAnswer() {
    if (!session || restart.isOpen || session.failures < 3) return;
    advancement.cancel();
    session = applySolution(adapter, level, session);
    message = 'Gabarito aplicado. Esta tentativa está marcada como assistida. Confira as relações e use Checar.';
    outcome = 'idle';
    motion.clear();
    renderBoard();
    save();
    renderStatus();
  }

  function navigate(delta) {
    if (mode === 'endless') return;
    const index = adapter.CAMPAIGN.indexOf(level) + delta;
    if (index >= 0 && index < adapter.CAMPAIGN.length) start(adapter.CAMPAIGN[index]);
  }

  function cellAction(target, tool = selectedTool) {
    const index = Number(target.dataset.cell);
    if (!Number.isInteger(index) || index < 0) return;
    edit({ type: 'cell', index, tool }, index);
  }

  host.addEventListener('click', event => {
    if (!active || !adapter || restart.isOpen) return;
    const skinButton = event.target.closest('button[data-pulso-skin]');
    if (metadata.id === 'pulso' && screen === 'play' && skinButton) {
      if (writePulsoSkin(skinButton.dataset.pulsoSkin)) {
        renderBoard();
        find('board').querySelector(`[data-pulso-skin="${skinButton.dataset.pulsoSkin}"]`)?.focus({ preventScroll: true });
        globalThis.dispatchEvent(new Event('pulso-skin-change'));
      }
      return; // Preferência visual não cria jogada, save ou nova vitória.
    }
    const refugioSkinButton = event.target.closest('button[data-refugio-skin]');
    if (metadata.id === 'refugio' && screen === 'play' && refugioSkinButton) {
      if (writeRefugioSkin(refugioSkinButton.dataset.refugioSkin)) {
        renderBoard();
        find('board').querySelector(`[data-refugio-skin="${refugioSkinButton.dataset.refugioSkin}"]`)?.focus({ preventScroll: true });
        globalThis.dispatchEvent(new Event('refugio-skin-change'));
      }
      return; // A preferência não cria jogadas, saves de campanha nem vitórias.
    }
    const target = event.target.closest('[data-level-id],[data-logic-daily],[data-logic-endless],[data-logic-random],[data-logic-tool],[data-cell],[data-logic-check],[data-logic-undo],[data-logic-redo],[data-logic-restart],[data-logic-answer],[data-logic-prev],[data-logic-next],[data-logic-levels]');
    if (!target || target.disabled) return;
    if (target.dataset.levelId) start(adapter.CAMPAIGN.find(item => item.id === target.dataset.levelId));
    else if (target.hasAttribute('data-logic-endless')) { const run = restoreEndless(adapter, progress().endless); start(endlessLevel(adapter, run), run); }
    else if (target.hasAttribute('data-logic-daily')) start(adapter.CAMPAIGN[dailyLevelIndex(metadata.id, new Date(), adapter.CAMPAIGN.length)]);
    else if (target.hasAttribute('data-logic-random')) { const remaining = adapter.CAMPAIGN.filter(item => !isCompleted(item)); const pool = remaining.length ? remaining : adapter.CAMPAIGN; start(pool[Math.floor(Math.random() * pool.length)]); }
    else if (target.dataset.logicTool) {
      selectedTool = target.dataset.logicTool;
      renderTools();
      // A ferramenta também muda as instruções acessíveis de cada alvo.
      renderBoard();
      find('tools').querySelector(`[data-logic-tool="${selectedTool}"]`)?.focus({ preventScroll: true });
    }
    else if (target.hasAttribute('data-cell')) cellAction(target);
    else if (target.hasAttribute('data-logic-check')) check();
    else if (target.hasAttribute('data-logic-undo')) travel(-1);
    else if (target.hasAttribute('data-logic-redo')) travel(1);
    else if (target.hasAttribute('data-logic-restart')) requestRestart(target);
    else if (target.hasAttribute('data-logic-answer')) showAnswer();
    else if (target.hasAttribute('data-logic-prev')) navigate(-1);
    else if (target.hasAttribute('data-logic-next')) navigate(1);
    else if (target.hasAttribute('data-logic-levels')) showSelection();
  });

  // Apenas o botão secundário nas casas do MIRANTE confirma vazio.
  // Mantém toque, teclado, ferramenta selecionada e demais jogos intactos.
  host.addEventListener('contextmenu', event => {
    if (!active || screen !== 'play' || metadata?.id !== 'mirante' || restart.isOpen || event.button !== 2) return;
    if (event.pointerType && event.pointerType !== 'mouse') return;
    const target = event.target.closest('.mirante-cell[data-cell]');
    if (!target || !find('board')?.contains(target)) return;
    event.preventDefault();
    cellAction(target, 'empty');
  });

  host.addEventListener('keydown', event => {
    if (!active || screen !== 'play' || restart.isOpen || event.target.closest('input,textarea,select')) return;
    if (event.key === 'Escape' && metadata.id === 'renovo') { event.preventDefault(); renovoTrace.cancel(); edit({ type: 'cancel-selection' }); return; }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); travel(event.shiftKey ? 1 : -1); return; }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') { event.preventDefault(); travel(1); return; }
    const cell = event.target.closest('[data-cell]');
    if (!cell) return;
    if (['Enter', ' '].includes(event.key) && cell.tagName.toLowerCase() !== 'button') { event.preventDefault(); cellAction(cell); return; }
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    const cells = [...find('board').querySelectorAll('[data-cell][tabindex="0"]')]
      .filter(target => target.getAttribute('aria-disabled') !== 'true');
    const indices = cells.map(target => Number(target.dataset.cell));
    const next = nextBoardCell(indices, Number(cell.dataset.cell), event.key, level.cols ?? level.width ?? 1);
    event.preventDefault();
    cells.find(target => Number(target.dataset.cell) === next)?.focus({ preventScroll: true });
  });
  globalThis.addEventListener('pagehide', () => { renovoTrace.cancel(); advancement.cancel(); save(); });
  globalThis.addEventListener('pageshow', event => {
    if (!event.persisted || !active || screen !== 'play' || mode !== 'endless' || restart.isOpen || !session) return;
    const result = adapter.checkState(level, currentState(session));
    if (result.valid) complete(result, { animate: false });
  });

  return {
    async activate(id) {
      advancement.cancel();
      host.dataset.pulsoSkin = id === 'pulso' ? readPulsoSkin() : '';
      renovoTrace.cancel();
      save();
      const token = ++revision;
      active = true;
      host.hidden = false;
      restart.dismiss();
      motion?.clear();
      const loaded = await loadLogicGame(id);
      if (token !== revision || !active) return;
      adapter = loaded;
      metadata = LOGIC_GAMES.find(item => item.id === id);
      level = null;
      session = null;
      showSelection();
    },
    hide() {
      advancement.cancel();
      renovoTrace.cancel();
      active = false;
      ++revision;
      restart.dismiss();
      motion?.clear();
      save();
      host.hidden = true;
      delete host.dataset.pulsoSkin;
    },
  };
}
