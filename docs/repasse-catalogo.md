# REPASSE — catálogo das 500 fases

Catálogo materializado em `dist/repasse/campaign.mjs`. Gerador offline: `tests/repasse-build-campaign.mjs`. Auditoria reproduzível: `node tests/repasse-audit.mjs`; testes: `node tests/repasse-catalog.test.mjs`.

Todos os IDs são estáveis e consecutivos. Cada registro contém grade, peças, valores, direções, todas as metas, sequência certificada, capítulo, categoria, etapa, papel editorial, conceitos, dicas e dados de validação. A classificação não cria abas ou seletores adicionais.

## Resultado da auditoria

- 500/500 soluções reproduzidas com sucesso.
- 500/500 análises exatas de ordens concluídas; nenhuma análise inconclusiva.
- 13 fases têm uma única ordem vencedora; as demais aceitam várias ordens.
- 350 fases somente originais e 150 expandidas; estreias nas fases201,276e351. A fase500 é somente original.
- Maior valor observado em uma solução: 37; grade máxima:4×4.
- 496 topologias distintas após simetria e compressão de faixas vazias; 498 classes após incluir valores/metas e eliminar escala uniforme.
- 401 soluções usam receber/sair/deixar passar; 76 retomadas acessíveis espalhadas pelos capítulos2–20.

As equivalências normalizadas são intencionais: fase2 apresenta a orientação vertical depois da horizontal da fase1; fase5 ensina a atravessar uma casa vazia depois da recepção direta da fase3. As fases7,8e9 implementam o exemploB: mesmas peças, metas e dependências diferentes. Elas não são equivalentes quando as metas entram na comparação. Nenhuma outra repetição de topologia foi usada para preencher a campanha.

## Capítulos e progressão

| Capítulo | Fases | Originais | Expandidas | Peças médias | Precedências obrigatórias médias | Timing |
|---|---:|---:|---:|---:|---:|---:|
| 1. Primeiros repasses | 1–25 | 25 | 0 | 3.72 | 2.76 | 3/25 |
| 2. Quem precisa esperar | 26–50 | 25 | 0 | 4.96 | 5.08 | 12/25 |
| 3. Caminhos vazios | 51–75 | 25 | 0 | 5.08 | 5.16 | 11/25 |
| 4. Juntar no lugar certo | 76–100 | 25 | 0 | 6.12 | 7.08 | 14/25 |
| 5. A hora de sair | 101–125 | 25 | 0 | 5.88 | 7.08 | 22/25 |
| 6. Os dois lados | 126–150 | 25 | 0 | 6.52 | 7.84 | 23/25 |
| 7. Separar e reunir | 151–175 | 25 | 0 | 6.76 | 9.48 | 14/25 |
| 8. Combinações do básico | 176–200 | 25 | 0 | 6.92 | 8.52 | 22/25 |
| 9. Um destino por vez | 201–225 | 12 | 13 | 7.52 | 10.36 | 24/25 |
| 10. Receptores compartilhados | 226–250 | 13 | 12 | 7.4 | 9.6 | 25/25 |
| 11. Proteger e liberar | 251–275 | 12 | 13 | 7.36 | 10.16 | 21/25 |
| 12. Duas direções em curva | 276–300 | 13 | 12 | 7.56 | 10.64 | 24/25 |
| 13. Preparar o encerramento | 301–325 | 12 | 13 | 7.72 | 12 | 23/25 |
| 14. Conectar regiões | 326–350 | 13 | 12 | 7.64 | 12 | 25/25 |
| 15. Quatro destinos | 351–375 | 12 | 13 | 7.44 | 11.84 | 22/25 |
| 16. Funções que mudam | 376–400 | 13 | 12 | 7.6 | 11.92 | 22/25 |
| 17. Enigmas compactos | 401–425 | 12 | 13 | 6.88 | 11.96 | 21/25 |
| 18. Diferenças decisivas | 426–450 | 13 | 12 | 8.44 | 14.28 | 24/25 |
| 19. Conciliar condições | 451–475 | 12 | 13 | 9.2 | 16.64 | 25/25 |
| 20. Domínio do REPASSE | 476–500 | 13 | 12 | 9.04 | 15.96 | 24/25 |

As precedências são relações de ordem presentes em todas as soluções, obtidas da busca completa; não são estimadas pela posição na campanha. A redução no tamanho médio do capítulo17 é intencional: ele concentra relações em enigmas compactos. As retomadas admitem cadeias mais curtas e menos relações obrigatórias mesmo nos capítulos finais.

## Presença das famílias

| Família | Foco principal | Observada na solução certificada |
|---|---:|---:|
| Receber antes de sair | 89 | 498 |
| Acumular contribuições | 44 | 394 |
| Abrir passagem | 43 | 488 |
| Retirar no momento certo | 78 | 401 |
| Revezar receptores | 30 | 65 |
| Preparar todos os destinos | 27 | 245 |
| Proteger metas | 29 | 451 |
| Bifurcar e reunir | 23 | 117 |
| Acumuladores diferentes | 11 | 129 |
| Peça compartilhada | 22 | 307 |
| Funções sucessivas | 15 | 138 |
| Momentos conectados | 36 | 340 |
| Ler as assimetrias | 26 | 494 |
| Planejar pelo final | 27 | 500 |

A presença de um motivo no replay não prova que todas as soluções usem o mesmo motivo. O catálogo armazena separadamente evidências do caminho certificado e precedências necessárias demonstradas pela análise de todas as ordens. Não houve teste com jogadores.

## 1. Primeiros repasses

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 1 | Um clique, dois repasses | introdução | Planejar pelo final | ↔/↕ | 1 | 1 | L1C1 |
| 2 | Também para cima e para baixo | introdução | Planejar pelo final | ↔/↕ | 1 | 1 | L1C1 |
| 3 | Quem recebe fica | introdução | Receber antes de sair | ↔/↕ | 2 | 1 | L1C1 → L1C2 |
| 4 | O valor atual é o que segue | introdução | Receber antes de sair | ↔/↕ | 2 | 1 | L1C1 → L1C2 |
| 5 | O vazio deixa passar | introdução | Receber antes de sair | ↔/↕ | 2 | 1 | L1C1 → L1C3 |
| 6 | Receber de outro eixo | introdução | Receber antes de sair | ↔/↕ | 3 | 1 | L1C1 → L1C2 → L2C2 |
| 7 | Juntar no centro | introdução | Acumular contribuições | ↔/↕ | 3 | 2 | L1C1 → L1C3 → L1C2 |
| 8 | Na hora certa | introdução | Retirar no momento certo | ↔/↕ | 3 | 1 | L1C1 → L1C2 → L1C3 |
| 9 | Abrir o caminho | introdução | Abrir passagem | ↔/↕ | 3 | 1 | L1C2 → L1C1 → L1C3 |
| 10 | Quatro retiradas conectadas | introdução | Receber antes de sair | ↔/↕ | 4 | 1 | L1C1 → L1C2 → L2C2 → L2C1 |
| 11 | Duas peças recebem | introdução | Preparar todos os destinos | ↔/↕ | 3 | 2 | L1C2 → L1C1 → L1C3 |
| 12 | Os primeiros vizinhos | introdução | Receber antes de sair | ↔/↕ | 4 | 3 | L1C1 → L2C1 → L1C2 → L2C2 |
| 13 | A soma muda de direção | introdução | Receber antes de sair | ↔/↕ | 4 | 1 | L1C1 → L1C2 → L2C2 → L2C3 |
| 14 | As caixas também somam | introdução | Ler as assimetrias | ↔/↕ | 3 | 1 | L2C1 → L1C1 → L3C1 |
| 15 | Uma ajuda antes de sair | introdução | Receber antes de sair | ↔/↕ | 5 | 30 | L1C1 → L1C3 → L3C3 → L1C2 → L2C1 |
| 16 | Receber para continuar | introdução | Receber antes de sair | ↔/↕ | 4 | 5 | L2C1 → L1C2 → L2C2 → L1C1 |
| 17 | A espera necessária | introdução | Receber antes de sair | ↔/↕ | 5 | 20 | L2C1 → L1C3 → L3C3 → L1C2 → L2C3 |
| 18 | Receber para continuar | introdução | Receber antes de sair | ↔/↕ | 5 | 20 | L1C1 → L3C2 → L1C2 → L3C1 → L2C2 |
| 19 | Uma ajuda antes de sair | introdução | Receber antes de sair | ↔/↕ | 5 | 20 | L2C3 → L3C1 → L1C1 → L2C2 → L1C3 |
| 20 | Receber para continuar | introdução | Receber antes de sair | ↔/↕ | 5 | 20 | L1C1 → L2C2 → L3C1 → L3C3 → L2C1 |
| 21 | A espera necessária | introdução | Receber antes de sair | ↔/↕ | 6 | 90 | L2C2 → L1C3 → L3C1 → L3C3 → L2C3 → L1C1 |
| 22 | Uma ajuda antes de sair | introdução | Receber antes de sair | ↔/↕ | 5 | 20 | L3C1 → L2C1 → L1C2 → L1C1 → L3C2 |
| 23 | A espera necessária | introdução | Receber antes de sair | ↔/↕ | 5 | 20 | L2C2 → L3C1 → L2C3 → L2C1 → L1C3 |
| 24 | A espera necessária | introdução | Receber antes de sair | ↔/↕ | 5 | 15 | L1C3 → L2C1 → L1C2 → L1C1 → L3C2 |
| 25 | A espera necessária | introdução | Receber antes de sair | ↔/↕ | 5 | 20 | L3C1 → L1C1 → L3C3 → L2C1 → L3C2 |

## 2. Quem precisa esperar

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 26 | Receber para continuar | variação | Receber antes de sair | ↔/↕ | 5 | 10 | L3C1 → L3C3 → L2C3 → L2C2 → L1C1 |
| 27 | Contribuições reunidas | retomada | Acumular contribuições | ↔/↕ | 4 | 5 | L2C3 → L2C1 → L1C1 → L2C2 |
| 28 | A espera necessária | combinação | Receber antes de sair | ↔/↕ | 5 | 12 | L3C2 → L1C1 → L2C2 → L3C1 → L2C1 |
| 29 | A espera necessária | variação | Receber antes de sair | ↔/↕ | 5 | 20 | L3C1 → L3C2 → L2C1 → L2C3 → L1C1 |
| 30 | Receber para continuar | combinação | Receber antes de sair | ↔/↕ | 5 | 12 | L3C3 → L2C2 → L3C1 → L1C2 → L3C2 |
| 31 | Receber para continuar | aprofundamento | Receber antes de sair | ↔/↕ | 6 | 20 | L2C1 → L3C1 → L2C2 → L2C3 → L3C2 → L1C1 |
| 32 | Uma ajuda antes de sair | retomada | Receber antes de sair | ↔/↕ | 3 | 2 | L2C1 → L1C2 → L2C2 |
| 33 | Uma ajuda antes de sair | combinação | Receber antes de sair | ↔/↕ | 5 | 9 | L3C2 → L2C1 → L3C1 → L1C1 → L2C2 |
| 34 | Receber para continuar | variação | Receber antes de sair | ↔/↕ | 5 | 11 | L2C3 → L3C1 → L2C2 → L2C1 → L3C3 |
| 35 | Receber para continuar | combinação | Receber antes de sair | ↔/↕ | 5 | 8 | L1C1 → L2C3 → L1C3 → L2C1 → L1C2 |
| 36 | Uma ajuda antes de sair | aprofundamento | Receber antes de sair | ↔/↕ | 5 | 5 | L2C3 → L2C2 → L2C1 → L1C3 → L1C2 |
| 37 | A espera necessária | combinação | Receber antes de sair | ↔/↕ | 5 | 12 | L2C2 → L1C3 → L3C1 → L2C3 → L2C1 |
| 38 | Uma ajuda antes de sair | marcante | Receber antes de sair | ↔/↕ | 5 | 7 | L3C2 → L2C1 → L2C2 → L1C2 → L3C1 |
| 39 | O valor que se prepara | retomada | Acumular contribuições | ↔/↕ | 4 | 6 | L2C2 → L1C3 → L1C1 → L1C2 |
| 40 | Uma ajuda antes de sair | combinação | Receber antes de sair | ↔/↕ | 5 | 8 | L1C1 → L3C3 → L2C2 → L2C1 → L3C1 |
| 41 | Receber para continuar | variação | Receber antes de sair | ↔/↕ | 5 | 15 | L1C2 → L2C1 → L1C3 → L2C3 → L2C2 |
| 42 | A espera necessária | combinação | Receber antes de sair | ↔/↕ | 5 | 11 | L2C2 → L1C1 → L3C2 → L1C2 → L2C1 |
| 43 | Receber para continuar | aprofundamento | Receber antes de sair | ↔/↕ | 6 | 26 | L3C1 → L3C2 → L1C3 → L1C1 → L2C3 → L2C2 |
| 44 | A espera necessária | combinação | Receber antes de sair | ↔/↕ | 5 | 8 | L1C3 → L2C3 → L1C1 → L1C2 → L2C2 |
| 45 | Encontro no centro | retomada | Acumular contribuições | ↔/↕ | 4 | 8 | L2C3 → L2C1 → L1C2 → L2C2 |
| 46 | A espera necessária | combinação | Receber antes de sair | ↔/↕ | 5 | 11 | L1C2 → L3C1 → L2C2 → L2C1 → L1C1 |
| 47 | Uma ajuda antes de sair | aprofundamento | Receber antes de sair | ↔/↕ | 6 | 24 | L1C3 → L2C3 → L1C1 → L1C2 → L2C1 → L3C3 |
| 48 | Uma ajuda antes de sair | combinação | Receber antes de sair | ↔/↕ | 5 | 15 | L1C1 → L2C1 → L3C1 → L1C2 → L2C2 |
| 49 | A espera necessária | combinação | Receber antes de sair | ↔/↕ | 6 | 48 | L2C3 → L1C1 → L1C3 → L2C1 → L3C3 → L1C2 |
| 50 | Receber para continuar | marcante | Receber antes de sair | ↔/↕ | 5 | 6 | L2C3 → L1C2 → L1C1 → L1C3 → L2C1 |

