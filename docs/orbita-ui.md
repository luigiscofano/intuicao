# ÓRBITA — interface e persistência

## Integração

O jogo usa o mesmo contêiner `lab collection-lab`, cabeçalho, `level-tile`, seleção em capítulos, modos, barra de controles, confirmação de reinício, painel de regras, opções avançadas, dicas e feedback de resultado dos demais jogos. Sua rota carrega o módulo sob demanda. Os arquivos próprios são `dist/orbita/ui.mjs`, `ui.css` e `route.mjs`.

O cartão ocupa a posição 09, após REPASSE. A interface não cria um menu de dificuldade nem um seletor de fase dentro da partida. A fase atual aparece como texto; a navegação usa as setas laterais e os botões compartilhados.

## Tabuleiro

Os trilhos são círculos SVG fixos com ordem horária correspondente à lista lógica de casas. As casas, suas marcas de alvo e os sensores nunca giram. Somente as fichas se deslocam. A animação lê a transição atômica do motor e percorre cada arco na direção e no número de passos informados; não participa do cálculo das regras.

Cada encontro é desenhado uma vez, com contorno duplo. O alvo ocupa um selo próprio abaixo da ficha e continua legível quando ocupado por outra peça. Letras identificam anéis; símbolos identificam peças. As peças neutras são fichas reais, com marca de ponto, sem aparência de casa vazia.

As letras dos comandos selecionam anéis ou engrenagens. Os dois botões de setas curvas mostram o sentido; uma legenda informa as casas percorridas em cada anel. O destaque inclui todos os trilhos e casas afetados. Sensores mostram símbolo exigido, número visível da casa e condição atual; o comando bloqueado mantém seu motivo disponível sem hover. Os marcadores de sensor escolhem uma posição livre acima, ao lado ou na diagonal, sem cobrir fichas, alvos ou outro sensor, e mantêm uma linha curta até sua casa. O mesmo cálculo é usado na campanha, no Endless, nas importações e na verificação geométrica.

Tabuleiros grandes mantêm um tamanho mínimo de ficha e permitem rolagem dentro da área de jogo. Um aviso aparece apenas quando há conteúdo para rolar. A largura da tela muda somente a apresentação: topologia e ocupação são as mesmas. Os controles HTML possuem alvos de toque de pelo menos 44 px. Movimento reduzido dispensa a animação.

## Interação e feedback

Cada giro permitido entra uma única vez no histórico, mesmo quando peças equivalentes deixam a aparência inalterada. Comandos ficam desabilitados durante a breve transição para impedir concorrência. Sensores são derivados do estado lógico. Um giro normal nunca aumenta o contador de verificações incorretas.

Vitórias são apresentadas ao término da animação. Somente o botão **Confirmar resposta** conta uma tentativa explícita incompleta. Após três verificações, aparece **Ver gabarito**. Uma verificação incompleta usa o feedback comum e oferece o botão circular de reinício imediato; a partida continua reversível e não perde vidas.

O reinício normal usa a confirmação compartilhada. O reinício imediato restaura exatamente a mesma definição, inclusive no Endless. Desfazer e refazer restauram a transação inteira; uma nova jogada depois de desfazer descarta apenas o futuro. Regras começam abertas ao entrar ou retomar uma fase. Fechá-las durante a tentativa não provoca reabertura a cada giro.

Teclado: Tab percorre os controles; 1–9 selecionam comandos; com o tabuleiro ou seus controles em foco, esquerda e direita giram anti-horário e horário. Ctrl+Z desfaz; Ctrl+Shift+Z refaz. Teclas mantidas pressionadas não acumulam giros por repetição automática. O foco permanece visível e é preservado quando o SVG é redesenhado. Um controle temporariamente desabilitado recupera o foco ao término do giro somente se o usuário não navegou por Tab, clicou ou focou outro elemento nesse intervalo.

## Dicas, gabarito e Endless

O serviço de análise recebe o estado atual e o prefixo efetivo do histórico. A UI reproduz qualquer solução recebida antes de oferecê-la. As três camadas de dicas são observação, estratégia e próximo giro. O gabarito pode ser executado passo a passo com animação e botão de pausa; o histórico continua disponível. Uma solução segura baseada na reversão do histórico não é apresentada como mínima.

O Endless usa geração em worker, seed, versão e reserva validada do serviço. A UI valida o resultado novamente antes de apresentá-lo. Geração antecipada prepara a próxima fase; cancelamentos ou resultados obsoletos não substituem o tabuleiro atual. A progressão deriva da fase de entrada e do número de conclusões, com retomadas periódicas. Não há seletor adicional de dificuldade.

## Dados locais

Somente `intuicao.orbita.v1` é lido e gravado pelo módulo. Campanha, Endless e fases importadas são separados. O registro guarda definição, histórico completo de comandos, cursor de desfazer/refazer, estado, versão de regras, falhas explícitas, assistência e conclusão já registrada.

Na retomada, cada comando é reproduzido pelo motor; o resultado precisa coincidir com o estado salvo e sua contagem de giros. Dados incompatíveis recuperam somente aquela tentativa. O progresso de outras fases e outros jogos não é apagado. Conclusões são idempotentes também após desfazer, refazer, reiniciar ou carregar uma tentativa recuperada.

As opções avançadas mantêm o editor/importador JSON e a exportação de fases no padrão existente. Definições importadas exigem validação e solução reproduzível, ou uma busca concluída que produza prova de solução. Resultado inconclusivo não é anunciado como impossibilidade. A validação de apresentação é separada das regras: exige coordenadas, dimensões e raios numéricos finitos, casas sobre os trilhos, ordem horária coerente e elementos dentro da área visível. Dados visuais incompatíveis não chegam ao renderizador.

## Verificações realizadas no módulo

`node tests/orbita-ui-state.test.mjs`: treze grupos cobrindo histórico atômico, restauração, ramificações, dados incompatíveis, engrenagens/sensores, comandos bloqueados, deduplicação de vitórias, retomada Endless, dicas após movimentos livres, trajetória da animação, apresentação das 500 fases, rejeição de dados visuais malformados e a separação entre sensores e alvos nas fases 459 e 493.

`node --check dist/orbita/ui.mjs`: sintaxe validada. A inspeção visual e os fluxos no navegador são conduzidos pela integração principal antes da publicação.
