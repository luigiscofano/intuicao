

export function nextLevelControlId(game) {
  if (game === 'light' || game === 'cut') return 'level-next';
  if (['pulso', 'foz', 'refugio', 'mirante', 'renovo'].includes(game)) return 'lg-next';
  return game === 'sintonia' ? 's-level-next' : game === 'repasse' ? 'r-level-next'
    : ['elo', 'prumo', 'pacto'].includes(game) ? 'c-level-next' : null;
}

/** Reutiliza a navegação nativa: não calcula fases, grava progresso nem cria níveis. */
export function showNextLevelAction(surface, game) {
  const noop = () => {};
  if (!nextLevelControlId(game)) return noop;
  const doc = surface.ownerDocument;
  const panel = surface.closest?.('.approved-workspace')?.querySelector('.action-sidebar');
  const next = doc?.getElementById?.(nextLevelControlId(game));
  const available = () => next?.isConnected && !next.hidden && !next.disabled && !next.closest?.('[hidden]');
  if (!panel || !available()) return noop;
  const button = doc.createElement('button');
  button.type = 'button';
  button.className = 'level-victory-next';
  button.textContent = 'Próximo nível →';
  button.setAttribute('aria-label', 'Próximo nível');
  panel.append(button);
  panel.classList.add('has-victory-next');
  let used = false;
  const cleanup = () => { button.remove(); panel.classList.remove('has-victory-next'); };
  button.onclick = () => {
    if (used || !available()) { cleanup(); return; }
    used = true;
    button.disabled = true;
    cleanup();
    next.click();
  };
  // Não rouba foco: Tab alcança a ação; o navegador do jogo foca a nova fase.
  return cleanup;
}
