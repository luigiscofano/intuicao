# Movimento aprovado em 11/11/2026

Base do GitHub: `cdc5c756a340c7613c62cded00650ef98d267ec7` (PRs 52 e 53 integrados). A publicação parte da versão 196 do site e conserva suas diferenças de formatação. Somente os dez arquivos de apresentação autorizados são sincronizados entre as duas origens.

## Escopo

- **A nas 14 campanhas:** quatro azulejos nas cores da identidade se aproximam, com seis pontos discretos que desaparecem. A faixa de resultado mantém o texto do jogo; a animação mais longa termina em 1.150 ms. O tabuleiro não recebe o antigo zoom nem a sobreposição central. Retry e próximo desafio continuam disponíveis conforme as regras existentes, sem esperar o efeito.
- **C para conquistas especiais:** o critério é o evento já existente de uma nova **missão específica de jogo**. A roseta original faz um pequeno giro de entrada e recebe um único contorno luminoso. Abrir a galeria ou restaurar uma conquista antiga não dispara o efeito. Catálogo, critérios, ledger, ícones e regras não mudam.
- **Microinterações:** feedback de hover/press nos cartões e botões fora do tabuleiro; fade curto em mudanças de categoria e cabeçalho de fase; abertura de informações, fauna, Sobre e detalhes; preenchimento de progresso por 240 ms somente quando um valor conhecido realmente muda. Abrir a galeria ou trocar filtros não simula um ganho.
- **Movimento reduzido:** preferência do sistema e opção “Reduzir animações” em Sobre. A escolha manual usa apenas `intuicao.ui-motion.v1`, separada de saves e backups. Se o armazenamento não estiver disponível, continua válida na visita. A preferência do sistema prevalece. Folhas decorativas também param.
- Sem som, dependências novas, transmissão de dados ou espera adicional. Nenhuma regra, campanha, arte, save, migração, pontuação ou condição de vitória foi alterada.
- **Resultados Versus não estão incluídos.** DESVIO mantém seu markup e ciclo anteriores; `dist/versus/` e `versus-victory.*` permanecem idênticos à base. As novas propostas individuais dependem de aprovação própria.

## Verificações automatizadas

O recorte explícito de `.github/workflows/engine-smoke.yml` foi executado localmente, sem falhas:

| Recorte | Aprovados |
| --- | ---: |
| Cinco motores anteriores | 95 |
| Lógica, plataforma, conquistas, identidade e movimento | 330 |
| Oito duelos, histórico, busca e backup | 94 |
| **Total** | **519** |

Os testes novos cobrem apresentação das 14 campanhas, ausência de timer de bloqueio, deduplicação por estado, retry uma vez, limpeza, DESVIO inalterado, DOM sem dependências remotas, preferência manual/sistema, falha de storage, seletores e progresso. O retrato de `identity.test.mjs` foi ampliado explicitamente só pelos dez arquivos autorizados; todos os outros arquivos de `dist/`, incluindo identidade, motores, saves, imagens e Versus, continuam protegidos por comparação com a base.

A nova apresentação substitui o contrato histórico de confetes/zoom das campanhas. Isso não torna toda a suíte histórica um gate de release. Veja [limites dos testes](../../tests/README.md).

## Verificação visual e funcional

Prévia local gerenciada, Chrome, aplicativo real e fixtures temporárias sem escrita de progresso:

- Reflexos, fase 1: ajuste do espelho, disparo real, vitória com os quatro azulejos e texto original; próximo desafio habilitado e funcionando; efeito anterior removido ao avançar.
- Preferência manual marcada, recarga e confirmação de persistência; desmarcada ao terminar. Computed styles de azulejos e roseta retornaram `animation-name: none` com redução manual.
- Aplicativo em quadros de 320 e 390 px (áreas úteis de 305 e 375 px por causa da barra de rolagem): biblioteca sem overflow horizontal. Vitória e avanço em Reflexos também verificados no quadro menor; faixa de 219 px inteiramente contida.
- Fixture de componentes de 320 px: A, C, progresso conhecido de 1/10 para 7/10 e oito missões simultâneas. Aviso de 288 px dentro da tela; conteúdo longo rolável, link e fechar acessíveis por teclado; foco não é capturado pela chegada da notificação. Fechar funcionou.
- Os fixtures foram removidos antes da entrega. Não são modos secretos nem páginas publicadas.

Limites: não houve teste em dispositivo físico, leitor de tela ou em cada fase dos 25 jogos. A preferência do sistema foi coberta por testes unitários e CSS; o navegador foi usado para a opção manual. O aviso C foi verificado por evento sintético, sem inventar desbloqueios no ledger. Logs capturados mostraram erros da extensão do ambiente; não foram usados como evidência de erro da aplicação. A preservação dos resultados de Versus é verificada por igualdade de fonte e testes, não por jogar todos os duelos no navegador.
