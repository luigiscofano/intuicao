# Catálogo da revisão v4 · 25/10/2026

## Escopo

O catálogo da revisão v4 reúne seis jogos: Reflexos (500 níveis), Corte certo (100), ELO (200), PRUMO (200), PACTO (200) e DESVIO (duelo sem campanha numerada). Total de campanha: 1200 níveis. O jogo de gangorra Equilíbrio e o jogo NEXO foram retirados da navegação e dos caminhos de ativação. PRUMO não foi retirado.

**Estado da revisão:** catálogo compilado e validação automatizada dos 500 níveis concluída, conforme [relatório de validação](development/reflexos-v4/validation-report.json). A inspeção em navegador real ainda não foi executada nesta etapa; não se declara publicação nem calibração com jogadores.

O texto “Não é sobre acertar de primeira. É sobre perceber o que muda quando você muda alguma coisa.” e o símbolo associado foram removidos. O rodapé de créditos e o acesso à documentação permanecem.

## Organização de Reflexos

| Faixa | Numeração | Quantidade |
|---|---:|---:|
| Básico | 1–200 | 200 |
| Intermediário | 201–300 | 100 |
| Avançado | 301–400 | 100 |
| Mestre | 401–500 | 100 |
| Total | 1–500 | 500 |

Somente o Básico admite subdivisões de aprendizado. Intermediário, Avançado e Mestre intercalam o repertório existente e os 16 conceitos de composição, sem capítulos temáticos. Os recortes de dez e 50 níveis servem à auditoria da variedade, não acrescentam divisões à interface.

A ideia 7 aparece em 136 Básicos, 97 Intermediários, 90 Avançados e 76 Mestres: 399 fases certificadas por conflito real. Há 335 mapas sem paredes, 109 com poucas paredes e 56 compartimentados. Entre os mapas sem paredes, 327 também têm certificado da ideia 7. As combinações de princípios relacionadas somam 135 / 99 / 100 / 100 por faixa. Os 16 conceitos aparecem em todas as faixas e em cada bloco superior de 50 níveis. A [distribuição detalhada](development/reflexos-v4/README.md) distingue contagens, decisões editoriais e limites.

## Remoção funcional

- A coleção exporta apenas PACTO no catálogo de símbolos.
- Os tutoriais lógicos disponíveis são ELO, PRUMO e PACTO, com três passos cada.
- O motor de símbolos aceita somente o formato PACTO; o formato NEXO é recusado.
- Ativações com nomes removidos ou desconhecidos são recusadas antes de alterar a tela.
- A importação aceita somente o jogo selecionado; NEXO não pode ser reintroduzido pelo editor de outro jogo.
- O módulo de respostas de Reflexos/Corte não contém respostas da gangorra. A solução de Corte usa a direção básica certificada da fase.

## Preservação

As chaves antigas de progresso, respostas e sessões do navegador não são apagadas ou convertidas em conclusões dos jogos atuais. Sessões históricas não pertencentes ao catálogo ativo conservam inclusive seus históricos de desfazer/refazer. Backups anteriores são históricos e não fazem parte da navegação atual. O armazenamento continua apenas local e não sincroniza entre aparelhos.

Na reorganização de Reflexos, o número de exibição não substitui o identificador estável. Uma fase inalterada deve conservar sua identidade e a correspondência com seu progresso; uma fase nova ou redesenhada não herda conclusão apenas por ocupar a mesma posição. Preferências, histórico e acesso adquirido devem permanecer preservados. O inventário confirma 158 IDs legados mantidos, 42 IDs anteriores fora da seleção e 342 identidades novas. As 200 definições originais e suas correspondências estão arquivadas; nenhum ID antigo é reassociado a um desafio novo. Os [testes de preservação](development/reflexos-v4/progress-validation.json) usam armazenamento simulado, sem acessar saves reais.

A expansão é de conteúdo e organização. Motor, reflexão, colisões, portais, tolerâncias, condições de vitória, controles, identidade visual e demais jogos permanecem fora do escopo de alteração. A comparação de preservação passou para 97 arquivos de execução e visual, e a alteração de integração foi conferida contra a base autorizada, sem substituir os relatórios históricos.

## Evidência da revisão v4

