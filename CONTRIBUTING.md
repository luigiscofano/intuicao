# Como contribuir

O repositório é privado. O código e a documentação autorais são disponibilizados sob a [licença MIT](LICENSE), com Copyright (c) 2026 Luigi Scofano de Araujo. Recursos visuais e materiais de terceiros seguem os direitos descritos no [guia dos recursos](dist/platform-assets/README.md). Este guia organiza o trabalho dos colaboradores autorizados.

## Antes de editar

Leia o [README](README.md), o [manual do jogo](docs/jogos/README.md) e o estado de [qualidade](docs/qualidade/README.md). Confirme a branch-base e rode `git status --short`. Não misture esta preparação com uma cópia do site hospedado.

## Branches

Use nomes descritivos: `docs/<assunto>`, `fix/<defeito>`, `feat/<funcionalidade>`, `test/<contrato>` ou `ci/<verificacao>`. Uma branch deve resolver um problema que possa ser revisado como unidade. Preserve branches históricas desta preparação até concluir a integração.

```bash
git switch main
git switch -c docs/exemplo-de-melhoria
```

O exemplo pressupõe que `main` já contém a base desejada. Nesta entrega local, `main` ainda aponta ao baseline; a visão consolidada está em `export/github-organizado`.

## Commits

Escreva mensagens sobre a alteração concreta: `fix: preservar identidade de save ao normalizar` ou `docs: explicar centro de massa no PRUMO`. Não reescreva commits anteriores para simular outra sequência de trabalho. Evite juntar formatação extensa com correção de regra.

## Pull requests

Explique problema, comportamento final, arquivos relevantes, validação e limites. Se o PR depende de outro, indique a dependência e revise o diff depois do merge anterior. Anexe evidência visual apenas quando ajuda a avaliar uma mudança visual e sem expor progresso ou informações pessoais.

Não transforme um teste histórico que falha em um teste verde apagando sua asserção. Documente a mudança de contrato ou corrija a implementação. Não declare que uma verificação foi feita se ela apenas está planejada.

## Regras de implementação

- Mantenha regra separada de renderização e persistência.
- Prefira nomes claros e funções com responsabilidade definida.
- Escreva comentários em português quando explicarem uma decisão ou invariante.
- Preserve IDs, histórico de saves e limites de busca.
- Não inclua credenciais, dumps de dados pessoais, dependências vendorizadas sem necessidade ou saídas temporárias.

## Revisão e integração

Consulte o [plano de PRs](docs/github/README.md). Para preservar commits e rastreabilidade, use merge commit nesta primeira importação. Publicação do site é uma ação separada do merge no GitHub.
