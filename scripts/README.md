# Ferramentas de documentação

## Verificar links locais

```bash
node scripts/check-docs.mjs
```

O verificador usa [docs-manifest.json](docs-manifest.json) e funciona a partir de qualquer diretório. Ele confirma a existência de documentos e destinos de links Markdown locais da documentação nova. Ignora blocos de código e não testa URLs externas, fragmentos de seção, contratos do jogo ou qualidade da escrita.

Ao criar um novo documento mantido por esta organização, inclua seu caminho no manifesto. Relatórios antigos ficam fora deste recorte porque podem depender de caminhos e commits históricos; isso não os declara válidos nem inválidos.

## Workflows

O workflow documental executa este comando em pull requests e em pushes para main e export/github-organizado. O workflow de motores roda em PRs, pushes para main e disparos manuais, somente nos cinco arquivos indicados no [guia de testes](../tests/README.md). O workflow de segurança verifica segredos no histórico e a integridade do [inventário visual](../docs/recursos/README.md). Nenhum publica o site.

## Conferir recursos visuais

`node scripts/check-assets.mjs` verifica cobertura, hashes e campos do inventário. `node scripts/check-assets.mjs --release` também exige permissões documentadas; deve falhar enquanto houver pendências. Isso não constitui validação jurídica.

Não existe aqui o runner `scripts/test.mjs` da revisão externa f0e7fcf. Ele só deve ser incorporado junto da revisão real e de seu manifesto.
