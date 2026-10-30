# REPASSE — campanha editorial de 80 níveis

## Conteúdo entregue

- `TABELA.md`: grade, peças e setas, metas de cada borda, família principal, precedências necessárias, origem, sequência certificada e contagem de ordens vencedoras.
- `catalogue.json`: os 80 registros completos, com testemunhos causais por família, dependências, escolhas iniciais/finais, janelas de retirada e prova de repetição pelo motor.
- `source-selected.json`: definições originais selecionadas, antes da atualização de metadados editoriais; entrada reproduzível do build.
- `validation.json`: totais, quotas, limites e IDs selecionados.
- `../../tests/repasse80-build.mjs`: regeneração das metas e auditoria exata usando o motor compartilhado, sem modificar sua aritmética.
- `../../tests/repasse80-independent.mjs`: auditoria independente das transferências, ordens alternativas e necessidades causais.

## Decisões editoriais verificáveis

As seis faixas têm 15, 15, 15, 15, 15 e 5 níveis. Há exatamente 48 fases apenas com horizontal/vertical: 30 iniciais, cinco em cada faixa intermediária e três no Modo Sábio, incluindo o nível 80. As 11 configurações aparecem e reaparecem; nenhuma depende de nova operação aritmética.

As estreias mantêm as definições originais 201, 276 e 351, apresentadas como níveis 31, 46 e 61. Cada estreia tem uma única peça da configuração nova. A peça de quatro setas tem valor inicial 1 e participa de um tabuleiro de quatro peças. Os níveis 16–18 preservam um contraste de três definições: peças e valores iguais, metas diferentes produzidas por ordens diferentes.

Os retornos tardios não são simples escalas numéricas. Os níveis 63, 66, 69 e 72 têm seis peças, mas exploram respectivamente acumulação, revezamento, dois destinos e janela de retirada. O máximo editorial permanece 4×4 e dez peças; o maior alvo selecionado é 20.

As cinco sínteses finais preservam proteção/janela, bifurcação/reencontro, peça compartilhada/revezamento, destinos múltiplos e encerramento global HV. O último nível possui quatro janelas de retirada, 27 precedências necessárias e 561 ordens vencedoras; não exige uma única ordem de cliques.

## Identidade e interpretação das provas

Todas as 80 definições físicas foram reutilizadas sem alterar grade, peças, valores, setas, metas ou versão de regras. Por isso conservam seus IDs e versões originais. `displayNumber` é somente posição na seleção nova, nunca identidade de histórico. Metadados de faixa, apresentação e família podem mudar sem transformar a definição física.

Cada meta foi regenerada pela execução da sequência no motor e comparada à definição original. A definição final foi então reproduzida novamente, verificando todas as caixas, inclusive metas zero, e o esvaziamento completo. A enumeração das ordens alternativas foi completa para todos os níveis; precedências listadas valem em todas as vitórias, não apenas na sequência de referência.

Os eventos em `validation.trace.evidence` e `editorial.primaryEvidence` são testemunhos da sequência certificada. Não significam que toda vitória percorra exatamente os mesmos receptores intermediários. A lista `requiredPrecedences` é a fonte específica de necessidade global. Para “funções sucessivas”, a evidência adicional registra a mesma peça recebendo, protegendo uma caixa e depois liberando passagem; uma mera soma de contribuições não foi aceita como prova dessas três funções.

A dificuldade é uma decisão editorial apoiada em dependências, janelas, conciliação de destinos e alternativas legais. Não é uma medição psicométrica de jogadores. O tamanho da busca e o número de peças não são tratados isoladamente como dificuldade. A tabela técnica não faz alegações de teste de usabilidade ou verificação visual; essas pertencem aos relatórios de integração da entrega.

## Reprodução

Na raiz do projeto:

```sh
node tests/repasse80-build.mjs
node tests/repasse80-independent.mjs
```

A curadoria não usa amostragem por intervalos. A lista explícita de origens conserva descobertas da campanha inteira, intercala retornos curtos e foi auditada quanto a famílias, configurações, quotas, repetição e causalidade.
