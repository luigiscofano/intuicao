# Órbita 1000 — catálogo circular v3

A correção posterior do usuário prevalece sobre o pedido inicial de loops orgânicos e encontros repetidos entre um único par: **todos os anéis novos são círculos perfeitos**. As fases 1–200 continuam semanticamente intactas.

## Estrutura aprovada

Dois círculos distintos encontram-se em no máximo duas casas. Por isso, encontros adicionais são obtidos com mais anéis e conexões entre pares diferentes, nunca deformando os trilhos. Cada casa compartilhada continua pertencendo a exatamente dois anéis.

As 800 fases novas distribuem-se em 100 com dois anéis, 240 com três, 250 com quatro e 210 com cinco. Esta revisão substitui a cota anterior de 120/220/250/210: os 100 tabuleiros com apenas dois encontros podem acomodar os 100 pares de círculos. As cotas totais de encontros permanecem 100/150/170/150/130/70/30 para 2/3/4/5/6–7/8–10/11–14 casas compartilhadas.

Não se reivindicam mais as 24 famílias originais: tranças de três ou mais encontros entre o mesmo par, loops não circulares e ordens de encontro não realizáveis por esses pares foram substituídos. O relatório lista apenas famílias físicas efetivamente realizadas e funções comprovadas por testemunhas da solução de referência.

## Reprodução e validação

- `node tests/orbita-build-v3.mjs`: gera as fases 201–1000 e `tests/orbita-v3-audit.json`.
- `node --test tests/orbita-v2-catalog.test.mjs`: o nome histórico do teste foi mantido, mas as asserções agora verificam a correção circular v3.
- `dist/orbita/topology-circles-v3.mjs`: constrói círculos analíticos e valida todos os encontros, tangências, casas sobre seus círculos, distâncias e ausência de nós triplos.

A apresentação usa `geometry.type = circle`, com `rx = ry = r`, sem trilhos poligonais ou elípticos. O catálogo armazena `catalogVersion: 3` e `generatorVersion: 3`.

Todas as soluções são reproduzidas no motor do jogo. A busca de trivialidade exclui soluções de até três comandos; cada órbita completa de um comando isolado também é verificada. Soluções de referência não são declaradas mínimas. As evidências de armazenamento, restauração ou corredores descrevem trajetos reais e não afirmam que toda solução deva usar a mesma estratégia.

O primeiro bloco de 200 definições mantém o SHA-256 semântico `df62b5da5f8ccca4542cccbddc321ffd20a27423eb07be5a2ec59a630264d39f`. O gerador v2 fica preservado para histórico; ele não cria os novos desafios circulares.
