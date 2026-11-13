// Regras contextualizadas pelos metadados públicos da fase selecionada.
import { isFaunaShape } from './cut-fauna-geometry.mjs';
/** Contextual rules from public puzzle metadata only.
 * This module is deliberately stateless: callers choose when a round starts,
 * retain the player's toggle during that round, and may suppress already-seen
 * configuration mechanics in an Endless/custom session. No answer is read. */
import { eloActiveMechanics } from './elo-presentation.mjs';

const BASE = {
  light:
    'Gire os espelhos para levar cada luz ao alvo da mesma cor e símbolo. As posições dos espelhos e das paredes são fixas. Dispare pela fonte ou confirme todos os raios.',
  cut: 'Deixe a porcentagem pedida da área preenchida no lado roxo. A tolerância é de 3 pontos percentuais, para mais ou para menos. Deslize o corte para ajustar a divisão; os controles indicam quais movimentos estão disponíveis.',
  elo: 'Coloque um ponto em cada região. Os pontos mais próximos na mesma linha ou coluna se ligam automaticamente. Cada ponto precisa de duas ligações em um único circuito, sem cruzamentos. Fronteiras de regiões não bloqueiam a visão; pistas fixas não podem ser movidas.',
  prumo:
    'Pinte todas as casas em peças conectadas pelos lados, sem sobreposição. Cada peça contém um apoio e seu centro de massa deve coincidir com ele nos dois eixos. Todas as casas têm massa 1; uma peça não precisa ser simétrica.',
  pacto:
    'Complete a grade com círculo, quadrado, triângulo e losango. Cada linha e coluna deve ter exatamente dois de cada símbolo. Cada casa toca exatamente uma igual pelos lados: diagonais não contam e trios não são permitidos. As pistas iniciais permanecem fixas.',
  desvio:
    'Escolha uma casa disponível e confirme. A seta horizontal manda o adversário para a mesma linha; a vertical, para a mesma coluna. A casa usada fica marcada e não pode ser escolhida novamente. Quem ficar sem jogada legal perde. Casas já usadas não bloqueiam o caminho até outra casa disponível.',
};
const TEXT = {
  walls:
    'Paredes bloqueiam e absorvem a luz. Gire os espelhos para contornar os obstáculos; as bordas do palco também bloqueiam o raio.',
  multipleSources:
    'Cada cor deve alcançar seu próprio alvo. Trajetórias de cores diferentes não podem se cruzar nem se tocar, mesmo em disparos separados. Clique em cada fonte ou use Confirmar todos; editar os ajustes limpa todos os raios.',
  threeSources:
    'Agora há três fontes: todas precisam chegar aos alvos correspondentes, sem cruzar nem tocar as trajetórias das outras cores.',
  portals:
    'Portais com a mesma letra formam um par. A luz entra em um e sai do outro mantendo a direção. O portal branco aceita qualquer cor. O salto entre o par não é um trecho físico de luz e não colide com outros raios.',
  selectivePortals:
    'Os símbolos coloridos do portal indicam as cores permitidas. Uma cor incompatível é bloqueada. A luz só atravessa se os dois portais do par aceitarem sua cor; a direção de saída é a mesma da entrada.',
  holes:
    'Espaços vazios não pertencem à área da figura. Conte apenas a parte preenchida, tanto para a área roxa quanto para a área total, mesmo quando o corte atravessa um vazio.',
  'family:Reta':
    'O corte é uma reta. Deslize-o para mudar a quantidade de área que fica no lado roxo.',
  'family:Parábola':
    'O corte agora é uma parábola, com uma curva em forma de arco. A meta continua sendo uma porcentagem da área preenchida, não do comprimento do contorno.',
  'family:Seno':
    'O corte agora é uma onda senoidal. As diferentes partes da onda dividem a figura ao mesmo tempo; observe a área roxa total.',
  'family:Cúbica':
    'O corte agora tem uma curva em S. Mesmo com trechos inclinados em sentidos diferentes, conta a soma de toda a área roxa preenchida.',
  'family:Cosseno':
    'O corte agora é uma onda cossenoidal. Ela muda a forma da divisão, mas a meta continua usando a área roxa útil sobre a área preenchida total.',
  'family:Dupla curva':
    'O corte agora tem uma dupla curva. Considere todos os trechos da divisão juntos; vazios, quando houver, continuam fora da conta.',
  'shape-turn':
    'A marca ∟ pertence à região, não a uma casa. O ponto dessa região precisa de duas ligações perpendiculares; sua posição continua à sua escolha.',
  'shape-straight':
    'A marca ↔ pertence à região, não a uma casa. O ponto dessa região precisa de duas ligações em direções opostas, seguindo em linha reta; sua posição continua à sua escolha.',
  passages:
    'O círculo ○ marca uma passagem obrigatória: o centro da casa deve ser atravessado pelo interior de uma ligação. A casa não recebe ponto, não interrompe a visão e não cria ligações.',
  forbiddenEdges:
    'O traço ⊣ marca um intervalo vedado entre casas vizinhas. Nenhuma ligação final pode percorrê-lo. Uma ligação automática que o atravessa ainda aparece, mas viola a pista.',
  counts:
    'As pistas de linha e coluna exigem exatamente a quantidade indicada de pontos, incluindo os fixos. Um segmento que atravessa a linha ou coluna sem ter ponto nela não conta.',
  distances:
    'O número Σ de uma região é a soma dos comprimentos das duas ligações do seu ponto, medida em intervalos entre centros. Ele não determina a casa do ponto.',
  neighbors:
    'Um par de regiões indicado por A—B precisa ter seus pontos ligados diretamente. Um ponto intermediário interrompe essa ligação e não satisfaz a pista.',
  order:
    'Os marcos numerados indicam a ordem de visita ao percorrer o circuito, permitindo outras regiões entre eles. Qualquer ponto de início e os dois sentidos valem. Não é a ordem de colocar os pontos.',
  cuts: 'A linha tracejada é uma referência entre linhas ou colunas. Exatamente a quantidade indicada de ligações deve cruzá-la; ela não bloqueia nenhuma ligação.',
  exclusivePassages:
    'Os losangos ◇ com a mesma identificação formam um grupo. Exatamente uma casa de cada grupo deve ser atravessada pelo interior de uma ligação; as outras ficam sem ligação no centro. Nenhuma dessas casas recebe ponto.',
  betweenSupports:
    'Um apoio entre duas casas pertence às duas: ambas fazem parte da peça desse apoio. Elas são protegidas, assim como as casas com apoio no centro.',
  restrictedStart:
    'Este mapa começa com um destino já definido. Na primeira jogada desta posição, escolha uma casa disponível da linha ou coluna indicada; depois siga as setas normalmente.',
  consumedStart:
    'Este mapa já começa com algumas casas consumidas. Elas não podem ser escolhidas, mas não impedem o acesso a outras casas disponíveis na mesma linha ou coluna.',
};
const objectValues = (x) => (x && typeof x === 'object' ? Object.values(x) : []);

