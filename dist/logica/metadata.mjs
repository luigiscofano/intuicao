// Metadados pequenos: a biblioteca não carrega motores nem campanhas ao listar jogos.
export const LOGIC_GAMES = Object.freeze([
  { id: 'divisa', name: 'DIVISA', number: '12', description: 'Reparta o terreno. Faça cada fronteira caber.', headline: 'Observe as fronteiras.\nEncontre os territórios.' },
  { id: 'pulso', name: 'PULSO', number: '13', description: 'Encontre o ritmo que faz todas as colunas concordarem.', headline: 'Encontre o intervalo.\nComplete o ritmo.' },
  { id: 'foz', name: 'FOZ', number: '14', description: 'Oriente os canais para que todos os caminhos cheguem à foz.', headline: 'Leia as distâncias.\nEncontre a foz.' },
  { id: 'refugio', name: 'REFÚGIO', number: '15', description: 'Separe os espaços. Dê um lugar a cada marco.', headline: 'Observe as passagens.\nEncontre cada refúgio.' },
  { id: 'mirante', name: 'MIRANTE', number: '16', description: 'Cruze os olhares para descobrir onde cada forma pode ficar.', headline: 'Cruze os olhares.\nDescubra as posições.' },
  { id: 'renovo', name: 'RENOVO', number: '17', description: 'Ligue semente, botão e folha sem cruzar os caminhos.', headline: 'Encontre os parceiros.\nComplete cada renovo.' },
]);

export const LOGIC_GAME_IDS = Object.freeze(LOGIC_GAMES.map(({ id }) => id));
export const DIFFICULTIES = Object.freeze(['Básico', 'Aprendiz', 'Intermediário', 'Avançado', 'Mestre', 'Modo Sábio']);
export const CAMPAIGN_SIZE = 80;

export function campaignDifficulty(number) {
  return Math.min(5, Math.floor((number - 1) / 15));
}

const loaders = {
  divisa: () => import('./games/divisa/index.mjs'),
  pulso: () => import('./games/pulso/index.mjs'),
  foz: () => import('./games/foz/index.mjs'),
  refugio: () => import('./games/refugio/index.mjs'),
  mirante: () => import('./games/mirante/index.mjs'),
  renovo: () => import('./games/renovo/index.mjs'),
};

export function loadLogicGame(id) {
  if (!Object.hasOwn(loaders, id)) return Promise.reject(new Error('Jogo desconhecido.'));
  return loaders[id]();
}

export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}
