# BROTO: identidade das plantas — opção B

A opção B aprovada diferencia os donos sem depender somente da cor:

- Jogador 1: folhas largas, verde profundo `#245a40` e símbolo ●.
- Jogador 2: folhas pontudas, dourado `#b5800a`, contorno `#76520a` e símbolo ◆.
- Nervuras discretas preservam a linguagem vegetal do jogo.

Os desenhos compartilham o mesmo espaço de 48 × 40 unidades. Não alteram o tamanho
nem o comportamento das casas. A silhueta representa somente o dono: não representa
nível, quantidade de estímulos ou uma nova espécie com poderes diferentes.

## Regras e acessibilidade

Horizontal ↔ e vertical ↕ continuam indicando os estímulos recebidos. Os dois juntos
mantêm a colheita e a pontuação originais. Prévia de plantio, flor, histórico, mapas,
rodadas e partidas salvas não mudam. Os símbolos ●/◆ continuam presentes; o rótulo
acessível também descreve a forma das folhas e os eixos. No dourado, a seta preenchida
usa texto escuro em vez de branco para melhorar a leitura.

## Organização

`dist/broto/piece-art.mjs` contém exclusivamente a arte das duas plantas.
`dist/broto/ui.mjs` escolhe a forma pelo dono, sem modificar o motor.
`dist/broto/ui.css` aplica a paleta apenas dentro de BROTO.

## Verificação

Executar:

```sh
node --test tests/broto-plant-identity.test.mjs tests/broto-engine.test.mjs tests/broto-maps.test.mjs
```

33 testes passaram, incluindo 1.900 duelos simulados, sete mapas, prévias,
colheita, histórico, persistência e estados de fim de rodada. O teste de identidade
confirma silhuetas distintas independentemente da cor, símbolos e eixos preservados.
A execução não equivale a auditoria completa de acessibilidade ou de todo o site.