## 3. Caminhos vazios

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 51 | A passagem aberta | variação | Abrir passagem | ↔/↕ | 5 | 12 | L2C1 → L1C3 → L3C2 → L2C2 → L2C3 |
| 52 | O valor que se prepara | retomada | Acumular contribuições | ↔/↕ | 4 | 5 | L1C1 → L2C1 → L1C3 → L1C2 |
| 53 | Uma caixa protegida | combinação | Proteger metas | ↔/↕ | 5 | 10 | L1C1 → L2C3 → L2C1 → L2C2 → L1C2 |
| 54 | Depois do espaço vazio | variação | Abrir passagem | ↔/↕ | 4 | 3 | L1C2 → L2C2 → L1C1 → L1C3 |
| 55 | O receptor seguinte | combinação | Abrir passagem | ↔/↕ | 5 | 9 | L3C3 → L2C2 → L2C1 → L3C1 → L2C3 |
| 56 | Uma caixa protegida | aprofundamento | Proteger metas | ↔/↕ | 6 | 33 | L2C1 → L2C2 → L1C2 → L3C2 → L3C1 → L1C1 |
| 57 | A espera necessária | retomada | Receber antes de sair | ↔/↕ | 4 | 6 | L2C2 → L1C1 → L2C1 → L1C2 |
| 58 | A passagem aberta | combinação | Abrir passagem | ↔/↕ | 4 | 4 | L2C2 → L1C1 → L2C1 → L2C3 |
| 59 | O receptor seguinte | variação | Abrir passagem | ↔/↕ | 5 | 12 | L2C3 → L2C2 → L3C1 → L1C1 → L2C1 |
| 60 | A espera necessária | combinação | Receber antes de sair | ↔/↕ | 5 | 10 | L1C1 → L2C2 → L3C1 → L2C1 → L2C3 |
| 61 | Depois do espaço vazio | aprofundamento | Abrir passagem | ↔/↕ | 7 | 144 | L1C1 → L2C2 → L3C3 → L4C2 → L2C3 → L3C2 → L2C1 |
| 62 | Quem segura o repasse | combinação | Proteger metas | ↔/↕ | 5 | 16 | L2C2 → L1C3 → L1C1 → L2C1 → L1C2 |
| 63 | A espera necessária | marcante | Receber antes de sair | ↔/↕ | 6 | 30 | L2C3 → L3C1 → L2C2 → L1C1 → L3C3 → L1C3 |
| 64 | O valor que se prepara | retomada | Acumular contribuições | ↔/↕ | 4 | 3 | L2C1 → L2C2 → L1C3 → L2C3 |
| 65 | O limite já chegou | combinação | Proteger metas | ↔/↕ | 6 | 54 | L3C2 → L2C1 → L1C1 → L2C2 → L2C3 → L3C1 |
| 66 | Depois do espaço vazio | variação | Abrir passagem | ↔/↕ | 5 | 15 | L2C2 → L1C1 → L2C3 → L3C2 → L2C1 |
| 67 | Depois do espaço vazio | combinação | Abrir passagem | ↔/↕ | 5 | 7 | L1C2 → L2C1 → L1C3 → L2C3 → L1C1 |
| 68 | Uma caixa protegida | aprofundamento | Proteger metas | ↔/↕ | 6 | 10 | L3C1 → L2C2 → L1C2 → L1C1 → L1C3 → L2C3 |
| 69 | Uma ajuda antes de sair | combinação | Receber antes de sair | ↔/↕ | 5 | 9 | L1C1 → L3C2 → L3C3 → L2C1 → L3C1 |
| 70 | Contribuições reunidas | retomada | Acumular contribuições | ↔/↕ | 4 | 8 | L1C3 → L2C3 → L2C1 → L2C2 |
| 71 | O limite já chegou | combinação | Proteger metas | ↔/↕ | 6 | 26 | L1C1 → L1C3 → L2C2 → L2C3 → L1C2 → L3C3 |
| 72 | A espera necessária | aprofundamento | Receber antes de sair | ↔/↕ | 5 | 5 | L3C1 → L1C1 → L3C2 → L2C1 → L2C2 |
| 73 | A passagem aberta | combinação | Abrir passagem | ↔/↕ | 5 | 15 | L2C2 → L3C2 → L1C1 → L2C3 → L2C1 |
| 74 | Quem segura o repasse | combinação | Proteger metas | ↔/↕ | 5 | 16 | L2C2 → L1C3 → L2C3 → L2C1 → L1C2 |
| 75 | Receber para continuar | marcante | Receber antes de sair | ↔/↕ | 6 | 18 | L2C2 → L1C2 → L3C1 → L2C1 → L2C3 → L1C1 |

## 4. Juntar no lugar certo

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 76 | Contribuições reunidas | variação | Acumular contribuições | ↔/↕ | 6 | 48 | L2C1 → L2C3 → L2C2 → L1C1 → L3C3 → L1C2 |
| 77 | O valor que se prepara | retomada | Acumular contribuições | ↔/↕ | 5 | 18 | L1C2 → L2C1 → L2C3 → L3C1 → L2C2 |
| 78 | Lados que pedem diferente | combinação | Ler as assimetrias | ↔/↕ | 6 | 42 | L1C2 → L2C2 → L3C2 → L3C1 → L2C1 → L3C3 |
| 79 | Encontro no centro | variação | Acumular contribuições | ↔/↕ | 7 | 280 | L3C3 → L2C4 → L3C2 → L2C1 → L2C3 → L2C2 → L1C1 |
| 80 | O valor que se prepara | combinação | Acumular contribuições | ↔/↕ | 6 | 54 | L2C2 → L1C3 → L2C1 → L3C1 → L2C3 → L1C1 |
| 81 | O receptor seguinte | aprofundamento | Abrir passagem | ↔/↕ | 7 | 25 | L2C3 → L2C4 → L1C4 → L1C3 → L2C2 → L3C3 → L3C1 |
| 82 | O receptor seguinte | retomada | Abrir passagem | ↔/↕ | 4 | 6 | L2C2 → L1C1 → L2C3 → L2C1 |
| 83 | Um clique, dois acordos | combinação | Preparar todos os destinos | ↔/↕ | 6 | 66 | L2C2 → L2C3 → L1C2 → L3C2 → L2C1 → L1C3 |
| 84 | Contribuições reunidas | variação | Acumular contribuições | ↔/↕ | 5 | 9 | L1C1 → L2C3 → L2C1 → L2C2 → L3C3 |
| 85 | Lados que pedem diferente | combinação | Ler as assimetrias | ↔/↕ | 7 | 210 | L3C2 → L1C1 → L2C1 → L1C2 → L1C3 → L4C2 → L2C2 |
| 86 | Uma ajuda antes de sair | aprofundamento | Receber antes de sair | ↔/↕ | 6 | 9 | L3C1 → L3C2 → L1C2 → L1C1 → L2C2 → L2C1 |
| 87 | Encontro no centro | combinação | Acumular contribuições | ↔/↕ | 7 | 140 | L1C1 → L3C3 → L2C1 → L2C3 → L1C3 → L1C2 → L1C4 |
| 88 | Depois do espaço vazio | marcante | Abrir passagem | ↔/↕ | 7 | 49 | L1C3 → L2C1 → L2C3 → L1C2 → L2C2 → L2C4 → L1C1 |
| 89 | Contribuições reunidas | retomada | Acumular contribuições | ↔/↕ | 5 | 15 | L2C2 → L3C1 → L1C3 → L2C3 → L2C1 |
| 90 | Destinos preparados | combinação | Preparar todos os destinos | ↔/↕ | 6 | 38 | L2C2 → L2C1 → L3C3 → L1C3 → L3C1 → L2C3 |
| 91 | Contribuições reunidas | variação | Acumular contribuições | ↔/↕ | 6 | 48 | L1C1 → L2C2 → L3C3 → L2C3 → L1C2 → L2C1 |
| 92 | A diferença está na meta | combinação | Ler as assimetrias | ↔/↕ | 6 | 25 | L3C2 → L2C3 → L1C1 → L3C1 → L2C2 → L2C1 |
| 93 | A espera necessária | aprofundamento | Receber antes de sair | ↔/↕ | 7 | 6 | L2C1 → L2C4 → L2C3 → L1C3 → L3C3 → L1C2 → L1C4 |
| 94 | O valor que se prepara | combinação | Acumular contribuições | ↔/↕ | 6 | 42 | L2C2 → L1C3 → L2C1 → L3C3 → L3C2 → L2C3 |
| 95 | Entre duas contribuições | retomada | Retirar no momento certo | ↔/↕ | 5 | 20 | L3C1 → L1C1 → L2C3 → L2C2 → L2C1 |
| 96 | A hora exata de sair | combinação | Retirar no momento certo | ↔/↕ | 6 | 60 | L3C1 → L2C3 → L1C2 → L2C1 → L3C2 → L2C2 |
| 97 | Consequências em conjunto | aprofundamento | Preparar todos os destinos | ↔/↕ | 7 | 69 | L3C3 → L1C1 → L2C4 → L1C3 → L3C2 → L3C1 → L3C4 |
| 98 | Uma caixa protegida | combinação | Proteger metas | ↔/↕ | 6 | 38 | L2C3 → L1C2 → L2C1 → L1C3 → L2C2 → L1C1 |
| 99 | Um equilíbrio desigual | combinação | Ler as assimetrias | ↔/↕ | 7 | 164 | L1C4 → L2C3 → L3C3 → L2C4 → L3C4 → L2C1 → L1C3 |
| 100 | A espera necessária | marcante | Receber antes de sair | ↔/↕ | 7 | 140 | L2C4 → L1C1 → L3C1 → L3C3 → L3C2 → L2C3 → L2C2 |

## 5. A hora de sair

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 101 | A hora exata de sair | variação | Retirar no momento certo | ↔/↕ | 6 | 30 | L2C3 → L3C3 → L1C2 → L3C1 → L2C2 → L2C1 |
| 102 | Depois do espaço vazio | retomada | Abrir passagem | ↔/↕ | 5 | 12 | L2C2 → L2C3 → L3C2 → L2C1 → L1C2 |
| 103 | A última contribuição | combinação | Planejar pelo final | ↔/↕ | 6 | 30 | L3C1 → L2C3 → L2C1 → L1C3 → L1C2 → L2C2 |
| 104 | Receber e deixar passar | variação | Retirar no momento certo | ↔/↕ | 5 | 8 | L1C2 → L3C1 → L2C3 → L2C2 → L2C1 |
| 105 | Receber para continuar | combinação | Receber antes de sair | ↔/↕ | 6 | 24 | L1C1 → L3C2 → L2C1 → L2C2 → L1C2 → L3C1 |
| 106 | Comece pelo encerramento | aprofundamento | Planejar pelo final | ↔/↕ | 6 | 10 | L1C3 → L3C3 → L3C2 → L1C1 → L2C2 → L2C1 |
| 107 | Entre duas contribuições | retomada | Retirar no momento certo | ↔/↕ | 5 | 10 | L3C2 → L2C1 → L1C1 → L2C2 → L2C3 |
| 108 | A espera necessária | combinação | Receber antes de sair | ↔/↕ | 6 | 33 | L3C2 → L1C1 → L2C3 → L1C3 → L3C3 → L2C2 |
| 109 | Entre duas contribuições | variação | Retirar no momento certo | ↔/↕ | 7 | 164 | L1C2 → L3C4 → L3C3 → L2C4 → L1C4 → L2C1 → L3C2 |
| 110 | A vez do próximo | combinação | Revezar receptores | ↔/↕ | 6 | 24 | L2C3 → L2C2 → L1C1 → L2C4 → L3C3 → L2C1 |
| 111 | A espera necessária | aprofundamento | Receber antes de sair | ↔/↕ | 8 | 350 | L1C3 → L4C1 → L2C1 → L3C1 → L2C3 → L4C2 → L2C2 → L3C2 |
| 112 | A última contribuição | combinação | Planejar pelo final | ↔/↕ | 5 | 6 | L2C1 → L1C1 → L2C2 → L1C3 → L2C3 |
| 113 | O segundo destino | marcante | Revezar receptores | ↔/↕ | 7 | 70 | L3C2 → L3C3 → L1C2 → L1C4 → L2C1 → L3C1 → L3C4 |
| 114 | Depois do espaço vazio | retomada | Abrir passagem | ↔/↕ | 4 | 4 | L2C2 → L2C3 → L1C3 → L2C1 |
| 115 | A última contribuição | combinação | Planejar pelo final | ↔/↕ | 5 | 12 | L1C1 → L2C3 → L1C3 → L2C2 → L1C2 |
| 116 | A hora exata de sair | variação | Retirar no momento certo | ↔/↕ | 6 | 33 | L2C1 → L3C2 → L1C3 → L2C2 → L3C1 → L2C3 |
| 117 | A espera necessária | combinação | Receber antes de sair | ↔/↕ | 6 | 45 | L3C3 → L2C2 → L1C3 → L2C1 → L2C3 → L3C1 |
| 118 | As caixas contam o final | aprofundamento | Planejar pelo final | ↔/↕ | 6 | 15 | L2C3 → L2C1 → L1C1 → L2C2 → L1C2 → L1C3 |
| 119 | A vez do próximo | combinação | Revezar receptores | ↔/↕ | 6 | 24 | L1C4 → L2C3 → L3C1 → L2C2 → L2C4 → L2C1 |
| 120 | Uma ajuda antes de sair | retomada | Receber antes de sair | ↔/↕ | 5 | 16 | L3C3 → L3C1 → L1C1 → L3C2 → L2C3 |
| 121 | Comece pelo encerramento | combinação | Planejar pelo final | ↔/↕ | 6 | 40 | L2C2 → L3C3 → L3C2 → L1C3 → L1C1 → L1C2 |
| 122 | A vez do próximo | aprofundamento | Revezar receptores | ↔/↕ | 7 | 41 | L2C3 → L2C2 → L2C4 → L3C4 → L3C1 → L1C2 → L2C1 |
| 123 | Receber para continuar | combinação | Receber antes de sair | ↔/↕ | 6 | 40 | L2C1 → L3C2 → L1C3 → L1C1 → L2C2 → L1C2 |
| 124 | A última contribuição | combinação | Planejar pelo final | ↔/↕ | 6 | 40 | L3C1 → L3C3 → L2C2 → L1C1 → L2C3 → L2C1 |
| 125 | A vez do próximo | marcante | Revezar receptores | ↔/↕ | 6 | 6 | L2C2 → L2C3 → L2C1 → L2C4 → L3C3 → L1C3 |

