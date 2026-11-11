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
    "summary": "Marque batidas e casas vazias. Compare o espaçamento de cada linha com as cotas das colunas.",
    "rules": [
      "Em cada linha, coloque exatamente três marcas, com a mesma distância entre a primeira e a segunda e entre a segunda e a terceira.",
      "O número acima de cada coluna diz quantas marcas ela deve conter.",
      "Preserve as casas dadas; marque as outras casas como preenchidas ou vazias."
    ],
    "purpose": "Praticar identificação de intervalos, contagem e comparação de capacidades compartilhadas.",
    "why": "Cada linha tem um ritmo próprio, mas todas compartilham as mesmas colunas. A solução aparece ao cruzar essas duas leituras."
  },
  "foz": {
    "name": "FOZ",
    "description": "Oriente os canais para que toda gota alcance a foz, respeitando o número de passos indicado nas pistas.",
    "summary": "Toque em um ponto para escolher sua seta ou use uma direção na barra. A foz não recebe seta.",
    "rules": [
      "Em cada ponto, exceto na foz 0, desenhe uma única seta para um vizinho ligado por canal.",
      "Seguindo as setas, todos os pontos devem chegar à foz; não pode haver ciclo. Caminhos podem se juntar.",
      "Um número indica quantos trechos a gota percorre daquele ponto até a foz. Conte os trechos, não os pontos."
    ],
    "purpose": "Praticar raciocínio sobre percursos, distâncias e prevenção de ciclos.",
    "why": "Uma orientação local determina a distância de quem passa por ela. Os caminhos podem se juntar, mas todos precisam terminar na mesma foz."
  },
  "refugio": {
    "name": "REFÚGIO",
    "description": "Separe os marcos em espaços livres, usando apenas barreiras que realmente separam dois refúgios.",
    "summary": "Marque casas livres ou barreiras. Acompanhe quais regiões cada barreira separa.",
    "rules": [
      "Marque cada casa como livre ou barreira, sem alterar as pistas; os marcos são sempre livres.",
      "Cada região de casas livres ligadas por lados deve conter exatamente um marco.",
      "Toda casa de barreira deve tocar, por lados, exatamente duas regiões livres diferentes."
    ],
    "purpose": "Praticar dedução sobre componentes conectados e separação de espaços.",
    "why": "Uma barreira tem função precisa: separar duas regiões diferentes. Reconhecer a identidade dos espaços é tão importante quanto contar vizinhos."
  },
  "mirante": {
    "name": "MIRANTE",
    "description": "Distribua poucas peças para que todos os observadores vejam a forma certa, aproveitando a mesma peça em várias direções sem esconder quem ainda precisa ser visto.",
    "summary": "Escolha uma forma ou uma casa vazia. Cruze os olhares das bordas e acompanhe o estoque.",
    "rules": [
      "Coloque exatamente as peças indicadas no estoque, no máximo uma por célula. As demais células ficam vazias.",
      "Cada observador deve encontrar a forma indicada como a primeira peça na direção de sua seta. A visão atravessa células vazias e para na primeira peça; não usa diagonais. Uma direção inteiramente vazia não satisfaz uma pista.",
      "Toda peça colocada precisa ser vista por pelo menos dois observadores. Observadores em lados opostos contam separadamente. Uma borda sem observador não fornece informação nem conta como visão."
    ],
    "purpose": "Praticar visibilidade, exclusão de posições e uso de um estoque global.",
    "why": "Uma forma pode atender a vários olhares. O estoque e as oclusões permitem transformar pistas das bordas em decisões no interior."
  },
  "renovo": {
    "name": "RENOVO",
    "description": "Una cada semente a uma folha por um botão, formando trios que dobram uma vez e não se cruzam.",
    "summary": "Toque em duas peças alinhadas para ligar ou retirar um trecho. Cada botão precisa de uma semente e uma folha em direções perpendiculares.",
    "rules": [
      "Ligue cada botão a uma semente e a uma folha. Use todas as peças uma única vez.",
      "As duas ligações de cada botão devem formar um ângulo reto. Cada trecho é horizontal ou vertical e termina na primeira peça encontrada naquela direção.",
      "As linhas não podem cruzar, se sobrepor nem atravessar outra peça. Só os dois trechos do mesmo trio se encontram, em seu botão."
    ],
    "purpose": "Praticar associação de parceiros e leitura de conflitos geométricos.",
    "why": "Uma ligação pode consumir o parceiro de outro botão ou bloquear seu trecho. As escolhas simples precisam coexistir sem cruzamento."
  }
});

export const LOGIC_GUIDANCE = Object.freeze({
  "divisa": "Escolha uma letra e toque nas casas. Compare os contatos com as cotas e preserve a conexão de cada território.",
  "pulso": "Marque batidas e casas vazias. Compare o espaçamento de cada linha com as cotas das colunas.",
  "foz": "Toque em um ponto para escolher sua seta ou use uma direção na barra. A foz não recebe seta.",
  "refugio": "Marque casas livres ou barreiras. Acompanhe quais regiões cada barreira separa.",
  "mirante": "Escolha uma forma ou uma casa vazia. Cruze os olhares das bordas e acompanhe o estoque.",
  "renovo": "Toque em duas peças alinhadas para ligar ou retirar um trecho. Cada botão precisa de uma semente e uma folha em direções perpendiculares."
});
