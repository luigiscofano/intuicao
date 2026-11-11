# Auditoria dos exemplos de Como jogar: versus

Data: 11/11/2026. Escopo: oito cartões ilustrados; nenhuma alteração em motores, mapas, controladores, saves ou pontuação.

## Entrega

- `dist/rules-versus-examples.mjs`: exporta `VERSUS_RULE_EXAMPLES`, com quatro passos, SVG 240 × 140 e descrição textual em português para cada jogo.
- `tests/rules-versus-examples.test.mjs`: nove testes, incluindo um exemplo reproduzido no motor de cada jogo.
- A imagem de referência `IMG_9919.jpeg` foi visualizada antes da implementação: lista numerada detalhada e ilustração verde suave, dourado e roxo, com traços simples.

Os exemplos são ilustrações, não estados persistidos. Os textos incluem objetivo, ação legal, restrições relevantes e pontuação/vitória/empate. As regras completas de montagem, incluindo orientação inicial das vagens e sinos, continuam nos módulos oficiais; os diagramas de ESTALO e ACORDE mostram seus arranjos iniciais reais.

## Evidência por jogo

| Jogo | Exemplo do diagrama | Conferência com motor |
| --- | --- | --- |
| ENLACE | Presilha em A2, verde até B2 e âmbar até A1; recorte A1–C3 | Cada rede passa de 5 a 6 pinos; trechos recebem cores independentes |
| VAZANTE | Recorte de linha 3: Verde B3→C3 arrasta Âmbar A3→B3 | `getConvoy`/`lastMove.convoy` e posições finais; nenhuma entrega |
| MOSAICO | A1/B1/A2/B2 com orientações 2/2/0/1 | Cantos internos [verde,verde,verde,âmbar]; +1 Verde mesmo sendo lance âmbar |
| QUINHÃO | Primeira oferta 1,2,3; Âmbar escolhe cesto 3 | Verde recebe duas castanhas, Âmbar uma pitanga; 21 cestos e próximo proponente âmbar |
| ESTALO | A1 sem giro: A1,B1,B2,C2,C3,B3 | Cadeia exata de seis casas; placar 4–2; retorno a B2 já aberta encerra |
| DOBRA | Selo verde em A1 seguido de dobra norte | 5 × 6; primeira linha com áreas 2; selo preservado; total 36 |
| ACORDE | Verde recolhe onda em B2 | Carrinho em B2, coleção +1 onda, rival limitado a B1/B3/B4 |
| LASTRO | D2 da distância 1 à 2 | Carga esquerda 10; direita 12; Δ = +2; vez passa ao rival |

VAZANTE e MOSAICO são exemplos locais deliberados; não são alegações de abertura completa. ENLACE é um recorte da abertura. Demais exemplos usam diretamente a abertura oficial.

## Animação e acessibilidade

Todos os SVGs usam os ganchos `rpd-action` e `rpd-result`, com estado final armazenado na geometria. Movimentos de peça usam `rpx-versus-move` e variáveis locais `--rpx-from-x`/`--rpx-from-y`. O integrador deve aplicar duração compartilhada `var(--rp-cycle,6s)` e repetição `infinite`, sincronizada com as outras classes. Não há temporizadores, mutação de estado, animações SMIL ou JavaScript de animação neste módulo.

CSS adicional solicitado ao integrador (não escrito neste escopo):

```css
.rules-preview .rpx-versus-move {
  animation: rp-versus-move var(--rp-cycle,6s) ease-in-out infinite;
}
@keyframes rp-versus-move {
  0%,18%,100% {
    transform: translate(var(--rpx-from-x,0px),var(--rpx-from-y,0px));
    opacity: .35;
  }
  42%,86% { transform: none; opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .rules-preview .rpx-versus-move {
    animation: none;
    transform: none;
    opacity: 1;
  }
}
```

Os SVGs são decorativos (`aria-hidden`) e cada entrada fornece descrição que o integrador deve expor em texto acessível. O movimento reduzido deve manter o estado final sem esconder peças ou resultados. Nenhuma transformação permanente precisa ser desfeita.

## Verificação executada

`node --check dist/rules-versus-examples.mjs`: aprovado.

`node --test tests/rules-versus-examples.test.mjs tests/versus/{enlace,vazante,mosaico,quinhao,estalo,dobra,acorde,lastro}.test.mjs`: **82 testes aprovados, zero falhas**.

Ainda a cargo da integração: captura visual em navegador, comportamento em largura móvel, loop compartilhado de 6 s e preferência de movimento reduzido. Nenhum navegador foi usado neste subescopo.
