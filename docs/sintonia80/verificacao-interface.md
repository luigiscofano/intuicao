# SINTONIA80 — interface e limites de verificação

Na prévia gerenciada, em Chromium desktop, por entradas nativas e inspeção de capturas: seleção identifica campanha de 80 fases e Básico 1–15; jogo identifica 01/80; paisagem limpa e animais aprovados preservados; regras abertas à direita; Modo Sem Parar presente; sem botão visível de confirmação, dicas ou opções avançadas. A fase 1 foi vencida com a seta para cima, sem confirmação. Ctrl+Z restaurou ambos os animais e retirou a vitória; Ctrl+Shift+Z e recarga retomaram a vitória e as mesmas espécies (arara-azul e tucano). Reinício abriu confirmação; Cancelar conservou a vitória; confirmar restaurou a posição inicial mantendo as espécies.

A cobertura de todas as 80 fases, estados de mecanismos, migrações e distribuição das peles está nos testes determinísticos dos handlers reais com DOM sintético; não equivale a executar as 80 partidas no navegador. A inspeção nativa acima cobriu um caso introdutório e seus fluxos repetidos, não todas as combinações visuais.

Uma tentativa nativa de estreitar a janela pela borda não mudou a largura da captura. Portanto layout móvel/toque não foram verificados nesta revisão. Não se abriu nem contornou DevTools, cuja restrição organizacional já era conhecida. Não se instalou outro navegador nem se usou automação alternativa. As folhas de estilo responsivas, limites de célula 75/70/62,5 e arte ficaram byte-idênticos à versão anterior.

Não houve testes humanos, avaliação de diversão nem calibração empírica de dificuldade. As capturas serviram somente à revisão interna e não integram a entrega.

Após estabilizar os arquivos, a seleção final mostrou também Avançado 46–60, Mestre 61–75 e Modo Sábio 76–80. A fase 71 foi aberta e resolvida no navegador com seus 11 comandos certificados: a caixa apareceu no painel receptor e a chegada 2/2 produziu vitória automática. Antes da estabilização, a recarga automática da prévia tornou uma coordenada obsoleta e abriu uma fase de Reflexos; o estado foi reinspecionado e a navegação refeita, sem inferir falha da aplicação. A verificação 71 acima foi realizada depois da estabilização.
