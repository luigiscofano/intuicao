import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,getLegalMoves,applyMove} from '../dist/versus/games/acorde/engine.mjs';
import {renderBoard} from '../dist/versus/games/acorde/view.mjs';

test('coleções móveis reutilizam o estado e mostram a projeção sem aplicar a jogada',()=>{
  const state=createState(), before=JSON.stringify(state), move=getLegalMoves(state)[0];
  const html=renderBoard(state,{pendingMove:move,previewState:applyMove(state,move)});
  assert.match(html,/acorde-compact-collections/);
  assert.match(html,/scope="row"/);
  assert.match(html,/acorde-count-preview/);
  assert.equal((html.match(/class="acorde-cell[ "]/g)||[]).length,16);
  assert.equal(JSON.stringify(state),before);
});
