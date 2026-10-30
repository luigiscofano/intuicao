# Verificação do Modo Sem Parar

Data: 24 de outubro de 2026. Base anterior: `835f473489f31c045b1b194e6ff23724a077483c`.

## Execução reproduzível

Na raiz do projeto, execute:

```
node tests/run-endless-suite.mjs
```

A execução agrega 22 suítes/execuções determinísticas. Não depende de rede, pacotes adicionais nem compilação.

## Cobertura

- 15.000 combinações de semente/configuração para ELO, PRUMO, PACTO e DESVIO, sempre verificando a resposta construída pelo motor real.
- 8.640 combinações para Reflexos: fontes, espelhos, paredes, portais e seletividade; todos os raios juntos e disparados individualmente; colisões; configuração inicial diferente da resposta.
- 3.600 combinações para Corte: forma, curvas e vazios; resposta e meta conferidas pelo motor geométrico original.
- 75 duelos completos entre bots exatos; todas as jogadas legais e término dentro do número de casas.
- Determinismo para a mesma semente/configuração e independência dos catálogos. Em 200 sementes padrão, layouts distintos: ELO 200; PRUMO 200; PACTO 200; DESVIO 198. Esses números não são uma promessa de unicidade de puzzles ou de gerações futuras.
- ELO com seis/oito regiões: circuitos realmente côncavos, não apenas pontos colineares acrescentados a retângulos.
- PRUMO: apoios incidentes sem colisões, conectividade, cobertura e momentos exatamente zerados. Todas as 6.300 combinações da suíte começam incompletas após a inicialização real das casas protegidas. Um stress adicional de 20.000 sementes de 4×4/10 apoios também passou; a construção preserva pelo menos uma peça de três ou mais casas.
- Interface simulada: entrada antes dos níveis, configurações aplicadas explicitamente, gabarito após três erros, confirmação duplicada, avanço automático, reinício com mesma semente, reabertura, retorno após vitória, saída durante avanço, callbacks antigos, histórico e separação da campanha.
- DESVIO: derrota contra bot mantém mapa; vitória humana avança; alteração de opções invalida a jogada pendente do bot; controles de modo e dificuldade preservados.
- Vitória seguida de edição/reinício não avança um tabuleiro incompleto ao reabrir. Diálogo de reinício pausa o avanço automático.
- Sessões e contadores Modo Sem Parar limitados ao registro atual por jogo. Opções inválidas/corrompidas normalizadas; falha de armazenamento não impede jogar.
- Regressões dos controles diretos, dicas, PACTO, reinício, atalhos, middle-click, estrutura visual e 20 cenários integrados existentes.

## Isolamento histórico

`tests/endless-campaign-baseline.json` fixa os hashes dos 34 arquivos protegidos anteriores: campanhas, motores, helpers de interação, estilos originais e arte da plataforma. O teste exige igualdade byte a byte.

A integração altera `app.mjs` e `collection-ui.mjs`. Seus novos hashes ficam em `tests/endless-authorized-sha256.json`, separado dos manifestos históricos. No HTML, só é acrescentado o link de `endless.css`; o teste de isolamento remove essa inserção exata para comparar o HTML histórico. Os geradores e o CSS Modo Sem Parar são novos módulos, sem sobrescrever o pacote congelado.

## Limite da verificação

Os testes de interface usam DOM e temporizadores simulados, não um dispositivo físico ou motor completo de layout. A tentativa de Chromium local foi bloqueada pelo ambiente antes de abrir uma página; nenhuma revisão visual real é alegada por este relatório. O roteiro opcional `tests/endless-browser-smoke.cjs` verifica entrada, novo desafio, reset, recarga, largura móvel e retorno à campanha quando executado em um ambiente com Chromium disponível. A revisão visual do Site publicado é uma etapa separada.
