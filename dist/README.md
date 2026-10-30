# Atualização PRUMO80 · 30/10/2026

A campanha ativa de **PRUMO tem exatamente 80 níveis**, em seis faixas: Básico 1–15, Aprendiz 16–30, Intermediário 31–45, Avançado 46–60, Mestre 61–75 e Modo Sábio 76–80. As grades reais progridem de 4×4 até 10×10, intercalando enigmas compactos. Consulte a [tabela por fase e limites de validação](PRUMO80-VALIDACAO.md). Diário escolhe deste catálogo; Modo Sem Parar e fases personalizadas não aumentam a campanha. Dicas visíveis continuam exclusivas de PACTO; opções avançadas continuam exclusivas de Reflexos.

As seções a seguir documentam revisões históricas. Suas antigas contagens e divisões de PRUMO não descrevem a campanha atual; não se sobrepõem à atualização acima. Os dados e gabaritos antigos são preservados como histórico, sem transferir vitórias por número de posição.

---

# Intuição

Laboratório educativo de puzzles, produzido com auxílio de OpenAI/Codex a partir do escopo aprovado por Luigi. Não representa autoria individual do estudante nem uma submissão concluída ao CS50. Vídeo de demonstração ainda não informado.

## Catálogo da revisão v5 · 25/10/2026

- Reflexos: 500 níveis de luz, espelhos, paredes, cores e portais.
- Corte certo: 100 níveis de proporções, curvas e áreas com vazios.
- ELO: 200 níveis de regiões e circuitos.
- PRUMO: 200 níveis de peças e centros de massa.
- PACTO: 200 níveis de duplas e dedução.
- DESVIO: duelo local, bot ou treino; 16 mapas, sem campanha numerada.

Total: 1200 níveis de campanha e um duelo. NEXO e Equilíbrio foram retirados do site; PRUMO é outro jogo e permanece. Os registros antigos do navegador e os backups históricos não são apagados. Não misture arquivos de versões anteriores com a versão atual.

A campanha v5 conserva 500 fases e corrige a geometria de 380 mapas. As 500 referências foram reproduzidas no motor preservado, com zero reflexão abaixo de 20° entre o feixe incidente e a linha do espelho. O limite é editorial, não uma nova regra de jogo: outras soluções legítimas continuam aceitas. Foram reexecutados 11.752 casos e os testes individuais/cantos ±0,5°. A inspeção em navegador da nova publicação permanece separada destes testes de motor e DOM; não se declara calibração com jogadores. Veja o [registro v5](development/reflexos-v5/README.md).

## Jogar

Escolher um jogo abre a seleção de níveis em botões arredondados. Todos os níveis estão disponíveis. O resultado só é avaliado ao confirmar. Em Reflexos, também é possível disparar individualmente clicando na fonte; o último disparo necessário completa a tentativa. Colisões interrompem os raios, inclusive em disparos separados.

Corte certo tem um modo básico com apenas deslocamento na direção indicada, diferente entre níveis. A aba de controles avançados separa mover, girar e deslizar a curva. Vazios e recortes externos não contam na área; sobreposições entre vazios são contadas uma única vez. A tolerância continua inclusiva de ±3 pontos percentuais. Os níveis Corte v2 usam identificadores novos, sem reaproveitar conclusões de outras geometrias.

Uma resposta errada ou incompleta dispara o efeito breve de derrota. Após três erros no nível, “Ver gabarito” monta uma solução padrão e aguarda confirmação; a conclusão é identificada como assistida. O gabarito do Corte respeita a restrição do modo básico. Vitória usa borda verde, zoom suave e PARABÉNS; derrota usa tremor leve, borda vermelha e blur de 300 ms. Movimento reduzido é respeitado.

ELO conecta peças automaticamente, preserva cores das regiões fixas e oferece “Marcar células bloqueadas”. PRUMO cresce em cinco patamares de 40 níveis: 4×4, 4×5, 5×5, 5×6 e 6×6; nunca diminui nem ultrapassa 10×10. PACTO espera 2 segundos e faz as hachuras vermelhas surgirem suavemente apenas para erros explícitos no estado atual: grupos com mais de dois iguais conectados, casas sem parceiro e sem vizinho vazio, ou cotas incorretas em uma linha/coluna já completa. Pares válidos, casas ainda com possibilidade de parceiro e contradições que exigem deduções não são hachurados. A edição não consulta o gabarito nem conta tentativa; a confirmação continua verificando todas as regras.

## Executar a cópia baixada

O Drive armazena os arquivos, mas não executa o site. No pacote completo, abra um terminal na pasta Intuicao e execute `python -m http.server 8766 --bind 127.0.0.1` (no Windows, `py` pode substituir `python`). Abra http://127.0.0.1:8766/codigo/ no navegador. Se baixou apenas os arquivos desta pasta de código, sirva a pasta e abra a raiz do endereço. Não use file://, pois módulos JavaScript podem ser bloqueados.

