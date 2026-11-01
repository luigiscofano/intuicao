# CERCO e BROTO — preparação e retomada explícita

As rotas chamavam restoreOnLoad antes de mostrar a preparação, reabrindo automaticamente o tabuleiro salvo. Agora cada entrada abre os mapas e configurações; a sessão é apenas carregada para memória. Timers, prévias e buscas são cancelados ao abrir a preparação.

Abaixo de todas as opções aparece o quadro “Deseja retomar a partida interrompida?” e o botão “Retomar partida interrompida”, somente quando existe sessão válida e ainda não concluída. CERCO restaura configuração, mascotes, mapa/tamanho, turno, histórico e futuro originais; opções pendentes da preparação não sobrescrevem essa sessão. O bot só pode jogar após a retomada explícita. BROTO mantém a escolha de modo e jardim da partida salva, inclusive intervalo entre as duas rodadas; duelo finalizado não é considerado interrompido.

Iniciar novo jogo mantém confirmação antes de substituir uma partida interrompida. Cancelar preserva o save. Registros inválidos permanecem preservados e não apresentam botão de retomada. Nenhum seletor de personagem foi inventado no BROTO. Motores, mapas, regras, sprites, animações e demais jogos permanecem byte-idênticos.

29 testes de motor e2testes de contrato/preservação passaram. Proposta de reestruturação de SINTONIA continua sem implementação.

QA nativo:1.911 verificações em214cenários sem falhas;28mapas CERCO e7BROTO, larguras1366/390/320, modos e histórico/futuro de undo. Entrada por cartão, home/voltar, deep link e reload sempre abre preparação. Retomada preserva estado/config; CERCO com bot pendente fica parado até o clique e então recebe resposta real do Worker. BROTO entre rodadas e segunda rodada retomam; concluídos e inválidos não oferecem retomada. Novo jogo cancelado/confirmado, legado sem mapId e posicionamento inferior do bloco verificados. Inspeção visual de ambos em320px e ativação de Retomar por Enter concluídas. Saves originais restaurados exatamente.
