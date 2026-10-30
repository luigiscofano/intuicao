# PACTO · Checar manual

- Remove visualmente o bloco de status e contagens mostrado na referência; preserva anúncios acessíveis, resultados e erros explícitos.
- Checar fica abaixo do mapa, separado de Confirmar resposta. Só compara valores preenchidos pelo jogador, sem considerar pistas fixas, vazios ou candidatos.
- Divergências recebem as mesmas hachuras, cores e fade de entrada existentes. Mensagem: “Algumas casas diferem do gabarito de referência.”
- Entradas compatíveis mostram aro verde no próprio mapa e “Tudo certo até aqui!”. Tabuleiro só com pistas/anotações pede preenchimento e não exibe acerto.
- Aviso e aro duram 10 segundos, incluindo fade de entrada/saída de 300 ms. Movimento reduzido desativa animações. Repetir Checar reinicia a janela; callbacks obsoletos não afetam a nova indicação.
- Edição, desfazer/refazer, reinício, navegação, saída e confirmação limpam a checagem. Não altera valores, histórico, tentativas, dicas, assistência, vitória nem avanço do Modo Sem Parar.
- Sem referência disponível, botão desabilitado com explicação. Modo Sem Parar usa sua solução gerada. Campanha usa a referência própria.
- Uma solução alternativa válida continua sendo aceita por Confirmar resposta; Checar compara estritamente com a referência e não muda a validação por regras.
- Hachuras automáticas continuam restritas a erros lógicos explícitos após 2 segundos, sem consultar o gabarito durante a edição.

Verificação determinística: tests/pacto-check-tests.mjs, tests/pacto-feedback-tests.mjs, tests/pacto-live-tests.mjs e agregado tests/run-endless-suite.mjs. Testes de DOM simulados não substituem inspeção de layout em navegador.
