import { writeProgress } from '../progress-write-guard.mjs';
// Preparação e interface de BROTO: prévia, confirmação, tabuleiro e placar.
import {
  createBroto,
  applyBrotoMove,
  previewBrotoMove,
  undoBroto,
  redoBroto,
  resetBrotoRound,
  nextBrotoRound,
  rematchBroto,
  restoreBroto,
  serializeBroto,
  getBrotoMap,
  BROTO_MAPS,
} from './engine.mjs';
import { createRestartConfirmation } from '../restart-confirmation.mjs';
import { rulesPreviewMarkup } from '../rules-preview.mjs';
import { renderVersusVictory } from '../versus-victory.mjs';
import { createDuelResultLayout } from '../duel-result-layout.mjs';
import { bindMiddleConfirm } from '../middle-confirm.mjs';
import { ANIMAL_SPRITES } from '../sintonia/animal-roster.mjs';
export const BROTO_STORAGE_KEY = 'intuicao.broto.v1';
const names = ['Jogador 1', 'Jogador 2'],
  symbols = ['●', '◆'],
  animals = ['capivara', 'tuiuiu'];
const coordinate = (cell, cols = 4) =>
  `Linha ${Math.floor(cell / cols) + 1}, coluna ${(cell % cols) + 1}`;
const flower =
  '<svg class="b-flower" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 35v9M24 39Q10 39 13 31Q21 30 24 39M24 34Q36 34 35 27Q26 26 24 34" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M24 11C14-2 7 10 13 17C-1 18 5 32 16 29C17 42 31 42 32 29C45 32 48 17 35 17C42 7 29-1 24 11Z" fill="currentColor"/><circle cx="24" cy="23" r="6" fill="#fff7d9"/></svg>';
const sprout =
  '<svg class="b-sprout" viewBox="0 0 48 40" aria-hidden="true"><path d="M24 34V18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M24 24C11 25 8 17 9 10C19 9 26 15 24 24ZM24 18C23 8 31 4 40 5C41 14 32 20 24 18Z" fill="currentColor"/><path d="M17 35Q24 30 31 35" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
