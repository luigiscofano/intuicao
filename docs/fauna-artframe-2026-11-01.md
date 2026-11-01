# Molduras individuais das artes nos modais

Base: d0ab13894dae7c44f2eb659497ed2734f8aa9aa5.

Única mudança de produção: regra CSS com escopo #fauna-dialog .fauna-art-view. Contorno completo1px verde suave, raio12px, respiro4–8px, border-box. Sem sombra, overflow oculto novo, alteração de atlas, recorte, imagem ou legenda. A caixa mantém sua dimensão; o respiro reduz proporcionalmente a área interna, sem amputar extremidades.

Imagem enviada pelo usuário foi materializada com metadata e inspecionada: três quadrados brancos da piranha, originalmente sem bordas individuais. Preservados hero, navegação, jogos, mapas e textos/cultura.

5 testes Node passam, incluindo hash de todos os arquivos de produção menos CSS e comparação de CSS anterior como prefixo intacto.

QA nativo corrigido:1082verificações passaram sem falhas,45modais/135artes em1366/390/320px. Comparações exatas de markup/crop/src, carregamento PNG/SVG, pixelated, quatro bordas1px, raio12 e padding mínimo4px, conteúdo dentro da moldura, sem overflow, foco/fechar e restauração final do armazenamento de teste. Inspeção visual Piranha desktop e Coral320px.

Limite do primeiro ensaio: travou após desktop por reutilizar promessa Image de iframe destruído; a aba foi encerrada sem confirmação da rotina final de restauração desse ensaio. Era preview isolado recém-iniciado, usado apenas para testes de modais (sem partidas criadas). Corrigido no fixture com Image do documento principal e espera limitada; reexecução completa passou e restaurou exatamente seu snapshot. Nenhuma rotina de storage foi modificada no site.
