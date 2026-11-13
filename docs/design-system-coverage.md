# Auditoria de cobertura visual Intuição

Inventário inicial v242; implementação integrada sobre v244 `f915995bff222a8fa0f1ab9807aeb1d8e81a0309`.

## Matriz dos 19 jogos
| ID | Categoria | Família/prefixo | Estado específico |
|---|---|---|---|
|light|Intuição|original/vazio|desenho, confirmar todos|
|cut|Intuição|original/vazio|corte e confirmação|
|elo|Lógica|collection/c|ligações, grade grande|
|prumo|Lógica|collection/c|apoio e equilíbrio|
|pacto|Lógica|collection/c|marcação, conclusão automática|
|sintonia|Lógica|sintonia/s|comandos, sprites e cenário|
|repasse|Lógica|repasse/r|ordem e estados intermediários|
|pulso|Lógica|logic-games/lg|skins, três por linha|
|foz|Lógica|logic-games/lg|água/canais, AIIJ|
|refugio|Lógica|logic-games/lg|skins, folhas e números|
|mirante|Lógica|logic-games/lg|clique direito X|
|renovo|Lógica|logic-games/lg|arrastar ou clicar extremos|
|desvio|Versus|collection/c|prévia, cancelar, confirmar, IA|
|broto|Versus|broto/b|mapas, rodada, IA|
|cerco|Versus|cerco/ce|mapas, resultado, IA|
|mosaico|Versus|versus-games/nv|escolha/giro|
|quinhao|Versus|versus-games/nv|oferta/escolha, depósitos, perímetro mobile|
|estalo|Versus|versus-games/nv|mapas, segundo clique, cadeia|
|acorde|Versus|versus-games/nv|passe, coleções, layouts mobile|

São 12 campanhas + 7 Versus confirmados nos botões reais do catálogo. Metadados contêm históricos: não contar todos como ativos. Retirados: Divisa, Órbita, Lastro, Vazante, Enlace, Dobra.

Cada campanha: seleção, inicial/final, diário/sem parar, ajuda, vitória. Cada Versus: preparação/mapas/modos, prévia/cancelar/confirmar, turno/IA, vencedor. Sem diário/sem parar/níveis no Versus.

## Estrutura
`approved-game-shell.mjs`: body `.approved-game-view`, só campanhas `.approved-campaign-actions`. Superfície original `.workspace > .experiment`, outras `.collection-workspace > .collection-surface`. Após montagem: `.approved-workspace > .approved-play-surface` e `.approved-action-panel.action-sidebar`; Versus `.approved-versus-surface`.
`action-sidebar.mjs` move nós reais sem clonar, slots primary/history/restart/help/secondary; `[data-sidebar-action='confirm|undo|redo|restart|help|cancel']`. Preservar hidden/disabled/handlers/foco/inert e aria labels.

## Páginas
Home categorias/Todos/Favoritos/Recentes/vazio; seleções `.selection-section`, `.level-screen`, `#selection`; partida/regras/opções; conquistas `#achievements`/`achievements/view.mjs`; about/game-info/fauna/favorites/preferences dialogs, progress-backup e rodapé. Faixa editorial da home aprovada e integrada.

## Autoridades CSS
`identity.css`, `approved-game-shell.css`, `cohesion.css`: tokens/superfícies. `action-sidebar.css`, `campaign-action-buttons.css`, `standard-controls.css`: ações. `library.css`, `selection-presentation.css`, `approved-opening.css`: catálogo/seleção. Evitar empilhar overrides.
Geometria sensível: `versus-board-primary.css`, `board-fit.*`, `game-viewport.*`, `compact-play.*`. Motion: `ui-motion.*`, `motion-preference.mjs`, `victory-tiles.css`, `versus-victory.css`, `achievements/notifications.css`. `decor-piles.mjs` mantém física/RAF nas folhas legadas; jogo já oculta camadas, na versão inicial o catálogo ainda podia ser atravessado por elas; o refinamento remove essas folhas móveis e contém as partículas do rodapé.

