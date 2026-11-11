# Onze vitórias Versus aprovadas

As quatro prévias em vídeo aprovadas em 11 de novembro de 2026 foram aplicadas aos onze jogos Versus. Os emblemas usam a identidade de azulejos da opção A, com gesto único de até 1,2 segundo. O título identifica o vencedor ou o empate; não existe mensagem de passagem de nível.

## Composições

- DESVIO: azulejos com setas de linha e coluna.
- BROTO: encontro dos estímulos e abertura da flor original.
- CERCO: mascote avança uma casa e deixa uma barreira neutra na origem.
- ENLACE: pinos e fios recebem uma iluminação curta.
- VAZANTE: barco de folha e passageiro se acomodam junto à água.
- MOSAICO: quatro azulejos se aproximam de uma junção.
- QUINHÃO: castanha, pitanga e jabuticaba entram em sequência.
- ESTALO: vagens e cascas representam um pulso curto.
- DOBRA: uma aba de papel se recolhe sobre o atlas.
- ACORDE: dois sinos do mesmo símbolo oscilam uma vez.
- LASTRO: um contrapeso avança no seu trilho.

São emblemas ilustrativos, não reconstruções da última jogada. Motivos, placares e vencedores continuam vindo dos motores. Os mascotes configurados em CERCO e VAZANTE são preservados.

## Resultado e ciclo

`dist/versus-victory-art.mjs` produz SVG visual puro. `dist/versus-victory.mjs` recebe o resultado dos três jogos antigos e do controlador compartilhado dos oito novos. O gesto usa a mesma cadência de 24 quadros por segundo dos vídeos e encerra seu `requestAnimationFrame` após 1,2 segundo. Texto, controles e próximo passo não esperam a animação.

A primeira conclusão confirmada pode animar. Redesenho, restauração, desfazer/refazer e revisão do histórico não repetem o gesto. Treino mostra o resultado sem festa. Contra o computador, a mensagem identifica você ou o adversário. Empates conservam composição neutra; BROTO não ganha modo de IA, e DESVIO/CERCO não recebem empate inexistente.

BROTO e LASTRO só celebram o duelo final, depois das duas rodadas. Na primeira rodada permanecem os controles e as mensagens já existentes. Nenhum motor, campanha, save, missão, recompensa ou protocolo de backup foi alterado.

Movimento reduzido do aparelho ou do controle local mostra o estado final diretamente. Ativar a preferência durante o gesto o encerra; desativá-la depois não causa uma celebração tardia. Navegar, ocultar a aba ou remover o resultado também encerra os quadros.

## Verificações

`node --test tests/versus-victory-approved.test.mjs` cobre os onze emblemas, texto seguro, vencedor/computador/empate, finais alcançados pelos motores, ausência de mutação, cancelamento e preferência de movimento. 108 quadros de nove composições são comparados por hash com as prévias aprovadas; CERCO e VAZANTE usam a arte oficial do mascote escolhido em vez da imagem fixa da prévia.

A verificação visual usa navegador real e viewport de celular. O encerramento de MOSAICO foi alcançado pela interface com 25 jogadas confirmadas, seguido de desfazer/refazer por acordo. Os outros finais e invariantes fazem parte dos testes automatizados; isso não equivale a uma bateria de sessões humanas de todos os modos.
