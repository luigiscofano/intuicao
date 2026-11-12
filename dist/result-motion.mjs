import { LOGIC_GAMES } from './logica/metadata.mjs';
// Ciclo das animações de resultado e limpeza dos efeitos ao trocar de partida.
import { gameVictoryMarkup } from './game-victory.mjs';
import { victoryTilesMarkup } from './victory-tiles.mjs';
const celebratedStates = new WeakSet();
// Feedback visual de resultado. Não calcula física nem decide se a resposta venceu.
// Uma nova vitória anima a faixa uma vez; estados já vistos voltam estáticos.
const names = {
  ...Object.fromEntries(LOGIC_GAMES.map(game => [game.id, game.name])),
  light: 'Reflexos',
  cut: 'Corte certo',
  elo: 'ELO',
  prumo: 'PRUMO',
  pacto: 'PACTO',
  desvio: 'DESVIO',
  sintonia: 'SINTONIA',
  repasse: 'REPASSE',
  orbita: 'ÓRBITA',
};
const captions = {
  light: ['Um caminho até o alvo.', 'Gire os espelhos e tente novamente.'],
  cut: ['As áreas ficaram na medida.', 'Ajuste o corte e tente novamente.'],
  sintonia: ['Todos encontraram seu lugar.', 'Observe os caminhos e experimente novamente.'],
  repasse: ['Cada repasse chegou à medida certa.', 'Observe as metas e experimente outra ordem.'],
  orbita: [
    'Todos os símbolos encontraram seu lugar.',
    'Prepare os encontros e experimente outra sequência.',
  ],
};
// A faixa permanece fora do tabuleiro e nunca altera o estado da partida.
export function celebrationMarkup(options = {}) {
  return victoryTilesMarkup(options);
}
export function resultMarkup(game, success, options = {}) {
  if (!(game in names)) throw new Error('Jogo desconhecido');
  const retry = !success || options.retry === true ? retryMarkup(game) : '';
  if (!success) return retry;
  // Versus mantém sua apresentação até aprovação específica do novo conjunto.
  if (game === 'desvio') {
    return `<div class="result-badge result-desvio result-win${options.animate === false ? ' game-victory-static' : ''}" data-outcome="win">${gameVictoryMarkup(game)}<div><strong>${options.winner ? '✓ Jogador ' + options.winner + ' venceu!' : '✓ Vitória!'}</strong><span>Seu caminho decidiu a partida.</span></div></div>${retry}`;
  }
  const copy = {
    elo: 'As ligações fecharam o circuito.',
    prumo: 'Cada peça encontrou seu equilíbrio.',
    pacto: 'As duplas estão em acordo.',
    sintonia: 'Um comando, todos nos seus destinos.',
    repasse: 'Cada repasse chegou à medida certa.',
    orbita: 'Os giros alinharam todos os alvos.',
    desvio: 'Seu caminho decidiu a partida.',
  };
  const winner = Number.isInteger(options.winner) ? `✓ Jogador ${options.winner} venceu!` : 'Parabéns!';
  return `<div class="result-badge result-${game} result-win tile-victory${options.animate === false ? ' game-victory-static' : ''}" data-outcome="win">${celebrationMarkup({ animate: options.animate !== false })}<div><strong>${winner}</strong><span>${copy[game] ?? captions[game]?.[0] ?? 'Cada escolha encontrou seu lugar.'}</span></div></div>${retry}`;
}
function retryMarkup(game) {
  const label =
    game === 'desvio' ? 'Reiniciar partida imediatamente' : 'Reiniciar fase imediatamente';
  return `<div class="result-retry-actions"><button type="button" class="result-retry" data-result-retry aria-label="${label}" title="${label}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg></button></div>`;
}
export function createResultMotion(
  host,
  surface,
  clock = globalThis,
  { onRetry, getVictoryState } = {},
) {
  let serial = 0,
    timer = null;
  const stop = () => {
    if (timer !== null) clock.clearTimeout(timer);
    timer = null;
    surface.classList.remove('result-failure');
    surface.classList.remove('result-success');
  };
  return {
    clear() {
      serial++;
      stop();
      host.innerHTML = '';
      host.dataset.state = 'idle';
      delete host.dataset.outcome;
      delete host.dataset.retry;
      delete host.dataset.victoryGame;
      host.setAttribute('aria-hidden', 'true');
    },
    show(game, success, options = {}) {
      if (success) {
        const state = getVictoryState?.();
        const hasState = state && typeof state === 'object';
        const seen = hasState ? celebratedStates.has(state) :
          host.dataset.outcome === 'win' && host.dataset.victoryGame === game;
        if (seen && host.dataset.outcome === 'win' && host.dataset.victoryGame === game) return;
        options = { ...options, animate: options.animate !== false && !seen };
        if (hasState) celebratedStates.add(state);
        host.dataset.victoryGame = game;
      }
      stop();
      const token = ++serial;
      host.dataset.state = 'result';
      host.dataset.outcome = success ? 'win' : 'loss';
      host.dataset.attempt = String(serial);
      host.innerHTML = resultMarkup(game, success, options);
      const retry = host.querySelector('[data-result-retry]');
      host.setAttribute('aria-hidden', retry ? 'false' : 'true');
      if (retry) {
        host.dataset.retry = 'true';
        retry.disabled = typeof onRetry !== 'function';
        retry.onclick = () => {
          if (token !== serial || retry.disabled) return;
          retry.disabled = true;
          onRetry();
        };
      } else delete host.dataset.retry;
      // A vitória anima somente a própria faixa: não amplia nem move o palco.
      if (success && game === 'desvio' && options.animate !== false) {
        void surface.offsetWidth;
        surface.classList.add('result-success');
        timer = clock.setTimeout(() => {
          if (token !== serial) return;
          surface.classList.remove('result-success');
          timer = null;
        }, 1100);
      } else if (!success) {
        // Força um novo ciclo CSS inclusive em confirmações muito próximas.
        void surface.offsetWidth;
        surface.classList.add('result-failure');
        timer = clock.setTimeout(() => {
          if (token !== serial) return;
          surface.classList.remove('result-failure');
          timer = null;
        }, 300);
      }
    },
    get serial() {
      return serial;
    },
  };
}

