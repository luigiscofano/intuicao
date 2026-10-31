# Rodapé — continuidade do contorno

## Correção delimitada
A única alteração de produção é `dist/footer-transition.css`. Referência anterior: `dd0cf6a77232bcc755f1d250934b9f038c7a4e3b`.

O acabamento anterior dependia de seletores e estados de rotas que não cobriam uniformemente os jogos Versus mais recentes. O novo contorno pertence diretamente a `body > footer::before`, sem condicionamento ao jogo aberto. Reutiliza os SVGs originais das raízes esquerda e direita, sem modificar seus arquivos nem mascarar suas curvas.

São três elementos separados:
- **Painel de jogo:** termina com sua própria borda e cantos inferiores de 19 px; pseudo-elementos antigos de raízes na seleção são desativados.
- **Rodapé:** começa após 24 px no desktop e 20 px no compacto. A tampa branca tem cantos superiores de 14 px e se encontra com o início das curvas em 14 px.
- **Chão:** as raízes prolongam-se por 112 px no desktop e 84 px abaixo de 760 px, mantendo a decoração e folhas existentes.

Marca, conteúdo, controles, celebrações, motores e arte não são redesenhados. Não há mudança nas silhuetas ou cálculos das 15 fases de fauna em Corte Certo.

## Verificação
`tests/footer-contour-regression.test.mjs` valida as propriedades estruturais sem depender da formatação integral do CSS. Também compara hashes de todos os outros arquivos publicados de `dist` contra o commit de referência e rejeita arquivos extras de produção.

A inspeção nativa de 128 casos em quatro larguras está sob responsabilidade do agente de publicação. Este documento não declara essa inspeção visual concluída: os testes de fonte comprovam escopo e contrato CSS, mas não substituem a observação do encaixe final entre painel, rodapé e chão.

## QA executado
128 cenários em navegador real: home, três categorias, seleção e partida dos 12 jogos, quatro resultados Versus; larguras 1366/1920/390/320. As 1.153 verificações passaram, sem erros de execução. Contorno alinhado à margem interna (desvio subpixel0,5px), raízes originais sem máscara/clipping, continuação até a reserva de chão112/84px, gap mínimo20px e nenhum overflow horizontal. Capturas completas de CERCO resultado1920, Corte partida1366 e VÉRTICE resultado320, além home/preparações390, foram inspecionadas: conteúdo, rodapé e chão separados, curvas de ambos lados visíveis e contínuas. Saves de QA restaurados. Viewports móveis simulados em navegador; não ensaio em aparelhos físicos.