## Riscos
- `button` global atinge peças/células; restringir a grupos de ação/navegação.
- canvas/svg e `.nv-board *` ou `.collection-surface *` podem alterar geometria/hit targets/AIIJ.
- Display flex/grid não pode reexibir `[hidden]`; preservar disabled, aria-pressed/current/live regions.
- Preservar `.board-desvio`, `.b-board-wrap`, `.ce-board-wrap`, `.mosaico-board-wrap`, `--versus-board-edge`: tamanho por viewport, não por jogada.
- Não clonar controles; observer reconcilia shell. Repetições de turno podem ser fases/live regions.
- Mobile Acorde/Quinhão são próprios/aprovados; jogadores opostos mobile é demanda separada pendente.
- Font/header C em outros agentes; não introduzir shorthands font que anulem fontes.
- Se ocultar títulos repetidos, preservar h1/rótulos e nós fonte de estado.

## Baseline executado
Comando node --test em action-sidebar, cohesion-contract, approved-game-shell, board-fit, compact-play, campaign-action-buttons, retired-games, acorde-mobile-collections e quinhao-mobile-order (todos tests/*.test.mjs).
68 testes: 63 passam, 5 falhas pré-existentes. Registro de execução preservado na revisão.
- approved-game-shell:247 lista antiga contém retirados.
- campaign-action-buttons:14 exige 14 campanhas/11 Versus históricos.
- campaign-action-buttons:93 hash de base antiga.
- cohesion-contract:12 exige 20 ativos antes Dobra.
- compact-play:4 hash antigo de cut-campaign-progress.
Não chamar falhas de regressões novas nem apagar asserts para verde.

## QA proposta
Repetir baseline, contrato de 19 ativos, retired-games/player-identities/versus-colors/versus-crops/selection-presentation/standard-controls/progress-backup/achievements-view/viewport-conditional-states. Hash diferencial dos motores/campanhas/storage desta base.
19 jogos 1440×900 e 390×844; 320×568 para densos e todos Versus. Seleção/partida/ajuda/voltar, jogada, disabled e vitória quando possível. Medir tamanho antes/depois, overflow, foco, toque e reduced-motion.
Fixtures tests/viewport/matrix.html, conditional.html, inspect.html, versus-stability.html: informar IDs ativos; defaults históricos incluem retirados. Não publicar fixtures copiados para dist. Iframes Chromium não equivalem a dispositivos físicos.

## Resultados da integração publicada em v245

- Revisão independente do diff: nenhum motor, save ou regra alterados; metadados e botão de informações preservados. `hidden` e `disabled` não são sobrescritos.
- 40 testes focados passam (apresentação, movimento, abertura, fontes recursivas, board-fit, identidades, Acorde/Quinhão mobile).
- Navegador Chromium em iframe, 19 jogos em 390×844: sem overflow horizontal nem ações principais fora da tela na primeira partida.
- Pulso identidade em 390 px: largura de tabuleiro passou de 251 para 345 px. As setas mantêm alvos de 44 px numa linha acima, sem alterar peças ou regras.
- Home desktop: expandir 3 → 15 animais, abrir Capivara, fechar com retorno de foco e recolher 15 → 3 verificados. Home 320 px sem overflow. Conquistas e Configurações inspecionados visualmente; cabeçalho sem introdução repetida.
- Os testes geométricos não equivalem a dispositivos físicos, todas as vitórias, todos os mapas ou todas as combinações de configurações. Em telas excepcionalmente baixas (320×568), há rolagem para conservar alvos utilizáveis em jogos densos; isso não é declarado como encaixe integral.
- Os 7 erros da suíte complementar também foram reproduzidos no HEAD v244 sem alterações, em worktree separado. Nenhuma asserção foi apagada para tornar a suíte verde.
- Matriz final 1440×900 e 320×820: 38 registros. Um registro Estalo não encontrou a classe transitória de viewport; reconferido manualmente em 320×820, superfície termina em 572,9 px e ações em 745,9 px, sem overflow horizontal.
- Campanhas, último nível/diário/sem parar em 390×844: 36 registros. Um registro diário Corte Certo não encontrou a classe transitória; abertura manual confirmada, metadados do diário visíveis, ações terminam em 798,2 px, sem overflow horizontal. Os demais 35 registros passaram.
- Mais 25 testes de progresso/backup, conquistas e jogos retirados passaram, total 65 verificações focadas verdes. Isso não substitui a suíte histórica que tem falhas conhecidas.
- Estabilidade Versus 390×844: 7/7 tabuleiros mantiveram largura/altura (tolerância 1 px), 157 estados medidos incluindo prévia/confirmação e histórico disponível. Mosaico 53 estados; Desvio/Broto/Cerco 17 cada; Quinhão/Acorde 19 cada; Estalo 15. Não equivale a todas as partidas possíveis.
