# Intuição

#### Video Demo: ainda não gravado — não há URL de vídeo

Laboratório educativo estático com três minigames: **Equilíbrio**, **Reflexos** e **Corte certo**. Esta é uma implementação de referência produzida com OpenAI/Codex a partir do escopo aprovado por Luigi. Não é apresentada como trabalho individual autoral do estudante nem como uma submissão concluída ao CS50.

## Seleção e curvas

Clicar em um jogo abre sua tela de seleção: squircles numerados, todos desbloqueados, estado atual/concluído e acesso separado ao modo livre. Nenhum nível começa automaticamente. Dentro de um nível, **Voltar à seleção** cancela a avaliação em andamento. O progresso permanece apenas durante a sessão.

Corte certo progride por retas, parábolas, ondas senoidais, cúbicas em S e uma etapa de síntese, cossenos e curvas quárticas, em 17 formas convexas. Não é um editor de curvas arbitrárias. Consulte [curvas e precisão](documentacao/CURVAS-E-PRECISAO.md) e a [tabela dos 100 níveis](documentacao/VERSOES-E-NIVEIS.md).

## Comece aqui

Baixe a pasta inteira preservando suas subpastas. O Drive armazena os arquivos, mas não executa o aplicativo. No terminal, dentro de `Intuicao`, execute:

```sh
python -m http.server 8766 --bind 127.0.0.1
```

No Windows, `py -m http.server 8766 --bind 127.0.0.1` também pode funcionar quando Python foi instalado com o launcher. Abra **http://127.0.0.1:8766/codigo/** no Chrome. Para encerrar, pressione Ctrl+C no terminal. Não abra o HTML diretamente via `file://`, porque o navegador pode bloquear a importação dos módulos. Não há instalação de pacotes, compilação ou conta de usuário. Python 3 é usado somente para servir os arquivos locais; não é um backend do jogo. Se a porta estiver ocupada, escolha outra, por exemplo 8767, e use a mesma porta na URL.

Para executar a suíte matemática, instale/use Node.js 18 ou posterior e execute, na mesma pasta:

```sh
node testes/tests.mjs
node testes/curves.test.mjs
node testes/balance.test.mjs
node testes/holes.test.mjs
node testes/light-levels.test.mjs
node testes/light-render.test.mjs
node testes/result-motion.test.mjs
```

## Índice do material

| Pasta ou arquivo | Conteúdo |
|---|---|
| [codigo/index.html](codigo/index.html) | Estrutura semântica, navegação e palco SVG |
| [codigo/style.css](codigo/style.css) | Identidade visual, estados de foco e layout responsivo |
| [codigo/app.mjs](codigo/app.mjs) | Estado, controles, desenho e interações |
| [codigo/math.mjs](codigo/math.mjs) | Torque, interseções, reflexão, recorte e áreas |
| [codigo/curves.mjs](codigo/curves.mjs) | Famílias de curvas, formas e recorte por faixas com cota de erro |
| [codigo/levels.mjs](codigo/levels.mjs) | Desafios, pistas e soluções usadas nos testes |
| [documentacao/VISAO-E-USO.md](documentacao/VISAO-E-USO.md) | Funcionalidades e manual de uso |
| [documentacao/ARQUITETURA.md](documentacao/ARQUITETURA.md) | Fluxo de dados e decisões técnicas |
| [documentacao/MATEMATICA.md](documentacao/MATEMATICA.md) | Regras, equações e tolerâncias |
| [documentacao/CREDITOS-E-IA.md](documentacao/CREDITOS-E-IA.md) | Origem, autoria, privacidade e uso de IA |
| [documentacao/CS50-E-ENTREGA.md](documentacao/CS50-E-ENTREGA.md) | Requisitos oficiais e pendências de entrega |
| [testes/tests.mjs](testes/tests.mjs) | Testes automatizados reproduzíveis |
| [testes/RELATORIO-QA.md](testes/RELATORIO-QA.md) | O que foi realmente executado, falhas corrigidas e limites |
| [apresentacao/ROTEIRO-VIDEO.md](apresentacao/ROTEIRO-VIDEO.md) | Plano para uma demonstração de até três minutos |

## Descrição do projeto

Intuição transforma três ideias matemáticas em situações nas quais a pessoa pode agir, observar e construir uma explicação. A experiência não exige cadastro, pontuação competitiva ou conhecimentos prévios de programação. O objetivo não é avaliar formalmente a aprendizagem: é oferecer um espaço pequeno e coerente de exploração, em que cada mudança tem um efeito visível e calculado. O mesmo painel apresenta o experimento, seus controles, um resultado numérico e uma explicação que pode ser expandida quando desejada.

