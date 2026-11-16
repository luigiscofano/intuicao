# QUINHÃO

[Catálogo atual](../README.md) · [Projeto](../../../README.md) · [Arquitetura](../../arquitetura/README.md)

Ofereça três cestos. O rival escolhe primeiro.

## Objetivo

**Ofereça três cestos. O rival fica com um, e você recebe os outros dois.**

## Como começar

1. Ofereça três cestos vizinhos no anel. Considere só os cestos que ainda estão ali.
2. O rival escolhe um; você recebe os outros dois. Depois, troquem os papéis.
3. No fim, três tipos diferentes valem 5 pontos. Nas sobras, cada par de tipos diferentes vale 2; isolados não pontuam.

## Regras completas

1. Na sua vez de oferecer, escolha três cestos vizinhos no anel e confirme. O último e o primeiro também são vizinhos; espaços já vazios não separam os cestos.
2. O rival escolhe um dos três. Ele recebe esse fruto e você recebe os outros dois. Depois, os cestos retirados somem e os que sobraram voltam a ser vizinhos.
3. Quem acabou de escolher faz a próxima oferta. Continue até distribuir os frutos do mapa selecionado.
4. No seu depósito, cada trio com uma castanha-do-pará, uma pitanga e uma jabuticaba vale 5 pontos. Forme primeiro todos os trios possíveis.
5. Com as sobras, cada par de tipos diferentes vale 2 pontos. Um fruto só pode pontuar uma vez. Vence quem somar mais pontos; empate continua empate.

## Exemplo de raciocínio

Verde oferece duas castanhas e uma pitanga. Âmbar escolhe a pitanga; Verde fica com as castanhas.

## O que observar

A proposta é explorar decisões visíveis e consequências previsíveis em uma partida de duas pessoas, sem depender de reflexos ou precisão do mouse.

Não conclua uma solução apenas pela aparência. Leia as pistas da fase e confira a condição de término acima. O resultado depende do estado completo da partida, não de uma peça isolada. Mapas e grades disponíveis são os oferecidos pela preparação atual; não há campanha, desafio diário nem modo sem parar nesta família.

## Proposta pedagógica

Comparar ofertas, escolhas adversariais e combinações de recursos.

Essas são intenções de design e oportunidades de prática, não resultados acadêmicos medidos.

## Identidade visual e leitura

As cores, peças e ilustrações ajudam a distinguir estados e ações. A arte não concede poderes ou altera as regras. Veja a [galeria da identidade](../../identidade/README.md) e os [recursos de fauna e flora](../../../README.md#fauna-flora-e-objetos-com-funcao).

## Onde está implementado

- [dist/versus/games/quinhao/engine.mjs](../../../dist/versus/games/quinhao/engine.mjs)
- [dist/versus/games/quinhao/view.mjs](../../../dist/versus/games/quinhao/view.mjs)
- [dist/versus/games/quinhao/maps.mjs](../../../dist/versus/games/quinhao/maps.mjs)
- [dist/versus/CONTRACT.md](../../../dist/versus/CONTRACT.md)

As regras desta página foram confrontadas com os textos publicados em [game-info-content.mjs](../../../dist/game-info-content.mjs), os [guias rápidos](../../../dist/rules-quick-start.mjs) e os adaptadores próprios da família. Quantidades dependentes de mapa não devem ser tratadas como constantes universais.

## Preservação e verificação

O progresso usa o armazenamento local e o [backup compartilhado](../../../dist/progress-backup.mjs). Não reutilize número editorial como identificador de save. Ao alterar este jogo, confira ações válidas e inválidas, retorno à seleção, desfazer/refazer quando oferecidos, conclusão ou término, restauração e telas estreitas.

[Guia de testes](../../../tests/README.md) · [Qualidade](../../qualidade/README.md). Uma captura demonstra apresentação, não comprova sozinha toda a mecânica. As regras documentadas devem acompanhar o código, não substituir testes do motor.
