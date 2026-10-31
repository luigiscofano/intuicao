# Seleção de mapas por cartões — BROTO e CERCO

Base eedcbe2583d9151098ba26fde193d52147f00591. O seletor de mapa em lista foi substituído por sete cartões compactos em cada jogo, inspirados nos cartões de DESVIO: miniatura de 72 px, nome, marca de selecionado e borda evidente. Quatro colunas no desktop e duas no mobile. Todas as descrições aprovadas permanecem literalmente iguais e aparecem abaixo ao escolher o mapa.

Configuração de modo, dificuldade, personagens, iniciar e continuar salvo permanecem nos blocos anteriores; nenhuma transferência de controles foi inferida. Trocar cartão só altera a escolha na preparação: não modifica o duelo salvo até iniciar. Não houve alterações nos motores, mapas, regras, assets, DESVIO ou demais jogos.

Produção: apenas dist/broto/ui.mjs, ui.css e dist/cerco/ui.mjs, ui.css. O seletor de modo de BROTO recebeu max-width/min-width no mesmo bloco para caber na largura útil de 320 px, incluindo a barra vertical do navegador.

Verificação: 80 testes Node aprovados (BROTO, CERCO, integração de mapas e cartões); 882 checagens no navegador real em 14 escolhas × 1366/390/320 px, incluindo seleção única, texto exato, tamanho das miniaturas, configurações preservadas, início correto, reload, reset e save byte-idêntico ao alternar cartões antes de iniciar. Sem overflow horizontal medido contra documentElement.clientWidth, não apenas a largura nominal da viewport. Enter e Espaço foram acionados nativamente nos dois jogos e selecionaram Jardim em cruz/Canais corretamente. Inspeção visual de ambas as grades em 320 px.

Limite: mobile em iframes responsivos no navegador real, não em aparelho físico. Fixtures fora de dist antes do empacotamento. Teste histórico de invariância dos mapas ajustado para comparar os dois arquivos visuais de VÉRTICE ao commit autorizado eedcbe2, mantendo o restante fixo.
