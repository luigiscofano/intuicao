# Ferramentas de documentação

## Verificar links locais

```bash
node scripts/check-docs.mjs
```

O verificador usa [docs-manifest.json](docs-manifest.json) e funciona a partir de qualquer diretório. Ele confirma a existência de documentos e destinos de links Markdown locais da documentação nova. Ignora blocos de código e não testa URLs externas, fragmentos de seção, contratos do jogo ou qualidade da escrita.

Ao criar um novo documento mantido por esta organização, inclua seu caminho no manifesto. Relatórios antigos ficam fora deste recorte porque podem depender de caminhos e commits históricos; isso não os declara válidos nem inválidos.

## Workflows

O workflow documental executa este comando em pull requests e em pushes para main e export/github-organizado. O workflow de motores é manual e roda somente os cinco arquivos indicados no [guia de testes](../tests/README.md). Nenhum publica o site.

Não existe aqui o runner `scripts/test.mjs` da revisão externa f0e7fcf. Ele só deve ser incorporado junto da revisão real e de seu manifesto.
