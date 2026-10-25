# ÓRBITA — validação da entrega

## Campanha e Endless

A campanha contém **500 fases completas**, distribuídas em 50 muito fáceis, 150 básicas, 100 intermediárias, 100 avançadas e 100 de mestre. Todas passaram pela validação estrutural, começam sem a solução pronta e possuem uma sequência reproduzida pelo mesmo motor utilizado no jogo.

| Verificação independente | Resultado |
|---|---:|
| Soluções conhecidas reproduzidas | 500/500 |
| Continuação válida após cinco jogadas livres | 500/500 |
| Mínimos declarados conferidos por busca em largura | 94/94 |
| Ocorrências de comandos especiais necessários | 61/61 |
| Assinaturas canônicas distintas | 499 |
| Fases 201–500 resolvíveis repetindo um único comando | Nenhuma |
| Casos de seed extrema reproduzidos | 20/20 |
| Seleções da reserva sem repetição na janela de 30 fases | 160/160 |
| Rodadas consecutivas de Endless verificadas | 24/24 |

As 24 rodadas de Endless foram geradas sem usar a reserva e abrangeram as nove famílias, com dois a cinco anéis. O esgotamento da reserva também foi exercitado: produz uma resposta explícita, sem apresentar uma fase inválida ou repetir silenciosamente uma configuração excluída.

A única equivalência canônica da campanha está nas fases **1 e 2**, que apresentam intencionalmente a mesma relação nos dois sentidos de giro. A assinatura ignora nomes, símbolos renomeados, posição, escala, espelhamento e inversão completa de um comando. As fases 11–500 não têm duplicações canônicas.

O relatório detalhado, com identificação SHA-256 do catálogo auditado, está em [orbita-independent-audit.json](orbita-independent-audit.json). O procedimento reproduzível está em `tests/orbita-independent-audit.mjs`.

## Motor e serviço

Passaram **17 grupos de testes do motor** e **11 do serviço**. Foram conferidos conservação e ocupação única das casas, inversos, alvos fixos, equivalência de peças, passo 2 atômico, engrenagens disjuntas, sensores externos, dicas a partir da posição atual, cancelamento, respostas tardias, timeout, preservação de seed e reserva certificada. O módulo de Worker de produção também foi executado em uma thread isolada.

O exemplo de sete casas resolve com os quatro giros exigidos e possui mínimo comprovado de quatro. O comutador obrigatório transforma `[0,1,2,3,4,5,6]` em `[3,1,2,6,4,5,0]`, alterando apenas três posições.

## Verificação visual e dos fluxos

No navegador, foram exercitados:

- Fase 10: `B horário → A horário → B horário → A anti-horário`; gabarito calculado da posição atual quando restava um giro; desfazer e refazer.
- Três verificações incorretas liberando gabarito e reinício circular; reinício com cancelamento e confirmação; operação repetida pelo teclado.
- Passo 2 na fase 307 e engrenagem na 352, incluindo seus inversos; sensor da fase 411, seu desbloqueio e a disponibilidade do inverso imediato.
- Endless: geração, persistência, reinício do mesmo desafio e avanço para uma configuração diferente.
- Largura de 375 px: sem rolagem horizontal da página; tabuleiros grandes mantêm a geometria e usam rolagem interna.

## Preservação do Intuição

Os **seis grupos de integração do ÓRBITA** verificaram a preservação dos oito jogos anteriores em comparação com o estado-base `044349eebdce9eafc20ed5b4029e5ed765d8fd62`.

Também passaram os testes existentes de REPASSE — 24 do motor e 10 de estado da interface —, SINTONIA — 25 do motor e 8 de estado da interface — e as duas suítes de reinício. As alterações externas ao módulo do ÓRBITA se destinam à integração com a coleção e seus componentes compartilhados.

## Limites da comprovação

Há solução mínima comprovada para **94 fases**, não para todas as 500. Nas demais, o replay comprova a solvabilidade e o comprimento conhecido constitui um limite superior.

A busca possui orçamento de tempo e estados. Quando o orçamento acaba, a resposta é inconclusiva. Uma continuação segura pode ser construída a partir do histórico válido e do certificado inicial, sempre conferida novamente sobre o estado atual; ela não é apresentada como mínima. As métricas de transferência e restauração descrevem as sequências verificadas e não afirmam que toda solução possível precisa seguir a mesma estratégia.
