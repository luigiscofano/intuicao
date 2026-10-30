# Atualização CORTE80 · 30/10/2026

Corte certo tem exatamente 80 fases em seis faixas (15/15/15/15/15/5), todas solucionáveis no eixo básico. A curadoria preserva identidades das definições inalteradas e dá nova identidade às geometrias recompostas; não transfere vitórias pela posição. Motor, visuais e tolerância inclusiva de ±3 pp permanecem iguais. Controles da curva continuam disponíveis na aba própria; o painel auxiliar avançado continua exclusivo de Reflexos, e Dicas continuam exclusivas de PACTO. [Validação e limites](CORTE80-VALIDACAO.md).

# Atualização PRUMO80 · 30/10/2026

## Atualização PACTO80 — campanha ativa

**PACTO tem exatamente 80 níveis**: Básico 1–15, Aprendiz 16–30, Intermediário 31–45, Avançado 46–60, Mestre 61–75 e Modo Sábio 76–80. Grade 8×8, quatro símbolos, duas ocorrências por linha e coluna e exatamente um parceiro ortogonal permanecem obrigatórios desde o primeiro nível. A curadoria considera as relações dedutivas, não somente a quantidade de pistas.

As [80 definições e sequências de raciocínio](PACTO80-VALIDACAO.md) registram origem, função das pistas e certificados. IDs preservam fases idênticas; pistas alteradas recebem IDs novos. Histórico anterior fica preservado, sem transferir conclusões pelo número exibido. Diário usa apenas as 80 fases atuais; Modo Sem Parar e personalizados ficam fora da campanha. As referências numéricas antigas abaixo são históricas.


A campanha ativa de **PRUMO tem exatamente 80 níveis**, em seis faixas: Básico 1–15, Aprendiz 16–30, Intermediário 31–45, Avançado 46–60, Mestre 61–75 e Modo Sábio 76–80. As grades reais progridem de 4×4 até 10×10, intercalando enigmas compactos. Consulte a [tabela por fase e limites de validação](PRUMO80-VALIDACAO.md). Diário escolhe deste catálogo; Modo Sem Parar e fases personalizadas não aumentam a campanha. Dicas visíveis continuam exclusivas de PACTO; opções avançadas continuam exclusivas de Reflexos.

As seções a seguir documentam revisões históricas. Suas antigas contagens e divisões de PRUMO não descrevem a campanha atual; não se sobrepõem à atualização acima. Os dados e gabaritos antigos são preservados como histórico, sem transferir vitórias por número de posição.

---

# Catálogo da revisão v5 · 25/10/2026

## Escopo

O catálogo da revisão v5 reúne seis jogos: Reflexos (500 níveis), Corte certo (100), ELO (200), PRUMO (200), PACTO (200) e DESVIO (duelo sem campanha numerada). Total de campanha: 1200 níveis. O jogo de gangorra Equilíbrio e o jogo NEXO foram retirados da navegação e dos caminhos de ativação. PRUMO não foi retirado.

**Estado da revisão:** campanha v5 compilada e validada conforme [relatório de validação](development/reflexos-v5/validation-report.json), com gate editorial de incidência real. Publicação e inspeção em navegador são etapas separadas; nenhuma sessão de jogador é alegada.

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

A ideia 7 aparece em 136 Básicos, 97 Intermediários, 90 Avançados e 76 Mestres: 399 fases com conflito multicor real. Há 335 mapas sem paredes, dos quais 327 certificados pela ideia 7. Combinações relacionadas: 127 / 91 / 100 / 96 por faixa. Os 16 conceitos aparecem em todas as faixas e em cada bloco superior de 50 níveis. A [distribuição detalhada](development/reflexos-v5/README.md) distingue contagens de provas físicas.

## Remoção funcional

- A coleção exporta apenas PACTO no catálogo de símbolos.
- Os tutoriais lógicos disponíveis são ELO, PRUMO e PACTO, com três passos cada.
- O motor de símbolos aceita somente o formato PACTO; o formato NEXO é recusado.
- Ativações com nomes removidos ou desconhecidos são recusadas antes de alterar a tela.
- A importação aceita somente o jogo selecionado; NEXO não pode ser reintroduzido pelo editor de outro jogo.
- O módulo de respostas de Reflexos/Corte não contém respostas da gangorra. A solução de Corte usa a direção básica certificada da fase.

## Preservação

As chaves antigas de progresso, respostas e sessões do navegador não são apagadas ou convertidas em conclusões dos jogos atuais. Sessões históricas não pertencentes ao catálogo ativo conservam inclusive seus históricos de desfazer/refazer. Backups anteriores são históricos e não fazem parte da navegação atual. O armazenamento continua apenas local e não sincroniza entre aparelhos.

Nesta revisão conservam-se 120 IDs da campanha de 500 e 96 IDs originais v3. Mapas alterados recebem IDs novos, preservando os registros antigos sem transferência artificial de conclusões.

A correção é de composição e geometria das fases. Motor, reflexão, colisões, portais, tolerâncias, condições de vitória, controles, identidade visual e demais jogos permanecem fora do escopo de alteração. A comparação atual protege 139 arquivos de execução, visual e arquivos históricos; os quatro arquivos de dados/documentação autorizados são conferidos separadamente, sem substituir hashes antigos.

## Evidência atual da revisão v5

A campanha v5 conserva 500 fases e corrige a geometria de 380 mapas. As 500 referências foram reproduzidas no motor preservado, com zero reflexão abaixo de 20° entre o feixe incidente e a linha do espelho. O limite é editorial, não uma nova regra de jogo: outras soluções legítimas continuam aceitas. Foram reexecutados 11.752 casos e os testes individuais/cantos ±0,5°. A inspeção em navegador da nova publicação permanece separada destes testes de motor e DOM; não se declara calibração com jogadores. Veja o [registro v5](development/reflexos-v5/README.md).

O arquivo v5 conserva os 500 mapas anteriores integralmente. A proteção de 139 arquivos confirma que motor, controles, sprites e demais jogos permanecem inalterados. Há 88 fases com incidência de referência entre 20° e 30°; nenhuma abaixo 20°. Referências, contraprovas e alternativas completas conhecidas igualmente/menos complexas passaram pelo gate obrigatório. Alternativas locais ou mais longas podem conter incidências menores e são relatadas, não bloqueadas.

## Evidência histórica da revisão v4

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
