# Resultados e gabaritos

## Para jogar

Cada envio incorreto pelo botão **Confirmar resposta**, inclusive um tabuleiro incompleto, conta uma tentativa errada naquele nível. Edição, anotações, pistas e hachuras locais de contradição não contam. Em Reflexos, disparar parte das fontes é exploração: somente quando todas as fontes necessárias terminam o disparo a tentativa é avaliada. O botão Confirmar todos também avalia o conjunto completo. Repetir uma fonte já disparada na tentativa parcial é idempotente. Depois do terceiro erro aparece **Ver gabarito**. O botão monta uma configuração padrão válida, sem alterar pistas fixas, mas não concede a vitória automaticamente: confirme para conferir a solução. A conclusão passa a ser identificada como assistida.

Recomeçar, trocar de fase e recarregar a página não apagam o desbloqueio. Os registros são locais ao navegador e separados por jogo e identificador da fase, incluindo os identificadores ELO v2 e PRUMO v2. Se o navegador bloquear o armazenamento, o desbloqueio funciona enquanto a página permanecer aberta, mas não é garantido após fechá-la. O progresso não sincroniza entre aparelhos. Limpar os dados do site apaga também esses registros.

Os 800 níveis dos cinco puzzles possuem gabaritos certificados. Os arquivos de solução acompanham o código e funcionam sem depender do Drive. O bloqueio é uma regra da interface, não uma proteção criptográfica contra inspeção do código.

DESVIO é um duelo, não um puzzle com resposta única. Não recebe gabarito de fase: celebra o vencedor da partida local e distingue a sua vitória da vitória do bot. Análise e treino já existentes permanecem disponíveis.

## Feedback

- Vitória: borda verde, zoom suave, PARABÉNS e sparkles, preservando as ilustrações existentes.
- Derrota: pequeno tremor, borda vermelha e blur por 300 ms, sem modal ou texto visual de derrota nos puzzles. Há anúncio acessível do resultado.
- Preferência por movimento reduzido: conserva a indicação visual sem animação de tremor/zoom/blur.
- Editar, recomeçar, mudar de fase ou de jogo cancela os efeitos pendentes. Aplicar o gabarito também cancela o disparo de Reflexos em andamento.

## Implementação

`answer-progress.mjs` mantém contagem e assistência em `intuicao.answers.v1`. Instâncias dos jogos originais e da coleção reconciliam seus registros antes de gravar para não sobrescrever o progresso umas das outras. `geometry-answers.mjs` contém as 400 soluções geométricas associadas aos IDs atuais. PACTO usa as soluções certificadas de seu catálogo. As soluções dos jogos originais são fornecidas em módulo específico.

O contêiner de feedback dos jogos novos é o próprio tabuleiro HTML, com seletores dedicados: antes, os seletores de zoom e blur só alcançavam o SVG dos jogos de geometria. Respostas incompletas agora também acionam o caminho de erro explícito.

## Limites de validação

Os testes automatizados usam motores puros e uma simulação determinística do DOM. A inspeção de marcação, regras CSS, sobreposição e acessibilidade não equivale a uma sessão em navegador real. O login do Site privado não foi contornado. As regras, tolerâncias e dificuldade das fases não foram alteradas por esta revisão.

## Catálogo atual

NEXO e Equilíbrio não são selecionáveis nem aceitos como jogos importados. Os dados históricos locais não são removidos. Os novos níveis de Corte usam IDs corte-v2 e o gabarito monta uma solução alcançável no modo básico, restrito a uma direção.
