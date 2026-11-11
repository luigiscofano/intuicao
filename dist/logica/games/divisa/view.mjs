const C = { ink: '#30412F', action: '#39674A', ivory: '#F4EDDD', cream: '#FFFAF0', cell: '#F8FAF3', line: '#D5DECB', frame: '#B6C3A8', sage: '#E1EDCE', sageEdge: '#73965E', amber: '#F5E7B2', amberEdge: '#B99B46' };
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const text = (x, y, value, size = 20, extra = '') => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, sans-serif" font-size="${size}" fill="${C.ink}" ${extra}>${escape(value)}</text>`;

/** Fronteiras ocupam lados unitários reais; não há vãos entre territórios. */
export function renderBoard(level, state, { selectedTool = 'cycle' } = {}) {
  const width = 560, size = Math.min(88, 420 / level.cols);
  const x0 = (width - size * level.cols) / 2, y0 = 72;
  const gridHeight = size * level.rows, pairs = Object.entries(level.contacts);
  const pairRows = Math.ceil(pairs.length / 3), quotaY = y0 + gridHeight + 48;
  const height = quotaY + pairRows * 40 + 86;
  const id = `divisa-${String(level.id || 'board').replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const fills = [C.sage, C.amber, C.cell, C.cream];
  const pieces = [];
  pieces.push(`<svg class="divisa-board" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" role="group" aria-labelledby="${id}-title" aria-describedby="${id}-desc" data-tool="${escape(selectedTool)}">`);
  pieces.push(`<title id="${id}-title">Tabuleiro de DIVISA, ${level.rows} linhas e ${level.cols} colunas</title><desc id="${id}-desc">Atribua letras às casas. Pino significa pista fixa; tracejado mostra a última alteração. O painel conta lados unitários entre cada par de territórios. Diagonais e borda externa não contam.</desc>`);
  pieces.push(`<rect x="${x0 - 14}" y="${y0 - 14}" width="${size * level.cols + 28}" height="${gridHeight + 28}" rx="17" fill="#FFFFFF" stroke="${C.frame}" stroke-width="2"/>`);
  for (let col = 0; col < level.cols; col += 1) pieces.push(text(x0 + (col + .5) * size, y0 - 32, String.fromCharCode(65 + col), 20, 'font-weight="700"'));
  for (let row = 0; row < level.rows; row += 1) pieces.push(text(x0 - 32, y0 + (row + .5) * size, row + 1, 20, 'font-weight="700"'));
  // Fundos contínuos. As linhas finas são a malha, não uma fronteira lógica.
  state.cells.forEach((value, i) => {
    const x = x0 + (i % level.cols) * size, y = y0 + Math.floor(i / level.cols) * size;
    const color = value === null ? C.cell : fills[level.letters.indexOf(value) % fills.length];
    pieces.push(`<rect x="${x}" y="${y}" width="${size}" height="${size}" fill="${color}" stroke="${C.line}" stroke-width="1"/>`);
  });
  // Cada segmento ainda tem comprimento de exatamente uma casa.
  state.cells.forEach((value, i) => {
    if (value === null) return;
    const col = i % level.cols, row = Math.floor(i / level.cols), x = x0 + col * size, y = y0 + row * size;
    if (col + 1 < level.cols && state.cells[i + 1] !== null && value !== state.cells[i + 1]) pieces.push(`<path d="M${x + size} ${y}v${size}" fill="none" stroke="${C.action}" stroke-width="4"/>`);
    if (row + 1 < level.rows && state.cells[i + level.cols] !== null && value !== state.cells[i + level.cols]) pieces.push(`<path d="M${x} ${y + size}h${size}" fill="none" stroke="${C.action}" stroke-width="4"/>`);
  });
  state.cells.forEach((value, i) => {
    const x = x0 + (i % level.cols) * size, y = y0 + Math.floor(i / level.cols) * size, fixed = level.givens[i] !== null;
    const coord = `${String.fromCharCode(65 + i % level.cols)}${Math.floor(i / level.cols) + 1}`;
    const label = `${coord}, ${value === null ? 'indecidida' : `território ${value}`}${fixed ? ', pista fixa' : ''}`;
    pieces.push(`<g data-cell="${i}" role="button" tabindex="0" aria-label="${escape(label)}"${fixed ? ' aria-disabled="true"' : ''}>`);
    if (value !== null) {
      const piece = size * .52, px = x + (size - piece) / 2, py = y + (size - piece) / 2;
      const amber = value === 'B', edge = amber ? C.amberEdge : C.sageEdge;
      pieces.push(`<rect x="${px}" y="${py}" width="${piece}" height="${piece}" rx="7" fill="${amber ? C.amber : C.sage}" stroke="${edge}" stroke-width="1.5"/><rect x="${px + 4}" y="${py + 4}" width="${piece - 8}" height="${piece - 8}" rx="4" fill="${C.cream}" stroke="${edge}" stroke-width="1"/>`);
      pieces.push(text(x + size / 2, y + size / 2 + 1, value, 26, 'font-weight="700"'));
    } else pieces.push(text(x + size / 2, y + size / 2, '·', 24));
    if (fixed) pieces.push(`<circle cx="${x + size - 9}" cy="${y + 9}" r="3.5" fill="${C.ink}"/>`);
    if (state.lastChanged === i && !fixed) pieces.push(`<rect x="${x + 4}" y="${y + 4}" width="${size - 8}" height="${size - 8}" rx="5" fill="none" stroke="${C.amberEdge}" stroke-width="2.5" stroke-dasharray="5 3"/>`);
    pieces.push(`<rect class="divisa-hit" x="${x + 1}" y="${y + 1}" width="${size - 2}" height="${size - 2}" fill="none" stroke="none" stroke-width="3" pointer-events="all"/></g>`);
  });
  pairs.forEach(([pair, amount], i) => {
    const col = i % 3, row = Math.floor(i / 3), x = 58 + col * 152, y = quotaY + row * 40;
    pieces.push(`<rect x="${x}" y="${y - 15}" width="140" height="31" rx="7" fill="${C.cream}" stroke="${C.frame}"/>`);
    pieces.push(text(x + 70, y + 1, `${pair[0]}–${pair[1]} = ${amount}`, 20, 'font-weight="650"'));
  });
  const legendY = quotaY + pairRows * 40 + 13;
  pieces.push(text(width / 2, legendY, '• fixa   · indecidida   tracejado = última ação', 18));
  pieces.push(text(width / 2, legendY + 27, 'Cada lado compartilhado conta uma vez.', 18));
  pieces.push('</svg>');
  return pieces.join('');
}
