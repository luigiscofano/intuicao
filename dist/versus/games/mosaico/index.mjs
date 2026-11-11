import * as engine from "./engine.mjs";
import * as view from "./view.mjs";

export const game = {
  id: "mosaico",
  name: "MOSAICO",
  tagline:
    "Cada azulejo traz duas cores. A orientação decide quem assina o painel.",
  objective:
    "Preencha o painel e conquiste mais selos nas junções entre quatro azulejos.",
  duration: "8–12 min · estimativa",
  rules: [
    "O painel 5×5 começa vazio, com 25 azulejos iguais em uma reserva comum. O Verde ● começa; o Âmbar ◆ joga em seguida, alternando turnos. As pessoas podem trocar de cor na revanche.",
    "Todo azulejo tem dois cantos verdes adjacentes e dois âmbar adjacentes. Há quatro orientações: verdes em cima, à direita, embaixo ou à esquerda. Em seu turno, escolha uma orientação e coloque um azulejo em qualquer casa vazia.",
    "Não é preciso encostar em outra peça nem combinar bordas. Depois de colocado, o azulejo não pode ser retirado, movido ou girado. Os azulejos são compartilhados; apenas os selos têm dono.",
    "Existem 16 selos nas junções internas. Cada selo reúne os quatro cantos voltados para o encontro de um bloco 2×2 e só é concluído quando os quatro azulejos desse bloco estão colocados.",
    "Ao concluir uma junção, conte seus quatro cantos: 3 ou 4 verdes dão 1 ponto ao Verde; 3 ou 4 âmbar dão 1 ponto ao Âmbar. Com 2 cantos de cada cor, ninguém pontua. Ter os quatro cantos não dá bônus.",
    "Uma colocação pode concluir vários selos e pontuar para as duas equipes. O ponto pertence à cor predominante, independentemente de quem colocou a última peça. Cada selo pontua apenas uma vez.",
    "Depois do 25º azulejo, vence quem tiver mais selos. Placar igual é empate. Não há vitória antecipada nem desempate adicional.",
    "Enquanto existir casa vazia, sempre haverá colocação legal e não se pode passar. Ao preencher o painel, aplica-se a pontuação final. Como nenhuma peça sai, posições não se repetem.",
  ],
  engine,
  view,
};
