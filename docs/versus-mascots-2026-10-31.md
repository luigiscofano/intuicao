# Personagens em TRAMA e VÉRTICE

## Alteração autorizada
As peças abstratas foram substituídas por personagens selecionáveis do mesmo catálogo frontal de CERCO. Cada jogador escolhe independentemente entre 15 ícones; escolhas iguais são permitidas. Bordas azul/lilás e marcadores ●/◆ continuam distinguindo os jogadores. Nenhuma regra ou avaliação do bot depende da escolha.

## Arquivos e reaproveitamento
- Novo `dist/versus-mascots.mjs`: catálogo, opções, normalização compatível e SVG com exatamente o asset/viewBox/crop usados em CERCO.
- `dist/trama/ui.mjs`, `ui.css`, `dist/vertice/ui.mjs`, `ui.css`: dois seletores na preparação; render comum para peças, cabeçalhos, prévias, exemplos guiados e resultado.
- `tests/versus-mascots.test.mjs` e atualizações restritas das asserções históricas que exigiam as peças abstratas anteriores.
CERCO e os arquivos originais dos animais não foram alterados. Os diagramas estáticos Como jogar previamente aprovados continuam esquemáticos, como o de CERCO; as demonstrações guiadas dentro dos jogos usam os personagens escolhidos.

## Compatibilidade
Saves anteriores sem `config.mascots` recebem Capivara/Onça-pintada como aparência padrão, preservando integralmente estado, turno, histórico, ocorrências e resultado. Configuração inválida continua preservada para decisão explícita de nova partida. Reset, revanche, histórico e bot mantêm os personagens. As escolhas são gravadas junto à configuração ao iniciar/continuar a partida, no namespace existente de cada jogo.

## Verificação
- 74 testes Node aprovados, incluindo motores, integração e preservação.
- 225 pares de personagens validados por jogo sem mudança de movimentos/resultados/histórico; 15 recortes comparados exatamente com CERCO.
- 177 verificações no navegador real em 1366, 390 e 320 px: todas as 15 escolhas iguais nos dois lados; renderização de peças, cabeçalhos, prévias, exemplos guiados e resultados; reset, revanche, histórico, bot, saves antigos e inválidos.
- Hitboxes mínimas: TRAMA 44,16 px em 320; VÉRTICE 48 px compacto e 64 px desktop. Sem overflow horizontal ou símbolos gigantes.
- Captura compacta de ambos os tabuleiros inspecionada: as ligações de TRAMA seguem visíveis nos vãos; os três vazios/halos de VÉRTICE nunca recebem personagem. SVG recorta somente o viewport original da folha, sem rotacionar ou mascarar o animal.
- Hash de todos os arquivos `dist` preexistentes no baseline `5113aede861de6b2b821e73030024d09163f0926`, exceto os quatro arquivos de UI autorizados, idêntico. Inclui todos os motores, bots, assets e o CERCO completo.

## Limites
Testes móveis em larguras de iframe de navegador real, não em dispositivo físico. Alteração exclusivamente cosmética; não há nova habilidade, vantagem, IA ou desenho gerado.
