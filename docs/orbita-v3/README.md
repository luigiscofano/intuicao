# ÓRBITA v3 · círculos perfeitos

Esta versão aplica a correção mais recente do usuário: os anéis são **sempre círculos geométricos perfeitos**, deslocados e conectados a outros círculos em casas distintas. A interface desenha arcos circulares SVG exatos (`rx = ry = r`), não elipses ou polígonos aproximados. A animação também permanece no círculo durante todo o movimento.

## Campanha e variedade

- 1.000 fases; definições 1–200 preservadas.
- Novas fases 201–1000 com 2–5 círculos e 2–14 casas compartilhadas.
- Nenhum par possui mais de dois encontros; nenhuma casa pertence a três círculos.
- Os círculos da rede têm centros, raios, vizinhos, comprimentos lógicos e ordens de encontros variados.
- Tangências reais permitem totais ímpares. Nos cruzamentos próprios, o ângulo não orientado mínimo de 20° evita arcos quase coincidentes.
- Soluções, passos duplos, engrenagens disjuntas, sensores, restaurações, armazenamento temporário e efeitos localizados usam o motor original.

Dois círculos distintos têm no máximo dois pontos em comum. Assim, a exigência anterior de 120 fases de dois anéis era incompatível com exatamente 100 fases de dois encontros. A revisão mínima é **100/240/250/210** fases com 2/3/4/5 círculos, conservando a distribuição total de encontros **100/150/170/150/130/70/30** para 2/3/4/5/6–7/8–10/11–14 encontros.

As antigas famílias orgânicas, elípticas e com três ou mais encontros no mesmo par foram substituídas pela orientação mais recente. Não se afirma cumprir as 24 famílias geométricas da especificação revogada. A auditoria registra famílias circulares efetivamente realizadas e conceitos acompanhados de evidências de comportamento.

## Verificação

```sh
node tests/orbita-build-v3.mjs
node --test tests/orbita-*.test.mjs
node tests/orbita-render-v3.mjs
```

`tests/orbita-v3-audit.json` contém cotas, famílias, métricas por fase/capítulo/faixa e resultados geométricos. A validação compara todas as interseções analíticas de cada par com as casas compartilhadas, verifica posição no círculo, sentido da ordem cíclica, limites, espaçamento e folga das casas em relação aos círculos dos quais não fazem parte.

As assinaturas estruturais continuam independentes de desenhos, nomes, símbolos e embaralhamentos. A reprodução da solução comprova solvabilidade, não minimalidade. Evidências observadas numa rota não são apresentadas como prova de que toda solução necessita daquele procedimento; a dificuldade é editorial, não calibrada com jogadores.

## Progresso e Endless

Campanha e gerador têm versão 3. Conclusões, preferências e progresso permanente não são apagados. Uma tentativa salva de uma definição substituída reinicia apenas essa tentativa. Uma tentativa Endless antiga com percursos não circulares é arquivada integralmente e recuperada explicitamente em um desafio circular certificado, com nova seed e aviso visível. Os contadores e o histórico são preservados; a seed antiga nunca é reinterpretada silenciosamente. Partidas personalizadas antigas não circulares também são preservadas, mas não são exibidas. Novos desafios e respostas de workers precisam ser da versão circular atual.

Os módulos e testes v2 conservados servem à compatibilidade e ao histórico; não são usados para criar novos tabuleiros da campanha circular. Documentação e folhas de contato em `docs/orbita-v2` descrevem a versão anterior.

As folhas de contato v3 são verificações estáticas com os caminhos, símbolos, alvos, sensores e posições de rótulos da interface real. Testes de navegador, toque, foco e rolagem a 320/390 px devem ser registrados separadamente; cálculo de escala não substitui essa verificação.