## 6. Os dois lados

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 126 | Destinos preparados | variação | Preparar todos os destinos | ↔/↕ | 6 | 37 | L2C2 → L1C2 → L2C3 → L3C1 → L3C3 → L2C1 |
| 127 | A hora exata de sair | retomada | Retirar no momento certo | ↔/↕ | 5 | 9 | L2C1 → L3C1 → L2C2 → L1C1 → L2C3 |
| 128 | O apoio compartilhado | combinação | Peça compartilhada | ↔/↕ | 6 | 52 | L1C2 → L3C1 → L2C1 → L2C3 → L2C2 → L3C2 |
| 129 | Consequências em conjunto | variação | Preparar todos os destinos | ↔/↕ | 7 | 169 | L1C2 → L3C1 → L2C3 → L2C1 → L2C4 → L3C4 → L2C2 |
| 130 | As caixas contam o final | combinação | Planejar pelo final | ↔/↕ | 6 | 20 | L1C1 → L3C3 → L2C1 → L3C1 → L3C2 → L2C2 |
| 131 | A vez do próximo | aprofundamento | Revezar receptores | ↔/↕ | 7 | 33 | L3C1 → L1C2 → L2C3 → L1C3 → L1C1 → L2C4 → L1C4 |
| 132 | A espera necessária | retomada | Receber antes de sair | ↔/↕ | 5 | 20 | L1C1 → L1C2 → L2C2 → L1C3 → L3C2 |
| 133 | Uma caixa protegida | combinação | Proteger metas | ↔/↕ | 7 | 106 | L2C4 → L3C2 → L2C1 → L3C1 → L1C4 → L2C2 → L3C3 |
| 134 | Consequências em conjunto | variação | Preparar todos os destinos | ↔/↕ | 6 | 42 | L2C2 → L3C3 → L2C1 → L2C3 → L1C2 → L1C1 |
| 135 | Uma peça em comum | combinação | Peça compartilhada | ↔/↕ | 7 | 240 | L1C3 → L2C4 → L4C1 → L4C4 → L3C3 → L2C1 → L2C3 |
| 136 | A passagem aberta | aprofundamento | Abrir passagem | ↔/↕ | 7 | 81 | L4C3 → L1C4 → L2C3 → L4C4 → L2C4 → L3C2 → L2C2 |
| 137 | As caixas contam o final | combinação | Planejar pelo final | ↔/↕ | 7 | 120 | L4C4 → L4C2 → L2C4 → L3C3 → L3C4 → L1C2 → L1C4 |
| 138 | O segundo destino | marcante | Revezar receptores | ↔/↕ | 7 | 22 | L1C2 → L2C4 → L2C3 → L1C3 → L1C1 → L2C1 → L1C4 |
| 139 | Entre duas contribuições | retomada | Retirar no momento certo | ↔/↕ | 5 | 15 | L1C3 → L3C1 → L2C2 → L2C1 → L2C3 |
| 140 | Uma caixa protegida | combinação | Proteger metas | ↔/↕ | 6 | 33 | L1C1 → L3C2 → L2C3 → L3C1 → L3C3 → L2C2 |
| 141 | Destinos preparados | variação | Preparar todos os destinos | ↔/↕ | 7 | 245 | L3C2 → L1C3 → L3C4 → L1C1 → L2C4 → L1C4 → L1C2 |
| 142 | O apoio compartilhado | combinação | Peça compartilhada | ↔/↕ | 7 | 189 | L3C3 → L3C2 → L2C1 → L1C2 → L3C1 → L2C3 → L2C2 |
| 143 | Depois do espaço vazio | aprofundamento | Abrir passagem | ↔/↕ | 8 | 240 | L2C2 → L3C4 → L1C3 → L4C4 → L4C3 → L2C1 → L2C3 → L4C1 |
| 144 | Comece pelo encerramento | combinação | Planejar pelo final | ↔/↕ | 6 | 30 | L2C1 → L3C3 → L1C3 → L2C3 → L1C2 → L2C2 |
| 145 | O valor que se prepara | retomada | Acumular contribuições | ↔/↕ | 5 | 24 | L2C1 → L1C2 → L3C2 → L2C3 → L2C2 |
| 146 | A hora exata de sair | combinação | Retirar no momento certo | ↔/↕ | 7 | 162 | L1C2 → L3C4 → L3C3 → L1C3 → L4C2 → L3C1 → L3C2 |
| 147 | Uma caixa protegida | aprofundamento | Proteger metas | ↔/↕ | 7 | 33 | L4C2 → L2C2 → L3C2 → L3C3 → L2C1 → L4C3 → L1C2 |
| 148 | Receber para continuar | combinação | Receber antes de sair | ↔/↕ | 7 | 133 | L4C1 → L2C1 → L3C3 → L1C3 → L1C1 → L4C3 → L1C2 |
| 149 | O apoio compartilhado | combinação | Peça compartilhada | ↔/↕ | 8 | 1712 | L1C2 → L3C3 → L1C3 → L2C3 → L4C2 → L2C1 → L3C2 → L2C2 |
| 150 | A passagem aberta | marcante | Abrir passagem | ↔/↕ | 7 | 42 | L3C1 → L2C1 → L1C4 → L1C1 → L2C2 → L3C2 → L2C3 |

## 7. Separar e reunir

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 151 | Caminhos que se reencontram | variação | Bifurcar e reunir | ↔/↕ | 8 | 240 | L4C2 → L2C2 → L1C2 → L1C4 → L3C2 → L2C3 → L3C4 → L2C4 |
| 152 | A espera necessária | retomada | Receber antes de sair | ↔/↕ | 5 | 16 | L2C3 → L1C1 → L2C1 → L3C3 → L1C2 |
| 153 | Uma ajuda antes de sair | combinação | Receber antes de sair | ↔/↕ | 8 | 1344 | L3C4 → L1C3 → L4C2 → L1C4 → L3C2 → L2C1 → L2C3 → L2C4 |
| 154 | Duas voltas, um encontro | variação | Bifurcar e reunir | ↔/↕ | 7 | 36 | L3C1 → L3C2 → L4C2 → L4C4 → L2C2 → L2C4 → L3C4 |
| 155 | Contribuições reunidas | combinação | Acumular contribuições | ↔/↕ | 7 | 378 | L3C3 → L2C3 → L1C1 → L3C2 → L2C4 → L4C3 → L3C1 |
| 156 | O apoio compartilhado | aprofundamento | Peça compartilhada | ↔/↕ | 7 | 60 | L1C3 → L4C4 → L3C2 → L2C2 → L3C4 → L2C4 → L2C3 |
| 157 | Contribuições reunidas | retomada | Acumular contribuições | ↔/↕ | 4 | 3 | L1C2 → L2C3 → L1C1 → L1C3 |
| 158 | Um equilíbrio desigual | combinação | Ler as assimetrias | ↔/↕ | 7 | 98 | L3C4 → L3C3 → L1C1 → L2C3 → L3C2 → L1C4 → L2C4 |
| 159 | Uma origem em dois caminhos | variação | Bifurcar e reunir | ↔/↕ | 7 | 42 | L3C1 → L4C1 → L4C2 → L1C1 → L2C1 → L2C2 → L3C2 |
| 160 | Comece pelo encerramento | combinação | Planejar pelo final | ↔/↕ | 6 | 15 | L2C1 → L2C3 → L2C2 → L1C1 → L1C2 → L1C3 |
| 161 | A vez do próximo | aprofundamento | Revezar receptores | ↔/↕ | 8 | 104 | L3C3 → L4C3 → L1C2 → L2C2 → L2C3 → L3C2 → L3C4 → L3C1 |
| 162 | Entre duas contribuições | combinação | Retirar no momento certo | ↔/↕ | 7 | 81 | L2C1 → L3C1 → L1C1 → L3C2 → L1C2 → L2C3 → L3C3 |
| 163 | Entre duas contribuições | marcante | Retirar no momento certo | ↔/↕ | 8 | 126 | L3C2 → L2C1 → L2C2 → L1C3 → L3C4 → L1C2 → L2C3 → L1C4 |
| 164 | A espera necessária | retomada | Receber antes de sair | ↔/↕ | 5 | 11 | L1C1 → L1C2 → L1C3 → L2C1 → L2C3 |
| 165 | Quem segura o repasse | combinação | Proteger metas | ↔/↕ | 7 | 231 | L1C4 → L2C3 → L3C3 → L1C3 → L3C4 → L2C4 → L1C2 |
| 166 | Caminhos que se reencontram | variação | Bifurcar e reunir | ↔/↕ | 6 | 35 | L2C1 → L1C1 → L1C2 → L3C2 → L3C1 → L2C2 |
| 167 | Duas voltas, um encontro | combinação | Bifurcar e reunir | ↔/↕ | 7 | 30 | L2C2 → L1C2 → L1C4 → L3C2 → L3C4 → L2C1 → L2C4 |
| 168 | Receber para continuar | aprofundamento | Receber antes de sair | ↔/↕ | 8 | 135 | L3C3 → L2C4 → L1C2 → L1C4 → L1C1 → L2C1 → L2C3 → L3C4 |
| 169 | Cada um até sua hora | combinação | Acumuladores diferentes | ↔/↕ | 6 | 40 | L2C1 → L2C3 → L2C2 → L1C1 → L1C3 → L1C2 |
| 170 | Depois do espaço vazio | retomada | Abrir passagem | ↔/↕ | 4 | 5 | L1C1 → L1C2 → L1C3 → L2C1 |
| 171 | Uma peça em comum | combinação | Peça compartilhada | ↔/↕ | 7 | 252 | L1C2 → L3C1 → L2C4 → L2C1 → L4C2 → L4C3 → L2C2 |
| 172 | Depois do espaço vazio | aprofundamento | Abrir passagem | ↔/↕ | 7 | 57 | L3C1 → L2C4 → L4C3 → L2C2 → L3C2 → L2C1 → L3C3 |
| 173 | Lados que pedem diferente | combinação | Ler as assimetrias | ↔/↕ | 7 | 81 | L2C2 → L2C3 → L3C1 → L3C3 → L2C1 → L1C2 → L1C1 |
| 174 | Entre duas contribuições | combinação | Retirar no momento certo | ↔/↕ | 7 | 72 | L2C1 → L1C3 → L1C2 → L3C3 → L3C2 → L2C2 → L2C3 |
| 175 | A hora exata de sair | marcante | Retirar no momento certo | ↔/↕ | 9 | 244 | L4C3 → L3C4 → L2C3 → L3C3 → L4C1 → L4C4 → L3C1 → L3C2 → L1C2 |

## 8. Combinações do básico

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 176 | Uma decisão prepara outra | variação | Momentos conectados | ↔/↕ | 7 | 294 | L3C3 → L2C4 → L2C2 → L1C3 → L2C1 → L1C4 → L2C3 |
| 177 | Contribuições reunidas | retomada | Acumular contribuições | ↔/↕ | 6 | 84 | L1C2 → L2C3 → L2C1 → L3C2 → L3C3 → L2C2 |
| 178 | Entre duas contribuições | combinação | Retirar no momento certo | ↔/↕ | 6 | 16 | L3C2 → L2C3 → L3C3 → L2C2 → L1C3 → L2C1 |
| 179 | Uma decisão prepara outra | variação | Momentos conectados | ↔/↕ | 8 | 284 | L2C3 → L1C2 → L4C3 → L2C2 → L2C1 → L1C1 → L4C2 → L1C3 |
| 180 | Entre duas contribuições | combinação | Retirar no momento certo | ↔/↕ | 7 | 210 | L3C1 → L1C1 → L1C4 → L1C2 → L2C4 → L2C2 → L1C3 |
| 181 | Um clique, dois acordos | aprofundamento | Preparar todos os destinos | ↔/↕ | 8 | 180 | L3C2 → L2C2 → L1C2 → L2C1 → L2C3 → L3C4 → L1C4 → L3C3 |
| 182 | Depois do espaço vazio | retomada | Abrir passagem | ↔/↕ | 6 | 42 | L2C2 → L3C1 → L2C1 → L1C2 → L2C3 → L3C2 |
| 183 | Troca de receptor | combinação | Revezar receptores | ↔/↕ | 7 | 168 | L3C2 → L2C4 → L1C1 → L3C3 → L3C1 → L4C2 → L3C4 |
| 184 | A sequência das condições | variação | Momentos conectados | ↔/↕ | 6 | 60 | L2C3 → L2C1 → L2C2 → L1C3 → L3C2 → L3C1 |
| 185 | A hora exata de sair | combinação | Retirar no momento certo | ↔/↕ | 7 | 294 | L2C1 → L2C2 → L1C3 → L4C3 → L1C2 → L3C1 → L2C3 |
| 186 | Relações encadeadas | aprofundamento | Momentos conectados | ↔/↕ | 7 | 35 | L1C4 → L1C3 → L2C1 → L2C3 → L3C3 → L2C4 → L2C2 |
| 187 | A passagem aberta | combinação | Abrir passagem | ↔/↕ | 8 | 477 | L2C3 → L4C2 → L1C3 → L2C4 → L4C4 → L4C1 → L3C3 → L2C2 |
| 188 | Uma decisão prepara outra | marcante | Momentos conectados | ↔/↕ | 7 | 42 | L3C3 → L1C1 → L1C2 → L4C2 → L2C2 → L2C1 → L2C3 |
| 189 | Encontro no centro | retomada | Acumular contribuições | ↔/↕ | 5 | 16 | L1C3 → L2C3 → L1C1 → L2C1 → L1C2 |
| 190 | O encontro das regiões | combinação | Peça compartilhada | ↔/↕ | 6 | 36 | L1C3 → L3C3 → L1C2 → L2C3 → L3C1 → L2C2 |
| 191 | A sequência das condições | variação | Momentos conectados | ↔/↕ | 7 | 44 | L2C3 → L3C3 → L3C1 → L3C4 → L1C3 → L2C2 → L2C4 |
| 192 | Acumular sem exagerar | combinação | Acumuladores diferentes | ↔/↕ | 7 | 240 | L3C3 → L3C1 → L1C2 → L3C2 → L2C3 → L2C1 → L2C2 |
| 193 | Troca de receptor | aprofundamento | Revezar receptores | ↔/↕ | 9 | 1479 | L2C3 → L3C1 → L2C2 → L4C3 → L1C1 → L2C4 → L2C1 → L1C2 → L3C4 |
| 194 | Caminhos que se reencontram | combinação | Bifurcar e reunir | ↔/↕ | 7 | 112 | L1C1 → L1C2 → L2C3 → L3C3 → L2C2 → L1C3 → L3C2 |
| 195 | Receber e deixar passar | retomada | Retirar no momento certo | ↔/↕ | 6 | 60 | L2C1 → L2C2 → L3C1 → L1C1 → L2C3 → L3C3 |
| 196 | Uma caixa protegida | combinação | Proteger metas | ↔/↕ | 6 | 30 | L2C2 → L2C1 → L3C1 → L2C3 → L3C2 → L1C3 |
| 197 | A hora exata de sair | aprofundamento | Retirar no momento certo | ↔/↕ | 9 | 1728 | L2C1 → L4C3 → L1C4 → L4C2 → L4C1 → L3C1 → L2C2 → L2C4 → L2C3 |
| 198 | Destinos preparados | combinação | Preparar todos os destinos | ↔/↕ | 6 | 33 | L2C2 → L1C3 → L2C1 → L2C3 → L3C2 → L3C3 |
| 199 | Comece pelo encerramento | combinação | Planejar pelo final | ↔/↕ | 7 | 120 | L2C4 → L1C1 → L1C4 → L2C2 → L1C3 → L2C1 → L2C3 |
| 200 | Relações encadeadas | marcante | Momentos conectados | ↔/↕ | 8 | 95 | L2C1 → L1C4 → L2C2 → L1C1 → L3C2 → L2C3 → L1C2 → L1C3 |

