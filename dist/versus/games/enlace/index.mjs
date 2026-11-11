import * as engine from "./engine.mjs";
import * as view from "./view.mjs";

export const game = {
  id: "enlace",
  name: "ENLACE",
  tagline: "Dois fios em cada jogada. Uma rede para atravessar o tear.",
  objective:
    "Ligue sua margem à oposta; sem novos encaixes, vence a rede com mais pinos acesos.",
  duration: "6–10 min · estimativa",
  rules: [
    "O tear tem 25 pinos em uma malha 5×5, 40 trechos ortogonais e 20 presilhas compartilhadas. Todos os trechos começam vazios. O Verde ● começa; na revanche, podem trocar as pessoas que controlam as cores.",
    "O Verde entra pelos cinco pinos da esquerda e procura qualquer pino da direita. O Âmbar ◆ entra pelos cinco pinos de cima e procura qualquer pino de baixo. Os cinco pinos de entrada de cada equipe já estão acesos.",
    "Em cada turno, coloque uma presilha com dois braços perpendiculares saindo do mesmo pino: um fio verde e um âmbar. Escolha as cores dos braços. Ambos os trechos precisam estar vazios; uma linha reta ou diagonal não vale. A presilha pode ficar separada das redes existentes.",
    "Fios colocados não saem, não giram e não mudam de cor. Fios da mesma cor se conectam ao compartilhar um pino. As duas cores podem passar pelo mesmo pino, mas usam canais separados e nunca se misturam.",
    "Os dois fios entram ao mesmo tempo. Acenda todos os pinos alcançáveis por fios da mesma cor a partir de qualquer entrada daquela equipe. Um pino compartilhado pode contar uma vez para cada rede.",
    "Quando exatamente uma rede liga sua entrada à margem oposta, seu dono vence imediatamente, mesmo que o rival tenha colocado o último fio. Se as duas redes atravessarem no mesmo lance, há empate.",
    "Se ninguém atravessou e nenhum cotovelo vazio couber no tear, vence quem tiver mais pinos acesos. Quantidades iguais empatam. Não há passe voluntário: enquanto existir encaixe, uma presilha deve ser colocada.",
    "A partida dura no máximo 20 lances. Como cada lance ocupa dois novos trechos e nada é retirado, não há repetição de posições.",
  ],
  engine,
  view,
};
