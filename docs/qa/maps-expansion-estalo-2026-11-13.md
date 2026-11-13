# ESTALO: seis novas Varandas

O catálogo passa de 42 para 48 mapas: oito por tamanho, mantendo 4×4, 3×6, 4×6, 6×6, 6×8 e 8×8. Todos os 42 mapas antigos continuam idênticos, inclusive IDs, arranjos e metas.

Varandas introduz duas reentrâncias opostas nas bordas e um arranjo próprio de direções. O recorte faz o pulso terminar onde antes seguiria; não é apenas uma mudança cosmética. As duas equipes têm a mesma quantidade de vagens. A rotação de 180° inverte as direções e troca a posse, preservando a simetria. Nos tamanhos menores, o recorte mantém no mínimo sete vagens por equipe.

Verificações executadas em `tests/maps-expansion-estalo.test.mjs` (4 testes aprovados):
- comparação exata dos 42 mapas anteriores com source v254;
- metas iguais e simetria das seis novas posições;
- exclusão de equivalência completa por reflexão, rotação e troca de cores com mapas anteriores;
- 600 partidas completas aleatórias, conservação de vagens/pontos e limite finito;
- 18 partidas completas de IA nos seis mapas/três dificuldades, resposta legal com orçamento curto de 80 nós e 20 ms por decisão.

Não modifica motor, regras, controlador, view ou persistência. Não reivindica equilíbrio competitivo comprovado, medição de desempenho em celular físico ou validação visual; isso cabe à integração do seletor e QA responsivo.
