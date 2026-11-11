export { CAMPAIGN } from './campaign.mjs';
export { initialState, applyAction, checkState, isStateValid, solutionState, toolsForLevel } from './engine.mjs';
export { renderBoard } from './view.mjs';
export const GAME = Object.freeze({
  id: 'mirante', name: 'MIRANTE',
  description: 'Distribua as formas, compartilhe as vistas e preserve duas testemunhas para cada peça.',
  rules: [
    'Coloque exatamente as peças indicadas no estoque, no máximo uma por casa. Confirme as demais casas vazias com ×.',
    'Cada observador precisa ver a forma indicada como a primeira peça na direção da seta. Vazios deixam a visão passar; a primeira peça a interrompe. Não há diagonais e uma direção toda vazia não satisfaz a pista.',
    'Toda peça precisa ser vista por pelo menos dois observadores. Olhos em lados opostos contam separadamente; uma borda sem observador não dá informação nem conta como visão.'
  ],
  instructions: 'Escolha círculo, triângulo ou vazio e toque nas casas. As placas âmbar são observadores fixos. Checar verifica estoque, primeiras vistas e as duas testemunhas.'
});
