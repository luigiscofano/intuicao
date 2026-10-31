# Corte certo — Mestre e Modo Sábio

Fases 61–75: quinze animais oficiais, alternando ícones de lado e de frente, com dois recortes internos adicionais (quatro em onça e arara). Fases 76–80: cinco curvas não lineares oblíquas, metas 29/37/43/63/71%, três ou quatro vazios assimétricos de tamanhos diferentes. A dificuldade cresce pela distribuição da área útil e dos vazios, não pela exigência de um ângulo minúsculo. Todos os certificados aceitam o deslocamento inteiro e seus vizinhos ±2 dentro da tolerância original de ±3 pontos percentuais.

O contorno exterior e os vazios originais vêm dos PNGs oficiais sem alterações; recortes adicionais ficam inteiramente dentro da parte preenchida, com pelo menos quatro pixels-fonte de respiro. Não se apagam nem se dividem componentes. Renderização evenodd, partição geométrica e cálculo de área representam a mesma máscara. Vazios não contam em nenhuma área; não há subtração duplicada.

Produção: dois módulos novos `cut-fauna-master-data.mjs` e `cut-fauna-master-levels.mjs`; integração apenas em `cut-fauna-geometry.mjs`, `cut-campaign.mjs` e `original-hints.mjs`. App, controles, motor adaptativo, animação original, PNGs e demais jogos ficam byte a byte iguais ao commit 43e3b83ca7b5b66d39e52a9399422fbd4f4c065a. Primeiras 60 fases, cálculos e dicas preservados. Os vinte novos IDs não herdam conclusões/rascunhos dos desenhos antigos; aliases servem somente à seleção, mantendo históricos antigos intactos.

## Verificações
- 27 testes Node passaram: reconstrução PNG menos recortes == retângulos == contornos; preservação de componentes/bordas; primeiras 60 definições e 120 avaliações/dicas; soluções de todas as 80 fases; 600 cortes extremos; invariância dos outros arquivos.
- 217 verificações do importador, 205 de dicas e 19 casos de orçamento passaram. As 35 figuras animais são específicas da campanha, não ampliam o esquema JSON de polígonos personalizados.
- 911 verificações nativas de navegador passaram nos vinte níveis em 1366/390/320 px. Foram 240 comparações de percentuais (inicial, extremos e solução), verificação de máscaras/vista, controles, navegação, rascunhos/reload, uma única cena original de vitória e restauração integral dos saves de QA.
- Capturas dos vinte tabuleiros reais e dos cinco Sábio compactos inspecionadas. Recortes adicionais projetados a 273 px de tabuleiro medem 5,84–24,55 px de diâmetro; nenhuma promessa de teste em aparelho físico.
- Setas nativas de teclado nas fases 61 e 80 produziram eventos trusted e ajustes de 0,1, retornando ao valor inicial.
- Nesta sessão: máximo observado 27,6 ms de cálculo, 33,2 ms de processamento síncrono de input e 36,2 ms de confirmação. Valores de laboratório, não garantia para todo hardware.

Limite preexistente preservado: no fim da campanha, a seta próxima fica desativada; após vitória o botão inferior exibe “Voltar ao início”, mas seu handler permanece limitado ao intervalo da campanha. Não houve mudança desse fluxo nesta edição de desenhos.
