# Estabilidade de SINTONIA e medidor do Corte Certo

## SINTONIA
A indicação “✓ no destino” ganhava peso e largura dentro de um cabeçalho flex que permitia quebra. Reproduzido em390px: chegada alterou a altura e deslocou o mapa em2,296875px, por exemplo na fase3. Agora nome e estado têm linhas próprias; a linha do estado tem14px e peso constante em ambos os estados. O texto completo permanece disponível e o status nunca quebra. Nomes longos podem ocupar linhas próprias, sem mudar durante os comandos.

QA nativo:80fases ×1366/390/320, rosters rotativos incluindo os16animais; todos os comandos das soluções, estados de vitória, undo/redo/reset em1/21/50/54/71/80.13.561verificações passaram, sem alteração das coordenadas/dimensões dos mapas entre estados. Inspeção visual em320px com peixe-boi e piranha. Saves originais restaurados exatamente.

## Corte Certo
O mesmo medidor #original-metric foi movido para dentro da moldura, junto da meta e logo abaixo do desenho, antes dos controles. Não há cópia do valor ou cálculo paralelo. Ao trocar para Reflexos, o elemento retorna ao readout original. A porcentagem continua aparecendo somente após confirmar, como antes; edição limpa a leitura para “—”. Layout flexível acomoda a largura compacta sem sobreposição.

Somente4arquivos de apresentação alterados. Motores, fases, sprites, saves e animações preservados por comparação de hashes; nenhuma reestruturação pendente de SINTONIA foi aplicada.30testes de motor/serviço/arte e3testes de preservação/layout passaram.

Corte QA nativo:241verificações passaram em1/46/61/80 ×1366/390/320, antes/depois de confirmar, comparação com cálculo do motor e troca Corte–Reflexos–Corte. Inspeção visual em320px antes e depois da resposta, sem sobreposição; saves restaurados.