## 9. Um destino por vez

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 201 | Uma seta, um destino | variação | Receber antes de sair | ↔/↕, uma seta | 3 | 1 | L2C1 → L1C1 → L1C2 |
| 202 | O receptor seguinte | retomada | Abrir passagem | ↔/↕ | 4 | 4 | L1C2 → L1C3 → L1C1 → L2C3 |
| 203 | O segundo destino | combinação | Revezar receptores | ↔/↕, uma seta | 8 | 560 | L3C2 → L4C2 → L3C3 → L4C4 → L3C1 → L1C2 → L2C1 → L3C4 |
| 204 | Lados que pedem diferente | variação | Ler as assimetrias | ↔/↕ | 7 | 69 | L2C1 → L3C3 → L1C3 → L4C1 → L4C2 → L3C2 → L3C1 |
| 205 | Receber e deixar passar | combinação | Retirar no momento certo | ↔/↕, uma seta | 8 | 496 | L2C2 → L4C3 → L4C4 → L1C2 → L1C3 → L3C2 → L2C3 → L2C1 |
| 206 | A sequência das condições | aprofundamento | Momentos conectados | ↔/↕ | 9 | 840 | L3C4 → L4C1 → L1C2 → L1C1 → L4C2 → L3C2 → L3C1 → L2C3 → L3C3 |
| 207 | Receber e deixar passar | retomada | Retirar no momento certo | ↔/↕, uma seta | 5 | 15 | L1C1 → L2C3 → L2C1 → L1C2 → L1C3 |
| 208 | A peça muda de papel | combinação | Funções sucessivas | ↔/↕ | 8 | 526 | L3C3 → L1C4 → L2C4 → L3C1 → L1C1 → L4C3 → L3C2 → L3C4 |
| 209 | Um equilíbrio desigual | variação | Ler as assimetrias | ↔/↕, uma seta | 9 | 4149 | L1C4 → L2C1 → L1C3 → L3C4 → L4C3 → L2C4 → L1C2 → L3C3 → L2C3 |
| 210 | O apoio compartilhado | combinação | Peça compartilhada | ↔/↕ | 7 | 90 | L3C1 → L1C3 → L2C1 → L3C2 → L2C3 → L2C2 → L3C3 |
| 211 | Receber para continuar | aprofundamento | Receber antes de sair | ↔/↕, uma seta | 9 | 1238 | L2C2 → L3C4 → L3C2 → L2C4 → L1C4 → L1C3 → L2C1 → L2C3 → L3C1 |
| 212 | Dois valores diferentes | combinação | Acumuladores diferentes | ↔/↕ | 8 | 840 | L1C1 → L1C3 → L1C2 → L2C1 → L2C3 → L3C1 → L3C2 → L2C2 |
| 213 | Uma origem em dois caminhos | marcante | Bifurcar e reunir | ↔/↕, uma seta | 9 | 754 | L3C3 → L3C2 → L4C3 → L2C1 → L2C2 → L1C2 → L2C3 → L1C1 → L1C3 |
| 214 | O receptor seguinte | retomada | Abrir passagem | ↔/↕ | 5 | 20 | L2C2 → L2C1 → L2C3 → L3C1 → L1C3 |
| 215 | Receber e deixar passar | combinação | Retirar no momento certo | ↔/↕, uma seta | 8 | 312 | L2C4 → L4C1 → L1C4 → L2C3 → L1C3 → L2C2 → L2C1 → L4C4 |
| 216 | Um equilíbrio desigual | variação | Ler as assimetrias | ↔/↕ | 8 | 728 | L2C3 → L3C4 → L4C1 → L1C4 → L2C4 → L2C2 → L1C3 → L4C2 |
| 217 | Entre duas contribuições | combinação | Retirar no momento certo | ↔/↕, uma seta | 8 | 396 | L1C3 → L3C4 → L2C1 → L3C3 → L2C3 → L2C2 → L1C2 → L3C2 |
| 218 | Consequências em conjunto | aprofundamento | Preparar todos os destinos | ↔/↕ | 8 | 93 | L3C2 → L4C3 → L2C3 → L4C4 → L2C4 → L1C4 → L2C2 → L4C2 |
| 219 | As caixas contam o final | combinação | Planejar pelo final | ↔/↕, uma seta | 9 | 1680 | L4C4 → L3C4 → L1C3 → L4C3 → L4C1 → L2C2 → L4C2 → L3C2 → L3C3 |
| 220 | A espera necessária | retomada | Receber antes de sair | ↔/↕ | 6 | 35 | L2C2 → L3C1 → L1C1 → L3C2 → L2C1 → L1C2 |
| 221 | Um equilíbrio desigual | combinação | Ler as assimetrias | ↔/↕, uma seta | 8 | 672 | L3C2 → L3C3 → L3C4 → L2C3 → L1C4 → L2C4 → L1C1 → L2C1 |
| 222 | Receber e deixar passar | aprofundamento | Retirar no momento certo | ↔/↕ | 8 | 105 | L4C2 → L3C4 → L3C3 → L2C1 → L3C2 → L1C1 → L3C1 → L2C2 |
| 223 | Uma decisão prepara outra | combinação | Momentos conectados | ↔/↕, uma seta | 8 | 526 | L1C4 → L1C3 → L1C2 → L3C4 → L2C2 → L2C4 → L2C3 → L3C1 |
| 224 | A passagem aberta | combinação | Abrir passagem | ↔/↕ | 8 | 396 | L2C3 → L3C4 → L3C3 → L3C2 → L1C1 → L1C3 → L4C4 → L4C3 |
| 225 | Duas voltas, um encontro | marcante | Bifurcar e reunir | ↔/↕, uma seta | 10 | 2900 | L2C2 → L1C3 → L1C2 → L1C4 → L3C2 → L3C4 → L2C1 → L3C1 → L2C4 → L4C2 |

## 10. Receptores compartilhados

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 226 | O apoio compartilhado | variação | Peça compartilhada | ↔/↕, uma seta | 7 | 70 | L3C3 → L1C2 → L2C3 → L1C1 → L2C2 → L3C2 → L4C3 |
| 227 | Entre duas contribuições | retomada | Retirar no momento certo | ↔/↕ | 5 | 15 | L3C1 → L2C3 → L2C1 → L1C3 → L2C2 |
| 228 | A peça muda de papel | combinação | Funções sucessivas | ↔/↕, uma seta | 8 | 960 | L2C1 → L3C1 → L1C2 → L3C3 → L1C4 → L1C3 → L1C1 → L2C3 |
| 229 | O apoio compartilhado | variação | Peça compartilhada | ↔/↕ | 8 | 768 | L3C3 → L1C2 → L3C2 → L3C1 → L2C3 → L2C1 → L3C4 → L2C2 |
| 230 | O apoio compartilhado | combinação | Peça compartilhada | ↔/↕, uma seta | 7 | 63 | L2C1 → L2C3 → L1C2 → L1C3 → L3C3 → L2C2 → L3C2 |
| 231 | A espera necessária | aprofundamento | Receber antes de sair | ↔/↕ | 9 | 810 | L1C3 → L2C4 → L1C1 → L2C2 → L3C3 → L2C1 → L3C4 → L1C2 → L1C4 |
| 232 | A espera necessária | retomada | Receber antes de sair | ↔/↕, uma seta | 6 | 45 | L2C3 → L3C1 → L1C3 → L1C2 → L2C1 → L2C2 |
| 233 | Troca de receptor | combinação | Revezar receptores | ↔/↕ | 8 | 518 | L1C1 → L2C3 → L4C1 → L3C3 → L3C2 → L4C3 → L3C4 → L3C1 |
| 234 | O encontro das regiões | variação | Peça compartilhada | ↔/↕, uma seta | 8 | 545 | L1C3 → L1C4 → L2C3 → L2C4 → L3C4 → L1C1 → L1C2 → L3C3 |
| 235 | Receber e deixar passar | combinação | Retirar no momento certo | ↔/↕ | 8 | 468 | L2C1 → L1C1 → L4C2 → L1C3 → L3C2 → L2C2 → L2C4 → L2C3 |
| 236 | O limite já chegou | aprofundamento | Proteger metas | ↔/↕, uma seta | 8 | 236 | L2C1 → L2C2 → L1C1 → L1C2 → L1C3 → L2C3 → L3C3 → L4C2 |
| 237 | Receber e deixar passar | combinação | Retirar no momento certo | ↔/↕ | 8 | 520 | L3C1 → L2C3 → L4C4 → L1C1 → L1C3 → L3C2 → L3C3 → L1C4 |
| 238 | A hora exata de sair | marcante | Retirar no momento certo | ↔/↕, uma seta | 9 | 707 | L3C2 → L2C4 → L4C2 → L1C4 → L3C3 → L2C2 → L3C1 → L3C4 → L2C3 |
| 239 | Entre duas contribuições | retomada | Retirar no momento certo | ↔/↕ | 6 | 66 | L2C1 → L3C3 → L2C2 → L3C1 → L2C3 → L1C3 |
| 240 | Troca de receptor | combinação | Revezar receptores | ↔/↕, uma seta | 6 | 24 | L2C2 → L1C1 → L2C3 → L3C4 → L2C1 → L2C4 |
| 241 | Uma peça em comum | variação | Peça compartilhada | ↔/↕ | 8 | 840 | L3C4 → L1C2 → L3C1 → L3C2 → L1C3 → L2C4 → L2C1 → L2C2 |
| 242 | Entre duas contribuições | combinação | Retirar no momento certo | ↔/↕, uma seta | 6 | 42 | L2C3 → L2C2 → L2C1 → L1C3 → L3C2 → L1C2 |
| 243 | A sequência das condições | aprofundamento | Momentos conectados | ↔/↕ | 9 | 882 | L1C2 → L2C4 → L4C1 → L4C3 → L4C2 → L3C2 → L2C2 → L3C1 → L3C3 |
| 244 | A passagem aberta | combinação | Abrir passagem | ↔/↕, uma seta | 7 | 114 | L1C1 → L2C2 → L3C1 → L3C3 → L1C2 → L2C1 → L2C3 |
| 245 | O valor que se prepara | retomada | Acumular contribuições | ↔/↕ | 5 | 20 | L2C2 → L2C1 → L2C3 → L3C1 → L1C2 |
| 246 | O valor que se prepara | combinação | Acumular contribuições | ↔/↕, uma seta | 7 | 126 | L4C3 → L3C1 → L3C3 → L4C1 → L2C2 → L3C2 → L1C2 |
| 247 | Uma peça em comum | aprofundamento | Peça compartilhada | ↔/↕ | 9 | 474 | L1C4 → L1C2 → L1C3 → L2C3 → L3C3 → L2C2 → L4C1 → L2C4 → L4C3 |
| 248 | Receber para continuar | combinação | Receber antes de sair | ↔/↕, uma seta | 8 | 588 | L4C3 → L2C3 → L1C2 → L4C4 → L4C1 → L1C3 → L4C2 → L3C3 |
| 249 | Dois valores diferentes | combinação | Acumuladores diferentes | ↔/↕ | 7 | 100 | L2C4 → L2C2 → L2C3 → L1C4 → L1C2 → L2C1 → L1C3 |
| 250 | A hora exata de sair | marcante | Retirar no momento certo | ↔/↕ | 8 | 270 | L2C1 → L1C4 → L3C1 → L2C2 → L1C3 → L1C1 → L3C4 → L1C2 |

