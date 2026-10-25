# SINTONIA — level design, geração e evidências

## Conteúdo implementado

A campanha tem 500 fases em 20 capítulos de 25, com 260 duplas, 190 trios e 50 quartetos. O primeiro trio é a fase 151 e o primeiro quarteto é a 376. Duplas continuam presentes até o capítulo final. A primeira fase requer um único comando; o caso de referência dos tabuleiros 2×3 está na fase 51.

As 500 topologias conjuntas são distintas após remover margens vazias, translação, ordem dos painéis e equivalências por rotação/reflexão global. Isso comprova variedade de configuração; não é uma alegação de equilíbrio subjetivo nem de inexistência de semelhanças de raciocínio.

Cada fase contém uma descoberta principal e até duas secundárias. Há exemplos das 14 famílias de raciocínio previstas. Nos primeiros passos, os conceitos secundários também incluem o comando conjunto e os destinos individuais. A frase interna “Aqui o jogador precisa descobrir que...” fica em `editorial.discovery`; `lesson` é a orientação curta apresentada ao jogador.

## Ritmo da campanha

Cada capítulo intercala 4 apresentações/focos, 8 combinações, 5 retomadas acessíveis, 4 desafios compactos, 3 de planejamento mais profundo e 1 síntese. A sequência é: foco, combinação, foco, compacto, retomada, combinação, foco, combinação, profundo, retomada, combinação, compacto, foco, combinação, retomada, combinação, profundo, compacto, combinação, retomada, combinação, compacto, profundo, retomada, síntese.

A dificuldade combina dependências de passagens, quantidade de posições a coordenar, irreversibilidade de alguns recursos e preparação de etapas. O número de comandos da tabela é uma evidência complementar; não define a dificuldade sozinho. Quedas de média entre capítulos são intencionais ao apresentar um novo elemento e ao retomar conceitos.

| Capítulo | Fases | Duplas/trios/quartetos | Comandos mínimos–máximos | Média do certificado |
|---|---|---|---|---:|
| 1. Primeiros passos | 1–25 | 25 / 0 / 0 | 1–6 | 4.2 |
| 2. Paredes que ajudam | 26–50 | 25 / 0 / 0 | 5–9 | 6.6 |
| 3. Ir para voltar | 51–75 | 25 / 0 / 0 | 5–12 | 7.3 |
| 4. Um ajuda o outro | 76–100 | 25 / 0 / 0 | 2–12 | 7.4 |
| 5. O cenário muda | 101–125 | 25 / 0 / 0 | 5–16 | 9.5 |
| 6. Preparar caminhos | 126–150 | 25 / 0 / 0 | 7–15 | 9.8 |
| 7. A terceira voz | 151–175 | 10 / 15 / 0 | 4–18 | 11.3 |
| 8. Construir apoios | 176–200 | 12 / 13 / 0 | 5–14 | 9.6 |
| 9. Distâncias diferentes | 201–225 | 13 / 12 / 0 | 4–17 | 9.2 |
| 10. Atalhos | 226–250 | 9 / 16 / 0 | 6–20 | 11.2 |
| 11. Escolher quando passar | 251–275 | 9 / 16 / 0 | 6–14 | 10.6 |
| 12. Dois caminhos | 276–300 | 9 / 16 / 0 | 5–19 | 13.4 |
| 13. Antes de voltar | 301–325 | 9 / 16 / 0 | 5–18 | 11.6 |
| 14. Revezamento | 326–350 | 9 / 16 / 0 | 9–19 | 13.6 |
| 15. Duas condições | 351–375 | 5 / 20 / 0 | 7–28 | 16.9 |
| 16. A quarta voz | 376–400 | 5 / 10 / 10 | 8–23 | 15.6 |
| 17. Conexões | 401–425 | 5 / 10 / 10 | 7–29 | 16.9 |
| 18. Um recurso compartilhado | 426–450 | 5 / 10 / 10 | 9–26 | 15.4 |
| 19. Tudo se encaixa | 451–475 | 5 / 10 / 10 | 10–32 | 17.8 |
| 20. Sintonia | 476–500 | 5 / 10 / 10 | 9–28 | 17.5 |

