# Endless: geração da coleção

Este documento descreve somente o modo novo. Os catálogos e as regras das campanhas não são modificados.

## Contrato

`generateCollectionEndless(game, seed, options)` retorna `{level, answer, options}`. `answer` é um estado do jogo, exceto DESVIO, onde é `null`: um duelo não tem uma resposta única a preencher. Os campos da resposta são `positions` para ELO, `assignments` para PRUMO e `values` para PACTO. `normalizeCollectionOptions` normaliza somente opções reconhecidas, e `collectionOptionSpec` fornece os controles do painel.

A mesma semente com as mesmas opções produz o mesmo desafio. O gerador não importa catálogos nem gabaritos da campanha. A semente participa da construção, não apenas da escolha de um item de uma lista. Cada resultado é validado pelo motor usado ao confirmar respostas. A existência de uma solução conhecida não implica unicidade, dificuldade humana calibrada ou ausência matemática de repetições.

## ELO

- Grades quadradas de 4 a 10 casas por lado.
- 4, 6 ou 8 regiões; uma peça fixa opcional.
- Quatro regiões partem de um circuito retangular. Seis e oito partem de circuitos ortogonais côncavos, com coordenadas, reflexão, transposição e rótulos variáveis.
- As regiões são construídas por crescimento aleatório desde os pontos da solução. Isso mantém cada região conectada e garante uma peça por região na solução gerada.
- O validador confere grau dois, circuito único, ausência de cruzamentos e pistas fixas. As regiões não são simplesmente retângulos previamente catalogados.

## PRUMO

- Grades quadradas de 4 a 10 casas por lado; de 2 a 10 apoios/peças.
- O gerador faz uma partição retangular recursiva aleatória. Cada retângulo final tem ao menos uma dimensão ímpar: seu centro de massa cai no centro de uma casa ou no meio de um lado, nunca na interseção de quatro casas.
- Cada divisão preserva pelo menos uma peça com três ou mais casas. Como um apoio incide em no máximo duas casas, a inicialização automática nunca entrega o tabuleiro já completo.
- Os centros e todas as atribuições são validados pelos momentos exatos nos dois eixos, conectividade, cobertura e incidência dos apoios.
- A solução construída usa peças retangulares. As regras do jogo continuam aceitando qualquer partição conectada e equilibrada, inclusive soluções assimétricas. Não se promete uma solução exclusiva nem variedade irrestrita de formas nesta versão do gerador.
- Grades grandes não devem acionar o solucionador exato antigo: sua enumeração é limitada a 36 casas e pode exceder o orçamento antes disso. No Endless, dicas devem ser locais e honestas; o gabarito usa a solução validada gerada.

## PACTO

- A grade permanece 8 × 8. Quatro símbolos com exatamente duas ocorrências por linha/coluna exigem oito casas; mudar a grade sem mudar as quotas seria incorreto.
- São configuráveis 24, 32 ou 40 pistas iniciais.
- A solução é construída com dois blocos latinos aleatorizados de dominós, símbolos e colunas permutados, sem repetição vertical entre linhas vizinhas; transposição e reflexões variam a orientação.
- As pistas são escolhidas aleatoriamente na solução construída. A quantidade de pistas não é apresentada como grau certificado de dificuldade ou prova de unicidade.

## DESVIO

- Grades 3 × 3, 3 × 4 e 4 × 4, com orientação de cada seta gerada independentemente.
- O limite de 16 casas é uma restrição real do motor de mapas/bitmask e do bot existente, não uma promessa de grades maiores.
- O mapa é validado criando a partida e conferindo que existe jogada inicial. Não se garante equilíbrio teórico entre os jogadores.

## Verificação

Executar `node tests/endless-collection-tests.mjs`.

A suíte cobre 15.000 combinações de sementes e opções: 4.200 ELO, 6.300 PRUMO, 3.000 PACTO e 1.500 DESVIO. Confere soluções pelo motor real, número de regiões/apoios/pistas, incidências sem colisão, PRUMO ainda incompleto após a inicialização real e duelos até o estado terminal. Também verifica determinismo, diversidade estrutural em 200 sementes por jogo, concavidade dos ciclos ELO 6/8 e ausência de dependências dos catálogos da campanha.
