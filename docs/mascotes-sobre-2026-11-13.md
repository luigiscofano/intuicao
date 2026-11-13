# Conhecer os mascotes

A janela **Sobre o projeto** ganhou um botão **Conhecer os mascotes**. A galeria apresenta os quinze animais frontais já usados no site, com os nomes abaixo. Cada botão abre a ficha existente, com biologia, ocorrência, cultura e fontes, sem duplicar as informações.

## Artes preservadas

A lista vem de `FAUNA_ART` e os nomes de `FAUNA_INFO`. Reutilizamos a folha PNG `platform-assets/fauna-green-original.png`, os mesmos recortes e os mesmos pixels. Esta fonte é RGB: não houve redesenho, remoção de fundo ou alegação de canal alpha. Os sprites de Sintonia permanecem nas fichas, sem substituir os ícones frontais.

## Navegação

Os diálogos nativos empilhados deixam o anterior inerte. Fechar a ficha volta ao animal escolhido; fechar a galeria volta ao botão dentro do Sobre; fechar Sobre retorna ao acionador original. Escape fecha somente o diálogo superior. Os nomes são os rótulos acessíveis dos botões; imagens duplicadas são decorativas. Grade de cinco colunas no desktop e três no celular; botões com altura mínima de 44 px.

## Escopo

Sem mudanças de regras, tabuleiros, saves, configurações ou geradores. A home mantém sua galeria original. Um evento local `fauna:open` permite que as duas entradas reutilizem a mesma ficha.

## Verificação

`node --test tests/mascots-dialog.test.mjs` verifica os quinze IDs, nomes, recortes oficiais, integração única e estilos responsivos. A validação de navegador complementa estes testes estáticos.

Auditoria adicional: 20 testes direcionados executados, 16 passaram. Quatro verificações históricas de hash/quantidade de curiosidades em fauna-culture e fauna-sintonia-sprites falham também no main sem esta alteração (baseline 43a6a86); não são regressões deste patch. Os oito testes de Sobre e nova galeria passaram. Não se afirma que toda a suíte do projeto está verde.

QA de navegador concluída: 15/15 fichas abriram corretamente no desktop e na largura de 390 px; retorno de foco a cada um dos quinze cartões confirmado em 390 px. Escape retornou da ficha à galeria, da galeria ao Sobre e do Sobre ao botão original. O ciclo Tab/ShiftTab foi corrigido explicitamente e retestado em 320 px, e Tab no desktop. Em 320 e 390 px, todas as imagens carregaram e a galeria não apresentou rolagem horizontal. A fixture temporária de QA foi removida antes de empacotar.
