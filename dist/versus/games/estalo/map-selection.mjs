import { escapeHTML as esc } from "../../shared/markup.mjs";

/** A preparação mostra o contorno real, sem executar uma partida ou alterar o save. */
export function renderMapSelection(maps, selectedId) {
  const selected = maps.find(map => map.id === selectedId) ?? maps[0];
  const sizeKey = map => `${map.rows}x${map.columns}`;
  const sizes = [...new Map(maps.map(map => [sizeKey(map), map])).values()];
  const cards = maps.filter(map => sizeKey(map) === sizeKey(selected)).map(map => {
    const chosen = map.id === selected.id;
    const cells = map.board.map(pod => `<span class="${pod ? `estalo-mini-team-${pod.owner}` : "estalo-mini-gap"}"></span>`).join("");
    return `<button type="button" data-estalo-map="${esc(map.id)}" aria-pressed="${chosen}">
      <span class="estalo-map-mini" style="--map-cols:${map.columns};--map-rows:${map.rows}" aria-hidden="true">${cells}</span>
      <strong>${esc(map.name)}</strong>
      <small class="estalo-map-choice" aria-hidden="true">${chosen ? "✓ Selecionado" : "Escolher"}</small>
    </button>`;
  }).join("");
  return `<section class="estalo-map-setup" aria-labelledby="estalo-map-heading">
    <h3 id="estalo-map-heading">Escolha o mapa</h3>
    <span id="estalo-size-label">Tamanho do tabuleiro</span>
    <div class="estalo-map-sizes" role="group" aria-labelledby="estalo-size-label">${sizes.map(map => `<button type="button" data-estalo-size="${sizeKey(map)}" aria-pressed="${sizeKey(map) === sizeKey(selected)}">${map.rows} × ${map.columns}</button>`).join("")}</div>
    <div class="estalo-map-cards" role="group" aria-labelledby="estalo-map-heading">${cards}</div>
    <div class="estalo-map-description" aria-live="polite"><p><strong>${selected.rows} × ${selected.columns} · ${esc(selected.name)}</strong> — ${esc(selected.description)}</p>
      <small>${selected.targets[0]} vagens por equipe. Verde à esquerda, âmbar à direita; os recortes interrompem o pulso.</small></div>
    <p class="nv-small">Trocar o mapa prepara uma nova partida; não altera o duelo salvo.</p>
  </section>`;
}
