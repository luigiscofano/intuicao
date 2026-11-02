// Ajuste visual do resultado dos duelos conforme o espaço disponível.
// Reequilibra apenas a apresentação; não lê nem modifica a partida.
export function createDuelResultLayout(host, prefix) {
  let replacement = null,
    motion = null,
    reveal = null;
  const group = () => host.querySelector(`.${prefix}-duel-layout`);
  const column = () => host.querySelector(`.${prefix}-play-column`);
  const anchor = () => host.querySelector(`.${prefix}-board-wrap`);
  const snapshot = () => {
    const g = group(),
      board = anchor();
    return g && board
      ? {
          left: board.getBoundingClientRect().left,
          result: g.classList.contains('has-duel-result'),
        }
      : null;
  };
  function cancel() {
    motion?.cancel();
    reveal?.cancel();
    motion = null;
    reveal = null;
  }
  globalThis.addEventListener?.('resize', cancel);
  globalThis.matchMedia?.('(prefers-reduced-motion: reduce)')?.addEventListener?.('change', cancel);
  return {
    beforeReplace() {
      replacement = snapshot() || { initial: true };
      cancel();
    },
    cancel() {
      cancel();
      replacement = null;
    },
    update(result) {
      const before = replacement || snapshot();
      replacement = null;
      cancel();
      const g = group(),
        c = column();
      if (!g || !c) return;
      g.classList.toggle('has-duel-result', !!result);
      const reduced = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (!before || before.initial || before.result === !!result || reduced || host.hidden) return;
      const board = anchor();
      if (!board) return;
      const dx = before.left - board.getBoundingClientRect().left;
      if (Math.abs(dx) < 0.5 || typeof c.animate !== 'function') return;
      motion = c.animate([{ transform: `translateX(${dx}px)` }, { transform: 'translateX(0)' }], {
        duration: 360,
        easing: 'cubic-bezier(.22,.7,.2,1)',
      });
      // O painel só aparece depois que o tabuleiro libera seu espaço à direita.
      const panel = host.querySelector(`#${prefix}-result`);
      if (result && !before.result && typeof panel?.animate === 'function') {
        reveal = panel.animate(
          [
            { opacity: 0, offset: 0 },
            { opacity: 0, offset: 0.55 },
            { opacity: 1, offset: 1 },
          ],
          { duration: 360, easing: 'ease-out' },
        );
        const showing = reveal;
        showing.onfinish = () => {
          if (reveal === showing) reveal = null;
        };
      }
      const current = motion;
      current.onfinish = () => {
        if (motion === current) motion = null;
      };
    },
  };
}
