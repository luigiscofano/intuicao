# Reflexos

[Catálogo atual](../README.md) · [Projeto](../../../README.md) · [Arquitetura](../../arquitetura/README.md)

Um puzzle de luz e espelhos em que você constrói percursos para raios coloridos.

## Objetivo

**Leve cada raio ao alvo da mesma cor e símbolo.**

## Como começar

1. Gire os espelhos. Eles mudam a direção da luz, mas não saem do lugar.
2. Dispare pelas fontes ou use Confirmar todos para ver o caminho.
3. Acerte todos os alvos sem cruzar nem encostar raios de cores diferentes.

## Regras completas

1. Gire os espelhos. Eles mudam a direção da luz, mas não saem do lugar.
2. Clique em uma fonte para disparar ou use Confirmar todos. Todos os raios precisam chegar aos seus alvos.
3. Raios de cores diferentes não podem se cruzar nem se tocar, mesmo se forem disparados separadamente. Paredes e bordas interrompem a luz.
4. Quando houver portais, a mesma letra indica entrada e saída. A luz sai na mesma direção. Alguns portais só aceitam certas cores; o salto entre eles não conta como caminho.
5. A tentativa termina após todos os disparos. Ao mudar um ajuste, os raios são limpos para você tentar de novo.

## Exemplo de raciocínio

O espelho faz a luz virar e alcançar o alvo.

## O que observar

A proposta pedagógica é tornar a reflexão da luz explorável: pequenas mudanças de direção produzem efeitos visíveis, e os percursos precisam funcionar em conjunto.

Não conclua uma solução apenas pela aparência. Leia as pistas da fase e confira a condição de término acima. Pistas fixas e a identidade da fase devem ser preservadas. Dicas ou solução assistida não equivalem a uma conclusão independente.

## Proposta pedagógica

Praticar orientação espacial, leitura de ângulos e planejamento de trajetórias. Observar uma tentativa e ajustar os espelhos convida a formular e revisar hipóteses.

Essas são intenções de design e oportunidades de prática, não resultados acadêmicos medidos.

## Identidade visual e leitura

