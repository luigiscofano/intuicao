# Remoção do jogo retirado · 31/10/2026

TRAMA não faz mais parte do catálogo ativo. Permanecem 12 jogos, e a ordem de Versus é DESVIO, BROTO, CERCO e VÉRTICE.

Foram removidos os sete módulos/estilos em `dist/trama`, o cartão, o host, a importação e inicialização de rota, a folha carregada, os textos de informação, o pictograma, o exemplo Como jogar e seus seletores/animação específicos. As listas compartilhadas não registram mais esse jogo. A numeração de VÉRTICE passa a 12.

A única referência funcional restante ao identificador antigo é a compatibilidade de URL em `category-navigation.mjs`: `?game=trama`, `#trama` ou `#game=trama` abrem a seleção Versus, sem carregar o jogo. Não existe service worker registrado pela aplicação para reinstalar a rota após reload.

Não se apagam saves existentes, versões Git, arquivos históricos da Library nem relatórios de entregas anteriores. Os saves antigos ficam inertes. Esta alteração não pode revogar uma página que já esteja aberta sem recarregamento; o novo código é carregado ao atualizar o Site.

## Validação
- Cinco testes Node passaram: catálogo de 12 jogos, ordem de quatro Versus, exclusão de executáveis, preservação exata de informações/diagramas/ícones dos 12 jogos restantes e hashes de seus motores/arte/módulos.
- Sintaxe de todos os módulos de produção verificada com `node --check`; `git diff --check` sem problemas.
- Navegador: 190 verificações aprovadas em 1366, 390 e 320 px, incluindo todas as 12 rotas, quatro cartões Versus, links antigos e retenção/restauração byte a byte dos saves de teste. Inspeção visual 390/320 aprovada; nenhum overflow horizontal.
- Navegar a partir de um hash legado também limpa esse hash, permitindo abrir e recarregar outro jogo normalmente. Verificado com CERCO e seu save existente.
- Nenhuma alegação de eliminação de caches privados ou de registros em dispositivos do usuário. A remoção vale para a publicação ativa e seu código distribuído após atualização.
