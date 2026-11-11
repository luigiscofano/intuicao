/** Apresentação dos onze duelos. O motor e o chamador fornecem o resultado real. */
import { VERSUS_VICTORY_IDS, versusVictoryMotif } from './versus-victory-art.mjs';
import { VERSUS_FRONT_CROPS } from './versus-mascot-art.mjs';
import { prefersReducedUIMotion } from './ui-motion.mjs';

const esc = value => String(value ?? '').replace(/[&<>"']/g,
  c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
const running = new WeakMap();
const celebrated = new WeakSet();
export const VERSUS_VICTORY_DURATION = 1200;

/** Descarta somente a animação visual, sem acesso a estado, histórico ou saves. */
export function stopVersusVictory(host) {
  running.get(host)?.();
}

export function renderVersusVictory(host, {
  game = 'desvio', winnerName = '', owner = 0, draw = false, lost = false,
  animate = false, mode = 'local', context = '', reason = '', mascot = null,
  resultKey = null,
} = {}) {
  if (!host) return;
  stopVersusVictory(host);
  if (!VERSUS_VICTORY_IDS.includes(game)) return;
  const player = owner === 1 ? 1 : 0;
  const validMascot = Object.hasOwn(VERSUS_FRONT_CROPS, mascot) ? mascot : null;
  const doc = host.ownerDocument;
  const win = doc?.defaultView;
  const key = resultKey && typeof resultKey === 'object' ? resultKey : null;
  const fresh = Boolean(animate && (!key || !celebrated.has(key)));
  // Consumir também em movimento reduzido impede festa tardia ao mudar a preferência.
  if (fresh && key) celebrated.add(key);
  const moving = fresh && mode !== 'training' && !prefersReducedUIMotion(doc, win) &&
    Boolean(win?.requestAnimationFrame && host.querySelector);
  const label = draw ? 'Empate' : `${winnerName} venceu`;
  const subtitle = context || (draw ? 'Nenhum vencedor.' : mode === 'bot'
    ? player === 0 ? 'Você · contra o computador' : 'Computador · adversário'
    : 'Partida entre duas pessoas');
  const art = time => versusVictoryMotif(game, time, player, false, draw, validMascot);
  const finalArt = art(2);
  host.innerHTML = `<section class="versus-victory vv-game-${game} vv-owner-${player} ${draw ? 'vv-draw' : lost ? 'vv-loss' : 'vv-win'} ${moving ? 'vv-animate' : 'vv-static'}" role="status" aria-label="${esc(label)}">
    <div class="vv-emblem" aria-hidden="true">${moving ? art(0) : finalArt}</div>
    <div class="vv-copy"><span class="vv-kicker">${draw ? 'RESULTADO DO DUELO' : 'VENCEDOR DO DUELO'}</span>
      <strong class="vv-winner">${draw ? '' : `<span class="vv-player-mark" aria-hidden="true">${player === 0 ? '●' : '◆'}</span> `}${esc(label)}</strong>
      <span class="vv-caption">${esc(subtitle)}</span>${reason ? `<span class="vv-reason">${esc(reason)}</span>` : ''}
    </div></section>`;
  if (!moving) return;
  const emblem = host.querySelector('.vv-emblem');
  const section = host.querySelector('.versus-victory');
  if (!emblem || !section) return;
  let frame = null;
  let cancelled = false;
  let previousTick = -1;
  const start = win.performance.now();
  const finish = () => {
    if (cancelled) return;
    cancelled = true;
    if (frame !== null) win.cancelAnimationFrame(frame);
    // Um redraw mais novo não pode ser alterado por um quadro da apresentação antiga.
    if (section.parentNode === host) {
      emblem.innerHTML = finalArt;
      section.classList.remove('vv-animate');
      section.classList.add('vv-static');
    }
    running.delete(host);
  };
  running.set(host, finish);
  const step = now => {
    if (cancelled) return;
    const elapsed = Math.max(0, now - start);
    if (!emblem.isConnected || section.parentNode !== host || doc.hidden ||
        host.closest('[hidden]') || prefersReducedUIMotion(doc, win) || elapsed >= VERSUS_VICTORY_DURATION) {
      finish(); return;
    }
    // Mesma cadência dos vídeos aprovados, sem manter um ciclo após o gesto.
    const tick = Math.floor(elapsed * 24 / 1000);
    if (tick !== previousTick) { emblem.innerHTML = art(tick / 24); previousTick = tick; }
    frame = win.requestAnimationFrame(step);
  };
  frame = win.requestAnimationFrame(step);
}
