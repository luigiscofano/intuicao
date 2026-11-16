# Vitória e confirmação incorreta nas campanhas

## Escopo aprovado

As 12 campanhas ativas (Reflexos, Corte certo, ELO, PRUMO, PACTO, SINTONIA, REPASSE, PULSO, FOZ, REFÚGIO, MIRANTE e RENOVO) compartilham uma camada de feedback. Os sete jogos Versus e jogos arquivados ficam fora desta camada.

- Vitória: os azulejos locais se juntam sobre a área do tabuleiro, com **Vitória!** e **Nível concluído**, durante até 3,4 segundos.
- Confirmação incorreta: borda vermelha por 1,7 segundo e tremor de 320 ms, sem reiniciar a tentativa.
- A camada não recebe cliques, não muda foco, largura, altura, regras, storage, histórico ou pontuação. As animações e os resultados já existentes são preservados.
- Preferência de movimento reduzido, manual ou do sistema: estado estático equivalente, sem tremor. Alterá-la durante o efeito interrompe o movimento.
- Ao trocar de nível, editar, desfazer ou ocultar o tabuleiro, o ciclo anterior é encerrado. Confirmações repetidas substituem o efeito, não criam uma fila.

## Implementação

`dist/level-feedback.mjs` seleciona o tabuleiro dentro da família já existente e cria uma camada fixa fora do fluxo. O retângulo acompanha a posição do tabuleiro durante o efeito. `dist/level-feedback.css` contém somente os estilos desta camada. `createResultMotion`, já utilizado pelas 12 campanhas, chama o módulo após a decisão real do jogo. Ele não decide se uma resposta é correta.

O tremor usa a propriedade independente `translate`, sem substituir o `transform` usado pelo ajuste responsivo. A mensagem tem `role=status`, anúncio educado e não move o foco. Os azulejos são decorativos. Não há som, flash, movimento infinito ou espera obrigatória para avançar.

## Verificação

- 229 testes locais aprovados: módulo novo, família lógica, resultados, preferências, backup, ajuste de tabuleiro e controles.
- O teste anterior que esperava a classe de erro no palco inteiro foi atualizado para a nova camada; seu contrato de retry foi mantido.
- QA manual em Chrome na cópia local: PULSO, primeira fase, confirmação incorreta repetida, gabarito e confirmação da solução, anúncio de vitória, saída automática da camada e preservação dos controles.
- O tabuleiro da prévia em vídeo era ilustrativo; a implementação usa os tabuleiros reais.

### Limitações explícitas

Não foi realizada uma solução manual de cada uma das 960 fases, nem uma auditoria visual exaustiva em todos os celulares. A cobertura por jogo do novo módulo é automatizada; a amostra manual inicial foi PULSO. Os testes históricos de snapshots de motores Versus contêm diferenças anteriores a esta alteração e não são evidência de regressão deste módulo. A checagem de hashes de assets no checkout Windows acusa diferenças de fim de linha em SVGs já existentes; nenhum desses assets foi modificado pela feature.

## Como executar

```sh
node --test tests/level-feedback.test.mjs tests/contextual-result-motion.test.mjs tests/victory-tiles.test.mjs tests/motion-preference.test.mjs tests/motion-intent.test.mjs tests/logica/*.test.mjs tests/progress-backup.test.mjs tests/board-fit.test.mjs tests/campaign-action-buttons.test.mjs
```

A validação específica também roda no workflow `level-feedback.yml`. Para reverter a feature, reverta o PR correspondente; nenhum formato de progresso foi alterado.
## Botão após a vitória

Depois dos 3,4 segundos da comemoração, aparece um botão azul **Próximo nível** abaixo do painel lateral. Ele chama a seta nativa do jogo, preservando salvamento, modo e foco da próxima fase. Não aparece na última fase, no Versus, nem em modos sem uma próxima fase nativa (livre/customizado/Sem parar). O desafio diário mantém a transição já oferecida pela seta existente, sem criar outro diário.

A ação é removida ao reiniciar, navegar ou confirmar outro resultado. Ela não rouba foco e é acessível por Tab/Enter. A redução de movimento mantém a apresentação estática; o botão permanece disponível sem animação. Testes de contrato cobrem os 12 identificadores, estados indisponíveis e clique repetido. QA Chrome local confirmou Pulso fase1 → fase2 e botão azul abaixo dos azulejos da aba. Outras fases e telas móveis não foram auditadas manualmente nesta alteração.
