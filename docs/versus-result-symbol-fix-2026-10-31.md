# Correção de símbolos Versus

O SVG de retry CERCO/TRAMA ficava fora de `.result-motion`, único ancestral contemplado pelo estilo compartilhado; consequentemente herdava largura geral e preenchimento preto. Foram ampliados somente os seletores do componente para CERCO/TRAMA/VÉRTICE: botão circular original de 52 px e SVG original de 26 px, `fill:none` e stroke corrente, mesmas ações e acessibilidade. Declarações e seletores originais dos outros jogos continuam byte-idênticos. BROTO não tem esse botão SVG no resultado e não foi alterado.

O losango na preparação TRAMA herdava dimensões percentuais destinadas às peças do tabuleiro. Os cartões agora têm dimensões locais explícitas (losango 16×16, 13×13 compacto; círculo 20×20,16×16) e alinham símbolo e nome na mesma linha. Nenhuma peça do tabuleiro foi redimensionada.

Alterados: `dist/style.css`, `dist/trama/ui.css`; testes em `tests/versus-result-symbols.test.mjs`.

QA: 2 testes estáticos passaram; 55 verificações no navegador em1366/390/320 passaram, incluindo resultado local/vitória/derrota ao bot/empate, tamanho52/26, stroke branco/fillnone, reset imediato preservando configuração/iniciador, símbolos setup/playquadrados dentro cartões. ResultadoBROTOcontinua sem ícone inventado. Sem mudança de motores, saves ou animações originais.
