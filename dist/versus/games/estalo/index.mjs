import * as engine from "./engine.mjs";
import { ESTALO_MAPS } from "./maps.mjs";
import * as view from "./view.mjs";

export const game = {
  ...{
    id: "estalo",
    name: "ESTALO",
    tagline:
      "Dispare uma sequência de vagens para abrir as suas, sabendo que cada vagem rival atingida também aproxima o adversário da vitória.",
    objective:
      "Abra todas as suas vagens. A cadeia também pontua para o rival; completar as duas equipes juntas empata.",
    duration: "4–8 minutos",
    rules: [
      "Escolha o mapa e o tamanho antes de iniciar. Cada mapa tem o mesmo número de vagens para as duas equipes. No mapa Clássico, o tabuleiro é 4 × 4, colunas A–D da esquerda para a direita e linhas 1–4 de cima para baixo. Todas as 16 casas começam ocupadas por uma vagem. As oito das colunas A e B pertencem a Verde; as oito de C e D pertencem a Âmbar. Placar inicial 0–0.",
      "No mapa Clássico, orientações iniciais, por linha de A a D: linha 1 → ↓ ← ↓; linha 2 ↑ → ↓ ←; linha 3 → ↑ ← ↓; linha 4 ↑ → ↑ ←. O arranjo é simétrico por rotação de 180° acompanhada da troca das equipes. As cores de posse nunca mudam.",
      "Verde começa. Em seu turno, escolha uma vagem fechada da própria equipe. Mantenha sua seta ou gire-a exatamente 90° para um dos dois lados. Não pode girar 180°, girar outra vagem nem escolher vagem rival como origem.",
      "A vagem escolhida abre imediatamente e dá um ponto ao seu dono. O pulso segue sua seta para a casa ortogonal imediatamente vizinha. Se houver uma vagem fechada, ela abre, pontua para o próprio dono e redireciona o pulso segundo sua seta atual; continue da mesma forma.",
      "Se o próximo destino for uma casa já aberta, um recorte vazio do mapa ou estiver fora do tabuleiro, a cadeia termina. O pulso não salta vazios. Somente a seta da vagem de origem pode ser ajustada; as demais mantêm suas orientações. Uma casa aberta torna-se uma casca vazia, sem vagem e sem condução.",
      "Resolva a cadeia inteira e só então verifique a vitória. Não interrompa quando uma equipe abrir todas as suas vagens: a cadeia ainda pode completar a outra e empatar. Se ninguém completou sua meta, alterne a vez.",
      "Não há passe, captura, conversão de posse ou reposição. Enquanto a partida não terminou, cada jogador ainda possui ao menos uma vagem fechada e, portanto, uma jogada. Se alguém está sem vagens próprias fechadas, já alcançou o objetivo e a verificação anterior encerrou a partida.",
      "Cada turno abre ao menos uma vagem; cada vagem abre uma única vez. A partida termina em no máximo tantos turnos quanto há vagens no início (16 no Clássico). Até um circuito de setas para sozinho, pois ao retornar a uma casa o pulso encontra uma casca vazia.",
    ],
  },
  maps: ESTALO_MAPS,
  engine,
  view,
};
