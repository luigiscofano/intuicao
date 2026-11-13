# Laterais dos jogos: faixa de identidade

## Escopo aprovado

A opção A mantém o fundo claro, cantos discretamente arredondados, faixa verde,
amarela e azul e pequena assinatura de azulejos. Todos os 23 jogos ativos usam
o mesmo organizador visual, sem transformar jogos versus em campanhas.

- Confirmar: verde com check, apenas quando o jogo já oferece confirmação.
- Desfazer e Refazer: setas opostas, com nomes visíveis.
- Reiniciar: amarelo, preservando a confirmação e as restrições originais.
- Como jogar: acesso às regras completas do próprio jogo.
- Versus: confirmar e cancelar prévia permanecem juntos, com a orientação do
  segundo clique. Não recebem níveis, desafio diário ou modo sem parar.

O módulo `dist/action-sidebar.mjs` move os controles reais, não cria cópias dos
comandos nem modifica os motores. Estados `hidden`, `disabled`, vitória
automática, eventos, progresso e controles específicos continuam pertencendo
a cada jogo. O CSS fica limitado ao painel; não redesenha tabuleiros ou equipes.

## Verificação

Os comandos da ação `engine-smoke.yml` passaram localmente: 807 testes, além da
verificação dos estados condicionais do viewport e do índice de missões. Também
passaram os verificadores de documentação e inventário de recursos.

Na versão do Site, a inspeção de navegador cobriu a entrada na área de jogo e
o painel dos 23 jogos em desktop, sem transbordamento horizontal observado.
Pulso e Enlace foram conferidos também em 390 × 844. A ajuda do Pulso abriu as
regras completas. Isso não equivale a testar todas as fases, vitórias, partidas
e combinações de controles em todos os dispositivos.

Este PR transporta somente a alteração das laterais e seus testes. Não importa
geradores ou outras alterações exclusivas da versão do Site. Divisa e Órbita
continuam fora do catálogo ativo do GitHub.

## Recuperação

A versão anterior permanece no histórico Git. Reverter o commit deste PR
restaura as laterais anteriores sem apagar o histórico nem alterar os dados
salvos dos jogadores. A integração deste PR não publica automaticamente no Site.
