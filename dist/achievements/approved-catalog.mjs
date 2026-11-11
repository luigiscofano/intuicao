// Missões de jogada aprovadas em 11/11/2026. Complementam o catálogo existente.
const gameNames = { light: 'Reflexos', prumo: 'PRUMO', pacto: 'PACTO', sintonia: 'SINTONIA', repasse: 'REPASSE', cerco: 'CERCO', elo: 'ELO', cut: 'Corte Certo', orbita: 'ÓRBITA' };
const mission = (id, gameIds, name, description) => Object.freeze({
  id, gameId: gameIds[0], gameIds: Object.freeze(gameIds),
  games: Object.freeze(gameIds.map(id => Object.freeze({id, name: gameNames[id]}))),
  gameName: gameIds.map(id => gameNames[id]).join(' · '), name, description, icon: id,
});
export const APPROVED_MISSIONS = Object.freeze([
  mission('light-light-jump', ['light'], 'Salto de luz', 'Vença com um mesmo raio atravessando um portal e refletindo em pelo menos três espelhos.'),
  mission('prumo-unlikely-balance', ['prumo'], 'Equilíbrio improvável', 'Equilibre uma peça assimétrica e conclua uma fase oficial de PRUMO.'),
  mission('pacto-quartet', ['pacto'], 'Quarteto', 'Complete em sequência uma dupla de cada um dos quatro símbolos e vença a fase.'),
  mission('sintonia-baton-pass', ['sintonia'], 'Passagem de bastão', 'Deixe uma placa com um personagem enquanto outro atravessa a cancela no mesmo comando, depois conclua a fase.'),
  mission('repasse-chain-inheritance', ['repasse'], 'Herança em cadeia', 'Conduza uma contribuição por pelo menos três peças antes de alcançar a borda e conclua as metas.'),
  mission('cerco-last-exit', ['cerco'], 'A última saída', 'Vença depois de passar três turnos com apenas uma peça da sua equipe podendo se mover.'),
  mission('precision-first-try', ['elo', 'prumo', 'cut'], 'De primeira', 'Conclua uma fase na primeira confirmação da rodada. Ajustar a solução antes de confirmar é permitido.'),
  mission('precision-three-first-tries', ['elo', 'prumo', 'cut'], 'Três certeiros', 'Conclua três fases diferentes na primeira confirmação de cada rodada, em ELO, PRUMO ou Corte Certo.'),
  mission('sintonia-four-command-plan', ['sintonia'], 'Quatro movimentos, um plano', 'Resolva a fase “A parede também ajuda” em até quatro comandos.'),
  mission('efficiency-proven-minimum', ['sintonia', 'orbita'], 'Sem um passo a mais', 'Conclua uma fase oficial no menor número de movimentos comprovado.'),
  mission('orbita-personal-best', ['orbita'], 'Superação pessoal', 'Melhore seu recorde anterior em uma fase de ÓRBITA por pelo menos dois comandos.'),
  mission('efficiency-clean-plan', ['sintonia', 'orbita'], 'Plano sem rasura', 'Conclua uma fase sem usar Desfazer, Refazer ou Reiniciar durante a rodada.'),
  mission('cut-millimetric-eye', ['cut'], 'Olho milimétrico', 'Chegue a até 0,5 ponto percentual da meta na primeira confirmação da rodada e conclua a fase.'),
  mission('repasse-arrival-account', ['repasse'], 'Conta de chegada', 'Complete uma caixa da borda com contribuições de pelo menos três retiradas diferentes e vença.'),
]);
