// Regras aprovadas: conteúdo leve compartilhado pela biblioteca e suas informações.
export const LOGIC_GAME_INFO = Object.freeze({
  "divisa": {
    "name": "DIVISA",
    "description": "Reparta o terreno para que cada par de territórios compartilhe exatamente a fronteira indicada.",
    "summary": "Escolha uma letra e toque nas casas. Compare os contatos com as cotas e preserve a conexão de cada território.",
    "rules": [
      "Preencha cada casa com uma das letras de território, respeitando todas as letras fixas.",
      "Todas as casas de uma mesma letra devem formar uma única região ligada por lados.",
      "Para cada par de letras, a quantidade de lados compartilhados deve ser exatamente a indicada no painel."
    ],
    "purpose": "Praticar contagem de fronteiras e raciocínio sobre conexão de regiões.",
    "why": "Um contato usado em um lugar muda as possibilidades de outro. As fronteiras e a conexão precisam funcionar juntas."
  },
  "pulso": {
    "name": "PULSO",
    "description": "Marque três batidas igualmente espaçadas em cada linha e faça as colunas atingirem suas cotas.",
    "summary": "Coloque três marcas por linha, com o mesmo espaço entre elas, e acerte as quantidades das colunas.",
    "rules": [
      "Em cada linha, coloque exatamente três marcas. Deixe o mesmo número de casas entre a primeira e a segunda e entre a segunda e a terceira.",
      "Exemplo: marcar as posições 1, 3 e 5 funciona, pois os dois intervalos são iguais. Cada linha pode usar um intervalo diferente.",
      "O número acima de cada coluna diz quantas marcas precisam ficar nela.",
      "Use os controles para marcar cada casa como preenchida ou vazia. Preserve as pistas que já vieram prontas e confirme a resposta.",
    ],
    "purpose": "Praticar identificação de intervalos, contagem e comparação de capacidades compartilhadas.",
    "why": "Cada linha tem um ritmo próprio, mas todas compartilham as mesmas colunas. A solução aparece ao cruzar essas duas leituras."
  },
  "foz": {
    "name": "FOZ",
    "description": "Oriente os canais para que toda gota alcance a foz, respeitando o número de passos indicado nas pistas.",
    "summary": "Faça todos os caminhos de água chegarem à foz, o ponto marcado com 0.",
    "rules": [
      "Toque em um ponto para escolher a seta, ou escolha uma direção na barra. A seta precisa apontar para um vizinho ligado por um canal.",
      "Cada ponto tem uma seta, menos a foz 0. Seguindo as setas de qualquer ponto, você precisa chegar à foz.",
      "Os caminhos podem se juntar, mas não podem dar voltas sem saída.",
      "Os números mostram quantos trechos faltam até a foz. Conte os canais percorridos, não os pontos. Confira as pistas e confirme.",
    ],
    "purpose": "Praticar raciocínio sobre percursos, distâncias e prevenção de ciclos.",
    "why": "Uma orientação local determina a distância de quem passa por ela. Os caminhos podem se juntar, mas todos precisam terminar na mesma foz."
  },
  "refugio": {
    "name": "REFÚGIO",
    "description": "Separe os marcos em espaços livres, usando apenas barreiras que realmente separam dois refúgios.",
    "summary": "Separe o espaço em refúgios. Cada um precisa ter um único marco.",
    "rules": [
      "Marque as casas como livres ou barreiras. Preserve as pistas fixas; os marcos são sempre casas livres.",
      "Casas livres que se tocam pelos lados formam um refúgio. Cada refúgio precisa conter exatamente um marco.",
      "Cada casa de barreira deve tocar exatamente dois refúgios diferentes pelos lados. Tocar o mesmo refúgio duas vezes ainda conta como um só.",
      "Diagonais não ligam casas nem contam como contato. Complete a marcação e confirme.",
    ],
    "purpose": "Praticar dedução sobre componentes conectados e separação de espaços.",
    "why": "Uma barreira tem função precisa: separar duas regiões diferentes. Reconhecer a identidade dos espaços é tão importante quanto contar vizinhos."
  },
  "mirante": {
    "name": "MIRANTE",
    "description": "Distribua poucas peças para que todos os observadores vejam a forma certa, aproveitando a mesma peça em várias direções sem esconder quem ainda precisa ser visto.",
    "summary": "Coloque as formas para que cada seta da borda veja primeiro a forma pedida.",
    "rules": [
      "Use exatamente as peças do estoque, no máximo uma por casa. Deixe as outras casas vazias.",
      "Cada seta da borda olha em linha reta. Ela atravessa casas vazias e para na primeira peça: essa peça deve ser a forma pedida. Não há visão na diagonal.",
      "Toda peça precisa ser vista por pelo menos duas setas. Setas de lados opostos contam separadamente; uma borda sem seta não conta.",
      "Escolha uma forma ou marcação de vazio nos controles e toque na casa. No computador, o botão direito marca X; o esquerdo mantém a ação escolhida.",
      "Uma linha de visão totalmente vazia não atende à pista. Confira o estoque e confirme a resposta.",
    ],
    "purpose": "Praticar visibilidade, exclusão de posições e uso de um estoque global.",
    "why": "Uma forma pode atender a vários olhares. O estoque e as oclusões permitem transformar pistas das bordas em decisões no interior."
  },
  "renovo": {
    "name": "RENOVO",
    "description": "Una cada semente a uma folha por um botão, formando trios que dobram uma vez e não se cruzam.",
    "summary": "Ligue semente, botão e folha em trios, sem cruzar as linhas.",
    "rules": [
      "Cada botão deve se ligar a uma semente e a uma folha. Use todas as peças, uma única vez.",
      "As duas ligações do botão formam um L: uma horizontal e outra vertical. Cada trecho termina na primeira peça que encontra naquela direção.",
      "As linhas não podem cruzar, passar por outra peça nem ficar uma sobre a outra. Só as duas linhas do mesmo trio se encontram, no botão.",
      "Trace uma ligação entre as peças ou toque nas duas pontas alinhadas. Você pode retirar um trecho tocando nas pontas novamente. Complete os trios e confirme.",
    ],
    "purpose": "Praticar associação de parceiros, planejamento e leitura de conflitos geométricos. As sementes, os botões e as folhas também ilustram temas reais de biologia vegetal: a germinação, que dá início ao desenvolvimento de uma nova planta; as folhas, que realizam fotossíntese; e os botões florais, que podem se abrir em flores ligadas à reprodução. Esses elementos aproximam o raciocínio lógico da observação das plantas e convidam a reconhecer suas diferentes funções. As ligações do tabuleiro são uma metáfora visual: não representam a ordem de crescimento nem o transporte de água ou nutrientes de uma planta real.",
    "why": "Uma ligação pode consumir o parceiro de outro botão ou bloquear seu trecho. As escolhas simples precisam coexistir sem cruzamento."
  }
});

export const LOGIC_GUIDANCE = Object.freeze({
  "divisa": "Escolha uma letra e toque nas casas. Compare os contatos com as cotas e preserve a conexão de cada território.",
  "pulso": "Coloque três marcas por linha, com o mesmo espaço entre elas, e acerte as quantidades das colunas.",
  "foz": "Faça todos os caminhos de água chegarem à foz, o ponto marcado com 0.",
  "refugio": "Separe o espaço em refúgios. Cada um precisa ter um único marco.",
  "mirante": "Coloque as formas para que cada seta da borda veja primeiro a forma pedida.",
  "renovo": "Ligue semente, botão e folha em trios, sem cruzar as linhas."
});