## 11. Proteger e liberar

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 251 | Quem segura o repasse | variação | Proteger metas | ↔/↕, uma seta | 7 | 84 | L3C2 → L1C1 → L4C2 → L1C2 → L2C2 → L2C3 → L1C3 |
| 252 | Receber para continuar | retomada | Receber antes de sair | ↔/↕ | 5 | 15 | L1C3 → L2C3 → L2C2 → L2C1 → L1C2 |
| 253 | Troca de receptor | combinação | Revezar receptores | ↔/↕, uma seta | 8 | 320 | L3C2 → L1C2 → L2C3 → L3C3 → L4C4 → L3C1 → L4C2 → L3C4 |
| 254 | Uma caixa protegida | variação | Proteger metas | ↔/↕ | 7 | 81 | L2C3 → L1C2 → L1C1 → L2C4 → L1C3 → L2C2 → L1C4 |
| 255 | Receber e deixar passar | combinação | Retirar no momento certo | ↔/↕, uma seta | 7 | 126 | L1C3 → L1C4 → L2C1 → L2C4 → L2C3 → L2C2 → L3C2 |
| 256 | Uma caixa protegida | aprofundamento | Proteger metas | ↔/↕ | 9 | 450 | L4C3 → L3C3 → L3C4 → L4C4 → L2C1 → L3C1 → L2C4 → L4C2 → L1C3 |
| 257 | Contribuições reunidas | retomada | Acumular contribuições | ↔/↕, uma seta | 5 | 20 | L1C3 → L2C2 → L2C1 → L2C3 → L1C1 |
| 258 | Um clique, dois acordos | combinação | Preparar todos os destinos | ↔/↕ | 7 | 102 | L2C2 → L1C4 → L2C4 → L1C2 → L2C1 → L1C1 → L2C3 |
| 259 | Quem segura o repasse | variação | Proteger metas | ↔/↕, uma seta | 8 | 336 | L4C2 → L2C2 → L1C1 → L4C4 → L3C1 → L2C1 → L1C2 → L2C3 |
| 260 | O segundo destino | combinação | Revezar receptores | ↔/↕ | 7 | 78 | L1C2 → L1C3 → L2C1 → L1C1 → L3C4 → L2C2 → L1C4 |
| 261 | Lados que pedem diferente | aprofundamento | Ler as assimetrias | ↔/↕, uma seta | 8 | 80 | L3C1 → L3C2 → L3C3 → L2C3 → L1C3 → L2C4 → L2C2 → L2C1 |
| 262 | A hora exata de sair | combinação | Retirar no momento certo | ↔/↕ | 7 | 36 | L1C1 → L1C3 → L2C4 → L2C3 → L2C2 → L2C1 → L1C2 |
| 263 | Uma decisão prepara outra | marcante | Momentos conectados | ↔/↕, uma seta | 9 | 234 | L4C3 → L1C3 → L2C4 → L2C3 → L1C4 → L4C1 → L2C2 → L1C2 → L3C2 |
| 264 | Receber para continuar | retomada | Receber antes de sair | ↔/↕ | 5 | 12 | L2C1 → L1C2 → L2C3 → L1C3 → L1C1 |
| 265 | A peça muda de papel | combinação | Funções sucessivas | ↔/↕, uma seta | 8 | 1920 | L3C4 → L4C1 → L3C3 → L1C4 → L2C2 → L2C1 → L3C1 → L3C2 |
| 266 | Quem segura o repasse | variação | Proteger metas | ↔/↕ | 7 | 105 | L4C4 → L1C2 → L4C2 → L2C2 → L3C2 → L2C1 → L1C1 |
| 267 | O apoio compartilhado | combinação | Peça compartilhada | ↔/↕, uma seta | 8 | 567 | L1C4 → L3C1 → L2C3 → L1C3 → L1C1 → L1C2 → L2C4 → L2C1 |
| 268 | Uma ajuda antes de sair | aprofundamento | Receber antes de sair | ↔/↕ | 8 | 252 | L2C2 → L4C4 → L4C3 → L3C3 → L2C3 → L1C4 → L3C1 → L1C2 |
| 269 | Acumular sem exagerar | combinação | Acumuladores diferentes | ↔/↕, uma seta | 8 | 960 | L1C4 → L1C1 → L1C2 → L1C3 → L3C3 → L2C4 → L2C2 → L2C3 |
| 270 | O receptor seguinte | retomada | Abrir passagem | ↔/↕ | 5 | 8 | L1C2 → L1C1 → L2C1 → L2C2 → L1C3 |
| 271 | Duas voltas, um encontro | combinação | Bifurcar e reunir | ↔/↕, uma seta | 8 | 630 | L2C2 → L2C1 → L1C1 → L1C3 → L1C2 → L3C1 → L3C3 → L2C3 |
| 272 | A hora exata de sair | aprofundamento | Retirar no momento certo | ↔/↕ | 8 | 122 | L3C1 → L2C2 → L3C2 → L1C2 → L2C3 → L3C3 → L1C3 → L4C2 |
| 273 | Quem segura o repasse | combinação | Proteger metas | ↔/↕, uma seta | 8 | 630 | L1C1 → L1C4 → L3C4 → L2C3 → L1C2 → L3C3 → L2C4 → L1C3 |
| 274 | Entre duas contribuições | combinação | Retirar no momento certo | ↔/↕ | 7 | 72 | L3C1 → L1C2 → L3C2 → L1C3 → L2C1 → L2C2 → L2C3 |
| 275 | Relações encadeadas | marcante | Momentos conectados | ↔/↕, uma seta | 10 | 6920 | L3C2 → L3C3 → L4C2 → L2C2 → L4C1 → L1C1 → L2C3 → L2C1 → L4C3 → L3C1 |

## 12. Duas direções em curva

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 276 | Duas direções em curva | variação | Receber antes de sair | ↔/↕, duas perpendiculares | 5 | 6 | L2C1 → L2C3 → L2C2 → L1C1 → L1C2 |
| 277 | Encontro no centro | retomada | Acumular contribuições | ↔/↕ | 6 | 40 | L2C1 → L3C1 → L2C3 → L2C2 → L1C3 → L3C3 |
| 278 | Consequências em conjunto | combinação | Preparar todos os destinos | ↔/↕, uma seta | 7 | 112 | L2C2 → L3C4 → L2C1 → L3C3 → L2C3 → L1C3 → L3C1 |
| 279 | Consequências em conjunto | variação | Preparar todos os destinos | ↔/↕ | 8 | 366 | L3C3 → L2C3 → L4C3 → L3C4 → L2C1 → L1C3 → L4C2 → L2C2 |
| 280 | Troca de receptor | combinação | Revezar receptores | ↔/↕, duas perpendiculares | 7 | 70 | L3C3 → L2C1 → L4C2 → L3C2 → L3C4 → L1C3 → L3C1 |
| 281 | A diferença está na meta | aprofundamento | Ler as assimetrias | ↔/↕ | 9 | 648 | L2C4 → L2C2 → L4C3 → L3C4 → L2C1 → L3C2 → L2C3 → L1C2 → L1C1 |
| 282 | Depois do espaço vazio | retomada | Abrir passagem | ↔/↕, uma seta | 6 | 75 | L3C3 → L2C2 → L1C2 → L2C3 → L3C1 → L2C1 |
| 283 | Relações encadeadas | combinação | Momentos conectados | ↔/↕ | 8 | 350 | L4C1 → L1C3 → L4C3 → L4C2 → L3C3 → L2C1 → L3C1 → L3C2 |
| 284 | Consequências em conjunto | variação | Preparar todos os destinos | ↔/↕, duas perpendiculares | 7 | 63 | L3C2 → L3C3 → L2C1 → L1C1 → L1C3 → L3C1 → L2C3 |
| 285 | A peça muda de papel | combinação | Funções sucessivas | ↔/↕ | 7 | 76 | L3C2 → L1C4 → L3C4 → L2C4 → L3C3 → L3C1 → L2C3 |
| 286 | O valor que se prepara | aprofundamento | Acumular contribuições | ↔/↕, uma seta | 9 | 2070 | L4C3 → L4C4 → L2C2 → L3C2 → L2C4 → L1C3 → L2C3 → L1C4 → L2C1 |
| 287 | O encontro das regiões | combinação | Peça compartilhada | ↔/↕ | 8 | 544 | L1C2 → L2C1 → L2C2 → L4C3 → L1C3 → L3C2 → L2C3 → L1C1 |
| 288 | Caminhos que se reencontram | marcante | Bifurcar e reunir | ↔/↕, duas perpendiculares | 8 | 105 | L2C2 → L2C4 → L2C3 → L1C3 → L1C1 → L3C3 → L3C1 → L2C1 |
| 289 | Contribuições reunidas | retomada | Acumular contribuições | ↔/↕ | 6 | 72 | L3C1 → L1C1 → L2C1 → L1C2 → L2C3 → L2C2 |
| 290 | O segundo destino | combinação | Revezar receptores | ↔/↕, uma seta | 7 | 98 | L1C4 → L2C3 → L2C2 → L2C4 → L2C1 → L1C3 → L3C4 |
| 291 | Consequências em conjunto | variação | Preparar todos os destinos | ↔/↕ | 9 | 3000 | L3C4 → L3C3 → L2C2 → L4C4 → L2C1 → L4C3 → L3C2 → L1C3 → L1C4 |
| 292 | A hora exata de sair | combinação | Retirar no momento certo | ↔/↕, duas perpendiculares | 7 | 100 | L2C1 → L1C3 → L2C4 → L2C3 → L3C2 → L2C2 → L3C3 |
| 293 | Quem segura o repasse | aprofundamento | Proteger metas | ↔/↕ | 9 | 670 | L2C3 → L1C3 → L2C1 → L4C1 → L3C2 → L3C3 → L2C2 → L1C1 → L1C2 |
| 294 | Entre duas contribuições | combinação | Retirar no momento certo | ↔/↕, uma seta | 8 | 784 | L3C3 → L4C4 → L2C1 → L1C4 → L1C2 → L2C4 → L2C3 → L2C2 |
| 295 | A hora exata de sair | retomada | Retirar no momento certo | ↔/↕ | 6 | 48 | L3C3 → L2C3 → L1C1 → L1C2 → L2C2 → L2C1 |
| 296 | As caixas contam o final | combinação | Planejar pelo final | ↔/↕, duas perpendiculares | 7 | 90 | L2C1 → L4C2 → L1C1 → L2C2 → L4C1 → L3C2 → L3C1 |
| 297 | O segundo destino | aprofundamento | Revezar receptores | ↔/↕ | 10 | 2374 | L3C4 → L3C2 → L2C2 → L1C4 → L2C4 → L3C3 → L2C3 → L4C4 → L3C1 → L2C1 |
| 298 | Lados que pedem diferente | combinação | Ler as assimetrias | ↔/↕, uma seta | 8 | 636 | L1C4 → L1C3 → L2C3 → L1C1 → L2C1 → L3C1 → L1C2 → L2C4 |
| 299 | Receber e deixar passar | combinação | Retirar no momento certo | ↔/↕ | 9 | 2874 | L1C3 → L3C4 → L1C1 → L2C2 → L3C3 → L3C1 → L1C2 → L2C4 → L3C2 |
| 300 | Caminhos que se reencontram | marcante | Bifurcar e reunir | ↔/↕ | 8 | 41 | L2C3 → L1C2 → L3C3 → L3C1 → L1C3 → L1C1 → L2C1 → L1C4 |

## 13. Preparar o encerramento

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 301 | A última contribuição | variação | Planejar pelo final | ↔/↕, uma seta, duas perpendiculares | 8 | 98 | L3C4 → L4C2 → L2C3 → L3C2 → L3C3 → L4C3 → L4C1 → L4C4 |
| 302 | A passagem aberta | retomada | Abrir passagem | ↔/↕ | 6 | 40 | L3C1 → L1C1 → L2C3 → L2C2 → L2C1 → L1C3 |
| 303 | Relações encadeadas | combinação | Momentos conectados | ↔/↕, duas perpendiculares | 9 | 1504 | L2C2 → L2C4 → L1C2 → L3C4 → L2C1 → L1C3 → L3C1 → L3C2 → L2C3 |
| 304 | Comece pelo encerramento | variação | Planejar pelo final | ↔/↕ | 7 | 60 | L3C1 → L1C3 → L1C2 → L4C3 → L2C2 → L4C1 → L4C2 |
| 305 | Três funções no caminho | combinação | Funções sucessivas | ↔/↕, uma seta | 9 | 972 | L3C2 → L1C4 → L3C4 → L2C3 → L3C3 → L2C4 → L2C2 → L2C1 → L3C1 |
| 306 | Contribuições reunidas | aprofundamento | Acumular contribuições | ↔/↕ | 8 | 104 | L2C2 → L1C3 → L2C3 → L1C2 → L2C1 → L2C4 → L4C2 → L1C1 |
| 307 | Entre duas contribuições | retomada | Retirar no momento certo | ↔/↕, duas perpendiculares | 7 | 280 | L3C1 → L1C1 → L2C4 → L2C3 → L3C4 → L2C2 → L4C2 |
| 308 | Uma ajuda antes de sair | combinação | Receber antes de sair | ↔/↕ | 8 | 496 | L2C2 → L1C2 → L1C4 → L3C1 → L3C2 → L1C1 → L3C3 → L2C1 |
| 309 | A última contribuição | variação | Planejar pelo final | ↔/↕, uma seta | 8 | 840 | L4C4 → L1C4 → L1C2 → L4C3 → L3C4 → L3C1 → L1C3 → L3C3 |
| 310 | O segundo destino | combinação | Revezar receptores | ↔/↕ | 7 | 41 | L2C2 → L3C2 → L2C3 → L2C1 → L3C1 → L2C4 → L1C3 |
| 311 | Uma origem em dois caminhos | aprofundamento | Bifurcar e reunir | ↔/↕, duas perpendiculares | 9 | 890 | L2C2 → L1C2 → L1C4 → L3C2 → L3C4 → L2C3 → L1C3 → L2C4 → L3C1 |
| 312 | Entre duas contribuições | combinação | Retirar no momento certo | ↔/↕ | 7 | 56 | L2C3 → L2C4 → L1C2 → L2C2 → L1C1 → L2C1 → L1C3 |
| 313 | Entre duas contribuições | marcante | Retirar no momento certo | ↔/↕, uma seta | 9 | 756 | L4C3 → L3C2 → L1C3 → L4C1 → L3C1 → L2C1 → L4C4 → L1C4 → L3C3 |
| 314 | O receptor seguinte | retomada | Abrir passagem | ↔/↕ | 6 | 24 | L1C3 → L2C2 → L2C1 → L3C1 → L2C3 → L1C2 |
| 315 | Um clique, dois acordos | combinação | Preparar todos os destinos | ↔/↕, uma seta, duas perpendiculares | 8 | 256 | L2C3 → L1C3 → L1C1 → L2C4 → L2C2 → L3C4 → L1C4 → L1C2 |
| 316 | Comece pelo encerramento | variação | Planejar pelo final | ↔/↕ | 7 | 24 | L1C3 → L3C4 → L4C1 → L2C4 → L4C4 → L4C3 → L3C3 |
| 317 | A vez do próximo | combinação | Revezar receptores | ↔/↕, uma seta | 8 | 320 | L3C3 → L4C1 → L2C3 → L2C2 → L2C4 → L3C1 → L2C1 → L1C2 |
| 318 | A diferença está na meta | aprofundamento | Ler as assimetrias | ↔/↕ | 8 | 45 | L1C4 → L2C2 → L1C3 → L3C1 → L4C1 → L2C1 → L2C3 → L2C4 |
| 319 | Receber e deixar passar | combinação | Retirar no momento certo | ↔/↕, duas perpendiculares | 8 | 384 | L3C3 → L1C4 → L3C4 → L4C2 → L2C4 → L2C3 → L1C2 → L2C2 |
| 320 | Receber para continuar | retomada | Receber antes de sair | ↔/↕ | 6 | 33 | L1C1 → L2C1 → L1C3 → L3C1 → L1C2 → L2C3 |
| 321 | Depois do espaço vazio | combinação | Abrir passagem | ↔/↕, uma seta | 8 | 176 | L1C1 → L2C2 → L2C1 → L3C1 → L2C3 → L1C2 → L1C3 → L2C4 |
| 322 | Esperar, receber, abrir | aprofundamento | Funções sucessivas | ↔/↕ | 8 | 72 | L4C2 → L2C2 → L3C4 → L2C4 → L2C3 → L2C1 → L1C3 → L3C1 |
| 323 | Contribuições reunidas | combinação | Acumular contribuições | ↔/↕, duas perpendiculares | 8 | 420 | L2C4 → L4C3 → L2C1 → L1C1 → L2C3 → L2C2 → L1C3 → L4C2 |
| 324 | O encontro das regiões | combinação | Peça compartilhada | ↔/↕ | 7 | 82 | L3C3 → L3C1 → L1C2 → L2C2 → L2C1 → L1C1 → L3C4 |
| 325 | Receber e deixar passar | marcante | Retirar no momento certo | ↔/↕, uma seta | 9 | 756 | L1C3 → L4C1 → L2C3 → L2C2 → L3C1 → L2C1 → L1C2 → L4C2 → L3C3 |

