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
// Resumos visuais das mecânicas. Nenhum desenho consulta solução ou modifica a partida.
const CAMPAIGN_MOTIFS = Object.freeze({
  light: `
    <path class="cm-guide" d="M16 64H94V16"/>
    <path class="cm-trace cm-gold" pathLength="100" d="M16 64H94V16"/>
    <path d="M83 74L105 52"/>
    <circle class="cm-accent cm-settle" cx="94" cy="16" r="7"/>
  `,
  cut: `
    <path class="cm-paper" d="M20 16H100V68H20Z"/>
    <path class="cm-fill cm-reveal" d="M20 16H60V68H20Z"/>
    <path class="cm-trace" pathLength="100" d="M60 12V72"/>
  `,
  elo: `
    <path class="cm-guide" d="M25 20H95V64H25Z"/>
    <path class="cm-trace" pathLength="100" d="M25 20H95V64H25Z"/>
    <circle class="cm-accent" cx="25" cy="20" r="5"/>
    <circle class="cm-accent" cx="95" cy="64" r="5"/>
  `,
  prumo: `
    <path class="cm-guide" d="M12 71H108"/>
    <path class="cm-accent" d="M49 70L60 53L71 70Z"/>
    <g class="cm-balance">
    <path class="cm-fill" d="M24 24H50V14H70V24H96V42H24Z"/>
    <path class="cm-guide" d="M60 31V53"/>
    </g>
  `,
  pacto: `
    <g class="cm-settle">
    <circle class="cm-fill" cx="28" cy="25" r="10"/>
    <circle class="cm-fill" cx="53" cy="25" r="10"/>
    </g>
    <g class="cm-settle cm-delay">
    <path class="cm-accent" d="M70 46H88V64H70ZM93 46H111V64H93Z"/>
    </g>
    <path class="cm-guide" d="M16 42H110"/>
  `,
  sintonia: `
    <path class="cm-guide" d="M15 20H105M15 42H105M15 64H105"/>
    <g class="cm-together">
    <circle class="cm-fill" cx="91" cy="20" r="6"/>
    <circle class="cm-accent" cx="91" cy="42" r="6"/>
    <circle class="cm-blue-fill" cx="91" cy="64" r="6"/>
    </g>
    <path d="M104 12V72"/>
  `,
  repasse: `
    <path class="cm-guide" d="M21 42H99"/>
    <path class="cm-trace" pathLength="100" d="M21 42H99"/>
    <path class="cm-paper" d="M83 25H112V59H83Z"/>
    <circle class="cm-fill cm-transfer" cx="98" cy="42" r="7"/>
    <path class="cm-accent" d="M8 29H33V54H8Z"/>
  `,
  pulso: `
    <path class="cm-guide" d="M20 42H100"/>
    <circle class="cm-fill cm-beat" cx="25" cy="42" r="10"/>
    <circle class="cm-fill cm-beat cm-delay" cx="60" cy="42" r="10"/>
    <circle class="cm-fill cm-beat cm-delay-two" cx="95" cy="42" r="10"/>
    <path class="cm-gold" d="M25 62H60M60 62H95"/>
  `,
  foz: `
    <path class="cm-guide" d="M20 12V42H60V68H105M100 12V42H60"/>
    <path class="cm-trace" pathLength="100" d="M20 12V42H60V68H105"/>
    <path class="cm-trace cm-delay" pathLength="100" d="M100 12V42H60"/>
    <path class="cm-accent" d="M103 59L114 68L103 77Z"/>
  `,
  refugio: `
    <path class="cm-paper" d="M12 13H108V71H12Z"/>
    <path class="cm-trace" pathLength="100" d="M60 13V71"/>
    <path class="cm-fill cm-settle" d="M25 49Q20 25 42 26Q44 46 25 49Z"/>
    <path class="cm-accent cm-settle cm-delay" d="M79 49Q74 25 96 26Q98 46 79 49Z"/>
  `,
  mirante: `
    <path class="cm-guide" d="M22 14V68M22 42H105"/>
    <path class="cm-trace" pathLength="100" d="M22 14V42H80"/>
    <path class="cm-fill cm-reveal" d="M70 32H90V52H70Z"/>
    <path class="cm-accent" d="M12 7L22 17L32 7Z"/>
  `,
  renovo: `
    <path class="cm-guide" d="M20 59L59 42L95 23"/>
    <path class="cm-trace" pathLength="100" d="M20 59L59 42L95 23"/>
    <ellipse class="cm-fill" cx="20" cy="59" rx="10" ry="7"/>
    <path class="cm-accent" d="M59 32L69 42L59 52L49 42Z"/>
    <path class="cm-fill cm-settle cm-delay" d="M86 32Q78 10 108 11Q107 31 86 32Z"/>
  `,
});

export const CONTEXTUAL_VICTORY_GAMES = Object.freeze(Object.keys(CAMPAIGN_MOTIFS));
export function contextualVictoryMarkup(game, { animate = true } = {}) {
  const motif = CAMPAIGN_MOTIFS[game];
  if (!motif) return '';
  return `<svg class="campaign-motion campaign-motion-${game}${animate ? ' campaign-motion-animate' : ''}"
    viewBox="0 0 120 84" aria-hidden="true" focusable="false">${motif}</svg>`;
}

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
    pulso: 'Três batidas, intervalos iguais e cotas completas.',
    foz: 'Todos os caminhos chegaram à foz.',
    refugio: 'Cada região livre encontrou seu marco.',
    mirante: 'Os olhares revelaram todas as formas.',
    renovo: 'Cada semente encontrou seu botão e sua folha.',
  };
  const winner = Number.isInteger(options.winner) ? `✓ Jogador ${options.winner} venceu!` : 'Parabéns!';
  return `<div class="result-badge result-${game} result-win tile-victory${options.animate === false ? ' game-victory-static' : ''}" data-outcome="win">${contextualVictoryMarkup(game, { animate: options.animate !== false }) || celebrationMarkup({ animate: options.animate !== false })}<div><strong>${winner}</strong><span>${copy[game] ?? captions[game]?.[0] ?? 'Cada escolha encontrou seu lugar.'}</span></div></div>${retry}`;
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

