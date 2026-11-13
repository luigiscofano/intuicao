# Tabuleiros como elemento principal do Versus

Escopo: Desvio, Broto, Cerco, Mosaico, Quinhão, Estalo e Acorde. O patch é exclusivamente de apresentação: não modifica motores, armazenamento, IA, mapas, regras ou skins. Dobra e os outros jogos retirados não retornam.

## Correção

O enquadramento anterior media toda a superfície após cada mutação e encolhia o tabuleiro para acomodar prévias, placares e resultados. Versus agora usa dimensões CSS responsivas independentes dessas mudanças. Em desktop, Desvio, Broto e Cerco podem chegar a 550px; Mosaico passa a distribuir ferramentas ao lado. Acorde agrupa coleções em uma coluna compacta. As composições móveis aprovadas de Acorde e Quinhão foram preservadas. Ações móveis usam alvos de pelo menos 44px.

## Validação e limites

- Testes automatizados de motores Versus, mobile e viewport; novo teste garante geometria invariável ao variar o conteúdo dos estados.
- Auditoria real Chromium com iframes de 1440×900, 390×844 e 320×820. Os sete jogos foram abertos e medidos; estados de seleção, prévia e confirmação foram exercitados. Desvio chegou à vitória mantendo550px no desktop; histórico também foi conferido.
- Não equivale a cobertura de todos os mapas, estados, navegadores ou aparelhos físicos. Em janelas muito baixas, zoom ampliado, regras abertas ou resultados extensos, a página pode rolar: não se reduz o tabuleiro a cada jogada para esconder esse limite físico.
- Fixtures em `tests/viewport/versus-stability.html` e `tests/viewport/matrix.html` são apenas QA local e não são publicadas em `dist`.

## Recuperação

Site v238, commit `f774b5273047955c641e62a645afa806fae1cd1e`, preserva a versão anterior. Para retirar somente a mudança, reverter este PR (não toda a main) e republicar. O PR se apoia na retirada de Dobra (#89), sem incorporar os geradores Sem parar pendentes.

### Medições finais (CSS px)

| Jogo | Desktop1440 | Celular390 | Celular320 |
|---|---:|---:|---:|
| Desvio |550×550|345×345|275×275|
| Broto |550×550|349×349|279×279|
| Cerco |550×550|349×349|279×279|
| Mosaico |550×550|323×323|253×253|
| Quinhão |550×550|349×366|279×366|
| Estalo |632×633|267×268|197×225|
| Acorde |550×552|260×256|260×256|

Mosaico:25 confirmações e histórico com dimensões idênticas, nas três larguras. Acorde e Quinhão:8 sequências de prévia/confirmação + undo/redo em390/320, mantendo dimensões. Cerco320 teve verificação manual adicional em2 jogadas + undo/redo; Desvio320 teve seleção/confirmação manual. Broto foi verificado na primeira seleção/confirmação, não em todas as rodadas. Uma leitura automatizada inicial de Cerco320 com geometria zero foi descartada: o diálogo de substituição de save ainda estava aberto. Fixtures passaram a rejeitar geometria zero e confirmar o diálogo de preparação.

160 testes unitários específicos passaram. Os sete motores mantêm seus testes preexistentes; não foi executada uma campanha exaustiva de todos os mapas/níveis de IA. A matriz de abertura final não apresentou overflow horizontal ou comandos essenciais fora da janela nas três dimensões testadas. Resultados e regras longas podem exigir rolagem acessível, sem diminuir o tabuleiro.
