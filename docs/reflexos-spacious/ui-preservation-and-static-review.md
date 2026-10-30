# Preservação, interface e revisão visual estática

Referência: publicação `bc9240ebd850f3b7d0710b36d8a0ce10319f7cb0` (inclui Corte certo 80).

## Resultados executados

- `light-spacious-preservation.mjs`: **PASS**. Os 245 arquivos preexistentes de `dist`, exceto `light-levels.mjs`, mantêm bytes idênticos. Física, tolerâncias, dimensões, renderizadores, animações, controles, botões e todas as outras campanhas preservados. 53 geometrias alteradas têm identidades novas; 27 geometrias inalteradas conservam suas identidades.
- `light-spacious-history.mjs`: **PASS**. Os 80 IDs antigos continuam no progresso; os rascunhos antigos não são reescritos nem reassociados. Somente as 27 geometrias retidas recebem suas conclusões/rascunhos existentes.
- `light80-campaign-ui.mjs`: **PASS** em DOM determinístico. 80 fases, 240 erros completos, 80 aplicações de gabarito sem vitória automática e 80 confirmações vencedoras. Estreias 1/5/9/12/16/21 preservadas. Gabarito, assistência, seleção e navegação pelo catálogo final funcionam.
- `light-v4-integration-progress.mjs`: **PASS** para mesclagem de conclusões, preservação de registros ausentes/malformados/de versão futura e falhas de armazenamento.

## Comparações visuais efetivamente inspecionadas

Foram gerados sete SVGs antes/depois, cada um com início e referência: fases **15, 31, 46, 53, 64, 78 e 72**. Os PNGs rasterizados por Inkscape CLI foram abertos e examinados visualmente. Isso é renderização documental estática, não automação de navegador e não teste humano de jogabilidade.

O gerador `light-spacious-static.mjs` chama os renderizadores reais de portais, fontes/alvos e raios. Para espelhos e paredes, reproduz a geometria e os estilos do trecho `draw()` do aplicativo. As animações estão congeladas e não se representa a interface externa ao tabuleiro.

- **15:** parede nova isolada dos elementos; cores e alvos continuam distinguíveis, sem colagem de rótulos.
- **31:** parede nova e pequenos afastamentos preservam leitura dos cinco espelhos; a geometria continua ocupando uma área ampla.
- **46:** a antiga pilha de portais A/B fica separada, incluindo o rótulo TODAS. Controles de espelhos e etiquetas de portal já não se confundem nesse ponto.
- **53:** fontes dourada, azul e rosa se separam dos alvos/portais que antes estavam colados; a pilha central de portais também ganha espaço.
- **64/78:** conjunto espalhado com clareza maior em fontes, alvos, portais e espelho inferior. O portal K junto ao espelho comum ainda é deliberadamente compacto: menor separação conservadora **1,482 px**, agora positiva, não uma folga universal de 8 px. O restante tem separações maiores (próximo par: 15,586 px). Bordas dos sprites nestes dois mapas ficam pelo menos **9,4 px** dentro do tabuleiro no início, referência e amostras ±0,5°.
- **72:** mantém as salas divididas pelas paredes, mas afasta portais próximos nas salas laterais e o controle do espelho superior esquerdo. Os encontros de paredes com a borda são a composição existente, não recortes novos.

Nenhum visual ou tamanho de elemento foi modificado para produzir esses afastamentos. Fontes próximas às bordas e paredes que chegam à borda em alguns mapas já existiam; esta revisão estática não certifica toda rotação livre nem todas as fontes/tamanhos de tela.

## Limites

Nenhuma chamada CDP/DevTools ou nova tentativa de entrada nativa foi feita nesta revisão. A execução anterior identificou indisponibilidade do provedor AT-SPI do Chromium e a organização já havia negado DevTools. Não houve contorno da restrição. Portanto, **navegador real e mobile não foram testados**; os resultados de DOM e das imagens estáticas são declarados separadamente.
