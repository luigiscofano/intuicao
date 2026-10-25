# SINTONIA — redesign de conteúdo, geração e evidências

## Revisão e escopo

**Conteúdo `sintonia-content-2`; gerador 2; regras 1.** A revisão altera problemas, posições, caminhos, recursos e dependências, não regras de movimento, desenhos, estilos ou animações. O motor `dist/sintonia/engine.mjs` permanece byte-idêntico à base v81 (commit `a9f4bd4d58218f474a5eba3cd54700ff6b1b134b`): SHA-256 `db5503ca8fcff67526cab621be89c472c1afb75b2083b9c69d9f98859fe8eece`. A migração usa textos explicativos na interface existente; não cria um layout novo.

A campanha contém 500 fases, 20 capítulos de 25 e 6 faixas: 260 duplas, 190 trios e 50 quartetos. O primeiro trio está na 151; o primeiro quarteto, na 376. As primeiras ocorrências de mecânicas são conferidas na tabela abaixo.

Foram mantidos **76 mapas (1–75, 176)** e reconstruídos **424**. A fase 1 conserva o primeiro comando conjunto; a 51 conserva o caso compacto de parada intermediária e saída temporária da meta; a 176 conserva a demonstração deliberada de um único empurrão. As primeiras 75 permanecem como base geométrica introdutória, com a justificativa e os diagnósticos registrados — isso não equivale a testes humanos. A 426 apresenta a entrega com 2 animais; a troca com a 430 (4 animais) conserva a quota do capítulo 18.

221 definições da campanha usam os construtores com papéis e relações declarados antes da busca de metas. As demais reconstruções usam a gramática geométrica e as condições do gerador, com certificação e análise de eventos. “Reconstruída” indica mudança real de definição, não aprovação editorial automática nem garantia de originalidade de raciocínio.

As 500 fases possuem replay vencedor; 500 certificados registram optimalidade. Há 500 assinaturas de definição e 500 topologias conjuntas distintas após retirar margens/translação, permutar painéis e normalizar rotação/reflexão global. Geometria distinta não demonstra descoberta distinta. A assinatura lógica complementar e suas repetições são publicadas na auditoria de propósito, sem prometer equivalência matemática.

## Caixas: orientação, acesso, apoio e liberação

A receita única “caixa adjacente → alcova com placa → esquecer” deixa de orientar o conteúdo reconstruído. Os padrões escolhem primeiro o papel do recurso e as regiões que ele precisa relacionar; não aumentam um corredor apenas para produzir mais empurrões. Remover lados de um circuito altera as faces de empurrão acessíveis, em vez de acrescentar decoração. A proximidade entre caixa e placa não é proibida: a apresentação da 176 mantém sua justificativa.

| Padrão | Decisão que organiza a composição | Campanha | Reservas |
|---|---|---:|---:|
| `turn-and-support` | Alcançar outra face da caixa para orientar o apoio, mantendo a saída acessível. | 13 | 0 |
| `park-and-retrieve` | Afastar a caixa do apoio, estacionar sem prendê-la e recuperar a face oposta. | 11 | 1 |
| `support-then-release` | Sustentar a passagem até uma chave; depois retirar a caixa da casa que precisa receber o animal. | 6 | 2 |
| `remote-relay` | A caixa assume uma ajuda enquanto outro animal ainda preserva o acesso de retorno. | 7 | 0 |
| `support-and-necessary-stop` | Sustentar uma travessia e depois oferecer um bloqueio físico indispensável à coordenação; consultar a prova do predicado. | 0 | 0 |

A família `dual-use-object` não é mais atribuída só porque o certificado encostou numa caixa imóvel. No padrão `support-then-release`, descreve a transição entre sustentar uma travessia e liberar a chegada. Um bloqueio observado continua sendo apenas um evento do testemunho; só uma comparação ou busca de evasão adequada pode sustentar uma alegação de segunda função necessária.

### Apoio e bloqueio real: o oitavo padrão do plano

Na fase **423**, o padrão principal é `selector-recipient-with-supported-stop` e a função secundária é `support-and-necessary-stop`. A caixa do bem-te-vi sustenta uma cancela e, em um comando posterior, serve como bloqueio físico enquanto outro animal se move. Isso não é inferido apenas de um empurrão bloqueado no certificado.

O predicado exige que a passagem entre animal e caixa esteja aberta, que o empurrão seja fisicamente impossível e que o apoio da mesma caixa já tenha sido consumido por uma travessia em comando anterior. Uma cancela fechada no caminho até a caixa não conta; uma travessia no mesmo comando não fabrica a ordem de funções.

