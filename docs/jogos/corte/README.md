# Corte certo

[Catálogo atual](../README.md) · [Projeto](../../../README.md) · [Arquitetura](../../arquitetura/README.md)

Um puzzle de estimativa de áreas em que uma linha ou curva divide uma figura.

## Objetivo

**Deixe no lado roxo a porcentagem pedida. Por exemplo: 50% é metade da figura.**

## Como começar

1. Leia a meta: 50% significa metade da área preenchida.
2. Mova a linha ou curva. Buracos e espaços vazios não contam.
3. Confirme sua estimativa. A margem aceita é de 3 pontos percentuais.

## Regras completas

1. Confira a meta. Mova a linha ou ajuste a curva para mudar o tamanho da parte roxa.
2. Conte só a parte preenchida da figura. Buracos e espaços vazios não entram na conta.
3. No Desafio básico, mova o corte na direção da seta. Use Controles da curva para os outros ajustes disponíveis, sem trocar o tipo de curva da fase.
4. Confirme sua resposta. A margem aceita é de 3 pontos percentuais para mais ou para menos: uma meta de 50% aceita de 47% a 53%.

## Exemplo de raciocínio

A meta é 50%: mover o corte ao centro divide o retângulo ao meio.

## O que observar

A proposta pedagógica é explorar a diferença entre tamanho aparente e área: formas, curvas e vazios convidam a testar estimativas e refinar o raciocínio proporcional.

Não conclua uma solução apenas pela aparência. Leia as pistas da fase e confira a condição de término acima. Pistas fixas e a identidade da fase devem ser preservadas. Dicas ou solução assistida não equivalem a uma conclusão independente.

## Proposta pedagógica

Praticar estimativa de áreas, proporções e porcentagens, comparando a impressão visual com a medida apresentada pelo jogo.

Essas são intenções de design e oportunidades de prática, não resultados acadêmicos medidos.

## Identidade visual e leitura

