import { MIRANTE_COLORS as C, miranteShape, mirantePiece, miranteObserver } from './art.mjs';
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const text = (x, y, value, size = 17, weight = 500, color = C.ink) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(value)}</text>`;
const rect = (x, y, w, h, fill, stroke = 'none', radius = 0, thickness = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${thickness}"/>`;
const path = (d, color, thickness = 1.9) => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${thickness}" stroke-linecap="round" stroke-linejoin="round"/>`;
function arrow(x, y, direction) {
  const d = { right: `M${x - 9} ${y}h18m-5-5 5 5-5 5`, left: `M${x + 9} ${y}h-18m5-5-5 5 5 5`, down: `M${x} ${y - 9}v18m-5-5 5 5 5-5`, up: `M${x} ${y + 9}v-18m-5 5 5-5 5 5` };
  return path(d[direction], C.ink);
}
export function miranteGeometry(level) {
  const size = 60, step = 64, ox = 110, oy = 109;
  const boardWidth = level.cols * step - 4, boardHeight = level.rows * step - 4;
  const width = ox * 2 + boardWidth, height = oy + boardHeight + 195;
  return { size, step, ox, oy, boardWidth, boardHeight, width, height, minimumWidth: Math.max(330, Math.ceil(width * 44 / size)) };
}
export function renderBoard(level, state, { selectedTool = 'cycle' } = {}) {
  const { size, step, ox, oy, boardWidth, boardHeight, width, height, minimumWidth } = miranteGeometry(level);
  const content = [rect(0, 0, width, height, C.paper), rect(ox - 8, oy - 8, boardWidth + 16, boardHeight + 16, C.paper, '#74907a', 4, 1.4)];
  for (let col = 0; col < level.cols; col++) content.push(text(ox + col * step + size / 2, oy - 10, String.fromCharCode(65 + col)));
  for (let row = 0; row < level.rows; row++) content.push(text(ox - 17, oy + row * step + 37, row + 1));
  const positions = {
    left: lane => [36, oy + lane * step + 30, 71, oy + lane * step + 30, 'right'],
    right: lane => [width - 36, oy + lane * step + 30, width - 71, oy + lane * step + 30, 'left'],
    top: lane => [ox + lane * step + 30, 32, ox + lane * step + 30, 67, 'down'],
    bottom: lane => [ox + lane * step + 30, oy + boardHeight + 66, ox + lane * step + 30, oy + boardHeight + 29, 'up'],
  };
  const sideNames = { left: 'à esquerda', right: 'à direita', top: 'acima', bottom: 'abaixo' };
  for (const [side, observers] of Object.entries(level.observers)) observers.forEach((value, lane) => {
    if (value === null) return;
    const [x, y, ax, ay, direction] = positions[side](lane);
    const laneName = side === 'left' || side === 'right' ? `linha ${lane + 1}` : `coluna ${String.fromCharCode(65 + lane)}`;
    const label = `Observador fixo ${sideNames[side]}, ${laneName}: primeira peça ${value === 1 ? 'círculo' : 'triângulo'}`;
    content.push(`<g class="mirante-observer" role="img" aria-label="${label}"><title>${label}</title>${miranteObserver(value, x, y)}${arrow(ax, ay, direction)}</g>`);
  });
  state.cells.forEach((value, index) => {
    const row = Math.floor(index / level.cols), col = index % level.cols, x = ox + col * step, y = oy + row * step;
    const label = `${String.fromCharCode(65 + col)}${row + 1}: ${value === null ? 'indecisa' : value === 0 ? 'vazia' : value === 1 ? 'círculo' : 'triângulo'}`;
    const symbol = value > 0 ? mirantePiece(value, x + 30, y + 30)
      : value === 0 ? path(`M${x + 22} ${y + 22}l16 16m0-16l-16 16`, C.blue, 2.5)
        : `<circle cx="${x + 30}" cy="${y + 30}" r="2" fill="#96a691"/>`;
    content.push(`<g class="mirante-cell" data-cell="${index}" data-tool="${esc(selectedTool)}" role="button" tabindex="0" aria-label="${label}"><title>${label}</title>${rect(x, y, size, size, (row + col) % 2 ? C.paper : '#edf0e5', '#c8d2c5', 2)}${symbol}</g>`);
  });
  content.push(`<g aria-hidden="true" pointer-events="none"><image href="platform-assets/tiles/blue-br.png" x="10" y="4" width="24" height="24"/><image href="platform-assets/tiles/gold-tl.png" x="${width - 30}" y="${oy + boardHeight + 81}" width="24" height="24"/></g>`);
  const center = width / 2, stockY = oy + boardHeight + 135;
  content.push(rect(center - 161, stockY - 19, 322, 38, C.paper, '#bcc9b4', 9, 1.3), text(center - 105, stockY + 6, 'Estoque'));
  content.push(miranteShape(1, center - 26, stockY, 12, 'none', C.blue, 2.3), text(center + 13, stockY + 6, `× ${level.inventory.circle}`, 17, 650));
  content.push(miranteShape(2, center + 76, stockY, 12, 'none', C.green, 2.3), text(center + 115, stockY + 6, `× ${level.inventory.triangle}`, 17, 650));
  content.push(text(center, stockY + 41, '× vazia · ponto = indecisa', 14, 400), text(center, stockY + 59, 'Pino = observador fixo', 13, 400, '#667366'));
  return `<div class="mirante-board-wrap"><p class="mirante-control-help">Botão direito: × vazio · esquerdo: ferramenta selecionada.</p><svg class="mirante-board" style="--mirante-min-width:${minimumWidth}px" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 ${width} ${height}" role="group" aria-label="MIRANTE, ${level.rows} linhas por ${level.cols} colunas. Cada peça precisa de duas testemunhas.">${content.join('')}</svg></div>`;
}
