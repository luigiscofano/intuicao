# Faixa editorial da página inicial

## Aprovação e escopo

Composição aprovada em 13/11/2026 nas prévias desktop e celular: uma frase editorial, três animais existentes e acesso à coleção completa. Preserva logo, topo C, tipografia C, regras dos jogos, dados e progresso.

- Frase: “A curiosidade é a primeira lição.”
- Destaques: capivara, bem-te-vi e onça-pintada.
- Botão “Conheça os 15 animais” mantém expansão/recolhimento e `aria-expanded`.
- Botões originais da fauna são movimentados, não recriados, preservando eventos e diálogos.
- Subtítulo e mosaico duplicado da abertura removidos; o azulejo do cabeçalho permanece.
- Desktop: faixa de aproximadamente 108 px, título de 28 px.
- Celular: frase equilibrada em duas linhas, título de 26 px; a galeria e o botão quebram no fluxo em telas muito estreitas.

## Validação

`node --test tests/approved-opening.test.mjs tests/compact-opening.test.mjs`

Dez testes focados: composição, expansão 3→15→3, reaproveitamento dos controles, idempotência, contagens do catálogo, responsividade e foco visível.

A renderização final deve ser verificada junto ao sistema visual compartilhado; esta alteração não modifica motores, níveis, geradores ou funções dos jogos.
