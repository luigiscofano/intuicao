# ELO: explicações das pistas

Base publicada: 0866506cb924eab8031cc4ec7e700f532348a63f.

Escopo: somente apresentação das pistas e integração do controle de explicações. A seção “Pistas desta fase” passa para a lateral de regras, evitando duplicação acima do mapa. Os códigos, símbolos, referências e textos anteriores são preservados. As explicações começam visíveis; o botão independente oculta somente as explicações. Fechar o painel, editar, desfazer/refazer, usar dicas, alternar opções avançadas e reiniciar preservam a escolha da partida. Nova fase ou nova entrada começa com explicações visíveis.

## Verificação local

- 200 fases comparadas com o módulo publicado: texto legado integralmente preservado nos estados visível e oculto; 502 explicações.
- As nove famílias estão cobertas, incluindo combinações: curvas/retas, passagens, trechos vedados, cotas de linha/coluna, distâncias, vizinhos, ordem, cortes e escolhas exclusivas.
- Exemplos sintéticos verificam zero/singular, coordenadas 12×12, região AA, IDs de grupo escapados e atributos ARIA únicos/estáveis.
- Getters privados que lançam erro garantem que a apresentação não consulta gabarito, perfil técnico ou trilha do solver.
- Integração executada com nível próprio que reúne as nove famílias, sem mudar progresso ou regras.
- Preservação exata de regras, solver, dados de campanha, respostas, dicas, saves, importador, outros jogos e decoração. Manifesto reversível independente, sem alterar hashes anteriores.
- Agregado final: 86 de 87 execuções passaram. A única falha é a histórica curiosity-brand-tests, que espera 10 folhas quando a base já contém 16.

## QA real pendente de publicação

Confirmar o painel e os códigos nas famílias das etapas 2–10; ocultar/mostrar com teclado, conferir foco, rerender, reset e independência do painel. Conferir linhas longas, grupos e região/célula exatos; ausência de seção duplicada sobre o mapa; borda da toolbar e dimensões do tabuleiro mantidas. O browser disponível não permite resize nativo; mobile foi coberto por contratos CSS, não por medição de viewport móvel. A importação real interrompida por falha de revisão de autorização não será repetida nesse QA; o nível próprio possui cobertura determinística local.