As cores, peças e ilustrações ajudam a distinguir estados e ações. A arte não concede poderes ou altera as regras. Veja a [galeria da identidade](../../identidade/README.md) e os [recursos de fauna e flora](../../../README.md#fauna-flora-e-objetos-com-funcao).

## Onde está implementado

- [dist/curves.mjs](../../../dist/curves.mjs)
- [dist/cut-campaign.mjs](../../../dist/cut-campaign.mjs)

As regras desta página foram confrontadas com os textos publicados em [game-info-content.mjs](../../../dist/game-info-content.mjs), os [guias rápidos](../../../dist/rules-quick-start.mjs) e os adaptadores próprios da família. Quantidades dependentes de mapa não devem ser tratadas como constantes universais.

## Preservação e verificação

O progresso usa o armazenamento local e o [backup compartilhado](../../../dist/progress-backup.mjs). Não reutilize número editorial como identificador de save. Ao alterar este jogo, confira ações válidas e inválidas, retorno à seleção, desfazer/refazer quando oferecidos, conclusão ou término, restauração e telas estreitas.

[Guia de testes](../../../tests/README.md) · [Qualidade](../../qualidade/README.md). Uma captura demonstra apresentação, não comprova sozinha toda a mecânica. As regras documentadas devem acompanhar o código, não substituir testes do motor.


## Referência técnica complementar

Os links abaixo preservam o mapa técnico documentado do jogo. Relatórios datados mantêm o escopo da revisão original, não certificam automaticamente a versão atual.

## Como a implementação funciona

A medida deve trabalhar com a região útil e com as interseções da curva. A posição visual do corte não é uma aproximação suficiente da porcentagem quando há recortes ou figuras assimétricas.

| Arquivo principal | Responsabilidade |
| --- | --- |
| [geometry-check.mjs](../../../dist/geometry-check.mjs) | Motor / validação |
| [curves.mjs](../../../dist/curves.mjs) | Interface / integração |
| [cut-campaign.mjs](../../../dist/cut-campaign.mjs) | Catálogo / conteúdo |
| [cut-campaign-progress.mjs](../../../dist/cut-campaign-progress.mjs) | Catálogo / conteúdo |
| [cut-fauna-geometry.mjs](../../../dist/cut-fauna-geometry.mjs) | Interface / integração |
| [app.mjs](../../../dist/app.mjs) | Interface / integração |

### Pontos de entrada no código

- `geometry-check.mjs`: `checkReferenceAvailable`, `playerCells`, `prepareManualCheck`, `finishGeometryCheck`, `createManualCheck`.
- `curves.mjs`: `shapePolygon`, `curveValue`, `secondBound`, `regionGeometry`, `basicCutState`, `curvedCut`.
- `cut-campaign-progress.mjs`: `createCutCampaignProgress`.
- `cut-fauna-geometry.mjs`: `getFaunaGeometry`, `cutFaunaArea`.

Os nomes acima são extraídos dos exports presentes nesta base. Antes de chamar uma função, confira parâmetros, retornos e casos de erro no módulo e em seus testes; não assuma que todos os jogos compartilham a mesma assinatura.

## Roteiro para estudar ou alterar

1. Leia as regras e identifique a condição de vitória ou encerramento.
2. Acompanhe a representação de fase/mapa e de estado no módulo principal.
3. Localize o caminho entre ação do usuário, validação, transição e renderização.
4. Observe como reset, undo/redo e restauração são oferecidos nesta interface.
5. Encontre um teste da regra alterada e reproduza um caso mínimo antes de editar.
6. Quando houver catálogo novo, confira IDs, soluções, contagem e impacto no save.

## Verificação e riscos específicos

Testar limites inclusivos da tolerância, vazios sobrepostos, família de curva e solução usando somente o deslocamento permitido no modo básico. Não alterar a silhueta para acomodar um cálculo errado.

Use o [guia de testes](../../../tests/README.md) para diferenciar testes de regras, mocks de DOM e snapshots de entrega. Estes arquivos relacionados são pontos de investigação, não uma declaração de que todos passam na versão atual:

- [corte-v2-geometry.mjs](../../../tests/corte-v2-geometry.mjs)
- [corte80-actual-history.mjs](../../../tests/corte80-actual-history.mjs)
- [corte80-build.mjs](../../../tests/corte80-build.mjs)
- [corte80-controls-preservation.mjs](../../../tests/corte80-controls-preservation.mjs)
- [corte80-document.mjs](../../../tests/corte80-document.mjs)
- [corte80-independent.mjs](../../../tests/corte80-independent.mjs)
- [corte80-preservation.mjs](../../../tests/corte80-preservation.mjs)
- [corte80-progress.mjs](../../../tests/corte80-progress.mjs)
- [corte80-ui-preservation.mjs](../../../tests/corte80-ui-preservation.mjs)
- [corte80-ui.mjs](../../../tests/corte80-ui.mjs)
- [cut-emphasis.test.mjs](../../../tests/cut-emphasis.test.mjs)
- [cut-fauna-geometry.test.mjs](../../../tests/cut-fauna-geometry.test.mjs)
- [cut-fauna-integration.test.mjs](../../../tests/cut-fauna-integration.test.mjs)
- [cut-master-geometry.test.mjs](../../../tests/cut-master-geometry.test.mjs)
- [cut-master-integration.test.mjs](../../../tests/cut-master-integration.test.mjs)
- [cut-terminal.test.mjs](../../../tests/cut-terminal.test.mjs)

Quando a mudança é visual, valide entrada no jogo, leitura das regras, interação principal, retorno e tamanhos de tela. Quando toca regras ou saves, acrescente casos de entradas inválidas, repetição da ação e restauração. Não conclua que uma busca encontrou solução única se ela esgotou seu orçamento.

## Documentação de referência

- [dist/CORTE80-VALIDACAO.md](../../../dist/CORTE80-VALIDACAO.md)
- [docs/corte80](../../../docs/corte80)
