/** Estado visual derivado dos registros existentes; nunca grava nem migra progresso. */
export function levelCompletionState(completed, assisted = false) {
  if (!completed) return 'available';
  return assisted === true ? 'assisted' : 'independent';
}

export function completionCaption(state) {
  return state === 'assisted' ? '✓ assistido' : state === 'independent' ? '✓ concluído' : '';
}

/** Preserva o nome acessível da fase e não depende somente da distinção de cores. */
export function presentCompletionStates(root) {
  for (const tile of root.querySelectorAll('[data-completion-state]')) {
    const state = tile.dataset.completionState;
    const caption = completionCaption(state);
    if (!caption) continue;
    const small = tile.querySelector('small');
    if (small && small.textContent !== caption) small.textContent = caption;
    const label = tile.getAttribute('aria-label') || tile.textContent;
    const description = state === 'assisted' ? 'resolução assistida' : 'resolução sem assistência';
    if (!label.includes(description)) tile.setAttribute('aria-label', `${label}, ${description}`);
  }
}