/** Stable identifiers for mechanics actually present, never difficulty bands,
 * board dimensions, coordinates, a stored solution, or mutable player input. */
export function rulesMechanics(game, level = {}) {
  if (!Object.hasOwn(BASE, game)) return [];
  const active = ['base'];
  if (game === 'light') {
    if (level.objects?.some((o) => o.type === 'wall')) active.push('walls');
    if (level.sources?.length > 1) active.push('multipleSources');
    if (level.sources?.length > 2) active.push('threeSources');
    if (level.portals?.length) active.push('portals');
    if (level.portals?.some((p) => p.colors != null)) active.push('selectivePortals');
  } else if (game === 'cut') {
    const family = `family:${level.family ?? 'Reta'}`;
    if (Object.hasOwn(TEXT, family)) active.push(family);
    if (level.holes?.length || isFaunaShape(level.shape)) active.push('holes');
  } else if (game === 'elo') {
    // Curves arrive at 21, straight clues at 22: one family is not one debut.
    const shapes = objectValues(level.constraints?.shapes);
    if (shapes.includes('turn')) active.push('shape-turn');
    if (shapes.includes('straight')) active.push('shape-straight');
    active.push(...eloActiveMechanics(level).filter((key) => key !== 'shapes'));
  } else if (game === 'prumo') {
    if (level.supports?.some((p) => p.x2 % 2 !== 0 || p.y2 % 2 !== 0))
      active.push('betweenSupports');
  } else if (game === 'desvio') {
    if (level.initialRestriction) active.push('restrictedStart');
    if (
      Number.isInteger(level.initialAvailable) &&
      level.initialAvailable !== 2 ** (level.rows * level.cols) - 1
    )
      active.push('consumedStart');
  }
  return active;
}

function campaignIndex(level, catalogue, index) {
  if (!Array.isArray(catalogue) || !catalogue.length) return -1;
  // An explicit catalogue identity wins over stale selection/progression state.
  if (level.id != null) {
    const found = catalogue.findIndex((item) => item.id === level.id);
    if (found >= 0) return found;
    return -1;
  }
  const found = catalogue.indexOf(level);
  if (found >= 0) return found;
  return Number.isInteger(index) && index >= 0 && index < catalogue.length ? index : -1;
}

/** Returns plain text for rendering alongside the existing basic rule panel.
 * Campaign/daily: first appearance against the entire preceding catalogue.
 * Tutorials: explain this instance and open. Custom/Endless: describe the actual
 * configuration without claiming it is a campaign introduction. Call once on
 * entry, not on render/edit. `mechanics` also supports session-only deduping. */
export function getRulesContext(game, level = {}, { catalogue, index, mode = 'campaign' } = {}) {
  const mechanics = rulesMechanics(game, level);
  if (!mechanics.length)
    return { autoOpen: false, title: '', text: '', mechanics: [], introduced: [] };
  const tutorial = mode === 'tutorial' || level.tutorial === true;
  const campaign = !tutorial && (mode === 'campaign' || mode === 'daily');
  const at = campaign ? campaignIndex(level, catalogue, index) : -1;
  let introduced = [];
  if (at >= 0) {
    const prior = new Set(catalogue.slice(0, at).flatMap((item) => rulesMechanics(game, item)));
    introduced = mechanics.filter((key) => !prior.has(key));
  }
  const configuration = !tutorial && (!campaign || at < 0);
  const autoOpen = tutorial || configuration || introduced.length > 0;
  const explained = tutorial || configuration || !introduced.length ? mechanics : introduced;
  const title = tutorial
    ? 'Regras do tutorial'
    : configuration
      ? 'Regras desta configuração'
      : introduced.length
        ? 'Nova ideia nesta fase'
        : 'Regras desta fase';
  const text = explained
    .map((key) => (key === 'base' ? BASE[game] : TEXT[key]))
    .filter(Boolean)
    .join(' ');
  return { autoOpen, title, text, mechanics, introduced };
}

