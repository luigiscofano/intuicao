# Biblioteca e conquistas

A biblioteca apresenta os 11 jogos juntos, com filtros opcionais por categoria. A tela Conquistas deriva os indicadores das conclusões armazenadas das oito campanhas atuais, sem gravar, migrar ou apagar localStorage. Os critérios estão visíveis na própria tela: um, dez, cinquenta e cem níveis diferentes; um nível Avançado, Mestre ou Modo Sábio; e um nível em cada campanha. Conclusões assistidas contam. Não se atribuem datas, tentativas ou vitórias Versus sem evidência.

Esta mudança parte de `design/terra-mata-2026-11-10` em `56587bbef33e3cd7011d39d14e708a6db510e5fa`. Não copia motores do Site e não altera main. O HTML fora da navegação e dos novos links CSS foi preservado. Os cartões dos onze jogos continuam iguais; a fixture guarda o HTML anterior do GitHub para o teste de preservação.

## Verificação

```sh
node --test tests/achievements.test.mjs tests/library-navigation.test.mjs tests/broto-engine.test.mjs tests/cerco-engine.test.mjs tests/sintonia-engine.test.mjs tests/repasse-engine.test.mjs tests/orbita-engine.test.mjs
```

108 testes aprovados na base GitHub. Isso cobre os novos indicadores e rotas, leitura sem escrita, dados malformados, arquivos históricos e cinco motores. Não equivale a validar todas as fases ou todas as migrações históricas. A revisão visual no navegador foi feita separadamente na base do Site, não nesta base GitHub divergente.
