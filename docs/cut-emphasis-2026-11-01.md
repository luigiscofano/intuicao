# Corte Certo — meta e percentual destacados

Os dois anexos indicavam a orientação “Lado roxo · meta… · um único eixo” e o medidor “Área roxa”.

A meta agora tem leitura HTML dentro da mesma moldura, abaixo do desenho, sem encolher com o SVG: texto14–16px, percentual22–24px, fundo lilás suave e borda fina. A forma e seus controles de corte mantêm geometria original. Medidor32–36px em cartão correspondente, rótulo12px. Reflexos e demais jogos não recebem esses estilos.

QA nativo: fases1/46/61/80 em1366/390/320px,12combinações sem overflow, meta dentro do quadro; confirmar a9px da moldura no desktop e62px no móvel (fileira de setas entre eles, sem vazio). Resultado numérico após confirmar testado em320 e desktop, sem sobreposição. Teste de preservação garante que app.mjs só muda a linha da legenda e index só inclui legenda/CSS; todos demais arquivos originais de produção idênticos.

Nenhuma alteração na proposta pendente de reestruturação Sintonia.

Testes:45 verificações de geometria/certificados/ação terminal e1 de preservação desta mudança passaram. Um assert histórico que exige app.mjs inteiro idêntico a um commit antigo falha pela nova legenda autorizada; comportamento terminal continua passando.
