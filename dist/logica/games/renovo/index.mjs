export const GAME = {
  id: 'renovo', name: 'RENOVO',
  description: 'Una sementes, botões e folhas em trios com uma curva, sem cruzar as ligações.',
  rules: [
    'Ligue cada botão a uma semente e a uma folha. Use todas as peças uma única vez.',
    'As duas ligações de cada botão devem formar um ângulo reto. Cada trecho é horizontal ou vertical e termina na primeira peça encontrada naquela direção.',
    'As linhas não podem cruzar, se sobrepor nem atravessar outra peça. Só os dois trechos do mesmo trio se encontram, em seu botão.'
  ],
  instructions: 'Arraste com o mouse ou dedo da semente ou folha até o botão; você pode virar e continuar até o outro extremo. Solte para confirmar. Repetir o traçado mantém os trechos existentes. Ou clique em duas peças alinhadas para ligar; repita os dois cliques para remover. Enter ou Espaço também selecionam peças. Escape cancela o gesto; clicar novamente na peça selecionada cancela a seleção. Limpar peça remove seus trechos.'
};
export { CAMPAIGN } from './campaign.mjs';
export { initialState, applyAction, checkState, isStateValid, solutionState, toolsForLevel } from './engine.mjs';
export { renderBoard } from './view.mjs';
