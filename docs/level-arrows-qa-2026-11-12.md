# Navegação lateral de níveis

## Escopo

As 14 campanhas usam uma seta de nível anterior à esquerda e uma de próximo nível à direita, fora da superfície interativa: Reflexos, Corte certo, Elo, Prumo, Pacto, Sintonia, Repasse, Órbita, Divisa, Pulso, Foz, Refúgio, Mirante e Renovo. Cada campanha tem 80 níveis. Os 11 jogos Versus não recebem navegação de níveis.

Os controles de Divisa, Pulso, Foz, Refúgio, Mirante e Renovo foram movidos do cabeçalho para a área lateral. Seus eventos e armazenamento continuam os mesmos. Os demais jogos conservaram os eventos existentes, com tipo de botão explícito e associação acessível ao tabuleiro.

## Comportamento verificado

- Primeiro nível: anterior desabilitado. Último nível: próximo desabilitado. Sem retorno circular.
- Ida e volta preservam a tentativa e não registram vitória.
- O desafio diário abre uma fase do catálogo. Usar uma seta segue para o nível vizinho da campanha.
- Sem Parar não mostra as setas da campanha. Novo desafio continua sendo uma ação separada. Em Elo, Prumo e Pacto, uma chamada negativa à navegação não gera mais um desafio novo.
- Enter e espaço ativam os botões. A troca direciona o foco para o novo tabuleiro. As setas do teclado mantêm as funções de jogo existentes.
- Botões laterais possuem nome acessível, indicação de foco, estado desabilitado nativo e alvo de pelo menos 44 × 44 CSS px.

## Testes automatizados

Executar:

- `node tests/level-arrows-logic.test.mjs`
- `node tests/level-arrows-movement.test.mjs`
- `node tests/level-arrows-original-collection.test.mjs`

Essas três suítes exercitam os handlers reais em DOM determinístico, com 14 campanhas, limites 1/80, tentativas salvas, diário, Sem Parar e ausência de efeito de conclusão. Elas não simulam geometria nativa do navegador.

A regressão de shell, enquadramento, armazenamento lógico, Sem Parar, teclado de Órbita, animais de Sintonia e gesto de Renovo também foi executada. Um teste legado independente de conclusão automática requer um método DOM `after` ausente no seu mock; essa limitação preexistente do mock não foi apresentada como falha de produção.

## Verificação no navegador

Navegador Chromium real, usando somente a interface do site. Foram exercitadas as 14 campanhas:

- 1170 × 745 CSS px: abrir 1, avançar para 2, voltar a 1; setas laterais e ausência de sobreposição.
- 400 × 596 CSS px: navegação e alvos de 44 px em todos os jogos.
- 333 × 497 CSS px: navegação e nível 80 em todos os jogos; nenhuma rolagem horizontal da página após as correções.
- Diário e Sem Parar nos 14 jogos: navegação diária correta e zero setas de campanha visíveis em Sem Parar.
- Os 11 jogos Versus foram abertos ou retomados, sem setas de níveis. Partidas salvas foram preservadas.

As larguras estreitas foram obtidas redimensionando a janela e usando zoom de acessibilidade do navegador. Isso não substitui um teste físico com tela sensível ao toque.

A QA encontrou dois problemas de enquadramento em janela simultaneamente estreita e baixa: o painel lateral podia deixar o tabuleiro com largura zero, e a faixa de giro da Órbita podia ultrapassar a página. O painel agora fica abaixo do tabuleiro nessas dimensões, apenas nas campanhas; os controles da Órbita ficam em uma coluna. Grades densas mantêm a rolagem local acessível já existente, em vez de reduzir as casas abaixo do tamanho mínimo.

## Preservação

Nenhum motor, catálogo, solução, regra de pontuação ou esquema de armazenamento foi alterado pelas setas. O visual e o traçado aprovados de Renovo foram conciliados com a fonte da versão 210, incluindo a correção independente de cancelamento de ponteiro.

## Entrega e CI no GitHub

A versão 211 foi publicada com as setas e a correção de cancelamento do RENOVO. A conferência pública posterior verificou a ida da fase 1 à fase 2 e a volta, com anterior desabilitado na primeira fase e controles de 44 × 44 px.

O porte para GitHub parte da árvore do PR65 e preserva as diferenças existentes entre o repositório e a fonte do Site. Foram executados todos os comandos atuais do workflow `engine-smoke.yml`: 736 testes aprovados, estados condicionais de viewport e índice de missões conferidos. Documentação e inventário de recursos também passaram. Isso é o recorte explícito da CI, não uma alegação de execução de todo teste legado do repositório.

Os contratos históricos continuam comparando suas entregas originais. `level-arrows-scope.test.mjs` protege o delta atual: somente sete arquivos de distribuição podem mudar, e os handlers, armazenamento e implementação de RENOVO permanecem idênticos à base do PR65.
