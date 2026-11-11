# Família de seis jogos lógicos

Esta pasta contém DIVISA, PULSO, FOZ, REFÚGIO, MIRANTE e RENOVO: seis campanhas de 80 fases, sob uma interface comum. Não inclui LAÇO nem RODÍZIO. [Regras, galeria e funcionamento para o jogador](../../docs/logica/README.md).

## Arquitetura

| Módulo | Responsabilidade |
| --- | --- |
| `metadata.mjs` | IDs, nomes, números 12–17, faixas e carregadores; permite listar jogos sem importar campanhas/motores |
| `route.mjs` | Abre/oculta o host `#logic-games`, importa a interface sob demanda e invalida respostas antigas de carregamento |
| `ui.mjs` | Seleção de fases, ferramentas, eventos, foco, histórico, Checar, ajuda explícita e apresentação do resultado |
| `session.mjs` | Histórico transacional, validação de restauração, tentativas sem sucesso e marca assistida |
| `keyboard.mjs` | Navegação por coordenadas, preservando a direção em grades com pistas fixas e espaços sem peças |
| `storage.mjs` | Store local versionado, sessões recentes, conclusões por identidade e escrita protegida |
| `catalog-summary.mjs` | Resumo das identidades ativas para conquistas, sem importar os motores na biblioteca |
| `info.mjs` | Conteúdo de informação e orientação por jogo |
| `ui.css` | Seleção, ferramentas e composição comum; cada jogo possui seu `view.css` |
| `games/<id>/engine.mjs` | Transições puras e verificação das regras, sem DOM ou armazenamento |
| `games/<id>/campaign.mjs` | Oitenta definições prontas, versões, metadados editoriais e certificados |
| `games/<id>/view.mjs` | Markup SVG puro, coordenadas, símbolos e alvos acessíveis |
| `games/<id>/index.mjs` | Adaptador público do jogo |

Não há empacotamento obrigatório. A geração e a certificação ficam em `tools/logica/` e `tests/logica/`; o runtime não importa esses módulos. O carregamento de uma rota usa revisão/token para que uma resposta atrasada não reabra o jogo depois de o usuário sair.

## Contrato dos jogos

Todos os `index.mjs` exportam:

```js
GAME;          // { id, name, description, rules: [3 strings], instructions }
CAMPAIGN;      // 80 definições prontas
initialState(level);
applyAction(level, state, action);
checkState(level, state);
isStateValid(level, state);
solutionState(level);
toolsForLevel(level);
renderBoard(level, state, { selectedTool });
```

`initialState` e `solutionState` retornam estados novos. `applyAction` não modifica argumentos; uma ação sem efeito devolve o estado anterior. A ação compartilhada é `{type:'cell', index, tool}`. FOZ e RENOVO também expõem operações de ligação no motor; a interface comum pode trabalhar com suas ferramentas por célula/peça, sem exigir arraste preciso.

`isStateValid` é uma checagem de **integridade**, não de vitória: permite uma tentativa parcial ou errada, mas rejeita formato, domínio ou pistas alteradas. Isso permite salvar uma experiência em andamento sem legitimá-la como resposta correta.

`checkState` devolve `{valid, complete, message, errors}`. `complete` significa que não restam decisões obrigatórias; `valid` só pode ser verdadeiro quando todas as regras estiverem satisfeitas. A interface depende desse contrato para reconhecer vitória automática após uma edição. O verificador não lê `solution`: o gabarito não substitui as regras.

As views devolvem SVG ou um invólucro HTML com SVG, sem manipular DOM. Alvos editáveis têm `data-cell`, `role="button"`, `tabindex="0"` e nome acessível em português. Pistas preservam pinos e indicação fixa; letras, formas, números e hachuras permitem leitura sem cor. Os seis `view.css` precisam ser carregados junto da interface.

## Catálogos e identidade

Cada nível tem `id`, `version:1`, `game`, `name`, `difficulty:0..5` e `number:1..80`, além dos dados próprios da regra. Os tamanhos dos tabuleiros, formas das pistas e quantidades variam conforme o jogo.

| Faixa | Números | Quantidade |
| --- | --- | --- |
| Básico | 1–15 | 15 |
| Aprendiz | 16–30 | 15 |
| Intermediário | 31–45 | 15 |
| Avançado | 46–60 | 15 |
| Mestre | 61–75 | 15 |
| Modo Sábio | 76–80 | 5 |

