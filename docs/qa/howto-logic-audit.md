# Como jogar: seis jogos lógicos

## Escopo e fontes

Alterados apenas `dist/rules-logic-examples.mjs`, `tests/rules-logic-examples.test.mjs` e este relatório. Nenhum motor, campanha, save ou controle foi alterado.

A imagem fornecida `IMG_9919.jpeg` foi inspecionada antes da implementação. O módulo segue a composição suave do cartão de Reflexos, com texto em português, traços finos, verde, sálvia, roxo e âmbar. Cada SVG tem viewBox 240 × 140, painéis Antes/Depois e um gesto pequeno repetível. As miniaturas são exemplos didáticos, não fases de campanha.

Fontes auditadas: `dist/logica/games/{divisa,pulso,foz,refugio,mirante,renovo}/{index.mjs,engine.mjs,README.md}`, testes e fixtures correspondentes em `tests/logica`, e `dist/logica/ui.mjs`. O host confirma soluções completas automaticamente após editar; Checar permanece como verificação explícita. Os textos explicam ambos, sem introduzir necessidade de confirmar uma solução já correta.

## Casos reproduzíveis

- DIVISA: miniatura 2 × 2. Completar o B inferior deixa A à esquerda e B à direita; fronteira AB passa de um para dois lados. Ambos os territórios estão conectados.
- PULSO: linha com cinco casas. Batidas nas posições 1, 3 e 5, intervalos 2 e 2 e cotas 1/0/1/0/1. Casas 2 e 4 são vazios confirmados.
- FOZ: grade 2 × 2 com três canais. A seta superior direita para baixo completa a rota da pista 2 até 0. Distâncias finais: 2, 1, 1 e 0.
- REFÚGIO: linha de três casas, com um marco livre em cada extremo. A barreira central toca duas regiões distintas, não o exterior.
- MIRANTE: estoque de um círculo e nenhum triângulo. Dois observadores opostos de círculo veem a peça central através dos vazios. O motor conta duas testemunhas.
- RENOVO: semente à esquerda do botão e folha abaixo dele. Acrescentar a ligação vertical completa um ângulo reto. Os trechos se encontram apenas no botão; repetir o gesto remove o trecho.

Os fixtures exportados são a fonte dos testes de transição. Cada um começa incompleto, recebe uma ação permitida e termina em estado completo aceito pelo motor. Testes negativos cobrem fronteira incorreta, espaçamento desigual, indecisões, ciclos, distância incorreta, marcos reunidos, testemunha insuficiente, forma errada e trio reto.

## Conteúdo preservado

Os textos mantêm: pistas fixas; conexões por lados; metas exatas inclusive zero; ausência de exigência de área/formato em DIVISA; vazios explícitos e intervalo 1 em PULSO; canais permitidos, junções e distância em trechos em FOZ; identificadores de marcos (não áreas), duas regiões diferentes e barreiras possivelmente desconectadas em REFÚGIO; estoque, primeira peça, ausência de diagonais, observadores opostos e bordas sem informação em MIRANTE; primeira peça visível, ângulo reto, ausência de cruzamentos/sobreposições, uso único de peças e remoção de ligações em RENOVO.

## Integração CSS entregue ao responsável

O módulo não injeta estilos. Integrar estas regras no CSS existente, com o mesmo ciclo dos demais exemplos:

```css
.rpx-logic-reveal { animation: rpx-logic-reveal var(--rp-cycle, 6s) ease-in-out infinite; }
.rpx-logic-cue { animation: rpx-logic-cue var(--rp-cycle, 6s) ease-in-out infinite; }
@keyframes rpx-logic-reveal {
  0%, 18% { opacity: 0; }
  38%, 84% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes rpx-logic-cue {
  0%, 18%, 88%, 100% { opacity: .35; }
  30%, 76% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .rpx-logic-reveal, .rpx-logic-cue { animation: none; }
}
```

Não há transform nem opacidade oculta no SVG base: sem animação, a miniatura mostra o estado final verdadeiro. O texto alternativo detalhado está em `description`; o host deve expô-lo fora do SVG decorativo.

## Verificação

- `node --check dist/rules-logic-examples.mjs`: passou.
- `node --test tests/rules-logic-examples.test.mjs`: 19 testes passaram. Inclui 480 soluções das seis campanhas revalidadas pelos motores existentes, além dos seis exemplos e negativos.
- Suites existentes de DIVISA, FOZ, REFÚGIO e RENOVO: 36 testes passaram.
- Suites existentes de PULSO e MIRANTE: não iniciaram por ausência prévia dos módulos offline `tools/logica/pulso-audit.mjs` e `tools/logica/mirante-audit.mjs` neste checkout. O novo teste importa os motores diretamente e confirma suas campanhas sem depender desses arquivos ausentes.
- Inspeção visual no navegador e verificação das animações integradas ficam com o responsável pela integração, conforme divisão de trabalho; não foram executadas por este worker.
