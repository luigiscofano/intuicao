# Reconciliação do runtime publicado

## Origem e escopo

Comparação do Site versão 271 (commit 16242b590d08da3a5a5e075427b6d7475e7f4eff) com a main c78ee65ed29f235b154dc6a2203507c7c458203e. O commit de publicação 3507c293286608b3e5e1ef8490044c0df8097952, de 11/11/2026, introduziu geração procedural, mas não estava na história da main consultada. O snapshot GitHub consolidado não carregava toda essa implementação.

## Auditoria de todos os arquivos dist

Foram comparados os caminhos e hashes Git de todo o diretório dist. Entre as divergências, 106 módulos JavaScript tinham AST equivalente (ignorando comentários e posições); 22 folhas CSS diferiam somente em comentários/formatação. Essas diferenças não foram importadas. READMEs mais novos do GitHub foram preservados. Não houve troca indiscriminada de dist nem rollback de PRs visuais.

Foram recuperados: geradores lógicos por dificuldade, worker e cancelamento, migração de sessões sem parar, histórico antirrepetição, recuperação procedural de Sintonia e Repasse, e textos já publicados que explicam os mapas/skins. A compatibilidade de Órbita foi preservada como legado: isso não recoloca o jogo no catálogo.

## Regressão encontrada

Mesmo o Site 271 já havia perdido parcialmente a mudança original de Sintonia e Repasse: a dificuldade voltava a crescer automaticamente. O teste original falhou antes da correção (dificuldade 1 em vez de 0). As funções foram restauradas para respeitar a seleção, mantendo introduções curtas das configurações de Repasse.

## Dados e proteção

Nenhuma chave de campanha ou identificador de nível foi renumerado. A restauração reconhece sessões procedurais v2 e tentativas legadas; versões desconhecidas não são silenciosamente interpretadas como ciclos de campanha. Resultados atrasados de workers são descartados após navegação/cancelamento. Campanhas, jogos retirados, conquistas e regras não são substituídos por fases geradas.

## Verificação

Chrome isolado a 390 px validou os cinco jogos lógicos ativos: aplicar dificuldade 2, recarregar preservando seed e nível, gerar outro e manter a dificuldade, sem erros JavaScript. Nenhum dado pessoal foi usado. Resultados e limites finais são registrados no PR. O conjunto focado de geração, lógica e backup passou 187 testes (incluindo escopo MIRANTE com LF). A bateria adicional de Sintonia inclui dois testes históricos já falhos na base, relacionados a tentativas arquivadas e regras antigas; não foram apagados ou relaxados. Testes de escopo estritamente textuais exigem LF no checkout Windows, sem alteração semântica.

Publicação Sites e merge GitHub são operações independentes. Este PR não altera automaticamente o site publicado.
