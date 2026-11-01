# Origem e direitos dos recursos visuais

**Estado: publicação ainda depende de comprovação de direitos.** A revisão identificou 133 arquivos visuais/fontes na árvore auditada. Eles estão relacionados individualmente, com SHA-256, grupo, titular, licença e evidência, no [inventário](inventario.json). Campos não comprovados ficam nulos e com status `pending`; não constituem autorização de uso.

| Grupo | Arquivos | Evidência disponível e limite |
| --- | ---: | --- |
| identidade | 42 | Logo, folhas, molduras e flores existentes no projeto; autoria e termos ainda não comprovados por documento de licença. |
| fauna | 3 | Pranchas de fauna recebidas pelo projeto; nomes e dimensões registrados na documentação. |
| fonte | 1 | Tabela name da fonte: Original bitmap alphabet created for Intuição, 2026. Metadado não substitui declaração de titularidade/licença. |
| sintonia | 6 | Atlas extraídos de arquivos fornecidos ao projeto; fontes e SHA-256 registrados. Inclui os PNGs incorporados nos SVGs. |
| acessorios | 33 | Acessórios e variantes de paleta preservados na documentação; falta autorização explícita de redistribuição. |
| galeria | 11 | Capturas do site em 2026-11-01. O direito de fazer a captura não resolve os direitos dos elementos retratados. |
| documentacao | 37 | Capturas e diagramas de evidências técnicas. Verificar autoria e recursos retratados antes da publicação. |

## Material de terceiro com termos identificados

O contorno do Brasil em [fauna-range-map.mjs](../../dist/fauna-range-map.mjs) é atribuído ao Natural Earth. Os [termos oficiais](https://www.naturalearthdata.com/about/terms-of-use/), consultados em 2026-11-01, colocam seus dados vetoriais e raster em domínio público. A referência já existente foi preservada. Isso não cobre as ilustrações de animais, a marca ou a fonte do Intuição.

## Como concluir a autorização

Para cada grupo ou arquivo, o titular deve informar quem criou o recurso, a fonte original e a permissão de redistribuição. Se for criação própria, registrar essa declaração e a licença escolhida; se houver encomenda, colaboração ou material de terceiro, anexar ou referenciar o contrato/licença aplicável, sem dados pessoais desnecessários. Uma planilha de procedência ou a posse de um PNG não prova cessão de direitos.

Depois da comprovação, preencher `rightsHolder`, `license` e `permissionEvidence` e mudar o status para `cleared`. Não marcar como liberado apenas para passar na verificação. O código e os textos autorais permanecem sob a [MIT](../../LICENSE); a inclusão de recursos nesta tabela não altera suas licenças.

```bash
node scripts/check-assets.mjs
node scripts/check-assets.mjs --release
```

O primeiro comando valida cobertura e integridade do inventário, permitindo pendências explícitas durante o desenvolvimento. O segundo **falha enquanto houver permissões pendentes**. Nenhum deles altera a visibilidade do GitHub.

## Histórico e substituições

Há 16 caminhos visuais antigos ausentes da árvore atual, listados em [arquivos históricos](arquivos-historicos.json). As versões anteriores dos arquivos atuais também continuam no Git. Corrigir apenas `main` não autoriza nem remove versões antigas.

Se não for possível obter permissão para algum material, escolher substituição e testar os recortes, dimensões e consumidores. Para evitar divulgar o material antigo, considerar uma cópia pública com histórico novo e manter o original privado. Não reescrever ou apagar o histórico sem um plano aprovado.

As 11 imagens ilustrativas dos jogos permanecem no README. A arte do jogo foi preservada durante esta preparação.
