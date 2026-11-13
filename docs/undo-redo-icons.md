# Desfazer e Refazer: setas acessíveis

## Mudança

Os rótulos visuais não cabiam nos dois botões da lateral estreita. O histórico agora mostra somente as setas, centralizadas, com alvo mínimo de 44 × 44 px. A solução é compartilhada pelos 19 jogos ativos e pelos motores legados que usam o mesmo shell.

Mantidos: botões nativos, handlers, estados `hidden`/`disabled`, nomes acessíveis Desfazer e Refazer, foco por teclado e tooltips. Tooltips com atalhos existentes não são substituídos. Não foram alterados regras, progresso, mapas, artes ou geradores.

## Verificação

- Teste automatizado percorre os 19 jogos do catálogo e verifica identidade dos handlers, nomes, tooltips e transições de estado. O shell também testa os registros preservados para compatibilidade.
- Browser: todas as 12 campanhas em tela de 390 px; Desvio, Broto, Cerco, Mosaico e Estalo em 390 px; Quinhão e Acorde em 320 px. As setas não exibem texto e os botões mantêm altura de pelo menos 44 px.
- Pulso: jogada, Desfazer, Refazer por Enter, estados habilitado/desabilitado e screenshot desktop verificados.
- Testes focados de apresentação e escopo aprovados. Não equivale a testar todas as fases em dispositivos físicos.

A expansão do Estalo publicada na versão 246 foi preservada. O patch GitHub é seletivo: não inclui os geradores Sem parar nem a expansão do Estalo, que tem PR próprio.
