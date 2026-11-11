# Missões de jogada aprovadas em 11 de novembro de 2026

A ampliação é aditiva: as dez conquistas gerais e as cinquenta missões anteriores continuam disponíveis. Quatorze novas missões completam as quinze propostas aprovadas, porque BROTO já registra o mesmo feito de duas flores em um plantio. O total é **74 conquistas: 10 gerais e 64 missões**. As gerais continuam usando as 14 campanhas atuais, com 1.120 fases.

## Critérios implementados

| Missão | Critério e evidência |
| --- | --- |
| Salto de luz | Reflexos: um mesmo raio vencedor atravessa portal e reflete em pelo menos três espelhos distintos. Não soma espelhos de raios diferentes. |
| Equilíbrio improvável | PRUMO: a solução realmente montada, validada pelo motor, contém peça sem simetria central em torno do apoio. Não basta a fase admitir uma solução assimétrica. |
| Quarteto | PACTO: quatro novas duplas consecutivas, uma de cada símbolo, seguidas de vitória. Duplas fixas iniciais, trios e anotações não contam. |
| Passagem de bastão | SINTONIA: um personagem deixa uma placa enquanto outro atravessa a cancela vinculada, no mesmo comando, e depois vence. Empurrar uma caixa não substitui a travessia do personagem. |
| Herança em cadeia | REPASSE: uma contribuição passa por três peças portadoras, incluindo a origem, antes de chegar à borda; todas as metas precisam ser concluídas. |
| Colheita dupla | BROTO: duas ou mais flores próprias no mesmo plantio. Reutiliza `broto-double-harvest`, preservando conquistas anteriores. |
| A última saída | CERCO: o vencedor acumula três turnos próprios com exatamente uma peça móvel. Essa peça pode ter vários destinos. Os turnos não precisam ser consecutivos. |
| De primeira | ELO, PRUMO ou Corte Certo: vitória na primeira confirmação da rodada. Ajustes manuais anteriores são permitidos. |
| Três certeiros | Três identidades de fase distintas em ELO, PRUMO ou Corte Certo, cada uma vencida na primeira confirmação. Repetir a mesma fase não soma. |
| Quatro movimentos, um plano | SINTONIA: “A parede também ajuda”, `sintonia-0021`, resolvida em até quatro comandos aceitos pelo motor. |
| Sem um passo a mais | SINTONIA ou ÓRBITA: vitória com quantidade igual ao mínimo comprovado. Certificado/limite superior sem prova de minimalidade não serve. |
| Superação pessoal | ÓRBITA: resultado humano melhora um recorde humano anteriormente registrado na mesma fase em pelo menos dois comandos. |
| Plano sem rasura | SINTONIA ou ÓRBITA: vitória sem Desfazer, Refazer ou Reiniciar durante a rodada. Reiniciar uma fase já vencida abre outra rodada. |
| Olho milimétrico | Corte Certo: vitória na primeira confirmação, com erro absoluto de até 0,5 ponto percentual. |
| Conta de chegada | REPASSE: a mesma caixa da borda recebe contribuições de pelo menos três retiradas distintas e a fase termina com vitória. |

A antiga missão retroativa `prumo-asymmetric` passa a se chamar **Possibilidades assimétricas**, mantendo ID, condição e progresso. Seu critério é concluir uma fase que admite partição assimétrica; a nova **Equilíbrio improvável** exige demonstrar isso na solução montada. Assim não existem dois cartões de mesmo nome com condições diferentes.

## Testemunhas reproduzíveis

Os testes usam os motores e os catálogos oficiais, não apenas fatos fabricados para os avaliadores.

- **Reflexos:** fase 14 (`light-v7-spacious-014`), espelhos em `[45,45,45,45]`; o mesmo raio cruza A1 e os espelhos 0, 1 e 2.
- **Corte Certo:** fase 1 (`corte-v2-1`), deslocamento 0, meta 50%; erro numérico praticamente zero.
- **PRUMO:** fase 16, resposta validada e assimetria calculada sobre a atribuição real das células.
- **PACTO:** fase 1, preenchimento humano de quatro pares distintos e conclusão automática real.
- **SINTONIA, bastão:** `sintonia80-0016-v5`, sequência `up,left,left,down,left,down,up,right,right`.
- **SINTONIA, quatro comandos:** `sintonia-0021`, sequência `left,up,right,right`.
- **REPASSE, cadeia:** fase 14, retiradas `p2,p1,p3`.
- **REPASSE, chegada:** fase 269, retiradas `p1,p8,p3,p2,p7,p4,p6,p5`.
- **CERCO:** sequência legal de 17 jogadas no mapa classic, integralmente reproduzida em `tests/achievements-approved-collection.test.mjs`.
- **ÓRBITA, recorde:** primeira fase vencida em três comandos com desvio reversível e depois em um; diferença de dois comandos.

