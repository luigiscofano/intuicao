# MOSAICO

Duas oficinas montam um painel de cerâmica com peças compartilhadas. Cada azulejo tem dois cantos de cada cor, sempre adjacentes. A orientação afeta até quatro junções, que recebem uma assinatura quando três ou quatro cantos convergentes pertencem à mesma equipe.

## Organização

- `engine.mjs`: 25 posições, quatro orientações, 16 selos, pontuação e heurística.
- `view.mjs`: controle de orientação e seleção da casa; descreve todos os pontos produzidos pela prévia.
- `view.css`: azulejos com símbolos de cor redundantes e assinaturas posicionadas nas junções.
- `index.mjs`: exportação pública e regras completas.

## Estado e ação

`tiles` contém 25 valores: `null` para uma casa vazia, ou uma orientação de 0 a 3. Os cantos seguem a ordem noroeste, nordeste, sudeste e sudoeste. As cores são `0` (verde) e `1` (âmbar).

```js
{ type: 'place', cell: 6, orientation: 0 }
```

O exemplo coloca B2 com os cantos verdes para cima. `getSeals` fornece as junções e seus quatro cantos; `owner` é `null` quando incompleta, `-1` quando empatada, ou a equipe que a assinou. O estado guarda apenas os azulejos e os metadados da partida, evitando divergência entre peças e placar persistido.

## Resolução

As 16 junções são recalculadas após cada colocação. Isso permite pontuação simultânea das duas oficinas sem contar um selo duas vezes. `lastMove.completed` registra somente os selos concluídos naquela ação para a explicação visual. O resultado só é definido quando o painel inteiro estiver ocupado.

## Verificação

`node --test tests/versus/mosaico.test.mjs`

Os testes cobrem a sequência ilustrada de A1/B1/A2/B2, uma colocação que resolve quatro selos, pontos simultâneos, imutabilidade, ações inválidas e os dois resultados possíveis ao completar o painel: vitória por contagem ou empate.
