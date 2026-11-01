# Indicação de interação nos animais do hero

Base:5c0c238563c37fe86c25ede921745a3be4064f08.

Convite contextual sob a galeria: “Clique nos animais para conhecer”. Em dispositivo com hover:none ou pointer:coarse: “Toque nos animais para conhecer”. Não se deduz touch da largura. Galeria referencia texto com aria-describedby; botões continuam com nomes por animal e aria-haspopup dialog.

Ponteiro e feedback hover/foco já existiam; preservados, com fundo também no foco/pressionado. Nenhuma transformação/movimento nos animais. Hint absoluto abaixo da galeria; em telas estreitas acrescenta margem inferior para separar o convite da próxima seção. Não aparece nas peças de jogos nem nas artes estáticas dentro dos modais.

Texto, mapas,45artes, recortes, sprites, jogos e lógica tooltip/modal inalterados.6testes Node passaram com hashes/prefixos dos arquivos antigos; somente inserção contextual e CSS adicional.

QA:179 verificações nativas finais sem falhas em1366/390/320px, incluindo45aberturas/fechamentos,15crops exatos, aria/cursor, nenhuma sobreposição, tooltip ausente500ms e presente950ms (delay800preservado), foco e pointerTypetouch sem hovertooltip. Inspeção visual desktop/320 e teclado nativo Enter abreCoral/Escape fecha/restaura foco. Snapshot de1chave do preview restaurado ao finalizar.

Limite: navegador de QA é desktop; evento de ponteiro touch exercitado, mas sem dispositivo touch físico. Texto “Toque” é condicionado à media query de entrada, não à largura.6testes Node e fonte do seletor media validados. Fixture excluída do pacote.
