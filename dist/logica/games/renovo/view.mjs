import { initialState, isStateValid } from './engine.mjs';
import { COLORS as C, pieceSymbol as symbol } from './art.mjs';
import { boardGeometry, cellCenter } from './geometry.mjs';
const safe = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const label = (index, width) => `${String.fromCharCode(65 + index % width)}${Math.floor(index / width) + 1}`;
const text = (x, y, value, size = 20) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-family="system-ui,sans-serif" fill="${C.ink}">${safe(value)}</text>`;
const rect = (x, y, w, h, fill, stroke, radius = 2, extra = '', strokeWidth = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" ${extra}/>`;
export function renderBoard(level, current, { selectedTool = 'select' } = {}) {
  const state = isStateValid(level, current) ? current : initialState();
  const {size, step, x0, y0, bw, bh, width, height} = boardGeometry(level);
  const position = (i) => cellCenter(level, i);
  const parts = [`<title>RENOVO. Arraste da semente ou folha até o botão, ou selecione duas peças para ligar.</title>`, rect(x0 - 13, y0 - 13, bw + 26, bh + 26, C.paper, C.blue, 2, '', 1.4)];
  for (let row = 0; row < level.height; row += 1) {
    parts.push(text(27, y0 + row * step + size / 2 + 6, row + 1, 17));
    for (let col = 0; col < level.width; col += 1) {
      parts.push(rect(x0 + col * step, y0 + row * step, size, size, C.cell, C.edge));
      if (!Object.hasOwn(level.pieces, row * level.width + col)) parts.push(`<circle cx="${x0 + col * step + size / 2}" cy="${y0 + row * step + size / 2}" r="1.8" fill="#a4b39d"/>`);
    }
  }
  for (let col = 0; col < level.width; col += 1) parts.push(text(x0 + col * step + size / 2, 29, String.fromCharCode(65 + col), 17));
  for (const [a, b] of state.links) { const [ax, ay] = position(a); const [bx, by] = position(b); parts.push(`<path d="M${ax},${ay} L${bx},${by}" fill="none" stroke="${C.green}" stroke-width="7" stroke-linecap="round"/>`); }
  parts.push(`<g class="renovo-gesture-preview" pointer-events="none" aria-hidden="true"></g>`);
  for (const [key, kind] of Object.entries(level.pieces)) {
    const index = Number(key); const [x, y] = position(index); const selected = index === state.selected; const name = { S: 'semente', B: 'botão', F: 'folha' }[kind];
    const degree = state.links.filter((edge) => edge.includes(index)).length;
    const aria = `${label(index, level.width)}, ${name} ${kind === 'B' ? 'fixo' : 'fixa'}, ${degree} ${degree === 1 ? 'ligação' : 'ligações'}.${selected ? ' Peça selecionada; escolha a outra.' : selectedTool === 'clear' ? ' Clique para limpar suas ligações.' : ' Clique para selecionar.'}`;
    const border = kind === 'B' ? C.gold : kind === 'F' ? C.blue : C.green;
    parts.push(`<g data-cell="${index}" role="button" tabindex="0" aria-pressed="${selected}" aria-label="${safe(aria)}">`, rect(x - 27, y - 27, 54, 54, C.paper, border, 2, '', 1.2), symbol(kind, x, y));
    if (selected) parts.push(rect(x - 31, y - 31, 62, 62, 'none', C.blue, 2, 'stroke-dasharray="4 5"'));
    parts.push(rect(x - size / 2 + 1, y - size / 2 + 1, size - 2, size - 2, 'none', 'none', 9, 'class="renovo-focus" pointer-events="all"'), '</g>');
  }
  const legendY = bh + 98;
  parts.push(symbol('S', width * .17, legendY, 13), text(width * .17 + 43, legendY + 5, 'semente', 13), symbol('B', width * .462, legendY, 13), text(width * .462 + 36, legendY + 5, 'botão', 13), symbol('F', width * .714, legendY, 13), text(width * .714 + 40, legendY + 5, 'folha', 13));
  parts.push(text(width / 2, height - 21, state.selected === null ? 'Arraste para ligar · ou clique em duas peças' : `Selecionada: ${label(state.selected, level.width)} · escolha a outra peça`, 13));
  return `<div class="renovo-board${level.width > 8 ? ' renovo-board--very-wide' : level.width > 6 ? ' renovo-board--wide' : ''}"><svg xmlns="http://www.w3.org/2000/svg" class="renovo-svg" data-renovo-svg width="100%" viewBox="0 0 ${width} ${height}" role="group" aria-label="Tabuleiro RENOVO de ${level.width} colunas e ${level.height} linhas">${parts.join('')}</svg></div>`;
}
