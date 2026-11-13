# Seleção de níveis compacta

Os botões das 12 campanhas usam uma única dimensão: **64 × 64 pixels CSS**, tanto no celular quanto no computador. As colunas têm largura fixa; mais espaço produz mais colunas, não cartões maiores. Faixas com apenas cinco fases mantêm o mesmo tamanho das demais.

- Espaçamento de 8 px, cantos de 8 px e números de 19 px.
- Textos de estado continuam disponíveis, com quebra em duas linhas quando necessária.
- Foco de teclado, fase atual, estados de conclusão e cores de dificuldade preservados.
- Alvo de toque de 64 px, sem reduzir abaixo de 44 px.
- Nenhuma alteração em regras, dados de fases, saves, seleção de mapas Versus ou layout do tabuleiro.

## Verificação

QA real de navegador no Site: 12 campanhas × larguras 320, 390, 768 e 1280 px, 48 casos. Cada caso exibiu 80 botões medidos em 64 × 64 px, sem conteúdo ultrapassando os botões. Abertura por clique e foco de teclado verificados em Reflexos. Após integração com nomes, a seleção e abertura das 12 campanhas foram novamente verificadas em 320 e 1280 px.

Teste de contrato: `node --test tests/selection-presentation.test.mjs`.
