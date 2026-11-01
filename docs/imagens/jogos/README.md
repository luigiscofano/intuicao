# Imagens dos jogos

Esta pasta reúne as **11 capturas de tela** usadas na galeria do [README inicial](../../../README.md#os-jogos-em-imagens), uma por jogo ativo.

## Origem e contexto

- **Origem:** [site hospedado do Intuição](https://intuicao-luigi-minigames.luigiscofano.chatgpt.site/).
- **Data da captura:** 1º de novembro de 2026.
- **Formato:** JPEG, com 1.200 pixels de largura; o recorte inclui o painel do jogo e o tabuleiro.
- **Procedimento:** navegação pela interface e captura direta da tela, sem alterar os desenhos, as regras ou os elementos exibidos.
- **Escopo:** as imagens ilustram a experiência do site nessa data. Não comprovam equivalência entre a versão hospedada e um commit do GitHub, nem aprovação da suíte de testes.

Algumas imagens mostram uma tentativa ou uma prévia de jogada. Elas não representam necessariamente soluções corretas ou partidas concluídas.

## Catálogo das capturas

| Jogo e arquivo | O que foi capturado |
| --- | --- |
| [Reflexos](reflexos.jpg) | Fase 9 — Duas cores, dois destinos; tentativa com os dois raios disparados. |
| [Corte certo](corte.jpg) | Fase 47 — Capivara; curva em S e meta de 76%. |
| [ELO](elo.jpg) | Fase 8 — Circuito clássico; dois pontos adicionados para demonstrar as ligações. |
| [PRUMO](prumo.jpg) | Fase 9 — Básico; grade 4 × 4, com as pistas e os sete apoios iniciais. |
| [PACTO](pacto.jpg) | Fase 8 — Básico; configuração inicial da grade 8 × 8. |
| [SINTONIA](sintonia.jpg) | Fase 31 — Uma passagem para o outro; três animais e zero movimentos. |
| [REPASSE](repasse.jpg) | Fase 16 — Juntar no centro; configuração inicial com três peças. |
| [ÓRBITA](orbita.jpg) | Fase 24 — Órbita · 24; dois anéis, seis alvos e configuração inicial. |
| [DESVIO](desvio.jpg) | Mapa 1 — Referência do manual; prévia de L2C2, sem confirmar a jogada. |
| [BROTO](broto.jpg) | Jardim clássico, rodada 1; plantios em L2C2 e L2C4, com prévia de L4C2. |
| [CERCO](cerco.jpg) | Mapa Clássico 5 × 5; após o movimento Verde L1C3 → L2C3, com barreira em L1C3. |

As capturas históricas que já existiam em `docs/` foram preservadas em seus caminhos originais. A galeria inicial passou a usar os arquivos desta pasta.

## Como atualizar

1. Abra o jogo pelo fluxo normal do site e escolha uma fase ou partida que mostre sua mecânica.
2. Capture o tabuleiro completo, incluindo o nome ou contexto do jogo e os controles necessários para entendê-lo.
3. Evite telas de carregamento, diálogos e dados pessoais. Identifique tentativas, prévias e soluções assistidas quando aparecerem.
4. Substitua o arquivo correspondente e atualize a data, a origem e a descrição nesta página.
5. Confirme que os 11 jogos continuam com imagem e texto alternativo no README inicial.
6. Execute `node scripts/check-docs.mjs` na raiz do projeto para conferir os caminhos locais.

## Direitos

As capturas documentam a interface e os recursos visuais do Intuição. Os direitos de imagens, sprites, fontes e outros elementos continuam conforme o [guia dos recursos visuais](../../../dist/platform-assets/README.md) e a seção de [autoria e licença](../../../README.md#autoria-e-licença). Sua inclusão nesta pasta não amplia a licença dos recursos retratados.
