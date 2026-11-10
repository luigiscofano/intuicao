# Correção da composição aprovada

A versão anterior aplicava cores e detalhes, mas conservava a estrutura antiga dos jogos. Esta correção acrescenta título editorial grande, oito azulejos, faixa numerada, título da fase e painel de instruções/ações ao lado do tabuleiro no desktop. Em telas estreitas, o painel fica abaixo do tabuleiro.

## Preservação

- Os controles existentes são movidos, não clonados. Seus eventos, estados `disabled` e `hidden`, atalhos e referências continuam válidos.
- Regras completas, opções avançadas, modos, importação de níveis, mascotes e seletores continuam disponíveis.
- Nenhum motor, catálogo, mapa, sprite ou função de persistência foi modificado.
- A navegação retorna ao lugar original na biblioteca. As folhas decorativas são ocultadas durante o jogo.
- A ajuda contextual reconhece seu novo local para não duplicar o componente.

## Verificação no GitHub

O port preserva a árvore GitHub e apenas acrescenta recursos ao HTML próprio. Os testes novos usam DOM sintético e verificam os 11 jogos, reutilização de controles, estados, navegação e isolamento de persistência. Os resultados locais são registrados no PR.

A implementação de origem recebeu inspeção visual na prévia do Sites, em desktop e largura de 390 px. Essa evidência não representa inspeção visual desta árvore GitHub nem validação de cada fase.

## Bases e integração

Origem da correção: commit Sites `6a5a9de074b23a694230b240a21a0f58dcf7296e`, após a publicação v185. Base GitHub: `a1dd7d83058bbfb698b42ed92c33c6fe6958bf9b`, no PR #42. O PR da correção depende dessa sequência. Main e backup permanecem preservados; merge exige autorização própria. Nenhum arquivo temporário de QA ou snapshot de progresso foi incluído.
