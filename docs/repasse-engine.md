# REPASSE — motor, análise e garantias

## Regra única

`dist/repasse/engine.mjs` concentra as regras usadas pela partida, pelos certificados de campanha, pela geração e pela busca. Cada índice de `state.values` corresponde à mesma peça de `level.pieces` durante toda a partida; zero significa retirada. As quatro séries de `state.boxes` conservam separadas as `2R + 2C` caixas, inclusive nos cantos.

Uma retirada guarda o valor atual e determina todos os destinatários antes de alterar qualquer receptor. Cada direção recebe uma cópia inteira desse valor. A procura atravessa casas vazias e para no primeiro receptor presente; as setas do receptor não interferem no recebimento. A única peça removida é a escolhida. Receber não dispara novos eventos lógicos. A transição devolve os repasses calculados para que a interface apenas os represente.

O motor é puro: não altera a definição, o estado recebido, o histórico ou o DOM. Uma retirada inexistente ou repetida devolve o mesmo estado, `changed:false`, sem repasses. Estados que já excederam uma meta ainda aceitam hipóteses, permitindo observar as consequências e depois desfazer. A vitória só existe com zero peças e igualdade exata em todas as caixas. A definição inicial não depende do estado atual; reiniciar conserva peças e metas.

## Inteiros e validação

A definição aceita as onze configurações concretas previstas: quatro direções isoladas, horizontal, vertical, quatro pares ortogonais e as quatro direções simultâneas. Três setas, duplicação de uma direção e direções diagonais são rejeitadas.

Os limites de estrutura são 12 linhas, 12 colunas e 32 peças. Valores iniciais são inteiros positivos; metas e acumulados são inteiros não negativos. Todos devem caber em `Number.MAX_SAFE_INTEGER`.

A validação calcula em `BigInt` um limite conservador para todas as ordens, inclusive perdedoras: soma inicial multiplicada pelo produto da quantidade de setas de cada peça. A definição é rejeitada se esse limite excede o inteiro seguro. Esse limite pode rejeitar uma definição teoricamente segura que exija uma prova mais estreita; os catálogos de campanha e Endless usam valores muito menores. Durante a transição, cada soma também é conferida. Não há arredondamento, truncamento nem saturação visual do número.

`validateState` confere formatos, dimensões, valores atuais e limite aritmético. Isso verifica estrutura; a prova de que um snapshot pertence a uma história real depende da reprodução dos IDs de retirada, feita pela persistência. O motor não apresenta uma simples validação estrutural como certificado de alcançabilidade.

## Busca e condições de impossibilidade

`solve` usa busca em profundidade com cache de estados completamente explorados. A chave inclui todos os valores de peças e acumulados de bordas. Guardar apenas ocupação seria incorreto, porque ordens distintas podem deixar a mesma peça presente com valores diferentes.

As podas usam condições necessárias comprovadas:

- Uma caixa já excedeu a meta; valores futuros nunca a diminuem.
- A grade está vazia com alguma meta incorreta.
- O total que falta nas caixas é menor que o valor ainda contido nas peças; cada peça possui ao menos uma seta, portanto a massa total nunca diminui.
- O total que falta ultrapassa até o limite conservador de crescimento das peças restantes.
- Uma caixa incompleta não possui nenhuma peça presente na sua linha/coluna que possa emitir naquela direção. As orientações são fixas e nenhuma peça nova aparece.
- A peça mais próxima de uma borda, sem outro receptor entre ela e a caixa, emite para essa borda e já vale mais que o déficit. Ela inevitavelmente enviará pelo menos esse valor quando for retirada.

As demais impossibilidades exigem esgotar os estados candidatos. O limite de estados ou de tempo produz `inconclusive`, nunca `unsolvable`. Um resultado `solved` contém a sequência completa de retiradas restantes. Não há alegação de unicidade a partir de uma busca que para na primeira solução. `timeoutMs:Infinity` permite auditorias sem limite temporal, mantendo o limite de estados.

`createSimulator` é um adaptador preparado para auditoria em lote. Ele tira um snapshot da definição e compila as linhas uma única vez, chamando exatamente as mesmas funções internas de transição, prévia e classificação. Deve receber estados do seu próprio `initialState`/transições ou estados explicitamente validados. Não é uma segunda implementação das regras.

## Dicas a partir da posição atual

`dist/repasse/analysis.mjs` reproduz integralmente uma solução armazenada antes de usar seu sufixo. A posição atual precisa coincidir em todos os valores e caixas com uma posição dessa reprodução. Ordens alternativas são analisadas a partir do estado atual pelo mesmo solver.

Quando workers não estão disponíveis, `allowSearch:false` permite somente conclusão direta por excesso/final ou um sufixo conhecido certificado; o restante fica inconclusivo. Não há busca custosa síncrona escondida nesse caminho.

`hintFromSolution` reproduz novamente a continuação desde o estado atual antes de produzir texto. Os níveis 1 e 2 apontam destinatários e descrevem valores presentes, contribuições e uma continuação possível. O nível 3 informa posição exata, valor atual e destinos da retirada. As frases tratam a solução como uma possibilidade verificada e não inventam que aquela retirada seja a única ou obrigatória. Uma sequência incorreta não produz indicação de peça.

## Verificação independente

Comando: `node tests/repasse-engine.test.mjs`.

Resultado: 24 testes aprovados. O oráculo de referência percorre as casas da grade uma por uma e não importa as funções de transição, vitória, busca, chave ou poda do motor.

- Exemplo A: 24 ordens enumeradas, exatamente uma vencedora, valores retirados 1, 3, 7 e 10.
- Exemplo B: seis ordens em cada variante; duas soluções para Juntar, uma para Na hora certa e uma para Abrir caminho.
- Exemplo C: 720 ordens, seis vencedoras; todas respeitam as precedências especificadas, sem rejeitar permutações independentes.
- As onze configurações enviam valor inteiro; receptores permanecem no tabuleiro.
- Primeiro receptor, travessia de vazios, recepção independente da orientação e quatro caixas distintas em 1×1 conferidos.
- Pureza, retirada duplicada, replay inválido e restauração integral por snapshot conferidos.
- Valores seguros extremos, formatos inválidos, arrays esparsos e aritmética sem truncamento conferidos.
- 200 tabuleiros aleatórios comparados ao oráculo, incluindo a identidade de massa `(k − 1) × v` a cada retirada.
- Estados parciais de 60 fases pequenas comparados à enumeração independente de todas as ordens restantes: solver e podas concordaram em todos os casos.
- Dicas e certificados conferidos em uma ordem alternativa, com recusa de uma continuação inválida e distinção entre impossibilidade e interrupção de análise.

São verificações automáticas de regras e análise. Não equivalem a teste com jogadores nem à calibração humana de dificuldade.
