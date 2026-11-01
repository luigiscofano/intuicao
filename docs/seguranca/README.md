# Segurança e publicação

Revisão de **1º de novembro de 2026**, partindo de `ae8cad7aed23b974d742a4b0889bfc1e1c5efe3e`. O repositório foi tornado **público em 01/11/2026**, após autorização explícita do titular, na revisão `71cf0a6ae0abf1f60db76189d8c520064e97144b`. O histórico foi preservado. Essa mudança não publica uma nova versão do site nem atesta ausência de toda vulnerabilidade.

| Cuidado | Trabalho realizado | Situação após a abertura |
| --- | --- | --- |
| Direitos dos recursos | Inventário individual com SHA-256 de 133 arquivos, evidências de origem e 16 caminhos visuais históricos | Autoria declarada pelo titular; ver atualização abaixo. Recursos visuais continuam fora da MIT |
| Segredos e privacidade | Histórico, branches, PRs, logs, metadados de commits e referências internas revisados | Titular autorizou manter o e-mail e preservar o histórico; ver atualização abaixo |
| Automação | Motores em PRs/pushes, verificação de segredos, inventário, actions fixadas por SHA e Dependabot | Proteção de `main` confirmada; detecção de segredos, push protection e relatos privados habilitados |
| Apresentação | README e guias atualizados com alcance dos testes, limitações e critérios de publicação | Não apresentar pendências como resolvidas nem equiparar site e GitHub |

## Atualização após declaração do titular — 01/11/2026

Luigi Scofano de Araujo declarou a autoria dos elementos do Intuição e autorizou a manutenção do e-mail pessoal nos commits existentes. A [declaração](../recursos/declaracao-autoria.md) foi registrada e vinculada às 133 entradas do inventário e aos caminhos históricos. Os créditos e termos de materiais externos, como Natural Earth, permanecem preservados.

As pendências documentais de autoria e a decisão de privacidade foram resolvidas com base nessa declaração, sem certificação independente. Naquela etapa, o histórico e os e-mails antigos foram mantidos sem mudança de visibilidade. A abertura foi autorizada e realizada posteriormente, conforme o registro no início deste documento.

Os resultados abaixo descrevem a auditoria anterior, com seus limites e revisão de referência.

## Escopo e resultados da auditoria

- **28 branches e 24 referências de PRs** consultadas, sem tags retornadas. **262 commits alcançáveis** no conjunto; `main` contém 255. Foram preservados os identificadores, autores e datas.
- Cópia local reconstruída a partir dos objetos Git originais e da API, com hashes de objetos conferidos e `git fsck --full --no-reflogs` sem erros. A branch antiga `import/bootstrap` também foi incluída; os três fragmentos do bundle correspondem ao histórico já examinado.
- **Gitleaks 8.30.1**, binário oficial com SHA-256 conferido: `551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb`. Comando: `gitleaks git . --log-opts="--all --full-history --diff-merges=first-parent" --redact=100 --no-banner`. O scanner registrou 258 commits com conteúdo examinável e cerca de 212 MB de diferenças. Commits sem diferenças não viram conteúdo adicional.
- **326 alertas genéricos foram classificados**: 318 hashes SHA-256 de modelos de fases PRUMO, três hashes de imagens, três identificadores de armazenamento local de REPASSE e dois IDs de fases de Corte certo. Nenhuma credencial real foi confirmada. As exceções em [.gitleaksignore](../../.gitleaksignore) são fingerprints específicos de commit, caminho, regra e linha; não há exclusão de pastas inteiras ou desativação da regra genérica.
- **24 PRs**, suas discussões/revisões disponíveis e **18 logs de jobs de 18 execuções do Actions** foram recuperados e examinados pelo Gitleaks, sem alertas. Nenhum artefato foi retornado nas 18 consultas. As consultas foram feitas antes do PR desta preparação; execuções futuras precisam de revisão própria.
- Busca complementar nos **2.176 blobs únicos**, dos quais 2.084 textuais, não encontrou e-mails ou cabeçalhos de chave privada no conteúdo textual. Encontrou referências privadas de arquivos e caminhos locais de desenvolvimento. Isso é uma busca por padrões, não uma certificação de ausência de dados pessoais.
- **42 commits antigos contêm um endereço pessoal de e-mail** nos metadados. Os commits recentes criados pelo GitHub usam `noreply`. O endereço pessoal não é reproduzido neste relatório. Alterar a configuração futura não modifica commits antigos.
- Foram retirados identificadores privados de arquivos de 12 caminhos da árvore atual. Nomes dos arquivos originais e SHA-256 dos sprites foram preservados; as duas verificações de proveniência passam a usar nome e hash em vez de um identificador privado. As referências antigas continuam no histórico. Caminhos técnicos de ambiente em relatórios antigos foram mantidos como evidência, sem identificadores de conta encontrados nessa busca.

Não houve revogação de credenciais, porque nenhuma foi confirmada como exposta. Se uma credencial real for descoberta posteriormente, revogá-la/rotacioná-la antes de tratar o histórico.

## Recursos e licenças

