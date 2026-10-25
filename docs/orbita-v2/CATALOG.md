# Catálogo Órbita 1000 — autoria e verificações

## Reprodução

- `node tests/orbita-build-v2.mjs` reconstrói apenas o bloco 201–1000 e os relatórios.
- `node --test tests/orbita-v2-catalog.test.mjs` verifica IDs, prefixo preservado, cotas, soluções, inversos, símbolos, diversidade e evidências.
- `tests/orbita-v2-audit.json` contém as contagens, capítulos, faixas, matrizes normalizadas, índices das 24 famílias e métricas por fase.

As 200 definições iniciais são copiadas semanticamente sem alteração. SHA-256 do JSON desse prefixo: `df62b5da5f8ccca4542cccbddc321ffd20a27423eb07be5a2ec59a630264d39f`.

## O que é comprovado

Cada estado inicial é obtido da configuração final por comandos legais. A sequência inversa é reproduzida no mesmo motor usado pelo jogo. Nenhuma fase começa resolvida. Uma busca completa até profundidade 3 rejeita soluções triviais nesse limite. Além disso, o ciclo completo de cada comando isolado é explorado: nenhuma fase nova pode ser resolvida repetindo somente um comando, mesmo além de três movimentos.

A solução de referência não é declarada mínima. `minimum` permanece `null`; `minimumProven` permanece `false`. A dificuldade editorial não foi calibrada com jogadores.

As assinaturas estruturais normalizam nomes, início dos ciclos e orientação, sem usar coordenadas, símbolos ou estado inicial. As assinaturas de autoria acrescentam posição e equivalência dos alvos. O catálogo rejeita até mesmo a repetição estrutural global, critério mais forte do que a janela de 25 solicitada.

## Famílias e evidências

`baseTopologyFamily` registra o desenho e grafo efetivamente construídos. Famílias funcionais só são acrescentadas com evidências registradas:

- Reserva: peça não neutra entra por uma órbita-folha com pelo menos duas portas, permanece numa casa exclusiva durante outras ações e sai novamente.
- Gargalos múltiplos: dois corredores internos distintos, ambos percorridos por peças na referência.
- Restauração cruzada: alvo inicialmente correto é alterado e recuperado; sua peça original percorre pelo menos dois anéis. Exemplares equivalentes podem trocar de papel.
- Efeito localizado: uma subsequência legal da referência tem suporte de permutação de apenas duas a quatro casas, comprovado com identidades auxiliares; o restante é restaurado.
- Escada: ciclo de quatro anéis com duas laterais opostas pelo menos duas casas maiores do que os conectores.
- Sensor em alternativa: existem rotas simples distintas especificamente entre o anel que contém o sensor e um anel controlado.
- Ordem invertida: seis encontros em ordens que não se tornam equivalentes por rotação ou reflexão.
- Mestre compacto: poucas casas e alvos, impossibilidade de solução com um único comando e perturbação de algum alvo correto obrigatória em qualquer primeira ação.

Essas testemunhas descrevem propriedades reais da estrutura e/ou da referência. Não demonstram que toda solução deva usar a mesma reserva, corredor ou restauração. As buscas de ablação guardam explicitamente resultados inconclusivos quando limitadas por profundidade ou orçamento.

## Interpretação das faixas e cotas

As faixas do documento são predominantes, não limites absolutos: o próprio capítulo19 exige dois anéis dentro de uma faixa predominantemente de três a cinco. As cotas exatas de anéis e interseções são verificadas antes de gravar o catálogo. A repetição de matrizes é relatada por quantidade de anéis e encontros: há poucos grafos conectados possíveis, por exemplo, com três anéis e apenas dois encontros. Sequências cíclicas, distâncias entre encontros e periodicidades continuam distintas.

As fichas são identificadas pelos símbolos aprovados. As casas sem objetivo contêm a peça neutra. Novas fases têm 4–12 alvos; enigmas compactos usam 4–5. Os trilhos podem conter vértices de desenho que não são casas, sem alterar o motor ou criar cruzamentos decorativos.

## Limites da verificação

A clareza geométrica é medida por espaçamento de casas, afastamento de trilhos, tamanho e posição de alvos. Isso não equivale a um teste com jogadores. As inspeções em 320px, 390px e desktop e os testes de persistência/Endless são executados separadamente pelos respectivos scripts.
