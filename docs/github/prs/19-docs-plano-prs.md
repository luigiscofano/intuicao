# docs: registrar plano de PRs e fechamento da organização

**Estado:** preparado localmente, sem PR remoto aberto.

**Origem:** `docs/plano-prs`  
**Base planejada:** `main`, depois dos PRs 1 a 18.

## Problema e resultado

Consolida as descrições de revisão, dependências, manifesto dos documentos e registro das verificações. Permite levar a preparação ao GitHub sem inventar números ou resultados de CI.

## Validação

Executar `node scripts/check-docs.mjs`, conferir integridade do código e dos ativos contra `2354a3c` e verificar o bundle Git de transporte. Os resultados ficam no fechamento da entrega.

## Pendências

Recuperar a revisão f0e7fcf, criar o repositório privado e abrir os PRs. Nenhum deploy do site ou licença aberta é parte deste PR.