No laboratório de equilíbrio, o usuário distribui massas ao longo de uma gangorra. O modo livre aceita até oito pesos, com massas e posições ajustáveis. Nos desafios, os níveis alternam 1, 2, 3, 4 ou todos os blocos móveis, com suportes fixos e pilhas. Isso cria uma progressão entre comparar dois torques e somar contribuições de vários corpos. O sistema calcula a soma de massa, gravidade e braço horizontal; portanto, um objeto leve distante do apoio pode compensar um objeto pesado próximo dele. A inclinação exibida é deliberadamente ilustrativa. Não há integração de velocidade, momento de inércia ou colisões: essas dimensões não são necessárias para comunicar equilíbrio estático e seriam um escopo diferente.

Em Reflexos, um raio parte de uma fonte e percorre segmentos até encontrar a superfície mais próxima. Espelhos redirecionam o raio, paredes o interrompem e um alvo circular sinaliza sucesso. A progressão chega de uma a oito reflexões, introduz divisórias com passagens e até dois espelhos opcionais de distração. No modo livre, a pessoa pode adicionar espelhos ou paredes, movê-los, variar ângulos e comprimentos, alterar a direção da fonte e deslocar o alvo. O limite de doze reflexões evita trajetórias intermináveis entre superfícies paralelas. O resultado depende das interseções geométricas; não há trajetórias prontas desenhadas para cada resposta.

Em Corte certo, uma curva transformável divide uma figura convexa. A área roxa precisa se aproximar de uma proporção-alvo, com tolerância inclusiva de ±3 pontos percentuais. Retângulo, quadrado, triângulo, pentágono, hexágono e octógono oferecem formas diferentes de raciocinar sobre a distribuição da área. A região resultante é obtida por recorte de polígono e a área é calculada pela fórmula do cadarço. Isso permite alterar continuamente orientação e deslocamento, sem estimativas baseadas na quantidade de pixels coloridos. Os cem desafios de corte têm soluções alcançáveis pelos próprios controles discretos da interface.

A implementação usa módulos JavaScript nativos, CSS e SVG, sem dependências externas. A matemática foi separada da interface para permitir testes sem abrir um navegador. As definições de níveis também ficam separadas, tornando mais simples revisar a progressão e provar que um desafio tem solução. O módulo de interface conserva os elementos de formulário enquanto o desenho muda, evitando perder o foco a cada ajuste. Sliders e campos numéricos oferecem alternativas ao arraste; botões e seletores nativos permitem uso por teclado. O layout muda para uma coluna em telas estreitas.

## Preparar → confirmar → observar

Em todos os jogos, inclusive no modo livre, **Confirmar resposta** avalia uma cópia da tentativa. Antes disso não há torque, inclinação indicadora, percentual real de área ou trajetória do raio. Os controles e a geometria mostram somente o que você está preparando. Qualquer edição apaga a avaliação anterior. Em Reflexos, o raio percorre segmentos a 500 unidades do palco por segundo e o resultado só aparece ao terminar. Com preferência de movimento reduzido, a avaliação confirmada é mostrada imediatamente. Reinício e troca de nível cancelam o percurso; disparos simultâneos ficam bloqueados.

Espelhos receberam moldura, superfície clara e brilho sutil. Níveis 5–10 introduzem distrações; nem todo espelho participa da solução. Cada corte declara os controles liberados: translação horizontal e vertical, rotação, amplitude, frequência e deslocamento normal. As restrições variam por nível. O quadrado branco move o centro e a alça dourada gira a curva; campos numéricos e setas do teclado oferecem alternativas. As tolerâncias continuam constantes.

## Refinamento da beta

O catálogo agora tem **100 níveis de Equilíbrio, 100 de Reflexos e 100 de Corte certo (300 no total)**, mantendo o modo livre. Espelhos têm alças circulares para rotação direta com mouse/Pointer; campos de ângulo permitem passos de 0,1°. O alvo aceita a entrada no disco verde visível de raio 22 antes de qualquer obstáculo. O corte aceita erro absoluto de até 3 pontos percentuais, inclusive nos limites.

Consulte [progressão, soluções e versões](documentacao/VERSOES-E-NIVEIS.md). A versão imediatamente anterior ao fluxo de confirmação está em [historico/BETA-30-NIVEIS-ANTES-CONFIRMACAO.zip](historico/BETA-30-NIVEIS-ANTES-CONFIRMACAO.zip). A beta original recuperável está em [historico/BETA-ORIGINAL-2026-10-23.zip](historico/BETA-ORIGINAL-2026-10-23.zip); extraia separadamente apenas para comparar ou restaurar. A versão atual é esta árvore de arquivos.

## Estado e limites

