> **Arquivo histórico anterior à campanha de 80 fases.** Números, capítulos e totais abaixo pertencem às versões preservadas; não controlam a campanha atual. Consulte [SINTONIA80 — relatório atual](sintonia80/relatorio-independente.md). As regras do motor continuam preservadas.

# Sintonia — evidências de propósito e limites

Este relatório é reproduzido por `node tests/sintonia-audit-purpose.mjs`. O motor não foi alterado; a versão de regras permanece 1. Os resultados descrevem o conteúdo exato identificado pelos hashes no JSON, não uma promessa sobre versões futuras.

Foram reproduzidas 536/536 soluções (500 da campanha e 36 reservas). **Não foram realizados testes humanos.** Clareza, diversão, variedade percebida e dificuldade humana continuam sem confirmação empírica.

## O que os resultados significam

- **Testemunho:** uma solução certificada usou o elemento daquela maneira. Isso não prova necessidade.
- **Busca de evasão sem solução, exaustiva:** nenhuma vitória evita o evento sob o predicado exato registrado. É uma prova limitada a essa pergunta.
- **Contraexemplo encontrado:** existe uma vitória que evita o evento. A alegação de necessidade foi refutada, mesmo se o certificado principal o usa.
- **Inconclusivo:** limite de estados, tempo ou profundidade atingido. Não significa impossível nem necessário.
- **Ablação:** comparação controlada com uma cópia válida. Remover uma caixa e perder toda solução prova necessidade física, mas não qualidade da descoberta. Diferenças de comprimento, isoladamente, também não provam propósito.
- **Não aplicável:** a alteração criaria uma definição inválida, por exemplo transformar em parede a posição de uma caixa que também contém uma placa. Não apagamos outros elementos para fabricar uma comparação válida.

## Orçamentos

Por consulta comum: 15000 estados, 15 s e profundidade 180; limite total por fase de 120 s. Nas fases 177, 200, 423, 426 e 500: 100000 estados, 30 s, profundidade 240 e total de 300 s. O teto de estados é determinístico; um estouro de relógio fica explicitamente inconclusivo.

## Caixas: uso observado e papel necessário

| Evidência | Quantidade |
|---|---:|
| Caixas no conjunto | 97 |
| Mais de um empurrão no certificado | 96 |
| Mudança de direção observada | 96 |
| Remoção após sustentar uma travessia observada | 8 |
| Caixas entregues | 28 |
| Reposicionadas após a entrega | 28 |
| Remoção da caixa torna a fase insolúvel, por exaustão | 97 |
| Mudança de direção necessária, por exaustão | 95 |
| Liberação após apoio necessária, por exaustão | 8 |
| Mudança de direção no receptor necessária, por exaustão | 28 |
| Apoio anterior seguido de bloqueio físico observado | 3 |
| Apoio seguido de bloqueio necessário, por exaustão | 1 |

A prova de mudança de direção no receptor ignora todos os empurrões feitos pelo remetente. Seu estado inclui chegada e última direção de empurrão no painel de destino; uma mudança entre remetente e receptor não satisfaz artificialmente o teste.

## Fases críticas

| Fase | Padrão | Comandos do certificado | Provas e limites |
|---|---|---:|
| 177 | park-and-retrieve | 12 | remove-box:box0: unsolvable; box-turn:box0: unsolvable |
| 200 | support-then-release | 16 | remove-box:box0: unsolvable; box-turn:box0: unsolvable; box-release:box0: unsolvable |
| 423 | selector-recipient-with-supported-stop | 19 | remove-box:box0: unsolvable; box-turn:box0: unsolvable; box-supported-stop:box0: unsolvable |
| 426 | receive-turn-support | 11 | remove-box:parcel: unsolvable; box-turn:parcel: unsolvable; receiver-push:parcel:1: unsolvable; receiver-turn:parcel:1: unsolvable; mechanic:delivery: unsolvable |
| 500 | receive-hold-return | 26 | remove-box:parcel: unsolvable; box-turn:parcel: unsolvable; receiver-push:parcel:1: unsolvable; receiver-turn:parcel:1: unsolvable; mechanic:delivery: unsolvable |

## Dependências e variedade lógica

A classificação editorial encontrou 497 assinaturas entre 536 definições. Ela usa relações de controle, tipo de ocupante, transferência de recurso, papéis observados da caixa, saída da meta e sequência comprimida de movimentos/esperas. Não usa coordenadas, distâncias de corredor, margens ou nomes dos animais; a ordem dos painéis é normalizada.

Essa assinatura é uma classificação revisável, não uma prova matemática de equivalência de puzzles. Assinaturas diferentes não garantem descobertas diferentes, e repetições são publicadas no JSON em vez de escondidas por giros ou nomes novos. As ablações incluem cancelas individuais, grupos com condição idêntica, todos os controles de um mesmo tipo, gelo em piso comum, pontes permanentes e passagens bidirecionais. Desativar um portal pode apenas desconectar regiões; o relatório não chama isso de prova de um atalho bem desenhado.

## Resultados inconclusivos

Consultas: solved: 1610; unsolvable: 1591; not-applicable: 52; inconclusive: 33.

33 consultas permanecem inconclusivas. A lista integral com fase, predicado, motivo e estados visitados está no arquivo tests/sintonia-purpose-audit.json.

Foram encontrados 11 contraexemplos a predicados de necessidade testados. Isso inclui perguntas deliberadamente fortes, como exigir mudança de direção numa demonstração introdutória de um empurrão; não se converte automaticamente em reprovação editorial. Cada exceção deve ser lida junto do padrão e da justificativa da fase.

## Reproduzir e verificar

```sh
node tests/sintonia-audit-purpose.mjs
node --test tests/sintonia-purpose.test.mjs tests/sintonia-redesign.test.mjs
```

O JSON registra sementes, versões, hash do motor, fingerprints das definições, orçamentos, testemunhos e resultados de cada consulta. O teste de redesign rejeita evidência desatualizada após qualquer mudança de mapa ou solução. Não houve mudança de regra, estilo, desenho ou animação por parte desta auditoria.
