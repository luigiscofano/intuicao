# Sintonia — acessórios aprovados

Implementação exclusivamente visual das 13 famílias da proposta aprovada: 21 PNGs 32×32 preservados exatamente, cancela vetorial entre células e paredes contínuas pela união dos tiles. Os códigos de relação continuam visíveis; a cancela aberta recolhe suas barras. As paredes têm contorno apenas nas fronteiras, sem frestas internas.

## Verificação
- 41 testes existentes de motor, análise, serviço, campanha80 e roster: passaram.
- 5 testes novos de arte/preservação: passaram; hashes dos 21 PNGs, 16 combinações de vizinhos, estados/orientações, replay das 80 soluções e imutabilidade dos dados.
- Navegador nativo: 6.269 verificações, zero falhas/erros. Todas as 80 fases em 1366, 390 e 320 px; 14 fases representativas executadas nos três tamanhos, com comparação de cada comando ao motor, vitória, undo/redo, reset e retenção do histórico após reload.
- Revisão visual real: chave/cancela em desktop, entrega/caixa em 320, interruptor/ponte em 390. Sem overflow dos tabuleiros, paredes ou códigos das cancelas.
- Motores, serviço, campanhas, animais, celebrações e demais arquivos originais de produção mantidos byte a byte. Apenas renderBoards de Sintonia e um link CSS em index mudaram.

## Limites conhecidos
- O layout original de dois/três tabuleiros simultâneos foi preservado; em 320 px algumas células continuam pequenas (18,75 px na fase71). Não alteramos dimensões nem controles nesta atualização visual.
- Quatro testes antigos de migração em sintonia-content-migration.test.mjs já falhavam antes das alterações; não foram corrigidos neste escopo. A retenção de histórico atual foi testada no navegador.
- Reload volta à seleção pelo fluxo atual de navegação; o histórico permanece e é recuperado ao abrir a mesma fase.
