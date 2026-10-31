# Retorno após a última fase de Corte certo

Correção pontual do comportamento preexistente registrado na entrega Mestre/Sábio: o botão inferior “Voltar ao início” agora chama a seleção de níveis quando o jogo é Corte certo, está na campanha (não livre nem importado) e chegou à fase 80. Todos os demais cliques conservam navigateLevel(1). A seleção mantém as oitenta fases e o progresso/rascunho; a seta lateral continua desativada no limite.

Uma única linha de produção em app.mjs mudou. Dois testes Node (incluindo 24 combinações de jogo/modo/posição) e 31 verificações nativas em1366/390/320 passaram: solução80→seleção, reentrada/draft,79→80 e1→2; saves restaurados integralmente. Sem mudanças de desenho, regras, dados, motor ou animação.
