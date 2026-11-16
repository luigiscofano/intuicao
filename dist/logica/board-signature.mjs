/** Assinatura do Refúgio: decoração passiva, fora das casas e das pistas. */
export function renderTileSignature(x, y, size = 20) {
  return `<g aria-hidden="true" pointer-events="none" class="logic-tile-signature" transform="translate(${x} ${y}) scale(${size / 20})">
    <path d="M0 0H9Q9 9 0 9Z" fill="#39674A"/>
    <path d="M11 0H20V9Q11 9 11 0Z" fill="#B99B46"/>
    <path d="M0 11Q9 11 9 20H0Z" fill="#244b63"/>
    <path d="M11 11H20Q20 20 11 20Z" fill="#73965E"/>
  </g>`;
}

/** Versão para tabuleiros HTML: não entra na grade nem participa do seu tamanho. */
export function boardCornerMarkup() {
  return ['top-right', 'bottom-left'].map(corner =>
    `<svg class="logic-board-corner logic-board-corner--${corner}" viewBox="0 0 20 20" aria-hidden="true" focusable="false">${renderTileSignature(0, 0)}</svg>`
  ).join('');
}
