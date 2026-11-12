import test from 'node:test';
import assert from 'node:assert/strict';
import { isNearAchievement, newestUnlocksFirst, recommendAchievements } from '../dist/achievements/discovery.mjs';
import { filterAchievements, renderAchievementView } from '../dist/achievements/view.mjs';

const mission = (id, fields = {}) => ({ id, name: id, description: 'Condição real.', gameId: 'elo', gameName: 'ELO', gameIds: ['elo'], games: [{ id: 'elo', name: 'ELO' }], current: 0, target: 1, unlocked: false, ...fields });
const data = missions => ({ missions, achievements: [], games: [{ id: 'elo', name: 'ELO', completed: 1, total: 80 }], total: 1, available: 80, warnings: [] });

test('Quase lá exige contagem comprovada e metade da meta; não estima condições binárias', () => {
  assert.equal(isNearAchievement(mission('binary')), false);
  assert.equal(isNearAchievement(mission('new', { current: 0, target: 3 })), false);
  assert.equal(isNearAchievement(mission('started', { current: 1, target: 3 })), false);
  assert.equal(isNearAchievement(mission('near', { current: 2, target: 3 })), true);
  assert.equal(isNearAchievement(mission('done', { current: 3, target: 3, unlocked: true })), false);
  assert.equal(isNearAchievement(mission('invalid', { current: NaN, target: 3 })), false);
});

test('filtro Quase lá combina jogo e proporção sem alterar os dados', () => {
  const d = data([mission('two', { current: 2, target: 3 }), mission('nine', { current: 9, target: 10 }), mission('none'), mission('another', { gameId: 'refugio', gameIds: ['refugio'], current: 2, target: 3 })]);
  const before = structuredClone(d);
  assert.deepEqual(filterAchievements(d, { kind: 'missions', gameId: 'elo', status: 'near' }).map(x => x.id), ['nine', 'two']);
  assert.deepEqual(d, before);
});

test('conquistadas usam data registrada; antigas sem data ficam no fim em ordem estável', () => {
  const entries = [mission('old-save', { unlocked: true }), mission('earlier', { unlocked: true, unlockedAt: '2026-10-01T10:00:00Z' }), mission('newer', { unlocked: true, unlockedAt: '2026-11-01T10:00:00Z' }), mission('invalid-date', { unlocked: true, unlockedAt: 'unknown' })];
  assert.deepEqual(newestUnlocksFirst(entries).map(x => x.id), ['newer', 'earlier', 'old-save', 'invalid-date']);
  assert.deepEqual(filterAchievements(data(entries), { kind: 'missions', status: 'unlocked', gameId: 'all' }).map(x => x.id), ['newer', 'earlier', 'old-save', 'invalid-date']);
});

test('recomendações priorizam evidência parcial, respeitam seleção e não mudam critérios', () => {
  const d = data([mission('start'), mission('partial', { current: 2, target: 3 }), mission('won', { unlocked: true }), mission('another', { gameId: 'refugio', gameIds: ['refugio'] })]);
  const before = structuredClone(d);
  assert.deepEqual(recommendAchievements(d, { kind: 'missions', gameId: 'elo' }).map(x => x.id), ['partial', 'start']);
  assert.deepEqual(d, before);
});

test('primeira tela mostra até três recomendações e coleção completa recolhível', () => {
  const container = { innerHTML: '' };
  renderAchievementView(container, data(Array.from({ length: 8 }, (_, i) => mission(`mission-${i}`))));
  assert.equal((container.innerHTML.match(/class="achievement-discovery-card"/g) ?? []).length, 3);
  assert.match(container.innerHTML, /<details class="achievement-full-collection" >/);
  assert.match(container.innerHTML, /value="near"/);
  assert.match(container.innerHTML, /não estimativas de progresso/);
  assert.equal((container.innerHTML.match(/data-achievement-id=/g) ?? []).length, 8);
});

test('datas são exibidas honestamente sem atribuir a data de abertura da tela', () => {
  const container = { innerHTML: '' };
  renderAchievementView(container, data([mission('old', { unlocked: true }), mission('dated', { unlocked: true, unlockedAt: '2026-11-01T10:00:00Z' })]));
  assert.match(container.innerHTML, /Data não registrada no progresso antigo/);
  assert.match(container.innerHTML, /datetime="2026-11-01T10:00:00.000Z"/);
});
