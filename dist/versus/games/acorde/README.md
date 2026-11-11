# ACORDE

Coleta pública em uma grade 4×4. O verde recolhe em linhas, o amarelo em colunas.
O sino retirado define a posição do carrinho e, portanto, o eixo do adversário.
Vence quem primeiro formar pares de três símbolos diferentes.

## Organização

- `engine.mjs`: estado serializável, regras, ações legais e avaliação sem aleatoriedade.
- `view.mjs`: sinos, carrinho, coleções públicas e explicação da prévia.
- `view.css`: apresentação responsiva com alvos de toque e foco visível.
- `index.mjs`: metadados e regras completas aprovadas para a interface.

O controlador comum cuida de confirmação, bot, histórico e persistência. O desenho
não confirma ações nem lê dados salvos. Os símbolos são SVGs próprios, distintos
pela forma; não é necessário som ou percepção de cor para jogar.

## Estado e invariantes

`board` contém 16 símbolos ou `null`, em ordem de leitura. Um sino não muda de casa:
apenas sai do tabuleiro e entra em `collections[player]`. Cada um dos quatro tipos
conserva exatamente quatro sinos entre tabuleiro e coleções.

`cursor` é `null` na abertura, à esquerda da linha 2; depois é o índice de uma casa
vazia. `player: 0` indica verde/horizontal e `player: 1`, amarelo/vertical.
`consecutivePasses` conta somente passes consecutivos e volta a zero após uma coleta.
`moveCount` conta as ações confirmadas, incluindo passes.

O placar conta símbolos com pelo menos duas cópias, sem criar um segundo par quando
um jogador reúne quatro cópias iguais. `result` só aparece no final da partida.

## Ações

- `{ type: 'collect', cell }`: recolhe um sino presente no eixo ativo; `cell` vai de 0 a 15.
- `{ type: 'pass' }`: única ação legal quando não há sino no eixo ativo.

A ordem das ações legais segue os índices das casas. A vitória por três pares é
verificada logo após a coleta. Sem essa vitória, esgotar o tabuleiro ou completar
dois passes consecutivos encerra por comparação dos pares; igualdade dá empate.
Depois do resultado não há ações legais. Cada coleta remove um sino, impedindo ciclos.

`interact` traduz o clique `{ type: 'cell', cell }` em uma coleta para a prévia.
O botão de passe também prepara uma ação, mantendo a confirmação comum.

## Exemplo reproduzível

Índices 5, 13, 15 e 7 correspondem a B2, B4, D4 e D2. O verde recolhe onda, o amarelo
folha, o verde completa um par de ondas e o amarelo pode completar um par de folhas.
O carrinho segue B2 → B4 → D4 → D2, com eixos coluna B → linha 4 → coluna D → linha 2.

## Verificação

Na raiz do repositório:

```bash
node --test tests/versus/acorde.test.mjs
```

Os testes cobrem configuração, exemplo aprovado, imutabilidade, ações inválidas,
passes, término por esgotamento e vitória antecipada por pares. Essa verificação
não demonstra equilíbrio entre os eixos nem substitui partidas com jogadores.
Na revanche, as pessoas trocam de cor/eixo; não existe regra de troca na abertura.
