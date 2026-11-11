# DOBRA

Dois cartógrafos disputam um atlas 6×6 de 36 unidades de área. Cada turno coloca um selo e dobra uma borda inteira para dentro, somando a área e os selos das pilhas sobrepostas. Após oito turnos, o mapa chega a 2×2. Cada distrito pertence à equipe com mais selos; igualdade deixa sua área neutra.

## Organização

- `engine.mjs`: colocação do selo, fusão das pilhas, reindexação e pontuação por maioria.
- `view.mjs`: seleção do painel, quatro abas de dobra e prévia do mapa resultante.
- `view.css`: papel, pilhas, contadores sempre visíveis e adaptação da grade à tela.
- `index.mjs`: regras completas e metadados da coleção.
- `tests/versus/dobra.test.mjs`: exemplos aprovados, conservação, quatro direções, fim e empate.

## Estado e ações

`rows` e `columns` indicam as dimensões atuais. `tiles` é um vetor por linhas; cada entrada contém `{ area, seals: [verde, ambar] }`. `reserves` começa em `[4, 4]`. A soma das áreas permanece 36; a soma dos selos no mapa e na reserva permanece quatro por equipe.

Uma ação completa é `{ type: 'fold', cell: 7, edge: 'west' }`: primeiro entra o selo na casa indicada, depois a borda é dobrada. As bordas aceitas são `north`, `south`, `west` e `east`. Uma dimensão com duas casas não pode mais encolher.

A grade devolvida pelo motor já está reindexada. Colunas voltam a ser A, B, C… e linhas voltam a ser 1, 2, 3… após cada dobra. A pilha de destino recebe todos os selos; não existe informação de verso escondida.

Na preparação há 144 ações completas possíveis: 36 posições de selo e quatro bordas. A avaliação do motor é heurística e não faz busca recursiva; o orçamento de busca pertence ao bot compartilhado.

## Exemplo verificado

1. Verde marca C1 e dobra o topo: 5×6, selo verde na nova C1.
2. Âmbar marca D5 e dobra a base: 4×6, selo âmbar na nova D4.
3. Verde marca B2 e dobra a esquerda: 4×5; selos verdes em A2 e B1, âmbar em C4. A coluna A passa a ter áreas 4, 2, 2 e 4.
4. Âmbar marca B1 e dobra o topo: a nova B1 tem área 3 e um selo de cada equipe, portanto é neutra. A nova A1 tem área 6 e um selo verde.

## Interação e verificação

Selecionar uma pilha prepara o local do selo; escolher uma borda produz a prévia completa. A prévia mostra as novas dimensões, coordenadas, áreas e selos. O mapa de prévia não aceita uma nova seleção de casa, porque suas coordenadas já pertencem ao estado futuro; é possível experimentar outra borda ou cancelar pelo controlador.

`selectionForMove(state, move)` recupera o painel e a borda de uma dica do treino usando as coordenadas anteriores à dobra. Assim, a pessoa pode mudar a borda sem perder o painel marcado nem interpretar uma coordenada futura como atual.

Execute `node --test tests/versus/dobra.test.mjs`. Os testes cobrem as quatro bordas com entradas congeladas e encerramentos válidos por vitória e empate, incluindo um atlas final com áreas controladas 25 a 1. A implementação preserva as regras aprovadas; equilíbrio e duração ainda dependem de partidas reais.
