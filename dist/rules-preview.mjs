import { RULE_EXAMPLES } from './rules-examples.mjs';
import { GAME_INFO } from './game-info-content.mjs';
import { QUICK_START } from './rules-quick-start.mjs';

const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const descriptions = {
 light: 'O raio sai da fonte, encontra o espelho inclinado e muda de direção até o alvo da mesma cor e símbolo.',
 cut: 'Antes, o lado roxo ocupa 25% do retângulo. Mover o corte ao centro deixa 50%, a meta deste exemplo.',
 elo: 'Quatro pontos, um em cada região, se alinham em um retângulo: cada um tem duas ligações e juntos formam um único circuito.',
 prumo: 'Duas casas pesam à esquerda de um apoio no centro da segunda casa. Uma casa à direita equilibra as distâncias.',
 pacto: 'Um círculo ao lado de outro forma uma dupla. Cada um toca exatamente um igual pelos lados.',
 sintonia: 'O mesmo comando para a direita move o animal de cima uma casa; o de baixo fica onde está porque há uma parede à direita.',
 repasse: 'Retirar a peça de valor 2 com seta para a direita soma 2 à primeira peça naquela direção: o valor 3 passa a 5.',
 orbita: 'Um giro horário move os quatro símbolos juntos uma casa no anel. As casas permanecem nas mesmas posições.',
 desvio: 'Escolher a casa central com seta horizontal a consome. O rival pode escolher as duas casas restantes da mesma linha.',
 broto: 'Um broto já estimulado na horizontal recebe estímulo vertical da semente plantada abaixo. Floresce, dá um ponto a seu dono e sai; a nova semente fica.',
 cerco: 'Na abertura, a peça verde de linha 1, coluna 3 avança para linha 2, coluna 3. A origem vira barreira e as seis peças continuam no tabuleiro.',
};

// Um toque visual destaca onde acontece a ação, sem simular entrada no jogo.
const ACTION_POINTS = {
 light:[112,96], cut:[37,70], elo:[148,93], prumo:[207,63], pacto:[198,65],
 sintonia:[120,72], repasse:[34,65], pulso:[88,63], foz:[75,65], refugio:[54,63],
 mirante:[54,63], renovo:[73,89], desvio:[58,66], broto:[54,81], cerco:[54,51],
 enlace:[26,62], mosaico:[70,79], quinhao:[83,57], estalo:[26.5,38.5], dobra:[25,35], acorde:[45.5,56.5]
};
export function explanatorySvg(game, svg) {
 const point = ACTION_POINTS[game];
 if (!point) return svg;
 const [x,y] = point;
 return svg.replace(/<\/svg>$/, `<g class="rp-tap" transform="translate(${x} ${y})"><circle class="rp-tap-ring" r="10" fill="none" stroke="#244b63" stroke-width="2"/><circle r="2.5" fill="#244b63"/></g></svg>`);
}

export function rulesPreviewMarkup(game) {
 const example = RULE_EXAMPLES[game];
 const info = GAME_INFO[game];
 if (!example || !info) return '';
 const quick = QUICK_START[game];
 const name = escape(info.name);
 const steps = quick?.steps || example.steps;
 // O disclosure troca somente o texto: o SVG continua montado e o loop não reinicia.
 const details = info.rules?.length ? `<details class="rp-details"><summary>Regras completas e detalhes</summary><ul>${info.rules.map(rule => `<li>${escape(rule)}</li>`).join('')}</ul></details>` : '';
 return `<section class="rules-preview" data-rules-game="${escape(game)}" aria-label="Como jogar ${name}"><div class="rp-copy"><h3>Como jogar</h3><div class="rp-quick"><p class="rp-goal"><strong>Objetivo:</strong> ${escape(quick?.goal || info.summary)}</p><ol>${steps.map(step => `<li>${escape(step)}</li>`).join('')}</ol></div>${details}</div><figure class="rp-illustration"><div class="rp-example-title">Veja um exemplo</div><div class="rp-example" aria-hidden="true">${explanatorySvg(game, example.svg)}</div><figcaption class="rp-description">${escape(quick?.example || example.description || descriptions[game])}</figcaption><span class="rp-reduced-note">Exemplo estático · movimento reduzido</span></figure></section>`;
}

const instances = new WeakMap();
// A ilustração repete automaticamente enquanto visível, sem tocar na partida.
export function initRulesPreviews(doc = globalThis.document, win = doc?.defaultView) {
 const root = doc?.getElementById('main');
 if (!root) return () => {};
 if (instances.has(doc)) return instances.get(doc);
 const panels = new Set();
 const visible = new WeakSet();
 const sync = panel => panel.classList.toggle('rp-playing', visible.has(panel) && !doc.hidden);
 const observer = win?.IntersectionObserver ? new win.IntersectionObserver(entries => {
  for (const entry of entries) {
   if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
   sync(entry.target);
  }
 }, { threshold: .05 }) : null;
 const eachPanel = (node, callback) => {
  if (node.nodeType !== 1) return;
  if (node.matches?.('.rules-preview')) callback(node);
  node.querySelectorAll?.('.rules-preview').forEach(callback);
 };
 const watch = panel => {
  if (panels.has(panel)) return;
  panels.add(panel);
  if (observer) observer.observe(panel); else { visible.add(panel); sync(panel); }
 };
 const remove = panel => { panels.delete(panel); visible.delete(panel); observer?.unobserve(panel); };
 const pageVisibility = () => panels.forEach(sync);
 eachPanel(root, watch);
 const mutations = win?.MutationObserver ? new win.MutationObserver(records => {
  for (const record of records) {
   for (const node of record.removedNodes) eachPanel(node, remove);
   for (const node of record.addedNodes) eachPanel(node, watch);
  }
 }) : null;
 mutations?.observe(root, { childList: true, subtree: true });
 doc.addEventListener('visibilitychange', pageVisibility);
 const cleanup = () => {
  observer?.disconnect(); mutations?.disconnect();
  doc.removeEventListener('visibilitychange', pageVisibility);
  panels.forEach(panel => panel.classList.remove('rp-playing'));
  panels.clear(); instances.delete(doc);
 };
 instances.set(doc, cleanup);
 return cleanup;
}
if (typeof document !== 'undefined') {
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initRulesPreviews(), { once: true });
 else initRulesPreviews();
}
