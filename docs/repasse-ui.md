# REPASSE — interface e retomada

## Componentes existentes utilizados

A implementação usa os componentes visuais reais do Intuição: a tela de seleção, os cartões .level-tile, a faixa .selection-actions, as abas Desafios/Endless, o cabeçalho da partida, as setas de navegação, o painel lateral de regras, as opções avançadas e as ações de confirmação, dica e gabarito. O contorno, as flores, a tipografia e os estados dos cartões vêm dos seletores compartilhados estendidos pela integração.

O diálogo de reinício é criado por createRestartConfirmation, e a vitória utiliza createResultMotion e a celebração já aprovada. O desafio diário usa dailyIndex; os eventos locais usam recordEvent. Não foram criados mascotes, sprites, sons ou um sistema de pontuação paralelo.

O CSS próprio define o tabuleiro, suas caixas, as setas das peças e a animação de repasse. A seleção apresenta os 500 níveis em 20 capítulos, sem filtros de dificuldade. Modo livre e desafio diário ficam lado a lado. A partida mostra o número do desafio e utiliza as setas existentes para avançar ou voltar, sem seletor de fase.

## Tabuleiro e interação

O tabuleiro posiciona cada peça no mesmo lugar durante toda a partida e renderiza exatamente uma caixa para cada extremidade de linha e de coluna. Os quatro cantos não recebem caixas. Todas as metas, inclusive zero, mostram acumulado e objetivo. Os estados incompleto, exato e ultrapassado recebem símbolos e nomes acessíveis além de cores.

Uma ativação normal por clique, toque, Enter ou espaço retira a peça imediatamente. Não existe um primeiro toque obrigatório para seleção. O botão explícito **Inspecionar repasses** permite observar sem retirar quando o jogador deseja esse comportamento.

Apontar ou focar uma peça destaca seus destinatários atuais e mostra o valor inteiro de cada contribuição. A prévia é recalculada pelo motor a cada consulta. A transição é resolvida antes da animação: os elementos que mostram +valor não executam somas e não controlam a validade da retirada. As peças não são desabilitadas preventivamente por uma heurística de derrota.

A navegação por teclado usa um único ponto de entrada no tabuleiro. As setas procuram a próxima peça na direção desejada; Enter e espaço usam a ativação nativa do botão. Repetição automática de Enter/espaço é ignorada. Após retirar, o foco passa para uma peça restante próxima; desfazer devolve o foco à peça restaurada. Ctrl+Z e Ctrl+Shift+Z respeitam campos de texto, menus e diálogos.

As peças mantêm alvos de pelo menos 44 px. Em celular, as setas de fase ocupam uma linha acima do tabuleiro para liberar largura às caixas. Tabuleiros maiores podem ser percorridos horizontalmente dentro de sua própria região nomeada e focável, mantendo peças e caixas alinhadas. A região aceita rolagem por teclado e mostra uma orientação discreta em telas estreitas. Números e setas se ajustam à largura da célula para manter espaço entre eles, inclusive com dois dígitos em alvos de 44 px. Valores longos aumentam a largura mínima das células; nenhum número é truncado, arredondado ou limitado para caber. A animação respeita movimento reduzido.

## Ajuda, tutorial e análise

As dez primeiras fases apresentam lembretes curtos, distribuindo os conceitos fundamentais do jogo. As estreias nas fases 201, 276 e 351 mostram a configuração nova. O painel completo de regras começa fechado, como no padrão atual.

As dicas usam o serviço de análise em worker e são aplicadas ao estado completo presente. Os três níveis apontam uma região, explicam uma continuação possível e identificam uma retirada com posição e motivo. Antes de exibir ou aplicar uma sequência, a UI reproduz a continuação pelo motor. Uma ordem alternativa válida é aceita.

Análise inconclusiva recebe texto próprio e não é apresentada como impossibilidade. Um excesso de meta identifica a caixa afetada e oferece a exploração com desfazer ou reinício. O gabarito segue o padrão dos jogos existentes, disponível após três confirmações sem vitória.

## Progresso e segurança da retomada

O único namespace persistido é **intuicao.repasse.v1**. Campanha, Endless e fase personalizada possuem sessões separadas. Cada sessão guarda identificação e versão da fase, definição, IDs das retiradas, cursor, snapshot, assistência, confirmações e marcador de conclusão.

A restauração reproduz todas as retiradas, inclusive o futuro de refazer, e compara o snapshot no cursor. IDs repetidos, ações inexistentes, snapshot adulterado ou definição incompatível reiniciam somente aquela tentativa. Os registros permanentes das outras fases permanecem disponíveis.

Conclusões da campanha preservam a primeira data. Uma nova resolução independente pode substituir o marcador de assistência sem criar outra conclusão. Endless guarda também o marcador de conclusão fora do histórico, em **current.completed**: desfazer, refazer, reiniciar, recarregar ou recuperar uma sessão inválida não contam a mesma vitória de novo.

As métricas visíveis são progresso da tentativa — peças retiradas e metas exatas. Não há recorde fictício de menos movimentos, pois qualquer vitória exige retirar todas as peças.

## Endless e trabalho assíncrono

A dificuldade sobe uma faixa a cada oito conclusões, com retomadas a cada cinco. Configurações desconhecidas são apresentadas uma por vez: uma seta, duas perpendiculares e quatro setas. O gerador recebe uma solicitação explícita de introdução, que exige uma fase curta com a novidade.

Cada desafio salvo inclui definição integral, solução, seed, parâmetros, assinatura e versão do gerador. Reinício conserva a definição. Novo desafio gera outra. A UI antecipa uma fase em segundo plano; uma antecipação só é reutilizada quando número, seed e parâmetros correspondem à próxima solicitação.

Geração e análise usam serviços separados. Solicitações antigas são canceladas e seus resultados descartados ao trocar de fase, modo ou jogo. Se uma geração falha, a tentativa anterior continua salva. A definição e a solução do desafio retornado são conferidas novamente antes de sua exibição.

## Importação e exportação

A seleção aceita arquivo ou texto JSON, com limite de 200 KB. O editor fica nas opções avançadas. Estrutura, limites aritméticos e solução são conferidos antes de jogar. Uma solução fornecida é reproduzida; se necessário, a busca ocorre no worker. Um resultado inconclusivo não autoriza iniciar uma fase sem certificado.

Exportação de fase e métricas locais usa o download nativo. Não existe envio automático de dados. Fases personalizadas não alteram o progresso da campanha.

## Verificações automatizadas realizadas

A verificação de sintaxe de dist/repasse/ui.mjs passou. O arquivo tests/repasse-ui-state.test.mjs passou em 10 de 10 casos:

- retirada atômica e eventos repetidos sem efeito;
- restauração completa com futuro de refazer;
- nova hipótese após desfazer sem mutar o histórico anterior;
- persistência de ordem alternativa vencedora;
- rejeição de snapshots, IDs, versões e definições incompatíveis;
- isolamento entre campanha e Endless;
- idempotência da conclusão e preservação da primeira data;
- proteção contra contagem duplicada após recuperação de uma tentativa;
- atualização de assistência sem nova recompensa;
- progressão, interlúdios e uma novidade por vez no Endless.

A verificação visual e de interação no navegador é conduzida pela integração e registrada no relatório final de validação. Esses testes automatizados não equivalem a testes com jogadores.
