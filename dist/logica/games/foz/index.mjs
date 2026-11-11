export const GAME = {
  id: 'foz', name: 'FOZ',
  description: 'Oriente os canais para que cada rota alcance a mesma foz, respeitando as distâncias.',
  rules: [
    'Em cada ponto, exceto na foz 0, desenhe uma única seta para um vizinho ligado por canal.',
    'Seguindo as setas, todos os pontos devem chegar à foz; não pode haver ciclo. Caminhos podem se juntar.',
    'Um número indica quantos trechos a gota percorre daquele ponto até a foz. Conte os trechos, não os pontos.'
  ],
  instructions: 'Clique em um ponto para alternar a seta. Você também pode escolher uma direção ou limpar o ponto. As setas só usam os canais desenhados; a foz permanece fixa.'
};
export { CAMPAIGN } from './campaign.mjs';
export { initialState, applyAction, checkState, isStateValid, solutionState, toolsForLevel } from './engine.mjs';
export { renderBoard } from './view.mjs';
