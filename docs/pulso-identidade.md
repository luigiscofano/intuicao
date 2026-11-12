# Pulso: Compasso + Azulejo de ritmo

Proposta aprovada: área de jogo A (Compasso), AIIJ B (Azulejo de ritmo).

- A opção **Normal** conserva o renderizador anterior, sem duplicar motores ou progresso.
- **Compasso** usa grade reta, cotas azuis, marcas verdes com centro amarelo e três espaços na margem de cada linha.
- O contador inclui as pistas fixas e pode ultrapassar 3: não mascara um excesso.
- Os intervalos exibidos são derivados somente das posições já marcadas. Não há consulta ao gabarito.
- 3/3 não declara vitória: preencher vazios, respeitar cotas e intervalos continua obrigatório.
- A preferência é armazenada em `intuicao:pulso:skin:v1`, separada dos saves.
- Alternar o visual não cria jogada, apaga histórico, reinicia fase ou dispara vitória.
- A AIIJ é SVG transparente e segue a escolha de skin. Demais jogos não mudam.

## Verificação

`node --test tests/logica/pulso-engine.test.mjs tests/logica/pulso-visual-approved.test.mjs tests/logica/shared.test.mjs tests/level-arrows-logic.test.mjs`

A apresentação percorre as 80 fases preservando as mesmas pistas e alvos editáveis. O teste inclui contagem acima de três, intervalos diferentes, storage bloqueado e equivalência do renderizador normal.
