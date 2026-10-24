# Validação final — Reflexos v3

Status: catálogo de 200 níveis integrado e regressão portátil aprovada.

## Verificações executadas
- 200 referências no motor original, com ângulos de 0,1° e estados iniciais não resolvidos.
- 1.622 perturbações individuais de ±0,5° e 5.612 cantos simultâneos aprovados.
- 745 ordens de disparo individual aprovadas, além das execuções conjuntas.
- Espelhos com comprimento 124,8, envelope de rotação 66, fontes a pelo menos 148 dos espelhos e alvos com raio 22.
- Sem interseções espelho–espelho ou espelho–parede nos estados iniciais e de referência.
- 5.712 verificações em 300 fluxos de interface Reflexos/Corte: três erros, desbloqueio, persistência, aplicação sem confirmação automática, vitória assistida, próxima fase e conservação dos registros antigos.
- 27 verificações do motor: colisões, truncamento, salto sem segmento físico, seletividade e ciclos.
- 900 respostas verificadas: 200 Reflexos, 100 Corte, 400 ELO/PRUMO e 200 PACTO.
- Regressões recuperadas de interação direta e amostra de 544 partidas/4.658 transições DESVIO.
- Comparação de hashes: motor, renderizadores, CSS, controles e demais catálogos preservados. Alterações limitadas ao catálogo Reflexos, ligação de respostas, contagens e documentação.
- Apenas os níveis 197 e 198 têm alguma reflexão de referência com desvio menor que 25°. São exceções raras, não o padrão da campanha.

## Revisão editorial
Os achados concretos foram encerrados por alterações de geometria, introduções graduais ou documentação de alternativas legítimas. As aprovações independentes e seus hashes ficam em revisoes/pilotos/approval-summary.json. O registro REVISOES-EDITORIAIS.md resume as correções.

As famílias de composição são reutilizadas em aplicações e consolidações explícitas. Não se afirma que existam 200 arquiteturas lógicas inéditas. Mais portais ou mudanças de escala não são contados automaticamente como maior profundidade. A progressão é editorial, não uma calibração estatística com jogadores.

## Limites
As buscas de alternativas são finitas; não provam unicidade no espaço contínuo. Soluções diferentes da referência continuam aceitas pelo motor. As grades de 0,1° e as margens testadas documentam seu alcance, sem garantir impossibilidade fora da amostra.

Os testes de interface executam o aplicativo real com DOM e relógio simulados. As pranchas são inspeções estáticas, não capturas de uma sessão de jogo. Mouse, toque, responsividade e aparência em navegador interativo real ainda não foram verificados nesta execução; não houve contorno de autenticação ou de restrições do navegador.

O Drive é armazenamento. A cópia portátil deve ser servida por HTTP conforme o README; não promete sincronização de progresso entre aparelhos. Nenhum exercício foi enviado ao curso.
