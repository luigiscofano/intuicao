# Verificação dos seis jogos lógicos — 10/11/2026

## Escopo e resultado

A integração foi preparada sobre a revisão GitHub `a6f9836` e sobre a versão 186 do site, preservando as diferenças já existentes entre as duas origens. O recorte final executado na origem do site passou com **224 testes, zero falhas**, em Node.js 24.22.1.

```sh
node --test tests/broto-engine.test.mjs tests/cerco-engine.test.mjs tests/sintonia-engine.test.mjs tests/repasse-engine.test.mjs tests/orbita-engine.test.mjs tests/logica/*.test.mjs tests/approved-game-shell.test.mjs tests/contextual-guidance.test.mjs tests/library-navigation.test.mjs tests/achievements.test.mjs tests/progress-backup.test.mjs
```

São 95 testes do recorte anterior, 67 da família lógica e 62 dos módulos de integração. Esse resultado não declara aprovada toda a suíte histórica. A CI das novas branches executa o mesmo escopo com os baselines próprios do GitHub.

## Certificação dos catálogos

As seis campanhas têm 80 definições, distribuição 15/15/15/15/15/5, identidades estáveis e uma única solução por fase. Cada motor valida as regras sem consultar o campo de gabarito. Os certificados e auditores em `tests/logica/` e `tools/logica/` registram os métodos de enumeração, dedução e diversidade; os [READMEs dos jogos](README.md) explicam seus limites.

DIVISA e REFÚGIO foram recontados por auditores independentes em JavaScript. PULSO e MIRANTE têm enumeradores separados dos geradores. FOZ foi recertificado por seu auditor offline; RENOVO também passou por um enumerador independente que usa ocupação dos pontos da malha. As faixas de dificuldade continuam editoriais, sem calibração com jogadores.

## Conferência no navegador

A conferência da interface incluiu abrir os seis jogos pela biblioteca, editar os tabuleiros, percorrer níveis, concluir DIVISA e RENOVO, desfazer/refazer por botões e atalhos, liberar/aplicar gabarito, cancelar reinício e retomar uma tentativa após recarregar. O contador da biblioteca refletiu as conclusões locais.

Foram corrigidos o foco após Ctrl/⌘ Z, a navegação direcional em grades esparsas e o contraste das pistas numéricas de FOZ contra o CSS global. A inspeção foi feita em navegador desktop; as views também foram renderizadas separadamente em larguras reduzidas. Isso não substitui teste completo em aparelhos móveis ou com leitores de tela.

## Reprodução e manutenção

O catálogo resumido e os seis diagramas foram gerados por suas ferramentas completas, sem jogos omitidos. Pools de busca e imagens temporárias de QA ficam fora dos commits. As curadorias de FOZ e RENOVO são versionadas para reconstruir exatamente as fases selecionadas sem depender dos pools.

Ao mudar regras, pistas ou identidade, execute os testes relevantes, regenere certificados e resumo, confira a galeria e atualize o inventário visual. Não transfira vitórias entre definições diferentes só porque ocupam o mesmo número na seleção.
