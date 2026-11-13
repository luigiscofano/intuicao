# Tabuleiro estável sem janela de deslocamento

## Causa

`game-viewport.mjs` recalculava o tamanho das campanhas a cada mutação. O cálculo incluía altura do painel/feedback. Portanto mensagens podiam reduzir o tabuleiro. Quando a altura mínima por célula impedia esse ajuste, o módulo recortava o tabuleiro com rolagem interna e criava os botões «Mover tabuleiro».

## Alteração

- Dimensionamento inicial usa formato do tabuleiro e dimensões da janela, não texto de feedback.
- Medida mantida por nível, inclusive quando o jogo recria SVG; recalculada apenas ao mudar nível ou janela.
- Elimina a janela recortada e os controles de pan. Em janela/zoom extremo, a página mantém rolagem normal sem cortar casas.
- Em largura de até 650px, as setas de nível ficam em faixa própria junto ao tabuleiro, devolvendo 88px à grade.
- Não altera coordenadas, regras, eventos de jogada, campanhas ou saves.

## Verificação

22 testes focados de `game-viewport.test.mjs` e `board-fit.test.mjs` passaram após o complemento CSS responsivo. Os testes simulam crescimento de feedback, ações, redimensionamento, cancelamento de centralização pelo usuário e ausência de pan.

QA Chromium em iframe concluída: 96/96 combinações (12 campanhas × primeiras/últimas fases × 1280×900, 390×844, 320×568 e 844×390), sem overflow da página, tabuleiro horizontalmente visível, sem controles de pan e medidas estáveis após feedback longo, interação disponível e desfazer. Resultado em `tests/viewport/stable-campaigns-results-2026-11-13.json`. Captura Renovo 80 em paisagem conferida.

Não equivale a ensaio de todas as 960 fases, navegadores/aparelhos físicos, vitórias, dicas e reinícios completos. Os sete Versus mantêm o caminho estável anterior, coberto por teste unitário; não foram repetidos no lote visual desta alteração.

A fixture está em `tests/viewport/stable-campaigns.html`, não distribuída no Site. Copiar temporariamente para `dist/__stable-qa.html` em ambiente de QA isolado; clicar Testar. A fixture navega por controles reais e pode modificar progresso do perfil descartável. Remover antes de empacotar.
