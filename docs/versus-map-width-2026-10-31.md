# Molduras de mapas em largura integral

Pedido: estender os quadros de seleção CERCO/BROTO até a outra borda interna, com respiro lateral simétrico.

## Alteração limitada
- Apenas `dist/broto/ui.css` e `dist/cerco/ui.css`: remover teto de 560/650 px do quadro, largura 100% com border-box.
- Grade auto-fit com mínimo de 125 px, miniaturas permanecem 72 px. Duas colunas compactas até 600 px.
- Nenhum controle de modo, personagem, iniciar ou continuar foi deslocado. Descrições, sete mapas de cada jogo, motores, persistência, recortes e todos os demais arquivos de produção byte-idênticos ao commit 2ea5c56.

## Validação
- Três testes Node de invariância, semântica e CSS localizado passaram.
- Fixture de navegador: cada um dos 14 mapas em 1920, 1634, 1366, 390 e 320 px; seleção, descrição exata, configuração, início, jogada, reload, reset e preservação do save antes de iniciar.
- Dimensões móveis verificadas em iframes responsivos de navegador real; não dispositivo físico.
- Resultado: 1540 verificações de navegador passaram, zero erros e zero overflow horizontal.
- Desktop: quadro 1154 px, margens 23/23 px; sete cartões numa fileira, 72 px de miniatura.
- BROTO 390/320: quadro 321/251 px, margens 11/11 px. CERCO 390/320: quadro 325/255 px, margens 9/9 px. Margens medidas a partir da borda externa do painel de seleção, incluindo seu 1 px de borda.
- Quatro testes Node passaram após adicionar comparação do CSS restante. Inspeção visual real desktop e 320 px aprovada.
