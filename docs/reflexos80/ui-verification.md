# Interface e histórico — REFLEXOS 80

## Escopo preservado

A integração muda somente três linhas da seleção em `app.mjs`: seis faixas 15/15/15/15/15/5, limite ordinal derivado do catálogo e retirada das subdivisões antigas do Básico. A navegação e o seletor já usam o comprimento real do catálogo. Não existe desafio diário nem roteamento por URL no aplicativo original REFLEXOS; não foi criado um novo comportamento.

Regras contextuais identificam a primeira aparição da mecânica comparando a fase com as anteriores do catálogo, sem números antigos fixos. A interface mais recente abre as regras em todas as entradas, comportamento preservado. Dicas visíveis somente no PACTO; opções avançadas somente no REFLEXOS; confirmação conjunta, disparos individuais, desfazer/refazer, reinício confirmado e rótulo Modo Sem Parar preservados.

Conclusões, última fase, rascunhos e assistência continuam ligados à identidade. Nenhuma migração numérica, exclusão de registros ou reinterpretação de rascunhos foi acrescentada. Identidades retiradas permanecem nos stores existentes.

## Evidências determinísticas

- `tests/light80-integration-ui.mjs`: catálogo sintético de 80 fases; seis faixas, todas as fronteiras, navegação, conclusão/rascunho/assistência após reordenação de ID, reinício cancelado/confirmado, estado de diálogo obsoleto, desfazer/refazer, importação JSON, Modo Sem Parar e armazenamento indisponível.
- `tests/light80-ui-preservation.mjs`: comparação exata de 18 arquivos protegidos com a publicação de origem `58c52648c5c5ebff46a742de6ebb55c99d758349`; permite somente as três linhas de seleção em `app.mjs`.
- `tests/light-v4-integration-progress.mjs`: retenção de identidades ausentes, mesclagem sequencial entre abas, armazenamento malformado ou de versão futura não sobrescrito, falha de quota e progresso em memória.
- `tests/light80-campaign-ui.mjs`: PASSOU no catálogo final: 240 erros completos, 80 aplicações de gabarito sem confirmação automática e 80 vitórias explícitas. Estreias confirmadas: base 1, paredes 5, duas fontes 9, portal universal 12, portal seletivo 16, terceira fonte 21. O primeiro candidato revelou seletividade prematura no 15; a composição foi corrigida e o teste integral reexecutado com sucesso.

O teste histórico completo `focused-game-controls.test.mjs` compara os jogos de conclusão automática com uma publicação anterior às revisões de 80 fases e falha por essa divergência histórica. Sua verificação isolada de dicas somente no PACTO passa. A preservação desta revisão é comparada com a publicação de origem atual acima.

## Limite da verificação nativa (30/10/2026)

O preview gerenciado foi iniciado pelo comando suportado `sites-preview start` e o status confirmou `http://127.0.0.1:4173/`. Inventário e capturas nativas Sky funcionaram, mas a tentativa de focar a barra de endereço por `sky.press_key` falhou: **AT-SPI provider with process ID 648 is unavailable for X11 window 27262979; registry reported 0 provider connections**. A captura seguinte confirmou que não houve navegação para o preview. Uma ação coordenada nativa posterior alterou o tamanho da janela de forma inesperada; novas ações foram interrompidas para não interferir com possível uso concorrente.

O preview foi encerrado pelo comando suportado `sites-preview stop` após a inspeção. Não se tentou CDP/DevTools (anteriormente negado pela organização), substituição da infraestrutura, automação alternativa ou alteração de permissões. Portanto, o catálogo final não tem aprovação visual em navegador nativo nem teste móvel nesta execução. DOM determinístico não equivale a navegador, ergonomia humana ou teste responsivo real.
