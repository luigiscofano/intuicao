# Acorde e Quinhão em telas estreitas

Reorganização aprovada, limitada a larguras de até 540 CSS px. O desktop conserva as coleções ilustradas do Acorde e o círculo do Quinhão. Nenhum motor, persistência, regra ou busca de IA foi alterado.

## Acorde
- Mesma grade 4×4, com alvos de 54 px na janela de 320 px.
- Coleções em tabela: pares por jogador e contagens por símbolo, incluindo a projeção de uma jogada ainda não confirmada.
- Espaço reservado para passar a vez: o tabuleiro não encolhe quando esse comando aparece.

## Quinhão
- Perímetro retangular de 6 colunas × 8 linhas, 24 posições. A ordem dos cestos continua horária, incluindo a passagem do último para o primeiro.
- Conforme cestos são retirados, os restantes são redistribuídos pelo mesmo perímetro, preservando sua ordem cíclica. A prévia não os retira antes de confirmar.
- Cestos de pelo menos 44×44 px. A largura mínima de 274 px vem de seis alvos e cinco intervalos de 2 px.
- Placares centrais e legenda única. Os três cestos oferecidos são os próprios botões de escolha; os botões duplicados de desktop não aparecem no celular.

## Controles e acessibilidade
Os seis controles originais ficam em três linhas de duas colunas. Não existem clones de ações, novos atalhos nem alterações de save. Nomes acessíveis, foco, confirmação repetida e diálogo de acordo ao desfazer são preservados. Prévia e instrução não se repetem visualmente. Um espaço de texto reservado evita deslocar controles na oferta/recebimento.

## Verificação
- 154 testes: plataforma Versus, jogadores, motores, replay/IA, confirmação repetida e os novos testes de coleções/perímetro.
- Browser real, janelas internas 320×820 e 390×844: início, oferta, escolha, recibo, próximo turno, oito jogadas de Acorde até o passe, prévia de passe e desfazer com confirmação. Todos os comandos visíveis e nenhum recorte interno nesses fluxos; tabuleiro estável.
- Desktop: revisão do círculo do Quinhão e das coleções do Acorde; regras móveis isoladas em media query.
- Os testes puros percorrem as oito rodadas até a vitória do Quinhão. Isso não equivale a uma partida completa por toque em todos os modos/níveis de IA.
- Janelas mais baixas, texto ampliado e ferramentas adicionais de treino continuam usando a política existente de rolagem acessível quando necessário. Não há promessa de acomodar qualquer tamanho de tela sem rolagem.
- `tests/viewport-conditional-states.mjs` possui uma expectativa anterior do Estalo (espera seleção sem movimento no primeiro clique), incompatível com sua confirmação direta atual. Esse agregado não foi declarado como aprovado; as suítes afetadas acima passam.

## GitHub
Patch seletivo sobre `feat/jogadores-sintonia` (#87), mantendo a cadeia de dependências. Não inclui os geradores Sem parar pendentes e não integra PRs automaticamente.
