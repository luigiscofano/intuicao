# Terra e Mata — alteração visual reversível

## Escopo

Paleta creme, mata, terracota e ocre; tipografia e cartões; azulejos geométricos em CSS. A navegação real por categorias foi mantida, assim como a galeria clicável de animais. O estudo visual não foi transformado numa nova navegação. A proposta Conquistas não foi implementada.

A mudança funcional no HTML é apenas um link adicional para `dist/terra-mata.css`. Nenhum módulo JavaScript, motor, nível, regra, chave de armazenamento ou asset original foi alterado. Não há arte gerada por IA. Os tabuleiros conservam suas cores semânticas e controles.

## Bases preservadas separadamente

- Site publicado anterior: versão 180, commit `2354a3cd4d0a06ed66b665ca853a635b64e3a0a7`, árvore `2685e86e2ea2a3572c09aead4768a368287aed21`.
- GitHub main anterior: `2d015c1cc98a7435051e0552f9e1b99bc42c3993`, árvore `049e754779427c6a646815af855b652d8a115949`.
- GitHub: `backup/pre-terra-mata-2026-11-10` preserva main anterior. O desenvolvimento fica em `design/terra-mata-2026-11-10`; main não foi reescrita.
- As bases já eram diferentes. O mesmo CSS foi aplicado a cada uma sem copiar motores entre elas. Não se declara paridade funcional entre as bases.

## Recuperação

Para desfazer somente este visual, remova o link `terra-mata.css` do head do HTML, mantendo as demais alterações futuras, e deixe de servir esse CSS. Isso não toca no armazenamento do navegador. Também é possível reverter o commit visual por um novo commit, sem reset/force-push.

Para restauração integral do Site, a versão 180 continua sendo a referência anterior; republicá-la muda produção e deve ser uma ação deliberada. O arquivo `sites-pre-terra-mata.bundle` preserva todo o histórico alcançável da branch de backup. SHA-256: `4d6fb3ea89b4ceb8c1013f52ae61ed9852e5a89410332c2ee84d7052628f1b46`.

Teste de recuperação realizado: `git bundle verify` passou; clone independente do bundle, checkout da branch de backup e verificação exata do commit e árvore acima passaram. Nenhuma restauração foi implantada em produção. Os ZIPs anteriores do Sites e GitHub também permanecem como snapshots independentes.

Progresso salvo pertence ao navegador e ao endereço do site, não ao Git. Não limpe localStorage; voltar ao visual anterior não requer apagar nem migrar saves.

## Validação e limites

- Comparação integral: todos os arquivos originais de cada base permaneceram byte a byte iguais, exceto index.html; removendo o novo link, o HTML também é idêntico ao original.
- Cinco motores existentes: 95/95 testes passaram em ambas as bases.
- REPASSE, estado e preservação de progresso: 13/13 testes passaram na base do Site.
- Recorte ampliado de estado: 27/38 passaram; as mesmas 11 falhas ocorreram na v180 restaurada, sem CSS novo. Não foram ocultadas nem tratadas como falhas novas do redesign. Esse conjunto não é um gate verde de release.
- GitHub: 60 documentos e 632 links locais verificados; 133 recursos visuais com hashes e inventário verificados, sem alteração de assets.
- Navegador: abertura das onze seleções, tabuleiros iniciais dos oito jogos de campanha e partidas versus; regras e controles; conclusão de Reflexos com recarga preservando marca e ângulo; navegação por categorias e voltar.
- Prévia móvel em iframe de 390 px: cartões sem overflow horizontal; verificação visual. Não equivale a teste em aparelho físico.
- Não é uma validação exaustiva de todas as fases, todos os dispositivos ou todas as migrações antigas.
