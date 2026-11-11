import * as engine from "./engine.mjs";
import * as view from "./view.mjs";

/** Regras aprovadas e módulos puros carregados pelo controlador versus. */
export const game = Object.freeze({
  id: "lastro",
  name: "LASTRO",
  tagline: "Um pequeno ajuste muda o equilíbrio — e a resposta do adversário.",
  objective:
    "Fazer o último ajuste legal de cada rodada. O duelo tem duas rodadas com o mesmo aparelho inicial, alternando quem começa: duas vitórias vencem o duelo; uma vitória para cada pessoa dá empate.",
  duration:
    "3–6 minutos por rodada, 6–12 minutos pelo duelo de duas rodadas; estimativa humana a validar.",
  rules: [
    "O aparelho possui seis trilhos independentes, três em cada lado de um apoio central. Cada trilho tem quatro marcas de distância: 1, 2, 3 e 4, contadas do centro para fora. Um trilho contém exatamente um contrapeso e não se cruza com outro; pesos nunca colidem nem trocam de trilho.",
    "À esquerda ficam E1, E2 e E7, com valores 1, 2 e 7. À direita ficam D2, D3 e D5, com valores 2, 3 e 5. Os seis pesos começam na marca 1. São todos compartilhados e podem ser movidos por qualquer participante. Cada lado começa com carga ponderada 10; o desvio inicial é zero.",
    "Calcule o desvio Δ como a soma de valor×distância dos pesos da direita menos a soma de valor×distância dos pesos da esquerda. O estabilizador permite os valores de −4 a +4, inclusive. Essa é uma regra numérica exata, sem simulação física, velocidade, atrito ou precisão de mouse.",
    "Na primeira rodada começa o Jogador 1, identificado por verde e círculo; na segunda começa o Jogador 2, amarelo e losango. A cada turno, escolha qualquer um dos seis pesos e avance-o uma ou duas marcas para fora. O destino não pode ultrapassar a marca 4 e o desvio final precisa continuar entre −4 e +4.",
    "Avançar um peso da esquerda reduz Δ pelo seu valor multiplicado pelo número de marcas; avançar um da direita aumenta Δ pela mesma conta. Não se pode recuar, mudar o valor de um peso, mover dois pesos no mesmo turno, trocar de trilho nem passar a vez. A origem do peso fica vazia e pode ser exibida como dente já ultrapassado, mas não é um novo obstáculo.",
    "Escolha o peso e o destino, confira a prévia numérica e confirme. A ordem é: atualizar a distância, recalcular Δ, passar o turno e verificar todas as opções do próximo participante. Se ele não tiver ajuste legal, perde a rodada imediatamente. Um peso individual estar travado não encerra a rodada se outro ainda tiver um ajuste permitido.",
    "Ao terminar a primeira rodada, anote a vitória, recoloque todos os pesos na marca 1 e inverta quem começa. Ao terminar a segunda, duas vitórias para a mesma pessoa dão vitória no duelo; placar 1–1 é empate. Não há desempate adicional automático.",
    "A catraca impede repetições: a soma das seis distâncias aumenta em pelo menos 1 a cada jogada e pode subir de 6 até 24. Portanto cada rodada tem no máximo 18 ajustes, nunca há ciclo nem passagem indefinida. A rodada não admite empate; o duelo pode empatar por 1–1. Não há geração aleatória de posição.",
  ],
  engine,
  view,
});
