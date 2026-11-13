# Repasse: respiro entre peças e moldura

A referência enviada mostrava os coletores inferiores quase encostados na moldura. A regra anterior acrescentava 24 px somente no topo, deixando apenas 2 px na parte inferior.

A correção aplica 24 px nas duas extremidades verticais do contêiner compartilhado. Não altera largura, células, coletores, regras, campanhas, controles ou dados. O aumento total é de 22 px de altura externa, sem reduzir as peças. Campanha, modo sem parar e tabuleiros importados usam a mesma regra; nenhuma condição depende das jogadas.

O teste de contrato verifica a reserva vertical, o espaço dos indicadores e a preservação dos tamanhos das peças. O teste antigo dependia de um commit histórico e exigia que nenhum outro arquivo do site tivesse mudado desde então; foi substituído por verificações locais pertinentes à regra.
