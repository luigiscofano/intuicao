# Como jogar compacto

## Escopo

Os 19 jogos ativos compartilham o mesmo componente. O resumo preserva objetivo e os três passos originais. Expandir “Regras completas e detalhes” oculta esse resumo e mostra somente a lista completa original. Fechar restaura o resumo. A imagem permanece montada, sem reiniciar seu ciclo.

Os três cartões numerados sob a animação foram removidos. A legenda explicativa permanece com texto idêntico. O aviso genérico de repetição foi removido a pedido do usuário. SVGs, animações, tempos, conteúdo das regras e mecânicas não foram alterados.

## Apresentação

No desktop, texto e animação ficam lado a lado; a figura não impõe altura excedente ao resumo. A figura mantém limite de 210 px também durante a expansão. Na tela estreita, empilhamos as colunas e limitamos a área gráfica a 140 px, preservando a leitura dos textos em vez de espremê-los em duas colunas.

## Verificação

- 28 testes de regras aprovados, incluindo todos os 19 jogos.
- Browser QA: 19 jogos × 4 larguras (1280, 768, 390 e 320 px), abrir/fechar detalhes.
- 76/76: sem overflow, sem cartões numerados redundantes, resumo escondido quando expandido e restaurado ao fechar, dimensões da animação constantes entre estados.
- Desktop 1280: caixa entre 244 e 244,2 px. Referência enviada do Estalo era aproximadamente 465 px; o tamanho exato depende da largura.
- Não foram recriados SVGs nem alterados os arquivos que definem o movimento ou o conteúdo.

O disclosure nativo mantém operação por teclado. Movimento reduzido e suspensão fora da tela seguem o comportamento anterior.

## Refinamento de alinhamento

Título do exemplo, desenho e legenda compartilham largura máxima e eixo central. Nenhuma coordenada SVG ou movimento mudou. Verificação de 76 casos (19 jogos × 1280/768/390/320 px): todos alinhados, sem overflow.
