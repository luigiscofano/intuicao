# Conquistas e missões do Intuição

**Luigi Scofano de Araujo**

Este módulo reúne dez conquistas gerais e sessenta e quatro missões específicas dos 25 jogos. A galeria usa setenta e quatro emblemas SVG distintos. As regras dos jogos continuam em seus motores; o sistema de conquistas observa evidências que esses motores e os registros de campanha já oferecem.

## Responsabilidades

| Arquivo | Responsabilidade |
| --- | --- |
| `../achievements.mjs` | Ler conclusões atuais, calcular os marcos gerais e montar a projeção da galeria. |
| `campaign-missions.mjs` | Definir 28 missões comprováveis pela composição das fases oficiais concluídas. |
| `logic-mission-index.mjs` | Conservar somente IDs e versões das fases elegíveis nas seis campanhas lógicas. |
| `legacy-versus-missions.mjs` | Avaliar seis missões de BROTO, CERCO e DESVIO após transições humanas. |
| `versus-missions.mjs` | Avaliar dezesseis missões dos oito novos duelos. |
| `catalog.mjs` | Reunir metadados e identificadores permitidos sem importar motores de jogos. |
| `mission-store.mjs` | Ler, validar e registrar a primeira conquista de cada missão de ação. |
| `icons.mjs` | Desenhar os setenta e quatro emblemas como SVGs independentes de fonte. |
| `view.mjs` | Renderizar a galeria, aplicar filtros e preservar o controle com foco. |
| `notifications.mjs` | Anunciar novas missões sem mover o foco ou interromper a partida. |

## Evidências e momento da avaliação

As missões de campanha são projetadas, sem escrita, a partir das fases atuais cuja conclusão foi validada. A identidade importa: números de posição, tentativas, visitas a fases e simples acesso a respostas não comprovam conclusão. Conclusões assistidas podem contar, como já acontece nos marcos gerais. A descrição de cada missão se limita à informação que o registro permite provar.

As missões Versus recebem o estado anterior, o posterior e os dados da ação que o motor aceitou. O controlador chama o registro depois da confirmação humana, inclusive no treino. Prévias, busca, execução do bot, retomada e deslocamento pelo histórico não passam por esse registro. O motor já carregado fornece os cálculos necessários, evitando carregar todos os jogos na abertura da galeria.

Cada descoberta pertence ao navegador, inclusive quando duas pessoas jogam localmente. O registro não é uma classificação competitiva de usuários. Desfazer uma jogada não revoga uma conquista já registrada; refazer não concede uma nova conquista. Nos jogos antigos, mapas importados ficam excluídos. Os mapas de DESVIO gerados pelo próprio site podem contar.

## Armazenamento e backup

O registro `intuicao.missions.v1` contém `{ version: 1, unlocked: { id: { unlockedAt } } }`. Só são aceitos os 36 identificadores conhecidos de missões de ação e datas válidas. As 28 missões de campanha permanecem derivadas dos saves originais.

Cada escrita relê o registro atual para conservar descobertas de outras abas. A proteção de escrita existente bloqueia abas antigas depois de uma restauração. Dados incompatíveis ou ilegíveis não são sobrescritos silenciosamente; falhas de armazenamento não interrompem o jogo. O backup compartilhado inclui a nova chave e continua aceitando arquivos antigos que não a possuem.

## Atualização das campanhas

O navegador lê o catálogo resumido das seis campanhas lógicas, sem carregar suas soluções completas. Ao mudar fases, versões ou predicados, gere novamente o índice:

```bash
node scripts/build-achievement-index.mjs
node scripts/build-achievement-index.mjs --check
```

O índice é gerado pelos mesmos predicados e conserva a identidade e a versão de cada fase. Os testes comparam o resultado com os 480 níveis completos e comprovam que versões diferentes não herdam conquistas.

## Verificação

```bash
node --test tests/achievements*.test.mjs tests/progress-backup.test.mjs tests/library-navigation.test.mjs
```

Os testes incluem uma sequência legal para cada missão de ação, uma fase oficial para cada missão de campanha, isolamento de versões, ausência de desbloqueio por prévia/bot, preservação de dados, backup, filtros, cobertura dos setenta e quatro emblemas e temporizadores acessíveis dos avisos. A CI também executa os recortes de motores e da plataforma.

[Missões aprovadas, evidências e preservação](../../docs/conquistas/MISSOES-APROVADAS-2026-11-11.md)

## Ampliação de precisão e eficiência

`approved-catalog.mjs` acrescenta quatorze missões; Colheita dupla reutiliza o ID anterior. Os avaliadores `approved-original.mjs`, `approved-collection.mjs`, `movement-missions.mjs` e `repasse-action-missions.mjs` observam rodadas humanas. `approved-store.mjs` conserva até três identidades de fase para Três certeiros, também incluídas no backup. Missões compartilhadas aparecem em todos os filtros elegíveis.
