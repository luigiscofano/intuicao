# Identidade transversal — 11/11/2026

## Escopo

Base GitHub: `070eba5`, após as rosetas geométricas do PR 52. A camada [identity.css](../../dist/identity.css), carregada ao final das folhas de estilo do [index.html](../../dist/index.html), aplica o acabamento aprovado nas três pranchas de catálogo/níveis, jogo/conquistas e fauna/rodapé.

- Catálogo: marcas geométricas nos títulos e chips de categoria.
- Níveis: papel creme e detalhes nas etapas, respeitando a cascata existente.
- Jogo: friso e fragmento somente no painel de instruções; ajuda em azul. O espaçamento do shell continua prevalecendo, como na prévia aprovada.
- Conquistas: acentos nos resumos, cartões e seleção, com fragmento no cabeçalho. Rosetas, pictogramas e critérios permanecem intactos.
- Fauna: friso, paleta e tipografia, sem substituir imagens, recortes, mapas ou texto.
- Rodapé: friso discreto, preservando marca, assinatura e folhas.

As regras duplicadas da prévia foram consolidadas e as variáveis receberam nomes de produção. Não há script de sessão de demonstração, captura, maquete, dependência nova ou geração de dados. Saves normais continuam sendo usados. No mobile, o fragmento das conquistas fica abaixo do texto até 620 px e o friso do rodapé acompanha o recuo lateral até 760 px. Grades e geometria dos jogos não foram alteradas.

## Regressões

[identity.test.mjs](../../tests/identity.test.mjs) verifica o link único, a preservação do HTML original, o escopo dos seletores, a paleta e os frisos, a ausência de recursos externos e scripts de demonstração e o retrato de integridade de `dist` contra a base. Esse último teste é um contrato desta entrega: uma mudança funcional posterior exige revisar explicitamente a base/expectativa, não eliminar a asserção para ocultar um diff.

O teste integra o recorte de plataforma em [engine-smoke.yml](../../.github/workflows/engine-smoke.yml). Os testes existentes das rosetas e de persistência continuam no mesmo recorte.

## Verificação local

Node.js 24.22.1; execução local em 11/11/2026, sem instalar pacotes.

| Comando/recorte | Resultado |
| --- | --- |
| `node --test tests/identity.test.mjs` | 4 aprovados; zero falhas |
| Cinco motores, comando do primeiro passo da CI | 95 aprovados; zero falhas |
| Família lógica e integração, comando do segundo passo da CI, incluindo `identity.test.mjs` | 290 aprovados; zero falhas |
| `node --test tests/versus/*.test.mjs` | 94 aprovados; zero falhas |
| `node scripts/build-achievement-index.mjs --check` | Índice conferido: 12 missões de seis campanhas |
| `node scripts/check-docs.mjs` | 85 documentos e 744 links locais verificados |
| `node scripts/check-assets.mjs` | Cobertura e hashes de 150 recursos verificados; 11 registros de direitos pendentes |
| `git diff --check` | Sem erros |

Total do recorte CI local: **479 testes aprovados, zero falhas** (os quatro testes de identidade já estão incluídos nos 290). Os comandos completos dos três grupos constam no workflow vinculado acima. Nenhum arquivo original de `dist`, exceto a inserção do link em `index.html`, foi alterado.

## Revisão visual e funcional local

Evidências fornecidas pelo responsável pela integração após QA em navegador, em 11/11/2026. Foram usados desktop de 1197 × 789 px e iframes de 333 e 400 px, com áreas úteis de 318 e 385 px; o modal foi verificado a 333 px.

- Catálogo, seleção de níveis, gameplay de Reflexos, conquistas, ficha da Capivara e rodapé foram comparados visualmente com as prévias aprovadas.
- Não houve overflow horizontal nas áreas móveis verificadas.
- Navegação verificada: filtros Raciocínio lógico/Todos no catálogo; seleção → nível 1 → retorno; ação Confirmar todos emitindo raio e resultado.
- Conquistas: abas Missões/Gerais, filtro Reflexos e link para o jogo verificados. Ficha da Capivara: abertura e fechamento verificados.
- O SVG `#scene` permaneceu idêntico antes/depois: 583 × 335,21875 px, `viewBox="0 0 800 460"`; flechas de 52 × 52 px.
- Saves locais existentes de Corte (1) e Órbita (1) foram exibidos antes/depois, sem migração ou reset.
- Nos logs consultados, apareceram somente erros da extensão do navegador; nenhum erro da aplicação foi detectado nesse recorte. Isso não constitui auditoria exaustiva de erros.

## Limites

Esta implementação não executa a suíte histórica inteira, lint, Gitleaks ou auditoria jurídica de licenças. O verificador de recursos usa o modo normal, não `--release`. Testes estáticos não comprovam foco, toque, ausência de sobreposição ou equivalência visual em todos os navegadores. A revisão em navegador acima foi realizada separadamente pelo responsável pela integração e cobre somente os tamanhos, telas e fluxos descritos; não equivale a uma auditoria completa de acessibilidade ou de todos os jogos. Este registro não afirma publicação, commit, push ou aprovação da CI remota.
