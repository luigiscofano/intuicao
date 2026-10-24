# Atalhos e navegação de níveis · 24/10/2026

## Alterações autorizadas

- Corte certo e ELO: clique do meio (rodinha) sobre o tabuleiro avalia pelo mesmo caminho do botão Confirmar resposta. O botão continua disponível para toque e teclado.
- O gesto confirma apenas no pointerup válido. Auxclick só bloqueia a ação padrão, sem uma segunda avaliação. Mousedown bloqueia autoscroll. Arraste, cancelamento, perda de captura, Escape, perda de foco e reinício descartam o gesto; links e campos não são interceptados.
- Reflexos, Corte certo, ELO, PRUMO e PACTO: setas circulares de 44 px junto ao indicador superior, com nomes acessíveis e foco visível. Primeiro e último níveis limitam a navegação sem retornar ao início. O botão inferior compartilha a mesma navegação.
- DESVIO continua sem navegação de campanha. Modo livre de Reflexos/Corte e fases personalizadas/tutorial da coleção não exibem as setas de campanha.
- A navegação usa a inicialização já existente. Na coleção, salva o estado atual e restaura o rascunho do destino conforme o armazenamento existente. Reflexos/Corte mantêm o comportamento anterior de iniciar o nível ao trocar, sem introduzir outro sistema de rascunhos. Diálogos e animações obsoletos são descartados.

## Verificação executada

Passaram os novos testes determinísticos `middle-confirm-tests.mjs` e `level-shortcuts-tests.mjs`, além de ações diretas, dicas, entrada independente, aceitação de UI, reinício original/coleção, feedback/erros de PACTO, estrutura visual e isolamento de plataforma. Incluem confirmação única, cancelamento, botões esquerdo/direito preservados, links intactos, limites de nível, persistência da coleção, descarte de reset obsoleto e cancelamento de raio em Reflexos.

Os testes de DOM são simulações, não verificações de navegador/dispositivo. Autoscroll nativo, geometria responsiva e comportamento físico do mouse devem ser conferidos em navegador real.

Nenhum catálogo, ID, gabarito, motor de validação ou chave de progresso foi modificado. A baseline histórica do redesign retrô permanece intacta; quatro arquivos de interface autorizados têm hashes registrados separadamente em `tests/level-shortcuts-authorized-sha256.json`.
