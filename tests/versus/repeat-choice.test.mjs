import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadVersusGame,VERSUS_GAME_IDS} from '../../dist/versus/metadata.mjs';
import {repeatsPendingChoice,canRepeatChoice} from '../../dist/versus/repeat-choice.mjs';
import {createSession,currentState,applySessionMove,travelHistory,serializeSession,restoreSession} from '../../dist/versus/session.mjs';
import {chooseMove} from '../../dist/versus/search.mjs';
function actionsFor(id,m) {
  if(id==='enlace') return [m.center,m.green,m.amber].map(cell=>({type:'pin',cell}));
  if(id==='vazante') return m.type==='pass'?[m]:[m.from,m.to].map(cell=>({type:'cell',cell}));
  if(id==='mosaico') return [{type:'orientation',orientation:m.orientation},{type:'cell',cell:m.cell}];
  if(id==='quinhao') return [{type:'basket',basket:m.type==='offer'?m.start:m.basket}];
  if(id==='estalo') return [{type:'cell',cell:m.cell},{type:'aim',cell:m.cell,turn:m.turn}];
  if(id==='dobra') return [{type:'cell',cell:m.cell},{type:'edge',edge:m.edge}];
  if(id==='acorde') return m.type==='pass'?[m]:[{type:'cell',cell:m.cell}];
  return m.type==='next-round'?[m]:[{type:'piece',piece:m.piece},{type:'destination',piece:m.piece,to:m.to}];
}
for(const id of VERSUS_GAME_IDS) test(`${id}: partida completa, repetição, IA, desfazer e replay`,async()=>{
  const {engine,view}=await loadVersusGame(id); let session=createSession(engine);
  for(let turn=0;!currentState(session).result&&turn<180;turn++) {
    const before=currentState(session),snapshot=structuredClone(before),legal=engine.getLegalMoves(before);
    const answer=chooseMove(engine,before,'beginner',{nodes:100,milliseconds:1000,clock:()=>0});
    const move=answer.move??legal[turn%legal.length];
    assert.ok(legal.some(x=>JSON.stringify(x)===JSON.stringify(move)));
    let selection=null,pending=null,previous=null;
    for(const action of actionsFor(id,move)) {
      const choice=view.interact(before,selection,action);
      assert.equal(repeatsPendingChoice(id,previous,action,pending,choice.move),false);
      selection=choice.selection;pending=choice.move;previous=choice.move?action:null;
      assert.deepEqual(currentState(session),snapshot,'prévia preserva estado e turno');
      if(!choice.move) assert.equal(repeatsPendingChoice(id,action,action,null,view.interact(before,selection,action).move),false,'origem sozinha nunca confirma');
    }
    assert.deepEqual(pending,move);
    const preview=engine.applyMove(before,pending);
    const html=view.renderBoard(before,{selection,pendingMove:pending,previewState:preview,legalMoves:legal,config:{mascots:['capivara','tucano']}});
    const last=actionsFor(id,move).at(-1),encoded=JSON.stringify(last).replaceAll('"','&quot;');
    const targets=[...html.matchAll(/<button\b[^>]*>/g)].map(m=>m[0]).filter(b=>b.includes(`data-action="${encoded}"`));
    assert.ok(targets.some(b=>!/\sdisabled(?:\s|>|=)/.test(b)),`alvo repetido continua disponível: ${JSON.stringify(last)}`);
    const repeated=view.interact(before,selection,last);
    assert.equal(repeatsPendingChoice(id,previous,last,pending,repeated.move),true);
    assert.equal(repeatsPendingChoice(id,null,last,pending,repeated.move),false,'cancelar/histórico limpa o atalho');
    session=applySessionMove(engine,session,pending);
    assert.deepEqual(currentState(session),preview);
    assert.deepEqual(currentState(travelHistory(travelHistory(session,-1),1)),preview);
  }
  assert.ok(currentState(session).result,'partida termina no limite');
  const config={mode:'local',difficulty:'beginner',mascots:['capivara','tucano']};
  assert.deepEqual(restoreSession(engine,serializeSession(session,config)),session);
});
test('troca de cores, cancelamento, peça e origem nunca confirmam',()=>{
  for(const [id,action] of [['enlace',{type:'swap'}],['enlace',{type:'reset'}],['estalo',{type:'cell',cell:1}],['dobra',{type:'cell',cell:1}],['lastro',{type:'piece',piece:'A'}]]) {
    assert.equal(canRepeatChoice(id,action),false);
    assert.equal(repeatsPendingChoice(id,action,action,{type:'test'},{type:'test'}),false);
  }
});
test('mudar alvo ou jogada apenas atualiza prévia',()=>{
  const a={type:'cell',cell:1},b={type:'cell',cell:2},m={type:'place',cell:1,orientation:0};
  assert.equal(repeatsPendingChoice('mosaico',a,b,m,{...m,cell:2}),false);
  assert.equal(repeatsPendingChoice('mosaico',a,a,m,{...m,orientation:1}),false);
});
test('QUINHÃO mantém cestos e posições até confirmar',async()=>{
  const {engine,view}=await loadVersusGame('quinhao');const initial=engine.createState();
  const state=engine.applyMove(initial,engine.getLegalMoves(initial)[0]),m=engine.getLegalMoves(state)[0];
  const ring=h=>[...h.matchAll(/<button[^>]*class="quinhao-basket[^>]*>/g)].map(x=>x[0]);
  assert.deepEqual(ring(view.renderBoard(state,{pendingMove:m,previewState:engine.applyMove(state,m)})),ring(view.renderBoard(state,{})));
});
test('teclado, Escape, repetição automática e botão adjacente',()=>{
  const ui=readFileSync(new URL('../../dist/versus/ui.mjs',import.meta.url),'utf8');
  assert.match(ui,/event\.repeat && \["Enter", " "\]\.includes\(event\.key\)/);
  assert.match(ui,/event\.key === "Escape"/);assert.match(ui,/previewAction = null/);
  assert.doesNotMatch(ui,/addEventListener\("dblclick"/);
  assert.ok(ui.indexOf('id="nv-board"')<ui.indexOf('id="nv-confirm"'));
  assert.ok(ui.indexOf('id="nv-confirm"')<ui.indexOf('id="nv-preview"'));
  for(const [file,re] of [['broto/ui.mjs',/if \(selected === cell\)/],['cerco/ui.mjs',/if \(destination === cell\)/],['collection-ui.mjs',/duelPreview === i \|\| data\.desvioOneClick/]]) {
    assert.match(readFileSync(new URL(`../../dist/${file}`,import.meta.url),'utf8'),re);
  }
});
