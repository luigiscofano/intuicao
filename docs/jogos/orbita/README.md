# ÓRBITA

[Catálogo dos jogos](../README.md) · [Apresentação](../../../README.md) · [Arquitetura](../../arquitetura/README.md)

**Permutações em anéis e objetivos simultâneos.** Categoria: Raciocínio lógico.

## O que o jogo faz

Um puzzle de planejamento em que peças circulam por anéis conectados e precisam encontrar seus alvos ao mesmo tempo.

Gire um anel para mover todas as suas peças juntas. Use as casas compartilhadas para preparar transferências e restaurar o que já estava certo.

## Problema e proposta pedagógica

Praticar planejamento de sequências, orientação espacial e antecipação de efeitos sobre objetivos simultâneos, usando posições temporárias e movimentos reversíveis.

Um giro pode entregar uma peça e tirar outra do lugar. Preparar a chegada, escolher a ordem das transferências e restaurar regiões convida a pensar nas relações entre as partes do tabuleiro.

Esses objetivos descrevem a intenção de prática do jogo. Não são resultados de um estudo de aprendizagem com usuários.

## Como abrir

Execute o servidor pelo [guia de instalação](../../setup/README.md), abra a página inicial, escolha **Raciocínio lógico** e depois **ÓRBITA**. O jogo participa da aplicação integrada; abrir um arquivo `.mjs` isolado não inicia sua interface.

## Regras e interação

1. Escolha um anel e use as setas curvas para girar no sentido horário ou anti-horário. Cada giro avança uma casa, salvo quando o controle indicar um passo diferente.
2. As casas e os alvos ficam no lugar. Todas as peças do anel escolhido se movem juntas; uma casa compartilhada pertence aos dois anéis, mas contém uma única peça.
3. Leve uma peça ao encontro dos anéis e gire o outro anel para transferi-la. Peças que já estão corretas continuam podendo se mover e voltar depois.
4. Complete todos os alvos simultaneamente. Símbolos iguais são equivalentes, e fichas neutras circulam normalmente pelas casas sem exigir um destino próprio.
5. Mais adiante, alguns anéis avançam duas casas, engrenagens movem anéis juntos e sensores liberam comandos quando o símbolo indicado ocupa a casa marcada. Cada novidade é explicada na própria fase.
6. Desfaça, refaça e reinicie livremente. Checar avalia sua configuração; movimentos de exploração não contam como erros. São 80 fases e desafios novos no Modo Sem Parar, sem cronômetro.

## Exemplo de raciocínio

Leve uma peça até a casa compartilhada entre dois anéis; ao girar o segundo, ela segue o novo percurso. A casa compartilhada contém uma única peça. A operação também move as outras peças do anel e pode desfazer um acerto anterior.

O exemplo ilustra uma regra, não uma fase específica do catálogo. Para reproduzir uma fase concreta, use sua definição e seu ID junto com a solução de referência correspondente.

## Conteúdo ativo

80 fases em seis faixas (15/15/15/15/15/5). Modos livres e desafios gerados são separados da campanha.

A posição exibida na seleção não é a identidade persistente da definição. Alterar uma fase pode exigir um novo ID, enquanto registros da fase anterior continuam arquivados. Referências antigas de catálogo precisam ser lidas junto do commit em que eram vigentes.

## Como a implementação funciona

Cada giro permuta a ocupação de um conjunto ordenado de casas. Casas e alvos permanecem fixos. Engrenagens e sensores acrescentam condições ao comando, e peças de mesmo símbolo são equivalentes para o objetivo.

| Arquivo principal | Responsabilidade |
| --- | --- |
| [engine.mjs](../../../dist/orbita/engine.mjs) | Motor / validação |
| [campaign.mjs](../../../dist/orbita/campaign.mjs) | Catálogo / conteúdo |
| [compact-catalog.mjs](../../../dist/orbita/compact-catalog.mjs) | Catálogo / conteúdo |
| [ring-selection.mjs](../../../dist/orbita/ring-selection.mjs) | Interface / integração |
| [ui.mjs](../../../dist/orbita/ui.mjs) | Interface / integração |

### Pontos de entrada no código

