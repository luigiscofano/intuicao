// Opção A: arte de apresentação. O chamador continua decidindo vitória e vencedor.
export function victoryTilesMarkup({ animate = true } = {}) {
  const tiles = [
    ['blue', 14, 14, 0], ['gold', 41, 14, 180],
    ['green', 14, 41, 0], ['gold', 41, 41, 180],
  ].map(([color, x, y, rotation], index) =>
    `<g class="victory-tile victory-tile-${index}"><image class="victory-tile-${color}" href="platform-assets/tiles/${color}-tl.png" width="25" height="25" transform="translate(${x} ${y}) rotate(${rotation} 12.5 12.5)"/></g>`,
  ).join('');
  const dots = [[8,20], [40,5], [72,20], [73,60], [40,75], [7,60]]
    .map(([cx, cy], index) => `<circle class="victory-dot victory-dot-${index}" cx="${cx}" cy="${cy}" r="2"/>`).join('');
  return `<svg class="victory-tiles ${animate ? 'victory-tiles-animate' : 'victory-tiles-static'}" viewBox="0 0 80 80" aria-hidden="true" focusable="false">${tiles}${dots}</svg>`;
}