- Catálogo integrado: 500 Reflexos em 200 / 100 / 100 / 100; 1200 níveis na coleção.
- Motor real: 500 soluções, 500 inícios não resolvidos, 11.150 casos, 2254 ordens de disparo da solução e 2156 ordens de disparo de contraprovas com colisão.
- Margens: 3732 perturbações individuais de ±0,5° e 9922 cantos simultâneos, com todos os cantos enumerados para os 500 registros.
- Distribuição: metas quantitativas verificadas; nenhuma sequência de três principais iguais e nenhuma janela de dez iniciada após a fase 30 abaixo dos mínimos de variedade.
- Identidade: 200 definições antigas arquivadas, 158 reaproveitadas com conteúdo de puzzle preservado e 342 identidades novas; testes por ID aprovados.
- Interface real do app em DOM determinístico: 600 fluxos, 1800 confirmações incorretas, 1279 cliques individuais de fontes e 500 conclusões de Reflexos persistidas no armazenamento de teste.
- Preservação: comparação de 97 arquivos de execução/visual e testes de armazenamento e histórico aprovados.
- Navegador real: ainda não executado nesta etapa.

As legadas 121, 123 e 138, agora nas posições 362, 387 e 357, mantêm uma sobreposição parcial entre ponta de espelho e aro de portal, aceita em revisão estática sem ocultar centros, letras ou controles. As legadas 180 e 190 receberam translação de 5,5 px para cima para enquadrar rótulos, com IDs novos e posições 378 e 313. São reparos, não novas famílias lógicas. Os detalhes estão no registro v4.
Os detalhes, critérios de aceitação e limites estão no [registro v4](development/reflexos-v4/README.md). Uma solução reproduzida ou uma busca angular finita não prova exclusividade de solução.

## Evidência histórica da retirada de jogos

As referências abaixo descrevem a revisão anterior de 800 níveis. Seus nomes, expectativas e resultados são históricos; não devem ser confundidos com a validação da campanha Reflexos v3, de 200 níveis, nem com a revisão v4, de 500. Não atualize retroativamente suas contagens para simular uma execução posterior.

### Evidência da retirada naquela revisão

`catalogo-qa/catalogue-removal.test.mjs` verifica seis entradas de navegação, rótulo de 800 níveis, retirada do texto e símbolo, preservação do rodapé e documentação, 600 níveis lógicos, três tutoriais, rejeição de nomes retirados/desconhecidos e importação NEXO, conservação de sessões históricas e as 200 respostas PACTO válidas.

`catalogo-qa/collection-current.test.mjs` percorre ELO, PRUMO e PACTO em DOM simulado: 200 opções por jogo, seleção das extremidades, edição, lápis, undo/redo, imutabilidade de pistas, confirmação explícita, vitória, próximo nível, retomada, corrupção de snapshots e importações inválidas.

Estes testes não são uma sessão em navegador real. A campanha Corte v2 e a integração geral possuem seus próprios testes de geometria e interface; os resultados finais devem ser lidos junto ao relatório da revisão completa.

### Regressões da coleção ativa naquela revisão

- `catalogo-qa/collection-answers-current.test.mjs`: todos os 600 níveis de ELO/PRUMO/PACTO passam por três confirmações incompletas, desbloqueio, reset, nova instância com leitura do armazenamento, preenchimento pelo gabarito, preservação das pistas fixas, ausência de vitória automática, confirmação de vitória assistida e reabertura.
- `catalogo-qa/symbol-live-current.test.mjs`: seis grupos de testes PACTO, incluindo cotas na linha/coluna inteira, trios retos e dobrados, grupos maiores, isolamento, contradições por propagação sem consultar resposta, 200 soluções e 600 tabuleiros parciais corretos sem falsos positivos, entradas inválidas e imutabilidade dos dados internos.
- `catalogo-qa/interaction-current.test.mjs`: ELO com marcadores opcionais, ARIA, persistência, cores e peças fixas; PACTO com hachuras em cota excedida, desfazer/refazer, retomada/reset, todos os 200 inícios válidos sem falsos alertas, edição sem contar erros e derrota apenas na confirmação.

As cópias históricas das suítes anteriores permanecem intactas; naquela revisão, expectativas de NEXO foram removidas apenas das novas suítes da coleção. A campanha posterior de Reflexos v3 e sua validação permanecem documentadas em [REFLEXOS-V3.md](REFLEXOS-V3.md) e [QA-REFLEXOS-V3.md](QA-REFLEXOS-V3.md), sem alteração retroativa para 500 níveis.
