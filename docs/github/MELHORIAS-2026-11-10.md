# Melhorias de 10/11/2026

## Sequência de revisão

1. `design/terra-mata-2026-11-10`: apresentação visual inicial (PR #38).
2. `feature/jogos-conquistas-2026-11-10`: biblioteca e conquistas iniciais (PR #39).
3. `feat/backup-progresso-2026-11-10`: exportação, prévia, restauração e bloqueio de escritores antigos.
4. `feat/biblioteca-focada-2026-11-10`: biblioteca focada, progresso dos cartões e dez conquistas.
5. `feat/orientacao-contextual-2026-11-10`: orientação por jogo, nomes de apresentação e refinamento visual.

Cada PR usa a branch anterior como base. Após integrar uma etapa, conferir a base e o diff da seguinte. Nenhum merge ou publicação está implícito nesta documentação.

## Preservação

A base do GitHub é `d10c8b595e882ea21074ec5984657a7ac7e6de86`, descendente de `main` (`2d015c1cc98a7435051e0552f9e1b99bc42c3993`). A implementação correspondente do site partiu de `ff9251ff41695e33800c3d272aa1943ec5f1f161`. As árvores não são intercambiáveis.

Motores, mapas, catálogos e IDs do GitHub permanecem intactos. Nos arquivos compartilhados e divergentes, foram portados apenas imports, chamadas de escrita protegida e três nomes apresentados pela interface. O HTML mantém os cartões da base GitHub. Os testes usam referências locais versionadas, não commits exclusivos do site.

## Verificação local do conjunto

- 32 testes de backup, conquistas, navegação, nomes e orientação: aprovados.
- 95 testes dos cinco motores cobertos pelo workflow: aprovados.
- Verificação sintática dos módulos centrais alterados: aprovada.
- `git diff --check`: aprovado.

Comandos:

```sh
node --test tests/progress-backup.test.mjs tests/achievements.test.mjs tests/library-navigation.test.mjs tests/campaign-display-names.test.mjs tests/contextual-guidance.test.mjs
node --test tests/broto-engine.test.mjs tests/cerco-engine.test.mjs tests/sintonia-engine.test.mjs tests/repasse-engine.test.mjs tests/orbita-engine.test.mjs
```

Isso não representa a suíte histórica completa nem uma validação visual em navegador da árvore GitHub. Os checks remotos `links`, `engines`, `secret-scan` e `asset-inventory` precisam aprovar o commit exato antes da integração. O merge no GitHub não publica o site.
