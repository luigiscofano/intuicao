import * as engine from "./engine.mjs";
import * as view from "./view.mjs";

export const game = {
  ...{
    id: "quinhao",
    name: "QUINHÃO",
    tagline:
      "Você propõe três cestos vizinhos, o adversário escolhe um, e os dois precisam montar uma colheita variada.",
    objective:
      "Some mais pontos com trios de frutos diferentes (5 pontos) e, depois, pares diferentes nas sobras (2 pontos).",
    duration: "6–10 minutos",
    rules: [
      "Use 24 cestos em um anel, numerados de 1 a 24 no sentido horário. Cada cesto contém exatamente um fruto. A sequência inicial é castanha-do-pará, castanha-do-pará, pitanga, pitanga, jabuticaba, jabuticaba, repetida quatro vezes. Há oito frutos de cada tipo. Os dois depósitos começam vazios.",
      "O jogador verde começa como proponente. Em seu turno, escolhe exatamente três cestos consecutivos entre os que ainda existem no anel. O anel é circular: o último e o primeiro também são vizinhos. Casas já esvaziadas não interrompem a vizinhança.",
      "O adversário escolhe um dos três cestos e transfere seu fruto ao próprio depósito. O proponente recebe os outros dois frutos. Essa escolha é a resposta obrigatória do turno, não um novo turno.",
      "Remova os três cestos e ligue os vizinhos que sobraram. Os frutos já recebidos não voltam ao pomar. Alterne quem propõe. Não há passe, troca de frutos ou seleção fora dos três cestos apresentados.",
      "Após oito turnos completos, todos os 24 frutos foram distribuídos. Cada equipe terá sido proponente quatro vezes e recebido 12 frutos: oito como proponente e quatro como convidada.",
      "Para pontuar, forme primeiro todos os trios possíveis, cada qual com uma castanha-do-pará, uma pitanga e uma jabuticaba. Cada trio vale 5. Com os frutos restantes, forme todos os pares possíveis de tipos diferentes, valendo 2 cada. Nenhum fruto pode pontuar duas vezes. Equivale a 5 m+2(n-m), onde m é a menor e n a segunda menor contagem de frutos do depósito.",
      "Maior pontuação vence. Empate permanece empate. Sempre há uma oferta legal até o fim, pois o anel perde três cestos por turno; quando restam três, a única oferta é o trio inteiro. Não há repetição nem prolongamento: são exatamente oito ofertas e oito respostas.",
    ],
  },
  engine,
  view,
};
