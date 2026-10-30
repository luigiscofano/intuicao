# Revisão independente — REPASSE80

Resultado: aprovado sobre as 80 definições finais, incluindo a retomada perpendicular no nível 68 (ID307).

## Método separado

`node tests/repasse80-independent.mjs` escreve `repasse80-independent-validation.json`.

O oráculo não usa transição, simulador, busca, assinatura de estado nem poda de impossibilidade do motor de produção. Percorre as coordenadas da grade em cada direção até o primeiro receptor, fixa valor e destinos antes das somas, contabiliza cada ordem de retirada em uma DAG de estados completos e poda somente metas já ultrapassadas. O tabuleiro vazio só vence quando **todas** as caixas, inclusive zeros, coincidem com as metas. Depois, uma ordem encontrada independentemente em cada fase é reproduzida no motor de produção.

A análise não confunde ordens distintas que convergem no mesmo estado: soma as contagens de todos os ramos vencedores. Reúne as precedências possíveis de todos os ramos e identifica as relações obrigatórias pela ausência da ordem inversa. Cada relação obrigatória recebe ainda uma busca explícita da ordem invertida; nenhuma encontrou vitória.

## Resultados

- 80/80 reproduções independentes e reproduções cruzadas no motor aprovadas.
- 6.757 ordens vencedoras no conjunto; múltiplas ordens são mantidas como válidas.
- 597 precedências obrigatórias, todas sem contraexemplo na busca invertida.
- Contagens de soluções e conjuntos de precedências coincidem com os certificados de produção em todas as fases.
- 48 níveis somente horizontal/vertical; primeiros30, cinco em cada faixa31–75, três no Modo Sábio, incluindo80.
- Todas as11configurações presentes e reaplicadas; nenhuma configuração de três setas.
- Estreias31/46/61 contêm exatamente uma peça nova e demais peças horizontais/verticais; nenhuma estreia antecipada.
- Limites4×4 e10peças respeitados. Todos os80IDs únicos mantêm suas definições físicas e versões idênticas às correspondentes do catálogo500 de v100.
- As14famílias principais têm evento concreto e suporte de precedência, não apenas rótulo. Nenhuma sequência de três famílias principais iguais.
- O Modo Sábio tem os cinco conceitos solicitados: proteção+janelas, reencontro, compartilhamento+revezamento, preparação de destinos e encerramento HV.

## Evidência causal relevante

A família “funções sucessivas” no nível58 (ID319) não é inferida de duas somas genéricas. A peça p1 recebe de p5, intercepta a contribuição de p7 para a caixa superior da coluna4 cuja meta é zero, sai, e sua posição é atravessada pelo repasse posterior de p3. As relações p5→p1, p7→p1 e p1→p3 são obrigatórias. A ordem p5/p7 entre si é somente a ordem testemunhada, não uma necessidade alegada.

O nível78 (ID337) tem apenas H/V, valor máximo observado7 e305soluções. p4 recebe contribuições necessárias de p5 e p1 em eixos diferentes. p3 recebe de p2, sai antes de p1 e então permite a p1 alcançar p4. Assim, compartilhar e revezar são ambos demonstrados.

O nível80 (ID500) mantém somente H/V: 561soluções e última peça obrigatória p10. A dificuldade depende da rede de27precedências, não da imposição de uma ordem única.

## Limites do parecer

O oráculo comprova propriedades finitas do catálogo e a causalidade das famílias principais; não mede empiricamente a dificuldade percebida por jogadores. Evidências secundárias observadas em uma solução não são automaticamente declaradas obrigatórias em todas as soluções. Preservação de interface e testes no navegador são trabalhos separados.
