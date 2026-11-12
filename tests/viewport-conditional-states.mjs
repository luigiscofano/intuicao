/** Pure-state QA: no browser, saved games, or production files are modified. */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const games = {};
for (const id of ['estalo','dobra','quinhao','acorde','lastro']) games[id] = {
  engine: await import(`../dist/versus/games/${id}/engine.mjs`),
  view: await import(`../dist/versus/games/${id}/view.mjs`),
};
function has(html, name) { assert.ok(html.includes(name), `Missing ${name}`); }
function preview(id, state, selection, action) {
  const {engine:e,view:v}=games[id];
  const decision=v.interact(state,selection,action);
  assert.ok(decision.move, `${id}: interaction must create move`);
  return v.renderBoard(state,{selection:decision.selection,pendingMove:decision.move,previewState:e.applyMove(state,decision.move)});
}
{
 const {engine:e,view:v}=games.estalo, s=e.createState();
 const cell=s.board.findIndex(p=>p?.owner===s.player);
 const d=v.interact(s,null,{type:'cell',cell});
 assert.equal(d.move,null);
 has(v.renderBoard(s,{selection:d.selection}),'estalo-aim-button');
 has(preview('estalo',s,d.selection,{type:'aim',cell,turn:0}),'estalo-preview-note');
}
{
 const {engine:e,view:v}=games.dobra,s=e.createState();
 const d=v.interact(s,null,{type:'cell',cell:0});
 assert.equal(d.move,null);
 has(v.renderBoard(s,{selection:d.selection}),'dobra-edge');
 has(preview('dobra',s,d.selection,{type:'edge',edge:'north'}),'dobra-preview-note');
}
{
 const {engine:e,view:v}=games.quinhao,s=e.createState();
 const offer=e.getLegalMoves(s)[0], next=e.applyMove(s,offer);
 assert.equal(next.phase,'choose');
 has(v.renderBoard(next),'quinhao-choices');
 has(preview('quinhao',next,null,{type:'basket',basket:next.offer[0]}),'quinhao-preview-note');
}
// Search only legal states for an actual pass, rather than fabricating a save.
function findPass(s,path=[],remaining=16) {
 const e=games.acorde.engine;
 if(s.result||!remaining)return null;
 if(e.getLegalMoves(s)[0]?.type==='pass')return {state:s,path};
 for(const m of e.getLegalMoves(s)) {
  const found=findPass(e.applyMove(s,m),[...path,m],remaining-1);
  if(found)return found;
 }
 return null;
}
const pass=findPass(games.acorde.engine.createState());
assert.ok(pass,'Reachable Acorde pass state');
has(games.acorde.view.renderBoard(pass.state),'acorde-pass');
const lastroPath=[];
let lastro=games.lastro.engine.createState();
const first=games.lastro.engine.getLegalMoves(lastro)[0];
has(games.lastro.view.renderBoard(lastro,{selection:{piece:first.piece}}),'lastro-mark--legal');
while(lastro.phase==='playing') {
 const move=games.lastro.engine.getLegalMoves(lastro)[0];
 lastroPath.push(move);lastro=games.lastro.engine.applyMove(lastro,move);
 assert.ok(lastroPath.length<25);
}
assert.equal(lastro.phase,'between-rounds');
has(games.lastro.view.renderBoard(lastro),'lastro-next-round');
has(games.lastro.view.renderBoard(lastro),'lastro-calculation');
const nextRound=games.lastro.view.interact(lastro,null,{type:'next-round'});
assert.equal(nextRound.move.type,'next-round');
const shell=await readFile(new URL('../dist/versus/ui.mjs',import.meta.url),'utf8');
for(const id of ['nv-mode','nv-start','nv-confirm','nv-cancel','nv-hint'])has(shell,id);
console.log(JSON.stringify({passed:true,acordePassActions:pass.path,lastroRoundActions:lastroPath},null,2));
