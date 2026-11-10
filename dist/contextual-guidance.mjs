/** Orientações curtas complementam as regras, sem alterar o estado do jogo. */
export const GAME_GUIDANCE = Object.freeze({
  light: 'Gire os espelhos pelas alças. Dispare uma fonte por vez ou use Confirmar todos para testar o conjunto.',
  cut: 'Ajuste a linha no tabuleiro e compare as áreas. Use Confirmar resposta para testar sua divisão.',
  elo: 'Observe as pistas e escolha a ferramenta antes de editar a grade. As regras explicam as restrições deste nível.',
  prumo: 'Observe a forma e seu apoio. Momentos exatos mostra a ajuda de equilíbrio, sem mudar sua resposta.',
  pacto: 'Complete a grade respeitando as pistas. Dicas e regras ajudam a interpretar as relações entre as casas.',
  sintonia: 'Um comando move vários personagens. Observe como paredes e caminhos afetam cada um antes de agir.',
  repasse: 'A ordem dos repasses faz diferença. Experimente uma ação de cada vez e acompanhe quem recebe.',
  orbita: 'Escolha o anel e o sentido do giro. Observe como cada movimento aproxima as peças dos alvos.',
  desvio: 'Observe o turno e prepare sua jogada. Confirme depois de conferir a posição escolhida.',
  broto: 'Selecione uma casa vazia para preparar o plantio. Confira a prévia e use Confirmar jogada.',
  cerco: 'Selecione uma peça e uma casa vizinha livre. Confira o destino antes de confirmar a jogada.'
});

export function guidanceForGame(game) {
  return Object.hasOwn(GAME_GUIDANCE, game) ? GAME_GUIDANCE[game] : null;
}

/** A orientação não grava preferências nem interfere nos handlers de cada motor. */
export function initContextualGuidance(doc = document, win = window) {
  const main = doc.getElementById('main');
  if (!main || !win.MutationObserver) return () => {};
  const acknowledged = new Set();
  let scheduled = false;

  function update() {
    scheduled = false;
    const game = new URL(win.location.href).searchParams.get('game');
    const message = guidanceForGame(game);
    if (!message) return;
    // Apenas a superfície visível recebe ajuda; biblioteca e seleções ficam livres.
    const surfaces = main.querySelectorAll('.collection-surface, .workspace > .experiment');
    const surface = [...surfaces].find(node => !node.closest('[hidden]'));
    if (!surface) return;
    const existing = (surface.closest('.approved-workspace') || surface).querySelector('.contextual-guidance');
    if (existing?.dataset.game === game) return;
    existing?.remove();

    const details = doc.createElement('details');
    details.className = 'contextual-guidance';
    details.dataset.game = game;
    details.open = !acknowledged.has(game);
    const summary = doc.createElement('summary');
    summary.textContent = 'Comece por aqui';
    const paragraph = doc.createElement('p');
    paragraph.textContent = message;
    const close = doc.createElement('button');
    close.type = 'button';
    close.textContent = 'Entendi';
    close.addEventListener('click', () => {
      acknowledged.add(game);
      details.open = false;
      summary.focus();
    });
    details.append(summary, paragraph, close);
    surface.prepend(details);
  }

  const observer = new win.MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    win.queueMicrotask(update);
  });
  observer.observe(main, {childList: true, subtree: true, attributes: true, attributeFilter: ['hidden']});
  update();
  return () => observer.disconnect();
}

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  initContextualGuidance();
}
