# CERCO: padrão cobra-coral versus piranha-vermelha

Base c3c758e41745f8ae31b863fbbeb20225cd2470af. Uma linha de produção alterada: `defaultConfig` de CERCO passa a escolher `coral` e `piranha`, IDs já existentes no catálogo oficial. Cores Verde/Amarelo, escolha dos15 animais, mapas e regras intactos.

Configuração válida salva continua prevalecendo; reinício/revanche preservam os personagens escolhidos. Registro inválido continua preservado até início explícito de nova partida; preparação usa o novo padrão.

QA:2 testes Node +67 verificações no navegador em1366/390/320px, cobrindo seleção padrão,15 opções, peças/cabeçalhos, reload, escolhas personalizadas, reset, emblema de cada vencedor, revanche e fallback inválido sem sobrescrita. Saves originais restaurados exatamente. Nenhum CSS ou asset alterado.
