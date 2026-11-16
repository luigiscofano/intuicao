# Publicar o Intuição no GitHub Pages

O endereço oficial é [luigiscofano.github.io/intuicao/](https://luigiscofano.github.io/intuicao/). A origem anterior continua disponível para quem precisa exportar os próprios dados. [Abrir o Intuição no Sites](https://intuicao-luigi-minigames.luigiscofano.chatgpt.site/)

## Transferir o progresso

1. Abra o Sites no navegador e no perfil em que você jogava. Em **Configurações → Progresso e backup → Proteger ou restaurar meu progresso**, clique em **Baixar backup**. Guarde o JSON.
2. Abra o endereço oficial e entre no mesmo painel. Feche outras abas do novo Intuição. Clique em **Selecionar backup para conferir** e escolha o arquivo do site antigo.
3. Confira os registros que serão adicionados ou substituídos. Clique em **Baixar cópia de recuperação**, guarde esse segundo arquivo e marque a confirmação. Clique em **Restaurar e recarregar**.
4. Confira a contagem de fases na biblioteca, abra Conquistas e retome uma partida conhecida. Para desfazer a restauração, importe a cópia de recuperação no mesmo painel.

O navegador separa o armazenamento dos dois endereços. O backup existente leva as 17 chaves reconhecidas pela versão de referência, quando presentes. A restauração substitui cada registro indicado. Registros ausentes em um backup normal ficam como estavam. Favoritos e recentes, movimento reduzido, tamanho da interface e aparências de Pulso e Refúgio usam preferências fora dessa lista. Reajuste essas preferências no novo endereço.

## Publicar uma revisão

1. Trabalhe em uma branch e abra um PR para `main`. Os arquivos editáveis e os recursos originais continuam em `dist/`. O empacotador cria um diretório novo e preserva os arquivos de origem.
2. Aguarde os checks do PR. O workflow **Publicar Intuição no GitHub Pages** testa motores, inventário, progresso e os 19 jogos no Chromium. Executa os testes de navegador com os arquivos que serão publicados, na rota `/intuicao/`. As capturas e o manifesto SHA-256 ficam nos artefatos de verificação, separados dos arquivos servidos.
3. Confira os diffs e a revisão testada antes do merge. Em `Settings → Pages → Build and deployment`, a origem é **GitHub Actions**. O push em `main` testa o commit integrado e publica aquele artefato. O job de publicação compara o SHA com a ponta de `main` e serializa as publicações.
4. Em **Actions → Publicar Intuição no GitHub Pages**, confirme os jobs `validar`, `publicar` e `conferir`. O último abre o endereço externo sem login. Confira o SHA da execução ao investigar qualquer regressão.
5. Enquanto o Sites existir, marque a opção de comparação manual ou inclua `[comparar-sites]` na descrição inicial do PR para gerar capturas da origem antiga nas mesmas condições e registrar as diferenças de pixels. A publicação habitual funciona independentemente da hospedagem anterior.

## Republicar e recuperar

- Se `main` ainda está na revisão correta, execute **Run workflow** sobre `main`. Uma falha transitória também pode ser repetida na própria execução. O workflow refaz as verificações.
- Se houve uma alteração posterior no produto, identifique na última execução saudável o SHA, o manifesto e o escopo do PR que introduziu a regressão. Reverta o PR problemático em uma nova branch, revise o diff contra o estado saudável e integre por PR. A nova publicação terá seu próprio SHA e as verificações correspondentes. Um rerun de um SHA antigo cuja ponta mudou é recusado.
- Para recuperar as origens da migração, consulte os bundles separados e os inventários SHA-256 do arquivo de recuperação. Para inspecionar sem modificar os remotos, use `git clone github.bundle recuperado-github` ou `git clone sites.bundle recuperado-sites`. Para recuperar branches e demais referências, use `git clone --mirror` em um diretório novo.
- A documentação editorial, os registros de desenvolvimento de Reflexos, a validação de Prumo e os backups não entram no artefato público. As entradas para oito caminhos antigos retornam ao roteador do jogo. A navegação ativa continua usando parâmetros de consulta no endereço do projeto.

## Referências da primeira migração

- **Sites v273** — commit `e9504242405b8dfbe928e38daa22430d83f2f4b1`, publicação confirmada em 16/11/2026. Raiz estática `dist/`.
- **GitHub antes da migração** — commit `938a6f56a87d144bb905190ae7b9e462d4f160c6`. Inclui os manuais de 19 jogos e a correção integrada no [PR #146](https://github.com/luigiscofano/intuicao/pull/146) para manter a dificuldade selecionada no modo Sem Parar de Sintonia e Repasse.
- **Configuração da hospedagem** — [PR #151](https://github.com/luigiscofano/intuicao/pull/151). [Documentação oficial de workflows do Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
