# Testes, evidências e limites

Os arquivos desta pasta surgiram em várias revisões. Há testes atuais, verificações de entregas específicas, scripts de geração, relatórios e snapshots. Não execute todo arquivo `.mjs` como se fosse um teste sem efeitos colaterais.

## Requisito usado nesta preparação

Node.js 24.22.1, sem instalar pacotes npm. Execute os comandos na raiz do repositório. Alguns testes usam `git show`, portanto exigem o histórico completo e não funcionam da mesma forma em um ZIP sem `.git`.

## Recorte de motores executado

```bash
node --test tests/broto-engine.test.mjs tests/cerco-engine.test.mjs tests/sintonia-engine.test.mjs tests/repasse-engine.test.mjs tests/orbita-engine.test.mjs
```

Resultado nesta preparação: **95 testes aprovados, zero falhas**, em cerca de 11,3 segundos. São cinco arquivos; isso não equivale a aprovar todos os jogos, todas as fases ou todas as migrações.

## Diagnóstico amplo

```bash
node --test tests/*.test.mjs
```

Esse comando inclui contratos antigos e não é um gate verde de release nesta base. O registro externo do baseline `2354a3c` informa 701 testes, 521 aprovados e 180 falhas. Esse diagnóstico não foi reexecutado durante a organização documental; não o confundir com os 95 testes acima.

## Classificar uma falha

| Tipo | Ação |
| --- | --- |
| Regra atual incorreta | Reproduzir, corrigir e criar regressão |
| Contrato substituído | Registrar qual regra nova substitui a antiga e preservar a evidência |
| Mock incompleto | Corrigir o harness sem enfraquecer a regra |
| Snapshot de uma entrega | Conferir o commit de referência antes de exigir igualdade |
| Dependência de ambiente | Documentar requisito e testar no ambiente correspondente |
| Resultado inconclusivo | Manter pendente, sem classificar como aprovação |

## Cuidados

Leia scripts `build`, `record`, `generate` e `audit` antes de executá-los: nomes de arquivo não garantem somente leitura. Antes e depois de testes, confira `git status --short`. Use fixtures sintéticas para storage. Não limpe saves pessoais para tornar um teste verde.

Não adicionar `continue-on-error` para esconder falhas de um gate obrigatório. Um diagnóstico histórico pode ser manual e falhar de forma explícita. Uma suíte ativa futura precisa de um manifesto revisado, com justificativa por arquivo ou caso.

## Revisão ainda não incorporada

A documentação externa relata 536 testes atuais aprovados na revisão `f0e7fcf`, com triagem própria. Seu código e manifesto não estão nesta cópia. O comando `node scripts/test.mjs` daquela revisão não existe aqui e não deve ser apresentado como comando disponível.

Veja [qualidade](../docs/qualidade/README.md) para a matriz da preparação e os limites de evidência.
