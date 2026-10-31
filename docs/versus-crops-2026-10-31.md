# Recortes dos personagens do Versus

Base f9e317f9c3d15b2a12beb9641af571255d616bc6. Pedido: somente o animal representado, sem rebarbas ou vizinhos.

## Causa e correção

O atlas não tinha defeitos: o SVG exibia uma folha inteira com viewBox retangular dentro de um quadro quadrado. `preserveAspectRatio="meet"` deixava margens adicionais; `overflow:hidden` no SVG externo recortava o quadro, não o retângulo do animal. Nessas faixas apareciam partes de animais vizinhos — na coral, por exemplo, trechos do peixe-boi abaixo.

Novo `dist/versus-mascot-art.mjs` centraliza quinze recortes medidos individualmente e um SVG interno com viewport explícito e overflow hidden. O recorte acontece antes do ajuste de proporção externo, sem IDs repetidos. Cada animal mantém todos os seus pixels não brancos e seis pixels de respiro na fonte. Não há geração, redesenho, recoloração, máscara da silhueta ou arquivo de imagem novo.

CERCO e `versus-mascots.mjs` delegam ao mesmo helper; TRAMA e VÉRTICE já usam esse módulo compartilhado. Assim a correção alcança preparação, cabeçalhos, peças, prévias, tutoriais e resultados onde os ícones já existiam. BROTO usa sprites diferentes e permanece intacto; DESVIO não usa esses ícones. Hero, modais de fauna, FAUNA_ART e atlas PNG originais não foram alterados.

## Verificação

- 10 testes Node aprovados: testes de recortes e personagens Versus.
- Varredura independente de todos os pixels com qualquer canal RGB<250: zero pixels originais perdidos nos quinze animais. Todos os recortes novos estão dentro dos anteriores.
- Hash de todos os arquivos de produção anteriores preservado, exceto as duas delegações do renderer. Motores, saves, paletas, controle vazio VÉRTICE, mapas e cartões intactos.
- 633 checagens em navegador real: quinze personagens em três jogos e larguras1366/390/320, ambos os jogadores com o mesmo animal, preparação, gameplay, prévias, cabeçalhos, tutorial, resultados e recarga. Todos os renderers usam o recorte interno correto, sem IDs globais; estados salvos e movimentos permanecem exatos.
- Inspeção visual conjunta dos quinze animais em fundos verde/amarelo, tamanhos20/24/32/52/78px. Sem pedaços vizinhos, extremidades completas e proporções preservadas. A coral não mostra mais fragmentos inferiores/laterais.
- Matriz matemática de proporções1:1/1:2/2:1 documentada na auditoria local; o recorte interno impede exposição externa independentemente do letterboxing.

Limite: mobile exercitado em iframe responsivo no navegador real, não em hardware físico. Fixtures retirados de dist antes de empacotar. Atlas original e todos os demais assets byte-idênticos.
