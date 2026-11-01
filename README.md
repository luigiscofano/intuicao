<p align="center">
  <img src="dist/platform-assets/intuicao-logo-original.png" alt="intuicao — identidade visual do projeto" width="460">
</p>

# intuicao

**Jogos de lógica, geometria e estratégia para aprender experimentando.**

O **Intuição**, projeto de **Luigi Scofano de Araujo**, reúne 11 jogos que funcionam no navegador. Você pode guiar raios de luz com espelhos, equilibrar formas, coordenar animais ou disputar um tabuleiro com outra pessoa. Cada jogo tem regras próprias, explicações na interface e um manual neste repositório.

A ideia é transformar conceitos abstratos em escolhas visíveis: observar, imaginar uma solução, testar e entender o que mudou. Folhas, molduras e animais brasileiros em pixel art dão identidade à experiência.

> **A curiosidade é a primeira lição.**

**11 jogos · 8 campanhas solo · 640 fases · 3 jogos Versus**

[Abrir o site](https://intuicao-luigi-minigames.luigiscofano.chatgpt.site) · [Executar no computador](#executar-no-computador) · [Conhecer os jogos](#conheça-os-11-jogos) · [Manuais completos](docs/jogos/README.md)

O site mantém seu próprio controle de acesso. Para jogar com a cópia deste repositório, siga a instalação local abaixo.

## Comece por aqui

| O que você quer fazer? | Por onde começar |
| --- | --- |
| **Jogar pela primeira vez** | [Abra o projeto](#executar-no-computador) e siga [Como jogar](#como-jogar-pela-primeira-vez). |
| **Escolher um jogo** | Veja a [galeria](#os-jogos-em-imagens) e o [catálogo com os objetivos](#conheça-os-11-jogos). |
| **Entender uma regra** | Abra o [manual do jogo](docs/jogos/README.md): há regras, exemplos e arquivos relacionados. |
| **Estudar ou modificar o código** | Comece pelo [mapa do projeto](#como-o-projeto-está-organizado) e pela [arquitetura](docs/arquitetura/README.md). |
| **Conferir testes e pendências** | Consulte o [estado do projeto](#o-que-funciona-e-o-que-ainda-está-pendente). |

## Os jogos em imagens

**Uma imagem de cada um dos 11 jogos**, capturada diretamente no [site hospedado](https://intuicao-luigi-minigames.luigiscofano.chatgpt.site/) em **1º de novembro de 2026**. Clique em uma imagem para ampliar e use o link da legenda para abrir o manual.

As capturas mostram o site nessa data; o site e o código deste repositório têm atualizações separadas. O [registro das imagens](docs/imagens/jogos/README.md) identifica a fase ou partida de cada captura.

### Intuição

| Reflexos | Corte certo |
| --- | --- |
| [![Reflexos: dois raios coloridos refletidos por espelhos durante uma tentativa da fase 9.](docs/imagens/jogos/reflexos.jpg)](docs/imagens/jogos/reflexos.jpg) | [![Corte certo: silhueta de capivara dividida por uma curva, com meta de 76 por cento no lado roxo.](docs/imagens/jogos/corte.jpg)](docs/imagens/jogos/corte.jpg) |
| Gire espelhos para levar cada raio ao alvo correspondente. [Manual](docs/jogos/reflexos/README.md). | Ajuste o corte até separar a porcentagem pedida da figura. [Manual](docs/jogos/corte/README.md). |

### Raciocínio lógico

| ELO | PRUMO |
| --- | --- |
| [![ELO: grade de regiões coloridas com pontos e duas ligações horizontais automáticas.](docs/imagens/jogos/elo.jpg)](docs/imagens/jogos/elo.jpg) | [![PRUMO: grade 4 por 4 com apoios A a G e peças coloridas que devem ficar equilibradas.](docs/imagens/jogos/prumo.jpg)](docs/imagens/jogos/prumo.jpg) |
| Posicione um ponto por região e forme um único circuito. [Manual](docs/jogos/elo/README.md). | Desenhe peças conectadas e equilibradas sobre seus apoios. [Manual](docs/jogos/prumo/README.md). |

| PACTO | SINTONIA |
| --- | --- |
| [![PACTO: grade 8 por 8 com círculos, quadrados, triângulos e losangos, pistas fixas e pares.](docs/imagens/jogos/pacto.jpg)](docs/imagens/jogos/pacto.jpg) | [![SINTONIA: tucano, quati e cobra-coral em três tabuleiros, com placas, cancelas e controle direcional comum.](docs/imagens/jogos/sintonia.jpg)](docs/imagens/jogos/sintonia.jpg) |
| Complete as contagens e dê exatamente um parceiro a cada símbolo. [Manual](docs/jogos/pacto/README.md). | Um comando move todos; leve os animais aos destinos ao mesmo tempo. [Manual](docs/jogos/sintonia/README.md). |

| REPASSE | ÓRBITA |
| --- | --- |
| [![REPASSE: peças de valores 1, 2 e 3 com setas e caixas de metas ao redor do tabuleiro.](docs/imagens/jogos/repasse.jpg)](docs/imagens/jogos/repasse.jpg) | [![ÓRBITA: dois anéis conectados, peças coloridas e alvos fixos identificados por símbolos.](docs/imagens/jogos/orbita.jpg)](docs/imagens/jogos/orbita.jpg) |
| Retire peças na ordem certa para completar as metas das bordas. [Manual](docs/jogos/repasse/README.md). | Gire anéis, transfira peças e complete todos os alvos. [Manual](docs/jogos/orbita/README.md). |

### Versus

| DESVIO | BROTO | CERCO |
| --- | --- | --- |
| [![DESVIO: tabuleiro 4 por 4 de setas horizontais e verticais, com prévia da escolha na linha 2, coluna 2.](docs/imagens/jogos/desvio.jpg)](docs/imagens/jogos/desvio.jpg) | [![BROTO: dois brotos plantados e prévia de uma semente que completa os estímulos horizontal e vertical de uma flor.](docs/imagens/jogos/broto.jpg)](docs/imagens/jogos/broto.jpg) | [![CERCO: tabuleiro 5 por 5, duas equipes de três animais e uma barreira deixada após mover uma peça.](docs/imagens/jogos/cerco.jpg)](docs/imagens/jogos/cerco.jpg) |
| Sua escolha define a linha ou coluna da próxima jogada adversária. [Manual](docs/jogos/desvio/README.md). | Cada plantio pode fazer florescer um broto seu ou do adversário. [Manual](docs/jogos/broto/README.md). | Mova suas peças e transforme as casas abandonadas em barreiras. [Manual](docs/jogos/cerco/README.md). |


## Como jogar pela primeira vez

1. **Escolha uma categoria:** Intuição, Raciocínio lógico ou Versus.
2. **Abra um jogo:** nas campanhas solo, comece pela faixa **Básico**; nos duelos, configure a partida conforme as opções do jogo.
3. **Leia o objetivo e as regras junto ao tabuleiro.** Observe o que pode mover e qual configuração precisa alcançar.
4. **Experimente uma ação e acompanhe o efeito.** Use Desfazer ou Reiniciar quando esses controles estiverem disponíveis.
5. **Conclua o desafio.** Alguns jogos reconhecem a vitória automaticamente; outros pedem Checar ou Confirmar. Nos duelos, confirme a jogada e acompanhe a vez de cada pessoa.

**Um exemplo em SINTONIA:** ao pressionar a seta para a direita, todos os animais tentam andar. Um animal encostado na parede fica parado; outro, com caminho livre, avança. Você usa essa diferença para ajustar suas posições até que todos ocupem seus destinos simultaneamente.

Para uma primeira exploração, experimente **Corte certo** para estimar áreas, **SINTONIA** para coordenar movimentos ou **BROTO** para jogar em dupla. Os manuais explicam cada regra com mais exemplos.

## Conheça os 11 jogos

### Intuição: observar formas e trajetórias

| Jogo | O que você faz para resolver | O que explora |
| --- | --- | --- |
| **[Reflexos](docs/jogos/reflexos/README.md)** | Gira espelhos para levar cada raio ao alvo da mesma cor e símbolo, evitando contato entre trajetórias de cores diferentes. | Reflexão, ângulos e planejamento de caminhos. |
| **[Corte certo](docs/jogos/corte/README.md)** | Ajusta uma linha ou curva até separar a porcentagem pedida da área útil de uma figura. Buracos não entram na conta. | Estimativa de áreas, proporções e porcentagens. |

### Raciocínio lógico: combinar regras e planejar ações

| Jogo | O que você faz para resolver | O que explora |
| --- | --- | --- |
| **[ELO](docs/jogos/elo/README.md)** | Coloca um ponto por região para que as ligações automáticas formem um único circuito fechado, respeitando as pistas. | Conectividade, dedução e condições locais e globais. |
| **[PRUMO](docs/jogos/prumo/README.md)** | Divide a grade em peças conectadas, cada uma com o centro de massa exatamente sobre seu apoio. | Equilíbrio, geometria e distribuição de massa. |
| **[PACTO](docs/jogos/pacto/README.md)** | Completa a grade com dois de cada símbolo por linha e coluna; cada casa precisa ter exatamente um vizinho igual pelos lados. | Contagem, exclusão de possibilidades e formação de pares. |
| **[SINTONIA](docs/jogos/sintonia/README.md)** | Usa comandos compartilhados para levar animais de tabuleiros diferentes aos seus destinos ao mesmo tempo. | Coordenação, obstáculos e planejamento de sequências. |
| **[REPASSE](docs/jogos/repasse/README.md)** | Retira todas as peças na ordem certa para que os valores enviados atinjam exatamente as metas das bordas. | Dependência entre ações, propagação de valores e ordem. |
| **[ÓRBITA](docs/jogos/orbita/README.md)** | Gira anéis conectados para transferir peças e completar todos os alvos simultaneamente. | Orientação espacial, permutações e objetivos simultâneos. |

### Versus: antecipar a próxima jogada

| Jogo | Como funciona a disputa | Condição de vitória |
| --- | --- | --- |
| **[DESVIO](docs/jogos/desvio/README.md)** | A casa escolhida determina a linha ou coluna em que o adversário terá de jogar. Há duelo local, bot e treino com análise. | Deixar o adversário sem escolha legal. |
| **[BROTO](docs/jogos/broto/README.md)** | Cada plantio estimula brotos nas direções horizontal e vertical e pode completar flores de qualquer pessoa. | Somar mais flores ao final das duas rodadas; empate é possível. |
| **[CERCO](docs/jogos/cerco/README.md)** | Move uma de suas três peças; a casa abandonada vira uma barreira permanente para os dois times. | Deixar todas as peças do adversário sem movimento na vez dele. |

Os duelos locais acontecem **no mesmo aparelho**. Não há salas multiplayer online nesta base. TRAMA e VÉRTICE aparecem em registros históricos, mas não fazem parte do catálogo ativo.

### Como as fases estão organizadas

Cada uma das oito campanhas solo tem **80 fases**, distribuídas da mesma forma:

| Faixa | Fases | Quantidade |
| --- | --- | ---: |
| Básico | 1–15 | 15 |
| Aprendiz | 16–30 | 15 |
| Intermediário | 31–45 | 15 |
| Avançado | 46–60 | 15 |
| Mestre | 61–75 | 15 |
| Modo Sábio | 76–80 | 5 |
| **Total por campanha** | **1–80** | **80** |

São **8 × 80 = 640 fases solo**. Modos livres, desafios gerados e partidas Versus ficam fora dessa contagem. A proposta é oferecer prática e descoberta; a curva de dificuldade ainda não tem calibração completa com jogadores.

## Executar no computador

A aplicação roda no navegador. O Python apenas entrega os arquivos locais por HTTP; **não é necessário instalar pacotes npm, compilar o projeto ou configurar um banco de dados**.

### 1. Prepare o ambiente

| Ferramenta | Para que serve |
| --- | --- |
| **Navegador atualizado** | Abre os jogos e executa HTML, CSS e JavaScript. |
| **Python 3** | Inicia o servidor local de arquivos. |
| **Git** | Baixa o repositório e preserva seu histórico. Pode ser substituído pelo ZIP para jogar. |
| **Node.js 24** | Necessário apenas para as verificações e os testes descritos abaixo. |

### 2. Baixe o projeto

Com sua conta autorizada no repositório privado, abra um terminal e execute:

```bash
git clone https://github.com/luigiscofano/intuicao.git
cd intuicao
```

**Sem Git:** no GitHub, use **Code → Download ZIP**, extraia o arquivo e abra o terminal na pasta extraída. Para jogar, a pasta correta é aquela que contém este `README.md` e a subpasta `dist`. Alguns testes históricos exigem um clone com o histórico Git.

### 3. Inicie o servidor

**macOS ou Linux**, na pasta do projeto:

```bash
python3 -m http.server 8766 --bind 127.0.0.1 --directory dist
```

**Windows**, na pasta do projeto:

```powershell
py -m http.server 8766 --bind 127.0.0.1 --directory dist
```

### 4. Abra no navegador

Acesse **[http://127.0.0.1:8766/](http://127.0.0.1:8766/)** e escolha um jogo.

Mantenha o terminal aberto enquanto joga. Para encerrar o servidor, pressione **Ctrl+C**. O endereço `127.0.0.1` restringe o acesso ao próprio computador.

> Abra o endereço HTTP acima. Clicar diretamente em `dist/index.html` usa `file://`, que não oferece a origem necessária aos módulos e workers.

### Se algo não funcionar

| Situação | O que conferir |
| --- | --- |
| O terminal não encontra `python3` ou `py` | Confirme que o Python 3 está instalado e disponível no terminal. Reabra o terminal após instalar. |
| Aparece uma lista de arquivos em vez dos jogos | Execute o comando na raiz do projeto e mantenha `--directory dist`. |
| A porta 8766 está ocupada | Troque `8766` por `8767` no comando e no endereço do navegador. |
| Aparecem erros ao abrir o HTML | Acesse pelo servidor HTTP, sem usar `file://`. |
| Imagens ou módulos não carregam | Confira se o download está completo e se os nomes e as pastas foram preservados. |
| O progresso parece ter desaparecido | Use o mesmo endereço, porta e perfil de navegador da sessão anterior. |

Mais opções e diagnóstico: **[guia de instalação](docs/setup/README.md)**.

## Como o projeto está organizado

| Onde procurar | O que você encontra |
| --- | --- |
| **[dist/](dist/README.md)** | A aplicação: HTML, estilos, módulos JavaScript, regras e catálogos. |
| **[dist/index.html](dist/index.html)** | A estrutura inicial da página e as entradas dos módulos. |
| **[dist/app.mjs](dist/app.mjs)** | Parte da integração dos jogos e da navegação. |
| **[dist/platform-assets/](dist/platform-assets/README.md)** | Logo, fonte, folhas, sprites e outros recursos visuais. |
| **[docs/jogos/](docs/jogos/README.md)** | Um manual por jogo, com regras, exemplos e caminhos para o código. |
| **[docs/arquitetura/](docs/arquitetura/README.md)** | Como navegação, regras, conteúdo, persistência e apresentação se relacionam. |
| **[tests/](tests/README.md)** | Testes de regras, integração e preservação, além de evidências históricas. |
| **[scripts/](scripts/README.md)** | Ferramentas para verificar a documentação. |
| **[.github/](.github/guias/README.md)** | Modelos de issues e PRs e verificações do GitHub Actions. |

**Atenção ao nome `dist`: aqui ela contém o código-fonte editável do projeto.** Não a apague como se fosse uma pasta temporária de compilação.

Para acompanhar um jogo do começo ao fim, leia seu manual, localize os arquivos indicados e compare as regras com os testes correspondentes. SINTONIA, REPASSE, ÓRBITA, BROTO e CERCO têm subpastas próprias; os demais também usam módulos compartilhados no nível principal de `dist`.

### Tecnologias e decisões de implementação

| Tecnologia ou recurso | Papel no Intuição |
| --- | --- |
| **HTML e CSS** | Estrutura das telas, controles, molduras e adaptação do layout. |
| **JavaScript em módulos `.mjs`** | Regras, estados, interação, navegação e integração dos jogos. |
| **SVG e imagens raster** | Tabuleiros, formas, símbolos, cenários e personagens. |
| **Web Workers** | Processamento separado da interface em rotinas de análise e geração que os utilizam. |
| **Armazenamento local** | Progresso no navegador, nos fluxos que oferecem persistência. |
| **Node.js e GitHub Actions** | Execução de testes e verificação dos documentos. |

O projeto permite estudar geometria computacional, grafos, busca de estados, máquinas de estado, restrições e compatibilidade de dados salvos. Uma decisão central é distinguir **a regra do jogo**, **o estado da tentativa** e **a forma de exibir o resultado**. O [guia de arquitetura](docs/arquitetura/README.md) mostra onde essas responsabilidades aparecem.

## O que funciona e o que ainda está pendente

| Área | Estado desta cópia |
| --- | --- |
| Catálogo e navegação | 11 jogos ativos, seleção de desafios e regras na interface. |
| Campanhas solo | Oito campanhas de 80 fases; recursos adicionais variam por jogo. |
| Duelos | Partidas locais e recursos de bot/análise nos jogos que os implementam. |
| Progresso e exploração | Salvamento, Desfazer e Refazer nos fluxos que oferecem essas funções. |
| Documentação | README inicial, manuais individuais, instalação, arquitetura e manutenção. |
| Testes de motores | Recorte de cinco suítes com **95 testes aprovados** na preparação documentada. |
| Qualidade ampla | Há falhas históricas e pendências; esse recorte não aprova toda a aplicação. |
| Revisão técnica posterior | A revisão `f0e7fcf` ainda precisa ser recuperada e incorporada, incluindo a correção de migração de SINTONIA ali descrita. |

A contagem de testes acima é uma **evidência registrada da preparação**, não uma nova execução provocada por esta edição do README. Consulte [qualidade e limitações](docs/qualidade/README.md) e as [execuções do GitHub Actions](https://github.com/luigiscofano/intuicao/actions).

<details>
<summary><strong>Histórico preservado e revisão ainda não incorporada</strong></summary>

Esta edição organiza a base `2354a3c`, preservando seus **183 commits anteriores**. As alterações posteriores foram organizadas em branches temáticas e PRs integrados em `main`; o [registro de integração](docs/github/README.md) detalha o processo.

A revisão `f0e7fcf` é conhecida por documentação externa, mas seu código não foi recuperado nesta cópia. Por isso, seus resultados de teste não são apresentados como validação do código disponível. A recuperação deve preservar o histórico e permitir a revisão das diferenças.

</details>

### Verificar a documentação e os motores

Com Node.js 24, execute os comandos na raiz do repositório.

**Links locais da documentação:**

```bash
node scripts/check-docs.mjs
```

**Recorte dos motores de BROTO, CERCO, SINTONIA, REPASSE e ÓRBITA:**

```bash
node --test tests/broto-engine.test.mjs tests/cerco-engine.test.mjs tests/sintonia-engine.test.mjs tests/repasse-engine.test.mjs tests/orbita-engine.test.mjs
```

Antes de ampliar a execução, leia o [guia de testes](tests/README.md). A pasta também contém scripts de geração e verificações de revisões antigas; nem todo arquivo `.mjs` é um teste sem efeitos colaterais.

## Progresso, hospedagem e contribuição

**Onde fica meu progresso?** No navegador e no endereço usados para jogar, conforme a persistência de cada jogo. `localhost`, `127.0.0.1`, portas diferentes e o site hospedado são origens diferentes e podem mostrar saves diferentes. Limpar os dados do navegador pode apagar o progresso. Não há sincronização automática entre aparelhos.

**Uma alteração no GitHub atualiza o site?** Não. O [site hospedado](https://intuicao-luigi-minigames.luigiscofano.chatgpt.site) e a cópia deste repositório têm atualização separada. Os workflows presentes não fazem deploy.

**Como contribuir?** Leia [CONTRIBUTING.md](CONTRIBUTING.md), use uma branch para uma mudança bem delimitada e abra um PR descrevendo o problema, a solução e a validação realizada. Para mudanças em fases, IDs ou saves, consulte também o [guia de manutenção](docs/manutencao/README.md).

## Autoria e licença

Copyright (c) 2026 **Luigi Scofano de Araujo**.

O código e a documentação autorais do Intuição são disponibilizados sob a **[licença MIT](LICENSE)**. Ela permite uso, cópia, modificação e distribuição, inclusive comercial, desde que o aviso de direitos autorais e o texto da licença sejam preservados nas cópias ou partes substanciais. O software é fornecido sem garantias, conforme os termos da licença.

Imagens, sprites, fontes, logos e demais recursos visuais têm seus direitos tratados separadamente e não estão incluídos automaticamente nessa licença. Materiais de terceiros conservam suas licenças e créditos próprios. Consulte o [guia dos recursos](dist/platform-assets/README.md) antes de redistribuí-los.

O repositório permanece privado; a adoção da MIT não altera suas permissões de acesso nem publica uma nova versão do site.
