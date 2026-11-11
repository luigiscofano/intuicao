import { writeFile } from 'node:fs/promises';
import { LOGIC_GAMES } from '../../dist/logica/metadata.mjs';

// Executado na preparação da versão: conquistas precisam só de identidades e faixas.
const partial = process.argv.includes('--partial');
const catalog = [];
for (const game of LOGIC_GAMES) {
  try {
    const { CAMPAIGN } = await import(`../../dist/logica/games/${game.id}/campaign.mjs`);
    if (CAMPAIGN.length !== 80) throw new Error(`${game.name}: campanha deve conter 80 fases.`);
    catalog.push({ id: game.id, name: game.name, levels: CAMPAIGN.map(({ id, version, difficulty }) => ({ id, version, difficulty })) });
  } catch (error) {
    if (!partial) throw error;
    catalog.push({ id: game.id, name: game.name, levels: [] });
  }
}
await writeFile(new URL('../../dist/logica/catalog-summary.mjs', import.meta.url), '// Gerado por tools/logica/catalog-summary.mjs; não importa motores na biblioteca.\nexport const LOGIC_CAMPAIGNS = Object.freeze(' + JSON.stringify(catalog, null, 2) + ');\n');
console.log(`${catalog.length} jogos; ${catalog.reduce((count, game) => count + game.levels.length, 0)} identidades de fase.`);
