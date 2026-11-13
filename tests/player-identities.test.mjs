import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PLAYER_ANIMALS, gamePlayerName, playerAvatar} from '../dist/versus/player-identities.mjs';
import {ANIMAL_SPRITES, ANIMAL_NAMES} from '../dist/sintonia/animal-roster.mjs';

for (const [game, animals] of Object.entries(PLAYER_ANIMALS)) {
 test(`${game}: usa dois sprites reais do Sintonia e nomes estáveis`, () => {
  assert.equal(new Set(animals).size, 2);
  animals.forEach((animal,p) => {
   assert.ok(ANIMAL_SPRITES[animal]);
   assert.equal(gamePlayerName(game,p), `Jogador ${p+1}`);
   const html=playerAvatar(game,p);
   assert.ok(html.includes(ANIMAL_NAMES[animal]));
   assert.ok(html.includes(ANIMAL_SPRITES[animal].url));
   assert.ok(html.includes('role="img"'));
  });
 });
}
test('cada jogo recebe uma dupla própria e Estalo mantém a ordem solicitada',()=>{
 assert.equal(new Set(Object.values(PLAYER_ANIMALS).flat()).size,10);
 assert.deepEqual(PLAYER_ANIMALS.estalo,['piranha','coral']);
});
test('não muda identidade dos jogos fora do pedido',()=>{
 assert.equal(gamePlayerName('desvio',0),'Verde');
 assert.equal(gamePlayerName('desvio',1),'Âmbar');
 assert.equal(playerAvatar('desvio',0),'');
});
for (const game of ['acorde','dobra','estalo','quinhao']) {
 test(`${game}: nomes corretos no tabuleiro, avisos e prévia sem alterar estado`, async()=>{
  const engine=await import(`../dist/versus/games/${game}/engine.mjs`);
  const view=await import(`../dist/versus/games/${game}/view.mjs`);
  const state=engine.createState();
  const before=JSON.stringify(state);
  assert.match(view.getStatus(state), /Jogador/);
  const board=view.renderBoard(state);
  assert.ok(!board.includes('>Verde<') && !board.includes('>Âmbar<'));
  const move=engine.getLegalMoves(state)[0];
  const next=engine.applyMove(state,move);
  assert.match(view.describeMove(state,move,next), /Jogador|[A-F][1-6]/);
  assert.equal(JSON.stringify(state),before);
 });
}
test('Broto usa âmbar, não roxo; sprites e placar não mudam regras',async()=>{
 const css=await readFile(new URL('../dist/broto/ui.css',import.meta.url),'utf8');
 assert.match(css.replace(/\s+/g, ""),/\.b-owner-1\{--b-ink:#705a1d;--b-soft:#f5e7b2/);
 assert.ok(!css.includes('#76529b'));
});
