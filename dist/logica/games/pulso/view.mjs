import { renderBoard as renderNormal } from './view-normal.mjs';
import { readPulsoSkin } from './skin.mjs';

const COLORS = Object.freeze({
  green: '#39654c', blue: '#244b63', gold: '#cca034', paper: '#fffaf0', muted: '#566553',
});
const GRID = Object.freeze({ step: 56, size: 52, left: 30, top: 80, summaryWidth: 116 });
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

function svgText(x, y, value, size = 16, fill = COLORS.blue, weight = 500) {
  return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central"
    font-family="system-ui,sans-serif" font-size="${size}" font-weight="${weight}"
    fill="${fill}">${escapeHTML(value)}</text>`;
}

function circle(x, y, radius, fill, stroke = 'none') {
  return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}"
    stroke="${stroke}" stroke-width="1.5"/>`;
}

/** Deriva só das marcas visíveis; não consulta solução nem altera regras. */
export function rowSummary(level, state, row) {
  const positions = [];
  for (let column = 0; column < level.cols; column++) {
    if (state.cells[row * level.cols + column] === 1) positions.push(column);
  }
  const gaps = positions.length === 3
    ? [positions[1] - positions[0], positions[2] - positions[1]] : null;
  return { count: positions.length, gaps, equal: gaps ? gaps[0] === gaps[1] : null };
}

function skinSelector(skin) {
  return `<div class="pulso-skin-picker" role="group" aria-label="Visual do Pulso">
    <span>Visual</span>
    <button type="button" data-pulso-skin="normal" aria-pressed="${skin === 'normal'}">Normal</button>
    <button type="button" data-pulso-skin="identity" aria-pressed="${skin === 'identity'}">Compasso</button>
  </div>`;
}

function renderQuota(level, state, column) {
  const x = GRID.left + column * GRID.step;
  const count = state.cells.filter((value, index) => index % level.cols === column && value === 1).length;
  const letter = String.fromCharCode(65 + column);
  return `<g role="img" aria-label="Coluna ${letter}: cota ${level.quotas[column]}, ${count} batidas colocadas">
    ${svgText(x + 26, 12, letter, 12, COLORS.muted)}
    <rect x="${x}" y="27" width="52" height="34" fill="${COLORS.blue}"/>
    <g class="pulso-quota-value">${svgText(x + 26, 44, level.quotas[column], 22, COLORS.paper, 650)}</g>
  </g>`;
}

function renderRowSummary(level, state, row, gridWidth) {
  const y = GRID.top + row * GRID.step;
  const x = GRID.left + gridWidth + 25;
  const summary = rowSummary(level, state, row);
  const spacing = summary.gaps
    ? `${summary.gaps[0]} ${summary.equal ? '=' : '≠'} ${summary.gaps[1]} casas`
    : summary.count > 3 ? `excesso: ${summary.count - 3}` : `faltam ${3 - summary.count}`;
  const description = summary.gaps
    ? `Intervalos de ${summary.gaps[0]} e ${summary.gaps[1]} casas, ${summary.equal ? 'iguais' : 'diferentes'}.` : '';
  const slots = Array.from({ length: 3 }, (_, index) =>
    circle(x + index * 19, y + 16, 5, summary.count > index ? COLORS.green : COLORS.paper, COLORS.green));
  return `${svgText(12, y + 26, row + 1, 14)}
    <g role="img" aria-label="Linha ${row + 1}: ${summary.count} de 3 batidas. ${description}">
      ${slots.join('')}
      ${svgText(x + 21, y + 37, `${summary.count}/3`, 21, COLORS.blue, 650)}
      ${svgText(x + 34, y + 51, spacing, 12, COLORS.muted)}
    </g>`;
}

function renderCell(level, value, index, selectedTool) {
  const row = Math.floor(index / level.cols);
  const column = index % level.cols;
  const x = GRID.left + column * GRID.step;
  const y = GRID.top + row * GRID.step;
  const fixed = Object.hasOwn(level.givens, index);
  const valueLabel = value === null ? 'indecisa' : value ? 'batida' : 'vazia';
  const label = `${String.fromCharCode(65 + column)}${row + 1}: ${valueLabel}${fixed ? ', pista fixa' : ''}`;
  const action = fixed ? 'role="img"'
    : `data-cell="${index}" data-tool="${escapeHTML(selectedTool)}" role="button" tabindex="0"`;
  let mark;
  if (value === 1) {
    mark = circle(x + 26, y + 26, 15, COLORS.green) + circle(x + 26, y + 26, 4.5, COLORS.gold);
  } else if (value === 0) {
    mark = `<path d="M${x + 18} ${y + 18}l16 16m0-16l-16 16" stroke="#69766a" stroke-width="2"/>`;
  } else {
    mark = circle(x + 26, y + 26, 1.5, '#b8c2b3');
  }
  if (fixed) mark += `<rect x="${x + 43}" y="${y + 4}" width="5" height="5" fill="${COLORS.blue}"/>`;
  return `<g class="pulso-cell" ${action} aria-label="${escapeHTML(label)}">
    <title>${escapeHTML(label)}</title>
    <rect x="${x}" y="${y}" width="52" height="52" fill="${COLORS.paper}" stroke="#bdc7b7"/>
    ${mark}
  </g>`;
}

function renderIdentity(level, state, selectedTool) {
  const gridWidth = level.cols * GRID.step - 4;
  const gridHeight = level.rows * GRID.step - 4;
  const width = GRID.left + gridWidth + GRID.summaryWidth + 12;
  const height = GRID.top + gridHeight + 34;
  const quotas = Array.from({ length: level.cols }, (_, column) => renderQuota(level, state, column));
  const summaries = Array.from({ length: level.rows }, (_, row) => renderRowSummary(level, state, row, gridWidth));
  const cells = state.cells.map((value, index) => renderCell(level, value, index, selectedTool));
  return `<div class="pulso-rule-ribbon">
      <strong>Exatamente 3 batidas em cada linha</strong>
      <span aria-label="Três batidas com intervalos iguais">● ─ ● ─ ● <b>intervalos iguais</b></span>
      <small>Nas colunas, respeite a cota no topo.</small>
    </div>
    <div class="pulso-board-wrap pulso-board-wrap--identity">
      <svg class="pulso-board pulso-board--identity" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 ${width} ${height}" width="100%" role="group"
        aria-label="PULSO, ${level.rows} linhas por ${level.cols} colunas. Exatamente três batidas igualmente espaçadas em cada linha.">
        ${quotas.join('')}
        <rect x="${GRID.left - 5}" y="${GRID.top - 5}" width="${gridWidth + 10}" height="${gridHeight + 10}"
          fill="none" stroke="${COLORS.blue}" stroke-width="1.5"/>
        ${summaries.join('')}${cells.join('')}
      </svg>
    </div>
    <p class="pulso-legend">● batida · × vazia · ponto = indecisa · ▪ pista fixa</p>`;
}

export function renderBoard(level, state, options = {}) {
  const skin = options.skin ?? readPulsoSkin();
  const board = skin === 'normal' ? renderNormal(level, state, options)
    : renderIdentity(level, state, options.selectedTool ?? 'cycle');
  return skinSelector(skin) + board;
}
