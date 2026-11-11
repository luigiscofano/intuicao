const frame = document.querySelector('iframe');
const output = document.getElementById('results');
const selection = document.getElementById('game');
const allGames = [
  'light', 'cut', 'elo', 'prumo', 'pacto', 'sintonia', 'repasse', 'orbita',
  'divisa', 'pulso', 'foz', 'refugio', 'mirante', 'renovo',
];
const requestedGames = new URLSearchParams(location.search).get('games');
const games = requestedGames
  ? requestedGames.split(',').filter(game => allGames.includes(game))
  : allGames;
const prefixes = {
  light: '', cut: '', elo: 'c', prumo: 'c', pacto: 'c', sintonia: 's',
  repasse: 'r', orbita: 'o', divisa: 'lg', pulso: 'lg', foz: 'lg',
  refugio: 'lg', mirante: 'lg', renovo: 'lg',
};
const sizes = [[320, 568], [360, 640], [390, 844], [1024, 768]];
const pause = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const isVisible = element => element && !element.closest('[hidden]') && element.getClientRects().length;

selection.innerHTML = games.map(game => `<option>${game}</option>`).join('');

async function until(lookup) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const value = lookup();
    if (value) return value;
    await pause(50);
  }
  throw new Error('Interface não ficou pronta');
}

async function loadGame(game) {
  // A navegação real mantém o mesmo caminho utilizado por quem joga.
  frame.src = `../../dist/index.html?game=${game}`;
  await new Promise(resolve => { frame.onload = resolve; });
  const document = frame.contentDocument;
  const prefix = prefixes[game];
  const hostId = prefix === '' ? 'selection'
    : prefix === 'c' ? 'collection'
    : prefix === 'lg' ? 'logic-games' : game;
  const host = await until(() => {
    const element = document.getElementById(hostId);
    return isVisible(element) && element;
  });
  const levelSelector = [
    '[data-level]', '[data-new-level]', '[data-s-level]',
    '[data-r-level]', '[data-o-level]', '[data-level-id]',
  ].join(',');
  const entry = await until(() => [...host.querySelectorAll(levelSelector)].find(isVisible));
  entry.click();
  await until(() => document.querySelector('.approved-game-section .approved-action-panel'));
  await pause(150);
}

function measureGame(document, game, width, height) {
  const prefix = prefixes[game];
  const controlId = action => `${prefix ? `${prefix}-` : ''}${action === 'reset' && prefix === 'lg' ? 'restart' : action}`;
  const failures = [];
  const buttons = [];
  const view = document.defaultView;
  if (!view.location.search.includes(`game=${game}`)) failures.push('rota inesperada');
  if (!document.body.classList.contains('approved-campaign-actions')) failures.push('gate ausente');
  const actions = ['confirm', ...(prefix === 'c' ? ['check'] : []), 'undo', 'redo', 'reset'];

  for (const action of actions) {
    const id = controlId(action);
    const button = document.getElementById(id);
    if (!button) {
      failures.push(`${id} ausente`);
      continue;
    }
    const style = view.getComputedStyle(button);
    const iconStyle = view.getComputedStyle(button, '::before');
    const bounds = button.getBoundingClientRect();
    if (['s', 'r', 'o'].includes(prefix) && action === 'confirm') {
      if (!button.hidden || style.display !== 'none') failures.push(`${id} deve ficar oculto`);
      continue;
    }
    if (button.closest('[hidden]')) {
      failures.push(`${id} oculto indevidamente`);
      continue;
    }
    if (bounds.height < 45.8) failures.push(`${id} alvo baixo`);
    if (bounds.left < -1 || bounds.right > width + 1) failures.push(`${id} fora da tela`);
    if (!iconStyle.maskImage.includes('svg') && !iconStyle.webkitMaskImage?.includes('svg')) {
      failures.push(`${id} ícone ausente`);
    }
    if (iconStyle.pointerEvents !== 'none') failures.push(`${id} ícone intercepta clique`);
    buttons.push({
      id, label: button.getAttribute('aria-label') || button.textContent.trim(),
      disabled: button.disabled, height: Math.round(bounds.height),
      width: Math.round(bounds.width), background: style.backgroundColor, icon: iconStyle.width,
    });
  }
  if (document.documentElement.scrollWidth > width + 1) failures.push('overflow da página');
  return { game, w: width, h: height, pass: failures.length === 0, failure: failures, buttons };
}

function showResults(results, done = false) {
  output.textContent = JSON.stringify({
    done, count: results.length, failures: results.filter(result => !result.pass),
    ...(done ? { results } : {}),
  }, null, 2);
}

for (const button of document.querySelectorAll('button[data-w]')) {
  button.onclick = () => {
    frame.width = button.dataset.w;
    frame.height = button.dataset.h;
  };
}

document.getElementById('open').onclick = async () => {
  output.textContent = 'Abrindo…';
  await loadGame(selection.value);
  output.textContent = 'Jogo pronto para interação manual.';
};

document.getElementById('run').onclick = async () => {
  const results = [];
  output.textContent = 'Testando…';
  for (const game of games) {
    try {
      await loadGame(game);
      for (const [width, height] of sizes) {
        frame.width = width;
        frame.height = height;
        await pause(180);
        // Leia o documento atual: uma navegação anterior pode ter sido descartada.
        results.push(measureGame(frame.contentDocument, game, width, height));
        showResults(results);
      }
    } catch (error) {
      results.push({ game, pass: false, error: error.message });
    }
  }
  showResults(results, true);
};
