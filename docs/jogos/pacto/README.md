# PACTO

[Catálogo dos jogos](../README.md) · [Apresentação](../../../README.md) · [Arquitetura](../../arquitetura/README.md)

**Contagem, propagação de restrições e parcerias.** Categoria: Raciocínio lógico.

## O que o jogo faz

Um puzzle de dedução em que quatro símbolos precisam formar parcerias numa grade.

Complete a grade com quatro símbolos: dois de cada por linha e coluna. Cada casa deve tocar exatamente uma casa igual pelos lados.

## Problema e proposta pedagógica

Praticar contagem, exclusão de possibilidades e dedução, combinando uma regra de vizinhança com restrições de linhas e colunas.

A proposta pedagógica é mostrar como regras simples se complementam: uma dupla possível num canto pode mudar as opções de toda uma linha ou coluna.

Esses objetivos descrevem a intenção de prática do jogo. Não são resultados de um estudo de aprendizagem com usuários.

## Como abrir

Execute o servidor pelo [guia de instalação](../../setup/README.md), abra a página inicial, escolha **Raciocínio lógico** e depois **PACTO**. O jogo participa da aplicação integrada; abrir um arquivo `.mjs` isolado não inicia sua interface.

## Regras e interação

1. Complete a grade 8 × 8 com círculo, triângulo, quadrado e losango, sem alterar as pistas fixas.
2. Cada linha e cada coluna deve conter exatamente dois de cada símbolo.
3. Cada casa deve ter exatamente um vizinho igual pelos lados. Diagonais não contam: os símbolos formam duplas, nunca trios ou grupos maiores.
4. Cruze as contagens com as possibilidades de parceria. Marcações a lápis são apenas anotações; a vitória é reconhecida automaticamente quando a grade está completa e correta.

## Exemplo de raciocínio

Se uma linha já contém dois círculos, suas casas vazias não podem receber outro. Mas completar todas as cotas ainda não garante vitória: um círculo com dois vizinhos iguais viola a exigência de exatamente um parceiro.

O exemplo ilustra uma regra, não uma fase específica do catálogo. Para reproduzir uma fase concreta, use sua definição e seu ID junto com a solução de referência correspondente.

## Conteúdo ativo

80 fases em seis faixas (15/15/15/15/15/5). Modos livres e desafios gerados são separados da campanha.

A posição exibida na seleção não é a identidade persistente da definição. Alterar uma fase pode exigir um novo ID, enquanto registros da fase anterior continuam arquivados. Referências antigas de catálogo precisam ser lidas junto do commit em que eram vigentes.

## Como a implementação funciona

As restrições de quota e de vizinhança precisam ser satisfeitas ao mesmo tempo. Feedback local de erro explícito e dedução global são operações diferentes; um preenchimento ainda inconclusivo não deve ser marcado como definitivamente errado.

| Arquivo principal | Responsabilidade |
| --- | --- |
| [symbol-games.mjs](../../../dist/symbol-games.mjs) | Motor / validação |
| [pacto-campaign.mjs](../../../dist/pacto-campaign.mjs) | Catálogo / conteúdo |
| [pacto-check.mjs](../../../dist/pacto-check.mjs) | Interface / integração |
| [pacto-feedback.mjs](../../../dist/pacto-feedback.mjs) | Interface / integração |
| [pacto-progress.mjs](../../../dist/pacto-progress.mjs) | Progresso / compatibilidade |

### Pontos de entrada no código

- `symbol-games.mjs`: `symbolCandidates`, `validateSymbols`, `validateSymbolEditing`, `solveSymbols`, `symbolHint`, `profileSymbols`, `canonicalSymbols`.
- `pacto-check.mjs`: `comparePactoReference`, `createPactoCheck`.
- `pacto-feedback.mjs`: `createPactoFeedback`.
- `pacto-progress.mjs`: `migratePactoProgress`.

Os nomes acima são extraídos dos exports presentes nesta base. Antes de chamar uma função, confira parâmetros, retornos e casos de erro no módulo e em seus testes; não assuma que todos os jogos compartilham a mesma assinatura.

## Roteiro para estudar ou alterar

1. Leia as regras e identifique a condição de vitória ou encerramento.
2. Acompanhe a representação de fase/mapa e de estado no módulo principal.
3. Localize o caminho entre ação do usuário, validação, transição e renderização.
4. Observe como reset, undo/redo e restauração são oferecidos nesta interface.
5. Encontre um teste da regra alterada e reproduza um caso mínimo antes de editar.
6. Quando houver catálogo novo, confira IDs, soluções, contagem e impacto no save.

## Verificação e riscos específicos

Preservar pistas, quotas por linha e coluna, dupla ortogonal e conclusão automática. Testar a diferença entre lápis/anotação e valor confirmado e impedir contagem duplicada de vitória.

Use o [guia de testes](../../../tests/README.md) para diferenciar testes de regras, mocks de DOM e snapshots de entrega. Estes arquivos relacionados são pontos de investigação, não uma declaração de que todos passam na versão atual:

- [pacto-auto-victory.test.mjs](../../../tests/pacto-auto-victory.test.mjs)
- [pacto-check-tests.mjs](../../../tests/pacto-check-tests.mjs)
- [pacto-feedback-tests.mjs](../../../tests/pacto-feedback-tests.mjs)
- [pacto-live-tests.mjs](../../../tests/pacto-live-tests.mjs)
- [pacto80-budget-and-identities.mjs](../../../tests/pacto80-budget-and-identities.mjs)
- [pacto80-build-compact.mjs](../../../tests/pacto80-build-compact.mjs)
- [pacto80-build-recompose.mjs](../../../tests/pacto80-build-recompose.mjs)
- [pacto80-build.mjs](../../../tests/pacto80-build.mjs)
- [pacto80-direct-hints-tests.mjs](../../../tests/pacto80-direct-hints-tests.mjs)
- [pacto80-independent-editorial.mjs](../../../tests/pacto80-independent-editorial.mjs)
- [pacto80-independent-tests.mjs](../../../tests/pacto80-independent-tests.mjs)
- [pacto80-independent-trace-tests.mjs](../../../tests/pacto80-independent-trace-tests.mjs)
- [pacto80-legacy-rule-regression.mjs](../../../tests/pacto80-legacy-rule-regression.mjs)
- [pacto80-preservation-tests.mjs](../../../tests/pacto80-preservation-tests.mjs)
- [pacto80-progress-tests.mjs](../../../tests/pacto80-progress-tests.mjs)
- [pacto80-reasoning.mjs](../../../tests/pacto80-reasoning.mjs)

Quando a mudança é visual, valide entrada no jogo, leitura das regras, interação principal, retorno e tamanhos de tela. Quando toca regras ou saves, acrescente casos de entradas inválidas, repetição da ação e restauração. Não conclua que uma busca encontrou solução única se ela esgotou seu orçamento.

## Documentação de referência

- [dist/PACTO80-VALIDACAO.md](../../../dist/PACTO80-VALIDACAO.md)
- [dist/QA-PACTO-HACHURAS.md](../../../dist/QA-PACTO-HACHURAS.md)

## Estado e limites

Guia da base `2354a3c`, reorganizada sem mudar código executável. Revisões posteriores só devem ser descritas depois de incorporadas e verificadas. Nenhuma publicação do site decorre deste manual. A organização local ainda precisa ser enviada ao repositório privado e passar pela revisão remota.
