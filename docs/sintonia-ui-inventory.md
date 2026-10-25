# SINTONIA · inventário de padrões e aplicação

Inspeção do código de Reflexos/Corte certo (`dist/app.mjs`, `dist/index.html`) e da coleção ELO/PRUMO/PACTO/DESVIO (`dist/collection-ui.mjs`). A inspeção de navegador e regressão visual da integração é registrada na validação geral do projeto.

| Padrão observado | Origem existente | Aplicação no SINTONIA |
|---|---|---|
| Marca, navegação de jogos, moldura de árvores, rodapé e modal sobre o projeto | `index.html`, `platform.css`, `logo.css`, `about-dialog.mjs` | Permanecem na página real. SINTONIA adiciona apenas sua entrada de navegação. A seleção recebe a mesma tipografia, moldura e cartões por CSS local. |
| Card de informações do jogo junto ao título | `game-info.mjs`, `game-info-content.mjs` | Títulos `s-selection-title` e `s-title` são pontos de integração do componente compartilhado. |
| Seleção de níveis disponível sem bloqueio | `app.mjs`, `collection-ui.mjs` | 500 cartões com conteúdo real, 20 capítulos e estado de conclusão. Squircles com as mesmas dimensões, cores, sombras, estados e legenda dos jogos existentes. |
| Retomar tentativas e manter progresso local | `light-campaign-progress.mjs`, `collection-state.mjs` | Namespace `intuicao.sintonia.v1`, sessões de campanha por ID e sessão Endless independente. Histórico reconstituído pelo motor, conferido contra estado salvo. |
| Desafio do dia | `collection-ui.mjs`, `dailyIndex` em `collection-state.mjs` | Escolha estável diária entre as 500 fases. Mantém resultado na campanha da fase correspondente. |
| Modos Desafios/Endless | `app.mjs`, `collection-ui.mjs`, `endless.css` | Mesmos botões de modo e painel de opções, dificuldade inicial, novo desafio, avanço automático após conclusão. Na seleção, os botões primários Explorar modo livre e Desafio de hoje ficam lado a lado na mesma faixa de ações compartilhada pela coleção. Configurações ficam dentro do Endless. |
| Desfazer/refazer em comandos completos | `collection-state.mjs`, controles originais | Um comando que muda o estado inteiro é uma entrada. Bloqueios sem alteração não contam. Caixa, conexão, chave, ponte e cancelas são restaurados juntos. Histórico de refazer persiste. |
| Reinício com confirmação visual | `restart-confirmation.mjs` | Componente original `createRestartConfirmation`, mesmo foco isolado, cancelar/Escape e proteção contra ações obsoletas. Reiniciar não gera novo Endless. |
| Regras como painel lateral, opções avançadas separadas | `rules-sidebar.css`, `collection-ui.mjs` | Mesma disclosure e painel, aberto por padrão ao entrar ou retomar uma fase em qualquer modo; o jogador pode ocultá-lo durante a partida. Mecânicas desconhecidas recebem explicação contextual. Em telas pequenas o painel passa para baixo dos mapas. |
| Confirmar, dicas, próximo nível, gabarito assistido após tentativas | `collection-ui.mjs`, `answer-progress.mjs` | Vitória é conferida automaticamente por regra do jogo; Confirmar também informa a configuração e habilita gabarito após três conferências incompletas. Dica em três camadas usa o estado atual; gabarito mantém cada passo no histórico. |
| Celebração de resultado | `result-motion.mjs` | Mesmo `createResultMotion`; extensão compatível do nome/caption pelo integrador. Só sucesso conjunto exibe celebração. |
| Navegação por setas ao lado do tabuleiro | `index.html`, `collection-ui.mjs` | Anterior/próximo da campanha, sem bloquear níveis. O número do desafio aparece como texto, sem menu suspenso. Em celular as setas ficam abaixo do conjunto para preservar largura dos mapas. |
| Editor, importar JSON, exportar nível, exportar métricas locais | `original-json.mjs`, `collection-json.mjs`, `collection-ui.mjs` | Validação estrutural e reprodução de solução; busca em worker se o arquivo não trouxer certificado. Arquivo inválido/inconclusivo preserva a partida. Não há upload. |
| Estado de erro e geração preservando partida | `endless-collection.mjs`, `collection-ui.mjs` | Texto de status, cancelamento de pedidos obsoletos, duas próximas candidatas preparadas, certificado obrigatório e recuperação pelo serviço. |
| Atalhos e toque acessíveis | `direct-input.mjs`, handlers dos jogos | Setas/WASD somente na área dos tabuleiros ou controles direcionais. Campos, menus, links e diálogos mantêm teclado normal. Repetição automática de tecla é ignorada sem impedir comandos repetidos deliberados. |
| Preferência por movimento reduzido | `style.css`, `platform.css` | Animações locais respeitam `prefers-reduced-motion`; estado lógico independe de efeitos visuais. |
| Registro de eventos locais | `collection-state.mjs` | Reutiliza `recordEvent` com o documento próprio do SINTONIA; não grava no namespace da coleção. Exportação real de eventos, sem rastreamento externo. |

## Recursos que não existem no site inspecionado

Não foram encontrados serviços de login/perfil, contas, ranking, favoritos, conquistas com recompensas, sons ou opção global de volume. A integração não cria substitutos fictícios. Os ícones de ajuda, preferências e progresso existentes permanecem funcionais.

## Regras específicas de apresentação

- Os quatro animais são representados pelos PNGs aprovados fornecidos pelo integrador. O renderer lê a folha e a grade de quadros em `assets.mjs`, sem modificar o arquivo.
- Cada mapa é sempre visível; dois e quatro formam duas colunas. Trio usa três colunas quando há espaço e uma segunda linha compacta no celular.
- Rótulos P/I/C/S/O/E identificam placas, interruptores, chaves, seletores, portais e entregas. Portões mostram os mesmos rótulos. Tocar em um elemento do mapa destaca os elementos conectados; tocar novamente limpa o destaque. O painel separado de inspeção foi removido.
- Leitores de tela encontram nome e posição do animal, destino, descrição de cada casa e lista de passagens. Os botões da antiga legenda de conexões foram removidos.
- Sementes, certificados e fila de geração ficam no modelo e nas exportações avançadas, sem poluir os controles da partida.

## Limite da evidência

O inventário documenta inspeção do código. Os testes de histórico/persistência são automáticos. A validação final deve distinguir testes automatizados, inspeção visual de navegador e calibração com jogadores; não se declara que as 500 fases foram testadas por pessoas.
