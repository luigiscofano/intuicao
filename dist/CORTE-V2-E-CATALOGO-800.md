# Corte v2 e catálogo de 800 níveis

Revisão de 24/10/2026, conforme a alteração de escopo aprovada por Luigi.

## O que mudou

Corte certo continua com 100 níveis e seis famílias de curva. Agora 68 fases têm vazios, contra 30 na revisão anterior. Em grupos consecutivos de 20 fases, a frequência sobe de 6 para 10, 14, 18 e 20. Onde existem, os vazios retiram efetivamente 19% a 36,6% da área original. A média removida nas cinco faixas é 20,6%, 24,1%, 27,6%, 31,2% e 34,8%. São 36 fases com aberturas atravessando o contorno externo. Os 158 polígonos de recorte têm interseção real com a figura; não há recorte invisível. A menor área restante é 63,4% da original.

Os vazios são irregulares, podem se sobrepor e podem abrir a borda. A figura útil é a forma externa menos a união dos vazios. A parte do recorte fora da figura não é descontada; interseções entre vazios são descontadas só uma vez. Não se usa preenchimento par/ímpar que faria a sobreposição virar área sólida novamente.

## Dois modos de controle, sem perder a tentativa

- Desafio básico: uma única translação na direção fixa indicada por uma seta, por arraste, teclado, slider ou campo numérico. Não permite rotação, segundo eixo ou alteração de amplitude. Há 23 direções distribuídas na campanha, de 0° a 325°.
- Controles da curva: aba separada com mover livremente, girar e deslizar, mantendo a família e a figura da fase. As fases que já ofereciam ajustes de amplitude ou frequência continuam oferecendo esses ajustes somente nessa aba. Os valores precisos ficam no painel de opções avançadas; as alças continuam disponíveis se esse painel estiver oculto.
- Trocar entre abas conserva dois rascunhos independentes. Voltar ao básico recupera seu último ajuste básico. Recomeçar restaura a configuração inicial básica. A troca de aba, por si só, não marca assistência nem registra erro.
- Alças não se sobrepõem. Quando uma configuração extrema as amontoaria na borda, aparecem separadas em uma pequena doca. Arrastes usam deslocamento relativo para evitar saltos ao pegar uma alça reposicionada.

Todos os 100 níveis têm solução pelo único eixo básico. Cada fase inicia de 17,98 a 24,02 pontos percentuais distante da meta, com fração inicial entre 10% e 90%; nenhuma já começa resolvida. O gabarito certificado usa somente o eixo básico, retorna a essa aba e continua aguardando Confirmar resposta. Três falhas confirmadas continuam necessárias para liberar o gabarito, e a conclusão assistida continua identificada. A tolerância é inclusiva de ±3 pontos percentuais.

Os identificadores agora são corte-v2-1 a corte-v2-100. Tentativas antigas não são reinterpretadas como conclusões da nova geometria. O armazenamento antigo não é apagado. Os rascunhos das abas duram a tentativa atual; não constituem sincronização entre aparelhos.

## Precisão e implementação

A diferença geométrica usa decomposição de polígonos côncavos em partes convexas e subtrações sucessivas. As partes restantes são disjuntas, portanto a área útil não duplica sobreposições. O cálculo de corte é aplicado a essas partes; retas são recortadas geometricamente e curvas são aproximadas com limite de erro de interpolação de até 0,01 ponto percentual. A máscara SVG usa forma branca e união de recortes pretos, consistente com essa operação.

O maior erro do gabarito certificado é 0,00124 ponto percentual. Mesmo arredondando o deslocamento à resolução de 0,1 do controle, o maior erro observado é 0,0303 ponto percentual, muito abaixo dos 3 pontos permitidos. Esse resultado é certificação geométrica, não calibração de dificuldade com jogadores.

## Catálogo atual

Reflexos 100 + Corte certo 100 + ELO 200 + PRUMO 200 + PACTO 200 = 800 níveis. DESVIO permanece como duelo local/bot/treino, sem campanha de níveis. NEXO e Equilíbrio foram retirados de menus, catálogos, ativações, tutoriais, importação, respostas e elementos decorativos. PRUMO é um jogo separado e foi preservado. A frase motivacional solicitada e seu símbolo foram removidos do rodapé; créditos e links restantes continuam.

Código e registros históricos das versões retiradas permanecem nos backups, sem apagar progresso local antigo. Não copie módulos históricos de volta para a pasta de código atual.

## Validação

- Todos os 800 níveis: três erros, aplicação da resposta padrão, preservação de elementos fixos, confirmação obrigatória, vitória assistida e persistência.
- Corte: 100 soluções básicas, 100 inícios não resolvidos, controles de mouse/teclado, abas independentes, foco, alças separadas e estados extremos.
- Geometria: recortes externos, parciais, sobrepostos, duplicados, contidos, tangentes e côncavos; conservação e transformações; rasterização independente de uma união conhecida.
- Reflexos: 2.923 verificações e 500 sequências de disparo, incluindo colisões e portais, mais 676 regressões do motor.
- PRUMO: 8.854 verificações, 200 soluções únicas e crescimento 4×4, 4×5, 5×5, 5×6 e 6×6.
- PACTO: 200 soluções e 600 estados parciais sem falso positivo de hachuras.
- DESVIO: 25.868 posições verificadas exaustivamente; ELO conserva controles, cores e persistência.

As verificações executam os motores e a interface em DOM/relógio determinísticos. Imagens estáticas foram renderizadas e inspecionadas para os recortes e alças. Não foi feita inspeção interativa em navegador real nesta revisão. No pacote completo, execute `bash TESTAR.sh` para a suíte vigente; as pastas de testes anteriores estão identificadas como históricas.
