# Modo sem parar dos seis jogos lógicos

Implementado em DIVISA, PULSO, FOZ, REFÚGIO, MIRANTE e RENOVO. Cada jogo percorre seu catálogo certificado na ordem existente, da fase 1 à 80, e recomeça o ciclo. Não há geração de fases inéditas.

- O controle `data-presentation-mode="endless"` inicia ou retoma a sequência; a seleção explica seu escopo.
- O cabeçalho compartilhado anuncia modo, ciclo e fase atual, usando `#lg-stage-label`; não há contador adicional na barra de ferramentas estreita. Níveis retorna à seleção. As setas manuais de campanha ficam indisponíveis nesse modo.
- Vitória mantém feedback e animação por 1,8 segundo e avança automaticamente. Checagens repetidas não duplicam o avanço. Sair, trocar jogo/modo, reiniciar, editar, desfazer ou aplicar gabarito cancela o timer antigo. Cancelar a confirmação de reinício revalida uma vitória pendente e retoma o avanço com uma nova pausa, sem repetir a animação.
- Sessão própria por jogo em `games[id].endless`, dentro de `intuicao.logica.v1`. Campanhas antigas continuam compatíveis. Tentativas, última fase e conclusões da campanha não são modificadas pela sequência.
- Checagem, erros, gabarito assistido, desfazer/refazer e reinício usam o mesmo motor de sessão. A próxima rodada começa limpa. Uma vitória salva antes do avanço volta a mostrar o resultado e agenda o avanço ao retomar.
- Backup existente inclui a sessão contínua no envelope v1, sem nova chave ou migração destrutiva.

Validação automatizada: `node --test tests/logica/*.test.mjs` passou 73 testes. Os testes novos cobrem os seis jogos, transição 80→1, independência de campanha, backup/restauração, saves legados, histórico/ajuda e timer cancelável. `node --check dist/logica/ui.mjs` passou. A verificação visual integrada já conferiu 25 jogos em quatro larguras (1440, 768, 390 e 320 px): 100 layouts sem falhas. As entradas dos 25 jogos também passaram. As 28 entradas diário/sem parar das 14 campanhas passaram. As seis sequências lógicas passaram por vitória real com gabarito assistido e Checar, avanço automático, retomada e recarga, mantendo a campanha estável. Não houve erros JavaScript ou overflow. O navegador usa armazenamento sintético isolado; aparelhos físicos com toque ainda não foram testados.

Retorno via BFCache: `pageshow.persisted` revalida somente a sequência ativa em jogo, sem diálogo, e rearma a transição de uma fase resolvida sem repetir animação. Callback real coberto por teste com todos os bloqueios de contexto.
