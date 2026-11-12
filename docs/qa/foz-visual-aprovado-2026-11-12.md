# FOZ: água nos canais e AIIJ Mosaico de correntes

## Aprovação e escopo

Em 12/11/2026, Luigi escolheu a alternativa 3 e autorizou aplicar a área de jogo e a AIIJ no site e no GitHub. A arte é uma composição vetorial original em código, sem imagens de terceiros ou animais. O PNG RGBA e o SVG fonte são incluídos no projeto sob os termos da licença MIT do repositório. O PNG publicado corresponde exatamente ao arquivo da alternativa aprovada.

Só cinco arquivos de distribuição mudam: o renderizador FOZ, a classe condicional e a regra CSS da AIIJ no shell, mais os dois arquivos da arte. O cabeçalho mantém o espaço e as larguras responsivas existentes. Outras rotas mantêm suas artes. Os canais têm as duas faixas de água aprovadas e nenhum traço branco. Células, pinos, pistas, setas, coordenadas, foco e textos são preservados.

## Bases separadas

- Site: versão publicada 206, com seus geradores procedurais preservados. A versão salva 207 de azulejos PNG não foi incorporada.
- GitHub: PR #61 (`3c0609db77b66aa27d4d61753e7db7f438b14ba9`), sem incorporar os geradores ainda não publicados no GitHub nem a PR #62 de azulejos. Este PR não integra a cadeia à main.

## Verificações

O teste `tests/foz-visual-approved.test.mjs` compara integralmente a distribuição fora do escopo, o renderizador anterior e o shell, e verifica 160 estados das 80 fases. Decodifica o PNG em Node para confirmar dimensões, hash aprovado, canal alfa real e transparência nos quatro cantos. As asserções de escopo de entregas anteriores foram vinculadas aos respectivos commits históricos, pois compará-las à árvore atual impediria qualquer nova funcionalidade. Seus conteúdos continuam verificados; o escopo completo desta entrega é protegido pelo novo teste.

O relatório final registra os resultados efetivamente executados e os limites de navegador. A aprovação do design e estes testes não certificam ausência de defeitos nem representam teste físico de dispositivos.

### Resultados executados

- GitHub, execução local dos três grupos de testes do workflow: 95 + 462 + 106 = 663 testes aprovados, zero falhas. A verificação do índice de conquistas também passou. Estes números não representam execução de toda a suíte histórica do repositório.
- Site v206 + FOZ: 141 testes aprovados, cobrindo lógica, visual FOZ, shell, backup e ajuste do tabuleiro.
- Navegador local, desktop: AIIJ correta, setas preservadas após recarregamento, desfazer/refazer, confirmação de reinício e verificação de tentativa parcial. Modo Sem parar abriu com os canais novos e 60 conexões em desafio Modo Sábio. Ao mudar para PULSO, a AIIJ FOZ saiu e os oito azulejos originais reapareceram.
- Responsividade: app real em iframe de 390 × 844 px (375 px úteis, após a barra de rolagem), com fases 1 e 80. Largura de rolagem igual à largura útil, sem transbordamento horizontal. AIIJ com 184 px de largura, canais, pistas, setas e foz legíveis. Não houve teste em aparelho físico. O arquivo de QA temporário foi removido.
- O código da mecânica, fases, armazenamento e geradores é idêntico à respectiva base. Não se afirma que todas as 80 fases foram resolvidas manualmente.
