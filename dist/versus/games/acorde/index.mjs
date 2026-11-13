import { ACORDE_MAPS } from "./maps.mjs";
import * as engine from "./engine.mjs";
import * as view from "./view.mjs";

/** Regras aprovadas e módulos puros carregados pelo controlador versus. */
export const game = Object.freeze({
  id: "acorde",
  name: "ACORDE",
  tagline: "O sino que você recolhe escolhe a passagem do adversário.",
  objective:
    "Ser o primeiro a reunir pares de três símbolos diferentes. Um símbolo forma um par quando a equipe tem ao menos dois sinos daquele símbolo. Ter três ou quatro sinos iguais continua valendo apenas um par.",
  duration: "4–8 minutos, estimativa a validar.",
  rules: [
    "Escolha o tamanho e o arranjo. O clássico tem 4×4 e 16 sinos. Os outros arranjos têm mais casas, sempre com quantidades iguais de folha, onda, sol e gota. Não há peças ocultas nem reposição.",
    "No clássico, as linhas são folha/gota/onda/sol, gota/onda/sol/folha, onda/sol/folha/gota e sol/folha/gota/onda. Nos demais, siga a distribuição visível do arranjo. As coleções começam vazias. O carrinho começa fora da grade, à esquerda da linha 2.",
    "A equipe verde começa e sempre recolhe em linha horizontal. A equipe amarela sempre recolhe em coluna vertical. No primeiro turno, o verde escolhe qualquer sino da linha 2. Depois de uma coleta, o carrinho fica na casa recolhida; essa casa fica vazia.",
    "Em cada turno, recolha exatamente um sino ainda presente na linha ou coluna que atravessa o carrinho, conforme o eixo da sua equipe. Pode passar por casas vazias e por outros sinos, sem recolhê-los: importa a casa escolhida. Toda coleta é feita por encaixe na casa, sem precisão de mouse.",
    "A casa escolhida pelo verde determina a coluna do amarelo; a casa escolhida pelo amarelo determina a linha do verde. Acrescente o sino à coleção do jogador ativo, confira se ele completou três pares diferentes e, caso ainda não tenha vencido, passe o turno.",
    "Se não houver sino no seu eixo ativo, passe obrigatoriamente; o carrinho permanece na mesma posição. O adversário verifica seu próprio eixo. Dois passes consecutivos encerram a partida: vence quem tiver mais símbolos com um par; igualdade é empate. Esgotar todos os sinos também encerra imediatamente com esse mesmo critério.",
    "O participante que controla o verde faz a primeira coleta. Na revanche, trocam-se as pessoas que controlam as cores e, portanto, os eixos; o arranjo inicial permanece igual. Esse procedimento permite comparar a vantagem de ordem, mas não demonstra equilíbrio.",
    "Não há ciclos: cada jogada retira um sino e dois passes seguidos terminam o jogo. O máximo de coletas é a quantidade de sinos do arranjo. A meta continua sendo três pares diferentes em todos os tamanhos.",
  ],
  maps: ACORDE_MAPS,
  mapPreview: view.mapPreview,
  engine,
  view,
});