As cores, peças e ilustrações ajudam a distinguir estados e ações. A arte não concede poderes ou altera as regras. Veja a [galeria da identidade](../../identidade/README.md) e os [recursos de fauna e flora](../../../README.md#fauna-flora-e-objetos-com-funcao).

## Onde está implementado

- [dist/light-world.mjs](../../../dist/light-world.mjs)
- [dist/light-render.mjs](../../../dist/light-render.mjs)
- [dist/light-levels.mjs](../../../dist/light-levels.mjs)

As regras desta página foram confrontadas com os textos publicados em [game-info-content.mjs](../../../dist/game-info-content.mjs), os [guias rápidos](../../../dist/rules-quick-start.mjs) e os adaptadores próprios da família. Quantidades dependentes de mapa não devem ser tratadas como constantes universais.

## Preservação e verificação

O progresso usa o armazenamento local e o [backup compartilhado](../../../dist/progress-backup.mjs). Não reutilize número editorial como identificador de save. Ao alterar este jogo, confira ações válidas e inválidas, retorno à seleção, desfazer/refazer quando oferecidos, conclusão ou término, restauração e telas estreitas.

[Guia de testes](../../../tests/README.md) · [Qualidade](../../qualidade/README.md). Uma captura demonstra apresentação, não comprova sozinha toda a mecânica. As regras documentadas devem acompanhar o código, não substituir testes do motor.


## Referência técnica complementar

Os links abaixo preservam o mapa técnico documentado do jogo. Relatórios datados mantêm o escopo da revisão original, não certificam automaticamente a versão atual.

## Como a implementação funciona

Separar geometria da renderização permite reproduzir percursos sem depender do desenho SVG. A direção após uma reflexão depende da orientação do espelho; um portal preserva a direção de saída, mas seu salto não forma um segmento físico entre os portais.

| Arquivo principal | Responsabilidade |
| --- | --- |
| [light-world.mjs](../../../dist/light-world.mjs) | Motor / validação |
| [light-campaign-progress.mjs](../../../dist/light-campaign-progress.mjs) | Catálogo / conteúdo |
| [light-levels.mjs](../../../dist/light-levels.mjs) | Catálogo / conteúdo |
| [light-render.mjs](../../../dist/light-render.mjs) | Interface / integração |
| [app.mjs](../../../dist/app.mjs) | Interface / integração |

### Pontos de entrada no código

- `light-world.mjs`: `lightScene`, `lightSegmentIntersection`, `traceLightWorld`, `traceLightAttempt`, `lightAttemptFrame`, `visibleLightSegments`.
- `light-campaign-progress.mjs`: `createLightCampaignProgress`.
- `light-render.mjs`: `lightRaysSVG`.

Os nomes acima são extraídos dos exports presentes nesta base. Antes de chamar uma função, confira parâmetros, retornos e casos de erro no módulo e em seus testes; não assuma que todos os jogos compartilham a mesma assinatura.

## Roteiro para estudar ou alterar

1. Leia as regras e identifique a condição de vitória ou encerramento.
2. Acompanhe a representação de fase/mapa e de estado no módulo principal.
3. Localize o caminho entre ação do usuário, validação, transição e renderização.
4. Observe como reset, undo/redo e restauração são oferecidos nesta interface.
5. Encontre um teste da regra alterada e reproduza um caso mínimo antes de editar.
6. Quando houver catálogo novo, confira IDs, soluções, contagem e impacto no save.

## Verificação e riscos específicos

Verificar contato entre raios, pares de portais, interrupção em paredes e reinício dos disparos após editar um ângulo. Um gabarito válido não prova que a solução é única.

Use o [guia de testes](../../../tests/README.md) para diferenciar testes de regras, mocks de DOM e snapshots de entrega. Estes arquivos relacionados são pontos de investigação, não uma declaração de que todos passam na versão atual:

- [light-spacious-history.mjs](../../../tests/light-spacious-history.mjs)
- [light-spacious-preservation.mjs](../../../tests/light-spacious-preservation.mjs)
- [light-spacious-static.mjs](../../../tests/light-spacious-static.mjs)
- [light-v4-artifacts.mjs](../../../tests/light-v4-artifacts.mjs)
- [light-v4-campaign-audit.mjs](../../../tests/light-v4-campaign-audit.mjs)
- [light-v4-campaign-ui.mjs](../../../tests/light-v4-campaign-ui.mjs)
- [light-v4-evidence-tests.mjs](../../../tests/light-v4-evidence-tests.mjs)
- [light-v4-history-tests.mjs](../../../tests/light-v4-history-tests.mjs)
- [light-v4-history.mjs](../../../tests/light-v4-history.mjs)
- [light-v4-integration-preservation.mjs](../../../tests/light-v4-integration-preservation.mjs)
- [light-v4-integration-progress.mjs](../../../tests/light-v4-integration-progress.mjs)
- [light-v4-integration-ui.mjs](../../../tests/light-v4-integration-ui.mjs)
- [light-v4-legacy-preservation-tests.mjs](../../../tests/light-v4-legacy-preservation-tests.mjs)
- [light-v4-record-validation.mjs](../../../tests/light-v4-record-validation.mjs)
- [light-v5-history-tests.mjs](../../../tests/light-v5-history-tests.mjs)
- [light-v5-history.mjs](../../../tests/light-v5-history.mjs)

Quando a mudança é visual, valide entrada no jogo, leitura das regras, interação principal, retorno e tamanhos de tela. Quando toca regras ou saves, acrescente casos de entradas inválidas, repetição da ação e restauração. Não conclua que uma busca encontrou solução única se ela esgotou seu orçamento.

## Documentação de referência

- [docs/reflexos80](../../../docs/reflexos80)
- [dist/development/reflexos80/README.md](../../../dist/development/reflexos80/README.md)
