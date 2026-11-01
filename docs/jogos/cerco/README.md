# CERCO

[Catálogo dos jogos](../README.md) · [Apresentação](../../../README.md) · [Arquitetura](../../arquitetura/README.md)

**Mobilidade coletiva e bloqueios permanentes.** Categoria: Versus.

## O que o jogo faz

Mova suas peças, feche caminhos e deixe o adversário sem saída.

Faça a última jogada: quem ficar sem movimentos na sua vez perde.

## Problema e proposta pedagógica

Praticar planejamento por turnos e leitura de caminhos, observando como a casa abandonada altera as opções de ambos os times.

A proposta é tornar visíveis as consequências de uma decisão: mover uma peça também fecha uma passagem, e cada equipe precisa conservar alguma saída para sua próxima vez.

Esses objetivos descrevem a intenção de prática do jogo. Não são resultados de um estudo de aprendizagem com usuários.

## Como abrir

Execute o servidor pelo [guia de instalação](../../setup/README.md), abra a página inicial, escolha **Versus** e depois **CERCO**. O jogo participa da aplicação integrada; abrir um arquivo `.mjs` isolado não inicia sua interface.

## Regras e interação

1. Cada time controla três peças. Na preparação, escolha uma grade de 5 × 5 a 8 × 8, com sete mapas por tamanho. Escolha uma peça sua e mova exatamente uma casa para cima, baixo, esquerda ou direita, para um destino vazio e sem barreira.
2. Selecione a peça, escolha um destino, observe a prévia e confirme. A casa de origem vira uma barreira neutra e permanente para os dois times; só a origem fica bloqueada.
3. Não há diagonais, saltos, empurrões ou capturas. As seis peças permanecem no tabuleiro. Não é permitido passar a vez.
4. Depois de cada jogada, confira o próximo time: se nenhuma de suas três peças puder se mover, ele perde. Uma peça presa não encerra o jogo enquanto outra do mesmo time tiver uma saída.
5. O Verde começa a primeira partida. A revanche alterna o iniciador e mantém as equipes e os mascotes. Todos os mascotes têm exatamente os mesmos movimentos: a escolha é apenas visual.

## Exemplo de raciocínio

Ao mover uma peça uma casa para a direita, sua origem vira barreira para ambos os times. Se outra peça do mesmo time ainda puder se mover, uma peça isolada não causa derrota: o teste considera as três peças do jogador da vez.

O exemplo ilustra uma regra, não uma fase específica do catálogo. Para reproduzir uma fase concreta, use sua definição e seu ID junto com a solução de referência correspondente.

## Conteúdo ativo

28 mapas: sete famílias em cada tamanho 5×5, 6×6, 7×7 e 8×8. Duas equipes de três peças; não é campanha numerada.

A posição exibida na seleção não é a identidade persistente da definição. Alterar uma fase pode exigir um novo ID, enquanto registros da fase anterior continuam arquivados. Referências antigas de catálogo precisam ser lidas junto do commit em que eram vigentes.

## Como a implementação funciona

O tabuleiro perde uma casa transitável a cada movimento. A condição terminal depende de toda a equipe. O catálogo tem quatro tamanhos, de 5×5 a 8×8, com sete mapas por tamanho; o bot tem orçamento e heurísticas.

| Arquivo principal | Responsabilidade |
| --- | --- |
| [engine.mjs](../../../dist/cerco/engine.mjs) | Motor / validação |
| [maps.mjs](../../../dist/cerco/maps.mjs) | Catálogo / conteúdo |
| [bot.mjs](../../../dist/cerco/bot.mjs) | Interface / integração |
| [service.mjs](../../../dist/cerco/service.mjs) | Interface / integração |
| [ui.mjs](../../../dist/cerco/ui.mjs) | Interface / integração |

### Pontos de entrada no código

- `cerco/engine.mjs`: `createCerco`, `cercoNeighbors`, `legalCercoMoves`, `applyCercoMove`, `previewCercoMove`, `undoCerco`, `redoCerco`, `resetCerco`, `rematchCerco`, `restoreCerco`.
- `cerco/maps.mjs`: `getCercoMapsForSize`, `getCercoMapVariant`, `getCercoMap`.
- `cerco/bot.mjs`: `evaluateCerco`, `chooseCercoMove`, `chooseCercoMoveAsync`.
- `cerco/service.mjs`: `createCercoSearch`.
- `cerco/ui.mjs`: `initCerco`.

Os nomes acima são extraídos dos exports presentes nesta base. Antes de chamar uma função, confira parâmetros, retornos e casos de erro no módulo e em seus testes; não assuma que todos os jogos compartilham a mesma assinatura.

## Roteiro para estudar ou alterar

1. Leia as regras e identifique a condição de vitória ou encerramento.
2. Acompanhe a representação de fase/mapa e de estado no módulo principal.
3. Localize o caminho entre ação do usuário, validação, transição e renderização.
4. Observe como reset, undo/redo e restauração são oferecidos nesta interface.
5. Encontre um teste da regra alterada e reproduza um caso mínimo antes de editar.
6. Quando houver catálogo novo, confira IDs, soluções, contagem e impacto no save.

## Verificação e riscos específicos

Cobrir conservação das seis peças, barreira apenas na origem, ausência de diagonal/captura e fim por mobilidade zero do time. Mascotes são visuais e não concedem habilidades diferentes.

Use o [guia de testes](../../../tests/README.md) para diferenciar testes de regras, mocks de DOM e snapshots de entrega. Estes arquivos relacionados são pontos de investigação, não uma declaração de que todos passam na versão atual:

- [cerco-bot.test.mjs](../../../tests/cerco-bot.test.mjs)
- [cerco-default-mascots.test.mjs](../../../tests/cerco-default-mascots.test.mjs)
- [cerco-engine.test.mjs](../../../tests/cerco-engine.test.mjs)
- [cerco-grid-sizes.test.mjs](../../../tests/cerco-grid-sizes.test.mjs)
- [cerco-grid-ui-preservation.test.mjs](../../../tests/cerco-grid-ui-preservation.test.mjs)
- [cerco-integration.test.mjs](../../../tests/cerco-integration.test.mjs)
- [cerco-maps.test.mjs](../../../tests/cerco-maps.test.mjs)
- [cerco-registration.test.mjs](../../../tests/cerco-registration.test.mjs)
- [cerco-victory-center.test.mjs](../../../tests/cerco-victory-center.test.mjs)

Quando a mudança é visual, valide entrada no jogo, leitura das regras, interação principal, retorno e tamanhos de tela. Quando toca regras ou saves, acrescente casos de entradas inválidas, repetição da ação e restauração. Não conclua que uma busca encontrou solução única se ela esgotou seu orçamento.

## Documentação de referência

- [docs/cerco-review.md](../../../docs/cerco-review.md)
- [docs/cerco-grid-sizes-2026-11-01.md](../../../docs/cerco-grid-sizes-2026-11-01.md)

## Estado e limites

Guia da base `2354a3c`, reorganizada sem mudar código executável. Revisões posteriores só devem ser descritas depois de incorporadas e verificadas. Nenhuma publicação do site decorre deste manual. A organização local ainda precisa ser enviada ao repositório privado e passar pela revisão remota.
