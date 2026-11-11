export const GAME = {
  id: 'renovo', name: 'RENOVO',
  description: 'Una sementes, botões e folhas em trios com uma curva, sem cruzar as ligações.',
  rules: [
    'Ligue cada botão a uma semente e a uma folha. Use todas as peças uma única vez.',
    'As duas ligações de cada botão devem formar um ângulo reto. Cada trecho é horizontal ou vertical e termina na primeira peça encontrada naquela direção.',
    'As linhas não podem cruzar, se sobrepor nem atravessar outra peça. Só os dois trechos do mesmo trio se encontram, em seu botão.'
  ],
  instructions: 'Clique em duas peças alinhadas para desenhar uma ligação. Repita a mesma ligação para removê-la. Clique novamente na peça selecionada para cancelar; Limpar peça remove seus trechos. As formas fixas são semente (círculo), botão (losango) e folha.'
};
export { CAMPAIGN } from './campaign.mjs';
export { initialState, applyAction, checkState, isStateValid, solutionState, toolsForLevel } from './engine.mjs';
export { renderBoard } from './view.mjs';
