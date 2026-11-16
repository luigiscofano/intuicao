<p align="center"><img src="../dist/platform-assets/intuicao-logo-azulejos.png" alt="Intuição: marca atual com azulejos" width="560"></p>

# Intuição

**Observar, experimentar e descobrir. Jogos de intuição, raciocínio lógico e estratégia com identidade brasileira.**

Projeto de **Luigi Scofano de Araujo**. O Intuição transforma relações abstratas em ações visíveis: orientar luz, equilibrar formas, conectar caminhos, organizar espaços e antecipar jogadas. A experiência combina regras próprias, explicações ilustradas e uma linguagem visual de azulejos, fauna e vegetação.

[Jogar no site público](https://luigiscofano.github.io/intuicao/) · [Código](https://github.com/luigiscofano/intuicao) · [Documentação](../docs/README.md) · [Instalação](../docs/setup/README.md) · [Contribuir](../CONTRIBUTING.md)

> **Catálogo conferido em 16/11/2026: 19 jogos ativos, sendo 12 campanhas e 7 Versus.** Documentos datados, PDFs e módulos retirados são preservados como histórico, não como anúncio de funcionalidades atuais. A referência é [game-catalog.mjs](../dist/game-catalog.mjs).

## Manuais visuais para impressão

Uma folha A4 para cada um dos **19 jogos**, com objetivo, exemplo ilustrado e controles essenciais. Os diagramas são didáticos, não capturas da interface; Pulso usa o modo **Normal**. A coleção não altera os jogos.

- [Baixar o PDF completo de 19 páginas](../docs/manuais-visuais-impressao/pdf/Intuicao_Manuais_Visuais_19_Jogos.pdf).
- [Abrir o índice, PDFs individuais e instruções de impressão](../docs/manuais-visuais-impressao/README.md).

<a href="../docs/manuais-visuais-impressao/pdf/08-pulso.pdf"><img src="../docs/manuais-visuais-impressao/png/08-pulso.png" width="360" alt="Amostra do manual A4 do Pulso Normal: objetivo, batidas e intervalos." /></a>


## Navegação

- [Proposta e objetivos](#proposta-e-objetivos)
- [Os 19 jogos](#os-19-jogos)
- [Galeria atual dos 19 jogos](#galeria-atual-dos-19-jogos)
- [Identidade visual e brasilidade](#identidade-visual-e-brasilidade)
- [Fauna, flora e objetos com função](#fauna-flora-e-objetos-com-funcao)
- [Experiência e acessibilidade](#experiência-e-acessibilidade)
- [Arquitetura e tecnologias](#arquitetura-e-tecnologias)
- [Executar e testar](#executar-e-testar)
- [Dados, segurança e publicação](#dados-segurança-e-publicação)
- [Dificuldades de engenharia](#dificuldades-de-engenharia)
- [Mapa da documentação](#mapa-da-documentação)

## Proposta e objetivos

O projeto aproxima aprendizado e jogo sem exigir que o jogador comece por uma explicação abstrata. Uma tentativa revela uma consequência; a próxima pode incorporar uma hipótese melhor. Os objetivos pedagógicos são explorar percepção espacial, relações lógicas, planejamento, reconhecimento de padrões e tomada de decisão. São **intenções de design**, não resultados de aprendizagem comprovados por pesquisa acadêmica.

A coleção procura manter três compromissos:

1. **Clareza:** regras próximas do tabuleiro, seleção de níveis consistente e controles identificáveis.
2. **Identidade coerente:** os jogos têm elementos próprios, mas pertencem ao mesmo universo.
3. **Preservação:** melhorias de apresentação não devem alterar regras, identidade das fases ou progresso salvo.

A curiosidade é o fio condutor. As referências brasileiras aparecem na fauna, nas plantas, nos frutos, nos nomes e nas composições geométricas. Não são uma justificativa para acrescentar enfeites onde o jogador precisa de precisão.

## Os 19 jogos

A numeração é editorial, de 01 a 19. Os IDs técnicos permanecem estáveis para não quebrar links e saves. A presença de uma pasta antiga não significa que aquele jogo continua disponível.

| Nº | Jogo | Família | Documentação |
|---:|---|---|---|
| 01 | Reflexos | Intuição | [Manual](../docs/jogos/reflexos/README.md) |
| 02 | Corte certo | Intuição | [Manual](../docs/jogos/corte/README.md) |
| 03 | ELO | Raciocínio lógico | [Manual](../docs/jogos/elo/README.md) |
| 04 | PRUMO | Raciocínio lógico | [Manual](../docs/jogos/prumo/README.md) |
| 05 | PACTO | Raciocínio lógico | [Manual](../docs/jogos/pacto/README.md) |
| 06 | SINTONIA | Raciocínio lógico | [Manual](../docs/jogos/sintonia/README.md) |
| 07 | REPASSE | Raciocínio lógico | [Manual](../docs/jogos/repasse/README.md) |
| 08 | PULSO | Raciocínio lógico | [Motor e campanha](../docs/jogos/pulso/README.md) |
| 09 | FOZ | Raciocínio lógico | [Motor e campanha](../docs/jogos/foz/README.md) |
| 10 | REFÚGIO | Raciocínio lógico | [Motor e campanha](../docs/jogos/refugio/README.md) |
| 11 | MIRANTE | Raciocínio lógico | [Motor e campanha](../docs/jogos/mirante/README.md) |
| 12 | RENOVO | Raciocínio lógico | [Motor e campanha](../docs/jogos/renovo/README.md) |
| 13 | DESVIO | Versus | [Manual](../docs/jogos/desvio/README.md) |
| 14 | BROTO | Versus | [Manual](../docs/jogos/broto/README.md) |
| 15 | CERCO | Versus | [Manual](../docs/jogos/cerco/README.md) |
| 16 | MOSAICO | Versus | [Implementação](../docs/jogos/mosaico/README.md) |
| 17 | QUINHÃO | Versus | [Implementação](../docs/jogos/quinhao/README.md) |
| 18 | ESTALO | Versus | [Implementação](../docs/jogos/estalo/README.md) |
| 19 | ACORDE | Versus | [Implementação](../docs/jogos/acorde/README.md) |

**Campanha e duelo não são a mesma experiência.** As campanhas oferecem níveis; os Versus trabalham com mapas, preparação de partida, turnos e vencedor. Não recebem Desafio diário nem Modo sem parar. Os detalhes de cada modo e seus limites estão nos respectivos manuais; modos contínuos não devem ser confundidos automaticamente com geração ilimitada de fases inéditas.

DIVISA, ÓRBITA, LASTRO, VAZANTE, ENLACE e DOBRA estão retirados do catálogo atual. Seus arquivos e registros continuam preservados. Veja a [retirada no código](../dist/retired-games.mjs) e o [registro histórico](../docs/README-historico-2026-11-16.md).

## A marca na biblioteca

![Biblioteca real com os 19 jogos em suas categorias](../docs/imagens/galeria-atual/home.png)

Captura real da biblioteca, 16/11/2026, sem cursor e sem dados pessoais. Os 19 jogos aparecem em suas categorias. A imagem mostra a interface existente naquela revisão, não um mockup. É a captura original utilizada na página do manual indicada pelo autor.

## Manual da marca

[Manual ilustrado em PDF, 45 páginas](../docs/identidade/manual/Intuicao_Manual_da_Marca_2026.pdf) · [Fontes, inventário e reprodução](../docs/identidade/manual/README.md).

![Capa do manual da marca](../docs/identidade/manual/capa.png)

## Galeria atual dos 19 jogos

Capturas reais do código versionado, abertas em navegador isolado com estado de demonstração. Não são mockups. Não usam dados pessoais, não alteram saves do usuário e não incluem o cursor. [Data, revisão, dimensões e limites da captura](../docs/imagens/galeria-atual/README.md). Clique na imagem para ampliar; cada título leva ao manual específico.

### 01 · Reflexos

Leve cada raio ao alvo da mesma cor e símbolo.

[![Área de jogo atual de Reflexos](../docs/imagens/galeria-atual/light.png)](../docs/imagens/galeria-atual/light.png)

[Objetivo, regras, controles e implementação](../docs/jogos/reflexos/README.md).

### 02 · Corte certo

Deixe no lado roxo a porcentagem pedida. Por exemplo: 50% é metade da figura.

[![Área de jogo atual de Corte certo](../docs/imagens/galeria-atual/cut.png)](../docs/imagens/galeria-atual/cut.png)

[Objetivo, regras, controles e implementação](../docs/jogos/corte/README.md).

### 03 · ELO

Coloque um ponto em cada região e forme um único caminho fechado.

[![Área de jogo atual de ELO](../docs/imagens/galeria-atual/elo.png)](../docs/imagens/galeria-atual/elo.png)

[Objetivo, regras, controles e implementação](../docs/jogos/elo/README.md).

### 04 · PRUMO

Pinte uma peça para cada apoio. Todas precisam se equilibrar sobre ele.

[![Área de jogo atual de PRUMO](../docs/imagens/galeria-atual/prumo.png)](../docs/imagens/galeria-atual/prumo.png)

[Objetivo, regras, controles e implementação](../docs/jogos/prumo/README.md).

### 05 · PACTO

Forme duplas iguais e deixe dois de cada símbolo em toda linha e coluna.

[![Área de jogo atual de PACTO](../docs/imagens/galeria-atual/pacto.png)](../docs/imagens/galeria-atual/pacto.png)

[Objetivo, regras, controles e implementação](../docs/jogos/pacto/README.md).

### 06 · SINTONIA

Leve todos os animais aos seus destinos ao mesmo tempo.

[![Área de jogo atual de SINTONIA](../docs/imagens/galeria-atual/sintonia.png)](../docs/imagens/galeria-atual/sintonia.png)

[Objetivo, regras, controles e implementação](../docs/jogos/sintonia/README.md).

### 07 · REPASSE

Retire todas as peças e faça cada caixa da borda receber o valor exato da meta.

[![Área de jogo atual de REPASSE](../docs/imagens/galeria-atual/repasse.png)](../docs/imagens/galeria-atual/repasse.png)

[Objetivo, regras, controles e implementação](../docs/jogos/repasse/README.md).

### 08 · PULSO

Coloque três marcas por linha, com o mesmo espaço entre elas, e acerte as quantidades das colunas.

[![Área de jogo atual de PULSO](../docs/imagens/galeria-atual/pulso.png)](../docs/imagens/galeria-atual/pulso.png)

[Objetivo, regras, controles e implementação](../docs/jogos/pulso/README.md).

### 09 · FOZ

Faça todos os caminhos de água chegarem à foz, o ponto marcado com 0.

[![Área de jogo atual de FOZ](../docs/imagens/galeria-atual/foz.png)](../docs/imagens/galeria-atual/foz.png)

[Objetivo, regras, controles e implementação](../docs/jogos/foz/README.md).

### 10 · REFÚGIO

Separe o espaço em refúgios. Cada um precisa ter um único marco.

[![Área de jogo atual de REFÚGIO](../docs/imagens/galeria-atual/refugio.png)](../docs/imagens/galeria-atual/refugio.png)

[Objetivo, regras, controles e implementação](../docs/jogos/refugio/README.md).

### 11 · MIRANTE

Coloque as formas para que cada seta da borda veja primeiro a forma pedida.

[![Área de jogo atual de MIRANTE](../docs/imagens/galeria-atual/mirante.png)](../docs/imagens/galeria-atual/mirante.png)

[Objetivo, regras, controles e implementação](../docs/jogos/mirante/README.md).

### 12 · RENOVO

Ligue semente, botão e folha em trios, sem cruzar as linhas.

[![Área de jogo atual de RENOVO](../docs/imagens/galeria-atual/renovo.png)](../docs/imagens/galeria-atual/renovo.png)

[Objetivo, regras, controles e implementação](../docs/jogos/renovo/README.md).

### 13 · DESVIO

Deixe o adversário sem casa disponível para escolher.

[![Área de jogo atual de DESVIO](../docs/imagens/galeria-atual/desvio.png)](../docs/imagens/galeria-atual/desvio.png)

[Objetivo, regras, controles e implementação](../docs/jogos/desvio/README.md).

### 14 · BROTO

Faça suas sementes florescerem. Vence quem colher mais flores nas duas rodadas.

[![Área de jogo atual de BROTO](../docs/imagens/galeria-atual/broto.png)](../docs/imagens/galeria-atual/broto.png)

[Objetivo, regras, controles e implementação](../docs/jogos/broto/README.md).

### 15 · CERCO

Feche os caminhos do rival sem deixar suas próprias peças presas.

[![Área de jogo atual de CERCO](../docs/imagens/galeria-atual/cerco.png)](../docs/imagens/galeria-atual/cerco.png)

[Objetivo, regras, controles e implementação](../docs/jogos/cerco/README.md).

### 16 · MOSAICO

Gire e coloque azulejos para formar encontros com mais cantos da sua cor.

[![Área de jogo atual de MOSAICO](../docs/imagens/galeria-atual/mosaico.png)](../docs/imagens/galeria-atual/mosaico.png)

[Objetivo, regras, controles e implementação](../docs/jogos/mosaico/README.md).

### 17 · QUINHÃO

Ofereça três cestos. O rival fica com um, e você recebe os outros dois.

[![Área de jogo atual de QUINHÃO](../docs/imagens/galeria-atual/quinhao.png)](../docs/imagens/galeria-atual/quinhao.png)

[Objetivo, regras, controles e implementação](../docs/jogos/quinhao/README.md).

### 18 · ESTALO

Abra todas as suas vagens antes do rival, planejando a sequência das setas.

[![Área de jogo atual de ESTALO](../docs/imagens/galeria-atual/estalo.png)](../docs/imagens/galeria-atual/estalo.png)

[Objetivo, regras, controles e implementação](../docs/jogos/estalo/README.md).

### 19 · ACORDE

Recolha sinos até formar um par de cada um de três símbolos diferentes.

[![Área de jogo atual de ACORDE](../docs/imagens/galeria-atual/acorde.png)](../docs/imagens/galeria-atual/acorde.png)

[Objetivo, regras, controles e implementação](../docs/jogos/acorde/README.md).

## Identidade visual e brasilidade

### Marca atual

A marca de azulejos substitui a antiga planta na apresentação do site. O lettering é preservado; a assinatura geométrica usa verde, amarelo e azul profundo. O PNG tem transparência e a proporção original deve ser mantida, sem esticar o desenho.

[Arquivo de produção](../dist/platform-assets/intuicao-logo-azulejos.png) · [Registro da marca](../docs/identidade/logo-site/README.md) · [Guia visual](../docs/identidade/README.md)

### Terra e Mata: cor com função

![Paleta da identidade e das dificuldades](../docs/imagens/identidade/paleta.svg)

| Papel | Cor de referência | Intenção |
|---|---|---|
| Verde estrutural | `#30412F` | Texto, estrutura e vínculo com a vegetação |
| Verde de destaque | `#39654C` | Ação e estados positivos |
| Amarelo ocre | `#CCA034` | Ênfase, luz e detalhes dos azulejos |
| Azul profundo | `#244B63` | Contraponto frio, foco e navegação |
| Papel quente | `#F4EDDD` | Base acolhedora que não compete com os tabuleiros |
| Superfície clara | `#FFFAF0` | Leitura e controles |

Os valores são referências presentes no código, não uma declaração de que toda folha CSS usa exclusivamente seis cores. A cascata de [Terra e Mata](../dist/terra-mata.css), [coesão](../dist/cohesion.css) e estilos específicos define a aparência final. Um ajuste deve ser conferido na tela, não apenas pelo primeiro valor encontrado.

### Azulejos, fauna e AIIJs

Os azulejos combinam peças geométricas e recortes transparentes. Em vez de fundos brancos colados sobre a interface, deixam a superfície aparecer. A geometria se repete na marca e em detalhes para construir continuidade.

<p><img src="../dist/platform-assets/tiles/green-tl.png" width="76" alt="Azulejo verde transparente"> <img src="../dist/platform-assets/tiles/gold-tl.png" width="76" alt="Azulejo amarelo transparente"> <img src="../dist/platform-assets/tiles/blue-br.png" width="76" alt="Azulejo azul transparente"></p>

**AIIJ** significa **Arte de Ilustração Individual do Jogo**. Cada composição introduz o tema sem substituir a leitura das peças. Água e canais em FOZ, folhas em REFÚGIO e crescimento em RENOVO vinculam o desenho ao raciocínio exigido.

| FOZ | MIRANTE | RENOVO |
|---|---|---|
| ![AIIJ de FOZ](../dist/platform-assets/foz-aiij-mosaico.png) | ![AIIJ de MIRANTE](../dist/platform-assets/mirante-aiij-a.png) | ![AIIJ de RENOVO](../dist/platform-assets/renovo-aiij-c1.png) |

São **artes reais versionadas**, não capturas de uma página nem promessas de novos recursos. Os 15 mascotes têm referências e sprites próprios; consulte o [catálogo de fauna](../docs/sintonia-sprites/README.md) e a [proveniência dos recursos](../docs/recursos/README.md). Preservar silhueta e proporção é mais importante que redesenhar um animal a cada tela.

Os cinco tabuleiros de Raciocínio lógico compartilham a assinatura de azulejos nos cantos superior direito e inferior esquerdo, integrada em 16/11/2026. [Escopo e verificações](../docs/qualidade/assinaturas-tabuleiros.md).

### Tipografia

O sistema aprovado combina **Literata** nos títulos e **Source Sans 3** na interface. Ambas são carregadas de arquivos locais WOFF2. A marca permanece imagem, sem reconstrução improvisada do lettering. Números tabulares ajudam placares e contadores a manter estabilidade visual.

Fontes de verdade: [typography.css](../dist/typography.css) e [fontes locais](../dist/assets/fonts/README.md). A fonte pixel existente é um recurso específico/histórico, não a fonte universal da interface.

### Dificuldade não é cor decorativa

A graduação visual remete à progressão de faixas do jiu-jítsu, adaptada à estética cerâmica: cinza representando a faixa branca, azul, roxo, marrom, preto e vermelho. Os nomes permanecem visíveis para não depender apenas da cor.

| Faixa | Cor |
|---|---|
| Básico | cinza `#7B817A` |
| Aprendiz | azul `#285D7C` |
| Intermediário | roxo `#725580` |
| Avançado | marrom `#805D43` |
| Mestre | preto `#2C302D` |
| Modo Sábio | vermelho `#A7443D` |

A [paleta compartilhada](../dist/difficulty-palette.mjs) deriva a graduação do nome, não da posição do grupo. A dificuldade é editorial; certificação de uma solução não equivale a calibração com jogadores.

## Fauna, flora e objetos com função

A brasilidade não depende de espalhar símbolos decorativos. Ela aparece no repertório de animais, frutos e plantas, nos azulejos e no vocabulário de cada desafio. A função vem antes do ornamento: reconhecer uma equipe, distinguir uma peça, indicar uma região ou explicar um objetivo. Essas relações são decisões do projeto; não atribuímos uma origem histórica específica a um padrão sem documentação.

### Quinze mascotes institucionais

![Prancha original dos mascotes de frente](../dist/platform-assets/fauna-green-original.png)

*Prancha de origem usada pelo catálogo institucional. Não é uma captura da interface nem uma versão alternativa criada para este README.*

- **Tuiuiú** — ID técnico `tuiuiu`.
- **Capivara** — ID técnico `capivara`.
- **Bem-te-vi** — ID técnico `bemtevi`.
- **Mico** — ID técnico `mico`.
- **Mico-leão-dourado** — ID técnico `micoLeao`.
- **Tatu-bola** — ID técnico `tatu`.
- **Onça-pintada** — ID técnico `onca`.
- **Lobo-guará** — ID técnico `lobo`.
- **Cobra-coral** — ID técnico `coral`.
- **Jacaré-do-papo-amarelo** — ID técnico `jacare`.
- **Arara-azul** — ID técnico `arara`.
- **Peixe-boi-da-Amazônia** — ID técnico `peixeBoi`.
- **Piranha-vermelha** — ID técnico `piranha`.
- **Tucano-toco** — ID técnico `tucano`.
- **Tamanduá-bandeira** — ID técnico `tamandua`.

[Coordenadas e arquivos originais](../dist/fauna-art.mjs) separam frente, perfil e sprite sem trocar a identidade do animal. [Nomes, descrições e fontes](../dist/fauna-info-content.mjs) sustentam a janela de mascotes. [Informações culturais](../dist/fauna-culture-content.mjs) complementam a leitura; a representação ilustrada não é uma prancha de identificação científica.

| Frente | Perfil |
|---|---|
| ![Frente](../dist/platform-assets/fauna-green-original.png) | ![Perfil](../dist/platform-assets/fauna-side-original.png) |

### Sintonia: personagem como parte da regra

Um comando é compartilhado por vários animais. A identidade visual ajuda a acompanhar **quem se moveu, quem ficou bloqueado e quem chegou ao destino**, sem mudar a regra de movimento. Os arquivos de Sintonia não devem ser confundidos com a prancha institucional acima: são conjuntos relacionados, com recortes e proveniência próprios.

| Atlas atual | Roster atual |
|---|---|
| ![Atlas original embutido no SVG](../docs/imagens/manuais-visuais/sintonia-atlas-original.png) | ![Roster original embutido no SVG](../docs/imagens/manuais-visuais/sintonia-roster-original.png) |

*PNG original extraído byte a byte do SVG usado pelo código, sem redesenho nem recompressão. A prancha inteira é uma fonte de recortes, não o aspecto de uma única peça em tela.*

[Atlas](../dist/sintonia/assets/chibi-user-atlas.svg) · [Prancha de recortes](../dist/sintonia/assets/chibi-user-roster.svg) · [Fontes dos recortes](../docs/sintonia-sprites/roster-sources.json) · [Arte de Sintonia](../docs/sintonia-art.md).

O roster de recortes de Sintonia registra **16 silhuetas**, incluindo quati; isso não aumenta para 16 o catálogo institucional de 15 mascotes. Consulte os arquivos de origem antes de reutilizar uma contagem ou substituir uma arte. Acessórios também possuem [documentação específica](../docs/sintonia-approved-accessories-2026-11-01.md).

### Folhas, sementes, botões e flores

![Peças reais de Renovo em relação ilustrativa](../docs/imagens/manuais-visuais/renovo-trio.svg)

Em **RENOVO**, semente, botão floral e folha são três papéis distintos: cada botão deve ligar uma semente e uma folha em L. O diagrama reutiliza a [função real de desenho](../dist/logica/games/renovo/art.mjs), não uma imitação. A relação é uma metáfora: não simula a ordem de crescimento ou transporte de nutrientes.

Em **REFÚGIO**, as folhas identificam os marcos e a composição das regiões ajuda a ler a separação entre espaços. Em **BROTO**, sementes, brotos e flores têm consequência mecânica: o estímulo horizontal e vertical prepara a floração, que pontua para o dono da planta. [Silhuetas dos brotos](../dist/broto/piece-art.mjs) distinguem os donos sem depender somente de cor.

| Folha da identidade | Folha sálvia | Flor original |
|---|---|---|
| ![Folha](../dist/platform-assets/leaf.svg) | ![Folha sálvia](../dist/platform-assets/leaf-sage.svg) | ![Flor original](../dist/platform-assets/flower-green-original.png) |

Esses arquivos integram o acervo visual. Sua presença no repositório não significa que cada um seja exibido em todas as telas. Padrões, folhas e flores devem apoiar hierarquia e ritmo, nunca encobrir pistas ou substituir a regra.

### Frutos e partilha em Quinhão

![Três frutos desenhados pelas funções atuais](../docs/imagens/manuais-visuais/quinhao-frutos.svg)

**Castanha-do-pará, pitanga e jabuticaba** são os nomes usados no jogo. A arte é compartilhada entre tabuleiro e resultado por [fruit-art.mjs](../dist/versus/games/quinhao/fruit-art.mjs), mantendo o índice dos tipos e os saves existentes. Em vez de mera decoração, os três tipos formam combinações de pontuação. Veja o [manual de Quinhão](../docs/jogos/quinhao/README.md).

### Azulejos, ícones e ilustrações individuais

O azulejo funciona como assinatura recorrente: marca, dificuldade, cantos e celebração. A repetição cria parentesco; posição, escala e contraste precisam respeitar o conteúdo principal.

AIIJ significa **Arte de Ilustração Individual do Jogo**. Esta coleção reúne as **19 artes aprovadas** dos 19 jogos atuais, com links para os arquivos reais versionados. A ilustração introduz a identidade do jogo, não representa um botão, solução ou tabuleiro. As seis artes preexistentes foram preservadas e as treze novas composições foram aprovadas individualmente.

| Reflexos | Corte certo | ELO |
|---|---|---|
| [![AIIJ de Reflexos](../dist/platform-assets/light-aiij-aprovada.svg)](../dist/platform-assets/light-aiij-aprovada.svg) | [![AIIJ de Corte certo](../dist/platform-assets/cut-aiij-aprovada.svg)](../dist/platform-assets/cut-aiij-aprovada.svg) | [![AIIJ de ELO](../dist/platform-assets/elo-aiij-aprovada.svg)](../dist/platform-assets/elo-aiij-aprovada.svg) |

| PRUMO | PACTO | SINTONIA |
|---|---|---|
| [![AIIJ de PRUMO](../dist/platform-assets/prumo-aiij-aprovada.svg)](../dist/platform-assets/prumo-aiij-aprovada.svg) | [![AIIJ de PACTO](../dist/platform-assets/pacto-aiij-aprovada.svg)](../dist/platform-assets/pacto-aiij-aprovada.svg) | [![AIIJ de SINTONIA](../dist/platform-assets/sintonia-aiij-aprovada.svg)](../dist/platform-assets/sintonia-aiij-aprovada.svg) |

| REPASSE | PULSO | FOZ |
|---|---|---|
| [![AIIJ de REPASSE](../dist/platform-assets/repasse-aiij-aprovada.svg)](../dist/platform-assets/repasse-aiij-aprovada.svg) | [![AIIJ de PULSO](../dist/platform-assets/pulso-aiij-azulejo.svg)](../dist/platform-assets/pulso-aiij-azulejo.svg) | [![AIIJ de FOZ](../dist/platform-assets/foz-aiij-mosaico.svg)](../dist/platform-assets/foz-aiij-mosaico.svg) |

| REFÚGIO | MIRANTE | RENOVO |
|---|---|---|
| [![AIIJ de REFÚGIO](../dist/platform-assets/refugio-aiij-folhas.svg)](../dist/platform-assets/refugio-aiij-folhas.svg) | [![AIIJ de MIRANTE](../dist/platform-assets/mirante-aiij-a.svg)](../dist/platform-assets/mirante-aiij-a.svg) | [![AIIJ de RENOVO](../dist/platform-assets/renovo-aiij-c1.svg)](../dist/platform-assets/renovo-aiij-c1.svg) |

| DESVIO | BROTO | CERCO |
|---|---|---|
| [![AIIJ de DESVIO](../dist/assets/desvio-aiij.svg)](../dist/assets/desvio-aiij.svg) | [![AIIJ de BROTO](../dist/platform-assets/broto-aiij-aprovada.svg)](../dist/platform-assets/broto-aiij-aprovada.svg) | [![AIIJ de CERCO](../dist/platform-assets/cerco-aiij-aprovada.svg)](../dist/platform-assets/cerco-aiij-aprovada.svg) |

| MOSAICO | QUINHÃO | ESTALO |
|---|---|---|
| [![AIIJ de MOSAICO](../dist/platform-assets/mosaico-aiij-aprovada.svg)](../dist/platform-assets/mosaico-aiij-aprovada.svg) | [![AIIJ de QUINHÃO](../dist/platform-assets/quinhao-aiij-aprovada.svg)](../dist/platform-assets/quinhao-aiij-aprovada.svg) | [![AIIJ de ESTALO](../dist/platform-assets/estalo-aiij-aprovada.svg)](../dist/platform-assets/estalo-aiij-aprovada.svg) |

| ACORDE |
|---|
| [![AIIJ de ACORDE](../dist/platform-assets/acorde-aiij-aprovada.svg)](../dist/platform-assets/acorde-aiij-aprovada.svg) |

[Inventário completo, arquivos e critérios de uso](../docs/identidade/aiij/README.md). Cada manual individual também apresenta sua própria AIIJ.

Ícones de ação devem expressar função: voltar, desfazer, refazer, confirmar e informação. O [painel lateral](../dist/action-sidebar.mjs), os [ícones de navegação](../dist/game-nav-icons.mjs) e a [marca de conquistas](../dist/platform-assets/conquistas-selo-botanico.svg) são pontos de referência, não oportunidades para criar outra linguagem a cada tela.

### Manuais visuais

| Relação | Esquema |
|---|---|
| Três batidas e dois intervalos iguais | ![Pulso](../docs/imagens/manuais-visuais/pulso-intervalos.svg) |
| Uma barreira entre dois refúgios | ![Refúgio](../docs/imagens/manuais-visuais/refugio-contato.svg) |
| Estímulos de dois eixos | ![Broto](../docs/imagens/manuais-visuais/broto-eixos.svg) |

Os esquemas são **ilustrativos**, não screenshots nem soluções completas. As [regras por jogo](../docs/jogos/README.md) explicam condições que uma imagem isolada não mostra.

## Experiência e acessibilidade

- **Tabuleiro como protagonista:** dimensionamento e controles devem privilegiar a partida, sem saltos conforme textos variam.
- **Instruções em duas profundidades:** resumo e explicação expandida, acompanhados de exemplos animados.
- **Controles coerentes:** confirmar, desfazer, refazer e retornar preservam o contrato específico de cada jogo.
- **Resposta independente de cor:** rótulos, símbolos e indicadores ajudam a distinguir intenção e resultado.
- **Movimento:** preferência por movimento reduzido é tratada pelo [módulo compartilhado](../dist/motion-preference.mjs).
- **Teclado:** elementos interativos precisam manter nome acessível e foco visível.
- **Conquistas:** progresso e missões integram o backup; veja os [critérios documentados](../docs/conquistas/README.md).

A acessibilidade é um processo de verificação, não uma garantia absoluta de conformidade. A cobertura e suas limitações estão em [qualidade](../docs/qualidade/README.md) e [testes](../tests/README.md).

## Arquitetura e tecnologias

![Fluxo conceitual da aplicação](../docs/imagens/identidade/arquitetura.svg)

O site é uma **aplicação estática modular**. HTML, CSS, JavaScript ES Modules, SVG, PNG, JSON e fontes locais são servidos diretamente. Não há framework obrigatório, instalação npm ou backend de partidas nesta base.

> **Atenção:** `dist/` é código-fonte editável e versionado. Não apague como saída descartável de build.

| Camada | Entradas | Responsabilidade |
|---|---|---|
| Inicialização | [index.html](../dist/index.html), [app.mjs](../dist/app.mjs) | Composição e abertura |
| Catálogo | [game-catalog.mjs](../dist/game-catalog.mjs) | Ordem e índices públicos |
| Interface comum | [collection-ui.mjs](../dist/collection-ui.mjs), [action-sidebar.mjs](../dist/action-sidebar.mjs) | Controles sem redefinir regras |
| Motores | [Lógica](../dist/logica/README.md), [Versus](../dist/versus/README.md), pastas próprias | Ações válidas, transições e resultado |
| Conteúdo | Campanhas e catálogos de mapas | Definições, IDs e versões |
| Busca | Workers e serviços dos jogos | Análise com orçamento e cancelamento |
| Estado | [Backup](../dist/progress-backup.mjs), [proteção de gravação](../dist/progress-write-guard.mjs) | Persistência e restauração |
| Apresentação | CSS, SVG e assets | Desenho, layout e movimento |
| Ferramentas | [tools](../tools/README.md), [scripts](../scripts/README.md), [tests](../tests/README.md) | Geração offline, auditoria e regressão |

**JavaScript** executa jogos e verificações Node.js; **HTML/CSS** estruturam e apresentam; **SVG/PNG/WOFF2** fornecem arte e tipografia; **JSON** guarda definições e intercâmbio; **Python**, usado em ferramentas offline, não faz parte do runtime. [Arquitetura detalhada](../docs/arquitetura/README.md).

### Organização do código: fronteiras reais

A estrutura nasceu de famílias de jogos diferentes. Não se presume que todos passem pelo mesmo motor: Reflexos e Corte certo usam módulos da entrada; ELO, PRUMO e PACTO usam a coleção; Sintonia, Repasse, Broto e Cerco mantêm adaptadores próprios; cinco campanhas ativas compartilham a infraestrutura de `logica`; quatro duelos ativos usam a infraestrutura de `versus`. Módulos retirados continuam versionados e não devem reaparecer por uma enumeração de diretório.

| Responsabilidade | Código de referência | Contrato |
|---|---|---|
| Catálogo público | [game-catalog](../dist/game-catalog.mjs), [retired-games](../dist/retired-games.mjs) | ID estável e disponibilidade explícita; ordem editorial não é chave de save |
| Carregamento | [rota lógica](../dist/logica/route.mjs), [rota Versus](../dist/versus/route.mjs) | Importar sob demanda e invalidar respostas de uma tela abandonada |
| Definição do desafio | Campanhas e mapas dos jogos | Geometria, pistas, estoque e condições iniciais; não é a tentativa do usuário |
| Motor | [exemplo Renovo](../dist/logica/games/renovo/engine.mjs), [exemplo Quinhão](../dist/versus/games/quinhao/engine.mjs) | Aplicar ações e verificar estado segundo as regras, sem depender de decoração |
| Sessão | [lógica](../dist/logica/session.mjs), [Versus](../dist/versus/session.mjs), [coleção](../dist/collection-state.mjs) | Coordenar tentativa e histórico, sem alterar uma regra para atender ao layout |
| Apresentação | Views de cada jogo, CSS e módulos comuns | Renderizar o estado e encaminhar intenção; não declarar vitória pela animação |
| Persistência | [lógica](../dist/logica/storage.mjs), [Versus](../dist/versus/storage.mjs) | Validar envelope, versão e identidade antes de restaurar |
| Assistência | [serviço de busca](../dist/versus/search-service.mjs), [worker](../dist/versus/search-worker.mjs) | Limites de tempo/nós e cancelamento; uma busca parcial não prova unicidade |

### Fluxo de uma jogada

1. A interface traduz o clique, toque ou tecla em uma intenção específica do jogo.
2. A sessão consulta/aplica a regra apropriada; a definição do mapa não se confunde com seu estado atual.
3. O estado válido alimenta histórico, renderização e persistência conforme a família.
4. A condição de término é determinada pela regra. [Feedback de níveis](../dist/level-feedback.mjs) e [vitória](../dist/game-victory.mjs) apresentam o resultado; não substituem o motor.
5. Uma resposta atrasada de carregamento ou análise não deve reabrir uma tela abandonada. A rota lógica usa uma revisão para invalidar esse retorno.

### Estruturas de dados e desfazer/refazer

O histórico da coleção usa `{ past, present, future }`, com cópias estruturadas e limite de 300 estados anteriores. Uma alteração nova limpa o futuro; desfazer e refazer movem o cursor lógico sem redefinir pistas. Essa é uma implementação específica de [collection-state.mjs](../dist/collection-state.mjs), não uma promessa de que todas as famílias armazenam a mesma estrutura.

A família lógica usa `intuicao.logica.v1`: jogos, conclusões por ID/versão, sessões e última visualização. A normalização limita tamanho, quantidade de sessões e campos reconhecidos; a restauração ainda passa pelo motor da fase. Versus guarda ações e cursor para reproduzir a partida. [Contrato detalhado](../dist/versus/CONTRACT.md).

### Persistência e importação segura

O [backup](../dist/progress-backup.mjs) reconhece um formato próprio e versões de envelopes; limita o arquivo a 16 MiB e registros a 8 MiB. Chaves históricas podem ser preservadas mesmo quando o jogo sai do catálogo. Não confundir guardar um save com publicar novamente o jogo.

[progress-write-guard](../dist/progress-write-guard.mjs) compara uma revisão de restauração e pode congelar gravações, impedindo uma aba antiga de sobrescrever o estado recém-importado. Isso não é autenticação, sincronização de conta nem proteção contra edição deliberada do armazenamento local.

### Geração, importação de fases e provas

Campanhas versionadas, mapas de duelo e desafios gerados são camadas distintas. [endless-collection](../dist/endless-collection.mjs) usa geração determinística com semente, limites e validação pela regra. Encontrar uma resposta conhecida **não** equivale a provar resposta única. [collection-json](../dist/collection-json.mjs) valida tipos, faixas e identidade de fases importadas; o worker mantém o processamento separado da interação principal quando aplicável.

As ferramentas em [tools](../tools/README.md) e os relatórios certificados guardam geração/auditoria offline. O navegador não precisa executar todos esses programas para abrir o site. Fases não devem ser alteradas silenciosamente mantendo a mesma identidade quando isso invalidar o progresso salvo.

### Qualidade, distribuição e limites

Os testes de motores verificam regras; testes de histórico/backup verificam preservação; testes de DOM/CSS verificam contratos da interface. Capturas e testes estruturais não são equivalentes a uma auditoria completa de acessibilidade ou a jogar todas as fases.

O GitHub Pages serve os arquivos públicos de `dist/` em `/intuicao/`. Depois do merge em `main`, o [workflow de publicação](../.github/workflows/pages.yml) testa o commit integrado, publica o artefato validado e confere a URL pública.

### Bots e análise

Os oponentes computacionais são algoritmos locais de busca e avaliação. O Versus compartilhado documenta minimax, poda alfa-beta, aprofundamento e orçamento. DESVIO e CERCO têm implementações próprias. Isso não implica um serviço remoto, pagamento por jogada ou infalibilidade: orçamento esgotado deve ser distinguido de uma solução demonstrada. [Contrato dos duelos](../dist/versus/CONTRACT.md).

## Executar e testar

Clone e sirva `dist` por HTTP; não abra os módulos diretamente por `file://`.

```bash
git clone https://github.com/luigiscofano/intuicao.git
cd intuicao
python3 -m http.server 8766 --bind 127.0.0.1 --directory dist
```

No Windows com Python instalado, use `py -m http.server 8766 --bind 127.0.0.1 --directory dist`. Alternativamente use um servidor estático de sua preferência. Abra http://127.0.0.1:8766/. Python é uma opção de servidor, não dependência do navegador.

Verificações de entrada em Node.js:

```bash
node scripts/check-docs.mjs
node scripts/check-assets.mjs
node --test tests/game-catalog-indices.test.mjs tests/progress-backup.test.mjs
```

Não substituem toda a suíte. Os [workflows reais](../.github/workflows/README.md) definem grupos adicionais para motores, interface, regras e segurança. Confira os resultados do commit exato no PR. O verificador documental confirma destinos locais; não certifica links externos, âncoras ou conteúdo semântico.

## Dados, segurança e publicação

O progresso é local ao navegador/origem. Limpar armazenamento, mudar aparelho, perfil ou domínio pode tornar os dados indisponíveis. Exporte um backup antes de testes ou mudanças de origem. Esta base não garante sincronização de conta.

O [backup](../dist/progress-backup.mjs) e as validações de importação preservam versões, tentativas e conclusões assistidas. Não renumere IDs de armazenamento ao modificar só o número editorial. Use dados fictícios, nunca saves pessoais como fixtures públicas.

Para transferir o progresso do Sites, publicar uma atualização ou recuperar a última versão validada, consulte o [guia do GitHub Pages](../docs/setup/github-pages.md).

[Segurança](../SECURITY.md) · [Manutenção](../docs/manutencao/README.md) · [Limites e privacidade](../docs/seguranca/README.md)

## Dificuldades de engenharia

| Desafio | Decisão e consequência |
|---|---|
| Muitos jogos, experiência única | Compartilhar controles e contratos sem forçar regras diferentes à mesma implementação |
| Responsividade | Separar tamanho do tabuleiro de textos e controles variáveis |
| Busca custosa | Workers, cancelamento e limites; resposta antiga não deve mudar uma tela nova |
| Progresso | IDs e versões, replay e validação; não confiar apenas na posição do catálogo |
| Atual versus histórico | Lista ativa única, retirados preservados e relatórios datados identificados |
| Cascata de estilos | Conferir ordem e telas reais, evitando corrigir uma tela quebrando outra |
| Recursos grandes | Respeitar limites de publicação e finais de linha: [gitattributes](../.gitattributes) conserva LF nos registros grandes |
| Arte e licenças | Inventário e proveniência; código aberto não torna automaticamente toda imagem livre de restrições |

São problemas observáveis na estrutura e evolução do projeto, não uma alegação de que toda limitação foi eliminada. Os [relatórios de qualidade](../docs/qualidade/README.md) registram evidências por revisão.

## Mapa da documentação

| Quero entender… | Começar por… |
|---|---|
| Marca, cores, fontes e narrativa | [Identidade](../docs/identidade/README.md) |
| Regras | [Manuais](../docs/jogos/README.md), [Lógica](../docs/logica/README.md), [Versus](../docs/versus/README.md) |
| Código | [Arquitetura](../docs/arquitetura/README.md) |
| Instalação | [Setup](../docs/setup/README.md) |
| Verificações | [Qualidade](../docs/qualidade/README.md), [Testes](../tests/README.md) |
| Artes e créditos | [Recursos](../docs/recursos/README.md), [Assets](../dist/platform-assets/README.md) |
| Desenvolvimento | [Contribuição](../CONTRIBUTING.md), [GitHub](../docs/github/README.md) |
| Uma pasta específica | [Índice de pastas](../docs/indice-pastas.md) |
| Edições anteriores | [README histórico](../docs/README-historico-2026-11-16.md), [PDFs](../docs/pdfs/README.md) |

Perfil, Ateliê e coleção de medalhas 3D não são apresentados como funcionalidades publicadas: propostas e provas de conceito devem permanecer distintas do produto disponível.

## Licença e créditos

Código e documentação seguem a [licença MIT](../LICENSE). Consulte separadamente [inventário e proveniência](../docs/recursos/README.md) para artes, fontes e materiais associados; não presuma permissão irrestrita sobre todo arquivo visual. Conserve os avisos e créditos aplicáveis.

**Autor: Luigi Scofano de Araujo.**
