# Retirada de VÉRTICE

Solicitação explícita do usuário: retirar VÉRTICE do site. Referência: `f29224b94c5fedc4940103735954a0c7d44d3709`.

O catálogo mantém onze jogos: oito individuais e três Versus, na ordem DESVIO, BROTO e CERCO. Foram removidos o card, host, rota, importações, informações, pictograma, exemplo de regras, seletores exclusivos e os sete arquivos executáveis de `dist/vertice/`. A cena de vitória exclusiva foi retirada do helper compartilhado; os resultados e animações dos outros três duelos permanecem iguais.

Os endereços legados com `?game=vertice`, `#vertice`, `#game=vertice` ou segmento `/vertice` recebem fallback para Versus quando carregados pela aplicação. O fallback existente de TRAMA também é mantido. O atendimento HTTP de caminhos depende do servidor; a inspeção nativa de navegação fica com o responsável pela publicação.

Nenhum save local antigo é apagado. Histórico Git, registros arquivados e textos que usam “vértice” como conceito geométrico permanecem. Campanhas de Corte Certo, incluindo as quinze silhuetas avançadas, PNGs, motores e os demais jogos não são alterados.

`tests/remove-vertice.test.mjs` verifica onze entradas, preservação dos objetos dos jogos restantes, ausência de módulos executáveis, links legados, igualdade literal dos resultados Versus restantes, hashes de arquivos fora do escopo e invariância do contorno genérico do rodapé. Não substitui QA visual de navegador ou confirmação do deploy.

QA nativa: 394 verificações passaram nas larguras 1366, 390 e 320 px, incluindo as onze rotas, navegação/reload dos três duelos, fallback query/hash dos dois jogos retirados e restauração byte a byte dos saves. Capturas completas confirmaram três cards e contorno do rodapé preservados. Não equivale a teste em dispositivos físicos.
