# DESVIO

[Catálogo dos jogos](../README.md) · [Apresentação](../../../README.md) · [Arquitetura](../../arquitetura/README.md)

**Jogo por turnos e espaço de possibilidades.** Categoria: Versus.

## O que o jogo faz

Um duelo de estratégia por turnos em que cada escolha limita as opções do adversário.

Escolha uma casa e envie o adversário para a linha ou coluna indicada. Quem ficar sem jogada disponível perde.

## Problema e proposta pedagógica

Praticar antecipação, planejamento por turnos e comparação de alternativas, considerando não só a própria jogada, mas também as respostas do adversário.

A proposta pedagógica é explorar as consequências de uma decisão: cada escolha retira uma opção do tabuleiro e determina quais escolhas o outro jogador terá.

Esses objetivos descrevem a intenção de prática do jogo. Não são resultados de um estudo de aprendizagem com usuários.

## Como abrir

Execute o servidor pelo [guia de instalação](../../setup/README.md), abra a página inicial, escolha **Versus** e depois **DESVIO**. O jogo participa da aplicação integrada; abrir um arquivo `.mjs` isolado não inicia sua interface.

## Regras e interação

1. Na partida comum, a primeira escolha é livre. Depois, escolha uma casa disponível no destino indicado e confirme a jogada.
2. Uma casa com ↔ envia o adversário para a mesma linha; uma casa com ↕ o envia para a mesma coluna.
3. A casa escolhida é consumida e não pode ser usada de novo. Casas consumidas não bloqueiam o caminho: qualquer casa disponível na linha ou coluna obrigatória pode ser escolhida.
4. Os jogadores alternam as escolhas. Quem não tiver jogada legal na sua vez perde. Há partidas locais, contra o bot e treino com análise.

## Exemplo de raciocínio

Escolher uma casa com ↔ obriga o adversário a escolher uma casa disponível daquela linha. Uma casa consumida entre duas casas disponíveis não bloqueia passagem: o destino é uma restrição de escolha, não um corredor percorrido por uma peça.

O exemplo ilustra uma regra, não uma fase específica do catálogo. Para reproduzir uma fase concreta, use sua definição e seu ID junto com a solução de referência correspondente.

## Conteúdo ativo

Duelo por escolha de casas, com partidas locais, bot e treino; não é campanha numerada.

A posição exibida na seleção não é a identidade persistente da definição. Alterar uma fase pode exigir um novo ID, enquanto registros da fase anterior continuam arquivados. Referências antigas de catálogo precisam ser lidas junto do commit em que eram vigentes.

## Como a implementação funciona

O estado guarda casas disponíveis, jogador e restrição de linha/coluna. O motor rejeita callbacks com jogador ou turno desatualizados. A análise estratégica avalia a posição do jogador da vez.

| Arquivo principal | Responsabilidade |
| --- | --- |
| [desvio.mjs](../../../dist/desvio.mjs) | Interface / integração |
| [desvio-hints.mjs](../../../dist/desvio-hints.mjs) | Interface / integração |
| [collection-state.mjs](../../../dist/collection-state.mjs) | Progresso / compatibilidade |
| [collection-ui.mjs](../../../dist/collection-ui.mjs) | Interface / integração |

### Pontos de entrada no código

- `desvio.mjs`: `createDesvio`, `legalDesvioMoves`, `applyDesvioMove`, `analyzeDesvio`, `explainDesvioMove`, `chooseDesvioBotMove`, `replayDesvio`, `revancheDesvio`, `firstDesvioMistake`, `createDesvioChallenge`.
- `desvio-hints.mjs`: `buildDesvioContextHint`.
- `collection-state.mjs`: `createHistory`, `commitHistory`, `undoHistory`, `redoHistory`, `dailyIndex`, `loadCollection`, `saveCollection`, `recordEvent`.
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

Cobrir primeira escolha livre, casas consumidas, restrição de destino e derrota por ausência de jogada. Não apresentar bot ou treino local como multiplayer pela internet.

Use o [guia de testes](../../../tests/README.md) para diferenciar testes de regras, mocks de DOM e snapshots de entrega. Estes arquivos relacionados são pontos de investigação, não uma declaração de que todos passam na versão atual:

- [desvio-context-hints-tests.mjs](../../../tests/desvio-context-hints-tests.mjs)

Quando a mudança é visual, valide entrada no jogo, leitura das regras, interação principal, retorno e tamanhos de tela. Quando toca regras ou saves, acrescente casos de entradas inválidas, repetição da ação e restauração. Não conclua que uma busca encontrou solução única se ela esgotou seu orçamento.

## Documentação de referência

- [dist/CONTROLES-DIRETOS.md](../../../dist/CONTROLES-DIRETOS.md)
- [dist/INTERACAO-DIRETA-MATRIZ.md](../../../dist/INTERACAO-DIRETA-MATRIZ.md)

## Estado e limites

Guia da base `2354a3c`, reorganizada sem mudar código executável. Revisões posteriores só devem ser descritas depois de incorporadas e verificadas. Nenhuma publicação do site decorre deste manual. A organização local ainda precisa ser enviada ao repositório privado e passar pela revisão remota.
