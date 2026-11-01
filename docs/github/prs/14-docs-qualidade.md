# docs: separar diagnóstico histórico e verificação atual

**Estado:** integrado em `main` pelo [PR #14](https://github.com/luigiscofano/intuicao/pull/14).

**Branch de origem:** `docs/qualidade`  
**Base planejada:** `main`  
**Commit próprio:** `ca1b4c19361520db10e8c3ad5650831130e7fd54`

## Problema e resultado

Separar diagnóstico histórico e verificação atual. A mudança oferece um ponto de entrada verificável para esta área do projeto, mantendo o código executável e os relatórios históricos.

## Arquivos

- `tests/README.md`
- `docs/qualidade/README.md`

## Dependência

Integrar docs/entrada antes deste PR; revisar novamente o diff contra main.

## Validação

A preparação integrada verifica links locais dos documentos novos e preservação de código/ativos em relação ao baseline. O recorte de cinco motores passou 95 testes antes da alteração documental. Esses resultados registram a preparação local. Os resultados remotos ficam associados à revisão correspondente no GitHub Actions; não implicam aprovação da suíte completa.

## Limites

A revisão f0e7fcf ainda não foi incorporada. Sem alteração de licença ou publicação do site. Consulte docs/qualidade/README.md e confira o diff antes da integração.
