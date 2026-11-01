# intuicao

![Identidade visual do Intuição](dist/platform-assets/intuicao-logo-original.png)

**Um laboratório de jogos educativos para experimentar lógica, geometria e estratégia.**

Projeto de Luigi Scofano de Araujo. A proposta é aprender fazendo: observar um tabuleiro, formular uma hipótese, experimentar uma ação e usar o resultado para repensar a solução. A identidade visual aproxima os desafios da fauna brasileira, com animais, folhas e ilustrações em pixel art.

Esta edição organiza a base `2354a3c`, com seus **183 commits anteriores preservados**. A organização está preparada localmente para um repositório privado; os PRs ainda não foram abertos no GitHub. A revisão técnica `f0e7fcf`, registrada em documentação externa, **ainda não foi recuperada nem incorporada**. Os resultados de teste daquela revisão não descrevem automaticamente esta cópia.

## Comece por aqui

- **Quero jogar:** siga a execução rápida abaixo.
- **Quero entender os jogos:** abra o [catálogo de manuais](docs/jogos/README.md).
- **Quero estudar o código:** consulte a [arquitetura](docs/arquitetura/README.md).
- **Quero verificar qualidade:** veja os [testes e limites](tests/README.md).
- **Quero contribuir:** leia [CONTRIBUTING.md](CONTRIBUTING.md).
- **Quero revisar a entrega:** consulte o [plano de branches e PRs](docs/github/README.md).

## O problema que o projeto explora

Explicações abstratas de proporção, equilíbrio, conectividade e planejamento ficam mais acessíveis quando uma escolha produz uma consequência visível. O Intuição transforma esses conceitos em problemas pequenos, exploráveis e reversíveis. O objetivo educacional é oferecer prática e descoberta; não há alegação de ganho cognitivo comprovado nem calibração completa da dificuldade com jogadores.

## Os 11 jogos

| Jogo | Categoria | O que explora | Formato atual |
| --- | --- | --- | --- |
| [Reflexos](docs/jogos/reflexos/README.md) | Intuição | Luz, reflexão e planejamento de trajetórias | 80 fases |
| [Corte certo](docs/jogos/corte/README.md) | Intuição | Estimativa de áreas, porcentagens e geometria | 80 fases |
| [ELO](docs/jogos/elo/README.md) | Raciocínio lógico | Regiões, grafos e restrições locais e globais | 80 fases |
| [PRUMO](docs/jogos/prumo/README.md) | Raciocínio lógico | Partição conectada e centro de massa | 80 fases |
| [PACTO](docs/jogos/pacto/README.md) | Raciocínio lógico | Contagem, propagação de restrições e parcerias | 80 fases |
| [SINTONIA](docs/jogos/sintonia/README.md) | Raciocínio lógico | Comandos simultâneos e coordenação de estados | 80 fases |
| [REPASSE](docs/jogos/repasse/README.md) | Raciocínio lógico | Ordem de remoção e propagação de valores | 80 fases |
| [ÓRBITA](docs/jogos/orbita/README.md) | Raciocínio lógico | Permutações em anéis e objetivos simultâneos | 80 fases |
| [DESVIO](docs/jogos/desvio/README.md) | Versus | Jogo por turnos e espaço de possibilidades | Duelo |
| [BROTO](docs/jogos/broto/README.md) | Versus | Estímulos por eixos e efeitos compartilhados | Duelo |
| [CERCO](docs/jogos/cerco/README.md) | Versus | Mobilidade coletiva e bloqueios permanentes | Duelo |

As oito campanhas solo totalizam **640 fases**. Cada campanha tem seis faixas: Básico (1–15), Aprendiz (16–30), Intermediário (31–45), Avançado (46–60), Mestre (61–75) e Modo Sábio (76–80). Modo livre, geração de desafios e duelos não aumentam essa contagem. TRAMA e VÉRTICE não estão no catálogo ativo; seus registros históricos permanecem no projeto.

## Executar em poucos minutos

Você precisa de Python 3 para servir os arquivos e de um navegador com módulos JavaScript. Não há instalação npm, compilação nem banco de dados para jogar localmente.

Na raiz desta pasta:

```bash
python3 -m http.server 8766 --bind 127.0.0.1 --directory dist
```

No Windows:

```powershell
py -m http.server 8766 --bind 127.0.0.1 --directory dist
```

