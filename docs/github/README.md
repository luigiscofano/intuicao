# Branches, pull requests e integração

## Estado real

Esta é uma preparação local. Nenhum PR foi aberto no GitHub e nenhum número ou link de PR foi inventado. O destino solicitado é o repositório privado `luigiscofano/intuicao`, ainda pendente de criação e envio. O site publicado permanece separado.

O histórico de 183 commits do baseline é ancestral das novas branches. Não foi feito squash, rebase destrutivo ou reconstrução do passado. `main` continua em `2354a3c`; `export/github-organizado` reúne a organização para inspeção e transporte.

## Unidades de revisão

| Ordem | Branch | Descrição preparada | Estado |
| --- | --- | --- | --- |
| 01 | `docs/entrada` | [docs: criar apresentação e guia de execução do Intuição](prs/01-docs-entrada.md) | Preparado localmente |
| 02 | `docs/jogo-reflexos` | [docs: documentar regras e implementação de Reflexos](prs/02-docs-jogo-reflexos.md) | Preparado localmente |
| 03 | `docs/jogo-corte` | [docs: documentar regras e implementação de Corte certo](prs/03-docs-jogo-corte.md) | Preparado localmente |
| 04 | `docs/jogo-elo` | [docs: documentar regras e implementação de ELO](prs/04-docs-jogo-elo.md) | Preparado localmente |
| 05 | `docs/jogo-prumo` | [docs: documentar regras e implementação de PRUMO](prs/05-docs-jogo-prumo.md) | Preparado localmente |
| 06 | `docs/jogo-pacto` | [docs: documentar regras e implementação de PACTO](prs/06-docs-jogo-pacto.md) | Preparado localmente |
| 07 | `docs/jogo-sintonia` | [docs: documentar regras e implementação de SINTONIA](prs/07-docs-jogo-sintonia.md) | Preparado localmente |
| 08 | `docs/jogo-repasse` | [docs: documentar regras e implementação de REPASSE](prs/08-docs-jogo-repasse.md) | Preparado localmente |
| 09 | `docs/jogo-orbita` | [docs: documentar regras e implementação de ÓRBITA](prs/09-docs-jogo-orbita.md) | Preparado localmente |
| 10 | `docs/jogo-desvio` | [docs: documentar regras e implementação de DESVIO](prs/10-docs-jogo-desvio.md) | Preparado localmente |
| 11 | `docs/jogo-broto` | [docs: documentar regras e implementação de BROTO](prs/11-docs-jogo-broto.md) | Preparado localmente |
| 12 | `docs/jogo-cerco` | [docs: documentar regras e implementação de CERCO](prs/12-docs-jogo-cerco.md) | Preparado localmente |
| 13 | `docs/arquitetura` | [docs: mapear arquitetura e contratos entre módulos](prs/13-docs-arquitetura.md) | Preparado localmente |
| 14 | `docs/qualidade` | [docs: separar diagnóstico histórico e verificação atual](prs/14-docs-qualidade.md) | Preparado localmente |
| 15 | `docs/recursos-visuais` | [docs: inventariar arte e orientar manutenção visual](prs/15-docs-recursos-visuais.md) | Preparado localmente |
| 16 | `docs/contribuicao` | [docs: preparar contribuição e modelos de revisão](prs/16-docs-contribuicao.md) | Preparado localmente |
| 17 | `docs/manutencao` | [docs: definir rotinas de catálogo e compatibilidade](prs/17-docs-manutencao.md) | Preparado localmente |
| 18 | `ci/documentacao` | [ci: preparar validação documental e recorte manual de motores](prs/18-ci-documentacao.md) | Preparado localmente |
| 19 | `docs/plano-prs` | [Plano e fechamento](prs/19-docs-plano-prs.md) | Preparado localmente |

## Dependências e ordem

1. Criar o repositório como privado e vazio, sem README inicial e sem licença automática.
2. Enviar `main` preservando o baseline e o histórico original.
3. Abrir e integrar `docs/entrada` primeiro.
4. Revisar as 11 branches dos jogos e as de arquitetura, qualidade, recursos visuais, contribuição e manutenção. São mudanças documentais separadas; seus links cruzados ficam completos na integração final.
5. Integrar `ci/documentacao` depois das branches documentais. O manifesto desta branch cobre os guias já integrados; o PR 19 o amplia com os documentos do plano de revisão.
6. Integrar `docs/plano-prs`, que contém o manifesto completo e este índice.
7. Executar a CI documental e, separadamente, o recorte manual de motores.

Use merge commits para preservar os commits e as branches desta preparação. Não abrir também um PR da branch `export/github-organizado` sobre main para duplicar os mesmos diffs; ela é uma visão integrada de transporte e revisão.

## Recuperar a revisão técnica pendente

Antes de declarar a entrega revisada completa, obter a cópia real de `f0e7fcf150606fc785b0b932c282c8fb5b8f0419`. Compare sua ancestralidade com `2354a3c`, preserve seus commits e resolva conflitos documentais de forma explícita. Não reconstruir esse commit apenas a partir dos resultados descritos em PDFs.

Depois, atualizar documentação, plano e evidências para o estado resultante. A correção de migração e o manifesto da revisão técnica precisam ser verificados como código presente, não como promessas copiadas.

## Critérios de revisão

Cada PR tem uma alteração concreta e um conjunto delimitado de arquivos. O número de PRs não é critério de qualidade: o objetivo desta divisão é permitir revisão independente de cada jogo e de cada área transversal. Branches e títulos permanecem preservados para rastreabilidade.

Nenhum workflow deste pacote faz deploy, altera acesso do site, torna o repositório público ou adiciona licença aberta.
