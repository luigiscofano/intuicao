# Celebração exclusiva de Versus

Cada duelo tem uma cena mecânica e movimentos exclusivos, sem simples troca de cor:
- DESVIO: um percurso é traçado por etapas e termina em uma seta de chegada.
- BROTO: o broto cresce, abre sua flor e pequenas flores convergem na colheita.
- CERCO: quatro paredes aparecem em sequência e fecham as saídas de uma peça neutra, sem dano ao personagem.
- VÉRTICE: três anéis vazios são iluminados em sequência; seis peças (três por jogador) formam uma posição válida de controle triplo.

O componente comum cuida somente de nome, personagem, acessibilidade e ciclo de vida. Animações CSS finitas (~1,6 s), sem timers adicionais nem cálculo de resultado. O emblema reaproveita o personagem original selecionado quando existente; BROTO mantém seus sprites. As identidades verde/amarelo de CERCO/VÉRTICE e verde/roxo de BROTO são preservadas.

O mesmo painel envolve a celebração, a explicação do resultado e os controles. Cantos arredondados, borda discreta e padding substituem o recorte verde abrupto. Nenhuma camada bloqueia controles. Empates têm mensagem neutra e sinal de igualdade; derrota humana contra bot identifica o vencedor e permanece discreta, sem PARABÉNS ao jogador derrotado.

## Ciclo de vida
- Apenas resultados terminais reais acionam a animação. BROTO: somente fim do duelo de duas rodadas, não colheitas nem fim da primeira rodada.
- Restore/rerender exibe resultado estático; movimento reduzido também é estático.
- Reinício, desfazer e saída removem a celebração. Nenhum foco ou placar depende dela.
- Motores, saves, imagens, oito animações solo e arquivos result-motion/game-victory originais não foram alterados. TRAMA continua removido.

## Arquivos
- Novos `dist/versus-victory.mjs` e `.css`.
- Integrações em `collection-ui.mjs` (somente DESVIO), `broto/ui.mjs`, `cerco/ui.mjs`, `vertice/ui.mjs`; folha registrada em `index.html`.

## Validação
- Seis testes Node passaram: pureza, escaping, emblema, estados win/loss/draw/reduced e invariância de toda a produção fora das integrações permitidas.
- 375 verificações em navegador real, viewports de iframe 1366/390/320: dois vencedores nos quatro jogos, empates BROTO/VÉRTICE, restauração estática, estados exatos dos motores, undo/redo, rematch/retry, saída, redução de movimento e BROTO sem celebração na primeira rodada.
- Testes históricos textuais de entregas anteriores não representam contratos atuais; nenhuma falha de motor foi encontrada na suíte adicional de 68 testes.
- Suíte isolada de motores BROTO/CERCO/VÉRTICE: 46/46 testes aprovados, sem alterações nos motores.

- Mais 53 verificações de quadros animados reais (100/800/1700 ms), painel responsivo, Escape, derrota contra bot e ações pós-resultado.
- Rodapé: comparação ligado/desligado em 9 combinações home/CERCO/BROTO × 1366/390/320 confirma mesmas coordenadas e dimensões da marca/rodapé, sem overflow. Novo `footer-transition.css` desenha transição curta sem acrescentar espaço.

- Refinamento final: moldura superior de 1 px e cantos de 14 px na home/categorias. Preparações Versus têm a margem existente pintada para evitar faixa branca; sem mudar coordenadas ou altura. Capturas reais de 320/390 px inspecionadas.
