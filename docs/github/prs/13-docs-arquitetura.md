# docs: mapear arquitetura e contratos entre módulos

**Estado:** integrado em `main` pelo [PR #13](https://github.com/luigiscofano/intuicao/pull/13).

**Branch de origem:** `docs/arquitetura`  
**Base planejada:** `main`  
**Commit próprio:** `42855bbad797dec05b36d2b995a6ec8c18bc49a0`

## Problema e resultado

Mapear arquitetura e contratos entre módulos. A mudança oferece um ponto de entrada verificável para esta área do projeto, mantendo o código executável e os relatórios históricos.

## Arquivos

- `docs/arquitetura/README.md`
- `docs/jogos/README.md`

## Dependência

Integrar docs/entrada antes deste PR; revisar novamente o diff contra main.

## Validação

A preparação integrada verifica links locais dos documentos novos e preservação de código/ativos em relação ao baseline. O recorte de cinco motores passou 95 testes antes da alteração documental. Esses resultados registram a preparação local. Os resultados remotos ficam associados à revisão correspondente no GitHub Actions; não implicam aprovação da suíte completa.

## Limites

A revisão f0e7fcf ainda não foi incorporada. Sem alteração de licença ou publicação do site. Consulte docs/qualidade/README.md e confira o diff antes da integração.
