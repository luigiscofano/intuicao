/** Arte aprovada: peças C1 e observadores amarelo-claro C3. Sem estado de jogo. */
export const MIRANTE_COLORS = Object.freeze({ ink: '#30412f', green: '#39654c', blue: '#244b63', gold: '#cca034', paper: '#fffaf0', goldwash: '#f2e4ba' });
const C = MIRANTE_COLORS;
const rect = (x, y, w, h, fill, stroke = 'none', radius = 0, width = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"/>`;
export function miranteShape(value, x, y, radius, fill = 'none', color = C.ink, width = 2.5) {
  return value === 1
    ? `<circle cx="${x}" cy="${y}" r="${radius * .83}" fill="${fill}" stroke="${color}" stroke-width="${width}"/>`
    : `<path d="M${x} ${y - radius}L${x + radius} ${y + radius * .75}H${x - radius}Z" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linejoin="round"/>`;
}
export function mirantePiece(value, x, y, size = 48) {
  const color = value === 1 ? C.blue : C.green;
  return miranteShape(value, x, y, size * .37, color, color, 2)
    + (value === 1 ? `<circle cx="${x}" cy="${y}" r="${size * .13}" fill="${C.paper}"/>`
      : miranteShape(2, x, y + 1, size * .14, C.paper, C.paper, 0));
}
export function miranteObserver(value, x, y, size = 42) {
  return rect(x - size / 2, y - size / 2, size, size, C.goldwash, C.gold, 9, 2)
    + rect(x - size * .35, y - size * .35, size * .70, size * .70, C.paper, 'none', 5)
    + miranteShape(value, x, y + 1, size * .21, 'none', C.ink, 2.3)
    + `<circle cx="${x + size * .38}" cy="${y - size * .38}" r="2.6" fill="${C.ink}"/>`;
}