SINTONIA consulta o certificado canônico atual com regras e método verificados. ÓRBITA executa BFS limitado a 20 mil estados/50 ms; só aceita uma prova que esgotou caminhos menores. Resultado inconclusivo não concede a missão. A galeria não roda essa busca.

## Rodadas, histórico e preservação

As missões registram ações humanas efetivamente aceitas. Abrir uma tela, retomar um save, renderizar resultado, pré-visualizar, jogar pelo computador ou aplicar automaticamente a solução não desbloqueia missões. Dicas em texto podem orientar escolhas manuais.

Primeira confirmação é da rodada, não da primeira visita da vida à fase. Falhas de confirmação e uso de gabarito são metadados separados do histórico editável: desfazer não os apaga. Saves antigos sem evidência suficiente são conservadores e não ganham retrospectivamente missões de precisão. Reiniciar explicitamente abre a nova tentativa de precisão. Conclusões e assistência históricas permanecem preservadas.

Em SINTONIA e ÓRBITA, a evidência mínima da rodada é salva com definição, comandos e cursor. A restauração valida esses vínculos e reavalia travessias de bastão pelo motor, sem conceder conquistas ao carregar. Pausa e recarga legítimas preservam a elegibilidade; histórico e reinício continuam registrados.

Em REPASSE e CERCO, evidências de sequência são acompanhadas na partida ativa. Desfazer/refazer invalida essa evidência da rodada; retomar não inventa os turnos ou contribuições anteriores. Reiniciar permite uma nova tentativa. Conquistas já registradas nunca são retiradas ao desfazer.

## Dados e apresentação

- Os IDs anteriores do registro `intuicao.missions.v1` permanecem inalterados.
- `intuicao.approved-attempts.v1` guarda no máximo três identidades de primeira confirmação. Não guarda soluções ou movimentos.
- O backup passa de 16 para 17 chaves. Restauração de backup anterior não apaga o novo registro que estava ausente no arquivo.
- Escritas usam a proteção contra abas desatualizadas após restauração. Dados ilegíveis/incompatíveis e falhas de quota não são sobrescritos nem interrompem a partida.
- As missões compartilhadas aparecem nos filtros de todos os seus jogos e têm links válidos para cada um. **Três certeiros** mostra progresso 0/3 a 3/3.
- Os quatorze novos emblemas são desenhos SVG próprios. O emblema e o ID de Colheita dupla são reutilizados.

## Verificação

```sh
node --test tests/achievements*.test.mjs tests/progress-backup.test.mjs tests/library-navigation.test.mjs
node scripts/build-achievement-index.mjs --check
```

Os testes cobrem testemunhas legais, negativas próximas dos limites, primeira confirmação, repetição da fase, reinício, gabarito, histórico, recarga, backup, filtros, preservação das missões anteriores e singularidade dos 74 símbolos. O relatório final da entrega informa os comandos e os resultados executados na árvore final; isso não representa uma auditoria de todas as 1.120 fases nem calibração de dificuldade com jogadores.

### Resultado desta árvore Sites

Verificação final em 11/11/2026: **472 testes aprovados**, sem falhas no recorte de release: 95 dos cinco motores, 283 de lógica/plataforma/conquistas/backup e 94 dos oito duelos. Índice de campanhas conferido, módulos alterados com sintaxe válida e `git diff --check` sem erros.

QA no navegador do preview local: galeria 64+10, filtros compartilhados, vitória manual Corte 1 em 50,0% com os desbloqueios esperados, Três certeiros em 1/3 preservado após recarga, aberturas de Reflexos/SINTONIA/REPASSE/CERCO e navegação de retorno. Emblemas inspecionados por amostragem em desktop. Mobile não validado: a API disponível não oferece redimensionamento de viewport. Nenhum erro da aplicação observado.

O recorte não inclui a suíte histórica inteira. Testes antigos de UI preservam algumas expectativas anteriores à base atual (fixtures SINTONIA arquivadas, snapshots CERCO e métodos ausentes no DOM sintético de DESVIO); as falhas observadas nesses testes foram reproduzidas na base anterior e não foram apresentadas como testes aprovados nesta entrega.
