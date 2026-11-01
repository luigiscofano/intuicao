# CERCO — quatro tamanhos,28mapas

## Alterações
- Seletor5×5,6×6,7×7 e8×8 na preparação. Exatamente7cartões de mapas por tamanho; trocar o tamanho mantém a família escolhida e as opções de duelo/mascotes.
- Os7mapas5×5 continuam idênticos, incluindo IDs, paredes, posições e limites.21variantes novas têm IDs próprios e geometria curada: lago central cresce de núcleo quadrado para cruz/ilha, pilares viram grupos, portais e ampulhetas estreitam corredores, cantos recuam e canais desencontrados criam rotas.
- Campos maiores usam dimensões reais em coordenadas, prévias, acessibilidade e movimento animado. O limite é sempre o número de vazios iniciais, não19 fixo.
- Escolher tamanho não altera partida salva. Ao iniciar substituição de partida em andamento, mantém-se confirmação; configurações pendentes não substituem as da partida preservada. Reset e revanche mantêm mapa/tamanho; revanche continua alternando iniciador.
- Todos os modos usam as mesmas regras. Motor já era dimensional; só reexporta os novos helpers. Bot, worker, serviço, mascotes, cores, ilustrações e animação existentes intactos.

## Validação
34testes novos:28catálogos,5600partidas(100poriniciador/mapa), prévia sem mutação, conservação6peças, barreiras permanentes, encerramento, undo/redo, replay/saves, legado sem mapId, bot em3dificuldades e cancelamento.21testes legados passaram, incluindo2800partidas dos7mapas originais. Todos os mapas têm área útil conectada, simetria180° e as6peças móveis na abertura. Tetos das novas variantes18–58jogadas. Comparação completa dos7mapas5×5 com o commit anterior passou.

Outros10jogos e ativos compartilhados preservados por hash. Não foi aplicada a proposta pendente de reestruturação do SINTONIA.

## Limites
A simetria e as simulações não provam equilíbrio perfeito nem solução estratégica exata. O bot continua heurístico com orçamento limitado, especialmente nos tabuleiros maiores. Em celulares,8×8 usa células menores para mostrar o tabuleiro inteiro; prévia e confirmação evitam compromisso no primeiro toque, e teclado continua disponível. Rolagem normal da página pode ser necessária; não há rolagem interna do tabuleiro.

Testes históricos de registro que ainda esperam TRAMA/VÉRTICE e fonte antiga de ícones já não representam a produção atual; não foram usados como critério de preservação. A comparação de hashes toma95aed627 como base vigente.

QA nativo:1.941 verificações sem falhas,173 cenários,33 respostas de Worker real. Todos28mapas em1366/390/320; todos28 em4modos no desktop; reset/revanche/undo/legado/cancelamento de bot e preservação de seleção/configuração. Em8×8, células mínimas64,75px(desktop),35,875px(390) e28,375px(320);5×5 permanece68,797/56,188/44,188px. Sem overflow ou recorte. Revisão visual8×8 em320 e seleção de tamanho por Enter concluídas. Saves originais restaurados exatamente.

Revisão adicional: vitória8×8 restaurada no desktop mantém quadro560×560px e painel300px à direita (gap24px); sem overflow e sem repetir animação. Reset remove painel/retorna ao centro. Em390px resultado fica abaixo, preservando legibilidade. Info CERCO atualizada para indicar5×5–8×8; textos dos outros jogos idênticos.3testes de preservação de produção passaram (58testes atuais no total com os55de motor/mapas).
