/** Move os depósitos existentes, sem duplicar placares, eventos ou dados.
 * O render do jogo continua sendo a fonte de verdade para cada atualização.
 */
export function arrangeVersusPlayers(surface, viewportWidth) {
  const area = surface.querySelector('.quinhao-area');
  if (!area) return;
  const sides = area.querySelector('.quinhao-side-deposits');
  const center = area.querySelector('.quinhao-center');
  if (!sides || !center) return;
  const destination = viewportWidth >= 1200 ? sides : center;
  const deposits = [...area.querySelectorAll('.quinhao-deposit')];
  for (const deposit of deposits) {
    if (deposit.parentElement === destination) continue;
    if (destination === center) center.insertBefore(deposit, center.querySelector('p'));
    else sides.append(deposit);
  }
}
