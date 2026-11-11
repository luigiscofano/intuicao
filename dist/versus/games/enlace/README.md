# ENLACE

Duas redes de iluminação compartilham um tear. Cada presilha coloca obrigatoriamente um fio verde e um âmbar em braços perpendiculares. O dono da rede que atravessa vence, inclusive quando o último trecho veio do adversário.

## Organização

- `engine.mjs`: grafo fixo de 25 pinos e 40 arestas, ações legais, conectividade, resultado e heurística determinística.
- `view.mjs`: escolha do encontro, destino verde e destino âmbar; gera apenas uma prévia para o controlador confirmar.
- `view.css`: tear responsivo, canais de cor separados, sinais de seleção e margens de chegada.
- `index.mjs`: metadados e regras integrais para a interface compartilhada.

## Estado e ação

As casas usam índices de 0 a 24 em ordem de linhas. `edges` segue a ordem exportada em `EDGES`, com `null`, `0` ou `1`. Cada estado também guarda `player`, `moveCount`, `result` e `lastMove`.

```js
{ type: 'place', center: 10, green: 11, amber: 5 }
```

O exemplo instala A3–B3 verde e A3–A2 âmbar. Não há passe. A geometria e a ocupação são validadas antes de copiar o estado.

## Decisões de implementação

A conectividade começa em todos os cinco pinos de entrada de cada cor. O mesmo pino pode ser alcançado pelas duas redes, mas a busca só percorre arestas da cor correspondente. Os dois braços são resolvidos juntos, antes de verificar vitória ou esgotamento de encaixes. O alcance final conta pinos únicos, incluindo as cinco entradas.

## Verificação

`node --test tests/versus/enlace.test.mjs`

Os testes reproduzem o exemplo aprovado de 5→10 pinos verdes, conferem vitória presenteada e simultânea, encerramento por alcance, ações inválidas, imutabilidade e limite de 20 lances.
