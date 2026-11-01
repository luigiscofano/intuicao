# ELO

[Catálogo dos jogos](../README.md) · [Apresentação](../../../README.md) · [Arquitetura](../../arquitetura/README.md)

**Regiões, grafos e restrições locais e globais.** Categoria: Raciocínio lógico.

## O que o jogo faz

Um puzzle de lógica em que pontos de regiões diferentes formam um circuito fechado.

Coloque um ponto por região para formar um único circuito. As ligações são automáticas; observe também as pistas especiais de cada fase.

## Problema e proposta pedagógica

Praticar dedução lógica, visão espacial e articulação entre condições locais e globais, acompanhando como mover um ponto altera o circuito inteiro.

A proposta pedagógica é transformar conexões simples em um problema de planejamento: cada escolha precisa respeitar sua região e, ao mesmo tempo, contribuir para uma estrutura única.

Esses objetivos descrevem a intenção de prática do jogo. Não são resultados de um estudo de aprendizagem com usuários.

## Como abrir

Execute o servidor pelo [guia de instalação](../../setup/README.md), abra a página inicial, escolha **Raciocínio lógico** e depois **ELO**. O jogo participa da aplicação integrada; abrir um arquivo `.mjs` isolado não inicia sua interface.

## Regras e interação

1. Coloque exatamente um ponto em cada região, mantendo os pontos fixos. Cada ponto se liga automaticamente ao primeiro ponto encontrado em cada direção horizontal ou vertical; fronteiras e anotações X não bloqueiam essas ligações.
2. Todos os pontos devem formar um único circuito fechado, com exatamente duas ligações por ponto e sem cruzamentos fora dos pontos. Trechos retos são permitidos e não é preciso ocupar todas as casas.
3. Nas fases com pistas especiais, respeite curvas ou retas obrigatórias, contagens exatas de pontos por linha ou coluna e a soma indicada dos comprimentos das duas ligações de uma região.
4. Passagens marcadas ficam sem ponto e devem ser atravessadas pelo interior de uma ligação; trechos vedados não podem ser percorridos. Nos grupos de escolha, atravesse exatamente uma das passagens, deixando as demais sem travessia.
5. Outras pistas exigem ligação direta entre regiões, ordem dos marcos no circuito ou número exato de travessias de uma linha de referência. A ordem aceita os dois sentidos e pode ter outras regiões entre os marcos. Confira as pistas da fase e confirme a resposta.

## Exemplo de raciocínio

Quatro pontos podem formar um retângulo fechado, mas dois retângulos separados não resolvem o desafio: todos os pontos precisam pertencer ao mesmo circuito. Colocar um novo ponto alinhado pode mudar quem é o primeiro vizinho encontrado.

O exemplo ilustra uma regra, não uma fase específica do catálogo. Para reproduzir uma fase concreta, use sua definição e seu ID junto com a solução de referência correspondente.

## Conteúdo ativo

80 fases em seis faixas (15/15/15/15/15/5). Modos livres e desafios gerados são separados da campanha.

A posição exibida na seleção não é a identidade persistente da definição. Alterar uma fase pode exigir um novo ID, enquanto registros da fase anterior continuam arquivados. Referências antigas de catálogo precisam ser lidas junto do commit em que eram vigentes.

## Como a implementação funciona

O circuito pode ser visto como um grafo: pontos são vértices e alinhamentos válidos são arestas. Grau dois em cada vértice é necessário, mas ainda é preciso verificar conectividade global e ausência de cruzamentos.

| Arquivo principal | Responsabilidade |
| --- | --- |
| [elo-rules.mjs](../../../dist/elo-rules.mjs) | Motor / validação |
| [geometry-games.mjs](../../../dist/geometry-games.mjs) | Motor / validação |
| [elo-campaign.mjs](../../../dist/elo-campaign.mjs) | Catálogo / conteúdo |
| [elo-progress.mjs](../../../dist/elo-progress.mjs) | Progresso / compatibilidade |
| [collection-ui.mjs](../../../dist/collection-ui.mjs) | Interface / integração |

### Pontos de entrada no código

