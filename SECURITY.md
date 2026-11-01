# Segurança

O Intuição é uma aplicação estática em desenvolvimento. O código em `main` recebe manutenção; snapshots e branches históricos são evidências, não versões com suporte de segurança garantido.

## Comunicar uma vulnerabilidade

Não publique tokens, dados pessoais, saves reais ou instruções de exploração com dados sensíveis em issues, PRs ou comentários públicos. O canal privado está habilitado: abra [Security](https://github.com/luigiscofano/intuicao/security) → **Report a vulnerability**. Se ele estiver indisponível, utilize um canal privado já estabelecido com o mantenedor; não abra uma issue pública para enviar o conteúdo confidencial.

Inclua a revisão afetada, passos mínimos de reprodução com dados fictícios, impacto e eventual correção. Não há prazo de resposta ou programa de recompensa garantidos.

## Prevenção

- Nunca inclua credenciais no JavaScript servido ao navegador, em arquivos de configuração, imagens, relatórios ou exemplos. Tudo em `dist/` pode ser lido por quem acessa a aplicação.
- Use fixtures sintéticas; não versione arquivos `.env`, chaves privadas, bancos ou backups pessoais.
- Revise alertas do Gitleaks e do Dependabot. Uma CI verde não certifica ausência de vulnerabilidades.
- Credencial exposta deve ser revogada ou rotacionada primeiro; apagar o arquivo ou tornar o repositório privado não invalida cópias existentes.
- Alterações de histórico precisam de um plano específico, backup e análise dos PRs e clones afetados.

Veja a [auditoria de preparação](docs/seguranca/README.md) e o [controle dos recursos visuais](docs/recursos/README.md).
