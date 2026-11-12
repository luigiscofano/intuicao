# RENOVO

Jogo de ligações entre sementes, botões e folhas. Visual C1 Vereda leve aprovado: todas as células em #f4f5ec; semente orgânica P1 verde com hilo creme; botão B3 dourado em espiral; folha azul com nervura central e quatro tracinhos creme. As formas informam o tipo sem depender da cor. A AIIJ C1 do hero preserva os arquivos aprovados, inclusive seus símbolos mais simples, sem redesenho.

## Regras preservadas

1. Cada botão deve ligar-se a uma semente e uma folha. Todas as peças entram exatamente uma vez.
2. Os dois trechos do botão formam um ângulo reto. Cada trecho é horizontal ou vertical e termina na **primeira peça** encontrada naquela direção.
3. Trechos não cruzam, não se sobrepõem e não atravessam peças. Somente os dois trechos de um mesmo trio podem se encontrar, em seu botão.

Células vazias podem ser atravessadas. Não existe diagonal nem exigência de cobrir todas as células vazias. Formar um trio reto de 180 graus não atende à segunda regra. A impossibilidade de cruzar vale também para trios distintos com ângulos localmente válidos.

## Dados e contrato

`index.mjs` exporta o contrato comum. O motor não acessa DOM, armazenamento, relógio ou rede; a campanha é carregada pronta e os solvers são exclusivamente offline.

- Nível: `{width,height,pieces:{indice:'S'|'B'|'F'},solution:[[semente,botao,folha],...]}` além dos campos comuns.
- Índices: `linha * width + coluna`.
- Estado: `{links:[[a,b],...],selected:null|indice}`. As ligações são não direcionadas. A seleção faz parte do estado serializável.
- `initialState()` devolve `{links:[],selected:null}` novo.
- `isStateValid` exige tipos e índices corretos, seleção sobre uma peça existente, ausência de duplicatas e ligações ortogonais entre botão e extremo que respeitem a primeira peça visível. Não exige solução: cruzamentos, graus excessivos e ângulos incorretos continuam representáveis para poder corrigir uma tentativa ou restaurar um save.
- `checkState` verifica graus, um extremo de cada tipo, perpendicularidade e interseções. **Não consulta `solution`.** `complete` indica que nenhuma peça ficou aquém do número de ligações exigido; uma posição completa pode continuar errada.
- `solutionState` monta uma cópia do gabarito para o comando explícito do host/testes. Histórico, reinício, tentativas e desbloqueio do gabarito pertencem ao host.

### Geometria visual

`geometry.mjs` exporta `boardGeometry(level)` e `cellCenter(level,index)` (par `[x,y]`). Células 68, passo 76, origem `[62,54]`; viewBox 5×5 de 500×532. As dimensões variáveis são `width*76-8+128` e `height*76-8+160`. O grupo `renovo-gesture-preview` fica depois das ligações e antes das peças. Apenas as peças usam `touch-action:none`; vazios preservam a rolagem nativa.

### Interação e eventos exatos

Com mouse ou dedo, comece na semente ou folha e trace até o botão. Pode continuar em ângulo reto até o extremo oposto. Solte para confirmar; Escape cancela o gesto. Repetir um traçado adiciona os trechos que faltam, sem remover os existentes. O método de dois cliques continua alternando cada ligação. Tab, Enter e Espaço continuam disponíveis. Limpar peça remove as ligações incidentes.


`toolsForLevel()` oferece `select` (padrão, “Ligar e traçar”) e `clear` (“Limpar peça”). A view coloca `data-cell` somente nas peças, com `role="button"`, `tabindex="0"`, `aria-pressed` e descrição em português do tipo, grau e seleção.

| Evento | Resultado |
| --- | --- |
| `{type:'cell',index,tool:'select'}` com seleção vazia | Seleciona a peça. |
| Segundo clique em peça compatível | Adiciona a ligação, ou a remove se já existir; limpa a seleção. |
| Segundo clique na própria peça | Cancela a seleção. |
| Segundo clique em outra peça incompatível | Move a seleção para a nova peça. |
| `{type:'cell',index,tool:'clear'}` | Remove todos os trechos incidentes e limpa a seleção. |
| `{type:'link',from,to}` | Alterna diretamente um trecho permitido e limpa a seleção. |
| `{type:'cancel-selection'}` | Limpa somente a seleção. |
| `{type:'trace',path:[inicio,botao,fim]}` (ou um par) | Adiciona os trechos permitidos em uma única jogada de histórico, sem alternar trechos existentes. |

`cycle` é aceito como sinônimo de `select`, para compatibilidade do host. As ações nunca mutam estado/nível; uma ação inválida preserva o estado. Não há `data-action` específico nem handlers inline. O host deve delegar clique/Enter/Espaço ao alvo `data-cell`.