- `elo-rules.mjs`: `eloPointAllowed`, `eloEdges`, `eloCrossing`, `validateElo`, `analyzeEloLocal`, `solveElo`.
- `geometry-games.mjs`: `supportCells`, `initialGeometryState`, `validateGeometry`, `geometryShapes`, `prumoDomains`, `solveGeometry`, `geometryHint`, `geometryCandidates`, `geometryLocalAnalysis`.
- `elo-progress.mjs`: `migrateEloProgress`.
- `collection-ui.mjs`: `initCollection`.

Os nomes acima são extraídos dos exports presentes nesta base. Antes de chamar uma função, confira parâmetros, retornos e casos de erro no módulo e em seus testes; não assuma que todos os jogos compartilham a mesma assinatura.

## Roteiro para estudar ou alterar

1. Leia as regras e identifique a condição de vitória ou encerramento.
2. Acompanhe a representação de fase/mapa e de estado no módulo principal.
3. Localize o caminho entre ação do usuário, validação, transição e renderização.
4. Observe como reset, undo/redo e restauração são oferecidos nesta interface.
5. Encontre um teste da regra alterada e reproduza um caso mínimo antes de editar.
6. Quando houver catálogo novo, confira IDs, soluções, contagem e impacto no save.

## Verificação e riscos específicos

Cobrir ponto fixo, exatamente um ponto por região, cruzamentos, múltiplos ciclos, pistas especiais e anotações X. Uma anotação não se transforma em parede nem bloqueia a ligação automática.

Use o [guia de testes](../../../tests/README.md) para diferenciar testes de regras, mocks de DOM e snapshots de entrega. Estes arquivos relacionados são pontos de investigação, não uma declaração de que todos passam na versão atual:

- [elo-campaign-apply-editorial.mjs](../../../tests/elo-campaign-apply-editorial.mjs)
- [elo-campaign-build.mjs](../../../tests/elo-campaign-build.mjs)
- [elo-campaign-finalize.mjs](../../../tests/elo-campaign-finalize.mjs)
- [elo-campaign-reasoning.mjs](../../../tests/elo-campaign-reasoning.mjs)
- [elo-campaign-tests.mjs](../../../tests/elo-campaign-tests.mjs)
- [elo-clue-explanations-tests.mjs](../../../tests/elo-clue-explanations-tests.mjs)
- [elo-clue-explanations-ui-tests.mjs](../../../tests/elo-clue-explanations-ui-tests.mjs)
- [elo-explanations-history.mjs](../../../tests/elo-explanations-history.mjs)
- [elo-explanations-preservation-tests.mjs](../../../tests/elo-explanations-preservation-tests.mjs)
- [elo-region-colors.test.mjs](../../../tests/elo-region-colors.test.mjs)
- [elo-rules-tests.mjs](../../../tests/elo-rules-tests.mjs)
- [elo-toggle-placement.test.mjs](../../../tests/elo-toggle-placement.test.mjs)
- [elo-tools-row.test.mjs](../../../tests/elo-tools-row.test.mjs)
- [elo-ui-interactions.mjs](../../../tests/elo-ui-interactions.mjs)
- [elo-ui-presentation.mjs](../../../tests/elo-ui-presentation.mjs)
- [elo-v3-answer-oracle-tests.mjs](../../../tests/elo-v3-answer-oracle-tests.mjs)

Quando a mudança é visual, valide entrada no jogo, leitura das regras, interação principal, retorno e tamanhos de tela. Quando toca regras ou saves, acrescente casos de entradas inválidas, repetição da ação e restauração. Não conclua que uma busca encontrou solução única se ela esgotou seu orçamento.

## Documentação de referência

- [docs/elo80/README.md](../../../docs/elo80/README.md)
- [docs/elo-expanded-variety-2026-10-31.md](../../../docs/elo-expanded-variety-2026-10-31.md)

## Estado e limites

Guia da base `2354a3c`, reorganizada sem mudar código executável. Revisões posteriores só devem ser descritas depois de incorporadas e verificadas. Nenhuma publicação do site decorre deste manual. A organização local ainda precisa ser enviada ao repositório privado e passar pela revisão remota.
