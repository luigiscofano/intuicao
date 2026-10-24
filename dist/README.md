# Intuição

Laboratório educativo de puzzles, produzido com auxílio de OpenAI/Codex a partir do escopo aprovado por Luigi. Não representa autoria individual do estudante nem uma submissão concluída ao CS50. Vídeo de demonstração ainda não informado.

## Catálogo atual · 24/10/2026

- Reflexos: 100 níveis de luz, espelhos, paredes, cores e portais.
- Corte certo: 100 níveis de proporções, curvas e áreas com vazios.
- ELO: 200 níveis de regiões e circuitos.
- PRUMO: 200 níveis de peças e centros de massa.
- PACTO: 200 níveis de duplas e dedução.
- DESVIO: duelo local, bot ou treino; 16 mapas, sem campanha numerada.

Total: 800 níveis de campanha e um duelo. NEXO e Equilíbrio foram retirados do site; PRUMO é outro jogo e permanece. Os registros antigos do navegador e os backups históricos não são apagados. Não misture arquivos de versões anteriores com a versão atual.

## Jogar

Escolher um jogo abre a seleção de níveis em botões arredondados. Todos os níveis estão disponíveis. O resultado só é avaliado ao confirmar. Em Reflexos, também é possível disparar individualmente clicando na fonte; o último disparo necessário completa a tentativa. Colisões interrompem os raios, inclusive em disparos separados.

Corte certo tem um modo básico com apenas deslocamento na direção indicada, diferente entre níveis. A aba de controles avançados separa mover, girar e deslizar a curva. Vazios e recortes externos não contam na área; sobreposições entre vazios são contadas uma única vez. A tolerância continua inclusiva de ±3 pontos percentuais. Os níveis Corte v2 usam identificadores novos, sem reaproveitar conclusões de outras geometrias.

Uma resposta errada ou incompleta dispara o efeito breve de derrota. Após três erros no nível, “Ver gabarito” monta uma solução padrão e aguarda confirmação; a conclusão é identificada como assistida. O gabarito do Corte respeita a restrição do modo básico. Vitória usa borda verde, zoom suave e PARABÉNS; derrota usa tremor leve, borda vermelha e blur de 300 ms. Movimento reduzido é respeitado.

ELO conecta peças automaticamente, preserva cores das regiões fixas e oferece “Marcar células bloqueadas”. PRUMO cresce em cinco patamares de 40 níveis: 4×4, 4×5, 5×5, 5×6 e 6×6; nunca diminui nem ultrapassa 10×10. PACTO marca contradições comprovadas com hachuras vermelhas, sem consultar o gabarito e sem contar tentativa durante a edição.

## Executar a cópia baixada

O Drive armazena os arquivos, mas não executa o site. No pacote completo, abra um terminal na pasta Intuicao e execute `python -m http.server 8766 --bind 127.0.0.1` (no Windows, `py` pode substituir `python`). Abra http://127.0.0.1:8766/codigo/ no navegador. Se baixou apenas os arquivos desta pasta de código, sirva a pasta e abra a raiz do endereço. Não use file://, pois módulos JavaScript podem ser bloqueados.

Não há compilação, pacotes externos nem backend. Python só serve os arquivos. A cópia local no Chrome não se atualiza automaticamente quando o Drive ou o Site é atualizado.

## Dados, acessibilidade e limites

Sem cadastro, ranking, coleta de dados pessoais ou upload automático de jogadas. Progresso, tentativas, preferências e sessões são locais ao navegador; não sincronizam entre aparelhos. Limpar os dados do site apaga esses registros. Backups históricos preservam versões antigas.

Sliders, campos numéricos e teclado complementam o arraste; estados e resultados têm anúncios acessíveis. A dificuldade é uma progressão editorial/estrutural, não uma alegação de calibração por testes com jogadores. Testes de motores e DOM simulado não substituem validação interativa em navegador real.

## Documentação

- [Coleção lógica e regras](EXPANSAO.md)
- [Gabaritos e resultados](GABARITOS.md)
- [Corte v2: controles, geometria e validação](CORTE-V2-E-CATALOGO-800.md)
- [Catálogo atual e retirada de jogos](CATALOGO-ATUAL.md)
- [Registro histórico de validação da expansão](VALIDACAO-EXPANSAO.md)

Os módulos de geometria, níveis, interface e resultados ficam separados para permitir testes reproduzíveis. O pacote completo inclui documentação e testes. Nenhum exercício foi enviado ao curso nem pedido de certificado foi realizado. Revise as regras do curso e registre suas próprias contribuições antes de qualquer entrega.
