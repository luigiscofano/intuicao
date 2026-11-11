# LASTRO

Seis contrapesos compartilhados avançam em trilhos de quatro marcas. A cada ajuste,
um peso avança uma ou duas marcas para fora e o desvio final precisa ficar entre
−4 e +4, inclusive. Quem deixa o adversário sem ajuste legal vence a rodada.

O duelo sempre tem duas rodadas. O verde começa a primeira e o amarelo começa a
segunda, com o mesmo aparelho inicial. Duas vitórias vencem o duelo; 1–1 é empate.

## Organização

- `engine.mjs`: regras com inteiros, ações, término das rodadas e estado serializável.
- `view.mjs`: os seis trilhos, prévia das cargas e interação por peso/destino.
- `view.css`: apresentação de bancada e reorganização vertical em telas estreitas.
- `index.mjs`: metadados e regras completas aprovadas.

Confirmação, bot, histórico e persistência pertencem ao controlador compartilhado.
Não há simulação física, precisão de mouse, sorte ou propriedade individual dos pesos.

## Aritmética e invariantes

Os trilhos fixos são E1, E2 e E7 à esquerda; D2, D3 e D5 à direita. Os números nos
códigos são os valores dos pesos. `positions` guarda seis distâncias inteiras de 1 a 4.
`getLoads` deriva as cargas e o desvio, sem guardar uma segunda cópia que possa divergir:

```text
esquerda = 1×E1 + 2×E2 + 7×E7
direita  = 2×D2 + 3×D3 + 5×D5
desvio   = direita − esquerda
```

Todos começam em 1, portanto as cargas são 10 e o desvio é 0. Um ajuste cresce a
soma das distâncias em 1 ou 2; essa soma vai de 6 até 24. Uma rodada tem no máximo
18 ajustes. Um peso bloqueado não encerra a rodada se outro puder avançar.

## Ações e fases

- `{ type: 'advance', piece: 'E2', to: 3 }`: avança exatamente esse peso ao destino.
- `{ type: 'next-round' }`: prepara a segunda rodada após a primeira vitória.

`phase` é `playing`, `between-rounds` ou `finished`. Na pausa, o aparelho terminado
permanece visível, `roundWinner` identifica o vencedor, `roundScores` já contém o
ponto e `result` continua `null`. A única ação é `next-round`, com `player: 1`:
ela recoloca os seis pesos em 1 e inicia a segunda rodada pelo amarelo.

Somente ao encerrar a segunda rodada existe `result`, com vencedor 0/1 ou empate.
`getScores` retorna vitórias por rodada. `roundMoveCount` conta ajustes da rodada;
`moveCount` conta todas as ações confirmadas do duelo, incluindo `next-round`.

`interact` recebe `{ type: 'piece', piece }` para selecionar e
`{ type: 'destination', piece, to }` para preparar o ajuste. Nenhuma ação da view
modifica o estado. As duas cargas, o desvio atual e o previsto ficam visíveis;
o cálculo com as seis multiplicações pode ser expandido.

## Exemplo aprovado

Antes: E1=4, E2=2, E7=2; D2=4, D3=4, D5=1. As cargas são 22 e 25; Δ=+3.
Mover E2 de 2 para 3 deixa cargas 24 e 25; Δ=+1. A única resposta é E2 de 3 para 4.
A sequência D5:1→2, E7:2→3, D5:2→3 encerra a rodada. Avançar E2 diretamente de
2 para 4 era legal, mas entregaria essa sequência final ao adversário.

## Verificação e limite estratégico conhecido

Na raiz do repositório:

```bash
node --test tests/versus/lastro.test.mjs
```

Os testes reconstroem o exemplo e suas alternativas, verificam os estados
alcançáveis de uma rodada e encerram duelos por 2–0 e 1–1. Também cobrem
imutabilidade e a rejeição de recuos, saltos, trocas de trilho e desvios proibidos.

A análise do modelo aprovado encontrou 1.214 posições de aparelho alcançáveis,
três terminais e vantagem forçada de quem começa sob jogo perfeito. Alternar o
início em duas rodadas não demonstra equilíbrio divertido nem elimina estratégias
memorizadas. Ainda é necessária avaliação com jogadores; o motor não altera essa regra.
