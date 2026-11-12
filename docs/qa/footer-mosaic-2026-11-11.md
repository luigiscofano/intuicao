# Mosaico integrado ao rodapé

## Alteração aprovada

O friso repetido foi substituído por quatro peças inteiras, centralizadas na divisória. Cada peça mede 16 × 16 px; os intervalos medem 4 px e o conjunto possui 12 px de respiro de cada lado. O fundo creme opaco impede que a linha atravesse as peças. Verde, ocre e azul reutilizam os tokens da identidade existente.

A alteração de produção limita-se ao bloco do rodapé em `dist/identity.css`. Marca, folhas, texto, espaçamento do rodapé, jogos, controles e progresso permanecem intactos. A regra responsiva antiga que deslocava o friso para a esquerda foi retirada. Nenhuma folha CSS adicional ou recurso de rede foi criado.

## Base

- Site: versão 200, fonte `7612df8b03ebb071daa1ea7ee3bb0082c0069cd1`.
- GitHub: PR57, commit `ce51175197b5660033e225cc13aa8b166736bad7`.
- PR separado e dependente do PR57. Publicação no Site não implica merge das branches do GitHub.

## Verificação

- 575 testes do recorte explícito de CI aprovados, zero falhas.
- Os testes de identidade mantêm comparação integral das superfícies fora do rodapé. O teste de preservação dos botões reconhece a aprovação posterior dessa única folha.
- 35 casos de navegador aprovados: larguras de 320, 375, 390, 768 e 1280 px; início, três categorias, conquistas, seleção de Reflexos e Lastro.
- Conferidos: quatro curvas de 16 px, centralização, margens internas, fundo opaco, divisória e ausência de overflow horizontal ou captura de eventos.
- Marca original, rodapé e folhas preservados. Prancha aprovada e capturas reais de celular/tela larga comparadas visualmente.
- Documentação, inventário de recursos e índice das missões conferidos. O inventário mantém 11 registros documentais de direitos pendentes preexistentes.

O harness reproduzível está em [tests/browser/footer-mosaic.html](../../tests/browser/footer-mosaic.html), com sua lógica em [footer-mosaic.mjs](../../tests/browser/footer-mosaic.mjs). Deve ser servido a partir da raiz do repositório. O harness não integra `dist` nem a publicação.

## Limites

Validação de viewports no Chromium, não em aparelhos físicos nem em Safari. Não constitui auditoria completa de acessibilidade. As falhas históricas fora do recorte de CI não foram tratadas por este ajuste visual.
