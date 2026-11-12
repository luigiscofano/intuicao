// Rasterização dos ornamentos geométricos nativos, não de fotografias/arte alheia.
// Cada PNG tem 256 px: mais de 3x para a maior peça publicada (72,25 px).
import { mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const directory = fileURLToPath(new URL('../dist/platform-assets/tiles/', import.meta.url));
mkdirSync(directory, { recursive: true });
const paths = {
  tl: 'M0 0H256A256 256 0 0 1 0 256Z',
  br: 'M256 256H0A256 256 0 0 1 256 0Z',
  bl: 'M0 256V0A256 256 0 0 1 256 256Z',
};
const variants = {
  blue: ['#244b63', ['tl', 'br']],
  green: ['#39654c', ['tl', 'br']],
  gold: ['#cca034', ['tl', 'br', 'bl']],
  'game-green': ['#39674a', ['tl']],
  'game-gold': ['#cc9f3b', ['tl', 'br']],
};
for (const [name, [color, corners]] of Object.entries(variants)) {
  for (const corner of corners) {
    execFileSync('magick', ['-size', '256x256', 'xc:none', '-fill', color,
      '-draw', `path '${paths[corner]}'`, '-depth', '8', '-define', 'png:color-type=6',
      '-define', 'png:exclude-chunks=date,time', `${directory}${name}-${corner}.png`]);
  }
}
