# Molduras de BROTO e CERCO

Somente os dois arquivos CSS dos jogos foram alterados. A superfície jogável ganha o contorno de Repasse: 2 px, cor #b3c1a8, cantos de 18 px, com margem interna de 16/14 px no desktop e 12/8 px no compacto. O quadro envolve controles, jogadores, tabuleiro e confirmação; as regras continuam abaixo, fora dele. Molduras internas dos grids, cores, sprites e seletores de mapas não mudam.

Até 360 px, a margem lateral externa da área de jogo é reaproveitada para compensar o novo respiro interno e manter células de pelo menos 44 px. Não há overflow oculto, corte, camada interceptando clique ou mudança de dimensões máximas dos grids.

Baseline f94201b1321504bf24f4a5c961fe2ed6ec5ef09a. Testes verificam que só broto/ui.css e cerco/ui.css diferem em produção; motores, mapas, conteúdo, saves e demais jogos permanecem iguais.

## Validação final
- 19 testes Node aprovados (escopo CSS, mapas BROTO/CERCO); teste de escopo repetido após ajuste compacto.
- 422 verificações no navegador nativo, sem falhas: 14 mapas em 1366, 390 e 320 px (42 layouts), jogada, prévia sem mutação, confirmação, desfazer por acordo e retorno à preparação.
- Menor célula: 44,1875 px; margem interna lateral mínima dos elementos: 8 px; regras 12 px abaixo da moldura. Sem overflow interno ou controles cruzando o contorno.
- Revisão visual de ambos os jogos em desktop, 390 e 320 px; bordas, peças e controles preservados. Dimensões desktop dos tabuleiros permanecem limitadas pelos máximos anteriores.
- Saves originais restaurados exatamente após os testes. Apenas dois CSS de produção alterados; motores, mapas, sprites e seletores intactos.
- Limite: larguras compactas verificadas em navegador, não em aparelho físico.
