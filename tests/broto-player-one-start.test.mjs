// Testes e verificações de BROTO.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  createBroto,
  applyBrotoMove,
  legalBrotoMoves,
  nextBrotoRound,
  rematchBroto,
  resetBrotoRound,
  restoreBroto,
  serializeBroto,
  BROTO_MAPS,
} from '../dist/broto/engine.mjs';
const finish = (s) => {
  while (!s.roundOver) s = applyBrotoMove(s, legalBrotoMoves(s)[0]).state;
  return s;
};
test('all seven maps: new duel and every rematch start player1, second round player2', () => {
  for (const map of BROTO_MAPS) {
    let s = createBroto(0, map.id);
    for (let duel = 0; duel < 3; duel++) {
      assert.equal(s.player, 0);
      assert.equal(s.firstStarter, 0);
      assert.equal(s.starter, 0);
      assert.equal(s.mapId, map.id);
      assert.deepEqual(s.totals, [0, 0]);
      s = finish(s);
      s = nextBrotoRound(s);
      assert.equal(s.player, 1);
      assert.equal(s.starter, 1);
      assert.equal(s.firstStarter, 0);
      const moved = applyBrotoMove(s, legalBrotoMoves(s)[0]).state;
      assert.deepEqual(resetBrotoRound(moved), s);
      s = rematchBroto(finish(moved));
    }
  }
});
test('existing player2-first saves stay exact; only a new rematch adopts player1', () => {
  for (const map of BROTO_MAPS) {
    let s = createBroto(1, map.id);
    s = applyBrotoMove(s, legalBrotoMoves(s)[0]).state;
    const raw = serializeBroto(s);
    assert.equal(serializeBroto(restoreBroto(raw)), raw);
    assert.equal(resetBrotoRound(s).starter, 1);
    s = nextBrotoRound(finish(s));
    assert.equal(s.player, 0);
    const end = finish(s),
      endRaw = serializeBroto(end);
    assert.equal(serializeBroto(restoreBroto(endRaw)), endRaw);
    const rematch = rematchBroto(end);
    assert.equal(rematch.player, 0);
    assert.equal(rematch.firstStarter, 0);
    assert.equal(rematch.mapId, map.id);
    assert.deepEqual(end, restoreBroto(endRaw));
  }
});
test('local and competitive share explicit player1 initialization and honest result label', () => {
  const source = readFileSync(new URL('../dist/broto/ui.mjs', import.meta.url), 'utf8');
  assert(source.includes("mode=$('b-mode').value;state=createBroto(0,selectedMapId)"));
  assert(source.includes('Revanche · Jogador 1 começa'));
  assert(!source.includes('Revanche · inverter início'));
  assert(source.includes('state=rematchBroto(state)'));
  assert(source.includes('state=resetBrotoRound(state)'));
  assert(source.includes("mode==='local'"));
  assert(source.includes('competitivo'));
});
