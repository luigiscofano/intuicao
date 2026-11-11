import * as engine from "./engine.mjs";
import * as view from "./view.mjs";

export const game = {
  ...{
    id: "dobra",
    name: "DOBRA",
    tagline:
      "Marque um pedaço do mapa e dobre uma borda: você fortalece seus distritos, mas também reúne as reivindicações do adversário.",
    objective:
      "No atlas final 2 × 2, controle a maior área. A maioria de selos em cada distrito define quem recebe seus pontos.",
    duration: "6–12 minutos",
    rules: [
      "Prepare um mapa retangular 6 × 6 de 36 painéis. Cada painel começa com área 1 e nenhum selo. Verde e Âmbar recebem quatro selos cada, visíveis na reserva. Verde começa.",
      "Em cada turno faça as duas etapas nesta ordem: coloque um selo da sua reserva em qualquer pilha existente, mesmo que ela já contenha selos seus ou rivais; depois escolha e dobre uma borda inteira do mapa para dentro.",
      "Dobrar o norte leva cada pilha da primeira linha sobre a pilha correspondente da segunda linha e elimina a primeira linha. Sul faz o equivalente com a última e a penúltima. Oeste leva a primeira coluna sobre a segunda; leste, a última sobre a penúltima.",
      "Uma dobra soma as áreas e todos os selos das duas pilhas. Nada é descartado nem ocultado. A interface exibe em cada pilha sua área total e a quantidade de cada selo, mesmo quando seria coberta fisicamente pelo papel. Orientação de frente e verso não é uma regra.",
      "Só é permitido dobrar norte ou sul se houver mais de duas linhas; oeste ou leste, se houver mais de duas colunas. É obrigatório dobrar uma borda legal após colocar o selo. Não se pode dobrar parte de uma borda, sobrepor pilhas não vizinhas nem desdobrar o mapa.",
      "Após cada dobra, reindexe as colunas A,B,C... da esquerda para a direita e as linhas 1,2,3... de cima para baixo. As coordenadas dos exemplos sempre se referem ao mapa que está na tela naquele instante; uma peça pode mudar de coordenada sem outra ação.",
      "Cada turno reduz em 1 o número de linhas ou colunas. De 6 × 6 até 2 × 2 são exatamente oito dobras, portanto oito turnos, quatro de cada equipe. Cada equipe usa seus quatro selos. A área total permanece 36.",
      "Ao chegar a 2 × 2, some as áreas dos distritos controlados por cada equipe, conforme a maioria de selos. Selos empatados, inclusive 0–0, deixam o distrito neutro e sua área não pontua para ninguém. Maior soma vence; igualdade é empate.",
      "Não há passe, remoção de selos ou repetição. Antes de 2 × 2 existe ao menos uma borda legal e a equipe da vez ainda possui um selo; a partida termina antes de alguém ficar sem ação.",
    ],
  },
  engine,
  view,
};
