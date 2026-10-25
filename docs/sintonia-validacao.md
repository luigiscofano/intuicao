# SINTONIA — relatório de validação

Revisão de 25 de outubro de 2026 no projeto Intuição existente. A implementação é aditiva: `dist/sintonia/` contém o jogo, e seis arquivos compartilhados recebem apenas a integração de navegação, ajuda e celebração. O manifesto de publicação mantém o projeto e a pasta estática originais.

## Campanha e motor

- 500 definições completas, 500 IDs únicos e 20 capítulos de 25 fases.
- 260 duplas, 190 trios e 50 quartetos. Primeiro trio na fase 151; primeiro quarteto na 376.
- Todas as 500 definições passaram pelo validador e todas as soluções foram reproduzidas com vitória no motor de jogo.
- As 500 topologias conjuntas são distintas após normalização de margens vazias, translação, permutação de painéis, rotação e reflexão global.
- As mecânicas declaradas aparecem efetivamente nos eventos das soluções certificadas. Isso comprova uso, não indispensabilidade em toda solução possível.
- A fase 51 contém o caso de referência 2 × 3. `right,right,left,down,right` vence em cinco comandos; `right,down` não vence. Uma BFS independente confirmou o mínimo de cinco.
- A busca independente de mínimos em 61 amostras cobriu todos os capítulos.
- O banco de segurança tem 36 definições independentes da campanha, todas validadas e reproduzidas.

O relatório de curadoria reproduzível está em `tests/sintonia-campaign-audit.json`. O catálogo legível, inclusive sequências de solução, está em `docs/sintonia-catalogo.md`.

## Repetição de comandos

Repetir uma única direção resolve apenas a fase 1, que ensina o controle. A exploração exaustiva das sequências de varredura até bloqueio, com vitória conferida em cada passo intermediário, resolve oito fases introdutórias e nenhuma fase de 13 a 500. A análise não ficou inconclusiva em nenhuma fase.

Os 40 padrões cíclicos e as amostras de comandos aleatórios são diagnósticos registrados no relatório; não representam prova de impossibilidade de acertar ao acaso nem medição de dificuldade humana. Repetições deliberadas continuam permitidas e não há punição por experimentar.

## Testes automatizados

| Comando | Evidência verificada |
|---|---|
| `node tests/sintonia-engine.test.mjs` | 25 testes: simultaneidade, placas, interruptores, seletores, caixas, sentidos únicos, gelo, portais, pontes, chaves, AND, entregas atômicas, pureza, validação e busca. |
| `node tests/sintonia-engine-analysis.test.mjs` | 5 casos adicionais de mecanismos e análise de estado. |
| `node tests/sintonia-catalog.test.mjs` | 11 grupos: catálogo inteiro, distribuições, novidades, topologias, resistência a varredura, mínimos amostrais, geração determinística, recência de famílias, limites de orçamento e banco certificado. |
| `node tests/sintonia-service.test.mjs` | 8 testes: dicas do estado completo, rejeição de certificados inválidos, cancelamento, respostas obsoletas, orçamento e alternativa sem Worker. |
| `node tests/sintonia-ui-state.test.mjs` | 8 testes: histórico, desfazer/refazer, retomada, estado completo, dados incompatíveis, isolamento de progresso, ritmo do Endless e histórico recente de famílias. |
| `node tests/sintonia-integration.test.mjs` | 4 grupos de regressão comparando os jogos existentes com o commit original: motores, catálogos, assets, estilos globais, armazenamento, lógica da aplicação, ajuda e celebrações. |
| `node tests/direct-actions-tests.mjs` | 12 testes existentes de ações diretas. |
| `node tests/endless-collection-tests.mjs` | 15.000 configurações dos modos Endless existentes, com determinismo, diversidade, verificação e isolamento da campanha. |
| `node tests/game-nav-scroll-tests.mjs` | Navegação existente por jogos e posicionamento de tela. |

Todos os comandos listados passaram. Os testes históricos que fixam literalmente a antiga quantidade de seis jogos não são usados como evidência da navegação com sete jogos; a regressão de integração verifica explicitamente a extensão e preserva os seis conteúdos anteriores.

## Verificação no navegador

Realizada no preview gerenciado do checkout, com interação pelos controles reais da página.