## Mecânicas e uso verificável

As estruturas escolhem metas do outro lado de uma aresta controlada, de uma região ligada por portal ou de um acesso consumível. A curadoria exige que o certificado use os eventos relevantes: cruzar a cancela, acionar o controle, empurrar a caixa, receber a entrega ou consumir a ponte. Configurações sol/lua e seletores exigem cruzar as duas configurações na solução.

Uma caixa só recebe a classificação “objeto com duas funções” quando o certificado a coloca sobre uma placa e depois contém um comando que deixa animal e caixa imóveis diante de um empurrão impossível, enquanto outro animal se move. Apenas possuir uma caixa e uma placa não é suficiente.

| Mecânica | Primeira fase | Fases que a utilizam |
|---|---:|---:|
| Paredes e recuos | 1 | 500 |
| Placas de pressão | 76 | 217 |
| Interruptores | 101 | 70 |
| Chaves | 126 | 38 |
| Caixas | 176 | 101 |
| Gelo | 201 | 58 |
| Portais | 226 | 59 |
| Sentido único | 251 | 44 |
| Sol e lua | 276 | 32 |
| Pontes frágeis | 301 | 40 |
| Revezamento | 326 | 26 |
| Duas condições | 351 | 25 |
| Seletores | 401 | 25 |
| Entrega de caixas | 426 | 25 |

## Compatibilidade desta versão

| Relação | Contrato |
|---|---|
| Animal e piso comum | Uma casa por comando; parede, borda ou passagem fechada mantém o animal parado. |
| Placa e animal/caixa | Ocupação final mantém a passagem; todos usam a configuração capturada no início. |
| Caixa e piso comum/placa | Empurrão de uma casa, sem puxar nem empurrar cadeias. Cancelas e sentidos únicos valem para animal e caixa. |
| Caixa e chave/interruptor/seletor | A caixa pode ocupar piso transitável, mas só o animal ativa esses gatilhos. O catálogo evita sobreposições didaticamente ambíguas. |
| Caixa e gelo/portal/ponte frágil | A validação rejeita qualquer percurso conservador acessível à caixa que alcance esses terrenos. Combine em outros tabuleiros. |
| Animal e gelo | O deslocamento prossegue até o primeiro piso comum ou bloqueio; não depende de animação ou tempo. |
| Animal e portal | Um transporte dentro do próprio tabuleiro encerra o comando; não há retorno automático. |
| Animal e ponte frágil | A casa desaparece após a saída; desfazer restaura a configuração inteira. |
| Controle e cancela | Uma regra explícita por aresta. A mudança do controle vale para o comando seguinte. |
| Entrega e saída ocupada | O envio inteiro é cancelado, incluindo o empurrão do remetente. A ocupação inicial e as intenções concorrentes são verificadas. |
| Duas entregas para a mesma saída | Ambas são bloqueadas; a ordem dos painéis não define prioridade. |
| Canais em ciclo | Redes cíclicas são rejeitadas pelo validador; uma caixa nunca inicia uma transferência encadeada automaticamente. |

## Resistência à repetição de botões

Apenas a fase 1 é resolvida repetindo uma única direção: ela apresenta o controle básico. A busca exaustiva de varreduras até bloqueio, verificando vitória após cada passo, resolve 8 fases (1, 3, 4, 6, 7, 9, 11, 12), todas no conjunto introdutório. Nenhuma fase de 13 a 500 é resolvida por esse procedimento. Não houve auditoria de varredura inconclusiva.