A view mantém as classes de largura do tabuleiro. O layout global `board-fit.css` preserva o ajuste e a centralização responsiva publicados na versão 209, inclusive nas fases de 11 colunas. Em janelas simultaneamente estreitas e baixas (até 600×500 CSS px), somente RENOVO mantém o painel de ações abaixo do tabuleiro; grades densas conservam a rolagem local acessível do enquadramento existente.

## Campanha e evidência de progressão

São **80 fases únicas**, em faixas 15/15/15/15/15/5. As duas amostras aprovadas ficam em `tests/logica/renovo-fixtures.json` e nas posições 1 e 16. IDs usam SHA-256 da definição real. A curadoria rejeita equivalentes por translação, rotação, reflexão, troca global de semente/folha e mero espaçamento de linhas/colunas vazias. Tabuleiros gerados são compactados sem mudar visibilidade, perpendicularidade ou interseções; as fixtures conservam sua grade original.

| Faixa | Composição lógica registrada |
| --- | --- |
| Básico, 1–15 | Trios com um único candidato iniciam a cadeia. |
| Aprendiz, 16–30 | Um extremo só pode pertencer a um botão, reservando esse parceiro. |
| Intermediário, 31–45 | Reservas e trios fechados alternam entre regiões concorrentes. |
| Avançado, 46–60 | Um segmento comum a todas as alternativas de um botão proíbe outra ligação por cruzamento, antes de fechar o trio. |
| Mestre, 61–75 | Reservas de parceiros tornam um segmento obrigatório; só então esse segmento elimina uma alternativa em outra região. |
| Modo Sábio, 76–80 | A revelação do segmento depende de duas ou três camadas de eliminações anteriores no roteiro. |

Há uma rede única de competição entre os botões em cada fase gerada selecionada. Nas **35 fases finais**, retirar somente a regra de cruzamento produz exatamente **duas soluções**, enquanto todas as regras juntas deixam uma. Nas **20 últimas**, o segmento decisivo ainda não é obrigatório no estado inicial; ele surge após reservas. Nas cinco finais, quatro certificados registram profundidade de dependência 2 e um registra 3.

Esses dados motivaram a seleção, em vez de usar apenas quantidade de peças. A primeira busca trouxe muitos problemas resolvidos só por parceiros óbvios; eles não foram apresentados como fases avançadas. Uma busca por mutação encontrou núcleos com competição; novas composições conectadas escondem o segmento necessário atrás de reservas reais.

A dificuldade permanece **editorial, sem playtest**. Profundidade e trocas de regra medem o roteiro documentado, não a menor estratégia humana possível. O modelo também dispõe de reservas de subconjuntos e contradições curtas, mas as fases selecionadas usam no máximo a regra de segmento obrigatório; não são rotuladas como exigindo técnicas que seus certificados não mostram.

## Reconstrução e auditoria

Na raiz do checkout:

```sh
python3 tools/logica/renovo-build-campaign.py
python3 tools/logica/renovo-audit.py
node --test tests/logica/renovo-engine.test.mjs
```

A reconstrução padrão lê `tests/logica/renovo-curation.json`, insumo versionado com as 80 definições e origem dos candidatos. Recalcula soluções únicas, trilhas, contrafactuais, métricas e hashes, sem precisar de pools. `renovo-certificates.json` conserva o resultado detalhado de cada fase. A auditoria confere o arquivo final e o contrafactual sem cruzamentos.

Para gerar novamente candidatos e realizar uma nova curadoria:

```sh
python3 tools/logica/renovo-generate.py --samples 5000
python3 tools/logica/renovo-search-hard.py
python3 tools/logica/renovo-core-pool.py
python3 tools/logica/renovo-conditional-pool.py --target 200
python3 tools/logica/renovo-build-campaign.py --reselect
```

Sementes, nessa ordem: `11102026`, `90261110`, `11032026`, `11042026`. A busca por mutação mantém seu escore preliminar sem segmento obrigatório; a curadoria recertifica os resultados com o modelo completo. Cada script usa apenas Python 3 padrão. Os arquivos `tools/logica/renovo-*-pool.json` e `renovo-pool.json` são saídas intermediárias dispensáveis, não assets do site. Mudanças no algoritmo podem mudar uma nova seleção; a curadoria versionada é o caminho estável para reproduzir exatamente a campanha publicada.

O enumerador escolhe um trio por botão, excluindo conflitos, até esgotar alternativas ou encontrar uma segunda solução e rejeitar o candidato. O teste independente de unicidade usa ocupação de **pontos inteiros da malha**, sem importar auxiliares geométricos do motor ou ler o gabarito: 80/80 fases têm uma única cobertura. Testes também cobrem as fixtures, primeira peça visível, ângulo, extremos repetidos, cruzamento, estados malformados, ações imutáveis, seleção e renderer acessível.
