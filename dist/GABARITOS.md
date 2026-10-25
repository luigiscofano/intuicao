# Resultados e gabaritos

## Para jogar

Cada envio incorreto pelo botão **Confirmar resposta**, inclusive um tabuleiro incompleto, conta uma tentativa errada naquele nível. Edição, anotações, pistas e hachuras locais de contradição não contam. Em Reflexos, disparar parte das fontes é exploração: somente quando todas as fontes necessárias terminam o disparo a tentativa é avaliada. O botão Confirmar todos também avalia o conjunto completo. Repetir uma fonte já disparada na tentativa parcial é idempotente. Depois do terceiro erro aparece **Ver gabarito**. O botão monta uma configuração padrão válida, sem alterar pistas fixas, mas não concede a vitória automaticamente: confirme para conferir a solução. A conclusão passa a ser identificada como assistida.

Recomeçar, trocar de fase e recarregar a página não apagam o desbloqueio. Os registros são locais ao navegador e separados por jogo e identificador da fase, incluindo os identificadores ELO v2 e PRUMO v2. Se o navegador bloquear o armazenamento, o desbloqueio funciona enquanto a página permanecer aberta, mas não é garantido após fechá-la. O progresso não sincroniza entre aparelhos. Limpar os dados do site apaga também esses registros.

A revisão v5 reúne 1200 níveis nos cinco puzzles, dos quais 500 são de Reflexos. A campanha v5 conserva 500 fases e corrige a geometria de 380 mapas. As 500 referências foram reproduzidas no motor preservado, com zero reflexão abaixo de 20° entre o feixe incidente e a linha do espelho. O limite é editorial, não uma nova regra de jogo: outras soluções legítimas continuam aceitas. Foram reexecutados 11.752 casos e os testes individuais/cantos ±0,5°. A inspeção em navegador da nova publicação permanece separada destes testes de motor e DOM; não se declara calibração com jogadores. Veja o [registro v5](development/reflexos-v5/README.md). O fluxo de gabarito é testado no app com DOM determinístico, sem vitória automática antes da confirmação. Os arquivos de solução acompanham o código; o desbloqueio é uma regra da interface, não proteção criptográfica.

Em Reflexos, o gabarito exemplifica uma solução, não define a única resposta aceita. Outra configuração que satisfaça as regras existentes também deve vencer. Não é obrigatório usar todos os espelhos ou portais, reproduzir uma ordem específica de cliques nem igualar os ângulos do gabarito.

DESVIO é um duelo, não um puzzle com resposta única. Não recebe gabarito de fase: celebra o vencedor da partida local e distingue a sua vitória da vitória do bot. Análise e treino já existentes permanecem disponíveis.

## Feedback

- Vitória: borda verde, zoom suave, PARABÉNS e sparkles, preservando as ilustrações existentes.
- Derrota: pequeno tremor, borda vermelha e blur por 300 ms, sem modal ou texto visual de derrota nos puzzles. Há anúncio acessível do resultado.
- Preferência por movimento reduzido: conserva a indicação visual sem animação de tremor/zoom/blur.
- Editar, recomeçar, mudar de fase ou de jogo cancela os efeitos pendentes. Aplicar o gabarito também cancela o disparo de Reflexos em andamento.

## Implementação

`answer-progress.mjs` mantém contagem e assistência em `intuicao.answers.v1`. Instâncias dos jogos originais e da coleção reconciliam seus registros antes de gravar para não sobrescrever o progresso umas das outras. As 400 soluções geométricas de ELO e PRUMO em `geometry-answers.mjs` não são a contagem da campanha Reflexos. PACTO usa as soluções certificadas de seu catálogo. As soluções dos jogos originais são fornecidas em módulo específico.

O contêiner de feedback dos jogos novos é o próprio tabuleiro HTML, com seletores dedicados: antes, os seletores de zoom e blur só alcançavam o SVG dos jogos de geometria. Respostas incompletas agora também acionam o caminho de erro explícito.

## Limites de validação

Os testes automatizados descritos nos relatórios históricos usam motores puros e uma simulação determinística do DOM. A inspeção de marcação, regras CSS, sobreposição e acessibilidade não equivale a uma sessão em navegador real. As regras e tolerâncias não podem ser modificadas para acomodar a campanha v5; sua dificuldade é revista pela composição e pelas relações entre trajetos.

Um produto completo de alternativas nomeadas é exaustivo somente dentro dessas alternativas. Perturbações da solução e amostragens angulares são verificações finitas. Nenhuma delas, isoladamente, demonstra unicidade contínua ou ausência de toda solução não catalogada. Alternativas legítimas devem ser aceitas; quando uma delas elimina o desafio previsto, a fase ou sua classificação precisa de revisão, não de uma nova regra de vitória.

## Catálogo atual

NEXO e Equilíbrio não são selecionáveis nem aceitos como jogos importados. Os dados históricos locais não são removidos. Os novos níveis de Corte usam IDs corte-v2 e o gabarito monta uma solução alcançável no modo básico, restrito a uma direção.

## Reflexos v5: identidade e progresso

As quatro faixas são Básico (1–200), Intermediário (201–300), Avançado (301–400) e Mestre (401–500). O número mostrado na seleção pode mudar sem alterar a identidade interna de uma fase inalterada. IDs existentes são preservados para esse reaproveitamento; fases novas ou redesenhadas usam IDs de versão própria. A conclusão, os erros e a assistência não devem passar para uma fase diferente que ocupe o mesmo número. O histórico não deve ser apagado nem todos os saves reiniciados.

A revisão atual conserva 120 IDs da campanha v4 e cria 380 identidades para mapas redesenhados. Os500 mapas anteriores e as 200 definições originais continuam arquivados; 96 IDs v3 seguem ativos. Os testes de preservação usam armazenamento sintético e não acessam saves reais. O app mantém registros antigos sem reset, sem apagá-los e sem transferir conclusão para um novo desafio. Veja o [registro de desenvolvimento v5](development/reflexos-v5/README.md) para métricas e limites. As fichas técnicas e os vetores de solução são documentação de desenvolvimento, não conteúdo para dicas normais.

## Reflexos v3: registro histórico

Na campanha v3, os 200 níveis usavam IDs light-v3-1 a light-v3-200 e soluções de referência no próprio catálogo. Os registros anteriores permaneciam armazenados e não eram convertidos. O teste app-flow daquela revisão percorreu os 200 Reflexos e 100 Corte, incluindo três erros, desbloqueio, aplicação sem vitória automática, confirmação assistida e persistência. Esse resultado pertence à v3; não declara uma execução dos 500 níveis da v4.
