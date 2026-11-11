/** Galeria vetorial derivada das mesmas views usadas no jogo.
 * Não captura navegador, não resolve fases e não altera campanhas.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { LOGIC_GAMES, DIFFICULTIES, loadLogicGame } from '../../dist/logica/metadata.mjs';

const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const root = new URL('../../', import.meta.url);
const output = new URL('docs/imagens/logica/', root);

function wrap(text, columns) {
  const lines = [];
  for (const word of text.split(/\s+/)) {
    if (!lines.length || `${lines.at(-1)} ${word}`.length > columns) lines.push(word);
    else lines[lines.length - 1] += ` ${word}`;
  }
  return lines;
}

function extractSVG(markup) {
  const start = markup.indexOf('<svg'), end = markup.lastIndexOf('</svg>');
  if (start < 0 || end < start) throw new Error('A view não devolveu um SVG completo.');
  const svg = markup.slice(start, end + 6);
  const opening = svg.match(/^<svg\b[^>]*>/)[0];
  const values = opening.match(/viewBox="([^"]+)"/)?.[1].trim().split(/\s+/).map(Number);
  if (!values || values.length !== 4 || values.some(value => !Number.isFinite(value)) || values[2] <= 0 || values[3] <= 0) throw new Error('viewBox ausente ou inválido.');
  return { svg, opening, viewBox: values };
}

export function gallerySVG(metadata, adapter, level) {
  const state = adapter.initialState(level);
  if (!adapter.isStateValid(level, state)) throw new Error(`Estado inicial inválido: ${level.id}`);
  const board = extractSVG(adapter.renderBoard(level, state, { selectedTool: adapter.toolsForLevel(level)[0]?.id }));
  const width = 720, padding = 40;
  const subtitle = `Fase ${level.number} · ${level.name} · ${DIFFICULTIES[level.difficulty]}`;
  const subtitles = wrap(subtitle, 63), descriptions = wrap(adapter.GAME.description, 73);
  const boardY = 102 + subtitles.length * 25 + descriptions.length * 23;
  const scale = Math.min(1.1, 640 / board.viewBox[2], 620 / board.viewBox[3]);
  const boardWidth = board.viewBox[2] * scale, boardHeight = board.viewBox[3] * scale;
  const height = Math.ceil(boardY + boardHeight + 90);
  const title = `${adapter.GAME.name} — fase ${level.number}, estado inicial`;
  const description = `${subtitle}. ${adapter.GAME.description} Estado inicial real do catálogo, com pistas e coordenadas preservadas.`;
  const provenance = {
    generator: 'tools/logica/render-gallery.mjs', generatorVersion: 1,
    sourceView: `dist/logica/games/${metadata.id}/view.mjs`, sourceCampaign: `dist/logica/games/${metadata.id}/campaign.mjs`,
    game: metadata.id, levelId: level.id, levelVersion: level.version, number: level.number,
    name: level.name, difficulty: DIFFICULTIES[level.difficulty], state: 'initial',
    viewSHA256: createHash('sha256').update(board.svg).digest('hex'),
  };
  const positioned = board.svg.replace(board.opening, `<svg xmlns="http://www.w3.org/2000/svg" x="${(width - boardWidth) / 2}" y="${boardY}" width="${boardWidth}" height="${boardHeight}" viewBox="${board.viewBox.join(' ')}">`);
  const text = (x, y, value, size, weight = 500) => `<text x="${x}" y="${y}" font-family="system-ui, sans-serif" font-size="${size}" font-weight="${weight}" fill="#30412F">${escape(value)}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="gallery-title gallery-desc">
<title id="gallery-title">${escape(title)}</title>
<desc id="gallery-desc">${escape(description)}</desc>
<metadata>${escape(JSON.stringify(provenance))}</metadata>
<rect width="${width}" height="${height}" fill="#F4EDDD"/>
<rect x="16" y="16" width="${width - 32}" height="${height - 32}" rx="22" fill="#FFFAF0" stroke="#B6C3A8" stroke-width="1.5"/>
${text(padding, 62, adapter.GAME.name, 31, 750)}
${subtitles.map((line, index) => text(padding, 94 + index * 25, line, 19, 600)).join('\n')}
${descriptions.map((line, index) => text(padding, 104 + subtitles.length * 25 + index * 23, line, 17)).join('\n')}
${positioned}
${text(padding, height - 48, `Estado inicial · campanha de ${adapter.CAMPAIGN.length} fases`, 16)}
${text(padding, height - 27, 'Intuição · geometria gerada pela view do jogo', 14)}
</svg>\n`;
}

export async function renderGallery({ availableOnly = false, games = LOGIC_GAMES.map(game => game.id) } = {}) {
  if (games.some(id => !LOGIC_GAMES.some(game => game.id === id))) throw new Error('Jogo fora da galeria dos seis jogos lógicos.');
  mkdirSync(output, { recursive: true });
  const written = [], skipped = [];
  for (const metadata of LOGIC_GAMES.filter(game => games.includes(game.id))) {
    const campaign = new URL(`dist/logica/games/${metadata.id}/campaign.mjs`, root);
    if (!existsSync(campaign)) {
      if (!availableOnly) throw new Error(`Campanha ausente: ${metadata.id}. Gere-a antes de fechar a galeria.`);
      skipped.push(metadata.id); continue;
    }
    const adapter = await loadLogicGame(metadata.id);
    if (adapter.CAMPAIGN.length !== 80) throw new Error(`${metadata.id}: a campanha precisa ter 80 fases.`);
    const level = adapter.CAMPAIGN.find(item => item.number === 1);
    if (!level) throw new Error(`${metadata.id}: fase 1 ausente.`);
    const target = new URL(`${metadata.id}.svg`, output);
    writeFileSync(target, gallerySVG(metadata, adapter, level));
    written.push({ game: metadata.id, file: fileURLToPath(target), levelId: level.id, name: level.name });
  }
  return { written, skipped };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const parameters = process.argv.slice(2);
  const gameOption = parameters.find(value => value.startsWith('--games='));
  if (parameters.some(value => value !== '--available' && !value.startsWith('--games='))) throw new Error('Uso: node tools/logica/render-gallery.mjs [--available] [--games=divisa,pulso,...]');
  console.log(JSON.stringify(await renderGallery({ availableOnly: parameters.includes('--available'), ...(gameOption ? { games: gameOption.slice(8).split(',') } : {}) }), null, 2));
}
