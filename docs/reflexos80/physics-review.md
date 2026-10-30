# Revisão física independente — Reflexos 80

Reexecução em 30/10/2026 pelo motor de produção `light-world.mjs`, sem alterar física, tolerâncias, dimensões ou condições de vitória. O hash SHA-256 dos registros auditados consta de `physics-summary.json`.

## Resultado

- **80/80** referências vencem; **80/80** configurações iniciais não vencem.
- Menor incidência de referência: **30°**, medida contra a **superfície** do espelho. **Nenhuma** fase de referência entre 20° e 30°; nenhuma abaixo de 20°.
- **64** fases têm contraprova completa reexecutada: todas as cores alcançam seus alvos isoladamente, mas a mesma configuração conjunta apresenta colisão. **51** são inteiramente sem paredes.
- Aplicações por faixa: **5 / 13 / 13 / 14 / 14 / 5**, contra mínimos **4 / 10 / 12 / 12 / 12 / 5**.
- Espelho compartilhado certificado nas fases **18, 29, 40, 52, 64 e 78**: ângulo único, cores diferentes, contatos distintos e trajetórias completas conjuntamente válidas. Não se afirma necessidade universal desse compartilhamento.
- **1.938** testes de perturbação, incluindo cada espelho em ±0,5° e todos os cantos simultâneos da caixa angular: **zero derrotas**.

## Folgas medidas

Menores valores entre todas as perturbações, em unidades do tabuleiro:

| Medida | Mínimo |
|---|---:|
| Distância do contato à extremidade do espelho | 12,465 |
| Distância entre segmento físico e parede absorvente | 6,396 |
| Folga transversal de captura do alvo | 5,484 |
| Folga transversal da entrada do portal | 6,327 |
| Distância entre trajetórias físicas de cores distintas | 6,335 |

A folga transversal é raio do círculo menos distância de seu centro à linha incidente. Não é a distância do ponto terminal à borda — que seria necessariamente zero num impacto correto. Saltos entre portais não são segmentos físicos e não entram no cálculo de cruzamentos.

## Estabilidade amostrada

As **1.938** perturbações preservam o itinerário de espelhos e portais da referência: **zero mudanças topológicas**. A menor incidência entre essas perturbações é **29,5°**. A fase 25 da versão final foi substituída por uma composição estável; o diagnóstico de reflexão adicional rasante da versão preparatória não se aplica aos registros entregues.

## Alternativas conhecidas

Foram reproduzidas **1.078** configurações completas distintas do catálogo e dos casos: **414** vitórias conjuntas, das quais **299** usam no máximo tantas operações (reflexões + saltos) quanto a referência. **Nenhuma** dessas 299 tem incidência abaixo de 20°. Não houve erro de enumeração nem vitória esperada obsoleta. Nas fases 16, 25, 38, 41, 42, 74 e 76 existem alternativas conhecidas equivalentes/mais curtas com alguma incidência entre 20° e 30°; isso não altera a contagem das referências e não é proibido pelo motor.

## Limites

Amostragem finita não prova conforto em toda a caixa angular contínua, unicidade, uso obrigatório de recursos ou inexistência de atalhos desconhecidos. Contagem de operações serve somente para comparar configurações geométricas conhecidas, não para medir dificuldade lógica. A presença de uma contraprova certifica incompatibilidade espacial; não certifica, sozinha, novidade editorial ou dificuldade humana. Não houve teste com jogadores nem avaliação móvel nesta revisão física.

Reprodução: `node tests/reflexos80-independent.mjs dist/development/reflexos80/records.json tests/reflexos80-independent-validation.json`.