## 14. Conectar regiões

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 326 | Uma decisão prepara outra | variação | Momentos conectados | ↔/↕, uma seta | 7 | 72 | L1C2 → L2C3 → L3C3 → L4C2 → L3C2 → L4C1 → L3C1 |
| 327 | Receber e deixar passar | retomada | Retirar no momento certo | ↔/↕ | 7 | 210 | L2C4 → L1C2 → L2C3 → L4C4 → L4C2 → L1C4 → L2C2 |
| 328 | Receber para continuar | combinação | Receber antes de sair | ↔/↕, duas perpendiculares | 6 | 14 | L3C2 → L1C2 → L3C1 → L2C1 → L1C1 → L2C2 |
| 329 | Uma decisão prepara outra | variação | Momentos conectados | ↔/↕ | 9 | 2920 | L1C4 → L2C3 → L4C4 → L3C4 → L1C1 → L1C3 → L4C2 → L2C2 → L2C4 |
| 330 | Troca de receptor | combinação | Revezar receptores | ↔/↕, uma seta | 7 | 32 | L3C2 → L2C3 → L3C4 → L2C2 → L2C4 → L2C1 → L3C3 |
| 331 | Caminhos que se reencontram | aprofundamento | Bifurcar e reunir | ↔/↕ | 10 | 2396 | L2C2 → L4C1 → L1C2 → L3C3 → L1C1 → L3C2 → L3C1 → L4C3 → L4C2 → L2C1 |
| 332 | Receber para continuar | retomada | Receber antes de sair | ↔/↕, duas perpendiculares | 6 | 60 | L3C3 → L1C1 → L1C2 → L2C2 → L3C1 → L3C2 |
| 333 | O limite já chegou | combinação | Proteger metas | ↔/↕ | 8 | 240 | L4C2 → L3C2 → L3C1 → L2C2 → L3C4 → L3C3 → L1C2 → L4C1 |
| 334 | Relações encadeadas | variação | Momentos conectados | ↔/↕, uma seta | 7 | 168 | L3C1 → L3C2 → L1C1 → L2C2 → L2C4 → L2C1 → L2C3 |
| 335 | Consequências em conjunto | combinação | Preparar todos os destinos | ↔/↕ | 8 | 398 | L3C2 → L1C4 → L3C1 → L2C4 → L2C1 → L3C4 → L4C3 → L3C3 |
| 336 | Comece pelo encerramento | aprofundamento | Planejar pelo final | ↔/↕, uma seta, duas perpendiculares | 9 | 252 | L1C3 → L2C3 → L3C1 → L2C2 → L1C1 → L3C4 → L2C1 → L2C4 → L4C4 |
| 337 | O segundo destino | combinação | Revezar receptores | ↔/↕ | 8 | 305 | L3C3 → L4C1 → L2C1 → L1C1 → L3C2 → L2C3 → L3C4 → L3C1 |
| 338 | Relações encadeadas | marcante | Momentos conectados | ↔/↕, uma seta | 8 | 137 | L2C2 → L1C1 → L4C4 → L1C2 → L2C3 → L2C4 → L3C2 → L2C1 |
| 339 | Receber e deixar passar | retomada | Retirar no momento certo | ↔/↕ | 6 | 28 | L1C3 → L3C2 → L2C1 → L2C2 → L1C1 → L2C3 |
| 340 | Relações encadeadas | combinação | Momentos conectados | ↔/↕, duas perpendiculares | 7 | 70 | L4C1 → L1C4 → L1C3 → L2C3 → L4C3 → L2C4 → L2C2 |
| 341 | Relações encadeadas | variação | Momentos conectados | ↔/↕ | 9 | 1824 | L4C3 → L2C1 → L3C4 → L1C4 → L1C1 → L2C2 → L3C2 → L1C2 → L2C3 |
| 342 | A peça muda de papel | combinação | Funções sucessivas | ↔/↕, uma seta | 7 | 126 | L2C3 → L3C3 → L4C4 → L1C4 → L3C1 → L3C2 → L3C4 |
| 343 | O valor que se prepara | aprofundamento | Acumular contribuições | ↔/↕ | 9 | 257 | L2C1 → L2C2 → L3C2 → L4C3 → L1C1 → L4C2 → L1C3 → L3C1 → L3C3 |
| 344 | O encontro das regiões | combinação | Peça compartilhada | ↔/↕, duas perpendiculares | 7 | 40 | L4C2 → L3C3 → L3C2 → L2C3 → L1C3 → L1C1 → L4C3 |
| 345 | Encontro no centro | retomada | Acumular contribuições | ↔/↕ | 6 | 37 | L3C1 → L2C3 → L3C2 → L2C1 → L1C1 → L2C2 |
| 346 | Acumular sem exagerar | combinação | Acumuladores diferentes | ↔/↕, uma seta | 8 | 480 | L1C3 → L3C3 → L1C1 → L1C2 → L2C3 → L3C1 → L2C1 → L2C2 |
| 347 | A vez do próximo | aprofundamento | Revezar receptores | ↔/↕ | 9 | 396 | L3C3 → L3C2 → L1C4 → L3C4 → L4C3 → L1C2 → L2C4 → L3C1 → L1C1 |
| 348 | Uma origem em dois caminhos | combinação | Bifurcar e reunir | ↔/↕, duas perpendiculares | 7 | 45 | L2C1 → L3C2 → L2C3 → L1C1 → L3C1 → L3C3 → L1C3 |
| 349 | Receber e deixar passar | combinação | Retirar no momento certo | ↔/↕ | 8 | 221 | L2C3 → L2C2 → L1C1 → L2C1 → L4C3 → L4C2 → L1C3 → L3C2 |
| 350 | Uma decisão prepara outra | marcante | Momentos conectados | ↔/↕ | 8 | 60 | L4C4 → L4C3 → L4C2 → L2C1 → L3C3 → L4C1 → L3C4 → L3C2 |

## 15. Quatro destinos

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 351 | Quatro destinos, um clique | variação | Receber antes de sair | ↔/↕, quatro setas | 4 | 1 | L2C2 → L1C2 → L1C1 → L2C1 |
| 352 | Uma ajuda antes de sair | retomada | Receber antes de sair | ↔/↕ | 6 | 45 | L3C3 → L3C1 → L1C2 → L1C1 → L2C3 → L2C1 |
| 353 | Quem segura o repasse | combinação | Proteger metas | ↔/↕, duas perpendiculares | 8 | 236 | L1C4 → L3C4 → L2C3 → L4C4 → L4C2 → L1C3 → L1C1 → L2C4 |
| 354 | Destinos preparados | variação | Preparar todos os destinos | ↔/↕ | 6 | 10 | L1C2 → L2C2 → L2C1 → L3C3 → L2C3 → L1C3 |
| 355 | Um clique, dois acordos | combinação | Preparar todos os destinos | ↔/↕, quatro setas | 8 | 324 | L3C2 → L3C4 → L1C4 → L4C2 → L3C1 → L3C3 → L1C2 → L2C3 |
| 356 | A última contribuição | aprofundamento | Planejar pelo final | ↔/↕ | 8 | 40 | L2C1 → L1C1 → L3C3 → L4C4 → L1C4 → L3C4 → L2C4 → L2C2 |
| 357 | Contribuições reunidas | retomada | Acumular contribuições | ↔/↕, uma seta, duas perpendiculares | 6 | 60 | L2C1 → L2C3 → L3C3 → L1C2 → L3C2 → L2C2 |
| 358 | Lados que pedem diferente | combinação | Ler as assimetrias | ↔/↕ | 7 | 45 | L3C4 → L1C2 → L3C3 → L2C1 → L2C3 → L1C4 → L2C4 |
| 359 | Um clique, dois acordos | variação | Preparar todos os destinos | ↔/↕, duas perpendiculares | 9 | 1344 | L1C4 → L4C1 → L2C1 → L3C3 → L1C3 → L3C1 → L4C3 → L3C2 → L2C4 |
| 360 | Relações encadeadas | combinação | Momentos conectados | ↔/↕ | 7 | 30 | L2C4 → L1C4 → L1C2 → L1C3 → L1C1 → L2C3 → L2C2 |
| 361 | A passagem aberta | aprofundamento | Abrir passagem | ↔/↕, quatro setas | 9 | 390 | L4C1 → L1C4 → L1C2 → L1C1 → L2C2 → L3C1 → L2C1 → L3C3 → L2C3 |
| 362 | Esperar, receber, abrir | combinação | Funções sucessivas | ↔/↕ | 6 | 14 | L1C2 → L2C2 → L1C4 → L2C4 → L2C3 → L2C1 |
| 363 | Caminhos que se reencontram | marcante | Bifurcar e reunir | ↔/↕, uma seta | 9 | 106 | L2C3 → L3C3 → L4C2 → L2C2 → L1C2 → L1C4 → L3C2 → L3C4 → L2C4 |
| 364 | A espera necessária | retomada | Receber antes de sair | ↔/↕ | 6 | 35 | L1C3 → L2C1 → L1C2 → L1C1 → L3C3 → L2C3 |
| 365 | Uma ajuda antes de sair | combinação | Receber antes de sair | ↔/↕, duas perpendiculares | 7 | 90 | L1C1 → L3C3 → L1C2 → L3C1 → L2C2 → L2C3 → L3C4 |
| 366 | Destinos preparados | variação | Preparar todos os destinos | ↔/↕ | 8 | 183 | L3C3 → L1C4 → L1C2 → L3C4 → L3C2 → L4C2 → L1C3 → L4C3 |
| 367 | A vez do próximo | combinação | Revezar receptores | ↔/↕, quatro setas | 8 | 432 | L2C3 → L1C4 → L2C2 → L1C2 → L2C4 → L3C2 → L4C2 → L2C1 |
| 368 | Uma origem em dois caminhos | aprofundamento | Bifurcar e reunir | ↔/↕ | 8 | 48 | L1C2 → L3C1 → L3C2 → L4C2 → L4C3 → L2C2 → L2C3 → L3C3 |
| 369 | A hora exata de sair | combinação | Retirar no momento certo | ↔/↕, uma seta | 8 | 504 | L1C3 → L2C1 → L2C2 → L3C1 → L1C1 → L4C1 → L3C2 → L3C3 |
| 370 | A passagem aberta | retomada | Abrir passagem | ↔/↕ | 6 | 37 | L2C2 → L1C1 → L3C2 → L2C3 → L1C2 → L2C1 |
| 371 | Receber e deixar passar | combinação | Retirar no momento certo | ↔/↕, uma seta, duas perpendiculares | 8 | 480 | L3C1 → L3C3 → L2C1 → L3C4 → L1C4 → L2C4 → L2C2 → L2C3 |
| 372 | Consequências em conjunto | aprofundamento | Preparar todos os destinos | ↔/↕ | 8 | 70 | L4C4 → L3C2 → L3C1 → L1C1 → L3C3 → L2C3 → L1C3 → L4C3 |
| 373 | A última contribuição | combinação | Planejar pelo final | ↔/↕, quatro setas | 9 | 1776 | L4C4 → L4C2 → L3C1 → L1C4 → L2C3 → L3C3 → L3C4 → L2C2 → L2C4 |
| 374 | O segundo destino | combinação | Revezar receptores | ↔/↕ | 7 | 30 | L2C3 → L2C2 → L1C3 → L2C4 → L2C1 → L3C3 → L3C4 |
| 375 | Duas voltas, um encontro | marcante | Bifurcar e reunir | ↔/↕, uma seta | 10 | 1260 | L3C3 → L4C3 → L3C1 → L2C1 → L4C1 → L1C2 → L2C3 → L2C2 → L1C1 → L3C2 |

