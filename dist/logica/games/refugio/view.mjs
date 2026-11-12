import { readRefugioSkin } from './skin.mjs';

const C = { ink: '#30412F', action: '#39674A', cream: '#FFFAF0', cell: '#F8FAF3', line: '#D5DECB', frame: '#B6C3A8', sage: '#E1EDCE', sageEdge: '#73965E', amber: '#F5E7B2', amberEdge: '#B99B46' };
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const text = (x, y, value, size = 20, extra = '') => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, sans-serif" font-size="${size}" fill="${C.ink}" ${extra}>${escape(value)}</text>`;

function renderBoardSvg(level, state, { selectedTool = 'cycle', skin = 'normal' } = {}) {
  const width = 560, gap = 4, pitch = Math.min(92, 420 / level.cols), size = pitch - gap;
  const gridWidth = level.cols * pitch - gap, gridHeight = level.rows * pitch - gap;
  const x0 = (width - gridWidth) / 2, y0 = 72, legendY = y0 + gridHeight + 43, height = legendY + 110;
  const id = `refugio-${String(level.id || 'board').replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const pieces = [`<svg class="refugio-board" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" role="group" aria-labelledby="${id}-title" aria-describedby="${id}-desc" data-tool="${escape(selectedTool)}">`];
  pieces.push(`<title id="${id}-title">Tabuleiro de REFÚGIO, ${level.rows} linhas e ${level.cols} colunas</title><desc id="${id}-desc">Cada região livre deve conter um marco. Cada barreira deve tocar exatamente duas regiões diferentes. Círculo significa livre, hachura significa barreira, ponto pequeno significa indecisão e pino no canto significa pista fixa. Números identificam os marcos, sem indicar área.</desc>`);
  pieces.push(`<defs><pattern id="${id}-hatch" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="${C.sage}"/><path d="M-2 7L7 -2M0 9L9 0" stroke="${C.sageEdge}" stroke-width="1.5"/></pattern></defs>`);
  pieces.push(`<rect x="${x0 - 14}" y="${y0 - 14}" width="${gridWidth + 28}" height="${gridHeight + 28}" rx="17" fill="#FFFFFF" stroke="${C.frame}" stroke-width="2"/>`);
  for (let col = 0; col < level.cols; col += 1) pieces.push(text(x0 + col * pitch + size / 2, y0 - 32, String.fromCharCode(65 + col), 20, 'font-weight="700"'));
  for (let row = 0; row < level.rows; row += 1) pieces.push(text(x0 - 32, y0 + row * pitch + size / 2, row + 1, 20, 'font-weight="700"'));
  state.cells.forEach((value, i) => {
    const x = x0 + (i % level.cols) * pitch, y = y0 + Math.floor(i / level.cols) * pitch;
    const marker = level.markers.find(item => item.index === i), fixed = level.givens[i] !== null || Boolean(marker);
    const coord = `${String.fromCharCode(65 + i % level.cols)}${Math.floor(i / level.cols) + 1}`;
    const label = `${coord}, ${marker ? `marco ${marker.label}, livre` : value === 0 ? 'livre' : value === 1 ? 'barreira' : 'indecidida'}${fixed ? ', pista fixa' : ''}`;
    pieces.push(`<g data-cell="${i}" role="button" tabindex="0" aria-label="${escape(label)}"${fixed ? ' aria-disabled="true"' : ''}>`);
    pieces.push(`<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="9" fill="${C.cell}" stroke="${C.line}" stroke-width="1.5"/>`);
    if (value === 1) pieces.push(`<rect x="${x + 6}" y="${y + 6}" width="${size - 12}" height="${size - 12}" rx="6" fill="url(#${id}-hatch)" stroke="${C.sageEdge}" stroke-width="1.6"/>`);
    else if (marker) {
      const amber = marker.label % 2 === 0, edge = amber ? C.amberEdge : C.sageEdge;
      pieces.push(`<rect x="${x + 7}" y="${y + 7}" width="${size - 14}" height="${size - 14}" rx="9" fill="${amber ? C.amber : C.sage}" stroke="${edge}" stroke-width="1.6"/><rect x="${x + 12}" y="${y + 12}" width="${size - 24}" height="${size - 24}" rx="6" fill="${C.cream}" stroke="${edge}" stroke-width="1"/>`);
      if (skin === 'identity') {
        pieces.push(renderLeafMarker(x, y, size, marker.label, edge));
      } else {
        pieces.push(`<circle cx="${x + size / 2}" cy="${y + size / 2}" r="${size * .22}" fill="none" stroke="${edge}" stroke-width="1.7"/>`);
        pieces.push(text(x + size / 2, y + size / 2 + 1, marker.label, 26, 'font-weight="650"'));
      }
    } else if (value === 0) pieces.push(`<circle cx="${x + size / 2}" cy="${y + size / 2}" r="8" fill="${C.cream}" stroke="${C.action}" stroke-width="2.2"/>`);
    else pieces.push(text(x + size / 2, y + size / 2, '·', 24));
    if (fixed) pieces.push(`<circle cx="${x + size - 7}" cy="${y + 7}" r="3.2" fill="${C.ink}"/>`);
    if (state.lastChanged === i && !fixed) pieces.push(`<rect x="${x + 3}" y="${y + 3}" width="${size - 6}" height="${size - 6}" rx="7" fill="none" stroke="${C.amberEdge}" stroke-width="2.5" stroke-dasharray="5 3"/>`);
    pieces.push(`<rect class="refugio-hit" x="${x + 1}" y="${y + 1}" width="${size - 2}" height="${size - 2}" rx="8" fill="none" stroke="none" stroke-width="3" pointer-events="all"/></g>`);
  });
  pieces.push(`<circle cx="127" cy="${legendY}" r="7" fill="${C.cream}" stroke="${C.action}" stroke-width="2"/>`);
  pieces.push(text(171, legendY, 'livre', 18));
  pieces.push(`<rect x="232" y="${legendY - 10}" width="20" height="20" rx="3" fill="url(#${id}-hatch)" stroke="${C.sageEdge}"/>`);
  pieces.push(text(304, legendY, 'barreira', 18));
  pieces.push(text(412, legendY, '1 marco', 18));
  pieces.push(text(width / 2, legendY + 31, '• fixa   · indecidida   tracejado = última ação', 18));
  pieces.push(text(width / 2, legendY + 59, 'O número identifica o marco; não indica área.', 18));
  if (skin === 'identity') {
    // Assinaturas ficam fora da grade: não cobrem casas, pistas ou áreas de toque.
    pieces.push(renderTileSignature(x0 + gridWidth + 20, y0 - 4));
    pieces.push(renderTileSignature(x0 - 41, y0 + gridHeight - 12));
  }
  pieces.push('</svg>');return pieces.join('');
}


