# PACTO — campanha de 80 níveis

Versão editorial 2. Seis faixas: 15/15/15/15/15/5. Grade 8×8, quatro símbolos, duas ocorrências por linha/coluna e exatamente um parceiro ortogonal valem desde o primeiro nível. Duplas não são pré-fixadas.

## Critérios e limites

A curadoria mede relações e técnicas, não só pistas. O Básico recompõe pistas de apoio; Aprendiz e Intermediário alongam cadeias. Avançado exige conjuntos coletivos e hipóteses curtas. Mestre alterna cadeias longas e três estados compactos que conservam um impasse real: 38, 34 e 37 pistas; mesmo com menos vazios ainda é necessária uma refutação. As quedas locais de profundidade desses compactos são intencionais, não regressão para contagem simples. As cinco sínteses finais têm profundidades 21, 23, 27, 29 e 33 e focos distintos.

Todas as fases têm solução única por busca concluída sem limite de nós; passaram também pela propagação do motor e por uma trilha independente com regras nomeadas. Hipóteses só entram depois de esgotar deduções diretas e conjuntos coletivos; cada refutação termina numa contradição concreta, sem tentativa aleatória. GAC não é usado como substituto da explicação. Profundidade é uma métrica de dependência da trilha, não uma medida empiricamente calibrada com jogadores. Não houve teste com jogadores humanos.

O arquivo de certificados que acompanha a entrega contém as 80 grades, soluções, função de cada pista, todos os passos e subpassos de refutação. As sequências abaixo são completas, usam L/C para linha/coluna e nomes dos quatro símbolos. Pistas não usadas nesta prova são explicitamente marcadas como andaimes visuais, sem alegação de necessidade lógica. IDs antigos são mantidos somente para pistas idênticas; recomposições têm IDs novos.

## 1. Básico — pacto-v2-001

**Descoberta:** Cotas por linha e coluna.

**Técnicas combinadas:** cota saturada; posições restantes.

**Origem:** pacto-001; recomposição de pistas; 14 pistas alteradas. **Pistas:** 48; 16 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 3; 47 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: quadrado — cota saturada; posições restantes; primeira participação no passo 1.
- L1C2: losango — cota saturada; posições restantes; primeira participação no passo 4.
- L1C3: losango — cota saturada; posições restantes; primeira participação no passo 4.
- L1C4: triângulo — cota saturada; primeira participação no passo 37.
- L1C5: quadrado — cota saturada; primeira participação no passo 1.
- L2C1: quadrado — cota saturada; posições restantes; primeira participação no passo 9.
- L2C2: círculo — cota saturada; posições restantes; primeira participação no passo 32.
- L2C4: triângulo — cota saturada; primeira participação no passo 7.
- L2C5: quadrado — cota saturada; primeira participação no passo 9.
- L2C6: triângulo — cota saturada; primeira participação no passo 7.
- L2C8: losango — posições restantes; primeira participação no passo 46.
- L3C1: círculo — posições restantes; primeira participação no passo 30.
- L3C2: losango — posições restantes; primeira participação no passo 33.
- L3C3: losango — posições restantes; primeira participação no passo 35.
- L3C4: quadrado — cota saturada; primeira participação no passo 38.
- L3C5: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L3C6: quadrado — cota saturada; primeira participação no passo 41.
- L3C7: triângulo — cota saturada; posições restantes; primeira participação no passo 42.
- L3C8: triângulo — cota saturada; posições restantes; primeira participação no passo 44.
- L4C3: triângulo — posições restantes; primeira participação no passo 35.
- L4C4: quadrado — cota saturada; primeira participação no passo 11.
- L4C5: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L4C6: quadrado — cota saturada; primeira participação no passo 11.
- L4C7: losango — posições restantes; primeira participação no passo 43.
- L5C2: quadrado — cota saturada; posições restantes; primeira participação no passo 16.
- L5C3: quadrado — cota saturada; posições restantes; primeira participação no passo 16.
- L5C5: triângulo — cota saturada; primeira participação no passo 39.
- L5C6: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L5C7: círculo — cota saturada; posições restantes; primeira participação no passo 14.
- L5C8: círculo — cota saturada; posições restantes; primeira participação no passo 14.
- L6C1: triângulo — cota saturada; posições restantes; primeira participação no passo 21.
- L6C2: círculo — cota saturada; posições restantes; primeira participação no passo 18.
- L6C3: círculo — cota saturada; posições restantes; primeira participação no passo 18.
- L6C5: triângulo — cota saturada; primeira participação no passo 21.
- L6C7: quadrado — posições restantes; primeira participação no passo 43.
- L7C1: losango — posições restantes; primeira participação no passo 30.
- L7C2: quadrado — posições restantes; primeira participação no passo 33.
- L7C3: quadrado — posições restantes; primeira participação no passo 35.
- L7C4: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C5: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C6: círculo — cota saturada; primeira participação no passo 40.
- L7C7: triângulo — cota saturada; posições restantes; primeira participação no passo 42.
- L7C8: triângulo — cota saturada; posições restantes; primeira participação no passo 44.
- L8C1: losango — posições restantes; primeira participação no passo 30.
- L8C4: círculo — cota saturada; primeira participação no passo 24.
- L8C6: círculo — cota saturada; primeira participação no passo 24.
- L8C7: quadrado — cota saturada; posições restantes; primeira participação no passo 27.
- L8C8: quadrado — cota saturada; posições restantes; primeira participação no passo 27.

### Sequência lógica

1. linha 1 já tem dois quadrado (L1C1, L1C5); exclua quadrado de L1C6.
2. linha 1 já tem dois quadrado (L1C1, L1C5); exclua quadrado de L1C7.
3. linha 1 já tem dois quadrado (L1C1, L1C5); exclua quadrado de L1C8.
4. linha 1 já tem dois losango (L1C2, L1C3); exclua losango de L1C6.
5. linha 1 já tem dois losango (L1C2, L1C3); exclua losango de L1C7.
6. linha 1 já tem dois losango (L1C2, L1C3); exclua losango de L1C8.
7. linha 2 já tem dois triângulo (L2C4, L2C6); exclua triângulo de L2C3.
8. linha 2 já tem dois triângulo (L2C4, L2C6); exclua triângulo de L2C7.
9. linha 2 já tem dois quadrado (L2C1, L2C5); exclua quadrado de L2C3.
10. linha 2 já tem dois quadrado (L2C1, L2C5); exclua quadrado de L2C7.
11. linha 4 já tem dois quadrado (L4C4, L4C6); exclua quadrado de L4C1.
12. linha 4 já tem dois quadrado (L4C4, L4C6); exclua quadrado de L4C2.
13. linha 4 já tem dois quadrado (L4C4, L4C6); exclua quadrado de L4C8.
14. linha 5 já tem dois círculo (L5C7, L5C8); exclua círculo de L5C1.
15. linha 5 já tem dois círculo (L5C7, L5C8); exclua círculo de L5C4.
16. linha 5 já tem dois quadrado (L5C2, L5C3); exclua quadrado de L5C1.
17. linha 5 já tem dois quadrado (L5C2, L5C3); exclua quadrado de L5C4.
18. linha 6 já tem dois círculo (L6C2, L6C3); exclua círculo de L6C4.
19. linha 6 já tem dois círculo (L6C2, L6C3); exclua círculo de L6C6.
20. linha 6 já tem dois círculo (L6C2, L6C3); exclua círculo de L6C8.
21. linha 6 já tem dois triângulo (L6C1, L6C5); exclua triângulo de L6C4.
22. linha 6 já tem dois triângulo (L6C1, L6C5); exclua triângulo de L6C6.
23. linha 6 já tem dois triângulo (L6C1, L6C5); exclua triângulo de L6C8.
24. linha 8 já tem dois círculo (L8C4, L8C6); exclua círculo de L8C2.
25. linha 8 já tem dois círculo (L8C4, L8C6); exclua círculo de L8C3.
26. linha 8 já tem dois círculo (L8C4, L8C6); exclua círculo de L8C5.
27. linha 8 já tem dois quadrado (L8C7, L8C8); exclua quadrado de L8C2.
28. linha 8 já tem dois quadrado (L8C7, L8C8); exclua quadrado de L8C3.
29. linha 8 já tem dois quadrado (L8C7, L8C8); exclua quadrado de L8C5.
30. Na coluna 1, círculo só cabe em L3C1 e L4C1; ambas as casas precisam dele.
31. Na coluna 1, triângulo só cabe em L5C1 e L6C1; ambas as casas precisam dele.
32. coluna 2 já tem dois círculo (L2C2, L6C2); exclua círculo de L4C2.
33. Na coluna 2, triângulo só cabe em L4C2 e L8C2; ambas as casas precisam dele.
34. Na coluna 2, triângulo só cabe em L4C2 e L8C2; ambas as casas precisam dele.
35. Na coluna 3, círculo só cabe em L2C3 e L6C3; ambas as casas precisam dele.
36. Na coluna 3, triângulo só cabe em L4C3 e L8C3; ambas as casas precisam dele.
37. coluna 4 já tem dois triângulo (L1C4, L2C4); exclua triângulo de L5C4.
38. coluna 4 já tem dois quadrado (L3C4, L4C4); exclua quadrado de L6C4.
39. coluna 5 já tem dois triângulo (L5C5, L6C5); exclua triângulo de L8C5.
40. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L1C6.
41. coluna 6 já tem dois quadrado (L3C6, L4C6); exclua quadrado de L6C6.
42. coluna 7 já tem dois triângulo (L3C7, L7C7); exclua triângulo de L1C7.
43. Na coluna 7, losango só cabe em L2C7 e L4C7; ambas as casas precisam dele.
44. coluna 8 já tem dois triângulo (L3C8, L7C8); exclua triângulo de L1C8.
45. coluna 8 já tem dois triângulo (L3C8, L7C8); exclua triângulo de L4C8.
46. Na coluna 8, quadrado só cabe em L6C8 e L8C8; ambas as casas precisam dele.
47. Na coluna 8, losango só cabe em L2C8 e L4C8; ambas as casas precisam dele.

## 2. Básico — pacto-v2-002

**Descoberta:** Cotas por linha e coluna.

**Técnicas combinadas:** cota saturada; posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação.

**Origem:** pacto-004; recomposição de pistas; 14 pistas alteradas. **Pistas:** 48; 16 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 3; 45 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C2: quadrado — exclusão junto à dupla; primeira participação no passo 41.
- L1C4: triângulo — cota saturada; primeira participação no passo 3.
- L1C5: losango — posições restantes; primeira participação no passo 35.
- L1C6: círculo — cota saturada; primeira participação no passo 1.
- L1C7: círculo — cota saturada; posições restantes; primeira participação no passo 1.
- L1C8: triângulo — cota saturada; primeira participação no passo 3.
- L2C1: círculo — cota saturada; posições restantes; primeira participação no passo 5.
- L2C2: círculo — cota saturada; posições restantes; primeira participação no passo 5.
- L2C3: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 7.
- L2C4: triângulo — cota saturada; posições restantes; primeira participação no passo 6.
- L2C5: losango — posições restantes; primeira participação no passo 7.
- L2C6: quadrado — posições restantes; cota saturada; primeira participação no passo 7.
- L2C8: triângulo — cota saturada; posições restantes; primeira participação no passo 6.
- L3C1: triângulo — cota saturada; posições restantes; primeira participação no passo 9.
- L3C3: quadrado — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 10.
- L3C4: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 8.
- L3C5: quadrado — cota saturada; posições restantes; primeira participação no passo 10.
- L3C6: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L3C7: triângulo — cota saturada; posições restantes; primeira participação no passo 9.
- L3C8: círculo — cota saturada; primeira participação no passo 8.
- L4C1: triângulo — cota saturada; posições restantes; primeira participação no passo 30.
- L4C2: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L4C4: círculo — cota saturada; primeira participação no passo 11.
- L4C8: círculo — cota saturada; primeira participação no passo 11.
- L5C1: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 15.
- L5C2: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 15.
- L5C3: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 16.
- L5C4: losango — parceiro obrigatório / orientação; primeira participação no passo 43.
- L5C5: triângulo — cota saturada; posições restantes; primeira participação no passo 16.
- L5C6: quadrado — cota saturada; primeira participação no passo 17.
- L5C7: quadrado — cota saturada; posições restantes; primeira participação no passo 17.
- L6C4: losango — cota saturada; primeira participação no passo 21.
- L6C5: triângulo — cota saturada; posições restantes; primeira participação no passo 34.
- L6C6: círculo — cota saturada; primeira participação no passo 18.
- L6C7: círculo — cota saturada; posições restantes; primeira participação no passo 18.
- L6C8: losango — cota saturada; primeira participação no passo 21.
- L7C1: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 26.
- L7C2: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 25.
- L7C3: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 24.
- L7C5: círculo — cota saturada; posições restantes; primeira participação no passo 24.
- L7C6: triângulo — cota saturada; posições restantes; primeira participação no passo 25.
- L7C7: losango — posições restantes; primeira participação no passo 26.
- L7C8: quadrado — posições restantes; primeira participação no passo 26.
- L8C1: losango — cota saturada; posições restantes; primeira participação no passo 27.
- L8C4: quadrado — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L8C5: círculo — posições restantes; primeira participação no passo 35.
- L8C6: triângulo — cota saturada; primeira participação no passo 36.
- L8C7: losango — cota saturada; posições restantes; primeira participação no passo 27.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C6, L1C7); exclua círculo de L1C1.
2. linha 1 já tem dois círculo (L1C6, L1C7); exclua círculo de L1C3.
3. linha 1 já tem dois triângulo (L1C4, L1C8); exclua triângulo de L1C1.
4. linha 1 já tem dois triângulo (L1C4, L1C8); exclua triângulo de L1C3.
5. linha 2 já tem dois círculo (L2C1, L2C2); exclua círculo de L2C7.
6. linha 2 já tem dois triângulo (L2C4, L2C8); exclua triângulo de L2C7.
7. Na linha 2, quadrado só cabe em L2C6 e L2C7; ambas as casas precisam dele.
8. linha 3 já tem dois círculo (L3C4, L3C8); exclua círculo de L3C2.
9. linha 3 já tem dois triângulo (L3C1, L3C7); exclua triângulo de L3C2.
10. linha 3 já tem dois quadrado (L3C3, L3C5); exclua quadrado de L3C2.
11. linha 4 já tem dois círculo (L4C4, L4C8); exclua círculo de L4C3.
12. linha 4 já tem dois círculo (L4C4, L4C8); exclua círculo de L4C5.
13. linha 4 já tem dois círculo (L4C4, L4C8); exclua círculo de L4C6.
14. linha 4 já tem dois círculo (L4C4, L4C8); exclua círculo de L4C7.
15. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C8.
16. linha 5 já tem dois triângulo (L5C3, L5C5); exclua triângulo de L5C8.
17. linha 5 já tem dois quadrado (L5C6, L5C7); exclua quadrado de L5C8.
18. linha 6 já tem dois círculo (L6C6, L6C7); exclua círculo de L6C1.
19. linha 6 já tem dois círculo (L6C6, L6C7); exclua círculo de L6C2.
20. linha 6 já tem dois círculo (L6C6, L6C7); exclua círculo de L6C3.
21. linha 6 já tem dois losango (L6C4, L6C8); exclua losango de L6C1.
22. linha 6 já tem dois losango (L6C4, L6C8); exclua losango de L6C2.
23. linha 6 já tem dois losango (L6C4, L6C8); exclua losango de L6C3.
24. linha 7 já tem dois círculo (L7C3, L7C5); exclua círculo de L7C4.
25. linha 7 já tem dois triângulo (L7C2, L7C6); exclua triângulo de L7C4.
26. Na linha 7, quadrado só cabe em L7C4 e L7C8; ambas as casas precisam dele.
27. linha 8 já tem dois losango (L8C1, L8C7); exclua losango de L8C2.
28. linha 8 já tem dois losango (L8C1, L8C7); exclua losango de L8C3.
29. linha 8 já tem dois losango (L8C1, L8C7); exclua losango de L8C8.
30. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L6C1.
31. Na coluna 1, quadrado só cabe em L1C1 e L6C1; ambas as casas precisam dele.
32. coluna 2 já tem dois círculo (L2C2, L5C2); exclua círculo de L8C2.
33. Na coluna 3, círculo só cabe em L7C3 e L8C3; ambas as casas precisam dele.
34. coluna 5 já tem dois triângulo (L5C5, L6C5); exclua triângulo de L4C5.
35. Na coluna 5, quadrado só cabe em L3C5 e L4C5; ambas as casas precisam dele.
36. coluna 6 já tem dois triângulo (L7C6, L8C6); exclua triângulo de L4C6.
37. coluna 6 já tem dois quadrado (L2C6, L5C6); exclua quadrado de L4C6.
38. Na coluna 7, triângulo só cabe em L3C7 e L4C7; ambas as casas precisam dele.
39. coluna 8 já tem dois círculo (L3C8, L4C8); exclua círculo de L8C8.
40. coluna 8 já tem dois triângulo (L1C8, L2C8); exclua triângulo de L8C8.
41. A dupla L1C2–L1C1 já está fechada; L1C3 não pode tocar essa dupla com outro quadrado.
42. L3C3 precisa de um parceiro quadrado; só L4C3 pode recebê-lo (vertical).
43. L5C3 precisa de um parceiro triângulo; só L6C3 pode recebê-lo (vertical).
44. L6C1 precisa de um parceiro quadrado; só L6C2 pode recebê-lo (horizontal).
45. L7C2 precisa de um parceiro triângulo; só L8C2 pode recebê-lo (vertical).

## 3. Básico — pacto-v2-003

**Descoberta:** Cotas por linha e coluna.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação.

**Origem:** pacto-007; recomposição de pistas; 14 pistas alteradas. **Pistas:** 48; 16 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 3; 45 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: losango — posições restantes; primeira participação no passo 26.
- L1C2: círculo — cota saturada; primeira participação no passo 29.
- L1C3: círculo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 32.
- L1C4: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L1C5: triângulo — posições restantes; primeira participação no passo 34.
- L1C6: quadrado — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L1C7: quadrado — cota saturada; primeira participação no passo 37.
- L1C8: triângulo — cota saturada; primeira participação no passo 39.
- L2C4: losango — parceiro obrigatório / orientação; primeira participação no passo 40.
- L2C6: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C7: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C8: triângulo — cota saturada; primeira participação no passo 39.
- L3C3: losango — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 5.
- L3C4: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L3C5: quadrado — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 34.
- L3C6: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 5.
- L4C1: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 9.
- L4C2: triângulo — parceiro obrigatório / orientação; primeira participação no passo 43.
- L4C3: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 32.
- L4C4: círculo — cota saturada; primeira participação no passo 9.
- L4C5: quadrado — cota saturada; posições restantes; primeira participação no passo 11.
- L4C8: quadrado — cota saturada; primeira participação no passo 11.
- L5C1: quadrado — cota saturada; posições restantes; primeira participação no passo 15.
- L5C2: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 30.
- L5C3: triângulo — cota saturada; posições restantes; primeira participação no passo 14.
- L5C4: quadrado — cota saturada; primeira participação no passo 15.
- L5C5: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 13.
- L5C6: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 14.
- L5C8: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 13.
- L6C1: quadrado — cota saturada; posições restantes; primeira participação no passo 18.
- L6C2: losango — cota saturada; primeira participação no passo 30.
- L6C3: triângulo — cota saturada; posições restantes; primeira participação no passo 31.
- L6C4: quadrado — cota saturada; primeira participação no passo 18.
- L6C5: círculo — cota saturada; posições restantes; primeira participação no passo 16.
- L6C8: círculo — cota saturada; primeira participação no passo 16.
- L7C1: triângulo — cota saturada; posições restantes; primeira participação no passo 22.
- L7C2: quadrado — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C4: triângulo — cota saturada; primeira participação no passo 22.
- L7C6: círculo — cota saturada; primeira participação no passo 20.
- L7C7: círculo — cota saturada; primeira participação no passo 20.
- L7C8: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L8C2: círculo — cota saturada; posições restantes; primeira participação no passo 24.
- L8C3: círculo — cota saturada; posições restantes; primeira participação no passo 24.
- L8C4: triângulo — posições restantes; primeira participação no passo 25.
- L8C5: losango — posições restantes; primeira participação no passo 25.
- L8C6: quadrado — posições restantes; primeira participação no passo 25.
- L8C7: quadrado — posições restantes; cota saturada; primeira participação no passo 25.
- L8C8: losango — posições restantes; primeira participação no passo 25.

### Sequência lógica

1. linha 2 já tem dois círculo (L2C6, L2C7); exclua círculo de L2C1.
2. linha 2 já tem dois círculo (L2C6, L2C7); exclua círculo de L2C2.
3. linha 2 já tem dois círculo (L2C6, L2C7); exclua círculo de L2C3.
4. linha 2 já tem dois círculo (L2C6, L2C7); exclua círculo de L2C5.
5. linha 3 já tem dois losango (L3C3, L3C6); exclua losango de L3C1.
6. linha 3 já tem dois losango (L3C3, L3C6); exclua losango de L3C2.
7. linha 3 já tem dois losango (L3C3, L3C6); exclua losango de L3C7.
8. linha 3 já tem dois losango (L3C3, L3C6); exclua losango de L3C8.
9. linha 4 já tem dois círculo (L4C1, L4C4); exclua círculo de L4C6.
10. linha 4 já tem dois círculo (L4C1, L4C4); exclua círculo de L4C7.
11. linha 4 já tem dois quadrado (L4C5, L4C8); exclua quadrado de L4C6.
12. linha 4 já tem dois quadrado (L4C5, L4C8); exclua quadrado de L4C7.
13. linha 5 já tem dois círculo (L5C5, L5C8); exclua círculo de L5C7.
14. linha 5 já tem dois triângulo (L5C3, L5C6); exclua triângulo de L5C7.
15. linha 5 já tem dois quadrado (L5C1, L5C4); exclua quadrado de L5C7.
16. linha 6 já tem dois círculo (L6C5, L6C8); exclua círculo de L6C6.
17. linha 6 já tem dois círculo (L6C5, L6C8); exclua círculo de L6C7.
18. linha 6 já tem dois quadrado (L6C1, L6C4); exclua quadrado de L6C6.
19. linha 6 já tem dois quadrado (L6C1, L6C4); exclua quadrado de L6C7.
20. linha 7 já tem dois círculo (L7C6, L7C7); exclua círculo de L7C3.
21. linha 7 já tem dois círculo (L7C6, L7C7); exclua círculo de L7C5.
22. linha 7 já tem dois triângulo (L7C1, L7C4); exclua triângulo de L7C3.
23. linha 7 já tem dois triângulo (L7C1, L7C4); exclua triângulo de L7C5.
24. linha 8 já tem dois círculo (L8C2, L8C3); exclua círculo de L8C1.
25. Na linha 8, triângulo só cabe em L8C1 e L8C4; ambas as casas precisam dele.
26. Na coluna 1, círculo só cabe em L3C1 e L4C1; ambas as casas precisam dele.
27. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L2C1.
28. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L2C1.
29. coluna 2 já tem dois círculo (L1C2, L8C2); exclua círculo de L3C2.
30. coluna 2 já tem dois losango (L5C2, L6C2); exclua losango de L2C2.
31. coluna 3 já tem dois triângulo (L5C3, L6C3); exclua triângulo de L2C3.
32. Na coluna 3, quadrado só cabe em L2C3 e L7C3; ambas as casas precisam dele.
33. Na coluna 3, quadrado só cabe em L2C3 e L7C3; ambas as casas precisam dele.
34. Na coluna 5, triângulo só cabe em L1C5 e L2C5; ambas as casas precisam dele.
35. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L7C5.
36. coluna 7 já tem dois círculo (L2C7, L7C7); exclua círculo de L3C7.
37. coluna 7 já tem dois quadrado (L1C7, L8C7); exclua quadrado de L3C7.
38. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L3C8.
39. coluna 8 já tem dois triângulo (L1C8, L2C8); exclua triângulo de L3C8.
40. L2C3 precisa de um parceiro quadrado; só L2C2 pode recebê-lo (horizontal).
41. L3C6 precisa de um parceiro losango; só L4C6 pode recebê-lo (vertical).
42. L3C7 precisa de um parceiro triângulo; só L4C7 pode recebê-lo (vertical).
43. L4C2 precisa de um parceiro triângulo; só L3C2 pode recebê-lo (vertical).
44. L5C6 precisa de um parceiro triângulo; só L6C6 pode recebê-lo (vertical).
45. L5C7 precisa de um parceiro losango; só L6C7 pode recebê-lo (vertical).

## 4. Básico — pacto-v2-004

**Descoberta:** Cotas por linha e coluna.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla.

**Origem:** pacto-010; recomposição de pistas; 14 pistas alteradas. **Pistas:** 48; 16 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 4; 40 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: losango — posições restantes; primeira participação no passo 18.
- L1C2: losango — posições restantes; primeira participação no passo 21.
- L1C3: círculo — cota saturada; primeira participação no passo 22.
- L1C4: triângulo — posições restantes; primeira participação no passo 25.
- L1C5: círculo — cota saturada; posições restantes; primeira participação no passo 26.
- L1C6: triângulo — posições restantes; primeira participação no passo 31.
- L1C7: quadrado — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L1C8: quadrado — cota saturada; primeira participação no passo 38.
- L2C1: quadrado — posições restantes; primeira participação no passo 2.
- L2C2: quadrado — posições restantes; primeira participação no passo 2.
- L2C3: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C4: triângulo — posições restantes; primeira participação no passo 2.
- L2C5: círculo — cota saturada; posições restantes; primeira participação no passo 1.
- L2C7: losango — posições restantes; primeira participação no passo 2.
- L2C8: losango — posições restantes; primeira participação no passo 2.
- L3C1: losango — posições restantes; primeira participação no passo 18.
- L3C2: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 21.
- L3C3: quadrado — parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 39.
- L3C4: círculo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 25.
- L3C5: quadrado — posições restantes; cota saturada; primeira participação no passo 28.
- L3C6: círculo — cota saturada; posições restantes; primeira participação no passo 30.
- L3C7: triângulo — cota saturada; primeira participação no passo 33.
- L3C8: triângulo — cota saturada; primeira participação no passo 36.
- L4C1: triângulo — posições restantes; primeira participação no passo 18.
- L4C5: quadrado — posições restantes; cota saturada; primeira participação no passo 28.
- L4C6: círculo — cota saturada; posições restantes; primeira participação no passo 30.
- L4C7: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L5C2: círculo — cota saturada; posições restantes; primeira participação no passo 20.
- L5C4: losango — cota saturada; posições restantes; primeira participação no passo 3.
- L5C6: losango — cota saturada; posições restantes; primeira participação no passo 3.
- L6C3: triângulo — cota saturada; posições restantes; primeira participação no passo 10.
- L6C4: losango — posições restantes; primeira participação no passo 12.
- L6C5: triângulo — cota saturada; posições restantes; primeira participação no passo 10.
- L6C6: losango — posições restantes; primeira participação no passo 12.
- L6C7: círculo — cota saturada; posições restantes; primeira participação no passo 8.
- L6C8: círculo — cota saturada; posições restantes; primeira participação no passo 8.
- L7C2: círculo — cota saturada; posições restantes; primeira participação no passo 20.
- L7C3: losango — cota saturada; primeira participação no passo 24.
- L7C4: quadrado — posições restantes; primeira participação no passo 25.
- L7C7: triângulo — cota saturada; primeira participação no passo 14.
- L7C8: triângulo — cota saturada; primeira participação no passo 14.
- L8C1: triângulo — posições restantes; primeira participação no passo 17.
- L8C2: triângulo — posições restantes; primeira participação no passo 17.
- L8C3: losango — posições restantes; cota saturada; primeira participação no passo 17.
- L8C4: quadrado — posições restantes; primeira participação no passo 17.
- L8C5: losango — posições restantes; primeira participação no passo 17.
- L8C6: quadrado — posições restantes; primeira participação no passo 17.
- L8C7: círculo — posições restantes; cota saturada; primeira participação no passo 17.

### Sequência lógica

1. linha 2 já tem dois círculo (L2C3, L2C5); exclua círculo de L2C6.
2. Na linha 2, triângulo só cabe em L2C4 e L2C6; ambas as casas precisam dele.
3. linha 5 já tem dois losango (L5C4, L5C6); exclua losango de L5C1.
4. linha 5 já tem dois losango (L5C4, L5C6); exclua losango de L5C3.
5. linha 5 já tem dois losango (L5C4, L5C6); exclua losango de L5C5.
6. linha 5 já tem dois losango (L5C4, L5C6); exclua losango de L5C7.
7. linha 5 já tem dois losango (L5C4, L5C6); exclua losango de L5C8.
8. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C1.
9. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C2.
10. linha 6 já tem dois triângulo (L6C3, L6C5); exclua triângulo de L6C1.
11. linha 6 já tem dois triângulo (L6C3, L6C5); exclua triângulo de L6C2.
12. Na linha 6, quadrado só cabe em L6C1 e L6C2; ambas as casas precisam dele.
13. Na linha 6, quadrado só cabe em L6C1 e L6C2; ambas as casas precisam dele.
14. linha 7 já tem dois triângulo (L7C7, L7C8); exclua triângulo de L7C1.
15. linha 7 já tem dois triângulo (L7C7, L7C8); exclua triângulo de L7C5.
16. linha 7 já tem dois triângulo (L7C7, L7C8); exclua triângulo de L7C6.
17. Na linha 8, círculo só cabe em L8C7 e L8C8; ambas as casas precisam dele.
18. Na coluna 1, círculo só cabe em L5C1 e L7C1; ambas as casas precisam dele.
19. Na coluna 1, círculo só cabe em L5C1 e L7C1; ambas as casas precisam dele.
20. coluna 2 já tem dois círculo (L5C2, L7C2); exclua círculo de L4C2.
21. Na coluna 2, triângulo só cabe em L4C2 e L8C2; ambas as casas precisam dele.
22. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L4C3.
23. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L5C3.
24. coluna 3 já tem dois losango (L7C3, L8C3); exclua losango de L4C3.
25. Na coluna 4, círculo só cabe em L3C4 e L4C4; ambas as casas precisam dele.
26. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L5C5.
27. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L7C5.
28. Na coluna 5, triângulo só cabe em L5C5 e L6C5; ambas as casas precisam dele.
29. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L7C5.
30. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L7C6.
31. Na coluna 6, quadrado só cabe em L7C6 e L8C6; ambas as casas precisam dele.
32. coluna 7 já tem dois círculo (L6C7, L8C7); exclua círculo de L5C7.
33. coluna 7 já tem dois triângulo (L3C7, L7C7); exclua triângulo de L5C7.
34. coluna 8 já tem dois círculo (L6C8, L8C8); exclua círculo de L4C8.
35. coluna 8 já tem dois círculo (L6C8, L8C8); exclua círculo de L5C8.
36. coluna 8 já tem dois triângulo (L3C8, L7C8); exclua triângulo de L4C8.
37. coluna 8 já tem dois triângulo (L3C8, L7C8); exclua triângulo de L5C8.
38. coluna 8 já tem dois quadrado (L1C8, L5C8); exclua quadrado de L4C8.
39. L3C3 precisa de um parceiro quadrado; só L4C3 pode recebê-lo (vertical).
40. A dupla L4C3–L3C3 já está fechada; L5C3 não pode tocar essa dupla com outro quadrado.

## 5. Básico — pacto-v2-005

**Descoberta:** Cotas por linha e coluna.

**Técnicas combinadas:** cota saturada; posições restantes; exclusão junto à dupla; prevenção de isolamento; parceiro obrigatório / orientação.

**Origem:** pacto-013; recomposição de pistas; 14 pistas alteradas. **Pistas:** 48; 16 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 4; 44 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: losango — posições restantes; primeira participação no passo 3.
- L1C2: quadrado — posições restantes; primeira participação no passo 3.
- L1C3: quadrado — posições restantes; cota saturada; primeira participação no passo 3.
- L1C4: losango — posições restantes; primeira participação no passo 3.
- L1C6: círculo — cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 1.
- L1C7: círculo — cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 1.
- L2C1: losango — posições restantes; primeira participação no passo 25.
- L2C3: círculo — cota saturada; primeira participação no passo 27.
- L2C5: triângulo — cota saturada; primeira participação no passo 5.
- L2C7: quadrado — posições restantes; primeira participação no passo 36.
- L2C8: triângulo — cota saturada; primeira participação no passo 5.
- L3C1: quadrado — cota saturada; posições restantes; primeira participação no passo 10.
- L3C3: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L3C4: círculo — cota saturada; primeira participação no passo 8.
- L3C5: quadrado — cota saturada; primeira participação no passo 10.
- L3C6: triângulo — cota saturada; primeira participação no passo 9.
- L3C7: triângulo — cota saturada; posições restantes; primeira participação no passo 9.
- L3C8: círculo — cota saturada; primeira participação no passo 8.
- L4C1: quadrado — posições restantes; primeira participação no passo 25.
- L4C2: triângulo — posições restantes; primeira participação no passo 26.
- L4C3: triângulo — cota saturada; primeira participação no passo 28.
- L4C4: círculo — cota saturada; primeira participação no passo 31.
- L4C5: quadrado — cota saturada; primeira participação no passo 33.
- L4C6: losango — cota saturada; prevenção de isolamento; primeira participação no passo 34.
- L4C7: losango — posições restantes; primeira participação no passo 36.
- L4C8: círculo — prevenção de isolamento; primeira participação no passo 41.
- L5C1: círculo — cota saturada; posições restantes; primeira participação no passo 11.
- L5C2: losango — posições restantes; primeira participação no passo 26.
- L5C4: quadrado — cota saturada; primeira participação no passo 32.
- L5C5: círculo — cota saturada; prevenção de isolamento; primeira participação no passo 11.
- L5C7: triângulo — posições restantes; prevenção de isolamento; primeira participação no passo 36.
- L6C1: círculo — cota saturada; posições restantes; primeira participação no passo 24.
- L6C2: triângulo — posições restantes; primeira participação no passo 26.
- L6C3: triângulo — cota saturada; primeira participação no passo 28.
- L6C4: quadrado — cota saturada; primeira participação no passo 32.
- L6C5: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L6C6: losango — cota saturada; prevenção de isolamento; primeira participação no passo 34.
- L6C7: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 36.
- L6C8: quadrado — prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 41.
- L7C2: quadrado — posições restantes; primeira participação no passo 26.
- L7C4: triângulo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C5: losango — cota saturada; prevenção de isolamento; primeira participação no passo 14.
- L7C8: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 14.
- L8C1: triângulo — cota saturada; posições restantes; primeira participação no passo 21.
- L8C2: círculo — cota saturada; posições restantes; primeira participação no passo 18.
- L8C3: círculo — cota saturada; primeira participação no passo 18.
- L8C4: triângulo — cota saturada; primeira participação no passo 21.
- L8C6: quadrado — prevenção de isolamento; primeira participação no passo 42.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C6, L1C7); exclua círculo de L1C5.
2. linha 1 já tem dois círculo (L1C6, L1C7); exclua círculo de L1C8.
3. Na linha 1, triângulo só cabe em L1C5 e L1C8; ambas as casas precisam dele.
4. Na linha 1, triângulo só cabe em L1C5 e L1C8; ambas as casas precisam dele.
5. linha 2 já tem dois triângulo (L2C5, L2C8); exclua triângulo de L2C2.
6. linha 2 já tem dois triângulo (L2C5, L2C8); exclua triângulo de L2C4.
7. linha 2 já tem dois triângulo (L2C5, L2C8); exclua triângulo de L2C6.
8. linha 3 já tem dois círculo (L3C4, L3C8); exclua círculo de L3C2.
9. linha 3 já tem dois triângulo (L3C6, L3C7); exclua triângulo de L3C2.
10. linha 3 já tem dois quadrado (L3C1, L3C5); exclua quadrado de L3C2.
11. linha 5 já tem dois círculo (L5C1, L5C5); exclua círculo de L5C3.
12. linha 5 já tem dois círculo (L5C1, L5C5); exclua círculo de L5C6.
13. linha 5 já tem dois círculo (L5C1, L5C5); exclua círculo de L5C8.
14. linha 7 já tem dois losango (L7C5, L7C8); exclua losango de L7C1.
15. linha 7 já tem dois losango (L7C5, L7C8); exclua losango de L7C3.
16. linha 7 já tem dois losango (L7C5, L7C8); exclua losango de L7C6.
17. linha 7 já tem dois losango (L7C5, L7C8); exclua losango de L7C7.
18. linha 8 já tem dois círculo (L8C2, L8C3); exclua círculo de L8C5.
19. linha 8 já tem dois círculo (L8C2, L8C3); exclua círculo de L8C7.
20. linha 8 já tem dois círculo (L8C2, L8C3); exclua círculo de L8C8.
21. linha 8 já tem dois triângulo (L8C1, L8C4); exclua triângulo de L8C5.
22. linha 8 já tem dois triângulo (L8C1, L8C4); exclua triângulo de L8C7.
23. linha 8 já tem dois triângulo (L8C1, L8C4); exclua triângulo de L8C8.
24. coluna 1 já tem dois círculo (L5C1, L6C1); exclua círculo de L7C1.
25. Na coluna 1, triângulo só cabe em L7C1 e L8C1; ambas as casas precisam dele.
26. Na coluna 2, círculo só cabe em L2C2 e L8C2; ambas as casas precisam dele.
27. coluna 3 já tem dois círculo (L2C3, L8C3); exclua círculo de L7C3.
28. coluna 3 já tem dois triângulo (L4C3, L6C3); exclua triângulo de L5C3.
29. coluna 3 já tem dois triângulo (L4C3, L6C3); exclua triângulo de L7C3.
30. coluna 3 já tem dois quadrado (L1C3, L7C3); exclua quadrado de L5C3.
31. coluna 4 já tem dois círculo (L3C4, L4C4); exclua círculo de L2C4.
32. coluna 4 já tem dois quadrado (L5C4, L6C4); exclua quadrado de L2C4.
33. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L8C5.
34. coluna 6 já tem dois losango (L4C6, L6C6); exclua losango de L2C6.
35. coluna 6 já tem dois losango (L4C6, L6C6); exclua losango de L5C6.
36. Na coluna 7, círculo só cabe em L1C7 e L7C7; ambas as casas precisam dele.
37. Na coluna 7, quadrado só cabe em L2C7 e L8C7; ambas as casas precisam dele.
38. coluna 8 já tem dois triângulo (L1C8, L2C8); exclua triângulo de L5C8.
39. A dupla L1C6–L1C7 já está fechada; L2C6 não pode tocar essa dupla com outro círculo.
40. L5C6 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
41. L5C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
42. L7C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
43. L7C7 precisa de um parceiro círculo; só L7C6 pode recebê-lo (horizontal).
44. L7C8 precisa de um parceiro losango; só L8C8 pode recebê-lo (vertical).

## 6. Básico — pacto-v2-006

**Descoberta:** Parceiro ortogonal obrigatório.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento.

**Origem:** pacto-016; recomposição de pistas; 9 pistas alteradas. **Pistas:** 43; 21 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 4; 55 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C2: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 2.
- L1C3: triângulo — cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 2.
- L1C4: círculo — cota saturada; posições restantes; primeira participação no passo 1.
- L1C5: círculo — cota saturada; posições restantes; primeira participação no passo 1.
- L1C6: losango — posições restantes; primeira participação no passo 3.
- L1C7: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 3.
- L1C8: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 3.
- L2C2: círculo — parceiro obrigatório / orientação; primeira participação no passo 50.
- L2C4: triângulo — posições restantes; primeira participação no passo 32.
- L2C6: losango — posições restantes; primeira participação no passo 40.
- L2C7: quadrado — posições restantes; primeira participação no passo 41.
- L3C2: triângulo — parceiro obrigatório / orientação; primeira participação no passo 50.
- L3C5: quadrado — posições restantes; cota saturada; primeira participação no passo 36.
- L3C6: círculo — cota saturada; posições restantes; primeira participação no passo 4.
- L3C7: losango — posições restantes; primeira participação no passo 41.
- L3C8: círculo — cota saturada; primeira participação no passo 4.
- L4C1: losango — prevenção de isolamento; primeira participação no passo 52.
- L4C2: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 10.
- L4C3: quadrado — cota saturada; primeira participação no passo 10.
- L4C6: círculo — cota saturada; posições restantes; primeira participação no passo 7.
- L4C8: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 7.
- L5C2: losango — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 16.
- L5C3: losango — cota saturada; primeira participação no passo 16.
- L5C4: quadrado — posições restantes; primeira participação no passo 32.
- L5C6: triângulo — cota saturada; posições restantes; primeira participação no passo 13.
- L5C8: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 13.
- L6C1: círculo — prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 52.
- L6C2: quadrado — parceiro obrigatório / orientação; primeira participação no passo 54.
- L6C4: losango — cota saturada; posições restantes; primeira participação no passo 19.
- L6C5: losango — cota saturada; posições restantes; primeira participação no passo 19.
- L7C1: triângulo — posições restantes; cota saturada; primeira participação no passo 23.
- L7C2: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 23.
- L7C3: losango — posições restantes; cota saturada; primeira participação no passo 23.
- L7C5: círculo — posições restantes; cota saturada; primeira participação no passo 23.
- L7C6: quadrado — posições restantes; primeira participação no passo 23.
- L7C7: triângulo — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 23.
- L7C8: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 23.
- L8C1: triângulo — cota saturada; primeira participação no passo 26.
- L8C2: círculo — cota saturada; primeira participação no passo 24.
- L8C3: círculo — cota saturada; primeira participação no passo 24.
- L8C4: losango — posições restantes; cota saturada; primeira participação no passo 32.
- L8C6: quadrado — posições restantes; primeira participação no passo 40.
- L8C7: triângulo — cota saturada; posições restantes; primeira participação no passo 26.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C4, L1C5); exclua círculo de L1C1.
2. linha 1 já tem dois triângulo (L1C2, L1C3); exclua triângulo de L1C1.
3. Na linha 1, quadrado só cabe em L1C1 e L1C7; ambas as casas precisam dele.
4. linha 3 já tem dois círculo (L3C6, L3C8); exclua círculo de L3C1.
5. linha 3 já tem dois círculo (L3C6, L3C8); exclua círculo de L3C3.
6. linha 3 já tem dois círculo (L3C6, L3C8); exclua círculo de L3C4.
7. linha 4 já tem dois círculo (L4C6, L4C8); exclua círculo de L4C4.
8. linha 4 já tem dois círculo (L4C6, L4C8); exclua círculo de L4C5.
9. linha 4 já tem dois círculo (L4C6, L4C8); exclua círculo de L4C7.
10. linha 4 já tem dois quadrado (L4C2, L4C3); exclua quadrado de L4C4.
11. linha 4 já tem dois quadrado (L4C2, L4C3); exclua quadrado de L4C5.
12. linha 4 já tem dois quadrado (L4C2, L4C3); exclua quadrado de L4C7.
13. linha 5 já tem dois triângulo (L5C6, L5C8); exclua triângulo de L5C1.
14. linha 5 já tem dois triângulo (L5C6, L5C8); exclua triângulo de L5C5.
15. linha 5 já tem dois triângulo (L5C6, L5C8); exclua triângulo de L5C7.
16. linha 5 já tem dois losango (L5C2, L5C3); exclua losango de L5C1.
17. linha 5 já tem dois losango (L5C2, L5C3); exclua losango de L5C5.
18. linha 5 já tem dois losango (L5C2, L5C3); exclua losango de L5C7.
19. linha 6 já tem dois losango (L6C4, L6C5); exclua losango de L6C3.
20. linha 6 já tem dois losango (L6C4, L6C5); exclua losango de L6C6.
21. linha 6 já tem dois losango (L6C4, L6C5); exclua losango de L6C7.
22. linha 6 já tem dois losango (L6C4, L6C5); exclua losango de L6C8.
23. Na linha 7, círculo só cabe em L7C4 e L7C5; ambas as casas precisam dele.
24. linha 8 já tem dois círculo (L8C2, L8C3); exclua círculo de L8C5.
25. linha 8 já tem dois círculo (L8C2, L8C3); exclua círculo de L8C8.
26. linha 8 já tem dois triângulo (L8C1, L8C7); exclua triângulo de L8C5.
27. linha 8 já tem dois triângulo (L8C1, L8C7); exclua triângulo de L8C8.
28. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L2C1.
29. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L3C1.
30. coluna 3 já tem dois losango (L5C3, L7C3); exclua losango de L2C3.
31. coluna 3 já tem dois losango (L5C3, L7C3); exclua losango de L3C3.
32. Na coluna 4, quadrado só cabe em L3C4 e L5C4; ambas as casas precisam dele.
33. coluna 4 já tem dois losango (L6C4, L8C4); exclua losango de L4C4.
34. coluna 5 já tem dois círculo (L1C5, L7C5); exclua círculo de L2C5.
35. coluna 5 já tem dois círculo (L1C5, L7C5); exclua círculo de L5C5.
36. Na coluna 5, triângulo só cabe em L2C5 e L4C5; ambas as casas precisam dele.
37. Na coluna 5, triângulo só cabe em L2C5 e L4C5; ambas as casas precisam dele.
38. coluna 5 já tem dois quadrado (L3C5, L5C5); exclua quadrado de L8C5.
39. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L6C6.
40. Na coluna 6, triângulo só cabe em L5C6 e L6C6; ambas as casas precisam dele.
41. Na coluna 7, círculo só cabe em L5C7 e L6C7; ambas as casas precisam dele.
42. Na coluna 7, círculo só cabe em L5C7 e L6C7; ambas as casas precisam dele.
43. coluna 7 já tem dois triângulo (L7C7, L8C7); exclua triângulo de L4C7.
44. coluna 8 já tem dois círculo (L3C8, L4C8); exclua círculo de L2C8.
45. coluna 8 já tem dois círculo (L3C8, L4C8); exclua círculo de L6C8.
46. L1C1 precisa de um parceiro quadrado; só L2C1 pode recebê-lo (vertical).
47. A dupla L1C3–L1C2 já está fechada; L2C3 não pode tocar essa dupla com outro triângulo.
48. L1C8 precisa de um parceiro losango; só L2C8 pode recebê-lo (vertical).
49. A dupla L2C1–L1C1 já está fechada; L3C1 não pode tocar essa dupla com outro quadrado.
50. L2C2 precisa de um parceiro círculo; só L2C3 pode recebê-lo (horizontal).
51. L3C2 precisa de um parceiro triângulo; só L3C3 pode recebê-lo (horizontal).
52. L5C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
53. L5C8 precisa de um parceiro triângulo; só L6C8 pode recebê-lo (vertical).
54. L6C2 precisa de um parceiro quadrado; só L6C3 pode recebê-lo (horizontal).
55. L7C8 precisa de um parceiro quadrado; só L8C8 pode recebê-lo (vertical).

## 7. Básico — pacto-v2-007

**Descoberta:** Parceiro ortogonal obrigatório.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento.

**Origem:** pacto-019; recomposição de pistas; 9 pistas alteradas. **Pistas:** 43; 21 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 5; 62 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: quadrado — cota saturada; posições restantes; primeira participação no passo 3.
- L1C2: quadrado — cota saturada; primeira participação no passo 3.
- L1C4: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L1C5: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C6: círculo — cota saturada; primeira participação no passo 1.
- L1C7: triângulo — cota saturada; primeira participação no passo 2.
- L1C8: triângulo — cota saturada; posições restantes; primeira participação no passo 2.
- L2C1: círculo — cota saturada; posições restantes; primeira participação no passo 4.
- L2C3: triângulo — cota saturada; primeira participação no passo 7.
- L2C4: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 7.
- L2C5: quadrado — cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 46.
- L2C8: círculo — cota saturada; posições restantes; primeira participação no passo 4.
- L3C2: losango — cota saturada; primeira participação no passo 10.
- L3C5: triângulo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 47.
- L3C7: losango — cota saturada; primeira participação no passo 10.
- L3C8: círculo — posições restantes; primeira participação no passo 53.
- L4C1: quadrado — cota saturada; posições restantes; primeira participação no passo 16.
- L4C2: quadrado — cota saturada; primeira participação no passo 16.
- L4C3: círculo — cota saturada; prevenção de isolamento; primeira participação no passo 14.
- L4C4: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 14.
- L4C6: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L4C7: triângulo — cota saturada; primeira participação no passo 15.
- L4C8: triângulo — cota saturada; posições restantes; primeira participação no passo 15.
- L5C1: triângulo — posições restantes; primeira participação no passo 31.
- L5C4: losango — prevenção de isolamento; primeira participação no passo 57.
- L5C5: círculo — cota saturada; posições restantes; primeira participação no passo 17.
- L5C6: círculo — cota saturada; primeira participação no passo 17.
- L5C7: quadrado — cota saturada; primeira participação no passo 51.
- L6C1: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 22.
- L6C2: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 20.
- L6C3: triângulo — cota saturada; posições restantes; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 21.
- L6C4: triângulo — cota saturada; posições restantes; primeira participação no passo 21.
- L6C5: quadrado — posições restantes; cota saturada; exclusão junto à dupla; primeira participação no passo 22.
- L6C7: círculo — cota saturada; posições restantes; primeira participação no passo 20.
- L6C8: losango — posições restantes; primeira participação no passo 22.
- L7C1: losango — cota saturada; posições restantes; primeira participação no passo 23.
- L7C3: quadrado — prevenção de isolamento; primeira participação no passo 62.
- L7C7: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C8: losango — cota saturada; posições restantes; primeira participação no passo 23.
- L8C1: triângulo — posições restantes; primeira participação no passo 31.
- L8C4: círculo — cota saturada; prevenção de isolamento; primeira participação no passo 40.
- L8C7: quadrado — cota saturada; primeira participação no passo 27.
- L8C8: quadrado — cota saturada; posições restantes; primeira participação no passo 27.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C5, L1C6); exclua círculo de L1C3.
2. linha 1 já tem dois triângulo (L1C7, L1C8); exclua triângulo de L1C3.
3. linha 1 já tem dois quadrado (L1C1, L1C2); exclua quadrado de L1C3.
4. linha 2 já tem dois círculo (L2C1, L2C8); exclua círculo de L2C2.
5. linha 2 já tem dois círculo (L2C1, L2C8); exclua círculo de L2C6.
6. linha 2 já tem dois círculo (L2C1, L2C8); exclua círculo de L2C7.
7. linha 2 já tem dois triângulo (L2C3, L2C4); exclua triângulo de L2C2.
8. linha 2 já tem dois triângulo (L2C3, L2C4); exclua triângulo de L2C6.
9. linha 2 já tem dois triângulo (L2C3, L2C4); exclua triângulo de L2C7.
10. linha 3 já tem dois losango (L3C2, L3C7); exclua losango de L3C1.
11. linha 3 já tem dois losango (L3C2, L3C7); exclua losango de L3C3.
12. linha 3 já tem dois losango (L3C2, L3C7); exclua losango de L3C4.
13. linha 3 já tem dois losango (L3C2, L3C7); exclua losango de L3C6.
14. linha 4 já tem dois círculo (L4C3, L4C4); exclua círculo de L4C5.
15. linha 4 já tem dois triângulo (L4C7, L4C8); exclua triângulo de L4C5.
16. linha 4 já tem dois quadrado (L4C1, L4C2); exclua quadrado de L4C5.
17. linha 5 já tem dois círculo (L5C5, L5C6); exclua círculo de L5C2.
18. linha 5 já tem dois círculo (L5C5, L5C6); exclua círculo de L5C3.
19. linha 5 já tem dois círculo (L5C5, L5C6); exclua círculo de L5C8.
20. linha 6 já tem dois círculo (L6C2, L6C7); exclua círculo de L6C6.
21. linha 6 já tem dois triângulo (L6C3, L6C4); exclua triângulo de L6C6.
22. Na linha 6, quadrado só cabe em L6C5 e L6C6; ambas as casas precisam dele.
23. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C2.
24. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C4.
25. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C5.
26. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C6.
27. linha 8 já tem dois quadrado (L8C7, L8C8); exclua quadrado de L8C2.
28. linha 8 já tem dois quadrado (L8C7, L8C8); exclua quadrado de L8C3.
29. linha 8 já tem dois quadrado (L8C7, L8C8); exclua quadrado de L8C5.
30. linha 8 já tem dois quadrado (L8C7, L8C8); exclua quadrado de L8C6.
31. Na coluna 1, círculo só cabe em L2C1 e L3C1; ambas as casas precisam dele.
32. coluna 2 já tem dois quadrado (L1C2, L4C2); exclua quadrado de L2C2.
33. coluna 2 já tem dois quadrado (L1C2, L4C2); exclua quadrado de L5C2.
34. coluna 2 já tem dois quadrado (L1C2, L4C2); exclua quadrado de L7C2.
35. coluna 2 já tem dois losango (L2C2, L3C2); exclua losango de L5C2.
36. coluna 2 já tem dois losango (L2C2, L3C2); exclua losango de L8C2.
37. coluna 3 já tem dois triângulo (L2C3, L6C3); exclua triângulo de L3C3.
38. coluna 3 já tem dois triângulo (L2C3, L6C3); exclua triângulo de L5C3.
39. coluna 3 já tem dois triângulo (L2C3, L6C3); exclua triângulo de L8C3.
40. coluna 4 já tem dois círculo (L4C4, L8C4); exclua círculo de L3C4.
41. coluna 4 já tem dois círculo (L4C4, L8C4); exclua círculo de L7C4.
42. coluna 4 já tem dois triângulo (L2C4, L6C4); exclua triângulo de L3C4.
43. coluna 4 já tem dois triângulo (L2C4, L6C4); exclua triângulo de L7C4.
44. coluna 5 já tem dois círculo (L1C5, L5C5); exclua círculo de L7C5.
45. coluna 5 já tem dois círculo (L1C5, L5C5); exclua círculo de L8C5.
46. coluna 5 já tem dois quadrado (L2C5, L6C5); exclua quadrado de L7C5.
47. Na coluna 5, losango só cabe em L4C5 e L8C5; ambas as casas precisam dele.
48. coluna 6 já tem dois círculo (L1C6, L5C6); exclua círculo de L3C6.
49. coluna 6 já tem dois círculo (L1C6, L5C6); exclua círculo de L7C6.
50. coluna 6 já tem dois círculo (L1C6, L5C6); exclua círculo de L8C6.
51. coluna 7 já tem dois quadrado (L5C7, L8C7); exclua quadrado de L2C7.
52. coluna 8 já tem dois triângulo (L1C8, L4C8); exclua triângulo de L5C8.
53. Na coluna 8, quadrado só cabe em L5C8 e L8C8; ambas as casas precisam dele.
54. L2C5 precisa de um parceiro quadrado; só L2C6 pode recebê-lo (horizontal).
55. A dupla L2C6–L2C5 já está fechada; L3C6 não pode tocar essa dupla com outro quadrado.
56. L3C4 precisa de um parceiro quadrado; só L3C3 pode recebê-lo (horizontal).
57. L5C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
58. L6C2 precisa de um parceiro círculo; só L7C2 pode recebê-lo (vertical).
59. A dupla L6C6–L6C5 já está fechada; L7C6 não pode tocar essa dupla com outro quadrado.
60. A dupla L7C2–L6C2 já está fechada; L8C2 não pode tocar essa dupla com outro círculo.
61. A dupla L7C6–L7C5 já está fechada; L8C6 não pode tocar essa dupla com outro triângulo.
62. L8C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.

## 8. Básico — pacto-v2-008

**Descoberta:** Parceiro ortogonal obrigatório.

**Técnicas combinadas:** cota saturada; posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação; prevenção de isolamento.

**Origem:** pacto-022; recomposição de pistas; 9 pistas alteradas. **Pistas:** 43; 21 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 5; 58 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: círculo — cota saturada; exclusão junto à dupla; primeira participação no passo 1.
- L1C3: losango — exclusão junto à dupla; primeira participação no passo 39.
- L1C4: triângulo — cota saturada; prevenção de isolamento; primeira participação no passo 3.
- L1C5: triângulo — cota saturada; primeira participação no passo 3.
- L1C7: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C8: quadrado — parceiro obrigatório / orientação; primeira participação no passo 41.
- L2C1: círculo — exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 43.
- L2C5: losango — prevenção de isolamento; primeira participação no passo 45.
- L2C6: quadrado — posições restantes; primeira participação no passo 32.
- L3C1: quadrado — cota saturada; primeira participação no passo 7.
- L3C2: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 5.
- L3C3: círculo — cota saturada; primeira participação no passo 5.
- L3C4: triângulo — cota saturada; prevenção de isolamento; primeira participação no passo 6.
- L3C5: triângulo — cota saturada; primeira participação no passo 6.
- L3C6: losango — posições restantes; primeira participação no passo 32.
- L3C7: quadrado — cota saturada; primeira participação no passo 7.
- L4C1: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 10.
- L4C2: triângulo — parceiro obrigatório / orientação; primeira participação no passo 46.
- L4C4: círculo — cota saturada; primeira participação no passo 8.
- L4C5: círculo — cota saturada; primeira participação no passo 8.
- L4C7: quadrado — cota saturada; prevenção de isolamento; primeira participação no passo 10.
- L4C8: losango — cota saturada; primeira participação no passo 37.
- L5C1: losango — exclusão junto à dupla; primeira participação no passo 47.
- L5C3: círculo — cota saturada; primeira participação no passo 25.
- L5C4: quadrado — cota saturada; primeira participação no passo 14.
- L5C5: quadrado — cota saturada; primeira participação no passo 14.
- L5C6: triângulo — cota saturada; posições restantes; prevenção de isolamento; primeira participação no passo 12.
- L5C8: triângulo — cota saturada; prevenção de isolamento; primeira participação no passo 12.
- L6C1: losango — posições restantes; exclusão junto à dupla; primeira participação no passo 16.
- L6C2: quadrado — posições restantes; cota saturada; exclusão junto à dupla; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 16.
- L6C3: quadrado — posições restantes; exclusão junto à dupla; primeira participação no passo 16.
- L6C6: triângulo — posições restantes; cota saturada; primeira participação no passo 16.
- L6C7: losango — posições restantes; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 16.
- L6C8: triângulo — posições restantes; cota saturada; prevenção de isolamento; primeira participação no passo 16.
- L7C1: triângulo — exclusão junto à dupla; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 51.
- L7C5: quadrado — exclusão junto à dupla; primeira participação no passo 56.
- L7C6: círculo — posições restantes; exclusão junto à dupla; primeira participação no passo 32.
- L8C1: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 20.
- L8C2: quadrado — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 22.
- L8C5: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L8C6: círculo — cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 18.
- L8C7: triângulo — cota saturada; primeira participação no passo 20.
- L8C8: círculo — cota saturada; prevenção de isolamento; primeira participação no passo 18.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C1, L1C7); exclua círculo de L1C2.
2. linha 1 já tem dois círculo (L1C1, L1C7); exclua círculo de L1C6.
3. linha 1 já tem dois triângulo (L1C4, L1C5); exclua triângulo de L1C2.
4. linha 1 já tem dois triângulo (L1C4, L1C5); exclua triângulo de L1C6.
5. linha 3 já tem dois círculo (L3C2, L3C3); exclua círculo de L3C8.
6. linha 3 já tem dois triângulo (L3C4, L3C5); exclua triângulo de L3C8.
7. linha 3 já tem dois quadrado (L3C1, L3C7); exclua quadrado de L3C8.
8. linha 4 já tem dois círculo (L4C4, L4C5); exclua círculo de L4C3.
9. linha 4 já tem dois círculo (L4C4, L4C5); exclua círculo de L4C6.
10. linha 4 já tem dois quadrado (L4C1, L4C7); exclua quadrado de L4C3.
11. linha 4 já tem dois quadrado (L4C1, L4C7); exclua quadrado de L4C6.
12. linha 5 já tem dois triângulo (L5C6, L5C8); exclua triângulo de L5C2.
13. linha 5 já tem dois triângulo (L5C6, L5C8); exclua triângulo de L5C7.
14. linha 5 já tem dois quadrado (L5C4, L5C5); exclua quadrado de L5C2.
15. linha 5 já tem dois quadrado (L5C4, L5C5); exclua quadrado de L5C7.
16. Na linha 6, círculo só cabe em L6C4 e L6C5; ambas as casas precisam dele.
17. Na linha 6, círculo só cabe em L6C4 e L6C5; ambas as casas precisam dele.
18. linha 8 já tem dois círculo (L8C6, L8C8); exclua círculo de L8C3.
19. linha 8 já tem dois círculo (L8C6, L8C8); exclua círculo de L8C4.
20. linha 8 já tem dois triângulo (L8C1, L8C7); exclua triângulo de L8C3.
21. linha 8 já tem dois triângulo (L8C1, L8C7); exclua triângulo de L8C4.
22. coluna 2 já tem dois quadrado (L6C2, L8C2); exclua quadrado de L1C2.
23. coluna 2 já tem dois quadrado (L6C2, L8C2); exclua quadrado de L2C2.
24. coluna 2 já tem dois quadrado (L6C2, L8C2); exclua quadrado de L7C2.
25. coluna 3 já tem dois círculo (L3C3, L5C3); exclua círculo de L2C3.
26. coluna 3 já tem dois círculo (L3C3, L5C3); exclua círculo de L7C3.
27. coluna 4 já tem dois círculo (L4C4, L6C4); exclua círculo de L2C4.
28. coluna 4 já tem dois círculo (L4C4, L6C4); exclua círculo de L7C4.
29. coluna 4 já tem dois triângulo (L1C4, L3C4); exclua triângulo de L2C4.
30. coluna 4 já tem dois triângulo (L1C4, L3C4); exclua triângulo de L7C4.
31. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L4C6.
32. Na coluna 6, quadrado só cabe em L1C6 e L2C6; ambas as casas precisam dele.
33. coluna 7 já tem dois quadrado (L3C7, L4C7); exclua quadrado de L2C7.
34. coluna 7 já tem dois quadrado (L3C7, L4C7); exclua quadrado de L7C7.
35. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L2C8.
36. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L7C8.
37. coluna 8 já tem dois losango (L3C8, L4C8); exclua losango de L2C8.
38. coluna 8 já tem dois losango (L3C8, L4C8); exclua losango de L7C8.
39. A dupla L1C2–L1C3 já está fechada; L2C2 não pode tocar essa dupla com outro losango.
40. A dupla L1C3–L1C2 já está fechada; L2C3 não pode tocar essa dupla com outro losango.
41. L1C7 precisa de um parceiro círculo; só L2C7 pode recebê-lo (vertical).
42. L1C8 precisa de um parceiro quadrado; só L2C8 pode recebê-lo (vertical).
43. A dupla L2C1–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro círculo.
44. L2C2 precisa de um parceiro triângulo; só L2C3 pode recebê-lo (horizontal).
45. L2C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
46. L4C2 precisa de um parceiro triângulo; só L4C3 pode recebê-lo (horizontal).
47. A dupla L5C1–L6C1 já está fechada; L5C2 não pode tocar essa dupla com outro losango.
48. L5C7 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
49. A dupla L6C3–L6C2 já está fechada; L7C3 não pode tocar essa dupla com outro quadrado.
50. A dupla L6C7–L5C7 já está fechada; L7C7 não pode tocar essa dupla com outro losango.
51. A dupla L7C1–L8C1 já está fechada; L7C2 não pode tocar essa dupla com outro triângulo.
52. L7C2 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
53. L7C2 precisa de um parceiro losango; só L7C3 pode recebê-lo (horizontal).
54. A dupla L7C3–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro losango.
55. A dupla L7C3–L7C2 já está fechada; L7C4 não pode tocar essa dupla com outro losango.
56. A dupla L7C4–L7C5 já está fechada; L8C4 não pode tocar essa dupla com outro quadrado.
57. A dupla L7C6–L8C6 já está fechada; L7C7 não pode tocar essa dupla com outro círculo.
58. L7C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.

## 9. Básico — pacto-v2-009

**Descoberta:** Parceiro ortogonal obrigatório.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento.

**Origem:** pacto-025; recomposição de pistas; 9 pistas alteradas. **Pistas:** 43; 21 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 5; 58 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C2: círculo — cota saturada; posições restantes; primeira participação no passo 1.
- L1C4: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 3.
- L1C6: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 3.
- L1C7: losango — posições restantes; primeira participação no passo 3.
- L1C8: losango — posições restantes; cota saturada; primeira participação no passo 3.
- L2C1: losango — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 31.
- L2C3: triângulo — posições restantes; primeira participação no passo 34.
- L2C4: quadrado — cota saturada; primeira participação no passo 7.
- L2C6: quadrado — cota saturada; posições restantes; primeira participação no passo 7.
- L2C7: círculo — cota saturada; posições restantes; primeira participação no passo 5.
- L2C8: círculo — cota saturada; primeira participação no passo 5.
- L3C2: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 33.
- L3C3: círculo — cota saturada; posições restantes; primeira participação no passo 9.
- L3C4: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 11.
- L3C5: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 9.
- L3C6: losango — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 11.
- L3C7: triângulo — cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 38.
- L4C1: triângulo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 31.
- L4C2: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 13.
- L4C4: losango — cota saturada; primeira participação no passo 16.
- L4C6: losango — cota saturada; posições restantes; primeira participação no passo 16.
- L4C8: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 13.
- L5C1: quadrado — posições restantes; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 31.
- L5C3: losango — posições restantes; exclusão junto à dupla; primeira participação no passo 34.
- L5C4: círculo — cota saturada; primeira participação no passo 19.
- L5C6: círculo — cota saturada; posições restantes; primeira participação no passo 19.
- L6C2: triângulo — cota saturada; primeira participação no passo 58.
- L6C3: losango — posições restantes; exclusão junto à dupla; primeira participação no passo 34.
- L6C4: círculo — cota saturada; primeira participação no passo 23.
- L6C6: círculo — cota saturada; posições restantes; primeira participação no passo 23.
- L7C2: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C3: quadrado — posições restantes; primeira participação no passo 34.
- L7C4: triângulo — exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 53.
- L7C7: losango — cota saturada; posições restantes; primeira participação no passo 27.
- L7C8: losango — cota saturada; primeira participação no passo 27.
- L8C1: losango — posições restantes; cota saturada; primeira participação no passo 30.
- L8C2: losango — posições restantes; primeira participação no passo 30.
- L8C3: quadrado — posições restantes; primeira participação no passo 30.
- L8C4: triângulo — posições restantes; exclusão junto à dupla; primeira participação no passo 30.
- L8C5: quadrado — posições restantes; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 30.
- L8C6: triângulo — posições restantes; primeira participação no passo 30.
- L8C7: círculo — posições restantes; cota saturada; primeira participação no passo 30.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C3.
2. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C5.
3. Na linha 1, triângulo só cabe em L1C3 e L1C5; ambas as casas precisam dele.
4. Na linha 1, triângulo só cabe em L1C3 e L1C5; ambas as casas precisam dele.
5. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C2.
6. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C5.
7. linha 2 já tem dois quadrado (L2C4, L2C6); exclua quadrado de L2C2.
8. linha 2 já tem dois quadrado (L2C4, L2C6); exclua quadrado de L2C5.
9. linha 3 já tem dois círculo (L3C3, L3C5); exclua círculo de L3C1.
10. linha 3 já tem dois círculo (L3C3, L3C5); exclua círculo de L3C8.
11. linha 3 já tem dois losango (L3C4, L3C6); exclua losango de L3C1.
12. linha 3 já tem dois losango (L3C4, L3C6); exclua losango de L3C8.
13. linha 4 já tem dois quadrado (L4C2, L4C8); exclua quadrado de L4C3.
14. linha 4 já tem dois quadrado (L4C2, L4C8); exclua quadrado de L4C5.
15. linha 4 já tem dois quadrado (L4C2, L4C8); exclua quadrado de L4C7.
16. linha 4 já tem dois losango (L4C4, L4C6); exclua losango de L4C3.
17. linha 4 já tem dois losango (L4C4, L4C6); exclua losango de L4C5.
18. linha 4 já tem dois losango (L4C4, L4C6); exclua losango de L4C7.
19. linha 5 já tem dois círculo (L5C4, L5C6); exclua círculo de L5C2.
20. linha 5 já tem dois círculo (L5C4, L5C6); exclua círculo de L5C5.
21. linha 5 já tem dois círculo (L5C4, L5C6); exclua círculo de L5C7.
22. linha 5 já tem dois círculo (L5C4, L5C6); exclua círculo de L5C8.
23. linha 6 já tem dois círculo (L6C4, L6C6); exclua círculo de L6C1.
24. linha 6 já tem dois círculo (L6C4, L6C6); exclua círculo de L6C5.
25. linha 6 já tem dois círculo (L6C4, L6C6); exclua círculo de L6C7.
26. linha 6 já tem dois círculo (L6C4, L6C6); exclua círculo de L6C8.
27. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C1.
28. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C5.
29. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C6.
30. Na linha 8, círculo só cabe em L8C7 e L8C8; ambas as casas precisam dele.
31. Na coluna 1, círculo só cabe em L1C1 e L7C1; ambas as casas precisam dele.
32. coluna 1 já tem dois losango (L2C1, L8C1); exclua losango de L6C1.
33. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L5C2.
34. Na coluna 3, círculo só cabe em L3C3 e L4C3; ambas as casas precisam dele.
35. coluna 6 já tem dois círculo (L5C6, L6C6); exclua círculo de L7C6.
36. Na coluna 6, triângulo só cabe em L7C6 e L8C6; ambas as casas precisam dele.
37. coluna 7 já tem dois círculo (L2C7, L8C7); exclua círculo de L4C7.
38. coluna 7 já tem dois triângulo (L3C7, L4C7); exclua triângulo de L5C7.
39. coluna 7 já tem dois triângulo (L3C7, L4C7); exclua triângulo de L6C7.
40. Na coluna 7, quadrado só cabe em L5C7 e L6C7; ambas as casas precisam dele.
41. Na coluna 7, quadrado só cabe em L5C7 e L6C7; ambas as casas precisam dele.
42. coluna 8 já tem dois losango (L1C8, L7C8); exclua losango de L5C8.
43. coluna 8 já tem dois losango (L1C8, L7C8); exclua losango de L6C8.
44. L1C5 precisa de um parceiro triângulo; só L2C5 pode recebê-lo (vertical).
45. L2C1 precisa de um parceiro losango; só L2C2 pode recebê-lo (horizontal).
46. A dupla L3C2–L4C2 já está fechada; L3C1 não pode tocar essa dupla com outro quadrado.
47. L3C5 precisa de um parceiro círculo; só L4C5 pode recebê-lo (vertical).
48. A dupla L3C7–L4C7 já está fechada; L3C8 não pode tocar essa dupla com outro triângulo.
49. A dupla L4C8–L3C8 já está fechada; L5C8 não pode tocar essa dupla com outro quadrado.
50. L5C1 precisa de um parceiro quadrado; só L6C1 pode recebê-lo (vertical).
51. A dupla L5C3–L6C3 já está fechada; L5C2 não pode tocar essa dupla com outro losango.
52. L5C8 precisa de um parceiro triângulo; só L6C8 pode recebê-lo (vertical).
53. A dupla L7C4–L8C4 já está fechada; L7C5 não pode tocar essa dupla com outro triângulo.
54. L7C5 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
55. A dupla L7C5–L8C5 já está fechada; L6C5 não pode tocar essa dupla com outro quadrado.
56. linha 5 já tem dois triângulo (L5C2, L5C8); exclua triângulo de L5C5.
57. linha 5 já tem dois quadrado (L5C1, L5C7); exclua quadrado de L5C5.
58. linha 6 já tem dois triângulo (L6C2, L6C8); exclua triângulo de L6C5.

## 10. Básico — pacto-v2-010

**Descoberta:** Parceiro ortogonal obrigatório.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento.

**Origem:** pacto-028; recomposição de pistas; 9 pistas alteradas. **Pistas:** 43; 21 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 6; 48 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C2: círculo — cota saturada; posições restantes; primeira participação no passo 1.
- L1C3: triângulo — posições restantes; cota saturada; primeira participação no passo 2.
- L1C4: quadrado — posições restantes; primeira participação no passo 2.
- L1C5: quadrado — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 2.
- L1C7: losango — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 2.
- L1C8: losango — posições restantes; primeira participação no passo 2.
- L2C1: quadrado — parceiro obrigatório / orientação; primeira participação no passo 41.
- L2C3: triângulo — cota saturada; posições restantes; primeira participação no passo 24.
- L2C4: losango — posições restantes; cota saturada; primeira participação no passo 30.
- L2C7: círculo — cota saturada; posições restantes; primeira participação no passo 3.
- L2C8: círculo — cota saturada; posições restantes; primeira participação no passo 3.
- L3C1: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 6.
- L3C2: círculo — cota saturada; posições restantes; primeira participação no passo 6.
- L3C4: triângulo — cota saturada; posições restantes; primeira participação no passo 7.
- L3C5: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 7.
- L3C6: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 8.
- L3C7: losango — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 8.
- L3C8: losango — posições restantes; primeira participação no passo 8.
- L4C1: losango — parceiro obrigatório / orientação; primeira participação no passo 43.
- L4C3: quadrado — cota saturada; posições restantes; primeira participação no passo 26.
- L4C4: círculo — posições restantes; primeira participação no passo 30.
- L5C1: triângulo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 9.
- L5C2: triângulo — posições restantes; primeira participação no passo 9.
- L5C4: losango — posições restantes; cota saturada; primeira participação no passo 9.
- L5C5: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 9.
- L5C6: círculo — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 9.
- L5C7: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 9.
- L5C8: quadrado — posições restantes; primeira participação no passo 9.
- L6C1: losango — cota saturada; exclusão junto à dupla; primeira participação no passo 10.
- L6C2: losango — cota saturada; exclusão junto à dupla; primeira participação no passo 10.
- L6C5: quadrado — posições restantes; cota saturada; primeira participação no passo 32.
- L6C8: triângulo — posições restantes; primeira participação no passo 39.
- L7C1: triângulo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C5: círculo — posições restantes; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 32.
- L7C7: quadrado — cota saturada; posições restantes; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 14.
- L7C8: quadrado — cota saturada; posições restantes; primeira participação no passo 14.
- L8C1: quadrado — cota saturada; primeira participação no passo 20.
- L8C2: quadrado — cota saturada; primeira participação no passo 20.
- L8C3: losango — posições restantes; primeira participação no passo 27.
- L8C4: triângulo — cota saturada; posições restantes; primeira participação no passo 18.
- L8C5: triângulo — cota saturada; posições restantes; primeira participação no passo 18.
- L8C8: círculo — cota saturada; posições restantes; primeira participação no passo 38.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C6.
2. Na linha 1, triângulo só cabe em L1C3 e L1C6; ambas as casas precisam dele.
3. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C2.
4. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C5.
5. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C6.
6. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C3.
7. linha 3 já tem dois triângulo (L3C4, L3C5); exclua triângulo de L3C3.
8. Na linha 3, quadrado só cabe em L3C3 e L3C6; ambas as casas precisam dele.
9. Na linha 5, círculo só cabe em L5C3 e L5C6; ambas as casas precisam dele.
10. linha 6 já tem dois losango (L6C1, L6C2); exclua losango de L6C3.
11. linha 6 já tem dois losango (L6C1, L6C2); exclua losango de L6C4.
12. linha 6 já tem dois losango (L6C1, L6C2); exclua losango de L6C6.
13. linha 6 já tem dois losango (L6C1, L6C2); exclua losango de L6C7.
14. linha 7 já tem dois quadrado (L7C7, L7C8); exclua quadrado de L7C2.
15. linha 7 já tem dois quadrado (L7C7, L7C8); exclua quadrado de L7C3.
16. linha 7 já tem dois quadrado (L7C7, L7C8); exclua quadrado de L7C4.
17. linha 7 já tem dois quadrado (L7C7, L7C8); exclua quadrado de L7C6.
18. linha 8 já tem dois triângulo (L8C4, L8C5); exclua triângulo de L8C6.
19. linha 8 já tem dois triângulo (L8C4, L8C5); exclua triângulo de L8C7.
20. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C6.
21. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C7.
22. coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L4C2.
23. coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L7C2.
24. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L6C3.
25. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L7C3.
26. coluna 3 já tem dois quadrado (L3C3, L4C3); exclua quadrado de L6C3.
27. Na coluna 3, losango só cabe em L7C3 e L8C3; ambas as casas precisam dele.
28. coluna 4 já tem dois triângulo (L3C4, L8C4); exclua triângulo de L6C4.
29. coluna 4 já tem dois triângulo (L3C4, L8C4); exclua triângulo de L7C4.
30. Na coluna 4, quadrado só cabe em L1C4 e L6C4; ambas as casas precisam dele.
31. coluna 4 já tem dois losango (L2C4, L5C4); exclua losango de L7C4.
32. Na coluna 5, círculo só cabe em L4C5 e L7C5; ambas as casas precisam dele.
33. coluna 5 já tem dois triângulo (L3C5, L8C5); exclua triângulo de L2C5.
34. coluna 5 já tem dois quadrado (L1C5, L6C5); exclua quadrado de L2C5.
35. Na coluna 7, triângulo só cabe em L4C7 e L6C7; ambas as casas precisam dele.
36. Na coluna 7, triângulo só cabe em L4C7 e L6C7; ambas as casas precisam dele.
37. coluna 7 já tem dois losango (L1C7, L3C7); exclua losango de L8C7.
38. coluna 8 já tem dois círculo (L2C8, L8C8); exclua círculo de L4C8.
39. Na coluna 8, triângulo só cabe em L4C8 e L6C8; ambas as casas precisam dele.
40. L1C6 precisa de um parceiro triângulo; só L2C6 pode recebê-lo (vertical).
41. L2C1 precisa de um parceiro quadrado; só L2C2 pode recebê-lo (horizontal).
42. L3C6 precisa de um parceiro quadrado; só L4C6 pode recebê-lo (vertical).
43. L4C1 precisa de um parceiro losango; só L4C2 pode recebê-lo (horizontal).
44. L5C6 precisa de um parceiro círculo; só L6C6 pode recebê-lo (vertical).
45. A dupla L6C2–L6C1 já está fechada; L7C2 não pode tocar essa dupla com outro losango.
46. A dupla L6C6–L5C6 já está fechada; L7C6 não pode tocar essa dupla com outro círculo.
47. L7C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
48. L7C6 precisa de um parceiro losango; só L8C6 pode recebê-lo (vertical).

## 11. Básico — pacto-v2-011

**Descoberta:** Dupla fechada impede o terceiro.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; prevenção de trio.

**Origem:** pacto-031; recomposição de pistas; 5 pistas alteradas. **Pistas:** 39; 25 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 6; 68 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: quadrado — cota saturada; posições restantes; primeira participação no passo 1.
- L1C2: quadrado — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C3: círculo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 40.
- L1C5: losango — cota saturada; posições restantes; primeira participação no passo 3.
- L1C6: losango — cota saturada; primeira participação no passo 3.
- L1C7: triângulo — posições restantes; primeira participação no passo 50.
- L2C2: triângulo — posições restantes; cota saturada; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 36.
- L2C4: losango — cota saturada; prevenção de isolamento; primeira participação no passo 41.
- L2C5: círculo — cota saturada; posições restantes; primeira participação no passo 5.
- L2C6: círculo — cota saturada; primeira participação no passo 5.
- L2C7: quadrado — posições restantes; primeira participação no passo 50.
- L3C1: quadrado — cota saturada; posições restantes; primeira participação no passo 8.
- L3C2: quadrado — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 8.
- L3C3: círculo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 40.
- L3C6: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 47.
- L3C8: triângulo — cota saturada; posições restantes; primeira participação no passo 52.
- L4C1: losango — cota saturada; posições restantes; primeira participação no passo 14.
- L4C2: losango — cota saturada; posições restantes; primeira participação no passo 14.
- L4C5: quadrado — cota saturada; posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 45.
- L4C7: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 11.
- L4C8: círculo — cota saturada; posições restantes; primeira participação no passo 11.
- L5C4: triângulo — exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 61.
- L5C5: quadrado — cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 45.
- L5C7: losango — cota saturada; posições restantes; primeira participação no passo 17.
- L5C8: losango — cota saturada; posições restantes; primeira participação no passo 17.
- L6C1: losango — posições restantes; exclusão junto à dupla; primeira participação no passo 33.
- L6C5: triângulo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 46.
- L6C7: círculo — cota saturada; posições restantes; primeira participação no passo 21.
- L6C8: círculo — cota saturada; posições restantes; primeira participação no passo 21.
- L7C3: triângulo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C6: quadrado — exclusão junto à dupla; primeira participação no passo 67.
- L7C7: losango — cota saturada; posições restantes; primeira participação no passo 25.
- L7C8: losango — cota saturada; posições restantes; primeira participação no passo 25.
- L8C1: triângulo — cota saturada; posições restantes; primeira participação no passo 29.
- L8C2: triângulo — cota saturada; posições restantes; primeira participação no passo 29.
- L8C3: losango — cota saturada; primeira participação no passo 31.
- L8C4: losango — cota saturada; primeira participação no passo 31.
- L8C5: círculo — cota saturada; posições restantes; primeira participação no passo 43.
- L8C8: quadrado — posições restantes; primeira participação no passo 53.

### Sequência lógica

1. linha 1 já tem dois quadrado (L1C1, L1C2); exclua quadrado de L1C4.
2. linha 1 já tem dois quadrado (L1C1, L1C2); exclua quadrado de L1C8.
3. linha 1 já tem dois losango (L1C5, L1C6); exclua losango de L1C4.
4. linha 1 já tem dois losango (L1C5, L1C6); exclua losango de L1C8.
5. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C1.
6. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C3.
7. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C8.
8. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C4.
9. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C5.
10. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C7.
11. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C3.
12. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C4.
13. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C6.
14. linha 4 já tem dois losango (L4C1, L4C2); exclua losango de L4C3.
15. linha 4 já tem dois losango (L4C1, L4C2); exclua losango de L4C4.
16. linha 4 já tem dois losango (L4C1, L4C2); exclua losango de L4C6.
17. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C1.
18. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C2.
19. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C3.
20. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C6.
21. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C2.
22. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C3.
23. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C4.
24. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C6.
25. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C1.
26. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C2.
27. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C4.
28. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C5.
29. linha 8 já tem dois triângulo (L8C1, L8C2); exclua triângulo de L8C6.
30. linha 8 já tem dois triângulo (L8C1, L8C2); exclua triângulo de L8C7.
31. linha 8 já tem dois losango (L8C3, L8C4); exclua losango de L8C6.
32. linha 8 já tem dois losango (L8C3, L8C4); exclua losango de L8C7.
33. Na coluna 1, círculo só cabe em L5C1 e L7C1; ambas as casas precisam dele.
34. Na coluna 1, círculo só cabe em L5C1 e L7C1; ambas as casas precisam dele.
35. Na coluna 1, triângulo só cabe em L2C1 e L8C1; ambas as casas precisam dele.
36. Na coluna 2, círculo só cabe em L5C2 e L7C2; ambas as casas precisam dele.
37. Na coluna 2, círculo só cabe em L5C2 e L7C2; ambas as casas precisam dele.
38. coluna 2 já tem dois triângulo (L2C2, L8C2); exclua triângulo de L6C2.
39. coluna 2 já tem dois quadrado (L1C2, L3C2); exclua quadrado de L6C2.
40. coluna 3 já tem dois círculo (L1C3, L3C3); exclua círculo de L5C3.
41. coluna 4 já tem dois losango (L2C4, L8C4); exclua losango de L3C4.
42. coluna 4 já tem dois losango (L2C4, L8C4); exclua losango de L6C4.
43. coluna 5 já tem dois círculo (L2C5, L8C5); exclua círculo de L3C5.
44. coluna 5 já tem dois círculo (L2C5, L8C5); exclua círculo de L7C5.
45. coluna 5 já tem dois quadrado (L4C5, L5C5); exclua quadrado de L7C5.
46. Na coluna 5, losango só cabe em L1C5 e L3C5; ambas as casas precisam dele.
47. coluna 6 já tem dois losango (L1C6, L3C6); exclua losango de L6C6.
48. coluna 7 já tem dois círculo (L4C7, L6C7); exclua círculo de L3C7.
49. coluna 7 já tem dois círculo (L4C7, L6C7); exclua círculo de L8C7.
50. Na coluna 7, triângulo só cabe em L1C7 e L3C7; ambas as casas precisam dele.
51. coluna 8 já tem dois círculo (L4C8, L6C8); exclua círculo de L1C8.
52. coluna 8 já tem dois triângulo (L1C8, L3C8); exclua triângulo de L2C8.
53. Na coluna 8, quadrado só cabe em L2C8 e L8C8; ambas as casas precisam dele.
54. L1C3 precisa de um parceiro círculo; só L1C4 pode recebê-lo (horizontal).
55. A dupla L2C2–L2C1 já está fechada; L2C3 não pode tocar essa dupla com outro triângulo.
56. L2C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
57. L3C3 precisa de um parceiro círculo; só L3C4 pode recebê-lo (horizontal).
58. A dupla L4C5–L5C5 já está fechada; L4C4 não pode tocar essa dupla com outro quadrado.
59. A dupla L4C5–L5C5 já está fechada; L4C6 não pode tocar essa dupla com outro quadrado.
60. L4C6 precisa de um parceiro triângulo; só L5C6 pode recebê-lo (vertical).
61. A dupla L5C4–L4C4 já está fechada; L6C4 não pode tocar essa dupla com outro triângulo.
62. A dupla L5C4–L4C4 já está fechada; L5C3 não pode tocar essa dupla com outro triângulo.
63. A dupla L5C6–L4C6 já está fechada; L6C6 não pode tocar essa dupla com outro triângulo.
64. A dupla L6C2–L6C1 já está fechada; L6C3 não pode tocar essa dupla com outro losango.
65. L6C3 não pode ser quadrado: tocaria L5C3 e L6C4, formando um grupo maior que dois.
66. L6C4 precisa de um parceiro quadrado; só L7C4 pode recebê-lo (vertical).
67. A dupla L7C6–L6C6 já está fechada; L8C6 não pode tocar essa dupla com outro quadrado.
68. linha 4 já tem dois triângulo (L4C4, L4C6); exclua triângulo de L4C3.

## 12. Básico — pacto-v2-012

**Descoberta:** Dupla fechada impede o terceiro.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento.

**Origem:** pacto-034; recomposição de pistas; 5 pistas alteradas. **Pistas:** 39; 25 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 6; 71 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: losango — cota saturada; posições restantes; primeira participação no passo 3.
- L1C2: círculo — cota saturada; posições restantes; primeira participação no passo 1.
- L1C3: losango — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 3.
- L1C4: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 40.
- L1C7: triângulo — cota saturada; primeira participação no passo 47.
- L1C8: círculo — cota saturada; primeira participação no passo 1.
- L2C1: losango — posições restantes; primeira participação no passo 6.
- L2C2: círculo — cota saturada; posições restantes; primeira participação no passo 5.
- L2C3: losango — posições restantes; primeira participação no passo 6.
- L2C5: triângulo — posições restantes; primeira participação no passo 6.
- L2C6: quadrado — posições restantes; primeira participação no passo 6.
- L2C7: quadrado — posições restantes; primeira participação no passo 6.
- L2C8: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 5.
- L3C1: círculo — cota saturada; posições restantes; primeira participação no passo 7.
- L3C2: losango — posições restantes; primeira participação no passo 33.
- L3C3: círculo — cota saturada; posições restantes; primeira participação no passo 7.
- L3C4: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 40.
- L3C6: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 9.
- L3C7: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 9.
- L4C2: losango — posições restantes; primeira participação no passo 33.
- L4C3: círculo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 38.
- L4C4: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 39.
- L5C1: quadrado — cota saturada; posições restantes; primeira participação no passo 11.
- L5C3: quadrado — cota saturada; posições restantes; primeira participação no passo 11.
- L5C5: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 42.
- L5C6: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 45.
- L5C8: triângulo — parceiro obrigatório / orientação; primeira participação no passo 63.
- L6C4: círculo — cota saturada; primeira participação no passo 14.
- L6C5: círculo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 14.
- L6C7: losango — prevenção de isolamento; primeira participação no passo 64.
- L7C1: triângulo — cota saturada; posições restantes; primeira participação no passo 21.
- L7C3: triângulo — cota saturada; posições restantes; primeira participação no passo 21.
- L7C5: losango — cota saturada; exclusão junto à dupla; primeira participação no passo 42.
- L7C6: círculo — cota saturada; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 19.
- L7C7: círculo — cota saturada; exclusão junto à dupla; primeira participação no passo 19.
- L7C8: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 50.
- L8C1: triângulo — cota saturada; posições restantes; primeira participação no passo 23.
- L8C3: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 23.
- L8C8: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 50.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C2, L1C8); exclua círculo de L1C5.
2. linha 1 já tem dois círculo (L1C2, L1C8); exclua círculo de L1C6.
3. linha 1 já tem dois losango (L1C1, L1C3); exclua losango de L1C5.
4. linha 1 já tem dois losango (L1C1, L1C3); exclua losango de L1C6.
5. linha 2 já tem dois círculo (L2C2, L2C8); exclua círculo de L2C4.
6. Na linha 2, triângulo só cabe em L2C4 e L2C5; ambas as casas precisam dele.
7. linha 3 já tem dois círculo (L3C1, L3C3); exclua círculo de L3C5.
8. linha 3 já tem dois círculo (L3C1, L3C3); exclua círculo de L3C8.
9. linha 3 já tem dois triângulo (L3C6, L3C7); exclua triângulo de L3C5.
10. linha 3 já tem dois triângulo (L3C6, L3C7); exclua triângulo de L3C8.
11. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C2.
12. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C4.
13. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C7.
14. linha 6 já tem dois círculo (L6C4, L6C5); exclua círculo de L6C1.
15. linha 6 já tem dois círculo (L6C4, L6C5); exclua círculo de L6C2.
16. linha 6 já tem dois círculo (L6C4, L6C5); exclua círculo de L6C3.
17. linha 6 já tem dois círculo (L6C4, L6C5); exclua círculo de L6C6.
18. linha 6 já tem dois círculo (L6C4, L6C5); exclua círculo de L6C8.
19. linha 7 já tem dois círculo (L7C6, L7C7); exclua círculo de L7C2.
20. linha 7 já tem dois círculo (L7C6, L7C7); exclua círculo de L7C4.
21. linha 7 já tem dois triângulo (L7C1, L7C3); exclua triângulo de L7C2.
22. linha 7 já tem dois triângulo (L7C1, L7C3); exclua triângulo de L7C4.
23. linha 8 já tem dois triângulo (L8C1, L8C3); exclua triângulo de L8C2.
24. linha 8 já tem dois triângulo (L8C1, L8C3); exclua triângulo de L8C4.
25. linha 8 já tem dois triângulo (L8C1, L8C3); exclua triângulo de L8C5.
26. linha 8 já tem dois triângulo (L8C1, L8C3); exclua triângulo de L8C6.
27. linha 8 já tem dois triângulo (L8C1, L8C3); exclua triângulo de L8C7.
28. Na coluna 1, círculo só cabe em L3C1 e L4C1; ambas as casas precisam dele.
29. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L6C1.
30. Na coluna 1, quadrado só cabe em L5C1 e L6C1; ambas as casas precisam dele.
31. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L5C2.
32. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L8C2.
33. Na coluna 2, triângulo só cabe em L5C2 e L6C2; ambas as casas precisam dele.
34. Na coluna 2, triângulo só cabe em L5C2 e L6C2; ambas as casas precisam dele.
35. Na coluna 2, quadrado só cabe em L7C2 e L8C2; ambas as casas precisam dele.
36. Na coluna 2, quadrado só cabe em L7C2 e L8C2; ambas as casas precisam dele.
37. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L6C3.
38. Na coluna 3, quadrado só cabe em L5C3 e L6C3; ambas as casas precisam dele.
39. coluna 4 já tem dois triângulo (L2C4, L4C4); exclua triângulo de L5C4.
40. coluna 4 já tem dois quadrado (L1C4, L3C4); exclua quadrado de L7C4.
41. coluna 4 já tem dois quadrado (L1C4, L3C4); exclua quadrado de L8C4.
42. coluna 5 já tem dois losango (L5C5, L7C5); exclua losango de L3C5.
43. coluna 5 já tem dois losango (L5C5, L7C5); exclua losango de L4C5.
44. coluna 5 já tem dois losango (L5C5, L7C5); exclua losango de L8C5.
45. coluna 6 já tem dois círculo (L5C6, L7C6); exclua círculo de L4C6.
46. coluna 6 já tem dois círculo (L5C6, L7C6); exclua círculo de L8C6.
47. coluna 7 já tem dois triângulo (L1C7, L3C7); exclua triângulo de L4C7.
48. coluna 7 já tem dois triângulo (L1C7, L3C7); exclua triângulo de L5C7.
49. coluna 8 já tem dois círculo (L1C8, L2C8); exclua círculo de L4C8.
50. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L3C8.
51. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L4C8.
52. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L6C8.
53. L1C4 precisa de um parceiro quadrado; só L1C5 pode recebê-lo (horizontal).
54. A dupla L1C5–L1C4 já está fechada; L1C6 não pode tocar essa dupla com outro quadrado.
55. A dupla L3C5–L3C4 já está fechada; L4C5 não pode tocar essa dupla com outro quadrado.
56. A dupla L3C6–L3C7 já está fechada; L4C6 não pode tocar essa dupla com outro triângulo.
57. L3C8 precisa de um parceiro losango; só L4C8 pode recebê-lo (vertical).
58. L4C4 precisa de um parceiro triângulo; só L4C5 pode recebê-lo (horizontal).
59. A dupla L4C8–L3C8 já está fechada; L4C7 não pode tocar essa dupla com outro losango.
60. L5C5 precisa de um parceiro losango; só L5C4 pode recebê-lo (horizontal).
61. L5C6 precisa de um parceiro círculo; só L5C7 pode recebê-lo (horizontal).
62. A dupla L5C7–L5C6 já está fechada; L4C7 não pode tocar essa dupla com outro círculo.
63. L5C8 precisa de um parceiro triângulo; só L6C8 pode recebê-lo (vertical).
64. L6C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
65. L6C6 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
66. A dupla L7C4–L7C5 já está fechada; L8C4 não pode tocar essa dupla com outro losango.
67. A dupla L7C7–L7C6 já está fechada; L8C7 não pode tocar essa dupla com outro círculo.
68. L8C4 precisa de um parceiro círculo; só L8C5 pode recebê-lo (horizontal).
69. A dupla L8C8–L7C8 já está fechada; L8C7 não pode tocar essa dupla com outro quadrado.
70. Na linha 4, quadrado só cabe em L4C6 e L4C7; ambas as casas precisam dele.
71. linha 8 já tem dois quadrado (L8C2, L8C8); exclua quadrado de L8C6.

## 13. Básico — pacto-v2-013

**Descoberta:** Dupla fechada impede o terceiro.

**Técnicas combinadas:** posições restantes; cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento.

**Origem:** pacto-037; recomposição de pistas; 5 pistas alteradas. **Pistas:** 39; 25 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 7; 65 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C2: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C3: losango — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C4: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C5: triângulo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C7: triângulo — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 1.
- L2C1: losango — cota saturada; posições restantes; primeira participação no passo 3.
- L2C3: losango — cota saturada; primeira participação no passo 3.
- L2C4: quadrado — posições restantes; primeira participação no passo 33.
- L2C6: círculo — cota saturada; primeira participação no passo 38.
- L3C2: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L3C3: triângulo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L3C5: quadrado — cota saturada; primeira participação no passo 35.
- L4C1: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 7.
- L4C2: triângulo — cota saturada; primeira participação no passo 7.
- L4C5: quadrado — cota saturada; primeira participação no passo 10.
- L4C7: quadrado — cota saturada; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 10.
- L4C8: losango — exclusão junto à dupla; primeira participação no passo 55.
- L5C1: círculo — posições restantes; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 29.
- L5C3: triângulo — cota saturada; primeira participação no passo 13.
- L5C4: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 13.
- L5C5: losango — cota saturada; primeira participação no passo 37.
- L5C6: quadrado — cota saturada; primeira participação no passo 42.
- L6C1: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 16.
- L6C2: triângulo — cota saturada; primeira participação no passo 16.
- L6C4: círculo — posições restantes; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 33.
- L6C5: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 18.
- L6C6: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 42.
- L6C7: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 18.
- L7C1: quadrado — posições restantes; exclusão junto à dupla; primeira participação no passo 29.
- L7C4: losango — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 33.
- L7C6: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 20.
- L7C7: círculo — parceiro obrigatório / orientação; primeira participação no passo 58.
- L7C8: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 20.
- L8C1: quadrado — cota saturada; posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 23.
- L8C2: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 26.
- L8C3: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 23.
- L8C4: losango — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 26.
- L8C8: triângulo — cota saturada; primeira participação no passo 43.

### Sequência lógica

1. Na linha 1, círculo só cabe em L1C6 e L1C8; ambas as casas precisam dele.
2. Na linha 1, círculo só cabe em L1C6 e L1C8; ambas as casas precisam dele.
3. linha 2 já tem dois losango (L2C1, L2C3); exclua losango de L2C2.
4. linha 2 já tem dois losango (L2C1, L2C3); exclua losango de L2C5.
5. linha 2 já tem dois losango (L2C1, L2C3); exclua losango de L2C7.
6. linha 2 já tem dois losango (L2C1, L2C3); exclua losango de L2C8.
7. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C3.
8. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C4.
9. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C6.
10. linha 4 já tem dois quadrado (L4C5, L4C7); exclua quadrado de L4C3.
11. linha 4 já tem dois quadrado (L4C5, L4C7); exclua quadrado de L4C4.
12. linha 4 já tem dois quadrado (L4C5, L4C7); exclua quadrado de L4C6.
13. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C2.
14. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C7.
15. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C8.
16. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C3.
17. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C8.
18. linha 6 já tem dois losango (L6C5, L6C7); exclua losango de L6C3.
19. linha 6 já tem dois losango (L6C5, L6C7); exclua losango de L6C8.
20. linha 7 já tem dois triângulo (L7C6, L7C8); exclua triângulo de L7C2.
21. linha 7 já tem dois triângulo (L7C6, L7C8); exclua triângulo de L7C3.
22. linha 7 já tem dois triângulo (L7C6, L7C8); exclua triângulo de L7C5.
23. linha 8 já tem dois quadrado (L8C1, L8C3); exclua quadrado de L8C5.
24. linha 8 já tem dois quadrado (L8C1, L8C3); exclua quadrado de L8C6.
25. linha 8 já tem dois quadrado (L8C1, L8C3); exclua quadrado de L8C7.
26. linha 8 já tem dois losango (L8C2, L8C4); exclua losango de L8C5.
27. linha 8 já tem dois losango (L8C2, L8C4); exclua losango de L8C6.
28. linha 8 já tem dois losango (L8C2, L8C4); exclua losango de L8C7.
29. Na coluna 1, círculo só cabe em L3C1 e L5C1; ambas as casas precisam dele.
30. coluna 2 já tem dois triângulo (L4C2, L6C2); exclua triângulo de L2C2.
31. coluna 3 já tem dois losango (L1C3, L2C3); exclua losango de L4C3.
32. coluna 3 já tem dois losango (L1C3, L2C3); exclua losango de L7C3.
33. Na coluna 4, triângulo só cabe em L3C4 e L5C4; ambas as casas precisam dele.
34. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L4C4.
35. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L2C5.
36. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L7C5.
37. coluna 5 já tem dois losango (L5C5, L6C5); exclua losango de L7C5.
38. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L3C6.
39. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L4C6.
40. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L8C6.
41. coluna 6 já tem dois triângulo (L7C6, L8C6); exclua triângulo de L3C6.
42. coluna 6 já tem dois quadrado (L5C6, L6C6); exclua quadrado de L3C6.
43. coluna 8 já tem dois triângulo (L7C8, L8C8); exclua triângulo de L2C8.
44. coluna 8 já tem dois triângulo (L7C8, L8C8); exclua triângulo de L3C8.
45. L1C2 precisa de um parceiro quadrado; só L2C2 pode recebê-lo (vertical).
46. L1C5 precisa de um parceiro triângulo; só L2C5 pode recebê-lo (vertical).
47. L1C7 precisa de um parceiro triângulo; só L2C7 pode recebê-lo (vertical).
48. L1C8 precisa de um parceiro círculo; só L2C8 pode recebê-lo (vertical).
49. A dupla L2C7–L1C7 já está fechada; L3C7 não pode tocar essa dupla com outro triângulo.
50. A dupla L2C8–L1C8 já está fechada; L3C8 não pode tocar essa dupla com outro círculo.
51. A dupla L3C6–L4C6 já está fechada; L3C7 não pode tocar essa dupla com outro losango.
52. L3C7 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
53. A dupla L3C7–L4C7 já está fechada; L3C8 não pode tocar essa dupla com outro quadrado.
54. A dupla L4C7–L3C7 já está fechada; L5C7 não pode tocar essa dupla com outro quadrado.
55. A dupla L4C8–L3C8 já está fechada; L5C8 não pode tocar essa dupla com outro losango.
56. L5C1 precisa de um parceiro círculo; só L5C2 pode recebê-lo (horizontal).
57. L6C4 precisa de um parceiro círculo; só L6C3 pode recebê-lo (horizontal).
58. L6C7 precisa de um parceiro losango; só L5C7 pode recebê-lo (vertical).
59. A dupla L7C1–L8C1 já está fechada; L7C2 não pode tocar essa dupla com outro quadrado.
60. L7C5 precisa de um parceiro círculo; só L8C5 pode recebê-lo (vertical).
61. L7C7 precisa de um parceiro círculo; só L8C7 pode recebê-lo (vertical).
62. L8C2 precisa de um parceiro losango; só L7C2 pode recebê-lo (vertical).
63. L8C3 precisa de um parceiro quadrado; só L7C3 pode recebê-lo (vertical).
64. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C8.
65. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C8.

## 14. Básico — pacto-v2-014

**Descoberta:** Dupla fechada impede o terceiro.

**Técnicas combinadas:** cota saturada; posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação; prevenção de isolamento; prevenção de trio.

**Origem:** pacto-040; recomposição de pistas; 5 pistas alteradas. **Pistas:** 39; 25 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 7; 69 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: losango — posições restantes; cota saturada; primeira participação no passo 2.
- L1C2: círculo — cota saturada; posições restantes; primeira participação no passo 1.
- L1C4: triângulo — posições restantes; cota saturada; primeira participação no passo 2.
- L1C5: losango — posições restantes; cota saturada; primeira participação no passo 2.
- L1C6: quadrado — posições restantes; cota saturada; primeira participação no passo 2.
- L1C7: quadrado — posições restantes; cota saturada; primeira participação no passo 2.
- L1C8: círculo — cota saturada; posições restantes; primeira participação no passo 1.
- L2C1: losango — cota saturada; posições restantes; primeira participação no passo 5.
- L2C2: círculo — cota saturada; primeira participação no passo 27.
- L2C3: quadrado — exclusão junto à dupla; primeira participação no passo 43.
- L2C5: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 5.
- L2C6: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 3.
- L2C7: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 3.
- L3C1: círculo — cota saturada; posições restantes; primeira participação no passo 7.
- L3C4: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 30.
- L3C5: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 7.
- L3C7: losango — exclusão junto à dupla; primeira participação no passo 47.
- L3C8: quadrado — cota saturada; primeira participação no passo 40.
- L4C1: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 22.
- L4C2: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 10.
- L4C4: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 31.
- L4C7: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 38.
- L4C8: quadrado — cota saturada; prevenção de isolamento; primeira participação no passo 10.
- L5C2: triângulo — parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 48.
- L5C4: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 28.
- L5C5: quadrado — parceiro obrigatório / orientação; primeira participação no passo 54.
- L6C3: losango — cota saturada; prevenção de isolamento; prevenção de trio; exclusão junto à dupla; primeira participação no passo 16.
- L6C4: losango — cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 16.
- L6C6: círculo — cota saturada; exclusão junto à dupla; primeira participação no passo 13.
- L6C7: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 13.
- L6C8: triângulo — prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 56.
- L7C4: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 28.
- L7C5: triângulo — parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 62.
- L7C6: quadrado — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 19.
- L7C7: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 19.
- L7C8: losango — parceiro obrigatório / orientação; primeira participação no passo 61.
- L8C1: triângulo — posições restantes; primeira participação no passo 24.
- L8C2: losango — exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 65.
- L8C7: círculo — cota saturada; prevenção de isolamento; primeira participação no passo 37.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C2, L1C8); exclua círculo de L1C3.
2. Na linha 1, triângulo só cabe em L1C3 e L1C4; ambas as casas precisam dele.
3. linha 2 já tem dois triângulo (L2C6, L2C7); exclua triângulo de L2C4.
4. linha 2 já tem dois triângulo (L2C6, L2C7); exclua triângulo de L2C8.
5. linha 2 já tem dois losango (L2C1, L2C5); exclua losango de L2C4.
6. linha 2 já tem dois losango (L2C1, L2C5); exclua losango de L2C8.
7. linha 3 já tem dois círculo (L3C1, L3C5); exclua círculo de L3C2.
8. linha 3 já tem dois círculo (L3C1, L3C5); exclua círculo de L3C3.
9. linha 3 já tem dois círculo (L3C1, L3C5); exclua círculo de L3C6.
10. linha 4 já tem dois quadrado (L4C2, L4C8); exclua quadrado de L4C3.
11. linha 4 já tem dois quadrado (L4C2, L4C8); exclua quadrado de L4C5.
12. linha 4 já tem dois quadrado (L4C2, L4C8); exclua quadrado de L4C6.
13. linha 6 já tem dois círculo (L6C6, L6C7); exclua círculo de L6C1.
14. linha 6 já tem dois círculo (L6C6, L6C7); exclua círculo de L6C2.
15. linha 6 já tem dois círculo (L6C6, L6C7); exclua círculo de L6C5.
16. linha 6 já tem dois losango (L6C3, L6C4); exclua losango de L6C1.
17. linha 6 já tem dois losango (L6C3, L6C4); exclua losango de L6C2.
18. linha 6 já tem dois losango (L6C3, L6C4); exclua losango de L6C5.
19. linha 7 já tem dois quadrado (L7C6, L7C7); exclua quadrado de L7C1.
20. linha 7 já tem dois quadrado (L7C6, L7C7); exclua quadrado de L7C2.
21. linha 7 já tem dois quadrado (L7C6, L7C7); exclua quadrado de L7C3.
22. coluna 1 já tem dois círculo (L3C1, L4C1); exclua círculo de L5C1.
23. coluna 1 já tem dois círculo (L3C1, L4C1); exclua círculo de L7C1.
24. Na coluna 1, quadrado só cabe em L5C1 e L6C1; ambas as casas precisam dele.
25. Na coluna 1, quadrado só cabe em L5C1 e L6C1; ambas as casas precisam dele.
26. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L7C1.
27. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L7C2.
28. coluna 4 já tem dois círculo (L5C4, L7C4); exclua círculo de L2C4.
29. coluna 4 já tem dois círculo (L5C4, L7C4); exclua círculo de L8C4.
30. coluna 4 já tem dois triângulo (L1C4, L3C4); exclua triângulo de L8C4.
31. Na coluna 4, quadrado só cabe em L2C4 e L8C4; ambas as casas precisam dele.
32. coluna 5 já tem dois losango (L1C5, L2C5); exclua losango de L4C5.
33. coluna 5 já tem dois losango (L1C5, L2C5); exclua losango de L8C5.
34. coluna 6 já tem dois quadrado (L1C6, L7C6); exclua quadrado de L3C6.
35. coluna 6 já tem dois quadrado (L1C6, L7C6); exclua quadrado de L5C6.
36. coluna 6 já tem dois quadrado (L1C6, L7C6); exclua quadrado de L8C6.
37. coluna 7 já tem dois círculo (L6C7, L8C7); exclua círculo de L5C7.
38. coluna 7 já tem dois triângulo (L2C7, L4C7); exclua triângulo de L5C7.
39. coluna 7 já tem dois quadrado (L1C7, L7C7); exclua quadrado de L5C7.
40. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L2C8.
41. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L5C8.
42. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L8C8.
43. A dupla L2C3–L2C4 já está fechada; L3C3 não pode tocar essa dupla com outro quadrado.
44. A dupla L2C6–L2C7 já está fechada; L3C6 não pode tocar essa dupla com outro triângulo.
45. L3C4 precisa de um parceiro triângulo; só L3C3 pode recebê-lo (horizontal).
46. L3C5 precisa de um parceiro círculo; só L4C5 pode recebê-lo (vertical).
47. A dupla L3C6–L3C7 já está fechada; L4C6 não pode tocar essa dupla com outro losango.
48. L4C2 precisa de um parceiro quadrado; só L3C2 pode recebê-lo (vertical).
49. L4C4 precisa de um parceiro losango; só L4C3 pode recebê-lo (horizontal).
50. A dupla L4C5–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro círculo.
51. A dupla L4C6–L4C7 já está fechada; L5C6 não pode tocar essa dupla com outro triângulo.
52. L5C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
53. L5C3 não pode ser losango: tocaria L4C3 e L6C3, formando um grupo maior que dois.
54. L5C4 precisa de um parceiro círculo; só L5C3 pode recebê-lo (horizontal).
55. L5C5 precisa de um parceiro quadrado; só L6C5 pode recebê-lo (vertical).
56. L5C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
57. A dupla L6C1–L5C1 já está fechada; L6C2 não pode tocar essa dupla com outro quadrado.
58. A dupla L6C2–L5C2 já está fechada; L7C2 não pode tocar essa dupla com outro triângulo.
59. A dupla L6C3–L6C4 já está fechada; L7C3 não pode tocar essa dupla com outro losango.
60. A dupla L6C6–L6C7 já está fechada; L5C6 não pode tocar essa dupla com outro círculo.
61. L6C8 precisa de um parceiro triângulo; só L5C8 pode recebê-lo (vertical).
62. L7C4 precisa de um parceiro círculo; só L7C3 pode recebê-lo (horizontal).
63. L7C5 precisa de um parceiro triângulo; só L8C5 pode recebê-lo (vertical).
64. L7C8 precisa de um parceiro losango; só L8C8 pode recebê-lo (vertical).
65. A dupla L8C2–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro losango.
66. L8C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
67. L8C4 precisa de um parceiro quadrado; só L8C3 pode recebê-lo (horizontal).
68. A dupla L8C5–L7C5 já está fechada; L8C6 não pode tocar essa dupla com outro triângulo.
69. L8C6 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.

## 15. Básico — pacto-v2-015

**Descoberta:** Dupla fechada impede o terceiro.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento.

**Origem:** pacto-043; recomposição de pistas; 5 pistas alteradas. **Pistas:** 39; 25 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 7; 68 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 31.
- L1C3: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L1C5: triângulo — parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 51.
- L1C8: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L2C1: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 30.
- L2C3: losango — cota saturada; primeira participação no passo 1.
- L2C4: losango — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C5: quadrado — parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 51.
- L2C7: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 43.
- L3C1: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 4.
- L3C2: quadrado — cota saturada; primeira participação no passo 4.
- L3C3: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L4C1: círculo — cota saturada; primeira participação no passo 9.
- L4C2: losango — cota saturada; primeira participação no passo 32.
- L4C3: quadrado — cota saturada; primeira participação no passo 11.
- L4C4: quadrado — cota saturada; posições restantes; primeira participação no passo 11.
- L4C5: círculo — cota saturada; prevenção de isolamento; primeira participação no passo 9.
- L4C7: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 10.
- L4C8: triângulo — cota saturada; primeira participação no passo 10.
- L5C1: círculo — posições restantes; primeira participação no passo 12.
- L5C2: losango — posições restantes; cota saturada; primeira participação no passo 12.
- L5C3: triângulo — posições restantes; cota saturada; prevenção de isolamento; primeira participação no passo 12.
- L5C4: triângulo — posições restantes; primeira participação no passo 12.
- L5C6: losango — posições restantes; cota saturada; primeira participação no passo 12.
- L5C7: quadrado — posições restantes; cota saturada; primeira participação no passo 12.
- L5C8: quadrado — posições restantes; cota saturada; primeira participação no passo 12.
- L6C2: círculo — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 13.
- L6C4: quadrado — posições restantes; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 35.
- L6C6: círculo — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 13.
- L7C1: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C3: triângulo — cota saturada; prevenção de isolamento; primeira participação no passo 18.
- L7C4: triângulo — cota saturada; posições restantes; primeira participação no passo 18.
- L7C7: quadrado — cota saturada; primeira participação no passo 21.
- L7C8: quadrado — cota saturada; primeira participação no passo 21.
- L8C1: triângulo — cota saturada; primeira participação no passo 27.
- L8C2: triângulo — cota saturada; prevenção de isolamento; primeira participação no passo 27.
- L8C4: losango — posições restantes; prevenção de isolamento; primeira participação no passo 35.
- L8C7: círculo — cota saturada; primeira participação no passo 24.
- L8C8: círculo — cota saturada; primeira participação no passo 24.

### Sequência lógica

1. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C2.
2. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C6.
3. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C8.
4. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C4.
5. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C5.
6. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C6.
7. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C7.
8. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C8.
9. linha 4 já tem dois círculo (L4C1, L4C5); exclua círculo de L4C6.
10. linha 4 já tem dois triângulo (L4C7, L4C8); exclua triângulo de L4C6.
11. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C6.
12. Na linha 5, círculo só cabe em L5C1 e L5C5; ambas as casas precisam dele.
13. linha 6 já tem dois círculo (L6C2, L6C6); exclua círculo de L6C1.
14. linha 6 já tem dois círculo (L6C2, L6C6); exclua círculo de L6C3.
15. linha 6 já tem dois círculo (L6C2, L6C6); exclua círculo de L6C5.
16. linha 6 já tem dois círculo (L6C2, L6C6); exclua círculo de L6C7.
17. linha 6 já tem dois círculo (L6C2, L6C6); exclua círculo de L6C8.
18. linha 7 já tem dois triângulo (L7C3, L7C4); exclua triângulo de L7C2.
19. linha 7 já tem dois triângulo (L7C3, L7C4); exclua triângulo de L7C5.
20. linha 7 já tem dois triângulo (L7C3, L7C4); exclua triângulo de L7C6.
21. linha 7 já tem dois quadrado (L7C7, L7C8); exclua quadrado de L7C2.
22. linha 7 já tem dois quadrado (L7C7, L7C8); exclua quadrado de L7C5.
23. linha 7 já tem dois quadrado (L7C7, L7C8); exclua quadrado de L7C6.
24. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C3.
25. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C5.
26. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C6.
27. linha 8 já tem dois triângulo (L8C1, L8C2); exclua triângulo de L8C3.
28. linha 8 já tem dois triângulo (L8C1, L8C2); exclua triângulo de L8C5.
29. linha 8 já tem dois triângulo (L8C1, L8C2); exclua triângulo de L8C6.
30. coluna 1 já tem dois triângulo (L2C1, L8C1); exclua triângulo de L6C1.
31. coluna 1 já tem dois quadrado (L1C1, L3C1); exclua quadrado de L6C1.
32. coluna 2 já tem dois losango (L4C2, L5C2); exclua losango de L1C2.
33. coluna 2 já tem dois losango (L4C2, L5C2); exclua losango de L7C2.
34. coluna 3 já tem dois triângulo (L5C3, L7C3); exclua triângulo de L6C3.
35. Na coluna 4, círculo só cabe em L1C4 e L3C4; ambas as casas precisam dele.
36. Na coluna 4, círculo só cabe em L1C4 e L3C4; ambas as casas precisam dele.
37. coluna 5 já tem dois círculo (L4C5, L5C5); exclua círculo de L3C5.
38. coluna 5 já tem dois círculo (L4C5, L5C5); exclua círculo de L7C5.
39. coluna 6 já tem dois losango (L4C6, L5C6); exclua losango de L1C6.
40. coluna 6 já tem dois losango (L4C6, L5C6); exclua losango de L3C6.
41. coluna 6 já tem dois losango (L4C6, L5C6); exclua losango de L7C6.
42. coluna 6 já tem dois losango (L4C6, L5C6); exclua losango de L8C6.
43. coluna 7 já tem dois círculo (L2C7, L8C7); exclua círculo de L1C7.
44. coluna 7 já tem dois círculo (L2C7, L8C7); exclua círculo de L3C7.
45. coluna 7 já tem dois quadrado (L5C7, L7C7); exclua quadrado de L1C7.
46. coluna 7 já tem dois quadrado (L5C7, L7C7); exclua quadrado de L6C7.
47. coluna 8 já tem dois quadrado (L5C8, L7C8); exclua quadrado de L2C8.
48. coluna 8 já tem dois quadrado (L5C8, L7C8); exclua quadrado de L6C8.
49. L1C1 precisa de um parceiro quadrado; só L1C2 pode recebê-lo (horizontal).
50. A dupla L1C2–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro quadrado.
51. L1C5 precisa de um parceiro triângulo; só L1C6 pode recebê-lo (horizontal).
52. A dupla L1C6–L1C5 já está fechada; L2C6 não pode tocar essa dupla com outro triângulo.
53. A dupla L1C6–L1C5 já está fechada; L1C7 não pode tocar essa dupla com outro triângulo.
54. L2C1 precisa de um parceiro triângulo; só L2C2 pode recebê-lo (horizontal).
55. L2C5 precisa de um parceiro quadrado; só L2C6 pode recebê-lo (horizontal).
56. L2C7 precisa de um parceiro círculo; só L2C8 pode recebê-lo (horizontal).
57. A dupla L2C8–L2C7 já está fechada; L3C8 não pode tocar essa dupla com outro círculo.
58. L3C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
59. L3C6 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
60. A dupla L3C6–L3C5 já está fechada; L3C7 não pode tocar essa dupla com outro triângulo.
61. L3C7 precisa de um parceiro losango; só L3C8 pode recebê-lo (horizontal).
62. L6C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
63. A dupla L6C4–L6C3 já está fechada; L6C5 não pode tocar essa dupla com outro quadrado.
64. L6C5 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
65. A dupla L7C5–L6C5 já está fechada; L8C5 não pode tocar essa dupla com outro losango.
66. L8C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
67. Na linha 6, triângulo só cabe em L6C7 e L6C8; ambas as casas precisam dele.
68. Na linha 6, triângulo só cabe em L6C7 e L6C8; ambas as casas precisam dele.

## 16. Aprendiz — pacto-002

**Descoberta:** Parceiro de canto e borda.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento.

**Origem:** pacto-002; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 34; 30 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 8; 86 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: losango — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 59.
- L1C2: círculo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 59.
- L1C5: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C7: triângulo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L1C8: quadrado — cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 1.
- L2C3: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 30.
- L2C8: quadrado — posições restantes; exclusão junto à dupla; primeira participação no passo 57.
- L3C4: quadrado — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 39.
- L3C5: triângulo — cota saturada; primeira participação no passo 45.
- L3C6: losango — cota saturada; primeira participação no passo 4.
- L3C7: losango — cota saturada; primeira participação no passo 4.
- L4C2: losango — cota saturada; primeira participação no passo 10.
- L4C3: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 10.
- L4C4: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 39.
- L4C5: triângulo — cota saturada; primeira participação no passo 45.
- L4C6: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 8.
- L4C7: círculo — cota saturada; exclusão junto à dupla; primeira participação no passo 8.
- L5C8: losango — posições restantes; primeira participação no passo 57.
- L6C2: triângulo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 12.
- L6C3: triângulo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 12.
- L6C6: quadrado — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 47.
- L6C8: losango — posições restantes; prevenção de isolamento; primeira participação no passo 57.
- L7C1: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 18.
- L7C2: quadrado — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C4: triângulo — cota saturada; posições restantes; primeira participação no passo 18.
- L7C5: círculo — cota saturada; primeira participação no passo 16.
- L7C7: losango — cota saturada; prevenção de isolamento; primeira participação no passo 53.
- L7C8: círculo — cota saturada; posições restantes; primeira participação no passo 16.
- L8C2: losango — posições restantes; cota saturada; primeira participação no passo 22.
- L8C3: losango — posições restantes; cota saturada; primeira participação no passo 22.
- L8C5: círculo — cota saturada; posições restantes; primeira participação no passo 20.
- L8C6: quadrado — posições restantes; cota saturada; primeira participação no passo 22.
- L8C7: quadrado — posições restantes; primeira participação no passo 22.
- L8C8: círculo — cota saturada; posições restantes; primeira participação no passo 20.

### Sequência lógica

1. linha 1 já tem dois quadrado (L1C5, L1C8); exclua quadrado de L1C3.
2. linha 1 já tem dois quadrado (L1C5, L1C8); exclua quadrado de L1C4.
3. linha 1 já tem dois quadrado (L1C5, L1C8); exclua quadrado de L1C6.
4. linha 3 já tem dois losango (L3C6, L3C7); exclua losango de L3C1.
5. linha 3 já tem dois losango (L3C6, L3C7); exclua losango de L3C2.
6. linha 3 já tem dois losango (L3C6, L3C7); exclua losango de L3C3.
7. linha 3 já tem dois losango (L3C6, L3C7); exclua losango de L3C8.
8. linha 4 já tem dois círculo (L4C6, L4C7); exclua círculo de L4C1.
9. linha 4 já tem dois círculo (L4C6, L4C7); exclua círculo de L4C8.
10. linha 4 já tem dois losango (L4C2, L4C3); exclua losango de L4C1.
11. linha 4 já tem dois losango (L4C2, L4C3); exclua losango de L4C8.
12. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C1.
13. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C4.
14. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C5.
15. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C7.
16. linha 7 já tem dois círculo (L7C5, L7C8); exclua círculo de L7C3.
17. linha 7 já tem dois círculo (L7C5, L7C8); exclua círculo de L7C6.
18. linha 7 já tem dois triângulo (L7C1, L7C4); exclua triângulo de L7C3.
19. linha 7 já tem dois triângulo (L7C1, L7C4); exclua triângulo de L7C6.
20. linha 8 já tem dois círculo (L8C5, L8C8); exclua círculo de L8C1.
21. linha 8 já tem dois círculo (L8C5, L8C8); exclua círculo de L8C4.
22. Na linha 8, triângulo só cabe em L8C1 e L8C4; ambas as casas precisam dele.
23. Na linha 8, triângulo só cabe em L8C1 e L8C4; ambas as casas precisam dele.
24. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L2C1.
25. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L3C1.
26. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L4C1.
27. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L5C1.
28. coluna 2 já tem dois losango (L4C2, L8C2); exclua losango de L2C2.
29. coluna 2 já tem dois losango (L4C2, L8C2); exclua losango de L5C2.
30. coluna 3 já tem dois triângulo (L2C3, L6C3); exclua triângulo de L1C3.
31. coluna 3 já tem dois triângulo (L2C3, L6C3); exclua triângulo de L3C3.
32. coluna 3 já tem dois triângulo (L2C3, L6C3); exclua triângulo de L5C3.
33. coluna 3 já tem dois losango (L4C3, L8C3); exclua losango de L1C3.
34. coluna 3 já tem dois losango (L4C3, L8C3); exclua losango de L5C3.
35. coluna 3 já tem dois losango (L4C3, L8C3); exclua losango de L7C3.
36. coluna 4 já tem dois triângulo (L7C4, L8C4); exclua triângulo de L1C4.
37. coluna 4 já tem dois triângulo (L7C4, L8C4); exclua triângulo de L2C4.
38. coluna 4 já tem dois triângulo (L7C4, L8C4); exclua triângulo de L5C4.
39. coluna 4 já tem dois quadrado (L3C4, L4C4); exclua quadrado de L2C4.
40. coluna 4 já tem dois quadrado (L3C4, L4C4); exclua quadrado de L5C4.
41. coluna 4 já tem dois quadrado (L3C4, L4C4); exclua quadrado de L6C4.
42. coluna 5 já tem dois círculo (L7C5, L8C5); exclua círculo de L2C5.
43. coluna 5 já tem dois círculo (L7C5, L8C5); exclua círculo de L5C5.
44. coluna 5 já tem dois círculo (L7C5, L8C5); exclua círculo de L6C5.
45. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L2C5.
46. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L5C5.
47. coluna 6 já tem dois quadrado (L6C6, L8C6); exclua quadrado de L2C6.
48. coluna 6 já tem dois quadrado (L6C6, L8C6); exclua quadrado de L5C6.
49. coluna 6 já tem dois quadrado (L6C6, L8C6); exclua quadrado de L7C6.
50. coluna 6 já tem dois losango (L3C6, L7C6); exclua losango de L1C6.
51. coluna 6 já tem dois losango (L3C6, L7C6); exclua losango de L2C6.
52. coluna 6 já tem dois losango (L3C6, L7C6); exclua losango de L5C6.
53. coluna 7 já tem dois losango (L3C7, L7C7); exclua losango de L2C7.
54. coluna 7 já tem dois losango (L3C7, L7C7); exclua losango de L5C7.
55. coluna 7 já tem dois losango (L3C7, L7C7); exclua losango de L6C7.
56. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L3C8.
57. Na coluna 8, triângulo só cabe em L3C8 e L4C8; ambas as casas precisam dele.
58. Na coluna 8, triângulo só cabe em L3C8 e L4C8; ambas as casas precisam dele.
59. L1C1 precisa de um parceiro losango; só L2C1 pode recebê-lo (vertical).
60. A dupla L1C2–L1C3 já está fechada; L2C2 não pode tocar essa dupla com outro círculo.
61. A dupla L1C3–L1C2 já está fechada; L1C4 não pode tocar essa dupla com outro círculo.
62. L1C4 precisa de um parceiro losango; só L2C4 pode recebê-lo (vertical).
63. L1C5 precisa de um parceiro quadrado; só L2C5 pode recebê-lo (vertical).
64. L2C3 precisa de um parceiro triângulo; só L2C2 pode recebê-lo (horizontal).
65. A dupla L2C8–L1C8 já está fechada; L2C7 não pode tocar essa dupla com outro quadrado.
66. A dupla L3C4–L4C4 já está fechada; L3C3 não pode tocar essa dupla com outro quadrado.
67. A dupla L4C6–L4C7 já está fechada; L5C6 não pode tocar essa dupla com outro círculo.
68. A dupla L4C7–L4C6 já está fechada; L5C7 não pode tocar essa dupla com outro círculo.
69. L5C6 precisa de um parceiro triângulo; só L5C7 pode recebê-lo (horizontal).
70. A dupla L6C2–L6C3 já está fechada; L5C2 não pode tocar essa dupla com outro triângulo.
71. L6C7 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
72. linha 1 já tem dois círculo (L1C2, L1C3); exclua círculo de L1C6.
73. Na linha 2, círculo só cabe em L2C6 e L2C7; ambas as casas precisam dele.
74. Na linha 2, círculo só cabe em L2C6 e L2C7; ambas as casas precisam dele.
75. linha 3 já tem dois triângulo (L3C5, L3C8); exclua triângulo de L3C2.
76. Na linha 6, círculo só cabe em L6C1 e L6C4; ambas as casas precisam dele.
77. Na linha 6, círculo só cabe em L6C1 e L6C4; ambas as casas precisam dele.
78. linha 6 já tem dois quadrado (L6C6, L6C7); exclua quadrado de L6C5.
79. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L5C1.
80. coluna 3 já tem dois círculo (L1C3, L3C3); exclua círculo de L5C3.
81. Na coluna 4, círculo só cabe em L5C4 e L6C4; ambas as casas precisam dele.
82. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L5C5.
83. L3C3 precisa de um parceiro círculo; só L3C2 pode recebê-lo (horizontal).
84. L5C3 precisa de um parceiro quadrado; só L5C2 pode recebê-lo (horizontal).
85. L6C1 precisa de um parceiro círculo; só L5C1 pode recebê-lo (vertical).
86. linha 3 já tem dois círculo (L3C2, L3C3); exclua círculo de L3C1.

## 17. Aprendiz — pacto-011

**Descoberta:** Duas ocorrências, duas posições.

**Técnicas combinadas:** cota saturada; posições restantes; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla.

**Origem:** pacto-011; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 34; 30 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 8; 85 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L2C1: círculo — prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 51.
- L2C2: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 33.
- L2C4: losango — cota saturada; exclusão junto à dupla; posições restantes; prevenção de isolamento; primeira participação no passo 3.
- L2C5: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 3.
- L2C6: quadrado — cota saturada; posições restantes; primeira participação no passo 1.
- L2C8: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L3C1: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 5.
- L3C2: losango — cota saturada; exclusão junto à dupla; primeira participação no passo 7.
- L3C3: losango — cota saturada; exclusão junto à dupla; primeira participação no passo 7.
- L3C4: triângulo — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 60.
- L3C7: quadrado — cota saturada; primeira participação no passo 5.
- L3C8: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 47.
- L4C1: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 12.
- L4C2: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 33.
- L4C6: círculo — cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 9.
- L4C7: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 12.
- L4C8: círculo — cota saturada; primeira participação no passo 9.
- L5C1: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 17.
- L5C2: quadrado — parceiro obrigatório / orientação; primeira participação no passo 61.
- L5C3: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 35.
- L5C6: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 15.
- L5C7: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 17.
- L5C8: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 15.
- L6C3: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 35.
- L6C6: triângulo — cota saturada; posições restantes; primeira participação no passo 19.
- L6C8: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 19.
- L7C1: triângulo — parceiro obrigatório / orientação; primeira participação no passo 67.
- L7C3: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 24.
- L7C5: quadrado — cota saturada; primeira participação no passo 24.
- L7C6: losango — cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 27.
- L7C8: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 27.
- L8C2: círculo — cota saturada; primeira participação no passo 77.
- L8C5: quadrado — cota saturada; prevenção de isolamento; primeira participação no passo 38.
- L8C6: losango — posições restantes; exclusão junto à dupla; primeira participação no passo 43.

### Sequência lógica

1. linha 2 já tem dois quadrado (L2C6, L2C8); exclua quadrado de L2C3.
2. linha 2 já tem dois quadrado (L2C6, L2C8); exclua quadrado de L2C7.
3. linha 2 já tem dois losango (L2C4, L2C5); exclua losango de L2C3.
4. linha 2 já tem dois losango (L2C4, L2C5); exclua losango de L2C7.
5. linha 3 já tem dois quadrado (L3C1, L3C7); exclua quadrado de L3C5.
6. linha 3 já tem dois quadrado (L3C1, L3C7); exclua quadrado de L3C6.
7. linha 3 já tem dois losango (L3C2, L3C3); exclua losango de L3C5.
8. linha 3 já tem dois losango (L3C2, L3C3); exclua losango de L3C6.
9. linha 4 já tem dois círculo (L4C6, L4C8); exclua círculo de L4C3.
10. linha 4 já tem dois círculo (L4C6, L4C8); exclua círculo de L4C4.
11. linha 4 já tem dois círculo (L4C6, L4C8); exclua círculo de L4C5.
12. linha 4 já tem dois quadrado (L4C1, L4C7); exclua quadrado de L4C3.
13. linha 4 já tem dois quadrado (L4C1, L4C7); exclua quadrado de L4C4.
14. linha 4 já tem dois quadrado (L4C1, L4C7); exclua quadrado de L4C5.
15. linha 5 já tem dois triângulo (L5C6, L5C8); exclua triângulo de L5C4.
16. linha 5 já tem dois triângulo (L5C6, L5C8); exclua triângulo de L5C5.
17. linha 5 já tem dois losango (L5C1, L5C7); exclua losango de L5C4.
18. linha 5 já tem dois losango (L5C1, L5C7); exclua losango de L5C5.
19. linha 6 já tem dois triângulo (L6C6, L6C8); exclua triângulo de L6C1.
20. linha 6 já tem dois triângulo (L6C6, L6C8); exclua triângulo de L6C2.
21. linha 6 já tem dois triângulo (L6C6, L6C8); exclua triângulo de L6C4.
22. linha 6 já tem dois triângulo (L6C6, L6C8); exclua triângulo de L6C5.
23. linha 6 já tem dois triângulo (L6C6, L6C8); exclua triângulo de L6C7.
24. linha 7 já tem dois quadrado (L7C3, L7C5); exclua quadrado de L7C2.
25. linha 7 já tem dois quadrado (L7C3, L7C5); exclua quadrado de L7C4.
26. linha 7 já tem dois quadrado (L7C3, L7C5); exclua quadrado de L7C7.
27. linha 7 já tem dois losango (L7C6, L7C8); exclua losango de L7C2.
28. linha 7 já tem dois losango (L7C6, L7C8); exclua losango de L7C4.
29. linha 7 já tem dois losango (L7C6, L7C8); exclua losango de L7C7.
30. coluna 1 já tem dois quadrado (L3C1, L4C1); exclua quadrado de L1C1.
31. coluna 1 já tem dois quadrado (L3C1, L4C1); exclua quadrado de L6C1.
32. coluna 1 já tem dois quadrado (L3C1, L4C1); exclua quadrado de L8C1.
33. coluna 2 já tem dois triângulo (L2C2, L4C2); exclua triângulo de L1C2.
34. coluna 2 já tem dois triângulo (L2C2, L4C2); exclua triângulo de L7C2.
35. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L1C3.
36. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L2C3.
37. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L8C3.
38. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L1C5.
39. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L5C5.
40. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L6C5.
41. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L1C6.
42. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L3C6.
43. Na coluna 6, quadrado só cabe em L1C6 e L2C6; ambas as casas precisam dele.
44. coluna 7 já tem dois quadrado (L3C7, L4C7); exclua quadrado de L1C7.
45. coluna 7 já tem dois quadrado (L3C7, L4C7); exclua quadrado de L6C7.
46. coluna 7 já tem dois quadrado (L3C7, L4C7); exclua quadrado de L8C7.
47. coluna 8 já tem dois círculo (L3C8, L4C8); exclua círculo de L1C8.
48. coluna 8 já tem dois círculo (L3C8, L4C8); exclua círculo de L8C8.
49. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L1C8.
50. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L8C8.
51. L1C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
52. L2C1 precisa de um parceiro círculo; só L1C1 pode recebê-lo (vertical).
53. A dupla L2C3–L2C2 já está fechada; L1C3 não pode tocar essa dupla com outro triângulo.
54. A dupla L2C4–L2C5 já está fechada; L1C4 não pode tocar essa dupla com outro losango.
55. A dupla L2C5–L2C4 já está fechada; L1C5 não pode tocar essa dupla com outro losango.
56. L2C8 precisa de um parceiro quadrado; só L1C8 pode recebê-lo (vertical).
57. A dupla L3C3–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro losango.
58. A dupla L3C6–L4C6 já está fechada; L3C5 não pode tocar essa dupla com outro círculo.
59. A dupla L4C3–L4C2 já está fechada; L4C4 não pode tocar essa dupla com outro triângulo.
60. L4C4 precisa de um parceiro losango; só L4C5 pode recebê-lo (horizontal).
61. L5C1 precisa de um parceiro losango; só L6C1 pode recebê-lo (vertical).
62. L5C2 precisa de um parceiro quadrado; só L6C2 pode recebê-lo (vertical).
63. A dupla L5C3–L6C3 já está fechada; L5C4 não pode tocar essa dupla com outro círculo.
64. L5C4 precisa de um parceiro quadrado; só L6C4 pode recebê-lo (vertical).
65. L5C5 precisa de um parceiro círculo; só L6C5 pode recebê-lo (vertical).
66. L5C7 precisa de um parceiro losango; só L6C7 pode recebê-lo (vertical).
67. L7C1 precisa de um parceiro triângulo; só L8C1 pode recebê-lo (vertical).
68. L7C3 precisa de um parceiro quadrado; só L8C3 pode recebê-lo (vertical).
69. L7C8 precisa de um parceiro losango; só L8C8 pode recebê-lo (vertical).
70. A dupla L8C3–L7C3 já está fechada; L8C4 não pode tocar essa dupla com outro quadrado.
71. L8C4 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
72. A dupla L8C6–L7C6 já está fechada; L8C7 não pode tocar essa dupla com outro losango.
73. linha 1 já tem dois quadrado (L1C6, L1C8); exclua quadrado de L1C2.
74. linha 1 já tem dois quadrado (L1C6, L1C8); exclua quadrado de L1C3.
75. linha 1 já tem dois quadrado (L1C6, L1C8); exclua quadrado de L1C4.
76. Na linha 2, círculo só cabe em L2C1 e L2C7; ambas as casas precisam dele.
77. coluna 2 já tem dois círculo (L7C2, L8C2); exclua círculo de L1C2.
78. coluna 5 já tem dois círculo (L5C5, L6C5); exclua círculo de L1C5.
79. coluna 7 já tem dois losango (L5C7, L6C7); exclua losango de L1C7.
80. L1C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
81. L1C7 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
82. Na coluna 4, círculo só cabe em L7C4 e L8C4; ambas as casas precisam dele.
83. Na coluna 4, círculo só cabe em L7C4 e L8C4; ambas as casas precisam dele.
84. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L7C7.
85. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L8C7.

## 18. Aprendiz — pacto-018

**Descoberta:** Horizontal ou vertical.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento.

**Origem:** pacto-018; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 34; 30 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 9; 78 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C2: quadrado — parceiro obrigatório / orientação; primeira participação no passo 36.
- L1C3: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 3.
- L1C4: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 3.
- L1C5: círculo — cota saturada; posições restantes; primeira participação no passo 25.
- L1C7: triângulo — cota saturada; primeira participação no passo 1.
- L1C8: triângulo — cota saturada; posições restantes; primeira participação no passo 1.
- L2C1: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 5.
- L2C2: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 5.
- L2C4: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 7.
- L2C5: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 28.
- L2C6: quadrado — cota saturada; primeira participação no passo 7.
- L2C7: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L3C1: losango — parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 40.
- L3C5: triângulo — cota saturada; posições restantes; primeira participação no passo 28.
- L3C6: quadrado — cota saturada; prevenção de isolamento; primeira participação no passo 31.
- L3C7: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L4C1: triângulo — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 40.
- L4C3: círculo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 57.
- L4C5: losango — prevenção de isolamento; posições restantes; primeira participação no passo 42.
- L4C7: quadrado — cota saturada; prevenção de isolamento; exclusão junto à dupla; posições restantes; primeira participação no passo 9.
- L4C8: quadrado — cota saturada; posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 9.
- L5C3: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 16.
- L5C6: triângulo — prevenção de isolamento; cota saturada; primeira participação no passo 42.
- L6C3: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 16.
- L6C8: losango — posições restantes; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 33.
- L7C1: quadrado — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 72.
- L7C3: losango — cota saturada; primeira participação no passo 14.
- L7C4: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 14.
- L7C5: círculo — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 12.
- L7C6: círculo — cota saturada; exclusão junto à dupla; primeira participação no passo 12.
- L7C8: triângulo — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 33.
- L8C4: círculo — parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; posições restantes; primeira participação no passo 52.
- L8C6: losango — prevenção de isolamento; exclusão junto à dupla; posições restantes; primeira participação no passo 53.
- L8C8: quadrado — posições restantes; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 33.

### Sequência lógica

1. linha 1 já tem dois triângulo (L1C7, L1C8); exclua triângulo de L1C1.
2. linha 1 já tem dois triângulo (L1C7, L1C8); exclua triângulo de L1C6.
3. linha 1 já tem dois losango (L1C3, L1C4); exclua losango de L1C1.
4. linha 1 já tem dois losango (L1C3, L1C4); exclua losango de L1C6.
5. linha 2 já tem dois círculo (L2C1, L2C2); exclua círculo de L2C3.
6. linha 2 já tem dois círculo (L2C1, L2C2); exclua círculo de L2C8.
7. linha 2 já tem dois quadrado (L2C4, L2C6); exclua quadrado de L2C3.
8. linha 2 já tem dois quadrado (L2C4, L2C6); exclua quadrado de L2C8.
9. linha 4 já tem dois quadrado (L4C7, L4C8); exclua quadrado de L4C2.
10. linha 4 já tem dois quadrado (L4C7, L4C8); exclua quadrado de L4C4.
11. linha 4 já tem dois quadrado (L4C7, L4C8); exclua quadrado de L4C6.
12. linha 7 já tem dois círculo (L7C5, L7C6); exclua círculo de L7C2.
13. linha 7 já tem dois círculo (L7C5, L7C6); exclua círculo de L7C7.
14. linha 7 já tem dois losango (L7C3, L7C4); exclua losango de L7C2.
15. linha 7 já tem dois losango (L7C3, L7C4); exclua losango de L7C7.
16. coluna 3 já tem dois quadrado (L5C3, L6C3); exclua quadrado de L3C3.
17. coluna 3 já tem dois quadrado (L5C3, L6C3); exclua quadrado de L8C3.
18. coluna 3 já tem dois losango (L1C3, L7C3); exclua losango de L2C3.
19. coluna 3 já tem dois losango (L1C3, L7C3); exclua losango de L3C3.
20. coluna 3 já tem dois losango (L1C3, L7C3); exclua losango de L8C3.
21. coluna 4 já tem dois losango (L1C4, L7C4); exclua losango de L3C4.
22. coluna 4 já tem dois losango (L1C4, L7C4); exclua losango de L4C4.
23. coluna 4 já tem dois losango (L1C4, L7C4); exclua losango de L5C4.
24. coluna 4 já tem dois losango (L1C4, L7C4); exclua losango de L6C4.
25. coluna 5 já tem dois círculo (L1C5, L7C5); exclua círculo de L5C5.
26. coluna 5 já tem dois círculo (L1C5, L7C5); exclua círculo de L6C5.
27. coluna 5 já tem dois círculo (L1C5, L7C5); exclua círculo de L8C5.
28. coluna 5 já tem dois triângulo (L2C5, L3C5); exclua triângulo de L5C5.
29. coluna 5 já tem dois triângulo (L2C5, L3C5); exclua triângulo de L6C5.
30. coluna 5 já tem dois triângulo (L2C5, L3C5); exclua triângulo de L8C5.
31. coluna 6 já tem dois quadrado (L2C6, L3C6); exclua quadrado de L1C6.
32. coluna 6 já tem dois quadrado (L2C6, L3C6); exclua quadrado de L6C6.
33. Na coluna 8, círculo só cabe em L3C8 e L5C8; ambas as casas precisam dele.
34. Na coluna 8, círculo só cabe em L3C8 e L5C8; ambas as casas precisam dele.
35. coluna 8 já tem dois triângulo (L1C8, L7C8); exclua triângulo de L2C8.
36. L1C2 precisa de um parceiro quadrado; só L1C1 pode recebê-lo (horizontal).
37. A dupla L2C2–L2C1 já está fechada; L3C2 não pode tocar essa dupla com outro círculo.
38. L2C3 precisa de um parceiro triângulo; só L3C3 pode recebê-lo (vertical).
39. L2C4 precisa de um parceiro quadrado; só L3C4 pode recebê-lo (vertical).
40. L3C1 precisa de um parceiro losango; só L3C2 pode recebê-lo (horizontal).
41. A dupla L3C2–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro losango.
42. L4C6 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
43. A dupla L4C7–L4C8 já está fechada; L5C7 não pode tocar essa dupla com outro quadrado.
44. A dupla L5C3–L6C3 já está fechada; L5C2 não pode tocar essa dupla com outro quadrado.
45. A dupla L5C3–L6C3 já está fechada; L5C4 não pode tocar essa dupla com outro quadrado.
46. L5C8 precisa de um parceiro círculo; só L5C7 pode recebê-lo (horizontal).
47. A dupla L6C3–L5C3 já está fechada; L6C2 não pode tocar essa dupla com outro quadrado.
48. A dupla L6C3–L5C3 já está fechada; L6C4 não pode tocar essa dupla com outro quadrado.
49. L6C8 precisa de um parceiro losango; só L6C7 pode recebê-lo (horizontal).
50. A dupla L7C6–L7C5 já está fechada; L6C6 não pode tocar essa dupla com outro círculo.
51. L7C8 precisa de um parceiro triângulo; só L7C7 pode recebê-lo (horizontal).
52. L8C4 precisa de um parceiro círculo; só L8C3 pode recebê-lo (horizontal).
53. L8C5 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
54. A dupla L8C6–L8C5 já está fechada; L8C7 não pode tocar essa dupla com outro losango.
55. L8C7 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
56. L8C8 precisa de um parceiro quadrado; só L8C7 pode recebê-lo (horizontal).
57. Na linha 4, losango só cabe em L4C5 e L4C6; ambas as casas precisam dele.
58. linha 5 já tem dois círculo (L5C7, L5C8); exclua círculo de L5C1.
59. linha 5 já tem dois círculo (L5C7, L5C8); exclua círculo de L5C2.
60. linha 5 já tem dois círculo (L5C7, L5C8); exclua círculo de L5C4.
61. linha 5 já tem dois triângulo (L5C4, L5C6); exclua triângulo de L5C1.
62. linha 5 já tem dois triângulo (L5C4, L5C6); exclua triângulo de L5C2.
63. linha 6 já tem dois losango (L6C7, L6C8); exclua losango de L6C1.
64. linha 6 já tem dois losango (L6C7, L6C8); exclua losango de L6C2.
65. linha 6 já tem dois losango (L6C7, L6C8); exclua losango de L6C5.
66. linha 6 já tem dois losango (L6C7, L6C8); exclua losango de L6C6.
67. linha 7 já tem dois triângulo (L7C7, L7C8); exclua triângulo de L7C2.
68. linha 8 já tem dois círculo (L8C3, L8C4); exclua círculo de L8C1.
69. linha 8 já tem dois círculo (L8C3, L8C4); exclua círculo de L8C2.
70. Na linha 8, triângulo só cabe em L8C1 e L8C2; ambas as casas precisam dele.
71. Na linha 8, triângulo só cabe em L8C1 e L8C2; ambas as casas precisam dele.
72. Na coluna 1, círculo só cabe em L2C1 e L6C1; ambas as casas precisam dele.
73. coluna 1 já tem dois quadrado (L1C1, L7C1); exclua quadrado de L5C1.
74. Na coluna 5, quadrado só cabe em L5C5 e L6C5; ambas as casas precisam dele.
75. L4C1 precisa de um parceiro triângulo; só L4C2 pode recebê-lo (horizontal).
76. L4C3 precisa de um parceiro círculo; só L4C4 pode recebê-lo (horizontal).
77. L5C4 precisa de um parceiro triângulo; só L6C4 pode recebê-lo (vertical).
78. L6C1 precisa de um parceiro círculo; só L6C2 pode recebê-lo (horizontal).

## 19. Aprendiz — pacto-029

**Descoberta:** Exclusão ao redor da dupla.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento.

**Origem:** pacto-029; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 34; 30 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 9; 85 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C2: círculo — cota saturada; primeira participação no passo 1.
- L1C6: losango — parceiro obrigatório / orientação; primeira participação no passo 52.
- L1C7: triângulo — parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 52.
- L1C8: quadrado — parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 53.
- L2C1: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 26.
- L2C4: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 76.
- L2C5: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 4.
- L2C6: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 4.
- L3C1: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 24.
- L3C3: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 8.
- L3C4: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 8.
- L3C5: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 43.
- L4C1: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 26.
- L4C3: círculo — parceiro obrigatório / orientação; primeira participação no passo 64.
- L4C5: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 43.
- L4C8: triângulo — prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 62.
- L5C1: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 25.
- L5C2: quadrado — cota saturada; primeira participação no passo 12.
- L5C3: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 14.
- L5C4: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 14.
- L5C6: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 12.
- L5C7: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 50.
- L6C1: triângulo — cota saturada; posições restantes; primeira participação no passo 25.
- L6C2: quadrado — cota saturada; posições restantes; primeira participação no passo 16.
- L6C6: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 16.
- L6C7: losango — parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 69.
- L7C2: triângulo — prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 73.
- L7C5: losango — parceiro obrigatório / orientação; primeira participação no passo 71.
- L7C7: círculo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 50.
- L8C1: quadrado — posições restantes; prevenção de isolamento; primeira participação no passo 26.
- L8C5: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 20.
- L8C6: círculo — cota saturada; prevenção de isolamento; primeira participação no passo 20.
- L8C8: losango — prevenção de isolamento; primeira participação no passo 74.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C3.
2. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C4.
3. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C5.
4. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C2.
5. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C3.
6. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C7.
7. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C8.
8. linha 3 já tem dois losango (L3C3, L3C4); exclua losango de L3C2.
9. linha 3 já tem dois losango (L3C3, L3C4); exclua losango de L3C6.
10. linha 3 já tem dois losango (L3C3, L3C4); exclua losango de L3C7.
11. linha 3 já tem dois losango (L3C3, L3C4); exclua losango de L3C8.
12. linha 5 já tem dois quadrado (L5C2, L5C6); exclua quadrado de L5C5.
13. linha 5 já tem dois quadrado (L5C2, L5C6); exclua quadrado de L5C8.
14. linha 5 já tem dois losango (L5C3, L5C4); exclua losango de L5C5.
15. linha 5 já tem dois losango (L5C3, L5C4); exclua losango de L5C8.
16. linha 6 já tem dois quadrado (L6C2, L6C6); exclua quadrado de L6C3.
17. linha 6 já tem dois quadrado (L6C2, L6C6); exclua quadrado de L6C4.
18. linha 6 já tem dois quadrado (L6C2, L6C6); exclua quadrado de L6C5.
19. linha 6 já tem dois quadrado (L6C2, L6C6); exclua quadrado de L6C8.
20. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C2.
21. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C3.
22. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C4.
23. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C7.
24. coluna 1 já tem dois círculo (L1C1, L3C1); exclua círculo de L7C1.
25. coluna 1 já tem dois triângulo (L5C1, L6C1); exclua triângulo de L7C1.
26. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
27. coluna 2 já tem dois quadrado (L5C2, L6C2); exclua quadrado de L2C2.
28. coluna 2 já tem dois quadrado (L5C2, L6C2); exclua quadrado de L3C2.
29. coluna 2 já tem dois quadrado (L5C2, L6C2); exclua quadrado de L4C2.
30. coluna 2 já tem dois quadrado (L5C2, L6C2); exclua quadrado de L8C2.
31. coluna 3 já tem dois losango (L3C3, L5C3); exclua losango de L1C3.
32. coluna 3 já tem dois losango (L3C3, L5C3); exclua losango de L2C3.
33. coluna 3 já tem dois losango (L3C3, L5C3); exclua losango de L6C3.
34. coluna 3 já tem dois losango (L3C3, L5C3); exclua losango de L7C3.
35. coluna 3 já tem dois losango (L3C3, L5C3); exclua losango de L8C3.
36. coluna 4 já tem dois losango (L3C4, L5C4); exclua losango de L1C4.
37. coluna 4 já tem dois losango (L3C4, L5C4); exclua losango de L4C4.
38. coluna 4 já tem dois losango (L3C4, L5C4); exclua losango de L6C4.
39. coluna 4 já tem dois losango (L3C4, L5C4); exclua losango de L7C4.
40. coluna 4 já tem dois losango (L3C4, L5C4); exclua losango de L8C4.
41. coluna 5 já tem dois círculo (L2C5, L8C5); exclua círculo de L5C5.
42. coluna 5 já tem dois círculo (L2C5, L8C5); exclua círculo de L6C5.
43. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L1C5.
44. coluna 6 já tem dois círculo (L2C6, L8C6); exclua círculo de L3C6.
45. coluna 6 já tem dois círculo (L2C6, L8C6); exclua círculo de L4C6.
46. coluna 6 já tem dois círculo (L2C6, L8C6); exclua círculo de L7C6.
47. coluna 6 já tem dois quadrado (L5C6, L6C6); exclua quadrado de L3C6.
48. coluna 6 já tem dois quadrado (L5C6, L6C6); exclua quadrado de L4C6.
49. coluna 6 já tem dois quadrado (L5C6, L6C6); exclua quadrado de L7C6.
50. coluna 7 já tem dois círculo (L5C7, L7C7); exclua círculo de L3C7.
51. coluna 7 já tem dois círculo (L5C7, L7C7); exclua círculo de L4C7.
52. L1C6 precisa de um parceiro losango; só L1C5 pode recebê-lo (horizontal).
53. L1C7 precisa de um parceiro triângulo; só L2C7 pode recebê-lo (vertical).
54. L1C8 precisa de um parceiro quadrado; só L2C8 pode recebê-lo (vertical).
55. L2C1 precisa de um parceiro losango; só L2C2 pode recebê-lo (horizontal).
56. A dupla L2C7–L1C7 já está fechada; L3C7 não pode tocar essa dupla com outro triângulo.
57. A dupla L2C8–L1C8 já está fechada; L3C8 não pode tocar essa dupla com outro quadrado.
58. L3C1 precisa de um parceiro círculo; só L3C2 pode recebê-lo (horizontal).
59. A dupla L3C2–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
60. L3C6 precisa de um parceiro triângulo; só L4C6 pode recebê-lo (vertical).
61. L3C7 precisa de um parceiro quadrado; só L4C7 pode recebê-lo (vertical).
62. L3C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
63. L4C1 precisa de um parceiro losango; só L4C2 pode recebê-lo (horizontal).
64. L4C3 precisa de um parceiro círculo; só L4C4 pode recebê-lo (horizontal).
65. A dupla L4C8–L3C8 já está fechada; L5C8 não pode tocar essa dupla com outro triângulo.
66. L5C5 precisa de um parceiro triângulo; só L6C5 pode recebê-lo (vertical).
67. A dupla L5C8–L5C7 já está fechada; L6C8 não pode tocar essa dupla com outro círculo.
68. A dupla L6C5–L5C5 já está fechada; L6C4 não pode tocar essa dupla com outro triângulo.
69. L6C7 precisa de um parceiro losango; só L6C8 pode recebê-lo (horizontal).
70. A dupla L6C8–L6C7 já está fechada; L7C8 não pode tocar essa dupla com outro losango.
71. L7C5 precisa de um parceiro losango; só L7C6 pode recebê-lo (horizontal).
72. L7C7 precisa de um parceiro círculo; só L7C8 pode recebê-lo (horizontal).
73. L8C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
74. L8C7 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
75. L8C7 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
76. Na linha 2, triângulo só cabe em L2C3 e L2C7; ambas as casas precisam dele.
77. Na linha 6, círculo só cabe em L6C3 e L6C4; ambas as casas precisam dele.
78. linha 7 já tem dois círculo (L7C7, L7C8); exclua círculo de L7C3.
79. linha 7 já tem dois círculo (L7C7, L7C8); exclua círculo de L7C4.
80. L2C3 precisa de um parceiro triângulo; só L1C3 pode recebê-lo (vertical).
81. L2C4 precisa de um parceiro quadrado; só L1C4 pode recebê-lo (vertical).
82. A dupla L7C2–L8C2 já está fechada; L7C3 não pode tocar essa dupla com outro triângulo.
83. A dupla L8C2–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro triângulo.
84. A dupla L8C3–L7C3 já está fechada; L8C4 não pode tocar essa dupla com outro quadrado.
85. L8C4 precisa de um parceiro triângulo; só L7C4 pode recebê-lo (vertical).

## 20. Aprendiz — pacto-041

**Descoberta:** Linha e coluna em sequência.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; prevenção de trio.

**Origem:** pacto-041; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 34; 30 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 10; 83 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 26.
- L1C2: triângulo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 1.
- L1C4: quadrado — posições restantes; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 33.
- L1C6: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C7: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 3.
- L1C8: losango — cota saturada; posições restantes; primeira participação no passo 3.
- L2C1: círculo — cota saturada; posições restantes; primeira participação no passo 5.
- L2C3: losango — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 8.
- L2C4: losango — cota saturada; posições restantes; primeira participação no passo 8.
- L2C5: círculo — cota saturada; exclusão junto à dupla; primeira participação no passo 5.
- L2C7: quadrado — parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 44.
- L3C4: triângulo — posições restantes; exclusão junto à dupla; primeira participação no passo 33.
- L3C6: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L3C7: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 36.
- L4C2: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 28.
- L4C3: círculo — cota saturada; parceiro obrigatório / orientação; prevenção de trio; posições restantes; primeira participação no passo 11.
- L4C7: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 11.
- L5C2: quadrado — parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; posições restantes; cota saturada; primeira participação no passo 49.
- L5C5: losango — posições restantes; primeira participação no passo 66.
- L6C3: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 18.
- L6C4: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 16.
- L6C5: quadrado — cota saturada; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 20.
- L6C6: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 20.
- L6C7: triângulo — cota saturada; posições restantes; primeira participação no passo 18.
- L6C8: círculo — cota saturada; posições restantes; primeira participação no passo 16.
- L7C1: triângulo — prevenção de isolamento; cota saturada; posições restantes; primeira participação no passo 61.
- L7C4: quadrado — posições restantes; parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; primeira participação no passo 33.
- L7C6: círculo — cota saturada; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 35.
- L8C2: círculo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 22.
- L8C3: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 24.
- L8C4: losango — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 24.
- L8C5: triângulo — prevenção de isolamento; cota saturada; primeira participação no passo 59.
- L8C6: círculo — cota saturada; exclusão junto à dupla; primeira participação no passo 22.
- L8C8: quadrado — posições restantes; primeira participação no passo 82.

### Sequência lógica

1. linha 1 já tem dois triângulo (L1C2, L1C6); exclua triângulo de L1C3.
2. linha 1 já tem dois triângulo (L1C2, L1C6); exclua triângulo de L1C5.
3. linha 1 já tem dois losango (L1C7, L1C8); exclua losango de L1C3.
4. linha 1 já tem dois losango (L1C7, L1C8); exclua losango de L1C5.
5. linha 2 já tem dois círculo (L2C1, L2C5); exclua círculo de L2C2.
6. linha 2 já tem dois círculo (L2C1, L2C5); exclua círculo de L2C6.
7. linha 2 já tem dois círculo (L2C1, L2C5); exclua círculo de L2C8.
8. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C2.
9. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C6.
10. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C8.
11. linha 4 já tem dois círculo (L4C3, L4C7); exclua círculo de L4C1.
12. linha 4 já tem dois círculo (L4C3, L4C7); exclua círculo de L4C4.
13. linha 4 já tem dois círculo (L4C3, L4C7); exclua círculo de L4C5.
14. linha 4 já tem dois círculo (L4C3, L4C7); exclua círculo de L4C6.
15. linha 4 já tem dois círculo (L4C3, L4C7); exclua círculo de L4C8.
16. linha 6 já tem dois círculo (L6C4, L6C8); exclua círculo de L6C1.
17. linha 6 já tem dois círculo (L6C4, L6C8); exclua círculo de L6C2.
18. linha 6 já tem dois triângulo (L6C3, L6C7); exclua triângulo de L6C1.
19. linha 6 já tem dois triângulo (L6C3, L6C7); exclua triângulo de L6C2.
20. linha 6 já tem dois quadrado (L6C5, L6C6); exclua quadrado de L6C1.
21. linha 6 já tem dois quadrado (L6C5, L6C6); exclua quadrado de L6C2.
22. linha 8 já tem dois círculo (L8C2, L8C6); exclua círculo de L8C1.
23. linha 8 já tem dois círculo (L8C2, L8C6); exclua círculo de L8C7.
24. linha 8 já tem dois losango (L8C3, L8C4); exclua losango de L8C1.
25. linha 8 já tem dois losango (L8C3, L8C4); exclua losango de L8C7.
26. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L3C1.
27. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L5C1.
28. coluna 2 já tem dois losango (L4C2, L6C2); exclua losango de L3C2.
29. coluna 2 já tem dois losango (L4C2, L6C2); exclua losango de L7C2.
30. coluna 3 já tem dois losango (L2C3, L8C3); exclua losango de L3C3.
31. coluna 3 já tem dois losango (L2C3, L8C3); exclua losango de L5C3.
32. coluna 3 já tem dois losango (L2C3, L8C3); exclua losango de L7C3.
33. Na coluna 4, círculo só cabe em L5C4 e L6C4; ambas as casas precisam dele.
34. Na coluna 4, triângulo só cabe em L3C4 e L4C4; ambas as casas precisam dele.
35. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L5C6.
36. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L5C7.
37. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L7C7.
38. L1C2 precisa de um parceiro triângulo; só L2C2 pode recebê-lo (vertical).
39. L1C3 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
40. A dupla L1C4–L1C3 já está fechada; L1C5 não pode tocar essa dupla com outro quadrado.
41. L1C6 precisa de um parceiro triângulo; só L2C6 pode recebê-lo (vertical).
42. A dupla L2C2–L1C2 já está fechada; L3C2 não pode tocar essa dupla com outro triângulo.
43. A dupla L2C5–L1C5 já está fechada; L3C5 não pode tocar essa dupla com outro círculo.
44. L2C7 precisa de um parceiro quadrado; só L2C8 pode recebê-lo (horizontal).
45. A dupla L2C8–L2C7 já está fechada; L3C8 não pode tocar essa dupla com outro quadrado.
46. A dupla L3C4–L4C4 já está fechada; L3C3 não pode tocar essa dupla com outro triângulo.
47. A dupla L3C4–L4C4 já está fechada; L3C5 não pode tocar essa dupla com outro triângulo.
48. A dupla L3C7–L4C7 já está fechada; L3C8 não pode tocar essa dupla com outro círculo.
49. L4C2 precisa de um parceiro losango; só L4C1 pode recebê-lo (horizontal).
50. A dupla L4C4–L3C4 já está fechada; L4C5 não pode tocar essa dupla com outro triângulo.
51. L5C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
52. L5C1 não pode ser losango: tocaria L4C1 e L6C1, formando um grupo maior que dois.
53. A dupla L5C2–L5C1 já está fechada; L5C3 não pode tocar essa dupla com outro quadrado.
54. L5C3 não pode ser círculo: tocaria L4C3 e L5C4, formando um grupo maior que dois.
55. A dupla L6C3–L5C3 já está fechada; L7C3 não pode tocar essa dupla com outro triângulo.
56. A dupla L6C5–L6C6 já está fechada; L7C5 não pode tocar essa dupla com outro quadrado.
57. A dupla L6C6–L6C5 já está fechada; L5C6 não pode tocar essa dupla com outro quadrado.
58. L7C4 precisa de um parceiro quadrado; só L7C3 pode recebê-lo (horizontal).
59. L7C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
60. A dupla L7C6–L8C6 já está fechada; L7C5 não pode tocar essa dupla com outro círculo.
61. L8C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
62. L8C2 precisa de um parceiro círculo; só L7C2 pode recebê-lo (vertical).
63. linha 4 já tem dois losango (L4C1, L4C2); exclua losango de L4C5.
64. linha 4 já tem dois losango (L4C1, L4C2); exclua losango de L4C6.
65. linha 4 já tem dois losango (L4C1, L4C2); exclua losango de L4C8.
66. Na linha 5, círculo só cabe em L5C4 e L5C8; ambas as casas precisam dele.
67. linha 5 já tem dois quadrado (L5C1, L5C2); exclua quadrado de L5C7.
68. linha 7 já tem dois círculo (L7C2, L7C6); exclua círculo de L7C8.
69. linha 7 já tem dois triângulo (L7C1, L7C5); exclua triângulo de L7C7.
70. linha 7 já tem dois triângulo (L7C1, L7C5); exclua triângulo de L7C8.
71. linha 7 já tem dois quadrado (L7C3, L7C4); exclua quadrado de L7C7.
72. linha 7 já tem dois quadrado (L7C3, L7C4); exclua quadrado de L7C8.
73. linha 8 já tem dois triângulo (L8C1, L8C5); exclua triângulo de L8C7.
74. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L3C1.
75. Na coluna 1, quadrado só cabe em L3C1 e L5C1; ambas as casas precisam dele.
76. coluna 2 já tem dois círculo (L7C2, L8C2); exclua círculo de L3C2.
77. Na coluna 3, círculo só cabe em L3C3 e L4C3; ambas as casas precisam dele.
78. coluna 5 já tem dois quadrado (L4C5, L6C5); exclua quadrado de L3C5.
79. coluna 6 já tem dois triângulo (L1C6, L2C6); exclua triângulo de L4C6.
80. coluna 6 já tem dois triângulo (L1C6, L2C6); exclua triângulo de L5C6.
81. Na coluna 7, triângulo só cabe em L5C7 e L6C7; ambas as casas precisam dele.
82. Na coluna 8, triângulo só cabe em L3C8 e L4C8; ambas as casas precisam dele.
83. Na coluna 8, triângulo só cabe em L3C8 e L4C8; ambas as casas precisam dele.

## 21. Aprendiz — pacto-056

**Descoberta:** Parceiro de canto e borda.

**Técnicas combinadas:** cota saturada; posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação; prevenção de isolamento.

**Origem:** pacto-056; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 10; 110 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C3: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L1C5: círculo — cota saturada; posições restantes; primeira participação no passo 1.
- L2C2: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 100.
- L2C3: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 7.
- L2C5: círculo — cota saturada; primeira participação no passo 7.
- L3C1: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 12.
- L3C2: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 12.
- L4C1: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 28.
- L4C4: losango — posições restantes; exclusão junto à dupla; primeira participação no passo 39.
- L4C6: quadrado — cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 49.
- L5C4: triângulo — cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 36.
- L5C6: círculo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 73.
- L6C1: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 28.
- L6C4: triângulo — cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 18.
- L6C7: losango — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 62.
- L6C8: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 18.
- L7C3: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 25.
- L7C4: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 22.
- L7C5: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 25.
- L7C6: triângulo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 63.
- L7C8: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 22.
- L8C4: círculo — cota saturada; posições restantes; primeira participação no passo 35.
- L8C5: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 45.
- L8C6: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 49.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C3, L1C5); exclua círculo de L1C1.
2. linha 1 já tem dois círculo (L1C3, L1C5); exclua círculo de L1C2.
3. linha 1 já tem dois círculo (L1C3, L1C5); exclua círculo de L1C4.
4. linha 1 já tem dois círculo (L1C3, L1C5); exclua círculo de L1C6.
5. linha 1 já tem dois círculo (L1C3, L1C5); exclua círculo de L1C7.
6. linha 1 já tem dois círculo (L1C3, L1C5); exclua círculo de L1C8.
7. linha 2 já tem dois círculo (L2C3, L2C5); exclua círculo de L2C1.
8. linha 2 já tem dois círculo (L2C3, L2C5); exclua círculo de L2C4.
9. linha 2 já tem dois círculo (L2C3, L2C5); exclua círculo de L2C6.
10. linha 2 já tem dois círculo (L2C3, L2C5); exclua círculo de L2C7.
11. linha 2 já tem dois círculo (L2C3, L2C5); exclua círculo de L2C8.
12. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C3.
13. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C4.
14. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C5.
15. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C6.
16. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C7.
17. linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C8.
18. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C2.
19. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C3.
20. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C5.
21. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C6.
22. linha 7 já tem dois círculo (L7C4, L7C8); exclua círculo de L7C1.
23. linha 7 já tem dois círculo (L7C4, L7C8); exclua círculo de L7C2.
24. linha 7 já tem dois círculo (L7C4, L7C8); exclua círculo de L7C7.
25. linha 7 já tem dois losango (L7C3, L7C5); exclua losango de L7C1.
26. linha 7 já tem dois losango (L7C3, L7C5); exclua losango de L7C2.
27. linha 7 já tem dois losango (L7C3, L7C5); exclua losango de L7C7.
28. coluna 1 já tem dois círculo (L4C1, L6C1); exclua círculo de L5C1.
29. coluna 1 já tem dois círculo (L4C1, L6C1); exclua círculo de L8C1.
30. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L3C3.
31. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L4C3.
32. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L5C3.
33. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L6C3.
34. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L8C3.
35. coluna 4 já tem dois círculo (L7C4, L8C4); exclua círculo de L3C4.
36. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L1C4.
37. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L2C4.
38. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L3C4.
39. Na coluna 4, quadrado só cabe em L1C4 e L2C4; ambas as casas precisam dele.
40. Na coluna 4, quadrado só cabe em L1C4 e L2C4; ambas as casas precisam dele.
41. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L3C5.
42. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L4C5.
43. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L5C5.
44. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L6C5.
45. coluna 5 já tem dois losango (L7C5, L8C5); exclua losango de L3C5.
46. coluna 5 já tem dois losango (L7C5, L8C5); exclua losango de L4C5.
47. coluna 5 já tem dois losango (L7C5, L8C5); exclua losango de L5C5.
48. coluna 5 já tem dois losango (L7C5, L8C5); exclua losango de L6C5.
49. coluna 6 já tem dois quadrado (L4C6, L8C6); exclua quadrado de L1C6.
50. coluna 6 já tem dois quadrado (L4C6, L8C6); exclua quadrado de L2C6.
51. coluna 6 já tem dois quadrado (L4C6, L8C6); exclua quadrado de L6C6.
52. A dupla L3C1–L3C2 já está fechada; L2C1 não pode tocar essa dupla com outro quadrado.
53. A dupla L3C2–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro quadrado.
54. A dupla L3C4–L4C4 já está fechada; L3C3 não pode tocar essa dupla com outro losango.
55. L4C1 precisa de um parceiro círculo; só L4C2 pode recebê-lo (horizontal).
56. A dupla L4C2–L4C1 já está fechada; L5C2 não pode tocar essa dupla com outro círculo.
57. A dupla L4C4–L3C4 já está fechada; L4C3 não pode tocar essa dupla com outro losango.
58. A dupla L5C4–L6C4 já está fechada; L5C3 não pode tocar essa dupla com outro triângulo.
59. A dupla L5C4–L6C4 já está fechada; L5C5 não pode tocar essa dupla com outro triângulo.
60. A dupla L5C5–L6C5 já está fechada; L4C5 não pode tocar essa dupla com outro quadrado.
61. L6C1 precisa de um parceiro círculo; só L6C2 pode recebê-lo (horizontal).
62. L6C8 precisa de um parceiro triângulo; só L5C8 pode recebê-lo (vertical).
63. L7C6 precisa de um parceiro triângulo; só L7C7 pode recebê-lo (horizontal).
64. A dupla L7C7–L7C6 já está fechada; L8C7 não pode tocar essa dupla com outro triângulo.
65. L7C8 precisa de um parceiro círculo; só L8C8 pode recebê-lo (vertical).
66. L8C2 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
67. L8C6 precisa de um parceiro quadrado; só L8C7 pode recebê-lo (horizontal).
68. linha 3 já tem dois triângulo (L3C3, L3C5); exclua triângulo de L3C6.
69. linha 3 já tem dois triângulo (L3C3, L3C5); exclua triângulo de L3C7.
70. linha 3 já tem dois triângulo (L3C3, L3C5); exclua triângulo de L3C8.
71. linha 4 já tem dois círculo (L4C1, L4C2); exclua círculo de L4C7.
72. linha 4 já tem dois círculo (L4C1, L4C2); exclua círculo de L4C8.
73. Na linha 5, círculo só cabe em L5C6 e L5C7; ambas as casas precisam dele.
74. linha 5 já tem dois triângulo (L5C4, L5C8); exclua triângulo de L5C1.
75. linha 5 já tem dois triângulo (L5C4, L5C8); exclua triângulo de L5C2.
76. linha 6 já tem dois círculo (L6C1, L6C2); exclua círculo de L6C6.
77. Na linha 6, quadrado só cabe em L6C3 e L6C5; ambas as casas precisam dele.
78. linha 7 já tem dois triângulo (L7C6, L7C7); exclua triângulo de L7C1.
79. linha 7 já tem dois triângulo (L7C6, L7C7); exclua triângulo de L7C2.
80. linha 8 já tem dois quadrado (L8C6, L8C7); exclua quadrado de L8C1.
81. linha 8 já tem dois quadrado (L8C6, L8C7); exclua quadrado de L8C2.
82. linha 8 já tem dois quadrado (L8C6, L8C7); exclua quadrado de L8C3.
83. coluna 1 já tem dois quadrado (L3C1, L7C1); exclua quadrado de L1C1.
84. coluna 1 já tem dois quadrado (L3C1, L7C1); exclua quadrado de L5C1.
85. coluna 2 já tem dois quadrado (L3C2, L7C2); exclua quadrado de L1C2.
86. coluna 2 já tem dois quadrado (L3C2, L7C2); exclua quadrado de L5C2.
87. Na coluna 6, círculo só cabe em L3C6 e L5C6; ambas as casas precisam dele.
88. Na coluna 7, círculo só cabe em L3C7 e L5C7; ambas as casas precisam dele.
89. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L3C8.
90. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L1C8.
91. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L2C8.
92. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L4C8.
93. L3C3 precisa de um parceiro triângulo; só L4C3 pode recebê-lo (vertical).
94. L4C6 precisa de um parceiro quadrado; só L4C7 pode recebê-lo (horizontal).
95. A dupla L4C7–L4C6 já está fechada; L4C8 não pode tocar essa dupla com outro quadrado.
96. A dupla L5C2–L5C1 já está fechada; L5C3 não pode tocar essa dupla com outro losango.
97. L7C3 precisa de um parceiro losango; só L8C3 pode recebê-lo (vertical).
98. A dupla L8C3–L7C3 já está fechada; L8C2 não pode tocar essa dupla com outro losango.
99. Na linha 8, triângulo só cabe em L8C1 e L8C2; ambas as casas precisam dele.
100. coluna 2 já tem dois triângulo (L2C2, L8C2); exclua triângulo de L1C2.
101. coluna 7 já tem dois quadrado (L4C7, L8C7); exclua quadrado de L1C7.
102. coluna 7 já tem dois quadrado (L4C7, L8C7); exclua quadrado de L2C7.
103. Na coluna 8, quadrado só cabe em L1C8 e L2C8; ambas as casas precisam dele.
104. Na coluna 8, quadrado só cabe em L1C8 e L2C8; ambas as casas precisam dele.
105. L1C2 precisa de um parceiro losango; só L1C1 pode recebê-lo (horizontal).
106. L2C2 precisa de um parceiro triângulo; só L2C1 pode recebê-lo (horizontal).
107. Na linha 1, triângulo só cabe em L1C6 e L1C7; ambas as casas precisam dele.
108. Na linha 1, triângulo só cabe em L1C6 e L1C7; ambas as casas precisam dele.
109. linha 2 já tem dois triângulo (L2C1, L2C2); exclua triângulo de L2C6.
110. linha 2 já tem dois triângulo (L2C1, L2C2); exclua triângulo de L2C7.

## 22. Aprendiz — pacto-057

**Descoberta:** Duas ocorrências, duas posições.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes.

**Origem:** pacto-057; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 10; 105 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C3: quadrado — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 30.
- L1C8: losango — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 25.
- L2C1: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C3: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 16.
- L2C4: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C6: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 3.
- L2C7: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 3.
- L2C8: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 25.
- L3C3: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 5.
- L3C7: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 5.
- L3C8: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 22.
- L4C3: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 14.
- L4C4: quadrado — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 37.
- L4C8: triângulo — cota saturada; posições restantes; primeira participação no passo 22.
- L5C3: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 16.
- L5C4: losango — parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 37.
- L6C1: losango — posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 91.
- L6C2: quadrado — posições restantes; cota saturada; primeira participação no passo 63.
- L6C5: círculo — posições restantes; exclusão junto à dupla; primeira participação no passo 74.
- L7C5: quadrado — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 18.
- L8C3: losango — posições restantes; primeira participação no passo 69.
- L8C5: quadrado — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 10.
- L8C6: círculo — parceiro obrigatório / orientação; primeira participação no passo 88.
- L8C8: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 10.

### Sequência lógica

1. linha 2 já tem dois círculo (L2C1, L2C4); exclua círculo de L2C2.
2. linha 2 já tem dois círculo (L2C1, L2C4); exclua círculo de L2C5.
3. linha 2 já tem dois quadrado (L2C6, L2C7); exclua quadrado de L2C2.
4. linha 2 já tem dois quadrado (L2C6, L2C7); exclua quadrado de L2C5.
5. linha 3 já tem dois círculo (L3C3, L3C7); exclua círculo de L3C1.
6. linha 3 já tem dois círculo (L3C3, L3C7); exclua círculo de L3C2.
7. linha 3 já tem dois círculo (L3C3, L3C7); exclua círculo de L3C4.
8. linha 3 já tem dois círculo (L3C3, L3C7); exclua círculo de L3C5.
9. linha 3 já tem dois círculo (L3C3, L3C7); exclua círculo de L3C6.
10. linha 8 já tem dois quadrado (L8C5, L8C8); exclua quadrado de L8C1.
11. linha 8 já tem dois quadrado (L8C5, L8C8); exclua quadrado de L8C2.
12. linha 8 já tem dois quadrado (L8C5, L8C8); exclua quadrado de L8C4.
13. linha 8 já tem dois quadrado (L8C5, L8C8); exclua quadrado de L8C7.
14. coluna 3 já tem dois círculo (L3C3, L4C3); exclua círculo de L6C3.
15. coluna 3 já tem dois círculo (L3C3, L4C3); exclua círculo de L7C3.
16. coluna 3 já tem dois triângulo (L2C3, L5C3); exclua triângulo de L6C3.
17. coluna 3 já tem dois triângulo (L2C3, L5C3); exclua triângulo de L7C3.
18. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L1C5.
19. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L3C5.
20. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L4C5.
21. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L5C5.
22. coluna 8 já tem dois triângulo (L3C8, L4C8); exclua triângulo de L5C8.
23. coluna 8 já tem dois triângulo (L3C8, L4C8); exclua triângulo de L6C8.
24. coluna 8 já tem dois triângulo (L3C8, L4C8); exclua triângulo de L7C8.
25. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L5C8.
26. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L6C8.
27. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L7C8.
28. A dupla L1C8–L2C8 já está fechada; L1C7 não pode tocar essa dupla com outro losango.
29. L2C1 precisa de um parceiro círculo; só L1C1 pode recebê-lo (vertical).
30. L2C3 precisa de um parceiro triângulo; só L2C2 pode recebê-lo (horizontal).
31. L2C4 precisa de um parceiro círculo; só L1C4 pode recebê-lo (vertical).
32. A dupla L2C6–L2C7 já está fechada; L1C6 não pode tocar essa dupla com outro quadrado.
33. A dupla L2C6–L2C7 já está fechada; L3C6 não pode tocar essa dupla com outro quadrado.
34. A dupla L2C7–L2C6 já está fechada; L1C7 não pode tocar essa dupla com outro quadrado.
35. L3C7 precisa de um parceiro círculo; só L4C7 pode recebê-lo (vertical).
36. A dupla L4C3–L3C3 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
37. L4C4 precisa de um parceiro quadrado; só L3C4 pode recebê-lo (vertical).
38. A dupla L4C7–L3C7 já está fechada; L5C7 não pode tocar essa dupla com outro círculo.
39. A dupla L4C7–L3C7 já está fechada; L4C6 não pode tocar essa dupla com outro círculo.
40. L5C3 precisa de um parceiro triângulo; só L5C2 pode recebê-lo (horizontal).
41. A dupla L7C5–L8C5 já está fechada; L7C4 não pode tocar essa dupla com outro quadrado.
42. A dupla L7C5–L8C5 já está fechada; L7C6 não pode tocar essa dupla com outro quadrado.
43. L8C8 precisa de um parceiro quadrado; só L7C8 pode recebê-lo (vertical).
44. linha 1 já tem dois círculo (L1C1, L1C4); exclua círculo de L1C2.
45. linha 1 já tem dois círculo (L1C1, L1C4); exclua círculo de L1C5.
46. linha 1 já tem dois círculo (L1C1, L1C4); exclua círculo de L1C6.
47. linha 1 já tem dois círculo (L1C1, L1C4); exclua círculo de L1C7.
48. Na linha 1, quadrado só cabe em L1C2 e L1C3; ambas as casas precisam dele.
49. linha 2 já tem dois triângulo (L2C2, L2C3); exclua triângulo de L2C5.
50. linha 4 já tem dois círculo (L4C3, L4C7); exclua círculo de L4C1.
51. linha 4 já tem dois círculo (L4C3, L4C7); exclua círculo de L4C5.
52. linha 5 já tem dois triângulo (L5C2, L5C3); exclua triângulo de L5C1.
53. linha 5 já tem dois triângulo (L5C2, L5C3); exclua triângulo de L5C5.
54. linha 5 já tem dois triângulo (L5C2, L5C3); exclua triângulo de L5C6.
55. linha 5 já tem dois triângulo (L5C2, L5C3); exclua triângulo de L5C7.
56. linha 7 já tem dois quadrado (L7C5, L7C8); exclua quadrado de L7C1.
57. linha 7 já tem dois quadrado (L7C5, L7C8); exclua quadrado de L7C2.
58. linha 7 já tem dois quadrado (L7C5, L7C8); exclua quadrado de L7C3.
59. linha 7 já tem dois quadrado (L7C5, L7C8); exclua quadrado de L7C7.
60. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L5C1.
61. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L7C1.
62. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L8C1.
63. Na coluna 2, círculo só cabe em L7C2 e L8C2; ambas as casas precisam dele.
64. Na coluna 2, círculo só cabe em L7C2 e L8C2; ambas as casas precisam dele.
65. coluna 2 já tem dois triângulo (L2C2, L5C2); exclua triângulo de L3C2.
66. coluna 2 já tem dois triângulo (L2C2, L5C2); exclua triângulo de L4C2.
67. coluna 2 já tem dois quadrado (L1C2, L6C2); exclua quadrado de L3C2.
68. coluna 2 já tem dois quadrado (L1C2, L6C2); exclua quadrado de L4C2.
69. Na coluna 3, quadrado só cabe em L1C3 e L6C3; ambas as casas precisam dele.
70. coluna 4 já tem dois círculo (L1C4, L2C4); exclua círculo de L6C4.
71. coluna 4 já tem dois círculo (L1C4, L2C4); exclua círculo de L7C4.
72. coluna 4 já tem dois círculo (L1C4, L2C4); exclua círculo de L8C4.
73. coluna 4 já tem dois quadrado (L3C4, L4C4); exclua quadrado de L6C4.
74. Na coluna 5, círculo só cabe em L5C5 e L6C5; ambas as casas precisam dele.
75. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L6C7.
76. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L7C7.
77. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L8C7.
78. Na coluna 8, círculo só cabe em L5C8 e L6C8; ambas as casas precisam dele.
79. Na coluna 8, círculo só cabe em L5C8 e L6C8; ambas as casas precisam dele.
80. L1C7 precisa de um parceiro triângulo; só L1C6 pode recebê-lo (horizontal).
81. A dupla L3C2–L4C2 já está fechada; L3C1 não pode tocar essa dupla com outro losango.
82. A dupla L4C2–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro losango.
83. L5C4 precisa de um parceiro losango; só L6C4 pode recebê-lo (vertical).
84. A dupla L5C5–L6C5 já está fechada; L5C6 não pode tocar essa dupla com outro círculo.
85. A dupla L6C4–L5C4 já está fechada; L7C4 não pode tocar essa dupla com outro losango.
86. A dupla L6C5–L5C5 já está fechada; L6C6 não pode tocar essa dupla com outro círculo.
87. L7C4 precisa de um parceiro triângulo; só L8C4 pode recebê-lo (vertical).
88. L8C6 precisa de um parceiro círculo; só L7C6 pode recebê-lo (vertical).
89. linha 1 já tem dois triângulo (L1C6, L1C7); exclua triângulo de L1C5.
90. Na linha 3, quadrado só cabe em L3C1 e L3C4; ambas as casas precisam dele.
91. Na linha 6, triângulo só cabe em L6C6 e L6C7; ambas as casas precisam dele.
92. Na linha 6, triângulo só cabe em L6C6 e L6C7; ambas as casas precisam dele.
93. Na coluna 5, triângulo só cabe em L3C5 e L4C5; ambas as casas precisam dele.
94. Na coluna 5, triângulo só cabe em L3C5 e L4C5; ambas as casas precisam dele.
95. coluna 6 já tem dois triângulo (L1C6, L6C6); exclua triângulo de L3C6.
96. coluna 6 já tem dois triângulo (L1C6, L6C6); exclua triângulo de L4C6.
97. coluna 7 já tem dois triângulo (L1C7, L6C7); exclua triângulo de L7C7.
98. coluna 7 já tem dois triângulo (L1C7, L6C7); exclua triângulo de L8C7.
99. Na coluna 7, quadrado só cabe em L2C7 e L5C7; ambas as casas precisam dele.
100. L3C1 precisa de um parceiro quadrado; só L4C1 pode recebê-lo (vertical).
101. L3C6 precisa de um parceiro losango; só L4C6 pode recebê-lo (vertical).
102. A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro quadrado.
103. A dupla L4C6–L3C6 já está fechada; L5C6 não pode tocar essa dupla com outro losango.
104. A dupla L6C1–L5C1 já está fechada; L7C1 não pode tocar essa dupla com outro losango.
105. L7C1 precisa de um parceiro triângulo; só L8C1 pode recebê-lo (vertical).

## 23. Aprendiz — pacto-023

**Descoberta:** Horizontal ou vertical.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes.

**Origem:** pacto-023; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 34; 30 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 11; 86 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: losango — parceiro obrigatório / orientação; primeira participação no passo 48.
- L1C2: círculo — parceiro obrigatório / orientação; primeira participação no passo 48.
- L1C3: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 1.
- L1C4: triângulo — cota saturada; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 1.
- L1C7: quadrado — cota saturada; posições restantes; primeira participação no passo 3.
- L1C8: quadrado — cota saturada; primeira participação no passo 3.
- L2C3: quadrado — prevenção de isolamento; primeira participação no passo 51.
- L2C5: círculo — prevenção de isolamento; parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 51.
- L2C8: triângulo — exclusão junto à dupla; primeira participação no passo 81.
- L3C2: losango — cota saturada; prevenção de isolamento; primeira participação no passo 5.
- L3C5: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 5.
- L3C6: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 38.
- L4C1: quadrado — cota saturada; prevenção de isolamento; exclusão junto à dupla; posições restantes; primeira participação no passo 10.
- L4C2: losango — cota saturada; posições restantes; primeira participação no passo 32.
- L4C6: quadrado — cota saturada; posições restantes; primeira participação no passo 10.
- L4C7: triângulo — posições restantes; primeira participação no passo 79.
- L5C3: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 35.
- L5C5: quadrado — posições restantes; primeira participação no passo 68.
- L6C1: triângulo — cota saturada; prevenção de isolamento; primeira participação no passo 14.
- L6C4: círculo — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 58.
- L6C5: quadrado — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 58.
- L6C6: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 14.
- L7C1: círculo — cota saturada; primeira participação no passo 18.
- L7C2: triângulo — cota saturada; primeira participação no passo 19.
- L7C4: losango — parceiro obrigatório / orientação; primeira participação no passo 58.
- L7C5: triângulo — cota saturada; posições restantes; primeira participação no passo 19.
- L7C6: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 18.
- L7C7: quadrado — cota saturada; posições restantes; primeira participação no passo 20.
- L7C8: quadrado — cota saturada; primeira participação no passo 20.
- L8C1: círculo — cota saturada; primeira participação no passo 27.
- L8C2: triângulo — cota saturada; primeira participação no passo 21.
- L8C5: triângulo — cota saturada; posições restantes; primeira participação no passo 21.
- L8C7: losango — cota saturada; posições restantes; primeira participação no passo 24.
- L8C8: losango — cota saturada; primeira participação no passo 24.

### Sequência lógica

1. linha 1 já tem dois triângulo (L1C3, L1C4); exclua triângulo de L1C5.
2. linha 1 já tem dois triângulo (L1C3, L1C4); exclua triângulo de L1C6.
3. linha 1 já tem dois quadrado (L1C7, L1C8); exclua quadrado de L1C5.
4. linha 1 já tem dois quadrado (L1C7, L1C8); exclua quadrado de L1C6.
5. linha 3 já tem dois losango (L3C2, L3C5); exclua losango de L3C1.
6. linha 3 já tem dois losango (L3C2, L3C5); exclua losango de L3C3.
7. linha 3 já tem dois losango (L3C2, L3C5); exclua losango de L3C4.
8. linha 3 já tem dois losango (L3C2, L3C5); exclua losango de L3C7.
9. linha 3 já tem dois losango (L3C2, L3C5); exclua losango de L3C8.
10. linha 4 já tem dois quadrado (L4C1, L4C6); exclua quadrado de L4C3.
11. linha 4 já tem dois quadrado (L4C1, L4C6); exclua quadrado de L4C4.
12. linha 4 já tem dois quadrado (L4C1, L4C6); exclua quadrado de L4C5.
13. linha 4 já tem dois quadrado (L4C1, L4C6); exclua quadrado de L4C8.
14. linha 6 já tem dois triângulo (L6C1, L6C6); exclua triângulo de L6C2.
15. linha 6 já tem dois triângulo (L6C1, L6C6); exclua triângulo de L6C3.
16. linha 6 já tem dois triângulo (L6C1, L6C6); exclua triângulo de L6C7.
17. linha 6 já tem dois triângulo (L6C1, L6C6); exclua triângulo de L6C8.
18. linha 7 já tem dois círculo (L7C1, L7C6); exclua círculo de L7C3.
19. linha 7 já tem dois triângulo (L7C2, L7C5); exclua triângulo de L7C3.
20. linha 7 já tem dois quadrado (L7C7, L7C8); exclua quadrado de L7C3.
21. linha 8 já tem dois triângulo (L8C2, L8C5); exclua triângulo de L8C3.
22. linha 8 já tem dois triângulo (L8C2, L8C5); exclua triângulo de L8C4.
23. linha 8 já tem dois triângulo (L8C2, L8C5); exclua triângulo de L8C6.
24. linha 8 já tem dois losango (L8C7, L8C8); exclua losango de L8C3.
25. linha 8 já tem dois losango (L8C7, L8C8); exclua losango de L8C4.
26. linha 8 já tem dois losango (L8C7, L8C8); exclua losango de L8C6.
27. coluna 1 já tem dois círculo (L7C1, L8C1); exclua círculo de L2C1.
28. coluna 1 já tem dois círculo (L7C1, L8C1); exclua círculo de L3C1.
29. coluna 1 já tem dois círculo (L7C1, L8C1); exclua círculo de L5C1.
30. coluna 2 já tem dois triângulo (L7C2, L8C2); exclua triângulo de L2C2.
31. coluna 2 já tem dois triângulo (L7C2, L8C2); exclua triângulo de L5C2.
32. coluna 2 já tem dois losango (L3C2, L4C2); exclua losango de L2C2.
33. coluna 2 já tem dois losango (L3C2, L4C2); exclua losango de L5C2.
34. coluna 2 já tem dois losango (L3C2, L4C2); exclua losango de L6C2.
35. coluna 3 já tem dois losango (L5C3, L7C3); exclua losango de L4C3.
36. coluna 3 já tem dois losango (L5C3, L7C3); exclua losango de L6C3.
37. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L4C5.
38. coluna 6 já tem dois quadrado (L3C6, L4C6); exclua quadrado de L2C6.
39. coluna 6 já tem dois quadrado (L3C6, L4C6); exclua quadrado de L5C6.
40. coluna 6 já tem dois quadrado (L3C6, L4C6); exclua quadrado de L8C6.
41. coluna 7 já tem dois quadrado (L1C7, L7C7); exclua quadrado de L2C7.
42. coluna 7 já tem dois quadrado (L1C7, L7C7); exclua quadrado de L3C7.
43. coluna 7 já tem dois quadrado (L1C7, L7C7); exclua quadrado de L5C7.
44. coluna 7 já tem dois quadrado (L1C7, L7C7); exclua quadrado de L6C7.
45. coluna 8 já tem dois quadrado (L1C8, L7C8); exclua quadrado de L3C8.
46. coluna 8 já tem dois quadrado (L1C8, L7C8); exclua quadrado de L5C8.
47. coluna 8 já tem dois quadrado (L1C8, L7C8); exclua quadrado de L6C8.
48. L1C1 precisa de um parceiro losango; só L2C1 pode recebê-lo (vertical).
49. L1C2 precisa de um parceiro círculo; só L2C2 pode recebê-lo (vertical).
50. A dupla L1C4–L1C3 já está fechada; L2C4 não pode tocar essa dupla com outro triângulo.
51. L2C4 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
52. L3C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
53. L3C5 precisa de um parceiro losango; só L4C5 pode recebê-lo (vertical).
54. A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro quadrado.
55. A dupla L4C5–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro losango.
56. L5C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
57. L5C3 precisa de um parceiro losango; só L5C4 pode recebê-lo (horizontal).
58. L6C4 precisa de um parceiro círculo; só L6C3 pode recebê-lo (horizontal).
59. L6C6 precisa de um parceiro triângulo; só L5C6 pode recebê-lo (vertical).
60. linha 2 já tem dois círculo (L2C2, L2C5); exclua círculo de L2C4.
61. linha 2 já tem dois círculo (L2C2, L2C5); exclua círculo de L2C6.
62. linha 2 já tem dois círculo (L2C2, L2C5); exclua círculo de L2C7.
63. linha 3 já tem dois quadrado (L3C1, L3C6); exclua quadrado de L3C3.
64. linha 3 já tem dois quadrado (L3C1, L3C6); exclua quadrado de L3C4.
65. linha 4 já tem dois losango (L4C2, L4C5); exclua losango de L4C8.
66. linha 5 já tem dois triângulo (L5C1, L5C6); exclua triângulo de L5C7.
67. linha 5 já tem dois triângulo (L5C1, L5C6); exclua triângulo de L5C8.
68. Na linha 5, quadrado só cabe em L5C2 e L5C5; ambas as casas precisam dele.
69. linha 5 já tem dois losango (L5C3, L5C4); exclua losango de L5C7.
70. linha 5 já tem dois losango (L5C3, L5C4); exclua losango de L5C8.
71. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C2.
72. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C7.
73. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C8.
74. linha 8 já tem dois círculo (L8C1, L8C6); exclua círculo de L8C3.
75. linha 8 já tem dois círculo (L8C1, L8C6); exclua círculo de L8C4.
76. Na coluna 5, círculo só cabe em L1C5 e L2C5; ambas as casas precisam dele.
77. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L1C6.
78. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L2C6.
79. Na coluna 7, círculo só cabe em L3C7 e L5C7; ambas as casas precisam dele.
80. Na coluna 7, triângulo só cabe em L2C7 e L4C7; ambas as casas precisam dele.
81. A dupla L2C8–L2C7 já está fechada; L3C8 não pode tocar essa dupla com outro triângulo.
82. A dupla L3C8–L3C7 já está fechada; L4C8 não pode tocar essa dupla com outro círculo.
83. linha 3 já tem dois círculo (L3C7, L3C8); exclua círculo de L3C3.
84. linha 3 já tem dois círculo (L3C7, L3C8); exclua círculo de L3C4.
85. Na linha 4, círculo só cabe em L4C3 e L4C4; ambas as casas precisam dele.
86. Na linha 4, círculo só cabe em L4C3 e L4C4; ambas as casas precisam dele.

## 24. Aprendiz — pacto-052

**Descoberta:** Exclusão ao redor da dupla.

**Técnicas combinadas:** cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento.

**Origem:** pacto-052; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 11; 109 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: círculo — parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 49.
- L1C2: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C3: quadrado — cota saturada; posições restantes; primeira participação no passo 1.
- L1C5: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 46.
- L2C3: triângulo — posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 36.
- L2C4: losango — cota saturada; posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 5.
- L2C5: losango — cota saturada; exclusão junto à dupla; primeira participação no passo 5.
- L4C3: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 30.
- L4C4: losango — posições restantes; cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 42.
- L4C6: quadrado — posições restantes; primeira participação no passo 101.
- L4C8: triângulo — posições restantes; primeira participação no passo 107.
- L5C4: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 38.
- L6C1: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 10.
- L6C3: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 30.
- L6C5: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 46.
- L6C8: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 10.
- L7C1: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 14.
- L7C5: quadrado — exclusão junto à dupla; primeira participação no passo 71.
- L7C8: losango — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 14.
- L8C2: quadrado — cota saturada; primeira participação no passo 22.
- L8C3: quadrado — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 22.
- L8C4: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 38.
- L8C6: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 19.
- L8C7: triângulo — cota saturada; prevenção de isolamento; exclusão junto à dupla; posições restantes; primeira participação no passo 19.

### Sequência lógica

1. linha 1 já tem dois quadrado (L1C2, L1C3); exclua quadrado de L1C4.
2. linha 1 já tem dois quadrado (L1C2, L1C3); exclua quadrado de L1C6.
3. linha 1 já tem dois quadrado (L1C2, L1C3); exclua quadrado de L1C7.
4. linha 1 já tem dois quadrado (L1C2, L1C3); exclua quadrado de L1C8.
5. linha 2 já tem dois losango (L2C4, L2C5); exclua losango de L2C1.
6. linha 2 já tem dois losango (L2C4, L2C5); exclua losango de L2C2.
7. linha 2 já tem dois losango (L2C4, L2C5); exclua losango de L2C6.
8. linha 2 já tem dois losango (L2C4, L2C5); exclua losango de L2C7.
9. linha 2 já tem dois losango (L2C4, L2C5); exclua losango de L2C8.
10. linha 6 já tem dois quadrado (L6C1, L6C8); exclua quadrado de L6C2.
11. linha 6 já tem dois quadrado (L6C1, L6C8); exclua quadrado de L6C4.
12. linha 6 já tem dois quadrado (L6C1, L6C8); exclua quadrado de L6C6.
13. linha 6 já tem dois quadrado (L6C1, L6C8); exclua quadrado de L6C7.
14. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C2.
15. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C3.
16. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C4.
17. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C6.
18. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C7.
19. linha 8 já tem dois triângulo (L8C6, L8C7); exclua triângulo de L8C1.
20. linha 8 já tem dois triângulo (L8C6, L8C7); exclua triângulo de L8C5.
21. linha 8 já tem dois triângulo (L8C6, L8C7); exclua triângulo de L8C8.
22. linha 8 já tem dois quadrado (L8C2, L8C3); exclua quadrado de L8C1.
23. linha 8 já tem dois quadrado (L8C2, L8C3); exclua quadrado de L8C5.
24. linha 8 já tem dois quadrado (L8C2, L8C3); exclua quadrado de L8C8.
25. coluna 2 já tem dois quadrado (L1C2, L8C2); exclua quadrado de L2C2.
26. coluna 2 já tem dois quadrado (L1C2, L8C2); exclua quadrado de L3C2.
27. coluna 2 já tem dois quadrado (L1C2, L8C2); exclua quadrado de L4C2.
28. coluna 2 já tem dois quadrado (L1C2, L8C2); exclua quadrado de L5C2.
29. coluna 2 já tem dois quadrado (L1C2, L8C2); exclua quadrado de L7C2.
30. coluna 3 já tem dois círculo (L4C3, L6C3); exclua círculo de L3C3.
31. coluna 3 já tem dois círculo (L4C3, L6C3); exclua círculo de L5C3.
32. coluna 3 já tem dois círculo (L4C3, L6C3); exclua círculo de L7C3.
33. coluna 3 já tem dois quadrado (L1C3, L8C3); exclua quadrado de L3C3.
34. coluna 3 já tem dois quadrado (L1C3, L8C3); exclua quadrado de L5C3.
35. coluna 3 já tem dois quadrado (L1C3, L8C3); exclua quadrado de L7C3.
36. Na coluna 3, losango só cabe em L3C3 e L5C3; ambas as casas precisam dele.
37. Na coluna 3, losango só cabe em L3C3 e L5C3; ambas as casas precisam dele.
38. coluna 4 já tem dois círculo (L5C4, L8C4); exclua círculo de L1C4.
39. coluna 4 já tem dois círculo (L5C4, L8C4); exclua círculo de L3C4.
40. coluna 4 já tem dois círculo (L5C4, L8C4); exclua círculo de L6C4.
41. coluna 4 já tem dois círculo (L5C4, L8C4); exclua círculo de L7C4.
42. Na coluna 4, quadrado só cabe em L3C4 e L7C4; ambas as casas precisam dele.
43. Na coluna 4, quadrado só cabe em L3C4 e L7C4; ambas as casas precisam dele.
44. coluna 4 já tem dois losango (L2C4, L4C4); exclua losango de L1C4.
45. coluna 4 já tem dois losango (L2C4, L4C4); exclua losango de L6C4.
46. coluna 5 já tem dois triângulo (L1C5, L6C5); exclua triângulo de L3C5.
47. coluna 5 já tem dois triângulo (L1C5, L6C5); exclua triângulo de L4C5.
48. coluna 5 já tem dois triângulo (L1C5, L6C5); exclua triângulo de L5C5.
49. L1C1 precisa de um parceiro círculo; só L2C1 pode recebê-lo (vertical).
50. A dupla L1C5–L1C4 já está fechada; L1C6 não pode tocar essa dupla com outro triângulo.
51. A dupla L2C1–L1C1 já está fechada; L3C1 não pode tocar essa dupla com outro círculo.
52. A dupla L2C1–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro círculo.
53. A dupla L2C2–L2C3 já está fechada; L3C2 não pode tocar essa dupla com outro triângulo.
54. A dupla L2C5–L2C4 já está fechada; L3C5 não pode tocar essa dupla com outro losango.
55. L3C3 precisa de um parceiro losango; só L3C2 pode recebê-lo (horizontal).
56. L3C4 precisa de um parceiro quadrado; só L3C5 pode recebê-lo (horizontal).
57. A dupla L3C5–L3C4 já está fechada; L4C5 não pode tocar essa dupla com outro quadrado.
58. A dupla L3C5–L3C4 já está fechada; L3C6 não pode tocar essa dupla com outro quadrado.
59. L4C3 precisa de um parceiro círculo; só L4C2 pode recebê-lo (horizontal).
60. L4C4 precisa de um parceiro losango; só L4C5 pode recebê-lo (horizontal).
61. A dupla L4C5–L4C4 já está fechada; L5C5 não pode tocar essa dupla com outro losango.
62. L5C3 precisa de um parceiro losango; só L5C2 pode recebê-lo (horizontal).
63. L5C4 precisa de um parceiro círculo; só L5C5 pode recebê-lo (horizontal).
64. A dupla L5C5–L5C4 já está fechada; L5C6 não pode tocar essa dupla com outro círculo.
65. L6C1 precisa de um parceiro quadrado; só L5C1 pode recebê-lo (vertical).
66. L6C3 precisa de um parceiro círculo; só L6C2 pode recebê-lo (horizontal).
67. A dupla L6C5–L6C4 já está fechada; L6C6 não pode tocar essa dupla com outro triângulo.
68. L6C8 precisa de um parceiro quadrado; só L5C8 pode recebê-lo (vertical).
69. L7C1 precisa de um parceiro losango; só L8C1 pode recebê-lo (vertical).
70. L7C3 precisa de um parceiro triângulo; só L7C2 pode recebê-lo (horizontal).
71. A dupla L7C5–L7C4 já está fechada; L7C6 não pode tocar essa dupla com outro quadrado.
72. L7C7 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
73. L7C8 precisa de um parceiro losango; só L8C8 pode recebê-lo (vertical).
74. L8C4 precisa de um parceiro círculo; só L8C5 pode recebê-lo (horizontal).
75. A dupla L8C6–L8C7 já está fechada; L7C6 não pode tocar essa dupla com outro triângulo.
76. A dupla L8C7–L8C6 já está fechada; L7C7 não pode tocar essa dupla com outro triângulo.
77. linha 1 já tem dois triângulo (L1C4, L1C5); exclua triângulo de L1C7.
78. linha 1 já tem dois triângulo (L1C4, L1C5); exclua triângulo de L1C8.
79. linha 2 já tem dois triângulo (L2C2, L2C3); exclua triângulo de L2C6.
80. linha 2 já tem dois triângulo (L2C2, L2C3); exclua triângulo de L2C7.
81. linha 2 já tem dois triângulo (L2C2, L2C3); exclua triângulo de L2C8.
82. linha 3 já tem dois quadrado (L3C4, L3C5); exclua quadrado de L3C1.
83. linha 3 já tem dois quadrado (L3C4, L3C5); exclua quadrado de L3C7.
84. linha 3 já tem dois quadrado (L3C4, L3C5); exclua quadrado de L3C8.
85. linha 3 já tem dois losango (L3C2, L3C3); exclua losango de L3C1.
86. linha 3 já tem dois losango (L3C2, L3C3); exclua losango de L3C6.
87. linha 3 já tem dois losango (L3C2, L3C3); exclua losango de L3C7.
88. linha 3 já tem dois losango (L3C2, L3C3); exclua losango de L3C8.
89. linha 4 já tem dois círculo (L4C2, L4C3); exclua círculo de L4C1.
90. linha 4 já tem dois círculo (L4C2, L4C3); exclua círculo de L4C7.
91. linha 4 já tem dois losango (L4C4, L4C5); exclua losango de L4C1.
92. linha 4 já tem dois losango (L4C4, L4C5); exclua losango de L4C7.
93. linha 5 já tem dois círculo (L5C4, L5C5); exclua círculo de L5C7.
94. Na linha 5, triângulo só cabe em L5C6 e L5C7; ambas as casas precisam dele.
95. Na linha 5, triângulo só cabe em L5C6 e L5C7; ambas as casas precisam dele.
96. linha 6 já tem dois círculo (L6C2, L6C3); exclua círculo de L6C6.
97. linha 6 já tem dois círculo (L6C2, L6C3); exclua círculo de L6C7.
98. linha 6 já tem dois triângulo (L6C4, L6C5); exclua triângulo de L6C7.
99. Na coluna 1, triângulo só cabe em L3C1 e L4C1; ambas as casas precisam dele.
100. coluna 6 já tem dois triângulo (L5C6, L8C6); exclua triângulo de L3C6.
101. Na coluna 6, quadrado só cabe em L2C6 e L4C6; ambas as casas precisam dele.
102. Na coluna 6, losango só cabe em L1C6 e L6C6; ambas as casas precisam dele.
103. coluna 7 já tem dois triângulo (L5C7, L8C7); exclua triângulo de L3C7.
104. coluna 7 já tem dois triângulo (L5C7, L8C7); exclua triângulo de L4C7.
105. Na coluna 7, quadrado só cabe em L2C7 e L4C7; ambas as casas precisam dele.
106. Na coluna 7, losango só cabe em L1C7 e L6C7; ambas as casas precisam dele.
107. Na coluna 8, triângulo só cabe em L3C8 e L4C8; ambas as casas precisam dele.
108. coluna 8 já tem dois quadrado (L5C8, L6C8); exclua quadrado de L2C8.
109. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L1C8.

## 25. Aprendiz — pacto-053

**Descoberta:** Linha e coluna em sequência.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; prevenção de trio; exclusão junto à dupla; posições restantes.

**Origem:** pacto-053; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 12; 100 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C3: círculo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C4: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 50.
- L1C6: losango — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 22.
- L1C7: círculo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L2C1: losango — exclusão junto à dupla; primeira participação no passo 85.
- L2C3: círculo — cota saturada; prevenção de trio; exclusão junto à dupla; primeira participação no passo 19.
- L2C6: quadrado — parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; posições restantes; primeira participação no passo 22.
- L2C8: triângulo — prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 24.
- L3C2: círculo — cota saturada; prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 5.
- L3C3: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 8.
- L3C6: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 5.
- L3C7: losango — parceiro obrigatório / orientação; primeira participação no passo 31.
- L3C8: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 8.
- L4C3: quadrado — cota saturada; posições restantes; primeira participação no passo 21.
- L4C4: losango — posições restantes; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 56.
- L5C7: quadrado — parceiro obrigatório / orientação; primeira participação no passo 40.
- L5C8: losango — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 40.
- L6C3: losango — exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 38.
- L6C4: quadrado — prevenção de isolamento; posições restantes; primeira participação no passo 91.
- L7C3: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 20.
- L8C1: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 15.
- L8C2: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 15.
- L8C3: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 11.
- L8C7: triângulo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 11.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C3, L1C7); exclua círculo de L1C1.
2. linha 1 já tem dois círculo (L1C3, L1C7); exclua círculo de L1C2.
3. linha 1 já tem dois círculo (L1C3, L1C7); exclua círculo de L1C5.
4. linha 1 já tem dois círculo (L1C3, L1C7); exclua círculo de L1C8.
5. linha 3 já tem dois círculo (L3C2, L3C6); exclua círculo de L3C1.
6. linha 3 já tem dois círculo (L3C2, L3C6); exclua círculo de L3C4.
7. linha 3 já tem dois círculo (L3C2, L3C6); exclua círculo de L3C5.
8. linha 3 já tem dois quadrado (L3C3, L3C8); exclua quadrado de L3C1.
9. linha 3 já tem dois quadrado (L3C3, L3C8); exclua quadrado de L3C4.
10. linha 3 já tem dois quadrado (L3C3, L3C8); exclua quadrado de L3C5.
11. linha 8 já tem dois triângulo (L8C3, L8C7); exclua triângulo de L8C4.
12. linha 8 já tem dois triângulo (L8C3, L8C7); exclua triângulo de L8C5.
13. linha 8 já tem dois triângulo (L8C3, L8C7); exclua triângulo de L8C6.
14. linha 8 já tem dois triângulo (L8C3, L8C7); exclua triângulo de L8C8.
15. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C4.
16. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C5.
17. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C6.
18. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C8.
19. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L5C3.
20. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L5C3.
21. coluna 3 já tem dois quadrado (L3C3, L4C3); exclua quadrado de L5C3.
22. L1C6 precisa de um parceiro losango; só L1C5 pode recebê-lo (horizontal).
23. L1C7 precisa de um parceiro círculo; só L2C7 pode recebê-lo (vertical).
24. L1C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
25. L1C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
26. L2C2 não pode ser círculo: tocaria L3C2 e L2C3, formando um grupo maior que dois.
27. A dupla L2C3–L1C3 já está fechada; L2C4 não pode tocar essa dupla com outro círculo.
28. L2C5 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
29. L2C6 precisa de um parceiro quadrado; só L2C5 pode recebê-lo (horizontal).
30. L3C2 precisa de um parceiro círculo; só L4C2 pode recebê-lo (vertical).
31. L3C6 precisa de um parceiro círculo; só L4C6 pode recebê-lo (vertical).
32. L3C7 precisa de um parceiro losango; só L4C7 pode recebê-lo (vertical).
33. L3C8 precisa de um parceiro quadrado; só L4C8 pode recebê-lo (vertical).
34. A dupla L4C2–L3C2 já está fechada; L5C2 não pode tocar essa dupla com outro círculo.
35. A dupla L4C2–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro círculo.
36. A dupla L4C6–L3C6 já está fechada; L5C6 não pode tocar essa dupla com outro círculo.
37. A dupla L4C6–L3C6 já está fechada; L4C5 não pode tocar essa dupla com outro círculo.
38. A dupla L5C3–L6C3 já está fechada; L5C2 não pode tocar essa dupla com outro losango.
39. A dupla L5C3–L6C3 já está fechada; L5C4 não pode tocar essa dupla com outro losango.
40. L5C8 precisa de um parceiro losango; só L6C8 pode recebê-lo (vertical).
41. A dupla L6C3–L5C3 já está fechada; L6C2 não pode tocar essa dupla com outro losango.
42. A dupla L6C8–L5C8 já está fechada; L7C8 não pode tocar essa dupla com outro losango.
43. A dupla L6C8–L5C8 já está fechada; L6C7 não pode tocar essa dupla com outro losango.
44. A dupla L7C3–L8C3 já está fechada; L7C2 não pode tocar essa dupla com outro triângulo.
45. A dupla L7C3–L8C3 já está fechada; L7C4 não pode tocar essa dupla com outro triângulo.
46. A dupla L8C1–L8C2 já está fechada; L7C1 não pode tocar essa dupla com outro quadrado.
47. A dupla L8C2–L8C1 já está fechada; L7C2 não pode tocar essa dupla com outro quadrado.
48. L8C7 precisa de um parceiro triângulo; só L7C7 pode recebê-lo (vertical).
49. L8C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
50. linha 1 já tem dois triângulo (L1C4, L1C8); exclua triângulo de L1C1.
51. linha 1 já tem dois triângulo (L1C4, L1C8); exclua triângulo de L1C2.
52. Na linha 1, quadrado só cabe em L1C1 e L1C2; ambas as casas precisam dele.
53. Na linha 1, quadrado só cabe em L1C1 e L1C2; ambas as casas precisam dele.
54. linha 2 já tem dois quadrado (L2C5, L2C6); exclua quadrado de L2C2.
55. linha 2 já tem dois quadrado (L2C5, L2C6); exclua quadrado de L2C4.
56. Na linha 4, triângulo só cabe em L4C1 e L4C5; ambas as casas precisam dele.
57. Na linha 4, triângulo só cabe em L4C1 e L4C5; ambas as casas precisam dele.
58. linha 5 já tem dois losango (L5C3, L5C8); exclua losango de L5C1.
59. linha 5 já tem dois losango (L5C3, L5C8); exclua losango de L5C5.
60. linha 5 já tem dois losango (L5C3, L5C8); exclua losango de L5C6.
61. linha 6 já tem dois losango (L6C3, L6C8); exclua losango de L6C1.
62. linha 6 já tem dois losango (L6C3, L6C8); exclua losango de L6C5.
63. linha 6 já tem dois losango (L6C3, L6C8); exclua losango de L6C6.
64. linha 7 já tem dois triângulo (L7C3, L7C7); exclua triângulo de L7C1.
65. linha 7 já tem dois triângulo (L7C3, L7C7); exclua triângulo de L7C5.
66. linha 7 já tem dois triângulo (L7C3, L7C7); exclua triângulo de L7C6.
67. linha 7 já tem dois triângulo (L7C3, L7C7); exclua triângulo de L7C8.
68. coluna 1 já tem dois quadrado (L1C1, L8C1); exclua quadrado de L5C1.
69. coluna 1 já tem dois quadrado (L1C1, L8C1); exclua quadrado de L6C1.
70. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L6C2.
71. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L7C2.
72. coluna 2 já tem dois quadrado (L1C2, L8C2); exclua quadrado de L5C2.
73. coluna 2 já tem dois quadrado (L1C2, L8C2); exclua quadrado de L6C2.
74. Na coluna 2, losango só cabe em L2C2 e L7C2; ambas as casas precisam dele.
75. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L6C6.
76. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L7C6.
77. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L8C6.
78. Na coluna 6, triângulo só cabe em L5C6 e L6C6; ambas as casas precisam dele.
79. Na coluna 6, triângulo só cabe em L5C6 e L6C6; ambas as casas precisam dele.
80. Na coluna 6, quadrado só cabe em L2C6 e L7C6; ambas as casas precisam dele.
81. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L6C7.
82. coluna 7 já tem dois triângulo (L7C7, L8C7); exclua triângulo de L6C7.
83. Na coluna 8, círculo só cabe em L7C8 e L8C8; ambas as casas precisam dele.
84. L1C4 precisa de um parceiro triângulo; só L2C4 pode recebê-lo (vertical).
85. A dupla L2C1–L2C2 já está fechada; L3C1 não pode tocar essa dupla com outro losango.
86. A dupla L2C4–L1C4 já está fechada; L3C4 não pode tocar essa dupla com outro triângulo.
87. A dupla L3C4–L4C4 já está fechada; L3C5 não pode tocar essa dupla com outro losango.
88. A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro triângulo.
89. A dupla L4C5–L3C5 já está fechada; L5C5 não pode tocar essa dupla com outro triângulo.
90. L5C1 precisa de um parceiro círculo; só L6C1 pode recebê-lo (vertical).
91. L5C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
92. A dupla L6C1–L5C1 já está fechada; L7C1 não pode tocar essa dupla com outro círculo.
93. A dupla L6C6–L5C6 já está fechada; L6C5 não pode tocar essa dupla com outro triângulo.
94. L7C6 precisa de um parceiro quadrado; só L7C5 pode recebê-lo (horizontal).
95. L8C6 precisa de um parceiro losango; só L8C5 pode recebê-lo (horizontal).
96. Na linha 6, círculo só cabe em L6C1 e L6C5; ambas as casas precisam dele.
97. Na linha 7, círculo só cabe em L7C4 e L7C8; ambas as casas precisam dele.
98. Na linha 8, círculo só cabe em L8C4 e L8C8; ambas as casas precisam dele.
99. coluna 4 já tem dois círculo (L7C4, L8C4); exclua círculo de L5C4.
100. Na coluna 5, círculo só cabe em L5C5 e L6C5; ambas as casas precisam dele.

## 26. Aprendiz — pacto-054

**Descoberta:** Parceiro de canto e borda.

**Técnicas combinadas:** cota saturada; posições restantes; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de trio.

**Origem:** pacto-054; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 12; 108 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C2: círculo — posições restantes; prevenção de isolamento; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 60.
- L1C3: triângulo — prevenção de isolamento; cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 34.
- L1C6: losango — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 27.
- L2C4: losango — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 18.
- L2C6: triângulo — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 27.
- L2C7: quadrado — parceiro obrigatório / orientação; posições restantes; cota saturada; primeira participação no passo 35.
- L3C4: triângulo — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 36.
- L3C5: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L3C6: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 27.
- L3C7: círculo — cota saturada; posições restantes; primeira participação no passo 1.
- L4C2: triângulo — posições restantes; parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; primeira participação no passo 60.
- L4C3: losango — cota saturada; posições restantes; primeira participação no passo 8.
- L4C4: losango — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 8.
- L4C5: círculo — cota saturada; primeira participação no passo 5.
- L4C7: círculo — cota saturada; primeira participação no passo 5.
- L5C2: quadrado — cota saturada; exclusão junto à dupla; posições restantes; prevenção de isolamento; primeira participação no passo 11.
- L5C3: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 15.
- L5C6: triângulo — posições restantes; cota saturada; prevenção de trio; parceiro obrigatório / orientação; primeira participação no passo 27.
- L6C2: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 11.
- L6C3: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 15.
- L6C6: losango — posições restantes; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 27.
- L6C7: triângulo — prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 39.
- L8C4: círculo — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 43.
- L8C5: quadrado — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 43.

### Sequência lógica

1. linha 3 já tem dois círculo (L3C5, L3C7); exclua círculo de L3C1.
2. linha 3 já tem dois círculo (L3C5, L3C7); exclua círculo de L3C2.
3. linha 3 já tem dois círculo (L3C5, L3C7); exclua círculo de L3C3.
4. linha 3 já tem dois círculo (L3C5, L3C7); exclua círculo de L3C8.
5. linha 4 já tem dois círculo (L4C5, L4C7); exclua círculo de L4C1.
6. linha 4 já tem dois círculo (L4C5, L4C7); exclua círculo de L4C6.
7. linha 4 já tem dois círculo (L4C5, L4C7); exclua círculo de L4C8.
8. linha 4 já tem dois losango (L4C3, L4C4); exclua losango de L4C1.
9. linha 4 já tem dois losango (L4C3, L4C4); exclua losango de L4C6.
10. linha 4 já tem dois losango (L4C3, L4C4); exclua losango de L4C8.
11. coluna 2 já tem dois quadrado (L5C2, L6C2); exclua quadrado de L2C2.
12. coluna 2 já tem dois quadrado (L5C2, L6C2); exclua quadrado de L3C2.
13. coluna 2 já tem dois quadrado (L5C2, L6C2); exclua quadrado de L7C2.
14. coluna 2 já tem dois quadrado (L5C2, L6C2); exclua quadrado de L8C2.
15. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L2C3.
16. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L7C3.
17. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L8C3.
18. coluna 4 já tem dois losango (L2C4, L4C4); exclua losango de L1C4.
19. coluna 4 já tem dois losango (L2C4, L4C4); exclua losango de L5C4.
20. coluna 4 já tem dois losango (L2C4, L4C4); exclua losango de L6C4.
21. coluna 4 já tem dois losango (L2C4, L4C4); exclua losango de L7C4.
22. coluna 5 já tem dois círculo (L3C5, L4C5); exclua círculo de L1C5.
23. coluna 5 já tem dois círculo (L3C5, L4C5); exclua círculo de L2C5.
24. coluna 5 já tem dois círculo (L3C5, L4C5); exclua círculo de L5C5.
25. coluna 5 já tem dois círculo (L3C5, L4C5); exclua círculo de L6C5.
26. coluna 5 já tem dois círculo (L3C5, L4C5); exclua círculo de L7C5.
27. Na coluna 6, círculo só cabe em L7C6 e L8C6; ambas as casas precisam dele.
28. Na coluna 6, círculo só cabe em L7C6 e L8C6; ambas as casas precisam dele.
29. coluna 6 já tem dois triângulo (L2C6, L5C6); exclua triângulo de L4C6.
30. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L1C7.
31. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L5C7.
32. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L7C7.
33. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L8C7.
34. L1C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
35. L2C6 precisa de um parceiro triângulo; só L2C5 pode recebê-lo (horizontal).
36. L3C4 precisa de um parceiro triângulo; só L3C3 pode recebê-lo (horizontal).
37. A dupla L5C2–L6C2 já está fechada; L5C1 não pode tocar essa dupla com outro quadrado.
38. A dupla L5C3–L6C3 já está fechada; L5C4 não pode tocar essa dupla com outro círculo.
39. L5C7 não pode ser triângulo: tocaria L6C7 e L5C6, formando um grupo maior que dois.
40. A dupla L6C2–L5C2 já está fechada; L6C1 não pode tocar essa dupla com outro quadrado.
41. A dupla L6C3–L5C3 já está fechada; L6C4 não pode tocar essa dupla com outro círculo.
42. L6C6 precisa de um parceiro losango; só L6C5 pode recebê-lo (horizontal).
43. L8C4 precisa de um parceiro círculo; só L7C4 pode recebê-lo (vertical).
44. L8C5 precisa de um parceiro quadrado; só L7C5 pode recebê-lo (vertical).
45. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C1.
46. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C2.
47. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C3.
48. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C8.
49. linha 3 já tem dois triângulo (L3C3, L3C4); exclua triângulo de L3C1.
50. linha 3 já tem dois triângulo (L3C3, L3C4); exclua triângulo de L3C2.
51. linha 3 já tem dois triângulo (L3C3, L3C4); exclua triângulo de L3C8.
52. linha 6 já tem dois losango (L6C5, L6C6); exclua losango de L6C1.
53. linha 6 já tem dois losango (L6C5, L6C6); exclua losango de L6C8.
54. linha 7 já tem dois círculo (L7C4, L7C6); exclua círculo de L7C1.
55. linha 7 já tem dois círculo (L7C4, L7C6); exclua círculo de L7C2.
56. linha 7 já tem dois círculo (L7C4, L7C6); exclua círculo de L7C8.
57. linha 8 já tem dois círculo (L8C4, L8C6); exclua círculo de L8C1.
58. linha 8 já tem dois círculo (L8C4, L8C6); exclua círculo de L8C2.
59. linha 8 já tem dois círculo (L8C4, L8C6); exclua círculo de L8C8.
60. Na coluna 2, círculo só cabe em L1C2 e L2C2; ambas as casas precisam dele.
61. coluna 3 já tem dois triângulo (L1C3, L3C3); exclua triângulo de L7C3.
62. coluna 3 já tem dois triângulo (L1C3, L3C3); exclua triângulo de L8C3.
63. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L1C5.
64. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L5C5.
65. L1C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
66. A dupla L1C2–L2C2 já está fechada; L1C1 não pode tocar essa dupla com outro círculo.
67. L1C3 precisa de um parceiro triângulo; só L1C4 pode recebê-lo (horizontal).
68. A dupla L1C4–L1C3 já está fechada; L1C5 não pode tocar essa dupla com outro triângulo.
69. A dupla L1C6–L1C5 já está fechada; L1C7 não pode tocar essa dupla com outro losango.
70. A dupla L2C2–L1C2 já está fechada; L2C1 não pode tocar essa dupla com outro círculo.
71. L2C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
72. L3C2 precisa de um parceiro losango; só L3C1 pode recebê-lo (horizontal).
73. L4C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
74. L5C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
75. L5C6 precisa de um parceiro triângulo; só L5C5 pode recebê-lo (horizontal).
76. Na linha 1, círculo só cabe em L1C2 e L1C8; ambas as casas precisam dele.
77. linha 1 já tem dois triângulo (L1C3, L1C4); exclua triângulo de L1C7.
78. Na linha 1, quadrado só cabe em L1C1 e L1C7; ambas as casas precisam dele.
79. Na linha 2, círculo só cabe em L2C2 e L2C8; ambas as casas precisam dele.
80. Na linha 2, quadrado só cabe em L2C1 e L2C7; ambas as casas precisam dele.
81. Na linha 3, quadrado só cabe em L3C6 e L3C8; ambas as casas precisam dele.
82. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C8.
83. linha 5 já tem dois triângulo (L5C5, L5C6); exclua triângulo de L5C1.
84. linha 5 já tem dois triângulo (L5C5, L5C6); exclua triângulo de L5C4.
85. linha 5 já tem dois triângulo (L5C5, L5C6); exclua triângulo de L5C8.
86. linha 5 já tem dois quadrado (L5C2, L5C4); exclua quadrado de L5C7.
87. linha 5 já tem dois quadrado (L5C2, L5C4); exclua quadrado de L5C8.
88. Na linha 5, losango só cabe em L5C7 e L5C8; ambas as casas precisam dele.
89. Na coluna 1, círculo só cabe em L5C1 e L6C1; ambas as casas precisam dele.
90. coluna 1 já tem dois quadrado (L1C1, L2C1); exclua quadrado de L7C1.
91. coluna 1 já tem dois quadrado (L1C1, L2C1); exclua quadrado de L8C1.
92. Na coluna 3, quadrado só cabe em L7C3 e L8C3; ambas as casas precisam dele.
93. Na coluna 3, quadrado só cabe em L7C3 e L8C3; ambas as casas precisam dele.
94. coluna 4 já tem dois triângulo (L1C4, L3C4); exclua triângulo de L6C4.
95. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L7C7.
96. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L8C7.
97. coluna 8 já tem dois círculo (L1C8, L2C8); exclua círculo de L6C8.
98. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L6C8.
99. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L7C8.
100. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L8C8.
101. A dupla L6C7–L6C8 já está fechada; L7C7 não pode tocar essa dupla com outro triângulo.
102. A dupla L6C8–L6C7 já está fechada; L7C8 não pode tocar essa dupla com outro triângulo.
103. A dupla L7C7–L7C8 já está fechada; L8C7 não pode tocar essa dupla com outro losango.
104. A dupla L7C8–L7C7 já está fechada; L8C8 não pode tocar essa dupla com outro losango.
105. Na linha 7, triângulo só cabe em L7C1 e L7C2; ambas as casas precisam dele.
106. Na linha 7, triângulo só cabe em L7C1 e L7C2; ambas as casas precisam dele.
107. linha 8 já tem dois triângulo (L8C7, L8C8); exclua triângulo de L8C1.
108. linha 8 já tem dois triângulo (L8C7, L8C8); exclua triângulo de L8C2.

## 27. Aprendiz — pacto-060

**Descoberta:** Duas ocorrências, duas posições.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes.

**Origem:** pacto-060; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 12; 103 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C3: losango — cota saturada; prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 23.
- L2C1: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L2C2: quadrado — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L2C4: triângulo — prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 39.
- L2C8: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 32.
- L3C3: losango — cota saturada; prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 23.
- L3C5: triângulo — cota saturada; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 5.
- L3C6: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 5.
- L4C3: quadrado — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 77.
- L4C5: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 10.
- L4C6: círculo — cota saturada; primeira participação no passo 10.
- L4C8: triângulo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 35.
- L5C2: losango — prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 46.
- L5C5: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 80.
- L5C8: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 35.
- L6C1: quadrado — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 18.
- L6C8: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 32.
- L7C2: triângulo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 14.
- L7C3: círculo — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 52.
- L7C7: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 14.
- L7C8: losango — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 50.
- L8C1: losango — prevenção de isolamento; posições restantes; primeira participação no passo 51.
- L8C4: quadrado — prevenção de isolamento; primeira participação no passo 56.
- L8C6: círculo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 27.

### Sequência lógica

1. linha 2 já tem dois quadrado (L2C1, L2C2); exclua quadrado de L2C3.
2. linha 2 já tem dois quadrado (L2C1, L2C2); exclua quadrado de L2C5.
3. linha 2 já tem dois quadrado (L2C1, L2C2); exclua quadrado de L2C6.
4. linha 2 já tem dois quadrado (L2C1, L2C2); exclua quadrado de L2C7.
5. linha 3 já tem dois triângulo (L3C5, L3C6); exclua triângulo de L3C1.
6. linha 3 já tem dois triângulo (L3C5, L3C6); exclua triângulo de L3C2.
7. linha 3 já tem dois triângulo (L3C5, L3C6); exclua triângulo de L3C4.
8. linha 3 já tem dois triângulo (L3C5, L3C6); exclua triângulo de L3C7.
9. linha 3 já tem dois triângulo (L3C5, L3C6); exclua triângulo de L3C8.
10. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C1.
11. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C2.
12. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C4.
13. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C7.
14. linha 7 já tem dois triângulo (L7C2, L7C7); exclua triângulo de L7C1.
15. linha 7 já tem dois triângulo (L7C2, L7C7); exclua triângulo de L7C4.
16. linha 7 já tem dois triângulo (L7C2, L7C7); exclua triângulo de L7C5.
17. linha 7 já tem dois triângulo (L7C2, L7C7); exclua triângulo de L7C6.
18. coluna 1 já tem dois quadrado (L2C1, L6C1); exclua quadrado de L1C1.
19. coluna 1 já tem dois quadrado (L2C1, L6C1); exclua quadrado de L3C1.
20. coluna 1 já tem dois quadrado (L2C1, L6C1); exclua quadrado de L4C1.
21. coluna 1 já tem dois quadrado (L2C1, L6C1); exclua quadrado de L5C1.
22. coluna 1 já tem dois quadrado (L2C1, L6C1); exclua quadrado de L7C1.
23. coluna 3 já tem dois losango (L1C3, L3C3); exclua losango de L2C3.
24. coluna 3 já tem dois losango (L1C3, L3C3); exclua losango de L5C3.
25. coluna 3 já tem dois losango (L1C3, L3C3); exclua losango de L6C3.
26. coluna 3 já tem dois losango (L1C3, L3C3); exclua losango de L8C3.
27. coluna 6 já tem dois círculo (L4C6, L8C6); exclua círculo de L1C6.
28. coluna 6 já tem dois círculo (L4C6, L8C6); exclua círculo de L2C6.
29. coluna 6 já tem dois círculo (L4C6, L8C6); exclua círculo de L5C6.
30. coluna 6 já tem dois círculo (L4C6, L8C6); exclua círculo de L6C6.
31. coluna 6 já tem dois círculo (L4C6, L8C6); exclua círculo de L7C6.
32. coluna 8 já tem dois círculo (L2C8, L6C8); exclua círculo de L1C8.
33. coluna 8 já tem dois círculo (L2C8, L6C8); exclua círculo de L3C8.
34. coluna 8 já tem dois círculo (L2C8, L6C8); exclua círculo de L8C8.
35. coluna 8 já tem dois triângulo (L4C8, L5C8); exclua triângulo de L1C8.
36. coluna 8 já tem dois triângulo (L4C8, L5C8); exclua triângulo de L8C8.
37. A dupla L2C2–L2C1 já está fechada; L1C2 não pode tocar essa dupla com outro quadrado.
38. A dupla L2C2–L2C1 já está fechada; L3C2 não pode tocar essa dupla com outro quadrado.
39. L2C3 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
40. A dupla L2C4–L2C3 já está fechada; L1C4 não pode tocar essa dupla com outro triângulo.
41. A dupla L2C4–L2C3 já está fechada; L2C5 não pode tocar essa dupla com outro triângulo.
42. L2C8 precisa de um parceiro círculo; só L2C7 pode recebê-lo (horizontal).
43. L3C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
44. A dupla L3C6–L3C5 já está fechada; L2C6 não pode tocar essa dupla com outro triângulo.
45. A dupla L4C8–L5C8 já está fechada; L4C7 não pode tocar essa dupla com outro triângulo.
46. L5C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
47. A dupla L5C8–L4C8 já está fechada; L5C7 não pode tocar essa dupla com outro triângulo.
48. L6C1 precisa de um parceiro quadrado; só L6C2 pode recebê-lo (horizontal).
49. A dupla L6C2–L6C1 já está fechada; L6C3 não pode tocar essa dupla com outro quadrado.
50. L6C8 precisa de um parceiro círculo; só L6C7 pode recebê-lo (horizontal).
51. L7C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
52. L7C2 precisa de um parceiro triângulo; só L8C2 pode recebê-lo (vertical).
53. L7C7 precisa de um parceiro triângulo; só L8C7 pode recebê-lo (vertical).
54. L7C8 precisa de um parceiro losango; só L8C8 pode recebê-lo (vertical).
55. A dupla L8C2–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro triângulo.
56. L8C5 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
57. L8C6 precisa de um parceiro círculo; só L8C5 pode recebê-lo (horizontal).
58. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C5.
59. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C3.
60. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C4.
61. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C5.
62. linha 6 já tem dois quadrado (L6C1, L6C2); exclua quadrado de L6C4.
63. linha 6 já tem dois quadrado (L6C1, L6C2); exclua quadrado de L6C5.
64. linha 6 já tem dois quadrado (L6C1, L6C2); exclua quadrado de L6C6.
65. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C4.
66. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C5.
67. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C6.
68. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C3.
69. Na coluna 1, círculo só cabe em L1C1 e L3C1; ambas as casas precisam dele.
70. Na coluna 1, círculo só cabe em L1C1 e L3C1; ambas as casas precisam dele.
71. Na coluna 1, triângulo só cabe em L4C1 e L5C1; ambas as casas precisam dele.
72. Na coluna 1, triângulo só cabe em L4C1 e L5C1; ambas as casas precisam dele.
73. Na coluna 2, círculo só cabe em L1C2 e L3C2; ambas as casas precisam dele.
74. Na coluna 2, círculo só cabe em L1C2 e L3C2; ambas as casas precisam dele.
75. coluna 2 já tem dois triângulo (L7C2, L8C2); exclua triângulo de L4C2.
76. coluna 2 já tem dois quadrado (L2C2, L6C2); exclua quadrado de L4C2.
77. Na coluna 3, círculo só cabe em L5C3 e L7C3; ambas as casas precisam dele.
78. coluna 5 já tem dois círculo (L4C5, L8C5); exclua círculo de L1C5.
79. coluna 5 já tem dois círculo (L4C5, L8C5); exclua círculo de L7C5.
80. coluna 5 já tem dois quadrado (L5C5, L7C5); exclua quadrado de L1C5.
81. coluna 7 já tem dois círculo (L2C7, L6C7); exclua círculo de L1C7.
82. coluna 7 já tem dois círculo (L2C7, L6C7); exclua círculo de L3C7.
83. coluna 7 já tem dois círculo (L2C7, L6C7); exclua círculo de L5C7.
84. coluna 7 já tem dois triângulo (L7C7, L8C7); exclua triângulo de L1C7.
85. Na coluna 8, quadrado só cabe em L1C8 e L3C8; ambas as casas precisam dele.
86. Na coluna 8, quadrado só cabe em L1C8 e L3C8; ambas as casas precisam dele.
87. L1C3 precisa de um parceiro losango; só L1C4 pode recebê-lo (horizontal).
88. A dupla L1C4–L1C3 já está fechada; L1C5 não pode tocar essa dupla com outro losango.
89. L1C5 precisa de um parceiro triângulo; só L1C6 pode recebê-lo (horizontal).
90. L1C7 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
91. L3C3 precisa de um parceiro losango; só L3C4 pode recebê-lo (horizontal).
92. A dupla L3C4–L3C3 já está fechada; L4C4 não pode tocar essa dupla com outro losango.
93. L3C8 precisa de um parceiro quadrado; só L3C7 pode recebê-lo (horizontal).
94. L4C3 precisa de um parceiro quadrado; só L4C4 pode recebê-lo (horizontal).
95. A dupla L4C4–L4C3 já está fechada; L5C4 não pode tocar essa dupla com outro quadrado.
96. L5C3 precisa de um parceiro círculo; só L5C4 pode recebê-lo (horizontal).
97. L5C5 precisa de um parceiro quadrado; só L5C6 pode recebê-lo (horizontal).
98. A dupla L5C6–L5C5 já está fechada; L5C7 não pode tocar essa dupla com outro quadrado.
99. L5C7 precisa de um parceiro losango; só L4C7 pode recebê-lo (vertical).
100. L6C3 precisa de um parceiro triângulo; só L6C4 pode recebê-lo (horizontal).
101. A dupla L6C4–L6C3 já está fechada; L6C5 não pode tocar essa dupla com outro triângulo.
102. L6C5 precisa de um parceiro losango; só L6C6 pode recebê-lo (horizontal).
103. L7C3 precisa de um parceiro círculo; só L7C4 pode recebê-lo (horizontal).

## 28. Aprendiz — pacto-096

**Descoberta:** Horizontal ou vertical.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; prevenção de trio.

**Origem:** pacto-096; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 13; 103 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C2: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L1C3: losango — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 29.
- L1C4: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 4.
- L1C5: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 4.
- L1C6: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L2C4: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 21.
- L2C8: triângulo — posições restantes; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 74.
- L3C1: triângulo — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 37.
- L3C2: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L3C4: círculo — parceiro obrigatório / orientação; cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 35.
- L3C5: losango — parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 38.
- L3C6: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L4C7: círculo — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 45.
- L5C3: círculo — prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 47.
- L5C7: quadrado — parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; cota saturada; primeira participação no passo 45.
- L6C4: quadrado — cota saturada; prevenção de isolamento; exclusão junto à dupla; posições restantes; primeira participação no passo 10.
- L6C5: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 10.
- L6C6: losango — exclusão junto à dupla; posições restantes; primeira participação no passo 87.
- L7C3: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 19.
- L7C8: círculo — cota saturada; exclusão junto à dupla; posições restantes; prevenção de isolamento; primeira participação no passo 25.
- L8C2: triângulo — posições restantes; primeira participação no passo 99.
- L8C3: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 19.
- L8C5: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 15.
- L8C8: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 15.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C2, L1C6); exclua círculo de L1C1.
2. linha 1 já tem dois círculo (L1C2, L1C6); exclua círculo de L1C7.
3. linha 1 já tem dois círculo (L1C2, L1C6); exclua círculo de L1C8.
4. linha 1 já tem dois triângulo (L1C4, L1C5); exclua triângulo de L1C1.
5. linha 1 já tem dois triângulo (L1C4, L1C5); exclua triângulo de L1C7.
6. linha 1 já tem dois triângulo (L1C4, L1C5); exclua triângulo de L1C8.
7. linha 3 já tem dois quadrado (L3C2, L3C6); exclua quadrado de L3C3.
8. linha 3 já tem dois quadrado (L3C2, L3C6); exclua quadrado de L3C7.
9. linha 3 já tem dois quadrado (L3C2, L3C6); exclua quadrado de L3C8.
10. linha 6 já tem dois quadrado (L6C4, L6C5); exclua quadrado de L6C1.
11. linha 6 já tem dois quadrado (L6C4, L6C5); exclua quadrado de L6C2.
12. linha 6 já tem dois quadrado (L6C4, L6C5); exclua quadrado de L6C3.
13. linha 6 já tem dois quadrado (L6C4, L6C5); exclua quadrado de L6C7.
14. linha 6 já tem dois quadrado (L6C4, L6C5); exclua quadrado de L6C8.
15. linha 8 já tem dois círculo (L8C5, L8C8); exclua círculo de L8C1.
16. linha 8 já tem dois círculo (L8C5, L8C8); exclua círculo de L8C4.
17. linha 8 já tem dois círculo (L8C5, L8C8); exclua círculo de L8C6.
18. linha 8 já tem dois círculo (L8C5, L8C8); exclua círculo de L8C7.
19. coluna 3 já tem dois quadrado (L7C3, L8C3); exclua quadrado de L2C3.
20. coluna 3 já tem dois quadrado (L7C3, L8C3); exclua quadrado de L4C3.
21. coluna 4 já tem dois quadrado (L2C4, L6C4); exclua quadrado de L4C4.
22. coluna 4 já tem dois quadrado (L2C4, L6C4); exclua quadrado de L5C4.
23. coluna 4 já tem dois quadrado (L2C4, L6C4); exclua quadrado de L7C4.
24. coluna 4 já tem dois quadrado (L2C4, L6C4); exclua quadrado de L8C4.
25. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L3C8.
26. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L4C8.
27. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L5C8.
28. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L6C8.
29. L1C2 precisa de um parceiro círculo; só L2C2 pode recebê-lo (vertical).
30. L1C3 precisa de um parceiro losango; só L2C3 pode recebê-lo (vertical).
31. A dupla L1C5–L1C4 já está fechada; L2C5 não pode tocar essa dupla com outro triângulo.
32. L1C6 precisa de um parceiro círculo; só L2C6 pode recebê-lo (vertical).
33. A dupla L2C2–L1C2 já está fechada; L2C1 não pode tocar essa dupla com outro círculo.
34. A dupla L2C3–L1C3 já está fechada; L3C3 não pode tocar essa dupla com outro losango.
35. L2C4 precisa de um parceiro quadrado; só L2C5 pode recebê-lo (horizontal).
36. A dupla L2C6–L1C6 já está fechada; L2C7 não pode tocar essa dupla com outro círculo.
37. L3C2 precisa de um parceiro quadrado; só L4C2 pode recebê-lo (vertical).
38. L3C5 precisa de um parceiro losango; só L4C5 pode recebê-lo (vertical).
39. L3C6 precisa de um parceiro quadrado; só L4C6 pode recebê-lo (vertical).
40. A dupla L4C2–L3C2 já está fechada; L5C2 não pode tocar essa dupla com outro quadrado.
41. A dupla L4C2–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro quadrado.
42. A dupla L4C5–L3C5 já está fechada; L5C5 não pode tocar essa dupla com outro losango.
43. A dupla L4C5–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro losango.
44. A dupla L4C6–L3C6 já está fechada; L5C6 não pode tocar essa dupla com outro quadrado.
45. L4C7 precisa de um parceiro círculo; só L3C7 pode recebê-lo (vertical).
46. L5C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
47. L5C4 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
48. L5C7 precisa de um parceiro quadrado; só L5C8 pode recebê-lo (horizontal).
49. A dupla L5C8–L5C7 já está fechada; L4C8 não pode tocar essa dupla com outro quadrado.
50. A dupla L6C5–L6C4 já está fechada; L5C5 não pode tocar essa dupla com outro quadrado.
51. A dupla L6C5–L6C4 já está fechada; L7C5 não pode tocar essa dupla com outro quadrado.
52. A dupla L7C3–L8C3 já está fechada; L7C2 não pode tocar essa dupla com outro quadrado.
53. A dupla L7C8–L8C8 já está fechada; L7C7 não pode tocar essa dupla com outro círculo.
54. L8C5 precisa de um parceiro círculo; só L7C5 pode recebê-lo (vertical).
55. linha 2 já tem dois quadrado (L2C4, L2C5); exclua quadrado de L2C1.
56. linha 2 já tem dois quadrado (L2C4, L2C5); exclua quadrado de L2C7.
57. linha 3 já tem dois círculo (L3C4, L3C7); exclua círculo de L3C3.
58. linha 3 já tem dois triângulo (L3C1, L3C3); exclua triângulo de L3C8.
59. linha 7 já tem dois círculo (L7C5, L7C8); exclua círculo de L7C1.
60. linha 7 já tem dois círculo (L7C5, L7C8); exclua círculo de L7C2.
61. linha 7 já tem dois círculo (L7C5, L7C8); exclua círculo de L7C4.
62. linha 7 já tem dois círculo (L7C5, L7C8); exclua círculo de L7C6.
63. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L5C2.
64. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L6C2.
65. coluna 3 já tem dois losango (L1C3, L2C3); exclua losango de L4C3.
66. coluna 3 já tem dois losango (L1C3, L2C3); exclua losango de L6C3.
67. Na coluna 4, losango só cabe em L7C4 e L8C4; ambas as casas precisam dele.
68. Na coluna 4, losango só cabe em L7C4 e L8C4; ambas as casas precisam dele.
69. coluna 5 já tem dois círculo (L7C5, L8C5); exclua círculo de L5C5.
70. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L5C6.
71. coluna 6 já tem dois quadrado (L3C6, L4C6); exclua quadrado de L7C6.
72. coluna 6 já tem dois quadrado (L3C6, L4C6); exclua quadrado de L8C6.
73. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L6C7.
74. Na coluna 8, quadrado só cabe em L1C8 e L5C8; ambas as casas precisam dele.
75. L1C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
76. L1C1 precisa de um parceiro losango; só L2C1 pode recebê-lo (vertical).
77. L1C8 precisa de um parceiro quadrado; só L1C7 pode recebê-lo (horizontal).
78. L2C7 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
79. L3C1 precisa de um parceiro triângulo; só L4C1 pode recebê-lo (vertical).
80. L3C3 precisa de um parceiro triângulo; só L4C3 pode recebê-lo (vertical).
81. L3C4 precisa de um parceiro círculo; só L4C4 pode recebê-lo (vertical).
82. L3C8 precisa de um parceiro losango; só L4C8 pode recebê-lo (vertical).
83. A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro triângulo.
84. A dupla L4C4–L3C4 já está fechada; L5C4 não pode tocar essa dupla com outro círculo.
85. L5C3 precisa de um parceiro círculo; só L6C3 pode recebê-lo (vertical).
86. A dupla L5C5–L5C4 já está fechada; L5C6 não pode tocar essa dupla com outro triângulo.
87. A dupla L6C6–L5C6 já está fechada; L7C6 não pode tocar essa dupla com outro losango.
88. A dupla L6C6–L5C6 já está fechada; L6C7 não pode tocar essa dupla com outro losango.
89. L6C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
90. L7C7 não pode ser triângulo: tocaria L6C7 e L7C6, formando um grupo maior que dois.
91. Na linha 5, círculo só cabe em L5C1 e L5C3; ambas as casas precisam dele.
92. linha 5 já tem dois triângulo (L5C4, L5C5); exclua triângulo de L5C2.
93. Na linha 6, círculo só cabe em L6C1 e L6C3; ambas as casas precisam dele.
94. linha 6 já tem dois triângulo (L6C7, L6C8); exclua triângulo de L6C2.
95. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L7C1.
96. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L8C1.
97. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
98. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
99. Na coluna 2, triângulo só cabe em L7C2 e L8C2; ambas as casas precisam dele.
100. Na coluna 6, triângulo só cabe em L7C6 e L8C6; ambas as casas precisam dele.
101. coluna 7 já tem dois triângulo (L2C7, L6C7); exclua triângulo de L8C7.
102. coluna 7 já tem dois quadrado (L1C7, L5C7); exclua quadrado de L7C7.
103. coluna 7 já tem dois quadrado (L1C7, L5C7); exclua quadrado de L8C7.

## 29. Aprendiz — pacto-084

**Descoberta:** Exclusão ao redor da dupla.

**Técnicas combinadas:** cota saturada; posições restantes; prevenção de trio; exclusão junto à dupla; parceiro obrigatório / orientação; prevenção de isolamento.

**Origem:** pacto-084; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 14; 108 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C2: círculo — exclusão junto à dupla; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 58.
- L1C4: quadrado — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 54.
- L1C5: losango — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C6: losango — cota saturada; posições restantes; primeira participação no passo 1.
- L2C3: triângulo — prevenção de trio; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 33.
- L2C5: círculo — cota saturada; posições restantes; primeira participação no passo 5.
- L2C6: círculo — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 5.
- L3C2: triângulo — prevenção de trio; parceiro obrigatório / orientação; primeira participação no passo 33.
- L3C7: círculo — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 10.
- L3C8: círculo — cota saturada; exclusão junto à dupla; primeira participação no passo 10.
- L4C3: quadrado — parceiro obrigatório / orientação; posições restantes; cota saturada; primeira participação no passo 61.
- L4C4: triângulo — parceiro obrigatório / orientação; posições restantes; cota saturada; primeira participação no passo 37.
- L5C3: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 51.
- L5C5: quadrado — cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 15.
- L5C7: quadrado — cota saturada; posições restantes; primeira participação no passo 15.
- L5C8: triângulo — posições restantes; cota saturada; primeira participação no passo 51.
- L6C3: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 19.
- L6C4: círculo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 19.
- L7C1: triângulo — cota saturada; prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 25.
- L7C4: losango — posições restantes; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 54.
- L7C5: triângulo — cota saturada; posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 25.
- L8C2: quadrado — prevenção de isolamento; posições restantes; cota saturada; primeira participação no passo 43.
- L8C5: triângulo — posições restantes; cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 30.
- L8C7: losango — prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 48.

### Sequência lógica

1. linha 1 já tem dois losango (L1C5, L1C6); exclua losango de L1C1.
2. linha 1 já tem dois losango (L1C5, L1C6); exclua losango de L1C3.
3. linha 1 já tem dois losango (L1C5, L1C6); exclua losango de L1C7.
4. linha 1 já tem dois losango (L1C5, L1C6); exclua losango de L1C8.
5. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C1.
6. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C2.
7. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C4.
8. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C7.
9. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C8.
10. linha 3 já tem dois círculo (L3C7, L3C8); exclua círculo de L3C1.
11. linha 3 já tem dois círculo (L3C7, L3C8); exclua círculo de L3C3.
12. linha 3 já tem dois círculo (L3C7, L3C8); exclua círculo de L3C4.
13. linha 3 já tem dois círculo (L3C7, L3C8); exclua círculo de L3C5.
14. linha 3 já tem dois círculo (L3C7, L3C8); exclua círculo de L3C6.
15. linha 5 já tem dois quadrado (L5C5, L5C7); exclua quadrado de L5C1.
16. linha 5 já tem dois quadrado (L5C5, L5C7); exclua quadrado de L5C2.
17. linha 5 já tem dois quadrado (L5C5, L5C7); exclua quadrado de L5C4.
18. linha 5 já tem dois quadrado (L5C5, L5C7); exclua quadrado de L5C6.
19. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C1.
20. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C2.
21. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C5.
22. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C6.
23. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C7.
24. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C8.
25. linha 7 já tem dois triângulo (L7C1, L7C5); exclua triângulo de L7C2.
26. linha 7 já tem dois triângulo (L7C1, L7C5); exclua triângulo de L7C3.
27. linha 7 já tem dois triângulo (L7C1, L7C5); exclua triângulo de L7C6.
28. linha 7 já tem dois triângulo (L7C1, L7C5); exclua triângulo de L7C7.
29. linha 7 já tem dois triângulo (L7C1, L7C5); exclua triângulo de L7C8.
30. Na coluna 5, círculo só cabe em L2C5 e L4C5; ambas as casas precisam dele.
31. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L3C5.
32. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L6C5.
33. L2C2 não pode ser triângulo: tocaria L3C2 e L2C3, formando um grupo maior que dois.
34. L3C3 não pode ser triângulo: tocaria L2C3 e L3C2, formando um grupo maior que dois.
35. A dupla L3C7–L3C8 já está fechada; L4C7 não pode tocar essa dupla com outro círculo.
36. A dupla L3C8–L3C7 já está fechada; L4C8 não pode tocar essa dupla com outro círculo.
37. L4C5 precisa de um parceiro círculo; só L4C6 pode recebê-lo (horizontal).
38. A dupla L4C6–L4C5 já está fechada; L5C6 não pode tocar essa dupla com outro círculo.
39. L5C5 precisa de um parceiro quadrado; só L6C5 pode recebê-lo (vertical).
40. A dupla L6C3–L6C4 já está fechada; L7C3 não pode tocar essa dupla com outro círculo.
41. A dupla L6C4–L6C3 já está fechada; L5C4 não pode tocar essa dupla com outro círculo.
42. A dupla L6C5–L5C5 já está fechada; L6C6 não pode tocar essa dupla com outro quadrado.
43. L7C2 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
44. L8C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
45. L8C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
46. A dupla L8C5–L7C5 já está fechada; L8C4 não pode tocar essa dupla com outro triângulo.
47. A dupla L8C5–L7C5 já está fechada; L8C6 não pode tocar essa dupla com outro triângulo.
48. L8C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
49. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C1.
50. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C2.
51. Na linha 5, círculo só cabe em L5C1 e L5C2; ambas as casas precisam dele.
52. Na linha 5, círculo só cabe em L5C1 e L5C2; ambas as casas precisam dele.
53. Na coluna 1, círculo só cabe em L1C1 e L5C1; ambas as casas precisam dele.
54. Na coluna 4, círculo só cabe em L6C4 e L8C4; ambas as casas precisam dele.
55. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L3C5.
56. coluna 6 já tem dois círculo (L2C6, L4C6); exclua círculo de L7C6.
57. coluna 6 já tem dois círculo (L2C6, L4C6); exclua círculo de L8C6.
58. A dupla L1C2–L1C1 já está fechada; L1C3 não pode tocar essa dupla com outro círculo.
59. L3C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
60. L3C6 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
61. L5C3 precisa de um parceiro losango; só L5C4 pode recebê-lo (horizontal).
62. L7C4 precisa de um parceiro losango; só L7C3 pode recebê-lo (horizontal).
63. L8C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
64. L8C4 precisa de um parceiro círculo; só L8C3 pode recebê-lo (horizontal).
65. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C7.
66. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C8.
67. linha 3 já tem dois losango (L3C5, L3C6); exclua losango de L3C1.
68. linha 3 já tem dois losango (L3C5, L3C6); exclua losango de L3C3.
69. linha 3 já tem dois losango (L3C5, L3C6); exclua losango de L3C4.
70. Na linha 5, triângulo só cabe em L5C6 e L5C8; ambas as casas precisam dele.
71. Na linha 7, círculo só cabe em L7C7 e L7C8; ambas as casas precisam dele.
72. Na linha 7, círculo só cabe em L7C7 e L7C8; ambas as casas precisam dele.
73. Na linha 7, quadrado só cabe em L7C2 e L7C6; ambas as casas precisam dele.
74. Na linha 7, quadrado só cabe em L7C2 e L7C6; ambas as casas precisam dele.
75. linha 8 já tem dois círculo (L8C3, L8C4); exclua círculo de L8C8.
76. Na linha 8, triângulo só cabe em L8C1 e L8C5; ambas as casas precisam dele.
77. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L2C1.
78. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L3C1.
79. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L4C1.
80. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L6C1.
81. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L2C2.
82. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L4C2.
83. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L6C2.
84. Na coluna 3, triângulo só cabe em L1C3 e L2C3; ambas as casas precisam dele.
85. coluna 4 já tem dois losango (L5C4, L7C4); exclua losango de L2C4.
86. Na coluna 6, triângulo só cabe em L5C6 e L6C6; ambas as casas precisam dele.
87. Na coluna 6, quadrado só cabe em L7C6 e L8C6; ambas as casas precisam dele.
88. L1C4 precisa de um parceiro quadrado; só L2C4 pode recebê-lo (vertical).
89. L2C2 precisa de um parceiro losango; só L2C1 pode recebê-lo (horizontal).
90. A dupla L2C4–L1C4 já está fechada; L3C4 não pode tocar essa dupla com outro quadrado.
91. L3C1 precisa de um parceiro quadrado; só L4C1 pode recebê-lo (vertical).
92. L3C2 precisa de um parceiro triângulo; só L4C2 pode recebê-lo (vertical).
93. L6C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
94. L6C1 precisa de um parceiro losango; só L6C2 pode recebê-lo (horizontal).
95. A dupla L6C6–L5C6 já está fechada; L6C7 não pode tocar essa dupla com outro triângulo.
96. L8C7 precisa de um parceiro losango; só L8C8 pode recebê-lo (horizontal).
97. linha 2 já tem dois losango (L2C1, L2C2); exclua losango de L2C7.
98. linha 2 já tem dois losango (L2C1, L2C2); exclua losango de L2C8.
99. linha 4 já tem dois triângulo (L4C2, L4C4); exclua triângulo de L4C7.
100. linha 4 já tem dois triângulo (L4C2, L4C4); exclua triângulo de L4C8.
101. linha 4 já tem dois quadrado (L4C1, L4C3); exclua quadrado de L4C7.
102. linha 4 já tem dois quadrado (L4C1, L4C3); exclua quadrado de L4C8.
103. Na linha 6, triângulo só cabe em L6C6 e L6C8; ambas as casas precisam dele.
104. Na linha 6, quadrado só cabe em L6C5 e L6C7; ambas as casas precisam dele.
105. Na coluna 7, triângulo só cabe em L1C7 e L2C7; ambas as casas precisam dele.
106. Na coluna 7, triângulo só cabe em L1C7 e L2C7; ambas as casas precisam dele.
107. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L1C8.
108. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L2C8.

## 30. Aprendiz — pacto-087

**Descoberta:** Linha e coluna em sequência.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; prevenção de isolamento; parceiro obrigatório / orientação; prevenção de trio; posições restantes.

**Origem:** pacto-087; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 14; 109 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C2: quadrado — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C3: quadrado — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L1C5: triângulo — prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 30.
- L1C8: círculo — parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 72.
- L2C4: losango — prevenção de isolamento; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 30.
- L2C5: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 25.
- L3C2: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 5.
- L3C5: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 5.
- L3C6: círculo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 34.
- L3C7: quadrado — parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; exclusão junto à dupla; primeira participação no passo 34.
- L4C5: losango — cota saturada; exclusão junto à dupla; primeira participação no passo 27.
- L5C3: losango — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 21.
- L6C1: triângulo — parceiro obrigatório / orientação; prevenção de trio; cota saturada; posições restantes; primeira participação no passo 40.
- L6C2: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 9.
- L6C3: losango — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 12.
- L6C5: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 9.
- L6C6: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 12.
- L7C2: triângulo — parceiro obrigatório / orientação; prevenção de trio; exclusão junto à dupla; cota saturada; primeira participação no passo 40.
- L7C5: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 15.
- L7C6: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 15.
- L7C7: círculo — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 47.
- L7C8: losango — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 47.
- L8C2: quadrado — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 18.
- L8C6: triângulo — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 50.

### Sequência lógica

1. linha 1 já tem dois quadrado (L1C2, L1C3); exclua quadrado de L1C1.
2. linha 1 já tem dois quadrado (L1C2, L1C3); exclua quadrado de L1C4.
3. linha 1 já tem dois quadrado (L1C2, L1C3); exclua quadrado de L1C6.
4. linha 1 já tem dois quadrado (L1C2, L1C3); exclua quadrado de L1C7.
5. linha 3 já tem dois losango (L3C2, L3C5); exclua losango de L3C1.
6. linha 3 já tem dois losango (L3C2, L3C5); exclua losango de L3C3.
7. linha 3 já tem dois losango (L3C2, L3C5); exclua losango de L3C4.
8. linha 3 já tem dois losango (L3C2, L3C5); exclua losango de L3C8.
9. linha 6 já tem dois círculo (L6C2, L6C5); exclua círculo de L6C4.
10. linha 6 já tem dois círculo (L6C2, L6C5); exclua círculo de L6C7.
11. linha 6 já tem dois círculo (L6C2, L6C5); exclua círculo de L6C8.
12. linha 6 já tem dois losango (L6C3, L6C6); exclua losango de L6C4.
13. linha 6 já tem dois losango (L6C3, L6C6); exclua losango de L6C7.
14. linha 6 já tem dois losango (L6C3, L6C6); exclua losango de L6C8.
15. linha 7 já tem dois quadrado (L7C5, L7C6); exclua quadrado de L7C1.
16. linha 7 já tem dois quadrado (L7C5, L7C6); exclua quadrado de L7C3.
17. linha 7 já tem dois quadrado (L7C5, L7C6); exclua quadrado de L7C4.
18. coluna 2 já tem dois quadrado (L1C2, L8C2); exclua quadrado de L2C2.
19. coluna 2 já tem dois quadrado (L1C2, L8C2); exclua quadrado de L4C2.
20. coluna 2 já tem dois quadrado (L1C2, L8C2); exclua quadrado de L5C2.
21. coluna 3 já tem dois losango (L5C3, L6C3); exclua losango de L2C3.
22. coluna 3 já tem dois losango (L5C3, L6C3); exclua losango de L4C3.
23. coluna 3 já tem dois losango (L5C3, L6C3); exclua losango de L7C3.
24. coluna 3 já tem dois losango (L5C3, L6C3); exclua losango de L8C3.
25. coluna 5 já tem dois quadrado (L2C5, L7C5); exclua quadrado de L5C5.
26. coluna 5 já tem dois quadrado (L2C5, L7C5); exclua quadrado de L8C5.
27. coluna 5 já tem dois losango (L3C5, L4C5); exclua losango de L5C5.
28. coluna 5 já tem dois losango (L3C5, L4C5); exclua losango de L8C5.
29. A dupla L1C3–L1C2 já está fechada; L2C3 não pode tocar essa dupla com outro quadrado.
30. L1C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
31. L2C4 precisa de um parceiro losango; só L1C4 pode recebê-lo (vertical).
32. L2C5 precisa de um parceiro quadrado; só L2C6 pode recebê-lo (horizontal).
33. A dupla L2C6–L2C5 já está fechada; L2C7 não pode tocar essa dupla com outro quadrado.
34. L3C6 precisa de um parceiro círculo; só L4C6 pode recebê-lo (vertical).
35. A dupla L4C5–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro losango.
36. A dupla L4C6–L3C6 já está fechada; L5C6 não pode tocar essa dupla com outro círculo.
37. A dupla L4C6–L3C6 já está fechada; L4C7 não pode tocar essa dupla com outro círculo.
38. A dupla L5C3–L6C3 já está fechada; L5C2 não pode tocar essa dupla com outro losango.
39. A dupla L5C3–L6C3 já está fechada; L5C4 não pode tocar essa dupla com outro losango.
40. L6C2 precisa de um parceiro círculo; só L5C2 pode recebê-lo (vertical).
41. L6C5 precisa de um parceiro círculo; só L5C5 pode recebê-lo (vertical).
42. L6C6 precisa de um parceiro losango; só L5C6 pode recebê-lo (vertical).
43. L7C1 não pode ser triângulo: tocaria L6C1 e L7C2, formando um grupo maior que dois.
44. L7C2 precisa de um parceiro triângulo; só L7C3 pode recebê-lo (horizontal).
45. A dupla L7C3–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro triângulo.
46. A dupla L7C3–L7C2 já está fechada; L7C4 não pode tocar essa dupla com outro triângulo.
47. L7C7 precisa de um parceiro círculo; só L8C7 pode recebê-lo (vertical).
48. L7C8 precisa de um parceiro losango; só L8C8 pode recebê-lo (vertical).
49. L8C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
50. L8C6 precisa de um parceiro triângulo; só L8C5 pode recebê-lo (horizontal).
51. linha 2 já tem dois quadrado (L2C5, L2C6); exclua quadrado de L2C1.
52. linha 2 já tem dois quadrado (L2C5, L2C6); exclua quadrado de L2C8.
53. linha 5 já tem dois círculo (L5C2, L5C5); exclua círculo de L5C1.
54. linha 5 já tem dois círculo (L5C2, L5C5); exclua círculo de L5C4.
55. linha 5 já tem dois círculo (L5C2, L5C5); exclua círculo de L5C7.
56. linha 5 já tem dois círculo (L5C2, L5C5); exclua círculo de L5C8.
57. linha 5 já tem dois losango (L5C3, L5C6); exclua losango de L5C1.
58. linha 5 já tem dois losango (L5C3, L5C6); exclua losango de L5C7.
59. linha 5 já tem dois losango (L5C3, L5C6); exclua losango de L5C8.
60. linha 8 já tem dois triângulo (L8C5, L8C6); exclua triângulo de L8C4.
61. coluna 2 já tem dois círculo (L5C2, L6C2); exclua círculo de L2C2.
62. coluna 2 já tem dois círculo (L5C2, L6C2); exclua círculo de L4C2.
63. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L7C4.
64. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L8C4.
65. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L1C6.
66. Na coluna 6, triângulo só cabe em L1C6 e L8C6; ambas as casas precisam dele.
67. coluna 7 já tem dois círculo (L7C7, L8C7); exclua círculo de L1C7.
68. coluna 7 já tem dois círculo (L7C7, L8C7); exclua círculo de L2C7.
69. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L2C8.
70. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L4C8.
71. A dupla L1C6–L1C5 já está fechada; L1C7 não pode tocar essa dupla com outro triângulo.
72. L1C7 precisa de um parceiro losango; só L2C7 pode recebê-lo (vertical).
73. L1C8 precisa de um parceiro círculo; só L2C8 pode recebê-lo (vertical).
74. A dupla L2C8–L1C8 já está fechada; L3C8 não pode tocar essa dupla com outro círculo.
75. L4C7 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
76. L4C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
77. L6C1 precisa de um parceiro triângulo; só L5C1 pode recebê-lo (vertical).
78. L7C4 precisa de um parceiro círculo; só L8C4 pode recebê-lo (vertical).
79. A dupla L8C4–L7C4 já está fechada; L8C3 não pode tocar essa dupla com outro círculo.
80. Na linha 1, círculo só cabe em L1C1 e L1C8; ambas as casas precisam dele.
81. linha 2 já tem dois losango (L2C4, L2C7); exclua losango de L2C1.
82. linha 2 já tem dois losango (L2C4, L2C7); exclua losango de L2C2.
83. linha 7 já tem dois círculo (L7C4, L7C7); exclua círculo de L7C1.
84. linha 8 já tem dois círculo (L8C4, L8C7); exclua círculo de L8C1.
85. linha 8 já tem dois quadrado (L8C2, L8C3); exclua quadrado de L8C1.
86. coluna 1 já tem dois triângulo (L5C1, L6C1); exclua triângulo de L2C1.
87. coluna 1 já tem dois triângulo (L5C1, L6C1); exclua triângulo de L3C1.
88. coluna 1 já tem dois triângulo (L5C1, L6C1); exclua triângulo de L4C1.
89. Na coluna 1, quadrado só cabe em L3C1 e L4C1; ambas as casas precisam dele.
90. Na coluna 1, quadrado só cabe em L3C1 e L4C1; ambas as casas precisam dele.
91. coluna 2 já tem dois triângulo (L2C2, L7C2); exclua triângulo de L4C2.
92. coluna 3 já tem dois quadrado (L1C3, L8C3); exclua quadrado de L3C3.
93. coluna 3 já tem dois quadrado (L1C3, L8C3); exclua quadrado de L4C3.
94. coluna 4 já tem dois círculo (L7C4, L8C4); exclua círculo de L3C4.
95. coluna 4 já tem dois círculo (L7C4, L8C4); exclua círculo de L4C4.
96. L2C2 precisa de um parceiro triângulo; só L2C3 pode recebê-lo (horizontal).
97. A dupla L2C3–L2C2 já está fechada; L3C3 não pode tocar essa dupla com outro triângulo.
98. L3C3 precisa de um parceiro círculo; só L4C3 pode recebê-lo (vertical).
99. Na linha 3, triângulo só cabe em L3C4 e L3C8; ambas as casas precisam dele.
100. Na linha 3, triângulo só cabe em L3C4 e L3C8; ambas as casas precisam dele.
101. L3C4 precisa de um parceiro triângulo; só L4C4 pode recebê-lo (vertical).
102. L3C7 precisa de um parceiro quadrado; só L4C7 pode recebê-lo (vertical).
103. L3C8 precisa de um parceiro triângulo; só L4C8 pode recebê-lo (vertical).
104. A dupla L4C4–L3C4 já está fechada; L5C4 não pode tocar essa dupla com outro triângulo.
105. A dupla L4C7–L3C7 já está fechada; L5C7 não pode tocar essa dupla com outro quadrado.
106. A dupla L4C8–L3C8 já está fechada; L5C8 não pode tocar essa dupla com outro triângulo.
107. L5C4 precisa de um parceiro quadrado; só L6C4 pode recebê-lo (vertical).
108. L5C7 precisa de um parceiro triângulo; só L6C7 pode recebê-lo (vertical).
109. L5C8 precisa de um parceiro quadrado; só L6C8 pode recebê-lo (vertical).

## 31. Intermediário — pacto-088

**Descoberta:** Cota e parceria retornam à região.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; prevenção de trio; posições restantes.

**Origem:** pacto-088; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 15; 109 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: círculo — parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 26.
- L1C2: triângulo — parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; primeira participação no passo 26.
- L1C4: quadrado — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 24.
- L1C7: losango — posições restantes; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 58.
- L2C4: losango — posições restantes; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 54.
- L2C5: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 41.
- L3C3: círculo — cota saturada; prevenção de isolamento; exclusão junto à dupla; posições restantes; primeira participação no passo 17.
- L3C7: triângulo — posições restantes; parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; primeira participação no passo 58.
- L4C1: losango — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L4C2: losango — cota saturada; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 1.
- L4C4: triângulo — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 21.
- L4C5: quadrado — exclusão junto à dupla; primeira participação no passo 62.
- L5C1: quadrado — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 5.
- L5C2: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 5.
- L5C3: círculo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 17.
- L5C8: triângulo — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 77.
- L6C2: losango — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 14.
- L6C4: triângulo — cota saturada; posições restantes; prevenção de isolamento; primeira participação no passo 21.
- L6C7: círculo — prevenção de trio; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 35.
- L7C2: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 9.
- L7C4: quadrado — cota saturada; posições restantes; prevenção de trio; primeira participação no passo 24.
- L7C6: círculo — cota saturada; prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 9.
- L8C3: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 50.
- L8C8: quadrado — posições restantes; primeira participação no passo 94.

### Sequência lógica

1. linha 4 já tem dois losango (L4C1, L4C2); exclua losango de L4C3.
2. linha 4 já tem dois losango (L4C1, L4C2); exclua losango de L4C6.
3. linha 4 já tem dois losango (L4C1, L4C2); exclua losango de L4C7.
4. linha 4 já tem dois losango (L4C1, L4C2); exclua losango de L4C8.
5. linha 5 já tem dois quadrado (L5C1, L5C2); exclua quadrado de L5C4.
6. linha 5 já tem dois quadrado (L5C1, L5C2); exclua quadrado de L5C5.
7. linha 5 já tem dois quadrado (L5C1, L5C2); exclua quadrado de L5C6.
8. linha 5 já tem dois quadrado (L5C1, L5C2); exclua quadrado de L5C7.
9. linha 7 já tem dois círculo (L7C2, L7C6); exclua círculo de L7C1.
10. linha 7 já tem dois círculo (L7C2, L7C6); exclua círculo de L7C3.
11. linha 7 já tem dois círculo (L7C2, L7C6); exclua círculo de L7C5.
12. linha 7 já tem dois círculo (L7C2, L7C6); exclua círculo de L7C7.
13. linha 7 já tem dois círculo (L7C2, L7C6); exclua círculo de L7C8.
14. coluna 2 já tem dois losango (L4C2, L6C2); exclua losango de L2C2.
15. coluna 2 já tem dois losango (L4C2, L6C2); exclua losango de L3C2.
16. coluna 2 já tem dois losango (L4C2, L6C2); exclua losango de L8C2.
17. coluna 3 já tem dois círculo (L3C3, L5C3); exclua círculo de L1C3.
18. coluna 3 já tem dois círculo (L3C3, L5C3); exclua círculo de L2C3.
19. coluna 3 já tem dois círculo (L3C3, L5C3); exclua círculo de L4C3.
20. coluna 3 já tem dois círculo (L3C3, L5C3); exclua círculo de L6C3.
21. coluna 4 já tem dois triângulo (L4C4, L6C4); exclua triângulo de L3C4.
22. coluna 4 já tem dois triângulo (L4C4, L6C4); exclua triângulo de L5C4.
23. coluna 4 já tem dois triângulo (L4C4, L6C4); exclua triângulo de L8C4.
24. coluna 4 já tem dois quadrado (L1C4, L7C4); exclua quadrado de L3C4.
25. coluna 4 já tem dois quadrado (L1C4, L7C4); exclua quadrado de L8C4.
26. L1C1 precisa de um parceiro círculo; só L2C1 pode recebê-lo (vertical).
27. A dupla L2C1–L1C1 já está fechada; L3C1 não pode tocar essa dupla com outro círculo.
28. A dupla L2C1–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro círculo.
29. A dupla L4C1–L4C2 já está fechada; L3C1 não pode tocar essa dupla com outro losango.
30. L4C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
31. A dupla L5C1–L5C2 já está fechada; L6C1 não pode tocar essa dupla com outro quadrado.
32. L5C3 precisa de um parceiro círculo; só L5C4 pode recebê-lo (horizontal).
33. A dupla L5C4–L5C3 já está fechada; L5C5 não pode tocar essa dupla com outro círculo.
34. L6C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
35. L6C6 não pode ser círculo: tocaria L7C6 e L6C7, formando um grupo maior que dois.
36. L7C2 precisa de um parceiro círculo; só L8C2 pode recebê-lo (vertical).
37. L7C6 precisa de um parceiro círculo; só L8C6 pode recebê-lo (vertical).
38. A dupla L8C2–L7C2 já está fechada; L8C1 não pode tocar essa dupla com outro círculo.
39. A dupla L8C6–L7C6 já está fechada; L8C5 não pode tocar essa dupla com outro círculo.
40. A dupla L8C6–L7C6 já está fechada; L8C7 não pode tocar essa dupla com outro círculo.
41. linha 2 já tem dois círculo (L2C1, L2C5); exclua círculo de L2C6.
42. linha 2 já tem dois círculo (L2C1, L2C5); exclua círculo de L2C7.
43. linha 2 já tem dois círculo (L2C1, L2C5); exclua círculo de L2C8.
44. linha 4 já tem dois triângulo (L4C3, L4C4); exclua triângulo de L4C6.
45. linha 4 já tem dois triângulo (L4C3, L4C4); exclua triângulo de L4C7.
46. linha 4 já tem dois triângulo (L4C3, L4C4); exclua triângulo de L4C8.
47. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C6.
48. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C7.
49. linha 8 já tem dois círculo (L8C2, L8C6); exclua círculo de L8C4.
50. linha 8 já tem dois losango (L8C3, L8C4); exclua losango de L8C1.
51. linha 8 já tem dois losango (L8C3, L8C4); exclua losango de L8C5.
52. linha 8 já tem dois losango (L8C3, L8C4); exclua losango de L8C7.
53. coluna 2 já tem dois círculo (L7C2, L8C2); exclua círculo de L3C2.
54. Na coluna 4, círculo só cabe em L3C4 e L5C4; ambas as casas precisam dele.
55. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L1C6.
56. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L3C6.
57. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L4C6.
58. Na coluna 7, círculo só cabe em L4C7 e L6C7; ambas as casas precisam dele.
59. L1C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
60. L2C4 precisa de um parceiro losango; só L2C3 pode recebê-lo (horizontal).
61. A dupla L3C4–L3C3 já está fechada; L3C5 não pode tocar essa dupla com outro círculo.
62. A dupla L4C5–L4C6 já está fechada; L3C5 não pode tocar essa dupla com outro quadrado.
63. A dupla L4C6–L4C5 já está fechada; L3C6 não pode tocar essa dupla com outro quadrado.
64. L4C7 precisa de um parceiro círculo; só L4C8 pode recebê-lo (horizontal).
65. A dupla L4C8–L4C7 já está fechada; L3C8 não pode tocar essa dupla com outro círculo.
66. L6C5 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
67. L6C7 precisa de um parceiro círculo; só L6C8 pode recebê-lo (horizontal).
68. A dupla L8C3–L8C4 já está fechada; L7C3 não pode tocar essa dupla com outro losango.
69. Na linha 1, círculo só cabe em L1C1 e L1C5; ambas as casas precisam dele.
70. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C6.
71. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C7.
72. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C8.
73. coluna 3 já tem dois losango (L2C3, L8C3); exclua losango de L1C3.
74. coluna 3 já tem dois losango (L2C3, L8C3); exclua losango de L6C3.
75. L1C4 precisa de um parceiro quadrado; só L1C3 pode recebê-lo (horizontal).
76. L3C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
77. L5C8 precisa de um parceiro triângulo; só L5C7 pode recebê-lo (horizontal).
78. L6C2 precisa de um parceiro losango; só L6C1 pode recebê-lo (horizontal).
79. linha 1 já tem dois quadrado (L1C3, L1C4); exclua quadrado de L1C6.
80. linha 1 já tem dois quadrado (L1C3, L1C4); exclua quadrado de L1C8.
81. Na linha 3, losango só cabe em L3C5 e L3C6; ambas as casas precisam dele.
82. Na linha 3, losango só cabe em L3C5 e L3C6; ambas as casas precisam dele.
83. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C5.
84. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C6.
85. linha 6 já tem dois losango (L6C1, L6C2); exclua losango de L6C5.
86. linha 6 já tem dois losango (L6C1, L6C2); exclua losango de L6C6.
87. coluna 1 já tem dois losango (L4C1, L6C1); exclua losango de L7C1.
88. coluna 5 já tem dois losango (L3C5, L5C5); exclua losango de L7C5.
89. coluna 6 já tem dois losango (L3C6, L5C6); exclua losango de L1C6.
90. coluna 7 já tem dois triângulo (L3C7, L5C7); exclua triângulo de L2C7.
91. coluna 7 já tem dois triângulo (L3C7, L5C7); exclua triângulo de L7C7.
92. coluna 7 já tem dois triângulo (L3C7, L5C7); exclua triângulo de L8C7.
93. coluna 7 já tem dois quadrado (L2C7, L8C7); exclua quadrado de L7C7.
94. Na coluna 8, losango só cabe em L1C8 e L7C8; ambas as casas precisam dele.
95. Na coluna 8, losango só cabe em L1C8 e L7C8; ambas as casas precisam dele.
96. L1C2 precisa de um parceiro triângulo; só L2C2 pode recebê-lo (vertical).
97. L1C6 precisa de um parceiro triângulo; só L2C6 pode recebê-lo (vertical).
98. A dupla L2C2–L1C2 já está fechada; L3C2 não pode tocar essa dupla com outro triângulo.
99. L2C7 precisa de um parceiro quadrado; só L2C8 pode recebê-lo (horizontal).
100. A dupla L2C8–L2C7 já está fechada; L3C8 não pode tocar essa dupla com outro quadrado.
101. L3C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
102. Na linha 8, triângulo só cabe em L8C1 e L8C5; ambas as casas precisam dele.
103. Na linha 8, triângulo só cabe em L8C1 e L8C5; ambas as casas precisam dele.
104. Na coluna 1, triângulo só cabe em L7C1 e L8C1; ambas as casas precisam dele.
105. coluna 6 já tem dois triângulo (L1C6, L2C6); exclua triângulo de L6C6.
106. L6C6 precisa de um parceiro quadrado; só L6C5 pode recebê-lo (horizontal).
107. L7C5 não pode ser quadrado: tocaria L6C5 e L7C4, formando um grupo maior que dois.
108. Na linha 6, triângulo só cabe em L6C3 e L6C4; ambas as casas precisam dele.
109. linha 7 já tem dois triângulo (L7C1, L7C5); exclua triângulo de L7C3.

## 32. Intermediário — pacto-094

**Descoberta:** Evitar isolamento mesmo com cota livre.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; prevenção de trio.

**Origem:** pacto-094; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 15; 108 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C6: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 94.
- L1C8: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 68.
- L2C4: losango — cota saturada; prevenção de isolamento; prevenção de trio; primeira participação no passo 72.
- L3C7: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 37.
- L4C1: círculo — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 29.
- L4C2: quadrado — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 29.
- L4C3: losango — parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; exclusão junto à dupla; primeira participação no passo 29.
- L4C5: triângulo — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L4C6: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L5C2: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 8.
- L5C3: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 4.
- L5C4: triângulo — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 4.
- L5C7: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 8.
- L6C1: quadrado — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 32.
- L6C2: losango — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 12.
- L6C4: círculo — parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; primeira participação no passo 33.
- L6C5: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 19.
- L6C7: losango — cota saturada; posições restantes; primeira participação no passo 12.
- L7C1: losango — parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; primeira participação no passo 32.
- L7C3: quadrado — prevenção de isolamento; posições restantes; exclusão junto à dupla; primeira participação no passo 35.
- L7C6: círculo — cota saturada; posições restantes; exclusão junto à dupla; primeira participação no passo 93.
- L8C2: triângulo — prevenção de isolamento; posições restantes; exclusão junto à dupla; primeira participação no passo 35.
- L8C6: quadrado — posições restantes; primeira participação no passo 94.
- L8C8: losango — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 36.

### Sequência lógica

1. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C4.
2. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C7.
3. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C8.
4. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C1.
5. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C5.
6. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C6.
7. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C8.
8. linha 5 já tem dois losango (L5C2, L5C7); exclua losango de L5C1.
9. linha 5 já tem dois losango (L5C2, L5C7); exclua losango de L5C5.
10. linha 5 já tem dois losango (L5C2, L5C7); exclua losango de L5C6.
11. linha 5 já tem dois losango (L5C2, L5C7); exclua losango de L5C8.
12. linha 6 já tem dois losango (L6C2, L6C7); exclua losango de L6C3.
13. linha 6 já tem dois losango (L6C2, L6C7); exclua losango de L6C6.
14. linha 6 já tem dois losango (L6C2, L6C7); exclua losango de L6C8.
15. coluna 2 já tem dois losango (L5C2, L6C2); exclua losango de L1C2.
16. coluna 2 já tem dois losango (L5C2, L6C2); exclua losango de L2C2.
17. coluna 2 já tem dois losango (L5C2, L6C2); exclua losango de L3C2.
18. coluna 2 já tem dois losango (L5C2, L6C2); exclua losango de L7C2.
19. coluna 5 já tem dois triângulo (L4C5, L6C5); exclua triângulo de L1C5.
20. coluna 5 já tem dois triângulo (L4C5, L6C5); exclua triângulo de L2C5.
21. coluna 5 já tem dois triângulo (L4C5, L6C5); exclua triângulo de L3C5.
22. coluna 5 já tem dois triângulo (L4C5, L6C5); exclua triângulo de L7C5.
23. coluna 5 já tem dois triângulo (L4C5, L6C5); exclua triângulo de L8C5.
24. coluna 7 já tem dois losango (L5C7, L6C7); exclua losango de L1C7.
25. coluna 7 já tem dois losango (L5C7, L6C7); exclua losango de L2C7.
26. coluna 7 já tem dois losango (L5C7, L6C7); exclua losango de L4C7.
27. coluna 7 já tem dois losango (L5C7, L6C7); exclua losango de L7C7.
28. coluna 7 já tem dois losango (L5C7, L6C7); exclua losango de L8C7.
29. L4C2 precisa de um parceiro quadrado; só L3C2 pode recebê-lo (vertical).
30. A dupla L4C6–L4C5 já está fechada; L3C6 não pode tocar essa dupla com outro triângulo.
31. A dupla L5C3–L5C4 já está fechada; L6C3 não pode tocar essa dupla com outro triângulo.
32. L6C1 precisa de um parceiro quadrado; só L5C1 pode recebê-lo (vertical).
33. L6C5 precisa de um parceiro triângulo; só L6C6 pode recebê-lo (horizontal).
34. L7C1 precisa de um parceiro losango; só L8C1 pode recebê-lo (vertical).
35. L7C2 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
36. L8C8 precisa de um parceiro losango; só L7C8 pode recebê-lo (vertical).
37. linha 3 já tem dois quadrado (L3C2, L3C7); exclua quadrado de L3C1.
38. linha 3 já tem dois quadrado (L3C2, L3C7); exclua quadrado de L3C3.
39. linha 3 já tem dois quadrado (L3C2, L3C7); exclua quadrado de L3C4.
40. linha 3 já tem dois quadrado (L3C2, L3C7); exclua quadrado de L3C5.
41. linha 3 já tem dois quadrado (L3C2, L3C7); exclua quadrado de L3C6.
42. linha 3 já tem dois quadrado (L3C2, L3C7); exclua quadrado de L3C8.
43. linha 6 já tem dois triângulo (L6C5, L6C6); exclua triângulo de L6C8.
44. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C4.
45. linha 7 já tem dois losango (L7C1, L7C8); exclua losango de L7C5.
46. linha 8 já tem dois losango (L8C1, L8C8); exclua losango de L8C3.
47. linha 8 já tem dois losango (L8C1, L8C8); exclua losango de L8C4.
48. linha 8 já tem dois losango (L8C1, L8C8); exclua losango de L8C5.
49. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L1C1.
50. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L2C1.
51. coluna 1 já tem dois losango (L7C1, L8C1); exclua losango de L1C1.
52. coluna 1 já tem dois losango (L7C1, L8C1); exclua losango de L2C1.
53. coluna 1 já tem dois losango (L7C1, L8C1); exclua losango de L3C1.
54. Na coluna 2, círculo só cabe em L1C2 e L2C2; ambas as casas precisam dele.
55. Na coluna 2, círculo só cabe em L1C2 e L2C2; ambas as casas precisam dele.
56. Na coluna 2, triângulo só cabe em L7C2 e L8C2; ambas as casas precisam dele.
57. coluna 6 já tem dois triângulo (L4C6, L6C6); exclua triângulo de L2C6.
58. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L2C8.
59. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L3C8.
60. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L4C8.
61. A dupla L1C2–L2C2 já está fechada; L1C1 não pode tocar essa dupla com outro círculo.
62. A dupla L1C2–L2C2 já está fechada; L1C3 não pode tocar essa dupla com outro círculo.
63. A dupla L2C2–L1C2 já está fechada; L2C1 não pode tocar essa dupla com outro círculo.
64. A dupla L2C2–L1C2 já está fechada; L2C3 não pode tocar essa dupla com outro círculo.
65. L4C1 precisa de um parceiro círculo; só L3C1 pode recebê-lo (vertical).
66. L4C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
67. A dupla L8C2–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro triângulo.
68. linha 1 já tem dois triângulo (L1C1, L1C8); exclua triângulo de L1C3.
69. linha 1 já tem dois triângulo (L1C1, L1C8); exclua triângulo de L1C4.
70. linha 1 já tem dois triângulo (L1C1, L1C8); exclua triângulo de L1C7.
71. Na linha 4, losango só cabe em L4C3 e L4C4; ambas as casas precisam dele.
72. coluna 4 já tem dois losango (L2C4, L4C4); exclua losango de L1C4.
73. coluna 4 já tem dois losango (L2C4, L4C4); exclua losango de L3C4.
74. L1C8 precisa de um parceiro triângulo; só L2C8 pode recebê-lo (vertical).
75. A dupla L2C8–L1C8 já está fechada; L3C8 não pode tocar essa dupla com outro triângulo.
76. A dupla L2C8–L1C8 já está fechada; L2C7 não pode tocar essa dupla com outro triângulo.
77. L3C8 precisa de um parceiro círculo; só L4C8 pode recebê-lo (vertical).
78. A dupla L4C3–L4C4 já está fechada; L3C3 não pode tocar essa dupla com outro losango.
79. A dupla L4C8–L3C8 já está fechada; L5C8 não pode tocar essa dupla com outro círculo.
80. A dupla L4C8–L3C8 já está fechada; L4C7 não pode tocar essa dupla com outro círculo.
81. L5C8 precisa de um parceiro quadrado; só L6C8 pode recebê-lo (vertical).
82. linha 2 já tem dois triângulo (L2C1, L2C8); exclua triângulo de L2C3.
83. linha 3 já tem dois círculo (L3C1, L3C8); exclua círculo de L3C3.
84. linha 3 já tem dois círculo (L3C1, L3C8); exclua círculo de L3C4.
85. linha 3 já tem dois círculo (L3C1, L3C8); exclua círculo de L3C5.
86. linha 3 já tem dois círculo (L3C1, L3C8); exclua círculo de L3C6.
87. Na linha 5, círculo só cabe em L5C5 e L5C6; ambas as casas precisam dele.
88. Na linha 5, círculo só cabe em L5C5 e L5C6; ambas as casas precisam dele.
89. Na linha 6, círculo só cabe em L6C3 e L6C4; ambas as casas precisam dele.
90. Na coluna 3, círculo só cabe em L6C3 e L8C3; ambas as casas precisam dele.
91. coluna 4 já tem dois triângulo (L3C4, L5C4); exclua triângulo de L7C4.
92. coluna 4 já tem dois triângulo (L3C4, L5C4); exclua triângulo de L8C4.
93. coluna 6 já tem dois círculo (L5C6, L7C6); exclua círculo de L2C6.
94. Na coluna 6, quadrado só cabe em L2C6 e L8C6; ambas as casas precisam dele.
95. Na coluna 7, triângulo só cabe em L7C7 e L8C7; ambas as casas precisam dele.
96. Na coluna 7, triângulo só cabe em L7C7 e L8C7; ambas as casas precisam dele.
97. coluna 7 já tem dois quadrado (L3C7, L4C7); exclua quadrado de L1C7.
98. coluna 7 já tem dois quadrado (L3C7, L4C7); exclua quadrado de L2C7.
99. L1C6 precisa de um parceiro losango; só L1C5 pode recebê-lo (horizontal).
100. L2C5 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
101. L2C5 não pode ser losango: tocaria L1C5 e L3C5 e L2C4, formando um grupo maior que dois.
102. A dupla L6C4–L6C3 já está fechada; L7C4 não pode tocar essa dupla com outro círculo.
103. A dupla L7C4–L7C3 já está fechada; L8C4 não pode tocar essa dupla com outro quadrado.
104. A dupla L7C4–L7C3 já está fechada; L7C5 não pode tocar essa dupla com outro quadrado.
105. A dupla L7C5–L7C6 já está fechada; L8C5 não pode tocar essa dupla com outro círculo.
106. linha 1 já tem dois círculo (L1C2, L1C7); exclua círculo de L1C4.
107. Na linha 1, quadrado só cabe em L1C3 e L1C4; ambas as casas precisam dele.
108. linha 2 já tem dois quadrado (L2C5, L2C6); exclua quadrado de L2C3.

## 33. Intermediário — pacto-064

**Descoberta:** Orientação comunica duas faixas.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; posições restantes.

**Origem:** pacto-064; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 16; 103 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C4: círculo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 19.
- L1C6: quadrado — prevenção de isolamento; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 30.
- L1C8: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 68.
- L2C5: triângulo — cota saturada; prevenção de isolamento; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 27.
- L3C4: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 22.
- L3C5: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 27.
- L4C1: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 4.
- L4C2: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 4.
- L4C3: círculo — cota saturada; primeira participação no passo 1.
- L4C4: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L4C7: losango — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 94.
- L5C1: círculo — cota saturada; primeira participação no passo 7.
- L5C2: círculo — cota saturada; primeira participação no passo 7.
- L5C3: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 10.
- L5C4: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 10.
- L5C5: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 99.
- L6C1: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 16.
- L6C2: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 16.
- L6C4: quadrado — cota saturada; posições restantes; primeira participação no passo 22.
- L6C5: círculo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 13.
- L6C7: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 13.
- L7C2: quadrado — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C3: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C5: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 25.

### Sequência lógica

1. linha 4 já tem dois círculo (L4C3, L4C4); exclua círculo de L4C5.
2. linha 4 já tem dois círculo (L4C3, L4C4); exclua círculo de L4C6.
3. linha 4 já tem dois círculo (L4C3, L4C4); exclua círculo de L4C8.
4. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C5.
5. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C6.
6. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C8.
7. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C6.
8. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C7.
9. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C8.
10. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C6.
11. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C7.
12. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C8.
13. linha 6 já tem dois círculo (L6C5, L6C7); exclua círculo de L6C3.
14. linha 6 já tem dois círculo (L6C5, L6C7); exclua círculo de L6C6.
15. linha 6 já tem dois círculo (L6C5, L6C7); exclua círculo de L6C8.
16. linha 6 já tem dois losango (L6C1, L6C2); exclua losango de L6C3.
17. linha 6 já tem dois losango (L6C1, L6C2); exclua losango de L6C6.
18. linha 6 já tem dois losango (L6C1, L6C2); exclua losango de L6C8.
19. coluna 4 já tem dois círculo (L1C4, L4C4); exclua círculo de L2C4.
20. coluna 4 já tem dois círculo (L1C4, L4C4); exclua círculo de L7C4.
21. coluna 4 já tem dois círculo (L1C4, L4C4); exclua círculo de L8C4.
22. coluna 4 já tem dois quadrado (L3C4, L6C4); exclua quadrado de L2C4.
23. coluna 4 já tem dois quadrado (L3C4, L6C4); exclua quadrado de L7C4.
24. coluna 4 já tem dois quadrado (L3C4, L6C4); exclua quadrado de L8C4.
25. coluna 5 já tem dois círculo (L6C5, L7C5); exclua círculo de L1C5.
26. coluna 5 já tem dois círculo (L6C5, L7C5); exclua círculo de L8C5.
27. coluna 5 já tem dois triângulo (L2C5, L3C5); exclua triângulo de L1C5.
28. coluna 5 já tem dois triângulo (L2C5, L3C5); exclua triângulo de L8C5.
29. L1C4 precisa de um parceiro círculo; só L1C3 pode recebê-lo (horizontal).
30. L1C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
31. A dupla L1C6–L1C5 já está fechada; L2C6 não pode tocar essa dupla com outro quadrado.
32. A dupla L1C6–L1C5 já está fechada; L1C7 não pode tocar essa dupla com outro quadrado.
33. A dupla L2C5–L3C5 já está fechada; L2C4 não pode tocar essa dupla com outro triângulo.
34. A dupla L2C5–L3C5 já está fechada; L2C6 não pode tocar essa dupla com outro triângulo.
35. L3C4 precisa de um parceiro quadrado; só L3C3 pode recebê-lo (horizontal).
36. A dupla L3C5–L2C5 já está fechada; L3C6 não pode tocar essa dupla com outro triângulo.
37. A dupla L4C1–L4C2 já está fechada; L3C1 não pode tocar essa dupla com outro triângulo.
38. A dupla L4C2–L4C1 já está fechada; L3C2 não pode tocar essa dupla com outro triângulo.
39. A dupla L5C3–L5C4 já está fechada; L6C3 não pode tocar essa dupla com outro triângulo.
40. A dupla L6C1–L6C2 já está fechada; L7C1 não pode tocar essa dupla com outro losango.
41. L6C7 precisa de um parceiro círculo; só L7C7 pode recebê-lo (vertical).
42. A dupla L7C5–L6C5 já está fechada; L7C6 não pode tocar essa dupla com outro círculo.
43. A dupla L7C7–L6C7 já está fechada; L8C7 não pode tocar essa dupla com outro círculo.
44. A dupla L7C7–L6C7 já está fechada; L7C8 não pode tocar essa dupla com outro círculo.
45. L8C6 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
46. L8C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
47. linha 1 já tem dois círculo (L1C3, L1C4); exclua círculo de L1C1.
48. linha 1 já tem dois círculo (L1C3, L1C4); exclua círculo de L1C2.
49. linha 1 já tem dois círculo (L1C3, L1C4); exclua círculo de L1C7.
50. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C1.
51. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C2.
52. linha 3 já tem dois quadrado (L3C3, L3C4); exclua quadrado de L3C1.
53. linha 3 já tem dois quadrado (L3C3, L3C4); exclua quadrado de L3C2.
54. linha 3 já tem dois quadrado (L3C3, L3C4); exclua quadrado de L3C6.
55. linha 3 já tem dois quadrado (L3C3, L3C4); exclua quadrado de L3C7.
56. linha 3 já tem dois quadrado (L3C3, L3C4); exclua quadrado de L3C8.
57. Na linha 6, triângulo só cabe em L6C6 e L6C8; ambas as casas precisam dele.
58. Na linha 6, triângulo só cabe em L6C6 e L6C8; ambas as casas precisam dele.
59. linha 7 já tem dois círculo (L7C5, L7C7); exclua círculo de L7C1.
60. coluna 3 já tem dois círculo (L1C3, L4C3); exclua círculo de L2C3.
61. coluna 3 já tem dois círculo (L1C3, L4C3); exclua círculo de L8C3.
62. coluna 3 já tem dois quadrado (L3C3, L6C3); exclua quadrado de L2C3.
63. coluna 3 já tem dois quadrado (L3C3, L6C3); exclua quadrado de L8C3.
64. Na coluna 6, círculo só cabe em L2C6 e L3C6; ambas as casas precisam dele.
65. Na coluna 6, círculo só cabe em L2C6 e L3C6; ambas as casas precisam dele.
66. coluna 7 já tem dois círculo (L6C7, L7C7); exclua círculo de L2C7.
67. coluna 7 já tem dois círculo (L6C7, L7C7); exclua círculo de L3C7.
68. Na coluna 8, círculo só cabe em L2C8 e L3C8; ambas as casas precisam dele.
69. Na coluna 8, círculo só cabe em L2C8 e L3C8; ambas as casas precisam dele.
70. L1C8 precisa de um parceiro losango; só L1C7 pode recebê-lo (horizontal).
71. L2C4 precisa de um parceiro losango; só L2C3 pode recebê-lo (horizontal).
72. L2C7 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
73. L6C6 precisa de um parceiro triângulo; só L7C6 pode recebê-lo (vertical).
74. L6C8 precisa de um parceiro triângulo; só L7C8 pode recebê-lo (vertical).
75. A dupla L7C6–L6C6 já está fechada; L8C6 não pode tocar essa dupla com outro triângulo.
76. A dupla L7C8–L6C8 já está fechada; L8C8 não pode tocar essa dupla com outro triângulo.
77. L8C7 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
78. Na linha 1, triângulo só cabe em L1C1 e L1C2; ambas as casas precisam dele.
79. Na linha 1, triângulo só cabe em L1C1 e L1C2; ambas as casas precisam dele.
80. linha 2 já tem dois círculo (L2C6, L2C8); exclua círculo de L2C1.
81. linha 2 já tem dois círculo (L2C6, L2C8); exclua círculo de L2C2.
82. Na linha 2, quadrado só cabe em L2C1 e L2C2; ambas as casas precisam dele.
83. Na linha 2, quadrado só cabe em L2C1 e L2C2; ambas as casas precisam dele.
84. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C7.
85. linha 3 já tem dois círculo (L3C6, L3C8); exclua círculo de L3C1.
86. linha 3 já tem dois círculo (L3C6, L3C8); exclua círculo de L3C2.
87. Na linha 3, triângulo só cabe em L3C5 e L3C7; ambas as casas precisam dele.
88. linha 7 já tem dois triângulo (L7C6, L7C8); exclua triângulo de L7C1.
89. linha 7 já tem dois triângulo (L7C6, L7C8); exclua triângulo de L7C4.
90. Na linha 8, círculo só cabe em L8C1 e L8C2; ambas as casas precisam dele.
91. Na linha 8, círculo só cabe em L8C1 e L8C2; ambas as casas precisam dele.
92. Na linha 8, triângulo só cabe em L8C3 e L8C4; ambas as casas precisam dele.
93. Na linha 8, triângulo só cabe em L8C3 e L8C4; ambas as casas precisam dele.
94. Na coluna 7, quadrado só cabe em L5C7 e L8C7; ambas as casas precisam dele.
95. Na coluna 7, quadrado só cabe em L5C7 e L8C7; ambas as casas precisam dele.
96. L8C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
97. linha 8 já tem dois quadrado (L8C7, L8C8); exclua quadrado de L8C5.
98. linha 8 já tem dois quadrado (L8C7, L8C8); exclua quadrado de L8C6.
99. Na coluna 5, quadrado só cabe em L1C5 e L4C5; ambas as casas precisam dele.
100. L4C5 precisa de um parceiro quadrado; só L4C6 pode recebê-lo (horizontal).
101. A dupla L4C6–L4C5 já está fechada; L5C6 não pode tocar essa dupla com outro quadrado.
102. L4C7 precisa de um parceiro losango; só L4C8 pode recebê-lo (horizontal).
103. A dupla L4C8–L4C7 já está fechada; L5C8 não pode tocar essa dupla com outro losango.

## 34. Intermediário — pacto-067

**Descoberta:** Cota e parceria retornam à região.

**Técnicas combinadas:** cota saturada; prevenção de isolamento; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes.

**Origem:** pacto-067; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 16; 113 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C3: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 5.
- L1C4: quadrado — cota saturada; primeira participação no passo 5.
- L1C7: círculo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 1.
- L1C8: círculo — cota saturada; primeira participação no passo 1.
- L2C3: círculo — parceiro obrigatório / orientação; primeira participação no passo 90.
- L2C8: quadrado — cota saturada; prevenção de isolamento; primeira participação no passo 85.
- L3C3: losango — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 12.
- L3C6: quadrado — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 28.
- L3C7: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; prevenção de isolamento; primeira participação no passo 32.
- L4C1: losango — cota saturada; primeira participação no passo 9.
- L4C2: triângulo — cota saturada; primeira participação no passo 74.
- L4C3: losango — cota saturada; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 9.
- L4C5: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 21.
- L4C7: quadrado — parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 41.
- L5C5: triângulo — cota saturada; prevenção de isolamento; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 24.
- L5C8: losango — prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 43.
- L6C4: quadrado — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 16.
- L6C5: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 24.
- L6C6: losango — exclusão junto à dupla; posições restantes; primeira participação no passo 98.
- L7C1: quadrado — prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 50.
- L7C4: losango — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 47.
- L7C5: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 21.
- L8C2: círculo — prevenção de isolamento; primeira participação no passo 50.
- L8C6: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 28.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C7, L1C8); exclua círculo de L1C1.
2. linha 1 já tem dois círculo (L1C7, L1C8); exclua círculo de L1C2.
3. linha 1 já tem dois círculo (L1C7, L1C8); exclua círculo de L1C5.
4. linha 1 já tem dois círculo (L1C7, L1C8); exclua círculo de L1C6.
5. linha 1 já tem dois quadrado (L1C3, L1C4); exclua quadrado de L1C1.
6. linha 1 já tem dois quadrado (L1C3, L1C4); exclua quadrado de L1C2.
7. linha 1 já tem dois quadrado (L1C3, L1C4); exclua quadrado de L1C5.
8. linha 1 já tem dois quadrado (L1C3, L1C4); exclua quadrado de L1C6.
9. linha 4 já tem dois losango (L4C1, L4C3); exclua losango de L4C4.
10. linha 4 já tem dois losango (L4C1, L4C3); exclua losango de L4C6.
11. linha 4 já tem dois losango (L4C1, L4C3); exclua losango de L4C8.
12. coluna 3 já tem dois losango (L3C3, L4C3); exclua losango de L5C3.
13. coluna 3 já tem dois losango (L3C3, L4C3); exclua losango de L6C3.
14. coluna 3 já tem dois losango (L3C3, L4C3); exclua losango de L7C3.
15. coluna 3 já tem dois losango (L3C3, L4C3); exclua losango de L8C3.
16. coluna 4 já tem dois quadrado (L1C4, L6C4); exclua quadrado de L2C4.
17. coluna 4 já tem dois quadrado (L1C4, L6C4); exclua quadrado de L3C4.
18. coluna 4 já tem dois quadrado (L1C4, L6C4); exclua quadrado de L4C4.
19. coluna 4 já tem dois quadrado (L1C4, L6C4); exclua quadrado de L5C4.
20. coluna 4 já tem dois quadrado (L1C4, L6C4); exclua quadrado de L8C4.
21. coluna 5 já tem dois círculo (L4C5, L7C5); exclua círculo de L2C5.
22. coluna 5 já tem dois círculo (L4C5, L7C5); exclua círculo de L3C5.
23. coluna 5 já tem dois círculo (L4C5, L7C5); exclua círculo de L8C5.
24. coluna 5 já tem dois triângulo (L5C5, L6C5); exclua triângulo de L1C5.
25. coluna 5 já tem dois triângulo (L5C5, L6C5); exclua triângulo de L2C5.
26. coluna 5 já tem dois triângulo (L5C5, L6C5); exclua triângulo de L3C5.
27. coluna 5 já tem dois triângulo (L5C5, L6C5); exclua triângulo de L8C5.
28. coluna 6 já tem dois quadrado (L3C6, L8C6); exclua quadrado de L2C6.
29. coluna 6 já tem dois quadrado (L3C6, L8C6); exclua quadrado de L4C6.
30. coluna 6 já tem dois quadrado (L3C6, L8C6); exclua quadrado de L5C6.
31. coluna 6 já tem dois quadrado (L3C6, L8C6); exclua quadrado de L7C6.
32. coluna 7 já tem dois círculo (L1C7, L3C7); exclua círculo de L2C7.
33. coluna 7 já tem dois círculo (L1C7, L3C7); exclua círculo de L5C7.
34. coluna 7 já tem dois círculo (L1C7, L3C7); exclua círculo de L6C7.
35. coluna 7 já tem dois círculo (L1C7, L3C7); exclua círculo de L7C7.
36. coluna 7 já tem dois círculo (L1C7, L3C7); exclua círculo de L8C7.
37. L2C6 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
38. A dupla L3C3–L4C3 já está fechada; L3C2 não pode tocar essa dupla com outro losango.
39. A dupla L3C3–L4C3 já está fechada; L3C4 não pode tocar essa dupla com outro losango.
40. L3C6 precisa de um parceiro quadrado; só L3C5 pode recebê-lo (horizontal).
41. L3C7 precisa de um parceiro círculo; só L3C8 pode recebê-lo (horizontal).
42. A dupla L3C8–L3C7 já está fechada; L4C8 não pode tocar essa dupla com outro círculo.
43. L4C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
44. L5C4 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
45. A dupla L5C5–L6C5 já está fechada; L5C4 não pode tocar essa dupla com outro triângulo.
46. A dupla L5C5–L6C5 já está fechada; L5C6 não pode tocar essa dupla com outro triângulo.
47. L6C4 precisa de um parceiro quadrado; só L6C3 pode recebê-lo (horizontal).
48. L7C4 precisa de um parceiro losango; só L8C4 pode recebê-lo (vertical).
49. L7C5 precisa de um parceiro círculo; só L7C6 pode recebê-lo (horizontal).
50. L8C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
51. L8C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
52. A dupla L8C4–L7C4 já está fechada; L8C5 não pode tocar essa dupla com outro losango.
53. A dupla L8C6–L8C5 já está fechada; L8C7 não pode tocar essa dupla com outro quadrado.
54. linha 3 já tem dois círculo (L3C7, L3C8); exclua círculo de L3C1.
55. linha 3 já tem dois círculo (L3C7, L3C8); exclua círculo de L3C2.
56. linha 3 já tem dois círculo (L3C7, L3C8); exclua círculo de L3C4.
57. linha 3 já tem dois quadrado (L3C5, L3C6); exclua quadrado de L3C1.
58. linha 3 já tem dois quadrado (L3C5, L3C6); exclua quadrado de L3C2.
59. Na linha 3, losango só cabe em L3C1 e L3C3; ambas as casas precisam dele.
60. linha 6 já tem dois quadrado (L6C3, L6C4); exclua quadrado de L6C1.
61. linha 6 já tem dois quadrado (L6C3, L6C4); exclua quadrado de L6C2.
62. linha 6 já tem dois quadrado (L6C3, L6C4); exclua quadrado de L6C7.
63. linha 6 já tem dois quadrado (L6C3, L6C4); exclua quadrado de L6C8.
64. linha 7 já tem dois círculo (L7C5, L7C6); exclua círculo de L7C2.
65. linha 7 já tem dois círculo (L7C5, L7C6); exclua círculo de L7C3.
66. linha 7 já tem dois círculo (L7C5, L7C6); exclua círculo de L7C8.
67. linha 8 já tem dois quadrado (L8C5, L8C6); exclua quadrado de L8C1.
68. linha 8 já tem dois quadrado (L8C5, L8C6); exclua quadrado de L8C3.
69. linha 8 já tem dois quadrado (L8C5, L8C6); exclua quadrado de L8C8.
70. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L1C1.
71. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L2C1.
72. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L5C1.
73. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L6C1.
74. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L1C2.
75. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L2C2.
76. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L5C2.
77. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L6C2.
78. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L7C2.
79. coluna 3 já tem dois quadrado (L1C3, L6C3); exclua quadrado de L5C3.
80. coluna 3 já tem dois quadrado (L1C3, L6C3); exclua quadrado de L7C3.
81. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L2C4.
82. coluna 5 já tem dois quadrado (L3C5, L8C5); exclua quadrado de L2C5.
83. coluna 8 já tem dois círculo (L1C8, L3C8); exclua círculo de L6C8.
84. coluna 8 já tem dois círculo (L1C8, L3C8); exclua círculo de L8C8.
85. coluna 8 já tem dois quadrado (L2C8, L4C8); exclua quadrado de L7C8.
86. L1C1 precisa de um parceiro triângulo; só L2C1 pode recebê-lo (vertical).
87. L1C2 precisa de um parceiro losango; só L2C2 pode recebê-lo (vertical).
88. A dupla L1C5–L2C5 já está fechada; L1C6 não pode tocar essa dupla com outro losango.
89. L1C6 precisa de um parceiro triângulo; só L2C6 pode recebê-lo (vertical).
90. L2C3 precisa de um parceiro círculo; só L2C4 pode recebê-lo (horizontal).
91. A dupla L2C6–L1C6 já está fechada; L2C7 não pode tocar essa dupla com outro triângulo.
92. L2C7 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
93. L3C4 precisa de um parceiro triângulo; só L4C4 pode recebê-lo (vertical).
94. L4C5 precisa de um parceiro círculo; só L4C6 pode recebê-lo (horizontal).
95. A dupla L4C6–L4C5 já está fechada; L5C6 não pode tocar essa dupla com outro círculo.
96. A dupla L4C7–L4C8 já está fechada; L5C7 não pode tocar essa dupla com outro quadrado.
97. L5C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
98. A dupla L5C6–L6C6 já está fechada; L5C7 não pode tocar essa dupla com outro losango.
99. L5C7 precisa de um parceiro triângulo; só L6C7 pode recebê-lo (vertical).
100. L5C8 precisa de um parceiro losango; só L6C8 pode recebê-lo (vertical).
101. A dupla L6C7–L5C7 já está fechada; L7C7 não pode tocar essa dupla com outro triângulo.
102. A dupla L6C8–L5C8 já está fechada; L7C8 não pode tocar essa dupla com outro losango.
103. L7C1 precisa de um parceiro quadrado; só L7C2 pode recebê-lo (horizontal).
104. L7C3 precisa de um parceiro triângulo; só L8C3 pode recebê-lo (vertical).
105. L7C7 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
106. L7C7 precisa de um parceiro losango; só L8C7 pode recebê-lo (vertical).
107. L7C8 precisa de um parceiro triângulo; só L8C8 pode recebê-lo (vertical).
108. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C1.
109. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C2.
110. linha 5 já tem dois triângulo (L5C5, L5C7); exclua triângulo de L5C1.
111. Na linha 5, quadrado só cabe em L5C1 e L5C2; ambas as casas precisam dele.
112. Na linha 6, círculo só cabe em L6C1 e L6C2; ambas as casas precisam dele.
113. Na linha 6, círculo só cabe em L6C1 e L6C2; ambas as casas precisam dele.

## 35. Intermediário — pacto-102

**Descoberta:** Evitar isolamento mesmo com cota livre.

**Técnicas combinadas:** cota saturada; prevenção de trio; exclusão junto à dupla; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes.

**Origem:** pacto-102; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 16; 122 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C5: losango — posições restantes; parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; primeira participação no passo 58.
- L2C1: quadrado — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; primeira participação no passo 47.
- L2C2: losango — parceiro obrigatório / orientação; posições restantes; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 47.
- L2C3: círculo — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 48.
- L3C3: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 41.
- L4C1: círculo — prevenção de isolamento; cota saturada; posições restantes; primeira participação no passo 75.
- L4C7: quadrado — prevenção de trio; prevenção de isolamento; parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 15.
- L5C1: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 11.
- L5C6: quadrado — cota saturada; prevenção de trio; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L5C8: quadrado — cota saturada; prevenção de trio; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L6C1: losango — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 11.
- L6C5: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 6.
- L6C7: triângulo — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 6.
- L7C6: círculo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 78.
- L7C7: losango — prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 40.

### Sequência lógica

1. linha 5 já tem dois quadrado (L5C6, L5C8); exclua quadrado de L5C2.
2. linha 5 já tem dois quadrado (L5C6, L5C8); exclua quadrado de L5C3.
3. linha 5 já tem dois quadrado (L5C6, L5C8); exclua quadrado de L5C4.
4. linha 5 já tem dois quadrado (L5C6, L5C8); exclua quadrado de L5C5.
5. linha 5 já tem dois quadrado (L5C6, L5C8); exclua quadrado de L5C7.
6. linha 6 já tem dois triângulo (L6C5, L6C7); exclua triângulo de L6C2.
7. linha 6 já tem dois triângulo (L6C5, L6C7); exclua triângulo de L6C3.
8. linha 6 já tem dois triângulo (L6C5, L6C7); exclua triângulo de L6C4.
9. linha 6 já tem dois triângulo (L6C5, L6C7); exclua triângulo de L6C6.
10. linha 6 já tem dois triângulo (L6C5, L6C7); exclua triângulo de L6C8.
11. coluna 1 já tem dois losango (L5C1, L6C1); exclua losango de L1C1.
12. coluna 1 já tem dois losango (L5C1, L6C1); exclua losango de L3C1.
13. coluna 1 já tem dois losango (L5C1, L6C1); exclua losango de L7C1.
14. coluna 1 já tem dois losango (L5C1, L6C1); exclua losango de L8C1.
15. L4C6 não pode ser quadrado: tocaria L5C6 e L4C7, formando um grupo maior que dois.
16. L4C8 não pode ser quadrado: tocaria L5C8 e L4C7, formando um grupo maior que dois.
17. A dupla L5C1–L6C1 já está fechada; L5C2 não pode tocar essa dupla com outro losango.
18. L5C6 precisa de um parceiro quadrado; só L6C6 pode recebê-lo (vertical).
19. L5C7 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
20. L5C7 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
21. L5C8 precisa de um parceiro quadrado; só L6C8 pode recebê-lo (vertical).
22. A dupla L6C1–L5C1 já está fechada; L6C2 não pode tocar essa dupla com outro losango.
23. A dupla L6C8–L5C8 já está fechada; L7C8 não pode tocar essa dupla com outro quadrado.
24. linha 6 já tem dois quadrado (L6C6, L6C8); exclua quadrado de L6C2.
25. linha 6 já tem dois quadrado (L6C6, L6C8); exclua quadrado de L6C3.
26. linha 6 já tem dois quadrado (L6C6, L6C8); exclua quadrado de L6C4.
27. coluna 6 já tem dois quadrado (L5C6, L6C6); exclua quadrado de L1C6.
28. coluna 6 já tem dois quadrado (L5C6, L6C6); exclua quadrado de L2C6.
29. coluna 6 já tem dois quadrado (L5C6, L6C6); exclua quadrado de L3C6.
30. coluna 6 já tem dois quadrado (L5C6, L6C6); exclua quadrado de L8C6.
31. coluna 7 já tem dois triângulo (L5C7, L6C7); exclua triângulo de L1C7.
32. coluna 7 já tem dois triângulo (L5C7, L6C7); exclua triângulo de L2C7.
33. coluna 7 já tem dois triângulo (L5C7, L6C7); exclua triângulo de L3C7.
34. coluna 7 já tem dois triângulo (L5C7, L6C7); exclua triângulo de L8C7.
35. coluna 8 já tem dois quadrado (L5C8, L6C8); exclua quadrado de L1C8.
36. coluna 8 já tem dois quadrado (L5C8, L6C8); exclua quadrado de L2C8.
37. coluna 8 já tem dois quadrado (L5C8, L6C8); exclua quadrado de L3C8.
38. coluna 8 já tem dois quadrado (L5C8, L6C8); exclua quadrado de L8C8.
39. L4C7 precisa de um parceiro quadrado; só L3C7 pode recebê-lo (vertical).
40. L8C7 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
41. linha 3 já tem dois quadrado (L3C3, L3C7); exclua quadrado de L3C1.
42. linha 3 já tem dois quadrado (L3C3, L3C7); exclua quadrado de L3C2.
43. linha 3 já tem dois quadrado (L3C3, L3C7); exclua quadrado de L3C4.
44. linha 3 já tem dois quadrado (L3C3, L3C7); exclua quadrado de L3C5.
45. coluna 7 já tem dois quadrado (L3C7, L4C7); exclua quadrado de L1C7.
46. coluna 7 já tem dois quadrado (L3C7, L4C7); exclua quadrado de L2C7.
47. L2C1 precisa de um parceiro quadrado; só L1C1 pode recebê-lo (vertical).
48. L3C3 precisa de um parceiro quadrado; só L4C3 pode recebê-lo (vertical).
49. A dupla L4C3–L3C3 já está fechada; L4C2 não pode tocar essa dupla com outro quadrado.
50. A dupla L4C3–L3C3 já está fechada; L4C4 não pode tocar essa dupla com outro quadrado.
51. L4C5 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
52. coluna 1 já tem dois quadrado (L1C1, L2C1); exclua quadrado de L7C1.
53. coluna 1 já tem dois quadrado (L1C1, L2C1); exclua quadrado de L8C1.
54. coluna 3 já tem dois quadrado (L3C3, L4C3); exclua quadrado de L1C3.
55. coluna 3 já tem dois quadrado (L3C3, L4C3); exclua quadrado de L7C3.
56. coluna 3 já tem dois quadrado (L3C3, L4C3); exclua quadrado de L8C3.
57. A dupla L1C1–L2C1 já está fechada; L1C2 não pode tocar essa dupla com outro quadrado.
58. Na linha 1, quadrado só cabe em L1C1 e L1C4; ambas as casas precisam dele.
59. Na coluna 2, quadrado só cabe em L7C2 e L8C2; ambas as casas precisam dele.
60. Na coluna 2, quadrado só cabe em L7C2 e L8C2; ambas as casas precisam dele.
61. L1C4 precisa de um parceiro quadrado; só L2C4 pode recebê-lo (vertical).
62. L2C3 precisa de um parceiro círculo; só L1C3 pode recebê-lo (vertical).
63. A dupla L2C4–L1C4 já está fechada; L2C5 não pode tocar essa dupla com outro quadrado.
64. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L5C3.
65. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L6C3.
66. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L7C3.
67. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L8C3.
68. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L7C4.
69. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L8C4.
70. Na coluna 5, quadrado só cabe em L7C5 e L8C5; ambas as casas precisam dele.
71. Na coluna 5, quadrado só cabe em L7C5 e L8C5; ambas as casas precisam dele.
72. L1C2 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
73. A dupla L1C3–L2C3 já está fechada; L1C2 não pode tocar essa dupla com outro círculo.
74. A dupla L2C2–L1C2 já está fechada; L3C2 não pode tocar essa dupla com outro losango.
75. L4C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
76. L6C2 precisa de um parceiro círculo; só L5C2 pode recebê-lo (vertical).
77. L6C5 precisa de um parceiro triângulo; só L5C5 pode recebê-lo (vertical).
78. L7C6 precisa de um parceiro círculo; só L8C6 pode recebê-lo (vertical).
79. A dupla L8C6–L7C6 já está fechada; L8C7 não pode tocar essa dupla com outro círculo.
80. A dupla L8C7–L7C7 já está fechada; L8C8 não pode tocar essa dupla com outro losango.
81. Na linha 1, triângulo só cabe em L1C6 e L1C8; ambas as casas precisam dele.
82. Na linha 1, triângulo só cabe em L1C6 e L1C8; ambas as casas precisam dele.
83. linha 1 já tem dois losango (L1C2, L1C5); exclua losango de L1C7.
84. Na linha 5, círculo só cabe em L5C2 e L5C4; ambas as casas precisam dele.
85. linha 5 já tem dois triângulo (L5C5, L5C7); exclua triângulo de L5C3.
86. Na linha 6, círculo só cabe em L6C2 e L6C4; ambas as casas precisam dele.
87. coluna 2 já tem dois círculo (L5C2, L6C2); exclua círculo de L3C2.
88. coluna 2 já tem dois círculo (L5C2, L6C2); exclua círculo de L4C2.
89. Na coluna 3, triângulo só cabe em L7C3 e L8C3; ambas as casas precisam dele.
90. Na coluna 3, triângulo só cabe em L7C3 e L8C3; ambas as casas precisam dele.
91. coluna 4 já tem dois círculo (L5C4, L6C4); exclua círculo de L3C4.
92. coluna 4 já tem dois círculo (L5C4, L6C4); exclua círculo de L4C4.
93. coluna 4 já tem dois círculo (L5C4, L6C4); exclua círculo de L7C4.
94. coluna 4 já tem dois círculo (L5C4, L6C4); exclua círculo de L8C4.
95. coluna 5 já tem dois triângulo (L5C5, L6C5); exclua triângulo de L2C5.
96. coluna 5 já tem dois triângulo (L5C5, L6C5); exclua triângulo de L3C5.
97. coluna 5 já tem dois triângulo (L5C5, L6C5); exclua triângulo de L4C5.
98. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L2C6.
99. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L3C6.
100. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L4C6.
101. Na coluna 7, círculo só cabe em L1C7 e L2C7; ambas as casas precisam dele.
102. L1C5 precisa de um parceiro losango; só L2C5 pode recebê-lo (vertical).
103. L1C6 precisa de um parceiro triângulo; só L2C6 pode recebê-lo (vertical).
104. L1C8 precisa de um parceiro triângulo; só L2C8 pode recebê-lo (vertical).
105. A dupla L2C5–L1C5 já está fechada; L3C5 não pode tocar essa dupla com outro losango.
106. A dupla L2C6–L1C6 já está fechada; L3C6 não pode tocar essa dupla com outro triângulo.
107. A dupla L2C8–L1C8 já está fechada; L3C8 não pode tocar essa dupla com outro triângulo.
108. A dupla L3C2–L4C2 já está fechada; L3C1 não pode tocar essa dupla com outro triângulo.
109. L3C5 precisa de um parceiro círculo; só L4C5 pode recebê-lo (vertical).
110. L3C6 precisa de um parceiro losango; só L4C6 pode recebê-lo (vertical).
111. L4C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
112. A dupla L7C3–L8C3 já está fechada; L7C4 não pode tocar essa dupla com outro triângulo.
113. L7C4 precisa de um parceiro losango; só L8C4 pode recebê-lo (vertical).
114. A dupla L7C7–L8C7 já está fechada; L7C8 não pode tocar essa dupla com outro losango.
115. linha 3 já tem dois círculo (L3C1, L3C5); exclua círculo de L3C8.
116. Na linha 3, triângulo só cabe em L3C2 e L3C4; ambas as casas precisam dele.
117. linha 4 já tem dois círculo (L4C1, L4C5); exclua círculo de L4C8.
118. Na linha 4, triângulo só cabe em L4C2 e L4C4; ambas as casas precisam dele.
119. coluna 1 já tem dois círculo (L3C1, L4C1); exclua círculo de L7C1.
120. coluna 1 já tem dois círculo (L3C1, L4C1); exclua círculo de L8C1.
121. Na coluna 8, círculo só cabe em L7C8 e L8C8; ambas as casas precisam dele.
122. Na coluna 8, círculo só cabe em L7C8 e L8C8; ambas as casas precisam dele.

## 36. Intermediário — pacto-106

**Descoberta:** Orientação comunica duas faixas.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes.

**Origem:** pacto-106; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 16; 127 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L1C6: círculo — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 31.
- L1C7: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L2C6: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 25.
- L3C1: quadrado — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 21.
- L3C3: losango — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 6.
- L3C5: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 6.
- L3C7: círculo — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 79.
- L4C1: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 21.
- L6C1: círculo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 10.
- L6C8: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 10.
- L7C2: quadrado — prevenção de isolamento; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 42.
- L8C4: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 16.
- L8C6: quadrado — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 25.
- L8C8: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 16.

### Sequência lógica

1. linha 1 já tem dois triângulo (L1C1, L1C7); exclua triângulo de L1C2.
2. linha 1 já tem dois triângulo (L1C1, L1C7); exclua triângulo de L1C3.
3. linha 1 já tem dois triângulo (L1C1, L1C7); exclua triângulo de L1C4.
4. linha 1 já tem dois triângulo (L1C1, L1C7); exclua triângulo de L1C5.
5. linha 1 já tem dois triângulo (L1C1, L1C7); exclua triângulo de L1C8.
6. linha 3 já tem dois losango (L3C3, L3C5); exclua losango de L3C2.
7. linha 3 já tem dois losango (L3C3, L3C5); exclua losango de L3C4.
8. linha 3 já tem dois losango (L3C3, L3C5); exclua losango de L3C6.
9. linha 3 já tem dois losango (L3C3, L3C5); exclua losango de L3C8.
10. linha 6 já tem dois círculo (L6C1, L6C8); exclua círculo de L6C2.
11. linha 6 já tem dois círculo (L6C1, L6C8); exclua círculo de L6C3.
12. linha 6 já tem dois círculo (L6C1, L6C8); exclua círculo de L6C4.
13. linha 6 já tem dois círculo (L6C1, L6C8); exclua círculo de L6C5.
14. linha 6 já tem dois círculo (L6C1, L6C8); exclua círculo de L6C6.
15. linha 6 já tem dois círculo (L6C1, L6C8); exclua círculo de L6C7.
16. linha 8 já tem dois triângulo (L8C4, L8C8); exclua triângulo de L8C1.
17. linha 8 já tem dois triângulo (L8C4, L8C8); exclua triângulo de L8C2.
18. linha 8 já tem dois triângulo (L8C4, L8C8); exclua triângulo de L8C3.
19. linha 8 já tem dois triângulo (L8C4, L8C8); exclua triângulo de L8C5.
20. linha 8 já tem dois triângulo (L8C4, L8C8); exclua triângulo de L8C7.
21. coluna 1 já tem dois quadrado (L3C1, L4C1); exclua quadrado de L2C1.
22. coluna 1 já tem dois quadrado (L3C1, L4C1); exclua quadrado de L5C1.
23. coluna 1 já tem dois quadrado (L3C1, L4C1); exclua quadrado de L7C1.
24. coluna 1 já tem dois quadrado (L3C1, L4C1); exclua quadrado de L8C1.
25. coluna 6 já tem dois quadrado (L2C6, L8C6); exclua quadrado de L3C6.
26. coluna 6 já tem dois quadrado (L2C6, L8C6); exclua quadrado de L4C6.
27. coluna 6 já tem dois quadrado (L2C6, L8C6); exclua quadrado de L5C6.
28. coluna 6 já tem dois quadrado (L2C6, L8C6); exclua quadrado de L6C6.
29. coluna 6 já tem dois quadrado (L2C6, L8C6); exclua quadrado de L7C6.
30. L1C1 precisa de um parceiro triângulo; só L2C1 pode recebê-lo (vertical).
31. L1C6 precisa de um parceiro círculo; só L1C5 pode recebê-lo (horizontal).
32. L1C7 precisa de um parceiro triângulo; só L2C7 pode recebê-lo (vertical).
33. A dupla L2C1–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro triângulo.
34. L2C6 precisa de um parceiro quadrado; só L2C5 pode recebê-lo (horizontal).
35. A dupla L2C7–L1C7 já está fechada; L2C8 não pode tocar essa dupla com outro triângulo.
36. A dupla L3C1–L4C1 já está fechada; L3C2 não pode tocar essa dupla com outro quadrado.
37. L3C5 precisa de um parceiro losango; só L4C5 pode recebê-lo (vertical).
38. A dupla L4C1–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro quadrado.
39. A dupla L4C5–L3C5 já está fechada; L5C5 não pode tocar essa dupla com outro losango.
40. A dupla L4C5–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro losango.
41. A dupla L4C5–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro losango.
42. L7C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
43. L8C4 precisa de um parceiro triângulo; só L7C4 pode recebê-lo (vertical).
44. L8C8 precisa de um parceiro triângulo; só L7C8 pode recebê-lo (vertical).
45. linha 1 já tem dois círculo (L1C5, L1C6); exclua círculo de L1C2.
46. linha 1 já tem dois círculo (L1C5, L1C6); exclua círculo de L1C3.
47. linha 1 já tem dois círculo (L1C5, L1C6); exclua círculo de L1C4.
48. linha 1 já tem dois círculo (L1C5, L1C6); exclua círculo de L1C8.
49. linha 2 já tem dois triângulo (L2C1, L2C7); exclua triângulo de L2C3.
50. linha 2 já tem dois triângulo (L2C1, L2C7); exclua triângulo de L2C4.
51. linha 2 já tem dois quadrado (L2C5, L2C6); exclua quadrado de L2C2.
52. linha 2 já tem dois quadrado (L2C5, L2C6); exclua quadrado de L2C3.
53. linha 2 já tem dois quadrado (L2C5, L2C6); exclua quadrado de L2C4.
54. linha 2 já tem dois quadrado (L2C5, L2C6); exclua quadrado de L2C8.
55. linha 7 já tem dois triângulo (L7C4, L7C8); exclua triângulo de L7C3.
56. linha 7 já tem dois triângulo (L7C4, L7C8); exclua triângulo de L7C5.
57. linha 7 já tem dois triângulo (L7C4, L7C8); exclua triângulo de L7C6.
58. linha 7 já tem dois triângulo (L7C4, L7C8); exclua triângulo de L7C7.
59. coluna 1 já tem dois triângulo (L1C1, L2C1); exclua triângulo de L5C1.
60. coluna 4 já tem dois triângulo (L7C4, L8C4); exclua triângulo de L3C4.
61. coluna 4 já tem dois triângulo (L7C4, L8C4); exclua triângulo de L4C4.
62. coluna 4 já tem dois triângulo (L7C4, L8C4); exclua triângulo de L5C4.
63. coluna 4 já tem dois triângulo (L7C4, L8C4); exclua triângulo de L6C4.
64. Na coluna 5, triângulo só cabe em L5C5 e L6C5; ambas as casas precisam dele.
65. Na coluna 5, triângulo só cabe em L5C5 e L6C5; ambas as casas precisam dele.
66. coluna 5 já tem dois losango (L3C5, L4C5); exclua losango de L7C5.
67. coluna 5 já tem dois losango (L3C5, L4C5); exclua losango de L8C5.
68. coluna 7 já tem dois triângulo (L1C7, L2C7); exclua triângulo de L4C7.
69. coluna 7 já tem dois triângulo (L1C7, L2C7); exclua triângulo de L5C7.
70. coluna 7 já tem dois triângulo (L1C7, L2C7); exclua triângulo de L6C7.
71. coluna 8 já tem dois triângulo (L7C8, L8C8); exclua triângulo de L3C8.
72. coluna 8 já tem dois triângulo (L7C8, L8C8); exclua triângulo de L4C8.
73. coluna 8 já tem dois triângulo (L7C8, L8C8); exclua triângulo de L5C8.
74. L1C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
75. L1C8 precisa de um parceiro losango; só L2C8 pode recebê-lo (vertical).
76. A dupla L5C5–L6C5 já está fechada; L5C6 não pode tocar essa dupla com outro triângulo.
77. A dupla L6C5–L5C5 já está fechada; L6C6 não pode tocar essa dupla com outro triângulo.
78. L6C8 precisa de um parceiro círculo; só L5C8 pode recebê-lo (vertical).
79. Na linha 3, triângulo só cabe em L3C2 e L3C6; ambas as casas precisam dele.
80. Na linha 3, triângulo só cabe em L3C2 e L3C6; ambas as casas precisam dele.
81. Na coluna 6, triângulo só cabe em L3C6 e L4C6; ambas as casas precisam dele.
82. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L3C8.
83. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L4C8.
84. Na coluna 8, quadrado só cabe em L3C8 e L4C8; ambas as casas precisam dele.
85. L3C2 precisa de um parceiro triângulo; só L4C2 pode recebê-lo (vertical).
86. L3C7 precisa de um parceiro círculo; só L4C7 pode recebê-lo (vertical).
87. A dupla L4C2–L3C2 já está fechada; L5C2 não pode tocar essa dupla com outro triângulo.
88. A dupla L4C2–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro triângulo.
89. A dupla L4C7–L3C7 já está fechada; L5C7 não pode tocar essa dupla com outro círculo.
90. L5C6 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
91. A dupla L5C6–L6C6 já está fechada; L5C7 não pode tocar essa dupla com outro losango.
92. L5C7 precisa de um parceiro quadrado; só L6C7 pode recebê-lo (vertical).
93. A dupla L6C6–L5C6 já está fechada; L7C6 não pode tocar essa dupla com outro losango.
94. A dupla L6C7–L5C7 já está fechada; L7C7 não pode tocar essa dupla com outro quadrado.
95. Na linha 3, círculo só cabe em L3C4 e L3C7; ambas as casas precisam dele.
96. linha 4 já tem dois quadrado (L4C1, L4C8); exclua quadrado de L4C3.
97. linha 4 já tem dois quadrado (L4C1, L4C8); exclua quadrado de L4C4.
98. Na linha 4, losango só cabe em L4C3 e L4C5; ambas as casas precisam dele.
99. Na linha 5, triângulo só cabe em L5C3 e L5C5; ambas as casas precisam dele.
100. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L6C2.
101. Na coluna 3, triângulo só cabe em L5C3 e L6C3; ambas as casas precisam dele.
102. coluna 3 já tem dois losango (L3C3, L4C3); exclua losango de L1C3.
103. coluna 3 já tem dois losango (L3C3, L4C3); exclua losango de L2C3.
104. coluna 3 já tem dois losango (L3C3, L4C3); exclua losango de L7C3.
105. coluna 3 já tem dois losango (L3C3, L4C3); exclua losango de L8C3.
106. coluna 4 já tem dois círculo (L3C4, L4C4); exclua círculo de L2C4.
107. coluna 4 já tem dois círculo (L3C4, L4C4); exclua círculo de L5C4.
108. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L7C7.
109. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L8C7.
110. coluna 7 já tem dois quadrado (L5C7, L6C7); exclua quadrado de L8C7.
111. L2C3 precisa de um parceiro círculo; só L2C2 pode recebê-lo (horizontal).
112. L2C4 precisa de um parceiro losango; só L1C4 pode recebê-lo (vertical).
113. L7C6 precisa de um parceiro círculo; só L7C5 pode recebê-lo (horizontal).
114. L8C6 precisa de um parceiro quadrado; só L8C5 pode recebê-lo (horizontal).
115. Na linha 1, quadrado só cabe em L1C2 e L1C3; ambas as casas precisam dele.
116. linha 7 já tem dois círculo (L7C5, L7C6); exclua círculo de L7C1.
117. linha 7 já tem dois círculo (L7C5, L7C6); exclua círculo de L7C3.
118. linha 8 já tem dois quadrado (L8C5, L8C6); exclua quadrado de L8C2.
119. linha 8 já tem dois quadrado (L8C5, L8C6); exclua quadrado de L8C3.
120. coluna 2 já tem dois quadrado (L1C2, L7C2); exclua quadrado de L5C2.
121. coluna 2 já tem dois quadrado (L1C2, L7C2); exclua quadrado de L6C2.
122. Na coluna 4, quadrado só cabe em L5C4 e L6C4; ambas as casas precisam dele.
123. Na coluna 4, quadrado só cabe em L5C4 e L6C4; ambas as casas precisam dele.
124. L6C1 precisa de um parceiro círculo; só L5C1 pode recebê-lo (vertical).
125. L6C2 precisa de um parceiro losango; só L5C2 pode recebê-lo (vertical).
126. L7C1 precisa de um parceiro losango; só L8C1 pode recebê-lo (vertical).
127. A dupla L8C1–L7C1 já está fechada; L8C2 não pode tocar essa dupla com outro losango.

## 37. Intermediário — pacto-119

**Descoberta:** Cota e parceria retornam à região.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; prevenção de trio.

**Origem:** pacto-119; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 17; 131 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C4: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 6.
- L1C5: losango — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 19.
- L1C7: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 55.
- L2C5: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 11.
- L3C2: quadrado — prevenção de isolamento; posições restantes; primeira participação no passo 77.
- L3C5: triângulo — parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; posições restantes; primeira participação no passo 22.
- L4C2: triângulo — cota saturada; primeira participação no passo 1.
- L4C4: círculo — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 22.
- L4C5: quadrado — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 22.
- L5C4: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 6.
- L5C5: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 11.
- L7C2: triângulo — cota saturada; prevenção de isolamento; posições restantes; prevenção de trio; primeira participação no passo 1.
- L7C7: losango — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 14.
- L8C1: quadrado — prevenção de isolamento; cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 85.
- L8C7: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 14.

### Sequência lógica

1. coluna 2 já tem dois triângulo (L4C2, L7C2); exclua triângulo de L1C2.
2. coluna 2 já tem dois triângulo (L4C2, L7C2); exclua triângulo de L2C2.
3. coluna 2 já tem dois triângulo (L4C2, L7C2); exclua triângulo de L5C2.
4. coluna 2 já tem dois triângulo (L4C2, L7C2); exclua triângulo de L6C2.
5. coluna 2 já tem dois triângulo (L4C2, L7C2); exclua triângulo de L8C2.
6. coluna 4 já tem dois quadrado (L1C4, L5C4); exclua quadrado de L2C4.
7. coluna 4 já tem dois quadrado (L1C4, L5C4); exclua quadrado de L3C4.
8. coluna 4 já tem dois quadrado (L1C4, L5C4); exclua quadrado de L6C4.
9. coluna 4 já tem dois quadrado (L1C4, L5C4); exclua quadrado de L7C4.
10. coluna 4 já tem dois quadrado (L1C4, L5C4); exclua quadrado de L8C4.
11. coluna 5 já tem dois círculo (L2C5, L5C5); exclua círculo de L6C5.
12. coluna 5 já tem dois círculo (L2C5, L5C5); exclua círculo de L7C5.
13. coluna 5 já tem dois círculo (L2C5, L5C5); exclua círculo de L8C5.
14. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L2C7.
15. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L3C7.
16. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L4C7.
17. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L5C7.
18. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L6C7.
19. L1C4 precisa de um parceiro quadrado; só L1C3 pode recebê-lo (horizontal).
20. L1C5 precisa de um parceiro losango; só L1C6 pode recebê-lo (horizontal).
21. A dupla L1C6–L1C5 já está fechada; L2C6 não pode tocar essa dupla com outro losango.
22. L4C5 precisa de um parceiro quadrado; só L4C6 pode recebê-lo (horizontal).
23. A dupla L4C6–L4C5 já está fechada; L3C6 não pode tocar essa dupla com outro quadrado.
24. A dupla L4C6–L4C5 já está fechada; L5C6 não pode tocar essa dupla com outro quadrado.
25. A dupla L4C6–L4C5 já está fechada; L4C7 não pode tocar essa dupla com outro quadrado.
26. L5C4 precisa de um parceiro quadrado; só L5C3 pode recebê-lo (horizontal).
27. L5C5 precisa de um parceiro círculo; só L5C6 pode recebê-lo (horizontal).
28. A dupla L5C6–L5C5 já está fechada; L6C6 não pode tocar essa dupla com outro círculo.
29. A dupla L5C6–L5C5 já está fechada; L5C7 não pode tocar essa dupla com outro círculo.
30. A dupla L7C7–L8C7 já está fechada; L7C6 não pode tocar essa dupla com outro losango.
31. A dupla L7C7–L8C7 já está fechada; L7C8 não pode tocar essa dupla com outro losango.
32. A dupla L8C7–L7C7 já está fechada; L8C6 não pode tocar essa dupla com outro losango.
33. A dupla L8C7–L7C7 já está fechada; L8C8 não pode tocar essa dupla com outro losango.
34. linha 1 já tem dois quadrado (L1C3, L1C4); exclua quadrado de L1C1.
35. linha 1 já tem dois quadrado (L1C3, L1C4); exclua quadrado de L1C2.
36. linha 1 já tem dois quadrado (L1C3, L1C4); exclua quadrado de L1C8.
37. linha 1 já tem dois losango (L1C5, L1C6); exclua losango de L1C1.
38. linha 1 já tem dois losango (L1C5, L1C6); exclua losango de L1C2.
39. linha 1 já tem dois losango (L1C5, L1C6); exclua losango de L1C8.
40. linha 4 já tem dois quadrado (L4C5, L4C6); exclua quadrado de L4C1.
41. linha 4 já tem dois quadrado (L4C5, L4C6); exclua quadrado de L4C3.
42. linha 4 já tem dois quadrado (L4C5, L4C6); exclua quadrado de L4C8.
43. linha 5 já tem dois círculo (L5C5, L5C6); exclua círculo de L5C1.
44. linha 5 já tem dois círculo (L5C5, L5C6); exclua círculo de L5C2.
45. linha 5 já tem dois círculo (L5C5, L5C6); exclua círculo de L5C8.
46. linha 5 já tem dois quadrado (L5C3, L5C4); exclua quadrado de L5C1.
47. linha 5 já tem dois quadrado (L5C3, L5C4); exclua quadrado de L5C2.
48. linha 5 já tem dois quadrado (L5C3, L5C4); exclua quadrado de L5C7.
49. linha 5 já tem dois quadrado (L5C3, L5C4); exclua quadrado de L5C8.
50. coluna 3 já tem dois quadrado (L1C3, L5C3); exclua quadrado de L2C3.
51. coluna 3 já tem dois quadrado (L1C3, L5C3); exclua quadrado de L3C3.
52. coluna 3 já tem dois quadrado (L1C3, L5C3); exclua quadrado de L6C3.
53. coluna 3 já tem dois quadrado (L1C3, L5C3); exclua quadrado de L7C3.
54. coluna 3 já tem dois quadrado (L1C3, L5C3); exclua quadrado de L8C3.
55. coluna 7 já tem dois triângulo (L1C7, L5C7); exclua triângulo de L2C7.
56. coluna 7 já tem dois triângulo (L1C7, L5C7); exclua triângulo de L3C7.
57. coluna 7 já tem dois triângulo (L1C7, L5C7); exclua triângulo de L4C7.
58. coluna 7 já tem dois triângulo (L1C7, L5C7); exclua triângulo de L6C7.
59. L1C7 precisa de um parceiro triângulo; só L1C8 pode recebê-lo (horizontal).
60. A dupla L1C8–L1C7 já está fechada; L2C8 não pode tocar essa dupla com outro triângulo.
61. L3C6 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
62. L5C7 precisa de um parceiro triângulo; só L5C8 pode recebê-lo (horizontal).
63. A dupla L5C8–L5C7 já está fechada; L4C8 não pode tocar essa dupla com outro triângulo.
64. A dupla L5C8–L5C7 já está fechada; L6C8 não pode tocar essa dupla com outro triângulo.
65. L6C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
66. Na linha 1, círculo só cabe em L1C1 e L1C2; ambas as casas precisam dele.
67. linha 4 já tem dois círculo (L4C4, L4C7); exclua círculo de L4C1.
68. linha 4 já tem dois círculo (L4C4, L4C7); exclua círculo de L4C3.
69. linha 4 já tem dois círculo (L4C4, L4C7); exclua círculo de L4C8.
70. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C1.
71. Na coluna 6, losango só cabe em L1C6 e L6C6; ambas as casas precisam dele.
72. coluna 8 já tem dois triângulo (L1C8, L5C8); exclua triângulo de L3C8.
73. coluna 8 já tem dois triângulo (L1C8, L5C8); exclua triângulo de L7C8.
74. coluna 8 já tem dois triângulo (L1C8, L5C8); exclua triângulo de L8C8.
75. A dupla L1C1–L1C2 já está fechada; L2C1 não pode tocar essa dupla com outro círculo.
76. A dupla L1C2–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro círculo.
77. L3C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
78. L4C4 precisa de um parceiro círculo; só L3C4 pode recebê-lo (vertical).
79. L4C7 precisa de um parceiro círculo; só L3C7 pode recebê-lo (vertical).
80. L4C8 precisa de um parceiro losango; só L3C8 pode recebê-lo (vertical).
81. A dupla L5C1–L5C2 já está fechada; L4C1 não pode tocar essa dupla com outro losango.
82. A dupla L5C1–L5C2 já está fechada; L6C1 não pode tocar essa dupla com outro losango.
83. A dupla L5C2–L5C1 já está fechada; L6C2 não pode tocar essa dupla com outro losango.
84. L6C6 precisa de um parceiro losango; só L6C5 pode recebê-lo (horizontal).
85. L7C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
86. linha 3 já tem dois círculo (L3C4, L3C7); exclua círculo de L3C3.
87. linha 3 já tem dois círculo (L3C4, L3C7); exclua círculo de L3C6.
88. linha 3 já tem dois triângulo (L3C5, L3C6); exclua triângulo de L3C1.
89. linha 3 já tem dois triângulo (L3C5, L3C6); exclua triângulo de L3C3.
90. Na linha 3, quadrado só cabe em L3C1 e L3C2; ambas as casas precisam dele.
91. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C3.
92. linha 6 já tem dois losango (L6C5, L6C6); exclua losango de L6C3.
93. linha 6 já tem dois losango (L6C5, L6C6); exclua losango de L6C4.
94. coluna 1 já tem dois quadrado (L3C1, L8C1); exclua quadrado de L2C1.
95. coluna 1 já tem dois quadrado (L3C1, L8C1); exclua quadrado de L6C1.
96. coluna 1 já tem dois quadrado (L3C1, L8C1); exclua quadrado de L7C1.
97. Na coluna 1, losango só cabe em L2C1 e L5C1; ambas as casas precisam dele.
98. coluna 3 já tem dois losango (L3C3, L4C3); exclua losango de L2C3.
99. coluna 3 já tem dois losango (L3C3, L4C3); exclua losango de L7C3.
100. coluna 3 já tem dois losango (L3C3, L4C3); exclua losango de L8C3.
101. coluna 4 já tem dois círculo (L3C4, L4C4); exclua círculo de L2C4.
102. coluna 4 já tem dois círculo (L3C4, L4C4); exclua círculo de L6C4.
103. coluna 4 já tem dois círculo (L3C4, L4C4); exclua círculo de L7C4.
104. coluna 4 já tem dois círculo (L3C4, L4C4); exclua círculo de L8C4.
105. coluna 5 já tem dois losango (L1C5, L6C5); exclua losango de L7C5.
106. coluna 5 já tem dois losango (L1C5, L6C5); exclua losango de L8C5.
107. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L2C7.
108. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L6C7.
109. coluna 8 já tem dois losango (L3C8, L4C8); exclua losango de L2C8.
110. L2C1 precisa de um parceiro losango; só L2C2 pode recebê-lo (horizontal).
111. L2C3 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
112. L2C3 precisa de um parceiro triângulo; só L2C4 pode recebê-lo (horizontal).
113. L2C5 precisa de um parceiro círculo; só L2C6 pode recebê-lo (horizontal).
114. L2C7 precisa de um parceiro quadrado; só L2C8 pode recebê-lo (horizontal).
115. L6C2 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
116. L6C7 precisa de um parceiro quadrado; só L6C8 pode recebê-lo (horizontal).
117. A dupla L6C8–L6C7 já está fechada; L7C8 não pode tocar essa dupla com outro quadrado.
118. L7C8 precisa de um parceiro círculo; só L8C8 pode recebê-lo (vertical).
119. L8C1 precisa de um parceiro quadrado; só L8C2 pode recebê-lo (horizontal).
120. Na linha 7, quadrado só cabe em L7C5 e L7C6; ambas as casas precisam dele.
121. Na linha 7, quadrado só cabe em L7C5 e L7C6; ambas as casas precisam dele.
122. Na linha 7, losango só cabe em L7C4 e L7C7; ambas as casas precisam dele.
123. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C5.
124. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C6.
125. Na linha 8, losango só cabe em L8C4 e L8C7; ambas as casas precisam dele.
126. coluna 6 já tem dois círculo (L2C6, L5C6); exclua círculo de L8C6.
127. L6C4 precisa de um parceiro triângulo; só L6C3 pode recebê-lo (horizontal).
128. L7C3 não pode ser triângulo: tocaria L6C3 e L7C2, formando um grupo maior que dois.
129. L8C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
130. Na linha 6, círculo só cabe em L6C1 e L6C2; ambas as casas precisam dele.
131. linha 7 já tem dois círculo (L7C3, L7C8); exclua círculo de L7C1.

## 38. Intermediário — pacto-125

**Descoberta:** Evitar isolamento mesmo com cota livre.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de trio; posições restantes; prevenção de isolamento.

**Origem:** pacto-125; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 17; 130 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C2: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 11.
- L1C3: círculo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 20.
- L1C4: quadrado — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 21.
- L3C2: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 11.
- L3C3: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 16.
- L4C3: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 1.
- L4C5: quadrado — cota saturada; prevenção de trio; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 1.
- L5C6: quadrado — prevenção de trio; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; cota saturada; primeira participação no passo 26.
- L5C8: losango — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 66.
- L6C5: círculo — exclusão junto à dupla; posições restantes; cota saturada; primeira participação no passo 103.
- L7C2: quadrado — posições restantes; primeira participação no passo 119.
- L8C1: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 7.
- L8C3: losango — prevenção de trio; exclusão junto à dupla; primeira participação no passo 108.
- L8C7: quadrado — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 28.
- L8C8: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 7.

### Sequência lógica

1. linha 4 já tem dois quadrado (L4C3, L4C5); exclua quadrado de L4C1.
2. linha 4 já tem dois quadrado (L4C3, L4C5); exclua quadrado de L4C2.
3. linha 4 já tem dois quadrado (L4C3, L4C5); exclua quadrado de L4C4.
4. linha 4 já tem dois quadrado (L4C3, L4C5); exclua quadrado de L4C6.
5. linha 4 já tem dois quadrado (L4C3, L4C5); exclua quadrado de L4C7.
6. linha 4 já tem dois quadrado (L4C3, L4C5); exclua quadrado de L4C8.
7. linha 8 já tem dois círculo (L8C1, L8C8); exclua círculo de L8C2.
8. linha 8 já tem dois círculo (L8C1, L8C8); exclua círculo de L8C4.
9. linha 8 já tem dois círculo (L8C1, L8C8); exclua círculo de L8C5.
10. linha 8 já tem dois círculo (L8C1, L8C8); exclua círculo de L8C6.
11. coluna 2 já tem dois triângulo (L1C2, L3C2); exclua triângulo de L2C2.
12. coluna 2 já tem dois triângulo (L1C2, L3C2); exclua triângulo de L4C2.
13. coluna 2 já tem dois triângulo (L1C2, L3C2); exclua triângulo de L5C2.
14. coluna 2 já tem dois triângulo (L1C2, L3C2); exclua triângulo de L6C2.
15. coluna 2 já tem dois triângulo (L1C2, L3C2); exclua triângulo de L8C2.
16. coluna 3 já tem dois quadrado (L3C3, L4C3); exclua quadrado de L2C3.
17. coluna 3 já tem dois quadrado (L3C3, L4C3); exclua quadrado de L5C3.
18. coluna 3 já tem dois quadrado (L3C3, L4C3); exclua quadrado de L6C3.
19. coluna 3 já tem dois quadrado (L3C3, L4C3); exclua quadrado de L7C3.
20. L1C2 precisa de um parceiro triângulo; só L1C1 pode recebê-lo (horizontal).
21. L1C3 precisa de um parceiro círculo; só L2C3 pode recebê-lo (vertical).
22. A dupla L2C3–L1C3 já está fechada; L2C2 não pode tocar essa dupla com outro círculo.
23. A dupla L2C3–L1C3 já está fechada; L2C4 não pode tocar essa dupla com outro círculo.
24. L3C2 precisa de um parceiro triângulo; só L3C1 pode recebê-lo (horizontal).
25. A dupla L3C3–L4C3 já está fechada; L3C4 não pode tocar essa dupla com outro quadrado.
26. L5C5 não pode ser quadrado: tocaria L4C5 e L5C6, formando um grupo maior que dois.
27. L8C1 precisa de um parceiro círculo; só L7C1 pode recebê-lo (vertical).
28. L8C8 precisa de um parceiro círculo; só L7C8 pode recebê-lo (vertical).
29. linha 1 já tem dois triângulo (L1C1, L1C2); exclua triângulo de L1C5.
30. linha 1 já tem dois triângulo (L1C1, L1C2); exclua triângulo de L1C6.
31. linha 1 já tem dois triângulo (L1C1, L1C2); exclua triângulo de L1C7.
32. linha 1 já tem dois triângulo (L1C1, L1C2); exclua triângulo de L1C8.
33. linha 3 já tem dois triângulo (L3C1, L3C2); exclua triângulo de L3C4.
34. linha 3 já tem dois triângulo (L3C1, L3C2); exclua triângulo de L3C5.
35. linha 3 já tem dois triângulo (L3C1, L3C2); exclua triângulo de L3C6.
36. linha 3 já tem dois triângulo (L3C1, L3C2); exclua triângulo de L3C7.
37. linha 3 já tem dois triângulo (L3C1, L3C2); exclua triângulo de L3C8.
38. linha 7 já tem dois círculo (L7C1, L7C8); exclua círculo de L7C3.
39. linha 7 já tem dois círculo (L7C1, L7C8); exclua círculo de L7C4.
40. linha 7 já tem dois círculo (L7C1, L7C8); exclua círculo de L7C5.
41. linha 7 já tem dois círculo (L7C1, L7C8); exclua círculo de L7C6.
42. linha 7 já tem dois círculo (L7C1, L7C8); exclua círculo de L7C7.
43. coluna 1 já tem dois círculo (L7C1, L8C1); exclua círculo de L2C1.
44. coluna 1 já tem dois círculo (L7C1, L8C1); exclua círculo de L4C1.
45. coluna 1 já tem dois círculo (L7C1, L8C1); exclua círculo de L5C1.
46. coluna 1 já tem dois círculo (L7C1, L8C1); exclua círculo de L6C1.
47. coluna 1 já tem dois triângulo (L1C1, L3C1); exclua triângulo de L2C1.
48. coluna 1 já tem dois triângulo (L1C1, L3C1); exclua triângulo de L4C1.
49. coluna 1 já tem dois triângulo (L1C1, L3C1); exclua triângulo de L5C1.
50. coluna 1 já tem dois triângulo (L1C1, L3C1); exclua triângulo de L6C1.
51. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L5C3.
52. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L6C3.
53. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L1C8.
54. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L2C8.
55. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L3C8.
56. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L4C8.
57. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L6C8.
58. L4C5 precisa de um parceiro quadrado; só L3C5 pode recebê-lo (vertical).
59. linha 3 já tem dois quadrado (L3C3, L3C5); exclua quadrado de L3C6.
60. linha 3 já tem dois quadrado (L3C3, L3C5); exclua quadrado de L3C7.
61. linha 3 já tem dois quadrado (L3C3, L3C5); exclua quadrado de L3C8.
62. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L1C5.
63. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L2C5.
64. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L7C5.
65. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L8C5.
66. coluna 8 já tem dois losango (L3C8, L5C8); exclua losango de L1C8.
67. coluna 8 já tem dois losango (L3C8, L5C8); exclua losango de L2C8.
68. coluna 8 já tem dois losango (L3C8, L5C8); exclua losango de L4C8.
69. coluna 8 já tem dois losango (L3C8, L5C8); exclua losango de L6C8.
70. L1C4 precisa de um parceiro quadrado; só L2C4 pode recebê-lo (vertical).
71. L3C8 precisa de um parceiro losango; só L3C7 pode recebê-lo (horizontal).
72. L4C8 precisa de um parceiro triângulo; só L4C7 pode recebê-lo (horizontal).
73. L5C8 precisa de um parceiro losango; só L5C7 pode recebê-lo (horizontal).
74. linha 1 já tem dois quadrado (L1C4, L1C8); exclua quadrado de L1C6.
75. linha 1 já tem dois quadrado (L1C4, L1C8); exclua quadrado de L1C7.
76. Na linha 3, círculo só cabe em L3C4 e L3C6; ambas as casas precisam dele.
77. Na linha 3, círculo só cabe em L3C4 e L3C6; ambas as casas precisam dele.
78. linha 4 já tem dois triângulo (L4C7, L4C8); exclua triângulo de L4C4.
79. linha 4 já tem dois triângulo (L4C7, L4C8); exclua triângulo de L4C6.
80. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C1.
81. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C2.
82. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C3.
83. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C4.
84. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C5.
85. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L5C4.
86. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L6C4.
87. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L7C4.
88. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L8C4.
89. coluna 7 já tem dois losango (L3C7, L5C7); exclua losango de L1C7.
90. coluna 7 já tem dois losango (L3C7, L5C7); exclua losango de L2C7.
91. coluna 7 já tem dois losango (L3C7, L5C7); exclua losango de L6C7.
92. coluna 7 já tem dois losango (L3C7, L5C7); exclua losango de L7C7.
93. L1C8 precisa de um parceiro quadrado; só L2C8 pode recebê-lo (vertical).
94. A dupla L2C8–L1C8 já está fechada; L2C7 não pode tocar essa dupla com outro quadrado.
95. L3C4 precisa de um parceiro círculo; só L4C4 pode recebê-lo (vertical).
96. L4C1 precisa de um parceiro losango; só L4C2 pode recebê-lo (horizontal).
97. A dupla L4C4–L3C4 já está fechada; L5C4 não pode tocar essa dupla com outro círculo.
98. L4C6 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
99. A dupla L5C3–L5C4 já está fechada; L6C3 não pode tocar essa dupla com outro triângulo.
100. A dupla L5C4–L5C3 já está fechada; L6C4 não pode tocar essa dupla com outro triângulo.
101. A dupla L5C4–L5C3 já está fechada; L5C5 não pode tocar essa dupla com outro triângulo.
102. L5C6 precisa de um parceiro quadrado; só L6C6 pode recebê-lo (vertical).
103. A dupla L6C5–L5C5 já está fechada; L6C4 não pode tocar essa dupla com outro círculo.
104. A dupla L6C6–L5C6 já está fechada; L7C6 não pode tocar essa dupla com outro quadrado.
105. A dupla L6C6–L5C6 já está fechada; L6C7 não pode tocar essa dupla com outro quadrado.
106. L6C7 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
107. L6C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
108. L7C3 não pode ser losango: tocaria L6C3 e L8C3, formando um grupo maior que dois.
109. linha 1 já tem dois círculo (L1C3, L1C7); exclua círculo de L1C5.
110. linha 1 já tem dois círculo (L1C3, L1C7); exclua círculo de L1C6.
111. linha 2 já tem dois quadrado (L2C4, L2C8); exclua quadrado de L2C1.
112. linha 2 já tem dois quadrado (L2C4, L2C8); exclua quadrado de L2C2.
113. linha 2 já tem dois quadrado (L2C4, L2C8); exclua quadrado de L2C6.
114. linha 2 já tem dois losango (L2C1, L2C2); exclua losango de L2C5.
115. linha 2 já tem dois losango (L2C1, L2C2); exclua losango de L2C6.
116. Na linha 5, círculo só cabe em L5C2 e L5C5; ambas as casas precisam dele.
117. Na linha 6, círculo só cabe em L6C2 e L6C5; ambas as casas precisam dele.
118. Na linha 6, quadrado só cabe em L6C1 e L6C6; ambas as casas precisam dele.
119. Na linha 7, quadrado só cabe em L7C2 e L7C7; ambas as casas precisam dele.
120. Na coluna 2, quadrado só cabe em L7C2 e L8C2; ambas as casas precisam dele.
121. coluna 5 já tem dois círculo (L5C5, L6C5); exclua círculo de L2C5.
122. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L2C6.
123. coluna 6 já tem dois quadrado (L5C6, L6C6); exclua quadrado de L8C6.
124. Na coluna 7, círculo só cabe em L1C7 e L2C7; ambas as casas precisam dele.
125. A dupla L6C4–L6C3 já está fechada; L7C4 não pode tocar essa dupla com outro losango.
126. A dupla L7C4–L7C3 já está fechada; L8C4 não pode tocar essa dupla com outro triângulo.
127. A dupla L7C4–L7C3 já está fechada; L7C5 não pode tocar essa dupla com outro triângulo.
128. A dupla L8C4–L8C3 já está fechada; L8C5 não pode tocar essa dupla com outro losango.
129. L8C5 precisa de um parceiro triângulo; só L8C6 pode recebê-lo (horizontal).
130. A dupla L8C6–L8C5 já está fechada; L7C6 não pode tocar essa dupla com outro triângulo.

## 39. Intermediário — pacto-122

**Descoberta:** Orientação comunica duas faixas.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; prevenção de isolamento; prevenção de trio; posições restantes.

**Origem:** pacto-122; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 18; 134 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C7: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 18.
- L1C8: losango — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 22.
- L2C5: quadrado — cota saturada; primeira participação no passo 1.
- L2C7: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 1.
- L3C1: círculo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 7.
- L3C2: círculo — cota saturada; exclusão junto à dupla; posições restantes; prevenção de isolamento; primeira participação no passo 7.
- L5C1: quadrado — cota saturada; prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 13.
- L5C3: quadrado — cota saturada; prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 13.
- L5C4: losango — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 97.
- L6C2: losango — prevenção de isolamento; prevenção de trio; posições restantes; exclusão junto à dupla; primeira participação no passo 28.
- L6C7: círculo — prevenção de trio; parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 32.
- L7C1: losango — prevenção de isolamento; prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 29.
- L7C6: círculo — prevenção de trio; parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 32.
- L7C7: triângulo — parceiro obrigatório / orientação; prevenção de trio; exclusão junto à dupla; prevenção de isolamento; cota saturada; primeira participação no passo 34.
- L8C6: triângulo — parceiro obrigatório / orientação; prevenção de trio; prevenção de isolamento; cota saturada; primeira participação no passo 34.

### Sequência lógica

1. linha 2 já tem dois quadrado (L2C5, L2C7); exclua quadrado de L2C1.
2. linha 2 já tem dois quadrado (L2C5, L2C7); exclua quadrado de L2C2.
3. linha 2 já tem dois quadrado (L2C5, L2C7); exclua quadrado de L2C3.
4. linha 2 já tem dois quadrado (L2C5, L2C7); exclua quadrado de L2C4.
5. linha 2 já tem dois quadrado (L2C5, L2C7); exclua quadrado de L2C6.
6. linha 2 já tem dois quadrado (L2C5, L2C7); exclua quadrado de L2C8.
7. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C3.
8. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C4.
9. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C5.
10. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C6.
11. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C7.
12. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C8.
13. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C2.
14. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C5.
15. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C6.
16. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C7.
17. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C8.
18. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L3C7.
19. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L4C7.
20. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L8C7.
21. A dupla L1C7–L2C7 já está fechada; L1C6 não pode tocar essa dupla com outro quadrado.
22. L1C8 precisa de um parceiro losango; só L2C8 pode recebê-lo (vertical).
23. A dupla L2C8–L1C8 já está fechada; L3C8 não pode tocar essa dupla com outro losango.
24. A dupla L3C1–L3C2 já está fechada; L2C1 não pode tocar essa dupla com outro círculo.
25. A dupla L3C1–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro círculo.
26. A dupla L3C2–L3C1 já está fechada; L2C2 não pode tocar essa dupla com outro círculo.
27. A dupla L3C2–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
28. L5C2 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
29. L6C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
30. L6C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
31. L6C1 não pode ser losango: tocaria L7C1 e L6C2, formando um grupo maior que dois.
32. L6C6 não pode ser círculo: tocaria L7C6 e L6C7, formando um grupo maior que dois.
33. L7C2 não pode ser losango: tocaria L6C2 e L7C1, formando um grupo maior que dois.
34. L7C6 precisa de um parceiro círculo; só L7C5 pode recebê-lo (horizontal).
35. L8C7 não pode ser triângulo: tocaria L7C7 e L8C6, formando um grupo maior que dois.
36. linha 7 já tem dois círculo (L7C5, L7C6); exclua círculo de L7C2.
37. linha 7 já tem dois círculo (L7C5, L7C6); exclua círculo de L7C3.
38. linha 7 já tem dois círculo (L7C5, L7C6); exclua círculo de L7C4.
39. linha 7 já tem dois círculo (L7C5, L7C6); exclua círculo de L7C8.
40. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L1C1.
41. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L4C1.
42. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L8C1.
43. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L4C8.
44. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L5C8.
45. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L6C8.
46. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L7C8.
47. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L8C8.
48. L7C1 precisa de um parceiro losango; só L8C1 pode recebê-lo (vertical).
49. A dupla L7C5–L7C6 já está fechada; L6C5 não pode tocar essa dupla com outro círculo.
50. A dupla L7C5–L7C6 já está fechada; L8C5 não pode tocar essa dupla com outro círculo.
51. L7C7 precisa de um parceiro triângulo; só L7C8 pode recebê-lo (horizontal).
52. A dupla L7C8–L7C7 já está fechada; L6C8 não pode tocar essa dupla com outro triângulo.
53. A dupla L7C8–L7C7 já está fechada; L8C8 não pode tocar essa dupla com outro triângulo.
54. A dupla L8C1–L7C1 já está fechada; L8C2 não pode tocar essa dupla com outro losango.
55. L8C6 precisa de um parceiro triângulo; só L8C5 pode recebê-lo (horizontal).
56. L8C7 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
57. L8C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
58. linha 7 já tem dois triângulo (L7C7, L7C8); exclua triângulo de L7C2.
59. linha 7 já tem dois triângulo (L7C7, L7C8); exclua triângulo de L7C3.
60. linha 7 já tem dois triângulo (L7C7, L7C8); exclua triângulo de L7C4.
61. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C2.
62. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C3.
63. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C4.
64. linha 8 já tem dois triângulo (L8C5, L8C6); exclua triângulo de L8C2.
65. linha 8 já tem dois triângulo (L8C5, L8C6); exclua triângulo de L8C3.
66. linha 8 já tem dois triângulo (L8C5, L8C6); exclua triângulo de L8C4.
67. Na coluna 1, círculo só cabe em L1C1 e L3C1; ambas as casas precisam dele.
68. Na coluna 1, triângulo só cabe em L2C1 e L4C1; ambas as casas precisam dele.
69. Na coluna 1, triângulo só cabe em L2C1 e L4C1; ambas as casas precisam dele.
70. Na coluna 2, círculo só cabe em L1C2 e L3C2; ambas as casas precisam dele.
71. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L4C2.
72. coluna 7 já tem dois círculo (L6C7, L8C7); exclua círculo de L4C7.
73. coluna 7 já tem dois círculo (L6C7, L8C7); exclua círculo de L5C7.
74. A dupla L1C2–L1C1 já está fechada; L1C3 não pode tocar essa dupla com outro círculo.
75. L2C1 precisa de um parceiro triângulo; só L2C2 pode recebê-lo (horizontal).
76. A dupla L2C2–L2C1 já está fechada; L2C3 não pode tocar essa dupla com outro triângulo.
77. L4C1 precisa de um parceiro triângulo; só L4C2 pode recebê-lo (horizontal).
78. A dupla L4C2–L4C1 já está fechada; L5C2 não pode tocar essa dupla com outro triângulo.
79. A dupla L4C2–L4C1 já está fechada; L4C3 não pode tocar essa dupla com outro triângulo.
80. A dupla L6C2–L5C2 já está fechada; L6C3 não pode tocar essa dupla com outro losango.
81. L6C7 precisa de um parceiro círculo; só L6C8 pode recebê-lo (horizontal).
82. A dupla L6C8–L6C7 já está fechada; L5C8 não pode tocar essa dupla com outro círculo.
83. A dupla L7C2–L8C2 já está fechada; L7C3 não pode tocar essa dupla com outro quadrado.
84. A dupla L8C2–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro quadrado.
85. A dupla L8C3–L7C3 já está fechada; L8C4 não pode tocar essa dupla com outro losango.
86. L8C4 precisa de um parceiro quadrado; só L7C4 pode recebê-lo (vertical).
87. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C4.
88. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C5.
89. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C6.
90. linha 2 já tem dois triângulo (L2C1, L2C2); exclua triângulo de L2C4.
91. linha 2 já tem dois triângulo (L2C1, L2C2); exclua triângulo de L2C6.
92. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C4.
93. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C5.
94. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C6.
95. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C7.
96. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C8.
97. Na linha 5, círculo só cabe em L5C5 e L5C6; ambas as casas precisam dele.
98. Na linha 5, círculo só cabe em L5C5 e L5C6; ambas as casas precisam dele.
99. Na linha 5, triângulo só cabe em L5C7 e L5C8; ambas as casas precisam dele.
100. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C3.
101. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C4.
102. Na coluna 3, círculo só cabe em L2C3 e L4C3; ambas as casas precisam dele.
103. Na coluna 3, círculo só cabe em L2C3 e L4C3; ambas as casas precisam dele.
104. coluna 3 já tem dois losango (L7C3, L8C3); exclua losango de L1C3.
105. coluna 3 já tem dois losango (L7C3, L8C3); exclua losango de L3C3.
106. Na coluna 4, círculo só cabe em L2C4 e L4C4; ambas as casas precisam dele.
107. Na coluna 4, círculo só cabe em L2C4 e L4C4; ambas as casas precisam dele.
108. coluna 4 já tem dois quadrado (L7C4, L8C4); exclua quadrado de L1C4.
109. coluna 4 já tem dois quadrado (L7C4, L8C4); exclua quadrado de L3C4.
110. coluna 4 já tem dois quadrado (L7C4, L8C4); exclua quadrado de L6C4.
111. coluna 5 já tem dois círculo (L5C5, L7C5); exclua círculo de L4C5.
112. coluna 6 já tem dois círculo (L5C6, L7C6); exclua círculo de L2C6.
113. coluna 6 já tem dois círculo (L5C6, L7C6); exclua círculo de L4C6.
114. coluna 7 já tem dois triângulo (L5C7, L7C7); exclua triângulo de L3C7.
115. coluna 8 já tem dois círculo (L6C8, L8C8); exclua círculo de L4C8.
116. coluna 8 já tem dois triângulo (L5C8, L7C8); exclua triângulo de L3C8.
117. L1C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
118. L3C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
119. L3C6 não pode ser losango: tocaria L2C6 e L3C7, formando um grupo maior que dois.
120. A dupla L4C7–L3C7 já está fechada; L4C6 não pode tocar essa dupla com outro losango.
121. L5C3 precisa de um parceiro quadrado; só L6C3 pode recebê-lo (vertical).
122. L5C4 precisa de um parceiro losango; só L6C4 pode recebê-lo (vertical).
123. A dupla L6C4–L5C4 já está fechada; L6C5 não pode tocar essa dupla com outro losango.
124. L6C6 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
125. Na linha 1, quadrado só cabe em L1C5 e L1C7; ambas as casas precisam dele.
126. linha 4 já tem dois quadrado (L4C6, L4C8); exclua quadrado de L4C5.
127. Na linha 6, triângulo só cabe em L6C5 e L6C6; ambas as casas precisam dele.
128. Na linha 6, triângulo só cabe em L6C5 e L6C6; ambas as casas precisam dele.
129. Na coluna 4, triângulo só cabe em L1C4 e L3C4; ambas as casas precisam dele.
130. Na coluna 4, triângulo só cabe em L1C4 e L3C4; ambas as casas precisam dele.
131. coluna 5 já tem dois triângulo (L6C5, L8C5); exclua triângulo de L3C5.
132. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L3C5.
133. coluna 6 já tem dois triângulo (L6C6, L8C6); exclua triângulo de L1C6.
134. coluna 6 já tem dois triângulo (L6C6, L8C6); exclua triângulo de L3C6.

## 40. Intermediário — pacto-140

**Descoberta:** Cota e parceria retornam à região.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; prevenção de trio; posições restantes.

**Origem:** pacto-140; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 18; 128 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 1.
- L1C6: círculo — cota saturada; exclusão junto à dupla; primeira participação no passo 1.
- L2C6: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 17.
- L3C2: círculo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 7.
- L3C3: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L4C2: quadrado — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 70.
- L4C8: triângulo — parceiro obrigatório / orientação; posições restantes; prevenção de isolamento; exclusão junto à dupla; cota saturada; primeira participação no passo 34.
- L5C4: quadrado — prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 33.
- L5C8: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 21.
- L6C3: quadrado — prevenção de trio; parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 33.
- L7C2: triângulo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 13.
- L7C3: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 13.
- L7C6: quadrado — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 76.
- L7C8: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 21.
- L8C1: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 53.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C1, L1C6); exclua círculo de L1C2.
2. linha 1 já tem dois círculo (L1C1, L1C6); exclua círculo de L1C3.
3. linha 1 já tem dois círculo (L1C1, L1C6); exclua círculo de L1C4.
4. linha 1 já tem dois círculo (L1C1, L1C6); exclua círculo de L1C5.
5. linha 1 já tem dois círculo (L1C1, L1C6); exclua círculo de L1C7.
6. linha 1 já tem dois círculo (L1C1, L1C6); exclua círculo de L1C8.
7. linha 3 já tem dois círculo (L3C2, L3C3); exclua círculo de L3C1.
8. linha 3 já tem dois círculo (L3C2, L3C3); exclua círculo de L3C4.
9. linha 3 já tem dois círculo (L3C2, L3C3); exclua círculo de L3C5.
10. linha 3 já tem dois círculo (L3C2, L3C3); exclua círculo de L3C6.
11. linha 3 já tem dois círculo (L3C2, L3C3); exclua círculo de L3C7.
12. linha 3 já tem dois círculo (L3C2, L3C3); exclua círculo de L3C8.
13. linha 7 já tem dois triângulo (L7C2, L7C3); exclua triângulo de L7C1.
14. linha 7 já tem dois triângulo (L7C2, L7C3); exclua triângulo de L7C4.
15. linha 7 já tem dois triângulo (L7C2, L7C3); exclua triângulo de L7C5.
16. linha 7 já tem dois triângulo (L7C2, L7C3); exclua triângulo de L7C7.
17. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L4C6.
18. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L5C6.
19. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L6C6.
20. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L8C6.
21. coluna 8 já tem dois losango (L5C8, L7C8); exclua losango de L1C8.
22. coluna 8 já tem dois losango (L5C8, L7C8); exclua losango de L2C8.
23. coluna 8 já tem dois losango (L5C8, L7C8); exclua losango de L3C8.
24. coluna 8 já tem dois losango (L5C8, L7C8); exclua losango de L6C8.
25. coluna 8 já tem dois losango (L5C8, L7C8); exclua losango de L8C8.
26. L1C1 precisa de um parceiro círculo; só L2C1 pode recebê-lo (vertical).
27. A dupla L2C1–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro círculo.
28. A dupla L2C6–L1C6 já está fechada; L2C5 não pode tocar essa dupla com outro círculo.
29. A dupla L2C6–L1C6 já está fechada; L2C7 não pode tocar essa dupla com outro círculo.
30. L2C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
31. A dupla L3C3–L3C2 já está fechada; L2C3 não pode tocar essa dupla com outro círculo.
32. A dupla L3C3–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro círculo.
33. L5C3 não pode ser quadrado: tocaria L6C3 e L5C4, formando um grupo maior que dois.
34. L5C8 precisa de um parceiro losango; só L5C7 pode recebê-lo (horizontal).
35. L6C4 não pode ser quadrado: tocaria L5C4 e L6C3, formando um grupo maior que dois.
36. A dupla L7C2–L7C3 já está fechada; L6C2 não pode tocar essa dupla com outro triângulo.
37. A dupla L7C2–L7C3 já está fechada; L8C2 não pode tocar essa dupla com outro triângulo.
38. A dupla L7C3–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro triângulo.
39. L7C8 precisa de um parceiro losango; só L7C7 pode recebê-lo (horizontal).
40. linha 2 já tem dois círculo (L2C1, L2C6); exclua círculo de L2C4.
41. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C1.
42. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C2.
43. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C3.
44. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C5.
45. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C6.
46. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C1.
47. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C4.
48. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C5.
49. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L4C1.
50. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L5C1.
51. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L6C1.
52. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L7C1.
53. coluna 1 já tem dois quadrado (L7C1, L8C1); exclua quadrado de L3C1.
54. coluna 1 já tem dois quadrado (L7C1, L8C1); exclua quadrado de L4C1.
55. coluna 1 já tem dois quadrado (L7C1, L8C1); exclua quadrado de L5C1.
56. coluna 1 já tem dois quadrado (L7C1, L8C1); exclua quadrado de L6C1.
57. coluna 7 já tem dois losango (L5C7, L7C7); exclua losango de L1C7.
58. coluna 7 já tem dois losango (L5C7, L7C7); exclua losango de L2C7.
59. coluna 7 já tem dois losango (L5C7, L7C7); exclua losango de L3C7.
60. coluna 7 já tem dois losango (L5C7, L7C7); exclua losango de L4C7.
61. coluna 7 já tem dois losango (L5C7, L7C7); exclua losango de L6C7.
62. coluna 7 já tem dois losango (L5C7, L7C7); exclua losango de L8C7.
63. Na coluna 8, círculo só cabe em L6C8 e L8C8; ambas as casas precisam dele.
64. Na coluna 8, círculo só cabe em L6C8 e L8C8; ambas as casas precisam dele.
65. L4C7 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
66. L6C3 precisa de um parceiro quadrado; só L6C2 pode recebê-lo (horizontal).
67. L6C8 precisa de um parceiro círculo; só L6C7 pode recebê-lo (horizontal).
68. A dupla L8C1–L7C1 já está fechada; L8C2 não pode tocar essa dupla com outro quadrado.
69. L8C8 precisa de um parceiro círculo; só L8C7 pode recebê-lo (horizontal).
70. Na linha 4, círculo só cabe em L4C4 e L4C5; ambas as casas precisam dele.
71. Na linha 4, círculo só cabe em L4C4 e L4C5; ambas as casas precisam dele.
72. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C4.
73. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C5.
74. linha 6 já tem dois quadrado (L6C2, L6C3); exclua quadrado de L6C5.
75. linha 6 já tem dois quadrado (L6C2, L6C3); exclua quadrado de L6C6.
76. Na linha 7, círculo só cabe em L7C4 e L7C5; ambas as casas precisam dele.
77. Na linha 7, círculo só cabe em L7C4 e L7C5; ambas as casas precisam dele.
78. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C2.
79. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C3.
80. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C4.
81. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C5.
82. Na coluna 2, círculo só cabe em L3C2 e L5C2; ambas as casas precisam dele.
83. coluna 2 já tem dois quadrado (L4C2, L6C2); exclua quadrado de L1C2.
84. coluna 2 já tem dois quadrado (L4C2, L6C2); exclua quadrado de L2C2.
85. Na coluna 3, círculo só cabe em L3C3 e L5C3; ambas as casas precisam dele.
86. coluna 5 já tem dois círculo (L4C5, L7C5); exclua círculo de L5C5.
87. L4C2 precisa de um parceiro quadrado; só L4C3 pode recebê-lo (horizontal).
88. L5C4 precisa de um parceiro quadrado; só L5C5 pode recebê-lo (horizontal).
89. A dupla L5C5–L5C4 já está fechada; L5C6 não pode tocar essa dupla com outro quadrado.
90. L6C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
91. L7C6 precisa de um parceiro quadrado; só L8C6 pode recebê-lo (vertical).
92. L8C2 precisa de um parceiro losango; só L8C3 pode recebê-lo (horizontal).
93. A dupla L8C3–L8C2 já está fechada; L8C4 não pode tocar essa dupla com outro losango.
94. L8C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
95. A dupla L8C6–L7C6 já está fechada; L8C5 não pode tocar essa dupla com outro quadrado.
96. linha 4 já tem dois quadrado (L4C2, L4C3); exclua quadrado de L4C6.
97. linha 4 já tem dois quadrado (L4C2, L4C3); exclua quadrado de L4C7.
98. Na linha 4, losango só cabe em L4C1 e L4C6; ambas as casas precisam dele.
99. Na linha 4, losango só cabe em L4C1 e L4C6; ambas as casas precisam dele.
100. Na linha 8, triângulo só cabe em L8C4 e L8C5; ambas as casas precisam dele.
101. coluna 1 já tem dois triângulo (L5C1, L6C1); exclua triângulo de L3C1.
102. coluna 3 já tem dois quadrado (L4C3, L6C3); exclua quadrado de L1C3.
103. coluna 3 já tem dois quadrado (L4C3, L6C3); exclua quadrado de L2C3.
104. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L3C6.
105. L4C6 precisa de um parceiro losango; só L3C6 pode recebê-lo (vertical).
106. A dupla L4C7–L4C8 já está fechada; L3C7 não pode tocar essa dupla com outro triângulo.
107. A dupla L4C8–L4C7 já está fechada; L3C8 não pode tocar essa dupla com outro triângulo.
108. L5C6 precisa de um parceiro triângulo; só L6C6 pode recebê-lo (vertical).
109. A dupla L6C6–L5C6 já está fechada; L6C5 não pode tocar essa dupla com outro triângulo.
110. Na linha 3, triângulo só cabe em L3C4 e L3C5; ambas as casas precisam dele.
111. Na linha 3, triângulo só cabe em L3C4 e L3C5; ambas as casas precisam dele.
112. linha 6 já tem dois triângulo (L6C1, L6C6); exclua triângulo de L6C4.
113. coluna 4 já tem dois triângulo (L3C4, L8C4); exclua triângulo de L1C4.
114. coluna 4 já tem dois triângulo (L3C4, L8C4); exclua triângulo de L2C4.
115. coluna 5 já tem dois triângulo (L3C5, L8C5); exclua triângulo de L1C5.
116. coluna 5 já tem dois triângulo (L3C5, L8C5); exclua triângulo de L2C5.
117. A dupla L3C7–L3C8 já está fechada; L2C7 não pode tocar essa dupla com outro quadrado.
118. A dupla L3C8–L3C7 já está fechada; L2C8 não pode tocar essa dupla com outro quadrado.
119. linha 2 já tem dois triângulo (L2C7, L2C8); exclua triângulo de L2C2.
120. linha 2 já tem dois triângulo (L2C7, L2C8); exclua triângulo de L2C3.
121. Na linha 2, quadrado só cabe em L2C4 e L2C5; ambas as casas precisam dele.
122. Na linha 2, quadrado só cabe em L2C4 e L2C5; ambas as casas precisam dele.
123. Na coluna 2, triângulo só cabe em L1C2 e L7C2; ambas as casas precisam dele.
124. Na coluna 3, triângulo só cabe em L1C3 e L7C3; ambas as casas precisam dele.
125. coluna 4 já tem dois quadrado (L2C4, L5C4); exclua quadrado de L1C4.
126. coluna 5 já tem dois quadrado (L2C5, L5C5); exclua quadrado de L1C5.
127. coluna 7 já tem dois triângulo (L2C7, L4C7); exclua triângulo de L1C7.
128. coluna 8 já tem dois triângulo (L2C8, L4C8); exclua triângulo de L1C8.

## 41. Intermediário — pacto-095

**Descoberta:** Evitar isolamento mesmo com cota livre.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; prevenção de trio; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes.

**Origem:** pacto-095; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 19; 115 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C5: quadrado — cota saturada; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 1.
- L1C6: quadrado — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L1C8: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 111.
- L2C1: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L2C3: quadrado — posições restantes; primeira participação no passo 75.
- L2C6: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 22.
- L3C8: losango — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 68.
- L4C3: losango — prevenção de trio; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 25.
- L4C6: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 22.
- L5C2: losango — prevenção de trio; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 25.
- L5C6: triângulo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 23.
- L5C8: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 58.
- L6C3: círculo — posições restantes; parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; primeira participação no passo 75.
- L6C6: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 23.
- L6C7: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 6.
- L6C8: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 6.
- L7C1: quadrado — parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 32.
- L7C4: losango — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 10.
- L7C6: losango — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 10.
- L7C7: círculo — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 35.
- L8C1: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 14.
- L8C2: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 14.
- L8C3: triângulo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 18.
- L8C5: triângulo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 18.

### Sequência lógica

1. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C1.
2. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C2.
3. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C3.
4. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C4.
5. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C7.
6. linha 6 já tem dois quadrado (L6C7, L6C8); exclua quadrado de L6C1.
7. linha 6 já tem dois quadrado (L6C7, L6C8); exclua quadrado de L6C2.
8. linha 6 já tem dois quadrado (L6C7, L6C8); exclua quadrado de L6C4.
9. linha 6 já tem dois quadrado (L6C7, L6C8); exclua quadrado de L6C5.
10. linha 7 já tem dois losango (L7C4, L7C6); exclua losango de L7C2.
11. linha 7 já tem dois losango (L7C4, L7C6); exclua losango de L7C3.
12. linha 7 já tem dois losango (L7C4, L7C6); exclua losango de L7C5.
13. linha 7 já tem dois losango (L7C4, L7C6); exclua losango de L7C8.
14. linha 8 já tem dois círculo (L8C1, L8C2); exclua círculo de L8C4.
15. linha 8 já tem dois círculo (L8C1, L8C2); exclua círculo de L8C6.
16. linha 8 já tem dois círculo (L8C1, L8C2); exclua círculo de L8C7.
17. linha 8 já tem dois círculo (L8C1, L8C2); exclua círculo de L8C8.
18. linha 8 já tem dois triângulo (L8C3, L8C5); exclua triângulo de L8C4.
19. linha 8 já tem dois triângulo (L8C3, L8C5); exclua triângulo de L8C6.
20. linha 8 já tem dois triângulo (L8C3, L8C5); exclua triângulo de L8C7.
21. linha 8 já tem dois triângulo (L8C3, L8C5); exclua triângulo de L8C8.
22. coluna 6 já tem dois círculo (L2C6, L4C6); exclua círculo de L3C6.
23. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L3C6.
24. A dupla L1C5–L1C6 já está fechada; L2C5 não pode tocar essa dupla com outro quadrado.
25. L4C2 não pode ser losango: tocaria L5C2 e L4C3, formando um grupo maior que dois.
26. L5C3 não pode ser losango: tocaria L4C3 e L5C2, formando um grupo maior que dois.
27. A dupla L5C6–L6C6 já está fechada; L5C5 não pode tocar essa dupla com outro triângulo.
28. A dupla L5C6–L6C6 já está fechada; L5C7 não pode tocar essa dupla com outro triângulo.
29. A dupla L6C6–L5C6 já está fechada; L6C5 não pode tocar essa dupla com outro triângulo.
30. A dupla L6C7–L6C8 já está fechada; L5C7 não pode tocar essa dupla com outro quadrado.
31. A dupla L6C8–L6C7 já está fechada; L7C8 não pode tocar essa dupla com outro quadrado.
32. L7C1 precisa de um parceiro quadrado; só L7C2 pode recebê-lo (horizontal).
33. A dupla L7C2–L7C1 já está fechada; L7C3 não pode tocar essa dupla com outro quadrado.
34. L7C5 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
35. L7C6 precisa de um parceiro losango; só L8C6 pode recebê-lo (vertical).
36. L7C7 precisa de um parceiro círculo; só L7C8 pode recebê-lo (horizontal).
37. L8C3 precisa de um parceiro triângulo; só L7C3 pode recebê-lo (vertical).
38. L8C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
39. L8C5 precisa de um parceiro triângulo; só L7C5 pode recebê-lo (vertical).
40. A dupla L8C6–L7C6 já está fechada; L8C7 não pode tocar essa dupla com outro losango.
41. L8C7 precisa de um parceiro quadrado; só L8C8 pode recebê-lo (horizontal).
42. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L1C3.
43. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L3C3.
44. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L5C3.
45. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L1C4.
46. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L2C4.
47. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L3C4.
48. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L4C4.
49. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L5C4.
50. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L6C4.
51. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L2C5.
52. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L3C5.
53. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L4C5.
54. Na coluna 6, quadrado só cabe em L1C6 e L3C6; ambas as casas precisam dele.
55. coluna 7 já tem dois quadrado (L6C7, L8C7); exclua quadrado de L2C7.
56. coluna 7 já tem dois quadrado (L6C7, L8C7); exclua quadrado de L3C7.
57. coluna 7 já tem dois quadrado (L6C7, L8C7); exclua quadrado de L4C7.
58. coluna 8 já tem dois círculo (L5C8, L7C8); exclua círculo de L2C8.
59. coluna 8 já tem dois círculo (L5C8, L7C8); exclua círculo de L4C8.
60. coluna 8 já tem dois quadrado (L6C8, L8C8); exclua quadrado de L2C8.
61. coluna 8 já tem dois quadrado (L6C8, L8C8); exclua quadrado de L4C8.
62. L3C6 precisa de um parceiro quadrado; só L3C5 pode recebê-lo (horizontal).
63. L4C3 precisa de um parceiro losango; só L3C3 pode recebê-lo (vertical).
64. L5C8 precisa de um parceiro círculo; só L5C7 pode recebê-lo (horizontal).
65. linha 3 já tem dois quadrado (L3C5, L3C6); exclua quadrado de L3C1.
66. linha 3 já tem dois quadrado (L3C5, L3C6); exclua quadrado de L3C2.
67. linha 3 já tem dois quadrado (L3C5, L3C6); exclua quadrado de L3C4.
68. linha 3 já tem dois losango (L3C3, L3C8); exclua losango de L3C1.
69. linha 3 já tem dois losango (L3C3, L3C8); exclua losango de L3C2.
70. linha 3 já tem dois losango (L3C3, L3C8); exclua losango de L3C7.
71. linha 5 já tem dois círculo (L5C7, L5C8); exclua círculo de L5C1.
72. linha 5 já tem dois círculo (L5C7, L5C8); exclua círculo de L5C3.
73. linha 5 já tem dois círculo (L5C7, L5C8); exclua círculo de L5C4.
74. linha 5 já tem dois círculo (L5C7, L5C8); exclua círculo de L5C5.
75. Na coluna 3, círculo só cabe em L1C3 e L6C3; ambas as casas precisam dele.
76. coluna 5 já tem dois quadrado (L1C5, L3C5); exclua quadrado de L4C5.
77. coluna 5 já tem dois quadrado (L1C5, L3C5); exclua quadrado de L5C5.
78. coluna 7 já tem dois círculo (L5C7, L7C7); exclua círculo de L1C7.
79. coluna 7 já tem dois círculo (L5C7, L7C7); exclua círculo de L2C7.
80. coluna 7 já tem dois círculo (L5C7, L7C7); exclua círculo de L3C7.
81. coluna 7 já tem dois círculo (L5C7, L7C7); exclua círculo de L4C7.
82. L2C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
83. L4C6 precisa de um parceiro círculo; só L4C5 pode recebê-lo (horizontal).
84. L5C3 precisa de um parceiro quadrado; só L5C4 pode recebê-lo (horizontal).
85. A dupla L5C4–L5C3 já está fechada; L4C4 não pode tocar essa dupla com outro quadrado.
86. L5C5 precisa de um parceiro losango; só L6C5 pode recebê-lo (vertical).
87. L6C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
88. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C2.
89. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C4.
90. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C1.
91. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C2.
92. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C4.
93. Na linha 4, quadrado só cabe em L4C1 e L4C2; ambas as casas precisam dele.
94. Na linha 4, quadrado só cabe em L4C1 e L4C2; ambas as casas precisam dele.
95. Na linha 5, triângulo só cabe em L5C1 e L5C6; ambas as casas precisam dele.
96. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C1.
97. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C2.
98. coluna 2 já tem dois quadrado (L4C2, L7C2); exclua quadrado de L2C2.
99. Na coluna 4, quadrado só cabe em L2C4 e L5C4; ambas as casas precisam dele.
100. L1C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
101. L3C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
102. L5C1 precisa de um parceiro triângulo; só L6C1 pode recebê-lo (vertical).
103. L5C2 precisa de um parceiro losango; só L6C2 pode recebê-lo (vertical).
104. linha 1 já tem dois círculo (L1C3, L1C4); exclua círculo de L1C1.
105. linha 1 já tem dois círculo (L1C3, L1C4); exclua círculo de L1C2.
106. Na linha 3, círculo só cabe em L3C1 e L3C2; ambas as casas precisam dele.
107. Na linha 3, círculo só cabe em L3C1 e L3C2; ambas as casas precisam dele.
108. coluna 1 já tem dois triângulo (L5C1, L6C1); exclua triângulo de L1C1.
109. Na coluna 2, triângulo só cabe em L1C2 e L2C2; ambas as casas precisam dele.
110. Na coluna 2, triângulo só cabe em L1C2 e L2C2; ambas as casas precisam dele.
111. linha 1 já tem dois triângulo (L1C2, L1C8); exclua triângulo de L1C7.
112. L1C7 precisa de um parceiro losango; só L2C7 pode recebê-lo (vertical).
113. L1C8 precisa de um parceiro triângulo; só L2C8 pode recebê-lo (vertical).
114. L3C7 precisa de um parceiro triângulo; só L4C7 pode recebê-lo (vertical).
115. L3C8 precisa de um parceiro losango; só L4C8 pode recebê-lo (vertical).

## 42. Intermediário — pacto-098

**Descoberta:** Orientação comunica duas faixas.

**Técnicas combinadas:** cota saturada; prevenção de trio; prevenção de isolamento; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes.

**Origem:** pacto-098; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 19; 105 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L2C2: losango — prevenção de trio; parceiro obrigatório / orientação; posições restantes; prevenção de isolamento; cota saturada; primeira participação no passo 19.
- L2C3: triângulo — parceiro obrigatório / orientação; posições restantes; cota saturada; exclusão junto à dupla; primeira participação no passo 42.
- L2C5: quadrado — posições restantes; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 46.
- L3C3: losango — prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 19.
- L3C5: círculo — prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 52.
- L4C1: triângulo — posições restantes; primeira participação no passo 96.
- L4C2: círculo — prevenção de trio; posições restantes; cota saturada; primeira participação no passo 53.
- L4C4: quadrado — exclusão junto à dupla; cota saturada; primeira participação no passo 64.
- L4C7: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 56.
- L5C2: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 48.
- L5C5: losango — prevenção de isolamento; posições restantes; primeira participação no passo 20.
- L6C4: triângulo — cota saturada; prevenção de isolamento; prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 1.
- L6C6: quadrado — prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 20.
- L6C7: círculo — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 35.
- L6C8: triângulo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L7C1: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 8.
- L7C3: quadrado — cota saturada; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 13.
- L7C5: triângulo — cota saturada; prevenção de isolamento; prevenção de trio; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 17.
- L7C6: losango — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 90.
- L8C1: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 5.
- L8C3: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 13.
- L8C4: círculo — cota saturada; prevenção de isolamento; primeira participação no passo 5.
- L8C5: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 17.
- L8C8: losango — posições restantes; primeira participação no passo 85.

### Sequência lógica

1. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C1.
2. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C2.
3. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C3.
4. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C5.
5. linha 8 já tem dois círculo (L8C1, L8C4); exclua círculo de L8C2.
6. linha 8 já tem dois círculo (L8C1, L8C4); exclua círculo de L8C6.
7. linha 8 já tem dois círculo (L8C1, L8C4); exclua círculo de L8C7.
8. coluna 1 já tem dois círculo (L7C1, L8C1); exclua círculo de L1C1.
9. coluna 1 já tem dois círculo (L7C1, L8C1); exclua círculo de L2C1.
10. coluna 1 já tem dois círculo (L7C1, L8C1); exclua círculo de L3C1.
11. coluna 1 já tem dois círculo (L7C1, L8C1); exclua círculo de L5C1.
12. coluna 1 já tem dois círculo (L7C1, L8C1); exclua círculo de L6C1.
13. coluna 3 já tem dois quadrado (L7C3, L8C3); exclua quadrado de L1C3.
14. coluna 3 já tem dois quadrado (L7C3, L8C3); exclua quadrado de L4C3.
15. coluna 3 já tem dois quadrado (L7C3, L8C3); exclua quadrado de L5C3.
16. coluna 3 já tem dois quadrado (L7C3, L8C3); exclua quadrado de L6C3.
17. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L1C5.
18. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L4C5.
19. L3C2 não pode ser losango: tocaria L2C2 e L3C3, formando um grupo maior que dois.
20. L6C5 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
21. A dupla L7C1–L8C1 já está fechada; L7C2 não pode tocar essa dupla com outro círculo.
22. A dupla L7C3–L8C3 já está fechada; L7C2 não pode tocar essa dupla com outro quadrado.
23. A dupla L7C3–L8C3 já está fechada; L7C4 não pode tocar essa dupla com outro quadrado.
24. L7C4 não pode ser triângulo: tocaria L6C4 e L7C5, formando um grupo maior que dois.
25. L7C4 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
26. A dupla L8C3–L7C3 já está fechada; L8C2 não pode tocar essa dupla com outro quadrado.
27. A dupla L8C5–L7C5 já está fechada; L8C6 não pode tocar essa dupla com outro triângulo.
28. linha 7 já tem dois círculo (L7C1, L7C4); exclua círculo de L7C7.
29. linha 7 já tem dois círculo (L7C1, L7C4); exclua círculo de L7C8.
30. coluna 4 já tem dois círculo (L7C4, L8C4); exclua círculo de L1C4.
31. coluna 4 já tem dois círculo (L7C4, L8C4); exclua círculo de L2C4.
32. coluna 4 já tem dois círculo (L7C4, L8C4); exclua círculo de L3C4.
33. coluna 4 já tem dois círculo (L7C4, L8C4); exclua círculo de L5C4.
34. L6C4 precisa de um parceiro triângulo; só L5C4 pode recebê-lo (vertical).
35. L6C7 precisa de um parceiro círculo; só L5C7 pode recebê-lo (vertical).
36. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L1C4.
37. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L2C4.
38. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L3C4.
39. coluna 7 já tem dois círculo (L5C7, L6C7); exclua círculo de L1C7.
40. coluna 7 já tem dois círculo (L5C7, L6C7); exclua círculo de L2C7.
41. coluna 7 já tem dois círculo (L5C7, L6C7); exclua círculo de L3C7.
42. L2C3 precisa de um parceiro triângulo; só L1C3 pode recebê-lo (vertical).
43. A dupla L5C4–L6C4 já está fechada; L5C3 não pode tocar essa dupla com outro triângulo.
44. A dupla L5C7–L6C7 já está fechada; L5C6 não pode tocar essa dupla com outro círculo.
45. A dupla L5C7–L6C7 já está fechada; L5C8 não pode tocar essa dupla com outro círculo.
46. Na linha 2, círculo só cabe em L2C6 e L2C8; ambas as casas precisam dele.
47. Na linha 2, círculo só cabe em L2C6 e L2C8; ambas as casas precisam dele.
48. Na linha 5, círculo só cabe em L5C3 e L5C7; ambas as casas precisam dele.
49. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L4C3.
50. L1C2 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
51. A dupla L1C3–L2C3 já está fechada; L1C2 não pode tocar essa dupla com outro triângulo.
52. L3C6 não pode ser círculo: tocaria L2C6 e L3C5, formando um grupo maior que dois.
53. L4C3 não pode ser círculo: tocaria L5C3 e L4C2, formando um grupo maior que dois.
54. L5C3 precisa de um parceiro círculo; só L6C3 pode recebê-lo (vertical).
55. A dupla L6C3–L5C3 já está fechada; L6C2 não pode tocar essa dupla com outro círculo.
56. linha 4 já tem dois losango (L4C3, L4C7); exclua losango de L4C5.
57. linha 4 já tem dois losango (L4C3, L4C7); exclua losango de L4C6.
58. linha 4 já tem dois losango (L4C3, L4C7); exclua losango de L4C8.
59. Na coluna 2, círculo só cabe em L3C2 e L4C2; ambas as casas precisam dele.
60. Na coluna 2, triângulo só cabe em L7C2 e L8C2; ambas as casas precisam dele.
61. Na coluna 2, triângulo só cabe em L7C2 e L8C2; ambas as casas precisam dele.
62. L2C6 precisa de um parceiro círculo; só L1C6 pode recebê-lo (vertical).
63. A dupla L3C3–L4C3 já está fechada; L3C4 não pode tocar essa dupla com outro losango.
64. A dupla L3C4–L4C4 já está fechada; L2C4 não pode tocar essa dupla com outro quadrado.
65. L3C5 precisa de um parceiro círculo; só L4C5 pode recebê-lo (vertical).
66. A dupla L4C5–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro círculo.
67. L4C7 precisa de um parceiro losango; só L3C7 pode recebê-lo (vertical).
68. L5C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
69. linha 2 já tem dois losango (L2C2, L2C4); exclua losango de L2C1.
70. linha 2 já tem dois losango (L2C2, L2C4); exclua losango de L2C7.
71. linha 3 já tem dois círculo (L3C2, L3C5); exclua círculo de L3C8.
72. linha 3 já tem dois losango (L3C3, L3C7); exclua losango de L3C1.
73. linha 3 já tem dois losango (L3C3, L3C7); exclua losango de L3C6.
74. linha 3 já tem dois losango (L3C3, L3C7); exclua losango de L3C8.
75. linha 4 já tem dois círculo (L4C2, L4C5); exclua círculo de L4C8.
76. linha 7 já tem dois triângulo (L7C2, L7C5); exclua triângulo de L7C7.
77. linha 7 já tem dois triângulo (L7C2, L7C5); exclua triângulo de L7C8.
78. linha 8 já tem dois triângulo (L8C2, L8C5); exclua triângulo de L8C7.
79. coluna 4 já tem dois quadrado (L3C4, L4C4); exclua quadrado de L1C4.
80. coluna 5 já tem dois círculo (L3C5, L4C5); exclua círculo de L1C5.
81. Na coluna 7, triângulo só cabe em L1C7 e L2C7; ambas as casas precisam dele.
82. Na coluna 7, triângulo só cabe em L1C7 e L2C7; ambas as casas precisam dele.
83. Na coluna 7, quadrado só cabe em L7C7 e L8C7; ambas as casas precisam dele.
84. Na coluna 7, quadrado só cabe em L7C7 e L8C7; ambas as casas precisam dele.
85. Na coluna 8, círculo só cabe em L1C8 e L2C8; ambas as casas precisam dele.
86. Na coluna 8, losango só cabe em L7C8 e L8C8; ambas as casas precisam dele.
87. A dupla L1C4–L2C4 já está fechada; L1C5 não pode tocar essa dupla com outro losango.
88. L2C2 precisa de um parceiro losango; só L1C2 pode recebê-lo (vertical).
89. L6C8 precisa de um parceiro triângulo; só L5C8 pode recebê-lo (vertical).
90. L7C6 precisa de um parceiro losango; só L8C6 pode recebê-lo (vertical).
91. linha 1 já tem dois triângulo (L1C3, L1C7); exclua triângulo de L1C1.
92. Na linha 1, quadrado só cabe em L1C1 e L1C5; ambas as casas precisam dele.
93. linha 2 já tem dois triângulo (L2C3, L2C7); exclua triângulo de L2C1.
94. linha 5 já tem dois triângulo (L5C4, L5C8); exclua triângulo de L5C1.
95. linha 5 já tem dois triângulo (L5C4, L5C8); exclua triângulo de L5C6.
96. Na coluna 1, triângulo só cabe em L3C1 e L4C1; ambas as casas precisam dele.
97. coluna 1 já tem dois quadrado (L1C1, L2C1); exclua quadrado de L5C1.
98. coluna 1 já tem dois quadrado (L1C1, L2C1); exclua quadrado de L6C1.
99. Na coluna 2, quadrado só cabe em L5C2 e L6C2; ambas as casas precisam dele.
100. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L6C5.
101. Na coluna 6, triângulo só cabe em L3C6 e L4C6; ambas as casas precisam dele.
102. Na coluna 6, triângulo só cabe em L3C6 e L4C6; ambas as casas precisam dele.
103. Na coluna 6, quadrado só cabe em L5C6 e L6C6; ambas as casas precisam dele.
104. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L3C8.
105. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L4C8.

## 43. Intermediário — pacto-113

**Descoberta:** Cota e parceria retornam à região.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; prevenção de trio; posições restantes.

**Origem:** pacto-113; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 19; 134 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C4: círculo — parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 92.
- L2C5: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 11.
- L3C2: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L3C3: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 52.
- L3C6: círculo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 1.
- L3C7: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 17.
- L4C2: círculo — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 5.
- L5C6: losango — parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; posições restantes; cota saturada; primeira participação no passo 28.
- L5C7: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 17.
- L6C1: triângulo — prevenção de isolamento; exclusão junto à dupla; posições restantes; primeira participação no passo 27.
- L6C4: losango — prevenção de isolamento; prevenção de trio; cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 30.
- L7C3: triângulo — prevenção de isolamento; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 30.
- L7C5: quadrado — cota saturada; prevenção de isolamento; prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 11.
- L7C7: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 128.
- L8C4: quadrado — prevenção de isolamento; prevenção de trio; parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 30.

### Sequência lógica

1. linha 3 já tem dois círculo (L3C2, L3C6); exclua círculo de L3C1.
2. linha 3 já tem dois círculo (L3C2, L3C6); exclua círculo de L3C4.
3. linha 3 já tem dois círculo (L3C2, L3C6); exclua círculo de L3C5.
4. linha 3 já tem dois círculo (L3C2, L3C6); exclua círculo de L3C8.
5. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L1C2.
6. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L2C2.
7. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L5C2.
8. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L6C2.
9. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L7C2.
10. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L8C2.
11. coluna 5 já tem dois quadrado (L2C5, L7C5); exclua quadrado de L1C5.
12. coluna 5 já tem dois quadrado (L2C5, L7C5); exclua quadrado de L3C5.
13. coluna 5 já tem dois quadrado (L2C5, L7C5); exclua quadrado de L4C5.
14. coluna 5 já tem dois quadrado (L2C5, L7C5); exclua quadrado de L5C5.
15. coluna 5 já tem dois quadrado (L2C5, L7C5); exclua quadrado de L6C5.
16. coluna 5 já tem dois quadrado (L2C5, L7C5); exclua quadrado de L8C5.
17. coluna 7 já tem dois triângulo (L3C7, L5C7); exclua triângulo de L1C7.
18. coluna 7 já tem dois triângulo (L3C7, L5C7); exclua triângulo de L2C7.
19. coluna 7 já tem dois triângulo (L3C7, L5C7); exclua triângulo de L4C7.
20. coluna 7 já tem dois triângulo (L3C7, L5C7); exclua triângulo de L6C7.
21. coluna 7 já tem dois triângulo (L3C7, L5C7); exclua triângulo de L8C7.
22. L3C7 precisa de um parceiro triângulo; só L3C8 pode recebê-lo (horizontal).
23. A dupla L3C8–L3C7 já está fechada; L2C8 não pode tocar essa dupla com outro triângulo.
24. A dupla L3C8–L3C7 já está fechada; L4C8 não pode tocar essa dupla com outro triângulo.
25. A dupla L4C2–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro círculo.
26. A dupla L4C2–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro círculo.
27. L5C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
28. L5C7 precisa de um parceiro triângulo; só L5C8 pode recebê-lo (horizontal).
29. A dupla L5C8–L5C7 já está fechada; L6C8 não pode tocar essa dupla com outro triângulo.
30. L7C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
31. L7C4 não pode ser quadrado: tocaria L8C4 e L7C5, formando um grupo maior que dois.
32. L7C5 precisa de um parceiro quadrado; só L7C6 pode recebê-lo (horizontal).
33. A dupla L7C6–L7C5 já está fechada; L6C6 não pode tocar essa dupla com outro quadrado.
34. A dupla L7C6–L7C5 já está fechada; L8C6 não pode tocar essa dupla com outro quadrado.
35. L8C3 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
36. L8C4 precisa de um parceiro quadrado; só L8C3 pode recebê-lo (horizontal).
37. linha 3 já tem dois triângulo (L3C7, L3C8); exclua triângulo de L3C1.
38. linha 3 já tem dois triângulo (L3C7, L3C8); exclua triângulo de L3C4.
39. linha 3 já tem dois triângulo (L3C7, L3C8); exclua triângulo de L3C5.
40. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C1.
41. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C2.
42. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C3.
43. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C4.
44. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C5.
45. linha 7 já tem dois quadrado (L7C5, L7C6); exclua quadrado de L7C1.
46. linha 7 já tem dois quadrado (L7C5, L7C6); exclua quadrado de L7C2.
47. linha 7 já tem dois quadrado (L7C5, L7C6); exclua quadrado de L7C8.
48. linha 8 já tem dois quadrado (L8C3, L8C4); exclua quadrado de L8C1.
49. linha 8 já tem dois quadrado (L8C3, L8C4); exclua quadrado de L8C2.
50. linha 8 já tem dois quadrado (L8C3, L8C4); exclua quadrado de L8C7.
51. linha 8 já tem dois quadrado (L8C3, L8C4); exclua quadrado de L8C8.
52. coluna 3 já tem dois quadrado (L3C3, L8C3); exclua quadrado de L1C3.
53. coluna 3 já tem dois quadrado (L3C3, L8C3); exclua quadrado de L2C3.
54. coluna 3 já tem dois quadrado (L3C3, L8C3); exclua quadrado de L4C3.
55. coluna 3 já tem dois quadrado (L3C3, L8C3); exclua quadrado de L5C3.
56. coluna 3 já tem dois quadrado (L3C3, L8C3); exclua quadrado de L6C3.
57. coluna 8 já tem dois triângulo (L3C8, L5C8); exclua triângulo de L1C8.
58. coluna 8 já tem dois triângulo (L3C8, L5C8); exclua triângulo de L7C8.
59. coluna 8 já tem dois triângulo (L3C8, L5C8); exclua triângulo de L8C8.
60. L3C3 precisa de um parceiro quadrado; só L3C4 pode recebê-lo (horizontal).
61. A dupla L3C4–L3C3 já está fechada; L2C4 não pode tocar essa dupla com outro quadrado.
62. A dupla L3C4–L3C3 já está fechada; L4C4 não pode tocar essa dupla com outro quadrado.
63. L3C5 precisa de um parceiro losango; só L4C5 pode recebê-lo (vertical).
64. L4C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
65. A dupla L4C5–L3C5 já está fechada; L5C5 não pode tocar essa dupla com outro losango.
66. A dupla L4C5–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro losango.
67. A dupla L4C5–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro losango.
68. L4C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
69. L5C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
70. L5C6 precisa de um parceiro losango; só L6C6 pode recebê-lo (vertical).
71. L6C5 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
72. L6C5 não pode ser losango: tocaria L6C4 e L6C6, formando um grupo maior que dois.
73. A dupla L6C6–L5C6 já está fechada; L6C7 não pode tocar essa dupla com outro losango.
74. linha 3 já tem dois quadrado (L3C3, L3C4); exclua quadrado de L3C1.
75. Na linha 4, triângulo só cabe em L4C3 e L4C4; ambas as casas precisam dele.
76. Na linha 4, triângulo só cabe em L4C3 e L4C4; ambas as casas precisam dele.
77. Na linha 5, quadrado só cabe em L5C1 e L5C2; ambas as casas precisam dele.
78. Na linha 5, quadrado só cabe em L5C1 e L5C2; ambas as casas precisam dele.
79. linha 6 já tem dois losango (L6C4, L6C6); exclua losango de L6C2.
80. linha 6 já tem dois losango (L6C4, L6C6); exclua losango de L6C3.
81. linha 6 já tem dois losango (L6C4, L6C6); exclua losango de L6C8.
82. coluna 3 já tem dois triângulo (L4C3, L7C3); exclua triângulo de L1C3.
83. coluna 3 já tem dois triângulo (L4C3, L7C3); exclua triângulo de L2C3.
84. coluna 3 já tem dois triângulo (L4C3, L7C3); exclua triângulo de L6C3.
85. coluna 5 já tem dois círculo (L5C5, L6C5); exclua círculo de L1C5.
86. coluna 5 já tem dois círculo (L5C5, L6C5); exclua círculo de L8C5.
87. Na coluna 5, triângulo só cabe em L1C5 e L8C5; ambas as casas precisam dele.
88. Na coluna 5, triângulo só cabe em L1C5 e L8C5; ambas as casas precisam dele.
89. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L1C6.
90. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L2C6.
91. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L8C6.
92. L1C5 precisa de um parceiro triângulo; só L1C6 pode recebê-lo (horizontal).
93. A dupla L1C6–L1C5 já está fechada; L2C6 não pode tocar essa dupla com outro triângulo.
94. L2C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
95. L2C5 precisa de um parceiro quadrado; só L2C6 pode recebê-lo (horizontal).
96. A dupla L2C6–L2C5 já está fechada; L2C7 não pode tocar essa dupla com outro quadrado.
97. L3C6 precisa de um parceiro círculo; só L4C6 pode recebê-lo (vertical).
98. A dupla L4C6–L3C6 já está fechada; L4C7 não pode tocar essa dupla com outro círculo.
99. L4C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
100. A dupla L5C1–L5C2 já está fechada; L4C1 não pode tocar essa dupla com outro quadrado.
101. A dupla L5C2–L5C1 já está fechada; L6C2 não pode tocar essa dupla com outro quadrado.
102. A dupla L5C5–L6C5 já está fechada; L5C4 não pode tocar essa dupla com outro círculo.
103. A dupla L6C1–L6C2 já está fechada; L7C1 não pode tocar essa dupla com outro triângulo.
104. A dupla L6C2–L6C1 já está fechada; L7C2 não pode tocar essa dupla com outro triângulo.
105. L6C3 precisa de um parceiro círculo; só L5C3 pode recebê-lo (vertical).
106. A dupla L6C4–L5C4 já está fechada; L7C4 não pode tocar essa dupla com outro losango.
107. L8C5 precisa de um parceiro triângulo; só L8C6 pode recebê-lo (horizontal).
108. linha 1 já tem dois triângulo (L1C5, L1C6); exclua triângulo de L1C1.
109. linha 1 já tem dois triângulo (L1C5, L1C6); exclua triângulo de L1C2.
110. Na linha 2, triângulo só cabe em L2C1 e L2C2; ambas as casas precisam dele.
111. Na linha 2, triângulo só cabe em L2C1 e L2C2; ambas as casas precisam dele.
112. linha 2 já tem dois quadrado (L2C5, L2C6); exclua quadrado de L2C8.
113. Na linha 4, quadrado só cabe em L4C7 e L4C8; ambas as casas precisam dele.
114. Na linha 4, quadrado só cabe em L4C7 e L4C8; ambas as casas precisam dele.
115. linha 6 já tem dois círculo (L6C3, L6C5); exclua círculo de L6C7.
116. linha 6 já tem dois círculo (L6C3, L6C5); exclua círculo de L6C8.
117. linha 8 já tem dois triângulo (L8C5, L8C6); exclua triângulo de L8C1.
118. linha 8 já tem dois triângulo (L8C5, L8C6); exclua triângulo de L8C2.
119. Na coluna 1, quadrado só cabe em L1C1 e L5C1; ambas as casas precisam dele.
120. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L7C1.
121. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L8C1.
122. Na coluna 2, quadrado só cabe em L1C2 e L5C2; ambas as casas precisam dele.
123. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L1C3.
124. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L2C3.
125. Na coluna 4, círculo só cabe em L1C4 e L2C4; ambas as casas precisam dele.
126. coluna 7 já tem dois quadrado (L4C7, L6C7); exclua quadrado de L1C7.
127. coluna 8 já tem dois quadrado (L4C8, L6C8); exclua quadrado de L1C8.
128. linha 7 já tem dois círculo (L7C1, L7C7); exclua círculo de L7C8.
129. L7C7 precisa de um parceiro círculo; só L8C7 pode recebê-lo (vertical).
130. L7C8 precisa de um parceiro losango; só L8C8 pode recebê-lo (vertical).
131. coluna 7 já tem dois círculo (L7C7, L8C7); exclua círculo de L1C7.
132. coluna 7 já tem dois círculo (L7C7, L8C7); exclua círculo de L2C7.
133. Na coluna 8, círculo só cabe em L1C8 e L2C8; ambas as casas precisam dele.
134. Na coluna 8, círculo só cabe em L1C8 e L2C8; ambas as casas precisam dele.

## 44. Intermediário — pacto-132

**Descoberta:** Evitar isolamento mesmo com cota livre.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes.

**Origem:** pacto-132; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 21; 129 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C8: quadrado — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 52.
- L2C4: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 55.
- L2C5: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C6: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L3C2: quadrado — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 6.
- L3C5: triângulo — parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; cota saturada; primeira participação no passo 23.
- L3C6: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 6.
- L4C2: quadrado — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 11.
- L4C7: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 17.
- L5C7: quadrado — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; prevenção de isolamento; primeira participação no passo 28.
- L5C8: triângulo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 31.
- L6C1: losango — prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 30.
- L6C4: triângulo — cota saturada; posições restantes; primeira participação no passo 42.
- L7C6: triângulo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 86.
- L8C7: círculo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 17.

### Sequência lógica

1. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C1.
2. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C2.
3. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C3.
4. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C7.
5. linha 2 já tem dois círculo (L2C5, L2C6); exclua círculo de L2C8.
6. linha 3 já tem dois quadrado (L3C2, L3C6); exclua quadrado de L3C1.
7. linha 3 já tem dois quadrado (L3C2, L3C6); exclua quadrado de L3C3.
8. linha 3 já tem dois quadrado (L3C2, L3C6); exclua quadrado de L3C4.
9. linha 3 já tem dois quadrado (L3C2, L3C6); exclua quadrado de L3C7.
10. linha 3 já tem dois quadrado (L3C2, L3C6); exclua quadrado de L3C8.
11. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L1C2.
12. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L2C2.
13. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L5C2.
14. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L6C2.
15. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L7C2.
16. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L8C2.
17. coluna 7 já tem dois círculo (L4C7, L8C7); exclua círculo de L1C7.
18. coluna 7 já tem dois círculo (L4C7, L8C7); exclua círculo de L3C7.
19. coluna 7 já tem dois círculo (L4C7, L8C7); exclua círculo de L6C7.
20. coluna 7 já tem dois círculo (L4C7, L8C7); exclua círculo de L7C7.
21. A dupla L2C5–L2C6 já está fechada; L1C5 não pode tocar essa dupla com outro círculo.
22. A dupla L2C6–L2C5 já está fechada; L1C6 não pode tocar essa dupla com outro círculo.
23. L3C6 precisa de um parceiro quadrado; só L4C6 pode recebê-lo (vertical).
24. A dupla L4C2–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro quadrado.
25. A dupla L4C2–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro quadrado.
26. A dupla L4C6–L3C6 já está fechada; L5C6 não pode tocar essa dupla com outro quadrado.
27. A dupla L4C6–L3C6 já está fechada; L4C5 não pode tocar essa dupla com outro quadrado.
28. L4C7 precisa de um parceiro círculo; só L4C8 pode recebê-lo (horizontal).
29. A dupla L4C8–L4C7 já está fechada; L3C8 não pode tocar essa dupla com outro círculo.
30. L5C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
31. L5C7 precisa de um parceiro quadrado; só L6C7 pode recebê-lo (vertical).
32. L5C8 precisa de um parceiro triângulo; só L6C8 pode recebê-lo (vertical).
33. A dupla L6C7–L5C7 já está fechada; L7C7 não pode tocar essa dupla com outro quadrado.
34. A dupla L6C7–L5C7 já está fechada; L6C6 não pode tocar essa dupla com outro quadrado.
35. A dupla L6C8–L5C8 já está fechada; L7C8 não pode tocar essa dupla com outro triângulo.
36. L8C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
37. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C1.
38. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C3.
39. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C4.
40. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C5.
41. linha 4 já tem dois quadrado (L4C2, L4C6); exclua quadrado de L4C4.
42. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C2.
43. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C3.
44. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C5.
45. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C6.
46. coluna 6 já tem dois quadrado (L3C6, L4C6); exclua quadrado de L1C6.
47. coluna 6 já tem dois quadrado (L3C6, L4C6); exclua quadrado de L8C6.
48. coluna 7 já tem dois quadrado (L5C7, L6C7); exclua quadrado de L1C7.
49. coluna 7 já tem dois quadrado (L5C7, L6C7); exclua quadrado de L2C7.
50. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L2C8.
51. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L3C8.
52. L1C8 precisa de um parceiro quadrado; só L2C8 pode recebê-lo (vertical).
53. L3C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
54. L3C8 precisa de um parceiro losango; só L3C7 pode recebê-lo (horizontal).
55. linha 2 já tem dois quadrado (L2C4, L2C8); exclua quadrado de L2C1.
56. linha 2 já tem dois quadrado (L2C4, L2C8); exclua quadrado de L2C3.
57. Na linha 3, círculo só cabe em L3C3 e L3C4; ambas as casas precisam dele.
58. Na linha 3, círculo só cabe em L3C3 e L3C4; ambas as casas precisam dele.
59. Na linha 3, triângulo só cabe em L3C1 e L3C5; ambas as casas precisam dele.
60. coluna 8 já tem dois quadrado (L1C8, L2C8); exclua quadrado de L7C8.
61. coluna 8 já tem dois quadrado (L1C8, L2C8); exclua quadrado de L8C8.
62. L1C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
63. L2C4 precisa de um parceiro quadrado; só L1C4 pode recebê-lo (vertical).
64. L3C5 precisa de um parceiro triângulo; só L4C5 pode recebê-lo (vertical).
65. A dupla L3C7–L3C8 já está fechada; L2C7 não pode tocar essa dupla com outro losango.
66. A dupla L4C5–L3C5 já está fechada; L5C5 não pode tocar essa dupla com outro triângulo.
67. A dupla L4C5–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro triângulo.
68. L5C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
69. linha 1 já tem dois quadrado (L1C4, L1C8); exclua quadrado de L1C3.
70. linha 1 já tem dois quadrado (L1C4, L1C8); exclua quadrado de L1C5.
71. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
72. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
73. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L5C4.
74. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L7C4.
75. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L8C4.
76. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L1C5.
77. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L7C5.
78. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L8C5.
79. L1C5 precisa de um parceiro losango; só L1C6 pode recebê-lo (horizontal).
80. A dupla L1C6–L1C5 já está fechada; L1C7 não pode tocar essa dupla com outro losango.
81. linha 1 já tem dois losango (L1C5, L1C6); exclua losango de L1C1.
82. linha 1 já tem dois losango (L1C5, L1C6); exclua losango de L1C2.
83. linha 1 já tem dois losango (L1C5, L1C6); exclua losango de L1C3.
84. Na coluna 1, círculo só cabe em L1C1 e L5C1; ambas as casas precisam dele.
85. Na coluna 1, círculo só cabe em L1C1 e L5C1; ambas as casas precisam dele.
86. Na coluna 6, triângulo só cabe em L7C6 e L8C6; ambas as casas precisam dele.
87. coluna 7 já tem dois triângulo (L1C7, L2C7); exclua triângulo de L7C7.
88. L1C1 precisa de um parceiro círculo; só L1C2 pode recebê-lo (horizontal).
89. A dupla L1C2–L1C1 já está fechada; L1C3 não pode tocar essa dupla com outro círculo.
90. L1C3 precisa de um parceiro triângulo; só L2C3 pode recebê-lo (vertical).
91. A dupla L2C3–L1C3 já está fechada; L2C2 não pode tocar essa dupla com outro triângulo.
92. L4C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
93. L5C1 precisa de um parceiro círculo; só L5C2 pode recebê-lo (horizontal).
94. A dupla L5C2–L5C1 já está fechada; L6C2 não pode tocar essa dupla com outro círculo.
95. A dupla L5C2–L5C1 já está fechada; L5C3 não pode tocar essa dupla com outro círculo.
96. A dupla L6C2–L6C1 já está fechada; L7C2 não pode tocar essa dupla com outro losango.
97. A dupla L6C2–L6C1 já está fechada; L6C3 não pode tocar essa dupla com outro losango.
98. L7C7 precisa de um parceiro losango; só L7C8 pode recebê-lo (horizontal).
99. A dupla L7C8–L7C7 já está fechada; L8C8 não pode tocar essa dupla com outro losango.
100. linha 2 já tem dois triângulo (L2C3, L2C7); exclua triângulo de L2C1.
101. linha 4 já tem dois triângulo (L4C1, L4C5); exclua triângulo de L4C3.
102. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C4.
103. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C5.
104. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C6.
105. linha 6 já tem dois losango (L6C1, L6C2); exclua losango de L6C5.
106. linha 6 já tem dois losango (L6C1, L6C2); exclua losango de L6C6.
107. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C3.
108. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C4.
109. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C5.
110. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C2.
111. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C3.
112. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C4.
113. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C5.
114. coluna 2 já tem dois círculo (L1C2, L5C2); exclua círculo de L7C2.
115. Na coluna 2, triângulo só cabe em L7C2 e L8C2; ambas as casas precisam dele.
116. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L5C3.
117. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L7C3.
118. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L8C3.
119. Na coluna 4, círculo só cabe em L3C4 e L7C4; ambas as casas precisam dele.
120. A dupla L4C3–L4C4 já está fechada; L5C3 não pode tocar essa dupla com outro losango.
121. A dupla L4C4–L4C3 já está fechada; L5C4 não pode tocar essa dupla com outro losango.
122. L5C3 precisa de um parceiro quadrado; só L6C3 pode recebê-lo (vertical).
123. L5C6 precisa de um parceiro losango; só L5C5 pode recebê-lo (horizontal).
124. A dupla L6C3–L5C3 já está fechada; L7C3 não pode tocar essa dupla com outro quadrado.
125. L6C6 precisa de um parceiro círculo; só L6C5 pode recebê-lo (horizontal).
126. A dupla L7C4–L7C3 já está fechada; L7C5 não pode tocar essa dupla com outro círculo.
127. L7C5 precisa de um parceiro quadrado; só L8C5 pode recebê-lo (vertical).
128. L8C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
129. L8C3 precisa de um parceiro losango; só L8C4 pode recebê-lo (horizontal).

## 45. Intermediário — pacto-162

**Descoberta:** Orientação comunica duas faixas.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes.

**Origem:** pacto-162; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 10; 54 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 22; 137 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C4: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 1.
- L1C7: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L3C2: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 7.
- L3C4: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 12.
- L3C5: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 7.
- L5C4: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 12.
- L6C2: triângulo — prevenção de isolamento; exclusão junto à dupla; posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 79.
- L7C1: losango — cota saturada; prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 35.
- L8C5: losango — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 28.
- L8C6: círculo — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 28.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C4, L1C7); exclua círculo de L1C1.
2. linha 1 já tem dois círculo (L1C4, L1C7); exclua círculo de L1C2.
3. linha 1 já tem dois círculo (L1C4, L1C7); exclua círculo de L1C3.
4. linha 1 já tem dois círculo (L1C4, L1C7); exclua círculo de L1C5.
5. linha 1 já tem dois círculo (L1C4, L1C7); exclua círculo de L1C6.
6. linha 1 já tem dois círculo (L1C4, L1C7); exclua círculo de L1C8.
7. linha 3 já tem dois círculo (L3C2, L3C5); exclua círculo de L3C1.
8. linha 3 já tem dois círculo (L3C2, L3C5); exclua círculo de L3C3.
9. linha 3 já tem dois círculo (L3C2, L3C5); exclua círculo de L3C6.
10. linha 3 já tem dois círculo (L3C2, L3C5); exclua círculo de L3C7.
11. linha 3 já tem dois círculo (L3C2, L3C5); exclua círculo de L3C8.
12. coluna 4 já tem dois losango (L3C4, L5C4); exclua losango de L2C4.
13. coluna 4 já tem dois losango (L3C4, L5C4); exclua losango de L4C4.
14. coluna 4 já tem dois losango (L3C4, L5C4); exclua losango de L6C4.
15. coluna 4 já tem dois losango (L3C4, L5C4); exclua losango de L7C4.
16. coluna 4 já tem dois losango (L3C4, L5C4); exclua losango de L8C4.
17. L1C4 precisa de um parceiro círculo; só L2C4 pode recebê-lo (vertical).
18. L1C7 precisa de um parceiro círculo; só L2C7 pode recebê-lo (vertical).
19. A dupla L2C4–L1C4 já está fechada; L2C3 não pode tocar essa dupla com outro círculo.
20. A dupla L2C4–L1C4 já está fechada; L2C5 não pode tocar essa dupla com outro círculo.
21. A dupla L2C7–L1C7 já está fechada; L2C6 não pode tocar essa dupla com outro círculo.
22. A dupla L2C7–L1C7 já está fechada; L2C8 não pode tocar essa dupla com outro círculo.
23. L3C4 precisa de um parceiro losango; só L3C3 pode recebê-lo (horizontal).
24. L3C5 precisa de um parceiro círculo; só L4C5 pode recebê-lo (vertical).
25. A dupla L4C5–L3C5 já está fechada; L5C5 não pode tocar essa dupla com outro círculo.
26. A dupla L4C5–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro círculo.
27. A dupla L4C5–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro círculo.
28. L8C5 precisa de um parceiro losango; só L7C5 pode recebê-lo (vertical).
29. linha 2 já tem dois círculo (L2C4, L2C7); exclua círculo de L2C1.
30. linha 2 já tem dois círculo (L2C4, L2C7); exclua círculo de L2C2.
31. linha 3 já tem dois losango (L3C3, L3C4); exclua losango de L3C1.
32. linha 3 já tem dois losango (L3C3, L3C4); exclua losango de L3C6.
33. linha 3 já tem dois losango (L3C3, L3C4); exclua losango de L3C7.
34. linha 3 já tem dois losango (L3C3, L3C4); exclua losango de L3C8.
35. linha 7 já tem dois losango (L7C1, L7C5); exclua losango de L7C2.
36. linha 7 já tem dois losango (L7C1, L7C5); exclua losango de L7C3.
37. linha 7 já tem dois losango (L7C1, L7C5); exclua losango de L7C6.
38. linha 7 já tem dois losango (L7C1, L7C5); exclua losango de L7C7.
39. linha 7 já tem dois losango (L7C1, L7C5); exclua losango de L7C8.
40. coluna 4 já tem dois círculo (L1C4, L2C4); exclua círculo de L6C4.
41. coluna 4 já tem dois círculo (L1C4, L2C4); exclua círculo de L7C4.
42. coluna 4 já tem dois círculo (L1C4, L2C4); exclua círculo de L8C4.
43. coluna 5 já tem dois círculo (L3C5, L4C5); exclua círculo de L6C5.
44. coluna 5 já tem dois losango (L7C5, L8C5); exclua losango de L1C5.
45. coluna 5 já tem dois losango (L7C5, L8C5); exclua losango de L2C5.
46. coluna 5 já tem dois losango (L7C5, L8C5); exclua losango de L5C5.
47. coluna 5 já tem dois losango (L7C5, L8C5); exclua losango de L6C5.
48. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L4C7.
49. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L5C7.
50. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L6C7.
51. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L7C7.
52. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L8C7.
53. L3C2 precisa de um parceiro círculo; só L4C2 pode recebê-lo (vertical).
54. A dupla L3C3–L3C4 já está fechada; L2C3 não pode tocar essa dupla com outro losango.
55. A dupla L3C3–L3C4 já está fechada; L4C3 não pode tocar essa dupla com outro losango.
56. A dupla L4C2–L3C2 já está fechada; L5C2 não pode tocar essa dupla com outro círculo.
57. A dupla L4C2–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro círculo.
58. A dupla L4C2–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro círculo.
59. L5C4 precisa de um parceiro losango; só L5C3 pode recebê-lo (horizontal).
60. L8C6 precisa de um parceiro círculo; só L7C6 pode recebê-lo (vertical).
61. linha 4 já tem dois círculo (L4C2, L4C5); exclua círculo de L4C8.
62. linha 5 já tem dois losango (L5C3, L5C4); exclua losango de L5C1.
63. linha 5 já tem dois losango (L5C3, L5C4); exclua losango de L5C2.
64. linha 5 já tem dois losango (L5C3, L5C4); exclua losango de L5C6.
65. linha 5 já tem dois losango (L5C3, L5C4); exclua losango de L5C7.
66. linha 5 já tem dois losango (L5C3, L5C4); exclua losango de L5C8.
67. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L7C2.
68. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L8C2.
69. coluna 3 já tem dois losango (L3C3, L5C3); exclua losango de L1C3.
70. coluna 3 já tem dois losango (L3C3, L5C3); exclua losango de L6C3.
71. coluna 3 já tem dois losango (L3C3, L5C3); exclua losango de L8C3.
72. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L5C6.
73. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L6C6.
74. L4C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
75. L8C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
76. Na linha 5, círculo só cabe em L5C1 e L5C8; ambas as casas precisam dele.
77. Na linha 5, círculo só cabe em L5C1 e L5C8; ambas as casas precisam dele.
78. Na coluna 1, círculo só cabe em L5C1 e L6C1; ambas as casas precisam dele.
79. L5C2 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
80. L5C8 precisa de um parceiro círculo; só L6C8 pode recebê-lo (vertical).
81. A dupla L6C2–L5C2 já está fechada; L7C2 não pode tocar essa dupla com outro triângulo.
82. A dupla L6C2–L5C2 já está fechada; L6C3 não pode tocar essa dupla com outro triângulo.
83. A dupla L6C8–L5C8 já está fechada; L7C8 não pode tocar essa dupla com outro círculo.
84. L7C1 precisa de um parceiro losango; só L8C1 pode recebê-lo (vertical).
85. A dupla L8C1–L7C1 já está fechada; L8C2 não pode tocar essa dupla com outro losango.
86. L8C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
87. linha 6 já tem dois círculo (L6C1, L6C8); exclua círculo de L6C3.
88. Na linha 6, losango só cabe em L6C6 e L6C7; ambas as casas precisam dele.
89. Na linha 6, losango só cabe em L6C6 e L6C7; ambas as casas precisam dele.
90. Na linha 7, círculo só cabe em L7C3 e L7C6; ambas as casas precisam dele.
91. Na linha 8, círculo só cabe em L8C3 e L8C6; ambas as casas precisam dele.
92. linha 8 já tem dois losango (L8C1, L8C5); exclua losango de L8C7.
93. linha 8 já tem dois losango (L8C1, L8C5); exclua losango de L8C8.
94. coluna 1 já tem dois losango (L7C1, L8C1); exclua losango de L1C1.
95. coluna 1 já tem dois losango (L7C1, L8C1); exclua losango de L2C1.
96. coluna 2 já tem dois triângulo (L5C2, L6C2); exclua triângulo de L1C2.
97. coluna 2 já tem dois triângulo (L5C2, L6C2); exclua triângulo de L2C2.
98. coluna 2 já tem dois triângulo (L5C2, L6C2); exclua triângulo de L8C2.
99. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L1C2.
100. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L2C2.
101. Na coluna 7, losango só cabe em L4C7 e L6C7; ambas as casas precisam dele.
102. L6C3 precisa de um parceiro quadrado; só L6C4 pode recebê-lo (horizontal).
103. A dupla L6C4–L6C3 já está fechada; L7C4 não pode tocar essa dupla com outro quadrado.
104. A dupla L6C4–L6C3 já está fechada; L6C5 não pode tocar essa dupla com outro quadrado.
105. L6C5 precisa de um parceiro triângulo; só L5C5 pode recebê-lo (vertical).
106. L7C4 precisa de um parceiro triângulo; só L8C4 pode recebê-lo (vertical).
107. linha 5 já tem dois triângulo (L5C2, L5C5); exclua triângulo de L5C6.
108. linha 5 já tem dois triângulo (L5C2, L5C5); exclua triângulo de L5C7.
109. coluna 4 já tem dois triângulo (L7C4, L8C4); exclua triângulo de L4C4.
110. coluna 5 já tem dois triângulo (L5C5, L6C5); exclua triângulo de L1C5.
111. coluna 5 já tem dois triângulo (L5C5, L6C5); exclua triângulo de L2C5.
112. A dupla L1C5–L2C5 já está fechada; L1C6 não pode tocar essa dupla com outro quadrado.
113. A dupla L2C5–L1C5 já está fechada; L2C6 não pode tocar essa dupla com outro quadrado.
114. L4C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
115. A dupla L5C6–L5C7 já está fechada; L4C6 não pode tocar essa dupla com outro quadrado.
116. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C1.
117. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C8.
118. Na coluna 3, triângulo só cabe em L1C3 e L2C3; ambas as casas precisam dele.
119. Na coluna 3, triângulo só cabe em L1C3 e L2C3; ambas as casas precisam dele.
120. Na coluna 6, quadrado só cabe em L3C6 e L5C6; ambas as casas precisam dele.
121. L3C6 precisa de um parceiro quadrado; só L3C7 pode recebê-lo (horizontal).
122. A dupla L3C7–L3C6 já está fechada; L3C8 não pode tocar essa dupla com outro quadrado.
123. L4C1 precisa de um parceiro triângulo; só L3C1 pode recebê-lo (vertical).
124. L4C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
125. A dupla L4C7–L4C6 já está fechada; L4C8 não pode tocar essa dupla com outro losango.
126. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L1C1.
127. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L2C1.
128. Na coluna 6, triângulo só cabe em L1C6 e L2C6; ambas as casas precisam dele.
129. Na coluna 6, triângulo só cabe em L1C6 e L2C6; ambas as casas precisam dele.
130. Na coluna 7, triângulo só cabe em L7C7 e L8C7; ambas as casas precisam dele.
131. Na coluna 7, triângulo só cabe em L7C7 e L8C7; ambas as casas precisam dele.
132. coluna 8 já tem dois triângulo (L3C8, L4C8); exclua triângulo de L1C8.
133. coluna 8 já tem dois triângulo (L3C8, L4C8); exclua triângulo de L2C8.
134. coluna 8 já tem dois triângulo (L3C8, L4C8); exclua triângulo de L7C8.
135. coluna 8 já tem dois triângulo (L3C8, L4C8); exclua triângulo de L8C8.
136. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L1C8.
137. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L2C8.

## 46. Avançado — pacto-103

**Descoberta:** Conjunto de candidatas e capacidade da faixa.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de trio; prevenção de isolamento; posições restantes; restrição coletiva de candidatas.

**Origem:** pacto-103; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 19; 132 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C2: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L1C5: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L1C8: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 62.
- L2C6: triângulo — prevenção de trio; posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 18.
- L3C5: triângulo — prevenção de trio; cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 18.
- L4C3: quadrado — prevenção de trio; restrição coletiva de candidatas; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 19.
- L5C1: triângulo — parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; cota saturada; primeira participação no passo 46.
- L5C2: quadrado — prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; cota saturada; primeira participação no passo 19.
- L5C7: círculo — prevenção de isolamento; prevenção de trio; cota saturada; primeira participação no passo 50.
- L6C5: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 53.
- L6C6: losango — prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 50.
- L7C2: losango — parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; cota saturada; primeira participação no passo 51.
- L7C3: triângulo — parceiro obrigatório / orientação; restrição coletiva de candidatas; exclusão junto à dupla; posições restantes; primeira participação no passo 51.
- L8C1: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 6.
- L8C8: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 6.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C2, L1C5); exclua círculo de L1C1.
2. linha 1 já tem dois círculo (L1C2, L1C5); exclua círculo de L1C3.
3. linha 1 já tem dois círculo (L1C2, L1C5); exclua círculo de L1C4.
4. linha 1 já tem dois círculo (L1C2, L1C5); exclua círculo de L1C6.
5. linha 1 já tem dois círculo (L1C2, L1C5); exclua círculo de L1C7.
6. linha 8 já tem dois quadrado (L8C1, L8C8); exclua quadrado de L8C2.
7. linha 8 já tem dois quadrado (L8C1, L8C8); exclua quadrado de L8C3.
8. linha 8 já tem dois quadrado (L8C1, L8C8); exclua quadrado de L8C4.
9. linha 8 já tem dois quadrado (L8C1, L8C8); exclua quadrado de L8C5.
10. linha 8 já tem dois quadrado (L8C1, L8C8); exclua quadrado de L8C6.
11. linha 8 já tem dois quadrado (L8C1, L8C8); exclua quadrado de L8C7.
12. L1C2 precisa de um parceiro círculo; só L2C2 pode recebê-lo (vertical).
13. L1C5 precisa de um parceiro círculo; só L2C5 pode recebê-lo (vertical).
14. A dupla L2C2–L1C2 já está fechada; L3C2 não pode tocar essa dupla com outro círculo.
15. A dupla L2C2–L1C2 já está fechada; L2C1 não pode tocar essa dupla com outro círculo.
16. A dupla L2C2–L1C2 já está fechada; L2C3 não pode tocar essa dupla com outro círculo.
17. A dupla L2C5–L1C5 já está fechada; L2C4 não pode tocar essa dupla com outro círculo.
18. L3C6 não pode ser triângulo: tocaria L2C6 e L3C5, formando um grupo maior que dois.
19. L4C2 não pode ser quadrado: tocaria L5C2 e L4C3, formando um grupo maior que dois.
20. L5C3 não pode ser quadrado: tocaria L4C3 e L5C2, formando um grupo maior que dois.
21. L8C1 precisa de um parceiro quadrado; só L7C1 pode recebê-lo (vertical).
22. L8C8 precisa de um parceiro quadrado; só L7C8 pode recebê-lo (vertical).
23. linha 2 já tem dois círculo (L2C2, L2C5); exclua círculo de L2C7.
24. linha 2 já tem dois círculo (L2C2, L2C5); exclua círculo de L2C8.
25. linha 7 já tem dois quadrado (L7C1, L7C8); exclua quadrado de L7C4.
26. linha 7 já tem dois quadrado (L7C1, L7C8); exclua quadrado de L7C5.
27. linha 7 já tem dois quadrado (L7C1, L7C8); exclua quadrado de L7C6.
28. linha 7 já tem dois quadrado (L7C1, L7C8); exclua quadrado de L7C7.
29. coluna 1 já tem dois quadrado (L7C1, L8C1); exclua quadrado de L1C1.
30. coluna 1 já tem dois quadrado (L7C1, L8C1); exclua quadrado de L2C1.
31. coluna 1 já tem dois quadrado (L7C1, L8C1); exclua quadrado de L3C1.
32. coluna 1 já tem dois quadrado (L7C1, L8C1); exclua quadrado de L4C1.
33. coluna 1 já tem dois quadrado (L7C1, L8C1); exclua quadrado de L6C1.
34. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L4C2.
35. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L6C2.
36. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L8C2.
37. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L4C5.
38. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L5C5.
39. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L7C5.
40. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L8C5.
41. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L2C8.
42. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L3C8.
43. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L4C8.
44. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L5C8.
45. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L6C8.
46. L5C2 precisa de um parceiro quadrado; só L6C2 pode recebê-lo (vertical).
47. L6C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
48. L6C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
49. A dupla L6C2–L5C2 já está fechada; L6C3 não pode tocar essa dupla com outro quadrado.
50. L6C7 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
51. L7C2 precisa de um parceiro losango; só L8C2 pode recebê-lo (vertical).
52. A dupla L8C2–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro losango.
53. linha 6 já tem dois quadrado (L6C2, L6C5); exclua quadrado de L6C4.
54. Na coluna 1, círculo só cabe em L3C1 e L4C1; ambas as casas precisam dele.
55. Na coluna 1, círculo só cabe em L3C1 e L4C1; ambas as casas precisam dele.
56. coluna 1 já tem dois triângulo (L5C1, L6C1); exclua triângulo de L1C1.
57. coluna 1 já tem dois triângulo (L5C1, L6C1); exclua triângulo de L2C1.
58. Na coluna 2, triângulo só cabe em L3C2 e L4C2; ambas as casas precisam dele.
59. Na coluna 2, triângulo só cabe em L3C2 e L4C2; ambas as casas precisam dele.
60. A dupla L3C2–L4C2 já está fechada; L3C3 não pode tocar essa dupla com outro triângulo.
61. L6C5 precisa de um parceiro quadrado; só L5C5 pode recebê-lo (vertical).
62. linha 1 já tem dois losango (L1C1, L1C8); exclua losango de L1C3.
63. linha 1 já tem dois losango (L1C1, L1C8); exclua losango de L1C4.
64. linha 1 já tem dois losango (L1C1, L1C8); exclua losango de L1C6.
65. linha 1 já tem dois losango (L1C1, L1C8); exclua losango de L1C7.
66. linha 3 já tem dois triângulo (L3C2, L3C5); exclua triângulo de L3C4.
67. linha 3 já tem dois triângulo (L3C2, L3C5); exclua triângulo de L3C7.
68. linha 3 já tem dois triângulo (L3C2, L3C5); exclua triângulo de L3C8.
69. linha 5 já tem dois quadrado (L5C2, L5C5); exclua quadrado de L5C4.
70. linha 5 já tem dois quadrado (L5C2, L5C5); exclua quadrado de L5C6.
71. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L4C5.
72. L1C8 precisa de um parceiro losango; só L2C8 pode recebê-lo (vertical).
73. A dupla L2C8–L1C8 já está fechada; L3C8 não pode tocar essa dupla com outro losango.
74. A dupla L2C8–L1C8 já está fechada; L2C7 não pode tocar essa dupla com outro losango.
75. L3C5 precisa de um parceiro triângulo; só L4C5 pode recebê-lo (vertical).
76. A dupla L4C5–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro triângulo.
77. A dupla L4C5–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro triângulo.
78. L5C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
79. linha 2 já tem dois losango (L2C1, L2C8); exclua losango de L2C3.
80. linha 2 já tem dois losango (L2C1, L2C8); exclua losango de L2C4.
81. linha 3 já tem dois círculo (L3C1, L3C8); exclua círculo de L3C3.
82. linha 3 já tem dois círculo (L3C1, L3C8); exclua círculo de L3C4.
83. linha 3 já tem dois círculo (L3C1, L3C8); exclua círculo de L3C6.
84. linha 3 já tem dois círculo (L3C1, L3C8); exclua círculo de L3C7.
85. linha 4 já tem dois triângulo (L4C2, L4C5); exclua triângulo de L4C7.
86. linha 4 já tem dois triângulo (L4C2, L4C5); exclua triângulo de L4C8.
87. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L7C5.
88. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L8C5.
89. Na coluna 8, triângulo só cabe em L5C8 e L6C8; ambas as casas precisam dele.
90. Na coluna 8, triângulo só cabe em L5C8 e L6C8; ambas as casas precisam dele.
91. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L4C8.
92. L4C7 não pode ser círculo: tocaria L5C7 e L4C8, formando um grupo maior que dois.
93. A dupla L6C8–L5C8 já está fechada; L6C7 não pode tocar essa dupla com outro triângulo.
94. A dupla L7C5–L8C5 já está fechada; L7C4 não pode tocar essa dupla com outro losango.
95. A dupla L7C5–L8C5 já está fechada; L7C6 não pode tocar essa dupla com outro losango.
96. A dupla L8C5–L7C5 já está fechada; L8C4 não pode tocar essa dupla com outro losango.
97. A dupla L8C5–L7C5 já está fechada; L8C6 não pode tocar essa dupla com outro losango.
98. linha 4 já tem dois círculo (L4C1, L4C8); exclua círculo de L4C4.
99. linha 4 já tem dois círculo (L4C1, L4C8); exclua círculo de L4C6.
100. linha 5 já tem dois triângulo (L5C1, L5C8); exclua triângulo de L5C3.
101. linha 5 já tem dois triângulo (L5C1, L5C8); exclua triângulo de L5C4.
102. linha 6 já tem dois triângulo (L6C1, L6C8); exclua triângulo de L6C3.
103. linha 6 já tem dois triângulo (L6C1, L6C8); exclua triângulo de L6C4.
104. linha 7 já tem dois losango (L7C2, L7C5); exclua losango de L7C7.
105. linha 8 já tem dois losango (L8C2, L8C5); exclua losango de L8C7.
106. Na coluna 3, L1C3, L2C3, L4C3, L7C3 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L3C3.
107. Na coluna 3, L1C3, L2C3, L4C3, L7C3 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L8C3.
108. L3C3 precisa de um parceiro losango; só L3C4 pode recebê-lo (horizontal).
109. A dupla L3C4–L3C3 já está fechada; L4C4 não pode tocar essa dupla com outro losango.
110. L7C3 precisa de um parceiro triângulo; só L7C4 pode recebê-lo (horizontal).
111. A dupla L7C4–L7C3 já está fechada; L8C4 não pode tocar essa dupla com outro triângulo.
112. Na linha 3, quadrado só cabe em L3C6 e L3C7; ambas as casas precisam dele.
113. Na linha 3, quadrado só cabe em L3C6 e L3C7; ambas as casas precisam dele.
114. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C6.
115. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C7.
116. Na linha 7, círculo só cabe em L7C6 e L7C7; ambas as casas precisam dele.
117. Na linha 7, círculo só cabe em L7C6 e L7C7; ambas as casas precisam dele.
118. linha 8 já tem dois círculo (L8C3, L8C4); exclua círculo de L8C6.
119. linha 8 já tem dois círculo (L8C3, L8C4); exclua círculo de L8C7.
120. Na coluna 6, círculo só cabe em L5C6 e L7C6; ambas as casas precisam dele.
121. coluna 6 já tem dois triângulo (L2C6, L8C6); exclua triângulo de L1C6.
122. coluna 7 já tem dois círculo (L5C7, L7C7); exclua círculo de L6C7.
123. L1C6 precisa de um parceiro quadrado; só L1C7 pode recebê-lo (horizontal).
124. A dupla L1C7–L1C6 já está fechada; L2C7 não pode tocar essa dupla com outro quadrado.
125. Na linha 1, triângulo só cabe em L1C3 e L1C4; ambas as casas precisam dele.
126. Na linha 1, triângulo só cabe em L1C3 e L1C4; ambas as casas precisam dele.
127. linha 2 já tem dois triângulo (L2C6, L2C7); exclua triângulo de L2C3.
128. linha 2 já tem dois triângulo (L2C6, L2C7); exclua triângulo de L2C4.
129. linha 5 já tem dois círculo (L5C6, L5C7); exclua círculo de L5C3.
130. linha 5 já tem dois círculo (L5C6, L5C7); exclua círculo de L5C4.
131. Na linha 6, círculo só cabe em L6C3 e L6C4; ambas as casas precisam dele.
132. Na linha 6, círculo só cabe em L6C3 e L6C4; ambas as casas precisam dele.

## 47. Avançado — pacto-099

**Descoberta:** Hipótese curta termina em contradição.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; prevenção de isolamento; prevenção de trio; parceiro obrigatório / orientação; posições restantes; hipótese refutada.

**Origem:** pacto-099; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 24; 40 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 18; 114 eliminações explicadas. Refutações: 8, 2 passos.

### Função das pistas

- L1C1: círculo — cota saturada; exclusão junto à dupla; primeira participação no passo 1.
- L1C2: círculo — cota saturada; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 1.
- L1C3: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 3.
- L1C4: triângulo — cota saturada; posições restantes; primeira participação no passo 3.
- L1C5: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 5.
- L1C6: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 5.
- L2C3: losango — prevenção de isolamento; prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 37.
- L3C1: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 16.
- L3C2: losango — prevenção de isolamento; prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 37.
- L3C3: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 20.
- L4C1: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 16.
- L4C4: quadrado — cota saturada; prevenção de isolamento; exclusão junto à dupla; posições restantes; primeira participação no passo 25.
- L4C6: losango — posições restantes; primeira participação no passo 61.
- L4C7: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L4C8: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 7.
- L5C1: losango — parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; cota saturada; primeira participação no passo 51.
- L5C3: círculo — cota saturada; prevenção de isolamento; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 20.
- L5C8: quadrado — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 54.
- L6C3: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 10.
- L6C4: quadrado — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 10.
- L7C4: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 22.
- L7C6: quadrado — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 28.
- L8C4: losango — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 66.
- L8C8: triângulo — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 98.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C7.
2. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C8.
3. linha 1 já tem dois triângulo (L1C3, L1C4); exclua triângulo de L1C7.
4. linha 1 já tem dois triângulo (L1C3, L1C4); exclua triângulo de L1C8.
5. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C7.
6. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C8.
7. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C2.
8. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C3.
9. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C5.
10. linha 6 já tem dois quadrado (L6C3, L6C4); exclua quadrado de L6C1.
11. linha 6 já tem dois quadrado (L6C3, L6C4); exclua quadrado de L6C2.
12. linha 6 já tem dois quadrado (L6C3, L6C4); exclua quadrado de L6C5.
13. linha 6 já tem dois quadrado (L6C3, L6C4); exclua quadrado de L6C6.
14. linha 6 já tem dois quadrado (L6C3, L6C4); exclua quadrado de L6C7.
15. linha 6 já tem dois quadrado (L6C3, L6C4); exclua quadrado de L6C8.
16. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L2C1.
17. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L6C1.
18. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L7C1.
19. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L8C1.
20. coluna 3 já tem dois círculo (L3C3, L5C3); exclua círculo de L7C3.
21. coluna 3 já tem dois círculo (L3C3, L5C3); exclua círculo de L8C3.
22. coluna 4 já tem dois triângulo (L1C4, L7C4); exclua triângulo de L2C4.
23. coluna 4 já tem dois triângulo (L1C4, L7C4); exclua triângulo de L3C4.
24. coluna 4 já tem dois triângulo (L1C4, L7C4); exclua triângulo de L5C4.
25. coluna 4 já tem dois quadrado (L4C4, L6C4); exclua quadrado de L2C4.
26. coluna 4 já tem dois quadrado (L4C4, L6C4); exclua quadrado de L3C4.
27. coluna 4 já tem dois quadrado (L4C4, L6C4); exclua quadrado de L5C4.
28. coluna 6 já tem dois quadrado (L1C6, L7C6); exclua quadrado de L2C6.
29. coluna 6 já tem dois quadrado (L1C6, L7C6); exclua quadrado de L3C6.
30. coluna 6 já tem dois quadrado (L1C6, L7C6); exclua quadrado de L5C6.
31. coluna 6 já tem dois quadrado (L1C6, L7C6); exclua quadrado de L8C6.
32. A dupla L1C1–L1C2 já está fechada; L2C1 não pode tocar essa dupla com outro círculo.
33. A dupla L1C2–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro círculo.
34. A dupla L1C5–L1C6 já está fechada; L2C5 não pode tocar essa dupla com outro quadrado.
35. A dupla L1C7–L1C8 já está fechada; L2C7 não pode tocar essa dupla com outro losango.
36. A dupla L1C8–L1C7 já está fechada; L2C8 não pode tocar essa dupla com outro losango.
37. L2C2 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
38. L2C2 não pode ser losango: tocaria L3C2 e L2C3, formando um grupo maior que dois.
39. L2C3 precisa de um parceiro losango; só L2C4 pode recebê-lo (horizontal).
40. A dupla L2C4–L2C3 já está fechada; L3C4 não pode tocar essa dupla com outro losango.
41. A dupla L2C4–L2C3 já está fechada; L2C5 não pode tocar essa dupla com outro losango.
42. L3C2 precisa de um parceiro losango; só L4C2 pode recebê-lo (vertical).
43. A dupla L3C4–L3C3 já está fechada; L3C5 não pode tocar essa dupla com outro círculo.
44. A dupla L4C2–L3C2 já está fechada; L5C2 não pode tocar essa dupla com outro losango.
45. A dupla L4C2–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro losango.
46. L4C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
47. A dupla L4C4–L4C3 já está fechada; L4C5 não pode tocar essa dupla com outro quadrado.
48. A dupla L4C7–L4C8 já está fechada; L3C7 não pode tocar essa dupla com outro círculo.
49. A dupla L4C7–L4C8 já está fechada; L5C7 não pode tocar essa dupla com outro círculo.
50. A dupla L4C8–L4C7 já está fechada; L3C8 não pode tocar essa dupla com outro círculo.
51. L5C1 precisa de um parceiro losango; só L6C1 pode recebê-lo (vertical).
52. L5C2 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
53. L5C5 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
54. L5C8 precisa de um parceiro quadrado; só L5C7 pode recebê-lo (horizontal).
55. A dupla L6C1–L5C1 já está fechada; L7C1 não pode tocar essa dupla com outro losango.
56. A dupla L6C1–L5C1 já está fechada; L6C2 não pode tocar essa dupla com outro losango.
57. A dupla L6C3–L6C4 já está fechada; L7C3 não pode tocar essa dupla com outro quadrado.
58. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C1.
59. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C6.
60. linha 3 já tem dois círculo (L3C3, L3C4); exclua círculo de L3C6.
61. Na linha 4, triângulo só cabe em L4C1 e L4C5; ambas as casas precisam dele.
62. coluna 1 já tem dois losango (L5C1, L6C1); exclua losango de L8C1.
63. coluna 2 já tem dois losango (L3C2, L4C2); exclua losango de L7C2.
64. coluna 2 já tem dois losango (L3C2, L4C2); exclua losango de L8C2.
65. coluna 3 já tem dois quadrado (L4C3, L6C3); exclua quadrado de L8C3.
66. Na coluna 4, círculo só cabe em L3C4 e L5C4; ambas as casas precisam dele.
67. L3C5 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
68. A dupla L5C3–L5C4 já está fechada; L5C2 não pode tocar essa dupla com outro círculo.
69. A dupla L5C4–L5C3 já está fechada; L5C5 não pode tocar essa dupla com outro círculo.
70. linha 2 já tem dois quadrado (L2C1, L2C2); exclua quadrado de L2C7.
71. linha 2 já tem dois quadrado (L2C1, L2C2); exclua quadrado de L2C8.
72. Na linha 3, quadrado só cabe em L3C7 e L3C8; ambas as casas precisam dele.
73. Na linha 3, quadrado só cabe em L3C7 e L3C8; ambas as casas precisam dele.
74. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C6.
75. coluna 7 já tem dois quadrado (L3C7, L5C7); exclua quadrado de L7C7.
76. coluna 7 já tem dois quadrado (L3C7, L5C7); exclua quadrado de L8C7.
77. coluna 8 já tem dois quadrado (L3C8, L5C8); exclua quadrado de L7C8.
78. L5C2 precisa de um parceiro triângulo; só L6C2 pode recebê-lo (vertical).
79. A dupla L6C2–L5C2 já está fechada; L7C2 não pode tocar essa dupla com outro triângulo.
80. L7C6 precisa de um parceiro quadrado; só L7C5 pode recebê-lo (horizontal).
81. linha 7 já tem dois quadrado (L7C5, L7C6); exclua quadrado de L7C1.
82. linha 7 já tem dois quadrado (L7C5, L7C6); exclua quadrado de L7C2.
83. coluna 1 já tem dois círculo (L1C1, L7C1); exclua círculo de L8C1.
84. coluna 2 já tem dois círculo (L1C2, L7C2); exclua círculo de L8C2.
85. coluna 2 já tem dois triângulo (L5C2, L6C2); exclua triângulo de L8C2.
86. coluna 5 já tem dois quadrado (L1C5, L7C5); exclua quadrado de L8C5.
87. L7C4 precisa de um parceiro triângulo; só L7C3 pode recebê-lo (horizontal).
88. linha 7 já tem dois círculo (L7C1, L7C2); exclua círculo de L7C7.
89. linha 7 já tem dois círculo (L7C1, L7C2); exclua círculo de L7C8.
90. linha 7 já tem dois triângulo (L7C3, L7C4); exclua triângulo de L7C7.
91. linha 7 já tem dois triângulo (L7C3, L7C4); exclua triângulo de L7C8.
92. coluna 3 já tem dois triângulo (L1C3, L7C3); exclua triângulo de L8C3.
93. coluna 7 já tem dois losango (L1C7, L7C7); exclua losango de L6C7.
94. coluna 7 já tem dois losango (L1C7, L7C7); exclua losango de L8C7.
95. coluna 8 já tem dois losango (L1C8, L7C8); exclua losango de L6C8.
96. A dupla L8C4–L8C3 já está fechada; L8C5 não pode tocar essa dupla com outro losango.
97. L8C6 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
98. L8C8 precisa de um parceiro triângulo; só L8C7 pode recebê-lo (horizontal).
99. Na linha 8, círculo só cabe em L8C5 e L8C6; ambas as casas precisam dele.
100. Na linha 8, círculo só cabe em L8C5 e L8C6; ambas as casas precisam dele.
101. Se L2C5 fosse triângulo, 8 deduções levariam a: L3C6 fica sem símbolo possível. L3C6 não pode ser losango: tocaria L4C6 e L3C5, formando um grupo maior que dois. Portanto, exclua triângulo.
   - Hipótese, passo 1: Na coluna 5, círculo só cabe em L6C5 e L8C5; ambas as casas precisam dele.
   - Hipótese, passo 2: coluna 5 já tem dois triângulo (L2C5, L4C5); exclua triângulo de L3C5.
   - Hipótese, passo 3: coluna 5 já tem dois triângulo (L2C5, L4C5); exclua triângulo de L5C5.
   - Hipótese, passo 4: L2C5 precisa de um parceiro triângulo; só L2C6 pode recebê-lo (horizontal).
   - Hipótese, passo 5: A dupla L2C6–L2C5 já está fechada; L3C6 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 6: A dupla L2C6–L2C5 já está fechada; L2C7 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 7: L2C7 precisa de um parceiro círculo; só L2C8 pode recebê-lo (horizontal).
   - Hipótese, passo 8: L3C6 não pode ser losango: tocaria L4C6 e L3C5, formando um grupo maior que dois.
   - Contradição final: L3C6 fica sem símbolo possível. L3C6 não pode ser losango: tocaria L4C6 e L3C5, formando um grupo maior que dois.
102. coluna 5 já tem dois círculo (L2C5, L8C5); exclua círculo de L6C5.
103. L2C5 precisa de um parceiro círculo; só L2C6 pode recebê-lo (horizontal).
104. A dupla L2C6–L2C5 já está fechada; L2C7 não pode tocar essa dupla com outro círculo.
105. L2C7 precisa de um parceiro triângulo; só L2C8 pode recebê-lo (horizontal).
106. coluna 6 já tem dois círculo (L2C6, L8C6); exclua círculo de L6C6.
107. Na coluna 7, círculo só cabe em L4C7 e L6C7; ambas as casas precisam dele.
108. Na coluna 8, círculo só cabe em L4C8 e L6C8; ambas as casas precisam dele.
109. Se L3C5 fosse losango, 2 deduções levariam a: L3C5 fica sem símbolo possível. L3C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua losango.
   - Hipótese, passo 1: Na linha 3, triângulo só cabe em L3C1 e L3C6; ambas as casas precisam dele.
   - Hipótese, passo 2: L3C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L3C5 fica sem símbolo possível. L3C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
110. linha 3 já tem dois triângulo (L3C1, L3C5); exclua triângulo de L3C6.
111. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L5C5.
112. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L6C5.
113. Na coluna 6, triângulo só cabe em L5C6 e L6C6; ambas as casas precisam dele.
114. Na coluna 6, triângulo só cabe em L5C6 e L6C6; ambas as casas precisam dele.

## 48. Avançado — pacto-v2-101

**Descoberta:** Compatibilidade entre vários pares.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; restrição coletiva de candidatas; hipótese refutada.

**Origem:** pacto-111; recomposição de pistas; 2 pistas alteradas. **Pistas:** 17; 47 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 19; 129 eliminações explicadas. Refutações: 2 passos.

### Função das pistas

- L1C7: quadrado — parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 27.
- L1C8: losango — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 27.
- L2C1: quadrado — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 30.
- L2C5: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C6: triângulo — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L3C1: losango — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 30.
- L3C2: triângulo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 30.
- L3C5: círculo — prevenção de isolamento; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 57.
- L4C5: triângulo — cota saturada; posições restantes; primeira participação no passo 6.
- L4C6: triângulo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 6.
- L4C7: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 38.
- L5C7: círculo — parceiro obrigatório / orientação; restrição coletiva de candidatas; cota saturada; exclusão junto à dupla; primeira participação no passo 49.
- L6C3: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 11.
- L6C6: losango — cota saturada; posições restantes; primeira participação no passo 11.
- L7C3: quadrado — parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 35.
- L7C4: círculo — prevenção de isolamento; restrição coletiva de candidatas; posições restantes; primeira participação no passo 92.
- L8C1: triângulo — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 102.

### Sequência lógica

1. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C2.
2. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C3.
3. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C4.
4. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C7.
5. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C8.
6. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C1.
7. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C2.
8. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C3.
9. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C4.
10. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C8.
11. linha 6 já tem dois losango (L6C3, L6C6); exclua losango de L6C1.
12. linha 6 já tem dois losango (L6C3, L6C6); exclua losango de L6C2.
13. linha 6 já tem dois losango (L6C3, L6C6); exclua losango de L6C4.
14. linha 6 já tem dois losango (L6C3, L6C6); exclua losango de L6C5.
15. linha 6 já tem dois losango (L6C3, L6C6); exclua losango de L6C7.
16. linha 6 já tem dois losango (L6C3, L6C6); exclua losango de L6C8.
17. coluna 5 já tem dois triângulo (L2C5, L4C5); exclua triângulo de L1C5.
18. coluna 5 já tem dois triângulo (L2C5, L4C5); exclua triângulo de L5C5.
19. coluna 5 já tem dois triângulo (L2C5, L4C5); exclua triângulo de L6C5.
20. coluna 5 já tem dois triângulo (L2C5, L4C5); exclua triângulo de L7C5.
21. coluna 5 já tem dois triângulo (L2C5, L4C5); exclua triângulo de L8C5.
22. coluna 6 já tem dois triângulo (L2C6, L4C6); exclua triângulo de L1C6.
23. coluna 6 já tem dois triângulo (L2C6, L4C6); exclua triângulo de L3C6.
24. coluna 6 já tem dois triângulo (L2C6, L4C6); exclua triângulo de L5C6.
25. coluna 6 já tem dois triângulo (L2C6, L4C6); exclua triângulo de L7C6.
26. coluna 6 já tem dois triângulo (L2C6, L4C6); exclua triângulo de L8C6.
27. L1C8 precisa de um parceiro losango; só L2C8 pode recebê-lo (vertical).
28. A dupla L2C8–L1C8 já está fechada; L3C8 não pode tocar essa dupla com outro losango.
29. A dupla L2C8–L1C8 já está fechada; L2C7 não pode tocar essa dupla com outro losango.
30. L3C1 precisa de um parceiro losango; só L4C1 pode recebê-lo (vertical).
31. L3C2 precisa de um parceiro triângulo; só L3C3 pode recebê-lo (horizontal).
32. A dupla L3C3–L3C2 já está fechada; L3C4 não pode tocar essa dupla com outro triângulo.
33. A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro losango.
34. A dupla L4C1–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro losango.
35. L6C3 precisa de um parceiro losango; só L5C3 pode recebê-lo (vertical).
36. linha 3 já tem dois triângulo (L3C2, L3C3); exclua triângulo de L3C7.
37. linha 3 já tem dois triângulo (L3C2, L3C3); exclua triângulo de L3C8.
38. linha 4 já tem dois losango (L4C1, L4C7); exclua losango de L4C3.
39. linha 4 já tem dois losango (L4C1, L4C7); exclua losango de L4C4.
40. linha 4 já tem dois losango (L4C1, L4C7); exclua losango de L4C8.
41. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L1C1.
42. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L7C1.
43. coluna 3 já tem dois losango (L5C3, L6C3); exclua losango de L1C3.
44. coluna 3 já tem dois losango (L5C3, L6C3); exclua losango de L2C3.
45. coluna 3 já tem dois losango (L5C3, L6C3); exclua losango de L8C3.
46. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L5C8.
47. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L7C8.
48. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L8C8.
49. L4C7 precisa de um parceiro losango; só L3C7 pode recebê-lo (vertical).
50. A dupla L5C3–L6C3 já está fechada; L5C2 não pode tocar essa dupla com outro losango.
51. A dupla L5C3–L6C3 já está fechada; L5C4 não pode tocar essa dupla com outro losango.
52. linha 3 já tem dois losango (L3C1, L3C7); exclua losango de L3C4.
53. linha 3 já tem dois losango (L3C1, L3C7); exclua losango de L3C6.
54. coluna 7 já tem dois losango (L3C7, L4C7); exclua losango de L7C7.
55. coluna 7 já tem dois losango (L3C7, L4C7); exclua losango de L8C7.
56. L2C7 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
57. L3C6 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
58. linha 2 já tem dois quadrado (L2C1, L2C7); exclua quadrado de L2C2.
59. linha 2 já tem dois quadrado (L2C1, L2C7); exclua quadrado de L2C3.
60. linha 2 já tem dois quadrado (L2C1, L2C7); exclua quadrado de L2C4.
61. linha 3 já tem dois círculo (L3C5, L3C6); exclua círculo de L3C4.
62. linha 3 já tem dois círculo (L3C5, L3C6); exclua círculo de L3C8.
63. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L6C7.
64. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L7C7.
65. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L8C7.
66. A dupla L1C7–L2C7 já está fechada; L1C6 não pode tocar essa dupla com outro quadrado.
67. L2C1 precisa de um parceiro quadrado; só L1C1 pode recebê-lo (vertical).
68. L3C4 precisa de um parceiro quadrado; só L4C4 pode recebê-lo (vertical).
69. L3C8 precisa de um parceiro quadrado; só L4C8 pode recebê-lo (vertical).
70. A dupla L4C4–L3C4 já está fechada; L5C4 não pode tocar essa dupla com outro quadrado.
71. A dupla L4C4–L3C4 já está fechada; L4C3 não pode tocar essa dupla com outro quadrado.
72. A dupla L4C8–L3C8 já está fechada; L5C8 não pode tocar essa dupla com outro quadrado.
73. linha 1 já tem dois quadrado (L1C1, L1C7); exclua quadrado de L1C2.
74. linha 1 já tem dois quadrado (L1C1, L1C7); exclua quadrado de L1C3.
75. linha 1 já tem dois quadrado (L1C1, L1C7); exclua quadrado de L1C4.
76. linha 1 já tem dois quadrado (L1C1, L1C7); exclua quadrado de L1C5.
77. Na linha 4, círculo só cabe em L4C2 e L4C3; ambas as casas precisam dele.
78. coluna 1 já tem dois quadrado (L1C1, L2C1); exclua quadrado de L5C1.
79. coluna 1 já tem dois quadrado (L1C1, L2C1); exclua quadrado de L6C1.
80. coluna 1 já tem dois quadrado (L1C1, L2C1); exclua quadrado de L7C1.
81. coluna 3 já tem dois círculo (L2C3, L4C3); exclua círculo de L1C3.
82. coluna 3 já tem dois círculo (L2C3, L4C3); exclua círculo de L8C3.
83. coluna 3 já tem dois triângulo (L1C3, L3C3); exclua triângulo de L8C3.
84. coluna 4 já tem dois quadrado (L3C4, L4C4); exclua quadrado de L6C4.
85. coluna 4 já tem dois quadrado (L3C4, L4C4); exclua quadrado de L8C4.
86. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L6C8.
87. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L7C8.
88. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L8C8.
89. A dupla L4C2–L4C3 já está fechada; L5C2 não pode tocar essa dupla com outro círculo.
90. A dupla L7C3–L8C3 já está fechada; L7C2 não pode tocar essa dupla com outro quadrado.
91. A dupla L8C3–L7C3 já está fechada; L8C2 não pode tocar essa dupla com outro quadrado.
92. L8C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
93. Na linha 6, quadrado só cabe em L6C2 e L6C5; ambas as casas precisam dele.
94. Na linha 6, quadrado só cabe em L6C2 e L6C5; ambas as casas precisam dele.
95. Na coluna 2, quadrado só cabe em L5C2 e L6C2; ambas as casas precisam dele.
96. Na linha 5, L5C1, L5C4, L5C7, L5C8 reservam as 4 ocorrências de círculo e triângulo; retire esses símbolos de L5C5.
97. Na linha 5, L5C1, L5C4, L5C7, L5C8 reservam as 4 ocorrências de círculo e triângulo; retire esses símbolos de L5C6.
98. Na linha 7, L7C1, L7C4, L7C7, L7C8 reservam as 4 ocorrências de círculo e triângulo; retire esses símbolos de L7C2.
99. Na linha 7, L7C1, L7C4, L7C7, L7C8 reservam as 4 ocorrências de círculo e triângulo; retire esses símbolos de L7C5.
100. Na linha 7, L7C1, L7C4, L7C7, L7C8 reservam as 4 ocorrências de círculo e triângulo; retire esses símbolos de L7C6.
101. L7C2 precisa de um parceiro losango; só L8C2 pode recebê-lo (vertical).
102. L8C1 precisa de um parceiro triângulo; só L7C1 pode recebê-lo (vertical).
103. Na coluna 1, círculo só cabe em L5C1 e L6C1; ambas as casas precisam dele.
104. Na coluna 1, círculo só cabe em L5C1 e L6C1; ambas as casas precisam dele.
105. Na coluna 2, triângulo só cabe em L1C2 e L3C2; ambas as casas precisam dele.
106. coluna 2 já tem dois losango (L7C2, L8C2); exclua losango de L2C2.
107. A dupla L1C3–L1C2 já está fechada; L1C4 não pode tocar essa dupla com outro triângulo.
108. A dupla L2C3–L2C2 já está fechada; L2C4 não pode tocar essa dupla com outro círculo.
109. L2C4 precisa de um parceiro losango; só L1C4 pode recebê-lo (vertical).
110. Na linha 1, círculo só cabe em L1C5 e L1C6; ambas as casas precisam dele.
111. Na linha 1, círculo só cabe em L1C5 e L1C6; ambas as casas precisam dele.
112. linha 5 já tem dois círculo (L5C1, L5C7); exclua círculo de L5C4.
113. linha 5 já tem dois círculo (L5C1, L5C7); exclua círculo de L5C8.
114. Na coluna 4, triângulo só cabe em L5C4 e L6C4; ambas as casas precisam dele.
115. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L8C4.
116. coluna 5 já tem dois círculo (L1C5, L3C5); exclua círculo de L8C5.
117. coluna 6 já tem dois círculo (L1C6, L3C6); exclua círculo de L8C6.
118. L5C7 precisa de um parceiro círculo; só L6C7 pode recebê-lo (vertical).
119. L5C8 precisa de um parceiro triângulo; só L6C8 pode recebê-lo (vertical).
120. A dupla L6C7–L5C7 já está fechada; L7C7 não pode tocar essa dupla com outro círculo.
121. A dupla L6C8–L5C8 já está fechada; L7C8 não pode tocar essa dupla com outro triângulo.
122. L7C7 precisa de um parceiro triângulo; só L8C7 pode recebê-lo (vertical).
123. L7C8 precisa de um parceiro círculo; só L8C8 pode recebê-lo (vertical).
124. Se L5C5 fosse losango, 2 deduções levariam a: L5C5 fica sem símbolo possível. L5C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua losango.
   - Hipótese, passo 1: Na linha 5, quadrado só cabe em L5C2 e L5C6; ambas as casas precisam dele.
   - Hipótese, passo 2: L5C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L5C5 fica sem símbolo possível. L5C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
125. linha 5 já tem dois quadrado (L5C2, L5C5); exclua quadrado de L5C6.
126. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L7C5.
127. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L8C5.
128. Na coluna 6, quadrado só cabe em L7C6 e L8C6; ambas as casas precisam dele.
129. Na coluna 6, quadrado só cabe em L7C6 e L8C6; ambas as casas precisam dele.

## 49. Avançado — pacto-v2-103

**Descoberta:** Conjunto de candidatas e capacidade da faixa.

**Técnicas combinadas:** cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; restrição coletiva de candidatas; hipótese refutada.

**Origem:** pacto-133; recomposição de pistas; 4 pistas alteradas. **Pistas:** 19; 45 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 20; 122 eliminações explicadas. Refutações: 6, 8 passos.

### Função das pistas

- L1C2: círculo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 1.
- L1C4: triângulo — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 31.
- L1C5: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 4.
- L1C6: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 4.
- L1C7: círculo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 1.
- L2C4: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 17.
- L2C5: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; restrição coletiva de candidatas; primeira participação no passo 7.
- L2C6: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 7.
- L3C1: círculo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 40.
- L3C2: losango — parceiro obrigatório / orientação; posições restantes; cota saturada; primeira participação no passo 40.
- L4C4: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 17.
- L4C6: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 21.
- L5C4: círculo — parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; primeira participação no passo 68.
- L5C5: losango — restrição coletiva de candidatas; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 99.
- L6C7: quadrado — restrição coletiva de candidatas; exclusão junto à dupla; primeira participação no passo 95.
- L7C1: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 12.
- L7C5: círculo — restrição coletiva de candidatas; parceiro obrigatório / orientação; primeira participação no passo 99.
- L7C7: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 12.
- L8C7: triângulo — cota saturada; exclusão junto à dupla; restrição coletiva de candidatas; primeira participação no passo 25.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C2, L1C7); exclua círculo de L1C1.
2. linha 1 já tem dois círculo (L1C2, L1C7); exclua círculo de L1C3.
3. linha 1 já tem dois círculo (L1C2, L1C7); exclua círculo de L1C8.
4. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C1.
5. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C3.
6. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C8.
7. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C1.
8. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C2.
9. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C3.
10. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C7.
11. linha 2 já tem dois triângulo (L2C5, L2C6); exclua triângulo de L2C8.
12. linha 7 já tem dois triângulo (L7C1, L7C7); exclua triângulo de L7C2.
13. linha 7 já tem dois triângulo (L7C1, L7C7); exclua triângulo de L7C3.
14. linha 7 já tem dois triângulo (L7C1, L7C7); exclua triângulo de L7C4.
15. linha 7 já tem dois triângulo (L7C1, L7C7); exclua triângulo de L7C6.
16. linha 7 já tem dois triângulo (L7C1, L7C7); exclua triângulo de L7C8.
17. coluna 4 já tem dois quadrado (L2C4, L4C4); exclua quadrado de L3C4.
18. coluna 4 já tem dois quadrado (L2C4, L4C4); exclua quadrado de L6C4.
19. coluna 4 já tem dois quadrado (L2C4, L4C4); exclua quadrado de L7C4.
20. coluna 4 já tem dois quadrado (L2C4, L4C4); exclua quadrado de L8C4.
21. coluna 6 já tem dois triângulo (L2C6, L4C6); exclua triângulo de L3C6.
22. coluna 6 já tem dois triângulo (L2C6, L4C6); exclua triângulo de L5C6.
23. coluna 6 já tem dois triângulo (L2C6, L4C6); exclua triângulo de L6C6.
24. coluna 6 já tem dois triângulo (L2C6, L4C6); exclua triângulo de L8C6.
25. coluna 7 já tem dois triângulo (L7C7, L8C7); exclua triângulo de L3C7.
26. coluna 7 já tem dois triângulo (L7C7, L8C7); exclua triângulo de L4C7.
27. coluna 7 já tem dois triângulo (L7C7, L8C7); exclua triângulo de L5C7.
28. L1C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
29. L1C1 precisa de um parceiro losango; só L2C1 pode recebê-lo (vertical).
30. L1C2 precisa de um parceiro círculo; só L2C2 pode recebê-lo (vertical).
31. L1C4 precisa de um parceiro triângulo; só L1C3 pode recebê-lo (horizontal).
32. L1C7 precisa de um parceiro círculo; só L2C7 pode recebê-lo (vertical).
33. L1C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
34. L1C8 precisa de um parceiro losango; só L2C8 pode recebê-lo (vertical).
35. A dupla L2C2–L1C2 já está fechada; L2C3 não pode tocar essa dupla com outro círculo.
36. L2C4 precisa de um parceiro quadrado; só L2C3 pode recebê-lo (horizontal).
37. A dupla L2C5–L2C6 já está fechada; L3C5 não pode tocar essa dupla com outro triângulo.
38. A dupla L2C7–L1C7 já está fechada; L3C7 não pode tocar essa dupla com outro círculo.
39. A dupla L2C8–L1C8 já está fechada; L3C8 não pode tocar essa dupla com outro losango.
40. L3C1 precisa de um parceiro círculo; só L4C1 pode recebê-lo (vertical).
41. A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro círculo.
42. A dupla L4C1–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
43. L4C6 precisa de um parceiro triângulo; só L4C5 pode recebê-lo (horizontal).
44. A dupla L8C7–L7C7 já está fechada; L8C8 não pode tocar essa dupla com outro triângulo.
45. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C2.
46. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C3.
47. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C8.
48. coluna 1 já tem dois círculo (L3C1, L4C1); exclua círculo de L6C1.
49. coluna 1 já tem dois círculo (L3C1, L4C1); exclua círculo de L8C1.
50. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L5C1.
51. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L6C1.
52. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L8C1.
53. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L5C2.
54. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L6C2.
55. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L7C2.
56. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L8C2.
57. coluna 5 já tem dois triângulo (L2C5, L4C5); exclua triângulo de L6C5.
58. coluna 5 já tem dois triângulo (L2C5, L4C5); exclua triângulo de L8C5.
59. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L4C7.
60. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L5C7.
61. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L4C8.
62. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L5C8.
63. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L6C8.
64. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L7C8.
65. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L8C8.
66. A dupla L2C3–L2C4 já está fechada; L3C3 não pode tocar essa dupla com outro quadrado.
67. L3C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
68. L4C4 precisa de um parceiro quadrado; só L4C3 pode recebê-lo (horizontal).
69. Na linha 3, triângulo só cabe em L3C3 e L3C4; ambas as casas precisam dele.
70. Na linha 3, triângulo só cabe em L3C3 e L3C4; ambas as casas precisam dele.
71. Na linha 4, círculo só cabe em L4C1 e L4C8; ambas as casas precisam dele.
72. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C2.
73. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C7.
74. coluna 2 já tem dois losango (L3C2, L4C2); exclua losango de L5C2.
75. coluna 2 já tem dois losango (L3C2, L4C2); exclua losango de L6C2.
76. coluna 2 já tem dois losango (L3C2, L4C2); exclua losango de L7C2.
77. coluna 2 já tem dois losango (L3C2, L4C2); exclua losango de L8C2.
78. coluna 3 já tem dois triângulo (L1C3, L3C3); exclua triângulo de L5C3.
79. coluna 3 já tem dois triângulo (L1C3, L3C3); exclua triângulo de L6C3.
80. coluna 3 já tem dois triângulo (L1C3, L3C3); exclua triângulo de L8C3.
81. coluna 3 já tem dois quadrado (L2C3, L4C3); exclua quadrado de L5C3.
82. coluna 3 já tem dois quadrado (L2C3, L4C3); exclua quadrado de L6C3.
83. coluna 3 já tem dois quadrado (L2C3, L4C3); exclua quadrado de L7C3.
84. coluna 3 já tem dois quadrado (L2C3, L4C3); exclua quadrado de L8C3.
85. coluna 4 já tem dois triângulo (L1C4, L3C4); exclua triângulo de L6C4.
86. coluna 4 já tem dois triângulo (L1C4, L3C4); exclua triângulo de L8C4.
87. Na coluna 8, triângulo só cabe em L5C8 e L6C8; ambas as casas precisam dele.
88. Na coluna 8, triângulo só cabe em L5C8 e L6C8; ambas as casas precisam dele.
89. L4C8 precisa de um parceiro círculo; só L3C8 pode recebê-lo (vertical).
90. linha 3 já tem dois círculo (L3C1, L3C8); exclua círculo de L3C5.
91. linha 3 já tem dois círculo (L3C1, L3C8); exclua círculo de L3C6.
92. coluna 8 já tem dois círculo (L3C8, L4C8); exclua círculo de L7C8.
93. coluna 8 já tem dois círculo (L3C8, L4C8); exclua círculo de L8C8.
94. linha 7 já tem dois quadrado (L7C2, L7C8); exclua quadrado de L7C6.
95. Na linha 6, L6C1, L6C2, L6C7, L6C8 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L6C5.
96. Na linha 6, L6C1, L6C2, L6C7, L6C8 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L6C6.
97. Na linha 8, L8C1, L8C2, L8C7, L8C8 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L8C5.
98. Na linha 8, L8C1, L8C2, L8C7, L8C8 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L8C6.
99. Na coluna 5, as 2 ocorrências de quadrado só cabem em L1C5, L3C5; essas casas ficam reservadas ao conjunto.
100. L3C5 precisa de um parceiro quadrado; só L3C6 pode recebê-lo (horizontal).
101. A dupla L3C6–L3C5 já está fechada; L3C7 não pode tocar essa dupla com outro quadrado.
102. A dupla L4C7–L3C7 já está fechada; L5C7 não pode tocar essa dupla com outro losango.
103. A dupla L5C7–L6C7 já está fechada; L5C6 não pode tocar essa dupla com outro quadrado.
104. Se L5C1 fosse triângulo, 6 deduções levariam a: L5C1 fica sem símbolo possível. L5C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua triângulo.
   - Hipótese, passo 1: linha 5 já tem dois triângulo (L5C1, L5C8); exclua triângulo de L5C2.
   - Hipótese, passo 2: coluna 1 já tem dois triângulo (L5C1, L7C1); exclua triângulo de L6C1.
   - Hipótese, passo 3: coluna 1 já tem dois triângulo (L5C1, L7C1); exclua triângulo de L8C1.
   - Hipótese, passo 4: Na coluna 2, triângulo só cabe em L6C2 e L8C2; ambas as casas precisam dele.
   - Hipótese, passo 5: Na coluna 2, triângulo só cabe em L6C2 e L8C2; ambas as casas precisam dele.
   - Hipótese, passo 6: L5C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L5C1 fica sem símbolo possível. L5C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
105. Na linha 5, triângulo só cabe em L5C2 e L5C8; ambas as casas precisam dele.
106. L5C1 precisa de um parceiro quadrado; só L6C1 pode recebê-lo (vertical).
107. L5C2 precisa de um parceiro triângulo; só L6C2 pode recebê-lo (vertical).
108. L7C1 precisa de um parceiro triângulo; só L8C1 pode recebê-lo (vertical).
109. L7C2 precisa de um parceiro quadrado; só L8C2 pode recebê-lo (vertical).
110. Se L5C3 fosse círculo, 8 deduções levariam a: L6C5 fica sem símbolo possível. L6C5 não pode ser círculo: tocaria L7C5 e L6C6, formando um grupo maior que dois. Portanto, exclua círculo.
   - Hipótese, passo 1: linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C6.
   - Hipótese, passo 2: A dupla L5C3–L5C4 já está fechada; L6C3 não pode tocar essa dupla com outro círculo.
   - Hipótese, passo 3: A dupla L5C4–L5C3 já está fechada; L6C4 não pode tocar essa dupla com outro círculo.
   - Hipótese, passo 4: A dupla L5C5–L5C6 já está fechada; L6C5 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 5: A dupla L5C6–L5C5 já está fechada; L6C6 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 6: A dupla L6C3–L6C4 já está fechada; L7C3 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 7: A dupla L6C4–L6C3 já está fechada; L7C4 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 8: L6C5 não pode ser círculo: tocaria L7C5 e L6C6, formando um grupo maior que dois.
   - Contradição final: L6C5 fica sem símbolo possível. L6C5 não pode ser círculo: tocaria L7C5 e L6C6, formando um grupo maior que dois.
111. Na linha 5, círculo só cabe em L5C4 e L5C6; ambas as casas precisam dele.
112. L5C3 precisa de um parceiro losango; só L6C3 pode recebê-lo (vertical).
113. L5C4 precisa de um parceiro círculo; só L6C4 pode recebê-lo (vertical).
114. L5C5 precisa de um parceiro losango; só L6C5 pode recebê-lo (vertical).
115. L5C6 precisa de um parceiro círculo; só L6C6 pode recebê-lo (vertical).
116. A dupla L6C3–L5C3 já está fechada; L7C3 não pode tocar essa dupla com outro losango.
117. A dupla L6C4–L5C4 já está fechada; L7C4 não pode tocar essa dupla com outro círculo.
118. A dupla L6C6–L5C6 já está fechada; L7C6 não pode tocar essa dupla com outro círculo.
119. L7C3 precisa de um parceiro círculo; só L8C3 pode recebê-lo (vertical).
120. L7C4 precisa de um parceiro losango; só L8C4 pode recebê-lo (vertical).
121. L7C5 precisa de um parceiro círculo; só L8C5 pode recebê-lo (vertical).
122. L7C6 precisa de um parceiro losango; só L8C6 pode recebê-lo (vertical).

## 50. Avançado — pacto-v2-107

**Descoberta:** Hipótese curta termina em contradição.

**Técnicas combinadas:** cota saturada; prevenção de trio; exclusão junto à dupla; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; hipótese refutada; restrição coletiva de candidatas.

**Origem:** pacto-193; recomposição de pistas; 4 pistas alteradas. **Pistas:** 18; 46 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 19; 127 eliminações explicadas. Refutações: 9, 9, 7, 4, 8, 4, 8, 3 passos.

### Função das pistas

- L1C1: quadrado — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 50.
- L1C3: losango — cota saturada; restrição coletiva de candidatas; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 12.
- L1C7: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 15.
- L3C2: círculo — prevenção de isolamento; posições restantes; cota saturada; exclusão junto à dupla; primeira participação no passo 52.
- L3C3: quadrado — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L3C8: quadrado — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L4C3: quadrado — cota saturada; prevenção de trio; exclusão junto à dupla; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 9.
- L4C7: triângulo — prevenção de trio; parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; primeira participação no passo 22.
- L5C2: quadrado — cota saturada; prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; prevenção de isolamento; primeira participação no passo 6.
- L5C3: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 12.
- L5C5: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 6.
- L5C6: triângulo — prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; cota saturada; primeira participação no passo 22.
- L5C7: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 15.
- L6C1: triângulo — prevenção de isolamento; cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 34.
- L6C4: círculo — exclusão junto à dupla; posições restantes; cota saturada; primeira participação no passo 54.
- L7C3: triângulo — posições restantes; cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 94.
- L7C4: quadrado — posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 73.
- L8C1: losango — prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 34.

### Sequência lógica

1. linha 3 já tem dois quadrado (L3C3, L3C8); exclua quadrado de L3C1.
2. linha 3 já tem dois quadrado (L3C3, L3C8); exclua quadrado de L3C4.
3. linha 3 já tem dois quadrado (L3C3, L3C8); exclua quadrado de L3C5.
4. linha 3 já tem dois quadrado (L3C3, L3C8); exclua quadrado de L3C6.
5. linha 3 já tem dois quadrado (L3C3, L3C8); exclua quadrado de L3C7.
6. linha 5 já tem dois quadrado (L5C2, L5C5); exclua quadrado de L5C1.
7. linha 5 já tem dois quadrado (L5C2, L5C5); exclua quadrado de L5C4.
8. linha 5 já tem dois quadrado (L5C2, L5C5); exclua quadrado de L5C8.
9. coluna 3 já tem dois quadrado (L3C3, L4C3); exclua quadrado de L2C3.
10. coluna 3 já tem dois quadrado (L3C3, L4C3); exclua quadrado de L6C3.
11. coluna 3 já tem dois quadrado (L3C3, L4C3); exclua quadrado de L8C3.
12. coluna 3 já tem dois losango (L1C3, L5C3); exclua losango de L2C3.
13. coluna 3 já tem dois losango (L1C3, L5C3); exclua losango de L6C3.
14. coluna 3 já tem dois losango (L1C3, L5C3); exclua losango de L8C3.
15. coluna 7 já tem dois círculo (L1C7, L5C7); exclua círculo de L2C7.
16. coluna 7 já tem dois círculo (L1C7, L5C7); exclua círculo de L3C7.
17. coluna 7 já tem dois círculo (L1C7, L5C7); exclua círculo de L6C7.
18. coluna 7 já tem dois círculo (L1C7, L5C7); exclua círculo de L7C7.
19. coluna 7 já tem dois círculo (L1C7, L5C7); exclua círculo de L8C7.
20. L4C2 não pode ser quadrado: tocaria L5C2 e L4C3, formando um grupo maior que dois.
21. A dupla L4C3–L3C3 já está fechada; L4C4 não pode tocar essa dupla com outro quadrado.
22. L4C6 não pode ser triângulo: tocaria L5C6 e L4C7, formando um grupo maior que dois.
23. L5C2 precisa de um parceiro quadrado; só L6C2 pode recebê-lo (vertical).
24. L5C3 precisa de um parceiro losango; só L5C4 pode recebê-lo (horizontal).
25. A dupla L5C4–L5C3 já está fechada; L4C4 não pode tocar essa dupla com outro losango.
26. L5C6 precisa de um parceiro triângulo; só L6C6 pode recebê-lo (vertical).
27. L5C7 precisa de um parceiro círculo; só L5C8 pode recebê-lo (horizontal).
28. A dupla L5C8–L5C7 já está fechada; L4C8 não pode tocar essa dupla com outro círculo.
29. A dupla L5C8–L5C7 já está fechada; L6C8 não pode tocar essa dupla com outro círculo.
30. A dupla L6C2–L5C2 já está fechada; L7C2 não pode tocar essa dupla com outro quadrado.
31. A dupla L6C6–L5C6 já está fechada; L7C6 não pode tocar essa dupla com outro triângulo.
32. A dupla L6C6–L5C6 já está fechada; L6C5 não pode tocar essa dupla com outro triângulo.
33. A dupla L6C6–L5C6 já está fechada; L6C7 não pode tocar essa dupla com outro triângulo.
34. L7C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
35. L8C2 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
36. linha 5 já tem dois círculo (L5C7, L5C8); exclua círculo de L5C1.
37. Na linha 5, triângulo só cabe em L5C1 e L5C6; ambas as casas precisam dele.
38. linha 6 já tem dois triângulo (L6C1, L6C6); exclua triângulo de L6C3.
39. linha 6 já tem dois triângulo (L6C1, L6C6); exclua triângulo de L6C8.
40. coluna 1 já tem dois triângulo (L5C1, L6C1); exclua triângulo de L2C1.
41. coluna 1 já tem dois triângulo (L5C1, L6C1); exclua triângulo de L3C1.
42. coluna 1 já tem dois triângulo (L5C1, L6C1); exclua triângulo de L4C1.
43. coluna 1 já tem dois triângulo (L5C1, L6C1); exclua triângulo de L7C1.
44. coluna 2 já tem dois quadrado (L5C2, L6C2); exclua quadrado de L1C2.
45. coluna 2 já tem dois quadrado (L5C2, L6C2); exclua quadrado de L2C2.
46. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L1C6.
47. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L2C6.
48. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L3C6.
49. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L8C6.
50. L1C1 precisa de um parceiro quadrado; só L2C1 pode recebê-lo (vertical).
51. L4C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
52. L4C2 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
53. L4C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
54. A dupla L6C4–L6C3 já está fechada; L6C5 não pode tocar essa dupla com outro círculo.
55. Se L1C2 fosse círculo, 9 deduções levariam a: L1C2 fica sem símbolo possível. L1C2 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua círculo.
   - Hipótese, passo 1: linha 1 já tem dois círculo (L1C2, L1C7); exclua círculo de L1C4.
   - Hipótese, passo 2: linha 1 já tem dois círculo (L1C2, L1C7); exclua círculo de L1C5.
   - Hipótese, passo 3: linha 1 já tem dois círculo (L1C2, L1C7); exclua círculo de L1C6.
   - Hipótese, passo 4: linha 1 já tem dois círculo (L1C2, L1C7); exclua círculo de L1C8.
   - Hipótese, passo 5: coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L2C2.
   - Hipótese, passo 6: coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L4C2.
   - Hipótese, passo 7: coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L7C2.
   - Hipótese, passo 8: coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L8C2.
   - Hipótese, passo 9: L1C2 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C2 fica sem símbolo possível. L1C2 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
56. Se L1C4 fosse círculo, 9 deduções levariam a: L1C4 fica sem símbolo possível. L1C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua círculo.
   - Hipótese, passo 1: linha 1 já tem dois círculo (L1C4, L1C7); exclua círculo de L1C5.
   - Hipótese, passo 2: linha 1 já tem dois círculo (L1C4, L1C7); exclua círculo de L1C6.
   - Hipótese, passo 3: linha 1 já tem dois círculo (L1C4, L1C7); exclua círculo de L1C8.
   - Hipótese, passo 4: coluna 4 já tem dois círculo (L1C4, L6C4); exclua círculo de L2C4.
   - Hipótese, passo 5: coluna 4 já tem dois círculo (L1C4, L6C4); exclua círculo de L3C4.
   - Hipótese, passo 6: coluna 4 já tem dois círculo (L1C4, L6C4); exclua círculo de L4C4.
   - Hipótese, passo 7: coluna 4 já tem dois círculo (L1C4, L6C4); exclua círculo de L8C4.
   - Hipótese, passo 8: L1C3 precisa de um parceiro losango; só L1C2 pode recebê-lo (horizontal).
   - Hipótese, passo 9: L1C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C4 fica sem símbolo possível. L1C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
57. Se L1C4 fosse quadrado, 7 deduções levariam a: L1C4 fica sem símbolo possível. L1C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua quadrado.
   - Hipótese, passo 1: linha 1 já tem dois quadrado (L1C1, L1C4); exclua quadrado de L1C5.
   - Hipótese, passo 2: linha 1 já tem dois quadrado (L1C1, L1C4); exclua quadrado de L1C6.
   - Hipótese, passo 3: linha 1 já tem dois quadrado (L1C1, L1C4); exclua quadrado de L1C8.
   - Hipótese, passo 4: coluna 4 já tem dois quadrado (L1C4, L7C4); exclua quadrado de L2C4.
   - Hipótese, passo 5: coluna 4 já tem dois quadrado (L1C4, L7C4); exclua quadrado de L8C4.
   - Hipótese, passo 6: L1C3 precisa de um parceiro losango; só L1C2 pode recebê-lo (horizontal).
   - Hipótese, passo 7: L1C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C4 fica sem símbolo possível. L1C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
58. Se L1C5 fosse círculo, 4 deduções levariam a: L1C7 fica sem símbolo possível. L1C7 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua círculo.
   - Hipótese, passo 1: linha 1 já tem dois círculo (L1C5, L1C7); exclua círculo de L1C6.
   - Hipótese, passo 2: linha 1 já tem dois círculo (L1C5, L1C7); exclua círculo de L1C8.
   - Hipótese, passo 3: L1C5 precisa de um parceiro círculo; só L2C5 pode recebê-lo (vertical).
   - Hipótese, passo 4: L1C7 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C7 fica sem símbolo possível. L1C7 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
59. Se L1C5 fosse quadrado, 8 deduções levariam a: L1C5 fica sem símbolo possível. L1C5 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua quadrado.
   - Hipótese, passo 1: linha 1 já tem dois quadrado (L1C1, L1C5); exclua quadrado de L1C6.
   - Hipótese, passo 2: linha 1 já tem dois quadrado (L1C1, L1C5); exclua quadrado de L1C8.
   - Hipótese, passo 3: coluna 5 já tem dois quadrado (L1C5, L5C5); exclua quadrado de L2C5.
   - Hipótese, passo 4: coluna 5 já tem dois quadrado (L1C5, L5C5); exclua quadrado de L4C5.
   - Hipótese, passo 5: coluna 5 já tem dois quadrado (L1C5, L5C5); exclua quadrado de L6C5.
   - Hipótese, passo 6: coluna 5 já tem dois quadrado (L1C5, L5C5); exclua quadrado de L7C5.
   - Hipótese, passo 7: coluna 5 já tem dois quadrado (L1C5, L5C5); exclua quadrado de L8C5.
   - Hipótese, passo 8: L1C5 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C5 fica sem símbolo possível. L1C5 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
60. Na linha 1, as 4 ocorrências de círculo e quadrado só cabem em L1C1, L1C6, L1C7, L1C8; essas casas ficam reservadas ao conjunto.
61. Na linha 1, as 4 ocorrências de círculo e quadrado só cabem em L1C1, L1C6, L1C7, L1C8; essas casas ficam reservadas ao conjunto.
62. Se L1C5 fosse losango, 4 deduções levariam a: L1C3 fica sem símbolo possível. L1C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua losango.
   - Hipótese, passo 1: Na linha 1, triângulo só cabe em L1C2 e L1C4; ambas as casas precisam dele.
   - Hipótese, passo 2: Na linha 1, triângulo só cabe em L1C2 e L1C4; ambas as casas precisam dele.
   - Hipótese, passo 3: L1C2 precisa de um parceiro triângulo; só L2C2 pode recebê-lo (vertical).
   - Hipótese, passo 4: L1C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C3 fica sem símbolo possível. L1C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
63. Se L1C6 fosse círculo, 8 deduções levariam a: L1C8 fica sem símbolo possível. L1C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua círculo.
   - Hipótese, passo 1: linha 1 já tem dois círculo (L1C6, L1C7); exclua círculo de L1C8.
   - Hipótese, passo 2: coluna 8 já tem dois quadrado (L1C8, L3C8); exclua quadrado de L2C8.
   - Hipótese, passo 3: coluna 8 já tem dois quadrado (L1C8, L3C8); exclua quadrado de L4C8.
   - Hipótese, passo 4: coluna 8 já tem dois quadrado (L1C8, L3C8); exclua quadrado de L6C8.
   - Hipótese, passo 5: coluna 8 já tem dois quadrado (L1C8, L3C8); exclua quadrado de L7C8.
   - Hipótese, passo 6: coluna 8 já tem dois quadrado (L1C8, L3C8); exclua quadrado de L8C8.
   - Hipótese, passo 7: A dupla L1C6–L1C7 já está fechada; L2C6 não pode tocar essa dupla com outro círculo.
   - Hipótese, passo 8: L1C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C8 fica sem símbolo possível. L1C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
64. Na linha 1, círculo só cabe em L1C7 e L1C8; ambas as casas precisam dele.
65. coluna 8 já tem dois círculo (L1C8, L5C8); exclua círculo de L2C8.
66. coluna 8 já tem dois círculo (L1C8, L5C8); exclua círculo de L7C8.
67. coluna 8 já tem dois círculo (L1C8, L5C8); exclua círculo de L8C8.
68. L1C6 precisa de um parceiro quadrado; só L2C6 pode recebê-lo (vertical).
69. A dupla L2C6–L1C6 já está fechada; L2C5 não pode tocar essa dupla com outro quadrado.
70. A dupla L2C6–L1C6 já está fechada; L2C7 não pode tocar essa dupla com outro quadrado.
71. linha 2 já tem dois quadrado (L2C1, L2C6); exclua quadrado de L2C4.
72. linha 2 já tem dois quadrado (L2C1, L2C6); exclua quadrado de L2C8.
73. Na coluna 4, quadrado só cabe em L7C4 e L8C4; ambas as casas precisam dele.
74. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L4C6.
75. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L7C6.
76. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L8C6.
77. L3C8 precisa de um parceiro quadrado; só L4C8 pode recebê-lo (vertical).
78. L4C7 precisa de um parceiro triângulo; só L3C7 pode recebê-lo (vertical).
79. A dupla L7C4–L8C4 já está fechada; L7C5 não pode tocar essa dupla com outro quadrado.
80. A dupla L8C4–L7C4 já está fechada; L8C5 não pode tocar essa dupla com outro quadrado.
81. linha 4 já tem dois quadrado (L4C3, L4C8); exclua quadrado de L4C5.
82. Na coluna 5, quadrado só cabe em L5C5 e L6C5; ambas as casas precisam dele.
83. coluna 7 já tem dois triângulo (L3C7, L4C7); exclua triângulo de L2C7.
84. coluna 7 já tem dois triângulo (L3C7, L4C7); exclua triângulo de L7C7.
85. coluna 7 já tem dois triângulo (L3C7, L4C7); exclua triângulo de L8C7.
86. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L6C8.
87. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L7C8.
88. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L8C8.
89. L2C7 precisa de um parceiro losango; só L2C8 pode recebê-lo (horizontal).
90. linha 2 já tem dois losango (L2C7, L2C8); exclua losango de L2C2.
91. linha 2 já tem dois losango (L2C7, L2C8); exclua losango de L2C4.
92. linha 2 já tem dois losango (L2C7, L2C8); exclua losango de L2C5.
93. linha 6 já tem dois quadrado (L6C2, L6C5); exclua quadrado de L6C7.
94. Na linha 7, quadrado só cabe em L7C4 e L7C7; ambas as casas precisam dele.
95. Na linha 8, quadrado só cabe em L8C4 e L8C7; ambas as casas precisam dele.
96. Na coluna 8, triângulo só cabe em L7C8 e L8C8; ambas as casas precisam dele.
97. Na coluna 8, triângulo só cabe em L7C8 e L8C8; ambas as casas precisam dele.
98. linha 7 já tem dois triângulo (L7C3, L7C8); exclua triângulo de L7C2.
99. linha 7 já tem dois triângulo (L7C3, L7C8); exclua triângulo de L7C5.
100. L7C3 precisa de um parceiro triângulo; só L8C3 pode recebê-lo (vertical).
101. A dupla L8C3–L7C3 já está fechada; L8C2 não pode tocar essa dupla com outro triângulo.
102. L8C5 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
103. Na coluna 2, triângulo só cabe em L1C2 e L2C2; ambas as casas precisam dele.
104. Na coluna 2, triângulo só cabe em L1C2 e L2C2; ambas as casas precisam dele.
105. Na coluna 3, círculo só cabe em L2C3 e L6C3; ambas as casas precisam dele.
106. L1C3 precisa de um parceiro losango; só L1C4 pode recebê-lo (horizontal).
107. L1C5 precisa de um parceiro triângulo; só L2C5 pode recebê-lo (vertical).
108. L2C3 precisa de um parceiro círculo; só L2C4 pode recebê-lo (horizontal).
109. A dupla L2C4–L2C3 já está fechada; L3C4 não pode tocar essa dupla com outro círculo.
110. A dupla L2C5–L1C5 já está fechada; L3C5 não pode tocar essa dupla com outro triângulo.
111. Na linha 3, triângulo só cabe em L3C4 e L3C7; ambas as casas precisam dele.
112. coluna 4 já tem dois círculo (L2C4, L6C4); exclua círculo de L4C4.
113. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L4C5.
114. Se L3C1 fosse losango, 3 deduções levariam a: L3C1 fica sem símbolo possível. L3C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua losango.
   - Hipótese, passo 1: Na coluna 1, círculo só cabe em L4C1 e L7C1; ambas as casas precisam dele.
   - Hipótese, passo 2: Na coluna 1, círculo só cabe em L4C1 e L7C1; ambas as casas precisam dele.
   - Hipótese, passo 3: L3C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L3C1 fica sem símbolo possível. L3C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
115. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C5.
116. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C6.
117. A dupla L3C1–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro círculo.
118. A dupla L3C2–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
119. A dupla L3C5–L3C6 já está fechada; L4C5 não pode tocar essa dupla com outro losango.
120. A dupla L3C6–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro losango.
121. Na coluna 1, círculo só cabe em L3C1 e L7C1; ambas as casas precisam dele.
122. L7C1 precisa de um parceiro círculo; só L7C2 pode recebê-lo (horizontal).
123. A dupla L7C2–L7C1 já está fechada; L8C2 não pode tocar essa dupla com outro círculo.
124. linha 7 já tem dois círculo (L7C1, L7C2); exclua círculo de L7C5.
125. linha 7 já tem dois círculo (L7C1, L7C2); exclua círculo de L7C6.
126. Na linha 8, círculo só cabe em L8C5 e L8C6; ambas as casas precisam dele.
127. Na linha 8, círculo só cabe em L8C5 e L8C6; ambas as casas precisam dele.

## 51. Avançado — pacto-116

**Descoberta:** Compatibilidade entre vários pares.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; prevenção de trio; hipótese refutada.

**Origem:** pacto-116; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 20; 138 eliminações explicadas. Refutações: 2, 2 passos.

### Função das pistas

- L1C1: triângulo — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 54.
- L2C2: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 40.
- L2C3: triângulo — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 55.
- L2C4: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; primeira participação no passo 1.
- L2C7: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L3C6: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 21.
- L4C2: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 5.
- L4C6: triângulo — cota saturada; exclusão junto à dupla; primeira participação no passo 5.
- L5C2: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 11.
- L5C6: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 11.
- L5C8: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 98.
- L6C6: losango — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 25.
- L8C1: losango — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 58.
- L8C7: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 16.
- L8C8: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 16.

### Sequência lógica

1. linha 2 já tem dois quadrado (L2C4, L2C7); exclua quadrado de L2C1.
2. linha 2 já tem dois quadrado (L2C4, L2C7); exclua quadrado de L2C5.
3. linha 2 já tem dois quadrado (L2C4, L2C7); exclua quadrado de L2C6.
4. linha 2 já tem dois quadrado (L2C4, L2C7); exclua quadrado de L2C8.
5. linha 4 já tem dois triângulo (L4C2, L4C6); exclua triângulo de L4C1.
6. linha 4 já tem dois triângulo (L4C2, L4C6); exclua triângulo de L4C3.
7. linha 4 já tem dois triângulo (L4C2, L4C6); exclua triângulo de L4C4.
8. linha 4 já tem dois triângulo (L4C2, L4C6); exclua triângulo de L4C5.
9. linha 4 já tem dois triângulo (L4C2, L4C6); exclua triângulo de L4C7.
10. linha 4 já tem dois triângulo (L4C2, L4C6); exclua triângulo de L4C8.
11. linha 5 já tem dois losango (L5C2, L5C6); exclua losango de L5C1.
12. linha 5 já tem dois losango (L5C2, L5C6); exclua losango de L5C3.
13. linha 5 já tem dois losango (L5C2, L5C6); exclua losango de L5C4.
14. linha 5 já tem dois losango (L5C2, L5C6); exclua losango de L5C5.
15. linha 5 já tem dois losango (L5C2, L5C6); exclua losango de L5C7.
16. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C2.
17. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C3.
18. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C4.
19. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C5.
20. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C6.
21. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L1C6.
22. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L2C6.
23. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L7C6.
24. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L8C6.
25. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L1C6.
26. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L2C6.
27. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L7C6.
28. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L8C6.
29. A dupla L3C6–L4C6 já está fechada; L3C5 não pode tocar essa dupla com outro triângulo.
30. A dupla L3C6–L4C6 já está fechada; L3C7 não pode tocar essa dupla com outro triângulo.
31. L4C2 precisa de um parceiro triângulo; só L3C2 pode recebê-lo (vertical).
32. L5C2 precisa de um parceiro losango; só L6C2 pode recebê-lo (vertical).
33. A dupla L6C2–L5C2 já está fechada; L7C2 não pode tocar essa dupla com outro losango.
34. A dupla L6C2–L5C2 já está fechada; L6C1 não pode tocar essa dupla com outro losango.
35. A dupla L6C2–L5C2 já está fechada; L6C3 não pode tocar essa dupla com outro losango.
36. A dupla L6C6–L5C6 já está fechada; L6C5 não pode tocar essa dupla com outro losango.
37. A dupla L6C6–L5C6 já está fechada; L6C7 não pode tocar essa dupla com outro losango.
38. A dupla L8C7–L8C8 já está fechada; L7C7 não pode tocar essa dupla com outro círculo.
39. A dupla L8C8–L8C7 já está fechada; L7C8 não pode tocar essa dupla com outro círculo.
40. linha 2 já tem dois círculo (L2C2, L2C6); exclua círculo de L2C1.
41. linha 2 já tem dois círculo (L2C2, L2C6); exclua círculo de L2C5.
42. linha 2 já tem dois círculo (L2C2, L2C6); exclua círculo de L2C8.
43. linha 3 já tem dois triângulo (L3C2, L3C6); exclua triângulo de L3C1.
44. linha 3 já tem dois triângulo (L3C2, L3C6); exclua triângulo de L3C3.
45. linha 3 já tem dois triângulo (L3C2, L3C6); exclua triângulo de L3C4.
46. linha 3 já tem dois triângulo (L3C2, L3C6); exclua triângulo de L3C8.
47. linha 6 já tem dois losango (L6C2, L6C6); exclua losango de L6C4.
48. linha 6 já tem dois losango (L6C2, L6C6); exclua losango de L6C8.
49. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L1C2.
50. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L7C2.
51. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L8C2.
52. coluna 2 já tem dois losango (L5C2, L6C2); exclua losango de L1C2.
53. coluna 2 já tem dois losango (L5C2, L6C2); exclua losango de L8C2.
54. L1C1 precisa de um parceiro triângulo; só L2C1 pode recebê-lo (vertical).
55. L2C2 precisa de um parceiro círculo; só L1C2 pode recebê-lo (vertical).
56. L2C3 precisa de um parceiro triângulo; só L1C3 pode recebê-lo (vertical).
57. L2C6 precisa de um parceiro círculo; só L1C6 pode recebê-lo (vertical).
58. L8C1 precisa de um parceiro losango; só L7C1 pode recebê-lo (vertical).
59. linha 1 já tem dois círculo (L1C2, L1C6); exclua círculo de L1C4.
60. linha 1 já tem dois círculo (L1C2, L1C6); exclua círculo de L1C5.
61. linha 1 já tem dois círculo (L1C2, L1C6); exclua círculo de L1C7.
62. linha 1 já tem dois círculo (L1C2, L1C6); exclua círculo de L1C8.
63. linha 1 já tem dois triângulo (L1C1, L1C3); exclua triângulo de L1C4.
64. linha 1 já tem dois triângulo (L1C1, L1C3); exclua triângulo de L1C5.
65. linha 1 já tem dois triângulo (L1C1, L1C3); exclua triângulo de L1C7.
66. linha 1 já tem dois triângulo (L1C1, L1C3); exclua triângulo de L1C8.
67. linha 2 já tem dois triângulo (L2C1, L2C3); exclua triângulo de L2C5.
68. linha 2 já tem dois triângulo (L2C1, L2C3); exclua triângulo de L2C8.
69. linha 8 já tem dois quadrado (L8C2, L8C6); exclua quadrado de L8C3.
70. linha 8 já tem dois quadrado (L8C2, L8C6); exclua quadrado de L8C4.
71. linha 8 já tem dois quadrado (L8C2, L8C6); exclua quadrado de L8C5.
72. coluna 1 já tem dois triângulo (L1C1, L2C1); exclua triângulo de L5C1.
73. coluna 1 já tem dois triângulo (L1C1, L2C1); exclua triângulo de L6C1.
74. coluna 1 já tem dois losango (L7C1, L8C1); exclua losango de L3C1.
75. coluna 1 já tem dois losango (L7C1, L8C1); exclua losango de L4C1.
76. coluna 2 já tem dois círculo (L1C2, L2C2); exclua círculo de L7C2.
77. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L5C3.
78. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L6C3.
79. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L7C3.
80. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L8C3.
81. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L7C6.
82. A dupla L7C2–L8C2 já está fechada; L7C3 não pode tocar essa dupla com outro quadrado.
83. A dupla L7C6–L8C6 já está fechada; L7C5 não pode tocar essa dupla com outro quadrado.
84. A dupla L7C6–L8C6 já está fechada; L7C7 não pode tocar essa dupla com outro quadrado.
85. linha 7 já tem dois quadrado (L7C2, L7C6); exclua quadrado de L7C4.
86. linha 7 já tem dois quadrado (L7C2, L7C6); exclua quadrado de L7C8.
87. Na linha 8, triângulo só cabe em L8C4 e L8C5; ambas as casas precisam dele.
88. Na linha 8, triângulo só cabe em L8C4 e L8C5; ambas as casas precisam dele.
89. L8C3 precisa de um parceiro losango; só L7C3 pode recebê-lo (vertical).
90. A dupla L8C4–L8C5 já está fechada; L7C4 não pode tocar essa dupla com outro triângulo.
91. A dupla L8C5–L8C4 já está fechada; L7C5 não pode tocar essa dupla com outro triângulo.
92. Na linha 7, círculo só cabe em L7C4 e L7C5; ambas as casas precisam dele.
93. Na linha 7, círculo só cabe em L7C4 e L7C5; ambas as casas precisam dele.
94. Na linha 7, triângulo só cabe em L7C7 e L7C8; ambas as casas precisam dele.
95. Na linha 7, triângulo só cabe em L7C7 e L7C8; ambas as casas precisam dele.
96. coluna 3 já tem dois losango (L7C3, L8C3); exclua losango de L3C3.
97. coluna 3 já tem dois losango (L7C3, L8C3); exclua losango de L4C3.
98. coluna 8 já tem dois triângulo (L5C8, L7C8); exclua triângulo de L6C8.
99. L5C8 precisa de um parceiro triângulo; só L5C7 pode recebê-lo (horizontal).
100. L6C7 não pode ser triângulo: tocaria L5C7 e L7C7, formando um grupo maior que dois.
101. A dupla L7C4–L7C5 já está fechada; L6C4 não pode tocar essa dupla com outro círculo.
102. A dupla L7C5–L7C4 já está fechada; L6C5 não pode tocar essa dupla com outro círculo.
103. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C4.
104. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C5.
105. Na linha 6, triângulo só cabe em L6C4 e L6C5; ambas as casas precisam dele.
106. Na linha 6, triângulo só cabe em L6C4 e L6C5; ambas as casas precisam dele.
107. Se L1C4 fosse losango, 2 deduções levariam a: L1C5 fica sem símbolo possível. L1C5 não pode ser losango: tocaria L2C5 e L1C4, formando um grupo maior que dois. Portanto, exclua losango.
   - Hipótese, passo 1: L1C4 precisa de um parceiro losango; só L1C5 pode recebê-lo (horizontal).
   - Hipótese, passo 2: L1C5 não pode ser losango: tocaria L2C5 e L1C4, formando um grupo maior que dois.
   - Contradição final: L1C5 fica sem símbolo possível. L1C5 não pode ser losango: tocaria L2C5 e L1C4, formando um grupo maior que dois.
108. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L3C4.
109. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L4C4.
110. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L5C4.
111. Na coluna 4, losango só cabe em L3C4 e L4C4; ambas as casas precisam dele.
112. Na coluna 4, losango só cabe em L3C4 e L4C4; ambas as casas precisam dele.
113. A dupla L1C4–L2C4 já está fechada; L1C5 não pode tocar essa dupla com outro quadrado.
114. A dupla L2C5–L1C5 já está fechada; L3C5 não pode tocar essa dupla com outro losango.
115. A dupla L4C4–L3C4 já está fechada; L4C5 não pode tocar essa dupla com outro losango.
116. Se L1C7 fosse losango, 2 deduções levariam a: L1C7 fica sem símbolo possível. L1C7 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua losango.
   - Hipótese, passo 1: Na linha 1, quadrado só cabe em L1C4 e L1C8; ambas as casas precisam dele.
   - Hipótese, passo 2: L1C7 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C7 fica sem símbolo possível. L1C7 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
117. linha 1 já tem dois quadrado (L1C4, L1C7); exclua quadrado de L1C8.
118. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L3C7.
119. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L4C7.
120. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L6C7.
121. Na coluna 7, losango só cabe em L3C7 e L4C7; ambas as casas precisam dele.
122. Na coluna 7, losango só cabe em L3C7 e L4C7; ambas as casas precisam dele.
123. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L3C8.
124. coluna 8 já tem dois losango (L1C8, L2C8); exclua losango de L4C8.
125. L6C7 precisa de um parceiro círculo; só L6C8 pode recebê-lo (horizontal).
126. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C1.
127. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C3.
128. coluna 8 já tem dois círculo (L6C8, L8C8); exclua círculo de L3C8.
129. coluna 8 já tem dois círculo (L6C8, L8C8); exclua círculo de L4C8.
130. L6C1 precisa de um parceiro quadrado; só L5C1 pode recebê-lo (vertical).
131. L6C3 precisa de um parceiro quadrado; só L5C3 pode recebê-lo (vertical).
132. Na linha 5, círculo só cabe em L5C4 e L5C5; ambas as casas precisam dele.
133. Na coluna 1, círculo só cabe em L3C1 e L4C1; ambas as casas precisam dele.
134. Na coluna 1, círculo só cabe em L3C1 e L4C1; ambas as casas precisam dele.
135. Na coluna 3, círculo só cabe em L3C3 e L4C3; ambas as casas precisam dele.
136. Na coluna 3, círculo só cabe em L3C3 e L4C3; ambas as casas precisam dele.
137. coluna 5 já tem dois círculo (L5C5, L7C5); exclua círculo de L3C5.
138. coluna 5 já tem dois círculo (L5C5, L7C5); exclua círculo de L4C5.

## 52. Avançado — pacto-v2-102

**Descoberta:** Conjunto de candidatas e capacidade da faixa.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; prevenção de trio; posições restantes; restrição coletiva de candidatas; hipótese refutada.

**Origem:** pacto-126; recomposição de pistas; 1 pistas alteradas. **Pistas:** 16; 48 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 22; 134 eliminações explicadas. Refutações: 7 passos.

### Função das pistas

- L1C5: círculo — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 112.
- L2C4: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 14.
- L3C1: triângulo — posições restantes; prevenção de trio; parceiro obrigatório / orientação; primeira participação no passo 83.
- L3C2: círculo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 83.
- L4C4: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 14.
- L5C1: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 5.
- L5C3: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 1.
- L5C4: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 1.
- L5C8: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 48.
- L6C3: triângulo — restrição coletiva de candidatas; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 85.
- L6C6: quadrado — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; restrição coletiva de candidatas; posições restantes; primeira participação no passo 18.
- L7C1: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 5.
- L7C4: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 10.
- L7C6: losango — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; primeira participação no passo 30.
- L7C7: triângulo — parceiro obrigatório / orientação; prevenção de trio; exclusão junto à dupla; cota saturada; primeira participação no passo 30.
- L8C6: quadrado — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; restrição coletiva de candidatas; posições restantes; primeira participação no passo 18.

### Sequência lógica

1. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C2.
2. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C5.
3. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C6.
4. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C7.
5. coluna 1 já tem dois quadrado (L5C1, L7C1); exclua quadrado de L1C1.
6. coluna 1 já tem dois quadrado (L5C1, L7C1); exclua quadrado de L2C1.
7. coluna 1 já tem dois quadrado (L5C1, L7C1); exclua quadrado de L4C1.
8. coluna 1 já tem dois quadrado (L5C1, L7C1); exclua quadrado de L6C1.
9. coluna 1 já tem dois quadrado (L5C1, L7C1); exclua quadrado de L8C1.
10. coluna 4 já tem dois círculo (L5C4, L7C4); exclua círculo de L1C4.
11. coluna 4 já tem dois círculo (L5C4, L7C4); exclua círculo de L3C4.
12. coluna 4 já tem dois círculo (L5C4, L7C4); exclua círculo de L6C4.
13. coluna 4 já tem dois círculo (L5C4, L7C4); exclua círculo de L8C4.
14. coluna 4 já tem dois losango (L2C4, L4C4); exclua losango de L1C4.
15. coluna 4 já tem dois losango (L2C4, L4C4); exclua losango de L3C4.
16. coluna 4 já tem dois losango (L2C4, L4C4); exclua losango de L6C4.
17. coluna 4 já tem dois losango (L2C4, L4C4); exclua losango de L8C4.
18. coluna 6 já tem dois quadrado (L6C6, L8C6); exclua quadrado de L1C6.
19. coluna 6 já tem dois quadrado (L6C6, L8C6); exclua quadrado de L2C6.
20. coluna 6 já tem dois quadrado (L6C6, L8C6); exclua quadrado de L3C6.
21. coluna 6 já tem dois quadrado (L6C6, L8C6); exclua quadrado de L4C6.
22. coluna 6 já tem dois quadrado (L6C6, L8C6); exclua quadrado de L5C6.
23. L5C1 precisa de um parceiro quadrado; só L5C2 pode recebê-lo (horizontal).
24. A dupla L5C2–L5C1 já está fechada; L4C2 não pode tocar essa dupla com outro quadrado.
25. A dupla L5C2–L5C1 já está fechada; L6C2 não pode tocar essa dupla com outro quadrado.
26. A dupla L5C3–L5C4 já está fechada; L4C3 não pode tocar essa dupla com outro círculo.
27. L7C1 precisa de um parceiro quadrado; só L7C2 pode recebê-lo (horizontal).
28. A dupla L7C2–L7C1 já está fechada; L8C2 não pode tocar essa dupla com outro quadrado.
29. A dupla L7C2–L7C1 já está fechada; L7C3 não pode tocar essa dupla com outro quadrado.
30. L7C6 precisa de um parceiro losango; só L7C5 pode recebê-lo (horizontal).
31. L8C5 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
32. linha 5 já tem dois quadrado (L5C1, L5C2); exclua quadrado de L5C5.
33. linha 5 já tem dois quadrado (L5C1, L5C2); exclua quadrado de L5C7.
34. linha 7 já tem dois quadrado (L7C1, L7C2); exclua quadrado de L7C8.
35. linha 7 já tem dois losango (L7C5, L7C6); exclua losango de L7C3.
36. linha 7 já tem dois losango (L7C5, L7C6); exclua losango de L7C8.
37. coluna 2 já tem dois quadrado (L5C2, L7C2); exclua quadrado de L1C2.
38. coluna 2 já tem dois quadrado (L5C2, L7C2); exclua quadrado de L2C2.
39. L6C5 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
40. L7C4 precisa de um parceiro círculo; só L7C3 pode recebê-lo (horizontal).
41. A dupla L7C5–L7C6 já está fechada; L6C5 não pode tocar essa dupla com outro losango.
42. A dupla L7C5–L7C6 já está fechada; L8C5 não pode tocar essa dupla com outro losango.
43. linha 7 já tem dois círculo (L7C3, L7C4); exclua círculo de L7C8.
44. coluna 3 já tem dois círculo (L5C3, L7C3); exclua círculo de L1C3.
45. coluna 3 já tem dois círculo (L5C3, L7C3); exclua círculo de L2C3.
46. coluna 3 já tem dois círculo (L5C3, L7C3); exclua círculo de L3C3.
47. coluna 3 já tem dois círculo (L5C3, L7C3); exclua círculo de L8C3.
48. coluna 8 já tem dois triângulo (L5C8, L7C8); exclua triângulo de L1C8.
49. coluna 8 já tem dois triângulo (L5C8, L7C8); exclua triângulo de L2C8.
50. coluna 8 já tem dois triângulo (L5C8, L7C8); exclua triângulo de L3C8.
51. coluna 8 já tem dois triângulo (L5C8, L7C8); exclua triângulo de L4C8.
52. coluna 8 já tem dois triângulo (L5C8, L7C8); exclua triângulo de L6C8.
53. coluna 8 já tem dois triângulo (L5C8, L7C8); exclua triângulo de L8C8.
54. L5C8 precisa de um parceiro triângulo; só L5C7 pode recebê-lo (horizontal).
55. L6C7 não pode ser triângulo: tocaria L5C7 e L7C7, formando um grupo maior que dois.
56. A dupla L7C7–L7C8 já está fechada; L8C7 não pode tocar essa dupla com outro triângulo.
57. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C5.
58. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C6.
59. coluna 5 já tem dois losango (L5C5, L7C5); exclua losango de L2C5.
60. coluna 5 já tem dois losango (L5C5, L7C5); exclua losango de L3C5.
61. coluna 5 já tem dois losango (L5C5, L7C5); exclua losango de L4C5.
62. coluna 6 já tem dois losango (L5C6, L7C6); exclua losango de L1C6.
63. coluna 6 já tem dois losango (L5C6, L7C6); exclua losango de L2C6.
64. coluna 6 já tem dois losango (L5C6, L7C6); exclua losango de L3C6.
65. coluna 6 já tem dois losango (L5C6, L7C6); exclua losango de L4C6.
66. coluna 7 já tem dois triângulo (L5C7, L7C7); exclua triângulo de L1C7.
67. coluna 7 já tem dois triângulo (L5C7, L7C7); exclua triângulo de L2C7.
68. coluna 7 já tem dois triângulo (L5C7, L7C7); exclua triângulo de L3C7.
69. coluna 7 já tem dois triângulo (L5C7, L7C7); exclua triângulo de L4C7.
70. L2C4 precisa de um parceiro losango; só L2C3 pode recebê-lo (horizontal).
71. L4C4 precisa de um parceiro losango; só L4C3 pode recebê-lo (horizontal).
72. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C1.
73. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C2.
74. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C7.
75. linha 2 já tem dois losango (L2C3, L2C4); exclua losango de L2C8.
76. linha 4 já tem dois losango (L4C3, L4C4); exclua losango de L4C1.
77. linha 4 já tem dois losango (L4C3, L4C4); exclua losango de L4C2.
78. linha 4 já tem dois losango (L4C3, L4C4); exclua losango de L4C7.
79. linha 4 já tem dois losango (L4C3, L4C4); exclua losango de L4C8.
80. coluna 3 já tem dois losango (L2C3, L4C3); exclua losango de L1C3.
81. coluna 3 já tem dois losango (L2C3, L4C3); exclua losango de L3C3.
82. coluna 3 já tem dois losango (L2C3, L4C3); exclua losango de L8C3.
83. Na linha 3, losango só cabe em L3C7 e L3C8; ambas as casas precisam dele.
84. Na linha 3, losango só cabe em L3C7 e L3C8; ambas as casas precisam dele.
85. Na linha 6, L6C3, L6C4, L6C5, L6C6 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L6C1.
86. Na linha 6, L6C3, L6C4, L6C5, L6C6 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L6C2.
87. Na linha 6, L6C3, L6C4, L6C5, L6C6 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L6C7.
88. Na linha 6, L6C3, L6C4, L6C5, L6C6 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L6C8.
89. Na linha 8, L8C3, L8C4, L8C5, L8C6 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L8C1.
90. Na linha 8, L8C3, L8C4, L8C5, L8C6 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L8C2.
91. Na linha 8, L8C3, L8C4, L8C5, L8C6 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L8C7.
92. Na linha 8, L8C3, L8C4, L8C5, L8C6 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L8C8.
93. L6C3 precisa de um parceiro triângulo; só L6C4 pode recebê-lo (horizontal).
94. A dupla L6C4–L6C3 já está fechada; L6C5 não pode tocar essa dupla com outro triângulo.
95. L8C6 precisa de um parceiro quadrado; só L8C5 pode recebê-lo (horizontal).
96. Na linha 8, triângulo só cabe em L8C3 e L8C4; ambas as casas precisam dele.
97. Na linha 8, triângulo só cabe em L8C3 e L8C4; ambas as casas precisam dele.
98. coluna 3 já tem dois triângulo (L6C3, L8C3); exclua triângulo de L1C3.
99. coluna 3 já tem dois triângulo (L6C3, L8C3); exclua triângulo de L3C3.
100. coluna 4 já tem dois triângulo (L6C4, L8C4); exclua triângulo de L1C4.
101. coluna 4 já tem dois triângulo (L6C4, L8C4); exclua triângulo de L3C4.
102. coluna 5 já tem dois quadrado (L6C5, L8C5); exclua quadrado de L2C5.
103. coluna 5 já tem dois quadrado (L6C5, L8C5); exclua quadrado de L3C5.
104. coluna 5 já tem dois quadrado (L6C5, L8C5); exclua quadrado de L4C5.
105. linha 1 já tem dois quadrado (L1C3, L1C4); exclua quadrado de L1C7.
106. linha 1 já tem dois quadrado (L1C3, L1C4); exclua quadrado de L1C8.
107. Na linha 2, quadrado só cabe em L2C7 e L2C8; ambas as casas precisam dele.
108. Na linha 2, quadrado só cabe em L2C7 e L2C8; ambas as casas precisam dele.
109. Na linha 4, quadrado só cabe em L4C7 e L4C8; ambas as casas precisam dele.
110. Na linha 4, quadrado só cabe em L4C7 e L4C8; ambas as casas precisam dele.
111. Se L1C1 fosse triângulo, 7 deduções levariam a: L2C2 fica sem símbolo possível. L2C2 não pode ser círculo: tocaria L3C2 e L2C1, formando um grupo maior que dois. Portanto, exclua triângulo.
   - Hipótese, passo 1: coluna 1 já tem dois triângulo (L1C1, L3C1); exclua triângulo de L2C1.
   - Hipótese, passo 2: coluna 1 já tem dois triângulo (L1C1, L3C1); exclua triângulo de L4C1.
   - Hipótese, passo 3: Na coluna 1, losango só cabe em L6C1 e L8C1; ambas as casas precisam dele.
   - Hipótese, passo 4: Na coluna 1, losango só cabe em L6C1 e L8C1; ambas as casas precisam dele.
   - Hipótese, passo 5: L1C1 precisa de um parceiro triângulo; só L1C2 pode recebê-lo (horizontal).
   - Hipótese, passo 6: A dupla L1C2–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 7: L2C2 não pode ser círculo: tocaria L3C2 e L2C1, formando um grupo maior que dois.
   - Contradição final: L2C2 fica sem símbolo possível. L2C2 não pode ser círculo: tocaria L3C2 e L2C1, formando um grupo maior que dois.
112. Na linha 1, triângulo só cabe em L1C2 e L1C6; ambas as casas precisam dele.
113. Na linha 1, triângulo só cabe em L1C2 e L1C6; ambas as casas precisam dele.
114. Na coluna 2, losango só cabe em L6C2 e L8C2; ambas as casas precisam dele.
115. Na coluna 2, losango só cabe em L6C2 e L8C2; ambas as casas precisam dele.
116. L1C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
117. L1C2 precisa de um parceiro triângulo; só L2C2 pode recebê-lo (vertical).
118. L1C5 precisa de um parceiro círculo; só L2C5 pode recebê-lo (vertical).
119. L1C6 precisa de um parceiro triângulo; só L2C6 pode recebê-lo (vertical).
120. L2C1 não pode ser triângulo: tocaria L3C1 e L2C2, formando um grupo maior que dois.
121. A dupla L2C5–L1C5 já está fechada; L3C5 não pode tocar essa dupla com outro círculo.
122. A dupla L2C6–L1C6 já está fechada; L3C6 não pode tocar essa dupla com outro triângulo.
123. L3C1 precisa de um parceiro triângulo; só L4C1 pode recebê-lo (vertical).
124. L3C2 precisa de um parceiro círculo; só L4C2 pode recebê-lo (vertical).
125. L3C5 precisa de um parceiro triângulo; só L4C5 pode recebê-lo (vertical).
126. L3C6 precisa de um parceiro círculo; só L4C6 pode recebê-lo (vertical).
127. L6C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
128. L8C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
129. linha 1 já tem dois círculo (L1C1, L1C5); exclua círculo de L1C7.
130. linha 1 já tem dois círculo (L1C1, L1C5); exclua círculo de L1C8.
131. Na linha 6, círculo só cabe em L6C7 e L6C8; ambas as casas precisam dele.
132. Na linha 6, círculo só cabe em L6C7 e L6C8; ambas as casas precisam dele.
133. Na linha 8, círculo só cabe em L8C7 e L8C8; ambas as casas precisam dele.
134. Na linha 8, círculo só cabe em L8C7 e L8C8; ambas as casas precisam dele.

## 53. Avançado — pacto-139

**Descoberta:** Hipótese curta termina em contradição.

**Técnicas combinadas:** cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de trio; posições restantes; hipótese refutada.

**Origem:** pacto-139; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 12; 52 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 20; 138 eliminações explicadas. Refutações: 10 passos.

### Função das pistas

- L1C2: círculo — prevenção de isolamento; cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 31.
- L1C8: losango — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 33.
- L2C1: losango — cota saturada; prevenção de isolamento; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C2: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L3C4: triângulo — cota saturada; exclusão junto à dupla; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 25.
- L4C4: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L4C6: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 7.
- L5C5: losango — cota saturada; exclusão junto à dupla; primeira participação no passo 13.
- L5C6: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 13.
- L6C3: losango — prevenção de isolamento; posições restantes; exclusão junto à dupla; cota saturada; primeira participação no passo 86.
- L8C1: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 19.
- L8C2: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 19.

### Sequência lógica

1. linha 2 já tem dois losango (L2C1, L2C2); exclua losango de L2C3.
2. linha 2 já tem dois losango (L2C1, L2C2); exclua losango de L2C4.
3. linha 2 já tem dois losango (L2C1, L2C2); exclua losango de L2C5.
4. linha 2 já tem dois losango (L2C1, L2C2); exclua losango de L2C6.
5. linha 2 já tem dois losango (L2C1, L2C2); exclua losango de L2C7.
6. linha 2 já tem dois losango (L2C1, L2C2); exclua losango de L2C8.
7. linha 4 já tem dois triângulo (L4C4, L4C6); exclua triângulo de L4C1.
8. linha 4 já tem dois triângulo (L4C4, L4C6); exclua triângulo de L4C2.
9. linha 4 já tem dois triângulo (L4C4, L4C6); exclua triângulo de L4C3.
10. linha 4 já tem dois triângulo (L4C4, L4C6); exclua triângulo de L4C5.
11. linha 4 já tem dois triângulo (L4C4, L4C6); exclua triângulo de L4C7.
12. linha 4 já tem dois triângulo (L4C4, L4C6); exclua triângulo de L4C8.
13. linha 5 já tem dois losango (L5C5, L5C6); exclua losango de L5C1.
14. linha 5 já tem dois losango (L5C5, L5C6); exclua losango de L5C2.
15. linha 5 já tem dois losango (L5C5, L5C6); exclua losango de L5C3.
16. linha 5 já tem dois losango (L5C5, L5C6); exclua losango de L5C4.
17. linha 5 já tem dois losango (L5C5, L5C6); exclua losango de L5C7.
18. linha 5 já tem dois losango (L5C5, L5C6); exclua losango de L5C8.
19. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C3.
20. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C4.
21. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C5.
22. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C6.
23. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C7.
24. linha 8 já tem dois quadrado (L8C1, L8C2); exclua quadrado de L8C8.
25. coluna 4 já tem dois triângulo (L3C4, L4C4); exclua triângulo de L1C4.
26. coluna 4 já tem dois triângulo (L3C4, L4C4); exclua triângulo de L2C4.
27. coluna 4 já tem dois triângulo (L3C4, L4C4); exclua triângulo de L5C4.
28. coluna 4 já tem dois triângulo (L3C4, L4C4); exclua triângulo de L6C4.
29. coluna 4 já tem dois triângulo (L3C4, L4C4); exclua triângulo de L7C4.
30. coluna 4 já tem dois triângulo (L3C4, L4C4); exclua triângulo de L8C4.
31. L1C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
32. L1C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
33. L1C8 precisa de um parceiro losango; só L1C7 pode recebê-lo (horizontal).
34. A dupla L2C1–L2C2 já está fechada; L1C1 não pode tocar essa dupla com outro losango.
35. A dupla L2C1–L2C2 já está fechada; L3C1 não pode tocar essa dupla com outro losango.
36. A dupla L2C2–L2C1 já está fechada; L3C2 não pode tocar essa dupla com outro losango.
37. A dupla L3C4–L4C4 já está fechada; L3C3 não pode tocar essa dupla com outro triângulo.
38. A dupla L3C4–L4C4 já está fechada; L3C5 não pode tocar essa dupla com outro triângulo.
39. L4C6 precisa de um parceiro triângulo; só L3C6 pode recebê-lo (vertical).
40. A dupla L5C5–L5C6 já está fechada; L4C5 não pode tocar essa dupla com outro losango.
41. A dupla L5C5–L5C6 já está fechada; L6C5 não pode tocar essa dupla com outro losango.
42. A dupla L5C6–L5C5 já está fechada; L6C6 não pode tocar essa dupla com outro losango.
43. A dupla L8C1–L8C2 já está fechada; L7C1 não pode tocar essa dupla com outro quadrado.
44. A dupla L8C2–L8C1 já está fechada; L7C2 não pode tocar essa dupla com outro quadrado.
45. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C3.
46. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C4.
47. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C5.
48. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C6.
49. linha 1 já tem dois losango (L1C7, L1C8); exclua losango de L1C3.
50. linha 1 já tem dois losango (L1C7, L1C8); exclua losango de L1C4.
51. linha 1 já tem dois losango (L1C7, L1C8); exclua losango de L1C5.
52. linha 1 já tem dois losango (L1C7, L1C8); exclua losango de L1C6.
53. linha 3 já tem dois triângulo (L3C4, L3C6); exclua triângulo de L3C1.
54. linha 3 já tem dois triângulo (L3C4, L3C6); exclua triângulo de L3C2.
55. linha 3 já tem dois triângulo (L3C4, L3C6); exclua triângulo de L3C7.
56. linha 3 já tem dois triângulo (L3C4, L3C6); exclua triângulo de L3C8.
57. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L1C6.
58. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L2C6.
59. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L6C6.
60. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L7C6.
61. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L8C6.
62. L1C5 não pode ser quadrado: tocaria L1C4 e L1C6, formando um grupo maior que dois.
63. L1C6 precisa de um parceiro quadrado; só L2C6 pode recebê-lo (vertical).
64. A dupla L2C6–L1C6 já está fechada; L2C5 não pode tocar essa dupla com outro quadrado.
65. A dupla L2C6–L1C6 já está fechada; L2C7 não pode tocar essa dupla com outro quadrado.
66. L3C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
67. Na linha 1, triângulo só cabe em L1C3 e L1C5; ambas as casas precisam dele.
68. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L6C6.
69. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L7C6.
70. L1C3 precisa de um parceiro triângulo; só L2C3 pode recebê-lo (vertical).
71. L1C4 precisa de um parceiro quadrado; só L2C4 pode recebê-lo (vertical).
72. L1C5 precisa de um parceiro triângulo; só L2C5 pode recebê-lo (vertical).
73. Na linha 2, círculo só cabe em L2C7 e L2C8; ambas as casas precisam dele.
74. Na linha 2, círculo só cabe em L2C7 e L2C8; ambas as casas precisam dele.
75. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L5C3.
76. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L7C3.
77. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L8C3.
78. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L5C4.
79. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L6C4.
80. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L7C4.
81. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L6C5.
82. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L7C5.
83. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L8C5.
84. A dupla L2C7–L2C8 já está fechada; L3C7 não pode tocar essa dupla com outro círculo.
85. A dupla L2C8–L2C7 já está fechada; L3C8 não pode tocar essa dupla com outro círculo.
86. L7C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
87. Na linha 8, triângulo só cabe em L8C7 e L8C8; ambas as casas precisam dele.
88. Na linha 8, triângulo só cabe em L8C7 e L8C8; ambas as casas precisam dele.
89. A dupla L8C7–L8C8 já está fechada; L7C7 não pode tocar essa dupla com outro triângulo.
90. A dupla L8C8–L8C7 já está fechada; L7C8 não pode tocar essa dupla com outro triângulo.
91. Na linha 7, triângulo só cabe em L7C1 e L7C2; ambas as casas precisam dele.
92. Na linha 7, triângulo só cabe em L7C1 e L7C2; ambas as casas precisam dele.
93. A dupla L7C1–L7C2 já está fechada; L6C1 não pode tocar essa dupla com outro triângulo.
94. A dupla L7C2–L7C1 já está fechada; L6C2 não pode tocar essa dupla com outro triângulo.
95. Na linha 6, triângulo só cabe em L6C7 e L6C8; ambas as casas precisam dele.
96. Na linha 6, triângulo só cabe em L6C7 e L6C8; ambas as casas precisam dele.
97. Na coluna 1, triângulo só cabe em L5C1 e L7C1; ambas as casas precisam dele.
98. Na coluna 2, triângulo só cabe em L5C2 e L7C2; ambas as casas precisam dele.
99. coluna 7 já tem dois triângulo (L6C7, L8C7); exclua triângulo de L5C7.
100. coluna 8 já tem dois triângulo (L6C8, L8C8); exclua triângulo de L5C8.
101. Se L3C1 fosse quadrado, 10 deduções levariam a: linha 6: menos de duas posições possíveis de quadrado. Portanto, exclua quadrado.
   - Hipótese, passo 1: coluna 1 já tem dois quadrado (L3C1, L8C1); exclua quadrado de L4C1.
   - Hipótese, passo 2: coluna 1 já tem dois quadrado (L3C1, L8C1); exclua quadrado de L6C1.
   - Hipótese, passo 3: L3C1 precisa de um parceiro quadrado; só L3C2 pode recebê-lo (horizontal).
   - Hipótese, passo 4: A dupla L3C2–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro quadrado.
   - Hipótese, passo 5: A dupla L3C2–L3C1 já está fechada; L3C3 não pode tocar essa dupla com outro quadrado.
   - Hipótese, passo 6: L6C2 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
   - Hipótese, passo 7: Na linha 3, círculo só cabe em L3C3 e L3C5; ambas as casas precisam dele.
   - Hipótese, passo 8: Na linha 3, círculo só cabe em L3C3 e L3C5; ambas as casas precisam dele.
   - Hipótese, passo 9: linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C7.
   - Hipótese, passo 10: linha 3 já tem dois quadrado (L3C1, L3C2); exclua quadrado de L3C8.
   - Contradição final: linha 6: menos de duas posições possíveis de quadrado.
102. coluna 1 já tem dois círculo (L1C1, L3C1); exclua círculo de L4C1.
103. coluna 1 já tem dois círculo (L1C1, L3C1); exclua círculo de L6C1.
104. L3C1 precisa de um parceiro círculo; só L3C2 pode recebê-lo (horizontal).
105. A dupla L3C2–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
106. A dupla L3C2–L3C1 já está fechada; L3C3 não pode tocar essa dupla com outro círculo.
107. L6C2 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
108. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C5.
109. L3C5 precisa de um parceiro quadrado; só L4C5 pode recebê-lo (vertical).
110. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L6C5.
111. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L7C5.
112. L6C4 não pode ser círculo: tocaria L5C4 e L6C5, formando um grupo maior que dois.
113. A dupla L6C4–L6C3 já está fechada; L7C4 não pode tocar essa dupla com outro losango.
114. A dupla L6C5–L6C6 já está fechada; L7C5 não pode tocar essa dupla com outro círculo.
115. A dupla L6C6–L6C5 já está fechada; L7C6 não pode tocar essa dupla com outro círculo.
116. A dupla L7C5–L7C6 já está fechada; L8C5 não pode tocar essa dupla com outro losango.
117. A dupla L7C6–L7C5 já está fechada; L8C6 não pode tocar essa dupla com outro losango.
118. A dupla L7C6–L7C5 já está fechada; L7C7 não pode tocar essa dupla com outro losango.
119. L7C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
120. L8C4 não pode ser círculo: tocaria L7C4 e L8C5, formando um grupo maior que dois.
121. L8C4 precisa de um parceiro losango; só L8C3 pode recebê-lo (horizontal).
122. Na linha 6, quadrado só cabe em L6C1 e L6C2; ambas as casas precisam dele.
123. Na linha 6, quadrado só cabe em L6C1 e L6C2; ambas as casas precisam dele.
124. Na linha 7, quadrado só cabe em L7C7 e L7C8; ambas as casas precisam dele.
125. Na linha 7, quadrado só cabe em L7C7 e L7C8; ambas as casas precisam dele.
126. linha 7 já tem dois losango (L7C5, L7C6); exclua losango de L7C3.
127. coluna 1 já tem dois quadrado (L6C1, L8C1); exclua quadrado de L4C1.
128. coluna 2 já tem dois quadrado (L6C2, L8C2); exclua quadrado de L4C2.
129. coluna 3 já tem dois losango (L6C3, L8C3); exclua losango de L3C3.
130. coluna 3 já tem dois losango (L6C3, L8C3); exclua losango de L4C3.
131. L3C3 precisa de um parceiro quadrado; só L4C3 pode recebê-lo (vertical).
132. A dupla L4C3–L3C3 já está fechada; L5C3 não pode tocar essa dupla com outro quadrado.
133. linha 3 já tem dois quadrado (L3C3, L3C5); exclua quadrado de L3C7.
134. linha 3 já tem dois quadrado (L3C3, L3C5); exclua quadrado de L3C8.
135. Na linha 4, círculo só cabe em L4C7 e L4C8; ambas as casas precisam dele.
136. Na linha 4, círculo só cabe em L4C7 e L4C8; ambas as casas precisam dele.
137. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C7.
138. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C8.

## 54. Avançado — pacto-100

**Descoberta:** Compatibilidade entre vários pares.

**Técnicas combinadas:** cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; prevenção de trio; exclusão junto à dupla; posições restantes; hipótese refutada.

**Origem:** pacto-100; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 21; 130 eliminações explicadas. Refutações: 7 passos.

### Função das pistas

- L1C1: círculo — prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 15.
- L2C2: triângulo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C4: quadrado — exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 110.
- L2C7: círculo — parceiro obrigatório / orientação; prevenção de trio; prevenção de isolamento; cota saturada; primeira participação no passo 17.
- L2C8: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L3C2: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 5.
- L3C6: círculo — cota saturada; prevenção de trio; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 10.
- L3C8: quadrado — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; posições restantes; primeira participação no passo 5.
- L4C5: triângulo — exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 54.
- L4C7: losango — prevenção de isolamento; exclusão junto à dupla; cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 20.
- L5C7: quadrado — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 98.
- L6C2: círculo — parceiro obrigatório / orientação; primeira participação no passo 113.
- L6C3: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 106.
- L7C6: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 71.
- L8C6: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 10.

### Sequência lógica

1. linha 2 já tem dois triângulo (L2C2, L2C8); exclua triângulo de L2C1.
2. linha 2 já tem dois triângulo (L2C2, L2C8); exclua triângulo de L2C3.
3. linha 2 já tem dois triângulo (L2C2, L2C8); exclua triângulo de L2C5.
4. linha 2 já tem dois triângulo (L2C2, L2C8); exclua triângulo de L2C6.
5. linha 3 já tem dois quadrado (L3C2, L3C8); exclua quadrado de L3C1.
6. linha 3 já tem dois quadrado (L3C2, L3C8); exclua quadrado de L3C3.
7. linha 3 já tem dois quadrado (L3C2, L3C8); exclua quadrado de L3C4.
8. linha 3 já tem dois quadrado (L3C2, L3C8); exclua quadrado de L3C5.
9. linha 3 já tem dois quadrado (L3C2, L3C8); exclua quadrado de L3C7.
10. coluna 6 já tem dois círculo (L3C6, L8C6); exclua círculo de L1C6.
11. coluna 6 já tem dois círculo (L3C6, L8C6); exclua círculo de L2C6.
12. coluna 6 já tem dois círculo (L3C6, L8C6); exclua círculo de L4C6.
13. coluna 6 já tem dois círculo (L3C6, L8C6); exclua círculo de L5C6.
14. coluna 6 já tem dois círculo (L3C6, L8C6); exclua círculo de L6C6.
15. L2C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
16. L2C2 precisa de um parceiro triângulo; só L1C2 pode recebê-lo (vertical).
17. L2C8 precisa de um parceiro triângulo; só L1C8 pode recebê-lo (vertical).
18. L3C2 precisa de um parceiro quadrado; só L4C2 pode recebê-lo (vertical).
19. L3C7 não pode ser círculo: tocaria L2C7 e L3C6, formando um grupo maior que dois.
20. L3C7 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
21. L3C8 precisa de um parceiro quadrado; só L4C8 pode recebê-lo (vertical).
22. A dupla L4C2–L3C2 já está fechada; L5C2 não pode tocar essa dupla com outro quadrado.
23. A dupla L4C2–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro quadrado.
24. A dupla L4C2–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro quadrado.
25. A dupla L4C7–L3C7 já está fechada; L4C6 não pode tocar essa dupla com outro losango.
26. A dupla L4C8–L3C8 já está fechada; L5C8 não pode tocar essa dupla com outro quadrado.
27. linha 1 já tem dois triângulo (L1C2, L1C8); exclua triângulo de L1C3.
28. linha 1 já tem dois triângulo (L1C2, L1C8); exclua triângulo de L1C4.
29. linha 1 já tem dois triângulo (L1C2, L1C8); exclua triângulo de L1C5.
30. linha 1 já tem dois triângulo (L1C2, L1C8); exclua triângulo de L1C6.
31. linha 1 já tem dois triângulo (L1C2, L1C8); exclua triângulo de L1C7.
32. linha 4 já tem dois quadrado (L4C2, L4C8); exclua quadrado de L4C4.
33. linha 4 já tem dois quadrado (L4C2, L4C8); exclua quadrado de L4C6.
34. coluna 2 já tem dois triângulo (L1C2, L2C2); exclua triângulo de L5C2.
35. coluna 2 já tem dois triângulo (L1C2, L2C2); exclua triângulo de L7C2.
36. coluna 2 já tem dois triângulo (L1C2, L2C2); exclua triângulo de L8C2.
37. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L7C2.
38. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L8C2.
39. coluna 7 já tem dois losango (L3C7, L4C7); exclua losango de L1C7.
40. coluna 7 já tem dois losango (L3C7, L4C7); exclua losango de L6C7.
41. coluna 7 já tem dois losango (L3C7, L4C7); exclua losango de L7C7.
42. coluna 7 já tem dois losango (L3C7, L4C7); exclua losango de L8C7.
43. coluna 8 já tem dois triângulo (L1C8, L2C8); exclua triângulo de L5C8.
44. coluna 8 já tem dois triângulo (L1C8, L2C8); exclua triângulo de L6C8.
45. coluna 8 já tem dois triângulo (L1C8, L2C8); exclua triângulo de L7C8.
46. coluna 8 já tem dois triângulo (L1C8, L2C8); exclua triângulo de L8C8.
47. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L6C8.
48. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L7C8.
49. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L8C8.
50. L1C1 precisa de um parceiro círculo; só L2C1 pode recebê-lo (vertical).
51. A dupla L2C1–L1C1 já está fechada; L3C1 não pode tocar essa dupla com outro círculo.
52. L2C7 precisa de um parceiro círculo; só L1C7 pode recebê-lo (vertical).
53. L3C6 precisa de um parceiro círculo; só L3C5 pode recebê-lo (horizontal).
54. A dupla L4C5–L4C6 já está fechada; L5C5 não pode tocar essa dupla com outro triângulo.
55. A dupla L4C5–L4C6 já está fechada; L4C4 não pode tocar essa dupla com outro triângulo.
56. A dupla L4C6–L4C5 já está fechada; L5C6 não pode tocar essa dupla com outro triângulo.
57. linha 1 já tem dois círculo (L1C1, L1C7); exclua círculo de L1C3.
58. linha 1 já tem dois círculo (L1C1, L1C7); exclua círculo de L1C4.
59. linha 1 já tem dois círculo (L1C1, L1C7); exclua círculo de L1C5.
60. linha 2 já tem dois círculo (L2C1, L2C7); exclua círculo de L2C3.
61. linha 2 já tem dois círculo (L2C1, L2C7); exclua círculo de L2C5.
62. linha 3 já tem dois círculo (L3C5, L3C6); exclua círculo de L3C3.
63. linha 3 já tem dois círculo (L3C5, L3C6); exclua círculo de L3C4.
64. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C1.
65. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C3.
66. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L4C1.
67. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L5C1.
68. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L6C1.
69. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L7C1.
70. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L8C1.
71. Na coluna 6, triângulo só cabe em L4C6 e L6C6; ambas as casas precisam dele.
72. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L6C7.
73. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L7C7.
74. coluna 7 já tem dois círculo (L1C7, L2C7); exclua círculo de L8C7.
75. L3C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
76. A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro losango.
77. L8C6 precisa de um parceiro círculo; só L8C5 pode recebê-lo (horizontal).
78. Na linha 3, triângulo só cabe em L3C3 e L3C4; ambas as casas precisam dele.
79. Na linha 3, triângulo só cabe em L3C3 e L3C4; ambas as casas precisam dele.
80. Na linha 4, círculo só cabe em L4C3 e L4C4; ambas as casas precisam dele.
81. Na linha 4, círculo só cabe em L4C3 e L4C4; ambas as casas precisam dele.
82. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C2.
83. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C3.
84. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C4.
85. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C8.
86. linha 8 já tem dois losango (L8C2, L8C8); exclua losango de L8C1.
87. linha 8 já tem dois losango (L8C2, L8C8); exclua losango de L8C3.
88. linha 8 já tem dois losango (L8C2, L8C8); exclua losango de L8C4.
89. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L6C1.
90. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L7C1.
91. coluna 5 já tem dois círculo (L3C5, L8C5); exclua círculo de L5C5.
92. coluna 5 já tem dois círculo (L3C5, L8C5); exclua círculo de L6C5.
93. coluna 5 já tem dois círculo (L3C5, L8C5); exclua círculo de L7C5.
94. A dupla L4C3–L4C4 já está fechada; L5C3 não pode tocar essa dupla com outro círculo.
95. A dupla L4C4–L4C3 já está fechada; L5C4 não pode tocar essa dupla com outro círculo.
96. L8C2 precisa de um parceiro losango; só L7C2 pode recebê-lo (vertical).
97. L8C8 precisa de um parceiro losango; só L7C8 pode recebê-lo (vertical).
98. Na linha 5, círculo só cabe em L5C2 e L5C8; ambas as casas precisam dele.
99. Na linha 5, círculo só cabe em L5C2 e L5C8; ambas as casas precisam dele.
100. Na linha 7, círculo só cabe em L7C3 e L7C4; ambas as casas precisam dele.
101. Na linha 7, círculo só cabe em L7C3 e L7C4; ambas as casas precisam dele.
102. linha 7 já tem dois losango (L7C2, L7C8); exclua losango de L7C5.
103. coluna 4 já tem dois círculo (L4C4, L7C4); exclua círculo de L6C4.
104. Na coluna 8, círculo só cabe em L5C8 e L6C8; ambas as casas precisam dele.
105. Se L1C3 fosse quadrado, 7 deduções levariam a: L2C3 fica sem símbolo possível. L2C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua quadrado.
   - Hipótese, passo 1: L1C4 não pode ser quadrado: tocaria L2C4 e L1C3, formando um grupo maior que dois.
   - Hipótese, passo 2: L1C4 precisa de um parceiro losango; só L1C5 pode recebê-lo (horizontal).
   - Hipótese, passo 3: A dupla L1C5–L1C4 já está fechada; L2C5 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 4: A dupla L1C5–L1C4 já está fechada; L1C6 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 5: L1C6 precisa de um parceiro quadrado; só L2C6 pode recebê-lo (vertical).
   - Hipótese, passo 6: L2C3 não pode ser quadrado: tocaria L1C3 e L2C4, formando um grupo maior que dois.
   - Hipótese, passo 7: L2C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L2C3 fica sem símbolo possível. L2C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
106. coluna 3 já tem dois losango (L1C3, L6C3); exclua losango de L2C3.
107. coluna 3 já tem dois losango (L1C3, L6C3); exclua losango de L5C3.
108. L1C3 precisa de um parceiro losango; só L1C4 pode recebê-lo (horizontal).
109. A dupla L1C4–L1C3 já está fechada; L1C5 não pode tocar essa dupla com outro losango.
110. A dupla L2C4–L2C3 já está fechada; L2C5 não pode tocar essa dupla com outro quadrado.
111. L2C5 precisa de um parceiro losango; só L2C6 pode recebê-lo (horizontal).
112. A dupla L2C6–L2C5 já está fechada; L1C6 não pode tocar essa dupla com outro losango.
113. L6C3 precisa de um parceiro losango; só L6C4 pode recebê-lo (horizontal).
114. A dupla L6C4–L6C3 já está fechada; L5C4 não pode tocar essa dupla com outro losango.
115. A dupla L6C4–L6C3 já está fechada; L6C5 não pode tocar essa dupla com outro losango.
116. Na linha 5, losango só cabe em L5C5 e L5C6; ambas as casas precisam dele.
117. Na linha 5, losango só cabe em L5C5 e L5C6; ambas as casas precisam dele.
118. L5C7 precisa de um parceiro quadrado; só L6C7 pode recebê-lo (vertical).
119. L6C6 precisa de um parceiro triângulo; só L6C5 pode recebê-lo (horizontal).
120. A dupla L6C7–L5C7 já está fechada; L7C7 não pode tocar essa dupla com outro quadrado.
121. L7C6 precisa de um parceiro quadrado; só L7C5 pode recebê-lo (horizontal).
122. L7C7 precisa de um parceiro triângulo; só L8C7 pode recebê-lo (vertical).
123. linha 6 já tem dois triângulo (L6C5, L6C6); exclua triângulo de L6C1.
124. Na linha 7, triângulo só cabe em L7C1 e L7C7; ambas as casas precisam dele.
125. L5C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
126. L7C1 precisa de um parceiro triângulo; só L8C1 pode recebê-lo (vertical).
127. Na linha 5, triângulo só cabe em L5C3 e L5C4; ambas as casas precisam dele.
128. Na linha 5, triângulo só cabe em L5C3 e L5C4; ambas as casas precisam dele.
129. linha 8 já tem dois triângulo (L8C1, L8C7); exclua triângulo de L8C3.
130. linha 8 já tem dois triângulo (L8C1, L8C7); exclua triângulo de L8C4.

## 55. Avançado — pacto-v2-104

**Descoberta:** Conjunto de candidatas e capacidade da faixa.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; prevenção de isolamento; hipótese refutada; restrição coletiva de candidatas.

**Origem:** pacto-144; recomposição de pistas; 4 pistas alteradas. **Pistas:** 17; 47 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 22; 132 eliminações explicadas. Refutações: 10, 5 passos.

### Função das pistas

- L1C2: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L1C8: quadrado — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L2C4: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 15.
- L2C5: losango — parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 36.
- L2C8: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 28.
- L3C1: círculo — restrição coletiva de candidatas; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 82.
- L3C6: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 25.
- L4C6: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 25.
- L4C7: círculo — exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 92.
- L5C6: triângulo — cota saturada; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 21.
- L6C3: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 7.
- L6C4: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L6C6: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 11.
- L6C8: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 11.
- L7C2: triângulo — posições restantes; parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; exclusão junto à dupla; primeira participação no passo 106.
- L7C8: losango — parceiro obrigatório / orientação; posições restantes; cota saturada; primeira participação no passo 45.
- L8C3: quadrado — prevenção de isolamento; posições restantes; exclusão junto à dupla; primeira participação no passo 115.

### Sequência lógica

1. linha 1 já tem dois quadrado (L1C2, L1C8); exclua quadrado de L1C1.
2. linha 1 já tem dois quadrado (L1C2, L1C8); exclua quadrado de L1C3.
3. linha 1 já tem dois quadrado (L1C2, L1C8); exclua quadrado de L1C4.
4. linha 1 já tem dois quadrado (L1C2, L1C8); exclua quadrado de L1C5.
5. linha 1 já tem dois quadrado (L1C2, L1C8); exclua quadrado de L1C6.
6. linha 1 já tem dois quadrado (L1C2, L1C8); exclua quadrado de L1C7.
7. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C1.
8. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C2.
9. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C5.
10. linha 6 já tem dois círculo (L6C3, L6C4); exclua círculo de L6C7.
11. linha 6 já tem dois triângulo (L6C6, L6C8); exclua triângulo de L6C1.
12. linha 6 já tem dois triângulo (L6C6, L6C8); exclua triângulo de L6C2.
13. linha 6 já tem dois triângulo (L6C6, L6C8); exclua triângulo de L6C5.
14. linha 6 já tem dois triângulo (L6C6, L6C8); exclua triângulo de L6C7.
15. coluna 4 já tem dois círculo (L2C4, L6C4); exclua círculo de L1C4.
16. coluna 4 já tem dois círculo (L2C4, L6C4); exclua círculo de L3C4.
17. coluna 4 já tem dois círculo (L2C4, L6C4); exclua círculo de L4C4.
18. coluna 4 já tem dois círculo (L2C4, L6C4); exclua círculo de L5C4.
19. coluna 4 já tem dois círculo (L2C4, L6C4); exclua círculo de L7C4.
20. coluna 4 já tem dois círculo (L2C4, L6C4); exclua círculo de L8C4.
21. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L1C6.
22. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L2C6.
23. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L7C6.
24. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L8C6.
25. coluna 6 já tem dois quadrado (L3C6, L4C6); exclua quadrado de L2C6.
26. coluna 6 já tem dois quadrado (L3C6, L4C6); exclua quadrado de L7C6.
27. coluna 6 já tem dois quadrado (L3C6, L4C6); exclua quadrado de L8C6.
28. coluna 8 já tem dois quadrado (L1C8, L2C8); exclua quadrado de L3C8.
29. coluna 8 já tem dois quadrado (L1C8, L2C8); exclua quadrado de L4C8.
30. coluna 8 já tem dois quadrado (L1C8, L2C8); exclua quadrado de L5C8.
31. coluna 8 já tem dois quadrado (L1C8, L2C8); exclua quadrado de L8C8.
32. L1C2 precisa de um parceiro quadrado; só L2C2 pode recebê-lo (vertical).
33. A dupla L2C2–L1C2 já está fechada; L3C2 não pode tocar essa dupla com outro quadrado.
34. A dupla L2C2–L1C2 já está fechada; L2C1 não pode tocar essa dupla com outro quadrado.
35. A dupla L2C2–L1C2 já está fechada; L2C3 não pode tocar essa dupla com outro quadrado.
36. L2C4 precisa de um parceiro círculo; só L2C3 pode recebê-lo (horizontal).
37. A dupla L2C8–L1C8 já está fechada; L2C7 não pode tocar essa dupla com outro quadrado.
38. A dupla L3C6–L4C6 já está fechada; L3C5 não pode tocar essa dupla com outro quadrado.
39. A dupla L3C6–L4C6 já está fechada; L3C7 não pode tocar essa dupla com outro quadrado.
40. A dupla L4C6–L3C6 já está fechada; L4C5 não pode tocar essa dupla com outro quadrado.
41. A dupla L5C6–L6C6 já está fechada; L5C5 não pode tocar essa dupla com outro triângulo.
42. A dupla L5C6–L6C6 já está fechada; L5C7 não pode tocar essa dupla com outro triângulo.
43. A dupla L6C3–L6C4 já está fechada; L5C3 não pode tocar essa dupla com outro círculo.
44. A dupla L6C3–L6C4 já está fechada; L7C3 não pode tocar essa dupla com outro círculo.
45. L6C8 precisa de um parceiro triângulo; só L5C8 pode recebê-lo (vertical).
46. linha 2 já tem dois círculo (L2C3, L2C4); exclua círculo de L2C1.
47. linha 2 já tem dois círculo (L2C3, L2C4); exclua círculo de L2C6.
48. linha 2 já tem dois círculo (L2C3, L2C4); exclua círculo de L2C7.
49. Na linha 2, triângulo só cabe em L2C1 e L2C7; ambas as casas precisam dele.
50. Na linha 2, triângulo só cabe em L2C1 e L2C7; ambas as casas precisam dele.
51. linha 5 já tem dois triângulo (L5C6, L5C8); exclua triângulo de L5C1.
52. linha 5 já tem dois triângulo (L5C6, L5C8); exclua triângulo de L5C2.
53. linha 5 já tem dois triângulo (L5C6, L5C8); exclua triângulo de L5C3.
54. linha 5 já tem dois triângulo (L5C6, L5C8); exclua triângulo de L5C4.
55. coluna 2 já tem dois quadrado (L1C2, L2C2); exclua quadrado de L4C2.
56. coluna 2 já tem dois quadrado (L1C2, L2C2); exclua quadrado de L5C2.
57. coluna 2 já tem dois quadrado (L1C2, L2C2); exclua quadrado de L6C2.
58. coluna 2 já tem dois quadrado (L1C2, L2C2); exclua quadrado de L8C2.
59. coluna 3 já tem dois círculo (L2C3, L6C3); exclua círculo de L1C3.
60. coluna 3 já tem dois círculo (L2C3, L6C3); exclua círculo de L3C3.
61. coluna 3 já tem dois círculo (L2C3, L6C3); exclua círculo de L4C3.
62. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L3C8.
63. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L4C8.
64. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L8C8.
65. L1C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
66. L1C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
67. A dupla L2C5–L2C6 já está fechada; L1C5 não pode tocar essa dupla com outro losango.
68. A dupla L2C5–L2C6 já está fechada; L3C5 não pode tocar essa dupla com outro losango.
69. A dupla L2C6–L2C5 já está fechada; L1C6 não pode tocar essa dupla com outro losango.
70. coluna 1 já tem dois triângulo (L1C1, L2C1); exclua triângulo de L4C1.
71. coluna 1 já tem dois triângulo (L1C1, L2C1); exclua triângulo de L7C1.
72. coluna 1 já tem dois triângulo (L1C1, L2C1); exclua triângulo de L8C1.
73. L1C7 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
74. Na linha 1, losango só cabe em L1C3 e L1C4; ambas as casas precisam dele.
75. Na linha 1, losango só cabe em L1C3 e L1C4; ambas as casas precisam dele.
76. L1C5 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
77. A dupla L1C6–L1C5 já está fechada; L1C7 não pode tocar essa dupla com outro círculo.
78. A dupla L2C7–L1C7 já está fechada; L3C7 não pode tocar essa dupla com outro triângulo.
79. coluna 7 já tem dois triângulo (L1C7, L2C7); exclua triângulo de L7C7.
80. coluna 7 já tem dois triângulo (L1C7, L2C7); exclua triângulo de L8C7.
81. Se L3C2 fosse triângulo, 10 deduções levariam a: L5C2 fica sem símbolo possível. L5C2 não pode ser losango: tocaria L4C2 e L6C2, formando um grupo maior que dois. Portanto, exclua triângulo.
   - Hipótese, passo 1: coluna 2 já tem dois triângulo (L3C2, L7C2); exclua triângulo de L4C2.
   - Hipótese, passo 2: coluna 2 já tem dois triângulo (L3C2, L7C2); exclua triângulo de L8C2.
   - Hipótese, passo 3: L3C1 precisa de um parceiro círculo; só L4C1 pode recebê-lo (vertical).
   - Hipótese, passo 4: L3C2 precisa de um parceiro triângulo; só L3C3 pode recebê-lo (horizontal).
   - Hipótese, passo 5: A dupla L3C3–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 6: A dupla L3C3–L3C2 já está fechada; L3C4 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 7: A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro círculo.
   - Hipótese, passo 8: A dupla L4C1–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
   - Hipótese, passo 9: L5C2 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
   - Hipótese, passo 10: L5C2 não pode ser losango: tocaria L4C2 e L6C2, formando um grupo maior que dois.
   - Contradição final: L5C2 fica sem símbolo possível. L5C2 não pode ser losango: tocaria L4C2 e L6C2, formando um grupo maior que dois.
82. Na linha 3, as 4 ocorrências de triângulo e quadrado só cabem em L3C3, L3C4, L3C5, L3C6; essas casas ficam reservadas ao conjunto.
83. Na linha 3, as 4 ocorrências de triângulo e quadrado só cabem em L3C3, L3C4, L3C5, L3C6; essas casas ficam reservadas ao conjunto.
84. Na linha 3, as 4 ocorrências de triângulo e quadrado só cabem em L3C3, L3C4, L3C5, L3C6; essas casas ficam reservadas ao conjunto.
85. Se L3C2 fosse losango, 5 deduções levariam a: L3C2 fica sem símbolo possível. L3C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua losango.
   - Hipótese, passo 1: coluna 2 já tem dois losango (L3C2, L6C2); exclua losango de L4C2.
   - Hipótese, passo 2: coluna 2 já tem dois losango (L3C2, L6C2); exclua losango de L5C2.
   - Hipótese, passo 3: coluna 2 já tem dois losango (L3C2, L6C2); exclua losango de L8C2.
   - Hipótese, passo 4: L3C1 precisa de um parceiro círculo; só L4C1 pode recebê-lo (vertical).
   - Hipótese, passo 5: L3C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L3C2 fica sem símbolo possível. L3C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
86. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C7.
87. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C8.
88. Na coluna 8, círculo só cabe em L4C8 e L8C8; ambas as casas precisam dele.
89. Na coluna 8, círculo só cabe em L4C8 e L8C8; ambas as casas precisam dele.
90. A dupla L3C1–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro círculo.
91. A dupla L3C2–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
92. A dupla L4C7–L4C8 já está fechada; L5C7 não pode tocar essa dupla com outro círculo.
93. L7C8 precisa de um parceiro losango; só L7C7 pode recebê-lo (horizontal).
94. L8C7 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
95. L8C8 precisa de um parceiro círculo; só L8C7 pode recebê-lo (horizontal).
96. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C5.
97. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C1.
98. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C3.
99. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C4.
100. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C5.
101. linha 7 já tem dois losango (L7C7, L7C8); exclua losango de L7C6.
102. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C1.
103. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C2.
104. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C5.
105. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C6.
106. Na coluna 2, círculo só cabe em L3C2 e L5C2; ambas as casas precisam dele.
107. Na coluna 7, quadrado só cabe em L5C7 e L6C7; ambas as casas precisam dele.
108. Na coluna 7, quadrado só cabe em L5C7 e L6C7; ambas as casas precisam dele.
109. L5C2 precisa de um parceiro círculo; só L5C1 pode recebê-lo (horizontal).
110. L5C5 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
111. L6C2 precisa de um parceiro losango; só L6C1 pode recebê-lo (horizontal).
112. L7C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
113. L7C1 precisa de um parceiro quadrado; só L8C1 pode recebê-lo (vertical).
114. L7C6 precisa de um parceiro círculo; só L7C5 pode recebê-lo (horizontal).
115. L8C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
116. L8C6 precisa de um parceiro losango; só L8C5 pode recebê-lo (horizontal).
117. Na linha 6, quadrado só cabe em L6C5 e L6C7; ambas as casas precisam dele.
118. Na linha 8, triângulo só cabe em L8C2 e L8C4; ambas as casas precisam dele.
119. coluna 1 já tem dois quadrado (L7C1, L8C1); exclua quadrado de L4C1.
120. coluna 2 já tem dois triângulo (L7C2, L8C2); exclua triângulo de L4C2.
121. Na coluna 5, triângulo só cabe em L3C5 e L4C5; ambas as casas precisam dele.
122. Na coluna 5, quadrado só cabe em L5C5 e L6C5; ambas as casas precisam dele.
123. A dupla L3C5–L4C5 já está fechada; L3C4 não pode tocar essa dupla com outro triângulo.
124. A dupla L4C2–L4C1 já está fechada; L4C3 não pode tocar essa dupla com outro losango.
125. A dupla L4C5–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro triângulo.
126. A dupla L5C5–L6C5 já está fechada; L5C4 não pode tocar essa dupla com outro quadrado.
127. A dupla L7C2–L8C2 já está fechada; L7C3 não pode tocar essa dupla com outro triângulo.
128. A dupla L7C3–L8C3 já está fechada; L7C4 não pode tocar essa dupla com outro quadrado.
129. Na linha 3, triângulo só cabe em L3C3 e L3C5; ambas as casas precisam dele.
130. Na linha 4, triângulo só cabe em L4C3 e L4C5; ambas as casas precisam dele.
131. Na linha 4, quadrado só cabe em L4C4 e L4C6; ambas as casas precisam dele.
132. linha 5 já tem dois quadrado (L5C5, L5C7); exclua quadrado de L5C3.

## 56. Avançado — pacto-118

**Descoberta:** Hipótese curta termina em contradição.

**Técnicas combinadas:** cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de trio; hipótese refutada; posições restantes.

**Origem:** pacto-118; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 22; 128 eliminações explicadas. Refutações: 3, 6 passos.

### Função das pistas

- L1C1: círculo — prevenção de isolamento; posições restantes; cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 62.
- L1C7: losango — cota saturada; prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 22.
- L2C3: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L2C5: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L2C7: círculo — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 75.
- L3C1: triângulo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 28.
- L3C2: quadrado — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 6.
- L3C5: losango — parceiro obrigatório / orientação; prevenção de trio; exclusão junto à dupla; cota saturada; primeira participação no passo 27.
- L3C8: quadrado — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 6.
- L4C4: losango — cota saturada; prevenção de trio; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 16.
- L5C2: losango — prevenção de trio; prevenção de isolamento; parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 32.
- L6C3: losango — cota saturada; prevenção de trio; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 10.
- L6C4: losango — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 10.
- L7C7: losango — cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 22.
- L8C3: quadrado — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 79.

### Sequência lógica

1. linha 2 já tem dois triângulo (L2C3, L2C5); exclua triângulo de L2C1.
2. linha 2 já tem dois triângulo (L2C3, L2C5); exclua triângulo de L2C2.
3. linha 2 já tem dois triângulo (L2C3, L2C5); exclua triângulo de L2C4.
4. linha 2 já tem dois triângulo (L2C3, L2C5); exclua triângulo de L2C6.
5. linha 2 já tem dois triângulo (L2C3, L2C5); exclua triângulo de L2C8.
6. linha 3 já tem dois quadrado (L3C2, L3C8); exclua quadrado de L3C3.
7. linha 3 já tem dois quadrado (L3C2, L3C8); exclua quadrado de L3C4.
8. linha 3 já tem dois quadrado (L3C2, L3C8); exclua quadrado de L3C6.
9. linha 3 já tem dois quadrado (L3C2, L3C8); exclua quadrado de L3C7.
10. linha 6 já tem dois losango (L6C3, L6C4); exclua losango de L6C1.
11. linha 6 já tem dois losango (L6C3, L6C4); exclua losango de L6C2.
12. linha 6 já tem dois losango (L6C3, L6C4); exclua losango de L6C5.
13. linha 6 já tem dois losango (L6C3, L6C4); exclua losango de L6C6.
14. linha 6 já tem dois losango (L6C3, L6C4); exclua losango de L6C7.
15. linha 6 já tem dois losango (L6C3, L6C4); exclua losango de L6C8.
16. coluna 4 já tem dois losango (L4C4, L6C4); exclua losango de L1C4.
17. coluna 4 já tem dois losango (L4C4, L6C4); exclua losango de L2C4.
18. coluna 4 já tem dois losango (L4C4, L6C4); exclua losango de L3C4.
19. coluna 4 já tem dois losango (L4C4, L6C4); exclua losango de L5C4.
20. coluna 4 já tem dois losango (L4C4, L6C4); exclua losango de L7C4.
21. coluna 4 já tem dois losango (L4C4, L6C4); exclua losango de L8C4.
22. coluna 7 já tem dois losango (L1C7, L7C7); exclua losango de L3C7.
23. coluna 7 já tem dois losango (L1C7, L7C7); exclua losango de L4C7.
24. coluna 7 já tem dois losango (L1C7, L7C7); exclua losango de L5C7.
25. coluna 7 já tem dois losango (L1C7, L7C7); exclua losango de L8C7.
26. L1C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
27. L2C5 precisa de um parceiro triângulo; só L1C5 pode recebê-lo (vertical).
28. L3C1 precisa de um parceiro triângulo; só L4C1 pode recebê-lo (vertical).
29. A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro triângulo.
30. A dupla L4C1–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro triângulo.
31. L4C5 não pode ser losango: tocaria L3C5 e L4C4, formando um grupo maior que dois.
32. L5C3 não pode ser losango: tocaria L6C3 e L5C2, formando um grupo maior que dois.
33. A dupla L6C3–L6C4 já está fechada; L7C3 não pode tocar essa dupla com outro losango.
34. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L6C1.
35. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L7C1.
36. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L8C1.
37. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L4C5.
38. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L5C5.
39. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L6C5.
40. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L7C5.
41. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L8C5.
42. A dupla L1C5–L2C5 já está fechada; L1C4 não pode tocar essa dupla com outro triângulo.
43. A dupla L1C5–L2C5 já está fechada; L1C6 não pode tocar essa dupla com outro triângulo.
44. L3C5 precisa de um parceiro losango; só L3C6 pode recebê-lo (horizontal).
45. A dupla L3C6–L3C5 já está fechada; L2C6 não pode tocar essa dupla com outro losango.
46. A dupla L3C6–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro losango.
47. L4C4 precisa de um parceiro losango; só L4C3 pode recebê-lo (horizontal).
48. linha 3 já tem dois losango (L3C5, L3C6); exclua losango de L3C3.
49. linha 4 já tem dois losango (L4C3, L4C4); exclua losango de L4C2.
50. linha 4 já tem dois losango (L4C3, L4C4); exclua losango de L4C8.
51. coluna 3 já tem dois losango (L4C3, L6C3); exclua losango de L1C3.
52. L4C2 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
53. L5C2 precisa de um parceiro losango; só L5C1 pode recebê-lo (horizontal).
54. L5C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
55. linha 5 já tem dois losango (L5C1, L5C2); exclua losango de L5C5.
56. linha 5 já tem dois losango (L5C1, L5C2); exclua losango de L5C6.
57. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L1C2.
58. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L2C2.
59. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L6C2.
60. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L7C2.
61. coluna 2 já tem dois quadrado (L3C2, L4C2); exclua quadrado de L8C2.
62. L2C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
63. Se L1C2 fosse triângulo, 3 deduções levariam a: L1C2 fica sem símbolo possível. L1C2 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua triângulo.
   - Hipótese, passo 1: linha 1 já tem dois triângulo (L1C2, L1C5); exclua triângulo de L1C3.
   - Hipótese, passo 2: L1C1 precisa de um parceiro círculo; só L2C1 pode recebê-lo (vertical).
   - Hipótese, passo 3: L1C2 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C2 fica sem símbolo possível. L1C2 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
64. Na linha 1, triângulo só cabe em L1C3 e L1C5; ambas as casas precisam dele.
65. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L3C3.
66. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L5C3.
67. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L7C3.
68. L3C3 precisa de um parceiro círculo; só L3C4 pode recebê-lo (horizontal).
69. A dupla L3C4–L3C3 já está fechada; L2C4 não pode tocar essa dupla com outro círculo.
70. L5C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
71. linha 3 já tem dois círculo (L3C3, L3C4); exclua círculo de L3C7.
72. Na coluna 4, triângulo só cabe em L7C4 e L8C4; ambas as casas precisam dele.
73. Na coluna 4, triângulo só cabe em L7C4 e L8C4; ambas as casas precisam dele.
74. L1C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
75. L3C7 precisa de um parceiro triângulo; só L4C7 pode recebê-lo (vertical).
76. A dupla L4C7–L3C7 já está fechada; L5C7 não pode tocar essa dupla com outro triângulo.
77. A dupla L4C7–L3C7 já está fechada; L4C6 não pode tocar essa dupla com outro triângulo.
78. A dupla L4C7–L3C7 já está fechada; L4C8 não pode tocar essa dupla com outro triângulo.
79. L8C3 precisa de um parceiro quadrado; só L7C3 pode recebê-lo (vertical).
80. Na linha 5, triângulo só cabe em L5C6 e L5C8; ambas as casas precisam dele.
81. Na linha 5, triângulo só cabe em L5C6 e L5C8; ambas as casas precisam dele.
82. Na coluna 3, círculo só cabe em L3C3 e L5C3; ambas as casas precisam dele.
83. Na coluna 4, círculo só cabe em L3C4 e L5C4; ambas as casas precisam dele.
84. coluna 7 já tem dois triângulo (L3C7, L4C7); exclua triângulo de L6C7.
85. coluna 7 já tem dois triângulo (L3C7, L4C7); exclua triângulo de L8C7.
86. L4C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
87. A dupla L5C4–L5C3 já está fechada; L5C5 não pode tocar essa dupla com outro círculo.
88. L5C6 precisa de um parceiro triângulo; só L6C6 pode recebê-lo (vertical).
89. L5C8 precisa de um parceiro triângulo; só L6C8 pode recebê-lo (vertical).
90. A dupla L6C6–L5C6 já está fechada; L7C6 não pode tocar essa dupla com outro triângulo.
91. A dupla L6C8–L5C8 já está fechada; L7C8 não pode tocar essa dupla com outro triângulo.
92. L8C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
93. L8C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
94. Na linha 4, círculo só cabe em L4C5 e L4C6; ambas as casas precisam dele.
95. Na linha 4, círculo só cabe em L4C5 e L4C6; ambas as casas precisam dele.
96. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C7.
97. linha 6 já tem dois triângulo (L6C6, L6C8); exclua triângulo de L6C2.
98. Na linha 7, triângulo só cabe em L7C2 e L7C4; ambas as casas precisam dele.
99. Na linha 8, triângulo só cabe em L8C2 e L8C4; ambas as casas precisam dele.
100. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L1C8.
101. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L2C8.
102. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L7C8.
103. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L8C8.
104. L5C5 precisa de um parceiro quadrado; só L6C5 pode recebê-lo (vertical).
105. L5C7 precisa de um parceiro quadrado; só L6C7 pode recebê-lo (vertical).
106. L6C2 precisa de um parceiro círculo; só L6C1 pode recebê-lo (horizontal).
107. A dupla L6C5–L5C5 já está fechada; L7C5 não pode tocar essa dupla com outro quadrado.
108. Na linha 1, quadrado só cabe em L1C4 e L1C6; ambas as casas precisam dele.
109. Na linha 2, quadrado só cabe em L2C4 e L2C6; ambas as casas precisam dele.
110. coluna 1 já tem dois círculo (L1C1, L6C1); exclua círculo de L2C1.
111. coluna 1 já tem dois círculo (L1C1, L6C1); exclua círculo de L7C1.
112. coluna 1 já tem dois círculo (L1C1, L6C1); exclua círculo de L8C1.
113. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
114. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
115. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L8C5.
116. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L7C6.
117. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L8C6.
118. Na coluna 7, círculo só cabe em L2C7 e L8C7; ambas as casas precisam dele.
119. L1C1 precisa de um parceiro círculo; só L1C2 pode recebê-lo (horizontal).
120. A dupla L1C2–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro círculo.
121. L1C7 precisa de um parceiro losango; só L1C8 pode recebê-lo (horizontal).
122. A dupla L1C8–L1C7 já está fechada; L2C8 não pode tocar essa dupla com outro losango.
123. Se L7C5 fosse losango, 6 deduções levariam a: L7C5 fica sem símbolo possível. L7C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua losango.
   - Hipótese, passo 1: Na linha 7, círculo só cabe em L7C6 e L7C8; ambas as casas precisam dele.
   - Hipótese, passo 2: Na linha 7, círculo só cabe em L7C6 e L7C8; ambas as casas precisam dele.
   - Hipótese, passo 3: Na coluna 5, círculo só cabe em L4C5 e L8C5; ambas as casas precisam dele.
   - Hipótese, passo 4: coluna 6 já tem dois círculo (L4C6, L7C6); exclua círculo de L8C6.
   - Hipótese, passo 5: coluna 8 já tem dois círculo (L2C8, L7C8); exclua círculo de L8C8.
   - Hipótese, passo 6: L7C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L7C5 fica sem símbolo possível. L7C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
124. coluna 5 já tem dois círculo (L4C5, L7C5); exclua círculo de L8C5.
125. L7C5 precisa de um parceiro círculo; só L7C6 pode recebê-lo (horizontal).
126. A dupla L7C6–L7C5 já está fechada; L8C6 não pode tocar essa dupla com outro círculo.
127. L7C7 precisa de um parceiro losango; só L7C8 pode recebê-lo (horizontal).
128. A dupla L7C8–L7C7 já está fechada; L8C8 não pode tocar essa dupla com outro losango.

## 57. Avançado — pacto-127

**Descoberta:** Compatibilidade entre vários pares.

**Técnicas combinadas:** cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; prevenção de trio; hipótese refutada.

**Origem:** pacto-127; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 22; 124 eliminações explicadas. Refutações: 6 passos.

### Função das pistas

- L1C1: quadrado — prevenção de isolamento; posições restantes; cota saturada; primeira participação no passo 20.
- L1C5: triângulo — posições restantes; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 81.
- L2C2: círculo — prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 20.
- L2C3: losango — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 48.
- L3C1: losango — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L3C5: losango — cota saturada; prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 1.
- L4C3: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 11.
- L4C4: círculo — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 22.
- L5C4: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L5C5: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 16.
- L5C6: triângulo — parceiro obrigatório / orientação; prevenção de isolamento; primeira participação no passo 51.
- L5C8: losango — cota saturada; primeira participação no passo 7.
- L6C3: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 11.
- L6C5: círculo — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 16.
- L8C7: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 64.

### Sequência lógica

1. linha 3 já tem dois losango (L3C1, L3C5); exclua losango de L3C2.
2. linha 3 já tem dois losango (L3C1, L3C5); exclua losango de L3C3.
3. linha 3 já tem dois losango (L3C1, L3C5); exclua losango de L3C4.
4. linha 3 já tem dois losango (L3C1, L3C5); exclua losango de L3C6.
5. linha 3 já tem dois losango (L3C1, L3C5); exclua losango de L3C7.
6. linha 3 já tem dois losango (L3C1, L3C5); exclua losango de L3C8.
7. linha 5 já tem dois losango (L5C4, L5C8); exclua losango de L5C1.
8. linha 5 já tem dois losango (L5C4, L5C8); exclua losango de L5C2.
9. linha 5 já tem dois losango (L5C4, L5C8); exclua losango de L5C3.
10. linha 5 já tem dois losango (L5C4, L5C8); exclua losango de L5C7.
11. coluna 3 já tem dois triângulo (L4C3, L6C3); exclua triângulo de L1C3.
12. coluna 3 já tem dois triângulo (L4C3, L6C3); exclua triângulo de L3C3.
13. coluna 3 já tem dois triângulo (L4C3, L6C3); exclua triângulo de L5C3.
14. coluna 3 já tem dois triângulo (L4C3, L6C3); exclua triângulo de L7C3.
15. coluna 3 já tem dois triângulo (L4C3, L6C3); exclua triângulo de L8C3.
16. coluna 5 já tem dois círculo (L5C5, L6C5); exclua círculo de L2C5.
17. coluna 5 já tem dois círculo (L5C5, L6C5); exclua círculo de L4C5.
18. coluna 5 já tem dois círculo (L5C5, L6C5); exclua círculo de L7C5.
19. coluna 5 já tem dois círculo (L5C5, L6C5); exclua círculo de L8C5.
20. L1C2 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
21. L2C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
22. L4C3 precisa de um parceiro triângulo; só L4C2 pode recebê-lo (horizontal).
23. L4C4 precisa de um parceiro círculo; só L3C4 pode recebê-lo (vertical).
24. L5C4 precisa de um parceiro losango; só L6C4 pode recebê-lo (vertical).
25. L6C3 precisa de um parceiro triângulo; só L6C2 pode recebê-lo (horizontal).
26. A dupla L6C4–L5C4 já está fechada; L7C4 não pode tocar essa dupla com outro losango.
27. A dupla L6C5–L5C5 já está fechada; L6C6 não pode tocar essa dupla com outro círculo.
28. linha 4 já tem dois triângulo (L4C2, L4C3); exclua triângulo de L4C1.
29. linha 4 já tem dois triângulo (L4C2, L4C3); exclua triângulo de L4C5.
30. linha 4 já tem dois triângulo (L4C2, L4C3); exclua triângulo de L4C6.
31. linha 4 já tem dois triângulo (L4C2, L4C3); exclua triângulo de L4C7.
32. linha 4 já tem dois triângulo (L4C2, L4C3); exclua triângulo de L4C8.
33. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C1.
34. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C6.
35. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C7.
36. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C8.
37. coluna 2 já tem dois triângulo (L4C2, L6C2); exclua triângulo de L3C2.
38. coluna 2 já tem dois triângulo (L4C2, L6C2); exclua triângulo de L5C2.
39. coluna 2 já tem dois triângulo (L4C2, L6C2); exclua triângulo de L7C2.
40. coluna 2 já tem dois triângulo (L4C2, L6C2); exclua triângulo de L8C2.
41. coluna 4 já tem dois círculo (L3C4, L4C4); exclua círculo de L1C4.
42. coluna 4 já tem dois círculo (L3C4, L4C4); exclua círculo de L2C4.
43. coluna 4 já tem dois círculo (L3C4, L4C4); exclua círculo de L7C4.
44. coluna 4 já tem dois círculo (L3C4, L4C4); exclua círculo de L8C4.
45. coluna 4 já tem dois losango (L5C4, L6C4); exclua losango de L1C4.
46. coluna 4 já tem dois losango (L5C4, L6C4); exclua losango de L2C4.
47. coluna 4 já tem dois losango (L5C4, L6C4); exclua losango de L8C4.
48. L2C3 precisa de um parceiro losango; só L1C3 pode recebê-lo (vertical).
49. A dupla L3C4–L4C4 já está fechada; L3C3 não pode tocar essa dupla com outro círculo.
50. L5C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
51. L5C6 precisa de um parceiro triângulo; só L5C7 pode recebê-lo (horizontal).
52. Na coluna 1, triângulo só cabe em L7C1 e L8C1; ambas as casas precisam dele.
53. Na coluna 1, triângulo só cabe em L7C1 e L8C1; ambas as casas precisam dele.
54. coluna 3 já tem dois losango (L1C3, L2C3); exclua losango de L7C3.
55. coluna 3 já tem dois losango (L1C3, L2C3); exclua losango de L8C3.
56. A dupla L1C3–L2C3 já está fechada; L1C2 não pode tocar essa dupla com outro losango.
57. L3C3 precisa de um parceiro quadrado; só L3C2 pode recebê-lo (horizontal).
58. L6C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
59. linha 3 já tem dois quadrado (L3C2, L3C3); exclua quadrado de L3C6.
60. linha 3 já tem dois quadrado (L3C2, L3C3); exclua quadrado de L3C7.
61. linha 3 já tem dois quadrado (L3C2, L3C3); exclua quadrado de L3C8.
62. Na coluna 2, losango só cabe em L7C2 e L8C2; ambas as casas precisam dele.
63. Na coluna 2, losango só cabe em L7C2 e L8C2; ambas as casas precisam dele.
64. linha 8 já tem dois losango (L8C2, L8C7); exclua losango de L8C5.
65. linha 8 já tem dois losango (L8C2, L8C7); exclua losango de L8C6.
66. linha 8 já tem dois losango (L8C2, L8C7); exclua losango de L8C8.
67. L8C7 precisa de um parceiro losango; só L7C7 pode recebê-lo (vertical).
68. linha 7 já tem dois losango (L7C2, L7C7); exclua losango de L7C5.
69. linha 7 já tem dois losango (L7C2, L7C7); exclua losango de L7C6.
70. linha 7 já tem dois losango (L7C2, L7C7); exclua losango de L7C8.
71. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L1C7.
72. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L2C7.
73. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L4C7.
74. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L6C7.
75. L6C6 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
76. Na linha 6, losango só cabe em L6C4 e L6C8; ambas as casas precisam dele.
77. coluna 8 já tem dois losango (L5C8, L6C8); exclua losango de L1C8.
78. coluna 8 já tem dois losango (L5C8, L6C8); exclua losango de L2C8.
79. coluna 8 já tem dois losango (L5C8, L6C8); exclua losango de L4C8.
80. L6C7 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
81. Na linha 1, losango só cabe em L1C3 e L1C6; ambas as casas precisam dele.
82. Na linha 6, círculo só cabe em L6C1 e L6C5; ambas as casas precisam dele.
83. L1C6 precisa de um parceiro losango; só L2C6 pode recebê-lo (vertical).
84. L2C5 não pode ser losango: tocaria L3C5 e L2C6, formando um grupo maior que dois.
85. L3C5 precisa de um parceiro losango; só L4C5 pode recebê-lo (vertical).
86. A dupla L4C5–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro losango.
87. L6C1 precisa de um parceiro círculo; só L5C1 pode recebê-lo (vertical).
88. A dupla L6C6–L6C7 já está fechada; L7C6 não pode tocar essa dupla com outro quadrado.
89. linha 2 já tem dois losango (L2C3, L2C6); exclua losango de L2C1.
90. Na linha 4, losango só cabe em L4C1 e L4C5; ambas as casas precisam dele.
91. linha 5 já tem dois círculo (L5C1, L5C5); exclua círculo de L5C2.
92. linha 5 já tem dois círculo (L5C1, L5C5); exclua círculo de L5C3.
93. coluna 1 já tem dois círculo (L5C1, L6C1); exclua círculo de L2C1.
94. Na coluna 2, círculo só cabe em L1C2 e L2C2; ambas as casas precisam dele.
95. Na coluna 3, círculo só cabe em L7C3 e L8C3; ambas as casas precisam dele.
96. Na coluna 3, círculo só cabe em L7C3 e L8C3; ambas as casas precisam dele.
97. Se L1C4 fosse triângulo, 6 deduções levariam a: linha 2: terceira ocorrência de quadrado. Portanto, exclua triângulo.
   - Hipótese, passo 1: linha 1 já tem dois triângulo (L1C4, L1C5); exclua triângulo de L1C7.
   - Hipótese, passo 2: linha 1 já tem dois triângulo (L1C4, L1C5); exclua triângulo de L1C8.
   - Hipótese, passo 3: A dupla L1C4–L1C5 já está fechada; L2C4 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 4: A dupla L1C5–L1C4 já está fechada; L2C5 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 5: Na linha 2, triângulo só cabe em L2C7 e L2C8; ambas as casas precisam dele.
   - Hipótese, passo 6: Na linha 2, triângulo só cabe em L2C7 e L2C8; ambas as casas precisam dele.
   - Contradição final: linha 2: terceira ocorrência de quadrado.
98. linha 1 já tem dois quadrado (L1C1, L1C4); exclua quadrado de L1C7.
99. linha 1 já tem dois quadrado (L1C1, L1C4); exclua quadrado de L1C8.
100. L1C4 precisa de um parceiro quadrado; só L2C4 pode recebê-lo (vertical).
101. L1C5 precisa de um parceiro triângulo; só L2C5 pode recebê-lo (vertical).
102. linha 2 já tem dois quadrado (L2C1, L2C4); exclua quadrado de L2C7.
103. linha 2 já tem dois quadrado (L2C1, L2C4); exclua quadrado de L2C8.
104. Na coluna 4, triângulo só cabe em L7C4 e L8C4; ambas as casas precisam dele.
105. Na coluna 4, triângulo só cabe em L7C4 e L8C4; ambas as casas precisam dele.
106. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L7C5.
107. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L8C5.
108. Na coluna 7, quadrado só cabe em L4C7 e L6C7; ambas as casas precisam dele.
109. A dupla L8C5–L7C5 já está fechada; L8C6 não pode tocar essa dupla com outro quadrado.
110. linha 7 já tem dois triângulo (L7C1, L7C4); exclua triângulo de L7C6.
111. linha 7 já tem dois triângulo (L7C1, L7C4); exclua triângulo de L7C8.
112. Na linha 7, quadrado só cabe em L7C5 e L7C8; ambas as casas precisam dele.
113. linha 8 já tem dois triângulo (L8C1, L8C4); exclua triângulo de L8C6.
114. linha 8 já tem dois triângulo (L8C1, L8C4); exclua triângulo de L8C8.
115. Na linha 8, quadrado só cabe em L8C5 e L8C8; ambas as casas precisam dele.
116. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L3C6.
117. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L4C6.
118. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L4C8.
119. L3C6 precisa de um parceiro triângulo; só L3C7 pode recebê-lo (horizontal).
120. A dupla L3C7–L3C6 já está fechada; L2C7 não pode tocar essa dupla com outro triângulo.
121. A dupla L3C7–L3C6 já está fechada; L3C8 não pode tocar essa dupla com outro triângulo.
122. A dupla L3C8–L4C8 já está fechada; L2C8 não pode tocar essa dupla com outro círculo.
123. Na coluna 7, círculo só cabe em L1C7 e L2C7; ambas as casas precisam dele.
124. coluna 8 já tem dois círculo (L3C8, L4C8); exclua círculo de L1C8.

## 58. Avançado — pacto-v2-106

**Descoberta:** Conjunto de candidatas e capacidade da faixa.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; prevenção de isolamento; prevenção de trio; posições restantes; hipótese refutada; restrição coletiva de candidatas.

**Origem:** pacto-151; recomposição de pistas; 4 pistas alteradas. **Pistas:** 19; 45 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 22; 124 eliminações explicadas. Refutações: 8, 3, 5, 4 passos.

### Função das pistas

- L1C1: losango — cota saturada; exclusão junto à dupla; primeira participação no passo 4.
- L1C2: losango — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 4.
- L1C3: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 17.
- L1C5: quadrado — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L1C6: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C2: círculo — posições restantes; cota saturada; exclusão junto à dupla; primeira participação no passo 64.
- L2C6: triângulo — prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 31.
- L3C5: losango — prevenção de isolamento; prevenção de trio; parceiro obrigatório / orientação; posições restantes; cota saturada; primeira participação no passo 31.
- L4C4: losango — cota saturada; prevenção de isolamento; prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 7.
- L4C6: losango — cota saturada; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 7.
- L5C1: quadrado — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L5C3: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 13.
- L5C5: triângulo — cota saturada; prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 13.
- L5C6: losango — cota saturada; exclusão junto à dupla; primeira participação no passo 24.
- L6C3: quadrado — parceiro obrigatório / orientação; restrição coletiva de candidatas; exclusão junto à dupla; cota saturada; primeira participação no passo 37.
- L6C5: círculo — posições restantes; restrição coletiva de candidatas; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 54.
- L7C3: círculo — cota saturada; restrição coletiva de candidatas; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 17.
- L7C5: quadrado — cota saturada; posições restantes; restrição coletiva de candidatas; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 21.
- L8C8: losango — restrição coletiva de candidatas; prevenção de isolamento; posições restantes; primeira participação no passo 79.

### Sequência lógica

1. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C4.
2. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C7.
3. linha 1 já tem dois quadrado (L1C5, L1C6); exclua quadrado de L1C8.
4. linha 1 já tem dois losango (L1C1, L1C2); exclua losango de L1C4.
5. linha 1 já tem dois losango (L1C1, L1C2); exclua losango de L1C7.
6. linha 1 já tem dois losango (L1C1, L1C2); exclua losango de L1C8.
7. linha 4 já tem dois losango (L4C4, L4C6); exclua losango de L4C1.
8. linha 4 já tem dois losango (L4C4, L4C6); exclua losango de L4C2.
9. linha 4 já tem dois losango (L4C4, L4C6); exclua losango de L4C3.
10. linha 4 já tem dois losango (L4C4, L4C6); exclua losango de L4C5.
11. linha 4 já tem dois losango (L4C4, L4C6); exclua losango de L4C7.
12. linha 4 já tem dois losango (L4C4, L4C6); exclua losango de L4C8.
13. linha 5 já tem dois triângulo (L5C3, L5C5); exclua triângulo de L5C2.
14. linha 5 já tem dois triângulo (L5C3, L5C5); exclua triângulo de L5C4.
15. linha 5 já tem dois triângulo (L5C3, L5C5); exclua triângulo de L5C7.
16. linha 5 já tem dois triângulo (L5C3, L5C5); exclua triângulo de L5C8.
17. coluna 3 já tem dois círculo (L1C3, L7C3); exclua círculo de L2C3.
18. coluna 3 já tem dois círculo (L1C3, L7C3); exclua círculo de L3C3.
19. coluna 3 já tem dois círculo (L1C3, L7C3); exclua círculo de L4C3.
20. coluna 3 já tem dois círculo (L1C3, L7C3); exclua círculo de L8C3.
21. coluna 5 já tem dois quadrado (L1C5, L7C5); exclua quadrado de L2C5.
22. coluna 5 já tem dois quadrado (L1C5, L7C5); exclua quadrado de L4C5.
23. coluna 5 já tem dois quadrado (L1C5, L7C5); exclua quadrado de L8C5.
24. coluna 6 já tem dois losango (L4C6, L5C6); exclua losango de L3C6.
25. coluna 6 já tem dois losango (L4C6, L5C6); exclua losango de L6C6.
26. coluna 6 já tem dois losango (L4C6, L5C6); exclua losango de L7C6.
27. coluna 6 já tem dois losango (L4C6, L5C6); exclua losango de L8C6.
28. A dupla L1C1–L1C2 já está fechada; L2C1 não pode tocar essa dupla com outro losango.
29. L1C3 precisa de um parceiro círculo; só L1C4 pode recebê-lo (horizontal).
30. A dupla L1C4–L1C3 já está fechada; L2C4 não pode tocar essa dupla com outro círculo.
31. L2C5 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
32. L3C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
33. L3C4 não pode ser losango: tocaria L4C4 e L3C5, formando um grupo maior que dois.
34. L3C5 precisa de um parceiro losango; só L2C5 pode recebê-lo (vertical).
35. L4C4 precisa de um parceiro losango; só L5C4 pode recebê-lo (vertical).
36. L4C5 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
37. L5C3 precisa de um parceiro triângulo; só L4C3 pode recebê-lo (vertical).
38. A dupla L5C4–L4C4 já está fechada; L6C4 não pode tocar essa dupla com outro losango.
39. A dupla L5C6–L4C6 já está fechada; L5C7 não pode tocar essa dupla com outro losango.
40. linha 1 já tem dois círculo (L1C3, L1C4); exclua círculo de L1C7.
41. linha 1 já tem dois círculo (L1C3, L1C4); exclua círculo de L1C8.
42. linha 4 já tem dois triângulo (L4C3, L4C5); exclua triângulo de L4C1.
43. linha 4 já tem dois triângulo (L4C3, L4C5); exclua triângulo de L4C2.
44. linha 4 já tem dois triângulo (L4C3, L4C5); exclua triângulo de L4C7.
45. linha 4 já tem dois triângulo (L4C3, L4C5); exclua triângulo de L4C8.
46. linha 5 já tem dois losango (L5C4, L5C6); exclua losango de L5C2.
47. linha 5 já tem dois losango (L5C4, L5C6); exclua losango de L5C8.
48. coluna 3 já tem dois triângulo (L4C3, L5C3); exclua triângulo de L2C3.
49. coluna 3 já tem dois triângulo (L4C3, L5C3); exclua triângulo de L3C3.
50. coluna 3 já tem dois triângulo (L4C3, L5C3); exclua triângulo de L8C3.
51. coluna 4 já tem dois losango (L4C4, L5C4); exclua losango de L2C4.
52. coluna 4 já tem dois losango (L4C4, L5C4); exclua losango de L7C4.
53. coluna 4 já tem dois losango (L4C4, L5C4); exclua losango de L8C4.
54. Na coluna 5, círculo só cabe em L6C5 e L8C5; ambas as casas precisam dele.
55. A dupla L1C7–L1C8 já está fechada; L2C7 não pode tocar essa dupla com outro triângulo.
56. A dupla L1C8–L1C7 já está fechada; L2C8 não pode tocar essa dupla com outro triângulo.
57. L2C6 precisa de um parceiro triângulo; só L3C6 pode recebê-lo (vertical).
58. A dupla L3C6–L2C6 já está fechada; L3C7 não pode tocar essa dupla com outro triângulo.
59. L3C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
60. coluna 6 já tem dois triângulo (L2C6, L3C6); exclua triângulo de L6C6.
61. coluna 6 já tem dois triângulo (L2C6, L3C6); exclua triângulo de L7C6.
62. coluna 6 já tem dois triângulo (L2C6, L3C6); exclua triângulo de L8C6.
63. Se L2C1 fosse triângulo, 8 deduções levariam a: L4C1 fica sem símbolo possível. L4C1 não pode ser quadrado: tocaria L5C1 e L4C2, formando um grupo maior que dois. Portanto, exclua triângulo.
   - Hipótese, passo 1: linha 2 já tem dois triângulo (L2C1, L2C6); exclua triângulo de L2C4.
   - Hipótese, passo 2: L2C1 precisa de um parceiro triângulo; só L3C1 pode recebê-lo (vertical).
   - Hipótese, passo 3: L2C2 precisa de um parceiro círculo; só L3C2 pode recebê-lo (vertical).
   - Hipótese, passo 4: A dupla L3C2–L2C2 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
   - Hipótese, passo 5: L3C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
   - Hipótese, passo 6: A dupla L3C4–L2C4 já está fechada; L3C3 não pode tocar essa dupla com outro quadrado.
   - Hipótese, passo 7: L4C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
   - Hipótese, passo 8: L4C1 não pode ser quadrado: tocaria L5C1 e L4C2, formando um grupo maior que dois.
   - Contradição final: L4C1 fica sem símbolo possível. L4C1 não pode ser quadrado: tocaria L5C1 e L4C2, formando um grupo maior que dois.
64. Na linha 2, triângulo só cabe em L2C4 e L2C6; ambas as casas precisam dele.
65. L2C4 precisa de um parceiro triângulo; só L3C4 pode recebê-lo (vertical).
66. linha 3 já tem dois triângulo (L3C4, L3C6); exclua triângulo de L3C1.
67. linha 3 já tem dois triângulo (L3C4, L3C6); exclua triângulo de L3C2.
68. coluna 4 já tem dois triângulo (L2C4, L3C4); exclua triângulo de L6C4.
69. coluna 4 já tem dois triângulo (L2C4, L3C4); exclua triângulo de L7C4.
70. coluna 4 já tem dois triângulo (L2C4, L3C4); exclua triângulo de L8C4.
71. Na linha 6, L6C3, L6C4, L6C5, L6C6 reservam as 4 ocorrências de círculo e quadrado; retire esses símbolos de L6C1.
72. Na linha 6, L6C3, L6C4, L6C5, L6C6 reservam as 4 ocorrências de círculo e quadrado; retire esses símbolos de L6C2.
73. Na linha 6, L6C3, L6C4, L6C5, L6C6 reservam as 4 ocorrências de círculo e quadrado; retire esses símbolos de L6C7.
74. Na linha 6, L6C3, L6C4, L6C5, L6C6 reservam as 4 ocorrências de círculo e quadrado; retire esses símbolos de L6C8.
75. Na linha 7, L7C3, L7C4, L7C5, L7C6 reservam as 4 ocorrências de círculo e quadrado; retire esses símbolos de L7C1.
76. Na linha 7, L7C3, L7C4, L7C5, L7C6 reservam as 4 ocorrências de círculo e quadrado; retire esses símbolos de L7C2.
77. Na linha 7, L7C3, L7C4, L7C5, L7C6 reservam as 4 ocorrências de círculo e quadrado; retire esses símbolos de L7C7.
78. Na linha 7, L7C3, L7C4, L7C5, L7C6 reservam as 4 ocorrências de círculo e quadrado; retire esses símbolos de L7C8.
79. Na coluna 8, as 4 ocorrências de círculo e quadrado só cabem em L2C8, L3C8, L4C8, L5C8; essas casas ficam reservadas ao conjunto.
80. Na coluna 8, as 4 ocorrências de círculo e quadrado só cabem em L2C8, L3C8, L4C8, L5C8; essas casas ficam reservadas ao conjunto.
81. L6C3 precisa de um parceiro quadrado; só L6C4 pode recebê-lo (horizontal).
82. A dupla L6C4–L6C3 já está fechada; L7C4 não pode tocar essa dupla com outro quadrado.
83. L6C5 precisa de um parceiro círculo; só L6C6 pode recebê-lo (horizontal).
84. A dupla L6C6–L6C5 já está fechada; L7C6 não pode tocar essa dupla com outro círculo.
85. A dupla L7C4–L7C3 já está fechada; L8C4 não pode tocar essa dupla com outro círculo.
86. A dupla L7C6–L7C5 já está fechada; L8C6 não pode tocar essa dupla com outro quadrado.
87. L8C4 precisa de um parceiro quadrado; só L8C3 pode recebê-lo (horizontal).
88. A dupla L8C6–L8C5 já está fechada; L8C7 não pode tocar essa dupla com outro círculo.
89. L8C7 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
90. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C1.
91. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C2.
92. linha 8 já tem dois quadrado (L8C3, L8C4); exclua quadrado de L8C1.
93. linha 8 já tem dois quadrado (L8C3, L8C4); exclua quadrado de L8C2.
94. coluna 3 já tem dois quadrado (L6C3, L8C3); exclua quadrado de L2C3.
95. coluna 3 já tem dois quadrado (L6C3, L8C3); exclua quadrado de L3C3.
96. A dupla L3C3–L2C3 já está fechada; L3C2 não pode tocar essa dupla com outro losango.
97. linha 2 já tem dois losango (L2C3, L2C5); exclua losango de L2C7.
98. linha 3 já tem dois losango (L3C3, L3C5); exclua losango de L3C1.
99. linha 3 já tem dois losango (L3C3, L3C5); exclua losango de L3C7.
100. Se L2C1 fosse quadrado, 3 deduções levariam a: L2C1 fica sem símbolo possível. L2C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua quadrado.
   - Hipótese, passo 1: Na coluna 1, círculo só cabe em L3C1 e L4C1; ambas as casas precisam dele.
   - Hipótese, passo 2: Na coluna 1, círculo só cabe em L3C1 e L4C1; ambas as casas precisam dele.
   - Hipótese, passo 3: L2C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L2C1 fica sem símbolo possível. L2C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
101. linha 2 já tem dois círculo (L2C1, L2C2); exclua círculo de L2C7.
102. linha 2 já tem dois círculo (L2C1, L2C2); exclua círculo de L2C8.
103. A dupla L2C1–L2C2 já está fechada; L3C1 não pode tocar essa dupla com outro círculo.
104. A dupla L2C2–L2C1 já está fechada; L3C2 não pode tocar essa dupla com outro círculo.
105. A dupla L2C7–L2C8 já está fechada; L3C7 não pode tocar essa dupla com outro quadrado.
106. A dupla L2C8–L2C7 já está fechada; L3C8 não pode tocar essa dupla com outro quadrado.
107. A dupla L3C1–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro quadrado.
108. A dupla L3C2–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro quadrado.
109. A dupla L3C7–L3C8 já está fechada; L4C7 não pode tocar essa dupla com outro círculo.
110. A dupla L3C8–L3C7 já está fechada; L4C8 não pode tocar essa dupla com outro círculo.
111. A dupla L4C2–L4C1 já está fechada; L5C2 não pode tocar essa dupla com outro círculo.
112. A dupla L4C7–L4C8 já está fechada; L5C7 não pode tocar essa dupla com outro quadrado.
113. A dupla L4C8–L4C7 já está fechada; L5C8 não pode tocar essa dupla com outro quadrado.
114. Se L6C1 fosse losango, 5 deduções levariam a: L7C1 fica sem símbolo possível. L7C1 não pode ser triângulo: tocaria L8C1 e L7C2, formando um grupo maior que dois. Portanto, exclua losango.
   - Hipótese, passo 1: Na coluna 1, triângulo só cabe em L7C1 e L8C1; ambas as casas precisam dele.
   - Hipótese, passo 2: Na coluna 1, triângulo só cabe em L7C1 e L8C1; ambas as casas precisam dele.
   - Hipótese, passo 3: L6C1 precisa de um parceiro losango; só L6C2 pode recebê-lo (horizontal).
   - Hipótese, passo 4: A dupla L6C2–L6C1 já está fechada; L7C2 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 5: L7C1 não pode ser triângulo: tocaria L8C1 e L7C2, formando um grupo maior que dois.
   - Contradição final: L7C1 fica sem símbolo possível. L7C1 não pode ser triângulo: tocaria L8C1 e L7C2, formando um grupo maior que dois.
115. Se L6C2 fosse losango, 4 deduções levariam a: L6C2 fica sem símbolo possível. L6C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua losango.
   - Hipótese, passo 1: Na coluna 2, triângulo só cabe em L7C2 e L8C2; ambas as casas precisam dele.
   - Hipótese, passo 2: Na coluna 2, triângulo só cabe em L7C2 e L8C2; ambas as casas precisam dele.
   - Hipótese, passo 3: L6C1 precisa de um parceiro triângulo; só L7C1 pode recebê-lo (vertical).
   - Hipótese, passo 4: L6C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L6C2 fica sem símbolo possível. L6C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
116. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C7.
117. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C8.
118. Na coluna 8, triângulo só cabe em L1C8 e L7C8; ambas as casas precisam dele.
119. A dupla L6C1–L6C2 já está fechada; L7C1 não pode tocar essa dupla com outro triângulo.
120. A dupla L6C2–L6C1 já está fechada; L7C2 não pode tocar essa dupla com outro triângulo.
121. A dupla L6C7–L6C8 já está fechada; L7C7 não pode tocar essa dupla com outro losango.
122. A dupla L7C1–L7C2 já está fechada; L8C1 não pode tocar essa dupla com outro losango.
123. A dupla L7C2–L7C1 já está fechada; L8C2 não pode tocar essa dupla com outro losango.
124. A dupla L7C7–L7C8 já está fechada; L8C7 não pode tocar essa dupla com outro triângulo.

## 59. Avançado — pacto-186

**Descoberta:** Hipótese curta termina em contradição.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; prevenção de trio; prevenção de isolamento; hipótese refutada.

**Origem:** pacto-186; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 23; 138 eliminações explicadas. Refutações: 2 passos.

### Função das pistas

- L1C4: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; prevenção de isolamento; primeira participação no passo 73.
- L2C2: círculo — parceiro obrigatório / orientação; prevenção de trio; cota saturada; posições restantes; primeira participação no passo 27.
- L2C5: quadrado — posições restantes; exclusão junto à dupla; primeira participação no passo 118.
- L2C7: losango — parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; cota saturada; primeira participação no passo 26.
- L2C8: triângulo — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 26.
- L3C2: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 1.
- L3C5: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L4C4: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 12.
- L4C5: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 17.
- L6C6: triângulo — prevenção de trio; parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 71.
- L6C7: círculo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 7.
- L6C8: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 7.
- L7C8: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 22.
- L8C4: quadrado — cota saturada; posições restantes; prevenção de isolamento; primeira participação no passo 12.
- L8C8: losango — cota saturada; exclusão junto à dupla; primeira participação no passo 22.

### Sequência lógica

1. linha 3 já tem dois triângulo (L3C2, L3C5); exclua triângulo de L3C1.
2. linha 3 já tem dois triângulo (L3C2, L3C5); exclua triângulo de L3C3.
3. linha 3 já tem dois triângulo (L3C2, L3C5); exclua triângulo de L3C4.
4. linha 3 já tem dois triângulo (L3C2, L3C5); exclua triângulo de L3C6.
5. linha 3 já tem dois triângulo (L3C2, L3C5); exclua triângulo de L3C7.
6. linha 3 já tem dois triângulo (L3C2, L3C5); exclua triângulo de L3C8.
7. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C1.
8. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C2.
9. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C3.
10. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C4.
11. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C5.
12. coluna 4 já tem dois quadrado (L4C4, L8C4); exclua quadrado de L2C4.
13. coluna 4 já tem dois quadrado (L4C4, L8C4); exclua quadrado de L3C4.
14. coluna 4 já tem dois quadrado (L4C4, L8C4); exclua quadrado de L5C4.
15. coluna 4 já tem dois quadrado (L4C4, L8C4); exclua quadrado de L6C4.
16. coluna 4 já tem dois quadrado (L4C4, L8C4); exclua quadrado de L7C4.
17. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L1C5.
18. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L5C5.
19. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L6C5.
20. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L7C5.
21. coluna 5 já tem dois triângulo (L3C5, L4C5); exclua triângulo de L8C5.
22. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L1C8.
23. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L3C8.
24. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L4C8.
25. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L5C8.
26. L2C8 precisa de um parceiro triângulo; só L1C8 pode recebê-lo (vertical).
27. L3C2 precisa de um parceiro triângulo; só L4C2 pode recebê-lo (vertical).
28. A dupla L4C2–L3C2 já está fechada; L5C2 não pode tocar essa dupla com outro triângulo.
29. A dupla L4C2–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro triângulo.
30. A dupla L4C2–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro triângulo.
31. L4C4 precisa de um parceiro quadrado; só L4C3 pode recebê-lo (horizontal).
32. A dupla L4C5–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro triângulo.
33. A dupla L6C7–L6C8 já está fechada; L5C7 não pode tocar essa dupla com outro círculo.
34. A dupla L6C7–L6C8 já está fechada; L7C7 não pode tocar essa dupla com outro círculo.
35. A dupla L6C8–L6C7 já está fechada; L5C8 não pode tocar essa dupla com outro círculo.
36. A dupla L7C8–L8C8 já está fechada; L7C7 não pode tocar essa dupla com outro losango.
37. A dupla L8C8–L7C8 já está fechada; L8C7 não pode tocar essa dupla com outro losango.
38. linha 4 já tem dois triângulo (L4C2, L4C5); exclua triângulo de L4C7.
39. linha 4 já tem dois triângulo (L4C2, L4C5); exclua triângulo de L4C8.
40. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C1.
41. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C6.
42. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C7.
43. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C8.
44. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L1C2.
45. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L6C2.
46. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L7C2.
47. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L8C2.
48. coluna 8 já tem dois círculo (L4C8, L6C8); exclua círculo de L3C8.
49. coluna 8 já tem dois triângulo (L1C8, L2C8); exclua triângulo de L5C8.
50. A dupla L1C8–L2C8 já está fechada; L1C7 não pode tocar essa dupla com outro triângulo.
51. L3C8 precisa de um parceiro quadrado; só L3C7 pode recebê-lo (horizontal).
52. A dupla L4C3–L4C4 já está fechada; L3C3 não pode tocar essa dupla com outro quadrado.
53. A dupla L4C3–L4C4 já está fechada; L5C3 não pode tocar essa dupla com outro quadrado.
54. L4C8 precisa de um parceiro círculo; só L4C7 pode recebê-lo (horizontal).
55. L5C8 precisa de um parceiro quadrado; só L5C7 pode recebê-lo (horizontal).
56. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C1.
57. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C6.
58. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C1.
59. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C6.
60. linha 5 já tem dois quadrado (L5C7, L5C8); exclua quadrado de L5C1.
61. linha 5 já tem dois quadrado (L5C7, L5C8); exclua quadrado de L5C2.
62. linha 5 já tem dois quadrado (L5C7, L5C8); exclua quadrado de L5C5.
63. linha 5 já tem dois quadrado (L5C7, L5C8); exclua quadrado de L5C6.
64. coluna 7 já tem dois círculo (L4C7, L6C7); exclua círculo de L1C7.
65. coluna 7 já tem dois círculo (L4C7, L6C7); exclua círculo de L8C7.
66. Na coluna 7, triângulo só cabe em L7C7 e L8C7; ambas as casas precisam dele.
67. Na coluna 7, triângulo só cabe em L7C7 e L8C7; ambas as casas precisam dele.
68. coluna 7 já tem dois quadrado (L3C7, L5C7); exclua quadrado de L1C7.
69. A dupla L1C7–L2C7 já está fechada; L1C6 não pode tocar essa dupla com outro losango.
70. A dupla L2C7–L1C7 já está fechada; L2C6 não pode tocar essa dupla com outro losango.
71. L7C6 não pode ser triângulo: tocaria L6C6 e L7C7, formando um grupo maior que dois.
72. A dupla L8C7–L7C7 já está fechada; L8C6 não pode tocar essa dupla com outro triângulo.
73. linha 1 já tem dois losango (L1C4, L1C7); exclua losango de L1C1.
74. linha 1 já tem dois losango (L1C4, L1C7); exclua losango de L1C2.
75. linha 1 já tem dois losango (L1C4, L1C7); exclua losango de L1C3.
76. linha 1 já tem dois losango (L1C4, L1C7); exclua losango de L1C5.
77. L1C4 precisa de um parceiro losango; só L2C4 pode recebê-lo (vertical).
78. A dupla L2C4–L1C4 já está fechada; L3C4 não pode tocar essa dupla com outro losango.
79. A dupla L2C4–L1C4 já está fechada; L2C3 não pode tocar essa dupla com outro losango.
80. L3C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
81. L6C6 precisa de um parceiro triângulo; só L5C6 pode recebê-lo (vertical).
82. linha 2 já tem dois losango (L2C4, L2C7); exclua losango de L2C1.
83. linha 3 já tem dois círculo (L3C3, L3C4); exclua círculo de L3C1.
84. linha 3 já tem dois círculo (L3C3, L3C4); exclua círculo de L3C6.
85. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L5C1.
86. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L6C1.
87. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L7C1.
88. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L8C1.
89. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L5C4.
90. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L6C4.
91. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L7C4.
92. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L1C6.
93. coluna 6 já tem dois triângulo (L5C6, L6C6); exclua triângulo de L2C6.
94. coluna 6 já tem dois losango (L3C6, L4C6); exclua losango de L7C6.
95. coluna 6 já tem dois losango (L3C6, L4C6); exclua losango de L8C6.
96. L2C3 não pode ser círculo: tocaria L3C3 e L2C2, formando um grupo maior que dois.
97. linha 6 já tem dois triângulo (L6C4, L6C6); exclua triângulo de L6C1.
98. linha 6 já tem dois triângulo (L6C4, L6C6); exclua triângulo de L6C3.
99. L5C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
100. L5C1 precisa de um parceiro círculo; só L5C2 pode recebê-lo (horizontal).
101. A dupla L5C2–L5C1 já está fechada; L5C3 não pode tocar essa dupla com outro círculo.
102. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C4.
103. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C5.
104. linha 5 já tem dois triângulo (L5C4, L5C6); exclua triângulo de L5C3.
105. coluna 2 já tem dois círculo (L2C2, L5C2); exclua círculo de L1C2.
106. coluna 2 já tem dois círculo (L2C2, L5C2); exclua círculo de L7C2.
107. coluna 2 já tem dois círculo (L2C2, L5C2); exclua círculo de L8C2.
108. Na coluna 4, círculo só cabe em L3C4 e L7C4; ambas as casas precisam dele.
109. L1C3 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
110. L2C2 precisa de um parceiro círculo; só L2C1 pode recebê-lo (horizontal).
111. L5C3 precisa de um parceiro losango; só L6C3 pode recebê-lo (vertical).
112. L5C5 precisa de um parceiro losango; só L6C5 pode recebê-lo (vertical).
113. A dupla L6C3–L5C3 já está fechada; L7C3 não pode tocar essa dupla com outro losango.
114. A dupla L6C3–L5C3 já está fechada; L6C2 não pode tocar essa dupla com outro losango.
115. A dupla L6C5–L5C5 já está fechada; L7C5 não pode tocar essa dupla com outro losango.
116. L8C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
117. linha 2 já tem dois círculo (L2C1, L2C2); exclua círculo de L2C6.
118. Na linha 2, triângulo só cabe em L2C3 e L2C8; ambas as casas precisam dele.
119. Na linha 7, losango só cabe em L7C2 e L7C8; ambas as casas precisam dele.
120. coluna 1 já tem dois círculo (L2C1, L5C1); exclua círculo de L1C1.
121. coluna 1 já tem dois círculo (L2C1, L5C1); exclua círculo de L7C1.
122. coluna 1 já tem dois círculo (L2C1, L5C1); exclua círculo de L8C1.
123. coluna 2 já tem dois quadrado (L1C2, L6C2); exclua quadrado de L8C2.
124. coluna 3 já tem dois losango (L5C3, L6C3); exclua losango de L8C3.
125. L1C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
126. A dupla L1C2–L1C1 já está fechada; L1C3 não pode tocar essa dupla com outro quadrado.
127. A dupla L2C5–L2C6 já está fechada; L1C5 não pode tocar essa dupla com outro quadrado.
128. A dupla L2C6–L2C5 já está fechada; L1C6 não pode tocar essa dupla com outro quadrado.
129. A dupla L6C1–L6C2 já está fechada; L7C1 não pode tocar essa dupla com outro quadrado.
130. L7C1 precisa de um parceiro triângulo; só L8C1 pode recebê-lo (vertical).
131. linha 7 já tem dois triângulo (L7C1, L7C7); exclua triângulo de L7C3.
132. linha 8 já tem dois triângulo (L8C1, L8C7); exclua triângulo de L8C3.
133. Se L7C3 fosse quadrado, 2 deduções levariam a: L7C3 fica sem símbolo possível. L7C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua quadrado.
   - Hipótese, passo 1: Na coluna 3, círculo só cabe em L3C3 e L8C3; ambas as casas precisam dele.
   - Hipótese, passo 2: L7C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L7C3 fica sem símbolo possível. L7C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
134. linha 7 já tem dois círculo (L7C3, L7C4); exclua círculo de L7C5.
135. linha 7 já tem dois círculo (L7C3, L7C4); exclua círculo de L7C6.
136. coluna 3 já tem dois círculo (L3C3, L7C3); exclua círculo de L8C3.
137. Na coluna 5, círculo só cabe em L1C5 e L8C5; ambas as casas precisam dele.
138. Na coluna 6, círculo só cabe em L1C6 e L8C6; ambas as casas precisam dele.

## 60. Avançado — pacto-138

**Descoberta:** Compatibilidade entre vários pares.

**Técnicas combinadas:** cota saturada; prevenção de trio; exclusão junto à dupla; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes.

**Origem:** pacto-138; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 12; 52 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 23; 140 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L2C4: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 53.
- L3C1: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 36.
- L4C2: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 14.
- L4C5: quadrado — cota saturada; prevenção de trio; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L4C7: quadrado — cota saturada; prevenção de trio; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L4C8: círculo — parceiro obrigatório / orientação; posições restantes; prevenção de trio; prevenção de isolamento; cota saturada; primeira participação no passo 26.
- L5C6: quadrado — prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 18.
- L6C2: triângulo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 14.
- L7C2: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 10.
- L7C5: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 5.
- L7C7: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 5.
- L8C2: círculo — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 10.

### Sequência lógica

1. linha 4 já tem dois quadrado (L4C5, L4C7); exclua quadrado de L4C1.
2. linha 4 já tem dois quadrado (L4C5, L4C7); exclua quadrado de L4C3.
3. linha 4 já tem dois quadrado (L4C5, L4C7); exclua quadrado de L4C4.
4. linha 4 já tem dois quadrado (L4C5, L4C7); exclua quadrado de L4C6.
5. linha 7 já tem dois triângulo (L7C5, L7C7); exclua triângulo de L7C1.
6. linha 7 já tem dois triângulo (L7C5, L7C7); exclua triângulo de L7C3.
7. linha 7 já tem dois triângulo (L7C5, L7C7); exclua triângulo de L7C4.
8. linha 7 já tem dois triângulo (L7C5, L7C7); exclua triângulo de L7C6.
9. linha 7 já tem dois triângulo (L7C5, L7C7); exclua triângulo de L7C8.
10. coluna 2 já tem dois círculo (L7C2, L8C2); exclua círculo de L1C2.
11. coluna 2 já tem dois círculo (L7C2, L8C2); exclua círculo de L2C2.
12. coluna 2 já tem dois círculo (L7C2, L8C2); exclua círculo de L3C2.
13. coluna 2 já tem dois círculo (L7C2, L8C2); exclua círculo de L5C2.
14. coluna 2 já tem dois triângulo (L4C2, L6C2); exclua triângulo de L1C2.
15. coluna 2 já tem dois triângulo (L4C2, L6C2); exclua triângulo de L2C2.
16. coluna 2 já tem dois triângulo (L4C2, L6C2); exclua triângulo de L3C2.
17. coluna 2 já tem dois triângulo (L4C2, L6C2); exclua triângulo de L5C2.
18. L5C5 não pode ser quadrado: tocaria L4C5 e L5C6, formando um grupo maior que dois.
19. L5C7 não pode ser quadrado: tocaria L4C7 e L5C6, formando um grupo maior que dois.
20. A dupla L7C2–L8C2 já está fechada; L7C1 não pode tocar essa dupla com outro círculo.
21. A dupla L7C2–L8C2 já está fechada; L7C3 não pode tocar essa dupla com outro círculo.
22. L8C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
23. A dupla L8C2–L7C2 já está fechada; L8C1 não pode tocar essa dupla com outro círculo.
24. A dupla L8C2–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro círculo.
25. L4C5 precisa de um parceiro quadrado; só L3C5 pode recebê-lo (vertical).
26. L4C7 precisa de um parceiro quadrado; só L3C7 pode recebê-lo (vertical).
27. L5C6 precisa de um parceiro quadrado; só L6C6 pode recebê-lo (vertical).
28. A dupla L6C6–L5C6 já está fechada; L7C6 não pode tocar essa dupla com outro quadrado.
29. A dupla L6C6–L5C6 já está fechada; L6C5 não pode tocar essa dupla com outro quadrado.
30. A dupla L6C6–L5C6 já está fechada; L6C7 não pode tocar essa dupla com outro quadrado.
31. linha 3 já tem dois quadrado (L3C5, L3C7); exclua quadrado de L3C2.
32. linha 3 já tem dois quadrado (L3C5, L3C7); exclua quadrado de L3C3.
33. linha 3 já tem dois quadrado (L3C5, L3C7); exclua quadrado de L3C4.
34. linha 3 já tem dois quadrado (L3C5, L3C7); exclua quadrado de L3C6.
35. linha 3 já tem dois quadrado (L3C5, L3C7); exclua quadrado de L3C8.
36. linha 3 já tem dois losango (L3C1, L3C2); exclua losango de L3C3.
37. linha 3 já tem dois losango (L3C1, L3C2); exclua losango de L3C4.
38. linha 3 já tem dois losango (L3C1, L3C2); exclua losango de L3C6.
39. linha 3 já tem dois losango (L3C1, L3C2); exclua losango de L3C8.
40. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L1C5.
41. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L2C5.
42. coluna 5 já tem dois quadrado (L3C5, L4C5); exclua quadrado de L8C5.
43. coluna 6 já tem dois quadrado (L5C6, L6C6); exclua quadrado de L1C6.
44. coluna 6 já tem dois quadrado (L5C6, L6C6); exclua quadrado de L2C6.
45. coluna 6 já tem dois quadrado (L5C6, L6C6); exclua quadrado de L8C6.
46. coluna 7 já tem dois quadrado (L3C7, L4C7); exclua quadrado de L1C7.
47. coluna 7 já tem dois quadrado (L3C7, L4C7); exclua quadrado de L2C7.
48. coluna 7 já tem dois quadrado (L3C7, L4C7); exclua quadrado de L8C7.
49. A dupla L3C1–L3C2 já está fechada; L2C1 não pode tocar essa dupla com outro losango.
50. A dupla L3C1–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro losango.
51. A dupla L3C2–L3C1 já está fechada; L2C2 não pode tocar essa dupla com outro losango.
52. L4C6 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
53. linha 2 já tem dois quadrado (L2C2, L2C4); exclua quadrado de L2C1.
54. linha 2 já tem dois quadrado (L2C2, L2C4); exclua quadrado de L2C3.
55. linha 2 já tem dois quadrado (L2C2, L2C4); exclua quadrado de L2C8.
56. Na linha 4, losango só cabe em L4C3 e L4C4; ambas as casas precisam dele.
57. Na linha 4, losango só cabe em L4C3 e L4C4; ambas as casas precisam dele.
58. L1C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
59. L2C2 precisa de um parceiro quadrado; só L1C2 pode recebê-lo (vertical).
60. L2C4 precisa de um parceiro quadrado; só L1C4 pode recebê-lo (vertical).
61. L4C2 precisa de um parceiro triângulo; só L4C1 pode recebê-lo (horizontal).
62. A dupla L4C3–L4C4 já está fechada; L5C3 não pode tocar essa dupla com outro losango.
63. A dupla L4C4–L4C3 já está fechada; L5C4 não pode tocar essa dupla com outro losango.
64. linha 1 já tem dois quadrado (L1C2, L1C4); exclua quadrado de L1C1.
65. linha 1 já tem dois quadrado (L1C2, L1C4); exclua quadrado de L1C3.
66. Na linha 4, círculo só cabe em L4C6 e L4C8; ambas as casas precisam dele.
67. coluna 2 já tem dois quadrado (L1C2, L2C2); exclua quadrado de L5C2.
68. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L5C4.
69. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L6C4.
70. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L7C4.
71. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L8C4.
72. L1C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
73. A dupla L4C1–L4C2 já está fechada; L5C1 não pode tocar essa dupla com outro triângulo.
74. L4C6 precisa de um parceiro círculo; só L3C6 pode recebê-lo (vertical).
75. L5C2 precisa de um parceiro losango; só L5C1 pode recebê-lo (horizontal).
76. L6C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
77. linha 5 já tem dois losango (L5C1, L5C2); exclua losango de L5C5.
78. linha 5 já tem dois losango (L5C1, L5C2); exclua losango de L5C7.
79. linha 5 já tem dois losango (L5C1, L5C2); exclua losango de L5C8.
80. Na coluna 1, círculo só cabe em L1C1 e L2C1; ambas as casas precisam dele.
81. Na coluna 1, círculo só cabe em L1C1 e L2C1; ambas as casas precisam dele.
82. Na coluna 1, triângulo só cabe em L4C1 e L6C1; ambas as casas precisam dele.
83. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
84. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
85. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L1C6.
86. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L2C6.
87. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L7C6.
88. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L8C6.
89. A dupla L6C2–L6C1 já está fechada; L6C3 não pode tocar essa dupla com outro triângulo.
90. L7C6 precisa de um parceiro losango; só L8C6 pode recebê-lo (vertical).
91. A dupla L8C6–L7C6 já está fechada; L8C5 não pode tocar essa dupla com outro losango.
92. A dupla L8C6–L7C6 já está fechada; L8C7 não pode tocar essa dupla com outro losango.
93. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C4.
94. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C5.
95. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C7.
96. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C8.
97. Na coluna 6, triângulo só cabe em L1C6 e L2C6; ambas as casas precisam dele.
98. Na coluna 6, triângulo só cabe em L1C6 e L2C6; ambas as casas precisam dele.
99. A dupla L1C6–L2C6 já está fechada; L1C5 não pode tocar essa dupla com outro triângulo.
100. A dupla L1C6–L2C6 já está fechada; L1C7 não pode tocar essa dupla com outro triângulo.
101. A dupla L2C6–L1C6 já está fechada; L2C5 não pode tocar essa dupla com outro triângulo.
102. A dupla L2C6–L1C6 já está fechada; L2C7 não pode tocar essa dupla com outro triângulo.
103. L7C5 precisa de um parceiro triângulo; só L8C5 pode recebê-lo (vertical).
104. L7C7 precisa de um parceiro triângulo; só L8C7 pode recebê-lo (vertical).
105. A dupla L8C5–L7C5 já está fechada; L8C4 não pode tocar essa dupla com outro triângulo.
106. A dupla L8C7–L7C7 já está fechada; L8C8 não pode tocar essa dupla com outro triângulo.
107. linha 8 já tem dois triângulo (L8C5, L8C7); exclua triângulo de L8C3.
108. Na coluna 4, triângulo só cabe em L3C4 e L5C4; ambas as casas precisam dele.
109. Na coluna 4, triângulo só cabe em L3C4 e L5C4; ambas as casas precisam dele.
110. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L5C5.
111. coluna 7 já tem dois triângulo (L7C7, L8C7); exclua triângulo de L5C7.
112. L3C4 precisa de um parceiro triângulo; só L3C3 pode recebê-lo (horizontal).
113. L5C4 precisa de um parceiro triângulo; só L5C3 pode recebê-lo (horizontal).
114. L5C5 precisa de um parceiro círculo; só L6C5 pode recebê-lo (vertical).
115. L5C8 não pode ser círculo: tocaria L4C8 e L5C7, formando um grupo maior que dois.
116. L5C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
117. L5C8 precisa de um parceiro quadrado; só L6C8 pode recebê-lo (vertical).
118. A dupla L6C5–L5C5 já está fechada; L6C4 não pode tocar essa dupla com outro círculo.
119. L6C7 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
120. A dupla L6C8–L5C8 já está fechada; L7C8 não pode tocar essa dupla com outro quadrado.
121. L8C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
122. Na linha 3, círculo só cabe em L3C6 e L3C8; ambas as casas precisam dele.
123. linha 6 já tem dois círculo (L6C5, L6C7); exclua círculo de L6C3.
124. linha 6 já tem dois quadrado (L6C6, L6C8); exclua quadrado de L6C3.
125. Na linha 7, quadrado só cabe em L7C1 e L7C3; ambas as casas precisam dele.
126. Na linha 8, quadrado só cabe em L8C1 e L8C3; ambas as casas precisam dele.
127. Na coluna 3, círculo só cabe em L1C3 e L2C3; ambas as casas precisam dele.
128. Na coluna 3, círculo só cabe em L1C3 e L2C3; ambas as casas precisam dele.
129. Na coluna 4, círculo só cabe em L7C4 e L8C4; ambas as casas precisam dele.
130. Na coluna 4, círculo só cabe em L7C4 e L8C4; ambas as casas precisam dele.
131. coluna 5 já tem dois círculo (L5C5, L6C5); exclua círculo de L1C5.
132. coluna 5 já tem dois círculo (L5C5, L6C5); exclua círculo de L2C5.
133. coluna 7 já tem dois círculo (L5C7, L6C7); exclua círculo de L1C7.
134. coluna 7 já tem dois círculo (L5C7, L6C7); exclua círculo de L2C7.
135. coluna 8 já tem dois círculo (L3C8, L4C8); exclua círculo de L1C8.
136. coluna 8 já tem dois círculo (L3C8, L4C8); exclua círculo de L2C8.
137. coluna 8 já tem dois círculo (L3C8, L4C8); exclua círculo de L7C8.
138. coluna 8 já tem dois círculo (L3C8, L4C8); exclua círculo de L8C8.
139. Na coluna 8, triângulo só cabe em L1C8 e L2C8; ambas as casas precisam dele.
140. Na coluna 8, triângulo só cabe em L1C8 e L2C8; ambas as casas precisam dele.

## 61. Mestre — pacto-146

**Descoberta:** Entrada evidente, desenvolvimento remoto.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; prevenção de trio; posições restantes; hipótese refutada.

**Origem:** pacto-146; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 22; 135 eliminações explicadas. Refutações: 4, 7, 8 passos.

### Função das pistas

- L1C4: losango — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 18.
- L1C5: quadrado — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L1C7: quadrado — cota saturada; prevenção de isolamento; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L2C2: losango — prevenção de trio; parceiro obrigatório / orientação; primeira participação no passo 103.
- L2C6: círculo — prevenção de isolamento; exclusão junto à dupla; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 19.
- L2C7: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 15.
- L3C7: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 6.
- L3C8: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 6.
- L4C7: losango — prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 51.
- L5C3: círculo — cota saturada; prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 55.
- L6C6: triângulo — parceiro obrigatório / orientação; prevenção de trio; cota saturada; primeira participação no passo 47.
- L7C3: losango — cota saturada; exclusão junto à dupla; primeira participação no passo 114.
- L7C6: quadrado — parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; primeira participação no passo 27.
- L7C7: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 12.
- L8C5: círculo — prevenção de isolamento; posições restantes; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 30.

### Sequência lógica

1. linha 1 já tem dois quadrado (L1C5, L1C7); exclua quadrado de L1C1.
2. linha 1 já tem dois quadrado (L1C5, L1C7); exclua quadrado de L1C2.
3. linha 1 já tem dois quadrado (L1C5, L1C7); exclua quadrado de L1C3.
4. linha 1 já tem dois quadrado (L1C5, L1C7); exclua quadrado de L1C6.
5. linha 1 já tem dois quadrado (L1C5, L1C7); exclua quadrado de L1C8.
6. linha 3 já tem dois triângulo (L3C7, L3C8); exclua triângulo de L3C1.
7. linha 3 já tem dois triângulo (L3C7, L3C8); exclua triângulo de L3C2.
8. linha 3 já tem dois triângulo (L3C7, L3C8); exclua triângulo de L3C3.
9. linha 3 já tem dois triângulo (L3C7, L3C8); exclua triângulo de L3C4.
10. linha 3 já tem dois triângulo (L3C7, L3C8); exclua triângulo de L3C5.
11. linha 3 já tem dois triângulo (L3C7, L3C8); exclua triângulo de L3C6.
12. coluna 7 já tem dois triângulo (L3C7, L7C7); exclua triângulo de L5C7.
13. coluna 7 já tem dois triângulo (L3C7, L7C7); exclua triângulo de L6C7.
14. coluna 7 já tem dois triângulo (L3C7, L7C7); exclua triângulo de L8C7.
15. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L5C7.
16. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L6C7.
17. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L8C7.
18. L1C5 precisa de um parceiro quadrado; só L2C5 pode recebê-lo (vertical).
19. L1C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
20. L1C6 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
21. A dupla L2C5–L1C5 já está fechada; L3C5 não pode tocar essa dupla com outro quadrado.
22. A dupla L2C5–L1C5 já está fechada; L2C4 não pode tocar essa dupla com outro quadrado.
23. A dupla L2C6–L1C6 já está fechada; L3C6 não pode tocar essa dupla com outro círculo.
24. A dupla L2C7–L1C7 já está fechada; L2C8 não pode tocar essa dupla com outro quadrado.
25. A dupla L3C8–L3C7 já está fechada; L2C8 não pode tocar essa dupla com outro triângulo.
26. A dupla L3C8–L3C7 já está fechada; L4C8 não pode tocar essa dupla com outro triângulo.
27. L7C7 precisa de um parceiro triângulo; só L7C8 pode recebê-lo (horizontal).
28. A dupla L7C8–L7C7 já está fechada; L6C8 não pode tocar essa dupla com outro triângulo.
29. A dupla L7C8–L7C7 já está fechada; L8C8 não pode tocar essa dupla com outro triângulo.
30. L8C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
31. L8C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
32. linha 2 já tem dois quadrado (L2C5, L2C7); exclua quadrado de L2C1.
33. linha 2 já tem dois quadrado (L2C5, L2C7); exclua quadrado de L2C3.
34. linha 7 já tem dois triângulo (L7C7, L7C8); exclua triângulo de L7C1.
35. linha 7 já tem dois triângulo (L7C7, L7C8); exclua triângulo de L7C2.
36. linha 7 já tem dois triângulo (L7C7, L7C8); exclua triângulo de L7C4.
37. linha 7 já tem dois triângulo (L7C7, L7C8); exclua triângulo de L7C5.
38. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L4C5.
39. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L5C5.
40. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L6C5.
41. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L7C5.
42. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L4C6.
43. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L5C6.
44. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L8C6.
45. coluna 8 já tem dois triângulo (L3C8, L7C8); exclua triângulo de L1C8.
46. coluna 8 já tem dois triângulo (L3C8, L7C8); exclua triângulo de L5C8.
47. L7C6 precisa de um parceiro quadrado; só L8C6 pode recebê-lo (vertical).
48. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L3C6.
49. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L4C6.
50. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L5C6.
51. L4C6 não pode ser losango: tocaria L3C6 e L4C7, formando um grupo maior que dois.
52. L5C6 não pode ser triângulo: tocaria L4C6 e L6C6, formando um grupo maior que dois.
53. L5C7 não pode ser losango: tocaria L4C7 e L5C6, formando um grupo maior que dois.
54. L6C6 precisa de um parceiro triângulo; só L6C5 pode recebê-lo (horizontal).
55. linha 5 já tem dois círculo (L5C3, L5C7); exclua círculo de L5C1.
56. linha 5 já tem dois círculo (L5C3, L5C7); exclua círculo de L5C2.
57. linha 5 já tem dois círculo (L5C3, L5C7); exclua círculo de L5C4.
58. linha 5 já tem dois círculo (L5C3, L5C7); exclua círculo de L5C5.
59. linha 5 já tem dois círculo (L5C3, L5C7); exclua círculo de L5C8.
60. linha 6 já tem dois triângulo (L6C5, L6C6); exclua triângulo de L6C1.
61. linha 6 já tem dois triângulo (L6C5, L6C6); exclua triângulo de L6C2.
62. linha 6 já tem dois triângulo (L6C5, L6C6); exclua triângulo de L6C3.
63. linha 6 já tem dois triângulo (L6C5, L6C6); exclua triângulo de L6C4.
64. L3C6 precisa de um parceiro losango; só L3C5 pode recebê-lo (horizontal).
65. L4C6 precisa de um parceiro triângulo; só L4C5 pode recebê-lo (horizontal).
66. L4C7 precisa de um parceiro losango; só L4C8 pode recebê-lo (horizontal).
67. A dupla L4C8–L4C7 já está fechada; L5C8 não pode tocar essa dupla com outro losango.
68. L5C5 não pode ser triângulo: tocaria L4C5 e L6C5, formando um grupo maior que dois.
69. A dupla L5C5–L5C6 já está fechada; L5C4 não pode tocar essa dupla com outro losango.
70. L5C7 precisa de um parceiro círculo; só L6C7 pode recebê-lo (vertical).
71. L5C8 precisa de um parceiro quadrado; só L6C8 pode recebê-lo (vertical).
72. linha 3 já tem dois losango (L3C5, L3C6); exclua losango de L3C1.
73. linha 3 já tem dois losango (L3C5, L3C6); exclua losango de L3C2.
74. linha 3 já tem dois losango (L3C5, L3C6); exclua losango de L3C3.
75. linha 3 já tem dois losango (L3C5, L3C6); exclua losango de L3C4.
76. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C1.
77. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C2.
78. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C3.
79. linha 4 já tem dois triângulo (L4C5, L4C6); exclua triângulo de L4C4.
80. linha 4 já tem dois losango (L4C7, L4C8); exclua losango de L4C1.
81. linha 4 já tem dois losango (L4C7, L4C8); exclua losango de L4C2.
82. linha 4 já tem dois losango (L4C7, L4C8); exclua losango de L4C3.
83. linha 4 já tem dois losango (L4C7, L4C8); exclua losango de L4C4.
84. linha 5 já tem dois losango (L5C5, L5C6); exclua losango de L5C1.
85. linha 5 já tem dois losango (L5C5, L5C6); exclua losango de L5C2.
86. Na coluna 5, círculo só cabe em L7C5 e L8C5; ambas as casas precisam dele.
87. coluna 7 já tem dois círculo (L5C7, L6C7); exclua círculo de L8C7.
88. L5C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
89. A dupla L7C5–L8C5 já está fechada; L7C4 não pode tocar essa dupla com outro círculo.
90. A dupla L8C5–L7C5 já está fechada; L8C4 não pode tocar essa dupla com outro círculo.
91. L8C7 precisa de um parceiro losango; só L8C8 pode recebê-lo (horizontal).
92. Na linha 5, triângulo só cabe em L5C1 e L5C2; ambas as casas precisam dele.
93. Na linha 5, triângulo só cabe em L5C1 e L5C2; ambas as casas precisam dele.
94. linha 8 já tem dois losango (L8C7, L8C8); exclua losango de L8C1.
95. linha 8 já tem dois losango (L8C7, L8C8); exclua losango de L8C2.
96. linha 8 já tem dois losango (L8C7, L8C8); exclua losango de L8C3.
97. linha 8 já tem dois losango (L8C7, L8C8); exclua losango de L8C4.
98. Na coluna 4, triângulo só cabe em L2C4 e L8C4; ambas as casas precisam dele.
99. Na coluna 4, triângulo só cabe em L2C4 e L8C4; ambas as casas precisam dele.
100. Na coluna 8, círculo só cabe em L1C8 e L2C8; ambas as casas precisam dele.
101. Na coluna 8, círculo só cabe em L1C8 e L2C8; ambas as casas precisam dele.
102. L1C4 precisa de um parceiro losango; só L1C3 pode recebê-lo (horizontal).
103. L2C3 não pode ser losango: tocaria L1C3 e L2C2, formando um grupo maior que dois.
104. L2C4 precisa de um parceiro triângulo; só L2C3 pode recebê-lo (horizontal).
105. L8C4 precisa de um parceiro triângulo; só L8C3 pode recebê-lo (horizontal).
106. linha 1 já tem dois círculo (L1C6, L1C8); exclua círculo de L1C1.
107. linha 1 já tem dois círculo (L1C6, L1C8); exclua círculo de L1C2.
108. Na linha 1, triângulo só cabe em L1C1 e L1C2; ambas as casas precisam dele.
109. Na linha 1, triângulo só cabe em L1C1 e L1C2; ambas as casas precisam dele.
110. linha 2 já tem dois círculo (L2C6, L2C8); exclua círculo de L2C1.
111. linha 2 já tem dois triângulo (L2C3, L2C4); exclua triângulo de L2C1.
112. linha 8 já tem dois triângulo (L8C3, L8C4); exclua triângulo de L8C1.
113. linha 8 já tem dois triângulo (L8C3, L8C4); exclua triângulo de L8C2.
114. coluna 3 já tem dois losango (L1C3, L7C3); exclua losango de L6C3.
115. Se L3C3 fosse círculo, 4 deduções levariam a: L5C3 fica sem símbolo possível. L5C3 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua círculo.
   - Hipótese, passo 1: coluna 3 já tem dois círculo (L3C3, L5C3); exclua círculo de L4C3.
   - Hipótese, passo 2: coluna 3 já tem dois círculo (L3C3, L5C3); exclua círculo de L6C3.
   - Hipótese, passo 3: L4C4 não pode ser quadrado: tocaria L5C4 e L4C3, formando um grupo maior que dois.
   - Hipótese, passo 4: L5C3 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L5C3 fica sem símbolo possível. L5C3 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
116. Se L3C2 fosse quadrado, 7 deduções levariam a: L4C1 fica sem símbolo possível. L4C1 não pode ser círculo: tocaria L3C1 e L4C2, formando um grupo maior que dois. Portanto, exclua quadrado.
   - Hipótese, passo 1: Na linha 3, círculo só cabe em L3C1 e L3C4; ambas as casas precisam dele.
   - Hipótese, passo 2: Na linha 3, círculo só cabe em L3C1 e L3C4; ambas as casas precisam dele.
   - Hipótese, passo 3: L3C1 precisa de um parceiro círculo; só L4C1 pode recebê-lo (vertical).
   - Hipótese, passo 4: A dupla L3C2–L3C3 já está fechada; L4C2 não pode tocar essa dupla com outro quadrado.
   - Hipótese, passo 5: A dupla L3C3–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro quadrado.
   - Hipótese, passo 6: L3C4 precisa de um parceiro círculo; só L4C4 pode recebê-lo (vertical).
   - Hipótese, passo 7: L4C1 não pode ser círculo: tocaria L3C1 e L4C2, formando um grupo maior que dois.
   - Contradição final: L4C1 fica sem símbolo possível. L4C1 não pode ser círculo: tocaria L3C1 e L4C2, formando um grupo maior que dois.
117. Se L3C1 fosse círculo, 8 deduções levariam a: L4C3 fica sem símbolo possível. L4C3 não pode ser círculo: tocaria L5C3 e L4C4, formando um grupo maior que dois. Portanto, exclua círculo.
   - Hipótese, passo 1: linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C4.
   - Hipótese, passo 2: Na coluna 4, círculo só cabe em L4C4 e L6C4; ambas as casas precisam dele.
   - Hipótese, passo 3: Na coluna 4, círculo só cabe em L4C4 e L6C4; ambas as casas precisam dele.
   - Hipótese, passo 4: coluna 4 já tem dois quadrado (L3C4, L5C4); exclua quadrado de L7C4.
   - Hipótese, passo 5: A dupla L3C1–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro círculo.
   - Hipótese, passo 6: A dupla L3C2–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
   - Hipótese, passo 7: A dupla L3C3–L3C4 já está fechada; L4C3 não pode tocar essa dupla com outro quadrado.
   - Hipótese, passo 8: L4C3 não pode ser círculo: tocaria L5C3 e L4C4, formando um grupo maior que dois.
   - Contradição final: L4C3 fica sem símbolo possível. L4C3 não pode ser círculo: tocaria L5C3 e L4C4, formando um grupo maior que dois.
118. Na linha 3, círculo só cabe em L3C2 e L3C4; ambas as casas precisam dele.
119. L3C1 precisa de um parceiro quadrado; só L4C1 pode recebê-lo (vertical).
120. L3C2 precisa de um parceiro círculo; só L4C2 pode recebê-lo (vertical).
121. L3C3 precisa de um parceiro quadrado; só L4C3 pode recebê-lo (vertical).
122. L3C4 precisa de um parceiro círculo; só L4C4 pode recebê-lo (vertical).
123. L5C3 precisa de um parceiro círculo; só L6C3 pode recebê-lo (vertical).
124. L5C4 precisa de um parceiro quadrado; só L6C4 pode recebê-lo (vertical).
125. A dupla L6C3–L5C3 já está fechada; L6C2 não pode tocar essa dupla com outro círculo.
126. A dupla L6C4–L5C4 já está fechada; L7C4 não pode tocar essa dupla com outro quadrado.
127. A dupla L7C3–L7C4 já está fechada; L7C2 não pode tocar essa dupla com outro losango.
128. linha 6 já tem dois círculo (L6C3, L6C7); exclua círculo de L6C1.
129. linha 6 já tem dois quadrado (L6C4, L6C8); exclua quadrado de L6C1.
130. linha 6 já tem dois quadrado (L6C4, L6C8); exclua quadrado de L6C2.
131. linha 7 já tem dois losango (L7C3, L7C4); exclua losango de L7C1.
132. Na coluna 1, círculo só cabe em L7C1 e L8C1; ambas as casas precisam dele.
133. Na coluna 1, círculo só cabe em L7C1 e L8C1; ambas as casas precisam dele.
134. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L7C2.
135. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L8C2.

## 62. Mestre — pacto-166

**Descoberta:** Orientações encadeadas entre linhas e colunas.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; prevenção de trio; prevenção de isolamento; exclusão junto à dupla; posições restantes; hipótese refutada.

**Origem:** pacto-166; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 11; 53 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 22; 143 eliminações explicadas. Refutações: 10 passos.

### Função das pistas

- L1C2: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 6.
- L1C5: losango — prevenção de isolamento; cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 35.
- L2C4: quadrado — prevenção de isolamento; cota saturada; primeira participação no passo 35.
- L3C2: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 6.
- L6C3: círculo — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; primeira participação no passo 11.
- L6C4: triângulo — parceiro obrigatório / orientação; prevenção de trio; cota saturada; primeira participação no passo 11.
- L7C3: triângulo — parceiro obrigatório / orientação; prevenção de trio; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 11.
- L7C7: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 65.
- L8C2: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L8C5: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 48.
- L8C8: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.

### Sequência lógica

1. linha 8 já tem dois quadrado (L8C2, L8C8); exclua quadrado de L8C1.
2. linha 8 já tem dois quadrado (L8C2, L8C8); exclua quadrado de L8C3.
3. linha 8 já tem dois quadrado (L8C2, L8C8); exclua quadrado de L8C4.
4. linha 8 já tem dois quadrado (L8C2, L8C8); exclua quadrado de L8C6.
5. linha 8 já tem dois quadrado (L8C2, L8C8); exclua quadrado de L8C7.
6. coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L2C2.
7. coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L4C2.
8. coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L5C2.
9. coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L6C2.
10. coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L7C2.
11. L6C3 precisa de um parceiro círculo; só L5C3 pode recebê-lo (vertical).
12. L7C4 não pode ser triângulo: tocaria L6C4 e L7C3, formando um grupo maior que dois.
13. L8C2 precisa de um parceiro quadrado; só L7C2 pode recebê-lo (vertical).
14. L8C8 precisa de um parceiro quadrado; só L7C8 pode recebê-lo (vertical).
15. linha 7 já tem dois quadrado (L7C2, L7C8); exclua quadrado de L7C1.
16. linha 7 já tem dois quadrado (L7C2, L7C8); exclua quadrado de L7C4.
17. linha 7 já tem dois quadrado (L7C2, L7C8); exclua quadrado de L7C5.
18. linha 7 já tem dois quadrado (L7C2, L7C8); exclua quadrado de L7C6.
19. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L2C2.
20. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L4C2.
21. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L5C2.
22. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L6C2.
23. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L1C3.
24. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L2C3.
25. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L3C3.
26. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L4C3.
27. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L8C3.
28. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L1C8.
29. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L2C8.
30. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L3C8.
31. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L4C8.
32. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L5C8.
33. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L6C8.
34. L1C2 precisa de um parceiro círculo; só L1C1 pode recebê-lo (horizontal).
35. L1C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
36. L3C2 precisa de um parceiro círculo; só L3C1 pode recebê-lo (horizontal).
37. A dupla L5C3–L6C3 já está fechada; L5C4 não pode tocar essa dupla com outro círculo.
38. L7C3 precisa de um parceiro triângulo; só L8C3 pode recebê-lo (vertical).
39. A dupla L8C3–L7C3 já está fechada; L8C4 não pode tocar essa dupla com outro triângulo.
40. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C6.
41. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C7.
42. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C8.
43. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C4.
44. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C5.
45. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C6.
46. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C7.
47. linha 3 já tem dois círculo (L3C1, L3C2); exclua círculo de L3C8.
48. linha 8 já tem dois triângulo (L8C3, L8C5); exclua triângulo de L8C1.
49. linha 8 já tem dois triângulo (L8C3, L8C5); exclua triângulo de L8C6.
50. linha 8 já tem dois triângulo (L8C3, L8C5); exclua triângulo de L8C7.
51. coluna 1 já tem dois círculo (L1C1, L3C1); exclua círculo de L2C1.
52. coluna 1 já tem dois círculo (L1C1, L3C1); exclua círculo de L4C1.
53. coluna 1 já tem dois círculo (L1C1, L3C1); exclua círculo de L5C1.
54. coluna 1 já tem dois círculo (L1C1, L3C1); exclua círculo de L6C1.
55. coluna 1 já tem dois círculo (L1C1, L3C1); exclua círculo de L7C1.
56. coluna 1 já tem dois círculo (L1C1, L3C1); exclua círculo de L8C1.
57. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L1C3.
58. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L2C3.
59. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L3C3.
60. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L4C3.
61. L1C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
62. L2C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
63. L8C1 precisa de um parceiro losango; só L7C1 pode recebê-lo (vertical).
64. L8C5 precisa de um parceiro triângulo; só L7C5 pode recebê-lo (vertical).
65. Na linha 7, círculo só cabe em L7C4 e L7C6; ambas as casas precisam dele.
66. Na linha 7, círculo só cabe em L7C4 e L7C6; ambas as casas precisam dele.
67. coluna 1 já tem dois losango (L7C1, L8C1); exclua losango de L2C1.
68. coluna 1 já tem dois losango (L7C1, L8C1); exclua losango de L4C1.
69. coluna 1 já tem dois losango (L7C1, L8C1); exclua losango de L5C1.
70. coluna 1 já tem dois losango (L7C1, L8C1); exclua losango de L6C1.
71. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L2C5.
72. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L3C5.
73. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L4C5.
74. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L5C5.
75. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L6C5.
76. L2C1 precisa de um parceiro triângulo; só L2C2 pode recebê-lo (horizontal).
77. L6C4 precisa de um parceiro triângulo; só L5C4 pode recebê-lo (vertical).
78. L7C4 precisa de um parceiro círculo; só L8C4 pode recebê-lo (vertical).
79. linha 2 já tem dois triângulo (L2C1, L2C2); exclua triângulo de L2C6.
80. linha 2 já tem dois triângulo (L2C1, L2C2); exclua triângulo de L2C7.
81. linha 2 já tem dois triângulo (L2C1, L2C2); exclua triângulo de L2C8.
82. coluna 4 já tem dois círculo (L7C4, L8C4); exclua círculo de L4C4.
83. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L3C4.
84. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L4C4.
85. Se L1C3 fosse quadrado, 10 deduções levariam a: L4C3 fica sem símbolo possível. L4C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua quadrado.
   - Hipótese, passo 1: L1C4 não pode ser quadrado: tocaria L2C4 e L1C3, formando um grupo maior que dois.
   - Hipótese, passo 2: A dupla L1C5–L1C4 já está fechada; L2C5 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 3: A dupla L1C5–L1C4 já está fechada; L1C6 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 4: L2C3 não pode ser quadrado: tocaria L1C3 e L2C4, formando um grupo maior que dois.
   - Hipótese, passo 5: L2C3 precisa de um parceiro losango; só L3C3 pode recebê-lo (vertical).
   - Hipótese, passo 6: A dupla L3C3–L2C3 já está fechada; L4C3 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 7: A dupla L3C3–L2C3 já está fechada; L3C4 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 8: A dupla L3C4–L2C4 já está fechada; L4C4 não pode tocar essa dupla com outro quadrado.
   - Hipótese, passo 9: A dupla L3C4–L2C4 já está fechada; L3C5 não pode tocar essa dupla com outro quadrado.
   - Hipótese, passo 10: L4C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L4C3 fica sem símbolo possível. L4C3 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
86. linha 1 já tem dois losango (L1C3, L1C5); exclua losango de L1C4.
87. linha 1 já tem dois losango (L1C3, L1C5); exclua losango de L1C6.
88. linha 1 já tem dois losango (L1C3, L1C5); exclua losango de L1C7.
89. linha 1 já tem dois losango (L1C3, L1C5); exclua losango de L1C8.
90. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L3C4.
91. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L4C4.
92. L1C3 precisa de um parceiro losango; só L2C3 pode recebê-lo (vertical).
93. L1C5 precisa de um parceiro losango; só L2C5 pode recebê-lo (vertical).
94. L1C8 precisa de um parceiro triângulo; só L1C7 pode recebê-lo (horizontal).
95. A dupla L2C3–L1C3 já está fechada; L3C3 não pode tocar essa dupla com outro losango.
96. A dupla L2C5–L1C5 já está fechada; L3C5 não pode tocar essa dupla com outro losango.
97. A dupla L2C5–L1C5 já está fechada; L2C6 não pode tocar essa dupla com outro losango.
98. L3C3 precisa de um parceiro quadrado; só L4C3 pode recebê-lo (vertical).
99. A dupla L4C4–L3C4 já está fechada; L4C5 não pode tocar essa dupla com outro losango.
100. linha 1 já tem dois triângulo (L1C7, L1C8); exclua triângulo de L1C6.
101. linha 2 já tem dois losango (L2C3, L2C5); exclua losango de L2C7.
102. linha 2 já tem dois losango (L2C3, L2C5); exclua losango de L2C8.
103. linha 3 já tem dois quadrado (L3C3, L3C5); exclua quadrado de L3C6.
104. linha 3 já tem dois quadrado (L3C3, L3C5); exclua quadrado de L3C7.
105. coluna 5 já tem dois losango (L1C5, L2C5); exclua losango de L5C5.
106. coluna 5 já tem dois losango (L1C5, L2C5); exclua losango de L6C5.
107. L1C6 precisa de um parceiro quadrado; só L2C6 pode recebê-lo (vertical).
108. A dupla L2C6–L1C6 já está fechada; L2C7 não pode tocar essa dupla com outro quadrado.
109. L3C5 precisa de um parceiro quadrado; só L4C5 pode recebê-lo (vertical).
110. A dupla L4C5–L3C5 já está fechada; L5C5 não pode tocar essa dupla com outro quadrado.
111. A dupla L4C5–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro quadrado.
112. linha 4 já tem dois quadrado (L4C3, L4C5); exclua quadrado de L4C1.
113. linha 4 já tem dois quadrado (L4C3, L4C5); exclua quadrado de L4C7.
114. linha 5 já tem dois círculo (L5C3, L5C5); exclua círculo de L5C6.
115. linha 5 já tem dois círculo (L5C3, L5C5); exclua círculo de L5C7.
116. linha 5 já tem dois círculo (L5C3, L5C5); exclua círculo de L5C8.
117. coluna 1 já tem dois triângulo (L2C1, L4C1); exclua triângulo de L5C1.
118. coluna 1 já tem dois triângulo (L2C1, L4C1); exclua triângulo de L6C1.
119. Na coluna 5, círculo só cabe em L5C5 e L6C5; ambas as casas precisam dele.
120. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L5C6.
121. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L6C6.
122. Na coluna 7, quadrado só cabe em L5C7 e L6C7; ambas as casas precisam dele.
123. Na coluna 7, quadrado só cabe em L5C7 e L6C7; ambas as casas precisam dele.
124. L4C1 precisa de um parceiro triângulo; só L4C2 pode recebê-lo (horizontal).
125. A dupla L4C2–L4C1 já está fechada; L5C2 não pode tocar essa dupla com outro triângulo.
126. L5C2 precisa de um parceiro losango; só L6C2 pode recebê-lo (vertical).
127. A dupla L6C5–L5C5 já está fechada; L6C6 não pode tocar essa dupla com outro círculo.
128. L6C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
129. L7C6 precisa de um parceiro círculo; só L8C6 pode recebê-lo (vertical).
130. L7C7 precisa de um parceiro losango; só L8C7 pode recebê-lo (vertical).
131. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C6.
132. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C7.
133. linha 4 já tem dois triângulo (L4C1, L4C2); exclua triângulo de L4C8.
134. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L4C6.
135. Na coluna 7, círculo só cabe em L2C7 e L4C7; ambas as casas precisam dele.
136. Na coluna 7, triângulo só cabe em L1C7 e L3C7; ambas as casas precisam dele.
137. Na coluna 8, círculo só cabe em L2C8 e L4C8; ambas as casas precisam dele.
138. L3C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
139. linha 3 já tem dois triângulo (L3C7, L3C8); exclua triângulo de L3C6.
140. Na coluna 6, triângulo só cabe em L5C6 e L6C6; ambas as casas precisam dele.
141. Na coluna 6, triângulo só cabe em L5C6 e L6C6; ambas as casas precisam dele.
142. coluna 8 já tem dois triângulo (L1C8, L3C8); exclua triângulo de L5C8.
143. coluna 8 já tem dois triângulo (L1C8, L3C8); exclua triângulo de L6C8.

## 63. Mestre — pacto-v2-201

**Descoberta:** Compacto: hipótese curta necessária apesar das pistas.

**Técnicas combinadas:** cota saturada; hipótese refutada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes.

**Origem:** pacto-177; recomposição de pistas; 25 pistas alteradas. **Pistas:** 38; 26 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 16; 73 eliminações explicadas. Refutações: 7 passos.

### Função das pistas

- L1C1: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L1C2: losango — cota saturada; primeira participação no passo 56.
- L1C3: losango — cota saturada; primeira participação no passo 33.
- L1C4: quadrado — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L1C5: círculo — cota saturada; primeira participação no passo 34.
- L1C6: quadrado — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L1C7: triângulo — posições restantes; primeira participação no passo 57.
- L1C8: triângulo — posições restantes; primeira participação no passo 58.
- L2C1: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L2C2: triângulo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L2C3: triângulo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L2C4: quadrado — parceiro obrigatório / orientação; primeira participação no passo 38.
- L2C5: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 34.
- L2C6: quadrado — parceiro obrigatório / orientação; primeira participação no passo 40.
- L2C7: losango — posições restantes; primeira participação no passo 57.
- L2C8: losango — posições restantes; primeira participação no passo 58.
- L3C1: triângulo — cota saturada; primeira participação no passo 37.
- L3C2: círculo — cota saturada; primeira participação no passo 1.
- L3C3: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L3C4: losango — parceiro obrigatório / orientação; cota saturada; primeira participação no passo 38.
- L3C7: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 3.
- L3C8: quadrado — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 3.
- L4C1: triângulo — posições restantes; primeira participação no passo 46.
- L4C2: quadrado — cota saturada; posições restantes; primeira participação no passo 5.
- L4C3: quadrado — cota saturada; posições restantes; primeira participação no passo 5.
- L5C1: losango — cota saturada; posições restantes; primeira participação no passo 14.
- L5C5: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 14.
- L5C7: quadrado — cota saturada; posições restantes; primeira participação no passo 10.
- L5C8: quadrado — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 10.
- L6C1: losango — cota saturada; primeira participação no passo 48.
- L6C2: quadrado — cota saturada; primeira participação no passo 18.
- L6C3: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 18.
- L7C1: quadrado — cota saturada; posições restantes; primeira participação no passo 23.
- L7C3: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 33.
- L7C5: quadrado — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 23.
- L8C1: quadrado — cota saturada; primeira participação no passo 28.
- L8C5: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 28.
- L8C6: círculo — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; primeira participação no passo 59.

### Sequência lógica

1. linha 3 já tem dois círculo (L3C2, L3C3); exclua círculo de L3C5.
2. linha 3 já tem dois círculo (L3C2, L3C3); exclua círculo de L3C6.
3. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C5.
4. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C6.
5. linha 4 já tem dois quadrado (L4C2, L4C3); exclua quadrado de L4C4.
6. linha 4 já tem dois quadrado (L4C2, L4C3); exclua quadrado de L4C5.
7. linha 4 já tem dois quadrado (L4C2, L4C3); exclua quadrado de L4C6.
8. linha 4 já tem dois quadrado (L4C2, L4C3); exclua quadrado de L4C7.
9. linha 4 já tem dois quadrado (L4C2, L4C3); exclua quadrado de L4C8.
10. linha 5 já tem dois quadrado (L5C7, L5C8); exclua quadrado de L5C2.
11. linha 5 já tem dois quadrado (L5C7, L5C8); exclua quadrado de L5C3.
12. linha 5 já tem dois quadrado (L5C7, L5C8); exclua quadrado de L5C4.
13. linha 5 já tem dois quadrado (L5C7, L5C8); exclua quadrado de L5C6.
14. linha 5 já tem dois losango (L5C1, L5C5); exclua losango de L5C2.
15. linha 5 já tem dois losango (L5C1, L5C5); exclua losango de L5C3.
16. linha 5 já tem dois losango (L5C1, L5C5); exclua losango de L5C4.
17. linha 5 já tem dois losango (L5C1, L5C5); exclua losango de L5C6.
18. linha 6 já tem dois quadrado (L6C2, L6C3); exclua quadrado de L6C4.
19. linha 6 já tem dois quadrado (L6C2, L6C3); exclua quadrado de L6C5.
20. linha 6 já tem dois quadrado (L6C2, L6C3); exclua quadrado de L6C6.
21. linha 6 já tem dois quadrado (L6C2, L6C3); exclua quadrado de L6C7.
22. linha 6 já tem dois quadrado (L6C2, L6C3); exclua quadrado de L6C8.
23. linha 7 já tem dois quadrado (L7C1, L7C5); exclua quadrado de L7C2.
24. linha 7 já tem dois quadrado (L7C1, L7C5); exclua quadrado de L7C4.
25. linha 7 já tem dois quadrado (L7C1, L7C5); exclua quadrado de L7C6.
26. linha 7 já tem dois quadrado (L7C1, L7C5); exclua quadrado de L7C7.
27. linha 7 já tem dois quadrado (L7C1, L7C5); exclua quadrado de L7C8.
28. linha 8 já tem dois quadrado (L8C1, L8C5); exclua quadrado de L8C2.
29. linha 8 já tem dois quadrado (L8C1, L8C5); exclua quadrado de L8C3.
30. linha 8 já tem dois quadrado (L8C1, L8C5); exclua quadrado de L8C4.
31. linha 8 já tem dois quadrado (L8C1, L8C5); exclua quadrado de L8C7.
32. linha 8 já tem dois quadrado (L8C1, L8C5); exclua quadrado de L8C8.
33. coluna 3 já tem dois losango (L1C3, L7C3); exclua losango de L8C3.
34. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L4C5.
35. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L6C5.
36. Se L3C5 fosse losango, 7 deduções levariam a: L4C6 fica sem símbolo possível. L4C6 não pode ser triângulo: tocaria L3C6 e L4C5, formando um grupo maior que dois. Portanto, exclua losango.
   - Hipótese, passo 1: Na linha 3, triângulo só cabe em L3C1 e L3C6; ambas as casas precisam dele.
   - Hipótese, passo 2: Na coluna 5, triângulo só cabe em L4C5 e L6C5; ambas as casas precisam dele.
   - Hipótese, passo 3: Na coluna 5, triângulo só cabe em L4C5 e L6C5; ambas as casas precisam dele.
   - Hipótese, passo 4: A dupla L3C4–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 5: L3C6 precisa de um parceiro triângulo; só L4C6 pode recebê-lo (vertical).
   - Hipótese, passo 6: A dupla L4C5–L4C6 já está fechada; L4C4 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 7: L4C6 não pode ser triângulo: tocaria L3C6 e L4C5, formando um grupo maior que dois.
   - Contradição final: L4C6 fica sem símbolo possível. L4C6 não pode ser triângulo: tocaria L3C6 e L4C5, formando um grupo maior que dois.
37. linha 3 já tem dois triângulo (L3C1, L3C5); exclua triângulo de L3C6.
38. L3C4 precisa de um parceiro losango; só L4C4 pode recebê-lo (vertical).
39. L3C5 precisa de um parceiro triângulo; só L4C5 pode recebê-lo (vertical).
40. L3C6 precisa de um parceiro losango; só L4C6 pode recebê-lo (vertical).
41. A dupla L4C6–L3C6 já está fechada; L4C7 não pode tocar essa dupla com outro losango.
42. L4C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
43. L5C5 precisa de um parceiro losango; só L6C5 pode recebê-lo (vertical).
44. A dupla L6C5–L5C5 já está fechada; L6C4 não pode tocar essa dupla com outro losango.
45. A dupla L6C5–L5C5 já está fechada; L6C6 não pode tocar essa dupla com outro losango.
46. Na linha 4, círculo só cabe em L4C7 e L4C8; ambas as casas precisam dele.
47. Na linha 4, círculo só cabe em L4C7 e L4C8; ambas as casas precisam dele.
48. linha 6 já tem dois losango (L6C1, L6C5); exclua losango de L6C7.
49. linha 6 já tem dois losango (L6C1, L6C5); exclua losango de L6C8.
50. coluna 4 já tem dois losango (L3C4, L4C4); exclua losango de L7C4.
51. coluna 4 já tem dois losango (L3C4, L4C4); exclua losango de L8C4.
52. coluna 6 já tem dois losango (L3C6, L4C6); exclua losango de L7C6.
53. L7C3 precisa de um parceiro losango; só L7C2 pode recebê-lo (horizontal).
54. linha 7 já tem dois losango (L7C2, L7C3); exclua losango de L7C7.
55. linha 7 já tem dois losango (L7C2, L7C3); exclua losango de L7C8.
56. coluna 2 já tem dois losango (L1C2, L7C2); exclua losango de L8C2.
57. Na coluna 7, losango só cabe em L2C7 e L8C7; ambas as casas precisam dele.
58. Na coluna 8, losango só cabe em L2C8 e L8C8; ambas as casas precisam dele.
59. L8C6 precisa de um parceiro círculo; só L7C6 pode recebê-lo (vertical).
60. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L5C6.
61. coluna 6 já tem dois círculo (L7C6, L8C6); exclua círculo de L6C6.
62. A dupla L6C6–L5C6 já está fechada; L6C7 não pode tocar essa dupla com outro triângulo.
63. A dupla L7C6–L8C6 já está fechada; L7C7 não pode tocar essa dupla com outro círculo.
64. L7C7 precisa de um parceiro triângulo; só L7C8 pode recebê-lo (horizontal).
65. A dupla L7C8–L7C7 já está fechada; L6C8 não pode tocar essa dupla com outro triângulo.
66. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C4.
67. Na linha 7, círculo só cabe em L7C4 e L7C6; ambas as casas precisam dele.
68. L6C4 precisa de um parceiro triângulo; só L5C4 pode recebê-lo (vertical).
69. L7C4 precisa de um parceiro círculo; só L8C4 pode recebê-lo (vertical).
70. A dupla L8C4–L7C4 já está fechada; L8C3 não pode tocar essa dupla com outro círculo.
71. Na linha 5, círculo só cabe em L5C2 e L5C3; ambas as casas precisam dele.
72. Na linha 5, círculo só cabe em L5C2 e L5C3; ambas as casas precisam dele.
73. linha 8 já tem dois círculo (L8C4, L8C6); exclua círculo de L8C2.

## 64. Mestre — pacto-104

**Descoberta:** Entrada evidente, desenvolvimento remoto.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes.

**Origem:** pacto-104; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 24; 124 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C4: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 17.
- L1C5: círculo — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 25.
- L2C4: quadrado — parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 25.
- L3C3: círculo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L3C6: círculo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L4C1: triângulo — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 70.
- L4C6: círculo — cota saturada; exclusão junto à dupla; posições restantes; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 21.
- L5C2: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 67.
- L5C3: triângulo — cota saturada; exclusão junto à dupla; posições restantes; prevenção de isolamento; primeira participação no passo 7.
- L5C4: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L7C6: losango — prevenção de isolamento; posições restantes; exclusão junto à dupla; primeira participação no passo 32.
- L7C8: triângulo — prevenção de isolamento; cota saturada; posições restantes; primeira participação no passo 34.
- L8C4: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 12.
- L8C5: quadrado — parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; cota saturada; primeira participação no passo 31.
- L8C7: círculo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 12.

### Sequência lógica

1. linha 3 já tem dois círculo (L3C3, L3C6); exclua círculo de L3C1.
2. linha 3 já tem dois círculo (L3C3, L3C6); exclua círculo de L3C2.
3. linha 3 já tem dois círculo (L3C3, L3C6); exclua círculo de L3C4.
4. linha 3 já tem dois círculo (L3C3, L3C6); exclua círculo de L3C5.
5. linha 3 já tem dois círculo (L3C3, L3C6); exclua círculo de L3C7.
6. linha 3 já tem dois círculo (L3C3, L3C6); exclua círculo de L3C8.
7. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C1.
8. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C5.
9. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C6.
10. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C7.
11. linha 5 já tem dois triângulo (L5C3, L5C4); exclua triângulo de L5C8.
12. linha 8 já tem dois círculo (L8C4, L8C7); exclua círculo de L8C1.
13. linha 8 já tem dois círculo (L8C4, L8C7); exclua círculo de L8C2.
14. linha 8 já tem dois círculo (L8C4, L8C7); exclua círculo de L8C3.
15. linha 8 já tem dois círculo (L8C4, L8C7); exclua círculo de L8C6.
16. linha 8 já tem dois círculo (L8C4, L8C7); exclua círculo de L8C8.
17. coluna 4 já tem dois triângulo (L1C4, L5C4); exclua triângulo de L3C4.
18. coluna 4 já tem dois triângulo (L1C4, L5C4); exclua triângulo de L4C4.
19. coluna 4 já tem dois triângulo (L1C4, L5C4); exclua triângulo de L6C4.
20. coluna 4 já tem dois triângulo (L1C4, L5C4); exclua triângulo de L7C4.
21. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L1C6.
22. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L2C6.
23. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L5C6.
24. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L6C6.
25. L1C4 precisa de um parceiro triângulo; só L1C3 pode recebê-lo (horizontal).
26. L1C5 precisa de um parceiro círculo; só L2C5 pode recebê-lo (vertical).
27. A dupla L4C6–L3C6 já está fechada; L4C5 não pode tocar essa dupla com outro círculo.
28. A dupla L4C6–L3C6 já está fechada; L4C7 não pode tocar essa dupla com outro círculo.
29. A dupla L5C3–L5C4 já está fechada; L4C3 não pode tocar essa dupla com outro triângulo.
30. A dupla L5C3–L5C4 já está fechada; L6C3 não pode tocar essa dupla com outro triângulo.
31. L8C4 precisa de um parceiro círculo; só L7C4 pode recebê-lo (vertical).
32. L8C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
33. L8C7 precisa de um parceiro círculo; só L7C7 pode recebê-lo (vertical).
34. L8C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
35. L8C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
36. linha 1 já tem dois triângulo (L1C3, L1C4); exclua triângulo de L1C1.
37. linha 1 já tem dois triângulo (L1C3, L1C4); exclua triângulo de L1C2.
38. linha 1 já tem dois triângulo (L1C3, L1C4); exclua triângulo de L1C6.
39. linha 1 já tem dois triângulo (L1C3, L1C4); exclua triângulo de L1C7.
40. linha 1 já tem dois triângulo (L1C3, L1C4); exclua triângulo de L1C8.
41. linha 7 já tem dois círculo (L7C4, L7C7); exclua círculo de L7C1.
42. linha 7 já tem dois círculo (L7C4, L7C7); exclua círculo de L7C2.
43. linha 7 já tem dois círculo (L7C4, L7C7); exclua círculo de L7C3.
44. linha 7 já tem dois círculo (L7C4, L7C7); exclua círculo de L7C5.
45. coluna 3 já tem dois triângulo (L1C3, L5C3); exclua triângulo de L2C3.
46. coluna 3 já tem dois triângulo (L1C3, L5C3); exclua triângulo de L7C3.
47. coluna 3 já tem dois triângulo (L1C3, L5C3); exclua triângulo de L8C3.
48. coluna 4 já tem dois círculo (L7C4, L8C4); exclua círculo de L4C4.
49. coluna 4 já tem dois círculo (L7C4, L8C4); exclua círculo de L6C4.
50. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L5C5.
51. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L6C5.
52. Na coluna 6, triângulo só cabe em L2C6 e L6C6; ambas as casas precisam dele.
53. Na coluna 6, triângulo só cabe em L2C6 e L6C6; ambas as casas precisam dele.
54. coluna 7 já tem dois círculo (L7C7, L8C7); exclua círculo de L1C7.
55. coluna 7 já tem dois círculo (L7C7, L8C7); exclua círculo de L2C7.
56. coluna 7 já tem dois círculo (L7C7, L8C7); exclua círculo de L5C7.
57. coluna 7 já tem dois círculo (L7C7, L8C7); exclua círculo de L6C7.
58. coluna 8 já tem dois triângulo (L7C8, L8C8); exclua triângulo de L2C8.
59. coluna 8 já tem dois triângulo (L7C8, L8C8); exclua triângulo de L3C8.
60. coluna 8 já tem dois triângulo (L7C8, L8C8); exclua triângulo de L4C8.
61. coluna 8 já tem dois triângulo (L7C8, L8C8); exclua triângulo de L6C8.
62. L2C6 precisa de um parceiro triângulo; só L2C7 pode recebê-lo (horizontal).
63. A dupla L2C7–L2C6 já está fechada; L3C7 não pode tocar essa dupla com outro triângulo.
64. L4C7 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
65. linha 2 já tem dois triângulo (L2C6, L2C7); exclua triângulo de L2C1.
66. linha 2 já tem dois triângulo (L2C6, L2C7); exclua triângulo de L2C2.
67. Na linha 5, círculo só cabe em L5C1 e L5C8; ambas as casas precisam dele.
68. Na linha 5, círculo só cabe em L5C1 e L5C8; ambas as casas precisam dele.
69. Na coluna 7, triângulo só cabe em L2C7 e L6C7; ambas as casas precisam dele.
70. L5C1 precisa de um parceiro círculo; só L6C1 pode recebê-lo (vertical).
71. A dupla L6C1–L5C1 já está fechada; L6C2 não pode tocar essa dupla com outro círculo.
72. L6C3 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
73. A dupla L6C6–L6C7 já está fechada; L6C5 não pode tocar essa dupla com outro triângulo.
74. L6C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
75. L6C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
76. L7C5 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
77. linha 6 já tem dois triângulo (L6C6, L6C7); exclua triângulo de L6C2.
78. coluna 1 já tem dois círculo (L5C1, L6C1); exclua círculo de L1C1.
79. coluna 1 já tem dois círculo (L5C1, L6C1); exclua círculo de L2C1.
80. Na coluna 5, triângulo só cabe em L3C5 e L4C5; ambas as casas precisam dele.
81. Na coluna 5, triângulo só cabe em L3C5 e L4C5; ambas as casas precisam dele.
82. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L1C8.
83. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L2C8.
84. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L4C8.
85. Na linha 1, círculo só cabe em L1C2 e L1C5; ambas as casas precisam dele.
86. linha 4 já tem dois triângulo (L4C1, L4C5); exclua triângulo de L4C2.
87. L1C2 precisa de um parceiro círculo; só L2C2 pode recebê-lo (vertical).
88. A dupla L2C2–L1C2 já está fechada; L2C3 não pode tocar essa dupla com outro círculo.
89. L2C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
90. A dupla L2C4–L2C3 já está fechada; L3C4 não pode tocar essa dupla com outro quadrado.
91. L3C3 precisa de um parceiro círculo; só L4C3 pode recebê-lo (vertical).
92. L3C4 precisa de um parceiro losango; só L4C4 pode recebê-lo (vertical).
93. L4C1 precisa de um parceiro triângulo; só L3C1 pode recebê-lo (vertical).
94. A dupla L4C3–L3C3 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
95. linha 2 já tem dois quadrado (L2C3, L2C4); exclua quadrado de L2C1.
96. linha 2 já tem dois quadrado (L2C3, L2C4); exclua quadrado de L2C8.
97. linha 3 já tem dois triângulo (L3C1, L3C5); exclua triângulo de L3C2.
98. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L7C1.
99. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L8C1.
100. Na coluna 2, triângulo só cabe em L7C2 e L8C2; ambas as casas precisam dele.
101. Na coluna 2, triângulo só cabe em L7C2 e L8C2; ambas as casas precisam dele.
102. Na coluna 4, quadrado só cabe em L2C4 e L6C4; ambas as casas precisam dele.
103. L1C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
104. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
105. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
106. linha 8 já tem dois quadrado (L8C1, L8C5); exclua quadrado de L8C3.
107. linha 8 já tem dois quadrado (L8C1, L8C5); exclua quadrado de L8C6.
108. Na coluna 6, quadrado só cabe em L1C6 e L5C6; ambas as casas precisam dele.
109. Na coluna 6, quadrado só cabe em L1C6 e L5C6; ambas as casas precisam dele.
110. L1C6 precisa de um parceiro quadrado; só L1C7 pode recebê-lo (horizontal).
111. A dupla L1C7–L1C6 já está fechada; L1C8 não pode tocar essa dupla com outro quadrado.
112. A dupla L2C8–L1C8 já está fechada; L3C8 não pode tocar essa dupla com outro losango.
113. A dupla L7C6–L8C6 já está fechada; L7C5 não pode tocar essa dupla com outro losango.
114. L8C3 precisa de um parceiro losango; só L7C3 pode recebê-lo (vertical).
115. Na coluna 3, quadrado só cabe em L2C3 e L6C3; ambas as casas precisam dele.
116. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L5C5.
117. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L6C5.
118. Na coluna 8, quadrado só cabe em L3C8 e L4C8; ambas as casas precisam dele.
119. A dupla L3C8–L4C8 já está fechada; L3C7 não pode tocar essa dupla com outro quadrado.
120. A dupla L4C8–L3C8 já está fechada; L4C7 não pode tocar essa dupla com outro quadrado.
121. L5C6 precisa de um parceiro quadrado; só L5C7 pode recebê-lo (horizontal).
122. A dupla L6C3–L6C4 já está fechada; L6C2 não pode tocar essa dupla com outro quadrado.
123. Na linha 3, quadrado só cabe em L3C2 e L3C8; ambas as casas precisam dele.
124. Na linha 4, quadrado só cabe em L4C2 e L4C8; ambas as casas precisam dele.

## 65. Mestre — pacto-107

**Descoberta:** Orientações encadeadas entre linhas e colunas.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; hipótese refutada; prevenção de trio.

**Origem:** pacto-107; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 24; 128 eliminações explicadas. Refutações: 3 passos.

### Função das pistas

- L1C1: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 10.
- L2C3: quadrado — posições restantes; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 45.
- L2C4: losango — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L2C6: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L3C3: círculo — parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; primeira participação no passo 58.
- L3C5: triângulo — cota saturada; exclusão junto à dupla; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 6.
- L3C6: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 6.
- L3C8: quadrado — posições restantes; cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 64.
- L4C1: losango — parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; primeira participação no passo 22.
- L5C1: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 10.
- L5C4: quadrado — parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 113.
- L6C2: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 49.
- L6C3: losango — parceiro obrigatório / orientação; prevenção de trio; primeira participação no passo 60.
- L8C6: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 108.
- L8C8: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 92.

### Sequência lógica

1. linha 2 já tem dois losango (L2C4, L2C6); exclua losango de L2C1.
2. linha 2 já tem dois losango (L2C4, L2C6); exclua losango de L2C2.
3. linha 2 já tem dois losango (L2C4, L2C6); exclua losango de L2C5.
4. linha 2 já tem dois losango (L2C4, L2C6); exclua losango de L2C7.
5. linha 2 já tem dois losango (L2C4, L2C6); exclua losango de L2C8.
6. linha 3 já tem dois triângulo (L3C5, L3C6); exclua triângulo de L3C1.
7. linha 3 já tem dois triângulo (L3C5, L3C6); exclua triângulo de L3C2.
8. linha 3 já tem dois triângulo (L3C5, L3C6); exclua triângulo de L3C4.
9. linha 3 já tem dois triângulo (L3C5, L3C6); exclua triângulo de L3C7.
10. coluna 1 já tem dois círculo (L1C1, L5C1); exclua círculo de L2C1.
11. coluna 1 já tem dois círculo (L1C1, L5C1); exclua círculo de L3C1.
12. coluna 1 já tem dois círculo (L1C1, L5C1); exclua círculo de L6C1.
13. coluna 1 já tem dois círculo (L1C1, L5C1); exclua círculo de L7C1.
14. coluna 1 já tem dois círculo (L1C1, L5C1); exclua círculo de L8C1.
15. L1C1 precisa de um parceiro círculo; só L1C2 pode recebê-lo (horizontal).
16. A dupla L1C2–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro círculo.
17. A dupla L1C2–L1C1 já está fechada; L1C3 não pode tocar essa dupla com outro círculo.
18. L2C6 precisa de um parceiro losango; só L1C6 pode recebê-lo (vertical).
19. A dupla L3C5–L3C6 já está fechada; L2C5 não pode tocar essa dupla com outro triângulo.
20. A dupla L3C5–L3C6 já está fechada; L4C5 não pode tocar essa dupla com outro triângulo.
21. A dupla L3C6–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro triângulo.
22. L5C1 precisa de um parceiro círculo; só L5C2 pode recebê-lo (horizontal).
23. A dupla L5C2–L5C1 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
24. A dupla L5C2–L5C1 já está fechada; L5C3 não pode tocar essa dupla com outro círculo.
25. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C4.
26. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C5.
27. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C7.
28. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C8.
29. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C5.
30. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C6.
31. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C7.
32. linha 5 já tem dois círculo (L5C1, L5C2); exclua círculo de L5C8.
33. coluna 2 já tem dois círculo (L1C2, L5C2); exclua círculo de L3C2.
34. coluna 2 já tem dois círculo (L1C2, L5C2); exclua círculo de L7C2.
35. coluna 2 já tem dois círculo (L1C2, L5C2); exclua círculo de L8C2.
36. coluna 6 já tem dois losango (L1C6, L2C6); exclua losango de L4C6.
37. coluna 6 já tem dois losango (L1C6, L2C6); exclua losango de L5C6.
38. coluna 6 já tem dois losango (L1C6, L2C6); exclua losango de L6C6.
39. coluna 6 já tem dois losango (L1C6, L2C6); exclua losango de L7C6.
40. A dupla L1C6–L2C6 já está fechada; L1C5 não pode tocar essa dupla com outro losango.
41. A dupla L1C6–L2C6 já está fechada; L1C7 não pode tocar essa dupla com outro losango.
42. L1C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
43. L2C5 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
44. L2C5 precisa de um parceiro quadrado; só L1C5 pode recebê-lo (vertical).
45. Na linha 2, círculo só cabe em L2C7 e L2C8; ambas as casas precisam dele.
46. Na linha 2, círculo só cabe em L2C7 e L2C8; ambas as casas precisam dele.
47. Na linha 2, triângulo só cabe em L2C1 e L2C2; ambas as casas precisam dele.
48. Na linha 2, triângulo só cabe em L2C1 e L2C2; ambas as casas precisam dele.
49. coluna 2 já tem dois triângulo (L2C2, L6C2); exclua triângulo de L4C2.
50. coluna 2 já tem dois triângulo (L2C2, L6C2); exclua triângulo de L7C2.
51. coluna 2 já tem dois triângulo (L2C2, L6C2); exclua triângulo de L8C2.
52. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L4C5.
53. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L5C5.
54. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L6C5.
55. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L7C5.
56. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L8C5.
57. A dupla L1C5–L2C5 já está fechada; L1C4 não pode tocar essa dupla com outro quadrado.
58. L2C3 precisa de um parceiro quadrado; só L1C3 pode recebê-lo (vertical).
59. A dupla L2C7–L2C8 já está fechada; L3C7 não pode tocar essa dupla com outro círculo.
60. L6C2 precisa de um parceiro triângulo; só L6C1 pode recebê-lo (horizontal).
61. linha 1 já tem dois quadrado (L1C3, L1C5); exclua quadrado de L1C7.
62. linha 1 já tem dois quadrado (L1C3, L1C5); exclua quadrado de L1C8.
63. Na linha 1, losango só cabe em L1C4 e L1C6; ambas as casas precisam dele.
64. Na linha 3, círculo só cabe em L3C3 e L3C4; ambas as casas precisam dele.
65. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C4.
66. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C5.
67. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C6.
68. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C7.
69. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C8.
70. coluna 1 já tem dois triângulo (L2C1, L6C1); exclua triângulo de L7C1.
71. coluna 1 já tem dois triângulo (L2C1, L6C1); exclua triângulo de L8C1.
72. coluna 3 já tem dois quadrado (L1C3, L2C3); exclua quadrado de L4C3.
73. coluna 3 já tem dois quadrado (L1C3, L2C3); exclua quadrado de L5C3.
74. coluna 3 já tem dois quadrado (L1C3, L2C3); exclua quadrado de L7C3.
75. coluna 3 já tem dois quadrado (L1C3, L2C3); exclua quadrado de L8C3.
76. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L4C4.
77. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L6C4.
78. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L7C4.
79. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L8C4.
80. A dupla L3C3–L3C4 já está fechada; L4C3 não pode tocar essa dupla com outro círculo.
81. A dupla L3C4–L3C3 já está fechada; L4C4 não pode tocar essa dupla com outro círculo.
82. Se L3C1 fosse quadrado, 3 deduções levariam a: L3C1 fica sem símbolo possível. L3C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua quadrado.
   - Hipótese, passo 1: linha 3 já tem dois quadrado (L3C1, L3C8); exclua quadrado de L3C2.
   - Hipótese, passo 2: linha 3 já tem dois quadrado (L3C1, L3C8); exclua quadrado de L3C7.
   - Hipótese, passo 3: L3C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L3C1 fica sem símbolo possível. L3C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
83. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
84. Na coluna 1, quadrado só cabe em L7C1 e L8C1; ambas as casas precisam dele.
85. A dupla L3C1–L4C1 já está fechada; L3C2 não pode tocar essa dupla com outro losango.
86. L3C2 precisa de um parceiro quadrado; só L4C2 pode recebê-lo (vertical).
87. A dupla L7C1–L8C1 já está fechada; L7C2 não pode tocar essa dupla com outro quadrado.
88. L7C3 não pode ser losango: tocaria L6C3 e L7C2, formando um grupo maior que dois.
89. A dupla L8C1–L7C1 já está fechada; L8C2 não pode tocar essa dupla com outro quadrado.
90. A dupla L8C2–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro losango.
91. linha 3 já tem dois quadrado (L3C2, L3C8); exclua quadrado de L3C7.
92. linha 8 já tem dois losango (L8C2, L8C8); exclua losango de L8C5.
93. linha 8 já tem dois losango (L8C2, L8C8); exclua losango de L8C7.
94. L3C7 precisa de um parceiro losango; só L4C7 pode recebê-lo (vertical).
95. L3C8 precisa de um parceiro quadrado; só L4C8 pode recebê-lo (vertical).
96. A dupla L4C7–L3C7 já está fechada; L5C7 não pode tocar essa dupla com outro losango.
97. A dupla L4C8–L3C8 já está fechada; L5C8 não pode tocar essa dupla com outro quadrado.
98. L6C3 precisa de um parceiro losango; só L5C3 pode recebê-lo (vertical).
99. L8C8 precisa de um parceiro losango; só L7C8 pode recebê-lo (vertical).
100. Na linha 4, círculo só cabe em L4C5 e L4C6; ambas as casas precisam dele.
101. Na linha 4, círculo só cabe em L4C5 e L4C6; ambas as casas precisam dele.
102. Na linha 4, triângulo só cabe em L4C3 e L4C4; ambas as casas precisam dele.
103. Na linha 4, triângulo só cabe em L4C3 e L4C4; ambas as casas precisam dele.
104. linha 7 já tem dois losango (L7C2, L7C8); exclua losango de L7C5.
105. linha 7 já tem dois losango (L7C2, L7C8); exclua losango de L7C7.
106. Na coluna 5, losango só cabe em L5C5 e L6C5; ambas as casas precisam dele.
107. Na coluna 5, losango só cabe em L5C5 e L6C5; ambas as casas precisam dele.
108. coluna 6 já tem dois círculo (L4C6, L8C6); exclua círculo de L6C6.
109. coluna 6 já tem dois círculo (L4C6, L8C6); exclua círculo de L7C6.
110. coluna 7 já tem dois losango (L3C7, L4C7); exclua losango de L6C7.
111. Na coluna 8, círculo só cabe em L2C8 e L6C8; ambas as casas precisam dele.
112. Na coluna 8, triângulo só cabe em L1C8 e L5C8; ambas as casas precisam dele.
113. L5C4 precisa de um parceiro quadrado; só L6C4 pode recebê-lo (vertical).
114. L5C8 precisa de um parceiro triângulo; só L5C7 pode recebê-lo (horizontal).
115. A dupla L6C4–L5C4 já está fechada; L7C4 não pode tocar essa dupla com outro quadrado.
116. L6C8 precisa de um parceiro círculo; só L6C7 pode recebê-lo (horizontal).
117. L8C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
118. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C6.
119. Na linha 8, quadrado só cabe em L8C1 e L8C7; ambas as casas precisam dele.
120. Na coluna 6, triângulo só cabe em L3C6 e L7C6; ambas as casas precisam dele.
121. coluna 7 já tem dois círculo (L2C7, L6C7); exclua círculo de L7C7.
122. coluna 7 já tem dois triângulo (L1C7, L5C7); exclua triângulo de L7C7.
123. L7C6 precisa de um parceiro triângulo; só L7C5 pode recebê-lo (horizontal).
124. L8C6 precisa de um parceiro círculo; só L8C5 pode recebê-lo (horizontal).
125. Na linha 7, círculo só cabe em L7C3 e L7C4; ambas as casas precisam dele.
126. Na linha 7, círculo só cabe em L7C3 e L7C4; ambas as casas precisam dele.
127. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C3.
128. linha 8 já tem dois círculo (L8C5, L8C6); exclua círculo de L8C4.

## 66. Mestre — pacto-171

**Descoberta:** Cadeia profunda de cotas e parceiros.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; prevenção de isolamento.

**Origem:** pacto-171; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 11; 53 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 24; 143 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L1C7: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 12.
- L2C5: triângulo — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 51.
- L2C6: quadrado — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 51.
- L3C3: círculo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 74.
- L3C6: losango — parceiro obrigatório / orientação; primeira participação no passo 51.
- L4C3: losango — parceiro obrigatório / orientação; posições restantes; cota saturada; exclusão junto à dupla; primeira participação no passo 74.
- L6C1: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L6C7: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L7C1: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 7.
- L7C7: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; primeira participação no passo 12.

### Sequência lógica

1. linha 6 já tem dois quadrado (L6C1, L6C7); exclua quadrado de L6C2.
2. linha 6 já tem dois quadrado (L6C1, L6C7); exclua quadrado de L6C3.
3. linha 6 já tem dois quadrado (L6C1, L6C7); exclua quadrado de L6C4.
4. linha 6 já tem dois quadrado (L6C1, L6C7); exclua quadrado de L6C5.
5. linha 6 já tem dois quadrado (L6C1, L6C7); exclua quadrado de L6C6.
6. linha 6 já tem dois quadrado (L6C1, L6C7); exclua quadrado de L6C8.
7. coluna 1 já tem dois círculo (L1C1, L7C1); exclua círculo de L2C1.
8. coluna 1 já tem dois círculo (L1C1, L7C1); exclua círculo de L3C1.
9. coluna 1 já tem dois círculo (L1C1, L7C1); exclua círculo de L4C1.
10. coluna 1 já tem dois círculo (L1C1, L7C1); exclua círculo de L5C1.
11. coluna 1 já tem dois círculo (L1C1, L7C1); exclua círculo de L8C1.
12. coluna 7 já tem dois losango (L1C7, L7C7); exclua losango de L2C7.
13. coluna 7 já tem dois losango (L1C7, L7C7); exclua losango de L3C7.
14. coluna 7 já tem dois losango (L1C7, L7C7); exclua losango de L4C7.
15. coluna 7 já tem dois losango (L1C7, L7C7); exclua losango de L5C7.
16. coluna 7 já tem dois losango (L1C7, L7C7); exclua losango de L8C7.
17. L1C1 precisa de um parceiro círculo; só L1C2 pode recebê-lo (horizontal).
18. A dupla L1C2–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro círculo.
19. A dupla L1C2–L1C1 já está fechada; L1C3 não pode tocar essa dupla com outro círculo.
20. L6C1 precisa de um parceiro quadrado; só L5C1 pode recebê-lo (vertical).
21. L6C7 precisa de um parceiro quadrado; só L5C7 pode recebê-lo (vertical).
22. L7C1 precisa de um parceiro círculo; só L7C2 pode recebê-lo (horizontal).
23. A dupla L7C2–L7C1 já está fechada; L6C2 não pode tocar essa dupla com outro círculo.
24. A dupla L7C2–L7C1 já está fechada; L8C2 não pode tocar essa dupla com outro círculo.
25. A dupla L7C2–L7C1 já está fechada; L7C3 não pode tocar essa dupla com outro círculo.
26. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C4.
27. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C5.
28. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C6.
29. linha 1 já tem dois círculo (L1C1, L1C2); exclua círculo de L1C8.
30. linha 5 já tem dois quadrado (L5C1, L5C7); exclua quadrado de L5C2.
31. linha 5 já tem dois quadrado (L5C1, L5C7); exclua quadrado de L5C3.
32. linha 5 já tem dois quadrado (L5C1, L5C7); exclua quadrado de L5C4.
33. linha 5 já tem dois quadrado (L5C1, L5C7); exclua quadrado de L5C5.
34. linha 5 já tem dois quadrado (L5C1, L5C7); exclua quadrado de L5C6.
35. linha 5 já tem dois quadrado (L5C1, L5C7); exclua quadrado de L5C8.
36. linha 7 já tem dois círculo (L7C1, L7C2); exclua círculo de L7C4.
37. linha 7 já tem dois círculo (L7C1, L7C2); exclua círculo de L7C5.
38. linha 7 já tem dois círculo (L7C1, L7C2); exclua círculo de L7C6.
39. linha 7 já tem dois círculo (L7C1, L7C2); exclua círculo de L7C8.
40. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L2C1.
41. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L3C1.
42. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L4C1.
43. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L8C1.
44. coluna 2 já tem dois círculo (L1C2, L7C2); exclua círculo de L3C2.
45. coluna 2 já tem dois círculo (L1C2, L7C2); exclua círculo de L4C2.
46. coluna 2 já tem dois círculo (L1C2, L7C2); exclua círculo de L5C2.
47. coluna 7 já tem dois quadrado (L5C7, L6C7); exclua quadrado de L2C7.
48. coluna 7 já tem dois quadrado (L5C7, L6C7); exclua quadrado de L3C7.
49. coluna 7 já tem dois quadrado (L5C7, L6C7); exclua quadrado de L4C7.
50. coluna 7 já tem dois quadrado (L5C7, L6C7); exclua quadrado de L8C7.
51. L2C6 precisa de um parceiro quadrado; só L1C6 pode recebê-lo (vertical).
52. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L4C6.
53. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L7C6.
54. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L8C6.
55. A dupla L1C6–L2C6 já está fechada; L1C5 não pode tocar essa dupla com outro quadrado.
56. L1C7 precisa de um parceiro losango; só L1C8 pode recebê-lo (horizontal).
57. A dupla L1C8–L1C7 já está fechada; L2C8 não pode tocar essa dupla com outro losango.
58. linha 1 já tem dois losango (L1C7, L1C8); exclua losango de L1C3.
59. linha 1 já tem dois losango (L1C7, L1C8); exclua losango de L1C4.
60. linha 1 já tem dois losango (L1C7, L1C8); exclua losango de L1C5.
61. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L3C5.
62. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L4C5.
63. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L5C5.
64. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L6C5.
65. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L7C5.
66. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L8C5.
67. A dupla L1C5–L2C5 já está fechada; L1C4 não pode tocar essa dupla com outro triângulo.
68. A dupla L2C5–L1C5 já está fechada; L2C4 não pode tocar essa dupla com outro triângulo.
69. Na linha 1, triângulo só cabe em L1C3 e L1C5; ambas as casas precisam dele.
70. L1C3 precisa de um parceiro triângulo; só L2C3 pode recebê-lo (vertical).
71. L1C4 precisa de um parceiro quadrado; só L2C4 pode recebê-lo (vertical).
72. A dupla L2C3–L1C3 já está fechada; L2C2 não pode tocar essa dupla com outro triângulo.
73. A dupla L2C4–L1C4 já está fechada; L3C4 não pode tocar essa dupla com outro quadrado.
74. L3C3 precisa de um parceiro círculo; só L3C4 pode recebê-lo (horizontal).
75. A dupla L3C4–L3C3 já está fechada; L4C4 não pode tocar essa dupla com outro círculo.
76. A dupla L3C4–L3C3 já está fechada; L3C5 não pode tocar essa dupla com outro círculo.
77. Na linha 2, círculo só cabe em L2C7 e L2C8; ambas as casas precisam dele.
78. Na linha 2, círculo só cabe em L2C7 e L2C8; ambas as casas precisam dele.
79. linha 2 já tem dois triângulo (L2C3, L2C5); exclua triângulo de L2C1.
80. linha 2 já tem dois quadrado (L2C4, L2C6); exclua quadrado de L2C2.
81. linha 3 já tem dois círculo (L3C3, L3C4); exclua círculo de L3C7.
82. linha 3 já tem dois círculo (L3C3, L3C4); exclua círculo de L3C8.
83. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L5C3.
84. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L6C3.
85. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L7C3.
86. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L8C3.
87. Na coluna 3, quadrado só cabe em L7C3 e L8C3; ambas as casas precisam dele.
88. Na coluna 3, quadrado só cabe em L7C3 e L8C3; ambas as casas precisam dele.
89. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L4C4.
90. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L7C4.
91. coluna 4 já tem dois quadrado (L1C4, L2C4); exclua quadrado de L8C4.
92. A dupla L2C1–L2C2 já está fechada; L3C1 não pode tocar essa dupla com outro losango.
93. A dupla L2C2–L2C1 já está fechada; L3C2 não pode tocar essa dupla com outro losango.
94. A dupla L8C3–L7C3 já está fechada; L8C2 não pode tocar essa dupla com outro quadrado.
95. linha 3 já tem dois triângulo (L3C1, L3C7); exclua triângulo de L3C2.
96. linha 3 já tem dois triângulo (L3C1, L3C7); exclua triângulo de L3C8.
97. Na coluna 2, quadrado só cabe em L3C2 e L4C2; ambas as casas precisam dele.
98. L3C1 precisa de um parceiro triângulo; só L4C1 pode recebê-lo (vertical).
99. L3C7 precisa de um parceiro triângulo; só L4C7 pode recebê-lo (vertical).
100. A dupla L4C7–L3C7 já está fechada; L4C6 não pode tocar essa dupla com outro triângulo.
101. A dupla L4C7–L3C7 já está fechada; L4C8 não pode tocar essa dupla com outro triângulo.
102. linha 4 já tem dois triângulo (L4C1, L4C7); exclua triângulo de L4C4.
103. linha 4 já tem dois losango (L4C3, L4C4); exclua losango de L4C5.
104. linha 4 já tem dois losango (L4C3, L4C4); exclua losango de L4C6.
105. linha 4 já tem dois losango (L4C3, L4C4); exclua losango de L4C8.
106. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L8C1.
107. Na coluna 7, círculo só cabe em L2C7 e L8C7; ambas as casas precisam dele.
108. L3C6 precisa de um parceiro losango; só L3C5 pode recebê-lo (horizontal).
109. L3C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
110. A dupla L4C3–L4C4 já está fechada; L5C3 não pode tocar essa dupla com outro losango.
111. A dupla L4C4–L4C3 já está fechada; L5C4 não pode tocar essa dupla com outro losango.
112. L4C5 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
113. A dupla L4C6–L4C5 já está fechada; L5C6 não pode tocar essa dupla com outro círculo.
114. L8C1 precisa de um parceiro losango; só L8C2 pode recebê-lo (horizontal).
115. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C8.
116. linha 8 já tem dois losango (L8C1, L8C2); exclua losango de L8C4.
117. linha 8 já tem dois losango (L8C1, L8C2); exclua losango de L8C5.
118. linha 8 já tem dois losango (L8C1, L8C2); exclua losango de L8C6.
119. linha 8 já tem dois losango (L8C1, L8C2); exclua losango de L8C8.
120. Na coluna 2, triângulo só cabe em L5C2 e L6C2; ambas as casas precisam dele.
121. Na coluna 2, triângulo só cabe em L5C2 e L6C2; ambas as casas precisam dele.
122. coluna 3 já tem dois círculo (L3C3, L5C3); exclua círculo de L6C3.
123. Na coluna 5, quadrado só cabe em L7C5 e L8C5; ambas as casas precisam dele.
124. Na coluna 5, quadrado só cabe em L7C5 e L8C5; ambas as casas precisam dele.
125. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L7C8.
126. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L8C8.
127. A dupla L4C5–L4C6 já está fechada; L5C5 não pode tocar essa dupla com outro círculo.
128. L5C3 precisa de um parceiro círculo; só L5C4 pode recebê-lo (horizontal).
129. A dupla L5C4–L5C3 já está fechada; L6C4 não pode tocar essa dupla com outro círculo.
130. L6C3 precisa de um parceiro losango; só L6C4 pode recebê-lo (horizontal).
131. A dupla L6C4–L6C3 já está fechada; L7C4 não pode tocar essa dupla com outro losango.
132. A dupla L6C4–L6C3 já está fechada; L6C5 não pode tocar essa dupla com outro losango.
133. L6C5 precisa de um parceiro círculo; só L6C6 pode recebê-lo (horizontal).
134. L7C4 precisa de um parceiro triângulo; só L8C4 pode recebê-lo (vertical).
135. linha 5 já tem dois círculo (L5C3, L5C4); exclua círculo de L5C8.
136. linha 6 já tem dois círculo (L6C5, L6C6); exclua círculo de L6C8.
137. Na linha 6, triângulo só cabe em L6C2 e L6C8; ambas as casas precisam dele.
138. coluna 6 já tem dois círculo (L4C6, L6C6); exclua círculo de L8C6.
139. Na coluna 8, círculo só cabe em L2C8 e L8C8; ambas as casas precisam dele.
140. L5C5 precisa de um parceiro losango; só L5C6 pode recebê-lo (horizontal).
141. L5C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
142. A dupla L6C8–L5C8 já está fechada; L7C8 não pode tocar essa dupla com outro triângulo.
143. A dupla L7C7–L7C8 já está fechada; L7C6 não pode tocar essa dupla com outro losango.

## 67. Mestre — pacto-109

**Descoberta:** Entrada evidente, desenvolvimento remoto.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; prevenção de trio; posições restantes; hipótese refutada.

**Origem:** pacto-109; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 25; 120 eliminações explicadas. Refutações: 6 passos.

### Função das pistas

- L1C4: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L1C6: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L2C7: quadrado — prevenção de isolamento; prevenção de trio; parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 19.
- L3C1: triângulo — posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 60.
- L3C8: quadrado — prevenção de isolamento; prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; cota saturada; primeira participação no passo 19.
- L5C3: quadrado — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 56.
- L5C4: triângulo — parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; primeira participação no passo 65.
- L5C8: losango — posições restantes; parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; primeira participação no passo 36.
- L7C1: círculo — parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; prevenção de isolamento; primeira participação no passo 54.
- L7C5: triângulo — posições restantes; exclusão junto à dupla; cota saturada; primeira participação no passo 70.
- L8C1: losango — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 10.
- L8C2: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 10.
- L8C4: quadrado — cota saturada; exclusão junto à dupla; primeira participação no passo 75.
- L8C7: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L8C8: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 7.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C4, L1C6); exclua círculo de L1C1.
2. linha 1 já tem dois círculo (L1C4, L1C6); exclua círculo de L1C2.
3. linha 1 já tem dois círculo (L1C4, L1C6); exclua círculo de L1C3.
4. linha 1 já tem dois círculo (L1C4, L1C6); exclua círculo de L1C5.
5. linha 1 já tem dois círculo (L1C4, L1C6); exclua círculo de L1C7.
6. linha 1 já tem dois círculo (L1C4, L1C6); exclua círculo de L1C8.
7. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C3.
8. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C5.
9. linha 8 já tem dois círculo (L8C7, L8C8); exclua círculo de L8C6.
10. linha 8 já tem dois losango (L8C1, L8C2); exclua losango de L8C3.
11. linha 8 já tem dois losango (L8C1, L8C2); exclua losango de L8C5.
12. linha 8 já tem dois losango (L8C1, L8C2); exclua losango de L8C6.
13. L1C4 precisa de um parceiro círculo; só L2C4 pode recebê-lo (vertical).
14. L1C6 precisa de um parceiro círculo; só L2C6 pode recebê-lo (vertical).
15. A dupla L2C4–L1C4 já está fechada; L3C4 não pode tocar essa dupla com outro círculo.
16. A dupla L2C4–L1C4 já está fechada; L2C3 não pode tocar essa dupla com outro círculo.
17. A dupla L2C4–L1C4 já está fechada; L2C5 não pode tocar essa dupla com outro círculo.
18. A dupla L2C6–L1C6 já está fechada; L3C6 não pode tocar essa dupla com outro círculo.
19. L2C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
20. L2C8 não pode ser quadrado: tocaria L3C8 e L2C7, formando um grupo maior que dois.
21. L3C7 não pode ser quadrado: tocaria L2C7 e L3C8, formando um grupo maior que dois.
22. L3C8 precisa de um parceiro quadrado; só L4C8 pode recebê-lo (vertical).
23. A dupla L4C8–L3C8 já está fechada; L4C7 não pode tocar essa dupla com outro quadrado.
24. A dupla L8C2–L8C1 já está fechada; L7C2 não pode tocar essa dupla com outro losango.
25. A dupla L8C7–L8C8 já está fechada; L7C7 não pode tocar essa dupla com outro círculo.
26. A dupla L8C8–L8C7 já está fechada; L7C8 não pode tocar essa dupla com outro círculo.
27. linha 2 já tem dois círculo (L2C4, L2C6); exclua círculo de L2C1.
28. linha 2 já tem dois círculo (L2C4, L2C6); exclua círculo de L2C2.
29. coluna 4 já tem dois círculo (L1C4, L2C4); exclua círculo de L4C4.
30. coluna 4 já tem dois círculo (L1C4, L2C4); exclua círculo de L6C4.
31. coluna 4 já tem dois círculo (L1C4, L2C4); exclua círculo de L7C4.
32. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L4C6.
33. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L5C6.
34. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L6C6.
35. coluna 6 já tem dois círculo (L1C6, L2C6); exclua círculo de L7C6.
36. Na coluna 8, círculo só cabe em L6C8 e L8C8; ambas as casas precisam dele.
37. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L1C8.
38. coluna 8 já tem dois quadrado (L3C8, L4C8); exclua quadrado de L7C8.
39. L2C7 precisa de um parceiro quadrado; só L1C7 pode recebê-lo (vertical).
40. L5C8 precisa de um parceiro losango; só L5C7 pode recebê-lo (horizontal).
41. L6C8 precisa de um parceiro círculo; só L6C7 pode recebê-lo (horizontal).
42. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C1.
43. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C2.
44. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C5.
45. linha 5 já tem dois losango (L5C7, L5C8); exclua losango de L5C6.
46. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C1.
47. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C2.
48. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C3.
49. linha 6 já tem dois círculo (L6C7, L6C8); exclua círculo de L6C5.
50. coluna 7 já tem dois círculo (L6C7, L8C7); exclua círculo de L3C7.
51. coluna 7 já tem dois círculo (L6C7, L8C7); exclua círculo de L4C7.
52. coluna 7 já tem dois quadrado (L1C7, L2C7); exclua quadrado de L7C7.
53. A dupla L5C7–L5C8 já está fechada; L4C7 não pode tocar essa dupla com outro losango.
54. L7C1 precisa de um parceiro círculo; só L7C2 pode recebê-lo (horizontal).
55. A dupla L7C2–L7C1 já está fechada; L7C3 não pode tocar essa dupla com outro círculo.
56. Na coluna 3, círculo só cabe em L3C3 e L4C3; ambas as casas precisam dele.
57. Na coluna 3, círculo só cabe em L3C3 e L4C3; ambas as casas precisam dele.
58. A dupla L3C3–L4C3 já está fechada; L3C2 não pode tocar essa dupla com outro círculo.
59. A dupla L4C3–L3C3 já está fechada; L4C2 não pode tocar essa dupla com outro círculo.
60. Na linha 3, círculo só cabe em L3C3 e L3C5; ambas as casas precisam dele.
61. Na coluna 2, círculo só cabe em L5C2 e L7C2; ambas as casas precisam dele.
62. L3C5 precisa de um parceiro círculo; só L4C5 pode recebê-lo (vertical).
63. A dupla L4C5–L3C5 já está fechada; L5C5 não pode tocar essa dupla com outro círculo.
64. L5C2 precisa de um parceiro círculo; só L5C1 pode recebê-lo (horizontal).
65. L5C3 precisa de um parceiro quadrado; só L6C3 pode recebê-lo (vertical).
66. A dupla L6C3–L5C3 já está fechada; L7C3 não pode tocar essa dupla com outro quadrado.
67. A dupla L6C3–L5C3 já está fechada; L6C2 não pode tocar essa dupla com outro quadrado.
68. A dupla L6C3–L5C3 já está fechada; L6C4 não pode tocar essa dupla com outro quadrado.
69. linha 4 já tem dois círculo (L4C3, L4C5); exclua círculo de L4C1.
70. Na linha 7, quadrado só cabe em L7C4 e L7C6; ambas as casas precisam dele.
71. Na linha 7, quadrado só cabe em L7C4 e L7C6; ambas as casas precisam dele.
72. coluna 3 já tem dois quadrado (L5C3, L6C3); exclua quadrado de L1C3.
73. coluna 3 já tem dois quadrado (L5C3, L6C3); exclua quadrado de L2C3.
74. coluna 3 já tem dois quadrado (L5C3, L6C3); exclua quadrado de L8C3.
75. coluna 4 já tem dois quadrado (L7C4, L8C4); exclua quadrado de L3C4.
76. coluna 4 já tem dois quadrado (L7C4, L8C4); exclua quadrado de L4C4.
77. L6C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
78. L7C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
79. A dupla L8C4–L7C4 já está fechada; L8C5 não pode tocar essa dupla com outro quadrado.
80. A dupla L8C5–L7C5 já está fechada; L8C6 não pode tocar essa dupla com outro triângulo.
81. linha 7 já tem dois triângulo (L7C3, L7C5); exclua triângulo de L7C7.
82. linha 7 já tem dois triângulo (L7C3, L7C5); exclua triângulo de L7C8.
83. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L1C3.
84. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L2C3.
85. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L1C5.
86. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L2C5.
87. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L5C5.
88. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L6C5.
89. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L3C6.
90. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L4C6.
91. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L5C6.
92. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L6C6.
93. Na coluna 7, triângulo só cabe em L3C7 e L4C7; ambas as casas precisam dele.
94. Na coluna 8, triângulo só cabe em L1C8 e L2C8; ambas as casas precisam dele.
95. Na coluna 8, triângulo só cabe em L1C8 e L2C8; ambas as casas precisam dele.
96. A dupla L1C3–L2C3 já está fechada; L1C2 não pode tocar essa dupla com outro losango.
97. A dupla L2C3–L1C3 já está fechada; L2C2 não pode tocar essa dupla com outro losango.
98. A dupla L3C7–L4C7 já está fechada; L3C6 não pode tocar essa dupla com outro triângulo.
99. L4C6 não pode ser triângulo: tocaria L5C6 e L4C7, formando um grupo maior que dois.
100. L5C5 precisa de um parceiro quadrado; só L6C5 pode recebê-lo (vertical).
101. L5C6 precisa de um parceiro triângulo; só L6C6 pode recebê-lo (vertical).
102. L6C4 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
103. linha 3 já tem dois triângulo (L3C1, L3C7); exclua triângulo de L3C2.
104. linha 3 já tem dois triângulo (L3C1, L3C7); exclua triângulo de L3C4.
105. Na linha 3, quadrado só cabe em L3C2 e L3C8; ambas as casas precisam dele.
106. linha 6 já tem dois triângulo (L6C4, L6C6); exclua triângulo de L6C1.
107. linha 6 já tem dois triângulo (L6C4, L6C6); exclua triângulo de L6C2.
108. coluna 1 já tem dois losango (L6C1, L8C1); exclua losango de L1C1.
109. coluna 1 já tem dois losango (L6C1, L8C1); exclua losango de L2C1.
110. coluna 1 já tem dois losango (L6C1, L8C1); exclua losango de L4C1.
111. coluna 2 já tem dois losango (L6C2, L8C2); exclua losango de L4C2.
112. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L4C4.
113. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L1C5.
114. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L2C5.
115. Se L1C1 fosse triângulo, 6 deduções levariam a: L1C1 fica sem símbolo possível. L1C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua triângulo.
   - Hipótese, passo 1: linha 1 já tem dois triângulo (L1C1, L1C8); exclua triângulo de L1C2.
   - Hipótese, passo 2: coluna 1 já tem dois triângulo (L1C1, L3C1); exclua triângulo de L2C1.
   - Hipótese, passo 3: coluna 1 já tem dois triângulo (L1C1, L3C1); exclua triângulo de L4C1.
   - Hipótese, passo 4: Na coluna 2, triângulo só cabe em L2C2 e L4C2; ambas as casas precisam dele.
   - Hipótese, passo 5: Na coluna 2, triângulo só cabe em L2C2 e L4C2; ambas as casas precisam dele.
   - Hipótese, passo 6: L1C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C1 fica sem símbolo possível. L1C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
116. Na linha 1, triângulo só cabe em L1C2 e L1C8; ambas as casas precisam dele.
117. L1C1 precisa de um parceiro quadrado; só L2C1 pode recebê-lo (vertical).
118. L1C2 precisa de um parceiro triângulo; só L2C2 pode recebê-lo (vertical).
119. L3C1 precisa de um parceiro triângulo; só L4C1 pode recebê-lo (vertical).
120. L3C2 precisa de um parceiro quadrado; só L4C2 pode recebê-lo (vertical).

## 68. Mestre — pacto-v2-202

**Descoberta:** Compacto: hipótese curta necessária apesar das pistas.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; hipótese refutada; parceiro obrigatório / orientação; posições restantes.

**Origem:** pacto-196; recomposição de pistas; 22 pistas alteradas. **Pistas:** 34; 30 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 16; 84 eliminações explicadas. Refutações: 6, 3 passos.

### Função das pistas

- L1C1: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L1C2: losango — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L1C3: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 27.
- L1C4: quadrado — cota saturada; posições restantes; primeira participação no passo 31.
- L1C5: círculo — parceiro obrigatório / orientação; primeira participação no passo 48.
- L1C6: círculo — parceiro obrigatório / orientação; primeira participação no passo 49.
- L1C7: triângulo — posições restantes; primeira participação no passo 62.
- L1C8: triângulo — posições restantes; primeira participação no passo 64.
- L2C1: triângulo — cota saturada; posições restantes; primeira participação no passo 22.
- L2C2: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 26.
- L2C7: círculo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C8: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L3C1: triângulo — cota saturada; primeira participação no passo 22.
- L3C2: quadrado — cota saturada; primeira participação no passo 26.
- L3C4: círculo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 30.
- L4C1: círculo — cota saturada; exclusão junto à dupla; primeira participação no passo 67.
- L5C3: quadrado — cota saturada; primeira participação no passo 5.
- L5C4: quadrado — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 5.
- L6C2: círculo — cota saturada; primeira participação no passo 72.
- L6C3: triângulo — cota saturada; primeira participação no passo 11.
- L6C4: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 11.
- L7C1: quadrado — cota saturada; primeira participação no passo 23.
- L7C2: triângulo — cota saturada; primeira participação no passo 24.
- L7C3: círculo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L7C4: círculo — cota saturada; posições restantes; primeira participação no passo 30.
- L7C5: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 33.
- L7C6: quadrado — parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 80.
- L7C7: losango — exclusão junto à dupla; posições restantes; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 39.
- L7C8: losango — exclusão junto à dupla; posições restantes; cota saturada; primeira participação no passo 39.
- L8C1: quadrado — cota saturada; primeira participação no passo 23.
- L8C2: triângulo — cota saturada; primeira participação no passo 16.
- L8C3: losango — cota saturada; primeira participação no passo 19.
- L8C4: losango — cota saturada; posições restantes; primeira participação no passo 19.
- L8C5: triângulo — cota saturada; primeira participação no passo 16.

### Sequência lógica

1. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C3.
2. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C4.
3. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C5.
4. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C6.
5. linha 5 já tem dois quadrado (L5C3, L5C4); exclua quadrado de L5C1.
6. linha 5 já tem dois quadrado (L5C3, L5C4); exclua quadrado de L5C2.
7. linha 5 já tem dois quadrado (L5C3, L5C4); exclua quadrado de L5C5.
8. linha 5 já tem dois quadrado (L5C3, L5C4); exclua quadrado de L5C6.
9. linha 5 já tem dois quadrado (L5C3, L5C4); exclua quadrado de L5C7.
10. linha 5 já tem dois quadrado (L5C3, L5C4); exclua quadrado de L5C8.
11. linha 6 já tem dois triângulo (L6C3, L6C4); exclua triângulo de L6C1.
12. linha 6 já tem dois triângulo (L6C3, L6C4); exclua triângulo de L6C5.
13. linha 6 já tem dois triângulo (L6C3, L6C4); exclua triângulo de L6C6.
14. linha 6 já tem dois triângulo (L6C3, L6C4); exclua triângulo de L6C7.
15. linha 6 já tem dois triângulo (L6C3, L6C4); exclua triângulo de L6C8.
16. linha 8 já tem dois triângulo (L8C2, L8C5); exclua triângulo de L8C6.
17. linha 8 já tem dois triângulo (L8C2, L8C5); exclua triângulo de L8C7.
18. linha 8 já tem dois triângulo (L8C2, L8C5); exclua triângulo de L8C8.
19. linha 8 já tem dois losango (L8C3, L8C4); exclua losango de L8C6.
20. linha 8 já tem dois losango (L8C3, L8C4); exclua losango de L8C7.
21. linha 8 já tem dois losango (L8C3, L8C4); exclua losango de L8C8.
22. coluna 1 já tem dois triângulo (L2C1, L3C1); exclua triângulo de L5C1.
23. coluna 1 já tem dois quadrado (L7C1, L8C1); exclua quadrado de L6C1.
24. coluna 2 já tem dois triângulo (L7C2, L8C2); exclua triângulo de L4C2.
25. coluna 2 já tem dois triângulo (L7C2, L8C2); exclua triângulo de L5C2.
26. coluna 2 já tem dois quadrado (L2C2, L3C2); exclua quadrado de L4C2.
27. coluna 3 já tem dois quadrado (L1C3, L5C3); exclua quadrado de L2C3.
28. coluna 3 já tem dois quadrado (L1C3, L5C3); exclua quadrado de L3C3.
29. coluna 3 já tem dois quadrado (L1C3, L5C3); exclua quadrado de L4C3.
30. coluna 4 já tem dois círculo (L3C4, L7C4); exclua círculo de L4C4.
31. coluna 4 já tem dois quadrado (L1C4, L5C4); exclua quadrado de L2C4.
32. coluna 4 já tem dois quadrado (L1C4, L5C4); exclua quadrado de L4C4.
33. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L2C5.
34. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L3C5.
35. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L4C5.
36. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L5C5.
37. A dupla L2C7–L2C8 já está fechada; L3C7 não pode tocar essa dupla com outro círculo.
38. A dupla L2C8–L2C7 já está fechada; L3C8 não pode tocar essa dupla com outro círculo.
39. A dupla L7C7–L7C8 já está fechada; L6C7 não pode tocar essa dupla com outro losango.
40. A dupla L7C8–L7C7 já está fechada; L6C8 não pode tocar essa dupla com outro losango.
41. Se L2C3 fosse triângulo, 6 deduções levariam a: L2C3 fica sem símbolo possível. L2C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua triângulo.
   - Hipótese, passo 1: linha 2 já tem dois triângulo (L2C1, L2C3); exclua triângulo de L2C4.
   - Hipótese, passo 2: linha 2 já tem dois triângulo (L2C1, L2C3); exclua triângulo de L2C6.
   - Hipótese, passo 3: coluna 3 já tem dois triângulo (L2C3, L6C3); exclua triângulo de L3C3.
   - Hipótese, passo 4: coluna 3 já tem dois triângulo (L2C3, L6C3); exclua triângulo de L4C3.
   - Hipótese, passo 5: Na coluna 4, triângulo só cabe em L4C4 e L6C4; ambas as casas precisam dele.
   - Hipótese, passo 6: L2C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L2C3 fica sem símbolo possível. L2C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
42. coluna 3 já tem dois losango (L2C3, L8C3); exclua losango de L3C3.
43. coluna 3 já tem dois losango (L2C3, L8C3); exclua losango de L4C3.
44. L2C3 precisa de um parceiro losango; só L2C4 pode recebê-lo (horizontal).
45. A dupla L2C4–L2C3 já está fechada; L2C5 não pode tocar essa dupla com outro losango.
46. Na linha 2, triângulo só cabe em L2C1 e L2C6; ambas as casas precisam dele.
47. Na coluna 4, triângulo só cabe em L4C4 e L6C4; ambas as casas precisam dele.
48. L2C5 precisa de um parceiro quadrado; só L3C5 pode recebê-lo (vertical).
49. L2C6 precisa de um parceiro triângulo; só L3C6 pode recebê-lo (vertical).
50. L3C4 precisa de um parceiro círculo; só L3C3 pode recebê-lo (horizontal).
51. A dupla L3C5–L2C5 já está fechada; L4C5 não pode tocar essa dupla com outro quadrado.
52. A dupla L3C6–L2C6 já está fechada; L4C6 não pode tocar essa dupla com outro triângulo.
53. A dupla L3C6–L2C6 já está fechada; L3C7 não pode tocar essa dupla com outro triângulo.
54. L4C4 precisa de um parceiro triângulo; só L4C3 pode recebê-lo (horizontal).
55. linha 3 já tem dois triângulo (L3C1, L3C6); exclua triângulo de L3C8.
56. linha 3 já tem dois quadrado (L3C2, L3C5); exclua quadrado de L3C7.
57. linha 3 já tem dois quadrado (L3C2, L3C5); exclua quadrado de L3C8.
58. linha 4 já tem dois triângulo (L4C3, L4C4); exclua triângulo de L4C7.
59. linha 4 já tem dois triângulo (L4C3, L4C4); exclua triângulo de L4C8.
60. coluna 5 já tem dois quadrado (L2C5, L3C5); exclua quadrado de L6C5.
61. coluna 6 já tem dois triângulo (L2C6, L3C6); exclua triângulo de L5C6.
62. Na coluna 7, triângulo só cabe em L1C7 e L5C7; ambas as casas precisam dele.
63. coluna 7 já tem dois losango (L3C7, L7C7); exclua losango de L4C7.
64. Na coluna 8, triângulo só cabe em L1C8 e L5C8; ambas as casas precisam dele.
65. coluna 8 já tem dois losango (L3C8, L7C8); exclua losango de L4C8.
66. Se L4C2 fosse losango, 3 deduções levariam a: L4C2 fica sem símbolo possível. L4C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua losango.
   - Hipótese, passo 1: Na coluna 2, círculo só cabe em L5C2 e L6C2; ambas as casas precisam dele.
   - Hipótese, passo 2: L4C1 precisa de um parceiro círculo; só L5C1 pode recebê-lo (vertical).
   - Hipótese, passo 3: L4C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L4C2 fica sem símbolo possível. L4C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
67. linha 4 já tem dois círculo (L4C1, L4C2); exclua círculo de L4C5.
68. linha 4 já tem dois círculo (L4C1, L4C2); exclua círculo de L4C6.
69. linha 4 já tem dois círculo (L4C1, L4C2); exclua círculo de L4C7.
70. linha 4 já tem dois círculo (L4C1, L4C2); exclua círculo de L4C8.
71. linha 4 já tem dois quadrado (L4C7, L4C8); exclua quadrado de L4C6.
72. coluna 2 já tem dois círculo (L4C2, L6C2); exclua círculo de L5C2.
73. A dupla L4C1–L4C2 já está fechada; L5C1 não pode tocar essa dupla com outro círculo.
74. A dupla L4C5–L4C6 já está fechada; L5C5 não pode tocar essa dupla com outro losango.
75. A dupla L4C6–L4C5 já está fechada; L5C6 não pode tocar essa dupla com outro losango.
76. A dupla L5C1–L5C2 já está fechada; L6C1 não pode tocar essa dupla com outro losango.
77. A dupla L5C5–L5C6 já está fechada; L6C5 não pode tocar essa dupla com outro círculo.
78. A dupla L5C6–L5C5 já está fechada; L6C6 não pode tocar essa dupla com outro círculo.
79. L6C5 precisa de um parceiro losango; só L6C6 pode recebê-lo (horizontal).
80. L7C6 precisa de um parceiro quadrado; só L8C6 pode recebê-lo (vertical).
81. A dupla L8C6–L7C6 já está fechada; L8C7 não pode tocar essa dupla com outro quadrado.
82. L8C7 precisa de um parceiro círculo; só L8C8 pode recebê-lo (horizontal).
83. linha 6 já tem dois círculo (L6C1, L6C2); exclua círculo de L6C7.
84. linha 6 já tem dois círculo (L6C1, L6C2); exclua círculo de L6C8.

## 69. Mestre — pacto-105

**Descoberta:** Cadeia profunda de cotas e parceiros.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes.

**Origem:** pacto-105; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 26; 123 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L2C3: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 5.
- L2C5: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 5.
- L2C7: círculo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C8: círculo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L3C2: triângulo — prevenção de isolamento; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 35.
- L3C3: círculo — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 30.
- L4C4: losango — prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 81.
- L4C5: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 9.
- L4C6: círculo — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 9.
- L4C7: triângulo — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 12.
- L4C8: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 12.
- L6C2: quadrado — prevenção de isolamento; exclusão junto à dupla; cota saturada; primeira participação no passo 95.
- L6C5: círculo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 15.
- L6C6: círculo — cota saturada; prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 15.
- L7C1: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; prevenção de isolamento; primeira participação no passo 57.

### Sequência lógica

1. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C1.
2. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C2.
3. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C4.
4. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C6.
5. linha 2 já tem dois triângulo (L2C3, L2C5); exclua triângulo de L2C1.
6. linha 2 já tem dois triângulo (L2C3, L2C5); exclua triângulo de L2C2.
7. linha 2 já tem dois triângulo (L2C3, L2C5); exclua triângulo de L2C4.
8. linha 2 já tem dois triângulo (L2C3, L2C5); exclua triângulo de L2C6.
9. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C1.
10. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C2.
11. linha 4 já tem dois círculo (L4C5, L4C6); exclua círculo de L4C3.
12. linha 4 já tem dois triângulo (L4C7, L4C8); exclua triângulo de L4C1.
13. linha 4 já tem dois triângulo (L4C7, L4C8); exclua triângulo de L4C2.
14. linha 4 já tem dois triângulo (L4C7, L4C8); exclua triângulo de L4C3.
15. linha 6 já tem dois círculo (L6C5, L6C6); exclua círculo de L6C1.
16. linha 6 já tem dois círculo (L6C5, L6C6); exclua círculo de L6C3.
17. linha 6 já tem dois círculo (L6C5, L6C6); exclua círculo de L6C4.
18. linha 6 já tem dois círculo (L6C5, L6C6); exclua círculo de L6C7.
19. linha 6 já tem dois círculo (L6C5, L6C6); exclua círculo de L6C8.
20. coluna 5 já tem dois círculo (L4C5, L6C5); exclua círculo de L1C5.
21. coluna 5 já tem dois círculo (L4C5, L6C5); exclua círculo de L3C5.
22. coluna 5 já tem dois círculo (L4C5, L6C5); exclua círculo de L5C5.
23. coluna 5 já tem dois círculo (L4C5, L6C5); exclua círculo de L7C5.
24. coluna 5 já tem dois círculo (L4C5, L6C5); exclua círculo de L8C5.
25. coluna 6 já tem dois círculo (L4C6, L6C6); exclua círculo de L1C6.
26. coluna 6 já tem dois círculo (L4C6, L6C6); exclua círculo de L3C6.
27. coluna 6 já tem dois círculo (L4C6, L6C6); exclua círculo de L5C6.
28. coluna 6 já tem dois círculo (L4C6, L6C6); exclua círculo de L7C6.
29. coluna 6 já tem dois círculo (L4C6, L6C6); exclua círculo de L8C6.
30. L2C3 precisa de um parceiro triângulo; só L1C3 pode recebê-lo (vertical).
31. A dupla L2C7–L2C8 já está fechada; L1C7 não pode tocar essa dupla com outro círculo.
32. A dupla L2C7–L2C8 já está fechada; L3C7 não pode tocar essa dupla com outro círculo.
33. A dupla L2C8–L2C7 já está fechada; L1C8 não pode tocar essa dupla com outro círculo.
34. A dupla L2C8–L2C7 já está fechada; L3C8 não pode tocar essa dupla com outro círculo.
35. L3C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
36. L3C2 precisa de um parceiro triângulo; só L3C1 pode recebê-lo (horizontal).
37. L3C3 precisa de um parceiro círculo; só L3C4 pode recebê-lo (horizontal).
38. A dupla L4C7–L4C8 já está fechada; L3C7 não pode tocar essa dupla com outro triângulo.
39. A dupla L4C7–L4C8 já está fechada; L5C7 não pode tocar essa dupla com outro triângulo.
40. A dupla L4C8–L4C7 já está fechada; L3C8 não pode tocar essa dupla com outro triângulo.
41. A dupla L4C8–L4C7 já está fechada; L5C8 não pode tocar essa dupla com outro triângulo.
42. linha 3 já tem dois triângulo (L3C1, L3C2); exclua triângulo de L3C5.
43. linha 3 já tem dois triângulo (L3C1, L3C2); exclua triângulo de L3C6.
44. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L5C3.
45. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L6C3.
46. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L7C3.
47. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L8C3.
48. A dupla L1C3–L2C3 já está fechada; L1C2 não pode tocar essa dupla com outro triângulo.
49. A dupla L1C3–L2C3 já está fechada; L1C4 não pode tocar essa dupla com outro triângulo.
50. L1C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
51. L2C5 precisa de um parceiro triângulo; só L1C5 pode recebê-lo (vertical).
52. Na linha 1, círculo só cabe em L1C1 e L1C2; ambas as casas precisam dele.
53. Na linha 1, círculo só cabe em L1C1 e L1C2; ambas as casas precisam dele.
54. linha 1 já tem dois triângulo (L1C3, L1C5); exclua triângulo de L1C6.
55. linha 1 já tem dois triângulo (L1C3, L1C5); exclua triângulo de L1C7.
56. linha 1 já tem dois triângulo (L1C3, L1C5); exclua triângulo de L1C8.
57. coluna 1 já tem dois círculo (L1C1, L7C1); exclua círculo de L5C1.
58. coluna 1 já tem dois círculo (L1C1, L7C1); exclua círculo de L8C1.
59. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L5C5.
60. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L7C5.
61. coluna 5 já tem dois triângulo (L1C5, L2C5); exclua triângulo de L8C5.
62. L5C6 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
63. L7C1 precisa de um parceiro círculo; só L7C2 pode recebê-lo (horizontal).
64. A dupla L7C2–L7C1 já está fechada; L8C2 não pode tocar essa dupla com outro círculo.
65. A dupla L7C2–L7C1 já está fechada; L7C3 não pode tocar essa dupla com outro círculo.
66. linha 7 já tem dois círculo (L7C1, L7C2); exclua círculo de L7C4.
67. linha 7 já tem dois círculo (L7C1, L7C2); exclua círculo de L7C7.
68. linha 7 já tem dois círculo (L7C1, L7C2); exclua círculo de L7C8.
69. coluna 2 já tem dois círculo (L1C2, L7C2); exclua círculo de L5C2.
70. Na coluna 6, triângulo só cabe em L7C6 e L8C6; ambas as casas precisam dele.
71. Na coluna 6, triângulo só cabe em L7C6 e L8C6; ambas as casas precisam dele.
72. A dupla L7C6–L8C6 já está fechada; L7C7 não pode tocar essa dupla com outro triângulo.
73. A dupla L8C6–L7C6 já está fechada; L8C7 não pode tocar essa dupla com outro triângulo.
74. Na coluna 7, triângulo só cabe em L4C7 e L6C7; ambas as casas precisam dele.
75. L6C7 precisa de um parceiro triângulo; só L6C8 pode recebê-lo (horizontal).
76. A dupla L6C8–L6C7 já está fechada; L7C8 não pode tocar essa dupla com outro triângulo.
77. L8C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
78. linha 6 já tem dois triângulo (L6C7, L6C8); exclua triângulo de L6C1.
79. linha 6 já tem dois triângulo (L6C7, L6C8); exclua triângulo de L6C4.
80. Na linha 7, triângulo só cabe em L7C4 e L7C6; ambas as casas precisam dele.
81. L5C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
82. L7C4 precisa de um parceiro triângulo; só L8C4 pode recebê-lo (vertical).
83. L8C3 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
84. Na linha 5, triângulo só cabe em L5C1 e L5C2; ambas as casas precisam dele.
85. Na linha 5, triângulo só cabe em L5C1 e L5C2; ambas as casas precisam dele.
86. Na linha 8, círculo só cabe em L8C7 e L8C8; ambas as casas precisam dele.
87. Na linha 8, círculo só cabe em L8C7 e L8C8; ambas as casas precisam dele.
88. linha 8 já tem dois triângulo (L8C4, L8C6); exclua triângulo de L8C1.
89. linha 8 já tem dois triângulo (L8C4, L8C6); exclua triângulo de L8C2.
90. Na coluna 3, círculo só cabe em L3C3 e L5C3; ambas as casas precisam dele.
91. Na coluna 4, círculo só cabe em L3C4 e L5C4; ambas as casas precisam dele.
92. coluna 7 já tem dois círculo (L2C7, L8C7); exclua círculo de L5C7.
93. coluna 8 já tem dois círculo (L2C8, L8C8); exclua círculo de L5C8.
94. L4C4 precisa de um parceiro losango; só L4C3 pode recebê-lo (horizontal).
95. L6C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
96. A dupla L6C2–L6C1 já está fechada; L6C3 não pode tocar essa dupla com outro quadrado.
97. L6C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
98. Na linha 4, quadrado só cabe em L4C1 e L4C2; ambas as casas precisam dele.
99. Na linha 4, quadrado só cabe em L4C1 e L4C2; ambas as casas precisam dele.
100. coluna 1 já tem dois quadrado (L4C1, L6C1); exclua quadrado de L2C1.
101. coluna 1 já tem dois quadrado (L4C1, L6C1); exclua quadrado de L8C1.
102. coluna 2 já tem dois quadrado (L4C2, L6C2); exclua quadrado de L2C2.
103. coluna 2 já tem dois quadrado (L4C2, L6C2); exclua quadrado de L8C2.
104. Na coluna 3, quadrado só cabe em L7C3 e L8C3; ambas as casas precisam dele.
105. Na coluna 3, quadrado só cabe em L7C3 e L8C3; ambas as casas precisam dele.
106. Na coluna 4, quadrado só cabe em L1C4 e L2C4; ambas as casas precisam dele.
107. Na coluna 4, quadrado só cabe em L1C4 e L2C4; ambas as casas precisam dele.
108. Na linha 2, quadrado só cabe em L2C4 e L2C6; ambas as casas precisam dele.
109. Na linha 8, quadrado só cabe em L8C3 e L8C5; ambas as casas precisam dele.
110. L7C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
111. linha 7 já tem dois quadrado (L7C3, L7C5); exclua quadrado de L7C7.
112. linha 7 já tem dois quadrado (L7C3, L7C5); exclua quadrado de L7C8.
113. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L3C5.
114. coluna 5 já tem dois quadrado (L7C5, L8C5); exclua quadrado de L5C5.
115. L3C5 precisa de um parceiro losango; só L3C6 pode recebê-lo (horizontal).
116. A dupla L3C6–L3C5 já está fechada; L3C7 não pode tocar essa dupla com outro losango.
117. L3C7 precisa de um parceiro quadrado; só L3C8 pode recebê-lo (horizontal).
118. L5C5 precisa de um parceiro losango; só L5C6 pode recebê-lo (horizontal).
119. A dupla L5C6–L5C5 já está fechada; L5C7 não pode tocar essa dupla com outro losango.
120. L5C7 precisa de um parceiro quadrado; só L5C8 pode recebê-lo (horizontal).
121. Na coluna 6, quadrado só cabe em L1C6 e L2C6; ambas as casas precisam dele.
122. coluna 7 já tem dois quadrado (L3C7, L5C7); exclua quadrado de L1C7.
123. coluna 8 já tem dois quadrado (L3C8, L5C8); exclua quadrado de L1C8.

## 70. Mestre — pacto-120

**Descoberta:** Entrada evidente, desenvolvimento remoto.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; prevenção de trio.

**Origem:** pacto-120; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 26; 134 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C4: quadrado — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 122.
- L3C6: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 76.
- L4C1: losango — prevenção de isolamento; parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 38.
- L4C2: triângulo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 46.
- L4C6: quadrado — prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 93.
- L5C3: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 6.
- L5C6: triângulo — parceiro obrigatório / orientação; primeira participação no passo 94.
- L5C8: círculo — cota saturada; exclusão junto à dupla; primeira participação no passo 11.
- L6C2: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L6C3: triângulo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 18.
- L6C8: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 1.
- L7C2: quadrado — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 18.
- L7C3: losango — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 6.
- L7C5: triângulo — posições restantes; cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 70.
- L8C4: círculo — prevenção de isolamento; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 53.

### Sequência lógica

1. linha 6 já tem dois círculo (L6C2, L6C8); exclua círculo de L6C1.
2. linha 6 já tem dois círculo (L6C2, L6C8); exclua círculo de L6C4.
3. linha 6 já tem dois círculo (L6C2, L6C8); exclua círculo de L6C5.
4. linha 6 já tem dois círculo (L6C2, L6C8); exclua círculo de L6C6.
5. linha 6 já tem dois círculo (L6C2, L6C8); exclua círculo de L6C7.
6. coluna 3 já tem dois losango (L5C3, L7C3); exclua losango de L1C3.
7. coluna 3 já tem dois losango (L5C3, L7C3); exclua losango de L2C3.
8. coluna 3 já tem dois losango (L5C3, L7C3); exclua losango de L3C3.
9. coluna 3 já tem dois losango (L5C3, L7C3); exclua losango de L4C3.
10. coluna 3 já tem dois losango (L5C3, L7C3); exclua losango de L8C3.
11. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L1C8.
12. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L2C8.
13. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L3C8.
14. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L4C8.
15. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L7C8.
16. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L8C8.
17. A dupla L5C8–L6C8 já está fechada; L5C7 não pode tocar essa dupla com outro círculo.
18. L6C2 precisa de um parceiro círculo; só L5C2 pode recebê-lo (vertical).
19. L6C3 precisa de um parceiro triângulo; só L6C4 pode recebê-lo (horizontal).
20. A dupla L6C4–L6C3 já está fechada; L5C4 não pode tocar essa dupla com outro triângulo.
21. A dupla L6C4–L6C3 já está fechada; L7C4 não pode tocar essa dupla com outro triângulo.
22. A dupla L6C4–L6C3 já está fechada; L6C5 não pode tocar essa dupla com outro triângulo.
23. L7C3 precisa de um parceiro losango; só L7C4 pode recebê-lo (horizontal).
24. linha 5 já tem dois círculo (L5C2, L5C8); exclua círculo de L5C1.
25. linha 5 já tem dois círculo (L5C2, L5C8); exclua círculo de L5C4.
26. linha 5 já tem dois círculo (L5C2, L5C8); exclua círculo de L5C5.
27. linha 6 já tem dois triângulo (L6C3, L6C4); exclua triângulo de L6C1.
28. linha 6 já tem dois triângulo (L6C3, L6C4); exclua triângulo de L6C6.
29. linha 6 já tem dois triângulo (L6C3, L6C4); exclua triângulo de L6C7.
30. linha 7 já tem dois losango (L7C3, L7C4); exclua losango de L7C1.
31. linha 7 já tem dois losango (L7C3, L7C4); exclua losango de L7C6.
32. linha 7 já tem dois losango (L7C3, L7C4); exclua losango de L7C7.
33. linha 7 já tem dois losango (L7C3, L7C4); exclua losango de L7C8.
34. coluna 2 já tem dois círculo (L5C2, L6C2); exclua círculo de L1C2.
35. coluna 2 já tem dois círculo (L5C2, L6C2); exclua círculo de L2C2.
36. coluna 2 já tem dois círculo (L5C2, L6C2); exclua círculo de L3C2.
37. coluna 2 já tem dois círculo (L5C2, L6C2); exclua círculo de L8C2.
38. L5C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
39. L5C3 precisa de um parceiro losango; só L5C4 pode recebê-lo (horizontal).
40. A dupla L5C4–L5C3 já está fechada; L4C4 não pode tocar essa dupla com outro losango.
41. A dupla L5C4–L5C3 já está fechada; L5C5 não pode tocar essa dupla com outro losango.
42. linha 5 já tem dois losango (L5C3, L5C4); exclua losango de L5C1.
43. linha 5 já tem dois losango (L5C3, L5C4); exclua losango de L5C7.
44. coluna 4 já tem dois losango (L5C4, L7C4); exclua losango de L2C4.
45. coluna 4 já tem dois losango (L5C4, L7C4); exclua losango de L3C4.
46. L4C1 precisa de um parceiro losango; só L3C1 pode recebê-lo (vertical).
47. L5C1 precisa de um parceiro quadrado; só L6C1 pode recebê-lo (vertical).
48. A dupla L6C1–L5C1 já está fechada; L7C1 não pode tocar essa dupla com outro quadrado.
49. L7C2 precisa de um parceiro quadrado; só L8C2 pode recebê-lo (vertical).
50. L8C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
51. A dupla L8C2–L7C2 já está fechada; L8C1 não pode tocar essa dupla com outro quadrado.
52. A dupla L8C2–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro quadrado.
53. L8C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
54. A dupla L8C4–L8C3 já está fechada; L8C5 não pode tocar essa dupla com outro círculo.
55. linha 8 já tem dois círculo (L8C3, L8C4); exclua círculo de L8C1.
56. linha 8 já tem dois círculo (L8C3, L8C4); exclua círculo de L8C6.
57. linha 8 já tem dois círculo (L8C3, L8C4); exclua círculo de L8C7.
58. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L1C1.
59. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L2C1.
60. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L1C1.
61. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L2C1.
62. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L1C2.
63. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L2C2.
64. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L3C2.
65. A dupla L3C1–L4C1 já está fechada; L3C2 não pode tocar essa dupla com outro losango.
66. A dupla L3C2–L4C2 já está fechada; L2C2 não pode tocar essa dupla com outro triângulo.
67. A dupla L3C2–L4C2 já está fechada; L3C3 não pode tocar essa dupla com outro triângulo.
68. A dupla L4C2–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro triângulo.
69. L7C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
70. Na linha 7, círculo só cabe em L7C6 e L7C7; ambas as casas precisam dele.
71. Na linha 7, círculo só cabe em L7C6 e L7C7; ambas as casas precisam dele.
72. linha 7 já tem dois triângulo (L7C1, L7C5); exclua triângulo de L7C8.
73. Na coluna 1, círculo só cabe em L1C1 e L2C1; ambas as casas precisam dele.
74. Na coluna 1, círculo só cabe em L1C1 e L2C1; ambas as casas precisam dele.
75. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L1C2.
76. coluna 6 já tem dois círculo (L3C6, L7C6); exclua círculo de L1C6.
77. coluna 6 já tem dois círculo (L3C6, L7C6); exclua círculo de L2C6.
78. L7C5 precisa de um parceiro triângulo; só L8C5 pode recebê-lo (vertical).
79. L7C8 precisa de um parceiro quadrado; só L8C8 pode recebê-lo (vertical).
80. A dupla L8C5–L7C5 já está fechada; L8C6 não pode tocar essa dupla com outro triângulo.
81. L8C7 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
82. A dupla L8C8–L7C8 já está fechada; L8C7 não pode tocar essa dupla com outro quadrado.
83. linha 8 já tem dois quadrado (L8C2, L8C8); exclua quadrado de L8C6.
84. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L1C5.
85. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L2C5.
86. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L3C5.
87. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L4C5.
88. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L5C5.
89. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L1C8.
90. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L2C8.
91. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L3C8.
92. coluna 8 já tem dois quadrado (L7C8, L8C8); exclua quadrado de L4C8.
93. L4C5 não pode ser quadrado: tocaria L5C5 e L4C6, formando um grupo maior que dois.
94. L4C6 precisa de um parceiro quadrado; só L4C7 pode recebê-lo (horizontal).
95. A dupla L4C7–L4C6 já está fechada; L3C7 não pode tocar essa dupla com outro quadrado.
96. A dupla L4C7–L4C6 já está fechada; L5C7 não pode tocar essa dupla com outro quadrado.
97. L5C5 precisa de um parceiro quadrado; só L6C5 pode recebê-lo (vertical).
98. A dupla L6C5–L5C5 já está fechada; L6C6 não pode tocar essa dupla com outro quadrado.
99. L6C6 precisa de um parceiro losango; só L6C7 pode recebê-lo (horizontal).
100. linha 4 já tem dois quadrado (L4C6, L4C7); exclua quadrado de L4C3.
101. linha 4 já tem dois quadrado (L4C6, L4C7); exclua quadrado de L4C4.
102. coluna 3 já tem dois círculo (L4C3, L8C3); exclua círculo de L1C3.
103. coluna 3 já tem dois círculo (L4C3, L8C3); exclua círculo de L2C3.
104. coluna 3 já tem dois círculo (L4C3, L8C3); exclua círculo de L3C3.
105. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L1C5.
106. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L2C5.
107. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L3C5.
108. coluna 6 já tem dois losango (L6C6, L8C6); exclua losango de L1C6.
109. coluna 6 já tem dois losango (L6C6, L8C6); exclua losango de L2C6.
110. coluna 7 já tem dois losango (L6C7, L8C7); exclua losango de L1C7.
111. coluna 7 já tem dois losango (L6C7, L8C7); exclua losango de L2C7.
112. coluna 7 já tem dois losango (L6C7, L8C7); exclua losango de L3C7.
113. L4C3 precisa de um parceiro círculo; só L4C4 pode recebê-lo (horizontal).
114. A dupla L4C4–L4C3 já está fechada; L3C4 não pode tocar essa dupla com outro círculo.
115. A dupla L4C4–L4C3 já está fechada; L4C5 não pode tocar essa dupla com outro círculo.
116. L4C5 precisa de um parceiro losango; só L3C5 pode recebê-lo (vertical).
117. Na linha 3, círculo só cabe em L3C6 e L3C7; ambas as casas precisam dele.
118. Na linha 3, quadrado só cabe em L3C3 e L3C4; ambas as casas precisam dele.
119. linha 3 já tem dois losango (L3C1, L3C5); exclua losango de L3C8.
120. Na linha 4, triângulo só cabe em L4C2 e L4C8; ambas as casas precisam dele.
121. coluna 4 já tem dois círculo (L4C4, L8C4); exclua círculo de L2C4.
122. Na coluna 4, triângulo só cabe em L2C4 e L6C4; ambas as casas precisam dele.
123. Na coluna 5, círculo só cabe em L1C5 e L2C5; ambas as casas precisam dele.
124. Na coluna 5, círculo só cabe em L1C5 e L2C5; ambas as casas precisam dele.
125. coluna 7 já tem dois círculo (L3C7, L7C7); exclua círculo de L1C7.
126. coluna 7 já tem dois círculo (L3C7, L7C7); exclua círculo de L2C7.
127. coluna 8 já tem dois triângulo (L3C8, L4C8); exclua triângulo de L1C8.
128. coluna 8 já tem dois triângulo (L3C8, L4C8); exclua triângulo de L2C8.
129. L1C4 precisa de um parceiro quadrado; só L1C3 pode recebê-lo (horizontal).
130. L2C3 não pode ser quadrado: tocaria L1C3 e L3C3, formando um grupo maior que dois.
131. Na linha 1, triângulo só cabe em L1C6 e L1C7; ambas as casas precisam dele.
132. Na linha 1, triângulo só cabe em L1C6 e L1C7; ambas as casas precisam dele.
133. linha 2 já tem dois triângulo (L2C3, L2C4); exclua triângulo de L2C6.
134. linha 2 já tem dois triângulo (L2C3, L2C4); exclua triângulo de L2C7.

## 71. Mestre — pacto-121

**Descoberta:** Orientações encadeadas entre linhas e colunas.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; hipótese refutada.

**Origem:** pacto-121; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 11; 53 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 26; 131 eliminações explicadas. Refutações: 7, 6, 8, 5 passos.

### Função das pistas

- L1C5: losango — parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; cota saturada; primeira participação no passo 55.
- L2C5: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 7.
- L2C8: losango — posições restantes; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 52.
- L4C5: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 7.
- L4C6: círculo — parceiro obrigatório / orientação; cota saturada; prevenção de isolamento; exclusão junto à dupla; primeira participação no passo 11.
- L5C1: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 1.
- L5C3: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 1.
- L7C2: quadrado — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 23.
- L7C3: triângulo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 23.
- L7C4: losango — parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 24.
- L8C6: quadrado — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 31.

### Sequência lógica

1. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C2.
2. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C4.
3. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C5.
4. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C6.
5. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C7.
6. linha 5 já tem dois quadrado (L5C1, L5C3); exclua quadrado de L5C8.
7. coluna 5 já tem dois quadrado (L2C5, L4C5); exclua quadrado de L3C5.
8. coluna 5 já tem dois quadrado (L2C5, L4C5); exclua quadrado de L6C5.
9. coluna 5 já tem dois quadrado (L2C5, L4C5); exclua quadrado de L7C5.
10. coluna 5 já tem dois quadrado (L2C5, L4C5); exclua quadrado de L8C5.
11. L4C5 precisa de um parceiro quadrado; só L4C4 pode recebê-lo (horizontal).
12. linha 4 já tem dois quadrado (L4C4, L4C5); exclua quadrado de L4C1.
13. linha 4 já tem dois quadrado (L4C4, L4C5); exclua quadrado de L4C2.
14. linha 4 já tem dois quadrado (L4C4, L4C5); exclua quadrado de L4C3.
15. linha 4 já tem dois quadrado (L4C4, L4C5); exclua quadrado de L4C7.
16. linha 4 já tem dois quadrado (L4C4, L4C5); exclua quadrado de L4C8.
17. A dupla L4C4–L4C5 já está fechada; L3C4 não pode tocar essa dupla com outro quadrado.
18. L5C1 precisa de um parceiro quadrado; só L6C1 pode recebê-lo (vertical).
19. L5C3 precisa de um parceiro quadrado; só L6C3 pode recebê-lo (vertical).
20. A dupla L6C1–L5C1 já está fechada; L7C1 não pode tocar essa dupla com outro quadrado.
21. A dupla L6C1–L5C1 já está fechada; L6C2 não pode tocar essa dupla com outro quadrado.
22. A dupla L6C3–L5C3 já está fechada; L6C4 não pode tocar essa dupla com outro quadrado.
23. L7C2 precisa de um parceiro quadrado; só L8C2 pode recebê-lo (vertical).
24. L7C3 precisa de um parceiro triângulo; só L8C3 pode recebê-lo (vertical).
25. A dupla L8C2–L7C2 já está fechada; L8C1 não pode tocar essa dupla com outro quadrado.
26. A dupla L8C3–L7C3 já está fechada; L8C4 não pode tocar essa dupla com outro triângulo.
27. L8C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
28. linha 6 já tem dois quadrado (L6C1, L6C3); exclua quadrado de L6C6.
29. linha 6 já tem dois quadrado (L6C1, L6C3); exclua quadrado de L6C7.
30. linha 6 já tem dois quadrado (L6C1, L6C3); exclua quadrado de L6C8.
31. linha 8 já tem dois quadrado (L8C2, L8C6); exclua quadrado de L8C7.
32. linha 8 já tem dois quadrado (L8C2, L8C6); exclua quadrado de L8C8.
33. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L1C1.
34. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L2C1.
35. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L3C1.
36. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L1C2.
37. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L2C2.
38. coluna 2 já tem dois quadrado (L7C2, L8C2); exclua quadrado de L3C2.
39. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L1C3.
40. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L2C3.
41. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L3C3.
42. coluna 3 já tem dois triângulo (L7C3, L8C3); exclua triângulo de L4C3.
43. coluna 3 já tem dois quadrado (L5C3, L6C3); exclua quadrado de L1C3.
44. coluna 3 já tem dois quadrado (L5C3, L6C3); exclua quadrado de L2C3.
45. coluna 3 já tem dois quadrado (L5C3, L6C3); exclua quadrado de L3C3.
46. L8C6 precisa de um parceiro quadrado; só L7C6 pode recebê-lo (vertical).
47. linha 7 já tem dois quadrado (L7C2, L7C6); exclua quadrado de L7C7.
48. linha 7 já tem dois quadrado (L7C2, L7C6); exclua quadrado de L7C8.
49. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L1C6.
50. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L2C6.
51. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L3C6.
52. Na coluna 8, quadrado só cabe em L1C8 e L3C8; ambas as casas precisam dele.
53. Na coluna 8, quadrado só cabe em L1C8 e L3C8; ambas as casas precisam dele.
54. L1C8 precisa de um parceiro quadrado; só L1C7 pode recebê-lo (horizontal).
55. L2C5 precisa de um parceiro quadrado; só L2C4 pode recebê-lo (horizontal).
56. L2C8 precisa de um parceiro losango; só L2C7 pode recebê-lo (horizontal).
57. L3C8 precisa de um parceiro quadrado; só L3C7 pode recebê-lo (horizontal).
58. linha 1 já tem dois quadrado (L1C7, L1C8); exclua quadrado de L1C4.
59. linha 2 já tem dois losango (L2C7, L2C8); exclua losango de L2C1.
60. linha 2 já tem dois losango (L2C7, L2C8); exclua losango de L2C2.
61. linha 2 já tem dois losango (L2C7, L2C8); exclua losango de L2C3.
62. linha 2 já tem dois losango (L2C7, L2C8); exclua losango de L2C6.
63. L1C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
64. Se L1C1 fosse losango, 7 deduções levariam a: L1C1 fica sem símbolo possível. L1C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua losango.
   - Hipótese, passo 1: Na linha 1, triângulo só cabe em L1C2 e L1C6; ambas as casas precisam dele.
   - Hipótese, passo 2: Na linha 1, triângulo só cabe em L1C2 e L1C6; ambas as casas precisam dele.
   - Hipótese, passo 3: linha 1 já tem dois losango (L1C1, L1C5); exclua losango de L1C3.
   - Hipótese, passo 4: linha 1 já tem dois losango (L1C1, L1C5); exclua losango de L1C4.
   - Hipótese, passo 5: coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L3C3.
   - Hipótese, passo 6: coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L4C3.
   - Hipótese, passo 7: L1C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C1 fica sem símbolo possível. L1C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
65. Se L1C2 fosse círculo, 6 deduções levariam a: L1C4 fica sem símbolo possível. L1C4 não pode ser losango: tocaria L1C3 e L1C5, formando um grupo maior que dois. Portanto, exclua círculo.
   - Hipótese, passo 1: Na linha 1, triângulo só cabe em L1C1 e L1C6; ambas as casas precisam dele.
   - Hipótese, passo 2: Na linha 1, triângulo só cabe em L1C1 e L1C6; ambas as casas precisam dele.
   - Hipótese, passo 3: L1C1 precisa de um parceiro triângulo; só L2C1 pode recebê-lo (vertical).
   - Hipótese, passo 4: L1C3 não pode ser círculo: tocaria L2C3 e L1C2, formando um grupo maior que dois.
   - Hipótese, passo 5: L1C3 precisa de um parceiro losango; só L1C4 pode recebê-lo (horizontal).
   - Hipótese, passo 6: L1C4 não pode ser losango: tocaria L1C3 e L1C5, formando um grupo maior que dois.
   - Contradição final: L1C4 fica sem símbolo possível. L1C4 não pode ser losango: tocaria L1C3 e L1C5, formando um grupo maior que dois.
66. Se L1C2 fosse losango, 8 deduções levariam a: L1C2 fica sem símbolo possível. L1C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua losango.
   - Hipótese, passo 1: Na linha 1, triângulo só cabe em L1C1 e L1C6; ambas as casas precisam dele.
   - Hipótese, passo 2: Na linha 1, triângulo só cabe em L1C1 e L1C6; ambas as casas precisam dele.
   - Hipótese, passo 3: linha 1 já tem dois losango (L1C2, L1C5); exclua losango de L1C3.
   - Hipótese, passo 4: linha 1 já tem dois losango (L1C2, L1C5); exclua losango de L1C4.
   - Hipótese, passo 5: coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L3C3.
   - Hipótese, passo 6: coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L4C3.
   - Hipótese, passo 7: L1C1 precisa de um parceiro triângulo; só L2C1 pode recebê-lo (vertical).
   - Hipótese, passo 8: L1C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C2 fica sem símbolo possível. L1C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
67. Se L1C1 fosse triângulo, 5 deduções levariam a: L2C2 fica sem símbolo possível. L2C2 não pode ser círculo: tocaria L2C1 e L2C3, formando um grupo maior que dois. Portanto, exclua triângulo.
   - Hipótese, passo 1: linha 1 já tem dois triângulo (L1C1, L1C2); exclua triângulo de L1C6.
   - Hipótese, passo 2: A dupla L1C1–L1C2 já está fechada; L2C1 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 3: A dupla L1C2–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 4: A dupla L2C1–L2C2 já está fechada; L3C1 não pode tocar essa dupla com outro círculo.
   - Hipótese, passo 5: L2C2 não pode ser círculo: tocaria L2C1 e L2C3, formando um grupo maior que dois.
   - Contradição final: L2C2 fica sem símbolo possível. L2C2 não pode ser círculo: tocaria L2C1 e L2C3, formando um grupo maior que dois.
68. Na linha 1, triângulo só cabe em L1C2 e L1C6; ambas as casas precisam dele.
69. L1C1 precisa de um parceiro círculo; só L2C1 pode recebê-lo (vertical).
70. L1C2 precisa de um parceiro triângulo; só L2C2 pode recebê-lo (vertical).
71. L1C5 precisa de um parceiro losango; só L1C4 pode recebê-lo (horizontal).
72. L1C6 precisa de um parceiro triângulo; só L2C6 pode recebê-lo (vertical).
73. A dupla L2C1–L1C1 já está fechada; L3C1 não pode tocar essa dupla com outro círculo.
74. A dupla L2C2–L1C2 já está fechada; L3C2 não pode tocar essa dupla com outro triângulo.
75. A dupla L2C6–L1C6 já está fechada; L3C6 não pode tocar essa dupla com outro triângulo.
76. Na linha 1, círculo só cabe em L1C1 e L1C3; ambas as casas precisam dele.
77. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L4C1.
78. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L7C1.
79. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L8C1.
80. coluna 2 já tem dois triângulo (L1C2, L2C2); exclua triângulo de L4C2.
81. coluna 2 já tem dois triângulo (L1C2, L2C2); exclua triângulo de L5C2.
82. coluna 2 já tem dois triângulo (L1C2, L2C2); exclua triângulo de L6C2.
83. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L3C3.
84. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L4C3.
85. coluna 4 já tem dois losango (L1C4, L7C4); exclua losango de L3C4.
86. coluna 4 já tem dois losango (L1C4, L7C4); exclua losango de L5C4.
87. coluna 4 já tem dois losango (L1C4, L7C4); exclua losango de L6C4.
88. coluna 4 já tem dois losango (L1C4, L7C4); exclua losango de L8C4.
89. coluna 6 já tem dois triângulo (L1C6, L2C6); exclua triângulo de L5C6.
90. coluna 6 já tem dois triângulo (L1C6, L2C6); exclua triângulo de L6C6.
91. A dupla L3C3–L4C3 já está fechada; L3C2 não pode tocar essa dupla com outro losango.
92. A dupla L4C3–L3C3 já está fechada; L4C2 não pode tocar essa dupla com outro losango.
93. L7C4 precisa de um parceiro losango; só L7C5 pode recebê-lo (horizontal).
94. A dupla L7C5–L7C4 já está fechada; L6C5 não pode tocar essa dupla com outro losango.
95. A dupla L7C5–L7C4 já está fechada; L8C5 não pode tocar essa dupla com outro losango.
96. L8C4 precisa de um parceiro círculo; só L8C5 pode recebê-lo (horizontal).
97. linha 4 já tem dois círculo (L4C2, L4C6); exclua círculo de L4C7.
98. linha 4 já tem dois círculo (L4C2, L4C6); exclua círculo de L4C8.
99. Na linha 7, círculo só cabe em L7C7 e L7C8; ambas as casas precisam dele.
100. Na linha 7, círculo só cabe em L7C7 e L7C8; ambas as casas precisam dele.
101. Na linha 7, triângulo só cabe em L7C1 e L7C3; ambas as casas precisam dele.
102. linha 8 já tem dois círculo (L8C4, L8C5); exclua círculo de L8C7.
103. linha 8 já tem dois círculo (L8C4, L8C5); exclua círculo de L8C8.
104. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L5C2.
105. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L6C2.
106. coluna 5 já tem dois losango (L1C5, L7C5); exclua losango de L3C5.
107. coluna 5 já tem dois losango (L1C5, L7C5); exclua losango de L5C5.
108. L3C6 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
109. A dupla L4C6–L3C6 já está fechada; L5C6 não pode tocar essa dupla com outro círculo.
110. L7C1 precisa de um parceiro triângulo; só L8C1 pode recebê-lo (vertical).
111. A dupla L7C7–L7C8 já está fechada; L6C7 não pode tocar essa dupla com outro círculo.
112. A dupla L7C8–L7C7 já está fechada; L6C8 não pode tocar essa dupla com outro círculo.
113. linha 3 já tem dois círculo (L3C2, L3C6); exclua círculo de L3C4.
114. linha 3 já tem dois círculo (L3C2, L3C6); exclua círculo de L3C5.
115. linha 3 já tem dois triângulo (L3C4, L3C5); exclua triângulo de L3C1.
116. linha 5 já tem dois losango (L5C2, L5C6); exclua losango de L5C7.
117. linha 5 já tem dois losango (L5C2, L5C6); exclua losango de L5C8.
118. linha 8 já tem dois triângulo (L8C1, L8C3); exclua triângulo de L8C7.
119. linha 8 já tem dois triângulo (L8C1, L8C3); exclua triângulo de L8C8.
120. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L4C1.
121. coluna 6 já tem dois círculo (L3C6, L4C6); exclua círculo de L6C6.
122. Na coluna 7, círculo só cabe em L5C7 e L7C7; ambas as casas precisam dele.
123. Na coluna 7, triângulo só cabe em L4C7 e L6C7; ambas as casas precisam dele.
124. Na coluna 7, triângulo só cabe em L4C7 e L6C7; ambas as casas precisam dele.
125. Na coluna 8, círculo só cabe em L5C8 e L7C8; ambas as casas precisam dele.
126. Na coluna 8, triângulo só cabe em L4C8 e L6C8; ambas as casas precisam dele.
127. Na coluna 8, triângulo só cabe em L4C8 e L6C8; ambas as casas precisam dele.
128. linha 5 já tem dois círculo (L5C7, L5C8); exclua círculo de L5C4.
129. linha 5 já tem dois círculo (L5C7, L5C8); exclua círculo de L5C5.
130. Na linha 6, círculo só cabe em L6C4 e L6C5; ambas as casas precisam dele.
131. Na linha 6, círculo só cabe em L6C4 e L6C5; ambas as casas precisam dele.

## 72. Mestre — pacto-156

**Descoberta:** Cadeia profunda de cotas e parceiros.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; exclusão junto à dupla; posições restantes; prevenção de trio; hipótese refutada.

**Origem:** pacto-156; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 9; 55 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 26; 137 eliminações explicadas. Refutações: 9, 5 passos.

### Função das pistas

- L2C8: círculo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 12.
- L3C6: triângulo — posições restantes; prevenção de isolamento; prevenção de trio; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 79.
- L3C7: losango — prevenção de isolamento; cota saturada; primeira participação no passo 19.
- L4C1: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L4C8: círculo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; primeira participação no passo 12.
- L5C6: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L6C6: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L7C1: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L8C4: círculo — prevenção de isolamento; posições restantes; prevenção de trio; cota saturada; parceiro obrigatório / orientação; primeira participação no passo 34.

### Sequência lógica

1. coluna 1 já tem dois losango (L4C1, L7C1); exclua losango de L1C1.
2. coluna 1 já tem dois losango (L4C1, L7C1); exclua losango de L2C1.
3. coluna 1 já tem dois losango (L4C1, L7C1); exclua losango de L3C1.
4. coluna 1 já tem dois losango (L4C1, L7C1); exclua losango de L5C1.
5. coluna 1 já tem dois losango (L4C1, L7C1); exclua losango de L6C1.
6. coluna 1 já tem dois losango (L4C1, L7C1); exclua losango de L8C1.
7. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L1C6.
8. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L2C6.
9. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L4C6.
10. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L7C6.
11. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L8C6.
12. coluna 8 já tem dois círculo (L2C8, L4C8); exclua círculo de L1C8.
13. coluna 8 já tem dois círculo (L2C8, L4C8); exclua círculo de L3C8.
14. coluna 8 já tem dois círculo (L2C8, L4C8); exclua círculo de L5C8.
15. coluna 8 já tem dois círculo (L2C8, L4C8); exclua círculo de L6C8.
16. coluna 8 já tem dois círculo (L2C8, L4C8); exclua círculo de L7C8.
17. coluna 8 já tem dois círculo (L2C8, L4C8); exclua círculo de L8C8.
18. L2C8 precisa de um parceiro círculo; só L2C7 pode recebê-lo (horizontal).
19. L3C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
20. L3C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
21. L4C1 precisa de um parceiro losango; só L4C2 pode recebê-lo (horizontal).
22. A dupla L4C2–L4C1 já está fechada; L3C2 não pode tocar essa dupla com outro losango.
23. A dupla L4C2–L4C1 já está fechada; L5C2 não pode tocar essa dupla com outro losango.
24. A dupla L4C2–L4C1 já está fechada; L4C3 não pode tocar essa dupla com outro losango.
25. L4C8 precisa de um parceiro círculo; só L4C7 pode recebê-lo (horizontal).
26. A dupla L5C6–L6C6 já está fechada; L5C5 não pode tocar essa dupla com outro losango.
27. A dupla L5C6–L6C6 já está fechada; L5C7 não pode tocar essa dupla com outro losango.
28. A dupla L6C6–L5C6 já está fechada; L6C5 não pode tocar essa dupla com outro losango.
29. A dupla L6C6–L5C6 já está fechada; L6C7 não pode tocar essa dupla com outro losango.
30. L7C1 precisa de um parceiro losango; só L7C2 pode recebê-lo (horizontal).
31. A dupla L7C2–L7C1 já está fechada; L6C2 não pode tocar essa dupla com outro losango.
32. A dupla L7C2–L7C1 já está fechada; L8C2 não pode tocar essa dupla com outro losango.
33. A dupla L7C2–L7C1 já está fechada; L7C3 não pode tocar essa dupla com outro losango.
34. L8C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
35. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C1.
36. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C2.
37. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C3.
38. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C4.
39. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C5.
40. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C6.
41. linha 3 já tem dois losango (L3C7, L3C8); exclua losango de L3C3.
42. linha 3 já tem dois losango (L3C7, L3C8); exclua losango de L3C4.
43. linha 3 já tem dois losango (L3C7, L3C8); exclua losango de L3C5.
44. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C3.
45. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C4.
46. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C5.
47. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C6.
48. linha 4 já tem dois losango (L4C1, L4C2); exclua losango de L4C4.
49. linha 4 já tem dois losango (L4C1, L4C2); exclua losango de L4C5.
50. linha 7 já tem dois losango (L7C1, L7C2); exclua losango de L7C4.
51. linha 7 já tem dois losango (L7C1, L7C2); exclua losango de L7C5.
52. linha 7 já tem dois losango (L7C1, L7C2); exclua losango de L7C7.
53. linha 7 já tem dois losango (L7C1, L7C2); exclua losango de L7C8.
54. coluna 2 já tem dois losango (L4C2, L7C2); exclua losango de L1C2.
55. coluna 2 já tem dois losango (L4C2, L7C2); exclua losango de L2C2.
56. coluna 7 já tem dois círculo (L2C7, L4C7); exclua círculo de L1C7.
57. coluna 7 já tem dois círculo (L2C7, L4C7); exclua círculo de L5C7.
58. coluna 7 já tem dois círculo (L2C7, L4C7); exclua círculo de L6C7.
59. coluna 7 já tem dois círculo (L2C7, L4C7); exclua círculo de L7C7.
60. coluna 7 já tem dois círculo (L2C7, L4C7); exclua círculo de L8C7.
61. L8C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
62. Na linha 8, losango só cabe em L8C7 e L8C8; ambas as casas precisam dele.
63. Na linha 8, losango só cabe em L8C7 e L8C8; ambas as casas precisam dele.
64. Na coluna 5, losango só cabe em L1C5 e L2C5; ambas as casas precisam dele.
65. Na coluna 5, losango só cabe em L1C5 e L2C5; ambas as casas precisam dele.
66. coluna 7 já tem dois losango (L3C7, L8C7); exclua losango de L1C7.
67. coluna 8 já tem dois losango (L3C8, L8C8); exclua losango de L1C8.
68. coluna 8 já tem dois losango (L3C8, L8C8); exclua losango de L5C8.
69. coluna 8 já tem dois losango (L3C8, L8C8); exclua losango de L6C8.
70. A dupla L1C5–L2C5 já está fechada; L1C4 não pode tocar essa dupla com outro losango.
71. L1C6 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
72. A dupla L2C5–L1C5 já está fechada; L2C4 não pode tocar essa dupla com outro losango.
73. Na linha 1, losango só cabe em L1C3 e L1C5; ambas as casas precisam dele.
74. Na linha 2, losango só cabe em L2C3 e L2C5; ambas as casas precisam dele.
75. coluna 3 já tem dois losango (L1C3, L2C3); exclua losango de L5C3.
76. coluna 3 já tem dois losango (L1C3, L2C3); exclua losango de L6C3.
77. Na coluna 4, losango só cabe em L5C4 e L6C4; ambas as casas precisam dele.
78. Na coluna 4, losango só cabe em L5C4 e L6C4; ambas as casas precisam dele.
79. Na coluna 6, círculo só cabe em L7C6 e L8C6; ambas as casas precisam dele.
80. Na coluna 6, círculo só cabe em L7C6 e L8C6; ambas as casas precisam dele.
81. L1C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
82. A dupla L7C6–L8C6 já está fechada; L7C5 não pode tocar essa dupla com outro círculo.
83. L8C5 não pode ser círculo: tocaria L8C4 e L8C6, formando um grupo maior que dois.
84. Na linha 1, círculo só cabe em L1C1 e L1C2; ambas as casas precisam dele.
85. Na linha 1, círculo só cabe em L1C1 e L1C2; ambas as casas precisam dele.
86. linha 8 já tem dois círculo (L8C4, L8C6); exclua círculo de L8C1.
87. linha 8 já tem dois círculo (L8C4, L8C6); exclua círculo de L8C2.
88. linha 8 já tem dois círculo (L8C4, L8C6); exclua círculo de L8C3.
89. L8C4 precisa de um parceiro círculo; só L7C4 pode recebê-lo (vertical).
90. linha 7 já tem dois círculo (L7C4, L7C6); exclua círculo de L7C3.
91. coluna 4 já tem dois círculo (L7C4, L8C4); exclua círculo de L3C4.
92. L3C5 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
93. Na coluna 5, círculo só cabe em L5C5 e L6C5; ambas as casas precisam dele.
94. Na coluna 5, círculo só cabe em L5C5 e L6C5; ambas as casas precisam dele.
95. Se L1C4 fosse triângulo, 9 deduções levariam a: L4C4 fica sem símbolo possível. L4C4 não pode ser quadrado: tocaria L3C4 e L4C5, formando um grupo maior que dois. Portanto, exclua triângulo.
   - Hipótese, passo 1: L1C4 precisa de um parceiro triângulo; só L2C4 pode recebê-lo (vertical).
   - Hipótese, passo 2: A dupla L2C4–L1C4 já está fechada; L3C4 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 3: coluna 4 já tem dois triângulo (L1C4, L2C4); exclua triângulo de L4C4.
   - Hipótese, passo 4: A dupla L3C4–L4C4 já está fechada; L3C3 não pode tocar essa dupla com outro quadrado.
   - Hipótese, passo 5: A dupla L3C4–L4C4 já está fechada; L3C5 não pode tocar essa dupla com outro quadrado.
   - Hipótese, passo 6: A dupla L3C5–L3C6 já está fechada; L4C5 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 7: A dupla L3C6–L3C5 já está fechada; L2C6 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 8: A dupla L3C6–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro triângulo.
   - Hipótese, passo 9: L4C4 não pode ser quadrado: tocaria L3C4 e L4C5, formando um grupo maior que dois.
   - Contradição final: L4C4 fica sem símbolo possível. L4C4 não pode ser quadrado: tocaria L3C4 e L4C5, formando um grupo maior que dois.
96. L1C4 precisa de um parceiro quadrado; só L2C4 pode recebê-lo (vertical).
97. A dupla L2C4–L1C4 já está fechada; L3C4 não pode tocar essa dupla com outro quadrado.
98. L3C5 não pode ser triângulo: tocaria L3C4 e L3C6, formando um grupo maior que dois.
99. L3C5 precisa de um parceiro quadrado; só L4C5 pode recebê-lo (vertical).
100. A dupla L4C5–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro quadrado.
101. A dupla L4C5–L3C5 já está fechada; L4C6 não pode tocar essa dupla com outro quadrado.
102. linha 3 já tem dois triângulo (L3C4, L3C6); exclua triângulo de L3C1.
103. linha 3 já tem dois triângulo (L3C4, L3C6); exclua triângulo de L3C2.
104. linha 3 já tem dois triângulo (L3C4, L3C6); exclua triângulo de L3C3.
105. linha 4 já tem dois triângulo (L4C4, L4C6); exclua triângulo de L4C3.
106. Na coluna 5, triângulo só cabe em L7C5 e L8C5; ambas as casas precisam dele.
107. Na coluna 5, triângulo só cabe em L7C5 e L8C5; ambas as casas precisam dele.
108. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L1C6.
109. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L2C6.
110. A dupla L1C6–L2C6 já está fechada; L1C7 não pode tocar essa dupla com outro quadrado.
111. L1C7 precisa de um parceiro triângulo; só L1C8 pode recebê-lo (horizontal).
112. Na linha 2, triângulo só cabe em L2C1 e L2C2; ambas as casas precisam dele.
113. Na linha 2, triângulo só cabe em L2C1 e L2C2; ambas as casas precisam dele.
114. Se L3C1 fosse quadrado, 5 deduções levariam a: L3C1 fica sem símbolo possível. L3C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua quadrado.
   - Hipótese, passo 1: Na linha 3, círculo só cabe em L3C2 e L3C3; ambas as casas precisam dele.
   - Hipótese, passo 2: Na linha 3, círculo só cabe em L3C2 e L3C3; ambas as casas precisam dele.
   - Hipótese, passo 3: coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L5C2.
   - Hipótese, passo 4: coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L6C2.
   - Hipótese, passo 5: L3C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L3C1 fica sem símbolo possível. L3C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
115. coluna 1 já tem dois círculo (L1C1, L3C1); exclua círculo de L5C1.
116. coluna 1 já tem dois círculo (L1C1, L3C1); exclua círculo de L6C1.
117. L3C1 precisa de um parceiro círculo; só L3C2 pode recebê-lo (horizontal).
118. A dupla L3C2–L3C1 já está fechada; L3C3 não pode tocar essa dupla com outro círculo.
119. A dupla L4C3–L3C3 já está fechada; L5C3 não pode tocar essa dupla com outro quadrado.
120. coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L5C2.
121. coluna 2 já tem dois círculo (L1C2, L3C2); exclua círculo de L6C2.
122. Na coluna 3, círculo só cabe em L5C3 e L6C3; ambas as casas precisam dele.
123. Na coluna 3, círculo só cabe em L5C3 e L6C3; ambas as casas precisam dele.
124. Na coluna 3, triângulo só cabe em L7C3 e L8C3; ambas as casas precisam dele.
125. Na coluna 3, triângulo só cabe em L7C3 e L8C3; ambas as casas precisam dele.
126. A dupla L8C3–L7C3 já está fechada; L8C2 não pode tocar essa dupla com outro triângulo.
127. linha 7 já tem dois triângulo (L7C3, L7C5); exclua triângulo de L7C7.
128. linha 7 já tem dois triângulo (L7C3, L7C5); exclua triângulo de L7C8.
129. linha 8 já tem dois triângulo (L8C3, L8C5); exclua triângulo de L8C1.
130. A dupla L7C7–L7C8 já está fechada; L6C7 não pode tocar essa dupla com outro quadrado.
131. A dupla L7C8–L7C7 já está fechada; L6C8 não pode tocar essa dupla com outro quadrado.
132. linha 6 já tem dois triângulo (L6C7, L6C8); exclua triângulo de L6C1.
133. linha 6 já tem dois triângulo (L6C7, L6C8); exclua triângulo de L6C2.
134. Na coluna 1, triângulo só cabe em L2C1 e L5C1; ambas as casas precisam dele.
135. Na coluna 2, triângulo só cabe em L2C2 e L5C2; ambas as casas precisam dele.
136. coluna 7 já tem dois triângulo (L1C7, L6C7); exclua triângulo de L5C7.
137. coluna 8 já tem dois triângulo (L1C8, L6C8); exclua triângulo de L5C8.

## 73. Mestre — pacto-v2-203

**Descoberta:** Compacto: hipótese curta necessária apesar das pistas.

**Técnicas combinadas:** cota saturada; hipótese refutada; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes.

**Origem:** pacto-115; recomposição de pistas; 22 pistas alteradas. **Pistas:** 37; 27 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 15; 80 eliminações explicadas. Refutações: 4 passos.

### Função das pistas

- L1C1: losango — cota saturada; primeira participação no passo 4.
- L1C2: quadrado — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L1C3: losango — cota saturada; primeira participação no passo 4.
- L1C4: círculo — cota saturada; primeira participação no passo 1.
- L1C5: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 1.
- L2C1: losango — cota saturada; posições restantes; primeira participação no passo 10.
- L2C2: quadrado — posições restantes; primeira participação no passo 49.
- L2C3: losango — cota saturada; posições restantes; prevenção de isolamento; primeira participação no passo 10.
- L2C7: círculo — cota saturada; posições restantes; primeira participação no passo 7.
- L2C8: círculo — cota saturada; prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 7.
- L3C1: quadrado — cota saturada; primeira participação no passo 65.
- L3C2: losango — prevenção de isolamento; primeira participação no passo 59.
- L3C4: círculo — cota saturada; prevenção de isolamento; primeira participação no passo 13.
- L3C5: círculo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 13.
- L4C1: quadrado — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L4C2: losango — cota saturada; primeira participação no passo 19.
- L4C5: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 50.
- L4C6: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 19.
- L4C7: círculo — cota saturada; posições restantes; primeira participação no passo 17.
- L4C8: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 17.
- L5C1: círculo — cota saturada; primeira participação no passo 21.
- L5C2: triângulo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L5C3: círculo — cota saturada; primeira participação no passo 21.
- L5C4: losango — cota saturada; primeira participação no passo 39.
- L5C8: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 56.
- L6C1: círculo — cota saturada; primeira participação no passo 24.
- L6C2: triângulo — andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova.
- L6C3: círculo — cota saturada; primeira participação no passo 24.
- L6C4: losango — cota saturada; primeira participação no passo 39.
- L7C1: triângulo — cota saturada; posições restantes; primeira participação no passo 67.
- L7C2: círculo — cota saturada; posições restantes; primeira participação no passo 28.
- L7C5: losango — cota saturada; posições restantes; primeira participação no passo 41.
- L7C6: círculo — cota saturada; posições restantes; primeira participação no passo 28.
- L8C1: triângulo — cota saturada; primeira participação no passo 70.
- L8C2: círculo — cota saturada; primeira participação no passo 32.
- L8C5: losango — cota saturada; primeira participação no passo 41.
- L8C6: círculo — cota saturada; posições restantes; primeira participação no passo 32.

### Sequência lógica

1. linha 1 já tem dois círculo (L1C4, L1C5); exclua círculo de L1C6.
2. linha 1 já tem dois círculo (L1C4, L1C5); exclua círculo de L1C7.
3. linha 1 já tem dois círculo (L1C4, L1C5); exclua círculo de L1C8.
4. linha 1 já tem dois losango (L1C1, L1C3); exclua losango de L1C6.
5. linha 1 já tem dois losango (L1C1, L1C3); exclua losango de L1C7.
6. linha 1 já tem dois losango (L1C1, L1C3); exclua losango de L1C8.
7. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C4.
8. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C5.
9. linha 2 já tem dois círculo (L2C7, L2C8); exclua círculo de L2C6.
10. linha 2 já tem dois losango (L2C1, L2C3); exclua losango de L2C4.
11. linha 2 já tem dois losango (L2C1, L2C3); exclua losango de L2C5.
12. linha 2 já tem dois losango (L2C1, L2C3); exclua losango de L2C6.
13. linha 3 já tem dois círculo (L3C4, L3C5); exclua círculo de L3C3.
14. linha 3 já tem dois círculo (L3C4, L3C5); exclua círculo de L3C6.
15. linha 3 já tem dois círculo (L3C4, L3C5); exclua círculo de L3C7.
16. linha 3 já tem dois círculo (L3C4, L3C5); exclua círculo de L3C8.
17. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C3.
18. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C4.
19. linha 4 já tem dois losango (L4C2, L4C6); exclua losango de L4C3.
20. linha 4 já tem dois losango (L4C2, L4C6); exclua losango de L4C4.
21. linha 5 já tem dois círculo (L5C1, L5C3); exclua círculo de L5C5.
22. linha 5 já tem dois círculo (L5C1, L5C3); exclua círculo de L5C6.
23. linha 5 já tem dois círculo (L5C1, L5C3); exclua círculo de L5C7.
24. linha 6 já tem dois círculo (L6C1, L6C3); exclua círculo de L6C5.
25. linha 6 já tem dois círculo (L6C1, L6C3); exclua círculo de L6C6.
26. linha 6 já tem dois círculo (L6C1, L6C3); exclua círculo de L6C7.
27. linha 6 já tem dois círculo (L6C1, L6C3); exclua círculo de L6C8.
28. linha 7 já tem dois círculo (L7C2, L7C6); exclua círculo de L7C3.
29. linha 7 já tem dois círculo (L7C2, L7C6); exclua círculo de L7C4.
30. linha 7 já tem dois círculo (L7C2, L7C6); exclua círculo de L7C7.
31. linha 7 já tem dois círculo (L7C2, L7C6); exclua círculo de L7C8.
32. linha 8 já tem dois círculo (L8C2, L8C6); exclua círculo de L8C3.
33. linha 8 já tem dois círculo (L8C2, L8C6); exclua círculo de L8C4.
34. linha 8 já tem dois círculo (L8C2, L8C6); exclua círculo de L8C7.
35. linha 8 já tem dois círculo (L8C2, L8C6); exclua círculo de L8C8.
36. coluna 3 já tem dois losango (L1C3, L2C3); exclua losango de L3C3.
37. coluna 3 já tem dois losango (L1C3, L2C3); exclua losango de L7C3.
38. coluna 3 já tem dois losango (L1C3, L2C3); exclua losango de L8C3.
39. coluna 4 já tem dois losango (L5C4, L6C4); exclua losango de L7C4.
40. coluna 4 já tem dois losango (L5C4, L6C4); exclua losango de L8C4.
41. coluna 5 já tem dois losango (L7C5, L8C5); exclua losango de L5C5.
42. coluna 5 já tem dois losango (L7C5, L8C5); exclua losango de L6C5.
43. Se L1C7 fosse quadrado, 4 deduções levariam a: L1C7 fica sem símbolo possível. L1C7 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua quadrado.
   - Hipótese, passo 1: Na linha 1, triângulo só cabe em L1C6 e L1C8; ambas as casas precisam dele.
   - Hipótese, passo 2: Na linha 1, triângulo só cabe em L1C6 e L1C8; ambas as casas precisam dele.
   - Hipótese, passo 3: L1C6 precisa de um parceiro triângulo; só L2C6 pode recebê-lo (vertical).
   - Hipótese, passo 4: L1C7 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C7 fica sem símbolo possível. L1C7 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
44. L1C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
45. linha 1 já tem dois triângulo (L1C7, L1C8); exclua triângulo de L1C6.
46. L1C6 precisa de um parceiro quadrado; só L2C6 pode recebê-lo (vertical).
47. A dupla L2C6–L1C6 já está fechada; L3C6 não pode tocar essa dupla com outro quadrado.
48. A dupla L2C6–L1C6 já está fechada; L2C5 não pode tocar essa dupla com outro quadrado.
49. Na linha 2, triângulo só cabe em L2C4 e L2C5; ambas as casas precisam dele.
50. coluna 5 já tem dois triângulo (L2C5, L4C5); exclua triângulo de L5C5.
51. coluna 5 já tem dois triângulo (L2C5, L4C5); exclua triângulo de L6C5.
52. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L5C6.
53. coluna 6 já tem dois quadrado (L1C6, L2C6); exclua quadrado de L6C6.
54. L4C5 precisa de um parceiro triângulo; só L4C4 pode recebê-lo (horizontal).
55. linha 4 já tem dois triângulo (L4C4, L4C5); exclua triângulo de L4C3.
56. linha 5 já tem dois quadrado (L5C5, L5C8); exclua quadrado de L5C7.
57. coluna 4 já tem dois triângulo (L2C4, L4C4); exclua triângulo de L7C4.
58. coluna 4 já tem dois triângulo (L2C4, L4C4); exclua triângulo de L8C4.
59. L3C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
60. L5C8 precisa de um parceiro quadrado; só L6C8 pode recebê-lo (vertical).
61. A dupla L6C8–L5C8 já está fechada; L7C8 não pode tocar essa dupla com outro quadrado.
62. A dupla L6C8–L5C8 já está fechada; L6C7 não pode tocar essa dupla com outro quadrado.
63. A dupla L7C4–L8C4 já está fechada; L7C3 não pode tocar essa dupla com outro quadrado.
64. A dupla L8C4–L7C4 já está fechada; L8C3 não pode tocar essa dupla com outro quadrado.
65. linha 3 já tem dois quadrado (L3C1, L3C3); exclua quadrado de L3C7.
66. linha 3 já tem dois quadrado (L3C1, L3C3); exclua quadrado de L3C8.
67. linha 7 já tem dois triângulo (L7C1, L7C3); exclua triângulo de L7C7.
68. linha 7 já tem dois triângulo (L7C1, L7C3); exclua triângulo de L7C8.
69. Na linha 7, quadrado só cabe em L7C4 e L7C7; ambas as casas precisam dele.
70. linha 8 já tem dois triângulo (L8C1, L8C3); exclua triângulo de L8C7.
71. linha 8 já tem dois triângulo (L8C1, L8C3); exclua triângulo de L8C8.
72. Na coluna 7, quadrado só cabe em L7C7 e L8C7; ambas as casas precisam dele.
73. Na coluna 8, triângulo só cabe em L1C8 e L3C8; ambas as casas precisam dele.
74. coluna 8 já tem dois quadrado (L5C8, L6C8); exclua quadrado de L8C8.
75. L3C8 precisa de um parceiro triângulo; só L3C7 pode recebê-lo (horizontal).
76. linha 3 já tem dois triângulo (L3C7, L3C8); exclua triângulo de L3C6.
77. Na coluna 6, triângulo só cabe em L5C6 e L6C6; ambas as casas precisam dele.
78. Na coluna 6, triângulo só cabe em L5C6 e L6C6; ambas as casas precisam dele.
79. coluna 7 já tem dois triângulo (L1C7, L3C7); exclua triângulo de L5C7.
80. coluna 7 já tem dois triângulo (L1C7, L3C7); exclua triângulo de L6C7.

## 74. Mestre — pacto-136

**Descoberta:** Orientações encadeadas entre linhas e colunas.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; prevenção de isolamento; prevenção de trio.

**Origem:** pacto-136; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 28; 130 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: losango — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 13.
- L1C2: círculo — parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; cota saturada; primeira participação no passo 13.
- L1C6: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 49.
- L2C3: triângulo — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 47.
- L2C4: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 20.
- L3C1: quadrado — parceiro obrigatório / orientação; posições restantes; primeira participação no passo 36.
- L3C8: losango — prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 70.
- L4C2: triângulo — cota saturada; parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; primeira participação no passo 1.
- L4C5: triângulo — cota saturada; posições restantes; primeira participação no passo 1.
- L5C2: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L5C8: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L6C5: losango — posições restantes; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 94.
- L7C1: triângulo — prevenção de isolamento; posições restantes; cota saturada; primeira participação no passo 38.
- L7C3: círculo — prevenção de trio; parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 117.
- L8C7: losango — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 41.

### Sequência lógica

1. linha 4 já tem dois triângulo (L4C2, L4C5); exclua triângulo de L4C1.
2. linha 4 já tem dois triângulo (L4C2, L4C5); exclua triângulo de L4C3.
3. linha 4 já tem dois triângulo (L4C2, L4C5); exclua triângulo de L4C4.
4. linha 4 já tem dois triângulo (L4C2, L4C5); exclua triângulo de L4C6.
5. linha 4 já tem dois triângulo (L4C2, L4C5); exclua triângulo de L4C7.
6. linha 4 já tem dois triângulo (L4C2, L4C5); exclua triângulo de L4C8.
7. linha 5 já tem dois quadrado (L5C2, L5C8); exclua quadrado de L5C1.
8. linha 5 já tem dois quadrado (L5C2, L5C8); exclua quadrado de L5C3.
9. linha 5 já tem dois quadrado (L5C2, L5C8); exclua quadrado de L5C4.
10. linha 5 já tem dois quadrado (L5C2, L5C8); exclua quadrado de L5C5.
11. linha 5 já tem dois quadrado (L5C2, L5C8); exclua quadrado de L5C6.
12. linha 5 já tem dois quadrado (L5C2, L5C8); exclua quadrado de L5C7.
13. L1C1 precisa de um parceiro losango; só L2C1 pode recebê-lo (vertical).
14. A dupla L2C1–L1C1 já está fechada; L2C2 não pode tocar essa dupla com outro losango.
15. L4C2 precisa de um parceiro triângulo; só L3C2 pode recebê-lo (vertical).
16. L5C2 precisa de um parceiro quadrado; só L6C2 pode recebê-lo (vertical).
17. A dupla L6C2–L5C2 já está fechada; L7C2 não pode tocar essa dupla com outro quadrado.
18. A dupla L6C2–L5C2 já está fechada; L6C1 não pode tocar essa dupla com outro quadrado.
19. A dupla L6C2–L5C2 já está fechada; L6C3 não pode tocar essa dupla com outro quadrado.
20. linha 2 já tem dois losango (L2C1, L2C4); exclua losango de L2C5.
21. linha 2 já tem dois losango (L2C1, L2C4); exclua losango de L2C6.
22. linha 2 já tem dois losango (L2C1, L2C4); exclua losango de L2C7.
23. linha 2 já tem dois losango (L2C1, L2C4); exclua losango de L2C8.
24. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L4C1.
25. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L5C1.
26. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L6C1.
27. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L8C1.
28. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L2C2.
29. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L7C2.
30. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L8C2.
31. coluna 2 já tem dois quadrado (L5C2, L6C2); exclua quadrado de L2C2.
32. coluna 2 já tem dois quadrado (L5C2, L6C2); exclua quadrado de L8C2.
33. Na coluna 2, losango só cabe em L7C2 e L8C2; ambas as casas precisam dele.
34. Na coluna 2, losango só cabe em L7C2 e L8C2; ambas as casas precisam dele.
35. A dupla L1C2–L2C2 já está fechada; L1C3 não pode tocar essa dupla com outro círculo.
36. L3C1 precisa de um parceiro quadrado; só L4C1 pode recebê-lo (vertical).
37. A dupla L3C2–L4C2 já está fechada; L3C3 não pode tocar essa dupla com outro triângulo.
38. L8C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
39. L8C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
40. A dupla L8C2–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro losango.
41. linha 8 já tem dois losango (L8C2, L8C7); exclua losango de L8C4.
42. linha 8 já tem dois losango (L8C2, L8C7); exclua losango de L8C5.
43. linha 8 já tem dois losango (L8C2, L8C7); exclua losango de L8C6.
44. linha 8 já tem dois losango (L8C2, L8C7); exclua losango de L8C8.
45. Na coluna 1, círculo só cabe em L5C1 e L6C1; ambas as casas precisam dele.
46. Na coluna 1, círculo só cabe em L5C1 e L6C1; ambas as casas precisam dele.
47. L2C3 precisa de um parceiro triângulo; só L1C3 pode recebê-lo (vertical).
48. L8C7 precisa de um parceiro losango; só L7C7 pode recebê-lo (vertical).
49. linha 1 já tem dois triângulo (L1C3, L1C6); exclua triângulo de L1C4.
50. linha 1 já tem dois triângulo (L1C3, L1C6); exclua triângulo de L1C5.
51. linha 1 já tem dois triângulo (L1C3, L1C6); exclua triângulo de L1C7.
52. linha 1 já tem dois triângulo (L1C3, L1C6); exclua triângulo de L1C8.
53. linha 7 já tem dois losango (L7C2, L7C7); exclua losango de L7C4.
54. linha 7 já tem dois losango (L7C2, L7C7); exclua losango de L7C5.
55. linha 7 já tem dois losango (L7C2, L7C7); exclua losango de L7C6.
56. linha 7 já tem dois losango (L7C2, L7C7); exclua losango de L7C8.
57. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L5C3.
58. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L6C3.
59. coluna 3 já tem dois triângulo (L1C3, L2C3); exclua triângulo de L8C3.
60. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L1C7.
61. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L3C7.
62. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L4C7.
63. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L5C7.
64. coluna 7 já tem dois losango (L7C7, L8C7); exclua losango de L6C7.
65. L1C6 precisa de um parceiro triângulo; só L2C6 pode recebê-lo (vertical).
66. L1C8 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
67. A dupla L2C6–L1C6 já está fechada; L3C6 não pode tocar essa dupla com outro triângulo.
68. A dupla L2C6–L1C6 já está fechada; L2C5 não pode tocar essa dupla com outro triângulo.
69. A dupla L2C6–L1C6 já está fechada; L2C7 não pode tocar essa dupla com outro triângulo.
70. L2C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
71. L3C7 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
72. L3C8 precisa de um parceiro losango; só L4C8 pode recebê-lo (vertical).
73. L5C8 precisa de um parceiro quadrado; só L6C8 pode recebê-lo (vertical).
74. A dupla L6C8–L5C8 já está fechada; L7C8 não pode tocar essa dupla com outro quadrado.
75. A dupla L6C8–L5C8 já está fechada; L6C7 não pode tocar essa dupla com outro quadrado.
76. L8C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
77. linha 6 já tem dois quadrado (L6C2, L6C8); exclua quadrado de L6C4.
78. linha 6 já tem dois quadrado (L6C2, L6C8); exclua quadrado de L6C6.
79. coluna 6 já tem dois triângulo (L1C6, L2C6); exclua triângulo de L5C6.
80. coluna 6 já tem dois triângulo (L1C6, L2C6); exclua triângulo de L6C6.
81. coluna 6 já tem dois triângulo (L1C6, L2C6); exclua triângulo de L7C6.
82. coluna 6 já tem dois triângulo (L1C6, L2C6); exclua triângulo de L8C6.
83. Na coluna 7, triângulo só cabe em L5C7 e L6C7; ambas as casas precisam dele.
84. Na coluna 7, triângulo só cabe em L5C7 e L6C7; ambas as casas precisam dele.
85. Na coluna 8, triângulo só cabe em L7C8 e L8C8; ambas as casas precisam dele.
86. Na coluna 8, triângulo só cabe em L7C8 e L8C8; ambas as casas precisam dele.
87. coluna 8 já tem dois quadrado (L5C8, L6C8); exclua quadrado de L1C8.
88. coluna 8 já tem dois quadrado (L5C8, L6C8); exclua quadrado de L2C8.
89. A dupla L1C8–L2C8 já está fechada; L1C7 não pode tocar essa dupla com outro círculo.
90. A dupla L2C8–L1C8 já está fechada; L2C7 não pode tocar essa dupla com outro círculo.
91. linha 1 já tem dois círculo (L1C2, L1C8); exclua círculo de L1C4.
92. linha 1 já tem dois círculo (L1C2, L1C8); exclua círculo de L1C5.
93. linha 2 já tem dois círculo (L2C2, L2C8); exclua círculo de L2C5.
94. Na linha 6, triângulo só cabe em L6C4 e L6C7; ambas as casas precisam dele.
95. linha 7 já tem dois triângulo (L7C1, L7C8); exclua triângulo de L7C4.
96. linha 7 já tem dois triângulo (L7C1, L7C8); exclua triângulo de L7C5.
97. linha 8 já tem dois triângulo (L8C1, L8C8); exclua triângulo de L8C4.
98. linha 8 já tem dois triângulo (L8C1, L8C8); exclua triângulo de L8C5.
99. Na coluna 7, círculo só cabe em L3C7 e L4C7; ambas as casas precisam dele.
100. Na coluna 7, círculo só cabe em L3C7 e L4C7; ambas as casas precisam dele.
101. A dupla L3C7–L4C7 já está fechada; L3C6 não pode tocar essa dupla com outro círculo.
102. A dupla L4C7–L3C7 já está fechada; L4C6 não pode tocar essa dupla com outro círculo.
103. L6C4 precisa de um parceiro triângulo; só L5C4 pode recebê-lo (vertical).
104. linha 5 já tem dois triângulo (L5C4, L5C7); exclua triângulo de L5C5.
105. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L3C4.
106. Na coluna 5, triângulo só cabe em L3C5 e L4C5; ambas as casas precisam dele.
107. L2C5 precisa de um parceiro quadrado; só L1C5 pode recebê-lo (vertical).
108. linha 1 já tem dois quadrado (L1C5, L1C7); exclua quadrado de L1C4.
109. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L3C4.
110. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L4C4.
111. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L7C5.
112. coluna 5 já tem dois quadrado (L1C5, L2C5); exclua quadrado de L8C5.
113. Na coluna 5, losango só cabe em L5C5 e L6C5; ambas as casas precisam dele.
114. A dupla L5C5–L6C5 já está fechada; L5C6 não pode tocar essa dupla com outro losango.
115. L5C6 precisa de um parceiro círculo; só L6C6 pode recebê-lo (vertical).
116. A dupla L6C6–L5C6 já está fechada; L7C6 não pode tocar essa dupla com outro círculo.
117. L7C4 não pode ser círculo: tocaria L7C3 e L7C5, formando um grupo maior que dois.
118. L7C4 precisa de um parceiro quadrado; só L8C4 pode recebê-lo (vertical).
119. L7C6 precisa de um parceiro quadrado; só L8C6 pode recebê-lo (vertical).
120. A dupla L8C4–L7C4 já está fechada; L8C3 não pode tocar essa dupla com outro quadrado.
121. linha 5 já tem dois círculo (L5C1, L5C6); exclua círculo de L5C3.
122. linha 6 já tem dois círculo (L6C1, L6C6); exclua círculo de L6C3.
123. coluna 3 já tem dois círculo (L7C3, L8C3); exclua círculo de L3C3.
124. coluna 3 já tem dois círculo (L7C3, L8C3); exclua círculo de L4C3.
125. Na coluna 3, quadrado só cabe em L3C3 e L4C3; ambas as casas precisam dele.
126. Na coluna 3, quadrado só cabe em L3C3 e L4C3; ambas as casas precisam dele.
127. Na coluna 4, círculo só cabe em L3C4 e L4C4; ambas as casas precisam dele.
128. Na coluna 4, círculo só cabe em L3C4 e L4C4; ambas as casas precisam dele.
129. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L3C6.
130. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L4C6.

## 75. Mestre — pacto-178

**Descoberta:** Cadeia profunda de cotas e parceiros.

**Técnicas combinadas:** cota saturada; prevenção de isolamento; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes.

**Origem:** pacto-178; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 28; 133 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: quadrado — prevenção de isolamento; posições restantes; exclusão junto à dupla; primeira participação no passo 25.
- L1C8: triângulo — parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; cota saturada; primeira participação no passo 78.
- L2C2: losango — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 1.
- L2C5: losango — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L3C1: losango — cota saturada; prevenção de isolamento; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 18.
- L3C4: círculo — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 121.
- L4C1: losango — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 18.
- L4C5: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 20.
- L5C1: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 7.
- L5C8: círculo — cota saturada; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 7.
- L6C4: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 13.
- L6C5: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 20.
- L6C7: losango — cota saturada; posições restantes; primeira participação no passo 13.
- L7C4: quadrado — parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; posições restantes; primeira participação no passo 32.
- L8C7: triângulo — cota saturada; parceiro obrigatório / orientação; primeira participação no passo 56.

### Sequência lógica

1. linha 2 já tem dois losango (L2C2, L2C5); exclua losango de L2C1.
2. linha 2 já tem dois losango (L2C2, L2C5); exclua losango de L2C3.
3. linha 2 já tem dois losango (L2C2, L2C5); exclua losango de L2C4.
4. linha 2 já tem dois losango (L2C2, L2C5); exclua losango de L2C6.
5. linha 2 já tem dois losango (L2C2, L2C5); exclua losango de L2C7.
6. linha 2 já tem dois losango (L2C2, L2C5); exclua losango de L2C8.
7. linha 5 já tem dois círculo (L5C1, L5C8); exclua círculo de L5C2.
8. linha 5 já tem dois círculo (L5C1, L5C8); exclua círculo de L5C3.
9. linha 5 já tem dois círculo (L5C1, L5C8); exclua círculo de L5C4.
10. linha 5 já tem dois círculo (L5C1, L5C8); exclua círculo de L5C5.
11. linha 5 já tem dois círculo (L5C1, L5C8); exclua círculo de L5C6.
12. linha 5 já tem dois círculo (L5C1, L5C8); exclua círculo de L5C7.
13. linha 6 já tem dois losango (L6C4, L6C7); exclua losango de L6C1.
14. linha 6 já tem dois losango (L6C4, L6C7); exclua losango de L6C2.
15. linha 6 já tem dois losango (L6C4, L6C7); exclua losango de L6C3.
16. linha 6 já tem dois losango (L6C4, L6C7); exclua losango de L6C6.
17. linha 6 já tem dois losango (L6C4, L6C7); exclua losango de L6C8.
18. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L7C1.
19. coluna 1 já tem dois losango (L3C1, L4C1); exclua losango de L8C1.
20. coluna 5 já tem dois triângulo (L4C5, L6C5); exclua triângulo de L1C5.
21. coluna 5 já tem dois triângulo (L4C5, L6C5); exclua triângulo de L3C5.
22. coluna 5 já tem dois triângulo (L4C5, L6C5); exclua triângulo de L5C5.
23. coluna 5 já tem dois triângulo (L4C5, L6C5); exclua triângulo de L7C5.
24. coluna 5 já tem dois triângulo (L4C5, L6C5); exclua triângulo de L8C5.
25. L2C1 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
26. L2C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
27. A dupla L3C1–L4C1 já está fechada; L3C2 não pode tocar essa dupla com outro losango.
28. A dupla L4C1–L3C1 já está fechada; L4C2 não pode tocar essa dupla com outro losango.
29. L5C1 precisa de um parceiro círculo; só L6C1 pode recebê-lo (vertical).
30. A dupla L6C1–L5C1 já está fechada; L7C1 não pode tocar essa dupla com outro círculo.
31. A dupla L6C1–L5C1 já está fechada; L6C2 não pode tocar essa dupla com outro círculo.
32. L6C4 precisa de um parceiro losango; só L5C4 pode recebê-lo (vertical).
33. L6C5 precisa de um parceiro triângulo; só L6C6 pode recebê-lo (horizontal).
34. A dupla L6C6–L6C5 já está fechada; L5C6 não pode tocar essa dupla com outro triângulo.
35. A dupla L6C6–L6C5 já está fechada; L7C6 não pode tocar essa dupla com outro triângulo.
36. linha 6 já tem dois triângulo (L6C5, L6C6); exclua triângulo de L6C2.
37. linha 6 já tem dois triângulo (L6C5, L6C6); exclua triângulo de L6C3.
38. linha 6 já tem dois triângulo (L6C5, L6C6); exclua triângulo de L6C8.
39. coluna 1 já tem dois círculo (L5C1, L6C1); exclua círculo de L8C1.
40. Na coluna 1, triângulo só cabe em L7C1 e L8C1; ambas as casas precisam dele.
41. Na coluna 1, triângulo só cabe em L7C1 e L8C1; ambas as casas precisam dele.
42. coluna 4 já tem dois losango (L5C4, L6C4); exclua losango de L1C4.
43. coluna 4 já tem dois losango (L5C4, L6C4); exclua losango de L4C4.
44. coluna 4 já tem dois losango (L5C4, L6C4); exclua losango de L8C4.
45. A dupla L1C1–L2C1 já está fechada; L1C2 não pode tocar essa dupla com outro quadrado.
46. L2C2 precisa de um parceiro losango; só L1C2 pode recebê-lo (vertical).
47. A dupla L5C4–L6C4 já está fechada; L5C3 não pode tocar essa dupla com outro losango.
48. A dupla L5C4–L6C4 já está fechada; L5C5 não pode tocar essa dupla com outro losango.
49. L5C5 precisa de um parceiro quadrado; só L5C6 pode recebê-lo (horizontal).
50. A dupla L5C6–L5C5 já está fechada; L4C6 não pode tocar essa dupla com outro quadrado.
51. A dupla L5C6–L5C5 já está fechada; L5C7 não pode tocar essa dupla com outro quadrado.
52. A dupla L7C1–L8C1 já está fechada; L7C2 não pode tocar essa dupla com outro triângulo.
53. A dupla L8C1–L7C1 já está fechada; L8C2 não pode tocar essa dupla com outro triângulo.
54. linha 5 já tem dois quadrado (L5C5, L5C6); exclua quadrado de L5C2.
55. linha 5 já tem dois quadrado (L5C5, L5C6); exclua quadrado de L5C3.
56. linha 8 já tem dois triângulo (L8C1, L8C7); exclua triângulo de L8C3.
57. linha 8 já tem dois triângulo (L8C1, L8C7); exclua triângulo de L8C4.
58. linha 8 já tem dois triângulo (L8C1, L8C7); exclua triângulo de L8C6.
59. linha 8 já tem dois triângulo (L8C1, L8C7); exclua triângulo de L8C8.
60. coluna 2 já tem dois losango (L1C2, L2C2); exclua losango de L5C2.
61. coluna 2 já tem dois losango (L1C2, L2C2); exclua losango de L7C2.
62. coluna 2 já tem dois losango (L1C2, L2C2); exclua losango de L8C2.
63. A dupla L1C2–L2C2 já está fechada; L1C3 não pode tocar essa dupla com outro losango.
64. A dupla L5C2–L5C3 já está fechada; L4C2 não pode tocar essa dupla com outro triângulo.
65. A dupla L5C3–L5C2 já está fechada; L4C3 não pode tocar essa dupla com outro triângulo.
66. L7C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
67. L8C7 precisa de um parceiro triângulo; só L7C7 pode recebê-lo (vertical).
68. linha 5 já tem dois triângulo (L5C2, L5C3); exclua triângulo de L5C7.
69. linha 7 já tem dois triângulo (L7C1, L7C7); exclua triângulo de L7C8.
70. Na coluna 2, triângulo só cabe em L3C2 e L5C2; ambas as casas precisam dele.
71. coluna 7 já tem dois triângulo (L7C7, L8C7); exclua triângulo de L1C7.
72. coluna 7 já tem dois triângulo (L7C7, L8C7); exclua triângulo de L2C7.
73. coluna 7 já tem dois triângulo (L7C7, L8C7); exclua triângulo de L3C7.
74. coluna 7 já tem dois triângulo (L7C7, L8C7); exclua triângulo de L4C7.
75. coluna 7 já tem dois losango (L5C7, L6C7); exclua losango de L1C7.
76. coluna 7 já tem dois losango (L5C7, L6C7); exclua losango de L3C7.
77. coluna 7 já tem dois losango (L5C7, L6C7); exclua losango de L4C7.
78. L1C8 precisa de um parceiro triângulo; só L2C8 pode recebê-lo (vertical).
79. A dupla L2C8–L1C8 já está fechada; L3C8 não pode tocar essa dupla com outro triângulo.
80. L3C2 precisa de um parceiro triângulo; só L3C3 pode recebê-lo (horizontal).
81. A dupla L3C3–L3C2 já está fechada; L2C3 não pode tocar essa dupla com outro triângulo.
82. L4C3 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
83. L4C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
84. linha 3 já tem dois triângulo (L3C2, L3C3); exclua triângulo de L3C6.
85. coluna 3 já tem dois triângulo (L3C3, L5C3); exclua triângulo de L1C3.
86. Na coluna 3, losango só cabe em L7C3 e L8C3; ambas as casas precisam dele.
87. Na coluna 3, losango só cabe em L7C3 e L8C3; ambas as casas precisam dele.
88. L6C3 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
89. Na linha 6, círculo só cabe em L6C1 e L6C8; ambas as casas precisam dele.
90. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L3C8.
91. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L4C8.
92. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L7C8.
93. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L8C8.
94. A dupla L6C2–L6C3 já está fechada; L7C2 não pode tocar essa dupla com outro quadrado.
95. L7C2 precisa de um parceiro círculo; só L8C2 pode recebê-lo (vertical).
96. coluna 2 já tem dois círculo (L7C2, L8C2); exclua círculo de L4C2.
97. L4C2 precisa de um parceiro quadrado; só L4C3 pode recebê-lo (horizontal).
98. A dupla L4C3–L4C2 já está fechada; L4C4 não pode tocar essa dupla com outro quadrado.
99. linha 4 já tem dois quadrado (L4C2, L4C3); exclua quadrado de L4C7.
100. linha 4 já tem dois quadrado (L4C2, L4C3); exclua quadrado de L4C8.
101. linha 4 já tem dois losango (L4C1, L4C8); exclua losango de L4C6.
102. Na coluna 3, círculo só cabe em L1C3 e L2C3; ambas as casas precisam dele.
103. Na coluna 3, círculo só cabe em L1C3 e L2C3; ambas as casas precisam dele.
104. A dupla L1C3–L2C3 já está fechada; L1C4 não pode tocar essa dupla com outro círculo.
105. A dupla L2C3–L1C3 já está fechada; L2C4 não pode tocar essa dupla com outro círculo.
106. L4C8 precisa de um parceiro losango; só L3C8 pode recebê-lo (vertical).
107. linha 3 já tem dois losango (L3C1, L3C8); exclua losango de L3C5.
108. linha 3 já tem dois losango (L3C1, L3C8); exclua losango de L3C6.
109. Na coluna 8, quadrado só cabe em L7C8 e L8C8; ambas as casas precisam dele.
110. Na coluna 8, quadrado só cabe em L7C8 e L8C8; ambas as casas precisam dele.
111. L2C5 precisa de um parceiro losango; só L1C5 pode recebê-lo (vertical).
112. linha 1 já tem dois losango (L1C2, L1C5); exclua losango de L1C6.
113. linha 7 já tem dois quadrado (L7C4, L7C8); exclua quadrado de L7C5.
114. linha 7 já tem dois quadrado (L7C4, L7C8); exclua quadrado de L7C6.
115. coluna 5 já tem dois losango (L1C5, L2C5); exclua losango de L7C5.
116. coluna 5 já tem dois losango (L1C5, L2C5); exclua losango de L8C5.
117. Na coluna 6, losango só cabe em L7C6 e L8C6; ambas as casas precisam dele.
118. Na coluna 6, losango só cabe em L7C6 e L8C6; ambas as casas precisam dele.
119. L7C4 precisa de um parceiro quadrado; só L8C4 pode recebê-lo (vertical).
120. L7C5 precisa de um parceiro círculo; só L8C5 pode recebê-lo (vertical).
121. Na coluna 4, círculo só cabe em L3C4 e L4C4; ambas as casas precisam dele.
122. Na coluna 4, triângulo só cabe em L1C4 e L2C4; ambas as casas precisam dele.
123. Na coluna 4, triângulo só cabe em L1C4 e L2C4; ambas as casas precisam dele.
124. coluna 5 já tem dois círculo (L7C5, L8C5); exclua círculo de L3C5.
125. L3C5 precisa de um parceiro quadrado; só L3C6 pode recebê-lo (horizontal).
126. A dupla L3C6–L3C5 já está fechada; L2C6 não pode tocar essa dupla com outro quadrado.
127. A dupla L3C6–L3C5 já está fechada; L3C7 não pode tocar essa dupla com outro quadrado.
128. A dupla L3C7–L4C7 já está fechada; L2C7 não pode tocar essa dupla com outro círculo.
129. L4C5 precisa de um parceiro triângulo; só L4C6 pode recebê-lo (horizontal).
130. linha 1 já tem dois triângulo (L1C4, L1C8); exclua triângulo de L1C6.
131. Na linha 2, círculo só cabe em L2C3 e L2C6; ambas as casas precisam dele.
132. Na coluna 6, círculo só cabe em L1C6 e L2C6; ambas as casas precisam dele.
133. coluna 7 já tem dois círculo (L3C7, L4C7); exclua círculo de L1C7.

## 76. Modo Sábio — pacto-124

**Descoberta:** Síntese 1: orientação decisiva.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; prevenção de trio; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; hipótese refutada.

**Origem:** pacto-124; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 21; 134 eliminações explicadas. Refutações: 2, 2 passos.

### Função das pistas

- L2C1: círculo — cota saturada; prevenção de trio; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L2C3: quadrado — cota saturada; exclusão junto à dupla; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 5.
- L2C4: quadrado — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 5.
- L2C5: círculo — cota saturada; posições restantes; primeira participação no passo 1.
- L3C2: círculo — cota saturada; prevenção de trio; exclusão junto à dupla; prevenção de isolamento; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 14.
- L4C2: círculo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 14.
- L4C3: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 18.
- L4C7: losango — parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 39.
- L5C3: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 9.
- L5C6: losango — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 23.
- L5C7: círculo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 9.
- L6C1: quadrado — cota saturada; primeira participação no passo 60.
- L6C4: triângulo — prevenção de isolamento; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 57.
- L6C6: losango — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 23.
- L7C7: triângulo — prevenção de isolamento; posições restantes; primeira participação no passo 102.

### Sequência lógica

1. linha 2 já tem dois círculo (L2C1, L2C5); exclua círculo de L2C2.
2. linha 2 já tem dois círculo (L2C1, L2C5); exclua círculo de L2C6.
3. linha 2 já tem dois círculo (L2C1, L2C5); exclua círculo de L2C7.
4. linha 2 já tem dois círculo (L2C1, L2C5); exclua círculo de L2C8.
5. linha 2 já tem dois quadrado (L2C3, L2C4); exclua quadrado de L2C2.
6. linha 2 já tem dois quadrado (L2C3, L2C4); exclua quadrado de L2C6.
7. linha 2 já tem dois quadrado (L2C3, L2C4); exclua quadrado de L2C7.
8. linha 2 já tem dois quadrado (L2C3, L2C4); exclua quadrado de L2C8.
9. linha 5 já tem dois círculo (L5C3, L5C7); exclua círculo de L5C1.
10. linha 5 já tem dois círculo (L5C3, L5C7); exclua círculo de L5C2.
11. linha 5 já tem dois círculo (L5C3, L5C7); exclua círculo de L5C4.
12. linha 5 já tem dois círculo (L5C3, L5C7); exclua círculo de L5C5.
13. linha 5 já tem dois círculo (L5C3, L5C7); exclua círculo de L5C8.
14. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L1C2.
15. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L6C2.
16. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L7C2.
17. coluna 2 já tem dois círculo (L3C2, L4C2); exclua círculo de L8C2.
18. coluna 3 já tem dois quadrado (L2C3, L4C3); exclua quadrado de L1C3.
19. coluna 3 já tem dois quadrado (L2C3, L4C3); exclua quadrado de L3C3.
20. coluna 3 já tem dois quadrado (L2C3, L4C3); exclua quadrado de L6C3.
21. coluna 3 já tem dois quadrado (L2C3, L4C3); exclua quadrado de L7C3.
22. coluna 3 já tem dois quadrado (L2C3, L4C3); exclua quadrado de L8C3.
23. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L1C6.
24. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L2C6.
25. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L3C6.
26. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L4C6.
27. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L7C6.
28. coluna 6 já tem dois losango (L5C6, L6C6); exclua losango de L8C6.
29. A dupla L2C4–L2C3 já está fechada; L1C4 não pode tocar essa dupla com outro quadrado.
30. A dupla L2C4–L2C3 já está fechada; L3C4 não pode tocar essa dupla com outro quadrado.
31. L3C1 não pode ser círculo: tocaria L2C1 e L3C2, formando um grupo maior que dois.
32. A dupla L3C2–L4C2 já está fechada; L3C3 não pode tocar essa dupla com outro círculo.
33. A dupla L4C2–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro círculo.
34. L4C3 precisa de um parceiro quadrado; só L4C4 pode recebê-lo (horizontal).
35. A dupla L4C4–L4C3 já está fechada; L5C4 não pode tocar essa dupla com outro quadrado.
36. A dupla L4C4–L4C3 já está fechada; L4C5 não pode tocar essa dupla com outro quadrado.
37. L5C3 precisa de um parceiro círculo; só L6C3 pode recebê-lo (vertical).
38. A dupla L5C6–L6C6 já está fechada; L5C5 não pode tocar essa dupla com outro losango.
39. L5C7 precisa de um parceiro círculo; só L6C7 pode recebê-lo (vertical).
40. A dupla L6C3–L5C3 já está fechada; L7C3 não pode tocar essa dupla com outro círculo.
41. A dupla L6C6–L5C6 já está fechada; L6C5 não pode tocar essa dupla com outro losango.
42. A dupla L6C7–L5C7 já está fechada; L6C8 não pode tocar essa dupla com outro círculo.
43. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C1.
44. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C6.
45. linha 4 já tem dois quadrado (L4C3, L4C4); exclua quadrado de L4C8.
46. linha 6 já tem dois círculo (L6C3, L6C7); exclua círculo de L6C5.
47. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L1C3.
48. coluna 3 já tem dois círculo (L5C3, L6C3); exclua círculo de L8C3.
49. coluna 4 já tem dois quadrado (L2C4, L4C4); exclua quadrado de L7C4.
50. coluna 4 já tem dois quadrado (L2C4, L4C4); exclua quadrado de L8C4.
51. coluna 7 já tem dois círculo (L5C7, L6C7); exclua círculo de L1C7.
52. coluna 7 já tem dois círculo (L5C7, L6C7); exclua círculo de L3C7.
53. coluna 7 já tem dois círculo (L5C7, L6C7); exclua círculo de L8C7.
54. L1C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
55. L2C1 precisa de um parceiro círculo; só L1C1 pode recebê-lo (vertical).
56. L3C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
57. L5C4 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
58. A dupla L6C4–L5C4 já está fechada; L7C4 não pode tocar essa dupla com outro triângulo.
59. A dupla L6C4–L5C4 já está fechada; L6C5 não pode tocar essa dupla com outro triângulo.
60. linha 6 já tem dois quadrado (L6C1, L6C5); exclua quadrado de L6C2.
61. linha 6 já tem dois quadrado (L6C1, L6C5); exclua quadrado de L6C8.
62. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L7C1.
63. coluna 1 já tem dois círculo (L1C1, L2C1); exclua círculo de L8C1.
64. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L1C4.
65. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L3C4.
66. coluna 4 já tem dois triângulo (L5C4, L6C4); exclua triângulo de L8C4.
67. L1C2 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
68. L3C3 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
69. L3C3 precisa de um parceiro losango; só L3C4 pode recebê-lo (horizontal).
70. A dupla L3C4–L3C3 já está fechada; L3C5 não pode tocar essa dupla com outro losango.
71. L4C5 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
72. A dupla L5C4–L6C4 já está fechada; L5C5 não pode tocar essa dupla com outro triângulo.
73. L5C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
74. A dupla L6C5–L5C5 já está fechada; L7C5 não pode tocar essa dupla com outro quadrado.
75. linha 3 já tem dois losango (L3C3, L3C4); exclua losango de L3C1.
76. linha 3 já tem dois losango (L3C3, L3C4); exclua losango de L3C7.
77. linha 3 já tem dois losango (L3C3, L3C4); exclua losango de L3C8.
78. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L1C5.
79. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L3C5.
80. coluna 5 já tem dois quadrado (L5C5, L6C5); exclua quadrado de L8C5.
81. L3C1 precisa de um parceiro triângulo; só L4C1 pode recebê-lo (vertical).
82. A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro triângulo.
83. L4C7 precisa de um parceiro losango; só L4C8 pode recebê-lo (horizontal).
84. A dupla L4C8–L4C7 já está fechada; L5C8 não pode tocar essa dupla com outro losango.
85. L5C8 precisa de um parceiro triângulo; só L6C8 pode recebê-lo (vertical).
86. A dupla L6C8–L5C8 já está fechada; L7C8 não pode tocar essa dupla com outro triângulo.
87. linha 5 já tem dois triângulo (L5C4, L5C8); exclua triângulo de L5C2.
88. linha 6 já tem dois triângulo (L6C4, L6C8); exclua triângulo de L6C2.
89. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L7C1.
90. coluna 1 já tem dois triângulo (L3C1, L4C1); exclua triângulo de L8C1.
91. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L1C8.
92. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L2C8.
93. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L3C8.
94. coluna 8 já tem dois triângulo (L5C8, L6C8); exclua triângulo de L8C8.
95. coluna 8 já tem dois losango (L2C8, L4C8); exclua losango de L1C8.
96. coluna 8 já tem dois losango (L2C8, L4C8); exclua losango de L7C8.
97. coluna 8 já tem dois losango (L2C8, L4C8); exclua losango de L8C8.
98. L1C8 precisa de um parceiro quadrado; só L1C7 pode recebê-lo (horizontal).
99. L2C8 precisa de um parceiro losango; só L2C7 pode recebê-lo (horizontal).
100. L3C8 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
101. L3C8 precisa de um parceiro quadrado; só L3C7 pode recebê-lo (horizontal).
102. L8C7 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
103. linha 1 já tem dois quadrado (L1C7, L1C8); exclua quadrado de L1C6.
104. Na linha 2, triângulo só cabe em L2C2 e L2C6; ambas as casas precisam dele.
105. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C6.
106. Na coluna 6, quadrado só cabe em L7C6 e L8C6; ambas as casas precisam dele.
107. Na coluna 6, quadrado só cabe em L7C6 e L8C6; ambas as casas precisam dele.
108. Na coluna 7, triângulo só cabe em L7C7 e L8C7; ambas as casas precisam dele.
109. Na coluna 8, círculo só cabe em L7C8 e L8C8; ambas as casas precisam dele.
110. Na coluna 8, círculo só cabe em L7C8 e L8C8; ambas as casas precisam dele.
111. L2C2 precisa de um parceiro triângulo; só L1C2 pode recebê-lo (vertical).
112. coluna 2 já tem dois triângulo (L1C2, L2C2); exclua triângulo de L7C2.
113. coluna 2 já tem dois triângulo (L1C2, L2C2); exclua triângulo de L8C2.
114. A dupla L1C2–L2C2 já está fechada; L1C3 não pode tocar essa dupla com outro triângulo.
115. L1C3 precisa de um parceiro losango; só L1C4 pode recebê-lo (horizontal).
116. A dupla L1C4–L1C3 já está fechada; L1C5 não pode tocar essa dupla com outro losango.
117. Na coluna 3, triângulo só cabe em L7C3 e L8C3; ambas as casas precisam dele.
118. Na coluna 3, triângulo só cabe em L7C3 e L8C3; ambas as casas precisam dele.
119. Na coluna 4, círculo só cabe em L7C4 e L8C4; ambas as casas precisam dele.
120. Na coluna 4, círculo só cabe em L7C4 e L8C4; ambas as casas precisam dele.
121. Na coluna 5, losango só cabe em L7C5 e L8C5; ambas as casas precisam dele.
122. Na coluna 5, losango só cabe em L7C5 e L8C5; ambas as casas precisam dele.
123. Se L1C5 fosse triângulo, 2 deduções levariam a: L1C5 fica sem símbolo possível. L1C5 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua triângulo.
   - Hipótese, passo 1: Na linha 1, círculo só cabe em L1C1 e L1C6; ambas as casas precisam dele.
   - Hipótese, passo 2: L1C5 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L1C5 fica sem símbolo possível. L1C5 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
124. linha 1 já tem dois círculo (L1C1, L1C5); exclua círculo de L1C6.
125. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L3C5.
126. coluna 5 já tem dois círculo (L1C5, L2C5); exclua círculo de L4C5.
127. Na coluna 6, círculo só cabe em L3C6 e L4C6; ambas as casas precisam dele.
128. Na coluna 6, círculo só cabe em L3C6 e L4C6; ambas as casas precisam dele.
129. Se L5C1 fosse losango, 2 deduções levariam a: L5C1 fica sem símbolo possível. L5C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua losango.
   - Hipótese, passo 1: Na linha 5, quadrado só cabe em L5C2 e L5C5; ambas as casas precisam dele.
   - Hipótese, passo 2: L5C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L5C1 fica sem símbolo possível. L5C1 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
130. linha 5 já tem dois quadrado (L5C1, L5C5); exclua quadrado de L5C2.
131. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L7C1.
132. coluna 1 já tem dois quadrado (L5C1, L6C1); exclua quadrado de L8C1.
133. Na coluna 2, quadrado só cabe em L7C2 e L8C2; ambas as casas precisam dele.
134. Na coluna 2, quadrado só cabe em L7C2 e L8C2; ambas as casas precisam dele.

## 77. Modo Sábio — pacto-123

**Descoberta:** Síntese 2: restrição coletiva de uma faixa.

**Técnicas combinadas:** cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; prevenção de isolamento; prevenção de trio; posições restantes; restrição coletiva de candidatas.

**Origem:** pacto-123; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 23; 127 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: quadrado — cota saturada; posições restantes; primeira participação no passo 74.
- L1C4: círculo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 11.
- L1C7: triângulo — prevenção de isolamento; cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 14.
- L2C3: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 6.
- L2C4: triângulo — parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; primeira participação no passo 11.
- L2C6: quadrado — prevenção de isolamento; restrição coletiva de candidatas; exclusão junto à dupla; posições restantes; primeira participação no passo 14.
- L3C8: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 65.
- L5C7: círculo — cota saturada; prevenção de isolamento; posições restantes; primeira participação no passo 52.
- L6C3: quadrado — prevenção de trio; posições restantes; exclusão junto à dupla; prevenção de isolamento; primeira participação no passo 16.
- L6C5: círculo — cota saturada; posições restantes; prevenção de isolamento; exclusão junto à dupla; parceiro obrigatório / orientação; primeira participação no passo 38.
- L7C4: quadrado — cota saturada; prevenção de trio; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; prevenção de isolamento; primeira participação no passo 1.
- L7C5: quadrado — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 1.
- L7C6: triângulo — posições restantes; cota saturada; restrição coletiva de candidatas; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 43.
- L8C3: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 6.
- L8C4: losango — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 18.

### Sequência lógica

1. linha 7 já tem dois quadrado (L7C4, L7C5); exclua quadrado de L7C1.
2. linha 7 já tem dois quadrado (L7C4, L7C5); exclua quadrado de L7C2.
3. linha 7 já tem dois quadrado (L7C4, L7C5); exclua quadrado de L7C3.
4. linha 7 já tem dois quadrado (L7C4, L7C5); exclua quadrado de L7C7.
5. linha 7 já tem dois quadrado (L7C4, L7C5); exclua quadrado de L7C8.
6. coluna 3 já tem dois círculo (L2C3, L8C3); exclua círculo de L1C3.
7. coluna 3 já tem dois círculo (L2C3, L8C3); exclua círculo de L3C3.
8. coluna 3 já tem dois círculo (L2C3, L8C3); exclua círculo de L4C3.
9. coluna 3 já tem dois círculo (L2C3, L8C3); exclua círculo de L5C3.
10. coluna 3 já tem dois círculo (L2C3, L8C3); exclua círculo de L7C3.
11. L1C4 precisa de um parceiro círculo; só L1C5 pode recebê-lo (horizontal).
12. A dupla L1C5–L1C4 já está fechada; L2C5 não pode tocar essa dupla com outro círculo.
13. A dupla L1C5–L1C4 já está fechada; L1C6 não pode tocar essa dupla com outro círculo.
14. L1C6 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
15. L2C3 precisa de um parceiro círculo; só L2C2 pode recebê-lo (horizontal).
16. L6C4 não pode ser quadrado: tocaria L7C4 e L6C3, formando um grupo maior que dois.
17. A dupla L7C5–L7C4 já está fechada; L8C5 não pode tocar essa dupla com outro quadrado.
18. L8C3 precisa de um parceiro círculo; só L8C2 pode recebê-lo (horizontal).
19. L8C4 precisa de um parceiro losango; só L8C5 pode recebê-lo (horizontal).
20. A dupla L8C5–L8C4 já está fechada; L8C6 não pode tocar essa dupla com outro losango.
21. linha 1 já tem dois círculo (L1C4, L1C5); exclua círculo de L1C2.
22. linha 1 já tem dois círculo (L1C4, L1C5); exclua círculo de L1C8.
23. linha 2 já tem dois círculo (L2C2, L2C3); exclua círculo de L2C1.
24. linha 2 já tem dois círculo (L2C2, L2C3); exclua círculo de L2C7.
25. linha 2 já tem dois círculo (L2C2, L2C3); exclua círculo de L2C8.
26. linha 8 já tem dois círculo (L8C2, L8C3); exclua círculo de L8C1.
27. linha 8 já tem dois círculo (L8C2, L8C3); exclua círculo de L8C6.
28. linha 8 já tem dois círculo (L8C2, L8C3); exclua círculo de L8C7.
29. linha 8 já tem dois círculo (L8C2, L8C3); exclua círculo de L8C8.
30. linha 8 já tem dois losango (L8C4, L8C5); exclua losango de L8C1.
31. linha 8 já tem dois losango (L8C4, L8C5); exclua losango de L8C7.
32. linha 8 já tem dois losango (L8C4, L8C5); exclua losango de L8C8.
33. coluna 2 já tem dois círculo (L2C2, L8C2); exclua círculo de L3C2.
34. coluna 2 já tem dois círculo (L2C2, L8C2); exclua círculo de L4C2.
35. coluna 2 já tem dois círculo (L2C2, L8C2); exclua círculo de L5C2.
36. coluna 2 já tem dois círculo (L2C2, L8C2); exclua círculo de L6C2.
37. coluna 2 já tem dois círculo (L2C2, L8C2); exclua círculo de L7C2.
38. coluna 5 já tem dois círculo (L1C5, L6C5); exclua círculo de L3C5.
39. coluna 5 já tem dois círculo (L1C5, L6C5); exclua círculo de L4C5.
40. coluna 5 já tem dois círculo (L1C5, L6C5); exclua círculo de L5C5.
41. L8C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
42. L8C1 precisa de um parceiro triângulo; só L7C1 pode recebê-lo (vertical).
43. Na linha 7, círculo só cabe em L7C7 e L7C8; ambas as casas precisam dele.
44. Na linha 7, círculo só cabe em L7C7 e L7C8; ambas as casas precisam dele.
45. linha 7 já tem dois triângulo (L7C1, L7C6); exclua triângulo de L7C2.
46. linha 7 já tem dois triângulo (L7C1, L7C6); exclua triângulo de L7C3.
47. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L2C1.
48. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L3C1.
49. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L4C1.
50. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L5C1.
51. coluna 1 já tem dois triângulo (L7C1, L8C1); exclua triângulo de L6C1.
52. coluna 7 já tem dois círculo (L5C7, L7C7); exclua círculo de L3C7.
53. coluna 7 já tem dois círculo (L5C7, L7C7); exclua círculo de L4C7.
54. coluna 7 já tem dois círculo (L5C7, L7C7); exclua círculo de L6C7.
55. A dupla L7C2–L7C3 já está fechada; L6C2 não pode tocar essa dupla com outro losango.
56. A dupla L7C8–L7C7 já está fechada; L6C8 não pode tocar essa dupla com outro círculo.
57. Na coluna 6, L1C6, L2C6, L7C6, L8C6 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L3C6.
58. Na coluna 6, L1C6, L2C6, L7C6, L8C6 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L4C6.
59. Na coluna 6, L1C6, L2C6, L7C6, L8C6 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L5C6.
60. Na coluna 6, L1C6, L2C6, L7C6, L8C6 reservam as 4 ocorrências de triângulo e quadrado; retire esses símbolos de L6C6.
61. L7C6 precisa de um parceiro triângulo; só L8C6 pode recebê-lo (vertical).
62. A dupla L8C6–L7C6 já está fechada; L8C7 não pode tocar essa dupla com outro triângulo.
63. L8C7 precisa de um parceiro quadrado; só L8C8 pode recebê-lo (horizontal).
64. coluna 6 já tem dois triângulo (L7C6, L8C6); exclua triângulo de L1C6.
65. coluna 8 já tem dois quadrado (L3C8, L8C8); exclua quadrado de L1C8.
66. coluna 8 já tem dois quadrado (L3C8, L8C8); exclua quadrado de L2C8.
67. coluna 8 já tem dois quadrado (L3C8, L8C8); exclua quadrado de L4C8.
68. coluna 8 já tem dois quadrado (L3C8, L8C8); exclua quadrado de L5C8.
69. coluna 8 já tem dois quadrado (L3C8, L8C8); exclua quadrado de L6C8.
70. A dupla L2C6–L1C6 já está fechada; L2C5 não pode tocar essa dupla com outro quadrado.
71. A dupla L2C6–L1C6 já está fechada; L2C7 não pode tocar essa dupla com outro quadrado.
72. L3C8 precisa de um parceiro quadrado; só L3C7 pode recebê-lo (horizontal).
73. L6C7 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
74. linha 1 já tem dois quadrado (L1C1, L1C6); exclua quadrado de L1C2.
75. linha 1 já tem dois quadrado (L1C1, L1C6); exclua quadrado de L1C3.
76. Na linha 2, quadrado só cabe em L2C1 e L2C6; ambas as casas precisam dele.
77. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C1.
78. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C2.
79. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C3.
80. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C4.
81. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C5.
82. coluna 1 já tem dois quadrado (L1C1, L2C1); exclua quadrado de L4C1.
83. coluna 1 já tem dois quadrado (L1C1, L2C1); exclua quadrado de L5C1.
84. coluna 1 já tem dois quadrado (L1C1, L2C1); exclua quadrado de L6C1.
85. coluna 7 já tem dois quadrado (L3C7, L8C7); exclua quadrado de L4C7.
86. Na linha 6, quadrado só cabe em L6C2 e L6C3; ambas as casas precisam dele.
87. A dupla L6C2–L6C3 já está fechada; L5C2 não pode tocar essa dupla com outro quadrado.
88. A dupla L6C3–L6C2 já está fechada; L5C3 não pode tocar essa dupla com outro quadrado.
89. Na linha 5, quadrado só cabe em L5C4 e L5C5; ambas as casas precisam dele.
90. Na linha 5, quadrado só cabe em L5C4 e L5C5; ambas as casas precisam dele.
91. Na coluna 2, quadrado só cabe em L4C2 e L6C2; ambas as casas precisam dele.
92. Na coluna 3, quadrado só cabe em L4C3 e L6C3; ambas as casas precisam dele.
93. coluna 4 já tem dois quadrado (L5C4, L7C4); exclua quadrado de L4C4.
94. coluna 5 já tem dois quadrado (L5C5, L7C5); exclua quadrado de L4C5.
95. L6C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
96. L6C4 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
97. A dupla L6C5–L6C4 já está fechada; L6C6 não pode tocar essa dupla com outro círculo.
98. linha 6 já tem dois círculo (L6C4, L6C5); exclua círculo de L6C1.
99. Na linha 6, triângulo só cabe em L6C7 e L6C8; ambas as casas precisam dele.
100. Na linha 6, triângulo só cabe em L6C7 e L6C8; ambas as casas precisam dele.
101. coluna 4 já tem dois círculo (L1C4, L6C4); exclua círculo de L3C4.
102. coluna 4 já tem dois círculo (L1C4, L6C4); exclua círculo de L4C4.
103. coluna 7 já tem dois triângulo (L1C7, L6C7); exclua triângulo de L2C7.
104. coluna 7 já tem dois triângulo (L1C7, L6C7); exclua triângulo de L4C7.
105. L1C7 precisa de um parceiro triângulo; só L1C8 pode recebê-lo (horizontal).
106. A dupla L1C8–L1C7 já está fechada; L2C8 não pode tocar essa dupla com outro triângulo.
107. L6C1 precisa de um parceiro losango; só L5C1 pode recebê-lo (vertical).
108. L6C6 precisa de um parceiro losango; só L5C6 pode recebê-lo (vertical).
109. A dupla L6C8–L6C7 já está fechada; L5C8 não pode tocar essa dupla com outro triângulo.
110. linha 1 já tem dois triângulo (L1C7, L1C8); exclua triângulo de L1C2.
111. linha 1 já tem dois triângulo (L1C7, L1C8); exclua triângulo de L1C3.
112. Na linha 2, triângulo só cabe em L2C4 e L2C5; ambas as casas precisam dele.
113. Na linha 3, círculo só cabe em L3C1 e L3C6; ambas as casas precisam dele.
114. Na linha 3, círculo só cabe em L3C1 e L3C6; ambas as casas precisam dele.
115. Na linha 5, círculo só cabe em L5C7 e L5C8; ambas as casas precisam dele.
116. Na linha 5, triângulo só cabe em L5C2 e L5C3; ambas as casas precisam dele.
117. Na linha 5, triângulo só cabe em L5C2 e L5C3; ambas as casas precisam dele.
118. Na coluna 1, círculo só cabe em L3C1 e L4C1; ambas as casas precisam dele.
119. Na coluna 2, triângulo só cabe em L3C2 e L5C2; ambas as casas precisam dele.
120. Na coluna 3, triângulo só cabe em L3C3 e L5C3; ambas as casas precisam dele.
121. Na coluna 6, círculo só cabe em L3C6 e L4C6; ambas as casas precisam dele.
122. coluna 8 já tem dois círculo (L5C8, L7C8); exclua círculo de L4C8.
123. coluna 8 já tem dois triângulo (L1C8, L6C8); exclua triângulo de L4C8.
124. A dupla L2C4–L2C5 já está fechada; L3C4 não pode tocar essa dupla com outro triângulo.
125. A dupla L2C5–L2C4 já está fechada; L3C5 não pode tocar essa dupla com outro triângulo.
126. A dupla L3C4–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro losango.
127. A dupla L3C5–L3C4 já está fechada; L4C5 não pode tocar essa dupla com outro losango.

## 78. Modo Sábio — pacto-154

**Descoberta:** Síntese 3: parceiros obrigatórios com efeito remoto.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; prevenção de isolamento.

**Origem:** pacto-154; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 9; 55 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 27; 135 eliminações explicadas. Refutações: nenhuma.

### Função das pistas

- L1C1: losango — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 43.
- L2C2: quadrado — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 12.
- L2C4: losango — posições restantes; parceiro obrigatório / orientação; cota saturada; primeira participação no passo 51.
- L3C2: losango — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; posições restantes; primeira participação no passo 28.
- L6C2: triângulo — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L6C3: triângulo — cota saturada; exclusão junto à dupla; prevenção de isolamento; posições restantes; primeira participação no passo 1.
- L8C2: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; exclusão junto à dupla; primeira participação no passo 12.
- L8C5: círculo — cota saturada; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; primeira participação no passo 7.
- L8C8: círculo — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 7.

### Sequência lógica

1. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C1.
2. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C4.
3. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C5.
4. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C6.
5. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C7.
6. linha 6 já tem dois triângulo (L6C2, L6C3); exclua triângulo de L6C8.
7. linha 8 já tem dois círculo (L8C5, L8C8); exclua círculo de L8C1.
8. linha 8 já tem dois círculo (L8C5, L8C8); exclua círculo de L8C3.
9. linha 8 já tem dois círculo (L8C5, L8C8); exclua círculo de L8C4.
10. linha 8 já tem dois círculo (L8C5, L8C8); exclua círculo de L8C6.
11. linha 8 já tem dois círculo (L8C5, L8C8); exclua círculo de L8C7.
12. coluna 2 já tem dois quadrado (L2C2, L8C2); exclua quadrado de L1C2.
13. coluna 2 já tem dois quadrado (L2C2, L8C2); exclua quadrado de L4C2.
14. coluna 2 já tem dois quadrado (L2C2, L8C2); exclua quadrado de L5C2.
15. coluna 2 já tem dois quadrado (L2C2, L8C2); exclua quadrado de L7C2.
16. A dupla L6C2–L6C3 já está fechada; L5C2 não pode tocar essa dupla com outro triângulo.
17. A dupla L6C2–L6C3 já está fechada; L7C2 não pode tocar essa dupla com outro triângulo.
18. A dupla L6C3–L6C2 já está fechada; L5C3 não pode tocar essa dupla com outro triângulo.
19. A dupla L6C3–L6C2 já está fechada; L7C3 não pode tocar essa dupla com outro triângulo.
20. L8C5 precisa de um parceiro círculo; só L7C5 pode recebê-lo (vertical).
21. L8C8 precisa de um parceiro círculo; só L7C8 pode recebê-lo (vertical).
22. linha 7 já tem dois círculo (L7C5, L7C8); exclua círculo de L7C1.
23. linha 7 já tem dois círculo (L7C5, L7C8); exclua círculo de L7C2.
24. linha 7 já tem dois círculo (L7C5, L7C8); exclua círculo de L7C3.
25. linha 7 já tem dois círculo (L7C5, L7C8); exclua círculo de L7C4.
26. linha 7 já tem dois círculo (L7C5, L7C8); exclua círculo de L7C6.
27. linha 7 já tem dois círculo (L7C5, L7C8); exclua círculo de L7C7.
28. coluna 2 já tem dois losango (L3C2, L7C2); exclua losango de L1C2.
29. coluna 2 já tem dois losango (L3C2, L7C2); exclua losango de L4C2.
30. coluna 2 já tem dois losango (L3C2, L7C2); exclua losango de L5C2.
31. coluna 5 já tem dois círculo (L7C5, L8C5); exclua círculo de L1C5.
32. coluna 5 já tem dois círculo (L7C5, L8C5); exclua círculo de L2C5.
33. coluna 5 já tem dois círculo (L7C5, L8C5); exclua círculo de L3C5.
34. coluna 5 já tem dois círculo (L7C5, L8C5); exclua círculo de L4C5.
35. coluna 5 já tem dois círculo (L7C5, L8C5); exclua círculo de L5C5.
36. coluna 5 já tem dois círculo (L7C5, L8C5); exclua círculo de L6C5.
37. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L1C8.
38. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L2C8.
39. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L3C8.
40. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L4C8.
41. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L5C8.
42. coluna 8 já tem dois círculo (L7C8, L8C8); exclua círculo de L6C8.
43. L1C1 precisa de um parceiro losango; só L2C1 pode recebê-lo (vertical).
44. A dupla L2C1–L1C1 já está fechada; L3C1 não pode tocar essa dupla com outro losango.
45. L2C2 precisa de um parceiro quadrado; só L2C3 pode recebê-lo (horizontal).
46. A dupla L2C3–L2C2 já está fechada; L1C3 não pode tocar essa dupla com outro quadrado.
47. A dupla L2C3–L2C2 já está fechada; L3C3 não pode tocar essa dupla com outro quadrado.
48. L3C2 precisa de um parceiro losango; só L3C3 pode recebê-lo (horizontal).
49. A dupla L3C3–L3C2 já está fechada; L4C3 não pode tocar essa dupla com outro losango.
50. A dupla L3C3–L3C2 já está fechada; L3C4 não pode tocar essa dupla com outro losango.
51. Na linha 2, círculo só cabe em L2C6 e L2C7; ambas as casas precisam dele.
52. Na linha 2, círculo só cabe em L2C6 e L2C7; ambas as casas precisam dele.
53. Na linha 2, triângulo só cabe em L2C5 e L2C8; ambas as casas precisam dele.
54. Na linha 2, triângulo só cabe em L2C5 e L2C8; ambas as casas precisam dele.
55. linha 3 já tem dois losango (L3C2, L3C3); exclua losango de L3C5.
56. linha 3 já tem dois losango (L3C2, L3C3); exclua losango de L3C6.
57. linha 3 já tem dois losango (L3C2, L3C3); exclua losango de L3C7.
58. linha 3 já tem dois losango (L3C2, L3C3); exclua losango de L3C8.
59. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L4C1.
60. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L5C1.
61. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L6C1.
62. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L7C1.
63. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L8C1.
64. L2C4 precisa de um parceiro losango; só L1C4 pode recebê-lo (vertical).
65. A dupla L2C6–L2C7 já está fechada; L1C6 não pode tocar essa dupla com outro círculo.
66. A dupla L2C6–L2C7 já está fechada; L3C6 não pode tocar essa dupla com outro círculo.
67. A dupla L2C7–L2C6 já está fechada; L1C7 não pode tocar essa dupla com outro círculo.
68. A dupla L2C7–L2C6 já está fechada; L3C7 não pode tocar essa dupla com outro círculo.
69. L7C2 precisa de um parceiro losango; só L7C3 pode recebê-lo (horizontal).
70. A dupla L7C3–L7C2 já está fechada; L8C3 não pode tocar essa dupla com outro losango.
71. A dupla L7C3–L7C2 já está fechada; L7C4 não pode tocar essa dupla com outro losango.
72. L8C4 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
73. Na linha 1, círculo só cabe em L1C2 e L1C3; ambas as casas precisam dele.
74. Na linha 1, círculo só cabe em L1C2 e L1C3; ambas as casas precisam dele.
75. linha 1 já tem dois losango (L1C1, L1C4); exclua losango de L1C5.
76. linha 1 já tem dois losango (L1C1, L1C4); exclua losango de L1C6.
77. linha 1 já tem dois losango (L1C1, L1C4); exclua losango de L1C7.
78. linha 1 já tem dois losango (L1C1, L1C4); exclua losango de L1C8.
79. Na linha 3, círculo só cabe em L3C1 e L3C4; ambas as casas precisam dele.
80. Na linha 3, círculo só cabe em L3C1 e L3C4; ambas as casas precisam dele.
81. linha 7 já tem dois losango (L7C2, L7C3); exclua losango de L7C6.
82. linha 7 já tem dois losango (L7C2, L7C3); exclua losango de L7C7.
83. Na linha 8, losango só cabe em L8C6 e L8C7; ambas as casas precisam dele.
84. Na linha 8, losango só cabe em L8C6 e L8C7; ambas as casas precisam dele.
85. coluna 2 já tem dois círculo (L1C2, L5C2); exclua círculo de L4C2.
86. coluna 3 já tem dois losango (L3C3, L7C3); exclua losango de L5C3.
87. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L4C4.
88. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L5C4.
89. coluna 4 já tem dois losango (L1C4, L2C4); exclua losango de L6C4.
90. L3C1 precisa de um parceiro círculo; só L4C1 pode recebê-lo (vertical).
91. L3C4 precisa de um parceiro círculo; só L4C4 pode recebê-lo (vertical).
92. A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro círculo.
93. L4C2 precisa de um parceiro triângulo; só L4C3 pode recebê-lo (horizontal).
94. A dupla L4C4–L3C4 já está fechada; L5C4 não pode tocar essa dupla com outro círculo.
95. L5C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
96. L5C1 precisa de um parceiro quadrado; só L6C1 pode recebê-lo (vertical).
97. L5C2 precisa de um parceiro círculo; só L5C3 pode recebê-lo (horizontal).
98. A dupla L6C1–L5C1 já está fechada; L7C1 não pode tocar essa dupla com outro quadrado.
99. L6C4 não pode ser círculo: nenhum vizinho ortogonal pode ser seu parceiro.
100. L7C1 precisa de um parceiro triângulo; só L8C1 pode recebê-lo (vertical).
101. L8C2 precisa de um parceiro quadrado; só L8C3 pode recebê-lo (horizontal).
102. A dupla L8C3–L8C2 já está fechada; L8C4 não pode tocar essa dupla com outro quadrado.
103. L8C4 precisa de um parceiro triângulo; só L7C4 pode recebê-lo (vertical).
104. linha 4 já tem dois círculo (L4C1, L4C4); exclua círculo de L4C6.
105. linha 4 já tem dois círculo (L4C1, L4C4); exclua círculo de L4C7.
106. linha 4 já tem dois triângulo (L4C2, L4C3); exclua triângulo de L4C5.
107. linha 4 já tem dois triângulo (L4C2, L4C3); exclua triângulo de L4C6.
108. linha 4 já tem dois triângulo (L4C2, L4C3); exclua triângulo de L4C7.
109. linha 4 já tem dois triângulo (L4C2, L4C3); exclua triângulo de L4C8.
110. linha 5 já tem dois círculo (L5C2, L5C3); exclua círculo de L5C6.
111. linha 5 já tem dois círculo (L5C2, L5C3); exclua círculo de L5C7.
112. Na linha 6, círculo só cabe em L6C6 e L6C7; ambas as casas precisam dele.
113. Na linha 6, círculo só cabe em L6C6 e L6C7; ambas as casas precisam dele.
114. linha 6 já tem dois quadrado (L6C1, L6C4); exclua quadrado de L6C5.
115. linha 6 já tem dois quadrado (L6C1, L6C4); exclua quadrado de L6C8.
116. linha 7 já tem dois triângulo (L7C1, L7C4); exclua triângulo de L7C6.
117. linha 7 já tem dois triângulo (L7C1, L7C4); exclua triângulo de L7C7.
118. coluna 4 já tem dois triângulo (L7C4, L8C4); exclua triângulo de L5C4.
119. A dupla L5C4–L6C4 já está fechada; L5C5 não pode tocar essa dupla com outro quadrado.
120. L6C5 precisa de um parceiro losango; só L5C5 pode recebê-lo (vertical).
121. L6C8 precisa de um parceiro losango; só L5C8 pode recebê-lo (vertical).
122. Na linha 5, triângulo só cabe em L5C6 e L5C7; ambas as casas precisam dele.
123. Na linha 5, triângulo só cabe em L5C6 e L5C7; ambas as casas precisam dele.
124. coluna 5 já tem dois losango (L5C5, L6C5); exclua losango de L4C5.
125. Na coluna 6, losango só cabe em L4C6 e L8C6; ambas as casas precisam dele.
126. Na coluna 7, losango só cabe em L4C7 e L8C7; ambas as casas precisam dele.
127. coluna 8 já tem dois losango (L5C8, L6C8); exclua losango de L4C8.
128. L4C5 precisa de um parceiro quadrado; só L3C5 pode recebê-lo (vertical).
129. L4C8 precisa de um parceiro quadrado; só L3C8 pode recebê-lo (vertical).
130. Na linha 3, triângulo só cabe em L3C6 e L3C7; ambas as casas precisam dele.
131. Na linha 3, triângulo só cabe em L3C6 e L3C7; ambas as casas precisam dele.
132. Na coluna 5, triângulo só cabe em L1C5 e L2C5; ambas as casas precisam dele.
133. coluna 6 já tem dois triângulo (L3C6, L5C6); exclua triângulo de L1C6.
134. coluna 7 já tem dois triângulo (L3C7, L5C7); exclua triângulo de L1C7.
135. Na coluna 8, triângulo só cabe em L1C8 e L2C8; ambas as casas precisam dele.

## 79. Modo Sábio — pacto-172

**Descoberta:** Síntese 4: hipótese refutada por cotas e duplas.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; prevenção de trio; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; hipótese refutada.

**Origem:** pacto-172; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 29; 130 eliminações explicadas. Refutações: 7, 6 passos.

### Função das pistas

- L1C8: triângulo — parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; primeira participação no passo 37.
- L2C2: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L2C3: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L2C5: losango — posições restantes; parceiro obrigatório / orientação; primeira participação no passo 76.
- L3C2: triângulo — cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 42.
- L4C3: losango — prevenção de isolamento; parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 52.
- L4C6: triângulo — prevenção de trio; parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 14.
- L5C4: quadrado — prevenção de isolamento; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 52.
- L5C7: triângulo — prevenção de trio; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 14.
- L5C8: círculo — parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; cota saturada; primeira participação no passo 16.
- L6C3: triângulo — cota saturada; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 24.
- L7C4: losango — cota saturada; exclusão junto à dupla; posições restantes; parceiro obrigatório / orientação; primeira participação no passo 6.
- L8C4: losango — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 6.
- L8C5: triângulo — parceiro obrigatório / orientação; cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 23.
- L8C6: círculo — parceiro obrigatório / orientação; posições restantes; cota saturada; exclusão junto à dupla; primeira participação no passo 23.

### Sequência lógica

1. linha 2 já tem dois quadrado (L2C2, L2C3); exclua quadrado de L2C1.
2. linha 2 já tem dois quadrado (L2C2, L2C3); exclua quadrado de L2C4.
3. linha 2 já tem dois quadrado (L2C2, L2C3); exclua quadrado de L2C6.
4. linha 2 já tem dois quadrado (L2C2, L2C3); exclua quadrado de L2C7.
5. linha 2 já tem dois quadrado (L2C2, L2C3); exclua quadrado de L2C8.
6. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L1C4.
7. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L2C4.
8. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L3C4.
9. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L4C4.
10. coluna 4 já tem dois losango (L7C4, L8C4); exclua losango de L6C4.
11. A dupla L2C2–L2C3 já está fechada; L1C2 não pode tocar essa dupla com outro quadrado.
12. A dupla L2C3–L2C2 já está fechada; L1C3 não pode tocar essa dupla com outro quadrado.
13. A dupla L2C3–L2C2 já está fechada; L3C3 não pode tocar essa dupla com outro quadrado.
14. L4C7 não pode ser triângulo: tocaria L5C7 e L4C6, formando um grupo maior que dois.
15. L5C6 não pode ser triângulo: tocaria L4C6 e L5C7, formando um grupo maior que dois.
16. L5C7 precisa de um parceiro triângulo; só L6C7 pode recebê-lo (vertical).
17. A dupla L6C7–L5C7 já está fechada; L7C7 não pode tocar essa dupla com outro triângulo.
18. A dupla L6C7–L5C7 já está fechada; L6C6 não pode tocar essa dupla com outro triângulo.
19. A dupla L6C7–L5C7 já está fechada; L6C8 não pode tocar essa dupla com outro triângulo.
20. A dupla L7C4–L8C4 já está fechada; L7C3 não pode tocar essa dupla com outro losango.
21. A dupla L7C4–L8C4 já está fechada; L7C5 não pode tocar essa dupla com outro losango.
22. A dupla L8C4–L7C4 já está fechada; L8C3 não pode tocar essa dupla com outro losango.
23. L8C5 precisa de um parceiro triângulo; só L7C5 pode recebê-lo (vertical).
24. linha 6 já tem dois triângulo (L6C3, L6C7); exclua triângulo de L6C1.
25. linha 6 já tem dois triângulo (L6C3, L6C7); exclua triângulo de L6C2.
26. linha 6 já tem dois triângulo (L6C3, L6C7); exclua triângulo de L6C4.
27. linha 6 já tem dois triângulo (L6C3, L6C7); exclua triângulo de L6C5.
28. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L1C5.
29. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L3C5.
30. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L4C5.
31. coluna 5 já tem dois triângulo (L7C5, L8C5); exclua triângulo de L5C5.
32. coluna 7 já tem dois triângulo (L5C7, L6C7); exclua triângulo de L1C7.
33. coluna 7 já tem dois triângulo (L5C7, L6C7); exclua triângulo de L2C7.
34. coluna 7 já tem dois triângulo (L5C7, L6C7); exclua triângulo de L3C7.
35. coluna 7 já tem dois triângulo (L5C7, L6C7); exclua triângulo de L8C7.
36. L1C1 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
37. L1C8 precisa de um parceiro triângulo; só L2C8 pode recebê-lo (vertical).
38. A dupla L2C8–L1C8 já está fechada; L3C8 não pode tocar essa dupla com outro triângulo.
39. L4C6 precisa de um parceiro triângulo; só L3C6 pode recebê-lo (vertical).
40. L4C8 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
41. A dupla L7C5–L8C5 já está fechada; L7C6 não pode tocar essa dupla com outro triângulo.
42. linha 3 já tem dois triângulo (L3C2, L3C6); exclua triângulo de L3C1.
43. linha 3 já tem dois triângulo (L3C2, L3C6); exclua triângulo de L3C3.
44. linha 3 já tem dois triângulo (L3C2, L3C6); exclua triângulo de L3C4.
45. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L1C6.
46. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L2C6.
47. coluna 8 já tem dois triângulo (L1C8, L2C8); exclua triângulo de L7C8.
48. coluna 8 já tem dois triângulo (L1C8, L2C8); exclua triângulo de L8C8.
49. L3C2 precisa de um parceiro triângulo; só L4C2 pode recebê-lo (vertical).
50. A dupla L4C2–L3C2 já está fechada; L5C2 não pode tocar essa dupla com outro triângulo.
51. A dupla L4C2–L3C2 já está fechada; L4C1 não pode tocar essa dupla com outro triângulo.
52. L4C4 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
53. L5C1 não pode ser triângulo: nenhum vizinho ortogonal pode ser seu parceiro.
54. Na linha 5, triângulo só cabe em L5C3 e L5C7; ambas as casas precisam dele.
55. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L1C2.
56. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L7C2.
57. coluna 2 já tem dois triângulo (L3C2, L4C2); exclua triângulo de L8C2.
58. coluna 3 já tem dois triângulo (L5C3, L6C3); exclua triângulo de L1C3.
59. coluna 3 já tem dois triângulo (L5C3, L6C3); exclua triângulo de L7C3.
60. coluna 3 já tem dois triângulo (L5C3, L6C3); exclua triângulo de L8C3.
61. Na coluna 4, triângulo só cabe em L1C4 e L2C4; ambas as casas precisam dele.
62. Na coluna 4, triângulo só cabe em L1C4 e L2C4; ambas as casas precisam dele.
63. L4C3 precisa de um parceiro losango; só L3C3 pode recebê-lo (vertical).
64. linha 1 já tem dois triângulo (L1C4, L1C8); exclua triângulo de L1C1.
65. linha 2 já tem dois triângulo (L2C4, L2C8); exclua triângulo de L2C1.
66. Na linha 7, triângulo só cabe em L7C1 e L7C5; ambas as casas precisam dele.
67. Na linha 8, triângulo só cabe em L8C1 e L8C5; ambas as casas precisam dele.
68. coluna 3 já tem dois losango (L3C3, L4C3); exclua losango de L1C3.
69. L1C3 precisa de um parceiro círculo; só L1C2 pode recebê-lo (horizontal).
70. linha 1 já tem dois círculo (L1C2, L1C3); exclua círculo de L1C1.
71. linha 1 já tem dois círculo (L1C2, L1C3); exclua círculo de L1C5.
72. linha 1 já tem dois círculo (L1C2, L1C3); exclua círculo de L1C6.
73. linha 1 já tem dois círculo (L1C2, L1C3); exclua círculo de L1C7.
74. L1C1 precisa de um parceiro losango; só L2C1 pode recebê-lo (vertical).
75. A dupla L2C1–L1C1 já está fechada; L3C1 não pode tocar essa dupla com outro losango.
76. Na linha 2, círculo só cabe em L2C6 e L2C7; ambas as casas precisam dele.
77. Na linha 2, círculo só cabe em L2C6 e L2C7; ambas as casas precisam dele.
78. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L4C1.
79. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L5C1.
80. coluna 1 já tem dois losango (L1C1, L2C1); exclua losango de L6C1.
81. coluna 6 já tem dois círculo (L2C6, L8C6); exclua círculo de L5C6.
82. coluna 6 já tem dois círculo (L2C6, L8C6); exclua círculo de L6C6.
83. coluna 6 já tem dois círculo (L2C6, L8C6); exclua círculo de L7C6.
84. A dupla L2C7–L2C6 já está fechada; L3C7 não pode tocar essa dupla com outro círculo.
85. L8C6 precisa de um parceiro círculo; só L8C7 pode recebê-lo (horizontal).
86. A dupla L8C7–L8C6 já está fechada; L7C7 não pode tocar essa dupla com outro círculo.
87. A dupla L8C7–L8C6 já está fechada; L8C8 não pode tocar essa dupla com outro círculo.
88. linha 8 já tem dois círculo (L8C6, L8C7); exclua círculo de L8C2.
89. linha 8 já tem dois círculo (L8C6, L8C7); exclua círculo de L8C3.
90. Na coluna 3, círculo só cabe em L1C3 e L7C3; ambas as casas precisam dele.
91. coluna 7 já tem dois círculo (L2C7, L8C7); exclua círculo de L4C7.
92. L7C3 precisa de um parceiro círculo; só L7C2 pode recebê-lo (horizontal).
93. L8C2 não pode ser losango: nenhum vizinho ortogonal pode ser seu parceiro.
94. linha 7 já tem dois círculo (L7C2, L7C3); exclua círculo de L7C8.
95. linha 8 já tem dois quadrado (L8C2, L8C3); exclua quadrado de L8C8.
96. coluna 2 já tem dois círculo (L1C2, L7C2); exclua círculo de L5C2.
97. coluna 2 já tem dois círculo (L1C2, L7C2); exclua círculo de L6C2.
98. coluna 2 já tem dois quadrado (L2C2, L8C2); exclua quadrado de L5C2.
99. coluna 2 já tem dois quadrado (L2C2, L8C2); exclua quadrado de L6C2.
100. L8C8 precisa de um parceiro losango; só L7C8 pode recebê-lo (vertical).
101. Na linha 7, quadrado só cabe em L7C6 e L7C7; ambas as casas precisam dele.
102. Na linha 7, quadrado só cabe em L7C6 e L7C7; ambas as casas precisam dele.
103. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L3C8.
104. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L4C8.
105. coluna 8 já tem dois losango (L7C8, L8C8); exclua losango de L6C8.
106. L6C8 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
107. A dupla L7C6–L7C7 já está fechada; L6C6 não pode tocar essa dupla com outro quadrado.
108. linha 6 já tem dois losango (L6C2, L6C6); exclua losango de L6C5.
109. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L3C8.
110. coluna 8 já tem dois círculo (L5C8, L6C8); exclua círculo de L4C8.
111. A dupla L3C8–L4C8 já está fechada; L3C7 não pode tocar essa dupla com outro quadrado.
112. A dupla L4C8–L3C8 já está fechada; L4C7 não pode tocar essa dupla com outro quadrado.
113. L6C6 precisa de um parceiro losango; só L5C6 pode recebê-lo (vertical).
114. linha 3 já tem dois losango (L3C3, L3C7); exclua losango de L3C5.
115. linha 4 já tem dois losango (L4C3, L4C7); exclua losango de L4C5.
116. linha 5 já tem dois losango (L5C2, L5C6); exclua losango de L5C5.
117. Na coluna 5, losango só cabe em L1C5 e L2C5; ambas as casas precisam dele.
118. Na coluna 6, quadrado só cabe em L1C6 e L7C6; ambas as casas precisam dele.
119. Na coluna 7, quadrado só cabe em L1C7 e L7C7; ambas as casas precisam dele.
120. Se L3C1 fosse quadrado, 7 deduções levariam a: L4C4 fica sem símbolo possível. L4C4 não pode ser quadrado: tocaria L5C4 e L4C5, formando um grupo maior que dois. Portanto, exclua quadrado.
   - Hipótese, passo 1: Na linha 3, círculo só cabe em L3C4 e L3C5; ambas as casas precisam dele.
   - Hipótese, passo 2: Na linha 3, círculo só cabe em L3C4 e L3C5; ambas as casas precisam dele.
   - Hipótese, passo 3: L3C1 precisa de um parceiro quadrado; só L4C1 pode recebê-lo (vertical).
   - Hipótese, passo 4: A dupla L3C4–L3C5 já está fechada; L4C4 não pode tocar essa dupla com outro círculo.
   - Hipótese, passo 5: A dupla L3C5–L3C4 já está fechada; L4C5 não pode tocar essa dupla com outro círculo.
   - Hipótese, passo 6: A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro quadrado.
   - Hipótese, passo 7: L4C4 não pode ser quadrado: tocaria L5C4 e L4C5, formando um grupo maior que dois.
   - Contradição final: L4C4 fica sem símbolo possível. L4C4 não pode ser quadrado: tocaria L5C4 e L4C5, formando um grupo maior que dois.
121. L3C1 precisa de um parceiro círculo; só L4C1 pode recebê-lo (vertical).
122. A dupla L4C1–L3C1 já está fechada; L5C1 não pode tocar essa dupla com outro círculo.
123. L5C1 precisa de um parceiro quadrado; só L6C1 pode recebê-lo (vertical).
124. Na linha 5, círculo só cabe em L5C5 e L5C8; ambas as casas precisam dele.
125. Se L3C4 fosse quadrado, 6 deduções levariam a: L3C4 fica sem símbolo possível. L3C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro. Portanto, exclua quadrado.
   - Hipótese, passo 1: Na linha 3, círculo só cabe em L3C1 e L3C5; ambas as casas precisam dele.
   - Hipótese, passo 2: Na coluna 4, círculo só cabe em L4C4 e L6C4; ambas as casas precisam dele.
   - Hipótese, passo 3: Na coluna 4, círculo só cabe em L4C4 e L6C4; ambas as casas precisam dele.
   - Hipótese, passo 4: coluna 5 já tem dois círculo (L3C5, L5C5); exclua círculo de L4C5.
   - Hipótese, passo 5: coluna 5 já tem dois círculo (L3C5, L5C5); exclua círculo de L6C5.
   - Hipótese, passo 6: L3C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
   - Contradição final: L3C4 fica sem símbolo possível. L3C4 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
126. linha 3 já tem dois círculo (L3C1, L3C4); exclua círculo de L3C5.
127. L3C4 precisa de um parceiro círculo; só L4C4 pode recebê-lo (vertical).
128. L3C5 precisa de um parceiro quadrado; só L4C5 pode recebê-lo (vertical).
129. L5C4 precisa de um parceiro quadrado; só L6C4 pode recebê-lo (vertical).
130. L5C5 precisa de um parceiro círculo; só L6C5 pode recebê-lo (vertical).

## 80. Modo Sábio — pacto-141

**Descoberta:** Síntese 5: integração final.

**Técnicas combinadas:** cota saturada; exclusão junto à dupla; prevenção de trio; parceiro obrigatório / orientação; prevenção de isolamento; posições restantes; restrição coletiva de candidatas; hipótese refutada.

**Origem:** pacto-141; curadoria e reordenação; 0 pistas alteradas. **Pistas:** 15; 49 casas vazias.

**Validação:** solução única; busca concluída (1 nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade 33; 124 eliminações explicadas. Refutações: 10 passos.

### Função das pistas

- L1C4: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L1C5: quadrado — cota saturada; exclusão junto à dupla; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 1.
- L1C7: triângulo — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 53.
- L2C5: triângulo — prevenção de trio; parceiro obrigatório / orientação; prevenção de isolamento; cota saturada; exclusão junto à dupla; primeira participação no passo 20.
- L3C6: triângulo — prevenção de trio; prevenção de isolamento; parceiro obrigatório / orientação; exclusão junto à dupla; cota saturada; posições restantes; primeira participação no passo 20.
- L3C8: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 15.
- L4C1: quadrado — posições restantes; primeira participação no passo 93.
- L5C5: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 10.
- L5C8: triângulo — parceiro obrigatório / orientação; cota saturada; posições restantes; primeira participação no passo 27.
- L6C1: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 6.
- L6C2: triângulo — cota saturada; exclusão junto à dupla; posições restantes; primeira participação no passo 6.
- L6C4: círculo — parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 113.
- L6C8: quadrado — cota saturada; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 15.
- L7C3: quadrado — posições restantes; cota saturada; parceiro obrigatório / orientação; exclusão junto à dupla; primeira participação no passo 66.
- L8C4: losango — restrição coletiva de candidatas; parceiro obrigatório / orientação; posições restantes; primeira participação no passo 70.

### Sequência lógica

1. linha 1 já tem dois quadrado (L1C4, L1C5); exclua quadrado de L1C1.
2. linha 1 já tem dois quadrado (L1C4, L1C5); exclua quadrado de L1C2.
3. linha 1 já tem dois quadrado (L1C4, L1C5); exclua quadrado de L1C3.
4. linha 1 já tem dois quadrado (L1C4, L1C5); exclua quadrado de L1C6.
5. linha 1 já tem dois quadrado (L1C4, L1C5); exclua quadrado de L1C8.
6. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C3.
7. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C5.
8. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C6.
9. linha 6 já tem dois triângulo (L6C1, L6C2); exclua triângulo de L6C7.
10. coluna 5 já tem dois quadrado (L1C5, L5C5); exclua quadrado de L3C5.
11. coluna 5 já tem dois quadrado (L1C5, L5C5); exclua quadrado de L4C5.
12. coluna 5 já tem dois quadrado (L1C5, L5C5); exclua quadrado de L6C5.
13. coluna 5 já tem dois quadrado (L1C5, L5C5); exclua quadrado de L7C5.
14. coluna 5 já tem dois quadrado (L1C5, L5C5); exclua quadrado de L8C5.
15. coluna 8 já tem dois quadrado (L3C8, L6C8); exclua quadrado de L2C8.
16. coluna 8 já tem dois quadrado (L3C8, L6C8); exclua quadrado de L4C8.
17. coluna 8 já tem dois quadrado (L3C8, L6C8); exclua quadrado de L7C8.
18. coluna 8 já tem dois quadrado (L3C8, L6C8); exclua quadrado de L8C8.
19. A dupla L1C4–L1C5 já está fechada; L2C4 não pode tocar essa dupla com outro quadrado.
20. L2C6 não pode ser triângulo: tocaria L3C6 e L2C5, formando um grupo maior que dois.
21. L3C5 não pode ser triângulo: tocaria L2C5 e L3C6, formando um grupo maior que dois.
22. L3C8 precisa de um parceiro quadrado; só L3C7 pode recebê-lo (horizontal).
23. A dupla L6C1–L6C2 já está fechada; L5C1 não pode tocar essa dupla com outro triângulo.
24. A dupla L6C1–L6C2 já está fechada; L7C1 não pode tocar essa dupla com outro triângulo.
25. A dupla L6C2–L6C1 já está fechada; L5C2 não pode tocar essa dupla com outro triângulo.
26. A dupla L6C2–L6C1 já está fechada; L7C2 não pode tocar essa dupla com outro triângulo.
27. L6C8 precisa de um parceiro quadrado; só L6C7 pode recebê-lo (horizontal).
28. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C1.
29. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C2.
30. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C3.
31. linha 3 já tem dois quadrado (L3C7, L3C8); exclua quadrado de L3C4.
32. linha 6 já tem dois quadrado (L6C7, L6C8); exclua quadrado de L6C3.
33. linha 6 já tem dois quadrado (L6C7, L6C8); exclua quadrado de L6C6.
34. coluna 7 já tem dois quadrado (L3C7, L6C7); exclua quadrado de L2C7.
35. coluna 7 já tem dois quadrado (L3C7, L6C7); exclua quadrado de L4C7.
36. coluna 7 já tem dois quadrado (L3C7, L6C7); exclua quadrado de L5C7.
37. coluna 7 já tem dois quadrado (L3C7, L6C7); exclua quadrado de L7C7.
38. coluna 7 já tem dois quadrado (L3C7, L6C7); exclua quadrado de L8C7.
39. L2C5 precisa de um parceiro triângulo; só L2C4 pode recebê-lo (horizontal).
40. L2C6 não pode ser quadrado: nenhum vizinho ortogonal pode ser seu parceiro.
41. L3C6 precisa de um parceiro triângulo; só L4C6 pode recebê-lo (vertical).
42. A dupla L4C6–L3C6 já está fechada; L5C6 não pode tocar essa dupla com outro triângulo.
43. A dupla L4C6–L3C6 já está fechada; L4C5 não pode tocar essa dupla com outro triângulo.
44. A dupla L4C6–L3C6 já está fechada; L4C7 não pode tocar essa dupla com outro triângulo.
45. linha 2 já tem dois triângulo (L2C4, L2C5); exclua triângulo de L2C1.
46. linha 2 já tem dois triângulo (L2C4, L2C5); exclua triângulo de L2C2.
47. linha 2 já tem dois triângulo (L2C4, L2C5); exclua triângulo de L2C3.
48. linha 2 já tem dois triângulo (L2C4, L2C5); exclua triângulo de L2C7.
49. linha 2 já tem dois triângulo (L2C4, L2C5); exclua triângulo de L2C8.
50. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L1C6.
51. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L7C6.
52. coluna 6 já tem dois triângulo (L3C6, L4C6); exclua triângulo de L8C6.
53. L1C7 precisa de um parceiro triângulo; só L1C8 pode recebê-lo (horizontal).
54. A dupla L2C4–L2C5 já está fechada; L3C4 não pode tocar essa dupla com outro triângulo.
55. linha 1 já tem dois triângulo (L1C7, L1C8); exclua triângulo de L1C1.
56. linha 1 já tem dois triângulo (L1C7, L1C8); exclua triângulo de L1C2.
57. linha 1 já tem dois triângulo (L1C7, L1C8); exclua triângulo de L1C3.
58. coluna 8 já tem dois triângulo (L1C8, L5C8); exclua triângulo de L4C8.
59. coluna 8 já tem dois triângulo (L1C8, L5C8); exclua triângulo de L7C8.
60. coluna 8 já tem dois triângulo (L1C8, L5C8); exclua triângulo de L8C8.
61. L5C8 precisa de um parceiro triângulo; só L5C7 pode recebê-lo (horizontal).
62. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C3.
63. linha 5 já tem dois triângulo (L5C7, L5C8); exclua triângulo de L5C4.
64. coluna 7 já tem dois triângulo (L1C7, L5C7); exclua triângulo de L7C7.
65. coluna 7 já tem dois triângulo (L1C7, L5C7); exclua triângulo de L8C7.
66. Na linha 7, triângulo só cabe em L7C4 e L7C5; ambas as casas precisam dele.
67. Na linha 7, triângulo só cabe em L7C4 e L7C5; ambas as casas precisam dele.
68. coluna 4 já tem dois triângulo (L2C4, L7C4); exclua triângulo de L4C4.
69. coluna 5 já tem dois triângulo (L2C5, L7C5); exclua triângulo de L8C5.
70. Na linha 8, as 4 ocorrências de triângulo e quadrado só cabem em L8C1, L8C2, L8C3, L8C6; essas casas ficam reservadas ao conjunto.
71. Na linha 8, as 4 ocorrências de triângulo e quadrado só cabem em L8C1, L8C2, L8C3, L8C6; essas casas ficam reservadas ao conjunto.
72. Na linha 8, as 4 ocorrências de triângulo e quadrado só cabem em L8C1, L8C2, L8C3, L8C6; essas casas ficam reservadas ao conjunto.
73. Na linha 8, as 4 ocorrências de triângulo e quadrado só cabem em L8C1, L8C2, L8C3, L8C6; essas casas ficam reservadas ao conjunto.
74. L8C4 precisa de um parceiro losango; só L8C5 pode recebê-lo (horizontal).
75. L8C6 precisa de um parceiro quadrado; só L7C6 pode recebê-lo (vertical).
76. linha 7 já tem dois quadrado (L7C3, L7C6); exclua quadrado de L7C1.
77. linha 7 já tem dois quadrado (L7C3, L7C6); exclua quadrado de L7C2.
78. Na linha 8, círculo só cabe em L8C7 e L8C8; ambas as casas precisam dele.
79. Na linha 8, círculo só cabe em L8C7 e L8C8; ambas as casas precisam dele.
80. coluna 6 já tem dois quadrado (L7C6, L8C6); exclua quadrado de L5C6.
81. L5C5 precisa de um parceiro quadrado; só L5C4 pode recebê-lo (horizontal).
82. L7C3 precisa de um parceiro quadrado; só L8C3 pode recebê-lo (vertical).
83. A dupla L8C3–L7C3 já está fechada; L8C2 não pode tocar essa dupla com outro quadrado.
84. A dupla L8C7–L8C8 já está fechada; L7C7 não pode tocar essa dupla com outro círculo.
85. A dupla L8C8–L8C7 já está fechada; L7C8 não pode tocar essa dupla com outro círculo.
86. linha 5 já tem dois quadrado (L5C4, L5C5); exclua quadrado de L5C1.
87. linha 5 já tem dois quadrado (L5C4, L5C5); exclua quadrado de L5C2.
88. linha 5 já tem dois quadrado (L5C4, L5C5); exclua quadrado de L5C3.
89. Na linha 7, círculo só cabe em L7C1 e L7C2; ambas as casas precisam dele.
90. Na linha 7, círculo só cabe em L7C1 e L7C2; ambas as casas precisam dele.
91. Na linha 8, triângulo só cabe em L8C1 e L8C2; ambas as casas precisam dele.
92. coluna 1 já tem dois triângulo (L6C1, L8C1); exclua triângulo de L3C1.
93. Na coluna 1, quadrado só cabe em L2C1 e L4C1; ambas as casas precisam dele.
94. coluna 2 já tem dois triângulo (L6C2, L8C2); exclua triângulo de L3C2.
95. coluna 2 já tem dois triângulo (L6C2, L8C2); exclua triângulo de L4C2.
96. Na coluna 2, quadrado só cabe em L2C2 e L4C2; ambas as casas precisam dele.
97. Na coluna 2, quadrado só cabe em L2C2 e L4C2; ambas as casas precisam dele.
98. Na coluna 3, triângulo só cabe em L3C3 e L4C3; ambas as casas precisam dele.
99. Na coluna 3, triângulo só cabe em L3C3 e L4C3; ambas as casas precisam dele.
100. coluna 3 já tem dois quadrado (L7C3, L8C3); exclua quadrado de L2C3.
101. coluna 4 já tem dois quadrado (L1C4, L5C4); exclua quadrado de L4C4.
102. Se L1C1 fosse círculo, 10 deduções levariam a: L6C3 fica sem símbolo possível. L6C3 não pode ser círculo: tocaria L5C3 e L6C4, formando um grupo maior que dois. Portanto, exclua círculo.
   - Hipótese, passo 1: coluna 1 já tem dois círculo (L1C1, L7C1); exclua círculo de L3C1.
   - Hipótese, passo 2: coluna 1 já tem dois círculo (L1C1, L7C1); exclua círculo de L5C1.
   - Hipótese, passo 3: L1C1 precisa de um parceiro círculo; só L1C2 pode recebê-lo (horizontal).
   - Hipótese, passo 4: A dupla L1C2–L1C1 já está fechada; L1C3 não pode tocar essa dupla com outro círculo.
   - Hipótese, passo 5: L1C3 precisa de um parceiro losango; só L2C3 pode recebê-lo (vertical).
   - Hipótese, passo 6: L3C1 precisa de um parceiro losango; só L3C2 pode recebê-lo (horizontal).
   - Hipótese, passo 7: L5C1 precisa de um parceiro losango; só L5C2 pode recebê-lo (horizontal).
   - Hipótese, passo 8: A dupla L5C2–L5C1 já está fechada; L5C3 não pode tocar essa dupla com outro losango.
   - Hipótese, passo 9: L5C3 precisa de um parceiro círculo; só L6C3 pode recebê-lo (vertical).
   - Hipótese, passo 10: L6C3 não pode ser círculo: tocaria L5C3 e L6C4, formando um grupo maior que dois.
   - Contradição final: L6C3 fica sem símbolo possível. L6C3 não pode ser círculo: tocaria L5C3 e L6C4, formando um grupo maior que dois.
103. L1C1 precisa de um parceiro losango; só L1C2 pode recebê-lo (horizontal).
104. A dupla L1C2–L1C1 já está fechada; L1C3 não pode tocar essa dupla com outro losango.
105. L1C3 precisa de um parceiro círculo; só L2C3 pode recebê-lo (vertical).
106. Na linha 1, círculo só cabe em L1C3 e L1C6; ambas as casas precisam dele.
107. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L5C3.
108. coluna 3 já tem dois círculo (L1C3, L2C3); exclua círculo de L6C3.
109. L1C6 precisa de um parceiro círculo; só L2C6 pode recebê-lo (vertical).
110. A dupla L2C6–L1C6 já está fechada; L2C7 não pode tocar essa dupla com outro círculo.
111. L2C7 precisa de um parceiro losango; só L2C8 pode recebê-lo (horizontal).
112. A dupla L5C3–L6C3 já está fechada; L5C2 não pode tocar essa dupla com outro losango.
113. L6C4 precisa de um parceiro círculo; só L6C5 pode recebê-lo (horizontal).
114. A dupla L6C5–L6C4 já está fechada; L6C6 não pode tocar essa dupla com outro círculo.
115. L6C6 precisa de um parceiro losango; só L5C6 pode recebê-lo (vertical).
116. Na linha 5, círculo só cabe em L5C1 e L5C2; ambas as casas precisam dele.
117. coluna 1 já tem dois círculo (L5C1, L7C1); exclua círculo de L3C1.
118. coluna 2 já tem dois círculo (L5C2, L7C2); exclua círculo de L3C2.
119. Na coluna 7, círculo só cabe em L4C7 e L8C7; ambas as casas precisam dele.
120. Na coluna 8, círculo só cabe em L4C8 e L8C8; ambas as casas precisam dele.
121. Na linha 3, círculo só cabe em L3C4 e L3C5; ambas as casas precisam dele.
122. Na linha 3, círculo só cabe em L3C4 e L3C5; ambas as casas precisam dele.
123. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C4.
124. linha 4 já tem dois círculo (L4C7, L4C8); exclua círculo de L4C5.

