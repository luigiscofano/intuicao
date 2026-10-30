# REPASSE80 — verificação da interface

Prévia local do checkout final, Chromium desktop, 30/10/2026.

## Observado no navegador
- Seleção com seis faixas: Básico1–15, Aprendiz16–30, Intermediário31–45, Avançado46–60, Mestre61–75 e Modo Sábio76–80.
- Nível1: prévia de duas cópias integrais +1; clique retira diretamente e produz vitória automática com grade vazia e quatro metas exatas; desfazer restaura peça e caixas, refazer reproduz vitória.
- Reinício exibe confirmação e restaura o estado inicial após confirmar.
- Introduções31/46/61 mostram respectivamente uma seta única, um par perpendicular e quatro setas; contadores novos e textos explicativos corretos.
- Nível80 mostra dez peças apenas horizontais/verticais e próximo nível desativado.
- Regras permanecem à direita; imagem observada mostra metas exatas verdes claras, incompletas amarelas e a prévia destacada, sem mudanças de desenho.
- Nenhum botão de dicas, confirmação de resposta ou opções avançadas aparece no REPASSE; o wrapper padrão existente foi preservado.

## Cobertura programática complementar
`repasse80-ui.mjs` executa handlers reais das80fases em DOM determinístico: prévia, retirada, vitória automática, desfazer/refazer, confirmação/cancelamento de reinício, retomada, importação personalizada e diário/desafio diário. Isso não equivale a executar80partidas no navegador.

## Limite explícito
Emulação móvel não foi realizada. Uma verificação anterior registrou a mensagem Chromium “DevTools not allowed on this page” por política da organização. Sem nova autorização/evidência, não houve nova tentativa, mudança de política ou rota alternativa para contornar a restrição. CSS responsivo permanece byte-idêntico; isso não é prova de teste visual móvel.
