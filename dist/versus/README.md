# Oito jogos Versus

ENLACE, VAZANTE, MOSAICO, QUINHÃO, ESTALO, DOBRA, ACORDE e LASTRO compartilham
infraestrutura, preservando as regras próprias de cada duelo. Os jogos são locais,
para duas pessoas no mesmo aparelho ou uma pessoa contra o computador.

## Organização e responsabilidades

| Arquivo                                   | Responsabilidade                                                    |
| ----------------------------------------- | ------------------------------------------------------------------- |
| `games/<id>/engine.mjs`                   | Estado inicial, ações legais, transição imutável, placar e término. |
| `games/<id>/view.mjs`                     | Tabuleiro, seleção, prévia e descrição acessível da jogada.         |
| `games/<id>/view.css`                     | Apresentação e adaptação do tabuleiro à largura disponível.         |
| `games/<id>/index.mjs`                    | Metadados, regras e adaptador público do jogo.                      |
| `metadata.mjs`, `route.mjs`               | Catálogo leve e carregamento sob demanda.                           |
| `ui.mjs`, `ui.css`                        | Preparação, modos de jogo, confirmação e composição das telas.      |
| `session.mjs`                             | Histórico, ramificação após desfazer e replay de registros.         |
| `storage.mjs`                             | Persistência versionada integrada ao backup da plataforma.          |
| `search.mjs`                              | Minimax com poda alfa-beta, ordenação e aprofundamento progressivo. |
| `search-service.mjs`, `search-worker.mjs` | Execução fora da interface, cancelamento e contingência.            |
| `confirmation.mjs`                        | Diálogo de acordo para alterações da partida.                       |
| `shared/markup.mjs`                       | Escape de texto, coordenadas e atributos de ação.                   |

O [contrato de extensão](CONTRACT.md) define as interfaces de motor e view. Os
comentários em português explicam invariantes e decisões que não são evidentes
nos nomes. O código usa módulos ES nativos, sem dependências adicionais de runtime.

## Seleção, prévia e confirmação

Selecionar uma peça ou destino modifica somente a seleção da interface. Quando
há uma ação completa, o motor calcula um estado previsto usando a mesma função
que confirma a jogada. A prévia não altera turno, placar ou histórico persistido.
Confirmar acrescenta a ação ao histórico; Escape ou Cancelar prévia a descarta.

Os controles usam botões nativos, nomes acessíveis, foco de teclado e indicações
que combinam cor com símbolos. As animações respeitam a preferência por movimento
reduzido. VAZANTE usa os mascotes oficiais; eles não influenciam as regras.

## Modos

- **Local:** dois jogadores, com desfazer e refazer mediante acordo.
- **Competitivo:** duelo local com desfazer e refazer indisponíveis.
- **Computador:** o humano controla o Verde; a busca decide pelo Âmbar.
- **Treino:** uma sugestão de análise aparece como prévia e depende de confirmação.

A revanche mantém a configuração; em duelos locais, os jogadores podem trocar
as cores entre si. LASTRO possui sua própria alternância obrigatória de início
nas duas rodadas de um duelo.

## Histórico e armazenamento

A chave `intuicao.versus.v1` contém `{ version: 1, games: { ... } }`. Cada registro
guarda configuração, ações serializáveis e cursor. A restauração valida os dados
reproduzindo as ações pelo motor, sem confiar em um tabuleiro derivado recebido.
O limite de 180 ações cobre os máximos das oito regras aprovadas.

Desfazer mantém o futuro disponível para Refazer. Confirmar outra jogada depois
de desfazer remove somente esse futuro. Contra o computador, a navegação procura
uma decisão humana, inclusive nas etapas consecutivas de QUINHÃO.

O envelope é relido antes de cada gravação para conservar registros de outros
jogos atualizados em outra aba. A proteção global de restauração também se aplica
a estes jogos. Dados globais corrompidos ou de versão futura são preservados; o
aviso na tela informa quando o navegador não consegue salvar. A partida pode
continuar na memória enquanto a página permanecer aberta.

## Computador e limites

| Nível         | Profundidade máxima |   Nós | Tempo de busca | Alternativas por expansão |
| ------------- | ------------------: | ----: | -------------: | ------------------------: |
| Explorador    |                   1 |   100 |          90 ms |                        12 |
| Intermediário |                   2 | 1.800 |         280 ms |                        20 |
| Avançado      |                   4 | 9.000 |         750 ms |                        24 |

Esses valores são orçamentos de busca, não garantias de desempenho físico nem de
jogo perfeito. A camada anterior concluída permanece válida se a próxima for
interrompida. A avaliação considera o jogador que decide no estado, sem presumir
alternância a cada ação. Não há sorte nas regras nem informações ocultas usadas
pelo computador.

O serviço cancela o Worker ao navegar ou alterar a partida. Se Workers estiverem
indisponíveis, uma busca menor permite continuar. Uma primeira ação legal fica
disponível como contingência, sem modificar as regras do motor.

## Verificação

Na raiz do repositório:

```bash
node --test tests/versus/*.test.mjs
```

Os testes incluem exemplos aprovados, ações ilegais, términos, empates,
imutabilidade, conservação de recursos, histórico, replay, decisões do bot e
backup de sessões reais dos oito jogos. Os testes de catálogo e apresentação
verificam os 25 jogos junto aos motores e campanhas anteriores.

## Manuais dos motores

- [ENLACE](games/enlace/README.md)
- [VAZANTE](games/vazante/README.md)
- [MOSAICO](games/mosaico/README.md)
- [QUINHÃO](games/quinhao/README.md)
- [ESTALO](games/estalo/README.md)
- [DOBRA](games/dobra/README.md)
- [ACORDE](games/acorde/README.md)
- [LASTRO](games/lastro/README.md)

LASTRO mantém a configuração aprovada, cuja análise exaustiva encontrou vantagem
forçada de quem inicia a rodada sob jogo perfeito. Os testes verificam regras;
equilíbrio estratégico, duração estimada e diversão ainda dependem de avaliação
com jogadores.