A busca de evasão `box-supported-stop:box0`, no fingerprint desta definição, esgotou **15854 estados** sem vitória evitando esse papel: necessidade demonstrada sob esse predicado exato. Não demonstra solução única, dificuldade humana nem que todo bloqueio de outra fase seja necessário.

O Endless também dispõe de uma composição compacta própria de apoio seguido de bloqueio, sem reciclar a fase 423. Cada candidata aceita nessa ramificação exige replay e busca de evasão exaustiva do bloqueio após apoio; resultado inconclusivo ou contraexemplo impede sua aceitação. Não se estende a prova de uma orientação às demais sem repetir a consulta.

Os números seguintes contam **eventos dos certificados**, não propriedades universais de todas as soluções. Uma caixa pode ser necessária e ainda representar uma decisão trivial; mais empurrões, isoladamente, não resolvem essa questão.

| Evidência no certificado da campanha | Base v1 | Revisão atual |
|---|---:|---:|
| Fases com caixas | 101 | 90 |
| Caixas | 103 | 90 |
| Caixas com exatamente um empurrão | 103 | 1 |
| Caixas com mais de um empurrão | 0 | 89 |
| Caixas com mudança de direção | 0 | 89 |
| Caixas retiradas após sustentar uma travessia | 0 | 6 |
| Caixas entregues | 25 | 26 |
| Caixas empurradas pelo receptor após entrega | 0 | 26 |

## Entrega: preparar os dois lados e reutilizar o recurso

A saída do canal começa ocupada pelo receptor e precisa ser liberada em um comando anterior. A caixa não chega diretamente à placa de destino: o receptor ainda precisa encontrar a face útil de empurrão. Nas variantes de remetente preparado pelo lado errado, é necessário preservar o contorno antes do envio. Em trios/quartetos, os ajudantes possuem condições próprias na cadeia de apoio, em vez de serem simplesmente mapas independentes adicionados ao conjunto.

| Padrão | Relação principal | Campanha | Reservas |
|---|---|---:|---:|
| `receive-turn-support` | Liberar a saída, receber, reorientar e sustentar os acessos. | 10 | 1 |
| `receive-hold-return` | Após receber e orientar, preservar a placa do remetente até o retorno do receptor. | 10 | 0 |
| `receive-clear-circuit` | Deslocar a caixa recebida lateralmente e conservar o circuito para alcançar outra face. | 6 | 1 |

A prova de orientação no receptor precisa ignorar empurrões anteriores do remetente. Uma mudança de direção entre painéis não conta automaticamente como reposicionamento no painel de destino. O relatório de propósito usa um monitor específico para esse predicado.

## Obstáculos e relações sem caixas

`obstacle-design.mjs` seleciona braços e regiões com trabalhos distintos antes da escolha final de metas. Chaves e interruptores ficam em desvios de preparação, não apenas no meio do trajeto obrigatório. Passagens de sentido único e pontes podem separar o controle ainda necessário; outra composição de sentido único exige um retorno por uma saída diferente. O portal leva à preparação em outra ilha e precisa ser usado novamente para voltar à região de chegada. Animais adicionais recebem controles que liberam cortes separados.

| Padrão declarado | Campanha | Reservas |
|---|---:|---:|
| `key-fork-before-exit` | 38 | 1 |
| `switch-fork-before-exit` | 38 | 1 |
| `oneway-prepare-before-commit` | 17 | 1 |
| `oneway-independent-return` | 7 | 0 |
| `fragile-prepare-before-commit` | 28 | 1 |
| `portal-retrieve-and-return` | 30 | 1 |

### Configurar antes do compromisso: o décimo padrão do plano

Na fase **251**, a capivara prepara um interruptor antes de abandonar a região de controle pela aresta de sentido único. O tuiuiú precisa aproveitar a configuração da cancela; o bem-te-vi conserva sua tarefa distinta de chave. O Endless pode construir essa família com interruptor ou chave já conhecidos, sem antecipar mecânicas novas.

O prefixo **↓ ↓** cruza cedo demais. A continuação no mapa original é insolúvel por exaustão de **65 estados**. Retirar apenas a restrição direcional, preservando exatamente o mesmo estado, permite recuperar em **14 comandos**, com 1200 estados visitados.

Uma busca global com estado completo mais memória de preparação e violação esgotou **1792 estados**: nenhuma vitória atravessa antes de um comando anterior ter configurado o interruptor como verdadeiro. Os limites e fingerprints ficam em `tests/sintonia-commitment-evidence.json`, reproduzidos por `tests/sintonia-commitment.test.mjs`.

