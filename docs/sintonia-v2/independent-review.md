# Revisão independente do redesign de Sintonia

## Conclusão

As verificações automatizadas independentes não encontraram bloqueador de regras, solubilidade, preservação visual ou escopo. O novo catálogo muda funções reais das caixas, não apenas distância ou aparência. A aceitação humana da clareza, variedade e dificuldade continua pendente; não foi inventada uma nota de rubrica nem um teste com jogadores.

A revisão foi somente leitura no repositório. Scripts e resultados foram produzidos separadamente em `sintonia-redesign-audit/`, usando o motor existente, sem aproveitar os classificadores do gerador para as provas de necessidade.

## Preservação e integridade

- Base exata: `a9f4bd4d58218f474a5eba3cd54700ff6b1b134b`.
- 500 fases e 36 reservas: todas válidas e reproduzidas até a vitória.
- 20 capítulos de 25; 260 duplas, 190 trios e 50 quartetos. As distribuições por capítulo, seis faixas, cadência e primeiras introduções foram conferidas individualmente.
- 500 topologias distintas sob normalização independente de margens, translação, ordem dos painéis e simetrias globais. Isso não demonstra 500 raciocínios distintos.
- Motor, versão de regras, imagens, folhas de estilo, outros jogos e arquivos compartilhados preservados byte a byte. Seis testes de integração passaram. A exceção estrita no código de interface é a comunicação da retomada do mapa antigo e sua confirmação de reinício; desenhos e marcação visual permaneceram iguais.
- O teste histórico de integração usava uma base anterior de sete jogos e já falhava antes do redesign. Ele não foi contado como aprovado; a nova prova usa a base real de nove jogos.
- As 500 definições antigas foram conservadas para retomada. O conjunto de 500 sessões iniciais serializadas mede aproximadamente 1,05 MB em UTF-8 e 2,10 MB em UTF-16, sem duplicar a auditoria editorial completa em cada sessão.

## Provas das caixas

| Verificação | Campanha | Reserva |
|---|---:|---:|
| Caixas presentes e fisicamente necessárias | 90 | 7 |
| Mudança de direção indispensável | 89 | 7 |
| Retirada após uso efetivo do apoio indispensável | 6 | 2 |
| Entregas cujo receptor obrigatoriamente empurra a caixa | 26 | 2 |

A fase 176 permanece como exceção introdutória de um empurrão. Na base anterior, todas as 103 caixas da campanha e sete reservas recebiam apenas um empurrão, embora remover qualquer uma tornasse sua fase impossível.

Foram registradas 734 consultas e contraexemplos de caixas e cancelas: testemunhos válidos quando bastavam e buscas instrumentadas quando era necessário provar impossibilidade. Nenhuma consulta final ficou inconclusiva. O teste de bloqueio distingue uma caixa realmente impossível de empurrar de uma cancela fechada antes dela ou de uma entrega cancelada.

**Fase 423, apoio e bloqueio real:** no testemunho, a caixa sustenta travessias nos comandos 10 e 12, bloqueia fisicamente o animal no comando 14 enquanto outro se move e sustenta nova travessia no 18. A busca independente que proíbe esse bloqueio depois de apoio anterior esgotou 15.855 estados sem vitória. O monitor guarda o histórico de apoio no identificador completo do estado. Remover a caixa também é impossível, e mudar a direção do empurrão é obrigatório. Isso não foi confundido com apenas retirar uma caixa da placa.

## Cobertura dos doze padrões

Os números abaixo distinguem classificação editorial, evento observado e necessidade demonstrada.

