# docs: preparar contribuição e modelos de revisão

**Estado:** integrado em `main` pelo [PR #16](https://github.com/luigiscofano/intuicao/pull/16).

**Branch de origem:** `docs/contribuicao`  
**Base planejada:** `main`  
**Commit próprio:** `a8000c1b0845aa719281063ca1734343fd6f4011`

## Problema e resultado

Preparar contribuição e modelos de revisão. A mudança oferece um ponto de entrada verificável para esta área do projeto, mantendo o código executável e os relatórios históricos.

## Arquivos

- `CONTRIBUTING.md`
- `.github/README.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.github/ISSUE_TEMPLATE/documentation.md`
- `.gitignore`

## Dependência

Integrar docs/entrada antes deste PR; revisar novamente o diff contra main.

## Validação

A preparação integrada verifica links locais dos documentos novos e preservação de código/ativos em relação ao baseline. O recorte de cinco motores passou 95 testes antes da alteração documental. Esses resultados registram a preparação local. Os resultados remotos ficam associados à revisão correspondente no GitHub Actions; não implicam aprovação da suíte completa.

## Limites

A revisão f0e7fcf ainda não foi incorporada. Sem alteração de licença ou publicação do site. Consulte docs/qualidade/README.md e confira o diff antes da integração.
