import { RULE_EXAMPLES } from './rules-examples.mjs';
import { GAME_INFO } from './game-info-content.mjs';

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

export function rulesPreviewMarkup(game) {
 const example = RULE_EXAMPLES[game];
 if (!example || !GAME_INFO[game]) return '';
 const name = escape(GAME_INFO[game].name);
 return `<section class="rules-preview" data-rules-game="${escape(game)}" aria-label="Como jogar ${name}"><div class="rp-copy"><h3>Como jogar</h3><ol>${example.steps.map(step => `<li>${escape(step)}</li>`).join('')}</ol><p class="rp-note">Exemplo ilustrativo. Não altera a partida. Confira também as pistas e os controles do jogo.</p></div><figure class="rp-illustration"><div class="rp-example" aria-hidden="true">${example.svg}</div><figcaption class="rp-description">${escape(example.description || descriptions[game])}</figcaption><button type="button" class="rp-motion-toggle" aria-pressed="false" aria-label="Pausar exemplo de ${name}">Pausar exemplo</button><span class="rp-reduced-note">Exemplo estático · movimento reduzido</span></figure></section>`;
}

const instances = new WeakMap();
// A ilustração repete só enquanto visível. Pausar nunca toca em dados de partida.
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
 const click = event => {
  const button = event.target.closest?.('.rp-motion-toggle');
  if (!button || !root.contains(button)) return;
  const panel = button.closest('.rules-preview');
  const paused = panel.classList.toggle('rp-paused');
  button.setAttribute('aria-pressed', String(paused));
  button.textContent = paused ? 'Retomar exemplo' : 'Pausar exemplo';
  button.setAttribute('aria-label', `${paused ? 'Retomar' : 'Pausar'} exemplo de ${GAME_INFO[panel.dataset.rulesGame]?.name || ''}`);
 };
 const pageVisibility = () => panels.forEach(sync);
 eachPanel(root, watch);
 const mutations = win?.MutationObserver ? new win.MutationObserver(records => {
  for (const record of records) {
   for (const node of record.removedNodes) eachPanel(node, remove);
   for (const node of record.addedNodes) eachPanel(node, watch);
  }
 }) : null;
 mutations?.observe(root, { childList: true, subtree: true });
 root.addEventListener('click', click);
 doc.addEventListener('visibilitychange', pageVisibility);
 const cleanup = () => {
  observer?.disconnect(); mutations?.disconnect();
  root.removeEventListener('click', click); doc.removeEventListener('visibilitychange', pageVisibility);
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