- `orbita/engine.mjs`: `validateLevel`, `createEngine`, `validateState`, `initialState`, `transition`, `preview`, `commandStatus`, `evaluateState`, `isWon`, `allowedMoves`.
- `orbita/campaign.mjs`: `campaignTier`, `campaignLevel`.
- `orbita/ring-selection.mjs`: `pickOrbitaRing`, `commandForOrbitaRing`.
- `orbita/ui.mjs`: `freshOrbitaData`, `normalizeOrbitaData`, `circularRecoverySeed`, `recoverOrbitaEndless`, `restoreOrbitaSession`, `serializeOrbitaSession`, `commitOrbitaCommand`, `recordOrbitaCompletion`, `endlessOptions`, `computeOrbitaBadgeLayout`.

Os nomes acima são extraídos dos exports presentes nesta base. Antes de chamar uma função, confira parâmetros, retornos e casos de erro no módulo e em seus testes; não assuma que todos os jogos compartilham a mesma assinatura.

## Roteiro para estudar ou alterar

1. Leia as regras e identifique a condição de vitória ou encerramento.
2. Acompanhe a representação de fase/mapa e de estado no módulo principal.
3. Localize o caminho entre ação do usuário, validação, transição e renderização.
4. Observe como reset, undo/redo e restauração são oferecidos nesta interface.
5. Encontre um teste da regra alterada e reproduza um caso mínimo antes de editar.
6. Quando houver catálogo novo, confira IDs, soluções, contagem e impacto no save.

## Verificação e riscos específicos

Preservar IDs das 72 fases não substituídas pelo catálogo compacto e não herdar conclusão nas oito novas definições. Algumas descrições históricas falam em 500/1.000 fases; a campanha ativa tem 80.

Use o [guia de testes](../../../tests/README.md) para diferenciar testes de regras, mocks de DOM e snapshots de entrega. Estes arquivos relacionados são pontos de investigação, não uma declaração de que todos passam na versão atual:

- [orbita-authored-patterns.test.mjs](../../../tests/orbita-authored-patterns.test.mjs)
- [orbita-build-campaign.mjs](../../../tests/orbita-build-campaign.mjs)
- [orbita-build-v2.mjs](../../../tests/orbita-build-v2.mjs)
- [orbita-build-v3.mjs](../../../tests/orbita-build-v3.mjs)
- [orbita-catalog.test.mjs](../../../tests/orbita-catalog.test.mjs)
- [orbita-circle-contract.test.mjs](../../../tests/orbita-circle-contract.test.mjs)
- [orbita-compact-catalog.test.mjs](../../../tests/orbita-compact-catalog.test.mjs)
- [orbita-compact-presentation.test.mjs](../../../tests/orbita-compact-presentation.test.mjs)
- [orbita-design-evidence.test.mjs](../../../tests/orbita-design-evidence.test.mjs)
- [orbita-diversity-v2.test.mjs](../../../tests/orbita-diversity-v2.test.mjs)
- [orbita-engine-fixtures.mjs](../../../tests/orbita-engine-fixtures.mjs)
- [orbita-engine.test.mjs](../../../tests/orbita-engine.test.mjs)
- [orbita-generator.test.mjs](../../../tests/orbita-generator.test.mjs)
- [orbita-independent-audit.mjs](../../../tests/orbita-independent-audit.mjs)
- [orbita-integration.test.mjs](../../../tests/orbita-integration.test.mjs)
- [orbita-keyboard-shortcuts.test.mjs](../../../tests/orbita-keyboard-shortcuts.test.mjs)

Quando a mudança é visual, valide entrada no jogo, leitura das regras, interação principal, retorno e tamanhos de tela. Quando toca regras ou saves, acrescente casos de entradas inválidas, repetição da ação e restauração. Não conclua que uma busca encontrou solução única se ela esgotou seu orçamento.

## Documentação de referência

- [docs/orbita-engine.md](../../../docs/orbita-engine.md)
- [docs/orbita-compact-catalog-2026-10-31.md](../../../docs/orbita-compact-catalog-2026-10-31.md)
- [docs/orbita80](../../../docs/orbita80)

## Estado e limites

Guia da base `2354a3c`, reorganizada sem mudar código executável. Revisões posteriores só devem ser descritas depois de incorporadas e verificadas. Nenhuma publicação do site decorre deste manual. A organização local ainda precisa ser enviada ao repositório privado e passar pela revisão remota.
