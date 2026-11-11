import { initialState, isStateValid } from './engine.mjs';
const C = { ink: '#30412F', green: '#39674A', cream: '#FFFAF0', white: '#FFFFFF', cell: '#F8FAF3', edge: '#D5DECB', frame: '#B6C3A8', sage: '#E1EDCE', sageEdge: '#73965E', amber: '#F5E7B2', amberEdge: '#B99B46' };
const safe = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const label = (index, width) => `${String.fromCharCode(65 + index % width)}${Math.floor(index / width) + 1}`;
const text = (x, y, value, size = 20) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-family="system-ui,sans-serif" fill="${C.ink}">${safe(value)}</text>`;
const rect = (x, y, w, h, fill, stroke, radius = 9, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="1.4" ${extra}/>`;
function symbol(kind, x, y) {
  if (kind === 'S') return `<circle cx="${x}" cy="${y}" r="11" fill="${C.green}" stroke="${C.ink}" stroke-width="2"/>`;
  if (kind === 'B') return `<path d="M${x},${y - 15} L${x + 15},${y} L${x},${y + 15} L${x - 15},${y} Z" fill="${C.cream}" stroke="${C.ink}" stroke-width="2.4" stroke-linejoin="round"/>`;
  return `<path d="M${x - 19},${y} Q${x},${y - 15} ${x + 19},${y} Q${x},${y + 15} ${x - 19},${y} Z M${x - 10},${y} H${x + 10}" fill="${C.cream}" stroke="${C.ink}" stroke-width="2.2"/>`;
}

export function renderBoard(level, current, { selectedTool = 'select' } = {}) {
  const state = isStateValid(level, current) ? current : initialState();
  const size = 68; const gap = 4; const step = size + gap; const x0 = 58; const y0 = 48;
  const bw = level.width * step - gap; const bh = level.height * step - gap; const width = bw + 108; const height = bh + 128;
  const position = (i) => [x0 + (i % level.width) * step + size / 2, y0 + Math.floor(i / level.width) * step + size / 2];
  const parts = [`<title>RENOVO. Selecione duas peças alinhadas para ligar ou retirar um trecho.</title>`, rect(x0 - 7, y0 - 7, bw + 14, bh + 14, C.white, C.frame, 17)];
  for (let row = 0; row < level.height; row += 1) {
    parts.push(text(29, y0 + row * step + size / 2 + 7, row + 1));
    for (let col = 0; col < level.width; col += 1) {
      parts.push(rect(x0 + col * step, y0 + row * step, size, size, C.cell, C.edge));
      if (!Object.hasOwn(level.pieces, row * level.width + col)) parts.push(`<circle cx="${x0 + col * step + size / 2}" cy="${y0 + row * step + size / 2}" r="2" fill="${C.frame}"/>`);
    }
  }
  for (let col = 0; col < level.width; col += 1) parts.push(text(x0 + col * step + size / 2, 27, String.fromCharCode(65 + col)));
  for (const [a, b] of state.links) { const [ax, ay] = position(a); const [bx, by] = position(b); parts.push(`<path d="M${ax},${ay} L${bx},${by}" fill="none" stroke="${C.green}" stroke-width="5.5" stroke-linecap="round"/>`); }
  for (const [key, kind] of Object.entries(level.pieces)) {
    const index = Number(key); const [x, y] = position(index); const selected = index === state.selected; const name = { S: 'semente', B: 'botão', F: 'folha' }[kind];
    const degree = state.links.filter((edge) => edge.includes(index)).length;
    const aria = `${label(index, level.width)}, ${name} ${kind === 'B' ? 'fixo' : 'fixa'}, ${degree} ${degree === 1 ? 'ligação' : 'ligações'}.${selected ? ' Peça selecionada; escolha a outra.' : selectedTool === 'clear' ? ' Clique para limpar suas ligações.' : ' Clique para selecionar.'}`;
    const tone = kind === 'B' ? C.amber : C.sage; const border = kind === 'B' ? C.amberEdge : C.sageEdge;
    parts.push(`<g data-cell="${index}" role="button" tabindex="0" aria-pressed="${selected}" aria-label="${safe(aria)}">`, rect(x - 28, y - 28, 56, 56, tone, border), rect(x - 24, y - 24, 48, 48, C.cream, border, 6), `<circle cx="${x + 21}" cy="${y - 21}" r="3" fill="${C.ink}" stroke="${C.cream}"/>`, symbol(kind, x, y));
    if (selected) parts.push(rect(x - 31, y - 31, 62, 62, 'none', C.ink, 11, 'stroke-dasharray="5 3"'));
    parts.push(rect(x - size / 2 + 1, y - size / 2 + 1, size - 2, size - 2, 'none', 'none', 9, 'class="renovo-focus" pointer-events="all"'), '</g>');
  }
  const legendY = bh + 84;
  parts.push(symbol('S', width * .18 - 27, legendY), text(width * .18 + 33, legendY + 7, 'semente', 18), symbol('B', width * .51 - 26, legendY), text(width * .51 + 27, legendY + 7, 'botão', 18), symbol('F', width * .81 - 26, legendY), text(width * .81 + 27, legendY + 7, 'folha', 18));
  parts.push(text(width / 2, height - 10, state.selected === null ? 'Pino = peça fixa · selecione duas peças' : `Selecionada: ${label(state.selected, level.width)} · escolha o outro extremo`, 17));
  return `<div class="renovo-board${level.width > 8 ? ' renovo-board--very-wide' : level.width > 6 ? ' renovo-board--wide' : ''}"><svg xmlns="http://www.w3.org/2000/svg" class="renovo-svg" width="100%" viewBox="0 0 ${width} ${height}" role="group" aria-label="Tabuleiro RENOVO de ${level.width} colunas e ${level.height} linhas">${parts.join('')}</svg></div>`;
}
