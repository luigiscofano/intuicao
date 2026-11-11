export { CAMPAIGN } from './campaign.mjs';
export { initialState, applyAction, checkState, isStateValid, solutionState, toolsForLevel } from './engine.mjs';
export { renderBoard } from './view.mjs';
export const GAME = Object.freeze({
  id: 'pulso', name: 'PULSO',
  description: 'Três batidas em cada linha. Um intervalo que precisa combinar com todas as colunas.',
  rules: [
    'Em cada linha, coloque exatamente três batidas, com a mesma distância entre a primeira e a segunda e entre a segunda e a terceira.',
    'O número acima de cada coluna diz quantas batidas ela deve conter.',
    'Preserve as casas com pino. Marque as outras como batida ou vazia; × confirma uma casa vazia.'
  ],
  instructions: 'Escolha uma ferramenta e toque nas casas. Alterne entre batida, vazio e indecisa; Checar confere as regras. Dois intervalos iguais também podem ter distância 1.'
});