/** A folha ocupa o centro; o identificador continua legível e no nome acessível. */
function renderLeafMarker(x, y, size, label, color) {
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const scale = size / 88 * 1.85;
  return `<g aria-hidden="true" class="refugio-leaf-marker">
    <g transform="translate(${centerX - 2} ${centerY}) scale(${scale})">
      <path d="M0 11Q-8 0 4 -11Q16 1 0 11Z" fill="${color}"/>
      <path d="M1 9L4 -7" fill="none" stroke="${C.cream}" stroke-width="1.1"/>
    </g>
    <text x="${x + size - 20}" y="${y + size - 16}" text-anchor="middle"
      font-family="system-ui,sans-serif" font-size="14" font-weight="650"
      fill="${C.ink}">${escape(label)}</text>
  </g>`;
}

function renderTileSignature(x, y) {
  return `<g aria-hidden="true" class="refugio-tile-signature" transform="translate(${x} ${y})">
    <path d="M0 0H9Q9 9 0 9Z" fill="#39674A"/>
    <path d="M11 0H20V9Q11 9 11 0Z" fill="#B99B46"/>
    <path d="M0 11Q9 11 9 20H0Z" fill="#244b63"/>
    <path d="M11 11H20Q20 20 11 20Z" fill="#73965E"/>
  </g>`;
}

export function renderBoard(level, state, options = {}) {
  const skin = options.skin ?? readRefugioSkin();
  const selector = `<div class="refugio-skin-picker" role="group" aria-label="Visual do Refúgio">
    <span>Visual</span>
    <button type="button" data-refugio-skin="normal" aria-pressed="${skin === 'normal'}">Normal</button>
    <button type="button" data-refugio-skin="identity" aria-pressed="${skin === 'identity'}">Folhas</button>
  </div>`;
  return selector + renderBoardSvg(level, state, { ...options, skin });
}
