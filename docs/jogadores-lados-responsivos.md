# Jogadores nos lados do tabuleiro

## Escopo

Os sete duelos ativos recebem a mesma orientação: jogador 1 à esquerda e jogador 2 à direita. Em telas estreitas, a faixa aprovada fica nos cantos opostos imediatamente **acima** do tabuleiro, preservando sua largura e os dados completos. Em telas amplas (a partir de 1200px), os painéis flanqueiam o tabuleiro.

- **Acorde:** coleções de sinos nas laterais em desktop, sem cards repetidos acima. Tabela compacta preservada no celular.
- **Quinhão:** os dois depósitos originais mudam de posição, não são duplicados. Nas laterais desktop; no centro do percurso móvel. Identidades na faixa superior móvel.
- **Broto, Cerco, Estalo e Mosaico:** placares/identidades em lados opostos, mantendo reservas, escores, símbolos e sprites existentes.
- **Desvio:** identificação explícita Jogador 1/Jogador 2, turno e computador quando aplicável, derivada do estado original.

## Organização técnica

`dist/versus-player-layout.css` define a apresentação e não usa escala, zoom ou redução dinâmica de tabuleiro. `dist/versus-player-layout.mjs` move os nós existentes dos depósitos Quinhão quando muda a largura, preservando leitura e dados únicos. O shell chama o adaptador após render e resize; não há escrita em saves, rede ou mudanças de motor.

O CSS móvel dispõe as seis ações em três colunas e duas linhas, preservando alvos de 44px, nomes acessíveis, ícones e estados. Estalo evita repetir sua dica decorativa e a prévia de ganhos; a explicação completa da cadeia continua no status vivo. Textos longos podem ocupar mais altura; em janelas baixas, texto ampliado ou ajuda aberta, a rolagem permanece disponível em vez de recortar controles.

## Verificação

- Testes de reposicionamento com os mesmos nós em 1440, 1316, 650, 390 e 320px (estrutura, não captura visual).
- Quinhão: oito rodadas, prévias e dois depósitos, sem mutação do estado.
- Verificação de inexistência de acesso a rede/armazenamento/motores no adaptador.
- Suítes dos workflows GitHub executadas antes da publicação; evidências visuais acrescentadas na revisão final.

## Recuperação

Mudança isolada em branch/PR. O histórico anterior permanece preservado; reverter o commit restaura o layout prévio sem converter saves.

### QA visual final (13/11/2026)

Os sete jogos foram renderizados em desktop (largura real do navegador em torno de 1316px) e em viewports CSS de 320 e 390px, com 780px de altura. Isso não equivale à emulação de aparelho, toque físico ou teste de rotação nativa.

- Acorde e Quinhão: painéis laterais únicos em desktop; coleções completas mantidas no móvel.
- Desvio: tabuleiro 550 × 550px, igual à base; confirmação e desfazer conservaram tamanho e atualizaram jogador/turno. Um shrink-to-fit inicial foi detectado e corrigido com largura explícita da coluna central.
- Estalo e Mosaico: estado inicial e seleção por clique coordenado em 320/390; seis ações visíveis dentro de 780px, alvos de 44px e rótulos sem corte, sem reduzir o tabuleiro. O clique por localizador da automação provocava auto-scroll; clique coordenado não reproduziu o problema.
- Broto e Cerco: identidade e posicionamento revisados visualmente em desktop e 320/390.

Não se reivindica cobertura funcional manual completa de todos os sete nem de todos os tamanhos de mapa. Motores, histórico, busca e backup foram cobertos pelas suítes automatizadas existentes. Em altura menor, zoom de acessibilidade, ajuda expandida ou explicações extensas, a rolagem permanece permitida para não recortar informações.
