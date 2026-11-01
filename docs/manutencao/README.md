# Manutenção, conteúdo e compatibilidade

## Alterar uma fase

Identifique o módulo realmente importado pela rota. Registre ID, versão, posição de exibição, definição e solução antes da edição. Uma solução de referência deve ser reproduzida no motor, não apenas parecer correta no desenho.

Se a definição física ou lógica mudou, avalie criar novo ID e arquivar a anterior. Se houve apenas correção textual, não reinicie progresso sem motivo. Depois confira contagem, faixas, unicidade dos IDs e restauração das definições preservadas.

## Alterar uma regra

Crie um caso pequeno que demonstre o defeito. Confira todos os consumidores: motor, prévia, bot, solver, geração, importação e replay. A UI não deve aceitar uma ação que o replay rejeita, nem usar gabarito como se fosse dedução.

## Alterar armazenamento

Use fixtures sintéticas. Cubra ausência de save, JSON inválido, esquema antigo, fase removida, fase idêntica preservada, fase modificada e histórico futuro de undo/redo. Execute a normalização duas ou mais vezes e compare o resultado: a mesma leitura não deve duplicar arquivos históricos ou conclusões.

O baseline tem uma pendência de idempotência SINTONIA registrada em revisão externa. Não confundir a preservação dos arquivos desta entrega com resolução desse defeito.

## Importação de JSON

Confira formato, tamanho em bytes, profundidade, identificadores, referências e limites semânticos. Entrada rejeitada deve manter a partida anterior. Um desafio válido pode ultrapassar o orçamento da busca; a mensagem deve dizer inconclusivo quando não houve prova.

Limites do importador podem ser menores que os de campanhas curadas. Leia [IMPORTAR-NIVEIS-JSON.md](../../dist/IMPORTAR-NIVEIS-JSON.md), os validadores e os testes específicos antes de prometer ida e volta para qualquer fase.

## Interface e responsividade

Depois de mudar layout, percorra categoria → seleção → jogo → retorno. Confira tabuleiro, regras, botões, prévias, estados de vitória e derrota, foco e rolagem em desktop e larguras compactas. Use movimento reduzido quando aplicável. Não inferir conformidade completa de acessibilidade a partir de um único teste.

## Preservar histórico

Não remover módulos legados sem verificar imports e migrações. Relatórios e hashes antigos são provas de um estado específico. Se um arquivo deixou de ser ativo, rotule seu papel e acrescente um documento atual, em vez de reescrever seu passado.

## Checklist de entrega

- Contrato e base identificados.
- Diff limitado ao escopo.
- Motor e catálogo compatíveis.
- Saves antigos preservados conforme política explícita.
- Testes adequados executados, com resultados e limites.
- READMEs e links atualizados.
- PR preparado com evidência real.
- Deploy tratado separadamente, apenas quando solicitado.

[Arquitetura](../arquitetura/README.md) · [Qualidade](../qualidade/README.md) · [Contribuição](../../CONTRIBUTING.md)
