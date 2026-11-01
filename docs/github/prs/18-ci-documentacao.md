# ci: preparar validação documental e recorte manual de motores

**Estado:** descrição preparada localmente; PR ainda não aberto no GitHub.

**Branch de origem:** `ci/documentacao`  
**Base planejada:** `main`  
**Commit inicial:** `b77bfaf5740f78939b7328ce5438d46185866aba`

## Problema e resultado

Preparar validação documental e recorte manual de motores. A mudança oferece um ponto de entrada verificável para esta área do projeto, mantendo o código executável e os relatórios históricos.

## Arquivos

- `scripts/docs-manifest.json`
- `scripts/check-docs.mjs`
- `scripts/README.md`
- `.github/workflows/documentation.yml`
- `.github/workflows/engine-smoke.yml`

- Ajuste complementar: índice provisório de integração para que os links já passem antes do PR 19.

## Dependência

Integrar primeiro os 17 PRs documentais anteriores. Esta branch foi criada sobre sua integração local.

## Validação

A preparação integrada verifica links locais dos documentos novos e preservação de código/ativos em relação ao baseline. O recorte de cinco motores passou 95 testes antes da alteração documental. Esses resultados não substituem uma execução de CI neste PR; a CI remota ainda não aconteceu.

## Limites

A revisão f0e7fcf ainda não foi incorporada. Sem alteração de licença ou publicação do site. Consulte docs/qualidade/README.md e confira o diff antes da integração.
