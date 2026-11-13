# Retirada recuperável de Dobra

Solicitada por Luigi em 13/11/2026. Dobra deixa o catálogo e suas duas missões deixam a seleção ativa. URLs antigas levam à categoria Versus, sem abrir nem gravar partida.

Catálogo resultante: 19 jogos, sendo 7 Versus, e 51 missões. As 12 campanhas e seus 960 níveis não mudaram. Os números editoriais dos jogos foram preservados.

## Recuperação

A versão integral anterior é o Site v237, commit `c5eaa3579ec69056a1f6ab80e40de37d9ce654ba`. Um snapshot integral também foi arquivado antes da edição. O motor, dados, arte e metadados históricos de Dobra permanecem versionados. Os registros do jogo no armazenamento Versus e nos backups não são apagados nem filtrados ao salvar outro duelo. As conquistas já registradas permanecem no armazenamento histórico.

Para reativar somente Dobra: remover `dobra` da lista de jogos retirados e restaurar seu botão de catálogo a partir do histórico; revisar testes de contagens. Não reverter toda a main, pois isso descartaria melhorias posteriores de outros jogos.

## Validação

Testes de retirada cobrem catálogo, rotas antigas, redirecionamento, missões, preservação de saves/backup e impossibilidade de abrir a rota aposentada. Nenhuma alteração aos motores ou ao CSS dos jogos.
