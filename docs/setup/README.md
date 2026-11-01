# Instalação, execução e diagnóstico

## Requisitos

Para jogar, use Python 3 e um navegador com módulos ES, SVG, workers e armazenamento local. Para os testes, esta preparação foi verificada com Node.js 24.22.1. Não existe `package.json` nesta base e não é necessário `npm install`.

## Obter a cópia

O repositório privado ainda precisa ser criado no GitHub. Não há um endereço remoto confirmado para clone nesta entrega. Se você recebeu um arquivo `intuicao-organizado.bundle`, ele contém os objetos Git e as branches locais:

```bash
git bundle verify intuicao-organizado.bundle
git clone -b export/github-organizado intuicao-organizado.bundle intuicao
cd intuicao
git branch -a
```

O bundle é um repositório transportável, não um ZIP do site. O clone normalmente deixa as outras branches em `origin/*`; consulte o [plano de integração](../github/README.md) antes de enviá-las a um remoto. O bundle não configura GitHub, permissões ou deploy.

## Iniciar e encerrar

Na raiz do projeto:

```bash
python3 -m http.server 8766 --bind 127.0.0.1 --directory dist
```

No Windows:

```powershell
py -m http.server 8766 --bind 127.0.0.1 --directory dist
```

Visite http://127.0.0.1:8766/. Pressione `Ctrl+C` no terminal para encerrar. A página pode continuar visível em memória, mas novos carregamentos dependem do servidor.

## Primeira verificação manual

1. Abra a categoria Intuição e entre em Reflexos.
2. Escolha uma fase e faça uma ação permitida.
3. Volte à seleção e abra uma categoria diferente.
4. Abra um duelo, selecione uma jogada e confira a prévia antes de confirmar.
5. Recarregue a página e verifique apenas o comportamento de save oferecido pelo jogo escolhido.

Não use o progresso pessoal como massa de teste de migração. Prefira um perfil de navegador separado para QA.

## Problemas comuns

| Sintoma | Verificação |
| --- | --- |
| Página mostra listagem de diretórios | Confirme `--directory dist` e se o terminal está na raiz do repositório |
| Erro de módulo ou worker ao abrir arquivo | Use a URL HTTP; não abra por `file://` |
| Porta ocupada | Use outra porta, como 8767, e altere a URL correspondente |
| Save aparentemente desapareceu | Confira domínio, porta, perfil do navegador e navegação privada |
| Arte ou módulos retornam 404 | Confira se o clone é completo e se os caminhos mantêm maiúsculas/minúsculas |
| Teste exige commit antigo | Confira `git rev-parse --is-shallow-repository`; preserve o histórico completo |
| Muitos testes antigos falham | Leia [testes](../../tests/README.md) e identifique o contrato antes de alterar código |

## Atualizações

A cópia local não se atualiza automaticamente quando o site muda. Compare commits e faça uma atualização explícita. Um envio ao GitHub também não implanta o site. O arquivo `.openai/hosting.json` é configuração do projeto existente; não o use para criar outro site por engano.
