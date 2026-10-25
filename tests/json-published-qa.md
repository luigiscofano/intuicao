# QA publicado: JSON e modos

## Versão 53784447416fe62e35cc26ece6b9ec71ea418fcd

Browser: Chromium cloud, viewport físico 1180 (área de conteúdo 1165 × 747 com barra de rolagem). Sem emulação mobile ou navegador alternativo. Todas as alterações de jogo foram realizadas pelos controles reais; não houve injeção de estado, fetch de API para manipular partidas ou limpeza de armazenamento.

### Aprovado nos cenários exercitados

- Reflexos: importador após nível200, título sem sufixo com `·`/`i`; exemplo abriu custom; ângulo −76→−65, undo−76/redo−65, cancelar reset preservou−65; custom→Endless→reimportar recuperou−65; campanha→Endless→mesma fase recuperou−62. JSON de jogo errado/sintaxe inválida recusados, estado anterior recuperável.
- Corte: importador após nível100, título `Corte certo ·` com `i`; exemplo por texto abriu custom; deslocamento80→50, undo80/redo50, cancelar reset preservou50; custom→Endless→reimportar recuperou50; campanha82,8→45→Endless→mesma fase recuperou45. JSON de jogo errado/sintaxe inválida recusados.
- ELO: 200 níveis antes do importador, nenhum botão Continuar/Tutorial, título`ELO ·i`; exemplo2×2 abriu por Worker; Enter colocou1/4peças; editor com game errado mostrou erro e manteve1/4; entrada Endless direta, botão ativo idempotente; reimportação recuperou1/4.
- PRUMO: 200 níveis antes do importador, título`PRUMO ·i`; exemplo1×3 abriu; apoioA+Enter pintouL1C1; sintaxe inválida mostrou erro sem apagar a pintura; custom→Endless→reimportar recuperouL1C1 peçaA. Uma reimportação atingiu prazo seguro de1,5s sem perda de estado; repetir o botão concluiu. Limitação transitória de prazo do Worker, não prova de impossibilidade.
- PACTO: 200 níveis antes do importador, sem botões removidos, título`PACTO ·i`; exemplo8×8 abriu; Shift+1 criou anotação, tecla1 definiu círculo; JSON com quantidade inválida de pistas mostrou erro e preservou célula; entrada Endless direta funcionou.

### Não concluído nesta rodada

- A reimportação final de PACTO e navegação seguinte ao DESVIO não foram executadas: ferramenta retornou falha de revisão automática “authorization changed before approval could be applied”, explicitando operação não executada e que não era determinação de insegurança. Leitura subsequente confirmou seleção PACTO sem conteúdo colado/sem aprovação exibida. Não houve repetição do passo bloqueado.
- Importação/retomada DESVIO real permanecem pendentes, embora a suíte determinística completa do jogo tenha passado.
- File picker nativo, downloads e exportação não foram exercitados nesta rodada. Caminhos arquivo/limites têm testes determinísticos; no navegador usamos texto/exemplo.
- Mudanças de toolbar próxima ao mapa, remoção do botão global PACTO, hints16px, altura44px!important e flor sem cabinho são posteriores a537844 e precisam de QA no próximo publicado. Não confundir screenshots antigos com evidência desses refinamentos.

### Provas locais

Capturas em `json-published-proof/` na pasta da tarefa: reflexos-custom-restored.png, corte-invalid-game.png, corte-campaign-restored-45.png/.txt, elo-json-error.png, elo-custom-resumed.png, prumo-custom-resumed.png.

### Regressão local posterior

Refinamentos posteriores:80/81 execuções aprovadas. Única falha histórica: curiosity-brand-tests espera10 folhas mas a base já possui16. Nenhuma falha nova de funcionalidade. Cadeias de preservação mantêm manifestos publicados intactos, com novas camadas toolbar-touch e board-toolbar.

## 99ad537 geometry follow-up
All six published games showed hints at 16 px / 24.8 px, five controls in the requested order, 44/44/44/46/44 px targets, and no page overflow with rules open and closed. Original SVG gap was 8 px; standard collection gap 32 px. DESVIO/custom still had redundant 24 px wrapper margin, and the bar aligned with the panel rather than the actual small map. The subsequent CSS-only board-alignment layer removes that margin and derives toolbar width from the unchanged navigation/padding bounds, including DESVIO 460 px, ELO label gutters and responsive wrapping. Native verification of that new layer remains pending publication. Import action stopped after an expired authorization-review error; PACTO return/reimport and DESVIO import were not retried or claimed as verified.

## 0866506 browser verification
Actual cloud-browser checks covered phase/map 2 in all six games, with rules open on entry, manually closed, and advanced options toggled: 18 states. Every toolbar right edge matched its board right edge exactly (0 px delta), with no overlapping controls or page overflow. Control heights remained 44/44/44/46/44 px and hints computed to 16 px / 24.8 px. Original SVG gap: 8 px. Standard collections including DESVIO: 32 px. DESVIO's small map remained 460 px wide; reentry and direct Endless both opened rules again. ELO193 additionally retained its 12×12 board, 47.4 px cells, intact L12·2/C2·1 labels and 40 px clue gutter spacing. No game-coordinate or scrolling code changed. Captures and 21 measurement records were saved outside the repository in the task's json-published-proof folder. Mobile was structurally tested, not measured in a native resized browser. The earlier import approval-review limitation remains unchanged.
