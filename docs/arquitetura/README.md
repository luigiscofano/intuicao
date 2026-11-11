# Arquitetura e leitura do código

[Índice](../README.md) · [Jogos](../jogos/README.md)

## Visão geral

O Intuição é uma aplicação estática modular. O navegador carrega HTML, CSS, JavaScript e dados diretamente de `dist`. Não há etapa de empacotamento obrigatória nem backend de partidas nesta base. Python pode servir arquivos locais e executar os geradores offline dos novos puzzles; não faz parte do runtime do site.

## Mapa de responsabilidades

| Camada | Exemplos | O que deve permanecer separado |
| --- | --- | --- |
| Entrada e navegação | [index.html](../../dist/index.html), [app.mjs](../../dist/app.mjs), [category-navigation.mjs](../../dist/category-navigation.mjs) | Categorias e ativação de tela não redefinem as regras |
| Coleção compartilhada | [collection-ui.mjs](../../dist/collection-ui.mjs), [collection-state.mjs](../../dist/collection-state.mjs) | Interface comum respeita o contrato específico de cada jogo |
| Regras | [geometry-games.mjs](../../dist/geometry-games.mjs), [symbol-games.mjs](../../dist/symbol-games.mjs), motores das subpastas | Validação não depende de animação ou placar visual |
| Conteúdo | Módulos de campanha e mapas | Definição de fase não é o estado da tentativa |
| Busca e serviços | Módulos `analysis`, `service` e `worker` | Orçamento esgotado não é prova de impossibilidade |
| Persistência | Módulos `*-progress.mjs` e restauração das rotas | Número exibido não substitui ID e versão |
| Apresentação | CSS, SVG e módulos de renderização | Personagem e cor não alteram regra de movimento |

## Famílias de implementação

Reflexos e Corte certo usam a estrutura inicial da aplicação e módulos no nível superior de `dist`. ELO e PRUMO compartilham parte da infraestrutura geométrica. PACTO usa o motor de símbolos. DESVIO participa da coleção compartilhada, mas tem motor próprio. SINTONIA, REPASSE, ÓRBITA, BROTO e CERCO têm subpastas e rotas dedicadas.

Essa organização reflete a evolução do projeto. A documentação cria pontos de entrada sem fazer uma refatoração física ampla, que exigiria revisar imports, estilos, catálogos e testes de preservação.

## Família lógica de seis campanhas

[`dist/logica/`](../../dist/logica/README.md) concentra DIVISA, PULSO, FOZ, REFÚGIO, MIRANTE e RENOVO. Cada pasta de jogo contém um motor puro, uma campanha certificada offline, uma view SVG e um adaptador público. Uma única interface compartilha seleção, eventos, histórico, ajuda e apresentação do resultado.

Os metadados de navegação não importam motores. A rota carrega a interface e o jogo sob demanda, invalidando respostas assíncronas antigas. As conquistas usam um resumo de IDs/versões em vez de carregar os seis catálogos completos. Os geradores e auditores ficam em `tools/logica/` e `tests/logica/`, fora do runtime.

O progresso tem chave própria (`intuicao.logica.v1`), integra o backup e preserva ID/versão, tentativa e marca assistida. O histórico possui limite de memória; tentativas antigas mantêm seu estado atual. Comentários nos módulos explicam as invariantes de armazenamento, as regras menos evidentes e os limites dos algoritmos.

## Família Versus de oito duelos

[`dist/versus/`](../../dist/versus/README.md) separa cada jogo em motor puro, view, CSS e metadados. A interface comum controla preparação, prévia, confirmação, histórico, salvamento e busca. Nenhum motor conhece o DOM, os mascotes ou o armazenamento do navegador.

Os registros guardam ações e cursor de histórico na chave `intuicao.versus.v1`. Retomar significa reproduzir essas ações pelo motor, incluindo o futuro disponível para Refazer. O armazenamento relê o envelope antes de escrever e usa a proteção global contra gravações de abas anteriores a uma restauração.

A análise minimax executa em Worker, tem orçamento por nível e é cancelada ao sair, reiniciar ou mudar de posição. QUINHÃO mantém explicitamente o decisor atual; LASTRO mantém a pausa entre rodadas sem antecipar o resultado final. O [contrato](../../dist/versus/CONTRACT.md) descreve os pontos de extensão.

## Estado e transição

Uma definição de nível descreve a configuração do desafio: geometria, pistas, alvos ou peças. Um estado descreve o andamento da tentativa: ocupação, jogadas, contadores ou turno. A transição valida uma ação e produz o próximo estado segundo as regras. A interface apresenta o resultado e, quando aplicável, o persiste.

Nos motores puros, manter entradas imutáveis facilita replay, previsão de jogada, undo/redo e comparação de resultados. Não substituir essa garantia por uma cópia superficial se o estado contém estruturas internas mutáveis.

## Vitória não é um único evento global

Alguns puzzles reconhecem vitória assim que a configuração fica correta; outros aguardam confirmação. Duelos encerram por regras de turno, reservas ou mobilidade. Uma refatoração de botões precisa preservar essas diferenças e impedir chamadas atrasadas de contar a mesma vitória duas vezes.

## Trabalho assíncrono

Geração e análise podem utilizar workers e caminhos de contingência. Ao sair de uma tela, reiniciar ou abrir outra fase, a resposta antiga não deve atualizar o tabuleiro novo. Verifique identificadores de requisição, cancelamento, timeout e correspondência entre a definição analisada e a atualmente exibida.

## Identidade e compatibilidade

Catálogos versionados contêm referências antigas porque a posição 40 de hoje pode ser outro desafio em relação à posição 40 anterior. Uma migração deve preservar progresso de definições iguais, arquivar o que deixou de ser ativo e impedir herança indevida de vitória.

O caso de idempotência de SINTONIA descrito em documentação externa continua pendente nesta preparação. Recuperar a revisão `f0e7fcf` é pré-requisito para incorporar aquela correção e seus testes sem reconstruir um histórico fictício.

## Exemplos de perguntas para revisão

- A regra pode ser avaliada sem DOM e sem consultar um gabarito?
- O catálogo importado é o ativo ou apenas um registro histórico?
- O resultado da busca distingue falha, impossibilidade comprovada e orçamento esgotado?
- O save mantém sua identidade depois de duas normalizações?
- O callback verifica se ainda pertence à tela e ao turno ativos?
- A animação pode ser interrompida sem deixar o estado lógico pela metade?

## Como localizar uma mudança

```bash
git log --oneline -- dist/sintonia
git log --follow -- dist/geometry-games.mjs
git show 2354a3c:dist/README.md
git diff 2354a3c -- dist
```

Use a [manutenção](../manutencao/README.md) para planejar alterações de conteúdo e a [qualidade](../qualidade/README.md) para documentar evidências.


