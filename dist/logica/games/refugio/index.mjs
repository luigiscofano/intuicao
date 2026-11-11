export { CAMPAIGN } from './campaign.mjs';
export { initialState, applyAction, checkState, isStateValid, solutionState, toolsForLevel } from './engine.mjs';
export { renderBoard } from './view.mjs';
export const GAME = Object.freeze({
  id: 'refugio', name: 'REFÚGIO',
  description: 'Separe os marcos em espaços livres, usando apenas barreiras que realmente separam dois refúgios.',
  rules: [
    'Marque cada casa como livre ou barreira, sem alterar as pistas; os marcos são sempre livres.',
    'Cada região de casas livres ligadas por lados deve conter exatamente um marco.',
    'Toda casa de barreira deve tocar, por lados, exatamente duas regiões livres diferentes.'
  ],
  instructions: 'Escolha Livre ou Barreira e toque em uma casa, ou use Alternar. Círculo indica livre; hachura indica barreira; ponto central indica casa indecidida. Pinos identificam pistas fixas. Números identificam marcos, não áreas. Só lados conectam; o exterior não é uma região. As barreiras não precisam estar conectadas.'
});
