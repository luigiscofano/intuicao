# Assinaturas dos tabuleiros lógicos

A assinatura de quatro azulejos do Refúgio foi reutilizada nos dez jogos da categoria pública de raciocínio lógico: ELO, PRUMO, PACTO, SINTONIA, REPASSE, PULSO, FOZ, REFÚGIO, MIRANTE e RENOVO.

## Escopo e preservação

- Cantos superior direito e inferior esquerdo, sem novos controles.
- Um único desenho SVG mantém curvas e cores do Refúgio.
- SVGs incorporam a assinatura no espaço já disponível, sem mudar viewBox ou dimensões. Tabuleiros HTML usam decoração absoluta na moldura, fora da grade.
- Elementos decorativos ignoram ponteiro, foco e leitores de tela.
- Nenhuma alteração em motores, campanhas, regras, dados salvos ou jogos Versus.
- Ambas as skins de Pulso e Refúgio recebem a assinatura. Desenho das peças e seletor de skin são preservados.

## Verificação

`tests/logica/board-signature.test.mjs` percorre as campanhas dos cinco renderizadores SVG e ambas as skins, verificando duas assinaturas dentro dos limites e ausência de mutação do estado. Verifica também os pontos de integração dos cinco jogos HTML e a categoria pública completa.

Os testes históricos de Refúgio, Foz e Mirante descontam exclusivamente a decoração autorizada; o restante continua comparado à versão anterior.

Inspeção visual local realizada no Chrome: Pulso em desktop e 390 × 844, Foz e ELO em 390 × 844, Repasse em desktop. Nos casos inspecionados as assinaturas ficam visíveis sem cobrir as peças. Não representa inspeção manual de todas as 800 fases; a cobertura de campanhas e limites SVG é automatizada.
