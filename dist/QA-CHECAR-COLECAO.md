# Checar · ELO, PRUMO e PACTO

Checar é manual e separado de Confirmar resposta. Não registra tentativa, dica, assistência ou vitória. Os três jogos mostram um contorno verde para acerto e vermelho para erro, no tabuleiro exato, sem interceptar entrada. Mensagens e contornos duram 10 segundos, incluindo fade suave; movimento reduzido desativa animações.

## Semântica

- PACTO parcial mantém comparação com o gabarito de referência e hachuras existentes nas diferenças. Uma configuração completa válida é aceita mesmo que alternativa.
- ELO/PRUMO completos são avaliados pelas regras. Parciais compatíveis com uma referência válida recebem verde. Outras configurações sem contradição imediata são examinadas por um Worker descartável, com limite de 1,2 segundo.
- Uma conclusão válida encontrada recebe verde. Somente uma prova de contradição ou busca exaustiva sem conclusão recebe vermelho. Orçamento esgotado, ausência de Worker ou erro de análise são inconclusivos e neutros.
- Casas vazias e anotações não são respostas; hachuras da checagem se limitam a casas preenchidas pelo jogador relacionadas à violação demonstrada. Contradições globais não atribuem culpa arbitrária a casas específicas.
- Só pistas/apoios automáticos: pede preenchimento, sem acerto. Sem referência válida: botão desabilitado com explicação.

Repetição inicia nova janela. Edição, arraste, desfazer/refazer, reinício, navegação, confirmação e saída cancelam a busca e o feedback anterior; retornos obsoletos não alteram a tela. Busca não bloqueia interação. Confirmar e avanço do Modo Sem Parar permanecem independentes. Motores, campanhas, gabaritos e hachuras automáticas de PACTO após 2 segundos não foram modificados.

## Verificação

`tests/manual-check-tests.mjs` cobre 400 referências geométricas de campanha, estados parciais, alternativas válidas reais de ELO/PRUMO/PACTO, Worker real e simulado, timeout neutro, callback obsoleto, repetição, expiração de 10 segundos, ausência de referência, histórico/contadores intactos e avanço Modo Sem Parar. `tests/pacto-check-tests.mjs` e `tests/pacto-feedback-tests.mjs` preservam regressões anteriores. Inspeção real de layout/Worker no Site publicado é uma etapa separada.