Não há compilação, pacotes externos nem backend. Python só serve os arquivos. A cópia local no Chrome não se atualiza automaticamente quando o Drive ou o Site é atualizado.

## Dados, acessibilidade e limites

Sem cadastro, ranking, coleta de dados pessoais ou upload automático de jogadas. Progresso, tentativas, preferências e sessões são locais ao navegador; não sincronizam entre aparelhos. Limpar os dados do site apaga esses registros. Backups históricos preservam versões antigas.

Sliders, campos numéricos e teclado complementam o arraste; estados e resultados têm anúncios acessíveis. A dificuldade é uma progressão editorial/estrutural, não uma alegação de calibração por testes com jogadores. Testes de motores e DOM simulado não substituem validação interativa em navegador real.

## Reflexos v5

A campanha se organiza em quatro faixas: **Básico, 1–200; Intermediário, 201–300; Avançado, 301–400; Mestre, 401–500**. Subdivisões didáticas podem existir somente no Básico. As outras faixas misturam os conceitos; blocos de dez ou 50 fases são instrumentos de revisão da variedade, não capítulos da interface.

A revisão corrige a composição das fases e conserva as quatro faixas e as posições de exibição, sem alterar física, regras, controles, visual ou demais jogos. A dificuldade é avaliada pelas dependências entre decisões, não pela quantidade de peças ou pela precisão angular. Qualquer solução permitida pelas regras continua válida; o gabarito é uma configuração de referência, não uma exigência de percurso único.

A identidade de uma fase é independente de seu número na seleção. Nesta revisão, 120 mapas da campanha de 500 conservam conteúdo e IDs; 380 mapas alterados recebem identidade nova. As 500 definições anteriores e as 200 originais ficam arquivadas. O armazenamento mantém conclusões, rascunhos e falhas sob os IDs antigos, sem apagá-los nem transferir conclusão para uma nova geometria. Os testes usam armazenamento sintético; não acessam saves reais. Consulte o [registro v5](development/reflexos-v5/README.md).

A campanha contém 399 aplicações certificadas da ideia 7, das quais 327 não têm paredes; ao todo, 335 mapas são inteiramente sem paredes. Os 16 conceitos e as quotas foram conferidos por faixa e blocos superiores de 50. Catálogos finitos não demonstram unicidade contínua; as provas geométricas, as alterações de relações e os limites estão no registro v5. [Reflexos v3](REFLEXOS-V3.md) e [v4](development/reflexos-v4/README.md) permanecem históricos.

## Documentação

- [Reflexos v5: geometria, incidência, preservação e validação](development/reflexos-v5/README.md)
- [Reflexos v4: arquivo da campanha anterior](development/reflexos-v4/README.md)
- [Reflexos v3: campanha e limites (histórico)](REFLEXOS-V3.md)
- [Validação de Reflexos v3 (histórico)](QA-REFLEXOS-V3.md)
- [Coleção lógica e regras](EXPANSAO.md)
- [Gabaritos e resultados](GABARITOS.md)
- [PACTO: hachuras somente para erros explícitos](QA-PACTO-HACHURAS.md)
- [Corte v2: controles e geometria (registro histórico)](CORTE-V2-E-CATALOGO-800.md)
- [Catálogo atual e retirada de jogos](CATALOGO-ATUAL.md)
- [Registro histórico de validação da expansão](VALIDACAO-EXPANSAO.md)

Os módulos de geometria, níveis, interface e resultados ficam separados para permitir testes reproduzíveis. O pacote completo inclui documentação e testes. Nenhum exercício foi enviado ao curso nem pedido de certificado foi realizado. Revise as regras do curso e registre suas próprias contribuições antes de qualquer entrega.

## Interação direta nos jogos lógicos

ELO, PRUMO, PACTO e DESVIO agora têm edição direta por mouse, toque e teclado, histórico transacional, controles de zoom/deslocamento e atalhos junto ao tabuleiro. Veja [Controles por jogo](CONTROLES-DIRETOS.md) e [Matriz de implementação e testes](INTERACAO-DIRETA-MATRIZ.md).

Nos puzzles, preencher o tabuleiro não revela vitória automaticamente: use **Confirmar resposta**. Dicas têm três etapas e aplicação explícita, sem consultar um gabarito para fabricar a explicação. O progresso é local a este navegador, sem sincronização prometida. NEXO e Equilíbrio permanecem fora do catálogo. Corte certo e Reflexos não foram alterados na revisão histórica de interação direta; as revisões posteriores da campanha de Reflexos não autorizam alterações nas mecânicas desses jogos.