## 16. Funções que mudam

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 376 | Três funções no caminho | variação | Funções sucessivas | ↔/↕, uma seta | 7 | 160 | L1C4 → L3C3 → L3C1 → L1C2 → L3C2 → L2C3 → L3C4 |
| 377 | O valor que se prepara | retomada | Acumular contribuições | ↔/↕ | 6 | 40 | L2C1 → L3C2 → L2C3 → L1C3 → L2C2 → L3C3 |
| 378 | A diferença está na meta | combinação | Ler as assimetrias | ↔/↕, uma seta, duas perpendiculares | 8 | 224 | L4C2 → L2C1 → L1C3 → L4C1 → L4C3 → L3C2 → L2C2 → L3C3 |
| 379 | Esperar, receber, abrir | variação | Funções sucessivas | ↔/↕ | 8 | 352 | L2C1 → L3C3 → L2C2 → L3C1 → L3C2 → L2C3 → L3C4 → L1C3 |
| 380 | A sequência das condições | combinação | Momentos conectados | ↔/↕, quatro setas | 7 | 44 | L3C3 → L1C2 → L2C2 → L1C1 → L2C3 → L2C1 → L3C2 |
| 381 | A passagem aberta | aprofundamento | Abrir passagem | ↔/↕ | 9 | 1008 | L2C1 → L1C4 → L3C4 → L3C3 → L2C3 → L2C2 → L1C3 → L4C4 → L3C2 |
| 382 | O receptor seguinte | retomada | Abrir passagem | ↔/↕, uma seta | 5 | 8 | L2C2 → L2C1 → L2C3 → L1C2 → L1C1 |
| 383 | O valor que se prepara | combinação | Acumular contribuições | ↔/↕ | 8 | 386 | L2C2 → L2C1 → L1C2 → L3C2 → L1C4 → L1C1 → L2C3 → L3C4 |
| 384 | Esperar, receber, abrir | variação | Funções sucessivas | ↔/↕, duas perpendiculares | 7 | 26 | L2C2 → L2C1 → L3C2 → L3C4 → L3C3 → L1C1 → L3C1 |
| 385 | Receber para continuar | combinação | Receber antes de sair | ↔/↕ | 8 | 576 | L3C2 → L3C4 → L1C4 → L3C1 → L3C3 → L2C3 → L2C4 → L2C2 |
| 386 | Dois valores diferentes | aprofundamento | Acumuladores diferentes | ↔/↕, quatro setas | 8 | 159 | L3C4 → L3C1 → L3C2 → L3C3 → L2C4 → L2C2 → L1C4 → L2C3 |
| 387 | A vez do próximo | combinação | Revezar receptores | ↔/↕ | 8 | 230 | L2C3 → L4C4 → L4C3 → L3C1 → L2C2 → L2C4 → L2C1 → L3C4 |
| 388 | A hora exata de sair | marcante | Retirar no momento certo | ↔/↕, uma seta | 8 | 128 | L3C3 → L1C3 → L1C1 → L3C2 → L3C4 → L2C3 → L2C2 → L2C4 |
| 389 | Encontro no centro | retomada | Acumular contribuições | ↔/↕ | 7 | 136 | L4C4 → L3C1 → L3C3 → L3C2 → L4C3 → L1C3 → L4C1 |
| 390 | Uma caixa protegida | combinação | Proteger metas | ↔/↕, duas perpendiculares | 7 | 36 | L1C2 → L2C2 → L1C3 → L3C1 → L4C1 → L2C1 → L1C1 |
| 391 | Esperar, receber, abrir | variação | Funções sucessivas | ↔/↕ | 8 | 165 | L1C2 → L1C1 → L1C4 → L2C1 → L2C2 → L2C4 → L2C3 → L3C4 |
| 392 | Consequências em conjunto | combinação | Preparar todos os destinos | ↔/↕, uma seta, quatro setas | 8 | 510 | L2C4 → L3C3 → L1C4 → L2C1 → L3C4 → L4C1 → L4C4 → L3C2 |
| 393 | As caixas contam o final | aprofundamento | Planejar pelo final | ↔/↕ | 9 | 84 | L4C1 → L4C4 → L4C2 → L3C1 → L3C2 → L3C3 → L2C4 → L3C4 → L1C4 |
| 394 | O segundo destino | combinação | Revezar receptores | ↔/↕, uma seta | 8 | 280 | L2C3 → L4C4 → L4C2 → L2C2 → L3C3 → L1C3 → L2C4 → L2C1 |
| 395 | A hora exata de sair | retomada | Retirar no momento certo | ↔/↕ | 6 | 26 | L3C1 → L1C2 → L2C3 → L2C2 → L3C3 → L2C1 |
| 396 | A hora exata de sair | combinação | Retirar no momento certo | ↔/↕, duas perpendiculares | 7 | 140 | L4C1 → L2C3 → L3C2 → L2C2 → L3C1 → L1C3 → L2C1 |
| 397 | Uma decisão prepara outra | aprofundamento | Momentos conectados | ↔/↕ | 9 | 432 | L1C2 → L3C4 → L3C2 → L4C1 → L3C3 → L3C1 → L2C1 → L4C3 → L4C4 |
| 398 | Depois do espaço vazio | combinação | Abrir passagem | ↔/↕, quatro setas | 7 | 84 | L1C2 → L1C1 → L3C3 → L3C2 → L1C3 → L2C2 → L1C4 |
| 399 | A peça muda de papel | combinação | Funções sucessivas | ↔/↕ | 8 | 236 | L3C2 → L3C4 → L3C3 → L1C2 → L3C1 → L2C2 → L2C3 → L1C4 |
| 400 | Entre duas contribuições | marcante | Retirar no momento certo | ↔/↕ | 9 | 190 | L2C2 → L1C2 → L4C1 → L1C1 → L3C1 → L3C2 → L3C3 → L1C3 → L4C2 |

## 17. Enigmas compactos

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 401 | Entre duas contribuições | variação | Retirar no momento certo | ↔/↕, duas perpendiculares | 8 | 123 | L4C2 → L3C1 → L2C4 → L3C3 → L2C3 → L1C3 → L1C4 → L2C2 |
| 402 | O receptor seguinte | retomada | Abrir passagem | ↔/↕ | 6 | 14 | L3C2 → L2C2 → L1C2 → L1C1 → L2C3 → L2C1 |
| 403 | Encontro no centro | combinação | Acumular contribuições | ↔/↕, quatro setas | 7 | 22 | L2C1 → L2C2 → L3C2 → L1C2 → L4C2 → L3C1 → L3C3 |
| 404 | A hora exata de sair | variação | Retirar no momento certo | ↔/↕ | 6 | 7 | L2C3 → L1C3 → L2C2 → L1C2 → L2C1 → L1C1 |
| 405 | A espera necessária | combinação | Receber antes de sair | ↔/↕, uma seta | 8 | 672 | L2C2 → L4C1 → L4C3 → L3C2 → L1C3 → L3C1 → L1C1 → L1C2 |
| 406 | Dois valores diferentes | aprofundamento | Acumuladores diferentes | ↔/↕ | 7 | 120 | L1C1 → L1C3 → L1C2 → L2C1 → L3C3 → L2C3 → L2C2 |
| 407 | Entre duas contribuições | retomada | Retirar no momento certo | ↔/↕, duas perpendiculares | 6 | 30 | L1C3 → L1C2 → L2C2 → L2C3 → L2C1 → L3C3 |
| 408 | Uma origem em dois caminhos | combinação | Bifurcar e reunir | ↔/↕ | 7 | 16 | L4C4 → L3C3 → L4C3 → L4C1 → L2C3 → L2C1 → L3C1 |
| 409 | A hora exata de sair | variação | Retirar no momento certo | ↔/↕, quatro setas | 7 | 28 | L3C2 → L3C1 → L3C3 → L2C4 → L2C3 → L1C2 → L2C2 |
| 410 | Quem segura o repasse | combinação | Proteger metas | ↔/↕ | 7 | 6 | L1C3 → L3C1 → L2C1 → L2C3 → L2C2 → L3C2 → L3C3 |
| 411 | A hora exata de sair | aprofundamento | Retirar no momento certo | ↔/↕, uma seta | 8 | 64 | L2C4 → L1C3 → L2C3 → L2C2 → L2C1 → L4C2 → L3C3 → L1C1 |
| 412 | Consequências em conjunto | combinação | Preparar todos os destinos | ↔/↕ | 7 | 41 | L3C1 → L1C2 → L3C2 → L2C2 → L1C4 → L2C1 → L2C3 |
| 413 | Relações encadeadas | marcante | Momentos conectados | ↔/↕, uma seta, duas perpendiculares, quatro setas | 8 | 84 | L4C3 → L3C2 → L4C4 → L3C3 → L3C1 → L2C3 → L3C4 → L1C3 |
| 414 | Depois do espaço vazio | retomada | Abrir passagem | ↔/↕ | 6 | 24 | L2C2 → L1C1 → L1C2 → L2C3 → L2C1 → L3C3 |
| 415 | A diferença está na meta | combinação | Ler as assimetrias | ↔/↕, quatro setas | 7 | 22 | L3C3 → L1C2 → L2C2 → L1C3 → L1C1 → L1C4 → L2C1 |
| 416 | Receber e deixar passar | variação | Retirar no momento certo | ↔/↕ | 6 | 4 | L1C3 → L1C2 → L1C1 → L2C1 → L2C3 → L2C2 |
| 417 | Relações encadeadas | combinação | Momentos conectados | ↔/↕, uma seta | 8 | 182 | L1C3 → L4C3 → L4C1 → L4C2 → L3C2 → L3C3 → L2C1 → L3C1 |
| 418 | O receptor seguinte | aprofundamento | Abrir passagem | ↔/↕ | 7 | 18 | L1C4 → L1C2 → L1C1 → L1C3 → L2C1 → L2C2 → L2C3 |
| 419 | Esperar, receber, abrir | combinação | Funções sucessivas | ↔/↕, duas perpendiculares | 7 | 42 | L3C2 → L1C2 → L2C4 → L1C4 → L1C3 → L3C3 → L1C1 |
| 420 | Uma ajuda antes de sair | retomada | Receber antes de sair | ↔/↕ | 5 | 8 | L2C3 → L1C1 → L2C2 → L1C3 → L1C2 |
| 421 | Uma peça em comum | combinação | Peça compartilhada | ↔/↕, quatro setas | 7 | 60 | L4C2 → L4C4 → L3C2 → L2C4 → L1C4 → L3C1 → L3C4 |
| 422 | Uma ajuda antes de sair | aprofundamento | Receber antes de sair | ↔/↕ | 6 | 11 | L1C1 → L3C3 → L2C1 → L3C1 → L2C3 → L3C2 |
| 423 | Acumular sem exagerar | combinação | Acumuladores diferentes | ↔/↕, uma seta | 8 | 226 | L1C3 → L2C1 → L1C1 → L3C3 → L3C1 → L1C2 → L2C3 → L2C2 |
| 424 | Troca de receptor | combinação | Revezar receptores | ↔/↕ | 6 | 6 | L2C3 → L2C2 → L2C4 → L3C2 → L2C1 → L1C2 |
| 425 | A sequência das condições | marcante | Momentos conectados | ↔/↕, duas perpendiculares | 7 | 4 | L1C4 → L1C3 → L2C3 → L2C4 → L3C3 → L2C2 → L3C2 |

## 18. Diferenças decisivas

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 426 | Lados que pedem diferente | variação | Ler as assimetrias | ↔/↕, duas perpendiculares | 8 | 270 | L1C1 → L2C3 → L2C1 → L2C2 → L3C2 → L4C2 → L1C3 → L1C2 |
| 427 | Receber e deixar passar | retomada | Retirar no momento certo | ↔/↕ | 6 | 36 | L2C1 → L2C2 → L1C1 → L2C3 → L1C3 → L3C3 |
| 428 | Uma origem em dois caminhos | combinação | Bifurcar e reunir | ↔/↕, quatro setas | 8 | 120 | L2C1 → L2C2 → L3C3 → L2C3 → L3C1 → L2C4 → L1C1 → L1C3 |
| 429 | A diferença está na meta | variação | Ler as assimetrias | ↔/↕ | 9 | 1696 | L1C4 → L2C1 → L2C2 → L1C1 → L4C3 → L1C2 → L2C3 → L4C1 → L1C3 |
| 430 | Quem segura o repasse | combinação | Proteger metas | ↔/↕, uma seta | 8 | 230 | L3C3 → L2C1 → L3C2 → L1C1 → L1C2 → L3C1 → L2C3 → L2C2 |
| 431 | Entre duas contribuições | aprofundamento | Retirar no momento certo | ↔/↕ | 10 | 3350 | L2C4 → L2C3 → L3C3 → L1C4 → L4C4 → L2C1 → L2C2 → L3C1 → L3C4 → L1C1 |
| 432 | Receber para continuar | retomada | Receber antes de sair | ↔/↕, duas perpendiculares | 6 | 35 | L1C3 → L2C2 → L3C2 → L2C3 → L1C1 → L3C1 |
| 433 | A última contribuição | combinação | Planejar pelo final | ↔/↕ | 8 | 140 | L3C1 → L3C3 → L1C1 → L4C1 → L3C2 → L1C2 → L2C2 → L4C2 |
| 434 | Lados que pedem diferente | variação | Ler as assimetrias | ↔/↕, uma seta, duas perpendiculares, quatro setas | 9 | 750 | L2C4 → L3C1 → L4C4 → L1C1 → L4C1 → L4C3 → L3C4 → L1C2 → L3C3 |
| 435 | Um equilíbrio desigual | combinação | Ler as assimetrias | ↔/↕ | 8 | 504 | L2C4 → L4C4 → L1C2 → L4C3 → L3C3 → L1C3 → L2C1 → L3C4 |
| 436 | Receber e deixar passar | aprofundamento | Retirar no momento certo | ↔/↕, uma seta | 10 | 450 | L1C1 → L2C4 → L4C4 → L3C3 → L2C1 → L2C3 → L2C2 → L1C3 → L1C2 → L4C2 |
| 437 | Relações encadeadas | combinação | Momentos conectados | ↔/↕ | 9 | 1392 | L3C4 → L1C4 → L4C3 → L4C4 → L4C2 → L3C1 → L3C2 → L2C4 → L3C3 |
| 438 | Caminhos que se reencontram | marcante | Bifurcar e reunir | ↔/↕, duas perpendiculares | 9 | 103 | L1C1 → L3C2 → L3C3 → L4C3 → L2C2 → L4C1 → L2C3 → L2C1 → L3C1 |
| 439 | Receber e deixar passar | retomada | Retirar no momento certo | ↔/↕ | 6 | 42 | L1C3 → L2C1 → L2C2 → L3C3 → L3C1 → L2C3 |
| 440 | Encontro no centro | combinação | Acumular contribuições | ↔/↕, quatro setas | 9 | 1571 | L2C3 → L4C3 → L2C4 → L2C2 → L4C1 → L3C1 → L3C3 → L3C2 → L1C3 |
| 441 | Lados que pedem diferente | variação | Ler as assimetrias | ↔/↕ | 9 | 1890 | L3C3 → L2C2 → L1C4 → L1C3 → L1C1 → L4C4 → L2C1 → L2C3 → L2C4 |
| 442 | Receber para continuar | combinação | Receber antes de sair | ↔/↕, uma seta | 9 | 2650 | L3C2 → L4C1 → L2C3 → L1C3 → L2C1 → L3C3 → L1C2 → L3C1 → L2C2 |
| 443 | Acumular sem exagerar | aprofundamento | Acumuladores diferentes | ↔/↕ | 10 | 6048 | L2C4 → L1C1 → L4C4 → L4C1 → L4C2 → L4C3 → L3C4 → L3C2 → L2C3 → L3C3 |
| 444 | O segundo destino | combinação | Revezar receptores | ↔/↕, duas perpendiculares | 8 | 123 | L1C1 → L2C3 → L2C2 → L4C2 → L1C3 → L4C1 → L2C4 → L2C1 |
| 445 | O valor que se prepara | retomada | Acumular contribuições | ↔/↕ | 7 | 114 | L1C1 → L1C3 → L2C4 → L2C2 → L1C4 → L3C2 → L2C3 |
| 446 | A hora exata de sair | combinação | Retirar no momento certo | ↔/↕, quatro setas | 9 | 759 | L1C4 → L1C2 → L2C2 → L4C2 → L3C1 → L3C2 → L1C3 → L1C1 → L3C3 |
| 447 | Uma caixa protegida | aprofundamento | Proteger metas | ↔/↕ | 10 | 4180 | L4C2 → L2C3 → L3C2 → L3C3 → L1C2 → L4C4 → L3C1 → L4C1 → L2C1 → L3C4 |
| 448 | Entre duas contribuições | combinação | Retirar no momento certo | ↔/↕, uma seta, duas perpendiculares, quatro setas | 8 | 152 | L4C4 → L2C4 → L2C3 → L1C2 → L4C1 → L2C2 → L2C1 → L3C2 |
| 449 | Consequências em conjunto | combinação | Preparar todos os destinos | ↔/↕ | 9 | 1344 | L2C2 → L2C4 → L4C4 → L3C1 → L2C3 → L1C3 → L3C2 → L3C4 → L1C4 |
| 450 | Caminhos que se reencontram | marcante | Bifurcar e reunir | ↔/↕ | 9 | 368 | L3C2 → L2C3 → L3C1 → L2C4 → L3C4 → L2C2 → L1C4 → L1C1 → L1C2 |

