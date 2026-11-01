# Sintonia — paredes claras e mecanismos leves

Pedido posterior à aprovação inicial: parede mais clara e interruptor/cancela menos robustos.

- Paleta do musgo clareada em cinco tons; contorno escuro original, geometria e conexões intactos.
- Interruptor com base19×3px, haste fina e manopla menor; mantém posição esquerda/direita e lua/sol. Aproximadamente45% menos pixels pintados.
- Cancela com postes e barras mais finos, centro aberto quando recolhida; continua na divisória entre casas. PNGs correspondentes têm54–58% menos pixels pintados.
- Outros17PNGs mantidos byte a byte. Sem alteração em UI/handlers, motor, mapas, saves, sprites animais ou dimensões.

## QA
- 47 testes passaram:41 existentes de motor/serviço/campanha/animais e6 de arte/preservação.
- 6.269 verificações nativas sem falhas:80fases em1366/390/320px,14fases representativas com estados, comandos, vitória, undo/redo/reset/reload.
- Paredes:16padrões de vizinhança e cobertura pixel a pixel de todas as fases, sem frestas ou invasão do piso.
- Revisão visual desktop e compacta; cancela fechada/aberta e interruptor alternado manualmente no navegador.
- Limites de tamanho compacto e testes legados de migração continuam conforme relatório anterior; não houve mudança de regras ou dimensões neste acabamento.
