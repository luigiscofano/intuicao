# Identidade dos jogadores

A apresentação usa **Jogador 1** (verde, círculo) e **Jogador 2** (âmbar, losango). Os retratos são os sprites existentes do Sintonia, sem novas ilustrações nem recoloração. O nome de cada animal fica disponível para tecnologias assistivas e no título do retrato.

| Jogo | Jogador 1 | Jogador 2 |
| --- | --- | --- |
| Broto | Capivara | Tuiuiú |
| Acorde | Bem-te-vi | Arara-azul |
| Dobra | Tatu-bola | Tamanduá-bandeira |
| Estalo | Piranha-vermelha | Cobra-coral |
| Quinhão | Mico-leão-dourado | Quati |

`dist/versus/player-identities.mjs` centraliza as duplas e os rótulos. `dist/player-identities.css` limita o tamanho dos retratos para que não disputem espaço com o tabuleiro. Os índices de jogador continuam 0 e 1 internamente: regras, IA, turnos, pontuação, replay e dados salvos não dependem dos animais.

Os demais jogos mantêm sua apresentação. No Broto, a antiga cor roxa da segunda equipe foi substituída pelo âmbar. Símbolos geométricos continuam diferenciando as equipes sem depender exclusivamente da cor.

## Verificação

- Testes de identidade, nomes acessíveis, duplas distintas e preservação do estado.
- Suítes dos jogos e plataforma versus, incluindo IA e mapas do Estalo.
- Revisão visual dos cinco jogos antes da publicação.

### Limite conhecido em telas estreitas

A revisão em 320/390px encontrou compressão anterior dos tabuleiros. Acorde, Quinhão e Dobra agora conservam uma largura mínima legível; em espaço insuficiente usa-se a rolagem interna existente, sem sobrepor células. Isso não equivale a garantir toda a área de jogo simultaneamente visível em 320px. Os depósitos do Quinhão usam J1/J2 em telas estreitas, com nomes acessíveis completos e retratos no placar principal.
