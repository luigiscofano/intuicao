# Branches, pull requests e integração

## Estado real

O repositório privado [luigiscofano/intuicao](https://github.com/luigiscofano/intuicao) recebeu o código completo e o histórico em 01/11/2026. Os PRs abaixo foram abertos e integrados com merge commits. O site publicado permanece separado.

O histórico de 183 commits do baseline é ancestral das novas branches. Não foi feito squash, rebase destrutivo ou reconstrução do passado. `main` é a branch principal e reúne as integrações; `export/github-organizado` preserva a versão consolidada do pacote original. `import/bootstrap` conserva o transporte e o registro da importação, sem integrar esses arquivos ao código do projeto.

## Unidades de revisão

| Ordem | Branch | Descrição e rastreabilidade | Estado |
| --- | --- | --- | --- |
| 01 | `docs/entrada` | [docs: criar apresentação e guia de execução do Intuição](prs/01-docs-entrada.md) | [PR #1 integrado](https://github.com/luigiscofano/intuicao/pull/1) |
| 02 | `docs/jogo-reflexos` | [docs: documentar regras e implementação de Reflexos](prs/02-docs-jogo-reflexos.md) | [PR #2 integrado](https://github.com/luigiscofano/intuicao/pull/2) |
| 03 | `docs/jogo-corte` | [docs: documentar regras e implementação de Corte certo](prs/03-docs-jogo-corte.md) | [PR #3 integrado](https://github.com/luigiscofano/intuicao/pull/3) |
| 04 | `docs/jogo-elo` | [docs: documentar regras e implementação de ELO](prs/04-docs-jogo-elo.md) | [PR #4 integrado](https://github.com/luigiscofano/intuicao/pull/4) |
| 05 | `docs/jogo-prumo` | [docs: documentar regras e implementação de PRUMO](prs/05-docs-jogo-prumo.md) | [PR #5 integrado](https://github.com/luigiscofano/intuicao/pull/5) |
| 06 | `docs/jogo-pacto` | [docs: documentar regras e implementação de PACTO](prs/06-docs-jogo-pacto.md) | [PR #6 integrado](https://github.com/luigiscofano/intuicao/pull/6) |
| 07 | `docs/jogo-sintonia` | [docs: documentar regras e implementação de SINTONIA](prs/07-docs-jogo-sintonia.md) | [PR #7 integrado](https://github.com/luigiscofano/intuicao/pull/7) |
| 08 | `docs/jogo-repasse` | [docs: documentar regras e implementação de REPASSE](prs/08-docs-jogo-repasse.md) | [PR #8 integrado](https://github.com/luigiscofano/intuicao/pull/8) |
| 09 | `docs/jogo-orbita` | [docs: documentar regras e implementação de ÓRBITA](prs/09-docs-jogo-orbita.md) | [PR #9 integrado](https://github.com/luigiscofano/intuicao/pull/9) |
| 10 | `docs/jogo-desvio` | [docs: documentar regras e implementação de DESVIO](prs/10-docs-jogo-desvio.md) | [PR #10 integrado](https://github.com/luigiscofano/intuicao/pull/10) |
| 11 | `docs/jogo-broto` | [docs: documentar regras e implementação de BROTO](prs/11-docs-jogo-broto.md) | [PR #11 integrado](https://github.com/luigiscofano/intuicao/pull/11) |
| 12 | `docs/jogo-cerco` | [docs: documentar regras e implementação de CERCO](prs/12-docs-jogo-cerco.md) | [PR #12 integrado](https://github.com/luigiscofano/intuicao/pull/12) |
| 13 | `docs/arquitetura` | [docs: mapear arquitetura e contratos entre módulos](prs/13-docs-arquitetura.md) | [PR #13 integrado](https://github.com/luigiscofano/intuicao/pull/13) |
| 14 | `docs/qualidade` | [docs: separar diagnóstico histórico e verificação atual](prs/14-docs-qualidade.md) | [PR #14 integrado](https://github.com/luigiscofano/intuicao/pull/14) |
| 15 | `docs/recursos-visuais` | [docs: inventariar arte e orientar manutenção visual](prs/15-docs-recursos-visuais.md) | [PR #15 integrado](https://github.com/luigiscofano/intuicao/pull/15) |
| 16 | `docs/contribuicao` | [docs: preparar contribuição e modelos de revisão](prs/16-docs-contribuicao.md) | [PR #16 integrado](https://github.com/luigiscofano/intuicao/pull/16) |
| 17 | `docs/manutencao` | [docs: definir rotinas de catálogo e compatibilidade](prs/17-docs-manutencao.md) | [PR #17 integrado](https://github.com/luigiscofano/intuicao/pull/17) |
| 18 | `ci/documentacao` | [ci: preparar validação documental e recorte manual de motores](prs/18-ci-documentacao.md) | [PR #18 integrado](https://github.com/luigiscofano/intuicao/pull/18) |
| 19 | `docs/plano-prs` | [Plano e fechamento](prs/19-docs-plano-prs.md) | [PR #19 integrado](https://github.com/luigiscofano/intuicao/pull/19) |

## Processo realizado

1. Criação do repositório privado, sem licença aberta.
2. Transporte de um bundle completo, com SHA-256 verificado antes da importação.
3. Importação de 21 branches e dos 183 commits originais sem reescrever seus identificadores, autores ou datas.
4. Restauração de `main` como branch principal.
5. Abertura e integração dos 19 PRs temáticos na ordem da tabela, preservando suas branches.
6. Atualização dos registros de publicação e correção da exibição do README inicial no PR de fechamento.

A [execução de importação concluída](https://github.com/luigiscofano/intuicao/actions/runs/41321523654) verificou o bundle e criou as referências sem sobrescrever branches existentes. A primeira tentativa foi atômica e recusada por falta de permissão para cadastrar workflows; os dois workflows foram depois registrados pela integração autorizada, e a segunda execução concluiu a importação.

O workflow temporário foi removido após a importação bem-sucedida; seu código e os logs permanecem no histórico de `import/bootstrap`. Durante a execução, ele só aceitava disparo manual e interrompia antes do push se qualquer branch de destino já existisse. Nenhum workflow faz deploy. A validação documental usa apenas leitura do repositório; os testes de motores têm execução manual separada. Consulte as [execuções do GitHub Actions](https://github.com/luigiscofano/intuicao/actions) para resultados de cada revisão.

Use merge commits nas próximas integrações. A branch `export/github-organizado` permanece como referência do pacote; não é necessário abrir um PR duplicando as alterações já integradas.

## Recuperar a revisão técnica pendente

Antes de declarar a entrega revisada completa, obter a cópia real de `f0e7fcf150606fc785b0b932c282c8fb5b8f0419`. Compare sua ancestralidade com `2354a3c`, preserve seus commits e resolva conflitos documentais de forma explícita. Não reconstruir esse commit apenas a partir dos resultados descritos em PDFs.

Depois, atualizar documentação, plano e evidências para o estado resultante. A correção de migração e o manifesto da revisão técnica precisam ser verificados como código presente, não como promessas copiadas.

## Critérios de revisão

Cada PR tem uma alteração concreta e um conjunto delimitado de arquivos. O número de PRs não é critério de qualidade: o objetivo desta divisão é permitir revisão independente de cada jogo e de cada área transversal. Branches e títulos permanecem preservados para rastreabilidade.

Nenhum workflow deste pacote faz deploy, altera acesso do site, torna o repositório público ou adiciona licença aberta.