- Entrada 07 SINTONIA na navegação, seleção de 500 níveis, salto por número, regras, opções avançadas e ajuda compartilhada.
- Fase 1: um comando de teclado produz vitória conjunta; desfazer e refazer funcionam; recarregar preserva conclusão, posições e contador.
- Fase 51: comando bloqueado mantém o contador em zero; direita/baixo não vence; cancelar reinício conserva a partida; confirmar reinício restaura o início; a sequência de cinco comandos vence.
- Fase 76: a inspeção P1 informa placa livre/cancela fechada e depois placa ocupada/cancela aberta. As três camadas de dica respondem ao estado atual; aplicar o passo altera o histórico corretamente.
- Editor: JSON `null` foi rejeitado com mensagem legível e sem alterar os movimentos. Uma definição válida do caso de referência foi certificada e abriu como fase personalizada.
- Endless: geração, movimento, recarga com mesmas posições, resolução assistida a partir da posição atual, vitória contada uma vez após nova recarga e passagem para o desafio seguinte com contador de vitórias preservado.
- Quarteto 376: quatro animais e mapas visíveis, células de tamanho comum de 44 px no desktop.
- Viewport estreito: moldura de 390 × 844, área útil de 375 px; trio e quarteto sem rolagem horizontal, células uniformes dentro de cada fase e todos os mapas simultaneamente presentes. Os botões direcionais e o modal de ajuda responderam nessa largura.
- Regressão visual e funcional: retorno a PACTO e Reflexos, seleção, partida, opções avançadas, gabarito, confirmação e celebração de vitória nos dois jogos existentes.

A inspeção de console encontrou mensagens de uma extensão do ambiente de navegador, sem evidência de erro do SINTONIA nesses fluxos. O arquivo temporário usado para emular a largura estreita foi removido antes da publicação.

## Alcance e limites

As validações de conteúdo são automáticas. Houve inspeção manual assistida no navegador de fases representativas, não uma sessão humana completa em cada uma das 500 fases. A calibragem de dificuldade percebida com jogadores ainda não foi realizada.

O teste de largura estreita exercitou layout e botões no navegador; não equivale a teste em todos os aparelhos físicos ou leitores de tela. O código mantém rótulos acessíveis, foco, atalhos delimitados à área do jogo, controles por botão e preferência por movimento reduzido.

O Endless possui geração real com orçamento finito e banco certificado de recuperação. Não promete unicidade global infinita. O progresso permanece local ao navegador, seguindo o funcionamento existente do Intuição.

## Ajuste posterior da seleção — 25 de outubro de 2026

Atendendo à revisão visual do usuário, foram removidos os filtros Capítulo/Dificuldade, o campo Ir ao nível e a configuração do Endless da tela de seleção. Os 500 cartões continuam acessíveis por capítulo. A faixa de ações usa a mesma estrutura da coleção, com Explorar modo livre e Desafio de hoje. Durante a partida, o menu suspenso foi substituído pelo contador textual do desafio, mantendo as setas de navegação.

A revisão corrigiu a especificidade de um seletor local que sobrepunha os fundos primários e o raio dos cartões. A comparação no navegador confirmou igualdade com PACTO para largura e altura (68,40625 px naquele viewport), raio de 24%, padding de 5 px, cores, sombra e tipografia da legenda. Os 500 cartões estavam presentes, sem seletores na tela de seleção. Abrir a fase 180 mostrou DESAFIO 180 / 500 sem dropdown; a seta avançou para 181. Explorar modo livre retomou o Endless, com a configuração de dificuldade disponível dentro do modo.


## Ações da seleção lado a lado — 25/10/2026

A faixa `selection-actions` foi aplicada às sete seleções: modo livre e desafio diário juntos em ELO, PRUMO, PACTO e SINTONIA; modo livre e desafio tático juntos em DESVIO; botão de modo livre na mesma estrutura em REFLEXOS e CORTE CERTO. IDs e handlers existentes foram preservados. O CSS é restrito à faixa de ações da seleção.

Conferência no navegador: sete jogos em desktop, com pares na mesma coordenada vertical, intervalo de 8 px e altura de 44 px. Duas molduras móveis de 320 e 375 px (larguras úteis de 305 e 360 px devido à barra de rolagem) mantiveram os pares na mesma linha e sem transbordamento. Na menor largura, os rótulos quebram dentro dos botões, ambos com 54,375 px de altura; na maior, ambos ficam com 44 px. A navegação por Tab em SINTONIA passou do modo livre ao desafio diário. Os cliques abriram DESAFIO DO DIA 129 / 500 e retomaram ENDLESS · DESAFIO 3 · 1 CONCLUÍDOS. Verificação de sintaxe dos dois módulos alterados e `git diff --check` passaram.

Captura da seleção: `intuicao-botoes-lado-a-lado-1792946069816.jpg`. A página temporária de conferência móvel foi removida antes da publicação.
