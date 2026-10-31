# Mapas de ocorrência dos15 animais

Base: a7ced0e9eda0b8beab00b0677347d513c3f6241a.

Contorno do Brasil: Natural Earth 1:110m,203 pontos do GeoJSON oficial, domínio público. Fonte e licença registradas em `BRAZIL_MAP_SOURCE` e acessíveis em cada legenda. Áreas hachuradas são esquemas editoriais de regiões principais, não polígonos de distribuição científica nem registros de presença contínua. Recorte SVG impede preenchimento fora do Brasil.

Cada ficha mantém os três desenhos originais (Ícone de frente, Ícone de lado, Sprite do Sintonia), descrição e justificativa existentes. O mapa entra entre a descrição e a justificativa. Há fonte externa por animal e descrição textual acessível, inclusive habitat aquático, fragmentação e ressalvas de grupos genéricos ou exemplos taxonômicos.

## Revisão geográfica
Revisão independente dos15 esquemas e fontes antes da publicação: distribuição ampla da capivara em vez de ilhas arbitrárias; Amazônia incluindo setores orientais/AC/RO/norteMT; regiões de bacias para fauna aquática em vez de um traçado de rio inventado. Mico/coral continuam agrupamentos; tatu/arara têm espécie exemplar explícita. Mico-leão-dourado tem pequenas manchas costeiras noRJ e círculo localizador vazio que não amplia a hachura. Estes desenhos não são mapas de distribuição atual precisa/validada.

## QA final
- 8 testes Node de mapas/integração, mais33 testes BROTO:41 aprovados no conjunto.
- 631 verificações automáticas nativas nos45 modais (15 animais×1366/390/320px), sem falhas: SVG, hachura recortada, IDs únicos, ARIA, fontes, descrições/captions,45 artes comparadas ao markup original, ausência de overflow horizontal, fechamento e restauração de foco/scroll. Limpeza final acrescentou verificação de saves restaurados.
- Comparação dos sprites normaliza apenas a origem doURL: Node `file:///…/dist/` versus origemHTTP do navegador; caminho, frame e estilo são idênticos.
- Revisão visual nativa de todos15 mapas em painel de conferência, e dos modais desktop/compacto. Mapas225px na menor largura, com rolagem vertical do conteúdo e fechamento sempre acessível.
- Teclas nativas Tab/Shift+Tab/Escape verificadas; ciclo explícito de foco evita escapar do modal e Escape retorna ao animal que o abriu.
- Limite: mapas esquemáticos de áreas principais, sem precisãoGIS/levantamento de campo; telas compactas testadas em navegador, não aparelho físico.
