# Matriz de implementação da interação direta

Escopo: ELO, PRUMO, PACTO e DESVIO. NEXO e Equilíbrio continuam removidos. Corte Certo, Reflexos e os 800 níveis existentes são preservados. Esta matriz foi registrada antes das alterações de implementação.

| Requisito | Implementação entregue | Verificação |
|---|---|---|
| ELO ponto atômico, exclusões, região fixa anotável | direct-actions.mjs + collection-ui.mjs | ações puras e eventos DOM |
| ELO conexões automáticas, cores, camadas sem interceptação | collection-ui.mjs + style.css | engine, DOM e inspeção SVG |
| PRUMO seleção persistente, apoios prioritários e incidentes protegidos | direct-actions.mjs + collection-ui.mjs | ações e eventos de marcador |
| PRUMO pincel de intenção fixa, interpolação e histórico unitário | direct-input.mjs + collection-ui.mjs | eventos ponteiro e undo |
| PACTO ciclo círculo/quadrado/triângulo/losango | direct-actions.mjs | ciclo completo e atalhos |
| PACTO paleta local, candidatos e notas atômicas | collection-ui.mjs | clique, teclado e longpress |
| DESVIO prévia, dois cliques, cancelamento e confirmação acessível | collection-ui.mjs | DOM + engine terminal |
| DESVIO modos local consensual, competitivo, bot coerente | collection-ui.mjs | histórico por par e restrições |
| Gestos canceláveis, segundo dedo e longa pressão | direct-input.mjs | emulação declarada de PointerEvents |
| Zoom, deslocamento e coordenadas opcionais | direct-input.mjs + collection-ui.mjs + style.css | transformação e navegação sem edição |
| Dicas reais em três etapas, aplicação explícita | direct-hints.mjs + collection-ui.mjs | deduções sem gabarito |
| Autosave, assistência, versão e migração | collection-ui.mjs + collection-state.mjs | reload e compatibilidade |
| Regras e controles dentro do site | collection-ui.mjs + documentação | inspeção dos controles |
| Vitória apenas após Confirmar resposta | collection-ui.mjs existente preservado | eventos não concluem sozinhos |
| Campanhas, gabaritos, animações e remoções preservados | módulos existentes intactos | suítes atuais e hashes |

A validação local mostra conflitos e pendências, mas a conclusão dos puzzles continua dependendo de Confirmar resposta, respeitando o fluxo anteriormente solicitado. O feedback de momentos do PRUMO é uma prévia didática explícita, não uma vitória automática. Nenhuma sincronização remota ou modo online é anunciado.

Estado final: implementação concluída e suíte reproduzível aprovada em 24/10/2026. Testes DOM não equivalem a testes em navegador ou dispositivo físico.

## Resultados executados

- 16 suítes integradas de eventos na UI: ciclo, candidatos, foco, pistas, seleção/arraste, cancelamento, segundo dedo, histórico, reload, bot e competitivo.
- 12 testes de ações puras; 11 suítes de gestos; 9 suítes independentes de gestos.
- 721 consultas de dicas em todas as 600 fases iniciais, com 400 conclusões verificadas; nenhuma leitura de gabarito ou busca exaustiva no módulo de dicas.
- Regressões existentes mantidas: 800 desafios, gabarito após três erros, assistência, validação explícita, animações, históricos removidos preservados, 200 PRUMO únicos e 25.868 posições de DESVIO.
- 26 arquivos existentes da versão anterior permaneceram byte a byte idênticos. Somente collection-ui.mjs, style.css e README.md existentes mudaram; os três módulos novos isolam ações, gestos e dicas. Motores, catálogos, soluções, Corte Certo e Reflexos +20% foram preservados.

Os testes antigos que selecionavam ferramentas distantes foram adaptados para os novos eventos/atalhos sem retirar verificações de regras, pistas fixas, salvamento, gabaritos ou confirmação. A revisão independente encontrou e corrigiu foco após reconstrução da paleta/apoios, captura indevida de atalhos nativos e reinício unilateral no modo competitivo.

Limite de validação: layout mobile, teclado virtual, orientação e interação física em navegador/dispositivo real ainda não foram verificados. Emulação de eventos não demonstra que essa etapa foi concluída.
