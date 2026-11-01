# Qualidade da preparação para GitHub

## Base e alcance

Base: `2354a3cd4d0a06ed66b665ca853a635b64e3a0a7`. Organização documental realizada em 1 de novembro de 2026. A alteração não substitui o site publicado e não incorpora a revisão ausente `f0e7fcf`.

## Evidências

| Verificação | Estado |
| --- | --- |
| Cinco suítes de motores | Executadas nesta preparação: 95 aprovados, zero falhas, Node 24.22.1 |
| Suíte ampla do baseline | Registro externo: 701 / 521 / 180; não reexecutada nesta organização |
| 536 testes da revisão f0e7fcf | Apenas registro externo; revisão ausente, não incorporada |
| Links e inventário da documentação nova | Verificação por `node scripts/check-docs.mjs`; consultar registro final |
| Integridade do código executável e ativos | Comparação com baseline registrada no fechamento |
| CI do GitHub | Preparada, ainda não executada remotamente |
| Navegador, visual e acessibilidade | Não reexecutados durante esta alteração documental |

## O que o recorte de motores não prova

Não prova que todos os testes históricos passam, que todos os catálogos são únicos, que a curva de dificuldade foi calibrada com pessoas ou que a aplicação está livre de defeitos. Testes de regras sem navegador não verificam foco, toque, rolagem e legibilidade.

## Critérios para uma mudança futura

1. Identificar o contrato e o commit antes de alterar uma expectativa.
2. Acrescentar ou adaptar um caso que falhe pelo motivo correto.
3. Registrar comando, ambiente, resultado e limitações.
4. Verificar identidade de fase e save quando houver conteúdo ou migração.
5. Testar no navegador quando tocar layout, eventos ou acessibilidade.
6. Rever o diff e confirmar que nenhum artefato gerado alterou dados sem intenção.

Consulte o [fechamento da organização](fechamento.md) para as verificações e os totais da entrega.

## Pendências reais

- Recuperar a cópia revisada `f0e7fcf` com seu histórico e seus testes.
- Resolver a incorporação da correção de idempotência da migração SINTONIA.
- Reconciliar os manuais novos com a revisão recuperada.
- Criar o repositório privado e enviar branches; abrir os PRs preparados.
- Executar a CI no GitHub e registrar seus links reais.

O [plano de integração](../github/README.md) mantém as dependências de revisão explícitas.