A alegação mais forte “o interruptor ainda precisa estar verdadeiro no momento do compromisso” foi **refutada** por uma solução de 16 comandos. Depois que o receptor já atravessou, é possível desligar e partir. Preparar antes não significa manter a ajuda para sempre. Esse contraexemplo é preservado no relatório, não ocultado.


Placas, gelo, sol/lua, revezamento, AND e seletores continuam no catálogo e nas regras existentes. As condições escolhidas e os eventos do certificado são verificáveis; não se afirma que cada parede, espera ou restrição recebeu uma prova universal de necessidade. Exceções, variantes equivalentes e limites de orçamento não são ocultados pela classificação editorial.

## Ritmo, distribuição e introduções

Cada capítulo conserva quatro focos, oito combinações, cinco retomadas acessíveis, quatro desafios compactos, três desafios de planejamento profundo e uma síntese. Ordem: foco, combinação, foco, compacto, retomada, combinação, foco, combinação, profundo, retomada, combinação, compacto, foco, combinação, retomada, combinação, profundo, compacto, combinação, retomada, combinação, compacto, profundo, retomada, síntese. “Foco” tardio reinterpreta uma relação conhecida; “síntese” não obriga reunir todos os ícones.

Os comandos abaixo descrevem os certificados efetivos por capítulo, não metas artificiais de comprimento nem notas de dificuldade humana. Dependências antecipadas, alternativas, recuperação e carga de coordenação precisam de avaliação separada.

| Capítulo | Fases | Duplas/trios/quartetos | Mantidas/reconstruídas | Comandos mín.–máx. | Média |
|---|---|---|---|---|---:|
| 1. Primeiros passos | 1–25 | 25 / 0 / 0 | 25 / 0 | 1–6 | 4.2 |
| 2. Paredes que ajudam | 26–50 | 25 / 0 / 0 | 25 / 0 | 5–9 | 6.6 |
| 3. Ir para voltar | 51–75 | 25 / 0 / 0 | 25 / 0 | 5–12 | 7.3 |
| 4. Um ajuda o outro | 76–100 | 25 / 0 / 0 | 0 / 25 | 3–12 | 7.4 |
| 5. O cenário muda | 101–125 | 25 / 0 / 0 | 0 / 25 | 3–14 | 9.8 |
| 6. Preparar caminhos | 126–150 | 25 / 0 / 0 | 0 / 25 | 5–15 | 10.0 |
| 7. A terceira voz | 151–175 | 10 / 15 / 0 | 0 / 25 | 7–20 | 13.0 |
| 8. Construir apoios | 176–200 | 12 / 13 / 0 | 1 / 24 | 7–18 | 13.2 |
| 9. Distâncias diferentes | 201–225 | 13 / 12 / 0 | 0 / 25 | 4–17 | 9.9 |
| 10. Atalhos | 226–250 | 9 / 16 / 0 | 0 / 25 | 6–21 | 13.8 |
| 11. Escolher quando passar | 251–275 | 9 / 16 / 0 | 0 / 25 | 6–23 | 14.8 |
| 12. Dois caminhos | 276–300 | 9 / 16 / 0 | 0 / 25 | 8–22 | 14.8 |
| 13. Antes de voltar | 301–325 | 9 / 16 / 0 | 0 / 25 | 9–24 | 15.2 |
| 14. Revezamento | 326–350 | 9 / 16 / 0 | 0 / 25 | 7–24 | 14.2 |
| 15. Duas condições | 351–375 | 5 / 20 / 0 | 0 / 25 | 7–32 | 16.4 |
| 16. A quarta voz | 376–400 | 5 / 10 / 10 | 0 / 25 | 7–23 | 16.2 |
| 17. Conexões | 401–425 | 5 / 10 / 10 | 0 / 25 | 10–25 | 18.8 |
| 18. Um recurso compartilhado | 426–450 | 5 / 10 / 10 | 0 / 25 | 10–29 | 19.6 |
| 19. Tudo se encaixa | 451–475 | 5 / 10 / 10 | 0 / 25 | 9–30 | 18.1 |
| 20. Sintonia | 476–500 | 5 / 10 / 10 | 0 / 25 | 9–31 | 18.7 |

