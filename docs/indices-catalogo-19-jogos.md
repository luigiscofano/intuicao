# Catálogo atual · 19 jogos

Numeração pública contínua, seguindo a ordem das categorias. Os IDs internos, links e registros de progresso não mudaram.

01. Reflexos
02. Corte certo
03. ELO
04. PRUMO
05. PACTO
06. SINTONIA
07. REPASSE
08. PULSO
09. FOZ
10. REFÚGIO
11. MIRANTE
12. RENOVO
13. DESVIO
14. BROTO
15. CERCO
16. MOSAICO
17. QUINHÃO
18. ESTALO
19. ACORDE

As contagens de revisões anteriores abaixo são históricas, não o catálogo ativo.

---

## Implementação

`dist/game-catalog.mjs` centraliza a ordem pública e os índices. Cabeçalhos e metadados consultam esse catálogo; HTML inicial é validado por teste contra ele. A renumeração é editorial e não modifica IDs, mapas, níveis, rotas ou chaves de armazenamento.
