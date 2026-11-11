# Contadores de campanha e retirada de avisos

## Escopo

A referência solicitada é o indicador verde `1 / 80 concluídas`. Ele aparece agora uma única vez na seleção de cada uma das 14 campanhas. O número é calculado pelas fases oficiais marcadas como concluídas pelo próprio jogo, incluindo conclusões assistidas conforme as regras existentes. O total vem do catálogo exibido, sem valor fixo no contador.

Campanhas verificadas: Reflexos, Corte certo, ELO, PRUMO, PACTO, SINTONIA, REPASSE, ÓRBITA, DIVISA, PULSO, FOZ, REFÚGIO, MIRANTE e RENOVO.

Os 11 jogos Versus permanecem sem contador de fases. Foram retirados o parágrafo que explicava a repetição das 80 fases no Modo sem parar e sua repetição no cartão de entrada. Avisos importantes de armazenamento e de recuperação de progresso continuam presentes. Esta entrega não modifica o funcionamento dos modos ou dos geradores.

## Preservação

Apenas seis arquivos de apresentação em `dist/` foram alterados. Nenhum motor, campanha, solução, arte, chave de armazenamento, regra de conclusão, código de backup ou interface Versus mudou. As interfaces individuais perderam somente o contador antigo duplicado e o texto indicado; a camada comum calcula o novo indicador pelo estado dos mesmos cartões de fases.

## Verificações

- 39 testes direcionados aprovados: cobertura das 25 seleções, contagem, atualização, idempotência, total dinâmico, acessibilidade, remoção dos avisos e preservação dos alertas relevantes.
- Navegador: 25 seleções verificadas. As 14 campanhas têm um único indicador compatível com as 80 fases exibidas; os 11 jogos Versus têm zero indicadores de campanha.
- Pulso fase 1 resolvida pelos controles da interface. O contador mudou de 0 para 1 e permaneceu em 1 após recarregar, sem simular uma vitória nem editar armazenamento.
- Reflexos e Pulso inspecionados também em documentos de 390 px de largura, sem corte do contador. Não é um teste em hardware móvel físico.
- Suíte histórica do checkout Sites: 1082 testes, 877 aprovados e 205 falhas; baseline v204: 1054 testes, 849 aprovados e as mesmas 205 falhas. Nenhuma falha adicional. O teste que exigia o aviso removido foi atualizado para exigir sua ausência.
- Verificação de sintaxe dos módulos alterados e `git diff --check` aprovados.

As falhas históricas não foram corrigidas nesta mudança pontual. Elas incluem contratos de versões antigas e referências ao histórico GitHub ausentes no checkout Sites; não é correto apresentar a suíte histórica como inteiramente aprovada.

## GitHub

O recorte explícito de CI passa com 657 testes (95 motores, 456 plataforma e lógica, 106 duelos), além da conferência do índice de conquistas. Os testes de preservação verificam que apenas seis arquivos de apresentação mudaram; nas quatro interfaces individuais, a diferença consiste exatamente nas remoções listadas. Mantida a formatação legível que já existia no GitHub.
