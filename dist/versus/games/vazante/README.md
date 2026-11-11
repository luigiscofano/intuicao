# VAZANTE

Uma corrida de barcos com reboque obrigatório. O jogador move um barco para uma casa vizinha vazia, levando toda a fila contígua que estiver imediatamente atrás, inclusive barcos do adversário. Vence ao entregar dois barcos na margem oposta.

## Organização

- `engine.mjs`: remadas, comboios, atracação, passes, repetição e limite de turnos.
- `view.mjs`: seleção do barco/destino, barcos completos com ícones oficiais, prévia de reboque e vagas de chegada.
- `view.css`: rio, cascos de folha, contornos de interação e animação discreta da esteira.
- `index.mjs`: módulo público e regras completas.

## Estado e ação

`board` contém 25 casas em ordem de linhas, com `null`, `0` (verde) ou `1` (âmbar). `delivered` guarda as entregas, `consecutivePasses` os passes seguidos e `repetitions` as ocorrências de cada chave de posição.

```js
{ type: 'move', from: 12, to: 17 } // C3 → C4
{ type: 'pass' }                 // somente quando não existir remada
```

`getConvoy(state, move)` produz os deslocamentos sem modificar o estado. A ação aplicada limpa todas as origens antes de ocupar os destinos: uma fila não pode sobrescrever um barco antes de ele se mover. `lastMove` registra o comboio e as chegadas para a apresentação.

## Encerramento

A segunda entrega tem prioridade sobre qualquer empate. Em seguida são verificados os dois passes, a terceira repetição e o limite de 80 turnos. A chave de repetição usa a ocupação por equipe, as entregas e o jogador da vez. Não distingue nomes de barcos equivalentes.

Todas as cinco casas de cada margem são destinos válidos. As cinco marcas de cais na interface deixam isso visível, inclusive nas colunas B e D.

## Arte

Os mascotes vêm de `versusFrontIcon`, acomodados em um cockpit dentro do casco. O desenho oficial não é recolorido nem deformado. A base, o contorno e o símbolo círculo/losango identificam o proprietário; a espécie não concede habilidade.

## Verificação

`node --test tests/versus/vazante.test.mjs`

Os testes reconstroem os 12 lances do exemplo aprovado, a remada C3→C4 e o contra-reboque misto B3→A3. Também cobrem interrupção da fila, bordas, chegadas em B e D, vitória no turno 80, repetição real, passes obrigatórios e imutabilidade. O cenário de dois passes é um estado sintético de fronteira para conferir a cláusula de bloqueio, não uma abertura disponível no jogo.
