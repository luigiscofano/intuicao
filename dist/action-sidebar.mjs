/** A lateral é somente apresentação: move os controles nativos, nunca os clona.
 * Regras, progresso, confirmação e estados hidden/disabled pertencem aos jogos. */
function move(node, parent) {
  if (node && node.parentElement !== parent) parent.append(node);
}

function slot(doc, parent, name, before = null) {
  let node = parent.querySelector(`.${name}`);
  if (!node) {
    node = doc.createElement('div');
    node.className = name;
    parent.insertBefore(node, before);
  }
  return node;
}

function identify(node, action, label) {
  if (!node) return;
  node.setAttribute('data-sidebar-action', action);
  node.setAttribute('aria-label', label);
  // Mantém atalhos já documentados; garante dica nos controles apenas com seta.
  if ((action === 'undo' || action === 'redo') && !node.getAttribute('title')) {
    node.setAttribute('title', label);
  }
}

export function arrangeActionSidebar({ doc, section, panel, control, game, versus }) {
  panel.classList.add('action-sidebar');
  panel.setAttribute('aria-label', 'Ações do jogo');
  const actions = panel.querySelector('.approved-real-actions');
  actions.classList.add('sidebar-actions');
  const primary = panel.querySelector('.approved-primary-action');
  const secondary = panel.querySelector('.approved-secondary-actions');
  const restartSlot = slot(doc, actions, 'approved-restart-action', secondary);
  const helpSlot = slot(doc, actions, 'sidebar-help', secondary);

  // Versus mantém confirmar + cancelar juntos e a instrução de segundo clique.
  // O grupo inteiro sai da região inert do tabuleiro; os handlers originais decidem
  // quando cada ação fica habilitada (inclusive contra o computador).
  const confirm = control('confirm');
  if (versus && confirm) {
    const group = confirm.closest('.board-check-controls');
    if (group) move(group, primary);
    else move(confirm, primary);
  }
  identify(confirm, 'confirm', versus ? 'Confirmar jogada' : game === 'light' ? 'Confirmar todos' : 'Confirmar resposta');
  identify(control('undo'), 'undo', 'Desfazer');
  identify(control('redo'), 'redo', 'Refazer');
  const restart = control('restart') || control('reset');
  identify(restart, 'restart', game === 'broto' ? 'Reiniciar rodada' : 'Reiniciar');
  move(restart, restartSlot);
  identify(control('cancel'), 'cancel', 'Cancelar prévia');

  // O reinício sempre antecede a ajuda, inclusive nos modos que não o permitem.
  move(restartSlot, actions);
  if (restartSlot.nextSibling !== helpSlot) actions.insertBefore(restartSlot, helpSlot);

  const nativeRules = game === 'light' || game === 'cut'
    ? doc.getElementById('original-rules-panel') : control('rules-panel');
  if (nativeRules) {
    move(nativeRules, helpSlot);
    identify(nativeRules.querySelector('summary'), 'help', 'Como jogar');
  } else {
    const rules = section.querySelector('.logic-rules, .nv-rules');
    if (rules && !helpSlot.querySelector('button')) {
      if (!rules.id) rules.id = `sidebar-rules-${game}`;
      const isDetails = rules.tagName?.toLowerCase() === 'details';
      if (isDetails) rules.open = false;
      else rules.hidden = true;
      const button = doc.createElement('button');
      button.type = 'button';
      button.textContent = 'Como jogar';
      identify(button, 'help', 'Como jogar');
      button.setAttribute('aria-controls', rules.id);
      button.setAttribute('aria-expanded', 'false');
      button.addEventListener('click', () => {
        const opening = isDetails ? !rules.open : rules.hidden;
        if (isDetails) rules.open = opening;
        else rules.hidden = !opening;
        button.setAttribute('aria-expanded', String(opening));
        if (opening) rules.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      });
      if (isDetails) rules.addEventListener('toggle', () =>
        button.setAttribute('aria-expanded', String(rules.open)));
      helpSlot.append(button);
    }
  }
  // Ferramentas específicas continuam disponíveis depois das quatro ações básicas.
  // A confirmação automática não passa a exigir botão; hidden tem precedência.
  if (!panel.querySelector('.sidebar-signature')) {
    const signature = doc.createElement('div');
    signature.className = 'sidebar-signature';
    signature.setAttribute('aria-hidden', 'true');
    for (let index = 0; index < 4; index++) signature.append(doc.createElement('span'));
    panel.append(signature);
  }
}
