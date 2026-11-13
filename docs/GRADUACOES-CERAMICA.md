# Marcadores de dificuldade · Cerâmica

Aprovado por Luigi em 13/11/2026. A graduação inspira-se nas faixas de jiu-jitsu sem alterar nomes, regras, quantidade de fases ou progresso.

| Grupo | Cor |
|---|---|
| Básico | `#7B817A` (cinza representando branco) |
| Aprendiz | `#285D7C` |
| Intermediário | `#725580` |
| Avançado | `#805D43` |
| Mestre | `#2C302D` |
| Modo Sábio | `#A7443D` |

`difficulty-palette.mjs` identifica o nome explícito do grupo. Não usa `nth-child`, índices de DOM ou números de fases. A apresentação compartilhada aplica o atributo somente a campanhas; não cria níveis nos jogos Versus.

A máscara CSS reutiliza o PNG transparente original. Dimensões, textos, números, foco, conclusão e seleção permanecem iguais. Todas as seis cores têm contraste gráfico >=3:1 contra o papel `#fffefa`; texto mantém a cor legível original, sem depender das cores das graduações.

Teste: `node --test tests/difficulty-palette.test.mjs tests/selection-presentation.test.mjs`.