A versão anterior executada em TRIANT003 passou em **12.043 verificações**. A atualização com buracos passou em **12.349 verificações automatizadas** no ambiente de edição na nuvem, mas ainda não recebeu validação visual/interativa. Os três jogos foram usados no Chrome desktop e em viewport de 390 × 844. O relatório distingue testes matemáticos, interação e inspeção visual. Não houve teste em aparelho físico de toque ou auditoria completa com leitor de tela; portanto, não se declara certificação de acessibilidade. O progresso dura apenas enquanto a página estiver aberta e é reiniciado ao recarregar. O jogo não grava dados pessoais nem os envia à rede.

O vídeo ainda precisa ser produzido. Luigi deve estudar, revisar e adaptar o código, registrar suas próprias contribuições e confirmar as regras do curso antes de decidir qualquer entrega. Nenhum formulário, comando de submissão, publicação pública ou pedido de certificado foi executado. A pasta `Minhas entregas` foi preservada fora desta referência.

Backup imediatamente anterior: [historico/BETA-120-ANTES-PILHAS.zip](historico/BETA-120-ANTES-PILHAS.zip). Os outros ZIPs são históricos, não versões para misturar.

As 100 soluções de corte com coordenadas alcançáveis estão em [testes/solucoes-corte.json](testes/solucoes-corte.json), usadas por [testes/curves.test.mjs](testes/curves.test.mjs). São referências de teste; o jogo não as revela durante a preparação.

## Equilíbrio com pilhas

Consulte [regras, fórmulas e tabela dos 100 níveis](documentacao/EQUILIBRIO-E-PILHAS.md). [codigo/balance.mjs](codigo/balance.mjs) concentra dimensões, validação, pilhas e movimentos legais; [testes/balance.test.mjs](testes/balance.test.mjs) verifica os 100 percursos. Mesmo ponto empilha; triângulos nunca suportam outro bloco; somente o topo pode sair. As áreas têm escala comum de 180 unidades²/kg. Blocos fixos nunca são movidos indiretamente.


## Atualização: buracos nas formas

Trinta dos 100 níveis de Corte agora têm de um a três vazios, variados em posição e formato. Esses espaços não pertencem à área total útil nem às partes roxa e clara. A margem e a confirmação obrigatória foram preservadas. Consulte a seção de vazios na tabela de níveis e em CURVAS-E-PRECISAO.

Backup imediatamente anterior a esta mudança: [historico/BETA-210-ANTES-BURACOS.zip](historico/BETA-210-ANTES-BURACOS.zip). A versão corrente está nas pastas de código, testes e documentação. O preview já aberto no TRIANT003 não é atualizado automaticamente por esta cópia do Drive; baixe a versão nova e reinicie/recarregue o aplicativo conforme Comece aqui.


## Reflexos: 100 níveis (24/10/2026)

O catálogo atual tem 300 desafios: 100 por jogo. Em Reflexos há dez etapas, de uma a oito reflexões, com distrações opcionais e divisórias que bloqueiam atalhos e deixam aberturas para a rota correta. Espelhos medem 120 unidades e têm moldura mais fina; alças continuam grandes para facilitar o uso. A luz tem traço de 2,4 unidades e setas de direção. Cada impacto revela uma normal perpendicular pontilhada, com opacidade 24%, somente quando a luz chega após **Confirmar resposta**.

Paredes não são traços decorativos: sua espessura de 12 unidades participa da colisão, incluindo faces e extremidades. A mesma geometria gera o desenho. O alvo conserva o raio de tolerância de 22 unidades.

Veja [Reflexos e obstáculos](documentacao/REFLEXOS-E-OBSTACULOS.md) e [QA atual](testes/RELATORIO-QA.md). Backup anterior, já contendo os buracos: [BETA-210-COM-BURACOS-ANTES-REFLEXOS.zip](historico/BETA-210-COM-BURACOS-ANTES-REFLEXOS.zip). O Drive não atualiza automaticamente a cópia do Chrome local. Não há publicação nem sincronização de progresso.

## Vitória e nova tentativa

Todos os 300 níveis e o modo livre têm vitória específica de cada jogo e derrota rápida de 300 ms (tremor, borda vermelha e blur, sem texto visual) e somente após confirmação. Reflexos espera o percurso terminar. Respeitam movimento reduzido e não bloqueiam controles. Veja [animações de resultado](documentacao/ANIMACOES-DE-RESULTADO.md). São 24.565 verificações automatizadas aprovadas; a suíte nova usa DOM simulado, não navegador. A cópia local aberta no Chrome não é sincronizada automaticamente pelo Drive.

## Alças mais claras no Corte
Quadrado com quatro setas: mover curva. Círculo dourado com seta curva: girar. Círculo claro com duas setas: deslizar o corte. Legenda, dicas e foco identificam as ações liberadas. Detalhes: documentacao/CONTROLES-DO-CORTE.md.
