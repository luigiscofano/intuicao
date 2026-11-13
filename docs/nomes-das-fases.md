# Nomes das fases de campanha

As 12 campanhas ativas têm 80 nomes próprios cada: **960 nomes**. Eles aparecem
somente depois de abrir a fase, no cabeçalho acima da área de jogo. A seleção
continua mostrando o número, a dificuldade e o progresso, sem revelar o título,
inclusive nos rótulos para leitores de tela.

## Escopo

- Intuição: Reflexos e Corte certo.
- Raciocínio lógico: Elo, Prumo, Pacto, Sintonia, Repasse, Pulso, Foz, Refúgio,
  Mirante e Renovo.
- O desafio diário usa o nome da fase correspondente na campanha.
- Versus, fases personalizadas, arquivos históricos e Modo Sem Parar não recebem
  nomes de campanha artificialmente. Seus contextos próprios são preservados.

## Organização

`dist/campaign-level-names-data.mjs` contém um mapa de nomes por jogo e por **ID
estável** da fase. `campaign-level-names.mjs` resolve o título e conserva o nome
original de uma fase desconhecida. Os nomes não são armazenados nos saves.

Os adaptadores fornecem `data-campaign-level-name` no indicador da fase aberta.
O cabeçalho comum lê esse atributo, sem duplicar controles nem alterar motores,
respostas, conquistas, dificuldade, IDs ou migrações de progresso. Alterar a ordem
da seleção não troca os nomes entre as fases.

## Verificação

- Catálogo: 12 jogos, 80 IDs correspondentes e 80 nomes distintos por jogo.
- Nomes de tamanho limitado, sem números artificiais ou marcação HTML.
- Cabeçalho: atualização de título e preservação do número em cada um dos 12 jogos.
- Navegação: primeiro/último nível, anterior/próximo, retorno à seleção,
  preservação das tentativas e isolamento de diário/modos livres.

Testes focados:

```sh
node --test tests/campaign-level-names.test.mjs tests/approved-game-shell.test.mjs
node --test tests/level-arrows*.test.mjs
```

Os nomes têm função editorial, não são pistas certificadas ou descrição exaustiva
da geometria de cada fase. Nenhum dado de jogador é enviado ao servidor.
