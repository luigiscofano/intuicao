# Revisão independente — mais paredes e espaço entre objetos

Reexecução final em 30/10/2026. Base comparada: publicação v104, commit `bc9240ebd850f3b7d0710b36d8a0ce10319f7cb0`. Registros finais: `dist/development/reflexos-spacious/records.json`; SHA-256 em `physics-and-space-summary.json`.

## Física e relações preservadas

- **80/80** referências vencem; **80/80** configurações iniciais continuam não resolvidas.
- **1.938** perturbações individuais e cantos simultâneos de ±0,5°: **zero falhas**.
- **64** contraprovas completas de conflito, **41** delas sem paredes; seis fases compartilham espelho com contatos distintos e trajetórias conjuntas válidas.
- **1.874** ordens de disparos das contraprovas continuam produzindo colisão. Mudar a ordem não elimina a incompatibilidade.
- **1.731** casos nomeados reproduzem seus estados esperados; **1.092** comparações de casos vencedores preservam os itinerários de espelhos e portais. Nenhum caso histórico comparável mudou de estado.
- A configuração inicial da fase 46 passa de colisão para erro de chegada, após reposicionar uma orientação inicial. Continua não resolvida; os casos históricos de ângulos explícitos permanecem reproduzíveis.
- Incidência mínima de referência **30°**; nenhuma exceção de referência abaixo disso. Nas perturbações, mínimo **29,5°**.
- Reexecutadas **1.094** configurações conhecidas; entre **288** vitórias com no máximo as operações da referência, nenhuma incidência abaixo de 20°.

### Menores folgas físicas nas perturbações

| Medida | Unidades do tabuleiro |
|---|---:|
| Contato até extremidade do espelho | 10,325 |
| Segmento físico até parede | 5,639 |
| Captura transversal do alvo | 5,060 |
| Captura transversal do portal | 5,232 |
| Distância entre trajetórias de cores diferentes | 6,335 |

As folgas de alvo/portal são raio menos distância do centro à linha incidente. Saltos de portal não são tratados como segmentos físicos.

## Paredes com função reproduzida

A campanha passa de **23 para 33 fases com paredes**. As dez adições estão nas fases **15, 20, 25, 28, 31, 33, 35, 36, 49 e 63**.

Para cada adição, a auditoria removeu somente a parede nova no mapa final: uma rota adicional catalogada chega ao alvo sem a parede e termina efetivamente na parede quando ela é recolocada. **10/10 ablações passaram**. As referências, os casos narrativos preservados e as contraprovas centrais continuam funcionando. Essas paredes restringem alternativas adicionais; não se afirma que eram necessárias na versão anterior nem que toda solução deve usar um recurso específico.

## Espaçamento visual antes e depois

A medição usa bordas, não apenas distância entre centros: fonte com disco conservador de interação de 24; alvo com traço; halo e caixa estimada do rótulo do portal; vidro, centro, número e alça do espelho; parede com contorno. A medição foi reexecutada independentemente e o resultado completo coincidiu exatamente com o relatório final.

| Configuração | Fases com sobreposição antes | Depois |
|---|---:|---:|
| Inicial | 24 | **0** |
| Referência | 22 | **0** |
| Perturbações de ±0,5° | 22 | **0** |

A pior folga entre bordas passa de **−18 para +1,482**. O mínimo por fase melhora em **47** configurações iniciais e **48** referências. Não se afirma aumento uniforme: na fase 20, a parede nova reduz um espaço anteriormente muito amplo, ainda deixando 31,18 na configuração inicial e 63,71 na referência.

**Ressalvas explícitas — não há folga uniforme de 8:**

| Fase | Menor folga inicial | Referência |
|---|---:|---:|
| 37 | 3,000 | 3,000 |
| 62 | 5,568 | 14,103 |
| 64 | 1,482 | 1,482 |
| 78 | 1,482 | 1,482 |

Nas fases 64 e 78, a composição compartilhada conserva proximidade entre elementos, sem sobreposição segundo esta métrica. Não houve **novo recorte nem agravamento de recorte nas bordas do tabuleiro** ao comparar os limites de cada sprite inicial e de referência com a base. Isso não equivale a afirmar que toda decoração histórica esteja inteiramente dentro das bordas.

## Preservação e limites

Motor, matemática, renderizadores de Reflexos, `app.mjs`, estilos e controles padrão foram comparados byte a byte com v104: **inalterados**. Quantidades de fontes/alvos/portais, raios, cores/filtros, pares, direções das fontes, comprimentos dos espelhos e dimensões dos objetos antigos: **preservados**. Há apenas as dez paredes adicionais e mudanças autorizadas de composição.

O envelope de rotação completa é conservador e fica separado da folga nos estados jogáveis; uma interseção entre envelopes não demonstra sobreposição inevitável. As caixas de texto são estimativas explícitas do tamanho de fonte, não medidas de pixels renderizados. As amostras não provam o contínuo inteiro de ângulos, unicidade, necessidade universal de recursos ou dificuldade humana. Não se apresenta esta análise numérica como teste visual móvel ou teste com jogadores.

Reprodução: `tests/reflexos80-independent.mjs`, `tests/reflexos-spacious-space.mjs` e `tests/reflexos-spacious-independent-compare.mjs`.
