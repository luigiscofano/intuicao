# PRUMO

[Catálogo dos jogos](../README.md) · [Apresentação](../../../README.md) · [Arquitetura](../../arquitetura/README.md)

**Partição conectada e centro de massa.** Categoria: Raciocínio lógico.

## O que o jogo faz

Um puzzle de equilíbrio em que você desenha peças ao redor de seus apoios.

Divida a grade em peças conectadas e equilibradas. O centro de massa de cada peça deve coincidir com seu apoio.

## Problema e proposta pedagógica

Praticar raciocínio espacial e explorar centro de massa, equilíbrio e compensação entre quantidade e distância.

A proposta pedagógica é permitir que o equilíbrio seja investigado com formas: uma peça não precisa ser simétrica para compensar seus dois lados.

Esses objetivos descrevem a intenção de prática do jogo. Não são resultados de um estudo de aprendizagem com usuários.

## Como abrir

Execute o servidor pelo [guia de instalação](../../setup/README.md), abra a página inicial, escolha **Raciocínio lógico** e depois **PRUMO**. O jogo participa da aplicação integrada; abrir um arquivo `.mjs` isolado não inicia sua interface.

## Regras e interação

1. Pinte todas as casas, sem sobreposição, formando uma peça para cada apoio. As casas de uma peça devem estar conectadas pelos lados.
2. Cada peça contém seu próprio apoio. As casas que tocam um apoio pertencem à sua peça; se o apoio fica entre duas casas, ambas precisam fazer parte dela.
3. Todas as casas têm a mesma massa. O centro de massa de cada peça deve coincidir exatamente com o apoio, tanto na horizontal quanto na vertical.
4. Considere a quantidade de casas e suas distâncias ao apoio: formas assimétricas também podem se equilibrar. Confirme quando toda a grade estiver preenchida.

## Exemplo de raciocínio

Três casas de mesma massa em x=0, x=1 e x=2 têm centro horizontal em x=1. O teste real também exige a coordenada vertical correta, conexão pelos lados e pertencimento ao apoio. Acertar apenas a média horizontal não basta.

O exemplo ilustra uma regra, não uma fase específica do catálogo. Para reproduzir uma fase concreta, use sua definição e seu ID junto com a solução de referência correspondente.

## Conteúdo ativo

80 fases em seis faixas (15/15/15/15/15/5). Modos livres e desafios gerados são separados da campanha.

A posição exibida na seleção não é a identidade persistente da definição. Alterar uma fase pode exigir um novo ID, enquanto registros da fase anterior continuam arquivados. Referências antigas de catálogo precisam ser lidas junto do commit em que eram vigentes.

## Como a implementação funciona

Para massas iguais, o centro é a média das coordenadas. O motor usa coordenadas duplicadas e momentos inteiros para representar apoios entre casas; assim, equilíbrio exato não depende de uma tolerância visual.

| Arquivo principal | Responsabilidade |
| --- | --- |
| [geometry-games.mjs](../../../dist/geometry-games.mjs) | Motor / validação |
| [prumo-balance.mjs](../../../dist/prumo-balance.mjs) | Interface / integração |
| [prumo-campaign.mjs](../../../dist/prumo-campaign.mjs) | Catálogo / conteúdo |
| [prumo-progress.mjs](../../../dist/prumo-progress.mjs) | Progresso / compatibilidade |
| [collection-ui.mjs](../../../dist/collection-ui.mjs) | Interface / integração |

### Pontos de entrada no código

- `geometry-games.mjs`: `supportCells`, `initialGeometryState`, `validateGeometry`, `geometryShapes`, `prumoDomains`, `solveGeometry`, `geometryHint`, `geometryCandidates`, `geometryLocalAnalysis`.
- `prumo-balance.mjs`: `prumoBalanceModel`, `prumoBalanceMarkup`.
- `prumo-progress.mjs`: `migratePrumoProgress`.
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

Cobrir apoio entre casas, conectividade, sobreposição, grade completa e momento nos dois eixos. Grades da campanha chegam a 10×10; limites de importação e orçamento de busca são contratos separados.

Use o [guia de testes](../../../tests/README.md) para diferenciar testes de regras, mocks de DOM e snapshots de entrega. Estes arquivos relacionados são pontos de investigação, não uma declaração de que todos passam na versão atual:

- [prumo-balance.test.mjs](../../../tests/prumo-balance.test.mjs)
- [prumo80-audit-consistency.mjs](../../../tests/prumo80-audit-consistency.mjs)
- [prumo80-audit-export.mjs](../../../tests/prumo80-audit-export.mjs)
- [prumo80-build.mjs](../../../tests/prumo80-build.mjs)
- [prumo80-build.test.mjs](../../../tests/prumo80-build.test.mjs)
- [prumo80-campaign-ui-tests.mjs](../../../tests/prumo80-campaign-ui-tests.mjs)
- [prumo80-certificate-tests.mjs](../../../tests/prumo80-certificate-tests.mjs)
- [prumo80-document.mjs](../../../tests/prumo80-document.mjs)
- [prumo80-editorial-evidence.mjs](../../../tests/prumo80-editorial-evidence.mjs)
- [prumo80-editorial-review.mjs](../../../tests/prumo80-editorial-review.mjs)
- [prumo80-editorial-witness-tests.mjs](../../../tests/prumo80-editorial-witness-tests.mjs)
- [prumo80-interactions-tests.mjs](../../../tests/prumo80-interactions-tests.mjs)
- [prumo80-migration-ui-tests.mjs](../../../tests/prumo80-migration-ui-tests.mjs)
- [prumo80-preservation-tests.mjs](../../../tests/prumo80-preservation-tests.mjs)
- [prumo80-progress-tests.mjs](../../../tests/prumo80-progress-tests.mjs)
- [prumo80-solver-tests.mjs](../../../tests/prumo80-solver-tests.mjs)

Quando a mudança é visual, valide entrada no jogo, leitura das regras, interação principal, retorno e tamanhos de tela. Quando toca regras ou saves, acrescente casos de entradas inválidas, repetição da ação e restauração. Não conclua que uma busca encontrou solução única se ela esgotou seu orçamento.

## Documentação de referência

- [dist/PRUMO80-VALIDACAO.md](../../../dist/PRUMO80-VALIDACAO.md)
- [docs/prumo80-validation.md](../../../docs/prumo80-validation.md)

## Estado e limites

Guia da base `2354a3c`, reorganizada sem mudar código executável. Revisões posteriores só devem ser descritas depois de incorporadas e verificadas. Nenhuma publicação do site decorre deste manual. A organização local ainda precisa ser enviada ao repositório privado e passar pela revisão remota.
