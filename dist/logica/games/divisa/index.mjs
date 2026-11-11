export { CAMPAIGN } from './campaign.mjs';
export { initialState, applyAction, checkState, isStateValid, solutionState, toolsForLevel } from './engine.mjs';
export { renderBoard } from './view.mjs';
export const GAME = Object.freeze({
  id: 'divisa', name: 'DIVISA',
  description: 'Reparta o terreno para que cada par de territórios compartilhe exatamente a fronteira indicada.',
  rules: [
    'Preencha cada casa com uma das letras de território, respeitando todas as letras fixas.',
    'Todas as casas de uma mesma letra devem formar uma única região ligada por lados.',
    'Para cada par de letras, a quantidade de lados compartilhados deve ser exatamente a indicada no painel.'
  ],
  instructions: 'Escolha uma letra e toque em uma casa, ou use Alternar. Pinos indicam pistas fixas. Só lados unitários contam: diagonais e a borda externa não contam. Casas sem letra estão indecididas. Não há regra de área ou de formato.'
});
