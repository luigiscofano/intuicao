import * as engine from "./engine.mjs";
import * as view from "./view.mjs";

export const game = {
  id: "vazante",
  name: "VAZANTE",
  tagline: "Uma remada avança o barco e puxa a fila que ficou atrás.",
  objective: "Leve dois dos seus três barcos a qualquer casa da margem oposta.",
  duration: "7–12 min · estimativa",
  rules: [
    "O rio é uma grade 5×5 sem obstáculos. Verde ● começa com barcos em A1, C1 e E1; Âmbar ◆ começa em A5, C5 e E5. Os três barcos de cada equipe têm a mesma função; os animais são escolhas visuais. Verde joga primeiro, alternando turnos.",
    "Em seu turno, escolha um barco seu e mova-o exatamente uma casa na horizontal ou vertical para uma casa vazia. Não há diagonal, salto, empurrão, saída do tabuleiro ou remada de várias casas.",
    "Olhe da origem na direção oposta à remada: todos os barcos consecutivos dessa linha formam a esteira. A primeira casa vazia ou a borda encerra a fila. A cor dos barcos não interrompe o comboio.",
    "O barco escolhido e a fila inteira atrás dele se movem simultaneamente uma casa na mesma direção. O primeiro seguidor ocupa a origem do barco ativo. Não se pode puxar apenas parte da fila; barcos à frente ou ao lado ficam onde estavam.",
    "Depois da remada, qualquer barco verde que entra em qualquer casa da linha 5 atraca; qualquer barco âmbar que entra em qualquer casa da linha 1 também atraca. Retire o barco e marque uma entrega para seu dono. Voltar à própria margem inicial não é uma entrega.",
    "Quem completar duas entregas vence imediatamente. Um jogador sem nenhuma remada legal é obrigado a passar. Não há passe voluntário. Dois passes consecutivos empatam.",
    "A terceira ocorrência da mesma posição empata. A posição inclui as casas ocupadas por cada equipe, as entregas e o jogador da vez; barcos da mesma equipe são equivalentes.",
    "Após 80 turnos, incluindo passes, há empate se ninguém tiver duas entregas. Uma segunda entrega realizada no 80º turno vence antes da aplicação desse limite. Na revanche, as pessoas podem trocar de cor.",
  ],
  engine,
  view,
};
