# Legibilidade — rascunho parcial

Esta branch contém somente a parte da reforma estética que pôde ser enviada. **Não representa a conclusão da revisão de todo o repositório e não deve ser integrada automaticamente.** A base é `0532b17f900adc815d605ed5502dd98d5105b94f`.

As alterações de código consistem em indentação, espaços, quebras de linha e comentários em português. A lógica, os valores, os textos exibidos, os recursos visuais e as configurações de hospedagem permanecem preservados. Nenhuma atualização foi publicada no ChatGPT Sites.

## Escopo pendente

A revisão automática da ferramenta recusou lotes de SINTONIA e de testes por classificá-los como alterações substanciais de comportamento ou aparência. A comparação local confirmou equivalência estrutural, mas o bloqueio persistiu após autorização específica para uma branch e um PR de rascunho.

Os arquivos ainda não enviados estão listados em [legibilidade-pendentes.json](legibilidade-pendentes.json). O lote final também contém ferramentas de verificação; o novo workflow que dependeria delas foi retirado deste rascunho para não deixar uma configuração incompleta.

A revisão completa permanece preparada em uma alteração separada para avaliação do titular. Este PR conserva os arquivos pendentes em seu estado original.

## Verificações

Os resultados específicos deste rascunho estão em [legibilidade-validacao.json](legibilidade-validacao.json). A comparação estrutural verifica operadores, valores, ordem das operações, conteúdo dos templates, seletores, declarações CSS e nós de texto HTML. Imagens e fontes permanecem byte a byte iguais.

Na revisão completa preparada localmente, a comparação dos 584 arquivos de código alterados passou, assim como os 95 testes do recorte de cinco motores. A suíte histórica ampla passou de 521 aprovações e 180 falhas para 492 aprovações e 209 falhas: 29 verificações de hashes ou texto-fonte literal não aceitam a reformatação. Essas asserções não foram enfraquecidas, e a suíte ampla não é apresentada como aprovada. Os números da revisão completa não equivalem a uma execução da suíte ampla deste rascunho parcial.

## Revisar antes de integrar

1. Leia o diff e a lista de pendências.
2. Preserve os identificadores de fases, chaves de saves, textos exibidos e recursos visuais.
3. Confira as verificações do GitHub e as limitações registradas.
4. Resolva o restante da revisão e obtenha autorização específica antes de qualquer merge ou deploy.
