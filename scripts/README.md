# Ferramentas de documentação

## Verificar links locais

<details>
<summary>Expandir Verificar links locais</summary>

```bash
node scripts/check-docs.mjs
```

O verificador usa [docs-manifest.json](docs-manifest.json) e funciona a partir de qualquer diretório. Ele confirma a existência de documentos e destinos de links Markdown e atributos HTML `src`/`href` locais. Também inclui todos os READMEs e verifica a capitalização exata dos caminhos, mesmo no Windows. Ignora blocos de código e não testa URLs externas, fragmentos de seção, contratos do jogo ou qualidade da escrita.

Ao criar um novo documento mantido por esta organização, inclua seu caminho no manifesto. Relatórios antigos ficam fora deste recorte porque podem depender de caminhos e commits históricos; isso não os declara válidos nem inválidos.


</details>

## Workflows

<details>
<summary>Expandir Workflows</summary>

O workflow documental executa este comando em pull requests e em pushes para main e export/github-organizado. O workflow de motores roda em PRs, pushes para main e disparos manuais, somente nos cinco arquivos indicados no [guia de testes](../tests/README.md). O workflow de segurança verifica segredos no histórico e a integridade do [inventário visual](../docs/recursos/README.md). Nenhum publica o site.


</details>

## Conferir recursos visuais

<details>
<summary>Expandir Conferir recursos visuais</summary>

`node scripts/check-assets.mjs` verifica cobertura, hashes e campos do inventário. `node scripts/check-assets.mjs --release` também exige declarações/licenças documentadas; deve falhar enquanto houver pendências. O registro de autoria não concede licença aberta às artes. Isso não constitui validação jurídica.

Não existe aqui o runner `scripts/test.mjs` da revisão externa f0e7fcf. Ele só deve ser incorporado junto da revisão real e de seu manifesto.


</details>

## Regressão de imagens no GitHub

<details>
<summary>Expandir Regressão de imagens no GitHub</summary>

Execute `node --test tests/doc-links.test.mjs`. O GitHub pode apresentar `.github/README.md` como página inicial: nessa pasta, os arquivos de `dist/` precisam do prefixo `../`. Imagens HTML passam pela mesma validação de caminhos que as imagens Markdown.

</details>

