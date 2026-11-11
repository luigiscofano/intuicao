import { initialState, isStateValid } from './engine.mjs';
const C = { ink: '#30412F', green: '#39674A', cream: '#FFFAF0', white: '#FFFFFF', cell: '#F8FAF3', edge: '#D5DECB', frame: '#B6C3A8', sage: '#E1EDCE', sageEdge: '#73965E', amber: '#F5E7B2', amberEdge: '#B99B46' };
const safe = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const label = (index, width) => `${String.fromCharCode(65 + index % width)}${Math.floor(index / width) + 1}`;
// O estilo explícito preserva números claros contra o seletor global legado `svg text`.
const text = (x, y, value, size = 22, color = C.ink) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-family="system-ui,sans-serif" fill="${color}" style="fill:${color}">${safe(value)}</text>`;
const rect = (x, y, w, h, fill, stroke, radius = 9, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="1.4" ${extra}/>`;

export function renderBoard(level, current, { selectedTool = 'cycle' } = {}) {
  const state = isStateValid(level, current) ? current : initialState(level);
  const size = 108; const gap = 4; const step = size + gap; const x0 = 62; const y0 = 50;
  const bw = level.width * step - gap; const bh = level.height * step - gap;
  const width = bw + 112; const height = bh + 102;
  const pos = (i) => [x0 + (i % level.width) * step + size / 2, y0 + Math.floor(i / level.width) * step + size / 2];
  const parts = [`<title>FOZ. Oriente cada ponto até a foz zero. Ferramenta: ${safe(selectedTool)}.</title>`, rect(x0 - 7, y0 - 7, bw + 14, bh + 14, C.white, C.frame, 17)];
  for (let row = 0; row < level.height; row += 1) {
    parts.push(text(32, y0 + row * step + size / 2 + 8, row + 1, 20));
    for (let col = 0; col < level.width; col += 1) parts.push(rect(x0 + col * step, y0 + row * step, size, size, C.cell, C.edge));
  }
  for (let col = 0; col < level.width; col += 1) parts.push(text(x0 + col * step + size / 2, 28, String.fromCharCode(65 + col), 20));
  for (const [a, b] of level.channels) { const [ax, ay] = pos(a); const [bx, by] = pos(b); parts.push(`<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="${C.frame}" stroke-width="3"/>`); }
  state.arrows.forEach((target, source) => {
    if (target === -1) return;
    const [ax, ay] = pos(source); const [bx, by] = pos(target); const length = Math.hypot(bx - ax, by - ay);
    const dx = (bx - ax) / length; const dy = (by - ay) / length; const px = -dy; const py = dx;
    const endX = bx - dx * 36; const endY = by - dy * 36;
    parts.push(`<path d="M${ax + dx * 34},${ay + dy * 34} L${endX - dx * 8},${endY - dy * 8}" fill="none" stroke="${C.green}" stroke-width="5.5" stroke-linecap="round"/><path d="M${endX},${endY} L${endX - dx * 13 + px * 8},${endY - dy * 13 + py * 8} L${endX - dx * 13 - px * 8},${endY - dy * 13 - py * 8} Z" fill="${C.green}"/>`);
  });
  state.arrows.forEach((target, index) => {
    const [x, y] = pos(index); const root = index === level.root; const hasClue = Object.hasOwn(level.clues, index); const tone = root ? C.amber : hasClue ? C.sage : C.cell; const border = root ? C.amberEdge : hasClue ? C.sageEdge : C.frame;
    const aria = root ? `${label(index, level.width)}, foz zero, fixa.` : `${label(index, level.width)}${hasClue ? `, pista fixa de ${level.clues[index]} ${level.clues[index] === 1 ? 'trecho' : 'trechos'}` : ', sem pista numérica'}. ${target === -1 ? 'Sem seta.' : `Seta para ${label(target, level.width)}.`}`;
    parts.push(`<g data-cell="${index}" role="button" tabindex="${root ? '-1' : '0'}" aria-label="${safe(aria)}" aria-disabled="${root}" aria-pressed="${!root && target !== -1}">`);
    parts.push(rect(x - 29, y - 29, 58, 58, tone, border), rect(x - 25, y - 25, 50, 50, C.cream, border, 6));
    if (hasClue || root) parts.push(`<circle cx="${x + 22}" cy="${y - 22}" r="3" fill="${C.ink}" stroke="${C.cream}"/>`);
    parts.push(`<circle cx="${x}" cy="${y}" r="${hasClue && !root ? 20 : root ? 21 : 16}" fill="${hasClue && !root ? C.green : C.cream}" stroke="${C.ink}" stroke-width="2.2"/>`);
    if (root) parts.push(`<circle cx="${x}" cy="${y}" r="16" fill="none" stroke="${C.ink}"/>`, text(x, y + 8, 0, 23));
    else if (hasClue) parts.push(text(x, y + 8, level.clues[index], 24, C.cream));
    parts.push(rect(x - size / 2 + 2, y - size / 2 + 2, size - 4, size - 4, 'none', 'none', 9, 'class="foz-focus" pointer-events="all"'), '</g>');
  });
  parts.push(text(width / 2, height - 14, 'Pino = pista fixa · 0 = foz', 18));
  return `<div class="foz-board${level.width > 3 ? ' foz-board--wide' : ''}"><svg xmlns="http://www.w3.org/2000/svg" class="foz-svg" width="100%" viewBox="0 0 ${width} ${height}" role="group" aria-label="Tabuleiro FOZ de ${level.width} colunas e ${level.height} linhas">${parts.join('')}</svg></div>`;
}
