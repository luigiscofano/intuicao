/** Primeira leitura: objetivo, uma ação por frase e um exemplo concreto.
 * Os detalhes continuam disponíveis nas regras completas; nada altera o motor.
 */
const guide = (goal, steps, example, cue) => ({ goal, steps, example, cue });
export const QUICK_START = {
  light: guide('Leve cada raio ao alvo da mesma cor e símbolo.', [
    'Gire os espelhos. Eles mudam a direção da luz, mas não saem do lugar.',
    'Dispare pelas fontes ou use Confirmar todos para ver o caminho.',
    'Acerte todos os alvos sem cruzar nem encostar raios de cores diferentes.'
  ], 'O espelho faz a luz virar e alcançar o alvo.', ['Veja a fonte e o alvo', 'Gire e dispare', 'O raio chega ao alvo']),
  cut: guide('Deixe a porcentagem pedida da figura no lado roxo.', [
    'Leia a meta: 50% significa metade da área preenchida.',
    'Mova a linha ou curva. Buracos e espaços vazios não contam.',
    'Confirme sua estimativa. A margem aceita é de 3 pontos percentuais.'
  ], 'A meta é 50%: mover o corte ao centro divide o retângulo ao meio.', ['A área roxa é 25%', 'Mova o corte', 'Agora são 50%']),
  elo: guide('Forme um único circuito fechado, com um ponto em cada região.', [
    'Toque nas casas para colocar pontos. Preserve os pontos fixos.',
    'Pontos alinhados se ligam automaticamente na horizontal ou vertical.',
    'Cada ponto precisa de duas ligações, sem cruzamentos. Siga também as pistas da fase.'
  ], 'O quarto ponto fecha o circuito: todos ficam ligados em uma só volta.', ['Falta um ponto', 'Complete a região', 'O circuito fecha']),
  prumo: guide('Divida a grade em peças equilibradas sobre seus apoios.', [
    'Escolha um apoio e pinte as casas da peça dele.',
    'Preencha a grade. Cada peça deve ser unida pelos lados e conter seu apoio.',
    'Equilibre na horizontal e na vertical. Casas mais distantes puxam mais para aquele lado. Confira a resposta.'
  ], 'Uma casa à direita compensa a casa à esquerda, à mesma distância do apoio.', ['A peça pesa à esquerda', 'Acrescente uma casa', 'Os lados se equilibram']),
  pacto: guide('Complete a grade com duplas de símbolos.', [
    'Escolha um símbolo e toque em uma casa livre, sem mudar as pistas fixas.',
    'Cada linha e coluna precisa de dois círculos, dois triângulos, dois quadrados e dois losangos.',
    'Cada símbolo deve tocar exatamente um igual pelos lados. Diagonais não valem.'
  ], 'Dois círculos lado a lado formam uma dupla; um terceiro não pode encostar neles.', ['Há um círculo', 'Coloque outro ao lado', 'Cada um tem um par']),
  sintonia: guide('Leve todos os animais aos seus destinos ao mesmo tempo.', [
    'Use as setas ou WASD. O mesmo comando vale para todos os animais.',
    'Cada um anda uma casa; quem encontra uma parede fica parado.',
    'Use essas diferenças para alinhar os caminhos. Todos devem terminar nos destinos juntos.'
  ], 'Com o comando →, um animal avança e o outro fica parado diante da parede.', ['Dois animais, um comando', 'Pressione →', 'Só o caminho livre avança']),
  repasse: guide('Retire todas as peças e acerte as metas das bordas.', [
    'Toque em uma peça para retirá-la e enviar seu valor nas direções das setas.',
    'O valor inteiro soma na primeira peça encontrada. Se não houver peça, chega à borda.',
    'Planeje a ordem para atingir cada meta exatamente, inclusive as metas zero.'
  ], 'Retirar o 2 envia seu valor ao 3: a peça que fica passa a valer 5.', ['O receptor vale 3', 'Retire a peça 2', 'O receptor vira 5']),
  pulso: guide('Coloque três batidas igualmente espaçadas em cada linha.', [
    'Escolha Batida ou Vazia e marque as casas. Preserve as pistas fixas.',
    'Em cada linha, deixe a mesma distância entre as três batidas.',
    'Confira os totais das colunas e marque todos os vazios com ×.'
  ], 'Nas casas 1, 3 e 5, as distâncias são iguais: duas casas de uma batida à outra.', ['Duas batidas marcadas', 'Marque a casa 5', 'Três batidas: 2 + 2']),
  foz: guide('Faça todas as setas levarem à foz, marcada com 0.', [
    'Em cada ponto, escolha uma seta para um vizinho ligado por um canal.',
    'Siga as setas: o caminho precisa chegar ao 0, sem ficar dando voltas.',
    'Um número conta os trechos até a foz. Caminhos podem se juntar.'
  ], 'Da pista 2 até a foz são dois trechos: um para a direita e outro para baixo.', ['A pista pede 2 trechos', 'Complete a seta', 'O caminho chega ao 0']),
  refugio: guide('Separe as áreas livres: cada uma precisa de um marco.', [
    'Marque cada casa como Livre ou Barreira, sem alterar as pistas fixas.',
    'Casas livres ligadas pelos lados formam uma região. Cada região deve ter um marco.',
    'Cada barreira deve tocar exatamente duas regiões livres diferentes pelos lados.'
  ], 'A barreira do meio separa os marcos. Ela toca uma região livre de cada lado.', ['Dois marcos, falta uma casa', 'Crie a barreira', 'Um marco por região']),
  mirante: guide('Coloque as formas para que todos os observadores vejam a peça certa.', [
    'Use o estoque de círculos e triângulos. Marque casas vazias com ×.',
    'Siga cada seta da borda: a primeira peça encontrada deve ser a forma indicada.',
    'Cada peça precisa ser vista por pelo menos dois observadores. Vazios deixam a visão passar.'
  ], 'O círculo no meio é visto pelos observadores dos dois lados.', ['Observe as duas placas', 'Coloque o círculo', 'Duas placas veem a peça']),
  renovo: guide('Ligue cada semente a um botão e a uma folha.', [
    'Arraste pelas peças para criar o caminho, ou clique nas duas pontas de uma ligação.',
    'No botão, faça uma curva de 90°: uma ligação horizontal e outra vertical.',
    'Use cada peça uma vez. As linhas não podem cruzar, se sobrepor nem atravessar outras peças.'
  ], 'A semente chega pela esquerda do botão; a folha se liga por baixo.', ['Semente ligada ao botão', 'Ligue o botão à folha', 'Um trio com uma curva']),
  desvio: guide('Deixe o adversário sem uma casa disponível para jogar.', [
    'Escolha uma casa disponível e confirme. Ela não poderá ser usada de novo.',
    '↔ manda o rival para a mesma linha; ↕ manda para a mesma coluna.',
    'Na sua vez, escolha dentro do destino indicado. Casas usadas não bloqueiam a passagem.'
  ], 'Escolher ↔ no centro deixa ao rival apenas as outras casas da mesma linha.', ['Escolha uma seta ↔', 'A casa é consumida', 'O rival joga nessa linha']),
  broto: guide('Faça seus brotos florescerem para ganhar pontos.', [
    'Plante em uma casa vazia. A semente estimula o primeiro broto em cada direção.',
    'Um broto floresce quando recebe estímulos horizontal e vertical. O dono ganha um ponto e a flor sai.',
    'Cada pessoa planta oito sementes por rodada. Após duas rodadas, vence quem somar mais flores.'
  ], 'O broto já tem estímulo horizontal. Plantar abaixo dá o vertical e faz nascer uma flor.', ['O broto já tem ↔', 'Plante abaixo: ↕', 'Floresce: +1 ao dono']),
  cerco: guide('Deixe todas as peças do rival sem saída.', [
    'Escolha uma peça sua e mova uma casa para cima, baixo, esquerda ou direita.',
    'O destino precisa estar vazio. A casa de onde você saiu vira uma barreira.',
    'Quem começar a vez sem conseguir mover nenhuma peça perde. Não há saltos nem capturas.'
  ], 'Verde anda uma casa para baixo. A origem fecha; nenhuma peça é capturada.', ['Escolha a peça verde', 'Mova uma casa', 'A origem vira barreira']),
  enlace: guide('Conecte suas margens com fios da sua cor.', [
    'Verde liga esquerda a direita; Âmbar liga cima a baixo.',
    'Coloque dois fios em forma de L no mesmo pino: um de cada cor.',
    'As redes crescem pelas próprias cores. Quem ligar as margens vence, até com uma jogada do rival.'
  ], 'Uma presilha coloca dois fios juntos: um verde na horizontal e um âmbar na vertical.', ['Escolha um pino', 'Coloque os dois fios', 'As redes crescem']),
  mosaico: guide('Complete junções de azulejos para ganhar selos.', [
    'Escolha a orientação de um azulejo e coloque-o em uma casa vazia.',
    'Quando quatro peças se encontram, conte os cantos voltados para o centro.',
    'Três ou quatro cantos da mesma cor dão um selo a ela. Ao preencher tudo, vence quem tem mais selos.'
  ], 'A última peça completa a junção: três cantos verdes e um âmbar dão um selo ao Verde.', ['Falta o quarto azulejo', 'Complete a junção', 'Três cantos verdes: +1']),
  quinhao: guide('Reúna combinações de frutos para fazer mais pontos.', [
    'Ofereça três cestos vizinhos no anel. Considere só os cestos que ainda estão ali.',
    'O rival escolhe um; você recebe os outros dois. Depois, troquem os papéis.',
    'No fim, três tipos diferentes valem 5 pontos. Nas sobras, cada par de tipos diferentes vale 2; isolados não pontuam.'
  ], 'Verde oferece duas castanhas e uma pitanga. Âmbar escolhe a pitanga; Verde fica com as castanhas.', ['Verde oferece três cestos', 'Âmbar escolhe a pitanga', 'Verde recebe os outros dois']),
  estalo: guide('Abra todas as suas vagens antes do rival.', [
    'Escolha uma vagem fechada sua. Você pode girar a seta 90° ou deixá-la como está.',
    'Abra a vagem: o pulso segue as setas, abrindo as próximas em cadeia.',
    'Cada vagem dá ponto ao próprio dono. A cadeia para na borda ou numa casa já aberta.'
  ], 'O pulso segue seis vagens e para ao reencontrar uma casa aberta: quatro pontos verdes e dois âmbar.', ['Escolha a primeira vagem', 'O pulso segue as setas', 'Cada dono recebe seus pontos']),
  dobra: guide('Controle a maior área no mapa final.', [
    'Coloque um selo seu em uma casa do mapa.',
    'Dobre uma borda inteira para dentro. As áreas e os selos das casas sobrepostas se somam.',
    'No mapa final 2 × 2, a maioria de selos em cada casa ganha a área dela. Empate deixa a área neutra.'
  ], 'Dobrar a borda de cima soma a primeira linha à segunda, sem perder área nem selos.', ['Coloque um selo', 'Dobre a borda de cima', 'As duas linhas se somam']),
  acorde: guide('Reúna pares de três símbolos diferentes.', [
    'Verde recolhe na linha indicada; Âmbar recolhe na coluna indicada.',
    'Escolha um sino. A casa dele define a coluna ou linha da próxima pessoa.',
    'Dois sinos iguais formam um par. Complete pares de três tipos diferentes para vencer.'
  ], 'Verde recolhe o sino de B2. Agora Âmbar escolhe um sino da coluna B.', ['Verde joga na linha 2', 'Recolha o sino de B2', 'Âmbar joga na coluna B'])
};