| Mecânica | Primeira fase | Fases com a mecânica |
|---|---:|---:|
| Paredes e recuos | 1 | 500 |
| Placas de pressão | 76 | 213 |
| Interruptores | 101 | 83 |
| Chaves | 126 | 122 |
| Caixas | 176 | 90 |
| Gelo | 201 | 39 |
| Portais | 226 | 41 |
| Sentido único | 251 | 38 |
| Sol e lua | 276 | 32 |
| Pontes frágeis | 301 | 32 |
| Revezamento | 326 | 26 |
| Duas condições | 351 | 25 |
| Seletores | 401 | 25 |
| Entrega de caixas | 426 | 26 |

## Propósito: três tipos de evidência, sem confundi-los

1. **Testemunho de uso:** `analyzePurpose` reproduz a sequência fornecida e registra caminhos da caixa, mudanças de direção, ocupações/liberações de placas, travessias sustentadas, entregas, movimentos/esperas e saída das metas. Prova o que ocorreu nessa sequência.
2. **Ablação controlada:** uma cópia válida remove a caixa, substitui-a por parede quando possível, começa na posição final, abre uma cancela/grupo de controles, torna gelo piso comum ou ponte permanente, retira sentido único ou desativa portal. A hipótese e a comparabilidade precisam ser lidas junto do resultado. Desconectar uma região não demonstra um bom atalho.
3. **Busca de evasão:** procura uma vitória sem o evento ou a ordem anunciados. Usa o estado lógico completo mais os monitores relevantes. Um contraexemplo refuta necessidade; esgotar completamente o espaço prova apenas o predicado exato. Atingir orçamento de estados, tempo ou profundidade é **inconclusivo**, nunca “insolúvel” nem “necessário”.

`tests/sintonia-purpose-audit.json` registra sementes, revisões, fingerprints, limites, testemunhos, ablações, contraexemplos e consultas inconclusivas para campanha e banco. [O relatório separado](sintonia-purpose-evidence.md) resume as evidências e as fases 177, 200, 426 e 500. A assinatura lógica é uma classificação revisável de dependências/papéis/ordem observada, não promessa matemática de que duas fases exigem raciocínios diferentes. A verificação de fingerprint impede reutilizar uma prova após alterar mapa ou solução.

**Rubrica e testes humanos permanecem pendentes.** As seis dimensões propostas — propósito, descoberta, interdependência, clareza causal, economia espacial e variedade — não recebem aprovação automática a partir de replay, número de estados ou contagem de empurrões. Não foram observados jogadores nem confirmadas empiricamente compreensão, diversão, dificuldade ou variedade percebida. Os requisitos humanos do plano não são declarados concluídos.

## Diagnósticos de repetição

Repetição de uma única direção vence nas fases: **1**. A varredura até bloqueio, com vitória conferida em cada passo intermediário, vence em 8 fases: 1, 3, 4, 6, 7, 9, 11, 12. Consultas de varredura inconclusivas: nenhuma. Não se transforma busca incompleta em resistência provada.

Nenhuma fase de 13 a 500 foi resolvida por esse procedimento nas auditorias completas registradas.

Foram testados 40 padrões cíclicos curtos por fase. 14 fases aceitam pelo menos um: 1, 2, 3, 4, 6, 7, 9, 12, 16, 45, 80, 81, 85, 105. O detector inclui estado lógico completo e índice no padrão e verifica vitória depois de cada comando.

Nas amostras fixas de 128 comandos: 244/6000 tentativas com tendência a repetir uma direção venceram; nas uniformes, 807/6000. São diagnósticos reproduzíveis, não estimativas de dificuldade humana nem prova de ausência de raciocínio. Repetições legítimas continuam permitidas na partida.

## Endless e banco de segurança

O gerador 2 usa a mesma seleção de papéis de caixa, preparação, entrega e dependências antes de selecionar metas certificadas. Não carrega a campanha para reciclá-la. Geometrias, pontos de espera, faces disponíveis, orientação relativa e responsabilidades variam; giros não são contados como topologias novas. Nem toda classe de raciocínio é infinita, e a família editorial não promete unicidade lógica.

Semente, versão e parâmetros controlam as escolhas. O teto de estados/profundidade é determinístico; se o relógio esgota o orçamento, a chamada falha em vez de escolher uma meta de um conjunto parcial dependente da máquina. Só retorna definição validada e replay vencedor. Uma falha de orçamento não é prova de insolubilidade.

O histórico limita a introdução a uma regra desconhecida. Sem quantidade de animais explícita, a introdução usa uma dupla e até 14 comandos; combinações posteriores podem recuperar regras conhecidas. As últimas 24 assinaturas e famílias orientam uma preferência determinística e suave de variedade, sem sacrificar validade. Não há promessa de unicidade global do Endless.

