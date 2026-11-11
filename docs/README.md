# Documentação do Intuição

Este índice separa guias de entrada de registros de implementação. Os documentos antigos foram mantidos no lugar porque muitos descrevem uma revisão específica ou são citados por testes.

## Trilhas de leitura

| Objetivo | Ordem recomendada |
| --- | --- |
| Jogar pela primeira vez | [Apresentação](../README.md) → [Execução](setup/README.md) → [Manual do jogo](jogos/README.md) |
| Entender implementação | [Arquitetura](arquitetura/README.md) → arquivos do jogo → [Testes](../tests/README.md) |
| Alterar conteúdo | Manual do jogo → catálogo ativo → [Manutenção](manutencao/README.md) |
| Rever alterações | [Contribuição](../CONTRIBUTING.md) → [Branches e PRs](github/README.md) → [Qualidade](qualidade/README.md) |
| Trabalhar com arte | [Recursos visuais](../dist/platform-assets/README.md) → módulos consumidores |

## Edição dos seis jogos lógicos

[DIVISA, PULSO, FOZ, REFÚGIO, MIRANTE e RENOVO](logica/README.md) acrescentam 480 fases ao catálogo. O guia reúne regras, galeria gerada pelas views reais, controles, persistência e limites da certificação. O [contrato técnico](../dist/logica/README.md) descreve a separação entre motores, campanhas, interface e armazenamento.

## Edição dos oito duelos

[ENLACE, VAZANTE, MOSAICO, QUINHÃO, ESTALO, DOBRA, ACORDE e LASTRO](versus/README.md) ampliam o catálogo para 25 jogos e a categoria Versus para 11. O guia traz descrições ilustradas, controles e regras. A [arquitetura compartilhada](../dist/versus/README.md) explica motores, prévias, replay e busca; as [verificações](versus/VERIFICACAO.md) registram os testes realmente executados.

## Fontes e precedência

O código executado e o catálogo importado pela rota definem o comportamento atual. Uma nota de entrega datada descreve o commit a que se refere; não substitui automaticamente uma alteração posterior. Textos como “500 fases”, “1.000 fases” ou “sete mapas CERCO” em documentos antigos precisam ser lidos no contexto daquela revisão.

Os guias da organização inicial usam a base `2354a3c`. A edição dos seis jogos lógicos de 10/11/2026 parte da revisão GitHub `a6f9836`, preservando suas diferenças em relação ao site publicado. A revisão `f0e7fcf` é conhecida por documentação externa, mas não está neste checkout. Não copiar seu manifesto, seus resultados ou suas correções por suposição.

## Como documentar uma mudança

Registre problema observável, comportamento esperado, arquivos alterados, identidade dos dados, comando de validação e resultado. Diferencie teste executado de teste sugerido. Se uma mudança toca IDs, save ou migração, descreva como os dados anteriores continuam acessíveis.

Mantenha certificados e relatórios históricos sem reescrever seus resultados. Acrescente uma nota atual com a relação entre a revisão antiga e a nova. Prefira um link para o relatório completo a repetir grandes tabelas em vários READMEs.


