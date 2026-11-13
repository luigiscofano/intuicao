/** Miniatura real reutilizada pelo catálogo comum dos jogos versus. */
export function estaloMapPreview(map) {
  const cells = map.board.map(pod => `<span class="${pod ? `estalo-mini-team-${pod.owner}` : "estalo-mini-gap"}">${pod ? `<i style="--direction:${pod.direction}" aria-hidden="true"></i>` : ""}</span>`).join("");
  return `<span class="estalo-map-mini" style="--map-cols:${map.columns};--map-rows:${map.rows}">${cells}</span>`;
}