O banco foi recurado para a revisão atual: **36 definições próprias, seis por faixa**, com sementes separadas da campanha. Seus 7 objetos-caixa possuem 7 testemunhos de múltiplos empurrões e 7 de mudança de direção; 2 são entregues, 2 com empurrões posteriores no receptor. Esses números continuam sendo observações, não provas universais. A seleção prioriza conteúdo não usado/recente e confere replay, sem busca síncrona durante a interação.

## Preservação do progresso

Revisão de conteúdo não altera `rulesVersion`. Conclusões históricas e desbloqueios permanecem. Tentativas antigas sem definição são resolvidas contra o arquivo imutável `campaign-v1.mjs`, nunca reinterpretadas sobre coordenadas novas; tentativas novas usam o catálogo atual. Os novos salvamentos incluem a definição jogável integral, a revisão, comandos, cursor e estado. Relatórios editoriais volumosos não são duplicados no armazenamento local.

O histórico de desfazer/refazer é reconstituído no mesmo mapa e o estado é conferido. Incompatibilidade ou definição ausente bloqueia a retomada sem sobrescrever silenciosamente o salvamento. Reiniciar uma tentativa antiga pede confirmação explícita e informa que apenas aquela tentativa passará ao mapa atualizado. Sessões Endless guardam suas próprias definições; importação/exportação não pode misturar uma solução antiga com um mapa novo. A evidência de retomada está nos testes de serviço/estado da interface, separada da auditoria de level design.

## Regras preservadas

| Relação | Regra existente |
|---|---|
| Comando e destinos | Todos os animais recebem a mesma seta, inclusive sobre os destinos; vitória exige chegada conjunta. |
| Controles e cancelas | A passagem usa a configuração capturada no início do comando; a nova ocupação/configuração vale no seguinte. |
| Caixas | Um empurrão de uma casa, sem puxar ou empurrar cadeias; cancelas e sentidos únicos também condicionam caixas. |
| Caixa e terreno especial | Gelo, portal e ponte conservadoramente alcançáveis por uma caixa continuam inválidos; combine em painéis separados. |
| Gelo e portal | Gelo continua até piso comum/bloqueio; entrar no portal transporta uma vez dentro do painel e encerra o movimento. |
| Ponte frágil | Desaparece na saída, sem temporizador; desfazer restaura o estado completo. |
| AND e seletor | AND exige todas as placas; seletor continua exigindo ocupação e estado 0/1 da conexão. |
| Entrega | Saída livre no início e sem ocupação concorrente; conflito cancela envio e empurrão, sem prioridade por painel; ciclos de canais são inválidos. |

## Arquivos e reprodução

- `campaign.mjs`: catálogo atual; `campaign-v1.mjs`: definições antigas exclusivamente para retomada.
- `generator.mjs`, `box-design.mjs`, `delivery-design.mjs`, `obstacle-design.mjs`: geração e composição de conteúdo.
- `fallback.mjs`: banco independente certificado da mesma revisão.
- `purpose.mjs`: testemunhos, ablações e buscas instrumentadas; não altera regras.
- `tests/sintonia-campaign-audit.json`: métricas exatas do catálogo, agenda, ritmo e repetição.
- `tests/sintonia-purpose-audit.json` e `docs/sintonia-purpose-evidence.md`: necessidade, contraexemplos, limites e classificação lógica.
- `tests/sintonia-commitment-evidence.json`: prova temporal e contraexemplo específico da configuração antes do compromisso na fase 251.
- `docs/sintonia-catalogo.md`: índice por fase, incluindo padrão, decisão e certificado.

```sh
node tests/sintonia-build-campaign.mjs
node tests/sintonia-audit-purpose.mjs
node tests/sintonia-commitment.test.mjs --write-evidence
node --test tests/sintonia-engine.test.mjs tests/sintonia-engine-analysis.test.mjs tests/sintonia-catalog.test.mjs tests/sintonia-purpose.test.mjs tests/sintonia-redesign.test.mjs tests/sintonia-commitment.test.mjs tests/sintonia-service.test.mjs tests/sintonia-ui-state.test.mjs tests/sintonia-integration.test.mjs
node tests/sintonia-document-catalog.mjs
```

O gerador desta documentação recusa campanha/reservas de revisões diferentes, replay inválido, métricas incompatíveis ou mudança no hash do motor. Os comandos acima são instruções de reprodução, não uma alegação de que cada suíte foi executada por este script. Avaliação humana e inspeção visual continuam complementares aos certificados.