Foram testados 40 padrões cíclicos curtos por fase. 12 fases aceitam algum desses padrões (1, 2, 3, 4, 6, 7, 9, 12, 16, 45, 85, 99); isso é registrado, não ocultado, porque um ciclo curto pode ser a própria descoberta. O detector usa estado completo mais índice no padrão e testa vitória a cada comando.

As simulações de 128 comandos registraram 275 vitórias em 6000 tentativas com tendência a repetir uma direção e 959 em 6000 tentativas uniformes. Esses números são diagnósticos reproduzíveis de uma amostra fixa, não uma estimativa de dificuldade humana. Repetições legítimas não são bloqueadas durante a partida.

## Endless

`generator.mjs` constrói grafos compactos novos com crescimento de corredores, recuos, circuitos, componentes e relações de controle. Varia posições iniciais, metas conjuntas, topologia, orientação relativa e funções dos tabuleiros. Não carrega a campanha como fonte dos desafios. A busca em largura explora estados do motor único e escolhe metas com um certificado de solução; o replay final é obrigatório antes do retorno.

Semente, versão do gerador e parâmetros controlam as escolhas. O limite de estados/profundidade é determinístico. Se o relógio esgota o orçamento, a chamada inteira falha: ela não escolhe uma meta de um conjunto parcial dependente da velocidade da máquina. O serviço pode então selecionar o banco de segurança, com origem identificada internamente. Uma tentativa esgotada não é declarada insolúvel.

O histórico de mecânicas limita cada introdução a uma regra desconhecida. Na ausência de pedido explícito de quantidade, essa introdução usa dois animais e uma solução de até 14 comandos. Depois, regras conhecidas podem reaparecer juntas. A UI controla a cadência de progressão e interlúdios; o gerador respeita a dificuldade e a quantidade recebidas.

O banco de segurança contém 36 definições próprias, seis por faixa, geradas a partir de sementes diferentes da campanha. A seleção prioriza definições ainda não usadas e valida novamente o certificado por replay. Não realiza busca síncrona na interação. Todas as definições completas são preservadas pelo estado da sessão; guardar só a semente não é a política de retomada.

A assinatura normalizada participa do histórico recente. Ela evita repetir apenas aparência, translação, giro, espelhamento global ou ordem dos painéis. A continuidade não implica uma promessa de unicidade global infinita.

As últimas 24 famílias, em ordem cronológica, também orientam a variedade. Entre mecânicas já aprendidas, uma ponderação determinística favorece famílias menos recentes; ela não proíbe opções, não acrescenta tentativas e não bloqueia a introdução da próxima regra. Nos desafios de paredes, a classificação só escolhe descobertas observadas no certificado. O banco de segurança aplica a mesma preferência com penalidade máxima de 12,5, inferior às penalidades de assinatura repetida (100) e desafio já usado (50). Sem histórico de famílias, a sequência do gerador permanece a mesma.

## Arquivos e reprodução

- `dist/sintonia/campaign.mjs`: 500 definições completas formatadas, soluções e metadados.
- `dist/sintonia/generator.mjs`: estruturas, RNG, seleção de metas, assinaturas, diagnósticos e regras de introdução.
- `dist/sintonia/fallback.mjs`: 36 definições independentes e seleção certificada sem busca.
- `tests/sintonia-build-campaign.mjs`: receita determinística da campanha e do banco.
- `tests/sintonia-campaign-audit.json`: contagens, presença das mecânicas, ritmo, resistência a repetição e limites da avaliação.
- `tests/sintonia-catalog.test.mjs`: validação de conteúdo e geração; execute com `node tests/sintonia-catalog.test.mjs`.
- `tests/sintonia-document-catalog.mjs`: gera este documento e o índice de 500 linhas.

Para reconstruir os dados, execute `node tests/sintonia-build-campaign.mjs`, depois os testes e `node tests/sintonia-document-catalog.mjs`. O build falha se faltar uma fase, uma distribuição, uma solução ou um requisito de novidade. A inspeção visual e os testes de interface são responsabilidades complementares aos certificados do catálogo.