## 19. Conciliar condições

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 451 | Uma decisão prepara outra | variação | Momentos conectados | ↔/↕, quatro setas | 10 | 6610 | L1C4 → L3C3 → L3C2 → L1C3 → L2C4 → L4C3 → L2C2 → L4C4 → L2C3 → L2C1 |
| 452 | Receber para continuar | retomada | Receber antes de sair | ↔/↕ | 6 | 26 | L2C1 → L1C3 → L3C2 → L2C3 → L3C1 → L3C3 |
| 453 | A última contribuição | combinação | Planejar pelo final | ↔/↕, uma seta | 10 | 5670 | L3C1 → L3C3 → L1C3 → L2C1 → L4C4 → L1C1 → L1C2 → L2C4 → L2C2 → L4C2 |
| 454 | Uma decisão prepara outra | variação | Momentos conectados | ↔/↕ | 8 | 192 | L4C4 → L4C3 → L3C1 → L2C4 → L1C2 → L3C3 → L3C4 → L3C2 |
| 455 | A diferença está na meta | combinação | Ler as assimetrias | ↔/↕, uma seta, duas perpendiculares, quatro setas | 10 | 5250 | L1C4 → L4C4 → L2C2 → L4C1 → L1C3 → L3C1 → L2C3 → L3C3 → L2C4 → L3C4 |
| 456 | Receber e deixar passar | aprofundamento | Retirar no momento certo | ↔/↕ | 10 | 355 | L1C4 → L2C2 → L3C1 → L2C3 → L3C2 → L1C2 → L3C3 → L3C4 → L1C1 → L2C1 |
| 457 | Contribuições reunidas | retomada | Acumular contribuições | ↔/↕, quatro setas | 7 | 420 | L3C2 → L1C3 → L4C3 → L1C4 → L2C2 → L2C1 → L2C3 |
| 458 | A passagem aberta | combinação | Abrir passagem | ↔/↕ | 10 | 4104 | L3C3 → L4C1 → L3C1 → L4C2 → L3C4 → L2C4 → L3C2 → L4C4 → L1C2 → L2C1 |
| 459 | Uma decisão prepara outra | variação | Momentos conectados | ↔/↕, uma seta | 10 | 5100 | L4C1 → L4C2 → L1C4 → L2C4 → L3C2 → L1C3 → L1C1 → L3C1 → L4C3 → L3C3 |
| 460 | Contribuições reunidas | combinação | Acumular contribuições | ↔/↕ | 9 | 792 | L2C1 → L1C4 → L1C3 → L4C3 → L3C1 → L3C3 → L3C2 → L3C4 → L4C1 |
| 461 | O apoio compartilhado | aprofundamento | Peça compartilhada | ↔/↕, duas perpendiculares | 10 | 1607 | L1C2 → L1C4 → L1C3 → L4C4 → L4C3 → L2C4 → L1C1 → L4C1 → L3C4 → L3C3 |
| 462 | Uma ajuda antes de sair | combinação | Receber antes de sair | ↔/↕ | 9 | 803 | L3C1 → L2C3 → L1C3 → L4C1 → L1C2 → L4C3 → L1C1 → L4C2 → L2C2 |
| 463 | Entre duas contribuições | marcante | Retirar no momento certo | ↔/↕, quatro setas | 10 | 1486 | L2C2 → L3C2 → L4C2 → L3C1 → L1C3 → L1C2 → L2C3 → L1C4 → L4C3 → L2C1 |
| 464 | A espera necessária | retomada | Receber antes de sair | ↔/↕ | 6 | 72 | L3C1 → L1C1 → L3C2 → L3C3 → L2C2 → L2C1 |
| 465 | Duas voltas, um encontro | combinação | Bifurcar e reunir | ↔/↕, uma seta | 10 | 4520 | L1C1 → L3C3 → L4C3 → L1C2 → L1C4 → L4C1 → L1C3 → L2C3 → L2C1 → L3C1 |
| 466 | Relações encadeadas | variação | Momentos conectados | ↔/↕ | 9 | 504 | L2C4 → L1C2 → L4C3 → L2C1 → L2C2 → L2C3 → L4C1 → L1C1 → L3C3 |
| 467 | O limite já chegou | combinação | Proteger metas | ↔/↕, duas perpendiculares | 10 | 6899 | L4C3 → L2C2 → L4C4 → L2C1 → L1C4 → L3C3 → L1C2 → L4C2 → L1C1 → L2C3 |
| 468 | Entre duas contribuições | aprofundamento | Retirar no momento certo | ↔/↕ | 10 | 294 | L2C3 → L3C4 → L2C4 → L2C2 → L3C3 → L2C1 → L1C1 → L4C2 → L4C1 → L3C2 |
| 469 | Um clique, dois acordos | combinação | Preparar todos os destinos | ↔/↕, uma seta, duas perpendiculares, quatro setas | 10 | 6512 | L4C4 → L3C1 → L3C3 → L1C3 → L2C3 → L1C4 → L3C2 → L2C4 → L4C3 → L2C2 |
| 470 | O receptor seguinte | retomada | Abrir passagem | ↔/↕ | 6 | 60 | L2C2 → L1C2 → L1C1 → L2C1 → L2C3 → L3C3 |
| 471 | O segundo destino | combinação | Revezar receptores | ↔/↕, uma seta | 10 | 4800 | L2C3 → L4C1 → L2C2 → L3C3 → L3C4 → L3C1 → L4C2 → L2C4 → L2C1 → L1C4 |
| 472 | A diferença está na meta | aprofundamento | Ler as assimetrias | ↔/↕ | 10 | 864 | L4C1 → L4C4 → L3C2 → L4C3 → L3C3 → L2C3 → L3C4 → L3C1 → L1C4 → L4C2 |
| 473 | A hora exata de sair | combinação | Retirar no momento certo | ↔/↕, duas perpendiculares | 10 | 4624 | L3C1 → L1C1 → L2C1 → L2C4 → L4C4 → L4C1 → L3C3 → L2C2 → L2C3 → L3C2 |
| 474 | Uma decisão prepara outra | combinação | Momentos conectados | ↔/↕ | 10 | 4592 | L1C3 → L3C3 → L4C1 → L4C2 → L2C4 → L2C3 → L1C4 → L3C4 → L2C2 → L4C4 |
| 475 | Receber e deixar passar | marcante | Retirar no momento certo | ↔/↕, quatro setas | 10 | 1277 | L1C1 → L1C4 → L3C4 → L1C2 → L4C4 → L3C3 → L2C1 → L1C3 → L3C2 → L4C3 |

## 20. Domínio do REPASSE

| Fase | Nome | Papel | Foco | Tipos | Peças | Ordens vencedoras | Ordem certificada |
|---|---|---|---|---|---:|---:|---|
| 476 | A hora exata de sair | variação | Retirar no momento certo | ↔/↕, uma seta, duas perpendiculares, quatro setas | 9 | 1072 | L4C2 → L3C3 → L3C2 → L4C3 → L1C2 → L3C4 → L2C2 → L2C3 → L1C4 |
| 477 | Encontro no centro | retomada | Acumular contribuições | ↔/↕ | 7 | 504 | L2C1 → L2C2 → L2C4 → L3C4 → L1C3 → L2C3 → L4C4 |
| 478 | O receptor seguinte | combinação | Abrir passagem | ↔/↕, uma seta | 9 | 2241 | L2C2 → L1C1 → L1C2 → L1C3 → L1C4 → L2C1 → L2C3 → L3C4 → L2C4 |
| 479 | Receber e deixar passar | variação | Retirar no momento certo | ↔/↕ | 10 | 3909 | L2C4 → L3C1 → L4C1 → L3C2 → L4C3 → L3C3 → L1C1 → L1C2 → L2C1 → L3C4 |
| 480 | Contribuições reunidas | combinação | Acumular contribuições | ↔/↕, duas perpendiculares | 9 | 1890 | L3C4 → L2C4 → L4C2 → L4C1 → L3C2 → L1C3 → L3C3 → L4C3 → L3C1 |
| 481 | O apoio compartilhado | aprofundamento | Peça compartilhada | ↔/↕ | 10 | 999 | L4C2 → L4C3 → L4C1 → L3C1 → L1C2 → L2C4 → L3C2 → L1C1 → L4C4 → L3C3 |
| 482 | O receptor seguinte | retomada | Abrir passagem | ↔/↕, quatro setas | 7 | 420 | L2C3 → L4C1 → L2C1 → L3C2 → L1C3 → L3C3 → L3C1 |
| 483 | Acumular sem exagerar | combinação | Acumuladores diferentes | ↔/↕ | 10 | 7200 | L1C2 → L4C4 → L3C1 → L4C2 → L1C4 → L4C3 → L3C4 → L3C2 → L3C3 → L2C3 |
| 484 | A hora exata de sair | variação | Retirar no momento certo | ↔/↕, uma seta | 9 | 1080 | L1C2 → L4C1 → L2C2 → L3C2 → L4C3 → L3C3 → L1C1 → L1C4 → L3C1 |
| 485 | Caminhos que se reencontram | combinação | Bifurcar e reunir | ↔/↕ | 10 | 4280 | L3C3 → L1C2 → L3C4 → L4C3 → L1C1 → L4C1 → L2C3 → L2C1 → L3C2 → L3C1 |
| 486 | A hora exata de sair | aprofundamento | Retirar no momento certo | ↔/↕, duas perpendiculares | 10 | 1644 | L4C2 → L3C4 → L3C3 → L4C1 → L3C2 → L2C4 → L3C1 → L1C2 → L4C4 → L1C1 |
| 487 | O limite já chegou | combinação | Proteger metas | ↔/↕ | 10 | 9072 | L4C3 → L3C3 → L2C3 → L1C2 → L3C1 → L1C3 → L1C1 → L2C2 → L3C4 → L4C4 |
| 488 | Relações encadeadas | marcante | Momentos conectados | ↔/↕, quatro setas | 10 | 1134 | L3C4 → L2C4 → L3C3 → L2C2 → L3C1 → L3C2 → L1C2 → L4C4 → L1C1 → L4C3 |
| 489 | Encontro no centro | retomada | Acumular contribuições | ↔/↕ | 6 | 42 | L3C1 → L1C2 → L2C3 → L2C1 → L1C3 → L2C2 |
| 490 | A última contribuição | combinação | Planejar pelo final | ↔/↕, uma seta, duas perpendiculares, quatro setas | 9 | 456 | L3C4 → L3C3 → L1C3 → L1C4 → L2C4 → L1C2 → L2C3 → L2C1 → L2C2 |
| 491 | Entre duas contribuições | variação | Retirar no momento certo | ↔/↕ | 10 | 3780 | L4C3 → L4C1 → L2C4 → L2C1 → L2C2 → L1C4 → L2C3 → L1C1 → L1C3 → L3C3 |
| 492 | Lados que pedem diferente | combinação | Ler as assimetrias | ↔/↕, duas perpendiculares | 9 | 216 | L3C1 → L3C2 → L2C1 → L4C2 → L2C2 → L2C3 → L1C2 → L3C3 → L4C1 |
| 493 | Entre duas contribuições | aprofundamento | Retirar no momento certo | ↔/↕ | 10 | 243 | L4C3 → L1C2 → L3C3 → L3C2 → L3C1 → L3C4 → L2C1 → L4C4 → L1C3 → L2C3 |
| 494 | A sequência das condições | combinação | Momentos conectados | ↔/↕, quatro setas | 9 | 2232 | L3C3 → L4C4 → L4C1 → L3C1 → L4C2 → L1C1 → L2C3 → L3C2 → L3C4 |
| 495 | A hora exata de sair | retomada | Retirar no momento certo | ↔/↕ | 6 | 35 | L1C2 → L2C1 → L1C3 → L3C1 → L2C3 → L2C2 |
| 496 | Esperar, receber, abrir | combinação | Funções sucessivas | ↔/↕, uma seta | 9 | 1532 | L4C4 → L4C2 → L2C3 → L3C2 → L2C2 → L1C3 → L3C4 → L3C3 → L3C1 |
| 497 | Contribuições reunidas | aprofundamento | Acumular contribuições | ↔/↕ | 10 | 996 | L3C4 → L2C3 → L1C2 → L2C1 → L3C2 → L3C3 → L1C3 → L1C4 → L4C4 → L2C4 |
| 498 | Uma peça em comum | combinação | Peça compartilhada | ↔/↕, duas perpendiculares | 8 | 168 | L4C2 → L2C3 → L1C3 → L4C1 → L1C1 → L3C1 → L3C2 → L1C2 |
| 499 | Uma ajuda antes de sair | combinação | Receber antes de sair | ↔/↕ | 10 | 1435 | L2C4 → L3C1 → L1C1 → L1C2 → L1C4 → L1C3 → L2C1 → L2C2 → L2C3 → L3C3 |
| 500 | A hora de cada um | marcante | Momentos conectados | ↔/↕ | 10 | 561 | L4C2 → L1C3 → L1C2 → L3C1 → L2C2 → L1C1 → L3C3 → L2C3 → L2C1 → L4C1 |

## Limites da avaliação

A dificuldade é uma estimativa editorial apoiada em relações, profundidade de dependência e quantidade de ordens vencedoras. Ela não mede a experiência de jogadores. O logaritmo da razão entre todas as permutações e as ordens vencedoras é um diagnóstico de restrição de ordem, não uma nota de dificuldade humana. Valores de partidas perdidas podem crescer além dos valores das soluções; o motor mantém inteiros exatos, e a interface deve mostrar o excesso sem truncar.
