# Expansão de mapas: Quinhão e Desvio

Base auditada: Site v254, `2f456e66f2fc11bcdbde8f852733829870547c35`.
Esta revisão não transforma duelos em campanhas e não muda regras de vitória.

## Quinhão

- **42 distribuições**, seis grupos de sete: Intercalados, Entrelaçados, Pomar misto,
  Duplas, Bosques e Ilhas. O grupo corresponde ao número de vizinhanças iguais:
  respectivamente 0–3, 4–6, 7–9, 10–12, 13–15 e 16–18.
- Cada entrada guarda a ordem de **24 cestos e oito frutos de cada tipo**. Não há
  aumento artificial do anel nem uma grade nova. A ordem desktop/mobile é a mesma.
- As 42 sequências são distintas mesmo após giro, espelho e todas as permutações
  dos nomes dos frutos. Nenhuma contém cinco frutos iguais consecutivos, incluindo
  a emenda circular. Diferem efetivamente nas ofertas locais, não só na cor.
- As métricas contam vizinhos iguais e ofertas iniciais de três tipos. Não são
  estimativas de dificuldade nem promessa de equilíbrio entre jogadores.
- O mapa clássico e o formato do estado legado estão intactos. Novos mapas têm
  `mapId`/`mapVersion`; o controlador reconstitui o estado a partir da configuração
  e das ações. Configuração inválida é rejeitada.
- A miniatura reaproveita os vetores aprovados e representa a ordem real.

## Desvio

- **42 mapas**, mantendo os **16 primeiros IDs, posições e metadados originais**.
- Formatos: **4×4 (16 mapas), 3×3 (6), 3×4 (5), 4×3 (5), 2×6 (5), 2×8 (5)**.
- Limite de 16 casas mantido para preservar o motor bitmask e a promessa de bot
  exato. Não foi introduzido um bot heurístico com rótulo de jogo perfeito.
- Os 26 novos mapas são fixos, sem geração em tempo de execução. São diferentes
  mesmo após reflexão/transposição com troca correspondente dos eixos H/V.
- Cada mapa novo tem entre um terço e dois terços de setas horizontais e pelo menos
  três decisões não forçadas na linha principal perfeita.
- Não são mapas matematicamente neutros. Nos novos 3×3 e 2×6 selecionados, o
  iniciador vence sob jogo perfeito. A interface deve preservar a recomendação de
  alternar o início na revanche. Nos novos 3×4,4×3 e2×8 há casos favoráveis a ambos.
- Métricas de vitória/distância descrevem jogo perfeito, não uma taxa de vitória
  humana nem todas as possíveis trajetórias.

## Verificação executada

`node --test tests/maps-expansion-quinhao-desvio.test.mjs`: **7/7**.

- Quinhão: 1.680 duelos completos, conservação de frutos, exatamente oito partilhas,
  12 frutos por jogador, persistência/replay e ida/volta no histórico em todos os mapas.
- Quinhão: 252 decisões de IA (oferta+escolha), todos os mapas×três dificuldades,
  mais **126 duelos completos de IA/2.016 decisões** com orçamentos de produção.
  Maior tempo observado: 2,4 ms explorador, 9,5 ms intermediário, 55,1 ms avançado.
- Quinhão: comparação diferencial de 40 duelos clássicos completos com o motor da
  base v254, estados rigorosamente iguais a cada ação.
- Desvio: **3.360 duelos completos** com ambos iniciadores, replay e revanche.
- Desvio: oráculo independente com conjuntos confere o resultado exato de todos os
  42 mapas; métricas de vitória e duração perfeita também conferidas.
- Desvio: bots fácil/médio/perfeito legais nos 42 mapas; partidas perfeitas completas.
  Maior análise inicial observada: **34,3 ms / 55.913 estados**, neste executor.
- Regressões de Quinhão e apresentação/dicas de Desvio: **19/19**.
- `rules-context-tests.mjs` tem falha anterior em `light`: espera índices históricos
  `[1,4,7,16,18,25]`, recebe `[1,5,9,12,16,21]`. Não foi alterado para ocultar a falha.

Os tempos não são medições de celular físico. Não houve estudo de equilíbrio com
pessoas. QA visual do seletor e dos formatos novos pertence à integração; este
relatório não declara testes de navegador que ainda não foram feitos.
