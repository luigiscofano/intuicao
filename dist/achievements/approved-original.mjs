// Evidências da rodada humana; nunca entram no histórico de edição.
export function originalMissionRound(saved, { fresh = false, resumed = false } = {}) {
  if (fresh || !resumed) return { confirmations: 0, assisted: false };
  if (saved && Number.isSafeInteger(saved.confirmations) && saved.confirmations >= 0 &&
      typeof saved.assisted === 'boolean')
    return { confirmations: saved.confirmations, assisted: saved.assisted };
  // Saves antigos não comprovam primeira confirmação nem ausência de gabarito.
  return { confirmations: 1, assisted: true };
}

export function confirmOriginalMissionRound(round) {
  round.confirmations = Math.min(Number.MAX_SAFE_INTEGER, round.confirmations + 1);
  return round.confirmations === 1;
}

export function evaluateApprovedOriginal({ gameId, official = false, humanConfirmed = false,
  assisted = false, success = false, firstConfirmation = false, ray, ratio, target } = {}) {
  if (!official || !humanConfirmed || assisted || !success) return [];
  if (gameId === 'light' && ray?.complete === true && ray.status === 'target' &&
      ray.rays?.some(r => r.status === 'target' && r.teleports?.length > 0 &&
        new Set((r.reflections ?? []).map(v => v.objectIndex).filter(Number.isInteger)).size >= 3))
    return ['light-light-jump'];
  if (gameId === 'cut' && firstConfirmation && Number.isFinite(ratio) && Number.isFinite(target) &&
      Math.abs(ratio * 100 - target) <= 0.5 + 1e-9)
    return ['cut-millimetric-eye'];
  return [];
}
