# Catálogo atual · 19 jogos

Numeração pública contínua, seguindo a ordem das categorias. Os IDs internos, links e registros de progresso não mudaram.

01. Reflexos
02. Corte certo
03. ELO
04. PRUMO
05. PACTO
06. SINTONIA
07. REPASSE
08. PULSO
09. FOZ
10. REFÚGIO
11. MIRANTE
12. RENOVO
13. DESVIO
14. BROTO
15. CERCO
16. MOSAICO
17. QUINHÃO
18. ESTALO
19. ACORDE

As contagens de revisões anteriores abaixo são históricas, não o catálogo ativo.

---

# Aplicação estática do Intuição

Esta pasta contém o código-fonte servido ao navegador. Embora se chame `dist`, ela é editável e versionada: não deve ser apagada como saída temporária de build.

## Executar

Na raiz do repositório, use `python3 -m http.server 8766 --bind 127.0.0.1 --directory dist`; no Windows, substitua `python3` por `py`. Abra http://127.0.0.1:8766/. Não é necessário instalar dependências npm.

## Como navegar

| Arquivo ou pasta | Papel |
| --- | --- |
| [index.html](index.html) | Estrutura inicial, categorias, contêineres e entradas de módulos |
| [app.mjs](app.mjs) | Integração principal dos experimentos e navegação |
| [collection-ui.mjs](collection-ui.mjs) | Interface compartilhada de ELO, PRUMO, PACTO e DESVIO |
| [sintonia/](sintonia/README.md) | Coordenação de comandos e mecanismos |
| [repasse/](repasse/README.md) | Retirada de peças e propagação de valores |
| [orbita/](orbita/README.md) | Anéis, ocupação e objetivos |
| [broto/](broto/README.md) | Plantios e estímulos |
| [cerco/](cerco/README.md) | Mobilidade e barreiras |
| [platform-assets/](platform-assets/README.md) | Recursos visuais e fonte |

Reflexos e Corte certo usam módulos no nível superior. ELO e PRUMO compartilham partes de geometria; PACTO utiliza o motor de símbolos. Os [manuais de cada jogo](../docs/jogos/README.md) apontam os arquivos específicos.

## Catálogo e histórico

O catálogo ativo tem 11 jogos: oito campanhas de 80 fases e três jogos Versus. Módulos e documentos com nomes de versões antigas continuam necessários para rastreabilidade e, em alguns casos, compatibilidade de saves. Não selecionar o catálogo somente por seu nome ou maior número de versão; acompanhe os imports da rota.

Este README substitui a antiga mistura de notas de entrega. O conteúdo anterior permanece no histórico Git: `git show 2354a3c:dist/README.md`. O [README principal](../README.md) apresenta o estado consolidado, sem tratar contagens históricas como atuais.
