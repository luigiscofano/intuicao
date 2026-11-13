# Estalo: expansão do catálogo

## Escopo

- Antes: 7 mapas, 4 tamanhos. Agora: **42 mapas, 6 tamanhos**, sete opções por tamanho.
- Grades: 4×4, 3×6, 4×6, 6×6, **6×8 e 8×8**.
- Referência verificada no código do Cerco: 28 mapas, quatro tamanhos, sete por tamanho.
- Os sete mapas anteriores mantêm IDs, vagens, direções, recortes e metas exatamente iguais.
- Não alteramos motor, regras, pontuação, vitória/empate, posse, três giros ou confirmação por segundo clique.
- Não há editor personalizado no Estalo: o catálogo é fixo. Configurações salvam `mapId`; IDs desconhecidos falham.
- Nenhum gerador Sem parar é incluído neste PR.

## Variedade e limites de equilíbrio

Sete composições por grade: Canteiro, Entrelaçado, Clareira, Ilha, Margens, Passagem e Trilha. Os nomes históricos permanecem onde já existiam. Em grades pequenas, as setas diferenciam os percursos; em grades maiores há também recortes. Miniaturas mostram as direções para não esconder essa diferença.

Cada layout tem vagens iguais por jogador, simetria rotacional com troca de posse e direção, área útil conectada, arranjo distinto e nenhuma vitória inicial. Isso **não prova equilíbrio perfeito** nem elimina necessariamente a vantagem de quem começa.

## Verificação automática

- Todos os mapas: renderização, dimensões, metas, conservação de pontos e término.
- 1.680 partidas simuladas completas (40 por mapa).
- 126 partidas completas de IA (três dificuldades por mapa) com orçamento curto, exercitando interrupção segura.
- 126 aberturas adicionais com limites de produção. Pior caso medido localmente em 8×8: aproximadamente 3 ms iniciante, 67 ms intermediário, 433 ms forte. Não é benchmark em telefone físico nem garantia de profundidade fixa.
- Saves, replay, desfazer/refazer, estados antigos sem `mapId` e rejeição de configuração inválida.
- Comparação direta dos sete layouts com v245: nenhuma mudança.
- Suíte Versus e testes comparativos de Cerco aprovados. A execução global indiscriminada possui 227 falhas históricas: mesmo conjunto antes e depois desta mudança, em v245. Não declaramos toda a suíte verde.

## Telas estreitas

Ferramentas de direção ficam imediatamente abaixo da grade em telas até 700 px, preservando toda a largura do tabuleiro. O espaço das ferramentas é reservado para a seleção não encolher a grade. Células respeitam as trilhas CSS, sem sobreposição.

Em 320 px, a grade 8×8 oferece células de cerca de 29 px: maiores que 24 px, mas menores que o alvo confortável de 44 px. As ações externas mantêm 44 px. Tab/Enter/Espaço continuam disponíveis, com foco visível e rótulos de coordenada, jogador e direção. O Clássico 4×4 continua padrão e os maiores são opcionais. Em 320×568 é necessária rolagem para reunir controles e legenda; não prometemos tudo simultaneamente visível nem desempenho de aparelho físico.
