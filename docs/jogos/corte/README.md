# Corte certo

[Catálogo dos jogos](../README.md) · [Apresentação](../../../README.md) · [Arquitetura](../../arquitetura/README.md)

**Estimativa de áreas, porcentagens e geometria.** Categoria: Intuição.

## O que o jogo faz

Um puzzle de estimativa de áreas em que uma linha ou curva divide uma figura.

Ajuste a linha ou curva até que o lado roxo tenha a porcentagem pedida da área útil da figura. Espaços vazios não contam.

## Problema e proposta pedagógica

Praticar estimativa de áreas, proporções e porcentagens, comparando a impressão visual com a medida apresentada pelo jogo.

A proposta pedagógica é explorar a diferença entre tamanho aparente e área: formas, curvas e vazios convidam a testar estimativas e refinar o raciocínio proporcional.

Esses objetivos descrevem a intenção de prática do jogo. Não são resultados de um estudo de aprendizagem com usuários.

## Como abrir

Execute o servidor pelo [guia de instalação](../../setup/README.md), abra a página inicial, escolha **Intuição** e depois **Corte certo**. O jogo participa da aplicação integrada; abrir um arquivo `.mjs` isolado não inicia sua interface.

## Regras e interação

1. Observe a meta e ajuste a linha ou curva para deixar essa porcentagem da área útil no lado roxo.
2. No Desafio básico, mova o corte apenas na direção indicada pela seta. A aba Controles da curva oferece outros ajustes, sem mudar a família de curva da fase.
3. Conte somente a parte preenchida da figura: buracos e recortes vazios não entram na área, mesmo quando o corte passa por eles.
4. Confirme sua resposta. É aceito um resultado até 3 pontos percentuais acima ou abaixo da meta, incluindo os limites.

## Exemplo de raciocínio

Se a meta é 40%, resultados de 37% a 43%, incluindo os limites, são aceitos. Um buraco na silhueta não entra no denominador da área útil: mover o corte sobre esse vazio não acrescenta área preenchida.

O exemplo ilustra uma regra, não uma fase específica do catálogo. Para reproduzir uma fase concreta, use sua definição e seu ID junto com a solução de referência correspondente.

## Conteúdo ativo

80 fases em seis faixas (15/15/15/15/15/5). Modos livres e desafios gerados são separados da campanha.

A posição exibida na seleção não é a identidade persistente da definição. Alterar uma fase pode exigir um novo ID, enquanto registros da fase anterior continuam arquivados. Referências antigas de catálogo precisam ser lidas junto do commit em que eram vigentes.

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

## Estado e limites

Guia da base `2354a3c`, reorganizada sem mudar código executável. Revisões posteriores só devem ser descritas depois de incorporadas e verificadas. Nenhuma publicação do site decorre deste manual. A organização local ainda precisa ser enviada ao repositório privado e passar pela revisão remota.
