# ÓRBITA · campanha v2 (1.000 fases)

Esta revisão conserva as definições 1–200 e substitui 201–500, acrescentando 501–1000. As definições são objetos completos, não apenas seeds. `tests/orbita-build-v2.mjs` reconstrói o catálogo; `tests/orbita-v2-audit.json` contém a auditoria por fase, capítulo e faixa.

## Regras e compatibilidade

O algoritmo de permutação de `engine.mjs` não mudou. Somente o limite estrutural de encontros por par foi ampliado: a especificação pede três, quatro, cinco e ordens diferentes, sem fixar um máximo por par. Um conjunto pequeno de fases Mestre usa seis encontros transversais para tornar a ordem dos encontros não equivalente por rotação/reflexão; o limite total da campanha continua 14. Nenhuma casa pertence a três anéis.

As cotas exatas de anéis e encontros são verificadas. As faixas de complexidade são **predominantes**, conforme o texto do pedido, e não limites duros: os capítulos e as cotas contêm exceções incompatíveis com limites estritos (por exemplo, dois anéis no capítulo 19 da faixa Especialista).

A chave de armazenamento existente permanece. Conclusões, preferências e progresso não são apagados. Uma tentativa antiga em definição substituída é reiniciada na mesma fase; 1–200 continuam compatíveis. Endless preserva a definição completa antiga; a versão 2 seleciona reservas novas verificadas no motor e registra família, matriz e contagens para evitar repetição consecutiva.

## Geometria e variedade

Os pontos de curva não são automaticamente casas. `ring.path` contém o percurso fechado; seus marcadores `cell` identificam precisamente as casas físicas de `ring.cells`. A animação percorre o caminho real entre as casas. O validador confere todos os segmentos: encontros não marcados, sobreposições, autocruzamentos, triplicidade, ordem e posição dos marcadores, limites, distância entre casas e folgas fora dos arcos incidentes.

Loops arredondados, redes deslocadas, braids transversais, órbitas realmente aninhadas e círculos em pétalas são construções geométricas distintas. Quantidades ímpares de encontros entre dois loops simples incluem uma tangência marcada; não se inventa um cruzamento decorativo para obter a contagem.

A assinatura estrutural independe de pixels, nomes, símbolos e embaralhamento. Normaliza origem cíclica, direção dos percursos e renomeação de anéis/casas, preservando a identidade e a ordem dos encontros repetidos. A assinatura autoral acrescenta posição e equivalência dos alvos/sensores. Classes de símbolos que aparecem apenas nos sensores são canonizadas independentemente da ordem dos comandos (até oito classes no utilitário de autoria).

## O que as provas dizem — e o que não dizem

- A solução inversa é reproduzida no motor real: prova alcance, **não** optimalidade.
- Busca de atalhos e exclusão de órbita de comando único são distintas do comprimento do embaralhamento.
- Uma busca limitada por profundidade/estados não prova impossibilidade nem necessidade.
- Restauração cruzada exige testemunho de transporte entre regiões, não apenas um alvo corrigido.
- Reserva exige armazenar uma peça externa numa casa exclusiva durante outras ações e depois fazê-la sair.
- Efeito localizado identifica a permutação de identidades físicas, mesmo quando símbolos iguais escondem trocas.
- Rotas da rede são possibilidades estruturais; sensores, passo e ocupação podem restringir transporte real.
- Dificuldade e clareza são avaliações editoriais/geométricas, não resultados de testes com jogadores.

## Validação e inspeção visual

```sh
node tests/orbita-build-v2.mjs
node --test tests/orbita-*.test.mjs
node tests/orbita-render-v2.mjs
```

As folhas de contato usam os caminhos reais, posições, símbolos aprovados, alvos e sensores. São inspeções estáticas; não substituem teste de toque, foco, rolagem e layout num navegador real. O tabuleiro conserva fichas de pelo menos 30 px de diâmetro, com rolagem contida na sua própria área em telas estreitas. Nenhum novo seletor ou menu editorial foi adicionado.

A verificação em navegador a 320/390 px precisa ser registrada separadamente. Não se declara esse teste realizado apenas com cálculos de escala ou rasterização SVG.
