# Catálogo atual · 24/10/2026

## Escopo

O site oferece seis jogos: Reflexos (100 níveis), Corte certo (100), ELO (200), PRUMO (200), PACTO (200) e DESVIO (duelo sem campanha). Total de campanha: 800 níveis. O jogo de gangorra Equilíbrio e o jogo NEXO foram retirados da navegação e dos caminhos de ativação. PRUMO não foi retirado.

O texto “Não é sobre acertar de primeira. É sobre perceber o que muda quando você muda alguma coisa.” e o símbolo associado foram removidos. O rodapé de créditos e o acesso à documentação permanecem.

## Remoção funcional

- A coleção exporta apenas PACTO no catálogo de símbolos.
- Os tutoriais lógicos disponíveis são ELO, PRUMO e PACTO, com três passos cada.
- O motor de símbolos aceita somente o formato PACTO; o formato NEXO é recusado.
- Ativações com nomes removidos ou desconhecidos são recusadas antes de alterar a tela.
- A importação aceita somente o jogo selecionado; NEXO não pode ser reintroduzido pelo editor de outro jogo.
- O módulo de respostas de Reflexos/Corte não contém respostas da gangorra. A solução de Corte usa a direção básica certificada da fase.

## Preservação

As chaves antigas de progresso, respostas e sessões do navegador não são apagadas ou convertidas em conclusões dos jogos atuais. Sessões históricas não pertencentes ao catálogo ativo conservam inclusive seus históricos de desfazer/refazer. Backups anteriores são históricos e não fazem parte da navegação atual. O armazenamento continua apenas local e não sincroniza entre aparelhos.

## Evidência desta mudança

`catalogo-qa/catalogue-removal.test.mjs` verifica seis entradas de navegação, rótulo de 800 níveis, retirada do texto e símbolo, preservação do rodapé e documentação, 600 níveis lógicos, três tutoriais, rejeição de nomes retirados/desconhecidos e importação NEXO, conservação de sessões históricas e as 200 respostas PACTO válidas.

`catalogo-qa/collection-current.test.mjs` percorre ELO, PRUMO e PACTO em DOM simulado: 200 opções por jogo, seleção das extremidades, edição, lápis, undo/redo, imutabilidade de pistas, confirmação explícita, vitória, próximo nível, retomada, corrupção de snapshots e importações inválidas.

Estes testes não são uma sessão em navegador real. A campanha Corte v2 e a integração geral possuem seus próprios testes de geometria e interface; os resultados finais devem ser lidos junto ao relatório da revisão completa.

### Regressões completas da coleção ativa

- `catalogo-qa/collection-answers-current.test.mjs`: todos os 600 níveis de ELO/PRUMO/PACTO passam por três confirmações incompletas, desbloqueio, reset, nova instância com leitura do armazenamento, preenchimento pelo gabarito, preservação das pistas fixas, ausência de vitória automática, confirmação de vitória assistida e reabertura.
- `catalogo-qa/symbol-live-current.test.mjs`: seis grupos de testes PACTO, incluindo cotas na linha/coluna inteira, trios retos e dobrados, grupos maiores, isolamento, contradições por propagação sem consultar resposta, 200 soluções e 600 tabuleiros parciais corretos sem falsos positivos, entradas inválidas e imutabilidade dos dados internos.
- `catalogo-qa/interaction-current.test.mjs`: ELO com marcadores opcionais, ARIA, persistência, cores e peças fixas; PACTO com hachuras em cota excedida, desfazer/refazer, retomada/reset, todos os 200 inícios válidos sem falsos alertas, edição sem contar erros e derrota apenas na confirmação.

As cópias históricas das suítes anteriores permanecem intactas; expectativas de NEXO foram removidas apenas das novas suítes da campanha atual.
