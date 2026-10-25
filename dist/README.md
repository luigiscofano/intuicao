# Intuição

Laboratório educativo de puzzles, produzido com auxílio de OpenAI/Codex a partir do escopo aprovado por Luigi. Não representa autoria individual do estudante nem uma submissão concluída ao CS50. Vídeo de demonstração ainda não informado.

## Catálogo da revisão v4 · 25/10/2026

- Reflexos: 500 níveis de luz, espelhos, paredes, cores e portais.
- Corte certo: 100 níveis de proporções, curvas e áreas com vazios.
- ELO: 200 níveis de regiões e circuitos.
- PRUMO: 200 níveis de peças e centros de massa.
- PACTO: 200 níveis de duplas e dedução.
- DESVIO: duelo local, bot ou treino; 16 mapas, sem campanha numerada.

Total: 1200 níveis de campanha e um duelo. NEXO e Equilíbrio foram retirados do site; PRUMO é outro jogo e permanece. Os registros antigos do navegador e os backups históricos não são apagados. Não misture arquivos de versões anteriores com a versão atual.

A campanha v4 foi compilada com 500 soluções reproduzidas no motor real, 11.150 casos de contraprova/alternativa e fluxo de interface dos 500 Reflexos e 100 Corte em DOM determinístico. A inspeção em navegador real ainda não foi executada nesta etapa. Veja os resultados e limites no [registro v4](development/reflexos-v4/README.md); os relatórios históricos continuam separados.

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

## Reflexos v4

A campanha se organiza em quatro faixas: **Básico, 1–200; Intermediário, 201–300; Avançado, 301–400; Mestre, 401–500**. Subdivisões didáticas podem existir somente no Básico. As outras faixas misturam os conceitos; blocos de dez ou 50 fases são instrumentos de revisão da variedade, não capítulos da interface.

A revisão altera a composição, a classificação e a ordem das fases, sem autorizar mudanças na física, nas regras, nos controles, no visual ou nos demais jogos. A dificuldade é avaliada pelas dependências entre decisões, não pela quantidade de peças ou pela precisão angular. Qualquer solução permitida pelas regras continua válida; o gabarito é uma configuração de referência, não uma exigência de percurso único.

A identidade de uma fase é independente de seu número na seleção. Fases reaproveitadas sem mudança conservam seus IDs; fases novas ou redesenhadas recebem identidade de versão própria. Reordenar não deve transferir uma conclusão para outro desafio, apagar o histórico nem reiniciar os saves. Foram mantidos 158 IDs legados e criadas 342 identidades de versão nova, incluindo dois reparos de enquadramento; as 200 definições anteriores estão arquivadas. Os testes de correspondência por ID passaram sem acessar saves reais de usuários. Consulte o [registro de desenvolvimento v4](development/reflexos-v4/README.md).

A campanha contém 399 aplicações certificadas da ideia 7, das quais 327 não têm paredes; ao todo, 335 mapas são inteiramente sem paredes. O mesmo registro reúne a distribuição por faixa, exemplos geométricos, três exceções visuais legadas e limites das verificações. Buscas finitas e amostras de ângulos não demonstram unicidade contínua. [Reflexos v3](REFLEXOS-V3.md) permanece como registro histórico da campanha anterior de 200 níveis.

## Documentação

- [Reflexos v4: desenvolvimento, distribuição e validação](development/reflexos-v4/README.md)
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
