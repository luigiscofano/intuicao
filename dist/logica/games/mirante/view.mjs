const INK = '#30412F', GREEN = '#39674A';
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const text = (x, y, value, size = 19, weight = 500) => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-family="system-ui,sans-serif" font-size="${size}" font-weight="${weight}" fill="${INK}">${esc(value)}</text>`;
const rect = (x, y, w, h, fill, stroke, radius = 9) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>`;
function shape(value, x, y, size) {
  return value === 1 ? `<circle cx="${x}" cy="${y}" r="${size * .42}" fill="none" stroke="${INK}" stroke-width="2.5"/>`
    : `<path d="M${x},${y - size * .48}l${size * .47},${size * .85}h-${size * .94}Z" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
}
function token(value, x, y, size, fixed = false) {
  return rect(x - size / 2, y - size / 2, size, size, fixed ? '#F5E7B2' : '#E1EDCE', fixed ? '#B99B46' : '#73965E', 9)
    + rect(x - size / 2 + 4, y - size / 2 + 4, size - 8, size - 8, '#FFFAF0', fixed ? '#B99B46' : '#73965E', 6)
    + shape(value, x, y, size * .54)
    + (fixed ? `<circle cx="${x + size / 2 - 5}" cy="${y - size / 2 + 5}" r="2.5" fill="${INK}"/>` : '');
}

export function renderBoard(level, state, { selectedTool = 'cycle' } = {}) {
  const size = 60, step = 64, ox = 108, oy = 108;
  const width = ox * 2 + level.cols * step - 4, boardHeight = level.rows * step - 4, height = oy + boardHeight + 160;
  const content = [`<rect width="${width}" height="${height + 31}" fill="#FFFAF0"/>`, rect(ox - 7, oy - 7, level.cols * step + 10, level.rows * step + 10, '#FFFFFF', '#B6C3A8', 17)];
  for (let col = 0; col < level.cols; col++) content.push(text(ox + col * step + size / 2, oy - 18, String.fromCharCode(65 + col)));
  for (let row = 0; row < level.rows; row++) content.push(text(ox - 14, oy + row * step + size / 2, row + 1));
  const positions = {
    left: lane => [36, oy + lane * step + size / 2, '→', 70, oy + lane * step + size / 2],
    right: lane => [width - 40, oy + lane * step + size / 2, '←', width - 77, oy + lane * step + size / 2],
    top: lane => [ox + lane * step + size / 2, 34, '↓', ox + lane * step + size / 2, 70],
    bottom: lane => [ox + lane * step + size / 2, oy + boardHeight + 69, '↑', ox + lane * step + size / 2, oy + boardHeight + 32],
  };
  const sideNames = { left: 'à esquerda', right: 'à direita', top: 'acima', bottom: 'abaixo' };
  for (const [side, observers] of Object.entries(level.observers)) observers.forEach((value, lane) => {
    if (value === null) return;
    const [x, y, arrow, ax, ay] = positions[side](lane);
    const laneName = side === 'left' || side === 'right' ? `linha ${lane + 1}` : `coluna ${String.fromCharCode(65 + lane)}`;
    const label = `Observador fixo ${sideNames[side]}, ${laneName}: primeira peça ${value === 1 ? 'círculo' : 'triângulo'}`;
    content.push(`<g role="img" aria-label="${label}"><title>${label}</title>${token(value, x, y, 42, true)}${text(ax, ay, arrow, 25, 650)}</g>`);
  });
  state.cells.forEach((value, index) => {
    const row = Math.floor(index / level.cols), col = index % level.cols, x = ox + col * step, y = oy + row * step;
    const label = `${String.fromCharCode(65 + col)}${row + 1}: ${value === null ? 'indecisa' : value === 0 ? 'vazia' : value === 1 ? 'círculo' : 'triângulo'}`;
    const symbol = value > 0 ? token(value, x + size / 2, y + size / 2, size - 10)
      : value === 0 ? `<path d="M${x + 21},${y + 21}l18,18m0,-18l-18,18" stroke="#68775E" stroke-width="2.2" stroke-linecap="round"/>`
        : `<circle cx="${x + size / 2}" cy="${y + size / 2}" r="1.8" fill="#B6C3A8"/>`;
    content.push(`<g class="mirante-cell" data-cell="${index}" data-tool="${esc(selectedTool)}" role="button" tabindex="0" aria-label="${label}"><title>${label}</title>${rect(x, y, size, size, '#F8FAF3', '#D5DECB')}${symbol}</g>`);
  });
  const center = width / 2, stockY = height - 35;
  content.push(rect(center - 163, stockY - 20, 326, 40, '#FFFFFF', '#B6C3A8', 10), text(center - 110, stockY, 'Estoque', 18));
  content.push(shape(1, center - 37, stockY, 24), text(center + 5, stockY, `× ${level.inventory.circle}`, 20));
  content.push(shape(2, center + 69, stockY, 24), text(center + 116, stockY, `× ${level.inventory.triangle}`, 20));
  content.push(text(center, height - 5, '× vazia · ponto = indecisa', 17), text(center, height + 18, 'Pino = observador fixo', 17));
  return `<div class="mirante-board-wrap"><svg class="mirante-board" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 ${width} ${height + 31}" role="group" aria-label="MIRANTE, ${level.rows} linhas por ${level.cols} colunas. Cada peça precisa de duas testemunhas.">${content.join('')}</svg></div>`;
}
