# BROTO — passagem de rodada dentro do jardim

O resumo da primeira rodada e botão Próxima rodada estavam no contêiner de resultado após a coluna do tabuleiro/status. Agora usam um contêiner próprio dentro da moldura do jardim, imediatamente após as casas. O bloco só aparece no intervalo entre rodadas e é limpo em todos os demais estados; a vitória/empate final continua usando o resultado lateral original.

Alterados somente dist/broto/ui.mjs e ui.css. Nenhuma regra, save, mapa, sprite, controle ou animação mudou. Todos os323 outros arquivos de produção permanecem byte-idênticos. A preparação/retomada explícita permanece; a reestruturação de SINTONIA não foi aplicada.

QA:30 testes Node de motor/mapas passaram, incluindo1.400 duelos completos. Navegador nativo:1.267 verificações em111cenários sem falhas, cobrindo7mapas×2modos×1366/390/320px. Última jogada real, texto/contagem, bounds dentro da moldura, undo/redo, retomada entre rodadas, segunda rodada com Jogador2 e reset passaram. Dimensões do grid/casas variaram0px: somente a moldura cresce para acomodar o resumo. Vitória/empate finais continuam à direita em desktop e abaixo no compacto. Capturas1366/320 inspecionadas, saves originais restaurados e fixture removida antes de publicar.