Identidade persistente e número visível são distintos. Uma conclusão só pertence à definição/versão registrada; não é herdada apenas por ocupar a mesma posição. Os geradores rejeitam duplicatas estruturais, não só IDs ou nomes repetidos.

As fases têm solução única certificada offline, e os exemplos aprovados são fixtures de regressão. As evidências de dedução editorial são registradas separadamente da contagem de soluções. Não se usa uma enumeração como alegação de roteiro humano, nem tempo de CPU como dificuldade. As faixas ainda precisam de calibração com jogadores; os detalhes e limites estão nos READMEs individuais.

## Histórico, conclusão e ajuda

`createSession` cria `{levelId, levelVersion, states, cursor, failures, assisted}`. O histórico mantém até 64 estados. Nova edição após desfazer abandona apenas o futuro daquela tentativa. Restaurar exige identidade/versão iguais, cursor válido e aprovação de todos os estados pelo motor.

Após uma edição, a UI chama `checkState`; só `valid:true` dispara vitória. Editar não soma erros. Checar avalia explicitamente o estado e registra uma tentativa sem sucesso se ele estiver incorreto ou incompleto. O resultado retorna mensagem e índices de erro específicos da regra.

Com três checagens sem sucesso, o gabarito fica disponível. `applySolution` só o aplica após esse limiar e verifica sua validade; a sessão fica `assisted:true`. A interface pede Checar para confirmar a solução aplicada. Reiniciar cria o estado inicial, mas preserva `failures` e `assisted` dessa tentativa. O registro de conclusões não aumenta por repetir uma fase.

Desfazer/refazer e reiniciar são responsabilidades do host; os motores não gravam progresso, não emitem animações e não contam conquistas. Os atalhos comuns são Tab, Enter/espaço, Ctrl/⌘ Z, Ctrl/⌘ Shift Z e Ctrl/⌘ Y.

## Persistência, backup e conquistas

O store é `intuicao.logica.v1`, versão 1, com `games` e `lastView`. Por jogo, mantém `completed`, as tentativas das 80 fases e `lastLevelId`. As oito tentativas mais recentes preservam o histórico completo, até 64 estados; as anteriores são compactadas para o estado atual, mantendo a posição, a marca assistida e o contador de checagens sem sucesso. Isso reduz o espaço usado sem apagar a partida. O teto de 500 sessões na normalização é uma defesa contra entradas excessivas, não um limite normal da campanha.

Conclusões contêm versão, marca assistida e data de registro. A normalização limita estrutura e tamanhos; o motor faz a validação final da tentativa ao restaurar.

`storage.mjs` usa `writeProgress` do guardião global e verifica se o conteúdo mudou desde sua última leitura. Uma aba desatualizada não deve sobrescrever outro save ou uma restauração. Dados incompatíveis são preservados e a UI pode continuar em memória, informando que não salvou. Não existe backend de partidas nem sincronização entre dispositivos.

`intuicao.logica.v1` integra a whitelist de `progress-backup.mjs`. As conquistas usam `catalog-summary.mjs` e a leitura normalizada do store, contando apenas identidades/versões ativas. As conclusões assistidas seguem a regra geral da coleção; visitas, tentativas e acesso a gabaritos não são inferidos como vitória. Regenerar o resumo ao alterar qualquer catálogo:

```sh
node tools/logica/catalog-summary.mjs
```

## Seleção diária e aleatória

`dailyLevelIndex(game, date, count)` usa a data civil no fuso `America/Sao_Paulo` e um hash determinístico de jogo/data. O desafio diário é uma fase do catálogo ativo, com a mesma identidade e o mesmo progresso. Não é uma geração online nem uma campanha paralela.

Surpreenda-me sorteia entre as fases cuja identidade/versão ainda não está concluída. Quando não resta nenhuma, usa o catálogo completo. Não há promessa de fase inédita depois de concluir as 80.

## Verificação e galeria

Os testes exclusivos ficam em `tests/logica/`; executar somente os arquivos de teste, não todos os scripts de geração por curinga:

```sh
node --test tests/logica/*.test.mjs
node tools/logica/render-gallery.mjs
```

Cada README de jogo contém seus comandos de geração/auditoria e o caminho dos certificados. A galeria usa as views reais com `initialState`, mantendo título, pista e coordenada do catálogo. Ela escreve seis SVGs em `docs/imagens/logica/`, cada um com proveniência programática incorporada, sem capturas de navegador ou raster gerado por IA. A [documentação da galeria](../../docs/logica/README.md#galeria-autoria-e-proveniência-programática) registra autoria técnica e preservação dos direitos visuais.
