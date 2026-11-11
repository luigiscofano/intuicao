const INK = '#30412F', GREEN = '#39674A';
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const text = (x, y, value, size = 19, weight = 500) => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" font-family="system-ui,sans-serif" font-size="${size}" font-weight="${weight}" fill="${INK}">${esc(value)}</text>`;
const rect = (x, y, w, h, fill, stroke, radius = 9, strokeWidth = 1.4) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>`;
function piece(x, y, size) {
  return rect(x + 5, y + 5, size - 10, size - 10, '#E1EDCE', '#73965E', 9)
    + rect(x + 9, y + 9, size - 18, size - 18, '#FFFAF0', '#73965E', 6)
    + `<circle cx="${x + size / 2}" cy="${y + size / 2}" r="${size * .22}" fill="${GREEN}"/>`;
}

export function renderBoard(level, state, { selectedTool = 'cycle' } = {}) {
  const size = 52, step = 56, ox = 44, oy = 100;
  const width = ox + level.cols * step + 20, height = oy + level.rows * step + 74;
  const content = [`<rect width="${width}" height="${height}" fill="#FFFAF0"/>`];
  for (let col = 0; col < level.cols; col++) {
    const x = ox + col * step, count = state.cells.filter((v, i) => i % level.cols === col && v === 1).length;
    content.push(`<g role="img" aria-label="Coluna ${String.fromCharCode(65 + col)}: cota ${level.quotas[col]}, ${count} batidas colocadas">${text(x + size / 2, 24, String.fromCharCode(65 + col))}${rect(x + 3, 42, size - 6, 44, '#E1EDCE', '#73965E', 9)}${rect(x + 7, 46, size - 14, 36, '#FFFAF0', '#73965E', 6)}${text(x + size / 2, 64, level.quotas[col], 25, 650)}<circle cx="${x + size - 7}" cy="48" r="2.7" fill="${INK}"/></g>`);
  }
  content.push(rect(ox - 7, oy - 7, level.cols * step + 10, level.rows * step + 10, '#FFFFFF', '#B6C3A8', 17));
  for (let row = 0; row < level.rows; row++) content.push(text(21, oy + row * step + size / 2, row + 1));
  for (let index = 0; index < state.cells.length; index++) {
    const row = Math.floor(index / level.cols), col = index % level.cols, x = ox + col * step, y = oy + row * step;
    const value = state.cells[index], fixed = Object.hasOwn(level.givens, index);
    const label = `${String.fromCharCode(65 + col)}${row + 1}: ${value === null ? 'indecisa' : value ? 'batida' : 'vazia'}${fixed ? ', pista fixa' : ''}`;
    const action = fixed ? 'role="img"' : `data-cell="${index}" data-tool="${esc(selectedTool)}" role="button" tabindex="0"`;
    let symbol = value === 1 ? piece(x, y, size) : value === 0
      ? `<path d="M${x + 17},${y + 17}l18,18m0,-18l-18,18" fill="none" stroke="#68775E" stroke-width="2.2" stroke-linecap="round"/>`
      : `<circle cx="${x + size / 2}" cy="${y + size / 2}" r="1.8" fill="#B6C3A8"/>`;
    if (fixed) symbol += `<circle cx="${x + size - 6}" cy="${y + 6}" r="3" fill="${INK}"/>`;
    content.push(`<g class="pulso-cell" ${action} aria-label="${esc(label)}"><title>${esc(label)}</title>${rect(x, y, size, size, '#F8FAF3', '#D5DECB')}${symbol}</g>`);
  }
  content.push(text(width / 2, height - 37, '● batida · × vazia · ponto = indecisa', 18), text(width / 2, height - 13, 'Pino = pista fixa', 17));
  return `<div class="pulso-board-wrap"><svg class="pulso-board pulso-cols-${level.cols}" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 ${width} ${height}" role="group" aria-label="PULSO, ${level.rows} linhas por ${level.cols} colunas. Três batidas igualmente espaçadas em cada linha.">${content.join('')}</svg></div>`;
}
