import { renderFruitArt } from "./fruit-art.mjs";

/** Miniatura da distribuição verdadeira, sem alterar a ordem dos 24 cestos. */
export function renderQuinhaoMapPreview(map) {
  return `<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">${map.fruits.map((fruit, index) => {
    const angle = -Math.PI / 2 + index * Math.PI / 12;
    const x = (60 + 49 * Math.cos(angle) - 7).toFixed(2);
    const y = (60 + 49 * Math.sin(angle) - 7).toFixed(2);
    const art = renderFruitArt(fruit).replace('class="quinhao-fruit"', 'class="quinhao-map-fruit"').replace('<svg ', `<svg x="${x}" y="${y}" width="14" height="14" `);
    return art;
  }).join("")}</svg>`;
}