| Padrão | Evidência independente |
|---|---|
| 1 Parede escolhe quem anda | 11 fases de ajuste por parede exigem espera seletiva: proibi-la torna a vitória impossível por busca completa. |
| 2 Recuo intermediário | 6 das 8 fases puras classificadas como lugar de espera mostram chegada a posição não final, espera durante avanço alheio e saída posterior. São testemunhos, não prova de unicidade daquele abrigo. |
| 3 Destino como passagem | Saída do destino necessária em 11, 37, 45, 51, 54, 95 e 180. Quatro outras fases da família admitem alternativa sem saída; não foram contadas como necessidade. |
| 4 Ordem dos eixos | Nas 11 fases desta família, trocar um par adjacente de comandos de eixos distintos faz o testemunho deixar de vencer. Isso demonstra consequência da ordem, não uma única solução. |
| 5 Face correta da caixa | 89 caixas da campanha e sete reservas exigem mudança de direção. |
| 6 Estacionar e recuperar | 11 composições de estacionamento/recuperação na campanha e uma reserva; trajetórias afastam e recuperam a caixa, com mudança de direção necessária. |
| 7 Apoiar e depois liberar | Seis fases e duas reservas exigem retirada após travessia que consumiu o apoio. |
| 8 Apoio e bloqueio real | Fase 423 certificada pela busca instrumentada descrita acima. |
| 9 Ajuda muda de mãos | 26 revezamentos com ambas as cancelas necessárias por cortes de conectividade; sete composições adicionais de caixa e ajuda recíproca. |
| 10 Configurar antes de compromisso | Fase 251 agora exige configurar o interruptor antes da passagem de sentido único: 1.806 estados esgotados sem vitória na ordem proibida. Retirar apenas a restrição permite essa ordem, com testemunho de 16 comandos. |
| 11 Escolher destinatário | Todas as 25 fases de seletor têm passagens obrigatórias dos estados 0 e 1. |
| 12 Entrega preparada dos dois lados | Todas as 26 entregas e duas reservas exigem reutilização pelo receptor; a saída inicialmente ocupada também exige preparação antes do envio. |

Além disso, as 32 fases de sol/lua têm cancelas obrigatórias nos dois estados. Nas 45 composições de preparação antes de compromisso, uma vitória sem preparação anterior é impossível; em 40, retirar a restrição de sentido/ponte permite a ordem antes proibida. A fase 251 foi revalidada separadamente após trocar sua chave por interruptor.

## Repetição e limites

Apenas a fase 1 vence repetindo uma direção. Varreduras até bloqueio vencem somente 1, 3, 4, 6, 7, 9, 11 e 12, exatamente como na base. Dos 40 ciclos curtos, há vencedores em 14 fases: 1, 2, 3, 4, 6, 7, 9, 12, 16, 45, 80, 81, 85 e 105. As novas ocorrências 80 e 105 são retomadas de três comandos; 81 é uma combinação inicial de placa de cinco comandos. São diagnósticos editoriais, não prova de dificuldade ruim. Não houve consulta inconclusiva.

As arestas de uma mesma barreira podem servir juntas para impedir contorno; ausência de travessia de uma aresta no certificado não foi tratada automaticamente como decoração. Tampouco se afirmou que todo quadrado de parede ou toda solução alternativa foi avaliado por humanos.

A rubrica subjetiva e testes humanos de compreensão/variedade permanecem pendentes. Não há bloqueador automatizado conhecido, mas “todo o plano validado por jogadores” seria uma alegação incorreta.

## Reprodutibilidade e origem do plano

- `audit.mjs`: estrutura, distribuição, repetição geométrica, replay e buscas instrumentadas; resultado final em `candidate-final-deep.json`.
- `nonbox.mjs`: espera, saída do destino, ordem de preparação e cortes de cancelas; `candidate-nonbox.json` e `candidate-pattern10.json`.
- `repetition.mjs`: comandos únicos, ciclos e varreduras com estado lógico completo; `candidate-repetition.json`, complementado pela revalidação de 251.
- `sintonia-integration-current.test.mjs`: preservação exata do código fora da fronteira autorizada e da renderização.
- `audited-rule-fingerprints.json`: hashes de definição e certificado das 536 fases.

O DOCX anexado foi materializado pela rota suportada da Biblioteca, preservando sua identidade. Todo o corpo, inclusive tabelas (207 parágrafos), coincide semanticamente com `plan-draft.md`. A única diferença textual normalizada é o token `text` da cerca de código Markdown; não há comentários, notas de rodapé ou notas finais no DOCX.

## Identidade da versão congelada

Verificada em 2026-10-25T23:51:17.957Z. As 536 definições e certificados coincidem com os fingerprints auditados; nenhuma alteração de mapa ficou sem revalidação.

- `campaign.mjs`: `d9dec2f9759eaf977fa8060a1689f0d68822c235f0eb687d5fc934cf56e8ef28`
- `fallback.mjs`: `f111a55290a3d876c58b4cbac0a55b480b03f37b9f1067f02b3d2006d578051b`
- `generator.mjs`: `18db4d5144271e2cd15cf75d5648a482ab1e40815b53645c06354a684c9b14ad`
- `engine.mjs`: `db5503ca8fcff67526cab621be89c472c1afb75b2083b9c69d9f98859fe8eece`
