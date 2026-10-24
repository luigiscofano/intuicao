# PACTO: hachuras de erros explícitos

## Correção de 24/10/2026

A interface usava `validateSymbols` durante a edição. Esse validador não consulta o gabarito, mas propaga restrições e pode descobrir que uma escolha impede uma solução futura. Também detectava cotas incorretas antes de completar a linha ou coluna. Essas duas análises eram exibidas como hachuras precoces.

A edição agora usa `validateSymbolEditing`, com as mesmas regras locais de pares, mas sem propagação e com aviso de cotas somente em linhas ou colunas completas. A confirmação, as dicas, os candidatos e o solucionador mantêm sua análise rigorosa, independente do gabarito. Ausência de hachuras não garante que um estado incompleto possa ser resolvido.

- Um par válido não é erro: cada casa precisa de exatamente um vizinho ortogonal igual.
- Trios retos, dobrados e grupos maiores são erros explícitos, sem depender de deduções.
- Uma casa sem parceiro só gera esse aviso quando todos os seus vizinhos já estão preenchidos com outros símbolos. Um vizinho vazio mantém a possibilidade local de par.
- Linhas e colunas completas precisam conter dois de cada um dos quatro símbolos. Linhas incompletas não recebem aviso de cota, mesmo se já ultrapassaram dois.
- Hachuras, cores, progresso, níveis e outros jogos foram preservados.

## Verificação

- `node tests/pacto-live-tests.mjs`: 9 grupos passaram; inclui escolha não canônica, par, trios, isolamento, cotas completas/incompletas em ambos os eixos, proteção de pistas, 200 inícios, 200 soluções e 600 estados parciais corretos.
- `node tests/direct-ui-acceptance.mjs`: 20 grupos passaram. Cobre integração das hachuras, acessibilidade do conflito, edição sem contar tentativa, desfazer/refazer, retomada, reset e vitória só ao confirmar, sem comparar com o gabarito.
- Regressões passaram: ações diretas (12), gestos (9), dicas (721 consultas e 400 ações), estrutura visual e geometria dos 100 níveis de Corte.
- Todos os módulos de distribuição passaram em `node --check`; `git diff --check` passou.

Os testes de interface usam DOM simulado. Esta verificação não é uma sessão interativa de navegador real nem validação visual em dispositivo. Publicação é uma etapa separada.

## Atraso e entrada suave das hachuras

Na edição, cada conflito explícito espera 2 segundos antes de aparecer. O aviso textual e os atributos de conflito acessíveis aguardam o mesmo prazo. Se o erro for corrigido antes, o aviso é descartado. Confirmar resposta mantém a avaliação e o resultado imediatos.

Apenas a camada de hachuras entra suavemente em 300 ms. O padrão, as cores e a largura originais não mudaram; a célula e seu símbolo não desaparecem. Com movimento reduzido, não há fade, mas o atraso continua.

Rerenders de controles não reiniciam o prazo nem o fade. Novos conflitos têm seu próprio prazo. Reinício confirmado, troca de nível/jogo, saída, desfazer/refazer e aplicação do gabarito não deixam callbacks antigos aparecerem sobre o novo estado.

`node tests/pacto-feedback-tests.mjs` verifica os limites de 1999/2000 ms com relógio simulado, cancelamentos, callbacks obsoletos, conflitos novos, confirmação imediata, ARIA/texto, progresso do fade e preservação do CSS. A verificação visual continua sendo estrutural/DOM simulado, não uma sessão em navegador real.