function pieceMarkup(piece, { ghost = false, bloom = false } = {}) {
  return `<span class="b-piece b-owner-${piece.owner}${ghost ? ' b-ghost' : ''}${bloom ? ' b-flowering' : ''}" aria-hidden="true">${bloom ? flower : sprout}<span class="b-owner-symbol">${symbols[piece.owner]}</span><span class="b-axes"><span class="${piece.h ? 'received' : ''}">↔</span><span class="${piece.v ? 'received' : ''}">↕</span></span></span>`;
}
function pieceLabel(piece) {
  return `${names[piece.owner]}. ${piece.h ? 'Horizontal recebido' : 'Falta horizontal'}; ${piece.v ? 'vertical recebido' : 'falta vertical'}.`;
}
function avatar(player) {
  const s = ANIMAL_SPRITES[animals[player]],
    x = s.frame % s.columns,
    y = Math.floor(s.frame / s.columns);
  return `<span class="b-avatar" aria-hidden="true" style="background-image:url('${s.url}');background-size:${s.columns * 100}% ${s.rows * 100}%;background-position:${(x / (s.columns - 1)) * 100}% ${(y / (s.rows - 1)) * 100}%"></span>`;
}
export function initBroto() {
  const host = document.getElementById('broto'),
    $ = (id) => host.querySelector('#' + id),
    restart = createRestartConfirmation('restart-broto');
  const resultLayout = createDuelResultLayout(host, 'b');
  let state = null,
    mode = 'local',
    screen = 'selection',
    selected = -1,
    focusCell = 0,
    rulesOpen = true,
    message = '',
    storageWarning = false,
    invalidSave = false,
    active = false,
    animation = null,
    timers = [],
    revision = 0,
    middle = null,
    exampleStep = 0,
    selectedMapId = 'classic';
  try {
    const raw = JSON.parse(localStorage.getItem(BROTO_STORAGE_KEY) || 'null');
    if (raw) {
      const restored =
        raw.version === 1 && ['local', 'competitive'].includes(raw.mode)
          ? restoreBroto(raw.state)
          : null;
      if (restored) {
        state = restored;
        selectedMapId = getBrotoMap(state).id;
        mode = raw.mode;
        screen = raw.lastView?.screen === 'play' ? 'play' : 'selection';
      } else invalidSave = true;
    }
  } catch {
    invalidSave = true;
  }
  const currentRecord = () => ({
    version: 1,
    mode,
    state: state ? JSON.parse(serializeBroto(state)) : null,
    lastView: { active, screen },
  });
  // Persiste os dados da partida no armazenamento do navegador.
  function persist() {
    if (!state) return;
    try {
      writeProgress(localStorage, BROTO_STORAGE_KEY, JSON.stringify(currentRecord()));
      storageWarning = false;
    } catch {
      storageWarning = true;
    }
    const notice = $('b-save-warning');
    if (notice) notice.hidden = !storageWarning;
  }
  function stopEffects() {
    resultLayout.cancel();
    revision++;
    timers.forEach(clearTimeout);
    timers = [];
    animation = null;
    middle?.cancel();
    host.querySelectorAll('.versus-victory').forEach((node) => node.remove());
  }
  function title() {
    return state.duelOver
      ? state.winner === 'draw'
        ? 'Empate no duelo.'
        : `${names[state.winner]} venceu o duelo!`
      : state.roundOver
        ? `Rodada ${state.round} concluída.`
        : `Vez do ${names[state.player]} — escolha uma casa vazia.`;
  }
  function previewText(events, owner) {
    const own = events.points[owner],
      other = events.points[1 - owner];
    if (own || other)
      return `Este plantio colhe ${own} ${own === 1 ? 'flor sua' : 'flores suas'} e ${other} ${other === 1 ? 'do adversário' : 'do adversário'}.`;
    const fresh = events.receivers.filter((r) => !r.alreadyReceived),
      h = fresh.filter((r) => r.axis === 'h').length,
      v = fresh.filter((r) => r.axis === 'v').length;
    if (h || v)
      return `Este plantio marca ${[h ? `horizontal em ${h} ${h === 1 ? 'broto' : 'brotos'}` : '', v ? `vertical em ${v} ${v === 1 ? 'broto' : 'brotos'}` : ''].filter(Boolean).join(' e ')}.`;
    return events.receivers.length
      ? 'Os eixos atingidos já estavam marcados. Não há colheita.'
      : 'Este plantio não encontra outros brotos nas quatro direções.';
  }
  function mapPreviewMarkup(map) {
    return `<div class="b-map-mini" style="--b-map-cols:${map.cols}" role="img" aria-label="${map.name}: ${map.rows} linhas, ${map.cols} colunas, ${map.playableCount} casas para plantar, ${map.walls.length} paredes naturais">${Array.from({ length: map.rows * map.cols }, (_, cell) => `<span class="${map.outside.includes(cell) ? 'b-map-outside' : map.walls.includes(cell) ? 'b-map-wall' : 'b-map-ground'}"></span>`).join('')}</div>`;
  }
  // Monta a preparação da partida e as opções de seleção.
  function renderSelection() {
    middle?.destroy();
    middle = null;
    host.innerHTML = `<div class="level-screen b-selection"><h2 id="b-selection-title" tabindex="-1">BROTO ·</h2><p class="b-tagline">Você planta. Mas quem floresce?</p>${rulesPreviewMarkup('broto')}<section class="b-map-setup" aria-label="Escolher jardim"><h3 id="b-map-heading">Escolha o jardim</h3><div id="b-map-cards" class="b-map-cards" role="group" aria-labelledby="b-map-heading">${BROTO_MAPS.map((map) => `<button type="button" data-b-map="${map.id}" aria-pressed="${map.id === selectedMapId}">${mapPreviewMarkup(map)}<strong>${map.name}</strong><small class="b-map-choice" aria-hidden="true">${map.id === selectedMapId ? '✓ Selecionado' : 'Escolher'}</small></button>`).join('')}</div><div id="b-map-preview" aria-live="polite"><p>${getBrotoMap(selectedMapId).description}</p></div><p class="collection-small">Paredes naturais e recortes interrompem os estímulos. Cada rodada mantém oito sementes por jogador.</p></section><div class="collection-toolbar"><label>Duelo local <select id="b-mode"><option value="local" ${mode === 'local' ? 'selected' : ''}>Amistoso · desfazer por acordo</option><option value="competitive" ${mode === 'competitive' ? 'selected' : ''}>Competitivo · sem desfazer ou reiniciar</option></select></label><button id="b-start" class="primary">Iniciar duelo · duas rodadas</button></div><p class="collection-small">Duas pessoas no mesmo dispositivo. O Jogador 1 começa a primeira rodada; o Jogador 2 começa a segunda.</p>${invalidSave ? '<p role="status">O registro de BROTO não pôde ser restaurado com segurança. Os dados dos outros jogos não foram alterados.</p>' : ''}${state && !state.duelOver && !invalidSave ? '<section class="b-resume-panel" aria-labelledby="b-resume-question"><p id="b-resume-question">Deseja retomar a partida interrompida?</p><button id="b-resume" type="button">Retomar partida interrompida</button></section>' : ''}</div>`;
    $('b-map-cards').onclick = (e) => {
      const button = e.target.closest('[data-b-map]');
      if (!button) return;
      selectedMapId = button.dataset.bMap;
      $('b-map-cards')
        .querySelectorAll('[data-b-map]')
        .forEach((card) => {
          const chosen = card.dataset.bMap === selectedMapId;
          card.setAttribute('aria-pressed', String(chosen));
          card.querySelector('.b-map-choice').textContent = chosen ? '✓ Selecionado' : 'Escolher';
        });
      $('b-map-preview').innerHTML = `<p>${getBrotoMap(selectedMapId).description}</p>`;
    };
    $('b-start').onclick = () => {
      if (
        state &&
        !state.duelOver &&
        !globalThis.confirm?.(
          'Os dois jogadores concordam em descartar o duelo salvo e começar outro?',
        )
      )
        return;
      mode = $('b-mode').value;
      state = createBroto(0, selectedMapId);
      invalidSave = false;
      enterPlay();
    };
    if ($('b-resume'))
      $('b-resume').onclick = () => {
        if (state && !state.duelOver && !invalidSave) enterPlay();
      };
  }
  // Abre a área de jogo com a configuração escolhida.
  function enterPlay() {
    stopEffects();
    restart.dismiss();
    screen = 'play';
    selected = -1;
    focusCell = state.board.findIndex((cell) => cell === null || typeof cell === 'object');
    selectedMapId = getBrotoMap(state).id;
    rulesOpen = true;
    message = '';
    renderPlay();
    persist();
    $('b-title')?.focus({ preventScroll: true });
  }
  // Monta as orientações e exemplos de regras apresentados na partida.
  function rulesMarkup() {
    return `<aside id="b-rules-sidebar" class="rules-sidebar" ${rulesOpen ? '' : 'hidden'} aria-label="Regras e como jogar"><h3>Um pequeno jardim de lógica</h3><div class="rules-body"><p><strong>Jardim ${getBrotoMap(state).name}.</strong> ${getBrotoMap(state).description} Só as casas de terra recebem sementes. Paredes naturais e limites do jardim interrompem os estímulos; não recebem marcas nem florescem.</p><p>Plante uma semente em qualquer casa vazia. Ela estimula o primeiro broto encontrado em cada direção: acima, abaixo, esquerda e direita.</p><p>Um broto floresce ao receber horizontal <strong>↔</strong> e vertical <strong>↕</strong>. A flor vale um ponto para seu dono, mesmo que o adversário a complete. Cada jogador tem oito sementes por rodada. O duelo tem duas rodadas.</p><p><strong>Repetir o mesmo eixo não completa uma flor.</strong> A colheita abre passagem somente para jogadas futuras. Colher não devolve sementes.</p><p>Após 16 plantios, a rodada termina sem pontuar os brotos restantes. Vence quem somar mais flores nas duas rodadas; totais iguais dão empate.</p><details class="rules-more"><summary>Exemplo guiado · jardim clássico · cinco plantios</summary><div id="b-example"></div></details><details class="rules-more"><summary>Controles e acessibilidade</summary><p>Use as setas para percorrer o tabuleiro. Enter ou espaço seleciona uma casa vazia; ative a mesma casa novamente ou use Confirmar jogada para plantar. Escape cancela a prévia. ● e ◆ identificam os jogadores além das cores. Os indicadores preenchidos mostram os eixos já recebidos.</p><p>No amistoso, desfazer e refazer exigem acordo. Avançar à segunda rodada consolida o resultado da primeira. No competitivo não há desfazer, refazer ou reinício.</p></details></div></aside>`;
  }
  function renderPlay() {
    resultLayout.beforeReplace();
    middle?.destroy();
    middle = null;
    host.innerHTML = `<div class="collection-lab b-lab"><button id="b-back" class="quiet">← Seleção do duelo</button><div class="lab-heading"><div><h2 id="b-title" tabindex="-1">BROTO ·</h2><p class="b-tagline">Você planta. Mas quem floresce?</p></div><span class="b-round">Rodada ${state.round} de 2</span></div><div class="collection-workspace b-workspace"><div class="collection-surface experiment b-surface"><div class="stage-tools">${mode === 'local' ? '<button id="b-undo" type="button" aria-label="Desfazer" title="Desfazer">↶</button><button id="b-redo" type="button" aria-label="Refazer" title="Refazer">↷</button><button id="b-reset" class="action-reset">↺ Reiniciar rodada</button>' : '<span class="collection-small">Duelo competitivo</span>'}<details id="b-rules-panel" class="rules-card" ${rulesOpen ? 'open' : ''}><summary id="b-rules" aria-controls="b-rules-sidebar" aria-expanded="${rulesOpen}"><span>Regras e como jogar</span><span class="rules-show">Mostrar</span><span class="rules-hide">Ocultar</span></summary></details></div><div id="b-score" class="b-score"></div><p id="b-turn" class="b-turn" aria-live="polite" aria-atomic="true"></p><div class="b-duel-layout"><div class="b-play-column"><div class="b-board-wrap"><div id="b-board" class="b-board" role="group" aria-label="Jardim ${getBrotoMap(state).name}, ${getBrotoMap(state).rows} linhas e ${getBrotoMap(state).cols} colunas"></div><div id="b-round-result" class="b-round-result" hidden></div></div><div class="board-check-controls b-check"><button id="b-confirm" class="primary confirm">Confirmar jogada</button><button id="b-cancel" class="quiet">Cancelar prévia</button></div><p id="b-status" class="b-status" role="status" aria-live="polite" aria-atomic="true"></p></div><div id="b-result"></div></div><p id="b-save-warning" role="status" ${storageWarning ? '' : 'hidden'}>Não foi possível salvar neste navegador. Mantenha esta página aberta para continuar.</p></div>${rulesMarkup()}</div></div>`;
    $('b-back').onclick = () => {
      stopEffects();
      restart.dismiss();
      selected = -1;
      screen = 'selection';
      persist();
      renderSelection();
      $('b-selection-title').focus({ preventScroll: true });
    };
    if ($('b-undo')) $('b-undo').onclick = () => travel(false);
    if ($('b-redo')) $('b-redo').onclick = () => travel(true);
    if ($('b-reset')) $('b-reset').onclick = reset;
    $('b-rules-panel').ontoggle = () => {
      rulesOpen = $('b-rules-panel').open;
      $('b-rules-sidebar').hidden = !rulesOpen;
      $('b-rules').setAttribute('aria-expanded', String(rulesOpen));
    };
    $('b-confirm').onclick = confirm;
    $('b-cancel').onclick = cancelPreview;
    $('b-board').onclick = (e) => {
      const cell = e.target.closest('[data-b-cell]');
      if (cell) choose(Number(cell.dataset.bCell));
    };
    $('b-board').onkeydown = (e) => {
      const cell = e.target.closest('[data-b-cell]');
      if (!cell) return;
      if (e.repeat && ['Enter', ' '].includes(e.key)) {
        e.preventDefault();
        return;
      }
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const direction = {
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1],
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
      }[e.key];
      if (direction) {
        e.preventDefault();
        const map = getBrotoMap(state);
        let row = Math.floor(+cell.dataset.bCell / map.cols) + direction[0],
          col = (+cell.dataset.bCell % map.cols) + direction[1];
        while (row >= 0 && row < map.rows && col >= 0 && col < map.cols) {
          const next = row * map.cols + col;
          if (state.board[next] !== 'wall' && state.board[next] !== 'outside') {
            focusCell = next;
            break;
          }
          row += direction[0];
          col += direction[1];
        }
        updateFocus(true);
      }
    };
    middle = bindMiddleConfirm($('b-board'), {
      enabled: () => active && !animation && selected >= 0 && !state.roundOver,
      onConfirm: confirm,
    });
    renderBoard();
    renderMeta();
    renderExample();
  }
  function updateFocus(focus = false) {
    host
      .querySelectorAll('[data-b-cell]')
      .forEach((button) => (button.tabIndex = +button.dataset.bCell === focusCell ? 0 : -1));
    if (focus) host.querySelector(`[data-b-cell="${focusCell}"]`)?.focus({ preventScroll: true });
  }
  // Desenha o tabuleiro e associa os controles às ações da partida.
  function renderBoard() {
    const target = $('b-board');
    if (!target) return;
    const hadBoardFocus = target.contains(document.activeElement),
      map = getBrotoMap(state);
    target.style.setProperty('--b-cols', map.cols);
    target.classList.toggle('b-dense', map.cols > 4);
    let pieces = state.board,
      events = null,
      phase = 0,
      isPreview = false;
    if (animation) {
      pieces = structuredClone(animation.before.board);
      pieces[animation.events.planted.cell] = {
        owner: animation.events.planted.owner,
        h: false,
        v: false,
      };
      events = animation.events;
      phase = animation.phase;
      if (phase >= 1) for (const r of events.receivers) pieces[r.cell][r.axis] = true;
    } else if (selected >= 0 && !state.roundOver) {
      events = previewBrotoMove(state, selected).events;
      pieces = structuredClone(state.board);
      pieces[selected] = { owner: state.player, h: false, v: false };
      for (const receiver of events.receivers) pieces[receiver.cell][receiver.axis] = true;
      isPreview = true;
    }
    const receiverCells = new Set(events?.receivers.map((r) => r.cell) || []),
      bloomCells = new Set(events?.blooms.map((r) => r.cell) || []);
    target.setAttribute('aria-busy', String(!!animation));
    target.innerHTML =
      pieces
        .map((piece, cell) => {
          if (piece === 'outside') return '<span class="b-outside" aria-hidden="true"></span>';
          if (piece === 'wall')
            return `<span class="b-wall" role="img" aria-label="${coordinate(cell, map.cols)}. Parede natural: interrompe estímulos."></span>`;
          const logical = state.board[cell],
            occupied = !!logical,
            ghost = isPreview && selected === cell,
            bloom = bloomCells.has(cell) && (isPreview || phase >= 2);
          return `<button type="button" data-b-cell="${cell}" class="b-cell${selected === cell ? ' b-selected' : ''}${receiverCells.has(cell) ? ' b-receiver' : ''}${bloom ? ' b-will-bloom' : ''}" aria-label="${coordinate(cell, map.cols)}. ${logical ? pieceLabel(logical) : 'Casa vazia.'}${ghost ? ' Prévia selecionada.' : ''}${isPreview && bloom ? ' Floresceria neste plantio.' : ''}" aria-disabled="${occupied || state.roundOver || !!animation}" tabindex="${cell === focusCell ? 0 : -1}">${piece ? pieceMarkup(piece, { ghost, bloom }) : '<span class="b-empty" aria-hidden="true">·</span>'}</button>`;
        })
        .join('') +
      (events
        ? `<svg class="b-rays${isPreview ? ' b-preview-rays' : ` b-phase-${phase}`}" viewBox="0 0 ${map.cols * 100} ${map.rows * 100}" preserveAspectRatio="none" aria-hidden="true">${events.receivers.map((r) => `<line x1="${(r.from % map.cols) * 100 + 50}" y1="${Math.floor(r.from / map.cols) * 100 + 50}" x2="${(r.to % map.cols) * 100 + 50}" y2="${Math.floor(r.to / map.cols) * 100 + 50}"/>`).join('')}</svg>`
        : '');
    if (hadBoardFocus) updateFocus(true);
  }
  function renderMeta({ celebrate = false } = {}) {
    if (!$('b-score')) return;
    $('b-score').innerHTML = names
      .map(
        (name, p) =>
          `<section class="b-player b-owner-${p}${!state.roundOver && state.player === p ? ' b-current' : ''}" aria-label="${name}"><div class="b-player-name">${avatar(p)}<strong>${symbols[p]} ${name}</strong></div><div class="b-score-main"><strong>${state.scores[p]}</strong><span>${state.scores[p] === 1 ? 'flor' : 'flores'} nesta rodada</span></div><div class="b-score-details"><span><b>${state.reserves[p]}</b> sementes</span><span>Total: <b>${state.totals[p]}</b></span></div></section>`,
      )
      .join('');
    $('b-turn').textContent = title();
    $('b-turn').dataset.owner = state.player;
    $('b-status').textContent =
      message ||
      (state.duelOver
        ? `Duelo concluído: ${state.totals[0]} × ${state.totals[1]} flores.`
        : state.roundOver
          ? 'Os 16 plantios foram resolvidos. Avance quando as duas pessoas estiverem prontas.'
          : `${state.turn} de 16 plantios confirmados. Selecione uma casa para ver os efeitos antes de plantar.`);
    $('b-confirm').disabled = selected < 0 || !!animation || state.roundOver;
    $('b-confirm').hidden = state.roundOver;
    $('b-cancel').hidden = selected < 0 || !!animation || state.roundOver;
    if ($('b-undo')) $('b-undo').disabled = !state.history.length || restart.isOpen;
    if ($('b-redo')) $('b-redo').disabled = !state.future.length || restart.isOpen;
    const result = $('b-result'),
      roundResult = $('b-round-result');
    result.innerHTML = '';
    roundResult.innerHTML = '';
    roundResult.hidden = true;
    if (!state.roundOver || animation) {
      resultLayout.update(false);
      return;
    }
    if (state.duelOver) {
      result.innerHTML = `<div id="b-victory"></div><div class="result-badge b-result-badge"><span class="b-result-flower" aria-hidden="true">${flower}</span><div><strong>${state.winner === 'draw' ? 'Um empate floresceu.' : `${names[state.winner]} venceu!`}</strong><span>${state.totals[0]} × ${state.totals[1]} flores no duelo. ${state.winner === 'draw' ? 'As duas pessoas terminaram com o mesmo total.' : 'Duas rodadas, cada flor conta.'}</span></div></div><div class="level-actions"><button id="b-rematch" class="primary">Revanche · Jogador 1 começa</button><button id="b-finish-back">Voltar à seleção</button></div>`;
      renderVersusVictory($('b-victory'), {
        game: 'broto',
        winnerName: state.winner === 'draw' ? '' : names[state.winner],
        owner: state.winner === 'draw' ? 0 : state.winner,
        emblem: state.winner === 'draw' ? '' : avatar(state.winner),
        draw: state.winner === 'draw',
        animate: celebrate,
      });
      $('b-rematch').onclick = () => {
        stopEffects();
        state = rematchBroto(state);
        enterPlay();
      };
      $('b-finish-back').onclick = () => $('b-back').click();
      resultLayout.update(true);
    } else {
      roundResult.hidden = false;
      roundResult.innerHTML = `<p>Primeira rodada: ${state.scores[0]} × ${state.scores[1]} flores. Na segunda, começa o ${names[1 - state.starter]}.</p><div class="level-actions"><button id="b-next-round" class="primary">Próxima rodada →</button></div>`;
      $('b-next-round').onclick = () => {
        stopEffects();
        state = nextBrotoRound(state);
        enterPlay();
      };
      resultLayout.update(false);
    }
  }
  // Seleciona uma jogada para exibir sua prévia antes da confirmação.
  function choose(cell) {
    if (
      animation ||
      restart.isOpen ||
      state.roundOver ||
      state.board[cell] === 'wall' ||
      state.board[cell] === 'outside'
    )
      return;
    focusCell = cell;
    if (state.board[cell]) {
      message = 'Esta casa já tem um broto. Escolha uma casa vazia.';
      renderMeta();
      updateFocus(true);
      return;
    }
    if (selected === cell) {
      confirm();
      return;
    }
    selected = cell;
    message = previewText(previewBrotoMove(state, cell).events, state.player);
    renderBoard();
    renderMeta();
    updateFocus(true);
  }
  function cancelPreview() {
    if (animation) return;
    selected = -1;
    message = 'Prévia cancelada. Nenhuma semente foi consumida.';
    renderBoard();
    renderMeta();
    updateFocus(true);
  }
  // Executa a confirmação solicitada usando as regras e a sessão atuais.
  function confirm() {
    if (selected < 0 || animation || restart.isOpen || state.roundOver || !active || host.hidden)
      return;
    const before = state,
      cell = selected;
    let resolution;
    try {
      resolution = applyBrotoMove(state, cell, {
        expectedPlayer: state.player,
        expectedTurn: state.turn,
      });
    } catch (error) {
      message = error.message;
      renderMeta();
      return;
    }
    state = resolution.state;
    selected = -1;
    persist();
    message = `${names[before.player]} plantou em ${coordinate(cell, getBrotoMap(state).cols).toLowerCase()}. ${resolution.events.points
      .map((n, p) => (n ? `${names[p]} colheu ${n} ${n === 1 ? 'flor' : 'flores'}.` : ''))
      .filter(Boolean)
      .join(' ')}`;
    stopEffects();
    const token = revision;
    if (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      renderBoard();
      renderMeta();
      updateFocus(true);
      return;
    }
    animation = { before, events: resolution.events, phase: 0 };
    renderBoard();
    renderMeta();
    updateFocus(true);
    const later = (ms, fn) =>
      timers.push(
        setTimeout(() => {
          if (token === revision && active && !host.hidden) fn();
        }, ms),
      );
    later(180, () => {
      animation.phase = 1;
      renderBoard();
    });
    later(380, () => {
      animation.phase = 2;
      renderBoard();
    });
    later(720, () => {
      animation = null;
      timers = [];
      renderBoard();
      renderMeta({ celebrate: state.duelOver });
      updateFocus(true);
    });
  }
  function travel(redo) {
    if (mode !== 'local' || restart.isOpen || !(redo ? state.future : state.history).length) return;
    if (
      !globalThis.confirm?.(
        `Os dois jogadores concordam em ${redo ? 'refazer' : 'desfazer'} esta jogada?`,
      )
    )
      return;
    stopEffects();
    state = redo ? redoBroto(state) : undoBroto(state);
    selected = -1;
    message = redo ? 'Jogada refeita por acordo.' : 'Jogada desfeita por acordo.';
    persist();
    renderBoard();
    renderMeta();
    updateFocus(true);
  }
  function reset() {
    if (mode !== 'local') return;
    const snapshot = state;
    restart.open({
      match: true,
      isCurrent: () => active && !host.hidden && state === snapshot,
      onConfirm: () => {
        stopEffects();
        state = resetBrotoRound(state);
        selected = -1;
        message = 'A rodada foi reiniciada.';
        persist();
        renderPlay();
        $('b-title').focus({ preventScroll: true });
      },
      fallbackFocus: () => $('b-reset'),
    });
    const dialog = document.getElementById('restart-broto');
    if (dialog) {
      dialog.querySelector('#restart-broto-title').textContent =
        `Reiniciar a rodada ${state.round}?`;
      dialog.querySelector('#restart-broto-description').textContent =
        `As jogadas e flores desta rodada serão descartadas. ${state.round === 2 ? 'O resultado da primeira rodada será mantido.' : 'Os dois jogadores voltam a ter oito sementes.'} Confirme apenas se os dois concordarem.`;
      dialog.querySelector('#restart-broto-confirm').textContent = 'Reiniciar rodada';
    }
  }
  function renderExample() {
    const el = $('b-example');
    if (!el) return;
    const sequence = [1, 5, 7, 6, 3];
    let example = createBroto(0, 'classic');
    for (const cell of sequence.slice(0, exampleStep))
      example = applyBrotoMove(example, cell).state;
    const descriptions = [
      'Tabuleiro vazio: cada pessoa tem oito sementes.',
      'Jogador 1 planta em L1C2. O novo broto não tem marcas.',
      'Jogador 2 planta em L2C2. O broto acima recebe vertical ↕.',
      'Jogador 1 planta em L2C4. O primeiro broto à esquerda recebe horizontal ↔.',
      'Jogador 2 planta em L2C3. Horizontal repetido não completa a flor; o broto à direita também recebe ↔.',
      'Jogador 1 planta em L1C4. Dois brotos seus completam ↔ e ↕ e florescem: 2 pontos, 5 sementes. O novo broto começa sem marcas.',
    ];
    el.innerHTML = `<p>Jardim clássico · exemplo separado da partida · passo ${exampleStep} de 5.</p><div class="b-example-grid" role="img" aria-label="${descriptions[exampleStep]}">${example.board.map((piece) => `<span>${piece ? pieceMarkup(piece) : ''}</span>`).join('')}</div><p role="status">${descriptions[exampleStep]}</p><button id="b-example-next">${exampleStep === 5 ? 'Recomeçar exemplo' : 'Próximo passo →'}</button>`;
    $('b-example-next').onclick = () => {
      exampleStep = (exampleStep + 1) % 6;
      renderExample();
      $('b-example-next').focus({ preventScroll: true });
    };
  }
  host.addEventListener('keydown', (e) => {
    if (
      host.hidden ||
      restart.isOpen ||
      e.target.closest('input,textarea,select,[contenteditable],dialog')
    )
      return;
    if (e.key === 'Escape' && selected >= 0) {
      e.preventDefault();
      cancelPreview();
    }
  });
  host.addEventListener('pointerdown', (e) => {
    if (selected >= 0 && !animation && !e.target.closest('#b-board,#b-confirm,#b-cancel')) {
      selected = -1;
      message = '';
      renderBoard();
      renderMeta();
    }
  });
  globalThis.addEventListener('pagehide', persist);
  function activateSelection() {
    stopEffects();
    restart.dismiss();
    selected = -1;
    active = true;
    host.hidden = false;
    screen = 'selection';
    rulesOpen = true;
    message = '';
    if (state) selectedMapId = getBrotoMap(state).id;
    renderSelection();
    persist();
    $('b-selection-title').focus({ preventScroll: true });
  }
  return {
    activate: activateSelection,
    hide() {
      stopEffects();
      restart.dismiss();
      middle?.destroy();
      middle = null;
      selected = -1;
      active = false;
      host.hidden = true;
      persist();
    },
    restoreOnLoad() {
      activateSelection();
      return true;
    },
  };
}