Consulte [origem e direitos dos recursos](../recursos/README.md). Na auditoria inicial, as 133 entradas ficaram `pending`; após a confirmação do titular, passaram a `cleared` com base na declaração de autoria. Esse estado se refere à documentação dos elementos autorais para publicação pelo titular, sem conceder licença aberta de reutilização das artes. Não foi atribuída licença MIT a imagens, fontes ou marcas por inferência. O contorno cartográfico atribuído ao Natural Earth tem termos de domínio público identificados separadamente.

As imagens originais, os recortes, os jogos e a galeria de 11 capturas foram preservados. Os metadados da fonte indicam criação para Intuição, mas não identificam sozinhos o titular nem uma autorização de redistribuição. As capturas do site também dependem dos direitos dos elementos retratados.

## Verificações automáticas

| Check | O que verifica | O que não comprova |
| --- | --- | --- |
| `links` | Destinos locais da documentação mantida | URLs externas ou correção das regras descritas |
| `engines` | Cinco arquivos de testes de motores: 95 testes | Todos os jogos, fases, migrações ou interface |
| `secret-scan` | Padrões de segredos no histórico disponível, incluindo merges | Toda informação confidencial possível ou credenciais revogadas |
| `asset-inventory` | Cobertura de arquivos visuais, hashes e campos do inventário | Autoria e validade jurídica da permissão declarada |

Os workflows usam `contents: read`, checkout sem persistir credenciais e limites de tempo. Não usam `pull_request_target`, não fazem deploy e não precisam de segredos. Checkout e setup-node estão fixados em commits oficiais; o Dependabot acompanha atualizações de GitHub Actions semanalmente. A versão e o checksum do binário Gitleaks exigem revisão explícita quando forem atualizados.

Foram ativados no GitHub **Dependency graph**, **Dependabot alerts**, **Malware alerts** e **Dependabot security updates**. Após a confirmação de acesso pelo titular, a regra [main - PRs e verificacoes](https://github.com/luigiscofano/intuicao/rules/26331597) foi salva. A limitação de aplicação enquanto o repositório era privado deixou de se aplicar após a abertura: a API confirmou `protected: true` para `main` e o ruleset está ativo.

A regra exige PR, resolução de conversas, branch atualizada e os quatro checks acima, vinculados ao GitHub Actions. Ela bloqueia exclusão e force push, sem lista de bypass. O número de aprovações independentes é zero para permitir manutenção individual; as verificações continuam obrigatórias.

Também foram habilitados **Secret Protection / secret scanning**, **Push protection** e **Private vulnerability reporting**. A configuração padrão do **CodeQL** foi solicitada para GitHub Actions, JavaScript/TypeScript e Python, em runner padrão do GitHub; consulte as [execuções](https://github.com/luigiscofano/intuicao/actions) para acompanhar a conclusão da análise inicial. Nenhuma assinatura paga foi contratada.

Não adicionar uma aprovação obrigatória do próprio autor como solução: o autor não pode aprovar o próprio PR. Para manutenção individual, usar PR obrigatório, checks obrigatórios, resolução de conversas e bloqueio de force push/exclusão. Acrescentar aprovação independente quando houver outro revisor.

## Registro da abertura e manutenção

1. **Autoria registrada:** a declaração do titular cobre os elementos autorais atuais e históricos. O inventário aponta a evidência e mantém os materiais externos sob seus termos. Executar `node scripts/check-assets.mjs --release` ao preparar a publicação; o verificador é documental e não certifica a autoria.
2. **Preservar o histórico:** o titular autorizou manter o e-mail pessoal nos commits antigos. Essa exposição foi aceita para eventual abertura. Manter commits, branches e PRs; não realizar force push, reescrita ou criar cópia com histórico novo.
3. **Revisar o PR e os checks:** nenhuma falha deve ser ignorada por `continue-on-error`. A suíte ampla ainda não foi reconciliada; o recorte verde não é um selo de release completa.
4. **Visibilidade confirmada:** o titular autorizou a abertura após esclarecer que os e-mails antigos são metadados dos commits. A visibilidade pública foi confirmada na interface e na API do GitHub.
5. **Proteções conferidas:** `main` está protegida pelo ruleset descrito acima. Secret scanning, push protection e private vulnerability reporting estão habilitados; acompanhar as análises e alertas de CodeQL, Gitleaks e Dependabot. Mudanças nessas configurações exigem nova conferência.
6. **Testar a apresentação externa:** abrir o GitHub sem autenticação e verificar README, imagens, licença e instruções. Só depois substituir o destaque do LinkedIn por um link acessível. Tornar o GitHub público não muda automaticamente o acesso do site nem garante a geração de prévia pelo LinkedIn.

## Limites e repetição

O exame não foi um pentest nem incluiu OCR de todos os pixels de imagens históricas, conteúdo de contas externas, segredos configurados no GitHub, objetos inacessíveis por referências retornadas ou serviços de hospedagem. Foram examinados os dados alcançáveis na data e revisão acima. Mudanças posteriores, novos anexos, logs e colaboradores exigem nova conferência.

Referências: [uso seguro de Actions](https://docs.github.com/en/actions/reference/security/secure-use), [Gitleaks](https://github.com/gitleaks/gitleaks), [remoção de dados sensíveis](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) e [visibilidade de repositórios](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility).
