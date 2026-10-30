# Corte certo — campanha de 80 níveis

30/10/2026. Campanha no site privado existente; 80 fases, não 80 primeiros registros do catálogo antigo.

## Entrega
- `80-niveis-tabela.csv`: tabela dos 80 níveis, com faixa, família, figura, direção básica, meta, vazios, descoberta, origem e certificado.
- `80-niveis-certificados.json`: definições e resultados compactos por fase.
- `indice.md`: índice de consulta rápida.
- `pedagogia.md`: revisão da progressão, exceção explícita dos seis primeiros níveis e limites.
- `validacao-independente.json` e `testes.json`: evidências de geometria e integração.

## Conteúdo e identidade
Básico 1–15; Aprendiz 16–30; Intermediário 31–45; Avançado 46–60; Mestre 61–75; Modo Sábio 76–80. 69 definições mantêm a identidade anterior e 11 recomposições têm identidade nova. As fontes cobrem o catálogo completo de 100 fases; registros antigos permanecem preservados, sem transferir vitórias ou rascunhos por número. Modo Sem Parar e importações são separados.

Retas 1–6 são a exceção necessária à regra de não repetir uma família três vezes; prevalece a introdução explícita pedida. Depois do nível 6, não há três famílias iguais consecutivas. Estreias: parábola7, vazio11, seno16, cúbica31, cosseno39 e dupla curva46. Dupla curva continua uma única fronteira.

## Validação
Todas as 80 fases têm solução no eixo básico, sem girar ou mudar parâmetros. O gabarito arredondado permanece válido, o início fica fora da margem e cinco posições inteiras consecutivas ao redor da solução são aceitas. A menor faixa contínua de acerto tem 7,42 unidades. Tolerância preservada: ±3 pontos percentuais inclusivos, em todas as faixas; nenhuma exigência de solução idêntica à referência ou lados conectados.

O oráculo independente usa união de intervalos e integração por fatias, sem reutilizar o recorte poligonal do motor. Verifica área útil positiva, união dos vazios descontada uma vez apenas dentro da figura, sobreposição, recortes externos e concavidade. A maior diferença com o motor foi 0,001336 pp. Todos os 51 níveis com vazios têm efeito quantitativo na proporção ou na sensibilidade, não apenas decoração.

Testes de módulo/DOM cobrem os 80 níveis: confirmação explícita, três erros e gabarito ainda não confirmado, desfazer/refazer, reinício com confirmação e rascunhos independentes das abas. Os sete outros catálogos de 80 fases, motores, sprites, CSS, botões e renderização foram preservados. Opções avançadas auxiliares seguem exclusivas de Reflexos; a aba própria Controles da curva mantém Mover, Girar e Deslizar. Dicas visíveis seguem exclusivas de PACTO.

## Limites honestos
Não houve nova inspeção visual em navegador desktop ou celular: o caminho nativo ATSPI estava indisponível e DevTools foi negado pela organização. Não houve tentativa de contornar essa restrição. Verificações de DOM, geometria, responsividade estrutural preservada e identidade de arquivos não equivalem a validação visual em dispositivo nem a teste com jogadores.
