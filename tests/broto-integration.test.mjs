import test from 'node:test';
import assert from 'node:assert/strict';
import {createBroto,applyBrotoMove,previewBrotoMove,nextBrotoRound,undoBroto,redoBroto,restoreBroto,legalBrotoMoves} from '../dist/broto/engine.mjs';

// Independent geometric oracle: recipients are found using row/column filtering
// and nearest-distance sorting, not the production ray-walking algorithm.
function oracle(before,cell){
 const board=structuredClone(before.board);const row=Math.floor(cell/4),col=cell%4;
 const candidates=board.flatMap((p,i)=>p?[{...p,i,row:Math.floor(i/4),col:i%4}]:[]);
 const nearest=(predicate,distance)=>candidates.filter(predicate).sort((a,b)=>distance(a)-distance(b))[0];
 const hits=[
  [nearest(p=>p.col===col&&p.row<row,p=>row-p.row),'v'],
  [nearest(p=>p.col===col&&p.row>row,p=>p.row-row),'v'],
  [nearest(p=>p.row===row&&p.col<col,p=>col-p.col),'h'],
  [nearest(p=>p.row===row&&p.col>col,p=>p.col-col),'h']
 ].filter(([p])=>p);
 board[cell]={owner:before.player,h:false,v:false};
 const points=[0,0];for(const [p,axis] of hits)board[p.i][axis]=true;
 const blooms=hits.map(([p])=>p.i).filter(i=>board[i].h&&board[i].v);
 for(const i of blooms){points[board[i].owner]++;board[i]=null;}
 return {board,points,receivers:hits.map(([p,axis])=>[p.i,axis]),blooms};
}

test('independent nearest-row/column oracle matches 3200 complete-round resolutions',()=>{
 let seed=10631;const rand=n=>{seed=(Math.imul(seed,1103515245)+12345)>>>0;return seed%n;};
 for(let trial=0;trial<100;trial++){
  let s=createBroto(trial%2);
  for(let round=0;round<2;round++){
   while(!s.roundOver){const choices=legalBrotoMoves(s),cell=choices[rand(choices.length)],raw=JSON.stringify(s),expected=oracle(s,cell),r=applyBrotoMove(s,cell);assert.deepEqual(r.state.board,expected.board);assert.deepEqual(r.events.points,expected.points);assert.deepEqual(r.events.receivers.map(e=>[e.cell,e.axis]),expected.receivers);assert.deepEqual(r.events.blooms.map(e=>e.cell),expected.blooms);assert.equal(JSON.stringify(s),raw);assert.deepEqual(previewBrotoMove(s,cell),r);s=r.state;}
   if(round===0)s=nextBrotoRound(s);
  }
 }
});

test('persisted undo branch replays fully but cannot cross consolidated boundary',()=>{
 let s=createBroto();while(!s.roundOver)s=applyBrotoMove(s,legalBrotoMoves(s)[0]).state;
 s=nextBrotoRound(s);const second=structuredClone(s);for(let i=0;i<8;i++)s=applyBrotoMove(s,legalBrotoMoves(s)[0]).state;
 const final=structuredClone(s);for(let i=0;i<8;i++)s=undoBroto(s);assert.deepEqual({...s,future:[]},second);assert.equal(undoBroto(s),s);s=restoreBroto(JSON.stringify(s));assert(s);
 for(let i=0;i<8;i++)s=redoBroto(s);assert.deepEqual(s,final);
 for(let i=0;i<8;i++)s=undoBroto(s);const corrupted=structuredClone(s);corrupted.future[1]=corrupted.future[0];assert.equal(restoreBroto(corrupted),null);
});

import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {GAME_INFO} from '../dist/game-info-content.mjs';
import {RULE_EXAMPLES} from '../dist/rules-examples.mjs';
import {GAME_NAV_ICONS} from '../dist/game-nav-icons.mjs';
import {CATEGORY_GAMES} from '../dist/category-navigation.mjs';
const ui=readFileSync(new URL('../dist/broto/ui.mjs',import.meta.url),'utf8');
const css=readFileSync(new URL('../dist/broto/ui.css',import.meta.url),'utf8');
test('registration preserves all nine existing information, illustrations and icons',()=>{
 for(const [object,expected] of [
 [GAME_INFO,'b40b3cc2a94ee10fcd1953d7f6e7a226d870a85f4a1d215d9e886f8c79de659f'],
 [RULE_EXAMPLES,'a2d1b40c86b5024daed15bc787e83f3912aa2a54f929a5d72f06a211d55aec56'],
 [GAME_NAV_ICONS,'a3dd0753da93030ceb5833e82371b720a20638092ef49edc51881e3a526afcab']]){
  const prior=Object.fromEntries(Object.entries(object).filter(([key])=>['light','cut','elo','prumo','pacto','desvio','sintonia','repasse','orbita'].includes(key)));assert.equal(createHash('sha256').update(JSON.stringify(prior)).digest('hex'),expected);assert(object.broto);
 }
 assert.deepEqual(CATEGORY_GAMES,{intuicao:['light','cut'],logica:['elo','prumo','pacto','sintonia','repasse','orbita'],versus:['desvio','broto','cerco','trama','vertice']});
 assert.equal(GAME_INFO.broto.description,'Plante sementes, complete estímulos e escolha quem floresce.');
});
test('UI reuses applicable contracts and keeps storage and styles scoped',()=>{
 for(const dependency of ['restart-confirmation.mjs','rules-preview.mjs','result-motion.mjs','middle-confirm.mjs','sintonia/animal-roster.mjs'])assert(ui.includes(dependency));
 assert(ui.includes("BROTO_STORAGE_KEY='intuicao.broto.v1'"));
 assert(ui.includes('restoreBroto(raw.state)'));assert(ui.includes('serializeBroto(state)'));
 assert(!/localStorage\.(clear|removeItem)\(/.test(ui));
 assert(!/intuicao\.(collection|sintonia|orbita|repasse)\.v1/.test(ui));
 assert(css.includes('#broto .b-workspace'));assert(css.includes('@media(prefers-reduced-motion:reduce)'));
 assert(!/\n(?:body|button|\.collection|\.rules|\.stage)/.test(css));
});
test('source has duplicate guard, stale motion cancellation, competitive and keyboard contracts',()=>{
 assert(ui.includes('selected<0||animation||restart.isOpen||state.roundOver||!active||host.hidden'));
 assert(ui.includes('timers.forEach(clearTimeout)'));assert(ui.includes('token===revision&&active&&!host.hidden'));
 assert(ui.includes("if(mode!=='local'"));assert(ui.includes('Os dois jogadores concordam em'));
 assert(ui.includes('resetBrotoRound(state)'));assert(ui.includes('nextBrotoRound(state)'));assert(ui.includes('rematchBroto(state)'));
 assert(ui.includes('aria-disabled='));assert(ui.includes('Horizontal recebido'));assert(ui.includes('falta vertical'));
 assert(ui.includes('ArrowLeft'));assert(ui.includes('ArrowRight'));assert(ui.includes("e.key==='Escape'"));
 assert(!/Checar resposta|Ver gabarito|Opções avançadas|três erros/i.test(ui));
});
