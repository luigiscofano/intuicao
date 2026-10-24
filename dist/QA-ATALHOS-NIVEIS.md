# Atalhos e navegação de níveis · 24/10/2026

## Alterações autorizadas

- Corte certo e ELO: clique do meio (rodinha) sobre o tabuleiro avalia pelo mesmo caminho do botão Confirmar resposta. O botão continua disponível para toque e teclado.
- O gesto confirma apenas no pointerup válido. Auxclick só bloqueia a ação padrão, sem uma segunda avaliação. Mousedown bloqueia autoscroll. Arraste, cancelamento, perda de captura, Escape, perda de foco e reinício descartam o gesto; links e campos não são interceptados.
- Reflexos, Corte certo, ELO, PRUMO e PACTO: setas circulares de 44 px nas laterais da área jogável, anterior à esquerda e próximo à direita, centralizadas verticalmente, com nomes acessíveis e foco visível. Primeiro e último níveis limitam a navegação sem retornar ao início. O botão inferior compartilha a mesma navegação.
- DESVIO continua sem navegação de campanha. Modo livre de Reflexos/Corte e fases personalizadas/tutorial da coleção não exibem as setas de campanha.
- A navegação usa a inicialização já existente. Na coleção, salva o estado atual e restaura o rascunho do destino conforme o armazenamento existente. Reflexos/Corte mantêm o comportamento anterior de iniciar o nível ao trocar, sem introduzir outro sistema de rascunhos. Diálogos e animações obsoletos são descartados.

## Verificação executada

Passaram os novos testes determinísticos `middle-confirm-tests.mjs` e `level-shortcuts-tests.mjs`, além de ações diretas, dicas, entrada independente, aceitação de UI, reinício original/coleção, feedback/erros de PACTO, estrutura visual e isolamento de plataforma. Incluem confirmação única, cancelamento, botões esquerdo/direito preservados, links intactos, limites de nível, persistência da coleção, descarte de reset obsoleto e cancelamento de raio em Reflexos.

Os testes de DOM são simulações, não verificações de navegador/dispositivo. Autoscroll nativo, geometria responsiva e comportamento físico do mouse devem ser conferidos em navegador real.

Nenhum catálogo, ID, gabarito, motor de validação ou chave de progresso foi modificado. A baseline histórica do redesign retrô permanece intacta; quatro arquivos de interface autorizados têm hashes registrados separadamente em `tests/level-shortcuts-authorized-sha256.json`.

## Ajuste lateral posterior

As setas foram movidas, não duplicadas. Colunas CSS de 44 px ficam fora do SVG/tabuleiro e fora das camadas de resultado. Não há overlay, transform nem mudança no viewBox ou no cálculo das coordenadas. A superfície da coleção continua limitada a 680 px (tabuleiro interno de 632 px com os 24 px de padding de cada lado) quando o espaço total comporta 796 px; as margens disponíveis são aproveitadas. Em telas pequenas há 44 px por botão, 2 px de espaçamento e 2 px de margem lateral, com redimensionamento responsivo natural do tabuleiro. A largura original do SVG deixa 116 px para os controles laterais em desktop e 96 px em viewport de até 600 px, sem zoom artificial. Estes valores decorrem do CSS, não de medição em navegador.

A cobertura estrutural confirma: cada seta existe uma única vez, ambas compartilham o contêiner lateral e nenhuma pertence à região que recebe gestos de jogo. Os testes de limites, retorno ao nível anterior, estado salvo, modal obsoleto e atalhos continuam passando.

### Correção medida em navegador

A primeira inspeção da publicação lateral identificou setas 43 px abaixo do centro do SVG e do tabuleiro: os contêineres incluem uma faixa reservada de resultado de 86 px. A faixa e a compensação de margem das setas agora usam a mesma variável CSS `--result-reserved-height`, sem mover/escalar o tabuleiro. Na inspeção anterior à compensação, o ELO mantinha 632 × 632 px e o SVG Corte media 677 px de largura dentro de 793 px disponíveis; os botões mediam 44 × 44 px e não sobrepunham a área jogável. A centralização final requer nova medição após publicar esta correção.
