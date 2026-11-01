# Sintonia — paletas dos acessórios aprovados

## Contrato
`selectAccessoryPalette(level, animalRoster)` retorna a string `C`, `D` ou `E`. A decisão depende apenas do número (ou ID estável) da fase e dos IDs dos animais, não de posição, movimentos, tempo ou aleatoriedade. `anta` é aceito exclusivamente como alias histórico de `peixeboi`. A arte e as cores aprovadas não são modificadas.

## Medição reproduzível
Fonte SVG: `dist/sintonia/assets/chibi-user-roster.svg`, SHA-256 `d7d4b80f054b8f16d44c0d0b8805bf0f5074caaae443e69394156ccc84211b18`.
Manifesto aprovado SHA-256: `abe051cbaddf1775847f8d6119aab3fe67753e72d1de6e85678f98ff7ce5756c`.

Aplicou-se a máscara exata de cada caminho retangular do SVG ao PNG original embutido, contando pixels opacos (alfa ≥128). Todas as instruções do caminho foram verificadas como retângulos, sem deixar comandos sem interpretar. Histograma RGB de 5 bits por canal, médias reais de cada caixa e agrupamento determinístico de oito centros em OKLab (inicialização por distância ponderada, 30 iterações). Os centros estatísticos são somente dados de análise: não recolorem sprites nem criam outra paleta.

Corpo: luminosidade OKLab ≥0,32; contorno/sombra: abaixo disso. Distâncias consideram os tons base e sombra do acessório, clusters de corpo com participação ≥8% e contorno ≥4%. Um cluster é cromático quando C≥0,06. Famílias de matiz: quente 20–100°, azul 170–290°, lilás 290–345°. Família dominante ≥35% ou distância cromática <0,10 veta a paleta correspondente. Cores neutras contribuem à pontuação, mas não vetam automaticamente todas as alternativas.

## Seleção
Preferência cíclica C→D→E, iniciando em `(número−1) mod 3`; fase sem número usa hash FNV do ID. Escolhe a primeira paleta compatível. Quando todas conflitam, escolhe o maior mínimo de distância medida, com desempate cíclico. D nunca é elegível para a arara azul, inclusive no fallback.

## Evidência e limites
Cinco testes passaram: 16 animais isolados; todas as 2.500 combinações de dois, três ou quatro animais; três preferências por combinação; reversão/rotações da ordem; alias histórico; ausência de aleatoriedade; fallback sintético cobrindo conflito triplo. Em 7.500 decisões reais: C=11, D=3.846, E=3.643, nenhum fallback. Não existe animal predominantemente lilás entre os 16 medidos. A presença frequente de animais quentes torna terracota rara; não se força distribuição igual em detrimento da distinção.

Distância mínima escolhida incluindo clusters neutros: 0,04705. O limiar 0,10 aplica-se ao corpo cromático, não é uma garantia universal de contraste/acessibilidade. Tons neutros próximos são admitidos para não excluir todas as paletas; forma, contorno e indicação de estado continuam importantes. Esses testes são de escolha determinística e dados, não substituem inspeção visual no navegador.
