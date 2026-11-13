# Retirada de Enlace

Enlace deixa o catálogo ativo por solicitação do autor. A biblioteca passa a ter 20 jogos (12 campanhas e 8 duelos) e 53 missões visíveis. Links antigos levam à categoria Versus.

O motor, os módulos históricos, saves e backups permanecem intactos. Não há migração destrutiva nem alteração nas regras dos jogos restantes.

## Recuperação

O Site anterior é a versão v227, commit `b95b4aaebad4172593f4a6940aa1799da53695e2`. A base desta alteração no GitHub é o PR80, commit `74b00ed781a62b4d93fc0cf8becc24b1da14062a`. A recuperação deve preservar também as melhorias posteriores.

## Testes

Contratos de catálogo, rotas diretas, missões e apresentação foram ajustados ao conjunto ativo. O teste de saves confirma que salvar Quinhão conserva o registro de Enlace. Os testes do motor de Enlace continuam executados para garantir a integridade da versão preservada.