Abra **http://127.0.0.1:8766/**. Mantenha o terminal aberto; `Ctrl+C` encerra o servidor. A opção `--bind 127.0.0.1` limita esse servidor ao próprio computador. Não abra `index.html` diretamente por `file://`: módulos e workers precisam de uma origem HTTP apropriada.

Para opções, diagnóstico de problemas e recuperação a partir de um bundle Git, leia o [guia de instalação](docs/setup/README.md).

## O que já existe

- Navegação por categorias, seleção de desafios, regras junto ao tabuleiro e controles de interação.
- Motores de regras, catálogos, soluções de referência e testes automatizados de diferentes épocas.
- Desfazer/refazer e persistência nos fluxos que os oferecem; modos competitivos podem restringir essas ações.
- Duelos locais, com recursos de bot/análise nos jogos que os implementam.
- Arte, personagens e informações culturais sobre animais brasileiros.

O comportamento de conclusão varia: PACTO, SINTONIA, REPASSE e ÓRBITA reconhecem configurações vencedoras automaticamente; Reflexos, Corte certo, ELO e PRUMO mantêm seus fluxos de confirmação. DESVIO, BROTO e CERCO têm confirmação e encerramento próprios de duelo.

## Organização do código

| Local | Responsabilidade |
| --- | --- |
| [dist/](dist/README.md) | Aplicação estática editável, módulos, estilos e dados servidos ao navegador |
| [dist/platform-assets/](dist/platform-assets/README.md) | Logos, fontes, folhas, sprites e demais recursos visuais |
| [docs/](docs/README.md) | Manuais atuais, arquitetura, manutenção e relatórios históricos |
| [tests/](tests/README.md) | Testes de motores, integração, preservação e evidências de revisões |
| [scripts/](scripts/README.md) | Ferramentas de verificação da documentação |
| [.github/](.github/README.md) | Modelos de issues/PRs e fluxos de validação preparados |

O nome `dist` é herdado do projeto: **aqui ele contém o próprio código-fonte servido**, não um artefato descartável. Não execute uma limpeza de build que apague essa pasta. Os caminhos foram mantidos para preservar imports, testes e histórico.

## Tecnologias e conceitos exercitados

HTML, CSS, JavaScript em módulos `.mjs`, SVG, Web Workers e armazenamento local. Os testes usam Node.js. Entre os conceitos presentes estão geometria computacional, grafos, busca de estados, restrições, máquinas de estado, interfaces responsivas e migração de dados.

Cada manual explica o problema específico do jogo, sua representação, os arquivos principais e exemplos de raciocínio. Essa documentação descreve o projeto e os temas que ele permite estudar; não substitui um registro pessoal de aprendizado ou uma avaliação acadêmica.

## Qualidade e estado desta entrega

Na preparação desta organização, os cinco conjuntos de motor de BROTO, CERCO, SINTONIA, REPASSE e ÓRBITA passaram **95 testes, sem falhas**, usando Node 24.22.1. Esse recorte não é a suíte completa. O diagnóstico amplo registrado do baseline tem falhas históricas; há também uma pendência real de migração SINTONIA documentada na revisão ainda não recuperada.

As verificações desta organização e seus limites estão em [qualidade](docs/qualidade/README.md). Não há CI remota comprovada enquanto o repositório não for criado e os workflows não executarem no GitHub.

## Progresso, privacidade e hospedagem

O progresso é local ao navegador e à origem. `localhost`, `127.0.0.1` e o domínio hospedado são origens diferentes, portanto podem mostrar saves diferentes. Limpar os dados do navegador pode apagar esse progresso. Não há promessa de sincronização entre aparelhos ou salas multiplayer online.

O [site hospedado existente](https://intuicao-luigi-minigames.luigiscofano.chatgpt.site) mantém seu controle de acesso. A preparação para GitHub não publica uma nova versão do site. Os workflows incluídos nesta entrega também não fazem deploy.

## Direitos e distribuição

Nenhuma licença aberta foi adicionada. Esta preparação destina-se a um repositório privado. Antes de distribuição pública, revisar separadamente a licença do código e a proveniência dos recursos visuais; não presumir que todos os arquivos tenham os mesmos direitos. Consulte o [guia dos recursos](dist/platform-assets/README.md).
