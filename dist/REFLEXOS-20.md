# Reflexos: espelhos 20% maiores

Atualização de 24/10/2026. Os 485 espelhos dos 100 níveis passam de 104 para 124,8 unidades de comprimento. A espessura continua a mesma (moldura 6, vidro 3). No modo livre, os espelhos herdados do nível também usam 124,8, e um novo espelho passa de 130 para 156. O campo de comprimento aceita décimos.

Desenho, superfície refletora e área clicável usam o mesmo segmento ampliado. A alça permanece a 52 unidades do centro, sobre o vidro, para não sair da área durante a rotação. Isso preserva uma folga mínima real de 62 unidades entre o envelope do espelho/alça e a fonte.

Foram feitos ajustes mínimos: 36 ângulos iniciais foram afastados de paredes, sem alterar os ângulos dos gabaritos, as posições dos espelhos, fontes, alvos ou portais. A parede do nível 17 foi reduzida de 110 para 90, mantendo o bloqueio do atalho e liberando a ponta do espelho ampliado. Todos os 100 caminhos certificados continuam funcionando. O jogador ainda pode girar espelhos para configurações incorretas que se sobrepõem a paredes ou outros espelhos; o editor não impõe restrições mecânicas novas de rotação.

Corte certo, ELO, PRUMO, PACTO, DESVIO e suas quantidades de níveis permanecem intactos. Os efeitos de vitória/derrota, gabaritos, portais, disparo individual e parada no impacto são preservados.

## Validação

- 100 gabaritos; 250 ordens de disparo resolvidas e 250 não resolvidas.
- 175.085 amostras geométricas de rotação dos 485 espelhos: corpo dentro da área e alças preservadas.
- Teste da nova extremidade: um raio que não alcançava o espelho de 104 agora reflete na superfície de 124,8.
- Suíte atual de todos os jogos, incluindo 800 níveis de campanha, efeitos, respostas assistidas, recortes e área líquida.
- Inspeção de 12 SVGs renderizados pelo app real em DOM simulado: níveis 1, 17, 41, 82, 95 e 100, início e solução.

Os testes usam os motores reais e DOM/relógio simulados. As imagens são renderizações SVG estáticas. Não houve teste interativo no navegador real nesta rodada.
